"use client";

import { Button } from "@/components/ui/button";
import { Interview } from "@/utils/types";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  interview: Interview;
};

const InterviewItemCard = ({ interview }: Props) => {
  const router = useRouter();
  return (
    <div className="border shadow-sm rounded-lg p-3 hover:bg-gray-100">
      <h2 className="font-semibold text-primary">{interview.jobPosition}</h2>
      <p className="text-sm text-gray-600">
        {interview.jobExperience} years of experience
      </p>
      <p className="text-xs text-gray-500">
        Created at: {new Date(interview.createdAt).toDateString()}
      </p>

      <div className="flex justify-between my-2 gap-4">
        {interview.feedbacks && interview.feedbacks?.length >= 1 && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() =>
              router.push(`/dashboard/interview/${interview.mockId}/feedback`)
            }
          >
            Feedback
          </Button>
        )}
        <Button
          size="sm"
          className="w-full"
          onClick={() =>
            router.push(`/dashboard/interview/${interview.mockId}/start`)
          }
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
