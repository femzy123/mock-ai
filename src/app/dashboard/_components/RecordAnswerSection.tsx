"use client";

import { Button } from "@/components/ui/button";
import { CircleStop, Mic, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Interview, MockQuestions } from "@/utils/types";
import { chatSession } from "@/utils/GeminiAiModal";
// import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { createClient } from "../../../utils/supabase/client";
import { revalidatePath } from "next/cache";

type Props = {
  mockInterviewQuestions: MockQuestions[];
  activeQuestionIndex: number;
  interviewData: Interview;
};

const RecordAnswerSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}: Props) => {
  const { user } = useUser();
  const supabase = createClient();
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    results.map((result: any) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  useEffect(() => {
    if(!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer])


  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.length < 10) {
        setLoading(false);
        toast.error("Error while recording your answer.", {
          description: "Answer is too short, please record again!",
        });
        setUserAnswer("");
        setResults([])
        return;
      }
      setLoading(false);
    } else {
      startSpeechToText();
    }
  }

  const updateUserAnswer = async () => {
    const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex].question}, User Answer: ${userAnswer}, depends on question and user answer for each interview question, please give a rating from 0 - 5 and feedback and area of imporvement in just 3 to 5 lines to improve it in json format with rating field and feedback field`;

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");


      const jsonFeedback = JSON.parse(mockJsonResponse);

      const { error } = await supabase.from("feedbacks").insert([
        {
          mockId: interviewData.mockId,
          question: mockInterviewQuestions[activeQuestionIndex].question,
          correctAns: mockInterviewQuestions[activeQuestionIndex].answer,
          userAns: userAnswer,
          feedback: jsonFeedback.feedback,
          rating: jsonFeedback.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
        },
      ]);

      if (!error) {
        toast.success("Your answer has been recorded");
        setUserAnswer('')
        setResults([])
      } else {
        toast.error("Error while saving data.");
        console.error(error);
      }
      setLoading(false);
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col justify-center items-center bg-black rounded-lg p-5 mt-10">
        <WebcamIcon size={200} color="white" className="absolute" />
        <Webcam
          mirrored
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button onClick={startStopRecording} variant="outline" disabled={loading}>
        {isRecording ? (
          <span className="text-red-600 flex gap-2">
            <CircleStop /> Stop Recording
          </span>
        ) : (
          <span className="text-primary flex gap-2">
            <Mic /> Record Answer
          </span>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
