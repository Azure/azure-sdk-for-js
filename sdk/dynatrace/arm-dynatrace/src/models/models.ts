// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Localized display information for an operation. */
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

/** The request to update subscriptions needed to be monitored by the Dynatrace monitor resource. */
export interface MonitoredSubscriptionProperties extends ProxyResource {
  /** The request to update subscriptions needed to be monitored by the Dynatrace monitor resource. */
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

/** The request to update subscriptions needed to be monitored by the Dynatrace monitor resource. */
export interface SubscriptionList {
  /** The operation for the patch on the resource. */
  operation?: SubscriptionListOperation;
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
export enum KnownSubscriptionListOperation {
  /** AddBegin */
  AddBegin = "AddBegin",
  /** AddComplete */
  AddComplete = "AddComplete",
  /** DeleteBegin */
  DeleteBegin = "DeleteBegin",
  /** DeleteComplete */
  DeleteComplete = "DeleteComplete",
  /** Active */
  Active = "Active",
}

/**
 * The operation for the patch on the resource. \
 * {@link KnownSubscriptionListOperation} can be used interchangeably with SubscriptionListOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AddBegin** \
 * **AddComplete** \
 * **DeleteBegin** \
 * **DeleteComplete** \
 * **Active**
 */
export type SubscriptionListOperation = string;

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

/** The list of subscriptions and it's monitoring status by current Dynatrace monitor. */
export interface MonitoredSubscription {
  /** The subscriptionId to be monitored. */
  subscriptionId: string;
  /** The state of monitoring. */
  status?: Status;
  /** The reason of not monitoring the subscription. */
  error?: string;
  /** Properties for the Tag rules resource of a Monitor account. */
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
  /** InProgress */
  InProgress = "InProgress",
  /** Active */
  Active = "Active",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
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

/** Properties for the Tag rules resource of a Monitor account. */
export interface MonitoringTagRulesProperties {
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function monitoringTagRulesPropertiesSerializer(item: MonitoringTagRulesProperties): any {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesSerializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesSerializer(item["metricRules"]),
  };
}

export function monitoringTagRulesPropertiesDeserializer(item: any): MonitoringTagRulesProperties {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesDeserializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesDeserializer(item["metricRules"]),
    provisioningState: item["provisioningState"],
  };
}

/** Set of rules for sending logs for the Monitor resource. */
export interface LogRules {
  /** Flag specifying if AAD logs should be sent for the Monitor resource. */
  sendAadLogs?: SendAadLogsStatus;
  /** Flag specifying if subscription logs should be sent for the Monitor resource. */
  sendSubscriptionLogs?: SendSubscriptionLogsStatus;
  /** Flag specifying if activity logs from Azure resources should be sent for the Monitor resource. */
  sendActivityLogs?: SendActivityLogsStatus;
  /**
   * List of filtering tags to be used for capturing logs. This only takes effect if SendActivityLogs flag is enabled. If empty, all resources will be captured.
   * If only Exclude action is specified, the rules will apply to the list of all available resources. If Include actions are specified, the rules will only include resources with the associated tags.
   */
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

/** Indicates whether AAD logs are being sent. */
export enum KnownSendAadLogsStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether AAD logs are being sent. \
 * {@link KnownSendAadLogsStatus} can be used interchangeably with SendAadLogsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SendAadLogsStatus = string;

/** Indicates whether subscription logs are being sent. */
export enum KnownSendSubscriptionLogsStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether subscription logs are being sent. \
 * {@link KnownSendSubscriptionLogsStatus} can be used interchangeably with SendSubscriptionLogsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SendSubscriptionLogsStatus = string;

/** Indicates whether activity logs are being sent. */
export enum KnownSendActivityLogsStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether activity logs are being sent. \
 * {@link KnownSendActivityLogsStatus} can be used interchangeably with SendActivityLogsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SendActivityLogsStatus = string;

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
  /** Valid actions for a filtering tag. Exclusion takes priority over inclusion. */
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
  /** Include */
  Include = "Include",
  /** Exclude */
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

/** Set of rules for sending metrics for the Monitor resource. */
export interface MetricRules {
  /** Flag specifying if metrics from Azure resources should be sent for the Monitor resource. */
  sendingMetrics?: SendingMetricsStatus;
  /** List of filtering tags to be used for capturing metrics. If empty, all resources will be captured. If only Exclude action is specified, the rules will apply to the list of all available resources. If Include actions are specified, the rules will only include resources with the associated tags. */
  filteringTags?: FilteringTag[];
}

export function metricRulesSerializer(item: MetricRules): any {
  return {
    sendingMetrics: item["sendingMetrics"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArraySerializer(item["filteringTags"]),
  };
}

export function metricRulesDeserializer(item: any): MetricRules {
  return {
    sendingMetrics: item["sendingMetrics"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArrayDeserializer(item["filteringTags"]),
  };
}

/** Indicates whether metrics are being sent. */
export enum KnownSendingMetricsStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether metrics are being sent. \
 * {@link KnownSendingMetricsStatus} can be used interchangeably with SendingMetricsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SendingMetricsStatus = string;

/** Provisioning state of the monitoring resource */
export enum KnownProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleted */
  Deleted = "Deleted",
  /** NotSpecified */
  NotSpecified = "NotSpecified",
}

/**
 * Provisioning state of the monitoring resource \
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

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ProxyResource extends Resource {}

export function proxyResourceSerializer(_item: ProxyResource): any {
  return {};
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

export function resourceSerializer(_item: Resource): any {
  return {};
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

/** Tag rules for a monitor resource */
export interface TagRule extends ProxyResource {
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function tagRuleSerializer(item: TagRule): any {
  return { properties: _tagRulePropertiesSerializer(item) };
}

export function tagRuleDeserializer(item: any): TagRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._tagRulePropertiesDeserializer(item["properties"]),
  };
}

/** The response of a TagRule list operation. */
export interface _TagRuleListResult {
  /** The TagRule items on this page */
  value: TagRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _tagRuleListResultDeserializer(item: any): _TagRuleListResult {
  return {
    value: tagRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tagRuleArraySerializer(result: Array<TagRule>): any[] {
  return result.map((item) => {
    return tagRuleSerializer(item);
  });
}

export function tagRuleArrayDeserializer(result: Array<TagRule>): any[] {
  return result.map((item) => {
    return tagRuleDeserializer(item);
  });
}

/** Dynatrace Monitor Resource */
export interface MonitorResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: IdentityProperties;
  /** Status of the monitor. */
  monitoringStatus?: MonitoringStatus;
  /** Marketplace subscription status. */
  marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace resource autorenew flag */
  marketplaceSaasAutoRenew?: MarketplaceSaasAutoRenew;
  /** Properties of the Dynatrace environment. */
  dynatraceEnvironmentProperties?: DynatraceEnvironmentProperties;
  /** User info. */
  userInfo?: UserInfo;
  /** Billing plan information. */
  planData?: PlanData;
  /** Liftr Resource category. */
  readonly liftrResourceCategory?: LiftrResourceCategories;
  /** The priority of the resource. */
  readonly liftrResourcePreference?: number;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function monitorResourceSerializer(item: MonitorResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _monitorResourcePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function monitorResourceDeserializer(item: any): MonitorResource {
  return {
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._monitorResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** Properties specific to the monitor resource. */
export interface MonitorProperties {
  /** Status of the monitor. */
  monitoringStatus?: MonitoringStatus;
  /** Marketplace subscription status. */
  marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace resource autorenew flag */
  marketplaceSaasAutoRenew?: MarketplaceSaasAutoRenew;
  /** Properties of the Dynatrace environment. */
  dynatraceEnvironmentProperties?: DynatraceEnvironmentProperties;
  /** User info. */
  userInfo?: UserInfo;
  /** Billing plan information. */
  planData?: PlanData;
  /** Liftr Resource category. */
  readonly liftrResourceCategory?: LiftrResourceCategories;
  /** The priority of the resource. */
  readonly liftrResourcePreference?: number;
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function monitorPropertiesSerializer(item: MonitorProperties): any {
  return {
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSaasAutoRenew: item["marketplaceSaasAutoRenew"],
    dynatraceEnvironmentProperties: !item["dynatraceEnvironmentProperties"]
      ? item["dynatraceEnvironmentProperties"]
      : dynatraceEnvironmentPropertiesSerializer(item["dynatraceEnvironmentProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
  };
}

export function monitorPropertiesDeserializer(item: any): MonitorProperties {
  return {
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSaasAutoRenew: item["marketplaceSaasAutoRenew"],
    dynatraceEnvironmentProperties: !item["dynatraceEnvironmentProperties"]
      ? item["dynatraceEnvironmentProperties"]
      : dynatraceEnvironmentPropertiesDeserializer(item["dynatraceEnvironmentProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoDeserializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
    liftrResourceCategory: item["liftrResourceCategory"],
    liftrResourcePreference: item["liftrResourcePreference"],
    provisioningState: item["provisioningState"],
  };
}

/** Flag specifying if the resource monitoring is enabled or disabled. */
export enum KnownMonitoringStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
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

/** Flag specifying the Marketplace Subscription Status of the resource. If payment is not made in time, the resource will go in Suspended state. */
export enum KnownMarketplaceSubscriptionStatus {
  /** Active */
  Active = "Active",
  /** Suspended */
  Suspended = "Suspended",
  /** Unsubscribed */
  Unsubscribed = "Unsubscribed",
}

/**
 * Flag specifying the Marketplace Subscription Status of the resource. If payment is not made in time, the resource will go in Suspended state. \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active** \
 * **Suspended** \
 * **Unsubscribed**
 */
export type MarketplaceSubscriptionStatus = string;

/** Marketplace resource autorenew flag */
export enum KnownMarketplaceSaasAutoRenew {
  /** On */
  On = "On",
  /** Off */
  Off = "Off",
}

/**
 * Marketplace resource autorenew flag \
 * {@link KnownMarketplaceSaasAutoRenew} can be used interchangeably with MarketplaceSaasAutoRenew,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **On** \
 * **Off**
 */
export type MarketplaceSaasAutoRenew = string;

/** Properties of the Dynatrace environment. */
export interface DynatraceEnvironmentProperties {
  /** User id */
  userId?: string;
  /** Dynatrace Account Information */
  accountInfo?: AccountInfo;
  /** Dynatrace Environment Information */
  environmentInfo?: EnvironmentInfo;
  /** The details of a Dynatrace single sign-on. */
  singleSignOnProperties?: DynatraceSingleSignOnProperties;
}

export function dynatraceEnvironmentPropertiesSerializer(
  item: DynatraceEnvironmentProperties,
): any {
  return {
    userId: item["userId"],
    accountInfo: !item["accountInfo"]
      ? item["accountInfo"]
      : accountInfoSerializer(item["accountInfo"]),
    environmentInfo: !item["environmentInfo"]
      ? item["environmentInfo"]
      : environmentInfoSerializer(item["environmentInfo"]),
    singleSignOnProperties: !item["singleSignOnProperties"]
      ? item["singleSignOnProperties"]
      : dynatraceSingleSignOnPropertiesSerializer(item["singleSignOnProperties"]),
  };
}

export function dynatraceEnvironmentPropertiesDeserializer(
  item: any,
): DynatraceEnvironmentProperties {
  return {
    userId: item["userId"],
    accountInfo: !item["accountInfo"]
      ? item["accountInfo"]
      : accountInfoDeserializer(item["accountInfo"]),
    environmentInfo: !item["environmentInfo"]
      ? item["environmentInfo"]
      : environmentInfoDeserializer(item["environmentInfo"]),
    singleSignOnProperties: !item["singleSignOnProperties"]
      ? item["singleSignOnProperties"]
      : dynatraceSingleSignOnPropertiesDeserializer(item["singleSignOnProperties"]),
  };
}

/** Dynatrace Account Information */
export interface AccountInfo {
  /** Account Id of the account this environment is linked to */
  accountId?: string;
  /** Region in which the account is created */
  regionId?: string;
  /** Name of the customer account / company */
  companyName?: string;
}

export function accountInfoSerializer(item: AccountInfo): any {
  return {
    accountId: item["accountId"],
    regionId: item["regionId"],
    companyName: item["companyName"],
  };
}

export function accountInfoDeserializer(item: any): AccountInfo {
  return {
    accountId: item["accountId"],
    regionId: item["regionId"],
    companyName: item["companyName"],
  };
}

/** Dynatrace Environment Information */
export interface EnvironmentInfo {
  /** Id of the environment created */
  environmentId?: string;
  /** Ingestion key of the environment */
  ingestionKey?: string;
  /** Ingestion endpoint used for sending logs */
  logsIngestionEndpoint?: string;
  /** Landing URL for Dynatrace environment */
  landingURL?: string;
}

export function environmentInfoSerializer(item: EnvironmentInfo): any {
  return {
    environmentId: item["environmentId"],
    ingestionKey: item["ingestionKey"],
    logsIngestionEndpoint: item["logsIngestionEndpoint"],
    landingURL: item["landingURL"],
  };
}

export function environmentInfoDeserializer(item: any): EnvironmentInfo {
  return {
    environmentId: item["environmentId"],
    ingestionKey: item["ingestionKey"],
    logsIngestionEndpoint: item["logsIngestionEndpoint"],
    landingURL: item["landingURL"],
  };
}

/** The details of a Dynatrace single sign-on. */
export interface DynatraceSingleSignOnProperties {
  /** State of Single Sign On */
  singleSignOnState?: SingleSignOnStates;
  /** Version of the Dynatrace agent installed on the VM. */
  enterpriseAppId?: string;
  /** The login URL specific to this Dynatrace Environment */
  singleSignOnUrl?: string;
  /** array of Aad(azure active directory) domains */
  aadDomains?: string[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function dynatraceSingleSignOnPropertiesSerializer(
  item: DynatraceSingleSignOnProperties,
): any {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
  };
}

export function dynatraceSingleSignOnPropertiesDeserializer(
  item: any,
): DynatraceSingleSignOnProperties {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}

/** Various states of the SSO resource */
export enum KnownSingleSignOnStates {
  /** Initial */
  Initial = "Initial",
  /** Enable */
  Enable = "Enable",
  /** Disable */
  Disable = "Disable",
  /** Existing */
  Existing = "Existing",
}

/**
 * Various states of the SSO resource \
 * {@link KnownSingleSignOnStates} can be used interchangeably with SingleSignOnStates,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Initial** \
 * **Enable** \
 * **Disable** \
 * **Existing**
 */
export type SingleSignOnStates = string;

/** User info. */
export interface UserInfo {
  /** First Name of the user */
  firstName?: string;
  /** Last Name of the user */
  lastName?: string;
  /** Email of the user used by Dynatrace for contacting them if needed */
  emailAddress?: string;
  /** Phone number of the user used by Dynatrace for contacting them if needed */
  phoneNumber?: string;
  /** Country of the user */
  country?: string;
}

export function userInfoSerializer(item: UserInfo): any {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    phoneNumber: item["phoneNumber"],
    country: item["country"],
  };
}

export function userInfoDeserializer(item: any): UserInfo {
  return {
    firstName: item["firstName"],
    lastName: item["lastName"],
    emailAddress: item["emailAddress"],
    phoneNumber: item["phoneNumber"],
    country: item["country"],
  };
}

/** Billing plan information. */
export interface PlanData {
  /** different usage type like PAYG/COMMITTED. this could be enum */
  usageType?: string;
  /** different billing cycles like MONTHLY/WEEKLY. this could be enum */
  billingCycle?: string;
  /** plan id as published by Dynatrace */
  planDetails?: string;
  /** date when plan was applied */
  effectiveDate?: Date;
}

export function planDataSerializer(item: PlanData): any {
  return {
    usageType: item["usageType"],
    billingCycle: item["billingCycle"],
    planDetails: item["planDetails"],
    effectiveDate: !item["effectiveDate"]
      ? item["effectiveDate"]
      : item["effectiveDate"].toISOString(),
  };
}

export function planDataDeserializer(item: any): PlanData {
  return {
    usageType: item["usageType"],
    billingCycle: item["billingCycle"],
    planDetails: item["planDetails"],
    effectiveDate: !item["effectiveDate"] ? item["effectiveDate"] : new Date(item["effectiveDate"]),
  };
}

/** Liftr resource category */
export enum KnownLiftrResourceCategories {
  /** Unknown */
  Unknown = "Unknown",
  /** MonitorLogs */
  MonitorLogs = "MonitorLogs",
}

/**
 * Liftr resource category \
 * {@link KnownLiftrResourceCategories} can be used interchangeably with LiftrResourceCategories,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **MonitorLogs**
 */
export type LiftrResourceCategories = string;

/** The properties of the managed service identities assigned to this resource. */
export interface IdentityProperties {
  /** The Active Directory tenant id of the principal. */
  readonly tenantId?: string;
  /** The active directory identifier of this principal. */
  readonly principalId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identityPropertiesSerializer(item: IdentityProperties): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityPropertiesDeserializer(item: any): IdentityProperties {
  return {
    tenantId: item["tenantId"],
    principalId: item["principalId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The kind of managed identity assigned to this resource. */
export enum KnownManagedIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAndUserAssigned */
  SystemAndUserAssigned = "SystemAndUserAssigned",
}

/**
 * The kind of managed identity assigned to this resource. \
 * {@link KnownManagedIdentityType} can be used interchangeably with ManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAndUserAssigned**
 */
export type ManagedIdentityType = string;

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties */
export interface UserAssignedIdentity {
  /** The principal ID of the assigned identity. */
  readonly principalId?: string;
  /** The client ID of the assigned identity. */
  readonly clientId?: string;
}

export function userAssignedIdentitySerializer(_item: UserAssignedIdentity): any {
  return {};
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** The updatable properties of the MonitorResource. */
export interface MonitorResourceUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The set of properties that can be updated in a PATCH request to a monitor resource. */
  properties?: MonitorUpdateProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function monitorResourceUpdateSerializer(item: MonitorResourceUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : monitorUpdatePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The set of properties that can be updated in a PATCH request to a monitor resource. */
export interface MonitorUpdateProperties {
  /** The new Billing plan information. */
  planData?: PlanData;
}

export function monitorUpdatePropertiesSerializer(item: MonitorUpdateProperties): any {
  return { planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]) };
}

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedServiceIdentitySerializer(item: ManagedServiceIdentity): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

/** Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). */
export enum KnownManagedServiceIdentityType {
  /** No managed identity. */
  None = "None",
  /** System assigned managed identity. */
  SystemAssigned = "SystemAssigned",
  /** User assigned managed identity. */
  UserAssigned = "UserAssigned",
  /** System and user assigned managed identity. */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * Type of managed service identity (where both SystemAssigned and UserAssigned types are allowed). \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No managed identity. \
 * **SystemAssigned**: System assigned managed identity. \
 * **UserAssigned**: User assigned managed identity. \
 * **SystemAssigned,UserAssigned**: System and user assigned managed identity.
 */
export type ManagedServiceIdentityType = string;

/** The response of a MonitorResource list operation. */
export interface _MonitorResourceListResult {
  /** The MonitorResource items on this page */
  value: MonitorResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _monitorResourceListResultDeserializer(item: any): _MonitorResourceListResult {
  return {
    value: monitorResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function monitorResourceArraySerializer(result: Array<MonitorResource>): any[] {
  return result.map((item) => {
    return monitorResourceSerializer(item);
  });
}

export function monitorResourceArrayDeserializer(result: Array<MonitorResource>): any[] {
  return result.map((item) => {
    return monitorResourceDeserializer(item);
  });
}

/** Request for getting log status for given monitored resource Ids */
export interface LogStatusRequest {
  /** List of azure resource Id of monitored resources for which we get the log status */
  monitoredResourceIds?: string[];
}

export function logStatusRequestSerializer(item: LogStatusRequest): any {
  return {
    monitoredResourceIds: !item["monitoredResourceIds"]
      ? item["monitoredResourceIds"]
      : item["monitoredResourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** List of all the resources being monitored by Dynatrace monitor resource */
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

/** Details of resource being monitored by Dynatrace monitor resource */
export interface MonitoredResource {
  /** The ARM id of the resource. */
  id?: string;
  /** Flag indicating if resource is sending metrics to Dynatrace. */
  sendingMetrics?: SendingMetricsStatus;
  /** Reason for why the resource is sending metrics (or why it is not sending). */
  reasonForMetricsStatus?: string;
  /** Flag indicating if resource is sending logs to Dynatrace. */
  sendingLogs?: SendingLogsStatus;
  /** Reason for why the resource is sending logs (or why it is not sending). */
  reasonForLogsStatus?: string;
}

export function monitoredResourceDeserializer(item: any): MonitoredResource {
  return {
    id: item["id"],
    sendingMetrics: item["sendingMetrics"],
    reasonForMetricsStatus: item["reasonForMetricsStatus"],
    sendingLogs: item["sendingLogs"],
    reasonForLogsStatus: item["reasonForLogsStatus"],
  };
}

/** Indicates whether logs are being sent. */
export enum KnownSendingLogsStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether logs are being sent. \
 * {@link KnownSendingLogsStatus} can be used interchangeably with SendingLogsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SendingLogsStatus = string;

/** Response of payload to be passed while installing VM agent. */
export interface VMExtensionPayload {
  /** Ingestion key of the environment */
  ingestionKey?: string;
  /** Id of the environment created */
  environmentId?: string;
}

export function vmExtensionPayloadDeserializer(item: any): VMExtensionPayload {
  return {
    ingestionKey: item["ingestionKey"],
    environmentId: item["environmentId"],
  };
}

/** Request for performing Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of agent resources. */
export interface ManageAgentInstallationRequest {
  /** The list of resources. */
  manageAgentInstallationList: ManageAgentList[];
  /** Install/Uninstall action. */
  action: Action;
}

export function manageAgentInstallationRequestSerializer(
  item: ManageAgentInstallationRequest,
): any {
  return {
    manageAgentInstallationList: manageAgentListArraySerializer(
      item["manageAgentInstallationList"],
    ),
    action: item["action"],
  };
}

export function manageAgentListArraySerializer(result: Array<ManageAgentList>): any[] {
  return result.map((item) => {
    return manageAgentListSerializer(item);
  });
}

/** Details of resource that has Dynatrace agent installed through the Azure Dynatrace resource. */
export interface ManageAgentList {
  /** The ARM id of the resource to install/uninstall agent. */
  id?: string;
}

export function manageAgentListSerializer(item: ManageAgentList): any {
  return { id: item["id"] };
}

/** Install/Uninstall action. */
export enum KnownAction {
  /** Install */
  Install = "Install",
  /** Uninstall */
  Uninstall = "Uninstall",
}

/**
 * Install/Uninstall action. \
 * {@link KnownAction} can be used interchangeably with Action,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Install** \
 * **Uninstall**
 */
export type Action = string;

/** Response of a list VM Host Operation. */
export interface _VMHostsListResponse {
  /** The VMInfo items on this page */
  value: VMInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vmHostsListResponseDeserializer(item: any): _VMHostsListResponse {
  return {
    value: vmInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vmInfoArrayDeserializer(result: Array<VMInfo>): any[] {
  return result.map((item) => {
    return vmInfoDeserializer(item);
  });
}

/** Details of VM Resource having Dynatrace OneAgent installed */
export interface VMInfo {
  /** Azure VM resource ID */
  resourceId?: string;
  /** Version of the Dynatrace agent installed on the VM. */
  version?: string;
  /** The monitoring mode of OneAgent */
  monitoringType?: MonitoringType;
  /** Update settings of OneAgent. */
  autoUpdateSetting?: AutoUpdateSetting;
  /** The current update status of OneAgent. */
  updateStatus?: UpdateStatus;
  /** The availability state of OneAgent. */
  availabilityState?: AvailabilityState;
  /** Tells whether log modules are enabled or not */
  logModule?: LogModule;
  /** The name of the host group */
  hostGroup?: string;
  /** The name of the host */
  hostName?: string;
}

export function vmInfoDeserializer(item: any): VMInfo {
  return {
    resourceId: item["resourceId"],
    version: item["version"],
    monitoringType: item["monitoringType"],
    autoUpdateSetting: item["autoUpdateSetting"],
    updateStatus: item["updateStatus"],
    availabilityState: item["availabilityState"],
    logModule: item["logModule"],
    hostGroup: item["hostGroup"],
    hostName: item["hostName"],
  };
}

/** The monitoring mode of OneAgent */
export enum KnownMonitoringType {
  /** CLOUD_INFRASTRUCTURE */
  CloudInfrastructure = "CLOUD_INFRASTRUCTURE",
  /** FULL_STACK */
  FullStack = "FULL_STACK",
  /** DISCOVERY */
  Discovery = "DISCOVERY",
}

/**
 * The monitoring mode of OneAgent \
 * {@link KnownMonitoringType} can be used interchangeably with MonitoringType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CLOUD_INFRASTRUCTURE** \
 * **FULL_STACK** \
 * **DISCOVERY**
 */
export type MonitoringType = string;

/** Update settings of OneAgent. */
export enum KnownAutoUpdateSetting {
  /** ENABLED */
  Enabled = "ENABLED",
  /** DISABLED */
  Disabled = "DISABLED",
}

/**
 * Update settings of OneAgent. \
 * {@link KnownAutoUpdateSetting} can be used interchangeably with AutoUpdateSetting,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ENABLED** \
 * **DISABLED**
 */
export type AutoUpdateSetting = string;

/** The current update status of OneAgent. */
export enum KnownUpdateStatus {
  /** INCOMPATIBLE */
  Incompatible = "INCOMPATIBLE",
  /** OUTDATED */
  Outdated = "OUTDATED",
  /** SCHEDULED */
  Scheduled = "SCHEDULED",
  /** SUPPRESSED */
  Suppressed = "SUPPRESSED",
  /** UNKNOWN */
  Unknown = "UNKNOWN",
  /** UP2DATE */
  UP2Date = "UP2DATE",
  /** UPDATE_IN_PROGRESS */
  UpdateINProgress = "UPDATE_IN_PROGRESS",
  /** UPDATE_PENDING */
  UpdatePending = "UPDATE_PENDING",
  /** UPDATE_PROBLEM */
  UpdateProblem = "UPDATE_PROBLEM",
}

/**
 * The current update status of OneAgent. \
 * {@link KnownUpdateStatus} can be used interchangeably with UpdateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **INCOMPATIBLE** \
 * **OUTDATED** \
 * **SCHEDULED** \
 * **SUPPRESSED** \
 * **UNKNOWN** \
 * **UP2DATE** \
 * **UPDATE_IN_PROGRESS** \
 * **UPDATE_PENDING** \
 * **UPDATE_PROBLEM**
 */
export type UpdateStatus = string;

/** The availability state of OneAgent. */
export enum KnownAvailabilityState {
  /** CRASHED */
  Crashed = "CRASHED",
  /** LOST */
  Lost = "LOST",
  /** MONITORED */
  Monitored = "MONITORED",
  /** PRE_MONITORED */
  PREMonitored = "PRE_MONITORED",
  /** SHUTDOWN */
  Shutdown = "SHUTDOWN",
  /** UNEXPECTED_SHUTDOWN */
  UnexpectedShutdown = "UNEXPECTED_SHUTDOWN",
  /** UNKNOWN */
  Unknown = "UNKNOWN",
  /** UNMONITORED */
  Unmonitored = "UNMONITORED",
}

/**
 * The availability state of OneAgent. \
 * {@link KnownAvailabilityState} can be used interchangeably with AvailabilityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CRASHED** \
 * **LOST** \
 * **MONITORED** \
 * **PRE_MONITORED** \
 * **SHUTDOWN** \
 * **UNEXPECTED_SHUTDOWN** \
 * **UNKNOWN** \
 * **UNMONITORED**
 */
export type AvailabilityState = string;

/** Tells whether log modules are enabled or not */
export enum KnownLogModule {
  /** ENABLED */
  Enabled = "ENABLED",
  /** DISABLED */
  Disabled = "DISABLED",
}

/**
 * Tells whether log modules are enabled or not \
 * {@link KnownLogModule} can be used interchangeably with LogModule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ENABLED** \
 * **DISABLED**
 */
export type LogModule = string;

/** Request for getting metric status for given monitored resource Ids */
export interface MetricStatusRequest {
  /** List of azure resource Id of monitored resources for which we get the metric status */
  monitoredResourceIds?: string[];
}

export function metricStatusRequestSerializer(item: MetricStatusRequest): any {
  return {
    monitoredResourceIds: !item["monitoredResourceIds"]
      ? item["monitoredResourceIds"]
      : item["monitoredResourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Response of get metrics status operation */
export interface MetricsStatusResponse {
  /** Azure resource IDs */
  azureResourceIds?: string[];
}

export function metricsStatusResponseDeserializer(item: any): MetricsStatusResponse {
  return {
    azureResourceIds: !item["azureResourceIds"]
      ? item["azureResourceIds"]
      : item["azureResourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Response of a list App Services Operation. */
export interface _AppServiceListResponse {
  /** The AppServiceInfo items on this page */
  value: AppServiceInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appServiceListResponseDeserializer(item: any): _AppServiceListResponse {
  return {
    value: appServiceInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function appServiceInfoArrayDeserializer(result: Array<AppServiceInfo>): any[] {
  return result.map((item) => {
    return appServiceInfoDeserializer(item);
  });
}

/** Details of App Services having Dynatrace OneAgent installed */
export interface AppServiceInfo {
  /** App service resource ID */
  resourceId?: string;
  /** Version of the Dynatrace agent installed on the App Service. */
  version?: string;
  /** The monitoring mode of OneAgent */
  monitoringType?: MonitoringType;
  /** Update settings of OneAgent. */
  autoUpdateSetting?: AutoUpdateSetting;
  /** The current update status of OneAgent. */
  updateStatus?: UpdateStatus;
  /** The availability state of OneAgent. */
  availabilityState?: AvailabilityState;
  /** Tells whether log modules are enabled or not */
  logModule?: LogModule;
  /** The name of the host group */
  hostGroup?: string;
  /** The name of the host */
  hostName?: string;
}

export function appServiceInfoDeserializer(item: any): AppServiceInfo {
  return {
    resourceId: item["resourceId"],
    version: item["version"],
    monitoringType: item["monitoringType"],
    autoUpdateSetting: item["autoUpdateSetting"],
    updateStatus: item["updateStatus"],
    availabilityState: item["availabilityState"],
    logModule: item["logModule"],
    hostGroup: item["hostGroup"],
    hostName: item["hostName"],
  };
}

/** The billing plan properties for the upgrade plan call. */
export interface UpgradePlanRequest {
  /** The new Billing plan information. */
  planData?: PlanData;
}

export function upgradePlanRequestSerializer(item: UpgradePlanRequest): any {
  return { planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]) };
}

/** Request for getting sso details for a user */
export interface SSODetailsRequest {
  /** user principal id of the user */
  userPrincipal: string;
}

export function ssoDetailsRequestSerializer(item: SSODetailsRequest): any {
  return { userPrincipal: item["userPrincipal"] };
}

/** SSO details from the Dynatrace partner */
export interface SSODetailsResponse {
  /** Whether the SSO is enabled for this resource or not. */
  isSsoEnabled?: SSOStatus;
  /** URL for Azure AD metadata */
  metadataUrl?: string;
  /** The login URL specific to this Dynatrace Environment */
  singleSignOnUrl?: string;
  /** array of Aad(azure active directory) domains */
  aadDomains?: string[];
  /** Array of admin user emails. */
  adminUsers?: string[];
}

export function ssoDetailsResponseDeserializer(item: any): SSODetailsResponse {
  return {
    isSsoEnabled: item["isSsoEnabled"],
    metadataUrl: item["metadataUrl"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
    adminUsers: !item["adminUsers"]
      ? item["adminUsers"]
      : item["adminUsers"].map((p: any) => {
          return p;
        }),
  };
}

/** Indicates whether SSO is enabled or not */
export enum KnownSSOStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether SSO is enabled or not \
 * {@link KnownSSOStatus} can be used interchangeably with SSOStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SSOStatus = string;

/** Request for getting all the linkable environments for a user */
export interface LinkableEnvironmentRequest {
  /** Tenant Id of the user in which they want to link the environment */
  tenantId: string;
  /** user principal id of the user */
  userPrincipal: string;
  /** Azure region in which we want to link the environment */
  region: string;
}

export function linkableEnvironmentRequestSerializer(item: LinkableEnvironmentRequest): any {
  return {
    tenantId: item["tenantId"],
    userPrincipal: item["userPrincipal"],
    region: item["region"],
  };
}

/** Response for getting all the linkable environments */
export interface _LinkableEnvironmentListResponse {
  /** The LinkableEnvironmentResponse items on this page */
  value: LinkableEnvironmentResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _linkableEnvironmentListResponseDeserializer(
  item: any,
): _LinkableEnvironmentListResponse {
  return {
    value: linkableEnvironmentResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function linkableEnvironmentResponseArrayDeserializer(
  result: Array<LinkableEnvironmentResponse>,
): any[] {
  return result.map((item) => {
    return linkableEnvironmentResponseDeserializer(item);
  });
}

/** Response for getting all the linkable environments */
export interface LinkableEnvironmentResponse {
  /** environment id for which user is an admin */
  environmentId?: string;
  /** Name of the environment */
  environmentName?: string;
  /** Billing plan information. */
  planData?: PlanData;
}

export function linkableEnvironmentResponseDeserializer(item: any): LinkableEnvironmentResponse {
  return {
    environmentId: item["environmentId"],
    environmentName: item["environmentName"],
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
  };
}

/** Request for getting connected resources count for a Marketplace Subscription Id */
export interface MarketplaceSubscriptionIdRequest {
  /** Marketplace Subscription Id */
  marketplaceSubscriptionId: string;
}

export function marketplaceSubscriptionIdRequestSerializer(
  item: MarketplaceSubscriptionIdRequest,
): any {
  return { marketplaceSubscriptionId: item["marketplaceSubscriptionId"] };
}

/** Response for getting Connected resources for a MP SaaS Resource */
export interface ConnectedResourcesCountResponse {
  /** Count of the connected resources */
  connectedResourcesCount?: number;
}

export function connectedResourcesCountResponseDeserializer(
  item: any,
): ConnectedResourcesCountResponse {
  return {
    connectedResourcesCount: item["connectedResourcesCount"],
  };
}

/** Request for getting Marketplace SaaS resource details for a tenant Id */
export interface MarketplaceSaaSResourceDetailsRequest {
  /** Tenant Id */
  tenantId: string;
}

export function marketplaceSaaSResourceDetailsRequestSerializer(
  item: MarketplaceSaaSResourceDetailsRequest,
): any {
  return { tenantId: item["tenantId"] };
}

/** Marketplace SaaS resource details linked to the given tenant Id */
export interface MarketplaceSaaSResourceDetailsResponse {
  /** Id of the Marketplace SaaS Resource */
  marketplaceSaaSResourceId?: string;
  /** Id of the plan */
  planId?: string;
  /** Marketplace subscription status */
  marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Name of the Marketplace SaaS Resource */
  marketplaceSaaSResourceName?: string;
}

export function marketplaceSaaSResourceDetailsResponseDeserializer(
  item: any,
): MarketplaceSaaSResourceDetailsResponse {
  return {
    marketplaceSaaSResourceId: item["marketplaceSaaSResourceId"],
    planId: item["planId"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSaaSResourceName: item["marketplaceSaaSResourceName"],
  };
}

/** Single sign-on configurations for a given monitor resource. */
export interface DynatraceSingleSignOnResource extends ProxyResource {
  /** State of Single Sign On */
  singleSignOnState?: SingleSignOnStates;
  /** Version of the Dynatrace agent installed on the VM. */
  enterpriseAppId?: string;
  /** The login URL specific to this Dynatrace Environment */
  singleSignOnUrl?: string;
  /** array of Aad(azure active directory) domains */
  aadDomains?: string[];
  /** Provisioning state of the resource. */
  readonly provisioningState?: ProvisioningState;
}

export function dynatraceSingleSignOnResourceSerializer(item: DynatraceSingleSignOnResource): any {
  return { properties: _dynatraceSingleSignOnResourcePropertiesSerializer(item) };
}

export function dynatraceSingleSignOnResourceDeserializer(
  item: any,
): DynatraceSingleSignOnResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._dynatraceSingleSignOnResourcePropertiesDeserializer(item["properties"]),
  };
}

/** The response of a DynatraceSingleSignOnResource list operation. */
export interface _DynatraceSingleSignOnResourceListResult {
  /** The DynatraceSingleSignOnResource items on this page */
  value: DynatraceSingleSignOnResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dynatraceSingleSignOnResourceListResultDeserializer(
  item: any,
): _DynatraceSingleSignOnResourceListResult {
  return {
    value: dynatraceSingleSignOnResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dynatraceSingleSignOnResourceArraySerializer(
  result: Array<DynatraceSingleSignOnResource>,
): any[] {
  return result.map((item) => {
    return dynatraceSingleSignOnResourceSerializer(item);
  });
}

export function dynatraceSingleSignOnResourceArrayDeserializer(
  result: Array<DynatraceSingleSignOnResource>,
): any[] {
  return result.map((item) => {
    return dynatraceSingleSignOnResourceDeserializer(item);
  });
}

/** Dynatrace resource can be created or not. */
export interface CreateResourceSupportedResponse {
  /** Represents the properties of the resource. */
  value?: CreateResourceSupportedProperties[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function createResourceSupportedResponseDeserializer(
  item: any,
): CreateResourceSupportedResponse {
  return {
    value: !item["value"]
      ? item["value"]
      : createResourceSupportedPropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function createResourceSupportedPropertiesArrayDeserializer(
  result: Array<CreateResourceSupportedProperties>,
): any[] {
  return result.map((item) => {
    return createResourceSupportedPropertiesDeserializer(item);
  });
}

/** Properties related to the support for creating Dynatrace resources. */
export interface CreateResourceSupportedProperties {
  /** The ARM id of the subscription. */
  readonly name?: string;
  /** Indicates if selected subscription supports Dynatrace resource creation, if not it is already being monitored for the selected organization via multi subscription feature. */
  readonly creationSupported?: boolean;
}

export function createResourceSupportedPropertiesDeserializer(
  item: any,
): CreateResourceSupportedProperties {
  return {
    name: item["name"],
    creationSupported: item["creationSupported"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-04-24 API version. */
  V20240424 = "2024-04-24",
}

export function _tagRulePropertiesSerializer(item: TagRule): any {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesSerializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesSerializer(item["metricRules"]),
  };
}

export function _tagRulePropertiesDeserializer(item: any) {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesDeserializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesDeserializer(item["metricRules"]),
    provisioningState: item["provisioningState"],
  };
}

export function _monitorResourcePropertiesSerializer(item: MonitorResource): any {
  return {
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSaasAutoRenew: item["marketplaceSaasAutoRenew"],
    dynatraceEnvironmentProperties: !item["dynatraceEnvironmentProperties"]
      ? item["dynatraceEnvironmentProperties"]
      : dynatraceEnvironmentPropertiesSerializer(item["dynatraceEnvironmentProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
  };
}

export function _monitorResourcePropertiesDeserializer(item: any) {
  return {
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSaasAutoRenew: item["marketplaceSaasAutoRenew"],
    dynatraceEnvironmentProperties: !item["dynatraceEnvironmentProperties"]
      ? item["dynatraceEnvironmentProperties"]
      : dynatraceEnvironmentPropertiesDeserializer(item["dynatraceEnvironmentProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoDeserializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
    liftrResourceCategory: item["liftrResourceCategory"],
    liftrResourcePreference: item["liftrResourcePreference"],
    provisioningState: item["provisioningState"],
  };
}

export function _dynatraceSingleSignOnResourcePropertiesSerializer(
  item: DynatraceSingleSignOnResource,
): any {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
  };
}

export function _dynatraceSingleSignOnResourcePropertiesDeserializer(item: any) {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    aadDomains: !item["aadDomains"]
      ? item["aadDomains"]
      : item["aadDomains"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
  };
}
