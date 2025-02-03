// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as PublicModels from "./models.js";
import type * as GeneratedModels from "../generated/src/models.js";

// Conversion functions
export function convertCreateAgentOptions(
  source: PublicModels.CreateAgentOptions,
): GeneratedModels.CreateAgentOptions {
  return {
    model: source.model,
    ...(source.name && { name: source.name }),
    ...(source.description && { description: source.description }),
    ...(source.instructions && { instructions: source.instructions }),
    ...(source.tools && { tools: source.tools.map(convertToolDefinition) }),
    ...(source.toolResources && { tool_resources: convertToolResources(source.toolResources) }),
    ...(source.temperature !== undefined && { temperature: source.temperature }),
    ...(source.topP !== undefined && { top_p: source.topP }),
    ...(source.responseFormat && { response_format: source.responseFormat }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

function convertToolResources(source: PublicModels.ToolResources): GeneratedModels.ToolResources {
  return {
    ...(source.codeInterpreter && {
      code_interpreter: convertCodeInterpreterToolResource(source.codeInterpreter),
    }),
    ...(source.fileSearch && { file_search: convertFileSearchToolResource(source.fileSearch) }),
    ...(source.azureAISearch && {
      azure_ai_search: convertAzureAISearchResource(source.azureAISearch),
    }),
  };
}

function convertMessageAttachmentToolDefinition(
  source: PublicModels.MessageAttachmentToolDefinition,
): GeneratedModels.MessageAttachmentToolDefinition {
  switch (source.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinition(
        source as PublicModels.CodeInterpreterToolDefinition,
      );
    case "file_search":
      return convertFileSearchToolDefinition(source as PublicModels.FileSearchToolDefinition);
    default:
      throw new Error(`Unknown tool type: ${source}`);
  }
}

function convertToolDefinition(
  source: PublicModels.ToolDefinition,
): GeneratedModels.ToolDefinition {
  switch (source.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinition(
        source as PublicModels.CodeInterpreterToolDefinition,
      );
    case "file_search":
      return convertFileSearchToolDefinition(source as PublicModels.FileSearchToolDefinition);
    case "function":
      return convertFunctionToolDefinition(source as PublicModels.FunctionToolDefinition);
    case "bing_grounding":
      return convertBingGroundingToolDefinition(source as PublicModels.BingGroundingToolDefinition);
    case "microsoft_fabric":
      return convertMicrosoftFabricToolDefinition(
        source as PublicModels.MicrosoftFabricToolDefinition,
      );
    case "sharepoint_grounding":
      return convertSharepointToolDefinition(source as PublicModels.SharepointToolDefinition);
    case "azure_ai_search":
      return convertAzureAISearchToolDefinition(source as PublicModels.AzureAISearchToolDefinition);
    default:
      throw new Error(`Unknown tool type: ${source.type}`);
  }
}

function convertCodeInterpreterToolDefinition(
  source: PublicModels.CodeInterpreterToolDefinition,
): GeneratedModels.CodeInterpreterToolDefinition {
  return {
    type: source.type,
  };
}

function convertFileSearchToolDefinition(
  source: PublicModels.FileSearchToolDefinition,
): GeneratedModels.FileSearchToolDefinition {
  return {
    type: source.type,
    ...(source.fileSearch && {
      file_search: convertFileSearchToolDefinitionDetails(source.fileSearch),
    }),
  };
}

function convertFunctionToolDefinition(
  source: PublicModels.FunctionToolDefinition,
): GeneratedModels.FunctionToolDefinition {
  return {
    type: source.type,
    function: convertFunctionDefinition(source.function),
  };
}

function convertBingGroundingToolDefinition(
  source: PublicModels.BingGroundingToolDefinition,
): GeneratedModels.BingGroundingToolDefinition {
  return {
    type: source.type,
    bing_grounding: convertToolConnectionList(source.bingGrounding),
  };
}

function convertMicrosoftFabricToolDefinition(
  source: PublicModels.MicrosoftFabricToolDefinition,
): GeneratedModels.MicrosoftFabricToolDefinition {
  return {
    type: source.type,
    microsoft_fabric: convertToolConnectionList(source.microsoftFabric),
  };
}

function convertSharepointToolDefinition(
  source: PublicModels.SharepointToolDefinition,
): GeneratedModels.SharepointToolDefinition {
  return {
    type: source.type,
    sharepoint_grounding: convertToolConnectionList(source.sharepointGrounding),
  };
}

function convertAzureAISearchToolDefinition(
  source: PublicModels.AzureAISearchToolDefinition,
): GeneratedModels.AzureAISearchToolDefinition {
  return {
    type: source.type,
  };
}

function convertFileSearchToolDefinitionDetails(
  source: PublicModels.FileSearchToolDefinitionDetails,
): GeneratedModels.FileSearchToolDefinitionDetails {
  return {
    ...(source.maxNumResults && { max_num_results: source.maxNumResults }),
    ...(source.rankingOptions && {
      ranking_options: convertFileSearchRankingOptions(source.rankingOptions),
    }),
  };
}

function convertFileSearchRankingOptions(
  source: PublicModels.FileSearchRankingOptions,
): GeneratedModels.FileSearchRankingOptions {
  return {
    ranker: source.ranker,
    score_threshold: source.scoreThreshold,
  };
}

function convertCodeInterpreterToolResource(
  source: PublicModels.CodeInterpreterToolResource,
): GeneratedModels.CodeInterpreterToolResource {
  return {
    file_ids: source.fileIds,
    ...(source.dataSources && {
      data_sources: source.dataSources.map(convertVectorStoreDataSource),
    }),
  };
}

export function convertVectorStoreDataSource(
  source: PublicModels.VectorStoreDataSource,
): GeneratedModels.VectorStoreDataSource {
  return {
    uri: source.uri,
    type: source.type,
  };
}

function convertFileSearchToolResource(
  source: PublicModels.FileSearchToolResource,
): GeneratedModels.FileSearchToolResource {
  return {
    ...(source.vectorStoreIds && { vector_store_ids: source.vectorStoreIds }),
    ...(source.vectorStores && {
      vector_stores: source.vectorStores.map(convertVectorStoreConfigurations),
    }),
  };
}

function convertVectorStoreConfigurations(
  source: PublicModels.VectorStoreConfigurations,
): GeneratedModels.VectorStoreConfigurations {
  return {
    name: source.name,
    configuration: convertVectorStoreConfiguration(source.configuration),
  };
}

function convertVectorStoreConfiguration(
  source: PublicModels.VectorStoreConfiguration,
): GeneratedModels.VectorStoreConfiguration {
  return {
    data_sources: source.dataSources.map(convertVectorStoreDataSource),
  };
}

function convertAzureAISearchResource(
  source: PublicModels.AzureAISearchResource,
): GeneratedModels.AzureAISearchResource {
  return {
    ...(source.indexes && { indexes: source.indexes.map(convertIndexResource) }),
  };
}

function convertIndexResource(source: PublicModels.IndexResource): GeneratedModels.IndexResource {
  return {
    index_connection_id: source.indexConnectionId,
    index_name: source.indexName,
  };
}

export function convertUpdateAgentOptions(
  source: PublicModels.UpdateAgentOptions,
): GeneratedModels.UpdateAgentOptions {
  return {
    ...(source.model && { model: source.model }),
    ...(source.name && { name: source.name }),
    ...(source.description && { description: source.description }),
    ...(source.instructions && { instructions: source.instructions }),
    ...(source.tools && { tools: source.tools.map(convertToolDefinition) }),
    ...(source.toolResources && { tool_resources: convertToolResources(source.toolResources) }),
    ...(source.temperature !== undefined && { temperature: source.temperature }),
    ...(source.topP !== undefined && { top_p: source.topP }),
    ...(source.responseFormat && { response_format: source.responseFormat }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertAgentThreadCreationOptions(
  source: PublicModels.AgentThreadCreationOptions,
): GeneratedModels.AgentThreadCreationOptions {
  return {
    ...(source.messages && { messages: source.messages.map(convertThreadMessageOptions) }),
    ...(source.toolResources && { tool_resources: convertToolResources(source.toolResources) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertAgentThreadUpdateOptions(
  source: PublicModels.UpdateAgentThreadOptions,
): GeneratedModels.UpdateAgentThreadOptions {
  return {
    ...(source.toolResources && { tool_resources: convertToolResources(source.toolResources) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

function convertThreadMessageOptions(
  source: PublicModels.ThreadMessageOptions,
): GeneratedModels.ThreadMessageOptions {
  return {
    role: source.role,
    content: source.content,
    ...(source.attachments && { attachments: source.attachments.map(convertMessageAttachment) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

function convertMessageAttachment(
  source: PublicModels.MessageAttachment,
): GeneratedModels.MessageAttachment {
  return {
    file_id: source.fileId,
    ...(source.dataSources && {
      data_sources: source.dataSources.map(convertVectorStoreDataSource),
    }),
    ...(source.tools && { tools: source.tools.map(convertMessageAttachmentToolDefinition) }),
  };
}

export function convertCreateRunOptions(
  source: PublicModels.CreateRunOptions,
): GeneratedModels.CreateRunOptions {
  return {
    assistant_id: source.assistantId,
    ...(source.model && { model: source.model }),
    ...(source.instructions && { instructions: source.instructions }),
    ...(source.additionalInstructions && {
      additional_instructions: source.additionalInstructions,
    }),
    ...(source.additionalMessages && {
      additional_messages: source.additionalMessages.map(convertThreadMessage),
    }),
    ...(source.tools && { tools: source.tools.map(convertToolDefinition) }),
    ...(source.stream !== undefined && { stream: source.stream }),
    ...(source.temperature !== undefined && { temperature: source.temperature }),
    ...(source.topP !== undefined && { top_p: source.topP }),
    ...(source.maxPromptTokens !== undefined && { max_prompt_tokens: source.maxPromptTokens }),
    ...(source.maxCompletionTokens !== undefined && {
      max_completion_tokens: source.maxCompletionTokens,
    }),
    ...(source.truncationStrategy && {
      truncation_strategy: convertTruncationObject(source.truncationStrategy),
    }),
    ...(source.toolChoice && { tool_choice: source.toolChoice }),
    ...(source.responseFormat && { response_format: source.responseFormat }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

function convertTruncationObject(
  source: PublicModels.TruncationObject,
): GeneratedModels.TruncationObject {
  return {
    type: source.type,
    ...(source.lastMessages !== undefined && { last_messages: source.lastMessages }),
  };
}

function convertUpdateToolResourcesOptions(
  source: PublicModels.UpdateToolResourcesOptions,
): GeneratedModels.UpdateToolResourcesOptions {
  return {
    ...(source.codeInterpreter && {
      code_interpreter: convertUpdateCodeInterpreterToolResourceOptions(source.codeInterpreter),
    }),
    ...(source.fileSearch && {
      file_search: convertUpdateFileSearchToolResourceOptions(source.fileSearch),
    }),
    ...(source.azureAISearch && {
      azure_ai_search: convertAzureAISearchResource(source.azureAISearch),
    }),
  };
}

function convertUpdateCodeInterpreterToolResourceOptions(
  source: PublicModels.UpdateCodeInterpreterToolResourceOptions,
): GeneratedModels.UpdateCodeInterpreterToolResourceOptions {
  return {
    ...(source.fileIds && { file_ids: source.fileIds }),
  };
}

function convertUpdateFileSearchToolResourceOptions(
  source: PublicModels.UpdateFileSearchToolResourceOptions,
): GeneratedModels.UpdateFileSearchToolResourceOptions {
  return {
    ...(source.vectorStoreIds && { vector_store_ids: source.vectorStoreIds }),
  };
}

export function convertToolOutput(source: PublicModels.ToolOutput): GeneratedModels.ToolOutput {
  return {
    ...(source.toolCallId !== undefined && { tool_call_id: source.toolCallId }),
    ...(source.output !== undefined && { output: source.output }),
  };
}

export function convertCreateAndRunThreadOptions(
  source: PublicModels.CreateAndRunThreadOptions,
): GeneratedModels.CreateAndRunThreadOptions {
  return {
    assistant_id: source.assistantId,
    ...(source.thread && { thread: convertAgentThreadCreationOptions(source.thread) }),
    ...(source.model && { model: source.model }),
    ...(source.instructions && { instructions: source.instructions }),
    ...(source.tools && { tools: source.tools.map(convertToolDefinition) }),
    ...(source.toolResources && {
      tool_resources: convertUpdateToolResourcesOptions(source.toolResources),
    }),
    ...(source.stream !== undefined && { stream: source.stream }),
    ...(source.temperature !== undefined && { temperature: source.temperature }),
    ...(source.topP !== undefined && { top_p: source.topP }),
    ...(source.maxPromptTokens !== undefined && { max_prompt_tokens: source.maxPromptTokens }),
    ...(source.maxCompletionTokens !== undefined && {
      max_completion_tokens: source.maxCompletionTokens,
    }),
    ...(source.truncationStrategy && {
      truncation_strategy: convertTruncationObject(source.truncationStrategy),
    }),
    ...(source.toolChoice && { tool_choice: source.toolChoice }),
    ...(source.responseFormat && { response_format: source.responseFormat }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

function convertVectorStoreExpirationPolicy(
  source: PublicModels.VectorStoreExpirationPolicy,
): GeneratedModels.VectorStoreExpirationPolicy {
  return {
    anchor: source.anchor,
    days: source.days,
  };
}

export function convertVectorStoreOptions(
  source: PublicModels.VectorStoreOptions,
): GeneratedModels.VectorStoreOptions {
  return {
    ...(source.fileIds && { file_ids: source.fileIds }),
    ...(source.name && { name: source.name }),
    ...(source.configuration && {
      configuration: convertVectorStoreConfiguration(source.configuration),
    }),
    ...(source.expiresAfter && {
      expires_after: convertVectorStoreExpirationPolicy(source.expiresAfter),
    }),
    ...(source.chunkingStrategy && {
      chunking_strategy: convertVectorStoreChunkingStrategyRequest(source.chunkingStrategy),
    }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertVectorStoreChunkingStrategyRequest(
  source: PublicModels.VectorStoreChunkingStrategyRequest,
): GeneratedModels.VectorStoreChunkingStrategyRequest {
  switch (source.type) {
    case "auto":
      return source as GeneratedModels.VectorStoreAutoChunkingStrategyRequest;
    case "static":
      return convertVectorStoreStaticChunkingStrategyRequest(
        source as PublicModels.VectorStoreStaticChunkingStrategyRequest,
      );
    default:
      throw new Error(`Unknown chunking strategy type: ${source.type}`);
  }
}

function convertVectorStoreStaticChunkingStrategyRequest(
  source: PublicModels.VectorStoreStaticChunkingStrategyRequest,
): GeneratedModels.VectorStoreStaticChunkingStrategyRequest {
  return {
    ...source,
    static: convertVectorStoreStaticChunkingStrategyOptions(source.static),
  };
}

function convertVectorStoreStaticChunkingStrategyOptions(
  source: PublicModels.VectorStoreStaticChunkingStrategyOptions,
): GeneratedModels.VectorStoreStaticChunkingStrategyOptions {
  return {
    max_chunk_size_tokens: source.maxChunkSizeTokens,
    chunk_overlap_tokens: source.chunkOverlapTokens,
  };
}

export function convertVectorStoreUpdateOptions(
  source: PublicModels.VectorStoreUpdateOptions,
): GeneratedModels.VectorStoreUpdateOptions {
  return {
    ...(source.name && { name: source.name }),
    ...(source.expiresAfter && {
      expires_after: convertVectorStoreExpirationPolicy(source.expiresAfter),
    }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

function convertFunctionDefinition(
  source: PublicModels.FunctionDefinition,
): GeneratedModels.FunctionDefinition {
  return {
    name: source.name,
    ...(source.description && { description: source.description }),
    parameters: source.parameters,
  };
}

function convertToolConnectionList(
  source: PublicModels.ToolConnectionList,
): GeneratedModels.ToolConnectionList {
  return {
    ...(source.connections && { connections: source.connections.map(convertToolConnection) }),
  };
}

function convertToolConnection(
  source: PublicModels.ToolConnection,
): GeneratedModels.ToolConnection {
  return {
    connection_id: source.connectionId,
  };
}

function convertThreadMessage(source: PublicModels.ThreadMessage): GeneratedModels.ThreadMessage {
  return {
    id: source.id,
    object: source.object,
    created_at: source.createdAt,
    thread_id: source.threadId,
    status: source.status,
    incomplete_details: !source.incompleteDetails
      ? source.incompleteDetails
      : convertMessageIncompleteDetails(source.incompleteDetails),
    completed_at: source.completedAt,
    incomplete_at: source.incompleteAt,
    role: source.role,
    content: source.content.map(convertMessageContent),
    assistant_id: source.assistantId,
    run_id: source.runId,
    attachments: !source.attachments
      ? source.attachments
      : source.attachments?.map(convertMessageAttachment),
    metadata: source.metadata,
  };
}

function convertMessageIncompleteDetails(
  source: PublicModels.MessageIncompleteDetails,
): GeneratedModels.MessageIncompleteDetails {
  return {
    reason: source.reason,
  };
}

function convertMessageContent(
  source: PublicModels.MessageContent,
): GeneratedModels.MessageContent {
  switch (source.type) {
    case "text":
      return convertMessageTextContent(source as PublicModels.MessageTextContent);
    case "image_file":
      return convertMessageImageFileContent(source as PublicModels.MessageImageFileContent);
    default:
      throw new Error(`Unknown message content type: ${source.type}`);
  }
}

function convertMessageTextContent(
  source: PublicModels.MessageTextContent,
): GeneratedModels.MessageTextContent {
  return {
    type: "text",
    text: convertMessageTextDetails(source.text),
  };
}

function convertMessageTextDetails(
  source: PublicModels.MessageTextDetails,
): GeneratedModels.MessageTextDetails {
  return {
    value: source.value,
    annotations: source.annotations.map(convertMessageTextAnnotation),
  };
}

function convertMessageTextAnnotation(
  source: PublicModels.MessageTextAnnotation,
): GeneratedModels.MessageTextAnnotation {
  switch (source.type) {
    case "file_citation":
      return convertMessageTextFileCitationAnnotation(
        source as PublicModels.MessageTextFileCitationAnnotation,
      );
    case "file_path":
      return convertMessageTextFilePathAnnotation(
        source as PublicModels.MessageTextFilePathAnnotation,
      );
    default:
      throw new Error(`Unknown message text annotation type: ${source.type}`);
  }
}

function convertMessageTextFileCitationAnnotation(
  source: PublicModels.MessageTextFileCitationAnnotation,
): GeneratedModels.MessageTextFileCitationAnnotation {
  return {
    text: source.text,
    type: "file_citation",
    file_citation: convertMessageTextFileCitationDetails(source.fileCitation),
    ...(source.startIndex && { start_index: source.startIndex }),
    ...(source.endIndex && { end_index: source.endIndex }),
  };
}

function convertMessageTextFileCitationDetails(
  source: PublicModels.MessageTextFileCitationDetails,
): GeneratedModels.MessageTextFileCitationDetails {
  return {
    file_id: source.fileId,
    quote: source.quote,
  };
}

function convertMessageTextFilePathAnnotation(
  source: PublicModels.MessageTextFilePathAnnotation,
): GeneratedModels.MessageTextFilePathAnnotation {
  return {
    text: source.text,
    type: "file_path",
    file_path: convertMessageTextFilePathDetails(source.filePath),
    ...(source.startIndex && { start_index: source.startIndex }),
    ...(source.endIndex && { end_index: source.endIndex }),
  };
}

function convertMessageTextFilePathDetails(
  source: PublicModels.MessageTextFilePathDetails,
): GeneratedModels.MessageTextFilePathDetails {
  return {
    file_id: source.fileId,
  };
}

function convertMessageImageFileContent(
  source: PublicModels.MessageImageFileContent,
): GeneratedModels.MessageImageFileContent {
  return {
    type: "image_file",
    image_file: convertMessageImageFileDetails(source.imageFile),
  };
}

function convertMessageImageFileDetails(
  source: PublicModels.MessageImageFileDetails,
): GeneratedModels.MessageImageFileDetails {
  return {
    file_id: source.fileId,
  };
}
