// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The request details to use when creating a new agent. */
export interface CreateAgentOptions {
  /** The ID of the model to use. */
  model: string;
  /** The name of the new agent. */
  name?: string | null;
  /** The description of the new agent. */
  description?: string | null;
  /** The system instructions for the new agent to use. */
  instructions?: string | null;
  /** The collection of tools to enable for the new agent. */
  tools?: Array<ToolDefinition>;
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  tool_resources?: ToolResources | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;
  /** The response format of the tool calls used by this agent. */
  response_format?: AgentsApiResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** An abstract representation of an input tool definition that an agent can use. */
export interface ToolDefinitionParent {
  type: string;
}

/** The input definition information for a code interpreter tool as used to configure an agent. */
export interface CodeInterpreterToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

/** The input definition information for a file search tool as used to configure an agent. */
export interface FileSearchToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** Options overrides for the file search tool. */
  file_search?: FileSearchToolDefinitionDetails;
}

/** Options overrides for the file search tool. */
export interface FileSearchToolDefinitionDetails {
  /**
   * The maximum number of results the file search tool should output. The default is 20 for gpt-4* models and 5 for gpt-3.5-turbo. This number should be between 1 and 50 inclusive.
   *
   * Note that the file search tool may output fewer than `max_num_results` results. See the file search tool documentation for more information.
   */
  max_num_results?: number;
  ranking_options?: FileSearchRankingOptions;
}

/** Ranking options for file search. */
export interface FileSearchRankingOptions {
  /** File search ranker. */
  ranker: string;
  /** Ranker search threshold. */
  score_threshold: number;
}

/** The input definition information for a function tool as used to configure an agent. */
export interface FunctionToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinition;
}

/** The input definition information for a function. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: unknown;
}

/** The input definition information for a bing grounding search tool as used to configure an agent. */
export interface BingGroundingToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'bing_grounding'. */
  type: "bing_grounding";
  /** The list of connections used by the bing grounding tool. */
  bing_grounding: ToolConnectionList;
}

/** A set of connection resources currently used by either the `bing_grounding`, `microsoft_fabric`, or `sharepoint_grounding` tools. */
export interface ToolConnectionList {
  /**
   * The connections attached to this tool. There can be a maximum of 1 connection
   * resource attached to the tool.
   */
  connections?: Array<ToolConnection>;
}

/** A connection resource. */
export interface ToolConnection {
  /** A connection in a ToolConnectionList attached to this tool. */
  connection_id: string;
}

/** The input definition information for a Microsoft Fabric tool as used to configure an agent. */
export interface MicrosoftFabricToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'microsoft_fabric'. */
  type: "microsoft_fabric";
  /** The list of connections used by the Microsoft Fabric tool. */
  microsoft_fabric: ToolConnectionList;
}

/** The input definition information for a sharepoint tool as used to configure an agent. */
export interface SharepointToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'sharepoint_grounding'. */
  type: "sharepoint_grounding";
  /** The list of connections used by the SharePoint tool. */
  sharepoint_grounding: ToolConnectionList;
}

/** The input definition information for an Azure AI search tool as used to configure an agent. */
export interface AzureAISearchToolDefinition extends ToolDefinitionParent {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
}

/**
 * A set of resources that are used by the agent's tools. The resources are specific to the type of
 * tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search`
 * tool requires a list of vector store IDs.
 */
export interface ToolResources {
  /** Resources to be used by the `code_interpreter tool` consisting of file IDs. */
  code_interpreter?: CodeInterpreterToolResource;
  /** Resources to be used by the `file_search` tool consisting of vector store IDs. */
  file_search?: FileSearchToolResource;
  /** Resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azure_ai_search?: AzureAISearchResource;
}

/** A set of resources that are used by the `code_interpreter` tool. */
export interface CodeInterpreterToolResource {
  /**
   * A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  file_ids?: string[];
  /** The data sources to be used. This option is mutually exclusive with fileIds. */
  data_sources?: Array<VectorStoreDataSource>;
}

/**
 * The structure, containing Azure asset URI path and the asset type of the file used as a data source
 * for the enterprise file search.
 */
export interface VectorStoreDataSource {
  /** Asset URI. */
  uri: string;
  /** The asset type * */
  type: VectorStoreDataSourceAssetType;
}

/** A set of resources that are used by the `file_search` tool. */
export interface FileSearchToolResource {
  /**
   * The ID of the vector store attached to this agent. There can be a maximum of 1 vector
   * store attached to the agent.
   */
  vector_store_ids?: string[];
  /**
   * The list of vector store configuration objects from Azure. This list is limited to one
   * element. The only element of this list contains
   * the list of azure asset IDs used by the search tool.
   */
  vector_stores?: Array<VectorStoreConfigurations>;
}

/** The structure, containing the list of vector storage configurations i.e. the list of azure asset IDs. */
export interface VectorStoreConfigurations {
  /** Name */
  name: string;
  /** Configurations */
  configuration: VectorStoreConfiguration;
}

/**
 * Vector storage configuration is the list of data sources, used when multiple
 * files can be used for the enterprise file search.
 */
export interface VectorStoreConfiguration {
  /** Data sources */
  data_sources: Array<VectorStoreDataSource>;
}

/** A set of index resources used by the `azure_ai_search` tool. */
export interface AzureAISearchResource {
  /**
   * The indices attached to this agent. There can be a maximum of 1 index
   * resource attached to the agent.
   */
  indexes?: Array<IndexResource>;
}

/** A Index resource. */
export interface IndexResource {
  /** An index connection id in an IndexResource attached to this agent. */
  index_connection_id: string;
  /** The name of an index in an IndexResource attached to this agent. */
  index_name: string;
}

/**
 * An object describing the expected output of the model. If `json_object` only `function` type `tools` are allowed to be passed to the Run.
 * If `text` the model can return text or any value needed.
 */
export interface AgentsApiResponseFormat {
  /**
   * Must be one of `text` or `json_object`.
   *
   * Possible values: "text", "json_object"
   */
  type?: ApiResponseFormat;
}

/** The request details to use when modifying an existing agent. */
export interface UpdateAgentOptions {
  /** The ID of the model to use. */
  model?: string;
  /** The modified name for the agent to use. */
  name?: string | null;
  /** The modified description for the agent to use. */
  description?: string | null;
  /** The modified system instructions for the new agent to use. */
  instructions?: string | null;
  /** The modified collection of tools to enable for the agent. */
  tools?: Array<ToolDefinition>;
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example,
   * the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  tool_resources?: ToolResources;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;
  /** The response format of the tool calls used by this agent. */
  response_format?: AgentsApiResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** The details used to create a new agent thread. */
export interface AgentThreadCreationOptions {
  /** The initial messages to associate with the new thread. */
  messages?: Array<ThreadMessageOptions>;
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the
   * type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires
   * a list of vector store IDs.
   */
  tool_resources?: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** A single message within an agent thread, as provided during that thread's creation for its initial state. */
export interface ThreadMessageOptions {
  /**
   * The role of the entity that is creating the message. Allowed values include:
   * - `user`: Indicates the message is sent by an actual user and should be used in most
   * cases to represent user-generated messages.
   * - `assistant`: Indicates the message is generated by the agent. Use this value to insert
   * messages from the agent into the
   * conversation.
   *
   * Possible values: "user", "assistant"
   */
  role: MessageRole;
  /**
   * The textual content of the initial message. Currently, robust input including images and annotated text may only be provided via
   * a separate call to the create message API.
   */
  content: string;
  /** A list of files attached to the message, and the tools they should be added to. */
  attachments?: Array<MessageAttachment> | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** This describes to which tools a file has been attached. */
export interface MessageAttachment {
  /** The ID of the file to attach to the message. */
  file_id?: string;
  /** Azure asset ID. */
  data_sources?: Array<VectorStoreDataSource>;
  /** The tools to add to this file. */
  tools: MessageAttachmentToolDefinition[];
}

/** The details used to update an existing agent thread */
export interface UpdateAgentThreadOptions {
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the
   * type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires
   * a list of vector store IDs
   */
  tool_resources?: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** A single, existing message within an agent thread. */
export interface ThreadMessage {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message'. */
  object: "thread.message";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  created_at: number;
  /** The ID of the thread that this message belongs to. */
  thread_id: string;
  /**
   * The status of the message.
   *
   * Possible values: "in_progress", "incomplete", "completed"
   */
  status: MessageStatus;
  /** On an incomplete message, details about why the message is incomplete. */
  incomplete_details: MessageIncompleteDetails | null;
  /** The Unix timestamp (in seconds) for when the message was completed. */
  completed_at: number | null;
  /** The Unix timestamp (in seconds) for when the message was marked as incomplete. */
  incomplete_at: number | null;
  /**
   * The role associated with the agent thread message.
   *
   * Possible values: "user", "assistant"
   */
  role: MessageRole;
  /** The list of content items associated with the agent thread message. */
  content: Array<MessageContent>;
  /** If applicable, the ID of the agent that authored this message. */
  assistant_id: string | null;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  run_id: string | null;
  /** A list of files attached to the message, and the tools they were added to. */
  attachments: Array<MessageAttachment> | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** Information providing additional detail about a message entering an incomplete status. */
export interface MessageIncompleteDetails {
  /**
   * The provided reason describing why the message was marked as incomplete.
   *
   * Possible values: "content_filter", "max_tokens", "run_cancelled", "run_failed", "run_expired"
   */
  reason: MessageIncompleteDetailsReason;
}

/** An abstract representation of a single item of thread message content. */
export interface MessageContentParent {
  type: string;
}

/** A representation of a textual item of thread message content. */
export interface MessageTextContent extends MessageContentParent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: MessageTextDetails;
}

/** The text and associated annotations for a single item of agent thread message content. */
export interface MessageTextDetails {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: Array<MessageTextAnnotation>;
}

/** An abstract representation of an annotation to text thread message content. */
export interface MessageTextAnnotationParent {
  /** The textual content associated with this text annotation item. */
  text: string;
  type: string;
}

/** A citation within the message that points to a specific quote from a specific File associated with the agent or the message. Generated when the agent uses the 'file_search' tool to search files. */
export interface MessageTextFileCitationAnnotation
  extends MessageTextAnnotationParent {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /**
   * A citation within the message that points to a specific quote from a specific file.
   * Generated when the agent uses the "file_search" tool to search files.
   */
  file_citation: MessageTextFileCitationDetails;
  /** The first text index associated with this text annotation. */
  start_index?: number;
  /** The last text index associated with this text annotation. */
  end_index?: number;
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface MessageTextFileCitationDetails {
  /** The ID of the file associated with this citation. */
  file_id: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

/** A citation within the message that points to a file located at a specific path. */
export interface MessageTextFilePathAnnotation
  extends MessageTextAnnotationParent {
  /** The object type, which is always 'file_path'. */
  type: "file_path";
  /** A URL for the file that's generated when the agent used the code_interpreter tool to generate a file. */
  file_path: MessageTextFilePathDetails;
  /** The first text index associated with this text annotation. */
  start_index?: number;
  /** The last text index associated with this text annotation. */
  end_index?: number;
}

/** An encapsulation of an image file ID, as used by message image content. */
export interface MessageTextFilePathDetails {
  /** The ID of the specific file that the citation is from. */
  file_id: string;
}

/** A representation of image file content in a thread message. */
export interface MessageImageFileContent extends MessageContentParent {
  /** The object type, which is always 'image_file'. */
  type: "image_file";
  /** The image file for this thread message content item. */
  image_file: MessageImageFileDetails;
}

/** An image reference, as represented in thread message content. */
export interface MessageImageFileDetails {
  /** The ID for the file associated with this image. */
  file_id: string;
}

/** The details used when creating a new run of an agent thread. */
export interface CreateRunOptions {
  /** The ID of the agent that should run the thread. */
  assistant_id: string;
  /** The overridden model name that the agent should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions that the agent should use to run the thread. */
  instructions?: string | null;
  /**
   * Additional instructions to append at the end of the instructions for the run. This is useful for modifying the behavior
   * on a per-run basis without overriding other instructions.
   */
  additional_instructions?: string | null;
  /** Adds additional messages to the thread before creating the run. */
  additional_messages?: Array<ThreadMessage> | null;
  /** The overridden list of enabled tools that the agent should use to run the thread. */
  tools?: Array<ToolDefinition> | null;
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent events,
   * terminating when the Run enters a terminal state with a `data: [DONE]` message.
   */
  stream?: boolean;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
   * more random, while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model
   * considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens
   * comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified,
   * the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  max_prompt_tokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort
   * to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of
   * completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  max_completion_tokens?: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncation_strategy?: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  tool_choice?: AgentsApiToolChoiceOption | null;
  /** Specifies the format that the model must output. */
  response_format?: AgentsApiResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/**
 * Controls for how a thread will be truncated prior to the run. Use this to control the initial
 * context window of the run.
 */
export interface TruncationObject {
  /**
   * The truncation strategy to use for the thread. The default is `auto`. If set to `last_messages`, the thread will
   * be truncated to the `lastMessages` count most recent messages in the thread. When set to `auto`, messages in the middle of the thread
   * will be dropped to fit the context length of the model, `max_prompt_tokens`.
   *
   * Possible values: "auto", "last_messages"
   */
  type: TruncationStrategy;
  /** The number of most recent messages from the thread when constructing the context for the run. */
  last_messages?: number | null;
}

/** Specifies a tool the model should use. Use to force the model to call a specific tool. */
export interface AgentsNamedToolChoice {
  /**
   * the type of tool. If type is `function`, the function name must be set.
   *
   * Possible values: "function", "code_interpreter", "file_search", "bing_grounding", "microsoft_fabric", "sharepoint_grounding", "azure_ai_search"
   */
  type: AgentsNamedToolChoiceType;
  /** The name of the function to call */
  function?: FunctionName;
}

/** The function name that will be used, if using the `function` tool */
export interface FunctionName {
  /** The name of the function to call */
  name: string;
}

/**
 * Request object. A set of resources that are used by the agent's tools. The resources are specific to the type of tool.
 * For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of
 * vector store IDs.
 */
export interface UpdateToolResourcesOptions {
  /**
   * Overrides the list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  code_interpreter?: UpdateCodeInterpreterToolResourceOptions;
  /** Overrides the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent. */
  file_search?: UpdateFileSearchToolResourceOptions;
  /** Overrides the resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azure_ai_search?: AzureAISearchResource;
}

/** Request object to update `code_interpreted` tool resources. */
export interface UpdateCodeInterpreterToolResourceOptions {
  /** A list of file IDs to override the current list of the agent. */
  file_ids?: string[];
}

/** Request object to update `file_search` tool resources. */
export interface UpdateFileSearchToolResourceOptions {
  /** A list of vector store IDs to override the current list of the agent. */
  vector_store_ids?: string[];
}

/** The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue. */
export interface ToolOutput {
  /** The ID of the tool call being resolved, as provided in the tool calls of a required action from a run. */
  tool_call_id?: string;
  /** The output from the tool to be submitted. */
  output?: string;
}

/** The details used when creating and immediately running a new agent thread. */
export interface CreateAndRunThreadOptions {
  /** The ID of the agent for which the thread should be created. */
  assistant_id: string;
  /** The details used to create the new thread. If no thread is provided, an empty one will be created. */
  thread?: AgentThreadCreationOptions;
  /** The overridden model that the agent should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions the agent should use to run the thread. */
  instructions?: string | null;
  /** The overridden list of enabled tools the agent should use to run the thread. */
  tools?: Array<ToolDefinition> | null;
  /** Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis */
  tool_resources?: UpdateToolResourcesOptions | null;
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent events,
   * terminating when the Run enters a terminal state with a `data: [DONE]` message.
   */
  stream?: boolean;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output
   * more random, while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature?: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model
   * considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens
   * comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  top_p?: number | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified,
   * the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  max_prompt_tokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens
   * specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  max_completion_tokens?: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncation_strategy?: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  tool_choice?: AgentsApiToolChoiceOption | null;
  /** Specifies the format that the model must output. */
  response_format?: AgentsApiResponseFormatOption | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** The expiration policy for a vector store. */
export interface VectorStoreExpirationPolicy {
  /**
   * Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.
   *
   * Possible values: "last_active_at"
   */
  anchor: VectorStoreExpirationPolicyAnchor;
  /** The anchor timestamp after which the expiration policy applies. */
  days: number;
}

/** Request object for creating a vector store. */
export interface VectorStoreOptions {
  /** A list of file IDs that the vector store should use. Useful for tools like `file_search` that can access files. */
  file_ids?: string[];
  /** The name of the vector store. */
  name?: string;
  /** The vector store configuration, used when vector store is created from Azure asset URIs. */
  configuration?: VectorStoreConfiguration;
  /** Details on when this vector store expires */
  expires_after?: VectorStoreExpirationPolicy;
  /** The chunking strategy used to chunk the file(s). If not set, will use the auto strategy. Only applicable if file_ids is non-empty. */
  chunking_strategy?: VectorStoreChunkingStrategyRequest;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** An abstract representation of a vector store chunking strategy configuration. */
export interface VectorStoreChunkingStrategyRequestParent {
  type: VectorStoreChunkingStrategyRequestType;
}

/** The default strategy. This strategy currently uses a max_chunk_size_tokens of 800 and chunk_overlap_tokens of 400. */
export interface VectorStoreAutoChunkingStrategyRequest
  extends VectorStoreChunkingStrategyRequestParent {
  /** The object type, which is always 'auto'. */
  type: "auto";
}

/** A statically configured chunking strategy. */
export interface VectorStoreStaticChunkingStrategyRequest
  extends VectorStoreChunkingStrategyRequestParent {
  /** The object type, which is always 'static'. */
  type: "static";
  /** The options for the static chunking strategy. */
  static: VectorStoreStaticChunkingStrategyOptions;
}

/** Options to configure a vector store static chunking strategy. */
export interface VectorStoreStaticChunkingStrategyOptions {
  /** The maximum number of tokens in each chunk. The default value is 800. The minimum value is 100 and the maximum value is 4096. */
  max_chunk_size_tokens: number;
  /**
   * The number of tokens that overlap between chunks. The default value is 400.
   * Note that the overlap must not exceed half of max_chunk_size_tokens.
   */
  chunk_overlap_tokens: number;
}

/** Request object for updating a vector store. */
export interface VectorStoreUpdateOptions {
  /** The name of the vector store. */
  name?: string | null;
  /** Details on when this vector store expires */
  expires_after?: VectorStoreExpirationPolicy | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Evaluation Definition */
export interface Evaluation {
  /** Data for evaluation. */
  data: InputData;
  /** Display Name for evaluation. It helps to find evaluation easily in AI Studio. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
}

/** Abstract data class for input data configuration. */
export interface InputDataParent {
  type: string;
}

/** Data Source for Application Insights. */
export interface ApplicationInsightsConfiguration extends InputDataParent {
  /** LogAnalytic Workspace resourceID associated with ApplicationInsights */
  resourceId: string;
  /** Query to fetch the data. */
  query: string;
  /** Service name. */
  serviceName: string;
  /** Connection String to connect to ApplicationInsights. */
  connectionString?: string;
}

/** Dataset as source for evaluation. */
export interface Dataset extends InputDataParent {
  /** Evaluation input data */
  id: string;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {}

/** Evaluator Configuration */
export interface EvaluatorConfiguration {
  /** Identifier of the evaluator. */
  id: string;
  /** Initialization parameters of the evaluator. */
  initParams?: Record<string, unknown>;
  /** Data parameters of the evaluator. */
  dataMapping?: Record<string, string>;
}

/** Evaluation Schedule Definition */
export interface EvaluationSchedule {
  /** Data for evaluation. */
  data: ApplicationInsightsConfiguration;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
  /** Trigger for the evaluation. */
  trigger: Trigger;
}

/** Abstract data class for input data configuration. */
export interface TriggerParent {
  type: string;
}

/** Recurrence Trigger Definition */
export interface RecurrenceTrigger extends TriggerParent {
  /**
   * The frequency to trigger schedule.
   *
   * Possible values: "Month", "Week", "Day", "Hour", "Minute"
   */
  frequency: Frequency;
  /** Specifies schedule interval in conjunction with frequency */
  interval: number;
  /** The recurrence schedule. */
  schedule?: RecurrenceSchedule;
}

/** RecurrenceSchedule Definition */
export interface RecurrenceSchedule {
  /** List of hours for the schedule. */
  hours: number[];
  /** List of minutes for the schedule. */
  minutes: number[];
  /** List of days for the schedule. */
  weekDays?: WeekDays[];
  /** List of month days for the schedule */
  monthDays?: number[];
}

/** Cron Trigger Definition */
export interface CronTrigger extends TriggerParent {
  /** Cron expression for the trigger. */
  expression: string;
}

/** An abstract representation of an input tool definition that an agent can use. */
export type ToolDefinition =
  | ToolDefinitionParent
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition
  | FunctionToolDefinition
  | BingGroundingToolDefinition
  | MicrosoftFabricToolDefinition
  | SharepointToolDefinition
  | AzureAISearchToolDefinition;
/** An abstract representation of a single item of thread message content. */
export type MessageContent =
  | MessageContentParent
  | MessageTextContent
  | MessageImageFileContent;
/** An abstract representation of an annotation to text thread message content. */
export type MessageTextAnnotation =
  | MessageTextAnnotationParent
  | MessageTextFileCitationAnnotation
  | MessageTextFilePathAnnotation;
/** An abstract representation of a vector store chunking strategy configuration. */
export type VectorStoreChunkingStrategyRequest =
  | VectorStoreChunkingStrategyRequestParent
  | VectorStoreAutoChunkingStrategyRequest
  | VectorStoreStaticChunkingStrategyRequest;
/** Abstract data class for input data configuration. */
export type InputData =
  | InputDataParent
  | ApplicationInsightsConfiguration
  | Dataset;
/** Abstract data class for input data configuration. */
export type Trigger = TriggerParent | RecurrenceTrigger | CronTrigger;
/** Alias for VectorStoreDataSourceAssetType */
export type VectorStoreDataSourceAssetType = "uri_asset" | "id_asset";
/** Alias for AgentsApiResponseFormatMode */
export type AgentsApiResponseFormatMode = string;
/** Alias for ApiResponseFormat */
export type ApiResponseFormat = string;
/** Alias for AgentsApiResponseFormatOption */
export type AgentsApiResponseFormatOption =
  | string
  | AgentsApiResponseFormatMode
  | AgentsApiResponseFormat;
/** Alias for ListSortOrder */
export type ListSortOrder = string;
/** Alias for MessageRole */
export type MessageRole = string;
/** Alias for MessageAttachmentToolDefinition */
export type MessageAttachmentToolDefinition =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition;
/** Alias for MessageStatus */
export type MessageStatus = string;
/** Alias for MessageIncompleteDetailsReason */
export type MessageIncompleteDetailsReason = string;
/** Alias for TruncationStrategy */
export type TruncationStrategy = string;
/** Alias for AgentsApiToolChoiceOptionMode */
export type AgentsApiToolChoiceOptionMode = string;
/** Alias for AgentsNamedToolChoiceType */
export type AgentsNamedToolChoiceType = string;
/** Alias for AgentsApiToolChoiceOption */
export type AgentsApiToolChoiceOption =
  | string
  | AgentsApiToolChoiceOptionMode
  | AgentsNamedToolChoice;
/** Alias for FilePurpose */
export type FilePurpose = string;
/** Alias for VectorStoreExpirationPolicyAnchor */
export type VectorStoreExpirationPolicyAnchor = string;
/** Alias for VectorStoreChunkingStrategyRequestType */
export type VectorStoreChunkingStrategyRequestType = string;
/** Alias for VectorStoreFileStatusFilter */
export type VectorStoreFileStatusFilter = string;
/** The Type (or category) of the connection */
export type ConnectionType =
  | "AzureOpenAI"
  | "Serverless"
  | "AzureBlob"
  | "AIServices"
  | "CognitiveSearch";
/** Alias for Frequency */
export type Frequency = string;
/** Alias for WeekDays */
export type WeekDays = string;
