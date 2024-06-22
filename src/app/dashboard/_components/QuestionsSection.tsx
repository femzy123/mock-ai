import { Lightbulb } from "lucide-react";

interface MockQuestions {
  question: string;
  answer: string;
}

type Props = {
  mockInterviewQuestions: MockQuestions[];
  activeQuestionIndex: number;
};

const QuestionsSection = ({
  mockInterviewQuestions,
  activeQuestionIndex,
}: Props) => {
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-col-2 md:grid-cols-3 gap-4">
        {mockInterviewQuestions.map((question, index) => (
          <div
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center ${
              activeQuestionIndex === index
                ? "bg-primary text-white"
                : "bg-secondary"
            }`}
          >
            Question #{index + 1}
          </div>
        ))}
      </div>
      <p className="my-4 text-sm md:text-lg">
        {mockInterviewQuestions[activeQuestionIndex].question}
      </p>

      <div className="mt-20 border rounded-lg p-5 bg-blue-100 text-primary">
        <p className="flex gap-2 items-center text-sm">
          <Lightbulb size={16} />
          <strong>Note:</strong>
        </p>
        <p className="text-xs my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE!}</p>
      </div>
    </div>
  );
};

export default QuestionsSection