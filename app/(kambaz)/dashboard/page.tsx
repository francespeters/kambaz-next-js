/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import * as client from "../courses/client";
import * as enrollmentsClient from "../courses/enrollments/enrollmentsClient";
import { RootState } from "../store";

import { useCallback, useEffect, useState } from "react";
import { setEnrollments } from "../courses/enrollments/reducer";

import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse, setCourses} from "../courses/reducer";

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
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

    const [showAll, setShowAll] = useState(false);

    const isFaculty = currentUser?.role === "FACULTY";

    const dispatch = useDispatch();

    const onAddNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        dispatch(setCourses([ ...courses, newCourse ]));
    };

    const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    };

    const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};


    const loadCourses = useCallback(async () => {
        if (!currentUser) return;
        try {
            const data = showAll
                ? await client.fetchAllCourses()
                : await client.findMyCourses();
            dispatch(setCourses(data));
        } catch (error) {
            console.error(error);
        }
    }, [currentUser, showAll, dispatch]);

    const loadEnrollments = useCallback(async () => {
        if (!currentUser) {
            dispatch(setEnrollments([]));
            return;
        }
        try {
            const list = await enrollmentsClient.findMyEnrollments();
            dispatch(setEnrollments(list));
        } catch (error) {
            console.error(error);
        }
    }, [currentUser, dispatch]);

    useEffect(() => {
        loadCourses();
    }, [loadCourses]);

    useEffect(() => {
        loadEnrollments();
    }, [loadEnrollments]);

    const handleEnroll = async (courseId: string) => {
        try {
            await enrollmentsClient.enrollInCourse(courseId);
            await loadEnrollments();
            await loadCourses();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnenroll = async (courseId: string) => {
        try {
            await enrollmentsClient.unenrollFromCourse(courseId);
            await loadEnrollments();
            await loadCourses();
        } catch (error) {
            console.error(error);
        }
    };

    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
                

    return (
    <div id="wd-dashboard">
    <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    {isFaculty && (
        <>
            <h5 id="wd-dashboard-new-course">
                New Course
                <button
                    type="button"
                    className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={onAddNewCourse}
                >
                    Add
                </button>
                <button
                    type="button"
                    className="btn btn-warning float-end me-2"
                    id="wd-update-course-click"
                    onClick={onUpdateCourse}
                >
                    Update
                </button>
            </h5>
            <hr />
            <br />
            <FormControl
                value={course.name}
                className="mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
                as="textarea"
                value={course.description}
                rows={3}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
            />
        </>
    )}

    {!isFaculty && currentUser && (
        <div className="mb-3">
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowAll((prev) => !prev)}
                id="wd-toggle-enrollments-view"
            >
                {showAll ? "My courses" : "View all courses"}
            </button>
        </div>
    )}

    <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
    <div id="wd-dashboard-courses">

            <Row xs={1} md={5} className="g-4">
                {courses.map((course) => {
                    const isEnrolled =
                        !!currentUser &&
                        enrollments.some(
                            (e: { user: string; course: string }) =>
                                e.user === currentUser._id && e.course === course._id
                        );
                    return (
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

                        {!isFaculty && currentUser && (
                            showAll ? (
                                isEnrolled ? (
                                    <Button
                                        type="button"
                                        variant="danger"
                                        className="ms-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            void handleUnenroll(course._id);
                                        }}
                                    >
                                        Unenroll
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="success"
                                        className="ms-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            void handleEnroll(course._id);
                                        }}
                                    >
                                        Enroll
                                    </Button>
                                )
                            ) : (
                                <Button
                                    type="button"
                                    variant="danger"
                                    className="ms-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void handleUnenroll(course._id);
                                    }}
                                >
                                    Unenroll
                                </Button>
                            )
                        )}

                        {isFaculty && (
                        <>
                        <button
                            type="button"
                            id="wd-delete-course-click"
                            onClick={(event) => {
                                event.preventDefault();
                                onDeleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            id="wd-edit-course-click"
                            onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                        >
                            Edit
                        </button>
                        </>
                        )}

                        </CardBody>
                    </Link>
                    </Card>
                    </Col>
                    );
                })}
            </Row>



    </div>
    </div>
    );}
