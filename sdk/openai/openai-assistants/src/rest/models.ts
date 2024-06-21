// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/** The request details to use when creating a new assistant. */
export interface AssistantCreationOptions {
  /** The ID of the model to use. */
  model: string;
  /** The name of the new assistant. */
  name?: string | null;
  /** The description of the new assistant. */
  description?: string | null;
  /** The system instructions for the new assistant to use. */
  instructions?: string | null;
  /** The collection of tools to enable for the new assistant. */
  tools?: Array<ToolDefinition>;
  /** A list of previously uploaded file IDs to attach to the assistant. */
  file_ids?: string[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: TypeSpecRecord | null;
}

/** The input definition information for a code interpreter tool as used to configure an assistant. */
export interface CodeInterpreterToolDefinition {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The input definition information for a retrieval tool as used to configure an assistant. */
export interface RetrievalToolDefinition {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
}

/** The input definition information for a function tool as used to configure an assistant. */
export interface FunctionToolDefinition {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinition;
}

/** The input definition information for a function. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: unknown;
}

export interface TypeSpecRecord extends Record<string, string> {}

/** The request details to use when modifying an existing assistant. */
export interface UpdateAssistantOptions {
  /** The ID of the model to use. */
  model?: string;
  /** The modified name for the assistant to use. */
  name?: string | null;
  /** The modified description for the assistant to use. */
  description?: string | null;
  /** The modified system instructions for the new assistant to use. */
  instructions?: string | null;
  /** The modified collection of tools to enable for the assistant. */
  tools?: Array<ToolDefinition>;
  /** The modified list of previously uploaded fileIDs to attach to the assistant. */
  file_ids?: string[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: TypeSpecRecord | null;
}

/** The details used to create a new assistant thread. */
export interface AssistantThreadCreationOptions {
  /** The messages to associate with the new thread. */
  messages?: ThreadInitializationMessage[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** A single message within an assistant thread, as provided during that thread's creation for its initial state. */
export interface ThreadInitializationMessage {
  /**
   * The role associated with the assistant thread message. Currently, only 'user' is supported when providing initial messages to a new thread.
   *
   * Possible values: "user", "assistant"
   */
  role: string;
  /** The textual content of the initial message. Currently, robust input including images and annotated text may only be provided via a separate call to the create message API. */
  content: string;
  /**
   * A list of file IDs that the assistant should use. Useful for tools like retrieval and code_interpreter that can
   * access files.
   */
  file_ids?: string[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: TypeSpecRecord | null;
}

/** The details used when creating a new run of an assistant thread. */
export interface CreateRunOptions {
  /** The ID of the assistant that should run the thread. */
  assistant_id: string;
  /** The overridden model name that the assistant should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions that the assistant should use to run the thread. */
  instructions?: string | null;
  /**
   * Additional instructions to append at the end of the instructions for the run. This is useful for modifying the behavior
   * on a per-run basis without overriding other instructions.
   */
  additional_instructions?: string | null;
  /** The overridden list of enabled tools that the assistant should use to run the thread. */
  tools?: Array<ToolDefinition> | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: TypeSpecRecord | null;
}

/** The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue. */
export interface ToolOutput {
  /** The ID of the tool call being resolved, as provided in the tool calls of a required action from a run. */
  tool_call_id?: string;
  /** The output from the tool to be submitted. */
  output?: string;
}

/** The details used when creating and immediately running a new assistant thread. */
export interface CreateAndRunThreadOptions {
  /** The ID of the assistant for which the thread should be created. */
  assistant_id: string;
  /** The details used to create the new thread. */
  thread?: AssistantThreadCreationOptions;
  /** The overridden model that the assistant should use to run the thread. */
  model?: string;
  /** The overridden system instructions the assistant should use to run the thread. */
  instructions?: string;
  /** The overridden list of enabled tools the assistant should use to run the thread. */
  tools?: Array<ToolDefinition>;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: TypeSpecRecord | null;
}

/** An abstract representation of an input tool definition that an assistant can use. */
export type ToolDefinition =
  | CodeInterpreterToolDefinition
  | RetrievalToolDefinition
  | FunctionToolDefinition;
