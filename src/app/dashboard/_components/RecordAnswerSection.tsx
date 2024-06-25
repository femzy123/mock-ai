"use client";

import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MockQuestions } from "@/utils/types";
import { chatSession } from "@/utils/GeminiAiModal";

type Props = {
  mockInterviewQuestions: MockQuestions[];
  activeQuestionIndex: number;
};

const RecordAnswerSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
}: Props) => {
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result: any) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer.length < 10) {
        toast.error("Error while saving your answer.", {
          description: "Please record again!",
        });
        return;
      }

      const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex].question}, User Answer: ${userAnswer}, depends on question and user answer for each interview question, please give us rating and feedback and area of imporvement in just 3 to 5 lines to improve it in json format with rating field and feedback field`;

      const result = await chatSession.sendMessage(feedbackPrompt)

      const mockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

        console.log(mockJsonResponse)

        const jsonFeedback = JSON.parse(mockJsonResponse)
    } else {
      startSpeechToText();
    }
  };

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
      <Button onClick={saveUserAnswer} variant="outline">
        {isRecording ? (
          <span className="text-red-600 flex gap-2">
            <Mic /> Recording...
          </span>
        ) : (
          <span className="text-primary flex gap-2">
            <Mic /> Record Answer
          </span>
        )}
      </Button>

      <Button onClick={() => console.log(userAnswer)}>Show Answers</Button>
    </div>
  );
};

export default RecordAnswerSection;
