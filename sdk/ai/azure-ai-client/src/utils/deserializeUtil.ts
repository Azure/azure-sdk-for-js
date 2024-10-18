// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Dataset,
  InputDataUnion,
  RecurrenceTrigger,
  TriggerUnion,
  ConnectionPropertiesSASAuth,
  ConnectionPropertiesUnion,
  FileSearchToolDefinition,
  ToolDefinitionUnion,
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
  RunStepCodeInterpreterToolCall,
  RunStepFileSearchToolCall,
  RunStepBingSearchToolCall,
  RunStepAzureAISearchToolCall,
  RunStepSharepointToolCall,
  RunStepMicrosoftFabricToolCall,
  RunStepToolCallUnion,
  RunStepCodeInterpreterImageOutput,
  RunStepCodeInterpreterToolCallOutputUnion,
  VectorStoreStaticChunkingStrategyResponse,
  VectorStoreChunkingStrategyResponseUnion,
  Frequency,
} from "../models/models.js";
import {
  DatasetOutput,
  InputDataOutput,
  RecurrenceTriggerOutput,
  TriggerOutput,
  ConnectionPropertiesSASAuthOutput,
  ConnectionPropertiesOutput,
  FileSearchToolDefinitionOutput,
  ToolDefinitionOutput,
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
  RunStepCodeInterpreterToolCallOutput,
  RunStepFileSearchToolCallOutput,
  RunStepBingSearchToolCallOutput,
  RunStepAzureAISearchToolCallOutput,
  RunStepSharepointToolCallOutput,
  RunStepMicrosoftFabricToolCallOutput,
  RunStepToolCallOutput,
  RunStepCodeInterpreterImageOutputOutput,
  RunStepCodeInterpreterToolCallOutputOutput,
  VectorStoreStaticChunkingStrategyResponseOutput,
  VectorStoreChunkingStrategyResponseOutput,
} from "../rest/index.js";

/** deserialize function for Dataset */
function deserializeDataset(obj: DatasetOutput): Dataset {
  return { type: obj["type"], id: obj["Uri"] };
}

/** deserialize function for InputDataOutput */
export function deserializeInputDataUnion(
  obj: InputDataOutput,
): InputDataUnion {
  switch (obj.type) {
    case "dataset":
      return deserializeDataset(obj as Dataset);
    default:
      return obj;
  }
}

/** deserialize function for RecurrenceTrigger */
function deserializeRecurrenceTrigger(
  obj: RecurrenceTriggerOutput,
): RecurrenceTrigger {
  return {
    type: obj["type"],
    frequency: obj["frequency"] as Frequency,
    interval: obj["interval"],
    schedule: {
      hours: obj.schedule["hours"],
      minutes: obj.schedule["minutes"],
      weekDays: obj.schedule["weekDays"],
      monthDays: obj.schedule["monthDays"],
    },
  };
}

/** deserialize function for TriggerOutput */
export function deserializeTriggerUnion(obj: TriggerOutput): TriggerUnion {
  switch (obj.type) {
    case "Recurrence":
      return deserializeRecurrenceTrigger(obj as RecurrenceTrigger);
    default:
      return obj;
  }
}

/** deserialize function for ConnectionPropertiesSASAuth */
function deserializeConnectionPropertiesSASAuth(
  obj: ConnectionPropertiesSASAuthOutput,
): ConnectionPropertiesSASAuth {
  return {
    authType: obj["authType"],
    category: obj["category"],
    credentials: { sAS: obj.credentials["SAS"] },
    target: obj["target"],
  };
}

/** deserialize function for ConnectionPropertiesOutput */
export function deserializeConnectionPropertiesUnion(
  obj: ConnectionPropertiesOutput,
): ConnectionPropertiesUnion {
  switch (obj.authType) {
    case "SAS":
      return deserializeConnectionPropertiesSASAuth(
        obj as ConnectionPropertiesSASAuth,
      );
    default:
      return obj;
  }
}

/** deserialize function for FileSearchToolDefinition */
function deserializeFileSearchToolDefinition(
  obj: FileSearchToolDefinitionOutput,
): FileSearchToolDefinition {
  return {
    type: obj["type"],
    fileSearch: !obj.file_search
      ? undefined
      : { maxNumResults: obj.file_search?.["max_num_results"] },
  };
}

/** deserialize function for ToolDefinitionOutput */
export function deserializeToolDefinitionUnion(
  obj: ToolDefinitionOutput,
): ToolDefinitionUnion {
  switch (obj.type) {
    case "file_search":
      return deserializeFileSearchToolDefinition(
        obj as FileSearchToolDefinition,
      );
    default:
      return obj;
  }
}

/** deserialize function for MessageTextContent */
function deserializeMessageTextContent(
  obj: MessageTextContentOutput,
): MessageTextContent {
  return {
    type: obj["type"],
    text: {
      value: obj.text["value"],
      annotations: obj.text["annotations"].map((p: any) =>
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
    imageFile: { fileId: obj.image_file["file_id"] },
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
    fileCitation: {
      fileId: obj.file_citation["file_id"],
      quote: obj.file_citation["quote"],
    },
    startIndex: obj["start_index"],
    endIndex: obj["end_index"],
  };
}

/** deserialize function for MessageTextFilePathAnnotation */
function deserializeMessageTextFilePathAnnotation(
  obj: MessageTextFilePathAnnotationOutput,
): MessageTextFilePathAnnotation {
  return {
    type: obj["type"],
    text: obj["text"],
    filePath: { fileId: obj.file_path["file_id"] },
    startIndex: obj["start_index"],
    endIndex: obj["end_index"],
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
    toolCalls: obj["tool_calls"].map((p: any) =>
      deserializeRunStepToolCallUnion(p),
    ),
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

/** deserialize function for RunStepCodeInterpreterToolCall */
function deserializeRunStepCodeInterpreterToolCall(
  obj: RunStepCodeInterpreterToolCallOutput,
): RunStepCodeInterpreterToolCall {
  return {
    type: obj["type"],
    id: obj["id"],
    codeInterpreter: {
      input: obj.code_interpreter["input"],
      outputs: obj.code_interpreter["outputs"].map((p: any) =>
        deserializeRunStepCodeInterpreterToolCallOutputUnion(p),
      ),
    },
  };
}

/** deserialize function for RunStepFileSearchToolCall */
function deserializeRunStepFileSearchToolCall(
  obj: RunStepFileSearchToolCallOutput,
): RunStepFileSearchToolCall {
  return { type: obj["type"], id: obj["id"], fileSearch: obj["file_search"] };
}

/** deserialize function for RunStepBingSearchToolCall */
function deserializeRunStepBingSearchToolCall(
  obj: RunStepBingSearchToolCallOutput,
): RunStepBingSearchToolCall {
  return { type: obj["type"], id: obj["id"], bingSearch: obj["bing_search"] };
}

/** deserialize function for RunStepAzureAISearchToolCall */
function deserializeRunStepAzureAISearchToolCall(
  obj: RunStepAzureAISearchToolCallOutput,
): RunStepAzureAISearchToolCall {
  return {
    type: obj["type"],
    id: obj["id"],
    azureAISearch: obj["azure_ai_search"],
  };
}

/** deserialize function for RunStepSharepointToolCall */
function deserializeRunStepSharepointToolCall(
  obj: RunStepSharepointToolCallOutput,
): RunStepSharepointToolCall {
  return { type: obj["type"], id: obj["id"], sharePoint: obj["sharepoint"] };
}

/** deserialize function for RunStepMicrosoftFabricToolCall */
function deserializeRunStepMicrosoftFabricToolCall(
  obj: RunStepMicrosoftFabricToolCallOutput,
): RunStepMicrosoftFabricToolCall {
  return {
    type: obj["type"],
    id: obj["id"],
    microsoftFabric: obj["microsoft_fabric"],
  };
}

/** deserialize function for RunStepToolCallOutput */
export function deserializeRunStepToolCallUnion(
  obj: RunStepToolCallOutput,
): RunStepToolCallUnion {
  switch (obj.type) {
    case "code_interpreter":
      return deserializeRunStepCodeInterpreterToolCall(
        obj as RunStepCodeInterpreterToolCall,
      );
    case "file_search":
      return deserializeRunStepFileSearchToolCall(
        obj as RunStepFileSearchToolCall,
      );
    case "bing_search":
      return deserializeRunStepBingSearchToolCall(
        obj as RunStepBingSearchToolCall,
      );
    case "azure_ai_search":
      return deserializeRunStepAzureAISearchToolCall(
        obj as RunStepAzureAISearchToolCall,
      );
    case "sharepoint":
      return deserializeRunStepSharepointToolCall(
        obj as RunStepSharepointToolCall,
      );
    case "microsoft_fabric":
      return deserializeRunStepMicrosoftFabricToolCall(
        obj as RunStepMicrosoftFabricToolCall,
      );
    default:
      return obj;
  }
}

/** deserialize function for RunStepCodeInterpreterImageOutput */
function deserializeRunStepCodeInterpreterImageOutput(
  obj: RunStepCodeInterpreterImageOutputOutput,
): RunStepCodeInterpreterImageOutput {
  return { type: obj["type"], image: { fileId: obj.image["file_id"] } };
}

/** deserialize function for RunStepCodeInterpreterToolCallOutputOutput */
export function deserializeRunStepCodeInterpreterToolCallOutputUnion(
  obj: RunStepCodeInterpreterToolCallOutputOutput,
): RunStepCodeInterpreterToolCallOutputUnion {
  switch (obj.type) {
    case "image":
      return deserializeRunStepCodeInterpreterImageOutput(
        obj as RunStepCodeInterpreterImageOutput,
      );
    default:
      return obj;
  }
}

/** deserialize function for VectorStoreStaticChunkingStrategyResponse */
function deserializeVectorStoreStaticChunkingStrategyResponse(
  obj: VectorStoreStaticChunkingStrategyResponseOutput,
): VectorStoreStaticChunkingStrategyResponse {
  return {
    type: obj["type"],
    static: {
      maxChunkSizeTokens: obj.static["max_chunk_size_tokens"],
      chunkOverlapTokens: obj.static["chunk_overlap_tokens"],
    },
  };
}

/** deserialize function for VectorStoreChunkingStrategyResponseOutput */
export function deserializeVectorStoreChunkingStrategyResponseUnion(
  obj: VectorStoreChunkingStrategyResponseOutput,
): VectorStoreChunkingStrategyResponseUnion {
  switch (obj.type) {
    case "static":
      return deserializeVectorStoreStaticChunkingStrategyResponse(
        obj as VectorStoreStaticChunkingStrategyResponse,
      );
    default:
      return obj;
  }
}
