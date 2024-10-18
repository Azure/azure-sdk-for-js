// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  toolDefinitionUnionSerializer,
  toolResourcesSerializer,
  codeInterpreterToolResourceSerializer,
  fileSearchToolResourceSerializer,
  connectionListResourceSerializer,
  azureAISearchResourceSerializer,
  threadMessageOptionsSerializer,
  messageAttachmentSerializer,
  threadMessageSerializer,
  updateCodeInterpreterToolResourceOptionsSerializer,
  updateFileSearchToolResourceOptionsSerializer,
  toolOutputSerializer,
  vectorStoreChunkingStrategyRequestUnionSerializer,
  Agent,
  OpenAIPageableListOfAgent,
  AgentDeletionStatus,
  MessageRole,
  AgentThread,
  ThreadDeletionStatus,
  ThreadMessage,
  MessageStatus,
  MessageIncompleteDetailsReason,
  OpenAIPageableListOfThreadMessage,
  TruncationStrategy,
  ThreadRun,
  RunStatus,
  IncompleteRunDetails,
  OpenAIPageableListOfThreadRun,
  ToolOutput,
  RunStep,
  RunStepType,
  RunStepStatus,
  RunStepErrorCode,
  OpenAIPageableListOfRunStep,
  FilePurpose,
  FileListResponse,
  OpenAIFile,
  FileState,
  FileDeletionStatus,
  FileContentResponse,
  OpenAIPageableListOfVectorStore,
  VectorStore,
  VectorStoreStatus,
  VectorStoreExpirationPolicyAnchor,
  VectorStoreDeletionStatus,
  OpenAIPageableListOfVectorStoreFile,
  VectorStoreFile,
  VectorStoreFileStatus,
  VectorStoreFileErrorCode,
  VectorStoreFileDeletionStatus,
  VectorStoreFileBatch,
  VectorStoreFileBatchStatus,
} from "../../models/models.js";
import {
  deserializeToolDefinitionUnion,
  deserializeMessageContentUnion,
  deserializeRequiredActionUnion,
  deserializeRunStepDetailsUnion,
  deserializeVectorStoreChunkingStrategyResponseUnion,
} from "../../utils/deserializeUtil.js";
import { ClientContext as Client } from "../index.js";
import {
  StreamableMethod,
  operationOptionsToRequestParameters,
  PathUncheckedResponse,
  createRestError,
} from "@azure-rest/core-client";
import { serializeRecord } from "../../helpers/serializerHelpers.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";
import {
  AgentsCreateAgentOptionalParams,
  AgentsListAgentsOptionalParams,
  AgentsGetAgentOptionalParams,
  AgentsUpdateAgentOptionalParams,
  AgentsDeleteAgentOptionalParams,
  AgentsCreateThreadOptionalParams,
  AgentsGetThreadOptionalParams,
  AgentsUpdateThreadOptionalParams,
  AgentsDeleteThreadOptionalParams,
  AgentsCreateMessageOptionalParams,
  AgentsListMessagesOptionalParams,
  AgentsGetMessageOptionalParams,
  AgentsUpdateMessageOptionalParams,
  AgentsCreateRunOptionalParams,
  AgentsListRunsOptionalParams,
  AgentsGetRunOptionalParams,
  AgentsUpdateRunOptionalParams,
  AgentsSubmitToolOutputsToRunOptionalParams,
  AgentsCancelRunOptionalParams,
  AgentsCreateThreadAndRunOptionalParams,
  AgentsGetRunStepOptionalParams,
  AgentsListRunStepsOptionalParams,
  AgentsListFilesOptionalParams,
  AgentsUploadFileOptionalParams,
  AgentsDeleteFileOptionalParams,
  AgentsGetFileOptionalParams,
  AgentsGetFileContentOptionalParams,
  AgentsListVectorStoresOptionalParams,
  AgentsCreateVectorStoreOptionalParams,
  AgentsGetVectorStoreOptionalParams,
  AgentsModifyVectorStoreOptionalParams,
  AgentsDeleteVectorStoreOptionalParams,
  AgentsListVectorStoreFilesOptionalParams,
  AgentsCreateVectorStoreFileOptionalParams,
  AgentsGetVectorStoreFileOptionalParams,
  AgentsDeleteVectorStoreFileOptionalParams,
  AgentsCreateVectorStoreFileBatchOptionalParams,
  AgentsGetVectorStoreFileBatchOptionalParams,
  AgentsCancelVectorStoreFileBatchOptionalParams,
  AgentsListVectorStoreFileBatchFilesOptionalParams,
} from "../../models/options.js";

export function _createAgentSend(
  context: Client,
  model: string,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/assistants")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        model: model,
        name: options?.name,
        description: options?.description,
        instructions: options?.instructions,
        tools:
          options?.tools === undefined
            ? options?.tools
            : options?.tools.map((p) => toolDefinitionUnionSerializer(p)),
        tool_resources: {
          code_interpreter: !options?.toolResources?.codeInterpreter
            ? options?.toolResources?.codeInterpreter
            : codeInterpreterToolResourceSerializer(
                options?.toolResources?.codeInterpreter,
              ),
          file_search: !options?.toolResources?.fileSearch
            ? options?.toolResources?.fileSearch
            : fileSearchToolResourceSerializer(
                options?.toolResources?.fileSearch,
              ),
          bing_search: !options?.toolResources?.bingSearch
            ? options?.toolResources?.bingSearch
            : connectionListResourceSerializer(
                options?.toolResources?.bingSearch,
              ),
          microsoft_fabric: !options?.toolResources?.microsoftFabric
            ? options?.toolResources?.microsoftFabric
            : connectionListResourceSerializer(
                options?.toolResources?.microsoftFabric,
              ),
          sharepoint: !options?.toolResources?.sharePoint
            ? options?.toolResources?.sharePoint
            : connectionListResourceSerializer(
                options?.toolResources?.sharePoint,
              ),
          azure_ai_search: !options?.toolResources?.azureAISearch
            ? options?.toolResources?.azureAISearch
            : azureAISearchResourceSerializer(
                options?.toolResources?.azureAISearch,
              ),
        },
        temperature: options?.temperature,
        top_p: options?.topP,
        response_format: options?.responseFormat as any,
        metadata: options?.metadata,
      },
    });
}

export async function _createAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    toolResources:
      result.body.tool_resources === null
        ? null
        : {
            codeInterpreter: !result.body.tool_resources.code_interpreter
              ? undefined
              : {
                  fileIds:
                    result.body.tool_resources.code_interpreter?.["file_ids"],
                },
            fileSearch: !result.body.tool_resources.file_search
              ? undefined
              : {
                  vectorStoreIds:
                    result.body.tool_resources.file_search?.[
                      "vector_store_ids"
                    ],
                },
            bingSearch: !result.body.tool_resources.bing_search
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.bing_search?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.bing_search?.["connections"]
                      : result.body.tool_resources.bing_search?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            microsoftFabric: !result.body.tool_resources.microsoft_fabric
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.microsoft_fabric?.[
                      "connections"
                    ] === undefined
                      ? result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ]
                      : result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            sharePoint: !result.body.tool_resources.sharepoint
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.sharepoint?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.sharepoint?.["connections"]
                      : result.body.tool_resources.sharepoint?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            azureAISearch: !result.body.tool_resources.azure_ai_search
              ? undefined
              : {
                  indexList:
                    result.body.tool_resources.azure_ai_search?.["indexes"] ===
                    undefined
                      ? result.body.tool_resources.azure_ai_search?.["indexes"]
                      : result.body.tool_resources.azure_ai_search?.[
                          "indexes"
                        ].map((p: any) => {
                          return {
                            indexConnectionId: p["index_connection_id"],
                            indexName: p["index_name"],
                          };
                        }),
                },
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
  };
}

/** Creates a new agent. */
export async function createAgent(
  context: Client,
  model: string,
  options: AgentsCreateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _createAgentSend(context, model, options);
  return _createAgentDeserialize(result);
}

export function _listAgentsSend(
  context: Client,
  options: AgentsListAgentsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/assistants")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listAgentsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfAgent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        createdAt: new Date(p["created_at"]),
        name: p["name"],
        description: p["description"],
        model: p["model"],
        instructions: p["instructions"],
        tools: p["tools"].map((p: any) => deserializeToolDefinitionUnion(p)),
        toolResources:
          p.tool_resources === null
            ? null
            : {
                codeInterpreter: !p.tool_resources.code_interpreter
                  ? undefined
                  : {
                      fileIds: p.tool_resources.code_interpreter?.["file_ids"],
                    },
                fileSearch: !p.tool_resources.file_search
                  ? undefined
                  : {
                      vectorStoreIds:
                        p.tool_resources.file_search?.["vector_store_ids"],
                    },
                bingSearch: !p.tool_resources.bing_search
                  ? undefined
                  : {
                      connectionList:
                        p.tool_resources.bing_search?.["connections"] ===
                        undefined
                          ? p.tool_resources.bing_search?.["connections"]
                          : p.tool_resources.bing_search?.["connections"].map(
                              (p: any) => {
                                return { connectionId: p["connection_id"] };
                              },
                            ),
                    },
                microsoftFabric: !p.tool_resources.microsoft_fabric
                  ? undefined
                  : {
                      connectionList:
                        p.tool_resources.microsoft_fabric?.["connections"] ===
                        undefined
                          ? p.tool_resources.microsoft_fabric?.["connections"]
                          : p.tool_resources.microsoft_fabric?.[
                              "connections"
                            ].map((p: any) => {
                              return { connectionId: p["connection_id"] };
                            }),
                    },
                sharePoint: !p.tool_resources.sharepoint
                  ? undefined
                  : {
                      connectionList:
                        p.tool_resources.sharepoint?.["connections"] ===
                        undefined
                          ? p.tool_resources.sharepoint?.["connections"]
                          : p.tool_resources.sharepoint?.["connections"].map(
                              (p: any) => {
                                return { connectionId: p["connection_id"] };
                              },
                            ),
                    },
                azureAISearch: !p.tool_resources.azure_ai_search
                  ? undefined
                  : {
                      indexList:
                        p.tool_resources.azure_ai_search?.["indexes"] ===
                        undefined
                          ? p.tool_resources.azure_ai_search?.["indexes"]
                          : p.tool_resources.azure_ai_search?.["indexes"].map(
                              (p: any) => {
                                return {
                                  indexConnectionId: p["index_connection_id"],
                                  indexName: p["index_name"],
                                };
                              },
                            ),
                    },
              },
        temperature: p["temperature"],
        topP: p["top_p"],
        responseFormat: p["response_format"] as any,
        metadata: p["metadata"],
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Gets a list of agents that were previously created. */
export async function listAgents(
  context: Client,
  options: AgentsListAgentsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfAgent> {
  const result = await _listAgentsSend(context, options);
  return _listAgentsDeserialize(result);
}

export function _getAgentSend(
  context: Client,
  assistantId: string,
  options: AgentsGetAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    toolResources:
      result.body.tool_resources === null
        ? null
        : {
            codeInterpreter: !result.body.tool_resources.code_interpreter
              ? undefined
              : {
                  fileIds:
                    result.body.tool_resources.code_interpreter?.["file_ids"],
                },
            fileSearch: !result.body.tool_resources.file_search
              ? undefined
              : {
                  vectorStoreIds:
                    result.body.tool_resources.file_search?.[
                      "vector_store_ids"
                    ],
                },
            bingSearch: !result.body.tool_resources.bing_search
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.bing_search?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.bing_search?.["connections"]
                      : result.body.tool_resources.bing_search?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            microsoftFabric: !result.body.tool_resources.microsoft_fabric
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.microsoft_fabric?.[
                      "connections"
                    ] === undefined
                      ? result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ]
                      : result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            sharePoint: !result.body.tool_resources.sharepoint
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.sharepoint?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.sharepoint?.["connections"]
                      : result.body.tool_resources.sharepoint?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            azureAISearch: !result.body.tool_resources.azure_ai_search
              ? undefined
              : {
                  indexList:
                    result.body.tool_resources.azure_ai_search?.["indexes"] ===
                    undefined
                      ? result.body.tool_resources.azure_ai_search?.["indexes"]
                      : result.body.tool_resources.azure_ai_search?.[
                          "indexes"
                        ].map((p: any) => {
                          return {
                            indexConnectionId: p["index_connection_id"],
                            indexName: p["index_name"],
                          };
                        }),
                },
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
  };
}

/** Retrieves an existing agent. */
export async function getAgent(
  context: Client,
  assistantId: string,
  options: AgentsGetAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _getAgentSend(context, assistantId, options);
  return _getAgentDeserialize(result);
}

export function _updateAgentSend(
  context: Client,
  assistantId: string,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        model: options?.model,
        name: options?.name,
        description: options?.description,
        instructions: options?.instructions,
        tools:
          options?.tools === undefined
            ? options?.tools
            : options?.tools.map((p) => toolDefinitionUnionSerializer(p)),
        tool_resources: {
          code_interpreter: !options?.toolResources?.codeInterpreter
            ? options?.toolResources?.codeInterpreter
            : codeInterpreterToolResourceSerializer(
                options?.toolResources?.codeInterpreter,
              ),
          file_search: !options?.toolResources?.fileSearch
            ? options?.toolResources?.fileSearch
            : fileSearchToolResourceSerializer(
                options?.toolResources?.fileSearch,
              ),
          bing_search: !options?.toolResources?.bingSearch
            ? options?.toolResources?.bingSearch
            : connectionListResourceSerializer(
                options?.toolResources?.bingSearch,
              ),
          microsoft_fabric: !options?.toolResources?.microsoftFabric
            ? options?.toolResources?.microsoftFabric
            : connectionListResourceSerializer(
                options?.toolResources?.microsoftFabric,
              ),
          sharepoint: !options?.toolResources?.sharePoint
            ? options?.toolResources?.sharePoint
            : connectionListResourceSerializer(
                options?.toolResources?.sharePoint,
              ),
          azure_ai_search: !options?.toolResources?.azureAISearch
            ? options?.toolResources?.azureAISearch
            : azureAISearchResourceSerializer(
                options?.toolResources?.azureAISearch,
              ),
        },
        temperature: options?.temperature,
        top_p: options?.topP,
        response_format: options?.responseFormat as any,
        metadata: options?.metadata,
      },
    });
}

export async function _updateAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<Agent> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    description: result.body["description"],
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    toolResources:
      result.body.tool_resources === null
        ? null
        : {
            codeInterpreter: !result.body.tool_resources.code_interpreter
              ? undefined
              : {
                  fileIds:
                    result.body.tool_resources.code_interpreter?.["file_ids"],
                },
            fileSearch: !result.body.tool_resources.file_search
              ? undefined
              : {
                  vectorStoreIds:
                    result.body.tool_resources.file_search?.[
                      "vector_store_ids"
                    ],
                },
            bingSearch: !result.body.tool_resources.bing_search
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.bing_search?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.bing_search?.["connections"]
                      : result.body.tool_resources.bing_search?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            microsoftFabric: !result.body.tool_resources.microsoft_fabric
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.microsoft_fabric?.[
                      "connections"
                    ] === undefined
                      ? result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ]
                      : result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            sharePoint: !result.body.tool_resources.sharepoint
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.sharepoint?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.sharepoint?.["connections"]
                      : result.body.tool_resources.sharepoint?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            azureAISearch: !result.body.tool_resources.azure_ai_search
              ? undefined
              : {
                  indexList:
                    result.body.tool_resources.azure_ai_search?.["indexes"] ===
                    undefined
                      ? result.body.tool_resources.azure_ai_search?.["indexes"]
                      : result.body.tool_resources.azure_ai_search?.[
                          "indexes"
                        ].map((p: any) => {
                          return {
                            indexConnectionId: p["index_connection_id"],
                            indexName: p["index_name"],
                          };
                        }),
                },
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing agent. */
export async function updateAgent(
  context: Client,
  assistantId: string,
  options: AgentsUpdateAgentOptionalParams = { requestOptions: {} },
): Promise<Agent> {
  const result = await _updateAgentSend(context, assistantId, options);
  return _updateAgentDeserialize(result);
}

export function _deleteAgentSend(
  context: Client,
  assistantId: string,
  options: AgentsDeleteAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/assistants/{assistantId}", assistantId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
    object: result.body["object"],
  };
}

/** Deletes an agent. */
export async function deleteAgent(
  context: Client,
  assistantId: string,
  options: AgentsDeleteAgentOptionalParams = { requestOptions: {} },
): Promise<AgentDeletionStatus> {
  const result = await _deleteAgentSend(context, assistantId, options);
  return _deleteAgentDeserialize(result);
}

export function _createThreadSend(
  context: Client,
  options: AgentsCreateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        messages:
          options?.messages === undefined
            ? options?.messages
            : options?.messages.map(threadMessageOptionsSerializer),
        tool_resources: {
          code_interpreter: !options?.toolResources?.codeInterpreter
            ? options?.toolResources?.codeInterpreter
            : codeInterpreterToolResourceSerializer(
                options?.toolResources?.codeInterpreter,
              ),
          file_search: !options?.toolResources?.fileSearch
            ? options?.toolResources?.fileSearch
            : fileSearchToolResourceSerializer(
                options?.toolResources?.fileSearch,
              ),
          bing_search: !options?.toolResources?.bingSearch
            ? options?.toolResources?.bingSearch
            : connectionListResourceSerializer(
                options?.toolResources?.bingSearch,
              ),
          microsoft_fabric: !options?.toolResources?.microsoftFabric
            ? options?.toolResources?.microsoftFabric
            : connectionListResourceSerializer(
                options?.toolResources?.microsoftFabric,
              ),
          sharepoint: !options?.toolResources?.sharePoint
            ? options?.toolResources?.sharePoint
            : connectionListResourceSerializer(
                options?.toolResources?.sharePoint,
              ),
          azure_ai_search: !options?.toolResources?.azureAISearch
            ? options?.toolResources?.azureAISearch
            : azureAISearchResourceSerializer(
                options?.toolResources?.azureAISearch,
              ),
        },
        metadata: options?.metadata,
      },
    });
}

export async function _createThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    toolResources:
      result.body.tool_resources === null
        ? null
        : {
            codeInterpreter: !result.body.tool_resources.code_interpreter
              ? undefined
              : {
                  fileIds:
                    result.body.tool_resources.code_interpreter?.["file_ids"],
                },
            fileSearch: !result.body.tool_resources.file_search
              ? undefined
              : {
                  vectorStoreIds:
                    result.body.tool_resources.file_search?.[
                      "vector_store_ids"
                    ],
                },
            bingSearch: !result.body.tool_resources.bing_search
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.bing_search?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.bing_search?.["connections"]
                      : result.body.tool_resources.bing_search?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            microsoftFabric: !result.body.tool_resources.microsoft_fabric
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.microsoft_fabric?.[
                      "connections"
                    ] === undefined
                      ? result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ]
                      : result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            sharePoint: !result.body.tool_resources.sharepoint
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.sharepoint?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.sharepoint?.["connections"]
                      : result.body.tool_resources.sharepoint?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            azureAISearch: !result.body.tool_resources.azure_ai_search
              ? undefined
              : {
                  indexList:
                    result.body.tool_resources.azure_ai_search?.["indexes"] ===
                    undefined
                      ? result.body.tool_resources.azure_ai_search?.["indexes"]
                      : result.body.tool_resources.azure_ai_search?.[
                          "indexes"
                        ].map((p: any) => {
                          return {
                            indexConnectionId: p["index_connection_id"],
                            indexName: p["index_name"],
                          };
                        }),
                },
          },
    metadata: result.body["metadata"],
  };
}

/** Creates a new thread. Threads contain messages and can be run by agents. */
export async function createThread(
  context: Client,
  options: AgentsCreateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _createThreadSend(context, options);
  return _createThreadDeserialize(result);
}

export function _getThreadSend(
  context: Client,
  threadId: string,
  options: AgentsGetThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}", threadId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    toolResources:
      result.body.tool_resources === null
        ? null
        : {
            codeInterpreter: !result.body.tool_resources.code_interpreter
              ? undefined
              : {
                  fileIds:
                    result.body.tool_resources.code_interpreter?.["file_ids"],
                },
            fileSearch: !result.body.tool_resources.file_search
              ? undefined
              : {
                  vectorStoreIds:
                    result.body.tool_resources.file_search?.[
                      "vector_store_ids"
                    ],
                },
            bingSearch: !result.body.tool_resources.bing_search
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.bing_search?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.bing_search?.["connections"]
                      : result.body.tool_resources.bing_search?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            microsoftFabric: !result.body.tool_resources.microsoft_fabric
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.microsoft_fabric?.[
                      "connections"
                    ] === undefined
                      ? result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ]
                      : result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            sharePoint: !result.body.tool_resources.sharepoint
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.sharepoint?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.sharepoint?.["connections"]
                      : result.body.tool_resources.sharepoint?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            azureAISearch: !result.body.tool_resources.azure_ai_search
              ? undefined
              : {
                  indexList:
                    result.body.tool_resources.azure_ai_search?.["indexes"] ===
                    undefined
                      ? result.body.tool_resources.azure_ai_search?.["indexes"]
                      : result.body.tool_resources.azure_ai_search?.[
                          "indexes"
                        ].map((p: any) => {
                          return {
                            indexConnectionId: p["index_connection_id"],
                            indexName: p["index_name"],
                          };
                        }),
                },
          },
    metadata: result.body["metadata"],
  };
}

/** Gets information about an existing thread. */
export async function getThread(
  context: Client,
  threadId: string,
  options: AgentsGetThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _getThreadSend(context, threadId, options);
  return _getThreadDeserialize(result);
}

export function _updateThreadSend(
  context: Client,
  threadId: string,
  options: AgentsUpdateThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        tool_resources: {
          code_interpreter: !options?.toolResources?.codeInterpreter
            ? options?.toolResources?.codeInterpreter
            : codeInterpreterToolResourceSerializer(
                options?.toolResources?.codeInterpreter,
              ),
          file_search: !options?.toolResources?.fileSearch
            ? options?.toolResources?.fileSearch
            : fileSearchToolResourceSerializer(
                options?.toolResources?.fileSearch,
              ),
          bing_search: !options?.toolResources?.bingSearch
            ? options?.toolResources?.bingSearch
            : connectionListResourceSerializer(
                options?.toolResources?.bingSearch,
              ),
          microsoft_fabric: !options?.toolResources?.microsoftFabric
            ? options?.toolResources?.microsoftFabric
            : connectionListResourceSerializer(
                options?.toolResources?.microsoftFabric,
              ),
          sharepoint: !options?.toolResources?.sharePoint
            ? options?.toolResources?.sharePoint
            : connectionListResourceSerializer(
                options?.toolResources?.sharePoint,
              ),
          azure_ai_search: !options?.toolResources?.azureAISearch
            ? options?.toolResources?.azureAISearch
            : azureAISearchResourceSerializer(
                options?.toolResources?.azureAISearch,
              ),
        },
        metadata: options?.metadata,
      },
    });
}

export async function _updateThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<AgentThread> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    toolResources:
      result.body.tool_resources === null
        ? null
        : {
            codeInterpreter: !result.body.tool_resources.code_interpreter
              ? undefined
              : {
                  fileIds:
                    result.body.tool_resources.code_interpreter?.["file_ids"],
                },
            fileSearch: !result.body.tool_resources.file_search
              ? undefined
              : {
                  vectorStoreIds:
                    result.body.tool_resources.file_search?.[
                      "vector_store_ids"
                    ],
                },
            bingSearch: !result.body.tool_resources.bing_search
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.bing_search?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.bing_search?.["connections"]
                      : result.body.tool_resources.bing_search?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            microsoftFabric: !result.body.tool_resources.microsoft_fabric
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.microsoft_fabric?.[
                      "connections"
                    ] === undefined
                      ? result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ]
                      : result.body.tool_resources.microsoft_fabric?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            sharePoint: !result.body.tool_resources.sharepoint
              ? undefined
              : {
                  connectionList:
                    result.body.tool_resources.sharepoint?.["connections"] ===
                    undefined
                      ? result.body.tool_resources.sharepoint?.["connections"]
                      : result.body.tool_resources.sharepoint?.[
                          "connections"
                        ].map((p: any) => {
                          return { connectionId: p["connection_id"] };
                        }),
                },
            azureAISearch: !result.body.tool_resources.azure_ai_search
              ? undefined
              : {
                  indexList:
                    result.body.tool_resources.azure_ai_search?.["indexes"] ===
                    undefined
                      ? result.body.tool_resources.azure_ai_search?.["indexes"]
                      : result.body.tool_resources.azure_ai_search?.[
                          "indexes"
                        ].map((p: any) => {
                          return {
                            indexConnectionId: p["index_connection_id"],
                            indexName: p["index_name"],
                          };
                        }),
                },
          },
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing thread. */
export async function updateThread(
  context: Client,
  threadId: string,
  options: AgentsUpdateThreadOptionalParams = { requestOptions: {} },
): Promise<AgentThread> {
  const result = await _updateThreadSend(context, threadId, options);
  return _updateThreadDeserialize(result);
}

export function _deleteThreadSend(
  context: Client,
  threadId: string,
  options: AgentsDeleteThreadOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}", threadId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteThreadDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
    object: result.body["object"],
  };
}

/** Deletes an existing thread. */
export async function deleteThread(
  context: Client,
  threadId: string,
  options: AgentsDeleteThreadOptionalParams = { requestOptions: {} },
): Promise<ThreadDeletionStatus> {
  const result = await _deleteThreadSend(context, threadId, options);
  return _deleteThreadDeserialize(result);
}

export function _createMessageSend(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: AgentsCreateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/messages", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        role: role,
        content: content,
        attachments:
          options?.attachments === undefined || options?.attachments === null
            ? options?.attachments
            : options?.attachments.map(messageAttachmentSerializer),
        metadata: options?.metadata,
      },
    });
}

export async function _createMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    status: result.body["status"] as MessageStatus,
    incompleteDetails:
      result.body.incomplete_details === null
        ? null
        : {
            reason: result.body.incomplete_details[
              "reason"
            ] as MessageIncompleteDetailsReason,
          },
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    incompleteAt:
      result.body["incomplete_at"] === null
        ? null
        : new Date(result.body["incomplete_at"]),
    role: result.body["role"] as MessageRole,
    content: result.body["content"].map((p: any) =>
      deserializeMessageContentUnion(p),
    ),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    attachments:
      result.body["attachments"] === null
        ? result.body["attachments"]
        : result.body["attachments"].map((p: any) => {
            return { fileId: p["file_id"], tools: p["tools"] };
          }),
    metadata: result.body["metadata"],
  };
}

/** Creates a new message on a specified thread. */
export async function createMessage(
  context: Client,
  threadId: string,
  role: MessageRole,
  content: string,
  options: AgentsCreateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _createMessageSend(
    context,
    threadId,
    role,
    content,
    options,
  );
  return _createMessageDeserialize(result);
}

export function _listMessagesSend(
  context: Client,
  threadId: string,
  options: AgentsListMessagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/messages", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        runId: options?.runId,
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listMessagesDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        createdAt: new Date(p["created_at"]),
        threadId: p["thread_id"],
        status: p["status"] as MessageStatus,
        incompleteDetails:
          p.incomplete_details === null
            ? null
            : {
                reason: p.incomplete_details[
                  "reason"
                ] as MessageIncompleteDetailsReason,
              },
        completedAt:
          p["completed_at"] === null ? null : new Date(p["completed_at"]),
        incompleteAt:
          p["incomplete_at"] === null ? null : new Date(p["incomplete_at"]),
        role: p["role"] as MessageRole,
        content: p["content"].map((p: any) =>
          deserializeMessageContentUnion(p),
        ),
        assistantId: p["assistant_id"],
        runId: p["run_id"],
        attachments:
          p["attachments"] === null
            ? p["attachments"]
            : p["attachments"].map((p: any) => {
                return { fileId: p["file_id"], tools: p["tools"] };
              }),
        metadata: p["metadata"],
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Gets a list of messages that exist on a thread. */
export async function listMessages(
  context: Client,
  threadId: string,
  options: AgentsListMessagesOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfThreadMessage> {
  const result = await _listMessagesSend(context, threadId, options);
  return _listMessagesDeserialize(result);
}

export function _getMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AgentsGetMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    status: result.body["status"] as MessageStatus,
    incompleteDetails:
      result.body.incomplete_details === null
        ? null
        : {
            reason: result.body.incomplete_details[
              "reason"
            ] as MessageIncompleteDetailsReason,
          },
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    incompleteAt:
      result.body["incomplete_at"] === null
        ? null
        : new Date(result.body["incomplete_at"]),
    role: result.body["role"] as MessageRole,
    content: result.body["content"].map((p: any) =>
      deserializeMessageContentUnion(p),
    ),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    attachments:
      result.body["attachments"] === null
        ? result.body["attachments"]
        : result.body["attachments"].map((p: any) => {
            return { fileId: p["file_id"], tools: p["tools"] };
          }),
    metadata: result.body["metadata"],
  };
}

/** Gets an existing message from an existing thread. */
export async function getMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: AgentsGetMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _getMessageSend(context, threadId, messageId, options);
  return _getMessageDeserialize(result);
}

export function _updateMessageSend(
  context: Client,
  threadId: string,
  messageId: string,
  options: AgentsUpdateMessageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/messages/{messageId}", threadId, messageId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _updateMessageDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadMessage> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    threadId: result.body["thread_id"],
    status: result.body["status"] as MessageStatus,
    incompleteDetails:
      result.body.incomplete_details === null
        ? null
        : {
            reason: result.body.incomplete_details[
              "reason"
            ] as MessageIncompleteDetailsReason,
          },
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    incompleteAt:
      result.body["incomplete_at"] === null
        ? null
        : new Date(result.body["incomplete_at"]),
    role: result.body["role"] as MessageRole,
    content: result.body["content"].map((p: any) =>
      deserializeMessageContentUnion(p),
    ),
    assistantId: result.body["assistant_id"],
    runId: result.body["run_id"],
    attachments:
      result.body["attachments"] === null
        ? result.body["attachments"]
        : result.body["attachments"].map((p: any) => {
            return { fileId: p["file_id"], tools: p["tools"] };
          }),
    metadata: result.body["metadata"],
  };
}

/** Modifies an existing message on an existing thread. */
export async function updateMessage(
  context: Client,
  threadId: string,
  messageId: string,
  options: AgentsUpdateMessageOptionalParams = { requestOptions: {} },
): Promise<ThreadMessage> {
  const result = await _updateMessageSend(
    context,
    threadId,
    messageId,
    options,
  );
  return _updateMessageDeserialize(result);
}

export function _createRunSend(
  context: Client,
  threadId: string,
  assistantId: string,
  options: AgentsCreateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/runs", threadId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: assistantId,
        model: options?.model,
        instructions: options?.instructions,
        additional_instructions: options?.additionalInstructions,
        additional_messages:
          options?.additionalMessages === undefined ||
          options?.additionalMessages === null
            ? options?.additionalMessages
            : options?.additionalMessages.map(threadMessageSerializer),
        tools:
          options?.tools === undefined || options?.tools === null
            ? options?.tools
            : options?.tools.map((p) => toolDefinitionUnionSerializer(p)),
        stream: options?.stream,
        temperature: options?.temperature,
        top_p: options?.topP,
        max_prompt_tokens: options?.maxPromptTokens,
        max_completion_tokens: options?.maxCompletionTokens,
        truncation_strategy: {
          type: options?.truncationStrategy?.["type"],
          last_messages: options?.truncationStrategy?.["lastMessages"],
        },
        tool_choice: options?.toolChoice as any,
        response_format: options?.responseFormat as any,
        metadata: options?.metadata,
      },
    });
}

export async function _createRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"] as RunStatus,
    requiredAction: !result.body.requiredAction
      ? result.body.requiredAction
      : deserializeRequiredActionUnion(result.body.required_action),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    incompleteDetails: result.body[
      "incomplete_details"
    ] as IncompleteRunDetails,
    usage:
      result.body.usage === null
        ? null
        : {
            completionTokens: result.body.usage["completion_tokens"],
            promptTokens: result.body.usage["prompt_tokens"],
            totalTokens: result.body.usage["total_tokens"],
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    maxPromptTokens: result.body["max_prompt_tokens"],
    maxCompletionTokens: result.body["max_completion_tokens"],
    truncationStrategy:
      result.body.truncation_strategy === null
        ? null
        : {
            type: result.body.truncation_strategy["type"] as TruncationStrategy,
            lastMessages: result.body.truncation_strategy["last_messages"],
          },
    toolChoice: result.body["tool_choice"] as any,
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
    toolResources:
      result.body.tool_resources === null
        ? null
        : !result.body.tool_resources
          ? undefined
          : {
              codeInterpreter: !result.body.tool_resources?.code_interpreter
                ? undefined
                : {
                    fileIds:
                      result.body.tool_resources?.code_interpreter?.[
                        "file_ids"
                      ],
                  },
              fileSearch: !result.body.tool_resources?.file_search
                ? undefined
                : {
                    vectorStoreIds:
                      result.body.tool_resources?.file_search?.[
                        "vector_store_ids"
                      ],
                  },
              bingSearch: !result.body.tool_resources?.bing_search
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.bing_search?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.bing_search?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.bing_search?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              microsoftFabric: !result.body.tool_resources?.microsoft_fabric
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.microsoft_fabric?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              sharePoint: !result.body.tool_resources?.sharepoint
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.sharepoint?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              azureAISearch: !result.body.tool_resources?.azure_ai_search
                ? undefined
                : {
                    indexList:
                      result.body.tool_resources?.azure_ai_search?.[
                        "indexes"
                      ] === undefined
                        ? result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ]
                        : result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ].map((p: any) => {
                            return {
                              indexConnectionId: p["index_connection_id"],
                              indexName: p["index_name"],
                            };
                          }),
                  },
            },
    parallelToolCalls: result.body["parallelToolCalls"],
  };
}

/** Creates a new run for an agent thread. */
export async function createRun(
  context: Client,
  threadId: string,
  assistantId: string,
  options: AgentsCreateRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createRunSend(context, threadId, assistantId, options);
  return _createRunDeserialize(result);
}

export function _listRunsSend(
  context: Client,
  threadId: string,
  options: AgentsListRunsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/runs", threadId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        threadId: p["thread_id"],
        assistantId: p["assistant_id"],
        status: p["status"] as RunStatus,
        requiredAction: !p.requiredAction
          ? p.requiredAction
          : deserializeRequiredActionUnion(p.required_action),
        lastError:
          p.last_error === null
            ? null
            : { code: p.last_error["code"], message: p.last_error["message"] },
        model: p["model"],
        instructions: p["instructions"],
        tools: p["tools"].map((p: any) => deserializeToolDefinitionUnion(p)),
        createdAt: new Date(p["created_at"]),
        expiresAt: p["expires_at"] === null ? null : new Date(p["expires_at"]),
        startedAt: p["started_at"] === null ? null : new Date(p["started_at"]),
        completedAt:
          p["completed_at"] === null ? null : new Date(p["completed_at"]),
        cancelledAt:
          p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
        failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
        incompleteDetails: p["incomplete_details"] as IncompleteRunDetails,
        usage:
          p.usage === null
            ? null
            : {
                completionTokens: p.usage["completion_tokens"],
                promptTokens: p.usage["prompt_tokens"],
                totalTokens: p.usage["total_tokens"],
              },
        temperature: p["temperature"],
        topP: p["top_p"],
        maxPromptTokens: p["max_prompt_tokens"],
        maxCompletionTokens: p["max_completion_tokens"],
        truncationStrategy:
          p.truncation_strategy === null
            ? null
            : {
                type: p.truncation_strategy["type"] as TruncationStrategy,
                lastMessages: p.truncation_strategy["last_messages"],
              },
        toolChoice: p["tool_choice"] as any,
        responseFormat: p["response_format"] as any,
        metadata: p["metadata"],
        toolResources:
          p.tool_resources === null
            ? null
            : !p.tool_resources
              ? undefined
              : {
                  codeInterpreter: !p.tool_resources?.code_interpreter
                    ? undefined
                    : {
                        fileIds:
                          p.tool_resources?.code_interpreter?.["file_ids"],
                      },
                  fileSearch: !p.tool_resources?.file_search
                    ? undefined
                    : {
                        vectorStoreIds:
                          p.tool_resources?.file_search?.["vector_store_ids"],
                      },
                  bingSearch: !p.tool_resources?.bing_search
                    ? undefined
                    : {
                        connectionList:
                          p.tool_resources?.bing_search?.["connections"] ===
                          undefined
                            ? p.tool_resources?.bing_search?.["connections"]
                            : p.tool_resources?.bing_search?.[
                                "connections"
                              ].map((p: any) => {
                                return { connectionId: p["connection_id"] };
                              }),
                      },
                  microsoftFabric: !p.tool_resources?.microsoft_fabric
                    ? undefined
                    : {
                        connectionList:
                          p.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ] === undefined
                            ? p.tool_resources?.microsoft_fabric?.[
                                "connections"
                              ]
                            : p.tool_resources?.microsoft_fabric?.[
                                "connections"
                              ].map((p: any) => {
                                return { connectionId: p["connection_id"] };
                              }),
                      },
                  sharePoint: !p.tool_resources?.sharepoint
                    ? undefined
                    : {
                        connectionList:
                          p.tool_resources?.sharepoint?.["connections"] ===
                          undefined
                            ? p.tool_resources?.sharepoint?.["connections"]
                            : p.tool_resources?.sharepoint?.["connections"].map(
                                (p: any) => {
                                  return { connectionId: p["connection_id"] };
                                },
                              ),
                      },
                  azureAISearch: !p.tool_resources?.azure_ai_search
                    ? undefined
                    : {
                        indexList:
                          p.tool_resources?.azure_ai_search?.["indexes"] ===
                          undefined
                            ? p.tool_resources?.azure_ai_search?.["indexes"]
                            : p.tool_resources?.azure_ai_search?.[
                                "indexes"
                              ].map((p: any) => {
                                return {
                                  indexConnectionId: p["index_connection_id"],
                                  indexName: p["index_name"],
                                };
                              }),
                      },
                },
        parallelToolCalls: p["parallelToolCalls"],
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Gets a list of runs for a specified thread. */
export async function listRuns(
  context: Client,
  threadId: string,
  options: AgentsListRunsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfThreadRun> {
  const result = await _listRunsSend(context, threadId, options);
  return _listRunsDeserialize(result);
}

export function _getRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsGetRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"] as RunStatus,
    requiredAction: !result.body.requiredAction
      ? result.body.requiredAction
      : deserializeRequiredActionUnion(result.body.required_action),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    incompleteDetails: result.body[
      "incomplete_details"
    ] as IncompleteRunDetails,
    usage:
      result.body.usage === null
        ? null
        : {
            completionTokens: result.body.usage["completion_tokens"],
            promptTokens: result.body.usage["prompt_tokens"],
            totalTokens: result.body.usage["total_tokens"],
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    maxPromptTokens: result.body["max_prompt_tokens"],
    maxCompletionTokens: result.body["max_completion_tokens"],
    truncationStrategy:
      result.body.truncation_strategy === null
        ? null
        : {
            type: result.body.truncation_strategy["type"] as TruncationStrategy,
            lastMessages: result.body.truncation_strategy["last_messages"],
          },
    toolChoice: result.body["tool_choice"] as any,
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
    toolResources:
      result.body.tool_resources === null
        ? null
        : !result.body.tool_resources
          ? undefined
          : {
              codeInterpreter: !result.body.tool_resources?.code_interpreter
                ? undefined
                : {
                    fileIds:
                      result.body.tool_resources?.code_interpreter?.[
                        "file_ids"
                      ],
                  },
              fileSearch: !result.body.tool_resources?.file_search
                ? undefined
                : {
                    vectorStoreIds:
                      result.body.tool_resources?.file_search?.[
                        "vector_store_ids"
                      ],
                  },
              bingSearch: !result.body.tool_resources?.bing_search
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.bing_search?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.bing_search?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.bing_search?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              microsoftFabric: !result.body.tool_resources?.microsoft_fabric
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.microsoft_fabric?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              sharePoint: !result.body.tool_resources?.sharepoint
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.sharepoint?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              azureAISearch: !result.body.tool_resources?.azure_ai_search
                ? undefined
                : {
                    indexList:
                      result.body.tool_resources?.azure_ai_search?.[
                        "indexes"
                      ] === undefined
                        ? result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ]
                        : result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ].map((p: any) => {
                            return {
                              indexConnectionId: p["index_connection_id"],
                              indexName: p["index_name"],
                            };
                          }),
                  },
            },
    parallelToolCalls: result.body["parallelToolCalls"],
  };
}

/** Gets an existing run from an existing thread. */
export async function getRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsGetRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _getRunSend(context, threadId, runId, options);
  return _getRunDeserialize(result);
}

export function _updateRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsUpdateRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/runs/{runId}", threadId, runId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: { metadata: options?.metadata },
    });
}

export async function _updateRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"] as RunStatus,
    requiredAction: !result.body.requiredAction
      ? result.body.requiredAction
      : deserializeRequiredActionUnion(result.body.required_action),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    incompleteDetails: result.body[
      "incomplete_details"
    ] as IncompleteRunDetails,
    usage:
      result.body.usage === null
        ? null
        : {
            completionTokens: result.body.usage["completion_tokens"],
            promptTokens: result.body.usage["prompt_tokens"],
            totalTokens: result.body.usage["total_tokens"],
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    maxPromptTokens: result.body["max_prompt_tokens"],
    maxCompletionTokens: result.body["max_completion_tokens"],
    truncationStrategy:
      result.body.truncation_strategy === null
        ? null
        : {
            type: result.body.truncation_strategy["type"] as TruncationStrategy,
            lastMessages: result.body.truncation_strategy["last_messages"],
          },
    toolChoice: result.body["tool_choice"] as any,
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
    toolResources:
      result.body.tool_resources === null
        ? null
        : !result.body.tool_resources
          ? undefined
          : {
              codeInterpreter: !result.body.tool_resources?.code_interpreter
                ? undefined
                : {
                    fileIds:
                      result.body.tool_resources?.code_interpreter?.[
                        "file_ids"
                      ],
                  },
              fileSearch: !result.body.tool_resources?.file_search
                ? undefined
                : {
                    vectorStoreIds:
                      result.body.tool_resources?.file_search?.[
                        "vector_store_ids"
                      ],
                  },
              bingSearch: !result.body.tool_resources?.bing_search
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.bing_search?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.bing_search?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.bing_search?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              microsoftFabric: !result.body.tool_resources?.microsoft_fabric
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.microsoft_fabric?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              sharePoint: !result.body.tool_resources?.sharepoint
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.sharepoint?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              azureAISearch: !result.body.tool_resources?.azure_ai_search
                ? undefined
                : {
                    indexList:
                      result.body.tool_resources?.azure_ai_search?.[
                        "indexes"
                      ] === undefined
                        ? result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ]
                        : result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ].map((p: any) => {
                            return {
                              indexConnectionId: p["index_connection_id"],
                              indexName: p["index_name"],
                            };
                          }),
                  },
            },
    parallelToolCalls: result.body["parallelToolCalls"],
  };
}

/** Modifies an existing thread run. */
export async function updateRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsUpdateRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _updateRunSend(context, threadId, runId, options);
  return _updateRunDeserialize(result);
}

export function _submitToolOutputsToRunSend(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: AgentsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/threads/{threadId}/runs/{runId}/submit_tool_outputs",
      threadId,
      runId,
    )
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        tool_outputs: toolOutputs.map(toolOutputSerializer),
        stream: options?.stream,
      },
    });
}

export async function _submitToolOutputsToRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"] as RunStatus,
    requiredAction: !result.body.requiredAction
      ? result.body.requiredAction
      : deserializeRequiredActionUnion(result.body.required_action),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    incompleteDetails: result.body[
      "incomplete_details"
    ] as IncompleteRunDetails,
    usage:
      result.body.usage === null
        ? null
        : {
            completionTokens: result.body.usage["completion_tokens"],
            promptTokens: result.body.usage["prompt_tokens"],
            totalTokens: result.body.usage["total_tokens"],
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    maxPromptTokens: result.body["max_prompt_tokens"],
    maxCompletionTokens: result.body["max_completion_tokens"],
    truncationStrategy:
      result.body.truncation_strategy === null
        ? null
        : {
            type: result.body.truncation_strategy["type"] as TruncationStrategy,
            lastMessages: result.body.truncation_strategy["last_messages"],
          },
    toolChoice: result.body["tool_choice"] as any,
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
    toolResources:
      result.body.tool_resources === null
        ? null
        : !result.body.tool_resources
          ? undefined
          : {
              codeInterpreter: !result.body.tool_resources?.code_interpreter
                ? undefined
                : {
                    fileIds:
                      result.body.tool_resources?.code_interpreter?.[
                        "file_ids"
                      ],
                  },
              fileSearch: !result.body.tool_resources?.file_search
                ? undefined
                : {
                    vectorStoreIds:
                      result.body.tool_resources?.file_search?.[
                        "vector_store_ids"
                      ],
                  },
              bingSearch: !result.body.tool_resources?.bing_search
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.bing_search?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.bing_search?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.bing_search?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              microsoftFabric: !result.body.tool_resources?.microsoft_fabric
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.microsoft_fabric?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              sharePoint: !result.body.tool_resources?.sharepoint
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.sharepoint?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              azureAISearch: !result.body.tool_resources?.azure_ai_search
                ? undefined
                : {
                    indexList:
                      result.body.tool_resources?.azure_ai_search?.[
                        "indexes"
                      ] === undefined
                        ? result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ]
                        : result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ].map((p: any) => {
                            return {
                              indexConnectionId: p["index_connection_id"],
                              indexName: p["index_name"],
                            };
                          }),
                  },
            },
    parallelToolCalls: result.body["parallelToolCalls"],
  };
}

/** Submits outputs from tools as requested by tool calls in a run. Runs that need submitted tool outputs will have a status of 'requires_action' with a required_action.type of 'submit_tool_outputs'. */
export async function submitToolOutputsToRun(
  context: Client,
  threadId: string,
  runId: string,
  toolOutputs: ToolOutput[],
  options: AgentsSubmitToolOutputsToRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _submitToolOutputsToRunSend(
    context,
    threadId,
    runId,
    toolOutputs,
    options,
  );
  return _submitToolOutputsToRunDeserialize(result);
}

export function _cancelRunSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsCancelRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/runs/{runId}/cancel", threadId, runId)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"] as RunStatus,
    requiredAction: !result.body.requiredAction
      ? result.body.requiredAction
      : deserializeRequiredActionUnion(result.body.required_action),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    incompleteDetails: result.body[
      "incomplete_details"
    ] as IncompleteRunDetails,
    usage:
      result.body.usage === null
        ? null
        : {
            completionTokens: result.body.usage["completion_tokens"],
            promptTokens: result.body.usage["prompt_tokens"],
            totalTokens: result.body.usage["total_tokens"],
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    maxPromptTokens: result.body["max_prompt_tokens"],
    maxCompletionTokens: result.body["max_completion_tokens"],
    truncationStrategy:
      result.body.truncation_strategy === null
        ? null
        : {
            type: result.body.truncation_strategy["type"] as TruncationStrategy,
            lastMessages: result.body.truncation_strategy["last_messages"],
          },
    toolChoice: result.body["tool_choice"] as any,
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
    toolResources:
      result.body.tool_resources === null
        ? null
        : !result.body.tool_resources
          ? undefined
          : {
              codeInterpreter: !result.body.tool_resources?.code_interpreter
                ? undefined
                : {
                    fileIds:
                      result.body.tool_resources?.code_interpreter?.[
                        "file_ids"
                      ],
                  },
              fileSearch: !result.body.tool_resources?.file_search
                ? undefined
                : {
                    vectorStoreIds:
                      result.body.tool_resources?.file_search?.[
                        "vector_store_ids"
                      ],
                  },
              bingSearch: !result.body.tool_resources?.bing_search
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.bing_search?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.bing_search?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.bing_search?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              microsoftFabric: !result.body.tool_resources?.microsoft_fabric
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.microsoft_fabric?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              sharePoint: !result.body.tool_resources?.sharepoint
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.sharepoint?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              azureAISearch: !result.body.tool_resources?.azure_ai_search
                ? undefined
                : {
                    indexList:
                      result.body.tool_resources?.azure_ai_search?.[
                        "indexes"
                      ] === undefined
                        ? result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ]
                        : result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ].map((p: any) => {
                            return {
                              indexConnectionId: p["index_connection_id"],
                              indexName: p["index_name"],
                            };
                          }),
                  },
            },
    parallelToolCalls: result.body["parallelToolCalls"],
  };
}

/** Cancels a run of an in progress thread. */
export async function cancelRun(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsCancelRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _cancelRunSend(context, threadId, runId, options);
  return _cancelRunDeserialize(result);
}

export function _createThreadAndRunSend(
  context: Client,
  assistantId: string,
  options: AgentsCreateThreadAndRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/runs")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        assistant_id: assistantId,
        thread: {
          messages:
            options?.thread?.["messages"] === undefined
              ? options?.thread?.["messages"]
              : options?.thread?.["messages"].map(
                  threadMessageOptionsSerializer,
                ),
          tool_resources: !options?.thread?.toolResources
            ? options?.thread?.toolResources
            : toolResourcesSerializer(options?.thread?.toolResources),
          metadata: !options?.thread?.metadata
            ? options?.thread?.metadata
            : (serializeRecord(options?.thread?.metadata as any) as any),
        },
        model: options?.model,
        instructions: options?.instructions,
        tools:
          options?.tools === undefined || options?.tools === null
            ? options?.tools
            : options?.tools.map((p) => toolDefinitionUnionSerializer(p)),
        tool_resources: {
          code_interpreter: !options?.toolResources?.codeInterpreter
            ? options?.toolResources?.codeInterpreter
            : updateCodeInterpreterToolResourceOptionsSerializer(
                options?.toolResources?.codeInterpreter,
              ),
          file_search: !options?.toolResources?.fileSearch
            ? options?.toolResources?.fileSearch
            : updateFileSearchToolResourceOptionsSerializer(
                options?.toolResources?.fileSearch,
              ),
          bing_search: !options?.toolResources?.bingSearch
            ? options?.toolResources?.bingSearch
            : connectionListResourceSerializer(
                options?.toolResources?.bingSearch,
              ),
          microsoft_fabric: !options?.toolResources?.microsoftFabric
            ? options?.toolResources?.microsoftFabric
            : connectionListResourceSerializer(
                options?.toolResources?.microsoftFabric,
              ),
          sharepoint: !options?.toolResources?.sharePoint
            ? options?.toolResources?.sharePoint
            : connectionListResourceSerializer(
                options?.toolResources?.sharePoint,
              ),
          azure_ai_search: !options?.toolResources?.azureAISearch
            ? options?.toolResources?.azureAISearch
            : azureAISearchResourceSerializer(
                options?.toolResources?.azureAISearch,
              ),
        },
        stream: options?.stream,
        temperature: options?.temperature,
        top_p: options?.topP,
        max_prompt_tokens: options?.maxPromptTokens,
        max_completion_tokens: options?.maxCompletionTokens,
        truncation_strategy: {
          type: options?.truncationStrategy?.["type"],
          last_messages: options?.truncationStrategy?.["lastMessages"],
        },
        tool_choice: options?.toolChoice as any,
        response_format: options?.responseFormat as any,
        metadata: options?.metadata,
      },
    });
}

export async function _createThreadAndRunDeserialize(
  result: PathUncheckedResponse,
): Promise<ThreadRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    threadId: result.body["thread_id"],
    assistantId: result.body["assistant_id"],
    status: result.body["status"] as RunStatus,
    requiredAction: !result.body.requiredAction
      ? result.body.requiredAction
      : deserializeRequiredActionUnion(result.body.required_action),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"],
            message: result.body.last_error["message"],
          },
    model: result.body["model"],
    instructions: result.body["instructions"],
    tools: result.body["tools"].map((p: any) =>
      deserializeToolDefinitionUnion(p),
    ),
    createdAt: new Date(result.body["created_at"]),
    expiresAt:
      result.body["expires_at"] === null
        ? null
        : new Date(result.body["expires_at"]),
    startedAt:
      result.body["started_at"] === null
        ? null
        : new Date(result.body["started_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    incompleteDetails: result.body[
      "incomplete_details"
    ] as IncompleteRunDetails,
    usage:
      result.body.usage === null
        ? null
        : {
            completionTokens: result.body.usage["completion_tokens"],
            promptTokens: result.body.usage["prompt_tokens"],
            totalTokens: result.body.usage["total_tokens"],
          },
    temperature: result.body["temperature"],
    topP: result.body["top_p"],
    maxPromptTokens: result.body["max_prompt_tokens"],
    maxCompletionTokens: result.body["max_completion_tokens"],
    truncationStrategy:
      result.body.truncation_strategy === null
        ? null
        : {
            type: result.body.truncation_strategy["type"] as TruncationStrategy,
            lastMessages: result.body.truncation_strategy["last_messages"],
          },
    toolChoice: result.body["tool_choice"] as any,
    responseFormat: result.body["response_format"] as any,
    metadata: result.body["metadata"],
    toolResources:
      result.body.tool_resources === null
        ? null
        : !result.body.tool_resources
          ? undefined
          : {
              codeInterpreter: !result.body.tool_resources?.code_interpreter
                ? undefined
                : {
                    fileIds:
                      result.body.tool_resources?.code_interpreter?.[
                        "file_ids"
                      ],
                  },
              fileSearch: !result.body.tool_resources?.file_search
                ? undefined
                : {
                    vectorStoreIds:
                      result.body.tool_resources?.file_search?.[
                        "vector_store_ids"
                      ],
                  },
              bingSearch: !result.body.tool_resources?.bing_search
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.bing_search?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.bing_search?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.bing_search?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              microsoftFabric: !result.body.tool_resources?.microsoft_fabric
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.microsoft_fabric?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.microsoft_fabric?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              sharePoint: !result.body.tool_resources?.sharepoint
                ? undefined
                : {
                    connectionList:
                      result.body.tool_resources?.sharepoint?.[
                        "connections"
                      ] === undefined
                        ? result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ]
                        : result.body.tool_resources?.sharepoint?.[
                            "connections"
                          ].map((p: any) => {
                            return { connectionId: p["connection_id"] };
                          }),
                  },
              azureAISearch: !result.body.tool_resources?.azure_ai_search
                ? undefined
                : {
                    indexList:
                      result.body.tool_resources?.azure_ai_search?.[
                        "indexes"
                      ] === undefined
                        ? result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ]
                        : result.body.tool_resources?.azure_ai_search?.[
                            "indexes"
                          ].map((p: any) => {
                            return {
                              indexConnectionId: p["index_connection_id"],
                              indexName: p["index_name"],
                            };
                          }),
                  },
            },
    parallelToolCalls: result.body["parallelToolCalls"],
  };
}

/** Creates a new agent thread and immediately starts a run using that new thread. */
export async function createThreadAndRun(
  context: Client,
  assistantId: string,
  options: AgentsCreateThreadAndRunOptionalParams = { requestOptions: {} },
): Promise<ThreadRun> {
  const result = await _createThreadAndRunSend(context, assistantId, options);
  return _createThreadAndRunDeserialize(result);
}

export function _getRunStepSend(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: AgentsGetRunStepOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/threads/{threadId}/runs/{runId}/steps/{stepId}",
      threadId,
      runId,
      stepId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getRunStepDeserialize(
  result: PathUncheckedResponse,
): Promise<RunStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    type: result.body["type"] as RunStepType,
    assistantId: result.body["assistant_id"],
    threadId: result.body["thread_id"],
    runId: result.body["run_id"],
    status: result.body["status"] as RunStepStatus,
    stepDetails: deserializeRunStepDetailsUnion(result.body.step_details),
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"] as RunStepErrorCode,
            message: result.body.last_error["message"],
          },
    createdAt: new Date(result.body["created_at"]),
    expiredAt:
      result.body["expired_at"] === null
        ? null
        : new Date(result.body["expired_at"]),
    completedAt:
      result.body["completed_at"] === null
        ? null
        : new Date(result.body["completed_at"]),
    cancelledAt:
      result.body["cancelled_at"] === null
        ? null
        : new Date(result.body["cancelled_at"]),
    failedAt:
      result.body["failed_at"] === null
        ? null
        : new Date(result.body["failed_at"]),
    usage:
      result.body.usage === null
        ? null
        : !result.body.usage
          ? undefined
          : {
              completionTokens: result.body.usage?.["completion_tokens"],
              promptTokens: result.body.usage?.["prompt_tokens"],
              totalTokens: result.body.usage?.["total_tokens"],
            },
    metadata: result.body["metadata"],
  };
}

/** Gets a single run step from a thread run. */
export async function getRunStep(
  context: Client,
  threadId: string,
  runId: string,
  stepId: string,
  options: AgentsGetRunStepOptionalParams = { requestOptions: {} },
): Promise<RunStep> {
  const result = await _getRunStepSend(
    context,
    threadId,
    runId,
    stepId,
    options,
  );
  return _getRunStepDeserialize(result);
}

export function _listRunStepsSend(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsListRunStepsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/threads/{threadId}/runs/{runId}/steps", threadId, runId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listRunStepsDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfRunStep> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        type: p["type"] as RunStepType,
        assistantId: p["assistant_id"],
        threadId: p["thread_id"],
        runId: p["run_id"],
        status: p["status"] as RunStepStatus,
        stepDetails: deserializeRunStepDetailsUnion(p.step_details),
        lastError:
          p.last_error === null
            ? null
            : {
                code: p.last_error["code"] as RunStepErrorCode,
                message: p.last_error["message"],
              },
        createdAt: new Date(p["created_at"]),
        expiredAt: p["expired_at"] === null ? null : new Date(p["expired_at"]),
        completedAt:
          p["completed_at"] === null ? null : new Date(p["completed_at"]),
        cancelledAt:
          p["cancelled_at"] === null ? null : new Date(p["cancelled_at"]),
        failedAt: p["failed_at"] === null ? null : new Date(p["failed_at"]),
        usage:
          p.usage === null
            ? null
            : !p.usage
              ? undefined
              : {
                  completionTokens: p.usage?.["completion_tokens"],
                  promptTokens: p.usage?.["prompt_tokens"],
                  totalTokens: p.usage?.["total_tokens"],
                },
        metadata: p["metadata"],
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Gets a list of run steps from a thread run. */
export async function listRunSteps(
  context: Client,
  threadId: string,
  runId: string,
  options: AgentsListRunStepsOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfRunStep> {
  const result = await _listRunStepsSend(context, threadId, runId, options);
  return _listRunStepsDeserialize(result);
}

export function _listFilesSend(
  context: Client,
  options: AgentsListFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/files")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { purpose: options?.purpose },
    });
}

export async function _listFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<FileListResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        object: p["object"],
        id: p["id"],
        bytes: p["bytes"],
        filename: p["filename"],
        createdAt: new Date(p["created_at"]),
        purpose: p["purpose"] as FilePurpose,
        status: p["status"] as FileState,
        statusDetails: p["status_details"],
      };
    }),
  };
}

/** Gets a list of previously uploaded files. */
export async function listFiles(
  context: Client,
  options: AgentsListFilesOptionalParams = { requestOptions: {} },
): Promise<FileListResponse> {
  const result = await _listFilesSend(context, options);
  return _listFilesDeserialize(result);
}

export function _uploadFileSend(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: AgentsUploadFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/files")
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: (options.contentType as any) ?? "multipart/form-data",
      body: {
        file: uint8ArrayToString(file, "base64"),
        purpose: purpose,
        filename: options?.filename,
      },
    });
}

export async function _uploadFileDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"] as FilePurpose,
    status: result.body["status"] as FileState,
    statusDetails: result.body["status_details"],
  };
}

/** Uploads a file for use by other operations. */
export async function uploadFile(
  context: Client,
  file: Uint8Array,
  purpose: FilePurpose,
  options: AgentsUploadFileOptionalParams = { requestOptions: {} },
): Promise<OpenAIFile> {
  const result = await _uploadFileSend(context, file, purpose, options);
  return _uploadFileDeserialize(result);
}

export function _deleteFileSend(
  context: Client,
  fileId: string,
  options: AgentsDeleteFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/files/{fileId}", fileId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteFileDeserialize(
  result: PathUncheckedResponse,
): Promise<FileDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
    object: result.body["object"],
  };
}

/** Delete a previously uploaded file. */
export async function deleteFile(
  context: Client,
  fileId: string,
  options: AgentsDeleteFileOptionalParams = { requestOptions: {} },
): Promise<FileDeletionStatus> {
  const result = await _deleteFileSend(context, fileId, options);
  return _deleteFileDeserialize(result);
}

export function _getFileSend(
  context: Client,
  fileId: string,
  options: AgentsGetFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/files/{fileId}", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getFileDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    id: result.body["id"],
    bytes: result.body["bytes"],
    filename: result.body["filename"],
    createdAt: new Date(result.body["created_at"]),
    purpose: result.body["purpose"] as FilePurpose,
    status: result.body["status"] as FileState,
    statusDetails: result.body["status_details"],
  };
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFile(
  context: Client,
  fileId: string,
  options: AgentsGetFileOptionalParams = { requestOptions: {} },
): Promise<OpenAIFile> {
  const result = await _getFileSend(context, fileId, options);
  return _getFileDeserialize(result);
}

export function _getFileContentSend(
  context: Client,
  fileId: string,
  options: AgentsGetFileContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/files/{fileId}/content", fileId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getFileContentDeserialize(
  result: PathUncheckedResponse,
): Promise<FileContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    content:
      typeof result.body["content"] === "string"
        ? stringToUint8Array(result.body["content"], "base64")
        : result.body["content"],
  };
}

/** Returns information about a specific file. Does not retrieve file content. */
export async function getFileContent(
  context: Client,
  fileId: string,
  options: AgentsGetFileContentOptionalParams = { requestOptions: {} },
): Promise<FileContentResponse> {
  const result = await _getFileContentSend(context, fileId, options);
  return _getFileContentDeserialize(result);
}

export function _listVectorStoresSend(
  context: Client,
  options: AgentsListVectorStoresOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listVectorStoresDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfVectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        createdAt: new Date(p["created_at"]),
        name: p["name"],
        usageBytes: p["usage_bytes"],
        fileCounts: {
          inProgress: p.file_counts["in_progress"],
          completed: p.file_counts["completed"],
          failed: p.file_counts["failed"],
          cancelled: p.file_counts["cancelled"],
          total: p.file_counts["total"],
        },
        status: p["status"] as VectorStoreStatus,
        expiresAfter: !p.expires_after
          ? undefined
          : {
              anchor: p.expires_after?.[
                "anchor"
              ] as VectorStoreExpirationPolicyAnchor,
              days: p.expires_after?.["days"],
            },
        expiresAt:
          p["expires_at"] !== undefined ? new Date(p["expires_at"]) : undefined,
        lastActiveAt:
          p["last_active_at"] === null ? null : new Date(p["last_active_at"]),
        metadata: p["metadata"],
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of vector stores. */
export async function listVectorStores(
  context: Client,
  options: AgentsListVectorStoresOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfVectorStore> {
  const result = await _listVectorStoresSend(context, options);
  return _listVectorStoresDeserialize(result);
}

export function _createVectorStoreSend(
  context: Client,
  options: AgentsCreateVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        file_ids: options?.fileIds,
        name: options?.name,
        expires_after: {
          anchor: options?.expiresAfter?.["anchor"],
          days: options?.expiresAfter?.["days"],
        },
        chunking_strategy: vectorStoreChunkingStrategyRequestUnionSerializer(
          options?.chunkingStrategy,
        ),
        metadata: options?.metadata,
      },
    });
}

export async function _createVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    usageBytes: result.body["usage_bytes"],
    fileCounts: {
      inProgress: result.body.file_counts["in_progress"],
      completed: result.body.file_counts["completed"],
      failed: result.body.file_counts["failed"],
      cancelled: result.body.file_counts["cancelled"],
      total: result.body.file_counts["total"],
    },
    status: result.body["status"] as VectorStoreStatus,
    expiresAfter: !result.body.expires_after
      ? undefined
      : {
          anchor: result.body.expires_after?.[
            "anchor"
          ] as VectorStoreExpirationPolicyAnchor,
          days: result.body.expires_after?.["days"],
        },
    expiresAt:
      result.body["expires_at"] !== undefined
        ? new Date(result.body["expires_at"])
        : undefined,
    lastActiveAt:
      result.body["last_active_at"] === null
        ? null
        : new Date(result.body["last_active_at"]),
    metadata: result.body["metadata"],
  };
}

/** Creates a vector store. */
export async function createVectorStore(
  context: Client,
  options: AgentsCreateVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _createVectorStoreSend(context, options);
  return _createVectorStoreDeserialize(result);
}

export function _getVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsGetVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    usageBytes: result.body["usage_bytes"],
    fileCounts: {
      inProgress: result.body.file_counts["in_progress"],
      completed: result.body.file_counts["completed"],
      failed: result.body.file_counts["failed"],
      cancelled: result.body.file_counts["cancelled"],
      total: result.body.file_counts["total"],
    },
    status: result.body["status"] as VectorStoreStatus,
    expiresAfter: !result.body.expires_after
      ? undefined
      : {
          anchor: result.body.expires_after?.[
            "anchor"
          ] as VectorStoreExpirationPolicyAnchor,
          days: result.body.expires_after?.["days"],
        },
    expiresAt:
      result.body["expires_at"] !== undefined
        ? new Date(result.body["expires_at"])
        : undefined,
    lastActiveAt:
      result.body["last_active_at"] === null
        ? null
        : new Date(result.body["last_active_at"]),
    metadata: result.body["metadata"],
  };
}

/** Returns the vector store object matching the specified ID. */
export async function getVectorStore(
  context: Client,
  vectorStoreId: string,
  options: AgentsGetVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _getVectorStoreSend(context, vectorStoreId, options);
  return _getVectorStoreDeserialize(result);
}

export function _modifyVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsModifyVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        name: options?.name,
        expires_after: {
          anchor: options?.expiresAfter?.["anchor"],
          days: options?.expiresAfter?.["days"],
        },
        metadata: options?.metadata,
      },
    });
}

export async function _modifyVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStore> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    name: result.body["name"],
    usageBytes: result.body["usage_bytes"],
    fileCounts: {
      inProgress: result.body.file_counts["in_progress"],
      completed: result.body.file_counts["completed"],
      failed: result.body.file_counts["failed"],
      cancelled: result.body.file_counts["cancelled"],
      total: result.body.file_counts["total"],
    },
    status: result.body["status"] as VectorStoreStatus,
    expiresAfter: !result.body.expires_after
      ? undefined
      : {
          anchor: result.body.expires_after?.[
            "anchor"
          ] as VectorStoreExpirationPolicyAnchor,
          days: result.body.expires_after?.["days"],
        },
    expiresAt:
      result.body["expires_at"] !== undefined
        ? new Date(result.body["expires_at"])
        : undefined,
    lastActiveAt:
      result.body["last_active_at"] === null
        ? null
        : new Date(result.body["last_active_at"]),
    metadata: result.body["metadata"],
  };
}

/** The ID of the vector store to modify. */
export async function modifyVectorStore(
  context: Client,
  vectorStoreId: string,
  options: AgentsModifyVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStore> {
  const result = await _modifyVectorStoreSend(context, vectorStoreId, options);
  return _modifyVectorStoreDeserialize(result);
}

export function _deleteVectorStoreSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsDeleteVectorStoreOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores/{vectorStoreId}", vectorStoreId)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVectorStoreDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
    object: result.body["object"],
  };
}

/** Deletes the vector store object matching the specified ID. */
export async function deleteVectorStore(
  context: Client,
  vectorStoreId: string,
  options: AgentsDeleteVectorStoreOptionalParams = { requestOptions: {} },
): Promise<VectorStoreDeletionStatus> {
  const result = await _deleteVectorStoreSend(context, vectorStoreId, options);
  return _deleteVectorStoreDeserialize(result);
}

export function _listVectorStoreFilesSend(
  context: Client,
  vectorStoreId: string,
  options: AgentsListVectorStoreFilesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores/{vectorStoreId}/files", vectorStoreId)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        filter: options?.filter,
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listVectorStoreFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        usageBytes: p["usage_bytes"],
        createdAt: new Date(p["created_at"]),
        vectorStoreId: p["vector_store_id"],
        status: p["status"] as VectorStoreFileStatus,
        lastError:
          p.last_error === null
            ? null
            : {
                code: p.last_error["code"] as VectorStoreFileErrorCode,
                message: p.last_error["message"],
              },
        chunkingStrategy: deserializeVectorStoreChunkingStrategyResponseUnion(
          p.chunking_strategy,
        ),
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of vector store files. */
export async function listVectorStoreFiles(
  context: Client,
  vectorStoreId: string,
  options: AgentsListVectorStoreFilesOptionalParams = { requestOptions: {} },
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const result = await _listVectorStoreFilesSend(
    context,
    vectorStoreId,
    options,
  );
  return _listVectorStoreFilesDeserialize(result);
}

export function _createVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsCreateVectorStoreFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/vector_stores/{vectorStoreId}/files", vectorStoreId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        file_id: fileId,
        chunking_strategy: vectorStoreChunkingStrategyRequestUnionSerializer(
          options?.chunkingStrategy,
        ),
      },
    });
}

export async function _createVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    usageBytes: result.body["usage_bytes"],
    createdAt: new Date(result.body["created_at"]),
    vectorStoreId: result.body["vector_store_id"],
    status: result.body["status"] as VectorStoreFileStatus,
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"] as VectorStoreFileErrorCode,
            message: result.body.last_error["message"],
          },
    chunkingStrategy: deserializeVectorStoreChunkingStrategyResponseUnion(
      result.body.chunking_strategy,
    ),
  };
}

/** Create a vector store file by attaching a file to a vector store. */
export async function createVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsCreateVectorStoreFileOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFile> {
  const result = await _createVectorStoreFileSend(
    context,
    vectorStoreId,
    fileId,
    options,
  );
  return _createVectorStoreFileDeserialize(result);
}

export function _getVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsGetVectorStoreFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/vector_stores/{vectorStoreId}/files/{fileId}",
      vectorStoreId,
      fileId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    usageBytes: result.body["usage_bytes"],
    createdAt: new Date(result.body["created_at"]),
    vectorStoreId: result.body["vector_store_id"],
    status: result.body["status"] as VectorStoreFileStatus,
    lastError:
      result.body.last_error === null
        ? null
        : {
            code: result.body.last_error["code"] as VectorStoreFileErrorCode,
            message: result.body.last_error["message"],
          },
    chunkingStrategy: deserializeVectorStoreChunkingStrategyResponseUnion(
      result.body.chunking_strategy,
    ),
  };
}

/** Retrieves a vector store file. */
export async function getVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsGetVectorStoreFileOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFile> {
  const result = await _getVectorStoreFileSend(
    context,
    vectorStoreId,
    fileId,
    options,
  );
  return _getVectorStoreFileDeserialize(result);
}

export function _deleteVectorStoreFileSend(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsDeleteVectorStoreFileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/vector_stores/{vectorStoreId}/files/{fileId}",
      vectorStoreId,
      fileId,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteVectorStoreFileDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileDeletionStatus> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    deleted: result.body["deleted"],
    object: result.body["object"],
  };
}

/**
 * Delete a vector store file. This will remove the file from the vector store but the file itself will not be deleted.
 * To delete the file, use the delete file endpoint.
 */
export async function deleteVectorStoreFile(
  context: Client,
  vectorStoreId: string,
  fileId: string,
  options: AgentsDeleteVectorStoreFileOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFileDeletionStatus> {
  const result = await _deleteVectorStoreFileSend(
    context,
    vectorStoreId,
    fileId,
    options,
  );
  return _deleteVectorStoreFileDeserialize(result);
}

export function _createVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  fileIds: string[],
  options: AgentsCreateVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path("/vector_stores/{vectorStoreId}/file_batches", vectorStoreId)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: {
        file_ids: fileIds,
        chunking_strategy: vectorStoreChunkingStrategyRequestUnionSerializer(
          options?.chunkingStrategy,
        ),
      },
    });
}

export async function _createVectorStoreFileBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    vectorStoreId: result.body["vector_store_id"],
    status: result.body["status"] as VectorStoreFileBatchStatus,
    fileCounts: {
      inProgress: result.body.file_counts["in_progress"],
      completed: result.body.file_counts["completed"],
      failed: result.body.file_counts["failed"],
      cancelled: result.body.file_counts["cancelled"],
      total: result.body.file_counts["total"],
    },
  };
}

/** Create a vector store file batch. */
export async function createVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  fileIds: string[],
  options: AgentsCreateVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileBatch> {
  const result = await _createVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    fileIds,
    options,
  );
  return _createVectorStoreFileBatchDeserialize(result);
}

export function _getVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsGetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/vector_stores/{vectorStoreId}/file_batches/{batchId}",
      vectorStoreId,
      batchId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getVectorStoreFileBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    vectorStoreId: result.body["vector_store_id"],
    status: result.body["status"] as VectorStoreFileBatchStatus,
    fileCounts: {
      inProgress: result.body.file_counts["in_progress"],
      completed: result.body.file_counts["completed"],
      failed: result.body.file_counts["failed"],
      cancelled: result.body.file_counts["cancelled"],
      total: result.body.file_counts["total"],
    },
  };
}

/** Retrieve a vector store file batch. */
export async function getVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsGetVectorStoreFileBatchOptionalParams = { requestOptions: {} },
): Promise<VectorStoreFileBatch> {
  const result = await _getVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    batchId,
    options,
  );
  return _getVectorStoreFileBatchDeserialize(result);
}

export function _cancelVectorStoreFileBatchSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsCancelVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel",
      vectorStoreId,
      batchId,
    )
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _cancelVectorStoreFileBatchDeserialize(
  result: PathUncheckedResponse,
): Promise<VectorStoreFileBatch> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    id: result.body["id"],
    object: result.body["object"],
    createdAt: new Date(result.body["created_at"]),
    vectorStoreId: result.body["vector_store_id"],
    status: result.body["status"] as VectorStoreFileBatchStatus,
    fileCounts: {
      inProgress: result.body.file_counts["in_progress"],
      completed: result.body.file_counts["completed"],
      failed: result.body.file_counts["failed"],
      cancelled: result.body.file_counts["cancelled"],
      total: result.body.file_counts["total"],
    },
  };
}

/** Cancel a vector store file batch. This attempts to cancel the processing of files in this batch as soon as possible. */
export async function cancelVectorStoreFileBatch(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsCancelVectorStoreFileBatchOptionalParams = {
    requestOptions: {},
  },
): Promise<VectorStoreFileBatch> {
  const result = await _cancelVectorStoreFileBatchSend(
    context,
    vectorStoreId,
    batchId,
    options,
  );
  return _cancelVectorStoreFileBatchDeserialize(result);
}

export function _listVectorStoreFileBatchFilesSend(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/vector_stores/{vectorStoreId}/file_batches/{batchId}/files",
      vectorStoreId,
      batchId,
    )
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: {
        filter: options?.filter,
        limit: options?.limit,
        order: options?.order,
        after: options?.after,
        before: options?.before,
      },
    });
}

export async function _listVectorStoreFileBatchFilesDeserialize(
  result: PathUncheckedResponse,
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return {
    object: result.body["object"],
    data: result.body["data"].map((p: any) => {
      return {
        id: p["id"],
        object: p["object"],
        usageBytes: p["usage_bytes"],
        createdAt: new Date(p["created_at"]),
        vectorStoreId: p["vector_store_id"],
        status: p["status"] as VectorStoreFileStatus,
        lastError:
          p.last_error === null
            ? null
            : {
                code: p.last_error["code"] as VectorStoreFileErrorCode,
                message: p.last_error["message"],
              },
        chunkingStrategy: deserializeVectorStoreChunkingStrategyResponseUnion(
          p.chunking_strategy,
        ),
      };
    }),
    firstId: result.body["first_id"],
    lastId: result.body["last_id"],
    hasMore: result.body["has_more"],
  };
}

/** Returns a list of vector store files in a batch. */
export async function listVectorStoreFileBatchFiles(
  context: Client,
  vectorStoreId: string,
  batchId: string,
  options: AgentsListVectorStoreFileBatchFilesOptionalParams = {
    requestOptions: {},
  },
): Promise<OpenAIPageableListOfVectorStoreFile> {
  const result = await _listVectorStoreFileBatchFilesSend(
    context,
    vectorStoreId,
    batchId,
    options,
  );
  return _listVectorStoreFileBatchFilesDeserialize(result);
}
