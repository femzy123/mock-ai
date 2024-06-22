import { createClient } from "@/utils/supabase/server";
import StartInterviewClient from "./client";


const StartInterview = async ({params}: any) => {
  const { id } = params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mockInterview")
    .select("*")
    .eq("mockId", id);


  return (
    <StartInterviewClient interviewData={data![0]} />
  )
}

export default StartInterview