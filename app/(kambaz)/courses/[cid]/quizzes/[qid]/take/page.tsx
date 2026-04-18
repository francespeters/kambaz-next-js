/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useState, useEffect } from "react";
import * as quizzesClient from "../../../../quizzesClient";
import * as attemptsClient from "../../../../attemptsClient";
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

type Choice = { _id: string; text: string; isCorrect: boolean };
type Question = {
  _id: string;
  type: "multiple_choice" | "true_false" | "fill_in_blank";
  title: string;
  points: number;
  choices?: Choice[];
  correctAnswer?: boolean;
  correctAnswers?: string[];
};

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const existingQuiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // load quiz
      const q = existingQuiz || await quizzesClient.findQuizById(qid as string);
      setQuiz(q);

      // load attempt history for this student
      if (currentUser?._id) {
        const { count } = await attemptsClient.countAttempts(
          qid as string, currentUser._id
        );
        setAttemptCount(count);

        if (count > 0) {
          const latest = await attemptsClient.getLatestAttempt(
            qid as string, currentUser._id
          );
          setLastAttempt(latest);
          // restore last answers and score so student can review
          if (latest) {
            setAnswers(latest.answers || {});
            setScore(latest.score || 0);
            setSubmitted(true); // show results view by default
          }
        }
      }
      setLoading(false);
    };
    init();
  }, [qid, currentUser]);

  if (loading) return <div className="p-4 text-muted">Loading...</div>;
  if (!quiz) return <div className="p-4 text-muted">Quiz not found.</div>;

  const questions: Question[] = quiz.questions || [];
  const totalPoints = questions.reduce((sum: number, q: Question) => sum + q.points, 0);
  const maxAttempts = quiz.multipleAttempts ? (quiz.howManyAttempts ?? 1) : 1;
  const attemptsRemaining = maxAttempts - attemptCount;
  const canRetake = quiz.multipleAttempts && attemptCount < maxAttempts;

  const isCorrect = (q: Question, userAnswers = answers): boolean => {
    const answer = userAnswers[q._id];
    if (answer === undefined || answer === "") return false;
    if (q.type === "multiple_choice") {
      return answer === q.choices?.find((c) => c.isCorrect)?._id;
    }
    if (q.type === "true_false") {
      return answer === String(q.correctAnswer);
    }
    if (q.type === "fill_in_blank") {
      return q.correctAnswers?.some(
        (a) => a.toLowerCase().trim() === String(answer).toLowerCase().trim()
      ) ?? false;
    }
    return false;
  };

  const handleAnswer = (questionId: string, value: any) => {
    if (submitted) return; // lock answers after submission
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const earned = questions.reduce(
      (sum, q) => sum + (isCorrect(q) ? q.points : 0), 0
    );
    setScore(earned);
    setSubmitted(true);

    // save to DB
    await attemptsClient.submitAttempt({
      quizId: qid as string,
      userId: currentUser._id,
      answers,
      score: earned,
      totalPoints,
    });
    setAttemptCount((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setAnswers({});
    setScore(0);
    setSubmitted(false);
    setLastAttempt(null);
  };

  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>

      {/* ── Attempt counter banner ── */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 px-4 py-2 rounded"
        style={{ background: "#f1f5f9", border: "1px solid #cbd5e1" }}
      >
        <span className="text-muted small">
          Attempt {attemptCount}{submitted ? "" : " in progress"} of {maxAttempts}
        </span>
        {submitted && lastAttempt && (
          <span className="text-muted small">
            Last taken: {new Date(lastAttempt.date).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            })}
          </span>
        )}
      </div>

      {/* ── Score banner (after submit) ── */}
      {submitted && (
        <div
          className="text-center mb-4 p-4 rounded"
          style={{
            background: percentage >= 70 ? "#d1fae5" : "#fee2e2",
            border: `2px solid ${percentage >= 70 ? "#10b981" : "#ef4444"}`,
          }}
        >
          <div style={{ fontSize: "2.5rem", fontWeight: 800 }}>
            {score} / {totalPoints}
          </div>
          <div style={{ fontSize: "1rem", marginTop: "4px", color: percentage >= 70 ? "#065f46" : "#991b1b" }}>
            {percentage}%
          </div>
        </div>
      )}

      {/* ── Title ── */}
      <h2 className="mb-1">{quiz.title}</h2>
      <p className="text-muted small mb-4">
        {questions.length} question{questions.length !== 1 ? "s" : ""} &nbsp;·&nbsp; {totalPoints} pts
        {quiz.timeLimit && <> &nbsp;·&nbsp; {quiz.timeLimit} min</>}
      </p>

      {/* ── Questions ── */}
      {questions.map((q, index) => {
        const correct = submitted ? isCorrect(q) : null;

        return (
          <div
            key={q._id}
            className="mb-4 p-4 rounded border"
            style={{
              borderColor: submitted ? (correct ? "#10b981" : "#ef4444") : "#dee2e6",
              background: submitted ? (correct ? "#f0fdf4" : "#fef2f2") : "#fff",
            }}
          >
            {/* Question header */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="d-flex gap-2 align-items-start">
                {submitted && (
                  correct
                    ? <BsCheckCircleFill color="#10b981" size={18} className="mt-1 flex-shrink-0" />
                    : <BsXCircleFill color="#ef4444" size={18} className="mt-1 flex-shrink-0" />
                )}
                <span>
                  <span className="text-muted me-2">Q{index + 1}.</span>
                  <strong>{q.title}</strong>
                </span>
              </div>
              <span className="badge bg-secondary ms-3 flex-shrink-0">
                {q.points} pt{q.points !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Multiple choice */}
            {q.type === "multiple_choice" && (
              <div className="d-flex flex-column gap-2">
                {q.choices?.map((c) => {
                  const isSelected = answers[q._id] === c._id;
                  const showCorrect = submitted && c.isCorrect;
                  const showWrong = submitted && isSelected && !c.isCorrect;
                  return (
                    <label
                      key={c._id}
                      className="d-flex align-items-center gap-2 p-2 rounded"
                      style={{
                        cursor: submitted ? "default" : "pointer",
                        background: showCorrect ? "#d1fae5" : showWrong ? "#fee2e2" : isSelected ? "#e0f2fe" : "#f9fafb",
                        border: `1px solid ${showCorrect ? "#10b981" : showWrong ? "#ef4444" : isSelected ? "#38bdf8" : "#e5e7eb"}`,
                      }}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        value={c._id}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleAnswer(q._id, c._id)}
                      />
                      {c.text}
                      {showCorrect && <span className="ms-auto text-success small fw-bold">✓ Correct answer</span>}
                      {showWrong && <span className="ms-auto text-danger small fw-bold">✗ Your answer</span>}
                    </label>
                  );
                })}
              </div>
            )}

            {/* True / False */}
            {q.type === "true_false" && (
              <div className="d-flex gap-3">
                {["true", "false"].map((val) => {
                  const isSelected = answers[q._id] === val;
                  const isCorrectVal = String(q.correctAnswer) === val;
                  const showCorrect = submitted && isCorrectVal;
                  const showWrong = submitted && isSelected && !isCorrectVal;
                  return (
                    <label
                      key={val}
                      className="d-flex align-items-center gap-2 px-4 py-2 rounded"
                      style={{
                        cursor: submitted ? "default" : "pointer",
                        background: showCorrect ? "#d1fae5" : showWrong ? "#fee2e2" : isSelected ? "#e0f2fe" : "#f9fafb",
                        border: `1px solid ${showCorrect ? "#10b981" : showWrong ? "#ef4444" : isSelected ? "#38bdf8" : "#e5e7eb"}`,
                      }}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        value={val}
                        checked={isSelected}
                        disabled={submitted}
                        onChange={() => handleAnswer(q._id, val)}
                      />
                      {val.charAt(0).toUpperCase() + val.slice(1)}
                    </label>
                  );
                })}
                {submitted && !isCorrect(q) && (
                  <span className="text-danger small align-self-center">
                    Correct: {String(q.correctAnswer)}
                  </span>
                )}
              </div>
            )}

            {/* Fill in the blank */}
            {q.type === "fill_in_blank" && (
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your answer..."
                  value={answers[q._id] || ""}
                  disabled={submitted}
                  onChange={(e) => handleAnswer(q._id, e.target.value)}
                  style={{
                    borderColor: submitted ? (isCorrect(q) ? "#10b981" : "#ef4444") : undefined,
                  }}
                />
                {submitted && !isCorrect(q) && (
                  <div className="text-danger small mt-1">
                    Accepted: {q.correctAnswers?.join(", ")}
                  </div>
                )}
                {submitted && isCorrect(q) && (
                  <div className="text-success small mt-1">✓ Correct!</div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* ── Bottom actions ── */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        {!submitted ? (
          <>
            <span className="text-muted small">
              {Object.keys(answers).length} of {questions.length} answered
            </span>
            <button
              className="btn btn-danger px-4"
              onClick={handleSubmit}
              disabled={questions.length === 0}
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-outline-secondary"
              onClick={() => router.push(`/courses/${cid}/quizzes`)}
            >
              ← Back to Quizzes
            </button>
            {canRetake && (
              <button className="btn btn-danger" onClick={handleRetake}>
                Retake Quiz ({attemptsRemaining - (submitted ? 0 : 1)} remaining)
              </button>
            )}
            {!canRetake && attemptCount >= maxAttempts && (
              <span className="text-muted small fst-italic">
                No attempts remaining
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}