// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An abstract representation of a tool that an assistant can enable. */
export interface AssistantToolOutputParent {
  type: string;
}

/** The definition information for the code interpreter tool. */
export interface AssistantCodeInterpreterToolOutput
  extends AssistantToolOutputParent {
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
export interface OpenAIListResponseOfOutput {
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
export interface OpenAIListResponseOfOutput {
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
export interface AssistantThreadMessageOutput {
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
  content: Array<AssistantThreadMessageContentOutput>;
  /** If applicable, the ID of the assistant that authored this message. */
  assistant_id?: string;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  run_id?: string;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of a single item of thread message content. */
export interface AssistantThreadMessageContentOutputParent {
  type: string;
}

/** A representation of image file content in a thread message. */
export interface AssistantThreadImageFileContentOutput
  extends AssistantThreadMessageContentOutputParent {
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
export interface AssistantThreadMessageTextContentOutput
  extends AssistantThreadMessageContentOutputParent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: AssistantThreadMessageTextOutput;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The text and associated annotations for a single item of assistant thread message content. */
export interface AssistantThreadMessageTextOutput {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: Array<AssistantThreadMessageTextAnnotationOutput>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface AssistantThreadMessageTextAnnotationOutputParent {
  /** The textual content associated with this text annotation item. */
  text: string;
  /** The first text index associated with this text annotation. */
  start_index: number;
  /** The last text index associated with this text annotation. */
  end_index: number;
  type: string;
}

/** A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the 'retrieval' tool to search files. */
export interface AssistantThreadMessageTextFileAnnotationOutput
  extends AssistantThreadMessageTextAnnotationOutputParent {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /** The file-based citation associated with this annotation. */
  file_citation: AssistantThreadMessageTextFileCitationOutput;
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface AssistantThreadMessageTextFileCitationOutput {
  /** The ID of the file associated with this citation. */
  file_id: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

/** A citation within the message that points to a file located at a specific path. */
export interface AssistantThreadMessageTextFilePathAnnotationOutput
  extends AssistantThreadMessageTextAnnotationOutputParent {
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
export interface OpenAIListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantThreadMessageOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** Information about a file attached to an assistant thread message. */
export interface AssistantThreadMessageFileOutput {
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
export interface OpenAIListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantThreadMessageFileOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** Data representing a single evaluation run of an assistant thread. */
export interface AssistantThreadRunOutput {
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
  required_action?: AssistantThreadRunRequiredActionOutput;
  /** The last error, if any, encountered by this assistant thread run. */
  last_error?: AssistantThreadRunErrorOutput;
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
  /** The Unix timestamp, in seconds, representing when this item was started. */
  started_at: number;
  /** The Unix timestamp, in seconds, representing when this item expires. */
  expires_at: number;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completed_at?: number;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelled_at?: number;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failed_at?: number;
}

/** An abstract representation of a required action for an assistant thread run to continue. */
export interface AssistantThreadRunRequiredActionOutputParent {
  type: string;
}

/** The details for required tool calls that must be submitted for an assistant thread run to continue. */
export interface AssistantThreadRunSubmitToolOutputsActionOutput
  extends AssistantThreadRunRequiredActionOutputParent {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The list of tool calls that must be resolved for the assistant thread run to continue. */
  tool_calls: Array<AssistantThreadRunToolCallOutput>;
}

/** An abstract representation of a tool call as performed by an assistant thread run. */
export interface AssistantThreadRunToolCallOutputParent {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  type: string;
}

/** The details of a function tool call performed by an assitant thread run. */
export interface AssistantThreadRunFunctionCallOutput
  extends AssistantThreadRunToolCallOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The details of the function invoked by this tool call. */
  function: AssistantThreadRunFunctionOutput;
}

/** The definition of a tool function as used by an assistant thread run. */
export interface AssistantThreadRunFunctionOutput {
  /** The name of the function. */
  name: string;
  /** The arguments for the function. */
  arguments: string;
}

/** The details of an error as encountered by an assistant thread run. */
export interface AssistantThreadRunErrorOutput {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
}

/** The response data for a requested list of items. */
export interface OpenAIListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantThreadRunOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** Detailed information about a single step of an assistant thread run. */
export interface AssistantThreadRunStepOutput {
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
  /** If applicable, information about the last error encountered by this run step. */
  last_error?: AssistantThreadRunStepErrorOutput;
  /** The details for this run step. */
  step_details: AssistantThreadRunStepDetailsOutput;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The Unix timestamp, in seconds, representing when this item expired. */
  expired_at?: number;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completed_at?: number;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelled_at?: number;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failed_at?: number;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The error information associated with a failed run step. */
export interface AssistantThreadRunStepErrorOutput {
  /**
   * The error code for this error.
   *
   * Possible values: server_error, rate_limit_exceeded
   */
  code: string;
  /** The human-readable text associated with this error. */
  message: string;
}

/** An abstract representation of the details for a run step. */
export interface AssistantThreadRunStepDetailsOutputParent {
  type: string;
}

/** The detailed information associated with a message creation run step. */
export interface AssistantThreadRunStepMessageCreationDetailsOutput
  extends AssistantThreadRunStepDetailsOutputParent {
  /** The object type, which is always 'message_creation'. */
  type: "message_creation";
  /** Information about the message creation associated with this run step. */
  message_creation: AssistantThreadRunStepMessageCreationOutput;
}

/** The details of a message created as a part of a run step. */
export interface AssistantThreadRunStepMessageCreationOutput {
  /** The ID of the message created by this run step. */
  message_id: string;
}

/** The detailed information associated with a run step calling tools. */
export interface AssistantThreadRunStepToolCallsDetailsOutput
  extends AssistantThreadRunStepDetailsOutputParent {
  /** The object type, which is always 'tool_calls'. */
  type: "tool_calls";
  /** A list tool call details for this run step. */
  tool_calls: Array<AssistantThreadRunStepToolCallOutput>;
}

/** An abstract representation of tool call details associated with a run step. */
export interface AssistantThreadRunStepToolCallOutputParent {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  type: string;
}

/** The data associated with a code interpreter tool call as performed during a run step. */
export interface AssistantThreadRunStepCodeInterpreterToolCallOutput
  extends AssistantThreadRunStepToolCallOutputParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
  /** The code interpreter tool definition used by this run step's tool call. */
  code_interpreter: AssistantCodeInterpreterToolDefinitionOutput;
}

/** The definition information for a code interpreter tool as represented in a run step. */
export interface AssistantCodeInterpreterToolDefinitionOutput {
  /** The input to the Code Interpreter tool call. */
  input: string;
  /** The outputs from the Code Interpreter tool call. Code Interpreter can output one or more items, including text (logs) or images (image). */
  outputs: Array<AssistantCodeInterpreterToolCallOutputOutput>;
}

/** An abstract representation of a code interpreter tool's output from a run step tool call. */
export interface AssistantCodeInterpreterToolCallOutputOutputParent {
  type: string;
}

/** The tool call output from a code interpreter run step that produces logs. */
export interface AssistantCodeInterpreterLogToolCallOutputOutput
  extends AssistantCodeInterpreterToolCallOutputOutputParent {
  /** The object type, which is always 'logs'. */
  type: "logs";
  /** The log data from this tool call output. */
  logs: string;
}

/** The tool call output from a code interpreter run step that produces an image. */
export interface AssistantCodeInterpreterImageToolCallOutputOutput
  extends AssistantCodeInterpreterToolCallOutputOutputParent {
  /** The object type, which is always 'image'. */
  type: "image";
  /** The image information associated with this tool call output. */
  image: AssistantCodeInterpreterImageOutput;
}

/** Information about an image associated with code interpreter tool output from a run step. */
export interface AssistantCodeInterpreterImageOutput {
  /** The ID of the file associated with this image. */
  file_id: string;
}

/** The data associated with a retrieval tool call performed by a run step. */
export interface AssistantThreadRunStepRetrievalToolCallOutput
  extends AssistantThreadRunStepToolCallOutputParent {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
  /** The key/value pairs produced by the retrieval tool. */
  retrieval: Record<string, string>;
}

/** The data associated with a function tool call performed by a run step. */
export interface AssistantThreadRunStepFunctionToolCallOutput
  extends AssistantThreadRunStepToolCallOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The function information associated with this tool call. */
  function: AssistantThreadRunStepToolCallDefinitionOutput;
}

/** The definition for a function as used by a run step tool call. */
export interface AssistantThreadRunStepToolCallDefinitionOutput {
  /** The name of the function. */
  name: string;
  /** The arguments provided to the function. */
  arguments: string;
  /** The output of the function, which will be null if outputs have not yet been submitted. */
  output?: string;
}

/** The response data for a requested list of items. */
export interface OpenAIListResponseOfOutput {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Array<AssistantThreadRunStepOutput>;
  /** The first ID represented in this list. */
  first_id: string;
  /** The last ID represented in this list. */
  last_id: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  has_more: boolean;
}

/** An abstract representation of a tool that an assistant can enable. */
export type AssistantToolOutput =
  | AssistantCodeInterpreterToolOutput
  | AssistantRetrievalToolOutput
  | AssistantFunctionToolOutput;
/** An abstract representation of a single item of thread message content. */
export type AssistantThreadMessageContentOutput =
  | AssistantThreadImageFileContentOutput
  | AssistantThreadMessageTextContentOutput;
/** An abstract representation of an annotation to text thread message content. */
export type AssistantThreadMessageTextAnnotationOutput =
  | AssistantThreadMessageTextFileAnnotationOutput
  | AssistantThreadMessageTextFilePathAnnotationOutput;
/** An abstract representation of a required action for an assistant thread run to continue. */
export type AssistantThreadRunRequiredActionOutput =
  AssistantThreadRunSubmitToolOutputsActionOutput;
/** An abstract representation of a tool call as performed by an assistant thread run. */
export type AssistantThreadRunToolCallOutput =
  AssistantThreadRunFunctionCallOutput;
/** An abstract representation of the details for a run step. */
export type AssistantThreadRunStepDetailsOutput =
  | AssistantThreadRunStepMessageCreationDetailsOutput
  | AssistantThreadRunStepToolCallsDetailsOutput;
/** An abstract representation of tool call details associated with a run step. */
export type AssistantThreadRunStepToolCallOutput =
  | AssistantThreadRunStepCodeInterpreterToolCallOutput
  | AssistantThreadRunStepRetrievalToolCallOutput
  | AssistantThreadRunStepFunctionToolCallOutput;
/** An abstract representation of a code interpreter tool's output from a run step tool call. */
export type AssistantCodeInterpreterToolCallOutputOutput =
  | AssistantCodeInterpreterLogToolCallOutputOutput
  | AssistantCodeInterpreterImageToolCallOutputOutput;
