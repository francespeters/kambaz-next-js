import { create } from "zustand";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
}


const useTodoStore = create<TodoState>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "Learn Mongo" },

  setTodo: (todo) => set({ todo }),

  addTodo: () =>
    set((state) => ({
      todos: [...state.todos, { ...state.todo, id: Date.now().toString() }],
      todo: { id: "-1", title: "" },
    })),

  updateTodo: () =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === state.todo.id ? state.todo : t)),
      todo: { id: "-1", title: "" },
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));

export default useTodoStore;
