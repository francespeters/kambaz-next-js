"use client"

import Link from "next/link"
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { BsGripVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentSubControls from "./AssignmentSubControls";
import AssignmentSearch from "./AssignmentSearch";
import { assignments } from "@/app/(kambaz)/database";
import { useParams } from "next/navigation";

/**
 * https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
 * For formatting the date ^
 */
export default function Assignments() {
    const { cid } = useParams();
    type Assignment = {
        _id: string;
        title: string;
        course: string;
        description?: string;
        points: string;
        dueDate: string;
        availableFrom: string;
        availableUntil: string;
    };
    
    return (
    <div id="wd-assignments">
    <div>
        <AssignmentSearch />
        <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS <AssignmentControlButtons /> </div>

      <ListGroup className="rounded-0" id="wd-modules">
        {assignments.filter((assignment: Assignment) => assignment.course === cid )
        .map((assignment: Assignment) => (
          <ListGroupItem key={assignment._id} className="wd-lesson d-flex p-3 ps-1 align-items-center">
            <BsGripVertical className="me-2 fs-3" /> <BiSolidEdit className="me-2 fs-3 " />
            <div className="flex-fill me-3 ps-4">
                <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="text-decoration-none text-dark">
                    <h5 className="mb-2">{assignment.title}</h5>
                </Link>
                <p className="mb-1"><span className="text-danger">Multiple Modules</span> | <strong>Not avaiable until</strong> {new Date(assignment.availableFrom).toLocaleDateString("en-US",{
                            month: "long",
                            day: "numeric"
                            })} </p>
                <p className="mb-0"><strong>Due </strong> {
                            new Date(assignment.dueDate).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric"
                            })} | {assignment.points} pts
                </p>
            </div>
            <AssignmentSubControls />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  </div>
);}


           
                