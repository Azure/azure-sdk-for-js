// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Represents a paginated list of operation results. */
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

/** A Microsoft.Datadog REST API operation. */
export interface OperationResult {
  /** Operation name, i.e., {provider}/{resource}/{operation}. */
  name?: string;
  /** The object that represents the operation. */
  display?: OperationDisplay;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider, i.e., Microsoft.Datadog. */
  provider?: string;
  /** Type on which the operation is performed, e.g., 'monitors'. */
  resource?: string;
  /** Operation type, e.g., read, write, delete, etc. */
  operation?: string;
  /** Description of the operation, e.g., 'Write monitors'. */
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

/** Response of get latest linked SaaS resource operation */
export interface LatestLinkedSaaSResponse {
  /** Flag indicating if the SaaS resource is hidden */
  isHiddenSaaS?: boolean;
  /** SaaS resource id */
  saaSResourceId?: string;
}

export function latestLinkedSaaSResponseDeserializer(item: any): LatestLinkedSaaSResponse {
  return {
    isHiddenSaaS: item["isHiddenSaaS"],
    saaSResourceId: item["saaSResourceId"],
  };
}

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

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface DatadogMonitorResource extends TrackedResource {
  /** Properties specific to the monitor resource. */
  properties?: MonitorProperties;
  sku?: ResourceSku;
  identity?: IdentityProperties;
}

export function datadogMonitorResourceSerializer(item: DatadogMonitorResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : monitorPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityPropertiesSerializer(item["identity"]),
  };
}

export function datadogMonitorResourceDeserializer(item: any): DatadogMonitorResource {
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
    properties: !item["properties"]
      ? item["properties"]
      : monitorPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : resourceSkuDeserializer(item["sku"]),
    identity: !item["identity"]
      ? item["identity"]
      : identityPropertiesDeserializer(item["identity"]),
  };
}

/** Properties specific to the monitor resource. */
export interface MonitorProperties {
  readonly provisioningState?: ProvisioningState;
  /** Flag specifying if the resource monitoring is enabled or disabled. */
  monitoringStatus?: MonitoringStatus;
  /** Flag specifying the Marketplace Subscription Status of the resource. If payment is not made in time, the resource will go in Suspended state. */
  readonly marketplaceSubscriptionStatus?: MarketplaceSubscriptionStatus;
  /** Specify the Datadog organization name. In the case of linking to existing organizations, Id, ApiKey, and Applicationkey is required as well. */
  datadogOrganizationProperties?: DatadogOrganizationProperties;
  /** Includes name, email and optionally, phone number. User Information can't be null. */
  userInfo?: UserInfo;
  readonly liftrResourceCategory?: LiftrResourceCategories;
  /** The priority of the resource. */
  readonly liftrResourcePreference?: number;
  /** SaaS details */
  saaSData?: SaaSData;
  /** SRE Agent configuration to connect to MCP server of Datadog for given organization. */
  sreAgentConfiguration?: SreAgentConfiguration[];
  /**
   * Details about the marketplace offer associated with the resource.
   * Required for API version 2025-11 and later.
   * For earlier API versions, defaults to the legacy offer.
   */
  marketplaceOfferDetails?: MarketplaceOfferDetails;
}

export function monitorPropertiesSerializer(item: MonitorProperties): any {
  return {
    monitoringStatus: item["monitoringStatus"],
    datadogOrganizationProperties: !item["datadogOrganizationProperties"]
      ? item["datadogOrganizationProperties"]
      : datadogOrganizationPropertiesSerializer(item["datadogOrganizationProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataSerializer(item["saaSData"]),
    sreAgentConfiguration: !item["sreAgentConfiguration"]
      ? item["sreAgentConfiguration"]
      : sreAgentConfigurationArraySerializer(item["sreAgentConfiguration"]),
    marketplaceOfferDetails: !item["marketplaceOfferDetails"]
      ? item["marketplaceOfferDetails"]
      : marketplaceOfferDetailsSerializer(item["marketplaceOfferDetails"]),
  };
}

export function monitorPropertiesDeserializer(item: any): MonitorProperties {
  return {
    provisioningState: item["provisioningState"],
    monitoringStatus: item["monitoringStatus"],
    marketplaceSubscriptionStatus: item["marketplaceSubscriptionStatus"],
    datadogOrganizationProperties: !item["datadogOrganizationProperties"]
      ? item["datadogOrganizationProperties"]
      : datadogOrganizationPropertiesDeserializer(item["datadogOrganizationProperties"]),
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoDeserializer(item["userInfo"]),
    liftrResourceCategory: item["liftrResourceCategory"],
    liftrResourcePreference: item["liftrResourcePreference"],
    saaSData: !item["saaSData"] ? item["saaSData"] : saaSDataDeserializer(item["saaSData"]),
    sreAgentConfiguration: !item["sreAgentConfiguration"]
      ? item["sreAgentConfiguration"]
      : sreAgentConfigurationArrayDeserializer(item["sreAgentConfiguration"]),
    marketplaceOfferDetails: !item["marketplaceOfferDetails"]
      ? item["marketplaceOfferDetails"]
      : marketplaceOfferDetailsDeserializer(item["marketplaceOfferDetails"]),
  };
}

/** Known values of {@link ProvisioningState} that the service accepts. */
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

/** Type of ProvisioningState */
export type ProvisioningState = string;

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
  /** Provisioning */
  Provisioning = "Provisioning",
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
 * **Provisioning** \
 * **Active** \
 * **Suspended** \
 * **Unsubscribed**
 */
export type MarketplaceSubscriptionStatus = string;

/** Specify the Datadog organization name. In the case of linking to existing organizations, Id, ApiKey, and Applicationkey is required as well. */
export interface DatadogOrganizationProperties {
  /** Name of the Datadog organization. */
  name?: string;
  /** Id of the Datadog organization. */
  id?: string;
  /** The auth code used to linking to an existing Datadog organization. */
  linkingAuthCode?: string;
  /** The client_id from an existing in exchange for an auth token to link organization. */
  linkingClientId?: string;
  /** The redirect URI for linking. */
  redirectUri?: string;
  /** Api key associated to the Datadog organization. */
  apiKey?: string;
  /** Application key associated to the Datadog organization. */
  applicationKey?: string;
  /** The Id of the Enterprise App used for Single sign on. */
  enterpriseAppId?: string;
  /** The configuration which describes the state of cloud security posture management. This collects configuration information for all resources in a subscription and track conformance to industry benchmarks. */
  cspm?: boolean;
  /** The configuration which describes the state of resource collection. This collects configuration information for all resources in a subscription. */
  resourceCollection?: boolean;
}

export function datadogOrganizationPropertiesSerializer(item: DatadogOrganizationProperties): any {
  return {
    name: item["name"],
    id: item["id"],
    linkingAuthCode: item["linkingAuthCode"],
    linkingClientId: item["linkingClientId"],
    redirectUri: item["redirectUri"],
    apiKey: item["apiKey"],
    applicationKey: item["applicationKey"],
    enterpriseAppId: item["enterpriseAppId"],
    cspm: item["cspm"],
    resourceCollection: item["resourceCollection"],
  };
}

export function datadogOrganizationPropertiesDeserializer(
  item: any,
): DatadogOrganizationProperties {
  return {
    name: item["name"],
    id: item["id"],
    linkingAuthCode: item["linkingAuthCode"],
    linkingClientId: item["linkingClientId"],
    redirectUri: item["redirectUri"],
    apiKey: item["apiKey"],
    applicationKey: item["applicationKey"],
    enterpriseAppId: item["enterpriseAppId"],
    cspm: item["cspm"],
    resourceCollection: item["resourceCollection"],
  };
}

/** Includes name, email and optionally, phone number. User Information can't be null. */
export interface UserInfo {
  /** Name of the user */
  name?: string;
  /** Email of the user used by Datadog for contacting them if needed */
  emailAddress?: string;
  /** Phone number of the user used by Datadog for contacting them if needed */
  phoneNumber?: string;
}

export function userInfoSerializer(item: UserInfo): any {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    phoneNumber: item["phoneNumber"],
  };
}

export function userInfoDeserializer(item: any): UserInfo {
  return {
    name: item["name"],
    emailAddress: item["emailAddress"],
    phoneNumber: item["phoneNumber"],
  };
}

/** Known values of {@link LiftrResourceCategories} that the service accepts. */
export enum KnownLiftrResourceCategories {
  /** Unknown */
  Unknown = "Unknown",
  /** MonitorLogs */
  MonitorLogs = "MonitorLogs",
}

/** Type of LiftrResourceCategories */
export type LiftrResourceCategories = string;

export function sreAgentConfigurationArraySerializer(result: Array<SreAgentConfiguration>): any[] {
  return result.map((item) => {
    return sreAgentConfigurationSerializer(item);
  });
}

export function sreAgentConfigurationArrayDeserializer(
  result: Array<SreAgentConfiguration>,
): any[] {
  return result.map((item) => {
    return sreAgentConfigurationDeserializer(item);
  });
}

/** SRE Agent configuration to connect to MCP server of Datadog for a given organization. */
export interface SreAgentConfiguration {
  /** The ARM resource ID of the MCP connector integrated with SRE Agent resource. */
  mcpConnectorResourceId: string;
}

export function sreAgentConfigurationSerializer(item: SreAgentConfiguration): any {
  return { mcpConnectorResourceId: item["mcpConnectorResourceId"] };
}

export function sreAgentConfigurationDeserializer(item: any): SreAgentConfiguration {
  return {
    mcpConnectorResourceId: item["mcpConnectorResourceId"],
  };
}

/** Details about the marketplace offer associated with the monitor resource. */
export interface MarketplaceOfferDetails {
  /** The publisher ID (e.g., "datadog1591740804488"). */
  publisherId?: string;
  /** The offer ID (e.g., "dd_liftr_v3_decoupled"). */
  offerId?: string;
}

export function marketplaceOfferDetailsSerializer(item: MarketplaceOfferDetails): any {
  return { publisherId: item["publisherId"], offerId: item["offerId"] };
}

export function marketplaceOfferDetailsDeserializer(item: any): MarketplaceOfferDetails {
  return {
    publisherId: item["publisherId"],
    offerId: item["offerId"],
  };
}

/** model interface ResourceSku */
export interface ResourceSku {
  /** Name of the SKU in {PlanId} format. For Terraform, the only allowed value is 'Linked'. */
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

/** model interface IdentityProperties */
export interface IdentityProperties {
  /** The identity ID. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Specifies the identity type of the Datadog Monitor. At this time the only allowed value is 'SystemAssigned'. */
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

/** Specifies the identity type of the Datadog Monitor. At this time the only allowed value is 'SystemAssigned'. */
export enum KnownManagedIdentityTypes {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
}

/**
 * Specifies the identity type of the Datadog Monitor. At this time the only allowed value is 'SystemAssigned'. \
 * {@link KnownManagedIdentityTypes} can be used interchangeably with ManagedIdentityTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **UserAssigned**
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
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

/** Capture logs and metrics of Azure resources based on ARM tags. */
export interface MonitoringTagRules extends ProxyResource {
  /** Definition of the properties for a TagRules resource. */
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

/** Definition of the properties for a TagRules resource. */
export interface MonitoringTagRulesProperties {
  readonly provisioningState?: ProvisioningState;
  /** Set of rules for sending logs for the Monitor resource. */
  logRules?: LogRules;
  /** Set of rules for sending metrics for the Monitor resource. */
  metricRules?: MetricRules;
  /** Set of rules for managing agents for the Monitor resource. */
  agentRules?: AgentRules;
  /** Configuration to enable/disable auto-muting flag */
  automuting?: boolean;
  /** Configuration to enable/disable custom metrics. If enabled, custom metrics from app insights will be sent. */
  customMetrics?: boolean;
}

export function monitoringTagRulesPropertiesSerializer(item: MonitoringTagRulesProperties): any {
  return {
    logRules: !item["logRules"] ? item["logRules"] : logRulesSerializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesSerializer(item["metricRules"]),
    agentRules: !item["agentRules"] ? item["agentRules"] : agentRulesSerializer(item["agentRules"]),
    automuting: item["automuting"],
    customMetrics: item["customMetrics"],
  };
}

export function monitoringTagRulesPropertiesDeserializer(item: any): MonitoringTagRulesProperties {
  return {
    provisioningState: item["provisioningState"],
    logRules: !item["logRules"] ? item["logRules"] : logRulesDeserializer(item["logRules"]),
    metricRules: !item["metricRules"]
      ? item["metricRules"]
      : metricRulesDeserializer(item["metricRules"]),
    agentRules: !item["agentRules"]
      ? item["agentRules"]
      : agentRulesDeserializer(item["agentRules"]),
    automuting: item["automuting"],
    customMetrics: item["customMetrics"],
  };
}

/** Set of rules for sending logs for the Monitor resource. */
export interface LogRules {
  /** Flag specifying if AAD logs should be sent for the Monitor resource. */
  sendAadLogs?: boolean;
  /** Flag specifying if Azure subscription logs should be sent for the Monitor resource. */
  sendSubscriptionLogs?: boolean;
  /** Flag specifying if Azure resource logs should be sent for the Monitor resource. */
  sendResourceLogs?: boolean;
  /** List of filtering tags to be used for capturing logs. This only takes effect if SendResourceLogs flag is enabled. If empty, all resources will be captured. If only Exclude action is specified, the rules will apply to the list of all available resources. If Include actions are specified, the rules will only include resources with the associated tags. */
  filteringTags?: FilteringTag[];
}

export function logRulesSerializer(item: LogRules): any {
  return {
    sendAadLogs: item["sendAadLogs"],
    sendSubscriptionLogs: item["sendSubscriptionLogs"],
    sendResourceLogs: item["sendResourceLogs"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArraySerializer(item["filteringTags"]),
  };
}

export function logRulesDeserializer(item: any): LogRules {
  return {
    sendAadLogs: item["sendAadLogs"],
    sendSubscriptionLogs: item["sendSubscriptionLogs"],
    sendResourceLogs: item["sendResourceLogs"],
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
  /** List of filtering tags to be used for capturing metrics. If empty, all resources will be captured. If only Exclude action is specified, the rules will apply to the list of all available resources. If Include actions are specified, the rules will only include resources with the associated tags. */
  filteringTags?: FilteringTag[];
}

export function metricRulesSerializer(item: MetricRules): any {
  return {
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArraySerializer(item["filteringTags"]),
  };
}

export function metricRulesDeserializer(item: any): MetricRules {
  return {
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArrayDeserializer(item["filteringTags"]),
  };
}

/** Set of rules for managing agents for the Monitor resource. */
export interface AgentRules {
  /** Flag specifying if agent monitoring should be enabled for the Monitor resource. */
  enableAgentMonitoring?: boolean;
  /** List of filtering tags to be used for capturing metrics. If empty, all resources will be captured. If only Exclude action is specified, the rules will apply to the list of all available resources. If Include actions are specified, the rules will only include resources with the associated tags. */
  filteringTags?: FilteringTag[];
}

export function agentRulesSerializer(item: AgentRules): any {
  return {
    enableAgentMonitoring: item["enableAgentMonitoring"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArraySerializer(item["filteringTags"]),
  };
}

export function agentRulesDeserializer(item: any): AgentRules {
  return {
    enableAgentMonitoring: item["enableAgentMonitoring"],
    filteringTags: !item["filteringTags"]
      ? item["filteringTags"]
      : filteringTagArrayDeserializer(item["filteringTags"]),
  };
}

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

/** The request to update subscriptions needed to be monitored by the Datadog monitor resource. */
export interface MonitoredSubscriptionProperties extends ProxyResource {
  /** The request to update subscriptions needed to be monitored by the Datadog monitor resource. */
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

/** The request to update subscriptions needed to be monitored by the Datadog monitor resource. */
export interface SubscriptionList {
  /** The operation for the patch on the resource. */
  operation?: Operation;
  /** List of subscriptions and the state of the monitoring. */
  monitoredSubscriptionList?: MonitoredSubscription[];
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
  };
}

/** The operation for the patch on the resource. */
export enum KnownOperation {
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

/** The list of subscriptions and it's monitoring status by current Datadog monitor. */
export interface MonitoredSubscription {
  /** The subscriptionId to be monitored. */
  subscriptionId?: string;
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

/** SaaS resource details for Activate and Validate SaaS Resource */
export interface ActivateSaaSParameterRequest {
  /** SaaS resource id of marketplace saas subscription to be activated. */
  saaSResourceId: string;
  /** User information of the person activating the SaaS resource. */
  userInfo?: UserInfo;
  /** Datadog organization properties to link the Saas resource to. */
  datadogOrganizationProperties?: DatadogOrganizationProperties;
}

export function activateSaaSParameterRequestSerializer(item: ActivateSaaSParameterRequest): any {
  return {
    saaSResourceId: item["saaSResourceId"],
    userInfo: !item["userInfo"] ? item["userInfo"] : userInfoSerializer(item["userInfo"]),
    datadogOrganizationProperties: !item["datadogOrganizationProperties"]
      ? item["datadogOrganizationProperties"]
      : datadogOrganizationPropertiesSerializer(item["datadogOrganizationProperties"]),
  };
}

/** Marketplace SaaS resource details. */
export interface SaaSResourceDetailsResponse extends ProxyResource {
  /** Id of the Marketplace SaaS Resource */
  saaSId?: string;
}

export function saaSResourceDetailsResponseDeserializer(item: any): SaaSResourceDetailsResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    saaSId: item["saaSId"],
  };
}

/** The parameters for a PATCH request to a monitor resource. */
export interface DatadogMonitorResourceUpdateParameters {
  /** The set of properties that can be update in a PATCH request to a monitor resource. */
  properties?: MonitorUpdateProperties;
  /** The new tags of the monitor resource. */
  tags?: Record<string, string>;
  sku?: ResourceSku;
}

export function datadogMonitorResourceUpdateParametersSerializer(
  item: DatadogMonitorResourceUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : monitorUpdatePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
  };
}

/** The set of properties that can be update in a PATCH request to a monitor resource. */
export interface MonitorUpdateProperties {
  /** Flag specifying if the resource monitoring is enabled or disabled. */
  monitoringStatus?: MonitoringStatus;
  /** The new cloud security posture management value of the monitor resource. This collects configuration information for all resources in a subscription and track conformance to industry benchmarks. */
  cspm?: boolean;
  /** The new resource collection value of the monitor resource. This collects configuration information for all resources in a subscription. */
  resourceCollection?: boolean;
}

export function monitorUpdatePropertiesSerializer(item: MonitorUpdateProperties): any {
  return {
    monitoringStatus: item["monitoringStatus"],
    cspm: item["cspm"],
    resourceCollection: item["resourceCollection"],
  };
}

/** Response of a list operation. */
export interface _DatadogMonitorResourceListResponse {
  /** The DatadogMonitorResource items on this page */
  value: DatadogMonitorResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datadogMonitorResourceListResponseDeserializer(
  item: any,
): _DatadogMonitorResourceListResponse {
  return {
    value: datadogMonitorResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datadogMonitorResourceArraySerializer(
  result: Array<DatadogMonitorResource>,
): any[] {
  return result.map((item) => {
    return datadogMonitorResourceSerializer(item);
  });
}

export function datadogMonitorResourceArrayDeserializer(
  result: Array<DatadogMonitorResource>,
): any[] {
  return result.map((item) => {
    return datadogMonitorResourceDeserializer(item);
  });
}

/** Request for adding/removing Datadog MCP connectors on SRE Agent resource. */
export interface SreAgentConnectorRequest {
  /** The list of ARM resource ID of the MCP connector integrated with SRE Agent resource. */
  mcpConnectorResourceIdList: SreAgentConfiguration[];
  /** Add/Remove action. */
  action: ConnectorAction;
}

export function sreAgentConnectorRequestSerializer(item: SreAgentConnectorRequest): any {
  return {
    mcpConnectorResourceIdList: sreAgentConfigurationArraySerializer(
      item["mcpConnectorResourceIdList"],
    ),
    action: item["action"],
  };
}

/** Add or Remove connectors for SRE agents. */
export enum KnownConnectorAction {
  /** Add connector actions */
  Add = "Add",
  /** Remove connector action */
  Remove = "Remove",
}

/**
 * Add or Remove connectors for SRE agents. \
 * {@link KnownConnectorAction} can be used interchangeably with ConnectorAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Add**: Add connector actions \
 * **Remove**: Remove connector action
 */
export type ConnectorAction = string;

/** Response of a list operation. */
export interface SreAgentConfigurationListResponse {
  /** The SreAgentConfiguration items on this page */
  value: SreAgentConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function sreAgentConfigurationListResponseDeserializer(
  item: any,
): SreAgentConfigurationListResponse {
  return {
    value: sreAgentConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Represents a Datadog Application key and its associated properties. */
export interface DatadogApplicationKey {
  /** The user that created the Application key. */
  createdBy?: string;
  /** The name of the Application key. */
  name?: string;
  /** The value of the Application key. */
  readonly key: string;
}

export function datadogApplicationKeyDeserializer(item: any): DatadogApplicationKey {
  return {
    createdBy: item["createdBy"],
    name: item["name"],
    key: item["key"],
  };
}

/** Response of a list operation. */
export interface _DatadogApiKeyListResponse {
  /** The DatadogApiKey items on this page */
  value: DatadogApiKey[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datadogApiKeyListResponseDeserializer(item: any): _DatadogApiKeyListResponse {
  return {
    value: datadogApiKeyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datadogApiKeyArraySerializer(result: Array<DatadogApiKey>): any[] {
  return result.map((item) => {
    return datadogApiKeySerializer(item);
  });
}

export function datadogApiKeyArrayDeserializer(result: Array<DatadogApiKey>): any[] {
  return result.map((item) => {
    return datadogApiKeyDeserializer(item);
  });
}

/** model interface DatadogApiKey */
export interface DatadogApiKey {
  /** The user that created the API key. */
  createdBy?: string;
  /** The name of the API key. */
  name?: string;
  /** The value of the API key. */
  key: string;
  /** The time of creation of the API key. */
  created?: string;
}

export function datadogApiKeySerializer(item: DatadogApiKey): any {
  return {
    createdBy: item["createdBy"],
    name: item["name"],
    key: item["key"],
    created: item["created"],
  };
}

export function datadogApiKeyDeserializer(item: any): DatadogApiKey {
  return {
    createdBy: item["createdBy"],
    name: item["name"],
    key: item["key"],
    created: item["created"],
  };
}

/** Response of a list operation. */
export interface _DatadogHostListResponse {
  /** The DatadogHost items on this page */
  value: DatadogHost[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datadogHostListResponseDeserializer(item: any): _DatadogHostListResponse {
  return {
    value: datadogHostArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datadogHostArrayDeserializer(result: Array<DatadogHost>): any[] {
  return result.map((item) => {
    return datadogHostDeserializer(item);
  });
}

/** model interface DatadogHost */
export interface DatadogHost {
  /** The name of the host. */
  name?: string;
  /** The aliases for the host installed via the Datadog agent. */
  aliases?: string[];
  /** The Datadog integrations reporting metrics for the host. */
  apps?: string[];
  meta?: DatadogHostMetadata;
}

export function datadogHostDeserializer(item: any): DatadogHost {
  return {
    name: item["name"],
    aliases: !item["aliases"]
      ? item["aliases"]
      : item["aliases"].map((p: any) => {
          return p;
        }),
    apps: !item["apps"]
      ? item["apps"]
      : item["apps"].map((p: any) => {
          return p;
        }),
    meta: !item["meta"] ? item["meta"] : datadogHostMetadataDeserializer(item["meta"]),
  };
}

/** model interface DatadogHostMetadata */
export interface DatadogHostMetadata {
  /** The agent version. */
  agentVersion?: string;
  installMethod?: DatadogInstallMethod;
  logsAgent?: DatadogLogsAgent;
}

export function datadogHostMetadataDeserializer(item: any): DatadogHostMetadata {
  return {
    agentVersion: item["agentVersion"],
    installMethod: !item["installMethod"]
      ? item["installMethod"]
      : datadogInstallMethodDeserializer(item["installMethod"]),
    logsAgent: !item["logsAgent"]
      ? item["logsAgent"]
      : datadogLogsAgentDeserializer(item["logsAgent"]),
  };
}

/** model interface DatadogInstallMethod */
export interface DatadogInstallMethod {
  /** The tool. */
  tool?: string;
  /** The tool version. */
  toolVersion?: string;
  /** The installer version. */
  installerVersion?: string;
}

export function datadogInstallMethodDeserializer(item: any): DatadogInstallMethod {
  return {
    tool: item["tool"],
    toolVersion: item["toolVersion"],
    installerVersion: item["installerVersion"],
  };
}

/** model interface DatadogLogsAgent */
export interface DatadogLogsAgent {
  /** The transport. */
  transport?: string;
}

export function datadogLogsAgentDeserializer(item: any): DatadogLogsAgent {
  return {
    transport: item["transport"],
  };
}

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
  /** The location of the linked resource. */
  location?: string;
}

export function linkedResourceDeserializer(item: any): LinkedResource {
  return {
    id: item["id"],
    location: item["location"],
  };
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

/** The properties of a resource currently being monitored by the Datadog monitor resource. */
export interface MonitoredResource {
  /** The ARM id of the resource. */
  id?: string;
  /** Flag indicating if resource is sending metrics to Datadog. */
  sendingMetrics?: boolean;
  /** Reason for why the resource is sending metrics (or why it is not sending). */
  reasonForMetricsStatus?: string;
  /** Flag indicating if resource is sending logs to Datadog. */
  sendingLogs?: boolean;
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

/** model interface DatadogSetPasswordLink */
export interface DatadogSetPasswordLink {
  setPasswordLink?: string;
}

export function datadogSetPasswordLinkDeserializer(item: any): DatadogSetPasswordLink {
  return {
    setPasswordLink: item["setPasswordLink"],
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
  marketplaceName?: string;
  /** Marketplace Subscription Details: SaaS Subscription Status */
  marketplaceStatus?: string;
  /** The Azure Subscription ID to which the Marketplace Subscription belongs and gets billed into. */
  billedAzureSubscriptionId?: string;
  /** Offer Id of the Marketplace offer */
  offerId?: string;
  /** Flag specifying if the Marketplace status is subscribed or not. */
  subscribed?: boolean;
}

export function marketplaceSaaSInfoDeserializer(item: any): MarketplaceSaaSInfo {
  return {
    marketplaceSubscriptionId: item["marketplaceSubscriptionId"],
    marketplaceName: item["marketplaceName"],
    marketplaceStatus: item["marketplaceStatus"],
    billedAzureSubscriptionId: item["billedAzureSubscriptionId"],
    offerId: item["offerId"],
    subscribed: item["subscribed"],
  };
}

/** Partner Billing details associated with the resource. */
export interface PartnerBillingEntity {
  /** The Datadog Organization Id. */
  id?: string;
  /** The Datadog Organization Name. */
  name?: string;
  /** Link to the datadog organization page */
  partnerEntityUri?: string;
}

export function partnerBillingEntityDeserializer(item: any): PartnerBillingEntity {
  return {
    id: item["id"],
    name: item["name"],
    partnerEntityUri: item["partnerEntityUri"],
  };
}

/** Resubscribe Properties */
export interface ResubscribeProperties {
  sku?: ResourceSku;
  /** Newly selected Azure Subscription Id in which the new Marketplace subscription will be created for Resubscribe */
  azureSubscriptionId?: string;
  /** Newly selected Azure resource group in which the new Marketplace subscription will be created for Resubscribe */
  resourceGroup?: string;
}

export function resubscribePropertiesSerializer(item: ResubscribeProperties): any {
  return {
    sku: !item["sku"] ? item["sku"] : resourceSkuSerializer(item["sku"]),
    azureSubscriptionId: item["azureSubscriptionId"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface DatadogSingleSignOnResource extends ProxyResource {
  properties?: DatadogSingleSignOnProperties;
}

export function datadogSingleSignOnResourceSerializer(item: DatadogSingleSignOnResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : datadogSingleSignOnPropertiesSerializer(item["properties"]),
  };
}

export function datadogSingleSignOnResourceDeserializer(item: any): DatadogSingleSignOnResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : datadogSingleSignOnPropertiesDeserializer(item["properties"]),
  };
}

/** model interface DatadogSingleSignOnProperties */
export interface DatadogSingleSignOnProperties {
  readonly provisioningState?: ProvisioningState;
  /** Various states of the SSO resource */
  singleSignOnState?: SingleSignOnStates;
  /** The Id of the Enterprise App used for Single sign-on. */
  enterpriseAppId?: string;
  /** The login URL specific to this Datadog Organization. */
  readonly singleSignOnUrl?: string;
}

export function datadogSingleSignOnPropertiesSerializer(item: DatadogSingleSignOnProperties): any {
  return { singleSignOnState: item["singleSignOnState"], enterpriseAppId: item["enterpriseAppId"] };
}

export function datadogSingleSignOnPropertiesDeserializer(
  item: any,
): DatadogSingleSignOnProperties {
  return {
    provisioningState: item["provisioningState"],
    singleSignOnState: item["singleSignOnState"],
    enterpriseAppId: item["enterpriseAppId"],
    singleSignOnUrl: item["singleSignOnUrl"],
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

/** Response of a list operation. */
export interface _DatadogSingleSignOnResourceListResponse {
  /** The DatadogSingleSignOnResource items on this page */
  value: DatadogSingleSignOnResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datadogSingleSignOnResourceListResponseDeserializer(
  item: any,
): _DatadogSingleSignOnResourceListResponse {
  return {
    value: datadogSingleSignOnResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datadogSingleSignOnResourceArraySerializer(
  result: Array<DatadogSingleSignOnResource>,
): any[] {
  return result.map((item) => {
    return datadogSingleSignOnResourceSerializer(item);
  });
}

export function datadogSingleSignOnResourceArrayDeserializer(
  result: Array<DatadogSingleSignOnResource>,
): any[] {
  return result.map((item) => {
    return datadogSingleSignOnResourceDeserializer(item);
  });
}

/** Response of a list operation. */
export interface _DatadogAgreementResourceListResponse {
  /** The DatadogAgreementResource items on this page */
  value: DatadogAgreementResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _datadogAgreementResourceListResponseDeserializer(
  item: any,
): _DatadogAgreementResourceListResponse {
  return {
    value: datadogAgreementResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function datadogAgreementResourceArraySerializer(
  result: Array<DatadogAgreementResource>,
): any[] {
  return result.map((item) => {
    return datadogAgreementResourceSerializer(item);
  });
}

export function datadogAgreementResourceArrayDeserializer(
  result: Array<DatadogAgreementResource>,
): any[] {
  return result.map((item) => {
    return datadogAgreementResourceDeserializer(item);
  });
}

/** model interface DatadogAgreementResource */
export interface DatadogAgreementResource {
  /** ARM id of the resource. */
  readonly id?: string;
  /** Name of the agreement. */
  readonly name?: string;
  /** The type of the resource. */
  readonly type?: string;
  /** Represents the properties of the resource. */
  properties?: DatadogAgreementProperties;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemData;
}

export function datadogAgreementResourceSerializer(item: DatadogAgreementResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : datadogAgreementPropertiesSerializer(item["properties"]),
  };
}

export function datadogAgreementResourceDeserializer(item: any): DatadogAgreementResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : datadogAgreementPropertiesDeserializer(item["properties"]),
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Terms properties. */
export interface DatadogAgreementProperties {
  /** Publisher identifier string. */
  publisher?: string;
  /** Product identifier string. */
  product?: string;
  /** Plan identifier string. */
  plan?: string;
  /** Link to HTML with Microsoft and Publisher terms. */
  licenseTextLink?: string;
  /** Link to the privacy policy of the publisher. */
  privacyPolicyLink?: string;
  /** Date and time in UTC of when the terms were accepted. This is empty if Accepted is false. */
  retrieveDatetime?: Date;
  /** Terms signature. */
  signature?: string;
  /** If any version of the terms have been accepted, otherwise false. */
  accepted?: boolean;
}

export function datadogAgreementPropertiesSerializer(item: DatadogAgreementProperties): any {
  return {
    publisher: item["publisher"],
    product: item["product"],
    plan: item["plan"],
    licenseTextLink: item["licenseTextLink"],
    privacyPolicyLink: item["privacyPolicyLink"],
    retrieveDatetime: !item["retrieveDatetime"]
      ? item["retrieveDatetime"]
      : item["retrieveDatetime"].toISOString(),
    signature: item["signature"],
    accepted: item["accepted"],
  };
}

export function datadogAgreementPropertiesDeserializer(item: any): DatadogAgreementProperties {
  return {
    publisher: item["publisher"],
    product: item["product"],
    plan: item["plan"],
    licenseTextLink: item["licenseTextLink"],
    privacyPolicyLink: item["privacyPolicyLink"],
    retrieveDatetime: !item["retrieveDatetime"]
      ? item["retrieveDatetime"]
      : new Date(item["retrieveDatetime"]),
    signature: item["signature"],
    accepted: item["accepted"],
  };
}

/** Paged collection of CreateResourceSupportedResponse items */
export interface _CreateResourceSupportedResponseList {
  /** The CreateResourceSupportedResponse items on this page */
  value: CreateResourceSupportedResponse[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _createResourceSupportedResponseListDeserializer(
  item: any,
): _CreateResourceSupportedResponseList {
  return {
    value: createResourceSupportedResponseArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function createResourceSupportedResponseArrayDeserializer(
  result: Array<CreateResourceSupportedResponse>,
): any[] {
  return result.map((item) => {
    return createResourceSupportedResponseDeserializer(item);
  });
}

/** Datadog resource can be created or not. */
export interface CreateResourceSupportedResponse {
  /** Represents the properties of the resource. */
  properties?: CreateResourceSupportedProperties;
}

export function createResourceSupportedResponseDeserializer(
  item: any,
): CreateResourceSupportedResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : createResourceSupportedPropertiesDeserializer(item["properties"]),
  };
}

/** Datadog resource can be created or not properties. */
export interface CreateResourceSupportedProperties {
  /** The ARM id of the subscription. */
  readonly name?: string;
  /** Indicates if selected subscription supports Datadog resource creation, if not it is already being monitored for the selected organization via multi subscription feature. */
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
  /** The 2025-06-11 API version. */
  V20250611 = "2025-06-11",
  /** The 2025-11-03-preview API version. */
  V20251103Preview = "2025-11-03-preview",
  /** The 2025-12-26-preview API version. */
  V20251226Preview = "2025-12-26-preview",
}
