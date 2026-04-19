/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import GreenCheckmark from "../modules/GreenCheckmark";
import { CgRemove } from "react-icons/cg";

type Quiz = {
    _id: string;
    published: boolean;
    [key: string]: any;
};

export default function QuizSubControls({
    quiz,
    deleteQuiz,
    editQuiz,
    togglePublish,
}: {
    quiz: Quiz;
    deleteQuiz: (id: string) => void;
    editQuiz: () => void;
    togglePublish: () => void;
}) {
    const [show, setShow] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setShow(false);
        }
        };
        if (show) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [show]);

    return (
        <div className="d-flex align-items-center gap-3 position-relative" ref={menuRef}>

            <span
                role="button"
                title={quiz.published ? "Click to unpublish" : "Click to publish"}
                onClick={togglePublish}
                style={{ cursor: "pointer", fontSize: "1.2rem" }}
            >
                {quiz.published ? <GreenCheckmark /> : <CgRemove />}
            </span>

        <IoEllipsisVertical
            className="fs-4"
            style={{ cursor: "pointer" }}
            onClick={() => setShow((prev) => !prev)}
        />

        {show && (
            <div
            className="position-absolute bg-white border rounded shadow"
            style={{ zIndex: 1000, right: 0, top: "100%", minWidth: "160px" }}
            >
            <ul className="list-unstyled mb-0 py-1">
                <li
                    className="px-3 py-2"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    onClick={() => { editQuiz(); setShow(false); }}
                >
                Edit
                </li>
                <li
                    className="px-3 py-2"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    onClick={() => { togglePublish(); setShow(false); }}
                >
                {quiz.published ? "Unpublish" : "Publish"}
                </li>
                <li className="border-top" />
                <li
                    className="px-3 py-2 text-danger"
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    onClick={() => { deleteQuiz(quiz._id); setShow(false); }}
                >
                Delete
                </li>
            </ul>
            </div>
        )}
        </div>
  );
}