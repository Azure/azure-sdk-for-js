// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An abstract representation of an input tool definition that an assistant can use. */
export interface ToolDefinitionOutput {
  type: string;
  function?: FunctionDefinitionOutput;
}

/** The input definition information for a code interpreter tool as used to configure an assistant. */
export interface CodeInterpreterToolDefinitionOutput
  extends ToolDefinitionOutput {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The input definition information for a retrieval tool as used to configure an assistant. */
export interface RetrievalToolDefinitionOutput
  extends ToolDefinitionOutput {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
}

/** The input definition information for a function tool as used to configure an assistant. */
export interface FunctionToolDefinitionOutput
  extends ToolDefinitionOutput {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinitionOutput;
}

/** The input definition information for a function. */
export interface FunctionDefinitionOutput {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: any;
}

export interface TypeSpecRecordOutput extends Record<string, string> {}

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
  tools: Array<ToolDefinitionOutput>;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: TypeSpecRecordOutput;
}

/** The response data for a requested list of items. */
export interface ListResponseOfOutput<T> {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: T[];
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
  metadata?: TypeSpecRecordOutput;
}

/** An abstract representation of a single item of thread message content. */
export interface AssistantMessageContentOutput {
  type: string;
/** The image file for this thread message content item. */
  image_file?: AssistantImageFileOutput;
  /** The text and associated annotations for this thread message content item. */
  text?: AssistantMessageTextOutput;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** A representation of image file content in a thread message. */
export interface AssistantMessageImageFileContentOutput
  extends AssistantMessageContentOutput {
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
  extends AssistantMessageContentOutput {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: AssistantMessageTextOutput;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: TypeSpecRecordOutput;
}

/** The text and associated annotations for a single item of assistant thread message content. */
export interface AssistantMessageTextOutput {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: Array<AssistantMessageTextAnnotationOutput>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface AssistantMessageTextAnnotationOutput {
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
  extends AssistantMessageTextAnnotationOutput {
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
  extends AssistantMessageTextAnnotationOutput {
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
  metadata: TypeSpecRecordOutput;
}

/** The status of a thread deletion operation. */
export interface ThreadDeletionStatusOutput {
  /** The object type, which is always 'thread.deleted'. */
  object: "thread.deleted";
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
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
  required_action?: RequiredActionOutput;
  /** The last error, if any, encountered by this assistant thread run. */
  last_error?: RunErrorOutput;
  /** The ID of the model to use. */
  model: string;
  /** The overriden system instructions used for this assistant thread run. */
  instructions: string;
  /** The overriden enabled tools used for this assistant thread run. */
  tools: Array<ToolDefinitionOutput>;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: TypeSpecRecordOutput;
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
export interface RequiredActionOutputParent {
  type: string;
}

/** The details for required tool calls that must be submitted for an assistant thread run to continue. */
export interface SubmitToolOutputsActionOutput
  extends RequiredActionOutputParent {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The details describing tools that should be called to submit tool outputs. */
  submit_tool_outputs: SubmitToolOutputsDetailsOutput;
}

/** The details describing tools that should be called to submit tool outputs. */
export interface SubmitToolOutputsDetailsOutput {
  /** The list of tool calls that must be resolved for the assistant thread run to continue. */
  tool_calls: Array<ToolCallOutput>;
}

/**
 * An abstract representation a tool call, issued by the model in evaluation of a configured tool definition, that must
 * be fulfilled and have its outputs submitted before the model can continue.
 */
export interface ToolCallOutputParent {
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
  type: string;
}

/**
 * A tool call to a code interpreter tool, issued by the model in evaluation of a configured code interpeter tool, that
 * represents submitted output needed or already fulfilled by the tool for the model to continue.
 */
export interface CodeInterpreterToolCallOutput extends ToolCallOutputParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
  /** The details of the tool call to the code interpreter tool. */
  code_interpreter: CodeInterpeterCallDetailsOutput;
}

/** The detailed information about a code interpreter invocation by the model. */
export interface CodeInterpeterCallDetailsOutput {
  /** The input provided by the model to the code interpreter tool. */
  input: string;
  /** The outputs produced by the code interpeter tool back to the model in response to the tool call. */
  outputs: Array<CodeInterpreterCallOutputOutput>;
}

/** An abstract representation of an emitted output from a code interpreter tool. */
export interface CodeInterpreterCallOutputOutputParent {
  type: string;
}

/** A representation of a log output emitted by a code interpreter tool in response to a tool call by the model. */
export interface CodeInterpreterLogOutputOutput
  extends CodeInterpreterCallOutputOutputParent {
  /** The object type, which is always 'logs'. */
  type: "logs";
  /** The serialized log output emitted by the code interpreter. */
  logs: string;
}

/** A representation of an image output emitted by a code interpreter tool in response to a tool call by the model. */
export interface CodeInterpreterImageOutputOutput
  extends CodeInterpreterCallOutputOutputParent {
  /** The object type, which is always 'image'. */
  type: "image";
  /** Referential information for the image associated with this output. */
  image: CodeInterpreterImageReferenceOutput;
}

/** An image reference emitted by a code interpreter tool in response to a tool call by the model. */
export interface CodeInterpreterImageReferenceOutput {
  /** The ID of the file associated with this image. */
  file_id: string;
}

/**
 * A tool call to a retrieval tool, issued by the model in evaluation of a configured retrieval tool, that represents
 * submitted output needed or already fulfilled by the tool for the model to continue.
 */
export interface RetrievalToolCallOutput extends ToolCallOutputParent {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
  /** The key/value pairs produced by the retrieval tool. */
  retrieval: TypeSpecRecordOutput;
}

/**
 * A tool call to a function tool, issued by the model in evaluation of a configured function tool, that represents
 * given function inputs and submitted function outputs needed or already fulfilled by the tool for the model to continue.
 */
export interface FunctionToolCallOutput extends ToolCallOutputParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The detailed information about the function called by the model. */
  function: FunctionCallDetailsOutput;
}

/** The detailed information about the function called by the model. */
export interface FunctionCallDetailsOutput {
  /** The name of the function. */
  name: string;
  /** The arguments that the model requires are provided to the named function. */
  arguments: string;
  /** The output of the function, only populated for function calls that have already have had their outputs submitted. */
  output?: string | null;
}

/** The details of an error as encountered by an assistant thread run. */
export interface RunErrorOutput {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
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
  metadata: TypeSpecRecordOutput;
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
  message_creation: RunStepMessageCreationReferenceOutput;
}

/** The details of a message created as a part of a run step. */
export interface RunStepMessageCreationReferenceOutput {
  /** The ID of the message created by this run step. */
  message_id: string;
}

/** The detailed information associated with a run step calling tools. */
export interface RunStepToolCallDetailsOutput
  extends RunStepDetailsOutputParent {
  /** The object type, which is always 'tool_calls'. */
  type: "tool_calls";
  /** A list tool call details for this run step. */
  tool_calls: Array<ToolCallOutput>;
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

/** An abstract representation of a required action for an assistant thread run to continue. */
export type RequiredActionOutput = SubmitToolOutputsActionOutput;
/**
 * An abstract representation a tool call, issued by the model in evaluation of a configured tool definition, that must
 * be fulfilled and have its outputs submitted before the model can continue.
 */
export type ToolCallOutput =
  | CodeInterpreterToolCallOutput
  | RetrievalToolCallOutput
  | FunctionToolCallOutput;
/** An abstract representation of an emitted output from a code interpreter tool. */
export type CodeInterpreterCallOutputOutput =
  | CodeInterpreterLogOutputOutput
  | CodeInterpreterImageOutputOutput;
/** An abstract representation of the details for a run step. */
export type RunStepDetailsOutput =
  | RunStepMessageCreationDetailsOutput
  | RunStepToolCallDetailsOutput;
