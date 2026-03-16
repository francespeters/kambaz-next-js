import { IoEllipsisVertical, IoTrash } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { useState } from "react";
import AssignmentDeleteDialog from "./AssignmentDeleteDialog";
import { useDispatch } from "react-redux";
export default function AssignmentSubControls({assignmentid, deleteAssignment, editAssignment}: 
  { assignmentid: string; deleteAssignment: (id: string) => void; editAssignment: (id: string) => void }) {
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

  return (
    <div className="float-end d-flex  gap-4"> 
        <IoEllipsisVertical className="fs-4" />
        <GreenCheckmark />
        <IoTrash className="fs-4 text-danger" cursor="pointer"
          onClick = {handleShow}
        />
        <AssignmentDeleteDialog show={show} handleCancel={handleClose} handleConfirm={handleClose} deleteAssignment={() => deleteAssignment(assignmentid)} />
        
        
    </div> 
  );
}