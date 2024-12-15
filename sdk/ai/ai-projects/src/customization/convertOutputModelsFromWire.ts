// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type *  as GeneratedModels from "../generated/src/outputModels.js";
import type *  as PublicModels from "./outputModels.js";

// Conversion functions
export function convertToolDefinitionOutputParent(
  input: GeneratedModels.ToolDefinitionOutputParent
): PublicModels.ToolDefinitionOutputParent {
  return { ...input };
}

export function convertCodeInterpreterToolDefinitionOutput(
  input: GeneratedModels.CodeInterpreterToolDefinitionOutput
): PublicModels.CodeInterpreterToolDefinitionOutput {
  return { ...input };
}

export function convertFileSearchToolDefinitionOutput(
  input: GeneratedModels.FileSearchToolDefinitionOutput
): PublicModels.FileSearchToolDefinitionOutput {
  return {
    type: "file_search",
    fileSearch: input.file_search
      ? convertFileSearchToolDefinitionDetailsOutput(input.file_search)
      : undefined,
  };
}

export function convertFileSearchToolDefinitionDetailsOutput(
  input: GeneratedModels.FileSearchToolDefinitionDetailsOutput
): PublicModels.FileSearchToolDefinitionDetailsOutput {
  return {
    maxNumResults: input.max_num_results,
    rankingOptions: input.ranking_options
      ? convertFileSearchRankingOptionsOutput(input.ranking_options)
      : undefined,
  };
}

export function convertFileSearchRankingOptionsOutput(
  input: GeneratedModels.FileSearchRankingOptionsOutput
): PublicModels.FileSearchRankingOptionsOutput {
  return {
    ranker: input.ranker,
    scoreThreshold: input.score_threshold,
  };
}

export function convertFunctionToolDefinitionOutput(
  input: GeneratedModels.FunctionToolDefinitionOutput
): PublicModels.FunctionToolDefinitionOutput {
  return {
    type: "function",
    function: convertFunctionDefinitionOutput(input.function),
  };
}

export function convertFunctionDefinitionOutput(
  input: GeneratedModels.FunctionDefinitionOutput
): PublicModels.FunctionDefinitionOutput {
  return { ...input };
}

export function convertBingGroundingToolDefinitionOutput(
  input: GeneratedModels.BingGroundingToolDefinitionOutput
): PublicModels.BingGroundingToolDefinitionOutput {
  return {
    type: "bing_grounding",
    bingGrounding: convertToolConnectionListOutput(input.bing_grounding),
  };
}

export function convertToolConnectionListOutput(
  input: GeneratedModels.ToolConnectionListOutput
): PublicModels.ToolConnectionListOutput {
  return {
    connections: input.connections?.map(convertToolConnectionOutput),
  };
}

export function convertToolConnectionOutput(
  input: GeneratedModels.ToolConnectionOutput
): PublicModels.ToolConnectionOutput {
  return { connectionId: input.connection_id };
}

export function convertMicrosoftFabricToolDefinitionOutput(
  input: GeneratedModels.MicrosoftFabricToolDefinitionOutput
): PublicModels.MicrosoftFabricToolDefinitionOutput {
  return {
    type: "microsoft_fabric",
    microsoftFabric: convertToolConnectionListOutput(input.microsoft_fabric),
  };
}

export function convertSharepointToolDefinitionOutput(
  input: GeneratedModels.SharepointToolDefinitionOutput
): PublicModels.SharepointToolDefinitionOutput {
  return {
    type: "sharepoint_grounding",
    sharepointGrounding: convertToolConnectionListOutput(
      input.sharepoint_grounding
    ),
  };
}

export function convertAzureAISearchToolDefinitionOutput(
  input: GeneratedModels.AzureAISearchToolDefinitionOutput
): PublicModels.AzureAISearchToolDefinitionOutput {
  return { ...input };
}

export function convertToolResourcesOutput(
  input: GeneratedModels.ToolResourcesOutput
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

export function convertCodeInterpreterToolResourceOutput(
  input: GeneratedModels.CodeInterpreterToolResourceOutput
): PublicModels.CodeInterpreterToolResourceOutput {
  return {
    fileIds: input.file_ids,
    dataSources: input.data_sources?.map(convertVectorStoreDataSourceOutput),
  };
}

export function convertVectorStoreDataSourceOutput(
  input: GeneratedModels.VectorStoreDataSourceOutput
): PublicModels.VectorStoreDataSourceOutput {
  return { ...input };
}

export function convertFileSearchToolResourceOutput(
  input: GeneratedModels.FileSearchToolResourceOutput
): PublicModels.FileSearchToolResourceOutput {
  return {
    vectorStoreIds: input.vector_store_ids,
    vectorStores: input.vector_stores?.map(convertVectorStoreConfigurationsOutput),
  };
}

export function convertVectorStoreConfigurationsOutput(
  input: GeneratedModels.VectorStoreConfigurationsOutput
): PublicModels.VectorStoreConfigurationsOutput {
  return {
    name: input.name,
    configuration: convertVectorStoreConfigurationOutput(input.configuration),
  };
}

export function convertVectorStoreConfigurationOutput(
  input: GeneratedModels.VectorStoreConfigurationOutput
): PublicModels.VectorStoreConfigurationOutput {
  return {
    ...input,
    dataSources: input.data_sources.map(convertVectorStoreDataSourceOutput),
  };
}

export function convertAzureAISearchResourceOutput(
  input: GeneratedModels.AzureAISearchResourceOutput
): PublicModels.AzureAISearchResourceOutput {
  return {
    indexes: input.indexes?.map(convertIndexResourceOutput),
  };
}

export function convertIndexResourceOutput(
  input: GeneratedModels.IndexResourceOutput
): PublicModels.IndexResourceOutput {
  return { indexConnectionId: input.index_connection_id, indexName: input.index_name };
}

export function convertAgentsApiResponseFormatOutput(
  input: GeneratedModels.AgentsApiResponseFormatOutput
): PublicModels.AgentsApiResponseFormatOutput {
  return { ...input };
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
function convertToolDefinitionOutput(tool: GeneratedModels.ToolDefinitionOutput): PublicModels.ToolDefinitionOutput {
  switch (tool.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinitionOutput(tool as GeneratedModels.CodeInterpreterToolDefinitionOutput);
    case "file_search":
      return convertFileSearchToolDefinitionOutput(tool as GeneratedModels.FileSearchToolDefinitionOutput);
    case "function":
      return convertFunctionToolDefinitionOutput(tool as GeneratedModels.FunctionToolDefinitionOutput);
    case "bing_grounding":
      return convertBingGroundingToolDefinitionOutput(tool as GeneratedModels.BingGroundingToolDefinitionOutput);
    case "microsoft_fabric":
      return convertMicrosoftFabricToolDefinitionOutput(tool as GeneratedModels.MicrosoftFabricToolDefinitionOutput);
    case "sharepoint_grounding":
      return convertSharepointToolDefinitionOutput(tool as GeneratedModels.SharepointToolDefinitionOutput);
    case "azure_ai_search":
      return convertAzureAISearchToolDefinitionOutput(tool as GeneratedModels.AzureAISearchToolDefinitionOutput);
    default:
      return tool;
  }
}

export function convertAgentsApiResponseFormatOptionOutput(
  input: GeneratedModels.AgentsApiResponseFormatOptionOutput
): PublicModels.AgentsApiResponseFormatOptionOutput {
  return input;
}

export function convertOpenAIPageableListOfAgentOutput(
  input: GeneratedModels.OpenAIPageableListOfAgentOutput
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
  input: GeneratedModels.AgentDeletionStatusOutput
): PublicModels.AgentDeletionStatusOutput {
  return { ...input };
}

export function convertMessageAttachmentOutput(
  input: GeneratedModels.MessageAttachmentOutput
): PublicModels.MessageAttachmentOutput {
  return {
    fileId: input.file_id,
    dataSources: input.data_sources?.map(convertVectorStoreDataSourceOutput),
    tools: input.tools?.map(convertMessageAttachmentToolDefinitionOutput),
  };
}

function convertMessageAttachmentToolDefinitionOutput(input: GeneratedModels.MessageAttachmentToolDefinitionOutput): PublicModels.MessageAttachmentToolDefinitionOutput {
  switch (input.type) {
    case "code_interpreter":
      return convertCodeInterpreterToolDefinitionOutput(input as GeneratedModels.CodeInterpreterToolDefinitionOutput);
    case "file_search":
      return convertFileSearchToolDefinitionOutput(input as GeneratedModels.FileSearchToolDefinitionOutput);
    default:
      throw new Error(`Unknown tool type: ${input}`);
  };

}

export function convertAgentThreadOutput(
  input: GeneratedModels.AgentThreadOutput
): PublicModels.AgentThreadOutput {
  return {
    id: input.id,
    object: input.object,
    createdAt: new Date(input.created_at),
    toolResources: input.tool_resources
      ? convertToolResourcesOutput(input.tool_resources)
      : null,
    metadata: input.metadata,
  };
}

export function convertThreadDeletionStatusOutput(
  input: GeneratedModels.ThreadDeletionStatusOutput
): PublicModels.ThreadDeletionStatusOutput {
  return { ...input };
}

export function convertThreadMessageOutput(
  input: GeneratedModels.ThreadMessageOutput
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
    content: input.content.map(convertMessageContentOutput),
    assistantId: input.assistant_id,
    runId: input.run_id,
    attachments: !input.attachments ? input.attachments : input.attachments?.map(convertMessageAttachmentOutput),
    metadata: input.metadata,
  };
}

export function convertMessageIncompleteDetailsOutput(
  input: GeneratedModels.MessageIncompleteDetailsOutput
): PublicModels.MessageIncompleteDetailsOutput {
  return { ...input };
}

export function convertMessageContentOutput(
  input: GeneratedModels.MessageContentOutput
): PublicModels.MessageContentOutput {
  switch (input.type) {
    case "text":
      return convertMessageTextContentOutput(input as GeneratedModels.MessageTextContentOutput);
    case "image_file":
      return convertMessageImageFileContentOutput(
        input as GeneratedModels.MessageImageFileContentOutput
      );
    default:
      return { ...input };
  }
}

export function convertMessageTextContentOutput(
  input: GeneratedModels.MessageTextContentOutput
): PublicModels.MessageTextContentOutput {
  return {
    type: input.type,
    text: convertMessageTextDetailsOutput(input.text),
  };
}

export function convertMessageTextDetailsOutput(
  input: GeneratedModels.MessageTextDetailsOutput
): PublicModels.MessageTextDetailsOutput {
  return {
    value: input.value,
    annotations: input.annotations?.map(convertMessageTextAnnotationOutput),
  };
}

export function convertMessageTextAnnotationOutput(
  input: GeneratedModels.MessageTextAnnotationOutputParent
): PublicModels.MessageTextAnnotationOutput {
  switch (input.type) {
    case "file_citation":
      return convertMessageTextFileCitationAnnotationOutput(
        input as GeneratedModels.MessageTextFileCitationAnnotationOutput
      );
    case "file_path":
      return convertMessageTextFilePathAnnotationOutput(
        input as GeneratedModels.MessageTextFilePathAnnotationOutput
      );
    default:
      return { ...input };
  }
}

export function convertMessageTextFileCitationAnnotationOutput(
  input: GeneratedModels.MessageTextFileCitationAnnotationOutput
): PublicModels.MessageTextFileCitationAnnotationOutput {
  return {
    type: input.type,
    text: input.text,
    fileCitation: convertMessageTextFileCitationDetailsOutput(input.file_citation)
  };
}

export function convertMessageTextFileCitationDetailsOutput(
  input: GeneratedModels.MessageTextFileCitationDetailsOutput
): PublicModels.MessageTextFileCitationDetailsOutput {
  return {
    fileId: input.file_id,
    quote: input.quote
  };
}

export function convertMessageTextFilePathAnnotationOutput(
  input: GeneratedModels.MessageTextFilePathAnnotationOutput
): PublicModels.MessageTextFilePathAnnotationOutput {
  return {
    type: input.type,
    filePath: convertMessageTextFilePathDetailsOutput(input.file_path),
    startIndex: input.start_index,
    endIndex: input.end_index,
    text: input.text,
  };
}

export function convertMessageTextFilePathDetailsOutput(
  input: GeneratedModels.MessageTextFilePathDetailsOutput
): PublicModels.MessageTextFilePathDetailsOutput {
  return { fileId: input.file_id };
}

export function convertMessageImageFileContentOutput(
  input: GeneratedModels.MessageImageFileContentOutput
): PublicModels.MessageImageFileContentOutput {
  return {
    type: input.type,
    imageFile: convertMessageImageFileDetailsOutput(input.image_file)
  };
}

export function convertMessageImageFileDetailsOutput(
  input: GeneratedModels.MessageImageFileDetailsOutput
): PublicModels.MessageImageFileDetailsOutput {
  return { fileId: input.file_id };
}

export function convertThreadRunOutput(
  input: GeneratedModels.ThreadRunOutput
): PublicModels.ThreadRunOutput {
  return {
    id: input.id,
    object: input.object,
    threadId: input.thread_id,
    assistantId: input.assistant_id,
    status: input.status,
    lastError: input.last_error,
    model: input.model,
    instructions: input.instructions,
    tools: (input.tools && input.tools.map(convertToolDefinitionOutput)) ?? [],
    createdAt: new Date(input.created_at),
    expiresAt: input.expires_at ? new Date(input.expires_at) : null,
    startedAt: input.started_at ? new Date(input.started_at) : null,
    completedAt: input.completed_at ? new Date(input.completed_at) : null,
    cancelledAt: input.cancelled_at ? new Date(input.cancelled_at) : null,
    failedAt: input.failed_at ? new Date(input.failed_at) : null,
    incompleteDetails: input.incomplete_details,
    usage: input.usage ? convertRunStepCompletionUsageOutput(input.usage) : null,
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
  input: GeneratedModels.IncompleteRunDetailsOutput
): PublicModels.IncompleteRunDetailsOutput {
  return input;
}

export function convertRunErrorOutput(
  input: GeneratedModels.RunErrorOutput
): PublicModels.RunErrorOutput {
  return {
    message: input.message,
    code: input.code,
  };
}

export function convertRunCompletionUsageOutput(
  input: GeneratedModels.RunCompletionUsageOutput
): PublicModels.RunCompletionUsageOutput {
  return {
    completionTokens: input.completion_tokens,
    promptTokens: input.prompt_tokens,
    totalTokens: input.total_tokens,
  };
}

export function convertRequiredActionOutput(
  input: GeneratedModels.RequiredActionOutput
): PublicModels.RequiredActionOutput {
  switch (input.type) {
    case "submit_tool_outputs":
      return convertSubmitToolOutputsActionOutput(
        input as GeneratedModels.SubmitToolOutputsActionOutput
      );
    default:
      return { ...input };
  }
}

export function convertSubmitToolOutputsActionOutput(
  input: GeneratedModels.SubmitToolOutputsActionOutput
): PublicModels.SubmitToolOutputsActionOutput {
  return {
    type: input.type,
    submitToolOutputs: convertSubmitToolOutputsDetailsOutput(input.submit_tool_outputs),
  };
}

export function convertSubmitToolOutputsDetailsOutput(
  input: GeneratedModels.SubmitToolOutputsDetailsOutput
): PublicModels.SubmitToolOutputsDetailsOutput {
  return {
    toolCalls: input.tool_calls.map(
      convertRequiredToolCallOutput
    ),
  };
}

export function convertRequiredToolCallOutput(
  input: GeneratedModels.RequiredToolCallOutput
): PublicModels.RequiredToolCallOutput {
  switch (input.type) {
    case "function":
      return convertRequiredFunctionToolCallOutput(
        input as GeneratedModels.RequiredFunctionToolCallOutput
      );
    default:
      return { ...input };
  }
}

export function convertRequiredFunctionToolCallOutput(
  input: GeneratedModels.RequiredFunctionToolCallOutput
): PublicModels.RequiredFunctionToolCallOutput {
  return {
    id: input.id,
    type: input.type,
    function: convertRequiredFunctionToolCallDetailsOutput(input.function)
  };
}

export function convertRequiredFunctionToolCallDetailsOutput(
  input: GeneratedModels.RequiredFunctionToolCallDetailsOutput
): PublicModels.RequiredFunctionToolCallDetailsOutput {
  return {
    name: input.name,
    arguments: input.arguments,
  };
}

function convertTruncationObjectOutput(input: GeneratedModels.TruncationObjectOutput): PublicModels.TruncationObjectOutput {
  return {
    type: input.type,
    lastMessages: input.last_messages
  };

}

export function convertOpenAIPageableListOfThreadRunOutput(
  input: GeneratedModels.OpenAIPageableListOfThreadRunOutput
): PublicModels.OpenAIPageableListOfThreadRunOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data.map(convertThreadRunOutput),
  };
}
export function convertRunStepOutput(input: GeneratedModels.RunStepOutput): PublicModels.RunStepOutput {
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

export function convertRunStepDetailsOutput(
  input: GeneratedModels.RunStepDetailsOutput
): PublicModels.RunStepDetailsOutput {
  switch (input.type) {
    case "message_creation":
      return convertRunStepMessageCreationDetailsOutput(
        input as GeneratedModels.RunStepMessageCreationDetailsOutput
      );
    case "tool_call":
      return convertRunStepToolCallDetailsOutput(
        input as GeneratedModels.RunStepToolCallDetailsOutput
      );
    default:
      {
        throw new Error(`Unknown run step type: ${input.type}`);
      }
  }
}

export function convertRunStepMessageCreationDetailsOutput(
  input: GeneratedModels.RunStepMessageCreationDetailsOutput
): PublicModels.RunStepMessageCreationDetailsOutput {
  return {
    type: input.type,
    messageCreation: convertRunStepMessageCreationReferenceOutput(input.message_creation),
  };
}

export function convertRunStepMessageCreationReferenceOutput(
  input: GeneratedModels.RunStepMessageCreationReferenceOutput
): PublicModels.RunStepMessageCreationReferenceOutput {
  return {
    messageId: input.message_id,
  };
}

export function convertRunStepToolCallDetailsOutput(
  input: GeneratedModels.RunStepToolCallDetailsOutput
): PublicModels.RunStepToolCallDetailsOutput {
  return {
    type: input.type,
    toolCalls: input.tool_calls && input.tool_calls.map(convertRunStepToolCallOutput),
  };
}

export function convertRunStepToolCallOutput(
  input: GeneratedModels.RunStepToolCallOutput
): PublicModels.RunStepToolCallOutput {
  switch (input.type) {
    case "code_interpreter":
      return convertRunStepCodeInterpreterToolCallOutput(
        input as GeneratedModels.RunStepCodeInterpreterToolCallOutput
      );
    case "file_search":
      return convertRunStepFileSearchToolCallOutput(
        input as GeneratedModels.RunStepFileSearchToolCallOutput
      );
    case "bing_grounding":
      return convertRunStepBingGroundingToolCallOutput(
        input as GeneratedModels.RunStepBingGroundingToolCallOutput
      );
    case "azure_ai_search":
      return convertRunStepAzureAISearchToolCallOutput(
        input as GeneratedModels.RunStepAzureAISearchToolCallOutput
      );
    case "sharepoint_grounding":
      return convertRunStepSharepointToolCallOutput(
        input as GeneratedModels.RunStepSharepointToolCallOutput
      );
    case "microsoft_fabric":
      return convertRunStepMicrosoftFabricToolCallOutput(
        input as GeneratedModels.RunStepMicrosoftFabricToolCallOutput
      );
    case "function":
      return convertRunStepFunctionToolCallOutput(
        input as GeneratedModels.RunStepFunctionToolCallOutput
      );
    default:
      {
        throw new Error(`Unknown run step tool call type: ${input.type}`);
      }
  }
}

export function convertRunStepCodeInterpreterToolCallOutput(
  input: GeneratedModels.RunStepCodeInterpreterToolCallOutput
): PublicModels.RunStepCodeInterpreterToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    codeInterpreter: input.code_interpreter && convertRunStepCodeInterpreterToolCallDetailsOutput(input.code_interpreter),
  };
}

export function convertRunStepFileSearchToolCallOutput(
  input: GeneratedModels.RunStepFileSearchToolCallOutput
): PublicModels.RunStepFileSearchToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    fileSearch: input.file_search,
  };
}

export function convertRunStepBingGroundingToolCallOutput(
  input: GeneratedModels.RunStepBingGroundingToolCallOutput
): PublicModels.RunStepBingGroundingToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    bingGrounding: input.bing_grounding,
  };
}

export function convertRunStepAzureAISearchToolCallOutput(
  input: GeneratedModels.RunStepAzureAISearchToolCallOutput
): PublicModels.RunStepAzureAISearchToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    azureAISearch: input.azure_ai_search,
  };
}

export function convertRunStepSharepointToolCallOutput(
  input: GeneratedModels.RunStepSharepointToolCallOutput
): PublicModels.RunStepSharepointToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    sharepointGrounding: input.sharepoint_grounding,
  };
}

export function convertRunStepMicrosoftFabricToolCallOutput(
  input: GeneratedModels.RunStepMicrosoftFabricToolCallOutput
): PublicModels.RunStepMicrosoftFabricToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    microsoftFabric: input.microsoft_fabric,
  };
}

export function convertRunStepFunctionToolCallOutput(
  input: GeneratedModels.RunStepFunctionToolCallOutput
): PublicModels.RunStepFunctionToolCallOutput {
  return {
    type: input.type,
    id: input.id,
    function: convertRunStepFunctionToolCallDetailsOutput(input.function),
  };
}

export function convertRunStepFunctionToolCallDetailsOutput(
  input: GeneratedModels.RunStepFunctionToolCallDetailsOutput
): PublicModels.RunStepFunctionToolCallDetailsOutput {
  return {
    name: input.name,
    arguments: input.arguments,
    output: input.output,
  };
}

export function convertRunStepCodeInterpreterToolCallDetailsOutput(
  input: GeneratedModels.RunStepCodeInterpreterToolCallDetailsOutput
): PublicModels.RunStepCodeInterpreterToolCallDetailsOutput {
  return {
    input: input.input,
    outputs: input.outputs && input.outputs.map(convertRunStepCodeInterpreterToolCallOutputOutput),
  };
}

export function convertRunStepCodeInterpreterToolCallOutputOutput(
  input: GeneratedModels.RunStepCodeInterpreterToolCallOutputOutput
): PublicModels.RunStepCodeInterpreterToolCallOutputOutput {
  switch (input.type) {
    case "logs":
      return convertRunStepCodeInterpreterLogOutputOutput(
        input as GeneratedModels.RunStepCodeInterpreterLogOutputOutput
      );
    case "image":
      return convertRunStepCodeInterpreterImageOutputOutput(
        input as GeneratedModels.RunStepCodeInterpreterImageOutputOutput
      );
    default:
      return input;
  }
}

export function convertRunStepCodeInterpreterLogOutputOutput(
  input: GeneratedModels.RunStepCodeInterpreterLogOutputOutput
): PublicModels.RunStepCodeInterpreterLogOutputOutput {
  return {
    type: input.type,
    logs: input.logs,
  };
}

export function convertRunStepCodeInterpreterImageOutputOutput(
  input: GeneratedModels.RunStepCodeInterpreterImageOutputOutput
): PublicModels.RunStepCodeInterpreterImageOutputOutput {
  return {
    type: input.type,
    image: convertRunStepCodeInterpreterImageReferenceOutput(input.image),
  };
}

export function convertRunStepCodeInterpreterImageReferenceOutput(
  input: GeneratedModels.RunStepCodeInterpreterImageReferenceOutput
): PublicModels.RunStepCodeInterpreterImageReferenceOutput {
  return {
    fileId: input.file_id,
  };
}

export function convertRunStepErrorOutput(
  input: GeneratedModels.RunStepErrorOutput
): PublicModels.RunStepErrorOutput {
  return {
    code: input.code,
    message: input.message,
  };
}

export function convertRunStepCompletionUsageOutput(
  input: GeneratedModels.RunStepCompletionUsageOutput
): PublicModels.RunStepCompletionUsageOutput {
  return {
    completionTokens: input.completion_tokens,
    promptTokens: input.prompt_tokens,
    totalTokens: input.total_tokens,
  };
}

export function convertOpenAIPageableListOfRunStepOutput(
  input: GeneratedModels.OpenAIPageableListOfRunStepOutput
): PublicModels.OpenAIPageableListOfRunStepOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data && input.data.map(convertRunStepOutput),
  };
}

export function convertOpenAIPageableListOfThreadMessageOutput(
  input: GeneratedModels.OpenAIPageableListOfThreadMessageOutput
): PublicModels.OpenAIPageableListOfThreadMessageOutput {
  return {
    object: input.object,
    firstId: input.first_id,
    lastId: input.last_id,
    hasMore: input.has_more,
    data: input.data && input.data.map(convertThreadMessageOutput),
  };
}
