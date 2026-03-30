/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as assignmentsClient from "../../assignmentsClient";
import Link from "next/link"
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { BsGripVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentSubControls from "./AssignmentSubControls";
import AssignmentSearch from "./AssignmentSearch";
import { useParams } from "next/navigation";

import { editAssignment, setAssignments } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";

import AssignmentStartControls from "./AssignmentStartControls";
import { useEffect, useState } from "react";


/**
 * https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
 * For formatting the date ^
 */
export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
    const dispatch = useDispatch();

    

    const onRemoveAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(setAssignments(assignments.filter((a: any) => a._id !== assignmentId)));
      };

    

    const fetchAssignments = async () => {
            const list = await assignmentsClient.findAssignmentsForCourse(cid as string);
            dispatch(setAssignments(list));
        };
        useEffect(() => {
            fetchAssignments();
        }, [cid]);

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
        <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS 
        <AssignmentControlButtons 
          
        /> 
        </div>

      <ListGroup className="rounded-0" id="wd-modules">
        {assignments
        .map((assignment: Assignment) => (
          <ListGroupItem key={assignment._id} className="wd-lesson d-flex p-3 ps-1 align-items-center">
            
            <Link href={`/courses/${cid}/assignments/${assignment._id}`} className="text-decoration-none text-dark">
              <AssignmentStartControls 
              assignmentid={assignment._id}
              deleteAssignment={(assignmentId) => onRemoveAssignment(assignmentId)}
              editAssignment={() => dispatch(editAssignment(assignment._id))}
              />
            </Link>  

            <div className="flex-fill me-3 ps-4">
                    <h5 className="mb-2">
                      {assignment.title}
                    
                    </h5>
                
                <p className="mb-1"><span className="text-danger">Multiple Modules</span> | &nbsp;
                <strong>Not avaiable until </strong>  {new Date(`${assignment.availableFrom}T00:00:00`).toLocaleDateString("en-US",{
                            month: "long",
                            day: "numeric"
                            })} </p>
                <p className="mb-0"><strong>Due </strong> {
                            new Date(`${assignment.dueDate}T00:00:00`).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric"
                  })} | {assignment.points} pts
                </p>
            </div>
            
            <AssignmentSubControls assignmentid={assignment._id} 
              deleteAssignment={(id) => onRemoveAssignment(id)}
              editAssignment={() => dispatch(editAssignment(assignment._id))}
            />

          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  </div>
);}


           
                