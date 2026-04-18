"use client";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/InputGroupText";
import { BsSearch } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import * as quizzesClient from "../../quizzesClient";
import { addQuiz } from "./reducer";

export default function QuizControlButtons() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddQuiz = async () => {
    const newQuiz = {
      title: "New Quiz",
      course: cid,
      description: "",
      quizType: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableFrom: "",
      availableUntil: "",
      published: false,
      questions: [],
    };

    const created = await quizzesClient.createQuizzesForCourse(cid, newQuiz);
    dispatch(addQuiz(created));
    router.push(`/courses/${cid}/quizzes/${created._id}/edit`);
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <InputGroup style={{ width: "300px" }}>
        <InputGroupText className="bg-white">
          <BsSearch />
        </InputGroupText>
        <FormControl placeholder="Search..." />
      </InputGroup>

      <Button
        variant="danger"
        size="lg"
        className="border-0"
        onClick={handleAddQuiz}
      >
        <IoAdd className="fs-4 me-2" />
        Quiz
      </Button>
    </div>
  );
}