/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = { quizzes: [] as any[] };

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: uuidv4(),
        course: quiz.course,
        title: quiz.title || "New Quiz",
        description: quiz.description || "",
        quizType: quiz.quizType || "Graded Quiz",
        points: quiz.points || 0,
        assignmentGroup: quiz.assignmentGroup || "Quizzes",
        shuffleAnswers: quiz.shuffleAnswers ?? true,
        timeLimit: quiz.timeLimit ?? 20,
        multipleAttempts: quiz.multipleAttempts ?? false,
        howManyAttempts: quiz.howManyAttempts ?? 1,
        showCorrectAnswers: quiz.showCorrectAnswers || "",
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime ?? true,
        webcamRequired: quiz.webcamRequired ?? false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering ?? false,
        dueDate: quiz.dueDate || "",
        availableFrom: quiz.availableFrom || "",
        availableUntil: quiz.availableUntil || "",
        published: false,
        questions: [],
      };
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? quiz : a
      );
    },
    togglePublishQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quizId ? { ...a, published: !a.published } : a
      );
    },
    addQuestion: (state, { payload }: { payload: { quizId: string; question: any } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === payload.quizId
          ? { ...q, questions: [...(q.questions || []), { ...payload.question, _id: uuidv4() }] }
          : q
      );
    },
    updateQuestion: (state, { payload }: { payload: { quizId: string; question: any } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === payload.quizId
          ? { ...q, questions: q.questions.map((qq: any) =>
              qq._id === payload.question._id ? payload.question : qq) }
          : q
      );
    },
    deleteQuestion: (state, { payload }: { payload: { quizId: string; questionId: string } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === payload.quizId
          ? { ...q, questions: q.questions.filter((qq: any) => qq._id !== payload.questionId) }
          : q
      );
    },
  },
});

export const {
  addQuiz, deleteQuiz, updateQuiz, setQuizzes,
  togglePublishQuiz, addQuestion, updateQuestion, deleteQuestion,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;