/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as assignmentsClient from "../../../assignmentsClient";

import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, FormSelect } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import FormCheck from "react-bootstrap/esm/FormCheck";

import FormControl from "react-bootstrap/esm/FormControl";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Row from "react-bootstrap/esm/Row";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../reducer";


type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number | string;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
};

export default function AssignmentEditor() {
    const { cid, aid } = useParams<{ cid: string; aid: string }>();     
    const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);

    const [assignment, setAssignment] = useState<Partial<Assignment>>({
        title: "",
        description: "",
        points: 100,
        dueDate: "",
        availableFrom: "",
        availableUntil: "",
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const isNew = aid === "new";

    useEffect(() => {
        if (!cid) return;
        (async () => {
            const list = await assignmentsClient.findAssignmentsForCourse(cid);
            dispatch(setAssignments(list));
        })();
    }, [cid, dispatch]);

    useEffect(() => {
        if (isNew) {
            setAssignment({
                title: "",
                description: "",
                points: 100,
                dueDate: "",
                availableFrom: "",
                availableUntil: "",
            });
            return;
        }
        if (!aid) return;
        const found = assignments.find((a: any) => a._id === aid);
        if (found) {
            setAssignment(found);
        }
    }, [isNew, aid, assignments]);

    const onSave = async () => {
        if (!cid) return;
        const body = {
            title: assignment.title ?? "",
            description: assignment.description ?? "",
            points:
                assignment.points === undefined || assignment.points === ""
                    ? "0"
                    : String(assignment.points),
            dueDate: assignment.dueDate ?? "",
            availableFrom: assignment.availableFrom ?? "",
            availableUntil: assignment.availableUntil ?? "",
        };

        try {
            if (isNew) {
                const created = await assignmentsClient.createAssignmentForCourse(cid, body);
                dispatch(setAssignments([...assignments, created]));
            } else if (aid) {
                const updated = await assignmentsClient.updateAssignment({
                    ...body,
                    _id: aid,
                    course: cid,
                });
                dispatch(
                    setAssignments(
                        assignments.map((a: any) =>
                            a._id === updated._id ? updated : a
                        )
                    )
                );
            }
            router.push(`/courses/${cid}/assignments`);
        } catch (e) {
            console.error(e);
        }
    };

    const onCancel = () => {
      router.push(`/courses/${cid}/assignments`);
    };



    return (
    <div id="wd-assignments-editor">
                <Form>
                    <Row className="mb-3" >
                        <Col>

                            <FormLabel> Assignment Name </FormLabel>
                            <FormControl type="text" value={assignment.title ?? ""} placeholder="Assignment name"
                                onChange={(e) => setAssignment((a) => ({ ...a, title: e.target.value }))}
                            /> 
            
                        </Col>  
                        
                    </Row>

                    <Row className="mb-3" >
                        <Col>
                        <FormControl as="textarea" style={{ height: "100px" }} placeholder="Assignment description" value={assignment.description ?? ""} 
                            onChange={(e) => setAssignment((a) => ({ ...a, description: e.target.value }))}
                        />
                            </Col>
                    </Row>

                    <div id ="wd-assignment-offset-section">
                        <Row className="mb-3">
                            <Col sm={3}>                            
                                <FormLabel> Points </FormLabel>
                            </Col>
                            <Col sm={9}> 
                                <FormControl type="number" value={assignment.points ?? 0} 
                                    onChange={(e) => setAssignment((a) => ({ ...a, points: parseInt(e.target.value) || 0 }))}
                                /> 
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm={3}>
                                <FormLabel> Assignment Group </FormLabel>
                            </Col>
                            
                            <Col sm={9}>
                                <FormSelect>
                                    <option value="1" defaultChecked>ASSIGNMENTS</option>
                                    <option value="2">QUIZZES</option>
                                    <option value="3">PROJECTS</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>                            
                                <FormLabel> Display Grade as</FormLabel>
                            </Col>
                            <Col>
                                <FormSelect>
                                <option value="1" defaultChecked> Percentage</option>
                                <option value="2">Letter Grade</option>
                                <option value="3">Points</option>
                                </FormSelect>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>                            
                                <FormLabel column sm={2} > Submission Type </FormLabel>
                            </Col>
                            <Col sm={9} className="border border-1 rounded p-3">
                                <FormSelect>
                                <option value="1" defaultChecked>Online</option>
                                <option value="2">In-person</option>
                                </FormSelect>
                                <p className="mt-3"> <strong>Online Entry Options</strong></p>
                                <FormCheck type="checkbox" label="Text Entry" name="online-entry-options" id="wd-chkbox-text-entry"/>
                                <FormCheck type="checkbox" label="Website URL" name="online-entry-options" id="wd-chkbox-web" defaultChecked/>
                                <FormCheck type="checkbox" label="Media Recordings" name="online-entry-options" id="wd-chkbox-rec"/>
                                <FormCheck type="checkbox" label="Student Annotation" name="online-entry-options" id="wd-chkbox-anno"/>
                                <FormCheck type="checkbox" label="File Uploads" name="online-entry-options" id="wd-chkbox-file"/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col sm={3}>
                                <FormLabel > Assign </FormLabel>
                            </Col>
                            
                            <Col className="border border-1 rounded p-3" sm={9}>
                                <Row>
                                   <Col>
                                    <FormLabel className="fw-bold">Assign to</FormLabel>
                                    <FormControl type="text" defaultValue="Everyone" />
                                    </Col> 
                                </Row>
                                
                                
                                <Row className="mt-3">
                                    <Col >
                                        <FormLabel className="fw-bold">Due</FormLabel>
                                        <FormControl
                                            type="date"
                                            value={assignment.dueDate ?? ""}
                                            onChange={(e) => setAssignment((a) => ({ ...a, dueDate: e.target.value }))}
                                        />                                    
                                    </Col> 
                                </Row>

                                <Row className="mt-3">
                                    <Col sm={6}>
                                        <FormLabel className="fw-bold">Available from</FormLabel>
                                        <FormControl
                                            type="date"
                                            value={assignment.availableFrom ?? ""}
                                            onChange={(e) => setAssignment((a) => ({ ...a, availableFrom: e.target.value }))}
                                        />                               
                                    </Col>

                                    <Col sm={6}>
                                        <FormLabel className="fw-bold">Until</FormLabel>
                                        <FormControl
                                            type="date"
                                            value={assignment.availableUntil ?? ""}
                                            onChange={(e) => setAssignment((a) => ({ ...a, availableUntil: e.target.value }))}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                    </div>  
                </Form>
                <hr/>
                <div className="d-flex gap-2 float-end"> 
                    <Button variant="secondary" size="lg" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button size="lg" className="border-0 bg-danger text-white" onClick={onSave}>
                        Save
                    </Button>
                
                    
                                
                </div> 

    </div>
);}
