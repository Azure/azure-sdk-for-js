// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { OptionalPropertiesUpdateableProperties } from "./typeSpec/models.js";
import { optionalPropertiesUpdateablePropertiesSerializer } from "./typeSpec/models.js";

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

/** A diagnostic detector resource belonging to the scheduler. */
export interface Detector extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DetectorProperties;
}

export function detectorDeserializer(item: any): Detector {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : detectorPropertiesDeserializer(item["properties"]),
  };
}

/** The diagnostic response returned for a detector. */
export interface DetectorProperties {
  /** The provisioning state of the detector. */
  readonly provisioningState?: ProvisioningState;
  /** Metadata that identifies and describes the detector. */
  readonly metadata?: DetectorMetadata;
  /** The datasets produced when the detector runs. */
  readonly dataset?: DetectorDataset[];
  /** The overall result of the detector. */
  readonly status?: DetectorStatus;
}

export function detectorPropertiesDeserializer(item: any): DetectorProperties {
  return {
    provisioningState: item["provisioningState"],
    metadata: !item["metadata"] ? item["metadata"] : detectorMetadataDeserializer(item["metadata"]),
    dataset: !item["dataset"] ? item["dataset"] : detectorDatasetArrayDeserializer(item["dataset"]),
    status: !item["status"] ? item["status"] : detectorStatusDeserializer(item["status"]),
  };
}

/** The status of the current operation */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is updating */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
}

/**
 * The status of the current operation \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is updating \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create request has been accepted
 */
export type ProvisioningState = string;

/** Metadata that identifies and describes a detector. */
export interface DetectorMetadata {
  /** The unique identifier of the detector. */
  readonly id?: string;
  /** The display name of the detector. */
  readonly name?: string;
  /** A description of the detector. */
  readonly description?: string;
  /** The author of the detector when available for the caller. */
  readonly author?: string;
  /** The category of the detector. */
  readonly category?: string;
  /** The case-submission support topic identifiers for which the detector is enabled. */
  readonly supportTopicList?: string[];
  /** The analysis identifiers for which the detector is enabled. */
  readonly analysisTypes?: string[];
  /** The kind of diagnostic response. */
  readonly type?: DetectorType;
  /** The match score when the detector is returned from a search. */
  readonly score?: number;
}

export function detectorMetadataDeserializer(item: any): DetectorMetadata {
  return {
    id: item["id"],
    name: item["name"],
    description: item["description"],
    author: item["author"],
    category: item["category"],
    supportTopicList: !item["supportTopicList"]
      ? item["supportTopicList"]
      : item["supportTopicList"].map((p: any) => {
          return p;
        }),
    analysisTypes: !item["analysisTypes"]
      ? item["analysisTypes"]
      : item["analysisTypes"].map((p: any) => {
          return p;
        }),
    type: item["type"],
    score: item["score"],
  };
}

/** The kind of diagnostic response. */
export enum KnownDetectorType {
  /** A diagnostic detector. */
  Detector = "Detector",
  /** A diagnostic analysis. */
  Analysis = "Analysis",
  /** A diagnostic category overview. */
  CategoryOverview = "CategoryOverview",
}

/**
 * The kind of diagnostic response. \
 * {@link KnownDetectorType} can be used interchangeably with DetectorType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Detector**: A diagnostic detector. \
 * **Analysis**: A diagnostic analysis. \
 * **CategoryOverview**: A diagnostic category overview.
 */
export type DetectorType = string;

export function detectorDatasetArrayDeserializer(result: Array<DetectorDataset>): any[] {
  return result.map((item) => {
    return detectorDatasetDeserializer(item);
  });
}

/** A dataset produced by a detector. */
export interface DetectorDataset {
  /** The tabular data produced by the detector. */
  readonly table?: DetectorTable;
  /** The rendering information for the tabular data. */
  readonly renderingProperties?: DetectorRenderingProperties;
}

export function detectorDatasetDeserializer(item: any): DetectorDataset {
  return {
    table: !item["table"] ? item["table"] : detectorTableDeserializer(item["table"]),
    renderingProperties: !item["renderingProperties"]
      ? item["renderingProperties"]
      : detectorRenderingPropertiesDeserializer(item["renderingProperties"]),
  };
}

/** A table included in a detector dataset. */
export interface DetectorTable {
  /** The name of the table. */
  readonly tableName?: string;
  /** The column definitions for the table. */
  readonly columns?: DetectorTableColumn[];
  /** The rows in the table. Values use the types specified by their columns. */
  readonly rows?: any[][];
}

export function detectorTableDeserializer(item: any): DetectorTable {
  return {
    tableName: item["tableName"],
    columns: !item["columns"]
      ? item["columns"]
      : detectorTableColumnArrayDeserializer(item["columns"]),
    rows: !item["rows"]
      ? item["rows"]
      : item["rows"].map((p: any) => {
          return p.map((p1: any) => {
            return p1;
          });
        }),
  };
}

export function detectorTableColumnArrayDeserializer(result: Array<DetectorTableColumn>): any[] {
  return result.map((item) => {
    return detectorTableColumnDeserializer(item);
  });
}

/** A column definition in a detector table. */
export interface DetectorTableColumn {
  /** The name of the column. */
  readonly columnName?: string;
  /** The data type of values in the column. */
  readonly dataType?: string;
  /** The optional semantic classification of the column. */
  readonly columnType?: string;
}

export function detectorTableColumnDeserializer(item: any): DetectorTableColumn {
  return {
    columnName: item["columnName"],
    dataType: item["dataType"],
    columnType: item["columnType"],
  };
}

/** The rendering information for a detector dataset. */
export interface DetectorRenderingProperties {
  /** The rendering type for the dataset. */
  readonly type?: DetectorRenderingType;
  /** The optional title of the rendering block. */
  readonly title?: string;
  /** The optional description of the rendering block. */
  readonly description?: string;
}

export function detectorRenderingPropertiesDeserializer(item: any): DetectorRenderingProperties {
  return {
    type: item["type"],
    title: item["title"],
    description: item["description"],
  };
}

/** The rendering type for a detector dataset. */
export enum KnownDetectorRenderingType {
  /** A table rendering. */
  Table = 1,
  /** A time series graph rendering. */
  TimeSeriesGraph = 2,
  /** A time series per-instance graph rendering. */
  TimeSeriesPerInstanceGraph = 3,
  /** A pie chart rendering. */
  PieChart = 4,
  /** A data summary rendering. */
  DataSummary = 5,
  /** An email snippet rendering. */
  EmailSnippet = 6,
  /** An insight rendering. */
  Insight = 7,
  /** A dynamic insight rendering. */
  DynamicInsight = 8,
  /** A Markdown rendering. */
  Markdown = 9,
}

/**
 * The rendering type for a detector dataset. \
 * {@link KnownDetectorRenderingType} can be used interchangeably with DetectorRenderingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **1**: A table rendering. \
 * **2**: A time series graph rendering. \
 * **3**: A time series per-instance graph rendering. \
 * **4**: A pie chart rendering. \
 * **5**: A data summary rendering. \
 * **6**: An email snippet rendering. \
 * **7**: An insight rendering. \
 * **8**: A dynamic insight rendering. \
 * **9**: A Markdown rendering.
 */
export type DetectorRenderingType = number;

/** The overall result of a detector. */
export interface DetectorStatus {
  /** The optional message describing the detector result. */
  readonly message?: string;
  /** The status of the detector result. */
  readonly statusId?: DetectorStatusId;
}

export function detectorStatusDeserializer(item: any): DetectorStatus {
  return {
    message: item["message"],
    statusId: item["statusId"],
  };
}

/** The status of a detector result. */
export enum KnownDetectorStatusId {
  /** A critical issue was detected. */
  Critical = 0,
  /** A warning was detected. */
  Warning = 1,
  /** An informational result was returned. */
  Info = 2,
  /** The detector completed without detecting an issue. */
  Success = 3,
  /** The detector did not run or returned no insights. */
  None = 4,
}

/**
 * The status of a detector result. \
 * {@link KnownDetectorStatusId} can be used interchangeably with DetectorStatusId,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **0**: A critical issue was detected. \
 * **1**: A warning was detected. \
 * **2**: An informational result was returned. \
 * **3**: The detector completed without detecting an issue. \
 * **4**: The detector did not run or returned no insights.
 */
export type DetectorStatusId = number;

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

/** The response of a Detector list operation. */
export interface _DetectorListResult {
  /** The Detector items on this page */
  value: Detector[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _detectorListResultDeserializer(item: any): _DetectorListResult {
  return {
    value: detectorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function detectorArrayDeserializer(result: Array<Detector>): any[] {
  return result.map((item) => {
    return detectorDeserializer(item);
  });
}

/** A Durable Task Scheduler resource */
export interface Scheduler extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: SchedulerProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function schedulerSerializer(item: Scheduler): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : schedulerPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function schedulerDeserializer(item: any): Scheduler {
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
      : schedulerPropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Details of the Scheduler */
export interface SchedulerProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** URL of the durable task scheduler */
  readonly endpoint?: string;
  /** IP allow list for durable task scheduler. Values can be IPv4, IPv6 or CIDR */
  ipAllowlist: string[];
  /** SKU of the durable task scheduler */
  sku: SchedulerSku;
  /** Allow or disallow public network access to durable task scheduler */
  publicNetworkAccess?: PublicNetworkAccess;
  /** The private endpoints exposed by this resource */
  readonly privateEndpointConnections?: PrivateEndpointConnection[];
}

export function schedulerPropertiesSerializer(item: SchedulerProperties): any {
  return {
    ipAllowlist: item["ipAllowlist"].map((p: any) => {
      return p;
    }),
    sku: schedulerSkuSerializer(item["sku"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

export function schedulerPropertiesDeserializer(item: any): SchedulerProperties {
  return {
    provisioningState: item["provisioningState"],
    endpoint: item["endpoint"],
    ipAllowlist: item["ipAllowlist"].map((p: any) => {
      return p;
    }),
    sku: schedulerSkuDeserializer(item["sku"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    privateEndpointConnections: !item["privateEndpointConnections"]
      ? item["privateEndpointConnections"]
      : privateEndpointConnectionArrayDeserializer(item["privateEndpointConnections"]),
  };
}

/** The SKU (Stock Keeping Unit) assigned to this durable task scheduler */
export interface SchedulerSku {
  /** The name of the SKU */
  name: SchedulerSkuName;
  /** The SKU capacity. This allows scale out/in for the resource and impacts zone redundancy */
  capacity?: number;
  /** Indicates whether the current SKU configuration is zone redundant */
  readonly redundancyState?: RedundancyState;
}

export function schedulerSkuSerializer(item: SchedulerSku): any {
  return { name: item["name"], capacity: item["capacity"] };
}

export function schedulerSkuDeserializer(item: any): SchedulerSku {
  return {
    name: item["name"],
    capacity: item["capacity"],
    redundancyState: item["redundancyState"],
  };
}

/** The name of the Stock Keeping Unit (SKU) of a Durable Task Scheduler */
export enum KnownSchedulerSkuName {
  /** Dedicated SKU */
  Dedicated = "Dedicated",
  /** Consumption SKU */
  Consumption = "Consumption",
}

/**
 * The name of the Stock Keeping Unit (SKU) of a Durable Task Scheduler \
 * {@link KnownSchedulerSkuName} can be used interchangeably with SchedulerSkuName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Dedicated**: Dedicated SKU \
 * **Consumption**: Consumption SKU
 */
export type SchedulerSkuName = string;

/** The state of the resource redundancy */
export enum KnownRedundancyState {
  /** The resource is not redundant */
  None = "None",
  /** The resource is zone redundant */
  Zone = "Zone",
}

/**
 * The state of the resource redundancy \
 * {@link KnownRedundancyState} can be used interchangeably with RedundancyState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: The resource is not redundant \
 * **Zone**: The resource is zone redundant
 */
export type RedundancyState = string;

/** State of the public network access. */
export enum KnownPublicNetworkAccess {
  /** The public network access is enabled */
  Enabled = "Enabled",
  /** The public network access is disabled */
  Disabled = "Disabled",
}

/**
 * State of the public network access. \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: The public network access is enabled \
 * **Disabled**: The public network access is disabled
 */
export type PublicNetworkAccess = string;

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

/** A private endpoint connection resource */
export interface PrivateEndpointConnection extends Resource {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesSerializer(item["properties"]),
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
    properties: !item["properties"]
      ? item["properties"]
      : privateEndpointConnectionPropertiesDeserializer(item["properties"]),
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

/** The update request model for the Scheduler resource */
export interface SchedulerUpdate {
  /** The resource-specific properties for this resource. */
  properties?: SchedulerPropertiesUpdate;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function schedulerUpdateSerializer(item: SchedulerUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : schedulerPropertiesUpdateSerializer(item["properties"]),
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The Scheduler resource properties to be updated */
export interface SchedulerPropertiesUpdate {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** URL of the durable task scheduler */
  readonly endpoint?: string;
  /** IP allow list for durable task scheduler. Values can be IPv4, IPv6 or CIDR */
  ipAllowlist?: string[];
  /** SKU of the durable task scheduler */
  sku?: SchedulerSkuUpdate;
  /** Allow or disallow public network access to durable task scheduler */
  publicNetworkAccess?: PublicNetworkAccess;
}

export function schedulerPropertiesUpdateSerializer(item: SchedulerPropertiesUpdate): any {
  return {
    ipAllowlist: !item["ipAllowlist"]
      ? item["ipAllowlist"]
      : item["ipAllowlist"].map((p: any) => {
          return p;
        }),
    sku: !item["sku"] ? item["sku"] : schedulerSkuUpdateSerializer(item["sku"]),
    publicNetworkAccess: item["publicNetworkAccess"],
  };
}

/** The SKU (Stock Keeping Unit) properties to be updated */
export interface SchedulerSkuUpdate {
  /** The name of the SKU */
  name?: SchedulerSkuName;
  /** The SKU capacity. This allows scale out/in for the resource and impacts zone redundancy */
  capacity?: number;
  /** Indicates whether the current SKU configuration is zone redundant */
  readonly redundancyState?: RedundancyState;
}

export function schedulerSkuUpdateSerializer(item: SchedulerSkuUpdate): any {
  return { name: item["name"], capacity: item["capacity"] };
}

/** The response of a Scheduler list operation. */
export interface _SchedulerListResult {
  /** The Scheduler items on this page */
  value: Scheduler[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schedulerListResultDeserializer(item: any): _SchedulerListResult {
  return {
    value: schedulerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schedulerArraySerializer(result: Array<Scheduler>): any[] {
  return result.map((item) => {
    return schedulerSerializer(item);
  });
}

export function schedulerArrayDeserializer(result: Array<Scheduler>): any[] {
  return result.map((item) => {
    return schedulerDeserializer(item);
  });
}

/** A private link resource. */
export interface SchedulerPrivateLinkResource extends Resource {
  /** Resource properties. */
  properties?: PrivateLinkResourceProperties;
}

export function schedulerPrivateLinkResourceDeserializer(item: any): SchedulerPrivateLinkResource {
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

/** The response of a SchedulerPrivateLinkResource list operation. */
export interface _SchedulerPrivateLinkResourceListResult {
  /** The SchedulerPrivateLinkResource items on this page */
  value: SchedulerPrivateLinkResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _schedulerPrivateLinkResourceListResultDeserializer(
  item: any,
): _SchedulerPrivateLinkResourceListResult {
  return {
    value: schedulerPrivateLinkResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function schedulerPrivateLinkResourceArrayDeserializer(
  result: Array<SchedulerPrivateLinkResource>,
): any[] {
  return result.map((item) => {
    return schedulerPrivateLinkResourceDeserializer(item);
  });
}

/** PATCH model for private endpoint connections */
export interface PrivateEndpointConnectionUpdate {
  /** The private endpoint connection properties */
  properties?: OptionalPropertiesUpdateableProperties;
}

export function privateEndpointConnectionUpdateSerializer(
  item: PrivateEndpointConnectionUpdate,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : optionalPropertiesUpdateablePropertiesSerializer(item["properties"]),
  };
}

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

/** A Task Hub resource belonging to the scheduler */
export interface TaskHub extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TaskHubProperties;
}

export function taskHubSerializer(item: TaskHub): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : taskHubPropertiesSerializer(item["properties"]),
  };
}

export function taskHubDeserializer(item: any): TaskHub {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : taskHubPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of Task Hub */
export interface TaskHubProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** URL of the durable task scheduler dashboard */
  readonly dashboardUrl?: string;
  /** A set of Task Hub capabilities that can be enabled or disabled for a Task Hub */
  capabilities?: string[];
}

export function taskHubPropertiesSerializer(item: TaskHubProperties): any {
  return {
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : item["capabilities"].map((p: any) => {
          return p;
        }),
  };
}

export function taskHubPropertiesDeserializer(item: any): TaskHubProperties {
  return {
    provisioningState: item["provisioningState"],
    dashboardUrl: item["dashboardUrl"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : item["capabilities"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a TaskHub list operation. */
export interface _TaskHubListResult {
  /** The TaskHub items on this page */
  value: TaskHub[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _taskHubListResultDeserializer(item: any): _TaskHubListResult {
  return {
    value: taskHubArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function taskHubArraySerializer(result: Array<TaskHub>): any[] {
  return result.map((item) => {
    return taskHubSerializer(item);
  });
}

export function taskHubArrayDeserializer(result: Array<TaskHub>): any[] {
  return result.map((item) => {
    return taskHubDeserializer(item);
  });
}

/** A Task Queue resource belonging to a Task Hub */
export interface TaskQueue extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TaskQueueProperties;
}

export function taskQueueSerializer(item: TaskQueue): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : taskQueuePropertiesSerializer(item["properties"]),
  };
}

export function taskQueueDeserializer(item: any): TaskQueue {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : taskQueuePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of a Task Queue */
export interface TaskQueueProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** The throughput configuration of the Task Queue */
  throughput?: TaskQueueThroughput;
}

export function taskQueuePropertiesSerializer(item: TaskQueueProperties): any {
  return {
    throughput: !item["throughput"]
      ? item["throughput"]
      : taskQueueThroughputSerializer(item["throughput"]),
  };
}

export function taskQueuePropertiesDeserializer(item: any): TaskQueueProperties {
  return {
    provisioningState: item["provisioningState"],
    throughput: !item["throughput"]
      ? item["throughput"]
      : taskQueueThroughputDeserializer(item["throughput"]),
  };
}

/** The throughput configuration of a Task Queue */
export interface TaskQueueThroughput {
  /** The rate of work-item handouts per second */
  actionsPerSecond?: number;
}

export function taskQueueThroughputSerializer(item: TaskQueueThroughput): any {
  return { actionsPerSecond: item["actionsPerSecond"] };
}

export function taskQueueThroughputDeserializer(item: any): TaskQueueThroughput {
  return {
    actionsPerSecond: item["actionsPerSecond"],
  };
}

/** The update request model for a Task Queue */
export interface TaskQueueUpdate {
  /** The resource-specific properties for this resource. */
  properties?: TaskQueueProperties;
}

export function taskQueueUpdateSerializer(item: TaskQueueUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : taskQueuePropertiesSerializer(item["properties"]),
  };
}

/** The response of a TaskQueue list operation. */
export interface _TaskQueueListResult {
  /** The TaskQueue items on this page */
  value: TaskQueue[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _taskQueueListResultDeserializer(item: any): _TaskQueueListResult {
  return {
    value: taskQueueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function taskQueueArraySerializer(result: Array<TaskQueue>): any[] {
  return result.map((item) => {
    return taskQueueSerializer(item);
  });
}

export function taskQueueArrayDeserializer(result: Array<TaskQueue>): any[] {
  return result.map((item) => {
    return taskQueueDeserializer(item);
  });
}

/** A retention policy resource belonging to the scheduler */
export interface RetentionPolicy extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: RetentionPolicyProperties;
}

export function retentionPolicySerializer(item: RetentionPolicy): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : retentionPolicyPropertiesSerializer(item["properties"]),
  };
}

export function retentionPolicyDeserializer(item: any): RetentionPolicy {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : retentionPolicyPropertiesDeserializer(item["properties"]),
  };
}

/** The retention policy settings for the resource */
export interface RetentionPolicyProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** The orchestration retention policies */
  retentionPolicies?: RetentionPolicyDetails[];
}

export function retentionPolicyPropertiesSerializer(item: RetentionPolicyProperties): any {
  return {
    retentionPolicies: !item["retentionPolicies"]
      ? item["retentionPolicies"]
      : retentionPolicyDetailsArraySerializer(item["retentionPolicies"]),
  };
}

export function retentionPolicyPropertiesDeserializer(item: any): RetentionPolicyProperties {
  return {
    provisioningState: item["provisioningState"],
    retentionPolicies: !item["retentionPolicies"]
      ? item["retentionPolicies"]
      : retentionPolicyDetailsArrayDeserializer(item["retentionPolicies"]),
  };
}

export function retentionPolicyDetailsArraySerializer(
  result: Array<RetentionPolicyDetails>,
): any[] {
  return result.map((item) => {
    return retentionPolicyDetailsSerializer(item);
  });
}

export function retentionPolicyDetailsArrayDeserializer(
  result: Array<RetentionPolicyDetails>,
): any[] {
  return result.map((item) => {
    return retentionPolicyDetailsDeserializer(item);
  });
}

/** The properties of a retention policy */
export interface RetentionPolicyDetails {
  /** The retention period in days after which the orchestration will be purged automatically */
  retentionPeriodInDays: number;
  /** The orchestration state to which this policy applies. If omitted, the policy applies to all purgeable orchestration states. */
  orchestrationState?: PurgeableOrchestrationState;
}

export function retentionPolicyDetailsSerializer(item: RetentionPolicyDetails): any {
  return {
    retentionPeriodInDays: item["retentionPeriodInDays"],
    orchestrationState: item["orchestrationState"],
  };
}

export function retentionPolicyDetailsDeserializer(item: any): RetentionPolicyDetails {
  return {
    retentionPeriodInDays: item["retentionPeriodInDays"],
    orchestrationState: item["orchestrationState"],
  };
}

/** Purgeable orchestration state to be used in retention policies */
export enum KnownPurgeableOrchestrationState {
  /** The orchestration is completed */
  Completed = "Completed",
  /** The orchestration is failed */
  Failed = "Failed",
  /** The orchestration is terminated */
  Terminated = "Terminated",
  /** The orchestration is canceled */
  Canceled = "Canceled",
}

/**
 * Purgeable orchestration state to be used in retention policies \
 * {@link KnownPurgeableOrchestrationState} can be used interchangeably with PurgeableOrchestrationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Completed**: The orchestration is completed \
 * **Failed**: The orchestration is failed \
 * **Terminated**: The orchestration is terminated \
 * **Canceled**: The orchestration is canceled
 */
export type PurgeableOrchestrationState = string;

/** The response of a RetentionPolicy list operation. */
export interface _RetentionPolicyListResult {
  /** The RetentionPolicy items on this page */
  value: RetentionPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _retentionPolicyListResultDeserializer(item: any): _RetentionPolicyListResult {
  return {
    value: retentionPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function retentionPolicyArraySerializer(result: Array<RetentionPolicy>): any[] {
  return result.map((item) => {
    return retentionPolicySerializer(item);
  });
}

export function retentionPolicyArrayDeserializer(result: Array<RetentionPolicy>): any[] {
  return result.map((item) => {
    return retentionPolicyDeserializer(item);
  });
}

/** A transparent data encryption resource belonging to the scheduler */
export interface TransparentDataEncryption extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: TransparentDataEncryptionProperties;
}

export function transparentDataEncryptionSerializer(item: TransparentDataEncryption): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : transparentDataEncryptionPropertiesSerializer(item["properties"]),
  };
}

export function transparentDataEncryptionDeserializer(item: any): TransparentDataEncryption {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : transparentDataEncryptionPropertiesDeserializer(item["properties"]),
  };
}

/** The transparent data encryption settings for the resource */
export interface TransparentDataEncryptionProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** The key source for the transparent data encryption */
  keySource: TransparentDataEncryptionKeySource;
  /** The URI of the key in Key Vault to be used for transparent data encryption */
  keyVaultKeyUri?: string;
  /** Indicates whether auto-rotation of the customer-managed keys is enabled for transparent data encryption */
  autoRotationEnabled?: boolean;
}

export function transparentDataEncryptionPropertiesSerializer(
  item: TransparentDataEncryptionProperties,
): any {
  return {
    keySource: item["keySource"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

export function transparentDataEncryptionPropertiesDeserializer(
  item: any,
): TransparentDataEncryptionProperties {
  return {
    provisioningState: item["provisioningState"],
    keySource: item["keySource"],
    keyVaultKeyUri: item["keyVaultKeyUri"],
    autoRotationEnabled: item["autoRotationEnabled"],
  };
}

/** The key source for the transparent data encryption */
export enum KnownTransparentDataEncryptionKeySource {
  /** The key source is Microsoft-managed */
  MicrosoftManaged = "MicrosoftManaged",
  /** The key source is customer-managed */
  CustomerManaged = "CustomerManaged",
}

/**
 * The key source for the transparent data encryption \
 * {@link KnownTransparentDataEncryptionKeySource} can be used interchangeably with TransparentDataEncryptionKeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MicrosoftManaged**: The key source is Microsoft-managed \
 * **CustomerManaged**: The key source is customer-managed
 */
export type TransparentDataEncryptionKeySource = string;

/** The response of a TransparentDataEncryption list operation. */
export interface _TransparentDataEncryptionListResult {
  /** The TransparentDataEncryption items on this page */
  value: TransparentDataEncryption[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _transparentDataEncryptionListResultDeserializer(
  item: any,
): _TransparentDataEncryptionListResult {
  return {
    value: transparentDataEncryptionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function transparentDataEncryptionArraySerializer(
  result: Array<TransparentDataEncryption>,
): any[] {
  return result.map((item) => {
    return transparentDataEncryptionSerializer(item);
  });
}

export function transparentDataEncryptionArrayDeserializer(
  result: Array<TransparentDataEncryption>,
): any[] {
  return result.map((item) => {
    return transparentDataEncryptionDeserializer(item);
  });
}

/** A failover instance belonging to the scheduler */
export interface FailoverInstance extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: FailoverInstanceProperties;
}

export function failoverInstanceSerializer(item: FailoverInstance): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : failoverInstancePropertiesSerializer(item["properties"]),
  };
}

export function failoverInstanceDeserializer(item: any): FailoverInstance {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : failoverInstancePropertiesDeserializer(item["properties"]),
  };
}

/** The failover instance settings for the resource */
export interface FailoverInstanceProperties {
  /** The status of the last operation */
  readonly provisioningState?: ProvisioningState;
  /** The replication role of the parent scheduler */
  readonly replicationRole?: ReplicationRole;
  /** The current state of the failover operation */
  readonly failoverState?: FailoverState;
  /** The resource ID of the partner scheduler in the failover configuration */
  partnerSchedulerResourceId: string;
  /** The location of the partner scheduler in the failover configuration */
  readonly partnerSchedulerLocation?: string;
}

export function failoverInstancePropertiesSerializer(item: FailoverInstanceProperties): any {
  return { partnerSchedulerResourceId: item["partnerSchedulerResourceId"] };
}

export function failoverInstancePropertiesDeserializer(item: any): FailoverInstanceProperties {
  return {
    provisioningState: item["provisioningState"],
    replicationRole: item["replicationRole"],
    failoverState: item["failoverState"],
    partnerSchedulerResourceId: item["partnerSchedulerResourceId"],
    partnerSchedulerLocation: item["partnerSchedulerLocation"],
  };
}

/** The replication role of the scheduler */
export enum KnownReplicationRole {
  /** The parent scheduler is the primary in the failover configuration */
  Primary = "Primary",
  /** The parent scheduler is the secondary in the failover configuration */
  Secondary = "Secondary",
}

/**
 * The replication role of the scheduler \
 * {@link KnownReplicationRole} can be used interchangeably with ReplicationRole,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Primary**: The parent scheduler is the primary in the failover configuration \
 * **Secondary**: The parent scheduler is the secondary in the failover configuration
 */
export type ReplicationRole = string;

/** The current state of the failover operation */
export enum KnownFailoverState {
  /** No failover operation is active */
  None = "None",
  /** The failover operation is in progress */
  InProgress = "InProgress",
  /** The failover operation completed successfully */
  Succeeded = "Succeeded",
  /** The failover operation failed */
  Failed = "Failed",
}

/**
 * The current state of the failover operation \
 * {@link KnownFailoverState} can be used interchangeably with FailoverState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No failover operation is active \
 * **InProgress**: The failover operation is in progress \
 * **Succeeded**: The failover operation completed successfully \
 * **Failed**: The failover operation failed
 */
export type FailoverState = string;

/** The response of a FailoverInstance list operation. */
export interface _FailoverInstanceListResult {
  /** The FailoverInstance items on this page */
  value: FailoverInstance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _failoverInstanceListResultDeserializer(item: any): _FailoverInstanceListResult {
  return {
    value: failoverInstanceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function failoverInstanceArraySerializer(result: Array<FailoverInstance>): any[] {
  return result.map((item) => {
    return failoverInstanceSerializer(item);
  });
}

export function failoverInstanceArrayDeserializer(result: Array<FailoverInstance>): any[] {
  return result.map((item) => {
    return failoverInstanceDeserializer(item);
  });
}

/** API Versions */
export enum KnownVersions {
  /** 2024-10-01-preview */
  V20241001Preview = "2024-10-01-preview",
  /** 2025-04-01-preview */
  V20250401Preview = "2025-04-01-preview",
  /** 2025-11-01 */
  V20251101 = "2025-11-01",
  /** 2026-02-01 */
  V20260201 = "2026-02-01",
  /** 2026-05-01-preview */
  V20260501Preview = "2026-05-01-preview",
  /** 2026-07-01-preview */
  V20260701Preview = "2026-07-01-preview",
}
