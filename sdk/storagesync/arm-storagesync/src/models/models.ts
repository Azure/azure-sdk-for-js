// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Operation status object */
export interface LocationOperationStatus {
  /** Operation resource Id */
  readonly id?: string;
  /** Operation Id */
  readonly name?: string;
  /** Operation status */
  readonly status?: string;
  /** Start time of the operation */
  readonly startTime?: Date;
  /** End time of the operation */
  readonly endTime?: Date;
  /** Error details. */
  readonly error?: StorageSyncApiError;
  /** Percent complete. */
  readonly percentComplete?: number;
}

export function locationOperationStatusDeserializer(item: any): LocationOperationStatus {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    error: !item["error"] ? item["error"] : storageSyncApiErrorDeserializer(item["error"]),
    percentComplete: item["percentComplete"],
  };
}

/** Error type */
export interface StorageSyncApiError {
  /** Error code of the given entry. */
  code?: string;
  /** Error message of the given entry. */
  message?: string;
  /** Target of the given error entry. */
  target?: string;
  /** Error details of the given entry. */
  details?: StorageSyncErrorDetails;
  /** Inner error details of the given entry. */
  innererror?: StorageSyncInnerErrorDetails;
}

export function storageSyncApiErrorDeserializer(item: any): StorageSyncApiError {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : storageSyncErrorDetailsDeserializer(item["details"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : storageSyncInnerErrorDetailsDeserializer(item["innererror"]),
  };
}

/** Error Details object. */
export interface StorageSyncErrorDetails {
  /** Error code of the given entry. */
  code?: string;
  /** Error message of the given entry. */
  message?: string;
  /** Target of the given entry. */
  target?: string;
  /** Request URI of the given entry. */
  requestUri?: string;
  /** Exception type of the given entry. */
  exceptionType?: string;
  /** HTTP method of the given entry. */
  httpMethod?: string;
  /** Hashed message of the given entry. */
  hashedMessage?: string;
  /** HTTP error code of the given entry. */
  httpErrorCode?: string;
}

export function storageSyncErrorDetailsDeserializer(item: any): StorageSyncErrorDetails {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    requestUri: item["requestUri"],
    exceptionType: item["exceptionType"],
    httpMethod: item["httpMethod"],
    hashedMessage: item["hashedMessage"],
    httpErrorCode: item["httpErrorCode"],
  };
}

/** Error Details object. */
export interface StorageSyncInnerErrorDetails {
  /** Call stack of the error. */
  callStack?: string;
  /** Error message of the error. */
  message?: string;
  /** Exception of the inner error. */
  innerException?: string;
  /** Call stack of the inner error. */
  innerExceptionCallStack?: string;
}

export function storageSyncInnerErrorDetailsDeserializer(item: any): StorageSyncInnerErrorDetails {
  return {
    callStack: item["callStack"],
    message: item["message"],
    innerException: item["innerException"],
    innerExceptionCallStack: item["innerExceptionCallStack"],
  };
}

/** Error type */
export interface StorageSyncError {
  /** Error details of the given entry. */
  error?: StorageSyncApiError;
  /** Error details of the given entry. */
  innererror?: StorageSyncApiError;
}

export function storageSyncErrorDeserializer(item: any): StorageSyncError {
  return {
    error: !item["error"] ? item["error"] : storageSyncApiErrorDeserializer(item["error"]),
    innererror: !item["innererror"]
      ? item["innererror"]
      : storageSyncApiErrorDeserializer(item["innererror"]),
  };
}

/** Paged collection of OperationEntity items */
export interface _OperationEntityListResult {
  /** The OperationEntity items on this page */
  value: OperationEntity[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationEntityListResultDeserializer(item: any): _OperationEntityListResult {
  return {
    value: operationEntityArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationEntityArrayDeserializer(result: Array<OperationEntity>): any[] {
  return result.map((item) => {
    return operationEntityDeserializer(item);
  });
}

/** The operation supported by storage sync. */
export interface OperationEntity {
  /** Operation name: {provider}/{resource}/{operation}. */
  name?: string;
  /** The operation supported by storage sync. */
  display?: OperationDisplayInfo;
  /** The origin. */
  origin?: string;
  /** Properties of the operations resource. */
  properties?: OperationProperties;
}

export function operationEntityDeserializer(item: any): OperationEntity {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayInfoDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** The operation supported by storage sync. */
export interface OperationDisplayInfo {
  /** The description of the operation. */
  description?: string;
  /** The action that users can perform, based on their permission level. */
  operation?: string;
  /** Service provider: Microsoft StorageSync. */
  provider?: string;
  /** Resource on which the operation is performed. */
  resource?: string;
}

export function operationDisplayInfoDeserializer(item: any): OperationDisplayInfo {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** Properties of the operations resource. */
export interface OperationProperties {
  /** Service specification for the operations resource. */
  serviceSpecification?: OperationResourceServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : operationResourceServiceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification. */
export interface OperationResourceServiceSpecification {
  /** List of metric specifications. */
  metricSpecifications?: OperationResourceMetricSpecification[];
}

export function operationResourceServiceSpecificationDeserializer(
  item: any,
): OperationResourceServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : operationResourceMetricSpecificationArrayDeserializer(item["metricSpecifications"]),
  };
}

export function operationResourceMetricSpecificationArrayDeserializer(
  result: Array<OperationResourceMetricSpecification>,
): any[] {
  return result.map((item) => {
    return operationResourceMetricSpecificationDeserializer(item);
  });
}

/** Operation Display Resource object. */
export interface OperationResourceMetricSpecification {
  /** Name of the metric. */
  name?: string;
  /** Display name for the metric. */
  displayName?: string;
  /** Display description for the metric. */
  displayDescription?: string;
  /** Unit for the metric. */
  unit?: string;
  /** Aggregation type for the metric. */
  aggregationType?: string;
  /** Supported aggregation types for the metric. */
  supportedAggregationTypes?: string[];
  /** Fill gaps in the metric with zero. */
  fillGapWithZero?: boolean;
  /** Lock Aggregation type for the metric. */
  lockAggregationType?: string;
  /** Dimensions for the metric specification. */
  dimensions?: OperationResourceMetricSpecificationDimension[];
}

export function operationResourceMetricSpecificationDeserializer(
  item: any,
): OperationResourceMetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    aggregationType: item["aggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    fillGapWithZero: item["fillGapWithZero"],
    lockAggregationType: item["lockAggregationType"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : operationResourceMetricSpecificationDimensionArrayDeserializer(item["dimensions"]),
  };
}

export function operationResourceMetricSpecificationDimensionArrayDeserializer(
  result: Array<OperationResourceMetricSpecificationDimension>,
): any[] {
  return result.map((item) => {
    return operationResourceMetricSpecificationDimensionDeserializer(item);
  });
}

/** OperationResourceMetricSpecificationDimension object. */
export interface OperationResourceMetricSpecificationDimension {
  /** Name of the dimension. */
  name?: string;
  /** Display name of the dimensions. */
  displayName?: string;
  /** Indicates metric should be exported for Shoebox. */
  toBeExportedForShoebox?: boolean;
}

export function operationResourceMetricSpecificationDimensionDeserializer(
  item: any,
): OperationResourceMetricSpecificationDimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

/** Storage Sync Service object. */
export interface StorageSyncService extends TrackedResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
  /** Incoming Traffic Policy */
  incomingTrafficPolicy?: IncomingTrafficPolicy;
  /** Storage Sync service status. */
  readonly storageSyncServiceStatus?: number;
  /** Storage Sync service Uid */
  readonly storageSyncServiceUid?: string;
  /** StorageSyncService Provisioning State */
  readonly provisioningState?: string;
  /** Use Identity authorization when customer have finished setup RBAC permissions. */
  readonly useIdentity?: boolean;
  /** StorageSyncService lastWorkflowId */
  readonly lastWorkflowId?: string;
  /** Resource Last Operation Name */
  readonly lastOperationName?: string;
  /** List of private endpoint connection associated with the specified storage sync service */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function storageSyncServiceDeserializer(item: any): StorageSyncService {
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
      : _storageSyncServicePropertiesDeserializer(item["properties"])),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Storage Sync Service Properties object. */
export interface StorageSyncServiceProperties {
  /** Incoming Traffic Policy */
  incomingTrafficPolicy?: IncomingTrafficPolicy;
  /** Storage Sync service status. */
  readonly storageSyncServiceStatus?: number;
  /** Storage Sync service Uid */
  readonly storageSyncServiceUid?: string;
  /** StorageSyncService Provisioning State */
  readonly provisioningState?: string;
  /** Use Identity authorization when customer have finished setup RBAC permissions. */
  readonly useIdentity?: boolean;
  /** StorageSyncService lastWorkflowId */
  readonly lastWorkflowId?: string;
  /** Resource Last Operation Name */
  readonly lastOperationName?: string;
  /** List of private endpoint connection associated with the specified storage sync service */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function storageSyncServicePropertiesDeserializer(item: any): StorageSyncServiceProperties {
  return {
    incomingTrafficPolicy: item["incomingTrafficPolicy"],
    storageSyncServiceStatus: item["storageSyncServiceStatus"],
    storageSyncServiceUid: item["storageSyncServiceUid"],
    provisioningState: item["provisioningState"],
    useIdentity: item["useIdentity"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** Type of the Incoming Traffic Policy */
export enum KnownIncomingTrafficPolicy {
  /** AllowAllTraffic */
  AllowAllTraffic = "AllowAllTraffic",
  /** AllowVirtualNetworksOnly */
  AllowVirtualNetworksOnly = "AllowVirtualNetworksOnly",
}

/**
 * Type of the Incoming Traffic Policy \
 * {@link KnownIncomingTrafficPolicy} can be used interchangeably with IncomingTrafficPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AllowAllTraffic** \
 * **AllowVirtualNetworksOnly**
 */
export type IncomingTrafficPolicy = string;

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

/** The private endpoint connection resource. */
export interface PrivateEndpointConnection extends Resource {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
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

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The group ids for the private endpoint resource. */
  readonly groupIds?: string[];
  /** The private endpoint resource. */
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
    provisioningState: item["provisioningState"],
  };
}

/** The private endpoint resource. */
export interface PrivateEndpoint {
  /** The resource identifier of the private endpoint */
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
  actionsRequired?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
    actionsRequired: item["actionsRequired"],
  };
}

/** The private endpoint connection status. */
export enum KnownPrivateEndpointServiceConnectionStatus {
  /** Connection waiting for approval or rejection */
  Pending = "Pending",
  /** Connection approved */
  Approved = "Approved",
  /** Connection Rejected */
  Rejected = "Rejected",
}

/**
 * The private endpoint connection status. \
 * {@link KnownPrivateEndpointServiceConnectionStatus} can be used interchangeably with PrivateEndpointServiceConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection waiting for approval or rejection \
 * **Approved**: Connection approved \
 * **Rejected**: Connection Rejected
 */
export type PrivateEndpointServiceConnectionStatus = string;

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Connection has been provisioned */
  Succeeded = "Succeeded",
  /** Connection is being created */
  Creating = "Creating",
  /** Connection is being deleted */
  Deleting = "Deleting",
  /** Connection provisioning has failed */
  Failed = "Failed",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Connection has been provisioned \
 * **Creating**: Connection is being created \
 * **Deleting**: Connection is being deleted \
 * **Failed**: Connection provisioning has failed
 */
export type PrivateEndpointConnectionProvisioningState = string;

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

/** The parameters used when creating a storage sync service. */
export interface StorageSyncServiceCreateParameters extends TrackedResource {
  /** managed identities for the Storage Sync to interact with other Azure services without maintaining any secrets or credentials in code. */
  identity?: ManagedServiceIdentity;
  /** Incoming Traffic Policy */
  incomingTrafficPolicy?: IncomingTrafficPolicy;
  /** Use Identity authorization when customer have finished setup RBAC permissions. */
  useIdentity?: boolean;
}

export function storageSyncServiceCreateParametersSerializer(
  item: StorageSyncServiceCreateParameters,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, ["incomingTrafficPolicy", "useIdentity"])
      ? undefined
      : _storageSyncServiceCreateParametersPropertiesSerializer(item),
  };
}

/** StorageSyncService Properties object. */
export interface StorageSyncServiceCreateParametersProperties {
  /** Incoming Traffic Policy */
  incomingTrafficPolicy?: IncomingTrafficPolicy;
  /** Use Identity authorization when customer have finished setup RBAC permissions. */
  useIdentity?: boolean;
}

export function storageSyncServiceCreateParametersPropertiesSerializer(
  item: StorageSyncServiceCreateParametersProperties,
): any {
  return { incomingTrafficPolicy: item["incomingTrafficPolicy"], useIdentity: item["useIdentity"] };
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

/** Parameters for updating an Storage sync service. */
export interface StorageSyncServiceUpdateParameters {
  /** The user-specified tags associated with the storage sync service. */
  tags?: Record<string, string>;
  /** managed identities for the Container App to interact with other Azure services without maintaining any secrets or credentials in code. */
  identity?: ManagedServiceIdentity;
  /** Incoming Traffic Policy */
  incomingTrafficPolicy?: IncomingTrafficPolicy;
  /** Use Identity authorization when customer have finished setup RBAC permissions. */
  useIdentity?: boolean;
}

export function storageSyncServiceUpdateParametersSerializer(
  item: StorageSyncServiceUpdateParameters,
): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
    properties: areAllPropsUndefined(item, ["incomingTrafficPolicy", "useIdentity"])
      ? undefined
      : _storageSyncServiceUpdateParametersPropertiesSerializer(item),
  };
}

/** StorageSyncService Properties object. */
export interface StorageSyncServiceUpdateProperties {
  /** Incoming Traffic Policy */
  incomingTrafficPolicy?: IncomingTrafficPolicy;
  /** Use Identity authorization when customer have finished setup RBAC permissions. */
  useIdentity?: boolean;
}

export function storageSyncServiceUpdatePropertiesSerializer(
  item: StorageSyncServiceUpdateProperties,
): any {
  return { incomingTrafficPolicy: item["incomingTrafficPolicy"], useIdentity: item["useIdentity"] };
}

/** Array of StorageSyncServices */
export interface _StorageSyncServiceArray {
  /** Collection of StorageSyncServices. */
  value?: StorageSyncService[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _storageSyncServiceArrayDeserializer(item: any): _StorageSyncServiceArray {
  return {
    value: !item["value"] ? item["value"] : storageSyncServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageSyncServiceArrayDeserializer(result: Array<StorageSyncService>): any[] {
  return result.map((item) => {
    return storageSyncServiceDeserializer(item);
  });
}

/** Parameters for a check name availability request. */
export interface CheckNameAvailabilityParameters {
  /** The name to check for availability */
  name: string;
  /** The resource type. Must be set to Microsoft.StorageSync/storageSyncServices */
  type: Type;
}

export function checkNameAvailabilityParametersSerializer(
  item: CheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** Type of Type */
export type Type = "Microsoft.StorageSync/storageSyncServices";

/** The CheckNameAvailability operation response. */
export interface CheckNameAvailabilityResult {
  /** Gets a boolean value that indicates whether the name is available for you to use. If true, the name is available. If false, the name has already been taken or invalid and cannot be used. */
  readonly nameAvailable?: boolean;
  /** Gets the reason that a Storage Sync Service name could not be used. The Reason element is only returned if NameAvailable is false. */
  readonly reason?: NameAvailabilityReason;
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

/** Gets the reason that a Storage Sync Service name could not be used. The Reason element is only returned if NameAvailable is false. */
export type NameAvailabilityReason = "Invalid" | "AlreadyExists";

/** List of private endpoint connections associated with the specified resource. */
export interface _PrivateEndpointConnectionListResult {
  /** List of private endpoint connections associated with the specified resource. */
  value?: PrivateEndpointConnection[];
  /** The URL to get the next set of results. */
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

/** Sync Group object. */
export interface SyncGroup extends ProxyResource {
  /** Unique Id */
  readonly uniqueId?: string;
  /** Sync group status */
  readonly syncGroupStatus?: string;
}

export function syncGroupDeserializer(item: any): SyncGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _syncGroupPropertiesDeserializer(item["properties"])),
  };
}

/** SyncGroup Properties object. */
export interface SyncGroupProperties {
  /** Unique Id */
  readonly uniqueId?: string;
  /** Sync group status */
  readonly syncGroupStatus?: string;
}

export function syncGroupPropertiesDeserializer(item: any): SyncGroupProperties {
  return {
    uniqueId: item["uniqueId"],
    syncGroupStatus: item["syncGroupStatus"],
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

/** The parameters used when creating a sync group. */
export interface SyncGroupCreateParameters extends ProxyResource {
  /** The parameters used to create the sync group */
  properties?: any;
}

export function syncGroupCreateParametersSerializer(item: SyncGroupCreateParameters): any {
  return { properties: item["properties"] };
}

/** Array of SyncGroup */
export interface _SyncGroupArray {
  /** Collection of SyncGroup. */
  value?: SyncGroup[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _syncGroupArrayDeserializer(item: any): _SyncGroupArray {
  return {
    value: !item["value"] ? item["value"] : syncGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function syncGroupArrayDeserializer(result: Array<SyncGroup>): any[] {
  return result.map((item) => {
    return syncGroupDeserializer(item);
  });
}

/** Cloud Endpoint object. */
export interface CloudEndpoint extends ProxyResource {
  /** Storage Account Resource Id */
  storageAccountResourceId?: string;
  /** Azure file share name */
  azureFileShareName?: string;
  /** Storage Account Tenant Id */
  storageAccountTenantId?: string;
  /** Partnership Id */
  partnershipId?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Backup Enabled */
  readonly backupEnabled?: string;
  /** CloudEndpoint Provisioning State */
  provisioningState?: string;
  /** CloudEndpoint lastWorkflowId */
  lastWorkflowId?: string;
  /** Resource Last Operation Name */
  lastOperationName?: string;
  /** Cloud endpoint change enumeration status */
  readonly changeEnumerationStatus?: CloudEndpointChangeEnumerationStatus;
}

export function cloudEndpointDeserializer(item: any): CloudEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _cloudEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** CloudEndpoint Properties object. */
export interface CloudEndpointProperties {
  /** Storage Account Resource Id */
  storageAccountResourceId?: string;
  /** Azure file share name */
  azureFileShareName?: string;
  /** Storage Account Tenant Id */
  storageAccountTenantId?: string;
  /** Partnership Id */
  partnershipId?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Backup Enabled */
  readonly backupEnabled?: string;
  /** CloudEndpoint Provisioning State */
  provisioningState?: string;
  /** CloudEndpoint lastWorkflowId */
  lastWorkflowId?: string;
  /** Resource Last Operation Name */
  lastOperationName?: string;
  /** Cloud endpoint change enumeration status */
  readonly changeEnumerationStatus?: CloudEndpointChangeEnumerationStatus;
}

export function cloudEndpointPropertiesDeserializer(item: any): CloudEndpointProperties {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    azureFileShareName: item["azureFileShareName"],
    storageAccountTenantId: item["storageAccountTenantId"],
    partnershipId: item["partnershipId"],
    friendlyName: item["friendlyName"],
    backupEnabled: item["backupEnabled"],
    provisioningState: item["provisioningState"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    changeEnumerationStatus: !item["changeEnumerationStatus"]
      ? item["changeEnumerationStatus"]
      : cloudEndpointChangeEnumerationStatusDeserializer(item["changeEnumerationStatus"]),
  };
}

/** Cloud endpoint change enumeration status object */
export interface CloudEndpointChangeEnumerationStatus {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Status of last completed change enumeration */
  readonly lastEnumerationStatus?: CloudEndpointLastChangeEnumerationStatus;
  /** Change enumeration activity */
  readonly activity?: CloudEndpointChangeEnumerationActivity;
}

export function cloudEndpointChangeEnumerationStatusDeserializer(
  item: any,
): CloudEndpointChangeEnumerationStatus {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    lastEnumerationStatus: !item["lastEnumerationStatus"]
      ? item["lastEnumerationStatus"]
      : cloudEndpointLastChangeEnumerationStatusDeserializer(item["lastEnumerationStatus"]),
    activity: !item["activity"]
      ? item["activity"]
      : cloudEndpointChangeEnumerationActivityDeserializer(item["activity"]),
  };
}

/** Cloud endpoint change enumeration status object */
export interface CloudEndpointLastChangeEnumerationStatus {
  /** Timestamp when change enumeration started */
  readonly startedTimestamp?: Date;
  /** Timestamp when change enumeration completed */
  readonly completedTimestamp?: Date;
  /** Count of files in the namespace */
  readonly namespaceFilesCount?: number;
  /** Count of directories in the namespace */
  readonly namespaceDirectoriesCount?: number;
  /** Namespace size in bytes */
  readonly namespaceSizeBytes?: number;
  /** Timestamp of when change enumeration is expected to run again */
  readonly nextRunTimestamp?: Date;
}

export function cloudEndpointLastChangeEnumerationStatusDeserializer(
  item: any,
): CloudEndpointLastChangeEnumerationStatus {
  return {
    startedTimestamp: !item["startedTimestamp"]
      ? item["startedTimestamp"]
      : new Date(item["startedTimestamp"]),
    completedTimestamp: !item["completedTimestamp"]
      ? item["completedTimestamp"]
      : new Date(item["completedTimestamp"]),
    namespaceFilesCount: item["namespaceFilesCount"],
    namespaceDirectoriesCount: item["namespaceDirectoriesCount"],
    namespaceSizeBytes: item["namespaceSizeBytes"],
    nextRunTimestamp: !item["nextRunTimestamp"]
      ? item["nextRunTimestamp"]
      : new Date(item["nextRunTimestamp"]),
  };
}

/** Cloud endpoint change enumeration activity object */
export interface CloudEndpointChangeEnumerationActivity {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Change enumeration operation state */
  readonly operationState?: CloudEndpointChangeEnumerationActivityState;
  /** When non-zero, indicates an issue that is delaying change enumeration */
  readonly statusCode?: number;
  /** Timestamp when change enumeration started */
  readonly startedTimestamp?: Date;
  /** Count of files processed */
  readonly processedFilesCount?: number;
  /** Count of directories processed */
  readonly processedDirectoriesCount?: number;
  /** Total count of files enumerated */
  readonly totalFilesCount?: number;
  /** Total count of directories enumerated */
  readonly totalDirectoriesCount?: number;
  /** Total enumerated size in bytes */
  readonly totalSizeBytes?: number;
  /** Progress percentage for change enumeration run, excluding processing of deletes */
  readonly progressPercent?: number;
  /** Estimate of time remaining for the enumeration run */
  readonly minutesRemaining?: number;
  /** Change enumeration total counts state */
  readonly totalCountsState?: CloudEndpointChangeEnumerationTotalCountsState;
  /** Progress percentage for processing deletes. This is done separately from the rest of the enumeration run */
  readonly deletesProgressPercent?: number;
}

export function cloudEndpointChangeEnumerationActivityDeserializer(
  item: any,
): CloudEndpointChangeEnumerationActivity {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    operationState: item["operationState"],
    statusCode: item["statusCode"],
    startedTimestamp: !item["startedTimestamp"]
      ? item["startedTimestamp"]
      : new Date(item["startedTimestamp"]),
    processedFilesCount: item["processedFilesCount"],
    processedDirectoriesCount: item["processedDirectoriesCount"],
    totalFilesCount: item["totalFilesCount"],
    totalDirectoriesCount: item["totalDirectoriesCount"],
    totalSizeBytes: item["totalSizeBytes"],
    progressPercent: item["progressPercent"],
    minutesRemaining: item["minutesRemaining"],
    totalCountsState: item["totalCountsState"],
    deletesProgressPercent: item["deletesProgressPercent"],
  };
}

/** State of change enumeration activity */
export enum KnownCloudEndpointChangeEnumerationActivityState {
  /** InitialEnumerationInProgress */
  InitialEnumerationInProgress = "InitialEnumerationInProgress",
  /** EnumerationInProgress */
  EnumerationInProgress = "EnumerationInProgress",
}

/**
 * State of change enumeration activity \
 * {@link KnownCloudEndpointChangeEnumerationActivityState} can be used interchangeably with CloudEndpointChangeEnumerationActivityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InitialEnumerationInProgress** \
 * **EnumerationInProgress**
 */
export type CloudEndpointChangeEnumerationActivityState = string;

/** State of the total counts of change enumeration activity */
export enum KnownCloudEndpointChangeEnumerationTotalCountsState {
  /** Calculating */
  Calculating = "Calculating",
  /** Final */
  Final = "Final",
}

/**
 * State of the total counts of change enumeration activity \
 * {@link KnownCloudEndpointChangeEnumerationTotalCountsState} can be used interchangeably with CloudEndpointChangeEnumerationTotalCountsState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Calculating** \
 * **Final**
 */
export type CloudEndpointChangeEnumerationTotalCountsState = string;

/** The parameters used when creating a cloud endpoint. */
export interface CloudEndpointCreateParameters extends ProxyResource {
  /** Storage Account Resource Id */
  storageAccountResourceId?: string;
  /** Azure file share name */
  azureFileShareName?: string;
  /** Storage Account Tenant Id */
  storageAccountTenantId?: string;
  /** Friendly Name */
  friendlyName?: string;
}

export function cloudEndpointCreateParametersSerializer(item: CloudEndpointCreateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "storageAccountResourceId",
      "azureFileShareName",
      "storageAccountTenantId",
      "friendlyName",
    ])
      ? undefined
      : _cloudEndpointCreateParametersPropertiesSerializer(item),
  };
}

/** CloudEndpoint Properties object. */
export interface CloudEndpointCreateParametersProperties {
  /** Storage Account Resource Id */
  storageAccountResourceId?: string;
  /** Azure file share name */
  azureFileShareName?: string;
  /** Storage Account Tenant Id */
  storageAccountTenantId?: string;
  /** Friendly Name */
  friendlyName?: string;
}

export function cloudEndpointCreateParametersPropertiesSerializer(
  item: CloudEndpointCreateParametersProperties,
): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    azureFileShareName: item["azureFileShareName"],
    storageAccountTenantId: item["storageAccountTenantId"],
    friendlyName: item["friendlyName"],
  };
}

/** Array of CloudEndpoint */
export interface _CloudEndpointArray {
  /** Collection of CloudEndpoint. */
  value?: CloudEndpoint[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _cloudEndpointArrayDeserializer(item: any): _CloudEndpointArray {
  return {
    value: !item["value"] ? item["value"] : cloudEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cloudEndpointArrayDeserializer(result: Array<CloudEndpoint>): any[] {
  return result.map((item) => {
    return cloudEndpointDeserializer(item);
  });
}

/** Backup request */
export interface BackupRequest {
  /** Azure File Share. */
  azureFileShare?: string;
}

export function backupRequestSerializer(item: BackupRequest): any {
  return { azureFileShare: item["azureFileShare"] };
}

/** Post Backup Response */
export interface PostBackupResponse {
  /** cloud endpoint Name. */
  readonly cloudEndpointName?: string;
}

export function postBackupResponseDeserializer(item: any): PostBackupResponse {
  return {
    ...(!item["backupMetadata"]
      ? item["backupMetadata"]
      : _postBackupResponseBackupMetadataDeserializer(item["backupMetadata"])),
  };
}

/** Post Backup Response Properties object. */
export interface PostBackupResponseProperties {
  /** cloud endpoint Name. */
  readonly cloudEndpointName?: string;
}

export function postBackupResponsePropertiesDeserializer(item: any): PostBackupResponseProperties {
  return {
    cloudEndpointName: item["cloudEndpointName"],
  };
}

/** Pre Restore request object. */
export interface PreRestoreRequest {
  /** Pre Restore partition. */
  partition?: string;
  /** Pre Restore replica group. */
  replicaGroup?: string;
  /** Pre Restore request id. */
  requestId?: string;
  /** Pre Restore Azure file share uri. */
  azureFileShareUri?: string;
  /** Pre Restore Azure status. */
  status?: string;
  /** Pre Restore Azure source azure file share uri. */
  sourceAzureFileShareUri?: string;
  /** Pre Restore backup metadata property bag. */
  backupMetadataPropertyBag?: string;
  /** Pre Restore restore file spec array. */
  restoreFileSpec?: RestoreFileSpec[];
  /** Pre Restore pause wait for sync drain time period in seconds. */
  pauseWaitForSyncDrainTimePeriodInSeconds?: number;
}

export function preRestoreRequestSerializer(item: PreRestoreRequest): any {
  return {
    partition: item["partition"],
    replicaGroup: item["replicaGroup"],
    requestId: item["requestId"],
    azureFileShareUri: item["azureFileShareUri"],
    status: item["status"],
    sourceAzureFileShareUri: item["sourceAzureFileShareUri"],
    backupMetadataPropertyBag: item["backupMetadataPropertyBag"],
    restoreFileSpec: !item["restoreFileSpec"]
      ? item["restoreFileSpec"]
      : restoreFileSpecArraySerializer(item["restoreFileSpec"]),
    pauseWaitForSyncDrainTimePeriodInSeconds: item["pauseWaitForSyncDrainTimePeriodInSeconds"],
  };
}

export function restoreFileSpecArraySerializer(result: Array<RestoreFileSpec>): any[] {
  return result.map((item) => {
    return restoreFileSpecSerializer(item);
  });
}

/** Restore file spec. */
export interface RestoreFileSpec {
  /** Restore file spec path */
  path?: string;
  /** Restore file spec isdir */
  isdir?: boolean;
}

export function restoreFileSpecSerializer(item: RestoreFileSpec): any {
  return { path: item["path"], isdir: item["isdir"] };
}

/** Post Restore Request */
export interface PostRestoreRequest {
  /** Post Restore partition. */
  partition?: string;
  /** Post Restore replica group. */
  replicaGroup?: string;
  /** Post Restore request id. */
  requestId?: string;
  /** Post Restore Azure file share uri. */
  azureFileShareUri?: string;
  /** Post Restore Azure status. */
  status?: string;
  /** Post Restore Azure source azure file share uri. */
  sourceAzureFileShareUri?: string;
  /** Post Restore Azure failed file list. */
  failedFileList?: string;
  /** Post Restore restore file spec array. */
  restoreFileSpec?: RestoreFileSpec[];
}

export function postRestoreRequestSerializer(item: PostRestoreRequest): any {
  return {
    partition: item["partition"],
    replicaGroup: item["replicaGroup"],
    requestId: item["requestId"],
    azureFileShareUri: item["azureFileShareUri"],
    status: item["status"],
    sourceAzureFileShareUri: item["sourceAzureFileShareUri"],
    failedFileList: item["failedFileList"],
    restoreFileSpec: !item["restoreFileSpec"]
      ? item["restoreFileSpec"]
      : restoreFileSpecArraySerializer(item["restoreFileSpec"]),
  };
}

/** The parameters used when calling trigger change detection action on cloud endpoint. */
export interface TriggerChangeDetectionParameters {
  /** Relative path to a directory Azure File share for which change detection is to be performed. */
  directoryPath?: string;
  /** Change Detection Mode. Applies to a directory specified in directoryPath parameter. */
  changeDetectionMode?: ChangeDetectionMode;
  /** Array of relative paths on the Azure File share to be included in the change detection. Can be files and directories. */
  paths?: string[];
}

export function triggerChangeDetectionParametersSerializer(
  item: TriggerChangeDetectionParameters,
): any {
  return {
    directoryPath: item["directoryPath"],
    changeDetectionMode: item["changeDetectionMode"],
    paths: !item["paths"]
      ? item["paths"]
      : item["paths"].map((p: any) => {
          return p;
        }),
  };
}

/** Change Detection Mode. Applies to a directory specified in directoryPath parameter. */
export enum KnownChangeDetectionMode {
  /** Default */
  Default = "Default",
  /** Recursive */
  Recursive = "Recursive",
}

/**
 * Change Detection Mode. Applies to a directory specified in directoryPath parameter. \
 * {@link KnownChangeDetectionMode} can be used interchangeably with ChangeDetectionMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **Recursive**
 */
export type ChangeDetectionMode = string;

/** Cloud endpoint AFS file share metadata signing certificate public keys. */
export interface CloudEndpointAfsShareMetadataCertificatePublicKeys {
  /** The first public key. */
  readonly firstKey?: string;
  /** The second public key. */
  readonly secondKey?: string;
}

export function cloudEndpointAfsShareMetadataCertificatePublicKeysDeserializer(
  item: any,
): CloudEndpointAfsShareMetadataCertificatePublicKeys {
  return {
    firstKey: item["firstKey"],
    secondKey: item["secondKey"],
  };
}

/** Server Endpoint object. */
export interface ServerEndpoint extends ProxyResource {
  /** Server Local path. */
  serverLocalPath?: string;
  /** Cloud Tiering. */
  cloudTiering?: FeatureStatus;
  /** Level of free space to be maintained by Cloud Tiering if it is enabled. */
  volumeFreeSpacePercent?: number;
  /** Tier files older than days. */
  tierFilesOlderThanDays?: number;
  /** Friendly Name */
  friendlyName?: string;
  /** Server Resource Id. */
  serverResourceId?: string;
  /** ServerEndpoint Provisioning State */
  readonly provisioningState?: string;
  /** ServerEndpoint lastWorkflowId */
  readonly lastWorkflowId?: string;
  /** Resource Last Operation Name */
  readonly lastOperationName?: string;
  /** Server Endpoint sync status */
  readonly syncStatus?: ServerEndpointSyncStatus;
  /** Offline data transfer */
  offlineDataTransfer?: FeatureStatus;
  /** Offline data transfer storage account resource ID */
  readonly offlineDataTransferStorageAccountResourceId?: string;
  /** Offline data transfer storage account tenant ID */
  readonly offlineDataTransferStorageAccountTenantId?: string;
  /** Offline data transfer share name */
  offlineDataTransferShareName?: string;
  /** Cloud tiering status. Only populated if cloud tiering is enabled. */
  readonly cloudTieringStatus?: ServerEndpointCloudTieringStatus;
  /** Recall status. Only populated if cloud tiering is enabled. */
  readonly recallStatus?: ServerEndpointRecallStatus;
  /** Policy for how namespace and files are recalled during FastDr. */
  initialDownloadPolicy?: InitialDownloadPolicy;
  /** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
  localCacheMode?: LocalCacheMode;
  /** Policy for how the initial upload sync session is performed. */
  initialUploadPolicy?: InitialUploadPolicy;
  /** Server name */
  readonly serverName?: string;
  /** Server Endpoint provisioning status */
  serverEndpointProvisioningStatus?: ServerEndpointProvisioningStatus;
}

export function serverEndpointDeserializer(item: any): ServerEndpoint {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _serverEndpointPropertiesDeserializer(item["properties"])),
  };
}

/** ServerEndpoint Properties object. */
export interface ServerEndpointProperties {
  /** Server Local path. */
  serverLocalPath?: string;
  /** Cloud Tiering. */
  cloudTiering?: FeatureStatus;
  /** Level of free space to be maintained by Cloud Tiering if it is enabled. */
  volumeFreeSpacePercent?: number;
  /** Tier files older than days. */
  tierFilesOlderThanDays?: number;
  /** Friendly Name */
  friendlyName?: string;
  /** Server Resource Id. */
  serverResourceId?: string;
  /** ServerEndpoint Provisioning State */
  readonly provisioningState?: string;
  /** ServerEndpoint lastWorkflowId */
  readonly lastWorkflowId?: string;
  /** Resource Last Operation Name */
  readonly lastOperationName?: string;
  /** Server Endpoint sync status */
  readonly syncStatus?: ServerEndpointSyncStatus;
  /** Offline data transfer */
  offlineDataTransfer?: FeatureStatus;
  /** Offline data transfer storage account resource ID */
  readonly offlineDataTransferStorageAccountResourceId?: string;
  /** Offline data transfer storage account tenant ID */
  readonly offlineDataTransferStorageAccountTenantId?: string;
  /** Offline data transfer share name */
  offlineDataTransferShareName?: string;
  /** Cloud tiering status. Only populated if cloud tiering is enabled. */
  readonly cloudTieringStatus?: ServerEndpointCloudTieringStatus;
  /** Recall status. Only populated if cloud tiering is enabled. */
  readonly recallStatus?: ServerEndpointRecallStatus;
  /** Policy for how namespace and files are recalled during FastDr. */
  initialDownloadPolicy?: InitialDownloadPolicy;
  /** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
  localCacheMode?: LocalCacheMode;
  /** Policy for how the initial upload sync session is performed. */
  initialUploadPolicy?: InitialUploadPolicy;
  /** Server name */
  readonly serverName?: string;
  /** Server Endpoint provisioning status */
  serverEndpointProvisioningStatus?: ServerEndpointProvisioningStatus;
}

export function serverEndpointPropertiesDeserializer(item: any): ServerEndpointProperties {
  return {
    serverLocalPath: item["serverLocalPath"],
    cloudTiering: item["cloudTiering"],
    volumeFreeSpacePercent: item["volumeFreeSpacePercent"],
    tierFilesOlderThanDays: item["tierFilesOlderThanDays"],
    friendlyName: item["friendlyName"],
    serverResourceId: item["serverResourceId"],
    provisioningState: item["provisioningState"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    syncStatus: !item["syncStatus"]
      ? item["syncStatus"]
      : serverEndpointSyncStatusDeserializer(item["syncStatus"]),
    offlineDataTransfer: item["offlineDataTransfer"],
    offlineDataTransferStorageAccountResourceId:
      item["offlineDataTransferStorageAccountResourceId"],
    offlineDataTransferStorageAccountTenantId: item["offlineDataTransferStorageAccountTenantId"],
    offlineDataTransferShareName: item["offlineDataTransferShareName"],
    cloudTieringStatus: !item["cloudTieringStatus"]
      ? item["cloudTieringStatus"]
      : serverEndpointCloudTieringStatusDeserializer(item["cloudTieringStatus"]),
    recallStatus: !item["recallStatus"]
      ? item["recallStatus"]
      : serverEndpointRecallStatusDeserializer(item["recallStatus"]),
    initialDownloadPolicy: item["initialDownloadPolicy"],
    localCacheMode: item["localCacheMode"],
    initialUploadPolicy: item["initialUploadPolicy"],
    serverName: item["serverName"],
    serverEndpointProvisioningStatus: !item["serverEndpointProvisioningStatus"]
      ? item["serverEndpointProvisioningStatus"]
      : serverEndpointProvisioningStatusDeserializer(item["serverEndpointProvisioningStatus"]),
  };
}

/** Type of the Feature Status */
export enum KnownFeatureStatus {
  /** on */
  On = "on",
  /** off */
  Off = "off",
}

/**
 * Type of the Feature Status \
 * {@link KnownFeatureStatus} can be used interchangeably with FeatureStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **on** \
 * **off**
 */
export type FeatureStatus = string;

/** Server Endpoint sync status */
export interface ServerEndpointSyncStatus {
  /** Download Health Status. */
  readonly downloadHealth?: ServerEndpointHealthState;
  /** Upload Health Status. */
  readonly uploadHealth?: ServerEndpointHealthState;
  /** Combined Health Status. */
  readonly combinedHealth?: ServerEndpointHealthState;
  /** Sync activity */
  readonly syncActivity?: ServerEndpointSyncActivityState;
  /** Total count of persistent files not syncing (combined upload + download). */
  readonly totalPersistentFilesNotSyncingCount?: number;
  /** Last Updated Timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Upload Status */
  readonly uploadStatus?: ServerEndpointSyncSessionStatus;
  /** Download Status */
  readonly downloadStatus?: ServerEndpointSyncSessionStatus;
  /** Upload sync activity */
  readonly uploadActivity?: ServerEndpointSyncActivityStatus;
  /** Download sync activity */
  readonly downloadActivity?: ServerEndpointSyncActivityStatus;
  /** Offline Data Transfer State */
  readonly offlineDataTransferStatus?: ServerEndpointOfflineDataTransferState;
  /** Background data download activity */
  readonly backgroundDataDownloadActivity?: ServerEndpointBackgroundDataDownloadActivity;
}

export function serverEndpointSyncStatusDeserializer(item: any): ServerEndpointSyncStatus {
  return {
    downloadHealth: item["downloadHealth"],
    uploadHealth: item["uploadHealth"],
    combinedHealth: item["combinedHealth"],
    syncActivity: item["syncActivity"],
    totalPersistentFilesNotSyncingCount: item["totalPersistentFilesNotSyncingCount"],
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    uploadStatus: !item["uploadStatus"]
      ? item["uploadStatus"]
      : serverEndpointSyncSessionStatusDeserializer(item["uploadStatus"]),
    downloadStatus: !item["downloadStatus"]
      ? item["downloadStatus"]
      : serverEndpointSyncSessionStatusDeserializer(item["downloadStatus"]),
    uploadActivity: !item["uploadActivity"]
      ? item["uploadActivity"]
      : serverEndpointSyncActivityStatusDeserializer(item["uploadActivity"]),
    downloadActivity: !item["downloadActivity"]
      ? item["downloadActivity"]
      : serverEndpointSyncActivityStatusDeserializer(item["downloadActivity"]),
    offlineDataTransferStatus: item["offlineDataTransferStatus"],
    backgroundDataDownloadActivity: !item["backgroundDataDownloadActivity"]
      ? item["backgroundDataDownloadActivity"]
      : serverEndpointBackgroundDataDownloadActivityDeserializer(
          item["backgroundDataDownloadActivity"],
        ),
  };
}

/** Type of the server endpoint health state */
export enum KnownServerEndpointHealthState {
  /** Unavailable */
  Unavailable = "Unavailable",
  /** Healthy */
  Healthy = "Healthy",
  /** Error */
  Error = "Error",
}

/**
 * Type of the server endpoint health state \
 * {@link KnownServerEndpointHealthState} can be used interchangeably with ServerEndpointHealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unavailable** \
 * **Healthy** \
 * **Error**
 */
export type ServerEndpointHealthState = string;

/** Type of the sync activity state */
export enum KnownServerEndpointSyncActivityState {
  /** Upload */
  Upload = "Upload",
  /** Download */
  Download = "Download",
  /** UploadAndDownload */
  UploadAndDownload = "UploadAndDownload",
}

/**
 * Type of the sync activity state \
 * {@link KnownServerEndpointSyncActivityState} can be used interchangeably with ServerEndpointSyncActivityState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Upload** \
 * **Download** \
 * **UploadAndDownload**
 */
export type ServerEndpointSyncActivityState = string;

/** Sync Session status object. */
export interface ServerEndpointSyncSessionStatus {
  /** Last sync result (HResult) */
  readonly lastSyncResult?: number;
  /** Last sync timestamp */
  readonly lastSyncTimestamp?: Date;
  /** Last sync success timestamp */
  readonly lastSyncSuccessTimestamp?: Date;
  /** Last sync per item error count. */
  readonly lastSyncPerItemErrorCount?: number;
  /** Count of persistent files not syncing. */
  readonly persistentFilesNotSyncingCount?: number;
  /** Count of transient files not syncing. */
  readonly transientFilesNotSyncingCount?: number;
  /** Array of per-item errors coming from the last sync session. */
  readonly filesNotSyncingErrors?: ServerEndpointFilesNotSyncingError[];
  /** Sync mode */
  readonly lastSyncMode?: ServerEndpointSyncMode;
}

export function serverEndpointSyncSessionStatusDeserializer(
  item: any,
): ServerEndpointSyncSessionStatus {
  return {
    lastSyncResult: item["lastSyncResult"],
    lastSyncTimestamp: !item["lastSyncTimestamp"]
      ? item["lastSyncTimestamp"]
      : new Date(item["lastSyncTimestamp"]),
    lastSyncSuccessTimestamp: !item["lastSyncSuccessTimestamp"]
      ? item["lastSyncSuccessTimestamp"]
      : new Date(item["lastSyncSuccessTimestamp"]),
    lastSyncPerItemErrorCount: item["lastSyncPerItemErrorCount"],
    persistentFilesNotSyncingCount: item["persistentFilesNotSyncingCount"],
    transientFilesNotSyncingCount: item["transientFilesNotSyncingCount"],
    filesNotSyncingErrors: !item["filesNotSyncingErrors"]
      ? item["filesNotSyncingErrors"]
      : serverEndpointFilesNotSyncingErrorArrayDeserializer(item["filesNotSyncingErrors"]),
    lastSyncMode: item["lastSyncMode"],
  };
}

export function serverEndpointFilesNotSyncingErrorArrayDeserializer(
  result: Array<ServerEndpointFilesNotSyncingError>,
): any[] {
  return result.map((item) => {
    return serverEndpointFilesNotSyncingErrorDeserializer(item);
  });
}

/** Files not syncing error object */
export interface ServerEndpointFilesNotSyncingError {
  /** Error code (HResult) */
  readonly errorCode?: number;
  /** Count of persistent files not syncing with the specified error code */
  readonly persistentCount?: number;
  /** Count of transient files not syncing with the specified error code */
  readonly transientCount?: number;
}

export function serverEndpointFilesNotSyncingErrorDeserializer(
  item: any,
): ServerEndpointFilesNotSyncingError {
  return {
    errorCode: item["errorCode"],
    persistentCount: item["persistentCount"],
    transientCount: item["transientCount"],
  };
}

/** Sync mode for the server endpoint. */
export enum KnownServerEndpointSyncMode {
  /** Regular */
  Regular = "Regular",
  /** NamespaceDownload */
  NamespaceDownload = "NamespaceDownload",
  /** InitialUpload */
  InitialUpload = "InitialUpload",
  /** SnapshotUpload */
  SnapshotUpload = "SnapshotUpload",
  /** InitialFullDownload */
  InitialFullDownload = "InitialFullDownload",
}

/**
 * Sync mode for the server endpoint. \
 * {@link KnownServerEndpointSyncMode} can be used interchangeably with ServerEndpointSyncMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Regular** \
 * **NamespaceDownload** \
 * **InitialUpload** \
 * **SnapshotUpload** \
 * **InitialFullDownload**
 */
export type ServerEndpointSyncMode = string;

/** Sync Session status object. */
export interface ServerEndpointSyncActivityStatus {
  /** Timestamp when properties were updated */
  readonly timestamp?: Date;
  /** Per item error count */
  readonly perItemErrorCount?: number;
  /** Applied item count. */
  readonly appliedItemCount?: number;
  /** Total item count (if available) */
  readonly totalItemCount?: number;
  /** Applied bytes */
  readonly appliedBytes?: number;
  /** Total bytes (if available) */
  readonly totalBytes?: number;
  /** Sync mode */
  readonly syncMode?: ServerEndpointSyncMode;
  /** Session minutes remaining (if available) */
  readonly sessionMinutesRemaining?: number;
}

export function serverEndpointSyncActivityStatusDeserializer(
  item: any,
): ServerEndpointSyncActivityStatus {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    perItemErrorCount: item["perItemErrorCount"],
    appliedItemCount: item["appliedItemCount"],
    totalItemCount: item["totalItemCount"],
    appliedBytes: item["appliedBytes"],
    totalBytes: item["totalBytes"],
    syncMode: item["syncMode"],
    sessionMinutesRemaining: item["sessionMinutesRemaining"],
  };
}

/** Type of the Health state */
export enum KnownServerEndpointOfflineDataTransferState {
  /** InProgress */
  InProgress = "InProgress",
  /** Stopping */
  Stopping = "Stopping",
  /** NotRunning */
  NotRunning = "NotRunning",
  /** Complete */
  Complete = "Complete",
}

/**
 * Type of the Health state \
 * {@link KnownServerEndpointOfflineDataTransferState} can be used interchangeably with ServerEndpointOfflineDataTransferState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InProgress** \
 * **Stopping** \
 * **NotRunning** \
 * **Complete**
 */
export type ServerEndpointOfflineDataTransferState = string;

/** Background data download activity object */
export interface ServerEndpointBackgroundDataDownloadActivity {
  /** Timestamp when properties were updated */
  readonly timestamp?: Date;
  /** Timestamp when the operation started */
  readonly startedTimestamp?: Date;
  /** Progress percentage */
  readonly percentProgress?: number;
  /** Running count of bytes downloaded */
  readonly downloadedBytes?: number;
}

export function serverEndpointBackgroundDataDownloadActivityDeserializer(
  item: any,
): ServerEndpointBackgroundDataDownloadActivity {
  return {
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    startedTimestamp: !item["startedTimestamp"]
      ? item["startedTimestamp"]
      : new Date(item["startedTimestamp"]),
    percentProgress: item["percentProgress"],
    downloadedBytes: item["downloadedBytes"],
  };
}

/** Server endpoint cloud tiering status object. */
export interface ServerEndpointCloudTieringStatus {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Cloud tiering health state. */
  readonly health?: ServerEndpointHealthState;
  /** The last updated timestamp of health state */
  readonly healthLastUpdatedTimestamp?: Date;
  /** Last cloud tiering result (HResult) */
  readonly lastCloudTieringResult?: number;
  /** Last cloud tiering success timestamp */
  readonly lastSuccessTimestamp?: Date;
  /** Information regarding how much local space cloud tiering is saving. */
  readonly spaceSavings?: CloudTieringSpaceSavings;
  /** Information regarding how well the local cache on the server is performing. */
  readonly cachePerformance?: CloudTieringCachePerformance;
  /** Information regarding files that failed to be tiered */
  readonly filesNotTiering?: CloudTieringFilesNotTiering;
  /** Status of the volume free space policy */
  readonly volumeFreeSpacePolicyStatus?: CloudTieringVolumeFreeSpacePolicyStatus;
  /** Status of the date policy */
  readonly datePolicyStatus?: CloudTieringDatePolicyStatus;
  /** Information regarding the low disk mode state */
  readonly lowDiskMode?: CloudTieringLowDiskMode;
}

export function serverEndpointCloudTieringStatusDeserializer(
  item: any,
): ServerEndpointCloudTieringStatus {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    health: item["health"],
    healthLastUpdatedTimestamp: !item["healthLastUpdatedTimestamp"]
      ? item["healthLastUpdatedTimestamp"]
      : new Date(item["healthLastUpdatedTimestamp"]),
    lastCloudTieringResult: item["lastCloudTieringResult"],
    lastSuccessTimestamp: !item["lastSuccessTimestamp"]
      ? item["lastSuccessTimestamp"]
      : new Date(item["lastSuccessTimestamp"]),
    spaceSavings: !item["spaceSavings"]
      ? item["spaceSavings"]
      : cloudTieringSpaceSavingsDeserializer(item["spaceSavings"]),
    cachePerformance: !item["cachePerformance"]
      ? item["cachePerformance"]
      : cloudTieringCachePerformanceDeserializer(item["cachePerformance"]),
    filesNotTiering: !item["filesNotTiering"]
      ? item["filesNotTiering"]
      : cloudTieringFilesNotTieringDeserializer(item["filesNotTiering"]),
    volumeFreeSpacePolicyStatus: !item["volumeFreeSpacePolicyStatus"]
      ? item["volumeFreeSpacePolicyStatus"]
      : cloudTieringVolumeFreeSpacePolicyStatusDeserializer(item["volumeFreeSpacePolicyStatus"]),
    datePolicyStatus: !item["datePolicyStatus"]
      ? item["datePolicyStatus"]
      : cloudTieringDatePolicyStatusDeserializer(item["datePolicyStatus"]),
    lowDiskMode: !item["lowDiskMode"]
      ? item["lowDiskMode"]
      : cloudTieringLowDiskModeDeserializer(item["lowDiskMode"]),
  };
}

/** Server endpoint cloud tiering status object. */
export interface CloudTieringSpaceSavings {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Volume size */
  readonly volumeSizeBytes?: number;
  /** Total size of content in the azure file share */
  readonly totalSizeCloudBytes?: number;
  /** Cached content size on the server */
  readonly cachedSizeBytes?: number;
  /** Percentage of cached size over total size */
  readonly spaceSavingsPercent?: number;
  /** Count of bytes saved on the server */
  readonly spaceSavingsBytes?: number;
}

export function cloudTieringSpaceSavingsDeserializer(item: any): CloudTieringSpaceSavings {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    volumeSizeBytes: item["volumeSizeBytes"],
    totalSizeCloudBytes: item["totalSizeCloudBytes"],
    cachedSizeBytes: item["cachedSizeBytes"],
    spaceSavingsPercent: item["spaceSavingsPercent"],
    spaceSavingsBytes: item["spaceSavingsBytes"],
  };
}

/** Server endpoint cloud tiering status object. */
export interface CloudTieringCachePerformance {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Count of bytes that were served from the local server */
  readonly cacheHitBytes?: number;
  /** Count of bytes that were served from the cloud */
  readonly cacheMissBytes?: number;
  /** Percentage of total bytes (hit + miss) that were served from the local server */
  readonly cacheHitBytesPercent?: number;
}

export function cloudTieringCachePerformanceDeserializer(item: any): CloudTieringCachePerformance {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    cacheHitBytes: item["cacheHitBytes"],
    cacheMissBytes: item["cacheMissBytes"],
    cacheHitBytesPercent: item["cacheHitBytesPercent"],
  };
}

/** Server endpoint cloud tiering status object. */
export interface CloudTieringFilesNotTiering {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Last cloud tiering result (HResult) */
  readonly totalFileCount?: number;
  /** Array of tiering errors */
  readonly errors?: FilesNotTieringError[];
}

export function cloudTieringFilesNotTieringDeserializer(item: any): CloudTieringFilesNotTiering {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    totalFileCount: item["totalFileCount"],
    errors: !item["errors"]
      ? item["errors"]
      : filesNotTieringErrorArrayDeserializer(item["errors"]),
  };
}

export function filesNotTieringErrorArrayDeserializer(result: Array<FilesNotTieringError>): any[] {
  return result.map((item) => {
    return filesNotTieringErrorDeserializer(item);
  });
}

/** Files not tiering error object */
export interface FilesNotTieringError {
  /** Error code (HResult) */
  readonly errorCode?: number;
  /** Count of files with this error */
  readonly fileCount?: number;
}

export function filesNotTieringErrorDeserializer(item: any): FilesNotTieringError {
  return {
    errorCode: item["errorCode"],
    fileCount: item["fileCount"],
  };
}

/** Status of the volume free space policy */
export interface CloudTieringVolumeFreeSpacePolicyStatus {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** In the case where multiple server endpoints are present in a volume, an effective free space policy is applied. */
  readonly effectiveVolumeFreeSpacePolicy?: number;
  /** Current volume free space percentage. */
  readonly currentVolumeFreeSpacePercent?: number;
}

export function cloudTieringVolumeFreeSpacePolicyStatusDeserializer(
  item: any,
): CloudTieringVolumeFreeSpacePolicyStatus {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    effectiveVolumeFreeSpacePolicy: item["effectiveVolumeFreeSpacePolicy"],
    currentVolumeFreeSpacePercent: item["currentVolumeFreeSpacePercent"],
  };
}

/** Status of the date policy */
export interface CloudTieringDatePolicyStatus {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Most recent access time of tiered files */
  readonly tieredFilesMostRecentAccessTimestamp?: Date;
}

export function cloudTieringDatePolicyStatusDeserializer(item: any): CloudTieringDatePolicyStatus {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    tieredFilesMostRecentAccessTimestamp: !item["tieredFilesMostRecentAccessTimestamp"]
      ? item["tieredFilesMostRecentAccessTimestamp"]
      : new Date(item["tieredFilesMostRecentAccessTimestamp"]),
  };
}

/** Information regarding the low disk mode state */
export interface CloudTieringLowDiskMode {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Low disk mode state */
  readonly state?: CloudTieringLowDiskModeState;
}

export function cloudTieringLowDiskModeDeserializer(item: any): CloudTieringLowDiskMode {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    state: item["state"],
  };
}

/** Type of the cloud tiering low disk mode state */
export enum KnownCloudTieringLowDiskModeState {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Type of the cloud tiering low disk mode state \
 * {@link KnownCloudTieringLowDiskModeState} can be used interchangeably with CloudTieringLowDiskModeState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled** \
 * **Disabled**
 */
export type CloudTieringLowDiskModeState = string;

/** Server endpoint recall status object. */
export interface ServerEndpointRecallStatus {
  /** Last updated timestamp */
  readonly lastUpdatedTimestamp?: Date;
  /** Total count of recall errors. */
  readonly totalRecallErrorsCount?: number;
  /** Array of recall errors */
  readonly recallErrors?: ServerEndpointRecallError[];
}

export function serverEndpointRecallStatusDeserializer(item: any): ServerEndpointRecallStatus {
  return {
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    totalRecallErrorsCount: item["totalRecallErrorsCount"],
    recallErrors: !item["recallErrors"]
      ? item["recallErrors"]
      : serverEndpointRecallErrorArrayDeserializer(item["recallErrors"]),
  };
}

export function serverEndpointRecallErrorArrayDeserializer(
  result: Array<ServerEndpointRecallError>,
): any[] {
  return result.map((item) => {
    return serverEndpointRecallErrorDeserializer(item);
  });
}

/** Server endpoint recall error object */
export interface ServerEndpointRecallError {
  /** Error code (HResult) */
  readonly errorCode?: number;
  /** Count of occurences of the error */
  readonly count?: number;
}

export function serverEndpointRecallErrorDeserializer(item: any): ServerEndpointRecallError {
  return {
    errorCode: item["errorCode"],
    count: item["count"],
  };
}

/** Policy for how namespace and files are recalled during FastDr */
export enum KnownInitialDownloadPolicy {
  /** NamespaceOnly */
  NamespaceOnly = "NamespaceOnly",
  /** NamespaceThenModifiedFiles */
  NamespaceThenModifiedFiles = "NamespaceThenModifiedFiles",
  /** AvoidTieredFiles */
  AvoidTieredFiles = "AvoidTieredFiles",
}

/**
 * Policy for how namespace and files are recalled during FastDr \
 * {@link KnownInitialDownloadPolicy} can be used interchangeably with InitialDownloadPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NamespaceOnly** \
 * **NamespaceThenModifiedFiles** \
 * **AvoidTieredFiles**
 */
export type InitialDownloadPolicy = string;

/** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
export enum KnownLocalCacheMode {
  /** DownloadNewAndModifiedFiles */
  DownloadNewAndModifiedFiles = "DownloadNewAndModifiedFiles",
  /** UpdateLocallyCachedFiles */
  UpdateLocallyCachedFiles = "UpdateLocallyCachedFiles",
}

/**
 * Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. \
 * {@link KnownLocalCacheMode} can be used interchangeably with LocalCacheMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DownloadNewAndModifiedFiles** \
 * **UpdateLocallyCachedFiles**
 */
export type LocalCacheMode = string;

/** Policy for how the initial upload sync session is performed. */
export enum KnownInitialUploadPolicy {
  /** ServerAuthoritative */
  ServerAuthoritative = "ServerAuthoritative",
  /** Merge */
  Merge = "Merge",
}

/**
 * Policy for how the initial upload sync session is performed. \
 * {@link KnownInitialUploadPolicy} can be used interchangeably with InitialUploadPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServerAuthoritative** \
 * **Merge**
 */
export type InitialUploadPolicy = string;

/** Server endpoint provisioning status information */
export interface ServerEndpointProvisioningStatus {
  /** Server Endpoint provisioning status */
  readonly provisioningStatus?: ServerProvisioningStatus;
  /** Server Endpoint provisioning type */
  readonly provisioningType?: string;
  /** Provisioning Step status information for each step in the provisioning process */
  readonly provisioningStepStatuses?: ServerEndpointProvisioningStepStatus[];
}

export function serverEndpointProvisioningStatusDeserializer(
  item: any,
): ServerEndpointProvisioningStatus {
  return {
    provisioningStatus: item["provisioningStatus"],
    provisioningType: item["provisioningType"],
    provisioningStepStatuses: !item["provisioningStepStatuses"]
      ? item["provisioningStepStatuses"]
      : serverEndpointProvisioningStepStatusArrayDeserializer(item["provisioningStepStatuses"]),
  };
}

/** Server provisioning status */
export enum KnownServerProvisioningStatus {
  /** NotStarted */
  NotStarted = "NotStarted",
  /** InProgress */
  InProgress = "InProgress",
  /** Ready_SyncNotFunctional */
  ReadySyncNotFunctional = "Ready_SyncNotFunctional",
  /** Ready_SyncFunctional */
  ReadySyncFunctional = "Ready_SyncFunctional",
  /** Error */
  Error = "Error",
}

/**
 * Server provisioning status \
 * {@link KnownServerProvisioningStatus} can be used interchangeably with ServerProvisioningStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted** \
 * **InProgress** \
 * **Ready_SyncNotFunctional** \
 * **Ready_SyncFunctional** \
 * **Error**
 */
export type ServerProvisioningStatus = string;

export function serverEndpointProvisioningStepStatusArrayDeserializer(
  result: Array<ServerEndpointProvisioningStepStatus>,
): any[] {
  return result.map((item) => {
    return serverEndpointProvisioningStepStatusDeserializer(item);
  });
}

/** Server endpoint provisioning step status object. */
export interface ServerEndpointProvisioningStepStatus {
  /** Name of the provisioning step */
  readonly name?: string;
  /** Status of the provisioning step */
  readonly status?: string;
  /** Start time of the provisioning step */
  readonly startTime?: Date;
  /** Estimated completion time of the provisioning step in minutes */
  readonly minutesLeft?: number;
  /** Estimated progress percentage */
  readonly progressPercentage?: number;
  /** End time of the provisioning step */
  readonly endTime?: Date;
  /** Error code (HResult) for the provisioning step */
  readonly errorCode?: number;
  /** Additional information for the provisioning step */
  readonly additionalInformation?: Record<string, string>;
}

export function serverEndpointProvisioningStepStatusDeserializer(
  item: any,
): ServerEndpointProvisioningStepStatus {
  return {
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    minutesLeft: item["minutesLeft"],
    progressPercentage: item["progressPercentage"],
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    errorCode: item["errorCode"],
    additionalInformation: !item["additionalInformation"]
      ? item["additionalInformation"]
      : Object.fromEntries(
          Object.entries(item["additionalInformation"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The parameters used when creating a server endpoint. */
export interface ServerEndpointCreateParameters extends ProxyResource {
  /** Server Local path. */
  serverLocalPath?: string;
  /** Cloud Tiering. */
  cloudTiering?: FeatureStatus;
  /** Level of free space to be maintained by Cloud Tiering if it is enabled. */
  volumeFreeSpacePercent?: number;
  /** Tier files older than days. */
  tierFilesOlderThanDays?: number;
  /** Friendly Name */
  friendlyName?: string;
  /** Server Resource Id. */
  serverResourceId?: string;
  /** Offline data transfer */
  offlineDataTransfer?: FeatureStatus;
  /** Offline data transfer share name */
  offlineDataTransferShareName?: string;
  /** Policy for how namespace and files are recalled during FastDr. */
  initialDownloadPolicy?: InitialDownloadPolicy;
  /** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
  localCacheMode?: LocalCacheMode;
  /** Policy for how the initial upload sync session is performed. */
  initialUploadPolicy?: InitialUploadPolicy;
}

export function serverEndpointCreateParametersSerializer(
  item: ServerEndpointCreateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "serverLocalPath",
      "cloudTiering",
      "volumeFreeSpacePercent",
      "tierFilesOlderThanDays",
      "friendlyName",
      "serverResourceId",
      "offlineDataTransfer",
      "offlineDataTransferShareName",
      "initialDownloadPolicy",
      "localCacheMode",
      "initialUploadPolicy",
    ])
      ? undefined
      : _serverEndpointCreateParametersPropertiesSerializer(item),
  };
}

/** ServerEndpoint Properties object. */
export interface ServerEndpointCreateParametersProperties {
  /** Server Local path. */
  serverLocalPath?: string;
  /** Cloud Tiering. */
  cloudTiering?: FeatureStatus;
  /** Level of free space to be maintained by Cloud Tiering if it is enabled. */
  volumeFreeSpacePercent?: number;
  /** Tier files older than days. */
  tierFilesOlderThanDays?: number;
  /** Friendly Name */
  friendlyName?: string;
  /** Server Resource Id. */
  serverResourceId?: string;
  /** Offline data transfer */
  offlineDataTransfer?: FeatureStatus;
  /** Offline data transfer share name */
  offlineDataTransferShareName?: string;
  /** Policy for how namespace and files are recalled during FastDr. */
  initialDownloadPolicy?: InitialDownloadPolicy;
  /** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
  localCacheMode?: LocalCacheMode;
  /** Policy for how the initial upload sync session is performed. */
  initialUploadPolicy?: InitialUploadPolicy;
}

export function serverEndpointCreateParametersPropertiesSerializer(
  item: ServerEndpointCreateParametersProperties,
): any {
  return {
    serverLocalPath: item["serverLocalPath"],
    cloudTiering: item["cloudTiering"],
    volumeFreeSpacePercent: item["volumeFreeSpacePercent"],
    tierFilesOlderThanDays: item["tierFilesOlderThanDays"],
    friendlyName: item["friendlyName"],
    serverResourceId: item["serverResourceId"],
    offlineDataTransfer: item["offlineDataTransfer"],
    offlineDataTransferShareName: item["offlineDataTransferShareName"],
    initialDownloadPolicy: item["initialDownloadPolicy"],
    localCacheMode: item["localCacheMode"],
    initialUploadPolicy: item["initialUploadPolicy"],
  };
}

/** Parameters for updating an Server Endpoint. */
export interface ServerEndpointUpdateParameters {
  /** Cloud Tiering. */
  cloudTiering?: FeatureStatus;
  /** Level of free space to be maintained by Cloud Tiering if it is enabled. */
  volumeFreeSpacePercent?: number;
  /** Tier files older than days. */
  tierFilesOlderThanDays?: number;
  /** Offline data transfer */
  offlineDataTransfer?: FeatureStatus;
  /** Offline data transfer share name */
  offlineDataTransferShareName?: string;
  /** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
  localCacheMode?: LocalCacheMode;
}

export function serverEndpointUpdateParametersSerializer(
  item: ServerEndpointUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "cloudTiering",
      "volumeFreeSpacePercent",
      "tierFilesOlderThanDays",
      "offlineDataTransfer",
      "offlineDataTransferShareName",
      "localCacheMode",
    ])
      ? undefined
      : _serverEndpointUpdateParametersPropertiesSerializer(item),
  };
}

/** ServerEndpoint Update Properties object. */
export interface ServerEndpointUpdateProperties {
  /** Cloud Tiering. */
  cloudTiering?: FeatureStatus;
  /** Level of free space to be maintained by Cloud Tiering if it is enabled. */
  volumeFreeSpacePercent?: number;
  /** Tier files older than days. */
  tierFilesOlderThanDays?: number;
  /** Offline data transfer */
  offlineDataTransfer?: FeatureStatus;
  /** Offline data transfer share name */
  offlineDataTransferShareName?: string;
  /** Policy for enabling follow-the-sun business models: link local cache to cloud behavior to pre-populate before local access. */
  localCacheMode?: LocalCacheMode;
}

export function serverEndpointUpdatePropertiesSerializer(
  item: ServerEndpointUpdateProperties,
): any {
  return {
    cloudTiering: item["cloudTiering"],
    volumeFreeSpacePercent: item["volumeFreeSpacePercent"],
    tierFilesOlderThanDays: item["tierFilesOlderThanDays"],
    offlineDataTransfer: item["offlineDataTransfer"],
    offlineDataTransferShareName: item["offlineDataTransferShareName"],
    localCacheMode: item["localCacheMode"],
  };
}

/** Array of ServerEndpoint */
export interface _ServerEndpointArray {
  /** Collection of ServerEndpoint. */
  value?: ServerEndpoint[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _serverEndpointArrayDeserializer(item: any): _ServerEndpointArray {
  return {
    value: !item["value"] ? item["value"] : serverEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serverEndpointArrayDeserializer(result: Array<ServerEndpoint>): any[] {
  return result.map((item) => {
    return serverEndpointDeserializer(item);
  });
}

/** The parameters used when calling recall action on server endpoint. */
export interface RecallActionParameters {
  /** Pattern of the files. */
  pattern?: string;
  /** Recall path. */
  recallPath?: string;
}

export function recallActionParametersSerializer(item: RecallActionParameters): any {
  return { pattern: item["pattern"], recallPath: item["recallPath"] };
}

/** Registered Server resource. */
export interface RegisteredServer extends ProxyResource {
  /** Registered Server Certificate */
  serverCertificate?: string;
  /** Registered Server Agent Version */
  agentVersion?: string;
  /** Registered Server Agent Version Status */
  readonly agentVersionStatus?: RegisteredServerAgentVersionStatus;
  /** Registered Server Agent Version Expiration Date */
  readonly agentVersionExpirationDate?: Date;
  /** Registered Server OS Version */
  serverOSVersion?: string;
  /** Registered Server Management Error Code */
  serverManagementErrorCode?: number;
  /** Registered Server last heart beat */
  lastHeartBeat?: string;
  /** Registered Server Provisioning State */
  provisioningState?: string;
  /** Registered Server serverRole */
  serverRole?: string;
  /** Registered Server clusterId */
  clusterId?: string;
  /** Registered Server clusterName */
  clusterName?: string;
  /** Registered Server serverId */
  serverId?: string;
  /** Registered Server storageSyncServiceUid */
  storageSyncServiceUid?: string;
  /** Registered Server lastWorkflowId */
  lastWorkflowId?: string;
  /** Resource Last Operation Name */
  lastOperationName?: string;
  /** Resource discoveryEndpointUri */
  discoveryEndpointUri?: string;
  /** Resource Location */
  resourceLocation?: string;
  /** Service Location */
  serviceLocation?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Management Endpoint Uri */
  managementEndpointUri?: string;
  /** Telemetry Endpoint Uri */
  monitoringEndpointUri?: string;
  /** Monitoring Configuration */
  monitoringConfiguration?: string;
  /** Server name */
  readonly serverName?: string;
  /** Server Application Id */
  applicationId?: string;
  /** Apply server with newly discovered ApplicationId if available. */
  readonly identity?: boolean;
  /** Latest Server Application Id discovered from the server. It is not yet applied. */
  latestApplicationId?: string;
  /** Server auth type. */
  readonly activeAuthType?: ServerAuthType;
}

export function registeredServerDeserializer(item: any): RegisteredServer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _registeredServerPropertiesDeserializer(item["properties"])),
  };
}

/** RegisteredServer Properties object. */
export interface RegisteredServerProperties {
  /** Registered Server Certificate */
  serverCertificate?: string;
  /** Registered Server Agent Version */
  agentVersion?: string;
  /** Registered Server Agent Version Status */
  readonly agentVersionStatus?: RegisteredServerAgentVersionStatus;
  /** Registered Server Agent Version Expiration Date */
  readonly agentVersionExpirationDate?: Date;
  /** Registered Server OS Version */
  serverOSVersion?: string;
  /** Registered Server Management Error Code */
  serverManagementErrorCode?: number;
  /** Registered Server last heart beat */
  lastHeartBeat?: string;
  /** Registered Server Provisioning State */
  provisioningState?: string;
  /** Registered Server serverRole */
  serverRole?: string;
  /** Registered Server clusterId */
  clusterId?: string;
  /** Registered Server clusterName */
  clusterName?: string;
  /** Registered Server serverId */
  serverId?: string;
  /** Registered Server storageSyncServiceUid */
  storageSyncServiceUid?: string;
  /** Registered Server lastWorkflowId */
  lastWorkflowId?: string;
  /** Resource Last Operation Name */
  lastOperationName?: string;
  /** Resource discoveryEndpointUri */
  discoveryEndpointUri?: string;
  /** Resource Location */
  resourceLocation?: string;
  /** Service Location */
  serviceLocation?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Management Endpoint Uri */
  managementEndpointUri?: string;
  /** Telemetry Endpoint Uri */
  monitoringEndpointUri?: string;
  /** Monitoring Configuration */
  monitoringConfiguration?: string;
  /** Server name */
  readonly serverName?: string;
  /** Server Application Id */
  applicationId?: string;
  /** Apply server with newly discovered ApplicationId if available. */
  readonly identity?: boolean;
  /** Latest Server Application Id discovered from the server. It is not yet applied. */
  latestApplicationId?: string;
  /** Server auth type. */
  readonly activeAuthType?: ServerAuthType;
}

export function registeredServerPropertiesDeserializer(item: any): RegisteredServerProperties {
  return {
    serverCertificate: item["serverCertificate"],
    agentVersion: item["agentVersion"],
    agentVersionStatus: item["agentVersionStatus"],
    agentVersionExpirationDate: !item["agentVersionExpirationDate"]
      ? item["agentVersionExpirationDate"]
      : new Date(item["agentVersionExpirationDate"]),
    serverOSVersion: item["serverOSVersion"],
    serverManagementErrorCode: item["serverManagementErrorCode"],
    lastHeartBeat: item["lastHeartBeat"],
    provisioningState: item["provisioningState"],
    serverRole: item["serverRole"],
    clusterId: item["clusterId"],
    clusterName: item["clusterName"],
    serverId: item["serverId"],
    storageSyncServiceUid: item["storageSyncServiceUid"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    discoveryEndpointUri: item["discoveryEndpointUri"],
    resourceLocation: item["resourceLocation"],
    serviceLocation: item["serviceLocation"],
    friendlyName: item["friendlyName"],
    managementEndpointUri: item["managementEndpointUri"],
    monitoringEndpointUri: item["monitoringEndpointUri"],
    monitoringConfiguration: item["monitoringConfiguration"],
    serverName: item["serverName"],
    applicationId: item["applicationId"],
    identity: item["identity"],
    latestApplicationId: item["latestApplicationId"],
    activeAuthType: item["activeAuthType"],
  };
}

/** Type of the registered server agent version status */
export enum KnownRegisteredServerAgentVersionStatus {
  /** Ok */
  Ok = "Ok",
  /** NearExpiry */
  NearExpiry = "NearExpiry",
  /** Expired */
  Expired = "Expired",
  /** Blocked */
  Blocked = "Blocked",
}

/**
 * Type of the registered server agent version status \
 * {@link KnownRegisteredServerAgentVersionStatus} can be used interchangeably with RegisteredServerAgentVersionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ok** \
 * **NearExpiry** \
 * **Expired** \
 * **Blocked**
 */
export type RegisteredServerAgentVersionStatus = string;

/** Type of the Server Auth type */
export enum KnownServerAuthType {
  /** Certificate */
  Certificate = "Certificate",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
}

/**
 * Type of the Server Auth type \
 * {@link KnownServerAuthType} can be used interchangeably with ServerAuthType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Certificate** \
 * **ManagedIdentity**
 */
export type ServerAuthType = string;

/** The parameters used when creating a registered server. */
export interface RegisteredServerCreateParameters extends ProxyResource {
  /** Registered Server Certificate */
  serverCertificate?: string;
  /** Registered Server Agent Version */
  agentVersion?: string;
  /** Registered Server OS Version */
  serverOSVersion?: string;
  /** Registered Server last heart beat */
  lastHeartBeat?: string;
  /** Registered Server serverRole */
  serverRole?: string;
  /** Registered Server clusterId */
  clusterId?: string;
  /** Registered Server clusterName */
  clusterName?: string;
  /** Registered Server serverId */
  serverId?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Server ServicePrincipal Id */
  applicationId?: string;
  /** Apply server with newly discovered ApplicationId if available. */
  identity?: boolean;
}

export function registeredServerCreateParametersSerializer(
  item: RegisteredServerCreateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, [
      "serverCertificate",
      "agentVersion",
      "serverOSVersion",
      "lastHeartBeat",
      "serverRole",
      "clusterId",
      "clusterName",
      "serverId",
      "friendlyName",
      "applicationId",
      "identity",
    ])
      ? undefined
      : _registeredServerCreateParametersPropertiesSerializer(item),
  };
}

/** RegisteredServer Create Properties object. */
export interface RegisteredServerCreateParametersProperties {
  /** Registered Server Certificate */
  serverCertificate?: string;
  /** Registered Server Agent Version */
  agentVersion?: string;
  /** Registered Server OS Version */
  serverOSVersion?: string;
  /** Registered Server last heart beat */
  lastHeartBeat?: string;
  /** Registered Server serverRole */
  serverRole?: string;
  /** Registered Server clusterId */
  clusterId?: string;
  /** Registered Server clusterName */
  clusterName?: string;
  /** Registered Server serverId */
  serverId?: string;
  /** Friendly Name */
  friendlyName?: string;
  /** Server ServicePrincipal Id */
  applicationId?: string;
  /** Apply server with newly discovered ApplicationId if available. */
  identity?: boolean;
}

export function registeredServerCreateParametersPropertiesSerializer(
  item: RegisteredServerCreateParametersProperties,
): any {
  return {
    serverCertificate: item["serverCertificate"],
    agentVersion: item["agentVersion"],
    serverOSVersion: item["serverOSVersion"],
    lastHeartBeat: item["lastHeartBeat"],
    serverRole: item["serverRole"],
    clusterId: item["clusterId"],
    clusterName: item["clusterName"],
    serverId: item["serverId"],
    friendlyName: item["friendlyName"],
    applicationId: item["applicationId"],
    identity: item["identity"],
  };
}

/** The parameters used when updating a registered server. */
export interface RegisteredServerUpdateParameters extends ProxyResource {
  /** Apply server with newly discovered ApplicationId if available. */
  identity?: boolean;
  /** Apply server with new ServicePrincipal Id */
  applicationId?: string;
}

export function registeredServerUpdateParametersSerializer(
  item: RegisteredServerUpdateParameters,
): any {
  return {
    properties: areAllPropsUndefined(item, ["identity", "applicationId"])
      ? undefined
      : _registeredServerUpdateParametersPropertiesSerializer(item),
  };
}

/** RegisteredServer Update Properties object. */
export interface RegisteredServerUpdateProperties {
  /** Apply server with newly discovered ApplicationId if available. */
  identity?: boolean;
  /** Apply server with new ServicePrincipal Id */
  applicationId?: string;
}

export function registeredServerUpdatePropertiesSerializer(
  item: RegisteredServerUpdateProperties,
): any {
  return { identity: item["identity"], applicationId: item["applicationId"] };
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

/** Array of RegisteredServer */
export interface _RegisteredServerArray {
  /** Collection of Registered Server. */
  value?: RegisteredServer[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _registeredServerArrayDeserializer(item: any): _RegisteredServerArray {
  return {
    value: !item["value"] ? item["value"] : registeredServerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function registeredServerArrayDeserializer(result: Array<RegisteredServer>): any[] {
  return result.map((item) => {
    return registeredServerDeserializer(item);
  });
}

/** Trigger Rollover Request. */
export interface TriggerRolloverRequest {
  /** Certificate Data */
  serverCertificate?: string;
}

export function triggerRolloverRequestSerializer(item: TriggerRolloverRequest): any {
  return { serverCertificate: item["serverCertificate"] };
}

/** Workflow resource. */
export interface Workflow extends ProxyResource {
  /** last step name */
  lastStepName?: string;
  /** workflow status. */
  status?: WorkflowStatus;
  /** operation direction. */
  operation?: OperationDirection;
  /** workflow steps */
  steps?: string;
  /** workflow last operation identifier. */
  lastOperationId?: string;
  /** workflow command name. */
  readonly commandName?: string;
  /** workflow created timestamp. */
  readonly createdTimestamp?: Date;
  /** workflow last status timestamp. */
  readonly lastStatusTimestamp?: Date;
}

export function workflowDeserializer(item: any): Workflow {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _workflowPropertiesDeserializer(item["properties"])),
  };
}

/** Workflow Properties object. */
export interface WorkflowProperties {
  /** last step name */
  lastStepName?: string;
  /** workflow status. */
  status?: WorkflowStatus;
  /** operation direction. */
  operation?: OperationDirection;
  /** workflow steps */
  steps?: string;
  /** workflow last operation identifier. */
  lastOperationId?: string;
  /** workflow command name. */
  readonly commandName?: string;
  /** workflow created timestamp. */
  readonly createdTimestamp?: Date;
  /** workflow last status timestamp. */
  readonly lastStatusTimestamp?: Date;
}

export function workflowPropertiesDeserializer(item: any): WorkflowProperties {
  return {
    lastStepName: item["lastStepName"],
    status: item["status"],
    operation: item["operation"],
    steps: item["steps"],
    lastOperationId: item["lastOperationId"],
    commandName: item["commandName"],
    createdTimestamp: !item["createdTimestamp"]
      ? item["createdTimestamp"]
      : new Date(item["createdTimestamp"]),
    lastStatusTimestamp: !item["lastStatusTimestamp"]
      ? item["lastStatusTimestamp"]
      : new Date(item["lastStatusTimestamp"]),
  };
}

/** Type of the Workflow Status */
export enum KnownWorkflowStatus {
  /** active */
  Active = "active",
  /** expired */
  Expired = "expired",
  /** succeeded */
  Succeeded = "succeeded",
  /** aborted */
  Aborted = "aborted",
  /** failed */
  Failed = "failed",
}

/**
 * Type of the Workflow Status \
 * {@link KnownWorkflowStatus} can be used interchangeably with WorkflowStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **active** \
 * **expired** \
 * **succeeded** \
 * **aborted** \
 * **failed**
 */
export type WorkflowStatus = string;

/** Type of the Operation Direction */
export enum KnownOperationDirection {
  /** do */
  Do = "do",
  /** undo */
  Undo = "undo",
  /** cancel */
  Cancel = "cancel",
}

/**
 * Type of the Operation Direction \
 * {@link KnownOperationDirection} can be used interchangeably with OperationDirection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **do** \
 * **undo** \
 * **cancel**
 */
export type OperationDirection = string;

/** Array of Workflow */
export interface _WorkflowArray {
  /** Collection of workflow items. */
  value?: Workflow[];
  /** The URL to get the next set of results. */
  nextLink?: string;
}

export function _workflowArrayDeserializer(item: any): _WorkflowArray {
  return {
    value: !item["value"] ? item["value"] : workflowArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function workflowArrayDeserializer(result: Array<Workflow>): any[] {
  return result.map((item) => {
    return workflowDeserializer(item);
  });
}

/**
 * A list of private link resources for versions before v6.
 *
 * This model represents the standard `PrivateLinkResourceListResult` envelope for versions v3, v4, and v5. It has been deprecated for v6 and beyond.
 *
 * Note: This is only intended for use with versions before v6. Do not use this if you are already on CommonTypes.Version.v6 or beyond.
 *
 * If you are migrating to v6 or above, use `PrivateLinkResourceListResult` directly.
 */
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

/** A private link resource. */
export interface PrivateLinkResource extends Resource {
  /** Resource properties. */
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

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
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

/** Operation status object */
export interface OperationStatus {
  /** Operation Id */
  readonly name?: string;
  /** Operation status */
  readonly status?: string;
  /** Start time of the operation */
  readonly startTime?: Date;
  /** End time of the operation */
  readonly endTime?: Date;
  /** Error details. */
  readonly error?: StorageSyncApiError;
}

export function operationStatusDeserializer(item: any): OperationStatus {
  return {
    name: item["name"],
    status: item["status"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    error: !item["error"] ? item["error"] : storageSyncApiErrorDeserializer(item["error"]),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2022-09-01 API version. */
  V20220901 = "2022-09-01",
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
    groupIds: !item["groupIds"]
      ? item["groupIds"]
      : item["groupIds"].map((p: any) => {
          return p;
        }),
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
    provisioningState: item["provisioningState"],
  };
}

export function _storageSyncServicePropertiesDeserializer(item: any) {
  return {
    incomingTrafficPolicy: item["incomingTrafficPolicy"],
    storageSyncServiceStatus: item["storageSyncServiceStatus"],
    storageSyncServiceUid: item["storageSyncServiceUid"],
    provisioningState: item["provisioningState"],
    useIdentity: item["useIdentity"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

export function _storageSyncServiceCreateParametersPropertiesSerializer(
  item: StorageSyncServiceCreateParameters,
): any {
  return { incomingTrafficPolicy: item["incomingTrafficPolicy"], useIdentity: item["useIdentity"] };
}

export function _storageSyncServiceUpdateParametersPropertiesSerializer(
  item: StorageSyncServiceUpdateParameters,
): any {
  return { incomingTrafficPolicy: item["incomingTrafficPolicy"], useIdentity: item["useIdentity"] };
}

export function _syncGroupPropertiesDeserializer(item: any) {
  return {
    uniqueId: item["uniqueId"],
    syncGroupStatus: item["syncGroupStatus"],
  };
}

export function _cloudEndpointPropertiesDeserializer(item: any) {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    azureFileShareName: item["azureFileShareName"],
    storageAccountTenantId: item["storageAccountTenantId"],
    partnershipId: item["partnershipId"],
    friendlyName: item["friendlyName"],
    backupEnabled: item["backupEnabled"],
    provisioningState: item["provisioningState"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    changeEnumerationStatus: !item["changeEnumerationStatus"]
      ? item["changeEnumerationStatus"]
      : cloudEndpointChangeEnumerationStatusDeserializer(item["changeEnumerationStatus"]),
  };
}

export function _cloudEndpointCreateParametersPropertiesSerializer(
  item: CloudEndpointCreateParameters,
): any {
  return {
    storageAccountResourceId: item["storageAccountResourceId"],
    azureFileShareName: item["azureFileShareName"],
    storageAccountTenantId: item["storageAccountTenantId"],
    friendlyName: item["friendlyName"],
  };
}

export function _postBackupResponseBackupMetadataDeserializer(item: any) {
  return {
    cloudEndpointName: item["cloudEndpointName"],
  };
}

export function _serverEndpointPropertiesDeserializer(item: any) {
  return {
    serverLocalPath: item["serverLocalPath"],
    cloudTiering: item["cloudTiering"],
    volumeFreeSpacePercent: item["volumeFreeSpacePercent"],
    tierFilesOlderThanDays: item["tierFilesOlderThanDays"],
    friendlyName: item["friendlyName"],
    serverResourceId: item["serverResourceId"],
    provisioningState: item["provisioningState"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    syncStatus: !item["syncStatus"]
      ? item["syncStatus"]
      : serverEndpointSyncStatusDeserializer(item["syncStatus"]),
    offlineDataTransfer: item["offlineDataTransfer"],
    offlineDataTransferStorageAccountResourceId:
      item["offlineDataTransferStorageAccountResourceId"],
    offlineDataTransferStorageAccountTenantId: item["offlineDataTransferStorageAccountTenantId"],
    offlineDataTransferShareName: item["offlineDataTransferShareName"],
    cloudTieringStatus: !item["cloudTieringStatus"]
      ? item["cloudTieringStatus"]
      : serverEndpointCloudTieringStatusDeserializer(item["cloudTieringStatus"]),
    recallStatus: !item["recallStatus"]
      ? item["recallStatus"]
      : serverEndpointRecallStatusDeserializer(item["recallStatus"]),
    initialDownloadPolicy: item["initialDownloadPolicy"],
    localCacheMode: item["localCacheMode"],
    initialUploadPolicy: item["initialUploadPolicy"],
    serverName: item["serverName"],
    serverEndpointProvisioningStatus: !item["serverEndpointProvisioningStatus"]
      ? item["serverEndpointProvisioningStatus"]
      : serverEndpointProvisioningStatusDeserializer(item["serverEndpointProvisioningStatus"]),
  };
}

export function _serverEndpointCreateParametersPropertiesSerializer(
  item: ServerEndpointCreateParameters,
): any {
  return {
    serverLocalPath: item["serverLocalPath"],
    cloudTiering: item["cloudTiering"],
    volumeFreeSpacePercent: item["volumeFreeSpacePercent"],
    tierFilesOlderThanDays: item["tierFilesOlderThanDays"],
    friendlyName: item["friendlyName"],
    serverResourceId: item["serverResourceId"],
    offlineDataTransfer: item["offlineDataTransfer"],
    offlineDataTransferShareName: item["offlineDataTransferShareName"],
    initialDownloadPolicy: item["initialDownloadPolicy"],
    localCacheMode: item["localCacheMode"],
    initialUploadPolicy: item["initialUploadPolicy"],
  };
}

export function _serverEndpointUpdateParametersPropertiesSerializer(
  item: ServerEndpointUpdateParameters,
): any {
  return {
    cloudTiering: item["cloudTiering"],
    volumeFreeSpacePercent: item["volumeFreeSpacePercent"],
    tierFilesOlderThanDays: item["tierFilesOlderThanDays"],
    offlineDataTransfer: item["offlineDataTransfer"],
    offlineDataTransferShareName: item["offlineDataTransferShareName"],
    localCacheMode: item["localCacheMode"],
  };
}

export function _registeredServerPropertiesDeserializer(item: any) {
  return {
    serverCertificate: item["serverCertificate"],
    agentVersion: item["agentVersion"],
    agentVersionStatus: item["agentVersionStatus"],
    agentVersionExpirationDate: !item["agentVersionExpirationDate"]
      ? item["agentVersionExpirationDate"]
      : new Date(item["agentVersionExpirationDate"]),
    serverOSVersion: item["serverOSVersion"],
    serverManagementErrorCode: item["serverManagementErrorCode"],
    lastHeartBeat: item["lastHeartBeat"],
    provisioningState: item["provisioningState"],
    serverRole: item["serverRole"],
    clusterId: item["clusterId"],
    clusterName: item["clusterName"],
    serverId: item["serverId"],
    storageSyncServiceUid: item["storageSyncServiceUid"],
    lastWorkflowId: item["lastWorkflowId"],
    lastOperationName: item["lastOperationName"],
    discoveryEndpointUri: item["discoveryEndpointUri"],
    resourceLocation: item["resourceLocation"],
    serviceLocation: item["serviceLocation"],
    friendlyName: item["friendlyName"],
    managementEndpointUri: item["managementEndpointUri"],
    monitoringEndpointUri: item["monitoringEndpointUri"],
    monitoringConfiguration: item["monitoringConfiguration"],
    serverName: item["serverName"],
    applicationId: item["applicationId"],
    identity: item["identity"],
    latestApplicationId: item["latestApplicationId"],
    activeAuthType: item["activeAuthType"],
  };
}

export function _registeredServerCreateParametersPropertiesSerializer(
  item: RegisteredServerCreateParameters,
): any {
  return {
    serverCertificate: item["serverCertificate"],
    agentVersion: item["agentVersion"],
    serverOSVersion: item["serverOSVersion"],
    lastHeartBeat: item["lastHeartBeat"],
    serverRole: item["serverRole"],
    clusterId: item["clusterId"],
    clusterName: item["clusterName"],
    serverId: item["serverId"],
    friendlyName: item["friendlyName"],
    applicationId: item["applicationId"],
    identity: item["identity"],
  };
}

export function _registeredServerUpdateParametersPropertiesSerializer(
  item: RegisteredServerUpdateParameters,
): any {
  return { identity: item["identity"], applicationId: item["applicationId"] };
}

export function _workflowPropertiesDeserializer(item: any) {
  return {
    lastStepName: item["lastStepName"],
    status: item["status"],
    operation: item["operation"],
    steps: item["steps"],
    lastOperationId: item["lastOperationId"],
    commandName: item["commandName"],
    createdTimestamp: !item["createdTimestamp"]
      ? item["createdTimestamp"]
      : new Date(item["createdTimestamp"]),
    lastStatusTimestamp: !item["lastStatusTimestamp"]
      ? item["lastStatusTimestamp"]
      : new Date(item["lastStatusTimestamp"]),
  };
}
