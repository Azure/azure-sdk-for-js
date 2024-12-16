// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AgentDeletionStatusOutput as WireAgentDeletionStatusOutput,
  AgentOutput as WireAgentOutput,
  AgentsApiResponseFormatOptionOutput as WireAgentsApiResponseFormatOptionOutput,
  AgentsApiResponseFormatOutput as WireAgentsApiResponseFormatOutput,
  AgentThreadOutput as WireAgentThreadOutput,
  AzureAISearchResourceOutput as WireAzureAISearchResourceOutput,
  AzureAISearchToolDefinitionOutput as WireAzureAISearchToolDefinitionOutput,
  BingGroundingToolDefinitionOutput as WireBingGroundingToolDefinitionOutput,
  CodeInterpreterToolDefinitionOutput as WireCodeInterpreterToolDefinitionOutput,
  CodeInterpreterToolResourceOutput as WireCodeInterpreterToolResourceOutput,
  FileSearchRankingOptionsOutput as WireFileSearchRankingOptionsOutput,
  FileSearchToolDefinitionDetailsOutput as WireFileSearchToolDefinitionDetailsOutput,
  FileSearchToolDefinitionOutput as WireFileSearchToolDefinitionOutput,
  FileSearchToolResourceOutput as WireFileSearchToolResourceOutput,
  FunctionDefinitionOutput as WireFunctionDefinitionOutput,
  FunctionToolDefinitionOutput as WireFunctionToolDefinitionOutput,
  IncompleteRunDetailsOutput as WireIncompleteRunDetailsOutput,
  IndexResourceOutput as WireIndexResourceOutput,
  MessageAttachmentOutput as WireMessageAttachmentOutput,
  MessageAttachmentToolDefinitionOutput as WireMessageAttachmentToolDefinitionOutput,
  MessageContentOutput as WireMessageContentOutput,
  MessageImageFileContentOutput as WireMessageImageFileContentOutput,
  MessageImageFileDetailsOutput as WireMessageImageFileDetailsOutput,
  MessageIncompleteDetailsOutput as WireMessageIncompleteDetailsOutput,
  MessageTextAnnotationOutputParent as WireMessageTextAnnotationOutputParent,
  MessageTextContentOutput as WireMessageTextContentOutput,
  MessageTextDetailsOutput as WireMessageTextDetailsOutput,
  MessageTextFileCitationAnnotationOutput as WireMessageTextFileCitationAnnotationOutput,
  MessageTextFileCitationDetailsOutput as WireMessageTextFileCitationDetailsOutput,
  MessageTextFilePathAnnotationOutput as WireMessageTextFilePathAnnotationOutput,
  MessageTextFilePathDetailsOutput as WireMessageTextFilePathDetailsOutput,
  MicrosoftFabricToolDefinitionOutput as WireMicrosoftFabricToolDefinitionOutput,
  OpenAIPageableListOfAgentOutput as WireOpenAIPageableListOfAgentOutput,
  RequiredActionOutput as WireRequiredActionOutput,
  RequiredFunctionToolCallDetailsOutput as WireRequiredFunctionToolCallDetailsOutput,
  RequiredFunctionToolCallOutput as WireRequiredFunctionToolCallOutput,
  RequiredToolCallOutput as WireRequiredToolCallOutput,
  RunCompletionUsageOutput as WireRunCompletionUsageOutput,
  RunErrorOutput as WireRunErrorOutput,
  SharepointToolDefinitionOutput as WireSharepointToolDefinitionOutput,
  SubmitToolOutputsActionOutput as WireSubmitToolOutputsActionOutput,
  SubmitToolOutputsDetailsOutput as WireSubmitToolOutputsDetailsOutput,
  ThreadDeletionStatusOutput as WireThreadDeletionStatusOutput,
  ThreadMessageOutput as WireThreadMessageOutput,
  ThreadRunOutput as WireThreadRunOutput,
  ToolConnectionListOutput as WireToolConnectionListOutput,
  ToolConnectionOutput as WireToolConnectionOutput,
  ToolDefinitionOutput as WireToolDefinitionOutput,
  ToolDefinitionOutputParent as WireToolDefinitionOutputParent,
  ToolResourcesOutput as WireToolResourcesOutput,
  TruncationObjectOutput as WireTruncationObjectOutput,
  VectorStoreConfigurationOutput as WireVectorStoreConfigurationOutput,
  VectorStoreConfigurationsOutput as WireVectorStoreConfigurationsOutput,
  VectorStoreDataSourceOutput as WireVectorStoreDataSourceOutput
} from "../generated/src/outputModels.js";

import type {
  AgentDeletionStatusOutput,
  AgentOutput,
  AgentsApiResponseFormatOptionOutput,
  AgentsApiResponseFormatOutput,
  AgentThreadOutput,
  AzureAISearchResourceOutput,
  AzureAISearchToolDefinitionOutput,
  BingGroundingToolDefinitionOutput,
  CodeInterpreterToolDefinitionOutput,
  CodeInterpreterToolResourceOutput,
  FileSearchRankingOptionsOutput,
  FileSearchToolDefinitionDetailsOutput,
  FileSearchToolDefinitionOutput,
  FileSearchToolResourceOutput,
  FunctionDefinitionOutput,
  FunctionToolDefinitionOutput,
  IncompleteRunDetailsOutput,
  IndexResourceOutput,
  MessageAttachmentOutput,
  MessageAttachmentToolDefinitionOutput,
  MessageContentOutput,
  MessageImageFileContentOutput,
  MessageImageFileDetailsOutput,
  MessageIncompleteDetailsOutput,
  MessageTextAnnotationOutput,
  MessageTextContentOutput,
  MessageTextDetailsOutput,
  MessageTextFileCitationAnnotationOutput,
  MessageTextFileCitationDetailsOutput,
  MessageTextFilePathAnnotationOutput,
  MessageTextFilePathDetailsOutput,
  MicrosoftFabricToolDefinitionOutput,
  OpenAIPageableListOfAgentOutput,
  RequiredActionOutput,
  RequiredFunctionToolCallDetailsOutput,
  RequiredFunctionToolCallOutput,
  RequiredToolCallOutput,
  RunCompletionUsageOutput,
  RunErrorOutput,
  SharepointToolDefinitionOutput,
  SubmitToolOutputsActionOutput,
  SubmitToolOutputsDetailsOutput,
  ThreadDeletionStatusOutput,
  ThreadMessageOutput,
  ThreadRunOutput,
  ToolConnectionListOutput,
  ToolConnectionOutput,
  ToolDefinitionOutput,
  ToolDefinitionOutputParent,
  ToolResourcesOutput,
  TruncationObjectOutput,
  VectorStoreConfigurationOutput,
  VectorStoreConfigurationsOutput,
  VectorStoreDataSourceOutput
} from "./outputModels.js";

// Conversion functions
export function convertToolDefinitionOutputParent(
  input: WireToolDefinitionOutputParent
): ToolDefinitionOutputParent {
  return { ...input };
}

export function convertCodeInterpreterToolDefinitionOutput(
  input: WireCodeInterpreterToolDefinitionOutput
): CodeInterpreterToolDefinitionOutput {
  return { ...input };
}

export function convertFileSearchToolDefinitionOutput(
  input: WireFileSearchToolDefinitionOutput
): FileSearchToolDefinitionOutput {
  return {
    type: "file_search",
    fileSearch: input.file_search
      ? convertFileSearchToolDefinitionDetailsOutput(input.file_search)
      : undefined,
  };
}

export function convertFileSearchToolDefinitionDetailsOutput(
  input: WireFileSearchToolDefinitionDetailsOutput
): FileSearchToolDefinitionDetailsOutput {
  return {
    maxNumResults: input.max_num_results,
    rankingOptions: input.ranking_options
      ? convertFileSearchRankingOptionsOutput(input.ranking_options)
      : undefined,
  };
}

export function convertFileSearchRankingOptionsOutput(
  input: WireFileSearchRankingOptionsOutput
): FileSearchRankingOptionsOutput {
  return {
    ranker: input.ranker,
    scoreThreshold: input.score_threshold,
  };
}

export function convertFunctionToolDefinitionOutput(
  input: WireFunctionToolDefinitionOutput
): FunctionToolDefinitionOutput {
  return {
    type: "function",
    function: convertFunctionDefinitionOutput(input.function),
  };
}

export function convertFunctionDefinitionOutput(
  input: WireFunctionDefinitionOutput
): FunctionDefinitionOutput {
  return { ...input };
}

export function convertBingGroundingToolDefinitionOutput(
  input: WireBingGroundingToolDefinitionOutput
): BingGroundingToolDefinitionOutput {
  return {
    type: "bing_grounding",
    bingGrounding: convertToolConnectionListOutput(input.bing_grounding),
  };
}

export function convertToolConnectionListOutput(
  input: WireToolConnectionListOutput
): ToolConnectionListOutput {
  return {
    connections: input.connections?.map(convertToolConnectionOutput),
  };
}

export function convertToolConnectionOutput(
  input: WireToolConnectionOutput
): ToolConnectionOutput {
  return { connectionId: input.connection_id };
}

export function convertMicrosoftFabricToolDefinitionOutput(
  input: WireMicrosoftFabricToolDefinitionOutput
): MicrosoftFabricToolDefinitionOutput {
  return {
    type: "microsoft_fabric",
    microsoftFabric: convertToolConnectionListOutput(input.microsoft_fabric),
  };
}

export function convertSharepointToolDefinitionOutput(
  input: WireSharepointToolDefinitionOutput
): SharepointToolDefinitionOutput {
  return {
    type: "sharepoint_grounding",
    sharepointGrounding: convertToolConnectionListOutput(
      input.sharepoint_grounding
    ),
  };
}

export function convertAzureAISearchToolDefinitionOutput(
  input: WireAzureAISearchToolDefinitionOutput
): AzureAISearchToolDefinitionOutput {
  return { ...input };
}

export function convertToolResourcesOutput(
  input: WireToolResourcesOutput
): ToolResourcesOutput {
  return {
    codeInterpreter: input.code_interpreter
      ? convertCodeInterpreterToolResourceOutput(input.code_interpreter)
      : undefined,
    fileSearch: input.file_search
      ? convertFileSearchToolResourceOutput(input.file_search)
      : undefined,
    azureAISearch: input.azure_ai_search
      ? convertAzureAISearchResourceOutput(input.azure_ai_search)
      : undefined,
  };
}

export function convertCodeInterpreterToolResourceOutput(
  input: WireCodeInterpreterToolResourceOutput
): CodeInterpreterToolResourceOutput {
  return {
    fileIds: input.file_ids,
    dataSources: input.data_sources?.map(convertVectorStoreDataSourceOutput),
  };
}

export function convertVectorStoreDataSourceOutput(
  input: WireVectorStoreDataSourceOutput
): VectorStoreDataSourceOutput {
  return { ...input };
}

export function convertFileSearchToolResourceOutput(
  input: WireFileSearchToolResourceOutput
): FileSearchToolResourceOutput {
  return {
    vectorStoreIds: input.vector_store_ids,
    vectorStores: input.vector_stores?.map(convertVectorStoreConfigurationsOutput),
  };
}

export function convertVectorStoreConfigurationsOutput(
  input: WireVectorStoreConfigurationsOutput
): VectorStoreConfigurationsOutput {
  return {
    name: input.name,
    configuration: convertVectorStoreConfigurationOutput(input.configuration),
  };
}

export function convertVectorStoreConfigurationOutput(
  input: WireVectorStoreConfigurationOutput
): VectorStoreConfigurationOutput {
  return {
    ...input,
    dataSources: input.data_sources.map(convertVectorStoreDataSourceOutput),
  };
}

export function convertAzureAISearchResourceOutput(
  input: WireAzureAISearchResourceOutput
): AzureAISearchResourceOutput {
  return {
    indexes: input.indexes?.map(convertIndexResourceOutput),
  };
}

export function convertIndexResourceOutput(
  input: WireIndexResourceOutput
): IndexResourceOutput {
  return { indexConnectionId: input.index_connection_id, indexName: input.index_name };
}

export function convertAgentsApiResponseFormatOutput(
  input: WireAgentsApiResponseFormatOutput
): AgentsApiResponseFormatOutput {
  return { ...input };
}

export function convertAgentOutput(input: WireAgentOutput): AgentOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at * 1000),
    name: input.name,
    description: input.description,
    model: input.model,
    instructions: input.instructions,
    tools: input.tools.map(convertToolDefinitionOutput),
    toolResources: input.tool_resources
      ? convertToolResourcesOutput(input.tool_resources)
      : null,
    temperature: input.temperature,
    topP: input.top_p,
    responseFormat: input.response_format
      ? convertAgentsApiResponseFormatOptionOutput(input.response_format)
      : null,
    metadata: input.metadata,
  };
}
function convertToolDefinitionOutput(tool: WireToolDefinitionOutput): ToolDefinitionOutput {
  switch (tool.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinitionOutput(tool as WireCodeInterpreterToolDefinitionOutput);
    case "file_search":
      return convertFileSearchToolDefinitionOutput(tool as WireFileSearchToolDefinitionOutput);
    case "function":
      return convertFunctionToolDefinitionOutput(tool as WireFunctionToolDefinitionOutput);
    case "bing_grounding":
      return convertBingGroundingToolDefinitionOutput(tool as WireBingGroundingToolDefinitionOutput);
    case "microsoft_fabric":
      return convertMicrosoftFabricToolDefinitionOutput(tool as WireMicrosoftFabricToolDefinitionOutput);
    case "sharepoint_grounding":
      return convertSharepointToolDefinitionOutput(tool as WireSharepointToolDefinitionOutput);
    case "azure_ai_search":
      return convertAzureAISearchToolDefinitionOutput(tool as WireAzureAISearchToolDefinitionOutput);
    default:
      return tool;
  }
}

export function convertAgentsApiResponseFormatOptionOutput(
  input: WireAgentsApiResponseFormatOptionOutput
): AgentsApiResponseFormatOptionOutput {
  return input;
}

export function convertOpenAIPageableListOfAgentOutput(
  input: WireOpenAIPageableListOfAgentOutput
): OpenAIPageableListOfAgentOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data.map(convertAgentOutput),
  };
}

export function convertAgentDeletionStatusOutput(
  input: WireAgentDeletionStatusOutput
): AgentDeletionStatusOutput {
  return { ...input };
}

export function convertMessageAttachmentOutput(
  input: WireMessageAttachmentOutput
): MessageAttachmentOutput {
  return {
    fileId: input.file_id,
    dataSources: input.data_sources?.map(convertVectorStoreDataSourceOutput),
    tools: input.tools?.map(convertMessageAttachmentToolDefinitionOutput),
  };
}

function convertMessageAttachmentToolDefinitionOutput(input: WireMessageAttachmentToolDefinitionOutput): MessageAttachmentToolDefinitionOutput {
  switch (input.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinitionOutput(input as WireCodeInterpreterToolDefinitionOutput);
    case "file_search":
      return convertFileSearchToolDefinitionOutput(input as WireFileSearchToolDefinitionOutput);
    default:
      throw new Error(`Unknown tool type: ${input}`);
  };

}

export function convertAgentThreadOutput(
  input: WireAgentThreadOutput
): AgentThreadOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at * 1000),
    toolResources: input.tool_resources
      ? convertToolResourcesOutput(input.tool_resources)
      : null,
    metadata: input.metadata,
  };
}

export function convertThreadDeletionStatusOutput(
  input: WireThreadDeletionStatusOutput
): ThreadDeletionStatusOutput {
  return { ...input };
}

export function convertThreadMessageOutput(
  input: WireThreadMessageOutput
): ThreadMessageOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at * 1000),
    threadId: input.thread_id,
    status: input.status,
    incompleteDetails: input.incomplete_details
      ? convertMessageIncompleteDetailsOutput(input.incomplete_details)
      : null,
    completedAt: input.completed_at ? new Date(input.completed_at * 1000) : null,
    incompleteAt: input.incomplete_at ? new Date(input.incomplete_at * 1000) : null,
    role: input.role,
    content: input.content.map(convertMessageContentOutput),
    assistantId: input.assistant_id,
    runId: input.run_id,
    attachments: !input.attachments ? input.attachments : input.attachments?.map(convertMessageAttachmentOutput),
    metadata: input.metadata,
  };
}

export function convertMessageIncompleteDetailsOutput(
  input: WireMessageIncompleteDetailsOutput
): MessageIncompleteDetailsOutput {
  return { ...input };
}

export function convertMessageContentOutput(
  input: WireMessageContentOutput
): MessageContentOutput {
  switch (input.type) {
    case "text":
      return convertMessageTextContentOutput(input as WireMessageTextContentOutput);
    case "image_file":
      return convertMessageImageFileContentOutput(
        input as WireMessageImageFileContentOutput
      );
    default:
      return { ...input };
  }
}

export function convertMessageTextContentOutput(
  input: WireMessageTextContentOutput
): MessageTextContentOutput {
  return {
    type: input.type,
    text: convertMessageTextDetailsOutput(input.text),
  };
}

export function convertMessageTextDetailsOutput(
  input: WireMessageTextDetailsOutput
): MessageTextDetailsOutput {
  return {
    value: input.value,
    annotations: input.annotations?.map(convertMessageTextAnnotationOutput),
  };
}

export function convertMessageTextAnnotationOutput(
  input: WireMessageTextAnnotationOutputParent
): MessageTextAnnotationOutput {
  switch (input.type) {
    case "file_citation":
      return convertMessageTextFileCitationAnnotationOutput(
        input as WireMessageTextFileCitationAnnotationOutput
      );
    case "file_path":
      return convertMessageTextFilePathAnnotationOutput(
        input as WireMessageTextFilePathAnnotationOutput
      );
    default:
      return { ...input };
  }
}

export function convertMessageTextFileCitationAnnotationOutput(
  input: WireMessageTextFileCitationAnnotationOutput
): MessageTextFileCitationAnnotationOutput {
  return {
    type: input.type,
    text: input.text,
    fileCitation: convertMessageTextFileCitationDetailsOutput(input.file_citation)
  };
}

export function convertMessageTextFileCitationDetailsOutput(
  input: WireMessageTextFileCitationDetailsOutput
): MessageTextFileCitationDetailsOutput {
  return {
    fileId: input.file_id,
    quote: input.quote
  };
}

export function convertMessageTextFilePathAnnotationOutput(
  input: WireMessageTextFilePathAnnotationOutput
): MessageTextFilePathAnnotationOutput {
  return {
    type: input.type,
    filePath: convertMessageTextFilePathDetailsOutput(input.file_path),
    startIndex: input.start_index,
    endIndex: input.end_index,
    text: input.text,
  };
}

export function convertMessageTextFilePathDetailsOutput(
  input: WireMessageTextFilePathDetailsOutput
): MessageTextFilePathDetailsOutput {
  return { fileId: input.file_id };
}

export function convertMessageImageFileContentOutput(
  input: WireMessageImageFileContentOutput
): MessageImageFileContentOutput {
  return {
    type: input.type,
    imageFile: convertMessageImageFileDetailsOutput(input.image_file)
  };
}

export function convertMessageImageFileDetailsOutput(
  input: WireMessageImageFileDetailsOutput
): MessageImageFileDetailsOutput {
  return { fileId: input.file_id };
}

export function convertThreadRunOutput(
  input: WireThreadRunOutput
): ThreadRunOutput {
  return {
    id: input.id,
    object: input.object,
    threadId: input.thread_id,
    assistantId: input.assistant_id,
    status: input.status,
    requiredAction: input.required_action ? convertRequiredActionOutput(input.required_action) : undefined,
    lastError: input.last_error,
    model: input.model,
    instructions: input.instructions,
    tools: input.tools.map(convertToolDefinitionOutput),
    createdAt: new Date(input.created_at * 1000),
    expiresAt: input.expires_at ? new Date(input.expires_at) : null,
    startedAt: input.started_at ? new Date(input.started_at) : null,
    completedAt: input.completed_at ? new Date(input.completed_at) : null,
    cancelledAt: input.cancelled_at ? new Date(input.cancelled_at) : null,
    failedAt: input.failed_at ? new Date(input.failed_at) : null,
    incompleteDetails: input.incomplete_details,
    usage: input.usage ? convertRunCompletionUsageOutput(input.usage) : null,
    temperature: input.temperature,
    topP: input.top_p,
    maxPromptTokens: input.max_prompt_tokens,
    maxCompletionTokens: input.max_completion_tokens,
    truncationStrategy: input.truncation_strategy ? convertTruncationObjectOutput(input.truncation_strategy) : null,
    toolChoice: input.tool_choice,
    responseFormat: input.response_format,
    metadata: input.metadata,
    toolResources: input.tool_resources ? convertToolResourcesOutput(input.tool_resources) : null,
    parallelToolCalls: input.parallelToolCalls,
  };
}

export function convertIncompleteRunDetailsOutput(
  input: WireIncompleteRunDetailsOutput
): IncompleteRunDetailsOutput {
  return input;
}

export function convertRunErrorOutput(
  input: WireRunErrorOutput
): RunErrorOutput {
  return { ...input };
}

export function convertRunCompletionUsageOutput(
  input: WireRunCompletionUsageOutput
): RunCompletionUsageOutput {
  return {
    completionTokens: input.completion_tokens,
    promptTokens: input.prompt_tokens,
    totalTokens: input.total_tokens,
  };
}

export function convertRequiredActionOutput(
  input: WireRequiredActionOutput
): RequiredActionOutput {
  switch (input.type) {
    case "submit_tool_outputs":
      return convertSubmitToolOutputsActionOutput(
        input as WireSubmitToolOutputsActionOutput
      );
    default:
      return { ...input };
  }
}

export function convertSubmitToolOutputsActionOutput(
  input: WireSubmitToolOutputsActionOutput
): SubmitToolOutputsActionOutput {
  return {
    type: input.type,
    submitToolOutputs: convertSubmitToolOutputsDetailsOutput(input.submit_tool_outputs),
  };
}

export function convertSubmitToolOutputsDetailsOutput(
  input: WireSubmitToolOutputsDetailsOutput
): SubmitToolOutputsDetailsOutput {
  return {
    toolCalls: input.tool_calls.map(
      convertRequiredToolCallOutput
    ),
  };
}

export function convertRequiredToolCallOutput(
  input: WireRequiredToolCallOutput
): RequiredToolCallOutput {
  switch (input.type) {
    case "function":
      return convertRequiredFunctionToolCallOutput(
        input as WireRequiredFunctionToolCallOutput
      );
    default:
      return { ...input };
  }
}

export function convertRequiredFunctionToolCallOutput(
  input: WireRequiredFunctionToolCallOutput
): RequiredFunctionToolCallOutput {
  return {
    id: input.id,
    type: input.type,
    function: convertRequiredFunctionToolCallDetailsOutput(input.function)
  };
}

export function convertRequiredFunctionToolCallDetailsOutput(
  input: WireRequiredFunctionToolCallDetailsOutput
): RequiredFunctionToolCallDetailsOutput {
  return {
    name: input.name,
    arguments: input.arguments,
  };
}

function convertTruncationObjectOutput(input: WireTruncationObjectOutput): TruncationObjectOutput {
  return {
    type: input.type,
    lastMessages: input.last_messages
  };

}
