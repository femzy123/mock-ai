import { createClient } from "@/utils/supabase/server";
import StartInterviewClient from "./client";


const StartInterview = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mockInterview")
    .select("*")
    .eq("mockId", id);

  if (error) {
    console.log(error);
  }

  return <StartInterviewClient interviewData={data![0]} />;
};

export default StartInterview