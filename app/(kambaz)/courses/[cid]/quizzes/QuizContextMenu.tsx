import { Button, Modal } from "react-bootstrap";


export default function QuizContextMenu({ show, deleteQuiz, publishQuiz, editQuiz }: {
 show: boolean; deleteQuiz: () => void;  publishQuiz: () => void; editQuiz: () => void;}) {
  return (
    <Modal show={show} >
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this assignment?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={ ()=>{
               deleteQuiz();
            } 
            }> Confirm </Button>
        </Modal.Footer>
    </Modal>
  );
}