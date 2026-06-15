// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The list of available operations. */
export interface _OperationListResult {
  /** List of operations supported by the resource provider. */
  value?: Operation[];
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** Storage REST API operation definition. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
  /** The origin of operations. */
  origin?: string;
  /** One property of operation, include metric specifications. */
  serviceSpecification?: ServiceSpecification;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    ...(!item["properties"]
      ? item["properties"]
      : _operationOperationPropertiesDeserializer(item["properties"])),
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft Storage. */
  provider?: string;
  /** Resource on which the operation is performed etc. */
  resource?: string;
  /** Type of operation: get, read, delete, etc. */
  operation?: string;
  /** Description of the operation. */
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

/** Properties of operation, include metric specifications. */
export interface OperationProperties {
  /** One property of operation, include metric specifications. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** One property of operation, include metric specifications. */
export interface ServiceSpecification {
  /** Metric specifications of operation. */
  metricSpecifications?: MetricSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Metric specification of operation. */
export interface MetricSpecification {
  /** Name of metric specification. */
  name?: string;
  /** Display name of metric specification. */
  displayName?: string;
  /** Display description of metric specification. */
  displayDescription?: string;
  /** Unit could be Bytes or Count. */
  unit?: string;
  /** Dimensions of blobs, including blob type and access tier. */
  dimensions?: Dimension[];
  /** Aggregation type could be Average. */
  aggregationType?: string;
  /** The property to decide fill gap with zero or not. */
  fillGapWithZero?: boolean;
  /** The category this metric specification belong to, could be Capacity. */
  category?: string;
  /** Account Resource Id. */
  resourceIdDimensionNameOverride?: string;
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
    aggregationType: item["aggregationType"],
    fillGapWithZero: item["fillGapWithZero"],
    category: item["category"],
    resourceIdDimensionNameOverride: item["resourceIdDimensionNameOverride"],
  };
}

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** Dimension of blobs, possibly be blob type or access tier. */
export interface Dimension {
  /** Display name of dimension. */
  name?: string;
  /** Display name of dimension. */
  displayName?: string;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

/** An error response from the storage resource provider. */
export interface ErrorResponse {
  /** Azure Storage Resource Provider error response body. */
  error?: ErrorResponseBody;
}

export function errorResponseDeserializer(item: any): ErrorResponse {
  return {
    error: !item["error"] ? item["error"] : errorResponseBodyDeserializer(item["error"]),
  };
}

/** Error response body contract. */
export interface ErrorResponseBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
}

export function errorResponseBodyDeserializer(item: any): ErrorResponseBody {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Properties of the blob container, including Id, resource name, resource type, Etag. */
export interface BlobContainer extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** The version of the deleted blob container. */
  readonly version?: string;
  /** Indicates whether the blob container was deleted. */
  readonly deleted?: boolean;
  /** Blob container deletion time. */
  readonly deletedTime?: Date;
  /** Remaining retention days for soft deleted blob container. */
  readonly remainingRetentionDays?: number;
  /** Default the container to use specified encryption scope for all writes. */
  defaultEncryptionScope?: string;
  /** Block override of encryption scope from the container default. */
  denyEncryptionScopeOverride?: boolean;
  /** Specifies whether data in the container may be accessed publicly and the level of access. */
  publicAccess?: PublicAccess;
  /** Returns the date and time the container was last modified. */
  readonly lastModifiedTime?: Date;
  /** The lease status of the container. */
  readonly leaseStatus?: LeaseStatus;
  /** Lease state of the container. */
  readonly leaseState?: LeaseState;
  /** Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased. */
  readonly leaseDuration?: LeaseDuration;
  /** A name-value pair to associate with the container as metadata. */
  metadata?: Record<string, string>;
  /** The ImmutabilityPolicy property of the container. */
  readonly immutabilityPolicy?: ImmutabilityPolicyProperties;
  /** The LegalHold property of the container. */
  readonly legalHold?: LegalHoldProperties;
  /** The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account. */
  readonly hasLegalHold?: boolean;
  /** The hasImmutabilityPolicy public property is set to true by SRP if ImmutabilityPolicy has been created for this container. The hasImmutabilityPolicy public property is set to false by SRP if ImmutabilityPolicy has not been created for this container. */
  readonly hasImmutabilityPolicy?: boolean;
  /** The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process. */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioning;
  /** Enable NFSv3 root squash on blob container. */
  enableNfsV3RootSquash?: boolean;
  /** Enable NFSv3 all squash on blob container. */
  enableNfsV3AllSquash?: boolean;
}

export function blobContainerSerializer(item: BlobContainer): any {
  return {
    properties: areAllPropsUndefined(item, [
      "defaultEncryptionScope",
      "denyEncryptionScopeOverride",
      "publicAccess",
      "metadata",
      "immutableStorageWithVersioning",
      "enableNfsV3RootSquash",
      "enableNfsV3AllSquash",
    ])
      ? undefined
      : _blobContainerPropertiesSerializer(item),
  };
}

export function blobContainerDeserializer(item: any): BlobContainer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _blobContainerPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The properties of a container. */
export interface ContainerProperties {
  /** The version of the deleted blob container. */
  readonly version?: string;
  /** Indicates whether the blob container was deleted. */
  readonly deleted?: boolean;
  /** Blob container deletion time. */
  readonly deletedTime?: Date;
  /** Remaining retention days for soft deleted blob container. */
  readonly remainingRetentionDays?: number;
  /** Default the container to use specified encryption scope for all writes. */
  defaultEncryptionScope?: string;
  /** Block override of encryption scope from the container default. */
  denyEncryptionScopeOverride?: boolean;
  /** Specifies whether data in the container may be accessed publicly and the level of access. */
  publicAccess?: PublicAccess;
  /** Returns the date and time the container was last modified. */
  readonly lastModifiedTime?: Date;
  /** The lease status of the container. */
  readonly leaseStatus?: LeaseStatus;
  /** Lease state of the container. */
  readonly leaseState?: LeaseState;
  /** Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased. */
  readonly leaseDuration?: LeaseDuration;
  /** A name-value pair to associate with the container as metadata. */
  metadata?: Record<string, string>;
  /** The ImmutabilityPolicy property of the container. */
  readonly immutabilityPolicy?: ImmutabilityPolicyProperties;
  /** The LegalHold property of the container. */
  readonly legalHold?: LegalHoldProperties;
  /** The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account. */
  readonly hasLegalHold?: boolean;
  /** The hasImmutabilityPolicy public property is set to true by SRP if ImmutabilityPolicy has been created for this container. The hasImmutabilityPolicy public property is set to false by SRP if ImmutabilityPolicy has not been created for this container. */
  readonly hasImmutabilityPolicy?: boolean;
  /** The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process. */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioning;
  /** Enable NFSv3 root squash on blob container. */
  enableNfsV3RootSquash?: boolean;
  /** Enable NFSv3 all squash on blob container. */
  enableNfsV3AllSquash?: boolean;
}

export function containerPropertiesSerializer(item: ContainerProperties): any {
  return {
    defaultEncryptionScope: item["defaultEncryptionScope"],
    denyEncryptionScopeOverride: item["denyEncryptionScopeOverride"],
    publicAccess: item["publicAccess"],
    metadata: item["metadata"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageWithVersioningSerializer(item["immutableStorageWithVersioning"]),
    enableNfsV3RootSquash: item["enableNfsV3RootSquash"],
    enableNfsV3AllSquash: item["enableNfsV3AllSquash"],
  };
}

export function containerPropertiesDeserializer(item: any): ContainerProperties {
  return {
    version: item["version"],
    deleted: item["deleted"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    defaultEncryptionScope: item["defaultEncryptionScope"],
    denyEncryptionScopeOverride: item["denyEncryptionScopeOverride"],
    publicAccess: item["publicAccess"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    immutabilityPolicy: !item["immutabilityPolicy"]
      ? item["immutabilityPolicy"]
      : immutabilityPolicyPropertiesDeserializer(item["immutabilityPolicy"]),
    legalHold: !item["legalHold"]
      ? item["legalHold"]
      : legalHoldPropertiesDeserializer(item["legalHold"]),
    hasLegalHold: item["hasLegalHold"],
    hasImmutabilityPolicy: item["hasImmutabilityPolicy"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageWithVersioningDeserializer(item["immutableStorageWithVersioning"]),
    enableNfsV3RootSquash: item["enableNfsV3RootSquash"],
    enableNfsV3AllSquash: item["enableNfsV3AllSquash"],
  };
}

/** Specifies whether data in the container may be accessed publicly and the level of access. */
export type PublicAccess = "Container" | "Blob" | "None";

/** The lease status of the container. */
export enum KnownLeaseStatus {
  /** Locked */
  Locked = "Locked",
  /** Unlocked */
  Unlocked = "Unlocked",
}

/**
 * The lease status of the container. \
 * {@link KnownLeaseStatus} can be used interchangeably with LeaseStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Locked** \
 * **Unlocked**
 */
export type LeaseStatus = string;

/** Lease state of the container. */
export enum KnownLeaseState {
  /** Available */
  Available = "Available",
  /** Leased */
  Leased = "Leased",
  /** Expired */
  Expired = "Expired",
  /** Breaking */
  Breaking = "Breaking",
  /** Broken */
  Broken = "Broken",
}

/**
 * Lease state of the container. \
 * {@link KnownLeaseState} can be used interchangeably with LeaseState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Available** \
 * **Leased** \
 * **Expired** \
 * **Breaking** \
 * **Broken**
 */
export type LeaseState = string;

/** Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased. */
export enum KnownLeaseDuration {
  /** Infinite */
  Infinite = "Infinite",
  /** Fixed */
  Fixed = "Fixed",
}

/**
 * Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased. \
 * {@link KnownLeaseDuration} can be used interchangeably with LeaseDuration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Infinite** \
 * **Fixed**
 */
export type LeaseDuration = string;

/** The properties of an ImmutabilityPolicy of a blob container. */
export interface ImmutabilityPolicyProperties {
  /** ImmutabilityPolicy Etag. */
  readonly etag?: string;
  /** The ImmutabilityPolicy update history of the blob container. */
  readonly updateHistory?: UpdateHistoryProperty[];
  /** The immutability period for the blobs in the container since the policy creation, in days. */
  immutabilityPeriodSinceCreationInDays?: number;
  /** The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked. */
  readonly state?: ImmutabilityPolicyState;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. */
  allowProtectedAppendWrites?: boolean;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive. */
  allowProtectedAppendWritesAll?: boolean;
}

export function immutabilityPolicyPropertiesDeserializer(item: any): ImmutabilityPolicyProperties {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _immutabilityPolicyPropertiesPropertiesDeserializer(item["properties"])),
    etag: item["etag"],
    updateHistory: !item["updateHistory"]
      ? item["updateHistory"]
      : updateHistoryPropertyArrayDeserializer(item["updateHistory"]),
  };
}

/** The properties of an ImmutabilityPolicy of a blob container. */
export interface ImmutabilityPolicyProperty {
  /** The immutability period for the blobs in the container since the policy creation, in days. */
  immutabilityPeriodSinceCreationInDays?: number;
  /** The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked. */
  readonly state?: ImmutabilityPolicyState;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. */
  allowProtectedAppendWrites?: boolean;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive. */
  allowProtectedAppendWritesAll?: boolean;
}

export function immutabilityPolicyPropertySerializer(item: ImmutabilityPolicyProperty): any {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

export function immutabilityPolicyPropertyDeserializer(item: any): ImmutabilityPolicyProperty {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    state: item["state"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

/** The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked. */
export enum KnownImmutabilityPolicyState {
  /** Locked */
  Locked = "Locked",
  /** Unlocked */
  Unlocked = "Unlocked",
}

/**
 * The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked. \
 * {@link KnownImmutabilityPolicyState} can be used interchangeably with ImmutabilityPolicyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Locked** \
 * **Unlocked**
 */
export type ImmutabilityPolicyState = string;

export function updateHistoryPropertyArrayDeserializer(
  result: Array<UpdateHistoryProperty>,
): any[] {
  return result.map((item) => {
    return updateHistoryPropertyDeserializer(item);
  });
}

/** An update history of the ImmutabilityPolicy of a blob container. */
export interface UpdateHistoryProperty {
  /** The ImmutabilityPolicy update type of a blob container, possible values include: put, lock and extend. */
  readonly update?: ImmutabilityPolicyUpdateType;
  /** The immutability period for the blobs in the container since the policy creation, in days. */
  readonly immutabilityPeriodSinceCreationInDays?: number;
  /** Returns the date and time the ImmutabilityPolicy was updated. */
  readonly timestamp?: Date;
  /** Returns the Object ID of the user who updated the ImmutabilityPolicy. */
  readonly objectIdentifier?: string;
  /** Returns the Tenant ID that issued the token for the user who updated the ImmutabilityPolicy. */
  readonly tenantId?: string;
  /** Returns the User Principal Name of the user who updated the ImmutabilityPolicy. */
  readonly upn?: string;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. */
  allowProtectedAppendWrites?: boolean;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive. */
  allowProtectedAppendWritesAll?: boolean;
}

export function updateHistoryPropertyDeserializer(item: any): UpdateHistoryProperty {
  return {
    update: item["update"],
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    objectIdentifier: item["objectIdentifier"],
    tenantId: item["tenantId"],
    upn: item["upn"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

/** The ImmutabilityPolicy update type of a blob container, possible values include: put, lock and extend. */
export enum KnownImmutabilityPolicyUpdateType {
  /** put */
  Put = "put",
  /** lock */
  Lock = "lock",
  /** extend */
  Extend = "extend",
}

/**
 * The ImmutabilityPolicy update type of a blob container, possible values include: put, lock and extend. \
 * {@link KnownImmutabilityPolicyUpdateType} can be used interchangeably with ImmutabilityPolicyUpdateType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **put** \
 * **lock** \
 * **extend**
 */
export type ImmutabilityPolicyUpdateType = string;

/** The LegalHold property of a blob container. */
export interface LegalHoldProperties {
  /** The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account. */
  readonly hasLegalHold?: boolean;
  /** The list of LegalHold tags of a blob container. */
  tags?: TagProperty[];
  /** Protected append blob writes history. */
  protectedAppendWritesHistory?: ProtectedAppendWritesHistory;
}

export function legalHoldPropertiesDeserializer(item: any): LegalHoldProperties {
  return {
    hasLegalHold: item["hasLegalHold"],
    tags: !item["tags"] ? item["tags"] : tagPropertyArrayDeserializer(item["tags"]),
    protectedAppendWritesHistory: !item["protectedAppendWritesHistory"]
      ? item["protectedAppendWritesHistory"]
      : protectedAppendWritesHistoryDeserializer(item["protectedAppendWritesHistory"]),
  };
}

export function tagPropertyArrayDeserializer(result: Array<TagProperty>): any[] {
  return result.map((item) => {
    return tagPropertyDeserializer(item);
  });
}

/** A tag of the LegalHold of a blob container. */
export interface TagProperty {
  /** The tag value. */
  readonly tag?: string;
  /** Returns the date and time the tag was added. */
  readonly timestamp?: Date;
  /** Returns the Object ID of the user who added the tag. */
  readonly objectIdentifier?: string;
  /** Returns the Tenant ID that issued the token for the user who added the tag. */
  readonly tenantId?: string;
  /** Returns the User Principal Name of the user who added the tag. */
  readonly upn?: string;
}

export function tagPropertyDeserializer(item: any): TagProperty {
  return {
    tag: item["tag"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    objectIdentifier: item["objectIdentifier"],
    tenantId: item["tenantId"],
    upn: item["upn"],
  };
}

/** Protected append writes history setting for the blob container with Legal holds. */
export interface ProtectedAppendWritesHistory {
  /** When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining legal hold protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. */
  allowProtectedAppendWritesAll?: boolean;
  /** Returns the date and time the tag was added. */
  readonly timestamp?: Date;
}

export function protectedAppendWritesHistoryDeserializer(item: any): ProtectedAppendWritesHistory {
  return {
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** Object level immutability properties of the container. */
export interface ImmutableStorageWithVersioning {
  /** This is an immutable property, when set to true it enables object level immutability at the container level. */
  enabled?: boolean;
  /** Returns the date and time the object level immutability was enabled. */
  readonly timeStamp?: Date;
  /** This property denotes the container level immutability to object level immutability migration state. */
  readonly migrationState?: MigrationState;
}

export function immutableStorageWithVersioningSerializer(
  item: ImmutableStorageWithVersioning,
): any {
  return { enabled: item["enabled"] };
}

export function immutableStorageWithVersioningDeserializer(
  item: any,
): ImmutableStorageWithVersioning {
  return {
    enabled: item["enabled"],
    timeStamp: !item["timeStamp"] ? item["timeStamp"] : new Date(item["timeStamp"]),
    migrationState: item["migrationState"],
  };
}

/** This property denotes the container level immutability to object level immutability migration state. */
export enum KnownMigrationState {
  /** InProgress */
  InProgress = "InProgress",
  /** Completed */
  Completed = "Completed",
}

/**
 * This property denotes the container level immutability to object level immutability migration state. \
 * {@link KnownMigrationState} can be used interchangeably with MigrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Completed**
 */
export type MigrationState = string;

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

/** The LegalHold property of a blob container. */
export interface LegalHold {
  /** The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account. */
  readonly hasLegalHold?: boolean;
  /** Each tag should be 3 to 23 alphanumeric characters and is normalized to lower case at SRP. */
  tags: string[];
  /** When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining legal hold protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. */
  allowProtectedAppendWritesAll?: boolean;
}

export function legalHoldSerializer(item: LegalHold): any {
  return {
    tags: item["tags"].map((p: any) => {
      return p;
    }),
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

export function legalHoldDeserializer(item: any): LegalHold {
  return {
    hasLegalHold: item["hasLegalHold"],
    tags: item["tags"].map((p: any) => {
      return p;
    }),
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

/** Lease Container request schema. */
export interface LeaseContainerRequest {
  /** Specifies the lease action. Can be one of the available actions. */
  action: LeaseContainerRequestAction;
  /** Identifies the lease. Can be specified in any valid GUID string format. */
  leaseId?: string;
  /** Optional. For a break action, proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. */
  breakPeriod?: number;
  /** Required for acquire. Specifies the duration of the lease, in seconds, or negative one (-1) for a lease that never expires. */
  leaseDuration?: number;
  /** Optional for acquire, required for change. Proposed lease ID, in a GUID string format. */
  proposedLeaseId?: string;
}

export function leaseContainerRequestSerializer(item: LeaseContainerRequest): any {
  return {
    action: item["action"],
    leaseId: item["leaseId"],
    breakPeriod: item["breakPeriod"],
    leaseDuration: item["leaseDuration"],
    proposedLeaseId: item["proposedLeaseId"],
  };
}

/** Specifies the lease action. Can be one of the available actions. */
export enum KnownLeaseContainerRequestAction {
  /** Acquire */
  Acquire = "Acquire",
  /** Renew */
  Renew = "Renew",
  /** Change */
  Change = "Change",
  /** Release */
  Release = "Release",
  /** Break */
  Break = "Break",
}

/**
 * Specifies the lease action. Can be one of the available actions. \
 * {@link KnownLeaseContainerRequestAction} can be used interchangeably with LeaseContainerRequestAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Acquire** \
 * **Renew** \
 * **Change** \
 * **Release** \
 * **Break**
 */
export type LeaseContainerRequestAction = string;

/** Lease Container response schema. */
export interface LeaseContainerResponse {
  /** Returned unique lease ID that must be included with any request to delete the container, or to renew, change, or release the lease. */
  leaseId?: string;
  /** Approximate time remaining in the lease period, in seconds. */
  leaseTimeSeconds?: string;
}

export function leaseContainerResponseDeserializer(item: any): LeaseContainerResponse {
  return {
    leaseId: item["leaseId"],
    leaseTimeSeconds: item["leaseTimeSeconds"],
  };
}

/** An error response from the Storage service. */
export interface CloudError {
  /** An error response from the Storage service. */
  error?: CloudErrorBody;
}

export function cloudErrorDeserializer(item: any): CloudError {
  return {
    error: !item["error"] ? item["error"] : cloudErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the Storage service. */
export interface CloudErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: CloudErrorBody[];
}

export function cloudErrorBodyDeserializer(item: any): CloudErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"] ? item["details"] : cloudErrorBodyArrayDeserializer(item["details"]),
  };
}

export function cloudErrorBodyArrayDeserializer(result: Array<CloudErrorBody>): any[] {
  return result.map((item) => {
    return cloudErrorBodyDeserializer(item);
  });
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

/** Response schema. Contains list of blobs returned, and if paging is requested or required, a URL to next page of containers. */
export interface _ListContainerItems {
  /** The ListContainerItem items on this page */
  readonly value: ListContainerItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listContainerItemsDeserializer(item: any): _ListContainerItems {
  return {
    value: listContainerItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function listContainerItemArrayDeserializer(result: Array<ListContainerItem>): any[] {
  return result.map((item) => {
    return listContainerItemDeserializer(item);
  });
}

/** The blob container properties be listed out. */
export interface ListContainerItem extends AzureEntityResource {
  /** The version of the deleted blob container. */
  readonly version?: string;
  /** Indicates whether the blob container was deleted. */
  readonly deleted?: boolean;
  /** Blob container deletion time. */
  readonly deletedTime?: Date;
  /** Remaining retention days for soft deleted blob container. */
  readonly remainingRetentionDays?: number;
  /** Default the container to use specified encryption scope for all writes. */
  defaultEncryptionScope?: string;
  /** Block override of encryption scope from the container default. */
  denyEncryptionScopeOverride?: boolean;
  /** Specifies whether data in the container may be accessed publicly and the level of access. */
  publicAccess?: PublicAccess;
  /** Returns the date and time the container was last modified. */
  readonly lastModifiedTime?: Date;
  /** The lease status of the container. */
  readonly leaseStatus?: LeaseStatus;
  /** Lease state of the container. */
  readonly leaseState?: LeaseState;
  /** Specifies whether the lease on a container is of infinite or fixed duration, only when the container is leased. */
  readonly leaseDuration?: LeaseDuration;
  /** A name-value pair to associate with the container as metadata. */
  metadata?: Record<string, string>;
  /** The ImmutabilityPolicy property of the container. */
  readonly immutabilityPolicy?: ImmutabilityPolicyProperties;
  /** The LegalHold property of the container. */
  readonly legalHold?: LegalHoldProperties;
  /** The hasLegalHold public property is set to true by SRP if there are at least one existing tag. The hasLegalHold public property is set to false by SRP if all existing legal hold tags are cleared out. There can be a maximum of 1000 blob containers with hasLegalHold=true for a given account. */
  readonly hasLegalHold?: boolean;
  /** The hasImmutabilityPolicy public property is set to true by SRP if ImmutabilityPolicy has been created for this container. The hasImmutabilityPolicy public property is set to false by SRP if ImmutabilityPolicy has not been created for this container. */
  readonly hasImmutabilityPolicy?: boolean;
  /** The object level immutability property of the container. The property is immutable and can only be set to true at the container creation time. Existing containers must undergo a migration process. */
  immutableStorageWithVersioning?: ImmutableStorageWithVersioning;
  /** Enable NFSv3 root squash on blob container. */
  enableNfsV3RootSquash?: boolean;
  /** Enable NFSv3 all squash on blob container. */
  enableNfsV3AllSquash?: boolean;
}

export function listContainerItemDeserializer(item: any): ListContainerItem {
  return {
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _listContainerItemPropertiesDeserializer(item["properties"])),
  };
}

/** The resource model definition for an Azure Resource Manager resource with an etag. */
export interface AzureEntityResource extends Resource {
  /** Resource Etag. */
  readonly etag?: string;
}

export function azureEntityResourceDeserializer(item: any): AzureEntityResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    etag: item["etag"],
  };
}

/** The ImmutabilityPolicy property of a blob container, including Id, resource name, resource type, Etag. */
export interface ImmutabilityPolicy extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** The immutability period for the blobs in the container since the policy creation, in days. */
  immutabilityPeriodSinceCreationInDays?: number;
  /** The ImmutabilityPolicy state of a blob container, possible values include: Locked and Unlocked. */
  readonly state?: ImmutabilityPolicyState;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. */
  allowProtectedAppendWrites?: boolean;
  /** This property can only be changed for unlocked time-based retention policies. When enabled, new blocks can be written to both 'Append and Bock Blobs' while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. This property cannot be changed with ExtendImmutabilityPolicy API. The 'allowProtectedAppendWrites' and 'allowProtectedAppendWritesAll' properties are mutually exclusive. */
  allowProtectedAppendWritesAll?: boolean;
}

export function immutabilityPolicySerializer(item: ImmutabilityPolicy): any {
  return { properties: _immutabilityPolicyPropertiesSerializer(item) };
}

export function immutabilityPolicyDeserializer(item: any): ImmutabilityPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._immutabilityPolicyPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** The properties of a storage account’s Blob service. */
export interface BlobServiceProperties extends ProxyResource {
  /** Sku name and tier. */
  readonly sku?: Sku;
  /** Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service. */
  cors?: CorsRules;
  /** DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions. */
  defaultServiceVersion?: string;
  /** The blob service properties for blob soft delete. */
  deleteRetentionPolicy?: DeleteRetentionPolicy;
  /** The static website properties for blob storage. */
  staticWebsite?: StaticWebsite;
  /** Versioning is enabled if set to true. */
  isVersioningEnabled?: boolean;
  /** Deprecated in favor of isVersioningEnabled property. */
  automaticSnapshotPolicyEnabled?: boolean;
  /** The blob service properties for change feed events. */
  changeFeed?: ChangeFeed;
  /** The blob service properties for blob restore policy. */
  restorePolicy?: RestorePolicyProperties;
  /** The blob service properties for container soft delete. */
  containerDeleteRetentionPolicy?: DeleteRetentionPolicy;
  /** The blob service property to configure last access time based tracking policy. */
  lastAccessTimeTrackingPolicy?: LastAccessTimeTrackingPolicy;
}

export function blobServicePropertiesSerializer(item: BlobServiceProperties): any {
  return {
    properties: areAllPropsUndefined(item, [
      "cors",
      "defaultServiceVersion",
      "deleteRetentionPolicy",
      "staticWebsite",
      "isVersioningEnabled",
      "automaticSnapshotPolicyEnabled",
      "changeFeed",
      "restorePolicy",
      "containerDeleteRetentionPolicy",
      "lastAccessTimeTrackingPolicy",
    ])
      ? undefined
      : _blobServicePropertiesPropertiesSerializer(item),
  };
}

export function blobServicePropertiesDeserializer(item: any): BlobServiceProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _blobServicePropertiesPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The properties of a storage account’s Blob service. */
export interface BlobServicePropertiesProperties {
  /** Specifies CORS rules for the Blob service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Blob service. */
  cors?: CorsRules;
  /** DefaultServiceVersion indicates the default version to use for requests to the Blob service if an incoming request’s version is not specified. Possible values include version 2008-10-27 and all more recent versions. */
  defaultServiceVersion?: string;
  /** The blob service properties for blob soft delete. */
  deleteRetentionPolicy?: DeleteRetentionPolicy;
  /** The static website properties for blob storage. */
  staticWebsite?: StaticWebsite;
  /** Versioning is enabled if set to true. */
  isVersioningEnabled?: boolean;
  /** Deprecated in favor of isVersioningEnabled property. */
  automaticSnapshotPolicyEnabled?: boolean;
  /** The blob service properties for change feed events. */
  changeFeed?: ChangeFeed;
  /** The blob service properties for blob restore policy. */
  restorePolicy?: RestorePolicyProperties;
  /** The blob service properties for container soft delete. */
  containerDeleteRetentionPolicy?: DeleteRetentionPolicy;
  /** The blob service property to configure last access time based tracking policy. */
  lastAccessTimeTrackingPolicy?: LastAccessTimeTrackingPolicy;
}

export function blobServicePropertiesPropertiesSerializer(
  item: BlobServicePropertiesProperties,
): any {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteSerializer(item["staticWebsite"]),
    isVersioningEnabled: item["isVersioningEnabled"],
    automaticSnapshotPolicyEnabled: item["automaticSnapshotPolicyEnabled"],
    changeFeed: !item["changeFeed"] ? item["changeFeed"] : changeFeedSerializer(item["changeFeed"]),
    restorePolicy: !item["restorePolicy"]
      ? item["restorePolicy"]
      : restorePolicyPropertiesSerializer(item["restorePolicy"]),
    containerDeleteRetentionPolicy: !item["containerDeleteRetentionPolicy"]
      ? item["containerDeleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["containerDeleteRetentionPolicy"]),
    lastAccessTimeTrackingPolicy: !item["lastAccessTimeTrackingPolicy"]
      ? item["lastAccessTimeTrackingPolicy"]
      : lastAccessTimeTrackingPolicySerializer(item["lastAccessTimeTrackingPolicy"]),
  };
}

export function blobServicePropertiesPropertiesDeserializer(
  item: any,
): BlobServicePropertiesProperties {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteDeserializer(item["staticWebsite"]),
    isVersioningEnabled: item["isVersioningEnabled"],
    automaticSnapshotPolicyEnabled: item["automaticSnapshotPolicyEnabled"],
    changeFeed: !item["changeFeed"]
      ? item["changeFeed"]
      : changeFeedDeserializer(item["changeFeed"]),
    restorePolicy: !item["restorePolicy"]
      ? item["restorePolicy"]
      : restorePolicyPropertiesDeserializer(item["restorePolicy"]),
    containerDeleteRetentionPolicy: !item["containerDeleteRetentionPolicy"]
      ? item["containerDeleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["containerDeleteRetentionPolicy"]),
    lastAccessTimeTrackingPolicy: !item["lastAccessTimeTrackingPolicy"]
      ? item["lastAccessTimeTrackingPolicy"]
      : lastAccessTimeTrackingPolicyDeserializer(item["lastAccessTimeTrackingPolicy"]),
  };
}

/** Sets the CORS rules. You can include up to five CorsRule elements in the request. */
export interface CorsRules {
  /** The List of CORS rules. You can include up to five CorsRule elements in the request. */
  corsRules?: CorsRule[];
}

export function corsRulesSerializer(item: CorsRules): any {
  return {
    corsRules: !item["corsRules"] ? item["corsRules"] : corsRuleArraySerializer(item["corsRules"]),
  };
}

export function corsRulesDeserializer(item: any): CorsRules {
  return {
    corsRules: !item["corsRules"]
      ? item["corsRules"]
      : corsRuleArrayDeserializer(item["corsRules"]),
  };
}

export function corsRuleArraySerializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleSerializer(item);
  });
}

export function corsRuleArrayDeserializer(result: Array<CorsRule>): any[] {
  return result.map((item) => {
    return corsRuleDeserializer(item);
  });
}

/** Specifies a CORS rule for the Blob service. */
export interface CorsRule {
  /** Required if CorsRule element is present. A list of origin domains that will be allowed via CORS, or "*" to allow all domains */
  allowedOrigins: string[];
  /** Required if CorsRule element is present. A list of HTTP methods that are allowed to be executed by the origin. */
  allowedMethods: AllowedMethods[];
  /** Required if CorsRule element is present. The number of seconds that the client/browser should cache a preflight response. */
  maxAgeInSeconds: number;
  /** Required if CorsRule element is present. A list of response headers to expose to CORS clients. */
  exposedHeaders: string[];
  /** Required if CorsRule element is present. A list of headers allowed to be part of the cross-origin request. */
  allowedHeaders: string[];
}

export function corsRuleSerializer(item: CorsRule): any {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
    allowedMethods: item["allowedMethods"].map((p: any) => {
      return p;
    }),
    maxAgeInSeconds: item["maxAgeInSeconds"],
    exposedHeaders: item["exposedHeaders"].map((p: any) => {
      return p;
    }),
    allowedHeaders: item["allowedHeaders"].map((p: any) => {
      return p;
    }),
  };
}

export function corsRuleDeserializer(item: any): CorsRule {
  return {
    allowedOrigins: item["allowedOrigins"].map((p: any) => {
      return p;
    }),
    allowedMethods: item["allowedMethods"].map((p: any) => {
      return p;
    }),
    maxAgeInSeconds: item["maxAgeInSeconds"],
    exposedHeaders: item["exposedHeaders"].map((p: any) => {
      return p;
    }),
    allowedHeaders: item["allowedHeaders"].map((p: any) => {
      return p;
    }),
  };
}

/** Known values of {@link AllowedMethods} that the service accepts. */
export enum KnownAllowedMethods {
  /** DELETE */
  Delete = "DELETE",
  /** GET */
  GET = "GET",
  /** HEAD */
  Head = "HEAD",
  /** MERGE */
  Merge = "MERGE",
  /** POST */
  Post = "POST",
  /** OPTIONS */
  Options = "OPTIONS",
  /** PUT */
  PUT = "PUT",
  /** PATCH */
  Patch = "PATCH",
  /** CONNECT */
  Connect = "CONNECT",
  /** TRACE */
  Trace = "TRACE",
}

/** Type of AllowedMethods */
export type AllowedMethods = string;

/** The service properties for soft delete. */
export interface DeleteRetentionPolicy {
  /** Indicates whether DeleteRetentionPolicy is enabled. */
  enabled?: boolean;
  /** Indicates the number of days that the deleted item should be retained. The minimum specified value can be 1 and the maximum value can be 365. */
  days?: number;
  /** This property when set to true allows deletion of the soft deleted blob versions and snapshots. This property cannot be used blob restore policy. This property only applies to blob service and does not apply to containers or file share. */
  allowPermanentDelete?: boolean;
}

export function deleteRetentionPolicySerializer(item: DeleteRetentionPolicy): any {
  return {
    enabled: item["enabled"],
    days: item["days"],
    allowPermanentDelete: item["allowPermanentDelete"],
  };
}

export function deleteRetentionPolicyDeserializer(item: any): DeleteRetentionPolicy {
  return {
    enabled: item["enabled"],
    days: item["days"],
    allowPermanentDelete: item["allowPermanentDelete"],
  };
}

/** The static website properties for blob storage. */
export interface StaticWebsite {
  /** Indicates whether static website support is enabled for the specified account. */
  enabled: boolean;
  /** The webpage that Azure Storage serves for requests to the root of a website or any subfolder (for example, index.html). The value is case-sensitive. */
  indexDocument?: string;
  /** The absolute path where the default index file is present. This absolute path is mutually exclusive to "indexDocument" and it is case-sensitive. */
  defaultIndexDocumentPath?: string;
  /** The absolute path to a webpage that Azure Storage serves for requests that don't correspond to an existing file. The contents of the page are returned with HTTP 404 Not Found. Only a single custom 404 page is supported in each static website. */
  errorDocument404Path?: string;
}

export function staticWebsiteSerializer(item: StaticWebsite): any {
  return {
    enabled: item["enabled"],
    indexDocument: item["indexDocument"],
    defaultIndexDocumentPath: item["defaultIndexDocumentPath"],
    errorDocument404Path: item["errorDocument404Path"],
  };
}

export function staticWebsiteDeserializer(item: any): StaticWebsite {
  return {
    enabled: item["enabled"],
    indexDocument: item["indexDocument"],
    defaultIndexDocumentPath: item["defaultIndexDocumentPath"],
    errorDocument404Path: item["errorDocument404Path"],
  };
}

/** The blob service properties for change feed events. */
export interface ChangeFeed {
  /** Indicates whether change feed event logging is enabled for the Blob service. */
  enabled?: boolean;
  /** Indicates the duration of changeFeed retention in days. Minimum value is 1 day and maximum value is 146000 days (400 years). A null value indicates an infinite retention of the change feed. */
  retentionInDays?: number;
}

export function changeFeedSerializer(item: ChangeFeed): any {
  return { enabled: item["enabled"], retentionInDays: item["retentionInDays"] };
}

export function changeFeedDeserializer(item: any): ChangeFeed {
  return {
    enabled: item["enabled"],
    retentionInDays: item["retentionInDays"],
  };
}

/** The blob service properties for blob restore policy */
export interface RestorePolicyProperties {
  /** Blob restore is enabled if set to true. */
  enabled: boolean;
  /** how long this blob can be restored. It should be great than zero and less than DeleteRetentionPolicy.days. */
  days?: number;
  /** Deprecated in favor of minRestoreTime property. */
  readonly lastEnabledTime?: Date;
  /** Returns the minimum date and time that the restore can be started. */
  readonly minRestoreTime?: Date;
}

export function restorePolicyPropertiesSerializer(item: RestorePolicyProperties): any {
  return { enabled: item["enabled"], days: item["days"] };
}

export function restorePolicyPropertiesDeserializer(item: any): RestorePolicyProperties {
  return {
    enabled: item["enabled"],
    days: item["days"],
    lastEnabledTime: !item["lastEnabledTime"]
      ? item["lastEnabledTime"]
      : new Date(item["lastEnabledTime"]),
    minRestoreTime: !item["minRestoreTime"]
      ? item["minRestoreTime"]
      : new Date(item["minRestoreTime"]),
  };
}

/** The blob service properties for Last access time based tracking policy. */
export interface LastAccessTimeTrackingPolicy {
  /** When set to true last access time based tracking is enabled. */
  enable: boolean;
  /** Name of the policy. The valid value is AccessTimeTracking. This field is currently read only */
  name?: Name;
  /** The field specifies blob object tracking granularity in days, typically how often the blob object should be tracked.This field is currently read only with value as 1 */
  trackingGranularityInDays?: number;
  /** An array of predefined supported blob types. Only blockBlob is the supported value. This field is currently read only */
  blobType?: string[];
}

export function lastAccessTimeTrackingPolicySerializer(item: LastAccessTimeTrackingPolicy): any {
  return {
    enable: item["enable"],
    name: item["name"],
    trackingGranularityInDays: item["trackingGranularityInDays"],
    blobType: !item["blobType"]
      ? item["blobType"]
      : item["blobType"].map((p: any) => {
          return p;
        }),
  };
}

export function lastAccessTimeTrackingPolicyDeserializer(item: any): LastAccessTimeTrackingPolicy {
  return {
    enable: item["enable"],
    name: item["name"],
    trackingGranularityInDays: item["trackingGranularityInDays"],
    blobType: !item["blobType"]
      ? item["blobType"]
      : item["blobType"].map((p: any) => {
          return p;
        }),
  };
}

/** Name of the policy. The valid value is AccessTimeTracking. This field is currently read only */
export enum KnownName {
  /** AccessTimeTracking */
  AccessTimeTracking = "AccessTimeTracking",
}

/**
 * Name of the policy. The valid value is AccessTimeTracking. This field is currently read only \
 * {@link KnownName} can be used interchangeably with Name,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AccessTimeTracking**
 */
export type Name = string;

/** The SKU of the storage account. */
export interface Sku {
  /** The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType. */
  name: SkuName;
  /** The SKU tier. This is based on the SKU name. */
  readonly tier?: SkuTier;
}

export function skuSerializer(item: Sku): any {
  return { name: item["name"] };
}

export function skuDeserializer(item: any): Sku {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType. */
export enum KnownSkuName {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Standard_GRS */
  StandardGRS = "Standard_GRS",
  /** Standard_RAGRS */
  StandardRagrs = "Standard_RAGRS",
  /** Standard_ZRS */
  StandardZRS = "Standard_ZRS",
  /** Premium_LRS */
  PremiumLRS = "Premium_LRS",
  /** Premium_ZRS */
  PremiumZRS = "Premium_ZRS",
  /** Standard_GZRS */
  StandardGzrs = "Standard_GZRS",
  /** Standard_RAGZRS */
  StandardRagzrs = "Standard_RAGZRS",
  /** StandardV2_LRS */
  StandardV2LRS = "StandardV2_LRS",
  /** StandardV2_GRS */
  StandardV2GRS = "StandardV2_GRS",
  /** StandardV2_ZRS */
  StandardV2ZRS = "StandardV2_ZRS",
  /** StandardV2_GZRS */
  StandardV2Gzrs = "StandardV2_GZRS",
  /** PremiumV2_LRS */
  PremiumV2LRS = "PremiumV2_LRS",
  /** PremiumV2_ZRS */
  PremiumV2ZRS = "PremiumV2_ZRS",
}

/**
 * The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType. \
 * {@link KnownSkuName} can be used interchangeably with SkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS** \
 * **Standard_GRS** \
 * **Standard_RAGRS** \
 * **Standard_ZRS** \
 * **Premium_LRS** \
 * **Premium_ZRS** \
 * **Standard_GZRS** \
 * **Standard_RAGZRS** \
 * **StandardV2_LRS** \
 * **StandardV2_GRS** \
 * **StandardV2_ZRS** \
 * **StandardV2_GZRS** \
 * **PremiumV2_LRS** \
 * **PremiumV2_ZRS**
 */
export type SkuName = string;
/** The SKU tier. This is based on the SKU name. */
export type SkuTier = "Standard" | "Premium";

/** model interface _BlobServiceItems */
export interface _BlobServiceItems {
  /** List of blob services returned. */
  readonly value?: BlobServiceProperties[];
  nextLink?: string;
}

export function _blobServiceItemsDeserializer(item: any): _BlobServiceItems {
  return {
    value: !item["value"] ? item["value"] : blobServicePropertiesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function blobServicePropertiesArraySerializer(result: Array<BlobServiceProperties>): any[] {
  return result.map((item) => {
    return blobServicePropertiesSerializer(item);
  });
}

export function blobServicePropertiesArrayDeserializer(
  result: Array<BlobServiceProperties>,
): any[] {
  return result.map((item) => {
    return blobServicePropertiesDeserializer(item);
  });
}

/** The parameters used to check the availability of the storage account name. */
export interface StorageAccountCheckNameAvailabilityParameters {
  /** The storage account name. */
  name: string;
  /** The type of resource, Microsoft.Storage/storageAccounts */
  type: "Microsoft.Storage/storageAccounts";
}

export function storageAccountCheckNameAvailabilityParametersSerializer(
  item: StorageAccountCheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The CheckNameAvailability operation response. */
export interface CheckNameAvailabilityResult {
  /** Gets a boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or is invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** Gets the reason that a storage account name could not be used. The Reason element is only returned if NameAvailable is false. */
  readonly reason?: Reason;
  /** Gets an error message explaining the Reason value in more detail. */
  readonly message?: string;
}

export function checkNameAvailabilityResultDeserializer(item: any): CheckNameAvailabilityResult {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** Gets the reason that a storage account name could not be used. The Reason element is only returned if NameAvailable is false. */
export type Reason = "AccountNameInvalid" | "AlreadyExists";

/** The storage account. */
export interface StorageAccount extends TrackedResource {
  /** Gets the SKU. */
  readonly sku?: Sku;
  /** Gets the Kind. */
  readonly kind?: Kind;
  /** The identity of the resource. */
  identity?: Identity;
  /** The extendedLocation of the resource. */
  extendedLocation?: ExtendedLocation;
  /** The availability zones. */
  zones?: string[];
  /** Optional. Gets or sets the zonal placement details for the storage account. */
  placement?: Placement;
  /** Gets the status of the storage account at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object. Note that Standard_ZRS and Premium_LRS accounts only return the blob endpoint. */
  readonly primaryEndpoints?: Endpoints;
  /** Gets the location of the primary data center for the storage account. */
  readonly primaryLocation?: string;
  /** Gets the status indicating whether the primary location of the storage account is available or unavailable. */
  readonly statusOfPrimary?: AccountStatus;
  /** Gets the timestamp of the most recent instance of a failover to the secondary location. Only the most recent timestamp is retained. This element is not returned if there has never been a failover instance. Only available if the accountType is Standard_GRS or Standard_RAGRS. */
  readonly lastGeoFailoverTime?: Date;
  /** Gets the location of the geo-replicated secondary for the storage account. Only available if the accountType is Standard_GRS or Standard_RAGRS. */
  readonly secondaryLocation?: string;
  /** Gets the status indicating whether the secondary location of the storage account is available or unavailable. Only available if the SKU name is Standard_GRS or Standard_RAGRS. */
  readonly statusOfSecondary?: AccountStatus;
  /** Gets the creation date and time of the storage account in UTC. */
  readonly creationTime?: Date;
  /** Gets the custom domain the user assigned to this storage account. */
  readonly customDomain?: CustomDomain;
  /** SasPolicy assigned to the storage account. */
  readonly sasPolicy?: SasPolicy;
  /** KeyPolicy assigned to the storage account. */
  readonly keyPolicy?: KeyPolicy;
  /** Storage account keys creation time. */
  readonly keyCreationTime?: KeyCreationTime;
  /** Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object from the secondary location of the storage account. Only available if the SKU name is Standard_RAGRS. */
  readonly secondaryEndpoints?: Endpoints;
  /** Encryption settings to be used for server-side encryption for the storage account. */
  readonly encryption?: Encryption;
  /** Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. */
  readonly accessTier?: AccessTier;
  /** Provides the identity based authentication settings for Azure Files. */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /** Allows https traffic only to storage service if sets to true. */
  enableHttpsTrafficOnly?: boolean;
  /** Network rule set */
  readonly networkRuleSet?: NetworkRuleSet;
  /** Enables Secure File Transfer Protocol, if set to true */
  isSftpEnabled?: boolean;
  /** Enables local users feature, if set to true */
  isLocalUserEnabled?: boolean;
  /** Enables extended group support with local users feature, if set to true */
  enableExtendedGroups?: boolean;
  /** Account HierarchicalNamespace enabled if sets to true. */
  isHnsEnabled?: boolean;
  /** Geo Replication Stats */
  readonly geoReplicationStats?: GeoReplicationStats;
  /** If the failover is in progress, the value will be true, otherwise, it will be null. */
  readonly failoverInProgress?: boolean;
  /** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
  largeFileSharesState?: LargeFileSharesState;
  /** List of private endpoint connection associated with the specified storage account */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Maintains information about the network routing choice opted by the user for data transfer */
  routingPreference?: RoutingPreference;
  /** Maintains information about the Internet protocol opted by the user. */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /** Blob restore status */
  readonly blobRestoreStatus?: BlobRestoreStatus;
  /** Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. */
  allowBlobPublicAccess?: boolean;
  /** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
  minimumTlsVersion?: MinimumTlsVersion;
  /** Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. */
  allowSharedKeyAccess?: boolean;
  /** NFS 3.0 protocol support enabled if set to true. */
  enableNfsV3?: boolean;
  /** Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. */
  allowCrossTenantReplication?: boolean;
  /** A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. */
  defaultToOAuthAuthentication?: boolean;
  /** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the containers in the account by default. */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
  allowedCopyScope?: AllowedCopyScope;
  /** This property is readOnly and is set by server during asynchronous storage account sku conversion operations. */
  storageAccountSkuConversionStatus?: StorageAccountSkuConversionStatus;
  /** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
  dnsEndpointType?: DnsEndpointType;
  /** This property will be set to true or false on an event of ongoing migration. Default value is null. */
  readonly isSkuConversionBlocked?: boolean;
  /** If customer initiated account migration is in progress, the value will be true else it will be null. */
  readonly accountMigrationInProgress?: boolean;
  /** Status indicating whether Geo Priority Replication is enabled for the account. */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /** Indicate shared key access properties at service level */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /** Data Collaboration policy for the storage account. */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
}

export function storageAccountDeserializer(item: any): StorageAccount {
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
      : _storageAccountPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
    kind: item["kind"],
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    placement: !item["placement"] ? item["placement"] : placementDeserializer(item["placement"]),
  };
}

/** Properties of the storage account. */
export interface StorageAccountProperties {
  /** Gets the status of the storage account at the time the operation was called. */
  readonly provisioningState?: ProvisioningState;
  /** Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object. Note that Standard_ZRS and Premium_LRS accounts only return the blob endpoint. */
  readonly primaryEndpoints?: Endpoints;
  /** Gets the location of the primary data center for the storage account. */
  readonly primaryLocation?: string;
  /** Gets the status indicating whether the primary location of the storage account is available or unavailable. */
  readonly statusOfPrimary?: AccountStatus;
  /** Gets the timestamp of the most recent instance of a failover to the secondary location. Only the most recent timestamp is retained. This element is not returned if there has never been a failover instance. Only available if the accountType is Standard_GRS or Standard_RAGRS. */
  readonly lastGeoFailoverTime?: Date;
  /** Gets the location of the geo-replicated secondary for the storage account. Only available if the accountType is Standard_GRS or Standard_RAGRS. */
  readonly secondaryLocation?: string;
  /** Gets the status indicating whether the secondary location of the storage account is available or unavailable. Only available if the SKU name is Standard_GRS or Standard_RAGRS. */
  readonly statusOfSecondary?: AccountStatus;
  /** Gets the creation date and time of the storage account in UTC. */
  readonly creationTime?: Date;
  /** Gets the custom domain the user assigned to this storage account. */
  readonly customDomain?: CustomDomain;
  /** SasPolicy assigned to the storage account. */
  readonly sasPolicy?: SasPolicy;
  /** KeyPolicy assigned to the storage account. */
  readonly keyPolicy?: KeyPolicy;
  /** Storage account keys creation time. */
  readonly keyCreationTime?: KeyCreationTime;
  /** Gets the URLs that are used to perform a retrieval of a public blob, queue, or table object from the secondary location of the storage account. Only available if the SKU name is Standard_RAGRS. */
  readonly secondaryEndpoints?: Endpoints;
  /** Encryption settings to be used for server-side encryption for the storage account. */
  readonly encryption?: Encryption;
  /** Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. */
  readonly accessTier?: AccessTier;
  /** Provides the identity based authentication settings for Azure Files. */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /** Allows https traffic only to storage service if sets to true. */
  enableHttpsTrafficOnly?: boolean;
  /** Network rule set */
  readonly networkRuleSet?: NetworkRuleSet;
  /** Enables Secure File Transfer Protocol, if set to true */
  isSftpEnabled?: boolean;
  /** Enables local users feature, if set to true */
  isLocalUserEnabled?: boolean;
  /** Enables extended group support with local users feature, if set to true */
  enableExtendedGroups?: boolean;
  /** Account HierarchicalNamespace enabled if sets to true. */
  isHnsEnabled?: boolean;
  /** Geo Replication Stats */
  readonly geoReplicationStats?: GeoReplicationStats;
  /** If the failover is in progress, the value will be true, otherwise, it will be null. */
  readonly failoverInProgress?: boolean;
  /** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
  largeFileSharesState?: LargeFileSharesState;
  /** List of private endpoint connection associated with the specified storage account */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Maintains information about the network routing choice opted by the user for data transfer */
  routingPreference?: RoutingPreference;
  /** Maintains information about the Internet protocol opted by the user. */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /** Blob restore status */
  readonly blobRestoreStatus?: BlobRestoreStatus;
  /** Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. */
  allowBlobPublicAccess?: boolean;
  /** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
  minimumTlsVersion?: MinimumTlsVersion;
  /** Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. */
  allowSharedKeyAccess?: boolean;
  /** NFS 3.0 protocol support enabled if set to true. */
  enableNfsV3?: boolean;
  /** Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. */
  allowCrossTenantReplication?: boolean;
  /** A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. */
  defaultToOAuthAuthentication?: boolean;
  /** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the containers in the account by default. */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
  allowedCopyScope?: AllowedCopyScope;
  /** This property is readOnly and is set by server during asynchronous storage account sku conversion operations. */
  storageAccountSkuConversionStatus?: StorageAccountSkuConversionStatus;
  /** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
  dnsEndpointType?: DnsEndpointType;
  /** This property will be set to true or false on an event of ongoing migration. Default value is null. */
  readonly isSkuConversionBlocked?: boolean;
  /** If customer initiated account migration is in progress, the value will be true else it will be null. */
  readonly accountMigrationInProgress?: boolean;
  /** Status indicating whether Geo Priority Replication is enabled for the account. */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /** Indicate shared key access properties at service level */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /** Data Collaboration policy for the storage account. */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
}

export function storageAccountPropertiesDeserializer(item: any): StorageAccountProperties {
  return {
    provisioningState: item["provisioningState"],
    primaryEndpoints: !item["primaryEndpoints"]
      ? item["primaryEndpoints"]
      : endpointsDeserializer(item["primaryEndpoints"]),
    primaryLocation: item["primaryLocation"],
    statusOfPrimary: item["statusOfPrimary"],
    lastGeoFailoverTime: !item["lastGeoFailoverTime"]
      ? item["lastGeoFailoverTime"]
      : new Date(item["lastGeoFailoverTime"]),
    secondaryLocation: item["secondaryLocation"],
    statusOfSecondary: item["statusOfSecondary"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    customDomain: !item["customDomain"]
      ? item["customDomain"]
      : customDomainDeserializer(item["customDomain"]),
    sasPolicy: !item["sasPolicy"] ? item["sasPolicy"] : sasPolicyDeserializer(item["sasPolicy"]),
    keyPolicy: !item["keyPolicy"] ? item["keyPolicy"] : keyPolicyDeserializer(item["keyPolicy"]),
    keyCreationTime: !item["keyCreationTime"]
      ? item["keyCreationTime"]
      : keyCreationTimeDeserializer(item["keyCreationTime"]),
    secondaryEndpoints: !item["secondaryEndpoints"]
      ? item["secondaryEndpoints"]
      : endpointsDeserializer(item["secondaryEndpoints"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    accessTier: item["accessTier"],
    azureFilesIdentityBasedAuthentication: !item["azureFilesIdentityBasedAuthentication"]
      ? item["azureFilesIdentityBasedAuthentication"]
      : azureFilesIdentityBasedAuthenticationDeserializer(
          item["azureFilesIdentityBasedAuthentication"],
        ),
    enableHttpsTrafficOnly: item["supportsHttpsTrafficOnly"],
    networkRuleSet: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetDeserializer(item["networkAcls"]),
    isSftpEnabled: item["isSftpEnabled"],
    isLocalUserEnabled: item["isLocalUserEnabled"],
    enableExtendedGroups: item["enableExtendedGroups"],
    isHnsEnabled: item["isHnsEnabled"],
    geoReplicationStats: !item["geoReplicationStats"]
      ? item["geoReplicationStats"]
      : geoReplicationStatsDeserializer(item["geoReplicationStats"]),
    failoverInProgress: item["failoverInProgress"],
    largeFileSharesState: item["largeFileSharesState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    routingPreference: !item["routingPreference"]
      ? item["routingPreference"]
      : routingPreferenceDeserializer(item["routingPreference"]),
    dualStackEndpointPreference: !item["dualStackEndpointPreference"]
      ? item["dualStackEndpointPreference"]
      : dualStackEndpointPreferenceDeserializer(item["dualStackEndpointPreference"]),
    blobRestoreStatus: !item["blobRestoreStatus"]
      ? item["blobRestoreStatus"]
      : blobRestoreStatusDeserializer(item["blobRestoreStatus"]),
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    minimumTlsVersion: item["minimumTlsVersion"],
    allowSharedKeyAccess: item["allowSharedKeyAccess"],
    enableNfsV3: item["isNfsV3Enabled"],
    allowCrossTenantReplication: item["allowCrossTenantReplication"],
    defaultToOAuthAuthentication: item["defaultToOAuthAuthentication"],
    publicNetworkAccess: item["publicNetworkAccess"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageAccountDeserializer(item["immutableStorageWithVersioning"]),
    allowedCopyScope: item["allowedCopyScope"],
    storageAccountSkuConversionStatus: !item["storageAccountSkuConversionStatus"]
      ? item["storageAccountSkuConversionStatus"]
      : storageAccountSkuConversionStatusDeserializer(item["storageAccountSkuConversionStatus"]),
    dnsEndpointType: item["dnsEndpointType"],
    isSkuConversionBlocked: item["isSkuConversionBlocked"],
    accountMigrationInProgress: item["accountMigrationInProgress"],
    geoPriorityReplicationStatus: !item["geoPriorityReplicationStatus"]
      ? item["geoPriorityReplicationStatus"]
      : geoPriorityReplicationStatusDeserializer(item["geoPriorityReplicationStatus"]),
    allowSharedKeyAccessForServices: !item["allowSharedKeyAccessForServices"]
      ? item["allowSharedKeyAccessForServices"]
      : storageAccountSharedKeyAccessPropertiesDeserializer(
          item["allowSharedKeyAccessForServices"],
        ),
    dataCollaborationPolicyProperties: !item["dataCollaborationPolicyProperties"]
      ? item["dataCollaborationPolicyProperties"]
      : storageDataCollaborationPolicyPropertiesDeserializer(
          item["dataCollaborationPolicyProperties"],
        ),
  };
}

/** Gets the status of the storage account at the time the operation was called. */
export type ProvisioningState = "Creating" | "ResolvingDNS" | "Succeeded";

/** The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object. */
export interface Endpoints {
  /** Gets the blob endpoint. */
  readonly blob?: string;
  /** Gets the queue endpoint. */
  readonly queue?: string;
  /** Gets the table endpoint. */
  readonly table?: string;
  /** Gets the file endpoint. */
  readonly file?: string;
  /** Gets the web endpoint. */
  readonly web?: string;
  /** Gets the dfs endpoint. */
  readonly dfs?: string;
  /** Gets the microsoft routing storage endpoints. */
  microsoftEndpoints?: StorageAccountMicrosoftEndpoints;
  /** Gets the internet routing storage endpoints */
  internetEndpoints?: StorageAccountInternetEndpoints;
  /** Gets the IPv6 storage endpoints. */
  ipv6Endpoints?: StorageAccountIpv6Endpoints;
}

export function endpointsDeserializer(item: any): Endpoints {
  return {
    blob: item["blob"],
    queue: item["queue"],
    table: item["table"],
    file: item["file"],
    web: item["web"],
    dfs: item["dfs"],
    microsoftEndpoints: !item["microsoftEndpoints"]
      ? item["microsoftEndpoints"]
      : storageAccountMicrosoftEndpointsDeserializer(item["microsoftEndpoints"]),
    internetEndpoints: !item["internetEndpoints"]
      ? item["internetEndpoints"]
      : storageAccountInternetEndpointsDeserializer(item["internetEndpoints"]),
    ipv6Endpoints: !item["ipv6Endpoints"]
      ? item["ipv6Endpoints"]
      : storageAccountIpv6EndpointsDeserializer(item["ipv6Endpoints"]),
  };
}

/** The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via a microsoft routing endpoint. */
export interface StorageAccountMicrosoftEndpoints {
  /** Gets the blob endpoint. */
  readonly blob?: string;
  /** Gets the queue endpoint. */
  readonly queue?: string;
  /** Gets the table endpoint. */
  readonly table?: string;
  /** Gets the file endpoint. */
  readonly file?: string;
  /** Gets the web endpoint. */
  readonly web?: string;
  /** Gets the dfs endpoint. */
  readonly dfs?: string;
}

export function storageAccountMicrosoftEndpointsDeserializer(
  item: any,
): StorageAccountMicrosoftEndpoints {
  return {
    blob: item["blob"],
    queue: item["queue"],
    table: item["table"],
    file: item["file"],
    web: item["web"],
    dfs: item["dfs"],
  };
}

/** The URIs that are used to perform a retrieval of a public blob, file, web or dfs object via a internet routing endpoint. */
export interface StorageAccountInternetEndpoints {
  /** Gets the blob endpoint. */
  readonly blob?: string;
  /** Gets the file endpoint. */
  readonly file?: string;
  /** Gets the web endpoint. */
  readonly web?: string;
  /** Gets the dfs endpoint. */
  readonly dfs?: string;
}

export function storageAccountInternetEndpointsDeserializer(
  item: any,
): StorageAccountInternetEndpoints {
  return {
    blob: item["blob"],
    file: item["file"],
    web: item["web"],
    dfs: item["dfs"],
  };
}

/** The URIs that are used to perform a retrieval of a public blob, queue, table, web or dfs object via an IPv6 endpoint. */
export interface StorageAccountIpv6Endpoints {
  /** Gets the blob endpoint. */
  readonly blob?: string;
  /** Gets the queue endpoint. */
  readonly queue?: string;
  /** Gets the table endpoint. */
  readonly table?: string;
  /** Gets the file endpoint. */
  readonly file?: string;
  /** Gets the web endpoint. */
  readonly web?: string;
  /** Gets the dfs endpoint. */
  readonly dfs?: string;
  /** Gets the microsoft routing storage endpoints. */
  microsoftEndpoints?: StorageAccountMicrosoftEndpoints;
  /** Gets the internet routing storage endpoints */
  internetEndpoints?: StorageAccountInternetEndpoints;
}

export function storageAccountIpv6EndpointsDeserializer(item: any): StorageAccountIpv6Endpoints {
  return {
    blob: item["blob"],
    queue: item["queue"],
    table: item["table"],
    file: item["file"],
    web: item["web"],
    dfs: item["dfs"],
    microsoftEndpoints: !item["microsoftEndpoints"]
      ? item["microsoftEndpoints"]
      : storageAccountMicrosoftEndpointsDeserializer(item["microsoftEndpoints"]),
    internetEndpoints: !item["internetEndpoints"]
      ? item["internetEndpoints"]
      : storageAccountInternetEndpointsDeserializer(item["internetEndpoints"]),
  };
}

/** Gets the status indicating whether the primary location of the storage account is available or unavailable. */
export type AccountStatus = "available" | "unavailable";

/** The custom domain assigned to this storage account. This can be set via Update. */
export interface CustomDomain {
  /** Gets or sets the custom domain name assigned to the storage account. Name is the CNAME source. */
  name: string;
  /** Indicates whether indirect CName validation is enabled. Default value is false. This should only be set on updates. */
  useSubDomainName?: boolean;
}

export function customDomainSerializer(item: CustomDomain): any {
  return { name: item["name"], useSubDomainName: item["useSubDomainName"] };
}

export function customDomainDeserializer(item: any): CustomDomain {
  return {
    name: item["name"],
    useSubDomainName: item["useSubDomainName"],
  };
}

/** SasPolicy assigned to the storage account. */
export interface SasPolicy {
  /** The SAS expiration period, DD.HH:MM:SS. */
  sasExpirationPeriod: string;
  /** The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period. */
  expirationAction: ExpirationAction;
}

export function sasPolicySerializer(item: SasPolicy): any {
  return {
    sasExpirationPeriod: item["sasExpirationPeriod"],
    expirationAction: item["expirationAction"],
  };
}

export function sasPolicyDeserializer(item: any): SasPolicy {
  return {
    sasExpirationPeriod: item["sasExpirationPeriod"],
    expirationAction: item["expirationAction"],
  };
}

/** The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period. */
export enum KnownExpirationAction {
  /** Log */
  Log = "Log",
  /** Block */
  Block = "Block",
}

/**
 * The SAS Expiration Action defines the action to be performed when sasPolicy.sasExpirationPeriod is violated. The 'Log' action can be used for audit purposes and the 'Block' action can be used to block and deny the usage of SAS tokens that do not adhere to the sas policy expiration period. \
 * {@link KnownExpirationAction} can be used interchangeably with ExpirationAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Log** \
 * **Block**
 */
export type ExpirationAction = string;

/** KeyPolicy assigned to the storage account. */
export interface KeyPolicy {
  /** The key expiration period in days. */
  keyExpirationPeriodInDays: number;
}

export function keyPolicySerializer(item: KeyPolicy): any {
  return { keyExpirationPeriodInDays: item["keyExpirationPeriodInDays"] };
}

export function keyPolicyDeserializer(item: any): KeyPolicy {
  return {
    keyExpirationPeriodInDays: item["keyExpirationPeriodInDays"],
  };
}

/** Storage account keys creation time. */
export interface KeyCreationTime {
  key1?: Date;
  key2?: Date;
}

export function keyCreationTimeDeserializer(item: any): KeyCreationTime {
  return {
    key1: !item["key1"] ? item["key1"] : new Date(item["key1"]),
    key2: !item["key2"] ? item["key2"] : new Date(item["key2"]),
  };
}

/** The encryption settings on the storage account. */
export interface Encryption {
  /** List of services which support encryption. */
  services?: EncryptionServices;
  /** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Storage, Microsoft.Keyvault */
  keySource?: KeySource;
  /** A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest. */
  requireInfrastructureEncryption?: boolean;
  /** Properties provided by key vault. */
  keyVaultProperties?: KeyVaultProperties;
  /** The identity to be used with service-side encryption at rest. */
  encryptionIdentity?: EncryptionIdentity;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    services: !item["services"] ? item["services"] : encryptionServicesSerializer(item["services"]),
    keySource: item["keySource"],
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
    keyvaultproperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    identity: !item["encryptionIdentity"]
      ? item["encryptionIdentity"]
      : encryptionIdentitySerializer(item["encryptionIdentity"]),
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    services: !item["services"]
      ? item["services"]
      : encryptionServicesDeserializer(item["services"]),
    keySource: item["keySource"],
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
    keyVaultProperties: !item["keyvaultproperties"]
      ? item["keyvaultproperties"]
      : keyVaultPropertiesDeserializer(item["keyvaultproperties"]),
    encryptionIdentity: !item["identity"]
      ? item["identity"]
      : encryptionIdentityDeserializer(item["identity"]),
  };
}

/** A list of services that support encryption. */
export interface EncryptionServices {
  /** The encryption function of the blob storage service. */
  blob?: EncryptionService;
  /** The encryption function of the file storage service. */
  file?: EncryptionService;
  /** The encryption function of the table storage service. */
  table?: EncryptionService;
  /** The encryption function of the queue storage service. */
  queue?: EncryptionService;
}

export function encryptionServicesSerializer(item: EncryptionServices): any {
  return {
    blob: !item["blob"] ? item["blob"] : encryptionServiceSerializer(item["blob"]),
    file: !item["file"] ? item["file"] : encryptionServiceSerializer(item["file"]),
    table: !item["table"] ? item["table"] : encryptionServiceSerializer(item["table"]),
    queue: !item["queue"] ? item["queue"] : encryptionServiceSerializer(item["queue"]),
  };
}

export function encryptionServicesDeserializer(item: any): EncryptionServices {
  return {
    blob: !item["blob"] ? item["blob"] : encryptionServiceDeserializer(item["blob"]),
    file: !item["file"] ? item["file"] : encryptionServiceDeserializer(item["file"]),
    table: !item["table"] ? item["table"] : encryptionServiceDeserializer(item["table"]),
    queue: !item["queue"] ? item["queue"] : encryptionServiceDeserializer(item["queue"]),
  };
}

/** A service that allows server-side encryption to be used. */
export interface EncryptionService {
  /** A boolean indicating whether or not the service encrypts the data as it is stored. Encryption at rest is enabled by default today and cannot be disabled. */
  enabled?: boolean;
  /** Gets a rough estimate of the date/time when the encryption was last enabled by the user. Data is encrypted at rest by default today and cannot be disabled. */
  readonly lastEnabledTime?: Date;
  /** Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. */
  keyType?: KeyType;
}

export function encryptionServiceSerializer(item: EncryptionService): any {
  return { enabled: item["enabled"], keyType: item["keyType"] };
}

export function encryptionServiceDeserializer(item: any): EncryptionService {
  return {
    enabled: item["enabled"],
    lastEnabledTime: !item["lastEnabledTime"]
      ? item["lastEnabledTime"]
      : new Date(item["lastEnabledTime"]),
    keyType: item["keyType"],
  };
}

/** Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. */
export enum KnownKeyType {
  /** Service */
  Service = "Service",
  /** Account */
  Account = "Account",
}

/**
 * Encryption key type to be used for the encryption service. 'Account' key type implies that an account-scoped encryption key will be used. 'Service' key type implies that a default service key is used. \
 * {@link KnownKeyType} can be used interchangeably with KeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Service** \
 * **Account**
 */
export type KeyType = string;

/** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Storage, Microsoft.Keyvault */
export enum KnownKeySource {
  /** Microsoft.Storage */
  MicrosoftStorage = "Microsoft.Storage",
  /** Microsoft.Keyvault */
  MicrosoftKeyvault = "Microsoft.Keyvault",
}

/**
 * The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.Storage, Microsoft.Keyvault \
 * {@link KnownKeySource} can be used interchangeably with KeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Storage** \
 * **Microsoft.Keyvault**
 */
export type KeySource = string;

/** Properties of key vault. */
export interface KeyVaultProperties {
  /** The name of KeyVault key. */
  keyName?: string;
  /** The version of KeyVault key. */
  keyVersion?: string;
  /** The Uri of KeyVault. */
  keyVaultUri?: string;
  /** The object identifier of the current versioned Key Vault Key in use. */
  readonly currentVersionedKeyIdentifier?: string;
  /** Timestamp of last rotation of the Key Vault Key. */
  readonly lastKeyRotationTimestamp?: Date;
  /** This is a read only property that represents the expiration time of the current version of the customer managed key used for encryption. */
  readonly currentVersionedKeyExpirationTimestamp?: Date;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyname: item["keyName"],
    keyversion: item["keyVersion"],
    keyvaulturi: item["keyVaultUri"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyName: item["keyname"],
    keyVersion: item["keyversion"],
    keyVaultUri: item["keyvaulturi"],
    currentVersionedKeyIdentifier: item["currentVersionedKeyIdentifier"],
    lastKeyRotationTimestamp: !item["lastKeyRotationTimestamp"]
      ? item["lastKeyRotationTimestamp"]
      : new Date(item["lastKeyRotationTimestamp"]),
    currentVersionedKeyExpirationTimestamp: !item["currentVersionedKeyExpirationTimestamp"]
      ? item["currentVersionedKeyExpirationTimestamp"]
      : new Date(item["currentVersionedKeyExpirationTimestamp"]),
  };
}

/** Encryption identity for the storage account. */
export interface EncryptionIdentity {
  /** Resource identifier of the UserAssigned identity to be associated with server-side encryption on the storage account. */
  encryptionUserAssignedIdentity?: string;
  /** ClientId of the multi-tenant application to be used in conjunction with the user-assigned identity for cross-tenant customer-managed-keys server-side encryption on the storage account. */
  encryptionFederatedIdentityClientId?: string;
}

export function encryptionIdentitySerializer(item: EncryptionIdentity): any {
  return {
    userAssignedIdentity: item["encryptionUserAssignedIdentity"],
    federatedIdentityClientId: item["encryptionFederatedIdentityClientId"],
  };
}

export function encryptionIdentityDeserializer(item: any): EncryptionIdentity {
  return {
    encryptionUserAssignedIdentity: item["userAssignedIdentity"],
    encryptionFederatedIdentityClientId: item["federatedIdentityClientId"],
  };
}

/** The default access tier for block blobs in the storage account. Required for storage accounts where kind = BlobStorage. See more details in: https://learn.microsoft.com/azure/storage/blobs/access-tiers-overview. */
export type AccessTier = "Hot" | "Cool" | "Premium" | "Cold" | "Smart";

/** Settings for Azure Files identity based authentication. */
export interface AzureFilesIdentityBasedAuthentication {
  /** Indicates the directory service used. Note that this enum may be extended in the future. */
  directoryServiceOptions: DirectoryServiceOptions;
  /** Additional information about the directory service. Required if directoryServiceOptions is AD (AD DS authentication). Optional for directoryServiceOptions AADDS (Entra DS authentication) and AADKERB (Entra authentication). */
  activeDirectoryProperties?: ActiveDirectoryProperties;
  /** Default share permission for users using Kerberos authentication if RBAC role is not assigned. */
  defaultSharePermission?: DefaultSharePermission;
  /** Required for Managed Identities access using OAuth over SMB. */
  smbOAuthSettings?: SmbOAuthSettings;
}

export function azureFilesIdentityBasedAuthenticationSerializer(
  item: AzureFilesIdentityBasedAuthentication,
): any {
  return {
    directoryServiceOptions: item["directoryServiceOptions"],
    activeDirectoryProperties: !item["activeDirectoryProperties"]
      ? item["activeDirectoryProperties"]
      : activeDirectoryPropertiesSerializer(item["activeDirectoryProperties"]),
    defaultSharePermission: item["defaultSharePermission"],
    smbOAuthSettings: !item["smbOAuthSettings"]
      ? item["smbOAuthSettings"]
      : smbOAuthSettingsSerializer(item["smbOAuthSettings"]),
  };
}

export function azureFilesIdentityBasedAuthenticationDeserializer(
  item: any,
): AzureFilesIdentityBasedAuthentication {
  return {
    directoryServiceOptions: item["directoryServiceOptions"],
    activeDirectoryProperties: !item["activeDirectoryProperties"]
      ? item["activeDirectoryProperties"]
      : activeDirectoryPropertiesDeserializer(item["activeDirectoryProperties"]),
    defaultSharePermission: item["defaultSharePermission"],
    smbOAuthSettings: !item["smbOAuthSettings"]
      ? item["smbOAuthSettings"]
      : smbOAuthSettingsDeserializer(item["smbOAuthSettings"]),
  };
}

/** Indicates the directory service used. Note that this enum may be extended in the future. */
export enum KnownDirectoryServiceOptions {
  /** None */
  None = "None",
  /** AADDS */
  Aadds = "AADDS",
  /** AD */
  AD = "AD",
  /** AADKERB */
  Aadkerb = "AADKERB",
}

/**
 * Indicates the directory service used. Note that this enum may be extended in the future. \
 * {@link KnownDirectoryServiceOptions} can be used interchangeably with DirectoryServiceOptions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **AADDS** \
 * **AD** \
 * **AADKERB**
 */
export type DirectoryServiceOptions = string;

/** Settings properties for Active Directory (AD). */
export interface ActiveDirectoryProperties {
  /** Specifies the primary domain that the AD DNS server is authoritative for. This property is required if directoryServiceOptions is set to AD (AD DS authentication). If directoryServiceOptions is set to AADDS (Entra DS authentication), providing this property is optional, as it will be inferred automatically if omitted. If directoryServiceOptions is set to AADKERB (Entra authentication), this property is optional; it is needed to support configuration of directory- and file-level permissions via Windows File Explorer, but is not required for authentication. */
  domainName?: string;
  /** Specifies the NetBIOS domain name. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted. */
  netBiosDomainName?: string;
  /** Specifies the Active Directory forest to get. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted. */
  forestName?: string;
  /** Specifies the domain GUID. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. If directoryServiceOptions is set to AADDS (Entra DS authentication), this property can be omitted. If directoryServiceOptions is set to AADKERB (Entra authentication), this property is optional; it is needed to support configuration of directory- and file-level permissions via Windows File Explorer, but is not required for authentication. */
  domainGuid?: string;
  /** Specifies the security identifier (SID) of the AD domain. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted. */
  domainSid?: string;
  /** Specifies the security identifier (SID) for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is required. Otherwise, it can be omitted. */
  azureStorageSid?: string;
  /** Specifies the Active Directory SAMAccountName for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, accountType should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted. */
  samAccountName?: string;
  /** Specifies the Active Directory account type for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, samAccountName should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted. */
  accountType?: AccountType;
}

export function activeDirectoryPropertiesSerializer(item: ActiveDirectoryProperties): any {
  return {
    domainName: item["domainName"],
    netBiosDomainName: item["netBiosDomainName"],
    forestName: item["forestName"],
    domainGuid: item["domainGuid"],
    domainSid: item["domainSid"],
    azureStorageSid: item["azureStorageSid"],
    samAccountName: item["samAccountName"],
    accountType: item["accountType"],
  };
}

export function activeDirectoryPropertiesDeserializer(item: any): ActiveDirectoryProperties {
  return {
    domainName: item["domainName"],
    netBiosDomainName: item["netBiosDomainName"],
    forestName: item["forestName"],
    domainGuid: item["domainGuid"],
    domainSid: item["domainSid"],
    azureStorageSid: item["azureStorageSid"],
    samAccountName: item["samAccountName"],
    accountType: item["accountType"],
  };
}

/** Specifies the Active Directory account type for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, samAccountName should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted. */
export enum KnownAccountType {
  /** User */
  User = "User",
  /** Computer */
  Computer = "Computer",
}

/**
 * Specifies the Active Directory account type for Azure Storage. If directoryServiceOptions is set to AD (AD DS authentication), this property is optional. If provided, samAccountName should also be provided. For directoryServiceOptions AADDS (Entra DS authentication) or AADKERB (Entra authentication), this property can be omitted. \
 * {@link KnownAccountType} can be used interchangeably with AccountType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **Computer**
 */
export type AccountType = string;

/** Default share permission for users using Kerberos authentication if RBAC role is not assigned. */
export enum KnownDefaultSharePermission {
  /** None */
  None = "None",
  /** StorageFileDataSmbShareReader */
  StorageFileDataSmbShareReader = "StorageFileDataSmbShareReader",
  /** StorageFileDataSmbShareContributor */
  StorageFileDataSmbShareContributor = "StorageFileDataSmbShareContributor",
  /** StorageFileDataSmbShareElevatedContributor */
  StorageFileDataSmbShareElevatedContributor = "StorageFileDataSmbShareElevatedContributor",
}

/**
 * Default share permission for users using Kerberos authentication if RBAC role is not assigned. \
 * {@link KnownDefaultSharePermission} can be used interchangeably with DefaultSharePermission,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **StorageFileDataSmbShareReader** \
 * **StorageFileDataSmbShareContributor** \
 * **StorageFileDataSmbShareElevatedContributor**
 */
export type DefaultSharePermission = string;

/** Setting property for Managed Identity access over SMB using OAuth */
export interface SmbOAuthSettings {
  /** Specifies if managed identities can access SMB shares using OAuth. The default interpretation is false for this property. */
  isSmbOAuthEnabled?: boolean;
}

export function smbOAuthSettingsSerializer(item: SmbOAuthSettings): any {
  return { isSmbOAuthEnabled: item["isSmbOAuthEnabled"] };
}

export function smbOAuthSettingsDeserializer(item: any): SmbOAuthSettings {
  return {
    isSmbOAuthEnabled: item["isSmbOAuthEnabled"],
  };
}

/** Network rule set */
export interface NetworkRuleSet {
  /** Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics. */
  bypass?: Bypass;
  /** Sets the resource access rules */
  resourceAccessRules?: ResourceAccessRule[];
  /** Sets the virtual network rules */
  virtualNetworkRules?: VirtualNetworkRule[];
  /** Sets the IP ACL rules */
  ipRules?: IPRule[];
  /** Sets the IPv6 ACL rules. */
  ipv6Rules?: IPRule[];
  /** Specifies the default action of allow or deny when no other rules match. */
  defaultAction: DefaultAction;
}

export function networkRuleSetSerializer(item: NetworkRuleSet): any {
  return {
    bypass: item["bypass"],
    resourceAccessRules: !item["resourceAccessRules"]
      ? item["resourceAccessRules"]
      : resourceAccessRuleArraySerializer(item["resourceAccessRules"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArraySerializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArraySerializer(item["ipRules"]),
    ipv6Rules: !item["ipv6Rules"] ? item["ipv6Rules"] : ipRuleArraySerializer(item["ipv6Rules"]),
    defaultAction: item["defaultAction"],
  };
}

export function networkRuleSetDeserializer(item: any): NetworkRuleSet {
  return {
    bypass: item["bypass"],
    resourceAccessRules: !item["resourceAccessRules"]
      ? item["resourceAccessRules"]
      : resourceAccessRuleArrayDeserializer(item["resourceAccessRules"]),
    virtualNetworkRules: !item["virtualNetworkRules"]
      ? item["virtualNetworkRules"]
      : virtualNetworkRuleArrayDeserializer(item["virtualNetworkRules"]),
    ipRules: !item["ipRules"] ? item["ipRules"] : ipRuleArrayDeserializer(item["ipRules"]),
    ipv6Rules: !item["ipv6Rules"] ? item["ipv6Rules"] : ipRuleArrayDeserializer(item["ipv6Rules"]),
    defaultAction: item["defaultAction"],
  };
}

/** Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics. */
export enum KnownBypass {
  /** None */
  None = "None",
  /** Logging */
  Logging = "Logging",
  /** Metrics */
  Metrics = "Metrics",
  /** AzureServices */
  AzureServices = "AzureServices",
}

/**
 * Specifies whether traffic is bypassed for Logging/Metrics/AzureServices. Possible values are any combination of Logging|Metrics|AzureServices (For example, "Logging, Metrics"), or None to bypass none of those traffics. \
 * {@link KnownBypass} can be used interchangeably with Bypass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **Logging** \
 * **Metrics** \
 * **AzureServices**
 */
export type Bypass = string;

export function resourceAccessRuleArraySerializer(result: Array<ResourceAccessRule>): any[] {
  return result.map((item) => {
    return resourceAccessRuleSerializer(item);
  });
}

export function resourceAccessRuleArrayDeserializer(result: Array<ResourceAccessRule>): any[] {
  return result.map((item) => {
    return resourceAccessRuleDeserializer(item);
  });
}

/** Resource Access Rule. */
export interface ResourceAccessRule {
  /** Tenant Id */
  tenantId?: string;
  /** Resource Id */
  resourceId?: string;
}

export function resourceAccessRuleSerializer(item: ResourceAccessRule): any {
  return { tenantId: item["tenantId"], resourceId: item["resourceId"] };
}

export function resourceAccessRuleDeserializer(item: any): ResourceAccessRule {
  return {
    tenantId: item["tenantId"],
    resourceId: item["resourceId"],
  };
}

export function virtualNetworkRuleArraySerializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleSerializer(item);
  });
}

export function virtualNetworkRuleArrayDeserializer(result: Array<VirtualNetworkRule>): any[] {
  return result.map((item) => {
    return virtualNetworkRuleDeserializer(item);
  });
}

/** Virtual Network rule. */
export interface VirtualNetworkRule {
  /** Resource ID of a subnet, for example: /subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Network/virtualNetworks/{vnetName}/subnets/{subnetName}. */
  virtualNetworkResourceId: string;
  /** The action of virtual network rule. */
  action?: "Allow";
  /** Gets the state of virtual network rule. */
  state?: State;
}

export function virtualNetworkRuleSerializer(item: VirtualNetworkRule): any {
  return { id: item["virtualNetworkResourceId"], action: item["action"], state: item["state"] };
}

export function virtualNetworkRuleDeserializer(item: any): VirtualNetworkRule {
  return {
    virtualNetworkResourceId: item["id"],
    action: item["action"],
    state: item["state"],
  };
}

/** Gets the state of virtual network rule. */
export enum KnownState {
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Deprovisioning */
  Deprovisioning = "Deprovisioning",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** NetworkSourceDeleted */
  NetworkSourceDeleted = "NetworkSourceDeleted",
}

/**
 * Gets the state of virtual network rule. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provisioning** \
 * **Deprovisioning** \
 * **Succeeded** \
 * **Failed** \
 * **NetworkSourceDeleted**
 */
export type State = string;

export function ipRuleArraySerializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleSerializer(item);
  });
}

export function ipRuleArrayDeserializer(result: Array<IPRule>): any[] {
  return result.map((item) => {
    return ipRuleDeserializer(item);
  });
}

/** IP rule with specific IP or IP range in CIDR format. */
export interface IPRule {
  /** Specifies the IP or IP range in CIDR format. */
  iPAddressOrRange: string;
  /** The action of IP ACL rule. */
  action?: "Allow";
}

export function ipRuleSerializer(item: IPRule): any {
  return { value: item["iPAddressOrRange"], action: item["action"] };
}

export function ipRuleDeserializer(item: any): IPRule {
  return {
    iPAddressOrRange: item["value"],
    action: item["action"],
  };
}

/** Specifies the default action of allow or deny when no other rules match. */
export type DefaultAction = "Allow" | "Deny";

/** Statistics related to replication for storage account's Blob, Table, Queue and File services. It is only available when geo-redundant replication is enabled for the storage account. */
export interface GeoReplicationStats {
  /** The status of the secondary location. Possible values are: - Live: Indicates that the secondary location is active and operational. - Bootstrap: Indicates initial synchronization from the primary location to the secondary location is in progress.This typically occurs when replication is first enabled. - Unavailable: Indicates that the secondary location is temporarily unavailable. */
  readonly status?: GeoReplicationStatus;
  /** All primary writes preceding this UTC date/time value are guaranteed to be available for read operations. Primary writes following this point in time may or may not be available for reads. Element may be default value if value of LastSyncTime is not available, this can happen if secondary is offline or we are in bootstrap. */
  readonly lastSyncTime?: Date;
  /** A boolean flag which indicates whether or not account failover is supported for the account. */
  readonly canFailover?: boolean;
  /** A boolean flag which indicates whether or not planned account failover is supported for the account. */
  readonly canPlannedFailover?: boolean;
  /** The redundancy type of the account after an account failover is performed. */
  readonly postFailoverRedundancy?: PostFailoverRedundancy;
  /** The redundancy type of the account after a planned account failover is performed. */
  readonly postPlannedFailoverRedundancy?: PostPlannedFailoverRedundancy;
}

export function geoReplicationStatsDeserializer(item: any): GeoReplicationStats {
  return {
    status: item["status"],
    lastSyncTime: !item["lastSyncTime"] ? item["lastSyncTime"] : new Date(item["lastSyncTime"]),
    canFailover: item["canFailover"],
    canPlannedFailover: item["canPlannedFailover"],
    postFailoverRedundancy: item["postFailoverRedundancy"],
    postPlannedFailoverRedundancy: item["postPlannedFailoverRedundancy"],
  };
}

/** The status of the secondary location. Possible values are: - Live: Indicates that the secondary location is active and operational. - Bootstrap: Indicates initial synchronization from the primary location to the secondary location is in progress.This typically occurs when replication is first enabled. - Unavailable: Indicates that the secondary location is temporarily unavailable. */
export enum KnownGeoReplicationStatus {
  /** Live */
  Live = "Live",
  /** Bootstrap */
  Bootstrap = "Bootstrap",
  /** Unavailable */
  Unavailable = "Unavailable",
}

/**
 * The status of the secondary location. Possible values are: - Live: Indicates that the secondary location is active and operational. - Bootstrap: Indicates initial synchronization from the primary location to the secondary location is in progress.This typically occurs when replication is first enabled. - Unavailable: Indicates that the secondary location is temporarily unavailable. \
 * {@link KnownGeoReplicationStatus} can be used interchangeably with GeoReplicationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Live** \
 * **Bootstrap** \
 * **Unavailable**
 */
export type GeoReplicationStatus = string;

/** The redundancy type of the account after an account failover is performed. */
export enum KnownPostFailoverRedundancy {
  /** Standard_LRS */
  StandardLRS = "Standard_LRS",
  /** Standard_ZRS */
  StandardZRS = "Standard_ZRS",
}

/**
 * The redundancy type of the account after an account failover is performed. \
 * {@link KnownPostFailoverRedundancy} can be used interchangeably with PostFailoverRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_LRS** \
 * **Standard_ZRS**
 */
export type PostFailoverRedundancy = string;

/** The redundancy type of the account after a planned account failover is performed. */
export enum KnownPostPlannedFailoverRedundancy {
  /** Standard_GRS */
  StandardGRS = "Standard_GRS",
  /** Standard_GZRS */
  StandardGzrs = "Standard_GZRS",
  /** Standard_RAGRS */
  StandardRagrs = "Standard_RAGRS",
  /** Standard_RAGZRS */
  StandardRagzrs = "Standard_RAGZRS",
}

/**
 * The redundancy type of the account after a planned account failover is performed. \
 * {@link KnownPostPlannedFailoverRedundancy} can be used interchangeably with PostPlannedFailoverRedundancy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard_GRS** \
 * **Standard_GZRS** \
 * **Standard_RAGRS** \
 * **Standard_RAGZRS**
 */
export type PostPlannedFailoverRedundancy = string;

/** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
export enum KnownLargeFileSharesState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
}

/**
 * Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. \
 * {@link KnownLargeFileSharesState} can be used interchangeably with LargeFileSharesState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled** \
 * **Enabled**
 */
export type LargeFileSharesState = string;

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

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
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
  };
}

/** Properties of the PrivateEndpointConnectProperties. */
export interface PrivateEndpointConnectionProperties {
  /** The resource of private end point. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The Private Endpoint resource. */
export interface PrivateEndpoint {
  /** The ARM identifier for Private Endpoint */
  readonly id?: string;
}

export function privateEndpointSerializer(_item: PrivateEndpoint): any {
  return {};
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /** Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service. */
  status?: PrivateEndpointServiceConnectionStatus;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionRequired: item["actionRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionRequired: item["actionRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected**
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Creating** \
 * **Deleting** \
 * **Failed**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Routing preference defines the type of network, either microsoft or internet routing to be used to deliver the user data, the default option is microsoft routing */
export interface RoutingPreference {
  /** Routing Choice defines the kind of network routing opted by the user. */
  routingChoice?: RoutingChoice;
  /** A boolean flag which indicates whether microsoft routing storage endpoints are to be published */
  publishMicrosoftEndpoints?: boolean;
  /** A boolean flag which indicates whether internet routing storage endpoints are to be published */
  publishInternetEndpoints?: boolean;
}

export function routingPreferenceSerializer(item: RoutingPreference): any {
  return {
    routingChoice: item["routingChoice"],
    publishMicrosoftEndpoints: item["publishMicrosoftEndpoints"],
    publishInternetEndpoints: item["publishInternetEndpoints"],
  };
}

export function routingPreferenceDeserializer(item: any): RoutingPreference {
  return {
    routingChoice: item["routingChoice"],
    publishMicrosoftEndpoints: item["publishMicrosoftEndpoints"],
    publishInternetEndpoints: item["publishInternetEndpoints"],
  };
}

/** Routing Choice defines the kind of network routing opted by the user. */
export enum KnownRoutingChoice {
  /** MicrosoftRouting */
  MicrosoftRouting = "MicrosoftRouting",
  /** InternetRouting */
  InternetRouting = "InternetRouting",
}

/**
 * Routing Choice defines the kind of network routing opted by the user. \
 * {@link KnownRoutingChoice} can be used interchangeably with RoutingChoice,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MicrosoftRouting** \
 * **InternetRouting**
 */
export type RoutingChoice = string;

/** Dual-stack endpoint preference defines whether IPv6 endpoints are going to be published. */
export interface DualStackEndpointPreference {
  /** A boolean flag which indicates whether IPv6 storage endpoints are to be published. */
  publishIpv6Endpoint?: boolean;
}

export function dualStackEndpointPreferenceSerializer(item: DualStackEndpointPreference): any {
  return { publishIpv6Endpoint: item["publishIpv6Endpoint"] };
}

export function dualStackEndpointPreferenceDeserializer(item: any): DualStackEndpointPreference {
  return {
    publishIpv6Endpoint: item["publishIpv6Endpoint"],
  };
}

/** Blob restore status. */
export interface BlobRestoreStatus {
  /** The status of blob restore progress. Possible values are: - InProgress: Indicates that blob restore is ongoing. - Complete: Indicates that blob restore has been completed successfully. - Failed: Indicates that blob restore is failed. */
  readonly status?: BlobRestoreProgressStatus;
  /** Failure reason when blob restore is failed. */
  readonly failureReason?: string;
  /** Id for tracking blob restore request. */
  readonly restoreId?: string;
  /** Blob restore request parameters. */
  readonly parameters?: BlobRestoreParameters;
}

export function blobRestoreStatusDeserializer(item: any): BlobRestoreStatus {
  return {
    status: item["status"],
    failureReason: item["failureReason"],
    restoreId: item["restoreId"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : blobRestoreParametersDeserializer(item["parameters"]),
  };
}

/** The status of blob restore progress. Possible values are: - InProgress: Indicates that blob restore is ongoing. - Complete: Indicates that blob restore has been completed successfully. - Failed: Indicates that blob restore is failed. */
export enum KnownBlobRestoreProgressStatus {
  /** InProgress */
  InProgress = "InProgress",
  /** Complete */
  Complete = "Complete",
  /** Failed */
  Failed = "Failed",
}

/**
 * The status of blob restore progress. Possible values are: - InProgress: Indicates that blob restore is ongoing. - Complete: Indicates that blob restore has been completed successfully. - Failed: Indicates that blob restore is failed. \
 * {@link KnownBlobRestoreProgressStatus} can be used interchangeably with BlobRestoreProgressStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Complete** \
 * **Failed**
 */
export type BlobRestoreProgressStatus = string;

/** Blob restore parameters */
export interface BlobRestoreParameters {
  /** Restore blob to the specified time. */
  timeToRestore: Date;
  /** Blob ranges to restore. */
  blobRanges: BlobRestoreRange[];
}

export function blobRestoreParametersSerializer(item: BlobRestoreParameters): any {
  return {
    timeToRestore: item["timeToRestore"].toISOString(),
    blobRanges: blobRestoreRangeArraySerializer(item["blobRanges"]),
  };
}

export function blobRestoreParametersDeserializer(item: any): BlobRestoreParameters {
  return {
    timeToRestore: new Date(item["timeToRestore"]),
    blobRanges: blobRestoreRangeArrayDeserializer(item["blobRanges"]),
  };
}

export function blobRestoreRangeArraySerializer(result: Array<BlobRestoreRange>): any[] {
  return result.map((item) => {
    return blobRestoreRangeSerializer(item);
  });
}

export function blobRestoreRangeArrayDeserializer(result: Array<BlobRestoreRange>): any[] {
  return result.map((item) => {
    return blobRestoreRangeDeserializer(item);
  });
}

/** Blob range */
export interface BlobRestoreRange {
  /** Blob start range. This is inclusive. Empty means account start. */
  startRange: string;
  /** Blob end range. This is exclusive. Empty means account end. */
  endRange: string;
}

export function blobRestoreRangeSerializer(item: BlobRestoreRange): any {
  return { startRange: item["startRange"], endRange: item["endRange"] };
}

export function blobRestoreRangeDeserializer(item: any): BlobRestoreRange {
  return {
    startRange: item["startRange"],
    endRange: item["endRange"],
  };
}

/** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
export enum KnownMinimumTlsVersion {
  /** TLS1_0 */
  TLS10 = "TLS1_0",
  /** TLS1_1 */
  TLS11 = "TLS1_1",
  /** TLS1_2 */
  TLS12 = "TLS1_2",
  /** TLS1_3 */
  TLS13 = "TLS1_3",
}

/**
 * Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. \
 * {@link KnownMinimumTlsVersion} can be used interchangeably with MinimumTlsVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TLS1_0** \
 * **TLS1_1** \
 * **TLS1_2** \
 * **TLS1_3**
 */
export type MinimumTlsVersion = string;

/** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
  /** SecuredByPerimeter */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled** \
 * **SecuredByPerimeter**
 */
export type PublicNetworkAccess = string;

/** This property enables and defines account-level immutability. Enabling the feature auto-enables Blob Versioning. */
export interface ImmutableStorageAccount {
  /** A boolean flag which enables account-level immutability. All the containers under such an account have object-level immutability enabled by default. */
  enabled?: boolean;
  /** Specifies the default account-level immutability policy which is inherited and applied to objects that do not possess an explicit immutability policy at the object level. The object-level immutability policy has higher precedence than the container-level immutability policy, which has a higher precedence than the account-level immutability policy. */
  immutabilityPolicy?: AccountImmutabilityPolicyProperties;
}

export function immutableStorageAccountSerializer(item: ImmutableStorageAccount): any {
  return {
    enabled: item["enabled"],
    immutabilityPolicy: !item["immutabilityPolicy"]
      ? item["immutabilityPolicy"]
      : accountImmutabilityPolicyPropertiesSerializer(item["immutabilityPolicy"]),
  };
}

export function immutableStorageAccountDeserializer(item: any): ImmutableStorageAccount {
  return {
    enabled: item["enabled"],
    immutabilityPolicy: !item["immutabilityPolicy"]
      ? item["immutabilityPolicy"]
      : accountImmutabilityPolicyPropertiesDeserializer(item["immutabilityPolicy"]),
  };
}

/** This defines account-level immutability policy properties. */
export interface AccountImmutabilityPolicyProperties {
  /** The immutability period for the blobs in the container since the policy creation, in days. */
  immutabilityPeriodSinceCreationInDays?: number;
  /** The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted. */
  state?: AccountImmutabilityPolicyState;
  /** This property can only be changed for disabled and unlocked time-based retention policies. When enabled, new blocks can be written to an append blob while maintaining immutability protection and compliance. Only new blocks can be added and any existing blocks cannot be modified or deleted. */
  allowProtectedAppendWrites?: boolean;
}

export function accountImmutabilityPolicyPropertiesSerializer(
  item: AccountImmutabilityPolicyProperties,
): any {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    state: item["state"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
  };
}

export function accountImmutabilityPolicyPropertiesDeserializer(
  item: any,
): AccountImmutabilityPolicyProperties {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    state: item["state"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
  };
}

/** The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted. */
export enum KnownAccountImmutabilityPolicyState {
  /** Unlocked */
  Unlocked = "Unlocked",
  /** Locked */
  Locked = "Locked",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The ImmutabilityPolicy state defines the mode of the policy. Disabled state disables the policy, Unlocked state allows increase and decrease of immutability retention time and also allows toggling allowProtectedAppendWrites property, Locked state only allows the increase of the immutability retention time. A policy can only be created in a Disabled or Unlocked state and can be toggled between the two states. Only a policy in an Unlocked state can transition to a Locked state which cannot be reverted. \
 * {@link KnownAccountImmutabilityPolicyState} can be used interchangeably with AccountImmutabilityPolicyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unlocked** \
 * **Locked** \
 * **Disabled**
 */
export type AccountImmutabilityPolicyState = string;

/** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
export enum KnownAllowedCopyScope {
  /** PrivateLink */
  PrivateLink = "PrivateLink",
  /** AAD */
  AAD = "AAD",
  /** All */
  All = "All",
}

/**
 * Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. \
 * {@link KnownAllowedCopyScope} can be used interchangeably with AllowedCopyScope,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PrivateLink** \
 * **AAD** \
 * **All**
 */
export type AllowedCopyScope = string;

/** This defines the sku conversion status object for asynchronous sku conversions. */
export interface StorageAccountSkuConversionStatus {
  /** This property indicates the current sku conversion status. */
  readonly skuConversionStatus?: SkuConversionStatus;
  /** This property represents the target sku name to which the account sku is being converted asynchronously. */
  targetSkuName?: SkuName;
  /** This property represents the sku conversion start time. */
  readonly startTime?: string;
  /** This property represents the sku conversion end time. */
  readonly endTime?: string;
}

export function storageAccountSkuConversionStatusDeserializer(
  item: any,
): StorageAccountSkuConversionStatus {
  return {
    skuConversionStatus: item["skuConversionStatus"],
    targetSkuName: item["targetSkuName"],
    startTime: item["startTime"],
    endTime: item["endTime"],
  };
}

/** This property indicates the current sku conversion status. */
export enum KnownSkuConversionStatus {
  /** InProgress */
  InProgress = "InProgress",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * This property indicates the current sku conversion status. \
 * {@link KnownSkuConversionStatus} can be used interchangeably with SkuConversionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Succeeded** \
 * **Failed**
 */
export type SkuConversionStatus = string;

/** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
export enum KnownDnsEndpointType {
  /** Standard */
  Standard = "Standard",
  /** AzureDnsZone */
  AzureDnsZone = "AzureDnsZone",
}

/**
 * Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. \
 * {@link KnownDnsEndpointType} can be used interchangeably with DnsEndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard** \
 * **AzureDnsZone**
 */
export type DnsEndpointType = string;

/** Geo Priority Replication enablement status for the storage account. */
export interface GeoPriorityReplicationStatus {
  /** Indicates whether Blob Geo Priority Replication is enabled for the storage account. */
  isBlobEnabled?: boolean;
}

export function geoPriorityReplicationStatusSerializer(item: GeoPriorityReplicationStatus): any {
  return { isBlobEnabled: item["isBlobEnabled"] };
}

export function geoPriorityReplicationStatusDeserializer(item: any): GeoPriorityReplicationStatus {
  return {
    isBlobEnabled: item["isBlobEnabled"],
  };
}

/** Defines shared key access properties for a storage account. */
export interface StorageAccountSharedKeyAccessProperties {
  /** Shared key access settings for Blob service. */
  blob?: ServiceSharedKeyAccessProperties;
  /** Shared key access settings for File service. */
  file?: ServiceSharedKeyAccessProperties;
  /** Shared key access settings for Table service. */
  table?: ServiceSharedKeyAccessProperties;
  /** Shared key access settings for Queue service. */
  queue?: ServiceSharedKeyAccessProperties;
}

export function storageAccountSharedKeyAccessPropertiesSerializer(
  item: StorageAccountSharedKeyAccessProperties,
): any {
  return {
    blob: !item["blob"] ? item["blob"] : serviceSharedKeyAccessPropertiesSerializer(item["blob"]),
    file: !item["file"] ? item["file"] : serviceSharedKeyAccessPropertiesSerializer(item["file"]),
    table: !item["table"]
      ? item["table"]
      : serviceSharedKeyAccessPropertiesSerializer(item["table"]),
    queue: !item["queue"]
      ? item["queue"]
      : serviceSharedKeyAccessPropertiesSerializer(item["queue"]),
  };
}

export function storageAccountSharedKeyAccessPropertiesDeserializer(
  item: any,
): StorageAccountSharedKeyAccessProperties {
  return {
    blob: !item["blob"] ? item["blob"] : serviceSharedKeyAccessPropertiesDeserializer(item["blob"]),
    file: !item["file"] ? item["file"] : serviceSharedKeyAccessPropertiesDeserializer(item["file"]),
    table: !item["table"]
      ? item["table"]
      : serviceSharedKeyAccessPropertiesDeserializer(item["table"]),
    queue: !item["queue"]
      ? item["queue"]
      : serviceSharedKeyAccessPropertiesDeserializer(item["queue"]),
  };
}

/** Defines shared key access settings for an individual storage service. */
export interface ServiceSharedKeyAccessProperties {
  /** Indicates whether shared key access is enabled for the service. */
  enabled?: boolean;
}

export function serviceSharedKeyAccessPropertiesSerializer(
  item: ServiceSharedKeyAccessProperties,
): any {
  return { enabled: item["enabled"] };
}

export function serviceSharedKeyAccessPropertiesDeserializer(
  item: any,
): ServiceSharedKeyAccessProperties {
  return {
    enabled: item["enabled"],
  };
}

/** Defines Data Collaboration Policy for a storage account. */
export interface StorageDataCollaborationPolicyProperties {
  /** Indicates whether storage connectors are allowed to created or managed on the storage account. */
  allowStorageConnectors?: boolean;
  /** Indicates whether data shares are allowed to be created or managed on the storage account. */
  allowStorageDataShares?: boolean;
  /** Indicates whether cross-entra tenant data sharing is allowed on the storage account. */
  allowCrossTenantDataSharing?: boolean;
}

export function storageDataCollaborationPolicyPropertiesSerializer(
  item: StorageDataCollaborationPolicyProperties,
): any {
  return {
    allowStorageConnectors: item["allowStorageConnectors"],
    allowStorageDataShares: item["allowStorageDataShares"],
    allowCrossTenantDataSharing: item["allowCrossTenantDataSharing"],
  };
}

export function storageDataCollaborationPolicyPropertiesDeserializer(
  item: any,
): StorageDataCollaborationPolicyProperties {
  return {
    allowStorageConnectors: item["allowStorageConnectors"],
    allowStorageDataShares: item["allowStorageDataShares"],
    allowCrossTenantDataSharing: item["allowCrossTenantDataSharing"],
  };
}

/** Indicates the type of storage account. */
export enum KnownKind {
  /** Storage */
  Storage = "Storage",
  /** StorageV2 */
  StorageV2 = "StorageV2",
  /** BlobStorage */
  BlobStorage = "BlobStorage",
  /** FileStorage */
  FileStorage = "FileStorage",
  /** BlockBlobStorage */
  BlockBlobStorage = "BlockBlobStorage",
}

/**
 * Indicates the type of storage account. \
 * {@link KnownKind} can be used interchangeably with Kind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Storage** \
 * **StorageV2** \
 * **BlobStorage** \
 * **FileStorage** \
 * **BlockBlobStorage**
 */
export type Kind = string;

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type: IdentityType;
  /** Gets or sets a list of key value pairs that describe the set of User Assigned identities that will be used with this storage account. The key is the ARM resource identifier of the identity. Only 1 User Assigned identity is permitted here. */
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

/** The identity type. */
export enum KnownIdentityType {
  /** None */
  None = "None",
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** UserAssigned */
  UserAssigned = "UserAssigned",
  /** SystemAssigned,UserAssigned */
  SystemAssignedUserAssigned = "SystemAssigned,UserAssigned",
}

/**
 * The identity type. \
 * {@link KnownIdentityType} can be used interchangeably with IdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None** \
 * **SystemAssigned** \
 * **UserAssigned** \
 * **SystemAssigned,UserAssigned**
 */
export type IdentityType = string;

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

/** UserAssignedIdentity for the resource. */
export interface UserAssignedIdentity {
  /** The principal ID of the identity. */
  readonly principalId?: string;
  /** The client ID of the identity. */
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

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of extendedLocation. */
export enum KnownExtendedLocationTypes {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**
 */
export type ExtendedLocationTypes = string;

/** The complex type of the zonal placement details. */
export interface Placement {
  /** The availability zone pinning policy for the storage account. */
  zonePlacementPolicy?: ZonePlacementPolicy;
}

export function placementSerializer(item: Placement): any {
  return { zonePlacementPolicy: item["zonePlacementPolicy"] };
}

export function placementDeserializer(item: any): Placement {
  return {
    zonePlacementPolicy: item["zonePlacementPolicy"],
  };
}

/** The availability zone pinning policy for the storage account. */
export enum KnownZonePlacementPolicy {
  /** Any */
  Any = "Any",
  /** None */
  None = "None",
}

/**
 * The availability zone pinning policy for the storage account. \
 * {@link KnownZonePlacementPolicy} can be used interchangeably with ZonePlacementPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Any** \
 * **None**
 */
export type ZonePlacementPolicy = string;

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

/** The parameters used when creating a storage account. */
export interface StorageAccountCreateParameters {
  /** Required. Gets or sets the SKU name. */
  sku: Sku;
  /** Required. Indicates the type of storage account. */
  kind: Kind;
  /** Required. Gets or sets the location of the resource. This will be one of the supported and registered Azure Geo Regions (e.g. West US, East US, Southeast Asia, etc.). The geo region of a resource cannot be changed once it is created, but if an identical geo region is specified on update, the request will succeed. */
  location: string;
  /** Optional. Set the extended location of the resource. If not set, the storage account will be created in Azure main region. Otherwise it will be created in the specified extended location */
  extendedLocation?: ExtendedLocation;
  /** Optional. Gets or sets the pinned logical availability zone for the storage account. */
  zones?: string[];
  /** Optional. Gets or sets the zonal placement details for the storage account. */
  placement?: Placement;
  /** Gets or sets a list of key value pairs that describe the resource. These tags can be used for viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key with a length no greater than 128 characters and a value with a length no greater than 256 characters. */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: Identity;
  /** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
  allowedCopyScope?: AllowedCopyScope;
  /** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** SasPolicy assigned to the storage account. */
  sasPolicy?: SasPolicy;
  /** KeyPolicy assigned to the storage account. */
  keyPolicy?: KeyPolicy;
  /** User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property. */
  customDomain?: CustomDomain;
  /** Encryption settings to be used for server-side encryption for the storage account. */
  encryption?: Encryption;
  /** Network rule set */
  networkRuleSet?: NetworkRuleSet;
  /** Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. */
  accessTier?: AccessTier;
  /** Provides the identity based authentication settings for Azure Files. */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /** Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01. */
  enableHttpsTrafficOnly?: boolean;
  /** Enables Secure File Transfer Protocol, if set to true */
  isSftpEnabled?: boolean;
  /** Enables local users feature, if set to true */
  isLocalUserEnabled?: boolean;
  /** Enables extended group support with local users feature, if set to true */
  enableExtendedGroups?: boolean;
  /** Account HierarchicalNamespace enabled if sets to true. */
  isHnsEnabled?: boolean;
  /** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
  largeFileSharesState?: LargeFileSharesState;
  /** Maintains information about the network routing choice opted by the user for data transfer */
  routingPreference?: RoutingPreference;
  /** Maintains information about the Internet protocol opted by the user. */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /** Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. */
  allowBlobPublicAccess?: boolean;
  /** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
  minimumTlsVersion?: MinimumTlsVersion;
  /** Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. */
  allowSharedKeyAccess?: boolean;
  /** NFS 3.0 protocol support enabled if set to true. */
  enableNfsV3?: boolean;
  /** Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. */
  allowCrossTenantReplication?: boolean;
  /** A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. */
  defaultToOAuthAuthentication?: boolean;
  /** The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default. */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
  dnsEndpointType?: DnsEndpointType;
  /** Status indicating whether Geo Priority Replication is enabled for the account. */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /** Indicate shared key access properties at service level */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /** Data Collaboration policy for the storage account. */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
}

export function storageAccountCreateParametersSerializer(
  item: StorageAccountCreateParameters,
): any {
  return {
    sku: skuSerializer(item["sku"]),
    kind: item["kind"],
    location: item["location"],
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    placement: !item["placement"] ? item["placement"] : placementSerializer(item["placement"]),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "allowedCopyScope",
      "publicNetworkAccess",
      "sasPolicy",
      "keyPolicy",
      "customDomain",
      "encryption",
      "NetworkRuleSet",
      "accessTier",
      "azureFilesIdentityBasedAuthentication",
      "EnableHttpsTrafficOnly",
      "IsSftpEnabled",
      "IsLocalUserEnabled",
      "EnableExtendedGroups",
      "IsHnsEnabled",
      "largeFileSharesState",
      "RoutingPreference",
      "dualStackEndpointPreference",
      "AllowBlobPublicAccess",
      "minimumTlsVersion",
      "allowSharedKeyAccess",
      "EnableNfsV3",
      "allowCrossTenantReplication",
      "defaultToOAuthAuthentication",
      "ImmutableStorageWithVersioning",
      "dnsEndpointType",
      "geoPriorityReplicationStatus",
      "allowSharedKeyAccessForServices",
      "dataCollaborationPolicyProperties",
    ])
      ? undefined
      : _storageAccountCreateParametersPropertiesSerializer(item),
  };
}

/** The parameters used to create the storage account. */
export interface StorageAccountPropertiesCreateParameters {
  /** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
  allowedCopyScope?: AllowedCopyScope;
  /** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** SasPolicy assigned to the storage account. */
  sasPolicy?: SasPolicy;
  /** KeyPolicy assigned to the storage account. */
  keyPolicy?: KeyPolicy;
  /** User domain assigned to the storage account. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property. */
  customDomain?: CustomDomain;
  /** Encryption settings to be used for server-side encryption for the storage account. */
  encryption?: Encryption;
  /** Network rule set */
  networkRuleSet?: NetworkRuleSet;
  /** Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. */
  accessTier?: AccessTier;
  /** Provides the identity based authentication settings for Azure Files. */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /** Allows https traffic only to storage service if sets to true. The default value is true since API version 2019-04-01. */
  enableHttpsTrafficOnly?: boolean;
  /** Enables Secure File Transfer Protocol, if set to true */
  isSftpEnabled?: boolean;
  /** Enables local users feature, if set to true */
  isLocalUserEnabled?: boolean;
  /** Enables extended group support with local users feature, if set to true */
  enableExtendedGroups?: boolean;
  /** Account HierarchicalNamespace enabled if sets to true. */
  isHnsEnabled?: boolean;
  /** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
  largeFileSharesState?: LargeFileSharesState;
  /** Maintains information about the network routing choice opted by the user for data transfer */
  routingPreference?: RoutingPreference;
  /** Maintains information about the Internet protocol opted by the user. */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /** Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. */
  allowBlobPublicAccess?: boolean;
  /** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
  minimumTlsVersion?: MinimumTlsVersion;
  /** Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. */
  allowSharedKeyAccess?: boolean;
  /** NFS 3.0 protocol support enabled if set to true. */
  enableNfsV3?: boolean;
  /** Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. */
  allowCrossTenantReplication?: boolean;
  /** A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. */
  defaultToOAuthAuthentication?: boolean;
  /** The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the new containers in the account by default. */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
  dnsEndpointType?: DnsEndpointType;
  /** Status indicating whether Geo Priority Replication is enabled for the account. */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /** Indicate shared key access properties at service level */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /** Data Collaboration policy for the storage account. */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
}

export function storageAccountPropertiesCreateParametersSerializer(
  item: StorageAccountPropertiesCreateParameters,
): any {
  return {
    allowedCopyScope: item["allowedCopyScope"],
    publicNetworkAccess: item["publicNetworkAccess"],
    sasPolicy: !item["sasPolicy"] ? item["sasPolicy"] : sasPolicySerializer(item["sasPolicy"]),
    keyPolicy: !item["keyPolicy"] ? item["keyPolicy"] : keyPolicySerializer(item["keyPolicy"]),
    customDomain: !item["customDomain"]
      ? item["customDomain"]
      : customDomainSerializer(item["customDomain"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAcls: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    accessTier: item["accessTier"],
    azureFilesIdentityBasedAuthentication: !item["azureFilesIdentityBasedAuthentication"]
      ? item["azureFilesIdentityBasedAuthentication"]
      : azureFilesIdentityBasedAuthenticationSerializer(
          item["azureFilesIdentityBasedAuthentication"],
        ),
    supportsHttpsTrafficOnly: item["enableHttpsTrafficOnly"],
    isSftpEnabled: item["isSftpEnabled"],
    isLocalUserEnabled: item["isLocalUserEnabled"],
    enableExtendedGroups: item["enableExtendedGroups"],
    isHnsEnabled: item["isHnsEnabled"],
    largeFileSharesState: item["largeFileSharesState"],
    routingPreference: !item["routingPreference"]
      ? item["routingPreference"]
      : routingPreferenceSerializer(item["routingPreference"]),
    dualStackEndpointPreference: !item["dualStackEndpointPreference"]
      ? item["dualStackEndpointPreference"]
      : dualStackEndpointPreferenceSerializer(item["dualStackEndpointPreference"]),
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    minimumTlsVersion: item["minimumTlsVersion"],
    allowSharedKeyAccess: item["allowSharedKeyAccess"],
    isNfsV3Enabled: item["enableNfsV3"],
    allowCrossTenantReplication: item["allowCrossTenantReplication"],
    defaultToOAuthAuthentication: item["defaultToOAuthAuthentication"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageAccountSerializer(item["immutableStorageWithVersioning"]),
    dnsEndpointType: item["dnsEndpointType"],
    geoPriorityReplicationStatus: !item["geoPriorityReplicationStatus"]
      ? item["geoPriorityReplicationStatus"]
      : geoPriorityReplicationStatusSerializer(item["geoPriorityReplicationStatus"]),
    allowSharedKeyAccessForServices: !item["allowSharedKeyAccessForServices"]
      ? item["allowSharedKeyAccessForServices"]
      : storageAccountSharedKeyAccessPropertiesSerializer(item["allowSharedKeyAccessForServices"]),
    dataCollaborationPolicyProperties: !item["dataCollaborationPolicyProperties"]
      ? item["dataCollaborationPolicyProperties"]
      : storageDataCollaborationPolicyPropertiesSerializer(
          item["dataCollaborationPolicyProperties"],
        ),
  };
}

/** The parameters that can be provided when updating the storage account properties. */
export interface StorageAccountUpdateParameters {
  /** Gets or sets the SKU name. Note that the SKU name cannot be updated to Standard_ZRS, Premium_LRS or Premium_ZRS, nor can accounts of those SKU names be updated to any other value. */
  sku?: Sku;
  /** Gets or sets a list of key value pairs that describe the resource. These tags can be used in viewing and grouping this resource (across resource groups). A maximum of 15 tags can be provided for a resource. Each tag must have a key no greater in length than 128 characters and a value no greater in length than 256 characters. */
  tags?: Record<string, string>;
  /** The identity of the resource. */
  identity?: Identity;
  /** Optional. Indicates the type of storage account. Currently only StorageV2 value supported by server. */
  kind?: Kind;
  /** Optional. Gets or sets the pinned logical availability zone for the storage account. */
  zones?: string[];
  /** Optional. Gets or sets the zonal placement details for the storage account. */
  placement?: Placement;
  /** Custom domain assigned to the storage account by the user. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property. */
  customDomain?: CustomDomain;
  /** Not applicable. Azure Storage encryption at rest is enabled by default for all storage accounts and cannot be disabled. */
  encryption?: Encryption;
  /** SasPolicy assigned to the storage account. */
  sasPolicy?: SasPolicy;
  /** KeyPolicy assigned to the storage account. */
  keyPolicy?: KeyPolicy;
  /** Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. */
  accessTier?: AccessTier;
  /** Provides the identity based authentication settings for Azure Files. */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /** Allows https traffic only to storage service if sets to true. */
  enableHttpsTrafficOnly?: boolean;
  /** Enables Secure File Transfer Protocol, if set to true */
  isSftpEnabled?: boolean;
  /** Enables local users feature, if set to true */
  isLocalUserEnabled?: boolean;
  /** Enables extended group support with local users feature, if set to true */
  enableExtendedGroups?: boolean;
  /** Network rule set */
  networkRuleSet?: NetworkRuleSet;
  /** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
  largeFileSharesState?: LargeFileSharesState;
  /** Maintains information about the network routing choice opted by the user for data transfer */
  routingPreference?: RoutingPreference;
  /** Maintains information about the Internet protocol opted by the user. */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /** Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. */
  allowBlobPublicAccess?: boolean;
  /** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
  minimumTlsVersion?: MinimumTlsVersion;
  /** Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. */
  allowSharedKeyAccess?: boolean;
  /** Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. */
  allowCrossTenantReplication?: boolean;
  /** A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. */
  defaultToOAuthAuthentication?: boolean;
  /** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the containers in the account by default. */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
  allowedCopyScope?: AllowedCopyScope;
  /** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
  dnsEndpointType?: DnsEndpointType;
  /** Status indicating whether Geo Priority Replication is enabled for the account. */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /** Indicate shared key access properties at service level */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /** Data Collaboration policy for the storage account. */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
}

export function storageAccountUpdateParametersSerializer(
  item: StorageAccountUpdateParameters,
): any {
  return {
    sku: !item["sku"] ? item["sku"] : skuSerializer(item["sku"]),
    tags: item["tags"],
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, [
      "customDomain",
      "encryption",
      "sasPolicy",
      "keyPolicy",
      "accessTier",
      "azureFilesIdentityBasedAuthentication",
      "EnableHttpsTrafficOnly",
      "IsSftpEnabled",
      "IsLocalUserEnabled",
      "EnableExtendedGroups",
      "NetworkRuleSet",
      "largeFileSharesState",
      "RoutingPreference",
      "dualStackEndpointPreference",
      "AllowBlobPublicAccess",
      "minimumTlsVersion",
      "allowSharedKeyAccess",
      "allowCrossTenantReplication",
      "defaultToOAuthAuthentication",
      "publicNetworkAccess",
      "ImmutableStorageWithVersioning",
      "allowedCopyScope",
      "dnsEndpointType",
      "geoPriorityReplicationStatus",
      "allowSharedKeyAccessForServices",
      "dataCollaborationPolicyProperties",
    ])
      ? undefined
      : _storageAccountUpdateParametersPropertiesSerializer(item),
    kind: item["kind"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    placement: !item["placement"] ? item["placement"] : placementSerializer(item["placement"]),
  };
}

/** The parameters used when updating a storage account. */
export interface StorageAccountPropertiesUpdateParameters {
  /** Custom domain assigned to the storage account by the user. Name is the CNAME source. Only one custom domain is supported per storage account at this time. To clear the existing custom domain, use an empty string for the custom domain name property. */
  customDomain?: CustomDomain;
  /** Not applicable. Azure Storage encryption at rest is enabled by default for all storage accounts and cannot be disabled. */
  encryption?: Encryption;
  /** SasPolicy assigned to the storage account. */
  sasPolicy?: SasPolicy;
  /** KeyPolicy assigned to the storage account. */
  keyPolicy?: KeyPolicy;
  /** Required for storage accounts where kind = BlobStorage. The access tier is used for billing. The 'Premium' access tier is the default value for premium block blobs storage account type and it cannot be changed for the premium block blobs storage account type. */
  accessTier?: AccessTier;
  /** Provides the identity based authentication settings for Azure Files. */
  azureFilesIdentityBasedAuthentication?: AzureFilesIdentityBasedAuthentication;
  /** Allows https traffic only to storage service if sets to true. */
  enableHttpsTrafficOnly?: boolean;
  /** Enables Secure File Transfer Protocol, if set to true */
  isSftpEnabled?: boolean;
  /** Enables local users feature, if set to true */
  isLocalUserEnabled?: boolean;
  /** Enables extended group support with local users feature, if set to true */
  enableExtendedGroups?: boolean;
  /** Network rule set */
  networkRuleSet?: NetworkRuleSet;
  /** Allow large file shares if sets to Enabled. It cannot be disabled once it is enabled. */
  largeFileSharesState?: LargeFileSharesState;
  /** Maintains information about the network routing choice opted by the user for data transfer */
  routingPreference?: RoutingPreference;
  /** Maintains information about the Internet protocol opted by the user. */
  dualStackEndpointPreference?: DualStackEndpointPreference;
  /** Allow or disallow public access to all blobs or containers in the storage account. The default interpretation is false for this property. */
  allowBlobPublicAccess?: boolean;
  /** Set the minimum TLS version to be permitted on requests to storage. The default interpretation is TLS 1.0 for this property. Minimum TLS version 1.3 version is not supported. */
  minimumTlsVersion?: MinimumTlsVersion;
  /** Indicates whether the storage account permits requests to be authorized with the account access key via Shared Key. If false, then all requests, including shared access signatures, must be authorized with Azure Active Directory (Azure AD). The default value is null, which is equivalent to true. */
  allowSharedKeyAccess?: boolean;
  /** Allow or disallow cross AAD tenant object replication. Set this property to true for new or existing accounts only if object replication policies will involve storage accounts in different AAD tenants. The default interpretation is false for new accounts to follow best security practices by default. */
  allowCrossTenantReplication?: boolean;
  /** A boolean flag which indicates whether the default authentication is OAuth or not. The default interpretation is false for this property. */
  defaultToOAuthAuthentication?: boolean;
  /** Allow, disallow, or let Network Security Perimeter configuration to evaluate public network access to Storage Account. Value is optional but if passed in, must be 'Enabled', 'Disabled' or 'SecuredByPerimeter'. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The property is immutable and can only be set to true at the account creation time. When set to true, it enables object level immutability for all the containers in the account by default. */
  immutableStorageWithVersioning?: ImmutableStorageAccount;
  /** Restrict copy to and from Storage Accounts within an AAD tenant or with Private Links to the same VNet. */
  allowedCopyScope?: AllowedCopyScope;
  /** Allows you to specify the type of endpoint. Set this to AzureDNSZone to create a large number of accounts in a single subscription, which creates accounts in an Azure DNS Zone and the endpoint URL will have an alphanumeric DNS Zone identifier. */
  dnsEndpointType?: DnsEndpointType;
  /** Status indicating whether Geo Priority Replication is enabled for the account. */
  geoPriorityReplicationStatus?: GeoPriorityReplicationStatus;
  /** Indicate shared key access properties at service level */
  allowSharedKeyAccessForServices?: StorageAccountSharedKeyAccessProperties;
  /** Data Collaboration policy for the storage account. */
  dataCollaborationPolicyProperties?: StorageDataCollaborationPolicyProperties;
}

export function storageAccountPropertiesUpdateParametersSerializer(
  item: StorageAccountPropertiesUpdateParameters,
): any {
  return {
    customDomain: !item["customDomain"]
      ? item["customDomain"]
      : customDomainSerializer(item["customDomain"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    sasPolicy: !item["sasPolicy"] ? item["sasPolicy"] : sasPolicySerializer(item["sasPolicy"]),
    keyPolicy: !item["keyPolicy"] ? item["keyPolicy"] : keyPolicySerializer(item["keyPolicy"]),
    accessTier: item["accessTier"],
    azureFilesIdentityBasedAuthentication: !item["azureFilesIdentityBasedAuthentication"]
      ? item["azureFilesIdentityBasedAuthentication"]
      : azureFilesIdentityBasedAuthenticationSerializer(
          item["azureFilesIdentityBasedAuthentication"],
        ),
    supportsHttpsTrafficOnly: item["enableHttpsTrafficOnly"],
    isSftpEnabled: item["isSftpEnabled"],
    isLocalUserEnabled: item["isLocalUserEnabled"],
    enableExtendedGroups: item["enableExtendedGroups"],
    networkAcls: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    largeFileSharesState: item["largeFileSharesState"],
    routingPreference: !item["routingPreference"]
      ? item["routingPreference"]
      : routingPreferenceSerializer(item["routingPreference"]),
    dualStackEndpointPreference: !item["dualStackEndpointPreference"]
      ? item["dualStackEndpointPreference"]
      : dualStackEndpointPreferenceSerializer(item["dualStackEndpointPreference"]),
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    minimumTlsVersion: item["minimumTlsVersion"],
    allowSharedKeyAccess: item["allowSharedKeyAccess"],
    allowCrossTenantReplication: item["allowCrossTenantReplication"],
    defaultToOAuthAuthentication: item["defaultToOAuthAuthentication"],
    publicNetworkAccess: item["publicNetworkAccess"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageAccountSerializer(item["immutableStorageWithVersioning"]),
    allowedCopyScope: item["allowedCopyScope"],
    dnsEndpointType: item["dnsEndpointType"],
    geoPriorityReplicationStatus: !item["geoPriorityReplicationStatus"]
      ? item["geoPriorityReplicationStatus"]
      : geoPriorityReplicationStatusSerializer(item["geoPriorityReplicationStatus"]),
    allowSharedKeyAccessForServices: !item["allowSharedKeyAccessForServices"]
      ? item["allowSharedKeyAccessForServices"]
      : storageAccountSharedKeyAccessPropertiesSerializer(item["allowSharedKeyAccessForServices"]),
    dataCollaborationPolicyProperties: !item["dataCollaborationPolicyProperties"]
      ? item["dataCollaborationPolicyProperties"]
      : storageDataCollaborationPolicyPropertiesSerializer(
          item["dataCollaborationPolicyProperties"],
        ),
  };
}

/** The response of a StorageAccount list operation. */
export interface _StorageAccountListResult {
  /** The StorageAccount items on this page */
  value: StorageAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageAccountListResultDeserializer(item: any): _StorageAccountListResult {
  return {
    value: storageAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageAccountArrayDeserializer(result: Array<StorageAccount>): any[] {
  return result.map((item) => {
    return storageAccountDeserializer(item);
  });
}

/** The response from the ListKeys operation. */
export interface StorageAccountListKeysResult {
  /** Gets the list of storage account keys and their properties for the specified storage account. */
  readonly keys?: StorageAccountKey[];
}

export function storageAccountListKeysResultDeserializer(item: any): StorageAccountListKeysResult {
  return {
    keys: !item["keys"] ? item["keys"] : storageAccountKeyArrayDeserializer(item["keys"]),
  };
}

export function storageAccountKeyArrayDeserializer(result: Array<StorageAccountKey>): any[] {
  return result.map((item) => {
    return storageAccountKeyDeserializer(item);
  });
}

/** An access key for the storage account. */
export interface StorageAccountKey {
  /** Name of the key. */
  readonly keyName?: string;
  /** Base 64-encoded value of the key. */
  readonly value?: string;
  /** Permissions for the key -- read-only or full permissions. */
  readonly permissions?: KeyPermission;
  /** Creation time of the key, in round trip date format. */
  readonly creationTime?: Date;
}

export function storageAccountKeyDeserializer(item: any): StorageAccountKey {
  return {
    keyName: item["keyName"],
    value: item["value"],
    permissions: item["permissions"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
  };
}

/** Permissions for the key -- read-only or full permissions. */
export type KeyPermission = "Read" | "Full";

/** The parameters used to regenerate the storage account key. */
export interface StorageAccountRegenerateKeyParameters {
  /** The name of storage keys that want to be regenerated, possible values are key1, key2, kerb1, kerb2. */
  keyName: string;
}

export function storageAccountRegenerateKeyParametersSerializer(
  item: StorageAccountRegenerateKeyParameters,
): any {
  return { keyName: item["keyName"] };
}

/** The parameters to list SAS credentials of a storage account. */
export interface AccountSasParameters {
  /** The signed services accessible with the account SAS. Possible values include: Blob (b), Queue (q), Table (t), File (f). */
  services: Services;
  /** The signed resource types that are accessible with the account SAS. Service (s): Access to service-level APIs; Container (c): Access to container-level APIs; Object (o): Access to object-level APIs for blobs, queue messages, table entities, and files. */
  resourceTypes: SignedResourceTypes;
  /** The signed permissions for the account SAS. Possible values include: Read (r), Write (w), Delete (d), List (l), Add (a), Create (c), Update (u) and Process (p). */
  permissions: Permissions;
  /** An IP address or a range of IP addresses from which to accept requests. */
  iPAddressOrRange?: string;
  /** The protocol permitted for a request made with the account SAS. */
  protocols?: HttpProtocol;
  /** The time at which the SAS becomes valid. */
  sharedAccessStartTime?: Date;
  /** The time at which the shared access signature becomes invalid. */
  sharedAccessExpiryTime: Date;
  /** The key to sign the account SAS token with. */
  keyToSign?: string;
}

export function accountSasParametersSerializer(item: AccountSasParameters): any {
  return {
    signedServices: item["services"],
    signedResourceTypes: item["resourceTypes"],
    signedPermission: item["permissions"],
    signedIp: item["iPAddressOrRange"],
    signedProtocol: item["protocols"],
    signedStart: !item["sharedAccessStartTime"]
      ? item["sharedAccessStartTime"]
      : item["sharedAccessStartTime"].toISOString(),
    signedExpiry: item["sharedAccessExpiryTime"].toISOString(),
    keyToSign: item["keyToSign"],
  };
}

/** The signed services accessible with the account SAS. Possible values include: Blob (b), Queue (q), Table (t), File (f). */
export enum KnownServices {
  /** b */
  B = "b",
  /** q */
  Q = "q",
  /** t */
  T = "t",
  /** f */
  F = "f",
}

/**
 * The signed services accessible with the account SAS. Possible values include: Blob (b), Queue (q), Table (t), File (f). \
 * {@link KnownServices} can be used interchangeably with Services,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **b** \
 * **q** \
 * **t** \
 * **f**
 */
export type Services = string;

/** The signed resource types that are accessible with the account SAS. Service (s): Access to service-level APIs; Container (c): Access to container-level APIs; Object (o): Access to object-level APIs for blobs, queue messages, table entities, and files. */
export enum KnownSignedResourceTypes {
  /** s */
  S = "s",
  /** c */
  C = "c",
  /** o */
  O = "o",
}

/**
 * The signed resource types that are accessible with the account SAS. Service (s): Access to service-level APIs; Container (c): Access to container-level APIs; Object (o): Access to object-level APIs for blobs, queue messages, table entities, and files. \
 * {@link KnownSignedResourceTypes} can be used interchangeably with SignedResourceTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **s** \
 * **c** \
 * **o**
 */
export type SignedResourceTypes = string;

/** The signed permissions for the account SAS. Possible values include: Read (r), Write (w), Delete (d), List (l), Add (a), Create (c), Update (u) and Process (p). */
export enum KnownPermissions {
  /** r */
  R = "r",
  /** d */
  D = "d",
  /** w */
  W = "w",
  /** l */
  L = "l",
  /** a */
  A = "a",
  /** c */
  C = "c",
  /** u */
  U = "u",
  /** p */
  P = "p",
}

/**
 * The signed permissions for the account SAS. Possible values include: Read (r), Write (w), Delete (d), List (l), Add (a), Create (c), Update (u) and Process (p). \
 * {@link KnownPermissions} can be used interchangeably with Permissions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **r** \
 * **d** \
 * **w** \
 * **l** \
 * **a** \
 * **c** \
 * **u** \
 * **p**
 */
export type Permissions = string;
/** The protocol permitted for a request made with the account SAS. */
export type HttpProtocol = "https,http" | "https";

/** The List SAS credentials operation response. */
export interface ListAccountSasResponse {
  /** List SAS credentials of storage account. */
  readonly accountSasToken?: string;
}

export function listAccountSasResponseDeserializer(item: any): ListAccountSasResponse {
  return {
    accountSasToken: item["accountSasToken"],
  };
}

/** The parameters to list service SAS credentials of a specific resource. */
export interface ServiceSasParameters {
  /** The canonical path to the signed resource. */
  canonicalizedResource: string;
  /** The signed services accessible with the service SAS. Possible values include: Blob (b), Container (c), File (f), Share (s). */
  resource?: SignedResource;
  /** The signed permissions for the service SAS. Possible values include: Read (r), Write (w), Delete (d), List (l), Add (a), Create (c), Update (u) and Process (p). */
  permissions?: Permissions;
  /** An IP address or a range of IP addresses from which to accept requests. */
  iPAddressOrRange?: string;
  /** The protocol permitted for a request made with the account SAS. */
  protocols?: HttpProtocol;
  /** The time at which the SAS becomes valid. */
  sharedAccessStartTime?: Date;
  /** The time at which the shared access signature becomes invalid. */
  sharedAccessExpiryTime?: Date;
  /** A unique value up to 64 characters in length that correlates to an access policy specified for the container, queue, or table. */
  identifier?: string;
  /** The start of partition key. */
  partitionKeyStart?: string;
  /** The end of partition key. */
  partitionKeyEnd?: string;
  /** The start of row key. */
  rowKeyStart?: string;
  /** The end of row key. */
  rowKeyEnd?: string;
  /** The key to sign the account SAS token with. */
  keyToSign?: string;
  /** The response header override for cache control. */
  cacheControl?: string;
  /** The response header override for content disposition. */
  contentDisposition?: string;
  /** The response header override for content encoding. */
  contentEncoding?: string;
  /** The response header override for content language. */
  contentLanguage?: string;
  /** The response header override for content type. */
  contentType?: string;
}

export function serviceSasParametersSerializer(item: ServiceSasParameters): any {
  return {
    canonicalizedResource: item["canonicalizedResource"],
    signedResource: item["resource"],
    signedPermission: item["permissions"],
    signedIp: item["iPAddressOrRange"],
    signedProtocol: item["protocols"],
    signedStart: !item["sharedAccessStartTime"]
      ? item["sharedAccessStartTime"]
      : item["sharedAccessStartTime"].toISOString(),
    signedExpiry: !item["sharedAccessExpiryTime"]
      ? item["sharedAccessExpiryTime"]
      : item["sharedAccessExpiryTime"].toISOString(),
    signedIdentifier: item["identifier"],
    startPk: item["partitionKeyStart"],
    endPk: item["partitionKeyEnd"],
    startRk: item["rowKeyStart"],
    endRk: item["rowKeyEnd"],
    keyToSign: item["keyToSign"],
    rscc: item["cacheControl"],
    rscd: item["contentDisposition"],
    rsce: item["contentEncoding"],
    rscl: item["contentLanguage"],
    rsct: item["contentType"],
  };
}

/** The signed services accessible with the service SAS. Possible values include: Blob (b), Container (c), File (f), Share (s). */
export enum KnownSignedResource {
  /** b */
  B = "b",
  /** c */
  C = "c",
  /** f */
  F = "f",
  /** s */
  S = "s",
}

/**
 * The signed services accessible with the service SAS. Possible values include: Blob (b), Container (c), File (f), Share (s). \
 * {@link KnownSignedResource} can be used interchangeably with SignedResource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **b** \
 * **c** \
 * **f** \
 * **s**
 */
export type SignedResource = string;

/** The List service SAS credentials operation response. */
export interface ListServiceSasResponse {
  /** List service SAS credentials of specific resource. */
  readonly serviceSasToken?: string;
}

export function listServiceSasResponseDeserializer(item: any): ListServiceSasResponse {
  return {
    serviceSasToken: item["serviceSasToken"],
  };
}

/** The parameters or status associated with an ongoing or enqueued storage account migration in order to update its current SKU or region. */
export interface StorageAccountMigration extends ProxyResource {
  /** Target sku name for the account */
  targetSkuName: SkuName;
  /** Current status of migration */
  readonly migrationStatus?: MigrationStatus;
  /** Error code for migration failure */
  readonly migrationFailedReason?: string;
  /** Reason for migration failure */
  readonly migrationFailedDetailedReason?: string;
}

export function storageAccountMigrationSerializer(item: StorageAccountMigration): any {
  return { properties: _storageAccountMigrationPropertiesSerializer(item) };
}

export function storageAccountMigrationDeserializer(item: any): StorageAccountMigration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._storageAccountMigrationPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a storage account's ongoing or enqueued migration. */
export interface StorageAccountMigrationProperties {
  /** Target sku name for the account */
  targetSkuName: SkuName;
  /** Current status of migration */
  readonly migrationStatus?: MigrationStatus;
  /** Error code for migration failure */
  readonly migrationFailedReason?: string;
  /** Reason for migration failure */
  readonly migrationFailedDetailedReason?: string;
}

export function storageAccountMigrationPropertiesSerializer(
  item: StorageAccountMigrationProperties,
): any {
  return { targetSkuName: item["targetSkuName"] };
}

export function storageAccountMigrationPropertiesDeserializer(
  item: any,
): StorageAccountMigrationProperties {
  return {
    targetSkuName: item["targetSkuName"],
    migrationStatus: item["migrationStatus"],
    migrationFailedReason: item["migrationFailedReason"],
    migrationFailedDetailedReason: item["migrationFailedDetailedReason"],
  };
}

/** Current status of migration */
export enum KnownMigrationStatus {
  /** Invalid */
  Invalid = "Invalid",
  /** SubmittedForConversion */
  SubmittedForConversion = "SubmittedForConversion",
  /** InProgress */
  InProgress = "InProgress",
  /** Complete */
  Complete = "Complete",
  /** Failed */
  Failed = "Failed",
}

/**
 * Current status of migration \
 * {@link KnownMigrationStatus} can be used interchangeably with MigrationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **SubmittedForConversion** \
 * **InProgress** \
 * **Complete** \
 * **Failed**
 */
export type MigrationStatus = string;

/** Known values of {@link MigrationName} that the service accepts. */
export enum KnownMigrationName {
  /** default */
  Default = "default",
}

/** Type of MigrationName */
export type MigrationName = string;

/** Properties of the file share, including Id, resource name, resource type, Etag. */
export interface FileShare extends ProxyResource {
  /** Resource Etag. */
  readonly etag?: string;
  /** Returns the date and time the share was last modified. */
  readonly lastModifiedTime?: Date;
  /** A name-value pair to associate with the share as metadata. */
  metadata?: Record<string, string>;
  /** The provisioned size of the share, in gibibytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. For file shares created under Files Provisioned v2 account type, please refer to the GetFileServiceUsage API response for the minimum and maximum allowed provisioned storage size. */
  shareQuota?: number;
  /** The provisioned IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned IOPS. */
  provisionedIops?: number;
  /** The provisioned bandwidth of the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned bandwidth. */
  provisionedBandwidthMibps?: number;
  /** The calculated burst IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly includedBurstIops?: number;
  /** The calculated maximum burst credits for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly maxBurstCreditsForIops?: number;
  /** Returns the next allowed provisioned storage size downgrade time for the share. This property is only for file shares created under Files Provisioned v1 SSD and Files Provisioned v2 account type */
  readonly nextAllowedQuotaDowngradeTime?: Date;
  /** Returns the next allowed provisioned IOPS downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly nextAllowedProvisionedIopsDowngradeTime?: Date;
  /** Returns the next allowed provisioned bandwidth downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly nextAllowedProvisionedBandwidthDowngradeTime?: Date;
  /** The authentication protocol that is used for the file share. Can only be specified when creating a share. */
  enabledProtocols?: EnabledProtocols;
  /** The property is for NFS share only. The default is NoRootSquash. */
  rootSquash?: RootSquashType;
  /** The version of the share. */
  readonly version?: string;
  /** Indicates whether the share was deleted. */
  readonly deleted?: boolean;
  /** The deleted time if the share was deleted. */
  readonly deletedTime?: Date;
  /** Remaining retention days for share that was soft deleted. */
  readonly remainingRetentionDays?: number;
  /** Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. */
  accessTier?: ShareAccessTier;
  /** Indicates the last modification time for share access tier. */
  readonly accessTierChangeTime?: Date;
  /** Indicates if there is a pending transition for access tier. */
  readonly accessTierStatus?: string;
  /** The approximate size of the data stored on the share. Note that this value may not include all recently created or recently resized files. */
  readonly shareUsageBytes?: number;
  /** The lease status of the share. */
  readonly leaseStatus?: LeaseStatus;
  /** Lease state of the share. */
  readonly leaseState?: LeaseState;
  /** Specifies whether the lease on a share is of infinite or fixed duration, only when the share is leased. */
  readonly leaseDuration?: LeaseDuration;
  /** List of stored access policies specified on the share. */
  signedIdentifiers?: SignedIdentifier[];
  /** Creation time of share snapshot returned in the response of list shares with expand param "snapshots". */
  readonly snapshotTime?: Date;
  /** File Share Paid Bursting properties. */
  fileSharePaidBursting?: FileSharePropertiesFileSharePaidBursting;
}

export function fileShareSerializer(item: FileShare): any {
  return {
    properties: areAllPropsUndefined(item, [
      "metadata",
      "shareQuota",
      "provisionedIops",
      "provisionedBandwidthMibps",
      "enabledProtocols",
      "rootSquash",
      "accessTier",
      "signedIdentifiers",
      "fileSharePaidBursting",
    ])
      ? undefined
      : _fileSharePropertiesSerializer(item),
  };
}

export function fileShareDeserializer(item: any): FileShare {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileSharePropertiesDeserializer(item["properties"])),
    etag: item["etag"],
  };
}

/** The properties of the file share. */
export interface FileShareProperties {
  /** Returns the date and time the share was last modified. */
  readonly lastModifiedTime?: Date;
  /** A name-value pair to associate with the share as metadata. */
  metadata?: Record<string, string>;
  /** The provisioned size of the share, in gibibytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. For file shares created under Files Provisioned v2 account type, please refer to the GetFileServiceUsage API response for the minimum and maximum allowed provisioned storage size. */
  shareQuota?: number;
  /** The provisioned IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned IOPS. */
  provisionedIops?: number;
  /** The provisioned bandwidth of the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned bandwidth. */
  provisionedBandwidthMibps?: number;
  /** The calculated burst IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly includedBurstIops?: number;
  /** The calculated maximum burst credits for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly maxBurstCreditsForIops?: number;
  /** Returns the next allowed provisioned storage size downgrade time for the share. This property is only for file shares created under Files Provisioned v1 SSD and Files Provisioned v2 account type */
  readonly nextAllowedQuotaDowngradeTime?: Date;
  /** Returns the next allowed provisioned IOPS downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly nextAllowedProvisionedIopsDowngradeTime?: Date;
  /** Returns the next allowed provisioned bandwidth downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly nextAllowedProvisionedBandwidthDowngradeTime?: Date;
  /** The authentication protocol that is used for the file share. Can only be specified when creating a share. */
  enabledProtocols?: EnabledProtocols;
  /** The property is for NFS share only. The default is NoRootSquash. */
  rootSquash?: RootSquashType;
  /** The version of the share. */
  readonly version?: string;
  /** Indicates whether the share was deleted. */
  readonly deleted?: boolean;
  /** The deleted time if the share was deleted. */
  readonly deletedTime?: Date;
  /** Remaining retention days for share that was soft deleted. */
  readonly remainingRetentionDays?: number;
  /** Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. */
  accessTier?: ShareAccessTier;
  /** Indicates the last modification time for share access tier. */
  readonly accessTierChangeTime?: Date;
  /** Indicates if there is a pending transition for access tier. */
  readonly accessTierStatus?: string;
  /** The approximate size of the data stored on the share. Note that this value may not include all recently created or recently resized files. */
  readonly shareUsageBytes?: number;
  /** The lease status of the share. */
  readonly leaseStatus?: LeaseStatus;
  /** Lease state of the share. */
  readonly leaseState?: LeaseState;
  /** Specifies whether the lease on a share is of infinite or fixed duration, only when the share is leased. */
  readonly leaseDuration?: LeaseDuration;
  /** List of stored access policies specified on the share. */
  signedIdentifiers?: SignedIdentifier[];
  /** Creation time of share snapshot returned in the response of list shares with expand param "snapshots". */
  readonly snapshotTime?: Date;
  /** File Share Paid Bursting properties. */
  fileSharePaidBursting?: FileSharePropertiesFileSharePaidBursting;
}

export function fileSharePropertiesSerializer(item: FileShareProperties): any {
  return {
    metadata: item["metadata"],
    shareQuota: item["shareQuota"],
    provisionedIops: item["provisionedIops"],
    provisionedBandwidthMibps: item["provisionedBandwidthMibps"],
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    accessTier: item["accessTier"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : signedIdentifierArraySerializer(item["signedIdentifiers"]),
    fileSharePaidBursting: !item["fileSharePaidBursting"]
      ? item["fileSharePaidBursting"]
      : fileSharePropertiesFileSharePaidBurstingSerializer(item["fileSharePaidBursting"]),
  };
}

export function fileSharePropertiesDeserializer(item: any): FileShareProperties {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    shareQuota: item["shareQuota"],
    provisionedIops: item["provisionedIops"],
    provisionedBandwidthMibps: item["provisionedBandwidthMibps"],
    includedBurstIops: item["includedBurstIops"],
    maxBurstCreditsForIops: item["maxBurstCreditsForIops"],
    nextAllowedQuotaDowngradeTime: !item["nextAllowedQuotaDowngradeTime"]
      ? item["nextAllowedQuotaDowngradeTime"]
      : new Date(item["nextAllowedQuotaDowngradeTime"]),
    nextAllowedProvisionedIopsDowngradeTime: !item["nextAllowedProvisionedIopsDowngradeTime"]
      ? item["nextAllowedProvisionedIopsDowngradeTime"]
      : new Date(item["nextAllowedProvisionedIopsDowngradeTime"]),
    nextAllowedProvisionedBandwidthDowngradeTime: !item[
      "nextAllowedProvisionedBandwidthDowngradeTime"
    ]
      ? item["nextAllowedProvisionedBandwidthDowngradeTime"]
      : new Date(item["nextAllowedProvisionedBandwidthDowngradeTime"]),
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    version: item["version"],
    deleted: item["deleted"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTier: item["accessTier"],
    accessTierChangeTime: !item["accessTierChangeTime"]
      ? item["accessTierChangeTime"]
      : new Date(item["accessTierChangeTime"]),
    accessTierStatus: item["accessTierStatus"],
    shareUsageBytes: item["shareUsageBytes"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : signedIdentifierArrayDeserializer(item["signedIdentifiers"]),
    snapshotTime: !item["snapshotTime"] ? item["snapshotTime"] : new Date(item["snapshotTime"]),
    fileSharePaidBursting: !item["fileSharePaidBursting"]
      ? item["fileSharePaidBursting"]
      : fileSharePropertiesFileSharePaidBurstingDeserializer(item["fileSharePaidBursting"]),
  };
}

/** The authentication protocol that is used for the file share. Can only be specified when creating a share. */
export enum KnownEnabledProtocols {
  /** SMB */
  SMB = "SMB",
  /** NFS */
  NFS = "NFS",
}

/**
 * The authentication protocol that is used for the file share. Can only be specified when creating a share. \
 * {@link KnownEnabledProtocols} can be used interchangeably with EnabledProtocols,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SMB** \
 * **NFS**
 */
export type EnabledProtocols = string;

/** The property is for NFS share only. The default is NoRootSquash. */
export enum KnownRootSquashType {
  /** NoRootSquash */
  NoRootSquash = "NoRootSquash",
  /** RootSquash */
  RootSquash = "RootSquash",
  /** AllSquash */
  AllSquash = "AllSquash",
}

/**
 * The property is for NFS share only. The default is NoRootSquash. \
 * {@link KnownRootSquashType} can be used interchangeably with RootSquashType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoRootSquash** \
 * **RootSquash** \
 * **AllSquash**
 */
export type RootSquashType = string;

/** Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. */
export enum KnownShareAccessTier {
  /** TransactionOptimized */
  TransactionOptimized = "TransactionOptimized",
  /** Hot */
  Hot = "Hot",
  /** Cool */
  Cool = "Cool",
  /** Premium */
  Premium = "Premium",
}

/**
 * Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. \
 * {@link KnownShareAccessTier} can be used interchangeably with ShareAccessTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TransactionOptimized** \
 * **Hot** \
 * **Cool** \
 * **Premium**
 */
export type ShareAccessTier = string;

export function signedIdentifierArraySerializer(result: Array<SignedIdentifier>): any[] {
  return result.map((item) => {
    return signedIdentifierSerializer(item);
  });
}

export function signedIdentifierArrayDeserializer(result: Array<SignedIdentifier>): any[] {
  return result.map((item) => {
    return signedIdentifierDeserializer(item);
  });
}

/** model interface SignedIdentifier */
export interface SignedIdentifier {
  /** An unique identifier of the stored access policy. */
  id?: string;
  /** Access policy */
  accessPolicy?: AccessPolicy;
}

export function signedIdentifierSerializer(item: SignedIdentifier): any {
  return {
    id: item["id"],
    accessPolicy: !item["accessPolicy"]
      ? item["accessPolicy"]
      : accessPolicySerializer(item["accessPolicy"]),
  };
}

export function signedIdentifierDeserializer(item: any): SignedIdentifier {
  return {
    id: item["id"],
    accessPolicy: !item["accessPolicy"]
      ? item["accessPolicy"]
      : accessPolicyDeserializer(item["accessPolicy"]),
  };
}

/** model interface AccessPolicy */
export interface AccessPolicy {
  /** Start time of the access policy */
  startTime?: Date;
  /** Expiry time of the access policy */
  expiryTime?: Date;
  /** List of abbreviated permissions. */
  permission?: string;
}

export function accessPolicySerializer(item: AccessPolicy): any {
  return {
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    permission: item["permission"],
  };
}

export function accessPolicyDeserializer(item: any): AccessPolicy {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    permission: item["permission"],
  };
}

/** File Share Paid Bursting properties. */
export interface FileSharePropertiesFileSharePaidBursting {
  /** Indicates whether paid bursting is enabled for the share. This property is only for file shares created under Files Provisioned v1 SSD account type. */
  paidBurstingEnabled?: boolean;
  /** The maximum paid bursting IOPS for the share. This property is only for file shares created under Files Provisioned v1 SSD account type. The maximum allowed value is 102400 which is the maximum allowed IOPS for a share. */
  paidBurstingMaxIops?: number;
  /** The maximum paid bursting bandwidth for the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v1 SSD account type. The maximum allowed value is 10340 which is the maximum allowed bandwidth for a share. */
  paidBurstingMaxBandwidthMibps?: number;
}

export function fileSharePropertiesFileSharePaidBurstingSerializer(
  item: FileSharePropertiesFileSharePaidBursting,
): any {
  return {
    paidBurstingEnabled: item["paidBurstingEnabled"],
    paidBurstingMaxIops: item["paidBurstingMaxIops"],
    paidBurstingMaxBandwidthMibps: item["paidBurstingMaxBandwidthMibps"],
  };
}

export function fileSharePropertiesFileSharePaidBurstingDeserializer(
  item: any,
): FileSharePropertiesFileSharePaidBursting {
  return {
    paidBurstingEnabled: item["paidBurstingEnabled"],
    paidBurstingMaxIops: item["paidBurstingMaxIops"],
    paidBurstingMaxBandwidthMibps: item["paidBurstingMaxBandwidthMibps"],
  };
}

/** The deleted share to be restored. */
export interface DeletedShare {
  /** Required. Identify the name of the deleted share that will be restored. */
  deletedShareName: string;
  /** Required. Identify the version of the deleted share that will be restored. */
  deletedShareVersion: string;
}

export function deletedShareSerializer(item: DeletedShare): any {
  return {
    deletedShareName: item["deletedShareName"],
    deletedShareVersion: item["deletedShareVersion"],
  };
}

/** Lease Share request schema. */
export interface LeaseShareRequest {
  /** Specifies the lease action. Can be one of the available actions. */
  action: LeaseShareAction;
  /** Identifies the lease. Can be specified in any valid GUID string format. */
  leaseId?: string;
  /** Optional. For a break action, proposed duration the lease should continue before it is broken, in seconds, between 0 and 60. */
  breakPeriod?: number;
  /** Required for acquire. Specifies the duration of the lease, in seconds, or negative one (-1) for a lease that never expires. */
  leaseDuration?: number;
  /** Optional for acquire, required for change. Proposed lease ID, in a GUID string format. */
  proposedLeaseId?: string;
}

export function leaseShareRequestSerializer(item: LeaseShareRequest): any {
  return {
    action: item["action"],
    leaseId: item["leaseId"],
    breakPeriod: item["breakPeriod"],
    leaseDuration: item["leaseDuration"],
    proposedLeaseId: item["proposedLeaseId"],
  };
}

/** Specifies the lease action. Can be one of the available actions. */
export enum KnownLeaseShareAction {
  /** Acquire */
  Acquire = "Acquire",
  /** Renew */
  Renew = "Renew",
  /** Change */
  Change = "Change",
  /** Release */
  Release = "Release",
  /** Break */
  Break = "Break",
}

/**
 * Specifies the lease action. Can be one of the available actions. \
 * {@link KnownLeaseShareAction} can be used interchangeably with LeaseShareAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Acquire** \
 * **Renew** \
 * **Change** \
 * **Release** \
 * **Break**
 */
export type LeaseShareAction = string;

/** Lease Share response schema. */
export interface LeaseShareResponse {
  /** Returned unique lease ID that must be included with any request to delete the share, or to renew, change, or release the lease. */
  leaseId?: string;
  /** Approximate time remaining in the lease period, in seconds. */
  leaseTimeSeconds?: string;
}

export function leaseShareResponseDeserializer(item: any): LeaseShareResponse {
  return {
    leaseId: item["leaseId"],
    leaseTimeSeconds: item["leaseTimeSeconds"],
  };
}

/** Response schema. Contains list of shares returned, and if paging is requested or required, a URL to next page of shares. */
export interface _FileShareItems {
  /** The FileShareItem items on this page */
  readonly value: FileShareItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fileShareItemsDeserializer(item: any): _FileShareItems {
  return {
    value: fileShareItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fileShareItemArrayDeserializer(result: Array<FileShareItem>): any[] {
  return result.map((item) => {
    return fileShareItemDeserializer(item);
  });
}

/** The file share properties be listed out. */
export interface FileShareItem extends AzureEntityResource {
  /** Returns the date and time the share was last modified. */
  readonly lastModifiedTime?: Date;
  /** A name-value pair to associate with the share as metadata. */
  metadata?: Record<string, string>;
  /** The provisioned size of the share, in gibibytes. Must be greater than 0, and less than or equal to 5TB (5120). For Large File Shares, the maximum size is 102400. For file shares created under Files Provisioned v2 account type, please refer to the GetFileServiceUsage API response for the minimum and maximum allowed provisioned storage size. */
  shareQuota?: number;
  /** The provisioned IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned IOPS. */
  provisionedIops?: number;
  /** The provisioned bandwidth of the share, in mebibytes per second. This property is only for file shares created under Files Provisioned v2 account type. Please refer to the GetFileServiceUsage API response for the minimum and maximum allowed value for provisioned bandwidth. */
  provisionedBandwidthMibps?: number;
  /** The calculated burst IOPS of the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly includedBurstIops?: number;
  /** The calculated maximum burst credits for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly maxBurstCreditsForIops?: number;
  /** Returns the next allowed provisioned storage size downgrade time for the share. This property is only for file shares created under Files Provisioned v1 SSD and Files Provisioned v2 account type */
  readonly nextAllowedQuotaDowngradeTime?: Date;
  /** Returns the next allowed provisioned IOPS downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly nextAllowedProvisionedIopsDowngradeTime?: Date;
  /** Returns the next allowed provisioned bandwidth downgrade time for the share. This property is only for file shares created under Files Provisioned v2 account type. */
  readonly nextAllowedProvisionedBandwidthDowngradeTime?: Date;
  /** The authentication protocol that is used for the file share. Can only be specified when creating a share. */
  enabledProtocols?: EnabledProtocols;
  /** The property is for NFS share only. The default is NoRootSquash. */
  rootSquash?: RootSquashType;
  /** The version of the share. */
  readonly version?: string;
  /** Indicates whether the share was deleted. */
  readonly deleted?: boolean;
  /** The deleted time if the share was deleted. */
  readonly deletedTime?: Date;
  /** Remaining retention days for share that was soft deleted. */
  readonly remainingRetentionDays?: number;
  /** Access tier for specific share. GpV2 account can choose between TransactionOptimized (default), Hot, and Cool. FileStorage account can choose Premium. */
  accessTier?: ShareAccessTier;
  /** Indicates the last modification time for share access tier. */
  readonly accessTierChangeTime?: Date;
  /** Indicates if there is a pending transition for access tier. */
  readonly accessTierStatus?: string;
  /** The approximate size of the data stored on the share. Note that this value may not include all recently created or recently resized files. */
  readonly shareUsageBytes?: number;
  /** The lease status of the share. */
  readonly leaseStatus?: LeaseStatus;
  /** Lease state of the share. */
  readonly leaseState?: LeaseState;
  /** Specifies whether the lease on a share is of infinite or fixed duration, only when the share is leased. */
  readonly leaseDuration?: LeaseDuration;
  /** List of stored access policies specified on the share. */
  signedIdentifiers?: SignedIdentifier[];
  /** Creation time of share snapshot returned in the response of list shares with expand param "snapshots". */
  readonly snapshotTime?: Date;
  /** File Share Paid Bursting properties. */
  fileSharePaidBursting?: FileSharePropertiesFileSharePaidBursting;
}

export function fileShareItemDeserializer(item: any): FileShareItem {
  return {
    etag: item["etag"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileShareItemPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of File services in storage account. */
export interface FileServiceProperties extends ProxyResource {
  /** Sku name and tier. */
  readonly sku?: Sku;
  /** Specifies CORS rules for the File service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the File service. */
  cors?: CorsRules;
  /** The file service properties for share soft delete. */
  shareDeleteRetentionPolicy?: DeleteRetentionPolicy;
  /** Protocol settings for file service */
  protocolSettings?: ProtocolSettings;
}

export function fileServicePropertiesSerializer(item: FileServiceProperties): any {
  return {
    properties: areAllPropsUndefined(item, [
      "cors",
      "shareDeleteRetentionPolicy",
      "protocolSettings",
    ])
      ? undefined
      : _fileServicePropertiesPropertiesSerializer(item),
  };
}

export function fileServicePropertiesDeserializer(item: any): FileServiceProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fileServicePropertiesPropertiesDeserializer(item["properties"])),
    sku: !item["sku"] ? item["sku"] : skuDeserializer(item["sku"]),
  };
}

/** The properties of File services in storage account. */
export interface FileServicePropertiesProperties {
  /** Specifies CORS rules for the File service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the File service. */
  cors?: CorsRules;
  /** The file service properties for share soft delete. */
  shareDeleteRetentionPolicy?: DeleteRetentionPolicy;
  /** Protocol settings for file service */
  protocolSettings?: ProtocolSettings;
}

export function fileServicePropertiesPropertiesSerializer(
  item: FileServicePropertiesProperties,
): any {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]),
    shareDeleteRetentionPolicy: !item["shareDeleteRetentionPolicy"]
      ? item["shareDeleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["shareDeleteRetentionPolicy"]),
    protocolSettings: !item["protocolSettings"]
      ? item["protocolSettings"]
      : protocolSettingsSerializer(item["protocolSettings"]),
  };
}

export function fileServicePropertiesPropertiesDeserializer(
  item: any,
): FileServicePropertiesProperties {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
    shareDeleteRetentionPolicy: !item["shareDeleteRetentionPolicy"]
      ? item["shareDeleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["shareDeleteRetentionPolicy"]),
    protocolSettings: !item["protocolSettings"]
      ? item["protocolSettings"]
      : protocolSettingsDeserializer(item["protocolSettings"]),
  };
}

/** Protocol settings for file service */
export interface ProtocolSettings {
  /** Setting for SMB protocol */
  smb?: SmbSetting;
  /** Setting for NFS protocol */
  nfs?: NfsSetting;
}

export function protocolSettingsSerializer(item: ProtocolSettings): any {
  return {
    smb: !item["smb"] ? item["smb"] : smbSettingSerializer(item["smb"]),
    nfs: !item["nfs"] ? item["nfs"] : nfsSettingSerializer(item["nfs"]),
  };
}

export function protocolSettingsDeserializer(item: any): ProtocolSettings {
  return {
    smb: !item["smb"] ? item["smb"] : smbSettingDeserializer(item["smb"]),
    nfs: !item["nfs"] ? item["nfs"] : nfsSettingDeserializer(item["nfs"]),
  };
}

/** Setting for SMB protocol */
export interface SmbSetting {
  /** Multichannel setting. Applies to Premium FileStorage only. */
  multichannel?: Multichannel;
  /** SMB protocol versions supported by server. Valid values are SMB2.1, SMB3.0, SMB3.1.1. Should be passed as a string with delimiter ';'. */
  versions?: string;
  /** SMB authentication methods supported by server. Valid values are NTLMv2, Kerberos. Should be passed as a string with delimiter ';'. */
  authenticationMethods?: string;
  /** Kerberos ticket encryption supported by server. Valid values are RC4-HMAC, AES-256. Should be passed as a string with delimiter ';' */
  kerberosTicketEncryption?: string;
  /** SMB channel encryption supported by server. Valid values are AES-128-CCM, AES-128-GCM, AES-256-GCM. Should be passed as a string with delimiter ';'. */
  channelEncryption?: string;
  /** Encryption in transit setting. */
  encryptionInTransit?: EncryptionInTransit;
}

export function smbSettingSerializer(item: SmbSetting): any {
  return {
    multichannel: !item["multichannel"]
      ? item["multichannel"]
      : multichannelSerializer(item["multichannel"]),
    versions: item["versions"],
    authenticationMethods: item["authenticationMethods"],
    kerberosTicketEncryption: item["kerberosTicketEncryption"],
    channelEncryption: item["channelEncryption"],
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : encryptionInTransitSerializer(item["encryptionInTransit"]),
  };
}

export function smbSettingDeserializer(item: any): SmbSetting {
  return {
    multichannel: !item["multichannel"]
      ? item["multichannel"]
      : multichannelDeserializer(item["multichannel"]),
    versions: item["versions"],
    authenticationMethods: item["authenticationMethods"],
    kerberosTicketEncryption: item["kerberosTicketEncryption"],
    channelEncryption: item["channelEncryption"],
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : encryptionInTransitDeserializer(item["encryptionInTransit"]),
  };
}

/** Multichannel setting. Applies to Premium FileStorage only. */
export interface Multichannel {
  /** Indicates whether multichannel is enabled */
  enabled?: boolean;
}

export function multichannelSerializer(item: Multichannel): any {
  return { enabled: item["enabled"] };
}

export function multichannelDeserializer(item: any): Multichannel {
  return {
    enabled: item["enabled"],
  };
}

/** Encryption in transit setting. */
export interface EncryptionInTransit {
  /** Indicates whether encryption in transit is required */
  required?: boolean;
}

export function encryptionInTransitSerializer(item: EncryptionInTransit): any {
  return { required: item["required"] };
}

export function encryptionInTransitDeserializer(item: any): EncryptionInTransit {
  return {
    required: item["required"],
  };
}

/** Setting for NFS protocol */
export interface NfsSetting {
  /** Encryption in transit setting. */
  encryptionInTransit?: EncryptionInTransit;
}

export function nfsSettingSerializer(item: NfsSetting): any {
  return {
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : encryptionInTransitSerializer(item["encryptionInTransit"]),
  };
}

export function nfsSettingDeserializer(item: any): NfsSetting {
  return {
    encryptionInTransit: !item["encryptionInTransit"]
      ? item["encryptionInTransit"]
      : encryptionInTransitDeserializer(item["encryptionInTransit"]),
  };
}

/** model interface FileServiceItems */
export interface FileServiceItems {
  /** List of file services returned. */
  readonly value?: FileServiceProperties[];
}

export function fileServiceItemsDeserializer(item: any): FileServiceItems {
  return {
    value: !item["value"] ? item["value"] : fileServicePropertiesArrayDeserializer(item["value"]),
  };
}

export function fileServicePropertiesArraySerializer(result: Array<FileServiceProperties>): any[] {
  return result.map((item) => {
    return fileServicePropertiesSerializer(item);
  });
}

export function fileServicePropertiesArrayDeserializer(
  result: Array<FileServiceProperties>,
): any[] {
  return result.map((item) => {
    return fileServicePropertiesDeserializer(item);
  });
}

/** The usage of file service in storage account. */
export interface FileServiceUsage extends ProxyResource {
  /** File service usage in storage account including account limits, file share limits and constants used in recommendations and bursting formula. */
  properties?: FileServiceUsageProperties;
}

export function fileServiceUsageDeserializer(item: any): FileServiceUsage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : fileServiceUsagePropertiesDeserializer(item["properties"]),
  };
}

/** File service usage in storage account including account limits, file share limits and constants used in recommendations and bursting formula. */
export interface FileServiceUsageProperties {
  /** Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account. */
  readonly storageAccountLimits?: AccountLimits;
  /** Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account. */
  readonly fileShareLimits?: FileShareLimits;
  /** Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account. */
  readonly fileShareRecommendations?: FileShareRecommendations;
  /** Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account. */
  readonly burstingConstants?: BurstingConstants;
  /** Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account. */
  readonly storageAccountUsage?: AccountUsage;
}

export function fileServiceUsagePropertiesDeserializer(item: any): FileServiceUsageProperties {
  return {
    storageAccountLimits: !item["storageAccountLimits"]
      ? item["storageAccountLimits"]
      : accountLimitsDeserializer(item["storageAccountLimits"]),
    fileShareLimits: !item["fileShareLimits"]
      ? item["fileShareLimits"]
      : fileShareLimitsDeserializer(item["fileShareLimits"]),
    fileShareRecommendations: !item["fileShareRecommendations"]
      ? item["fileShareRecommendations"]
      : fileShareRecommendationsDeserializer(item["fileShareRecommendations"]),
    burstingConstants: !item["burstingConstants"]
      ? item["burstingConstants"]
      : burstingConstantsDeserializer(item["burstingConstants"]),
    storageAccountUsage: !item["storageAccountUsage"]
      ? item["storageAccountUsage"]
      : accountUsageDeserializer(item["storageAccountUsage"]),
  };
}

/** Maximum provisioned storage, IOPS, bandwidth and number of file shares limits for the storage account. */
export interface AccountLimits {
  /** The maximum number of file shares limit for the storage account. */
  readonly maxFileShares?: number;
  /** The maximum provisioned storage quota limit in gibibytes for the storage account. */
  readonly maxProvisionedStorageGiB?: number;
  /** The maximum provisioned IOPS limit for the storage account. */
  readonly maxProvisionedIops?: number;
  /** The maximum provisioned bandwidth limit in mebibytes per second for the storage account. */
  readonly maxProvisionedBandwidthMiBPerSec?: number;
}

export function accountLimitsDeserializer(item: any): AccountLimits {
  return {
    maxFileShares: item["maxFileShares"],
    maxProvisionedStorageGiB: item["maxProvisionedStorageGiB"],
    maxProvisionedIops: item["maxProvisionedIOPS"],
    maxProvisionedBandwidthMiBPerSec: item["maxProvisionedBandwidthMiBPerSec"],
  };
}

/** Minimum and maximum provisioned storage, IOPS and bandwidth limits for a file share in the storage account. */
export interface FileShareLimits {
  /** The minimum provisioned storage quota limit in gibibytes for a file share in the storage account. */
  readonly minProvisionedStorageGiB?: number;
  /** The maximum provisioned storage quota limit in gibibytes for a file share in the storage account. */
  readonly maxProvisionedStorageGiB?: number;
  /** The minimum provisioned IOPS limit for a file share in the storage account. */
  readonly minProvisionedIops?: number;
  /** The maximum provisioned IOPS limit for a file share in the storage account. */
  readonly maxProvisionedIops?: number;
  /** The minimum provisioned bandwidth limit in mebibytes per second for a file share in the storage account. */
  readonly minProvisionedBandwidthMiBPerSec?: number;
  /** The maximum provisioned bandwidth limit in mebibytes per second for a file share in the storage account. */
  readonly maxProvisionedBandwidthMiBPerSec?: number;
  /** The IO scalar used for guardrail calculations for a file share in the storage account. */
  readonly guardrailIOScalar?: number;
  /** The bandwidth scalar used for guardrail calculations for a file share in the storage account. */
  readonly guardrailBandwidthScalar?: number;
}

export function fileShareLimitsDeserializer(item: any): FileShareLimits {
  return {
    minProvisionedStorageGiB: item["minProvisionedStorageGiB"],
    maxProvisionedStorageGiB: item["maxProvisionedStorageGiB"],
    minProvisionedIops: item["minProvisionedIOPS"],
    maxProvisionedIops: item["maxProvisionedIOPS"],
    minProvisionedBandwidthMiBPerSec: item["minProvisionedBandwidthMiBPerSec"],
    maxProvisionedBandwidthMiBPerSec: item["maxProvisionedBandwidthMiBPerSec"],
    guardrailIOScalar: item["guardrailIOScalar"],
    guardrailBandwidthScalar: item["guardrailBandwidthScalar"],
  };
}

/** Constants used for calculating recommended provisioned IOPS and bandwidth for a file share in the storage account. */
export interface FileShareRecommendations {
  /** The base IOPS in the file share provisioned IOPS recommendation formula. */
  readonly baseIops?: number;
  /** The scalar for IO in the file share provisioned IOPS recommendation formula. */
  readonly ioScalar?: number;
  /** The base bandwidth in the file share provisioned bandwidth recommendation formula. */
  readonly baseBandwidthMiBPerSec?: number;
  /** The scalar for bandwidth in the file share provisioned bandwidth recommendation formula. */
  readonly bandwidthScalar?: number;
}

export function fileShareRecommendationsDeserializer(item: any): FileShareRecommendations {
  return {
    baseIops: item["baseIOPS"],
    ioScalar: item["ioScalar"],
    baseBandwidthMiBPerSec: item["baseBandwidthMiBPerSec"],
    bandwidthScalar: item["bandwidthScalar"],
  };
}

/** Constants used for calculating included burst IOPS and maximum burst credits for IOPS for a file share in the storage account. */
export interface BurstingConstants {
  /** The guaranteed floor of burst IOPS for small file shares. */
  readonly burstFloorIops?: number;
  /** The scalar against provisioned IOPS in the file share included burst IOPS formula. */
  readonly burstIOScalar?: number;
  /** The time frame for bursting in seconds in the file share maximum burst credits for IOPS formula. */
  readonly burstTimeframeSeconds?: number;
}

export function burstingConstantsDeserializer(item: any): BurstingConstants {
  return {
    burstFloorIops: item["burstFloorIOPS"],
    burstIOScalar: item["burstIOScalar"],
    burstTimeframeSeconds: item["burstTimeframeSeconds"],
  };
}

/** Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares and soft-deleted shares in the account. */
export interface AccountUsage {
  /** Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account. */
  liveShares?: AccountUsageElements;
  /** Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account. */
  softDeletedShares?: AccountUsageElements;
}

export function accountUsageDeserializer(item: any): AccountUsage {
  return {
    liveShares: !item["liveShares"]
      ? item["liveShares"]
      : accountUsageElementsDeserializer(item["liveShares"]),
    softDeletedShares: !item["softDeletedShares"]
      ? item["softDeletedShares"]
      : accountUsageElementsDeserializer(item["softDeletedShares"]),
  };
}

/** Usage of provisioned storage, IOPS, bandwidth and number of file shares across all live shares or soft-deleted shares in the account. */
export interface AccountUsageElements {
  /** The total number of file shares. */
  readonly fileShareCount?: number;
  /** The total provisioned storage quota in gibibytes. */
  readonly provisionedStorageGiB?: number;
  /** The total provisioned IOPS. */
  readonly provisionedIops?: number;
  /** The total provisioned bandwidth in mebibytes per second. */
  readonly provisionedBandwidthMiBPerSec?: number;
}

export function accountUsageElementsDeserializer(item: any): AccountUsageElements {
  return {
    fileShareCount: item["fileShareCount"],
    provisionedStorageGiB: item["provisionedStorageGiB"],
    provisionedIops: item["provisionedIOPS"],
    provisionedBandwidthMiBPerSec: item["provisionedBandwidthMiBPerSec"],
  };
}

/** List file service usages schema. */
export interface _FileServiceUsages {
  /** The FileServiceUsage items on this page */
  readonly value: FileServiceUsage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fileServiceUsagesDeserializer(item: any): _FileServiceUsages {
  return {
    value: fileServiceUsageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fileServiceUsageArrayDeserializer(result: Array<FileServiceUsage>): any[] {
  return result.map((item) => {
    return fileServiceUsageDeserializer(item);
  });
}

/** The properties of a storage account’s Queue service. */
export interface QueueServiceProperties extends ProxyResource {
  /** Specifies CORS rules for the Queue service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Queue service. */
  cors?: CorsRules;
}

export function queueServicePropertiesSerializer(item: QueueServiceProperties): any {
  return {
    properties: areAllPropsUndefined(item, ["cors"])
      ? undefined
      : _queueServicePropertiesPropertiesSerializer(item),
  };
}

export function queueServicePropertiesDeserializer(item: any): QueueServiceProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _queueServicePropertiesPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a storage account’s Queue service. */
export interface QueueServicePropertiesProperties {
  /** Specifies CORS rules for the Queue service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Queue service. */
  cors?: CorsRules;
}

export function queueServicePropertiesPropertiesSerializer(
  item: QueueServicePropertiesProperties,
): any {
  return { cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]) };
}

export function queueServicePropertiesPropertiesDeserializer(
  item: any,
): QueueServicePropertiesProperties {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
  };
}

/** model interface ListQueueServices */
export interface ListQueueServices {
  /** List of queue services returned. */
  readonly value?: QueueServiceProperties[];
}

export function listQueueServicesDeserializer(item: any): ListQueueServices {
  return {
    value: !item["value"] ? item["value"] : queueServicePropertiesArrayDeserializer(item["value"]),
  };
}

export function queueServicePropertiesArraySerializer(
  result: Array<QueueServiceProperties>,
): any[] {
  return result.map((item) => {
    return queueServicePropertiesSerializer(item);
  });
}

export function queueServicePropertiesArrayDeserializer(
  result: Array<QueueServiceProperties>,
): any[] {
  return result.map((item) => {
    return queueServicePropertiesDeserializer(item);
  });
}

/** Deleted storage account */
export interface DeletedAccount extends ProxyResource {
  /** Full resource id of the original storage account. */
  readonly storageAccountResourceId?: string;
  /** Location of the deleted account. */
  readonly location?: string;
  /** Can be used to attempt recovering this deleted account via PutStorageAccount API. */
  readonly restoreReference?: string;
  /** Creation time of the deleted account. */
  readonly creationTime?: string;
  /** Deletion time of the deleted account. */
  readonly deletionTime?: string;
}

export function deletedAccountDeserializer(item: any): DeletedAccount {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deletedAccountPropertiesDeserializer(item["properties"])),
  };
}

/** Attributes of a deleted storage account. */
export interface DeletedAccountProperties {
  /** Full resource id of the original storage account. */
  readonly storageAccountResourceId?: string;
  /** Location of the deleted account. */
  readonly location?: string;
  /** Can be used to attempt recovering this deleted account via PutStorageAccount API. */
  readonly restoreReference?: string;
  /** Creation time of the deleted account. */
  readonly creationTime?: string;
  /** Deletion time of the deleted account. */
  readonly deletionTime?: string;
}

export function deletedAccountPropertiesDeserializer(item: any): DeletedAccountProperties {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    location: item["location"],
    restoreReference: item["restoreReference"],
    creationTime: item["creationTime"],
    deletionTime: item["deletionTime"],
  };
}

/** The response of a DeletedAccount list operation. */
export interface _DeletedAccountListResult {
  /** The DeletedAccount items on this page */
  value: DeletedAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deletedAccountListResultDeserializer(item: any): _DeletedAccountListResult {
  return {
    value: deletedAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedAccountArrayDeserializer(result: Array<DeletedAccount>): any[] {
  return result.map((item) => {
    return deletedAccountDeserializer(item);
  });
}

/** The Get Storage Account ManagementPolicies operation response. */
export interface ManagementPolicy extends ProxyResource {
  /** Returns the date and time the ManagementPolicies was last modified. */
  readonly lastModifiedTime?: Date;
  /** The Storage Account ManagementPolicy, in JSON format. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview. */
  policy?: ManagementPolicySchema;
}

export function managementPolicySerializer(item: ManagementPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["policy"])
      ? undefined
      : _managementPolicyPropertiesSerializer(item),
  };
}

export function managementPolicyDeserializer(item: any): ManagementPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _managementPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** The Storage Account ManagementPolicy properties. */
export interface ManagementPolicyProperties {
  /** Returns the date and time the ManagementPolicies was last modified. */
  readonly lastModifiedTime?: Date;
  /** The Storage Account ManagementPolicy, in JSON format. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview. */
  policy: ManagementPolicySchema;
}

export function managementPolicyPropertiesSerializer(item: ManagementPolicyProperties): any {
  return { policy: managementPolicySchemaSerializer(item["policy"]) };
}

export function managementPolicyPropertiesDeserializer(item: any): ManagementPolicyProperties {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    policy: managementPolicySchemaDeserializer(item["policy"]),
  };
}

/** The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview. */
export interface ManagementPolicySchema {
  /** The Storage Account ManagementPolicies Rules. See more details in: https://learn.microsoft.com/azure/storage/blobs/lifecycle-management-overview. */
  rules: ManagementPolicyRule[];
}

export function managementPolicySchemaSerializer(item: ManagementPolicySchema): any {
  return { rules: managementPolicyRuleArraySerializer(item["rules"]) };
}

export function managementPolicySchemaDeserializer(item: any): ManagementPolicySchema {
  return {
    rules: managementPolicyRuleArrayDeserializer(item["rules"]),
  };
}

export function managementPolicyRuleArraySerializer(result: Array<ManagementPolicyRule>): any[] {
  return result.map((item) => {
    return managementPolicyRuleSerializer(item);
  });
}

export function managementPolicyRuleArrayDeserializer(result: Array<ManagementPolicyRule>): any[] {
  return result.map((item) => {
    return managementPolicyRuleDeserializer(item);
  });
}

/** An object that wraps the Lifecycle rule. Each rule is uniquely defined by name. */
export interface ManagementPolicyRule {
  /** Rule is enabled if set to true. */
  enabled?: boolean;
  /** A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy. */
  name: string;
  /** The valid value is Lifecycle */
  type: RuleType;
  /** An object that defines the Lifecycle rule. */
  definition: ManagementPolicyDefinition;
}

export function managementPolicyRuleSerializer(item: ManagementPolicyRule): any {
  return {
    enabled: item["enabled"],
    name: item["name"],
    type: item["type"],
    definition: managementPolicyDefinitionSerializer(item["definition"]),
  };
}

export function managementPolicyRuleDeserializer(item: any): ManagementPolicyRule {
  return {
    enabled: item["enabled"],
    name: item["name"],
    type: item["type"],
    definition: managementPolicyDefinitionDeserializer(item["definition"]),
  };
}

/** The valid value is Lifecycle */
export enum KnownRuleType {
  /** Lifecycle */
  Lifecycle = "Lifecycle",
}

/**
 * The valid value is Lifecycle \
 * {@link KnownRuleType} can be used interchangeably with RuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Lifecycle**
 */
export type RuleType = string;

/** An object that defines the Lifecycle rule. Each definition is made up with a filters set and an actions set. */
export interface ManagementPolicyDefinition {
  /** An object that defines the action set. */
  actions: ManagementPolicyAction;
  /** An object that defines the filter set. */
  filters?: ManagementPolicyFilter;
}

export function managementPolicyDefinitionSerializer(item: ManagementPolicyDefinition): any {
  return {
    actions: managementPolicyActionSerializer(item["actions"]),
    filters: !item["filters"] ? item["filters"] : managementPolicyFilterSerializer(item["filters"]),
  };
}

export function managementPolicyDefinitionDeserializer(item: any): ManagementPolicyDefinition {
  return {
    actions: managementPolicyActionDeserializer(item["actions"]),
    filters: !item["filters"]
      ? item["filters"]
      : managementPolicyFilterDeserializer(item["filters"]),
  };
}

/** Actions are applied to the filtered blobs when the execution condition is met. */
export interface ManagementPolicyAction {
  /** The management policy action for base blob */
  baseBlob?: ManagementPolicyBaseBlob;
  /** The management policy action for snapshot */
  snapshot?: ManagementPolicySnapShot;
  /** The management policy action for version */
  version?: ManagementPolicyVersion;
}

export function managementPolicyActionSerializer(item: ManagementPolicyAction): any {
  return {
    baseBlob: !item["baseBlob"]
      ? item["baseBlob"]
      : managementPolicyBaseBlobSerializer(item["baseBlob"]),
    snapshot: !item["snapshot"]
      ? item["snapshot"]
      : managementPolicySnapShotSerializer(item["snapshot"]),
    version: !item["version"]
      ? item["version"]
      : managementPolicyVersionSerializer(item["version"]),
  };
}

export function managementPolicyActionDeserializer(item: any): ManagementPolicyAction {
  return {
    baseBlob: !item["baseBlob"]
      ? item["baseBlob"]
      : managementPolicyBaseBlobDeserializer(item["baseBlob"]),
    snapshot: !item["snapshot"]
      ? item["snapshot"]
      : managementPolicySnapShotDeserializer(item["snapshot"]),
    version: !item["version"]
      ? item["version"]
      : managementPolicyVersionDeserializer(item["version"]),
  };
}

/** Management policy action for base blob. */
export interface ManagementPolicyBaseBlob {
  /** The function to tier blobs to cool storage. */
  tierToCool?: DateAfterModification;
  /** The function to tier blobs to archive storage. */
  tierToArchive?: DateAfterModification;
  /** The function to tier blobs to cold storage. */
  tierToCold?: DateAfterModification;
  /** The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts */
  tierToHot?: DateAfterModification;
  /** The function to delete the blob */
  delete?: DateAfterModification;
  /** This property enables auto tiering of a blob from cool to hot on a blob access. This property requires tierToCool.daysAfterLastAccessTimeGreaterThan. */
  enableAutoTierToHotFromCool?: boolean;
}

export function managementPolicyBaseBlobSerializer(item: ManagementPolicyBaseBlob): any {
  return {
    tierToCool: !item["tierToCool"]
      ? item["tierToCool"]
      : dateAfterModificationSerializer(item["tierToCool"]),
    tierToArchive: !item["tierToArchive"]
      ? item["tierToArchive"]
      : dateAfterModificationSerializer(item["tierToArchive"]),
    tierToCold: !item["tierToCold"]
      ? item["tierToCold"]
      : dateAfterModificationSerializer(item["tierToCold"]),
    tierToHot: !item["tierToHot"]
      ? item["tierToHot"]
      : dateAfterModificationSerializer(item["tierToHot"]),
    delete: !item["delete"] ? item["delete"] : dateAfterModificationSerializer(item["delete"]),
    enableAutoTierToHotFromCool: item["enableAutoTierToHotFromCool"],
  };
}

export function managementPolicyBaseBlobDeserializer(item: any): ManagementPolicyBaseBlob {
  return {
    tierToCool: !item["tierToCool"]
      ? item["tierToCool"]
      : dateAfterModificationDeserializer(item["tierToCool"]),
    tierToArchive: !item["tierToArchive"]
      ? item["tierToArchive"]
      : dateAfterModificationDeserializer(item["tierToArchive"]),
    tierToCold: !item["tierToCold"]
      ? item["tierToCold"]
      : dateAfterModificationDeserializer(item["tierToCold"]),
    tierToHot: !item["tierToHot"]
      ? item["tierToHot"]
      : dateAfterModificationDeserializer(item["tierToHot"]),
    delete: !item["delete"] ? item["delete"] : dateAfterModificationDeserializer(item["delete"]),
    enableAutoTierToHotFromCool: item["enableAutoTierToHotFromCool"],
  };
}

/** Object to define the base blob action conditions. Properties daysAfterModificationGreaterThan, daysAfterLastAccessTimeGreaterThan and daysAfterCreationGreaterThan are mutually exclusive. The daysAfterLastTierChangeGreaterThan property is only applicable for tierToArchive actions which requires daysAfterModificationGreaterThan to be set, also it cannot be used in conjunction with daysAfterLastAccessTimeGreaterThan or daysAfterCreationGreaterThan. */
export interface DateAfterModification {
  /** Value indicating the age in days after last modification */
  daysAfterModificationGreaterThan?: number;
  /** Value indicating the age in days after last blob access. This property can only be used in conjunction with last access time tracking policy */
  daysAfterLastAccessTimeGreaterThan?: number;
  /** Value indicating the age in days after last blob tier change time. This property is only applicable for tierToArchive actions and requires daysAfterModificationGreaterThan to be set for baseBlobs based actions. The blob will be archived if both the conditions are satisfied. */
  daysAfterLastTierChangeGreaterThan?: number;
  /** Value indicating the age in days after blob creation. */
  daysAfterCreationGreaterThan?: number;
}

export function dateAfterModificationSerializer(item: DateAfterModification): any {
  return {
    daysAfterModificationGreaterThan: item["daysAfterModificationGreaterThan"],
    daysAfterLastAccessTimeGreaterThan: item["daysAfterLastAccessTimeGreaterThan"],
    daysAfterLastTierChangeGreaterThan: item["daysAfterLastTierChangeGreaterThan"],
    daysAfterCreationGreaterThan: item["daysAfterCreationGreaterThan"],
  };
}

export function dateAfterModificationDeserializer(item: any): DateAfterModification {
  return {
    daysAfterModificationGreaterThan: item["daysAfterModificationGreaterThan"],
    daysAfterLastAccessTimeGreaterThan: item["daysAfterLastAccessTimeGreaterThan"],
    daysAfterLastTierChangeGreaterThan: item["daysAfterLastTierChangeGreaterThan"],
    daysAfterCreationGreaterThan: item["daysAfterCreationGreaterThan"],
  };
}

/** Management policy action for snapshot. */
export interface ManagementPolicySnapShot {
  /** The function to tier blob snapshot to cool storage. */
  tierToCool?: DateAfterCreation;
  /** The function to tier blob snapshot to archive storage. */
  tierToArchive?: DateAfterCreation;
  /** The function to tier blobs to cold storage. */
  tierToCold?: DateAfterCreation;
  /** The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts */
  tierToHot?: DateAfterCreation;
  /** The function to delete the blob snapshot */
  delete?: DateAfterCreation;
}

export function managementPolicySnapShotSerializer(item: ManagementPolicySnapShot): any {
  return {
    tierToCool: !item["tierToCool"]
      ? item["tierToCool"]
      : dateAfterCreationSerializer(item["tierToCool"]),
    tierToArchive: !item["tierToArchive"]
      ? item["tierToArchive"]
      : dateAfterCreationSerializer(item["tierToArchive"]),
    tierToCold: !item["tierToCold"]
      ? item["tierToCold"]
      : dateAfterCreationSerializer(item["tierToCold"]),
    tierToHot: !item["tierToHot"]
      ? item["tierToHot"]
      : dateAfterCreationSerializer(item["tierToHot"]),
    delete: !item["delete"] ? item["delete"] : dateAfterCreationSerializer(item["delete"]),
  };
}

export function managementPolicySnapShotDeserializer(item: any): ManagementPolicySnapShot {
  return {
    tierToCool: !item["tierToCool"]
      ? item["tierToCool"]
      : dateAfterCreationDeserializer(item["tierToCool"]),
    tierToArchive: !item["tierToArchive"]
      ? item["tierToArchive"]
      : dateAfterCreationDeserializer(item["tierToArchive"]),
    tierToCold: !item["tierToCold"]
      ? item["tierToCold"]
      : dateAfterCreationDeserializer(item["tierToCold"]),
    tierToHot: !item["tierToHot"]
      ? item["tierToHot"]
      : dateAfterCreationDeserializer(item["tierToHot"]),
    delete: !item["delete"] ? item["delete"] : dateAfterCreationDeserializer(item["delete"]),
  };
}

/** Object to define snapshot and version action conditions. */
export interface DateAfterCreation {
  /** Value indicating the age in days after creation */
  daysAfterCreationGreaterThan: number;
  /** Value indicating the age in days after last blob tier change time. This property is only applicable for tierToArchive actions and requires daysAfterCreationGreaterThan to be set for snapshots and blob version based actions. The blob will be archived if both the conditions are satisfied. */
  daysAfterLastTierChangeGreaterThan?: number;
}

export function dateAfterCreationSerializer(item: DateAfterCreation): any {
  return {
    daysAfterCreationGreaterThan: item["daysAfterCreationGreaterThan"],
    daysAfterLastTierChangeGreaterThan: item["daysAfterLastTierChangeGreaterThan"],
  };
}

export function dateAfterCreationDeserializer(item: any): DateAfterCreation {
  return {
    daysAfterCreationGreaterThan: item["daysAfterCreationGreaterThan"],
    daysAfterLastTierChangeGreaterThan: item["daysAfterLastTierChangeGreaterThan"],
  };
}

/** Management policy action for blob version. */
export interface ManagementPolicyVersion {
  /** The function to tier blob version to cool storage. */
  tierToCool?: DateAfterCreation;
  /** The function to tier blob version to archive storage. */
  tierToArchive?: DateAfterCreation;
  /** The function to tier blobs to cold storage. */
  tierToCold?: DateAfterCreation;
  /** The function to tier blobs to hot storage. This action can only be used with Premium Block Blob Storage Accounts */
  tierToHot?: DateAfterCreation;
  /** The function to delete the blob version */
  delete?: DateAfterCreation;
}

export function managementPolicyVersionSerializer(item: ManagementPolicyVersion): any {
  return {
    tierToCool: !item["tierToCool"]
      ? item["tierToCool"]
      : dateAfterCreationSerializer(item["tierToCool"]),
    tierToArchive: !item["tierToArchive"]
      ? item["tierToArchive"]
      : dateAfterCreationSerializer(item["tierToArchive"]),
    tierToCold: !item["tierToCold"]
      ? item["tierToCold"]
      : dateAfterCreationSerializer(item["tierToCold"]),
    tierToHot: !item["tierToHot"]
      ? item["tierToHot"]
      : dateAfterCreationSerializer(item["tierToHot"]),
    delete: !item["delete"] ? item["delete"] : dateAfterCreationSerializer(item["delete"]),
  };
}

export function managementPolicyVersionDeserializer(item: any): ManagementPolicyVersion {
  return {
    tierToCool: !item["tierToCool"]
      ? item["tierToCool"]
      : dateAfterCreationDeserializer(item["tierToCool"]),
    tierToArchive: !item["tierToArchive"]
      ? item["tierToArchive"]
      : dateAfterCreationDeserializer(item["tierToArchive"]),
    tierToCold: !item["tierToCold"]
      ? item["tierToCold"]
      : dateAfterCreationDeserializer(item["tierToCold"]),
    tierToHot: !item["tierToHot"]
      ? item["tierToHot"]
      : dateAfterCreationDeserializer(item["tierToHot"]),
    delete: !item["delete"] ? item["delete"] : dateAfterCreationDeserializer(item["delete"]),
  };
}

/** Filters limit rule actions to a subset of blobs within the storage account. If multiple filters are defined, a logical AND is performed on all filters. */
export interface ManagementPolicyFilter {
  /** An array of strings for prefixes to be match. */
  prefixMatch?: string[];
  /** An array of predefined enum values. Currently blockBlob supports all tiering and delete actions. Only delete actions are supported for appendBlob. */
  blobTypes: string[];
  /** An array of blob index tag based filters, there can be at most 10 tag filters */
  blobIndexMatch?: TagFilter[];
}

export function managementPolicyFilterSerializer(item: ManagementPolicyFilter): any {
  return {
    prefixMatch: !item["prefixMatch"]
      ? item["prefixMatch"]
      : item["prefixMatch"].map((p: any) => {
          return p;
        }),
    blobTypes: item["blobTypes"].map((p: any) => {
      return p;
    }),
    blobIndexMatch: !item["blobIndexMatch"]
      ? item["blobIndexMatch"]
      : tagFilterArraySerializer(item["blobIndexMatch"]),
  };
}

export function managementPolicyFilterDeserializer(item: any): ManagementPolicyFilter {
  return {
    prefixMatch: !item["prefixMatch"]
      ? item["prefixMatch"]
      : item["prefixMatch"].map((p: any) => {
          return p;
        }),
    blobTypes: item["blobTypes"].map((p: any) => {
      return p;
    }),
    blobIndexMatch: !item["blobIndexMatch"]
      ? item["blobIndexMatch"]
      : tagFilterArrayDeserializer(item["blobIndexMatch"]),
  };
}

export function tagFilterArraySerializer(result: Array<TagFilter>): any[] {
  return result.map((item) => {
    return tagFilterSerializer(item);
  });
}

export function tagFilterArrayDeserializer(result: Array<TagFilter>): any[] {
  return result.map((item) => {
    return tagFilterDeserializer(item);
  });
}

/** Blob index tag based filtering for blob objects */
export interface TagFilter {
  /** This is the filter tag name, it can have 1 - 128 characters */
  name: string;
  /** This is the comparison operator which is used for object comparison and filtering. Only == (equality operator) is currently supported */
  op: string;
  /** This is the filter tag value field used for tag based filtering, it can have 0 - 256 characters */
  value: string;
}

export function tagFilterSerializer(item: TagFilter): any {
  return { name: item["name"], op: item["op"], value: item["value"] };
}

export function tagFilterDeserializer(item: any): TagFilter {
  return {
    name: item["name"],
    op: item["op"],
    value: item["value"],
  };
}

/** Known values of {@link ManagementPolicyName} that the service accepts. */
export enum KnownManagementPolicyName {
  /** default */
  Default = "default",
}

/** Type of ManagementPolicyName */
export type ManagementPolicyName = string;

/** The storage account blob inventory policy. */
export interface BlobInventoryPolicy extends ProxyResource {
  /** Returns the last modified date and time of the blob inventory policy. */
  readonly lastModifiedTime?: Date;
  /** The storage account blob inventory policy object. It is composed of policy rules. */
  policy?: BlobInventoryPolicySchema;
}

export function blobInventoryPolicySerializer(item: BlobInventoryPolicy): any {
  return {
    properties: areAllPropsUndefined(item, ["policy"])
      ? undefined
      : _blobInventoryPolicyPropertiesSerializer(item),
  };
}

export function blobInventoryPolicyDeserializer(item: any): BlobInventoryPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _blobInventoryPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** The storage account blob inventory policy properties. */
export interface BlobInventoryPolicyProperties {
  /** Returns the last modified date and time of the blob inventory policy. */
  readonly lastModifiedTime?: Date;
  /** The storage account blob inventory policy object. It is composed of policy rules. */
  policy: BlobInventoryPolicySchema;
}

export function blobInventoryPolicyPropertiesSerializer(item: BlobInventoryPolicyProperties): any {
  return { policy: blobInventoryPolicySchemaSerializer(item["policy"]) };
}

export function blobInventoryPolicyPropertiesDeserializer(
  item: any,
): BlobInventoryPolicyProperties {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    policy: blobInventoryPolicySchemaDeserializer(item["policy"]),
  };
}

/** The storage account blob inventory policy rules. */
export interface BlobInventoryPolicySchema {
  /** Policy is enabled if set to true. */
  enabled: boolean;
  /** Deprecated Property from API version 2021-04-01 onwards, the required destination container name must be specified at the rule level 'policy.rule.destination' */
  readonly destination?: string;
  /** The valid value is Inventory */
  type: InventoryRuleType;
  /** The storage account blob inventory policy rules. The rule is applied when it is enabled. */
  rules: BlobInventoryPolicyRule[];
}

export function blobInventoryPolicySchemaSerializer(item: BlobInventoryPolicySchema): any {
  return {
    enabled: item["enabled"],
    type: item["type"],
    rules: blobInventoryPolicyRuleArraySerializer(item["rules"]),
  };
}

export function blobInventoryPolicySchemaDeserializer(item: any): BlobInventoryPolicySchema {
  return {
    enabled: item["enabled"],
    destination: item["destination"],
    type: item["type"],
    rules: blobInventoryPolicyRuleArrayDeserializer(item["rules"]),
  };
}

/** The valid value is Inventory */
export enum KnownInventoryRuleType {
  /** Inventory */
  Inventory = "Inventory",
}

/**
 * The valid value is Inventory \
 * {@link KnownInventoryRuleType} can be used interchangeably with InventoryRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Inventory**
 */
export type InventoryRuleType = string;

export function blobInventoryPolicyRuleArraySerializer(
  result: Array<BlobInventoryPolicyRule>,
): any[] {
  return result.map((item) => {
    return blobInventoryPolicyRuleSerializer(item);
  });
}

export function blobInventoryPolicyRuleArrayDeserializer(
  result: Array<BlobInventoryPolicyRule>,
): any[] {
  return result.map((item) => {
    return blobInventoryPolicyRuleDeserializer(item);
  });
}

/** An object that wraps the blob inventory rule. Each rule is uniquely defined by name. */
export interface BlobInventoryPolicyRule {
  /** Rule is enabled when set to true. */
  enabled: boolean;
  /** A rule name can contain any combination of alpha numeric characters. Rule name is case-sensitive. It must be unique within a policy. */
  name: string;
  /** Container name where blob inventory files are stored. Must be pre-created. */
  destination: string;
  /** An object that defines the blob inventory policy rule. */
  definition: BlobInventoryPolicyDefinition;
}

export function blobInventoryPolicyRuleSerializer(item: BlobInventoryPolicyRule): any {
  return {
    enabled: item["enabled"],
    name: item["name"],
    destination: item["destination"],
    definition: blobInventoryPolicyDefinitionSerializer(item["definition"]),
  };
}

export function blobInventoryPolicyRuleDeserializer(item: any): BlobInventoryPolicyRule {
  return {
    enabled: item["enabled"],
    name: item["name"],
    destination: item["destination"],
    definition: blobInventoryPolicyDefinitionDeserializer(item["definition"]),
  };
}

/** An object that defines the blob inventory rule. */
export interface BlobInventoryPolicyDefinition {
  /** An object that defines the filter set. */
  filters?: BlobInventoryPolicyFilter;
  /** This is a required field, it specifies the format for the inventory files. */
  format: Format;
  /** This is a required field. This field is used to schedule an inventory formation. */
  schedule: Schedule;
  /** This is a required field. This field specifies the scope of the inventory created either at the blob or container level. */
  objectType: ObjectType;
  /** This is a required field. This field specifies the fields and properties of the object to be included in the inventory. The Schema field value 'Name' is always required. The valid values for this field for the 'Blob' definition.objectType include 'Name, Creation-Time, Last-Modified, Content-Length, Content-MD5, BlobType, AccessTier, AccessTierChangeTime, AccessTierInferred, Tags, Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, Snapshot, VersionId, IsCurrentVersion, Metadata, LastAccessTime, Tags, Etag, ContentType, ContentEncoding, ContentLanguage, ContentCRC64, CacheControl, ContentDisposition, LeaseStatus, LeaseState, LeaseDuration, ServerEncrypted, Deleted, DeletionId, DeletedTime, RemainingRetentionDays, ImmutabilityPolicyUntilDate, ImmutabilityPolicyMode, LegalHold, CopyId, CopyStatus, CopySource, CopyProgress, CopyCompletionTime, CopyStatusDescription, CustomerProvidedKeySha256, RehydratePriority, ArchiveStatus, XmsBlobSequenceNumber, EncryptionScope, IncrementalCopy, TagCount'. For Blob object type schema field value 'DeletedTime' is applicable only for Hns enabled accounts. The valid values for 'Container' definition.objectType include 'Name, Last-Modified, Metadata, LeaseStatus, LeaseState, LeaseDuration, PublicAccess, HasImmutabilityPolicy, HasLegalHold, Etag, DefaultEncryptionScope, DenyEncryptionScopeOverride, ImmutableStorageWithVersioningEnabled, Deleted, Version, DeletedTime, RemainingRetentionDays'. Schema field values 'Expiry-Time, hdi_isfolder, Owner, Group, Permissions, Acl, DeletionId' are valid only for Hns enabled accounts.Schema field values 'Tags, TagCount' are only valid for Non-Hns accounts. */
  schemaFields: string[];
}

export function blobInventoryPolicyDefinitionSerializer(item: BlobInventoryPolicyDefinition): any {
  return {
    filters: !item["filters"]
      ? item["filters"]
      : blobInventoryPolicyFilterSerializer(item["filters"]),
    format: item["format"],
    schedule: item["schedule"],
    objectType: item["objectType"],
    schemaFields: item["schemaFields"].map((p: any) => {
      return p;
    }),
  };
}

export function blobInventoryPolicyDefinitionDeserializer(
  item: any,
): BlobInventoryPolicyDefinition {
  return {
    filters: !item["filters"]
      ? item["filters"]
      : blobInventoryPolicyFilterDeserializer(item["filters"]),
    format: item["format"],
    schedule: item["schedule"],
    objectType: item["objectType"],
    schemaFields: item["schemaFields"].map((p: any) => {
      return p;
    }),
  };
}

/** An object that defines the blob inventory rule filter conditions. For 'Blob' definition.objectType all filter properties are applicable, 'blobTypes' is required and others are optional. For 'Container' definition.objectType only prefixMatch is applicable and is optional. */
export interface BlobInventoryPolicyFilter {
  /** An array of strings with maximum 10 blob prefixes to be included in the inventory. */
  prefixMatch?: string[];
  /** An array of strings with maximum 10 blob prefixes to be excluded from the inventory. */
  excludePrefix?: string[];
  /** An array of predefined enum values. Valid values include blockBlob, appendBlob, pageBlob. Hns accounts does not support pageBlobs. This field is required when definition.objectType property is set to 'Blob'. */
  blobTypes?: string[];
  /** Includes blob versions in blob inventory when value is set to true. The definition.schemaFields values 'VersionId and IsCurrentVersion' are required if this property is set to true, else they must be excluded. */
  includeBlobVersions?: boolean;
  /** Includes blob snapshots in blob inventory when value is set to true. The definition.schemaFields value 'Snapshot' is required if this property is set to true, else it must be excluded. */
  includeSnapshots?: boolean;
  /** For 'Container' definition.objectType the definition.schemaFields must include 'Deleted, Version, DeletedTime and RemainingRetentionDays'. For 'Blob' definition.objectType and HNS enabled storage accounts the definition.schemaFields must include 'DeletionId, Deleted, DeletedTime and RemainingRetentionDays' and for Hns disabled accounts the definition.schemaFields must include 'Deleted and RemainingRetentionDays', else it must be excluded. */
  includeDeleted?: boolean;
  /** This property is used to filter objects based on the object creation time */
  creationTime?: BlobInventoryCreationTime;
}

export function blobInventoryPolicyFilterSerializer(item: BlobInventoryPolicyFilter): any {
  return {
    prefixMatch: !item["prefixMatch"]
      ? item["prefixMatch"]
      : item["prefixMatch"].map((p: any) => {
          return p;
        }),
    excludePrefix: !item["excludePrefix"]
      ? item["excludePrefix"]
      : item["excludePrefix"].map((p: any) => {
          return p;
        }),
    blobTypes: !item["blobTypes"]
      ? item["blobTypes"]
      : item["blobTypes"].map((p: any) => {
          return p;
        }),
    includeBlobVersions: item["includeBlobVersions"],
    includeSnapshots: item["includeSnapshots"],
    includeDeleted: item["includeDeleted"],
    creationTime: !item["creationTime"]
      ? item["creationTime"]
      : blobInventoryCreationTimeSerializer(item["creationTime"]),
  };
}

export function blobInventoryPolicyFilterDeserializer(item: any): BlobInventoryPolicyFilter {
  return {
    prefixMatch: !item["prefixMatch"]
      ? item["prefixMatch"]
      : item["prefixMatch"].map((p: any) => {
          return p;
        }),
    excludePrefix: !item["excludePrefix"]
      ? item["excludePrefix"]
      : item["excludePrefix"].map((p: any) => {
          return p;
        }),
    blobTypes: !item["blobTypes"]
      ? item["blobTypes"]
      : item["blobTypes"].map((p: any) => {
          return p;
        }),
    includeBlobVersions: item["includeBlobVersions"],
    includeSnapshots: item["includeSnapshots"],
    includeDeleted: item["includeDeleted"],
    creationTime: !item["creationTime"]
      ? item["creationTime"]
      : blobInventoryCreationTimeDeserializer(item["creationTime"]),
  };
}

/** This property defines the creation time based filtering condition. Blob Inventory schema parameter 'Creation-Time' is mandatory with this filter. */
export interface BlobInventoryCreationTime {
  /** When set the policy filters the objects that are created in the last N days. Where N is an integer value between 1 to 36500. */
  lastNDays?: number;
}

export function blobInventoryCreationTimeSerializer(item: BlobInventoryCreationTime): any {
  return { lastNDays: item["lastNDays"] };
}

export function blobInventoryCreationTimeDeserializer(item: any): BlobInventoryCreationTime {
  return {
    lastNDays: item["lastNDays"],
  };
}

/** This is a required field, it specifies the format for the inventory files. */
export enum KnownFormat {
  /** Csv */
  Csv = "Csv",
  /** Parquet */
  Parquet = "Parquet",
}

/**
 * This is a required field, it specifies the format for the inventory files. \
 * {@link KnownFormat} can be used interchangeably with Format,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Csv** \
 * **Parquet**
 */
export type Format = string;

/** This is a required field. This field is used to schedule an inventory formation. */
export enum KnownSchedule {
  /** Daily */
  Daily = "Daily",
  /** Weekly */
  Weekly = "Weekly",
}

/**
 * This is a required field. This field is used to schedule an inventory formation. \
 * {@link KnownSchedule} can be used interchangeably with Schedule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Daily** \
 * **Weekly**
 */
export type Schedule = string;

/** This is a required field. This field specifies the scope of the inventory created either at the blob or container level. */
export enum KnownObjectType {
  /** Blob */
  Blob = "Blob",
  /** Container */
  Container = "Container",
}

/**
 * This is a required field. This field specifies the scope of the inventory created either at the blob or container level. \
 * {@link KnownObjectType} can be used interchangeably with ObjectType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Blob** \
 * **Container**
 */
export type ObjectType = string;

/** Known values of {@link BlobInventoryPolicyName} that the service accepts. */
export enum KnownBlobInventoryPolicyName {
  /** default */
  Default = "default",
}

/** Type of BlobInventoryPolicyName */
export type BlobInventoryPolicyName = string;

/** List of blob inventory policies returned. */
export interface _ListBlobInventoryPolicy {
  /** List of blob inventory policies. */
  readonly value?: BlobInventoryPolicy[];
  nextLink?: string;
}

export function _listBlobInventoryPolicyDeserializer(item: any): _ListBlobInventoryPolicy {
  return {
    value: !item["value"] ? item["value"] : blobInventoryPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function blobInventoryPolicyArraySerializer(result: Array<BlobInventoryPolicy>): any[] {
  return result.map((item) => {
    return blobInventoryPolicySerializer(item);
  });
}

export function blobInventoryPolicyArrayDeserializer(result: Array<BlobInventoryPolicy>): any[] {
  return result.map((item) => {
    return blobInventoryPolicyDeserializer(item);
  });
}

/** List of private endpoint connection associated with the specified storage account */
export interface _PrivateEndpointConnectionListResult {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnection[];
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDeserializer(
  item: any,
): _PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** The Encryption Scope resource. */
export interface EncryptionScope extends ProxyResource {
  /** The provider for the encryption scope. Possible values (case-insensitive):  Microsoft.Storage, Microsoft.KeyVault. */
  source?: EncryptionScopeSource;
  /** The state of the encryption scope. Possible values (case-insensitive):  Enabled, Disabled. */
  state?: EncryptionScopeState;
  /** Gets the creation date and time of the encryption scope in UTC. */
  readonly creationTime?: Date;
  /** Gets the last modification date and time of the encryption scope in UTC. */
  readonly lastModifiedTime?: Date;
  /** The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'. */
  keyVaultProperties?: EncryptionScopeKeyVaultProperties;
  /** A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest. */
  requireInfrastructureEncryption?: boolean;
}

export function encryptionScopeSerializer(item: EncryptionScope): any {
  return {
    properties: areAllPropsUndefined(item, [
      "source",
      "state",
      "keyVaultProperties",
      "requireInfrastructureEncryption",
    ])
      ? undefined
      : _encryptionScopePropertiesSerializer(item),
  };
}

export function encryptionScopeDeserializer(item: any): EncryptionScope {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _encryptionScopePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the encryption scope. */
export interface EncryptionScopeProperties {
  /** The provider for the encryption scope. Possible values (case-insensitive):  Microsoft.Storage, Microsoft.KeyVault. */
  source?: EncryptionScopeSource;
  /** The state of the encryption scope. Possible values (case-insensitive):  Enabled, Disabled. */
  state?: EncryptionScopeState;
  /** Gets the creation date and time of the encryption scope in UTC. */
  readonly creationTime?: Date;
  /** Gets the last modification date and time of the encryption scope in UTC. */
  readonly lastModifiedTime?: Date;
  /** The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'. */
  keyVaultProperties?: EncryptionScopeKeyVaultProperties;
  /** A boolean indicating whether or not the service applies a secondary layer of encryption with platform managed keys for data at rest. */
  requireInfrastructureEncryption?: boolean;
}

export function encryptionScopePropertiesSerializer(item: EncryptionScopeProperties): any {
  return {
    source: item["source"],
    state: item["state"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionScopeKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function encryptionScopePropertiesDeserializer(item: any): EncryptionScopeProperties {
  return {
    source: item["source"],
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionScopeKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

/** The provider for the encryption scope. Possible values (case-insensitive):  Microsoft.Storage, Microsoft.KeyVault. */
export enum KnownEncryptionScopeSource {
  /** Microsoft.Storage */
  MicrosoftStorage = "Microsoft.Storage",
  /** Microsoft.KeyVault */
  MicrosoftKeyVault = "Microsoft.KeyVault",
}

/**
 * The provider for the encryption scope. Possible values (case-insensitive):  Microsoft.Storage, Microsoft.KeyVault. \
 * {@link KnownEncryptionScopeSource} can be used interchangeably with EncryptionScopeSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.Storage** \
 * **Microsoft.KeyVault**
 */
export type EncryptionScopeSource = string;

/** The state of the encryption scope. Possible values (case-insensitive):  Enabled, Disabled. */
export enum KnownEncryptionScopeState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * The state of the encryption scope. Possible values (case-insensitive):  Enabled, Disabled. \
 * {@link KnownEncryptionScopeState} can be used interchangeably with EncryptionScopeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type EncryptionScopeState = string;

/** The key vault properties for the encryption scope. This is a required field if encryption scope 'source' attribute is set to 'Microsoft.KeyVault'. */
export interface EncryptionScopeKeyVaultProperties {
  /** The object identifier for a key vault key object. When applied, the encryption scope will use the key referenced by the identifier to enable customer-managed key support on this encryption scope. */
  keyUri?: string;
  /** The object identifier of the current versioned Key Vault Key in use. */
  readonly currentVersionedKeyIdentifier?: string;
  /** Timestamp of last rotation of the Key Vault Key. */
  readonly lastKeyRotationTimestamp?: Date;
}

export function encryptionScopeKeyVaultPropertiesSerializer(
  item: EncryptionScopeKeyVaultProperties,
): any {
  return { keyUri: item["keyUri"] };
}

export function encryptionScopeKeyVaultPropertiesDeserializer(
  item: any,
): EncryptionScopeKeyVaultProperties {
  return {
    keyUri: item["keyUri"],
    currentVersionedKeyIdentifier: item["currentVersionedKeyIdentifier"],
    lastKeyRotationTimestamp: !item["lastKeyRotationTimestamp"]
      ? item["lastKeyRotationTimestamp"]
      : new Date(item["lastKeyRotationTimestamp"]),
  };
}

/** The response of a EncryptionScope list operation. */
export interface _EncryptionScopeListResult {
  /** The EncryptionScope items on this page */
  value: EncryptionScope[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _encryptionScopeListResultDeserializer(item: any): _EncryptionScopeListResult {
  return {
    value: encryptionScopeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function encryptionScopeArraySerializer(result: Array<EncryptionScope>): any[] {
  return result.map((item) => {
    return encryptionScopeSerializer(item);
  });
}

export function encryptionScopeArrayDeserializer(result: Array<EncryptionScope>): any[] {
  return result.map((item) => {
    return encryptionScopeDeserializer(item);
  });
}

/** The properties of a storage account’s Table service. */
export interface TableServiceProperties extends ProxyResource {
  /** Specifies CORS rules for the Table service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Table service. */
  cors?: CorsRules;
}

export function tableServicePropertiesSerializer(item: TableServiceProperties): any {
  return {
    properties: areAllPropsUndefined(item, ["cors"])
      ? undefined
      : _tableServicePropertiesPropertiesSerializer(item),
  };
}

export function tableServicePropertiesDeserializer(item: any): TableServiceProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _tableServicePropertiesPropertiesDeserializer(item["properties"])),
  };
}

/** The properties of a storage account’s Table service. */
export interface TableServicePropertiesProperties {
  /** Specifies CORS rules for the Table service. You can include up to five CorsRule elements in the request. If no CorsRule elements are included in the request body, all CORS rules will be deleted, and CORS will be disabled for the Table service. */
  cors?: CorsRules;
}

export function tableServicePropertiesPropertiesSerializer(
  item: TableServicePropertiesProperties,
): any {
  return { cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]) };
}

export function tableServicePropertiesPropertiesDeserializer(
  item: any,
): TableServicePropertiesProperties {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
  };
}

/** model interface ListTableServices */
export interface ListTableServices {
  /** List of table services returned. */
  readonly value?: TableServiceProperties[];
}

export function listTableServicesDeserializer(item: any): ListTableServices {
  return {
    value: !item["value"] ? item["value"] : tableServicePropertiesArrayDeserializer(item["value"]),
  };
}

export function tableServicePropertiesArraySerializer(
  result: Array<TableServiceProperties>,
): any[] {
  return result.map((item) => {
    return tableServicePropertiesSerializer(item);
  });
}

export function tableServicePropertiesArrayDeserializer(
  result: Array<TableServiceProperties>,
): any[] {
  return result.map((item) => {
    return tableServicePropertiesDeserializer(item);
  });
}

/** The Network Security Perimeter configuration resource. */
export interface NetworkSecurityPerimeterConfiguration extends ProxyResource {
  /** Provisioning state of Network Security Perimeter configuration propagation */
  readonly provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of Provisioning Issues if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  /** NetworkSecurityPerimeter related information */
  readonly networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Information about resource association */
  readonly resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
  /** Network Security Perimeter profile */
  readonly profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
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
  };
}

/** Properties of the Network Security Perimeter Configuration */
export interface NetworkSecurityPerimeterConfigurationProperties {
  /** Provisioning state of Network Security Perimeter configuration propagation */
  readonly provisioningState?: NetworkSecurityPerimeterConfigurationProvisioningState;
  /** List of Provisioning Issues if any */
  readonly provisioningIssues?: ProvisioningIssue[];
  /** NetworkSecurityPerimeter related information */
  readonly networkSecurityPerimeter?: NetworkSecurityPerimeter;
  /** Information about resource association */
  readonly resourceAssociation?: NetworkSecurityPerimeterConfigurationPropertiesResourceAssociation;
  /** Network Security Perimeter profile */
  readonly profile?: NetworkSecurityPerimeterConfigurationPropertiesProfile;
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
  };
}

/** Provisioning state of Network Security Perimeter configuration propagation */
export enum KnownNetworkSecurityPerimeterConfigurationProvisioningState {
  /** Accepted */
  Accepted = "Accepted",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Deleting */
  Deleting = "Deleting",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * Provisioning state of Network Security Perimeter configuration propagation \
 * {@link KnownNetworkSecurityPerimeterConfigurationProvisioningState} can be used interchangeably with NetworkSecurityPerimeterConfigurationProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted** \
 * **Succeeded** \
 * **Failed** \
 * **Deleting** \
 * **Canceled**
 */
export type NetworkSecurityPerimeterConfigurationProvisioningState = string;

export function provisioningIssueArrayDeserializer(result: Array<ProvisioningIssue>): any[] {
  return result.map((item) => {
    return provisioningIssueDeserializer(item);
  });
}

/** Describes provisioning issue for given NetworkSecurityPerimeterConfiguration */
export interface ProvisioningIssue {
  /** Name of the issue */
  name?: string;
  /** Properties of provisioning issue */
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

/** Properties of provisioning issue */
export interface ProvisioningIssueProperties {
  /** Type of issue */
  issueType?: IssueType;
  /** Severity of the issue. */
  severity?: Severity;
  /** Description of the issue */
  description?: string;
}

export function provisioningIssuePropertiesDeserializer(item: any): ProvisioningIssueProperties {
  return {
    issueType: item["issueType"],
    severity: item["severity"],
    description: item["description"],
  };
}

/** Type of issue */
export enum KnownIssueType {
  /** Unknown */
  Unknown = "Unknown",
  /** ConfigurationPropagationFailure */
  ConfigurationPropagationFailure = "ConfigurationPropagationFailure",
}

/**
 * Type of issue \
 * {@link KnownIssueType} can be used interchangeably with IssueType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown** \
 * **ConfigurationPropagationFailure**
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

/** NetworkSecurityPerimeter related information */
export interface NetworkSecurityPerimeter {
  /** The ARM identifier of the resource */
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
  /** Enforced */
  Enforced = "Enforced",
  /** Learning */
  Learning = "Learning",
  /** Audit */
  Audit = "Audit",
}

/**
 * Access Mode of the resource association \
 * {@link KnownResourceAssociationAccessMode} can be used interchangeably with ResourceAssociationAccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enforced** \
 * **Learning** \
 * **Audit**
 */
export type ResourceAssociationAccessMode = string;

/** Network Security Perimeter profile */
export interface NetworkSecurityPerimeterConfigurationPropertiesProfile {
  /** Name of the resource */
  name?: string;
  /** Current access rules version */
  accessRulesVersion?: number;
  /** List of Access Rules */
  accessRules?: NspAccessRule[];
  /** Diagnostic settings version */
  diagnosticSettingsVersion?: number;
  /** Enabled logging categories */
  enabledLogCategories?: string[];
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
    diagnosticSettingsVersion: item["diagnosticSettingsVersion"],
    enabledLogCategories: !item["enabledLogCategories"]
      ? item["enabledLogCategories"]
      : item["enabledLogCategories"].map((p: any) => {
          return p;
        }),
  };
}

export function nspAccessRuleArrayDeserializer(result: Array<NspAccessRule>): any[] {
  return result.map((item) => {
    return nspAccessRuleDeserializer(item);
  });
}

/** Information of Access Rule in Network Security Perimeter profile */
export interface NspAccessRule {
  /** Name of the resource */
  name?: string;
  /** Properties of Access Rule */
  readonly properties?: NspAccessRuleProperties;
}

export function nspAccessRuleDeserializer(item: any): NspAccessRule {
  return {
    name: item["name"],
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
  /** The ARM identifier of subscription */
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

/** Result of the List Network Security Perimeter configuration operation. */
export interface _NetworkSecurityPerimeterConfigurationList {
  /** The NetworkSecurityPerimeterConfiguration items on this page */
  readonly value: NetworkSecurityPerimeterConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _networkSecurityPerimeterConfigurationListDeserializer(
  item: any,
): _NetworkSecurityPerimeterConfigurationList {
  return {
    value: networkSecurityPerimeterConfigurationArrayDeserializer(item["value"]),
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

/** The storage task assignment. */
export interface StorageTaskAssignment extends ProxyResource {
  /** Properties of the storage task assignment. */
  properties?: StorageTaskAssignmentProperties;
}

export function storageTaskAssignmentSerializer(item: StorageTaskAssignment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskAssignmentPropertiesSerializer(item["properties"]),
  };
}

export function storageTaskAssignmentDeserializer(item: any): StorageTaskAssignment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskAssignmentPropertiesDeserializer(item["properties"]),
  };
}

/** Properties of the storage task assignment. */
export interface StorageTaskAssignmentProperties {
  /** Id of the corresponding storage task */
  taskId: string;
  /** Whether the storage task assignment is enabled or not */
  enabled: boolean;
  /** Text that describes the purpose of the storage task assignment */
  description: string;
  /** The storage task assignment execution context */
  executionContext: StorageTaskAssignmentExecutionContext;
  /** The storage task assignment report */
  report: StorageTaskAssignmentReport;
  /** Represents the provisioning state of the storage task assignment. */
  readonly provisioningState?: StorageTaskAssignmentProvisioningState;
  /** Run status of storage task assignment */
  runStatus?: StorageTaskReportProperties;
}

export function storageTaskAssignmentPropertiesSerializer(
  item: StorageTaskAssignmentProperties,
): any {
  return {
    taskId: item["taskId"],
    enabled: item["enabled"],
    description: item["description"],
    executionContext: storageTaskAssignmentExecutionContextSerializer(item["executionContext"]),
    report: storageTaskAssignmentReportSerializer(item["report"]),
    runStatus: !item["runStatus"]
      ? item["runStatus"]
      : storageTaskReportPropertiesSerializer(item["runStatus"]),
  };
}

export function storageTaskAssignmentPropertiesDeserializer(
  item: any,
): StorageTaskAssignmentProperties {
  return {
    taskId: item["taskId"],
    enabled: item["enabled"],
    description: item["description"],
    executionContext: storageTaskAssignmentExecutionContextDeserializer(item["executionContext"]),
    report: storageTaskAssignmentReportDeserializer(item["report"]),
    provisioningState: item["provisioningState"],
    runStatus: !item["runStatus"]
      ? item["runStatus"]
      : storageTaskReportPropertiesDeserializer(item["runStatus"]),
  };
}

/** Execution context of the storage task assignment. */
export interface StorageTaskAssignmentExecutionContext {
  /** Execution target of the storage task assignment */
  target?: ExecutionTarget;
  /** Execution trigger of the storage task assignment */
  trigger: ExecutionTrigger;
}

export function storageTaskAssignmentExecutionContextSerializer(
  item: StorageTaskAssignmentExecutionContext,
): any {
  return {
    target: !item["target"] ? item["target"] : executionTargetSerializer(item["target"]),
    trigger: executionTriggerSerializer(item["trigger"]),
  };
}

export function storageTaskAssignmentExecutionContextDeserializer(
  item: any,
): StorageTaskAssignmentExecutionContext {
  return {
    target: !item["target"] ? item["target"] : executionTargetDeserializer(item["target"]),
    trigger: executionTriggerDeserializer(item["trigger"]),
  };
}

/** Target helps provide filter parameters for the objects in the storage account and forms the execution context for the storage task */
export interface ExecutionTarget {
  /** Required list of object prefixes to be included for task execution */
  prefix?: string[];
  /** List of object prefixes to be excluded from task execution. If there is a conflict between include and exclude prefixes, the exclude prefix will be the determining factor */
  excludePrefix?: string[];
}

export function executionTargetSerializer(item: ExecutionTarget): any {
  return {
    prefix: !item["prefix"]
      ? item["prefix"]
      : item["prefix"].map((p: any) => {
          return p;
        }),
    excludePrefix: !item["excludePrefix"]
      ? item["excludePrefix"]
      : item["excludePrefix"].map((p: any) => {
          return p;
        }),
  };
}

export function executionTargetDeserializer(item: any): ExecutionTarget {
  return {
    prefix: !item["prefix"]
      ? item["prefix"]
      : item["prefix"].map((p: any) => {
          return p;
        }),
    excludePrefix: !item["excludePrefix"]
      ? item["excludePrefix"]
      : item["excludePrefix"].map((p: any) => {
          return p;
        }),
  };
}

/** Execution trigger for storage task assignment */
export interface ExecutionTrigger {
  /** The trigger type of the storage task assignment execution */
  type: TriggerType;
  /** The trigger parameters of the storage task assignment execution */
  parameters: TriggerParameters;
}

export function executionTriggerSerializer(item: ExecutionTrigger): any {
  return { type: item["type"], parameters: triggerParametersSerializer(item["parameters"]) };
}

export function executionTriggerDeserializer(item: any): ExecutionTrigger {
  return {
    type: item["type"],
    parameters: triggerParametersDeserializer(item["parameters"]),
  };
}

/** The trigger type of the storage task assignment execution */
export enum KnownTriggerType {
  /** RunOnce */
  RunOnce = "RunOnce",
  /** OnSchedule */
  OnSchedule = "OnSchedule",
  /** Run the task as a mock for testing */
  MockRun = "MockRun",
}

/**
 * The trigger type of the storage task assignment execution \
 * {@link KnownTriggerType} can be used interchangeably with TriggerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RunOnce** \
 * **OnSchedule** \
 * **MockRun**: Run the task as a mock for testing
 */
export type TriggerType = string;

/** The trigger parameters update for the storage task assignment execution */
export interface TriggerParameters {
  /** When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  startFrom?: Date;
  /** Run interval of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  interval?: number;
  /** Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  intervalUnit?: IntervalUnit;
  /** When to end task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  endBy?: Date;
  /** When to start task execution. This is a required field when ExecutionTrigger.properties.type is 'RunOnce'; this property should not be present when ExecutionTrigger.properties.type is 'OnSchedule' */
  startOn?: Date;
}

export function triggerParametersSerializer(item: TriggerParameters): any {
  return {
    startFrom: !item["startFrom"] ? item["startFrom"] : item["startFrom"].toISOString(),
    interval: item["interval"],
    intervalUnit: item["intervalUnit"],
    endBy: !item["endBy"] ? item["endBy"] : item["endBy"].toISOString(),
    startOn: !item["startOn"] ? item["startOn"] : item["startOn"].toISOString(),
  };
}

export function triggerParametersDeserializer(item: any): TriggerParameters {
  return {
    startFrom: !item["startFrom"] ? item["startFrom"] : new Date(item["startFrom"]),
    interval: item["interval"],
    intervalUnit: item["intervalUnit"],
    endBy: !item["endBy"] ? item["endBy"] : new Date(item["endBy"]),
    startOn: !item["startOn"] ? item["startOn"] : new Date(item["startOn"]),
  };
}

/** Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
export enum KnownIntervalUnit {
  /** Days */
  Days = "Days",
}

/**
 * Run interval unit of task execution. This is a required field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' \
 * {@link KnownIntervalUnit} can be used interchangeably with IntervalUnit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Days**
 */
export type IntervalUnit = string;

/** The storage task assignment report */
export interface StorageTaskAssignmentReport {
  /** The container prefix for the location of storage task assignment report */
  prefix: string;
}

export function storageTaskAssignmentReportSerializer(item: StorageTaskAssignmentReport): any {
  return { prefix: item["prefix"] };
}

export function storageTaskAssignmentReportDeserializer(item: any): StorageTaskAssignmentReport {
  return {
    prefix: item["prefix"],
  };
}

/** Gets the status of the storage account at the time the operation was called. */
export enum KnownStorageTaskAssignmentProvisioningState {
  /** ValidateSubscriptionQuotaBegin */
  ValidateSubscriptionQuotaBegin = "ValidateSubscriptionQuotaBegin",
  /** ValidateSubscriptionQuotaEnd */
  ValidateSubscriptionQuotaEnd = "ValidateSubscriptionQuotaEnd",
  /** Accepted */
  Accepted = "Accepted",
  /** Creating */
  Creating = "Creating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Deleting */
  Deleting = "Deleting",
  /** Canceled */
  Canceled = "Canceled",
  /** Failed */
  Failed = "Failed",
}

/**
 * Gets the status of the storage account at the time the operation was called. \
 * {@link KnownStorageTaskAssignmentProvisioningState} can be used interchangeably with StorageTaskAssignmentProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ValidateSubscriptionQuotaBegin** \
 * **ValidateSubscriptionQuotaEnd** \
 * **Accepted** \
 * **Creating** \
 * **Succeeded** \
 * **Deleting** \
 * **Canceled** \
 * **Failed**
 */
export type StorageTaskAssignmentProvisioningState = string;

/** Storage task execution report for a run instance. */
export interface StorageTaskReportProperties {
  /** Represents the Storage Task Assignment Id associated with the storage task that provided an execution context. */
  readonly taskAssignmentId?: string;
  /** Represents the Storage Account Id where the storage task definition was applied and executed. */
  readonly storageAccountId?: string;
  /** Start time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly startTime?: string;
  /** End time of the run instance. Filter options such as startTime gt '2023-06-26T20:51:24.4494016Z' and other comparison operators can be used as described for DateTime properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly finishTime?: string;
  /** Total number of objects that meet the condition as defined in the storage task assignment execution context. Filter options such as objectsTargetedCount gt 50 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectsTargetedCount?: string;
  /** Total number of objects that meet the storage tasks condition and were operated upon. Filter options such as objectsOperatedOnCount ge 100 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectsOperatedOnCount?: string;
  /** Total number of objects where task operation failed when was attempted. Filter options such as objectFailedCount eq 0 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectFailedCount?: string;
  /** Total number of objects where task operation succeeded when was attempted.Filter options such as objectsSucceededCount gt 150 and other comparison operators can be used as described for Numerical properties in https://learn.microsoft.com/rest/api/storageservices/querying-tables-and-entities#supported-comparison-operators */
  readonly objectsSucceededCount?: string;
  /** Well known Azure Storage error code that represents the error encountered during execution of the run instance. */
  readonly runStatusError?: string;
  /** Represents the status of the execution. */
  readonly runStatusEnum?: RunStatusEnum;
  /** Full path to the verbose report stored in the reporting container as specified in the assignment execution context for the storage account. */
  readonly summaryReportPath?: string;
  /** Storage Task Arm Id. */
  readonly taskId?: string;
  /** Storage Task Version */
  readonly taskVersion?: string;
  /** Represents the overall result of the execution for the run instance */
  readonly runResult?: RunResult;
}

export function storageTaskReportPropertiesSerializer(_item: StorageTaskReportProperties): any {
  return {};
}

export function storageTaskReportPropertiesDeserializer(item: any): StorageTaskReportProperties {
  return {
    taskAssignmentId: item["taskAssignmentId"],
    storageAccountId: item["storageAccountId"],
    startTime: item["startTime"],
    finishTime: item["finishTime"],
    objectsTargetedCount: item["objectsTargetedCount"],
    objectsOperatedOnCount: item["objectsOperatedOnCount"],
    objectFailedCount: item["objectFailedCount"],
    objectsSucceededCount: item["objectsSucceededCount"],
    runStatusError: item["runStatusError"],
    runStatusEnum: item["runStatusEnum"],
    summaryReportPath: item["summaryReportPath"],
    taskId: item["taskId"],
    taskVersion: item["taskVersion"],
    runResult: item["runResult"],
  };
}

/** Represents the status of the execution. */
export enum KnownRunStatusEnum {
  /** InProgress */
  InProgress = "InProgress",
  /** Finished */
  Finished = "Finished",
}

/**
 * Represents the status of the execution. \
 * {@link KnownRunStatusEnum} can be used interchangeably with RunStatusEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Finished**
 */
export type RunStatusEnum = string;

/** Represents the overall result of the execution for the run instance */
export enum KnownRunResult {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
}

/**
 * Represents the overall result of the execution for the run instance \
 * {@link KnownRunResult} can be used interchangeably with RunResult,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed**
 */
export type RunResult = string;

/** Parameters of the storage task assignment update request */
export interface StorageTaskAssignmentUpdateParameters {
  /** Properties of the storage task assignment. */
  properties?: StorageTaskAssignmentUpdateProperties;
}

export function storageTaskAssignmentUpdateParametersSerializer(
  item: StorageTaskAssignmentUpdateParameters,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskAssignmentUpdatePropertiesSerializer(item["properties"]),
  };
}

/** Properties of the storage task update assignment. */
export interface StorageTaskAssignmentUpdateProperties {
  /** Id of the corresponding storage task */
  readonly taskId?: string;
  /** Whether the storage task assignment is enabled or not */
  enabled?: boolean;
  /** Text that describes the purpose of the storage task assignment */
  description?: string;
  /** The storage task assignment execution context */
  executionContext?: StorageTaskAssignmentUpdateExecutionContext;
  /** The storage task assignment report */
  report?: StorageTaskAssignmentUpdateReport;
  /** Represents the provisioning state of the storage task assignment. */
  readonly provisioningState?: StorageTaskAssignmentProvisioningState;
  /** Run status of storage task assignment */
  runStatus?: StorageTaskReportProperties;
}

export function storageTaskAssignmentUpdatePropertiesSerializer(
  item: StorageTaskAssignmentUpdateProperties,
): any {
  return {
    enabled: item["enabled"],
    description: item["description"],
    executionContext: !item["executionContext"]
      ? item["executionContext"]
      : storageTaskAssignmentUpdateExecutionContextSerializer(item["executionContext"]),
    report: !item["report"]
      ? item["report"]
      : storageTaskAssignmentUpdateReportSerializer(item["report"]),
    runStatus: !item["runStatus"]
      ? item["runStatus"]
      : storageTaskReportPropertiesSerializer(item["runStatus"]),
  };
}

/** Execution context of the storage task assignment update. */
export interface StorageTaskAssignmentUpdateExecutionContext {
  /** Execution target of the storage task assignment */
  target?: ExecutionTarget;
  /** Execution trigger of the storage task assignment */
  trigger?: ExecutionTriggerUpdate;
}

export function storageTaskAssignmentUpdateExecutionContextSerializer(
  item: StorageTaskAssignmentUpdateExecutionContext,
): any {
  return {
    target: !item["target"] ? item["target"] : executionTargetSerializer(item["target"]),
    trigger: !item["trigger"] ? item["trigger"] : executionTriggerUpdateSerializer(item["trigger"]),
  };
}

/** Execution trigger update for storage task assignment */
export interface ExecutionTriggerUpdate {
  /** The trigger type of the storage task assignment execution */
  type?: TriggerType;
  /** The trigger parameters of the storage task assignment execution */
  parameters?: TriggerParametersUpdate;
}

export function executionTriggerUpdateSerializer(item: ExecutionTriggerUpdate): any {
  return {
    type: item["type"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : triggerParametersUpdateSerializer(item["parameters"]),
  };
}

/** The trigger parameters update for the storage task assignment execution */
export interface TriggerParametersUpdate {
  /** When to start task execution. This is a mutable field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  startFrom?: Date;
  /** Run interval of task execution. This is a mutable field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  interval?: number;
  /** Run interval unit of task execution. This is a mutable field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  intervalUnit?: IntervalUnit;
  /** When to end task execution. This is a mutable field when ExecutionTrigger.properties.type is 'OnSchedule'; this property should not be present when ExecutionTrigger.properties.type is 'RunOnce' */
  endBy?: Date;
  /** When to start task execution. This is a mutable field when ExecutionTrigger.properties.type is 'RunOnce'; this property should not be present when ExecutionTrigger.properties.type is 'OnSchedule' */
  startOn?: Date;
}

export function triggerParametersUpdateSerializer(item: TriggerParametersUpdate): any {
  return {
    startFrom: !item["startFrom"] ? item["startFrom"] : item["startFrom"].toISOString(),
    interval: item["interval"],
    intervalUnit: item["intervalUnit"],
    endBy: !item["endBy"] ? item["endBy"] : item["endBy"].toISOString(),
    startOn: !item["startOn"] ? item["startOn"] : item["startOn"].toISOString(),
  };
}

/** The storage task assignment report */
export interface StorageTaskAssignmentUpdateReport {
  /** The prefix of the storage task assignment report */
  prefix?: string;
}

export function storageTaskAssignmentUpdateReportSerializer(
  item: StorageTaskAssignmentUpdateReport,
): any {
  return { prefix: item["prefix"] };
}

/** List of storage task assignments for the storage account */
export interface _StorageTaskAssignmentsList {
  /** The StorageTaskAssignment items on this page */
  readonly value: StorageTaskAssignment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageTaskAssignmentsListDeserializer(item: any): _StorageTaskAssignmentsList {
  return {
    value: storageTaskAssignmentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageTaskAssignmentArraySerializer(result: Array<StorageTaskAssignment>): any[] {
  return result.map((item) => {
    return storageTaskAssignmentSerializer(item);
  });
}

export function storageTaskAssignmentArrayDeserializer(
  result: Array<StorageTaskAssignment>,
): any[] {
  return result.map((item) => {
    return storageTaskAssignmentDeserializer(item);
  });
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponse_1 {
  /** The error object. */
  error?: ErrorDetail;
}

export function errorResponseDeserializer_1(item: any): ErrorResponse_1 {
  return {
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** A Connector is a tracked ARM resource modeled as a sub-resource of a Storage Account. */
export interface Connector extends TrackedResource {
  /** The properties of the Storage Connector. */
  properties: StorageConnectorProperties;
}

export function connectorSerializer(item: Connector): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: storageConnectorPropertiesSerializer(item["properties"]),
  };
}

export function connectorDeserializer(item: any): Connector {
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
    properties: storageConnectorPropertiesDeserializer(item["properties"]),
  };
}

/** The storage connector properties */
export interface StorageConnectorProperties {
  /** System-generated GUID identifier for the Storage Connector. Not a valid input parameter when creating. */
  readonly uniqueId?: string;
  /**
   * State - Active or Inactive. Whether or not the Storage Connector should start as active (default: Active)
   * (While set to false on the Storage Connector, all data plane requests using this Storage Connector fail, and this Storage Connector is not billed if it would be otherwise.
   */
  state?: StorageConnectorState;
  /**
   * System-generated creation time of the Storage Connector in ISO 8601 date-time format (YYYY-MM-DDTHH:mm:ssZ).
   * Not a valid input parameter during creating.
   */
  readonly creationTime?: string;
  /** Arbitrary description of this Storage Connector. Max 250 characters. */
  description?: string;
  /** Test connection to backing data source before creating the storage connector. */
  testConnection?: boolean;
  /** The type of backing data source for this Storage Connector. */
  dataSourceType: StorageConnectorDataSourceType;
  /** Information about how to communicate with and authenticate to the backing data store. */
  source: StorageConnectorSourceUnion;
  /** Represents the provisioning state of the storage connector. */
  readonly provisioningState?: NativeDataSharingProvisioningState;
}

export function storageConnectorPropertiesSerializer(item: StorageConnectorProperties): any {
  return {
    state: item["state"],
    description: item["description"],
    testConnection: item["testConnection"],
    dataSourceType: item["dataSourceType"],
    source: storageConnectorSourceUnionSerializer(item["source"]),
  };
}

export function storageConnectorPropertiesDeserializer(item: any): StorageConnectorProperties {
  return {
    uniqueId: item["uniqueId"],
    state: item["state"],
    creationTime: item["creationTime"],
    description: item["description"],
    testConnection: item["testConnection"],
    dataSourceType: item["dataSourceType"],
    source: storageConnectorSourceUnionDeserializer(item["source"]),
    provisioningState: item["provisioningState"],
  };
}

/** The state of the storage connector */
export enum KnownStorageConnectorState {
  /** Whether the connector is active */
  Active = "Active",
  /** Whether the connector is inactive */
  Inactive = "Inactive",
}

/**
 * The state of the storage connector \
 * {@link KnownStorageConnectorState} can be used interchangeably with StorageConnectorState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Whether the connector is active \
 * **Inactive**: Whether the connector is inactive
 */
export type StorageConnectorState = string;

/** The type of the backing data source for storage connector */
export enum KnownStorageConnectorDataSourceType {
  /** Azure DataShare data source type. */
  AzureDataShare = "Azure_DataShare",
}

/**
 * The type of the backing data source for storage connector \
 * {@link KnownStorageConnectorDataSourceType} can be used interchangeably with StorageConnectorDataSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Azure_DataShare**: Azure DataShare data source type.
 */
export type StorageConnectorDataSourceType = string;

/** The storage connector backing data source information */
export interface StorageConnectorSource {
  /** Type of the Storage Connector. Not mutable once the Storage Connector is created." */
  /** The discriminator possible values: DataShare */
  type: StorageConnectorSourceType;
}

export function storageConnectorSourceSerializer(item: StorageConnectorSource): any {
  return { type: item["type"] };
}

export function storageConnectorSourceDeserializer(item: any): StorageConnectorSource {
  return {
    type: item["type"],
  };
}

/** Alias for StorageConnectorSourceUnion */
export type StorageConnectorSourceUnion = DataShareSource | StorageConnectorSource;

export function storageConnectorSourceUnionSerializer(item: StorageConnectorSourceUnion): any {
  switch (item.type) {
    case "DataShare":
      return dataShareSourceSerializer(item as DataShareSource);

    default:
      return storageConnectorSourceSerializer(item);
  }
}

export function storageConnectorSourceUnionDeserializer(item: any): StorageConnectorSourceUnion {
  switch (item["type"]) {
    case "DataShare":
      return dataShareSourceDeserializer(item as DataShareSource);

    default:
      return storageConnectorSourceDeserializer(item);
  }
}

/** The type of the backing data source for storage connector */
export enum KnownStorageConnectorSourceType {
  /** Source type - DataShare */
  DataShare = "DataShare",
}

/**
 * The type of the backing data source for storage connector \
 * {@link KnownStorageConnectorSourceType} can be used interchangeably with StorageConnectorSourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataShare**: Source type - DataShare
 */
export type StorageConnectorSourceType = string;

/** The properties of data share source */
export interface DataShareSource extends StorageConnectorSource {
  /** The type for data share source */
  type: "DataShare";
  /** Details for how to connect to the backing data store. */
  connection: StorageConnectorConnectionUnion;
  /** Details for how to authenticate to the backing data store. */
  authProperties: StorageConnectorAuthPropertiesUnion;
}

export function dataShareSourceSerializer(item: DataShareSource): any {
  return {
    type: item["type"],
    connection: storageConnectorConnectionUnionSerializer(item["connection"]),
    authProperties: storageConnectorAuthPropertiesUnionSerializer(item["authProperties"]),
  };
}

export function dataShareSourceDeserializer(item: any): DataShareSource {
  return {
    type: item["type"],
    connection: storageConnectorConnectionUnionDeserializer(item["connection"]),
    authProperties: storageConnectorAuthPropertiesUnionDeserializer(item["authProperties"]),
  };
}

/** The connection properties of the backing data source */
export interface StorageConnectorConnection {
  /** Type of the connection. Controls the type of the connection object. Not mutable once the Storage Connector is created. */
  /** The discriminator possible values: DataShare */
  type: StorageConnectorConnectionType;
}

export function storageConnectorConnectionSerializer(item: StorageConnectorConnection): any {
  return { type: item["type"] };
}

export function storageConnectorConnectionDeserializer(item: any): StorageConnectorConnection {
  return {
    type: item["type"],
  };
}

/** Alias for StorageConnectorConnectionUnion */
export type StorageConnectorConnectionUnion = DataShareConnection | StorageConnectorConnection;

export function storageConnectorConnectionUnionSerializer(
  item: StorageConnectorConnectionUnion,
): any {
  switch (item.type) {
    case "DataShare":
      return dataShareConnectionSerializer(item as DataShareConnection);

    default:
      return storageConnectorConnectionSerializer(item);
  }
}

export function storageConnectorConnectionUnionDeserializer(
  item: any,
): StorageConnectorConnectionUnion {
  switch (item["type"]) {
    case "DataShare":
      return dataShareConnectionDeserializer(item as DataShareConnection);

    default:
      return storageConnectorConnectionDeserializer(item);
  }
}

/** The connection type for bucket connection in storage connector. */
export enum KnownStorageConnectorConnectionType {
  /** DataShare connection type */
  DataShare = "DataShare",
}

/**
 * The connection type for bucket connection in storage connector. \
 * {@link KnownStorageConnectorConnectionType} can be used interchangeably with StorageConnectorConnectionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DataShare**: DataShare connection type
 */
export type StorageConnectorConnectionType = string;

/** The connection details for Data Share source */
export interface DataShareConnection extends StorageConnectorConnection {
  /** The type for data share connection */
  type: "DataShare";
  /** The URI of the backing DataShare. Must be in the format: azds://<region>:<DataShareName>:<DataShareIdentifier> */
  dataShareUri: string;
}

export function dataShareConnectionSerializer(item: DataShareConnection): any {
  return { type: item["type"], dataShareUri: item["dataShareUri"] };
}

export function dataShareConnectionDeserializer(item: any): DataShareConnection {
  return {
    type: item["type"],
    dataShareUri: item["dataShareUri"],
  };
}

/** The authentication properties of the backing data source */
export interface StorageConnectorAuthProperties {
  /** Type of the authentication properties. Controls the type of the authProperties object */
  /** The discriminator possible values: ManagedIdentity */
  type: StorageConnectorAuthType;
}

export function storageConnectorAuthPropertiesSerializer(
  item: StorageConnectorAuthProperties,
): any {
  return { type: item["type"] };
}

export function storageConnectorAuthPropertiesDeserializer(
  item: any,
): StorageConnectorAuthProperties {
  return {
    type: item["type"],
  };
}

/** Alias for StorageConnectorAuthPropertiesUnion */
export type StorageConnectorAuthPropertiesUnion =
  | ManagedIdentityAuthProperties
  | StorageConnectorAuthProperties;

export function storageConnectorAuthPropertiesUnionSerializer(
  item: StorageConnectorAuthPropertiesUnion,
): any {
  switch (item.type) {
    case "ManagedIdentity":
      return managedIdentityAuthPropertiesSerializer(item as ManagedIdentityAuthProperties);

    default:
      return storageConnectorAuthPropertiesSerializer(item);
  }
}

export function storageConnectorAuthPropertiesUnionDeserializer(
  item: any,
): StorageConnectorAuthPropertiesUnion {
  switch (item["type"]) {
    case "ManagedIdentity":
      return managedIdentityAuthPropertiesDeserializer(item as ManagedIdentityAuthProperties);

    default:
      return storageConnectorAuthPropertiesDeserializer(item);
  }
}

/** The auth type supported for bucket connection in storage connector. */
export enum KnownStorageConnectorAuthType {
  /** Managed Identity auth type */
  ManagedIdentity = "ManagedIdentity",
}

/**
 * The auth type supported for bucket connection in storage connector. \
 * {@link KnownStorageConnectorAuthType} can be used interchangeably with StorageConnectorAuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ManagedIdentity**: Managed Identity auth type
 */
export type StorageConnectorAuthType = string;

/** The managed identity auth properties for dataShare connection. */
export interface ManagedIdentityAuthProperties extends StorageConnectorAuthProperties {
  /** The type of managed identity auth */
  type: "ManagedIdentity";
  /** ARM ResourceId of the managed identity that should be used to authenticate to the backing data source. */
  identityResourceId?: string;
}

export function managedIdentityAuthPropertiesSerializer(item: ManagedIdentityAuthProperties): any {
  return { type: item["type"], identityResourceId: item["identityResourceId"] };
}

export function managedIdentityAuthPropertiesDeserializer(
  item: any,
): ManagedIdentityAuthProperties {
  return {
    type: item["type"],
    identityResourceId: item["identityResourceId"],
  };
}

/** Provisioning state of the resource at the time the operation was called. */
export enum KnownNativeDataSharingProvisioningState {
  /** The request has been accepted for processing. */
  Accepted = "Accepted",
  /** The resource is being created. */
  Creating = "Creating",
  /** The resource has been successfully created. */
  Succeeded = "Succeeded",
  /** The resource is being deleted. */
  Deleting = "Deleting",
  /** The request has been canceled. */
  Canceled = "Canceled",
  /** The resource creation or deletion has failed. */
  Failed = "Failed",
}

/**
 * Provisioning state of the resource at the time the operation was called. \
 * {@link KnownNativeDataSharingProvisioningState} can be used interchangeably with NativeDataSharingProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: The request has been accepted for processing. \
 * **Creating**: The resource is being created. \
 * **Succeeded**: The resource has been successfully created. \
 * **Deleting**: The resource is being deleted. \
 * **Canceled**: The request has been canceled. \
 * **Failed**: The resource creation or deletion has failed.
 */
export type NativeDataSharingProvisioningState = string;

/** A Connector is a tracked ARM resource modeled as a sub-resource of a Storage Account. */
export interface ConnectorUpdate extends TrackedResourceUpdate {
  /** The properties of the Storage Connector. */
  properties?: StorageConnectorPropertiesUpdate;
}

export function connectorUpdateSerializer(item: ConnectorUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : storageConnectorPropertiesUpdateSerializer(item["properties"]),
  };
}

/** The storage connector properties */
export interface StorageConnectorPropertiesUpdate {
  /**
   * State - Active or Inactive. Whether or not the Storage Connector should start as active (default: Active)
   * (While set to false on the Storage Connector, all data plane requests using this Storage Connector fail, and this Storage Connector is not billed if it would be otherwise.
   */
  state?: StorageConnectorState;
  /** Arbitrary description of this Storage Connector. Max 250 characters. */
  description?: string;
  /** Test connection to backing data source before creating the storage connector. */
  testConnection?: boolean;
  /** Information about how to communicate with and authenticate to the backing data store. */
  source?: StorageConnectorSourceUpdateUnion;
}

export function storageConnectorPropertiesUpdateSerializer(
  item: StorageConnectorPropertiesUpdate,
): any {
  return {
    state: item["state"],
    description: item["description"],
    testConnection: item["testConnection"],
    source: !item["source"]
      ? item["source"]
      : storageConnectorSourceUpdateUnionSerializer(item["source"]),
  };
}

/** The storage connector backing data source information */
export interface StorageConnectorSourceUpdate {
  /** Type of the Storage Connector. Not mutable once the Storage Connector is created." */
  /** The discriminator possible values: DataShare */
  type: StorageConnectorSourceType;
}

export function storageConnectorSourceUpdateSerializer(item: StorageConnectorSourceUpdate): any {
  return { type: item["type"] };
}

/** Alias for StorageConnectorSourceUpdateUnion */
export type StorageConnectorSourceUpdateUnion =
  | DataShareSourceUpdate
  | StorageConnectorSourceUpdate;

export function storageConnectorSourceUpdateUnionSerializer(
  item: StorageConnectorSourceUpdateUnion,
): any {
  switch (item.type) {
    case "DataShare":
      return dataShareSourceUpdateSerializer(item as DataShareSourceUpdate);

    default:
      return storageConnectorSourceUpdateSerializer(item);
  }
}

/** The properties of data share source */
export interface DataShareSourceUpdate extends StorageConnectorSourceUpdate {
  /** Discriminator value for DataShare */
  type: "DataShare";
  /** Details for how to authenticate to the backing data store. */
  authProperties?: StorageConnectorAuthPropertiesUpdateUnion;
}

export function dataShareSourceUpdateSerializer(item: DataShareSourceUpdate): any {
  return {
    type: item["type"],
    authProperties: !item["authProperties"]
      ? item["authProperties"]
      : storageConnectorAuthPropertiesUpdateUnionSerializer(item["authProperties"]),
  };
}

/** The authentication properties of the backing data source */
export interface StorageConnectorAuthPropertiesUpdate {
  /** Type of the authentication properties. Controls the type of the authProperties object */
  /** The discriminator possible values: ManagedIdentity */
  type: StorageConnectorAuthType;
}

export function storageConnectorAuthPropertiesUpdateSerializer(
  item: StorageConnectorAuthPropertiesUpdate,
): any {
  return { type: item["type"] };
}

/** Alias for StorageConnectorAuthPropertiesUpdateUnion */
export type StorageConnectorAuthPropertiesUpdateUnion =
  | ManagedIdentityAuthPropertiesUpdate
  | StorageConnectorAuthPropertiesUpdate;

export function storageConnectorAuthPropertiesUpdateUnionSerializer(
  item: StorageConnectorAuthPropertiesUpdateUnion,
): any {
  switch (item.type) {
    case "ManagedIdentity":
      return managedIdentityAuthPropertiesUpdateSerializer(
        item as ManagedIdentityAuthPropertiesUpdate,
      );

    default:
      return storageConnectorAuthPropertiesUpdateSerializer(item);
  }
}

/** The managed identity auth properties for dataShare connection. */
export interface ManagedIdentityAuthPropertiesUpdate extends StorageConnectorAuthPropertiesUpdate {
  /** Discriminator value for ManagedIdentity */
  type: "ManagedIdentity";
  /** ARM ResourceId of the managed identity that should be used to authenticate to the backing data source. */
  identityResourceId?: string;
}

export function managedIdentityAuthPropertiesUpdateSerializer(
  item: ManagedIdentityAuthPropertiesUpdate,
): any {
  return { type: item["type"], identityResourceId: item["identityResourceId"] };
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResourceUpdate extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function trackedResourceUpdateSerializer(item: TrackedResourceUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Connector list operation. */
export interface _ConnectorListResult {
  /** The Connector items on this page */
  value: Connector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _connectorListResultDeserializer(item: any): _ConnectorListResult {
  return {
    value: connectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function connectorArraySerializer(result: Array<Connector>): any[] {
  return result.map((item) => {
    return connectorSerializer(item);
  });
}

export function connectorArrayDeserializer(result: Array<Connector>): any[] {
  return result.map((item) => {
    return connectorDeserializer(item);
  });
}

/** Test existing connection request properties */
export interface TestExistingConnectionRequest {
  /** The uniqueId of the storage connector as returned by the server. */
  uniqueId: string;
}

export function testExistingConnectionRequestSerializer(item: TestExistingConnectionRequest): any {
  return { uniqueId: item["uniqueId"] };
}

/** Test connection response properties */
export interface TestConnectionResponse {
  /**
   * Indicates the method used to validate the connection to the backing data store.
   * Valid values are `GetBlob` and `ListBlobs` for failure, and `TestExistingConnection` for success.
   */
  storageConnectorMethodName: string;
  /**
   * A string representing the error received from the backing data store.
   * Format will vary depending on the data store type and will be capped at 1 MB in size.
   * The error message will be empty if the connection was successful.
   */
  storageConnectorErrorMessage?: string;
  /** The request Id associated with the request sent to the backing data store for validation. */
  storageConnectorRequestId: string;
}

export function testConnectionResponseDeserializer(item: any): TestConnectionResponse {
  return {
    storageConnectorMethodName: item["storageConnectorMethodName"],
    storageConnectorErrorMessage: item["storageConnectorErrorMessage"],
    storageConnectorRequestId: item["storageConnectorRequestId"],
  };
}

/** A DataShare is a tracked ARM resource modeled as a sub-resource of a Storage Account. */
export interface DataShare extends TrackedResource {
  /** The properties of the Storage DataShare. */
  properties: StorageDataShareProperties;
}

export function dataShareSerializer(item: DataShare): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: storageDataSharePropertiesSerializer(item["properties"]),
  };
}

export function dataShareDeserializer(item: any): DataShare {
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
    properties: storageDataSharePropertiesDeserializer(item["properties"]),
  };
}

/** The storage datashare properties */
export interface StorageDataShareProperties {
  /** System-generated GUID identifier for the Storage DataShare. Not a valid input parameter when creating. */
  readonly dataShareIdentifier?: string;
  /** Arbitrary description of this Data Share. Max 250 characters. */
  description?: string;
  /**
   * The DataShare URI to be shared with the consumer.
   * URI Format - 'azds://<location>:<dataShareName>:<dataShareIdentifier>'.
   */
  readonly dataShareUri?: string;
  /**
   * List of access policies that specify the permission allowed to a managed identity.
   * For Create - This property is required and cannot be null. If no access policies are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing access policies are left unchanged.
   * If provided with a non-null value, the existing access policies are replaced with the specified list.
   */
  accessPolicies: StorageDataShareAccessPolicy[];
  /**
   * List of assets that specify the properties of the shared resources.
   * For Create - This property is required and cannot be null. If no assets are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing assets are left unchanged.
   * If provided with a non-null value, the existing assets are replaced with the specified list.
   */
  assets: StorageDataShareAsset[];
  /** Represents the provisioning state of the storage datashare. */
  readonly provisioningState?: NativeDataSharingProvisioningState;
}

export function storageDataSharePropertiesSerializer(item: StorageDataShareProperties): any {
  return {
    description: item["description"],
    accessPolicies: storageDataShareAccessPolicyArraySerializer(item["accessPolicies"]),
    assets: storageDataShareAssetArraySerializer(item["assets"]),
  };
}

export function storageDataSharePropertiesDeserializer(item: any): StorageDataShareProperties {
  return {
    dataShareIdentifier: item["dataShareIdentifier"],
    description: item["description"],
    dataShareUri: item["dataShareUri"],
    accessPolicies: storageDataShareAccessPolicyArrayDeserializer(item["accessPolicies"]),
    assets: storageDataShareAssetArrayDeserializer(item["assets"]),
    provisioningState: item["provisioningState"],
  };
}

export function storageDataShareAccessPolicyArraySerializer(
  result: Array<StorageDataShareAccessPolicy>,
): any[] {
  return result.map((item) => {
    return storageDataShareAccessPolicySerializer(item);
  });
}

export function storageDataShareAccessPolicyArrayDeserializer(
  result: Array<StorageDataShareAccessPolicy>,
): any[] {
  return result.map((item) => {
    return storageDataShareAccessPolicyDeserializer(item);
  });
}

/** Policy that specify the permission allowed to a managed identity */
export interface StorageDataShareAccessPolicy {
  /** The AAD principal ID of the Managed Identity. */
  principalId: string;
  /** The AAD tenant ID of the Managed Identity. */
  tenantId: string;
  /** Allowed permissions. Currently, only supported value is Read. */
  permission: StorageDataShareAccessPolicyPermission;
}

export function storageDataShareAccessPolicySerializer(item: StorageDataShareAccessPolicy): any {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    permission: item["permission"],
  };
}

export function storageDataShareAccessPolicyDeserializer(item: any): StorageDataShareAccessPolicy {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    permission: item["permission"],
  };
}

/** The permissions supported in access policies for storage data share */
export enum KnownStorageDataShareAccessPolicyPermission {
  /** No permission */
  None = "None",
  /** Read permission */
  Read = "Read",
}

/**
 * The permissions supported in access policies for storage data share \
 * {@link KnownStorageDataShareAccessPolicyPermission} can be used interchangeably with StorageDataShareAccessPolicyPermission,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No permission \
 * **Read**: Read permission
 */
export type StorageDataShareAccessPolicyPermission = string;

export function storageDataShareAssetArraySerializer(result: Array<StorageDataShareAsset>): any[] {
  return result.map((item) => {
    return storageDataShareAssetSerializer(item);
  });
}

export function storageDataShareAssetArrayDeserializer(
  result: Array<StorageDataShareAsset>,
): any[] {
  return result.map((item) => {
    return storageDataShareAssetDeserializer(item);
  });
}

/** Properties of a shared resource. */
export interface StorageDataShareAsset {
  /**
   * Source Path to be shared. It can be a folder or a blob.
   * The asset path should contain container name followed by path within the container, e.g. /container1/logs/external.
   */
  assetPath: string;
  /** Consumer visible name of the original path. */
  displayName: string;
}

export function storageDataShareAssetSerializer(item: StorageDataShareAsset): any {
  return { assetPath: item["assetPath"], displayName: item["displayName"] };
}

export function storageDataShareAssetDeserializer(item: any): StorageDataShareAsset {
  return {
    assetPath: item["assetPath"],
    displayName: item["displayName"],
  };
}

/** A DataShare is a tracked ARM resource modeled as a sub-resource of a Storage Account. */
export interface DataShareUpdate extends TrackedResourceUpdate {
  /** The properties of the Storage DataShare. */
  properties?: StorageDataSharePropertiesUpdate;
}

export function dataShareUpdateSerializer(item: DataShareUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : storageDataSharePropertiesUpdateSerializer(item["properties"]),
  };
}

/** The storage datashare properties */
export interface StorageDataSharePropertiesUpdate {
  /** Arbitrary description of this Data Share. Max 250 characters. */
  description?: string;
  /**
   * List of access policies that specify the permission allowed to a managed identity.
   * For Create - This property is required and cannot be null. If no access policies are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing access policies are left unchanged.
   * If provided with a non-null value, the existing access policies are replaced with the specified list.
   */
  accessPolicies?: StorageDataShareAccessPolicy[];
  /**
   * List of assets that specify the properties of the shared resources.
   * For Create - This property is required and cannot be null. If no assets are provided at creation time, specify an empty array.
   * For Update - This property is optional. If set to null or not passed, the existing assets are left unchanged.
   * If provided with a non-null value, the existing assets are replaced with the specified list.
   */
  assets?: StorageDataShareAsset[];
}

export function storageDataSharePropertiesUpdateSerializer(
  item: StorageDataSharePropertiesUpdate,
): any {
  return {
    description: item["description"],
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : storageDataShareAccessPolicyArraySerializer(item["accessPolicies"]),
    assets: !item["assets"] ? item["assets"] : storageDataShareAssetArraySerializer(item["assets"]),
  };
}

/** The response of a DataShare list operation. */
export interface _DataShareListResult {
  /** The DataShare items on this page */
  value: DataShare[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dataShareListResultDeserializer(item: any): _DataShareListResult {
  return {
    value: dataShareArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dataShareArraySerializer(result: Array<DataShare>): any[] {
  return result.map((item) => {
    return dataShareSerializer(item);
  });
}

export function dataShareArrayDeserializer(result: Array<DataShare>): any[] {
  return result.map((item) => {
    return dataShareDeserializer(item);
  });
}

/** The advanced platform metrics rule for the storage account. */
export interface AdvancedPlatformMetricsRule extends ProxyResource {
  /** Returns the advanced platform metrics rule. */
  properties?: AdvancedPlatformMetricsRuleProperties;
}

export function advancedPlatformMetricsRuleSerializer(item: AdvancedPlatformMetricsRule): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : advancedPlatformMetricsRulePropertiesSerializer(item["properties"]),
  };
}

export function advancedPlatformMetricsRuleDeserializer(item: any): AdvancedPlatformMetricsRule {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : advancedPlatformMetricsRulePropertiesDeserializer(item["properties"]),
  };
}

/** An object that defines the advanced platform metrics rule. */
export interface AdvancedPlatformMetricsRuleProperties {
  /** Indicates the type of the advanced platform metrics rule. Possible values include: ContainerLevelCapacityMetrics. */
  readonly ruleType?: AdvancedPlatformMetricsRuleType;
  /** A boolean flag which enables the advanced platform metrics rule. */
  enabled: boolean;
  /** Gets the last modification date and time of the advanced platform metrics rule in UTC. */
  readonly lastModifiedTime?: Date;
  /** The metrics emitted by the rule. Metrics are mapped according to the rule type from RuleTypeProperty. Rule type to metrics mapping: ContainerLevelCapacityMetrics => {ContainerUsedSize, ContainerBlobCount}. */
  readonly metricsEmitted?: MetricsEmitted[];
  /** Configuration for the advanced platform metrics rule. */
  ruleConfig: AdvancedPlatformMetricsRuleConfig;
}

export function advancedPlatformMetricsRulePropertiesSerializer(
  item: AdvancedPlatformMetricsRuleProperties,
): any {
  return {
    enabled: item["enabled"],
    ruleConfig: advancedPlatformMetricsRuleConfigSerializer(item["ruleConfig"]),
  };
}

export function advancedPlatformMetricsRulePropertiesDeserializer(
  item: any,
): AdvancedPlatformMetricsRuleProperties {
  return {
    ruleType: item["ruleType"],
    enabled: item["enabled"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    metricsEmitted: !item["metricsEmitted"]
      ? item["metricsEmitted"]
      : item["metricsEmitted"].map((p: any) => {
          return p;
        }),
    ruleConfig: advancedPlatformMetricsRuleConfigDeserializer(item["ruleConfig"]),
  };
}

/** The type of the advanced platform metrics rule. */
export enum KnownAdvancedPlatformMetricsRuleType {
  /** Container level capacity metrics rule type */
  ContainerLevelCapacityMetrics = "ContainerLevelCapacityMetrics",
}

/**
 * The type of the advanced platform metrics rule. \
 * {@link KnownAdvancedPlatformMetricsRuleType} can be used interchangeably with AdvancedPlatformMetricsRuleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ContainerLevelCapacityMetrics**: Container level capacity metrics rule type
 */
export type AdvancedPlatformMetricsRuleType = string;

/** The metrics emitted by the advanced platform metrics rule. */
export enum KnownMetricsEmitted {
  /** Container blob count metric */
  ContainerBlobCount = "ContainerBlobCount",
  /** Container used size metric */
  ContainerUsedSize = "ContainerUsedSize",
}

/**
 * The metrics emitted by the advanced platform metrics rule. \
 * {@link KnownMetricsEmitted} can be used interchangeably with MetricsEmitted,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ContainerBlobCount**: Container blob count metric \
 * **ContainerUsedSize**: Container used size metric
 */
export type MetricsEmitted = string;

/** Configuration for the advanced platform metrics rule. */
export interface AdvancedPlatformMetricsRuleConfig {
  /** The type of filter applied to the rule. Possible values include: AllContainersFilter, ContainerPrefixFilter, ContainerListFilter. */
  filterType?: AdvancedPlatformMetricsFilterType;
  /** The values for the filter applied to the rule. If filter type is AllContainersFilter, filter values should be empty. If filter type is ContainerPrefixFilter, filter values should contain a list of container prefixes. If filter type is ContainerListFilter, filter values should contain a list of container names. */
  filterValues?: string[];
}

export function advancedPlatformMetricsRuleConfigSerializer(
  item: AdvancedPlatformMetricsRuleConfig,
): any {
  return {
    filterType: item["filterType"],
    filterValues: !item["filterValues"]
      ? item["filterValues"]
      : item["filterValues"].map((p: any) => {
          return p;
        }),
  };
}

export function advancedPlatformMetricsRuleConfigDeserializer(
  item: any,
): AdvancedPlatformMetricsRuleConfig {
  return {
    filterType: item["filterType"],
    filterValues: !item["filterValues"]
      ? item["filterValues"]
      : item["filterValues"].map((p: any) => {
          return p;
        }),
  };
}

/** The type of filter applied to the advanced platform metrics rule. */
export enum KnownAdvancedPlatformMetricsFilterType {
  /** Filter applies to all containers */
  AllContainersFilter = "AllContainersFilter",
  /** Filter applies to containers matching a prefix */
  ContainerPrefixFilter = "ContainerPrefixFilter",
  /** Filter applies to a specific list of containers */
  ContainerListFilter = "ContainerListFilter",
}

/**
 * The type of filter applied to the advanced platform metrics rule. \
 * {@link KnownAdvancedPlatformMetricsFilterType} can be used interchangeably with AdvancedPlatformMetricsFilterType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllContainersFilter**: Filter applies to all containers \
 * **ContainerPrefixFilter**: Filter applies to containers matching a prefix \
 * **ContainerListFilter**: Filter applies to a specific list of containers
 */
export type AdvancedPlatformMetricsFilterType = string;

/** The response of a AdvancedPlatformMetricsRule list operation. */
export interface _AdvancedPlatformMetricsRuleListResult {
  /** The AdvancedPlatformMetricsRule items on this page */
  value: AdvancedPlatformMetricsRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _advancedPlatformMetricsRuleListResultDeserializer(
  item: any,
): _AdvancedPlatformMetricsRuleListResult {
  return {
    value: advancedPlatformMetricsRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function advancedPlatformMetricsRuleArraySerializer(
  result: Array<AdvancedPlatformMetricsRule>,
): any[] {
  return result.map((item) => {
    return advancedPlatformMetricsRuleSerializer(item);
  });
}

export function advancedPlatformMetricsRuleArrayDeserializer(
  result: Array<AdvancedPlatformMetricsRule>,
): any[] {
  return result.map((item) => {
    return advancedPlatformMetricsRuleDeserializer(item);
  });
}

/** A list of private link resources */
export interface PrivateLinkResourceListResult {
  /** Array of private link resources */
  value?: PrivateLinkResource[];
}

export function privateLinkResourceListResultDeserializer(
  item: any,
): PrivateLinkResourceListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
export interface PrivateLinkResource extends Resource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource Private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourcePropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
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

/** Fetch Storage Tasks Run Summary. */
export interface _StorageTaskReportSummary {
  /** The StorageTaskReportInstance items on this page */
  readonly value: StorageTaskReportInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _storageTaskReportSummaryDeserializer(item: any): _StorageTaskReportSummary {
  return {
    value: storageTaskReportInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageTaskReportInstanceArrayDeserializer(
  result: Array<StorageTaskReportInstance>,
): any[] {
  return result.map((item) => {
    return storageTaskReportInstanceDeserializer(item);
  });
}

/** Storage Tasks run report instance */
export interface StorageTaskReportInstance extends ProxyResource {
  /** Storage task execution report for a run instance. */
  properties?: StorageTaskReportProperties;
}

export function storageTaskReportInstanceDeserializer(item: any): StorageTaskReportInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storageTaskReportPropertiesDeserializer(item["properties"]),
  };
}

/** Response schema. Contains list of queues returned */
export interface _ListQueueResource {
  /** The ListQueue items on this page */
  readonly value: ListQueue[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listQueueResourceDeserializer(item: any): _ListQueueResource {
  return {
    value: listQueueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function listQueueArrayDeserializer(result: Array<ListQueue>): any[] {
  return result.map((item) => {
    return listQueueDeserializer(item);
  });
}

/** model interface ListQueue */
export interface ListQueue extends Resource {
  /** A name-value pair that represents queue metadata. */
  metadata?: Record<string, string>;
}

export function listQueueDeserializer(item: any): ListQueue {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _listQueueQueuePropertiesDeserializer(item["properties"])),
  };
}

/** model interface ListQueueProperties */
export interface ListQueueProperties {
  /** A name-value pair that represents queue metadata. */
  metadata?: Record<string, string>;
}

export function listQueuePropertiesDeserializer(item: any): ListQueueProperties {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

/** Concrete proxy resource types can be created by aliasing this type using a specific property type. */
export interface StorageQueue extends ProxyResource {
  /** A name-value pair that represents queue metadata. */
  metadata?: Record<string, string>;
  /** Integer indicating an approximate number of messages in the queue. This number is not lower than the actual number of messages in the queue, but could be higher. */
  readonly approximateMessageCount?: number;
}

export function storageQueueSerializer(item: StorageQueue): any {
  return {
    properties: areAllPropsUndefined(item, ["metadata"])
      ? undefined
      : _storageQueuePropertiesSerializer(item),
  };
}

export function storageQueueDeserializer(item: any): StorageQueue {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _storageQueuePropertiesDeserializer(item["properties"])),
  };
}

/** model interface QueueProperties */
export interface QueueProperties {
  /** A name-value pair that represents queue metadata. */
  metadata?: Record<string, string>;
  /** Integer indicating an approximate number of messages in the queue. This number is not lower than the actual number of messages in the queue, but could be higher. */
  readonly approximateMessageCount?: number;
}

export function queuePropertiesSerializer(item: QueueProperties): any {
  return { metadata: item["metadata"] };
}

export function queuePropertiesDeserializer(item: any): QueueProperties {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    approximateMessageCount: item["approximateMessageCount"],
  };
}

/** The replication policy between two storage accounts. Multiple rules can be defined in one policy. */
export interface ObjectReplicationPolicy extends ProxyResource {
  /** A unique id for object replication policy. */
  readonly policyId?: string;
  /** Indicates when the policy is enabled on the source account. */
  readonly enabledTime?: Date;
  /** Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false. */
  sourceAccount?: string;
  /** Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false. */
  destinationAccount?: string;
  /** The storage account object replication rules. */
  rules?: ObjectReplicationPolicyRule[];
  /** Optional. The object replication policy metrics feature options. */
  metrics?: ObjectReplicationPolicyPropertiesMetrics;
  /** Optional. The object replication policy priority replication feature options. */
  priorityReplication?: ObjectReplicationPolicyPropertiesPriorityReplication;
  /** Optional. The object replication policy tags replication feature options. */
  tagsReplication?: ObjectReplicationPolicyPropertiesTagsReplication;
}

export function objectReplicationPolicySerializer(item: ObjectReplicationPolicy): any {
  return {
    properties: areAllPropsUndefined(item, [
      "sourceAccount",
      "destinationAccount",
      "rules",
      "metrics",
      "priorityReplication",
      "tagsReplication",
    ])
      ? undefined
      : _objectReplicationPolicyPropertiesSerializer(item),
  };
}

export function objectReplicationPolicyDeserializer(item: any): ObjectReplicationPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _objectReplicationPolicyPropertiesDeserializer(item["properties"])),
  };
}

/** The Storage Account ObjectReplicationPolicy properties. */
export interface ObjectReplicationPolicyProperties {
  /** A unique id for object replication policy. */
  readonly policyId?: string;
  /** Indicates when the policy is enabled on the source account. */
  readonly enabledTime?: Date;
  /** Required. Source account name. It should be full resource id if allowCrossTenantReplication set to false. */
  sourceAccount: string;
  /** Required. Destination account name. It should be full resource id if allowCrossTenantReplication set to false. */
  destinationAccount: string;
  /** The storage account object replication rules. */
  rules?: ObjectReplicationPolicyRule[];
  /** Optional. The object replication policy metrics feature options. */
  metrics?: ObjectReplicationPolicyPropertiesMetrics;
  /** Optional. The object replication policy priority replication feature options. */
  priorityReplication?: ObjectReplicationPolicyPropertiesPriorityReplication;
  /** Optional. The object replication policy tags replication feature options. */
  tagsReplication?: ObjectReplicationPolicyPropertiesTagsReplication;
}

export function objectReplicationPolicyPropertiesSerializer(
  item: ObjectReplicationPolicyProperties,
): any {
  return {
    sourceAccount: item["sourceAccount"],
    destinationAccount: item["destinationAccount"],
    rules: !item["rules"]
      ? item["rules"]
      : objectReplicationPolicyRuleArraySerializer(item["rules"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : objectReplicationPolicyPropertiesMetricsSerializer(item["metrics"]),
    priorityReplication: !item["priorityReplication"]
      ? item["priorityReplication"]
      : objectReplicationPolicyPropertiesPriorityReplicationSerializer(item["priorityReplication"]),
    tagsReplication: !item["tagsReplication"]
      ? item["tagsReplication"]
      : objectReplicationPolicyPropertiesTagsReplicationSerializer(item["tagsReplication"]),
  };
}

export function objectReplicationPolicyPropertiesDeserializer(
  item: any,
): ObjectReplicationPolicyProperties {
  return {
    policyId: item["policyId"],
    enabledTime: !item["enabledTime"] ? item["enabledTime"] : new Date(item["enabledTime"]),
    sourceAccount: item["sourceAccount"],
    destinationAccount: item["destinationAccount"],
    rules: !item["rules"]
      ? item["rules"]
      : objectReplicationPolicyRuleArrayDeserializer(item["rules"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : objectReplicationPolicyPropertiesMetricsDeserializer(item["metrics"]),
    priorityReplication: !item["priorityReplication"]
      ? item["priorityReplication"]
      : objectReplicationPolicyPropertiesPriorityReplicationDeserializer(
          item["priorityReplication"],
        ),
    tagsReplication: !item["tagsReplication"]
      ? item["tagsReplication"]
      : objectReplicationPolicyPropertiesTagsReplicationDeserializer(item["tagsReplication"]),
  };
}

export function objectReplicationPolicyRuleArraySerializer(
  result: Array<ObjectReplicationPolicyRule>,
): any[] {
  return result.map((item) => {
    return objectReplicationPolicyRuleSerializer(item);
  });
}

export function objectReplicationPolicyRuleArrayDeserializer(
  result: Array<ObjectReplicationPolicyRule>,
): any[] {
  return result.map((item) => {
    return objectReplicationPolicyRuleDeserializer(item);
  });
}

/** The replication policy rule between two containers. */
export interface ObjectReplicationPolicyRule {
  /** Rule Id is auto-generated for each new rule on destination account. It is required for put policy on source account. */
  ruleId?: string;
  /** Required. Source container name. */
  sourceContainer: string;
  /** Required. Destination container name. */
  destinationContainer: string;
  /** Optional. An object that defines the filter set. */
  filters?: ObjectReplicationPolicyFilter;
}

export function objectReplicationPolicyRuleSerializer(item: ObjectReplicationPolicyRule): any {
  return {
    ruleId: item["ruleId"],
    sourceContainer: item["sourceContainer"],
    destinationContainer: item["destinationContainer"],
    filters: !item["filters"]
      ? item["filters"]
      : objectReplicationPolicyFilterSerializer(item["filters"]),
  };
}

export function objectReplicationPolicyRuleDeserializer(item: any): ObjectReplicationPolicyRule {
  return {
    ruleId: item["ruleId"],
    sourceContainer: item["sourceContainer"],
    destinationContainer: item["destinationContainer"],
    filters: !item["filters"]
      ? item["filters"]
      : objectReplicationPolicyFilterDeserializer(item["filters"]),
  };
}

/** Filters limit replication to a subset of blobs within the storage account. A logical OR is performed on values in the filter. If multiple filters are defined, a logical AND is performed on all filters. */
export interface ObjectReplicationPolicyFilter {
  /** Optional. Filters the results to replicate only blobs whose names begin with the specified prefix. */
  prefixMatch?: string[];
  /** Blobs created after the time will be replicated to the destination. It must be in datetime format 'yyyy-MM-ddTHH:mm:ssZ'. Example: 2020-02-19T16:05:00Z */
  minCreationTime?: string;
}

export function objectReplicationPolicyFilterSerializer(item: ObjectReplicationPolicyFilter): any {
  return {
    prefixMatch: !item["prefixMatch"]
      ? item["prefixMatch"]
      : item["prefixMatch"].map((p: any) => {
          return p;
        }),
    minCreationTime: item["minCreationTime"],
  };
}

export function objectReplicationPolicyFilterDeserializer(
  item: any,
): ObjectReplicationPolicyFilter {
  return {
    prefixMatch: !item["prefixMatch"]
      ? item["prefixMatch"]
      : item["prefixMatch"].map((p: any) => {
          return p;
        }),
    minCreationTime: item["minCreationTime"],
  };
}

/** Optional. The object replication policy metrics feature options. */
export interface ObjectReplicationPolicyPropertiesMetrics {
  /** Indicates whether object replication metrics feature is enabled for the policy. */
  enabled?: boolean;
}

export function objectReplicationPolicyPropertiesMetricsSerializer(
  item: ObjectReplicationPolicyPropertiesMetrics,
): any {
  return { enabled: item["enabled"] };
}

export function objectReplicationPolicyPropertiesMetricsDeserializer(
  item: any,
): ObjectReplicationPolicyPropertiesMetrics {
  return {
    enabled: item["enabled"],
  };
}

/** Optional. The object replication policy priority replication feature options. */
export interface ObjectReplicationPolicyPropertiesPriorityReplication {
  /** Indicates whether object replication priority replication feature is enabled for the policy. */
  enabled?: boolean;
}

export function objectReplicationPolicyPropertiesPriorityReplicationSerializer(
  item: ObjectReplicationPolicyPropertiesPriorityReplication,
): any {
  return { enabled: item["enabled"] };
}

export function objectReplicationPolicyPropertiesPriorityReplicationDeserializer(
  item: any,
): ObjectReplicationPolicyPropertiesPriorityReplication {
  return {
    enabled: item["enabled"],
  };
}

/** Optional. The object replication policy tags replication feature options. */
export interface ObjectReplicationPolicyPropertiesTagsReplication {
  /** Indicates whether object replication tags replication feature is enabled for the policy. */
  enabled?: boolean;
}

export function objectReplicationPolicyPropertiesTagsReplicationSerializer(
  item: ObjectReplicationPolicyPropertiesTagsReplication,
): any {
  return { enabled: item["enabled"] };
}

export function objectReplicationPolicyPropertiesTagsReplicationDeserializer(
  item: any,
): ObjectReplicationPolicyPropertiesTagsReplication {
  return {
    enabled: item["enabled"],
  };
}

/** List storage account object replication policies. */
export interface _ObjectReplicationPolicies {
  /** The replication policy between two storage accounts. */
  value?: ObjectReplicationPolicy[];
  nextLink?: string;
}

export function _objectReplicationPoliciesDeserializer(item: any): _ObjectReplicationPolicies {
  return {
    value: !item["value"] ? item["value"] : objectReplicationPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function objectReplicationPolicyArraySerializer(
  result: Array<ObjectReplicationPolicy>,
): any[] {
  return result.map((item) => {
    return objectReplicationPolicySerializer(item);
  });
}

export function objectReplicationPolicyArrayDeserializer(
  result: Array<ObjectReplicationPolicy>,
): any[] {
  return result.map((item) => {
    return objectReplicationPolicyDeserializer(item);
  });
}

/** The local user associated with the storage accounts. */
export interface LocalUser extends ProxyResource {
  /** The permission scopes of the local user. */
  permissionScopes?: PermissionScope[];
  /** Optional, local user home directory. */
  homeDirectory?: string;
  /** Optional, local user ssh authorized keys for SFTP. */
  sshAuthorizedKeys?: SshPublicKey[];
  /** A unique Security Identifier that is generated by the server. */
  readonly sid?: string;
  /** Indicates whether shared key exists. Set it to false to remove existing shared key. */
  hasSharedKey?: boolean;
  /** Indicates whether ssh key exists. Set it to false to remove existing SSH key. */
  hasSshKey?: boolean;
  /** Indicates whether ssh password exists. Set it to false to remove existing SSH password. */
  hasSshPassword?: boolean;
  /** A unique Identifier that is generated by the server. */
  readonly userId?: number;
  /** An identifier for associating a group of users. */
  groupId?: number;
  /** Indicates whether ACL authorization is allowed for this user. Set it to false to disallow using ACL authorization. */
  allowAclAuthorization?: boolean;
  /** Supplementary group membership. Only applicable for local users enabled for NFSv3 access. */
  extendedGroups?: number[];
  /** Indicates if the local user is enabled for access with NFSv3 protocol. */
  isNFSv3Enabled?: boolean;
}

export function localUserSerializer(item: LocalUser): any {
  return {
    properties: areAllPropsUndefined(item, [
      "permissionScopes",
      "homeDirectory",
      "sshAuthorizedKeys",
      "hasSharedKey",
      "hasSshKey",
      "hasSshPassword",
      "groupId",
      "allowAclAuthorization",
      "extendedGroups",
      "isNFSv3Enabled",
    ])
      ? undefined
      : _localUserPropertiesSerializer(item),
  };
}

export function localUserDeserializer(item: any): LocalUser {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _localUserPropertiesDeserializer(item["properties"])),
  };
}

/** The Storage Account Local User properties. */
export interface LocalUserProperties {
  /** The permission scopes of the local user. */
  permissionScopes?: PermissionScope[];
  /** Optional, local user home directory. */
  homeDirectory?: string;
  /** Optional, local user ssh authorized keys for SFTP. */
  sshAuthorizedKeys?: SshPublicKey[];
  /** A unique Security Identifier that is generated by the server. */
  readonly sid?: string;
  /** Indicates whether shared key exists. Set it to false to remove existing shared key. */
  hasSharedKey?: boolean;
  /** Indicates whether ssh key exists. Set it to false to remove existing SSH key. */
  hasSshKey?: boolean;
  /** Indicates whether ssh password exists. Set it to false to remove existing SSH password. */
  hasSshPassword?: boolean;
  /** A unique Identifier that is generated by the server. */
  readonly userId?: number;
  /** An identifier for associating a group of users. */
  groupId?: number;
  /** Indicates whether ACL authorization is allowed for this user. Set it to false to disallow using ACL authorization. */
  allowAclAuthorization?: boolean;
  /** Supplementary group membership. Only applicable for local users enabled for NFSv3 access. */
  extendedGroups?: number[];
  /** Indicates if the local user is enabled for access with NFSv3 protocol. */
  isNFSv3Enabled?: boolean;
}

export function localUserPropertiesSerializer(item: LocalUserProperties): any {
  return {
    permissionScopes: !item["permissionScopes"]
      ? item["permissionScopes"]
      : permissionScopeArraySerializer(item["permissionScopes"]),
    homeDirectory: item["homeDirectory"],
    sshAuthorizedKeys: !item["sshAuthorizedKeys"]
      ? item["sshAuthorizedKeys"]
      : sshPublicKeyArraySerializer(item["sshAuthorizedKeys"]),
    hasSharedKey: item["hasSharedKey"],
    hasSshKey: item["hasSshKey"],
    hasSshPassword: item["hasSshPassword"],
    groupId: item["groupId"],
    allowAclAuthorization: item["allowAclAuthorization"],
    extendedGroups: !item["extendedGroups"]
      ? item["extendedGroups"]
      : item["extendedGroups"].map((p: any) => {
          return p;
        }),
    isNFSv3Enabled: item["isNFSv3Enabled"],
  };
}

export function localUserPropertiesDeserializer(item: any): LocalUserProperties {
  return {
    permissionScopes: !item["permissionScopes"]
      ? item["permissionScopes"]
      : permissionScopeArrayDeserializer(item["permissionScopes"]),
    homeDirectory: item["homeDirectory"],
    sshAuthorizedKeys: !item["sshAuthorizedKeys"]
      ? item["sshAuthorizedKeys"]
      : sshPublicKeyArrayDeserializer(item["sshAuthorizedKeys"]),
    sid: item["sid"],
    hasSharedKey: item["hasSharedKey"],
    hasSshKey: item["hasSshKey"],
    hasSshPassword: item["hasSshPassword"],
    userId: item["userId"],
    groupId: item["groupId"],
    allowAclAuthorization: item["allowAclAuthorization"],
    extendedGroups: !item["extendedGroups"]
      ? item["extendedGroups"]
      : item["extendedGroups"].map((p: any) => {
          return p;
        }),
    isNFSv3Enabled: item["isNFSv3Enabled"],
  };
}

export function permissionScopeArraySerializer(result: Array<PermissionScope>): any[] {
  return result.map((item) => {
    return permissionScopeSerializer(item);
  });
}

export function permissionScopeArrayDeserializer(result: Array<PermissionScope>): any[] {
  return result.map((item) => {
    return permissionScopeDeserializer(item);
  });
}

/** model interface PermissionScope */
export interface PermissionScope {
  /** The permissions for the local user. Possible values include: Read (r), Write (w), Delete (d), List (l), Create (c), Modify Ownership (o), and Modify Permissions (p). */
  permissions: string;
  /** The service used by the local user, e.g. blob, file. */
  service: string;
  /** The name of resource, normally the container name or the file share name, used by the local user. */
  resourceName: string;
}

export function permissionScopeSerializer(item: PermissionScope): any {
  return {
    permissions: item["permissions"],
    service: item["service"],
    resourceName: item["resourceName"],
  };
}

export function permissionScopeDeserializer(item: any): PermissionScope {
  return {
    permissions: item["permissions"],
    service: item["service"],
    resourceName: item["resourceName"],
  };
}

export function sshPublicKeyArraySerializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeySerializer(item);
  });
}

export function sshPublicKeyArrayDeserializer(result: Array<SshPublicKey>): any[] {
  return result.map((item) => {
    return sshPublicKeyDeserializer(item);
  });
}

/** model interface SshPublicKey */
export interface SshPublicKey {
  /** Optional. It is used to store the function/usage of the key */
  description?: string;
  /** Ssh public key base64 encoded. The format should be: '<keyType> <keyData>', e.g. ssh-rsa AAAABBBB */
  key?: string;
}

export function sshPublicKeySerializer(item: SshPublicKey): any {
  return { description: item["description"], key: item["key"] };
}

export function sshPublicKeyDeserializer(item: any): SshPublicKey {
  return {
    description: item["description"],
    key: item["key"],
  };
}

/** List of local users requested, and if paging is required, a URL to the next page of local users. */
export interface _LocalUsers {
  /** The LocalUser items on this page */
  value: LocalUser[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _localUsersDeserializer(item: any): _LocalUsers {
  return {
    value: localUserArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function localUserArraySerializer(result: Array<LocalUser>): any[] {
  return result.map((item) => {
    return localUserSerializer(item);
  });
}

export function localUserArrayDeserializer(result: Array<LocalUser>): any[] {
  return result.map((item) => {
    return localUserDeserializer(item);
  });
}

/** The Storage Account Local User keys. */
export interface LocalUserKeys {
  /** Optional, local user ssh authorized keys for SFTP. */
  sshAuthorizedKeys?: SshPublicKey[];
  /** Auto generated by the server for SMB authentication. */
  readonly sharedKey?: string;
}

export function localUserKeysDeserializer(item: any): LocalUserKeys {
  return {
    sshAuthorizedKeys: !item["sshAuthorizedKeys"]
      ? item["sshAuthorizedKeys"]
      : sshPublicKeyArrayDeserializer(item["sshAuthorizedKeys"]),
    sharedKey: item["sharedKey"],
  };
}

/** The secrets of Storage Account Local User. */
export interface LocalUserRegeneratePasswordResult {
  /** Auto generated password by the server for SSH authentication if hasSshPassword is set to true on the creation of local user. */
  readonly sshPassword?: string;
}

export function localUserRegeneratePasswordResultDeserializer(
  item: any,
): LocalUserRegeneratePasswordResult {
  return {
    sshPassword: item["sshPassword"],
  };
}

/** Properties of the table, including Id, resource name, resource type. */
export interface Table extends ProxyResource {
  /** Table name under the specified account */
  readonly tableName?: string;
  /** List of stored access policies specified on the table. */
  signedIdentifiers?: TableSignedIdentifier[];
}

export function tableSerializer(item: Table): any {
  return {
    properties: areAllPropsUndefined(item, ["signedIdentifiers"])
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

/** model interface TableProperties */
export interface TableProperties {
  /** Table name under the specified account */
  readonly tableName?: string;
  /** List of stored access policies specified on the table. */
  signedIdentifiers?: TableSignedIdentifier[];
}

export function tablePropertiesSerializer(item: TableProperties): any {
  return {
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : tableSignedIdentifierArraySerializer(item["signedIdentifiers"]),
  };
}

export function tablePropertiesDeserializer(item: any): TableProperties {
  return {
    tableName: item["tableName"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : tableSignedIdentifierArrayDeserializer(item["signedIdentifiers"]),
  };
}

export function tableSignedIdentifierArraySerializer(result: Array<TableSignedIdentifier>): any[] {
  return result.map((item) => {
    return tableSignedIdentifierSerializer(item);
  });
}

export function tableSignedIdentifierArrayDeserializer(
  result: Array<TableSignedIdentifier>,
): any[] {
  return result.map((item) => {
    return tableSignedIdentifierDeserializer(item);
  });
}

/** Object to set Table Access Policy. */
export interface TableSignedIdentifier {
  /** unique-64-character-value of the stored access policy. */
  id: string;
  /** Access policy */
  accessPolicy?: TableAccessPolicy;
}

export function tableSignedIdentifierSerializer(item: TableSignedIdentifier): any {
  return {
    id: item["id"],
    accessPolicy: !item["accessPolicy"]
      ? item["accessPolicy"]
      : tableAccessPolicySerializer(item["accessPolicy"]),
  };
}

export function tableSignedIdentifierDeserializer(item: any): TableSignedIdentifier {
  return {
    id: item["id"],
    accessPolicy: !item["accessPolicy"]
      ? item["accessPolicy"]
      : tableAccessPolicyDeserializer(item["accessPolicy"]),
  };
}

/** Table Access Policy Properties Object. */
export interface TableAccessPolicy {
  /** Start time of the access policy */
  startTime?: Date;
  /** Expiry time of the access policy */
  expiryTime?: Date;
  /** Required. List of abbreviated permissions. Supported permission values include 'r','a','u','d' */
  permission: string;
}

export function tableAccessPolicySerializer(item: TableAccessPolicy): any {
  return {
    startTime: !item["startTime"] ? item["startTime"] : item["startTime"].toISOString(),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : item["expiryTime"].toISOString(),
    permission: item["permission"],
  };
}

export function tableAccessPolicyDeserializer(item: any): TableAccessPolicy {
  return {
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    expiryTime: !item["expiryTime"] ? item["expiryTime"] : new Date(item["expiryTime"]),
    permission: item["permission"],
  };
}

/** Response schema. Contains list of tables returned */
export interface _ListTableResource {
  /** The Table items on this page */
  readonly value: Table[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listTableResourceDeserializer(item: any): _ListTableResource {
  return {
    value: tableArrayDeserializer(item["value"]),
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

/** The response from the List Storage SKUs operation. */
export interface _StorageSkuListResult {
  /** Get the list result of storage SKUs and their properties. */
  readonly value?: SkuInformation[];
  nextLink?: string;
}

export function _storageSkuListResultDeserializer(item: any): _StorageSkuListResult {
  return {
    value: !item["value"] ? item["value"] : skuInformationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuInformationArrayDeserializer(result: Array<SkuInformation>): any[] {
  return result.map((item) => {
    return skuInformationDeserializer(item);
  });
}

/** Storage SKU and its properties */
export interface SkuInformation {
  /** The SKU name. Required for account creation; optional for update. Note that in older versions, SKU name was called accountType. */
  name: SkuName;
  /** The SKU tier. This is based on the SKU name. */
  readonly tier?: SkuTier;
  /** The type of the resource, usually it is 'storageAccounts'. */
  readonly resourceType?: string;
  /** Indicates the type of storage account. */
  readonly kind?: Kind;
  /** The set of locations that the SKU is available. This will be supported and registered Azure Geo Regions (e.g. West US, East US, Southeast Asia, etc.). */
  readonly locations?: string[];
  locationInfo?: SkuInformationLocationInfoItem[];
  /** The capability information in the specified SKU, including file encryption, network ACLs, change notification, etc. */
  readonly capabilities?: SKUCapability[];
  /** The restrictions because of which SKU cannot be used. This is empty if there are no restrictions. */
  restrictions?: Restriction[];
}

export function skuInformationDeserializer(item: any): SkuInformation {
  return {
    name: item["name"],
    tier: item["tier"],
    resourceType: item["resourceType"],
    kind: item["kind"],
    locations: !item["locations"]
      ? item["locations"]
      : item["locations"].map((p: any) => {
          return p;
        }),
    locationInfo: !item["locationInfo"]
      ? item["locationInfo"]
      : skuInformationLocationInfoItemArrayDeserializer(item["locationInfo"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : skuCapabilityArrayDeserializer(item["capabilities"]),
    restrictions: !item["restrictions"]
      ? item["restrictions"]
      : restrictionArrayDeserializer(item["restrictions"]),
  };
}

export function skuInformationLocationInfoItemArrayDeserializer(
  result: Array<SkuInformationLocationInfoItem>,
): any[] {
  return result.map((item) => {
    return skuInformationLocationInfoItemDeserializer(item);
  });
}

/** model interface SkuInformationLocationInfoItem */
export interface SkuInformationLocationInfoItem {
  /** Describes the location for the product where storage account resource can be created. */
  readonly location?: string;
  /** Describes the available zones for the product where storage account resource can be created. */
  readonly zones?: string[];
}

export function skuInformationLocationInfoItemDeserializer(
  item: any,
): SkuInformationLocationInfoItem {
  return {
    location: item["location"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function skuCapabilityArrayDeserializer(result: Array<SKUCapability>): any[] {
  return result.map((item) => {
    return skuCapabilityDeserializer(item);
  });
}

/** The capability information in the specified SKU, including file encryption, network ACLs, change notification, etc. */
export interface SKUCapability {
  /** The name of capability, The capability information in the specified SKU, including file encryption, network ACLs, change notification, etc. */
  readonly name?: string;
  /** A string value to indicate states of given capability. Possibly 'true' or 'false'. */
  readonly value?: string;
}

export function skuCapabilityDeserializer(item: any): SKUCapability {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function restrictionArrayDeserializer(result: Array<Restriction>): any[] {
  return result.map((item) => {
    return restrictionDeserializer(item);
  });
}

/** The restriction because of which SKU cannot be used. */
export interface Restriction {
  /** The type of restrictions. As of now only possible value for this is location. */
  readonly type?: string;
  /** The value of restrictions. If the restriction type is set to location. This would be different locations where the SKU is restricted. */
  readonly values?: string[];
  /** The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". Quota Id is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. The "NotAvailableForSubscription" is related to capacity at DC. */
  reasonCode?: ReasonCode;
}

export function restrictionDeserializer(item: any): Restriction {
  return {
    type: item["type"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
    reasonCode: item["reasonCode"],
  };
}

/** The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". Quota Id is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. The "NotAvailableForSubscription" is related to capacity at DC. */
export enum KnownReasonCode {
  /** QuotaId */
  QuotaId = "QuotaId",
  /** NotAvailableForSubscription */
  NotAvailableForSubscription = "NotAvailableForSubscription",
}

/**
 * The reason for the restriction. As of now this can be "QuotaId" or "NotAvailableForSubscription". Quota Id is set when the SKU has requiredQuotas parameter as the subscription does not belong to that quota. The "NotAvailableForSubscription" is related to capacity at DC. \
 * {@link KnownReasonCode} can be used interchangeably with ReasonCode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **QuotaId** \
 * **NotAvailableForSubscription**
 */
export type ReasonCode = string;

/** The response from the List Usages operation. */
export interface _UsageListResult {
  /** Gets or sets the list of Storage Resource Usages. */
  value?: Usage[];
  nextLink?: string;
}

export function _usageListResultDeserializer(item: any): _UsageListResult {
  return {
    value: !item["value"] ? item["value"] : usageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageArrayDeserializer(result: Array<Usage>): any[] {
  return result.map((item) => {
    return usageDeserializer(item);
  });
}

/** Describes Storage Resource Usage. */
export interface Usage {
  /** Gets the unit of measurement. */
  readonly unit?: UsageUnit;
  /** Gets the current count of the allocated resources in the subscription. */
  readonly currentValue?: number;
  /** Gets the maximum count of the resources that can be allocated in the subscription. */
  readonly limit?: number;
  /** Gets the name of the type of usage. */
  readonly name?: UsageName;
}

export function usageDeserializer(item: any): Usage {
  return {
    unit: item["unit"],
    currentValue: item["currentValue"],
    limit: item["limit"],
    name: !item["name"] ? item["name"] : usageNameDeserializer(item["name"]),
  };
}

/** Gets the unit of measurement. */
export type UsageUnit =
  | "Count"
  | "Bytes"
  | "Seconds"
  | "Percent"
  | "CountsPerSecond"
  | "BytesPerSecond";

/** The usage names that can be used; currently limited to StorageAccount. */
export interface UsageName {
  /** Gets a string describing the resource name. */
  readonly value?: string;
  /** Gets a localized string describing the resource name. */
  readonly localizedValue?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Known values of {@link ListContainersInclude} that the service accepts. */
export enum KnownListContainersInclude {
  /** deleted */
  Deleted = "deleted",
}

/** Type of ListContainersInclude */
export type ListContainersInclude = string;
/** Type of StorageAccountExpand */
export type StorageAccountExpand = "geoReplicationStats" | "blobRestoreStatus";

/** Known values of {@link ListEncryptionScopesInclude} that the service accepts. */
export enum KnownListEncryptionScopesInclude {
  /** All */
  All = "All",
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/** Type of ListEncryptionScopesInclude */
export type ListEncryptionScopesInclude = string;

/** Known values of {@link ListLocalUserIncludeParam} that the service accepts. */
export enum KnownListLocalUserIncludeParam {
  /** nfsv3 */
  Nfsv3 = "nfsv3",
}

/** Type of ListLocalUserIncludeParam */
export type ListLocalUserIncludeParam = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-06-01 API version. */
  V20250601 = "2025-06-01",
  /** The 2025-08-01 API version. */
  V20250801 = "2025-08-01",
  /** The 2026-04-01 API version. */
  V20260401 = "2026-04-01",
}

export function _operationOperationPropertiesDeserializer(item: any) {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

export function _immutabilityPolicyPropertiesPropertiesSerializer(
  item: ImmutabilityPolicyProperties,
): any {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

export function _immutabilityPolicyPropertiesPropertiesDeserializer(item: any) {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    state: item["state"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

export function _blobContainerPropertiesSerializer(item: BlobContainer): any {
  return {
    defaultEncryptionScope: item["defaultEncryptionScope"],
    denyEncryptionScopeOverride: item["denyEncryptionScopeOverride"],
    publicAccess: item["publicAccess"],
    metadata: item["metadata"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageWithVersioningSerializer(item["immutableStorageWithVersioning"]),
    enableNfsV3RootSquash: item["enableNfsV3RootSquash"],
    enableNfsV3AllSquash: item["enableNfsV3AllSquash"],
  };
}

export function _blobContainerPropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    deleted: item["deleted"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    defaultEncryptionScope: item["defaultEncryptionScope"],
    denyEncryptionScopeOverride: item["denyEncryptionScopeOverride"],
    publicAccess: item["publicAccess"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    immutabilityPolicy: !item["immutabilityPolicy"]
      ? item["immutabilityPolicy"]
      : immutabilityPolicyPropertiesDeserializer(item["immutabilityPolicy"]),
    legalHold: !item["legalHold"]
      ? item["legalHold"]
      : legalHoldPropertiesDeserializer(item["legalHold"]),
    hasLegalHold: item["hasLegalHold"],
    hasImmutabilityPolicy: item["hasImmutabilityPolicy"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageWithVersioningDeserializer(item["immutableStorageWithVersioning"]),
    enableNfsV3RootSquash: item["enableNfsV3RootSquash"],
    enableNfsV3AllSquash: item["enableNfsV3AllSquash"],
  };
}

export function _listContainerItemPropertiesSerializer(item: ListContainerItem): any {
  return {
    defaultEncryptionScope: item["defaultEncryptionScope"],
    denyEncryptionScopeOverride: item["denyEncryptionScopeOverride"],
    publicAccess: item["publicAccess"],
    metadata: item["metadata"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageWithVersioningSerializer(item["immutableStorageWithVersioning"]),
    enableNfsV3RootSquash: item["enableNfsV3RootSquash"],
    enableNfsV3AllSquash: item["enableNfsV3AllSquash"],
  };
}

export function _listContainerItemPropertiesDeserializer(item: any) {
  return {
    version: item["version"],
    deleted: item["deleted"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    defaultEncryptionScope: item["defaultEncryptionScope"],
    denyEncryptionScopeOverride: item["denyEncryptionScopeOverride"],
    publicAccess: item["publicAccess"],
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    immutabilityPolicy: !item["immutabilityPolicy"]
      ? item["immutabilityPolicy"]
      : immutabilityPolicyPropertiesDeserializer(item["immutabilityPolicy"]),
    legalHold: !item["legalHold"]
      ? item["legalHold"]
      : legalHoldPropertiesDeserializer(item["legalHold"]),
    hasLegalHold: item["hasLegalHold"],
    hasImmutabilityPolicy: item["hasImmutabilityPolicy"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageWithVersioningDeserializer(item["immutableStorageWithVersioning"]),
    enableNfsV3RootSquash: item["enableNfsV3RootSquash"],
    enableNfsV3AllSquash: item["enableNfsV3AllSquash"],
  };
}

export function _immutabilityPolicyPropertiesSerializer(item: ImmutabilityPolicy): any {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

export function _immutabilityPolicyPropertiesDeserializer(item: any) {
  return {
    immutabilityPeriodSinceCreationInDays: item["immutabilityPeriodSinceCreationInDays"],
    state: item["state"],
    allowProtectedAppendWrites: item["allowProtectedAppendWrites"],
    allowProtectedAppendWritesAll: item["allowProtectedAppendWritesAll"],
  };
}

export function _blobServicePropertiesPropertiesSerializer(item: BlobServiceProperties): any {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteSerializer(item["staticWebsite"]),
    isVersioningEnabled: item["isVersioningEnabled"],
    automaticSnapshotPolicyEnabled: item["automaticSnapshotPolicyEnabled"],
    changeFeed: !item["changeFeed"] ? item["changeFeed"] : changeFeedSerializer(item["changeFeed"]),
    restorePolicy: !item["restorePolicy"]
      ? item["restorePolicy"]
      : restorePolicyPropertiesSerializer(item["restorePolicy"]),
    containerDeleteRetentionPolicy: !item["containerDeleteRetentionPolicy"]
      ? item["containerDeleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["containerDeleteRetentionPolicy"]),
    lastAccessTimeTrackingPolicy: !item["lastAccessTimeTrackingPolicy"]
      ? item["lastAccessTimeTrackingPolicy"]
      : lastAccessTimeTrackingPolicySerializer(item["lastAccessTimeTrackingPolicy"]),
  };
}

export function _blobServicePropertiesPropertiesDeserializer(item: any) {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
    defaultServiceVersion: item["defaultServiceVersion"],
    deleteRetentionPolicy: !item["deleteRetentionPolicy"]
      ? item["deleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["deleteRetentionPolicy"]),
    staticWebsite: !item["staticWebsite"]
      ? item["staticWebsite"]
      : staticWebsiteDeserializer(item["staticWebsite"]),
    isVersioningEnabled: item["isVersioningEnabled"],
    automaticSnapshotPolicyEnabled: item["automaticSnapshotPolicyEnabled"],
    changeFeed: !item["changeFeed"]
      ? item["changeFeed"]
      : changeFeedDeserializer(item["changeFeed"]),
    restorePolicy: !item["restorePolicy"]
      ? item["restorePolicy"]
      : restorePolicyPropertiesDeserializer(item["restorePolicy"]),
    containerDeleteRetentionPolicy: !item["containerDeleteRetentionPolicy"]
      ? item["containerDeleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["containerDeleteRetentionPolicy"]),
    lastAccessTimeTrackingPolicy: !item["lastAccessTimeTrackingPolicy"]
      ? item["lastAccessTimeTrackingPolicy"]
      : lastAccessTimeTrackingPolicyDeserializer(item["lastAccessTimeTrackingPolicy"]),
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
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _storageAccountPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    primaryEndpoints: !item["primaryEndpoints"]
      ? item["primaryEndpoints"]
      : endpointsDeserializer(item["primaryEndpoints"]),
    primaryLocation: item["primaryLocation"],
    statusOfPrimary: item["statusOfPrimary"],
    lastGeoFailoverTime: !item["lastGeoFailoverTime"]
      ? item["lastGeoFailoverTime"]
      : new Date(item["lastGeoFailoverTime"]),
    secondaryLocation: item["secondaryLocation"],
    statusOfSecondary: item["statusOfSecondary"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    customDomain: !item["customDomain"]
      ? item["customDomain"]
      : customDomainDeserializer(item["customDomain"]),
    sasPolicy: !item["sasPolicy"] ? item["sasPolicy"] : sasPolicyDeserializer(item["sasPolicy"]),
    keyPolicy: !item["keyPolicy"] ? item["keyPolicy"] : keyPolicyDeserializer(item["keyPolicy"]),
    keyCreationTime: !item["keyCreationTime"]
      ? item["keyCreationTime"]
      : keyCreationTimeDeserializer(item["keyCreationTime"]),
    secondaryEndpoints: !item["secondaryEndpoints"]
      ? item["secondaryEndpoints"]
      : endpointsDeserializer(item["secondaryEndpoints"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    accessTier: item["accessTier"],
    azureFilesIdentityBasedAuthentication: !item["azureFilesIdentityBasedAuthentication"]
      ? item["azureFilesIdentityBasedAuthentication"]
      : azureFilesIdentityBasedAuthenticationDeserializer(
          item["azureFilesIdentityBasedAuthentication"],
        ),
    enableHttpsTrafficOnly: item["supportsHttpsTrafficOnly"],
    networkRuleSet: !item["networkAcls"]
      ? item["networkAcls"]
      : networkRuleSetDeserializer(item["networkAcls"]),
    isSftpEnabled: item["isSftpEnabled"],
    isLocalUserEnabled: item["isLocalUserEnabled"],
    enableExtendedGroups: item["enableExtendedGroups"],
    isHnsEnabled: item["isHnsEnabled"],
    geoReplicationStats: !item["geoReplicationStats"]
      ? item["geoReplicationStats"]
      : geoReplicationStatsDeserializer(item["geoReplicationStats"]),
    failoverInProgress: item["failoverInProgress"],
    largeFileSharesState: item["largeFileSharesState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    routingPreference: !item["routingPreference"]
      ? item["routingPreference"]
      : routingPreferenceDeserializer(item["routingPreference"]),
    dualStackEndpointPreference: !item["dualStackEndpointPreference"]
      ? item["dualStackEndpointPreference"]
      : dualStackEndpointPreferenceDeserializer(item["dualStackEndpointPreference"]),
    blobRestoreStatus: !item["blobRestoreStatus"]
      ? item["blobRestoreStatus"]
      : blobRestoreStatusDeserializer(item["blobRestoreStatus"]),
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    minimumTlsVersion: item["minimumTlsVersion"],
    allowSharedKeyAccess: item["allowSharedKeyAccess"],
    enableNfsV3: item["isNfsV3Enabled"],
    allowCrossTenantReplication: item["allowCrossTenantReplication"],
    defaultToOAuthAuthentication: item["defaultToOAuthAuthentication"],
    publicNetworkAccess: item["publicNetworkAccess"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageAccountDeserializer(item["immutableStorageWithVersioning"]),
    allowedCopyScope: item["allowedCopyScope"],
    storageAccountSkuConversionStatus: !item["storageAccountSkuConversionStatus"]
      ? item["storageAccountSkuConversionStatus"]
      : storageAccountSkuConversionStatusDeserializer(item["storageAccountSkuConversionStatus"]),
    dnsEndpointType: item["dnsEndpointType"],
    isSkuConversionBlocked: item["isSkuConversionBlocked"],
    accountMigrationInProgress: item["accountMigrationInProgress"],
    geoPriorityReplicationStatus: !item["geoPriorityReplicationStatus"]
      ? item["geoPriorityReplicationStatus"]
      : geoPriorityReplicationStatusDeserializer(item["geoPriorityReplicationStatus"]),
    allowSharedKeyAccessForServices: !item["allowSharedKeyAccessForServices"]
      ? item["allowSharedKeyAccessForServices"]
      : storageAccountSharedKeyAccessPropertiesDeserializer(
          item["allowSharedKeyAccessForServices"],
        ),
    dataCollaborationPolicyProperties: !item["dataCollaborationPolicyProperties"]
      ? item["dataCollaborationPolicyProperties"]
      : storageDataCollaborationPolicyPropertiesDeserializer(
          item["dataCollaborationPolicyProperties"],
        ),
  };
}

export function _storageAccountCreateParametersPropertiesSerializer(
  item: StorageAccountCreateParameters,
): any {
  return {
    allowedCopyScope: item["allowedCopyScope"],
    publicNetworkAccess: item["publicNetworkAccess"],
    sasPolicy: !item["sasPolicy"] ? item["sasPolicy"] : sasPolicySerializer(item["sasPolicy"]),
    keyPolicy: !item["keyPolicy"] ? item["keyPolicy"] : keyPolicySerializer(item["keyPolicy"]),
    customDomain: !item["customDomain"]
      ? item["customDomain"]
      : customDomainSerializer(item["customDomain"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    networkAcls: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    accessTier: item["accessTier"],
    azureFilesIdentityBasedAuthentication: !item["azureFilesIdentityBasedAuthentication"]
      ? item["azureFilesIdentityBasedAuthentication"]
      : azureFilesIdentityBasedAuthenticationSerializer(
          item["azureFilesIdentityBasedAuthentication"],
        ),
    supportsHttpsTrafficOnly: item["enableHttpsTrafficOnly"],
    isSftpEnabled: item["isSftpEnabled"],
    isLocalUserEnabled: item["isLocalUserEnabled"],
    enableExtendedGroups: item["enableExtendedGroups"],
    isHnsEnabled: item["isHnsEnabled"],
    largeFileSharesState: item["largeFileSharesState"],
    routingPreference: !item["routingPreference"]
      ? item["routingPreference"]
      : routingPreferenceSerializer(item["routingPreference"]),
    dualStackEndpointPreference: !item["dualStackEndpointPreference"]
      ? item["dualStackEndpointPreference"]
      : dualStackEndpointPreferenceSerializer(item["dualStackEndpointPreference"]),
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    minimumTlsVersion: item["minimumTlsVersion"],
    allowSharedKeyAccess: item["allowSharedKeyAccess"],
    isNfsV3Enabled: item["enableNfsV3"],
    allowCrossTenantReplication: item["allowCrossTenantReplication"],
    defaultToOAuthAuthentication: item["defaultToOAuthAuthentication"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageAccountSerializer(item["immutableStorageWithVersioning"]),
    dnsEndpointType: item["dnsEndpointType"],
    geoPriorityReplicationStatus: !item["geoPriorityReplicationStatus"]
      ? item["geoPriorityReplicationStatus"]
      : geoPriorityReplicationStatusSerializer(item["geoPriorityReplicationStatus"]),
    allowSharedKeyAccessForServices: !item["allowSharedKeyAccessForServices"]
      ? item["allowSharedKeyAccessForServices"]
      : storageAccountSharedKeyAccessPropertiesSerializer(item["allowSharedKeyAccessForServices"]),
    dataCollaborationPolicyProperties: !item["dataCollaborationPolicyProperties"]
      ? item["dataCollaborationPolicyProperties"]
      : storageDataCollaborationPolicyPropertiesSerializer(
          item["dataCollaborationPolicyProperties"],
        ),
  };
}

export function _storageAccountUpdateParametersPropertiesSerializer(
  item: StorageAccountUpdateParameters,
): any {
  return {
    customDomain: !item["customDomain"]
      ? item["customDomain"]
      : customDomainSerializer(item["customDomain"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    sasPolicy: !item["sasPolicy"] ? item["sasPolicy"] : sasPolicySerializer(item["sasPolicy"]),
    keyPolicy: !item["keyPolicy"] ? item["keyPolicy"] : keyPolicySerializer(item["keyPolicy"]),
    accessTier: item["accessTier"],
    azureFilesIdentityBasedAuthentication: !item["azureFilesIdentityBasedAuthentication"]
      ? item["azureFilesIdentityBasedAuthentication"]
      : azureFilesIdentityBasedAuthenticationSerializer(
          item["azureFilesIdentityBasedAuthentication"],
        ),
    supportsHttpsTrafficOnly: item["enableHttpsTrafficOnly"],
    isSftpEnabled: item["isSftpEnabled"],
    isLocalUserEnabled: item["isLocalUserEnabled"],
    enableExtendedGroups: item["enableExtendedGroups"],
    networkAcls: !item["networkRuleSet"]
      ? item["networkRuleSet"]
      : networkRuleSetSerializer(item["networkRuleSet"]),
    largeFileSharesState: item["largeFileSharesState"],
    routingPreference: !item["routingPreference"]
      ? item["routingPreference"]
      : routingPreferenceSerializer(item["routingPreference"]),
    dualStackEndpointPreference: !item["dualStackEndpointPreference"]
      ? item["dualStackEndpointPreference"]
      : dualStackEndpointPreferenceSerializer(item["dualStackEndpointPreference"]),
    allowBlobPublicAccess: item["allowBlobPublicAccess"],
    minimumTlsVersion: item["minimumTlsVersion"],
    allowSharedKeyAccess: item["allowSharedKeyAccess"],
    allowCrossTenantReplication: item["allowCrossTenantReplication"],
    defaultToOAuthAuthentication: item["defaultToOAuthAuthentication"],
    publicNetworkAccess: item["publicNetworkAccess"],
    immutableStorageWithVersioning: !item["immutableStorageWithVersioning"]
      ? item["immutableStorageWithVersioning"]
      : immutableStorageAccountSerializer(item["immutableStorageWithVersioning"]),
    allowedCopyScope: item["allowedCopyScope"],
    dnsEndpointType: item["dnsEndpointType"],
    geoPriorityReplicationStatus: !item["geoPriorityReplicationStatus"]
      ? item["geoPriorityReplicationStatus"]
      : geoPriorityReplicationStatusSerializer(item["geoPriorityReplicationStatus"]),
    allowSharedKeyAccessForServices: !item["allowSharedKeyAccessForServices"]
      ? item["allowSharedKeyAccessForServices"]
      : storageAccountSharedKeyAccessPropertiesSerializer(item["allowSharedKeyAccessForServices"]),
    dataCollaborationPolicyProperties: !item["dataCollaborationPolicyProperties"]
      ? item["dataCollaborationPolicyProperties"]
      : storageDataCollaborationPolicyPropertiesSerializer(
          item["dataCollaborationPolicyProperties"],
        ),
  };
}

export function _storageAccountMigrationPropertiesSerializer(item: StorageAccountMigration): any {
  return { targetSkuName: item["targetSkuName"] };
}

export function _storageAccountMigrationPropertiesDeserializer(item: any) {
  return {
    targetSkuName: item["targetSkuName"],
    migrationStatus: item["migrationStatus"],
    migrationFailedReason: item["migrationFailedReason"],
    migrationFailedDetailedReason: item["migrationFailedDetailedReason"],
  };
}

export function _fileSharePropertiesSerializer(item: FileShare): any {
  return {
    metadata: item["metadata"],
    shareQuota: item["shareQuota"],
    provisionedIops: item["provisionedIops"],
    provisionedBandwidthMibps: item["provisionedBandwidthMibps"],
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    accessTier: item["accessTier"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : signedIdentifierArraySerializer(item["signedIdentifiers"]),
    fileSharePaidBursting: !item["fileSharePaidBursting"]
      ? item["fileSharePaidBursting"]
      : fileSharePropertiesFileSharePaidBurstingSerializer(item["fileSharePaidBursting"]),
  };
}

export function _fileSharePropertiesDeserializer(item: any) {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    shareQuota: item["shareQuota"],
    provisionedIops: item["provisionedIops"],
    provisionedBandwidthMibps: item["provisionedBandwidthMibps"],
    includedBurstIops: item["includedBurstIops"],
    maxBurstCreditsForIops: item["maxBurstCreditsForIops"],
    nextAllowedQuotaDowngradeTime: !item["nextAllowedQuotaDowngradeTime"]
      ? item["nextAllowedQuotaDowngradeTime"]
      : new Date(item["nextAllowedQuotaDowngradeTime"]),
    nextAllowedProvisionedIopsDowngradeTime: !item["nextAllowedProvisionedIopsDowngradeTime"]
      ? item["nextAllowedProvisionedIopsDowngradeTime"]
      : new Date(item["nextAllowedProvisionedIopsDowngradeTime"]),
    nextAllowedProvisionedBandwidthDowngradeTime: !item[
      "nextAllowedProvisionedBandwidthDowngradeTime"
    ]
      ? item["nextAllowedProvisionedBandwidthDowngradeTime"]
      : new Date(item["nextAllowedProvisionedBandwidthDowngradeTime"]),
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    version: item["version"],
    deleted: item["deleted"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTier: item["accessTier"],
    accessTierChangeTime: !item["accessTierChangeTime"]
      ? item["accessTierChangeTime"]
      : new Date(item["accessTierChangeTime"]),
    accessTierStatus: item["accessTierStatus"],
    shareUsageBytes: item["shareUsageBytes"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : signedIdentifierArrayDeserializer(item["signedIdentifiers"]),
    snapshotTime: !item["snapshotTime"] ? item["snapshotTime"] : new Date(item["snapshotTime"]),
    fileSharePaidBursting: !item["fileSharePaidBursting"]
      ? item["fileSharePaidBursting"]
      : fileSharePropertiesFileSharePaidBurstingDeserializer(item["fileSharePaidBursting"]),
  };
}

export function _fileShareItemPropertiesSerializer(item: FileShareItem): any {
  return {
    metadata: item["metadata"],
    shareQuota: item["shareQuota"],
    provisionedIops: item["provisionedIops"],
    provisionedBandwidthMibps: item["provisionedBandwidthMibps"],
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    accessTier: item["accessTier"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : signedIdentifierArraySerializer(item["signedIdentifiers"]),
    fileSharePaidBursting: !item["fileSharePaidBursting"]
      ? item["fileSharePaidBursting"]
      : fileSharePropertiesFileSharePaidBurstingSerializer(item["fileSharePaidBursting"]),
  };
}

export function _fileShareItemPropertiesDeserializer(item: any) {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    shareQuota: item["shareQuota"],
    provisionedIops: item["provisionedIops"],
    provisionedBandwidthMibps: item["provisionedBandwidthMibps"],
    includedBurstIops: item["includedBurstIops"],
    maxBurstCreditsForIops: item["maxBurstCreditsForIops"],
    nextAllowedQuotaDowngradeTime: !item["nextAllowedQuotaDowngradeTime"]
      ? item["nextAllowedQuotaDowngradeTime"]
      : new Date(item["nextAllowedQuotaDowngradeTime"]),
    nextAllowedProvisionedIopsDowngradeTime: !item["nextAllowedProvisionedIopsDowngradeTime"]
      ? item["nextAllowedProvisionedIopsDowngradeTime"]
      : new Date(item["nextAllowedProvisionedIopsDowngradeTime"]),
    nextAllowedProvisionedBandwidthDowngradeTime: !item[
      "nextAllowedProvisionedBandwidthDowngradeTime"
    ]
      ? item["nextAllowedProvisionedBandwidthDowngradeTime"]
      : new Date(item["nextAllowedProvisionedBandwidthDowngradeTime"]),
    enabledProtocols: item["enabledProtocols"],
    rootSquash: item["rootSquash"],
    version: item["version"],
    deleted: item["deleted"],
    deletedTime: !item["deletedTime"] ? item["deletedTime"] : new Date(item["deletedTime"]),
    remainingRetentionDays: item["remainingRetentionDays"],
    accessTier: item["accessTier"],
    accessTierChangeTime: !item["accessTierChangeTime"]
      ? item["accessTierChangeTime"]
      : new Date(item["accessTierChangeTime"]),
    accessTierStatus: item["accessTierStatus"],
    shareUsageBytes: item["shareUsageBytes"],
    leaseStatus: item["leaseStatus"],
    leaseState: item["leaseState"],
    leaseDuration: item["leaseDuration"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : signedIdentifierArrayDeserializer(item["signedIdentifiers"]),
    snapshotTime: !item["snapshotTime"] ? item["snapshotTime"] : new Date(item["snapshotTime"]),
    fileSharePaidBursting: !item["fileSharePaidBursting"]
      ? item["fileSharePaidBursting"]
      : fileSharePropertiesFileSharePaidBurstingDeserializer(item["fileSharePaidBursting"]),
  };
}

export function _fileServicePropertiesPropertiesSerializer(item: FileServiceProperties): any {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]),
    shareDeleteRetentionPolicy: !item["shareDeleteRetentionPolicy"]
      ? item["shareDeleteRetentionPolicy"]
      : deleteRetentionPolicySerializer(item["shareDeleteRetentionPolicy"]),
    protocolSettings: !item["protocolSettings"]
      ? item["protocolSettings"]
      : protocolSettingsSerializer(item["protocolSettings"]),
  };
}

export function _fileServicePropertiesPropertiesDeserializer(item: any) {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
    shareDeleteRetentionPolicy: !item["shareDeleteRetentionPolicy"]
      ? item["shareDeleteRetentionPolicy"]
      : deleteRetentionPolicyDeserializer(item["shareDeleteRetentionPolicy"]),
    protocolSettings: !item["protocolSettings"]
      ? item["protocolSettings"]
      : protocolSettingsDeserializer(item["protocolSettings"]),
  };
}

export function _queueServicePropertiesPropertiesSerializer(item: QueueServiceProperties): any {
  return { cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]) };
}

export function _queueServicePropertiesPropertiesDeserializer(item: any) {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
  };
}

export function _deletedAccountPropertiesDeserializer(item: any) {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    location: item["location"],
    restoreReference: item["restoreReference"],
    creationTime: item["creationTime"],
    deletionTime: item["deletionTime"],
  };
}

export function _managementPolicyPropertiesSerializer(item: ManagementPolicy): any {
  return {
    policy: !item["policy"] ? item["policy"] : managementPolicySchemaSerializer(item["policy"]),
  };
}

export function _managementPolicyPropertiesDeserializer(item: any) {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    policy: !item["policy"] ? item["policy"] : managementPolicySchemaDeserializer(item["policy"]),
  };
}

export function _blobInventoryPolicyPropertiesSerializer(item: BlobInventoryPolicy): any {
  return {
    policy: !item["policy"] ? item["policy"] : blobInventoryPolicySchemaSerializer(item["policy"]),
  };
}

export function _blobInventoryPolicyPropertiesDeserializer(item: any) {
  return {
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    policy: !item["policy"]
      ? item["policy"]
      : blobInventoryPolicySchemaDeserializer(item["policy"]),
  };
}

export function _encryptionScopePropertiesSerializer(item: EncryptionScope): any {
  return {
    source: item["source"],
    state: item["state"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionScopeKeyVaultPropertiesSerializer(item["keyVaultProperties"]),
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function _encryptionScopePropertiesDeserializer(item: any) {
  return {
    source: item["source"],
    state: item["state"],
    creationTime: !item["creationTime"] ? item["creationTime"] : new Date(item["creationTime"]),
    lastModifiedTime: !item["lastModifiedTime"]
      ? item["lastModifiedTime"]
      : new Date(item["lastModifiedTime"]),
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : encryptionScopeKeyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    requireInfrastructureEncryption: item["requireInfrastructureEncryption"],
  };
}

export function _tableServicePropertiesPropertiesSerializer(item: TableServiceProperties): any {
  return { cors: !item["cors"] ? item["cors"] : corsRulesSerializer(item["cors"]) };
}

export function _tableServicePropertiesPropertiesDeserializer(item: any) {
  return {
    cors: !item["cors"] ? item["cors"] : corsRulesDeserializer(item["cors"]),
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

export function _listQueueQueuePropertiesDeserializer(item: any) {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
  };
}

export function _storageQueuePropertiesSerializer(item: StorageQueue): any {
  return { metadata: item["metadata"] };
}

export function _storageQueuePropertiesDeserializer(item: any) {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : Object.fromEntries(Object.entries(item["metadata"]).map(([k, p]: [string, any]) => [k, p])),
    approximateMessageCount: item["approximateMessageCount"],
  };
}

export function _objectReplicationPolicyPropertiesSerializer(item: ObjectReplicationPolicy): any {
  return {
    sourceAccount: item["sourceAccount"],
    destinationAccount: item["destinationAccount"],
    rules: !item["rules"]
      ? item["rules"]
      : objectReplicationPolicyRuleArraySerializer(item["rules"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : objectReplicationPolicyPropertiesMetricsSerializer(item["metrics"]),
    priorityReplication: !item["priorityReplication"]
      ? item["priorityReplication"]
      : objectReplicationPolicyPropertiesPriorityReplicationSerializer(item["priorityReplication"]),
    tagsReplication: !item["tagsReplication"]
      ? item["tagsReplication"]
      : objectReplicationPolicyPropertiesTagsReplicationSerializer(item["tagsReplication"]),
  };
}

export function _objectReplicationPolicyPropertiesDeserializer(item: any) {
  return {
    policyId: item["policyId"],
    enabledTime: !item["enabledTime"] ? item["enabledTime"] : new Date(item["enabledTime"]),
    sourceAccount: item["sourceAccount"],
    destinationAccount: item["destinationAccount"],
    rules: !item["rules"]
      ? item["rules"]
      : objectReplicationPolicyRuleArrayDeserializer(item["rules"]),
    metrics: !item["metrics"]
      ? item["metrics"]
      : objectReplicationPolicyPropertiesMetricsDeserializer(item["metrics"]),
    priorityReplication: !item["priorityReplication"]
      ? item["priorityReplication"]
      : objectReplicationPolicyPropertiesPriorityReplicationDeserializer(
          item["priorityReplication"],
        ),
    tagsReplication: !item["tagsReplication"]
      ? item["tagsReplication"]
      : objectReplicationPolicyPropertiesTagsReplicationDeserializer(item["tagsReplication"]),
  };
}

export function _localUserPropertiesSerializer(item: LocalUser): any {
  return {
    permissionScopes: !item["permissionScopes"]
      ? item["permissionScopes"]
      : permissionScopeArraySerializer(item["permissionScopes"]),
    homeDirectory: item["homeDirectory"],
    sshAuthorizedKeys: !item["sshAuthorizedKeys"]
      ? item["sshAuthorizedKeys"]
      : sshPublicKeyArraySerializer(item["sshAuthorizedKeys"]),
    hasSharedKey: item["hasSharedKey"],
    hasSshKey: item["hasSshKey"],
    hasSshPassword: item["hasSshPassword"],
    groupId: item["groupId"],
    allowAclAuthorization: item["allowAclAuthorization"],
    extendedGroups: !item["extendedGroups"]
      ? item["extendedGroups"]
      : item["extendedGroups"].map((p: any) => {
          return p;
        }),
    isNFSv3Enabled: item["isNFSv3Enabled"],
  };
}

export function _localUserPropertiesDeserializer(item: any) {
  return {
    permissionScopes: !item["permissionScopes"]
      ? item["permissionScopes"]
      : permissionScopeArrayDeserializer(item["permissionScopes"]),
    homeDirectory: item["homeDirectory"],
    sshAuthorizedKeys: !item["sshAuthorizedKeys"]
      ? item["sshAuthorizedKeys"]
      : sshPublicKeyArrayDeserializer(item["sshAuthorizedKeys"]),
    sid: item["sid"],
    hasSharedKey: item["hasSharedKey"],
    hasSshKey: item["hasSshKey"],
    hasSshPassword: item["hasSshPassword"],
    userId: item["userId"],
    groupId: item["groupId"],
    allowAclAuthorization: item["allowAclAuthorization"],
    extendedGroups: !item["extendedGroups"]
      ? item["extendedGroups"]
      : item["extendedGroups"].map((p: any) => {
          return p;
        }),
    isNFSv3Enabled: item["isNFSv3Enabled"],
  };
}

export function _tablePropertiesSerializer(item: Table): any {
  return {
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : tableSignedIdentifierArraySerializer(item["signedIdentifiers"]),
  };
}

export function _tablePropertiesDeserializer(item: any) {
  return {
    tableName: item["tableName"],
    signedIdentifiers: !item["signedIdentifiers"]
      ? item["signedIdentifiers"]
      : tableSignedIdentifierArrayDeserializer(item["signedIdentifiers"]),
  };
}
