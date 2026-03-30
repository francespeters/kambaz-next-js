/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as client from "../client";

import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Col } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";

export default function Signup() {
       const [user, setUser] = useState<any>({});
       const dispatch = useDispatch();
       const signup = async () => {
       const currentUser = await client.signup(user);
       dispatch(setCurrentUser(currentUser));
       redirect("/account/profile");
  };

  return (
    
    <div id="wd-signup-screen">
      <Col sm={3}>
      <h3>Sign up</h3>
      <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
             className="wd-username b-2 mb-2" placeholder="username" />
      <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
             className="wd-password mb-2" placeholder="password" type="password"/>
       
      <button id="wd-signup-btn"
            onClick={signup}
            className="btn btn-primary w-100 mb-2">
            Sign up </button>

      <Link  href="/account/signin" > Sign in </Link>
      </Col>
      
    </div>
);}


