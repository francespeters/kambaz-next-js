import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
export default function AssignmentSubControls() {
  return (
    <div className="float-end d-flex  gap-4"> 
        <IoEllipsisVertical className="fs-4" />
        <GreenCheckmark />
        
    </div> 
  );
}