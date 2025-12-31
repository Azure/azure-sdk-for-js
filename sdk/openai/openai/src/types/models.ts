// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The type of included properties of the output context. */
export type OnYourDataContextProperty = "citations" | "intent" | "all_retrieved_documents";

/**
 * A specific representation of configurable options for Azure Search when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureSearchChatExtensionConfiguration extends AzureChatExtensionConfigurationParent {
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
  authentication:
    | OnYourDataAuthenticationOptionsParent
    | OnYourDataApiKeyAuthenticationOptions
    | OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
    | OnYourDataUserAssignedManagedIdentityAuthenticationOptions
    | OnYourDataAccessTokenAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /**
   * The max number of rewritten queries should be send to search provider for one user message. If not specified,
   * the system will decide the number of queries to send.
   */
  max_search_queries?: number;
  /**
   * If specified as true, the system will allow partial search results to be used and the request fails if all the queries fail.
   * If not specified, or specified as false, the request will fail if any search query fails.
   */
  allow_partial_result?: boolean;
  /** The included properties of the output context. If not specified, the default value is `citations` and `intent`. */
  include_contexts?: OnYourDataContextProperty[];
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
  /** The names of fields that represent image vector data. */
  image_vector_fields?: string[];
}

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface ElasticsearchChatExtensionConfiguration extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Elasticsearch®.
   */
  type: "elasticsearch";
  /** The parameters to use when configuring Elasticsearch®. */
  parameters: ElasticsearchChatExtensionParameters;
}

/** Parameters to use when configuring Elasticsearch® as an Azure OpenAI chat extension. The supported authentication types are KeyAndKeyId and EncodedAPIKey. */
export interface ElasticsearchChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication:
    | OnYourDataAuthenticationOptionsParent
    | OnYourDataKeyAndKeyIdAuthenticationOptions
    | OnYourDataEncodedApiKeyAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /**
   * The max number of rewritten queries should be send to search provider for one user message. If not specified,
   * the system will decide the number of queries to send.
   */
  max_search_queries?: number;
  /**
   * If specified as true, the system will allow partial search results to be used and the request fails if all the queries fail.
   * If not specified, or specified as false, the request will fail if any search query fails.
   */
  allow_partial_result?: boolean;
  /** The included properties of the output context. If not specified, the default value is `citations` and `intent`. */
  include_contexts?: OnYourDataContextProperty[];
  /** The endpoint of Elasticsearch®. */
  endpoint: string;
  /** The index name of Elasticsearch®. */
  index_name: string;
  /** The index field mapping options of Elasticsearch®. */
  fields_mapping?: ElasticsearchIndexFieldMappingOptions;
  /**
   * The query type of Elasticsearch®.
   *
   * Possible values: "simple", "vector"
   */
  query_type?: string;
  /** The embedding dependency for vector search. */
  embedding_dependency?: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Elasticsearch® resource. */
export interface ElasticsearchIndexFieldMappingOptions {
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

/** The authentication options for Azure OpenAI On Your Data when using access token. */
export interface OnYourDataAccessTokenAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of access token. */
  type: "access_token";
  /** The access token to use for authentication. */
  access_token: string;
}

/**
 * A specific representation of configurable options for Azure Cosmos DB when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureCosmosDBChatExtensionConfiguration extends AzureChatExtensionConfigurationParent {
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
  authentication:
    | OnYourDataAuthenticationOptionsParent
    | OnYourDataConnectionStringAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /**
   * The max number of rewritten queries should be send to search provider for one user message. If not specified,
   * the system will decide the number of queries to send.
   */
  max_search_queries?: number;
  /**
   * If specified as true, the system will allow partial search results to be used and the request fails if all the queries fail.
   * If not specified, or specified as false, the request will fail if any search query fails.
   */
  allow_partial_result?: boolean;
  /** The included properties of the output context. If not specified, the default value is `citations` and `intent`. */
  include_contexts?: OnYourDataContextProperty[];
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
export interface OnYourDataApiKeyAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
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
export interface OnYourDataConnectionStringAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of connection string. */
  type: "connection_string";
  /** The connection string to use for authentication. */
  connection_string: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on an internal embeddings model deployment name in the same Azure OpenAI resource.
 */
export interface OnYourDataDeploymentNameVectorizationSource extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'deployment_name' for this type. */
  type: "deployment_name";
  /** The embedding model deployment name within the same Azure OpenAI resource. This enables you to use vector search without Azure OpenAI api-key and without Azure OpenAI public network access. */
  deployment_name: string;
  /** The number of dimensions the embeddings should have. Only supported in `text-embedding-3` and later models. */
  dimensions?: number;
}

/** The authentication options for Azure OpenAI On Your Data when using an Elasticsearch encoded API key. */
export interface OnYourDataEncodedApiKeyAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of Elasticsearch encoded API Key. */
  type: "encoded_api_key";
  /** The encoded API key to use for authentication. */
  encoded_api_key: string;
}

/**
 * The authentication options for Azure OpenAI On Your Data when using a username and password.
 */
export interface OnYourDataUsernameAndPasswordAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
  /** The discriminator type for username and password. */
  type: "username_and_password";
  /** The username. */
  username: string;
  /** The password. */
  password: string;
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
  authentication:
    | OnYourDataAuthenticationOptionsParent
    | OnYourDataVectorSearchApiKeyAuthenticationOptions
    | OnYourDataVectorSearchAccessTokenAuthenticationOptions;
}

/** The authentication options for Azure OpenAI On Your Data when using an Elasticsearch key and key ID pair. */
export interface OnYourDataKeyAndKeyIdAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of Elasticsearch key and key ID pair. */
  type: "key_and_key_id";
  /** The key to use for authentication. */
  key: string;
  /** The key ID to use for authentication. */
  key_id: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on a search service model ID. Currently only supported by Elasticsearch®.
 */
export interface OnYourDataModelIdVectorizationSource extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'ModelId' for this type. */
  type: "model_id";
  /** The embedding model ID build inside the search service. Currently only supported by Elasticsearch®. */
  model_id: string;
}

/** The authentication options for Azure OpenAI On Your Data when using a system-assigned managed identity. */
export interface OnYourDataSystemAssignedManagedIdentityAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of system-assigned managed identity. */
  type: "system_assigned_managed_identity";
}

/** The authentication options for Azure OpenAI On Your Data when using a user-assigned managed identity. */
export interface OnYourDataUserAssignedManagedIdentityAuthenticationOptions extends OnYourDataAuthenticationOptionsParent {
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

/**
 * A specific representation of configurable options for Pinecone when using it as an Azure OpenAI chat
 * extension.
 */
export interface PineconeChatExtensionConfiguration extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Pinecone.
   */
  type: "pinecone";
  /** The parameters to use when configuring Azure OpenAI chat extensions. */
  parameters: PineconeChatExtensionParameters;
}

/** Parameters for configuring Azure OpenAI Pinecone chat extensions. The supported authentication type is APIKey. */
export interface PineconeChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication: OnYourDataAuthenticationOptionsParent | OnYourDataApiKeyAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /**
   * The max number of rewritten queries should be send to search provider for one user message. If not specified,
   * the system will decide the number of queries to send.
   */
  max_search_queries?: number;
  /**
   * If specified as true, the system will allow partial search results to be used and the request fails if all the queries fail.
   * If not specified, or specified as false, the request will fail if any search query fails.
   */
  allow_partial_result?: boolean;
  /** The included properties of the output context. If not specified, the default value is `citations` and `intent`. */
  include_contexts?: OnYourDataContextProperty[];
  /** The environment name of Pinecone. */
  environment: string;
  /** The name of the Pinecone database index. */
  index_name: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fields_mapping: PineconeFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embedding_dependency: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Pinecone resource. */
export interface PineconeFieldMappingOptions {
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
}

/**
 * A specific representation of configurable options for Mongo DB when using it as an Azure OpenAI chat
 * extension.
 */
export interface MongoDBChatExtensionConfiguration extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cosmos DB.
   */
  type: "mongo_db";
  /** The parameters to use when configuring Azure OpenAI CosmosDB chat extensions. */
  parameters: MongoDBChatExtensionParameters;
}

/**
 * Parameters to use when configuring Azure OpenAI On Your Data chat extensions when using Mongo DB.
 * The supported authentication type is ConnectionString.
 */
export interface MongoDBChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication:
    | OnYourDataAuthenticationOptionsParent
    | OnYourDataUsernameAndPasswordAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  top_n_documents?: number;
  /** Whether queries should be restricted to use of indexed data. */
  in_scope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /**
   * The max number of rewritten queries should be send to search provider for one user message. If not specified,
   * the system will decide the number of queries to send.
   */
  max_search_queries?: number;
  /**
   * If specified as true, the system will allow partial search results to be used and the request fails if all the queries fail.
   * If not specified, or specified as false, the request will fail if any search query fails.
   */
  allow_partial_result?: boolean;
  /** The included properties of the output context. If not specified, the default value is `citations` and `intent`. */
  include_contexts?: OnYourDataContextProperty[];
  /** The endpoint name for MongoDB. */
  endpoint: string;
  /** The collection name for MongoDB. */
  collection_name: string;
  /** The database name for MongoDB. */
  database_name: string;
  /** The app name for MongoDB. */
  app_name: string;
  /** The name of the MongoDB index. */
  index_name: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fields_mapping: MongoDBFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embedding_dependency:
    | OnYourDataEndpointVectorizationSource
    | OnYourDataDeploymentNameVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured MongoDB resource. */
export interface MongoDBFieldMappingOptions {
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

/**
 * The authentication options for Azure OpenAI On Your Data vector search.
 */
export interface OnYourDataVectorSearchAuthenticationOptions {
  /** The type of authentication to use. */
  type: string;
}

/**
 * The authentication options for Azure OpenAI On Your Data vector search when using an API key.
 */
export interface OnYourDataVectorSearchApiKeyAuthenticationOptions extends OnYourDataVectorSearchAuthenticationOptions {
  /** The authentication type of API key. */
  type: "api_key";

  /** The API key to use for authentication. */
  key: string;
}

/**
 * The authentication options for Azure OpenAI On Your Data vector search when using access token.
 */
export interface OnYourDataVectorSearchAccessTokenAuthenticationOptions extends OnYourDataVectorSearchAuthenticationOptions {
  /** The authentication type of access token. */
  type: "access_token";

  /** The access token to use for authentication. */
  access_token: string;
}

/**
 * Represents the integrated vectorizer defined within the search resource.
 */
export interface OnYourDataIntegratedVectorizationSource extends OnYourDataVectorizationSourceParent {
  /** The type discriminator. Always 'integrated'. */
  type: "integrated";
}

/** The authentication options for Azure OpenAI On Your Data. */
export type OnYourDataAuthenticationOptions =
  | OnYourDataAuthenticationOptionsParent
  | OnYourDataApiKeyAuthenticationOptions
  | OnYourDataConnectionStringAuthenticationOptions
  | OnYourDataKeyAndKeyIdAuthenticationOptions
  | OnYourDataEncodedApiKeyAuthenticationOptions
  | OnYourDataAccessTokenAuthenticationOptions
  | OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  | OnYourDataUserAssignedManagedIdentityAuthenticationOptions;

/** An abstract representation of a vectorization source for Azure OpenAI On Your Data with vector search. */
export type OnYourDataVectorizationSource =
  | OnYourDataVectorizationSourceParent
  | OnYourDataEndpointVectorizationSource
  | OnYourDataDeploymentNameVectorizationSource
  | OnYourDataModelIdVectorizationSource
  | OnYourDataIntegratedVectorizationSource;

/**
 * A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 * completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 * The use of this configuration is compatible only with Azure OpenAI.
 */
export type AzureChatExtensionConfiguration =
  | AzureChatExtensionConfigurationParent
  | AzureSearchChatExtensionConfiguration
  | AzureCosmosDBChatExtensionConfiguration
  | ElasticsearchChatExtensionConfiguration
  | PineconeChatExtensionConfiguration
  | MongoDBChatExtensionConfiguration;
