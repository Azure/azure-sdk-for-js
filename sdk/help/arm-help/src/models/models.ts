// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
  };
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  readonly provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  readonly resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  readonly operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  readonly description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
export enum KnownOrigin {
  /** Indicates the operation is initiated by a user. */
  User = "user",
  /** Indicates the operation is initiated by a system. */
  System = "system",
  /** Indicates the operation is initiated by a user or system. */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user**: Indicates the operation is initiated by a user. \
 * **system**: Indicates the operation is initiated by a system. \
 * **user,system**: Indicates the operation is initiated by a user or system.
 */
export type Origin = string;

/** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Actions are for internal-only APIs. */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Actions are for internal-only APIs.
 */
export type ActionType = string;

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The error detail. */
export interface ErrorDetail {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: ErrorDetail[];
  /** The error additional info. */
  readonly additionalInfo?: ErrorAdditionalInfo[];
}

export function errorDetailDeserializer(item: any): ErrorDetail {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : errorDetailArrayDeserializer(item["details"]),
    additionalInfo: !item["additionalInfo"]
      ? item["additionalInfo"]
      : errorAdditionalInfoArrayDeserializer(item["additionalInfo"]),
  };
}

export function errorDetailArrayDeserializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailDeserializer(item);
  });
}

export function errorAdditionalInfoArrayDeserializer(result: Array<ErrorAdditionalInfo>): any[] {
  return result.map((item) => {
    return errorAdditionalInfoDeserializer(item);
  });
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: any;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: item["info"],
  };
}

/** Diagnostic resource */
export interface DiagnosticResource extends ExtensionResource {
  /** Diagnostic Resource properties. */
  properties?: DiagnosticResourceProperties;
}

export function diagnosticResourceSerializer(item: DiagnosticResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticResourcePropertiesSerializer(item["properties"]),
  };
}

export function diagnosticResourceDeserializer(item: any): DiagnosticResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : diagnosticResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Diagnostic resource properties. */
export interface DiagnosticResourceProperties {
  /** Global parameters is an optional map which can be used to add key and  value to request body to improve the diagnostics results */
  globalParameters?: Record<string, string>;
  /** SolutionIds that are needed to be invoked. */
  insights?: DiagnosticInvocation[];
  /** Diagnostic Request Accepted time. */
  readonly acceptedAt?: string;
  /** Status of diagnostic provisioning. */
  readonly provisioningState?: DiagnosticProvisioningState;
  /** Array of Diagnostics. */
  readonly diagnostics?: Diagnostic[];
}

export function diagnosticResourcePropertiesSerializer(item: DiagnosticResourceProperties): any {
  return {
    globalParameters: item["globalParameters"],
    insights: !item["insights"]
      ? item["insights"]
      : diagnosticInvocationArraySerializer(item["insights"]),
  };
}

export function diagnosticResourcePropertiesDeserializer(item: any): DiagnosticResourceProperties {
  return {
    globalParameters: item["globalParameters"],
    insights: !item["insights"]
      ? item["insights"]
      : diagnosticInvocationArrayDeserializer(item["insights"]),
    acceptedAt: item["acceptedAt"],
    provisioningState: item["provisioningState"],
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : diagnosticArrayDeserializer(item["diagnostics"]),
  };
}

export function diagnosticInvocationArraySerializer(result: Array<DiagnosticInvocation>): any[] {
  return result.map((item) => {
    return diagnosticInvocationSerializer(item);
  });
}

export function diagnosticInvocationArrayDeserializer(result: Array<DiagnosticInvocation>): any[] {
  return result.map((item) => {
    return diagnosticInvocationDeserializer(item);
  });
}

/** Solution Invocation with additional params needed for invocation. */
export interface DiagnosticInvocation {
  /** Solution Id to invoke. */
  solutionId?: string;
  /** Additional parameters required to invoke the solutionId. */
  additionalParameters?: Record<string, string>;
}

export function diagnosticInvocationSerializer(item: DiagnosticInvocation): any {
  return {
    solutionId: item["solutionId"],
    additionalParameters: item["additionalParameters"],
  };
}

export function diagnosticInvocationDeserializer(item: any): DiagnosticInvocation {
  return {
    solutionId: item["solutionId"],
    additionalParameters: item["additionalParameters"],
  };
}

/** Status of diagnostic provisioning. */
export enum KnownDiagnosticProvisioningState {
  /** All Diagnostics in the Batch succeeded. */
  Succeeded = "Succeeded",
  /** Some Diagnostics are still running or failed. */
  PartialComplete = "PartialComplete",
  /** All Diagnostics failed to run. */
  Failed = "Failed",
  /** All Diagnostics are still running. */
  Running = "Running",
  /** When Diagnostic request gets canceled. */
  Canceled = "Canceled",
}

/**
 * Status of diagnostic provisioning. \
 * {@link KnownDiagnosticProvisioningState} can be used interchangeably with DiagnosticProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: All Diagnostics in the Batch succeeded. \
 * **PartialComplete**: Some Diagnostics are still running or failed. \
 * **Failed**: All Diagnostics failed to run. \
 * **Running**: All Diagnostics are still running. \
 * **Canceled**: When Diagnostic request gets canceled.
 */
export type DiagnosticProvisioningState = string;

export function diagnosticArrayDeserializer(result: Array<Diagnostic>): any[] {
  return result.map((item) => {
    return diagnosticDeserializer(item);
  });
}

/** Properties returned with in an insight. */
export interface Diagnostic {
  /** Solution Id */
  solutionId?: string;
  /** Denotes the status of the diagnostic resource. */
  status?: Status;
  /** The problems (if any) detected by this insight. */
  insights?: Insight[];
  /** Error definition. */
  error?: ErrorModel;
}

export function diagnosticDeserializer(item: any): Diagnostic {
  return {
    solutionId: item["solutionId"],
    status: item["status"],
    insights: !item["insights"] ? item["insights"] : insightArrayDeserializer(item["insights"]),
    error: !item["error"] ? item["error"] : errorDeserializer(item["error"]),
  };
}

/** Denotes the status of the diagnostic resource. */
export enum KnownStatus {
  /** Diagnostic creation failed. */
  Failed = "Failed",
  /** Request is missing required inputs to run. */
  MissingInputs = "MissingInputs",
  /** Diagnostic is still running. */
  Running = "Running",
  /** Diagnostic creation succeeded. */
  Succeeded = "Succeeded",
  /** Diagnostic was timed out. */
  Timeout = "Timeout",
}

/**
 * Denotes the status of the diagnostic resource. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Failed**: Diagnostic creation failed. \
 * **MissingInputs**: Request is missing required inputs to run. \
 * **Running**: Diagnostic is still running. \
 * **Succeeded**: Diagnostic creation succeeded. \
 * **Timeout**: Diagnostic was timed out.
 */
export type Status = string;

export function insightArrayDeserializer(result: Array<Insight>): any[] {
  return result.map((item) => {
    return insightDeserializer(item);
  });
}

/** Detailed insights(s) obtained via the invocation of an insight diagnostic */
export interface Insight {
  /** Article id. */
  id?: string;
  /** This insight's title. */
  title?: string;
  /** Detailed result content. */
  results?: string;
  /** Importance level of the insight. */
  importanceLevel?: ImportanceLevel;
}

export function insightDeserializer(item: any): Insight {
  return {
    id: item["id"],
    title: item["title"],
    results: item["results"],
    importanceLevel: item["importanceLevel"],
  };
}

/** Importance level of the insight. */
export enum KnownImportanceLevel {
  /** A critical insight has been found after running the diagnostic. */
  Critical = "Critical",
  /** A warning insight has been found after running the diagnostic. */
  Warning = "Warning",
  /** An information insight has been found after running the diagnostic. */
  Information = "Information",
}

/**
 * Importance level of the insight. \
 * {@link KnownImportanceLevel} can be used interchangeably with ImportanceLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: A critical insight has been found after running the diagnostic. \
 * **Warning**: A warning insight has been found after running the diagnostic. \
 * **Information**: An information insight has been found after running the diagnostic.
 */
export type ImportanceLevel = string;

/** Error definition. */
export interface ErrorModel {
  /** Service specific error code which serves as the substatus for the HTTP error code. */
  readonly code?: string;
  /** Service specific error type which serves as additional context for the error herein. */
  readonly type?: string;
  /** Description of the error. */
  readonly message?: string;
  /** An array of additional nested error response info objects, as described by this contract. */
  details?: ErrorModel[];
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    code: item["code"],
    type: item["type"],
    message: item["message"],
    details: !item["details"] ? item["details"] : errorArrayDeserializer(item["details"]),
  };
}

export function errorArrayDeserializer(result: Array<ErrorModel>): any[] {
  return result.map((item) => {
    return errorDeserializer(item);
  });
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource): any {
  return item;
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

export function resourceSerializer(item: Resource): any {
  return item;
}

export function resourceDeserializer(item: any): Resource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: CreatedByType;
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: CreatedByType;
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date;
}

export function systemDataDeserializer(item: any): SystemData {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : new Date(item["lastModifiedAt"]),
  };
}

/** The kind of entity that created the resource. */
export enum KnownCreatedByType {
  /** The entity was created by a user. */
  User = "User",
  /** The entity was created by an application. */
  Application = "Application",
  /** The entity was created by a managed identity. */
  ManagedIdentity = "ManagedIdentity",
  /** The entity was created by a key. */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** Solution response. */
export interface SolutionResource extends ExtensionResource {
  /** Solution result */
  properties?: SolutionResourceProperties;
}

export function solutionResourceSerializer(item: SolutionResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : solutionResourcePropertiesSerializer(item["properties"]),
  };
}

export function solutionResourceDeserializer(item: any): SolutionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : solutionResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Solution result */
export interface SolutionResourceProperties {
  /** Solution request trigger criteria */
  triggerCriteria?: TriggerCriterion[];
  /** Client input parameters to run Solution */
  parameters?: Record<string, string>;
  /** Solution Id to identify single solution. */
  readonly solutionId?: string;
  /** Status of solution provisioning. */
  readonly provisioningState?: SolutionProvisioningState;
  /** The title. */
  readonly title?: string;
  /** The HTML content that needs to be rendered and shown to customer. */
  readonly content?: string;
  /** Solution replacement maps. */
  readonly replacementMaps?: ReplacementMaps;
  /** List of section object. */
  readonly sections?: Section[];
}

export function solutionResourcePropertiesSerializer(item: SolutionResourceProperties): any {
  return {
    triggerCriteria: !item["triggerCriteria"]
      ? item["triggerCriteria"]
      : triggerCriterionArraySerializer(item["triggerCriteria"]),
    parameters: item["parameters"],
  };
}

export function solutionResourcePropertiesDeserializer(item: any): SolutionResourceProperties {
  return {
    triggerCriteria: !item["triggerCriteria"]
      ? item["triggerCriteria"]
      : triggerCriterionArrayDeserializer(item["triggerCriteria"]),
    parameters: item["parameters"],
    solutionId: item["solutionId"],
    provisioningState: item["provisioningState"],
    title: item["title"],
    content: item["content"],
    replacementMaps: !item["replacementMaps"]
      ? item["replacementMaps"]
      : replacementMapsDeserializer(item["replacementMaps"]),
    sections: !item["sections"] ? item["sections"] : sectionArrayDeserializer(item["sections"]),
  };
}

export function triggerCriterionArraySerializer(result: Array<TriggerCriterion>): any[] {
  return result.map((item) => {
    return triggerCriterionSerializer(item);
  });
}

export function triggerCriterionArrayDeserializer(result: Array<TriggerCriterion>): any[] {
  return result.map((item) => {
    return triggerCriterionDeserializer(item);
  });
}

/** Solution request trigger criterion. SolutionId/ProblemClassificationId is the only supported trigger type for Solution PUT request. ReplacementKey is the only supported trigger type for Solution PATCH request. */
export interface TriggerCriterion {
  /** Trigger criterion name. */
  name?: Name;
  /** Trigger criterion value. */
  value?: string;
}

export function triggerCriterionSerializer(item: TriggerCriterion): any {
  return { name: item["name"], value: item["value"] };
}

export function triggerCriterionDeserializer(item: any): TriggerCriterion {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Trigger criterion name. */
export enum KnownName {
  SolutionId = "SolutionId",
  ProblemClassificationId = "ProblemClassificationId",
  ReplacementKey = "ReplacementKey",
}

/**
 * Trigger criterion name. \
 * {@link KnownName} can be used interchangeably with Name,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SolutionId** \
 * **ProblemClassificationId** \
 * **ReplacementKey**
 */
export type Name = string;

/** Status of solution provisioning. */
export enum KnownSolutionProvisioningState {
  /** All Solutions in the Batch succeeded. */
  Succeeded = "Succeeded",
  /** Some Solutions are still running or failed. */
  PartialComplete = "PartialComplete",
  /** All Solutions failed to run. */
  Failed = "Failed",
  /** All Solutions are still running. */
  Running = "Running",
  /** When Solutions request gets canceled. */
  Canceled = "Canceled",
}

/**
 * Status of solution provisioning. \
 * {@link KnownSolutionProvisioningState} can be used interchangeably with SolutionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: All Solutions in the Batch succeeded. \
 * **PartialComplete**: Some Solutions are still running or failed. \
 * **Failed**: All Solutions failed to run. \
 * **Running**: All Solutions are still running. \
 * **Canceled**: When Solutions request gets canceled.
 */
export type SolutionProvisioningState = string;

/** Solution replacement maps. */
export interface ReplacementMaps {
  /** Solution AzureKB results */
  webResults?: WebResult[];
  /** Solution diagnostics results. */
  diagnostics?: SolutionsDiagnostic[];
  /** Solutions Troubleshooters */
  troubleshooters?: SolutionsTroubleshooters[];
  /** Solution metrics based charts */
  metricsBasedCharts?: MetricsBasedChart[];
  /** Video solutions, which have the power to engage the customer by stimulating their senses */
  videos?: Video[];
  /** Group of Videos */
  videoGroups?: VideoGroup[];
}

export function replacementMapsDeserializer(item: any): ReplacementMaps {
  return {
    webResults: !item["webResults"]
      ? item["webResults"]
      : webResultArrayDeserializer(item["webResults"]),
    diagnostics: !item["diagnostics"]
      ? item["diagnostics"]
      : solutionsDiagnosticArrayDeserializer(item["diagnostics"]),
    troubleshooters: !item["troubleshooters"]
      ? item["troubleshooters"]
      : solutionsTroubleshootersArrayDeserializer(item["troubleshooters"]),
    metricsBasedCharts: !item["metricsBasedCharts"]
      ? item["metricsBasedCharts"]
      : metricsBasedChartArrayDeserializer(item["metricsBasedCharts"]),
    videos: !item["videos"] ? item["videos"] : videoArrayDeserializer(item["videos"]),
    videoGroups: !item["videoGroups"]
      ? item["videoGroups"]
      : videoGroupArrayDeserializer(item["videoGroups"]),
  };
}

export function webResultArrayDeserializer(result: Array<WebResult>): any[] {
  return result.map((item) => {
    return webResultDeserializer(item);
  });
}

/** AzureKB web result */
export interface WebResult {
  /** Place holder used in HTML Content replace control with the content */
  replacementKey?: string;
  /** AzureKB search results */
  searchResults?: SearchResult[];
}

export function webResultDeserializer(item: any): WebResult {
  return {
    replacementKey: item["replacementKey"],
    searchResults: !item["searchResults"]
      ? item["searchResults"]
      : searchResultArrayDeserializer(item["searchResults"]),
  };
}

export function searchResultArrayDeserializer(result: Array<SearchResult>): any[] {
  return result.map((item) => {
    return searchResultDeserializer(item);
  });
}

/** Details of an AzureKB search result. */
export interface SearchResult {
  /** Unique id of the result. */
  solutionId?: string;
  /** Content of the search result. */
  content?: string;
  /** Title of the search result. */
  title?: string;
  /** Confidence of the search result. */
  confidence?: Confidence;
  /** Source of the search result. */
  source?: string;
  /** Result type of the search result. */
  resultType?: ResultType;
  /** rank of the search result */
  rank?: number;
  /** Link to the document. */
  link?: string;
}

export function searchResultDeserializer(item: any): SearchResult {
  return {
    solutionId: item["solutionId"],
    content: item["content"],
    title: item["title"],
    confidence: item["confidence"],
    source: item["source"],
    resultType: item["resultType"],
    rank: item["rank"],
    link: item["link"],
  };
}

/** Confidence of the search result. */
export enum KnownConfidence {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

/**
 * Confidence of the search result. \
 * {@link KnownConfidence} can be used interchangeably with Confidence,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Low** \
 * **Medium** \
 * **High**
 */
export type Confidence = string;

/** Result type of the search result. */
export enum KnownResultType {
  Community = "Community",
  Documentation = "Documentation",
}

/**
 * Result type of the search result. \
 * {@link KnownResultType} can be used interchangeably with ResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Community** \
 * **Documentation**
 */
export type ResultType = string;

export function solutionsDiagnosticArrayDeserializer(result: Array<SolutionsDiagnostic>): any[] {
  return result.map((item) => {
    return solutionsDiagnosticDeserializer(item);
  });
}

/** Solutions Diagnostic */
export interface SolutionsDiagnostic {
  /** Solution Id to identify single Solutions Diagnostic */
  solutionId?: string;
  /** Denotes the status of the diagnostic resource. */
  status?: Status;
  /** Details of the status */
  statusDetails?: string;
  /** Place holder used in HTML Content replace control with the content */
  replacementKey?: string;
  /** Diagnostics estimated completion time in minutes */
  estimatedCompletionTime?: string;
  /** Required parameters of this item */
  requiredParameters?: string[];
  /** Diagnostic insights */
  insights?: Insight[];
}

export function solutionsDiagnosticDeserializer(item: any): SolutionsDiagnostic {
  return {
    solutionId: item["solutionId"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    replacementKey: item["replacementKey"],
    estimatedCompletionTime: item["estimatedCompletionTime"],
    requiredParameters: !item["requiredParameters"]
      ? item["requiredParameters"]
      : item["requiredParameters"].map((p: any) => {
          return p;
        }),
    insights: !item["insights"] ? item["insights"] : insightArrayDeserializer(item["insights"]),
  };
}

export function solutionsTroubleshootersArrayDeserializer(
  result: Array<SolutionsTroubleshooters>,
): any[] {
  return result.map((item) => {
    return solutionsTroubleshootersDeserializer(item);
  });
}

/** Troubleshooters in Solutions */
export interface SolutionsTroubleshooters {
  /** Solution Id to identify single Solutions Troubleshooter */
  solutionId?: string;
  /** Troubleshooter title */
  title?: string;
  /** Troubleshooter summary */
  summary?: string;
}

export function solutionsTroubleshootersDeserializer(item: any): SolutionsTroubleshooters {
  return {
    solutionId: item["solutionId"],
    title: item["title"],
    summary: item["summary"],
  };
}

export function metricsBasedChartArrayDeserializer(result: Array<MetricsBasedChart>): any[] {
  return result.map((item) => {
    return metricsBasedChartDeserializer(item);
  });
}

/** Solutions metrics based chart */
export interface MetricsBasedChart {
  /** Chart name */
  name?: string;
  /** Allowed values are Sum, Avg, Count, Min, Max. Default is Sum */
  aggregationType?: AggregationType;
  /** Time span duration */
  timeSpanDuration?: string;
  /** Chart title */
  title?: string;
  /** Filter group */
  filterGroup?: FilterGroup;
  /** Place holder used in HTML Content replace control with the content */
  replacementKey?: string;
}

export function metricsBasedChartDeserializer(item: any): MetricsBasedChart {
  return {
    name: item["name"],
    aggregationType: item["aggregationType"],
    timeSpanDuration: item["timeSpanDuration"],
    title: item["title"],
    filterGroup: !item["filterGroup"]
      ? item["filterGroup"]
      : filterGroupDeserializer(item["filterGroup"]),
    replacementKey: item["replacementKey"],
  };
}

/** Allowed values are Sum, Avg, Count, Min, Max. Default is Sum */
export enum KnownAggregationType {
  Sum = "Sum",
  Avg = "Avg",
  Count = "Count",
  Min = "Min",
  Max = "Max",
}

/**
 * Allowed values are Sum, Avg, Count, Min, Max. Default is Sum \
 * {@link KnownAggregationType} can be used interchangeably with AggregationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sum** \
 * **Avg** \
 * **Count** \
 * **Min** \
 * **Max**
 */
export type AggregationType = string;

/** Filter group */
export interface FilterGroup {
  /** List of filters */
  filter?: Filter[];
}

export function filterGroupDeserializer(item: any): FilterGroup {
  return {
    filter: !item["filter"] ? item["filter"] : filterArrayDeserializer(item["filter"]),
  };
}

export function filterArrayDeserializer(result: Array<Filter>): any[] {
  return result.map((item) => {
    return filterDeserializer(item);
  });
}

/** Filter criterion */
export interface Filter {
  /** Filter name */
  name?: string;
  /** Filter values */
  values?: string;
  /** Filter operator */
  operator?: string;
}

export function filterDeserializer(item: any): Filter {
  return {
    name: item["name"],
    values: item["values"],
    operator: item["operator"],
  };
}

export function videoArrayDeserializer(result: Array<Video>): any[] {
  return result.map((item) => {
    return videoDeserializer(item);
  });
}

/** Video detail */
export interface Video extends VideoGroupVideo {
  /** Place holder used in HTML Content replace control with the insight content */
  replacementKey?: string;
}

export function videoDeserializer(item: any): Video {
  return {
    src: item["src"],
    title: item["title"],
    replacementKey: item["replacementKey"],
  };
}

export function videoGroupArrayDeserializer(result: Array<VideoGroup>): any[] {
  return result.map((item) => {
    return videoGroupDeserializer(item);
  });
}

/** Video group detail */
export interface VideoGroup {
  /** List of videos will be shown to customers */
  videos?: VideoGroupVideo[];
  /** Place holder used in HTML Content replace control with the insight content */
  replacementKey?: string;
}

export function videoGroupDeserializer(item: any): VideoGroup {
  return {
    videos: !item["videos"] ? item["videos"] : videoGroupVideoArrayDeserializer(item["videos"]),
    replacementKey: item["replacementKey"],
  };
}

export function videoGroupVideoArrayDeserializer(result: Array<VideoGroupVideo>): any[] {
  return result.map((item) => {
    return videoGroupVideoDeserializer(item);
  });
}

/** VideoGroup video detail */
export interface VideoGroupVideo {
  /** Link to the video */
  src?: string;
  /** Title of the video */
  title?: string;
}

export function videoGroupVideoDeserializer(item: any): VideoGroupVideo {
  return {
    src: item["src"],
    title: item["title"],
  };
}

export function sectionArrayDeserializer(result: Array<Section>): any[] {
  return result.map((item) => {
    return sectionDeserializer(item);
  });
}

/** Part of the solution and are dividers in the solution rendering. */
export interface Section {
  /** Solution sections title. */
  title?: string;
  /** Solution sections content. */
  content?: string;
  /** Solution replacement maps. */
  replacementMaps?: ReplacementMaps;
}

export function sectionDeserializer(item: any): Section {
  return {
    title: item["title"],
    content: item["content"],
    replacementMaps: !item["replacementMaps"]
      ? item["replacementMaps"]
      : replacementMapsDeserializer(item["replacementMaps"]),
  };
}

/** Solution PatchRequest body */
export interface SolutionPatchRequestBody {
  /** Solution result */
  properties?: SolutionResourceProperties;
}

export function solutionPatchRequestBodySerializer(item: SolutionPatchRequestBody): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : solutionResourcePropertiesSerializer(item["properties"]),
  };
}

/** Solution WarmUpRequest body */
export interface SolutionWarmUpRequestBody {
  /** Dictionary of <string> */
  parameters?: Record<string, string>;
}

export function solutionWarmUpRequestBodySerializer(item: SolutionWarmUpRequestBody): any {
  return { parameters: item["parameters"] };
}

/** Simplified Solutions response. */
export interface SimplifiedSolutionsResource extends ExtensionResource {
  /** Simplified Solutions result */
  properties?: SimplifiedSolutionsResourceProperties;
}

export function simplifiedSolutionsResourceSerializer(item: SimplifiedSolutionsResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : simplifiedSolutionsResourcePropertiesSerializer(item["properties"]),
  };
}

export function simplifiedSolutionsResourceDeserializer(item: any): SimplifiedSolutionsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : simplifiedSolutionsResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Simplified Solutions result */
export interface SimplifiedSolutionsResourceProperties {
  /** Solution Id to identify single Simplified Solution. */
  solutionId?: string;
  /** Client input parameters to run Simplified Solutions */
  parameters?: Record<string, string>;
  /** The title. */
  readonly title?: string;
  /** Additional parameter response for Simplified Solutions */
  readonly appendix?: Record<string, string>;
  /** The HTML content that needs to be rendered and shown to customer. */
  readonly content?: string;
  /** Status of Simplified Solution provisioning. */
  readonly provisioningState?: SolutionProvisioningState;
}

export function simplifiedSolutionsResourcePropertiesSerializer(
  item: SimplifiedSolutionsResourceProperties,
): any {
  return { solutionId: item["solutionId"], parameters: item["parameters"] };
}

export function simplifiedSolutionsResourcePropertiesDeserializer(
  item: any,
): SimplifiedSolutionsResourceProperties {
  return {
    solutionId: item["solutionId"],
    parameters: item["parameters"],
    title: item["title"],
    appendix: item["appendix"],
    content: item["content"],
    provisioningState: item["provisioningState"],
  };
}

/** Troubleshooter response. */
export interface TroubleshooterResource extends ExtensionResource {
  /** Troubleshooter Instance properties. */
  properties?: TroubleshooterInstanceProperties;
}

export function troubleshooterResourceSerializer(item: TroubleshooterResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : troubleshooterInstancePropertiesSerializer(item["properties"]),
  };
}

export function troubleshooterResourceDeserializer(item: any): TroubleshooterResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : troubleshooterInstancePropertiesDeserializer(item["properties"]),
  };
}

/** Troubleshooter Instance properties. */
export interface TroubleshooterInstanceProperties {
  /** Solution Id to identify single troubleshooter. */
  solutionId?: string;
  /** Client input parameters to run Troubleshooter Resource */
  parameters?: Record<string, string>;
  /** Status of troubleshooter provisioning. */
  readonly provisioningState?: TroubleshooterProvisioningState;
  /** List of step object. */
  readonly steps?: Step[];
}

export function troubleshooterInstancePropertiesSerializer(
  item: TroubleshooterInstanceProperties,
): any {
  return { solutionId: item["solutionId"], parameters: item["parameters"] };
}

export function troubleshooterInstancePropertiesDeserializer(
  item: any,
): TroubleshooterInstanceProperties {
  return {
    solutionId: item["solutionId"],
    parameters: item["parameters"],
    provisioningState: item["provisioningState"],
    steps: !item["steps"] ? item["steps"] : stepArrayDeserializer(item["steps"]),
  };
}

/** Status of troubleshooter provisioning. */
export enum KnownTroubleshooterProvisioningState {
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Running = "Running",
  AutoContinue = "AutoContinue",
}

/**
 * Status of troubleshooter provisioning. \
 * {@link KnownTroubleshooterProvisioningState} can be used interchangeably with TroubleshooterProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Running** \
 * **AutoContinue**
 */
export type TroubleshooterProvisioningState = string;

export function stepArrayDeserializer(result: Array<Step>): any[] {
  return result.map((item) => {
    return stepDeserializer(item);
  });
}

/** Troubleshooter step */
export interface Step {
  /** Unique step id. */
  id?: string;
  /** Step title. */
  title?: string;
  /** Step description. */
  description?: string;
  /** Get or sets the Step guidance. */
  guidance?: string;
  /** Status of Troubleshooter Step execution. */
  executionStatus?: ExecutionStatus;
  /** This field has more detailed status description of the execution status. */
  executionStatusDescription?: string;
  /** Type of Troubleshooting step. */
  type?: Type;
  /** is this last step of the workflow. */
  isLastStep?: boolean;
  inputs?: StepInput[];
  /** Only for AutomatedStep type */
  automatedCheckResults?: AutomatedCheckResult;
  insights?: Insight[];
  /** The error detail. */
  error?: ErrorDetail;
}

export function stepDeserializer(item: any): Step {
  return {
    id: item["id"],
    title: item["title"],
    description: item["description"],
    guidance: item["guidance"],
    executionStatus: item["executionStatus"],
    executionStatusDescription: item["executionStatusDescription"],
    type: item["type"],
    isLastStep: item["isLastStep"],
    inputs: !item["inputs"] ? item["inputs"] : stepInputArrayDeserializer(item["inputs"]),
    automatedCheckResults: !item["automatedCheckResults"]
      ? item["automatedCheckResults"]
      : automatedCheckResultDeserializer(item["automatedCheckResults"]),
    insights: !item["insights"] ? item["insights"] : insightArrayDeserializer(item["insights"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Status of Troubleshooter Step execution. */
export enum KnownExecutionStatus {
  /** Step execution succeeded. */
  Success = "Success",
  /** Step execution running */
  Running = "Running",
  /** Step execution failed */
  Failed = "Failed",
  /** Step execution warning */
  Warning = "Warning",
}

/**
 * Status of Troubleshooter Step execution. \
 * {@link KnownExecutionStatus} can be used interchangeably with ExecutionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success**: Step execution succeeded. \
 * **Running**: Step execution running \
 * **Failed**: Step execution failed \
 * **Warning**: Step execution warning
 */
export type ExecutionStatus = string;

/** Type of Troubleshooting step. */
export enum KnownType {
  Decision = "Decision",
  Solution = "Solution",
  Insight = "Insight",
  AutomatedCheck = "AutomatedCheck",
  Input = "Input",
}

/**
 * Type of Troubleshooting step. \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Decision** \
 * **Solution** \
 * **Insight** \
 * **AutomatedCheck** \
 * **Input**
 */
export type Type = string;

export function stepInputArrayDeserializer(result: Array<StepInput>): any[] {
  return result.map((item) => {
    return stepInputDeserializer(item);
  });
}

/** Details of step input. */
export interface StepInput {
  /** Use Index as QuestionId. */
  questionId?: string;
  /** Type of Question */
  questionType?: QuestionType;
  /** Question title */
  questionTitle?: string;
  /** User question content. */
  questionContent?: string;
  /** Default is Text. */
  questionContentType?: QuestionContentType;
  /** Place holder text for response hints. */
  responseHint?: string;
  /** Result of Automate step. */
  recommendedOption?: string;
  /** Text of response that was selected. */
  selectedOptionValue?: string;
  /** Troubleshooter step input response validation properties */
  responseValidationProperties?: ResponseValidationProperties;
  responseOptions?: ResponseOption[];
}

export function stepInputDeserializer(item: any): StepInput {
  return {
    questionId: item["questionId"],
    questionType: item["questionType"],
    questionTitle: item["questionTitle"],
    questionContent: item["questionContent"],
    questionContentType: item["questionContentType"],
    responseHint: item["responseHint"],
    recommendedOption: item["recommendedOption"],
    selectedOptionValue: item["selectedOptionValue"],
    responseValidationProperties: !item["responseValidationProperties"]
      ? item["responseValidationProperties"]
      : responseValidationPropertiesDeserializer(item["responseValidationProperties"]),
    responseOptions: !item["responseOptions"]
      ? item["responseOptions"]
      : responseOptionArrayDeserializer(item["responseOptions"]),
  };
}

/** Type of Question */
export enum KnownQuestionType {
  /** SingleChoice radio button */
  RadioButton = "RadioButton",
  /** SingleChoice dropdown. */
  Dropdown = "Dropdown",
  /** Text Input */
  TextInput = "TextInput",
  /** MultiLineInfoBox */
  MultiLineInfoBox = "MultiLineInfoBox",
  /** DateTime Picker */
  DateTimePicker = "DateTimePicker",
  /** Multi Select */
  MultiSelect = "MultiSelect",
}

/**
 * Type of Question \
 * {@link KnownQuestionType} can be used interchangeably with QuestionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RadioButton**: SingleChoice radio button \
 * **Dropdown**: SingleChoice dropdown. \
 * **TextInput**: Text Input \
 * **MultiLineInfoBox**: MultiLineInfoBox \
 * **DateTimePicker**: DateTime Picker \
 * **MultiSelect**: Multi Select
 */
export type QuestionType = string;

/** Default is Text. */
export enum KnownQuestionContentType {
  Text = "Text",
  Html = "Html",
  Markdown = "Markdown",
}

/**
 * Default is Text. \
 * {@link KnownQuestionContentType} can be used interchangeably with QuestionContentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Text** \
 * **Html** \
 * **Markdown**
 */
export type QuestionContentType = string;

/** Troubleshooter step input response validation properties */
export interface ResponseValidationProperties {
  /** Regex used for the input validation. */
  regex?: string;
  /** Validation scope */
  validationScope?: ValidationScope;
  /** Default True */
  isRequired?: boolean;
  /** Validation Error Message. */
  validationErrorMessage?: string;
  /** Max text input (open Ended Text). */
  maxLength?: number;
}

export function responseValidationPropertiesDeserializer(item: any): ResponseValidationProperties {
  return {
    regex: item["regex"],
    validationScope: item["validationScope"],
    isRequired: item["isRequired"],
    validationErrorMessage: item["validationErrorMessage"],
    maxLength: item["maxLength"],
  };
}

/** Validation scope */
export enum KnownValidationScope {
  None = "None",
  URLFormat = "URLFormat",
  GuidFormat = "GuidFormat",
  IpAddressFormat = "IpAddressFormat",
  NumberOnlyFormat = "NumberOnlyFormat",
}

/**
 * Validation scope \
 * {@link KnownValidationScope} can be used interchangeably with ValidationScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **URLFormat** \
 * **GuidFormat** \
 * **IpAddressFormat** \
 * **NumberOnlyFormat**
 */
export type ValidationScope = string;

export function responseOptionArrayDeserializer(result: Array<ResponseOption>): any[] {
  return result.map((item) => {
    return responseOptionDeserializer(item);
  });
}

/** The status of the resource. */
export interface ResponseOption {
  /** Unique string. */
  key?: string;
  /** Option description */
  value?: string;
}

export function responseOptionDeserializer(item: any): ResponseOption {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Only for AutomatedStep type */
export interface AutomatedCheckResult {
  /** Version for automated check result */
  version?: string;
  /** Status for automated check result */
  status?: string;
  /** Insight Article Content */
  result?: string;
  /** Type of Result. */
  type?: AutomatedCheckResultType;
}

export function automatedCheckResultDeserializer(item: any): AutomatedCheckResult {
  return {
    version: item["version"],
    status: item["status"],
    result: item["result"],
    type: item["type"],
  };
}

/** Type of Result. */
export enum KnownAutomatedCheckResultType {
  Success = "Success",
  Warning = "Warning",
  Error = "Error",
  Information = "Information",
}

/**
 * Type of Result. \
 * {@link KnownAutomatedCheckResultType} can be used interchangeably with AutomatedCheckResultType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Success** \
 * **Warning** \
 * **Error** \
 * **Information**
 */
export type AutomatedCheckResultType = string;

/** Troubleshooter ContinueRequest body. */
export interface ContinueRequestBody {
  /** Unique id of the result. */
  stepId?: string;
  responses?: TroubleshooterResponse[];
}

export function continueRequestBodySerializer(item: ContinueRequestBody): any {
  return {
    stepId: item["stepId"],
    responses: !item["responses"]
      ? item["responses"]
      : troubleshooterResponseArraySerializer(item["responses"]),
  };
}

export function troubleshooterResponseArraySerializer(
  result: Array<TroubleshooterResponse>,
): any[] {
  return result.map((item) => {
    return troubleshooterResponseSerializer(item);
  });
}

/** User Response for Troubleshooter continue request */
export interface TroubleshooterResponse {
  /** id of the question. */
  questionId?: string;
  /** Type of Question */
  questionType?: QuestionType;
  /** Response key for SingleInput. For Multi-line test/open ended question it is free form text */
  response?: string;
}

export function troubleshooterResponseSerializer(item: TroubleshooterResponse): any {
  return {
    questionId: item["questionId"],
    questionType: item["questionType"],
    response: item["response"],
  };
}

/** Troubleshooter restart response */
export interface RestartTroubleshooterResponse {
  /** Updated TroubleshooterResource Name . */
  readonly troubleshooterResourceName?: string;
}

export function restartTroubleshooterResponseDeserializer(
  item: any,
): RestartTroubleshooterResponse {
  return {
    troubleshooterResourceName: item["troubleshooterResourceName"],
  };
}

/** Self Help Solution response. */
export interface SolutionResourceSelfHelp extends ProxyResource {
  /** Solution result */
  properties?: SolutionsResourcePropertiesSelfHelp;
}

export function solutionResourceSelfHelpDeserializer(item: any): SolutionResourceSelfHelp {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : solutionsResourcePropertiesSelfHelpDeserializer(item["properties"]),
  };
}

/** Solution result */
export interface SolutionsResourcePropertiesSelfHelp {
  /** SolutionId is a unique id to identify a solution. You can retrieve the solution id using the Discovery api - https://learn.microsoft.com/en-us/rest/api/help/discovery-solution/list?view=rest-help-2023-09-01-preview&tabs=HTTP */
  readonly solutionId?: string;
  /** The title. */
  readonly title?: string;
  /** The HTML content that needs to be rendered and shown to customer. */
  readonly content?: string;
  /** Solution replacement maps. */
  readonly replacementMaps?: ReplacementMapsSelfHelp;
  /** List of section object. */
  readonly sections?: SectionSelfHelp[];
}

export function solutionsResourcePropertiesSelfHelpDeserializer(
  item: any,
): SolutionsResourcePropertiesSelfHelp {
  return {
    solutionId: item["solutionId"],
    title: item["title"],
    content: item["content"],
    replacementMaps: !item["replacementMaps"]
      ? item["replacementMaps"]
      : replacementMapsSelfHelpDeserializer(item["replacementMaps"]),
    sections: !item["sections"]
      ? item["sections"]
      : sectionSelfHelpArrayDeserializer(item["sections"]),
  };
}

/** Solution replacement maps. */
export interface ReplacementMapsSelfHelp {
  /** Solution AzureKB results */
  webResults?: WebResult[];
  /** Video solutions, which have the power to engage the customer by stimulating their senses */
  videos?: Video[];
  /** Group of Videos */
  videoGroups?: VideoGroup[];
}

export function replacementMapsSelfHelpDeserializer(item: any): ReplacementMapsSelfHelp {
  return {
    webResults: !item["webResults"]
      ? item["webResults"]
      : webResultArrayDeserializer(item["webResults"]),
    videos: !item["videos"] ? item["videos"] : videoArrayDeserializer(item["videos"]),
    videoGroups: !item["videoGroups"]
      ? item["videoGroups"]
      : videoGroupArrayDeserializer(item["videoGroups"]),
  };
}

export function sectionSelfHelpArrayDeserializer(result: Array<SectionSelfHelp>): any[] {
  return result.map((item) => {
    return sectionSelfHelpDeserializer(item);
  });
}

/** Part of the solution and are dividers in the solution rendering. */
export interface SectionSelfHelp {
  /** Solution sections title. */
  title?: string;
  /** Solution sections content. */
  content?: string;
  /** Solution replacement maps. */
  replacementMaps?: ReplacementMapsSelfHelp;
}

export function sectionSelfHelpDeserializer(item: any): SectionSelfHelp {
  return {
    title: item["title"],
    content: item["content"],
    replacementMaps: !item["replacementMaps"]
      ? item["replacementMaps"]
      : replacementMapsSelfHelpDeserializer(item["replacementMaps"]),
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The check availability request body. */
export interface CheckNameAvailabilityRequest {
  /** The name of the resource for which availability needs to be checked. */
  name?: string;
  /** The resource type. */
  type?: string;
}

export function checkNameAvailabilityRequestSerializer(item: CheckNameAvailabilityRequest): any {
  return { name: item["name"], type: item["type"] };
}

/** Response for whether the requested resource name is available or not. */
export interface CheckNameAvailabilityResponse {
  /** Returns true or false depending on the availability of the name */
  nameAvailable?: boolean;
  /** Reason for why value is not available. This field is returned if nameAvailable is false. */
  reason?: string;
  /** Gets an error message explaining the 'reason' value with more details. This field is returned iif nameAvailable is false. */
  message?: string;
}

export function checkNameAvailabilityResponseDeserializer(
  item: any,
): CheckNameAvailabilityResponse {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Discovery response. */
export interface _DiscoveryResponse {
  /** The SolutionMetadataResource items on this page */
  value: SolutionMetadataResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _discoveryResponseDeserializer(item: any): _DiscoveryResponse {
  return {
    value: solutionMetadataResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function solutionMetadataResourceArrayDeserializer(
  result: Array<SolutionMetadataResource>,
): any[] {
  return result.map((item) => {
    return solutionMetadataResourceDeserializer(item);
  });
}

/** Metadata resource */
export interface SolutionMetadataResource extends ProxyResource {
  /** Solution metadata Resource properties. */
  properties?: Solutions;
}

export function solutionMetadataResourceDeserializer(item: any): SolutionMetadataResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : solutionsDeserializer(item["properties"]),
  };
}

/** List of solutions */
export interface Solutions {
  /** List of metadata. */
  solutions?: SolutionMetadataProperties[];
}

export function solutionsDeserializer(item: any): Solutions {
  return {
    solutions: !item["solutions"]
      ? item["solutions"]
      : solutionMetadataPropertiesArrayDeserializer(item["solutions"]),
  };
}

export function solutionMetadataPropertiesArrayDeserializer(
  result: Array<SolutionMetadataProperties>,
): any[] {
  return result.map((item) => {
    return solutionMetadataPropertiesDeserializer(item);
  });
}

/** Metadata Properties */
export interface SolutionMetadataProperties {
  /** Solution Id. */
  solutionId?: string;
  /** Solution Type. */
  readonly solutionType?: SolutionType;
  /** A detailed description of solution. */
  readonly description?: string;
  /** Required parameters for invoking this particular solution. */
  readonly requiredInputs?: string[];
}

export function solutionMetadataPropertiesDeserializer(item: any): SolutionMetadataProperties {
  return {
    solutionId: item["solutionId"],
    solutionType: item["solutionType"],
    description: item["description"],
    requiredInputs: !item["requiredInputs"]
      ? item["requiredInputs"]
      : item["requiredInputs"].map((p: any) => {
          return p;
        }),
  };
}

/** Solution Type. */
export enum KnownSolutionType {
  /** Diagnostics resource type. */
  Diagnostics = "Diagnostics",
  /** Solutions resource type. */
  Solutions = "Solutions",
  /** Troubleshooters resource type. */
  Troubleshooters = "Troubleshooters",
  /** SelfHelp resource type. */
  SelfHelp = "SelfHelp",
}

/**
 * Solution Type. \
 * {@link KnownSolutionType} can be used interchangeably with SolutionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Diagnostics**: Diagnostics resource type. \
 * **Solutions**: Solutions resource type. \
 * **Troubleshooters**: Troubleshooters resource type. \
 * **SelfHelp**: SelfHelp resource type.
 */
export type SolutionType = string;

/** Discover NLP request. */
export interface DiscoveryNlpRequest {
  /** Natural language description of the issue. */
  issueSummary: string;
  /** ARM resource Id of the resource that is having the issue. Only applicable for Discovery Solution NLP Subscription Scope. */
  resourceId?: string;
  /** ARM service Id of the service that is having the issue. For more information on service Id see https://learn.microsoft.com/rest/api/support/services/list?tabs=HTTP. */
  serviceId?: string;
  /** Additional information in the form of a string. */
  additionalContext?: string;
}

export function discoveryNlpRequestSerializer(item: DiscoveryNlpRequest): any {
  return {
    issueSummary: item["issueSummary"],
    resourceId: item["resourceId"],
    serviceId: item["serviceId"],
    additionalContext: item["additionalContext"],
  };
}

/** Successfully fetched list of solution metadata. */
export interface DiscoveryNlpResponse {
  /** The list of solution metadata. */
  value?: SolutionNlpMetadataResource[];
}

export function discoveryNlpResponseDeserializer(item: any): DiscoveryNlpResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : solutionNlpMetadataResourceArrayDeserializer(item["value"]),
  };
}

export function solutionNlpMetadataResourceArrayDeserializer(
  result: Array<SolutionNlpMetadataResource>,
): any[] {
  return result.map((item) => {
    return solutionNlpMetadataResourceDeserializer(item);
  });
}

/** Nlp Metadata resource */
export interface SolutionNlpMetadataResource extends ProxyResource {
  /** Solution metadata Resource properties. */
  properties?: NlpSolutions;
}

export function solutionNlpMetadataResourceDeserializer(item: any): SolutionNlpMetadataResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : nlpSolutionsDeserializer(item["properties"]),
  };
}

/** Nlp metadata. */
export interface NlpSolutions {
  /** Title of the problem classification. */
  problemTitle?: string;
  /** Description of the problem classification. */
  problemDescription?: string;
  /** Id of the service (https://learn.microsoft.com/en-us/rest/api/support/services?view=rest-support-2020-04-01) that may be used to create a support ticket. */
  serviceId?: string;
  /** Id of the ProblemClassification (https://learn.microsoft.com/en-us/rest/api/support/problem-classifications?view=rest-support-2020-04-01) that may be used to create a support ticket. */
  problemClassificationId?: string;
  /** The list of solution metadata. */
  solutions?: SolutionMetadataProperties[];
  /** The set of services that are most likely related to the request. If relatedServices is included in the response then solutions may not be discovered until the client calls a second time specifying one of the service Ids in the relatedServices object. */
  relatedServices?: ClassificationService[];
}

export function nlpSolutionsDeserializer(item: any): NlpSolutions {
  return {
    problemTitle: item["problemTitle"],
    problemDescription: item["problemDescription"],
    serviceId: item["serviceId"],
    problemClassificationId: item["problemClassificationId"],
    solutions: !item["solutions"]
      ? item["solutions"]
      : solutionMetadataPropertiesArrayDeserializer(item["solutions"]),
    relatedServices: !item["relatedServices"]
      ? item["relatedServices"]
      : classificationServiceArrayDeserializer(item["relatedServices"]),
  };
}

export function classificationServiceArrayDeserializer(
  result: Array<ClassificationService>,
): any[] {
  return result.map((item) => {
    return classificationServiceDeserializer(item);
  });
}

/** Service Classification result object. */
export interface ClassificationService {
  /** Azure resource Id of the service. */
  readonly serviceId?: string;
  /** Localized name of the azure service. */
  readonly displayName?: string;
  /** List of applicable ARM resource types for this service. */
  resourceTypes?: string[];
}

export function classificationServiceDeserializer(item: any): ClassificationService {
  return {
    serviceId: item["serviceId"],
    displayName: item["displayName"],
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-03-01-preview API version. */
  V20240301Preview = "2024-03-01-preview",
}
