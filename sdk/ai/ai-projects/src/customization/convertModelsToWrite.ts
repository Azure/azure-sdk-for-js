// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateAgentOptions as SourceCreateAgentOptions,
  ToolResources as SourceToolResources,
  ToolDefinition as SourceToolDefinition,
  FileSearchToolDefinitionDetails as SourceFileSearchToolDefinitionDetails,
  FileSearchRankingOptions as SourceFileSearchRankingOptions,
  CodeInterpreterToolResource as SourceCodeInterpreterToolResource,
  VectorStoreDataSource as SourceVectorStoreDataSource,
  FileSearchToolResource as SourceFileSearchToolResource,
  VectorStoreConfigurations as SourceVectorStoreConfigurations,
  VectorStoreConfiguration as SourceVectorStoreConfiguration,
  AzureAISearchResource as SourceAzureAISearchResource,
  IndexResource as SourceIndexResource,
  AgentsApiResponseFormat as SourceAgentsApiResponseFormat,
  UpdateAgentOptions as SourceUpdateAgentOptions,
  AgentThreadCreationOptions as SourceAgentThreadCreationOptions,
  ThreadMessageOptions as SourceThreadMessageOptions,
  MessageAttachment as SourceMessageAttachment,
  CreateRunOptions as SourceCreateRunOptions,
  TruncationObject as SourceTruncationObject,
  AgentsNamedToolChoice as SourceAgentsNamedToolChoice,
  FunctionName as SourceFunctionName,
  UpdateToolResourcesOptions as SourceUpdateToolResourcesOptions,
  UpdateCodeInterpreterToolResourceOptions as SourceUpdateCodeInterpreterToolResourceOptions,
  UpdateFileSearchToolResourceOptions as SourceUpdateFileSearchToolResourceOptions,
  ToolOutput as SourceToolOutput,
  CreateAndRunThreadOptions as SourceCreateAndRunThreadOptions,
  VectorStoreExpirationPolicy as SourceVectorStoreExpirationPolicy,
  VectorStoreOptions as SourceVectorStoreOptions,
  VectorStoreChunkingStrategyRequest as SourceVectorStoreChunkingStrategyRequest,
  VectorStoreStaticChunkingStrategyOptions as SourceVectorStoreStaticChunkingStrategyOptions,
  VectorStoreUpdateOptions as SourceVectorStoreUpdateOptions,
  FunctionDefinition as SourceFunctionDefinition,
  ToolConnectionList as SourceToolConnectionList,
  ToolConnection as SourceToolConnection,
  CodeInterpreterToolDefinition as SourceCodeInterpreterToolDefinition,
  FileSearchToolDefinition as SourceFileSearchToolDefinition,
  FunctionToolDefinition as SourceFunctionToolDefinition,
  BingGroundingToolDefinition as SourceBingGroundingToolDefinition,
  MicrosoftFabricToolDefinition as SourceMicrosoftFabricToolDefinition,
  SharepointToolDefinition as SourceSharepointToolDefinition,
  AzureAISearchToolDefinition as SourceAzureAISearchToolDefinition,
  ThreadMessage as SourceThreadMessage,
  MessageIncompleteDetails as SourceMessageIncompleteDetails,
  MessageContent as SourceMessageContent,
  MessageTextContent as SourceMessageTextContent,
  MessageImageFileContent as SourceMessageImageFileContent,
  MessageTextDetails as SourceMessageTextDetails,
  MessageTextAnnotation as SourceMessageTextAnnotation,
  MessageTextFileCitationAnnotation as SourceMessageTextFileCitationAnnotation,
  MessageTextFileCitationDetails as SourceMessageTextFileCitationDetails,
  MessageTextFilePathAnnotation as SourceMessageTextFilePathAnnotation,
  MessageTextFilePathDetails as SourceMessageTextFilePathDetails,
  MessageImageFileDetails as SourceMessageImageFileDetails,
  MessageAttachmentToolDefinition as SourceMessageAttachmentToolDefinition,
  VectorStoreStaticChunkingStrategyRequest as SourceVectorStoreStaticChunkingStrategyRequest,
} from "./models.js";

import type {
  CreateAgentOptions as DestinationCreateAgentOptions,
  ToolResources as DestinationToolResources,
  ToolDefinition as DestinationToolDefinition,
  FileSearchToolDefinitionDetails as DestinationFileSearchToolDefinitionDetails,
  FileSearchRankingOptions as DestinationFileSearchRankingOptions,
  CodeInterpreterToolResource as DestinationCodeInterpreterToolResource,
  VectorStoreDataSource as DestinationVectorStoreDataSource,
  FileSearchToolResource as DestinationFileSearchToolResource,
  VectorStoreConfigurations as DestinationVectorStoreConfigurations,
  VectorStoreConfiguration as DestinationVectorStoreConfiguration,
  AzureAISearchResource as DestinationAzureAISearchResource,
  IndexResource as DestinationIndexResource,
  AgentsApiResponseFormat as DestinationAgentsApiResponseFormat,
  UpdateAgentOptions as DestinationUpdateAgentOptions,
  AgentThreadCreationOptions as DestinationAgentThreadCreationOptions,
  ThreadMessageOptions as DestinationThreadMessageOptions,
  MessageAttachment as DestinationMessageAttachment,
  CreateRunOptions as DestinationCreateRunOptions,
  TruncationObject as DestinationTruncationObject,
  AgentsNamedToolChoice as DestinationAgentsNamedToolChoice,
  FunctionName as DestinationFunctionName,
  UpdateToolResourcesOptions as DestinationUpdateToolResourcesOptions,
  UpdateCodeInterpreterToolResourceOptions as DestinationUpdateCodeInterpreterToolResourceOptions,
  UpdateFileSearchToolResourceOptions as DestinationUpdateFileSearchToolResourceOptions,
  ToolOutput as DestinationToolOutput,
  CreateAndRunThreadOptions as DestinationCreateAndRunThreadOptions,
  VectorStoreExpirationPolicy as DestinationVectorStoreExpirationPolicy,
  VectorStoreOptions as DestinationVectorStoreOptions,
  VectorStoreChunkingStrategyRequest as DestinationVectorStoreChunkingStrategyRequest,
  VectorStoreStaticChunkingStrategyOptions as DestinationVectorStoreStaticChunkingStrategyOptions,
  VectorStoreUpdateOptions as DestinationVectorStoreUpdateOptions,
  FunctionDefinition as DestinationFunctionDefinition,
  ToolConnectionList as DestinationToolConnectionList,
  ToolConnection as DestinationToolConnection,
  CodeInterpreterToolDefinition as DestinationCodeInterpreterToolDefinition,
  FileSearchToolDefinition as DestinationFileSearchToolDefinition,
  FunctionToolDefinition as DestinationFunctionToolDefinition,
  BingGroundingToolDefinition as DestinationBingGroundingToolDefinition,
  MicrosoftFabricToolDefinition as DestinationMicrosoftFabricToolDefinition,
  SharepointToolDefinition as DestinationSharepointToolDefinition,
  AzureAISearchToolDefinition as DestinationAzureAISearchToolDefinition,
  ThreadMessage as DestinationThreadMessage,
  MessageIncompleteDetails as DestinationMessageIncompleteDetails,
  MessageContent as DestinationMessageContent,
  MessageTextContent as DestinationMessageTextContent,
  MessageImageFileContent as DestinationMessageImageFileContent,
  MessageTextDetails as DestinationMessageTextDetails,
  MessageTextAnnotation as DestinationMessageTextAnnotation,
  MessageTextFileCitationAnnotation as DestinationMessageTextFileCitationAnnotation,
  MessageTextFileCitationDetails as DestinationMessageTextFileCitationDetails,
  MessageTextFilePathAnnotation as DestinationMessageTextFilePathAnnotation,
  MessageTextFilePathDetails as DestinationMessageTextFilePathDetails,
  MessageImageFileDetails as DestinationMessageImageFileDetails,
  MessageAttachmentToolDefinition as DestinationMessageAttachmentToolDefinition,
  VectorStoreAutoChunkingStrategyRequest as DestinationVectorStoreAutoChunkingStrategyRequest,
  VectorStoreStaticChunkingStrategyRequest as DestinationVectorStoreStaticChunkingStrategyRequest
} from "../generated/src/models.js";

// Conversion functions
export function convertCreateAgentOptions(
  source: SourceCreateAgentOptions
): DestinationCreateAgentOptions {
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

export function convertToolResources(
  source: SourceToolResources
): DestinationToolResources {
  return {
    ...(source.codeInterpreter && { code_interpreter: convertCodeInterpreterToolResource(source.codeInterpreter) }),
    ...(source.fileSearch && { file_search: convertFileSearchToolResource(source.fileSearch) }),
    ...(source.azureAISearch && { azure_ai_search: convertAzureAISearchResource(source.azureAISearch) }),
  };
}

export function convertMessageAttachmentToolDefinition(
  source: SourceMessageAttachmentToolDefinition
): DestinationMessageAttachmentToolDefinition {
  switch (source.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinition(source as SourceCodeInterpreterToolDefinition);
    case "file_search":
      return convertFileSearchToolDefinition(source as SourceFileSearchToolDefinition);
    default:
      throw new Error(`Unknown tool type: ${source}`);
  }
}

export function convertToolDefinition(
  source: SourceToolDefinition
): DestinationToolDefinition {
  switch (source.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinition(source as SourceCodeInterpreterToolDefinition);
    case "file_search":
      return convertFileSearchToolDefinition(source as SourceFileSearchToolDefinition);
    case "function":
      return convertFunctionToolDefinition(source as SourceFunctionToolDefinition);
    case "bing_grounding":
      return convertBingGroundingToolDefinition(source as SourceBingGroundingToolDefinition);
    case "microsoft_fabric":
      return convertMicrosoftFabricToolDefinition(source as SourceMicrosoftFabricToolDefinition);
    case "sharepoint_grounding":
      return convertSharepointToolDefinition(source as SourceSharepointToolDefinition);
    case "azure_ai_search":
      return convertAzureAISearchToolDefinition(source as SourceAzureAISearchToolDefinition);
    default:
      throw new Error(`Unknown tool type: ${source.type}`);
  }
}

export function convertCodeInterpreterToolDefinition(
  source: SourceCodeInterpreterToolDefinition
): DestinationCodeInterpreterToolDefinition {
  return {
    type: source.type,
  };
}

export function convertFileSearchToolDefinition(
  source: SourceFileSearchToolDefinition
): DestinationFileSearchToolDefinition {
  return {
    type: source.type,
    ...(source.fileSearch && { file_search: convertFileSearchToolDefinitionDetails(source.fileSearch) }),
  };
}

export function convertFunctionToolDefinition(
  source: SourceFunctionToolDefinition
): DestinationFunctionToolDefinition {
  return {
    type: source.type,
    function: convertFunctionDefinition(source.function),
  };
}

export function convertBingGroundingToolDefinition(
  source: SourceBingGroundingToolDefinition
): DestinationBingGroundingToolDefinition {
  return {
    type: source.type,
    bing_grounding: convertToolConnectionList(source.bingGrounding),
  };
}

export function convertMicrosoftFabricToolDefinition(
  source: SourceMicrosoftFabricToolDefinition
): DestinationMicrosoftFabricToolDefinition {
  return {
    type: source.type,
    microsoft_fabric: convertToolConnectionList(source.microsoftFabric),
  };
}

export function convertSharepointToolDefinition(
  source: SourceSharepointToolDefinition
): DestinationSharepointToolDefinition {
  return {
    type: source.type,
    sharepoint_grounding: convertToolConnectionList(source.sharepointGrounding),
  };
}

export function convertAzureAISearchToolDefinition(
  source: SourceAzureAISearchToolDefinition
): DestinationAzureAISearchToolDefinition {
  return {
    type: source.type,
  };
}

export function convertFileSearchToolDefinitionDetails(
  source: SourceFileSearchToolDefinitionDetails
): DestinationFileSearchToolDefinitionDetails {
  return {
    ...(source.maxNumResults && { max_num_results: source.maxNumResults }),
    ...(source.rankingOptions && { ranking_options: convertFileSearchRankingOptions(source.rankingOptions) }),
  };
}

export function convertFileSearchRankingOptions(
  source: SourceFileSearchRankingOptions
): DestinationFileSearchRankingOptions {
  return {
    ranker: source.ranker,
    score_threshold: source.scoreThreshold,
  };
}

export function convertCodeInterpreterToolResource(
  source: SourceCodeInterpreterToolResource
): DestinationCodeInterpreterToolResource {
  return {
    file_ids: source.fileIds,
    ...(source.dataSources && { data_sources: source.dataSources.map(convertVectorStoreDataSource) }),
  };
}

export function convertVectorStoreDataSource(
  source: SourceVectorStoreDataSource
): DestinationVectorStoreDataSource {
  return {
    uri: source.uri,
    type: source.type,
  };
}

export function convertFileSearchToolResource(
  source: SourceFileSearchToolResource
): DestinationFileSearchToolResource {
  return {
    ...(source.vectorStoreIds && { vector_store_ids: source.vectorStoreIds }),
    ...(source.vectorStores && { vector_stores: source.vectorStores.map(convertVectorStoreConfigurations) }),
  };
}

export function convertVectorStoreConfigurations(
  source: SourceVectorStoreConfigurations
): DestinationVectorStoreConfigurations {
  return {
    name: source.name,
    configuration: convertVectorStoreConfiguration(source.configuration),
  };
}

export function convertVectorStoreConfiguration(
  source: SourceVectorStoreConfiguration
): DestinationVectorStoreConfiguration {
  return {
    data_sources: source.dataSources.map(convertVectorStoreDataSource),
  };
}

export function convertAzureAISearchResource(
  source: SourceAzureAISearchResource
): DestinationAzureAISearchResource {
  return {
    ...(source.indexes && { indexes: source.indexes.map(convertIndexResource) }),
  };
}

export function convertIndexResource(
  source: SourceIndexResource
): DestinationIndexResource {
  return {
    index_connection_id: source.indexConnectionId,
    index_name: source.indexName,
  };
}

export function convertAgentsApiResponseFormat(
  source: SourceAgentsApiResponseFormat
): DestinationAgentsApiResponseFormat {
  return {
    type: source.type,
  };
}

export function convertUpdateAgentOptions(
  source: SourceUpdateAgentOptions
): DestinationUpdateAgentOptions {
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
  source: SourceAgentThreadCreationOptions
): DestinationAgentThreadCreationOptions {
  return {
    ...(source.messages && { messages: source.messages.map(convertThreadMessageOptions) }),
    ...(source.toolResources && { tool_resources: convertToolResources(source.toolResources) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertThreadMessageOptions(
  source: SourceThreadMessageOptions
): DestinationThreadMessageOptions {
  return {
    role: source.role,
    content: source.content,
    ...(source.attachments && { attachments: source.attachments.map(convertMessageAttachment) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertMessageAttachment(
  source: SourceMessageAttachment
): DestinationMessageAttachment {
  return {
    file_id: source.fileId,
    ...(source.dataSources && { data_sources: source.dataSources.map(convertVectorStoreDataSource) }),
    ...(source.tools && { tools: source.tools.map(convertMessageAttachmentToolDefinition) }),
  };
}

export function convertCreateRunOptions(
  source: SourceCreateRunOptions
): DestinationCreateRunOptions {
  return {
    assistant_id: source.assistantId,
    ...(source.model && { model: source.model }),
    ...(source.instructions && { instructions: source.instructions }),
    ...(source.additionalInstructions && { additional_instructions: source.additionalInstructions }),
    ...(source.additionalMessages && { additional_messages: source.additionalMessages.map(convertThreadMessage) }),
    ...(source.tools && { tools: source.tools.map(convertToolDefinition) }),
    ...(source.stream !== undefined && { stream: source.stream }),
    ...(source.temperature !== undefined && { temperature: source.temperature }),
    ...(source.topP !== undefined && { top_p: source.topP }),
    ...(source.maxPromptTokens !== undefined && { max_prompt_tokens: source.maxPromptTokens }),
    ...(source.maxCompletionTokens !== undefined && { max_completion_tokens: source.maxCompletionTokens }),
    ...(source.truncationStrategy && { truncation_strategy: convertTruncationObject(source.truncationStrategy) }),
    ...(source.toolChoice && { tool_choice: source.toolChoice }),
    ...(source.responseFormat && { response_format: source.responseFormat }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertTruncationObject(
  source: SourceTruncationObject
): DestinationTruncationObject {
  return {
    type: source.type,
    ...(source.lastMessages !== undefined && { last_messages: source.lastMessages }),
  };
}

export function convertAgentsNamedToolChoice(
  source: SourceAgentsNamedToolChoice
): DestinationAgentsNamedToolChoice {
  return {
    type: source.type,
    ...(source.function && { function: convertFunctionName(source.function) }),
  };
}

export function convertFunctionName(
  source: SourceFunctionName
): DestinationFunctionName {
  return {
    name: source.name,
  };
}

export function convertUpdateToolResourcesOptions(
  source: SourceUpdateToolResourcesOptions
): DestinationUpdateToolResourcesOptions {
  return {
    ...(source.codeInterpreter && { code_interpreter: convertUpdateCodeInterpreterToolResourceOptions(source.codeInterpreter) }),
    ...(source.fileSearch && { file_search: convertUpdateFileSearchToolResourceOptions(source.fileSearch) }),
    ...(source.azureAISearch && { azure_ai_search: convertAzureAISearchResource(source.azureAISearch) }),
  };
}

export function convertUpdateCodeInterpreterToolResourceOptions(
  source: SourceUpdateCodeInterpreterToolResourceOptions
): DestinationUpdateCodeInterpreterToolResourceOptions {
  return {
    ...(source.fileIds && { file_ids: source.fileIds }),
  };
}

export function convertUpdateFileSearchToolResourceOptions(
  source: SourceUpdateFileSearchToolResourceOptions
): DestinationUpdateFileSearchToolResourceOptions {
  return {
    ...(source.vectorStoreIds && { vector_store_ids: source.vectorStoreIds }),
  };
}

export function convertToolOutput(
  source: SourceToolOutput
): DestinationToolOutput {
  return {
    ...(source.toolCallId !== undefined && { tool_call_id: source.toolCallId }),
    ...(source.output !== undefined && { output: source.output }),
  };
}

export function convertCreateAndRunThreadOptions(
  source: SourceCreateAndRunThreadOptions
): DestinationCreateAndRunThreadOptions {
  return {
    assistant_id: source.assistantId,
    ...(source.thread && { thread: convertAgentThreadCreationOptions(source.thread) }),
    ...(source.model && { model: source.model }),
    ...(source.instructions && { instructions: source.instructions }),
    ...(source.tools && { tools: source.tools.map(convertToolDefinition) }),
    ...(source.toolResources && { tool_resources: convertUpdateToolResourcesOptions(source.toolResources) }),
    ...(source.stream !== undefined && { stream: source.stream }),
    ...(source.temperature !== undefined && { temperature: source.temperature }),
    ...(source.topP !== undefined && { top_p: source.topP }),
    ...(source.maxPromptTokens !== undefined && { max_prompt_tokens: source.maxPromptTokens }),
    ...(source.maxCompletionTokens !== undefined && { max_completion_tokens: source.maxCompletionTokens }),
    ...(source.truncationStrategy && { truncation_strategy: convertTruncationObject(source.truncationStrategy) }),
    ...(source.toolChoice && { tool_choice: source.toolChoice }),
    ...(source.responseFormat && { response_format: source.responseFormat }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertVectorStoreExpirationPolicy(
  source: SourceVectorStoreExpirationPolicy
): DestinationVectorStoreExpirationPolicy {
  return {
    anchor: source.anchor,
    days: source.days,
  };
}

export function convertVectorStoreOptions(
  source: SourceVectorStoreOptions
): DestinationVectorStoreOptions {
  return {
    ...(source.fileIds && { file_ids: source.fileIds }),
    ...(source.name && { name: source.name }),
    ...(source.configuration && { configuration: convertVectorStoreConfiguration(source.configuration) }),
    ...(source.expiresAfter && { expires_after: convertVectorStoreExpirationPolicy(source.expiresAfter) }),
    ...(source.chunkingStrategy && { chunking_strategy: convertVectorStoreChunkingStrategyRequest(source.chunkingStrategy) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertVectorStoreChunkingStrategyRequest(
  source: SourceVectorStoreChunkingStrategyRequest
): DestinationVectorStoreChunkingStrategyRequest {
  switch (source.type) {
    case "auto":
      return source as DestinationVectorStoreAutoChunkingStrategyRequest;
    case "static":
      return covertVectorStoreStaticChunkingStrategyRequest(source as SourceVectorStoreStaticChunkingStrategyRequest);
    default:
      throw new Error(`Unknown chunking strategy type: ${source.type}`);
  }
}

function covertVectorStoreStaticChunkingStrategyRequest(source: SourceVectorStoreStaticChunkingStrategyRequest): DestinationVectorStoreStaticChunkingStrategyRequest {
  return {
    ...source,
    static: convertVectorStoreStaticChunkingStrategyOptions(source.static),
  };
}

export function convertVectorStoreStaticChunkingStrategyOptions(
  source: SourceVectorStoreStaticChunkingStrategyOptions
): DestinationVectorStoreStaticChunkingStrategyOptions {
  return {
    max_chunk_size_tokens: source.maxChunkSizeTokens,
    chunk_overlap_tokens: source.chunkOverlapTokens,
  };
}

export function convertVectorStoreUpdateOptions(
  source: SourceVectorStoreUpdateOptions
): DestinationVectorStoreUpdateOptions {
  return {
    ...(source.name && { name: source.name }),
    ...(source.expiresAfter && { expires_after: convertVectorStoreExpirationPolicy(source.expiresAfter) }),
    ...(source.metadata && { metadata: source.metadata }),
  };
}

export function convertFunctionDefinition(
  source: SourceFunctionDefinition
): DestinationFunctionDefinition {
  return {
    name: source.name,
    ...(source.description && { description: source.description }),
    parameters: source.parameters,
  };
}

export function convertToolConnectionList(
  source: SourceToolConnectionList
): DestinationToolConnectionList {
  return {
    ...(source.connections && { connections: source.connections.map(convertToolConnection) }),
  };
}

export function convertToolConnection(
  source: SourceToolConnection
): DestinationToolConnection {
  return {
    connection_id: source.connectionId,
  };
}

export function convertThreadMessage(
  source: SourceThreadMessage
): DestinationThreadMessage {
  return {
    id: source.id,
    object: source.object,
    created_at: source.createdAt,
    thread_id: source.threadId,
    status: source.status,
    incomplete_details: !source.incompleteDetails ? source.incompleteDetails : convertMessageIncompleteDetails(source.incompleteDetails),
    completed_at: source.completedAt,
    incomplete_at: source.incompleteAt,
    role: source.role,
    content: source.content.map(convertMessageContent),
    assistant_id: source.assistantId,
    run_id: source.runId,
    attachments: !source.attachments ? source.attachments : source.attachments?.map(convertMessageAttachment),
    metadata: source.metadata,
  };
}

export function convertMessageIncompleteDetails(
  source: SourceMessageIncompleteDetails
): DestinationMessageIncompleteDetails {
  return {
    reason: source.reason,
  };
}

export function convertMessageContent(
  source: SourceMessageContent
): DestinationMessageContent {
  switch (source.type) {
    case "text":
      return convertMessageTextContent(source as SourceMessageTextContent);
    case "image_file":
      return convertMessageImageFileContent(source as SourceMessageImageFileContent);
    default:
      throw new Error(`Unknown message content type: ${source.type}`);
  }
}

export function convertMessageTextContent(
  source: SourceMessageTextContent
): DestinationMessageTextContent {
  return {
    type: "text",
    text: convertMessageTextDetails(source.text),
  };
}

export function convertMessageTextDetails(
  source: SourceMessageTextDetails
): DestinationMessageTextDetails {
  return {
    value: source.value,
    annotations: source.annotations.map(convertMessageTextAnnotation),
  };
}

export function convertMessageTextAnnotation(
  source: SourceMessageTextAnnotation
): DestinationMessageTextAnnotation {
  switch (source.type) {
    case "file_citation":
      return convertMessageTextFileCitationAnnotation(source as SourceMessageTextFileCitationAnnotation);
    case "file_path":
      return convertMessageTextFilePathAnnotation(source as SourceMessageTextFilePathAnnotation);
    default:
      throw new Error(`Unknown message text annotation type: ${source.type}`);
  }
}

export function convertMessageTextFileCitationAnnotation(
  source: SourceMessageTextFileCitationAnnotation
): DestinationMessageTextFileCitationAnnotation {
  return {
    text: source.text,
    type: "file_citation",
    file_citation: convertMessageTextFileCitationDetails(source.fileCitation),
    ...(source.startIndex && { start_index: source.startIndex }),
    ...(source.endIndex && { end_index: source.endIndex }),
  };
}

export function convertMessageTextFileCitationDetails(
  source: SourceMessageTextFileCitationDetails
): DestinationMessageTextFileCitationDetails {
  return {
    file_id: source.fileId,
    quote: source.quote,
  };
}

export function convertMessageTextFilePathAnnotation(
  source: SourceMessageTextFilePathAnnotation
): DestinationMessageTextFilePathAnnotation {
  return {
    text: source.text,
    type: "file_path",
    file_path: convertMessageTextFilePathDetails(source.filePath),
    ...(source.startIndex && { start_index: source.startIndex }),
    ...(source.endIndex && { end_index: source.endIndex }),
  };
}

export function convertMessageTextFilePathDetails(
  source: SourceMessageTextFilePathDetails
): DestinationMessageTextFilePathDetails {
  return {
    file_id: source.fileId,
  };
}

export function convertMessageImageFileContent(
  source: SourceMessageImageFileContent
): DestinationMessageImageFileContent {
  return {
    type: "image_file",
    image_file: convertMessageImageFileDetails(source.imageFile),
  };
}

export function convertMessageImageFileDetails(
  source: SourceMessageImageFileDetails
): DestinationMessageImageFileDetails {
  return {
    file_id: source.fileId,
  };
}
