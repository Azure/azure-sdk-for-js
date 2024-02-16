// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

/** The configuration information for an audio transcription request. */
export interface AudioTranscriptionOptions {
  /**
   * The audio data to transcribe. This must be the binary content of a file in one of the supported media formats:
   *  flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.
   */
  file: string;
  /** The optional filename or descriptive identifier to associate with with the audio data. */
  filename?: string;
  /**
   * The requested format of the transcription response data, which will influence the content and detail of the result.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
  /**
   * The primary spoken language of the audio data to be transcribed, supplied as a two-letter ISO-639-1 language code
   * such as 'en' or 'fr'.
   * Providing this known input language is optional but may improve the accuracy and/or latency of transcription.
   */
  language?: string;
  /**
   * An optional hint to guide the model's style or continue from a prior audio segment. The written language of the
   * prompt should match the primary spoken language of the audio data.
   */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /** The model to use for this transcription request. */
  model?: string;
}

/** The configuration information for an audio translation request. */
export interface AudioTranslationOptions {
  /**
   * The audio data to translate. This must be the binary content of a file in one of the supported media formats:
   *  flac, mp3, mp4, mpeg, mpga, m4a, ogg, wav, webm.
   */
  file: string;
  /** The optional filename or descriptive identifier to associate with with the audio data. */
  filename?: string;
  /**
   * The requested format of the translation response data, which will influence the content and detail of the result.
   *
   * Possible values: json, verbose_json, text, srt, vtt
   */
  response_format?: string;
  /**
   * An optional hint to guide the model's style or continue from a prior audio segment. The written language of the
   * prompt should match the primary spoken language of the audio data.
   */
  prompt?: string;
  /**
   * The sampling temperature, between 0 and 1.
   * Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic.
   * If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.
   */
  temperature?: number;
  /** The model to use for this translation request. */
  model?: string;
}

/**
 * The configuration information for a completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface CompletionsOptions {
  /** The prompts to generate completions from. */
  prompt: string[];
  /** The maximum number of tokens to generate. */
  max_tokens?: number;
  /**
   * The sampling temperature to use that controls the apparent creativity of generated completions.
   * Higher values will make output more random while lower values will make results more focused
   * and deterministic.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature called nucleus sampling. This value causes the
   * model to consider the results of tokens with the provided probability mass. As an example, a
   * value of 0.15 will cause only the tokens comprising the top 15% of probability mass to be
   * considered.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  top_p?: number;
  /**
   * A map between GPT token IDs and bias scores that influences the probability of specific tokens
   * appearing in a completions response. Token IDs are computed via external tokenizer tools, while
   * bias scores reside in the range of -100 to 100 with minimum and maximum values corresponding to
   * a full ban or exclusive selection of a token, respectively. The exact behavior of a given bias
   * score varies by model.
   */
  logit_bias?: Record<string, number>;
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The number of completions choices that should be generated per provided prompt as part of an
   * overall completions response.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  n?: number;
  /**
   * A value that controls the emission of log probabilities for the provided number of most likely
   * tokens within a completions response.
   */
  logprobs?: number;
  /**
   * A value specifying whether completions responses should include input prompts as prefixes to
   * their generated output.
   */
  echo?: boolean;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   */
  presence_penalty?: number;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequency_penalty?: number;
  /**
   * A value that controls how many completions will be internally generated prior to response
   * formulation.
   * When used together with n, best_of controls the number of candidate completions and must be
   * greater than n.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  best_of?: number;
  /** A value indicating whether chat completions should be streamed for this request. */
  stream?: boolean;
  /**
   * The model name to provide as part of this completions request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
}

/**
 * The configuration information for a chat completions request.
 * Completions support a wide variety of tasks and generate text that continues from or "completes"
 * provided prompt data.
 */
export interface ChatCompletionsOptions {
  /**
   * The collection of context messages associated with this chat completions request.
   * Typical usage begins with a chat message for the System role that provides instructions for
   * the behavior of the assistant, followed by alternating messages between the User and
   * Assistant roles.
   */
  messages: Array<ChatRequestMessage>;
  /** A list of functions the model may generate JSON inputs for. */
  functions?: Array<FunctionDefinition>;
  /**
   * Controls how the model responds to function calls. "none" means the model does not call a function,
   * and responds to the end-user. "auto" means the model can pick between an end-user or calling a function.
   *  Specifying a particular function via `{"name": "my_function"}` forces the model to call that function.
   *  "none" is the default when no functions are present. "auto" is the default if functions are present.
   */
  function_call?: string | FunctionName;
  /** The maximum number of tokens to generate. */
  max_tokens?: number;
  /**
   * The sampling temperature to use that controls the apparent creativity of generated completions.
   * Higher values will make output more random while lower values will make results more focused
   * and deterministic.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  temperature?: number;
  /**
   * An alternative to sampling with temperature called nucleus sampling. This value causes the
   * model to consider the results of tokens with the provided probability mass. As an example, a
   * value of 0.15 will cause only the tokens comprising the top 15% of probability mass to be
   * considered.
   * It is not recommended to modify temperature and top_p for the same completions request as the
   * interaction of these two settings is difficult to predict.
   */
  top_p?: number;
  /**
   * A map between GPT token IDs and bias scores that influences the probability of specific tokens
   * appearing in a completions response. Token IDs are computed via external tokenizer tools, while
   * bias scores reside in the range of -100 to 100 with minimum and maximum values corresponding to
   * a full ban or exclusive selection of a token, respectively. The exact behavior of a given bias
   * score varies by model.
   */
  logit_bias?: Record<string, number>;
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The number of chat completions choices that should be generated for a chat completions
   * response.
   * Because this setting can generate many completions, it may quickly consume your token quota.
   * Use carefully and ensure reasonable settings for max_tokens and stop.
   */
  n?: number;
  /** A collection of textual sequences that will end completions generation. */
  stop?: string[];
  /**
   * A value that influences the probability of generated tokens appearing based on their existing
   * presence in generated text.
   * Positive values will make tokens less likely to appear when they already exist and increase the
   * model's likelihood to output new topics.
   */
  presence_penalty?: number;
  /**
   * A value that influences the probability of generated tokens appearing based on their cumulative
   * frequency in generated text.
   * Positive values will make tokens less likely to appear as their frequency increases and
   * decrease the likelihood of the model repeating the same statements verbatim.
   */
  frequency_penalty?: number;
  /** A value indicating whether chat completions should be streamed for this request. */
  stream?: boolean;
  /**
   * The model name to provide as part of this completions request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   *   The configuration entries for Azure OpenAI chat extensions that use them.
   *   This additional specification is only compatible with Azure OpenAI.
   */
  dataSources?: Array<AzureChatExtensionConfiguration>;
  /** If provided, the configuration options for available Azure OpenAI chat enhancements. */
  enhancements?: AzureChatEnhancementConfiguration;
  /**
   * If specified, the system will make a best effort to sample deterministically such that repeated requests with the
   * same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the
   * system_fingerprint response parameter to monitor changes in the backend."
   */
  seed?: number;
  /**
   * An object specifying the format that the model must output. Used to enable JSON mode.
   *
   * Possible values: text, json_object
   */
  response_format?: ChatCompletionsResponseFormat;
  /** The available tool definitions that the chat completions request can use, including caller-defined functions. */
  tools?: Array<ChatCompletionsToolDefinition>;
  /** If specified, the model will configure which of the provided tools it can use for the chat completions response. */
  tool_choice?: string | ChatCompletionsNamedToolSelection;
}

/** An abstract representation of a chat message as provided in a request. */
export interface ChatRequestMessageParent {
  role: string;
}

/**
 * A request chat message containing system instructions that influence how the model will generate a chat completions
 * response.
 */
export interface ChatRequestSystemMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'system' for system messages. */
  role: "system";
  /** The contents of the system message. */
  content: string;
  /** An optional name for the participant. */
  name?: string;
}

/** A request chat message representing user input to the assistant. */
export interface ChatRequestUserMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'user' for user messages. */
  role: "user";
  /** The contents of the user message, with available input types varying by selected model. */
  content: string | Array<ChatMessageContentItem>;
  /** An optional name for the participant. */
  name?: string;
}

/** An abstract representation of a structured content item within a chat message. */
export interface ChatMessageContentItemParent {
  type: string;
}

/** A structured chat content item containing plain text. */
export interface ChatMessageTextContentItem extends ChatMessageContentItemParent {
  /** The discriminated object type: always 'text' for this type. */
  type: "text";
  /** The content of the message. */
  text: string;
}

/** A structured chat content item containing an image reference. */
export interface ChatMessageImageContentItem extends ChatMessageContentItemParent {
  /** The discriminated object type: always 'image_url' for this type. */
  type: "image_url";
  /** An internet location, which must be accessible to the model,from which the image may be retrieved. */
  image_url: ChatMessageImageUrl;
}

/** An internet location from which the model may retrieve an image. */
export interface ChatMessageImageUrl {
  /** The URL of the image. */
  url: string;
  /**
   * The evaluation quality setting to use, which controls relative prioritization of speed, token consumption, and
   * accuracy.
   *
   * Possible values: auto, low, high
   */
  detail?: string;
}

/** A request chat message representing response or action from the assistant. */
export interface ChatRequestAssistantMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'assistant' for assistant messages. */
  role: "assistant";
  /** The content of the message. */
  content: string | null;
  /** An optional name for the participant. */
  name?: string;
  /**
   * The tool calls that must be resolved and have their outputs appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  tool_calls?: Array<ChatCompletionsToolCall>;
  /**
   * The function call that must be resolved and have its output appended to subsequent input messages for the chat
   * completions request to resolve as configured.
   */
  function_call?: FunctionCall;
}

/**
 * An abstract representation of a tool call that must be resolved in a subsequent request to perform the requested
 * chat completion.
 */
export interface ChatCompletionsToolCallParent {
  /** The ID of the tool call. */
  id: string;
  type: string;
}

/**
 * A tool call to a function tool, issued by the model in evaluation of a configured function tool, that represents
 * a function invocation needed for a subsequent chat completions request to resolve.
 */
export interface ChatCompletionsFunctionToolCall extends ChatCompletionsToolCallParent {
  /** The type of tool call, in this case always 'function'. */
  type: "function";
  /** The details of the function invocation requested by the tool call. */
  function: FunctionCall;
}

/** The name and arguments of a function that should be called, as generated by the model. */
export interface FunctionCall {
  /** The name of the function to call. */
  name: string;
  /**
   * The arguments to call the function with, as generated by the model in JSON format.
   * Note that the model does not always generate valid JSON, and may hallucinate parameters
   * not defined by your function schema. Validate the arguments in your code before calling
   * your function.
   */
  arguments: string;
}

/** A request chat message representing requested output from a configured tool. */
export interface ChatRequestToolMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'tool' for tool messages. */
  role: "tool";
  /** The content of the message. */
  content: string | null;
  /** The ID of the tool call resolved by the provided content. */
  tool_call_id: string;
}

/** A request chat message representing requested output from a configured function. */
export interface ChatRequestFunctionMessage extends ChatRequestMessageParent {
  /** The chat role associated with this message, which is always 'function' for function messages. */
  role: "function";
  /** The name of the function that was called to produce output. */
  name: string;
  /** The output of the function as requested by the function call. */
  content: string | null;
}

/** The definition of a caller-specified function that chat completions may invoke in response to matching user input. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /**
   * A description of what the function does. The model will use this description when selecting the function and
   * interpreting its parameters.
   */
  description?: string;
  /** The parameters the function accepts, described as a JSON Schema object. */
  parameters?: unknown;
}

/**
 * A structure that specifies the exact name of a specific, request-provided function to use when processing a chat
 * completions operation.
 */
export interface FunctionName {
  /** The name of the function to call. */
  name: string;
}

/**
 *   A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 *   completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 *   The use of this configuration is compatible only with Azure OpenAI.
 */
export interface AzureChatExtensionConfigurationParent {
  type: string;
}

/**
 * A specific representation of configurable options for Azure Cognitive Search when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureCognitiveSearchChatExtensionConfiguration
  extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cognitive Search.
   */
  type: "AzureCognitiveSearch";
  /** The parameters to use when configuring Azure Cognitive Search. */
  parameters: AzureCognitiveSearchChatExtensionParameters;
}

/** Parameters for Azure Cognitive Search when used as an Azure OpenAI chat extension. */
export interface AzureCognitiveSearchChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The absolute endpoint path for the Azure Cognitive Search resource to use. */
  endpoint: string;
  /** The name of the index to use as available in the referenced Azure Cognitive Search resource. */
  indexName: string;
  /** The API key to use when interacting with the Azure Cognitive Search resource. */
  key?: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fieldsMapping?: AzureCognitiveSearchIndexFieldMappingOptions;
  /**
   * The query type to use with Azure Cognitive Search.
   *
   * Possible values: simple, semantic, vector, vectorSimpleHybrid, vectorSemanticHybrid
   */
  queryType?: string;
  /** The additional semantic configuration for the query. */
  semanticConfiguration?: string;
  /** Search filter. */
  filter?: string;
  /** When using embeddings for search, specifies the resource endpoint URL from which embeddings should be retrieved. It should be in the format of format `https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/embeddings?api-version={api-version}`. */
  embeddingEndpoint?: string;
  /** When using embeddings, specifies the API key to use with the provided embeddings endpoint. */
  embeddingKey?: string;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSource;
}

/** The authentication options for Azure OpenAI On Your Data. */
export interface OnYourDataAuthenticationOptionsParent {
  type: string;
}

/** The authentication options for Azure OpenAI On Your Data when using an API key. */
export interface OnYourDataApiKeyAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of API key. */
  type: "APIKey";
  /** The API key to use for authentication. */
  key: string;
}

/** The authentication options for Azure OpenAI On Your Data when using a connection string. */
export interface OnYourDataConnectionStringAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of connection string. */
  type: "ConnectionString";
  /** The connection string to use for authentication. */
  connectionString: string;
}

/** The authentication options for Azure OpenAI On Your Data when using an Elasticsearch key and key ID pair. */
export interface OnYourDataKeyAndKeyIdAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of Elasticsearch key and key ID pair. */
  type: "KeyAndKeyId";
  /** The key to use for authentication. */
  key: string;
  /** The key ID to use for authentication. */
  keyId: string;
}

/** The authentication options for Azure OpenAI On Your Data when using a system-assigned managed identity. */
export interface OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of system-assigned managed identity. */
  type: "SystemAssignedManagedIdentity";
}

/** The authentication options for Azure OpenAI On Your Data when using a user-assigned managed identity. */
export interface OnYourDataUserAssignedManagedIdentityAuthenticationOptions
  extends OnYourDataAuthenticationOptionsParent {
  /** The authentication type of user-assigned managed identity. */
  type: "UserAssignedManagedIdentity";
  /** The resource ID of the user-assigned managed identity to use for authentication. */
  managedIdentityResourceId: string;
}

/** Optional settings to control how fields are processed when using a configured Azure Cognitive Search resource. */
export interface AzureCognitiveSearchIndexFieldMappingOptions {
  /** The name of the index field to use as a title. */
  titleField?: string;
  /** The name of the index field to use as a URL. */
  urlField?: string;
  /** The name of the index field to use as a filepath. */
  filepathField?: string;
  /** The names of index fields that should be treated as content. */
  contentFields?: string[];
  /** The separator pattern that content fields should use. */
  contentFieldsSeparator?: string;
  /** The names of fields that represent vector data. */
  vectorFields?: string[];
  /** The names of fields that represent image vector data. */
  imageVectorFields?: string[];
}

/** An abstract representation of a vectorization source for Azure OpenAI On Your Data with vector search. */
export interface OnYourDataVectorizationSourceParent {
  type: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on a public Azure OpenAI endpoint call for embeddings.
 */
export interface OnYourDataEndpointVectorizationSource extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'Endpoint' for this type. */
  type: "Endpoint";
  /** Specifies the resource endpoint URL from which embeddings should be retrieved. It should be in the format of https://YOUR_RESOURCE_NAME.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT_NAME/embeddings. The api-version query parameter is not allowed. */
  endpoint: string;
  /** Specifies the authentication options to use when retrieving embeddings from the specified endpoint. */
  authentication: OnYourDataAuthenticationOptions;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on an internal embeddings model deployment name in the same Azure OpenAI resource.
 */
export interface OnYourDataDeploymentNameVectorizationSource
  extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'DeploymentName' for this type. */
  type: "DeploymentName";
  /** The embedding model deployment name within the same Azure OpenAI resource. This enables you to use vector search without Azure OpenAI api-key and without Azure OpenAI public network access. */
  deploymentName: string;
}

/**
 * The details of a a vectorization source, used by Azure OpenAI On Your Data when applying vector search, that is based
 * on a search service model ID. Currently only supported by Elasticsearch®.
 */
export interface OnYourDataModelIdVectorizationSource extends OnYourDataVectorizationSourceParent {
  /** The type of vectorization source to use. Always 'ModelId' for this type. */
  type: "ModelId";
  /** The embedding model ID build inside the search service. Currently only supported by Elasticsearch®. */
  modelId: string;
}

/**
 * A specific representation of configurable options for Azure Machine Learning vector index when using it as an Azure
 * OpenAI chat extension.
 */
export interface AzureMachineLearningIndexChatExtensionConfiguration
  extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Machine Learning vector index.
   */
  type: "AzureMLIndex";
  /** The parameters for the Azure Machine Learning vector index chat extension. */
  parameters: AzureMachineLearningIndexChatExtensionParameters;
}

/** Parameters for the Azure Machine Learning vector index chat extension. */
export interface AzureMachineLearningIndexChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The resource ID of the Azure Machine Learning project. */
  projectResourceId: string;
  /** The Azure Machine Learning vector index name. */
  name: string;
  /** The version of the Azure Machine Learning vector index. */
  version: string;
  /** Search filter. Only supported if the Azure Machine Learning vector index is of type AzureSearch. */
  filter?: string;
}

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface AzureCosmosDBChatExtensionConfiguration
  extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Azure Cosmos DB.
   */
  type: "AzureCosmosDB";
  /** The parameters to use when configuring Azure OpenAI CosmosDB chat extensions. */
  parameters: AzureCosmosDBChatExtensionParameters;
}

/**
 * Parameters to use when configuring Azure OpenAI On Your Data chat extensions when using Azure Cosmos DB for
 * MongoDB vCore.
 */
export interface AzureCosmosDBChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The MongoDB vCore database name to use with Azure Cosmos DB. */
  databaseName: string;
  /** The name of the Azure Cosmos DB resource container. */
  containerName: string;
  /** The MongoDB vCore index name to use with Azure Cosmos DB. */
  indexName: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fieldsMapping: AzureCosmosDBFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Azure Cosmos DB resource. */
export interface AzureCosmosDBFieldMappingOptions {
  /** The names of fields that represent vector data. */
  vectorFields: string[];
}

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface ElasticsearchChatExtensionConfiguration
  extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Elasticsearch®.
   */
  type: "Elasticsearch";
  /** The parameters to use when configuring Elasticsearch®. */
  parameters: ElasticsearchChatExtensionParameters;
}

/** Parameters to use when configuring Elasticsearch® as an Azure OpenAI chat extension. */
export interface ElasticsearchChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The endpoint of Elasticsearch®. */
  endpoint: string;
  /** The index name of Elasticsearch®. */
  indexName: string;
  /** The index field mapping options of Elasticsearch®. */
  fieldsMapping?: ElasticsearchIndexFieldMappingOptions;
  /**
   * The query type of Elasticsearch®.
   *
   * Possible values: simple, vector
   */
  queryType?: string;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Elasticsearch® resource. */
export interface ElasticsearchIndexFieldMappingOptions {
  /** The name of the index field to use as a title. */
  titleField?: string;
  /** The name of the index field to use as a URL. */
  urlField?: string;
  /** The name of the index field to use as a filepath. */
  filepathField?: string;
  /** The names of index fields that should be treated as content. */
  contentFields?: string[];
  /** The separator pattern that content fields should use. */
  contentFieldsSeparator?: string;
  /** The names of fields that represent vector data. */
  vectorFields?: string[];
}

/**
 * A specific representation of configurable options for Elasticsearch when using it as an Azure OpenAI chat
 * extension.
 */
export interface PineconeChatExtensionConfiguration extends AzureChatExtensionConfigurationParent {
  /**
   * The type label to use when configuring Azure OpenAI chat extensions. This should typically not be changed from its
   * default value for Pinecone.
   */
  type: "Pinecone";
  /** The parameters to use when configuring Azure OpenAI chat extensions. */
  parameters: PineconeChatExtensionParameters;
}

/** Parameters for configuring Azure OpenAI Pinecone chat extensions. */
export interface PineconeChatExtensionParameters {
  /**
   * The authentication method to use when accessing the defined data source.
   * Each data source type supports a specific set of available authentication methods; please see the documentation of
   * the data source for supported mechanisms.
   * If not otherwise provided, On Your Data will attempt to use System Managed Identity (default credential)
   * authentication.
   */
  authentication?: OnYourDataAuthenticationOptions;
  /** The configured top number of documents to feature for the configured query. */
  topNDocuments?: number;
  /** Whether queries should be restricted to use of indexed data. */
  inScope?: boolean;
  /** The configured strictness of the search relevance filtering. The higher of strictness, the higher of the precision but lower recall of the answer. */
  strictness?: number;
  /** Give the model instructions about how it should behave and any context it should reference when generating a response. You can describe the assistant's personality and tell it how to format responses. There's a 100 token limit for it, and it counts against the overall token limit. */
  roleInformation?: string;
  /** The environment name of Pinecone. */
  environment: string;
  /** The name of the Pinecone database index. */
  indexName: string;
  /** Customized field mapping behavior to use when interacting with the search index. */
  fieldsMapping: PineconeFieldMappingOptions;
  /** The embedding dependency for vector search. */
  embeddingDependency?: OnYourDataVectorizationSource;
}

/** Optional settings to control how fields are processed when using a configured Pinecone resource. */
export interface PineconeFieldMappingOptions {
  /** The name of the index field to use as a title. */
  titleField?: string;
  /** The name of the index field to use as a URL. */
  urlField?: string;
  /** The name of the index field to use as a filepath. */
  filepathField?: string;
  /** The names of index fields that should be treated as content. */
  contentFields?: string[];
  /** The separator pattern that content fields should use. */
  contentFieldsSeparator?: string;
  /** The names of fields that represent vector data. */
  vectorFields?: string[];
  /** The names of fields that represent image vector data. */
  imageVectorFields?: string[];
}

/** A representation of the available Azure OpenAI enhancement configurations. */
export interface AzureChatEnhancementConfiguration {
  /** A representation of the available options for the Azure OpenAI grounding enhancement. */
  grounding?: AzureChatGroundingEnhancementConfiguration;
  /** A representation of the available options for the Azure OpenAI optical character recognition (OCR) enhancement. */
  ocr?: AzureChatOCREnhancementConfiguration;
}

/** A representation of the available options for the Azure OpenAI grounding enhancement. */
export interface AzureChatGroundingEnhancementConfiguration {
  /** Specifies whether the enhancement is enabled. */
  enabled: boolean;
}

/** A representation of the available options for the Azure OpenAI optical character recognition (OCR) enhancement. */
export interface AzureChatOCREnhancementConfiguration {
  /** Specifies whether the enhancement is enabled. */
  enabled: boolean;
}

/** An abstract representation of a tool that can be used by the model to improve a chat completions response. */
export interface ChatCompletionsToolDefinitionParent {
  type: string;
}

/** The definition information for a chat completions function tool that can call a function in response to a tool call. */
export interface ChatCompletionsFunctionToolDefinition extends ChatCompletionsToolDefinitionParent {
  /** The object name, which is always 'function'. */
  type: "function";
  /** The function definition details for the function tool. */
  function: FunctionDefinition;
}

/** An abstract representation of an explicit, named tool selection to use for a chat completions request. */
export interface ChatCompletionsNamedToolSelectionParent {
  type: string;
}

/** A tool selection of a specific, named function tool that will limit chat completions to using the named function. */
export interface ChatCompletionsNamedFunctionToolSelection
  extends ChatCompletionsNamedToolSelectionParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** Specifies a tool the model should use. Used to force the model to call a specific function. */
  function: {
    /** The name of the function that should be called. */
    name: string;
  };
}

/** Represents the request data used to generate images. */
export interface ImageGenerationOptions {
  /**
   * The model name or Azure OpenAI model deployment name to use for image generation. If not specified, dall-e-2 will be
   * inferred as a default.
   */
  model?: string;
  /** A description of the desired images. */
  prompt: string;
  /**
   * The number of images to generate.
   * Dall-e-2 models support values between 1 and 10.
   * Dall-e-3 models only support a value of 1.
   */
  n?: number;
  /**
   * The desired dimensions for generated images.
   * Dall-e-2 models support 256x256, 512x512, or 1024x1024.
   * Dall-e-3 models support 1024x1024, 1792x1024, or 1024x1792.
   *
   * Possible values: 256x256, 512x512, 1024x1024, 1792x1024, 1024x1792
   */
  size?: string;
  /**
   * The format in which image generation response items should be presented.
   *
   * Possible values: url, b64_json
   */
  response_format?: string;
  /**
   * The desired image generation quality level to use.
   * Only configurable with dall-e-3 models.
   *
   * Possible values: standard, hd
   */
  quality?: string;
  /**
   * The desired image generation style to use.
   * Only configurable with dall-e-3 models.
   *
   * Possible values: natural, vivid
   */
  style?: string;
  /** A unique identifier representing your end-user, which can help to monitor and detect abuse. */
  user?: string;
}

/**
 * The configuration information for an embeddings request.
 * Embeddings measure the relatedness of text strings and are commonly used for search, clustering,
 * recommendations, and other similar scenarios.
 */
export interface EmbeddingsOptions {
  /**
   * An identifier for the caller or end user of the operation. This may be used for tracking
   * or rate-limiting purposes.
   */
  user?: string;
  /**
   * The model name to provide as part of this embeddings request.
   * Not applicable to Azure OpenAI, where deployment information should be included in the Azure
   * resource URI that's connected to.
   */
  model?: string;
  /**
   * Input texts to get embeddings for, encoded as a an array of strings.
   * Each input must not exceed 2048 tokens in length.
   *
   * Unless you are embedding code, we suggest replacing newlines (\\n) in your input with a single space,
   * as we have observed inferior results when newlines are present.
   */
  input: string[];
}

/** An abstract representation of a chat message as provided in a request. */
export type ChatRequestMessage =
  | ChatRequestSystemMessage
  | ChatRequestUserMessage
  | ChatRequestAssistantMessage
  | ChatRequestToolMessage
  | ChatRequestFunctionMessage;
/** An abstract representation of a structured content item within a chat message. */
export type ChatMessageContentItem = ChatMessageTextContentItem | ChatMessageImageContentItem;
/**
 * An abstract representation of a tool call that must be resolved in a subsequent request to perform the requested
 * chat completion.
 */
export type ChatCompletionsToolCall = ChatCompletionsFunctionToolCall;
/**
 *   A representation of configuration data for a single Azure OpenAI chat extension. This will be used by a chat
 *   completions request that should use Azure OpenAI chat extensions to augment the response behavior.
 *   The use of this configuration is compatible only with Azure OpenAI.
 */
export type AzureChatExtensionConfiguration =
  | AzureCognitiveSearchChatExtensionConfiguration
  | AzureMachineLearningIndexChatExtensionConfiguration
  | AzureCosmosDBChatExtensionConfiguration
  | ElasticsearchChatExtensionConfiguration
  | PineconeChatExtensionConfiguration;
/** The authentication options for Azure OpenAI On Your Data. */
export type OnYourDataAuthenticationOptions =
  | OnYourDataApiKeyAuthenticationOptions
  | OnYourDataConnectionStringAuthenticationOptions
  | OnYourDataKeyAndKeyIdAuthenticationOptions
  | OnYourDataSystemAssignedManagedIdentityAuthenticationOptions
  | OnYourDataUserAssignedManagedIdentityAuthenticationOptions;
/** An abstract representation of a vectorization source for Azure OpenAI On Your Data with vector search. */
export type OnYourDataVectorizationSource =
  | OnYourDataEndpointVectorizationSource
  | OnYourDataDeploymentNameVectorizationSource
  | OnYourDataModelIdVectorizationSource;
/** An abstract representation of a tool that can be used by the model to improve a chat completions response. */
export type ChatCompletionsToolDefinition = ChatCompletionsFunctionToolDefinition;
/** An abstract representation of an explicit, named tool selection to use for a chat completions request. */
export type ChatCompletionsNamedToolSelection = ChatCompletionsNamedFunctionToolSelection;

/** The standard Chat Completions response format that can freely generate text and is not guaranteed to produce response
content that adheres to a specific schema. */
export interface ChatCompletionsTextResponseFormat {
  /** The object type, which is always 'text' for this object. */
  type: "text";
}
/** A response format for Chat Completions that restricts responses to emitting valid JSON objects.
 */
export interface ChatCompletionsJsonResponseFormat {
  /** The object type, which is always 'json_object' for this object. */
  type: "json_object";
}

/** The valid response formats Chat Completions can provide. Used to enable JSON mode. */
export type ChatCompletionsResponseFormat =
  | ChatCompletionsTextResponseFormat
  | ChatCompletionsJsonResponseFormat;
