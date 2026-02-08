"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
    const pathname = usePathname();
 return (
   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 pe-4">

      <Link href="signin" id="wd-sigin-link"
        className={`list-group-item border-0 ${pathname.includes("/signin") ? "active" : "text-danger"}`}>
        Signin </Link>

      <Link href="signup" id="wd-signup-link"
        className={`list-group-item border-0 ${pathname.includes("/signup") ? "active" : "text-danger"}`}>
        Signup </Link>

      <Link href="profile" id="wd-profile-link"
        className={`list-group-item border-0 ${pathname.includes("/profile") ? "active" : "text-danger"}`}>
        Profile </Link>
   </div>
);}

