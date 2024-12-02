// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A specific representation of configurable options for Azure Search when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureSearchChatExtensionConfiguration
  extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cognitive Search.
   */
  type: "azure_search";
  /** The parameters to use when configuring Azure Search. */
  parameters: AzureSearchChatExtensionParameters;
}

/** Parameters for Azure Cognitive Search when used as an Azure OpenAI chat extension. The supported authentication types are APIKey, SystemAssignedManagedIdentity and UserAssignedManagedIdentity. */
export interface AzureSearchChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** The absolute endpoint path for the Azure Cognitive Search resource to use. */
  endpoint: string;
  /** The name of the index to use as available in the referenced Azure Cognitive Search resource. */
  index_name: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fields_mapping?: AzureSearchIndexFieldMappingOptions;
  /**
   * The query type to use with Azure Cognitive Search.
   *
   * Possible values: "simple", "semantic", "vector", "vector_simple_hybrid", "vector_semantic_hybrid"
   */
  query_type?: string;
  /** The additional semantic configuration for the query. */
  semantic_configuration?: string;
  /** Search filter. */
  filter?: string;
  /** The embedding dependency for vector search. */
  embedding_dependency?: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Azure Search resource. */
export interface AzureSearchIndexFieldMappingOptions {
  /** The name of the index field to use as a title. */
  title_field?: string;
  /** The name of the index field to use as a URL. */
  url_field?: string;
  /** The name of the index field to use as a filepath. */
  filepath_field?: string;
  /** The names of index fields that should be treated as content. */
  content_fields?: string[];
  /** The separator pattern that content fields should use. */
  content_fields_separator?: string;
  /** The names of fields that represent vector data. */
  vector_fields?: string[];
}

/**
 * A specific representation of configurable options for Azure Cosmos DB when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureCosmosDBChatExtensionConfiguration
  extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cosmos DB.
   */
  type: "azure_cosmos_db";
  /** The parameters to use when configuring Azure OpenAI CosmosDB chat extensions. */
  parameters: AzureCosmosDBChatExtensionParameters;
}

/**
 * Parameters to use when configuring Azure OpenAI On Your Data chat extensions when using Azure Cosmos DB for
 * MongoDB vCore. The supported authentication type is ConnectionString.
 */
export interface AzureCosmosDBChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** The MongoDB vCore database name to use with Azure Cosmos DB. */
  database_name: string;
  /** The name of the Azure Cosmos DB resource container. */
  container_name: string;
  /** The MongoDB vCore index name to use with Azure Cosmos DB. */
  index_name: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fields_mapping: AzureCosmosDBFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embedding_dependency: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Azure Cosmos DB resource. */
export interface AzureCosmosDBFieldMappingOptions {
  /** The name of the index field to use as a title. */
  title_field?: string;
  /** The name of the index field to use as a URL. */
  url_field?: string;
  /** The name of the index field to use as a filepath. */
  filepath_field?: string;
  /** The names of index fields that should be treated as content. */
  content_fields: string[];
  /** The separator pattern that content fields should use. */
  content_fields_separator?: string;
  /** The names of fields that represent vector data. */
  vector_fields: string[];
}

/** The authentication options for Azure OpenAI On Your Data when using an API key. */
export interface OnYourDataApiKeyAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of API key. */
  type: "api_key";
  /** The API key to use for authentication. */
  key: string;
}

/** The authentication options for Azure OpenAI On Your Data. */
export interface OnYourDataAuthenticationOptionsParent {
  /** The authentication type. */
  type: string;
}

/** The authentication options for Azure OpenAI On Your Data when using a connection string. */
export interface OnYourDataConnectionStringAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of connection string. */
  type: "connection_string";
  /** The connection string to use for authentication. */
  connection_string: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on an internal embeddings model deployment name in the same Azure OpenAI resource.
 */
export interface OnYourDataDeploymentNameVectorizationSource
  extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'deployment_name' for this type. */
  type: "deployment_name";
  /** The embedding model deployment name within the same Azure OpenAI resource. This enables you to use vector search without Azure OpenAI api-key and without Azure OpenAI public network access. */
  deployment_name: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on a public Azure OpenAI endpoint call for embeddings.
 */
export interface OnYourDataEndpointVectorizationSource extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'endpoint' for this type. */
  type: "endpoint";
  /** Specifies the resource endpoint URL from which embeddings should be retrieved. It should be in the format of https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/embeddings. The api-version query parameter is not allowed. */
  endpoint: string;
  /** Specifies the authentication options to use when retrieving embeddings from the specified endpoint. */
  authentication: OnYourDataApiKeyAuthenticationOptions;
}

/** The authentication options for Azure OpenAI On Your Data when using a system-assigned managed identity. */
export interface OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of system-assigned managed identity. */
  type: "system_assigned_managed_identity";
}

/** The authentication options for Azure OpenAI On Your Data when using a user-assigned managed identity. */
export interface OnYourDataUserAssignedManagedIdentityAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of user-assigned managed identity. */
  type: "user_assigned_managed_identity";
  /** The resource ID of the user-assigned managed identity to use for authentication. */
  managed_identity_resource_id: string;
}

/** An abstract representation of a vectorization source for Azure OpenAI On Your Data with vector search. */
export interface OnYourDataVectorizationSourceParent {
  /** The authentication type. */
  type: string;
}

/**
 * A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 * completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 * The use of this configuration is compatible only with Azure OpenAI.
 */
export interface AzureChatExtensionConfigurationParent {
  /** The type label. */
  type: string;
}

/** The authentication options for Azure OpenAI On Your Data. */
export type OnYourDataAuthenticationOptions =
  | OnYourDataAuthenticationOptionsParent
  | OnYourDataApiKeyAuthenticationOptions
  | OnYourDataConnectionStringAuthenticationOptions
  | OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  | OnYourDataUserAssignedManagedIdentityAuthenticationOptions;

/** An abstract representation of a vectorization source for Azure OpenAI On Your Data with vector search. */
export type OnYourDataVectorizationSource =
  | OnYourDataVectorizationSourceParent
  | OnYourDataEndpointVectorizationSource
  | OnYourDataDeploymentNameVectorizationSource;

/**
 * A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 * completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 * The use of this configuration is compatible only with Azure OpenAI.
 */
export type AzureChatExtensionConfiguration =
  | AzureChatExtensionConfigurationParent
  | AzureSearchChatExtensionConfiguration
  | AzureCosmosDBChatExtensionConfiguration;
