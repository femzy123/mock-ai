export interface Interview {
  mockId: string;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  feedbacks?: Feedback[];
}

export interface MockQuestions {
  question: string;
  answer: string;
}

export interface Feedback {
  id: number;
  mockId: string;
  rating: string;
  userAns: string;
  feedback: string;
  question: string;
  userEmail: string;
  correctAns: string;
  createdAt: string;
}