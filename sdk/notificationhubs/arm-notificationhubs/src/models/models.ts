// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Paged collection of Operation items */
export interface _OperationListResult {
  /** The Operation items on this page */
  readonly value: Operation[];
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

/** Result of the request to list SQL operations. */
export interface Operation {
  /** The name of the operation being performed on this particular object." */
  readonly name?: string;
  /** he localized display information for this particular operation / action. */
  display?: OperationDisplay;
  /** The intended executor of the operation." */
  readonly isDataAction?: boolean;
  /** Additional descriptions for the operation. */
  properties?: OperationProperties;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** model interface OperationDisplay */
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

/** Optional operation properties. */
export interface OperationProperties {
  /** Optional service specification used in Operations API. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Optional service specification used in Operations API. */
export interface ServiceSpecification {
  /** Log specifications. */
  readonly logSpecifications?: LogSpecification[];
  /** Metric specification. */
  readonly metricSpecifications?: MetricSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** A single log category specification. */
export interface LogSpecification {
  /** Name of the log category. */
  readonly name?: string;
  /** Display name of the log category. */
  readonly displayName?: string;
  /** Duration of data written to a single blob. */
  readonly blobDuration?: string;
  /** Category group for the log specification. */
  categoryGroups?: string[];
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
    categoryGroups: !item["categoryGroups"]
      ? item["categoryGroups"]
      : item["categoryGroups"].map((p: any) => {
          return p;
        }),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** A metric specification. */
export interface MetricSpecification {
  /** Metric name / id. */
  readonly name?: string;
  /** User-visible metric name. */
  readonly displayName?: string;
  /** Description of the metric. */
  readonly displayDescription?: string;
  /** Metric unit. */
  readonly unit?: string;
  /** Type of the aggregation (Average, Minimum, Maximum, Total or Count). */
  readonly aggregationType?: string;
  /** List of availabilities. */
  readonly availabilities?: Availability[];
  /** List of supported time grain types. */
  readonly supportedTimeGrainTypes?: string[];
  /** The matching regex pattern to be applied to the field pointed by the "metricsFilterPathSelector" flag in the ARM manifest. */
  readonly metricFilterPattern?: string;
  /** Optional property. If set to true, then zero will be returned for time duration where no metric is emitted / published. */
  readonly fillGapWithZero?: boolean;
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    availabilities: !item["availabilities"]
      ? item["availabilities"]
      : availabilityArrayDeserializer(item["availabilities"]),
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    metricFilterPattern: item["metricFilterPattern"],
    fillGapWithZero: item["fillGapWithZero"],
  };
}

export function availabilityArrayDeserializer(result: Array<Availability>): any[] {
  return result.map((item) => {
    return availabilityDeserializer(item);
  });
}

/** Represents metric availability (part of RP operation descriptions). */
export interface Availability {
  /** Time grain of the availability. */
  readonly timeGrain?: string;
  /** Duration of the availability blob. */
  readonly blobDuration?: string;
}

export function availabilityDeserializer(item: any): Availability {
  return {
    timeGrain: item["timeGrain"],
    blobDuration: item["blobDuration"],
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

/** Response for POST requests that return single SharedAccessAuthorizationRule. */
export interface SharedAccessAuthorizationRuleResource extends ProxyResource {
  /** SharedAccessAuthorizationRule properties. */
  properties?: SharedAccessAuthorizationRuleProperties;
  location?: string;
  tags?: Record<string, string>;
}

export function sharedAccessAuthorizationRuleResourceSerializer(
  item: SharedAccessAuthorizationRuleResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : sharedAccessAuthorizationRulePropertiesSerializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function sharedAccessAuthorizationRuleResourceDeserializer(
  item: any,
): SharedAccessAuthorizationRuleResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : sharedAccessAuthorizationRulePropertiesDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** SharedAccessAuthorizationRule properties. */
export interface SharedAccessAuthorizationRuleProperties {
  /** Gets or sets the rights associated with the rule. */
  rights: AccessRights[];
  /**
   * Gets a base64-encoded 256-bit primary key for signing and
   * validating the SAS token.
   */
  primaryKey?: string;
  /**
   * Gets a base64-encoded 256-bit primary key for signing and
   * validating the SAS token.
   */
  secondaryKey?: string;
  /** Gets a string that describes the authorization rule. */
  readonly keyName?: string;
  /** Gets the last modified time for this rule */
  readonly modifiedTime?: Date;
  /** Gets the created time for this rule */
  readonly createdTime?: Date;
  /** Gets a string that describes the claim type */
  readonly claimType?: string;
  /** Gets a string that describes the claim value */
  readonly claimValue?: string;
  /** Gets the revision number for the rule */
  readonly revision?: number;
}

export function sharedAccessAuthorizationRulePropertiesSerializer(
  item: SharedAccessAuthorizationRuleProperties,
): any {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
  };
}

export function sharedAccessAuthorizationRulePropertiesDeserializer(
  item: any,
): SharedAccessAuthorizationRuleProperties {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    keyName: item["keyName"],
    modifiedTime: !item["modifiedTime"] ? item["modifiedTime"] : new Date(item["modifiedTime"]),
    createdTime: !item["createdTime"] ? item["createdTime"] : new Date(item["createdTime"]),
    claimType: item["claimType"],
    claimValue: item["claimValue"],
    revision: item["revision"],
  };
}

/** Defines values for AccessRights. */
export enum KnownAccessRights {
  /** Manage */
  Manage = "Manage",
  /** Send */
  Send = "Send",
  /** Listen */
  Listen = "Listen",
}

/**
 * Defines values for AccessRights. \
 * {@link KnownAccessRights} can be used interchangeably with AccessRights,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manage** \
 * **Send** \
 * **Listen**
 */
export type AccessRights = string;

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

/** Paged collection of SharedAccessAuthorizationRuleResource items */
export interface _SharedAccessAuthorizationRuleListResult {
  /** The SharedAccessAuthorizationRuleResource items on this page */
  readonly value: SharedAccessAuthorizationRuleResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _sharedAccessAuthorizationRuleListResultDeserializer(
  item: any,
): _SharedAccessAuthorizationRuleListResult {
  return {
    value: sharedAccessAuthorizationRuleResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function sharedAccessAuthorizationRuleResourceArraySerializer(
  result: Array<SharedAccessAuthorizationRuleResource>,
): any[] {
  return result.map((item) => {
    return sharedAccessAuthorizationRuleResourceSerializer(item);
  });
}

export function sharedAccessAuthorizationRuleResourceArrayDeserializer(
  result: Array<SharedAccessAuthorizationRuleResource>,
): any[] {
  return result.map((item) => {
    return sharedAccessAuthorizationRuleResourceDeserializer(item);
  });
}

/** Response for the POST request that returns Namespace or NotificationHub access keys (connection strings). */
export interface ResourceListKeys {
  /** Gets or sets primaryConnectionString of the AuthorizationRule. */
  readonly primaryConnectionString?: string;
  /**
   * Gets or sets secondaryConnectionString of the created
   * AuthorizationRule
   */
  readonly secondaryConnectionString?: string;
  /** Gets or sets primaryKey of the created AuthorizationRule. */
  readonly primaryKey?: string;
  /** Gets or sets secondaryKey of the created AuthorizationRule */
  readonly secondaryKey?: string;
  /** Gets or sets keyName of the created AuthorizationRule */
  readonly keyName?: string;
}

export function resourceListKeysDeserializer(item: any): ResourceListKeys {
  return {
    primaryConnectionString: item["primaryConnectionString"],
    secondaryConnectionString: item["secondaryConnectionString"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    keyName: item["keyName"],
  };
}

/** Namespace / NotificationHub Regenerate Keys request. */
export interface PolicyKeyResource {
  /** Type of Shared Access Policy Key (primary or secondary). */
  policyKey: PolicyKeyType;
}

export function policyKeyResourceSerializer(item: PolicyKeyResource): any {
  return { policyKey: item["policyKey"] };
}

/** Type of Shared Access Policy Key (primary or secondary). */
export enum KnownPolicyKeyType {
  /** PrimaryKey */
  PrimaryKey = "PrimaryKey",
  /** SecondaryKey */
  SecondaryKey = "SecondaryKey",
}

/**
 * Type of Shared Access Policy Key (primary or secondary). \
 * {@link KnownPolicyKeyType} can be used interchangeably with PolicyKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrimaryKey** \
 * **SecondaryKey**
 */
export type PolicyKeyType = string;

/** Notification Hubs Namespace Resource. */
export interface NamespaceResource extends TrackedResource {
  /** Represents namespace properties. */
  properties?: NamespaceProperties;
  /** The Sku description for a namespace */
  sku: Sku;
}

export function namespaceResourceSerializer(item: NamespaceResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : namespacePropertiesSerializer(item["properties"]),
    sku: skuSerializer(item["sku"]),
  };
}

export function namespaceResourceDeserializer(item: any): NamespaceResource {
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
      : namespacePropertiesDeserializer(item["properties"]),
    sku: skuDeserializer(item["sku"]),
  };
}

/** Represents namespace properties. */
export interface NamespaceProperties {
  /**
   * Name of the Notification Hubs namespace. This is immutable property, set automatically
   * by the service when the namespace is created.
   */
  readonly name?: string;
  /** Defines values for OperationProvisioningState. */
  provisioningState?: OperationProvisioningState;
  /** Namespace status. */
  status?: NamespaceStatus;
  /** Gets or sets whether or not the namespace is currently enabled. */
  readonly enabled?: boolean;
  /** Gets or sets whether or not the namespace is set as Critical. */
  readonly critical?: boolean;
  /** Namespace subscription id. */
  readonly subscriptionId?: string;
  /**
   * Region. The value is always set to the same value as Namespace.Location, so we are deprecating
   * this property.
   */
  readonly region?: string;
  /** Azure Insights Metrics id. */
  readonly metricId?: string;
  /** Time when the namespace was created. */
  readonly createdAt?: Date;
  /** Time when the namespace was updated. */
  readonly updatedAt?: Date;
  /** Defines values for NamespaceType. */
  namespaceType?: NamespaceType;
  /** Allowed replication region */
  replicationRegion?: ReplicationRegion;
  /** Namespace SKU name. */
  zoneRedundancy?: ZoneRedundancyPreference;
  /** A collection of network authorization rules. */
  networkAcls?: NetworkAcls;
  /** Collection of Notification Hub or Notification Hub Namespace PNS credentials. */
  pnsCredentials?: PnsCredentials;
  /**
   * Gets or sets endpoint you can use to perform NotificationHub
   * operations.
   */
  readonly serviceBusEndpoint?: string;
  /** Private Endpoint Connections for namespace */
  readonly privateEndpointConnections?: PrivateEndpointConnectionResource[];
  /** Gets or sets scaleUnit where the namespace gets created */
  scaleUnit?: string;
  /** Deprecated. */
  dataCenter?: string;
  /** Type of public network access. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function namespacePropertiesSerializer(item: NamespaceProperties): any {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    namespaceType: item["namespaceType"],
    replicationRegion: item["replicationRegion"],
    zoneRedundancy: item["zoneRedundancy"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkAclsSerializer(item["networkAcls"]),
    pnsCredentials: !item["pnsCredentials"]
      ? item["pnsCredentials"]
      : pnsCredentialsSerializer(item["pnsCredentials"]),
    scaleUnit: item["scaleUnit"],
    dataCenter: item["dataCenter"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function namespacePropertiesDeserializer(item: any): NamespaceProperties {
  return {
    name: item["name"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    enabled: item["enabled"],
    critical: item["critical"],
    subscriptionId: item["subscriptionId"],
    region: item["region"],
    metricId: item["metricId"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    namespaceType: item["namespaceType"],
    replicationRegion: item["replicationRegion"],
    zoneRedundancy: item["zoneRedundancy"],
    networkAcls: !item["networkAcls"]
      ? item["networkAcls"]
      : networkAclsDeserializer(item["networkAcls"]),
    pnsCredentials: !item["pnsCredentials"]
      ? item["pnsCredentials"]
      : pnsCredentialsDeserializer(item["pnsCredentials"]),
    serviceBusEndpoint: item["serviceBusEndpoint"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionResourceArrayDeserializer(item["privateEndpointConnections"]),
    scaleUnit: item["scaleUnit"],
    dataCenter: item["dataCenter"],
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Defines values for OperationProvisioningState. */
export enum KnownOperationProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Pending */
  Pending = "Pending",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Defines values for OperationProvisioningState. \
 * {@link KnownOperationProvisioningState} can be used interchangeably with OperationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **InProgress** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Pending** \
 * **Disabled**
 */
export type OperationProvisioningState = string;

/** Namespace status. */
export enum KnownNamespaceStatus {
  /** Created */
  Created = "Created",
  /** Creating */
  Creating = "Creating",
  /** Suspended */
  Suspended = "Suspended",
  /** Deleting */
  Deleting = "Deleting",
}

/**
 * Namespace status. \
 * {@link KnownNamespaceStatus} can be used interchangeably with NamespaceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created** \
 * **Creating** \
 * **Suspended** \
 * **Deleting**
 */
export type NamespaceStatus = string;

/** Defines values for NamespaceType. */
export enum KnownNamespaceType {
  /** Messaging */
  Messaging = "Messaging",
  /** NotificationHub */
  NotificationHub = "NotificationHub",
}

/**
 * Defines values for NamespaceType. \
 * {@link KnownNamespaceType} can be used interchangeably with NamespaceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Messaging** \
 * **NotificationHub**
 */
export type NamespaceType = string;

/** Allowed replication region */
export enum KnownReplicationRegion {
  /** Default */
  Default = "Default",
  /** WestUs2 */
  WestUs2 = "WestUs2",
  /** NorthEurope */
  NorthEurope = "NorthEurope",
  /** AustraliaEast */
  AustraliaEast = "AustraliaEast",
  /** BrazilSouth */
  BrazilSouth = "BrazilSouth",
  /** SouthEastAsia */
  SouthEastAsia = "SouthEastAsia",
  /** SouthAfricaNorth */
  SouthAfricaNorth = "SouthAfricaNorth",
  /** None */
  None = "None",
}

/**
 * Allowed replication region \
 * {@link KnownReplicationRegion} can be used interchangeably with ReplicationRegion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **WestUs2** \
 * **NorthEurope** \
 * **AustraliaEast** \
 * **BrazilSouth** \
 * **SouthEastAsia** \
 * **SouthAfricaNorth** \
 * **None**
 */
export type ReplicationRegion = string;

/** Namespace SKU name. */
export enum KnownZoneRedundancyPreference {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Namespace SKU name. \
 * {@link KnownZoneRedundancyPreference} can be used interchangeably with ZoneRedundancyPreference,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type ZoneRedundancyPreference = string;

/** A collection of network authorization rules. */
export interface NetworkAcls {
  /** List of IP rules. */
  ipRules?: IpRule[];
  /** A default (public Internet) network authorization rule, which contains rights if no other network rule matches. */
  publicNetworkRule?: PublicInternetAuthorizationRule;
}

export function networkAclsSerializer(item: NetworkAcls): any {
  return {
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
    publicNetworkRule: !item["publicNetworkRule"]
      ? item["publicNetworkRule"]
      : publicInternetAuthorizationRuleSerializer(item["publicNetworkRule"]),
  };
}

export function networkAclsDeserializer(item: any): NetworkAcls {
  return {
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
    publicNetworkRule: !item["publicNetworkRule"]
      ? item["publicNetworkRule"]
      : publicInternetAuthorizationRuleDeserializer(item["publicNetworkRule"]),
  };
}

export function ipRuleArraySerializer(result: Array<IpRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IpRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** A network authorization rule that filters traffic based on IP address. */
export interface IpRule {
  /** IP mask. */
  ipMask: string;
  /** List of access rights. */
  rights: AccessRights[];
}

export function ipRuleSerializer(item: IpRule): any {
  return {
    ipMask: item["ipMask"],
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

export function ipRuleDeserializer(item: any): IpRule {
  return {
    ipMask: item["ipMask"],
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

/** A default (public Internet) network authorization rule, which contains rights if no other network rule matches. */
export interface PublicInternetAuthorizationRule {
  /** List of access rights. */
  rights: AccessRights[];
}

export function publicInternetAuthorizationRuleSerializer(
  item: PublicInternetAuthorizationRule,
): any {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

export function publicInternetAuthorizationRuleDeserializer(
  item: any,
): PublicInternetAuthorizationRule {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

/** Collection of Notification Hub or Notification Hub Namespace PNS credentials. */
export interface PnsCredentials {
  /** Description of a NotificationHub AdmCredential. */
  admCredential?: AdmCredential;
  /** Description of a NotificationHub ApnsCredential. */
  apnsCredential?: ApnsCredential;
  /** Description of a NotificationHub BaiduCredential. */
  baiduCredential?: BaiduCredential;
  /** Description of a NotificationHub BrowserCredential. */
  browserCredential?: BrowserCredential;
  /** Description of a NotificationHub GcmCredential. */
  gcmCredential?: GcmCredential;
  /** Description of a NotificationHub MpnsCredential. */
  mpnsCredential?: MpnsCredential;
  /** Description of a NotificationHub WnsCredential. */
  wnsCredential?: WnsCredential;
  /** Description of a NotificationHub XiaomiCredential. */
  xiaomiCredential?: XiaomiCredential;
  /** Description of a NotificationHub FcmV1Credential. */
  fcmV1Credential?: FcmV1Credential;
}

export function pnsCredentialsSerializer(item: PnsCredentials): any {
  return {
    admCredential: !item["admCredential"]
      ? item["admCredential"]
      : admCredentialSerializer(item["admCredential"]),
    apnsCredential: !item["apnsCredential"]
      ? item["apnsCredential"]
      : apnsCredentialSerializer(item["apnsCredential"]),
    baiduCredential: !item["baiduCredential"]
      ? item["baiduCredential"]
      : baiduCredentialSerializer(item["baiduCredential"]),
    browserCredential: !item["browserCredential"]
      ? item["browserCredential"]
      : browserCredentialSerializer(item["browserCredential"]),
    gcmCredential: !item["gcmCredential"]
      ? item["gcmCredential"]
      : gcmCredentialSerializer(item["gcmCredential"]),
    mpnsCredential: !item["mpnsCredential"]
      ? item["mpnsCredential"]
      : mpnsCredentialSerializer(item["mpnsCredential"]),
    wnsCredential: !item["wnsCredential"]
      ? item["wnsCredential"]
      : wnsCredentialSerializer(item["wnsCredential"]),
    xiaomiCredential: !item["xiaomiCredential"]
      ? item["xiaomiCredential"]
      : xiaomiCredentialSerializer(item["xiaomiCredential"]),
    fcmV1Credential: !item["fcmV1Credential"]
      ? item["fcmV1Credential"]
      : fcmV1CredentialSerializer(item["fcmV1Credential"]),
  };
}

export function pnsCredentialsDeserializer(item: any): PnsCredentials {
  return {
    admCredential: !item["admCredential"]
      ? item["admCredential"]
      : admCredentialDeserializer(item["admCredential"]),
    apnsCredential: !item["apnsCredential"]
      ? item["apnsCredential"]
      : apnsCredentialDeserializer(item["apnsCredential"]),
    baiduCredential: !item["baiduCredential"]
      ? item["baiduCredential"]
      : baiduCredentialDeserializer(item["baiduCredential"]),
    browserCredential: !item["browserCredential"]
      ? item["browserCredential"]
      : browserCredentialDeserializer(item["browserCredential"]),
    gcmCredential: !item["gcmCredential"]
      ? item["gcmCredential"]
      : gcmCredentialDeserializer(item["gcmCredential"]),
    mpnsCredential: !item["mpnsCredential"]
      ? item["mpnsCredential"]
      : mpnsCredentialDeserializer(item["mpnsCredential"]),
    wnsCredential: !item["wnsCredential"]
      ? item["wnsCredential"]
      : wnsCredentialDeserializer(item["wnsCredential"]),
    xiaomiCredential: !item["xiaomiCredential"]
      ? item["xiaomiCredential"]
      : xiaomiCredentialDeserializer(item["xiaomiCredential"]),
    fcmV1Credential: !item["fcmV1Credential"]
      ? item["fcmV1Credential"]
      : fcmV1CredentialDeserializer(item["fcmV1Credential"]),
  };
}

/** Description of a NotificationHub AdmCredential. */
export interface AdmCredential {
  /** Description of a NotificationHub AdmCredential. */
  properties: AdmCredentialProperties;
}

export function admCredentialSerializer(item: AdmCredential): any {
  return { properties: admCredentialPropertiesSerializer(item["properties"]) };
}

export function admCredentialDeserializer(item: any): AdmCredential {
  return {
    properties: admCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub AdmCredential. */
export interface AdmCredentialProperties {
  /** Gets or sets the client identifier. */
  clientId: string;
  /** Gets or sets the credential secret access key. */
  clientSecret: string;
  /** Gets or sets the URL of the authorization token. */
  authTokenUrl: string;
}

export function admCredentialPropertiesSerializer(item: AdmCredentialProperties): any {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    authTokenUrl: item["authTokenUrl"],
  };
}

export function admCredentialPropertiesDeserializer(item: any): AdmCredentialProperties {
  return {
    clientId: item["clientId"],
    clientSecret: item["clientSecret"],
    authTokenUrl: item["authTokenUrl"],
  };
}

/** Description of a NotificationHub ApnsCredential. */
export interface ApnsCredential {
  /** Description of a NotificationHub ApnsCredential. */
  properties: ApnsCredentialProperties;
}

export function apnsCredentialSerializer(item: ApnsCredential): any {
  return { properties: apnsCredentialPropertiesSerializer(item["properties"]) };
}

export function apnsCredentialDeserializer(item: any): ApnsCredential {
  return {
    properties: apnsCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub ApnsCredential. */
export interface ApnsCredentialProperties {
  /** Gets or sets the APNS certificate. */
  apnsCertificate?: string;
  /** Gets or sets the certificate key. */
  certificateKey?: string;
  /** Gets or sets the endpoint of this credential. */
  endpoint: string;
  /** Gets or sets the APNS certificate Thumbprint */
  thumbprint?: string;
  /**
   * Gets or sets a 10-character key identifier (kid) key, obtained from
   * your developer account
   */
  keyId?: string;
  /** Gets or sets the name of the application */
  appName?: string;
  /**
   * Gets or sets the issuer (iss) registered claim key, whose value is
   * your 10-character Team ID, obtained from your developer account
   */
  appId?: string;
  /**
   * Gets or sets provider Authentication Token, obtained through your
   * developer account
   */
  token?: string;
}

export function apnsCredentialPropertiesSerializer(item: ApnsCredentialProperties): any {
  return {
    apnsCertificate: item["apnsCertificate"],
    certificateKey: item["certificateKey"],
    endpoint: item["endpoint"],
    thumbprint: item["thumbprint"],
    keyId: item["keyId"],
    appName: item["appName"],
    appId: item["appId"],
    token: item["token"],
  };
}

export function apnsCredentialPropertiesDeserializer(item: any): ApnsCredentialProperties {
  return {
    apnsCertificate: item["apnsCertificate"],
    certificateKey: item["certificateKey"],
    endpoint: item["endpoint"],
    thumbprint: item["thumbprint"],
    keyId: item["keyId"],
    appName: item["appName"],
    appId: item["appId"],
    token: item["token"],
  };
}

/** Description of a NotificationHub BaiduCredential. */
export interface BaiduCredential {
  /** Description of a NotificationHub BaiduCredential. */
  properties: BaiduCredentialProperties;
}

export function baiduCredentialSerializer(item: BaiduCredential): any {
  return {
    properties: baiduCredentialPropertiesSerializer(item["properties"]),
  };
}

export function baiduCredentialDeserializer(item: any): BaiduCredential {
  return {
    properties: baiduCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub BaiduCredential. */
export interface BaiduCredentialProperties {
  /** Gets or sets baidu Api Key. */
  baiduApiKey: string;
  /** Gets or sets baidu Endpoint. */
  baiduEndPoint: string;
  /** Gets or sets baidu Secret Key */
  baiduSecretKey: string;
}

export function baiduCredentialPropertiesSerializer(item: BaiduCredentialProperties): any {
  return {
    baiduApiKey: item["baiduApiKey"],
    baiduEndPoint: item["baiduEndPoint"],
    baiduSecretKey: item["baiduSecretKey"],
  };
}

export function baiduCredentialPropertiesDeserializer(item: any): BaiduCredentialProperties {
  return {
    baiduApiKey: item["baiduApiKey"],
    baiduEndPoint: item["baiduEndPoint"],
    baiduSecretKey: item["baiduSecretKey"],
  };
}

/** Description of a NotificationHub BrowserCredential. */
export interface BrowserCredential {
  /** Description of a NotificationHub BrowserCredential. */
  properties: BrowserCredentialProperties;
}

export function browserCredentialSerializer(item: BrowserCredential): any {
  return {
    properties: browserCredentialPropertiesSerializer(item["properties"]),
  };
}

export function browserCredentialDeserializer(item: any): BrowserCredential {
  return {
    properties: browserCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub BrowserCredential. */
export interface BrowserCredentialProperties {
  /** Gets or sets web push subject. */
  subject: string;
  /** Gets or sets VAPID private key. */
  vapidPrivateKey: string;
  /** Gets or sets VAPID public key. */
  vapidPublicKey: string;
}

export function browserCredentialPropertiesSerializer(item: BrowserCredentialProperties): any {
  return {
    subject: item["subject"],
    vapidPrivateKey: item["vapidPrivateKey"],
    vapidPublicKey: item["vapidPublicKey"],
  };
}

export function browserCredentialPropertiesDeserializer(item: any): BrowserCredentialProperties {
  return {
    subject: item["subject"],
    vapidPrivateKey: item["vapidPrivateKey"],
    vapidPublicKey: item["vapidPublicKey"],
  };
}

/** Description of a NotificationHub GcmCredential. */
export interface GcmCredential {
  /** Description of a NotificationHub GcmCredential. */
  properties: GcmCredentialProperties;
}

export function gcmCredentialSerializer(item: GcmCredential): any {
  return { properties: gcmCredentialPropertiesSerializer(item["properties"]) };
}

export function gcmCredentialDeserializer(item: any): GcmCredential {
  return {
    properties: gcmCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub GcmCredential. */
export interface GcmCredentialProperties {
  /** Gets or sets the GCM endpoint. */
  gcmEndpoint?: string;
  /** Gets or sets the Google API key. */
  googleApiKey: string;
}

export function gcmCredentialPropertiesSerializer(item: GcmCredentialProperties): any {
  return {
    gcmEndpoint: item["gcmEndpoint"],
    googleApiKey: item["googleApiKey"],
  };
}

export function gcmCredentialPropertiesDeserializer(item: any): GcmCredentialProperties {
  return {
    gcmEndpoint: item["gcmEndpoint"],
    googleApiKey: item["googleApiKey"],
  };
}

/** Description of a NotificationHub MpnsCredential. */
export interface MpnsCredential {
  /** Description of a NotificationHub MpnsCredential. */
  properties: MpnsCredentialProperties;
}

export function mpnsCredentialSerializer(item: MpnsCredential): any {
  return { properties: mpnsCredentialPropertiesSerializer(item["properties"]) };
}

export function mpnsCredentialDeserializer(item: any): MpnsCredential {
  return {
    properties: mpnsCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub MpnsCredential. */
export interface MpnsCredentialProperties {
  /** Gets or sets the MPNS certificate. */
  mpnsCertificate: string;
  /** Gets or sets the certificate key for this credential. */
  certificateKey: string;
  /** Gets or sets the MPNS certificate Thumbprint */
  thumbprint: string;
}

export function mpnsCredentialPropertiesSerializer(item: MpnsCredentialProperties): any {
  return {
    mpnsCertificate: item["mpnsCertificate"],
    certificateKey: item["certificateKey"],
    thumbprint: item["thumbprint"],
  };
}

export function mpnsCredentialPropertiesDeserializer(item: any): MpnsCredentialProperties {
  return {
    mpnsCertificate: item["mpnsCertificate"],
    certificateKey: item["certificateKey"],
    thumbprint: item["thumbprint"],
  };
}

/** Description of a NotificationHub WnsCredential. */
export interface WnsCredential {
  /** Description of a NotificationHub WnsCredential. */
  properties: WnsCredentialProperties;
}

export function wnsCredentialSerializer(item: WnsCredential): any {
  return { properties: wnsCredentialPropertiesSerializer(item["properties"]) };
}

export function wnsCredentialDeserializer(item: any): WnsCredential {
  return {
    properties: wnsCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub WnsCredential. */
export interface WnsCredentialProperties {
  /** Gets or sets the package ID for this credential. */
  packageSid?: string;
  /** Gets or sets the secret key. */
  secretKey?: string;
  /** Gets or sets the Windows Live endpoint. */
  windowsLiveEndpoint?: string;
  /** Ges or sets the WNS Certificate Key. */
  certificateKey?: string;
  /** Gets or sets the WNS Certificate. */
  wnsCertificate?: string;
}

export function wnsCredentialPropertiesSerializer(item: WnsCredentialProperties): any {
  return {
    packageSid: item["packageSid"],
    secretKey: item["secretKey"],
    windowsLiveEndpoint: item["windowsLiveEndpoint"],
    certificateKey: item["certificateKey"],
    wnsCertificate: item["wnsCertificate"],
  };
}

export function wnsCredentialPropertiesDeserializer(item: any): WnsCredentialProperties {
  return {
    packageSid: item["packageSid"],
    secretKey: item["secretKey"],
    windowsLiveEndpoint: item["windowsLiveEndpoint"],
    certificateKey: item["certificateKey"],
    wnsCertificate: item["wnsCertificate"],
  };
}

/** Description of a NotificationHub XiaomiCredential. */
export interface XiaomiCredential {
  /** Description of a NotificationHub XiaomiCredentialProperties. */
  properties: XiaomiCredentialProperties;
}

export function xiaomiCredentialSerializer(item: XiaomiCredential): any {
  return {
    properties: xiaomiCredentialPropertiesSerializer(item["properties"]),
  };
}

export function xiaomiCredentialDeserializer(item: any): XiaomiCredential {
  return {
    properties: xiaomiCredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub XiaomiCredentialProperties. */
export interface XiaomiCredentialProperties {
  /** Gets or sets app secret. */
  appSecret?: string;
  /** Gets or sets xiaomi service endpoint. */
  endpoint?: string;
}

export function xiaomiCredentialPropertiesSerializer(item: XiaomiCredentialProperties): any {
  return { appSecret: item["appSecret"], endpoint: item["endpoint"] };
}

export function xiaomiCredentialPropertiesDeserializer(item: any): XiaomiCredentialProperties {
  return {
    appSecret: item["appSecret"],
    endpoint: item["endpoint"],
  };
}

/** Description of a NotificationHub FcmV1Credential. */
export interface FcmV1Credential {
  /** Description of a NotificationHub FcmV1Credential. */
  properties: FcmV1CredentialProperties;
}

export function fcmV1CredentialSerializer(item: FcmV1Credential): any {
  return {
    properties: fcmV1CredentialPropertiesSerializer(item["properties"]),
  };
}

export function fcmV1CredentialDeserializer(item: any): FcmV1Credential {
  return {
    properties: fcmV1CredentialPropertiesDeserializer(item["properties"]),
  };
}

/** Description of a NotificationHub FcmV1Credential. */
export interface FcmV1CredentialProperties {
  /** Gets or sets client email. */
  clientEmail: string;
  /** Gets or sets private key. */
  privateKey: string;
  /** Gets or sets project id. */
  projectId: string;
}

export function fcmV1CredentialPropertiesSerializer(item: FcmV1CredentialProperties): any {
  return {
    clientEmail: item["clientEmail"],
    privateKey: item["privateKey"],
    projectId: item["projectId"],
  };
}

export function fcmV1CredentialPropertiesDeserializer(item: any): FcmV1CredentialProperties {
  return {
    clientEmail: item["clientEmail"],
    privateKey: item["privateKey"],
    projectId: item["projectId"],
  };
}

export function privateEndpointConnectionResourceArraySerializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceSerializer(item);
  });
}

export function privateEndpointConnectionResourceArrayDeserializer(
  result: Array<PrivateEndpointConnectionResource>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionResourceDeserializer(item);
  });
}

/** Represents a Private Endpoint Connection ARM resource - a sub-resource of Notification Hubs namespace. */
export interface PrivateEndpointConnectionResource extends ProxyResource {
  /** Private Endpoint Connection properties. */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionResourceSerializer(
  item: PrivateEndpointConnectionResource,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
  };
}

export function privateEndpointConnectionResourceDeserializer(
  item: any,
): PrivateEndpointConnectionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
  };
}

/** Private Endpoint Connection properties. */
export interface PrivateEndpointConnectionProperties {
  /** State of Private Endpoint Connection. */
  provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** Represents a Private Endpoint that is connected to Notification Hubs namespace using Private Endpoint Connection. */
  privateEndpoint?: RemotePrivateEndpointConnection;
  /** List of group ids. For Notification Hubs, it always contains a single "namespace" element. */
  readonly groupIds?: string[];
  /** State of the Private Link Service connection. */
  privateLinkServiceConnectionState?: RemotePrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : remotePrivateEndpointConnectionSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : remotePrivateLinkServiceConnectionStateSerializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : remotePrivateEndpointConnectionDeserializer(item["privateEndpoint"]),
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : remotePrivateLinkServiceConnectionStateDeserializer(
          item["privateLinkServiceConnectionState"],
        ),
  };
}

/** State of Private Endpoint Connection. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** UpdatingByProxy */
  UpdatingByProxy = "UpdatingByProxy",
  /** Deleting */
  Deleting = "Deleting",
  /** DeletingByProxy */
  DeletingByProxy = "DeletingByProxy",
  /** Deleted */
  Deleted = "Deleted",
}

/**
 * State of Private Endpoint Connection. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Succeeded** \
 * **Creating** \
 * **Updating** \
 * **UpdatingByProxy** \
 * **Deleting** \
 * **DeletingByProxy** \
 * **Deleted**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Represents a Private Endpoint that is connected to Notification Hubs namespace using Private Endpoint Connection. */
export interface RemotePrivateEndpointConnection {
  /** ARM resource ID of the Private Endpoint. This may belong to different subscription and resource group than a Notification Hubs namespace. */
  readonly id?: string;
}

export function remotePrivateEndpointConnectionSerializer(
  item: RemotePrivateEndpointConnection,
): any {
  return item;
}

export function remotePrivateEndpointConnectionDeserializer(
  item: any,
): RemotePrivateEndpointConnection {
  return {
    id: item["id"],
  };
}

/** State of the Private Link Service connection. */
export interface RemotePrivateLinkServiceConnectionState {
  /** State of Private Link Connection. */
  status?: PrivateLinkConnectionStatus;
  /** Human-friendly description. */
  readonly description?: string;
  /** Human-friendly description of required actions. */
  readonly actionsRequired?: string;
}

export function remotePrivateLinkServiceConnectionStateSerializer(
  item: RemotePrivateLinkServiceConnectionState,
): any {
  return { status: item["status"] };
}

export function remotePrivateLinkServiceConnectionStateDeserializer(
  item: any,
): RemotePrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** State of Private Link Connection. */
export enum KnownPrivateLinkConnectionStatus {
  /** Disconnected */
  Disconnected = "Disconnected",
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
}

/**
 * State of Private Link Connection. \
 * {@link KnownPrivateLinkConnectionStatus} can be used interchangeably with PrivateLinkConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disconnected** \
 * **Pending** \
 * **Approved** \
 * **Rejected**
 */
export type PrivateLinkConnectionStatus = string;

/** Type of public network access. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Type of public network access. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type PublicNetworkAccess = string;

/** The Sku description for a namespace */
export interface Sku {
  /** Namespace SKU name. */
  name: SkuName;
  /** Gets or sets the tier of particular sku */
  tier?: string;
  /** Gets or sets the Sku size */
  size?: string;
  /** Gets or sets the Sku Family */
  family?: string;
  /** Gets or sets the capacity of the resource */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    size: item["size"],
    family: item["family"],
    capacity: item["capacity"],
  };
}

/** Namespace SKU name. */
export enum KnownSkuName {
  /** Free */
  Free = "Free",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
}

/**
 * Namespace SKU name. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free** \
 * **Basic** \
 * **Standard**
 */
export type SkuName = string;

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

/** Patch parameter for NamespaceResource. */
export interface NamespacePatchParameters {
  /** The Sku description for a namespace */
  sku?: Sku;
  /** Represents namespace properties. */
  properties?: NamespaceProperties;
  /** Dictionary of <string> */
  tags?: Record<string, string>;
}

export function namespacePatchParametersSerializer(item: NamespacePatchParameters): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    properties: !item["properties"]
      ? item["properties"]
      : namespacePropertiesSerializer(item["properties"]),
    tags: item["tags"],
  };
}

/** Paged collection of NamespaceResource items */
export interface _NamespaceListResult {
  /** The NamespaceResource items on this page */
  readonly value: NamespaceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _namespaceListResultDeserializer(item: any): _NamespaceListResult {
  return {
    value: namespaceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function namespaceResourceArraySerializer(result: Array<NamespaceResource>): any[] {
  return result.map((item) => {
    return namespaceResourceSerializer(item);
  });
}

export function namespaceResourceArrayDeserializer(result: Array<NamespaceResource>): any[] {
  return result.map((item) => {
    return namespaceResourceDeserializer(item);
  });
}

/**
 * Description of a NotificationHub PNS Credentials. This is a response of the POST requests that return namespace or hubs
 * PNS credentials.
 */
export interface PnsCredentialsResource extends ProxyResource {
  /** Collection of Notification Hub or Notification Hub Namespace PNS credentials. */
  properties?: PnsCredentials;
  /** Deprecated - only for compatibility. */
  location?: string;
  /** Deprecated - only for compatibility. */
  tags?: Record<string, string>;
}

export function pnsCredentialsResourceDeserializer(item: any): PnsCredentialsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : pnsCredentialsDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/**
 * Parameters supplied to the Check Name Availability for Namespace and
 * NotificationHubs.
 */
export interface CheckAvailabilityParameters {
  /** Gets resource Id */
  readonly id?: string;
  /** Gets or sets resource name */
  name: string;
  /** Gets resource type */
  readonly type?: string;
  /** Gets or sets resource location */
  location?: string;
  /** Gets or sets resource tags */
  tags?: Record<string, string>;
  /** Not used and deprecated since API version 2023-01-01-preview */
  isAvailiable?: boolean;
  /** The Sku description for a namespace */
  sku?: Sku;
}

export function checkAvailabilityParametersSerializer(item: CheckAvailabilityParameters): any {
  return {
    name: item["name"],
    location: item["location"],
    tags: item["tags"],
    isAvailiable: item["isAvailiable"],
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

/** Description of a CheckAvailability resource. */
export interface CheckAvailabilityResult extends ProxyResource {
  /**
   * Gets or sets true if the name is available and can be used to
   * create new Namespace/NotificationHub. Otherwise false.
   */
  isAvailiable?: boolean;
  /** Deprecated - only for compatibility. */
  location?: string;
  /** Deprecated - only for compatibility. */
  tags?: Record<string, string>;
  /** The Sku description for a namespace */
  sku?: Sku;
}

export function checkAvailabilityResultDeserializer(item: any): CheckAvailabilityResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    isAvailiable: item["isAvailiable"],
    location: item["location"],
    tags: item["tags"],
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** Notification Hub Resource. */
export interface NotificationHubResource extends TrackedResource {
  /** NotificationHub properties. */
  properties?: NotificationHubProperties;
  /** The Sku description for a namespace */
  sku?: Sku;
}

export function notificationHubResourceSerializer(item: NotificationHubResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : notificationHubPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
  };
}

export function notificationHubResourceDeserializer(item: any): NotificationHubResource {
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
      : notificationHubPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** NotificationHub properties. */
export interface NotificationHubProperties {
  /** Gets or sets the NotificationHub name. */
  name?: string;
  /** Gets or sets the RegistrationTtl of the created NotificationHub */
  registrationTtl?: string;
  /** Gets or sets the AuthorizationRules of the created NotificationHub */
  readonly authorizationRules?: SharedAccessAuthorizationRuleProperties[];
  /** Description of a NotificationHub ApnsCredential. */
  apnsCredential?: ApnsCredential;
  /** Description of a NotificationHub WnsCredential. */
  wnsCredential?: WnsCredential;
  /** Description of a NotificationHub GcmCredential. */
  gcmCredential?: GcmCredential;
  /** Description of a NotificationHub MpnsCredential. */
  mpnsCredential?: MpnsCredential;
  /** Description of a NotificationHub AdmCredential. */
  admCredential?: AdmCredential;
  /** Description of a NotificationHub BaiduCredential. */
  baiduCredential?: BaiduCredential;
  /** Description of a NotificationHub BrowserCredential. */
  browserCredential?: BrowserCredential;
  /** Description of a NotificationHub XiaomiCredential. */
  xiaomiCredential?: XiaomiCredential;
  /** Description of a NotificationHub FcmV1Credential. */
  fcmV1Credential?: FcmV1Credential;
  readonly dailyMaxActiveDevices?: number;
}

export function notificationHubPropertiesSerializer(item: NotificationHubProperties): any {
  return {
    name: item["name"],
    registrationTtl: item["registrationTtl"],
    apnsCredential: !item["apnsCredential"]
      ? item["apnsCredential"]
      : apnsCredentialSerializer(item["apnsCredential"]),
    wnsCredential: !item["wnsCredential"]
      ? item["wnsCredential"]
      : wnsCredentialSerializer(item["wnsCredential"]),
    gcmCredential: !item["gcmCredential"]
      ? item["gcmCredential"]
      : gcmCredentialSerializer(item["gcmCredential"]),
    mpnsCredential: !item["mpnsCredential"]
      ? item["mpnsCredential"]
      : mpnsCredentialSerializer(item["mpnsCredential"]),
    admCredential: !item["admCredential"]
      ? item["admCredential"]
      : admCredentialSerializer(item["admCredential"]),
    baiduCredential: !item["baiduCredential"]
      ? item["baiduCredential"]
      : baiduCredentialSerializer(item["baiduCredential"]),
    browserCredential: !item["browserCredential"]
      ? item["browserCredential"]
      : browserCredentialSerializer(item["browserCredential"]),
    xiaomiCredential: !item["xiaomiCredential"]
      ? item["xiaomiCredential"]
      : xiaomiCredentialSerializer(item["xiaomiCredential"]),
    fcmV1Credential: !item["fcmV1Credential"]
      ? item["fcmV1Credential"]
      : fcmV1CredentialSerializer(item["fcmV1Credential"]),
  };
}

export function notificationHubPropertiesDeserializer(item: any): NotificationHubProperties {
  return {
    name: item["name"],
    registrationTtl: item["registrationTtl"],
    authorizationRules: !item["authorizationRules"]
      ? item["authorizationRules"]
      : sharedAccessAuthorizationRulePropertiesArrayDeserializer(item["authorizationRules"]),
    apnsCredential: !item["apnsCredential"]
      ? item["apnsCredential"]
      : apnsCredentialDeserializer(item["apnsCredential"]),
    wnsCredential: !item["wnsCredential"]
      ? item["wnsCredential"]
      : wnsCredentialDeserializer(item["wnsCredential"]),
    gcmCredential: !item["gcmCredential"]
      ? item["gcmCredential"]
      : gcmCredentialDeserializer(item["gcmCredential"]),
    mpnsCredential: !item["mpnsCredential"]
      ? item["mpnsCredential"]
      : mpnsCredentialDeserializer(item["mpnsCredential"]),
    admCredential: !item["admCredential"]
      ? item["admCredential"]
      : admCredentialDeserializer(item["admCredential"]),
    baiduCredential: !item["baiduCredential"]
      ? item["baiduCredential"]
      : baiduCredentialDeserializer(item["baiduCredential"]),
    browserCredential: !item["browserCredential"]
      ? item["browserCredential"]
      : browserCredentialDeserializer(item["browserCredential"]),
    xiaomiCredential: !item["xiaomiCredential"]
      ? item["xiaomiCredential"]
      : xiaomiCredentialDeserializer(item["xiaomiCredential"]),
    fcmV1Credential: !item["fcmV1Credential"]
      ? item["fcmV1Credential"]
      : fcmV1CredentialDeserializer(item["fcmV1Credential"]),
    dailyMaxActiveDevices: item["dailyMaxActiveDevices"],
  };
}

export function sharedAccessAuthorizationRulePropertiesArraySerializer(
  result: Array<SharedAccessAuthorizationRuleProperties>,
): any[] {
  return result.map((item) => {
    return sharedAccessAuthorizationRulePropertiesSerializer(item);
  });
}

export function sharedAccessAuthorizationRulePropertiesArrayDeserializer(
  result: Array<SharedAccessAuthorizationRuleProperties>,
): any[] {
  return result.map((item) => {
    return sharedAccessAuthorizationRulePropertiesDeserializer(item);
  });
}

/** Patch parameter for NamespaceResource. */
export interface NotificationHubPatchParameters {
  /** NotificationHub properties. */
  properties?: NotificationHubProperties;
  /** The Sku description for a namespace */
  sku?: Sku;
  /** Dictionary of <string> */
  tags?: Record<string, string>;
}

export function notificationHubPatchParametersSerializer(
  item: NotificationHubPatchParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : notificationHubPropertiesSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Paged collection of NotificationHubResource items */
export interface _NotificationHubListResult {
  /** The NotificationHubResource items on this page */
  readonly value: NotificationHubResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _notificationHubListResultDeserializer(item: any): _NotificationHubListResult {
  return {
    value: notificationHubResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function notificationHubResourceArraySerializer(
  result: Array<NotificationHubResource>,
): any[] {
  return result.map((item) => {
    return notificationHubResourceSerializer(item);
  });
}

export function notificationHubResourceArrayDeserializer(
  result: Array<NotificationHubResource>,
): any[] {
  return result.map((item) => {
    return notificationHubResourceDeserializer(item);
  });
}

/** Description of a NotificationHub Resource. */
export interface DebugSendResponse extends ProxyResource {
  /** Result of DebugSend operations. */
  properties?: DebugSendResult;
  /** Deprecated - only for compatibility. */
  location?: string;
  /** Deprecated - only for compatibility. */
  tags?: Record<string, string>;
}

export function debugSendResponseDeserializer(item: any): DebugSendResponse {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : debugSendResultDeserializer(item["properties"]),
    location: item["location"],
    tags: item["tags"],
  };
}

/** Result of DebugSend operations. */
export interface DebugSendResult {
  /** Gets or sets successful send */
  readonly success?: number;
  /** Gets or sets send failure */
  readonly failure?: number;
  /** Gets or sets actual failure description */
  readonly results?: RegistrationResult[];
}

export function debugSendResultDeserializer(item: any): DebugSendResult {
  return {
    success: item["success"],
    failure: item["failure"],
    results: !item["results"]
      ? item["results"]
      : registrationResultArrayDeserializer(item["results"]),
  };
}

export function registrationResultArrayDeserializer(result: Array<RegistrationResult>): any[] {
  return result.map((item) => {
    return registrationResultDeserializer(item);
  });
}

/** Notification result for a single registration. */
export interface RegistrationResult {
  /** PNS type. */
  readonly applicationPlatform?: string;
  /** PNS handle. */
  readonly pnsHandle?: string;
  /** Registration id. */
  readonly registrationId?: string;
  /** Notification outcome. */
  readonly outcome?: string;
}

export function registrationResultDeserializer(item: any): RegistrationResult {
  return {
    applicationPlatform: item["applicationPlatform"],
    pnsHandle: item["pnsHandle"],
    registrationId: item["registrationId"],
    outcome: item["outcome"],
  };
}

/** The response of a PrivateEndpointConnectionResource list operation. */
export interface _PrivateEndpointConnectionResourceListResult {
  /** The PrivateEndpointConnectionResource items on this page */
  readonly value: PrivateEndpointConnectionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionResourceListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionResourceListResult {
  return {
    value: privateEndpointConnectionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A Private Link Arm Resource. */
export interface PrivateLinkResource extends ProxyResource {
  /** Represents properties of Private Link Resource. */
  properties?: PrivateLinkResourceProperties;
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : privateLinkResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Represents properties of Private Link Resource. */
export interface PrivateLinkResourceProperties {
  /** A Group Id for Private Link. For Notification Hubs, it is always set to "namespace". */
  readonly groupId?: string;
  /** Required members. For Notification Hubs, it's always a collection with a single "namespace" item. */
  readonly requiredMembers?: string[];
  /** Required DNS zone names. For Notification Hubs, it contains two CNames for Service Bus and Notification Hubs zones. */
  readonly requiredZoneNames?: string[];
}

export function privateLinkResourcePropertiesDeserializer(
  item: any,
): PrivateLinkResourceProperties {
  return {
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    requiredZoneNames: !item["requiredZoneNames"]
      ? item["requiredZoneNames"]
      : item["requiredZoneNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a PrivateLinkResource list operation. */
export interface _PrivateLinkResourceListResult {
  /** The PrivateLinkResource items on this page */
  readonly value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateLinkResourceListResultDeserializer(
  item: any,
): _PrivateLinkResourceListResult {
  return {
    value: privateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-10-01-preview API version. */
  V20231001Preview = "2023-10-01-preview",
}
