/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  The central hook that components will integrate with and 
  manages both the state of Todos and integration with various
  Azure services such as ServiceBus and EventHubs.
*/

import { EventData } from "@azure/event-hubs";
import { useState } from "react";
import { useBlobs } from "./useBlobs";
import { useEventHubs } from "./useEventHubs";

export interface Todo {
  done: boolean;
  id: string;
  label: string;
  noteFileName?: string;
}

type Todos = Todo[];
type AddTodo = (todo: Todo) => Promise<void>;
type UpdateTodo = (todo: Todo) => Promise<void>;
type GetNote = (todo: Todo) => Promise<string | undefined>;
type UploadNote = (todo: Todo, content: string) => Promise<void>;
type Hook = [Todos, AddTodo, UpdateTodo, GetNote, UploadNote];

/**
 * The useTodos hook is the main entrypoint for most of the todo
 * lifecycle management. It exposes the current todos state, a method
 * to add a new todo, a method to update an existing todo, and methods
 * to interact with notes.
 */
export const useTodos: () => Hook = () => {
  // Start with an empty list of Todos for this example.
  // In a production application you might fetch these from
  // a database like Cosmos DB on render.
  // If there was any activity within the last EventHubs retention period
  // it'll be reflected and read in and the state updated.
  const [todos, setTodos] = useState<Todo[]>([]);

  // Add functionality to integrate with Azure Storage Blobs.
  const [getBlob, uploadBlob] = useBlobs();

  // An example of using EventHubs to process events which will
  // be published to every consumer. For simplicity we just override
  // our internal state with whatever the event data is. In a production
  // application you'll likely want to use some database as the source
  // of truth.
  const onEventHubMessage = async (message: EventData) => {
    const todos = message.body as Array<Todo>;
    if (todos) {
      setTodos(todos);
    }
  };
  const publishToEventHubs = useEventHubs(onEventHubMessage);

  /**
   * Adds a new todo to the collection.
   * @param todo The todo item to add.
   */
  const addTodo = async (todo: Todo): Promise<void> => onChange([todo, ...todos]);

  /**
   * Updates an existing todo by replacing it with the argument.
   * @param todo The updated todo data.
   */
  const updateTodo = async (todo: Todo): Promise<void> => {
    const newTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    onChange(newTodos);
  };

  /**
   * Uploads a note to Azure Blob Storage and attaches it to an existing todo.
   * @param todo The todo to associate this note with.
   * @param content The note's contents.
   */
  const uploadNote = async (todo: Todo, content: string): Promise<void> => {
    todo.noteFileName = `${todo.id}.txt`;
    await uploadBlob(todo.noteFileName, content);
    updateTodo(todo);
  };

  /**
   * Fetches a note from Azure Blob Storage and returns its contents.
   * @param todo The todo item that owns this note.
   */
  const getNote = async (todo: Todo): Promise<string | undefined> => {
    if (todo.noteFileName) {
      const blob = await getBlob(todo.noteFileName);
      return await blob?.text();
    }
  };

  // onChange will publish the new set of todos to all the clients.
  const onChange = async (newTodos: Todo[]): Promise<void> => {
    setTodos(newTodos);
    publishToEventHubs({ body: newTodos });
  };

  return [todos, addTodo, updateTodo, getNote, uploadNote];
};
