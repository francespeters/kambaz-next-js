import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type EnrollmentRow = {
  _id: string;
  user: string;
  course: string;
};

const initialState: { enrollments: EnrollmentRow[] } = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<EnrollmentRow[]>) => {
      state.enrollments = action.payload;
    },
  },
});

export const { setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
