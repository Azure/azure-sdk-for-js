// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as GeneratedModels from "../generated/src/outputModels.js";
import type * as PublicModels from "./outputModels.js";
import type * as WireStreamingModels from "./streamingWireModels.js";
import type * as PublicStreamingModels from "./streamingModels.js";
import { logger } from "../logger.js";

// Conversion functions

function convertAzureFunctionToolDefinitionOutput(
  input: GeneratedModels.AzureFunctionToolDefinitionOutput,
): PublicModels.AzureFunctionToolDefinitionOutput {
  return {
    type: "azure_function",
    azureFunction: {
      ...input.azure_function,
      inputBinding: {
        ...input.azure_function.input_binding,
        storageQueue: {
          queueServiceEndpoint:
            input.azure_function.input_binding.storage_queue.queue_service_endpoint,
          queueName: input.azure_function.input_binding.storage_queue.queue_name,
        },
      },
      outputBinding: {
        ...input.azure_function.output_binding,
        storageQueue: {
          queueServiceEndpoint:
            input.azure_function.output_binding.storage_queue.queue_service_endpoint,
          queueName: input.azure_function.output_binding.storage_queue.queue_name,
        },
      },
    },
  };
}

function convertCodeInterpreterToolDefinitionOutput(
  input: GeneratedModels.CodeInterpreterToolDefinitionOutput,
): PublicModels.CodeInterpreterToolDefinitionOutput {
  return { ...input };
}

function convertFileSearchToolDefinitionOutput(
  input: GeneratedModels.FileSearchToolDefinitionOutput,
): PublicModels.FileSearchToolDefinitionOutput {
  return {
    type: "file_search",
    fileSearch: input.file_search
      ? convertFileSearchToolDefinitionDetailsOutput(input.file_search)
      : undefined,
  };
}

function convertFileSearchToolDefinitionDetailsOutput(
  input: GeneratedModels.FileSearchToolDefinitionDetailsOutput,
): PublicModels.FileSearchToolDefinitionDetailsOutput {
  return {
    maxNumResults: input.max_num_results,
    rankingOptions: input.ranking_options
      ? convertFileSearchRankingOptionsOutput(input.ranking_options)
      : undefined,
  };
}

function convertFileSearchRankingOptionsOutput(
  input: GeneratedModels.FileSearchRankingOptionsOutput,
): PublicModels.FileSearchRankingOptionsOutput {
  return {
    ranker: input.ranker,
    scoreThreshold: input.score_threshold,
  };
}

function convertFunctionToolDefinitionOutput(
  input: GeneratedModels.FunctionToolDefinitionOutput,
): PublicModels.FunctionToolDefinitionOutput {
  return {
    type: "function",
    function: input.function && convertFunctionDefinitionOutput(input.function),
  };
}

function convertFunctionDefinitionOutput(
  input: GeneratedModels.FunctionDefinitionOutput,
): PublicModels.FunctionDefinitionOutput {
  return { ...input };
}

function convertBingGroundingToolDefinitionOutput(
  input: GeneratedModels.BingGroundingToolDefinitionOutput,
): PublicModels.BingGroundingToolDefinitionOutput {
  return {
    type: "bing_grounding",
    bingGrounding: input.bing_grounding && convertToolConnectionListOutput(input.bing_grounding),
  };
}

function convertToolConnectionListOutput(
  input: GeneratedModels.ToolConnectionListOutput,
): PublicModels.ToolConnectionListOutput {
  return {
    connections: input.connections?.map(convertToolConnectionOutput),
  };
}

function convertToolConnectionOutput(
  input: GeneratedModels.ToolConnectionOutput,
): PublicModels.ToolConnectionOutput {
  return { connectionId: input.connection_id };
}

function convertMicrosoftFabricToolDefinitionOutput(
  input: GeneratedModels.MicrosoftFabricToolDefinitionOutput,
): PublicModels.MicrosoftFabricToolDefinitionOutput {
  return {
    type: "fabric_aiskill",
    fabricAISkill: input.fabric_aiskill && convertToolConnectionListOutput(input.fabric_aiskill),
  };
}

function convertSharepointToolDefinitionOutput(
  input: GeneratedModels.SharepointToolDefinitionOutput,
): PublicModels.SharepointToolDefinitionOutput {
  return {
    type: "sharepoint_grounding",
    sharepointGrounding:
      input.sharepoint_grounding && convertToolConnectionListOutput(input.sharepoint_grounding),
  };
}

function convertAzureAISearchToolDefinitionOutput(
  input: GeneratedModels.AzureAISearchToolDefinitionOutput,
): PublicModels.AzureAISearchToolDefinitionOutput {
  return { ...input };
}

function convertToolResourcesOutput(
  input: GeneratedModels.ToolResourcesOutput,
): PublicModels.ToolResourcesOutput {
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

function convertCodeInterpreterToolResourceOutput(
  input: GeneratedModels.CodeInterpreterToolResourceOutput,
): PublicModels.CodeInterpreterToolResourceOutput {
  return {
    fileIds: input.file_ids,
    dataSources: input.data_sources?.map(convertVectorStoreDataSourceOutput),
  };
}

function convertVectorStoreDataSourceOutput(
  input: GeneratedModels.VectorStoreDataSourceOutput,
): PublicModels.VectorStoreDataSourceOutput {
  return { ...input };
}

function convertFileSearchToolResourceOutput(
  input: GeneratedModels.FileSearchToolResourceOutput,
): PublicModels.FileSearchToolResourceOutput {
  return {
    vectorStoreIds: input.vector_store_ids,
    vectorStores: input.vector_stores?.map(convertVectorStoreConfigurationsOutput),
  };
}

function convertVectorStoreConfigurationsOutput(
  input: GeneratedModels.VectorStoreConfigurationsOutput,
): PublicModels.VectorStoreConfigurationsOutput {
  return {
    name: input.name,
    configuration:
      input.configuration && convertVectorStoreConfigurationOutput(input.configuration),
  };
}

function convertVectorStoreConfigurationOutput(
  input: GeneratedModels.VectorStoreConfigurationOutput,
): PublicModels.VectorStoreConfigurationOutput {
  return {
    ...input,
    dataSources: input.data_sources?.map(convertVectorStoreDataSourceOutput),
  };
}

function convertAzureAISearchResourceOutput(
  input: GeneratedModels.AzureAISearchResourceOutput,
): PublicModels.AzureAISearchResourceOutput {
  return {
    indexes: input.indexes?.map(convertIndexResourceOutput),
  };
}

function convertIndexResourceOutput(
  input: GeneratedModels.IndexResourceOutput,
): PublicModels.IndexResourceOutput {
  return { indexConnectionId: input.index_connection_id, indexName: input.index_name };
}

export function convertAgentOutput(input: GeneratedModels.AgentOutput): PublicModels.AgentOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at),
    name: input.name,
    description: input.description,
    model: input.model,
    instructions: input.instructions,
    tools: input.tools?.map(convertToolDefinitionOutput),
    toolResources: input.tool_resources ? convertToolResourcesOutput(input.tool_resources) : null,
    temperature: input.temperature,
    topP: input.top_p,
    responseFormat: input.response_format
      ? convertAgentsApiResponseFormatOptionOutput(input.response_format)
      : null,
    metadata: input.metadata,
  };
}
function convertToolDefinitionOutput(
  tool: GeneratedModels.ToolDefinitionOutput,
): PublicModels.ToolDefinitionOutput {
  switch (tool.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinitionOutput(
        tool as GeneratedModels.CodeInterpreterToolDefinitionOutput,
      );
    case "file_search":
      return convertFileSearchToolDefinitionOutput(
        tool as GeneratedModels.FileSearchToolDefinitionOutput,
      );
    case "function":
      return convertFunctionToolDefinitionOutput(
        tool as GeneratedModels.FunctionToolDefinitionOutput,
      );
    case "bing_grounding":
      return convertBingGroundingToolDefinitionOutput(
        tool as GeneratedModels.BingGroundingToolDefinitionOutput,
      );
    case "microsoft_fabric":
      return convertMicrosoftFabricToolDefinitionOutput(
        tool as GeneratedModels.MicrosoftFabricToolDefinitionOutput,
      );
    case "sharepoint_grounding":
      return convertSharepointToolDefinitionOutput(
        tool as GeneratedModels.SharepointToolDefinitionOutput,
      );
    case "azure_ai_search":
      return convertAzureAISearchToolDefinitionOutput(
        tool as GeneratedModels.AzureAISearchToolDefinitionOutput,
      );
    case "azure_function":
      return convertAzureFunctionToolDefinitionOutput(
        tool as GeneratedModels.AzureFunctionToolDefinitionOutput,
      );
    default:
      return tool;
  }
}

function convertAgentsApiResponseFormatOptionOutput(
  input: GeneratedModels.AgentsApiResponseFormatOptionOutput,
): PublicModels.AgentsApiResponseFormatOptionOutput {
  const formatOutput = input as GeneratedModels.AgentsApiResponseFormatOutput;
  if (formatOutput && formatOutput.type) {
    switch (formatOutput.type) {
      case "json_schema":
        return {
          type: formatOutput.type,
          jsonSchema: (formatOutput as GeneratedModels.ResponseFormatJsonSchemaTypeOutput)
            .json_schema,
        };
      default:
        return input as PublicModels.AgentsApiResponseFormatOptionOutput;
    }
  }
  return input as PublicModels.AgentsApiResponseFormatOptionOutput;
}

export function convertOpenAIPageableListOfAgentOutput(
  input: GeneratedModels.OpenAIPageableListOfAgentOutput,
): PublicModels.OpenAIPageableListOfAgentOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data.map(convertAgentOutput),
  };
}

export function convertAgentDeletionStatusOutput(
  input: GeneratedModels.AgentDeletionStatusOutput,
): PublicModels.AgentDeletionStatusOutput {
  return { ...input };
}

function convertMessageAttachmentOutput(
  input: GeneratedModels.MessageAttachmentOutput,
): PublicModels.MessageAttachmentOutput {
  return {
    fileId: input.file_id,
    dataSource: input.data_source && convertVectorStoreDataSourceOutput(input.data_source),
    tools: input.tools?.map(convertMessageAttachmentToolDefinitionOutput),
  };
}

function convertMessageAttachmentToolDefinitionOutput(
  input: GeneratedModels.MessageAttachmentToolDefinitionOutput,
): PublicModels.MessageAttachmentToolDefinitionOutput {
  switch (input.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinitionOutput(
        input as GeneratedModels.CodeInterpreterToolDefinitionOutput,
      );
    case "file_search":
      return convertFileSearchToolDefinitionOutput(
        input as GeneratedModels.FileSearchToolDefinitionOutput,
      );
    default:
      throw new Error(`Unknown tool type: ${input}`);
  }
}

export function convertAgentThreadOutput(
  input: GeneratedModels.AgentThreadOutput,
): PublicModels.AgentThreadOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at),
    toolResources: input.tool_resources ? convertToolResourcesOutput(input.tool_resources) : null,
    metadata: input.metadata,
  };
}

export function convertThreadDeletionStatusOutput(
  input: GeneratedModels.ThreadDeletionStatusOutput,
): PublicModels.ThreadDeletionStatusOutput {
  return { ...input };
}

export function convertThreadMessageOutput(
  input: GeneratedModels.ThreadMessageOutput,
): PublicModels.ThreadMessageOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at),
    threadId: input.thread_id,
    status: input.status,
    incompleteDetails: input.incomplete_details
      ? convertMessageIncompleteDetailsOutput(input.incomplete_details)
      : null,
    completedAt: input.completed_at ? new Date(input.completed_at) : null,
    incompleteAt: input.incomplete_at ? new Date(input.incomplete_at) : null,
    role: input.role,
    content: input.content?.map(convertMessageContentOutput),
    assistantId: input.assistant_id,
    runId: input.run_id,
    attachments: !input.attachments
      ? input.attachments
      : input.attachments?.map(convertMessageAttachmentOutput),
    metadata: input.metadata,
  };
}

function convertMessageIncompleteDetailsOutput(
  input: GeneratedModels.MessageIncompleteDetailsOutput,
): PublicModels.MessageIncompleteDetailsOutput {
  return { ...input };
}

function convertMessageContentOutput(
  input: GeneratedModels.MessageContentOutput,
): PublicModels.MessageContentOutput {
  switch (input.type) {
    case "text":
      return convertMessageTextContentOutput(input as GeneratedModels.MessageTextContentOutput);
    case "image_file":
      return convertMessageImageFileContentOutput(
        input as GeneratedModels.MessageImageFileContentOutput,
      );
    default:
      return { ...input };
  }
}

function convertMessageTextContentOutput(
  input: GeneratedModels.MessageTextContentOutput,
): PublicModels.MessageTextContentOutput {
  return {
    type: input.type,
    text: input.text && convertMessageTextDetailsOutput(input.text),
  };
}

function convertMessageTextDetailsOutput(
  input: GeneratedModels.MessageTextDetailsOutput,
): PublicModels.MessageTextDetailsOutput {
  return {
    value: input.value,
    annotations: input.annotations?.map(convertMessageTextAnnotationOutput),
  };
}

function convertMessageTextAnnotationOutput(
  input: GeneratedModels.MessageTextAnnotationOutputParent,
): PublicModels.MessageTextAnnotationOutput {
  switch (input.type) {
    case "file_citation":
      return convertMessageTextFileCitationAnnotationOutput(
        input as GeneratedModels.MessageTextFileCitationAnnotationOutput,
      );
    case "file_path":
      return convertMessageTextFilePathAnnotationOutput(
        input as GeneratedModels.MessageTextFilePathAnnotationOutput,
      );
    default:
      return { ...input };
  }
}

function convertMessageTextFileCitationAnnotationOutput(
  input: GeneratedModels.MessageTextFileCitationAnnotationOutput,
): PublicModels.MessageTextFileCitationAnnotationOutput {
  return {
    type: input.type,
    text: input.text,
    fileCitation:
      input.file_citation && convertMessageTextFileCitationDetailsOutput(input.file_citation),
  };
}

function convertMessageTextFileCitationDetailsOutput(
  input: GeneratedModels.MessageTextFileCitationDetailsOutput,
): PublicModels.MessageTextFileCitationDetailsOutput {
  return {
    fileId: input.file_id,
    quote: input.quote,
  };
}

function convertMessageTextFilePathAnnotationOutput(
  input: GeneratedModels.MessageTextFilePathAnnotationOutput,
): PublicModels.MessageTextFilePathAnnotationOutput {
  return {
    type: input.type,
    filePath: input.file_path && convertMessageTextFilePathDetailsOutput(input.file_path),
    startIndex: input.start_index,
    endIndex: input.end_index,
    text: input.text,
  };
}

function convertMessageTextFilePathDetailsOutput(
  input: GeneratedModels.MessageTextFilePathDetailsOutput,
): PublicModels.MessageTextFilePathDetailsOutput {
  return { fileId: input.file_id };
}

function convertMessageImageFileContentOutput(
  input: GeneratedModels.MessageImageFileContentOutput,
): PublicModels.MessageImageFileContentOutput {
  return {
    type: input.type,
    imageFile: input.image_file && convertMessageImageFileDetailsOutput(input.image_file),
  };
}

function convertMessageImageFileDetailsOutput(
  input: GeneratedModels.MessageImageFileDetailsOutput,
): PublicModels.MessageImageFileDetailsOutput {
  return { fileId: input.file_id };
}

export function convertThreadRunOutput(
  input: GeneratedModels.ThreadRunOutput,
): PublicModels.ThreadRunOutput {
  return {
    id: input.id,
    object: input.object,
    threadId: input.thread_id,
    assistantId: input.assistant_id,
    status: input.status,
    ...(input.required_action && {
      requiredAction: convertRequiredActionOutput(input.required_action),
    }),
    lastError: input.last_error,
    model: input.model,
    instructions: input.instructions,
    tools: input.tools?.map(convertToolDefinitionOutput) ?? [],
    createdAt: new Date(input.created_at),
    expiresAt: input.expires_at ? new Date(input.expires_at) : null,
    startedAt: input.started_at ? new Date(input.started_at) : null,
    completedAt: input.completed_at ? new Date(input.completed_at) : null,
    cancelledAt: input.cancelled_at ? new Date(input.cancelled_at) : null,
    failedAt: input.failed_at ? new Date(input.failed_at) : null,
    incompleteDetails: input.incomplete_details,
    usage: input.usage ? convertRunStepCompletionUsageOutput(input.usage) : null,
    ...(input.temperature && { temperature: input.temperature }),
    ...(input.top_p && { topP: input.top_p }),
    maxPromptTokens: input.max_prompt_tokens,
    maxCompletionTokens: input.max_completion_tokens,
    truncationStrategy: input.truncation_strategy
      ? convertTruncationObjectOutput(input.truncation_strategy)
      : null,
    toolChoice: input.tool_choice,
    responseFormat: input.response_format,
    metadata: input.metadata,
    ...(input.tool_resources && {
      toolResources: convertToolResourcesOutput(input.tool_resources),
    }),
    parallelToolCalls: input.parallel_tool_calls,
  };
}

function convertRunCompletionUsageOutput(
  input: GeneratedModels.RunCompletionUsageOutput,
): PublicModels.RunCompletionUsageOutput {
  return {
    completionTokens: input.completion_tokens,
    promptTokens: input.prompt_tokens,
    totalTokens: input.total_tokens,
  };
}

function convertRequiredActionOutput(
  input: GeneratedModels.RequiredActionOutput,
): PublicModels.RequiredActionOutput {
  switch (input.type) {
    case "submit_tool_outputs":
      return convertSubmitToolOutputsActionOutput(
        input as GeneratedModels.SubmitToolOutputsActionOutput,
      );
    default:
      return { ...input };
  }
}

function convertSubmitToolOutputsActionOutput(
  input: GeneratedModels.SubmitToolOutputsActionOutput,
): PublicModels.SubmitToolOutputsActionOutput {
  return {
    type: input.type,
    submitToolOutputs:
      input.submit_tool_outputs && convertSubmitToolOutputsDetailsOutput(input.submit_tool_outputs),
  };
}

function convertSubmitToolOutputsDetailsOutput(
  input: GeneratedModels.SubmitToolOutputsDetailsOutput,
): PublicModels.SubmitToolOutputsDetailsOutput {
  return {
    toolCalls: input.tool_calls?.map(convertRequiredToolCallOutput),
  };
}

function convertRequiredToolCallOutput(
  input: GeneratedModels.RequiredToolCallOutput,
): PublicModels.RequiredToolCallOutput {
  switch (input.type) {
    case "function":
      return convertRequiredFunctionToolCallOutput(
        input as GeneratedModels.RequiredFunctionToolCallOutput,
      );
    default:
      return { ...input };
  }
}

function convertRequiredFunctionToolCallOutput(
  input: GeneratedModels.RequiredFunctionToolCallOutput,
): PublicModels.RequiredFunctionToolCallOutput {
  return {
    id: input.id,
    type: input.type,
    function: input.function && convertRequiredFunctionToolCallDetailsOutput(input.function),
  };
}

function convertRequiredFunctionToolCallDetailsOutput(
  input: GeneratedModels.RequiredFunctionToolCallDetailsOutput,
): PublicModels.RequiredFunctionToolCallDetailsOutput {
  return {
    name: input.name,
    arguments: input.arguments,
  };
}

function convertTruncationObjectOutput(
  input: GeneratedModels.TruncationObjectOutput,
): PublicModels.TruncationObjectOutput {
  return {
    type: input.type,
    lastMessages: input.last_messages,
  };
}

export function convertOpenAIPageableListOfThreadRunOutput(
  input: GeneratedModels.OpenAIPageableListOfThreadRunOutput,
): PublicModels.OpenAIPageableListOfThreadRunOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data?.map(convertThreadRunOutput),
  };
}
export function convertRunStepOutput(
  input: GeneratedModels.RunStepOutput,
): PublicModels.RunStepOutput {
  return {
    id: input.id,
    object: input.object,
    type: input.type,
    assistantId: input.assistant_id,
    threadId: input.thread_id,
    runId: input.run_id,
    status: input.status,
    stepDetails: input.step_details && convertRunStepDetailsOutput(input.step_details),
    lastError: input.last_error ? convertRunStepErrorOutput(input.last_error) : null,
    createdAt: new Date(input.created_at),
    expiredAt: input.expired_at ? new Date(input.expired_at) : null,
    completedAt: input.completed_at ? new Date(input.completed_at) : null,
    failedAt: input.failed_at ? new Date(input.failed_at) : null,
    cancelledAt: input.cancelled_at ? new Date(input.cancelled_at) : null,
    ...(input.usage && { usage: convertRunCompletionUsageOutput(input.usage) }),
    metadata: input.metadata,
  };
}

function convertRunStepDetailsOutput(
  input: GeneratedModels.RunStepDetailsOutput,
): PublicModels.RunStepDetailsOutput {
  switch (input.type) {
    case "message_creation":
      return convertRunStepMessageCreationDetailsOutput(
        input as GeneratedModels.RunStepMessageCreationDetailsOutput,
      );
    case "tool_call":
      return convertRunStepToolCallDetailsOutput(
        input as GeneratedModels.RunStepToolCallDetailsOutput,
      );
    default: {
      throw new Error(`Unknown run step type: ${input.type}`);
    }
  }
}

function convertRunStepMessageCreationDetailsOutput(
  input: GeneratedModels.RunStepMessageCreationDetailsOutput,
): PublicModels.RunStepMessageCreationDetailsOutput {
  return {
    type: input.type,
    messageCreation: convertRunStepMessageCreationReferenceOutput(input.message_creation),
  };
}

function convertRunStepMessageCreationReferenceOutput(
  input: GeneratedModels.RunStepMessageCreationReferenceOutput,
): PublicModels.RunStepMessageCreationReferenceOutput {
  return {
    messageId: input.message_id,
  };
}

function convertRunStepToolCallDetailsOutput(
  input: GeneratedModels.RunStepToolCallDetailsOutput,
): PublicModels.RunStepToolCallDetailsOutput {
  return {
    type: input.type,
    toolCalls: input.tool_calls && input.tool_calls.map(convertRunStepToolCallOutput),
  };
}

function convertRunStepToolCallOutput(
  input: GeneratedModels.RunStepToolCallOutput,
): PublicModels.RunStepToolCallOutput {
  switch (input.type) {
    case "code_interpreter":
      return convertRunStepCodeInterpreterToolCallOutput(
        input as GeneratedModels.RunStepCodeInterpreterToolCallOutput,
      );
    case "file_search":
      return convertRunStepFileSearchToolCallOutput(
        input as GeneratedModels.RunStepFileSearchToolCallOutput,
      );
    case "bing_grounding":
      return convertRunStepBingGroundingToolCallOutput(
        input as GeneratedModels.RunStepBingGroundingToolCallOutput,
      );
    case "azure_ai_search":
      return convertRunStepAzureAISearchToolCallOutput(
        input as GeneratedModels.RunStepAzureAISearchToolCallOutput,
      );
    case "sharepoint_grounding":
      return convertRunStepSharepointToolCallOutput(
        input as GeneratedModels.RunStepSharepointToolCallOutput,
      );
    case "microsoft_fabric":
      return convertRunStepMicrosoftFabricToolCallOutput(
        input as GeneratedModels.RunStepMicrosoftFabricToolCallOutput,
      );
    case "function":
      return convertRunStepFunctionToolCallOutput(
        input as GeneratedModels.RunStepFunctionToolCallOutput,
      );
    default: {
      throw new Error(`Unknown run step tool call type: ${input.type}`);
    }
  }
}

function convertRunStepCodeInterpreterToolCallOutput(
  input: GeneratedModels.RunStepCodeInterpreterToolCallOutput,
): PublicModels.RunStepCodeInterpreterToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    codeInterpreter:
      input.code_interpreter &&
      convertRunStepCodeInterpreterToolCallDetailsOutput(input.code_interpreter),
  };
}

function convertRunStepFileSearchToolCallOutput(
  input: GeneratedModels.RunStepFileSearchToolCallOutput,
): PublicModels.RunStepFileSearchToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    fileSearch:
      input.file_search && convertRunStepFileSearchToolCallResultsOutput(input.file_search),
  };
}

function convertRunStepFileSearchToolCallResultsOutput(
  input: GeneratedModels.RunStepFileSearchToolCallResultsOutput,
): PublicModels.RunStepFileSearchToolCallResultsOutput {
  return {
    rankingOptions:
      input.ranking_options && convertFileSearchRankingOptionsOutput(input.ranking_options),
    results: input.results?.map(convertRunStepFileSearchToolCallResultOutput),
  };
}

function convertRunStepFileSearchToolCallResultOutput(
  input: GeneratedModels.RunStepFileSearchToolCallResultOutput,
): PublicModels.RunStepFileSearchToolCallResultOutput {
  return {
    fileId: input.file_id,
    fileName: input.file_name,
    score: input.score,
    content: input.content,
  };
}

function convertRunStepBingGroundingToolCallOutput(
  input: GeneratedModels.RunStepBingGroundingToolCallOutput,
): PublicModels.RunStepBingGroundingToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    bingGrounding: input.bing_grounding,
  };
}

function convertRunStepAzureAISearchToolCallOutput(
  input: GeneratedModels.RunStepAzureAISearchToolCallOutput,
): PublicModels.RunStepAzureAISearchToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    azureAISearch: input.azure_ai_search,
  };
}

function convertRunStepSharepointToolCallOutput(
  input: GeneratedModels.RunStepSharepointToolCallOutput,
): PublicModels.RunStepSharepointToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    sharepointGrounding: input.sharepoint_grounding,
  };
}

function convertRunStepMicrosoftFabricToolCallOutput(
  input: GeneratedModels.RunStepMicrosoftFabricToolCallOutput,
): PublicModels.RunStepMicrosoftFabricToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    fabricAISkill: input.fabric_aiskill,
  };
}

function convertRunStepFunctionToolCallOutput(
  input: GeneratedModels.RunStepFunctionToolCallOutput,
): PublicModels.RunStepFunctionToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    function: convertRunStepFunctionToolCallDetailsOutput(input.function),
  };
}

function convertRunStepFunctionToolCallDetailsOutput(
  input: GeneratedModels.RunStepFunctionToolCallDetailsOutput,
): PublicModels.RunStepFunctionToolCallDetailsOutput {
  return {
    name: input.name,
    arguments: input.arguments,
    output: input.output,
  };
}

function convertRunStepCodeInterpreterToolCallDetailsOutput(
  input: GeneratedModels.RunStepCodeInterpreterToolCallDetailsOutput,
): PublicModels.RunStepCodeInterpreterToolCallDetailsOutput {
  return {
    input: input.input,
    outputs: input.outputs && input.outputs.map(convertRunStepCodeInterpreterToolCallOutputOutput),
  };
}

function convertRunStepCodeInterpreterToolCallOutputOutput(
  input: GeneratedModels.RunStepCodeInterpreterToolCallOutputOutput,
): PublicModels.RunStepCodeInterpreterToolCallOutputOutput {
  switch (input.type) {
    case "logs":
      return convertRunStepCodeInterpreterLogOutputOutput(
        input as GeneratedModels.RunStepCodeInterpreterLogOutputOutput,
      );
    case "image":
      return convertRunStepCodeInterpreterImageOutputOutput(
        input as GeneratedModels.RunStepCodeInterpreterImageOutputOutput,
      );
    default:
      return input;
  }
}

function convertRunStepCodeInterpreterLogOutputOutput(
  input: GeneratedModels.RunStepCodeInterpreterLogOutputOutput,
): PublicModels.RunStepCodeInterpreterLogOutputOutput {
  return {
    type: input.type,
    logs: input.logs,
  };
}

function convertRunStepCodeInterpreterImageOutputOutput(
  input: GeneratedModels.RunStepCodeInterpreterImageOutputOutput,
): PublicModels.RunStepCodeInterpreterImageOutputOutput {
  return {
    type: input.type,
    image: convertRunStepCodeInterpreterImageReferenceOutput(input.image),
  };
}

function convertRunStepCodeInterpreterImageReferenceOutput(
  input: GeneratedModels.RunStepCodeInterpreterImageReferenceOutput,
): PublicModels.RunStepCodeInterpreterImageReferenceOutput {
  return {
    fileId: input.file_id,
  };
}

function convertRunStepErrorOutput(
  input: GeneratedModels.RunStepErrorOutput,
): PublicModels.RunStepErrorOutput {
  return {
    code: input.code,
    message: input.message,
  };
}

function convertRunStepCompletionUsageOutput(
  input: GeneratedModels.RunStepCompletionUsageOutput,
): PublicModels.RunStepCompletionUsageOutput {
  return {
    completionTokens: input.completion_tokens,
    promptTokens: input.prompt_tokens,
    totalTokens: input.total_tokens,
  };
}

export function convertOpenAIPageableListOfRunStepOutput(
  input: GeneratedModels.OpenAIPageableListOfRunStepOutput,
): PublicModels.OpenAIPageableListOfRunStepOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data?.map(convertRunStepOutput),
  };
}

export function convertOpenAIPageableListOfThreadMessageOutput(
  input: GeneratedModels.OpenAIPageableListOfThreadMessageOutput,
): PublicModels.OpenAIPageableListOfThreadMessageOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data?.map(convertThreadMessageOutput),
  };
}

export function convertOpenAIPageableListOfVectorStoreOutput(
  input: GeneratedModels.OpenAIPageableListOfVectorStoreOutput,
): PublicModels.OpenAIPageableListOfVectorStoreOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data.map(convertVectorStoreOutput),
  };
}

export function convertVectorStoreOutput(
  input: GeneratedModels.VectorStoreOutput,
): PublicModels.VectorStoreOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at),
    name: input.name,
    usageBytes: input.usage_bytes,
    fileCounts: convertVectorStoreFileCountOutput(input.file_counts),
    status: input.status,
    expiresAfter: input.expires_after
      ? convertVectorStoreExpirationPolicyOutput(input.expires_after)
      : undefined,
    expiresAt: input.expires_at ? new Date(input.expires_at) : null,
    lastActiveAt: input.last_active_at ? new Date(input.last_active_at) : null,
    metadata: input.metadata,
  };
}

function convertVectorStoreFileCountOutput(
  input: GeneratedModels.VectorStoreFileCountOutput,
): PublicModels.VectorStoreFileCountOutput {
  return {
    inProgress: input.in_progress,
    completed: input.completed,
    failed: input.failed,
    cancelled: input.cancelled,
    total: input.total,
  };
}

function convertVectorStoreExpirationPolicyOutput(
  input: GeneratedModels.VectorStoreExpirationPolicyOutput,
): PublicModels.VectorStoreExpirationPolicyOutput {
  return {
    anchor: input.anchor,
    days: input.days,
  };
}

export function convertVectorStoreDeletionStatusOutput(
  input: GeneratedModels.VectorStoreDeletionStatusOutput,
): PublicModels.VectorStoreDeletionStatusOutput {
  return {
    id: input.id,
    deleted: input.deleted,
    object: input.object,
  };
}

export function convertVectorStoreFileBatchOutput(
  input: GeneratedModels.VectorStoreFileBatchOutput,
): PublicModels.VectorStoreFileBatchOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at),
    vectorStoreId: input.vector_store_id,
    status: input.status,
    fileCounts: convertVectorStoreFileCountOutput(input.file_counts),
  };
}

export function convertOpenAIPageableListOfVectorStoreFileOutput(
  input: GeneratedModels.OpenAIPageableListOfVectorStoreFileOutput,
): PublicModels.OpenAIPageableListOfVectorStoreFileOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data.map(convertVectorStoreFileOutput),
  };
}

export function convertVectorStoreFileOutput(
  input: GeneratedModels.VectorStoreFileOutput,
): PublicModels.VectorStoreFileOutput {
  return {
    id: input.id,
    object: input.object,
    usageBytes: input.usage_bytes,
    createdAt: new Date(input.created_at),
    vectorStoreId: input.vector_store_id,
    status: input.status,
    lastError: input.last_error,
    chunkingStrategy:
      input.chunking_strategy &&
      convertVectorStoreChunkingStrategyResponseOutput(input.chunking_strategy),
  };
}

function convertVectorStoreChunkingStrategyResponseOutput(
  input: GeneratedModels.VectorStoreChunkingStrategyResponseOutput,
): PublicModels.VectorStoreChunkingStrategyResponseOutput {
  switch (input.type) {
    case "auto":
      return input as PublicModels.VectorStoreAutoChunkingStrategyResponseOutput;
    case "static":
      return convertVectorStoreStaticChunkingStrategyResponseOutput(
        input as GeneratedModels.VectorStoreStaticChunkingStrategyResponseOutput,
      );
    default:
      throw new Error(`Unknown chunking strategy type: ${input.type}`);
  }
}
function convertVectorStoreStaticChunkingStrategyResponseOutput(
  input: GeneratedModels.VectorStoreStaticChunkingStrategyResponseOutput,
): PublicModels.VectorStoreStaticChunkingStrategyResponseOutput {
  return {
    type: input.type,
    static: input.static && convertVectorStoreStaticChunkingStrategyOptionsOutput(input.static),
  };
}

function convertVectorStoreStaticChunkingStrategyOptionsOutput(
  input: GeneratedModels.VectorStoreStaticChunkingStrategyOptionsOutput,
): PublicModels.VectorStoreStaticChunkingStrategyOptionsOutput {
  return {
    maxChunkSizeTokens: input.max_chunk_size_tokens,
    chunkOverlapTokens: input.chunk_overlap_tokens,
  };
}

export function convertVectorStoreFileDeletionStatusOutput(
  input: GeneratedModels.VectorStoreFileDeletionStatusOutput,
): PublicModels.VectorStoreFileDeletionStatusOutput {
  return {
    id: input.id,
    deleted: input.deleted,
    object: input.object,
  };
}

export function convertOpenAIFileOutput(
  input: GeneratedModels.OpenAIFileOutput,
): PublicModels.OpenAIFileOutput {
  return {
    id: input.id,
    object: input.object,
    bytes: input.bytes,
    filename: input.filename,
    createdAt: new Date(input.created_at),
    purpose: input.purpose,
    status: input.status,
    statusDetails: input.status_details,
  };
}

export function convertFileListResponseOutput(
  input: GeneratedModels.FileListResponseOutput,
): PublicModels.FileListResponseOutput {
  return {
    object: input.object,
    data: input.data.map(convertOpenAIFileOutput),
  };
}

function convertMessageDelta(
  input: WireStreamingModels.MessageDelta,
): PublicStreamingModels.MessageDelta {
  return {
    role: input.role,
    content: input.content?.map(convertStreamingMessageDeltaContent),
  };
}

export function convertMessageDeltaChunkOutput(
  input: WireStreamingModels.MessageDeltaChunk,
): PublicStreamingModels.MessageDeltaChunk {
  return {
    id: input.id,
    object: input.object,
    delta: input.delta && convertMessageDelta(input.delta),
  };
}
function convertStreamingMessageDeltaContent(
  input: WireStreamingModels.MessageDeltaContent,
): PublicStreamingModels.MessageDeltaContent {
  switch (input.type) {
    case "text":
      return convertStreamingMessageTextContent(
        input as WireStreamingModels.MessageDeltaTextContent,
      );
    case "image":
      return convertStreamingMessageImageContent(
        input as WireStreamingModels.MessageDeltaImageFileContent,
      );
    default:
      logger.error(`Unknown message content type: ${input.type}`);
      return {
        index: input.index,
        type: input.type,
      };
  }
}

function convertStreamingMessageTextContent(
  input: WireStreamingModels.MessageDeltaTextContent,
): PublicStreamingModels.MessageDeltaTextContent {
  return {
    index: input.index,
    type: input.type,
    text: input.text && convertStreamingMessageTextDetails(input.text),
  };
}

function convertStreamingMessageTextDetails(
  input: WireStreamingModels.MessageDeltaTextContentObject,
): PublicStreamingModels.MessageDeltaTextContentObject {
  return {
    value: input.value,
    annotations: input.annotations?.map(convertStreamingMessageTextAnnotation),
  };
}

function convertStreamingMessageTextAnnotation(
  input: WireStreamingModels.MessageDeltaTextAnnotation,
): PublicStreamingModels.MessageDeltaTextAnnotation {
  switch (input.type) {
    case "file_citation":
      return convertStreamingMessageTextFileCitationAnnotation(
        input as WireStreamingModels.MessageDeltaTextFileCitationAnnotation,
      );
    case "file_path":
      return convertStreamingMessageTextFilePathAnnotation(
        input as WireStreamingModels.MessageDeltaTextFilePathAnnotation,
      );
    default:
      return input;
  }
}

function convertStreamingMessageTextFileCitationAnnotation(
  input: WireStreamingModels.MessageDeltaTextFileCitationAnnotation,
): PublicStreamingModels.MessageDeltaTextFileCitationAnnotation {
  return {
    index: input.index,
    type: input.type,
    text: input.text,
    fileCitation:
      input.file_citation && convertStreamingMessageTextFileCitationDetails(input.file_citation),
    startIndex: input.start_index,
    endIndex: input.end_index,
  };
}

function convertStreamingMessageTextFileCitationDetails(
  input: WireStreamingModels.MessageDeltaTextFileCitationAnnotationObject,
): PublicStreamingModels.MessageDeltaTextFileCitationAnnotationObject {
  return {
    fileId: input.file_id,
    quote: input.quote,
  };
}

function convertStreamingMessageTextFilePathAnnotation(
  input: WireStreamingModels.MessageDeltaTextFilePathAnnotation,
): PublicStreamingModels.MessageDeltaTextFilePathAnnotation {
  return {
    index: input.index,
    type: input.type,
    text: input.text,
    filePath: input.file_path && convertStreamingMessageTextFilePathDetails(input.file_path),
    startIndex: input.start_index,
    endIndex: input.end_index,
  };
}

function convertStreamingMessageTextFilePathDetails(
  input: WireStreamingModels.MessageDeltaTextFilePathAnnotationObject,
): PublicStreamingModels.MessageDeltaTextFilePathAnnotationObject {
  return {
    fileId: input.file_id,
  };
}

function convertStreamingMessageImageContent(
  input: WireStreamingModels.MessageDeltaImageFileContent,
): PublicStreamingModels.MessageDeltaImageFileContent {
  return {
    index: input.index,
    type: input.type,
    imageFile: input.image_file && convertStreamingMessageImageFileDetails(input.image_file),
  };
}

function convertStreamingMessageImageFileDetails(
  input: WireStreamingModels.MessageDeltaImageFileContentObject,
): PublicStreamingModels.MessageDeltaImageFileContentObject {
  return {
    fileId: input.file_id,
  };
}

export function convertRunStepDeltaChunk(
  input: WireStreamingModels.RunStepDeltaChunk,
): PublicStreamingModels.RunStepDeltaChunk {
  return {
    id: input.id,
    object: input.object,
    delta: input.delta && convertRunStepDelta(input.delta),
  };
}
function convertRunStepDelta(
  input: WireStreamingModels.RunStepDelta,
): PublicStreamingModels.RunStepDelta {
  return {
    stepDetails: input.step_details && convertRunStepDetailsDelta(input.step_details),
  };
}

function convertRunStepDetailsDelta(
  input: WireStreamingModels.RunStepDeltaDetail,
): PublicStreamingModels.RunStepDeltaDetail {
  switch (input.type) {
    case "message_creation":
      return convertRunStepMessageCreationDetailsDelta(
        input as WireStreamingModels.RunStepDeltaMessageCreation,
      );
    case "tool_call":
      return convertRunStepToolCallDetailsDelta(
        input as WireStreamingModels.RunStepDeltaToolCallObject,
      );
    default:
      logger.error(`Unknown run step type: ${input.type}`);
      return { type: input.type };
  }
}

function convertRunStepMessageCreationDetailsDelta(
  input: WireStreamingModels.RunStepDeltaMessageCreation,
): PublicStreamingModels.RunStepDeltaMessageCreation {
  return {
    type: input.type,
    messageCreation:
      input.message_creation && convertRunStepDeltaMessageCreationObject(input.message_creation),
  };
}

function convertRunStepDeltaMessageCreationObject(
  input: WireStreamingModels.RunStepDeltaMessageCreationObject,
): PublicStreamingModels.RunStepDeltaMessageCreationObject {
  return {
    messageId: input.message_id,
  };
}

function convertRunStepToolCallDetailsDelta(
  input: WireStreamingModels.RunStepDeltaToolCallObject,
): PublicStreamingModels.RunStepDeltaToolCallObject {
  return {
    type: input.type,
    toolCalls: input.tool_calls && input.tool_calls.map(convertRunStepToolCallDelta),
  };
}

function convertRunStepToolCallDelta(
  input: WireStreamingModels.RunStepDeltaToolCall,
): PublicStreamingModels.RunStepDeltaToolCall {
  switch (input.type) {
    case "code_interpreter":
      return convertRunStepCodeInterpreterToolCallDelta(
        input as WireStreamingModels.RunStepDeltaCodeInterpreterToolCall,
      );
    case "file_search":
      return convertRunStepFileSearchToolCallDelta(
        input as WireStreamingModels.RunStepDeltaFileSearchToolCall,
      );
    case "function":
      return convertRunStepFunctionToolCallDelta(
        input as WireStreamingModels.RunStepDeltaFunctionToolCall,
      );
    default:
      logger.error(`Unknown run step tool call type: ${input.type}`);
      return {
        index: input.index,
        id: input.id,
        type: input.type,
      };
  }
}

function convertRunStepCodeInterpreterToolCallDelta(
  input: WireStreamingModels.RunStepDeltaCodeInterpreterToolCall,
): PublicStreamingModels.RunStepDeltaCodeInterpreterToolCall {
  return {
    index: input.index,
    type: input.type,
    id: input.id,
    codeInterpreter:
      input.code_interpreter &&
      convertRunStepCodeInterpreterToolCallDetailsDelta(input.code_interpreter),
  };
}

function convertRunStepCodeInterpreterToolCallDetailsDelta(
  input: WireStreamingModels.RunStepDeltaCodeInterpreterDetailItemObject,
): PublicStreamingModels.RunStepDeltaCodeInterpreterDetailItemObject {
  return {
    input: input.input,
    outputs: input.outputs && input.outputs.map(convertRunStepCodeInterpreterToolCallOutputDelta),
  };
}

function convertRunStepCodeInterpreterToolCallOutputDelta(
  input: WireStreamingModels.RunStepDeltaCodeInterpreterOutput,
): PublicStreamingModels.RunStepDeltaCodeInterpreterOutput {
  switch (input.type) {
    case "logs":
      return convertRunStepCodeInterpreterLogOutputDelta(
        input as WireStreamingModels.RunStepDeltaCodeInterpreterLogOutput,
      );
    case "image":
      return convertRunStepCodeInterpreterImageOutputDelta(
        input as WireStreamingModels.RunStepDeltaCodeInterpreterImageOutput,
      );
    default:
      return input;
  }
}

function convertRunStepCodeInterpreterLogOutputDelta(
  input: WireStreamingModels.RunStepDeltaCodeInterpreterLogOutput,
): PublicStreamingModels.RunStepDeltaCodeInterpreterLogOutput {
  return {
    index: input.index,
    type: input.type,
    logs: input.logs,
  };
}

function convertRunStepCodeInterpreterImageOutputDelta(
  input: WireStreamingModels.RunStepDeltaCodeInterpreterImageOutput,
): PublicStreamingModels.RunStepDeltaCodeInterpreterImageOutput {
  return {
    index: input.index,
    type: input.type,
    image: input.image && convertRunStepCodeInterpreterImageReferenceDelta(input.image),
  };
}

function convertRunStepCodeInterpreterImageReferenceDelta(
  input: WireStreamingModels.RunStepDeltaCodeInterpreterImageOutputObject,
): PublicStreamingModels.RunStepDeltaCodeInterpreterImageOutputObject {
  return {
    fileId: input.file_id,
  };
}

function convertRunStepFunctionToolCallDelta(
  input: WireStreamingModels.RunStepDeltaFunctionToolCall,
): PublicStreamingModels.RunStepDeltaFunctionToolCall {
  return {
    index: input.index,
    type: input.type,
    id: input.id,
    function: input.function && convertRunStepFunctionToolCallDetailsDelta(input.function),
  };
}

function convertRunStepFunctionToolCallDetailsDelta(
  input: WireStreamingModels.RunStepDeltaFunction,
): PublicStreamingModels.RunStepDeltaFunction {
  return {
    name: input.name,
    arguments: input.arguments,
    output: input.output,
  };
}

function convertRunStepFileSearchToolCallDelta(
  input: WireStreamingModels.RunStepDeltaFileSearchToolCall,
): PublicStreamingModels.RunStepDeltaFileSearchToolCall {
  return {
    index: input.index,
    type: input.type,
    id: input.id,
    fileSearch: convertRunStepFileSearchToolCallResultsOutput(
      input.file_search as GeneratedModels.RunStepFileSearchToolCallResultsOutput,
    ),
  };
}
