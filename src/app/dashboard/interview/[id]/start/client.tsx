"use client";

import QuestionsSection from "@/app/dashboard/_components/QuestionsSection";
import RecordAnswerSection from "@/app/dashboard/_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import { Interview } from "@/utils/types";
import Link from "next/link";
import { useState } from "react";

type Props = {
  interviewData: Interview;
};

const StartInterviewClient = ({ interviewData }: Props) => {
  const mockInterviewQuestions = JSON.parse(interviewData.jsonMockResp);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video/Audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex < mockInterviewQuestions.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestions.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterviewClient;
