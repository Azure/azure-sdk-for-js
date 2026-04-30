// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface EdgeAction extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: EdgeActionProperties;
  /** The sku type of the edge action */
  sku: SkuType;
}

export function edgeActionSerializer(item: EdgeAction): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : edgeActionPropertiesSerializer(item["properties"]),
    sku: skuTypeSerializer(item["sku"]),
  };
}

export function edgeActionDeserializer(item: any): EdgeAction {
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
      : edgeActionPropertiesDeserializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuTypeDeserializer(item["sku"]),
  };
}

/** Represents an edge action properties */
export interface EdgeActionProperties {
  /** The provisioning state of the edge action */
  readonly provisioningState?: ProvisioningState;
  /** A list of attachments for the edge action */
  readonly attachments: EdgeActionAttachment[];
}

export function edgeActionPropertiesSerializer(item: EdgeActionProperties): any {
  return item;
}

export function edgeActionPropertiesDeserializer(item: any): EdgeActionProperties {
  return {
    provisioningState: item["provisioningState"],
    attachments: !item["attachments"]
      ? item["attachments"]
      : edgeActionAttachmentArrayDeserializer(item["attachments"]),
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
  /** Initial provisioning in progress */
  Provisioning = "Provisioning",
  /** Upgrade in progress */
  Upgrading = "Upgrading",
}

/**
 * The status of the current operation \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: Initial provisioning in progress \
 * **Upgrading**: Upgrade in progress
 */
export type ProvisioningState = string;

export function edgeActionAttachmentArrayDeserializer(result: Array<EdgeActionAttachment>): any[] {
  return result.map((item) => {
    return edgeActionAttachmentDeserializer(item);
  });
}

/** Edge action attachment information */
export interface EdgeActionAttachment {
  /** The edge action attachment id */
  readonly id?: string;
  /** The attached resource Id */
  attachedResourceId: string;
}

export function edgeActionAttachmentDeserializer(item: any): EdgeActionAttachment {
  return {
    id: item["id"],
    attachedResourceId: item["attachedResourceId"],
  };
}

/** The SKU type for the edge action */
export interface SkuType {
  /** The name of the SKU */
  name: string;
  /** The tier of the SKU */
  tier: string;
}

export function skuTypeSerializer(item: SkuType): any {
  return { name: item["name"], tier: item["tier"] };
}

export function skuTypeDeserializer(item: any): SkuType {
  return {
    name: item["name"],
    tier: item["tier"],
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

/** The type used for update operations of the EdgeAction. */
export interface EdgeActionUpdate {
  /** The resource-specific properties for this resource. */
  properties?: EdgeActionPropertiesUpdate;
  /** The sku type of the edge action */
  sku?: SkuTypeUpdate;
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function edgeActionUpdateSerializer(item: EdgeActionUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : edgeActionPropertiesUpdateSerializer(item["properties"]),
    sku: !item["sku"] ? item["sku"] : skuTypeUpdateSerializer(item["sku"]),
    tags: item["tags"],
  };
}

/** Represents an edge action properties */
export interface EdgeActionPropertiesUpdate {}

export function edgeActionPropertiesUpdateSerializer(item: EdgeActionPropertiesUpdate): any {
  return item;
}

/** The SKU type for update operations */
export interface SkuTypeUpdate {
  /** The name of the SKU */
  name?: string;
  /** The tier of the SKU */
  tier?: string;
}

export function skuTypeUpdateSerializer(item: SkuTypeUpdate): any {
  return { name: item["name"], tier: item["tier"] };
}

/** The response of a EdgeAction list operation. */
export interface _EdgeActionListResult {
  /** The EdgeAction items on this page */
  value: EdgeAction[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeActionListResultDeserializer(item: any): _EdgeActionListResult {
  return {
    value: edgeActionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeActionArraySerializer(result: Array<EdgeAction>): any[] {
  return result.map((item) => {
    return edgeActionSerializer(item);
  });
}

export function edgeActionArrayDeserializer(result: Array<EdgeAction>): any[] {
  return result.map((item) => {
    return edgeActionDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface EdgeActionVersion extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: EdgeActionVersionProperties;
}

export function edgeActionVersionSerializer(item: EdgeActionVersion): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : edgeActionVersionPropertiesSerializer(item["properties"]),
  };
}

export function edgeActionVersionDeserializer(item: any): EdgeActionVersion {
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
      : edgeActionVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Represents an edge action version */
export interface EdgeActionVersionProperties {
  /** The deployment type */
  deploymentType: EdgeActionVersionDeploymentType;
  /** The validation status */
  readonly validationStatus?: EdgeActionVersionValidationStatus;
  /** The provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** The active state */
  isDefaultVersion: EdgeActionIsDefaultVersion;
  /** The last update time in UTC for package update */
  readonly lastPackageUpdateTime?: Date;
}

export function edgeActionVersionPropertiesSerializer(item: EdgeActionVersionProperties): any {
  return { deploymentType: item["deploymentType"], isDefaultVersion: item["isDefaultVersion"] };
}

export function edgeActionVersionPropertiesDeserializer(item: any): EdgeActionVersionProperties {
  return {
    deploymentType: item["deploymentType"],
    validationStatus: item["validationStatus"],
    provisioningState: item["provisioningState"],
    isDefaultVersion: item["isDefaultVersion"],
    lastPackageUpdateTime: !item["lastPackageUpdateTime"]
      ? item["lastPackageUpdateTime"]
      : new Date(item["lastPackageUpdateTime"]),
  };
}

/** The deployment type for edge action versions */
export enum KnownEdgeActionVersionDeploymentType {
  /** ZIP file deployment */
  Zip = "zip",
  /** Single file deployment */
  File = "file",
  /** Other deployment types */
  Others = "others",
}

/**
 * The deployment type for edge action versions \
 * {@link KnownEdgeActionVersionDeploymentType} can be used interchangeably with EdgeActionVersionDeploymentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **zip**: ZIP file deployment \
 * **file**: Single file deployment \
 * **others**: Other deployment types
 */
export type EdgeActionVersionDeploymentType = string;

/** The validation status for edge action versions */
export enum KnownEdgeActionVersionValidationStatus {
  /** Validation succeeded */
  Succeeded = "Succeeded",
  /** Validation failed */
  Failed = "Failed",
}

/**
 * The validation status for edge action versions \
 * {@link KnownEdgeActionVersionValidationStatus} can be used interchangeably with EdgeActionVersionValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Validation succeeded \
 * **Failed**: Validation failed
 */
export type EdgeActionVersionValidationStatus = string;

/** Indicates whether this is the default version */
export enum KnownEdgeActionIsDefaultVersion {
  /** This is the default version */
  True = "True",
  /** This is not the default version */
  False = "False",
}

/**
 * Indicates whether this is the default version \
 * {@link KnownEdgeActionIsDefaultVersion} can be used interchangeably with EdgeActionIsDefaultVersion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **True**: This is the default version \
 * **False**: This is not the default version
 */
export type EdgeActionIsDefaultVersion = string;

/** The type used for update operations of the EdgeActionVersion. */
export interface EdgeActionVersionUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: EdgeActionVersionUpdateProperties;
}

export function edgeActionVersionUpdateSerializer(item: EdgeActionVersionUpdate): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : edgeActionVersionUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the EdgeActionVersion. */
export interface EdgeActionVersionUpdateProperties {
  /** The deployment type */
  deploymentType?: EdgeActionVersionDeploymentType;
  /** The active state */
  isDefaultVersion?: EdgeActionIsDefaultVersion;
}

export function edgeActionVersionUpdatePropertiesSerializer(
  item: EdgeActionVersionUpdateProperties,
): any {
  return { deploymentType: item["deploymentType"], isDefaultVersion: item["isDefaultVersion"] };
}

/** The response of a EdgeActionVersion list operation. */
export interface _EdgeActionVersionListResult {
  /** The EdgeActionVersion items on this page */
  value: EdgeActionVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeActionVersionListResultDeserializer(item: any): _EdgeActionVersionListResult {
  return {
    value: edgeActionVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeActionVersionArraySerializer(result: Array<EdgeActionVersion>): any[] {
  return result.map((item) => {
    return edgeActionVersionSerializer(item);
  });
}

export function edgeActionVersionArrayDeserializer(result: Array<EdgeActionVersion>): any[] {
  return result.map((item) => {
    return edgeActionVersionDeserializer(item);
  });
}

/** Version code information for edge action */
export interface VersionCode {
  /** The version code deployment content */
  content: string;
  /** The version code name */
  name: string;
}

export function versionCodeSerializer(item: VersionCode): any {
  return { content: item["content"], name: item["name"] };
}

export function versionCodeDeserializer(item: any): VersionCode {
  return {
    content: item["content"],
    name: item["name"],
  };
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface EdgeActionExecutionFilter extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: EdgeActionExecutionFilterProperties;
}

export function edgeActionExecutionFilterSerializer(item: EdgeActionExecutionFilter): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : edgeActionExecutionFilterPropertiesSerializer(item["properties"]),
  };
}

export function edgeActionExecutionFilterDeserializer(item: any): EdgeActionExecutionFilter {
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
      : edgeActionExecutionFilterPropertiesDeserializer(item["properties"]),
  };
}

/** Properties for edge action execution filter */
export interface EdgeActionExecutionFilterProperties {
  /** The referenced versionId of the edgeaction version */
  versionId: string;
  /** The last update time in UTC for the execution filter */
  readonly lastUpdateTime?: Date;
  /** Custom Header Key associated with the execution filter */
  executionFilterIdentifierHeaderName: string;
  /** Custom Header Value associated with the execution filter */
  executionFilterIdentifierHeaderValue: string;
  /** The provisioning state */
  readonly provisioningState?: ProvisioningState;
}

export function edgeActionExecutionFilterPropertiesSerializer(
  item: EdgeActionExecutionFilterProperties,
): any {
  return {
    versionId: item["versionId"],
    executionFilterIdentifierHeaderName: item["executionFilterIdentifierHeaderName"],
    executionFilterIdentifierHeaderValue: item["executionFilterIdentifierHeaderValue"],
  };
}

export function edgeActionExecutionFilterPropertiesDeserializer(
  item: any,
): EdgeActionExecutionFilterProperties {
  return {
    versionId: item["versionId"],
    lastUpdateTime: !item["lastUpdateTime"]
      ? item["lastUpdateTime"]
      : new Date(item["lastUpdateTime"]),
    executionFilterIdentifierHeaderName: item["executionFilterIdentifierHeaderName"],
    executionFilterIdentifierHeaderValue: item["executionFilterIdentifierHeaderValue"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the EdgeActionExecutionFilter. */
export interface EdgeActionExecutionFilterUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The resource-specific properties for this resource. */
  properties?: EdgeActionExecutionFilterUpdateProperties;
}

export function edgeActionExecutionFilterUpdateSerializer(
  item: EdgeActionExecutionFilterUpdate,
): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : edgeActionExecutionFilterUpdatePropertiesSerializer(item["properties"]),
  };
}

/** The updatable properties of the EdgeActionExecutionFilter. */
export interface EdgeActionExecutionFilterUpdateProperties {
  /** The referenced versionId of the edgeaction version */
  versionId?: string;
  /** Custom Header Key associated with the execution filter */
  executionFilterIdentifierHeaderName?: string;
  /** Custom Header Value associated with the execution filter */
  executionFilterIdentifierHeaderValue?: string;
}

export function edgeActionExecutionFilterUpdatePropertiesSerializer(
  item: EdgeActionExecutionFilterUpdateProperties,
): any {
  return {
    versionId: item["versionId"],
    executionFilterIdentifierHeaderName: item["executionFilterIdentifierHeaderName"],
    executionFilterIdentifierHeaderValue: item["executionFilterIdentifierHeaderValue"],
  };
}

/** The response of a EdgeActionExecutionFilter list operation. */
export interface _EdgeActionExecutionFilterListResult {
  /** The EdgeActionExecutionFilter items on this page */
  value: EdgeActionExecutionFilter[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeActionExecutionFilterListResultDeserializer(
  item: any,
): _EdgeActionExecutionFilterListResult {
  return {
    value: edgeActionExecutionFilterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeActionExecutionFilterArraySerializer(
  result: Array<EdgeActionExecutionFilter>,
): any[] {
  return result.map((item) => {
    return edgeActionExecutionFilterSerializer(item);
  });
}

export function edgeActionExecutionFilterArrayDeserializer(
  result: Array<EdgeActionExecutionFilter>,
): any[] {
  return result.map((item) => {
    return edgeActionExecutionFilterDeserializer(item);
  });
}

/** Known values of {@link Versions} that the service accepts. */
export enum KnownVersions {
  /** 2025-09-01-preview */
  _20250901Preview = "2025-09-01-preview",
  /** 2025-12-01-preview */
  _20251201Preview = "2025-12-01-preview",
}
