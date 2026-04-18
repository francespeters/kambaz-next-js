/* eslint-disable @typescript-eslint/no-explicit-any */

export default function QuizDetailsTab({
  quiz,
  onChange,
}: {
  quiz: any;
  onChange: (field: string, value: any) => void;
}) {
  return (
    <div>
      {/* Title */}
      <div className="mb-3">
        <label className="form-label fw-bold">Title</label>
        <input
          className="form-control"
          value={quiz.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="mb-3">
        <label className="form-label fw-bold">Description</label>
        <textarea
          className="form-control"
          rows={4}
          value={quiz.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Quiz instructions..."
        />
      </div>

      <div className="row">
        {/* Quiz Type */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Quiz Type</label>
          <select
            className="form-select"
            value={quiz.quizType || "Graded Quiz"}
            onChange={(e) => onChange("quizType", e.target.value)}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </select>
        </div>

        {/* Assignment Group */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Assignment Group</label>
          <select
            className="form-select"
            value={quiz.assignmentGroup || "Quizzes"}
            onChange={(e) => onChange("assignmentGroup", e.target.value)}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </select>
        </div>
      </div>

      <hr />
      <h6 className="text-muted mb-3 text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
        Options
      </h6>

      <div className="row">
        {/* Shuffle Answers */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Shuffle Answers</label>
          <select
            className="form-select"
            value={quiz.shuffleAnswers ? "Yes" : "No"}
            onChange={(e) => onChange("shuffleAnswers", e.target.value === "Yes")}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Time Limit */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Time Limit (minutes)</label>
          <input
            type="number"
            className="form-control"
            value={quiz.timeLimit ?? 20}
            min={0}
            onChange={(e) => onChange("timeLimit", Number(e.target.value))}
          />
        </div>

        {/* Multiple Attempts */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Multiple Attempts</label>
          <select
            className="form-select"
            value={quiz.multipleAttempts ? "Yes" : "No"}
            onChange={(e) => onChange("multipleAttempts", e.target.value === "Yes")}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* How Many Attempts — only shows if multipleAttempts is true */}
        {quiz.multipleAttempts && (
          <div className="mb-3 col-md-6">
            <label className="form-label fw-bold">How Many Attempts</label>
            <input
              type="number"
              className="form-control"
              value={quiz.howManyAttempts ?? 1}
              min={1}
              onChange={(e) => onChange("howManyAttempts", Number(e.target.value))}
            />
          </div>
        )}

        {/* Show Correct Answers */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Show Correct Answers</label>
          <select
            className="form-select"
            value={quiz.showCorrectAnswers || ""}
            onChange={(e) => onChange("showCorrectAnswers", e.target.value)}
          >
            <option value="">Never</option>
            <option value="immediately">Immediately after attempt</option>
            <option value="after_due">After due date</option>
            <option value="after_close">After quiz is closed</option>
          </select>
        </div>

        {/* Access Code */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Access Code</label>
          <input
            className="form-control"
            value={quiz.accessCode || ""}
            placeholder="Leave blank for no code"
            onChange={(e) => onChange("accessCode", e.target.value)}
          />
        </div>

        {/* One Question at a Time */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">One Question at a Time</label>
          <select
            className="form-select"
            value={quiz.oneQuestionAtATime ? "Yes" : "No"}
            onChange={(e) => onChange("oneQuestionAtATime", e.target.value === "Yes")}
          >
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>

        {/* Webcam Required */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Webcam Required</label>
          <select
            className="form-select"
            value={quiz.webcamRequired ? "Yes" : "No"}
            onChange={(e) => onChange("webcamRequired", e.target.value === "Yes")}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        {/* Lock Questions After Answering */}
        <div className="mb-3 col-md-6">
          <label className="form-label fw-bold">Lock Questions After Answering</label>
          <select
            className="form-select"
            value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
            onChange={(e) =>
              onChange("lockQuestionsAfterAnswering", e.target.value === "Yes")
            }
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>
      </div>

      <hr />
      <h6 className="text-muted mb-3 text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
        Dates
      </h6>

      <div className="row">
        <div className="mb-3 col-md-4">
          <label className="form-label fw-bold">Due Date</label>
          <input
            type="date"
            className="form-control"
            value={quiz.dueDate || ""}
            onChange={(e) => onChange("dueDate", e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label fw-bold">Available From</label>
          <input
            type="date"
            className="form-control"
            value={quiz.availableFrom || ""}
            onChange={(e) => onChange("availableFrom", e.target.value)}
          />
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label fw-bold">Until</label>
          <input
            type="date"
            className="form-control"
            value={quiz.availableUntil || ""}
            onChange={(e) => onChange("availableUntil", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}