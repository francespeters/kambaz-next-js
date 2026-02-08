import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ModulesControls from "./modulesControls";
import ListGroup from "react-bootstrap/esm/ListGroup";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div>
      <ModulesControls /><br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-modules">
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary"> Week 1 <LessonControlButtons /> </div>
                <ListGroup className="wd-lessons rounded-0">
                    <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES </ListGroupItem>
                    <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Introduction to the course </ListGroupItem>
                    <ListGroupItem className="wd-lesson p-3 ps-1">
                        <BsGripVertical className="me-2 fs-3" /> Learn what is Web Development </ListGroupItem>
                </ListGroup>
            </ListGroupItem>

            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 <LessonControlButtons /> </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />LESSON 1 </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />LESSON 2 </ListGroupItem>
                    </ListGroup>
            </ListGroupItem>

            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary"> Week 3 <LessonControlButtons /> </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> HTML </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> Skeleton implementation </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />Chapter 1 - 2: HTML Basics </ListGroupItem>   
                    </ListGroup>
                    
            </ListGroupItem>

            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
                <div className="wd-title p-3 ps-2 bg-secondary"> Week 4 <LessonControlButtons /> </div>
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" />JavaScript </ListGroupItem>
                        <ListGroupItem className="wd-lesson p-3 ps-1">
                            <BsGripVertical className="me-2 fs-3" /> Chapter 2 - 3: JavaScript Basics </ListGroupItem>
                        
                    </ListGroup>
                    
            </ListGroupItem>
        </ListGroup>
      
        
        
    </div>
);}
