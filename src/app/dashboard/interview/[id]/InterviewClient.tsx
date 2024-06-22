"use client";

import { Button } from "@/components/ui/button";
import { Interview } from "@/utils/types";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Webcam from "react-webcam";

type Props = {
  interviewData: Interview;
};

const InterviewClient = ({ interviewData }: Props) => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  return (
    <div className="my-10 flex justify-center flex-col gap-8">
      <h2 className="font-bold text-2xl">Let&apos;s Get Started</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Role/Position: </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description/ Tech Stack: </strong>
              {interviewData.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-blue-300 bg-blue-500">
            <h2 className="flex gap-2 items-center text-white">
              <Lightbulb />
              <span className="font-bold">Information</span>
            </h2>
            <p className="mt-3 text-white text-sm">
              {process.env.NEXT_PUBLIC_INFO!}
            </p>
          </div>
        </div>

        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored
              audio={true}
              style={{
                height: 500,
                width: 500,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full p-20 bg-secondary rounded" />
              <Button
                variant="ghost"
                onClick={() => setWebcamEnabled(true)}
                className="w-full mt-4"
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Link href={`/dashboard/interview/${interviewData.mockId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewClient;
