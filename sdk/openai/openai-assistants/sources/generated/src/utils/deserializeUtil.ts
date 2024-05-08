// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  MessageTextContentOutput,
  MessageImageFileContentOutput,
  MessageContentOutput,
  MessageTextFileCitationAnnotationOutput,
  MessageTextFilePathAnnotationOutput,
  MessageTextAnnotationOutput,
  SubmitToolOutputsActionOutput,
  RequiredActionOutput,
  RunStepMessageCreationDetailsOutput,
  RunStepToolCallDetailsOutput,
  RunStepDetailsOutput,
  CodeInterpreterToolCallOutput,
  ToolCallOutput,
  CodeInterpreterImageOutputOutput,
  CodeInterpreterToolCallOutputOutput,
} from "../rest/index.js";
import {
  MessageTextContent,
  MessageImageFileContent,
  MessageContentUnion,
  MessageTextFileCitationAnnotation,
  MessageTextFilePathAnnotation,
  MessageTextAnnotationUnion,
  SubmitToolOutputsAction,
  RequiredActionUnion,
  RunStepMessageCreationDetails,
  RunStepToolCallDetails,
  RunStepDetailsUnion,
  CodeInterpreterToolCall,
  ToolCallUnion,
  CodeInterpreterImageOutput,
  CodeInterpreterToolCallOutputUnion,
} from "../models/models.js";

/** deserialize function for MessageTextContent */
function deserializeMessageTextContent(
  obj: MessageTextContentOutput,
): MessageTextContent {
  return {
    type: obj["type"],
    text: {
      value: obj.text["value"],
      annotations: obj.text["annotations"].map((p) =>
        deserializeMessageTextAnnotationUnion(p),
      ),
    },
  };
}

/** deserialize function for MessageImageFileContent */
function deserializeMessageImageFileContent(
  obj: MessageImageFileContentOutput,
): MessageImageFileContent {
  return {
    type: obj["type"],
    imageFile: { fileId: { fileId: obj.image_file.file_id["file_id"] } },
  };
}

/** deserialize function for MessageContentOutput */
export function deserializeMessageContentUnion(
  obj: MessageContentOutput,
): MessageContentUnion {
  switch (obj.type) {
    case "text":
      return deserializeMessageTextContent(obj as MessageTextContent);
    case "image_file":
      return deserializeMessageImageFileContent(obj as MessageImageFileContent);
    default:
      return obj;
  }
}

/** deserialize function for MessageTextFileCitationAnnotation */
function deserializeMessageTextFileCitationAnnotation(
  obj: MessageTextFileCitationAnnotationOutput,
): MessageTextFileCitationAnnotation {
  return {
    type: obj["type"],
    text: obj["text"],
    startIndex: obj["start_index"],
    endIndex: obj["end_index"],
    fileCitation: {
      fileId: obj.file_citation["file_id"],
      quote: obj.file_citation["quote"],
    },
  };
}

/** deserialize function for MessageTextFilePathAnnotation */
function deserializeMessageTextFilePathAnnotation(
  obj: MessageTextFilePathAnnotationOutput,
): MessageTextFilePathAnnotation {
  return {
    type: obj["type"],
    text: obj["text"],
    startIndex: obj["start_index"],
    endIndex: obj["end_index"],
    filePath: { fileId: obj.file_path["file_id"] },
  };
}

/** deserialize function for MessageTextAnnotationOutput */
export function deserializeMessageTextAnnotationUnion(
  obj: MessageTextAnnotationOutput,
): MessageTextAnnotationUnion {
  switch (obj.type) {
    case "file_citation":
      return deserializeMessageTextFileCitationAnnotation(
        obj as MessageTextFileCitationAnnotation,
      );
    case "file_path":
      return deserializeMessageTextFilePathAnnotation(
        obj as MessageTextFilePathAnnotation,
      );
    default:
      return obj;
  }
}

/** deserialize function for SubmitToolOutputsAction */
function deserializeSubmitToolOutputsAction(
  obj: SubmitToolOutputsActionOutput,
): SubmitToolOutputsAction {
  return {
    type: obj["type"],
    submitToolOutputs: { toolCalls: obj.submit_tool_outputs["tool_calls"] },
  };
}

/** deserialize function for RequiredActionOutput */
export function deserializeRequiredActionUnion(
  obj: RequiredActionOutput,
): RequiredActionUnion {
  switch (obj.type) {
    case "submit_tool_outputs":
      return deserializeSubmitToolOutputsAction(obj as SubmitToolOutputsAction);
    default:
      return obj;
  }
}

/** deserialize function for RunStepMessageCreationDetails */
function deserializeRunStepMessageCreationDetails(
  obj: RunStepMessageCreationDetailsOutput,
): RunStepMessageCreationDetails {
  return {
    type: obj["type"],
    messageCreation: { messageId: obj.message_creation["message_id"] },
  };
}

/** deserialize function for RunStepToolCallDetails */
function deserializeRunStepToolCallDetails(
  obj: RunStepToolCallDetailsOutput,
): RunStepToolCallDetails {
  return {
    type: obj["type"],
    toolCalls: obj["tool_calls"].map((p) => deserializeToolCallUnion(p)),
  };
}

/** deserialize function for RunStepDetailsOutput */
export function deserializeRunStepDetailsUnion(
  obj: RunStepDetailsOutput,
): RunStepDetailsUnion {
  switch (obj.type) {
    case "message_creation":
      return deserializeRunStepMessageCreationDetails(
        obj as RunStepMessageCreationDetails,
      );
    case "tool_calls":
      return deserializeRunStepToolCallDetails(obj as RunStepToolCallDetails);
    default:
      return obj;
  }
}

/** deserialize function for CodeInterpreterToolCall */
function deserializeCodeInterpreterToolCall(
  obj: CodeInterpreterToolCallOutput,
): CodeInterpreterToolCall {
  return {
    type: obj["type"],
    id: obj["id"],
    codeInterpreter: {
      input: obj.code_interpreter["input"],
      outputs: obj.code_interpreter["outputs"].map((p) =>
        deserializeCodeInterpreterToolCallOutputUnion(p),
      ),
    },
  };
}

/** deserialize function for ToolCallOutput */
export function deserializeToolCallUnion(obj: ToolCallOutput): ToolCallUnion {
  switch (obj.type) {
    case "code_interpreter":
      return deserializeCodeInterpreterToolCall(obj as CodeInterpreterToolCall);
    default:
      return obj;
  }
}

/** deserialize function for CodeInterpreterImageOutput */
function deserializeCodeInterpreterImageOutput(
  obj: CodeInterpreterImageOutputOutput,
): CodeInterpreterImageOutput {
  return { type: obj["type"], image: { fileId: obj.image["file_id"] } };
}

/** deserialize function for CodeInterpreterToolCallOutputOutput */
export function deserializeCodeInterpreterToolCallOutputUnion(
  obj: CodeInterpreterToolCallOutputOutput,
): CodeInterpreterToolCallOutputUnion {
  switch (obj.type) {
    case "image":
      return deserializeCodeInterpreterImageOutput(
        obj as CodeInterpreterImageOutput,
      );
    default:
      return obj;
  }
}
