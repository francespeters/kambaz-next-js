/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { BsChevronDown } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import * as quizzesClient from "../../quizzesClient";
import QuizControlButtons from "./QuizControlButtons";
import QuizContainerHeading from "./QuizContainerHeading";
import QuizSubControls from "./QuizSubControls";
import { setQuizzes, deleteQuiz, togglePublishQuiz } from "./reducer";
import * as attemptsClient from "../../attemptsClient";

type Quiz = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points: number;
  availableFrom: string;
  availableUntil: string;
  published: boolean;
  dueDate: string;
  questions: any[];
};

export default function Quizzes() {
    const { cid } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);

    const [lastAttempts, setLastAttempts] = useState<Record<string, any>>({});


    const fetchQuizzes = async () => {
        const list = await quizzesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(list));
    };

    useEffect(() => {
        fetchQuizzes();
    }, [cid]);

    useEffect(() => {
    if (isFaculty || !currentUser?._id) return;
    const courseQuizzes = quizzes.filter((q: Quiz) => q.course === cid);
    courseQuizzes.forEach(async (quiz: Quiz) => {
      try {
        const attempt = await attemptsClient.getLatestAttempt(quiz._id, currentUser._id);
        if (attempt) {
          setLastAttempts((prev) => ({ ...prev, [quiz._id]: attempt }));
        }
      } catch {
        // no attempt yet for this quiz, that's fine
      }
    });
  }, [quizzes, currentUser, isFaculty]);

    const onRemoveQuiz = async (quizId: string) => {
        await quizzesClient.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };

    const onTogglePublish = async (quiz: Quiz) => {
    const updated = { ...quiz, published: !quiz.published };
    await quizzesClient.updateQuiz(updated);          
    dispatch(togglePublishQuiz(quiz._id));             
    };

    const courseQuizzes = quizzes.filter((q: Quiz) => 
        q.course === cid && (isFaculty || q.published)
    );

  return (
    <div id="wd-quizzes">
      {isFaculty && (
        <>
          <QuizControlButtons />
          <hr />
        </>
      )}

      <div className="wd-title p-3 ps-2 bg-secondary">
        <BsChevronDown className="me-2 fs-3" /> Quizzes
        <QuizContainerHeading />
      </div>

      {courseQuizzes.length === 0 ? (
        <div className="text-center text-muted p-5">
          No quizzes yet. Click <strong>+ Quiz</strong> to add one.
        </div>
      ) : (
        <ListGroup className="rounded-0" id="wd-quizzes">
        {courseQuizzes.map((quiz: Quiz) => {
            const attempt = lastAttempts[quiz._id];
                return (
                <ListGroupItem
                key={quiz._id}
                className="wd-lesson d-flex p-3 ps-1 align-items-center"
                >
                <div className="flex-fill me-3 ps-4">
                    <h5 className="mb-2" 
                        style={{ cursor: "pointer",  }}
                        onClick={() => router.push(
                        isFaculty
                            ? `/courses/${cid}/quizzes/${quiz._id}`
                            : `/courses/${cid}/quizzes/${quiz._id}`
                        )}
                    >
                    {quiz.title}
                    </h5>
                    <p className="mb-1">
                    <strong>Not available until </strong>
                    {new Date(`${quiz.availableFrom}T00:00:00`).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}
                    </p>
                    <p className="mb-0">
                    <strong>Due </strong>
                    {new Date(`${quiz.dueDate}T00:00:00`).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                    })}{" "}
                    | {quiz.points} pts
                    | {quiz.questions.length} questions

                    {!isFaculty && attempt && (
                        <span className="ms-3">
                            | <strong>Score: </strong>
                            <span className={
                            attempt.score / attempt.totalPoints >= 0.7
                                ? "text-success fw-bold"
                                : "text-danger fw-bold"
                            }>
                            {attempt.score} / {attempt.totalPoints}
                            </span>
                        </span>
                        )}
                        {!isFaculty && !attempt && (
                        <span className="ms-3 text-muted">| Not yet taken</span>
                        )}
                    </p>
              </div>

              {isFaculty && (
                <QuizSubControls
                    quiz={quiz}
                    deleteQuiz={(id) => onRemoveQuiz(id)}
                    editQuiz={() =>
                    router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`)
                    }
                    togglePublish={() => onTogglePublish(quiz)}  
                />
                )}
            </ListGroupItem>
          )}
          )}
        </ListGroup>
      )}
    </div>
  );
}