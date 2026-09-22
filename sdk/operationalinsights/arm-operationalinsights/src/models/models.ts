// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { serializeRecord } from "../static-helpers/serialization/serialize-record.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Paged collection of Operation items */
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

/** Supported operation of OperationalInsights resource provider. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft OperationsManagement. */
  provider?: string;
  /** Resource on which the operation is performed etc. */
  resource?: string;
  /** Type of operation: get, read, delete, etc. */
  operation?: string;
  /** Description of operation */
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

/** The top level Log Analytics cluster resource container. */
export interface Cluster extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** The sku properties. */
  sku?: ClusterSku;
  /** The ID associated with the cluster. */
  readonly clusterId?: string;
  /** The provisioning state of the cluster. */
  readonly provisioningState?: ClusterEntityStatus;
  /** Configures whether cluster will use double encryption. This Property can not be modified after cluster creation. Default value is 'true' */
  isDoubleEncryptionEnabled?: boolean;
  /** Sets whether the cluster will support availability zones. This can be set as true only in regions where Azure Data Explorer support Availability Zones. This Property can not be modified after cluster creation. Default value is 'true' if region supports Availability Zones. */
  isAvailabilityZonesEnabled?: boolean;
  /** The cluster's billing type. */
  billingType?: BillingType;
  /** The associated key properties. */
  keyVaultProperties?: KeyVaultProperties;
  /** The last time the cluster was updated. */
  readonly lastModifiedDate?: Date;
  /** The cluster creation time */
  readonly createdDate?: Date;
  /** The list of Log Analytics workspaces associated with the cluster */
  associatedWorkspaces?: AssociatedWorkspace[];
  /** Additional properties for capacity reservation */
  capacityReservationProperties?: CapacityReservationProperties;
  /** Cluster's replication properties. */
  replication?: ClusterReplicationProperties;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "isDoubleEncryptionEnabled",
      "isAvailabilityZonesEnabled",
      "billingType",
      "keyVaultProperties",
      "associatedWorkspaces",
      "capacityReservationProperties",
      "replication",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : clusterSkuSerializer(item["sku"]),
  };
}

export function clusterDeserializer(item: any): Cluster {
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
    ...(!item["properties"]
      ? item["properties"]
      : _clusterPropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : clusterSkuDeserializer(item["sku"]),
  };
}

/** Cluster properties. */
export interface ClusterProperties {
  /** The ID associated with the cluster. */
  readonly clusterId?: string;
  /** The provisioning state of the cluster. */
  readonly provisioningState?: ClusterEntityStatus;
  /** Configures whether cluster will use double encryption. This Property can not be modified after cluster creation. Default value is 'true' */
  isDoubleEncryptionEnabled?: boolean;
  /** Sets whether the cluster will support availability zones. This can be set as true only in regions where Azure Data Explorer support Availability Zones. This Property can not be modified after cluster creation. Default value is 'true' if region supports Availability Zones. */
  isAvailabilityZonesEnabled?: boolean;
  /** The cluster's billing type. */
  billingType?: BillingType;
  /** The associated key properties. */
  keyVaultProperties?: KeyVaultProperties;
  /** The last time the cluster was updated. */
  readonly lastModifiedDate?: Date;
  /** The cluster creation time */
  readonly createdDate?: Date;
  /** The list of Log Analytics workspaces associated with the cluster */
  associatedWorkspaces?: AssociatedWorkspace[];
  /** Additional properties for capacity reservation */
  capacityReservationProperties?: CapacityReservationProperties;
  /** Cluster's replication properties. */
  replication?: ClusterReplicationProperties;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    isDoubleEncryptionEnabled: item["isDoubleEncryptionEnabled"],
    isAvailabilityZonesEnabled: item["isAvailabilityZonesEnabled"],
    billingType: item["billingType"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : associatedWorkspaceArraySerializer(item["associatedWorkspaces"]),
    capacityReservationProperties: !item["capacityReservationProperties"]
      ? item["capacityReservationProperties"]
      : capacityReservationPropertiesSerializer(item["capacityReservationProperties"]),
    replication: !item["replication"]
      ? item["replication"]
      : clusterReplicationPropertiesSerializer(item["replication"]),
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    clusterId: item["clusterId"],
    provisioningState: item["provisioningState"],
    isDoubleEncryptionEnabled: item["isDoubleEncryptionEnabled"],
    isAvailabilityZonesEnabled: item["isAvailabilityZonesEnabled"],
    billingType: item["billingType"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    lastModifiedDate: !item["lastModifiedDate"]
      ? item["lastModifiedDate"]
      : new Date(item["lastModifiedDate"]),
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : associatedWorkspaceArrayDeserializer(item["associatedWorkspaces"]),
    capacityReservationProperties: !item["capacityReservationProperties"]
      ? item["capacityReservationProperties"]
      : capacityReservationPropertiesDeserializer(item["capacityReservationProperties"]),
    replication: !item["replication"]
      ? item["replication"]
      : clusterReplicationPropertiesDeserializer(item["replication"]),
  };
}

/** The provisioning state of the cluster. */
export enum KnownClusterEntityStatus {
  /** Creating */
  Creating = "Creating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** ProvisioningAccount */
  ProvisioningAccount = "ProvisioningAccount",
  /** Updating */
  Updating = "Updating",
}

/**
 * The provisioning state of the cluster. \
 * {@link KnownClusterEntityStatus} can be used interchangeably with ClusterEntityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting \
 * **ProvisioningAccount**: ProvisioningAccount \
 * **Updating**: Updating
 */
export type ClusterEntityStatus = string;

/** Configures whether billing will be only on the cluster or each workspace will be billed by its proportional use. This does not change the overall billing, only how it will be distributed. Default value is 'Cluster' */
export enum KnownBillingType {
  /** Cluster */
  Cluster = "Cluster",
  /** Workspaces */
  Workspaces = "Workspaces",
}

/**
 * Configures whether billing will be only on the cluster or each workspace will be billed by its proportional use. This does not change the overall billing, only how it will be distributed. Default value is 'Cluster' \
 * {@link KnownBillingType} can be used interchangeably with BillingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cluster**: Cluster \
 * **Workspaces**: Workspaces
 */
export type BillingType = string;

/** The key vault properties. */
export interface KeyVaultProperties {
  /** The Key Vault uri which holds they key associated with the Log Analytics cluster. */
  keyVaultUri?: string;
  /** The name of the key associated with the Log Analytics cluster. */
  keyName?: string;
  /** The version of the key associated with the Log Analytics cluster. */
  keyVersion?: string;
  /** Selected key minimum required size. */
  keyRsaSize?: number;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyRsaSize: item["keyRsaSize"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVersion: item["keyVersion"],
    keyRsaSize: item["keyRsaSize"],
  };
}

export function associatedWorkspaceArraySerializer(result: Array<AssociatedWorkspace>): any[] {
  return result.map((item) => {
    return associatedWorkspaceSerializer(item);
  });
}

export function associatedWorkspaceArrayDeserializer(result: Array<AssociatedWorkspace>): any[] {
  return result.map((item) => {
    return associatedWorkspaceDeserializer(item);
  });
}

/** The list of Log Analytics workspaces associated with the cluster. */
export interface AssociatedWorkspace {
  /** Associated workspace immutable id. */
  readonly workspaceId?: string;
  /** Associated workspace resource name. */
  readonly workspaceName?: string;
  /** Associated workspace arm resource id, in the form of: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}. */
  readonly resourceId?: string;
  /** The time of workspace association. */
  readonly associateDate?: Date;
}

export function associatedWorkspaceSerializer(_item: AssociatedWorkspace): any {
  return {};
}

export function associatedWorkspaceDeserializer(item: any): AssociatedWorkspace {
  return {
    workspaceId: item["workspaceId"],
    workspaceName: item["workspaceName"],
    resourceId: item["resourceId"],
    associateDate: !item["associateDate"] ? item["associateDate"] : new Date(item["associateDate"]),
  };
}

/** The Capacity Reservation properties. */
export interface CapacityReservationProperties {
  /** The last time Sku was updated. */
  readonly lastSkuUpdate?: Date;
  /** Minimum CapacityReservation value in Gigabytes. */
  readonly minCapacity?: number;
}

export function capacityReservationPropertiesSerializer(_item: CapacityReservationProperties): any {
  return {};
}

export function capacityReservationPropertiesDeserializer(
  item: any,
): CapacityReservationProperties {
  return {
    lastSkuUpdate: !item["lastSkuUpdate"] ? item["lastSkuUpdate"] : new Date(item["lastSkuUpdate"]),
    minCapacity: item["minCapacity"],
  };
}

/** Cluster replication properties. */
export interface ClusterReplicationProperties {
  /** The secondary location of the replication. If replication is being enabled, enabled must be provided. */
  location?: string;
  /** Specifies whether the replication is enabled or not. When true the cluster is replicate to the specified location. */
  enabled?: boolean;
  /** Should enable AvailabilityZones for the given replicated cluster */
  isAvailabilityZonesEnabled?: boolean;
  /** The provisioning state of the cluster replication. */
  readonly provisioningState?: ClusterReplicationState;
  /** The cluster's replication creation time */
  readonly createdDate?: Date;
  /** The last time the cluster's replication was updated. */
  readonly lastModifiedDate?: Date;
}

export function clusterReplicationPropertiesSerializer(item: ClusterReplicationProperties): any {
  return {
    location: item["location"],
    enabled: item["enabled"],
    isAvailabilityZonesEnabled: item["isAvailabilityZonesEnabled"],
  };
}

export function clusterReplicationPropertiesDeserializer(item: any): ClusterReplicationProperties {
  return {
    location: item["location"],
    enabled: item["enabled"],
    isAvailabilityZonesEnabled: item["isAvailabilityZonesEnabled"],
    provisioningState: item["provisioningState"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    lastModifiedDate: !item["lastModifiedDate"]
      ? item["lastModifiedDate"]
      : new Date(item["lastModifiedDate"]),
  };
}

/** The provisioning state of the cluster replication. */
export enum KnownClusterReplicationState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** EnableRequested */
  EnableRequested = "EnableRequested",
  /** Enabling */
  Enabling = "Enabling",
  /** DisableRequested */
  DisableRequested = "DisableRequested",
  /** Disabling */
  Disabling = "Disabling",
  /** RollbackRequested */
  RollbackRequested = "RollbackRequested",
  /** RollingBack */
  RollingBack = "RollingBack",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the cluster replication. \
 * {@link KnownClusterReplicationState} can be used interchangeably with ClusterReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **EnableRequested**: EnableRequested \
 * **Enabling**: Enabling \
 * **DisableRequested**: DisableRequested \
 * **Disabling**: Disabling \
 * **RollbackRequested**: RollbackRequested \
 * **RollingBack**: RollingBack \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type ClusterReplicationState = string;

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

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : Object.fromEntries(
          Object.entries(item["userAssignedIdentities"]).map(([k, p]: [string, any]) => [
            k,
            !p ? p : userAssignedIdentityDeserializer(p),
          ]),
        ),
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

/** The cluster sku definition. */
export interface ClusterSku {
  /** The capacity reservation level in Gigabytes for this cluster. */
  capacity?: number;
  /** The SKU (tier) of a cluster. */
  name?: ClusterSkuNameEnum;
}

export function clusterSkuSerializer(item: ClusterSku): any {
  return { capacity: item["capacity"], name: item["name"] };
}

export function clusterSkuDeserializer(item: any): ClusterSku {
  return {
    capacity: item["capacity"],
    name: item["name"],
  };
}

/** The SKU (tier) of a cluster. */
export enum KnownClusterSkuNameEnum {
  /** CapacityReservation */
  CapacityReservation = "CapacityReservation",
}

/**
 * The SKU (tier) of a cluster. \
 * {@link KnownClusterSkuNameEnum} can be used interchangeably with ClusterSkuNameEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CapacityReservation**: CapacityReservation
 */
export type ClusterSkuNameEnum = string;

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

/** The top level Log Analytics cluster resource container. */
export interface ClusterPatch {
  /** Resource's identity. */
  identity?: ManagedServiceIdentity;
  /** The sku properties. */
  sku?: ClusterSku;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The associated key properties. */
  keyVaultProperties?: KeyVaultProperties;
  /** The cluster's billing type. */
  billingType?: BillingType;
}

export function clusterPatchSerializer(item: ClusterPatch): any {
  return {
    properties: areAllPropsUndefined(item, ["keyVaultProperties", "billingType"])
      ? undefined
      : _clusterPatchPropertiesSerializer(item),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    sku: !item["sku"] ? item["sku"] : clusterSkuSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Log Analytics cluster patch properties. */
export interface ClusterPatchProperties {
  /** The associated key properties. */
  keyVaultProperties?: KeyVaultProperties;
  /** The cluster's billing type. */
  billingType?: BillingType;
}

export function clusterPatchPropertiesSerializer(item: ClusterPatchProperties): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    billingType: item["billingType"],
  };
}

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

/** The top level data export resource container. */
export interface DataExport extends ProxyResource {
  /** The data export rule ID. */
  dataExportId?: string;
  /** An array of tables to export, for example: [“Heartbeat, SecurityEvent”]. */
  tableNames?: string[];
  /** destination properties. */
  destination?: Destination;
  /** Active when enabled. */
  enable?: boolean;
  /** The latest data export rule modification time. */
  createdDate?: string;
  /** Date and time when the export was last modified. */
  lastModifiedDate?: string;
}

export function dataExportSerializer(item: DataExport): any {
  return {
    properties: areAllPropsUndefined(item, [
      "dataExportId",
      "tableNames",
      "destination",
      "enable",
      "createdDate",
      "lastModifiedDate",
    ])
      ? undefined
      : _dataExportPropertiesSerializer(item),
  };
}

export function dataExportDeserializer(item: any): DataExport {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dataExportPropertiesDeserializer(item["properties"])),
  };
}

/** Data Export properties. */
export interface DataExportProperties {
  /** The data export rule ID. */
  dataExportId?: string;
  /** An array of tables to export, for example: [“Heartbeat, SecurityEvent”]. */
  tableNames: string[];
  /** Active when enabled. */
  enable?: boolean;
  /** The latest data export rule modification time. */
  createdDate?: string;
  /** Date and time when the export was last modified. */
  lastModifiedDate?: string;
  /** The destination resource ID. This can be copied from the Properties entry of the destination resource in Azure. */
  resourceId?: string;
  /** The type of the destination resource */
  readonly type?: Type;
  /** destination meta data. */
  metaData?: DestinationMetaData;
}

export function dataExportPropertiesSerializer(item: DataExportProperties): any {
  return {
    dataExportId: item["dataExportId"],
    tableNames: item["tableNames"].map((p: any) => {
      return p;
    }),
    destination: areAllPropsUndefined(item, ["resourceId", "metaData"])
      ? undefined
      : _dataExportPropertiesDestinationSerializer(item),
    enable: item["enable"],
    createdDate: item["createdDate"],
    lastModifiedDate: item["lastModifiedDate"],
  };
}

export function dataExportPropertiesDeserializer(item: any): DataExportProperties {
  return {
    dataExportId: item["dataExportId"],
    tableNames: item["tableNames"].map((p: any) => {
      return p;
    }),
    ...(!item["destination"]
      ? item["destination"]
      : _dataExportPropertiesDestinationDeserializer(item["destination"])),
    enable: item["enable"],
    createdDate: item["createdDate"],
    lastModifiedDate: item["lastModifiedDate"],
  };
}

/** Destination properties. */
export interface Destination {
  /** The destination resource ID. This can be copied from the Properties entry of the destination resource in Azure. */
  resourceId: string;
  /** The type of the destination resource */
  readonly type?: Type;
  /** Optional. Allows to define an Event Hub name. Not applicable when destination is Storage Account. */
  eventHubName?: string;
}

export function destinationSerializer(item: Destination): any {
  return {
    resourceId: item["resourceId"],
    metaData: areAllPropsUndefined(item, ["eventHubName"])
      ? undefined
      : _destinationMetaDataSerializer(item),
  };
}

export function destinationDeserializer(item: any): Destination {
  return {
    resourceId: item["resourceId"],
    type: item["type"],
    ...(!item["metaData"] ? item["metaData"] : _destinationMetaDataDeserializer(item["metaData"])),
  };
}

/** The type of the destination resource */
export enum KnownType {
  /** StorageAccount */
  StorageAccount = "StorageAccount",
  /** EventHub */
  EventHub = "EventHub",
}

/**
 * The type of the destination resource \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **StorageAccount**: StorageAccount \
 * **EventHub**: EventHub
 */
export type Type = string;

/** Destination meta data. */
export interface DestinationMetaData {
  /** Optional. Allows to define an Event Hub name. Not applicable when destination is Storage Account. */
  eventHubName?: string;
}

export function destinationMetaDataSerializer(item: DestinationMetaData): any {
  return { eventHubName: item["eventHubName"] };
}

export function destinationMetaDataDeserializer(item: any): DestinationMetaData {
  return {
    eventHubName: item["eventHubName"],
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

/** Result of the request to list data exports. */
export interface _DataExportListResult {
  /** List of data export instances within a workspace.. */
  value?: DataExport[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _dataExportListResultDeserializer(item: any): _DataExportListResult {
  return {
    value: !item["value"] ? item["value"] : dataExportArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataExportArraySerializer(result: Array<DataExport>): any[] {
  return result.map((item) => {
    return dataExportSerializer(item);
  });
}

export function dataExportArrayDeserializer(result: Array<DataExport>): any[] {
  return result.map((item) => {
    return dataExportDeserializer(item);
  });
}

/** The top level Workspace resource container. */
export interface Workspace extends TrackedResource {
  /** The identity of the resource. */
  identity?: Identity;
  /** The etag of the workspace. */
  etag?: string;
  /** The provisioning state of the workspace. */
  readonly provisioningState?: WorkspaceEntityStatus;
  /** This is a read-only property. Represents the ID associated with the workspace. */
  readonly customerId?: string;
  /** The SKU of the workspace. */
  sku?: WorkspaceSku;
  /** The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details. */
  retentionInDays?: number;
  /** The daily volume cap for ingestion. */
  workspaceCapping?: WorkspaceCapping;
  /** Workspace creation date. */
  readonly createdDate?: Date;
  /** Workspace modification date. */
  readonly modifiedDate?: Date;
  /** The network access type for accessing Log Analytics ingestion. */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /** The network access type for accessing Log Analytics query. */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /** Indicates whether customer managed storage is mandatory for query management. */
  forceCmkForQuery?: boolean;
  /** List of linked private link scope resources. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** Workspace features. */
  features?: WorkspaceFeatures;
  /** The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}. */
  defaultDataCollectionRuleResourceId?: string;
  /** workspace replication properties. */
  replication?: WorkspaceReplicationProperties;
  /** workspace failover properties. */
  failover?: WorkspaceFailoverProperties;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "sku",
      "retentionInDays",
      "workspaceCapping",
      "publicNetworkAccessForIngestion",
      "publicNetworkAccessForQuery",
      "forceCmkForQuery",
      "features",
      "defaultDataCollectionRuleResourceId",
      "replication",
      "failover",
    ])
      ? undefined
      : _workspacePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    etag: item["etag"],
  };
}

export function workspaceDeserializer(item: any): Workspace {
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
    ...(!item["properties"]
      ? item["properties"]
      : _workspacePropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    etag: item["etag"],
  };
}

/** Workspace properties. */
export interface WorkspaceProperties {
  /** The provisioning state of the workspace. */
  readonly provisioningState?: WorkspaceEntityStatus;
  /** This is a read-only property. Represents the ID associated with the workspace. */
  readonly customerId?: string;
  /** The SKU of the workspace. */
  sku?: WorkspaceSku;
  /** The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details. */
  retentionInDays?: number;
  /** The daily volume cap for ingestion. */
  workspaceCapping?: WorkspaceCapping;
  /** Workspace creation date. */
  readonly createdDate?: Date;
  /** Workspace modification date. */
  readonly modifiedDate?: Date;
  /** The network access type for accessing Log Analytics ingestion. */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /** The network access type for accessing Log Analytics query. */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /** Indicates whether customer managed storage is mandatory for query management. */
  forceCmkForQuery?: boolean;
  /** List of linked private link scope resources. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** Workspace features. */
  features?: WorkspaceFeatures;
  /** The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}. */
  defaultDataCollectionRuleResourceId?: string;
  /** workspace replication properties. */
  replication?: WorkspaceReplicationProperties;
  /** workspace failover properties. */
  failover?: WorkspaceFailoverProperties;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return {
    sku: !item["sku"] ? item["sku"] : workspaceSkuSerializer(item["sku"]),
    retentionInDays: item["retentionInDays"],
    workspaceCapping: !item["workspaceCapping"]
      ? item["workspaceCapping"]
      : workspaceCappingSerializer(item["workspaceCapping"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    forceCmkForQuery: item["forceCmkForQuery"],
    features: !item["features"] ? item["features"] : workspaceFeaturesSerializer(item["features"]),
    defaultDataCollectionRuleResourceId: item["defaultDataCollectionRuleResourceId"],
    replication: !item["replication"]
      ? item["replication"]
      : workspaceReplicationPropertiesSerializer(item["replication"]),
    failover: !item["failover"]
      ? item["failover"]
      : workspaceFailoverPropertiesSerializer(item["failover"]),
  };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    customerId: item["customerId"],
    sku: !item["sku"] ? item["sku"] : workspaceSkuDeserializer(item["sku"]),
    retentionInDays: item["retentionInDays"],
    workspaceCapping: !item["workspaceCapping"]
      ? item["workspaceCapping"]
      : workspaceCappingDeserializer(item["workspaceCapping"]),
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    modifiedDate: !item["modifiedDate"] ? item["modifiedDate"] : new Date(item["modifiedDate"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    forceCmkForQuery: item["forceCmkForQuery"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["privateLinkScopedResources"]),
    features: !item["features"]
      ? item["features"]
      : workspaceFeaturesDeserializer(item["features"]),
    defaultDataCollectionRuleResourceId: item["defaultDataCollectionRuleResourceId"],
    replication: !item["replication"]
      ? item["replication"]
      : workspaceReplicationPropertiesDeserializer(item["replication"]),
    failover: !item["failover"]
      ? item["failover"]
      : workspaceFailoverPropertiesDeserializer(item["failover"]),
  };
}

/** The provisioning state of the workspace. */
export enum KnownWorkspaceEntityStatus {
  /** Creating */
  Creating = "Creating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** ProvisioningAccount */
  ProvisioningAccount = "ProvisioningAccount",
  /** Updating */
  Updating = "Updating",
}

/**
 * The provisioning state of the workspace. \
 * {@link KnownWorkspaceEntityStatus} can be used interchangeably with WorkspaceEntityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Creating**: Creating \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deleting**: Deleting \
 * **ProvisioningAccount**: ProvisioningAccount \
 * **Updating**: Updating
 */
export type WorkspaceEntityStatus = string;

/** The SKU (tier) of a workspace. */
export interface WorkspaceSku {
  /** The name of the SKU. */
  name: WorkspaceSkuNameEnum;
  /** The capacity reservation level in GB for this workspace, when CapacityReservation sku is selected. */
  capacityReservationLevel?: number;
  /** The last time when the sku was updated. */
  readonly lastSkuUpdate?: Date;
}

export function workspaceSkuSerializer(item: WorkspaceSku): any {
  return { name: item["name"], capacityReservationLevel: item["capacityReservationLevel"] };
}

export function workspaceSkuDeserializer(item: any): WorkspaceSku {
  return {
    name: item["name"],
    capacityReservationLevel: item["capacityReservationLevel"],
    lastSkuUpdate: !item["lastSkuUpdate"] ? item["lastSkuUpdate"] : new Date(item["lastSkuUpdate"]),
  };
}

/** The name of the SKU. */
export enum KnownWorkspaceSkuNameEnum {
  /** Free */
  Free = "Free",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
  /** PerNode */
  PerNode = "PerNode",
  /** PerGB2018 */
  PerGB2018 = "PerGB2018",
  /** Standalone */
  Standalone = "Standalone",
  /** CapacityReservation */
  CapacityReservation = "CapacityReservation",
  /** LACluster */
  LACluster = "LACluster",
}

/**
 * The name of the SKU. \
 * {@link KnownWorkspaceSkuNameEnum} can be used interchangeably with WorkspaceSkuNameEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free**: Free \
 * **Standard**: Standard \
 * **Premium**: Premium \
 * **PerNode**: PerNode \
 * **PerGB2018**: PerGB2018 \
 * **Standalone**: Standalone \
 * **CapacityReservation**: CapacityReservation \
 * **LACluster**: LACluster
 */
export type WorkspaceSkuNameEnum = string;

/** The daily volume cap for ingestion. */
export interface WorkspaceCapping {
  /** The workspace daily quota for ingestion. */
  dailyQuotaGb?: number;
  /** The time when the quota will be rest. */
  readonly quotaNextResetTime?: string;
  /** The status of data ingestion for this workspace. */
  readonly dataIngestionStatus?: DataIngestionStatus;
}

export function workspaceCappingSerializer(item: WorkspaceCapping): any {
  return { dailyQuotaGb: item["dailyQuotaGb"] };
}

export function workspaceCappingDeserializer(item: any): WorkspaceCapping {
  return {
    dailyQuotaGb: item["dailyQuotaGb"],
    quotaNextResetTime: item["quotaNextResetTime"],
    dataIngestionStatus: item["dataIngestionStatus"],
  };
}

/** The status of data ingestion for this workspace. */
export enum KnownDataIngestionStatus {
  /** Ingestion enabled following daily cap quota reset, or subscription enablement. */
  RespectQuota = "RespectQuota",
  /** Ingestion started following service setting change. */
  ForceOn = "ForceOn",
  /** Ingestion stopped following service setting change. */
  ForceOff = "ForceOff",
  /** Reached daily cap quota, ingestion stopped. */
  OverQuota = "OverQuota",
  /** Ingestion stopped following suspended subscription. */
  SubscriptionSuspended = "SubscriptionSuspended",
  /** 80% of daily cap quota reached. */
  ApproachingQuota = "ApproachingQuota",
}

/**
 * The status of data ingestion for this workspace. \
 * {@link KnownDataIngestionStatus} can be used interchangeably with DataIngestionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RespectQuota**: Ingestion enabled following daily cap quota reset, or subscription enablement. \
 * **ForceOn**: Ingestion started following service setting change. \
 * **ForceOff**: Ingestion stopped following service setting change. \
 * **OverQuota**: Reached daily cap quota, ingestion stopped. \
 * **SubscriptionSuspended**: Ingestion stopped following suspended subscription. \
 * **ApproachingQuota**: 80% of daily cap quota reached.
 */
export type DataIngestionStatus = string;

/** The network access type for operating on the Log Analytics Workspace. By default it is Enabled */
export enum KnownPublicNetworkAccessType {
  /** Enables connectivity to Log Analytics through public DNS. */
  Enabled = "Enabled",
  /** Disables public connectivity to Log Analytics through public DNS. */
  Disabled = "Disabled",
  /** Resource is only accessible from private networks and access approved by network security perimeter associated to this resource. */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * The network access type for operating on the Log Analytics Workspace. By default it is Enabled \
 * {@link KnownPublicNetworkAccessType} can be used interchangeably with PublicNetworkAccessType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enables connectivity to Log Analytics through public DNS. \
 * **Disabled**: Disables public connectivity to Log Analytics through public DNS. \
 * **SecuredByPerimeter**: Resource is only accessible from private networks and access approved by network security perimeter associated to this resource.
 */
export type PublicNetworkAccessType = string;

export function privateLinkScopedResourceArrayDeserializer(
  result: Array<PrivateLinkScopedResource>,
): any[] {
  return result.map((item) => {
    return privateLinkScopedResourceDeserializer(item);
  });
}

/** The private link scope resource reference. */
export interface PrivateLinkScopedResource {
  /** The full resource Id of the private link scope resource. */
  resourceId?: string;
  /** The private link scope unique Identifier. */
  scopeId?: string;
}

export function privateLinkScopedResourceDeserializer(item: any): PrivateLinkScopedResource {
  return {
    resourceId: item["resourceId"],
    scopeId: item["scopeId"],
  };
}

/** Workspace features. */
export interface WorkspaceFeatures {
  /** Flag that indicate if data should be exported. */
  enableDataExport?: boolean;
  /** Flag that describes if we want to remove the data after 30 days. */
  immediatePurgeDataOn30Days?: boolean;
  /** Flag that indicate which permission to use - resource or workspace or both. */
  enableLogAccessUsingOnlyResourcePermissions?: boolean;
  /** Dedicated LA cluster resourceId that is linked to the workspaces. */
  clusterResourceId?: string;
  /** Disable Non-AAD based Auth. */
  disableLocalAuth?: boolean;
  /** An indication if the specify workspace is limited to sentinel's unified billing model only. */
  readonly unifiedSentinelBillingOnly?: boolean;
  /** List of associations for the workspace. Indicates if the workspace is associated with any of the following experiences: MDC, Sentinel, SentinelGraph, etc. */
  readonly associations?: string[];
  /** Additional properties */
  additionalProperties?: Record<string, any>;
}

export function workspaceFeaturesSerializer(item: WorkspaceFeatures): any {
  return {
    ...serializeRecord(item.additionalProperties ?? {}),
    enableDataExport: item["enableDataExport"],
    immediatePurgeDataOn30Days: item["immediatePurgeDataOn30Days"],
    enableLogAccessUsingOnlyResourcePermissions:
      item["enableLogAccessUsingOnlyResourcePermissions"],
    clusterResourceId: item["clusterResourceId"],
    disableLocalAuth: item["disableLocalAuth"],
  };
}

export function workspaceFeaturesDeserializer(item: any): WorkspaceFeatures {
  return {
    additionalProperties: serializeRecord(item, [
      "enableDataExport",
      "immediatePurgeDataOn30Days",
      "enableLogAccessUsingOnlyResourcePermissions",
      "clusterResourceId",
      "disableLocalAuth",
      "unifiedSentinelBillingOnly",
      "associations",
    ]),
    enableDataExport: item["enableDataExport"],
    immediatePurgeDataOn30Days: item["immediatePurgeDataOn30Days"],
    enableLogAccessUsingOnlyResourcePermissions:
      item["enableLogAccessUsingOnlyResourcePermissions"],
    clusterResourceId: item["clusterResourceId"],
    disableLocalAuth: item["disableLocalAuth"],
    unifiedSentinelBillingOnly: item["unifiedSentinelBillingOnly"],
    associations: !item["associations"]
      ? item["associations"]
      : item["associations"].map((p: any) => {
          return p;
        }),
  };
}

/** Workspace replication properties. */
export interface WorkspaceReplicationProperties {
  /** The location of the replication. */
  location?: string;
  /** Specifies whether the replication is enabled or not. When true, workspace configuration and data is replicated to the specified location. If replication is been enabled, location must be provided. */
  enabled?: boolean;
  /** The provisioning state of the replication. */
  readonly provisioningState?: WorkspaceReplicationState;
  /** The last time when the replication was enabled. */
  readonly createdDate?: Date;
  /** The last time when the replication was updated. */
  readonly lastModifiedDate?: Date;
}

export function workspaceReplicationPropertiesSerializer(
  item: WorkspaceReplicationProperties,
): any {
  return { location: item["location"], enabled: item["enabled"] };
}

export function workspaceReplicationPropertiesDeserializer(
  item: any,
): WorkspaceReplicationProperties {
  return {
    location: item["location"],
    enabled: item["enabled"],
    provisioningState: item["provisioningState"],
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    lastModifiedDate: !item["lastModifiedDate"]
      ? item["lastModifiedDate"]
      : new Date(item["lastModifiedDate"]),
  };
}

/** The provisioning state of the replication. */
export enum KnownWorkspaceReplicationState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** EnableRequested */
  EnableRequested = "EnableRequested",
  /** Enabling */
  Enabling = "Enabling",
  /** DisableRequested */
  DisableRequested = "DisableRequested",
  /** Disabling */
  Disabling = "Disabling",
  /** RollbackRequested */
  RollbackRequested = "RollbackRequested",
  /** RollingBack */
  RollingBack = "RollingBack",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the replication. \
 * {@link KnownWorkspaceReplicationState} can be used interchangeably with WorkspaceReplicationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **EnableRequested**: EnableRequested \
 * **Enabling**: Enabling \
 * **DisableRequested**: DisableRequested \
 * **Disabling**: Disabling \
 * **RollbackRequested**: RollbackRequested \
 * **RollingBack**: RollingBack \
 * **Failed**: Failed \
 * **Canceled**: Canceled
 */
export type WorkspaceReplicationState = string;

/** The failover state of the replication. */
export interface WorkspaceFailoverProperties {
  /** The failover state of the replication. */
  readonly state?: WorkspaceFailoverState;
  /** The last time when the failover state was updated. */
  readonly lastModifiedDate?: Date;
}

export function workspaceFailoverPropertiesSerializer(_item: WorkspaceFailoverProperties): any {
  return {};
}

export function workspaceFailoverPropertiesDeserializer(item: any): WorkspaceFailoverProperties {
  return {
    state: item["state"],
    lastModifiedDate: !item["lastModifiedDate"]
      ? item["lastModifiedDate"]
      : new Date(item["lastModifiedDate"]),
  };
}

/** The failover state of the replication. */
export enum KnownWorkspaceFailoverState {
  /** Inactive */
  Inactive = "Inactive",
  /** Activating */
  Activating = "Activating",
  /** Active */
  Active = "Active",
  /** Deactivating */
  Deactivating = "Deactivating",
  /** Failed */
  Failed = "Failed",
}

/**
 * The failover state of the replication. \
 * {@link KnownWorkspaceFailoverState} can be used interchangeably with WorkspaceFailoverState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inactive**: Inactive \
 * **Activating**: Activating \
 * **Active**: Active \
 * **Deactivating**: Deactivating \
 * **Failed**: Failed
 */
export type WorkspaceFailoverState = string;

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** Type of managed service identity. */
  type: IdentityType;
  /** The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, UserIdentityProperties>;
}

export function identitySerializer(item: Identity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userIdentityPropertiesRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of managed service identity. */
export type IdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function userIdentityPropertiesRecordSerializer(
  item: Record<string, UserIdentityProperties>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesSerializer(item[key]);
  });
  return result;
}

export function userIdentityPropertiesRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserIdentityProperties> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userIdentityPropertiesDeserializer(item[key]);
  });
  return result;
}

/** User assigned identity properties. */
export interface UserIdentityProperties {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function userIdentityPropertiesSerializer(_item: UserIdentityProperties): any {
  return {};
}

export function userIdentityPropertiesDeserializer(item: any): UserIdentityProperties {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** The top level Workspace resource container. */
export interface WorkspacePatch extends AzureEntityResource {
  /** The identity of the resource. */
  identity?: Identity;
  /** Resource tags. Optional. */
  tags?: Record<string, string>;
  /** The provisioning state of the workspace. */
  readonly provisioningState?: WorkspaceEntityStatus;
  /** This is a read-only property. Represents the ID associated with the workspace. */
  readonly customerId?: string;
  /** The SKU of the workspace. */
  sku?: WorkspaceSku;
  /** The workspace data retention in days. Allowed values are per pricing plan. See pricing tiers documentation for details. */
  retentionInDays?: number;
  /** The daily volume cap for ingestion. */
  workspaceCapping?: WorkspaceCapping;
  /** Workspace creation date. */
  readonly createdDate?: Date;
  /** Workspace modification date. */
  readonly modifiedDate?: Date;
  /** The network access type for accessing Log Analytics ingestion. */
  publicNetworkAccessForIngestion?: PublicNetworkAccessType;
  /** The network access type for accessing Log Analytics query. */
  publicNetworkAccessForQuery?: PublicNetworkAccessType;
  /** Indicates whether customer managed storage is mandatory for query management. */
  forceCmkForQuery?: boolean;
  /** List of linked private link scope resources. */
  readonly privateLinkScopedResources?: PrivateLinkScopedResource[];
  /** Workspace features. */
  features?: WorkspaceFeatures;
  /** The resource ID of the default Data Collection Rule to use for this workspace. Expected format is - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/dataCollectionRules/{dcrName}. */
  defaultDataCollectionRuleResourceId?: string;
  /** workspace replication properties. */
  replication?: WorkspaceReplicationProperties;
  /** workspace failover properties. */
  failover?: WorkspaceFailoverProperties;
}

export function workspacePatchSerializer(item: WorkspacePatch): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sku",
      "retentionInDays",
      "workspaceCapping",
      "publicNetworkAccessForIngestion",
      "publicNetworkAccessForQuery",
      "forceCmkForQuery",
      "features",
      "defaultDataCollectionRuleResourceId",
      "replication",
      "failover",
    ])
      ? undefined
      : _workspacePatchPropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    tags: item["tags"],
  };
}

/** The resource model definition for an Azure Resource Manager resource with an etag. */
export interface AzureEntityResource extends Resource {
  /** Resource Etag. */
  readonly etag?: string;
}

export function azureEntityResourceSerializer(_item: AzureEntityResource): any {
  return {};
}

/** The list workspaces operation response. */
export interface _WorkspaceListResult {
  /** A list of workspaces. */
  value?: Workspace[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _workspaceListResultDeserializer(item: any): _WorkspaceListResult {
  return {
    value: !item["value"] ? item["value"] : workspaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workspaceArraySerializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceSerializer(item);
  });
}

export function workspaceArrayDeserializer(result: Array<Workspace>): any[] {
  return result.map((item) => {
    return workspaceDeserializer(item);
  });
}

/** Network security perimeter (NSP) configuration resource */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  properties?: NetworkSecurityPerimeterConfigurationProperties;
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
    properties: !item["properties"]
      ? item["properties"]
      : networkSecurityPerimeterConfigurationPropertiesDeserializer(item["properties"]),
  };
}

/** Network security configuration properties. */
export interface NetworkSecurityPerimeterConfigurationProperties {
  readonly provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of provisioning issues, if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  networkSecurityPerimeter?: NetworkSecurityPerimeter;
  resourceAssociation?: ResourceAssociation;
  profile?: NetworkSecurityProfile;
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
      : resourceAssociationDeserializer(item["resourceAssociation"]),
    profile: !item["profile"]
      ? item["profile"]
      : networkSecurityProfileDeserializer(item["profile"]),
  };
}

/** Provisioning state of a network security perimeter configuration that is being created or updated. */
export enum KnownNetworkSecurityPerimeterConfigurationProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Accepted */
  Accepted = "Accepted",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of a network security perimeter configuration that is being created or updated. \
 * {@link KnownNetworkSecurityPerimeterConfigurationProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Updating** \
 * **Deleting** \
 * **Accepted** \
 * **Failed** \
 * **Canceled**
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes a provisioning issue for a network security perimeter configuration */
export interface ProvisioningIssue {
  /** Name of the issue */
  readonly name?: string;
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

/** Details of a provisioning issue for a network security perimeter (NSP) configuration. Resource providers should generate separate provisioning issue elements for each separate issue detected, and include a meaningful and distinctive description, as well as any appropriate suggestedResourceIds and suggestedAccessRules */
export interface ProvisioningIssueProperties {
  /** Type of issue */
  readonly issueType?: IssueType;
  /** Severity of the issue. */
  readonly severity?: Severity;
  /** Description of the issue */
  readonly description?: string;
  /** Fully qualified resource IDs of suggested resources that can be associated to the network security perimeter (NSP) to remediate the issue. */
  readonly suggestedResourceIds?: string[];
  /** Access rules that can be added to the network security profile (NSP) to remediate the issue. */
  readonly suggestedAccessRules?: AccessRule[];
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
    suggestedResourceIds: !item["suggestedResourceIds"]
      ? item["suggestedResourceIds"]
      : item["suggestedResourceIds"].map((p: any) => {
          return p;
        }),
    suggestedAccessRules: !item["suggestedAccessRules"]
      ? item["suggestedAccessRules"]
      : accessRuleArrayDeserializer(item["suggestedAccessRules"]),
  };
}

/** Type of issue */
export enum KnownIssueType {
  /** Unknown issue type */
  Unknown = "Unknown",
  /** An error occurred while applying the network security perimeter (NSP) configuration. */
  ConfigurationPropagationFailure = "ConfigurationPropagationFailure",
  /** A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules. */
  MissingPerimeterConfiguration = "MissingPerimeterConfiguration",
  /** An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP. */
  MissingIdentityConfiguration = "MissingIdentityConfiguration",
}

/**
 * Type of issue \
 * {@link KnownIssueType} can be used interchangeably with IssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: Unknown issue type \
 * **ConfigurationPropagationFailure**: An error occurred while applying the network security perimeter (NSP) configuration. \
 * **MissingPerimeterConfiguration**: A network connectivity issue is happening on the resource which could be addressed either by adding new resources to the network security perimeter (NSP) or by modifying access rules. \
 * **MissingIdentityConfiguration**: An managed identity hasn't been associated with the resource. The resource will still be able to validate inbound traffic from the network security perimeter (NSP) or matching inbound access rules, but it won't be able to perform outbound access as a member of the NSP.
 */
export type IssueType = string;

/** Severity of the issue. */
export enum KnownSeverity {
  /** Warning */
  Warning = "Warning",
  /** Error */
  Error = "Error",
}

/**
 * Severity of the issue. \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Warning** \
 * **Error**
 */
export type Severity = string;

export function accessRuleArrayDeserializer(result: Array<AccessRule>): any[] {
  return result.map((item) => {
    return accessRuleDeserializer(item);
  });
}

/** Access rule in a network security perimeter configuration profile */
export interface AccessRule {
  /** Name of the access rule */
  name?: string;
  properties?: AccessRuleProperties;
}

export function accessRuleDeserializer(item: any): AccessRule {
  return {
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : accessRulePropertiesDeserializer(item["properties"]),
  };
}

/** Properties of Access Rule */
export interface AccessRuleProperties {
  direction?: AccessRuleDirection;
  /** Address prefixes in the CIDR format for inbound rules */
  addressPrefixes?: string[];
  /** Subscriptions for inbound rules */
  subscriptions?: AccessRulePropertiesSubscriptionsItem[];
  /** Network security perimeters for inbound rules */
  networkSecurityPerimeters?: NetworkSecurityPerimeter[];
  /** Fully qualified domain names (FQDN) for outbound rules */
  fullyQualifiedDomainNames?: string[];
  /** Email addresses for outbound rules */
  emailAddresses?: string[];
  /** Phone numbers for outbound rules */
  phoneNumbers?: string[];
}

export function accessRulePropertiesDeserializer(item: any): AccessRuleProperties {
  return {
    direction: item["direction"],
    addressPrefixes: !item["addressPrefixes"]
      ? item["addressPrefixes"]
      : item["addressPrefixes"].map((p: any) => {
          return p;
        }),
    subscriptions: !item["subscriptions"]
      ? item["subscriptions"]
      : accessRulePropertiesSubscriptionsItemArrayDeserializer(item["subscriptions"]),
    networkSecurityPerimeters: !item["networkSecurityPerimeters"]
      ? item["networkSecurityPerimeters"]
      : networkSecurityPerimeterArrayDeserializer(item["networkSecurityPerimeters"]),
    fullyQualifiedDomainNames: !item["fullyQualifiedDomainNames"]
      ? item["fullyQualifiedDomainNames"]
      : item["fullyQualifiedDomainNames"].map((p: any) => {
          return p;
        }),
    emailAddresses: !item["emailAddresses"]
      ? item["emailAddresses"]
      : item["emailAddresses"].map((p: any) => {
          return p;
        }),
    phoneNumbers: !item["phoneNumbers"]
      ? item["phoneNumbers"]
      : item["phoneNumbers"].map((p: any) => {
          return p;
        }),
  };
}

/** Direction of Access Rule */
export enum KnownAccessRuleDirection {
  /** Applies to inbound network traffic to the secured resources. */
  Inbound = "Inbound",
  /** Applies to outbound network traffic from the secured resources */
  Outbound = "Outbound",
}

/**
 * Direction of Access Rule \
 * {@link KnownAccessRuleDirection} can be used interchangeably with AccessRuleDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inbound**: Applies to inbound network traffic to the secured resources. \
 * **Outbound**: Applies to outbound network traffic from the secured resources
 */
export type AccessRuleDirection = string;

export function accessRulePropertiesSubscriptionsItemArrayDeserializer(
  result: Array<AccessRulePropertiesSubscriptionsItem>,
): any[] {
  return result.map((item) => {
    return accessRulePropertiesSubscriptionsItemDeserializer(item);
  });
}

/** we add this model  in order to replace subscriptions model in CommonTypes with this model via alternateType decorator */
export interface AccessRulePropertiesSubscriptionsItem {
  /** The fully qualified Azure resource ID of the subscription e.g. ('/subscriptions/00000000-0000-0000-0000-000000000000') */
  id?: string;
}

export function accessRulePropertiesSubscriptionsItemDeserializer(
  item: any,
): AccessRulePropertiesSubscriptionsItem {
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

/** Information about a network security perimeter (NSP) */
export interface NetworkSecurityPerimeter {
  /** Fully qualified Azure resource ID of the NSP resource */
  id?: string;
  /** Universal unique ID (UUID) of the network security perimeter */
  perimeterGuid?: string;
  /** Location of the network security perimeter */
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
export interface ResourceAssociation {
  /** Name of the resource association */
  name?: string;
  accessMode?: ResourceAssociationAccessMode;
}

export function resourceAssociationDeserializer(item: any): ResourceAssociation {
  return {
    name: item["name"],
    accessMode: item["accessMode"],
  };
}

/** Access mode of the resource association */
export enum KnownResourceAssociationAccessMode {
  /** Enforced access mode - traffic to the resource that failed access checks is blocked */
  Enforced = "Enforced",
  /** Learning access mode - traffic to the resource is enabled for analysis but not blocked */
  Learning = "Learning",
  /** Audit access mode - traffic to the resource that fails access checks is logged but not blocked */
  Audit = "Audit",
}

/**
 * Access mode of the resource association \
 * {@link KnownResourceAssociationAccessMode} can be used interchangeably with ResourceAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enforced**: Enforced access mode - traffic to the resource that failed access checks is blocked \
 * **Learning**: Learning access mode - traffic to the resource is enabled for analysis but not blocked \
 * **Audit**: Audit access mode - traffic to the resource that fails access checks is logged but not blocked
 */
export type ResourceAssociationAccessMode = string;

/** Network security perimeter configuration profile */
export interface NetworkSecurityProfile {
  /** Name of the profile */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: number;
  /** List of Access Rules */
  accessRules?: AccessRule[];
  /** Current diagnostic settings version */
  diagnosticSettingsVersion?: number;
  /** List of log categories that are enabled */
  enabledLogCategories?: string[];
}

export function networkSecurityProfileDeserializer(item: any): NetworkSecurityProfile {
  return {
    name: item["name"],
    accessRulesVersion: item["accessRulesVersion"],
    accessRules: !item["accessRules"]
      ? item["accessRules"]
      : accessRuleArrayDeserializer(item["accessRules"]),
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

/** Result of a list NSP (network security perimeter) configurations request. */
export interface _NetworkSecurityPerimeterConfigurationListResult {
  /** Array of network security perimeter results. */
  value?: NetworkSecurityPerimeterConfiguration[];
  /** The link used to get the next page of results. */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListResultDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function networkSecurityPerimeterConfigurationArrayDeserializer(
  result: Array<NetworkSecurityPerimeterConfiguration>,
): any[] {
  return result.map((item) => {
    return networkSecurityPerimeterConfigurationDeserializer(item);
  });
}

/** Datasources under OMS Workspace. */
export interface DataSource extends ProxyResource {
  /** The data source properties in raw json format, each kind of data source have it's own schema. */
  properties: any;
  /** The ETag of the data source. */
  etag?: string;
  /** The kind of the DataSource. */
  kind: DataSourceKind;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function dataSourceSerializer(item: DataSource): any {
  return {
    properties: item["properties"],
    etag: item["etag"],
    kind: item["kind"],
    tags: item["tags"],
  };
}

export function dataSourceDeserializer(item: any): DataSource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: item["properties"],
    etag: item["etag"],
    kind: item["kind"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** The kind of the DataSource. */
export enum KnownDataSourceKind {
  /** WindowsEvent */
  WindowsEvent = "WindowsEvent",
  /** WindowsPerformanceCounter */
  WindowsPerformanceCounter = "WindowsPerformanceCounter",
  /** IISLogs */
  IISLogs = "IISLogs",
  /** LinuxSyslog */
  LinuxSyslog = "LinuxSyslog",
  /** LinuxSyslogCollection */
  LinuxSyslogCollection = "LinuxSyslogCollection",
  /** LinuxPerformanceObject */
  LinuxPerformanceObject = "LinuxPerformanceObject",
  /** LinuxPerformanceCollection */
  LinuxPerformanceCollection = "LinuxPerformanceCollection",
  /** CustomLog */
  CustomLog = "CustomLog",
  /** CustomLogCollection */
  CustomLogCollection = "CustomLogCollection",
  /** AzureAuditLog */
  AzureAuditLog = "AzureAuditLog",
  /** AzureActivityLog */
  AzureActivityLog = "AzureActivityLog",
  /** GenericDataSource */
  GenericDataSource = "GenericDataSource",
  /** ChangeTrackingCustomPath */
  ChangeTrackingCustomPath = "ChangeTrackingCustomPath",
  /** ChangeTrackingPath */
  ChangeTrackingPath = "ChangeTrackingPath",
  /** ChangeTrackingServices */
  ChangeTrackingServices = "ChangeTrackingServices",
  /** ChangeTrackingDataTypeConfiguration */
  ChangeTrackingDataTypeConfiguration = "ChangeTrackingDataTypeConfiguration",
  /** ChangeTrackingDefaultRegistry */
  ChangeTrackingDefaultRegistry = "ChangeTrackingDefaultRegistry",
  /** ChangeTrackingRegistry */
  ChangeTrackingRegistry = "ChangeTrackingRegistry",
  /** ChangeTrackingLinuxPath */
  ChangeTrackingLinuxPath = "ChangeTrackingLinuxPath",
  /** LinuxChangeTrackingPath */
  LinuxChangeTrackingPath = "LinuxChangeTrackingPath",
  /** ChangeTrackingContentLocation */
  ChangeTrackingContentLocation = "ChangeTrackingContentLocation",
  /** WindowsTelemetry */
  WindowsTelemetry = "WindowsTelemetry",
  /** Office365 */
  Office365 = "Office365",
  /** SecurityWindowsBaselineConfiguration */
  SecurityWindowsBaselineConfiguration = "SecurityWindowsBaselineConfiguration",
  /** SecurityCenterSecurityWindowsBaselineConfiguration */
  SecurityCenterSecurityWindowsBaselineConfiguration = "SecurityCenterSecurityWindowsBaselineConfiguration",
  /** SecurityEventCollectionConfiguration */
  SecurityEventCollectionConfiguration = "SecurityEventCollectionConfiguration",
  /** SecurityInsightsSecurityEventCollectionConfiguration */
  SecurityInsightsSecurityEventCollectionConfiguration = "SecurityInsightsSecurityEventCollectionConfiguration",
  /** ImportComputerGroup */
  ImportComputerGroup = "ImportComputerGroup",
  /** NetworkMonitoring */
  NetworkMonitoring = "NetworkMonitoring",
  /** Itsm */
  Itsm = "Itsm",
  /** DnsAnalytics */
  DnsAnalytics = "DnsAnalytics",
  /** ApplicationInsights */
  ApplicationInsights = "ApplicationInsights",
  /** SqlDataClassification */
  SqlDataClassification = "SqlDataClassification",
}

/**
 * The kind of the DataSource. \
 * {@link KnownDataSourceKind} can be used interchangeably with DataSourceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WindowsEvent**: WindowsEvent \
 * **WindowsPerformanceCounter**: WindowsPerformanceCounter \
 * **IISLogs**: IISLogs \
 * **LinuxSyslog**: LinuxSyslog \
 * **LinuxSyslogCollection**: LinuxSyslogCollection \
 * **LinuxPerformanceObject**: LinuxPerformanceObject \
 * **LinuxPerformanceCollection**: LinuxPerformanceCollection \
 * **CustomLog**: CustomLog \
 * **CustomLogCollection**: CustomLogCollection \
 * **AzureAuditLog**: AzureAuditLog \
 * **AzureActivityLog**: AzureActivityLog \
 * **GenericDataSource**: GenericDataSource \
 * **ChangeTrackingCustomPath**: ChangeTrackingCustomPath \
 * **ChangeTrackingPath**: ChangeTrackingPath \
 * **ChangeTrackingServices**: ChangeTrackingServices \
 * **ChangeTrackingDataTypeConfiguration**: ChangeTrackingDataTypeConfiguration \
 * **ChangeTrackingDefaultRegistry**: ChangeTrackingDefaultRegistry \
 * **ChangeTrackingRegistry**: ChangeTrackingRegistry \
 * **ChangeTrackingLinuxPath**: ChangeTrackingLinuxPath \
 * **LinuxChangeTrackingPath**: LinuxChangeTrackingPath \
 * **ChangeTrackingContentLocation**: ChangeTrackingContentLocation \
 * **WindowsTelemetry**: WindowsTelemetry \
 * **Office365**: Office365 \
 * **SecurityWindowsBaselineConfiguration**: SecurityWindowsBaselineConfiguration \
 * **SecurityCenterSecurityWindowsBaselineConfiguration**: SecurityCenterSecurityWindowsBaselineConfiguration \
 * **SecurityEventCollectionConfiguration**: SecurityEventCollectionConfiguration \
 * **SecurityInsightsSecurityEventCollectionConfiguration**: SecurityInsightsSecurityEventCollectionConfiguration \
 * **ImportComputerGroup**: ImportComputerGroup \
 * **NetworkMonitoring**: NetworkMonitoring \
 * **Itsm**: Itsm \
 * **DnsAnalytics**: DnsAnalytics \
 * **ApplicationInsights**: ApplicationInsights \
 * **SqlDataClassification**: SqlDataClassification
 */
export type DataSourceKind = string;

/** The response of a DataSource list operation. */
export interface _DataSourceListResult {
  /** The DataSource items on this page */
  value: DataSource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataSourceListResultDeserializer(item: any): _DataSourceListResult {
  return {
    value: dataSourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataSourceArraySerializer(result: Array<DataSource>): any[] {
  return result.map((item) => {
    return dataSourceSerializer(item);
  });
}

export function dataSourceArrayDeserializer(result: Array<DataSource>): any[] {
  return result.map((item) => {
    return dataSourceDeserializer(item);
  });
}

/** The top level Linked service resource container. */
export interface LinkedService extends ProxyResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require read access */
  resourceId?: string;
  /** The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require write access */
  writeAccessResourceId?: string;
  /** The provisioning state of the linked service. */
  provisioningState?: LinkedServiceEntityStatus;
}

export function linkedServiceSerializer(item: LinkedService): any {
  return { properties: _linkedServicePropertiesSerializer(item), tags: item["tags"] };
}

export function linkedServiceDeserializer(item: any): LinkedService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._linkedServicePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Linked service properties. */
export interface LinkedServiceProperties {
  /** The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require read access */
  resourceId?: string;
  /** The resource id of the resource that will be linked to the workspace. This should be used for linking resources which require write access */
  writeAccessResourceId?: string;
  /** The provisioning state of the linked service. */
  provisioningState?: LinkedServiceEntityStatus;
}

export function linkedServicePropertiesSerializer(item: LinkedServiceProperties): any {
  return {
    resourceId: item["resourceId"],
    writeAccessResourceId: item["writeAccessResourceId"],
    provisioningState: item["provisioningState"],
  };
}

export function linkedServicePropertiesDeserializer(item: any): LinkedServiceProperties {
  return {
    resourceId: item["resourceId"],
    writeAccessResourceId: item["writeAccessResourceId"],
    provisioningState: item["provisioningState"],
  };
}

/** The provisioning state of the linked service. */
export enum KnownLinkedServiceEntityStatus {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** ProvisioningAccount */
  ProvisioningAccount = "ProvisioningAccount",
  /** Updating */
  Updating = "Updating",
}

/**
 * The provisioning state of the linked service. \
 * {@link KnownLinkedServiceEntityStatus} can be used interchangeably with LinkedServiceEntityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Succeeded \
 * **Deleting**: Deleting \
 * **ProvisioningAccount**: ProvisioningAccount \
 * **Updating**: Updating
 */
export type LinkedServiceEntityStatus = string;

/** The list linked service operation response. */
export interface _LinkedServiceListResult {
  /** The list of linked service instances */
  value?: LinkedService[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _linkedServiceListResultDeserializer(item: any): _LinkedServiceListResult {
  return {
    value: !item["value"] ? item["value"] : linkedServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function linkedServiceArraySerializer(result: Array<LinkedService>): any[] {
  return result.map((item) => {
    return linkedServiceSerializer(item);
  });
}

export function linkedServiceArrayDeserializer(result: Array<LinkedService>): any[] {
  return result.map((item) => {
    return linkedServiceDeserializer(item);
  });
}

/** Value object for saved search results. */
export interface SavedSearch extends ProxyResource {
  /** The ETag of the saved search. To override an existing saved search, use "*" or specify the current Etag */
  etag?: string;
  /** The category of the saved search. This helps the user to find a saved search faster. */
  category: string;
  /** Saved search display name. */
  displayName: string;
  /** The query expression for the saved search. */
  query: string;
  /** The function alias if query serves as a function. */
  functionAlias?: string;
  /** The optional function parameters if query serves as a function. Value should be in the following format: 'param-name1:type1 = default_value1, param-name2:type2 = default_value2'. For more examples and proper syntax please refer to https://docs.microsoft.com/en-us/azure/kusto/query/functions/user-defined-functions. */
  functionParameters?: string;
  /** The version number of the query language. The current version is 2 and is the default. */
  version?: number;
  /** The tags attached to the saved search. */
  tags?: Tag[];
}

export function savedSearchSerializer(item: SavedSearch): any {
  return { properties: _savedSearchPropertiesSerializer(item), etag: item["etag"] };
}

export function savedSearchDeserializer(item: any): SavedSearch {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._savedSearchPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Value object for saved search results. */
export interface SavedSearchProperties {
  /** The category of the saved search. This helps the user to find a saved search faster. */
  category: string;
  /** Saved search display name. */
  displayName: string;
  /** The query expression for the saved search. */
  query: string;
  /** The function alias if query serves as a function. */
  functionAlias?: string;
  /** The optional function parameters if query serves as a function. Value should be in the following format: 'param-name1:type1 = default_value1, param-name2:type2 = default_value2'. For more examples and proper syntax please refer to https://docs.microsoft.com/en-us/azure/kusto/query/functions/user-defined-functions. */
  functionParameters?: string;
  /** The version number of the query language. The current version is 2 and is the default. */
  version?: number;
  /** The tags attached to the saved search. */
  tags?: Tag[];
}

export function savedSearchPropertiesSerializer(item: SavedSearchProperties): any {
  return {
    category: item["category"],
    displayName: item["displayName"],
    query: item["query"],
    functionAlias: item["functionAlias"],
    functionParameters: item["functionParameters"],
    version: item["version"],
    tags: !item["tags"] ? item["tags"] : tagArraySerializer(item["tags"]),
  };
}

export function savedSearchPropertiesDeserializer(item: any): SavedSearchProperties {
  return {
    category: item["category"],
    displayName: item["displayName"],
    query: item["query"],
    functionAlias: item["functionAlias"],
    functionParameters: item["functionParameters"],
    version: item["version"],
    tags: !item["tags"] ? item["tags"] : tagArrayDeserializer(item["tags"]),
  };
}

export function tagArraySerializer(result: Array<Tag>): any[] {
  return result.map((item) => {
    return tagSerializer(item);
  });
}

export function tagArrayDeserializer(result: Array<Tag>): any[] {
  return result.map((item) => {
    return tagDeserializer(item);
  });
}

/** A tag of a saved search. */
export interface Tag {
  /** The tag name. */
  name: string;
  /** The tag value. */
  value: string;
}

export function tagSerializer(item: Tag): any {
  return { name: item["name"], value: item["value"] };
}

export function tagDeserializer(item: any): Tag {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** The saved search list operation response. */
export interface SavedSearchesListResult {
  /** The array of result values. */
  value?: SavedSearch[];
}

export function savedSearchesListResultDeserializer(item: any): SavedSearchesListResult {
  return {
    value: !item["value"] ? item["value"] : savedSearchArrayDeserializer(item["value"]),
  };
}

export function savedSearchArraySerializer(result: Array<SavedSearch>): any[] {
  return result.map((item) => {
    return savedSearchSerializer(item);
  });
}

export function savedSearchArrayDeserializer(result: Array<SavedSearch>): any[] {
  return result.map((item) => {
    return savedSearchDeserializer(item);
  });
}

/** Workspace data table definition. */
export interface Table extends ProxyResource {
  /** In Analytics table: the tables analytics retention in days, between 4 and 730. Setting this property to -1 will default to the workspace retention. In Basic and Auxiliary table: read only property. */
  retentionInDays?: number;
  /** The table total retention in days, between 4 and 4383. Setting this property to -1 will default to retentionInDays. */
  totalRetentionInDays?: number;
  /** The tables long-term retention in days. Calculated as (totalRetentionInDays-retentionInDays). */
  readonly archiveRetentionInDays?: number;
  /** Parameters of the search job that initiated this table. */
  searchResults?: SearchResults;
  /** Parameters of the restore operation that initiated this table. */
  restoredLogs?: RestoredLogs;
  /** Search job execution statistics. */
  readonly resultStatistics?: ResultStatistics;
  /** Instruct the system how to handle and charge the logs ingested to this table. */
  plan?: TablePlanEnum;
  /** The timestamp that table plan was last modified (UTC). */
  readonly lastPlanModifiedDate?: string;
  /** Table schema. */
  schema?: Schema;
  /** Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded. */
  readonly provisioningState?: OperationalInsightsTableProvisioningState;
  /** True - Value originates from workspace retention in days, False - Customer specific. */
  readonly retentionInDaysAsDefault?: boolean;
  /** True - Value originates from retention in days, False - Customer specific. */
  readonly totalRetentionInDaysAsDefault?: boolean;
}

export function tableSerializer(item: Table): any {
  return {
    properties: areAllPropsUndefined(item, [
      "retentionInDays",
      "totalRetentionInDays",
      "searchResults",
      "restoredLogs",
      "plan",
      "schema",
    ])
      ? undefined
      : _tablePropertiesSerializer(item),
  };
}

export function tableDeserializer(item: any): Table {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tablePropertiesDeserializer(item["properties"])),
  };
}

/** Table properties. */
export interface TableProperties {
  /** In Analytics table: the tables analytics retention in days, between 4 and 730. Setting this property to -1 will default to the workspace retention. In Basic and Auxiliary table: read only property. */
  retentionInDays?: number;
  /** The table total retention in days, between 4 and 4383. Setting this property to -1 will default to retentionInDays. */
  totalRetentionInDays?: number;
  /** The tables long-term retention in days. Calculated as (totalRetentionInDays-retentionInDays). */
  readonly archiveRetentionInDays?: number;
  /** Parameters of the search job that initiated this table. */
  searchResults?: SearchResults;
  /** Parameters of the restore operation that initiated this table. */
  restoredLogs?: RestoredLogs;
  /** Search job execution statistics. */
  readonly resultStatistics?: ResultStatistics;
  /** Instruct the system how to handle and charge the logs ingested to this table. */
  plan?: TablePlanEnum;
  /** The timestamp that table plan was last modified (UTC). */
  readonly lastPlanModifiedDate?: string;
  /** Table schema. */
  schema?: Schema;
  /** Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded. */
  readonly provisioningState?: OperationalInsightsTableProvisioningState;
  /** True - Value originates from workspace retention in days, False - Customer specific. */
  readonly retentionInDaysAsDefault?: boolean;
  /** True - Value originates from retention in days, False - Customer specific. */
  readonly totalRetentionInDaysAsDefault?: boolean;
}

export function tablePropertiesSerializer(item: TableProperties): any {
  return {
    retentionInDays: item["retentionInDays"],
    totalRetentionInDays: item["totalRetentionInDays"],
    searchResults: !item["searchResults"]
      ? item["searchResults"]
      : searchResultsSerializer(item["searchResults"]),
    restoredLogs: !item["restoredLogs"]
      ? item["restoredLogs"]
      : restoredLogsSerializer(item["restoredLogs"]),
    plan: item["plan"],
    schema: !item["schema"] ? item["schema"] : schemaSerializer(item["schema"]),
  };
}

export function tablePropertiesDeserializer(item: any): TableProperties {
  return {
    retentionInDays: item["retentionInDays"],
    totalRetentionInDays: item["totalRetentionInDays"],
    archiveRetentionInDays: item["archiveRetentionInDays"],
    searchResults: !item["searchResults"]
      ? item["searchResults"]
      : searchResultsDeserializer(item["searchResults"]),
    restoredLogs: !item["restoredLogs"]
      ? item["restoredLogs"]
      : restoredLogsDeserializer(item["restoredLogs"]),
    resultStatistics: !item["resultStatistics"]
      ? item["resultStatistics"]
      : resultStatisticsDeserializer(item["resultStatistics"]),
    plan: item["plan"],
    lastPlanModifiedDate: item["lastPlanModifiedDate"],
    schema: !item["schema"] ? item["schema"] : schemaDeserializer(item["schema"]),
    provisioningState: item["provisioningState"],
    retentionInDaysAsDefault: item["retentionInDaysAsDefault"],
    totalRetentionInDaysAsDefault: item["totalRetentionInDaysAsDefault"],
  };
}

/** Parameters of the search job that initiated this table. */
export interface SearchResults {
  /** Search job query. */
  query?: string;
  /** Search job Description. */
  description?: string;
  /** Limit the search job to return up to specified number of rows. */
  limit?: number;
  /** The timestamp to start the search from (UTC) */
  startSearchTime?: Date;
  /** The timestamp to end the search by (UTC) */
  endSearchTime?: Date;
  /** The table used in the search job. */
  readonly sourceTable?: string;
  /** Search results table async operation id. */
  readonly azureAsyncOperationId?: string;
}

export function searchResultsSerializer(item: SearchResults): any {
  return {
    query: item["query"],
    description: item["description"],
    limit: item["limit"],
    startSearchTime: !item["startSearchTime"]
      ? item["startSearchTime"]
      : item["startSearchTime"].toISOString(),
    endSearchTime: !item["endSearchTime"]
      ? item["endSearchTime"]
      : item["endSearchTime"].toISOString(),
  };
}

export function searchResultsDeserializer(item: any): SearchResults {
  return {
    query: item["query"],
    description: item["description"],
    limit: item["limit"],
    startSearchTime: !item["startSearchTime"]
      ? item["startSearchTime"]
      : new Date(item["startSearchTime"]),
    endSearchTime: !item["endSearchTime"] ? item["endSearchTime"] : new Date(item["endSearchTime"]),
    sourceTable: item["sourceTable"],
    azureAsyncOperationId: item["azureAsyncOperationId"],
  };
}

/** Restore parameters. */
export interface RestoredLogs {
  /** The timestamp to start the restore from (UTC). */
  startRestoreTime?: Date;
  /** The timestamp to end the restore by (UTC). */
  endRestoreTime?: Date;
  /** The table to restore data from. */
  sourceTable?: string;
  /** Search results table async operation id. */
  readonly azureAsyncOperationId?: string;
}

export function restoredLogsSerializer(item: RestoredLogs): any {
  return {
    startRestoreTime: !item["startRestoreTime"]
      ? item["startRestoreTime"]
      : item["startRestoreTime"].toISOString(),
    endRestoreTime: !item["endRestoreTime"]
      ? item["endRestoreTime"]
      : item["endRestoreTime"].toISOString(),
    sourceTable: item["sourceTable"],
  };
}

export function restoredLogsDeserializer(item: any): RestoredLogs {
  return {
    startRestoreTime: !item["startRestoreTime"]
      ? item["startRestoreTime"]
      : new Date(item["startRestoreTime"]),
    endRestoreTime: !item["endRestoreTime"]
      ? item["endRestoreTime"]
      : new Date(item["endRestoreTime"]),
    sourceTable: item["sourceTable"],
    azureAsyncOperationId: item["azureAsyncOperationId"],
  };
}

/** Search job execution statistics. */
export interface ResultStatistics {
  /** Search job completion percentage. */
  readonly progress?: number;
  /** The number of rows that were returned by the search job. */
  readonly ingestedRecords?: number;
  /** Search job: Amount of scanned data. */
  readonly scannedGb?: number;
}

export function resultStatisticsDeserializer(item: any): ResultStatistics {
  return {
    progress: item["progress"],
    ingestedRecords: item["ingestedRecords"],
    scannedGb: item["scannedGb"],
  };
}

/** Instruct the system how to handle and charge the logs ingested to this table. */
export enum KnownTablePlanEnum {
  /** Medium-touch logs needed for troubleshooting and incident response. */
  Basic = "Basic",
  /** High-value logs used for continuous monitoring, real-time detection, and performance analytics. */
  Analytics = "Analytics",
  /** Low-touch logs, such as verbose logs, and data required for auditing and compliance. */
  Auxiliary = "Auxiliary",
}

/**
 * Instruct the system how to handle and charge the logs ingested to this table. \
 * {@link KnownTablePlanEnum} can be used interchangeably with TablePlanEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Medium-touch logs needed for troubleshooting and incident response. \
 * **Analytics**: High-value logs used for continuous monitoring, real-time detection, and performance analytics. \
 * **Auxiliary**: Low-touch logs, such as verbose logs, and data required for auditing and compliance.
 */
export type TablePlanEnum = string;

/** Table's schema. */
export interface Schema {
  /** Table name. */
  name?: string;
  /** Table display name. */
  displayName?: string;
  /** Table description. */
  description?: string;
  /** A list of table custom columns. */
  columns?: Column[];
  /** A list of table standard columns. */
  readonly standardColumns?: Column[];
  /** Table category. */
  readonly categories?: string[];
  /** Table labels. */
  readonly labels?: string[];
  /** Table's creator. */
  readonly source?: SourceEnum;
  /** Table's creator. */
  readonly tableType?: TableTypeEnum;
  /** The subtype describes what APIs can be used to interact with the table, and what features are available against it. */
  readonly tableSubType?: TableSubTypeEnum;
  /** List of solutions the table is affiliated with */
  readonly solutions?: string[];
}

export function schemaSerializer(item: Schema): any {
  return {
    name: item["name"],
    displayName: item["displayName"],
    description: item["description"],
    columns: !item["columns"] ? item["columns"] : columnArraySerializer(item["columns"]),
  };
}

export function schemaDeserializer(item: any): Schema {
  return {
    name: item["name"],
    displayName: item["displayName"],
    description: item["description"],
    columns: !item["columns"] ? item["columns"] : columnArrayDeserializer(item["columns"]),
    standardColumns: !item["standardColumns"]
      ? item["standardColumns"]
      : columnArrayDeserializer(item["standardColumns"]),
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    labels: !item["labels"]
      ? item["labels"]
      : item["labels"].map((p: any) => {
          return p;
        }),
    source: item["source"],
    tableType: item["tableType"],
    tableSubType: item["tableSubType"],
    solutions: !item["solutions"]
      ? item["solutions"]
      : item["solutions"].map((p: any) => {
          return p;
        }),
  };
}

export function columnArraySerializer(result: Array<Column>): any[] {
  return result.map((item) => {
    return columnSerializer(item);
  });
}

export function columnArrayDeserializer(result: Array<Column>): any[] {
  return result.map((item) => {
    return columnDeserializer(item);
  });
}

/** Table column. */
export interface Column {
  /** Column name. */
  name?: string;
  /** Column data type. */
  type?: ColumnTypeEnum;
  /** Column data type logical hint. */
  dataTypeHint?: ColumnDataTypeHintEnum;
  /** Column display name. */
  displayName?: string;
  /** Column description. */
  description?: string;
  /** Is displayed by default. */
  readonly isDefaultDisplay?: boolean;
  /** Is column hidden. */
  readonly isHidden?: boolean;
}

export function columnSerializer(item: Column): any {
  return {
    name: item["name"],
    type: item["type"],
    dataTypeHint: item["dataTypeHint"],
    displayName: item["displayName"],
    description: item["description"],
  };
}

export function columnDeserializer(item: any): Column {
  return {
    name: item["name"],
    type: item["type"],
    dataTypeHint: item["dataTypeHint"],
    displayName: item["displayName"],
    description: item["description"],
    isDefaultDisplay: item["isDefaultDisplay"],
    isHidden: item["isHidden"],
  };
}

/** Column data type. */
export enum KnownColumnTypeEnum {
  /** string */
  String = "string",
  /** int */
  Int = "int",
  /** long */
  Long = "long",
  /** real */
  Real = "real",
  /** boolean */
  Boolean = "boolean",
  /** dateTime */
  DateTime = "dateTime",
  /** guid */
  Guid = "guid",
  /** dynamic */
  Dynamic = "dynamic",
}

/**
 * Column data type. \
 * {@link KnownColumnTypeEnum} can be used interchangeably with ColumnTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **string**: string \
 * **int**: int \
 * **long**: long \
 * **real**: real \
 * **boolean**: boolean \
 * **dateTime**: dateTime \
 * **guid**: guid \
 * **dynamic**: dynamic
 */
export type ColumnTypeEnum = string;

/** Column data type logical hint. */
export enum KnownColumnDataTypeHintEnum {
  /** A string that matches the pattern of a URI, for example, scheme://username:password@host:1234/this/is/a/path?k1=v1&k2=v2#fragment */
  Uri = "uri",
  /** A standard 128-bit GUID following the standard shape, xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx */
  Guid = "guid",
  /** An Azure Resource Model (ARM) path: /subscriptions/{...}/resourceGroups/{...}/providers/Microsoft.{...}/{...}/{...}/{...}... */
  ArmPath = "armPath",
  /** A standard V4/V6 ip address following the standard shape, x.x.x.x/y:y:y:y:y:y:y:y */
  Ip = "ip",
}

/**
 * Column data type logical hint. \
 * {@link KnownColumnDataTypeHintEnum} can be used interchangeably with ColumnDataTypeHintEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **uri**: A string that matches the pattern of a URI, for example, scheme:\//username:password@host:1234\/this\/is\/a\/path?k1=v1&k2=v2#fragment \
 * **guid**: A standard 128-bit GUID following the standard shape, xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
 * **armPath**: An Azure Resource Model (ARM) path: \/subscriptions\/{...}\/resourceGroups\/{...}\/providers\/Microsoft.{...}\/{...}\/{...}\/{...}... \
 * **ip**: A standard V4\/V6 ip address following the standard shape, x.x.x.x\/y:y:y:y:y:y:y:y
 */
export type ColumnDataTypeHintEnum = string;

/** Table's creator. */
export enum KnownSourceEnum {
  /** Tables provisioned by the system, as collected via Diagnostic Settings, the Agents, or any other standard data collection means. */
  Microsoft = "microsoft",
  /** Tables created by the owner of the Workspace, and only found in this Workspace. */
  Customer = "customer",
}

/**
 * Table's creator. \
 * {@link KnownSourceEnum} can be used interchangeably with SourceEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **microsoft**: Tables provisioned by the system, as collected via Diagnostic Settings, the Agents, or any other standard data collection means. \
 * **customer**: Tables created by the owner of the Workspace, and only found in this Workspace.
 */
export type SourceEnum = string;

/** Table's creator. */
export enum KnownTableTypeEnum {
  /** Standard data collected by Azure Monitor. */
  Microsoft = "Microsoft",
  /** Custom log table. */
  CustomLog = "CustomLog",
  /** Restored data. */
  RestoredLogs = "RestoredLogs",
  /** Data collected by a search job. */
  SearchResults = "SearchResults",
}

/**
 * Table's creator. \
 * {@link KnownTableTypeEnum} can be used interchangeably with TableTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft**: Standard data collected by Azure Monitor. \
 * **CustomLog**: Custom log table. \
 * **RestoredLogs**: Restored data. \
 * **SearchResults**: Data collected by a search job.
 */
export type TableTypeEnum = string;

/** The subtype describes what APIs can be used to interact with the table, and what features are available against it. */
export enum KnownTableSubTypeEnum {
  /** The default subtype with which built-in tables are created. */
  Any = "Any",
  /** Indicates a table created through the Data Collector API or with the custom logs feature of the MMA agent, or any table against which Custom Fields were created. */
  Classic = "Classic",
  /** A table eligible to have data sent into it via any of the means supported by Data Collection Rules: the Data Collection Endpoint API, ingestion-time transformations, or any other mechanism provided by Data Collection Rules */
  DataCollectionRuleBased = "DataCollectionRuleBased",
}

/**
 * The subtype describes what APIs can be used to interact with the table, and what features are available against it. \
 * {@link KnownTableSubTypeEnum} can be used interchangeably with TableSubTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any**: The default subtype with which built-in tables are created. \
 * **Classic**: Indicates a table created through the Data Collector API or with the custom logs feature of the MMA agent, or any table against which Custom Fields were created. \
 * **DataCollectionRuleBased**: A table eligible to have data sent into it via any of the means supported by Data Collection Rules: the Data Collection Endpoint API, ingestion-time transformations, or any other mechanism provided by Data Collection Rules
 */
export type TableSubTypeEnum = string;

/** Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded. */
export enum KnownOperationalInsightsTableProvisioningState {
  /** Table schema is still being built and updated, table is currently locked for any changes till the procedure is done. */
  Updating = "Updating",
  /** Table schema is stable and without changes, table data is being updated. */
  InProgress = "InProgress",
  /** Table state is stable and without changes, table is unlocked and open for new updates. */
  Succeeded = "Succeeded",
  /** Table state is deleting. */
  Deleting = "Deleting",
}

/**
 * Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded. \
 * {@link KnownOperationalInsightsTableProvisioningState} can be used interchangeably with OperationalInsightsTableProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: Table schema is still being built and updated, table is currently locked for any changes till the procedure is done. \
 * **InProgress**: Table schema is stable and without changes, table data is being updated. \
 * **Succeeded**: Table state is stable and without changes, table is unlocked and open for new updates. \
 * **Deleting**: Table state is deleting.
 */
export type OperationalInsightsTableProvisioningState = string;

/** The list tables operation response. */
export interface _TablesListResult {
  /** A list of data tables. */
  value?: Table[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _tablesListResultDeserializer(item: any): _TablesListResult {
  return {
    value: !item["value"] ? item["value"] : tableArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function tableArraySerializer(result: Array<Table>): any[] {
  return result.map((item) => {
    return tableSerializer(item);
  });
}

export function tableArrayDeserializer(result: Array<Table>): any[] {
  return result.map((item) => {
    return tableDeserializer(item);
  });
}

/** Service Tier details. */
export interface AvailableServiceTier {
  /** The name of the Service Tier. */
  readonly serviceTier?: SkuNameEnum;
  /** True if the Service Tier is enabled for the workspace. */
  readonly enabled?: boolean;
  /** The minimum retention for the Service Tier, in days. */
  readonly minimumRetention?: number;
  /** The maximum retention for the Service Tier, in days. */
  readonly maximumRetention?: number;
  /** The default retention for the Service Tier, in days. */
  readonly defaultRetention?: number;
  /** The capacity reservation level in GB per day. Returned for the Capacity Reservation Service Tier. */
  readonly capacityReservationLevel?: number;
  /** Time when the sku was last updated for the workspace. Returned for the Capacity Reservation Service Tier. */
  readonly lastSkuUpdate?: string;
}

export function availableServiceTierDeserializer(item: any): AvailableServiceTier {
  return {
    serviceTier: item["serviceTier"],
    enabled: item["enabled"],
    minimumRetention: item["minimumRetention"],
    maximumRetention: item["maximumRetention"],
    defaultRetention: item["defaultRetention"],
    capacityReservationLevel: item["capacityReservationLevel"],
    lastSkuUpdate: item["lastSkuUpdate"],
  };
}

/** The name of the Service Tier. */
export enum KnownSkuNameEnum {
  /** Free */
  Free = "Free",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
  /** PerNode */
  PerNode = "PerNode",
  /** PerGB2018 */
  PerGB2018 = "PerGB2018",
  /** Standalone */
  Standalone = "Standalone",
  /** CapacityReservation */
  CapacityReservation = "CapacityReservation",
}

/**
 * The name of the Service Tier. \
 * {@link KnownSkuNameEnum} can be used interchangeably with SkuNameEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Free**: Free \
 * **Standard**: Standard \
 * **Premium**: Premium \
 * **PerNode**: PerNode \
 * **PerGB2018**: PerGB2018 \
 * **Standalone**: Standalone \
 * **CapacityReservation**: CapacityReservation
 */
export type SkuNameEnum = string;

/** Intelligence Pack containing a string name and boolean indicating if it's enabled. */
export interface IntelligencePack {
  /** The name of the intelligence pack. */
  name?: string;
  /** The enabled boolean for the intelligence pack. */
  enabled?: boolean;
  /** The display name of the intelligence pack. */
  displayName?: string;
}

export function intelligencePackDeserializer(item: any): IntelligencePack {
  return {
    name: item["name"],
    enabled: item["enabled"],
    displayName: item["displayName"],
  };
}

/** The list workspace management groups operation response. */
export interface _WorkspaceListManagementGroupsResult {
  /** Gets or sets a list of management groups attached to the workspace. */
  value?: ManagementGroup[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _workspaceListManagementGroupsResultDeserializer(
  item: any,
): _WorkspaceListManagementGroupsResult {
  return {
    value: !item["value"] ? item["value"] : managementGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managementGroupArrayDeserializer(result: Array<ManagementGroup>): any[] {
  return result.map((item) => {
    return managementGroupDeserializer(item);
  });
}

/** A management group that is connected to a workspace */
export interface ManagementGroup {
  /** The number of servers connected to the management group. */
  serverCount?: number;
  /** Gets or sets a value indicating whether the management group is a gateway. */
  isGateway?: boolean;
  /** The name of the management group. */
  name?: string;
  /** The unique ID of the management group. */
  id?: string;
  /** The datetime that the management group was created. */
  created?: Date;
  /** The last datetime that the management group received data. */
  dataReceived?: Date;
  /** The version of System Center that is managing the management group. */
  version?: string;
  /** The SKU of System Center that is managing the management group. */
  sku?: string;
}

export function managementGroupDeserializer(item: any): ManagementGroup {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _managementGroupPropertiesDeserializer(item["properties"])),
  };
}

/** Management group properties. */
export interface ManagementGroupProperties {
  /** The number of servers connected to the management group. */
  serverCount?: number;
  /** Gets or sets a value indicating whether the management group is a gateway. */
  isGateway?: boolean;
  /** The name of the management group. */
  name?: string;
  /** The unique ID of the management group. */
  id?: string;
  /** The datetime that the management group was created. */
  created?: Date;
  /** The last datetime that the management group received data. */
  dataReceived?: Date;
  /** The version of System Center that is managing the management group. */
  version?: string;
  /** The SKU of System Center that is managing the management group. */
  sku?: string;
}

export function managementGroupPropertiesDeserializer(item: any): ManagementGroupProperties {
  return {
    serverCount: item["serverCount"],
    isGateway: item["isGateway"],
    name: item["name"],
    id: item["id"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    dataReceived: !item["dataReceived"] ? item["dataReceived"] : new Date(item["dataReceived"]),
    version: item["version"],
    sku: item["sku"],
  };
}

/** The get schema operation response. */
export interface SearchGetSchemaResponse {
  /** The metadata from search results. */
  metadata?: SearchMetadata;
  /** The array of result values. */
  value?: SearchSchemaValue[];
}

export function searchGetSchemaResponseDeserializer(item: any): SearchGetSchemaResponse {
  return {
    metadata: !item["metadata"] ? item["metadata"] : searchMetadataDeserializer(item["metadata"]),
    value: !item["value"] ? item["value"] : searchSchemaValueArrayDeserializer(item["value"]),
  };
}

/** Metadata for search results. */
export interface SearchMetadata {
  /** The request id of the search. */
  searchId?: string;
  /** The search result type. */
  resultType?: string;
  /** The total number of search results. */
  total?: number;
  /** The number of top search results. */
  top?: number;
  /** The id of the search results request. */
  id?: string;
  /** The core summaries. */
  coreSummaries?: CoreSummary[];
  /** The status of the search results. */
  status?: string;
  /** The start time for the search. */
  startTime?: Date;
  /** The time of last update. */
  lastUpdated?: Date;
  /** The ETag of the search results. */
  eTag?: string;
  /** How the results are sorted. */
  sort?: SearchSort[];
  /** The request time. */
  requestTime?: number;
  /** The aggregated value field. */
  aggregatedValueField?: string;
  /** The aggregated grouping fields. */
  aggregatedGroupingFields?: string;
  /** The sum of all aggregates returned in the result set. */
  sum?: number;
  /** The max of all aggregates returned in the result set. */
  max?: number;
  /** The schema. */
  schema?: SearchMetadataSchema;
}

export function searchMetadataDeserializer(item: any): SearchMetadata {
  return {
    searchId: item["requestId"],
    resultType: item["resultType"],
    total: item["total"],
    top: item["top"],
    id: item["id"],
    coreSummaries: !item["coreSummaries"]
      ? item["coreSummaries"]
      : coreSummaryArrayDeserializer(item["coreSummaries"]),
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    eTag: item["eTag"],
    sort: !item["sort"] ? item["sort"] : searchSortArrayDeserializer(item["sort"]),
    requestTime: item["requestTime"],
    aggregatedValueField: item["aggregatedValueField"],
    aggregatedGroupingFields: item["aggregatedGroupingFields"],
    sum: item["sum"],
    max: item["max"],
    schema: !item["schema"] ? item["schema"] : searchMetadataSchemaDeserializer(item["schema"]),
  };
}

export function coreSummaryArrayDeserializer(result: Array<CoreSummary>): any[] {
  return result.map((item) => {
    return coreSummaryDeserializer(item);
  });
}

/** The core summary of a search. */
export interface CoreSummary {
  /** The status of a core summary. */
  status?: string;
  /** The number of documents of a core summary. */
  numberOfDocuments: number;
}

export function coreSummaryDeserializer(item: any): CoreSummary {
  return {
    status: item["status"],
    numberOfDocuments: item["numberOfDocuments"],
  };
}

export function searchSortArrayDeserializer(result: Array<SearchSort>): any[] {
  return result.map((item) => {
    return searchSortDeserializer(item);
  });
}

/** The sort parameters for search. */
export interface SearchSort {
  /** The name of the field the search query is sorted on. */
  name?: string;
  /** The sort order of the search. */
  order?: SearchSortEnum;
}

export function searchSortDeserializer(item: any): SearchSort {
  return {
    name: item["name"],
    order: item["order"],
  };
}

/** The sort order of the search. */
export enum KnownSearchSortEnum {
  /** asc */
  Asc = "asc",
  /** desc */
  Desc = "desc",
}

/**
 * The sort order of the search. \
 * {@link KnownSearchSortEnum} can be used interchangeably with SearchSortEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **asc**: asc \
 * **desc**: desc
 */
export type SearchSortEnum = string;

/** Schema metadata for search. */
export interface SearchMetadataSchema {
  /** The name of the metadata schema. */
  name?: string;
  /** The version of the metadata schema. */
  version?: number;
}

export function searchMetadataSchemaDeserializer(item: any): SearchMetadataSchema {
  return {
    name: item["name"],
    version: item["version"],
  };
}

export function searchSchemaValueArrayDeserializer(result: Array<SearchSchemaValue>): any[] {
  return result.map((item) => {
    return searchSchemaValueDeserializer(item);
  });
}

/** Value object for schema results. */
export interface SearchSchemaValue {
  /** The name of the schema. */
  name?: string;
  /** The display name of the schema. */
  displayName?: string;
  /** The type. */
  type?: string;
  /** The boolean that indicates the field is searchable as free text. */
  indexed: boolean;
  /** The boolean that indicates whether or not the field is stored. */
  stored: boolean;
  /** The boolean that indicates whether or not the field is a facet. */
  facet: boolean;
  /** The array of workflows containing the field. */
  ownerType?: string[];
}

export function searchSchemaValueDeserializer(item: any): SearchSchemaValue {
  return {
    name: item["name"],
    displayName: item["displayName"],
    type: item["type"],
    indexed: item["indexed"],
    stored: item["stored"],
    facet: item["facet"],
    ownerType: !item["ownerType"]
      ? item["ownerType"]
      : item["ownerType"].map((p: any) => {
          return p;
        }),
  };
}

/** The shared keys for a workspace. */
export interface SharedKeys {
  /** The primary shared key of a workspace. */
  primarySharedKey?: string;
  /** The secondary shared key of a workspace. */
  secondarySharedKey?: string;
}

export function sharedKeysDeserializer(item: any): SharedKeys {
  return {
    primarySharedKey: item["primarySharedKey"],
    secondarySharedKey: item["secondarySharedKey"],
  };
}

/** The list workspace usages operation response. */
export interface _WorkspaceListUsagesResult {
  /** Gets or sets a list of usage metrics for a workspace. */
  value?: UsageMetric[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _workspaceListUsagesResultDeserializer(item: any): _WorkspaceListUsagesResult {
  return {
    value: !item["value"] ? item["value"] : usageMetricArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageMetricArrayDeserializer(result: Array<UsageMetric>): any[] {
  return result.map((item) => {
    return usageMetricDeserializer(item);
  });
}

/** A metric describing the usage of a resource. */
export interface UsageMetric {
  /** The name of the metric. */
  name?: MetricName;
  /** The units used for the metric. */
  unit?: string;
  /** The current value of the metric. */
  currentValue?: number;
  /** The quota limit for the metric. */
  limit?: number;
  /** The time that the metric's value will reset. */
  nextResetTime?: Date;
  /** The quota period that determines the length of time between value resets. */
  quotaPeriod?: string;
}

export function usageMetricDeserializer(item: any): UsageMetric {
  return {
    name: !item["name"] ? item["name"] : metricNameDeserializer(item["name"]),
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    nextResetTime: !item["nextResetTime"] ? item["nextResetTime"] : new Date(item["nextResetTime"]),
    quotaPeriod: item["quotaPeriod"],
  };
}

/** The name of a metric. */
export interface MetricName {
  /** The system name of the metric. */
  value?: string;
  /** The localized name of the metric. */
  localizedValue?: string;
}

export function metricNameDeserializer(item: any): MetricName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Describes the body of a purge request for an App Insights Workspace */
export interface WorkspacePurgeBody {
  /** Table from which to purge data. */
  table: string;
  /** The set of columns and filters (queries) to run over them to purge the resulting data. */
  filters: WorkspacePurgeBodyFilters[];
}

export function workspacePurgeBodySerializer(item: WorkspacePurgeBody): any {
  return {
    table: item["table"],
    filters: workspacePurgeBodyFiltersArraySerializer(item["filters"]),
  };
}

export function workspacePurgeBodyFiltersArraySerializer(
  result: Array<WorkspacePurgeBodyFilters>,
): any[] {
  return result.map((item) => {
    return workspacePurgeBodyFiltersSerializer(item);
  });
}

/** User-defined filters to return data which will be purged from the table. */
export interface WorkspacePurgeBodyFilters {
  /** The column of the table over which the given query should run */
  column?: string;
  /** A query operator to evaluate over the provided column and value(s). Supported operators are ==, =~, in, in~, >, >=, <, <=, between, and have the same behavior as they would in a KQL query. */
  operator?: string;
  /** the value for the operator to function over. This can be a number (e.g., > 100), a string (timestamp >= '2017-09-01') or array of values. */
  value?: any;
  /** When filtering over custom dimensions, this key will be used as the name of the custom dimension. */
  key?: string;
}

export function workspacePurgeBodyFiltersSerializer(item: WorkspacePurgeBodyFilters): any {
  return {
    column: item["column"],
    operator: item["operator"],
    value: item["value"],
    key: item["key"],
  };
}

/** Response containing operationId for a specific purge action. */
export interface WorkspacePurgeResponse {
  /** Id to use when querying for status for a particular purge operation. */
  operationId: string;
}

export function workspacePurgeResponseDeserializer(item: any): WorkspacePurgeResponse {
  return {
    operationId: item["operationId"],
  };
}

/** Response containing status for a specific purge operation. */
export interface WorkspacePurgeStatusResponse {
  /** Status of the operation represented by the requested Id. */
  status: PurgeState;
}

export function workspacePurgeStatusResponseDeserializer(item: any): WorkspacePurgeStatusResponse {
  return {
    status: item["status"],
  };
}

/** Status of the operation represented by the requested Id. */
export enum KnownPurgeState {
  /** pending */
  Pending = "pending",
  /** completed */
  Completed = "completed",
}

/**
 * Status of the operation represented by the requested Id. \
 * {@link KnownPurgeState} can be used interchangeably with PurgeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **pending**: pending \
 * **completed**: completed
 */
export type PurgeState = string;

/** Linked storage accounts top level resource container. */
export interface LinkedStorageAccountsResource extends ProxyResource {
  /** Linked storage accounts type. */
  readonly dataSourceType?: DataSourceType;
  /** Linked storage accounts resources ids. */
  storageAccountIds?: string[];
}

export function linkedStorageAccountsResourceSerializer(item: LinkedStorageAccountsResource): any {
  return { properties: _linkedStorageAccountsResourcePropertiesSerializer(item) };
}

export function linkedStorageAccountsResourceDeserializer(
  item: any,
): LinkedStorageAccountsResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._linkedStorageAccountsResourcePropertiesDeserializer(item["properties"]),
  };
}

/** Linked storage accounts properties. */
export interface LinkedStorageAccountsProperties {
  /** Linked storage accounts type. */
  readonly dataSourceType?: DataSourceType;
  /** Linked storage accounts resources ids. */
  storageAccountIds?: string[];
}

export function linkedStorageAccountsPropertiesSerializer(
  item: LinkedStorageAccountsProperties,
): any {
  return {
    storageAccountIds: !item["storageAccountIds"]
      ? item["storageAccountIds"]
      : item["storageAccountIds"].map((p: any) => {
          return p;
        }),
  };
}

export function linkedStorageAccountsPropertiesDeserializer(
  item: any,
): LinkedStorageAccountsProperties {
  return {
    dataSourceType: item["dataSourceType"],
    storageAccountIds: !item["storageAccountIds"]
      ? item["storageAccountIds"]
      : item["storageAccountIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Linked storage accounts type. */
export type DataSourceType = "CustomLogs" | "AzureWatson" | "Query" | "Ingestion" | "Alerts";

/** The list linked storage accounts service operation response. */
export interface _LinkedStorageAccountsListResult {
  /** A list of linked storage accounts instances. */
  value?: LinkedStorageAccountsResource[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _linkedStorageAccountsListResultDeserializer(
  item: any,
): _LinkedStorageAccountsListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : linkedStorageAccountsResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function linkedStorageAccountsResourceArraySerializer(
  result: Array<LinkedStorageAccountsResource>,
): any[] {
  return result.map((item) => {
    return linkedStorageAccountsResourceSerializer(item);
  });
}

export function linkedStorageAccountsResourceArrayDeserializer(
  result: Array<LinkedStorageAccountsResource>,
): any[] {
  return result.map((item) => {
    return linkedStorageAccountsResourceDeserializer(item);
  });
}

/** A Log Analytics QueryPack-Query definition. */
export interface LogAnalyticsQueryPackQuery extends ProxyResource {
  /** The unique ID of your application. This field cannot be changed. */
  readonly idPropertiesId?: string;
  /** Unique display name for your query within the Query Pack. */
  displayName?: string;
  /** Creation Date for the Log Analytics Query, in ISO 8601 format. */
  readonly timeCreated?: Date;
  /** Last modified date of the Log Analytics Query, in ISO 8601 format. */
  readonly timeModified?: Date;
  /** Object Id of user creating the query. */
  readonly author?: string;
  /** Description of the query. */
  description?: string;
  /** Body of the query. */
  body?: string;
  /** The related metadata items for the function. */
  related?: LogAnalyticsQueryPackQueryPropertiesRelated;
  /** Tags associated with the query. */
  tags?: Record<string, string[]>;
  /** Additional properties that can be set for the query. */
  properties?: any;
}

export function logAnalyticsQueryPackQuerySerializer(item: LogAnalyticsQueryPackQuery): any {
  return {
    properties: areAllPropsUndefined(item, [
      "displayName",
      "description",
      "body",
      "related",
      "tags",
      "properties",
    ])
      ? undefined
      : _logAnalyticsQueryPackQueryPropertiesSerializer(item),
  };
}

export function logAnalyticsQueryPackQueryDeserializer(item: any): LogAnalyticsQueryPackQuery {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _logAnalyticsQueryPackQueryPropertiesDeserializer(item["properties"])),
  };
}

/** Properties that define an Log Analytics QueryPack-Query resource. */
export interface LogAnalyticsQueryPackQueryProperties {
  /** The unique ID of your application. This field cannot be changed. */
  readonly id?: string;
  /** Unique display name for your query within the Query Pack. */
  displayName: string;
  /** Creation Date for the Log Analytics Query, in ISO 8601 format. */
  readonly timeCreated?: Date;
  /** Last modified date of the Log Analytics Query, in ISO 8601 format. */
  readonly timeModified?: Date;
  /** Object Id of user creating the query. */
  readonly author?: string;
  /** Description of the query. */
  description?: string;
  /** Body of the query. */
  body: string;
  /** The related metadata items for the function. */
  related?: LogAnalyticsQueryPackQueryPropertiesRelated;
  /** Tags associated with the query. */
  tags?: Record<string, string[]>;
  /** Additional properties that can be set for the query. */
  properties?: any;
}

export function logAnalyticsQueryPackQueryPropertiesSerializer(
  item: LogAnalyticsQueryPackQueryProperties,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    body: item["body"],
    related: !item["related"]
      ? item["related"]
      : logAnalyticsQueryPackQueryPropertiesRelatedSerializer(item["related"]),
    tags: item["tags"],
    properties: item["properties"],
  };
}

export function logAnalyticsQueryPackQueryPropertiesDeserializer(
  item: any,
): LogAnalyticsQueryPackQueryProperties {
  return {
    id: item["id"],
    displayName: item["displayName"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    author: item["author"],
    description: item["description"],
    body: item["body"],
    related: !item["related"]
      ? item["related"]
      : logAnalyticsQueryPackQueryPropertiesRelatedDeserializer(item["related"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    properties: item["properties"],
  };
}

/** The related metadata items for the function. */
export interface LogAnalyticsQueryPackQueryPropertiesRelated {
  /** The related categories for the function. */
  categories?: string[];
  /** The related resource types for the function. */
  resourceTypes?: string[];
  /** The related Log Analytics solutions for the function. */
  solutions?: string[];
}

export function logAnalyticsQueryPackQueryPropertiesRelatedSerializer(
  item: LogAnalyticsQueryPackQueryPropertiesRelated,
): any {
  return {
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    solutions: !item["solutions"]
      ? item["solutions"]
      : item["solutions"].map((p: any) => {
          return p;
        }),
  };
}

export function logAnalyticsQueryPackQueryPropertiesRelatedDeserializer(
  item: any,
): LogAnalyticsQueryPackQueryPropertiesRelated {
  return {
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    solutions: !item["solutions"]
      ? item["solutions"]
      : item["solutions"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a LogAnalyticsQueryPackQuery list operation. */
export interface _LogAnalyticsQueryPackQueryListResult {
  /** The LogAnalyticsQueryPackQuery items on this page */
  value: LogAnalyticsQueryPackQuery[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logAnalyticsQueryPackQueryListResultDeserializer(
  item: any,
): _LogAnalyticsQueryPackQueryListResult {
  return {
    value: logAnalyticsQueryPackQueryArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logAnalyticsQueryPackQueryArraySerializer(
  result: Array<LogAnalyticsQueryPackQuery>,
): any[] {
  return result.map((item) => {
    return logAnalyticsQueryPackQuerySerializer(item);
  });
}

export function logAnalyticsQueryPackQueryArrayDeserializer(
  result: Array<LogAnalyticsQueryPackQuery>,
): any[] {
  return result.map((item) => {
    return logAnalyticsQueryPackQueryDeserializer(item);
  });
}

/** Properties that define an Log Analytics QueryPack-Query search properties. */
export interface LogAnalyticsQueryPackQuerySearchProperties {
  /** The related metadata items for the function. */
  related?: LogAnalyticsQueryPackQuerySearchPropertiesRelated;
  /** Tags associated with the query. */
  tags?: Record<string, string[]>;
}

export function logAnalyticsQueryPackQuerySearchPropertiesSerializer(
  item: LogAnalyticsQueryPackQuerySearchProperties,
): any {
  return {
    related: !item["related"]
      ? item["related"]
      : logAnalyticsQueryPackQuerySearchPropertiesRelatedSerializer(item["related"]),
    tags: item["tags"],
  };
}

/** The related metadata items for the function. */
export interface LogAnalyticsQueryPackQuerySearchPropertiesRelated {
  /** The related categories for the function. */
  categories?: string[];
  /** The related resource types for the function. */
  resourceTypes?: string[];
  /** The related Log Analytics solutions for the function. */
  solutions?: string[];
}

export function logAnalyticsQueryPackQuerySearchPropertiesRelatedSerializer(
  item: LogAnalyticsQueryPackQuerySearchPropertiesRelated,
): any {
  return {
    categories: !item["categories"]
      ? item["categories"]
      : item["categories"].map((p: any) => {
          return p;
        }),
    resourceTypes: !item["resourceTypes"]
      ? item["resourceTypes"]
      : item["resourceTypes"].map((p: any) => {
          return p;
        }),
    solutions: !item["solutions"]
      ? item["solutions"]
      : item["solutions"].map((p: any) => {
          return p;
        }),
  };
}

/** An Log Analytics QueryPack definition. */
export interface LogAnalyticsQueryPack extends TrackedResource {
  /** The unique ID of your application. This field cannot be changed. */
  readonly queryPackId?: string;
  /** Creation Date for the Log Analytics QueryPack, in ISO 8601 format. */
  readonly timeCreated?: Date;
  /** Last modified date of the Log Analytics QueryPack, in ISO 8601 format. */
  readonly timeModified?: Date;
  /** Current state of this QueryPack: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed. */
  readonly provisioningState?: string;
}

export function logAnalyticsQueryPackSerializer(item: LogAnalyticsQueryPack): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: _logAnalyticsQueryPackPropertiesSerializer(item),
  };
}

export function logAnalyticsQueryPackDeserializer(item: any): LogAnalyticsQueryPack {
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
    ..._logAnalyticsQueryPackPropertiesDeserializer(item["properties"]),
  };
}

/** Properties that define a Log Analytics QueryPack resource. */
export interface LogAnalyticsQueryPackProperties {
  /** The unique ID of your application. This field cannot be changed. */
  readonly queryPackId?: string;
  /** Creation Date for the Log Analytics QueryPack, in ISO 8601 format. */
  readonly timeCreated?: Date;
  /** Last modified date of the Log Analytics QueryPack, in ISO 8601 format. */
  readonly timeModified?: Date;
  /** Current state of this QueryPack: whether or not is has been provisioned within the resource group it is defined. Users cannot change this value but are able to read from it. Values will include Succeeded, Deploying, Canceled, and Failed. */
  readonly provisioningState?: string;
}

export function logAnalyticsQueryPackPropertiesSerializer(
  _item: LogAnalyticsQueryPackProperties,
): any {
  return {};
}

export function logAnalyticsQueryPackPropertiesDeserializer(
  item: any,
): LogAnalyticsQueryPackProperties {
  return {
    queryPackId: item["queryPackId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    provisioningState: item["provisioningState"],
  };
}

/** A container holding only the Tags for a resource, allowing the user to update the tags on a QueryPack instance. */
export interface TagsResource {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function tagsResourceSerializer(item: TagsResource): any {
  return { tags: item["tags"] };
}

/** The response of a LogAnalyticsQueryPack list operation. */
export interface _LogAnalyticsQueryPackListResult {
  /** The LogAnalyticsQueryPack items on this page */
  value: LogAnalyticsQueryPack[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _logAnalyticsQueryPackListResultDeserializer(
  item: any,
): _LogAnalyticsQueryPackListResult {
  return {
    value: logAnalyticsQueryPackArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function logAnalyticsQueryPackArraySerializer(result: Array<LogAnalyticsQueryPack>): any[] {
  return result.map((item) => {
    return logAnalyticsQueryPackSerializer(item);
  });
}

export function logAnalyticsQueryPackArrayDeserializer(
  result: Array<LogAnalyticsQueryPack>,
): any[] {
  return result.map((item) => {
    return logAnalyticsQueryPackDeserializer(item);
  });
}

/** The top level storage insight resource container. */
export interface StorageInsight extends ProxyResource {
  /** The ETag of the storage insight. */
  eTag?: string;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The names of the blob containers that the workspace should read */
  containers?: string[];
  /** The names of the Azure tables that the workspace should read */
  tables?: string[];
  /** The storage account connection details */
  storageAccount?: StorageAccount;
  /** The status of the storage insight */
  readonly status?: StorageInsightStatus;
}

export function storageInsightSerializer(item: StorageInsight): any {
  return {
    properties: areAllPropsUndefined(item, ["containers", "tables", "storageAccount"])
      ? undefined
      : _storageInsightPropertiesSerializer(item),
    eTag: item["eTag"],
    tags: item["tags"],
  };
}

export function storageInsightDeserializer(item: any): StorageInsight {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _storageInsightPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Storage insight properties. */
export interface StorageInsightProperties {
  /** The names of the blob containers that the workspace should read */
  containers?: string[];
  /** The names of the Azure tables that the workspace should read */
  tables?: string[];
  /** The storage account connection details */
  storageAccount: StorageAccount;
  /** The status of the storage insight */
  readonly status?: StorageInsightStatus;
}

export function storageInsightPropertiesSerializer(item: StorageInsightProperties): any {
  return {
    containers: !item["containers"]
      ? item["containers"]
      : item["containers"].map((p: any) => {
          return p;
        }),
    tables: !item["tables"]
      ? item["tables"]
      : item["tables"].map((p: any) => {
          return p;
        }),
    storageAccount: storageAccountSerializer(item["storageAccount"]),
  };
}

export function storageInsightPropertiesDeserializer(item: any): StorageInsightProperties {
  return {
    containers: !item["containers"]
      ? item["containers"]
      : item["containers"].map((p: any) => {
          return p;
        }),
    tables: !item["tables"]
      ? item["tables"]
      : item["tables"].map((p: any) => {
          return p;
        }),
    storageAccount: storageAccountDeserializer(item["storageAccount"]),
    status: !item["status"] ? item["status"] : storageInsightStatusDeserializer(item["status"]),
  };
}

/** Describes a storage account connection. */
export interface StorageAccount {
  /** The Azure Resource Manager ID of the storage account resource. */
  id: string;
  /** The storage account key. */
  key: string;
}

export function storageAccountSerializer(item: StorageAccount): any {
  return { id: item["id"], key: item["key"] };
}

export function storageAccountDeserializer(item: any): StorageAccount {
  return {
    id: item["id"],
    key: item["key"],
  };
}

/** The status of the storage insight. */
export interface StorageInsightStatus {
  /** The state of the storage insight connection to the workspace */
  state: StorageInsightState;
  /** Description of the state of the storage insight. */
  description?: string;
}

export function storageInsightStatusDeserializer(item: any): StorageInsightStatus {
  return {
    state: item["state"],
    description: item["description"],
  };
}

/** The state of the storage insight connection to the workspace */
export enum KnownStorageInsightState {
  /** OK */
  OK = "OK",
  /** ERROR */
  Error = "ERROR",
}

/**
 * The state of the storage insight connection to the workspace \
 * {@link KnownStorageInsightState} can be used interchangeably with StorageInsightState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OK**: OK \
 * **ERROR**: ERROR
 */
export type StorageInsightState = string;

/** The list storage insights operation response. */
export interface _StorageInsightListResult {
  /** A list of storage insight items. */
  value?: StorageInsight[];
  /** The link (url) to the next page of results. */
  odataNextLink?: string;
}

export function _storageInsightListResultDeserializer(item: any): _StorageInsightListResult {
  return {
    value: !item["value"] ? item["value"] : storageInsightArrayDeserializer(item["value"]),
    odataNextLink: item["@odata.nextLink"],
  };
}

export function storageInsightArraySerializer(result: Array<StorageInsight>): any[] {
  return result.map((item) => {
    return storageInsightSerializer(item);
  });
}

export function storageInsightArrayDeserializer(result: Array<StorageInsight>): any[] {
  return result.map((item) => {
    return storageInsightDeserializer(item);
  });
}

/** Workspace data summary rules definition. */
export interface SummaryLogs extends ProxyResource {
  /** SummaryRules rule type: User. */
  ruleType?: RuleTypeEnum;
  /** The display name of the Summary rule. */
  displayName?: string;
  /** The description of the Summary rule. */
  description?: string;
  /** Indicates if Summary rule is active. If not, Summary rule execution stops. */
  readonly isActive?: boolean;
  /** Indicates the reason for rule deactivation. */
  readonly statusCode?: StatusCodeEnum;
  /** Summary rule is in provisioning state. If set to 'updating' or 'deleting', indicates a resource lock due to an ongoing operation, preventing any update to the Summary rule until the operation is complete. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** Rule definition parameters. */
  ruleDefinition?: RuleDefinition;
}

export function summaryLogsSerializer(item: SummaryLogs): any {
  return {
    properties: areAllPropsUndefined(item, [
      "ruleType",
      "displayName",
      "description",
      "ruleDefinition",
    ])
      ? undefined
      : _summaryLogsPropertiesSerializer(item),
  };
}

export function summaryLogsDeserializer(item: any): SummaryLogs {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _summaryLogsPropertiesDeserializer(item["properties"])),
  };
}

/** Summary rule properties. */
export interface SummaryLogsProperties {
  /** SummaryRules rule type: User. */
  ruleType?: RuleTypeEnum;
  /** The display name of the Summary rule. */
  displayName?: string;
  /** The description of the Summary rule. */
  description?: string;
  /** Indicates if Summary rule is active. If not, Summary rule execution stops. */
  readonly isActive?: boolean;
  /** Indicates the reason for rule deactivation. */
  readonly statusCode?: StatusCodeEnum;
  /** Summary rule is in provisioning state. If set to 'updating' or 'deleting', indicates a resource lock due to an ongoing operation, preventing any update to the Summary rule until the operation is complete. */
  readonly provisioningState?: ProvisioningStateEnum;
  /** Rule definition parameters. */
  ruleDefinition?: RuleDefinition;
}

export function summaryLogsPropertiesSerializer(item: SummaryLogsProperties): any {
  return {
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    ruleDefinition: !item["ruleDefinition"]
      ? item["ruleDefinition"]
      : ruleDefinitionSerializer(item["ruleDefinition"]),
  };
}

export function summaryLogsPropertiesDeserializer(item: any): SummaryLogsProperties {
  return {
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    isActive: item["isActive"],
    statusCode: item["statusCode"],
    provisioningState: item["provisioningState"],
    ruleDefinition: !item["ruleDefinition"]
      ? item["ruleDefinition"]
      : ruleDefinitionDeserializer(item["ruleDefinition"]),
  };
}

/** SummaryRules rule type: User. */
export enum KnownRuleTypeEnum {
  /** User defined summary rule. This is the definition for rules created and defined by users. */
  User = "User",
}

/**
 * SummaryRules rule type: User. \
 * {@link KnownRuleTypeEnum} can be used interchangeably with RuleTypeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: User defined summary rule. This is the definition for rules created and defined by users.
 */
export type RuleTypeEnum = string;

/** Indicates the reason for rule deactivation. */
export enum KnownStatusCodeEnum {
  /** Summary rule stop originated from a user action (Stop was called). */
  UserAction = "UserAction",
  /** Summary rule stop was caused due to data plane related error. */
  DataPlaneError = "DataPlaneError",
}

/**
 * Indicates the reason for rule deactivation. \
 * {@link KnownStatusCodeEnum} can be used interchangeably with StatusCodeEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UserAction**: Summary rule stop originated from a user action (Stop was called). \
 * **DataPlaneError**: Summary rule stop was caused due to data plane related error.
 */
export type StatusCodeEnum = string;

/** Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded. */
export enum KnownProvisioningStateEnum {
  /** Table schema is still being built and updated, table is currently locked for any changes till the procedure is done. */
  Updating = "Updating",
  /** Table state is stable and without changes, table is unlocked and open for new updates. */
  Succeeded = "Succeeded",
  /** Table state is deleting. */
  Deleting = "Deleting",
  /** Table state is failed. */
  Failed = "Failed",
  /** Table state is canceled. */
  Canceled = "Canceled",
}

/**
 * Table's current provisioning state. If set to 'updating', indicates a resource lock due to ongoing operation, forbidding any update to the table until the ongoing operation is concluded. \
 * {@link KnownProvisioningStateEnum} can be used interchangeably with ProvisioningStateEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: Table schema is still being built and updated, table is currently locked for any changes till the procedure is done. \
 * **Succeeded**: Table state is stable and without changes, table is unlocked and open for new updates. \
 * **Deleting**: Table state is deleting. \
 * **Failed**: Table state is failed. \
 * **Canceled**: Table state is canceled.
 */
export type ProvisioningStateEnum = string;

/** Rule definition parameters. */
export interface RuleDefinition {
  /** Summary rule query. */
  query?: string;
  /** Scheduled window in minutes. Allowed values: 20, 30, 60, 120, 180, 360, 720, 1440. */
  binSize?: number;
  /** The minimum delay in seconds before bin processing. */
  binDelay?: number;
  /** The start time (UTC) when Summary rule execution starts. */
  binStartTime?: Date;
  /** The time cursor used in Summary rules bins processing, e.g. TimeGenerated. */
  timeSelector?: TimeSelectorEnum;
  /** The destination table used for the Summary rule results. */
  destinationTable?: string;
}

export function ruleDefinitionSerializer(item: RuleDefinition): any {
  return {
    query: item["query"],
    binSize: item["binSize"],
    binDelay: item["binDelay"],
    binStartTime: !item["binStartTime"] ? item["binStartTime"] : item["binStartTime"].toISOString(),
    timeSelector: item["timeSelector"],
    destinationTable: item["destinationTable"],
  };
}

export function ruleDefinitionDeserializer(item: any): RuleDefinition {
  return {
    query: item["query"],
    binSize: item["binSize"],
    binDelay: item["binDelay"],
    binStartTime: !item["binStartTime"] ? item["binStartTime"] : new Date(item["binStartTime"]),
    timeSelector: item["timeSelector"],
    destinationTable: item["destinationTable"],
  };
}

/** The time cursor used in Summary rules bins processing, e.g. TimeGenerated. */
export enum KnownTimeSelectorEnum {
  /** TimeGenerated. */
  TimeGenerated = "TimeGenerated",
}

/**
 * The time cursor used in Summary rules bins processing, e.g. TimeGenerated. \
 * {@link KnownTimeSelectorEnum} can be used interchangeably with TimeSelectorEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TimeGenerated**: TimeGenerated.
 */
export type TimeSelectorEnum = string;

/** The response of a SummaryLogs list operation. */
export interface _SummaryLogsListResult {
  /** The SummaryLogs items on this page */
  value: SummaryLogs[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _summaryLogsListResultDeserializer(item: any): _SummaryLogsListResult {
  return {
    value: summaryLogsArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function summaryLogsArraySerializer(result: Array<SummaryLogs>): any[] {
  return result.map((item) => {
    return summaryLogsSerializer(item);
  });
}

export function summaryLogsArrayDeserializer(result: Array<SummaryLogs>): any[] {
  return result.map((item) => {
    return summaryLogsDeserializer(item);
  });
}

/** Request to retry a summary logs bin. */
export interface SummaryLogsRetryBin {
  /** Retry bin properties. */
  properties?: SummaryLogsRetryBinProperties;
}

export function summaryLogsRetryBinSerializer(item: SummaryLogsRetryBin): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : summaryLogsRetryBinPropertiesSerializer(item["properties"]),
  };
}

/** Properties for retrying a Summary rule bin. */
export interface SummaryLogsRetryBinProperties {
  /** The time (UTC) of the bin to retry. */
  retryBinStartTime: Date;
}

export function summaryLogsRetryBinPropertiesSerializer(item: SummaryLogsRetryBinProperties): any {
  return { retryBinStartTime: item["retryBinStartTime"].toISOString() };
}

/** The status of operation. */
export interface OperationStatus {
  /** The operation Id. */
  id?: string;
  /** The operation name. */
  name?: string;
  /** The start time of the operation. */
  startTime?: string;
  /** The end time of the operation. */
  endTime?: string;
  /** The status of the operation. */
  status?: string;
  /** The error detail of the operation if any. */
  error?: ErrorResponse;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorResponseDeserializer(item["error"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-07-01 API version. */
  V20250701 = "2025-07-01",
}

export function intelligencePackArrayDeserializer(result: Array<IntelligencePack>): any[] {
  return result.map((item) => {
    return intelligencePackDeserializer(item);
  });
}

export function availableServiceTierArrayDeserializer(result: Array<AvailableServiceTier>): any[] {
  return result.map((item) => {
    return availableServiceTierDeserializer(item);
  });
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    isDoubleEncryptionEnabled: item["isDoubleEncryptionEnabled"],
    isAvailabilityZonesEnabled: item["isAvailabilityZonesEnabled"],
    billingType: item["billingType"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : associatedWorkspaceArraySerializer(item["associatedWorkspaces"]),
    capacityReservationProperties: !item["capacityReservationProperties"]
      ? item["capacityReservationProperties"]
      : capacityReservationPropertiesSerializer(item["capacityReservationProperties"]),
    replication: !item["replication"]
      ? item["replication"]
      : clusterReplicationPropertiesSerializer(item["replication"]),
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    clusterId: item["clusterId"],
    provisioningState: item["provisioningState"],
    isDoubleEncryptionEnabled: item["isDoubleEncryptionEnabled"],
    isAvailabilityZonesEnabled: item["isAvailabilityZonesEnabled"],
    billingType: item["billingType"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    lastModifiedDate: !item["lastModifiedDate"]
      ? item["lastModifiedDate"]
      : new Date(item["lastModifiedDate"]),
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    associatedWorkspaces: !item["associatedWorkspaces"]
      ? item["associatedWorkspaces"]
      : associatedWorkspaceArrayDeserializer(item["associatedWorkspaces"]),
    capacityReservationProperties: !item["capacityReservationProperties"]
      ? item["capacityReservationProperties"]
      : capacityReservationPropertiesDeserializer(item["capacityReservationProperties"]),
    replication: !item["replication"]
      ? item["replication"]
      : clusterReplicationPropertiesDeserializer(item["replication"]),
  };
}

export function _clusterPatchPropertiesSerializer(item: ClusterPatch): any {
  return {
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    billingType: item["billingType"],
  };
}

export function _destinationMetaDataSerializer(item: Destination): any {
  return { eventHubName: item["eventHubName"] };
}

export function _destinationMetaDataDeserializer(item: any) {
  return {
    eventHubName: item["eventHubName"],
  };
}

export function _dataExportPropertiesDestinationSerializer(item: DataExportProperties): any {
  return {
    resourceId: item["resourceId"],
    metaData: !item["metaData"]
      ? item["metaData"]
      : destinationMetaDataSerializer(item["metaData"]),
  };
}

export function _dataExportPropertiesDestinationDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    type: item["type"],
    metaData: !item["metaData"]
      ? item["metaData"]
      : destinationMetaDataDeserializer(item["metaData"]),
  };
}

export function _dataExportPropertiesSerializer(item: DataExport): any {
  return {
    dataExportId: item["dataExportId"],
    tableNames: !item["tableNames"]
      ? item["tableNames"]
      : item["tableNames"].map((p: any) => {
          return p;
        }),
    destination: !item["destination"]
      ? item["destination"]
      : destinationSerializer(item["destination"]),
    enable: item["enable"],
    createdDate: item["createdDate"],
    lastModifiedDate: item["lastModifiedDate"],
  };
}

export function _dataExportPropertiesDeserializer(item: any) {
  return {
    dataExportId: item["dataExportId"],
    tableNames: !item["tableNames"]
      ? item["tableNames"]
      : item["tableNames"].map((p: any) => {
          return p;
        }),
    destination: !item["destination"]
      ? item["destination"]
      : destinationDeserializer(item["destination"]),
    enable: item["enable"],
    createdDate: item["createdDate"],
    lastModifiedDate: item["lastModifiedDate"],
  };
}

export function _workspacePropertiesSerializer(item: Workspace): any {
  return {
    sku: !item["sku"] ? item["sku"] : workspaceSkuSerializer(item["sku"]),
    retentionInDays: item["retentionInDays"],
    workspaceCapping: !item["workspaceCapping"]
      ? item["workspaceCapping"]
      : workspaceCappingSerializer(item["workspaceCapping"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    forceCmkForQuery: item["forceCmkForQuery"],
    features: !item["features"] ? item["features"] : workspaceFeaturesSerializer(item["features"]),
    defaultDataCollectionRuleResourceId: item["defaultDataCollectionRuleResourceId"],
    replication: !item["replication"]
      ? item["replication"]
      : workspaceReplicationPropertiesSerializer(item["replication"]),
    failover: !item["failover"]
      ? item["failover"]
      : workspaceFailoverPropertiesSerializer(item["failover"]),
  };
}

export function _workspacePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    customerId: item["customerId"],
    sku: !item["sku"] ? item["sku"] : workspaceSkuDeserializer(item["sku"]),
    retentionInDays: item["retentionInDays"],
    workspaceCapping: !item["workspaceCapping"]
      ? item["workspaceCapping"]
      : workspaceCappingDeserializer(item["workspaceCapping"]),
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    modifiedDate: !item["modifiedDate"] ? item["modifiedDate"] : new Date(item["modifiedDate"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    forceCmkForQuery: item["forceCmkForQuery"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["privateLinkScopedResources"]),
    features: !item["features"]
      ? item["features"]
      : workspaceFeaturesDeserializer(item["features"]),
    defaultDataCollectionRuleResourceId: item["defaultDataCollectionRuleResourceId"],
    replication: !item["replication"]
      ? item["replication"]
      : workspaceReplicationPropertiesDeserializer(item["replication"]),
    failover: !item["failover"]
      ? item["failover"]
      : workspaceFailoverPropertiesDeserializer(item["failover"]),
  };
}

export function _workspacePatchPropertiesSerializer(item: WorkspacePatch): any {
  return {
    sku: !item["sku"] ? item["sku"] : workspaceSkuSerializer(item["sku"]),
    retentionInDays: item["retentionInDays"],
    workspaceCapping: !item["workspaceCapping"]
      ? item["workspaceCapping"]
      : workspaceCappingSerializer(item["workspaceCapping"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    forceCmkForQuery: item["forceCmkForQuery"],
    features: !item["features"] ? item["features"] : workspaceFeaturesSerializer(item["features"]),
    defaultDataCollectionRuleResourceId: item["defaultDataCollectionRuleResourceId"],
    replication: !item["replication"]
      ? item["replication"]
      : workspaceReplicationPropertiesSerializer(item["replication"]),
    failover: !item["failover"]
      ? item["failover"]
      : workspaceFailoverPropertiesSerializer(item["failover"]),
  };
}

export function _workspacePatchPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    customerId: item["customerId"],
    sku: !item["sku"] ? item["sku"] : workspaceSkuDeserializer(item["sku"]),
    retentionInDays: item["retentionInDays"],
    workspaceCapping: !item["workspaceCapping"]
      ? item["workspaceCapping"]
      : workspaceCappingDeserializer(item["workspaceCapping"]),
    createdDate: !item["createdDate"] ? item["createdDate"] : new Date(item["createdDate"]),
    modifiedDate: !item["modifiedDate"] ? item["modifiedDate"] : new Date(item["modifiedDate"]),
    publicNetworkAccessForIngestion: item["publicNetworkAccessForIngestion"],
    publicNetworkAccessForQuery: item["publicNetworkAccessForQuery"],
    forceCmkForQuery: item["forceCmkForQuery"],
    privateLinkScopedResources: !item["privateLinkScopedResources"]
      ? item["privateLinkScopedResources"]
      : privateLinkScopedResourceArrayDeserializer(item["privateLinkScopedResources"]),
    features: !item["features"]
      ? item["features"]
      : workspaceFeaturesDeserializer(item["features"]),
    defaultDataCollectionRuleResourceId: item["defaultDataCollectionRuleResourceId"],
    replication: !item["replication"]
      ? item["replication"]
      : workspaceReplicationPropertiesDeserializer(item["replication"]),
    failover: !item["failover"]
      ? item["failover"]
      : workspaceFailoverPropertiesDeserializer(item["failover"]),
  };
}

export function _linkedServicePropertiesSerializer(item: LinkedService): any {
  return {
    resourceId: item["resourceId"],
    writeAccessResourceId: item["writeAccessResourceId"],
    provisioningState: item["provisioningState"],
  };
}

export function _linkedServicePropertiesDeserializer(item: any) {
  return {
    resourceId: item["resourceId"],
    writeAccessResourceId: item["writeAccessResourceId"],
    provisioningState: item["provisioningState"],
  };
}

export function _savedSearchPropertiesSerializer(item: SavedSearch): any {
  return {
    category: item["category"],
    displayName: item["displayName"],
    query: item["query"],
    functionAlias: item["functionAlias"],
    functionParameters: item["functionParameters"],
    version: item["version"],
    tags: !item["tags"] ? item["tags"] : tagArraySerializer(item["tags"]),
  };
}

export function _savedSearchPropertiesDeserializer(item: any) {
  return {
    category: item["category"],
    displayName: item["displayName"],
    query: item["query"],
    functionAlias: item["functionAlias"],
    functionParameters: item["functionParameters"],
    version: item["version"],
    tags: !item["tags"] ? item["tags"] : tagArrayDeserializer(item["tags"]),
  };
}

export function _tablePropertiesSerializer(item: Table): any {
  return {
    retentionInDays: item["retentionInDays"],
    totalRetentionInDays: item["totalRetentionInDays"],
    searchResults: !item["searchResults"]
      ? item["searchResults"]
      : searchResultsSerializer(item["searchResults"]),
    restoredLogs: !item["restoredLogs"]
      ? item["restoredLogs"]
      : restoredLogsSerializer(item["restoredLogs"]),
    plan: item["plan"],
    schema: !item["schema"] ? item["schema"] : schemaSerializer(item["schema"]),
  };
}

export function _tablePropertiesDeserializer(item: any) {
  return {
    retentionInDays: item["retentionInDays"],
    totalRetentionInDays: item["totalRetentionInDays"],
    archiveRetentionInDays: item["archiveRetentionInDays"],
    searchResults: !item["searchResults"]
      ? item["searchResults"]
      : searchResultsDeserializer(item["searchResults"]),
    restoredLogs: !item["restoredLogs"]
      ? item["restoredLogs"]
      : restoredLogsDeserializer(item["restoredLogs"]),
    resultStatistics: !item["resultStatistics"]
      ? item["resultStatistics"]
      : resultStatisticsDeserializer(item["resultStatistics"]),
    plan: item["plan"],
    lastPlanModifiedDate: item["lastPlanModifiedDate"],
    schema: !item["schema"] ? item["schema"] : schemaDeserializer(item["schema"]),
    provisioningState: item["provisioningState"],
    retentionInDaysAsDefault: item["retentionInDaysAsDefault"],
    totalRetentionInDaysAsDefault: item["totalRetentionInDaysAsDefault"],
  };
}

export function _managementGroupPropertiesDeserializer(item: any) {
  return {
    serverCount: item["serverCount"],
    isGateway: item["isGateway"],
    name: item["name"],
    id: item["id"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    dataReceived: !item["dataReceived"] ? item["dataReceived"] : new Date(item["dataReceived"]),
    version: item["version"],
    sku: item["sku"],
  };
}

export function _linkedStorageAccountsResourcePropertiesSerializer(
  item: LinkedStorageAccountsResource,
): any {
  return {
    storageAccountIds: !item["storageAccountIds"]
      ? item["storageAccountIds"]
      : item["storageAccountIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _linkedStorageAccountsResourcePropertiesDeserializer(item: any) {
  return {
    dataSourceType: item["dataSourceType"],
    storageAccountIds: !item["storageAccountIds"]
      ? item["storageAccountIds"]
      : item["storageAccountIds"].map((p: any) => {
          return p;
        }),
  };
}

export function _logAnalyticsQueryPackQueryPropertiesSerializer(
  item: LogAnalyticsQueryPackQuery,
): any {
  return {
    displayName: item["displayName"],
    description: item["description"],
    body: item["body"],
    related: !item["related"]
      ? item["related"]
      : logAnalyticsQueryPackQueryPropertiesRelatedSerializer(item["related"]),
    tags: item["tags"],
    properties: item["properties"],
  };
}

export function _logAnalyticsQueryPackQueryPropertiesDeserializer(item: any) {
  return {
    idPropertiesId: item["id"],
    displayName: item["displayName"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    author: item["author"],
    description: item["description"],
    body: item["body"],
    related: !item["related"]
      ? item["related"]
      : logAnalyticsQueryPackQueryPropertiesRelatedDeserializer(item["related"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(
          Object.entries(item["tags"]).map(([k, p]: [string, any]) => [
            k,
            p.map((p1: any) => {
              return p1;
            }),
          ]),
        ),
    properties: item["properties"],
  };
}

export function _logAnalyticsQueryPackPropertiesSerializer(_item: LogAnalyticsQueryPack): any {
  return {};
}

export function _logAnalyticsQueryPackPropertiesDeserializer(item: any) {
  return {
    queryPackId: item["queryPackId"],
    timeCreated: !item["timeCreated"] ? item["timeCreated"] : new Date(item["timeCreated"]),
    timeModified: !item["timeModified"] ? item["timeModified"] : new Date(item["timeModified"]),
    provisioningState: item["provisioningState"],
  };
}

export function _storageInsightPropertiesSerializer(item: StorageInsight): any {
  return {
    containers: !item["containers"]
      ? item["containers"]
      : item["containers"].map((p: any) => {
          return p;
        }),
    tables: !item["tables"]
      ? item["tables"]
      : item["tables"].map((p: any) => {
          return p;
        }),
    storageAccount: !item["storageAccount"]
      ? item["storageAccount"]
      : storageAccountSerializer(item["storageAccount"]),
  };
}

export function _storageInsightPropertiesDeserializer(item: any) {
  return {
    containers: !item["containers"]
      ? item["containers"]
      : item["containers"].map((p: any) => {
          return p;
        }),
    tables: !item["tables"]
      ? item["tables"]
      : item["tables"].map((p: any) => {
          return p;
        }),
    storageAccount: !item["storageAccount"]
      ? item["storageAccount"]
      : storageAccountDeserializer(item["storageAccount"]),
    status: !item["status"] ? item["status"] : storageInsightStatusDeserializer(item["status"]),
  };
}

export function _summaryLogsPropertiesSerializer(item: SummaryLogs): any {
  return {
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    ruleDefinition: !item["ruleDefinition"]
      ? item["ruleDefinition"]
      : ruleDefinitionSerializer(item["ruleDefinition"]),
  };
}

export function _summaryLogsPropertiesDeserializer(item: any) {
  return {
    ruleType: item["ruleType"],
    displayName: item["displayName"],
    description: item["description"],
    isActive: item["isActive"],
    statusCode: item["statusCode"],
    provisioningState: item["provisioningState"],
    ruleDefinition: !item["ruleDefinition"]
      ? item["ruleDefinition"]
      : ruleDefinitionDeserializer(item["ruleDefinition"]),
  };
}
