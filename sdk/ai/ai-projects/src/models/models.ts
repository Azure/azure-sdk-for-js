// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  CodeInterpreterToolDefinition,
  FileSearchToolDefinition,
  ThreadStreamEvent,
  RunStreamEvent,
  RunStepStreamEvent,
  MessageStreamEvent,
  ErrorEvent,
  DoneEvent,
} from "./agents/models.js";

/** Evaluation Definition */
export interface Evaluation {
  /** Identifier of the evaluation. */
  readonly id: string;
  /** Data for evaluation. */
  data: InputDataUnion;
  /** Evaluation target specifying the model config and parameters */
  target?: EvaluationTarget;
  /** Display Name for evaluation. It helps to find the evaluation easily in AI Foundry. It does not need to be unique. */
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

export function evaluationSerializer(item: Evaluation): any {
  return {
    data: inputDataUnionSerializer(item["data"]),
    target: !item["target"]
      ? item["target"]
      : evaluationTargetSerializer(item["target"]),
    displayName: item["displayName"],
    description: item["description"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordSerializer(item["evaluators"]),
  };
}

export function evaluationDeserializer(item: any): Evaluation {
  return {
    id: item["id"],
    data: inputDataUnionDeserializer(item["data"]),
    target: !item["target"]
      ? item["target"]
      : evaluationTargetDeserializer(item["target"]),
    displayName: item["displayName"],
    description: item["description"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    status: item["status"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordDeserializer(item["evaluators"]),
  };
}

/** Abstract data class for input data configuration. */
export interface InputData {
  /** Type of the data. */
  /** The discriminator possible values: app_insights, dataset */
  type: string;
}

export function inputDataSerializer(item: InputData): any {
  return { type: item["type"] };
}

export function inputDataDeserializer(item: any): InputData {
  return {
    type: item["type"],
  };
}

/** Alias for InputDataUnion */
export type InputDataUnion =
  | ApplicationInsightsConfiguration
  | Dataset
  | InputData;

export function inputDataUnionSerializer(item: InputDataUnion): any {
  switch (item.type) {
    case "app_insights":
      return applicationInsightsConfigurationSerializer(
        item as ApplicationInsightsConfiguration,
      );

    case "dataset":
      return datasetSerializer(item as Dataset);

    default:
      return inputDataSerializer(item);
  }
}

export function inputDataUnionDeserializer(item: any): InputDataUnion {
  switch (item.type) {
    case "app_insights":
      return applicationInsightsConfigurationDeserializer(
        item as ApplicationInsightsConfiguration,
      );

    case "dataset":
      return datasetDeserializer(item as Dataset);

    default:
      return inputDataDeserializer(item);
  }
}

/** Data Source for Application Insights. */
export interface ApplicationInsightsConfiguration extends InputData {
  readonly type: "app_insights";
  /** LogAnalytic Workspace resourceID associated with ApplicationInsights */
  resourceId: string;
  /** Query to fetch the data. */
  query: string;
  /** Service name. */
  serviceName?: string;
  /** Connection String to connect to ApplicationInsights. */
  connectionString?: string;
}

export function applicationInsightsConfigurationSerializer(
  item: ApplicationInsightsConfiguration,
): any {
  return {
    resourceId: item["resourceId"],
    query: item["query"],
    serviceName: item["serviceName"],
    connectionString: item["connectionString"],
  };
}

export function applicationInsightsConfigurationDeserializer(
  item: any,
): ApplicationInsightsConfiguration {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
    query: item["query"],
    serviceName: item["serviceName"],
    connectionString: item["connectionString"],
  };
}

/** Dataset as source for evaluation. */
export interface Dataset extends InputData {
  readonly type: "dataset";
  /** Evaluation input data */
  id: string;
}

export function datasetSerializer(item: Dataset): any {
  return { id: item["id"] };
}

export function datasetDeserializer(item: any): Dataset {
  return {
    type: item["type"],
    id: item["id"],
  };
}

/** Target for the evaluation process. */
export interface EvaluationTarget {
  /** System message related to the evaluation target. */
  systemMessage: string;
  /** Model configuration for the evaluation. */
  modelConfig: TargetModelConfigUnion;
  /** A dictionary of parameters for the model. */
  modelParams?: Record<string, any>;
}

export function evaluationTargetSerializer(item: EvaluationTarget): any {
  return {
    systemMessage: item["systemMessage"],
    modelConfig: targetModelConfigUnionSerializer(item["modelConfig"]),
    modelParams: item["modelParams"],
  };
}

export function evaluationTargetDeserializer(item: any): EvaluationTarget {
  return {
    systemMessage: item["systemMessage"],
    modelConfig: targetModelConfigUnionDeserializer(item["modelConfig"]),
    modelParams: item["modelParams"],
  };
}

/** Abstract class for model configuration. */
export interface TargetModelConfig {
  /** Type of the model configuration. */
  /** The discriminator possible values: AOAI, MAAS */
  type: string;
}

export function targetModelConfigSerializer(item: TargetModelConfig): any {
  return { type: item["type"] };
}

export function targetModelConfigDeserializer(item: any): TargetModelConfig {
  return {
    type: item["type"],
  };
}

/** Alias for TargetModelConfigUnion */
export type TargetModelConfigUnion =
  | AoaiModelConfig
  | MaasModelConfig
  | TargetModelConfig;

export function targetModelConfigUnionSerializer(
  item: TargetModelConfigUnion,
): any {
  switch (item.type) {
    case "AOAI":
      return aoaiModelConfigSerializer(item as AoaiModelConfig);

    case "MAAS":
      return maasModelConfigSerializer(item as MaasModelConfig);

    default:
      return targetModelConfigSerializer(item);
  }
}

export function targetModelConfigUnionDeserializer(
  item: any,
): TargetModelConfigUnion {
  switch (item.type) {
    case "AOAI":
      return aoaiModelConfigDeserializer(item as AoaiModelConfig);

    case "MAAS":
      return maasModelConfigDeserializer(item as MaasModelConfig);

    default:
      return targetModelConfigDeserializer(item);
  }
}

/** Azure OpenAI model configuration. The API version would be selected by the service for querying the model. */
export interface AoaiModelConfig extends TargetModelConfig {
  readonly type: "AOAI";
  /** Endpoint URL for AOAI model. */
  azureEndpoint: string;
  /** API Key for AOAI model. */
  apiKey: string;
  /** Deployment name for AOAI model. */
  azureDeployment: string;
}

export function aoaiModelConfigSerializer(item: AoaiModelConfig): any {
  return {
    azureEndpoint: item["azureEndpoint"],
    apiKey: item["apiKey"],
    azureDeployment: item["azureDeployment"],
  };
}

export function aoaiModelConfigDeserializer(item: any): AoaiModelConfig {
  return {
    type: item["type"],
    azureEndpoint: item["azureEndpoint"],
    apiKey: item["apiKey"],
    azureDeployment: item["azureDeployment"],
  };
}

/** MaaS model configuration. The API version would be selected by the service for querying the model. */
export interface MaasModelConfig extends TargetModelConfig {
  readonly type: "MAAS";
  /** Endpoint URL for MAAS model. */
  azureEndpoint: string;
  /** API Key for MAAS model. */
  apiKey: string;
}

export function maasModelConfigSerializer(item: MaasModelConfig): any {
  return { azureEndpoint: item["azureEndpoint"], apiKey: item["apiKey"] };
}

export function maasModelConfigDeserializer(item: any): MaasModelConfig {
  return {
    type: item["type"],
    azureEndpoint: item["azureEndpoint"],
    apiKey: item["apiKey"],
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

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdAt: !item["createdAt"]
      ? item["createdAt"]
      : new Date(item["createdAt"]),
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

export function evaluatorConfigurationRecordSerializer(
  item: Record<string, EvaluatorConfiguration>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : evaluatorConfigurationSerializer(item[key]);
  });
  return result;
}

export function evaluatorConfigurationRecordDeserializer(
  item: Record<string, any>,
): Record<string, EvaluatorConfiguration> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : evaluatorConfigurationDeserializer(item[key]);
  });
  return result;
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
): any {
  return {
    id: item["id"],
    initParams: item["initParams"],
    dataMapping: item["dataMapping"],
  };
}

export function evaluatorConfigurationDeserializer(
  item: any,
): EvaluatorConfiguration {
  return {
    id: item["id"],
    initParams: item["initParams"],
    dataMapping: item["dataMapping"],
  };
}

/** Paged collection of Evaluation items */
export interface _PagedEvaluation {
  /** The Evaluation items on this page */
  value: Evaluation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationDeserializer(item: any): _PagedEvaluation {
  return {
    value: evaluationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationArraySerializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationSerializer(item);
  });
}

export function evaluationArrayDeserializer(result: Array<Evaluation>): any[] {
  return result.map((item) => {
    return evaluationDeserializer(item);
  });
}

/** Evaluation Schedule Definition */
export interface EvaluationSchedule {
  /** Name of the schedule, which also serves as the unique identifier for the evaluation */
  readonly name: string;
  /** Data for evaluation. */
  data: ApplicationInsightsConfiguration;
  /** Description of the evaluation. It can be used to store additional information about the evaluation and is mutable. */
  description?: string;
  /** Metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
  /** Provisioning State of the evaluation. It is set by service and is read-only. */
  readonly provisioningState?: string;
  /** Evaluation's tags. Unlike properties, tags are fully mutable. */
  tags?: Record<string, string>;
  /** Evaluation's properties. Unlike tags, properties are add-only. Once added, a property cannot be removed. */
  properties?: Record<string, string>;
  /** Enabled status of the evaluation. It is set by service and is read-only. */
  readonly isEnabled?: string;
  /** Evaluators to be used for the evaluation. */
  evaluators: Record<string, EvaluatorConfiguration>;
  /** Trigger for the evaluation. */
  trigger: TriggerUnion;
}

export function evaluationScheduleSerializer(item: EvaluationSchedule): any {
  return {
    data: applicationInsightsConfigurationSerializer(item["data"]),
    description: item["description"],
    tags: item["tags"],
    properties: item["properties"],
    evaluators: evaluatorConfigurationRecordSerializer(item["evaluators"]),
    trigger: triggerUnionSerializer(item["trigger"]),
  };
}

export function evaluationScheduleDeserializer(item: any): EvaluationSchedule {
  return {
    name: item["name"],
    data: applicationInsightsConfigurationDeserializer(item["data"]),
    description: item["description"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    provisioningState: item["provisioningState"],
    tags: item["tags"],
    properties: item["properties"],
    isEnabled: item["isEnabled"],
    evaluators: evaluatorConfigurationRecordDeserializer(item["evaluators"]),
    trigger: triggerUnionDeserializer(item["trigger"]),
  };
}

/** Abstract data class for input data configuration. */
export interface Trigger {
  /** Type of the trigger. */
  /** The discriminator possible values: Recurrence, Cron */
  type: string;
}

export function triggerSerializer(item: Trigger): any {
  return { type: item["type"] };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    type: item["type"],
  };
}

/** Alias for TriggerUnion */
export type TriggerUnion = RecurrenceTrigger | CronTrigger | Trigger;

export function triggerUnionSerializer(item: TriggerUnion): any {
  switch (item.type) {
    case "Recurrence":
      return recurrenceTriggerSerializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerSerializer(item as CronTrigger);

    default:
      return triggerSerializer(item);
  }
}

export function triggerUnionDeserializer(item: any): TriggerUnion {
  switch (item.type) {
    case "Recurrence":
      return recurrenceTriggerDeserializer(item as RecurrenceTrigger);

    case "Cron":
      return cronTriggerDeserializer(item as CronTrigger);

    default:
      return triggerDeserializer(item);
  }
}

/** Recurrence Trigger Definition */
export interface RecurrenceTrigger extends Trigger {
  readonly type: "Recurrence";
  /** The frequency to trigger schedule. */
  frequency: Frequency;
  /** Specifies schedule interval in conjunction with frequency */
  interval: number;
  /** The recurrence schedule. */
  schedule?: RecurrenceSchedule;
}

export function recurrenceTriggerSerializer(item: RecurrenceTrigger): any {
  return {
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : recurrenceScheduleSerializer(item["schedule"]),
  };
}

export function recurrenceTriggerDeserializer(item: any): RecurrenceTrigger {
  return {
    type: item["type"],
    frequency: item["frequency"],
    interval: item["interval"],
    schedule: !item["schedule"]
      ? item["schedule"]
      : recurrenceScheduleDeserializer(item["schedule"]),
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
  weekDays?: WeekDays[];
  /** List of month days for the schedule */
  monthDays?: number[];
}

export function recurrenceScheduleSerializer(item: RecurrenceSchedule): any {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
  };
}

export function recurrenceScheduleDeserializer(item: any): RecurrenceSchedule {
  return {
    hours: item["hours"].map((p: any) => {
      return p;
    }),
    minutes: item["minutes"].map((p: any) => {
      return p;
    }),
    weekDays: !item["weekDays"]
      ? item["weekDays"]
      : item["weekDays"].map((p: any) => {
          return p;
        }),
    monthDays: !item["monthDays"]
      ? item["monthDays"]
      : item["monthDays"].map((p: any) => {
          return p;
        }),
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

export function cronTriggerSerializer(item: CronTrigger): any {
  return { expression: item["expression"] };
}

export function cronTriggerDeserializer(item: any): CronTrigger {
  return {
    type: item["type"],
    expression: item["expression"],
  };
}

/** Paged collection of EvaluationSchedule items */
export interface _PagedEvaluationSchedule {
  /** The EvaluationSchedule items on this page */
  value: EvaluationSchedule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedEvaluationScheduleDeserializer(
  item: any,
): _PagedEvaluationSchedule {
  return {
    value: evaluationScheduleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function evaluationScheduleArraySerializer(
  result: Array<EvaluationSchedule>,
): any[] {
  return result.map((item) => {
    return evaluationScheduleSerializer(item);
  });
}

export function evaluationScheduleArrayDeserializer(
  result: Array<EvaluationSchedule>,
): any[] {
  return result.map((item) => {
    return evaluationScheduleDeserializer(item);
  });
}

/** Response from getting properties of the Application Insights resource */
export interface GetAppInsightsResponse {
  /** A unique identifier for the resource */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: AppInsightsProperties;
}

export function getAppInsightsResponseDeserializer(
  item: any,
): GetAppInsightsResponse {
  return {
    id: item["id"],
    name: item["name"],
    properties: appInsightsPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of the Application Insights resource */
export interface AppInsightsProperties {
  /** Authentication type of the connection target */
  connectionString: string;
}

export function appInsightsPropertiesDeserializer(
  item: any,
): AppInsightsProperties {
  return {
    connectionString: item["ConnectionString"],
  };
}

/** Response from the Workspace - Get operation */
export interface GetWorkspaceResponse {
  /** A unique identifier for the resource */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: WorkspaceProperties;
}

export function getWorkspaceResponseDeserializer(
  item: any,
): GetWorkspaceResponse {
  return {
    id: item["id"],
    name: item["name"],
    properties: workspacePropertiesDeserializer(item["properties"]),
  };
}

/** workspace properties */
export interface WorkspaceProperties {
  /** Authentication type of the connection target */
  applicationInsights: string;
}

export function workspacePropertiesDeserializer(
  item: any,
): WorkspaceProperties {
  return {
    applicationInsights: item["applicationInsights"],
  };
}

/** Response from the list operation */
export interface ListConnectionsResponse {
  /** A list of connection list secrets */
  value: GetConnectionResponse[];
}

export function listConnectionsResponseDeserializer(
  item: any,
): ListConnectionsResponse {
  return {
    value: getConnectionResponseArrayDeserializer(item["value"]),
  };
}

export function getConnectionResponseArrayDeserializer(
  result: Array<GetConnectionResponse>,
): any[] {
  return result.map((item) => {
    return getConnectionResponseDeserializer(item);
  });
}

/** Response from the listSecrets operation */
export interface GetConnectionResponse {
  /** A unique identifier for the connection */
  id: string;
  /** The name of the resource */
  name: string;
  /** The properties of the resource */
  properties: InternalConnectionPropertiesUnion;
}

export function getConnectionResponseDeserializer(
  item: any,
): GetConnectionResponse {
  return {
    id: item["id"],
    name: item["name"],
    properties: internalConnectionPropertiesUnionDeserializer(
      item["properties"],
    ),
  };
}

/** Connection properties */
export interface InternalConnectionProperties {
  /** Authentication type of the connection target */
  /** The discriminator possible values: ApiKey, AAD, CustomKeys, SAS, None */
  authType: AuthenticationType;
  /** Category of the connection */
  category: ConnectionType;
  /** The connection URL to be used for this service */
  target: string;
}

export function internalConnectionPropertiesDeserializer(
  item: any,
): InternalConnectionProperties {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
  };
}

/** Alias for InternalConnectionPropertiesUnion */
export type InternalConnectionPropertiesUnion =
  | InternalConnectionPropertiesApiKeyAuth
  | InternalConnectionPropertiesAADAuth
  | InternalConnectionPropertiesCustomAuth
  | InternalConnectionPropertiesSASAuth
  | InternalConnectionPropertiesNoAuth
  | InternalConnectionProperties;

export function internalConnectionPropertiesUnionDeserializer(
  item: any,
): InternalConnectionPropertiesUnion {
  switch (item.authType) {
    case "ApiKey":
      return internalConnectionPropertiesApiKeyAuthDeserializer(
        item as InternalConnectionPropertiesApiKeyAuth,
      );

    case "AAD":
      return internalConnectionPropertiesAADAuthDeserializer(
        item as InternalConnectionPropertiesAADAuth,
      );

    case "CustomKeys":
      return internalConnectionPropertiesCustomAuthDeserializer(
        item as InternalConnectionPropertiesCustomAuth,
      );

    case "SAS":
      return internalConnectionPropertiesSASAuthDeserializer(
        item as InternalConnectionPropertiesSASAuth,
      );

    case "None":
      return internalConnectionPropertiesNoAuthDeserializer(
        item as InternalConnectionPropertiesNoAuth,
      );

    default:
      return internalConnectionPropertiesDeserializer(item);
  }
}

/** Authentication type used by Azure AI service to connect to another service */
export type AuthenticationType =
  | "ApiKey"
  | "AAD"
  | "SAS"
  | "CustomKeys"
  | "None";
/** The Type (or category) of the connection */
export type ConnectionType =
  | "AzureOpenAI"
  | "Serverless"
  | "AzureBlob"
  | "AIServices"
  | "CognitiveSearch"
  | "ApiKey"
  | "CustomKeys"
  | "CognitiveService";

/** Connection properties for connections with API key authentication */
export interface InternalConnectionPropertiesApiKeyAuth
  extends InternalConnectionProperties {
  /** Authentication type of the connection target */
  authType: "ApiKey";
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsApiKeyAuth;
}

export function internalConnectionPropertiesApiKeyAuthDeserializer(
  item: any,
): InternalConnectionPropertiesApiKeyAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
    credentials: credentialsApiKeyAuthDeserializer(item["credentials"]),
  };
}

/** The credentials needed for API key authentication */
export interface CredentialsApiKeyAuth {
  /** The API key */
  key: string;
}

export function credentialsApiKeyAuthDeserializer(
  item: any,
): CredentialsApiKeyAuth {
  return {
    key: item["key"],
  };
}

/** Connection properties for connections with AAD authentication (aka `Entra ID passthrough`) */
export interface InternalConnectionPropertiesAADAuth
  extends InternalConnectionProperties {
  /** Authentication type of the connection target */
  authType: "AAD";
}

export function internalConnectionPropertiesAADAuthDeserializer(
  item: any,
): InternalConnectionPropertiesAADAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
  };
}

/** Connection properties for connections with Custom authentication */
export interface InternalConnectionPropertiesCustomAuth
  extends InternalConnectionProperties {
  /** Authentication type of the connection target */
  authType: "CustomKeys";
}

export function internalConnectionPropertiesCustomAuthDeserializer(
  item: any,
): InternalConnectionPropertiesCustomAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
  };
}

/** Connection properties for connections with SAS authentication */
export interface InternalConnectionPropertiesSASAuth
  extends InternalConnectionProperties {
  /** Authentication type of the connection target */
  authType: "SAS";
  /** Credentials will only be present for authType=ApiKey */
  credentials: CredentialsSASAuth;
}

export function internalConnectionPropertiesSASAuthDeserializer(
  item: any,
): InternalConnectionPropertiesSASAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
    credentials: credentialsSASAuthDeserializer(item["credentials"]),
  };
}

/** The credentials needed for Shared Access Signatures (SAS) authentication */
export interface CredentialsSASAuth {
  /** The Shared Access Signatures (SAS) token */
  sas: string;
}

export function credentialsSASAuthDeserializer(item: any): CredentialsSASAuth {
  return {
    sas: item["SAS"],
  };
}

/** Connection properties for connections with no authentication */
export interface InternalConnectionPropertiesNoAuth
  extends InternalConnectionProperties {
  /** Authentication type of the connection target */
  authType: "None";
}

export function internalConnectionPropertiesNoAuthDeserializer(
  item: any,
): InternalConnectionPropertiesNoAuth {
  return {
    authType: item["authType"],
    category: item["category"],
    target: item["target"],
  };
}

/** Alias for _MessageAttachmentTool */
export type _MessageAttachmentTool =
  | CodeInterpreterToolDefinition
  | FileSearchToolDefinition;

export function _messageAttachmentToolSerializer(
  item: _MessageAttachmentTool,
): any {
  return item;
}

export function _messageAttachmentToolDeserializer(
  item: any,
): _MessageAttachmentTool {
  return item;
}

/** Alias for _ */
export type _ =
  | ThreadStreamEvent
  | RunStreamEvent
  | RunStepStreamEvent
  | MessageStreamEvent
  | ErrorEvent
  | DoneEvent;

/** Azure AI API versions */
export enum KnownVersions {
  /** Azure AI API version 2024-07-01-preview. */
  _20240701Preview = "2024-07-01-preview",
}
