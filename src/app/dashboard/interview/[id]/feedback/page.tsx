import { createClient } from "@/utils/supabase/server";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Feedback = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();

  const { data: feedbackList, error } = await supabase
    .from("feedbacks")
    .select("*")
    .eq("mockId", id);

  if (error) {
    console.log(error);
  }

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-primary">Hurray!</h2>
      <h6 className="font-semibold text-lg">
        Here is your interview feedback.
      </h6>

      <p className="text-primary text-lg my-4">
        Your overall interview rating: <strong>7/10</strong>
      </p>

      <p className="text-sm">
        Find below interview questions with the suggested correct answer and a
        feedback
      </p>

      {feedbackList?.map((item, i) => (
        <Collapsible key={item.mockId}>
          <CollapsibleTrigger className="w-full p-2 bg-secondary rounded-lg my-4 flex justify-between gap-8 text-left">
            <h3 className="text-lg font-semibold text-primary">
              {item.question}
            </h3>
            <ChevronsUpDown className="justify-self-end h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h6 className="text-red-500 p-2 border rounded-lg">
                <strong>Rating: </strong> {item.rating}
              </h6>
              <p className="p-2 border rounded-lg bg-red-50 text-sm text-red-700">
                <strong>Your Answer: </strong>
                {item.userAns}
              </p>
              <p className="p-2 border rounded-lg bg-primary text-sm text-white">
                <strong>Feedback: </strong>
                {item.feedback}
              </p>
              <p className="p-2 border rounded-lg bg-green-700 text-sm text-white">
                <strong>Suggested Answer: </strong>
                {item.correctAns}
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Link href="/dashboard" className="mt-4">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default Feedback;
