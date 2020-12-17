/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/

import React, { useState } from "react";
import { v4 as guid } from "uuid";
import TodoItem from "./TodoItem";
import { useTodos, Todo } from "../hooks/useTodos";
import { useBlobs } from "../hooks/useBlobs";

export default function TodoList(): JSX.Element {
  // Initialize the hooks needed for integrating with our Azure services.
  const [todos, addTodo, updateTodo] = useTodos();
  const [note, setNote] = useState<string | undefined>();
  const getBlob = useBlobs();

  const [newTodoLabel, setNewTodoLabel] = useState("");

  // Handle data binding for the new todo label
  const onNewLabelChange = (el: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoLabel(el.target.value);
  };

  // Handle the Enter key press which will add a new Todo
  const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTodo = {
        done: false,
        id: guid(),
        label: newTodoLabel
      };

      await addTodo(newTodo);
      setNewTodoLabel("");
    }
  };

  // Handle completion of a Todo item
  const onToggleComplete = (todo: Todo) => async () => {
    const updatedTodo: Todo = { ...todo, done: !todo.done };
    await updateTodo(updatedTodo);
  };

  // Handle fetching a Todo's note and displaying its text
  const onNotesClick = (todo: Todo) => async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    let text: string | undefined = "";
    if (todo.noteFileName) {
      const blob = await getBlob(todo.noteFileName);
      text = await blob?.text();
    }
    setNote(text);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <h1>Todos React Sample</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            placeholder="Add a Todo!"
            onKeyPress={onKeyPress}
            value={newTodoLabel}
            onChange={onNewLabelChange}
          />
        </div>
      </div>
      <ul className="list-group list-group-flush text-left">
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggleComplete={onToggleComplete(todo)}
            onNotesClick={onNotesClick(todo)}
          />
        ))}
      </ul>
      {note && (
        <div className="row">
          <div className="col">
            <span className="note-content">Note contents: {note}</span>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
