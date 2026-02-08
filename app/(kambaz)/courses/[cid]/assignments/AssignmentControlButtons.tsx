import { IoAdd, IoEllipsisVertical } from "react-icons/io5";
import Button from "react-bootstrap/esm/Button";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end"> 
    <Button variant="outline-secondary" size="sm" className="me-1 rounded-pill border border-dark" id="wd-view-progress-btn" disabled>
        40% of Total
        </Button>
      <IoAdd className="fs-4 me-2" />
      <IoEllipsisVertical className="fs-4" />
    </div> 
  );
}