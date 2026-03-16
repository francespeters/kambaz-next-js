/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, useState } from "react";
import { FaAlignJustify } from "react-icons/fa";

import CourseNavigation from "./navigation";

import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";


export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [navVisible, setNavVisible] = useState(true);

    return (  
      <div id="wd-courses">
          <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" cursor="pointer" onClick={() => setNavVisible((prev) => !prev)}/>
            
            {course?.name}
 
          </h2> 
          <hr />
          <div className="d-flex">


            <div className="d-none d-md-block">
              {navVisible && <CourseNavigation /> }
              
            </div>

            <div className="flex-fill">{children}</div>
        
        </div>

      </div>
  );}

function toggleNav() {
  return(

    <CourseNavigation />
  )
}