/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT license.

  The central hook that components will integrate with and 
  manages both the state of Todos and integration with various
  Azure services such as ServiceBus and EventHubs.
*/

import { EventData } from "@azure/event-hubs";
import { useState } from "react";
import { useEventHubs } from "./useEventHubs";
import { useServiceBus } from "./useServiceBus";
import { ServiceBusMessage } from "@azure/service-bus";
import { v4 as uuid } from "uuid";

export interface Todo {
  done: boolean;
  id: string;
  label: string;
  noteFileName?: string;
}

export const useTodos: () => [
  Todo[],
  (todo: Todo) => Promise<void>,
  (todo: Todo) => Promise<void>
] = () => {
  // Set up a hardcoded list of Todos for this example.
  // In a production application you might fetch these from
  // a database like Cosmos DB on render.
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      done: false,
      label: "Unfinished with note",
      noteFileName: "todo.txt"
    },
    {
      id: uuid(),
      done: true,
      label: "Finished"
    }
  ]);

  // An example of using ServiceBus to process messages
  // by a single consumer. The callback is used to handle
  // the message.
  const onServiceBusMessage = (message: ServiceBusMessage) => {
    console.log("Received message for processing", message.body);
  };
  const [publishtoServiceBus] = useServiceBus(onServiceBusMessage);

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
  const [publishToEventHubs] = useEventHubs(onEventHubMessage);

  const addTodo = async (todo: Todo): Promise<void> => onChange([todo, ...todos]);

  const updateTodo = async (todo: Todo): Promise<void> => {
    const newTodos = todos.map((t) => (t.id === todo.id ? todo : t));
    onChange(newTodos);
  };

  // onChange will publish the new set of todos to all the clients.
  const onChange = async (newTodos: Todo[]): Promise<void> => {
    setTodos(newTodos);
    publishtoServiceBus({ body: newTodos });
    publishToEventHubs({ body: newTodos });
  };

  return [todos, addTodo, updateTodo];
};
