"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";


export default function AccountNavigation() {
    const { currentUser } = useSelector((state: RootState) => state.accountReducer);
    const links = currentUser ? ["profile"] : ["signin", "signup"];
    const pathname = usePathname();
 return (
  <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 pe-4">
   <Nav variant="pills">

     {links.map((link) => (
       <NavItem key={link} className="bg-0">
         <NavLink as={Link} href={link} active={pathname.endsWith(link)} className={pathname.endsWith(link) ? "active wd-account-nav-active border-0" : "border-0 text-danger"}>
           {link} </NavLink> </NavItem>
     ))}
     {currentUser && currentUser.role === "ADMIN" && (
       <NavLink as={Link} href={`/account/users`}  active={pathname.endsWith('Users')}> Users </NavLink> )}

   </Nav>
   </div>

);}

