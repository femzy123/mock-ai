"use client";

import { createClient } from "@/utils/supabase/client";
import { Interview } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();
  const supabase = createClient();
  const [interviewList, setInterviewList] = useState<Interview[]>([]);
  console.log(user)

  const getInterviewList = async () => {
    const { data, error } = await supabase
      .from("mockInterview")
      .select("*, feedbacks(*)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress);

    if (error) {
      toast.error("Error fetching past mock interviews");
    }
    console.log(data);
    setInterviewList(data as Interview[]);
  };

  useEffect(() => {
    user && getInterviewList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div>
      <h2 className="font-semibold text-lg">Past Mock Interviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
        {interviewList && interviewList.length <= 0 ? (
          <p>No mock interview created yet!</p>
        ) : (
          interviewList.map((interview) => (
            <InterviewItemCard key={interview.mockId} interview={interview} />
          ))
        )}
      </div>
    </div>
  );
};

export default InterviewList;
