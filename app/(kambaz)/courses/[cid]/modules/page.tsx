"use client"

import { addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useParams } from "next/navigation";
import * as db from "../../../database"
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ModulesControls from "./modulesControls";
import ListGroup from "react-bootstrap/esm/ListGroup";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import { FormControl } from "react-bootstrap";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: RootState) => state.modulesReducer);
    const dispatch = useDispatch();
    




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
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} /><br /><br /><br /><br />

        <ListGroup className="rounded-0" id="wd-modules">
            {modules
            .filter((module: Module) => module.course === cid)
            .map((module: Module) => (
                <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary">
                    <BsGripVertical className="me-2 fs-3" /> 
                    {!module.editing && module.name}
                    { module.editing && (
                        <FormControl className="w-50 d-inline-block"
                            onChange={(e) =>
                                dispatch(
                                    updateModule({ ...module, name: e.target.value })
                                )
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                dispatch(updateModule({ ...module, editing: false }));
                                }
                            }}
               defaultValue={module.name}/>
      )}
                    <ModuleControlButtons moduleId={module._id} 
                    deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                    editModule={(moduleId) => dispatch(editModule(moduleId))} />

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
