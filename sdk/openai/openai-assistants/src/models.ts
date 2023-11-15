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
  tools?: Array<AssistantTool>;
  /** A list of previously uploaded file IDs to attach to the assistant. */
  file_ids?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of a tool that an assistant can enable. */
export interface AssistantToolParent {
  type: string;
}

/** The definition information for the code interpreter tool. */
export interface AssistantCodeInterpreterTool extends AssistantToolParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The definition information for the retrieval tool. */
export interface AssistantRetrievalTool extends AssistantToolParent {
  /** The object type, which is always 'retrieval'. */
  type: "retrieval";
}

/** The definition information for a function tool. */
export interface AssistantFunctionTool extends AssistantToolParent {
  /** The object type, which is always 'function'. */
  type: "function";
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
  tools?: Array<AssistantTool>;
  /** The modified list of previously uploaded fileIDs to attach to the assistant. */
  file_ids?: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** The details used to create a new assistant thread. */
export interface AssistantThreadCreationOptions {
  /** The messages to associate with the new thread. */
  messages?: Array<AssistantThreadMessage>;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** A single message within an assistant thread. */
export interface AssistantThreadMessage {
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
  content: Array<AssistantThreadMessageContent>;
  /** If applicable, the ID of the assistant that authored this message. */
  assistant_id?: string;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  run_id?: string;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of a single item of thread message content. */
export interface AssistantThreadMessageContentParent {
  type: string;
}

/** A representation of image file content in a thread message. */
export interface AssistantThreadImageFileContent
  extends AssistantThreadMessageContentParent {
  /** The object type, which is always 'image_file'. */
  type: "image_file";
  /** The image file for this thread message content item. */
  image_file: AssistantImageFile;
}

/** An image reference, as represented in thread message content. */
export interface AssistantImageFile {
  /** The ID for the file associated with this image. */
  file_id: string;
}

/** A representation of a textual item of thread message content. */
export interface AssistantThreadMessageTextContent
  extends AssistantThreadMessageContentParent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: AssistantThreadMessageText;
  /** A list of attached file IDs, ordered by creation date in ascending order. */
  file_ids: string[];
  /** A set of key/value pairs used to store additional information about the object. */
  metadata: Record<string, string>;
}

/** The text and associated annotations for a single item of assistant thread message content. */
export interface AssistantThreadMessageText {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: Array<AssistantThreadMessageTextAnnotation>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface AssistantThreadMessageTextAnnotationParent {
  /** The textual content associated with this text annotation item. */
  text: string;
  /** The first text index associated with this text annotation. */
  start_index: number;
  /** The last text index associated with this text annotation. */
  end_index: number;
  type: string;
}

/** A citation within the message that points to a specific quote from a specific File associated with the assistant or the message. Generated when the assistant uses the 'retrieval' tool to search files. */
export interface AssistantThreadMessageTextFileAnnotation
  extends AssistantThreadMessageTextAnnotationParent {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /** The file-based citation associated with this annotation. */
  file_citation: AssistantThreadMessageTextFileCitation;
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface AssistantThreadMessageTextFileCitation {
  /** The ID of the file associated with this citation. */
  file_id: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

/** A citation within the message that points to a file located at a specific path. */
export interface AssistantThreadMessageTextFilePathAnnotation
  extends AssistantThreadMessageTextAnnotationParent {
  /** The object type, which is always 'file_path'. */
  type: "file_path";
  /** A URL for the file that's generated when the assistant used the code_interpreter tool to generate a file. */
  file_path: string;
}

/** The output information provided for a tool call required by an assistant thread run. */
export interface AssistantThreadRunToolOutput {
  /** The ID of the tool call. */
  tool_call_id?: string;
  /** The output of the tool call. */
  output?: string;
}

/** The details used when creating and immediately running a new assistant thread. */
export interface AssistantThreadCreateAndRunOptions {
  /** The ID of the assistant for which the thread should be created. */
  assistant_id: string;
  /** The details used to create the new thread. */
  thread?: AssistantThreadCreationOptions;
  /** The ID of the model to use. */
  model?: string;
  /** The overriden system instructions to use for the thread run. */
  instructions?: string;
  /** The overriden list of tools to enable for the thread run. */
  tools?: Array<AssistantTool>;
  /** A set of key/value pairs used to store additional information about the object. */
  metadata?: Record<string, string>;
}

/** An abstract representation of a tool that an assistant can enable. */
export type AssistantTool =
  | AssistantCodeInterpreterTool
  | AssistantRetrievalTool
  | AssistantFunctionTool;
/** An abstract representation of a single item of thread message content. */
export type AssistantThreadMessageContent =
  | AssistantThreadImageFileContent
  | AssistantThreadMessageTextContent;
/** An abstract representation of an annotation to text thread message content. */
export type AssistantThreadMessageTextAnnotation =
  | AssistantThreadMessageTextFileAnnotation
  | AssistantThreadMessageTextFilePathAnnotation;
