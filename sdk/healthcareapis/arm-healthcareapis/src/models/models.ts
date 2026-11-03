// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Available operations of the service */
export interface _ListOperations {
  /** Collection of available operation details */
  readonly value?: OperationDetail[];
  /**
   * URL client should use to fetch the next page (per server side paging).
   * It's null for now, added for future use.
   */
  nextLink?: string;
}

export function _listOperationsDeserializer(item: any): _ListOperations {
  return {
    value: !item["value"] ? item["value"] : operationDetailArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationDetailArrayDeserializer(result: Array<OperationDetail>): any[] {
  return result.map((item) => {
    return operationDetailDeserializer(item);
  });
}

/** Service REST API operation. */
export interface OperationDetail {
  /** Name of the operation */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for ARM/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Display of the operation */
  display?: OperationDisplay;
  /** Default value is 'user,system'. */
  readonly origin?: string;
  /** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  readonly actionType?: ActionType;
  /** Properties of the operation */
  properties?: OperationProperties;
}

export function operationDetailDeserializer(item: any): OperationDetail {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    actionType: item["actionType"],
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** The object that represents the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft.HealthcareApis */
  readonly provider?: string;
  /** Resource Type: Services */
  readonly resource?: string;
  /** Name of the operation */
  readonly operation?: string;
  /** Friendly description for the operation, */
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

/** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
export enum KnownActionType {
  /** Internal */
  Internal = "Internal",
}

/**
 * Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**: Internal
 */
export type ActionType = string;

/** Extra Operation properties */
export interface OperationProperties {
  /** Service specifications of the operation */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** Service specification payload */
export interface ServiceSpecification {
  /** Specifications of the Log for Azure Monitoring */
  logSpecifications?: LogSpecification[];
  /** Specifications of the Metrics for Azure Monitoring */
  metricSpecifications?: MetricSpecification[];
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

/** Specifications of the Log for Azure Monitoring */
export interface LogSpecification {
  /** Name of the log */
  name?: string;
  /** Localized friendly display name of the log */
  displayName?: string;
  /** Blob duration of the log */
  blobDuration?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    blobDuration: item["blobDuration"],
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Specifications of the Metrics for Azure Monitoring */
export interface MetricSpecification {
  /** Name of the metric */
  name?: string;
  /** Localized friendly display name of the metric */
  displayName?: string;
  /** Localized friendly description of the metric */
  displayDescription?: string;
  /** Unit that makes sense for the metric */
  unit?: string;
  /** Name of the metric category that the metric belongs to. A metric can only belong to a single category. */
  category?: string;
  /** Only provide one value for this field. Valid values: Average, Minimum, Maximum, Total, Count. */
  aggregationType?: string;
  /** Supported aggregation types */
  supportedAggregationTypes?: string[];
  /** Supported time grain types */
  supportedTimeGrainTypes?: string[];
  /** Optional. If set to true, then zero will be returned for time duration where no metric is emitted/published. */
  fillGapWithZero?: boolean;
  /** Pattern for the filter of the metric. */
  metricFilterPattern?: string;
  /** Dimensions of the metric */
  dimensions?: MetricDimension[];
  /** Whether the metric is internal. */
  isInternal?: boolean;
  /** The source MDM account. */
  sourceMdmAccount?: string;
  /** The source MDM namespace. */
  sourceMdmNamespace?: string;
  /** Whether regional MDM account enabled. */
  enableRegionalMdmAccount?: boolean;
  /** The resource Id dimension name override. */
  resourceIdDimensionNameOverride?: string;
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
    category: item["category"],
    aggregationType: item["aggregationType"],
    supportedAggregationTypes: !item["supportedAggregationTypes"]
      ? item["supportedAggregationTypes"]
      : item["supportedAggregationTypes"].map((p: any) => {
          return p;
        }),
    supportedTimeGrainTypes: !item["supportedTimeGrainTypes"]
      ? item["supportedTimeGrainTypes"]
      : item["supportedTimeGrainTypes"].map((p: any) => {
          return p;
        }),
    fillGapWithZero: item["fillGapWithZero"],
    metricFilterPattern: item["metricFilterPattern"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : metricDimensionArrayDeserializer(item["dimensions"]),
    isInternal: item["isInternal"],
    sourceMdmAccount: item["sourceMdmAccount"],
    sourceMdmNamespace: item["sourceMdmNamespace"],
    enableRegionalMdmAccount: item["enableRegionalMdmAccount"],
    resourceIdDimensionNameOverride: item["resourceIdDimensionNameOverride"],
  };
}

export function metricDimensionArrayDeserializer(result: Array<MetricDimension>): any[] {
  return result.map((item) => {
    return metricDimensionDeserializer(item);
  });
}

/** Specifications of the Dimension of metrics */
export interface MetricDimension {
  /** Name of the dimension */
  name?: string;
  /** Localized friendly display name of the dimension */
  displayName?: string;
  /** Whether this dimension should be included for the Shoebox export scenario */
  toBeExportedForShoebox?: boolean;
}

export function metricDimensionDeserializer(item: any): MetricDimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
    toBeExportedForShoebox: item["toBeExportedForShoebox"],
  };
}

/** Error details. */
export interface ErrorDetails {
  /** Error details */
  error?: ErrorDetailsInternal;
}

export function errorDetailsDeserializer(item: any): ErrorDetails {
  return {
    error: !item["error"] ? item["error"] : errorDetailsInternalDeserializer(item["error"]),
  };
}

/** Error details. */
export interface ErrorDetailsInternal {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The target of the particular error. */
  readonly target?: string;
}

export function errorDetailsInternalDeserializer(item: any): ErrorDetailsInternal {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
  };
}

/** The Private Endpoint Connection resource. */
export interface PrivateEndpointConnectionDescription extends ProxyResource {
  /** The private endpoint resource. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
  /** The provisioning state of the private endpoint connection resource. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
}

export function privateEndpointConnectionDescriptionSerializer(
  item: PrivateEndpointConnectionDescription,
): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionDescriptionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDescriptionDeserializer(
  item: any,
): PrivateEndpointConnectionDescription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionDescriptionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of the private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
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

/** List of private endpoint connection associated with the specified storage account */
export interface _PrivateEndpointConnectionListResultDescription {
  /** Array of private endpoint connections */
  value?: PrivateEndpointConnectionDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _privateEndpointConnectionListResultDescriptionDeserializer(
  item: any,
): _PrivateEndpointConnectionListResultDescription {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateEndpointConnectionDescriptionArraySerializer(
  result: Array<PrivateEndpointConnectionDescription>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDescriptionSerializer(item);
  });
}

export function privateEndpointConnectionDescriptionArrayDeserializer(
  result: Array<PrivateEndpointConnectionDescription>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDescriptionDeserializer(item);
  });
}

/** The Private Endpoint Connection resource. */
export interface PrivateLinkResourceDescription extends ProxyResource {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

export function privateLinkResourceDescriptionDeserializer(
  item: any,
): PrivateLinkResourceDescription {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateLinkResourceDescriptionPropertiesDeserializer(item["properties"])),
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

/** A list of private link resources */
export interface PrivateLinkResourceListResultDescription {
  /** Array of private link resources */
  value?: PrivateLinkResourceDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function privateLinkResourceListResultDescriptionDeserializer(
  item: any,
): PrivateLinkResourceListResultDescription {
  return {
    value: !item["value"]
      ? item["value"]
      : privateLinkResourceDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function privateLinkResourceDescriptionArrayDeserializer(
  result: Array<PrivateLinkResourceDescription>,
): any[] {
  return result.map((item) => {
    return privateLinkResourceDescriptionDeserializer(item);
  });
}

/** Workspace resource. */
export interface Workspace extends ProxyResource {
  /** Workspaces resource specific properties. */
  properties?: WorkspaceProperties;
  /** The common properties of tracked resources in the service. */
  tags?: Record<string, string>;
  /** The common properties for any location based resource, tracked or proxy. */
  location?: string;
  /** An etag associated with the resource, used for optimistic concurrency when editing it. */
  etag?: string;
}

export function workspaceSerializer(item: Workspace): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
  };
}

export function workspaceDeserializer(item: any): Workspace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : workspacePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
  };
}

/** Workspaces resource specific properties. */
export interface WorkspaceProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function workspacePropertiesSerializer(item: WorkspaceProperties): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function workspacePropertiesDeserializer(item: any): WorkspaceProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The provisioning state. */
export enum KnownProvisioningState {
  /** Deleting */
  Deleting = "Deleting",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Creating */
  Creating = "Creating",
  /** Accepted */
  Accepted = "Accepted",
  /** Verifying */
  Verifying = "Verifying",
  /** Updating */
  Updating = "Updating",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Deprovisioned */
  Deprovisioned = "Deprovisioned",
  /** Moving */
  Moving = "Moving",
  /** Suspended */
  Suspended = "Suspended",
  /** Warned */
  Warned = "Warned",
  /** SystemMaintenance */
  SystemMaintenance = "SystemMaintenance",
}

/**
 * The provisioning state. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Deleting**: Deleting \
 * **Succeeded**: Succeeded \
 * **Creating**: Creating \
 * **Accepted**: Accepted \
 * **Verifying**: Verifying \
 * **Updating**: Updating \
 * **Failed**: Failed \
 * **Canceled**: Canceled \
 * **Deprovisioned**: Deprovisioned \
 * **Moving**: Moving \
 * **Suspended**: Suspended \
 * **Warned**: Warned \
 * **SystemMaintenance**: SystemMaintenance
 */
export type ProvisioningState = string;

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

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
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

/** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
export enum KnownPublicNetworkAccess {
  /** Enabled */
  Enabled = "Enabled",
  /** Disabled */
  Disabled = "Disabled",
}

/**
 * Control permission for data plane traffic coming from public networks while private endpoint is enabled. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Enabled \
 * **Disabled**: Disabled
 */
export type PublicNetworkAccess = string;

/** Workspace patch properties */
export interface WorkspacePatchResource extends ResourceTags {}

export function workspacePatchResourceSerializer(item: WorkspacePatchResource): any {
  return { tags: item["tags"] };
}

/** List of key value pairs that describe the resource. This will overwrite the existing tags. */
export interface ResourceTags {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function resourceTagsSerializer(item: ResourceTags): any {
  return { tags: item["tags"] };
}

/** Error details. */
export interface ErrorModel {
  /** Error details */
  error?: ErrorDetailsInternal;
}

export function errorDeserializer(item: any): ErrorModel {
  return {
    error: !item["error"] ? item["error"] : errorDetailsInternalDeserializer(item["error"]),
  };
}

/** Collection of workspace object with a next link */
export interface _WorkspaceList {
  /** The Workspace items on this page */
  value: Workspace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _workspaceListDeserializer(item: any): _WorkspaceList {
  return {
    value: workspaceArrayDeserializer(item["value"]),
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

/** The description of Dicom Service */
export interface DicomService extends ProxyResource {
  /** The common properties of tracked resources in the service. */
  tags?: Record<string, string>;
  /** The common properties for any location based resource, tracked or proxy. */
  location?: string;
  /** An etag associated with the resource, used for optimistic concurrency when editing it. */
  etag?: string;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServiceManagedIdentityIdentity;
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Dicom Service authentication configuration. */
  authenticationConfiguration?: DicomServiceAuthenticationConfiguration;
  /** Dicom Service Cors configuration. */
  corsConfiguration?: CorsConfiguration;
  /** The url of the Dicom Services. */
  readonly serviceUrl?: string;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** DICOM Service event support status. */
  readonly eventState?: ServiceEventState;
  /** The encryption settings of the DICOM service */
  encryption?: Encryption;
  /** The configuration of external storage account */
  storageConfiguration?: StorageConfiguration;
  /** If data partitions is enabled or not. */
  enableDataPartitions?: boolean;
}

export function dicomServiceSerializer(item: DicomService): any {
  return {
    properties: areAllPropsUndefined(item, [
      "authenticationConfiguration",
      "corsConfiguration",
      "publicNetworkAccess",
      "encryption",
      "storageConfiguration",
      "enableDataPartitions",
    ])
      ? undefined
      : _dicomServicePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentitySerializer(item["identity"]),
  };
}

export function dicomServiceDeserializer(item: any): DicomService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _dicomServicePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentityDeserializer(item["identity"]),
  };
}

/** Dicom Service properties. */
export interface DicomServiceProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Dicom Service authentication configuration. */
  authenticationConfiguration?: DicomServiceAuthenticationConfiguration;
  /** Dicom Service Cors configuration. */
  corsConfiguration?: CorsConfiguration;
  /** The url of the Dicom Services. */
  readonly serviceUrl?: string;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** DICOM Service event support status. */
  readonly eventState?: ServiceEventState;
  /** The encryption settings of the DICOM service */
  encryption?: Encryption;
  /** The configuration of external storage account */
  storageConfiguration?: StorageConfiguration;
  /** If data partitions is enabled or not. */
  enableDataPartitions?: boolean;
}

export function dicomServicePropertiesSerializer(item: DicomServiceProperties): any {
  return {
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : dicomServiceAuthenticationConfigurationSerializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : corsConfigurationSerializer(item["corsConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    storageConfiguration: !item["storageConfiguration"]
      ? item["storageConfiguration"]
      : storageConfigurationSerializer(item["storageConfiguration"]),
    enableDataPartitions: item["enableDataPartitions"],
  };
}

export function dicomServicePropertiesDeserializer(item: any): DicomServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : dicomServiceAuthenticationConfigurationDeserializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : corsConfigurationDeserializer(item["corsConfiguration"]),
    serviceUrl: item["serviceUrl"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    eventState: item["eventState"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    storageConfiguration: !item["storageConfiguration"]
      ? item["storageConfiguration"]
      : storageConfigurationDeserializer(item["storageConfiguration"]),
    enableDataPartitions: item["enableDataPartitions"],
  };
}

/** Authentication configuration information */
export interface DicomServiceAuthenticationConfiguration {
  /** The authority url for the service */
  readonly authority?: string;
  /** The audiences for the service */
  readonly audiences?: string[];
}

export function dicomServiceAuthenticationConfigurationSerializer(
  _item: DicomServiceAuthenticationConfiguration,
): any {
  return {};
}

export function dicomServiceAuthenticationConfigurationDeserializer(
  item: any,
): DicomServiceAuthenticationConfiguration {
  return {
    authority: item["authority"],
    audiences: !item["audiences"]
      ? item["audiences"]
      : item["audiences"].map((p: any) => {
          return p;
        }),
  };
}

/** The settings for the CORS configuration of the service instance. */
export interface CorsConfiguration {
  /** The origins to be allowed via CORS. */
  origins?: string[];
  /** The headers to be allowed via CORS. */
  headers?: string[];
  /** The methods to be allowed via CORS. */
  methods?: string[];
  /** The max age to be allowed via CORS. */
  maxAge?: number;
  /** If credentials are allowed via CORS. */
  allowCredentials?: boolean;
}

export function corsConfigurationSerializer(item: CorsConfiguration): any {
  return {
    origins: !item["origins"]
      ? item["origins"]
      : item["origins"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

export function corsConfigurationDeserializer(item: any): CorsConfiguration {
  return {
    origins: !item["origins"]
      ? item["origins"]
      : item["origins"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

/** Indicates the current status of event support for the resource. */
export enum KnownServiceEventState {
  /** Disabled */
  Disabled = "Disabled",
  /** Enabled */
  Enabled = "Enabled",
  /** Updating */
  Updating = "Updating",
}

/**
 * Indicates the current status of event support for the resource. \
 * {@link KnownServiceEventState} can be used interchangeably with ServiceEventState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Disabled \
 * **Enabled**: Enabled \
 * **Updating**: Updating
 */
export type ServiceEventState = string;

/** Settings to encrypt a service */
export interface Encryption {
  /** The encryption settings for the customer-managed key */
  customerManagedKeyEncryption?: EncryptionCustomerManagedKeyEncryption;
}

export function encryptionSerializer(item: Encryption): any {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : encryptionCustomerManagedKeyEncryptionSerializer(item["customerManagedKeyEncryption"]),
  };
}

export function encryptionDeserializer(item: any): Encryption {
  return {
    customerManagedKeyEncryption: !item["customerManagedKeyEncryption"]
      ? item["customerManagedKeyEncryption"]
      : encryptionCustomerManagedKeyEncryptionDeserializer(item["customerManagedKeyEncryption"]),
  };
}

/** The encryption settings for the customer-managed key */
export interface EncryptionCustomerManagedKeyEncryption {
  /** The URL of the key to use for encryption */
  keyEncryptionKeyUrl?: string;
}

export function encryptionCustomerManagedKeyEncryptionSerializer(
  item: EncryptionCustomerManagedKeyEncryption,
): any {
  return { keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"] };
}

export function encryptionCustomerManagedKeyEncryptionDeserializer(
  item: any,
): EncryptionCustomerManagedKeyEncryption {
  return {
    keyEncryptionKeyUrl: item["keyEncryptionKeyUrl"],
  };
}

/** The configuration of connected storage */
export interface StorageConfiguration {
  /** The resource id of connected storage account. */
  storageResourceId?: string;
  /** The filesystem name of connected storage account. */
  fileSystemName?: string;
  /** The configuration for indexing the connected storage. */
  storageIndexingConfiguration?: StorageIndexingConfiguration;
}

export function storageConfigurationSerializer(item: StorageConfiguration): any {
  return {
    storageResourceId: item["storageResourceId"],
    fileSystemName: item["fileSystemName"],
    storageIndexingConfiguration: !item["storageIndexingConfiguration"]
      ? item["storageIndexingConfiguration"]
      : storageIndexingConfigurationSerializer(item["storageIndexingConfiguration"]),
  };
}

export function storageConfigurationDeserializer(item: any): StorageConfiguration {
  return {
    storageResourceId: item["storageResourceId"],
    fileSystemName: item["fileSystemName"],
    storageIndexingConfiguration: !item["storageIndexingConfiguration"]
      ? item["storageIndexingConfiguration"]
      : storageIndexingConfigurationDeserializer(item["storageIndexingConfiguration"]),
  };
}

/** The configuration for indexing the connected storage. */
export interface StorageIndexingConfiguration {
  /** The name of the queue that contains storage cloud events. */
  storageEventQueueName?: string;
}

export function storageIndexingConfigurationSerializer(item: StorageIndexingConfiguration): any {
  return { storageEventQueueName: item["storageEventQueueName"] };
}

export function storageIndexingConfigurationDeserializer(item: any): StorageIndexingConfiguration {
  return {
    storageEventQueueName: item["storageEventQueueName"],
  };
}

/** Setting indicating whether the service has a managed identity associated with it. */
export interface ServiceManagedIdentityIdentity {
  /** Type of identity being specified, currently SystemAssigned and None are allowed. */
  type: ServiceManagedIdentityType;
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The set of user assigned identities associated with the resource. The userAssignedIdentities dictionary keys will be ARM resource ids in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}. The dictionary values can be empty objects ({}) in requests. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function serviceManagedIdentityIdentitySerializer(
  item: ServiceManagedIdentityIdentity,
): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function serviceManagedIdentityIdentityDeserializer(
  item: any,
): ServiceManagedIdentityIdentity {
  return {
    type: item["type"],
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** Type of identity being specified, currently SystemAssigned and None are allowed. */
export enum KnownServiceManagedIdentityType {
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
 * Type of identity being specified, currently SystemAssigned and None are allowed. \
 * {@link KnownServiceManagedIdentityType} can be used interchangeably with ServiceManagedIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: None \
 * **SystemAssigned**: SystemAssigned \
 * **UserAssigned**: UserAssigned \
 * **SystemAssigned,UserAssigned**: SystemAssigned,UserAssigned
 */
export type ServiceManagedIdentityType = string;

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

/** The collection of Dicom Services. */
export interface _DicomServiceCollection {
  /** The DicomService items on this page */
  value: DicomService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _dicomServiceCollectionDeserializer(item: any): _DicomServiceCollection {
  return {
    value: dicomServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function dicomServiceArraySerializer(result: Array<DicomService>): any[] {
  return result.map((item) => {
    return dicomServiceSerializer(item);
  });
}

export function dicomServiceArrayDeserializer(result: Array<DicomService>): any[] {
  return result.map((item) => {
    return dicomServiceDeserializer(item);
  });
}

/** Dicom Service patch properties */
export interface DicomServicePatchResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServiceManagedIdentityIdentity;
}

export function dicomServicePatchResourceSerializer(item: DicomServicePatchResource): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentitySerializer(item["identity"]),
  };
}

/** IoT Connector definition. */
export interface IotConnector extends ProxyResource {
  /** The common properties of tracked resources in the service. */
  tags?: Record<string, string>;
  /** The common properties for any location based resource, tracked or proxy. */
  location?: string;
  /** An etag associated with the resource, used for optimistic concurrency when editing it. */
  etag?: string;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServiceManagedIdentityIdentity;
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Source configuration. */
  ingestionEndpointConfiguration?: IotEventHubIngestionEndpointConfiguration;
  /** Device Mappings. */
  deviceMapping?: IotMappingProperties;
}

export function iotConnectorSerializer(item: IotConnector): any {
  return {
    properties: areAllPropsUndefined(item, ["ingestionEndpointConfiguration", "deviceMapping"])
      ? undefined
      : _iotConnectorPropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentitySerializer(item["identity"]),
  };
}

export function iotConnectorDeserializer(item: any): IotConnector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _iotConnectorPropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentityDeserializer(item["identity"]),
  };
}

/** IoT Connector properties. */
export interface IotConnectorProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Source configuration. */
  ingestionEndpointConfiguration?: IotEventHubIngestionEndpointConfiguration;
  /** Device Mappings. */
  deviceMapping?: IotMappingProperties;
}

export function iotConnectorPropertiesSerializer(item: IotConnectorProperties): any {
  return {
    ingestionEndpointConfiguration: !item["ingestionEndpointConfiguration"]
      ? item["ingestionEndpointConfiguration"]
      : iotEventHubIngestionEndpointConfigurationSerializer(item["ingestionEndpointConfiguration"]),
    deviceMapping: !item["deviceMapping"]
      ? item["deviceMapping"]
      : iotMappingPropertiesSerializer(item["deviceMapping"]),
  };
}

export function iotConnectorPropertiesDeserializer(item: any): IotConnectorProperties {
  return {
    provisioningState: item["provisioningState"],
    ingestionEndpointConfiguration: !item["ingestionEndpointConfiguration"]
      ? item["ingestionEndpointConfiguration"]
      : iotEventHubIngestionEndpointConfigurationDeserializer(
          item["ingestionEndpointConfiguration"],
        ),
    deviceMapping: !item["deviceMapping"]
      ? item["deviceMapping"]
      : iotMappingPropertiesDeserializer(item["deviceMapping"]),
  };
}

/** Event Hub ingestion endpoint configuration */
export interface IotEventHubIngestionEndpointConfiguration {
  /** Event Hub name to connect to. */
  eventHubName?: string;
  /** Consumer group of the event hub to connected to. */
  consumerGroup?: string;
  /** Fully qualified namespace of the Event Hub to connect to. */
  fullyQualifiedEventHubNamespace?: string;
}

export function iotEventHubIngestionEndpointConfigurationSerializer(
  item: IotEventHubIngestionEndpointConfiguration,
): any {
  return {
    eventHubName: item["eventHubName"],
    consumerGroup: item["consumerGroup"],
    fullyQualifiedEventHubNamespace: item["fullyQualifiedEventHubNamespace"],
  };
}

export function iotEventHubIngestionEndpointConfigurationDeserializer(
  item: any,
): IotEventHubIngestionEndpointConfiguration {
  return {
    eventHubName: item["eventHubName"],
    consumerGroup: item["consumerGroup"],
    fullyQualifiedEventHubNamespace: item["fullyQualifiedEventHubNamespace"],
  };
}

/** The mapping content. */
export interface IotMappingProperties {
  /** The mapping. */
  content?: any;
}

export function iotMappingPropertiesSerializer(item: IotMappingProperties): any {
  return { content: item["content"] };
}

export function iotMappingPropertiesDeserializer(item: any): IotMappingProperties {
  return {
    content: item["content"],
  };
}

/** A collection of IoT Connectors. */
export interface _IotConnectorCollection {
  /** The IotConnector items on this page */
  value: IotConnector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iotConnectorCollectionDeserializer(item: any): _IotConnectorCollection {
  return {
    value: iotConnectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iotConnectorArraySerializer(result: Array<IotConnector>): any[] {
  return result.map((item) => {
    return iotConnectorSerializer(item);
  });
}

export function iotConnectorArrayDeserializer(result: Array<IotConnector>): any[] {
  return result.map((item) => {
    return iotConnectorDeserializer(item);
  });
}

/** Iot Connector patch properties */
export interface IotConnectorPatchResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServiceManagedIdentityIdentity;
}

export function iotConnectorPatchResourceSerializer(item: IotConnectorPatchResource): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentitySerializer(item["identity"]),
  };
}

/** The description of Fhir Service */
export interface FhirService extends ProxyResource {
  /** The common properties of tracked resources in the service. */
  tags?: Record<string, string>;
  /** The common properties for any location based resource, tracked or proxy. */
  location?: string;
  /** An etag associated with the resource, used for optimistic concurrency when editing it. */
  etag?: string;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServiceManagedIdentityIdentity;
  /** The kind of the service. */
  kind?: FhirServiceKind;
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Fhir Service Azure container registry configuration. */
  acrConfiguration?: FhirServiceAcrConfiguration;
  /** Fhir Service authentication configuration. */
  authenticationConfiguration?: FhirServiceAuthenticationConfiguration;
  /** Fhir Service Cors configuration. */
  corsConfiguration?: FhirServiceCorsConfiguration;
  /** Fhir Service export configuration. */
  exportConfiguration?: FhirServiceExportConfiguration;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Fhir Service event support status. */
  readonly eventState?: ServiceEventState;
  /** Determines tracking of history for resources. */
  resourceVersionPolicyConfiguration?: ResourceVersionPolicyConfiguration;
  /** Fhir Service import configuration. */
  importConfiguration?: FhirServiceImportConfiguration;
  /** Implementation Guides configuration. */
  implementationGuidesConfiguration?: ImplementationGuidesConfiguration;
  /** The encryption settings of the FHIR service */
  encryption?: Encryption;
}

export function fhirServiceSerializer(item: FhirService): any {
  return {
    properties: areAllPropsUndefined(item, [
      "acrConfiguration",
      "authenticationConfiguration",
      "corsConfiguration",
      "exportConfiguration",
      "publicNetworkAccess",
      "resourceVersionPolicyConfiguration",
      "importConfiguration",
      "implementationGuidesConfiguration",
      "encryption",
    ])
      ? undefined
      : _fhirServicePropertiesSerializer(item),
    tags: item["tags"],
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentitySerializer(item["identity"]),
    kind: item["kind"],
  };
}

export function fhirServiceDeserializer(item: any): FhirService {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _fhirServicePropertiesDeserializer(item["properties"])),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** Fhir Service properties. */
export interface FhirServiceProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Fhir Service Azure container registry configuration. */
  acrConfiguration?: FhirServiceAcrConfiguration;
  /** Fhir Service authentication configuration. */
  authenticationConfiguration?: FhirServiceAuthenticationConfiguration;
  /** Fhir Service Cors configuration. */
  corsConfiguration?: FhirServiceCorsConfiguration;
  /** Fhir Service export configuration. */
  exportConfiguration?: FhirServiceExportConfiguration;
  /** The list of private endpoint connections that are set up for this resource. */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Fhir Service event support status. */
  readonly eventState?: ServiceEventState;
  /** Determines tracking of history for resources. */
  resourceVersionPolicyConfiguration?: ResourceVersionPolicyConfiguration;
  /** Fhir Service import configuration. */
  importConfiguration?: FhirServiceImportConfiguration;
  /** Implementation Guides configuration. */
  implementationGuidesConfiguration?: ImplementationGuidesConfiguration;
  /** The encryption settings of the FHIR service */
  encryption?: Encryption;
}

export function fhirServicePropertiesSerializer(item: FhirServiceProperties): any {
  return {
    acrConfiguration: !item["acrConfiguration"]
      ? item["acrConfiguration"]
      : fhirServiceAcrConfigurationSerializer(item["acrConfiguration"]),
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : fhirServiceAuthenticationConfigurationSerializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : fhirServiceCorsConfigurationSerializer(item["corsConfiguration"]),
    exportConfiguration: !item["exportConfiguration"]
      ? item["exportConfiguration"]
      : fhirServiceExportConfigurationSerializer(item["exportConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    resourceVersionPolicyConfiguration: !item["resourceVersionPolicyConfiguration"]
      ? item["resourceVersionPolicyConfiguration"]
      : resourceVersionPolicyConfigurationSerializer(item["resourceVersionPolicyConfiguration"]),
    importConfiguration: !item["importConfiguration"]
      ? item["importConfiguration"]
      : fhirServiceImportConfigurationSerializer(item["importConfiguration"]),
    implementationGuidesConfiguration: !item["implementationGuidesConfiguration"]
      ? item["implementationGuidesConfiguration"]
      : implementationGuidesConfigurationSerializer(item["implementationGuidesConfiguration"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
  };
}

export function fhirServicePropertiesDeserializer(item: any): FhirServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    acrConfiguration: !item["acrConfiguration"]
      ? item["acrConfiguration"]
      : fhirServiceAcrConfigurationDeserializer(item["acrConfiguration"]),
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : fhirServiceAuthenticationConfigurationDeserializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : fhirServiceCorsConfigurationDeserializer(item["corsConfiguration"]),
    exportConfiguration: !item["exportConfiguration"]
      ? item["exportConfiguration"]
      : fhirServiceExportConfigurationDeserializer(item["exportConfiguration"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    eventState: item["eventState"],
    resourceVersionPolicyConfiguration: !item["resourceVersionPolicyConfiguration"]
      ? item["resourceVersionPolicyConfiguration"]
      : resourceVersionPolicyConfigurationDeserializer(item["resourceVersionPolicyConfiguration"]),
    importConfiguration: !item["importConfiguration"]
      ? item["importConfiguration"]
      : fhirServiceImportConfigurationDeserializer(item["importConfiguration"]),
    implementationGuidesConfiguration: !item["implementationGuidesConfiguration"]
      ? item["implementationGuidesConfiguration"]
      : implementationGuidesConfigurationDeserializer(item["implementationGuidesConfiguration"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
  };
}

/** Azure container registry configuration information */
export interface FhirServiceAcrConfiguration {
  /** The list of the Azure container registry login servers. */
  loginServers?: string[];
  /** The list of Open Container Initiative (OCI) artifacts. */
  ociArtifacts?: ServiceOciArtifactEntry[];
}

export function fhirServiceAcrConfigurationSerializer(item: FhirServiceAcrConfiguration): any {
  return {
    loginServers: !item["loginServers"]
      ? item["loginServers"]
      : item["loginServers"].map((p: any) => {
          return p;
        }),
    ociArtifacts: !item["ociArtifacts"]
      ? item["ociArtifacts"]
      : serviceOciArtifactEntryArraySerializer(item["ociArtifacts"]),
  };
}

export function fhirServiceAcrConfigurationDeserializer(item: any): FhirServiceAcrConfiguration {
  return {
    loginServers: !item["loginServers"]
      ? item["loginServers"]
      : item["loginServers"].map((p: any) => {
          return p;
        }),
    ociArtifacts: !item["ociArtifacts"]
      ? item["ociArtifacts"]
      : serviceOciArtifactEntryArrayDeserializer(item["ociArtifacts"]),
  };
}

export function serviceOciArtifactEntryArraySerializer(
  result: Array<ServiceOciArtifactEntry>,
): any[] {
  return result.map((item) => {
    return serviceOciArtifactEntrySerializer(item);
  });
}

export function serviceOciArtifactEntryArrayDeserializer(
  result: Array<ServiceOciArtifactEntry>,
): any[] {
  return result.map((item) => {
    return serviceOciArtifactEntryDeserializer(item);
  });
}

/** An Open Container Initiative (OCI) artifact. */
export interface ServiceOciArtifactEntry {
  /** The Azure Container Registry login server. */
  loginServer?: string;
  /** The artifact name. */
  imageName?: string;
  /** The artifact digest. */
  digest?: string;
}

export function serviceOciArtifactEntrySerializer(item: ServiceOciArtifactEntry): any {
  return { loginServer: item["loginServer"], imageName: item["imageName"], digest: item["digest"] };
}

export function serviceOciArtifactEntryDeserializer(item: any): ServiceOciArtifactEntry {
  return {
    loginServer: item["loginServer"],
    imageName: item["imageName"],
    digest: item["digest"],
  };
}

/** Authentication configuration information */
export interface FhirServiceAuthenticationConfiguration {
  /** The authority url for the service */
  authority?: string;
  /** The audience url for the service */
  audience?: string;
  /** If the SMART on FHIR proxy is enabled */
  smartProxyEnabled?: boolean;
  /** The array of identity provider configurations for SMART on FHIR authentication. */
  smartIdentityProviders?: SmartIdentityProviderConfiguration[];
}

export function fhirServiceAuthenticationConfigurationSerializer(
  item: FhirServiceAuthenticationConfiguration,
): any {
  return {
    authority: item["authority"],
    audience: item["audience"],
    smartProxyEnabled: item["smartProxyEnabled"],
    smartIdentityProviders: !item["smartIdentityProviders"]
      ? item["smartIdentityProviders"]
      : smartIdentityProviderConfigurationArraySerializer(item["smartIdentityProviders"]),
  };
}

export function fhirServiceAuthenticationConfigurationDeserializer(
  item: any,
): FhirServiceAuthenticationConfiguration {
  return {
    authority: item["authority"],
    audience: item["audience"],
    smartProxyEnabled: item["smartProxyEnabled"],
    smartIdentityProviders: !item["smartIdentityProviders"]
      ? item["smartIdentityProviders"]
      : smartIdentityProviderConfigurationArrayDeserializer(item["smartIdentityProviders"]),
  };
}

export function smartIdentityProviderConfigurationArraySerializer(
  result: Array<SmartIdentityProviderConfiguration>,
): any[] {
  return result.map((item) => {
    return smartIdentityProviderConfigurationSerializer(item);
  });
}

export function smartIdentityProviderConfigurationArrayDeserializer(
  result: Array<SmartIdentityProviderConfiguration>,
): any[] {
  return result.map((item) => {
    return smartIdentityProviderConfigurationDeserializer(item);
  });
}

/** An object to configure an identity provider for use with SMART on FHIR authentication. */
export interface SmartIdentityProviderConfiguration {
  /** The identity provider token authority also known as the token issuing authority. */
  authority?: string;
  /** The array of identity provider applications for SMART on FHIR authentication. */
  applications?: SmartIdentityProviderApplication[];
}

export function smartIdentityProviderConfigurationSerializer(
  item: SmartIdentityProviderConfiguration,
): any {
  return {
    authority: item["authority"],
    applications: !item["applications"]
      ? item["applications"]
      : smartIdentityProviderApplicationArraySerializer(item["applications"]),
  };
}

export function smartIdentityProviderConfigurationDeserializer(
  item: any,
): SmartIdentityProviderConfiguration {
  return {
    authority: item["authority"],
    applications: !item["applications"]
      ? item["applications"]
      : smartIdentityProviderApplicationArrayDeserializer(item["applications"]),
  };
}

export function smartIdentityProviderApplicationArraySerializer(
  result: Array<SmartIdentityProviderApplication>,
): any[] {
  return result.map((item) => {
    return smartIdentityProviderApplicationSerializer(item);
  });
}

export function smartIdentityProviderApplicationArrayDeserializer(
  result: Array<SmartIdentityProviderApplication>,
): any[] {
  return result.map((item) => {
    return smartIdentityProviderApplicationDeserializer(item);
  });
}

/** An Application configured in the Identity Provider used to access FHIR resources. */
export interface SmartIdentityProviderApplication {
  /** The application client id defined in the identity provider. This value will be used to validate bearer tokens against the given authority. */
  clientId?: string;
  /** The audience that will be used to validate bearer tokens against the given authority. */
  audience?: string;
  /** The actions that are permitted to be performed on FHIR resources for the application. */
  allowedDataActions?: SmartDataActions[];
}

export function smartIdentityProviderApplicationSerializer(
  item: SmartIdentityProviderApplication,
): any {
  return {
    clientId: item["clientId"],
    audience: item["audience"],
    allowedDataActions: !item["allowedDataActions"]
      ? item["allowedDataActions"]
      : item["allowedDataActions"].map((p: any) => {
          return p;
        }),
  };
}

export function smartIdentityProviderApplicationDeserializer(
  item: any,
): SmartIdentityProviderApplication {
  return {
    clientId: item["clientId"],
    audience: item["audience"],
    allowedDataActions: !item["allowedDataActions"]
      ? item["allowedDataActions"]
      : item["allowedDataActions"].map((p: any) => {
          return p;
        }),
  };
}

/** The Data Actions that can be enabled for a Smart Identity Provider Application. */
export enum KnownSmartDataActions {
  /** Read */
  Read = "Read",
}

/**
 * The Data Actions that can be enabled for a Smart Identity Provider Application. \
 * {@link KnownSmartDataActions} can be used interchangeably with SmartDataActions,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Read**: Read
 */
export type SmartDataActions = string;

/** The settings for the CORS configuration of the service instance. */
export interface FhirServiceCorsConfiguration {
  /** The origins to be allowed via CORS. */
  origins?: string[];
  /** The headers to be allowed via CORS. */
  headers?: string[];
  /** The methods to be allowed via CORS. */
  methods?: string[];
  /** The max age to be allowed via CORS. */
  maxAge?: number;
  /** If credentials are allowed via CORS. */
  allowCredentials?: boolean;
}

export function fhirServiceCorsConfigurationSerializer(item: FhirServiceCorsConfiguration): any {
  return {
    origins: !item["origins"]
      ? item["origins"]
      : item["origins"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

export function fhirServiceCorsConfigurationDeserializer(item: any): FhirServiceCorsConfiguration {
  return {
    origins: !item["origins"]
      ? item["origins"]
      : item["origins"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

/** Export operation configuration information */
export interface FhirServiceExportConfiguration {
  /** The name of the default export storage account. */
  storageAccountName?: string;
}

export function fhirServiceExportConfigurationSerializer(
  item: FhirServiceExportConfiguration,
): any {
  return { storageAccountName: item["storageAccountName"] };
}

export function fhirServiceExportConfigurationDeserializer(
  item: any,
): FhirServiceExportConfiguration {
  return {
    storageAccountName: item["storageAccountName"],
  };
}

/** The settings for history tracking for FHIR resources. */
export interface ResourceVersionPolicyConfiguration {
  /** The default value for tracking history across all resources. */
  default?: FhirResourceVersionPolicy;
  /** A list of FHIR Resources and their version policy overrides. */
  resourceTypeOverrides?: Record<string, FhirResourceVersionPolicy>;
}

export function resourceVersionPolicyConfigurationSerializer(
  item: ResourceVersionPolicyConfiguration,
): any {
  return { default: item["default"], resourceTypeOverrides: item["resourceTypeOverrides"] };
}

export function resourceVersionPolicyConfigurationDeserializer(
  item: any,
): ResourceVersionPolicyConfiguration {
  return {
    default: item["default"],
    resourceTypeOverrides: !item["resourceTypeOverrides"]
      ? item["resourceTypeOverrides"]
      : Object.fromEntries(
          Object.entries(item["resourceTypeOverrides"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** Controls how resources are versioned on the FHIR service */
export enum KnownFhirResourceVersionPolicy {
  /** no-version */
  NoVersion = "no-version",
  /** versioned */
  Versioned = "versioned",
  /** versioned-update */
  VersionedUpdate = "versioned-update",
}

/**
 * Controls how resources are versioned on the FHIR service \
 * {@link KnownFhirResourceVersionPolicy} can be used interchangeably with FhirResourceVersionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **no-version**: no-version \
 * **versioned**: versioned \
 * **versioned-update**: versioned-update
 */
export type FhirResourceVersionPolicy = string;

/** Import operation configuration information */
export interface FhirServiceImportConfiguration {
  /** The name of the default integration storage account. */
  integrationDataStore?: string;
  /** If the FHIR service is in InitialImportMode. */
  initialImportMode?: boolean;
  /** If the import operation is enabled. */
  enabled?: boolean;
}

export function fhirServiceImportConfigurationSerializer(
  item: FhirServiceImportConfiguration,
): any {
  return {
    integrationDataStore: item["integrationDataStore"],
    initialImportMode: item["initialImportMode"],
    enabled: item["enabled"],
  };
}

export function fhirServiceImportConfigurationDeserializer(
  item: any,
): FhirServiceImportConfiguration {
  return {
    integrationDataStore: item["integrationDataStore"],
    initialImportMode: item["initialImportMode"],
    enabled: item["enabled"],
  };
}

/** The settings for Implementation Guides - defining capabilities for national standards, vendor consortiums, clinical societies, etc. */
export interface ImplementationGuidesConfiguration {
  /** If US Core Missing Data requirement is enabled. */
  usCoreMissingData?: boolean;
}

export function implementationGuidesConfigurationSerializer(
  item: ImplementationGuidesConfiguration,
): any {
  return { usCoreMissingData: item["usCoreMissingData"] };
}

export function implementationGuidesConfigurationDeserializer(
  item: any,
): ImplementationGuidesConfiguration {
  return {
    usCoreMissingData: item["usCoreMissingData"],
  };
}

/** The kind of the service. */
export enum KnownFhirServiceKind {
  /** fhir-Stu3 */
  FhirStu3 = "fhir-Stu3",
  /** fhir-R4 */
  FhirR4 = "fhir-R4",
}

/**
 * The kind of the service. \
 * {@link KnownFhirServiceKind} can be used interchangeably with FhirServiceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **fhir-Stu3**: fhir-Stu3 \
 * **fhir-R4**: fhir-R4
 */
export type FhirServiceKind = string;

/** A collection of Fhir services. */
export interface _FhirServiceCollection {
  /** The FhirService items on this page */
  value: FhirService[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _fhirServiceCollectionDeserializer(item: any): _FhirServiceCollection {
  return {
    value: fhirServiceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function fhirServiceArraySerializer(result: Array<FhirService>): any[] {
  return result.map((item) => {
    return fhirServiceSerializer(item);
  });
}

export function fhirServiceArrayDeserializer(result: Array<FhirService>): any[] {
  return result.map((item) => {
    return fhirServiceDeserializer(item);
  });
}

/** FhirService patch properties */
export interface FhirServicePatchResource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServiceManagedIdentityIdentity;
}

export function fhirServicePatchResourceSerializer(item: FhirServicePatchResource): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : serviceManagedIdentityIdentitySerializer(item["identity"]),
  };
}

/** The description of the service. */
export interface ServicesDescription extends TrackedResource {
  /** The common properties of a service. */
  properties?: ServicesProperties;
  /** The kind of the service. */
  kind: Kind;
  /** An etag associated with the resource, used for optimistic concurrency when editing it. */
  etag?: string;
  /** Setting indicating whether the service has a managed identity associated with it. */
  identity?: ServicesResourceIdentity;
}

export function servicesDescriptionSerializer(item: ServicesDescription): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : servicesPropertiesSerializer(item["properties"]),
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : servicesResourceIdentitySerializer(item["identity"]),
  };
}

export function servicesDescriptionDeserializer(item: any): ServicesDescription {
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
      : servicesPropertiesDeserializer(item["properties"]),
    kind: item["kind"],
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : servicesResourceIdentityDeserializer(item["identity"]),
  };
}

/** The properties of a service instance. */
export interface ServicesProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** The access policies of the service instance. */
  accessPolicies?: ServiceAccessPolicyEntry[];
  /** The settings for the Cosmos DB database backing the service. */
  cosmosDbConfiguration?: ServiceCosmosDbConfigurationInfo;
  /** The authentication configuration for the service instance. */
  authenticationConfiguration?: ServiceAuthenticationConfigurationInfo;
  /** The settings for the CORS configuration of the service instance. */
  corsConfiguration?: ServiceCorsConfigurationInfo;
  /** The settings for the export operation of the service instance. */
  exportConfiguration?: ServiceExportConfigurationInfo;
  /** The list of private endpoint connections that are set up for this resource. */
  privateEndpointConnections?: PrivateEndpointConnection[];
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The azure container registry settings used for convert data operation of the service instance. */
  acrConfiguration?: ServiceAcrConfigurationInfo;
  /** The settings for the import operation of the service instance. */
  importConfiguration?: ServiceImportConfigurationInfo;
}

export function servicesPropertiesSerializer(item: ServicesProperties): any {
  return {
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : serviceAccessPolicyEntryArraySerializer(item["accessPolicies"]),
    cosmosDbConfiguration: !item["cosmosDbConfiguration"]
      ? item["cosmosDbConfiguration"]
      : serviceCosmosDbConfigurationInfoSerializer(item["cosmosDbConfiguration"]),
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : serviceAuthenticationConfigurationInfoSerializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : serviceCorsConfigurationInfoSerializer(item["corsConfiguration"]),
    exportConfiguration: !item["exportConfiguration"]
      ? item["exportConfiguration"]
      : serviceExportConfigurationInfoSerializer(item["exportConfiguration"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArraySerializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    acrConfiguration: !item["acrConfiguration"]
      ? item["acrConfiguration"]
      : serviceAcrConfigurationInfoSerializer(item["acrConfiguration"]),
    importConfiguration: !item["importConfiguration"]
      ? item["importConfiguration"]
      : serviceImportConfigurationInfoSerializer(item["importConfiguration"]),
  };
}

export function servicesPropertiesDeserializer(item: any): ServicesProperties {
  return {
    provisioningState: item["provisioningState"],
    accessPolicies: !item["accessPolicies"]
      ? item["accessPolicies"]
      : serviceAccessPolicyEntryArrayDeserializer(item["accessPolicies"]),
    cosmosDbConfiguration: !item["cosmosDbConfiguration"]
      ? item["cosmosDbConfiguration"]
      : serviceCosmosDbConfigurationInfoDeserializer(item["cosmosDbConfiguration"]),
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : serviceAuthenticationConfigurationInfoDeserializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : serviceCorsConfigurationInfoDeserializer(item["corsConfiguration"]),
    exportConfiguration: !item["exportConfiguration"]
      ? item["exportConfiguration"]
      : serviceExportConfigurationInfoDeserializer(item["exportConfiguration"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    acrConfiguration: !item["acrConfiguration"]
      ? item["acrConfiguration"]
      : serviceAcrConfigurationInfoDeserializer(item["acrConfiguration"]),
    importConfiguration: !item["importConfiguration"]
      ? item["importConfiguration"]
      : serviceImportConfigurationInfoDeserializer(item["importConfiguration"]),
  };
}

export function serviceAccessPolicyEntryArraySerializer(
  result: Array<ServiceAccessPolicyEntry>,
): any[] {
  return result.map((item) => {
    return serviceAccessPolicyEntrySerializer(item);
  });
}

export function serviceAccessPolicyEntryArrayDeserializer(
  result: Array<ServiceAccessPolicyEntry>,
): any[] {
  return result.map((item) => {
    return serviceAccessPolicyEntryDeserializer(item);
  });
}

/** An access policy entry. */
export interface ServiceAccessPolicyEntry {
  /** An Azure AD object ID (User or Apps) that is allowed access to the FHIR service. */
  objectId: string;
}

export function serviceAccessPolicyEntrySerializer(item: ServiceAccessPolicyEntry): any {
  return { objectId: item["objectId"] };
}

export function serviceAccessPolicyEntryDeserializer(item: any): ServiceAccessPolicyEntry {
  return {
    objectId: item["objectId"],
  };
}

/** The settings for the Cosmos DB database backing the service. */
export interface ServiceCosmosDbConfigurationInfo {
  /** The provisioned throughput for the backing database. */
  offerThroughput?: number;
  /** The URI of the customer-managed key for the backing database. */
  keyVaultKeyUri?: string;
  /** The multi-tenant application id used to enable CMK access for services in a data sovereign region. */
  crossTenantCmkApplicationId?: string;
}

export function serviceCosmosDbConfigurationInfoSerializer(
  item: ServiceCosmosDbConfigurationInfo,
): any {
  return {
    offerThroughput: item["offerThroughput"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    crossTenantCmkApplicationId: item["crossTenantCmkApplicationId"],
  };
}

export function serviceCosmosDbConfigurationInfoDeserializer(
  item: any,
): ServiceCosmosDbConfigurationInfo {
  return {
    offerThroughput: item["offerThroughput"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    crossTenantCmkApplicationId: item["crossTenantCmkApplicationId"],
  };
}

/** Authentication configuration information */
export interface ServiceAuthenticationConfigurationInfo {
  /** The authority url for the service */
  authority?: string;
  /** The audience url for the service */
  audience?: string;
  /** If the SMART on FHIR proxy is enabled */
  smartProxyEnabled?: boolean;
}

export function serviceAuthenticationConfigurationInfoSerializer(
  item: ServiceAuthenticationConfigurationInfo,
): any {
  return {
    authority: item["authority"],
    audience: item["audience"],
    smartProxyEnabled: item["smartProxyEnabled"],
  };
}

export function serviceAuthenticationConfigurationInfoDeserializer(
  item: any,
): ServiceAuthenticationConfigurationInfo {
  return {
    authority: item["authority"],
    audience: item["audience"],
    smartProxyEnabled: item["smartProxyEnabled"],
  };
}

/** The settings for the CORS configuration of the service instance. */
export interface ServiceCorsConfigurationInfo {
  /** The origins to be allowed via CORS. */
  origins?: string[];
  /** The headers to be allowed via CORS. */
  headers?: string[];
  /** The methods to be allowed via CORS. */
  methods?: string[];
  /** The max age to be allowed via CORS. */
  maxAge?: number;
  /** If credentials are allowed via CORS. */
  allowCredentials?: boolean;
}

export function serviceCorsConfigurationInfoSerializer(item: ServiceCorsConfigurationInfo): any {
  return {
    origins: !item["origins"]
      ? item["origins"]
      : item["origins"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

export function serviceCorsConfigurationInfoDeserializer(item: any): ServiceCorsConfigurationInfo {
  return {
    origins: !item["origins"]
      ? item["origins"]
      : item["origins"].map((p: any) => {
          return p;
        }),
    headers: !item["headers"]
      ? item["headers"]
      : item["headers"].map((p: any) => {
          return p;
        }),
    methods: !item["methods"]
      ? item["methods"]
      : item["methods"].map((p: any) => {
          return p;
        }),
    maxAge: item["maxAge"],
    allowCredentials: item["allowCredentials"],
  };
}

/** Export operation configuration information */
export interface ServiceExportConfigurationInfo {
  /** The name of the default export storage account. */
  storageAccountName?: string;
}

export function serviceExportConfigurationInfoSerializer(
  item: ServiceExportConfigurationInfo,
): any {
  return { storageAccountName: item["storageAccountName"] };
}

export function serviceExportConfigurationInfoDeserializer(
  item: any,
): ServiceExportConfigurationInfo {
  return {
    storageAccountName: item["storageAccountName"],
  };
}

/** Azure container registry configuration information */
export interface ServiceAcrConfigurationInfo {
  /** The list of the ACR login servers. */
  loginServers?: string[];
  /** The list of Open Container Initiative (OCI) artifacts. */
  ociArtifacts?: ServiceOciArtifactEntry[];
}

export function serviceAcrConfigurationInfoSerializer(item: ServiceAcrConfigurationInfo): any {
  return {
    loginServers: !item["loginServers"]
      ? item["loginServers"]
      : item["loginServers"].map((p: any) => {
          return p;
        }),
    ociArtifacts: !item["ociArtifacts"]
      ? item["ociArtifacts"]
      : serviceOciArtifactEntryArraySerializer(item["ociArtifacts"]),
  };
}

export function serviceAcrConfigurationInfoDeserializer(item: any): ServiceAcrConfigurationInfo {
  return {
    loginServers: !item["loginServers"]
      ? item["loginServers"]
      : item["loginServers"].map((p: any) => {
          return p;
        }),
    ociArtifacts: !item["ociArtifacts"]
      ? item["ociArtifacts"]
      : serviceOciArtifactEntryArrayDeserializer(item["ociArtifacts"]),
  };
}

/** Import operation configuration information */
export interface ServiceImportConfigurationInfo {
  /** The name of the default integration storage account. */
  integrationDataStore?: string;
  /** If the FHIR service is in InitialImportMode. */
  initialImportMode?: boolean;
  /** If the import operation is enabled. */
  enabled?: boolean;
}

export function serviceImportConfigurationInfoSerializer(
  item: ServiceImportConfigurationInfo,
): any {
  return {
    integrationDataStore: item["integrationDataStore"],
    initialImportMode: item["initialImportMode"],
    enabled: item["enabled"],
  };
}

export function serviceImportConfigurationInfoDeserializer(
  item: any,
): ServiceImportConfigurationInfo {
  return {
    integrationDataStore: item["integrationDataStore"],
    initialImportMode: item["initialImportMode"],
    enabled: item["enabled"],
  };
}

/** The kind of the service. */
export type Kind = "fhir" | "fhir-Stu3" | "fhir-R4";

/** Setting indicating whether the service has a managed identity associated with it. */
export interface ServicesResourceIdentity {
  /** The principal ID of the resource identity. */
  readonly principalId?: string;
  /** The tenant ID of the resource. */
  readonly tenantId?: string;
  /** Type of identity being specified, currently SystemAssigned and None are allowed. */
  type?: ManagedServiceIdentityType;
}

export function servicesResourceIdentitySerializer(item: ServicesResourceIdentity): any {
  return { type: item["type"] };
}

export function servicesResourceIdentityDeserializer(item: any): ServicesResourceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** Type of identity being specified, currently SystemAssigned and None are allowed. */
export enum KnownManagedServiceIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** None */
  None = "None",
}

/**
 * Type of identity being specified, currently SystemAssigned and None are allowed. \
 * {@link KnownManagedServiceIdentityType} can be used interchangeably with ManagedServiceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: SystemAssigned \
 * **None**: None
 */
export type ManagedServiceIdentityType = string;

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

/** The description of the service. */
export interface ServicesPatchDescription {
  /** Instance tags */
  tags?: Record<string, string>;
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function servicesPatchDescriptionSerializer(item: ServicesPatchDescription): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["publicNetworkAccess"])
      ? undefined
      : _servicesPatchDescriptionPropertiesSerializer(item),
  };
}

/** The properties for updating a service instance. */
export interface ServicesPropertiesUpdateParameters {
  /** Control permission for data plane traffic coming from public networks while private endpoint is enabled. */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function servicesPropertiesUpdateParametersSerializer(
  item: ServicesPropertiesUpdateParameters,
): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

/** The response of a ServicesDescription list operation. */
export interface _ServicesDescriptionListResult {
  /** The ServicesDescription items on this page */
  value: ServicesDescription[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _servicesDescriptionListResultDeserializer(
  item: any,
): _ServicesDescriptionListResult {
  return {
    value: servicesDescriptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function servicesDescriptionArraySerializer(result: Array<ServicesDescription>): any[] {
  return result.map((item) => {
    return servicesDescriptionSerializer(item);
  });
}

export function servicesDescriptionArrayDeserializer(result: Array<ServicesDescription>): any[] {
  return result.map((item) => {
    return servicesDescriptionDeserializer(item);
  });
}

/** Input values. */
export interface CheckNameAvailabilityParameters {
  /** The name of the service instance to check. */
  name: string;
  /** The fully qualified resource type which includes provider namespace. */
  type: string;
}

export function checkNameAvailabilityParametersSerializer(
  item: CheckNameAvailabilityParameters,
): any {
  return { name: item["name"], type: item["type"] };
}

/** The properties indicating whether a given service name is available. */
export interface ServicesNameAvailabilityInfo {
  /** The value which indicates whether the provided name is available. */
  readonly nameAvailable?: boolean;
  /** The reason for unavailability. */
  readonly reason?: ServiceNameUnavailabilityReason;
  /** The detailed reason message. */
  message?: string;
}

export function servicesNameAvailabilityInfoDeserializer(item: any): ServicesNameAvailabilityInfo {
  return {
    nameAvailable: item["nameAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** The reason for unavailability. */
export type ServiceNameUnavailabilityReason = "Invalid" | "AlreadyExists";

/** IoT Connector FHIR destination definition. */
export interface IotFhirDestination extends ProxyResource {
  /** An etag associated with the resource, used for optimistic concurrency when editing it. */
  etag?: string;
  /** The resource location. */
  location?: string;
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
  /** Determines how resource identity is resolved on the destination. */
  resourceIdentityResolutionType: IotIdentityResolutionType;
  /** Fully qualified resource id of the FHIR service to connect to. */
  fhirServiceResourceId: string;
  /** FHIR Mappings */
  fhirMapping: IotMappingProperties;
}

export function iotFhirDestinationSerializer(item: IotFhirDestination): any {
  return {
    properties: _iotFhirDestinationPropertiesSerializer(item),
    etag: item["etag"],
    location: item["location"],
  };
}

export function iotFhirDestinationDeserializer(item: any): IotFhirDestination {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._iotFhirDestinationPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    location: item["location"],
  };
}

/** IoT Connector destination properties for an Azure FHIR service. */
export interface IotFhirDestinationProperties extends IotDestinationProperties {
  /** Determines how resource identity is resolved on the destination. */
  resourceIdentityResolutionType: IotIdentityResolutionType;
  /** Fully qualified resource id of the FHIR service to connect to. */
  fhirServiceResourceId: string;
  /** FHIR Mappings */
  fhirMapping: IotMappingProperties;
}

export function iotFhirDestinationPropertiesSerializer(item: IotFhirDestinationProperties): any {
  return {
    resourceIdentityResolutionType: item["resourceIdentityResolutionType"],
    fhirServiceResourceId: item["fhirServiceResourceId"],
    fhirMapping: iotMappingPropertiesSerializer(item["fhirMapping"]),
  };
}

export function iotFhirDestinationPropertiesDeserializer(item: any): IotFhirDestinationProperties {
  return {
    provisioningState: item["provisioningState"],
    resourceIdentityResolutionType: item["resourceIdentityResolutionType"],
    fhirServiceResourceId: item["fhirServiceResourceId"],
    fhirMapping: iotMappingPropertiesDeserializer(item["fhirMapping"]),
  };
}

/** The type of IoT identity resolution to use with the destination. */
export enum KnownIotIdentityResolutionType {
  /** Create */
  Create = "Create",
  /** Lookup */
  Lookup = "Lookup",
}

/**
 * The type of IoT identity resolution to use with the destination. \
 * {@link KnownIotIdentityResolutionType} can be used interchangeably with IotIdentityResolutionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Create**: Create \
 * **Lookup**: Lookup
 */
export type IotIdentityResolutionType = string;

/** Common IoT Connector destination properties. */
export interface IotDestinationProperties {
  /** The provisioning state. */
  readonly provisioningState?: ProvisioningState;
}

export function iotDestinationPropertiesSerializer(_item: IotDestinationProperties): any {
  return {};
}

export function iotDestinationPropertiesDeserializer(item: any): IotDestinationProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** A collection of IoT Connector FHIR destinations. */
export interface _IotFhirDestinationCollection {
  /** The IotFhirDestination items on this page */
  value: IotFhirDestination[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _iotFhirDestinationCollectionDeserializer(
  item: any,
): _IotFhirDestinationCollection {
  return {
    value: iotFhirDestinationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function iotFhirDestinationArraySerializer(result: Array<IotFhirDestination>): any[] {
  return result.map((item) => {
    return iotFhirDestinationSerializer(item);
  });
}

export function iotFhirDestinationArrayDeserializer(result: Array<IotFhirDestination>): any[] {
  return result.map((item) => {
    return iotFhirDestinationDeserializer(item);
  });
}

/** The properties indicating the operation result of an operation on a service. */
export interface OperationResultsDescription {
  /** The ID of the operation returned. */
  readonly id?: string;
  /** The name of the operation result. */
  readonly name?: string;
  /** The status of the operation being performed. */
  readonly status?: OperationResultStatus;
  /** The time that the operation was started. */
  readonly startTime?: string;
  /** The time that the operation finished. */
  readonly endTime?: string;
  /** Additional properties of the operation result. */
  properties?: any;
}

export function operationResultsDescriptionDeserializer(item: any): OperationResultsDescription {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    startTime: item["startTime"],
    endTime: item["endTime"],
    properties: item["properties"],
  };
}

/** The status of the operation being performed. */
export enum KnownOperationResultStatus {
  /** Canceled */
  Canceled = "Canceled",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Requested */
  Requested = "Requested",
  /** Running */
  Running = "Running",
}

/**
 * The status of the operation being performed. \
 * {@link KnownOperationResultStatus} can be used interchangeably with OperationResultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled**: Canceled \
 * **Succeeded**: Succeeded \
 * **Failed**: Failed \
 * **Requested**: Requested \
 * **Running**: Running
 */
export type OperationResultStatus = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-04-01-preview API version. */
  V20250401Preview = "2025-04-01-preview",
}

export function _privateEndpointConnectionDescriptionPropertiesSerializer(
  item: PrivateEndpointConnectionDescription,
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

export function _privateEndpointConnectionDescriptionPropertiesDeserializer(item: any) {
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

export function _privateLinkResourceDescriptionPropertiesDeserializer(item: any) {
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

export function _dicomServicePropertiesSerializer(item: DicomService): any {
  return {
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : dicomServiceAuthenticationConfigurationSerializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : corsConfigurationSerializer(item["corsConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
    storageConfiguration: !item["storageConfiguration"]
      ? item["storageConfiguration"]
      : storageConfigurationSerializer(item["storageConfiguration"]),
    enableDataPartitions: item["enableDataPartitions"],
  };
}

export function _dicomServicePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : dicomServiceAuthenticationConfigurationDeserializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : corsConfigurationDeserializer(item["corsConfiguration"]),
    serviceUrl: item["serviceUrl"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    eventState: item["eventState"],
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
    storageConfiguration: !item["storageConfiguration"]
      ? item["storageConfiguration"]
      : storageConfigurationDeserializer(item["storageConfiguration"]),
    enableDataPartitions: item["enableDataPartitions"],
  };
}

export function _iotConnectorPropertiesSerializer(item: IotConnector): any {
  return {
    ingestionEndpointConfiguration: !item["ingestionEndpointConfiguration"]
      ? item["ingestionEndpointConfiguration"]
      : iotEventHubIngestionEndpointConfigurationSerializer(item["ingestionEndpointConfiguration"]),
    deviceMapping: !item["deviceMapping"]
      ? item["deviceMapping"]
      : iotMappingPropertiesSerializer(item["deviceMapping"]),
  };
}

export function _iotConnectorPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    ingestionEndpointConfiguration: !item["ingestionEndpointConfiguration"]
      ? item["ingestionEndpointConfiguration"]
      : iotEventHubIngestionEndpointConfigurationDeserializer(
          item["ingestionEndpointConfiguration"],
        ),
    deviceMapping: !item["deviceMapping"]
      ? item["deviceMapping"]
      : iotMappingPropertiesDeserializer(item["deviceMapping"]),
  };
}

export function _fhirServicePropertiesSerializer(item: FhirService): any {
  return {
    acrConfiguration: !item["acrConfiguration"]
      ? item["acrConfiguration"]
      : fhirServiceAcrConfigurationSerializer(item["acrConfiguration"]),
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : fhirServiceAuthenticationConfigurationSerializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : fhirServiceCorsConfigurationSerializer(item["corsConfiguration"]),
    exportConfiguration: !item["exportConfiguration"]
      ? item["exportConfiguration"]
      : fhirServiceExportConfigurationSerializer(item["exportConfiguration"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    resourceVersionPolicyConfiguration: !item["resourceVersionPolicyConfiguration"]
      ? item["resourceVersionPolicyConfiguration"]
      : resourceVersionPolicyConfigurationSerializer(item["resourceVersionPolicyConfiguration"]),
    importConfiguration: !item["importConfiguration"]
      ? item["importConfiguration"]
      : fhirServiceImportConfigurationSerializer(item["importConfiguration"]),
    implementationGuidesConfiguration: !item["implementationGuidesConfiguration"]
      ? item["implementationGuidesConfiguration"]
      : implementationGuidesConfigurationSerializer(item["implementationGuidesConfiguration"]),
    encryption: !item["encryption"] ? item["encryption"] : encryptionSerializer(item["encryption"]),
  };
}

export function _fhirServicePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    acrConfiguration: !item["acrConfiguration"]
      ? item["acrConfiguration"]
      : fhirServiceAcrConfigurationDeserializer(item["acrConfiguration"]),
    authenticationConfiguration: !item["authenticationConfiguration"]
      ? item["authenticationConfiguration"]
      : fhirServiceAuthenticationConfigurationDeserializer(item["authenticationConfiguration"]),
    corsConfiguration: !item["corsConfiguration"]
      ? item["corsConfiguration"]
      : fhirServiceCorsConfigurationDeserializer(item["corsConfiguration"]),
    exportConfiguration: !item["exportConfiguration"]
      ? item["exportConfiguration"]
      : fhirServiceExportConfigurationDeserializer(item["exportConfiguration"]),
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    eventState: item["eventState"],
    resourceVersionPolicyConfiguration: !item["resourceVersionPolicyConfiguration"]
      ? item["resourceVersionPolicyConfiguration"]
      : resourceVersionPolicyConfigurationDeserializer(item["resourceVersionPolicyConfiguration"]),
    importConfiguration: !item["importConfiguration"]
      ? item["importConfiguration"]
      : fhirServiceImportConfigurationDeserializer(item["importConfiguration"]),
    implementationGuidesConfiguration: !item["implementationGuidesConfiguration"]
      ? item["implementationGuidesConfiguration"]
      : implementationGuidesConfigurationDeserializer(item["implementationGuidesConfiguration"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : encryptionDeserializer(item["encryption"]),
  };
}

export function _servicesPatchDescriptionPropertiesSerializer(item: ServicesPatchDescription): any {
  return { publicNetworkAccess: item["publicNetworkAccess"] };
}

export function _iotFhirDestinationPropertiesSerializer(item: IotFhirDestination): any {
  return {
    resourceIdentityResolutionType: item["resourceIdentityResolutionType"],
    fhirServiceResourceId: item["fhirServiceResourceId"],
    fhirMapping: iotMappingPropertiesSerializer(item["fhirMapping"]),
  };
}

export function _iotFhirDestinationPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    resourceIdentityResolutionType: item["resourceIdentityResolutionType"],
    fhirServiceResourceId: item["fhirServiceResourceId"],
    fhirMapping: iotMappingPropertiesDeserializer(item["fhirMapping"]),
  };
}
