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

/** serialize function for ChatRequestUserMessage */
function serializeChatRequestUserMessage(obj: ChatRequestUserMessage): ChatRequestUserMessageRest {
  return {
    role: obj["role"],
    content: obj["content"] as any,
    name: obj["name"],
  };
}

/** serialize function for ChatRequestAssistantMessage */
function serializeChatRequestAssistantMessage(
  obj: ChatRequestAssistantMessage,
): ChatRequestAssistantMessageRest {
  return {
    role: obj["role"],
    content: obj["content"],
    name: obj["name"],
    tool_calls: obj["toolCalls"],
    function_call: !obj.functionCall
      ? undefined
      : {
          name: obj.functionCall?.["name"],
          arguments: obj.functionCall?.["arguments"],
        },
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
      authentication: !obj.parameters.authentication
        ? obj.parameters.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.parameters.authentication),
      top_n_documents: obj.parameters["topNDocuments"],
      in_scope: obj.parameters["inScope"],
      strictness: obj.parameters["strictness"],
      role_information: obj.parameters["roleInformation"],
      endpoint: obj.parameters["endpoint"],
      index_name: obj.parameters["indexName"],
      fields_mapping: !obj.parameters.fieldsMapping
        ? undefined
        : {
            title_field: obj.parameters.fieldsMapping?.["titleField"],
            url_field: obj.parameters.fieldsMapping?.["urlField"],
            filepath_field: obj.parameters.fieldsMapping?.["filepathField"],
            content_fields: obj.parameters.fieldsMapping?.["contentFields"],
            content_fields_separator: obj.parameters.fieldsMapping?.["contentFieldsSeparator"],
            vector_fields: obj.parameters.fieldsMapping?.["vectorFields"],
            image_vector_fields: obj.parameters.fieldsMapping?.["imageVectorFields"],
          },
      query_type: obj.parameters["queryType"],
      semantic_configuration: obj.parameters["semanticConfiguration"],
      filter: obj.parameters["filter"],
      embedding_dependency: !obj.parameters.embeddingDependency
        ? obj.parameters.embeddingDependency
        : serializeOnYourDataVectorizationSourceUnion(obj.parameters.embeddingDependency),
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
      authentication: !obj.parameters.authentication
        ? obj.parameters.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.parameters.authentication),
      top_n_documents: obj.parameters["topNDocuments"],
      in_scope: obj.parameters["inScope"],
      strictness: obj.parameters["strictness"],
      role_information: obj.parameters["roleInformation"],
      project_resource_id: obj.parameters["projectResourceId"],
      name: obj.parameters["name"],
      version: obj.parameters["version"],
      filter: obj.parameters["filter"],
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
      authentication: !obj.parameters.authentication
        ? obj.parameters.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.parameters.authentication),
      top_n_documents: obj.parameters["topNDocuments"],
      in_scope: obj.parameters["inScope"],
      strictness: obj.parameters["strictness"],
      role_information: obj.parameters["roleInformation"],
      database_name: obj.parameters["databaseName"],
      container_name: obj.parameters["containerName"],
      index_name: obj.parameters["indexName"],
      fields_mapping: {
        title_field: obj.parameters.fieldsMapping["titleField"],
        url_field: obj.parameters.fieldsMapping["urlField"],
        filepath_field: obj.parameters.fieldsMapping["filepathField"],
        content_fields: obj.parameters.fieldsMapping["contentFields"],
        content_fields_separator: obj.parameters.fieldsMapping["contentFieldsSeparator"],
        vector_fields: obj.parameters.fieldsMapping["vectorFields"],
      },
      embedding_dependency: serializeOnYourDataVectorizationSourceUnion(
        obj.parameters.embeddingDependency,
      ),
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
      authentication: !obj.parameters.authentication
        ? obj.parameters.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.parameters.authentication),
      top_n_documents: obj.parameters["topNDocuments"],
      in_scope: obj.parameters["inScope"],
      strictness: obj.parameters["strictness"],
      role_information: obj.parameters["roleInformation"],
      endpoint: obj.parameters["endpoint"],
      index_name: obj.parameters["indexName"],
      fields_mapping: !obj.parameters.fieldsMapping
        ? undefined
        : {
            title_field: obj.parameters.fieldsMapping?.["titleField"],
            url_field: obj.parameters.fieldsMapping?.["urlField"],
            filepath_field: obj.parameters.fieldsMapping?.["filepathField"],
            content_fields: obj.parameters.fieldsMapping?.["contentFields"],
            content_fields_separator: obj.parameters.fieldsMapping?.["contentFieldsSeparator"],
            vector_fields: obj.parameters.fieldsMapping?.["vectorFields"],
          },
      query_type: obj.parameters["queryType"],
      embedding_dependency: !obj.parameters.embeddingDependency
        ? obj.parameters.embeddingDependency
        : serializeOnYourDataVectorizationSourceUnion(obj.parameters.embeddingDependency),
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
      authentication: !obj.parameters.authentication
        ? obj.parameters.authentication
        : serializeOnYourDataAuthenticationOptionsUnion(obj.parameters.authentication),
      top_n_documents: obj.parameters["topNDocuments"],
      in_scope: obj.parameters["inScope"],
      strictness: obj.parameters["strictness"],
      role_information: obj.parameters["roleInformation"],
      environment: obj.parameters["environment"],
      index_name: obj.parameters["indexName"],
      fields_mapping: {
        title_field: obj.parameters.fieldsMapping["titleField"],
        url_field: obj.parameters.fieldsMapping["urlField"],
        filepath_field: obj.parameters.fieldsMapping["filepathField"],
        content_fields: obj.parameters.fieldsMapping["contentFields"],
        content_fields_separator: obj.parameters.fieldsMapping["contentFieldsSeparator"],
      },
      embedding_dependency: serializeOnYourDataVectorizationSourceUnion(
        obj.parameters.embeddingDependency,
      ),
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
