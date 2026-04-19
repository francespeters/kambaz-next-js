/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";
import { useEffect, useState } from "react";
import * as attemptsClient from "../../../attemptsClient";
import * as quizzesClient from "../../../quizzesClient";
import GreenCheckmark from "../../modules/GreenCheckmark";
import { CgRemove } from "react-icons/cg";

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

    const existingQuiz = useSelector((state: RootState) =>
        state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
    );

    const [quiz, setQuiz] = useState<any>(null);
    const [lastAttempt, setLastAttempt] = useState<any>(null);
    const [attemptCount, setAttemptCount] = useState(0);

    useEffect(() => {
        if (existingQuiz) {
        setQuiz(existingQuiz);
        } else {
        quizzesClient.findQuizById(qid as string).then(setQuiz);
        }
    }, [qid, existingQuiz]);

    useEffect(() => {
        if (!isFaculty && currentUser?._id) {
        attemptsClient.getLatestAttempt(qid as string, currentUser._id)
            .then(setLastAttempt);
        attemptsClient.countAttempts(qid as string, currentUser._id)
            .then(({ count }) => setAttemptCount(count));
        }
    }, [qid, currentUser, isFaculty]);

    if (!quiz) return <div className="p-4 text-muted">Loading...</div>;

    const maxAttempts = quiz.multipleAttempts ? (quiz.howManyAttempts ?? 1) : 1;
    const canRetake = quiz.multipleAttempts && attemptCount < maxAttempts;

    return (
        <div className="p-4" style={{ maxWidth: "900px" }}>
            <div className="d-flex justify-content-between gap-2 mb-4">
                {isFaculty && (
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
                        >
                            <BsPencilSquare className="me-1" /> Edit
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
                        >
                            Preview
                        </button>
                    </div>
                )}

                <div className={`text-center py-2 mb-4 rounded fw-semibold`}>
                    {quiz.published ? (
                    <><GreenCheckmark /> Published</>
                    ) : (
                    <><CgRemove /> Unpublished</>
                    )}      
                </div> 
            </div>
            

        <h2 className="mb-4">{quiz.title}</h2>

        <table className="table table-borderless mb-4">
            <tbody>
            <DetailRow label="Quiz Type" value={quiz.quizType || "Graded Quiz"} />
            <DetailRow label="Points" value={quiz.points ?? 0} />
            <DetailRow label="Assignment Group" value={quiz.assignmentGroup || "Quizzes"} />
            <DetailRow label="Shuffle Answers" value={quiz.shuffleAnswers ? "Yes" : "No"} />
            <DetailRow label="Time Limit" value={quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No time limit"} />
            <DetailRow label="Multiple Attempts" value={quiz.multipleAttempts ? `Yes (${quiz.howManyAttempts} attempts)` : "No"} />
            <DetailRow label="Show Correct Answers" value={quiz.showCorrectAnswers || "Never"} />
            <DetailRow label="Access Code" value={quiz.accessCode || <span className="text-muted fst-italic">None</span>} />
            <DetailRow label="One Question at a Time" value={quiz.oneQuestionAtATime ? "Yes" : "No"} />
            <DetailRow label="Webcam Required" value={quiz.webcamRequired ? "Yes" : "No"} />
            <DetailRow label="Lock Questions After Answering" value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"} />
            </tbody>
        </table>

        <div className="d-flex justify-content-between border border-1 rounded p-3">
            <div className=""> 
                <p className="fw-bold">Due</p>
                <p>{formatDate(quiz.dueDate)}</p> 
            </div>
            <div className="">
                <p className="fw-bold">Available From</p>
                <p>{formatDate(quiz.availableFrom)}</p>
            </div>
            <div className="">
                <p className="fw-bold">Available Until</p>
                <p>{formatDate(quiz.availableUntil)}</p>
            </div>
        </div>



        {!isFaculty && lastAttempt && (
            <div className="text-center mb-3 p-3 rounded bg-light border">
            <div className="fw-bold">Last Attempt Score</div>
            <div style={{ fontSize: "1.5rem" }}>
                {lastAttempt.score} / {lastAttempt.totalPoints}
            </div>
            <div className="text-muted small">
                {new Date(lastAttempt.date).toLocaleDateString("en-US", {
                month: "long", day: "numeric", year: "numeric",
                })}
            </div>
            </div>
        )}

        {!isFaculty && (
            <div className="text-center mt-4">
                {attemptCount >= maxAttempts ? (
                <button
                    className="btn btn-outline-secondary btn-lg px-5"
                    onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
                >
                    View Last Attempt
                </button>
                ) : (
                <button
                    className="btn btn-danger btn-lg px-5"
                    onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
                >
                    {attemptCount > 0 ? "Retake Quiz" : "Take Quiz"}
                </button>
                )}
            </div>
        )}
        </div>
  );
}