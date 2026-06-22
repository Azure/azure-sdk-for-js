// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

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

/** A tag rule belonging to NewRelic account */
export interface TagRule extends ProxyResource {
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
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

/** The resource-specific properties for this resource. */
export interface MonitoringTagRulesProperties {
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
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
    provisioningState: item["provisioningState"],
    logRules: !item["logRules"] ? item["logRules"] : logRulesDeserializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesDeserializer(item["metricRules"]),
  };
}

/** Provisioning State of the Monitor resource */
export enum KnownProvisioningState {
  /** Monitor resource creation request accepted */
  Accepted = "Accepted",
  /** Monitor resource creation started */
  Creating = "Creating",
  /** Monitor resource is being updated */
  Updating = "Updating",
  /** Monitor resource deletion started */
  Deleting = "Deleting",
  /** Monitor resource creation successful */
  Succeeded = "Succeeded",
  /** Monitor resource creation failed */
  Failed = "Failed",
  /** Monitor resource creation canceled */
  Canceled = "Canceled",
  /** Monitor resource is deleted */
  Deleted = "Deleted",
  /** Monitor resource state is unknown */
  NotSpecified = "NotSpecified",
}

/**
 * Provisioning State of the Monitor resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Monitor resource creation request accepted \
 * **Creating**: Monitor resource creation started \
 * **Updating**: Monitor resource is being updated \
 * **Deleting**: Monitor resource deletion started \
 * **Succeeded**: Monitor resource creation successful \
 * **Failed**: Monitor resource creation failed \
 * **Canceled**: Monitor resource creation canceled \
 * **Deleted**: Monitor resource is deleted \
 * **NotSpecified**: Monitor resource state is unknown
 */
export type ProvisioningState = string;

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
  /** Flag specifying if metrics should be sent for the Monitor resource. */
  sendMetrics?: SendMetricsStatus;
  /** List of filtering tags to be used for capturing metrics. */
  filteringTags?: FilteringTag[];
  /** Reusable representation of an email address */
  userEmail?: string;
}

export function metricRulesSerializer(item: MetricRules): any {
  return {
    sendMetrics: item["sendMetrics"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArraySerializer(item["filteringTags"]),
    userEmail: item["userEmail"],
  };
}

export function metricRulesDeserializer(item: any): MetricRules {
  return {
    sendMetrics: item["sendMetrics"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArrayDeserializer(item["filteringTags"]),
    userEmail: item["userEmail"],
  };
}

/** Indicates whether metrics are being sent. */
export enum KnownSendMetricsStatus {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Indicates whether metrics are being sent. \
 * {@link KnownSendMetricsStatus} can be used interchangeably with SendMetricsStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type SendMetricsStatus = string;

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

/** The type used for update operations of the TagRule. */
export interface TagRuleUpdate {
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
}

export function tagRuleUpdateSerializer(item: TagRuleUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["logRules", "metricRules"])
      ? undefined
      : _tagRuleUpdatePropertiesSerializer(item),
  };
}

/** The updatable properties of the TagRule. */
export interface TagRuleUpdateProperties {
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
}

export function tagRuleUpdatePropertiesSerializer(item: TagRuleUpdateProperties): any {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesSerializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesSerializer(item["metricRules"]),
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

/** The request to update subscriptions needed to be monitored by the NewRelic monitor resource. */
export interface MonitoredSubscriptionProperties extends ProxyResource {
  /** The request to update subscriptions needed to be monitored by the NewRelic monitor resource. */
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

/** The request to update subscriptions needed to be monitored by the NewRelic monitor resource. */
export interface SubscriptionList {
  /** The operation for the patch on the resource. */
  patchOperation?: PatchOperation;
  /** List of subscriptions and the state of the monitoring. */
  monitoredSubscriptionList?: MonitoredSubscription[];
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
}

export function subscriptionListSerializer(item: SubscriptionList): any {
  return {
    patchOperation: item["patchOperation"],
    monitoredSubscriptionList: !item["monitoredSubscriptionList"]
      ? item["monitoredSubscriptionList"]
      : monitoredSubscriptionArraySerializer(item["monitoredSubscriptionList"]),
  };
}

export function subscriptionListDeserializer(item: any): SubscriptionList {
  return {
    patchOperation: item["patchOperation"],
    monitoredSubscriptionList: !item["monitoredSubscriptionList"]
      ? item["monitoredSubscriptionList"]
      : monitoredSubscriptionArrayDeserializer(item["monitoredSubscriptionList"]),
    provisioningState: item["provisioningState"],
  };
}

/** The operation for the patch on the resource. */
export enum KnownPatchOperation {
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
 * {@link KnownPatchOperation} can be used interchangeably with PatchOperation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AddBegin** \
 * **AddComplete** \
 * **DeleteBegin** \
 * **DeleteComplete** \
 * **Active**
 */
export type PatchOperation = string;

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

/** The list of subscriptions and it's monitoring status by current NewRelic monitor. */
export interface MonitoredSubscription {
  /** The subscriptionId to be monitored. */
  subscriptionId?: string;
  /** The state of monitoring. */
  status?: Status;
  /** The reason of not monitoring the subscription. */
  error?: string;
  /** The resource-specific properties for this resource. */
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

/** Known values of {@link ConfigurationName} that the service accepts. */
export enum KnownConfigurationName {
  /** default */
  Default = "default",
}

/** Type of ConfigurationName */
export type ConfigurationName = string;

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

/** A Monitor Resource by NewRelic */
export interface NewRelicMonitorResource extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** MonitoringStatus of the resource */
  readonly monitoringStatus?: MonitoringStatus;
  /** NewRelic Organization properties of the resource */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace Subscription Id */
  readonly marketplaceSubscriptionId?: string;
  /** MarketplaceSubscriptionStatus of the resource */
  newRelicAccountProperties?: NewRelicAccountProperties;
  /** User Info */
  userInfo?: UserInfo;
  /** Plan details */
  planData?: PlanData;
  /** SaaS details */
  saaSData?: SaaSData;
  /** Liftr resource category */
  readonly liftrResourceCategory?: LiftrResourceCategories;
  /** Liftr resource preference. The priority of the resource. */
  readonly liftrResourcePreference?: number;
  /** Source of org creation */
  orgCreationSource?: OrgCreationSource;
  /** Source of account creation */
  accountCreationSource?: AccountCreationSource;
  /** State of the Azure Subscription containing the monitor resource */
  subscriptionState?: string;
  /** Status of Azure Subscription where Marketplace SaaS is located. */
  saaSAzureSubscriptionStatus?: string;
}

export function newRelicMonitorResourceSerializer(item: NewRelicMonitorResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _newRelicMonitorResourcePropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function newRelicMonitorResourceDeserializer(item: any): NewRelicMonitorResource {
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
    ..._newRelicMonitorResourcePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties specific to the NewRelic Monitor resource */
export interface MonitorProperties {
  /** Provisioning State of the resource */
  readonly provisioningState?: ProvisioningState;
  /** MonitoringStatus of the resource */
  readonly monitoringStatus?: MonitoringStatus;
  /** NewRelic Organization properties of the resource */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Marketplace Subscription Id */
  readonly marketplaceSubscriptionId?: string;
  /** MarketplaceSubscriptionStatus of the resource */
  newRelicAccountProperties?: NewRelicAccountProperties;
  /** User Info */
  userInfo?: UserInfo;
  /** Plan details */
  planData?: PlanData;
  /** SaaS details */
  saaSData?: SaaSData;
  /** Liftr resource category */
  readonly liftrResourceCategory?: LiftrResourceCategories;
  /** Liftr resource preference. The priority of the resource. */
  readonly liftrResourcePreference?: number;
  /** Source of org creation */
  orgCreationSource?: OrgCreationSource;
  /** Source of account creation */
  accountCreationSource?: AccountCreationSource;
  /** State of the Azure Subscription containing the monitor resource */
  subscriptionState?: string;
  /** Status of Azure Subscription where Marketplace SaaS is located. */
  saaSAzureSubscriptionStatus?: string;
}

export function monitorPropertiesSerializer(item: MonitorProperties): any {
  return {
    newRelicAccountProperties: !item["newRelicAccountProperties"]
      ? item["newRelicAccountProperties"]
      : newRelicAccountPropertiesSerializer(item["newRelicAccountProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataSerializer(item["saaSData"]),
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
    subscriptionState: item["subscriptionState"],
    saaSAzureSubscriptionStatus: item["saaSAzureSubscriptionStatus"],
  };
}

export function monitorPropertiesDeserializer(item: any): MonitorProperties {
  return {
    provisioningState: item["provisioningState"],
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    newRelicAccountProperties: !item["newRelicAccountProperties"]
      ? item["newRelicAccountProperties"]
      : newRelicAccountPropertiesDeserializer(item["newRelicAccountProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoDeserializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataDeserializer(item["saaSData"]),
    liftrResourceCategory: item["liftrResourceCategory"],
    liftrResourcePreference: item["liftrResourcePreference"],
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
    subscriptionState: item["subscriptionState"],
    saaSAzureSubscriptionStatus: item["saaSAzureSubscriptionStatus"],
  };
}

/** Flag specifying if the resource monitoring is enabled or disabled. */
export enum KnownMonitoringStatus {
  /** monitoring is enabled */
  Enabled = "Enabled",
  /** monitoring is disabled */
  Disabled = "Disabled",
}

/**
 * Flag specifying if the resource monitoring is enabled or disabled. \
 * {@link KnownMonitoringStatus} can be used interchangeably with MonitoringStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: monitoring is enabled \
 * **Disabled**: monitoring is disabled
 */
export type MonitoringStatus = string;

/** Flag specifying the Marketplace Subscription Status of the resource. If payment is not made in time, the resource will go in Suspended state. */
export enum KnownMarketplaceSubscriptionStatus {
  /** monitoring is enabled */
  Active = "Active",
  /** monitoring is disabled */
  Suspended = "Suspended",
}

/**
 * Flag specifying the Marketplace Subscription Status of the resource. If payment is not made in time, the resource will go in Suspended state. \
 * {@link KnownMarketplaceSubscriptionStatus} can be used interchangeably with MarketplaceSubscriptionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: monitoring is enabled \
 * **Suspended**: monitoring is disabled
 */
export type MarketplaceSubscriptionStatus = string;

/** Properties of the NewRelic account */
export interface NewRelicAccountProperties {
  /** User id */
  userId?: string;
  /** NewRelic Account Information */
  accountInfo?: AccountInfo;
  /** NewRelic Organization Information */
  organizationInfo?: OrganizationInfo;
  /** date when plan was applied */
  singleSignOnProperties?: NewRelicSingleSignOnProperties;
}

export function newRelicAccountPropertiesSerializer(item: NewRelicAccountProperties): any {
  return {
    userId: item["userId"],
    accountInfo: !item["accountInfo"]
      ? item["accountInfo"]
      : accountInfoSerializer(item["accountInfo"]),
    organizationInfo: !item["organizationInfo"]
      ? item["organizationInfo"]
      : organizationInfoSerializer(item["organizationInfo"]),
    singleSignOnProperties: !item["singleSignOnProperties"]
      ? item["singleSignOnProperties"]
      : newRelicSingleSignOnPropertiesSerializer(item["singleSignOnProperties"]),
  };
}

export function newRelicAccountPropertiesDeserializer(item: any): NewRelicAccountProperties {
  return {
    userId: item["userId"],
    accountInfo: !item["accountInfo"]
      ? item["accountInfo"]
      : accountInfoDeserializer(item["accountInfo"]),
    organizationInfo: !item["organizationInfo"]
      ? item["organizationInfo"]
      : organizationInfoDeserializer(item["organizationInfo"]),
    singleSignOnProperties: !item["singleSignOnProperties"]
      ? item["singleSignOnProperties"]
      : newRelicSingleSignOnPropertiesDeserializer(item["singleSignOnProperties"]),
  };
}

/** Account Info of the NewRelic account */
export interface AccountInfo {
  /** Account id */
  accountId?: string;
  /** Credential string. */
  ingestionKey?: string;
  /** Region where New Relic account is present */
  region?: string;
}

export function accountInfoSerializer(item: AccountInfo): any {
  return {
    accountId: item["accountId"],
    ingestionKey: item["ingestionKey"],
    region: item["region"],
  };
}

export function accountInfoDeserializer(item: any): AccountInfo {
  return {
    accountId: item["accountId"],
    ingestionKey: item["ingestionKey"],
    region: item["region"],
  };
}

/** Organization Info of the NewRelic account */
export interface OrganizationInfo {
  /** Organization id */
  organizationId?: string;
}

export function organizationInfoSerializer(item: OrganizationInfo): any {
  return { organizationId: item["organizationId"] };
}

export function organizationInfoDeserializer(item: any): OrganizationInfo {
  return {
    organizationId: item["organizationId"],
  };
}

/** Single sign on Info of the NewRelic account */
export interface NewRelicSingleSignOnProperties {
  /** Single sign-on state */
  singleSignOnState?: SingleSignOnStates;
  /** The Id of the Enterprise App used for Single sign-on. */
  enterpriseAppId?: string;
  /** The login URL specific to this NewRelic Organization */
  singleSignOnUrl?: string;
  /** Provisioning state */
  provisioningState?: ProvisioningState;
}

export function newRelicSingleSignOnPropertiesSerializer(
  item: NewRelicSingleSignOnProperties,
): any {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
    provisioningState: item["provisioningState"],
  };
}

export function newRelicSingleSignOnPropertiesDeserializer(
  item: any,
): NewRelicSingleSignOnProperties {
  return {
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
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

/** User Info of NewRelic Monitor resource */
export interface UserInfo {
  /** First name */
  firstName?: string;
  /** Last name */
  lastName?: string;
  /** Reusable representation of an email address */
  emailAddress?: string;
  /** Contact phone number */
  phoneNumber?: string;
  /** country if user */
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

/** Plan data of NewRelic Monitor resource */
export interface PlanData {
  /** Different usage type like PAYG/COMMITTED. this could be enum */
  usageType?: UsageType;
  /** Different billing cycles like Monthly/Weekly. */
  billingCycle?: string;
  /** plan id as published by NewRelic */
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

/** Different usage type like PAYG/COMMITTED */
export enum KnownUsageType {
  /** Usage type is PAYG */
  Payg = "PAYG",
  /** Usage type is COMMITTED */
  Committed = "COMMITTED",
}

/**
 * Different usage type like PAYG/COMMITTED \
 * {@link KnownUsageType} can be used interchangeably with UsageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PAYG**: Usage type is PAYG \
 * **COMMITTED**: Usage type is COMMITTED
 */
export type UsageType = string;

/** SaaS details */
export interface SaaSData {
  /** SaaS resource id */
  saaSResourceId?: string;
}

export function saaSDataSerializer(item: SaaSData): any {
  return { saaSResourceId: item["saaSResourceId"] };
}

export function saaSDataDeserializer(item: any): SaaSData {
  return {
    saaSResourceId: item["saaSResourceId"],
  };
}

/** Liftr Resource category. */
export enum KnownLiftrResourceCategories {
  /** Unknown */
  Unknown = "Unknown",
  /** MonitorLogs */
  MonitorLogs = "MonitorLogs",
}

/**
 * Liftr Resource category. \
 * {@link KnownLiftrResourceCategories} can be used interchangeably with LiftrResourceCategories,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **MonitorLogs**
 */
export type LiftrResourceCategories = string;

/** Source of Org creation */
export enum KnownOrgCreationSource {
  /** Org is created from LIFTR */
  Liftr = "LIFTR",
  /** Org is created from NEWRELIC */
  Newrelic = "NEWRELIC",
}

/**
 * Source of Org creation \
 * {@link KnownOrgCreationSource} can be used interchangeably with OrgCreationSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LIFTR**: Org is created from LIFTR \
 * **NEWRELIC**: Org is created from NEWRELIC
 */
export type OrgCreationSource = string;

/** Source of Account creation */
export enum KnownAccountCreationSource {
  /** Account is created from LIFTR */
  Liftr = "LIFTR",
  /** Account is created from NEWRELIC */
  Newrelic = "NEWRELIC",
}

/**
 * Source of Account creation \
 * {@link KnownAccountCreationSource} can be used interchangeably with AccountCreationSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LIFTR**: Account is created from LIFTR \
 * **NEWRELIC**: Account is created from NEWRELIC
 */
export type AccountCreationSource = string;

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
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
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

/** The type used for update operations of the NewRelicMonitorResource. */
export interface NewRelicMonitorResourceUpdate {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** MarketplaceSubscriptionStatus of the resource */
  newRelicAccountProperties?: NewRelicAccountProperties;
  /** User Info */
  userInfo?: UserInfo;
  /** Plan details */
  planData?: PlanData;
  /** SaaS details */
  saaSData?: SaaSData;
  /** Source of org creation */
  orgCreationSource?: OrgCreationSource;
  /** Source of account creation */
  accountCreationSource?: AccountCreationSource;
}

export function newRelicMonitorResourceUpdateSerializer(item: NewRelicMonitorResourceUpdate): any {
  return {
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    tags: item["tags"],
    properties: areAllPropsUndefined(item, [
      "newRelicAccountProperties",
      "userInfo",
      "planData",
      "saaSData",
      "orgCreationSource",
      "accountCreationSource",
    ])
      ? undefined
      : _newRelicMonitorResourceUpdatePropertiesSerializer(item),
  };
}

/** The updatable properties of the NewRelicMonitorResource. */
export interface NewRelicMonitorResourceUpdateProperties {
  /** MarketplaceSubscriptionStatus of the resource */
  newRelicAccountProperties?: NewRelicAccountProperties;
  /** User Info */
  userInfo?: UserInfo;
  /** Plan details */
  planData?: PlanData;
  /** SaaS details */
  saaSData?: SaaSData;
  /** Source of org creation */
  orgCreationSource?: OrgCreationSource;
  /** Source of account creation */
  accountCreationSource?: AccountCreationSource;
}

export function newRelicMonitorResourceUpdatePropertiesSerializer(
  item: NewRelicMonitorResourceUpdateProperties,
): any {
  return {
    newRelicAccountProperties: !item["newRelicAccountProperties"]
      ? item["newRelicAccountProperties"]
      : newRelicAccountPropertiesSerializer(item["newRelicAccountProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataSerializer(item["saaSData"]),
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
  };
}

/** The response of a NewRelicMonitorResource list operation. */
export interface _NewRelicMonitorResourceListResult {
  /** The NewRelicMonitorResource items on this page */
  value: NewRelicMonitorResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _newRelicMonitorResourceListResultDeserializer(
  item: any,
): _NewRelicMonitorResourceListResult {
  return {
    value: newRelicMonitorResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function newRelicMonitorResourceArraySerializer(
  result: Array<NewRelicMonitorResource>,
): any[] {
  return result.map((item) => {
    return newRelicMonitorResourceSerializer(item);
  });
}

export function newRelicMonitorResourceArrayDeserializer(
  result: Array<NewRelicMonitorResource>,
): any[] {
  return result.map((item) => {
    return newRelicMonitorResourceDeserializer(item);
  });
}

/** Request of get metrics Operation. */
export interface MetricsRequest {
  /** Reusable representation of an email address */
  userEmail: string;
}

export function metricsRequestSerializer(item: MetricsRequest): any {
  return { userEmail: item["userEmail"] };
}

/** Request of get metrics status Operation. */
export interface MetricsStatusRequest {
  /** Azure resource IDs */
  azureResourceIds?: string[];
  /** Reusable representation of an email address */
  userEmail: string;
}

export function metricsStatusRequestSerializer(item: MetricsStatusRequest): any {
  return {
    azureResourceIds: !item["azureResourceIds"]
      ? item["azureResourceIds"]
      : item["azureResourceIds"].map((p: any) => {
          return p;
        }),
    userEmail: item["userEmail"],
  };
}

/** Response of get metrics status Operation. */
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

/** Request of a app services get Operation. */
export interface AppServicesGetRequest {
  /** Azure resource IDs */
  azureResourceIds?: string[];
  /** Reusable representation of an email address */
  userEmail: string;
}

export function appServicesGetRequestSerializer(item: AppServicesGetRequest): any {
  return {
    azureResourceIds: !item["azureResourceIds"]
      ? item["azureResourceIds"]
      : item["azureResourceIds"].map((p: any) => {
          return p;
        }),
    userEmail: item["userEmail"],
  };
}

/** Response of a list app services Operation. */
export interface _AppServicesListResponse {
  /** The AppServiceInfo items on this page */
  value: AppServiceInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _appServicesListResponseDeserializer(item: any): _AppServicesListResponse {
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

/** Details of VM Resource having NewRelic OneAgent installed */
export interface AppServiceInfo {
  /** Azure App service resource ID */
  azureResourceId?: string;
  /** Version of the NewRelic agent installed on the App service. */
  agentVersion?: string;
  /** Status of the NewRelic agent installed on the App service. */
  agentStatus?: string;
}

export function appServiceInfoDeserializer(item: any): AppServiceInfo {
  return {
    azureResourceId: item["azureResourceId"],
    agentVersion: item["agentVersion"],
    agentStatus: item["agentStatus"],
  };
}

/** Request of a switch billing Operation. */
export interface SwitchBillingRequest {
  /** Azure resource Id */
  azureResourceId?: string;
  /** Organization id */
  organizationId?: string;
  /** Plan details */
  planData?: PlanData;
  /** Reusable representation of an email address */
  userEmail: string;
}

export function switchBillingRequestSerializer(item: SwitchBillingRequest): any {
  return {
    azureResourceId: item["azureResourceId"],
    organizationId: item["organizationId"],
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
    userEmail: item["userEmail"],
  };
}

/** Request of a Hosts get Operation. */
export interface HostsGetRequest {
  /** VM resource IDs */
  vmIds?: string[];
  /** Reusable representation of an email address */
  userEmail: string;
}

export function hostsGetRequestSerializer(item: HostsGetRequest): any {
  return {
    vmIds: !item["vmIds"]
      ? item["vmIds"]
      : item["vmIds"].map((p: any) => {
          return p;
        }),
    userEmail: item["userEmail"],
  };
}

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

/** Details of VM Resource having NewRelic OneAgent installed */
export interface VMInfo {
  /** Azure VM resource ID */
  vmId?: string;
  /** Version of the NewRelic agent installed on the VM. */
  agentVersion?: string;
  /** Status of the NewRelic agent installed on the VM. */
  agentStatus?: string;
}

export function vmInfoDeserializer(item: any): VMInfo {
  return {
    vmId: item["vmId"],
    agentVersion: item["agentVersion"],
    agentStatus: item["agentStatus"],
  };
}

/** List of all the resources being monitored by NewRelic monitor resource */
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

/** Details of resource being monitored by NewRelic monitor resource */
export interface MonitoredResource {
  /** The ARM id of the resource. */
  id?: string;
  /** Flag indicating if resource is sending metrics to NewRelic. */
  sendingMetrics?: SendingMetricsStatus;
  /** Reason for why the resource is sending metrics (or why it is not sending). */
  reasonForMetricsStatus?: string;
  /** Flag indicating if resource is sending logs to NewRelic. */
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

/** Response of a list operation. */
export interface _LinkedResourceListResponse {
  /** The LinkedResource items on this page */
  value: LinkedResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _linkedResourceListResponseDeserializer(item: any): _LinkedResourceListResponse {
  return {
    value: linkedResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function linkedResourceArrayDeserializer(result: Array<LinkedResource>): any[] {
  return result.map((item) => {
    return linkedResourceDeserializer(item);
  });
}

/** The definition of a linked resource. */
export interface LinkedResource {
  /** The ARM id of the linked resource. */
  id?: string;
}

export function linkedResourceDeserializer(item: any): LinkedResource {
  return {
    id: item["id"],
  };
}

/** Response of payload to be passed while installing VM agent. */
export interface VMExtensionPayload {
  /** Ingestion key of the account */
  ingestionKey?: string;
}

export function vmExtensionPayloadDeserializer(item: any): VMExtensionPayload {
  return {
    ingestionKey: item["ingestionKey"],
  };
}

/** Response of get latest linked SaaS resource operation */
export interface LatestLinkedSaaSResponse {
  /** SaaS resource id */
  saaSResourceId?: string;
  /** Flag indicating if the SaaS resource is hidden */
  isHiddenSaaS?: boolean;
}

export function latestLinkedSaaSResponseDeserializer(item: any): LatestLinkedSaaSResponse {
  return {
    saaSResourceId: item["saaSResourceId"],
    isHiddenSaaS: item["isHiddenSaaS"],
  };
}

/** Resubscribe Properties */
export interface ResubscribeProperties {
  /** Newly selected plan Id to create the new Marketplace subscription for Resubscribe */
  planId?: string;
  /** Newly selected term Id to create the new Marketplace subscription for Resubscribe */
  termId?: string;
  /** Newly selected Azure Subscription Id in which the new Marketplace subscription will be created for Resubscribe */
  subscriptionId?: string;
  /** Newly selected Azure resource group in which the new Marketplace subscription will be created for Resubscribe */
  resourceGroup?: string;
  /** Organization Id of the NewRelic Organization that needs to be resubscribed */
  organizationId?: string;
  /** Publisher Id of the NewRelic offer that needs to be resubscribed */
  publisherId?: string;
  /** Offer Id of the NewRelic offer that needs to be resubscribed */
  offerId?: string;
}

export function resubscribePropertiesSerializer(item: ResubscribeProperties): any {
  return {
    planId: item["planId"],
    termId: item["termId"],
    subscriptionId: item["subscriptionId"],
    resourceGroup: item["resourceGroup"],
    organizationId: item["organizationId"],
    publisherId: item["publisherId"],
    offerId: item["offerId"],
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

/** Marketplace SAAS Info of the resource. */
export interface MarketplaceSaaSInfo {
  /** Marketplace Subscription Id. This is a GUID-formatted string. */
  marketplaceSubscriptionId?: string;
  /** Marketplace Subscription Details: SAAS Name */
  marketplaceSubscriptionName?: string;
  /** Marketplace Subscription Details: Resource URI */
  marketplaceResourceId?: string;
  /** Marketplace Subscription Details: SaaS Subscription Status */
  marketplaceStatus?: string;
  /** The Azure Subscription ID to which the Marketplace Subscription belongs and gets billed into. */
  billedAzureSubscriptionId?: string;
  /** Publisher Id of the Marketplace offer. */
  publisherId?: string;
  /** Offer Id of the Marketplace offer, */
  offerId?: string;
}

export function marketplaceSaaSInfoDeserializer(item: any): MarketplaceSaaSInfo {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    marketplaceSubscriptionName: item["marketplaceSubscriptionName"],
    marketplaceResourceId: item["marketplaceResourceId"],
    marketplaceStatus: item["marketplaceStatus"],
    billedAzureSubscriptionId: item["billedAzureSubscriptionId"],
    publisherId: item["publisherId"],
    offerId: item["offerId"],
  };
}

/** Partner Billing details associated with the resource. */
export interface PartnerBillingEntity {
  /** The New Relic Organization Id. */
  organizationId?: string;
  /** The New Relic Organization Name. */
  organizationName?: string;
}

export function partnerBillingEntityDeserializer(item: any): PartnerBillingEntity {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
  };
}

/** List of all active newrelic deployments. */
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
  /** NewRelic account name */
  accountName?: string;
  /** NewRelic Account Id */
  accountId?: string;
  /** The azure resource Id of the deployment. */
  azureResourceId?: string;
  /** The location of the deployment. */
  location?: string;
}

export function connectedPartnerResourcePropertiesDeserializer(
  item: any,
): ConnectedPartnerResourceProperties {
  return {
    accountName: item["accountName"],
    accountId: item["accountId"],
    azureResourceId: item["azureResourceId"],
    location: item["location"],
  };
}

/** Response of get all accounts Operation. */
export interface _AccountsListResponse {
  /** The AccountResource items on this page */
  value: AccountResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _accountsListResponseDeserializer(item: any): _AccountsListResponse {
  return {
    value: accountResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function accountResourceArrayDeserializer(result: Array<AccountResource>): any[] {
  return result.map((item) => {
    return accountResourceDeserializer(item);
  });
}

/** The details of a account resource. */
export interface AccountResource extends ProxyResource {
  /** organization id */
  organizationId?: string;
  /** account id */
  accountId?: string;
  /** account name */
  accountName?: string;
  /** Region where New Relic account is present */
  region?: string;
}

export function accountResourceDeserializer(item: any): AccountResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _accountResourcePropertiesDeserializer(item["properties"])),
  };
}

/** List of all the New relic accounts for the given user */
export interface AccountProperties {
  /** organization id */
  organizationId?: string;
  /** account id */
  accountId?: string;
  /** account name */
  accountName?: string;
  /** Region where New Relic account is present */
  region?: string;
}

export function accountPropertiesDeserializer(item: any): AccountProperties {
  return {
    organizationId: item["organizationId"],
    accountId: item["accountId"],
    accountName: item["accountName"],
    region: item["region"],
  };
}

/** Response of get all organizations Operation. */
export interface _OrganizationsListResponse {
  /** The OrganizationResource items on this page */
  value: OrganizationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _organizationsListResponseDeserializer(item: any): _OrganizationsListResponse {
  return {
    value: organizationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function organizationResourceArrayDeserializer(result: Array<OrganizationResource>): any[] {
  return result.map((item) => {
    return organizationResourceDeserializer(item);
  });
}

/** The details of a Organization resource. */
export interface OrganizationResource extends ProxyResource {
  /** organization id */
  organizationId?: string;
  /** organization name */
  organizationName?: string;
  /** Billing source */
  billingSource?: BillingSource;
}

export function organizationResourceDeserializer(item: any): OrganizationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _organizationResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Details of Organizations */
export interface OrganizationProperties {
  /** organization id */
  organizationId?: string;
  /** organization name */
  organizationName?: string;
  /** Billing source */
  billingSource?: BillingSource;
}

export function organizationPropertiesDeserializer(item: any): OrganizationProperties {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
    billingSource: item["billingSource"],
  };
}

/** Billing source */
export enum KnownBillingSource {
  /** Billing source is Azure */
  Azure = "AZURE",
  /** NEWRELIC */
  Newrelic = "NEWRELIC",
}

/**
 * Billing source \
 * {@link KnownBillingSource} can be used interchangeably with BillingSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AZURE**: Billing source is Azure \
 * **NEWRELIC**
 */
export type BillingSource = string;

/** Response of get all plan data Operation. */
export interface _PlanDataListResponse {
  /** The PlanDataResource items on this page */
  value: PlanDataResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _planDataListResponseDeserializer(item: any): _PlanDataListResponse {
  return {
    value: planDataResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function planDataResourceArrayDeserializer(result: Array<PlanDataResource>): any[] {
  return result.map((item) => {
    return planDataResourceDeserializer(item);
  });
}

/** The details of a PlanData resource. */
export interface PlanDataResource extends ProxyResource {
  /** Plan details */
  planData?: PlanData;
  /** Source of org creation */
  orgCreationSource?: OrgCreationSource;
  /** Source of account creation */
  accountCreationSource?: AccountCreationSource;
}

export function planDataResourceDeserializer(item: any): PlanDataResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _planDataResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Plan details */
export interface PlanDataProperties {
  /** Plan details */
  planData?: PlanData;
  /** Source of org creation */
  orgCreationSource?: OrgCreationSource;
  /** Source of account creation */
  accountCreationSource?: AccountCreationSource;
}

export function planDataPropertiesDeserializer(item: any): PlanDataProperties {
  return {
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
  };
}

/** SaaS guid & PublishedId for Activate and Validate SaaS Resource */
export interface ActivateSaaSParameterRequest {
  /** SaaS guid for Activate and Validate SaaS Resource */
  saasGuid: string;
  /** Publisher Id for NewRelic resource */
  publisherId: string;
}

export function activateSaaSParameterRequestSerializer(item: ActivateSaaSParameterRequest): any {
  return { saasGuid: item["saasGuid"], publisherId: item["publisherId"] };
}

/** Marketplace SaaS resource details. */
export interface SaaSResourceDetailsResponse extends ProxyResource {
  /** Id of the Marketplace SaaS Resource */
  saasId?: string;
}

export function saaSResourceDetailsResponseDeserializer(item: any): SaaSResourceDetailsResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    saasId: item["saasId"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-05-01-preview API version. */
  V20250501Preview = "2025-05-01-preview",
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
    provisioningState: item["provisioningState"],
    logRules: !item["logRules"] ? item["logRules"] : logRulesDeserializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesDeserializer(item["metricRules"]),
  };
}

export function _tagRuleUpdatePropertiesSerializer(item: TagRuleUpdate): any {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesSerializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesSerializer(item["metricRules"]),
  };
}

export function _newRelicMonitorResourcePropertiesSerializer(item: NewRelicMonitorResource): any {
  return {
    newRelicAccountProperties: !item["newRelicAccountProperties"]
      ? item["newRelicAccountProperties"]
      : newRelicAccountPropertiesSerializer(item["newRelicAccountProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataSerializer(item["saaSData"]),
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
    subscriptionState: item["subscriptionState"],
    saaSAzureSubscriptionStatus: item["saaSAzureSubscriptionStatus"],
  };
}

export function _newRelicMonitorResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    newRelicAccountProperties: !item["newRelicAccountProperties"]
      ? item["newRelicAccountProperties"]
      : newRelicAccountPropertiesDeserializer(item["newRelicAccountProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoDeserializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataDeserializer(item["saaSData"]),
    liftrResourceCategory: item["liftrResourceCategory"],
    liftrResourcePreference: item["liftrResourcePreference"],
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
    subscriptionState: item["subscriptionState"],
    saaSAzureSubscriptionStatus: item["saaSAzureSubscriptionStatus"],
  };
}

export function _newRelicMonitorResourceUpdatePropertiesSerializer(
  item: NewRelicMonitorResourceUpdate,
): any {
  return {
    newRelicAccountProperties: !item["newRelicAccountProperties"]
      ? item["newRelicAccountProperties"]
      : newRelicAccountPropertiesSerializer(item["newRelicAccountProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    planData: !item["planData"] ? item["planData"] : planDataSerializer(item["planData"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataSerializer(item["saaSData"]),
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
  };
}

export function _accountResourcePropertiesDeserializer(item: any) {
  return {
    organizationId: item["organizationId"],
    accountId: item["accountId"],
    accountName: item["accountName"],
    region: item["region"],
  };
}

export function _organizationResourcePropertiesDeserializer(item: any) {
  return {
    organizationId: item["organizationId"],
    organizationName: item["organizationName"],
    billingSource: item["billingSource"],
  };
}

export function _planDataResourcePropertiesDeserializer(item: any) {
  return {
    planData: !item["planData"] ? item["planData"] : planDataDeserializer(item["planData"]),
    orgCreationSource: item["orgCreationSource"],
    accountCreationSource: item["accountCreationSource"],
  };
}
