/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.
*/

import React from "react";
import { Todo } from "../hooks/useTodos";

const TodoItem: React.FC<{
  todo: Todo;
  onToggleComplete: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNotesClick: (event: React.MouseEvent<HTMLElement>) => void;
  onNoteUploadClick: (event: React.MouseEvent<HTMLElement>) => void;
}> = ({ todo, onToggleComplete, onNotesClick, onNoteUploadClick }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>
        <input
          type="checkbox"
          className="form-check-input"
          checked={todo.done}
          name="checked"
          autoFocus={true}
          onChange={onToggleComplete}
        />
        <span>{todo.done ? <s>{todo.label}</s> : todo.label}</span>
      </span>
      <span>
        {todo.noteFileName && (
          <button className="btn btn-primary mr-1" type="button" onClick={onNotesClick}>
            Fetch the note
          </button>
        )}
        <button className="btn btn-primary" type="button" onClick={onNoteUploadClick}>
          Upload a note
        </button>
      </span>
    </li>
  );
};

export default TodoItem;
