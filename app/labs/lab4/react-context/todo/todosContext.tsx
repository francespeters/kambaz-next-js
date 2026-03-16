"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface Todo {
  id: string;
  title: string;
}

interface TodosContextState {
  todos: Todo[];
  todo: Todo;
  setTodo: (todo: Todo) => void;
  addTodo: () => void;
  updateTodo: () => void;
  deleteTodo: (id: string) => void;
}

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<Todo>({ id: "-1", title: "Learn Mongo" });

  const addTodo = () => {
    if (!todo.title.trim()) return;
    setTodos((prev) => [...prev, { ...todo, id: Date.now().toString() }]);
    setTodo({ id: "-1", title: "" });
  };

  const updateTodo = () => {
    if (todo.id === "-1") return;
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
    setTodo({ id: "-1", title: "" });
  };

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <TodosContext.Provider value={{ todos, todo, setTodo, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) throw new Error("useTodos must be used within a TodosProvider");
  return context;
};