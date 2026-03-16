/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "@/app/(kambaz)/database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: dbEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: { userId, courseId } }) => {
      const exists = state.enrollments.some(
        (e: any) => e.user === userId && e.course === courseId
      );
      if (exists) return;
      state.enrollments.push({
        _id: uuidv4(),
        user: userId,
        course: courseId,
      } as any);
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );},},
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;