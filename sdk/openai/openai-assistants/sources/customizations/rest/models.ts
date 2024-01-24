// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CodeInterpreterToolDefinition, FunctionToolDefinition, RetrievalToolDefinition } from "../../generated/src/rest";

/** The details used to create a new assistant thread. */
export interface AssistantThreadCreationOptions {
  /** The messages to associate with the new thread. */
  messages?: Array<{
    /**
     * The role associated with the assistant thread message.
     *
     * Possible values: user, assistant
     */
    role: string;
    /** The list of content items associated with the assistant thread message. */
    content: string;
  }>;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of an input tool definition that an assistant can use. */
export type ToolDefinition =
  | CodeInterpreterToolDefinition
  | RetrievalToolDefinition
  | FunctionToolDefinition;
