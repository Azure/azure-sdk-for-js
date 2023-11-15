// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An abstract representation of a tool that an assistant can enable. */
export interface AssistantToolOutputParent {
  type: string;
}

/** The definition information for the code interpreter tool. */
export interface CodeInterpreterToolOutput extends AssistantToolOutputParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The definition information for the retrieval tool. */
export interface AssistantRetrievalToolOutput
  extends AssistantToolOutputParent {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
}

/** The definition information for a function tool. */
export interface AssistantFunctionToolOutput extends AssistantToolOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
}

/** Represents an assistant that can call the model and use tools. */
export interface AssistantOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always assistant. */
  object: "assistant";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The name of the assistant. */
  name: string | null;
  /** The description of the assistant. */
  description: string | null;
  /** The ID of the model to use. */
  model: string;
  /** The system instructions for the assistant to use. */
  instructions: string;
  /** The collection of tools enabled for the assistant. */
  tools: Array<AssistantToolOutput>;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** The status of an assistant deletion operation. */
export interface AssistantDeletionStatusOutput {
  /** The object type, which is always 'assistant.deleted'. */
  object: "assistant.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
}

/** Information about a file attached to an assistant, as used by tools that can read files. */
export interface AssistantFileOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'assistant.file'. */
  object: "assistant.file";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The assistant ID that the file is attached to. */
  assistant_id: string;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantFileOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** The status of an assistant file deletion operation. */
export interface AssistantFileDeletionStatusOutput {
  /** The object type, which is always 'assistant.file.deleted'. */
  object: "assistant.file.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
}

/** A single message within an assistant thread. */
export interface AssistantMessageOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message'. */
  object: "thread.message";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The ID of the thread that this message belongs to. */
  thread_id: string;
  /**
   * The role associated with the assistant thread message.
   *
   * Possible values: user, assistant
   */
  role: string;
  /** The list of content items associated with the assistant thread message. */
  content: Array<AssistantMessageContentOutput>;
  /** If applicable, the ID of the assistant that authored this message. */
  assistant_id?: string;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  run_id?: string;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of a single item of thread message content. */
export interface AssistantMessageContentOutputParent {
  type: string;
}

/** A representation of image file content in a thread message. */
export interface AssistantMessageImageFileContentOutput
  extends AssistantMessageContentOutputParent {
  /** The object type, which is always 'image_file'. */
  type: "image_file";
  /** The image file for this thread message content item. */
  image_file: AssistantImageFileOutput;
}

/** An image reference, as represented in thread message content. */
export interface AssistantImageFileOutput {
  /** The ID for the file associated with this image. */
  file_id: string;
}

/** A representation of a textual item of thread message content. */
export interface AssistantMessageTextContentOutput
  extends AssistantMessageContentOutputParent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: AssistantMessageTextOutput;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The text and associated annotations for a single item of assistant thread message content. */
export interface AssistantMessageTextOutput {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: Array<AssistantMessageTextAnnotationOutput>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface AssistantMessageTextAnnotationOutputParent {
  /** The textual content associated with this text annotation item. */
  text: string;
  /** The first text index associated with this text annotation. */
  start_index: number;
  /** The last text index associated with this text annotation. */
  end_index: number;
  type: string;
}

/** A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the 'retrieval' tool to search files. */
export interface AssistantMessageTextFileAnnotationOutput
  extends AssistantMessageTextAnnotationOutputParent {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /** The file-based citation associated with this annotation. */
  file_citation: AssistantMessageTextFileCitationOutput;
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface AssistantMessageTextFileCitationOutput {
  /** The ID of the file associated with this citation. */
  file_id: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

/** A citation within the message that points to a file located at a specific path. */
export interface AssistantMessageTextFilePathAnnotationOutput
  extends AssistantMessageTextAnnotationOutputParent {
  /** The object type, which is always 'file_path'. */
  type: "file_path";
  /** A URL for the file that's generated when the assistant used the code_interpreter tool to generate a file. */
  file_path: string;
}

/** Information about a single thread associated with an assistant. */
export interface AssistantThreadOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread'. */
  object: "thread";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The status of a thread deletion operation. */
export interface AssistantThreadDeletionStatusOutput {
  /** The object type, which is always 'thread.deleted'. */
  object: "thread.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantMessageOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** Information about a file attached to an assistant thread message. */
export interface AssistantMessageFileOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message.file'. */
  object: "thread.message.file";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The ID of the message that this file is attached to. */
  message_id: string;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantMessageFileOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** Data representing a single evaluation run of an assistant thread. */
export interface AssistantRunOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run'. */
  object: "thread.run";
  /** The ID of the thread associated with this run. */
  thread_id: string;
  /** The ID of the assistant associated with the thread this run was performed against. */
  assistant_id: string;
  /**
   * The status of the assistant thread run.
   *
   * Possible values: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, expired
   */
  status: string;
  /** The details of the action required for the assistant thread run to continue. */
  required_action?: RunRequiredActionOutput;
  /** The last error, if any, encountered by this assistant thread run. */
  last_error?: RunErrorOutput;
  /** The ID of the model to use. */
  model: string;
  /** The overriden system instructions used for this assistant thread run. */
  instructions: string;
  /** The overriden enabled tools used for this assistant thread run. */
  tools: Array<AssistantToolOutput>;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The Unix timestamp, in seconds, representing when this item expires. */
  expires_at: string | null;
  /** The Unix timestamp, in seconds, representing when this item was started. */
  started_at: string | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completed_at: string | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelled_at: string | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failed_at: string | null;
}

/** An abstract representation of a required action for an assistant thread run to continue. */
export interface RunRequiredActionOutputParent {
  type: string;
}

/** The details for required tool calls that must be submitted for an assistant thread run to continue. */
export interface RunSubmitToolOutputsActionOutput
  extends RunRequiredActionOutputParent {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The list of tool calls that must be resolved for the assistant thread run to continue. */
  tool_calls: Array<RunToolCallOutput>;
}

/** An abstract representation of a tool call as performed by an assistant thread run. */
export interface RunToolCallOutputParent {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  type: string;
}

/** The details of a function tool call performed by an assitant thread run. */
export interface RunFunctionCallOutput extends RunToolCallOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The details of the function invoked by this tool call. */
  function: RunFunctionOutput;
}

/** The definition of a tool function as used by an assistant thread run. */
export interface RunFunctionOutput {
  /** The name of the function. */
  name: string;
  /** The arguments for the function. */
  arguments: string;
}

/** The details of an error as encountered by an assistant thread run. */
export interface RunErrorOutput {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantRunOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** Detailed information about a single step of an assistant thread run. */
export interface RunStepOutput {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run.step'. */
  object: "thread.run.step";
  /** The ID of the assistant associated with the run step. */
  assistant_id: string;
  /** The ID of the thread that was run. */
  thread_id: string;
  /** The ID of the run that this run step is a part of. */
  run_id: string;
  /**
   * The status of this run step.
   *
   * Possible values: in_progress, cancelled, failed, completed, expired
   */
  status: string;
  /** The details for this run step. */
  step_details: RunStepDetailsOutput;
  /** If applicable, information about the last error encountered by this run step. */
  last_error: RunStepErrorOutput | null;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The Unix timestamp, in seconds, representing when this item expired. */
  expired_at: string | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completed_at: string | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelled_at: string | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failed_at: string | null;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** An abstract representation of the details for a run step. */
export interface RunStepDetailsOutputParent {
  type: string;
}

/** The detailed information associated with a message creation run step. */
export interface RunStepMessageCreationDetailsOutput
  extends RunStepDetailsOutputParent {
  /** The object type, which is always 'message_creation'. */
  type: "message_creation";
  /** Information about the message creation associated with this run step. */
  message_creation: RunStepMessageCreationOutput;
}

/** The details of a message created as a part of a run step. */
export interface RunStepMessageCreationOutput {
  /** The ID of the message created by this run step. */
  message_id: string;
}

/** The detailed information associated with a run step calling tools. */
export interface RunStepToolCallsDetailsOutput
  extends RunStepDetailsOutputParent {
  /** The object type, which is always 'tool_calls'. */
  type: "tool_calls";
  /** A list tool call details for this run step. */
  tool_calls: Array<RunStepToolCallOutput>;
}

/** An abstract representation of tool call details associated with a run step. */
export interface RunStepToolCallOutputParent {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  type: string;
}

/** The data associated with a code interpreter tool call as performed during a run step. */
export interface RunStepCodeInterpreterToolCallOutput
  extends RunStepToolCallOutputParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
  /** The code interpreter tool definition used by this run step's tool call. */
  code_interpreter: CodeInterpreterToolDefinitionOutput;
}

/** The definition information for a code interpreter tool as represented in a run step. */
export interface CodeInterpreterToolDefinitionOutput {
  /** The input to the Code Interpreter tool call. */
  input: string;
  /** The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (logs) or images (image). */
  outputs: Array<CodeInterpreterToolCallOutputOutput>;
}

/** An abstract representation of a code interpreter tool's output from a run step tool call. */
export interface CodeInterpreterToolCallOutputOutputParent {
  type: string;
}

/** The tool call output from a code interpreter run step that produces logs. */
export interface CodeInterpreterLogToolCallOutputOutput
  extends CodeInterpreterToolCallOutputOutputParent {
  /** The object type, which is always 'logs'. */
  type: "logs";
  /** The log data from this tool call output. */
  logs: string;
}

/** The tool call output from a code interpreter run step that produces an image. */
export interface CodeInterpreterImageToolCallOutputOutput
  extends CodeInterpreterToolCallOutputOutputParent {
  /** The object type, which is always 'image'. */
  type: "image";
  /** The image information associated with this tool call output. */
  image: CodeInterpreterImageOutput;
}

/** Information about an image associated with code interpreter tool output from a run step. */
export interface CodeInterpreterImageOutput {
  /** The ID of the file associated with this image. */
  file_id: string;
}

/** The data associated with a retrieval tool call performed by a run step. */
export interface RunStepRetrievalToolCallOutput
  extends RunStepToolCallOutputParent {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
  /** The key/value pairs produced by the retrieval tool. */
  retrieval: Record<string, string>;
}

/** The data associated with a function tool call performed by a run step. */
export interface RunStepFunctionToolCallOutput
  extends RunStepToolCallOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The function information associated with this tool call. */
  function: RunStepToolCallDefinitionOutput;
}

/** The definition for a function as used by a run step tool call. */
export interface RunStepToolCallDefinitionOutput {
  /** The name of the function. */
  name: string;
  /** The arguments provided to the function. */
  arguments: string;
  /** The output of the function, which will be null if outputs have not yet been submitted. */
  output?: string;
}

/** The error information associated with a failed run step. */
export interface RunStepErrorOutput {
  /**
   * The error code for this error.
   *
   * Possible values: server_error, rate_limit_exceeded
   */
  code: string;
  /** The human-readable text associated with this error. */
  message: string;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<RunStepOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** The response data from a file list operation. */
export interface FileListResponseOutput {
  /** The object type, which is always 'list'. */
  object: "list";
  /** The files returned for the request. */
  data: Array<FileOutput>;
}

/** Represents an assistant that can call the model and use tools. */
export interface FileOutput {
  /** The object type, which is always 'file'. */
  object: "file";
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The size of the file, in bytes. */
  bytes: number;
  /** The name of the file. */
  filename: string;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /**
   * The intended purpose of a file.
   *
   * Possible values: fine-tune, fine-tune-results, assistants, assistants_output
   */
  purpose: string;
}

/** A status response from a file deletion operation. */
export interface FileDeletionStatusOutput {
  /** The object type, which is always 'file'. */
  object: "file";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The ID of the deleted file. */
  id: string;
}

/** An abstract representation of a tool that an assistant can enable. */
export type AssistantToolOutput =
  | CodeInterpreterToolOutput
  | AssistantRetrievalToolOutput
  | AssistantFunctionToolOutput;
/** An abstract representation of a single item of thread message content. */
export type AssistantMessageContentOutput =
  | AssistantMessageImageFileContentOutput
  | AssistantMessageTextContentOutput;
/** An abstract representation of an annotation to text thread message content. */
export type AssistantMessageTextAnnotationOutput =
  | AssistantMessageTextFileAnnotationOutput
  | AssistantMessageTextFilePathAnnotationOutput;
/** An abstract representation of a required action for an assistant thread run to continue. */
export type RunRequiredActionOutput = RunSubmitToolOutputsActionOutput;
/** An abstract representation of a tool call as performed by an assistant thread run. */
export type RunToolCallOutput = RunFunctionCallOutput;
/** An abstract representation of the details for a run step. */
export type RunStepDetailsOutput =
  | RunStepMessageCreationDetailsOutput
  | RunStepToolCallsDetailsOutput;
/** An abstract representation of tool call details associated with a run step. */
export type RunStepToolCallOutput =
  | RunStepCodeInterpreterToolCallOutput
  | RunStepRetrievalToolCallOutput
  | RunStepFunctionToolCallOutput;
/** An abstract representation of a code interpreter tool's output from a run step tool call. */
export type CodeInterpreterToolCallOutputOutput =
  | CodeInterpreterLogToolCallOutputOutput
  | CodeInterpreterImageToolCallOutputOutput;
