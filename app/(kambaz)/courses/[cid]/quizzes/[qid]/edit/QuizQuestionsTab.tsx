/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BsTrash, BsPencil, BsPlus, BsSubtract } from "react-icons/bs";
import { IoRemove, IoTrash } from "react-icons/io5";

type Question = {
    _id: string;
    type: "multiple_choice" | "true_false" | "fill_in_blank";
    title: string;
    points: number;
    choices?: { _id: string; text: string; isCorrect: boolean }[];
    correctAnswer?: boolean;
    correctAnswers?: string[];
};

function QuestionForm({
    question,
    onSave,
    onCancel,
}: {
    question: Partial<Question>;
    onSave: (q: Question) => void;
    onCancel: () => void;
}) {
    const [q, setQ] = useState<any>({
        _id: question._id || uuidv4(),
        type: question.type || "multiple_choice",
        title: question.title || "",
        points: question.points || 0,
        choices: question.choices || [
        { _id: uuidv4(), text: "", isCorrect: false },
        { _id: uuidv4(), text: "", isCorrect: false },
        ],
        correctAnswer: question.correctAnswer ?? true,
        correctAnswers: question.correctAnswers || [""],
    });

    const updateChoice = (id: string, field: string, value: any) => {
        setQ((prev: any) => ({
        ...prev,
        choices: prev.choices.map((c: any) =>
            c._id === id
            ? { ...c, [field]: value }
            // if setting isCorrect, unset others (single correct)
            : field === "isCorrect" && value
            ? { ...c, isCorrect: false }
            : c
        ),
        }));
    };

    const addChoice = () =>
        setQ((prev: any) => ({
        ...prev,
        choices: [...prev.choices, { _id: uuidv4(), text: "", isCorrect: false }],
    }));

    const removeChoice = (id: string) =>
        setQ((prev: any) => ({
        ...prev,
        choices: prev.choices.filter((c: any) => c._id !== id),
    }));

    return (
        <div className="border rounded p-3 mb-3 bg-light">
            <div className="row mb-2">
            <div className="col-md-8">
            <label className="form-label fw-bold">Question Text</label>
            <input
                className="form-control"
                value={q.title}
                onChange={(e) => setQ({ ...q, title: e.target.value })}
                placeholder="Enter question..."
            />
            </div>
            <div className="col-md-2">
                <label className="form-label fw-bold">Points</label>
                <input
                    type="number"
                    className="form-control"
                    value={q.points}
                    min={0}
                    onChange={(e) => setQ({ ...q, points: Number(e.target.value) })}
                />
            </div>
            <div className="col-md-2">
                <label className="form-label fw-bold">Type</label>
                    <select
                        className="form-select"
                        value={q.type}
                        onChange={(e) => setQ({ ...q, type: e.target.value })}>
                        <option value="multiple_choice">Multiple Choice</option>
                        <option value="true_false">True / False</option>
                        <option value="fill_in_blank">Fill in the Blank</option>
                    </select>
                </div>
            </div>

            {q.type === "multiple_choice" && (
                <div className="mb-2">
                    <label className="form-label fw-bold">Choices <span className="text-muted fw-normal">(check the correct answer)</span></label>
                    {q.choices.map((c: any, i: number) => (
                        <div key={c._id} className="d-flex align-items-center gap-2 mb-1">
                        <input
                            type="radio"
                            name={`correct-${q._id}`}
                            checked={c.isCorrect}
                            onChange={() => updateChoice(c._id, "isCorrect", true)}
                        />
                        <input
                            className="form-control"
                            value={c.text}
                            placeholder={`Choice ${i + 1}`}
                            onChange={(e) => updateChoice(c._id, "text", e.target.value)}
                        />
                        <button
                            className="btn btn-sm text-danger"
                            onClick={() => removeChoice(c._id)}
                            disabled={q.choices.length <= 2}
                        >
                            <IoRemove />
                        </button>
                        </div>
                    ))}
                    <button className="btn btn-sm btn-outline-secondary mt-1" onClick={addChoice}>
                        <BsPlus /> Add Choice
                    </button>
                </div>
            )}

            {q.type === "true_false" && (
                <div className="mb-2">
                    <label className="form-label fw-bold">Correct Answer</label>
                    <select
                        className="form-select"
                        value={q.correctAnswer ? "true" : "false"}
                        onChange={(e) => setQ({ ...q, correctAnswer: e.target.value === "true" })}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            )}

            {q.type === "fill_in_blank" && (
                <div className="mb-2">
                <label className="form-label fw-bold">Accepted Answers <span className="text-muted fw-normal">(one per line)</span></label>
                <textarea
                    className="form-control"
                    rows={3}
                    value={q.correctAnswers.join("\n")}
                    onChange={(e) =>
                    setQ({ ...q, correctAnswers: e.target.value.split("\n") })
                    }
                    placeholder="useEffect&#10;UseEffect"/>
                </div>
            )}

            <div className="d-flex gap-2 justify-content-end mt-4">
                <button className="btn btn-link text-secondary text-decoration-none" onClick={onCancel}>
                    Cancel
                </button>
                <button className="btn btn-link text-danger text-decoration-none" onClick={() => onSave(q)}>
                    Save Question
                </button>
            </div>
        </div>
  );
}

export default function QuizQuestionsTab({
    quiz,
    onChange,
}: {
    quiz: any;
    onChange: (field: string, value: any) => void;
}) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [addingNew, setAddingNew] = useState(false);

    const questions: Question[] = quiz.questions || [];

    const totalPoints = questions.reduce((sum: number, q: Question) => sum + (q.points || 0), 0);

    const saveQuestion = (updated: Question) => {
        const exists = questions.find((q) => q._id === updated._id);
        const newQuestions = exists
        ? questions.map((q) => (q._id === updated._id ? updated : q))
        : [...questions, updated];
        onChange("questions", newQuestions);
        const newTotal = newQuestions.reduce((sum, q) => sum + (q.points || 0), 0);
        onChange("points", newTotal);
        setEditingId(null);
        setAddingNew(false);
    };

    const deleteQuestion = (id: string) => {
        const newQuestions = questions.filter((q) => q._id !== id);
        onChange("questions", newQuestions);
        onChange("points", newQuestions.reduce((sum, q) => sum + (q.points || 0), 0));
    };

    const questionTypeLabel: Record<string, string> = {
        multiple_choice: "Multiple Choice",
        true_false: "True / False",
        fill_in_blank: "Fill in the Blank",
    };

    return (
    <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0 text-muted">
                {questions.length} question{questions.length !== 1 ? "s" : ""} &nbsp;|&nbsp; {totalPoints} pts total
            </p>
            <button
                className="btn btn-link text-danger text-decoration-none fw-bold"
                onClick={() => { setAddingNew(true); setEditingId(null); }}
                disabled={addingNew}
            >
            <BsPlus className="me-1" /> New Question
            </button>
        </div>

        {addingNew && (
            <QuestionForm
            question={{}}
            onSave={saveQuestion}
            onCancel={() => setAddingNew(false)}
            />
        )}

        {questions.length === 0 && !addingNew && (
            <p className="text-center text-muted py-5">
            No questions yet. Click <strong>+ New Question</strong> to add one.
            </p>
        )}

      {questions.map((q: Question, index: number) =>
        editingId === q._id ? (
          <QuestionForm
            key={q._id}
            question={q}
            onSave={saveQuestion}
            onCancel={() => setEditingId(null)}
          />
        ):(
          <div
            key={q._id}
            className="border rounded p-3 mb-2 d-flex justify-content-between align-items-start">
            <div>
                <span className="text-muted me-2 small">Q{index + 1}.</span>
                <strong>{q.title || <span className="text-muted fst-italic">Untitled question</span>}</strong>
                <div className="text-muted small mt-1">
                    {questionTypeLabel[q.type]} &nbsp;|&nbsp; {q.points} pts
                </div>
            </div>
            <div className="d-flex gap-2">
              <button
                    className="btn btn-m"
                    onClick={() => { setEditingId(q._id); setAddingNew(false); }}>
                    <BsPencil />
              </button>
              <button
                    className="btn btn-sm"
                    onClick={() => deleteQuestion(q._id)}>
                    <IoTrash className="fs-4 text-danger" cursor="pointer"/>
              </button>
            </div>
          </div>
        )
        )}
    </div>
  );
}