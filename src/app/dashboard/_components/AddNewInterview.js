"use client";

import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModal";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import { createClient } from "../../../utils/supabase/client";

const AddNewInterview = () => {
  const { user } = useUser();
  const supabase = createClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [jsonMockResp, setJsonMockResp] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDescription}, Years of experience: ${jobExperience}. Depending on this information please give me ${numberOfQuestions} interview questions with answers in json format. Give question and answer as field in json`;

    const result = await chatSession.sendMessage(InputPrompt);
    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log(JSON.parse(mockJsonResponse));
    setJsonMockResp(mockJsonResponse);

    if (mockJsonResponse) {
      const { data, error } = await supabase
        .from("mockInterview")
        .insert([
          {
            mockId: uuidv4(),
            jsonMockResp: mockJsonResponse,
            jobPosition,
            jobDesc: jobDescription,
            jobExperience,
            createdBy: user.primaryEmailAddress.emailAddress,
          },
        ])
        .select("mockId");

        if(error) {
          alert("Something went wrong with saving data")
        }

        if(data) {
          setOpenDialog(false)
        }

      console.log("Insert Id => ", data);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-lg">
              Tell us more about your job interview
            </DialogTitle>

            <DialogDescription className="text-xs">
              Add details about your job position, description and experience.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
              <div className="my-4 space-y-2">
                <label className="text-xs">Job Role/Position</label>
                <Input
                  placeholder="Fullstack Developer"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>

              <div className="my-4 space-y-2">
                <label className="text-xs">Job Description/Tech Stack</label>
                <Textarea
                  placeholder="E.g. React, Node.js,..."
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="my-4 space-y-2">
                <label className="text-xs">Years of experience</label>
                <Input
                  placeholder="5"
                  type="number"
                  max="30"
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-5 justify-end mt-4">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2Icon className="animate-spin" /> Generating
                    Interview
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
