"use client";

import { AiOutlineCalendar, AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { usePathname } from "next/navigation";

import Link from "next/link";

/**
 * 
 * REFERENCE: https://reactjs.koida.tech/backend-frameworks-next.js/hands-on-practice-2/active-links-and-conditional-rendering
 * 
 */


export default function KambazNavigation() {
    const pathname = usePathname();

  return (
    <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: "120px" }} id="wd-kambaz-navigation">
      <ListGroupItem className="bg-black border-0 text-center" as="a" target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
          <img src="/images/nulogo.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      
      <ListGroupItem className={`border-0 text-center ${pathname.includes("/account") ? "bg-white" : "bg-black"}`}>
        <Link href="/account" id="wd-account-link" className={`text-decoration-none ${pathname.includes("/account") ? "text-danger" : "text-white"}`}>
          <FaRegCircleUser className={`fs-1 ${pathname.includes("/account") ? "text-danger" : "text-white"}`} />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 text-center ${pathname.includes("/dashboard") ? "bg-white" : "bg-black"}`}>
        <Link href="/dashboard" id="wd-dashboard-link" className={`text-decoration-none ${pathname.includes("/dashboard") ? "text-danger" : "text-white"}`}>
          <AiOutlineDashboard className={`fs-1 ${pathname.includes("/dashboard") ? "text-danger" : "text-danger"}`} />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 text-center ${pathname.includes("/courses") ? "bg-white" : "bg-black"}`}>
        <Link href="/courses" id="wd-courses-link" className={`text-decoration-none ${pathname.includes("/courses") ? "text-danger" : "text-white"}`}>
          <LiaBookSolid className={`fs-1 ${pathname.includes("/courses") ? "text-danger" : "text-danger"}`} />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 text-center ${pathname.includes("/calendar") ? "bg-white" : "bg-black"}`}>
        <Link href="/calendar" id="wd-calendar-link" className={`text-decoration-none ${pathname.includes("/calendar") ? "text-danger" : "text-white"}`}>
          <AiOutlineCalendar className={`fs-1 ${pathname.includes("/calendar") ? "text-danger" : "text-danger"}`} />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 text-center ${pathname.includes("/inbox") ? "bg-white" : "bg-black"}`}>
        <Link href="/inbox" id="wd-inbox-link" className={`text-decoration-none ${pathname.includes("/inbox") ? "text-danger" : "text-white"}`}>
          <FaInbox className={`fs-1 ${pathname.includes("/inbox") ? "text-danger" : "text-danger"}`} />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className={`border-0 text-center ${pathname.includes("/labs") ? "bg-white" : "bg-black"}`}>
        <Link href="/labs" id="wd-labs-link" className={`text-decoration-none ${pathname.includes("/labs") ? "text-danger" : "text-white"}`}>
          <LiaCogSolid className={`fs-1 ${pathname.includes("/labs") ? "text-danger" : "text-danger"}`} />
          <br />
          Labs
        </Link>
      </ListGroupItem>
   </ListGroup>


        
);}

