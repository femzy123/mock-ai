"use client";

import QuestionsSection from "@/app/dashboard/_components/QuestionsSection";
import RecordAnswerSection from "@/app/dashboard/_components/RecordAnswerSection";
import { Interview } from "@/utils/types";
import { useState } from "react";

type Props = {
  interviewData: Interview;
};

const StartInterviewClient = ({ interviewData }: Props) => {
  const mockInterviewQuestions = JSON.parse(interviewData.jsonMockResp);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
        />
        {/* Video/Audio Recording */}
        <RecordAnswerSection />
      </div>
    </div>
  );
};

export default StartInterviewClient;
