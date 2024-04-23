// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CodeInterpreterImageOutput,
  CodeInterpreterLogOutput,
  CodeInterpreterToolCall,
  FunctionToolCall,
  RetrievalToolCall,
  MessageTextDetails,
  SubmitToolOutputsDetails,
  RunError,
  RunStatus,
} from "../../generated/src/models/models.js";

/** The request details to use when creating a new assistant. */
export interface AssistantCreationOptions {
  /** The ID of the model to use. (In Azure AI Studio, corresponds to "Deployment name") */
  model: string;
  /** The name of the new assistant. */
  name?: string | null;
  /** The description of the new assistant. */
  description?: string | null;
  /** The system instructions for the new assistant to use. */
  instructions?: string | null;
  /** The collection of tools to enable for the new assistant. */
  tools?: ToolDefinition[];
  /** A list of previously uploaded file IDs to attach to the assistant. */
  fileIds?: string[];
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** An abstract representation of a required action for an assistant thread run to continue. */
export interface RequiredAction {
  /** the discriminator possible values: submit_tool_outputs */
  type: string;
  /** The details describing tools that should be called to submit tool outputs. **/
  submitToolOutputs?: SubmitToolOutputsDetails;
}

/** Data representing a single evaluation run of an assistant thread. */
export interface ThreadRun {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The ID of the thread associated with this run. */
  threadId: string;
  /** The ID of the assistant associated with the thread this run was performed against. */
  assistantId: string;
  /** The status of the assistant thread run. */
  status: RunStatus;
  /** The details of the action required for the assistant thread run to continue. */
  requiredAction?: RequiredAction;
  /** The last error, if any, encountered by this assistant thread run. */
  lastError?: RunError;
  /** The ID of the model to use. */
  model: string;
  /** The overriden system instructions used for this assistant thread run. */
  instructions: string;
  /** The overriden enabled tools used for this assistant thread run. */
  tools: ToolDefinition[];
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  fileIds: string[];
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expires. */
  expiresAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this item was started. */
  startedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string> | null;
}

/** A single message within an assistant thread. */
export interface ThreadMessage {
  /** The identifier, which can be referenced in API endpoints. */
  id?: string;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt?: Date;
  /** The ID of the thread that this message belongs to. */
  threadId?: string;
  /** The role associated with the assistant thread message. */
  role: string;
  /** The list of content items associated with the assistant thread message. */
  content: MessageContent[];
  /** If applicable, the ID of the assistant that authored this message. */
  assistantId?: string;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  runId?: string;
  /** The IDs for the files associated with this message. */
  fileIds?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string> | null;
}

/** An abstract representation of a single item of thread message content. */
export interface MessageContent {
  /** the discriminator possible values image_file, text */
  type: string;
  imageFile?: MessageImageFileDetails;
  text?: MessageTextDetails;
  fileIds?: string[];
  metadata: Record<string, string> | null;
}

/** An image reference, as represented in thread message content. */
export interface MessageImageFileDetails {
  /** The ID for the file associated with this image. */
  fileId: string;
}

/** An abstract representation of an annotation to text thread message content. */
export interface ThreadMessageTextAnnotation {
  /** the discriminator possible values file_citation, file_path */
  type: string;
  /** The textual content associated with this text annotation item. */
  text: string;
  /** The first text index associated with this text annotation. */
  startIndex: number;
  /** The last text index associated with this text annotation. */
  endIndex: number;
}

/** The details used to create a new assistant thread. */
export interface AssistantThreadCreationOptions {
  /** The messages to associate with the new thread. */
  messages?: {
    /** The role associated with the assistant thread message. */
    role: string;
    /** The list of content items associated with the assistant thread message. */
    content: string;
  }[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string> | null;
}

/** The response data for a requested list of items. */
export interface ListResponseOf<T> {
  /** The requested list of items. */
  data: T[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
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
  description: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: unknown;
}

/** An abstract representation of an input tool definition that an assistant can use. */
export type ToolDefinition =
  | CodeInterpreterToolDefinition
  | RetrievalToolDefinition
  | FunctionToolDefinition;
/** Alias for ToolCall */
export type ToolCall = CodeInterpreterToolCall | RetrievalToolCall | FunctionToolCall;
/** Alias for CodeInterpreterToolCallOutput */
export type CodeInterpreterToolCallOutput = CodeInterpreterLogOutput | CodeInterpreterImageOutput;
