// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** A Event Hub REST API operation */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  readonly name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Origin of the operation */
  origin?: string;
  /** Properties of the operation */
  properties?: any;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: item["properties"],
  };
}

/** Operation display payload */
export interface OperationDisplay {
  /** Resource provider of the operation */
  readonly provider?: string;
  /** Resource of the operation */
  readonly resource?: string;
  /** Localized friendly name for the operation */
  readonly operation?: string;
  /** Localized friendly description for the operation */
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

/** Error response indicates Event Hub service is not able to process the incoming request. The reason is provided in the error message. */
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

/** Single Event Hubs Cluster resource in List or Get operations. */
export interface Cluster extends ProxyResource {
  /** Properties of the cluster SKU. */
  sku?: ClusterSku;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The UTC time when the Event Hubs Cluster was created. */
  readonly createdAt?: string;
  /** Provisioning state of the Cluster. */
  readonly provisioningState?: ProvisioningState;
  /** The UTC time when the Event Hubs Cluster was last updated. */
  readonly updatedAt?: string;
  /** The metric ID of the cluster resource. Provided by the service and not modifiable by the user. */
  readonly metricId?: string;
  /** Status of the Cluster resource */
  readonly status?: string;
  /** A value that indicates whether Scaling is Supported. */
  supportsScaling?: boolean;
  platformCapabilities?: PlatformCapabilities;
  /** A value that indicates whether the cluster is zone redundant. */
  zoneRedundant?: boolean;
}

export function clusterSerializer(item: Cluster): any {
  return {
    properties: areAllPropsUndefined(item, [
      "supportsScaling",
      "platformCapabilities",
      "zoneRedundant",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : clusterSkuSerializer(item["sku"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function clusterDeserializer(item: any): Cluster {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _clusterPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : clusterSkuDeserializer(item["sku"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Event Hubs Cluster properties supplied in responses in List or Get operations. */
export interface ClusterProperties {
  /** The UTC time when the Event Hubs Cluster was created. */
  readonly createdAt?: string;
  /** Provisioning state of the Cluster. */
  readonly provisioningState?: ProvisioningState;
  /** The UTC time when the Event Hubs Cluster was last updated. */
  readonly updatedAt?: string;
  /** The metric ID of the cluster resource. Provided by the service and not modifiable by the user. */
  readonly metricId?: string;
  /** Status of the Cluster resource */
  readonly status?: string;
  /** A value that indicates whether Scaling is Supported. */
  supportsScaling?: boolean;
  platformCapabilities?: PlatformCapabilities;
  /** A value that indicates whether the cluster is zone redundant. */
  zoneRedundant?: boolean;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    supportsScaling: item["supportsScaling"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
    zoneRedundant: item["zoneRedundant"],
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    updatedAt: item["updatedAt"],
    metricId: item["metricId"],
    status: item["status"],
    supportsScaling: item["supportsScaling"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
    zoneRedundant: item["zoneRedundant"],
  };
}

/** Provisioning state of the Cluster. */
export enum KnownProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Scaling */
  Scaling = "Scaling",
  /** Active */
  Active = "Active",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of the Cluster. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Creating** \
 * **Deleting** \
 * **Scaling** \
 * **Active** \
 * **Failed** \
 * **Succeeded** \
 * **Canceled**
 */
export type ProvisioningState = string;

/** model interface PlatformCapabilities */
export interface PlatformCapabilities {
  confidentialCompute?: ConfidentialCompute;
}

export function platformCapabilitiesSerializer(item: PlatformCapabilities): any {
  return {
    confidentialCompute: !item["confidentialCompute"]
      ? item["confidentialCompute"]
      : confidentialComputeSerializer(item["confidentialCompute"]),
  };
}

export function platformCapabilitiesDeserializer(item: any): PlatformCapabilities {
  return {
    confidentialCompute: !item["confidentialCompute"]
      ? item["confidentialCompute"]
      : confidentialComputeDeserializer(item["confidentialCompute"]),
  };
}

/** model interface ConfidentialCompute */
export interface ConfidentialCompute {
  /** Setting to Enable or Disable Confidential Compute */
  mode?: Mode;
}

export function confidentialComputeSerializer(item: ConfidentialCompute): any {
  return { mode: item["mode"] };
}

export function confidentialComputeDeserializer(item: any): ConfidentialCompute {
  return {
    mode: item["mode"],
  };
}

/** Setting to Enable or Disable Confidential Compute */
export enum KnownMode {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Setting to Enable or Disable Confidential Compute \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type Mode = string;

/** SKU parameters particular to a cluster instance. */
export interface ClusterSku {
  /** Name of this SKU. */
  name: ClusterSkuName;
  /** The quantity of Event Hubs Cluster Capacity Units contained in this cluster. */
  capacity?: number;
}

export function clusterSkuSerializer(item: ClusterSku): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function clusterSkuDeserializer(item: any): ClusterSku {
  return {
    name: item["name"],
    capacity: item["capacity"],
  };
}

/** Name of this SKU. */
export enum KnownClusterSkuName {
  /** Dedicated */
  Dedicated = "Dedicated",
}

/**
 * Name of this SKU. \
 * {@link KnownClusterSkuName} can be used interchangeably with ClusterSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dedicated**
 */
export type ClusterSkuName = string;

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

/** The response of a Cluster list operation. */
export interface _ClusterListResult {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
  return {
    value: clusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterArraySerializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterSerializer(item);
  });
}

export function clusterArrayDeserializer(result: Array<Cluster>): any[] {
  return result.map((item) => {
    return clusterDeserializer(item);
  });
}

/** The response of the List Namespace IDs operation */
export interface EHNamespaceIdListResult {
  /** Result of the List Namespace IDs operation */
  value?: EHNamespaceIdContainer[];
}

export function ehNamespaceIdListResultDeserializer(item: any): EHNamespaceIdListResult {
  return {
    value: !item["value"] ? item["value"] : ehNamespaceIdContainerArrayDeserializer(item["value"]),
  };
}

export function ehNamespaceIdContainerArrayDeserializer(
  result: Array<EHNamespaceIdContainer>,
): any[] {
  return result.map((item) => {
    return ehNamespaceIdContainerDeserializer(item);
  });
}

/** The full ARM ID of an Event Hubs Namespace */
export interface EHNamespaceIdContainer {
  /** id parameter */
  id?: string;
}

export function ehNamespaceIdContainerDeserializer(item: any): EHNamespaceIdContainer {
  return {
    id: item["id"],
  };
}

/** The response of the List Available Clusters operation. */
export interface AvailableClustersList {
  /** The count of readily available and pre-provisioned Event Hubs Clusters per region. */
  value?: AvailableCluster[];
}

export function availableClustersListDeserializer(item: any): AvailableClustersList {
  return {
    value: !item["value"] ? item["value"] : availableClusterArrayDeserializer(item["value"]),
  };
}

export function availableClusterArrayDeserializer(result: Array<AvailableCluster>): any[] {
  return result.map((item) => {
    return availableClusterDeserializer(item);
  });
}

/** Pre-provisioned and readily available Event Hubs Cluster count per region. */
export interface AvailableCluster {
  /** Location fo the Available Cluster */
  location?: string;
}

export function availableClusterDeserializer(item: any): AvailableCluster {
  return {
    location: item["location"],
  };
}

/** Single item in a List or Get AuthorizationRule operation */
export interface AuthorizationRule extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** The rights associated with the rule. */
  rights?: AccessRights[];
}

export function authorizationRuleSerializer(item: AuthorizationRule): any {
  return {
    properties: areAllPropsUndefined(item, ["rights"])
      ? undefined
      : _authorizationRulePropertiesSerializer(item),
  };
}

export function authorizationRuleDeserializer(item: any): AuthorizationRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _authorizationRulePropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties supplied to create or update AuthorizationRule */
export interface AuthorizationRuleProperties {
  /** The rights associated with the rule. */
  rights: AccessRights[];
}

export function authorizationRulePropertiesSerializer(item: AuthorizationRuleProperties): any {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

export function authorizationRulePropertiesDeserializer(item: any): AuthorizationRuleProperties {
  return {
    rights: item["rights"].map((p: any) => {
      return p;
    }),
  };
}

/** Known values of {@link AccessRights} that the service accepts. */
export enum KnownAccessRights {
  /** Manage */
  Manage = "Manage",
  /** Send */
  Send = "Send",
  /** Listen */
  Listen = "Listen",
}

/** Type of AccessRights */
export type AccessRights = string;

/** The response of a AuthorizationRule list operation. */
export interface _AuthorizationRuleListResult {
  /** The AuthorizationRule items on this page */
  value: AuthorizationRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _authorizationRuleListResultDeserializer(item: any): _AuthorizationRuleListResult {
  return {
    value: authorizationRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function authorizationRuleArraySerializer(result: Array<AuthorizationRule>): any[] {
  return result.map((item) => {
    return authorizationRuleSerializer(item);
  });
}

export function authorizationRuleArrayDeserializer(result: Array<AuthorizationRule>): any[] {
  return result.map((item) => {
    return authorizationRuleDeserializer(item);
  });
}

/** Namespace/EventHub Connection String */
export interface AccessKeys {
  /** Primary connection string of the created namespace AuthorizationRule. */
  readonly primaryConnectionString?: string;
  /** Secondary connection string of the created namespace AuthorizationRule. */
  readonly secondaryConnectionString?: string;
  /** Primary connection string of the alias if GEO DR is enabled */
  readonly aliasPrimaryConnectionString?: string;
  /** Secondary  connection string of the alias if GEO DR is enabled */
  readonly aliasSecondaryConnectionString?: string;
  /** A base64-encoded 256-bit primary key for signing and validating the SAS token. */
  readonly primaryKey?: string;
  /** A base64-encoded 256-bit primary key for signing and validating the SAS token. */
  readonly secondaryKey?: string;
  /** A string that describes the AuthorizationRule. */
  readonly keyName?: string;
}

export function accessKeysDeserializer(item: any): AccessKeys {
  return {
    primaryConnectionString: item["primaryConnectionString"],
    secondaryConnectionString: item["secondaryConnectionString"],
    aliasPrimaryConnectionString: item["aliasPrimaryConnectionString"],
    aliasSecondaryConnectionString: item["aliasSecondaryConnectionString"],
    primaryKey: item["primaryKey"],
    secondaryKey: item["secondaryKey"],
    keyName: item["keyName"],
  };
}

/** Parameter supplied to check Namespace name availability operation */
export interface CheckNameAvailabilityParameter {
  /** Name to check the namespace name availability */
  name: string;
}

export function checkNameAvailabilityParameterSerializer(
  item: CheckNameAvailabilityParameter,
): any {
  return { name: item["name"] };
}

/** The Result of the CheckNameAvailability operation */
export interface CheckNameAvailabilityResult {
  /** The detailed info regarding the reason associated with the Namespace. */
  readonly message?: string;
  /** Value indicating Namespace is availability, true if the Namespace is available; otherwise, false. */
  nameAvailable?: boolean;
  /** The reason for unavailability of a Namespace. */
  reason?: UnavailableReason;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    message: item["message"],
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
  };
}

/** Specifies the reason for the unavailability of the service. */
export type UnavailableReason =
  | "None"
  | "InvalidName"
  | "SubscriptionIsDisabled"
  | "NameInUse"
  | "NameInLockdown"
  | "TooManyNamespaceInCurrentSubscription";

/** Single item in List or Get Alias(Disaster Recovery configuration) operation */
export interface ArmDisasterRecovery extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed' */
  readonly provisioningState?: ProvisioningStateDR;
  /** ARM Id of the Primary/Secondary eventhub namespace name, which is part of GEO DR pairing */
  partnerNamespace?: string;
  /** Alternate name specified when alias and namespace names are same. */
  alternateName?: string;
  /** role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary' */
  readonly role?: RoleDisasterRecovery;
  /** Number of entities pending to be replicated. */
  readonly pendingReplicationOperationsCount?: number;
}

export function armDisasterRecoverySerializer(item: ArmDisasterRecovery): any {
  return {
    properties: areAllPropsUndefined(item, ["partnerNamespace", "alternateName"])
      ? undefined
      : _armDisasterRecoveryPropertiesSerializer(item),
  };
}

export function armDisasterRecoveryDeserializer(item: any): ArmDisasterRecovery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _armDisasterRecoveryPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties required to the Create Or Update Alias(Disaster Recovery configurations) */
export interface ArmDisasterRecoveryProperties {
  /** Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed' */
  readonly provisioningState?: ProvisioningStateDR;
  /** ARM Id of the Primary/Secondary eventhub namespace name, which is part of GEO DR pairing */
  partnerNamespace?: string;
  /** Alternate name specified when alias and namespace names are same. */
  alternateName?: string;
  /** role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary' */
  readonly role?: RoleDisasterRecovery;
  /** Number of entities pending to be replicated. */
  readonly pendingReplicationOperationsCount?: number;
}

export function armDisasterRecoveryPropertiesSerializer(item: ArmDisasterRecoveryProperties): any {
  return { partnerNamespace: item["partnerNamespace"], alternateName: item["alternateName"] };
}

export function armDisasterRecoveryPropertiesDeserializer(
  item: any,
): ArmDisasterRecoveryProperties {
  return {
    provisioningState: item["provisioningState"],
    partnerNamespace: item["partnerNamespace"],
    alternateName: item["alternateName"],
    role: item["role"],
    pendingReplicationOperationsCount: item["pendingReplicationOperationsCount"],
  };
}

/** Provisioning state of the Alias(Disaster Recovery configuration) - possible values 'Accepted' or 'Succeeded' or 'Failed' */
export type ProvisioningStateDR = "Accepted" | "Succeeded" | "Failed";
/** role of namespace in GEO DR - possible values 'Primary' or 'PrimaryNotReplicating' or 'Secondary' */
export type RoleDisasterRecovery = "Primary" | "PrimaryNotReplicating" | "Secondary";

/** The response of a ArmDisasterRecovery list operation. */
export interface _ArmDisasterRecoveryListResult {
  /** The ArmDisasterRecovery items on this page */
  value: ArmDisasterRecovery[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _armDisasterRecoveryListResultDeserializer(
  item: any,
): _ArmDisasterRecoveryListResult {
  return {
    value: armDisasterRecoveryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function armDisasterRecoveryArraySerializer(result: Array<ArmDisasterRecovery>): any[] {
  return result.map((item) => {
    return armDisasterRecoverySerializer(item);
  });
}

export function armDisasterRecoveryArrayDeserializer(result: Array<ArmDisasterRecovery>): any[] {
  return result.map((item) => {
    return armDisasterRecoveryDeserializer(item);
  });
}

/** Parameters supplied to the Regenerate Authorization Rule operation, specifies which key needs to be reset. */
export interface RegenerateAccessKeyParameters {
  /** The access key to regenerate. */
  keyType: KeyType;
  /** Optional, if the key value provided, is set for KeyType or autogenerated Key value set for keyType */
  key?: string;
}

export function regenerateAccessKeyParametersSerializer(item: RegenerateAccessKeyParameters): any {
  return { keyType: item["keyType"], key: item["key"] };
}

/** The access key to regenerate. */
export enum KnownKeyType {
  /** PrimaryKey */
  PrimaryKey = "PrimaryKey",
  /** SecondaryKey */
  SecondaryKey = "SecondaryKey",
}

/**
 * The access key to regenerate. \
 * {@link KnownKeyType} can be used interchangeably with KeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrimaryKey** \
 * **SecondaryKey**
 */
export type KeyType = string;

/** Single item in List or Get Event Hub operation */
export interface Eventhub extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Current number of shards on the Event Hub. */
  readonly partitionIds?: string[];
  /** Exact time the Event Hub was created. */
  readonly createdAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** Number of days to retain the events for this Event Hub, value should be 1 to 7 days */
  messageRetentionInDays?: number;
  /** Number of partitions created for the Event Hub, allowed values are from 1 to 32 partitions. */
  partitionCount?: number;
  /** Enumerates the possible values for the status of the Event Hub. */
  status?: EntityStatus;
  /** Properties of capture description */
  captureDescription?: CaptureDescription;
  /** Event Hub retention settings */
  retentionDescription?: RetentionDescription;
  /** Properties of MessageTimestamp Description */
  messageTimestampDescription?: MessageTimestampDescription;
  /** Denotes the unique identifier for event hub and is generated by service while creating topic. This identifier can be used in kafka runtime apis wherever a UUID is required e.g Fetch & Delete Topic. This identifier is not supported in AMQP runtime operations yet. */
  readonly identifier?: string;
  /** Gets and Sets Metadata of User. */
  userMetadata?: string;
}

export function eventhubSerializer(item: Eventhub): any {
  return {
    properties: areAllPropsUndefined(item, [
      "messageRetentionInDays",
      "partitionCount",
      "status",
      "captureDescription",
      "retentionDescription",
      "messageTimestampDescription",
      "userMetadata",
    ])
      ? undefined
      : _eventhubPropertiesSerializer(item),
  };
}

export function eventhubDeserializer(item: any): Eventhub {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _eventhubPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties supplied to the Create Or Update Event Hub operation. */
export interface EventhubProperties {
  /** Current number of shards on the Event Hub. */
  readonly partitionIds?: string[];
  /** Exact time the Event Hub was created. */
  readonly createdAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** Number of days to retain the events for this Event Hub, value should be 1 to 7 days */
  messageRetentionInDays?: number;
  /** Number of partitions created for the Event Hub, allowed values are from 1 to 32 partitions. */
  partitionCount?: number;
  /** Enumerates the possible values for the status of the Event Hub. */
  status?: EntityStatus;
  /** Properties of capture description */
  captureDescription?: CaptureDescription;
  /** Event Hub retention settings */
  retentionDescription?: RetentionDescription;
  /** Properties of MessageTimestamp Description */
  messageTimestampDescription?: MessageTimestampDescription;
  /** Denotes the unique identifier for event hub and is generated by service while creating topic. This identifier can be used in kafka runtime apis wherever a UUID is required e.g Fetch & Delete Topic. This identifier is not supported in AMQP runtime operations yet. */
  readonly identifier?: string;
  /** Gets and Sets Metadata of User. */
  userMetadata?: string;
}

export function eventhubPropertiesSerializer(item: EventhubProperties): any {
  return {
    messageRetentionInDays: item["messageRetentionInDays"],
    partitionCount: item["partitionCount"],
    status: item["status"],
    captureDescription: !item["captureDescription"]
      ? item["captureDescription"]
      : captureDescriptionSerializer(item["captureDescription"]),
    retentionDescription: !item["retentionDescription"]
      ? item["retentionDescription"]
      : retentionDescriptionSerializer(item["retentionDescription"]),
    messageTimestampDescription: !item["messageTimestampDescription"]
      ? item["messageTimestampDescription"]
      : messageTimestampDescriptionSerializer(item["messageTimestampDescription"]),
    userMetadata: item["userMetadata"],
  };
}

export function eventhubPropertiesDeserializer(item: any): EventhubProperties {
  return {
    partitionIds: !item["partitionIds"]
      ? item["partitionIds"]
      : item["partitionIds"].map((p: any) => {
          return p;
        }),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    messageRetentionInDays: item["messageRetentionInDays"],
    partitionCount: item["partitionCount"],
    status: item["status"],
    captureDescription: !item["captureDescription"]
      ? item["captureDescription"]
      : captureDescriptionDeserializer(item["captureDescription"]),
    retentionDescription: !item["retentionDescription"]
      ? item["retentionDescription"]
      : retentionDescriptionDeserializer(item["retentionDescription"]),
    messageTimestampDescription: !item["messageTimestampDescription"]
      ? item["messageTimestampDescription"]
      : messageTimestampDescriptionDeserializer(item["messageTimestampDescription"]),
    identifier: item["identifier"],
    userMetadata: item["userMetadata"],
  };
}

/** Enumerates the possible values for the status of the Event Hub. */
export type EntityStatus =
  | "Active"
  | "Disabled"
  | "Restoring"
  | "SendDisabled"
  | "ReceiveDisabled"
  | "Creating"
  | "Deleting"
  | "Renaming"
  | "Unknown";

/** Properties to configure capture description for eventhub */
export interface CaptureDescription {
  /** A value that indicates whether capture description is enabled. */
  enabled?: boolean;
  /** Enumerates the possible values for the encoding format of capture description. Note: 'AvroDeflate' will be deprecated in New API Version */
  encoding?: EncodingCaptureDescription;
  /** The time window allows you to set the frequency with which the capture to Azure Blobs will happen, value should between 60 to 900 seconds */
  intervalInSeconds?: number;
  /** The size window defines the amount of data built up in your Event Hub before an capture operation, value should be between 10485760 to 524288000 bytes */
  sizeLimitInBytes?: number;
  /** Properties of Destination where capture will be stored. (Storage Account, Blob Names) */
  destination?: Destination;
  /** A value that indicates whether to Skip Empty Archives */
  skipEmptyArchives?: boolean;
}

export function captureDescriptionSerializer(item: CaptureDescription): any {
  return {
    enabled: item["enabled"],
    encoding: item["encoding"],
    intervalInSeconds: item["intervalInSeconds"],
    sizeLimitInBytes: item["sizeLimitInBytes"],
    destination: !item["destination"]
      ? item["destination"]
      : destinationSerializer(item["destination"]),
    skipEmptyArchives: item["skipEmptyArchives"],
  };
}

export function captureDescriptionDeserializer(item: any): CaptureDescription {
  return {
    enabled: item["enabled"],
    encoding: item["encoding"],
    intervalInSeconds: item["intervalInSeconds"],
    sizeLimitInBytes: item["sizeLimitInBytes"],
    destination: !item["destination"]
      ? item["destination"]
      : destinationDeserializer(item["destination"]),
    skipEmptyArchives: item["skipEmptyArchives"],
  };
}

/** Enumerates the possible values for the encoding format of capture description. Note: 'AvroDeflate' will be deprecated in New API Version */
export type EncodingCaptureDescription = "Avro" | "AvroDeflate";

/** Capture storage details for capture description */
export interface Destination {
  /** Name for capture destination */
  name?: string;
  /** A value that indicates whether capture description is enabled. */
  identity?: CaptureIdentity;
  /** Resource id of the storage account to be used to create the blobs */
  storageAccountResourceId?: string;
  /** Blob container Name */
  blobContainer?: string;
  /** Blob naming convention for archive, e.g. {Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}. Here all the parameters (Namespace,EventHub .. etc) are mandatory irrespective of order */
  archiveNameFormat?: string;
  /** Subscription Id of Azure Data Lake Store */
  dataLakeSubscriptionId?: string;
  /** The Azure Data Lake Store name for the captured events */
  dataLakeAccountName?: string;
  /** The destination folder path for the captured events */
  dataLakeFolderPath?: string;
}

export function destinationSerializer(item: Destination): any {
  return {
    name: item["name"],
    identity: !item["identity"] ? item["identity"] : captureIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "storageAccountResourceId",
      "blobContainer",
      "archiveNameFormat",
      "dataLakeSubscriptionId",
      "dataLakeAccountName",
      "dataLakeFolderPath",
    ])
      ? undefined
      : _destinationPropertiesSerializer(item),
  };
}

export function destinationDeserializer(item: any): Destination {
  return {
    name: item["name"],
    identity: !item["identity"] ? item["identity"] : captureIdentityDeserializer(item["identity"]),
    ...(!item["properties"]
      ? item["properties"]
      : _destinationPropertiesDeserializer(item["properties"])),
  };
}

/** A value that indicates whether capture description is enabled. */
export interface CaptureIdentity {
  /** Type of Azure Active Directory Managed Identity. */
  type?: CaptureIdentityType;
  /** ARM ID of Managed User Identity. This property is required is the type is UserAssignedIdentity. If type is SystemAssigned, then the System Assigned Identity Associated with the namespace will be used. */
  userAssignedIdentity?: string;
}

export function captureIdentitySerializer(item: CaptureIdentity): any {
  return { type: item["type"], userAssignedIdentity: item["userAssignedIdentity"] };
}

export function captureIdentityDeserializer(item: any): CaptureIdentity {
  return {
    type: item["type"],
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** Type of Azure Active Directory Managed Identity. */
export type CaptureIdentityType = "SystemAssigned" | "UserAssigned";

/** Properties describing the storage account, blob container and archive name format for capture destination */
export interface DestinationProperties {
  /** Resource id of the storage account to be used to create the blobs */
  storageAccountResourceId?: string;
  /** Blob container Name */
  blobContainer?: string;
  /** Blob naming convention for archive, e.g. {Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}. Here all the parameters (Namespace,EventHub .. etc) are mandatory irrespective of order */
  archiveNameFormat?: string;
  /** Subscription Id of Azure Data Lake Store */
  dataLakeSubscriptionId?: string;
  /** The Azure Data Lake Store name for the captured events */
  dataLakeAccountName?: string;
  /** The destination folder path for the captured events */
  dataLakeFolderPath?: string;
}

export function destinationPropertiesSerializer(item: DestinationProperties): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainer: item["blobContainer"],
    archiveNameFormat: item["archiveNameFormat"],
    dataLakeSubscriptionId: item["dataLakeSubscriptionId"],
    dataLakeAccountName: item["dataLakeAccountName"],
    dataLakeFolderPath: item["dataLakeFolderPath"],
  };
}

export function destinationPropertiesDeserializer(item: any): DestinationProperties {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainer: item["blobContainer"],
    archiveNameFormat: item["archiveNameFormat"],
    dataLakeSubscriptionId: item["dataLakeSubscriptionId"],
    dataLakeAccountName: item["dataLakeAccountName"],
    dataLakeFolderPath: item["dataLakeFolderPath"],
  };
}

/** Properties to configure retention settings for the  eventhub */
export interface RetentionDescription {
  /** Enumerates the possible values for cleanup policy */
  cleanupPolicy?: CleanupPolicyRetentionDescription;
  /** Number of hours to retain the events for this Event Hub. This should be positive value upto namespace SKU max. -1 is a special case where retention time is infinite, but the size of an entity is restricted and its size depends on namespace SKU type. */
  retentionTimeInHours?: number;
  /** The minimum time a message will remain ineligible for compaction in the log. This value is used when cleanupPolicy is Compact or DeleteOrCompact. */
  minCompactionLagTimeInMinutes?: number;
  /** Number of hours to retain the tombstone markers of a compacted Event Hub. This value is used when cleanupPolicy is Compact or DeleteOrCompact. Consumer must complete reading the tombstone marker within this specified amount of time if consumer begins from starting offset to ensure they get a valid snapshot for the specific key described by the tombstone marker within the compacted Event Hub */
  tombstoneRetentionTimeInHours?: number;
}

export function retentionDescriptionSerializer(item: RetentionDescription): any {
  return {
    cleanupPolicy: item["cleanupPolicy"],
    retentionTimeInHours: item["retentionTimeInHours"],
    minCompactionLagTimeInMinutes: item["minCompactionLagTimeInMinutes"],
    tombstoneRetentionTimeInHours: item["tombstoneRetentionTimeInHours"],
  };
}

export function retentionDescriptionDeserializer(item: any): RetentionDescription {
  return {
    cleanupPolicy: item["cleanupPolicy"],
    retentionTimeInHours: item["retentionTimeInHours"],
    minCompactionLagTimeInMinutes: item["minCompactionLagTimeInMinutes"],
    tombstoneRetentionTimeInHours: item["tombstoneRetentionTimeInHours"],
  };
}

/** Enumerates the possible values for cleanup policy */
export enum KnownCleanupPolicyRetentionDescription {
  /** Delete */
  Delete = "Delete",
  /** Compact */
  Compact = "Compact",
  /** DeleteOrCompact */
  DeleteOrCompact = "DeleteOrCompact",
}

/**
 * Enumerates the possible values for cleanup policy \
 * {@link KnownCleanupPolicyRetentionDescription} can be used interchangeably with CleanupPolicyRetentionDescription,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete** \
 * **Compact** \
 * **DeleteOrCompact**
 */
export type CleanupPolicyRetentionDescription = string;

/** Properties of MessageTimestamp Description */
export interface MessageTimestampDescription {
  /** Denotes the type of timestamp the message will hold.Two types of timestamp types - "AppendTime" and "CreateTime". AppendTime refers the time in which message got appended inside broker log. CreateTime refers to the time in which the message was generated on source side and producers can set this timestamp while sending the message. Default value is AppendTime. If you are using AMQP protocol, CreateTime equals AppendTime and its behavior remains the same. */
  timestampType?: TimestampType;
}

export function messageTimestampDescriptionSerializer(item: MessageTimestampDescription): any {
  return { timestampType: item["timestampType"] };
}

export function messageTimestampDescriptionDeserializer(item: any): MessageTimestampDescription {
  return {
    timestampType: item["timestampType"],
  };
}

/** Denotes the type of timestamp the message will hold.Two types of timestamp types - "AppendTime" and "CreateTime". AppendTime refers the time in which message got appended inside broker log. CreateTime refers to the time in which the message was generated on source side and producers can set this timestamp while sending the message. Default value is AppendTime. If you are using AMQP protocol, CreateTime equals AppendTime and its behavior remains the same. */
export enum KnownTimestampType {
  /** LogAppend */
  LogAppend = "LogAppend",
  /** Create */
  Create = "Create",
}

/**
 * Denotes the type of timestamp the message will hold.Two types of timestamp types - "AppendTime" and "CreateTime". AppendTime refers the time in which message got appended inside broker log. CreateTime refers to the time in which the message was generated on source side and producers can set this timestamp while sending the message. Default value is AppendTime. If you are using AMQP protocol, CreateTime equals AppendTime and its behavior remains the same. \
 * {@link KnownTimestampType} can be used interchangeably with TimestampType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogAppend** \
 * **Create**
 */
export type TimestampType = string;

/** Paged collection of Eventhub items */
export interface _EventHubListResult {
  /** The Eventhub items on this page */
  value: Eventhub[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _eventHubListResultDeserializer(item: any): _EventHubListResult {
  return {
    value: eventhubArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function eventhubArraySerializer(result: Array<Eventhub>): any[] {
  return result.map((item) => {
    return eventhubSerializer(item);
  });
}

export function eventhubArrayDeserializer(result: Array<Eventhub>): any[] {
  return result.map((item) => {
    return eventhubDeserializer(item);
  });
}

/** Properties of the PrivateEndpointConnection. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** The Private Endpoint resource for this Connection. */
  privateEndpoint?: PrivateEndpoint;
  /** Details about the state of the connection. */
  privateLinkServiceConnectionState?: ConnectionState;
  /** Provisioning state of the Private Endpoint Connection. */
  provisioningState?: EndPointProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, [
      "privateEndpoint",
      "privateLinkServiceConnectionState",
      "provisioningState",
    ])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties of the private endpoint connection resource. */
export interface PrivateEndpointConnectionProperties {
  /** The Private Endpoint resource for this Connection. */
  privateEndpoint?: PrivateEndpoint;
  /** Details about the state of the connection. */
  privateLinkServiceConnectionState?: ConnectionState;
  /** Provisioning state of the Private Endpoint Connection. */
  provisioningState?: EndPointProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateSerializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

/** PrivateEndpoint information. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint. */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** ConnectionState information. */
export interface ConnectionState {
  /** Status of the connection. */
  status?: PrivateLinkConnectionStatus;
  /** Description of the connection state. */
  description?: string;
}

export function connectionStateSerializer(item: ConnectionState): any {
  return { status: item["status"], description: item["description"] };
}

export function connectionStateDeserializer(item: any): ConnectionState {
  return {
    status: item["status"],
    description: item["description"],
  };
}

/** Status of the connection. */
export enum KnownPrivateLinkConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * Status of the connection. \
 * {@link KnownPrivateLinkConnectionStatus} can be used interchangeably with PrivateLinkConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type PrivateLinkConnectionStatus = string;

/** Provisioning state of the Private Endpoint Connection. */
export enum KnownEndPointProvisioningState {
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Provisioning state of the Private Endpoint Connection. \
 * {@link KnownEndPointProvisioningState} can be used interchangeably with EndPointProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Succeeded** \
 * **Canceled** \
 * **Failed**
 */
export type EndPointProvisioningState = string;

/** The response of a PrivateEndpointConnection list operation. */
export interface _PrivateEndpointConnectionListResult {
  /** The PrivateEndpointConnection items on this page */
  value: PrivateEndpointConnection[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** Network Security Perimeter related configurations of a given namespace */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Provisioning state of NetworkSecurityPerimeter configuration propagation */
  provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of Provisioning Issues if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  /** NetworkSecurityPerimeter related information */
  readonly networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Information about resource association */
  readonly resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
  /** Information about current network profile */
  readonly profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
  /** True if the EventHub namespace is backed by another Azure resource and not visible to end users. */
  readonly isBackingResource?: boolean;
  /** Indicates that the NSP controls related to backing association are only applicable to a specific feature in backing resource's data plane. */
  readonly applicableFeatures?: string[];
  /** Source Resource Association name */
  readonly parentAssociationName?: string;
  /** ARM Id of source resource */
  readonly sourceResourceId?: string;
}

export function networkSecurityPerimeterConfigurationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties of NetworkSecurityPerimeterConfiguration */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /** Provisioning state of NetworkSecurityPerimeter configuration propagation */
  provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of Provisioning Issues if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  /** NetworkSecurityPerimeter related information */
  readonly networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Information about resource association */
  readonly resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
  /** Information about current network profile */
  readonly profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
  /** True if the EventHub namespace is backed by another Azure resource and not visible to end users. */
  readonly isBackingResource?: boolean;
  /** Indicates that the NSP controls related to backing association are only applicable to a specific feature in backing resource's data plane. */
  readonly applicableFeatures?: string[];
  /** Source Resource Association name */
  readonly parentAssociationName?: string;
  /** ARM Id of source resource */
  readonly sourceResourceId?: string;
}

export function networkSecurityPerimeterConfigurationPropertiesDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationProperties {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : networkSecurityPerimeterConfigurationPropertiesResourceAssociationDeserializer(
          item["resourceAssociation"],
        ),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterConfigurationPropertiesProfileDeserializer(item["profile"]),
    isBackingResource: item["isBackingResource"],
    applicableFeatures: !item["applicableFeatures"]
      ? item["applicableFeatures"]
      : item["applicableFeatures"].map((p: any) => {
          return p;
        }),
    parentAssociationName: item["parentAssociationName"],
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Provisioning state of NetworkSecurityPerimeter configuration propagation */
export enum KnownNetworkSecurityPerimeterConfigurationProvisioningState {
  /** Unknown */
  Unknown = "Unknown",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Accepted */
  Accepted = "Accepted",
  /** InvalidResponse */
  InvalidResponse = "InvalidResponse",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** SucceededWithIssues */
  SucceededWithIssues = "SucceededWithIssues",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Deleted */
  Deleted = "Deleted",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of NetworkSecurityPerimeter configuration propagation \
 * {@link KnownNetworkSecurityPerimeterConfigurationProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **Creating** \
 * **Updating** \
 * **Accepted** \
 * **InvalidResponse** \
 * **Succeeded** \
 * **SucceededWithIssues** \
 * **Failed** \
 * **Deleting** \
 * **Deleted** \
 * **Canceled**
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes Provisioning issue for given NetworkSecurityPerimeterConfiguration */
export interface ProvisioningIssue {
  /** Name of the issue */
  name?: string;
  /** Properties of Provisioning Issue */
  readonly properties?: ProvisioningIssueProperties;
}

export function provisioningIssueDeserializer(item: any): ProvisioningIssue {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : provisioningIssuePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Provisioning Issue */
export interface ProvisioningIssueProperties {
  /** Type of Issue */
  issueType?: string;
  /** Description of the issue */
  description?: string;
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    description: item["description"],
  };
}

/** NetworkSecurityPerimeter related information */
export interface NetworkSecurityPerimeter {
  /** Fully qualified identifier of the resource */
  id?: string;
  /** Guid of the resource */
  perimeterGuid?: string;
  /** Location of the resource */
  location?: string;
}

export function networkSecurityPerimeterDeserializer(item: any): NetworkSecurityPerimeter {
  return {
    id: item["id"],
    perimeterGuid: item["perimeterGuid"],
    location: item["location"],
  };
}

/** Information about resource association */
export interface NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation {
  /** Name of the resource association */
  name?: string;
  /** Access Mode of the resource association */
  accessMode?: ResourceAssociationAccessMode;
}

export function networkSecurityPerimeterConfigurationPropertiesResourceAssociationDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Access Mode of the resource association */
export enum KnownResourceAssociationAccessMode {
  /** NoAssociationMode */
  NoAssociationMode = "NoAssociationMode",
  /** EnforcedMode */
  EnforcedMode = "EnforcedMode",
  /** LearningMode */
  LearningMode = "LearningMode",
  /** AuditMode */
  AuditMode = "AuditMode",
  /** UnspecifiedMode */
  UnspecifiedMode = "UnspecifiedMode",
}

/**
 * Access Mode of the resource association \
 * {@link KnownResourceAssociationAccessMode} can be used interchangeably with ResourceAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoAssociationMode** \
 * **EnforcedMode** \
 * **LearningMode** \
 * **AuditMode** \
 * **UnspecifiedMode**
 */
export type ResourceAssociationAccessMode = string;

/** Information about current network profile */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfile {
  /** Name of the resource */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: string;
  /** List of Access Rules */
  accessRules?: NspAccessRule[];
}

export function networkSecurityPerimeterConfigurationPropertiesProfileDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationPropertiesProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : nspAccessRuleArrayDeserializer(item["accessRules"]),
  };
}

export function nspAccessRuleArrayDeserializer(result: Array<NspAccessRule>): any[] {
  return result.map((item) => {
    return nspAccessRuleDeserializer(item);
  });
}

/** Information of Access Rule in Network Profile */
export interface NspAccessRule {
  /** Fully qualified identifier of the resource */
  id?: string;
  /** Name of the resource */
  name?: string;
  /** Type of the resource */
  type?: string;
  /** Properties of Access Rule */
  readonly properties?: NspAccessRuleProperties;
}

export function nspAccessRuleDeserializer(item: any): NspAccessRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : nspAccessRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Access Rule */
export interface NspAccessRuleProperties {
  /** Direction of Access Rule */
  direction?: NspAccessRuleDirection;
  /** Address prefixes in the CIDR format for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: NspAccessRulePropertiesSubscriptionsItem[];
  /** NetworkSecurityPerimeters for inbound rules */
  readonly networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** FQDN for outbound rules */
  readonly fullyQualifiedDomainNames?: string[];
}

export function nspAccessRulePropertiesDeserializer(item: any): NspAccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : nspAccessRulePropertiesSubscriptionsItemArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownNspAccessRuleDirection {
  /** Inbound */
  Inbound = "Inbound",
  /** Outbound */
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownNspAccessRuleDirection} can be used interchangeably with NspAccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound** \
 * **Outbound**
 */
export type NspAccessRuleDirection = string;

export function nspAccessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<NspAccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return nspAccessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** Subscription for inbound rule */
export interface NspAccessRulePropertiesSubscriptionsItem {
  /** Fully qualified identifier of subscription */
  id?: string;
}

export function nspAccessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): NspAccessRulePropertiesSubscriptionsItem {
  return {
    id: item["id"],
  };
}

export function networkSecurityPerimeterArrayDeserializer(
  result: Array<NetworkSecurityPerimeter>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterDeserializer(item);
  });
}

/** Single item in List or Get Consumer group operation */
export interface ConsumerGroup extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Exact time the message was created. */
  readonly createdAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** User Metadata is a placeholder to store user-defined string data with maximum length 1024. e.g. it can be used to store descriptive data, such as list of teams and their contact information also user-defined configuration settings can be stored. */
  userMetadata?: string;
}

export function consumerGroupSerializer(item: ConsumerGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["userMetadata"])
      ? undefined
      : _consumerGroupPropertiesSerializer(item),
  };
}

export function consumerGroupDeserializer(item: any): ConsumerGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _consumerGroupPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Single item in List or Get Consumer group operation */
export interface ConsumerGroupProperties {
  /** Exact time the message was created. */
  readonly createdAt?: Date;
  /** The exact time the message was updated. */
  readonly updatedAt?: Date;
  /** User Metadata is a placeholder to store user-defined string data with maximum length 1024. e.g. it can be used to store descriptive data, such as list of teams and their contact information also user-defined configuration settings can be stored. */
  userMetadata?: string;
}

export function consumerGroupPropertiesSerializer(item: ConsumerGroupProperties): any {
  return { userMetadata: item["userMetadata"] };
}

export function consumerGroupPropertiesDeserializer(item: any): ConsumerGroupProperties {
  return {
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    userMetadata: item["userMetadata"],
  };
}

/** The response of a ConsumerGroup list operation. */
export interface _ConsumerGroupListResult {
  /** The ConsumerGroup items on this page */
  value: ConsumerGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _consumerGroupListResultDeserializer(item: any): _ConsumerGroupListResult {
  return {
    value: consumerGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function consumerGroupArraySerializer(result: Array<ConsumerGroup>): any[] {
  return result.map((item) => {
    return consumerGroupSerializer(item);
  });
}

export function consumerGroupArrayDeserializer(result: Array<ConsumerGroup>): any[] {
  return result.map((item) => {
    return consumerGroupDeserializer(item);
  });
}

/** Contains all settings for the cluster. */
export interface ClusterQuotaConfigurationProperties {
  /** All possible Cluster settings - a collection of key/value paired settings which apply to quotas and configurations imposed on the cluster. */
  settings?: Record<string, string>;
}

export function clusterQuotaConfigurationPropertiesSerializer(
  item: ClusterQuotaConfigurationProperties,
): any {
  return { settings: item["settings"] };
}

export function clusterQuotaConfigurationPropertiesDeserializer(
  item: any,
): ClusterQuotaConfigurationProperties {
  return {
    settings: !item["settings"]
      ? item["settings"]
      : Object.fromEntries(Object.entries(item["settings"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Single Namespace item in List or Get Operation */
export interface EHNamespace extends ProxyResource {
  /** Properties of sku resource */
  sku?: Sku;
  /** Properties of BYOK Identity description */
  identity?: Identity;
  /** Resource location. */
  location?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The minimum TLS version for the cluster to support, e.g. '1.2' */
  minimumTlsVersion?: TlsVersion;
  /** Provisioning state of the Namespace. */
  readonly provisioningState?: string;
  /** Status of the Namespace. */
  readonly status?: string;
  /** The time the Namespace was created. */
  readonly createdAt?: Date;
  /** The time the Namespace was updated. */
  readonly updatedAt?: Date;
  /** Endpoint you can use to perform Service Bus operations. */
  readonly serviceBusEndpoint?: string;
  /** Cluster ARM ID of the Namespace. */
  clusterArmId?: string;
  /** Identifier for Azure Insights metrics. */
  readonly metricId?: string;
  /** Value that indicates whether AutoInflate is enabled for eventhub namespace. */
  isAutoInflateEnabled?: boolean;
  /** This determines if traffic is allowed over public network. By default it is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Upper limit of throughput units when AutoInflate is enabled, value should be within 0 to 20 throughput units. ( '0' if AutoInflateEnabled = true) */
  maximumThroughputUnits?: number;
  /** Value that indicates whether Kafka is enabled for eventhub namespace. */
  kafkaEnabled?: boolean;
  /** Enabling this property creates a Standard Event Hubs Namespace in regions supported availability zones. */
  zoneRedundant?: boolean;
  /** Properties of BYOK Encryption description */
  encryption?: Encryption;
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** This property disables SAS authentication for the Event Hubs namespace. */
  disableLocalAuth?: boolean;
  /** Alternate name specified when alias and namespace names are same. */
  alternateName?: string;
  platformCapabilities?: PlatformCapabilities;
  /** Geo Data Replication settings for the namespace */
  geoDataReplication?: GeoDataReplicationProperties;
  /** Value that indicates whether IPv6 is enabled for public network access. */
  ipV6Enabled?: boolean;
}

export function ehNamespaceSerializer(item: EHNamespace): any {
  return {
    properties: areAllPropsUndefined(item, [
      "minimumTlsVersion",
      "clusterArmId",
      "isAutoInflateEnabled",
      "publicNetworkAccess",
      "maximumThroughputUnits",
      "kafkaEnabled",
      "zoneRedundant",
      "encryption",
      "privateEndpointConnections",
      "disableLocalAuth",
      "alternateName",
      "platformCapabilities",
      "geoDataReplication",
      "ipV6Enabled",
    ])
      ? undefined
      : _ehNamespacePropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    location: item["location"],
    tags: item["tags"],
  };
}

export function ehNamespaceDeserializer(item: any): EHNamespace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _ehNamespacePropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Namespace properties supplied for create namespace operation. */
export interface EHNamespaceProperties {
  /** The minimum TLS version for the cluster to support, e.g. '1.2' */
  minimumTlsVersion?: TlsVersion;
  /** Provisioning state of the Namespace. */
  readonly provisioningState?: string;
  /** Status of the Namespace. */
  readonly status?: string;
  /** The time the Namespace was created. */
  readonly createdAt?: Date;
  /** The time the Namespace was updated. */
  readonly updatedAt?: Date;
  /** Endpoint you can use to perform Service Bus operations. */
  readonly serviceBusEndpoint?: string;
  /** Cluster ARM ID of the Namespace. */
  clusterArmId?: string;
  /** Identifier for Azure Insights metrics. */
  readonly metricId?: string;
  /** Value that indicates whether AutoInflate is enabled for eventhub namespace. */
  isAutoInflateEnabled?: boolean;
  /** This determines if traffic is allowed over public network. By default it is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Upper limit of throughput units when AutoInflate is enabled, value should be within 0 to 20 throughput units. ( '0' if AutoInflateEnabled = true) */
  maximumThroughputUnits?: number;
  /** Value that indicates whether Kafka is enabled for eventhub namespace. */
  kafkaEnabled?: boolean;
  /** Enabling this property creates a Standard Event Hubs Namespace in regions supported availability zones. */
  zoneRedundant?: boolean;
  /** Properties of BYOK Encryption description */
  encryption?: Encryption;
  /** List of private endpoint connections. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** This property disables SAS authentication for the Event Hubs namespace. */
  disableLocalAuth?: boolean;
  /** Alternate name specified when alias and namespace names are same. */
  alternateName?: string;
  platformCapabilities?: PlatformCapabilities;
  /** Geo Data Replication settings for the namespace */
  geoDataReplication?: GeoDataReplicationProperties;
  /** Value that indicates whether IPv6 is enabled for public network access. */
  ipV6Enabled?: boolean;
}

export function ehNamespacePropertiesSerializer(item: EHNamespaceProperties): any {
  return {
    minimumTlsVersion: item["minimumTlsVersion"],
    clusterArmId: item["clusterArmId"],
    isAutoInflateEnabled: item["isAutoInflateEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    maximumThroughputUnits: item["maximumThroughputUnits"],
    kafkaEnabled: item["kafkaEnabled"],
    zoneRedundant: item["zoneRedundant"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
    geoDataReplication: !item["geoDataReplication"]
      ? item["geoDataReplication"]
      : geoDataReplicationPropertiesSerializer(item["geoDataReplication"]),
    ipV6Enabled: item["ipV6Enabled"],
  };
}

export function ehNamespacePropertiesDeserializer(item: any): EHNamespaceProperties {
  return {
    minimumTlsVersion: item["minimumTlsVersion"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    serviceBusEndpoint: item["serviceBusEndpoint"],
    clusterArmId: item["clusterArmId"],
    metricId: item["metricId"],
    isAutoInflateEnabled: item["isAutoInflateEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    maximumThroughputUnits: item["maximumThroughputUnits"],
    kafkaEnabled: item["kafkaEnabled"],
    zoneRedundant: item["zoneRedundant"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
    geoDataReplication: !item["geoDataReplication"]
      ? item["geoDataReplication"]
      : geoDataReplicationPropertiesDeserializer(item["geoDataReplication"]),
    ipV6Enabled: item["ipV6Enabled"],
  };
}

/** The minimum TLS version for the cluster to support, e.g. '1.2' */
export enum KnownTlsVersion {
  /** 1.0 */
  One0 = "1.0",
  /** 1.1 */
  One1 = "1.1",
  /** 1.2 */
  One2 = "1.2",
  /** 1.3 */
  One3 = "1.3",
}

/**
 * The minimum TLS version for the cluster to support, e.g. '1.2' \
 * {@link KnownTlsVersion} can be used interchangeably with TlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1.0** \
 * **1.1** \
 * **1.2** \
 * **1.3**
 */
export type TlsVersion = string;

/** This determines if traffic is allowed over public network. By default it is enabled. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * This determines if traffic is allowed over public network. By default it is enabled. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccess = string;

/** Properties to configure Encryption */
export interface Encryption {
  /** Properties of KeyVault */
  keyVaultProperties?: KeyVaultProperties[];
  /** Enumerates the possible value of keySource for Encryption */
  keySource?: "Microsoft.KeyVault";
  /** Enable Infrastructure Encryption (Double Encryption) */
  requireInfrastructureEncryption?: boolean;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesArraySerializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesArrayDeserializer(item["keyVaultProperties"]),
    keySource: item["keySource"],
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function keyVaultPropertiesArraySerializer(result: Array<KeyVaultProperties>): any[] {
  return result.map((item) => {
    return keyVaultPropertiesSerializer(item);
  });
}

export function keyVaultPropertiesArrayDeserializer(result: Array<KeyVaultProperties>): any[] {
  return result.map((item) => {
    return keyVaultPropertiesDeserializer(item);
  });
}

/** Properties to configure keyVault Properties */
export interface KeyVaultProperties {
  /** Name of the Key from KeyVault */
  keyName?: string;
  /** Uri of KeyVault */
  keyVaultUri?: string;
  /** Key Version */
  keyVersion?: string;
  identity?: UserAssignedIdentityProperties;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyName: item["keyName"],
    keyVaultUri: item["keyVaultUri"],
    keyVersion: item["keyVersion"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityPropertiesSerializer(item["identity"]),
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyName"],
    keyVaultUri: item["keyVaultUri"],
    keyVersion: item["keyVersion"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityPropertiesDeserializer(item["identity"]),
  };
}

/** model interface UserAssignedIdentityProperties */
export interface UserAssignedIdentityProperties {
  /** ARM ID of user Identity selected for encryption */
  userAssignedIdentity?: string;
}

export function userAssignedIdentityPropertiesSerializer(
  item: UserAssignedIdentityProperties,
): any {
  return { userAssignedIdentity: item["userAssignedIdentity"] };
}

export function userAssignedIdentityPropertiesDeserializer(
  item: any,
): UserAssignedIdentityProperties {
  return {
    userAssignedIdentity: item["userAssignedIdentity"],
  };
}

/** GeoDR Replication properties */
export interface GeoDataReplicationProperties {
  /** The maximum acceptable lag for data replication operations from the primary replica to a quorum of secondary replicas.  When the lag exceeds the configured amount, operations on the primary replica will be failed. The allowed values are 0 and 5 minutes to 1 day. */
  maxReplicationLagDurationInSeconds?: number;
  /** A list of regions where replicas of the namespace are maintained. */
  locations?: NamespaceReplicaLocation[];
}

export function geoDataReplicationPropertiesSerializer(item: GeoDataReplicationProperties): any {
  return {
    maxReplicationLagDurationInSeconds: item["maxReplicationLagDurationInSeconds"],
    locations: !item["locations"]
      ? item["locations"]
      : namespaceReplicaLocationArraySerializer(item["locations"]),
  };
}

export function geoDataReplicationPropertiesDeserializer(item: any): GeoDataReplicationProperties {
  return {
    maxReplicationLagDurationInSeconds: item["maxReplicationLagDurationInSeconds"],
    locations: !item["locations"]
      ? item["locations"]
      : namespaceReplicaLocationArrayDeserializer(item["locations"]),
  };
}

export function namespaceReplicaLocationArraySerializer(
  result: Array<NamespaceReplicaLocation>,
): any[] {
  return result.map((item) => {
    return namespaceReplicaLocationSerializer(item);
  });
}

export function namespaceReplicaLocationArrayDeserializer(
  result: Array<NamespaceReplicaLocation>,
): any[] {
  return result.map((item) => {
    return namespaceReplicaLocationDeserializer(item);
  });
}

/** Namespace replication properties */
export interface NamespaceReplicaLocation {
  /** Azure regions where a replica of the namespace is maintained */
  locationName?: string;
  /** GeoDR Role Types */
  roleType?: GeoDRRoleType;
  /** state of Namespace replica. */
  readonly replicaState?: string;
  /** Optional property that denotes the ARM ID of the Cluster. This is required, if a namespace replica should be placed in a Dedicated Event Hub Cluster */
  clusterArmId?: string;
}

export function namespaceReplicaLocationSerializer(item: NamespaceReplicaLocation): any {
  return {
    locationName: item["locationName"],
    roleType: item["roleType"],
    clusterArmId: item["clusterArmId"],
  };
}

export function namespaceReplicaLocationDeserializer(item: any): NamespaceReplicaLocation {
  return {
    locationName: item["locationName"],
    roleType: item["roleType"],
    replicaState: item["replicaState"],
    clusterArmId: item["clusterArmId"],
  };
}

/** GeoDR Role Types */
export enum KnownGeoDRRoleType {
  /** Primary */
  Primary = "Primary",
  /** Secondary */
  Secondary = "Secondary",
}

/**
 * GeoDR Role Types \
 * {@link KnownGeoDRRoleType} can be used interchangeably with GeoDRRoleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary** \
 * **Secondary**
 */
export type GeoDRRoleType = string;

/** SKU parameters supplied to the create namespace operation */
export interface Sku {
  /** Name of this SKU. */
  name: SkuName;
  /** The billing tier of this particular SKU. */
  tier?: SkuTier;
  /** The Event Hubs throughput units for Basic or Standard tiers, where value should be 0 to 20 throughput units. The Event Hubs premium units for Premium tier, where value should be 0 to 10 premium units. */
  capacity?: number;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"], tier: item["tier"], capacity: item["capacity"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
    capacity: item["capacity"],
  };
}

/** Name of this SKU. */
export enum KnownSkuName {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
}

/**
 * Name of this SKU. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type SkuName = string;

/** The billing tier of this particular SKU. */
export enum KnownSkuTier {
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
}

/**
 * The billing tier of this particular SKU. \
 * {@link KnownSkuTier} can be used interchangeably with SkuTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic** \
 * **Standard** \
 * **Premium**
 */
export type SkuTier = string;

/** Properties to configure Identity for Bring your Own Keys */
export interface Identity {
  /** ObjectId from the KeyVault */
  readonly principalId?: string;
  /** TenantId from the KeyVault */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type?: ManagedServiceIdentityType;
  /** Properties for User Assigned Identities */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export type ManagedServiceIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

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

/** Recognized Dictionary value. */
export interface UserAssignedIdentity {
  /** Principal Id of user assigned identity */
  readonly principalId?: string;
  /** Client Id of user assigned identity */
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

/** The response of a EHNamespace list operation. */
export interface _EHNamespaceListResult {
  /** The EHNamespace items on this page */
  value: EHNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ehNamespaceListResultDeserializer(item: any): _EHNamespaceListResult {
  return {
    value: ehNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ehNamespaceArraySerializer(result: Array<EHNamespace>): any[] {
  return result.map((item) => {
    return ehNamespaceSerializer(item);
  });
}

export function ehNamespaceArrayDeserializer(result: Array<EHNamespace>): any[] {
  return result.map((item) => {
    return ehNamespaceDeserializer(item);
  });
}

/** model interface FailOver */
export interface FailOver {
  /** Query parameter for the new primary location after failover. */
  primaryLocation?: string;
  /** If Force is false then graceful failover is attempted after ensuring no data loss. If Force flag is set to true, Forced failover is attempted with possible data loss. */
  force?: boolean;
}

export function failOverSerializer(item: FailOver): any {
  return {
    properties: areAllPropsUndefined(item, ["primaryLocation", "force"])
      ? undefined
      : _failOverPropertiesSerializer(item),
  };
}

export function failOverDeserializer(item: any): FailOver {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _failOverPropertiesDeserializer(item["properties"])),
  };
}

/** model interface FailOverProperties */
export interface FailOverProperties {
  /** Query parameter for the new primary location after failover. */
  primaryLocation?: string;
  /** If Force is false then graceful failover is attempted after ensuring no data loss. If Force flag is set to true, Forced failover is attempted with possible data loss. */
  force?: boolean;
}

export function failOverPropertiesSerializer(item: FailOverProperties): any {
  return { primaryLocation: item["primaryLocation"], force: item["force"] };
}

export function failOverPropertiesDeserializer(item: any): FailOverProperties {
  return {
    primaryLocation: item["primaryLocation"],
    force: item["force"],
  };
}

/** Description of topic resource. */
export interface NetworkRuleSet extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Value that indicates whether Trusted Service Access is Enabled or not. */
  trustedServiceAccessEnabled?: boolean;
  /** Default Action for Network Rule Set */
  defaultAction?: DefaultAction;
  /** List VirtualNetwork Rules */
  virtualNetworkRules?: NWRuleSetVirtualNetworkRules[];
  /** List of IpRules */
  ipRules?: NWRuleSetIpRules[];
  /** This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules. */
  publicNetworkAccess?: PublicNetworkAccessFlag;
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    properties: areAllPropsUndefined(item, [
      "trustedServiceAccessEnabled",
      "defaultAction",
      "virtualNetworkRules",
      "ipRules",
      "publicNetworkAccess",
    ])
      ? undefined
      : _networkRuleSetPropertiesSerializer(item),
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _networkRuleSetPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** NetworkRuleSet properties */
export interface NetworkRuleSetProperties {
  /** Value that indicates whether Trusted Service Access is Enabled or not. */
  trustedServiceAccessEnabled?: boolean;
  /** Default Action for Network Rule Set */
  defaultAction?: DefaultAction;
  /** List VirtualNetwork Rules */
  virtualNetworkRules?: NWRuleSetVirtualNetworkRules[];
  /** List of IpRules */
  ipRules?: NWRuleSetIpRules[];
  /** This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules. */
  publicNetworkAccess?: PublicNetworkAccessFlag;
}

export function networkRuleSetPropertiesSerializer(item: NetworkRuleSetProperties): any {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : nwRuleSetVirtualNetworkRulesArraySerializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : nwRuleSetIpRulesArraySerializer(item["ipRules"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function networkRuleSetPropertiesDeserializer(item: any): NetworkRuleSetProperties {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : nwRuleSetVirtualNetworkRulesArrayDeserializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"]
      ? item["ipRules"]
      : nwRuleSetIpRulesArrayDeserializer(item["ipRules"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** Default Action for Network Rule Set */
export enum KnownDefaultAction {
  /** Allow */
  Allow = "Allow",
  /** Deny */
  Deny = "Deny",
}

/**
 * Default Action for Network Rule Set \
 * {@link KnownDefaultAction} can be used interchangeably with DefaultAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Deny**
 */
export type DefaultAction = string;

export function nwRuleSetVirtualNetworkRulesArraySerializer(
  result: Array<NWRuleSetVirtualNetworkRules>,
): any[] {
  return result.map((item) => {
    return nwRuleSetVirtualNetworkRulesSerializer(item);
  });
}

export function nwRuleSetVirtualNetworkRulesArrayDeserializer(
  result: Array<NWRuleSetVirtualNetworkRules>,
): any[] {
  return result.map((item) => {
    return nwRuleSetVirtualNetworkRulesDeserializer(item);
  });
}

/** The response from the List namespace operation. */
export interface NWRuleSetVirtualNetworkRules {
  /** Subnet properties */
  subnet?: Subnet;
  /** Value that indicates whether to ignore missing Vnet Service Endpoint */
  ignoreMissingVnetServiceEndpoint?: boolean;
}

export function nwRuleSetVirtualNetworkRulesSerializer(item: NWRuleSetVirtualNetworkRules): any {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetSerializer(item["subnet"]),
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

export function nwRuleSetVirtualNetworkRulesDeserializer(item: any): NWRuleSetVirtualNetworkRules {
  return {
    subnet: !item["subnet"] ? item["subnet"] : subnetDeserializer(item["subnet"]),
    ignoreMissingVnetServiceEndpoint: item["ignoreMissingVnetServiceEndpoint"],
  };
}

/** Properties supplied for Subnet */
export interface Subnet {
  /** Resource ID of Virtual Network Subnet */
  id?: string;
}

export function subnetSerializer(item: Subnet): any {
  return { id: item["id"] };
}

export function subnetDeserializer(item: any): Subnet {
  return {
    id: item["id"],
  };
}

export function nwRuleSetIpRulesArraySerializer(result: Array<NWRuleSetIpRules>): any[] {
  return result.map((item) => {
    return nwRuleSetIpRulesSerializer(item);
  });
}

export function nwRuleSetIpRulesArrayDeserializer(result: Array<NWRuleSetIpRules>): any[] {
  return result.map((item) => {
    return nwRuleSetIpRulesDeserializer(item);
  });
}

/** The response from the List namespace operation. */
export interface NWRuleSetIpRules {
  /** IP Mask */
  ipMask?: string;
  /** The IP Filter Action */
  action?: NetworkRuleIPAction;
}

export function nwRuleSetIpRulesSerializer(item: NWRuleSetIpRules): any {
  return { ipMask: item["ipMask"], action: item["action"] };
}

export function nwRuleSetIpRulesDeserializer(item: any): NWRuleSetIpRules {
  return {
    ipMask: item["ipMask"],
    action: item["action"],
  };
}

/** The IP Filter Action */
export enum KnownNetworkRuleIPAction {
  /** Allow */
  Allow = "Allow",
}

/**
 * The IP Filter Action \
 * {@link KnownNetworkRuleIPAction} can be used interchangeably with NetworkRuleIPAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**
 */
export type NetworkRuleIPAction = string;

/** This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules. */
export enum KnownPublicNetworkAccessFlag {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * This determines if traffic is allowed over public network. By default it is enabled. If value is SecuredByPerimeter then Inbound and Outbound communication is controlled by the network security perimeter and profile's access rules. \
 * {@link KnownPublicNetworkAccessFlag} can be used interchangeably with PublicNetworkAccessFlag,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccessFlag = string;

/** Paged collection of NetworkRuleSet items */
export interface NetworkRuleSetListResult {
  /** The NetworkRuleSet items on this page */
  value: NetworkRuleSet[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function networkRuleSetListResultDeserializer(item: any): NetworkRuleSetListResult {
  return {
    value: networkRuleSetArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkRuleSetArraySerializer(result: Array<NetworkRuleSet>): any[] {
  return result.map((item) => {
    return networkRuleSetSerializer(item);
  });
}

export function networkRuleSetArrayDeserializer(result: Array<NetworkRuleSet>): any[] {
  return result.map((item) => {
    return networkRuleSetDeserializer(item);
  });
}

/** Paged collection of PrivateLinkResource items */
export interface PrivateLinkResourcesListResult {
  /** The PrivateLinkResource items on this page */
  value: PrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourcesListResultDeserializer(
  item: any,
): PrivateLinkResourcesListResult {
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

/** Information of the private link resource. */
export interface PrivateLinkResource {
  /** Fully qualified identifier of the resource. */
  id?: string;
  /** Name of the resource */
  name?: string;
  /** Type of the resource */
  type?: string;
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
    id: item["id"],
    name: item["name"],
    type: item["type"],
  };
}

/** Properties of PrivateLinkResource */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  groupId?: string;
  /** The private link resource required member names. */
  requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
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

/** Result of the List NetworkSecurityPerimeterConfiguration operation. */
export interface NetworkSecurityPerimeterConfigurationList {
  /** A collection of NetworkSecurityPerimeterConfigurations */
  readonly value?: NetworkSecurityPerimeterConfiguration[];
}

export function networkSecurityPerimeterConfigurationListDeserializer(
  item: any,
): NetworkSecurityPerimeterConfigurationList {
  return {
    value: !item["value"]
      ? item["value"]
      : networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** Single item in List or Get Schema Group operation */
export interface SchemaGroup extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Exact time the Schema Group was updated */
  readonly updatedAtUtc?: Date;
  /** Exact time the Schema Group was created. */
  readonly createdAtUtc?: Date;
  /** The ETag value. */
  readonly eTag?: string;
  /** dictionary object for SchemaGroup group properties */
  groupProperties?: Record<string, string>;
  schemaCompatibility?: SchemaCompatibility;
  schemaType?: SchemaType;
}

export function schemaGroupSerializer(item: SchemaGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["groupProperties", "schemaCompatibility", "schemaType"])
      ? undefined
      : _schemaGroupPropertiesSerializer(item),
  };
}

export function schemaGroupDeserializer(item: any): SchemaGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _schemaGroupPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** model interface SchemaGroupProperties */
export interface SchemaGroupProperties {
  /** Exact time the Schema Group was updated */
  readonly updatedAtUtc?: Date;
  /** Exact time the Schema Group was created. */
  readonly createdAtUtc?: Date;
  /** The ETag value. */
  readonly eTag?: string;
  /** dictionary object for SchemaGroup group properties */
  groupProperties?: Record<string, string>;
  schemaCompatibility?: SchemaCompatibility;
  schemaType?: SchemaType;
}

export function schemaGroupPropertiesSerializer(item: SchemaGroupProperties): any {
  return {
    groupProperties: item["groupProperties"],
    schemaCompatibility: item["schemaCompatibility"],
    schemaType: item["schemaType"],
  };
}

export function schemaGroupPropertiesDeserializer(item: any): SchemaGroupProperties {
  return {
    updatedAtUtc: !item["updatedAtUtc"] ? item["updatedAtUtc"] : new Date(item["updatedAtUtc"]),
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    eTag: item["eTag"],
    groupProperties: !item["groupProperties"]
      ? item["groupProperties"]
      : Object.fromEntries(
          Object.entries(item["groupProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    schemaCompatibility: item["schemaCompatibility"],
    schemaType: item["schemaType"],
  };
}

/** Known values of {@link SchemaCompatibility} that the service accepts. */
export enum KnownSchemaCompatibility {
  /** None */
  None = "None",
  /** Backward */
  Backward = "Backward",
  /** Forward */
  Forward = "Forward",
}

/** Type of SchemaCompatibility */
export type SchemaCompatibility = string;

/** Known values of {@link SchemaType} that the service accepts. */
export enum KnownSchemaType {
  /** Unknown */
  Unknown = "Unknown",
  /** Avro */
  Avro = "Avro",
  /** ProtoBuf */
  ProtoBuf = "ProtoBuf",
  /** Json */
  Json = "Json",
}

/** Type of SchemaType */
export type SchemaType = string;

/** The response of a SchemaGroup list operation. */
export interface _SchemaGroupListResult {
  /** The SchemaGroup items on this page */
  value: SchemaGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schemaGroupListResultDeserializer(item: any): _SchemaGroupListResult {
  return {
    value: schemaGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schemaGroupArraySerializer(result: Array<SchemaGroup>): any[] {
  return result.map((item) => {
    return schemaGroupSerializer(item);
  });
}

export function schemaGroupArrayDeserializer(result: Array<SchemaGroup>): any[] {
  return result.map((item) => {
    return schemaGroupDeserializer(item);
  });
}

/** The Application Group object */
export interface ApplicationGroup extends ProxyResource {
  /** The geo-location where the resource lives */
  readonly location?: string;
  /** Determines if Application Group is allowed to create connection with namespace or not. Once the isEnabled is set to false, all the existing connections of application group gets dropped and no new connections will be allowed */
  isEnabled?: boolean;
  /** The Unique identifier for application group.Supports SAS(SASKeyName=KeyName) or AAD(AADAppID=Guid) */
  clientAppGroupIdentifier?: string;
  /** List of group policies that define the behavior of application group. The policies can support resource governance scenarios such as limiting ingress or egress traffic. */
  policies?: ApplicationGroupPolicyUnion[];
}

export function applicationGroupSerializer(item: ApplicationGroup): any {
  return {
    properties: areAllPropsUndefined(item, ["isEnabled", "clientAppGroupIdentifier", "policies"])
      ? undefined
      : _applicationGroupPropertiesSerializer(item),
  };
}

export function applicationGroupDeserializer(item: any): ApplicationGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationGroupPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** model interface ApplicationGroupProperties */
export interface ApplicationGroupProperties {
  /** Determines if Application Group is allowed to create connection with namespace or not. Once the isEnabled is set to false, all the existing connections of application group gets dropped and no new connections will be allowed */
  isEnabled?: boolean;
  /** The Unique identifier for application group.Supports SAS(SASKeyName=KeyName) or AAD(AADAppID=Guid) */
  clientAppGroupIdentifier: string;
  /** List of group policies that define the behavior of application group. The policies can support resource governance scenarios such as limiting ingress or egress traffic. */
  policies?: ApplicationGroupPolicyUnion[];
}

export function applicationGroupPropertiesSerializer(item: ApplicationGroupProperties): any {
  return {
    isEnabled: item["isEnabled"],
    clientAppGroupIdentifier: item["clientAppGroupIdentifier"],
    policies: !item["policies"]
      ? item["policies"]
      : applicationGroupPolicyUnionArraySerializer(item["policies"]),
  };
}

export function applicationGroupPropertiesDeserializer(item: any): ApplicationGroupProperties {
  return {
    isEnabled: item["isEnabled"],
    clientAppGroupIdentifier: item["clientAppGroupIdentifier"],
    policies: !item["policies"]
      ? item["policies"]
      : applicationGroupPolicyUnionArrayDeserializer(item["policies"]),
  };
}

export function applicationGroupPolicyUnionArraySerializer(
  result: Array<ApplicationGroupPolicyUnion>,
): any[] {
  return result.map((item) => {
    return applicationGroupPolicyUnionSerializer(item);
  });
}

export function applicationGroupPolicyUnionArrayDeserializer(
  result: Array<ApplicationGroupPolicyUnion>,
): any[] {
  return result.map((item) => {
    return applicationGroupPolicyUnionDeserializer(item);
  });
}

/** Properties of the Application Group policy */
export interface ApplicationGroupPolicy {
  /** The Name of this policy */
  name: string;
  /** Application Group Policy types */
  /** The discriminator possible values: ThrottlingPolicy */
  type: ApplicationGroupPolicyType;
}

export function applicationGroupPolicySerializer(item: ApplicationGroupPolicy): any {
  return { name: item["name"], type: item["type"] };
}

export function applicationGroupPolicyDeserializer(item: any): ApplicationGroupPolicy {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** Alias for ApplicationGroupPolicyUnion */
export type ApplicationGroupPolicyUnion = ThrottlingPolicy | ApplicationGroupPolicy;

export function applicationGroupPolicyUnionSerializer(item: ApplicationGroupPolicyUnion): any {
  switch (item.type) {
    case "ThrottlingPolicy":
      return throttlingPolicySerializer(item as ThrottlingPolicy);

    default:
      return applicationGroupPolicySerializer(item);
  }
}

export function applicationGroupPolicyUnionDeserializer(item: any): ApplicationGroupPolicyUnion {
  switch (item["type"]) {
    case "ThrottlingPolicy":
      return throttlingPolicyDeserializer(item as ThrottlingPolicy);

    default:
      return applicationGroupPolicyDeserializer(item);
  }
}

/** Application Group Policy types */
export enum KnownApplicationGroupPolicyType {
  /** ThrottlingPolicy */
  ThrottlingPolicy = "ThrottlingPolicy",
}

/**
 * Application Group Policy types \
 * {@link KnownApplicationGroupPolicyType} can be used interchangeably with ApplicationGroupPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ThrottlingPolicy**
 */
export type ApplicationGroupPolicyType = string;

/** Properties of the throttling policy */
export interface ThrottlingPolicy extends ApplicationGroupPolicy {
  /** The Threshold limit above which the application group will be throttled.Rate limit is always per second. */
  rateLimitThreshold: number;
  /** Metric Id on which the throttle limit should be set, MetricId can be discovered by hovering over Metric in the Metrics section of Event Hub Namespace inside Azure Portal */
  metricId: MetricId;
  /** Application Group Policy types */
  type: "ThrottlingPolicy";
}

export function throttlingPolicySerializer(item: ThrottlingPolicy): any {
  return {
    name: item["name"],
    type: item["type"],
    rateLimitThreshold: item["rateLimitThreshold"],
    metricId: item["metricId"],
  };
}

export function throttlingPolicyDeserializer(item: any): ThrottlingPolicy {
  return {
    name: item["name"],
    type: item["type"],
    rateLimitThreshold: item["rateLimitThreshold"],
    metricId: item["metricId"],
  };
}

/** Metric Id on which the throttle limit should be set, MetricId can be discovered by hovering over Metric in the Metrics section of Event Hub Namespace inside Azure Portal */
export enum KnownMetricId {
  /** IncomingBytes */
  IncomingBytes = "IncomingBytes",
  /** OutgoingBytes */
  OutgoingBytes = "OutgoingBytes",
  /** IncomingMessages */
  IncomingMessages = "IncomingMessages",
  /** OutgoingMessages */
  OutgoingMessages = "OutgoingMessages",
}

/**
 * Metric Id on which the throttle limit should be set, MetricId can be discovered by hovering over Metric in the Metrics section of Event Hub Namespace inside Azure Portal \
 * {@link KnownMetricId} can be used interchangeably with MetricId,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IncomingBytes** \
 * **OutgoingBytes** \
 * **IncomingMessages** \
 * **OutgoingMessages**
 */
export type MetricId = string;

/** The response of a ApplicationGroup list operation. */
export interface _ApplicationGroupListResult {
  /** The ApplicationGroup items on this page */
  value: ApplicationGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationGroupListResultDeserializer(item: any): _ApplicationGroupListResult {
  return {
    value: applicationGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationGroupArraySerializer(result: Array<ApplicationGroup>): any[] {
  return result.map((item) => {
    return applicationGroupSerializer(item);
  });
}

export function applicationGroupArrayDeserializer(result: Array<ApplicationGroup>): any[] {
  return result.map((item) => {
    return applicationGroupDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2026-01-01 API version. */
  V20260101 = "2026-01-01",
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    supportsScaling: item["supportsScaling"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
    zoneRedundant: item["zoneRedundant"],
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    createdAt: item["createdAt"],
    provisioningState: item["provisioningState"],
    updatedAt: item["updatedAt"],
    metricId: item["metricId"],
    status: item["status"],
    supportsScaling: item["supportsScaling"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
    zoneRedundant: item["zoneRedundant"],
  };
}

export function _authorizationRulePropertiesSerializer(item: AuthorizationRule): any {
  return {
    rights: !item["rights"]
      ? item["rights"]
      : item["rights"].map((p: any) => {
          return p;
        }),
  };
}

export function _authorizationRulePropertiesDeserializer(item: any) {
  return {
    rights: !item["rights"]
      ? item["rights"]
      : item["rights"].map((p: any) => {
          return p;
        }),
  };
}

export function _armDisasterRecoveryPropertiesSerializer(item: ArmDisasterRecovery): any {
  return { partnerNamespace: item["partnerNamespace"], alternateName: item["alternateName"] };
}

export function _armDisasterRecoveryPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    partnerNamespace: item["partnerNamespace"],
    alternateName: item["alternateName"],
    role: item["role"],
    pendingReplicationOperationsCount: item["pendingReplicationOperationsCount"],
  };
}

export function _destinationPropertiesSerializer(item: Destination): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainer: item["blobContainer"],
    archiveNameFormat: item["archiveNameFormat"],
    dataLakeSubscriptionId: item["dataLakeSubscriptionId"],
    dataLakeAccountName: item["dataLakeAccountName"],
    dataLakeFolderPath: item["dataLakeFolderPath"],
  };
}

export function _destinationPropertiesDeserializer(item: any) {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    blobContainer: item["blobContainer"],
    archiveNameFormat: item["archiveNameFormat"],
    dataLakeSubscriptionId: item["dataLakeSubscriptionId"],
    dataLakeAccountName: item["dataLakeAccountName"],
    dataLakeFolderPath: item["dataLakeFolderPath"],
  };
}

export function _eventhubPropertiesSerializer(item: Eventhub): any {
  return {
    messageRetentionInDays: item["messageRetentionInDays"],
    partitionCount: item["partitionCount"],
    status: item["status"],
    captureDescription: !item["captureDescription"]
      ? item["captureDescription"]
      : captureDescriptionSerializer(item["captureDescription"]),
    retentionDescription: !item["retentionDescription"]
      ? item["retentionDescription"]
      : retentionDescriptionSerializer(item["retentionDescription"]),
    messageTimestampDescription: !item["messageTimestampDescription"]
      ? item["messageTimestampDescription"]
      : messageTimestampDescriptionSerializer(item["messageTimestampDescription"]),
    userMetadata: item["userMetadata"],
  };
}

export function _eventhubPropertiesDeserializer(item: any) {
  return {
    partitionIds: !item["partitionIds"]
      ? item["partitionIds"]
      : item["partitionIds"].map((p: any) => {
          return p;
        }),
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    messageRetentionInDays: item["messageRetentionInDays"],
    partitionCount: item["partitionCount"],
    status: item["status"],
    captureDescription: !item["captureDescription"]
      ? item["captureDescription"]
      : captureDescriptionDeserializer(item["captureDescription"]),
    retentionDescription: !item["retentionDescription"]
      ? item["retentionDescription"]
      : retentionDescriptionDeserializer(item["retentionDescription"]),
    messageTimestampDescription: !item["messageTimestampDescription"]
      ? item["messageTimestampDescription"]
      : messageTimestampDescriptionDeserializer(item["messageTimestampDescription"]),
    identifier: item["identifier"],
    userMetadata: item["userMetadata"],
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateSerializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : connectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _networkSecurityPerimeterConfigurationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    provisioningIssues: !item["provisioningIssues"]
      ? item["provisioningIssues"]
      : provisioningIssueArrayDeserializer(item["provisioningIssues"]),
    networkSecurityPerimeter: !item["networkSecurityPerimeter"]
      ? item["networkSecurityPerimeter"]
      : networkSecurityPerimeterDeserializer(item["networkSecurityPerimeter"]),
    resourceAssociation: !item["resourceAssociation"]
      ? item["resourceAssociation"]
      : networkSecurityPerimeterConfigurationPropertiesResourceAssociationDeserializer(
          item["resourceAssociation"],
        ),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityPerimeterConfigurationPropertiesProfileDeserializer(item["profile"]),
    isBackingResource: item["isBackingResource"],
    applicableFeatures: !item["applicableFeatures"]
      ? item["applicableFeatures"]
      : item["applicableFeatures"].map((p: any) => {
          return p;
        }),
    parentAssociationName: item["parentAssociationName"],
    sourceResourceId: item["sourceResourceId"],
  };
}

export function _consumerGroupPropertiesSerializer(item: ConsumerGroup): any {
  return { userMetadata: item["userMetadata"] };
}

export function _consumerGroupPropertiesDeserializer(item: any) {
  return {
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    userMetadata: item["userMetadata"],
  };
}

export function _ehNamespacePropertiesSerializer(item: EHNamespace): any {
  return {
    minimumTlsVersion: item["minimumTlsVersion"],
    clusterArmId: item["clusterArmId"],
    isAutoInflateEnabled: item["isAutoInflateEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    maximumThroughputUnits: item["maximumThroughputUnits"],
    kafkaEnabled: item["kafkaEnabled"],
    zoneRedundant: item["zoneRedundant"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesSerializer(item["platformCapabilities"]),
    geoDataReplication: !item["geoDataReplication"]
      ? item["geoDataReplication"]
      : geoDataReplicationPropertiesSerializer(item["geoDataReplication"]),
    ipV6Enabled: item["ipV6Enabled"],
  };
}

export function _ehNamespacePropertiesDeserializer(item: any) {
  return {
    minimumTlsVersion: item["minimumTlsVersion"],
    provisioningState: item["provisioningState"],
    status: item["status"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    serviceBusEndpoint: item["serviceBusEndpoint"],
    clusterArmId: item["clusterArmId"],
    metricId: item["metricId"],
    isAutoInflateEnabled: item["isAutoInflateEnabled"],
    publicNetworkAccess: item["publicNetworkAccess"],
    maximumThroughputUnits: item["maximumThroughputUnits"],
    kafkaEnabled: item["kafkaEnabled"],
    zoneRedundant: item["zoneRedundant"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    disableLocalAuth: item["disableLocalAuth"],
    alternateName: item["alternateName"],
    platformCapabilities: !item["platformCapabilities"]
      ? item["platformCapabilities"]
      : platformCapabilitiesDeserializer(item["platformCapabilities"]),
    geoDataReplication: !item["geoDataReplication"]
      ? item["geoDataReplication"]
      : geoDataReplicationPropertiesDeserializer(item["geoDataReplication"]),
    ipV6Enabled: item["ipV6Enabled"],
  };
}

export function _failOverPropertiesSerializer(item: FailOver): any {
  return { primaryLocation: item["primaryLocation"], force: item["force"] };
}

export function _failOverPropertiesDeserializer(item: any) {
  return {
    primaryLocation: item["primaryLocation"],
    force: item["force"],
  };
}

export function _networkRuleSetPropertiesSerializer(item: NetworkRuleSet): any {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : nwRuleSetVirtualNetworkRulesArraySerializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : nwRuleSetIpRulesArraySerializer(item["ipRules"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _networkRuleSetPropertiesDeserializer(item: any) {
  return {
    trustedServiceAccessEnabled: item["trustedServiceAccessEnabled"],
    defaultAction: item["defaultAction"],
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : nwRuleSetVirtualNetworkRulesArrayDeserializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"]
      ? item["ipRules"]
      : nwRuleSetIpRulesArrayDeserializer(item["ipRules"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function _privateLinkResourcePropertiesDeserializer(item: any) {
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

export function _schemaGroupPropertiesSerializer(item: SchemaGroup): any {
  return {
    groupProperties: item["groupProperties"],
    schemaCompatibility: item["schemaCompatibility"],
    schemaType: item["schemaType"],
  };
}

export function _schemaGroupPropertiesDeserializer(item: any) {
  return {
    updatedAtUtc: !item["updatedAtUtc"] ? item["updatedAtUtc"] : new Date(item["updatedAtUtc"]),
    createdAtUtc: !item["createdAtUtc"] ? item["createdAtUtc"] : new Date(item["createdAtUtc"]),
    eTag: item["eTag"],
    groupProperties: !item["groupProperties"]
      ? item["groupProperties"]
      : Object.fromEntries(
          Object.entries(item["groupProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    schemaCompatibility: item["schemaCompatibility"],
    schemaType: item["schemaType"],
  };
}

export function _applicationGroupPropertiesSerializer(item: ApplicationGroup): any {
  return {
    isEnabled: item["isEnabled"],
    clientAppGroupIdentifier: item["clientAppGroupIdentifier"],
    policies: !item["policies"]
      ? item["policies"]
      : applicationGroupPolicyUnionArraySerializer(item["policies"]),
  };
}

export function _applicationGroupPropertiesDeserializer(item: any) {
  return {
    isEnabled: item["isEnabled"],
    clientAppGroupIdentifier: item["clientAppGroupIdentifier"],
    policies: !item["policies"]
      ? item["policies"]
      : applicationGroupPolicyUnionArrayDeserializer(item["policies"]),
  };
}
