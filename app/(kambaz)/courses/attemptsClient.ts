/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ATTEMPTS_API = `${HTTP_SERVER}/api/attempts`;

export const submitAttempt = async (attempt: {
  quizId: string;
  userId: string;
  answers: Record<string, any>;
  score: number;
  totalPoints: number;
}) => {
  const { data } = await axios.post(ATTEMPTS_API, attempt);
  return data;
};

export const getAttemptsForUserAndQuiz = async (quizId: string, userId: string) => {
  const { data } = await axios.get(`${ATTEMPTS_API}/${quizId}/${userId}`);
  return data;
};

export const getLatestAttempt = async (quizId: string, userId: string) => {
  const { data } = await axios.get(`${ATTEMPTS_API}/${quizId}/${userId}/latest`);
  return data;
};

export const countAttempts = async (quizId: string, userId: string) => {
  const { data } = await axios.get(`${ATTEMPTS_API}/${quizId}/${userId}/count`);
  return data; // { count: number }
};