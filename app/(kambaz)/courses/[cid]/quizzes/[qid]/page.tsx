/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { useEffect, useState } from "react";

function formatDate(dateStr: string) {
  if (!dateStr) return "No date set";
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <tr>
      <td className="text-end fw-bold pe-4 py-2 text-nowrap" style={{ width: "220px", color: "#555" }}>
        {label}
      </td>
      <td className="py-2">{value}</td>
    </tr>
  );
}

export default function QuizDetails() {

  const { cid, qid } = useParams();
  const router = useRouter();

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const quiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  if (!quiz) {
    return (
      <div className="p-4">
        <p className="text-muted">Quiz not found.</p>
        <Link href={`/courses/${cid}/Quizzes`}>← Back to Quizzes</Link>
      </div>
    );
  }

    const [lastAttempt, setLastAttempt] = useState<any>(null);
    const [attemptCount, setAttemptCount] = useState(0);

    useEffect(() => {
    if (!isFaculty && currentUser?._id) {
        attemptsClient.getLatestAttempt(qid as string, currentUser._id)
        .then(setLastAttempt);
        attemptsClient.countAttempts(qid as string, currentUser._id)
        .then(({ count }) => setAttemptCount(count));
    }
    }, [qid, currentUser]);

  return (
    <div className="p-4" style={{ maxWidth: "900px" }}>
      {/* ── Action buttons (faculty only) ── */}
      {isFaculty && (
        <div className="d-flex justify-content-center gap-2 mb-4">
          <button
            className="btn btn-secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            <BsPencilSquare className="me-1" /> Edit
          </button>
          <button className="btn btn-secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)} 
            >Preview</button>
        </div>
      )}

      {/* ── Published banner ── */}
      <div
        className={`text-center py-2 mb-4 rounded fw-semibold ${
          quiz.published ? "bg-success text-white" : "bg-warning"
        }`}
      >
        {quiz.published ? "✅ Published" : "🚫 Unpublished"}
      </div>

      {/* ── Title ── */}
      <h2 className="mb-4">{quiz.title}</h2>

      {/* ── Details table ── */}
      <table className="table table-borderless mb-4">
        <tbody>
          <DetailRow label="Quiz Type" value={quiz.quizType || "Graded Quiz"} />
          <DetailRow label="Points" value={quiz.points ?? 0} />
          <DetailRow label="Assignment Group" value={quiz.assignmentGroup || "Quizzes"} />
          <DetailRow label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
          <DetailRow
            label="Time Limit"
            value={quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No time limit"}
          />
          <DetailRow
            label="Multiple Attempts"
            value={quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts} attempts)` : "No"}
          />
          <DetailRow
            label="Show Correct Answers"
            value={quiz.showCorrectAnswers || "Never"}
          />
          <DetailRow
            label="Access Code"
            value={quiz.accessCode || <span className="text-muted fst-italic">None</span>}
          />
          <DetailRow label="One Question at a Time" value={quiz.oneQuestionAtATime ? "Yes" : "No"} />
          <DetailRow label="Webcam Required" value={quiz.webcamRequired ? "Yes" : "No"} />
          <DetailRow
            label="Lock Questions After Answering"
            value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          />
        </tbody>
      </table>

      {/* ── Date table ── */}
      <table className="table table-bordered text-center">
        <thead className="table-secondary">
          <tr>
            <th>Due</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>{formatDate(quiz.availableFrom)}</td>
            <td>{formatDate(quiz.availableUntil)}</td>
          </tr>
        </tbody>
      </table>

      {!isFaculty && lastAttempt && (
        <div className="text-center mb-3 p-3 rounded bg-light border">
            <div className="fw-bold">Last Attempt Score</div>
            <div style={{ fontSize: "1.5rem" }}>
            {lastAttempt.score} / {lastAttempt.totalPoints}
            </div>
            <div className="text-muted small">
            {new Date(lastAttempt.date).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric"
            })}
            </div>
        </div>
        )}

      {/* ── Student start button ── */}
      {!isFaculty && (
        <div className="text-center mt-4">
          <button
            className="btn btn-danger btn-lg px-5"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
          >
            Take Quiz
          </button>
        </div>
      )}
    </div>
  );
}