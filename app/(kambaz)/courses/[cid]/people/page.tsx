/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState, useEffect } from "react";
import * as client from "../../client";

import { useParams } from "next/navigation";
import PeopleTable from "./PeopleTable";
export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!cid) return;
    const data = await client.findUsersForCourse(
      typeof cid === "string" ? cid : cid[0]
    );
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
