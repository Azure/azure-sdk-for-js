// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

/** Evaluation Definition */
export interface Evaluation {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataUnion;
  /** Display Name for evaluation. It helps to find evaluation easily in AI Studio. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Status of the evaluation. It is set by service and is read-only. */
  readonly status?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
}

export function evaluationSerializer(
  item: Evaluation,
): Record<string, unknown> {
  return {
    data: inputDataUnionSerializer(item.data),
    displayName: item["displayName"],
    description: item["description"],
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : (serializeRecord(item.properties as any) as any),
    evaluators: serializeRecord(
      item.evaluators as any,
      evaluatorConfigurationSerializer,
    ) as any,
  };
}

/** Abstract data class for input data configuration. */
export interface InputData {
  /** the discriminator possible values: app_insights, dataset */
  type: string;
}

export function inputDataUnionSerializer(item: InputDataUnion) {
  switch (item.type) {
    case "app_insights":
      return appInsightsConfigurationSerializer(
        item as AppInsightsConfiguration,
      );

    case "dataset":
      return datasetSerializer(item as Dataset);

    default:
      return inputDataSerializer(item);
  }
}

export function inputDataSerializer(
  item: InputDataUnion,
): Record<string, unknown> {
  return {
    ...inputDataUnionSerializer(item),
  };
}

/** Data Source for Application Insight. */
export interface AppInsightsConfiguration extends InputData {
  readonly type: "app_insights";
  /** LogAnalytic Workspace resourceID associated with AppInsights */
  resourceId: string;
  /** Query to fetch the data. */
  query: string;
  /** Service name. */
  serviceName: string;
}

export function appInsightsConfigurationSerializer(
  item: AppInsightsConfiguration,
): Record<string, unknown> {
  return {
    resourceId: item["resourceId"],
    query: item["query"],
    serviceName: item["serviceName"],
  };
}

/** Dataset as source for evaluation. */
export interface Dataset extends InputData {
  readonly type: "dataset";
  /** Evaluation input data */
  id: string;
}

export function datasetSerializer(item: Dataset): Record<string, unknown> {
  return {
    Uri: item["id"],
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The timestamp the resource was created at. */
  readonly createdAt?: Date;
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The identity type that created the resource. */
  readonly createdByType?: string;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: Date;
}

/** Evaluator Configuration */
export interface EvaluatorConfiguration {
  /** Identifier of the evaluator. */
  id: string;
  /** Initialization parameters of the evaluator. */
  initParams?: Record<string, any>;
  /** Data parameters of the evaluator. */
  dataMapping?: Record<string, string>;
}

export function evaluatorConfigurationSerializer(
  item: EvaluatorConfiguration,
): Record<string, unknown> {
  return {
    id: item["id"],
    initParams: !item.initParams
      ? item.initParams
      : (serializeRecord(item.initParams as any) as any),
    dataMapping: !item.dataMapping
      ? item.dataMapping
      : (serializeRecord(item.dataMapping as any) as any),
  };
}

/** Evaluation Schedule Definition */
export interface EvaluationSchedule {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataUnion;
  /** Display Name for evaluation. It helps to find evaluation easily in AI Studio. It does not need to be unique. */
  displayName?: string;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Status of the evaluation. It is set by service and is read-only. */
  readonly provisioningStatus?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
  /** Trigger for the evaluation. */
  trigger: TriggerUnion;
  /** Sampling strategy for the evaluation. */
  samplingStrategy: SamplingStrategy;
}

export function evaluationScheduleSerializer(
  item: EvaluationSchedule,
): Record<string, unknown> {
  return {
    data: inputDataUnionSerializer(item.data),
    displayName: item["displayName"],
    description: item["description"],
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    properties: !item.properties
      ? item.properties
      : (serializeRecord(item.properties as any) as any),
    evaluators: serializeRecord(
      item.evaluators as any,
      evaluatorConfigurationSerializer,
    ) as any,
    trigger: triggerUnionSerializer(item.trigger),
    samplingStrategy: samplingStrategySerializer(item.samplingStrategy),
  };
}

/** Abstract data class for input data configuration. */
export interface Trigger {
  /** the discriminator possible values: Recurrence, Cron */
  type: string;
}

export function triggerUnionSerializer(item: TriggerUnion) {
  switch (item.type) {
    case "Recurrence":
      return recurrenceTriggerSerializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerSerializer(item as CronTrigger);

    default:
      return triggerSerializer(item);
  }
}

export function triggerSerializer(item: TriggerUnion): Record<string, unknown> {
  return {
    ...triggerUnionSerializer(item),
  };
}

/** Recurrence Trigger Definition */
export interface RecurrenceTrigger extends Trigger {
  readonly type: "Recurrence";
  /** The frequency to trigger schedule. */
  frequency: Frequency;
  /** Specifies schedule interval in conjunction with frequency */
  interval: number;
  /** The recurrence schedule. */
  schedule: RecurrenceSchedule;
}

export function recurrenceTriggerSerializer(
  item: RecurrenceTrigger,
): Record<string, unknown> {
  return {
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: recurrenceScheduleSerializer(item.schedule),
  };
}

/** Frequency of the schedule - day, week, month, hour, minute */
export type Frequency = "Month" | "Week" | "Day" | "Hour" | "Minute";

/** RecurrenceSchedule Definition */
export interface RecurrenceSchedule {
  /** List of hours for the schedule. */
  hours: number[];
  /** List of minutes for the schedule. */
  minutes: number[];
  /** List of days for the schedule. */
  weekDays: WeekDays[];
  /** List of month days for the schedule */
  monthDays: number[];
}

export function recurrenceScheduleSerializer(
  item: RecurrenceSchedule,
): Record<string, unknown> {
  return {
    hours: item["hours"],
    minutes: item["minutes"],
    weekDays: item["weekDays"],
    monthDays: item["monthDays"],
  };
}

/** WeekDay of the schedule - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday */
export type WeekDays =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

/** Cron Trigger Definition */
export interface CronTrigger extends Trigger {
  readonly type: "Cron";
  /** Cron expression for the trigger. */
  expression: string;
}

export function cronTriggerSerializer(
  item: CronTrigger,
): Record<string, unknown> {
  return {
    expression: item["expression"],
  };
}

/** SamplingStrategy Definition */
export interface SamplingStrategy {
  /** Sampling rate */
  rate: number;
}

export function samplingStrategySerializer(
  item: SamplingStrategy,
): Record<string, unknown> {
  return {
    rate: item["rate"],
  };
}

/** Response from the list operation */
export interface ConnectionsListResponse {
  /** A list of connection list secrets */
  value: ConnectionsListSecretsResponse[];
}

/** Response from the listSecrets operation */
export interface ConnectionsListSecretsResponse {
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: ConnectionPropertiesUnion;
}

/** Connection properties */
export interface ConnectionProperties {
  /** the discriminator possible values: ApiKey, AAD, SAS */
  authType: AuthenticationType;
}

/** Connection properties for connections with API key authentication */
export interface ConnectionPropertiesApiKeyAuth extends ConnectionProperties {
  /** Authentication type of the connection target */
  authType: "ApiKey";
  /** Category of the connection */
  category: ConnectionType;
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsApiKeyAuth;
  /** The connection URL to be used for this service */
  target: string;
}

/** The Type (or category) of the connection */
export type ConnectionType = "AzureOpenAI" | "Serverless";

/** The credentials needed for API key authentication */
export interface CredentialsApiKeyAuth {
  /** The API key */
  key: string;
}

/** Connection properties for connections with AAD authentication (aka `Entra ID passthrough`) */
export interface ConnectionPropertiesAADAuth extends ConnectionProperties {
  /** Authentication type of the connection target */
  authType: "AAD";
  /** Category of the connection */
  category: ConnectionType;
  /** The connection URL to be used for this service */
  target: string;
}

/** Connection properties for connections with SAS authentication */
export interface ConnectionPropertiesSASAuth extends ConnectionProperties {
  /** Authentication type of the connection target */
  authType: "SAS";
  /** Category of the connection */
  category: ConnectionType;
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsSASAuth;
  /** The connection URL to be used for this service */
  target: string;
}

/** The credentials needed for Shared Access Signatures (SAS) authentication */
export interface CredentialsSASAuth {
  /** The Shared Access Signatures (SAS) token */
  sAS: string;
}

/** Authentication type used by Azure AI service to connect to another service */
export type AuthenticationType = "ApiKey" | "AAD" | "SAS";

/** An abstract representation of an input tool definition that an agent can use. */
export interface ToolDefinition {
  /** the discriminator possible values: code_interpreter, file_search, function, bing_search, microsoft_fabric, sharepoint, azure_ai_search */
  type: string;
}

export function toolDefinitionUnionSerializer(item: ToolDefinitionUnion) {
  switch (item.type) {
    case "code_interpreter":
      return codeInterpreterToolDefinitionSerializer(
        item as CodeInterpreterToolDefinition,
      );

    case "file_search":
      return fileSearchToolDefinitionSerializer(
        item as FileSearchToolDefinition,
      );

    case "function":
      return functionToolDefinitionSerializer(item as FunctionToolDefinition);

    case "bing_search":
      return bingSearchToolDefinitionSerializer(
        item as BingSearchToolDefinition,
      );

    case "microsoft_fabric":
      return microsoftFabricToolDefinitionSerializer(
        item as MicrosoftFabricToolDefinition,
      );

    case "sharepoint":
      return sharepointToolDefinitionSerializer(
        item as SharepointToolDefinition,
      );

    case "azure_ai_search":
      return azureAISearchToolDefinitionSerializer(
        item as AzureAISearchToolDefinition,
      );

    default:
      return toolDefinitionSerializer(item);
  }
}

export function toolDefinitionSerializer(
  item: ToolDefinitionUnion,
): Record<string, unknown> {
  return {
    ...toolDefinitionUnionSerializer(item),
  };
}

/** The input definition information for a code interpreter tool as used to configure an agent. */
export interface CodeInterpreterToolDefinition extends ToolDefinition {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
}

export function codeInterpreterToolDefinitionSerializer(
  item: CodeInterpreterToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** The input definition information for a file search tool as used to configure an agent. */
export interface FileSearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** Options overrides for the file search tool. */
  fileSearch?: FileSearchToolDefinitionDetails;
}

export function fileSearchToolDefinitionSerializer(
  item: FileSearchToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
    file_search: !item.fileSearch
      ? item.fileSearch
      : fileSearchToolDefinitionDetailsSerializer(item.fileSearch),
  };
}

/** Options overrides for the file search tool. */
export interface FileSearchToolDefinitionDetails {
  /**
   * The maximum number of results the file search tool should output. The default is 20 for gpt-4* models and 5 for gpt-3.5-turbo. This number should be between 1 and 50 inclusive.
   *
   * Note that the file search tool may output fewer than `max_num_results` results. See the file search tool documentation for more information.
   */
  maxNumResults?: number;
}

export function fileSearchToolDefinitionDetailsSerializer(
  item: FileSearchToolDefinitionDetails,
): Record<string, unknown> {
  return {
    max_num_results: item["maxNumResults"],
  };
}

/** The input definition information for a function tool as used to configure an agent. */
export interface FunctionToolDefinition extends ToolDefinition {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The definition of the concrete function that the function tool should call. */
  function: FunctionDefinition;
}

export function functionToolDefinitionSerializer(
  item: FunctionToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
    function: functionDefinitionSerializer(item.function),
  };
}

/** The input definition information for a function. */
export interface FunctionDefinition {
  /** The name of the function to be called. */
  name: string;
  /** A description of what the function does, used by the model to choose when and how to call the function. */
  description?: string;
  /** The parameters the functions accepts, described as a JSON Schema object. */
  parameters: any;
}

export function functionDefinitionSerializer(
  item: FunctionDefinition,
): Record<string, unknown> {
  return {
    name: item["name"],
    description: item["description"],
    parameters: item["parameters"],
  };
}

/** The input definition information for a bing search tool as used to configure an agent. */
export interface BingSearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'bing_search'. */
  type: "bing_search";
}

export function bingSearchToolDefinitionSerializer(
  item: BingSearchToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** The input definition information for a Microsoft Fabric tool as used to configure an agent. */
export interface MicrosoftFabricToolDefinition extends ToolDefinition {
  /** The object type, which is always 'microsoft_fabric'. */
  type: "microsoft_fabric";
}

export function microsoftFabricToolDefinitionSerializer(
  item: MicrosoftFabricToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** The input definition information for a sharepoint tool as used to configure an agent. */
export interface SharepointToolDefinition extends ToolDefinition {
  /** The object type, which is always 'sharepoint'. */
  type: "sharepoint";
}

export function sharepointToolDefinitionSerializer(
  item: SharepointToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** The input definition information for an Azure AI search tool as used to configure an agent. */
export interface AzureAISearchToolDefinition extends ToolDefinition {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
}

export function azureAISearchToolDefinitionSerializer(
  item: AzureAISearchToolDefinition,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/**
 * A set of resources that are used by the agent's tools. The resources are specific to the type of
 * tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search`
 * tool requires a list of vector store IDs.
 */
export interface ToolResources {
  /** Resources to be used by the `code_interpreter tool` consisting of file IDs. */
  codeInterpreter?: CodeInterpreterToolResource;
  /** Resources to be used by the `file_search` tool consisting of vector store IDs. */
  fileSearch?: FileSearchToolResource;
  /** Resources to be used by the `bing_search` tool consisting of connection IDs. */
  bingSearch?: ConnectionListResource;
  /** Resources to be used by the `microsoft_fabric` tool consisting of connection IDs. */
  microsoftFabric?: ConnectionListResource;
  /** Resources to be used by the `sharepoint` tool consisting of connection IDs. */
  sharePoint?: ConnectionListResource;
  /** Resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azureAISearch?: AzureAISearchResource;
}

export function toolResourcesSerializer(
  item: ToolResources,
): Record<string, unknown> {
  return {
    code_interpreter: !item.codeInterpreter
      ? item.codeInterpreter
      : codeInterpreterToolResourceSerializer(item.codeInterpreter),
    file_search: !item.fileSearch
      ? item.fileSearch
      : fileSearchToolResourceSerializer(item.fileSearch),
    bing_search: !item.bingSearch
      ? item.bingSearch
      : connectionListResourceSerializer(item.bingSearch),
    microsoft_fabric: !item.microsoftFabric
      ? item.microsoftFabric
      : connectionListResourceSerializer(item.microsoftFabric),
    sharepoint: !item.sharePoint
      ? item.sharePoint
      : connectionListResourceSerializer(item.sharePoint),
    azure_ai_search: !item.azureAISearch
      ? item.azureAISearch
      : azureAISearchResourceSerializer(item.azureAISearch),
  };
}

/** A set of resources that are used by the `code_interpreter` tool. */
export interface CodeInterpreterToolResource {
  /**
   * A list of file IDs made available to the `code_interpreter` tool. There can be a maximum of 20 files
   * associated with the tool.
   */
  fileIds?: string[];
}

export function codeInterpreterToolResourceSerializer(
  item: CodeInterpreterToolResource,
): Record<string, unknown> {
  return {
    file_ids: item["fileIds"],
  };
}

/** A set of resources that are used by the `file_search` tool. */
export interface FileSearchToolResource {
  /**
   * The ID of the vector store attached to this agent. There can be a maximum of 1 vector
   * store attached to the agent.
   */
  vectorStoreIds?: string[];
}

export function fileSearchToolResourceSerializer(
  item: FileSearchToolResource,
): Record<string, unknown> {
  return {
    vector_store_ids: item["vectorStoreIds"],
  };
}

/** A set of connection resources currently used by either the `bing_search`, `microsoft_fabric`, or `sharepoint` tools. */
export interface ConnectionListResource {
  /**
   * The connections attached to this agent. There can be a maximum of 1 connection
   * resource attached to the agent.
   */
  connectionList?: ConnectionResource[];
}

export function connectionListResourceSerializer(
  item: ConnectionListResource,
): Record<string, unknown> {
  return {
    connections:
      item["connectionList"] === undefined
        ? item["connectionList"]
        : item["connectionList"].map(connectionResourceSerializer),
  };
}

/** A connection resource. */
export interface ConnectionResource {
  /** A connection in a ConnectionListResource attached to this agent. */
  connectionId: string;
}

export function connectionResourceSerializer(
  item: ConnectionResource,
): Record<string, unknown> {
  return {
    connection_id: item["connectionId"],
  };
}

/** A set of index resources used by the `azure_ai_search` tool. */
export interface AzureAISearchResource {
  /**
   * The indices attached to this agent. There can be a maximum of 1 index
   * resource attached to the agent.
   */
  indexList?: IndexResource[];
}

export function azureAISearchResourceSerializer(
  item: AzureAISearchResource,
): Record<string, unknown> {
  return {
    indexes:
      item["indexList"] === undefined
        ? item["indexList"]
        : item["indexList"].map(indexResourceSerializer),
  };
}

/** A Index resource. */
export interface IndexResource {
  /** An index connection id in an IndexResource attached to this agent. */
  indexConnectionId: string;
  /** The name of an index in an IndexResource attached to this agent. */
  indexName: string;
}

export function indexResourceSerializer(
  item: IndexResource,
): Record<string, unknown> {
  return {
    index_connection_id: item["indexConnectionId"],
    index_name: item["indexName"],
  };
}

/** Represents the mode in which the model will handle the return format of a tool call. */
export type AgentsApiResponseFormatMode = "auto" | "none";

/**
 * An object describing the expected output of the model. If `json_object` only `function` type `tools` are allowed to be passed to the Run.
 * If `text` the model can return text or any value needed.
 */
export interface AgentsApiResponseFormat {
  /** Must be one of `text` or `json_object`. */
  type?: ApiResponseFormat;
}

export function agentsApiResponseFormatSerializer(
  item: AgentsApiResponseFormat,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** Possible API response formats. */
export type ApiResponseFormat = "text" | "json_object";

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
  tools?: ToolDefinitionUnion[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources?: ToolResources | null;
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
  topP?: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?:
    | string
    | AgentsApiResponseFormatMode
    | AgentsApiResponseFormat;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Represents an agent that can call the model and use tools. */
export interface Agent {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always assistant. */
  object: "assistant";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The name of the agent. */
  name: string | null;
  /** The description of the agent. */
  description: string | null;
  /** The ID of the model to use. */
  model: string;
  /** The system instructions for the agent to use. */
  instructions: string | null;
  /** The collection of tools enabled for the agent. */
  tools: ToolDefinitionUnion[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example, the `code_interpreter`
   * tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources: ToolResources | null;
  /**
   * What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random,
   * while lower values like 0.2 will make it more focused and deterministic.
   */
  temperature: number | null;
  /**
   * An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.
   * So 0.1 means only the tokens comprising the top 10% probability mass are considered.
   *
   * We generally recommend altering this or temperature but not both.
   */
  topP: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?:
    | string
    | AgentsApiResponseFormatMode
    | AgentsApiResponseFormat;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** The available sorting options when requesting a list of response objects. */
export type ListSortOrder = "asc" | "desc";

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfAgent {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: Agent[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

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
  tools?: ToolDefinitionUnion[];
  /**
   * A set of resources that are used by the agent's tools. The resources are specific to the type of tool. For example,
   * the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list of vector store IDs.
   */
  toolResources?: ToolResources;
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
  topP?: number | null;
  /** The response format of the tool calls used by this agent. */
  responseFormat?:
    | string
    | AgentsApiResponseFormatMode
    | AgentsApiResponseFormat;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** The status of an agent deletion operation. */
export interface AgentDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'assistant.deleted'. */
  object: "assistant.deleted";
}

/** A single message within an agent thread, as provided during that thread's creation for its initial state. */
export interface ThreadMessageOptions {
  /**
   * The role of the entity that is creating the message. Allowed values include:
   * - `user`: Indicates the message is sent by an actual user and should be used in most cases to represent user-generated messages.
   * - `assistant`: Indicates the message is generated by the agent. Use this value to insert messages from the agent into
   * the conversation.
   */
  role: MessageRole;
  /**
   * The textual content of the initial message. Currently, robust input including images and annotated text may only be provided via
   * a separate call to the create message API.
   */
  content: string;
  /** A list of files attached to the message, and the tools they should be added to. */
  attachments?: MessageAttachment[] | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

export function threadMessageOptionsSerializer(
  item: ThreadMessageOptions,
): Record<string, unknown> {
  return {
    role: item["role"],
    content: item["content"],
    attachments:
      item["attachments"] === undefined || item["attachments"] === null
        ? item["attachments"]
        : item["attachments"].map(messageAttachmentSerializer),
    metadata: !item.metadata
      ? item.metadata
      : (serializeRecord(item.metadata as any) as any),
  };
}

/** The possible values for roles attributed to messages in a thread. */
export type MessageRole = "user" | "assistant";

/** This describes to which tools a file has been attached. */
export interface MessageAttachment {
  /** The ID of the file to attach to the message. */
  fileId: string;
  /** The tools to add to this file. */
  tools: MessageAttachmentToolDefinition[];
}

export function messageAttachmentSerializer(
  item: MessageAttachment,
): Record<string, unknown> {
  return {
    file_id: item["fileId"],
    tools: item["tools"],
  };
}

export interface AgentThreadCreationOptions {
  /** The initial messages to associate with the new thread. */
  messages?: ThreadMessageOptions[];
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the
   * type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires
   * a list of vector store IDs.
   */
  toolResources?: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Information about a single thread associated with an agent. */
export interface AgentThread {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread'. */
  object: "thread";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the type
   * of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires a list
   * of vector store IDs.
   */
  toolResources: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export interface UpdateAgentThreadOptions {
  /**
   * A set of resources that are made available to the agent's tools in this thread. The resources are specific to the
   * type of tool. For example, the `code_interpreter` tool requires a list of file IDs, while the `file_search` tool requires
   * a list of vector store IDs
   */
  toolResources?: ToolResources | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** The status of a thread deletion operation. */
export interface ThreadDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'thread.deleted'. */
  object: "thread.deleted";
}

/** A single, existing message within an agent thread. */
export interface ThreadMessage {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.message'. */
  object: "thread.message";
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The ID of the thread that this message belongs to. */
  threadId: string;
  /** The status of the message. */
  status: MessageStatus;
  /** On an incomplete message, details about why the message is incomplete. */
  incompleteDetails: MessageIncompleteDetails | null;
  /** The Unix timestamp (in seconds) for when the message was completed. */
  completedAt: Date | null;
  /** The Unix timestamp (in seconds) for when the message was marked as incomplete. */
  incompleteAt: Date | null;
  /** The role associated with the agent thread message. */
  role: MessageRole;
  /** The list of content items associated with the agent thread message. */
  content: MessageContentUnion[];
  /** If applicable, the ID of the agent that authored this message. */
  assistantId: string | null;
  /** If applicable, the ID of the run associated with the authoring of this message. */
  runId: string | null;
  /** A list of files attached to the message, and the tools they were added to. */
  attachments: MessageAttachment[] | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

export function threadMessageSerializer(
  item: ThreadMessage,
): Record<string, unknown> {
  return {
    id: item["id"],
    object: item["object"],
    created_at: item["createdAt"].getTime(),
    thread_id: item["threadId"],
    status: item["status"],
    incomplete_details: !item.incompleteDetails
      ? item.incompleteDetails
      : messageIncompleteDetailsSerializer(item.incompleteDetails),
    completed_at: item["completedAt"].getTime(),
    incomplete_at: item["incompleteAt"].getTime(),
    role: item["role"],
    content: item["content"].map((p) => messageContentUnionSerializer(p)),
    assistant_id: item["assistantId"],
    run_id: item["runId"],
    attachments:
      item["attachments"] === null
        ? item["attachments"]
        : item["attachments"].map(messageAttachmentSerializer),
    metadata: !item.metadata
      ? item.metadata
      : (serializeRecord(item.metadata as any) as any),
  };
}

/** The possible execution status values for a thread message. */
export type MessageStatus = "in_progress" | "incomplete" | "completed";

/** Information providing additional detail about a message entering an incomplete status. */
export interface MessageIncompleteDetails {
  /** The provided reason describing why the message was marked as incomplete. */
  reason: MessageIncompleteDetailsReason;
}

export function messageIncompleteDetailsSerializer(
  item: MessageIncompleteDetails,
): Record<string, unknown> {
  return {
    reason: item["reason"],
  };
}

/** A set of reasons describing why a message is marked as incomplete. */
export type MessageIncompleteDetailsReason =
  | "content_filter"
  | "max_tokens"
  | "run_cancelled"
  | "run_failed"
  | "run_expired";

/** An abstract representation of a single item of thread message content. */
export interface MessageContent {
  /** the discriminator possible values: text, image_file */
  type: string;
}

export function messageContentUnionSerializer(item: MessageContentUnion) {
  switch (item.type) {
    case "text":
      return messageTextContentSerializer(item as MessageTextContent);

    case "image_file":
      return messageImageFileContentSerializer(item as MessageImageFileContent);

    default:
      return messageContentSerializer(item);
  }
}

export function messageContentSerializer(
  item: MessageContentUnion,
): Record<string, unknown> {
  return {
    ...messageContentUnionSerializer(item),
  };
}

/** A representation of a textual item of thread message content. */
export interface MessageTextContent extends MessageContent {
  /** The object type, which is always 'text'. */
  type: "text";
  /** The text and associated annotations for this thread message content item. */
  text: MessageTextDetails;
}

export function messageTextContentSerializer(
  item: MessageTextContent,
): Record<string, unknown> {
  return {
    type: item["type"],
    text: messageTextDetailsSerializer(item.text),
  };
}

/** The text and associated annotations for a single item of agent thread message content. */
export interface MessageTextDetails {
  /** The text data. */
  value: string;
  /** A list of annotations associated with this text. */
  annotations: MessageTextAnnotationUnion[];
}

export function messageTextDetailsSerializer(
  item: MessageTextDetails,
): Record<string, unknown> {
  return {
    value: item["value"],
    annotations: item["annotations"].map((p) =>
      messageTextAnnotationUnionSerializer(p),
    ),
  };
}

/** An abstract representation of an annotation to text thread message content. */
export interface MessageTextAnnotation {
  /** the discriminator possible values: file_citation, file_path */
  type: string;
  /** The textual content associated with this text annotation item. */
  text: string;
}

export function messageTextAnnotationUnionSerializer(
  item: MessageTextAnnotationUnion,
) {
  switch (item.type) {
    case "file_citation":
      return messageTextFileCitationAnnotationSerializer(
        item as MessageTextFileCitationAnnotation,
      );

    case "file_path":
      return messageTextFilePathAnnotationSerializer(
        item as MessageTextFilePathAnnotation,
      );

    default:
      return messageTextAnnotationSerializer(item);
  }
}

export function messageTextAnnotationSerializer(
  item: MessageTextAnnotationUnion,
): Record<string, unknown> {
  return {
    ...messageTextAnnotationUnionSerializer(item),
  };
}

/** A citation within the message that points to a specific quote from a specific File associated with the agent or the message. Generated when the agent uses the 'file_search' tool to search files. */
export interface MessageTextFileCitationAnnotation
  extends MessageTextAnnotation {
  /** The object type, which is always 'file_citation'. */
  type: "file_citation";
  /**
   * A citation within the message that points to a specific quote from a specific file.
   * Generated when the agent uses the "file_search" tool to search files.
   */
  fileCitation: MessageTextFileCitationDetails;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

export function messageTextFileCitationAnnotationSerializer(
  item: MessageTextFileCitationAnnotation,
): Record<string, unknown> {
  return {
    type: item["type"],
    text: item["text"],
    file_citation: messageTextFileCitationDetailsSerializer(item.fileCitation),
    start_index: item["startIndex"],
    end_index: item["endIndex"],
  };
}

/** A representation of a file-based text citation, as used in a file-based annotation of text thread message content. */
export interface MessageTextFileCitationDetails {
  /** The ID of the file associated with this citation. */
  fileId: string;
  /** The specific quote cited in the associated file. */
  quote: string;
}

export function messageTextFileCitationDetailsSerializer(
  item: MessageTextFileCitationDetails,
): Record<string, unknown> {
  return {
    file_id: item["fileId"],
    quote: item["quote"],
  };
}

/** A citation within the message that points to a file located at a specific path. */
export interface MessageTextFilePathAnnotation extends MessageTextAnnotation {
  /** The object type, which is always 'file_path'. */
  type: "file_path";
  /** A URL for the file that's generated when the agent used the code_interpreter tool to generate a file. */
  filePath: MessageTextFilePathDetails;
  /** The first text index associated with this text annotation. */
  startIndex?: number;
  /** The last text index associated with this text annotation. */
  endIndex?: number;
}

export function messageTextFilePathAnnotationSerializer(
  item: MessageTextFilePathAnnotation,
): Record<string, unknown> {
  return {
    type: item["type"],
    text: item["text"],
    file_path: messageTextFilePathDetailsSerializer(item.filePath),
    start_index: item["startIndex"],
    end_index: item["endIndex"],
  };
}

/** An encapsulation of an image file ID, as used by message image content. */
export interface MessageTextFilePathDetails {
  /** The ID of the specific file that the citation is from. */
  fileId: string;
}

export function messageTextFilePathDetailsSerializer(
  item: MessageTextFilePathDetails,
): Record<string, unknown> {
  return {
    file_id: item["fileId"],
  };
}

/** A representation of image file content in a thread message. */
export interface MessageImageFileContent extends MessageContent {
  /** The object type, which is always 'image_file'. */
  type: "image_file";
  /** The image file for this thread message content item. */
  imageFile: MessageImageFileDetails;
}

export function messageImageFileContentSerializer(
  item: MessageImageFileContent,
): Record<string, unknown> {
  return {
    type: item["type"],
    image_file: messageImageFileDetailsSerializer(item.imageFile),
  };
}

/** An image reference, as represented in thread message content. */
export interface MessageImageFileDetails {
  /** The ID for the file associated with this image. */
  fileId: string;
}

export function messageImageFileDetailsSerializer(
  item: MessageImageFileDetails,
): Record<string, unknown> {
  return {
    file_id: item["fileId"],
  };
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfThreadMessage {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: ThreadMessage[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
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
   */
  type: TruncationStrategy;
  /** The number of most recent messages from the thread when constructing the context for the run. */
  lastMessages?: number | null;
}

export function truncationObjectSerializer(
  item: TruncationObject,
): Record<string, unknown> {
  return {
    type: item["type"],
    last_messages: item["lastMessages"],
  };
}

/** Possible truncation strategies for the thread. */
export type TruncationStrategy = "auto" | "last_messages";
/** Specifies how the tool choice will be used */
export type AgentsApiToolChoiceOptionMode = "none" | "auto";

/** Specifies a tool the model should use. Use to force the model to call a specific tool. */
export interface AgentsNamedToolChoice {
  /** the type of tool. If type is `function`, the function name must be set. */
  type: AgentsNamedToolChoiceType;
  /** The name of the function to call */
  function?: FunctionName;
}

export function agentsNamedToolChoiceSerializer(
  item: AgentsNamedToolChoice,
): Record<string, unknown> {
  return {
    type: item["type"],
    function: !item.function
      ? item.function
      : functionNameSerializer(item.function),
  };
}

/** Available tool types for agents named tools. */
export type AgentsNamedToolChoiceType =
  | "function"
  | "code_interpreter"
  | "file_search"
  | "bing_grounding"
  | "microsoft_fabric"
  | "sharepoint"
  | "azure_ai_search";

/** The function name that will be used, if using the `function` tool */
export interface FunctionName {
  /** The name of the function to call */
  name: string;
}

export function functionNameSerializer(
  item: FunctionName,
): Record<string, unknown> {
  return {
    name: item["name"],
  };
}

export interface CreateRunOptions {
  /** The ID of the agent that should run the thread. */
  assistantId: string;
  /** The overridden model name that the agent should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions that the agent should use to run the thread. */
  instructions?: string | null;
  /**
   * Additional instructions to append at the end of the instructions for the run. This is useful for modifying the behavior
   * on a per-run basis without overriding other instructions.
   */
  additionalInstructions?: string | null;
  /** Adds additional messages to the thread before creating the run. */
  additionalMessages?: ThreadMessage[] | null;
  /** The overridden list of enabled tools that the agent should use to run the thread. */
  tools?: ToolDefinitionUnion[] | null;
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
  topP?: number | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified,
   * the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  maxPromptTokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort
   * to use only the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of
   * completion tokens specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  maxCompletionTokens?: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncationStrategy?: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  toolChoice?: string | AgentsApiToolChoiceOptionMode | AgentsNamedToolChoice;
  /** Specifies the format that the model must output. */
  responseFormat?:
    | string
    | AgentsApiResponseFormatMode
    | AgentsApiResponseFormat;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Data representing a single evaluation run of an agent thread. */
export interface ThreadRun {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run'. */
  object: "thread.run";
  /** The ID of the thread associated with this run. */
  threadId: string;
  /** The ID of the agent associated with the thread this run was performed against. */
  assistantId: string;
  /** The status of the agent thread run. */
  status: RunStatus;
  /** The details of the action required for the agent thread run to continue. */
  requiredAction?: RequiredActionUnion | null;
  /** The last error, if any, encountered by this agent thread run. */
  lastError: RunError | null;
  /** The ID of the model to use. */
  model: string;
  /** The overridden system instructions used for this agent thread run. */
  instructions: string;
  /** The overridden enabled tools used for this agent thread run. */
  tools: ToolDefinitionUnion[];
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expires. */
  expiresAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this item was started. */
  startedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** Details on why the run is incomplete. Will be `null` if the run is not incomplete. */
  incompleteDetails: IncompleteRunDetails | null;
  /** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
  usage: RunCompletionUsage | null;
  /** The sampling temperature used for this run. If not set, defaults to 1. */
  temperature?: number | null;
  /** The nucleus sampling value used for this run. If not set, defaults to 1. */
  topP?: number | null;
  /** The maximum number of prompt tokens specified to have been used over the course of the run. */
  maxPromptTokens: number | null;
  /** The maximum number of completion tokens specified to have been used over the course of the run. */
  maxCompletionTokens: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncationStrategy: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  toolChoice: string | AgentsApiToolChoiceOptionMode | AgentsNamedToolChoice;
  /** The response format of the tool calls used in this run. */
  responseFormat:
    | string
    | AgentsApiResponseFormatMode
    | AgentsApiResponseFormat;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
  /** Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis */
  toolResources?: UpdateToolResourcesOptions | null;
  /** Determines if tools can be executed in parallel within the run. */
  parallelToolCalls?: boolean;
}

/** Possible values for the status of an agent thread run. */
export type RunStatus =
  | "queued"
  | "in_progress"
  | "requires_action"
  | "cancelling"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired";

/** An abstract representation of a required action for an agent thread run to continue. */
export interface RequiredAction {
  /** the discriminator possible values: submit_tool_outputs */
  type: string;
}

/** The details for required tool calls that must be submitted for an agent thread run to continue. */
export interface SubmitToolOutputsAction extends RequiredAction {
  /** The object type, which is always 'submit_tool_outputs'. */
  type: "submit_tool_outputs";
  /** The details describing tools that should be called to submit tool outputs. */
  submitToolOutputs: SubmitToolOutputsDetails;
}

/** The details describing tools that should be called to submit tool outputs. */
export interface SubmitToolOutputsDetails {
  /** The list of tool calls that must be resolved for the agent thread run to continue. */
  toolCalls: RequiredToolCallUnion[];
}

/** An abstract representation a a tool invocation needed by the model to continue a run. */
export interface RequiredToolCall {
  /** the discriminator possible values: function */
  type: string;
  /** The ID of the tool call. This ID must be referenced when submitting tool outputs. */
  id: string;
}

/** A representation of a requested call to a function tool, needed by the model to continue evaluation of a run. */
export interface RequiredFunctionToolCall extends RequiredToolCall {
  /** The object type of the required tool call. Always 'function' for function tools. */
  type: "function";
  /** Detailed information about the function to be executed by the tool that includes name and arguments. */
  function: RequiredFunctionToolCallDetails;
}

/** The detailed information for a function invocation, as provided by a required action invoking a function tool, that includes the name of and arguments to the function. */
export interface RequiredFunctionToolCallDetails {
  /** The name of the function. */
  name: string;
  /** The arguments to use when invoking the named function, as provided by the model. Arguments are presented as a JSON document that should be validated and parsed for evaluation. */
  arguments: string;
}

/** The details of an error as encountered by an agent thread run. */
export interface RunError {
  /** The status for the error. */
  code: string;
  /** The human-readable text associated with the error. */
  message: string;
}

/** The reason why the run is incomplete. This will point to which specific token limit was reached over the course of the run. */
export type IncompleteRunDetails =
  | "max_completion_tokens"
  | "max_prompt_tokens";

/** Usage statistics related to the run. This value will be `null` if the run is not in a terminal state (i.e. `in_progress`, `queued`, etc.). */
export interface RunCompletionUsage {
  /** Number of completion tokens used over the course of the run. */
  completionTokens: number;
  /** Number of prompt tokens used over the course of the run. */
  promptTokens: number;
  /** Total number of tokens used (prompt + completion). */
  totalTokens: number;
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
  codeInterpreter?: UpdateCodeInterpreterToolResourceOptions;
  /** Overrides the vector store attached to this agent. There can be a maximum of 1 vector store attached to the agent. */
  fileSearch?: UpdateFileSearchToolResourceOptions;
  /** Overrides the list of connections to be used by the `bing_search` tool consisting of connection IDs. */
  bingSearch?: ConnectionListResource;
  /** Overrides the list of connections to be used by the `microsoft_fabric` tool consisting of connection IDs. */
  microsoftFabric?: ConnectionListResource;
  /** Overrides the list of connections to be used by the `sharepoint` tool consisting of connection IDs. */
  sharePoint?: ConnectionListResource;
  /** Overrides the resources to be used by the `azure_ai_search` tool consisting of index IDs and names. */
  azureAISearch?: AzureAISearchResource;
}

export function updateToolResourcesOptionsSerializer(
  item: UpdateToolResourcesOptions,
): Record<string, unknown> {
  return {
    code_interpreter: !item.codeInterpreter
      ? item.codeInterpreter
      : updateCodeInterpreterToolResourceOptionsSerializer(
          item.codeInterpreter,
        ),
    file_search: !item.fileSearch
      ? item.fileSearch
      : updateFileSearchToolResourceOptionsSerializer(item.fileSearch),
    bing_search: !item.bingSearch
      ? item.bingSearch
      : connectionListResourceSerializer(item.bingSearch),
    microsoft_fabric: !item.microsoftFabric
      ? item.microsoftFabric
      : connectionListResourceSerializer(item.microsoftFabric),
    sharepoint: !item.sharePoint
      ? item.sharePoint
      : connectionListResourceSerializer(item.sharePoint),
    azure_ai_search: !item.azureAISearch
      ? item.azureAISearch
      : azureAISearchResourceSerializer(item.azureAISearch),
  };
}

/** Request object to update `code_interpreted` tool resources. */
export interface UpdateCodeInterpreterToolResourceOptions {
  /** A list of file IDs to override the current list of the agent. */
  fileIds?: string[];
}

export function updateCodeInterpreterToolResourceOptionsSerializer(
  item: UpdateCodeInterpreterToolResourceOptions,
): Record<string, unknown> {
  return {
    file_ids: item["fileIds"],
  };
}

/** Request object to update `file_search` tool resources. */
export interface UpdateFileSearchToolResourceOptions {
  /** A list of vector store IDs to override the current list of the agent. */
  vectorStoreIds?: string[];
}

export function updateFileSearchToolResourceOptionsSerializer(
  item: UpdateFileSearchToolResourceOptions,
): Record<string, unknown> {
  return {
    vector_store_ids: item["vectorStoreIds"],
  };
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfThreadRun {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: ThreadRun[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** The data provided during a tool outputs submission to resolve pending tool calls and allow the model to continue. */
export interface ToolOutput {
  /** The ID of the tool call being resolved, as provided in the tool calls of a required action from a run. */
  toolCallId?: string;
  /** The output from the tool to be submitted. */
  output?: string;
}

export function toolOutputSerializer(
  item: ToolOutput,
): Record<string, unknown> {
  return {
    tool_call_id: item["toolCallId"],
    output: item["output"],
  };
}

export interface CreateAndRunThreadOptions {
  /** The ID of the agent for which the thread should be created. */
  assistantId: string;
  /** The details used to create the new thread. If no thread is provided, an empty one will be created. */
  thread?: AgentThreadCreationOptions;
  /** The overridden model that the agent should use to run the thread. */
  model?: string | null;
  /** The overridden system instructions the agent should use to run the thread. */
  instructions?: string | null;
  /** The overridden list of enabled tools the agent should use to run the thread. */
  tools?: ToolDefinitionUnion[] | null;
  /** Override the tools the agent can use for this run. This is useful for modifying the behavior on a per-run basis */
  toolResources?: UpdateToolResourcesOptions | null;
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
  topP?: number | null;
  /**
   * The maximum number of prompt tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of prompt tokens specified, across multiple turns of the run. If the run exceeds the number of prompt tokens specified,
   * the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  maxPromptTokens?: number | null;
  /**
   * The maximum number of completion tokens that may be used over the course of the run. The run will make a best effort to use only
   * the number of completion tokens specified, across multiple turns of the run. If the run exceeds the number of completion tokens
   * specified, the run will end with status `incomplete`. See `incomplete_details` for more info.
   */
  maxCompletionTokens?: number | null;
  /** The strategy to use for dropping messages as the context windows moves forward. */
  truncationStrategy?: TruncationObject | null;
  /** Controls whether or not and which tool is called by the model. */
  toolChoice?: string | AgentsApiToolChoiceOptionMode | AgentsNamedToolChoice;
  /** Specifies the format that the model must output. */
  responseFormat?:
    | string
    | AgentsApiResponseFormatMode
    | AgentsApiResponseFormat;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Detailed information about a single step of an agent thread run. */
export interface RunStep {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always 'thread.run.step'. */
  object: "thread.run.step";
  /** The type of run step, which can be either message_creation or tool_calls. */
  type: RunStepType;
  /** The ID of the agent associated with the run step. */
  assistantId: string;
  /** The ID of the thread that was run. */
  threadId: string;
  /** The ID of the run that this run step is a part of. */
  runId: string;
  /** The status of this run step. */
  status: RunStepStatus;
  /** The details for this run step. */
  stepDetails: RunStepDetailsUnion;
  /** If applicable, information about the last error encountered by this run step. */
  lastError: RunStepError | null;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The Unix timestamp, in seconds, representing when this item expired. */
  expiredAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this completed. */
  completedAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this was cancelled. */
  cancelledAt: Date | null;
  /** The Unix timestamp, in seconds, representing when this failed. */
  failedAt: Date | null;
  /** Usage statistics related to the run step. This value will be `null` while the run step's status is `in_progress`. */
  usage?: RunStepCompletionUsage | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** The possible types of run steps. */
export type RunStepType = "message_creation" | "tool_calls";
/** Possible values for the status of a run step. */
export type RunStepStatus =
  | "in_progress"
  | "cancelled"
  | "failed"
  | "completed"
  | "expired";

/** An abstract representation of the details for a run step. */
export interface RunStepDetails {
  /** the discriminator possible values: message_creation, tool_calls */
  type: RunStepType;
}

/** The detailed information associated with a message creation run step. */
export interface RunStepMessageCreationDetails extends RunStepDetails {
  /** The object type, which is always 'message_creation'. */
  type: "message_creation";
  /** Information about the message creation associated with this run step. */
  messageCreation: RunStepMessageCreationReference;
}

/** The details of a message created as a part of a run step. */
export interface RunStepMessageCreationReference {
  /** The ID of the message created by this run step. */
  messageId: string;
}

/** The detailed information associated with a run step calling tools. */
export interface RunStepToolCallDetails extends RunStepDetails {
  /** The object type, which is always 'tool_calls'. */
  type: "tool_calls";
  /** A list of tool call details for this run step. */
  toolCalls: RunStepToolCallUnion[];
}

/** An abstract representation of a detailed tool call as recorded within a run step for an existing run. */
export interface RunStepToolCall {
  /** the discriminator possible values: code_interpreter, file_search, bing_search, azure_ai_search, sharepoint, microsoft_fabric, function */
  type: string;
  /** The ID of the tool call. This ID must be referenced when you submit tool outputs. */
  id: string;
}

/**
 * A record of a call to a code interpreter tool, issued by the model in evaluation of a defined tool, that
 * represents inputs and outputs consumed and emitted by the code interpreter.
 */
export interface RunStepCodeInterpreterToolCall extends RunStepToolCall {
  /** The object type, which is always 'code_interpreter'. */
  type: "code_interpreter";
  /** The details of the tool call to the code interpreter tool. */
  codeInterpreter: RunStepCodeInterpreterToolCallDetails;
}

/** The detailed information about a code interpreter invocation by the model. */
export interface RunStepCodeInterpreterToolCallDetails {
  /** The input provided by the model to the code interpreter tool. */
  input: string;
  /** The outputs produced by the code interpreter tool back to the model in response to the tool call. */
  outputs: RunStepCodeInterpreterToolCallOutputUnion[];
}

/** An abstract representation of an emitted output from a code interpreter tool. */
export interface RunStepCodeInterpreterToolCallOutput {
  /** the discriminator possible values: logs, image */
  type: string;
}

/** A representation of a log output emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterLogOutput
  extends RunStepCodeInterpreterToolCallOutput {
  /** The object type, which is always 'logs'. */
  type: "logs";
  /** The serialized log output emitted by the code interpreter. */
  logs: string;
}

/** A representation of an image output emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterImageOutput
  extends RunStepCodeInterpreterToolCallOutput {
  /** The object type, which is always 'image'. */
  type: "image";
  /** Referential information for the image associated with this output. */
  image: RunStepCodeInterpreterImageReference;
}

/** An image reference emitted by a code interpreter tool in response to a tool call by the model. */
export interface RunStepCodeInterpreterImageReference {
  /** The ID of the file associated with this image. */
  fileId: string;
}

/**
 * A record of a call to a file search tool, issued by the model in evaluation of a defined tool, that represents
 * executed file search.
 */
export interface RunStepFileSearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'file_search'. */
  type: "file_search";
  /** Reserved for future use. */
  fileSearch: Record<string, string>;
}

/**
 * A record of a call to a bing search tool, issued by the model in evaluation of a defined tool, that represents
 * executed bing search.
 */
export interface RunStepBingSearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'bing_search'. */
  type: "bing_search";
  /** Reserved for future use. */
  bingSearch: Record<string, string>;
}

/**
 * A record of a call to an Azure AI Search tool, issued by the model in evaluation of a defined tool, that represents
 * executed Azure AI search.
 */
export interface RunStepAzureAISearchToolCall extends RunStepToolCall {
  /** The object type, which is always 'azure_ai_search'. */
  type: "azure_ai_search";
  /** Reserved for future use. */
  azureAISearch: Record<string, string>;
}

/**
 * A record of a call to a SharePoint tool, issued by the model in evaluation of a defined tool, that represents
 * executed SharePoint actions.
 */
export interface RunStepSharepointToolCall extends RunStepToolCall {
  /** The object type, which is always 'sharepoint'. */
  type: "sharepoint";
  /** Reserved for future use. */
  sharePoint: Record<string, string>;
}

/**
 * A record of a call to a Microsoft Fabric tool, issued by the model in evaluation of a defined tool, that represents
 * executed Microsoft Fabric operations.
 */
export interface RunStepMicrosoftFabricToolCall extends RunStepToolCall {
  /** The object type, which is always 'microsoft_fabric'. */
  type: "microsoft_fabric";
  /** Reserved for future use. */
  microsoftFabric: Record<string, string>;
}

/**
 * A record of a call to a function tool, issued by the model in evaluation of a defined tool, that represents the inputs
 * and output consumed and emitted by the specified function.
 */
export interface RunStepFunctionToolCall extends RunStepToolCall {
  /** The object type, which is always 'function'. */
  type: "function";
  /** The detailed information about the function called by the model. */
  function: RunStepFunctionToolCallDetails;
}

/** The detailed information about the function called by the model. */
export interface RunStepFunctionToolCallDetails {
  /** The name of the function. */
  name: string;
  /** The arguments that the model requires are provided to the named function. */
  arguments: string;
  /** The output of the function, only populated for function calls that have already have had their outputs submitted. */
  output: string | null;
}

/** The error information associated with a failed run step. */
export interface RunStepError {
  /** The error code for this error. */
  code: RunStepErrorCode;
  /** The human-readable text associated with this error. */
  message: string;
}

/** Possible error code values attributable to a failed run step. */
export type RunStepErrorCode = "server_error" | "rate_limit_exceeded";

/** Usage statistics related to the run step. */
export interface RunStepCompletionUsage {
  /** Number of completion tokens used over the course of the run step. */
  completionTokens: number;
  /** Number of prompt tokens used over the course of the run step. */
  promptTokens: number;
  /** Total number of tokens used (prompt + completion). */
  totalTokens: number;
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfRunStep {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: RunStep[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** The possible values denoting the intended usage of a file. */
export type FilePurpose =
  | "fine-tune"
  | "fine-tune-results"
  | "assistants"
  | "assistants_output"
  | "batch"
  | "batch_output"
  | "vision";

/** The response data from a file list operation. */
export interface FileListResponse {
  /** The object type, which is always 'list'. */
  object: "list";
  /** The files returned for the request. */
  data: OpenAIFile[];
}

/** Represents an agent that can call the model and use tools. */
export interface OpenAIFile {
  /** The object type, which is always 'file'. */
  object: "file";
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The size of the file, in bytes. */
  bytes: number;
  /** The name of the file. */
  filename: string;
  /** The Unix timestamp, in seconds, representing when this object was created. */
  createdAt: Date;
  /** The intended purpose of a file. */
  purpose: FilePurpose;
  /** The state of the file. This field is available in Azure OpenAI only. */
  status?: FileState;
  /** The error message with details in case processing of this file failed. This field is available in Azure OpenAI only. */
  statusDetails?: string;
}

/** The state of the file. */
export type FileState =
  | "uploaded"
  | "pending"
  | "running"
  | "processed"
  | "error"
  | "deleting"
  | "deleted";

/** A status response from a file deletion operation. */
export interface FileDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'file'. */
  object: "file";
}

/** A response from a file get content operation. */
export interface FileContentResponse {
  /** The content of the file, in bytes. */
  content: Uint8Array;
}

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfVectorStore {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: VectorStore[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** A vector store is a collection of processed files can be used by the `file_search` tool. */
export interface VectorStore {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store` */
  object: "vector_store";
  /** The Unix timestamp (in seconds) for when the vector store was created. */
  createdAt: Date;
  /** The name of the vector store. */
  name: string;
  /** The total number of bytes used by the files in the vector store. */
  usageBytes: number;
  /** Files count grouped by status processed or being processed by this vector store. */
  fileCounts: VectorStoreFileCount;
  /** The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use. */
  status: VectorStoreStatus;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicy;
  /** The Unix timestamp (in seconds) for when the vector store will expire. */
  expiresAt?: Date | null;
  /** The Unix timestamp (in seconds) for when the vector store was last active. */
  lastActiveAt: Date | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata: Record<string, string> | null;
}

/** Counts of files processed or being processed by this vector store grouped by status. */
export interface VectorStoreFileCount {
  /** The number of files that are currently being processed. */
  inProgress: number;
  /** The number of files that have been successfully processed. */
  completed: number;
  /** The number of files that have failed to process. */
  failed: number;
  /** The number of files that were cancelled. */
  cancelled: number;
  /** The total number of files. */
  total: number;
}

/** Vector store possible status */
export type VectorStoreStatus = "expired" | "in_progress" | "completed";

/** The expiration policy for a vector store. */
export interface VectorStoreExpirationPolicy {
  /** Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`. */
  anchor: VectorStoreExpirationPolicyAnchor;
  /** The anchor timestamp after which the expiration policy applies. */
  days: number;
}

export function vectorStoreExpirationPolicySerializer(
  item: VectorStoreExpirationPolicy,
): Record<string, unknown> {
  return {
    anchor: item["anchor"],
    days: item["days"],
  };
}

/** Describes the relationship between the days and the expiration of this vector store */
export type VectorStoreExpirationPolicyAnchor = "last_active_at";

/** An abstract representation of a vector store chunking strategy configuration. */
export interface VectorStoreChunkingStrategyRequest {
  /** the discriminator possible values: auto, static */
  type: VectorStoreChunkingStrategyRequestType;
}

export function vectorStoreChunkingStrategyRequestUnionSerializer(
  item: VectorStoreChunkingStrategyRequestUnion,
) {
  switch (item.type) {
    case "auto":
      return vectorStoreAutoChunkingStrategyRequestSerializer(
        item as VectorStoreAutoChunkingStrategyRequest,
      );

    case "static":
      return vectorStoreStaticChunkingStrategyRequestSerializer(
        item as VectorStoreStaticChunkingStrategyRequest,
      );

    default:
      return vectorStoreChunkingStrategyRequestSerializer(item);
  }
}

export function vectorStoreChunkingStrategyRequestSerializer(
  item: VectorStoreChunkingStrategyRequestUnion,
): Record<string, unknown> {
  return {
    ...vectorStoreChunkingStrategyRequestUnionSerializer(item),
  };
}

/** The default strategy. This strategy currently uses a max_chunk_size_tokens of 800 and chunk_overlap_tokens of 400. */
export interface VectorStoreAutoChunkingStrategyRequest
  extends VectorStoreChunkingStrategyRequest {
  /** The object type, which is always 'auto'. */
  type: "auto";
}

export function vectorStoreAutoChunkingStrategyRequestSerializer(
  item: VectorStoreAutoChunkingStrategyRequest,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** A statically configured chunking strategy. */
export interface VectorStoreStaticChunkingStrategyRequest
  extends VectorStoreChunkingStrategyRequest {
  /** The object type, which is always 'static'. */
  type: "static";
  /** The options for the static chunking strategy. */
  static: VectorStoreStaticChunkingStrategyOptions;
}

export function vectorStoreStaticChunkingStrategyRequestSerializer(
  item: VectorStoreStaticChunkingStrategyRequest,
): Record<string, unknown> {
  return {
    type: item["type"],
    static: vectorStoreStaticChunkingStrategyOptionsSerializer(item.static),
  };
}

/** Options to configure a vector store static chunking strategy. */
export interface VectorStoreStaticChunkingStrategyOptions {
  /** The maximum number of tokens in each chunk. The default value is 800. The minimum value is 100 and the maximum value is 4096. */
  maxChunkSizeTokens: number;
  /**
   * The number of tokens that overlap between chunks. The default value is 400.
   * Note that the overlap must not exceed half of max_chunk_size_tokens.     *
   */
  chunkOverlapTokens: number;
}

export function vectorStoreStaticChunkingStrategyOptionsSerializer(
  item: VectorStoreStaticChunkingStrategyOptions,
): Record<string, unknown> {
  return {
    max_chunk_size_tokens: item["maxChunkSizeTokens"],
    chunk_overlap_tokens: item["chunkOverlapTokens"],
  };
}

/** Type of chunking strategy */
export type VectorStoreChunkingStrategyRequestType = "auto" | "static";

export interface VectorStoreOptions {
  /** A list of file IDs that the vector store should use. Useful for tools like `file_search` that can access files. */
  fileIds?: string[];
  /** The name of the vector store. */
  name?: string;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicy;
  /** The chunking strategy used to chunk the file(s). If not set, will use the auto strategy. Only applicable if file_ids is non-empty. */
  chunkingStrategy?: VectorStoreChunkingStrategyRequestUnion;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

export interface VectorStoreUpdateOptions {
  /** The name of the vector store. */
  name?: string | null;
  /** Details on when this vector store expires */
  expiresAfter?: VectorStoreExpirationPolicy | null;
  /** A set of up to 16 key/value pairs that can be attached to an object, used for storing additional information about that object in a structured format. Keys may be up to 64 characters in length and values may be up to 512 characters in length. */
  metadata?: Record<string, string> | null;
}

/** Response object for deleting a vector store. */
export interface VectorStoreDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'vector_store.deleted'. */
  object: "vector_store.deleted";
}

/** Query parameter filter for vector store file retrieval endpoint */
export type VectorStoreFileStatusFilter =
  | "in_progress"
  | "completed"
  | "failed"
  | "cancelled";

/** The response data for a requested list of items. */
export interface OpenAIPageableListOfVectorStoreFile {
  /** The object type, which is always list. */
  object: "list";
  /** The requested list of items. */
  data: VectorStoreFile[];
  /** The first ID represented in this list. */
  firstId: string;
  /** The last ID represented in this list. */
  lastId: string;
  /** A value indicating whether there are additional values available not captured in this list. */
  hasMore: boolean;
}

/** Description of a file attached to a vector store. */
export interface VectorStoreFile {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file`. */
  object: "vector_store.file";
  /**
   * The total vector store usage in bytes. Note that this may be different from the original file
   * size.
   */
  usageBytes: number;
  /** The Unix timestamp (in seconds) for when the vector store file was created. */
  createdAt: Date;
  /** The ID of the vector store that the file is attached to. */
  vectorStoreId: string;
  /** The status of the vector store file, which can be either `in_progress`, `completed`, `cancelled`, or `failed`. The status `completed` indicates that the vector store file is ready for use. */
  status: VectorStoreFileStatus;
  /** The last error associated with this vector store file. Will be `null` if there are no errors. */
  lastError: VectorStoreFileError | null;
  /** The strategy used to chunk the file. */
  chunkingStrategy: VectorStoreChunkingStrategyResponseUnion;
}

/** Vector store file status */
export type VectorStoreFileStatus =
  | "in_progress"
  | "completed"
  | "failed"
  | "cancelled";

/** Details on the error that may have ocurred while processing a file for this vector store */
export interface VectorStoreFileError {
  /** One of `server_error` or `rate_limit_exceeded`. */
  code: VectorStoreFileErrorCode;
  /** A human-readable description of the error. */
  message: string;
}

/** Error code variants for vector store file processing */
export type VectorStoreFileErrorCode =
  | "internal_error"
  | "file_not_found"
  | "parsing_error"
  | "unhandled_mime_type";

/** An abstract representation of a vector store chunking strategy configuration. */
export interface VectorStoreChunkingStrategyResponse {
  /** the discriminator possible values: other, static */
  type: VectorStoreChunkingStrategyResponseType;
}

/** This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the chunking_strategy concept was introduced in the API. */
export interface VectorStoreAutoChunkingStrategyResponse
  extends VectorStoreChunkingStrategyResponse {
  /** The object type, which is always 'other'. */
  type: "other";
}

/** A statically configured chunking strategy. */
export interface VectorStoreStaticChunkingStrategyResponse
  extends VectorStoreChunkingStrategyResponse {
  /** The object type, which is always 'static'. */
  type: "static";
  /** The options for the static chunking strategy. */
  static: VectorStoreStaticChunkingStrategyOptions;
}

/** Type of chunking strategy */
export type VectorStoreChunkingStrategyResponseType = "other" | "static";

/** Response object for deleting a vector store file relationship. */
export interface VectorStoreFileDeletionStatus {
  /** The ID of the resource specified for deletion. */
  id: string;
  /** A value indicating whether deletion was successful. */
  deleted: boolean;
  /** The object type, which is always 'vector_store.deleted'. */
  object: "vector_store.file.deleted";
}

/** A batch of files attached to a vector store. */
export interface VectorStoreFileBatch {
  /** The identifier, which can be referenced in API endpoints. */
  id: string;
  /** The object type, which is always `vector_store.file_batch`. */
  object: "vector_store.files_batch";
  /** The Unix timestamp (in seconds) for when the vector store files batch was created. */
  createdAt: Date;
  /** The ID of the vector store that the file is attached to. */
  vectorStoreId: string;
  /** The status of the vector store files batch, which can be either `in_progress`, `completed`, `cancelled` or `failed`. */
  status: VectorStoreFileBatchStatus;
  /** Files count grouped by status processed or being processed by this vector store. */
  fileCounts: VectorStoreFileCount;
}

/** The status of the vector store file batch. */
export type VectorStoreFileBatchStatus =
  | "in_progress"
  | "completed"
  | "cancelled"
  | "failed";
/** Azure AI API versions */
export type Versions = "2024-07-01-preview";

export interface _CustomPage {
  /** The Evaluation items on this page */
  value: Evaluation[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Alias for InputDataUnion */
export type InputDataUnion = AppInsightsConfiguration | Dataset | InputData;
/** Alias for TriggerUnion */
export type TriggerUnion = RecurrenceTrigger | CronTrigger | Trigger;
/** Alias for ConnectionPropertiesUnion */
export type ConnectionPropertiesUnion =
  | ConnectionPropertiesApiKeyAuth
  | ConnectionPropertiesAADAuth
  | ConnectionPropertiesSASAuth
  | ConnectionProperties;
/** Alias for ToolDefinitionUnion */
export type ToolDefinitionUnion =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition
  | FunctionToolDefinition
  | BingSearchToolDefinition
  | MicrosoftFabricToolDefinition
  | SharepointToolDefinition
  | AzureAISearchToolDefinition
  | ToolDefinition;
/** Alias for MessageAttachmentToolDefinition */
export type MessageAttachmentToolDefinition =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition;
/** Alias for MessageContentUnion */
export type MessageContentUnion =
  | MessageTextContent
  | MessageImageFileContent
  | MessageContent;
/** Alias for MessageTextAnnotationUnion */
export type MessageTextAnnotationUnion =
  | MessageTextFileCitationAnnotation
  | MessageTextFilePathAnnotation
  | MessageTextAnnotation;
/** Alias for RequiredActionUnion */
export type RequiredActionUnion = SubmitToolOutputsAction | RequiredAction;
/** Alias for RequiredActionUnion */
export type RequiredActionUnion = SubmitToolOutputsAction | RequiredAction;
/** Alias for RequiredToolCallUnion */
export type RequiredToolCallUnion = RequiredFunctionToolCall | RequiredToolCall;
/** Alias for RunStepDetailsUnion */
export type RunStepDetailsUnion =
  | RunStepMessageCreationDetails
  | RunStepToolCallDetails
  | RunStepDetails;
/** Alias for RunStepToolCallUnion */
export type RunStepToolCallUnion =
  | RunStepCodeInterpreterToolCall
  | RunStepFileSearchToolCall
  | RunStepBingSearchToolCall
  | RunStepAzureAISearchToolCall
  | RunStepSharepointToolCall
  | RunStepMicrosoftFabricToolCall
  | RunStepFunctionToolCall
  | RunStepToolCall;
/** Alias for RunStepCodeInterpreterToolCallOutputUnion */
export type RunStepCodeInterpreterToolCallOutputUnion =
  | RunStepCodeInterpreterLogOutput
  | RunStepCodeInterpreterImageOutput
  | RunStepCodeInterpreterToolCallOutput;
/** Alias for VectorStoreChunkingStrategyRequestUnion */
export type VectorStoreChunkingStrategyRequestUnion =
  | VectorStoreAutoChunkingStrategyRequest
  | VectorStoreStaticChunkingStrategyRequest
  | VectorStoreChunkingStrategyRequest;
/** Alias for VectorStoreChunkingStrategyResponseUnion */
export type VectorStoreChunkingStrategyResponseUnion =
  | VectorStoreAutoChunkingStrategyResponse
  | VectorStoreStaticChunkingStrategyResponse
  | VectorStoreChunkingStrategyResponse;
