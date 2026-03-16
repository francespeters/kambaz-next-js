import { Button, Modal } from "react-bootstrap";


export default function AssignmentDeleteDialog({ show, handleCancel, handleConfirm, deleteAssignment }: {
 show: boolean; handleCancel: () => void; handleConfirm: () => void; deleteAssignment: () => void; }) {
  return (
    <Modal show={show} onHide={handleCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to delete this assignment?</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}> Cancel </Button>
            <Button variant="primary" onClick={ ()=>{
               deleteAssignment();
                handleConfirm(); 
            } 
            }> Confirm </Button>
        </Modal.Footer>
    </Modal>
  );
}