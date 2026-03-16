"use client";
import useTodoStore from "./useTodoStore";

export default function ZustandTodoList() {
  const { todos, todo, setTodo, addTodo, updateTodo, deleteTodo } = useTodoStore();

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        <li>
          <button onClick={addTodo} id="wd-add-todo-click">Add</button>
          <button onClick={updateTodo} id="wd-update-todo-click">Update</button>
          <input
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </li>
        {todos.map((t) => (
          <li key={t.id}>
            <button onClick={() => deleteTodo(t.id)} id="wd-delete-todo-click">Delete</button>
            <button onClick={() => setTodo(t)} id="wd-set-todo-click">Edit</button>
            {t.title}
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}

