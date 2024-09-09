/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT License.
*/

import React from "react";
import TodoList from "./components/TodoList";

function App(): JSX.Element {
  return (
    <div className="container text-center">
      <TodoList />
    </div>
  );
}

export default App;
