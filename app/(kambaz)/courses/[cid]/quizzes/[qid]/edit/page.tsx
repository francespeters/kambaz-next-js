/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { useState, useEffect } from "react";

import * as quizzesClient from "../../../../quizzesClient";
import { updateQuiz, togglePublishQuiz } from "../../reducer";
import QuizDetailsTab from "./QuizDetailsTab";
import QuizQuestionsTab from "./QuizQuestionsTab";


export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const existingQuiz = useSelector((state: RootState) =>
    state.quizzesReducer.quizzes.find((q: any) => q._id === qid)
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");

  useEffect(() => {
    if (existingQuiz) {
      setQuiz(existingQuiz);
    } else {
      quizzesClient.findQuizById(qid as string).then((data) => {
        setQuiz(data);
      });
    }
  }, [qid, existingQuiz]);

  const handleChange = (field: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const published = { ...quiz, published: true };
    await quizzesClient.updateQuiz(published);
    dispatch(updateQuiz(published));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  // ✅ don't render form until quiz is loaded
  if (!quiz) return <div className="p-4">Loading...</div>;

  const tabStyle = (tab: string) => ({
    cursor: "pointer",
    padding: "10px 20px",
    fontWeight: activeTab === tab ? 700 : 400,
    color: activeTab === tab ? "#c00" : "#555",
    background: "none",
    border: "none",
    borderBottom: activeTab === tab ? "3px solid #c00" : "3px solid transparent",
  } as React.CSSProperties);

  return (
    <div className="p-4" style={{ maxWidth: "900px" }}>
      <div className="d-flex border-bottom mb-4">
        <button style={tabStyle("details")} onClick={() => setActiveTab("details")}>
          Details
        </button>
        <button style={tabStyle("questions")} onClick={() => setActiveTab("questions")}>
          Questions
        </button>
      </div>

      {activeTab === "details" ? (
        <QuizDetailsTab quiz={quiz} onChange={handleChange} />
      ) : (
        <QuizQuestionsTab quiz={quiz} onChange={handleChange} />
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2 mt-3">
        <button className="btn btn-outline-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-outline-danger" onClick={handleSaveAndPublish}>
          Save & Publish
        </button>
        <button className="btn btn-danger" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}