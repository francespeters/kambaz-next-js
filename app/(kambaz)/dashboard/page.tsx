/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as db from "../database";
import { RootState } from "../store";

import { useState } from "react";
import { enroll, unenroll } from "../courses/enrollments/reducer";


import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, } from "../courses/reducer";

import Link from "next/link";
import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import CardImg from "react-bootstrap/esm/CardImg";
import CardBody from "react-bootstrap/esm/CardBody";
import CardTitle from "react-bootstrap/esm/CardTitle";
import CardText from "react-bootstrap/esm/CardText";
import Button from "react-bootstrap/esm/Button";
import { FormControl } from "react-bootstrap";
export default function Dashboard() {
    const { courses } = useSelector((state: RootState) => state.coursesReducer);

    const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
    );    
    const [showAll, setShowAll] = useState(false); //for enrollments

    type User = {
        _id: string;
        username: string;
        role: string;
    
    };

    const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
    ) as User | null;
    const isAdmin = currentUser?.role === "FACULTY";


    const dispatch = useDispatch();
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    const visibleCourses = showAll
        ? courses : courses
                .filter((course) =>
                    enrollments.some(
                    (enrollment) =>
                    currentUser &&
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
                    ))

    const isEnrolled = currentUser
        ? enrollments.some(
            (e) => e.user === currentUser._id && e.course === course._id
        )
        : false;


    
    


    return (
    <div id="wd-dashboard">
    <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    <h5>New Course
            <button className="btn btn-primary float-end ms-2" 
                onClick={() => setShowAll((prev) => !prev)} id="wd-update-course-click">
          View Enrollments </button>
                {isAdmin && (
          <button className="btn btn-primary float-end"
                id="wd-add-new-course-click"
                onClick={() => dispatch(addNewCourse(course))} > Add </button>
                )}
                {isAdmin && (
        <button className="btn btn-warning float-end me-2"
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click">
          Update </button>
                )}
        
      </h5><hr /><br />
      <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
      <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value }) } />


    <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
    <div id="wd-dashboard-courses">

            <Row xs={1} md={5} className="g-4">
                {visibleCourses
                    .map((course) => (
                    <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                    <Card>
                    <Link href={`/courses/${course._id}/home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                        <CardImg src={course.image} variant="top" width="100%" height={160} />
                        <CardBody className="card-body">
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name} </CardTitle>
                        <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}>
                        {course.description} </CardText>

                        <Button variant="primary"> Go </Button>
                        
                        {currentUser && (
                            isEnrolled ? (
                                <Button
                                className="btn btn-danger"
                                onClick={() =>
                                    dispatch(
                                    unenroll({ userId: currentUser._id, courseId: course._id })
                                    )
                                }
                                >
                                Unenroll
                                </Button>
                            ) : (
                                <Button
                                className="btn btn-success"
                                onClick={() =>
                                    dispatch(
                                    enroll({ userId: currentUser._id, courseId: course._id })
                                    )
                                }
                                >
                                Enroll
                                </Button>
                            )
                        )}

                        {isAdmin && (
                        <button onClick={(event) => {
                                event.preventDefault();
                                dispatch(deleteCourse(course._id));
                            }} 
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete    
                        </button>
                        )}
                        {isAdmin && (
                        <button id="wd-edit-course-click"
                            onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                        </button>
                        )}
                        
                        </CardBody>
                    </Link>
                    </Card>
                    </Col>
                    ))}
            </Row>



    </div>
    </div>
    );}
