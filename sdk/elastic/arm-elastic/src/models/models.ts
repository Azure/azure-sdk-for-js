// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents a paginated list of operations. */
export interface _OperationListResult {
  /** The list of operations. */
  value: OperationResult[];
  /** The URL to get the next set of results, if any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationResultArrayDeserializer(result: Array<OperationResult>): any[] {
  return result.map((item) => {
    return operationResultDeserializer(item);
  });
}

/** A Microsoft.Elastic REST API operation. */
export interface OperationResult {
  /** Operation name, i.e., {provider}/{resource}/{operation}. */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The object that represents the operation. */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
  };
}

/** Represents the display information for an operation. */
export interface OperationDisplay {
  /** The service provider of the operation. */
  provider?: string;
  /** The resource type of the operation. */
  resource?: string;
  /** The name of the operation. */
  operation?: string;
  /** A description of the operation. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** RP default error response. */
export interface ResourceProviderDefaultErrorResponse {
  /** Response body of Error */
  readonly error?: ErrorResponseBody;
}

export function resourceProviderDefaultErrorResponseDeserializer(
  item: any,
): ResourceProviderDefaultErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
  };
}

/** Error response body. */
export interface ErrorResponseBody {
  /** Error code. */
  code?: string;
  /** Error message. */
  message?: string;
  /** Error target. */
  target?: string;
  /** Error details. */
  details?: ErrorResponseBody[];
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : errorResponseBodyArrayDeserializer(item["details"]),
  };
}

export function errorResponseBodyArrayDeserializer(result: Array<ErrorResponseBody>): any[] {
  return result.map((item) => {
    return errorResponseBodyDeserializer(item);
  });
}

/** The request to update subscriptions needed to be monitored by the Elastic monitor resource. */
export interface MonitoredSubscriptionProperties extends ProxyResource {
  /** The request to update subscriptions needed to be monitored by the Elastic monitor resource. */
  properties?: SubscriptionList;
}

export function monitoredSubscriptionPropertiesSerializer(
  item: MonitoredSubscriptionProperties,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionListSerializer(item["properties"]),
  };
}

export function monitoredSubscriptionPropertiesDeserializer(
  item: any,
): MonitoredSubscriptionProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : subscriptionListDeserializer(item["properties"]),
  };
}

/** The request to update subscriptions needed to be monitored by the Elastic monitor resource. */
export interface SubscriptionList {
  /** The operation for the patch on the resource. */
  operation?: Operation;
  /** List of subscriptions and the state of the monitoring. */
  monitoredSubscriptionList?: MonitoredSubscription[];
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function subscriptionListSerializer(item: SubscriptionList): any {
  return {
    operation: item["operation"],
    monitoredSubscriptionList: !item["monitoredSubscriptionList"]
      ? item["monitoredSubscriptionList"]
      : monitoredSubscriptionArraySerializer(item["monitoredSubscriptionList"]),
  };
}

export function subscriptionListDeserializer(item: any): SubscriptionList {
  return {
    operation: item["operation"],
    monitoredSubscriptionList: !item["monitoredSubscriptionList"]
      ? item["monitoredSubscriptionList"]
      : monitoredSubscriptionArrayDeserializer(item["monitoredSubscriptionList"]),
    provisioningState: item["provisioningState"],
  };
}

/** The operation for the patch on the resource. */
export enum KnownOperation {
  AddBegin = "AddBegin",
  AddComplete = "AddComplete",
  DeleteBegin = "DeleteBegin",
  DeleteComplete = "DeleteComplete",
  Active = "Active",
}

/**
 * The operation for the patch on the resource. \
 * {@link KnownOperation} can be used interchangeably with Operation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AddBegin** \
 * **AddComplete** \
 * **DeleteBegin** \
 * **DeleteComplete** \
 * **Active**
 */
export type Operation = string;

export function monitoredSubscriptionArraySerializer(result: Array<MonitoredSubscription>): any[] {
  return result.map((item) => {
    return monitoredSubscriptionSerializer(item);
  });
}

export function monitoredSubscriptionArrayDeserializer(
  result: Array<MonitoredSubscription>,
): any[] {
  return result.map((item) => {
    return monitoredSubscriptionDeserializer(item);
  });
}

/** The list of subscriptions and it's monitoring status by current Elastic monitor. */
export interface MonitoredSubscription {
  /** The subscriptionId to be monitored. */
  subscriptionId: string;
  /** The state of monitoring. */
  status?: Status;
  /** The reason of not monitoring the subscription. */
  error?: string;
  /** Definition of the properties for a TagRules resource. */
  tagRules?: MonitoringTagRulesProperties;
}

export function monitoredSubscriptionSerializer(item: MonitoredSubscription): any {
  return {
    subscriptionId: item["subscriptionId"],
    status: item["status"],
    error: item["error"],
    tagRules: !item["tagRules"]
      ? item["tagRules"]
      : monitoringTagRulesPropertiesSerializer(item["tagRules"]),
  };
}

export function monitoredSubscriptionDeserializer(item: any): MonitoredSubscription {
  return {
    subscriptionId: item["subscriptionId"],
    status: item["status"],
    error: item["error"],
    tagRules: !item["tagRules"]
      ? item["tagRules"]
      : monitoringTagRulesPropertiesDeserializer(item["tagRules"]),
  };
}

/** The state of monitoring. */
export enum KnownStatus {
  InProgress = "InProgress",
  Active = "Active",
  Failed = "Failed",
  Deleting = "Deleting",
}

/**
 * The state of monitoring. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Active** \
 * **Failed** \
 * **Deleting**
 */
export type Status = string;

/** Definition of the properties for a TagRules resource. */
export interface MonitoringTagRulesProperties {
  /** Provisioning state of the monitoring tag rules. */
  readonly provisioningState?: ProvisioningState;
  /** Rules for sending logs. */
  logRules?: LogRules;
}

export function monitoringTagRulesPropertiesSerializer(item: MonitoringTagRulesProperties): any {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesSerializer(item["logRules"]),
  };
}

export function monitoringTagRulesPropertiesDeserializer(item: any): MonitoringTagRulesProperties {
  return {
    provisioningState: item["provisioningState"],
    logRules: !item["logRules"] ? item["logRules"] : logRulesDeserializer(item["logRules"]),
  };
}

/** Provisioning state of Elastic resource. */
export enum KnownProvisioningState {
  Accepted = "Accepted",
  Creating = "Creating",
  Updating = "Updating",
  Deleting = "Deleting",
  Succeeded = "Succeeded",
  Failed = "Failed",
  Canceled = "Canceled",
  Deleted = "Deleted",
  NotSpecified = "NotSpecified",
}

/**
 * Provisioning state of Elastic resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Deleted** \
 * **NotSpecified**
 */
export type ProvisioningState = string;

/** Set of rules for sending logs for the Monitor resource. */
export interface LogRules {
  /** Flag specifying if AAD logs should be sent for the Monitor resource. */
  sendAadLogs?: boolean;
  /** Flag specifying if subscription logs should be sent for the Monitor resource. */
  sendSubscriptionLogs?: boolean;
  /** Flag specifying if activity logs from Azure resources should be sent for the Monitor resource. */
  sendActivityLogs?: boolean;
  /** List of filtering tags to be used for capturing logs. This only takes effect if SendActivityLogs flag is enabled. If empty, all resources will be captured. If only Exclude action is specified, the rules will apply to the list of all available resources. If Include actions are specified, the rules will only include resources with the associated tags. */
  filteringTags?: FilteringTag[];
}

export function logRulesSerializer(item: LogRules): any {
  return {
    sendAadLogs: item["sendAadLogs"],
    sendSubscriptionLogs: item["sendSubscriptionLogs"],
    sendActivityLogs: item["sendActivityLogs"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArraySerializer(item["filteringTags"]),
  };
}

export function logRulesDeserializer(item: any): LogRules {
  return {
    sendAadLogs: item["sendAadLogs"],
    sendSubscriptionLogs: item["sendSubscriptionLogs"],
    sendActivityLogs: item["sendActivityLogs"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArrayDeserializer(item["filteringTags"]),
  };
}

export function filteringTagArraySerializer(result: Array<FilteringTag>): any[] {
  return result.map((item) => {
    return filteringTagSerializer(item);
  });
}

export function filteringTagArrayDeserializer(result: Array<FilteringTag>): any[] {
  return result.map((item) => {
    return filteringTagDeserializer(item);
  });
}

/** The definition of a filtering tag. Filtering tags are used for capturing resources and include/exclude them from being monitored. */
export interface FilteringTag {
  /** The name (also known as the key) of the tag. */
  name?: string;
  /** The value of the tag. */
  value?: string;
  /** Valid actions for a filtering tag. */
  action?: TagAction;
}

export function filteringTagSerializer(item: FilteringTag): any {
  return { name: item["name"], value: item["value"], action: item["action"] };
}

export function filteringTagDeserializer(item: any): FilteringTag {
  return {
    name: item["name"],
    value: item["value"],
    action: item["action"],
  };
}

/** Valid actions for a filtering tag. Exclusion takes priority over inclusion. */
export enum KnownTagAction {
  Include = "Include",
  Exclude = "Exclude",
}

/**
 * Valid actions for a filtering tag. Exclusion takes priority over inclusion. \
 * {@link KnownTagAction} can be used interchangeably with TagAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Include** \
 * **Exclude**
 */
export type TagAction = string;

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(item: ProxyResource): any {
  return item;
}

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
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

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

/** Paged collection of MonitoredSubscriptionProperties items */
export interface _MonitoredSubscriptionPropertiesList {
  /** The MonitoredSubscriptionProperties items on this page */
  value: MonitoredSubscriptionProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _monitoredSubscriptionPropertiesListDeserializer(
  item: any,
): _MonitoredSubscriptionPropertiesList {
  return {
    value: monitoredSubscriptionPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function monitoredSubscriptionPropertiesArraySerializer(
  result: Array<MonitoredSubscriptionProperties>,
): any[] {
  return result.map((item) => {
    return monitoredSubscriptionPropertiesSerializer(item);
  });
}

export function monitoredSubscriptionPropertiesArrayDeserializer(
  result: Array<MonitoredSubscriptionProperties>,
): any[] {
  return result.map((item) => {
    return monitoredSubscriptionPropertiesDeserializer(item);
  });
}

/** Capture logs and metrics of Azure resources based on ARM tags. */
export interface MonitoringTagRules extends ProxyResource {
  /** Properties of the monitoring tag rules. */
  properties?: MonitoringTagRulesProperties;
}

export function monitoringTagRulesSerializer(item: MonitoringTagRules): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : monitoringTagRulesPropertiesSerializer(item["properties"]),
  };
}

export function monitoringTagRulesDeserializer(item: any): MonitoringTagRules {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : monitoringTagRulesPropertiesDeserializer(item["properties"]),
  };
}

/** Response of a list operation. */
export interface _MonitoringTagRulesListResponse {
  /** The MonitoringTagRules items on this page */
  value: MonitoringTagRules[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _monitoringTagRulesListResponseDeserializer(
  item: any,
): _MonitoringTagRulesListResponse {
  return {
    value: monitoringTagRulesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function monitoringTagRulesArraySerializer(result: Array<MonitoringTagRules>): any[] {
  return result.map((item) => {
    return monitoringTagRulesSerializer(item);
  });
}

export function monitoringTagRulesArrayDeserializer(result: Array<MonitoringTagRules>): any[] {
  return result.map((item) => {
    return monitoringTagRulesDeserializer(item);
  });
}

/** Monitor resource. */
export interface ElasticMonitorResource extends TrackedResource {
  /** Properties of the monitor resource. */
  properties?: MonitorProperties;
  /** The kind of the Elastic resource - observability, security, search etc. */
  kind?: string;
  /** SKU of the monitor resource. */
  sku?: ResourceSku;
  /** Identity properties of the monitor resource. */
  identity?: IdentityProperties;
}

export function elasticMonitorResourceSerializer(item: ElasticMonitorResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : monitorPropertiesSerializer(item["properties"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function elasticMonitorResourceDeserializer(item: any): ElasticMonitorResource {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : monitorPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** Properties specific to the monitor resource. */
export interface MonitorProperties {
  /** Provisioning state of the monitor resource. */
  readonly provisioningState?: ProvisioningState;
  /** Flag specifying if the resource monitoring is enabled or disabled. */
  monitoringStatus?: MonitoringStatus;
  /** Elastic cloud properties. */
  elasticProperties?: ElasticProperties;
  /** User information. */
  userInfo?: UserInfo;
  /** Plan details of the monitor resource. */
  planDetails?: PlanDetails;
  /** Version of elastic of the monitor resource */
  version?: string;
  /** State of the Azure Subscription containing the monitor resource */
  subscriptionState?: string;
  /** Status of Azure Subscription where Marketplace SaaS is located. */
  saaSAzureSubscriptionStatus?: string;
  /** Name of the marketing campaign. */
  sourceCampaignName?: string;
  /** A unique identifier associated with the campaign. */
  sourceCampaignId?: string;
  readonly liftrResourceCategory?: LiftrResourceCategories;
  /** The priority of the resource. */
  readonly liftrResourcePreference?: number;
  /** Flag to determine if User API Key has to be generated and shared. */
  generateApiKey?: boolean;
  /** Hosting type of the monitor resource - either Hosted deployments OR Serverless Projects. */
  hostingType?: HostingType;
  /** Project details of the monitor resource IF it belongs to Serverless offer kind. */
  projectDetails?: ProjectDetails;
}

export function monitorPropertiesSerializer(item: MonitorProperties): any {
  return {
    monitoringStatus: item["monitoringStatus"],
    elasticProperties: !item["elasticProperties"]
      ? item["elasticProperties"]
      : elasticPropertiesSerializer(item["elasticProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planDetails: !item["planDetails"]
      ? item["planDetails"]
      : planDetailsSerializer(item["planDetails"]),
    version: item["version"],
    subscriptionState: item["subscriptionState"],
    saaSAzureSubscriptionStatus: item["saaSAzureSubscriptionStatus"],
    sourceCampaignName: item["sourceCampaignName"],
    sourceCampaignId: item["sourceCampaignId"],
    generateApiKey: item["generateApiKey"],
    hostingType: item["hostingType"],
    projectDetails: !item["projectDetails"]
      ? item["projectDetails"]
      : projectDetailsSerializer(item["projectDetails"]),
  };
}

export function monitorPropertiesDeserializer(item: any): MonitorProperties {
  return {
    provisioningState: item["provisioningState"],
    monitoringStatus: item["monitoringStatus"],
    elasticProperties: !item["elasticProperties"]
      ? item["elasticProperties"]
      : elasticPropertiesDeserializer(item["elasticProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoDeserializer(item["userInfo"]),
    planDetails: !item["planDetails"]
      ? item["planDetails"]
      : planDetailsDeserializer(item["planDetails"]),
    version: item["version"],
    subscriptionState: item["subscriptionState"],
    saaSAzureSubscriptionStatus: item["saaSAzureSubscriptionStatus"],
    sourceCampaignName: item["sourceCampaignName"],
    sourceCampaignId: item["sourceCampaignId"],
    liftrResourceCategory: item["liftrResourceCategory"],
    liftrResourcePreference: item["liftrResourcePreference"],
    generateApiKey: item["generateApiKey"],
    hostingType: item["hostingType"],
    projectDetails: !item["projectDetails"]
      ? item["projectDetails"]
      : projectDetailsDeserializer(item["projectDetails"]),
  };
}

/** Flag specifying if the resource monitoring is enabled or disabled. */
export enum KnownMonitoringStatus {
  Enabled = "Enabled",
  Disabled = "Disabled",
}

/**
 * Flag specifying if the resource monitoring is enabled or disabled. \
 * {@link KnownMonitoringStatus} can be used interchangeably with MonitoringStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type MonitoringStatus = string;

/** Elastic Resource Properties. */
export interface ElasticProperties {
  /** Details of the user's elastic account. */
  elasticCloudUser?: ElasticCloudUser;
  /** Details of the elastic cloud deployment. */
  elasticCloudDeployment?: ElasticCloudDeployment;
}

export function elasticPropertiesSerializer(item: ElasticProperties): any {
  return {
    elasticCloudUser: !item["elasticCloudUser"]
      ? item["elasticCloudUser"]
      : elasticCloudUserSerializer(item["elasticCloudUser"]),
    elasticCloudDeployment: !item["elasticCloudDeployment"]
      ? item["elasticCloudDeployment"]
      : elasticCloudDeploymentSerializer(item["elasticCloudDeployment"]),
  };
}

export function elasticPropertiesDeserializer(item: any): ElasticProperties {
  return {
    elasticCloudUser: !item["elasticCloudUser"]
      ? item["elasticCloudUser"]
      : elasticCloudUserDeserializer(item["elasticCloudUser"]),
    elasticCloudDeployment: !item["elasticCloudDeployment"]
      ? item["elasticCloudDeployment"]
      : elasticCloudDeploymentDeserializer(item["elasticCloudDeployment"]),
  };
}

/** Details of the user's elastic account. */
export interface ElasticCloudUser {
  /** Email of the Elastic User Account. */
  readonly emailAddress?: string;
  /** User Id of the elastic account of the User. */
  readonly id?: string;
  /** Elastic cloud default dashboard sso URL of the Elastic user account. */
  readonly elasticCloudSsoDefaultUrl?: string;
}

export function elasticCloudUserSerializer(item: ElasticCloudUser): any {
  return item;
}

export function elasticCloudUserDeserializer(item: any): ElasticCloudUser {
  return {
    emailAddress: item["emailAddress"],
    id: item["id"],
    elasticCloudSsoDefaultUrl: item["elasticCloudSsoDefaultUrl"],
  };
}

/** Details of the user's elastic deployment associated with the monitor resource. */
export interface ElasticCloudDeployment {
  /** Elastic deployment name */
  readonly name?: string;
  /** Elastic deployment Id */
  readonly deploymentId?: string;
  /** Associated Azure subscription Id for the elastic deployment. */
  readonly azureSubscriptionId?: string;
  /** Region where Deployment at Elastic side took place. */
  readonly elasticsearchRegion?: string;
  /** Elasticsearch ingestion endpoint of the Elastic deployment. */
  readonly elasticsearchServiceUrl?: string;
  /** Kibana endpoint of the Elastic deployment. */
  readonly kibanaServiceUrl?: string;
  /** Kibana dashboard sso URL of the Elastic deployment. */
  readonly kibanaSsoUrl?: string;
}

export function elasticCloudDeploymentSerializer(item: ElasticCloudDeployment): any {
  return item;
}

export function elasticCloudDeploymentDeserializer(item: any): ElasticCloudDeployment {
  return {
    name: item["name"],
    deploymentId: item["deploymentId"],
    azureSubscriptionId: item["azureSubscriptionId"],
    elasticsearchRegion: item["elasticsearchRegion"],
    elasticsearchServiceUrl: item["elasticsearchServiceUrl"],
    kibanaServiceUrl: item["kibanaServiceUrl"],
    kibanaSsoUrl: item["kibanaSsoUrl"],
  };
}

/** User Information to be passed to partners. */
export interface UserInfo {
  /** First name of the user */
  firstName?: string;
  /** Last name of the user */
  lastName?: string;
  /** Company name of the user */
  companyName?: string;
  /** Email of the user used by Elastic for contacting them if needed */
  emailAddress?: string;
  /** Company information of the user to be passed to partners. */
  companyInfo?: CompanyInfo;
}

export function userInfoSerializer(item: UserInfo): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    companyName: item["companyName"],
    emailAddress: item["emailAddress"],
    companyInfo: !item["companyInfo"]
      ? item["companyInfo"]
      : companyInfoSerializer(item["companyInfo"]),
  };
}

export function userInfoDeserializer(item: any): UserInfo {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    companyName: item["companyName"],
    emailAddress: item["emailAddress"],
    companyInfo: !item["companyInfo"]
      ? item["companyInfo"]
      : companyInfoDeserializer(item["companyInfo"]),
  };
}

/** Company information of the user to be passed to partners. */
export interface CompanyInfo {
  /** Domain of the company */
  domain?: string;
  /** Business of the company */
  business?: string;
  /** Number of employees in the company */
  employeesNumber?: string;
  /** State of the company location. */
  state?: string;
  /** Country of the company location. */
  country?: string;
}

export function companyInfoSerializer(item: CompanyInfo): any {
  return {
    domain: item["domain"],
    business: item["business"],
    employeesNumber: item["employeesNumber"],
    state: item["state"],
    country: item["country"],
  };
}

export function companyInfoDeserializer(item: any): CompanyInfo {
  return {
    domain: item["domain"],
    business: item["business"],
    employeesNumber: item["employeesNumber"],
    state: item["state"],
    country: item["country"],
  };
}

/** Plan details of the monitor resource. */
export interface PlanDetails {
  /** Offer ID of the plan */
  offerID?: string;
  /** Publisher ID of the plan */
  publisherID?: string;
  /** Term ID of the plan */
  termID?: string;
  /** Plan ID */
  planID?: string;
  /** Plan Name */
  planName?: string;
}

export function planDetailsSerializer(item: PlanDetails): any {
  return {
    offerID: item["offerID"],
    publisherID: item["publisherID"],
    termID: item["termID"],
    planID: item["planID"],
    planName: item["planName"],
  };
}

export function planDetailsDeserializer(item: any): PlanDetails {
  return {
    offerID: item["offerID"],
    publisherID: item["publisherID"],
    termID: item["termID"],
    planID: item["planID"],
    planName: item["planName"],
  };
}

/** Known values of {@link LiftrResourceCategories} that the service accepts. */
export enum KnownLiftrResourceCategories {
  Unknown = "Unknown",
  MonitorLogs = "MonitorLogs",
}

/** Type of LiftrResourceCategories */
export type LiftrResourceCategories = string;

/** Hosting type of the monitor resource - either Hosted deployments or Serverless Projects. */
export enum KnownHostingType {
  Hosted = "Hosted",
  Serverless = "Serverless",
}

/**
 * Hosting type of the monitor resource - either Hosted deployments or Serverless Projects. \
 * {@link KnownHostingType} can be used interchangeably with HostingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Hosted** \
 * **Serverless**
 */
export type HostingType = string;

/** Project details of the monitor resource IF it belongs to Serverless offer kind. */
export interface ProjectDetails {
  /** Project type; ex: Elasticsearch / Observability / Security */
  projectType?: ProjectType;
  /** Configuration type of the Elasticsearch project */
  configurationType?: ConfigurationType;
}

export function projectDetailsSerializer(item: ProjectDetails): any {
  return {
    projectType: item["projectType"],
    configurationType: item["configurationType"],
  };
}

export function projectDetailsDeserializer(item: any): ProjectDetails {
  return {
    projectType: item["projectType"],
    configurationType: item["configurationType"],
  };
}

/** Project type; ex: Elasticsearch / Observability / Security */
export enum KnownProjectType {
  Elasticsearch = "Elasticsearch",
  Observability = "Observability",
  Security = "Security",
  NotApplicable = "NotApplicable",
}

/**
 * Project type; ex: Elasticsearch / Observability / Security \
 * {@link KnownProjectType} can be used interchangeably with ProjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Elasticsearch** \
 * **Observability** \
 * **Security** \
 * **NotApplicable**
 */
export type ProjectType = string;

/** Configuration type of the Elasticsearch project */
export enum KnownConfigurationType {
  GeneralPurpose = "GeneralPurpose",
  Vector = "Vector",
  TimeSeries = "TimeSeries",
  NotApplicable = "NotApplicable",
}

/**
 * Configuration type of the Elasticsearch project \
 * {@link KnownConfigurationType} can be used interchangeably with ConfigurationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GeneralPurpose** \
 * **Vector** \
 * **TimeSeries** \
 * **NotApplicable**
 */
export type ConfigurationType = string;

/** Represents the SKU of a resource. */
export interface ResourceSku {
  /** The name of the SKU. */
  name: string;
}

export function resourceSkuSerializer(item: ResourceSku): any {
  return { name: item["name"] };
}

export function resourceSkuDeserializer(item: any): ResourceSku {
  return {
    name: item["name"],
  };
}

/** Identity properties. */
export interface IdentityProperties {
  /** The identity ID. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Managed identity type. */
  type?: ManagedIdentityTypes;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return { type: item["type"] };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Managed Identity types. */
export enum KnownManagedIdentityTypes {
  SystemAssigned = "SystemAssigned",
}

/**
 * Managed Identity types. \
 * {@link KnownManagedIdentityTypes} can be used interchangeably with ManagedIdentityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**
 */
export type ManagedIdentityTypes = string;

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export function trackedResourceSerializer(item: TrackedResource): any {
  return { tags: item["tags"], location: item["location"] };
}

export function trackedResourceDeserializer(item: any): TrackedResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    tags: item["tags"],
    location: item["location"],
  };
}

/** Monitor resource update parameters. */
export interface ElasticMonitorResourceUpdateParameters {
  /** elastic monitor resource tags. */
  tags?: Record<string, string>;
}

export function elasticMonitorResourceUpdateParametersSerializer(
  item: ElasticMonitorResourceUpdateParameters,
): any {
  return { tags: item["tags"] };
}

/** Response of a list operation. */
export interface _ElasticMonitorResourceListResponse {
  /** The ElasticMonitorResource items on this page */
  value: ElasticMonitorResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _elasticMonitorResourceListResponseDeserializer(
  item: any,
): _ElasticMonitorResourceListResponse {
  return {
    value: elasticMonitorResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function elasticMonitorResourceArraySerializer(
  result: Array<ElasticMonitorResource>,
): any[] {
  return result.map((item) => {
    return elasticMonitorResourceSerializer(item);
  });
}

export function elasticMonitorResourceArrayDeserializer(
  result: Array<ElasticMonitorResource>,
): any[] {
  return result.map((item) => {
    return elasticMonitorResourceDeserializer(item);
  });
}

/** Response of a list operation. */
export interface _MonitoredResourceListResponse {
  /** The MonitoredResource items on this page */
  value: MonitoredResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _monitoredResourceListResponseDeserializer(
  item: any,
): _MonitoredResourceListResponse {
  return {
    value: monitoredResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function monitoredResourceArrayDeserializer(result: Array<MonitoredResource>): any[] {
  return result.map((item) => {
    return monitoredResourceDeserializer(item);
  });
}

/** The properties of a resource currently being monitored by the Elastic monitor resource. */
export interface MonitoredResource {
  /** The ARM id of the resource. */
  id?: string;
  /** Flag indicating the status of the resource for sending logs operation to Elastic. */
  sendingLogs?: SendingLogs;
  /** Reason for why the resource is sending logs (or why it is not sending). */
  reasonForLogsStatus?: string;
}

export function monitoredResourceDeserializer(item: any): MonitoredResource {
  return {
    id: item["id"],
    sendingLogs: item["sendingLogs"],
    reasonForLogsStatus: item["reasonForLogsStatus"],
  };
}

/** Flag indicating the status of the resource for sending logs operation to Elastic. */
export enum KnownSendingLogs {
  True = "True",
  False = "False",
}

/**
 * Flag indicating the status of the resource for sending logs operation to Elastic. \
 * {@link KnownSendingLogs} can be used interchangeably with SendingLogs,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True** \
 * **False**
 */
export type SendingLogs = string;

/** The properties of deployment in Elastic cloud corresponding to the Elastic monitor resource. */
export interface DeploymentInfoResponse {
  /** The Elastic deployment status. */
  readonly status?: ElasticDeploymentStatus;
  /** Version of the elasticsearch in Elastic cloud deployment. */
  readonly version?: string;
  /** RAM capacity of the elasticsearch in Elastic cloud deployment. */
  readonly memoryCapacity?: string;
  /** Disk capacity of the elasticsearch in Elastic cloud deployment. */
  readonly diskCapacity?: string;
  /** Elasticsearch endpoint in Elastic cloud deployment. This is either the aliased_endpoint if available, or the service_url otherwise. */
  readonly elasticsearchEndPoint?: string;
  /** Deployment URL of the elasticsearch in Elastic cloud deployment. */
  readonly deploymentUrl?: string;
  /** Marketplace SaaS Info of the resource. */
  readonly marketplaceSaasInfo?: MarketplaceSaaSInfo;
  /** Project Type - Applicable for Serverless only. */
  readonly projectType?: string;
  /** ConfigurationType Type - Applicable for Serverless only. */
  readonly configurationType?: string;
}

export function deploymentInfoResponseDeserializer(item: any): DeploymentInfoResponse {
  return {
    status: item["status"],
    version: item["version"],
    memoryCapacity: item["memoryCapacity"],
    diskCapacity: item["diskCapacity"],
    elasticsearchEndPoint: item["elasticsearchEndPoint"],
    deploymentUrl: item["deploymentUrl"],
    marketplaceSaasInfo: !item["marketplaceSaasInfo"]
      ? item["marketplaceSaasInfo"]
      : marketplaceSaaSInfoDeserializer(item["marketplaceSaasInfo"]),
    projectType: item["projectType"],
    configurationType: item["configurationType"],
  };
}

/** Flag specifying if the Elastic deployment status is healthy or not. */
export enum KnownElasticDeploymentStatus {
  Healthy = "Healthy",
  Unhealthy = "Unhealthy",
}

/**
 * Flag specifying if the Elastic deployment status is healthy or not. \
 * {@link KnownElasticDeploymentStatus} can be used interchangeably with ElasticDeploymentStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Healthy** \
 * **Unhealthy**
 */
export type ElasticDeploymentStatus = string;

/** Marketplace SAAS Info of the resource. */
export interface MarketplaceSaaSInfo {
  /** Marketplace Subscription */
  marketplaceSubscription?: MarketplaceSaaSInfoMarketplaceSubscription;
  /** Marketplace Subscription Details: SAAS Name */
  marketplaceName?: string;
  /** Marketplace Subscription Details: Resource URI */
  marketplaceResourceId?: string;
  /** Marketplace Subscription Details: SaaS Subscription Status */
  marketplaceStatus?: string;
  /** The Azure Subscription ID to which the Marketplace Subscription belongs and gets billed into. */
  billedAzureSubscriptionId?: string;
  /** Flag specifying if the Marketplace status is subscribed or not. */
  subscribed?: boolean;
}

export function marketplaceSaaSInfoDeserializer(item: any): MarketplaceSaaSInfo {
  return {
    marketplaceSubscription: !item["marketplaceSubscription"]
      ? item["marketplaceSubscription"]
      : marketplaceSaaSInfoMarketplaceSubscriptionDeserializer(item["marketplaceSubscription"]),
    marketplaceName: item["marketplaceName"],
    marketplaceResourceId: item["marketplaceResourceId"],
    marketplaceStatus: item["marketplaceStatus"],
    billedAzureSubscriptionId: item["billedAzureSubscriptionId"],
    subscribed: item["subscribed"],
  };
}

/** Marketplace Subscription */
export interface MarketplaceSaaSInfoMarketplaceSubscription {
  /** Marketplace Subscription Id. This is a GUID-formatted string. */
  id?: string;
  /** Publisher Id of the Marketplace offer. */
  publisherId?: string;
  /** Offer Id of the Marketplace offer, */
  offerId?: string;
}

export function marketplaceSaaSInfoMarketplaceSubscriptionDeserializer(
  item: any,
): MarketplaceSaaSInfoMarketplaceSubscription {
  return {
    id: item["id"],
    publisherId: item["publisherId"],
    offerId: item["offerId"],
  };
}

/** The properties of the request required for creating user on elastic side */
export interface ExternalUserInfo {
  /** Username of the user to be created or updated */
  userName?: string;
  /** Full name of the user to be created or updated */
  fullName?: string;
  /** Password of the user to be created or updated */
  password?: string;
  /** Email id of the user to be created or updated */
  emailId?: string;
  /** Roles to be assigned for  created or updated user */
  roles?: string[];
}

export function externalUserInfoSerializer(item: ExternalUserInfo): any {
  return {
    userName: item["userName"],
    fullName: item["fullName"],
    password: item["password"],
    emailId: item["emailId"],
    roles: !item["roles"]
      ? item["roles"]
      : item["roles"].map((p: any) => {
          return p;
        }),
  };
}

/** The properties of the response we got from elastic while creating external user */
export interface ExternalUserCreationResponse {
  /** Shows if user is created or updated */
  readonly created?: boolean;
}

export function externalUserCreationResponseDeserializer(item: any): ExternalUserCreationResponse {
  return {
    created: item["created"],
  };
}

/** Marketplace Subscription and Organization details to which resource gets billed into. */
export interface BillingInfoResponse {
  /** Marketplace Subscription details */
  marketplaceSaasInfo?: MarketplaceSaaSInfo;
  /** Partner Billing Entity details: Organization Info */
  partnerBillingEntity?: PartnerBillingEntity;
}

export function billingInfoResponseDeserializer(item: any): BillingInfoResponse {
  return {
    marketplaceSaasInfo: !item["marketplaceSaasInfo"]
      ? item["marketplaceSaasInfo"]
      : marketplaceSaaSInfoDeserializer(item["marketplaceSaasInfo"]),
    partnerBillingEntity: !item["partnerBillingEntity"]
      ? item["partnerBillingEntity"]
      : partnerBillingEntityDeserializer(item["partnerBillingEntity"]),
  };
}

/** Partner Billing details associated with the resource. */
export interface PartnerBillingEntity {
  /** The Elastic Organization Id. */
  id?: string;
  /** The Elastic Organization Name. */
  name?: string;
  /** Link to the elastic organization page */
  partnerEntityUri?: string;
}

export function partnerBillingEntityDeserializer(item: any): PartnerBillingEntity {
  return {
    id: item["id"],
    name: item["name"],
    partnerEntityUri: item["partnerEntityUri"],
  };
}

/** List of all active elastic deployments. */
export interface _ConnectedPartnerResourcesListResponse {
  /** The ConnectedPartnerResourcesListFormat items on this page */
  value: ConnectedPartnerResourcesListFormat[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectedPartnerResourcesListResponseDeserializer(
  item: any,
): _ConnectedPartnerResourcesListResponse {
  return {
    value: connectedPartnerResourcesListFormatArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectedPartnerResourcesListFormatArrayDeserializer(
  result: Array<ConnectedPartnerResourcesListFormat>,
): any[] {
  return result.map((item) => {
    return connectedPartnerResourcesListFormatDeserializer(item);
  });
}

/** Connected Partner Resources List Format */
export interface ConnectedPartnerResourcesListFormat {
  /** Connected Partner Resource Properties */
  properties?: ConnectedPartnerResourceProperties;
}

export function connectedPartnerResourcesListFormatDeserializer(
  item: any,
): ConnectedPartnerResourcesListFormat {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : connectedPartnerResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Connected Partner Resource Properties */
export interface ConnectedPartnerResourceProperties {
  /** Elastic resource name */
  partnerDeploymentName?: string;
  /** URL of the resource in Elastic cloud. */
  partnerDeploymentUri?: string;
  /** The azure resource Id of the resource. */
  azureResourceId?: string;
  /** The location of the resource. */
  location?: string;
  /** The hosting type of the resource. */
  type?: string;
}

export function connectedPartnerResourcePropertiesDeserializer(
  item: any,
): ConnectedPartnerResourceProperties {
  return {
    partnerDeploymentName: item["partnerDeploymentName"],
    partnerDeploymentUri: item["partnerDeploymentUri"],
    azureResourceId: item["azureResourceId"],
    location: item["location"],
    type: item["type"],
  };
}

/** Response of a list operation. */
export interface _VMHostListResponse {
  /** The VMResources items on this page */
  value: VMResources[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vmHostListResponseDeserializer(item: any): _VMHostListResponse {
  return {
    value: vmResourcesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vmResourcesArrayDeserializer(result: Array<VMResources>): any[] {
  return result.map((item) => {
    return vmResourcesDeserializer(item);
  });
}

/** The vm resource properties that is currently being monitored by the Elastic monitor resource. */
export interface VMResources {
  /** The ARM id of the VM resource. */
  vmResourceId?: string;
}

export function vmResourcesDeserializer(item: any): VMResources {
  return {
    vmResourceId: item["vmResourceId"],
  };
}

/** The vm ingestion details to install an agent. */
export interface VMIngestionDetailsResponse {
  /** The cloudId of given Elastic monitor resource. */
  cloudId?: string;
  /** Ingestion details to install agent on given VM. */
  ingestionKey?: string;
}

export function vmIngestionDetailsResponseDeserializer(item: any): VMIngestionDetailsResponse {
  return {
    cloudId: item["cloudId"],
    ingestionKey: item["ingestionKey"],
  };
}

/** Update VM resource collection. */
export interface VMCollectionUpdate {
  /** ARM id of the VM resource. */
  vmResourceId?: string;
  /** Operation to be performed for given VM. */
  operationName?: OperationName;
}

export function vmCollectionUpdateSerializer(item: VMCollectionUpdate): any {
  return {
    vmResourceId: item["vmResourceId"],
    operationName: item["operationName"],
  };
}

/** Operation to be performed on the given vm resource id. */
export enum KnownOperationName {
  Add = "Add",
  Delete = "Delete",
}

/**
 * Operation to be performed on the given vm resource id. \
 * {@link KnownOperationName} can be used interchangeably with OperationName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Add** \
 * **Delete**
 */
export type OperationName = string;

/** Stack Versions that this version can upgrade to */
export interface UpgradableVersionsList {
  /** Current version of the elastic monitor */
  currentVersion?: string;
  /** Stack Versions that this version can upgrade to */
  upgradableVersions?: string[];
}

export function upgradableVersionsListDeserializer(item: any): UpgradableVersionsList {
  return {
    currentVersion: item["currentVersion"],
    upgradableVersions: !item["upgradableVersions"]
      ? item["upgradableVersions"]
      : item["upgradableVersions"].map((p: any) => {
          return p;
        }),
  };
}

/** Upgrade elastic monitor version */
export interface ElasticMonitorUpgrade {
  /** Version to which the elastic monitor should be upgraded to */
  version?: string;
}

export function elasticMonitorUpgradeSerializer(item: ElasticMonitorUpgrade): any {
  return { version: item["version"] };
}

/** List of elastic traffic filters in the account */
export interface ElasticTrafficFilterResponse {
  /** List of elastic traffic filters in the account */
  rulesets?: ElasticTrafficFilter[];
}

export function elasticTrafficFilterResponseDeserializer(item: any): ElasticTrafficFilterResponse {
  return {
    rulesets: !item["rulesets"]
      ? item["rulesets"]
      : elasticTrafficFilterArrayDeserializer(item["rulesets"]),
  };
}

export function elasticTrafficFilterArrayDeserializer(result: Array<ElasticTrafficFilter>): any[] {
  return result.map((item) => {
    return elasticTrafficFilterDeserializer(item);
  });
}

/** Elastic traffic filter object */
export interface ElasticTrafficFilter {
  /** Id of the elastic filter */
  id?: string;
  /** Name of the elastic filter */
  name?: string;
  /** Description of the elastic filter */
  description?: string;
  /** Region of the elastic filter */
  region?: string;
  /** Type of the elastic filter */
  type?: Type;
  /** IncludeByDefault for the elastic filter */
  includeByDefault?: boolean;
  /** Rules in the elastic filter */
  rules?: ElasticTrafficFilterRule[];
}

export function elasticTrafficFilterDeserializer(item: any): ElasticTrafficFilter {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    region: item["region"],
    type: item["type"],
    includeByDefault: item["includeByDefault"],
    rules: !item["rules"]
      ? item["rules"]
      : elasticTrafficFilterRuleArrayDeserializer(item["rules"]),
  };
}

/** Type of the elastic filter */
export enum KnownType {
  Ip = "ip",
  AzurePrivateEndpoint = "azure_private_endpoint",
}

/**
 * Type of the elastic filter \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ip** \
 * **azure_private_endpoint**
 */
export type Type = string;

export function elasticTrafficFilterRuleArrayDeserializer(
  result: Array<ElasticTrafficFilterRule>,
): any[] {
  return result.map((item) => {
    return elasticTrafficFilterRuleDeserializer(item);
  });
}

/** Elastic traffic filter rule object */
export interface ElasticTrafficFilterRule {
  /** IP of the elastic filter rule */
  source?: string;
  /** Description of the elastic filter rule */
  description?: string;
  /** Guid of Private Endpoint in the elastic filter rule */
  azureEndpointGuid?: string;
  /** Name of the Private Endpoint in the elastic filter rule */
  azureEndpointName?: string;
  /** Id of the elastic filter rule */
  id?: string;
}

export function elasticTrafficFilterRuleDeserializer(item: any): ElasticTrafficFilterRule {
  return {
    source: item["source"],
    description: item["description"],
    azureEndpointGuid: item["azureEndpointGuid"],
    azureEndpointName: item["azureEndpointName"],
    id: item["id"],
  };
}

/** Resubscribe Properties */
export interface ResubscribeProperties {
  /** Newly selected plan Id to create the new Marketplace subscription for Resubscribe */
  planId?: string;
  /** Newly selected term to create the new Marketplace subscription for Resubscribe */
  term?: string;
  /** Newly selected Azure Subscription Id in which the new Marketplace subscription will be created for Resubscribe */
  subscriptionId?: string;
  /** Newly selected Azure resource group in which the new Marketplace subscription will be created for Resubscribe */
  resourceGroup?: string;
  /** Organization Id of the Elastic Organization that needs to be resubscribed */
  organizationId?: string;
}

export function resubscribePropertiesSerializer(item: ResubscribeProperties): any {
  return {
    planId: item["planId"],
    term: item["term"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    organizationId: item["organizationId"],
  };
}

/** Email Id of the User Organization, of which the API Key must be returned */
export interface UserEmailId {
  /** The User email Id */
  emailId?: string;
}

export function userEmailIdSerializer(item: UserEmailId): any {
  return { emailId: item["emailId"] };
}

/** The User Api Key created for the Organization associated with the User Email Id that was passed in the request */
export interface UserApiKeyResponse {
  properties?: UserApiKeyResponseProperties;
}

export function userApiKeyResponseDeserializer(item: any): UserApiKeyResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : userApiKeyResponsePropertiesDeserializer(item["properties"]),
  };
}

/** model interface UserApiKeyResponseProperties */
export interface UserApiKeyResponseProperties {
  /** The User Api Key Generated based on GenerateApiKey flag. This is applicable for non-Portal clients only. */
  apiKey?: string;
}

export function userApiKeyResponsePropertiesDeserializer(item: any): UserApiKeyResponseProperties {
  return {
    apiKey: item["apiKey"],
  };
}

/** The Azure Subscription ID to which the Organization of the logged in user belongs and gets billed into. */
export interface ElasticOrganizationToAzureSubscriptionMappingResponse {
  /** The properties of Azure Subscription ID to which the Organization of the logged in user belongs and gets billed into. */
  properties?: ElasticOrganizationToAzureSubscriptionMappingResponseProperties;
}

export function elasticOrganizationToAzureSubscriptionMappingResponseDeserializer(
  item: any,
): ElasticOrganizationToAzureSubscriptionMappingResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : elasticOrganizationToAzureSubscriptionMappingResponsePropertiesDeserializer(
          item["properties"],
        ),
  };
}

/** The properties of Azure Subscription ID to which the Organization of the logged in user belongs and gets billed into. */
export interface ElasticOrganizationToAzureSubscriptionMappingResponseProperties {
  /** The Azure Subscription ID to which the Organization belongs and gets billed into. This is empty for a new user OR a user without an Elastic Organization. */
  billedAzureSubscriptionId?: string;
  /** Marketplace SaaS Info of the resource. */
  readonly marketplaceSaasInfo?: MarketplaceSaaSInfo;
  /** The Elastic Organization Id. */
  elasticOrganizationId?: string;
  /** The Elastic Organization Name. */
  elasticOrganizationName?: string;
}

export function elasticOrganizationToAzureSubscriptionMappingResponsePropertiesDeserializer(
  item: any,
): ElasticOrganizationToAzureSubscriptionMappingResponseProperties {
  return {
    billedAzureSubscriptionId: item["billedAzureSubscriptionId"],
    marketplaceSaasInfo: !item["marketplaceSaasInfo"]
      ? item["marketplaceSaasInfo"]
      : marketplaceSaaSInfoDeserializer(item["marketplaceSaasInfo"]),
    elasticOrganizationId: item["elasticOrganizationId"],
    elasticOrganizationName: item["elasticOrganizationName"],
  };
}

/** Capture properties of Open AI resource Integration. */
export interface OpenAIIntegrationRPModel extends ProxyResource {
  /** Open AI Integration details. */
  properties?: OpenAIIntegrationProperties;
}

export function openAIIntegrationRPModelSerializer(item: OpenAIIntegrationRPModel): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : openAIIntegrationPropertiesSerializer(item["properties"]),
  };
}

export function openAIIntegrationRPModelDeserializer(item: any): OpenAIIntegrationRPModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : openAIIntegrationPropertiesDeserializer(item["properties"]),
  };
}

/** Open AI Integration details. */
export interface OpenAIIntegrationProperties {
  /** The resource name of Open AI resource */
  openAIResourceId?: string;
  /** The API endpoint for Open AI resource */
  openAIResourceEndpoint?: string;
  /** The connector id of Open AI resource */
  openAIConnectorId?: string;
  /** Value of API key for Open AI resource */
  key?: string;
  /** Last Update Timestamp for key updation */
  readonly lastRefreshAt?: Date;
}

export function openAIIntegrationPropertiesSerializer(item: OpenAIIntegrationProperties): any {
  return {
    openAIResourceId: item["openAIResourceId"],
    openAIResourceEndpoint: item["openAIResourceEndpoint"],
    openAIConnectorId: item["openAIConnectorId"],
    key: item["key"],
  };
}

export function openAIIntegrationPropertiesDeserializer(item: any): OpenAIIntegrationProperties {
  return {
    openAIResourceId: item["openAIResourceId"],
    openAIResourceEndpoint: item["openAIResourceEndpoint"],
    openAIConnectorId: item["openAIConnectorId"],
    key: item["key"],
    lastRefreshAt: !item["lastRefreshAt"] ? item["lastRefreshAt"] : new Date(item["lastRefreshAt"]),
  };
}

/** Response of a list operation. */
export interface _OpenAIIntegrationRPModelListResponse {
  /** The OpenAIIntegrationRPModel items on this page */
  value: OpenAIIntegrationRPModel[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _openAIIntegrationRPModelListResponseDeserializer(
  item: any,
): _OpenAIIntegrationRPModelListResponse {
  return {
    value: openAIIntegrationRPModelArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function openAIIntegrationRPModelArraySerializer(
  result: Array<OpenAIIntegrationRPModel>,
): any[] {
  return result.map((item) => {
    return openAIIntegrationRPModelSerializer(item);
  });
}

export function openAIIntegrationRPModelArrayDeserializer(
  result: Array<OpenAIIntegrationRPModel>,
): any[] {
  return result.map((item) => {
    return openAIIntegrationRPModelDeserializer(item);
  });
}

/** Status of the OpenAI Integration */
export interface OpenAIIntegrationStatusResponse {
  /** Status of the OpenAI Integration */
  properties?: OpenAIIntegrationStatusResponseProperties;
}

export function openAIIntegrationStatusResponseDeserializer(
  item: any,
): OpenAIIntegrationStatusResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : openAIIntegrationStatusResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Status of the OpenAI Integration */
export interface OpenAIIntegrationStatusResponseProperties {
  /** Status of the OpenAI Integration */
  status?: string;
}

export function openAIIntegrationStatusResponsePropertiesDeserializer(
  item: any,
): OpenAIIntegrationStatusResponseProperties {
  return {
    status: item["status"],
  };
}

/** List of elastic versions available in a region. */
export interface _ElasticVersionsListResponse {
  /** The ElasticVersionListFormat items on this page */
  value: ElasticVersionListFormat[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _elasticVersionsListResponseDeserializer(item: any): _ElasticVersionsListResponse {
  return {
    value: elasticVersionListFormatArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function elasticVersionListFormatArrayDeserializer(
  result: Array<ElasticVersionListFormat>,
): any[] {
  return result.map((item) => {
    return elasticVersionListFormatDeserializer(item);
  });
}

/** Elastic Version List Format */
export interface ElasticVersionListFormat {
  /** Elastic Version Properties */
  properties?: ElasticVersionListProperties;
}

export function elasticVersionListFormatDeserializer(item: any): ElasticVersionListFormat {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : elasticVersionListPropertiesDeserializer(item["properties"]),
  };
}

/** Elastic Version Properties */
export interface ElasticVersionListProperties {
  /** Available elastic version of the given region */
  version?: string;
}

export function elasticVersionListPropertiesDeserializer(item: any): ElasticVersionListProperties {
  return {
    version: item["version"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-06-01 API version. */
  V20250601 = "2025-06-01",
}
