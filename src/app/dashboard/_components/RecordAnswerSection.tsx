"use client";

import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";

type Props = {};

const RecordAnswerSection = (props: Props) => {
  const [userAnswer, setUserAnswer] = useState('')
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
    results.map((result: any) => (
      setUserAnswer(prevAns => prevAns + result.transcript)
    ))
  }, [results])
  

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
      <Button
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
        variant="outline"
      >
        {isRecording ? (
          <span className="text-red-600 flex gap-2">
            <Mic /> Recording...
          </span>
        ) : (
          "Record Answer"
        )}
      </Button>

      <Button onClick={() => console.log(userAnswer)}>Show Answers</Button>
    </div>
  );
};

export default RecordAnswerSection;
