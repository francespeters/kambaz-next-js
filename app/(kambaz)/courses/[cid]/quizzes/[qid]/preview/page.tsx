/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { useState, useEffect } from "react";
import * as quizzesClient from "../../../../quizzesClient";
import { BsPencilSquare, BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";

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

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const existingQuiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [quiz, setQuiz] = useState<any>(null);

  // answers keyed by question _id
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (existingQuiz) {
      setQuiz(existingQuiz);
    } else {
      quizzesClient.findQuizById(qid as string).then(setQuiz);
    }
  }, [qid, existingQuiz]);

  if (!quiz) return <div className="p-4 text-muted">Loading preview...</div>;

  const questions: Question[] = quiz.questions || [];

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const isCorrect = (q: Question): boolean => {
    const answer = answers[q._id];
    if (answer === undefined || answer === "") return false;

    if (q.type === "multiple_choice") {
      const correctChoice = q.choices?.find((c) => c.isCorrect);
      return answer === correctChoice?._id;
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

  const handleSubmit = () => {
    const earned = questions.reduce((sum, q) => {
      return sum + (isCorrect(q) ? q.points : 0);
    }, 0);
    setScore(earned);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return (
    <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2rem 1.5rem" }}>

      {/* ── Faculty banner ── */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 px-4 py-3 rounded"
        style={{ background: "#fff3cd", border: "1px solid #ffc107" }}
      >
        <div>
          <strong>📋 Preview Mode</strong>
          <span className="text-muted ms-2 small">
            You are previewing this quiz as a student. Answers are not saved.
          </span>
        </div>
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
        >
          <BsPencilSquare className="me-1" /> Edit Quiz
        </button>
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
          <div style={{ fontSize: "1.1rem", color: percentage >= 70 ? "#065f46" : "#991b1b" }}>
            {percentage}% &nbsp;·&nbsp;
            {percentage >= 70 ? "🎉 Great job!" : "📚 Keep studying!"}
          </div>
        </div>
      )}

      {/* ── Quiz title ── */}
      <h2 className="mb-1">{quiz.title}</h2>
      <p className="text-muted mb-4 small">
        {questions.length} question{questions.length !== 1 ? "s" : ""} &nbsp;·&nbsp; {totalPoints} pts
        {quiz.timeLimit && <> &nbsp;·&nbsp; {quiz.timeLimit} min</>}
      </p>

      {/* ── Questions ── */}
      {questions.map((q, index) => {
        const answered = answers[q._id] !== undefined && answers[q._id] !== "";
        const correct = submitted ? isCorrect(q) : null;

        return (
          <div
            key={q._id}
            className="mb-4 p-4 rounded border"
            style={{
              borderColor: submitted
                ? correct ? "#10b981" : "#ef4444"
                : "#dee2e6",
              background: submitted
                ? correct ? "#f0fdf4" : "#fef2f2"
                : "#fff",
              transition: "border-color 0.2s",
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
                        background: showCorrect
                          ? "#d1fae5"
                          : showWrong
                          ? "#fee2e2"
                          : isSelected
                          ? "#e0f2fe"
                          : "#f9fafb",
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
                      {showCorrect && <span className="ms-auto text-success small fw-bold">✓ Correct</span>}
                      {showWrong && <span className="ms-auto text-danger small fw-bold">✗ Wrong</span>}
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
                {submitted && (
                  <span className={`ms-2 small fw-bold align-self-center ${isCorrect(q) ? "text-success" : "text-danger"}`}>
                    Correct answer: {String(q.correctAnswer)}
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
                    borderColor: submitted
                      ? isCorrect(q) ? "#10b981" : "#ef4444"
                      : undefined,
                  }}
                />
                {submitted && !isCorrect(q) && (
                  <div className="text-danger small mt-1">
                    Accepted answers: {q.correctAnswers?.join(", ")}
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

      {/* ── Submit / Retry ── */}
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
            <button className="btn btn-outline-secondary" onClick={handleRetry}>
              ↺ Retake Preview
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
            >
              <BsPencilSquare className="me-1" /> Edit Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}