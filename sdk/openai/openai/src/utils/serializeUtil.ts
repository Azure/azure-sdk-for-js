// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatRequestUserMessage as ChatRequestUserMessageRest,
  ChatRequestAssistantMessage as ChatRequestAssistantMessageRest,
  ChatRequestToolMessage as ChatRequestToolMessageRest,
  ChatRequestMessage as ChatRequestMessageRest,
  ChatMessageImageContentItem as ChatMessageImageContentItemRest,
  ChatMessageContentItem as ChatMessageContentItemRest,
  AzureSearchChatExtensionConfiguration as AzureSearchChatExtensionConfigurationRest,
  AzureMachineLearningIndexChatExtensionConfiguration as AzureMachineLearningIndexChatExtensionConfigurationRest,
  AzureCosmosDBChatExtensionConfiguration as AzureCosmosDBChatExtensionConfigurationRest,
  ElasticsearchChatExtensionConfiguration as ElasticsearchChatExtensionConfigurationRest,
  PineconeChatExtensionConfiguration as PineconeChatExtensionConfigurationRest,
  AzureChatExtensionConfiguration as AzureChatExtensionConfigurationRest,
  OnYourDataConnectionStringAuthenticationOptions as OnYourDataConnectionStringAuthenticationOptionsRest,
  OnYourDataKeyAndKeyIdAuthenticationOptions as OnYourDataKeyAndKeyIdAuthenticationOptionsRest,
  OnYourDataEncodedApiKeyAuthenticationOptions as OnYourDataEncodedApiKeyAuthenticationOptionsRest,
  OnYourDataAccessTokenAuthenticationOptions as OnYourDataAccessTokenAuthenticationOptionsRest,
  OnYourDataUserAssignedManagedIdentityAuthenticationOptions as OnYourDataUserAssignedManagedIdentityAuthenticationOptionsRest,
  OnYourDataAuthenticationOptions as OnYourDataAuthenticationOptionsRest,
  OnYourDataEndpointVectorizationSource as OnYourDataEndpointVectorizationSourceRest,
  OnYourDataDeploymentNameVectorizationSource as OnYourDataDeploymentNameVectorizationSourceRest,
  OnYourDataModelIdVectorizationSource as OnYourDataModelIdVectorizationSourceRest,
  OnYourDataVectorizationSource as OnYourDataVectorizationSourceRest,
} from "../rest/index.js";
import {
  ChatRequestUserMessage,
  ChatRequestAssistantMessage,
  ChatRequestToolMessage,
  ChatRequestMessageUnion,
  ChatMessageImageContentItem,
  ChatMessageContentItemUnion,
  AzureSearchChatExtensionConfiguration,
  AzureMachineLearningIndexChatExtensionConfiguration,
  AzureCosmosDBChatExtensionConfiguration,
  ElasticsearchChatExtensionConfiguration,
  PineconeChatExtensionConfiguration,
  AzureChatExtensionConfigurationUnion,
  OnYourDataConnectionStringAuthenticationOptions,
  OnYourDataKeyAndKeyIdAuthenticationOptions,
  OnYourDataEncodedApiKeyAuthenticationOptions,
  OnYourDataAccessTokenAuthenticationOptions,
  OnYourDataUserAssignedManagedIdentityAuthenticationOptions,
  OnYourDataAuthenticationOptionsUnion,
  OnYourDataEndpointVectorizationSource,
  OnYourDataDeploymentNameVectorizationSource,
  OnYourDataModelIdVectorizationSource,
  OnYourDataVectorizationSourceUnion,
} from "../models/models.js";
import { snakeCaseKeys } from "../api/util.js";

/** serialize function for ChatRequestUserMessage */
function serializeChatRequestUserMessage(obj: ChatRequestUserMessage): ChatRequestUserMessageRest {
  return {
    role: obj["role"],
    content:
      typeof obj["content"] === "string"
        ? obj["content"]
        : obj["content"].map(serializeChatRequestContentItemUnion),
    name: obj["name"],
  };
}

/** serialize function for ChatMessageImageContentItem */
function serializeChatRequestContentItemUnion(
  obj: ChatMessageContentItemUnion,
): ChatMessageContentItemRest {
  switch (obj.type) {
    case "image_url":
      return serializeChatMessageImageContentItem(obj as ChatMessageImageContentItem);
    default:
      return obj;
  }
}
/** serialize function for ChatRequestAssistantMessage */
function serializeChatRequestAssistantMessage(
  obj: ChatRequestAssistantMessage,
): ChatRequestAssistantMessageRest {
  if (obj.content === undefined) {
    obj.content = null;
  }
  const { functionCall, toolCalls, ...rest } = obj;
  return {
    ...snakeCaseKeys(rest),
    ...(!toolCalls || toolCalls.length === 0 ? {} : { tool_calls: toolCalls }),
    ...(functionCall ? { function_call: functionCall } : {}),
  };
}

/** serialize function for ChatRequestToolMessage */
function serializeChatRequestToolMessage(obj: ChatRequestToolMessage): ChatRequestToolMessageRest {
  return {
    role: obj["role"],
    content: obj["content"],
    tool_call_id: obj["toolCallId"],
  };
}

/** serialize function for ChatRequestMessageUnion */
export function serializeChatRequestMessageUnion(
  obj: ChatRequestMessageUnion,
): ChatRequestMessageRest {
  switch (obj.role) {
    case "user":
      return serializeChatRequestUserMessage(obj as ChatRequestUserMessage);
    case "assistant":
      return serializeChatRequestAssistantMessage(obj as ChatRequestAssistantMessage);
    case "tool":
      return serializeChatRequestToolMessage(obj as ChatRequestToolMessage);
    default:
      return obj;
  }
}

/** serialize function for ChatMessageImageContentItem */
function serializeChatMessageImageContentItem(
  obj: ChatMessageImageContentItem,
): ChatMessageImageContentItemRest {
  return {
    type: obj["type"],
    image_url: { url: obj.imageUrl["url"], detail: obj.imageUrl["detail"] },
  };
}

/** serialize function for ChatMessageContentItemUnion */
export function serializeChatMessageContentItemUnion(
  obj: ChatMessageContentItemUnion,
): ChatMessageContentItemRest {
  switch (obj.type) {
    case "image_url":
      return serializeChatMessageImageContentItem(obj as ChatMessageImageContentItem);
    default:
      return obj;
  }
}

/** serialize function for AzureSearchChatExtensionConfiguration */
function serializeAzureSearchChatExtensionConfiguration(
  obj: AzureSearchChatExtensionConfiguration,
): AzureSearchChatExtensionConfigurationRest {
  return {
    type: obj["type"],
    parameters: {
      authentication: !obj.authentication
        ? obj.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.authentication),
      top_n_documents: obj["topNDocuments"],
      in_scope: obj["inScope"],
      strictness: obj["strictness"],
      role_information: obj["roleInformation"],
      endpoint: obj["endpoint"],
      index_name: obj["indexName"],
      fields_mapping: !obj.fieldsMapping
        ? undefined
        : {
            title_field: obj.fieldsMapping?.["titleField"],
            url_field: obj.fieldsMapping?.["urlField"],
            filepath_field: obj.fieldsMapping?.["filepathField"],
            content_fields: obj.fieldsMapping?.["contentFields"],
            content_fields_separator: obj.fieldsMapping?.["contentFieldsSeparator"],
            vector_fields: obj.fieldsMapping?.["vectorFields"],
            image_vector_fields: obj.fieldsMapping?.["imageVectorFields"],
          },
      query_type: obj["queryType"],
      semantic_configuration: obj["semanticConfiguration"],
      filter: obj["filter"],
      embedding_dependency: !obj.embeddingDependency
        ? obj.embeddingDependency
        : serializeOnYourDataVectorizationSourceUnion(obj.embeddingDependency),
    },
  };
}

/** serialize function for AzureMachineLearningIndexChatExtensionConfiguration */
function serializeAzureMachineLearningIndexChatExtensionConfiguration(
  obj: AzureMachineLearningIndexChatExtensionConfiguration,
): AzureMachineLearningIndexChatExtensionConfigurationRest {
  return {
    type: obj["type"],
    parameters: {
      authentication: !obj.authentication
        ? obj.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.authentication),
      top_n_documents: obj["topNDocuments"],
      in_scope: obj["inScope"],
      strictness: obj["strictness"],
      role_information: obj["roleInformation"],
      project_resource_id: obj["projectResourceId"],
      name: obj["name"],
      version: obj["version"],
      filter: obj["filter"],
    },
  };
}

/** serialize function for AzureCosmosDBChatExtensionConfiguration */
function serializeAzureCosmosDBChatExtensionConfiguration(
  obj: AzureCosmosDBChatExtensionConfiguration,
): AzureCosmosDBChatExtensionConfigurationRest {
  return {
    type: obj["type"],
    parameters: {
      authentication: !obj.authentication
        ? obj.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.authentication),
      top_n_documents: obj["topNDocuments"],
      in_scope: obj["inScope"],
      strictness: obj["strictness"],
      role_information: obj["roleInformation"],
      database_name: obj["databaseName"],
      container_name: obj["containerName"],
      index_name: obj["indexName"],
      fields_mapping: {
        title_field: obj.fieldsMapping["titleField"],
        url_field: obj.fieldsMapping["urlField"],
        filepath_field: obj.fieldsMapping["filepathField"],
        content_fields: obj.fieldsMapping["contentFields"],
        content_fields_separator: obj.fieldsMapping["contentFieldsSeparator"],
        vector_fields: obj.fieldsMapping["vectorFields"],
      },
      embedding_dependency: serializeOnYourDataVectorizationSourceUnion(obj.embeddingDependency),
    },
  };
}

/** serialize function for ElasticsearchChatExtensionConfiguration */
function serializeElasticsearchChatExtensionConfiguration(
  obj: ElasticsearchChatExtensionConfiguration,
): ElasticsearchChatExtensionConfigurationRest {
  return {
    type: obj["type"],
    parameters: {
      authentication: !obj.authentication
        ? obj.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.authentication),
      top_n_documents: obj["topNDocuments"],
      in_scope: obj["inScope"],
      strictness: obj["strictness"],
      role_information: obj["roleInformation"],
      endpoint: obj["endpoint"],
      index_name: obj["indexName"],
      fields_mapping: !obj.fieldsMapping
        ? undefined
        : {
            title_field: obj.fieldsMapping?.["titleField"],
            url_field: obj.fieldsMapping?.["urlField"],
            filepath_field: obj.fieldsMapping?.["filepathField"],
            content_fields: obj.fieldsMapping?.["contentFields"],
            content_fields_separator: obj.fieldsMapping?.["contentFieldsSeparator"],
            vector_fields: obj.fieldsMapping?.["vectorFields"],
          },
      query_type: obj["queryType"],
      embedding_dependency: !obj.embeddingDependency
        ? obj.embeddingDependency
        : serializeOnYourDataVectorizationSourceUnion(obj.embeddingDependency),
    },
  };
}

/** serialize function for PineconeChatExtensionConfiguration */
function serializePineconeChatExtensionConfiguration(
  obj: PineconeChatExtensionConfiguration,
): PineconeChatExtensionConfigurationRest {
  return {
    type: obj["type"],
    parameters: {
      authentication: !obj.authentication
        ? obj.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.authentication),
      top_n_documents: obj["topNDocuments"],
      in_scope: obj["inScope"],
      strictness: obj["strictness"],
      role_information: obj["roleInformation"],
      environment: obj["environment"],
      index_name: obj["indexName"],
      fields_mapping: {
        title_field: obj.fieldsMapping["titleField"],
        url_field: obj.fieldsMapping["urlField"],
        filepath_field: obj.fieldsMapping["filepathField"],
        content_fields: obj.fieldsMapping["contentFields"],
        content_fields_separator: obj.fieldsMapping["contentFieldsSeparator"],
      },
      embedding_dependency: serializeOnYourDataVectorizationSourceUnion(obj.embeddingDependency),
    },
  };
}

/** serialize function for AzureChatExtensionConfigurationUnion */
export function serializeAzureChatExtensionConfigurationUnion(
  obj: AzureChatExtensionConfigurationUnion,
): AzureChatExtensionConfigurationRest {
  switch (obj.type) {
    case "azure_search":
      return serializeAzureSearchChatExtensionConfiguration(
        obj as AzureSearchChatExtensionConfiguration,
      );
    case "azure_ml_index":
      return serializeAzureMachineLearningIndexChatExtensionConfiguration(
        obj as AzureMachineLearningIndexChatExtensionConfiguration,
      );
    case "azure_cosmos_db":
      return serializeAzureCosmosDBChatExtensionConfiguration(
        obj as AzureCosmosDBChatExtensionConfiguration,
      );
    case "elasticsearch":
      return serializeElasticsearchChatExtensionConfiguration(
        obj as ElasticsearchChatExtensionConfiguration,
      );
    case "pinecone":
      return serializePineconeChatExtensionConfiguration(obj as PineconeChatExtensionConfiguration);
    default:
      return obj;
  }
}

/** serialize function for OnYourDataConnectionStringAuthenticationOptions */
function serializeOnYourDataConnectionStringAuthenticationOptions(
  obj: OnYourDataConnectionStringAuthenticationOptions,
): OnYourDataConnectionStringAuthenticationOptionsRest {
  return { type: obj["type"], connection_string: obj["connectionString"] };
}

/** serialize function for OnYourDataKeyAndKeyIdAuthenticationOptions */
function serializeOnYourDataKeyAndKeyIdAuthenticationOptions(
  obj: OnYourDataKeyAndKeyIdAuthenticationOptions,
): OnYourDataKeyAndKeyIdAuthenticationOptionsRest {
  return { type: obj["type"], key: obj["key"], key_id: obj["keyId"] };
}

/** serialize function for OnYourDataEncodedApiKeyAuthenticationOptions */
function serializeOnYourDataEncodedApiKeyAuthenticationOptions(
  obj: OnYourDataEncodedApiKeyAuthenticationOptions,
): OnYourDataEncodedApiKeyAuthenticationOptionsRest {
  return { type: obj["type"], encoded_api_key: obj["encodedApiKey"] };
}

/** serialize function for OnYourDataAccessTokenAuthenticationOptions */
function serializeOnYourDataAccessTokenAuthenticationOptions(
  obj: OnYourDataAccessTokenAuthenticationOptions,
): OnYourDataAccessTokenAuthenticationOptionsRest {
  return { type: obj["type"], access_token: obj["accessToken"] };
}

/** serialize function for OnYourDataUserAssignedManagedIdentityAuthenticationOptions */
function serializeOnYourDataUserAssignedManagedIdentityAuthenticationOptions(
  obj: OnYourDataUserAssignedManagedIdentityAuthenticationOptions,
): OnYourDataUserAssignedManagedIdentityAuthenticationOptionsRest {
  return {
    type: obj["type"],
    managed_identity_resource_id: obj["managedIdentityResourceId"],
  };
}

/** serialize function for OnYourDataAuthenticationOptionsUnion */
export function serializeOnYourDataAuthenticationOptionsUnion(
  obj: OnYourDataAuthenticationOptionsUnion,
): OnYourDataAuthenticationOptionsRest {
  switch (obj.type) {
    case "connection_string":
      return serializeOnYourDataConnectionStringAuthenticationOptions(
        obj as OnYourDataConnectionStringAuthenticationOptions,
      );
    case "key_and_key_id":
      return serializeOnYourDataKeyAndKeyIdAuthenticationOptions(
        obj as OnYourDataKeyAndKeyIdAuthenticationOptions,
      );
    case "encoded_api_key":
      return serializeOnYourDataEncodedApiKeyAuthenticationOptions(
        obj as OnYourDataEncodedApiKeyAuthenticationOptions,
      );
    case "access_token":
      return serializeOnYourDataAccessTokenAuthenticationOptions(
        obj as OnYourDataAccessTokenAuthenticationOptions,
      );
    case "user_assigned_managed_identity":
      return serializeOnYourDataUserAssignedManagedIdentityAuthenticationOptions(
        obj as OnYourDataUserAssignedManagedIdentityAuthenticationOptions,
      );
    default:
      return obj;
  }
}

/** serialize function for OnYourDataEndpointVectorizationSource */
function serializeOnYourDataEndpointVectorizationSource(
  obj: OnYourDataEndpointVectorizationSource,
): OnYourDataEndpointVectorizationSourceRest {
  return {
    type: obj["type"],
    endpoint: obj["endpoint"],
    authentication: serializeOnYourDataAuthenticationOptionsUnion(obj.authentication),
  };
}

/** serialize function for OnYourDataDeploymentNameVectorizationSource */
function serializeOnYourDataDeploymentNameVectorizationSource(
  obj: OnYourDataDeploymentNameVectorizationSource,
): OnYourDataDeploymentNameVectorizationSourceRest {
  return { type: obj["type"], deployment_name: obj["deploymentName"] };
}

/** serialize function for OnYourDataModelIdVectorizationSource */
function serializeOnYourDataModelIdVectorizationSource(
  obj: OnYourDataModelIdVectorizationSource,
): OnYourDataModelIdVectorizationSourceRest {
  return { type: obj["type"], model_id: obj["modelId"] };
}

/** serialize function for OnYourDataVectorizationSourceUnion */
export function serializeOnYourDataVectorizationSourceUnion(
  obj: OnYourDataVectorizationSourceUnion,
): OnYourDataVectorizationSourceRest {
  switch (obj.type) {
    case "endpoint":
      return serializeOnYourDataEndpointVectorizationSource(
        obj as OnYourDataEndpointVectorizationSource,
      );
    case "deployment_name":
      return serializeOnYourDataDeploymentNameVectorizationSource(
        obj as OnYourDataDeploymentNameVectorizationSource,
      );
    case "model_id":
      return serializeOnYourDataModelIdVectorizationSource(
        obj as OnYourDataModelIdVectorizationSource,
      );
    default:
      return obj;
  }
}
