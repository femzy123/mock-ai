import { createClient } from "@/utils/supabase/server";
import InterviewClient from './InterviewClient'
import { Interview } from "@/utils/types";

const InterviewPage = async ({ params }: any) => {
  const { id } = params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mockInterview")
    .select("*")
    .eq("mockId", id);

  return (
    <InterviewClient interviewData={data![0] as Interview} />
  );
};

export default InterviewPage;
