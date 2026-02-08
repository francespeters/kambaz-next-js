import Link from "next/link"
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { BsGripVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentSubControls from "./AssignmentSubControls";
import AssignmentSearch from "./AssignmentSearch";
export default function Assignments() {
 return (
  <div id="wd-assignments">
    <div>
        <AssignmentSearch />

      <ListGroup className="rounded-0" id="wd-modules">
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentControlButtons /> </div>
                <ListGroup className="wd-lessons rounded-0">
                    <ListGroupItem className="wd-lesson d-flex p-3 ps-1 align-items-center">
                        <BsGripVertical className="me-2 fs-3" /> <BiSolidEdit className="me-2 fs-3 " />
                        <div className="flex-fill me-3 ps-4">
                            <Link href="/courses/1234/assignments/123" className="text-decoration-none text-dark">
                                <h5 className="mb-2">A1</h5>
                            </Link>
                            <p className="mb-1"><span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 6 at 12:00 am |</p>
                            <p className="mb-0"><strong>Due:</strong> May 13 at 11:59 pm | 100 pts</p>
                        </div>
                        <AssignmentSubControls />
                    </ListGroupItem>

                    <ListGroupItem className="wd-lesson d-flex p-3 ps-1 align-items-center">
                        <BsGripVertical className="me-2 fs-3" /> <BiSolidEdit className="me-2 fs-3" />
                        <div className="flex-fill me-3 ps-4">
                            <Link href="/courses/1234/assignments/123" className="text-decoration-none text-dark">
                                <h5 className="mb-2">A2</h5>
                            </Link>
                            <p className="mb-1"><span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 14 at 12:00 am |</p>
                            <p className="mb-0"><strong>Due:</strong> May 25 at 11:59 pm | 100 pts</p>
                        </div>
                        <AssignmentSubControls />
                    </ListGroupItem>

                    <ListGroupItem className="wd-lesson d-flex p-3 ps-1 align-items-center">
                        <BsGripVertical className="me-2 fs-3" /> <BiSolidEdit className="me-2 fs-3" />
                        <div className="flex-fill me-3 ps-4">
                            <Link href="/courses/1234/assignments/123" className="text-decoration-none text-dark">
                                <h5 className="mb-2">A3</h5>
                            </Link>
                            <p className="mb-1"><span className="text-danger">Multiple Modules</span> | <strong>Not available until</strong> May 20 at 12:00 am |</p>
                            <p className="mb-0"><strong>Due:</strong> May 27 at 11:59 pm | 100 pts</p>
                        </div>
                        <AssignmentSubControls />
                    </ListGroupItem>
                    
                </ListGroup>
                
            </ListGroupItem>

            

            
        </ListGroup>
      
        
        
    </div>

  </div>

);}
