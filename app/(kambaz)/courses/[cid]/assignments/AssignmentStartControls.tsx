import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
export default function AssignmentStartControls({ assignmentid, editAssignment }: 
  { assignmentid: string; deleteAssignment: (id: string) => void; editAssignment: (id: string) => void }) {
  return (
    <div className="float-end d-flex  gap-4"> 
        <BsGripVertical className="me-2 fs-3" /> <BiSolidEdit onClick={() => editAssignment(assignmentid)} className="me-2 fs-3 " />

        
    </div> 
  );
}