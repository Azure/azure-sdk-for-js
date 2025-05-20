// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MessageRole } from "./models.js";
import type { RunStepFileSearchToolCallResultsOutput } from "./outputModels.js";

/** Represents a message delta i.e. any changed fields on a message during streaming. */
export interface MessageDeltaChunk {
  /** The identifier of the message, which can be referenced in API endpoints. */
  id: string;

  /** The object type, which is always `thread.message.delta`. */
  object: "thread.message.delta";

  /** The delta containing the fields that have changed on the Message. */
  delta: MessageDelta;
}

/** Represents the typed 'delta' payload within a streaming message delta chunk. */
export interface MessageDelta {
  /** The entity that produced the message. */
  role: MessageRole;

  /** The content of the message as an array of text and/or images. */
  content: Array<MessageDeltaContent>;
}

/** Represents the content of a message delta. */
export type MessageDeltaContent =
  | MessageDeltaContentParent
  | MessageDeltaTextContent
  | MessageDeltaImageFileContent;

/** The abstract base representation of a partial streamed message content payload. */
export interface MessageDeltaContentParent {
  /** The index of the content part of the message. */
  index: number;

  /** The type of content for this content part. */
  type: string;
}
/** Represents a streamed image file content part within a streaming message delta chunk. */
export interface MessageDeltaImageFileContent extends MessageDeltaContentParent {
  /** The type of content for this content part, which is always "image_file." */
  type: "image_file";

  /** The image_file data. */
  imageFile?: MessageDeltaImageFileContentObject;
}

/** Represents the 'image_file' payload within streaming image file content. */
export interface MessageDeltaImageFileContentObject {
  /** The file ID of the image in the message content. */
  fileId?: string;
}

/** Represents a streamed text content part within a streaming message delta chunk. */
export interface MessageDeltaTextContent extends MessageDeltaContentParent {
  /** The type of content for this content part, which is always "text." */
  type: "text";

  /** The text content details. */
  text?: MessageDeltaTextContentObject;
}

/** Represents the data of a streamed text content part within a streaming message delta chunk. */
export interface MessageDeltaTextContentObject {
  /** The data that makes up the text. */
  value?: string;

  /** Annotations for the text. */
  annotations?: Array<MessageDeltaTextAnnotation>;
}

/** Represents a text annotation within a streamed text content part. */
export type MessageDeltaTextAnnotation =
  | MessageDeltaTextAnnotationParent
  | MessageDeltaTextFileCitationAnnotation
  | MessageDeltaTextFilePathAnnotation;

/** The abstract base representation of a streamed text content part's text annotation. */
export interface MessageDeltaTextAnnotationParent {
  /** The index of the annotation within a text content part. */
  index: number;

  /** The type of the text content annotation. */
  type: string;
}

/** Represents a streamed file citation applied to a streaming text content part. */
export interface MessageDeltaTextFileCitationAnnotation extends MessageDeltaTextAnnotationParent {
  /** The type of the text content annotation, which is always "file_citation." */
  type: "file_citation";

  /** The file citation information. */
  fileCitation?: MessageDeltaTextFileCitationAnnotationObject;

  /** The text in the message content that needs to be replaced */
  text?: string;

  /** The start index of this annotation in the content text. */
  startIndex?: number;

  /** The end index of this annotation in the content text. */
  endIndex?: number;
}

/** Represents the data of a streamed file citation as applied to a streaming text content part. */
export interface MessageDeltaTextFileCitationAnnotationObject {
  /** The ID of the specific file the citation is from. */
  fileId?: string;

  /** The specific quote in the cited file. */
  quote?: string;
}

/** Represents a streamed file path annotation applied to a streaming text content part. */
export interface MessageDeltaTextFilePathAnnotation extends MessageDeltaTextAnnotationParent {
  /** The type of the text content annotation, which is always "file_path." */
  type: "file_path";

  /** The file path information. */
  filePath?: MessageDeltaTextFilePathAnnotationObject;

  /** The start index of this annotation in the content text. */
  startIndex?: number;

  /** The end index of this annotation in the content text. */
  endIndex?: number;

  /** The text in the message content that needs to be replaced */
  text?: string;
}

/** Represents the data of a streamed file path annotation as applied to a streaming text content part. */
export interface MessageDeltaTextFilePathAnnotationObject {
  /** The file ID for the annotation. */
  fileId?: string;
}

/** A representation of the URL used for the text citation. */
export interface MessageDeltaTextUrlCitationDetails {
  /** The URL where the citation is from. */
  url?: string;

  /** The title of the URL. */
  title?: string;
}

/** Represents a run step delta i.e. any changed fields on a run step during streaming. */
export interface RunStepDeltaChunk {
  /** The identifier of the run step, which can be referenced in API endpoints. */
  id: string;

  /** The object type, which is always `thread.run.step.delta`. */
  object: "thread.run.step.delta";

  /** The delta containing the fields that have changed on the run step. */
  delta: RunStepDelta;
}

/** Represents the delta payload in a streaming run step delta chunk. */
export interface RunStepDelta {
  /** The details of the run step. */
  stepDetails?: RunStepDeltaDetail;
}

/** Represents a single run step detail item in a streaming run step's delta payload. */
export interface RunStepDeltaDetail {
  /** The object type for the run step detail object. */
  type: string;
}

/** Represents a message creation within a streaming run step delta. */
export interface RunStepDeltaMessageCreation extends RunStepDeltaDetail {
  /** The object type, which is always "message_creation." */
  type: "message_creation";

  /** The message creation data. */
  messageCreation?: RunStepDeltaMessageCreationObject;
}

/** Represents the data within a streaming run step message creation response object. */
export interface RunStepDeltaMessageCreationObject {
  /** The ID of the newly-created message. */
  messageId?: string;
}

/** Represents an invocation of tool calls as part of a streaming run step. */
export interface RunStepDeltaToolCallObject extends RunStepDeltaDetail {
  /** The object type, which is always "tool_calls." */
  type: "tool_calls";

  /** The collection of tool calls for the tool call detail item. */
  toolCalls?: Array<RunStepDeltaToolCall>;
}

/** Represents a single tool call within a streaming run step's delta tool call details. */
export type RunStepDeltaToolCall =
  | RunStepDeltaToolCallParent
  | RunStepDeltaFunctionToolCall
  | RunStepDeltaFileSearchToolCall
  | RunStepDeltaCodeInterpreterToolCall;

/** The abstract base representation of a single tool call within a streaming run step's delta tool call details. */
export interface RunStepDeltaToolCallParent {
  /** The index of the tool call detail in the run step's tool_calls array. */
  index: number;

  /** The ID of the tool call, used when submitting outputs to the run. */
  id: string;

  /** The type of the tool call detail item in a streaming run step's details. */
  type: string;
}

/** Represents a function tool call within a streaming run step's tool call details. */
export interface RunStepDeltaFunctionToolCall extends RunStepDeltaToolCallParent {
  /** The object type, which is always "function." */
  type: "function";

  /** The function data for the tool call. */
  function?: RunStepDeltaFunction;
}

/** Represents a file search tool call within a streaming run step's tool call details. */
export interface RunStepDeltaFileSearchToolCall extends RunStepDeltaToolCallParent {
  /** The object type, which is always "file_search." */
  type: "file_search";

  /** Reserved for future use. */
  fileSearch?: RunStepFileSearchToolCallResultsOutput;
}

/** Represents a Code Interpreter tool call within a streaming run step's tool call details. */
export interface RunStepDeltaCodeInterpreterToolCall extends RunStepDeltaToolCallParent {
  /** The object type, which is always "code_interpreter." */
  type: "code_interpreter";

  /** The Code Interpreter data for the tool call. */
  codeInterpreter?: RunStepDeltaCodeInterpreterDetailItemObject;
}

/** Represents the function data in a streaming run step delta's function tool call. */
export interface RunStepDeltaFunction {
  /** The name of the function. */
  name?: string;

  /** The arguments passed to the function as input. */
  arguments?: string;

  /** The output of the function, null if outputs have not yet been submitted. */
  output?: string | null;
}

/** Represents the Code Interpreter data in a streaming run step's tool call output. */
export type RunStepDeltaCodeInterpreterOutput =
  | RunStepDeltaCodeInterpreterOutputParent
  | RunStepDeltaCodeInterpreterLogOutput
  | RunStepDeltaCodeInterpreterImageOutput;

/** Represents the Code Interpreter tool call data in a streaming run step's tool calls. */
export interface RunStepDeltaCodeInterpreterDetailItemObject {
  /** The input into the Code Interpreter tool call. */
  input?: string;

  /**
   * The outputs from the Code Interpreter tool call. Code Interpreter can output one or more
   * items, including text (`logs`) or images (`image`). Each of these are represented by a
   * different object type.
   */
  outputs?: Array<RunStepDeltaCodeInterpreterOutput>;
}

/** The abstract base representation of a streaming run step tool call's Code Interpreter tool output. */
export interface RunStepDeltaCodeInterpreterOutputParent {
  /** The index of the output in the streaming run step tool call's Code Interpreter outputs array. */
  index: number;

  /** The type of the streaming run step tool call's Code Interpreter output. */
  type: string;
}

/** Represents a log output as produced by the Code Interpreter tool and as represented in a streaming run step's delta tool calls collection. */
export interface RunStepDeltaCodeInterpreterLogOutput
  extends RunStepDeltaCodeInterpreterOutputParent {
  /** The type of the object, which is always "logs." */
  type: "logs";

  /** The text output from the Code Interpreter tool call. */
  logs?: string;
}

/** Represents an image output as produced the Code interpreter tool and as represented in a streaming run step's delta tool calls collection. */
export interface RunStepDeltaCodeInterpreterImageOutput
  extends RunStepDeltaCodeInterpreterOutputParent {
  /** The object type, which is always "image." */
  type: "image";

  /** The image data for the Code Interpreter tool call output. */
  image?: RunStepDeltaCodeInterpreterImageOutputObject;
}

/** Represents the data for a streaming run step's Code Interpreter tool call image output. */
export interface RunStepDeltaCodeInterpreterImageOutputObject {
  /** The file ID for the image. */
  fileId?: string;
}
