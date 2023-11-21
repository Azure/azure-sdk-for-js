// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The request details to use when creating a new assistant. */
export interface AssistantCreationOptions {
  /** The ID of the model to use. */
  model: string;
  /** The name of the new assistant. */
  name?: string;
  /** The description of the new assistant. */
  description?: string;
  /** The system instructions for the new assistant to use. */
  instructions?: string;
  /** The collection of tools to enable for the new assistant. */
  tools?: ToolDefinition[];
  /** A list of previously uploaded file IDs to attach to the assistant. */
  fileIds?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of an input tool definition that an assistant can use. */
export interface ToolDefinition {
  /** the discriminator possible values code_interpreter, retrieval, function */
  type: string;
  function?: FunctionDefinition;
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

/** Represents an assistant that can call the model and use tools. */
export interface Assistant {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always assistant. */
  object: "assistant";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The name of the assistant. */
  name: string | null;
  /** The description of the assistant. */
  description: string | null;
  /** The ID of the model to use. */
  model: string;
  /** The system instructions for the assistant to use. */
  instructions: string;
  /** The collection of tools enabled for the assistant. */
  tools: ToolDefinition[];
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  fileIds: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The response data for a requested list of items. */
export interface ListResponseOf<T> {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: T[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** The request details to use when modifying an existing assistant. */
export interface AssistantModificationOptions {
  /** The ID of the model to use. */
  model?: string;
  /** The modified name for the assistant to use. */
  name?: string;
  /** The modified description for the assistant to use. */
  description?: string;
  /** The modified system instructions for the new assistant to use. */
  instructions?: string;
  /** The modified collection of tools to enable for the assistant. */
  tools?: ToolDefinition[];
  /** The modified list of previously uploaded fileIDs to attach to the assistant. */
  fileIds?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** The status of an assistant deletion operation. */
export interface AssistantDeletionStatus {
  /** The object type, which is always 'assistant.deleted'. */
  object: "assistant.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
}

/** Information about a file attached to an assistant, as used by tools that can read files. */
export interface AssistantFile {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'assistant.file'. */
  object: "assistant.file";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The assistant ID that the file is attached to. */
  assistantId: string;
}

/** The status of an assistant file deletion operation. */
export interface AssistantFileDeletionStatus {
  /** The object type, which is always 'assistant.file.deleted'. */
  object: "assistant.file.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
}

/** The details used to create a new assistant thread. */
export interface AssistantThreadCreationOptions {
  /** The messages to associate with the new thread. */
  messages?: {
    /** The object type, which is always 'thread.message'. */
    object: "thread.message";
    /** The role associated with the assistant thread message. */
    role: AssistantRole;
    /** The list of content items associated with the assistant thread message. */
    content: string;
  }[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** A single message within an assistant thread. */
export interface AssistantMessage {
  /** The identifier, which can be referenced in API endpoints. */
  id?: string;
  /** The object type, which is always 'thread.message'. */
  object: "thread.message";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt?: Date;
  /** The ID of the thread that this message belongs to. */
  threadId?: string;
  /** The role associated with the assistant thread message. */
  role: AssistantRole;
  /** The list of content items associated with the assistant thread message. */
  content: AssistantMessageContent[];
  /** If applicable, the ID of the assistant that authored this message. */
  assistantId?: string;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  runId?: string;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** The possible values for roles attributed to messages in a thread. */
/** "user", "assistant" */
export type AssistantRole = string;

/** An abstract representation of a single item of thread message content. */
export interface AssistantMessageContent {
  /** the discriminator possible values image_file, text */
  type: string;
}

/** An image reference, as represented in thread message content. */
export interface AssistantImageFile {
  /** The ID for the file associated with this image. */
  fileId: string;
}

/** The text and associated annotations for a single item of assistant thread message content. */
export interface AssistantMessageText {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: AssistantMessageTextAnnotation[];
}

/** An abstract representation of an annotation to text thread message content. */
export interface AssistantMessageTextAnnotation {
  /** the discriminator possible values file_citation, file_path */
  type: string;
  /** The textual content associated with this text annotation item. */
  text: string;
  /** The first text index associated with this text annotation. */
  startIndex: number;
  /** The last text index associated with this text annotation. */
  endIndex: number;
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface AssistantMessageTextFileCitation {
  /** The ID of the file associated with this citation. */
  fileId: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

/** Information about a single thread associated with an assistant. */
export interface AssistantThread {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread'. */
  object: "thread";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The status of a thread deletion operation. */
export interface ThreadDeletionStatus {
  /** The object type, which is always 'thread.deleted'. */
  object: "thread.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
}

/** Information about a file attached to an assistant thread message. */
export interface AssistantMessageFile {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message.file'. */
  object: "thread.message.file";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The ID of the message that this file is attached to. */
  messageId: string;
}

/** Data representing a single evaluation run of an assistant thread. */
export interface AssistantRun {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run'. */
  object: "thread.run";
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
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
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
}

/** Possible values for the status of an assistant thread run. */
/** "queued", "in_progress", "requires_action", "cancelling", "cancelled", "failed", "completed", "expired" */
export type RunStatus = string;

/** An abstract representation of a required action for an assistant thread run to continue. */
export interface RequiredAction {
  /** the discriminator possible values submit_tool_outputs */
  type: string;
  submitToolOutputs?: SubmitToolOutputsDetails;
}

/** The details describing tools that should be called to submit tool outputs. */
export interface SubmitToolOutputsDetails {
  /** The list of tool calls that must be resolved for the assistant thread run to continue. */
  tool_calls: ToolCall[];
}

/**
 * An abstract representation a tool call, issued by the model in evaluation of a configured tool definition, that must
 * be fulfilled and have its outputs submitted before the model can continue.
 */
export interface ToolCall {
  /** the discriminator possible values code_interpreter, retrieval, function */
  type: string;
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
}

/** The detailed information about a code interpreter invocation by the model. */
export interface CodeInterpeterCallDetails {
  /** The input provided by the model to the code interpreter tool. */
  input: string;
  /** The outputs produced by the code interpeter tool back to the model in response to the tool call. */
  outputs: CodeInterpreterCallOutput[];
}

/** An abstract representation of an emitted output from a code interpreter tool. */
export interface CodeInterpreterCallOutput {
  /** the discriminator possible values logs, image */
  type: string;
}

/** An image reference emitted by a code interpreter tool in response to a tool call by the model. */
export interface CodeInterpreterImageReference {
  /** The ID of the file associated with this image. */
  fileId: string;
}

/** The detailed information about the function called by the model. */
export interface FunctionCallDetails {
  /** The name of the function. */
  name: string;
  /** The arguments that the model requires are provided to the named function. */
  arguments: string;
  /** The output of the function, only populated for function calls that have already have had their outputs submitted. */
  output?: string | null;
}

/** The details of an error as encountered by an assistant thread run. */
export interface RunError {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
}

/** The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue. */
export interface ToolOutputSubmission {
  /** The ID of the tool call being resolved, as provided in the tool calls of a required action from a run. */
  toolCallId?: string;
  /** The output from the tool to be submitted. */
  output?: string;
}

/** The details used when creating and immediately running a new assistant thread. */
export interface CreateAndRunThreadOptions {
  /** The ID of the assistant for which the thread should be created. */
  assistantId: string;
  /** The details used to create the new thread. */
  thread?: AssistantThreadCreationOptions;
  /** The overridden model that the assistant should use to run the thread. */
  model?: string;
  /** The overridden system instructions the assistant should use to run the thread. */
  instructions?: string;
  /** The overriden list of enabled tools the assistant should use to run the thread. */
  tools?: ToolDefinition[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** Detailed information about a single step of an assistant thread run. */
export interface RunStep {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run.step'. */
  object: "thread.run.step";
  /** The ID of the assistant associated with the run step. */
  assistantId: string;
  /** The ID of the thread that was run. */
  threadId: string;
  /** The ID of the run that this run step is a part of. */
  runId: string;
  /** The status of this run step. */
  status: RunStepStatus;
  /** The details for this run step. */
  stepDetails: RunStepDetails;
  /** If applicable, information about the last error encountered by this run step. */
  lastError: RunStepError | null;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expired. */
  expiredAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** Possible values for the status of a run step. */
/** "in_progress", "cancelled", "failed", "completed", "expired" */
export type RunStepStatus = string;

/** An abstract representation of the details for a run step. */
export interface RunStepDetails {
  /** the discriminator possible values message_creation, tool_calls */
  type: string;
}

/** The details of a message created as a part of a run step. */
export interface RunStepMessageCreationReference {
  /** The ID of the message created by this run step. */
  messageId: string;
}

/** The error information associated with a failed run step. */
export interface RunStepError {
  /** The error code for this error. */
  code: RunStepErrorCode;
  /** The human-readable text associated with this error. */
  message: string;
}

/** The error information associated with a failed run step. */
export interface RunStepError {
  /** The error code for this error. */
  code: RunStepErrorCode;
  /** The human-readable text associated with this error. */
  message: string;
}

/** Possible error code values attributable to a failed run step. */
/** "server_error", "rate_limit_exceeded" */
export type RunStepErrorCode = string;

/** The possible values denoting the intended usage of a file. */
/** "fine-tune", "fine-tune-results", "assistants", "assistants_output" */
export type FilePurpose = string;

/** The response data from a file list operation. */
export interface FileListResponse {
  /** The object type, which is always 'list'. */
  object: "list";
  /** The files returned for the request. */
  data: File[];
}

/** Represents an assistant that can call the model and use tools. */
export interface File {
  /** The object type, which is always 'file'. */
  object: "file";
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The size of the file, in bytes. */
  bytes: number;
  /** The name of the file. */
  filename: string;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The intended purpose of a file. */
  purpose: FilePurpose;
}

/** A status response from a file deletion operation. */
export interface FileDeletionStatus {
  /** The object type, which is always 'file'. */
  object: "file";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The ID of the deleted file. */
  id: string;
}
