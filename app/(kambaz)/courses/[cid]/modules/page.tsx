"use client"
import { useParams } from "next/navigation";
import * as db from "../../../database"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ModulesControls from "./modulesControls";
import ListGroup from "react-bootstrap/esm/ListGroup";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
    const { cid } = useParams();
  const modules = db.modules;
  type Lesson = {
  _id: string;
  name: string;
};

type Module = {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
};
  return (
    <div>
        <ModulesControls /><br /><br /><br /><br />

        <ListGroup className="rounded-0" id="wd-modules">
            {modules
            .filter((module: Module) => module.course === cid)
            .map((module: Module) => (
                <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> {module.name} <ModuleControlButtons /> 
                </div>
                {module.lessons && (
                    <ListGroup className="wd-lessons rounded-0">
                        {module.lessons.map((lesson: Lesson) => (
                        <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons /> 
                        </ListGroupItem>
                        ))}
                    </ListGroup>
                )}
            </ListGroupItem>
            ))}
        </ListGroup>

        
    </div>
);}
