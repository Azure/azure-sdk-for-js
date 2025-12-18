// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** The response of a KubernetesVersion list operation. */
export interface _KubernetesVersionListResult {
  /** The KubernetesVersion items on this page */
  value: KubernetesVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _kubernetesVersionListResultDeserializer(item: any): _KubernetesVersionListResult {
  return {
    value: kubernetesVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function kubernetesVersionArrayDeserializer(result: Array<KubernetesVersion>): any[] {
  return result.map((item) => {
    return kubernetesVersionDeserializer(item);
  });
}

/** Represents a kubernetes version resource. */
export interface KubernetesVersion extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: KubernetesVersionProperties;
}

export function kubernetesVersionDeserializer(item: any): KubernetesVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : kubernetesVersionPropertiesDeserializer(item["properties"]),
  };
}

/** Represents properties of a kubernetes version. */
export interface KubernetesVersionProperties {
  /** Represents kubernetes version. */
  version: string;
}

export function kubernetesVersionPropertiesDeserializer(item: any): KubernetesVersionProperties {
  return {
    version: item["version"],
  };
}

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

/** Represents a platform update resource. */
export interface PlatformUpdate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: PlatformUpdateProperties;
}

export function platformUpdateDeserializer(item: any): PlatformUpdate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : platformUpdatePropertiesDeserializer(item["properties"]),
  };
}

/** Represents properties of a platform update resource. */
export interface PlatformUpdateProperties {
  /** Represents applicable platform updates. */
  platformUpdateDetails: PlatformUpdateDetails[];
}

export function platformUpdatePropertiesDeserializer(item: any): PlatformUpdateProperties {
  return {
    platformUpdateDetails: platformUpdateDetailsArrayDeserializer(item["platformUpdateDetails"]),
  };
}

export function platformUpdateDetailsArrayDeserializer(
  result: Array<PlatformUpdateDetails>,
): any[] {
  return result.map((item) => {
    return platformUpdateDetailsDeserializer(item);
  });
}

/** Represents details of a specific platform update. */
export interface PlatformUpdateDetails {
  /** Represents validated solution recipe version of a platform update. */
  validatedSolutionRecipeVersion?: string;
  /** Represents version of a platform update. */
  platformVersion?: string;
  /** Represents the platform payloads of a platform update. */
  platformPayloads: PlatformPayload[];
}

export function platformUpdateDetailsDeserializer(item: any): PlatformUpdateDetails {
  return {
    validatedSolutionRecipeVersion: item["validatedSolutionRecipeVersion"],
    platformVersion: item["platformVersion"],
    platformPayloads: platformPayloadArrayDeserializer(item["platformPayloads"]),
  };
}

export function platformPayloadArrayDeserializer(result: Array<PlatformPayload>): any[] {
  return result.map((item) => {
    return platformPayloadDeserializer(item);
  });
}

/** Represents details of a specific platform update payload. */
export interface PlatformPayload {
  /** Represents url of a platform update payload. */
  payloadUrl?: string;
  /** Represents hash of a platform update payload. */
  payloadHash?: string;
  /** Represents size in bytes of a platform update payload. */
  payloadPackageSizeInBytes?: string;
  /** Represents identifier of a platform update payload. */
  payloadIdentifier?: string;
}

export function platformPayloadDeserializer(item: any): PlatformPayload {
  return {
    payloadUrl: item["payloadUrl"],
    payloadHash: item["payloadHash"],
    payloadPackageSizeInBytes: item["payloadPackageSizeInBytes"],
    payloadIdentifier: item["payloadIdentifier"],
  };
}

/** The response of a PlatformUpdate list operation. */
export interface _PlatformUpdateListResult {
  /** The PlatformUpdate items on this page */
  value: PlatformUpdate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _platformUpdateListResultDeserializer(item: any): _PlatformUpdateListResult {
  return {
    value: platformUpdateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function platformUpdateArrayDeserializer(result: Array<PlatformUpdate>): any[] {
  return result.map((item) => {
    return platformUpdateDeserializer(item);
  });
}

/** Represents a os image resource. */
export interface OsImage extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: OsImageProperties;
}

export function osImageDeserializer(item: any): OsImage {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : osImagePropertiesDeserializer(item["properties"]),
  };
}

/** Represents properties of a os image resource. */
export interface OsImageProperties {
  /** Represents validated solution recipe version of a os image. */
  validatedSolutionRecipeVersion?: string;
  /** Represents composed image version of a os image. */
  composedImageVersion?: string;
  /** Represents composed image iso download url of a os image. */
  composedImageIsoUrl?: string;
  /** Represents composed image iso hash of a os image. */
  composedImageIsoHash?: string;
}

export function osImagePropertiesDeserializer(item: any): OsImageProperties {
  return {
    validatedSolutionRecipeVersion: item["validatedSolutionRecipeVersion"],
    composedImageVersion: item["composedImageVersion"],
    composedImageIsoUrl: item["composedImageIsoUrl"],
    composedImageIsoHash: item["composedImageIsoHash"],
  };
}

/** The response of a OsImage list operation. */
export interface _OsImageListResult {
  /** The OsImage items on this page */
  value: OsImage[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _osImageListResultDeserializer(item: any): _OsImageListResult {
  return {
    value: osImageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function osImageArrayDeserializer(result: Array<OsImage>): any[] {
  return result.map((item) => {
    return osImageDeserializer(item);
  });
}

/** Represents a update content. */
export interface UpdateContent extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: UpdateContentProperties;
}

export function updateContentDeserializer(item: any): UpdateContent {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : updateContentPropertiesDeserializer(item["properties"]),
  };
}

/** Represents properties of a update content resource. */
export interface UpdateContentProperties {
  /** Represents the payloads of a update content resource. */
  updatePayloads: ContentPayload[];
}

export function updateContentPropertiesDeserializer(item: any): UpdateContentProperties {
  return {
    updatePayloads: contentPayloadArrayDeserializer(item["updatePayloads"]),
  };
}

export function contentPayloadArrayDeserializer(result: Array<ContentPayload>): any[] {
  return result.map((item) => {
    return contentPayloadDeserializer(item);
  });
}

/** Represents details of a specific update content payload. */
export interface ContentPayload {
  /** Represents url of a update payload. */
  url?: string;
  /** Represents hash of a update payload. */
  hash?: string;
  /** Represents hash algorithm of a update payload. */
  hashAlgorithm?: string;
  /** Represents identifier of a update payload. */
  identifier?: string;
  /** Represents size in bytes of a update payload. */
  packageSizeInBytes?: string;
  /** Represents the group of a update payload. */
  group?: string;
  /** Represents the file name of a update payload. */
  fileName?: string;
}

export function contentPayloadDeserializer(item: any): ContentPayload {
  return {
    url: item["url"],
    hash: item["hash"],
    hashAlgorithm: item["hashAlgorithm"],
    identifier: item["identifier"],
    packageSizeInBytes: item["packageSizeInBytes"],
    group: item["group"],
    fileName: item["fileName"],
  };
}

/** The response of a UpdateContent list operation. */
export interface _UpdateContentListResult {
  /** The UpdateContent items on this page */
  value: UpdateContent[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateContentListResultDeserializer(item: any): _UpdateContentListResult {
  return {
    value: updateContentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateContentArrayDeserializer(result: Array<UpdateContent>): any[] {
  return result.map((item) => {
    return updateContentDeserializer(item);
  });
}

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

/** Localized display information for and operation. */
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

/** ArcSetting details. */
export interface ArcSetting extends ProxyResource {
  /** Provisioning state of the ArcSetting proxy resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource group that hosts the Arc agents, ie. Hybrid Compute Machine resources. */
  arcInstanceResourceGroup?: string;
  /** App id of arc AAD identity. */
  arcApplicationClientId?: string;
  /** Tenant id of arc AAD identity. */
  arcApplicationTenantId?: string;
  /** Object id of arc AAD service principal. */
  arcServicePrincipalObjectId?: string;
  /** Object id of arc AAD identity. */
  arcApplicationObjectId?: string;
  /** Aggregate state of Arc agent across the nodes in this HCI cluster. */
  readonly aggregateState?: ArcSettingAggregateState;
  /** State of Arc agent in each of the nodes. */
  readonly perNodeDetails?: PerNodeState[];
  /** contains connectivity related configuration for ARC resources */
  connectivityProperties?: ArcConnectivityProperties;
  /** Properties for each of the default extensions category */
  readonly defaultExtensions?: DefaultExtensionDetails[];
}

export function arcSettingSerializer(item: ArcSetting): any {
  return {
    properties: areAllPropsUndefined(item, [
      "arcInstanceResourceGroup",
      "arcApplicationClientId",
      "arcApplicationTenantId",
      "arcServicePrincipalObjectId",
      "arcApplicationObjectId",
      "connectivityProperties",
    ])
      ? undefined
      : _arcSettingPropertiesSerializer(item),
  };
}

export function arcSettingDeserializer(item: any): ArcSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _arcSettingPropertiesDeserializer(item["properties"])),
  };
}

/** ArcSetting properties. */
export interface ArcSettingProperties {
  /** Provisioning state of the ArcSetting proxy resource. */
  readonly provisioningState?: ProvisioningState;
  /** The resource group that hosts the Arc agents, ie. Hybrid Compute Machine resources. */
  arcInstanceResourceGroup?: string;
  /** App id of arc AAD identity. */
  arcApplicationClientId?: string;
  /** Tenant id of arc AAD identity. */
  arcApplicationTenantId?: string;
  /** Object id of arc AAD service principal. */
  arcServicePrincipalObjectId?: string;
  /** Object id of arc AAD identity. */
  arcApplicationObjectId?: string;
  /** Aggregate state of Arc agent across the nodes in this HCI cluster. */
  readonly aggregateState?: ArcSettingAggregateState;
  /** State of Arc agent in each of the nodes. */
  readonly perNodeDetails?: PerNodeState[];
  /** contains connectivity related configuration for ARC resources */
  connectivityProperties?: ArcConnectivityProperties;
  /** Properties for each of the default extensions category */
  readonly defaultExtensions?: DefaultExtensionDetails[];
}

export function arcSettingPropertiesSerializer(item: ArcSettingProperties): any {
  return {
    arcInstanceResourceGroup: item["arcInstanceResourceGroup"],
    arcApplicationClientId: item["arcApplicationClientId"],
    arcApplicationTenantId: item["arcApplicationTenantId"],
    arcServicePrincipalObjectId: item["arcServicePrincipalObjectId"],
    arcApplicationObjectId: item["arcApplicationObjectId"],
    connectivityProperties: !item["connectivityProperties"]
      ? item["connectivityProperties"]
      : arcConnectivityPropertiesSerializer(item["connectivityProperties"]),
  };
}

export function arcSettingPropertiesDeserializer(item: any): ArcSettingProperties {
  return {
    provisioningState: item["provisioningState"],
    arcInstanceResourceGroup: item["arcInstanceResourceGroup"],
    arcApplicationClientId: item["arcApplicationClientId"],
    arcApplicationTenantId: item["arcApplicationTenantId"],
    arcServicePrincipalObjectId: item["arcServicePrincipalObjectId"],
    arcApplicationObjectId: item["arcApplicationObjectId"],
    aggregateState: item["aggregateState"],
    perNodeDetails: !item["perNodeDetails"]
      ? item["perNodeDetails"]
      : perNodeStateArrayDeserializer(item["perNodeDetails"]),
    connectivityProperties: !item["connectivityProperties"]
      ? item["connectivityProperties"]
      : arcConnectivityPropertiesDeserializer(item["connectivityProperties"]),
    defaultExtensions: !item["defaultExtensions"]
      ? item["defaultExtensions"]
      : defaultExtensionDetailsArrayDeserializer(item["defaultExtensions"]),
  };
}

/** Provisioning state of the ArcSetting proxy resource. */
export enum KnownProvisioningState {
  /** The provisioning state is not specified. */
  NotSpecified = "NotSpecified",
  /** An error occurred during provisioning. */
  Error = "Error",
  /** Provisioning completed successfully. */
  Succeeded = "Succeeded",
  /** Provisioning failed. */
  Failed = "Failed",
  /** Provisioning was canceled. */
  Canceled = "Canceled",
  /** The resource is connected. */
  Connected = "Connected",
  /** The resource is disconnected. */
  Disconnected = "Disconnected",
  /** The resource has been deleted. */
  Deleted = "Deleted",
  /** The resource is being created. */
  Creating = "Creating",
  /** The resource is being updated. */
  Updating = "Updating",
  /** The resource is being deleted. */
  Deleting = "Deleting",
  /** The resource is being moved. */
  Moving = "Moving",
  /** Provisioning partially succeeded. */
  PartiallySucceeded = "PartiallySucceeded",
  /** The resource is partially connected. */
  PartiallyConnected = "PartiallyConnected",
  /** Provisioning is in progress. */
  InProgress = "InProgress",
  /** Provisioning request has been accepted. */
  Accepted = "Accepted",
  /** The resource is currently provisioning. */
  Provisioning = "Provisioning",
  /** The resource is being disabled. */
  DisableInProgress = "DisableInProgress",
}

/**
 * Provisioning state of the ArcSetting proxy resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The provisioning state is not specified. \
 * **Error**: An error occurred during provisioning. \
 * **Succeeded**: Provisioning completed successfully. \
 * **Failed**: Provisioning failed. \
 * **Canceled**: Provisioning was canceled. \
 * **Connected**: The resource is connected. \
 * **Disconnected**: The resource is disconnected. \
 * **Deleted**: The resource has been deleted. \
 * **Creating**: The resource is being created. \
 * **Updating**: The resource is being updated. \
 * **Deleting**: The resource is being deleted. \
 * **Moving**: The resource is being moved. \
 * **PartiallySucceeded**: Provisioning partially succeeded. \
 * **PartiallyConnected**: The resource is partially connected. \
 * **InProgress**: Provisioning is in progress. \
 * **Accepted**: Provisioning request has been accepted. \
 * **Provisioning**: The resource is currently provisioning. \
 * **DisableInProgress**: The resource is being disabled.
 */
export type ProvisioningState = string;

/** Aggregate state of Arc agent across the nodes in this HCI cluster. */
export enum KnownArcSettingAggregateState {
  /** The aggregate state is not specified. */
  NotSpecified = "NotSpecified",
  /** An error occurred in the aggregate state. */
  Error = "Error",
  /** The operation successfully completed across all nodes. */
  Succeeded = "Succeeded",
  /** The operation was canceled across the nodes. */
  Canceled = "Canceled",
  /** The operation failed on all or most nodes. */
  Failed = "Failed",
  /** All nodes are connected. */
  Connected = "Connected",
  /** All nodes are disconnected. */
  Disconnected = "Disconnected",
  /** The Arc agent has been deleted from all nodes. */
  Deleted = "Deleted",
  /** The Arc agent is being created across the nodes. */
  Creating = "Creating",
  /** The Arc agent is being updated across the nodes. */
  Updating = "Updating",
  /** The Arc agent is being deleted across the nodes. */
  Deleting = "Deleting",
  /** The Arc agent is being moved across the nodes. */
  Moving = "Moving",
  /** The operation succeeded on some nodes. */
  PartiallySucceeded = "PartiallySucceeded",
  /** Some nodes are connected, others are not. */
  PartiallyConnected = "PartiallyConnected",
  /** The operation is currently in progress across the nodes. */
  InProgress = "InProgress",
  /** The operation has been accepted and is pending execution. */
  Accepted = "Accepted",
  /** The Arc agent is being provisioned across the nodes. */
  Provisioning = "Provisioning",
  /** The Arc agent is being disabled across the nodes. */
  DisableInProgress = "DisableInProgress",
}

/**
 * Aggregate state of Arc agent across the nodes in this HCI cluster. \
 * {@link KnownArcSettingAggregateState} can be used interchangeably with ArcSettingAggregateState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The aggregate state is not specified. \
 * **Error**: An error occurred in the aggregate state. \
 * **Succeeded**: The operation successfully completed across all nodes. \
 * **Canceled**: The operation was canceled across the nodes. \
 * **Failed**: The operation failed on all or most nodes. \
 * **Connected**: All nodes are connected. \
 * **Disconnected**: All nodes are disconnected. \
 * **Deleted**: The Arc agent has been deleted from all nodes. \
 * **Creating**: The Arc agent is being created across the nodes. \
 * **Updating**: The Arc agent is being updated across the nodes. \
 * **Deleting**: The Arc agent is being deleted across the nodes. \
 * **Moving**: The Arc agent is being moved across the nodes. \
 * **PartiallySucceeded**: The operation succeeded on some nodes. \
 * **PartiallyConnected**: Some nodes are connected, others are not. \
 * **InProgress**: The operation is currently in progress across the nodes. \
 * **Accepted**: The operation has been accepted and is pending execution. \
 * **Provisioning**: The Arc agent is being provisioned across the nodes. \
 * **DisableInProgress**: The Arc agent is being disabled across the nodes.
 */
export type ArcSettingAggregateState = string;

export function perNodeStateArrayDeserializer(result: Array<PerNodeState>): any[] {
  return result.map((item) => {
    return perNodeStateDeserializer(item);
  });
}

/** Status of Arc agent for a particular node in HCI Cluster. */
export interface PerNodeState {
  /** Name of the Node in HCI Cluster */
  readonly name?: string;
  /** Fully qualified resource ID for the Arc agent of this node. */
  readonly arcInstance?: string;
  /** The service principal id of the arc for server node */
  readonly arcNodeServicePrincipalObjectId?: string;
  /** State of the Arc agent in this node. Indicates the current lifecycle status of the agent, such as whether it's being provisioned, connected, updated, or has encountered an error. */
  readonly state?: NodeArcState;
}

export function perNodeStateDeserializer(item: any): PerNodeState {
  return {
    name: item["name"],
    arcInstance: item["arcInstance"],
    arcNodeServicePrincipalObjectId: item["arcNodeServicePrincipalObjectId"],
    state: item["state"],
  };
}

/** State of the Arc agent in this node. Indicates the current lifecycle status of the agent, such as whether it's being provisioned, connected, updated, or has encountered an error. */
export enum KnownNodeArcState {
  /** The state is not specified. */
  NotSpecified = "NotSpecified",
  /** An error occurred during the agent's lifecycle. */
  Error = "Error",
  /** The operation completed successfully. */
  Succeeded = "Succeeded",
  /** The operation was canceled before completion. */
  Canceled = "Canceled",
  /** The operation failed. */
  Failed = "Failed",
  /** The Arc agent is connected on this node. */
  Connected = "Connected",
  /** The Arc agent is disconnected on this node. */
  Disconnected = "Disconnected",
  /** The Arc agent has been deleted from this node. */
  Deleted = "Deleted",
  /** The Arc agent is being created on this node. */
  Creating = "Creating",
  /** The Arc agent is being updated on this node. */
  Updating = "Updating",
  /** The Arc agent is being deleted from this node. */
  Deleting = "Deleting",
  /** The Arc agent is being moved on this node. */
  Moving = "Moving",
  /** The operation partially succeeded. */
  PartiallySucceeded = "PartiallySucceeded",
  /** The Arc agent is partially connected on this node. */
  PartiallyConnected = "PartiallyConnected",
  /** The operation is currently in progress. */
  InProgress = "InProgress",
  /** The operation has been accepted and is pending execution. */
  Accepted = "Accepted",
  /** The Arc agent is currently being provisioned on this node. */
  Provisioning = "Provisioning",
  /** The Arc agent is in the process of being disabled on this node. */
  DisableInProgress = "DisableInProgress",
}

/**
 * State of the Arc agent in this node. Indicates the current lifecycle status of the agent, such as whether it's being provisioned, connected, updated, or has encountered an error. \
 * {@link KnownNodeArcState} can be used interchangeably with NodeArcState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The state is not specified. \
 * **Error**: An error occurred during the agent's lifecycle. \
 * **Succeeded**: The operation completed successfully. \
 * **Canceled**: The operation was canceled before completion. \
 * **Failed**: The operation failed. \
 * **Connected**: The Arc agent is connected on this node. \
 * **Disconnected**: The Arc agent is disconnected on this node. \
 * **Deleted**: The Arc agent has been deleted from this node. \
 * **Creating**: The Arc agent is being created on this node. \
 * **Updating**: The Arc agent is being updated on this node. \
 * **Deleting**: The Arc agent is being deleted from this node. \
 * **Moving**: The Arc agent is being moved on this node. \
 * **PartiallySucceeded**: The operation partially succeeded. \
 * **PartiallyConnected**: The Arc agent is partially connected on this node. \
 * **InProgress**: The operation is currently in progress. \
 * **Accepted**: The operation has been accepted and is pending execution. \
 * **Provisioning**: The Arc agent is currently being provisioned on this node. \
 * **DisableInProgress**: The Arc agent is in the process of being disabled on this node.
 */
export type NodeArcState = string;

/** Connectivity related configuration required by arc server. */
export interface ArcConnectivityProperties {
  /** True indicates ARC connectivity is enabled */
  enabled?: boolean;
  /** Service configurations associated with the connectivity resource. They are only processed by the server if 'enabled' property is set to 'true'. */
  serviceConfigurations?: ServiceConfiguration[];
}

export function arcConnectivityPropertiesSerializer(item: ArcConnectivityProperties): any {
  return {
    enabled: item["enabled"],
    serviceConfigurations: !item["serviceConfigurations"]
      ? item["serviceConfigurations"]
      : serviceConfigurationArraySerializer(item["serviceConfigurations"]),
  };
}

export function arcConnectivityPropertiesDeserializer(item: any): ArcConnectivityProperties {
  return {
    enabled: item["enabled"],
    serviceConfigurations: !item["serviceConfigurations"]
      ? item["serviceConfigurations"]
      : serviceConfigurationArrayDeserializer(item["serviceConfigurations"]),
  };
}

export function serviceConfigurationArraySerializer(result: Array<ServiceConfiguration>): any[] {
  return result.map((item) => {
    return serviceConfigurationSerializer(item);
  });
}

export function serviceConfigurationArrayDeserializer(result: Array<ServiceConfiguration>): any[] {
  return result.map((item) => {
    return serviceConfigurationDeserializer(item);
  });
}

/** Service configuration details */
export interface ServiceConfiguration {
  /** Specifies the name of the service associated with the update or operation. This helps identify which system component or tool is involved. */
  serviceName: ServiceName;
  /** The port on which service is enabled. */
  port: number;
}

export function serviceConfigurationSerializer(item: ServiceConfiguration): any {
  return { serviceName: item["serviceName"], port: item["port"] };
}

export function serviceConfigurationDeserializer(item: any): ServiceConfiguration {
  return {
    serviceName: item["serviceName"],
    port: item["port"],
  };
}

/** Specifies the name of the service associated with the update or operation. This helps identify which system component or tool is involved. */
export enum KnownServiceName {
  /** Windows Admin Center (WAC) is the service associated with this operation. */
  WAC = "WAC",
}

/**
 * Specifies the name of the service associated with the update or operation. This helps identify which system component or tool is involved. \
 * {@link KnownServiceName} can be used interchangeably with ServiceName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WAC**: Windows Admin Center (WAC) is the service associated with this operation.
 */
export type ServiceName = string;

export function defaultExtensionDetailsArrayDeserializer(
  result: Array<DefaultExtensionDetails>,
): any[] {
  return result.map((item) => {
    return defaultExtensionDetailsDeserializer(item);
  });
}

/** Properties for a particular default extension category. */
export interface DefaultExtensionDetails {
  /** Default extension category */
  readonly category?: string;
  /** Consent time for extension category */
  readonly consentTime?: Date;
}

export function defaultExtensionDetailsDeserializer(item: any): DefaultExtensionDetails {
  return {
    category: item["category"],
    consentTime: !item["consentTime"] ? item["consentTime"] : new Date(item["consentTime"]),
  };
}

/** ArcSetting details to update. */
export interface ArcSettingsPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** contains connectivity related configuration for ARC resources */
  connectivityProperties?: ArcConnectivityProperties;
}

export function arcSettingsPatchSerializer(item: ArcSettingsPatch): any {
  return {
    tags: item["tags"],
    properties: areAllPropsUndefined(item, ["connectivityProperties"])
      ? undefined
      : _arcSettingsPatchPropertiesSerializer(item),
  };
}

/** ArcSettings properties. */
export interface ArcSettingsPatchProperties {
  /** contains connectivity related configuration for ARC resources */
  connectivityProperties?: ArcConnectivityProperties;
}

export function arcSettingsPatchPropertiesSerializer(item: ArcSettingsPatchProperties): any {
  return {
    connectivityProperties: !item["connectivityProperties"]
      ? item["connectivityProperties"]
      : arcConnectivityPropertiesSerializer(item["connectivityProperties"]),
  };
}

/** List of ArcSetting proxy resources for the HCI cluster. */
export interface _ArcSettingList {
  /** The ArcSetting items on this page */
  value: ArcSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _arcSettingListDeserializer(item: any): _ArcSettingList {
  return {
    value: arcSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function arcSettingArraySerializer(result: Array<ArcSetting>): any[] {
  return result.map((item) => {
    return arcSettingSerializer(item);
  });
}

export function arcSettingArrayDeserializer(result: Array<ArcSetting>): any[] {
  return result.map((item) => {
    return arcSettingDeserializer(item);
  });
}

/** model interface PasswordCredential */
export interface PasswordCredential {
  secretText?: string;
  keyId?: string;
  startDateTime?: Date;
  endDateTime?: Date;
}

export function passwordCredentialDeserializer(item: any): PasswordCredential {
  return {
    secretText: item["secretText"],
    keyId: item["keyId"],
    startDateTime: !item["startDateTime"] ? item["startDateTime"] : new Date(item["startDateTime"]),
    endDateTime: !item["endDateTime"] ? item["endDateTime"] : new Date(item["endDateTime"]),
  };
}

/** ArcIdentity details. */
export interface ArcIdentityResponse {
  arcApplicationClientId?: string;
  arcApplicationTenantId?: string;
  arcServicePrincipalObjectId?: string;
  arcApplicationObjectId?: string;
}

export function arcIdentityResponseDeserializer(item: any): ArcIdentityResponse {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _arcIdentityResponsePropertiesDeserializer(item["properties"])),
  };
}

/** model interface ArcIdentityResponseProperties */
export interface ArcIdentityResponseProperties {
  arcApplicationClientId?: string;
  arcApplicationTenantId?: string;
  arcServicePrincipalObjectId?: string;
  arcApplicationObjectId?: string;
}

export function arcIdentityResponsePropertiesDeserializer(
  item: any,
): ArcIdentityResponseProperties {
  return {
    arcApplicationClientId: item["arcApplicationClientId"],
    arcApplicationTenantId: item["arcApplicationTenantId"],
    arcServicePrincipalObjectId: item["arcServicePrincipalObjectId"],
    arcApplicationObjectId: item["arcApplicationObjectId"],
  };
}

/** Request for reconciling Arc Settings. */
export interface ReconcileArcSettingsRequest {
  /** List of Arc Nodes in the cluster */
  properties?: ReconcileArcSettingsRequestProperties;
}

export function reconcileArcSettingsRequestSerializer(item: ReconcileArcSettingsRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : reconcileArcSettingsRequestPropertiesSerializer(item["properties"]),
  };
}

/** List of Arc Nodes in the cluster */
export interface ReconcileArcSettingsRequestProperties {
  clusterNodes?: string[];
}

export function reconcileArcSettingsRequestPropertiesSerializer(
  item: ReconcileArcSettingsRequestProperties,
): any {
  return {
    clusterNodes: !item["clusterNodes"]
      ? item["clusterNodes"]
      : item["clusterNodes"].map((p: any) => {
          return p;
        }),
  };
}

/** Offer details. */
export interface Offer extends ProxyResource {
  /** Provisioning State */
  readonly provisioningState?: string;
  /** Identifier of the Publisher for the offer */
  publisherId?: string;
  /** JSON serialized catalog content of the offer */
  content?: string;
  /** The API version of the catalog service used to serve the catalog content */
  contentVersion?: string;
  /** Array of SKU mappings */
  skuMappings?: SkuMappings[];
}

export function offerDeserializer(item: any): Offer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _offerPropertiesDeserializer(item["properties"])),
  };
}

/** Publisher properties. */
export interface OfferProperties {
  /** Provisioning State */
  readonly provisioningState?: string;
  /** Identifier of the Publisher for the offer */
  publisherId?: string;
  /** JSON serialized catalog content of the offer */
  content?: string;
  /** The API version of the catalog service used to serve the catalog content */
  contentVersion?: string;
  /** Array of SKU mappings */
  skuMappings?: SkuMappings[];
}

export function offerPropertiesDeserializer(item: any): OfferProperties {
  return {
    provisioningState: item["provisioningState"],
    publisherId: item["publisherId"],
    content: item["content"],
    contentVersion: item["contentVersion"],
    skuMappings: !item["skuMappings"]
      ? item["skuMappings"]
      : skuMappingsArrayDeserializer(item["skuMappings"]),
  };
}

export function skuMappingsArrayDeserializer(result: Array<SkuMappings>): any[] {
  return result.map((item) => {
    return skuMappingsDeserializer(item);
  });
}

/** SKU Mapping details. */
export interface SkuMappings {
  /** Identifier of the CatalogPlan for the sku */
  catalogPlanId?: string;
  /** Identifier for the sku */
  marketplaceSkuId?: string;
  /** Array of SKU versions available */
  marketplaceSkuVersions?: string[];
}

export function skuMappingsDeserializer(item: any): SkuMappings {
  return {
    catalogPlanId: item["catalogPlanId"],
    marketplaceSkuId: item["marketplaceSkuId"],
    marketplaceSkuVersions: !item["marketplaceSkuVersions"]
      ? item["marketplaceSkuVersions"]
      : item["marketplaceSkuVersions"].map((p: any) => {
          return p;
        }),
  };
}

/** List of Offer proxy resources for the HCI cluster. */
export interface _OfferList {
  /** The Offer items on this page */
  value: Offer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _offerListDeserializer(item: any): _OfferList {
  return {
    value: offerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function offerArrayDeserializer(result: Array<Offer>): any[] {
  return result.map((item) => {
    return offerDeserializer(item);
  });
}

/** Cluster details. */
export interface Cluster extends TrackedResource {
  /** This property identifies the purpose of the Cluster deployment. For example, a valid value is AzureLocal */
  kind?: string;
  /** Provisioning state. Indicates the current lifecycle status of the resource, including creation, update, deletion, connectivity, and error states. */
  readonly provisioningState?: ProvisioningState;
  /** Status of the cluster agent. Indicates the current connectivity, validation, and deployment state of the agent within the cluster. */
  readonly status?: Status;
  /** Overall connectivity status for the cluster resource. Indicates whether the cluster is connected to Azure, partially connected, or has not recently communicated. */
  readonly connectivityStatus?: ConnectivityStatus;
  /** Indicates whether the cluster is under support. */
  readonly supportStatus?: SupportStatus;
  /** Unique, immutable resource id. */
  readonly cloudId?: string;
  /** The ring to which this cluster belongs to. */
  readonly ring?: string;
  /** Endpoint configured for management from the Azure portal. */
  cloudManagementEndpoint?: string;
  /** App id of cluster AAD identity. */
  aadClientId?: string;
  /** Tenant id of cluster AAD identity. */
  aadTenantId?: string;
  /** Object id of cluster AAD identity. */
  aadApplicationObjectId?: string;
  /** Id of cluster identity service principal. */
  aadServicePrincipalObjectId?: string;
  /** Software Assurance properties of the cluster. */
  softwareAssuranceProperties?: SoftwareAssuranceProperties;
  /** Is Management Cluster, when true indicates that the cluster is used for managing other clusters */
  readonly isManagementCluster?: boolean;
  /** Log Collection properties of the cluster. */
  logCollectionProperties?: LogCollectionProperties;
  /** RemoteSupport properties of the cluster. */
  remoteSupportProperties?: RemoteSupportProperties;
  /** Desired properties of the cluster. */
  desiredProperties?: ClusterDesiredProperties;
  /** Properties reported by cluster agent. */
  readonly reportedProperties?: ClusterReportedProperties;
  /** Attestation configurations for isolated VM (e.g. TVM, CVM) of the cluster. */
  readonly isolatedVmAttestationConfiguration?: IsolatedVmAttestationConfiguration;
  /** Number of days remaining in the trial period. */
  readonly trialDaysRemaining?: number;
  /** Type of billing applied to the resource. */
  readonly billingModel?: string;
  /** First cluster sync timestamp. */
  readonly registrationTimestamp?: Date;
  /** Most recent cluster sync timestamp. */
  readonly lastSyncTimestamp?: Date;
  /** Most recent billing meter timestamp. */
  readonly lastBillingTimestamp?: Date;
  /** Region specific DataPath Endpoint of the cluster. */
  readonly serviceEndpoint?: string;
  /** Object id of RP Service Principal */
  readonly resourceProviderObjectId?: string;
  /** List of secret locations. */
  secretsLocations?: SecretsLocationDetails[];
  /** Supported Storage Type for HCI Cluster */
  readonly clusterPattern?: ClusterPattern;
  /** Represents the Confidential Virtual Machine (CVM) support intent and current status for the cluster resource. */
  readonly confidentialVmProperties?: ConfidentialVmProperties;
  /** Software Defined Networking Properties of the cluster */
  readonly sdnProperties?: ClusterSdnProperties;
  /** Local Availability Zone information for HCI cluster */
  localAvailabilityZones?: LocalAvailabilityZones[];
  /** Identity Provider for the cluster */
  readonly identityProvider?: IdentityProvider;
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  typeIdentityType?: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "cloudManagementEndpoint",
      "aadClientId",
      "aadTenantId",
      "aadApplicationObjectId",
      "aadServicePrincipalObjectId",
      "softwareAssuranceProperties",
      "logCollectionProperties",
      "remoteSupportProperties",
      "desiredProperties",
      "secretsLocations",
      "localAvailabilityZones",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
    identity: areAllPropsUndefined(item, ["type", "userAssignedIdentities"])
      ? undefined
      : _clusterIdentitySerializer(item),
    kind: item["kind"],
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
    ...(!item["identity"] ? item["identity"] : _clusterIdentityDeserializer(item["identity"])),
    kind: item["kind"],
  };
}

/** Cluster properties. */
export interface ClusterProperties {
  /** Provisioning state. Indicates the current lifecycle status of the resource, including creation, update, deletion, connectivity, and error states. */
  readonly provisioningState?: ProvisioningState;
  /** Status of the cluster agent. Indicates the current connectivity, validation, and deployment state of the agent within the cluster. */
  readonly status?: Status;
  /** Overall connectivity status for the cluster resource. Indicates whether the cluster is connected to Azure, partially connected, or has not recently communicated. */
  readonly connectivityStatus?: ConnectivityStatus;
  /** Indicates whether the cluster is under support. */
  readonly supportStatus?: SupportStatus;
  /** Unique, immutable resource id. */
  readonly cloudId?: string;
  /** The ring to which this cluster belongs to. */
  readonly ring?: string;
  /** Endpoint configured for management from the Azure portal. */
  cloudManagementEndpoint?: string;
  /** App id of cluster AAD identity. */
  aadClientId?: string;
  /** Tenant id of cluster AAD identity. */
  aadTenantId?: string;
  /** Object id of cluster AAD identity. */
  aadApplicationObjectId?: string;
  /** Id of cluster identity service principal. */
  aadServicePrincipalObjectId?: string;
  /** Software Assurance properties of the cluster. */
  softwareAssuranceProperties?: SoftwareAssuranceProperties;
  /** Is Management Cluster, when true indicates that the cluster is used for managing other clusters */
  readonly isManagementCluster?: boolean;
  /** Log Collection properties of the cluster. */
  logCollectionProperties?: LogCollectionProperties;
  /** RemoteSupport properties of the cluster. */
  remoteSupportProperties?: RemoteSupportProperties;
  /** Desired properties of the cluster. */
  desiredProperties?: ClusterDesiredProperties;
  /** Properties reported by cluster agent. */
  readonly reportedProperties?: ClusterReportedProperties;
  /** Attestation configurations for isolated VM (e.g. TVM, CVM) of the cluster. */
  readonly isolatedVmAttestationConfiguration?: IsolatedVmAttestationConfiguration;
  /** Number of days remaining in the trial period. */
  readonly trialDaysRemaining?: number;
  /** Type of billing applied to the resource. */
  readonly billingModel?: string;
  /** First cluster sync timestamp. */
  readonly registrationTimestamp?: Date;
  /** Most recent cluster sync timestamp. */
  readonly lastSyncTimestamp?: Date;
  /** Most recent billing meter timestamp. */
  readonly lastBillingTimestamp?: Date;
  /** Region specific DataPath Endpoint of the cluster. */
  readonly serviceEndpoint?: string;
  /** Object id of RP Service Principal */
  readonly resourceProviderObjectId?: string;
  /** List of secret locations. */
  secretsLocations?: SecretsLocationDetails[];
  /** Supported Storage Type for HCI Cluster */
  readonly clusterPattern?: ClusterPattern;
  /** Represents the Confidential Virtual Machine (CVM) support intent and current status for the cluster resource. */
  readonly confidentialVmProperties?: ConfidentialVmProperties;
  /** Software Defined Networking Properties of the cluster */
  readonly sdnProperties?: ClusterSdnProperties;
  /** Local Availability Zone information for HCI cluster */
  localAvailabilityZones?: LocalAvailabilityZones[];
  /** Identity Provider for the cluster */
  readonly identityProvider?: IdentityProvider;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    cloudManagementEndpoint: item["cloudManagementEndpoint"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    aadApplicationObjectId: item["aadApplicationObjectId"],
    aadServicePrincipalObjectId: item["aadServicePrincipalObjectId"],
    softwareAssuranceProperties: !item["softwareAssuranceProperties"]
      ? item["softwareAssuranceProperties"]
      : softwareAssurancePropertiesSerializer(item["softwareAssuranceProperties"]),
    logCollectionProperties: !item["logCollectionProperties"]
      ? item["logCollectionProperties"]
      : logCollectionPropertiesSerializer(item["logCollectionProperties"]),
    remoteSupportProperties: !item["remoteSupportProperties"]
      ? item["remoteSupportProperties"]
      : remoteSupportPropertiesSerializer(item["remoteSupportProperties"]),
    desiredProperties: !item["desiredProperties"]
      ? item["desiredProperties"]
      : clusterDesiredPropertiesSerializer(item["desiredProperties"]),
    secretsLocations: !item["secretsLocations"]
      ? item["secretsLocations"]
      : secretsLocationDetailsArraySerializer(item["secretsLocations"]),
    localAvailabilityZones: !item["localAvailabilityZones"]
      ? item["localAvailabilityZones"]
      : localAvailabilityZonesArraySerializer(item["localAvailabilityZones"]),
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    connectivityStatus: item["connectivityStatus"],
    supportStatus: item["supportStatus"],
    cloudId: item["cloudId"],
    ring: item["ring"],
    cloudManagementEndpoint: item["cloudManagementEndpoint"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    aadApplicationObjectId: item["aadApplicationObjectId"],
    aadServicePrincipalObjectId: item["aadServicePrincipalObjectId"],
    softwareAssuranceProperties: !item["softwareAssuranceProperties"]
      ? item["softwareAssuranceProperties"]
      : softwareAssurancePropertiesDeserializer(item["softwareAssuranceProperties"]),
    isManagementCluster: item["isManagementCluster"],
    logCollectionProperties: !item["logCollectionProperties"]
      ? item["logCollectionProperties"]
      : logCollectionPropertiesDeserializer(item["logCollectionProperties"]),
    remoteSupportProperties: !item["remoteSupportProperties"]
      ? item["remoteSupportProperties"]
      : remoteSupportPropertiesDeserializer(item["remoteSupportProperties"]),
    desiredProperties: !item["desiredProperties"]
      ? item["desiredProperties"]
      : clusterDesiredPropertiesDeserializer(item["desiredProperties"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : clusterReportedPropertiesDeserializer(item["reportedProperties"]),
    isolatedVmAttestationConfiguration: !item["isolatedVmAttestationConfiguration"]
      ? item["isolatedVmAttestationConfiguration"]
      : isolatedVmAttestationConfigurationDeserializer(item["isolatedVmAttestationConfiguration"]),
    trialDaysRemaining: item["trialDaysRemaining"],
    billingModel: item["billingModel"],
    registrationTimestamp: !item["registrationTimestamp"]
      ? item["registrationTimestamp"]
      : new Date(item["registrationTimestamp"]),
    lastSyncTimestamp: !item["lastSyncTimestamp"]
      ? item["lastSyncTimestamp"]
      : new Date(item["lastSyncTimestamp"]),
    lastBillingTimestamp: !item["lastBillingTimestamp"]
      ? item["lastBillingTimestamp"]
      : new Date(item["lastBillingTimestamp"]),
    serviceEndpoint: item["serviceEndpoint"],
    resourceProviderObjectId: item["resourceProviderObjectId"],
    secretsLocations: !item["secretsLocations"]
      ? item["secretsLocations"]
      : secretsLocationDetailsArrayDeserializer(item["secretsLocations"]),
    clusterPattern: item["clusterPattern"],
    confidentialVmProperties: !item["confidentialVmProperties"]
      ? item["confidentialVmProperties"]
      : confidentialVmPropertiesDeserializer(item["confidentialVmProperties"]),
    sdnProperties: !item["sdnProperties"]
      ? item["sdnProperties"]
      : clusterSdnPropertiesDeserializer(item["sdnProperties"]),
    localAvailabilityZones: !item["localAvailabilityZones"]
      ? item["localAvailabilityZones"]
      : localAvailabilityZonesArrayDeserializer(item["localAvailabilityZones"]),
    identityProvider: item["identityProvider"],
  };
}

/** Status of the cluster agent. Indicates the current connectivity, validation, and deployment state of the agent within the cluster. */
export enum KnownStatus {
  /** The cluster agent has not yet registered with Azure. */
  NotYetRegistered = "NotYetRegistered",
  /** The cluster agent has connected to Azure recently. */
  ConnectedRecently = "ConnectedRecently",
  /** The cluster agent has not connected to Azure recently. */
  NotConnectedRecently = "NotConnectedRecently",
  /** The cluster agent is currently disconnected from Azure. */
  Disconnected = "Disconnected",
  /** An error occurred in the cluster agent's operation. */
  Error = "Error",
  /** The status of the cluster agent is not specified. */
  NotSpecified = "NotSpecified",
  /** Validation of the cluster agent is currently in progress. */
  ValidationInProgress = "ValidationInProgress",
  /** Validation of the cluster agent completed successfully. */
  ValidationSuccess = "ValidationSuccess",
  /** Validation of the cluster agent failed. */
  ValidationFailed = "ValidationFailed",
  /** Deployment of the cluster agent is currently in progress. */
  DeploymentInProgress = "DeploymentInProgress",
  /** Deployment of the cluster agent failed. */
  DeploymentFailed = "DeploymentFailed",
  /** Deployment of the cluster agent completed successfully. */
  DeploymentSuccess = "DeploymentSuccess",
}

/**
 * Status of the cluster agent. Indicates the current connectivity, validation, and deployment state of the agent within the cluster. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotYetRegistered**: The cluster agent has not yet registered with Azure. \
 * **ConnectedRecently**: The cluster agent has connected to Azure recently. \
 * **NotConnectedRecently**: The cluster agent has not connected to Azure recently. \
 * **Disconnected**: The cluster agent is currently disconnected from Azure. \
 * **Error**: An error occurred in the cluster agent's operation. \
 * **NotSpecified**: The status of the cluster agent is not specified. \
 * **ValidationInProgress**: Validation of the cluster agent is currently in progress. \
 * **ValidationSuccess**: Validation of the cluster agent completed successfully. \
 * **ValidationFailed**: Validation of the cluster agent failed. \
 * **DeploymentInProgress**: Deployment of the cluster agent is currently in progress. \
 * **DeploymentFailed**: Deployment of the cluster agent failed. \
 * **DeploymentSuccess**: Deployment of the cluster agent completed successfully.
 */
export type Status = string;

/** Overall connectivity status for the cluster resource. Indicates whether the cluster is connected to Azure, partially connected, or has not recently communicated. */
export enum KnownConnectivityStatus {
  /** The cluster has not yet registered with Azure. */
  NotYetRegistered = "NotYetRegistered",
  /** The cluster is fully connected to Azure. */
  Connected = "Connected",
  /** The cluster has not connected to Azure recently. */
  NotConnectedRecently = "NotConnectedRecently",
  /** Some components of the cluster are connected, while others are not. */
  PartiallyConnected = "PartiallyConnected",
  /** The cluster is not connected to Azure. */
  Disconnected = "Disconnected",
  /** The connectivity status is not specified. */
  NotSpecified = "NotSpecified",
}

/**
 * Overall connectivity status for the cluster resource. Indicates whether the cluster is connected to Azure, partially connected, or has not recently communicated. \
 * {@link KnownConnectivityStatus} can be used interchangeably with ConnectivityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotYetRegistered**: The cluster has not yet registered with Azure. \
 * **Connected**: The cluster is fully connected to Azure. \
 * **NotConnectedRecently**: The cluster has not connected to Azure recently. \
 * **PartiallyConnected**: Some components of the cluster are connected, while others are not. \
 * **Disconnected**: The cluster is not connected to Azure. \
 * **NotSpecified**: The connectivity status is not specified.
 */
export type ConnectivityStatus = string;

/** Indicates whether the cluster is under support. */
export enum KnownSupportStatus {
  /** The cluster is under support. */
  InSupport = "InSupport",
  /** The cluster is out of support. */
  OutOfSupport = "OutOfSupport",
  /** The support status is not specified. */
  NotSpecified = "NotSpecified",
}

/**
 * Indicates whether the cluster is under support. \
 * {@link KnownSupportStatus} can be used interchangeably with SupportStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InSupport**: The cluster is under support. \
 * **OutOfSupport**: The cluster is out of support. \
 * **NotSpecified**: The support status is not specified.
 */
export type SupportStatus = string;

/** Software Assurance properties of the cluster. */
export interface SoftwareAssuranceProperties {
  /** Status of the Software Assurance for the cluster. */
  readonly softwareAssuranceStatus?: SoftwareAssuranceStatus;
  /** Customer Intent for Software Assurance Benefit. */
  softwareAssuranceIntent?: SoftwareAssuranceIntent;
  /** TimeStamp denoting the latest SA benefit applicability is validated. */
  readonly lastUpdated?: Date;
}

export function softwareAssurancePropertiesSerializer(item: SoftwareAssuranceProperties): any {
  return { softwareAssuranceIntent: item["softwareAssuranceIntent"] };
}

export function softwareAssurancePropertiesDeserializer(item: any): SoftwareAssuranceProperties {
  return {
    softwareAssuranceStatus: item["softwareAssuranceStatus"],
    softwareAssuranceIntent: item["softwareAssuranceIntent"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
  };
}

/** Status of the Software Assurance for the cluster. */
export enum KnownSoftwareAssuranceStatus {
  /** Software Assurance is enabled for the cluster. */
  Enabled = "Enabled",
  /** Software Assurance is disabled for the cluster. */
  Disabled = "Disabled",
}

/**
 * Status of the Software Assurance for the cluster. \
 * {@link KnownSoftwareAssuranceStatus} can be used interchangeably with SoftwareAssuranceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Software Assurance is enabled for the cluster. \
 * **Disabled**: Software Assurance is disabled for the cluster.
 */
export type SoftwareAssuranceStatus = string;

/** Customer Intent for Software Assurance Benefit. */
export enum KnownSoftwareAssuranceIntent {
  /** Customer intends to enable the Software Assurance benefit. */
  Enable = "Enable",
  /** Customer intends to disable the Software Assurance benefit. */
  Disable = "Disable",
}

/**
 * Customer Intent for Software Assurance Benefit. \
 * {@link KnownSoftwareAssuranceIntent} can be used interchangeably with SoftwareAssuranceIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Customer intends to enable the Software Assurance benefit. \
 * **Disable**: Customer intends to disable the Software Assurance benefit.
 */
export type SoftwareAssuranceIntent = string;

/** Log Collection properties of the cluster. */
export interface LogCollectionProperties {
  /** From DateTimeStamp from when logs need to be connected */
  readonly fromDate?: Date;
  /** To DateTimeStamp till when logs need to be connected */
  readonly toDate?: Date;
  /** Recent DateTimeStamp where logs are successfully generated */
  readonly lastLogGenerated?: Date;
  readonly logCollectionSessionDetails?: LogCollectionSession[];
}

export function logCollectionPropertiesSerializer(item: LogCollectionProperties): any {
  return item;
}

export function logCollectionPropertiesDeserializer(item: any): LogCollectionProperties {
  return {
    fromDate: !item["fromDate"] ? item["fromDate"] : new Date(item["fromDate"]),
    toDate: !item["toDate"] ? item["toDate"] : new Date(item["toDate"]),
    lastLogGenerated: !item["lastLogGenerated"]
      ? item["lastLogGenerated"]
      : new Date(item["lastLogGenerated"]),
    logCollectionSessionDetails: !item["logCollectionSessionDetails"]
      ? item["logCollectionSessionDetails"]
      : logCollectionSessionArrayDeserializer(item["logCollectionSessionDetails"]),
  };
}

export function logCollectionSessionArrayDeserializer(result: Array<LogCollectionSession>): any[] {
  return result.map((item) => {
    return logCollectionSessionDeserializer(item);
  });
}

/** Log Collection Session details of the cluster. */
export interface LogCollectionSession {
  /** Start Time of the logs when it was collected */
  readonly logStartTime?: Date;
  /** End Time of the logs when it was collected */
  readonly logEndTime?: Date;
  /** Duration of logs collected */
  readonly timeCollected?: Date;
  /** Size of the logs collected */
  readonly logSize?: number;
  /** LogCollection status */
  readonly logCollectionStatus?: LogCollectionStatus;
  /** CorrelationId of the log collection */
  readonly correlationId?: string;
  /** Specifies the type of log collection job. Determines whether the logs are collected immediately on demand or as part of a scheduled operation. */
  readonly logCollectionJobType?: LogCollectionJobType;
  /** End Time of the logs when it was collected */
  readonly endTimeCollected?: Date;
  /** Log Collection Error details of the cluster. */
  readonly logCollectionError?: LogCollectionError;
}

export function logCollectionSessionDeserializer(item: any): LogCollectionSession {
  return {
    logStartTime: !item["logStartTime"] ? item["logStartTime"] : new Date(item["logStartTime"]),
    logEndTime: !item["logEndTime"] ? item["logEndTime"] : new Date(item["logEndTime"]),
    timeCollected: !item["timeCollected"] ? item["timeCollected"] : new Date(item["timeCollected"]),
    logSize: item["logSize"],
    logCollectionStatus: item["logCollectionStatus"],
    correlationId: item["correlationId"],
    logCollectionJobType: item["logCollectionJobType"],
    endTimeCollected: !item["endTimeCollected"]
      ? item["endTimeCollected"]
      : new Date(item["endTimeCollected"]),
    logCollectionError: !item["logCollectionError"]
      ? item["logCollectionError"]
      : logCollectionErrorDeserializer(item["logCollectionError"]),
  };
}

/** LogCollection status */
export enum KnownLogCollectionStatus {
  /** No log collection has been initiated. */
  None = "None",
  /** Log collection is currently in progress. */
  InProgress = "InProgress",
  /** Log collection has failed. */
  Failed = "Failed",
  /** Log collection completed successfully. */
  Succeeded = "Succeeded",
}

/**
 * LogCollection status \
 * {@link KnownLogCollectionStatus} can be used interchangeably with LogCollectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No log collection has been initiated. \
 * **InProgress**: Log collection is currently in progress. \
 * **Failed**: Log collection has failed. \
 * **Succeeded**: Log collection completed successfully.
 */
export type LogCollectionStatus = string;

/** Specifies the type of log collection job. Determines whether the logs are collected immediately on demand or as part of a scheduled operation. */
export enum KnownLogCollectionJobType {
  /** Log collection is triggered manually and executed immediately. */
  OnDemand = "OnDemand",
  /** Log collection is scheduled to run at a predefined time or interval. */
  Scheduled = "Scheduled",
}

/**
 * Specifies the type of log collection job. Determines whether the logs are collected immediately on demand or as part of a scheduled operation. \
 * {@link KnownLogCollectionJobType} can be used interchangeably with LogCollectionJobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OnDemand**: Log collection is triggered manually and executed immediately. \
 * **Scheduled**: Log collection is scheduled to run at a predefined time or interval.
 */
export type LogCollectionJobType = string;

/** Log Collection Error details of the cluster. */
export interface LogCollectionError {
  /** Error Code of the log collection */
  readonly errorCode?: string;
  /** Error Message of the log collection */
  readonly errorMessage?: string;
}

export function logCollectionErrorDeserializer(item: any): LogCollectionError {
  return {
    errorCode: item["errorCode"],
    errorMessage: item["errorMessage"],
  };
}

/** Remote Support properties of the cluster. */
export interface RemoteSupportProperties {
  /** Remote Support Access Level */
  readonly accessLevel?: AccessLevel;
  /** Expiration DateTimeStamp when Remote Support Access will be expired */
  readonly expirationTimeStamp?: Date;
  /** Remote Support Type for cluster */
  readonly remoteSupportType?: RemoteSupportType;
  readonly remoteSupportNodeSettings?: RemoteSupportNodeSettings[];
  readonly remoteSupportSessionDetails?: PerNodeRemoteSupportSession[];
}

export function remoteSupportPropertiesSerializer(item: RemoteSupportProperties): any {
  return item;
}

export function remoteSupportPropertiesDeserializer(item: any): RemoteSupportProperties {
  return {
    accessLevel: item["accessLevel"],
    expirationTimeStamp: !item["expirationTimeStamp"]
      ? item["expirationTimeStamp"]
      : new Date(item["expirationTimeStamp"]),
    remoteSupportType: item["remoteSupportType"],
    remoteSupportNodeSettings: !item["remoteSupportNodeSettings"]
      ? item["remoteSupportNodeSettings"]
      : remoteSupportNodeSettingsArrayDeserializer(item["remoteSupportNodeSettings"]),
    remoteSupportSessionDetails: !item["remoteSupportSessionDetails"]
      ? item["remoteSupportSessionDetails"]
      : perNodeRemoteSupportSessionArrayDeserializer(item["remoteSupportSessionDetails"]),
  };
}

/** Remote Support Access Level */
export enum KnownAccessLevel {
  /** Allows remote diagnostics operations only. */
  Diagnostics = "Diagnostics",
  /** Allows both remote diagnostics and repair operations. */
  DiagnosticsAndRepair = "DiagnosticsAndRepair",
}

/**
 * Remote Support Access Level \
 * {@link KnownAccessLevel} can be used interchangeably with AccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Diagnostics**: Allows remote diagnostics operations only. \
 * **DiagnosticsAndRepair**: Allows both remote diagnostics and repair operations.
 */
export type AccessLevel = string;

/** Remote Support Type for cluster */
export enum KnownRemoteSupportType {
  /** Enable remote support for the cluster. */
  Enable = "Enable",
  /** Revoke previously enabled remote support for the cluster. */
  Revoke = "Revoke",
}

/**
 * Remote Support Type for cluster \
 * {@link KnownRemoteSupportType} can be used interchangeably with RemoteSupportType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable remote support for the cluster. \
 * **Revoke**: Revoke previously enabled remote support for the cluster.
 */
export type RemoteSupportType = string;

export function remoteSupportNodeSettingsArrayDeserializer(
  result: Array<RemoteSupportNodeSettings>,
): any[] {
  return result.map((item) => {
    return remoteSupportNodeSettingsDeserializer(item);
  });
}

/** Remote Support Node Settings of the cluster. */
export interface RemoteSupportNodeSettings {
  /** Arc ResourceId of the Node */
  readonly arcResourceId?: string;
  /** Remote Support Access Connection State on the Node */
  readonly state?: string;
  /** Remote Support Enablement Request Created TimeStamp on the Node */
  readonly createdAt?: Date;
  /** Remote Support Enablement Request Updated TimeStamp on the Node */
  readonly updatedAt?: Date;
  /** Remote Support Access Connection Status on the Node */
  readonly connectionStatus?: string;
  /** Remote Support Access Connection Error Message on the Node */
  readonly connectionErrorMessage?: string;
  /** Remote Support Transcript location on the node */
  readonly transcriptLocation?: string;
}

export function remoteSupportNodeSettingsDeserializer(item: any): RemoteSupportNodeSettings {
  return {
    arcResourceId: item["arcResourceId"],
    state: item["state"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    connectionStatus: item["connectionStatus"],
    connectionErrorMessage: item["connectionErrorMessage"],
    transcriptLocation: item["transcriptLocation"],
  };
}

export function perNodeRemoteSupportSessionArrayDeserializer(
  result: Array<PerNodeRemoteSupportSession>,
): any[] {
  return result.map((item) => {
    return perNodeRemoteSupportSessionDeserializer(item);
  });
}

/** Remote Support Node Session Details on the Node. */
export interface PerNodeRemoteSupportSession {
  /** Remote Support Session StartTime on the Node */
  readonly sessionStartTime?: Date;
  /** Remote Support Session EndTime on the Node */
  readonly sessionEndTime?: Date;
  /** Name of the node */
  readonly nodeName?: string;
  /** Duration of Remote Support Enablement */
  readonly duration?: number;
  /** Remote Support Access Level */
  readonly accessLevel?: AccessLevel;
}

export function perNodeRemoteSupportSessionDeserializer(item: any): PerNodeRemoteSupportSession {
  return {
    sessionStartTime: !item["sessionStartTime"]
      ? item["sessionStartTime"]
      : new Date(item["sessionStartTime"]),
    sessionEndTime: !item["sessionEndTime"]
      ? item["sessionEndTime"]
      : new Date(item["sessionEndTime"]),
    nodeName: item["nodeName"],
    duration: item["duration"],
    accessLevel: item["accessLevel"],
  };
}

/** Desired properties of the cluster. */
export interface ClusterDesiredProperties {
  /** Desired state of Windows Server Subscription. */
  windowsServerSubscription?: WindowsServerSubscription;
  /** Desired level of diagnostic data emitted by the cluster. */
  diagnosticLevel?: DiagnosticLevel;
}

export function clusterDesiredPropertiesSerializer(item: ClusterDesiredProperties): any {
  return {
    windowsServerSubscription: item["windowsServerSubscription"],
    diagnosticLevel: item["diagnosticLevel"],
  };
}

export function clusterDesiredPropertiesDeserializer(item: any): ClusterDesiredProperties {
  return {
    windowsServerSubscription: item["windowsServerSubscription"],
    diagnosticLevel: item["diagnosticLevel"],
  };
}

/** Desired state of Windows Server Subscription. */
export enum KnownWindowsServerSubscription {
  /** Windows Server Subscription is disabled. */
  Disabled = "Disabled",
  /** Windows Server Subscription is enabled. */
  Enabled = "Enabled",
}

/**
 * Desired state of Windows Server Subscription. \
 * {@link KnownWindowsServerSubscription} can be used interchangeably with WindowsServerSubscription,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Windows Server Subscription is disabled. \
 * **Enabled**: Windows Server Subscription is enabled.
 */
export type WindowsServerSubscription = string;

/** Desired level of diagnostic data emitted by the cluster. */
export enum KnownDiagnosticLevel {
  /** No diagnostic data will be emitted. */
  Off = "Off",
  /** Basic diagnostic data will be emitted, including essential health metrics. */
  Basic = "Basic",
  /** Enhanced diagnostic data will be emitted, including detailed performance and usage metrics. */
  Enhanced = "Enhanced",
}

/**
 * Desired level of diagnostic data emitted by the cluster. \
 * {@link KnownDiagnosticLevel} can be used interchangeably with DiagnosticLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Off**: No diagnostic data will be emitted. \
 * **Basic**: Basic diagnostic data will be emitted, including essential health metrics. \
 * **Enhanced**: Enhanced diagnostic data will be emitted, including detailed performance and usage metrics.
 */
export type DiagnosticLevel = string;

/** Properties reported by cluster agent. */
export interface ClusterReportedProperties {
  /** Name of the on-prem cluster connected to this resource. */
  readonly clusterName?: string;
  /** Unique id generated by the on-prem cluster. */
  readonly clusterId?: string;
  /** Version of the cluster software. */
  readonly clusterVersion?: string;
  /** List of nodes reported by the cluster. */
  readonly nodes?: ClusterNode[];
  /** Last time the cluster reported the data. */
  readonly lastUpdated?: Date;
  /** Specifies the expiration timestamp of the cluster's Managed Service Identity (MSI). The value is expressed in Coordinated Universal Time (UTC). */
  readonly msiExpirationTimeStamp?: Date;
  /** IMDS attestation status of the cluster. */
  readonly imdsAttestation?: ImdsAttestation;
  /** Level of diagnostic data emitted by the cluster. */
  diagnosticLevel?: DiagnosticLevel;
  /** Capabilities supported by the cluster. */
  readonly supportedCapabilities?: string[];
  /** Specifies the type of hardware vendor for all nodes in the cluster. Indicates whether the nodes are provided by Microsoft or a third-party vendor. */
  readonly clusterType?: ClusterNodeType;
  /** The manufacturer of all the nodes of the cluster. */
  readonly manufacturer?: string;
  /** OEM activation status of the cluster. */
  readonly oemActivation?: OemActivation;
  /** Hardware class of the cluster. */
  readonly hardwareClass?: HardwareClass;
}

export function clusterReportedPropertiesDeserializer(item: any): ClusterReportedProperties {
  return {
    clusterName: item["clusterName"],
    clusterId: item["clusterId"],
    clusterVersion: item["clusterVersion"],
    nodes: !item["nodes"] ? item["nodes"] : clusterNodeArrayDeserializer(item["nodes"]),
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    msiExpirationTimeStamp: !item["msiExpirationTimeStamp"]
      ? item["msiExpirationTimeStamp"]
      : new Date(item["msiExpirationTimeStamp"]),
    imdsAttestation: item["imdsAttestation"],
    diagnosticLevel: item["diagnosticLevel"],
    supportedCapabilities: !item["supportedCapabilities"]
      ? item["supportedCapabilities"]
      : item["supportedCapabilities"].map((p: any) => {
          return p;
        }),
    clusterType: item["clusterType"],
    manufacturer: item["manufacturer"],
    oemActivation: item["oemActivation"],
    hardwareClass: item["hardwareClass"],
  };
}

export function clusterNodeArrayDeserializer(result: Array<ClusterNode>): any[] {
  return result.map((item) => {
    return clusterNodeDeserializer(item);
  });
}

/** Cluster node details. */
export interface ClusterNode {
  /** Name of the cluster node. */
  readonly name?: string;
  /** Id of the node in the cluster. */
  readonly id?: number;
  /** State of Windows Server Subscription. */
  readonly windowsServerSubscription?: WindowsServerSubscription;
  /** Type of the cluster node hardware. */
  readonly nodeType?: ClusterNodeType;
  /** Edge Hardware Center Resource Id */
  readonly ehcResourceId?: string;
  /** Manufacturer of the cluster node hardware. */
  readonly manufacturer?: string;
  /** Model name of the cluster node hardware. */
  readonly model?: string;
  /** Operating system running on the cluster node. */
  readonly osName?: string;
  /** Version of the operating system running on the cluster node. */
  readonly osVersion?: string;
  /** Display version of the operating system running on the cluster node. */
  readonly osDisplayVersion?: string;
  /** Immutable id of the cluster node. */
  readonly serialNumber?: string;
  /** Number of physical cores on the cluster node. */
  readonly coreCount?: number;
  /** Total available memory on the cluster node (in GiB). */
  readonly memoryInGiB?: number;
  /** Most recent licensing timestamp. */
  readonly lastLicensingTimestamp?: Date;
  /** OEM activation status of the node. */
  readonly oemActivation?: OemActivation;
}

export function clusterNodeDeserializer(item: any): ClusterNode {
  return {
    name: item["name"],
    id: item["id"],
    windowsServerSubscription: item["windowsServerSubscription"],
    nodeType: item["nodeType"],
    ehcResourceId: item["ehcResourceId"],
    manufacturer: item["manufacturer"],
    model: item["model"],
    osName: item["osName"],
    osVersion: item["osVersion"],
    osDisplayVersion: item["osDisplayVersion"],
    serialNumber: item["serialNumber"],
    coreCount: item["coreCount"],
    memoryInGiB: item["memoryInGiB"],
    lastLicensingTimestamp: !item["lastLicensingTimestamp"]
      ? item["lastLicensingTimestamp"]
      : new Date(item["lastLicensingTimestamp"]),
    oemActivation: item["oemActivation"],
  };
}

/** Specifies the type of hardware vendor for all nodes in the cluster. Indicates whether the nodes are provided by Microsoft or a third-party vendor. */
export enum KnownClusterNodeType {
  /** All nodes in the cluster are provided and managed by Microsoft. */
  FirstParty = "FirstParty",
  /** All nodes in the cluster are provided and managed by a third-party vendor. */
  ThirdParty = "ThirdParty",
}

/**
 * Specifies the type of hardware vendor for all nodes in the cluster. Indicates whether the nodes are provided by Microsoft or a third-party vendor. \
 * {@link KnownClusterNodeType} can be used interchangeably with ClusterNodeType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **FirstParty**: All nodes in the cluster are provided and managed by Microsoft. \
 * **ThirdParty**: All nodes in the cluster are provided and managed by a third-party vendor.
 */
export type ClusterNodeType = string;

/** OEM activation status of the cluster. */
export enum KnownOemActivation {
  /** OEM activation is disabled for the cluster. */
  Disabled = "Disabled",
  /** OEM activation is enabled for the cluster. */
  Enabled = "Enabled",
}

/**
 * OEM activation status of the cluster. \
 * {@link KnownOemActivation} can be used interchangeably with OemActivation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: OEM activation is disabled for the cluster. \
 * **Enabled**: OEM activation is enabled for the cluster.
 */
export type OemActivation = string;

/** IMDS attestation status of the cluster. */
export enum KnownImdsAttestation {
  /** IMDS attestation is disabled for the cluster. */
  Disabled = "Disabled",
  /** IMDS attestation is enabled for the cluster. */
  Enabled = "Enabled",
}

/**
 * IMDS attestation status of the cluster. \
 * {@link KnownImdsAttestation} can be used interchangeably with ImdsAttestation,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: IMDS attestation is disabled for the cluster. \
 * **Enabled**: IMDS attestation is enabled for the cluster.
 */
export type ImdsAttestation = string;

/** Hardware class of the cluster. */
export enum KnownHardwareClass {
  /** The hardware class is small. */
  Small = "Small",
  /** The hardware class is medium. This corresponds to the default */
  Medium = "Medium",
  /** The hardware class is large. */
  Large = "Large",
}

/**
 * Hardware class of the cluster. \
 * {@link KnownHardwareClass} can be used interchangeably with HardwareClass,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Small**: The hardware class is small. \
 * **Medium**: The hardware class is medium. This corresponds to the default \
 * **Large**: The hardware class is large.
 */
export type HardwareClass = string;

/** Attestation configurations for isolated VM (e.g. TVM, CVM) of the cluster. */
export interface IsolatedVmAttestationConfiguration {
  /** Fully qualified Azure resource id of the Microsoft Azure attestation resource associated with this cluster. */
  readonly attestationResourceId?: string;
  /** Region specific endpoint for relying party service. */
  readonly relyingPartyServiceEndpoint?: string;
  /** Region specific endpoint for Microsoft Azure Attestation service for the cluster */
  readonly attestationServiceEndpoint?: string;
}

export function isolatedVmAttestationConfigurationDeserializer(
  item: any,
): IsolatedVmAttestationConfiguration {
  return {
    attestationResourceId: item["attestationResourceId"],
    relyingPartyServiceEndpoint: item["relyingPartyServiceEndpoint"],
    attestationServiceEndpoint: item["attestationServiceEndpoint"],
  };
}

export function secretsLocationDetailsArraySerializer(
  result: Array<SecretsLocationDetails>,
): any[] {
  return result.map((item) => {
    return secretsLocationDetailsSerializer(item);
  });
}

export function secretsLocationDetailsArrayDeserializer(
  result: Array<SecretsLocationDetails>,
): any[] {
  return result.map((item) => {
    return secretsLocationDetailsDeserializer(item);
  });
}

/** Secrets location details */
export interface SecretsLocationDetails {
  /** Type of secrets to store */
  secretsType: SecretsType;
  /** secrets location */
  secretsLocation: string;
}

export function secretsLocationDetailsSerializer(item: SecretsLocationDetails): any {
  return { secretsType: item["secretsType"], secretsLocation: item["secretsLocation"] };
}

export function secretsLocationDetailsDeserializer(item: any): SecretsLocationDetails {
  return {
    secretsType: item["secretsType"],
    secretsLocation: item["secretsLocation"],
  };
}

/** Type of secrets to store */
export enum KnownSecretsType {
  /** Backup secrets type */
  BackupSecrets = "BackupSecrets",
}

/**
 * Type of secrets to store \
 * {@link KnownSecretsType} can be used interchangeably with SecretsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BackupSecrets**: Backup secrets type
 */
export type SecretsType = string;

/** Supported Storage Pattern for HCI Cluster */
export enum KnownClusterPattern {
  /** Standard cluster. */
  Standard = "Standard",
  /** RackAware cluster. */
  RackAware = "RackAware",
}

/**
 * Supported Storage Pattern for HCI Cluster \
 * {@link KnownClusterPattern} can be used interchangeably with ClusterPattern,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard cluster. \
 * **RackAware**: RackAware cluster.
 */
export type ClusterPattern = string;

/** Represents the Confidential Virtual Machine (CVM) support intent and current status for the cluster resource. */
export interface ConfidentialVmProperties {
  /** Captures the customer's intent to enable or disable CVM support on the cluster, either during initial deployment (Day-0) or at a later stage (Day-N). */
  readonly confidentialVmIntent?: ConfidentialVmIntent;
  /** Captures the current status of CVM support on the cluster. */
  readonly confidentialVmStatus?: ConfidentialVmStatus;
  /** Additional context about CVM support on the cluster, such as reasons for partial enablement or hardware constraints. */
  readonly confidentialVmStatusSummary?: string;
}

export function confidentialVmPropertiesDeserializer(item: any): ConfidentialVmProperties {
  return {
    confidentialVmIntent: item["confidentialVmIntent"],
    confidentialVmStatus: item["confidentialVmStatus"],
    confidentialVmStatusSummary: item["confidentialVmStatusSummary"],
  };
}

/** Captures the customer's intent to enable or disable Confidential Virtual Machine (CVM) support on the cluster, either during initial deployment (Day-0) or at a later stage (Day-N). */
export enum KnownConfidentialVmIntent {
  /** Indicates that the customer intends to enable CVM support on the cluster. */
  Enable = "Enable",
  /** Indicates that the customer intends to disable CVM support on the cluster. */
  Disable = "Disable",
}

/**
 * Captures the customer's intent to enable or disable Confidential Virtual Machine (CVM) support on the cluster, either during initial deployment (Day-0) or at a later stage (Day-N). \
 * {@link KnownConfidentialVmIntent} can be used interchangeably with ConfidentialVmIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Indicates that the customer intends to enable CVM support on the cluster. \
 * **Disable**: Indicates that the customer intends to disable CVM support on the cluster.
 */
export type ConfidentialVmIntent = string;

/** Captures the current status of Confidential Virtual Machine (CVM) support on the cluster. */
export enum KnownConfidentialVmStatus {
  /** CVM support is fully enabled on the cluster. All nodes are CVM capable. */
  Enabled = "Enabled",
  /** CVM support is partially enabled. At least one node in the cluster is CVM capable. */
  PartiallyEnabled = "PartiallyEnabled",
  /** CVM support is disabled. None of the nodes in the cluster are CVM capable. */
  Disabled = "Disabled",
}

/**
 * Captures the current status of Confidential Virtual Machine (CVM) support on the cluster. \
 * {@link KnownConfidentialVmStatus} can be used interchangeably with ConfidentialVmStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: CVM support is fully enabled on the cluster. All nodes are CVM capable. \
 * **PartiallyEnabled**: CVM support is partially enabled. At least one node in the cluster is CVM capable. \
 * **Disabled**: CVM support is disabled. None of the nodes in the cluster are CVM capable.
 */
export type ConfidentialVmStatus = string;

/** Represents the Software Defined Networking (SDN) configuration state of the Azure Stack HCI cluster. */
export interface ClusterSdnProperties extends SdnProperties {
  /** Indicates whether Software Defined Networking (SDN) integration should be enabled or disabled for this deployment. */
  readonly sdnIntegrationIntent?: SdnIntegrationIntent;
}

export function clusterSdnPropertiesDeserializer(item: any): ClusterSdnProperties {
  return {
    sdnStatus: item["sdnStatus"],
    sdnDomainName: item["sdnDomainName"],
    sdnApiAddress: item["sdnApiAddress"],
    sdnIntegrationIntent: item["sdnIntegrationIntent"],
  };
}

/** Indicates whether Software Defined Networking (SDN) integration should be enabled or disabled for this deployment. */
export enum KnownSdnIntegrationIntent {
  /** Enable SDN integration for the deployment. */
  Enable = "Enable",
  /** Disable SDN integration for the deployment. */
  Disable = "Disable",
}

/**
 * Indicates whether Software Defined Networking (SDN) integration should be enabled or disabled for this deployment. \
 * {@link KnownSdnIntegrationIntent} can be used interchangeably with SdnIntegrationIntent,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enable**: Enable SDN integration for the deployment. \
 * **Disable**: Disable SDN integration for the deployment.
 */
export type SdnIntegrationIntent = string;

export function localAvailabilityZonesArraySerializer(
  result: Array<LocalAvailabilityZones>,
): any[] {
  return result.map((item) => {
    return localAvailabilityZonesSerializer(item);
  });
}

export function localAvailabilityZonesArrayDeserializer(
  result: Array<LocalAvailabilityZones>,
): any[] {
  return result.map((item) => {
    return localAvailabilityZonesDeserializer(item);
  });
}

/** Local Availability Zone information for HCI cluster */
export interface LocalAvailabilityZones {
  /** Local Availability Zone name for HCI cluster */
  localAvailabilityZoneName?: string;
  /** Nodes belonging to a particular zone */
  nodes?: string[];
}

export function localAvailabilityZonesSerializer(item: LocalAvailabilityZones): any {
  return {
    localAvailabilityZoneName: item["localAvailabilityZoneName"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : item["nodes"].map((p: any) => {
          return p;
        }),
  };
}

export function localAvailabilityZonesDeserializer(item: any): LocalAvailabilityZones {
  return {
    localAvailabilityZoneName: item["localAvailabilityZoneName"],
    nodes: !item["nodes"]
      ? item["nodes"]
      : item["nodes"].map((p: any) => {
          return p;
        }),
  };
}

/** Identity Provider for the cluster */
export enum KnownIdentityProvider {
  /** Uses Active Directory as the identity provider, enabling domain-based authentication and centralized identity management. This is the default option. */
  ActiveDirectory = "ActiveDirectory",
  /** Uses a local identity system integrated with Azure Key Vault for authentication. Suitable for AD-less environments where Active Directory is not available or required. */
  LocalIdentity = "LocalIdentity",
}

/**
 * Identity Provider for the cluster \
 * {@link KnownIdentityProvider} can be used interchangeably with IdentityProvider,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**: Uses Active Directory as the identity provider, enabling domain-based authentication and centralized identity management. This is the default option. \
 * **LocalIdentity**: Uses a local identity system integrated with Azure Key Vault for authentication. Suitable for AD-less environments where Active Directory is not available or required.
 */
export type IdentityProvider = string;

/** Managed service identity (system assigned and/or user assigned identities) */
export interface ManagedServiceIdentity {
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
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

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return item;
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
  };
}

/** Represents the Software Defined Networking (SDN) configuration state. */
export interface SdnProperties {
  /** Indicates the current Software Defined Networking (SDN) status of the resource, which may be an individual device or a cluster. */
  readonly sdnStatus?: SdnStatus;
  /** The fully qualified domain name (FQDN) associated with the SDN deployment. This value is propagated from the Device Management Extension to the cluster resource. It is typically in the format `<sdnPrefix>-nc.<domain>` when SDN is enabled. May be null or absent in unsupported or disabled states. */
  readonly sdnDomainName?: string;
  /** Represents the API address for the SDN deployment. */
  readonly sdnApiAddress?: string;
}

export function sdnPropertiesDeserializer(item: any): SdnProperties {
  return {
    sdnStatus: item["sdnStatus"],
    sdnDomainName: item["sdnDomainName"],
    sdnApiAddress: item["sdnApiAddress"],
  };
}

/** Indicates the current Software Defined Networking (SDN) status of the resource, which may be an individual device or a cluster. */
export enum KnownSdnStatus {
  /** The SDN status could not be determined due to a failure in querying the SDN API service. This may occur if the query script fails or if the system is in an inconsistent state. The domain name will be null in this case. */
  Unknown = "Unknown",
  /** SDN is not enabled on the resource. The domain name will be null. This is the default state when SDN has not been configured. */
  Disabled = "Disabled",
  /** SDN is successfully enabled on the resource. The domain name will be populated in the format `<sdnPrefix>-nc.<domain>`. Customers may need to manage DNS settings to ensure proper resolution. */
  Enabled = "Enabled",
}

/**
 * Indicates the current Software Defined Networking (SDN) status of the resource, which may be an individual device or a cluster. \
 * {@link KnownSdnStatus} can be used interchangeably with SdnStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The SDN status could not be determined due to a failure in querying the SDN API service. This may occur if the query script fails or if the system is in an inconsistent state. The domain name will be null in this case. \
 * **Disabled**: SDN is not enabled on the resource. The domain name will be null. This is the default state when SDN has not been configured. \
 * **Enabled**: SDN is successfully enabled on the resource. The domain name will be populated in the format `<sdnPrefix>-nc.<domain>`. Customers may need to manage DNS settings to ensure proper resolution.
 */
export type SdnStatus = string;

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

/** Cluster details to update. */
export interface ClusterPatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The service principal ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant ID of the system assigned identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity assigned to this resource. */
  type?: ManagedServiceIdentityType;
  /** The identities assigned to this resource by the user. */
  userAssignedIdentities?: Record<string, UserAssignedIdentity | null>;
  /** Endpoint configured for management from the Azure portal */
  cloudManagementEndpoint?: string;
  /** App id of cluster AAD identity. */
  aadClientId?: string;
  /** Tenant id of cluster AAD identity. */
  aadTenantId?: string;
  /** Desired properties of the cluster. */
  desiredProperties?: ClusterDesiredProperties;
}

export function clusterPatchSerializer(item: ClusterPatch): any {
  return {
    tags: item["tags"],
    identity: areAllPropsUndefined(item, ["type", "userAssignedIdentities"])
      ? undefined
      : _clusterPatchIdentitySerializer(item),
    properties: areAllPropsUndefined(item, [
      "cloudManagementEndpoint",
      "aadClientId",
      "aadTenantId",
      "desiredProperties",
    ])
      ? undefined
      : _clusterPatchPropertiesSerializer(item),
  };
}

/** Cluster properties. */
export interface ClusterPatchProperties {
  /** Endpoint configured for management from the Azure portal */
  cloudManagementEndpoint?: string;
  /** App id of cluster AAD identity. */
  aadClientId?: string;
  /** Tenant id of cluster AAD identity. */
  aadTenantId?: string;
  /** Desired properties of the cluster. */
  desiredProperties?: ClusterDesiredProperties;
}

export function clusterPatchPropertiesSerializer(item: ClusterPatchProperties): any {
  return {
    cloudManagementEndpoint: item["cloudManagementEndpoint"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    desiredProperties: !item["desiredProperties"]
      ? item["desiredProperties"]
      : clusterDesiredPropertiesSerializer(item["desiredProperties"]),
  };
}

/** List of clusters. */
export interface _ClusterList {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListDeserializer(item: any): _ClusterList {
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

/** Update secrets locations change  Request. */
export interface SecretsLocationsChangeRequest {
  /** List of secret locations */
  properties?: SecretsLocationDetails[];
}

export function secretsLocationsChangeRequestSerializer(item: SecretsLocationsChangeRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : secretsLocationDetailsArraySerializer(item["properties"]),
  };
}

/** model interface UploadCertificateRequest */
export interface UploadCertificateRequest {
  properties?: RawCertificateData;
}

export function uploadCertificateRequestSerializer(item: UploadCertificateRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : rawCertificateDataSerializer(item["properties"]),
  };
}

/** model interface RawCertificateData */
export interface RawCertificateData {
  certificates?: string[];
}

export function rawCertificateDataSerializer(item: RawCertificateData): any {
  return {
    certificates: !item["certificates"]
      ? item["certificates"]
      : item["certificates"].map((p: any) => {
          return p;
        }),
  };
}

/** Cluster Identity details. */
export interface ClusterIdentityResponse {
  aadClientId?: string;
  aadTenantId?: string;
  aadServicePrincipalObjectId?: string;
  aadApplicationObjectId?: string;
}

export function clusterIdentityResponseDeserializer(item: any): ClusterIdentityResponse {
  return {
    ...(!item["properties"]
      ? item["properties"]
      : _clusterIdentityResponsePropertiesDeserializer(item["properties"])),
  };
}

/** model interface ClusterIdentityResponseProperties */
export interface ClusterIdentityResponseProperties {
  aadClientId?: string;
  aadTenantId?: string;
  aadServicePrincipalObjectId?: string;
  aadApplicationObjectId?: string;
}

export function clusterIdentityResponsePropertiesDeserializer(
  item: any,
): ClusterIdentityResponseProperties {
  return {
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    aadServicePrincipalObjectId: item["aadServicePrincipalObjectId"],
    aadApplicationObjectId: item["aadApplicationObjectId"],
  };
}

/** model interface SoftwareAssuranceChangeRequest */
export interface SoftwareAssuranceChangeRequest {
  properties?: SoftwareAssuranceChangeRequestProperties;
}

export function softwareAssuranceChangeRequestSerializer(
  item: SoftwareAssuranceChangeRequest,
): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : softwareAssuranceChangeRequestPropertiesSerializer(item["properties"]),
  };
}

/** model interface SoftwareAssuranceChangeRequestProperties */
export interface SoftwareAssuranceChangeRequestProperties {
  /** Customer Intent for Software Assurance Benefit. This indicates whether the customer wishes to opt in or out of the Software Assurance program, which provides licensing and support benefits. */
  softwareAssuranceIntent?: SoftwareAssuranceIntent;
}

export function softwareAssuranceChangeRequestPropertiesSerializer(
  item: SoftwareAssuranceChangeRequestProperties,
): any {
  return { softwareAssuranceIntent: item["softwareAssuranceIntent"] };
}

/** model interface ChangeRingRequest */
export interface ChangeRingRequest {
  properties?: ChangeRingRequestProperties;
}

export function changeRingRequestSerializer(item: ChangeRingRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : changeRingRequestPropertiesSerializer(item["properties"]),
  };
}

/** model interface ChangeRingRequestProperties */
export interface ChangeRingRequestProperties {
  /** The target ring for the cluster. */
  targetRing?: string;
}

export function changeRingRequestPropertiesSerializer(item: ChangeRingRequestProperties): any {
  return { targetRing: item["targetRing"] };
}

/** Log Collection Request */
export interface LogCollectionRequest {
  /** Properties for Log Collection Request */
  properties?: LogCollectionRequestProperties;
}

export function logCollectionRequestSerializer(item: LogCollectionRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : logCollectionRequestPropertiesSerializer(item["properties"]),
  };
}

/** Properties for Log Collection Request */
export interface LogCollectionRequestProperties {
  /** From DateTimeStamp from when logs need to be connected */
  fromDate: Date;
  /** To DateTimeStamp till when logs need to be connected */
  toDate: Date;
}

export function logCollectionRequestPropertiesSerializer(
  item: LogCollectionRequestProperties,
): any {
  return { fromDate: item["fromDate"].toISOString(), toDate: item["toDate"].toISOString() };
}

/** Remote Support Request */
export interface RemoteSupportRequest {
  /** Properties for Remote Support Request */
  properties?: RemoteSupportRequestProperties;
}

export function remoteSupportRequestSerializer(item: RemoteSupportRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : remoteSupportRequestPropertiesSerializer(item["properties"]),
  };
}

/** Properties for Remote Support Request */
export interface RemoteSupportRequestProperties {
  /** Remote Support Access Level */
  readonly accessLevel?: AccessLevel;
  /** Expiration DateTimeStamp when Remote Support Access will be expired */
  expirationTimeStamp?: Date;
  /** Remote Support Type for cluster */
  remoteSupportType?: RemoteSupportType;
}

export function remoteSupportRequestPropertiesSerializer(
  item: RemoteSupportRequestProperties,
): any {
  return {
    expirationTimeStamp: !item["expirationTimeStamp"]
      ? item["expirationTimeStamp"]
      : item["expirationTimeStamp"].toISOString(),
    remoteSupportType: item["remoteSupportType"],
  };
}

/** Edge device resource */
export interface DeploymentSetting extends ProxyResource {
  /** DeploymentSetting provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Azure resource ids of Arc machines to be part of cluster. */
  arcNodeResourceIds?: string[];
  /** The deployment mode for cluster deployment. */
  deploymentMode?: DeploymentMode;
  /** The intended operation for a cluster. */
  operationType?: OperationType;
  /** Scale units will contains list of deployment data */
  deploymentConfiguration?: DeploymentConfiguration;
  /** Deployment Status reported from cluster. */
  readonly reportedProperties?: EceReportedProperties;
}

export function deploymentSettingSerializer(item: DeploymentSetting): any {
  return {
    properties: areAllPropsUndefined(item, [
      "arcNodeResourceIds",
      "deploymentMode",
      "operationType",
      "deploymentConfiguration",
    ])
      ? undefined
      : _deploymentSettingPropertiesSerializer(item),
  };
}

export function deploymentSettingDeserializer(item: any): DeploymentSetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _deploymentSettingPropertiesDeserializer(item["properties"])),
  };
}

/** DeploymentSetting properties */
export interface DeploymentSettingsProperties {
  /** DeploymentSetting provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Azure resource ids of Arc machines to be part of cluster. */
  arcNodeResourceIds: string[];
  /** The deployment mode for cluster deployment. */
  deploymentMode: DeploymentMode;
  /** The intended operation for a cluster. */
  operationType?: OperationType;
  /** Scale units will contains list of deployment data */
  deploymentConfiguration: DeploymentConfiguration;
  /** Deployment Status reported from cluster. */
  readonly reportedProperties?: EceReportedProperties;
}

export function deploymentSettingsPropertiesSerializer(item: DeploymentSettingsProperties): any {
  return {
    arcNodeResourceIds: item["arcNodeResourceIds"].map((p: any) => {
      return p;
    }),
    deploymentMode: item["deploymentMode"],
    operationType: item["operationType"],
    deploymentConfiguration: deploymentConfigurationSerializer(item["deploymentConfiguration"]),
  };
}

export function deploymentSettingsPropertiesDeserializer(item: any): DeploymentSettingsProperties {
  return {
    provisioningState: item["provisioningState"],
    arcNodeResourceIds: item["arcNodeResourceIds"].map((p: any) => {
      return p;
    }),
    deploymentMode: item["deploymentMode"],
    operationType: item["operationType"],
    deploymentConfiguration: deploymentConfigurationDeserializer(item["deploymentConfiguration"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : eceReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Deployment mode to trigger job. */
export enum KnownDeploymentMode {
  /** Validate ECE action deployment for a cluster. */
  Validate = "Validate",
  /** Deploy ECE action deployment for a cluster. */
  Deploy = "Deploy",
}

/**
 * Deployment mode to trigger job. \
 * {@link KnownDeploymentMode} can be used interchangeably with DeploymentMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Validate**: Validate ECE action deployment for a cluster. \
 * **Deploy**: Deploy ECE action deployment for a cluster.
 */
export type DeploymentMode = string;

/** The intended operation for a cluster. */
export enum KnownOperationType {
  /** Cluster provisioning operation. */
  ClusterProvisioning = "ClusterProvisioning",
  /** Cluster upgrade operation. */
  ClusterUpgrade = "ClusterUpgrade",
}

/**
 * The intended operation for a cluster. \
 * {@link KnownOperationType} can be used interchangeably with OperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClusterProvisioning**: Cluster provisioning operation. \
 * **ClusterUpgrade**: Cluster upgrade operation.
 */
export type OperationType = string;

/** Deployment Configuration */
export interface DeploymentConfiguration {
  /** deployment template version */
  version?: string;
  /** Scale units will contains list of deployment data */
  scaleUnits: ScaleUnits[];
}

export function deploymentConfigurationSerializer(item: DeploymentConfiguration): any {
  return { version: item["version"], scaleUnits: scaleUnitsArraySerializer(item["scaleUnits"]) };
}

export function deploymentConfigurationDeserializer(item: any): DeploymentConfiguration {
  return {
    version: item["version"],
    scaleUnits: scaleUnitsArrayDeserializer(item["scaleUnits"]),
  };
}

export function scaleUnitsArraySerializer(result: Array<ScaleUnits>): any[] {
  return result.map((item) => {
    return scaleUnitsSerializer(item);
  });
}

export function scaleUnitsArrayDeserializer(result: Array<ScaleUnits>): any[] {
  return result.map((item) => {
    return scaleUnitsDeserializer(item);
  });
}

/** Scale units will contains list of deployment data */
export interface ScaleUnits {
  /** Deployment Data to deploy AzureStackHCI Cluster. */
  deploymentData: DeploymentData;
  /** Solution builder extension (SBE) partner properties */
  sbePartnerInfo?: SbePartnerInfo;
}

export function scaleUnitsSerializer(item: ScaleUnits): any {
  return {
    deploymentData: deploymentDataSerializer(item["deploymentData"]),
    sbePartnerInfo: !item["sbePartnerInfo"]
      ? item["sbePartnerInfo"]
      : sbePartnerInfoSerializer(item["sbePartnerInfo"]),
  };
}

export function scaleUnitsDeserializer(item: any): ScaleUnits {
  return {
    deploymentData: deploymentDataDeserializer(item["deploymentData"]),
    sbePartnerInfo: !item["sbePartnerInfo"]
      ? item["sbePartnerInfo"]
      : sbePartnerInfoDeserializer(item["sbePartnerInfo"]),
  };
}

/** The Deployment data of AzureStackHCI Cluster. */
export interface DeploymentData {
  /** SecuritySettings to deploy AzureStackHCI Cluster. */
  securitySettings?: DeploymentSecuritySettings;
  /** Observability config to deploy AzureStackHCI Cluster. */
  observability?: Observability;
  /** Observability config to deploy AzureStackHCI Cluster. */
  cluster?: DeploymentCluster;
  /** Identity Provider for the cluster */
  identityProvider?: IdentityProvider;
  /** Storage config to deploy AzureStackHCI Cluster. */
  storage?: Storage;
  /** naming prefix to deploy cluster. */
  namingPrefix?: string;
  /** FQDN to deploy cluster */
  domainFqdn?: string;
  /** InfrastructureNetwork config to deploy AzureStackHCI Cluster. */
  infrastructureNetwork?: InfrastructureNetwork[];
  /** list of physical nodes config to deploy AzureStackHCI Cluster. */
  physicalNodes?: PhysicalNodes[];
  /** HostNetwork config to deploy AzureStackHCI Cluster. */
  hostNetwork?: DeploymentSettingHostNetwork;
  /** SDN Integration config to deploy AzureStackHCI Cluster. */
  sdnIntegration?: SdnIntegration;
  /** Is Management Cluster, when true indicates that the cluster is used for managing other clusters */
  isManagementCluster?: boolean;
  /** The path to the Active Directory Organizational Unit container object prepared for the deployment. */
  adouPath?: string;
  /** Azure key vault endpoint. This property is deprecated from 2023-12-01-preview. Please use secrets property instead. */
  secretsLocation?: string;
  /** secrets used for cloud deployment. */
  secrets?: EceDeploymentSecrets[];
  /** OptionalServices config to deploy AzureStackHCI Cluster. */
  optionalServices?: OptionalServices;
  /** Local Availability Zone information for HCI cluster */
  localAvailabilityZones?: LocalAvailabilityZones[];
  /** Assembly Package details for Validated Solution Recipe for AzureStackHCI Cluster */
  assemblyInfo?: AssemblyInfo;
}

export function deploymentDataSerializer(item: DeploymentData): any {
  return {
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : deploymentSecuritySettingsSerializer(item["securitySettings"]),
    observability: !item["observability"]
      ? item["observability"]
      : observabilitySerializer(item["observability"]),
    cluster: !item["cluster"] ? item["cluster"] : deploymentClusterSerializer(item["cluster"]),
    identityProvider: item["identityProvider"],
    storage: !item["storage"] ? item["storage"] : storageSerializer(item["storage"]),
    namingPrefix: item["namingPrefix"],
    domainFqdn: item["domainFqdn"],
    infrastructureNetwork: !item["infrastructureNetwork"]
      ? item["infrastructureNetwork"]
      : infrastructureNetworkArraySerializer(item["infrastructureNetwork"]),
    physicalNodes: !item["physicalNodes"]
      ? item["physicalNodes"]
      : physicalNodesArraySerializer(item["physicalNodes"]),
    hostNetwork: !item["hostNetwork"]
      ? item["hostNetwork"]
      : deploymentSettingHostNetworkSerializer(item["hostNetwork"]),
    sdnIntegration: !item["sdnIntegration"]
      ? item["sdnIntegration"]
      : sdnIntegrationSerializer(item["sdnIntegration"]),
    isManagementCluster: item["isManagementCluster"],
    adouPath: item["adouPath"],
    secretsLocation: item["secretsLocation"],
    secrets: !item["secrets"]
      ? item["secrets"]
      : eceDeploymentSecretsArraySerializer(item["secrets"]),
    optionalServices: !item["optionalServices"]
      ? item["optionalServices"]
      : optionalServicesSerializer(item["optionalServices"]),
    localAvailabilityZones: !item["localAvailabilityZones"]
      ? item["localAvailabilityZones"]
      : localAvailabilityZonesArraySerializer(item["localAvailabilityZones"]),
    assemblyInfo: !item["assemblyInfo"]
      ? item["assemblyInfo"]
      : assemblyInfoSerializer(item["assemblyInfo"]),
  };
}

export function deploymentDataDeserializer(item: any): DeploymentData {
  return {
    securitySettings: !item["securitySettings"]
      ? item["securitySettings"]
      : deploymentSecuritySettingsDeserializer(item["securitySettings"]),
    observability: !item["observability"]
      ? item["observability"]
      : observabilityDeserializer(item["observability"]),
    cluster: !item["cluster"] ? item["cluster"] : deploymentClusterDeserializer(item["cluster"]),
    identityProvider: item["identityProvider"],
    storage: !item["storage"] ? item["storage"] : storageDeserializer(item["storage"]),
    namingPrefix: item["namingPrefix"],
    domainFqdn: item["domainFqdn"],
    infrastructureNetwork: !item["infrastructureNetwork"]
      ? item["infrastructureNetwork"]
      : infrastructureNetworkArrayDeserializer(item["infrastructureNetwork"]),
    physicalNodes: !item["physicalNodes"]
      ? item["physicalNodes"]
      : physicalNodesArrayDeserializer(item["physicalNodes"]),
    hostNetwork: !item["hostNetwork"]
      ? item["hostNetwork"]
      : deploymentSettingHostNetworkDeserializer(item["hostNetwork"]),
    sdnIntegration: !item["sdnIntegration"]
      ? item["sdnIntegration"]
      : sdnIntegrationDeserializer(item["sdnIntegration"]),
    isManagementCluster: item["isManagementCluster"],
    adouPath: item["adouPath"],
    secretsLocation: item["secretsLocation"],
    secrets: !item["secrets"]
      ? item["secrets"]
      : eceDeploymentSecretsArrayDeserializer(item["secrets"]),
    optionalServices: !item["optionalServices"]
      ? item["optionalServices"]
      : optionalServicesDeserializer(item["optionalServices"]),
    localAvailabilityZones: !item["localAvailabilityZones"]
      ? item["localAvailabilityZones"]
      : localAvailabilityZonesArrayDeserializer(item["localAvailabilityZones"]),
    assemblyInfo: !item["assemblyInfo"]
      ? item["assemblyInfo"]
      : assemblyInfoDeserializer(item["assemblyInfo"]),
  };
}

/** The SecuritySettings of AzureStackHCI Cluster. */
export interface DeploymentSecuritySettings {
  /** By default, Hypervisor-protected Code Integrity is enabled on your Azure HCI cluster. */
  hvciProtection?: boolean;
  /** By default, Secure Boot is enabled on your Azure HCI cluster. This setting is hardware dependent. */
  drtmProtection?: boolean;
  /** When set to true, the security baseline is re-applied regularly. */
  driftControlEnforced?: boolean;
  /** When set to true, Credential Guard is enabled. */
  credentialGuardEnforced?: boolean;
  /** When set to true, the SMB default instance requires sign in for the client and server services. */
  smbSigningEnforced?: boolean;
  /** When set to true, cluster east-west traffic is encrypted. */
  smbClusterEncryption?: boolean;
  /** When set to true, all the side channel mitigations are enabled */
  sideChannelMitigationEnforced?: boolean;
  /** When set to true, BitLocker XTS_AES 256-bit encryption is enabled for all data-at-rest on the OS volume of your Azure Stack HCI cluster. This setting is TPM-hardware dependent. */
  bitlockerBootVolume?: boolean;
  /** When set to true, BitLocker XTS-AES 256-bit encryption is enabled for all data-at-rest on your Azure Stack HCI cluster shared volumes. */
  bitlockerDataVolumes?: boolean;
  /** WDAC is enabled by default and limits the applications and the code that you can run on your Azure Stack HCI cluster. */
  wdacEnforced?: boolean;
}

export function deploymentSecuritySettingsSerializer(item: DeploymentSecuritySettings): any {
  return {
    hvciProtection: item["hvciProtection"],
    drtmProtection: item["drtmProtection"],
    driftControlEnforced: item["driftControlEnforced"],
    credentialGuardEnforced: item["credentialGuardEnforced"],
    smbSigningEnforced: item["smbSigningEnforced"],
    smbClusterEncryption: item["smbClusterEncryption"],
    sideChannelMitigationEnforced: item["sideChannelMitigationEnforced"],
    bitlockerBootVolume: item["bitlockerBootVolume"],
    bitlockerDataVolumes: item["bitlockerDataVolumes"],
    wdacEnforced: item["wdacEnforced"],
  };
}

export function deploymentSecuritySettingsDeserializer(item: any): DeploymentSecuritySettings {
  return {
    hvciProtection: item["hvciProtection"],
    drtmProtection: item["drtmProtection"],
    driftControlEnforced: item["driftControlEnforced"],
    credentialGuardEnforced: item["credentialGuardEnforced"],
    smbSigningEnforced: item["smbSigningEnforced"],
    smbClusterEncryption: item["smbClusterEncryption"],
    sideChannelMitigationEnforced: item["sideChannelMitigationEnforced"],
    bitlockerBootVolume: item["bitlockerBootVolume"],
    bitlockerDataVolumes: item["bitlockerDataVolumes"],
    wdacEnforced: item["wdacEnforced"],
  };
}

/** The Observability of AzureStackHCI Cluster. */
export interface Observability {
  /** Enables telemetry data to be sent to Microsoft */
  streamingDataClient?: boolean;
  /** Location of your cluster. The log and diagnostic data is sent to the appropriate diagnostics servers depending upon where your cluster resides. Setting this to false results in all data sent to Microsoft to be stored outside of the EU. */
  euLocation?: boolean;
  /** When set to true, collects log data to facilitate quicker issue resolution. */
  episodicDataUpload?: boolean;
}

export function observabilitySerializer(item: Observability): any {
  return {
    streamingDataClient: item["streamingDataClient"],
    euLocation: item["euLocation"],
    episodicDataUpload: item["episodicDataUpload"],
  };
}

export function observabilityDeserializer(item: any): Observability {
  return {
    streamingDataClient: item["streamingDataClient"],
    euLocation: item["euLocation"],
    episodicDataUpload: item["episodicDataUpload"],
  };
}

/** AzureStackHCI Cluster deployment properties. */
export interface DeploymentCluster {
  /** The cluster name provided when preparing Active Directory. */
  name?: string;
  /** Use a cloud witness if you have internet access and if you use an Azure Storage account to provide a vote on cluster quorum. A cloud witness uses Azure Blob Storage to read or write a blob file and then uses it to arbitrate in split-brain resolution. Only allowed values are 'Cloud', 'FileShare'. */
  witnessType?: string;
  /** Specify the fileshare path for the local witness for your Azure Stack HCI cluster. */
  witnessPath?: string;
  /** Specify the Azure Storage account name for cloud witness for your Azure Stack HCI cluster. */
  cloudAccountName?: string;
  /** For Azure blob service endpoint type, select either Default or Custom domain. If you selected **Custom domain, enter the domain for the blob service in this format core.windows.net. */
  azureServiceEndpoint?: string;
  /** Hardware class of the cluster. */
  readonly hardwareClass?: HardwareClass;
  /** Cluster Pattern supported. */
  clusterPattern?: ClusterPattern;
}

export function deploymentClusterSerializer(item: DeploymentCluster): any {
  return {
    name: item["name"],
    witnessType: item["witnessType"],
    witnessPath: item["witnessPath"],
    cloudAccountName: item["cloudAccountName"],
    azureServiceEndpoint: item["azureServiceEndpoint"],
    clusterPattern: item["clusterPattern"],
  };
}

export function deploymentClusterDeserializer(item: any): DeploymentCluster {
  return {
    name: item["name"],
    witnessType: item["witnessType"],
    witnessPath: item["witnessPath"],
    cloudAccountName: item["cloudAccountName"],
    azureServiceEndpoint: item["azureServiceEndpoint"],
    hardwareClass: item["hardwareClass"],
    clusterPattern: item["clusterPattern"],
  };
}

/** The Storage config of AzureStackHCI Cluster. */
export interface Storage {
  /** By default, this mode is set to Express and your storage is configured as per best practices based on the number of nodes in the cluster. Allowed values are 'Express','InfraOnly', 'KeepStorage' */
  configurationMode?: string;
}

export function storageSerializer(item: Storage): any {
  return { configurationMode: item["configurationMode"] };
}

export function storageDeserializer(item: any): Storage {
  return {
    configurationMode: item["configurationMode"],
  };
}

export function infrastructureNetworkArraySerializer(result: Array<InfrastructureNetwork>): any[] {
  return result.map((item) => {
    return infrastructureNetworkSerializer(item);
  });
}

export function infrastructureNetworkArrayDeserializer(
  result: Array<InfrastructureNetwork>,
): any[] {
  return result.map((item) => {
    return infrastructureNetworkDeserializer(item);
  });
}

/** The InfrastructureNetwork of a AzureStackHCI Cluster. */
export interface InfrastructureNetwork {
  /** Subnet mask that matches the provided IP address space. */
  subnetMask?: string;
  /** Default gateway that should be used for the provided IP address space. */
  gateway?: string;
  /** Range of IP addresses from which addresses are allocated for nodes within a subnet. */
  ipPools?: IpPools[];
  /** Specifies how DNS servers are configured for the infrastructure network. Allowed values are 'UseDnsServer' to use the provided DNS servers, and 'UseForwarder' to use DNS forwarders. */
  dnsServerConfig?: DnsServerConfig;
  /** Details of the DNS Zones to be configured. */
  dnsZones?: DnsZones[];
  /** IPv4 address of the DNS servers in your environment. */
  dnsServers?: string[];
  /** Allows customers to use DHCP for Hosts and Cluster IPs. If not declared, the deployment will default to static IPs. When true, GW and DNS servers are not required */
  useDhcp?: boolean;
}

export function infrastructureNetworkSerializer(item: InfrastructureNetwork): any {
  return {
    subnetMask: item["subnetMask"],
    gateway: item["gateway"],
    ipPools: !item["ipPools"] ? item["ipPools"] : ipPoolsArraySerializer(item["ipPools"]),
    dnsServerConfig: item["dnsServerConfig"],
    dnsZones: !item["dnsZones"] ? item["dnsZones"] : dnsZonesArraySerializer(item["dnsZones"]),
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    useDhcp: item["useDhcp"],
  };
}

export function infrastructureNetworkDeserializer(item: any): InfrastructureNetwork {
  return {
    subnetMask: item["subnetMask"],
    gateway: item["gateway"],
    ipPools: !item["ipPools"] ? item["ipPools"] : ipPoolsArrayDeserializer(item["ipPools"]),
    dnsServerConfig: item["dnsServerConfig"],
    dnsZones: !item["dnsZones"] ? item["dnsZones"] : dnsZonesArrayDeserializer(item["dnsZones"]),
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    useDhcp: item["useDhcp"],
  };
}

export function ipPoolsArraySerializer(result: Array<IpPools>): any[] {
  return result.map((item) => {
    return ipPoolsSerializer(item);
  });
}

export function ipPoolsArrayDeserializer(result: Array<IpPools>): any[] {
  return result.map((item) => {
    return ipPoolsDeserializer(item);
  });
}

/** The dnsServers of a device. */
export interface IpPools {
  /** Starting IP address for the management network. A minimum of six free, contiguous IPv4 addresses (excluding your host IPs) are needed for infrastructure services such as clustering. */
  startingAddress?: string;
  /** Ending IP address for the management network. A minimum of six free, contiguous IPv4 addresses (excluding your host IPs) are needed for infrastructure services such as clustering. */
  endingAddress?: string;
}

export function ipPoolsSerializer(item: IpPools): any {
  return { startingAddress: item["startingAddress"], endingAddress: item["endingAddress"] };
}

export function ipPoolsDeserializer(item: any): IpPools {
  return {
    startingAddress: item["startingAddress"],
    endingAddress: item["endingAddress"],
  };
}

/** Specifies how DNS servers are configured for the infrastructure network. Allowed values are 'UseDnsServer' to use the provided DNS servers, and 'UseForwarder' to use DNS forwarders. */
export enum KnownDnsServerConfig {
  /** Use the provided DNS servers for the infrastructure network. */
  UseDnsServer = "UseDnsServer",
  /** Use DNS forwarders for the infrastructure network. */
  UseForwarder = "UseForwarder",
}

/**
 * Specifies how DNS servers are configured for the infrastructure network. Allowed values are 'UseDnsServer' to use the provided DNS servers, and 'UseForwarder' to use DNS forwarders. \
 * {@link KnownDnsServerConfig} can be used interchangeably with DnsServerConfig,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UseDnsServer**: Use the provided DNS servers for the infrastructure network. \
 * **UseForwarder**: Use DNS forwarders for the infrastructure network.
 */
export type DnsServerConfig = string;

export function dnsZonesArraySerializer(result: Array<DnsZones>): any[] {
  return result.map((item) => {
    return dnsZonesSerializer(item);
  });
}

export function dnsZonesArrayDeserializer(result: Array<DnsZones>): any[] {
  return result.map((item) => {
    return dnsZonesDeserializer(item);
  });
}

/** Details of the DNS Zones to be configured. */
export interface DnsZones {
  /** Name of the DNS Zone to be configured. */
  dnsZoneName?: string;
  /** Forwarder details of the DNS Zone to be configured. */
  dnsForwarder?: string[];
}

export function dnsZonesSerializer(item: DnsZones): any {
  return {
    dnsZoneName: item["dnsZoneName"],
    dnsForwarder: !item["dnsForwarder"]
      ? item["dnsForwarder"]
      : item["dnsForwarder"].map((p: any) => {
          return p;
        }),
  };
}

export function dnsZonesDeserializer(item: any): DnsZones {
  return {
    dnsZoneName: item["dnsZoneName"],
    dnsForwarder: !item["dnsForwarder"]
      ? item["dnsForwarder"]
      : item["dnsForwarder"].map((p: any) => {
          return p;
        }),
  };
}

export function physicalNodesArraySerializer(result: Array<PhysicalNodes>): any[] {
  return result.map((item) => {
    return physicalNodesSerializer(item);
  });
}

export function physicalNodesArrayDeserializer(result: Array<PhysicalNodes>): any[] {
  return result.map((item) => {
    return physicalNodesDeserializer(item);
  });
}

/** The PhysicalNodes of a cluster. */
export interface PhysicalNodes {
  /** NETBIOS name of each physical server on your Azure Stack HCI cluster. */
  name?: string;
  /** The IPv4 address assigned to each physical server on your Azure Stack HCI cluster. */
  ipv4Address?: string;
}

export function physicalNodesSerializer(item: PhysicalNodes): any {
  return { name: item["name"], ipv4Address: item["ipv4Address"] };
}

export function physicalNodesDeserializer(item: any): PhysicalNodes {
  return {
    name: item["name"],
    ipv4Address: item["ipv4Address"],
  };
}

/** The HostNetwork of a cluster. */
export interface DeploymentSettingHostNetwork {
  /** The network intents assigned to the network reference pattern used for the deployment. Each intent will define its own name, traffic type, adapter names, and overrides as recommended by your OEM. */
  intents?: DeploymentSettingIntents[];
  /** List of StorageNetworks config to deploy AzureStackHCI Cluster. */
  storageNetworks?: DeploymentSettingStorageNetworks[];
  /** Defines how the storage adapters between nodes are connected either switch or switch less.. */
  storageConnectivitySwitchless?: boolean;
  /** Optional parameter required only for 3 Nodes Switchless deployments. This allows users to specify IPs and Mask for Storage NICs when Network ATC is not assigning the IPs for storage automatically. */
  enableStorageAutoIp?: boolean;
}

export function deploymentSettingHostNetworkSerializer(item: DeploymentSettingHostNetwork): any {
  return {
    intents: !item["intents"]
      ? item["intents"]
      : deploymentSettingIntentsArraySerializer(item["intents"]),
    storageNetworks: !item["storageNetworks"]
      ? item["storageNetworks"]
      : deploymentSettingStorageNetworksArraySerializer(item["storageNetworks"]),
    storageConnectivitySwitchless: item["storageConnectivitySwitchless"],
    enableStorageAutoIp: item["enableStorageAutoIp"],
  };
}

export function deploymentSettingHostNetworkDeserializer(item: any): DeploymentSettingHostNetwork {
  return {
    intents: !item["intents"]
      ? item["intents"]
      : deploymentSettingIntentsArrayDeserializer(item["intents"]),
    storageNetworks: !item["storageNetworks"]
      ? item["storageNetworks"]
      : deploymentSettingStorageNetworksArrayDeserializer(item["storageNetworks"]),
    storageConnectivitySwitchless: item["storageConnectivitySwitchless"],
    enableStorageAutoIp: item["enableStorageAutoIp"],
  };
}

export function deploymentSettingIntentsArraySerializer(
  result: Array<DeploymentSettingIntents>,
): any[] {
  return result.map((item) => {
    return deploymentSettingIntentsSerializer(item);
  });
}

export function deploymentSettingIntentsArrayDeserializer(
  result: Array<DeploymentSettingIntents>,
): any[] {
  return result.map((item) => {
    return deploymentSettingIntentsDeserializer(item);
  });
}

/** The Intents of a cluster. */
export interface DeploymentSettingIntents {
  /** Name of the network intent you wish to create. */
  name?: string;
  /** List of network traffic types. Only allowed values are 'Compute', 'Storage', 'Management'. */
  trafficType?: string[];
  /** Array of network interfaces used for the network intent. */
  adapter?: string[];
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  overrideVirtualSwitchConfiguration?: boolean;
  /** Set virtualSwitch ConfigurationOverrides for cluster. */
  virtualSwitchConfigurationOverrides?: DeploymentSettingVirtualSwitchConfigurationOverrides;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  overrideQosPolicy?: boolean;
  /** Set QoS PolicyOverrides for cluster. */
  qosPolicyOverrides?: QosPolicyOverrides;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  overrideAdapterProperty?: boolean;
  /** Set Adapter PropertyOverrides for cluster. */
  adapterPropertyOverrides?: DeploymentSettingAdapterPropertyOverrides;
}

export function deploymentSettingIntentsSerializer(item: DeploymentSettingIntents): any {
  return {
    name: item["name"],
    trafficType: !item["trafficType"]
      ? item["trafficType"]
      : item["trafficType"].map((p: any) => {
          return p;
        }),
    adapter: !item["adapter"]
      ? item["adapter"]
      : item["adapter"].map((p: any) => {
          return p;
        }),
    overrideVirtualSwitchConfiguration: item["overrideVirtualSwitchConfiguration"],
    virtualSwitchConfigurationOverrides: !item["virtualSwitchConfigurationOverrides"]
      ? item["virtualSwitchConfigurationOverrides"]
      : deploymentSettingVirtualSwitchConfigurationOverridesSerializer(
          item["virtualSwitchConfigurationOverrides"],
        ),
    overrideQosPolicy: item["overrideQosPolicy"],
    qosPolicyOverrides: !item["qosPolicyOverrides"]
      ? item["qosPolicyOverrides"]
      : qosPolicyOverridesSerializer(item["qosPolicyOverrides"]),
    overrideAdapterProperty: item["overrideAdapterProperty"],
    adapterPropertyOverrides: !item["adapterPropertyOverrides"]
      ? item["adapterPropertyOverrides"]
      : deploymentSettingAdapterPropertyOverridesSerializer(item["adapterPropertyOverrides"]),
  };
}

export function deploymentSettingIntentsDeserializer(item: any): DeploymentSettingIntents {
  return {
    name: item["name"],
    trafficType: !item["trafficType"]
      ? item["trafficType"]
      : item["trafficType"].map((p: any) => {
          return p;
        }),
    adapter: !item["adapter"]
      ? item["adapter"]
      : item["adapter"].map((p: any) => {
          return p;
        }),
    overrideVirtualSwitchConfiguration: item["overrideVirtualSwitchConfiguration"],
    virtualSwitchConfigurationOverrides: !item["virtualSwitchConfigurationOverrides"]
      ? item["virtualSwitchConfigurationOverrides"]
      : deploymentSettingVirtualSwitchConfigurationOverridesDeserializer(
          item["virtualSwitchConfigurationOverrides"],
        ),
    overrideQosPolicy: item["overrideQosPolicy"],
    qosPolicyOverrides: !item["qosPolicyOverrides"]
      ? item["qosPolicyOverrides"]
      : qosPolicyOverridesDeserializer(item["qosPolicyOverrides"]),
    overrideAdapterProperty: item["overrideAdapterProperty"],
    adapterPropertyOverrides: !item["adapterPropertyOverrides"]
      ? item["adapterPropertyOverrides"]
      : deploymentSettingAdapterPropertyOverridesDeserializer(item["adapterPropertyOverrides"]),
  };
}

/** The VirtualSwitchConfigurationOverrides of a cluster. */
export interface DeploymentSettingVirtualSwitchConfigurationOverrides {
  /** Enable IoV for Virtual Switch */
  enableIov?: string;
  /** Load Balancing Algorithm for Virtual Switch */
  loadBalancingAlgorithm?: string;
}

export function deploymentSettingVirtualSwitchConfigurationOverridesSerializer(
  item: DeploymentSettingVirtualSwitchConfigurationOverrides,
): any {
  return { enableIov: item["enableIov"], loadBalancingAlgorithm: item["loadBalancingAlgorithm"] };
}

export function deploymentSettingVirtualSwitchConfigurationOverridesDeserializer(
  item: any,
): DeploymentSettingVirtualSwitchConfigurationOverrides {
  return {
    enableIov: item["enableIov"],
    loadBalancingAlgorithm: item["loadBalancingAlgorithm"],
  };
}

/** The QoSPolicyOverrides of a cluster. */
export interface QosPolicyOverrides {
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  priorityValue8021ActionCluster?: string;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  priorityValue8021ActionSMB?: string;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  bandwidthPercentageSMB?: string;
}

export function qosPolicyOverridesSerializer(item: QosPolicyOverrides): any {
  return {
    priorityValue8021Action_Cluster: item["priorityValue8021ActionCluster"],
    priorityValue8021Action_SMB: item["priorityValue8021ActionSMB"],
    bandwidthPercentage_SMB: item["bandwidthPercentageSMB"],
  };
}

export function qosPolicyOverridesDeserializer(item: any): QosPolicyOverrides {
  return {
    priorityValue8021ActionCluster: item["priorityValue8021Action_Cluster"],
    priorityValue8021ActionSMB: item["priorityValue8021Action_SMB"],
    bandwidthPercentageSMB: item["bandwidthPercentage_SMB"],
  };
}

/** The AdapterPropertyOverrides of a cluster. */
export interface DeploymentSettingAdapterPropertyOverrides {
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  jumboPacket?: string;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  networkDirect?: string;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. Expected values are 'iWARP', 'RoCEv2', 'RoCE' */
  networkDirectTechnology?: string;
}

export function deploymentSettingAdapterPropertyOverridesSerializer(
  item: DeploymentSettingAdapterPropertyOverrides,
): any {
  return {
    jumboPacket: item["jumboPacket"],
    networkDirect: item["networkDirect"],
    networkDirectTechnology: item["networkDirectTechnology"],
  };
}

export function deploymentSettingAdapterPropertyOverridesDeserializer(
  item: any,
): DeploymentSettingAdapterPropertyOverrides {
  return {
    jumboPacket: item["jumboPacket"],
    networkDirect: item["networkDirect"],
    networkDirectTechnology: item["networkDirectTechnology"],
  };
}

export function deploymentSettingStorageNetworksArraySerializer(
  result: Array<DeploymentSettingStorageNetworks>,
): any[] {
  return result.map((item) => {
    return deploymentSettingStorageNetworksSerializer(item);
  });
}

export function deploymentSettingStorageNetworksArrayDeserializer(
  result: Array<DeploymentSettingStorageNetworks>,
): any[] {
  return result.map((item) => {
    return deploymentSettingStorageNetworksDeserializer(item);
  });
}

/** The StorageNetworks of a cluster. */
export interface DeploymentSettingStorageNetworks {
  /** Name of the storage network. */
  name?: string;
  /** Name of the storage network adapter. */
  networkAdapterName?: string;
  /** ID specified for the VLAN storage network. This setting is applied to the network interfaces that route the storage and VM migration traffic. */
  vlanId?: string;
  /** List of Storage adapter physical nodes config to deploy AzureStackHCI Cluster. */
  storageAdapterIPInfo?: DeploymentSettingStorageAdapterIPInfo[];
}

export function deploymentSettingStorageNetworksSerializer(
  item: DeploymentSettingStorageNetworks,
): any {
  return {
    name: item["name"],
    networkAdapterName: item["networkAdapterName"],
    vlanId: item["vlanId"],
    storageAdapterIPInfo: !item["storageAdapterIPInfo"]
      ? item["storageAdapterIPInfo"]
      : deploymentSettingStorageAdapterIPInfoArraySerializer(item["storageAdapterIPInfo"]),
  };
}

export function deploymentSettingStorageNetworksDeserializer(
  item: any,
): DeploymentSettingStorageNetworks {
  return {
    name: item["name"],
    networkAdapterName: item["networkAdapterName"],
    vlanId: item["vlanId"],
    storageAdapterIPInfo: !item["storageAdapterIPInfo"]
      ? item["storageAdapterIPInfo"]
      : deploymentSettingStorageAdapterIPInfoArrayDeserializer(item["storageAdapterIPInfo"]),
  };
}

export function deploymentSettingStorageAdapterIPInfoArraySerializer(
  result: Array<DeploymentSettingStorageAdapterIPInfo>,
): any[] {
  return result.map((item) => {
    return deploymentSettingStorageAdapterIPInfoSerializer(item);
  });
}

export function deploymentSettingStorageAdapterIPInfoArrayDeserializer(
  result: Array<DeploymentSettingStorageAdapterIPInfo>,
): any[] {
  return result.map((item) => {
    return deploymentSettingStorageAdapterIPInfoDeserializer(item);
  });
}

/** The StorageAdapter physical nodes of a cluster. */
export interface DeploymentSettingStorageAdapterIPInfo {
  /** storage adapter physical node name. */
  physicalNode?: string;
  /** The IPv4 address assigned to each storage adapter physical node on your Azure Stack HCI cluster. */
  ipv4Address?: string;
  /** The SubnetMask address assigned to each storage adapter physical node on your Azure Stack HCI cluster. */
  subnetMask?: string;
}

export function deploymentSettingStorageAdapterIPInfoSerializer(
  item: DeploymentSettingStorageAdapterIPInfo,
): any {
  return {
    physicalNode: item["physicalNode"],
    ipv4Address: item["ipv4Address"],
    subnetMask: item["subnetMask"],
  };
}

export function deploymentSettingStorageAdapterIPInfoDeserializer(
  item: any,
): DeploymentSettingStorageAdapterIPInfo {
  return {
    physicalNode: item["physicalNode"],
    ipv4Address: item["ipv4Address"],
    subnetMask: item["subnetMask"],
  };
}

/** SDN Integration config to deploy AzureStackHCI Cluster. */
export interface SdnIntegration {
  /** network controller config for SDN Integration to deploy AzureStackHCI Cluster. */
  networkController?: NetworkController;
}

export function sdnIntegrationSerializer(item: SdnIntegration): any {
  return {
    networkController: !item["networkController"]
      ? item["networkController"]
      : networkControllerSerializer(item["networkController"]),
  };
}

export function sdnIntegrationDeserializer(item: any): SdnIntegration {
  return {
    networkController: !item["networkController"]
      ? item["networkController"]
      : networkControllerDeserializer(item["networkController"]),
  };
}

/** network controller config for SDN Integration to deploy AzureStackHCI Cluster. */
export interface NetworkController {
  /** macAddressPoolStart of network controller used for SDN Integration. */
  macAddressPoolStart?: string;
  /** macAddressPoolStop of network controller used for SDN Integration. */
  macAddressPoolStop?: string;
  /** NetworkVirtualizationEnabled of network controller used for SDN Integration. */
  networkVirtualizationEnabled?: boolean;
}

export function networkControllerSerializer(item: NetworkController): any {
  return {
    macAddressPoolStart: item["macAddressPoolStart"],
    macAddressPoolStop: item["macAddressPoolStop"],
    networkVirtualizationEnabled: item["networkVirtualizationEnabled"],
  };
}

export function networkControllerDeserializer(item: any): NetworkController {
  return {
    macAddressPoolStart: item["macAddressPoolStart"],
    macAddressPoolStop: item["macAddressPoolStop"],
    networkVirtualizationEnabled: item["networkVirtualizationEnabled"],
  };
}

export function eceDeploymentSecretsArraySerializer(result: Array<EceDeploymentSecrets>): any[] {
  return result.map((item) => {
    return eceDeploymentSecretsSerializer(item);
  });
}

export function eceDeploymentSecretsArrayDeserializer(result: Array<EceDeploymentSecrets>): any[] {
  return result.map((item) => {
    return eceDeploymentSecretsDeserializer(item);
  });
}

/** Protected parameters list stored in keyvault. */
export interface EceDeploymentSecrets {
  /** Secret name stored in keyvault. */
  secretName?: string;
  /** Secret name expected for Enterprise Cloud Engine (ECE) deployment. */
  eceSecretName?: EceSecrets;
  /** Secret URI stored in keyvault. */
  secretLocation?: string;
}

export function eceDeploymentSecretsSerializer(item: EceDeploymentSecrets): any {
  return {
    secretName: item["secretName"],
    eceSecretName: item["eceSecretName"],
    secretLocation: item["secretLocation"],
  };
}

export function eceDeploymentSecretsDeserializer(item: any): EceDeploymentSecrets {
  return {
    secretName: item["secretName"],
    eceSecretName: item["eceSecretName"],
    secretLocation: item["secretLocation"],
  };
}

/** Secret names allowed for Enterprise Cloud Engine (ECE) deployment. */
export enum KnownEceSecrets {
  /** AzureStackLCMUserCredential used for LCM operations for AzureStackHCI cluster. */
  AzureStackLCMUserCredential = "AzureStackLCMUserCredential",
  /** DefaultARBApplication used to manage Azure Arc resource bridge (ARB) for AzureStackHCI cluster. */
  DefaultARBApplication = "DefaultARBApplication",
  /** LocalAdminCredential used for admin operations for AzureStackHCI cluster. */
  LocalAdminCredential = "LocalAdminCredential",
  /** WitnessStorageKey used for setting up a cloud witness for AzureStackHCI cluster. */
  WitnessStorageKey = "WitnessStorageKey",
}

/**
 * Secret names allowed for Enterprise Cloud Engine (ECE) deployment. \
 * {@link KnownEceSecrets} can be used interchangeably with EceSecrets,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureStackLCMUserCredential**: AzureStackLCMUserCredential used for LCM operations for AzureStackHCI cluster. \
 * **DefaultARBApplication**: DefaultARBApplication used to manage Azure Arc resource bridge (ARB) for AzureStackHCI cluster. \
 * **LocalAdminCredential**: LocalAdminCredential used for admin operations for AzureStackHCI cluster. \
 * **WitnessStorageKey**: WitnessStorageKey used for setting up a cloud witness for AzureStackHCI cluster.
 */
export type EceSecrets = string;

/** The OptionalServices of AzureStackHCI Cluster. */
export interface OptionalServices {
  /** The name of custom location. */
  customLocation?: string;
}

export function optionalServicesSerializer(item: OptionalServices): any {
  return { customLocation: item["customLocation"] };
}

export function optionalServicesDeserializer(item: any): OptionalServices {
  return {
    customLocation: item["customLocation"],
  };
}

/** Assembly Package details for Validated Solution Recipe for AzureStackHCI Cluster */
export interface AssemblyInfo {
  /** Assembly Package version for Validated Solution Recipe for AzureStackHCI Cluster */
  readonly packageVersion?: string;
  /** Payload properties for Validated Solution Recipe for AzureStackHCI Cluster */
  readonly payload?: AssemblyInfoPayload[];
}

export function assemblyInfoSerializer(item: AssemblyInfo): any {
  return item;
}

export function assemblyInfoDeserializer(item: any): AssemblyInfo {
  return {
    packageVersion: item["packageVersion"],
    payload: !item["payload"]
      ? item["payload"]
      : assemblyInfoPayloadArrayDeserializer(item["payload"]),
  };
}

export function assemblyInfoPayloadArrayDeserializer(result: Array<AssemblyInfoPayload>): any[] {
  return result.map((item) => {
    return assemblyInfoPayloadDeserializer(item);
  });
}

/** Payload properties for Validated Solution Recipe for AzureStackHCI Cluster */
export interface AssemblyInfoPayload {
  /** assembly identifier for Validated Solution Recipe for AzureStackHCI Cluster */
  readonly identifier?: string;
  /** Hash of assembly package for Validated Solution Recipe for AzureStackHCI Cluster */
  readonly hash?: string;
  /** File name of assembly package for Validated Solution Recipe for AzureStackHCI Cluster */
  readonly fileName?: string;
  /** Url of assembly package for Validated Solution Recipe for AzureStackHCI Cluster */
  readonly url?: string;
}

export function assemblyInfoPayloadDeserializer(item: any): AssemblyInfoPayload {
  return {
    identifier: item["identifier"],
    hash: item["hash"],
    fileName: item["fileName"],
    url: item["url"],
  };
}

/** The solution builder extension (SBE) partner deployment info for cluster. */
export interface SbePartnerInfo {
  /** SBE package and manifest information for the solution Builder Extension staged for AzureStackHCI cluster deployment. */
  sbeDeploymentInfo?: SbeDeploymentInfo;
  /** List of SBE partner properties for AzureStackHCI cluster deployment. */
  partnerProperties?: SbePartnerProperties[];
  /** SBE credentials list for AzureStackHCI cluster deployment. */
  credentialList?: SbeCredentials[];
}

export function sbePartnerInfoSerializer(item: SbePartnerInfo): any {
  return {
    sbeDeploymentInfo: !item["sbeDeploymentInfo"]
      ? item["sbeDeploymentInfo"]
      : sbeDeploymentInfoSerializer(item["sbeDeploymentInfo"]),
    partnerProperties: !item["partnerProperties"]
      ? item["partnerProperties"]
      : sbePartnerPropertiesArraySerializer(item["partnerProperties"]),
    credentialList: !item["credentialList"]
      ? item["credentialList"]
      : sbeCredentialsArraySerializer(item["credentialList"]),
  };
}

export function sbePartnerInfoDeserializer(item: any): SbePartnerInfo {
  return {
    sbeDeploymentInfo: !item["sbeDeploymentInfo"]
      ? item["sbeDeploymentInfo"]
      : sbeDeploymentInfoDeserializer(item["sbeDeploymentInfo"]),
    partnerProperties: !item["partnerProperties"]
      ? item["partnerProperties"]
      : sbePartnerPropertiesArrayDeserializer(item["partnerProperties"]),
    credentialList: !item["credentialList"]
      ? item["credentialList"]
      : sbeCredentialsArrayDeserializer(item["credentialList"]),
  };
}

/** Solution builder extension (SBE) package and manifest information for the solution builder extension staged for AzureStackHCI cluster deployment. */
export interface SbeDeploymentInfo {
  /** SBE package version. */
  version?: string;
  /** SBE family name. */
  family?: string;
  /** SBE manifest publisher. */
  publisher?: string;
  /** SBE Manifest Source. */
  sbeManifestSource?: string;
  /** SBE Manifest Creation Date. */
  sbeManifestCreationDate?: Date;
}

export function sbeDeploymentInfoSerializer(item: SbeDeploymentInfo): any {
  return {
    version: item["version"],
    family: item["family"],
    publisher: item["publisher"],
    sbeManifestSource: item["sbeManifestSource"],
    sbeManifestCreationDate: !item["sbeManifestCreationDate"]
      ? item["sbeManifestCreationDate"]
      : item["sbeManifestCreationDate"].toISOString(),
  };
}

export function sbeDeploymentInfoDeserializer(item: any): SbeDeploymentInfo {
  return {
    version: item["version"],
    family: item["family"],
    publisher: item["publisher"],
    sbeManifestSource: item["sbeManifestSource"],
    sbeManifestCreationDate: !item["sbeManifestCreationDate"]
      ? item["sbeManifestCreationDate"]
      : new Date(item["sbeManifestCreationDate"]),
  };
}

export function sbePartnerPropertiesArraySerializer(result: Array<SbePartnerProperties>): any[] {
  return result.map((item) => {
    return sbePartnerPropertiesSerializer(item);
  });
}

export function sbePartnerPropertiesArrayDeserializer(result: Array<SbePartnerProperties>): any[] {
  return result.map((item) => {
    return sbePartnerPropertiesDeserializer(item);
  });
}

/** Solution builder extension (SBE) partner properties object. */
export interface SbePartnerProperties {
  /** SBE partner property name. */
  name?: string;
  /** SBE partner property value. */
  value?: string;
}

export function sbePartnerPropertiesSerializer(item: SbePartnerProperties): any {
  return { name: item["name"], value: item["value"] };
}

export function sbePartnerPropertiesDeserializer(item: any): SbePartnerProperties {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function sbeCredentialsArraySerializer(result: Array<SbeCredentials>): any[] {
  return result.map((item) => {
    return sbeCredentialsSerializer(item);
  });
}

export function sbeCredentialsArrayDeserializer(result: Array<SbeCredentials>): any[] {
  return result.map((item) => {
    return sbeCredentialsDeserializer(item);
  });
}

/** secrets used for solution builder extension (SBE) partner extensibility. */
export interface SbeCredentials {
  /** secret name stored in keyvault. */
  secretName?: string;
  /** secret name expected for Enterprise Cloud Engine (ECE). */
  eceSecretName?: string;
  /** secret URI stored in keyvault. */
  secretLocation?: string;
}

export function sbeCredentialsSerializer(item: SbeCredentials): any {
  return {
    secretName: item["secretName"],
    eceSecretName: item["eceSecretName"],
    secretLocation: item["secretLocation"],
  };
}

export function sbeCredentialsDeserializer(item: any): SbeCredentials {
  return {
    secretName: item["secretName"],
    eceSecretName: item["eceSecretName"],
    secretLocation: item["secretLocation"],
  };
}

/** The DeploymentStatus of AzureStackHCI Cluster. */
export interface EceReportedProperties {
  /** validation status of AzureStackHCI Cluster Deployment. */
  readonly validationStatus?: EceActionStatus;
  /** Deployment status of AzureStackHCI Cluster Deployment. */
  readonly deploymentStatus?: EceActionStatus;
}

export function eceReportedPropertiesDeserializer(item: any): EceReportedProperties {
  return {
    validationStatus: !item["validationStatus"]
      ? item["validationStatus"]
      : eceActionStatusDeserializer(item["validationStatus"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : eceActionStatusDeserializer(item["deploymentStatus"]),
  };
}

/** The ECE action plan deployment status for AzureStackHCI Cluster. */
export interface EceActionStatus {
  /** Status of ECE action AzureStackHCI Cluster Deployment. */
  readonly status?: string;
  /** List of steps of AzureStackHCI Cluster Deployment. */
  readonly steps?: DeploymentStep[];
}

export function eceActionStatusDeserializer(item: any): EceActionStatus {
  return {
    status: item["status"],
    steps: !item["steps"] ? item["steps"] : deploymentStepArrayDeserializer(item["steps"]),
  };
}

export function deploymentStepArrayDeserializer(result: Array<DeploymentStep>): any[] {
  return result.map((item) => {
    return deploymentStepDeserializer(item);
  });
}

/** The Step of AzureStackHCI Cluster. */
export interface DeploymentStep {
  /** Name of step. */
  readonly name?: string;
  /** Description of step. */
  readonly description?: string;
  /** FullStepIndex of step. */
  readonly fullStepIndex?: string;
  /** Start time of step. */
  readonly startTimeUtc?: string;
  /** End time of step. */
  readonly endTimeUtc?: string;
  /** Status of step. Allowed values are 'Error', 'Success', 'InProgress' */
  readonly status?: string;
  /** List of nested steps of AzureStackHCI Cluster Deployment. */
  readonly steps?: DeploymentStep[];
  /** List of exceptions in AzureStackHCI Cluster Deployment. */
  readonly exception?: string[];
}

export function deploymentStepDeserializer(item: any): DeploymentStep {
  return {
    name: item["name"],
    description: item["description"],
    fullStepIndex: item["fullStepIndex"],
    startTimeUtc: item["startTimeUtc"],
    endTimeUtc: item["endTimeUtc"],
    status: item["status"],
    steps: !item["steps"] ? item["steps"] : deploymentStepArrayDeserializer(item["steps"]),
    exception: !item["exception"]
      ? item["exception"]
      : item["exception"].map((p: any) => {
          return p;
        }),
  };
}

/** The response of a DeploymentSetting list operation. */
export interface _DeploymentSettingListResult {
  /** The DeploymentSetting items on this page */
  value: DeploymentSetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentSettingListResultDeserializer(item: any): _DeploymentSettingListResult {
  return {
    value: deploymentSettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentSettingArraySerializer(result: Array<DeploymentSetting>): any[] {
  return result.map((item) => {
    return deploymentSettingSerializer(item);
  });
}

export function deploymentSettingArrayDeserializer(result: Array<DeploymentSetting>): any[] {
  return result.map((item) => {
    return deploymentSettingDeserializer(item);
  });
}

/** EdgeDevice Jobs resource */
export interface EdgeDeviceJob extends ExtensionResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: HCI */
  kind: EdgeDeviceKind;
}

export function edgeDeviceJobSerializer(item: EdgeDeviceJob): any {
  return { kind: item["kind"] };
}

export function edgeDeviceJobDeserializer(item: any): EdgeDeviceJob {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for EdgeDeviceJobUnion */
export type EdgeDeviceJobUnion = HciEdgeDeviceJob | EdgeDeviceJob;

export function edgeDeviceJobUnionSerializer(item: EdgeDeviceJobUnion): any {
  switch (item.kind) {
    case "HCI":
      return hciEdgeDeviceJobSerializer(item as HciEdgeDeviceJob);

    default:
      return edgeDeviceJobSerializer(item);
  }
}

export function edgeDeviceJobUnionDeserializer(item: any): EdgeDeviceJobUnion {
  switch (item.kind) {
    case "HCI":
      return hciEdgeDeviceJobDeserializer(item as HciEdgeDeviceJob);

    default:
      return edgeDeviceJobDeserializer(item);
  }
}

/** Edge device kind. */
export enum KnownEdgeDeviceKind {
  /** Arc-enabled edge device with HCI OS. */
  HCI = "HCI",
}

/**
 * Edge device kind. \
 * {@link KnownEdgeDeviceKind} can be used interchangeably with EdgeDeviceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HCI**: Arc-enabled edge device with HCI OS.
 */
export type EdgeDeviceKind = string;

/** Edge device job for Azure Stack HCI solution. */
export interface HciEdgeDeviceJob extends EdgeDeviceJob {
  /** HCI Edge device job properties */
  properties: HciEdgeDeviceJobPropertiesUnion;
  /** Edge Solution type to support polymorphic resource. */
  kind: "HCI";
}

export function hciEdgeDeviceJobSerializer(item: HciEdgeDeviceJob): any {
  return {
    kind: item["kind"],
    properties: hciEdgeDeviceJobPropertiesUnionSerializer(item["properties"]),
  };
}

export function hciEdgeDeviceJobDeserializer(item: any): HciEdgeDeviceJob {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: hciEdgeDeviceJobPropertiesUnionDeserializer(item["properties"]),
  };
}

/** HCI Edge device job properties */
export interface HciEdgeDeviceJobProperties {
  /** Deployment mode to trigger job. */
  deploymentMode?: DeploymentMode;
  /** Job provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Unique, immutable job id. */
  readonly jobId?: string;
  /** The UTC date and time at which the job started. */
  readonly startTimeUtc?: Date;
  /** The UTC date and time at which the job completed. */
  readonly endTimeUtc?: Date;
  /** Status of Edge device job. */
  readonly status?: JobStatus;
  /** Job Type to support polymorphic resource. */
  /** The discriminator possible values: CollectLog, RemoteSupport */
  jobType: HciEdgeDeviceJobType;
}

export function hciEdgeDeviceJobPropertiesSerializer(item: HciEdgeDeviceJobProperties): any {
  return { deploymentMode: item["deploymentMode"], jobType: item["jobType"] };
}

export function hciEdgeDeviceJobPropertiesDeserializer(item: any): HciEdgeDeviceJobProperties {
  return {
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    jobType: item["jobType"],
  };
}

/** Alias for HciEdgeDeviceJobPropertiesUnion */
export type HciEdgeDeviceJobPropertiesUnion =
  | HciCollectLogJobProperties
  | HciRemoteSupportJobProperties
  | HciEdgeDeviceJobProperties;

export function hciEdgeDeviceJobPropertiesUnionSerializer(
  item: HciEdgeDeviceJobPropertiesUnion,
): any {
  switch (item.jobType) {
    case "CollectLog":
      return hciCollectLogJobPropertiesSerializer(item as HciCollectLogJobProperties);

    case "RemoteSupport":
      return hciRemoteSupportJobPropertiesSerializer(item as HciRemoteSupportJobProperties);

    default:
      return hciEdgeDeviceJobPropertiesSerializer(item);
  }
}

export function hciEdgeDeviceJobPropertiesUnionDeserializer(
  item: any,
): HciEdgeDeviceJobPropertiesUnion {
  switch (item.jobType) {
    case "CollectLog":
      return hciCollectLogJobPropertiesDeserializer(item as HciCollectLogJobProperties);

    case "RemoteSupport":
      return hciRemoteSupportJobPropertiesDeserializer(item as HciRemoteSupportJobProperties);

    default:
      return hciEdgeDeviceJobPropertiesDeserializer(item);
  }
}

/** Represents the various statuses a job can have throughout its lifecycle. */
export enum KnownJobStatus {
  /** The job status has not been specified. */
  NotSpecified = "NotSpecified",
  /** The job is currently undergoing validation. */
  ValidationInProgress = "ValidationInProgress",
  /** The job has successfully passed validation. */
  ValidationSuccess = "ValidationSuccess",
  /** The job has failed validation. */
  ValidationFailed = "ValidationFailed",
  /** The job's deployment is currently in progress. */
  DeploymentInProgress = "DeploymentInProgress",
  /** The job's deployment has failed. */
  DeploymentFailed = "DeploymentFailed",
  /** The job has been successfully deployed. */
  DeploymentSuccess = "DeploymentSuccess",
  /** The job has succeeded. */
  Succeeded = "Succeeded",
  /** The job has failed. */
  Failed = "Failed",
  /** The job has been canceled. */
  Canceled = "Canceled",
  /** The job is paused. */
  Paused = "Paused",
  /** The job is scheduled to run. */
  Scheduled = "Scheduled",
}

/**
 * Represents the various statuses a job can have throughout its lifecycle. \
 * {@link KnownJobStatus} can be used interchangeably with JobStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The job status has not been specified. \
 * **ValidationInProgress**: The job is currently undergoing validation. \
 * **ValidationSuccess**: The job has successfully passed validation. \
 * **ValidationFailed**: The job has failed validation. \
 * **DeploymentInProgress**: The job's deployment is currently in progress. \
 * **DeploymentFailed**: The job's deployment has failed. \
 * **DeploymentSuccess**: The job has been successfully deployed. \
 * **Succeeded**: The job has succeeded. \
 * **Failed**: The job has failed. \
 * **Canceled**: The job has been canceled. \
 * **Paused**: The job is paused. \
 * **Scheduled**: The job is scheduled to run.
 */
export type JobStatus = string;

/** Job Type supported. */
export enum KnownHciEdgeDeviceJobType {
  /** Job to collect logs from the device. */
  CollectLog = "CollectLog",
  /** Job to provide remote support to the device. */
  RemoteSupport = "RemoteSupport",
}

/**
 * Job Type supported. \
 * {@link KnownHciEdgeDeviceJobType} can be used interchangeably with HciEdgeDeviceJobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CollectLog**: Job to collect logs from the device. \
 * **RemoteSupport**: Job to provide remote support to the device.
 */
export type HciEdgeDeviceJobType = string;

/** Represents the properties of an HCI Collect Log job. */
export interface HciCollectLogJobProperties extends HciEdgeDeviceJobProperties {
  /** From date for log collection. */
  fromDate: Date;
  /** To date for log collection. */
  toDate: Date;
  /** To date for log collection. */
  readonly lastLogGenerated?: Date;
  /** log collection job reported properties. */
  readonly reportedProperties?: LogCollectionReportedProperties;
  /** Job Type to support polymorphic resource. */
  jobType: "CollectLog";
}

export function hciCollectLogJobPropertiesSerializer(item: HciCollectLogJobProperties): any {
  return {
    deploymentMode: item["deploymentMode"],
    jobType: item["jobType"],
    fromDate: item["fromDate"].toISOString(),
    toDate: item["toDate"].toISOString(),
  };
}

export function hciCollectLogJobPropertiesDeserializer(item: any): HciCollectLogJobProperties {
  return {
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    jobType: item["jobType"],
    fromDate: new Date(item["fromDate"]),
    toDate: new Date(item["toDate"]),
    lastLogGenerated: !item["lastLogGenerated"]
      ? item["lastLogGenerated"]
      : new Date(item["lastLogGenerated"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : logCollectionReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Represents the reported properties of a log collection job. */
export interface LogCollectionReportedProperties {
  /** The percentage of the job that is complete. */
  readonly percentComplete?: number;
  /** Validation status of job. */
  readonly validationStatus?: EceActionStatus;
  /** Deployment status of job. */
  readonly deploymentStatus?: EceActionStatus;
  /** Details of the log collection session. */
  readonly logCollectionSessionDetails?: LogCollectionJobSession[];
}

export function logCollectionReportedPropertiesDeserializer(
  item: any,
): LogCollectionReportedProperties {
  return {
    percentComplete: item["percentComplete"],
    validationStatus: !item["validationStatus"]
      ? item["validationStatus"]
      : eceActionStatusDeserializer(item["validationStatus"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : eceActionStatusDeserializer(item["deploymentStatus"]),
    logCollectionSessionDetails: !item["logCollectionSessionDetails"]
      ? item["logCollectionSessionDetails"]
      : logCollectionJobSessionArrayDeserializer(item["logCollectionSessionDetails"]),
  };
}

export function logCollectionJobSessionArrayDeserializer(
  result: Array<LogCollectionJobSession>,
): any[] {
  return result.map((item) => {
    return logCollectionJobSessionDeserializer(item);
  });
}

/** Represents a session for collecting logs from an edge device. */
export interface LogCollectionJobSession {
  /** The timestamp when log collection started, in ISO 8601 format. */
  readonly startTime?: string;
  /** The timestamp when log collection ended, in ISO 8601 format. */
  readonly endTime?: string;
  /** The total time logs were collected for, in ISO 8601 duration format. */
  readonly timeCollected?: string;
  /** The size of the collected logs in bytes. */
  readonly logSize?: number;
  /** The status of the log collection session. */
  readonly status?: DeviceLogCollectionStatus;
  /** A unique identifier for correlating this log collection session with other operations or sessions. */
  readonly correlationId?: string;
}

export function logCollectionJobSessionDeserializer(item: any): LogCollectionJobSession {
  return {
    startTime: item["startTime"],
    endTime: item["endTime"],
    timeCollected: item["timeCollected"],
    logSize: item["logSize"],
    status: item["status"],
    correlationId: item["correlationId"],
  };
}

/** Represents the status of a log collection operation. */
export enum KnownDeviceLogCollectionStatus {
  /** Log collection operation has not been initiated. */
  NotStarted = "NotStarted",
  /** Indicates that the log collection operation is currently running. */
  Running = "Running",
  /** Indicates that the log collection operation has failed. */
  Failed = "Failed",
  /** Indicates that the log collection operation has completed successfully. */
  Succeeded = "Succeeded",
  /** Indicates that the log collection operation has completed successfully. */
  Canceled = "Canceled",
}

/**
 * Represents the status of a log collection operation. \
 * {@link KnownDeviceLogCollectionStatus} can be used interchangeably with DeviceLogCollectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotStarted**: Log collection operation has not been initiated. \
 * **Running**: Indicates that the log collection operation is currently running. \
 * **Failed**: Indicates that the log collection operation has failed. \
 * **Succeeded**: Indicates that the log collection operation has completed successfully. \
 * **Canceled**: Indicates that the log collection operation has completed successfully.
 */
export type DeviceLogCollectionStatus = string;

/** Represents the properties of a remote support job for HCI. */
export interface HciRemoteSupportJobProperties extends HciEdgeDeviceJobProperties {
  /** Remote support access level. */
  accessLevel: RemoteSupportAccessLevel;
  /** Remote support expiration timestamp. */
  expirationTimestamp: Date;
  /** Remote support type. */
  type: RemoteSupportType;
  /** log collection job reported properties. */
  readonly reportedProperties?: RemoteSupportJobReportedProperties;
  /** Job Type to support polymorphic resource. */
  jobType: "RemoteSupport";
}

export function hciRemoteSupportJobPropertiesSerializer(item: HciRemoteSupportJobProperties): any {
  return {
    deploymentMode: item["deploymentMode"],
    jobType: item["jobType"],
    accessLevel: item["accessLevel"],
    expirationTimestamp: item["expirationTimestamp"].toISOString(),
    type: item["type"],
  };
}

export function hciRemoteSupportJobPropertiesDeserializer(
  item: any,
): HciRemoteSupportJobProperties {
  return {
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    jobType: item["jobType"],
    accessLevel: item["accessLevel"],
    expirationTimestamp: new Date(item["expirationTimestamp"]),
    type: item["type"],
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : remoteSupportJobReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Defines the level of remote support access granted. */
export enum KnownRemoteSupportAccessLevel {
  /** No remote support access is granted. */
  None = "None",
  /** Access is limited to diagnostics information only. */
  Diagnostics = "Diagnostics",
  /** Access includes diagnostics information and the ability to perform repairs. */
  DiagnosticsAndRepair = "DiagnosticsAndRepair",
}

/**
 * Defines the level of remote support access granted. \
 * {@link KnownRemoteSupportAccessLevel} can be used interchangeably with RemoteSupportAccessLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No remote support access is granted. \
 * **Diagnostics**: Access is limited to diagnostics information only. \
 * **DiagnosticsAndRepair**: Access includes diagnostics information and the ability to perform repairs.
 */
export type RemoteSupportAccessLevel = string;

/** Represents the reported properties of a remote support job. */
export interface RemoteSupportJobReportedProperties {
  /** The percentage of the job that is complete. */
  readonly percentComplete?: number;
  /** Validation status of job. */
  readonly validationStatus?: EceActionStatus;
  /** Deployment status of job. */
  readonly deploymentStatus?: EceActionStatus;
  /** Optional settings for configuring the node for remote support. */
  readonly nodeSettings?: RemoteSupportJobNodeSettings;
  /** Details of the remote support session. */
  readonly sessionDetails?: RemoteSupportSession[];
}

export function remoteSupportJobReportedPropertiesDeserializer(
  item: any,
): RemoteSupportJobReportedProperties {
  return {
    percentComplete: item["percentComplete"],
    validationStatus: !item["validationStatus"]
      ? item["validationStatus"]
      : eceActionStatusDeserializer(item["validationStatus"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : eceActionStatusDeserializer(item["deploymentStatus"]),
    nodeSettings: !item["nodeSettings"]
      ? item["nodeSettings"]
      : remoteSupportJobNodeSettingsDeserializer(item["nodeSettings"]),
    sessionDetails: !item["sessionDetails"]
      ? item["sessionDetails"]
      : remoteSupportSessionArrayDeserializer(item["sessionDetails"]),
  };
}

/** Represents the settings of a remote support node. */
export interface RemoteSupportJobNodeSettings {
  /** The state of the remote support node. */
  readonly state?: string;
  /** The timestamp when the node settings were created, in UTC. */
  readonly createdAt?: Date;
  /** The timestamp when the node settings were last updated, in UTC. */
  readonly updatedAt?: Date;
  /** The current connection status of the remote support session. */
  readonly connectionStatus?: string;
  /** The error message, if any, from the last connection attempt. */
  readonly connectionErrorMessage?: string;
}

export function remoteSupportJobNodeSettingsDeserializer(item: any): RemoteSupportJobNodeSettings {
  return {
    state: item["state"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    connectionStatus: item["connectionStatus"],
    connectionErrorMessage: item["connectionErrorMessage"],
  };
}

export function remoteSupportSessionArrayDeserializer(result: Array<RemoteSupportSession>): any[] {
  return result.map((item) => {
    return remoteSupportSessionDeserializer(item);
  });
}

/** Represents a remote support session. */
export interface RemoteSupportSession {
  /** Unique session Id. */
  readonly sessionId?: string;
  /** The start time of the remote support session, in UTC. */
  readonly sessionStartTime?: Date;
  /** The end time of the remote support session, in UTC. */
  readonly sessionEndTime?: Date;
  /** The level of access granted during the remote support session. */
  readonly accessLevel?: RemoteSupportAccessLevel;
  /** The location where the session transcript is stored. */
  readonly transcriptLocation?: string;
}

export function remoteSupportSessionDeserializer(item: any): RemoteSupportSession {
  return {
    sessionId: item["sessionId"],
    sessionStartTime: !item["sessionStartTime"]
      ? item["sessionStartTime"]
      : new Date(item["sessionStartTime"]),
    sessionEndTime: !item["sessionEndTime"]
      ? item["sessionEndTime"]
      : new Date(item["sessionEndTime"]),
    accessLevel: item["accessLevel"],
    transcriptLocation: item["transcriptLocation"],
  };
}

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource): any {
  return item;
}

export function extensionResourceDeserializer(item: any): ExtensionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The response of a EdgeDeviceJob list operation. */
export interface _EdgeDeviceJobListResult {
  /** The EdgeDeviceJob items on this page */
  value: EdgeDeviceJobUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeDeviceJobListResultDeserializer(item: any): _EdgeDeviceJobListResult {
  return {
    value: edgeDeviceJobUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeDeviceJobUnionArraySerializer(result: Array<EdgeDeviceJobUnion>): any[] {
  return result.map((item) => {
    return edgeDeviceJobUnionSerializer(item);
  });
}

export function edgeDeviceJobUnionArrayDeserializer(result: Array<EdgeDeviceJobUnion>): any[] {
  return result.map((item) => {
    return edgeDeviceJobUnionDeserializer(item);
  });
}

/** Edge device resource. */
export interface EdgeDevice extends ExtensionResource {
  /** Metadata used by portal/tooling/etc to render different UX experiences for resources of the same type; e.g. ApiApps are a kind of Microsoft.Web/sites type.  If supported, the resource provider must validate and persist this value. */
  /** The discriminator possible values: HCI */
  kind: DeviceKind;
}

export function edgeDeviceSerializer(item: EdgeDevice): any {
  return { kind: item["kind"] };
}

export function edgeDeviceDeserializer(item: any): EdgeDevice {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    kind: item["kind"],
  };
}

/** Alias for EdgeDeviceUnion */
export type EdgeDeviceUnion = HciEdgeDevice | EdgeDevice;

export function edgeDeviceUnionSerializer(item: EdgeDeviceUnion): any {
  switch (item.kind) {
    case "HCI":
      return hciEdgeDeviceSerializer(item as HciEdgeDevice);

    default:
      return edgeDeviceSerializer(item);
  }
}

export function edgeDeviceUnionDeserializer(item: any): EdgeDeviceUnion {
  switch (item.kind) {
    case "HCI":
      return hciEdgeDeviceDeserializer(item as HciEdgeDevice);

    default:
      return edgeDeviceDeserializer(item);
  }
}

/** Edge device kind. */
export enum KnownDeviceKind {
  /** Arc-enabled edge device with HCI OS. */
  HCI = "HCI",
}

/**
 * Edge device kind. \
 * {@link KnownDeviceKind} can be used interchangeably with DeviceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HCI**: Arc-enabled edge device with HCI OS.
 */
export type DeviceKind = string;

/** Arc-enabled edge device with HCI OS. */
export interface HciEdgeDevice extends EdgeDevice {
  /** properties for Arc-enabled edge device with HCI OS. */
  properties?: HciEdgeDeviceProperties;
  /** Device kind to support polymorphic resource. */
  kind: "HCI";
}

export function hciEdgeDeviceSerializer(item: HciEdgeDevice): any {
  return {
    kind: item["kind"],
    properties: !item["properties"]
      ? item["properties"]
      : hciEdgeDevicePropertiesSerializer(item["properties"]),
  };
}

export function hciEdgeDeviceDeserializer(item: any): HciEdgeDevice {
  return {
    kind: item["kind"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : hciEdgeDevicePropertiesDeserializer(item["properties"]),
  };
}

/** properties for Arc-enabled edge device with HCI OS. */
export interface HciEdgeDeviceProperties extends EdgeDeviceProperties {
  /** The instance view of all current configurations on HCI device. */
  readonly reportedProperties?: HciReportedProperties;
}

export function hciEdgeDevicePropertiesSerializer(item: HciEdgeDeviceProperties): any {
  return {
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : deviceConfigurationSerializer(item["deviceConfiguration"]),
  };
}

export function hciEdgeDevicePropertiesDeserializer(item: any): HciEdgeDeviceProperties {
  return {
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : deviceConfigurationDeserializer(item["deviceConfiguration"]),
    provisioningState: item["provisioningState"],
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : hciReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** The device Configuration for HCI device. */
export interface HciReportedProperties extends ReportedProperties {
  /** HCI device network information. */
  readonly networkProfile?: HciNetworkProfile;
  /** HCI device OS specific information. */
  readonly osProfile?: HciOsProfile;
  /** Solution builder extension (SBE) deployment package information. */
  readonly sbeDeploymentPackageInfo?: SbeDeploymentPackageInfo;
  /** Hci device storage specific information. */
  readonly storageProfile?: HciStorageProfile;
  /** Hci device hardware specific information. */
  readonly hardwareProfile?: HciHardwareProfile;
}

export function hciReportedPropertiesDeserializer(item: any): HciReportedProperties {
  return {
    deviceState: item["deviceState"],
    extensionProfile: !item["extensionProfile"]
      ? item["extensionProfile"]
      : extensionProfileDeserializer(item["extensionProfile"]),
    lastSyncTimestamp: !item["lastSyncTimestamp"]
      ? item["lastSyncTimestamp"]
      : new Date(item["lastSyncTimestamp"]),
    confidentialVmProfile: !item["confidentialVmProfile"]
      ? item["confidentialVmProfile"]
      : confidentialVmProfileDeserializer(item["confidentialVmProfile"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : hciNetworkProfileDeserializer(item["networkProfile"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : hciOsProfileDeserializer(item["osProfile"]),
    sbeDeploymentPackageInfo: !item["sbeDeploymentPackageInfo"]
      ? item["sbeDeploymentPackageInfo"]
      : sbeDeploymentPackageInfoDeserializer(item["sbeDeploymentPackageInfo"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : hciStorageProfileDeserializer(item["storageProfile"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hciHardwareProfileDeserializer(item["hardwareProfile"]),
  };
}

/** The network profile of a device. */
export interface HciNetworkProfile {
  /** List of NIC Details of device. */
  readonly nicDetails?: HciNicDetail[];
  /** List of switch details for edge device. */
  readonly switchDetails?: SwitchDetail[];
  /** HostNetwork config to deploy AzureStackHCI Cluster. */
  readonly hostNetwork?: HciEdgeDeviceHostNetwork;
  /** oftware Defined Networking Properties of the cluster */
  readonly sdnProperties?: SdnProperties;
}

export function hciNetworkProfileDeserializer(item: any): HciNetworkProfile {
  return {
    nicDetails: !item["nicDetails"]
      ? item["nicDetails"]
      : hciNicDetailArrayDeserializer(item["nicDetails"]),
    switchDetails: !item["switchDetails"]
      ? item["switchDetails"]
      : switchDetailArrayDeserializer(item["switchDetails"]),
    hostNetwork: !item["hostNetwork"]
      ? item["hostNetwork"]
      : hciEdgeDeviceHostNetworkDeserializer(item["hostNetwork"]),
    sdnProperties: !item["sdnProperties"]
      ? item["sdnProperties"]
      : sdnPropertiesDeserializer(item["sdnProperties"]),
  };
}

export function hciNicDetailArrayDeserializer(result: Array<HciNicDetail>): any[] {
  return result.map((item) => {
    return hciNicDetailDeserializer(item);
  });
}

/** The NIC Detail of a device. */
export interface HciNicDetail {
  /** Adapter Name of NIC */
  readonly adapterName?: string;
  /** Interface Description of NIC */
  readonly interfaceDescription?: string;
  /** Component Id of NIC */
  readonly componentId?: string;
  /** Driver Version of NIC */
  readonly driverVersion?: string;
  /** Subnet Mask of NIC */
  readonly ip4Address?: string;
  /** Subnet Mask of NIC */
  readonly subnetMask?: string;
  /** Default Gateway of NIC */
  readonly defaultGateway?: string;
  /** DNS Servers for NIC */
  readonly dnsServers?: string[];
  /** Default Isolation of Management NIC */
  readonly defaultIsolationId?: string;
  /** MAC address information of NIC. */
  readonly macAddress?: string;
  /** The slot attached to the NIC. */
  readonly slot?: string;
  /** The switch attached to the NIC, if any. */
  readonly switchName?: string;
  /** The type of NIC, physical, virtual, management. */
  readonly nicType?: string;
  /** The VLAN ID of the physical NIC. */
  readonly vlanId?: string;
  /** The status of NIC, up, disconnected. */
  readonly nicStatus?: string;
  /** Describes the RDMA capability of the network adapter. */
  readonly rdmaCapability?: RdmaCapability;
}

export function hciNicDetailDeserializer(item: any): HciNicDetail {
  return {
    adapterName: item["adapterName"],
    interfaceDescription: item["interfaceDescription"],
    componentId: item["componentId"],
    driverVersion: item["driverVersion"],
    ip4Address: item["ip4Address"],
    subnetMask: item["subnetMask"],
    defaultGateway: item["defaultGateway"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    defaultIsolationId: item["defaultIsolationId"],
    macAddress: item["macAddress"],
    slot: item["slot"],
    switchName: item["switchName"],
    nicType: item["nicType"],
    vlanId: item["vlanId"],
    nicStatus: item["nicStatus"],
    rdmaCapability: item["rdmaCapability"],
  };
}

/** Describes the RDMA capability of the network adapter. */
export enum KnownRdmaCapability {
  /** Network Adapter on the device is RDMA Capable */
  Enabled = "Enabled",
  /** Network Adapter on the device is RDMA Capable */
  Disabled = "Disabled",
}

/**
 * Describes the RDMA capability of the network adapter. \
 * {@link KnownRdmaCapability} can be used interchangeably with RdmaCapability,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Network Adapter on the device is RDMA Capable \
 * **Disabled**: Network Adapter on the device is RDMA Capable
 */
export type RdmaCapability = string;

export function switchDetailArrayDeserializer(result: Array<SwitchDetail>): any[] {
  return result.map((item) => {
    return switchDetailDeserializer(item);
  });
}

/** List of switch details for edge device. */
export interface SwitchDetail {
  /** The name of the switch. */
  readonly switchName?: string;
  /** The type of the switch. e.g. external, internal. */
  readonly switchType?: string;
  /** This represents extensions installed on virtualSwitch. */
  readonly extensions?: SwitchExtension[];
}

export function switchDetailDeserializer(item: any): SwitchDetail {
  return {
    switchName: item["switchName"],
    switchType: item["switchType"],
    extensions: !item["extensions"]
      ? item["extensions"]
      : switchExtensionArrayDeserializer(item["extensions"]),
  };
}

export function switchExtensionArrayDeserializer(result: Array<SwitchExtension>): any[] {
  return result.map((item) => {
    return switchExtensionDeserializer(item);
  });
}

/** This represents extensions installed on virtualSwitch. */
export interface SwitchExtension {
  /** Unique identifier for virtualSwitch. */
  readonly switchId?: string;
  /** This will show extension name for virtualSwitch. */
  readonly extensionName?: string;
  /** This represents whether extension is enabled on virtualSwitch. */
  readonly extensionEnabled?: boolean;
}

export function switchExtensionDeserializer(item: any): SwitchExtension {
  return {
    switchId: item["switchId"],
    extensionName: item["extensionName"],
    extensionEnabled: item["extensionEnabled"],
  };
}

/** The HostNetwork of a cluster. */
export interface HciEdgeDeviceHostNetwork {
  /** The network intents assigned to the network reference pattern used for the deployment. Each intent will define its own name, traffic type, adapter names, and overrides as recommended by your OEM. */
  readonly intents?: HciEdgeDeviceIntents[];
  /** List of StorageNetworks config to deploy AzureStackHCI Cluster. */
  readonly storageNetworks?: HciEdgeDeviceStorageNetworks[];
  /** Defines how the storage adapters between nodes are connected either switch or switch less. */
  readonly storageConnectivitySwitchless?: boolean;
  /** Optional parameter required only for 3 Nodes Switchless deployments. This allows users to specify IPs and Mask for Storage NICs when Network ATC is not assigning the IPs for storage automatically. */
  readonly enableStorageAutoIp?: boolean;
}

export function hciEdgeDeviceHostNetworkDeserializer(item: any): HciEdgeDeviceHostNetwork {
  return {
    intents: !item["intents"]
      ? item["intents"]
      : hciEdgeDeviceIntentsArrayDeserializer(item["intents"]),
    storageNetworks: !item["storageNetworks"]
      ? item["storageNetworks"]
      : hciEdgeDeviceStorageNetworksArrayDeserializer(item["storageNetworks"]),
    storageConnectivitySwitchless: item["storageConnectivitySwitchless"],
    enableStorageAutoIp: item["enableStorageAutoIp"],
  };
}

export function hciEdgeDeviceIntentsArrayDeserializer(result: Array<HciEdgeDeviceIntents>): any[] {
  return result.map((item) => {
    return hciEdgeDeviceIntentsDeserializer(item);
  });
}

/** The Intents of a cluster. */
export interface HciEdgeDeviceIntents {
  /** Scope for host network intent. */
  readonly scope?: number;
  /** IntentType for host network intent. */
  readonly intentType?: number;
  /** IsComputeIntentSet for host network intent. */
  readonly isComputeIntentSet?: boolean;
  /** IsStorageIntentSet for host network intent. */
  readonly isStorageIntentSet?: boolean;
  /** IntentType for host network intent. */
  readonly isOnlyStorage?: boolean;
  /** IsManagementIntentSet for host network intent. */
  readonly isManagementIntentSet?: boolean;
  /** IsStretchIntentSet for host network intent. */
  readonly isStretchIntentSet?: boolean;
  /** IsOnlyStretch for host network intent. */
  readonly isOnlyStretch?: boolean;
  /** IsNetworkIntentType for host network intent. */
  readonly isNetworkIntentType?: boolean;
  /** Name of the network intent you wish to create. */
  readonly intentName?: string;
  /** Array of adapters used for the network intent. */
  readonly intentAdapters?: string[];
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  readonly overrideVirtualSwitchConfiguration?: boolean;
  /** Set virtualSwitch ConfigurationOverrides for cluster. */
  readonly virtualSwitchConfigurationOverrides?: HciEdgeDeviceVirtualSwitchConfigurationOverrides;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  readonly overrideQosPolicy?: boolean;
  /** Set QoS PolicyOverrides for cluster. */
  readonly qosPolicyOverrides?: QosPolicyOverrides;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  readonly overrideAdapterProperty?: boolean;
  /** Set Adapter PropertyOverrides for cluster. */
  readonly adapterPropertyOverrides?: HciEdgeDeviceAdapterPropertyOverrides;
}

export function hciEdgeDeviceIntentsDeserializer(item: any): HciEdgeDeviceIntents {
  return {
    scope: item["scope"],
    intentType: item["intentType"],
    isComputeIntentSet: item["isComputeIntentSet"],
    isStorageIntentSet: item["isStorageIntentSet"],
    isOnlyStorage: item["isOnlyStorage"],
    isManagementIntentSet: item["isManagementIntentSet"],
    isStretchIntentSet: item["isStretchIntentSet"],
    isOnlyStretch: item["isOnlyStretch"],
    isNetworkIntentType: item["isNetworkIntentType"],
    intentName: item["intentName"],
    intentAdapters: !item["intentAdapters"]
      ? item["intentAdapters"]
      : item["intentAdapters"].map((p: any) => {
          return p;
        }),
    overrideVirtualSwitchConfiguration: item["overrideVirtualSwitchConfiguration"],
    virtualSwitchConfigurationOverrides: !item["virtualSwitchConfigurationOverrides"]
      ? item["virtualSwitchConfigurationOverrides"]
      : hciEdgeDeviceVirtualSwitchConfigurationOverridesDeserializer(
          item["virtualSwitchConfigurationOverrides"],
        ),
    overrideQosPolicy: item["overrideQosPolicy"],
    qosPolicyOverrides: !item["qosPolicyOverrides"]
      ? item["qosPolicyOverrides"]
      : qosPolicyOverridesDeserializer(item["qosPolicyOverrides"]),
    overrideAdapterProperty: item["overrideAdapterProperty"],
    adapterPropertyOverrides: !item["adapterPropertyOverrides"]
      ? item["adapterPropertyOverrides"]
      : hciEdgeDeviceAdapterPropertyOverridesDeserializer(item["adapterPropertyOverrides"]),
  };
}

/** The VirtualSwitchConfigurationOverrides of a cluster. */
export interface HciEdgeDeviceVirtualSwitchConfigurationOverrides {
  /** Enable IoV for Virtual Switch */
  readonly enableIov?: string;
  /** Load Balancing Algorithm for Virtual Switch */
  readonly loadBalancingAlgorithm?: string;
}

export function hciEdgeDeviceVirtualSwitchConfigurationOverridesDeserializer(
  item: any,
): HciEdgeDeviceVirtualSwitchConfigurationOverrides {
  return {
    enableIov: item["enableIov"],
    loadBalancingAlgorithm: item["loadBalancingAlgorithm"],
  };
}

/** The AdapterPropertyOverrides of a cluster. */
export interface HciEdgeDeviceAdapterPropertyOverrides {
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  readonly jumboPacket?: string;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. */
  readonly networkDirect?: string;
  /** This parameter should only be modified based on your OEM guidance. Do not modify this parameter without OEM validation. Expected values are 'iWARP', 'RoCEv2', 'RoCE' */
  readonly networkDirectTechnology?: string;
}

export function hciEdgeDeviceAdapterPropertyOverridesDeserializer(
  item: any,
): HciEdgeDeviceAdapterPropertyOverrides {
  return {
    jumboPacket: item["jumboPacket"],
    networkDirect: item["networkDirect"],
    networkDirectTechnology: item["networkDirectTechnology"],
  };
}

export function hciEdgeDeviceStorageNetworksArrayDeserializer(
  result: Array<HciEdgeDeviceStorageNetworks>,
): any[] {
  return result.map((item) => {
    return hciEdgeDeviceStorageNetworksDeserializer(item);
  });
}

/** The StorageNetworks of a cluster. */
export interface HciEdgeDeviceStorageNetworks {
  /** Name of the storage network. */
  readonly name?: string;
  /** Name of the storage network adapter. */
  readonly networkAdapterName?: string;
  /** ID specified for the VLAN storage network. This setting is applied to the network interfaces that route the storage and VM migration traffic. */
  readonly storageVlanId?: string;
  /** List of Storage adapter physical nodes config to deploy AzureStackHCI Cluster. */
  readonly storageAdapterIPInfo?: HciEdgeDeviceStorageAdapterIPInfo[];
}

export function hciEdgeDeviceStorageNetworksDeserializer(item: any): HciEdgeDeviceStorageNetworks {
  return {
    name: item["name"],
    networkAdapterName: item["networkAdapterName"],
    storageVlanId: item["storageVlanId"],
    storageAdapterIPInfo: !item["storageAdapterIPInfo"]
      ? item["storageAdapterIPInfo"]
      : hciEdgeDeviceStorageAdapterIPInfoArrayDeserializer(item["storageAdapterIPInfo"]),
  };
}

export function hciEdgeDeviceStorageAdapterIPInfoArrayDeserializer(
  result: Array<HciEdgeDeviceStorageAdapterIPInfo>,
): any[] {
  return result.map((item) => {
    return hciEdgeDeviceStorageAdapterIPInfoDeserializer(item);
  });
}

/** The StorageAdapter physical nodes of a cluster. */
export interface HciEdgeDeviceStorageAdapterIPInfo {
  /** storage adapter physical node name. */
  readonly physicalNode?: string;
  /** The IPv4 address assigned to each storage adapter physical node on your Azure Stack HCI cluster. */
  readonly ipv4Address?: string;
  /** The SubnetMask address assigned to each storage adapter physical node on your Azure Stack HCI cluster. */
  readonly subnetMask?: string;
}

export function hciEdgeDeviceStorageAdapterIPInfoDeserializer(
  item: any,
): HciEdgeDeviceStorageAdapterIPInfo {
  return {
    physicalNode: item["physicalNode"],
    ipv4Address: item["ipv4Address"],
    subnetMask: item["subnetMask"],
  };
}

/** OS configurations for HCI device. */
export interface HciOsProfile {
  /** The boot type of the device. e.g. UEFI, Legacy etc */
  readonly bootType?: string;
  /** Version of assembly present on device */
  readonly assemblyVersion?: string;
}

export function hciOsProfileDeserializer(item: any): HciOsProfile {
  return {
    bootType: item["bootType"],
    assemblyVersion: item["assemblyVersion"],
  };
}

/** Solution builder extension (SBE) deployment package information. */
export interface SbeDeploymentPackageInfo {
  /** SBE deployment validation code. */
  readonly code?: string;
  /** A detailed message that explains the SBE package validation result. */
  readonly message?: string;
  /** This represents discovered update results for matching updates and store it as SBE manifest. */
  readonly sbeManifest?: string;
}

export function sbeDeploymentPackageInfoDeserializer(item: any): SbeDeploymentPackageInfo {
  return {
    code: item["code"],
    message: item["message"],
    sbeManifest: item["sbeManifest"],
  };
}

/** Storage configurations for HCI device. */
export interface HciStorageProfile {
  /** Number of storage disks in the device with $CanPool as true. */
  readonly poolableDisksCount?: number;
}

export function hciStorageProfileDeserializer(item: any): HciStorageProfile {
  return {
    poolableDisksCount: item["poolableDisksCount"],
  };
}

/** Hardware configurations for HCI device. */
export interface HciHardwareProfile {
  /** Process type of the device */
  readonly processorType?: string;
}

export function hciHardwareProfileDeserializer(item: any): HciHardwareProfile {
  return {
    processorType: item["processorType"],
  };
}

/** Reported properties pushed from edge device. */
export interface ReportedProperties {
  /** edge device state. */
  readonly deviceState?: DeviceState;
  /** Extensions details for edge device. */
  readonly extensionProfile?: ExtensionProfile;
  /** Most recent edge device sync timestamp in UTC. */
  readonly lastSyncTimestamp?: Date;
  /** CVM support details for edge device. */
  readonly confidentialVmProfile?: ConfidentialVmProfile;
}

export function reportedPropertiesDeserializer(item: any): ReportedProperties {
  return {
    deviceState: item["deviceState"],
    extensionProfile: !item["extensionProfile"]
      ? item["extensionProfile"]
      : extensionProfileDeserializer(item["extensionProfile"]),
    lastSyncTimestamp: !item["lastSyncTimestamp"]
      ? item["lastSyncTimestamp"]
      : new Date(item["lastSyncTimestamp"]),
    confidentialVmProfile: !item["confidentialVmProfile"]
      ? item["confidentialVmProfile"]
      : confidentialVmProfileDeserializer(item["confidentialVmProfile"]),
  };
}

/** The edge device state. */
export enum KnownDeviceState {
  /** The edge device state is not specified. */
  NotSpecified = "NotSpecified",
  /** The edge device state is in connected state. */
  Connected = "Connected",
  /** The edge device state is in disconnected state. */
  Disconnected = "Disconnected",
  /** The edge device state is in repairing state. */
  Repairing = "Repairing",
  /** The edge device state is in draining state. */
  Draining = "Draining",
  /** The edge device state is in maintenance state. */
  InMaintenance = "InMaintenance",
  /** The edge device state is in resuming state. */
  Resuming = "Resuming",
  /** The edge device state is in processing state. */
  Processing = "Processing",
}

/**
 * The edge device state. \
 * {@link KnownDeviceState} can be used interchangeably with DeviceState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The edge device state is not specified. \
 * **Connected**: The edge device state is in connected state. \
 * **Disconnected**: The edge device state is in disconnected state. \
 * **Repairing**: The edge device state is in repairing state. \
 * **Draining**: The edge device state is in draining state. \
 * **InMaintenance**: The edge device state is in maintenance state. \
 * **Resuming**: The edge device state is in resuming state. \
 * **Processing**: The edge device state is in processing state.
 */
export type DeviceState = string;

/** Extensions details for edge device. */
export interface ExtensionProfile {
  /** List of Arc extensions installed on edge device. */
  readonly extensions?: HciEdgeDeviceArcExtension[];
}

export function extensionProfileDeserializer(item: any): ExtensionProfile {
  return {
    extensions: !item["extensions"]
      ? item["extensions"]
      : hciEdgeDeviceArcExtensionArrayDeserializer(item["extensions"]),
  };
}

export function hciEdgeDeviceArcExtensionArrayDeserializer(
  result: Array<HciEdgeDeviceArcExtension>,
): any[] {
  return result.map((item) => {
    return hciEdgeDeviceArcExtensionDeserializer(item);
  });
}

/** Arc extension installed on edge device. */
export interface HciEdgeDeviceArcExtension {
  /** Arc extension name installed on edge device. */
  readonly extensionName?: string;
  /** Arc extension state from arc machine extension. */
  readonly state?: ArcExtensionState;
  /** Error details while installing Arc extension. */
  readonly errorDetails?: HciValidationFailureDetail[];
  /** Arc Extension Azure resource id. */
  readonly extensionResourceId?: string;
  /** Extension version installed. */
  readonly typeHandlerVersion?: string;
  /** Indicates whether the extension is managed by the user or by Azure. */
  readonly managedBy?: ExtensionManagedBy;
}

export function hciEdgeDeviceArcExtensionDeserializer(item: any): HciEdgeDeviceArcExtension {
  return {
    extensionName: item["extensionName"],
    state: item["state"],
    errorDetails: !item["errorDetails"]
      ? item["errorDetails"]
      : hciValidationFailureDetailArrayDeserializer(item["errorDetails"]),
    extensionResourceId: item["extensionResourceId"],
    typeHandlerVersion: item["typeHandlerVersion"],
    managedBy: item["managedBy"],
  };
}

/** Arc extension installation state. */
export enum KnownArcExtensionState {
  /** Arc extension state is not specified. */
  NotSpecified = "NotSpecified",
  /** Arc extension state is Succeeded. */
  Succeeded = "Succeeded",
  /** Arc extension state is Failed. */
  Failed = "Failed",
  /** Arc extension state is Canceled. */
  Canceled = "Canceled",
  /** Arc extension state is Accepted when extension installation triggered. */
  Accepted = "Accepted",
  /** Arc extension is in Creating State. */
  Creating = "Creating",
  /** Arc extension is in Updating State. */
  Updating = "Updating",
  /** Arc extension is in Moving State. */
  Moving = "Moving",
  /** Arc extension is in Deleting State. */
  Deleting = "Deleting",
  /** Arc extension is in Deleted State. */
  Deleted = "Deleted",
}

/**
 * Arc extension installation state. \
 * {@link KnownArcExtensionState} can be used interchangeably with ArcExtensionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: Arc extension state is not specified. \
 * **Succeeded**: Arc extension state is Succeeded. \
 * **Failed**: Arc extension state is Failed. \
 * **Canceled**: Arc extension state is Canceled. \
 * **Accepted**: Arc extension state is Accepted when extension installation triggered. \
 * **Creating**: Arc extension is in Creating State. \
 * **Updating**: Arc extension is in Updating State. \
 * **Moving**: Arc extension is in Moving State. \
 * **Deleting**: Arc extension is in Deleting State. \
 * **Deleted**: Arc extension is in Deleted State.
 */
export type ArcExtensionState = string;

export function hciValidationFailureDetailArrayDeserializer(
  result: Array<HciValidationFailureDetail>,
): any[] {
  return result.map((item) => {
    return hciValidationFailureDetailDeserializer(item);
  });
}

/** details of validation failure */
export interface HciValidationFailureDetail {
  /** Exception details while installing extension. */
  readonly exception?: string;
}

export function hciValidationFailureDetailDeserializer(item: any): HciValidationFailureDetail {
  return {
    exception: item["exception"],
  };
}

/** Indicates whether the extension is managed by the user or by Azure. */
export enum KnownExtensionManagedBy {
  /** The extension is managed by the user. */
  User = "User",
  /** The extension is managed by Azure. */
  Azure = "Azure",
}

/**
 * Indicates whether the extension is managed by the user or by Azure. \
 * {@link KnownExtensionManagedBy} can be used interchangeably with ExtensionManagedBy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The extension is managed by the user. \
 * **Azure**: The extension is managed by Azure.
 */
export type ExtensionManagedBy = string;

/** Represents the Confidential Virtual Machine (CVM) configuration status for an edge device. It includes the current IGVM support state and detailed component-level status information. */
export interface ConfidentialVmProfile {
  /** Indicates whether Independent Guest Virtual Machine (IGVM) support is available on the device. This will be 'Enabled' if the device supports CVMs, 'Disabled' if not, and 'Unknown' if the status cannot be determined. */
  readonly igvmStatus?: IgvmStatus;
  /** Provides detailed status entries for IGVM-related components, including deployment status, compatibility checks, and error diagnostics. */
  statusDetails?: IgvmStatusDetail[];
}

export function confidentialVmProfileDeserializer(item: any): ConfidentialVmProfile {
  return {
    igvmStatus: item["igvmStatus"],
    statusDetails: !item["statusDetails"]
      ? item["statusDetails"]
      : igvmStatusDetailArrayDeserializer(item["statusDetails"]),
  };
}

/** Represents the IGVM support status for the device. */
export enum KnownIgvmStatus {
  /** The IGVM status could not be determined due to a query failure or inconsistent system state. */
  Unknown = "Unknown",
  /** IGVM support is enabled, indicating that confidential VM features are available on this device. */
  Enabled = "Enabled",
  /** IGVM status is disabled, indicating that confidential VM features are not supported on this device. */
  Disabled = "Disabled",
}

/**
 * Represents the IGVM support status for the device. \
 * {@link KnownIgvmStatus} can be used interchangeably with IgvmStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The IGVM status could not be determined due to a query failure or inconsistent system state. \
 * **Enabled**: IGVM support is enabled, indicating that confidential VM features are available on this device. \
 * **Disabled**: IGVM status is disabled, indicating that confidential VM features are not supported on this device.
 */
export type IgvmStatus = string;

export function igvmStatusDetailArrayDeserializer(result: Array<IgvmStatusDetail>): any[] {
  return result.map((item) => {
    return igvmStatusDetailDeserializer(item);
  });
}

/** Provides component-level status information related to IGVM enablement on the device. */
export interface IgvmStatusDetail {
  /** A machine-readable status code indicating the result or condition of a specific IGVM-related check or operation. */
  readonly code?: string;
  /** A human-readable message providing context or explanation for the associated status code. */
  readonly message?: string;
}

export function igvmStatusDetailDeserializer(item: any): IgvmStatusDetail {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** Edge Device properties */
export interface EdgeDeviceProperties {
  /** Device Configuration */
  deviceConfiguration?: DeviceConfiguration;
  /** Provisioning state of edgeDevice resource */
  readonly provisioningState?: ProvisioningState;
}

export function edgeDevicePropertiesSerializer(item: EdgeDeviceProperties): any {
  return {
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : deviceConfigurationSerializer(item["deviceConfiguration"]),
  };
}

export function edgeDevicePropertiesDeserializer(item: any): EdgeDeviceProperties {
  return {
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : deviceConfigurationDeserializer(item["deviceConfiguration"]),
    provisioningState: item["provisioningState"],
  };
}

/** The device Configuration for edge device. */
export interface DeviceConfiguration {
  /** NIC Details of device */
  nicDetails?: NicDetail[];
  /** Device metadata details. */
  deviceMetadata?: string;
}

export function deviceConfigurationSerializer(item: DeviceConfiguration): any {
  return {
    nicDetails: !item["nicDetails"]
      ? item["nicDetails"]
      : nicDetailArraySerializer(item["nicDetails"]),
    deviceMetadata: item["deviceMetadata"],
  };
}

export function deviceConfigurationDeserializer(item: any): DeviceConfiguration {
  return {
    nicDetails: !item["nicDetails"]
      ? item["nicDetails"]
      : nicDetailArrayDeserializer(item["nicDetails"]),
    deviceMetadata: item["deviceMetadata"],
  };
}

export function nicDetailArraySerializer(result: Array<NicDetail>): any[] {
  return result.map((item) => {
    return nicDetailSerializer(item);
  });
}

export function nicDetailArrayDeserializer(result: Array<NicDetail>): any[] {
  return result.map((item) => {
    return nicDetailDeserializer(item);
  });
}

/** The NIC Detail of a device. */
export interface NicDetail {
  /** Adapter Name of NIC */
  adapterName?: string;
  /** Interface Description of NIC */
  interfaceDescription?: string;
  /** Component Id of NIC */
  componentId?: string;
  /** Driver Version of NIC */
  driverVersion?: string;
  /** Subnet Mask of NIC */
  ip4Address?: string;
  /** Subnet Mask of NIC */
  subnetMask?: string;
  /** Default Gateway of NIC */
  defaultGateway?: string;
  /** DNS Servers for NIC */
  dnsServers?: string[];
  /** Default Isolation of Management NIC */
  defaultIsolationId?: string;
}

export function nicDetailSerializer(item: NicDetail): any {
  return {
    adapterName: item["adapterName"],
    interfaceDescription: item["interfaceDescription"],
    componentId: item["componentId"],
    driverVersion: item["driverVersion"],
    ip4Address: item["ip4Address"],
    subnetMask: item["subnetMask"],
    defaultGateway: item["defaultGateway"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    defaultIsolationId: item["defaultIsolationId"],
  };
}

export function nicDetailDeserializer(item: any): NicDetail {
  return {
    adapterName: item["adapterName"],
    interfaceDescription: item["interfaceDescription"],
    componentId: item["componentId"],
    driverVersion: item["driverVersion"],
    ip4Address: item["ip4Address"],
    subnetMask: item["subnetMask"],
    defaultGateway: item["defaultGateway"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    defaultIsolationId: item["defaultIsolationId"],
  };
}

/** The response of a EdgeDevice list operation. */
export interface _EdgeDeviceListResult {
  /** The EdgeDevice items on this page */
  value: EdgeDeviceUnion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeDeviceListResultDeserializer(item: any): _EdgeDeviceListResult {
  return {
    value: edgeDeviceUnionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeDeviceUnionArraySerializer(result: Array<EdgeDeviceUnion>): any[] {
  return result.map((item) => {
    return edgeDeviceUnionSerializer(item);
  });
}

export function edgeDeviceUnionArrayDeserializer(result: Array<EdgeDeviceUnion>): any[] {
  return result.map((item) => {
    return edgeDeviceUnionDeserializer(item);
  });
}

/** The validate request for Edge Device. */
export interface ValidateRequest {
  /** Node Ids against which, current node has to be validated. */
  edgeDeviceIds: string[];
  /** Additional info required for validation. */
  additionalInfo?: string;
}

export function validateRequestSerializer(item: ValidateRequest): any {
  return {
    edgeDeviceIds: item["edgeDeviceIds"].map((p: any) => {
      return p;
    }),
    additionalInfo: item["additionalInfo"],
  };
}

/** An Accepted response with an Operation-Location header. */
export interface ValidateResponse {
  /** edge device validation status */
  readonly status?: string;
}

export function validateResponseDeserializer(item: any): ValidateResponse {
  return {
    status: item["status"],
  };
}

/** Details of a particular extension in HCI Cluster. */
export interface Extension extends ProxyResource {
  /** Provisioning state of the Extension proxy resource. Indicates the current lifecycle status of the resource, such as whether it's being created, updated, deleted, or has encountered an error. */
  readonly provisioningState?: ProvisioningState;
  /** Parameters specific to this extension type. */
  extensionParameters?: ExtensionParameters;
  /** Aggregate state of Arc Extensions across the nodes in this HCI cluster. This reflects the overall status of the extension deployment and operation across all nodes. */
  readonly aggregateState?: ExtensionAggregateState;
  /** State of Arc Extension in each of the nodes. */
  readonly perNodeExtensionDetails?: PerNodeExtensionState[];
  /** Indicates if the extension is managed by Azure or the user. This determines who controls the deployment and lifecycle of the extension. */
  readonly managedBy?: ExtensionManagedBy;
}

export function extensionSerializer(item: Extension): any {
  return {
    properties: areAllPropsUndefined(item, ["extensionParameters"])
      ? undefined
      : _extensionPropertiesSerializer(item),
  };
}

export function extensionDeserializer(item: any): Extension {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _extensionPropertiesDeserializer(item["properties"])),
  };
}

/** Status of Arc Extension for a particular node in HCI Cluster. */
export interface ExtensionProperties {
  /** Provisioning state of the Extension proxy resource. Indicates the current lifecycle status of the resource, such as whether it's being created, updated, deleted, or has encountered an error. */
  readonly provisioningState?: ProvisioningState;
  /** Aggregate state of Arc Extensions across the nodes in this HCI cluster. This reflects the overall status of the extension deployment and operation across all nodes. */
  readonly aggregateState?: ExtensionAggregateState;
  /** State of Arc Extension in each of the nodes. */
  readonly perNodeExtensionDetails?: PerNodeExtensionState[];
  /** Indicates if the extension is managed by Azure or the user. This determines who controls the deployment and lifecycle of the extension. */
  readonly managedBy?: ExtensionManagedBy;
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. Latest version would be used if not specified. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** Protected settings (may contain secrets). */
  protectedSettings?: any;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version available. */
  enableAutomaticUpgrade?: boolean;
}

export function extensionPropertiesSerializer(item: ExtensionProperties): any {
  return {
    extensionParameters: areAllPropsUndefined(item, [
      "forceUpdateTag",
      "publisher",
      "type",
      "typeHandlerVersion",
      "autoUpgradeMinorVersion",
      "settings",
      "protectedSettings",
      "enableAutomaticUpgrade",
    ])
      ? undefined
      : _extensionPropertiesExtensionParametersSerializer(item),
  };
}

export function extensionPropertiesDeserializer(item: any): ExtensionProperties {
  return {
    provisioningState: item["provisioningState"],
    ...(!item["extensionParameters"]
      ? item["extensionParameters"]
      : _extensionPropertiesExtensionParametersDeserializer(item["extensionParameters"])),
    aggregateState: item["aggregateState"],
    perNodeExtensionDetails: !item["perNodeExtensionDetails"]
      ? item["perNodeExtensionDetails"]
      : perNodeExtensionStateArrayDeserializer(item["perNodeExtensionDetails"]),
    managedBy: item["managedBy"],
  };
}

/** Describes the properties of a Machine Extension. This object mirrors the definition in HybridCompute. */
export interface ExtensionParameters {
  /** How the extension handler should be forced to update even if the extension configuration has not changed. */
  forceUpdateTag?: string;
  /** The name of the extension handler publisher. */
  publisher?: string;
  /** Specifies the type of the extension; an example is "CustomScriptExtension". */
  type?: string;
  /** Specifies the version of the script handler. Latest version would be used if not specified. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should use a newer minor version if one is available at deployment time. Once deployed, however, the extension will not upgrade minor versions unless redeployed, even with this property set to true. */
  autoUpgradeMinorVersion?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** Protected settings (may contain secrets). */
  protectedSettings?: any;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version available. */
  enableAutomaticUpgrade?: boolean;
}

export function extensionParametersSerializer(item: ExtensionParameters): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

export function extensionParametersDeserializer(item: any): ExtensionParameters {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

/** Aggregate state of Arc Extensions across the nodes in this HCI cluster. This reflects the overall status of the extension deployment and operation across all nodes. */
export enum KnownExtensionAggregateState {
  /** The aggregate state is not specified. */
  NotSpecified = "NotSpecified",
  /** An error occurred in the aggregate state. */
  Error = "Error",
  /** The operation succeeded across all nodes. */
  Succeeded = "Succeeded",
  /** The operation was canceled across the nodes. */
  Canceled = "Canceled",
  /** The operation failed on all or most nodes. */
  Failed = "Failed",
  /** All nodes are connected. */
  Connected = "Connected",
  /** All nodes are disconnected. */
  Disconnected = "Disconnected",
  /** The extension has been deleted from all nodes. */
  Deleted = "Deleted",
  /** The extension is being created across the nodes. */
  Creating = "Creating",
  /** The extension is being updated across the nodes. */
  Updating = "Updating",
  /** The extension is being deleted across the nodes. */
  Deleting = "Deleting",
  /** The extension is being moved across the nodes. */
  Moving = "Moving",
  /** The operation succeeded on some nodes. */
  PartiallySucceeded = "PartiallySucceeded",
  /** Some nodes are connected, others are not. */
  PartiallyConnected = "PartiallyConnected",
  /** The operation is currently in progress across the nodes. */
  InProgress = "InProgress",
  /** The operation has been accepted and is pending execution. */
  Accepted = "Accepted",
  /** The extension is currently being provisioned across the nodes. */
  Provisioning = "Provisioning",
  /** Extension upgrade failed, but rollback succeeded across the nodes. */
  UpgradeFailedRollbackSucceeded = "UpgradeFailedRollbackSucceeded",
}

/**
 * Aggregate state of Arc Extensions across the nodes in this HCI cluster. This reflects the overall status of the extension deployment and operation across all nodes. \
 * {@link KnownExtensionAggregateState} can be used interchangeably with ExtensionAggregateState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The aggregate state is not specified. \
 * **Error**: An error occurred in the aggregate state. \
 * **Succeeded**: The operation succeeded across all nodes. \
 * **Canceled**: The operation was canceled across the nodes. \
 * **Failed**: The operation failed on all or most nodes. \
 * **Connected**: All nodes are connected. \
 * **Disconnected**: All nodes are disconnected. \
 * **Deleted**: The extension has been deleted from all nodes. \
 * **Creating**: The extension is being created across the nodes. \
 * **Updating**: The extension is being updated across the nodes. \
 * **Deleting**: The extension is being deleted across the nodes. \
 * **Moving**: The extension is being moved across the nodes. \
 * **PartiallySucceeded**: The operation succeeded on some nodes. \
 * **PartiallyConnected**: Some nodes are connected, others are not. \
 * **InProgress**: The operation is currently in progress across the nodes. \
 * **Accepted**: The operation has been accepted and is pending execution. \
 * **Provisioning**: The extension is currently being provisioned across the nodes. \
 * **UpgradeFailedRollbackSucceeded**: Extension upgrade failed, but rollback succeeded across the nodes.
 */
export type ExtensionAggregateState = string;

export function perNodeExtensionStateArrayDeserializer(
  result: Array<PerNodeExtensionState>,
): any[] {
  return result.map((item) => {
    return perNodeExtensionStateDeserializer(item);
  });
}

/** Status of Arc Extension for a particular node in HCI Cluster. */
export interface PerNodeExtensionState {
  /** Name of the node in HCI Cluster. */
  readonly name?: string;
  /** Fully qualified resource ID for the particular Arc Extension on this node. */
  readonly extension?: string;
  /** Specifies the version of the script handler. */
  readonly typeHandlerVersion?: string;
  /** State of Arc Extension in this node. Reflects the current lifecycle status of the extension on the individual node, such as whether it's being created, updated, deleted, or has encountered an error. */
  readonly state?: NodeExtensionState;
  /** The extension instance view. */
  readonly instanceView?: ExtensionInstanceView;
}

export function perNodeExtensionStateDeserializer(item: any): PerNodeExtensionState {
  return {
    name: item["name"],
    extension: item["extension"],
    typeHandlerVersion: item["typeHandlerVersion"],
    state: item["state"],
    instanceView: !item["instanceView"]
      ? item["instanceView"]
      : extensionInstanceViewDeserializer(item["instanceView"]),
  };
}

/** State of Arc Extension in this node. Reflects the current lifecycle status of the extension on the individual node, such as whether it's being created, updated, deleted, or has encountered an error. */
export enum KnownNodeExtensionState {
  /** The state is not specified. */
  NotSpecified = "NotSpecified",
  /** An error occurred during the extension lifecycle. */
  Error = "Error",
  /** The extension operation completed successfully. */
  Succeeded = "Succeeded",
  /** The extension operation was canceled. */
  Canceled = "Canceled",
  /** The extension operation failed. */
  Failed = "Failed",
  /** The extension is connected on the node. */
  Connected = "Connected",
  /** The extension is disconnected on the node. */
  Disconnected = "Disconnected",
  /** The extension has been deleted from the node. */
  Deleted = "Deleted",
  /** The extension is being created on the node. */
  Creating = "Creating",
  /** The extension is being updated on the node. */
  Updating = "Updating",
  /** The extension is being deleted from the node. */
  Deleting = "Deleting",
  /** The extension is being moved on the node. */
  Moving = "Moving",
  /** The extension operation partially succeeded. */
  PartiallySucceeded = "PartiallySucceeded",
  /** The extension is partially connected on the node. */
  PartiallyConnected = "PartiallyConnected",
  /** The extension operation is currently in progress. */
  InProgress = "InProgress",
  /** The extension operation has been accepted and is pending execution. */
  Accepted = "Accepted",
  /** The extension is currently being provisioned on the node. */
  Provisioning = "Provisioning",
}

/**
 * State of Arc Extension in this node. Reflects the current lifecycle status of the extension on the individual node, such as whether it's being created, updated, deleted, or has encountered an error. \
 * {@link KnownNodeExtensionState} can be used interchangeably with NodeExtensionState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The state is not specified. \
 * **Error**: An error occurred during the extension lifecycle. \
 * **Succeeded**: The extension operation completed successfully. \
 * **Canceled**: The extension operation was canceled. \
 * **Failed**: The extension operation failed. \
 * **Connected**: The extension is connected on the node. \
 * **Disconnected**: The extension is disconnected on the node. \
 * **Deleted**: The extension has been deleted from the node. \
 * **Creating**: The extension is being created on the node. \
 * **Updating**: The extension is being updated on the node. \
 * **Deleting**: The extension is being deleted from the node. \
 * **Moving**: The extension is being moved on the node. \
 * **PartiallySucceeded**: The extension operation partially succeeded. \
 * **PartiallyConnected**: The extension is partially connected on the node. \
 * **InProgress**: The extension operation is currently in progress. \
 * **Accepted**: The extension operation has been accepted and is pending execution. \
 * **Provisioning**: The extension is currently being provisioned on the node.
 */
export type NodeExtensionState = string;

/** Describes the Extension Instance View. */
export interface ExtensionInstanceView {
  /** The extension name. */
  name?: string;
  /** Specifies the type of the extension; an example is "MicrosoftMonitoringAgent". */
  type?: string;
  /** Specifies the version of the script handler. */
  typeHandlerVersion?: string;
  /** Instance view status. */
  status?: ExtensionInstanceViewStatus;
}

export function extensionInstanceViewDeserializer(item: any): ExtensionInstanceView {
  return {
    name: item["name"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    status: !item["status"]
      ? item["status"]
      : extensionInstanceViewStatusDeserializer(item["status"]),
  };
}

/** Instance view status. */
export interface ExtensionInstanceViewStatus {
  /** The status code. */
  code?: string;
  /** The level code. Indicates the severity or importance of the status message. */
  level?: StatusLevelTypes;
  /** The short localizable label for the status. */
  displayStatus?: string;
  /** The detailed status message, including for alerts and error messages. */
  message?: string;
  /** The time of the status. */
  time?: Date;
}

export function extensionInstanceViewStatusDeserializer(item: any): ExtensionInstanceViewStatus {
  return {
    code: item["code"],
    level: item["level"],
    displayStatus: item["displayStatus"],
    message: item["message"],
    time: !item["time"] ? item["time"] : new Date(item["time"]),
  };
}

/** The level code. Indicates the severity or importance of the status message. */
export enum KnownStatusLevelTypes {
  /** Informational message indicating normal operation. */
  Info = "Info",
  /** Warning message indicating a potential issue or non-critical problem. */
  Warning = "Warning",
  /** Error message indicating a failure or critical issue. */
  Error = "Error",
}

/**
 * The level code. Indicates the severity or importance of the status message. \
 * {@link KnownStatusLevelTypes} can be used interchangeably with StatusLevelTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Info**: Informational message indicating normal operation. \
 * **Warning**: Warning message indicating a potential issue or non-critical problem. \
 * **Error**: Error message indicating a failure or critical issue.
 */
export type StatusLevelTypes = string;

/** Extension Details to update */
export interface ExtensionPatch {
  /** Describes the properties of a Machine Extension that can be updated. */
  extensionParameters?: ExtensionPatchParameters;
}

export function extensionPatchSerializer(item: ExtensionPatch): any {
  return {
    properties: areAllPropsUndefined(item, ["extensionParameters"])
      ? undefined
      : _extensionPatchPropertiesSerializer(item),
  };
}

/** Describes Machine Extension Properties that can be updated. */
export interface ExtensionPatchProperties {
  /** Describes the properties of a Machine Extension that can be updated. */
  extensionParameters?: ExtensionPatchParameters;
}

export function extensionPatchPropertiesSerializer(item: ExtensionPatchProperties): any {
  return {
    extensionParameters: !item["extensionParameters"]
      ? item["extensionParameters"]
      : extensionPatchParametersSerializer(item["extensionParameters"]),
  };
}

/** Describes the properties of a Machine Extension that can be updated. */
export interface ExtensionPatchParameters {
  /** Specifies the version of the script handler. Latest version would be used if not specified. */
  typeHandlerVersion?: string;
  /** Indicates whether the extension should be automatically upgraded by the platform if there is a newer version available. */
  enableAutomaticUpgrade?: boolean;
  /** Json formatted public settings for the extension. */
  settings?: any;
  /** Protected settings (may contain secrets). */
  protectedSettings?: any;
}

export function extensionPatchParametersSerializer(item: ExtensionPatchParameters): any {
  return {
    typeHandlerVersion: item["typeHandlerVersion"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
  };
}

/** List of Extensions in HCI cluster. */
export interface _ExtensionList {
  /** The Extension items on this page */
  value: Extension[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _extensionListDeserializer(item: any): _ExtensionList {
  return {
    value: extensionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function extensionArraySerializer(result: Array<Extension>): any[] {
  return result.map((item) => {
    return extensionSerializer(item);
  });
}

export function extensionArrayDeserializer(result: Array<Extension>): any[] {
  return result.map((item) => {
    return extensionDeserializer(item);
  });
}

/** Describes the parameters for Extension upgrade. */
export interface ExtensionUpgradeParameters {
  /** Extension Upgrade Target Version. */
  targetVersion?: string;
}

export function extensionUpgradeParametersSerializer(item: ExtensionUpgradeParameters): any {
  return { targetVersion: item["targetVersion"] };
}

/** Publisher details. */
export interface Publisher extends ProxyResource {
  /** Provisioning State */
  readonly provisioningState?: string;
}

export function publisherDeserializer(item: any): Publisher {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _publisherPropertiesDeserializer(item["properties"])),
  };
}

/** Publisher properties. */
export interface PublisherProperties {
  /** Provisioning State */
  readonly provisioningState?: string;
}

export function publisherPropertiesDeserializer(item: any): PublisherProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** List of Publisher proxy resources for the HCI cluster. */
export interface _PublisherList {
  /** The Publisher items on this page */
  value: Publisher[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _publisherListDeserializer(item: any): _PublisherList {
  return {
    value: publisherArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function publisherArrayDeserializer(result: Array<Publisher>): any[] {
  return result.map((item) => {
    return publisherDeserializer(item);
  });
}

/** Security settings proxy resource */
export interface SecuritySetting extends ProxyResource {
  /** Secured Core Compliance Assignment */
  securedCoreComplianceAssignment?: ComplianceAssignmentType;
  /** WDAC Compliance Assignment */
  wdacComplianceAssignment?: ComplianceAssignmentType;
  /** SMB encryption for intra-cluster traffic Compliance Assignment */
  smbEncryptionForIntraClusterTrafficComplianceAssignment?: ComplianceAssignmentType;
  /** Security Compliance Status */
  readonly securityComplianceStatus?: SecurityComplianceStatus;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function securitySettingSerializer(item: SecuritySetting): any {
  return {
    properties: areAllPropsUndefined(item, [
      "securedCoreComplianceAssignment",
      "wdacComplianceAssignment",
      "smbEncryptionForIntraClusterTrafficComplianceAssignment",
    ])
      ? undefined
      : _securitySettingPropertiesSerializer(item),
  };
}

export function securitySettingDeserializer(item: any): SecuritySetting {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _securitySettingPropertiesDeserializer(item["properties"])),
  };
}

/** Security properties of the resource */
export interface SecurityProperties {
  /** Secured Core Compliance Assignment */
  securedCoreComplianceAssignment?: ComplianceAssignmentType;
  /** WDAC Compliance Assignment */
  wdacComplianceAssignment?: ComplianceAssignmentType;
  /** SMB encryption for intra-cluster traffic Compliance Assignment */
  smbEncryptionForIntraClusterTrafficComplianceAssignment?: ComplianceAssignmentType;
  /** Security Compliance Status */
  readonly securityComplianceStatus?: SecurityComplianceStatus;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function securityPropertiesSerializer(item: SecurityProperties): any {
  return {
    securedCoreComplianceAssignment: item["securedCoreComplianceAssignment"],
    wdacComplianceAssignment: item["wdacComplianceAssignment"],
    smbEncryptionForIntraClusterTrafficComplianceAssignment:
      item["smbEncryptionForIntraClusterTrafficComplianceAssignment"],
  };
}

export function securityPropertiesDeserializer(item: any): SecurityProperties {
  return {
    securedCoreComplianceAssignment: item["securedCoreComplianceAssignment"],
    wdacComplianceAssignment: item["wdacComplianceAssignment"],
    smbEncryptionForIntraClusterTrafficComplianceAssignment:
      item["smbEncryptionForIntraClusterTrafficComplianceAssignment"],
    securityComplianceStatus: !item["securityComplianceStatus"]
      ? item["securityComplianceStatus"]
      : securityComplianceStatusDeserializer(item["securityComplianceStatus"]),
    provisioningState: item["provisioningState"],
  };
}

/** Represents the compliance assignment type of a resource. */
export enum KnownComplianceAssignmentType {
  /** Report on the state of the machine, but don't make changes. */
  Audit = "Audit",
  /** Applied to the machine. If it drifts, the local service inside the machine makes a correction at the next evaluation. */
  ApplyAndAutoCorrect = "ApplyAndAutoCorrect",
}

/**
 * Represents the compliance assignment type of a resource. \
 * {@link KnownComplianceAssignmentType} can be used interchangeably with ComplianceAssignmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Audit**: Report on the state of the machine, but don't make changes. \
 * **ApplyAndAutoCorrect**: Applied to the machine. If it drifts, the local service inside the machine makes a correction at the next evaluation.
 */
export type ComplianceAssignmentType = string;

/** Security compliance properties of the resource */
export interface SecurityComplianceStatus {
  /** Indicates whether HCI hosts meets secured-core server requirements. */
  readonly securedCoreCompliance?: ComplianceStatus;
  /** Indicates whether HCI hosts have enforced consistent Windows Defender Application Control. */
  readonly wdacCompliance?: ComplianceStatus;
  /** Indicates whether data at-rest encryption is enabled on Azure Stack HCI clustered volumes. */
  readonly dataAtRestEncrypted?: ComplianceStatus;
  /** Indicates whether HCI cluster has data in-transit protection. */
  readonly dataInTransitProtected?: ComplianceStatus;
  /** Time in UTC when compliance status was last updated. */
  readonly lastUpdated?: Date;
}

export function securityComplianceStatusDeserializer(item: any): SecurityComplianceStatus {
  return {
    securedCoreCompliance: item["securedCoreCompliance"],
    wdacCompliance: item["wdacCompliance"],
    dataAtRestEncrypted: item["dataAtRestEncrypted"],
    dataInTransitProtected: item["dataInTransitProtected"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
  };
}

/** Represents the compliance status of a resource. */
export enum KnownComplianceStatus {
  /** The resource is compliant */
  Compliant = "Compliant",
  /** The resource is non-compliant */
  NonCompliant = "NonCompliant",
  /** The resource compliance status is pending */
  Pending = "Pending",
}

/**
 * Represents the compliance status of a resource. \
 * {@link KnownComplianceStatus} can be used interchangeably with ComplianceStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Compliant**: The resource is compliant \
 * **NonCompliant**: The resource is non-compliant \
 * **Pending**: The resource compliance status is pending
 */
export type ComplianceStatus = string;

/** The response of a SecuritySetting list operation. */
export interface _SecuritySettingListResult {
  /** The SecuritySetting items on this page */
  value: SecuritySetting[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _securitySettingListResultDeserializer(item: any): _SecuritySettingListResult {
  return {
    value: securitySettingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function securitySettingArraySerializer(result: Array<SecuritySetting>): any[] {
  return result.map((item) => {
    return securitySettingSerializer(item);
  });
}

export function securitySettingArrayDeserializer(result: Array<SecuritySetting>): any[] {
  return result.map((item) => {
    return securitySettingDeserializer(item);
  });
}

/** Sku details. */
export interface Sku extends ProxyResource {
  /** Provisioning State */
  readonly provisioningState?: string;
  /** Identifier of the Publisher for the offer */
  publisherId?: string;
  /** Identifier of the Offer for the sku */
  offerId?: string;
  /** JSON serialized catalog content of the sku offer */
  content?: string;
  /** The API version of the catalog service used to serve the catalog content */
  contentVersion?: string;
  /** Array of SKU mappings */
  skuMappings?: SkuMappings[];
}

export function skuDeserializer(item: any): Sku {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"] ? item["properties"] : _skuPropertiesDeserializer(item["properties"])),
  };
}

/** SKU properties. */
export interface SkuProperties {
  /** Provisioning State */
  readonly provisioningState?: string;
  /** Identifier of the Publisher for the offer */
  publisherId?: string;
  /** Identifier of the Offer for the sku */
  offerId?: string;
  /** JSON serialized catalog content of the sku offer */
  content?: string;
  /** The API version of the catalog service used to serve the catalog content */
  contentVersion?: string;
  /** Array of SKU mappings */
  skuMappings?: SkuMappings[];
}

export function skuPropertiesDeserializer(item: any): SkuProperties {
  return {
    provisioningState: item["provisioningState"],
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    content: item["content"],
    contentVersion: item["contentVersion"],
    skuMappings: !item["skuMappings"]
      ? item["skuMappings"]
      : skuMappingsArrayDeserializer(item["skuMappings"]),
  };
}

/** List of SKU proxy resources for the HCI cluster. */
export interface _SkuList {
  /** The Sku items on this page */
  value: Sku[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _skuListDeserializer(item: any): _SkuList {
  return {
    value: skuArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function skuArrayDeserializer(result: Array<Sku>): any[] {
  return result.map((item) => {
    return skuDeserializer(item);
  });
}

/** Details of an Update run */
export interface UpdateRun extends ProxyResource {
  /** The geo-location where the resource lives */
  location?: string;
  /** Provisioning state of the UpdateRuns proxy resource. Indicates the current lifecycle status of the update operation, such as whether it has been accepted, is in progress, or has completed. */
  readonly provisioningState?: ProvisioningState;
  /** Timestamp of the update run was started. */
  timeStarted?: Date;
  /** Timestamp of the most recently completed step in the update run. */
  lastUpdatedTime?: Date;
  /** Duration of the update run. */
  duration?: string;
  /** Represents the current state of the update run. Indicates whether the update is in progress, has completed successfully, failed, or is in an unknown state. */
  state?: UpdateRunPropertiesState;
  /** Progress representation of the update run steps. */
  progress?: Step;
}

export function updateRunSerializer(item: UpdateRun): any {
  return {
    properties: areAllPropsUndefined(item, [
      "timeStarted",
      "lastUpdatedTime",
      "duration",
      "state",
      "progress",
    ])
      ? undefined
      : _updateRunPropertiesSerializer(item),
    location: item["location"],
  };
}

export function updateRunDeserializer(item: any): UpdateRun {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _updateRunPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Details of an Update run */
export interface UpdateRunProperties {
  /** Provisioning state of the UpdateRuns proxy resource. Indicates the current lifecycle status of the update operation, such as whether it has been accepted, is in progress, or has completed. */
  readonly provisioningState?: ProvisioningState;
  /** Timestamp of the update run was started. */
  timeStarted?: Date;
  /** Timestamp of the most recently completed step in the update run. */
  lastUpdatedTime?: Date;
  /** Duration of the update run. */
  duration?: string;
  /** Represents the current state of the update run. Indicates whether the update is in progress, has completed successfully, failed, or is in an unknown state. */
  state?: UpdateRunPropertiesState;
  /** Name of the step. */
  name?: string;
  /** More detailed description of the step. */
  description?: string;
  /** Error message, specified if the step is in a failed state. */
  errorMessage?: string;
  /** Status of the step, bubbled up from the ECE action plan for installation attempts. Values are: 'Success', 'Error', 'InProgress', and 'Unknown status'. */
  status?: string;
  /** When the step started, or empty if it has not started executing. */
  startTimeUtc?: Date;
  /** When the step reached a terminal state. */
  endTimeUtc?: Date;
  /** Completion time of this step or the last completed sub-step. */
  lastUpdatedTimeUtc?: Date;
  /** Expected execution time of a given step. This is optionally authored in the update action plan and can be empty. */
  expectedExecutionTime?: string;
  /** Recursive model for child steps of this step. */
  steps?: Step[];
}

export function updateRunPropertiesSerializer(item: UpdateRunProperties): any {
  return {
    timeStarted: !item["timeStarted"] ? item["timeStarted"] : item["timeStarted"].toISOString(),
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : item["lastUpdatedTime"].toISOString(),
    duration: item["duration"],
    state: item["state"],
    progress: areAllPropsUndefined(item, [
      "name",
      "description",
      "errorMessage",
      "status",
      "startTimeUtc",
      "endTimeUtc",
      "lastUpdatedTimeUtc",
      "expectedExecutionTime",
      "steps",
    ])
      ? undefined
      : _updateRunPropertiesProgressSerializer(item),
  };
}

export function updateRunPropertiesDeserializer(item: any): UpdateRunProperties {
  return {
    provisioningState: item["provisioningState"],
    timeStarted: !item["timeStarted"] ? item["timeStarted"] : new Date(item["timeStarted"]),
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    duration: item["duration"],
    state: item["state"],
    ...(!item["progress"]
      ? item["progress"]
      : _updateRunPropertiesProgressDeserializer(item["progress"])),
  };
}

/** Represents the current state of the update run. Indicates whether the update is in progress, has completed successfully, failed, or is in an unknown state. */
export enum KnownUpdateRunPropertiesState {
  /** The state of the update run is not known. */
  Unknown = "Unknown",
  /** The update run completed successfully. */
  Succeeded = "Succeeded",
  /** The update run is currently in progress. */
  InProgress = "InProgress",
  /** The update run failed to complete successfully. */
  Failed = "Failed",
}

/**
 * Represents the current state of the update run. Indicates whether the update is in progress, has completed successfully, failed, or is in an unknown state. \
 * {@link KnownUpdateRunPropertiesState} can be used interchangeably with UpdateRunPropertiesState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The state of the update run is not known. \
 * **Succeeded**: The update run completed successfully. \
 * **InProgress**: The update run is currently in progress. \
 * **Failed**: The update run failed to complete successfully.
 */
export type UpdateRunPropertiesState = string;

/** Progress representation of the update run steps. */
export interface Step {
  /** Name of the step. */
  name?: string;
  /** More detailed description of the step. */
  description?: string;
  /** Error message, specified if the step is in a failed state. */
  errorMessage?: string;
  /** Status of the step, bubbled up from the ECE action plan for installation attempts. Values are: 'Success', 'Error', 'InProgress', and 'Unknown status'. */
  status?: string;
  /** When the step started, or empty if it has not started executing. */
  startTimeUtc?: Date;
  /** When the step reached a terminal state. */
  endTimeUtc?: Date;
  /** Completion time of this step or the last completed sub-step. */
  lastUpdatedTimeUtc?: Date;
  /** Expected execution time of a given step. This is optionally authored in the update action plan and can be empty. */
  expectedExecutionTime?: string;
  /** Recursive model for child steps of this step. */
  steps?: Step[];
}

export function stepSerializer(item: Step): any {
  return {
    name: item["name"],
    description: item["description"],
    errorMessage: item["errorMessage"],
    status: item["status"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : item["startTimeUtc"].toISOString(),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : item["endTimeUtc"].toISOString(),
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : item["lastUpdatedTimeUtc"].toISOString(),
    expectedExecutionTime: item["expectedExecutionTime"],
    steps: !item["steps"] ? item["steps"] : stepArraySerializer(item["steps"]),
  };
}

export function stepDeserializer(item: any): Step {
  return {
    name: item["name"],
    description: item["description"],
    errorMessage: item["errorMessage"],
    status: item["status"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : new Date(item["lastUpdatedTimeUtc"]),
    expectedExecutionTime: item["expectedExecutionTime"],
    steps: !item["steps"] ? item["steps"] : stepArrayDeserializer(item["steps"]),
  };
}

export function stepArraySerializer(result: Array<Step>): any[] {
  return result.map((item) => {
    return stepSerializer(item);
  });
}

export function stepArrayDeserializer(result: Array<Step>): any[] {
  return result.map((item) => {
    return stepDeserializer(item);
  });
}

/** List of Update runs */
export interface _UpdateRunList {
  /** The UpdateRun items on this page */
  value: UpdateRun[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateRunListDeserializer(item: any): _UpdateRunList {
  return {
    value: updateRunArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateRunArraySerializer(result: Array<UpdateRun>): any[] {
  return result.map((item) => {
    return updateRunSerializer(item);
  });
}

export function updateRunArrayDeserializer(result: Array<UpdateRun>): any[] {
  return result.map((item) => {
    return updateRunDeserializer(item);
  });
}

/** Update details */
export interface Update extends ProxyResource {
  /** The geo-location where the resource lives */
  location?: string;
  /** Provisioning state of the Updates proxy resource. Indicates the current lifecycle status of the update operation, such as whether it has been accepted, is in progress, or has completed. */
  readonly provisioningState?: ProvisioningState;
  /** Date that the update was installed. */
  installedDate?: Date;
  /** Description of the update. */
  description?: string;
  /** Minimum Sbe Version of the update. */
  minSbeVersionRequired?: string;
  /** Represents the current state of the update as it relates to this stamp. This includes phases such as preparation, installation, scanning, and error handling, providing insight into the update's progress and any issues encountered. */
  state?: State;
  /** If update State is HasPrerequisite, this property contains an array of objects describing prerequisite updates before installing this update. Otherwise, it is empty. */
  prerequisites?: UpdatePrerequisite[];
  /** An array of component versions for a Solution Bundle update, and an empty array otherwise. */
  componentVersions?: PackageVersionInfo[];
  /** Indicates whether a reboot is required after the update or operation. Helps determine if a system restart is necessary to complete the process. */
  rebootRequired?: RebootRequirement;
  /** Overall health state for update-specific health checks. */
  healthState?: HealthState;
  /** An array of PrecheckResult objects. */
  healthCheckResult?: PrecheckResult[];
  /** Last time the package-specific checks were run. */
  healthCheckDate?: Date;
  /** Path where the update package is available. */
  packagePath?: string;
  /** Size of the package. This value is a combination of the size from update metadata and size of the payload that results from the live scan operation for OS update content. */
  packageSizeInMb?: number;
  /** Display name of the Update */
  displayName?: string;
  /** Version of the update. */
  version?: string;
  /** Publisher of the update package. */
  publisher?: string;
  /** Link to release notes for the update. */
  releaseLink?: string;
  /** Indicates how the update content is made available for download. This determines whether the update is sourced locally, from an online repository, or requires user notification. */
  availabilityType?: AvailabilityType;
  /** Customer-visible type of the update. */
  packageType?: string;
  /** Extensible KV pairs serialized as a string. This is currently used to report the stamp OEM family and hardware model information when an update is flagged as Invalid for the stamp based on OEM type. */
  additionalProperties?: string;
  /** Additional information regarding the state of the update. See definition of UpdateStateProperties type below for more details on this property. */
  updateStateProperties?: UpdateStateProperties;
}

export function updateSerializer(item: Update): any {
  return {
    properties: areAllPropsUndefined(item, [
      "installedDate",
      "description",
      "minSbeVersionRequired",
      "state",
      "prerequisites",
      "componentVersions",
      "rebootRequired",
      "healthState",
      "healthCheckResult",
      "healthCheckDate",
      "packagePath",
      "packageSizeInMb",
      "displayName",
      "version",
      "publisher",
      "releaseLink",
      "availabilityType",
      "packageType",
      "additionalProperties",
      "updateStateProperties",
    ])
      ? undefined
      : _updatePropertiesSerializer(item),
    location: item["location"],
  };
}

export function updateDeserializer(item: any): Update {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _updatePropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Details of a singular Update in HCI Cluster */
export interface UpdateProperties {
  /** Provisioning state of the Updates proxy resource. Indicates the current lifecycle status of the update operation, such as whether it has been accepted, is in progress, or has completed. */
  readonly provisioningState?: ProvisioningState;
  /** Date that the update was installed. */
  installedDate?: Date;
  /** Description of the update. */
  description?: string;
  /** Minimum Sbe Version of the update. */
  minSbeVersionRequired?: string;
  /** Represents the current state of the update as it relates to this stamp. This includes phases such as preparation, installation, scanning, and error handling, providing insight into the update's progress and any issues encountered. */
  state?: State;
  /** If update State is HasPrerequisite, this property contains an array of objects describing prerequisite updates before installing this update. Otherwise, it is empty. */
  prerequisites?: UpdatePrerequisite[];
  /** An array of component versions for a Solution Bundle update, and an empty array otherwise. */
  componentVersions?: PackageVersionInfo[];
  /** Indicates whether a reboot is required after the update or operation. Helps determine if a system restart is necessary to complete the process. */
  rebootRequired?: RebootRequirement;
  /** Overall health state for update-specific health checks. */
  healthState?: HealthState;
  /** An array of PrecheckResult objects. */
  healthCheckResult?: PrecheckResult[];
  /** Last time the package-specific checks were run. */
  healthCheckDate?: Date;
  /** Path where the update package is available. */
  packagePath?: string;
  /** Size of the package. This value is a combination of the size from update metadata and size of the payload that results from the live scan operation for OS update content. */
  packageSizeInMb?: number;
  /** Display name of the Update */
  displayName?: string;
  /** Version of the update. */
  version?: string;
  /** Publisher of the update package. */
  publisher?: string;
  /** Link to release notes for the update. */
  releaseLink?: string;
  /** Indicates how the update content is made available for download. This determines whether the update is sourced locally, from an online repository, or requires user notification. */
  availabilityType?: AvailabilityType;
  /** Customer-visible type of the update. */
  packageType?: string;
  /** Extensible KV pairs serialized as a string. This is currently used to report the stamp OEM family and hardware model information when an update is flagged as Invalid for the stamp based on OEM type. */
  additionalProperties?: string;
  /** Progress percentage of ongoing operation. Currently this property is only valid when the update is in the Downloading state, where it maps to how much of the update content has been downloaded. */
  progressPercentage?: number;
  /** Brief message with instructions for updates of AvailabilityType Notify. */
  notifyMessage?: string;
}

export function updatePropertiesSerializer(item: UpdateProperties): any {
  return {
    installedDate: !item["installedDate"]
      ? item["installedDate"]
      : item["installedDate"].toISOString(),
    description: item["description"],
    minSbeVersionRequired: item["minSbeVersionRequired"],
    state: item["state"],
    prerequisites: !item["prerequisites"]
      ? item["prerequisites"]
      : updatePrerequisiteArraySerializer(item["prerequisites"]),
    componentVersions: !item["componentVersions"]
      ? item["componentVersions"]
      : packageVersionInfoArraySerializer(item["componentVersions"]),
    rebootRequired: item["rebootRequired"],
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArraySerializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : item["healthCheckDate"].toISOString(),
    packagePath: item["packagePath"],
    packageSizeInMb: item["packageSizeInMb"],
    displayName: item["displayName"],
    version: item["version"],
    publisher: item["publisher"],
    releaseLink: item["releaseLink"],
    availabilityType: item["availabilityType"],
    packageType: item["packageType"],
    additionalProperties: item["additionalProperties"],
    updateStateProperties: areAllPropsUndefined(item, ["progressPercentage", "notifyMessage"])
      ? undefined
      : _updatePropertiesUpdateStatePropertiesSerializer(item),
  };
}

export function updatePropertiesDeserializer(item: any): UpdateProperties {
  return {
    provisioningState: item["provisioningState"],
    installedDate: !item["installedDate"] ? item["installedDate"] : new Date(item["installedDate"]),
    description: item["description"],
    minSbeVersionRequired: item["minSbeVersionRequired"],
    state: item["state"],
    prerequisites: !item["prerequisites"]
      ? item["prerequisites"]
      : updatePrerequisiteArrayDeserializer(item["prerequisites"]),
    componentVersions: !item["componentVersions"]
      ? item["componentVersions"]
      : packageVersionInfoArrayDeserializer(item["componentVersions"]),
    rebootRequired: item["rebootRequired"],
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArrayDeserializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : new Date(item["healthCheckDate"]),
    packagePath: item["packagePath"],
    packageSizeInMb: item["packageSizeInMb"],
    displayName: item["displayName"],
    version: item["version"],
    publisher: item["publisher"],
    releaseLink: item["releaseLink"],
    availabilityType: item["availabilityType"],
    packageType: item["packageType"],
    additionalProperties: item["additionalProperties"],
    ...(!item["updateStateProperties"]
      ? item["updateStateProperties"]
      : _updatePropertiesUpdateStatePropertiesDeserializer(item["updateStateProperties"])),
  };
}

/** Represents the current state of the update as it relates to this stamp. This includes phases such as preparation, installation, scanning, and error handling, providing insight into the update's progress and any issues encountered. */
export enum KnownState {
  /** The update has prerequisites that must be fulfilled before it can proceed. */
  HasPrerequisite = "HasPrerequisite",
  /** The update is obsolete and no longer applicable. */
  Obsolete = "Obsolete",
  /** The update is ready to be installed. */
  Ready = "Ready",
  /** The update cannot be applied because another update is currently in progress. */
  NotApplicableBecauseAnotherUpdateIsInProgress = "NotApplicableBecauseAnotherUpdateIsInProgress",
  /** The update is currently in the preparation phase. */
  Preparing = "Preparing",
  /** The update is currently being installed. */
  Installing = "Installing",
  /** The update has been successfully installed. */
  Installed = "Installed",
  /** The update preparation phase failed. */
  PreparationFailed = "PreparationFailed",
  /** The update installation failed. */
  InstallationFailed = "InstallationFailed",
  /** The update is invalid and cannot be applied. */
  Invalid = "Invalid",
  /** The update has been recalled and should not be applied. */
  Recalled = "Recalled",
  /** The update is currently being downloaded. */
  Downloading = "Downloading",
  /** The update download failed. */
  DownloadFailed = "DownloadFailed",
  /** A health check is being performed before applying the update. */
  HealthChecking = "HealthChecking",
  /** The health check failed, preventing the update from proceeding. */
  HealthCheckFailed = "HealthCheckFailed",
  /** The update is ready to be installed after successful preparation and checks. */
  ReadyToInstall = "ReadyToInstall",
  /** The system is scanning for updates. */
  ScanInProgress = "ScanInProgress",
  /** The scan for updates failed. */
  ScanFailed = "ScanFailed",
  /** Additional content is required to proceed with the update. */
  AdditionalContentRequired = "AdditionalContentRequired",
}

/**
 * Represents the current state of the update as it relates to this stamp. This includes phases such as preparation, installation, scanning, and error handling, providing insight into the update's progress and any issues encountered. \
 * {@link KnownState} can be used interchangeably with State,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HasPrerequisite**: The update has prerequisites that must be fulfilled before it can proceed. \
 * **Obsolete**: The update is obsolete and no longer applicable. \
 * **Ready**: The update is ready to be installed. \
 * **NotApplicableBecauseAnotherUpdateIsInProgress**: The update cannot be applied because another update is currently in progress. \
 * **Preparing**: The update is currently in the preparation phase. \
 * **Installing**: The update is currently being installed. \
 * **Installed**: The update has been successfully installed. \
 * **PreparationFailed**: The update preparation phase failed. \
 * **InstallationFailed**: The update installation failed. \
 * **Invalid**: The update is invalid and cannot be applied. \
 * **Recalled**: The update has been recalled and should not be applied. \
 * **Downloading**: The update is currently being downloaded. \
 * **DownloadFailed**: The update download failed. \
 * **HealthChecking**: A health check is being performed before applying the update. \
 * **HealthCheckFailed**: The health check failed, preventing the update from proceeding. \
 * **ReadyToInstall**: The update is ready to be installed after successful preparation and checks. \
 * **ScanInProgress**: The system is scanning for updates. \
 * **ScanFailed**: The scan for updates failed. \
 * **AdditionalContentRequired**: Additional content is required to proceed with the update.
 */
export type State = string;

export function updatePrerequisiteArraySerializer(result: Array<UpdatePrerequisite>): any[] {
  return result.map((item) => {
    return updatePrerequisiteSerializer(item);
  });
}

export function updatePrerequisiteArrayDeserializer(result: Array<UpdatePrerequisite>): any[] {
  return result.map((item) => {
    return updatePrerequisiteDeserializer(item);
  });
}

/** If update State is HasPrerequisite, this property contains an array of objects describing prerequisite updates before installing this update. Otherwise, it is empty. */
export interface UpdatePrerequisite {
  /** Updatable component type. */
  updateType?: string;
  /** Version of the prerequisite. */
  version?: string;
  /** Friendly name of the prerequisite. */
  packageName?: string;
}

export function updatePrerequisiteSerializer(item: UpdatePrerequisite): any {
  return {
    updateType: item["updateType"],
    version: item["version"],
    packageName: item["packageName"],
  };
}

export function updatePrerequisiteDeserializer(item: any): UpdatePrerequisite {
  return {
    updateType: item["updateType"],
    version: item["version"],
    packageName: item["packageName"],
  };
}

export function packageVersionInfoArraySerializer(result: Array<PackageVersionInfo>): any[] {
  return result.map((item) => {
    return packageVersionInfoSerializer(item);
  });
}

export function packageVersionInfoArrayDeserializer(result: Array<PackageVersionInfo>): any[] {
  return result.map((item) => {
    return packageVersionInfoDeserializer(item);
  });
}

/** Current version of each updatable component. */
export interface PackageVersionInfo {
  /** Package type */
  packageType?: string;
  /** Package version */
  version?: string;
  /** Last time this component was updated. */
  lastUpdated?: Date;
}

export function packageVersionInfoSerializer(item: PackageVersionInfo): any {
  return {
    packageType: item["packageType"],
    version: item["version"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : item["lastUpdated"].toISOString(),
  };
}

export function packageVersionInfoDeserializer(item: any): PackageVersionInfo {
  return {
    packageType: item["packageType"],
    version: item["version"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
  };
}

/** Indicates whether a reboot is required after the update or operation. Helps determine if a system restart is necessary to complete the process. */
export enum KnownRebootRequirement {
  /** It is not known whether a reboot is required. */
  Unknown = "Unknown",
  /** A reboot is required to complete the operation. */
  True = "True",
  /** No reboot is required after the operation. */
  False = "False",
}

/**
 * Indicates whether a reboot is required after the update or operation. Helps determine if a system restart is necessary to complete the process. \
 * {@link KnownRebootRequirement} can be used interchangeably with RebootRequirement,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: It is not known whether a reboot is required. \
 * **True**: A reboot is required to complete the operation. \
 * **False**: No reboot is required after the operation.
 */
export type RebootRequirement = string;

/** Overall health state for update-specific health checks. Indicates whether the system is functioning correctly, has warnings or errors, or is undergoing a health evaluation. */
export enum KnownHealthState {
  /** The health state is not known or cannot be determined. */
  Unknown = "Unknown",
  /** The health check completed successfully and the system is healthy. */
  Success = "Success",
  /** The health check failed, indicating a critical issue. */
  Failure = "Failure",
  /** The health check detected a non-critical issue that may require attention. */
  Warning = "Warning",
  /** An error occurred during the health check process. */
  Error = "Error",
  /** The health check is currently in progress. */
  InProgress = "InProgress",
}

/**
 * Overall health state for update-specific health checks. Indicates whether the system is functioning correctly, has warnings or errors, or is undergoing a health evaluation. \
 * {@link KnownHealthState} can be used interchangeably with HealthState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The health state is not known or cannot be determined. \
 * **Success**: The health check completed successfully and the system is healthy. \
 * **Failure**: The health check failed, indicating a critical issue. \
 * **Warning**: The health check detected a non-critical issue that may require attention. \
 * **Error**: An error occurred during the health check process. \
 * **InProgress**: The health check is currently in progress.
 */
export type HealthState = string;

export function precheckResultArraySerializer(result: Array<PrecheckResult>): any[] {
  return result.map((item) => {
    return precheckResultSerializer(item);
  });
}

export function precheckResultArrayDeserializer(result: Array<PrecheckResult>): any[] {
  return result.map((item) => {
    return precheckResultDeserializer(item);
  });
}

/** model interface PrecheckResult */
export interface PrecheckResult {
  /** Name of the individual test/rule/alert that was executed. Unique, not exposed to the customer. */
  name?: string;
  /** The health check DisplayName localized of the individual test executed. */
  displayName?: string;
  /** Key-value pairs that allow grouping/filtering individual tests. */
  tags?: PrecheckResultTags;
  /** Key-value pairs that allow grouping/filtering individual tests. */
  healthCheckTags?: any;
  /** User-facing name; one or more sentences indicating the direct issue. */
  title?: string;
  /** Represents the current status of the check being performed. Indicates whether the check has completed successfully, failed, or is still in progress. */
  status?: Status;
  /** Indicates the importance or impact level of the result. Determines whether the result is informational, a warning, or a critical issue that may block updates. */
  severity?: Severity;
  /** Detailed overview of the issue and what impact the issue has on the stamp. */
  description?: string;
  /** Set of steps that can be taken to resolve the issue found. */
  remediation?: string;
  /** The unique identifier for the affected resource (such as a node or drive). */
  targetResourceID?: string;
  /** The name of the affected resource. */
  targetResourceName?: string;
  /** The type of resource being referred to (well-known set of nouns in infrastructure, aligning with Monitoring). */
  targetResourceType?: string;
  /** The time in which the HealthCheck was called. */
  timestamp?: Date;
  /** Property bag of key value pairs for additional information. */
  additionalData?: string;
  /** The name of the services called for the HealthCheck (I.E. Test-AzureStack, Test-Cluster). */
  healthCheckSource?: string;
}

export function precheckResultSerializer(item: PrecheckResult): any {
  return {
    name: item["name"],
    displayName: item["displayName"],
    tags: !item["tags"] ? item["tags"] : precheckResultTagsSerializer(item["tags"]),
    healthCheckTags: item["healthCheckTags"],
    title: item["title"],
    status: item["status"],
    severity: item["severity"],
    description: item["description"],
    remediation: item["remediation"],
    targetResourceID: item["targetResourceID"],
    targetResourceName: item["targetResourceName"],
    targetResourceType: item["targetResourceType"],
    timestamp: !item["timestamp"] ? item["timestamp"] : item["timestamp"].toISOString(),
    additionalData: item["additionalData"],
    healthCheckSource: item["healthCheckSource"],
  };
}

export function precheckResultDeserializer(item: any): PrecheckResult {
  return {
    name: item["name"],
    displayName: item["displayName"],
    tags: !item["tags"] ? item["tags"] : precheckResultTagsDeserializer(item["tags"]),
    healthCheckTags: item["healthCheckTags"],
    title: item["title"],
    status: item["status"],
    severity: item["severity"],
    description: item["description"],
    remediation: item["remediation"],
    targetResourceID: item["targetResourceID"],
    targetResourceName: item["targetResourceName"],
    targetResourceType: item["targetResourceType"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
    additionalData: item["additionalData"],
    healthCheckSource: item["healthCheckSource"],
  };
}

/** Key-value pairs that allow grouping/filtering individual tests. */
export interface PrecheckResultTags {
  /** Key that allow grouping/filtering individual tests. */
  key?: string;
  /** Value of the key that allow grouping/filtering individual tests. */
  value?: string;
}

export function precheckResultTagsSerializer(item: PrecheckResultTags): any {
  return { key: item["key"], value: item["value"] };
}

export function precheckResultTagsDeserializer(item: any): PrecheckResultTags {
  return {
    key: item["key"],
    value: item["value"],
  };
}

/** Indicates the importance or impact level of the result. Determines whether the result is informational, a warning, or a critical issue that may block updates. */
export enum KnownSeverity {
  /** A critical issue that blocks updates and requires immediate attention. */
  Critical = "Critical",
  /** A warning that may indicate a potential issue but does not block updates. */
  Warning = "Warning",
  /** General information that does not indicate any issue. */
  Informational = "Informational",
  /** The result is hidden and not shown in the output. */
  Hidden = "Hidden",
}

/**
 * Indicates the importance or impact level of the result. Determines whether the result is informational, a warning, or a critical issue that may block updates. \
 * {@link KnownSeverity} can be used interchangeably with Severity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: A critical issue that blocks updates and requires immediate attention. \
 * **Warning**: A warning that may indicate a potential issue but does not block updates. \
 * **Informational**: General information that does not indicate any issue. \
 * **Hidden**: The result is hidden and not shown in the output.
 */
export type Severity = string;

/** Indicates how the update content is made available for download. This determines whether the update is sourced locally, from an online repository, or requires user notification. */
export enum KnownAvailabilityType {
  /** The update content is available locally within the environment. */
  Local = "Local",
  /** The update content is available from an online source. */
  Online = "Online",
  /** The system will notify the user when update content becomes available. */
  Notify = "Notify",
}

/**
 * Indicates how the update content is made available for download. This determines whether the update is sourced locally, from an online repository, or requires user notification. \
 * {@link KnownAvailabilityType} can be used interchangeably with AvailabilityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Local**: The update content is available locally within the environment. \
 * **Online**: The update content is available from an online source. \
 * **Notify**: The system will notify the user when update content becomes available.
 */
export type AvailabilityType = string;

/** Additional information regarding the state of the update. See definition of UpdateStateProperties type below for more details on this property. */
export interface UpdateStateProperties {
  /** Progress percentage of ongoing operation. Currently this property is only valid when the update is in the Downloading state, where it maps to how much of the update content has been downloaded. */
  progressPercentage?: number;
  /** Brief message with instructions for updates of AvailabilityType Notify. */
  notifyMessage?: string;
}

export function updateStatePropertiesSerializer(item: UpdateStateProperties): any {
  return { progressPercentage: item["progressPercentage"], notifyMessage: item["notifyMessage"] };
}

export function updateStatePropertiesDeserializer(item: any): UpdateStateProperties {
  return {
    progressPercentage: item["progressPercentage"],
    notifyMessage: item["notifyMessage"],
  };
}

/** List of Updates */
export interface _UpdateList {
  /** The Update items on this page */
  value: Update[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateListDeserializer(item: any): _UpdateList {
  return {
    value: updateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateArraySerializer(result: Array<Update>): any[] {
  return result.map((item) => {
    return updateSerializer(item);
  });
}

export function updateArrayDeserializer(result: Array<Update>): any[] {
  return result.map((item) => {
    return updateDeserializer(item);
  });
}

/** Represents a validated solution recipe resource. */
export interface ValidatedSolutionRecipe extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ValidatedSolutionRecipeProperties;
}

export function validatedSolutionRecipeDeserializer(item: any): ValidatedSolutionRecipe {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : validatedSolutionRecipePropertiesDeserializer(item["properties"]),
  };
}

/** Represents properties of a validated solution recipe resource. */
export interface ValidatedSolutionRecipeProperties {
  /** Represents contents of a validated solution recipe. */
  recipeContent: ValidatedSolutionRecipeContent;
  /** Represents the signature of the recipe, to be used for ensuring its integrity. */
  signature?: string;
}

export function validatedSolutionRecipePropertiesDeserializer(
  item: any,
): ValidatedSolutionRecipeProperties {
  return {
    recipeContent: validatedSolutionRecipeContentDeserializer(item["recipeContent"]),
    signature: item["signature"],
  };
}

/** Represents contents of a validated solution recipe resource. */
export interface ValidatedSolutionRecipeContent {
  /** Represents information about a validated solution recipe. */
  info: ValidatedSolutionRecipeInfo;
  /** Represents capabilities available in a validated solution recipe. */
  capabilities?: ValidatedSolutionRecipeCapabilities;
  /** Represents components available in a validated solution recipe. */
  components: ValidatedSolutionRecipeComponent[];
}

export function validatedSolutionRecipeContentDeserializer(
  item: any,
): ValidatedSolutionRecipeContent {
  return {
    info: validatedSolutionRecipeInfoDeserializer(item["info"]),
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : validatedSolutionRecipeCapabilitiesDeserializer(item["capabilities"]),
    components: validatedSolutionRecipeComponentArrayDeserializer(item["components"]),
  };
}

/** Represents information about a validated solution recipe. */
export interface ValidatedSolutionRecipeInfo {
  /** Represents the solution type for which this validated solution recipe is applicable. */
  solutionType: string;
  /** Represents the version for which this validated solution recipe is applicable. */
  version: string;
}

export function validatedSolutionRecipeInfoDeserializer(item: any): ValidatedSolutionRecipeInfo {
  return {
    solutionType: item["solutionType"],
    version: item["version"],
  };
}

/** Represents capabilities available in a validated solution recipe. */
export interface ValidatedSolutionRecipeCapabilities {
  /** Represents the cluster capabilities. */
  clusterCapabilities: ValidatedSolutionRecipeCapability[];
  /** Represents the node capabilities. */
  nodeCapabilities: ValidatedSolutionRecipeCapability[];
}

export function validatedSolutionRecipeCapabilitiesDeserializer(
  item: any,
): ValidatedSolutionRecipeCapabilities {
  return {
    clusterCapabilities: validatedSolutionRecipeCapabilityArrayDeserializer(
      item["clusterCapabilities"],
    ),
    nodeCapabilities: validatedSolutionRecipeCapabilityArrayDeserializer(item["nodeCapabilities"]),
  };
}

export function validatedSolutionRecipeCapabilityArrayDeserializer(
  result: Array<ValidatedSolutionRecipeCapability>,
): any[] {
  return result.map((item) => {
    return validatedSolutionRecipeCapabilityDeserializer(item);
  });
}

/** Represents capability available in a validated solution recipe. */
export interface ValidatedSolutionRecipeCapability {
  /** Represents the capability name. */
  capabilityName: string;
}

export function validatedSolutionRecipeCapabilityDeserializer(
  item: any,
): ValidatedSolutionRecipeCapability {
  return {
    capabilityName: item["capabilityName"],
  };
}

export function validatedSolutionRecipeComponentArrayDeserializer(
  result: Array<ValidatedSolutionRecipeComponent>,
): any[] {
  return result.map((item) => {
    return validatedSolutionRecipeComponentDeserializer(item);
  });
}

/** Represents component available in a validated solution recipe. */
export interface ValidatedSolutionRecipeComponent {
  /** Represents the component's name. */
  name: string;
  /** Represents the component's type. */
  type: string;
  /** Represents the component's required version. */
  requiredVersion?: string;
  /** Represents the component's install order. */
  installOrder?: number;
  /** Represents the component's tags. */
  tags: string[];
  /** Represents the component's payloads. */
  payloads?: ValidatedSolutionRecipeComponentPayload[];
  /** Represents the component's metadata. */
  metadata?: ValidatedSolutionRecipeComponentMetadata;
}

export function validatedSolutionRecipeComponentDeserializer(
  item: any,
): ValidatedSolutionRecipeComponent {
  return {
    name: item["name"],
    type: item["type"],
    requiredVersion: item["requiredVersion"],
    installOrder: item["installOrder"],
    tags: item["tags"].map((p: any) => {
      return p;
    }),
    payloads: !item["payloads"]
      ? item["payloads"]
      : validatedSolutionRecipeComponentPayloadArrayDeserializer(item["payloads"]),
    metadata: !item["metadata"]
      ? item["metadata"]
      : validatedSolutionRecipeComponentMetadataDeserializer(item["metadata"]),
  };
}

export function validatedSolutionRecipeComponentPayloadArrayDeserializer(
  result: Array<ValidatedSolutionRecipeComponentPayload>,
): any[] {
  return result.map((item) => {
    return validatedSolutionRecipeComponentPayloadDeserializer(item);
  });
}

/** Represents payloads associated with a component available in a validated solution recipe. */
export interface ValidatedSolutionRecipeComponentPayload {
  /** Represents the unique identifier of the payload used to query the URL. */
  identifier: string;
  /** Represents the cryptographic hash of the payload, ensuring data integrity. */
  hash: string;
  /** Represents the name of the file associated with the payload. */
  fileName: string;
  /** Represents the URL from which the payload can be downloaded. */
  url: string;
}

export function validatedSolutionRecipeComponentPayloadDeserializer(
  item: any,
): ValidatedSolutionRecipeComponentPayload {
  return {
    identifier: item["identifier"],
    hash: item["hash"],
    fileName: item["fileName"],
    url: item["url"],
  };
}

/** Represents metadata associated with a component available in a validated solution recipe. */
export interface ValidatedSolutionRecipeComponentMetadata {
  /** Represents the type of extension. */
  extensionType?: string;
  /** Represents the publisher of the extension. */
  publisher?: string;
  /** Indicates whether automatic upgrades of the extension are enabled. */
  enableAutomaticUpgrade?: boolean;
  /** Indicates whether the LCM (Lifecycle Management) update of the extension is enabled. */
  lcmUpdate?: boolean;
  /** Specifies the catalog to which the extension belongs. */
  catalog?: string;
  /** Specifies the ring to which the extension belongs, internally used by component. */
  ring?: string;
  /** Specifies the release train to which given component belongs. */
  releaseTrain?: string;
  /** Specifies the link associated with the extension. */
  link?: string;
  /** Specifies the name of the extension. */
  name?: string;
  /** Specifies the expected hash of the extension. */
  expectedHash?: string;
  /** Specifies the preview source of the extension. */
  previewSource?: string;
}

export function validatedSolutionRecipeComponentMetadataDeserializer(
  item: any,
): ValidatedSolutionRecipeComponentMetadata {
  return {
    extensionType: item["extensionType"],
    publisher: item["publisher"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
    lcmUpdate: item["lcmUpdate"],
    catalog: item["catalog"],
    ring: item["ring"],
    releaseTrain: item["releaseTrain"],
    link: item["link"],
    name: item["name"],
    expectedHash: item["expectedHash"],
    previewSource: item["previewSource"],
  };
}

/** The response of a ValidatedSolutionRecipe list operation. */
export interface _ValidatedSolutionRecipeListResult {
  /** The ValidatedSolutionRecipe items on this page */
  value: ValidatedSolutionRecipe[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _validatedSolutionRecipeListResultDeserializer(
  item: any,
): _ValidatedSolutionRecipeListResult {
  return {
    value: validatedSolutionRecipeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function validatedSolutionRecipeArrayDeserializer(
  result: Array<ValidatedSolutionRecipe>,
): any[] {
  return result.map((item) => {
    return validatedSolutionRecipeDeserializer(item);
  });
}

/** EdgeMachine details. */
export interface EdgeMachine extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: EdgeMachineProperties;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function edgeMachineSerializer(item: EdgeMachine): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : edgeMachinePropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function edgeMachineDeserializer(item: any): EdgeMachine {
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
      : edgeMachinePropertiesDeserializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** Properties for edge machine. */
export interface EdgeMachineProperties {
  /** Edge Machine type. */
  edgeMachineKind?: EdgeMachineKind;
  /** The provisioning state of a resource. */
  readonly provisioningState?: ProvisioningState;
  /** Unique, immutable resource id. */
  readonly cloudId?: string;
  /** Optional property to create arc machine in custom resource group. */
  arcMachineResourceGroupId?: string;
  /** Arc machine instance resource id. */
  arcMachineResourceId?: string;
  /** Link to Arc Gateway ARM resource Id */
  arcGatewayResourceId?: string;
  /** Service fetches common configuration from site. */
  siteDetails?: SiteDetails;
  /** Ownership voucher details for provisioned machine. */
  ownershipVoucherDetails?: OwnershipVoucherDetails;
  /** Details for device provisioning. */
  provisioningDetails?: ProvisioningDetails;
  /** A machine can only be assigned to single device pool */
  readonly devicePoolResourceId?: string;
  /** OS configuration status details */
  readonly machineState?: EdgeMachineState;
  /** machine connectivity status */
  readonly connectivityStatus?: EdgeMachineConnectivityStatus;
  /** Tracks the ID of the consuming resource, setting the machine as in-use. */
  readonly claimedBy?: string;
  /** Reported properties for edge machine. */
  readonly reportedProperties?: EdgeMachineReportedProperties;
  /** operation status details for edge machine. */
  readonly operationDetails?: OperationDetail[];
  /** Last time data updated to service. */
  readonly lastSyncTimestamp?: Date;
}

export function edgeMachinePropertiesSerializer(item: EdgeMachineProperties): any {
  return {
    edgeMachineKind: item["edgeMachineKind"],
    arcMachineResourceGroupId: item["arcMachineResourceGroupId"],
    arcMachineResourceId: item["arcMachineResourceId"],
    arcGatewayResourceId: item["arcGatewayResourceId"],
    siteDetails: !item["siteDetails"]
      ? item["siteDetails"]
      : siteDetailsSerializer(item["siteDetails"]),
    ownershipVoucherDetails: !item["ownershipVoucherDetails"]
      ? item["ownershipVoucherDetails"]
      : ownershipVoucherDetailsSerializer(item["ownershipVoucherDetails"]),
    provisioningDetails: !item["provisioningDetails"]
      ? item["provisioningDetails"]
      : provisioningDetailsSerializer(item["provisioningDetails"]),
  };
}

export function edgeMachinePropertiesDeserializer(item: any): EdgeMachineProperties {
  return {
    edgeMachineKind: item["edgeMachineKind"],
    provisioningState: item["provisioningState"],
    cloudId: item["cloudId"],
    arcMachineResourceGroupId: item["arcMachineResourceGroupId"],
    arcMachineResourceId: item["arcMachineResourceId"],
    arcGatewayResourceId: item["arcGatewayResourceId"],
    siteDetails: !item["siteDetails"]
      ? item["siteDetails"]
      : siteDetailsDeserializer(item["siteDetails"]),
    ownershipVoucherDetails: !item["ownershipVoucherDetails"]
      ? item["ownershipVoucherDetails"]
      : ownershipVoucherDetailsDeserializer(item["ownershipVoucherDetails"]),
    provisioningDetails: !item["provisioningDetails"]
      ? item["provisioningDetails"]
      : provisioningDetailsDeserializer(item["provisioningDetails"]),
    devicePoolResourceId: item["devicePoolResourceId"],
    machineState: item["machineState"],
    connectivityStatus: item["connectivityStatus"],
    claimedBy: item["claimedBy"],
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : edgeMachineReportedPropertiesDeserializer(item["reportedProperties"]),
    operationDetails: !item["operationDetails"]
      ? item["operationDetails"]
      : operationDetailArrayDeserializer(item["operationDetails"]),
    lastSyncTimestamp: !item["lastSyncTimestamp"]
      ? item["lastSyncTimestamp"]
      : new Date(item["lastSyncTimestamp"]),
  };
}

/** Edge Machine Kind. */
export enum KnownEdgeMachineKind {
  /** EdgeMachine resource created using Zero-touch provisioning. */
  Standard = "Standard",
  /** EdgeMachine resource created for brownfield HCI customers without zero touch provisioning. */
  Dedicated = "Dedicated",
}

/**
 * Edge Machine Kind. \
 * {@link KnownEdgeMachineKind} can be used interchangeably with EdgeMachineKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: EdgeMachine resource created using Zero-touch provisioning. \
 * **Dedicated**: EdgeMachine resource created for brownfield HCI customers without zero touch provisioning.
 */
export type EdgeMachineKind = string;

/** Site Details consists of common configurations. */
export interface SiteDetails {
  /** Site resource Id to be set during Edge Machine resource creation. */
  siteResourceId: string;
  /** Edge Device configuration received from site common configuration. */
  deviceConfiguration?: DeviceConfiguration;
}

export function siteDetailsSerializer(item: SiteDetails): any {
  return {
    siteResourceId: item["siteResourceId"],
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : deviceConfigurationSerializer(item["deviceConfiguration"]),
  };
}

export function siteDetailsDeserializer(item: any): SiteDetails {
  return {
    siteResourceId: item["siteResourceId"],
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : deviceConfigurationDeserializer(item["deviceConfiguration"]),
  };
}

/** Details for ownership voucher. */
export interface OwnershipVoucherDetails {
  /** Ownership voucher in base64 encoded format */
  ownershipVoucher: string;
  /** Owner key type */
  ownerKeyType: OwnerKeyType;
}

export function ownershipVoucherDetailsSerializer(item: OwnershipVoucherDetails): any {
  return { ownershipVoucher: item["ownershipVoucher"], ownerKeyType: item["ownerKeyType"] };
}

export function ownershipVoucherDetailsDeserializer(item: any): OwnershipVoucherDetails {
  return {
    ownershipVoucher: item["ownershipVoucher"],
    ownerKeyType: item["ownerKeyType"],
  };
}

/** Type of owner key in the voucher */
export enum KnownOwnerKeyType {
  /** Owner is Microsoft managed key */
  MicrosoftManaged = "MicrosoftManaged",
}

/**
 * Type of owner key in the voucher \
 * {@link KnownOwnerKeyType} can be used interchangeably with OwnerKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MicrosoftManaged**: Owner is Microsoft managed key
 */
export type OwnerKeyType = string;

/** Details for device provisioning. */
export interface ProvisioningDetails {
  /** Operating system profile. */
  osProfile: OsProvisionProfile;
  /** User configuration. */
  userDetails?: UserDetails[];
}

export function provisioningDetailsSerializer(item: ProvisioningDetails): any {
  return {
    osProfile: osProvisionProfileSerializer(item["osProfile"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsArraySerializer(item["userDetails"]),
  };
}

export function provisioningDetailsDeserializer(item: any): ProvisioningDetails {
  return {
    osProfile: osProvisionProfileDeserializer(item["osProfile"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsArrayDeserializer(item["userDetails"]),
  };
}

/** Operating system profile. */
export interface OsProvisionProfile {
  /** Name of the operating system. */
  osName?: string;
  /** Type of the operating system. */
  osType?: string;
  /** Version of the operating system. */
  osVersion?: string;
  /** Location of the operating system image. */
  osImageLocation?: string;
  /** Validated Solution Recipe version to be used for the job */
  vsrVersion?: string;
  /** Hash of the OS package downloaded */
  imageHash?: string;
  /** GPG Public Key used for package verification */
  gpgPubKey?: string;
  /** Operation sub type of OS Provisioning */
  operationType?: OSOperationType;
}

export function osProvisionProfileSerializer(item: OsProvisionProfile): any {
  return {
    osName: item["osName"],
    osType: item["osType"],
    osVersion: item["osVersion"],
    osImageLocation: item["osImageLocation"],
    vsrVersion: item["vsrVersion"],
    imageHash: item["imageHash"],
    gpgPubKey: item["gpgPubKey"],
    operationType: item["operationType"],
  };
}

export function osProvisionProfileDeserializer(item: any): OsProvisionProfile {
  return {
    osName: item["osName"],
    osType: item["osType"],
    osVersion: item["osVersion"],
    osImageLocation: item["osImageLocation"],
    vsrVersion: item["vsrVersion"],
    imageHash: item["imageHash"],
    gpgPubKey: item["gpgPubKey"],
    operationType: item["operationType"],
  };
}

/** OS Provision Operation type */
export enum KnownOSOperationType {
  /** OS Provisioning operation */
  Provision = "Provision",
  /** OS Update operation */
  Update = "Update",
  /** OS ReImage operation */
  ReImage = "ReImage",
}

/**
 * OS Provision Operation type \
 * {@link KnownOSOperationType} can be used interchangeably with OSOperationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Provision**: OS Provisioning operation \
 * **Update**: OS Update operation \
 * **ReImage**: OS ReImage operation
 */
export type OSOperationType = string;

export function userDetailsArraySerializer(result: Array<UserDetails>): any[] {
  return result.map((item) => {
    return userDetailsSerializer(item);
  });
}

export function userDetailsArrayDeserializer(result: Array<UserDetails>): any[] {
  return result.map((item) => {
    return userDetailsDeserializer(item);
  });
}

/** User configuration. */
export interface UserDetails {
  /** Name of the user. */
  userName: string;
  /** Type of the secret used for authentication. */
  secretType: SecretType;
  /** Location of the secret used for authentication. */
  secretLocation?: string;
  /** SSH Public Key for the user. */
  sshPubKey?: string[];
}

export function userDetailsSerializer(item: UserDetails): any {
  return {
    userName: item["userName"],
    secretType: item["secretType"],
    secretLocation: item["secretLocation"],
    sshPubKey: !item["sshPubKey"]
      ? item["sshPubKey"]
      : item["sshPubKey"].map((p: any) => {
          return p;
        }),
  };
}

export function userDetailsDeserializer(item: any): UserDetails {
  return {
    userName: item["userName"],
    secretType: item["secretType"],
    secretLocation: item["secretLocation"],
    sshPubKey: !item["sshPubKey"]
      ? item["sshPubKey"]
      : item["sshPubKey"].map((p: any) => {
          return p;
        }),
  };
}

/** Type of secret used for authentication. */
export enum KnownSecretType {
  /** Key Vault based authentication */
  KeyVault = "KeyVault",
  /** SSH Public Key based authentication */
  SshPubKey = "SshPubKey",
}

/**
 * Type of secret used for authentication. \
 * {@link KnownSecretType} can be used interchangeably with SecretType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KeyVault**: Key Vault based authentication \
 * **SshPubKey**: SSH Public Key based authentication
 */
export type SecretType = string;

/** OS State */
export enum KnownEdgeMachineState {
  /** Created when EdgeMachine resource created */
  Created = "Created",
  /** EdgeMachine state during device discovery and registration */
  Registering = "Registering",
  /** EdgeMachine state when machine configured with restricted OS and not provisioned to deploy workloads */
  Unpurposed = "Unpurposed",
  /** EdgeMachine state when transitioning from initial OS to target OS */
  Transitioning = "Transitioning",
  /** EdgeMachine state when machine configured with target OS to deploy workloads */
  Purposed = "Purposed",
  /** EdgeMachine state when OS updates are in-progress */
  Updating = "Updating",
  /** EdgeMachine state when transitioning from target OS to restricted OS */
  Resetting = "Resetting",
  /** EdgeMachine failed state and only option to recover is to re-provisioning machine */
  Failed = "Failed",
  /** Preparing EdgeMachine */
  Preparing = "Preparing",
}

/**
 * OS State \
 * {@link KnownEdgeMachineState} can be used interchangeably with EdgeMachineState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Created when EdgeMachine resource created \
 * **Registering**: EdgeMachine state during device discovery and registration \
 * **Unpurposed**: EdgeMachine state when machine configured with restricted OS and not provisioned to deploy workloads \
 * **Transitioning**: EdgeMachine state when transitioning from initial OS to target OS \
 * **Purposed**: EdgeMachine state when machine configured with target OS to deploy workloads \
 * **Updating**: EdgeMachine state when OS updates are in-progress \
 * **Resetting**: EdgeMachine state when transitioning from target OS to restricted OS \
 * **Failed**: EdgeMachine failed state and only option to recover is to re-provisioning machine \
 * **Preparing**: Preparing EdgeMachine
 */
export type EdgeMachineState = string;

/** Overall connectivity status for the machine resource. */
export enum KnownEdgeMachineConnectivityStatus {
  /** The connectivity status of the machine resource is not specified. */
  NotSpecified = "NotSpecified",
  /** The machine resource is disconnected. */
  Disconnected = "Disconnected",
  /** The machine resource is connected. */
  Connected = "Connected",
}

/**
 * Overall connectivity status for the machine resource. \
 * {@link KnownEdgeMachineConnectivityStatus} can be used interchangeably with EdgeMachineConnectivityStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotSpecified**: The connectivity status of the machine resource is not specified. \
 * **Disconnected**: The machine resource is disconnected. \
 * **Connected**: The machine resource is connected.
 */
export type EdgeMachineConnectivityStatus = string;

/** Reported properties for edge machine. */
export interface EdgeMachineReportedProperties {
  /** Last time data reported. */
  readonly lastUpdated?: Date;
  /** Network details for edge machine. */
  readonly networkProfile?: EdgeMachineNetworkProfile;
  /** OS Properties for edge machine. */
  readonly osProfile?: OsProfile;
  /** Hardware related information for edge machine. */
  readonly hardwareProfile?: HardwareProfile;
  /** Storage related information for edge machine. */
  readonly storageProfile?: StorageProfile;
  /** Solution builder extension (SBE) deployment package information. */
  readonly sbeDeploymentPackageInfo?: SbeDeploymentPackageInfo;
  /** Extension details for edge machine. */
  readonly extensionProfile?: ExtensionProfile;
}

export function edgeMachineReportedPropertiesDeserializer(
  item: any,
): EdgeMachineReportedProperties {
  return {
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : edgeMachineNetworkProfileDeserializer(item["networkProfile"]),
    osProfile: !item["osProfile"] ? item["osProfile"] : osProfileDeserializer(item["osProfile"]),
    hardwareProfile: !item["hardwareProfile"]
      ? item["hardwareProfile"]
      : hardwareProfileDeserializer(item["hardwareProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : storageProfileDeserializer(item["storageProfile"]),
    sbeDeploymentPackageInfo: !item["sbeDeploymentPackageInfo"]
      ? item["sbeDeploymentPackageInfo"]
      : sbeDeploymentPackageInfoDeserializer(item["sbeDeploymentPackageInfo"]),
    extensionProfile: !item["extensionProfile"]
      ? item["extensionProfile"]
      : extensionProfileDeserializer(item["extensionProfile"]),
  };
}

/** NetworkProfile of edge machine. */
export interface EdgeMachineNetworkProfile {
  /** List of Network Interface Card (NIC) Details of edge machine. */
  readonly nicDetails?: EdgeMachineNicDetail[];
  /** List of switch Details of edge machine. */
  readonly switchDetails?: SwitchDetail[];
}

export function edgeMachineNetworkProfileDeserializer(item: any): EdgeMachineNetworkProfile {
  return {
    nicDetails: !item["nicDetails"]
      ? item["nicDetails"]
      : edgeMachineNicDetailArrayDeserializer(item["nicDetails"]),
    switchDetails: !item["switchDetails"]
      ? item["switchDetails"]
      : switchDetailArrayDeserializer(item["switchDetails"]),
  };
}

export function edgeMachineNicDetailArrayDeserializer(result: Array<EdgeMachineNicDetail>): any[] {
  return result.map((item) => {
    return edgeMachineNicDetailDeserializer(item);
  });
}

/** Network Interface Card (NIC) Details of edge machine. */
export interface EdgeMachineNicDetail {
  /** Adapter Name of NIC */
  readonly adapterName?: string;
  /** Interface Description of NIC */
  readonly interfaceDescription?: string;
  /** Component Id of NIC */
  readonly componentId?: string;
  /** Driver Version of NIC */
  readonly driverVersion?: string;
  /** Subnet Mask of NIC */
  readonly ip4Address?: string;
  /** Subnet Mask of NIC */
  readonly subnetMask?: string;
  /** Default Gateway of NIC */
  readonly defaultGateway?: string;
  /** DNS Servers for NIC */
  readonly dnsServers?: string[];
  /** Default Isolation of Management NIC */
  readonly defaultIsolationId?: string;
  /** MAC address information of NIC. */
  readonly macAddress?: string;
  /** The slot attached to the NIC. */
  readonly slot?: string;
  /** The switch attached to the NIC, if any. */
  readonly switchName?: string;
  /** The type of NIC, physical, virtual, management. */
  readonly nicType?: string;
  /** The VLAN ID of the physical NIC. */
  readonly vlanId?: string;
  /** The status of NIC, up, disconnected. */
  readonly nicStatus?: string;
  /** Describes the RDMA capability of the network adapter. */
  readonly rdmaCapability?: RdmaCapability;
}

export function edgeMachineNicDetailDeserializer(item: any): EdgeMachineNicDetail {
  return {
    adapterName: item["adapterName"],
    interfaceDescription: item["interfaceDescription"],
    componentId: item["componentId"],
    driverVersion: item["driverVersion"],
    ip4Address: item["ip4Address"],
    subnetMask: item["subnetMask"],
    defaultGateway: item["defaultGateway"],
    dnsServers: !item["dnsServers"]
      ? item["dnsServers"]
      : item["dnsServers"].map((p: any) => {
          return p;
        }),
    defaultIsolationId: item["defaultIsolationId"],
    macAddress: item["macAddress"],
    slot: item["slot"],
    switchName: item["switchName"],
    nicType: item["nicType"],
    vlanId: item["vlanId"],
    nicStatus: item["nicStatus"],
    rdmaCapability: item["rdmaCapability"],
  };
}

/** OS configurations for HCI device. */
export interface OsProfile {
  /** The boot type of the device. e.g. UEFI, Legacy etc */
  readonly bootType?: string;
  /** Version of assembly present on device */
  readonly assemblyVersion?: string;
  /** OS type (“windows", “linux”) */
  readonly osType?: string;
  /** OS SKU (e.g., “ Microsoft Azure Linux ROE“, “Azure Stack HCI", "Microsoft Azure Linux 3.0") */
  readonly osSku?: string;
  /** OS Version */
  readonly osVersion?: string;
  /** OS Build Number */
  readonly buildNumber?: string;
  /** OS Base Image Version */
  readonly baseImageVersion?: string;
  /** OS Image Version */
  readonly imageVersion?: string;
}

export function osProfileDeserializer(item: any): OsProfile {
  return {
    bootType: item["bootType"],
    assemblyVersion: item["assemblyVersion"],
    osType: item["osType"],
    osSku: item["osSku"],
    osVersion: item["osVersion"],
    buildNumber: item["buildNumber"],
    baseImageVersion: item["baseImageVersion"],
    imageVersion: item["imageVersion"],
  };
}

/** Hardware profile for the machine */
export interface HardwareProfile {
  /** Number of cpu cores in the machine */
  readonly cpuCores?: number;
  /** Number of cpu sockets in the machine */
  readonly cpuSockets?: number;
  /** Memory capacity of the machine */
  readonly memoryCapacityInGb?: number;
  /** Model info of the machine */
  readonly model?: string;
  /** manufacturer info of the machine */
  readonly manufacturer?: string;
  /** Serial number of the machine */
  readonly serialNumber?: string;
  /** Process type of the machine */
  readonly processorType?: string;
}

export function hardwareProfileDeserializer(item: any): HardwareProfile {
  return {
    cpuCores: item["cpuCores"],
    cpuSockets: item["cpuSockets"],
    memoryCapacityInGb: item["memoryCapacityInGb"],
    model: item["model"],
    manufacturer: item["manufacturer"],
    serialNumber: item["serialNumber"],
    processorType: item["processorType"],
  };
}

/** StorageProfile of edge machine. */
export interface StorageProfile {
  /** Number of storage disks in the device with $CanPool as true. */
  readonly poolableDisksCount?: number;
}

export function storageProfileDeserializer(item: any): StorageProfile {
  return {
    poolableDisksCount: item["poolableDisksCount"],
  };
}

export function operationDetailArrayDeserializer(result: Array<OperationDetail>): any[] {
  return result.map((item) => {
    return operationDetailDeserializer(item);
  });
}

/** operation detail. */
export interface OperationDetail {
  /** operation name. */
  readonly name?: string;
  /** operation id. */
  readonly id?: string;
  /** operation type. */
  readonly type?: string;
  /** operation resource id. */
  readonly resourceId?: string;
  /** operation description. */
  readonly description?: string;
  /** operation status. */
  readonly status?: string;
  /** error details. */
  readonly error?: ErrorDetail;
}

export function operationDetailDeserializer(item: any): OperationDetail {
  return {
    name: item["name"],
    id: item["id"],
    type: item["type"],
    resourceId: item["resourceId"],
    description: item["description"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Model for patching edge machine. */
export interface EdgeMachinePatch {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function edgeMachinePatchSerializer(item: EdgeMachinePatch): any {
  return {
    tags: item["tags"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** The response of a EdgeMachine list operation. */
export interface _EdgeMachineListResult {
  /** The EdgeMachine items on this page */
  value: EdgeMachine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeMachineListResultDeserializer(item: any): _EdgeMachineListResult {
  return {
    value: edgeMachineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeMachineArraySerializer(result: Array<EdgeMachine>): any[] {
  return result.map((item) => {
    return edgeMachineSerializer(item);
  });
}

export function edgeMachineArrayDeserializer(result: Array<EdgeMachine>): any[] {
  return result.map((item) => {
    return edgeMachineDeserializer(item);
  });
}

/** Cluster Jobs resource */
export interface EdgeMachineJob extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: EdgeMachineJobPropertiesUnion;
}

export function edgeMachineJobSerializer(item: EdgeMachineJob): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : edgeMachineJobPropertiesUnionSerializer(item["properties"]),
  };
}

export function edgeMachineJobDeserializer(item: any): EdgeMachineJob {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : edgeMachineJobPropertiesUnionDeserializer(item["properties"]),
  };
}

/** EdgeMachine Job properties */
export interface EdgeMachineJobProperties {
  /** Job Type to support polymorphic resource. */
  /** The discriminator possible values: RemoteSupport, ProvisionOs, DownloadOs, CollectLog */
  jobType: EdgeMachineJobType;
  /** Deployment mode to trigger job. */
  deploymentMode?: DeploymentMode;
  /** Job provisioning state */
  readonly provisioningState?: ProvisioningState;
  /** Unique, immutable job id. */
  readonly jobId?: string;
  /** The UTC date and time at which the job started. */
  readonly startTimeUtc?: Date;
  /** The UTC date and time at which the job completed. */
  readonly endTimeUtc?: Date;
  /** Status of Edge device job. */
  readonly status?: JobStatus;
  /** error details. */
  readonly error?: ErrorDetail;
}

export function edgeMachineJobPropertiesSerializer(item: EdgeMachineJobProperties): any {
  return { jobType: item["jobType"], deploymentMode: item["deploymentMode"] };
}

export function edgeMachineJobPropertiesDeserializer(item: any): EdgeMachineJobProperties {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Alias for EdgeMachineJobPropertiesUnion */
export type EdgeMachineJobPropertiesUnion =
  | EdgeMachineRemoteSupportJobProperties
  | ProvisionOsJobProperties
  | DownloadOsJobProperties
  | EdgeMachineCollectLogJobProperties
  | EdgeMachineJobProperties;

export function edgeMachineJobPropertiesUnionSerializer(item: EdgeMachineJobPropertiesUnion): any {
  switch (item.jobType) {
    case "RemoteSupport":
      return edgeMachineRemoteSupportJobPropertiesSerializer(
        item as EdgeMachineRemoteSupportJobProperties,
      );

    case "ProvisionOs":
      return provisionOsJobPropertiesSerializer(item as ProvisionOsJobProperties);

    case "DownloadOs":
      return downloadOsJobPropertiesSerializer(item as DownloadOsJobProperties);

    case "CollectLog":
      return edgeMachineCollectLogJobPropertiesSerializer(
        item as EdgeMachineCollectLogJobProperties,
      );

    default:
      return edgeMachineJobPropertiesSerializer(item);
  }
}

export function edgeMachineJobPropertiesUnionDeserializer(
  item: any,
): EdgeMachineJobPropertiesUnion {
  switch (item.jobType) {
    case "RemoteSupport":
      return edgeMachineRemoteSupportJobPropertiesDeserializer(
        item as EdgeMachineRemoteSupportJobProperties,
      );

    case "ProvisionOs":
      return provisionOsJobPropertiesDeserializer(item as ProvisionOsJobProperties);

    case "DownloadOs":
      return downloadOsJobPropertiesDeserializer(item as DownloadOsJobProperties);

    case "CollectLog":
      return edgeMachineCollectLogJobPropertiesDeserializer(
        item as EdgeMachineCollectLogJobProperties,
      );

    default:
      return edgeMachineJobPropertiesDeserializer(item);
  }
}

/** Job Type supported. */
export enum KnownEdgeMachineJobType {
  /** Job to collect logs from the device. */
  CollectLog = "CollectLog",
  /** Job to provide remote support to the device. */
  RemoteSupport = "RemoteSupport",
  /** Job to provision operating system in the device. */
  ProvisionOs = "ProvisionOs",
  /** Job to download OS packages on to the device */
  DownloadOs = "DownloadOs",
}

/**
 * Job Type supported. \
 * {@link KnownEdgeMachineJobType} can be used interchangeably with EdgeMachineJobType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CollectLog**: Job to collect logs from the device. \
 * **RemoteSupport**: Job to provide remote support to the device. \
 * **ProvisionOs**: Job to provision operating system in the device. \
 * **DownloadOs**: Job to download OS packages on to the device
 */
export type EdgeMachineJobType = string;

/** Properties for adding a server in the cluster. */
export interface EdgeMachineRemoteSupportJobProperties extends EdgeMachineJobProperties {
  /** Job Type to support polymorphic resource. */
  jobType: "RemoteSupport";
  /** Remote support access level. */
  accessLevel: RemoteSupportAccessLevel;
  /** Remote support expiration timestamp. */
  expirationTimestamp: Date;
  /** Remote support type. */
  type: RemoteSupportType;
  /** log collection job reported properties. */
  readonly reportedProperties?: EdgeMachineRemoteSupportJobReportedProperties;
}

export function edgeMachineRemoteSupportJobPropertiesSerializer(
  item: EdgeMachineRemoteSupportJobProperties,
): any {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    accessLevel: item["accessLevel"],
    expirationTimestamp: item["expirationTimestamp"].toISOString(),
    type: item["type"],
  };
}

export function edgeMachineRemoteSupportJobPropertiesDeserializer(
  item: any,
): EdgeMachineRemoteSupportJobProperties {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    accessLevel: item["accessLevel"],
    expirationTimestamp: new Date(item["expirationTimestamp"]),
    type: item["type"],
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : edgeMachineRemoteSupportJobReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Represents the reported properties of a remote support job. */
export interface EdgeMachineRemoteSupportJobReportedProperties {
  /** The percentage of the job that is complete. */
  readonly percentComplete?: number;
  /** Validation status of job. */
  readonly validationStatus?: EceActionStatus;
  /** Deployment status of job. */
  readonly deploymentStatus?: EceActionStatus;
  /** Optional settings for configuring the node for remote support. */
  readonly nodeSettings?: EdgeMachineRemoteSupportNodeSettings;
  /** Details of the remote support session. */
  readonly sessionDetails?: RemoteSupportSession[];
}

export function edgeMachineRemoteSupportJobReportedPropertiesDeserializer(
  item: any,
): EdgeMachineRemoteSupportJobReportedProperties {
  return {
    percentComplete: item["percentComplete"],
    validationStatus: !item["validationStatus"]
      ? item["validationStatus"]
      : eceActionStatusDeserializer(item["validationStatus"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : eceActionStatusDeserializer(item["deploymentStatus"]),
    nodeSettings: !item["nodeSettings"]
      ? item["nodeSettings"]
      : edgeMachineRemoteSupportNodeSettingsDeserializer(item["nodeSettings"]),
    sessionDetails: !item["sessionDetails"]
      ? item["sessionDetails"]
      : remoteSupportSessionArrayDeserializer(item["sessionDetails"]),
  };
}

/** Represents the settings of a remote support node. */
export interface EdgeMachineRemoteSupportNodeSettings {
  /** The state of the remote support node. */
  readonly state?: string;
  /** The timestamp when the node settings were created, in UTC. */
  readonly createdAt?: Date;
  /** The timestamp when the node settings were last updated, in UTC. */
  readonly updatedAt?: Date;
  /** The current connection status of the remote support session. */
  readonly connectionStatus?: string;
  /** The error message, if any, from the last connection attempt. */
  readonly connectionErrorMessage?: string;
}

export function edgeMachineRemoteSupportNodeSettingsDeserializer(
  item: any,
): EdgeMachineRemoteSupportNodeSettings {
  return {
    state: item["state"],
    createdAt: !item["createdAt"] ? item["createdAt"] : new Date(item["createdAt"]),
    updatedAt: !item["updatedAt"] ? item["updatedAt"] : new Date(item["updatedAt"]),
    connectionStatus: item["connectionStatus"],
    connectionErrorMessage: item["connectionErrorMessage"],
  };
}

/** Represents the properties of an Azure Linux restricted operating environment Provision Os job. */
export interface ProvisionOsJobProperties extends EdgeMachineJobProperties {
  /** Job Type to support polymorphic resource. */
  jobType: "ProvisionOs";
  /** Os Provisioning request. */
  provisioningRequest: ProvisioningRequest;
  /** Reported Properties for Provision Os job */
  reportedProperties?: ProvisionOsReportedProperties;
}

export function provisionOsJobPropertiesSerializer(item: ProvisionOsJobProperties): any {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    provisioningRequest: provisioningRequestSerializer(item["provisioningRequest"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : provisionOsReportedPropertiesSerializer(item["reportedProperties"]),
  };
}

export function provisionOsJobPropertiesDeserializer(item: any): ProvisionOsJobProperties {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    provisioningRequest: provisioningRequestDeserializer(item["provisioningRequest"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : provisionOsReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Represents a provisioning request. */
export interface ProvisioningRequest {
  /** Target operating system to support polymorphic resource. */
  target: ProvisioningOsType;
  /** Operating system profile. */
  osProfile: OsProvisionProfile;
  /** User configuration. */
  userDetails?: UserDetails[];
  /** Onboarding configuration. */
  onboardingConfiguration?: OnboardingConfiguration;
  /** Device configuration. */
  deviceConfiguration?: TargetDeviceConfiguration;
  /** Base64 encoded custom configuration for CAPI to use */
  customConfiguration?: string;
}

export function provisioningRequestSerializer(item: ProvisioningRequest): any {
  return {
    target: item["target"],
    osProfile: osProvisionProfileSerializer(item["osProfile"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsArraySerializer(item["userDetails"]),
    onboardingConfiguration: !item["onboardingConfiguration"]
      ? item["onboardingConfiguration"]
      : onboardingConfigurationSerializer(item["onboardingConfiguration"]),
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : targetDeviceConfigurationSerializer(item["deviceConfiguration"]),
    customConfiguration: item["customConfiguration"],
  };
}

export function provisioningRequestDeserializer(item: any): ProvisioningRequest {
  return {
    target: item["target"],
    osProfile: osProvisionProfileDeserializer(item["osProfile"]),
    userDetails: !item["userDetails"]
      ? item["userDetails"]
      : userDetailsArrayDeserializer(item["userDetails"]),
    onboardingConfiguration: !item["onboardingConfiguration"]
      ? item["onboardingConfiguration"]
      : onboardingConfigurationDeserializer(item["onboardingConfiguration"]),
    deviceConfiguration: !item["deviceConfiguration"]
      ? item["deviceConfiguration"]
      : targetDeviceConfigurationDeserializer(item["deviceConfiguration"]),
    customConfiguration: item["customConfiguration"],
  };
}

/** Represents the provisioning operating system type. */
export enum KnownProvisioningOsType {
  /** AzureLinux OS. */
  AzureLinux = "AzureLinux",
  /** HCI OS. */
  HCI = "HCI",
}

/**
 * Represents the provisioning operating system type. \
 * {@link KnownProvisioningOsType} can be used interchangeably with ProvisioningOsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AzureLinux**: AzureLinux OS. \
 * **HCI**: HCI OS.
 */
export type ProvisioningOsType = string;

/** Onboarding configuration. */
export interface OnboardingConfiguration {
  /** Type of the onboarding resource to support polymorphic resource. */
  type?: OnboardingResourceType;
  /** Resource ID. */
  resourceId?: string;
  /** Location of the resource. */
  location?: string;
  /** Tenant ID of the resource. */
  tenantId?: string;
  /** Azure Arc virtual machine ID. */
  arcVirtualMachineId?: string;
}

export function onboardingConfigurationSerializer(item: OnboardingConfiguration): any {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
    location: item["location"],
    tenantId: item["tenantId"],
    arcVirtualMachineId: item["arcVirtualMachineId"],
  };
}

export function onboardingConfigurationDeserializer(item: any): OnboardingConfiguration {
  return {
    type: item["type"],
    resourceId: item["resourceId"],
    location: item["location"],
    tenantId: item["tenantId"],
    arcVirtualMachineId: item["arcVirtualMachineId"],
  };
}

/** Onboarding resource type. */
export enum KnownOnboardingResourceType {
  /** Hybrid Compute Machine. */
  HybridComputeMachine = "HybridComputeMachine",
}

/**
 * Onboarding resource type. \
 * {@link KnownOnboardingResourceType} can be used interchangeably with OnboardingResourceType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **HybridComputeMachine**: Hybrid Compute Machine.
 */
export type OnboardingResourceType = string;

/** Device configuration. */
export interface TargetDeviceConfiguration {
  /** Network configuration. */
  network?: NetworkConfiguration;
  /** Hostname of the device. */
  hostName?: string;
  /** Web proxy configuration. */
  webProxy?: WebProxyConfiguration;
  /** Time configuration. */
  time?: TimeConfiguration;
  /** Storage configuration. */
  storage?: StorageConfiguration;
}

export function targetDeviceConfigurationSerializer(item: TargetDeviceConfiguration): any {
  return {
    network: !item["network"] ? item["network"] : networkConfigurationSerializer(item["network"]),
    hostName: item["hostName"],
    webProxy: !item["webProxy"]
      ? item["webProxy"]
      : webProxyConfigurationSerializer(item["webProxy"]),
    time: !item["time"] ? item["time"] : timeConfigurationSerializer(item["time"]),
    storage: !item["storage"] ? item["storage"] : storageConfigurationSerializer(item["storage"]),
  };
}

export function targetDeviceConfigurationDeserializer(item: any): TargetDeviceConfiguration {
  return {
    network: !item["network"] ? item["network"] : networkConfigurationDeserializer(item["network"]),
    hostName: item["hostName"],
    webProxy: !item["webProxy"]
      ? item["webProxy"]
      : webProxyConfigurationDeserializer(item["webProxy"]),
    time: !item["time"] ? item["time"] : timeConfigurationDeserializer(item["time"]),
    storage: !item["storage"] ? item["storage"] : storageConfigurationDeserializer(item["storage"]),
  };
}

/** Network configuration. */
export interface NetworkConfiguration {
  /** List of network adapters. */
  networkAdapters?: NetworkAdapter[];
}

export function networkConfigurationSerializer(item: NetworkConfiguration): any {
  return {
    networkAdapters: !item["networkAdapters"]
      ? item["networkAdapters"]
      : networkAdapterArraySerializer(item["networkAdapters"]),
  };
}

export function networkConfigurationDeserializer(item: any): NetworkConfiguration {
  return {
    networkAdapters: !item["networkAdapters"]
      ? item["networkAdapters"]
      : networkAdapterArrayDeserializer(item["networkAdapters"]),
  };
}

export function networkAdapterArraySerializer(result: Array<NetworkAdapter>): any[] {
  return result.map((item) => {
    return networkAdapterSerializer(item);
  });
}

export function networkAdapterArrayDeserializer(result: Array<NetworkAdapter>): any[] {
  return result.map((item) => {
    return networkAdapterDeserializer(item);
  });
}

/** Network adapter configuration. */
export interface NetworkAdapter {
  /** Type of IP assignment. */
  ipAssignmentType: IpAssignmentType;
  /** IP address. */
  ipAddress?: string;
  /** Adapter Name. */
  adapterName?: string;
  /** MAC address. */
  macAddress?: string;
  /** IP address range. */
  ipAddressRange?: IpAddressRange;
  /** Gateway id. */
  gateway?: string;
  /** Subnet mask. */
  subnetMask?: string;
  /** Array of DNS addresses. */
  dnsAddressArray?: string[];
  /** VLAN ID for the network setup. */
  vlanId?: string;
}

export function networkAdapterSerializer(item: NetworkAdapter): any {
  return {
    ipAssignmentType: item["ipAssignmentType"],
    ipAddress: item["ipAddress"],
    adapterName: item["adapterName"],
    macAddress: item["macAddress"],
    ipAddressRange: !item["ipAddressRange"]
      ? item["ipAddressRange"]
      : ipAddressRangeSerializer(item["ipAddressRange"]),
    gateway: item["gateway"],
    subnetMask: item["subnetMask"],
    dnsAddressArray: !item["dnsAddressArray"]
      ? item["dnsAddressArray"]
      : item["dnsAddressArray"].map((p: any) => {
          return p;
        }),
    vlanId: item["vlanId"],
  };
}

export function networkAdapterDeserializer(item: any): NetworkAdapter {
  return {
    ipAssignmentType: item["ipAssignmentType"],
    ipAddress: item["ipAddress"],
    adapterName: item["adapterName"],
    macAddress: item["macAddress"],
    ipAddressRange: !item["ipAddressRange"]
      ? item["ipAddressRange"]
      : ipAddressRangeDeserializer(item["ipAddressRange"]),
    gateway: item["gateway"],
    subnetMask: item["subnetMask"],
    dnsAddressArray: !item["dnsAddressArray"]
      ? item["dnsAddressArray"]
      : item["dnsAddressArray"].map((p: any) => {
          return p;
        }),
    vlanId: item["vlanId"],
  };
}

/** IP assignment types */
export enum KnownIpAssignmentType {
  /** Automatic IP assignment */
  Automatic = "Automatic",
  /** Manual IP assignment */
  Manual = "Manual",
}

/**
 * IP assignment types \
 * {@link KnownIpAssignmentType} can be used interchangeably with IpAssignmentType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: Automatic IP assignment \
 * **Manual**: Manual IP assignment
 */
export type IpAssignmentType = string;

/** IP address range configuration. */
export interface IpAddressRange {
  /** Start IP address. */
  startIp: string;
  /** End IP address. */
  endIp: string;
}

export function ipAddressRangeSerializer(item: IpAddressRange): any {
  return { startIp: item["startIp"], endIp: item["endIp"] };
}

export function ipAddressRangeDeserializer(item: any): IpAddressRange {
  return {
    startIp: item["startIp"],
    endIp: item["endIp"],
  };
}

/** Web proxy configuration. */
export interface WebProxyConfiguration {
  /** Connection URI of the web proxy. */
  connectionUri?: string;
  /** Port of the web proxy. */
  port?: string;
  /** Bypass list for the web proxy. */
  bypassList?: string[];
}

export function webProxyConfigurationSerializer(item: WebProxyConfiguration): any {
  return {
    connectionUri: item["connectionUri"],
    port: item["port"],
    bypassList: !item["bypassList"]
      ? item["bypassList"]
      : item["bypassList"].map((p: any) => {
          return p;
        }),
  };
}

export function webProxyConfigurationDeserializer(item: any): WebProxyConfiguration {
  return {
    connectionUri: item["connectionUri"],
    port: item["port"],
    bypassList: !item["bypassList"]
      ? item["bypassList"]
      : item["bypassList"].map((p: any) => {
          return p;
        }),
  };
}

/** Time configuration. */
export interface TimeConfiguration {
  /** Primary NTP server. */
  primaryTimeServer?: string;
  /** Secondary NTP server. */
  secondaryTimeServer?: string;
  /** Time zone. */
  timeZone?: string;
}

export function timeConfigurationSerializer(item: TimeConfiguration): any {
  return {
    primaryTimeServer: item["primaryTimeServer"],
    secondaryTimeServer: item["secondaryTimeServer"],
    timeZone: item["timeZone"],
  };
}

export function timeConfigurationDeserializer(item: any): TimeConfiguration {
  return {
    primaryTimeServer: item["primaryTimeServer"],
    secondaryTimeServer: item["secondaryTimeServer"],
    timeZone: item["timeZone"],
  };
}

/** Storage configuration. */
export interface StorageConfiguration {
  /** Partition size. */
  partitionSize?: string;
}

export function storageConfigurationSerializer(item: StorageConfiguration): any {
  return { partitionSize: item["partitionSize"] };
}

export function storageConfigurationDeserializer(item: any): StorageConfiguration {
  return {
    partitionSize: item["partitionSize"],
  };
}

/** Reported Properties for Provision Os job */
export interface ProvisionOsReportedProperties {
  /** The percentage of the job that is complete. */
  readonly percentComplete?: number;
  /** Validation status of job. */
  readonly validationStatus?: EceActionStatus;
  /** Deployment status of job. */
  readonly deploymentStatus?: EceActionStatus;
}

export function provisionOsReportedPropertiesSerializer(item: ProvisionOsReportedProperties): any {
  return item;
}

export function provisionOsReportedPropertiesDeserializer(
  item: any,
): ProvisionOsReportedProperties {
  return {
    percentComplete: item["percentComplete"],
    validationStatus: !item["validationStatus"]
      ? item["validationStatus"]
      : eceActionStatusDeserializer(item["validationStatus"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : eceActionStatusDeserializer(item["deploymentStatus"]),
  };
}

/** Represents the properties of Download Os job. */
export interface DownloadOsJobProperties extends EdgeMachineJobProperties {
  /** Job Type to support polymorphic resource. */
  jobType: "DownloadOs";
  /** Download OS request. */
  downloadRequest: DownloadRequest;
  /** Reported Properties for Download Os job */
  reportedProperties?: ProvisionOsReportedProperties;
}

export function downloadOsJobPropertiesSerializer(item: DownloadOsJobProperties): any {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    downloadRequest: downloadRequestSerializer(item["downloadRequest"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : provisionOsReportedPropertiesSerializer(item["reportedProperties"]),
  };
}

export function downloadOsJobPropertiesDeserializer(item: any): DownloadOsJobProperties {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    downloadRequest: downloadRequestDeserializer(item["downloadRequest"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : provisionOsReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Download Request properties */
export interface DownloadRequest {
  /** Target operating system to support polymorphic resource. */
  target: ProvisioningOsType;
  /** Operating system profile. */
  osProfile: DownloadOsProfile;
}

export function downloadRequestSerializer(item: DownloadRequest): any {
  return { target: item["target"], osProfile: downloadOsProfileSerializer(item["osProfile"]) };
}

export function downloadRequestDeserializer(item: any): DownloadRequest {
  return {
    target: item["target"],
    osProfile: downloadOsProfileDeserializer(item["osProfile"]),
  };
}

/** Operating system profile. */
export interface DownloadOsProfile {
  /** Name of the operating system. */
  osName?: string;
  /** Type of the operating system. */
  osType?: string;
  /** Version of the operating system. */
  osVersion?: string;
  /** Location of the operating system image. */
  osImageLocation?: string;
  /** Validated Solution Recipe version to be used for the job */
  vsrVersion?: string;
  /** Hash of the OS package downloaded */
  imageHash?: string;
  /** GPG Public Key used for package verification */
  gpgPubKey?: string;
}

export function downloadOsProfileSerializer(item: DownloadOsProfile): any {
  return {
    osName: item["osName"],
    osType: item["osType"],
    osVersion: item["osVersion"],
    osImageLocation: item["osImageLocation"],
    vsrVersion: item["vsrVersion"],
    imageHash: item["imageHash"],
    gpgPubKey: item["gpgPubKey"],
  };
}

export function downloadOsProfileDeserializer(item: any): DownloadOsProfile {
  return {
    osName: item["osName"],
    osType: item["osType"],
    osVersion: item["osVersion"],
    osImageLocation: item["osImageLocation"],
    vsrVersion: item["vsrVersion"],
    imageHash: item["imageHash"],
    gpgPubKey: item["gpgPubKey"],
  };
}

/** Properties for pausing a server in the cluster. */
export interface EdgeMachineCollectLogJobProperties extends EdgeMachineJobProperties {
  /** ClusterJob Type to support polymorphic resource. */
  jobType: "CollectLog";
  /** From date for log collection. */
  fromDate: Date;
  /** To date for log collection. */
  toDate: Date;
  /** To date for log collection. */
  readonly lastLogGenerated?: Date;
  /** log collection job reported properties. */
  readonly reportedProperties?: EdgeMachineCollectLogJobReportedProperties;
}

export function edgeMachineCollectLogJobPropertiesSerializer(
  item: EdgeMachineCollectLogJobProperties,
): any {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    fromDate: item["fromDate"].toISOString(),
    toDate: item["toDate"].toISOString(),
  };
}

export function edgeMachineCollectLogJobPropertiesDeserializer(
  item: any,
): EdgeMachineCollectLogJobProperties {
  return {
    jobType: item["jobType"],
    deploymentMode: item["deploymentMode"],
    provisioningState: item["provisioningState"],
    jobId: item["jobId"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    fromDate: new Date(item["fromDate"]),
    toDate: new Date(item["toDate"]),
    lastLogGenerated: !item["lastLogGenerated"]
      ? item["lastLogGenerated"]
      : new Date(item["lastLogGenerated"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : edgeMachineCollectLogJobReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

/** Represents the reported properties of a log collection job. */
export interface EdgeMachineCollectLogJobReportedProperties {
  /** The percentage of the job that is complete. */
  readonly percentComplete?: number;
  /** Validation status of job. */
  readonly validationStatus?: EceActionStatus;
  /** Deployment status of job. */
  readonly deploymentStatus?: EceActionStatus;
  /** Details of the log collection session. */
  readonly logCollectionSessionDetails?: LogCollectionJobSession[];
}

export function edgeMachineCollectLogJobReportedPropertiesDeserializer(
  item: any,
): EdgeMachineCollectLogJobReportedProperties {
  return {
    percentComplete: item["percentComplete"],
    validationStatus: !item["validationStatus"]
      ? item["validationStatus"]
      : eceActionStatusDeserializer(item["validationStatus"]),
    deploymentStatus: !item["deploymentStatus"]
      ? item["deploymentStatus"]
      : eceActionStatusDeserializer(item["deploymentStatus"]),
    logCollectionSessionDetails: !item["logCollectionSessionDetails"]
      ? item["logCollectionSessionDetails"]
      : logCollectionJobSessionArrayDeserializer(item["logCollectionSessionDetails"]),
  };
}

/** The response of a EdgeMachineJob list operation. */
export interface _EdgeMachineJobListResult {
  /** The EdgeMachineJob items on this page */
  value: EdgeMachineJob[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _edgeMachineJobListResultDeserializer(item: any): _EdgeMachineJobListResult {
  return {
    value: edgeMachineJobArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function edgeMachineJobArraySerializer(result: Array<EdgeMachineJob>): any[] {
  return result.map((item) => {
    return edgeMachineJobSerializer(item);
  });
}

export function edgeMachineJobArrayDeserializer(result: Array<EdgeMachineJob>): any[] {
  return result.map((item) => {
    return edgeMachineJobDeserializer(item);
  });
}

/** Validate Ownership Voucher Request */
export interface ValidateOwnershipVouchersRequest {
  /** Ownership Voucher Details. */
  ownershipVoucherDetails: OwnershipVoucherDetails[];
}

export function validateOwnershipVouchersRequestSerializer(
  item: ValidateOwnershipVouchersRequest,
): any {
  return {
    ownershipVoucherDetails: ownershipVoucherDetailsArraySerializer(
      item["ownershipVoucherDetails"],
    ),
  };
}

export function ownershipVoucherDetailsArraySerializer(
  result: Array<OwnershipVoucherDetails>,
): any[] {
  return result.map((item) => {
    return ownershipVoucherDetailsSerializer(item);
  });
}

export function ownershipVoucherDetailsArrayDeserializer(
  result: Array<OwnershipVoucherDetails>,
): any[] {
  return result.map((item) => {
    return ownershipVoucherDetailsDeserializer(item);
  });
}

/** Validate Ownership Voucher Response */
export interface ValidateOwnershipVouchersResponse {
  /** Ownership Voucher Validation Details. */
  ownershipVoucherValidationDetails: OwnershipVoucherValidationDetails[];
}

export function validateOwnershipVouchersResponseDeserializer(
  item: any,
): ValidateOwnershipVouchersResponse {
  return {
    ownershipVoucherValidationDetails: ownershipVoucherValidationDetailsArrayDeserializer(
      item["ownershipVoucherValidationDetails"],
    ),
  };
}

export function ownershipVoucherValidationDetailsArrayDeserializer(
  result: Array<OwnershipVoucherValidationDetails>,
): any[] {
  return result.map((item) => {
    return ownershipVoucherValidationDetailsDeserializer(item);
  });
}

/** Ownership Voucher Validation Details */
export interface OwnershipVoucherValidationDetails {
  /** The ownership voucher validation status. */
  validationStatus?: OwnershipVoucherValidationStatus;
  /** Serial number of the device. */
  serialNumber?: string;
  /** FDO guid of the Ownership Voucher. */
  id?: string;
  /** Name of the manufacturer. */
  manufacturer?: string;
  /** Name of the model. */
  modelName?: string;
  /** Version of the Ownership Voucher format */
  version?: string;
  /** Azure Machine Id of the Ownership voucher */
  azureMachineId?: string;
  /** Error details if the validation failed. */
  error?: ErrorDetail;
}

export function ownershipVoucherValidationDetailsDeserializer(
  item: any,
): OwnershipVoucherValidationDetails {
  return {
    validationStatus: item["validationStatus"],
    serialNumber: item["serialNumber"],
    id: item["id"],
    manufacturer: item["manufacturer"],
    modelName: item["modelName"],
    version: item["version"],
    azureMachineId: item["azureMachineId"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Ownership Voucher validation Status. */
export enum KnownOwnershipVoucherValidationStatus {
  /** Voucher evaluated as valid. */
  Valid = "Valid",
  /** Voucher evaluated as invalid. */
  Invalid = "Invalid",
}

/**
 * Ownership Voucher validation Status. \
 * {@link KnownOwnershipVoucherValidationStatus} can be used interchangeably with OwnershipVoucherValidationStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Valid**: Voucher evaluated as valid. \
 * **Invalid**: Voucher evaluated as invalid.
 */
export type OwnershipVoucherValidationStatus = string;

/** Get the update summaries for the cluster */
export interface UpdateSummaries extends ProxyResource {
  /** The geo-location where the resource lives */
  location?: string;
  /** Provisioning state of the UpdateSummaries proxy resource. Indicates the current lifecycle status of the update summary operation, such as whether it has been accepted, is in progress, or has completed. */
  readonly provisioningState?: ProvisioningState;
  /** OEM family name. */
  oemFamily?: string;
  /** Current OEM Version. */
  currentOemVersion?: string;
  /** Name of the hardware model. */
  hardwareModel?: string;
  /** Current version of each updatable component. */
  packageVersions?: PackageVersionInfo[];
  /** Current Solution Bundle version of the stamp. */
  currentVersion?: string;
  /** Current Sbe version of the stamp. */
  currentSbeVersion?: string;
  /** Last time an update installation completed successfully. */
  lastUpdated?: Date;
  /** Last time the update service successfully checked for updates */
  lastChecked?: Date;
  /** Overall health state for update-specific health checks. */
  healthState?: HealthState;
  /** An array of pre-check result objects. */
  healthCheckResult?: PrecheckResult[];
  /** Last time the package-specific checks were run. */
  healthCheckDate?: Date;
  /** Overall update state of the stamp. Indicates the current status of update deployment across the stamp, including preparation, application, and any issues encountered. */
  state?: UpdateSummariesPropertiesState;
}

export function updateSummariesSerializer(item: UpdateSummaries): any {
  return {
    properties: areAllPropsUndefined(item, [
      "oemFamily",
      "currentOemVersion",
      "hardwareModel",
      "packageVersions",
      "currentVersion",
      "currentSbeVersion",
      "lastUpdated",
      "lastChecked",
      "healthState",
      "healthCheckResult",
      "healthCheckDate",
      "state",
    ])
      ? undefined
      : _updateSummariesPropertiesSerializer(item),
    location: item["location"],
  };
}

export function updateSummariesDeserializer(item: any): UpdateSummaries {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _updateSummariesPropertiesDeserializer(item["properties"])),
    location: item["location"],
  };
}

/** Properties of Update summaries */
export interface UpdateSummariesProperties {
  /** Provisioning state of the UpdateSummaries proxy resource. Indicates the current lifecycle status of the update summary operation, such as whether it has been accepted, is in progress, or has completed. */
  readonly provisioningState?: ProvisioningState;
  /** OEM family name. */
  oemFamily?: string;
  /** Current OEM Version. */
  currentOemVersion?: string;
  /** Name of the hardware model. */
  hardwareModel?: string;
  /** Current version of each updatable component. */
  packageVersions?: PackageVersionInfo[];
  /** Current Solution Bundle version of the stamp. */
  currentVersion?: string;
  /** Current Sbe version of the stamp. */
  currentSbeVersion?: string;
  /** Last time an update installation completed successfully. */
  lastUpdated?: Date;
  /** Last time the update service successfully checked for updates */
  lastChecked?: Date;
  /** Overall health state for update-specific health checks. */
  healthState?: HealthState;
  /** An array of pre-check result objects. */
  healthCheckResult?: PrecheckResult[];
  /** Last time the package-specific checks were run. */
  healthCheckDate?: Date;
  /** Overall update state of the stamp. Indicates the current status of update deployment across the stamp, including preparation, application, and any issues encountered. */
  state?: UpdateSummariesPropertiesState;
}

export function updateSummariesPropertiesSerializer(item: UpdateSummariesProperties): any {
  return {
    oemFamily: item["oemFamily"],
    currentOemVersion: item["currentOemVersion"],
    hardwareModel: item["hardwareModel"],
    packageVersions: !item["packageVersions"]
      ? item["packageVersions"]
      : packageVersionInfoArraySerializer(item["packageVersions"]),
    currentVersion: item["currentVersion"],
    currentSbeVersion: item["currentSbeVersion"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : item["lastUpdated"].toISOString(),
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : item["lastChecked"].toISOString(),
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArraySerializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : item["healthCheckDate"].toISOString(),
    state: item["state"],
  };
}

export function updateSummariesPropertiesDeserializer(item: any): UpdateSummariesProperties {
  return {
    provisioningState: item["provisioningState"],
    oemFamily: item["oemFamily"],
    currentOemVersion: item["currentOemVersion"],
    hardwareModel: item["hardwareModel"],
    packageVersions: !item["packageVersions"]
      ? item["packageVersions"]
      : packageVersionInfoArrayDeserializer(item["packageVersions"]),
    currentVersion: item["currentVersion"],
    currentSbeVersion: item["currentSbeVersion"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : new Date(item["lastChecked"]),
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArrayDeserializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : new Date(item["healthCheckDate"]),
    state: item["state"],
  };
}

/** Overall update state of the stamp. Indicates the current status of update deployment across the stamp, including preparation, application, and any issues encountered. */
export enum KnownUpdateSummariesPropertiesState {
  /** The update state is not known. */
  Unknown = "Unknown",
  /** Updates have been successfully applied to the stamp. */
  AppliedSuccessfully = "AppliedSuccessfully",
  /** Updates are available but have not yet been applied. */
  UpdateAvailable = "UpdateAvailable",
  /** Updates are currently being applied to the stamp. */
  UpdateInProgress = "UpdateInProgress",
  /** The update process failed. */
  UpdateFailed = "UpdateFailed",
  /** The update process requires user intervention or has encountered issues needing attention. */
  NeedsAttention = "NeedsAttention",
  /** Preparation for the update is currently in progress. */
  PreparationInProgress = "PreparationInProgress",
  /** Preparation for the update failed. */
  PreparationFailed = "PreparationFailed",
}

/**
 * Overall update state of the stamp. Indicates the current status of update deployment across the stamp, including preparation, application, and any issues encountered. \
 * {@link KnownUpdateSummariesPropertiesState} can be used interchangeably with UpdateSummariesPropertiesState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unknown**: The update state is not known. \
 * **AppliedSuccessfully**: Updates have been successfully applied to the stamp. \
 * **UpdateAvailable**: Updates are available but have not yet been applied. \
 * **UpdateInProgress**: Updates are currently being applied to the stamp. \
 * **UpdateFailed**: The update process failed. \
 * **NeedsAttention**: The update process requires user intervention or has encountered issues needing attention. \
 * **PreparationInProgress**: Preparation for the update is currently in progress. \
 * **PreparationFailed**: Preparation for the update failed.
 */
export type UpdateSummariesPropertiesState = string;

/** List of Update Summaries */
export interface _UpdateSummariesList {
  /** The UpdateSummaries items on this page */
  value: UpdateSummaries[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _updateSummariesListDeserializer(item: any): _UpdateSummariesList {
  return {
    value: updateSummariesArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function updateSummariesArraySerializer(result: Array<UpdateSummaries>): any[] {
  return result.map((item) => {
    return updateSummariesSerializer(item);
  });
}

export function updateSummariesArrayDeserializer(result: Array<UpdateSummaries>): any[] {
  return result.map((item) => {
    return updateSummariesDeserializer(item);
  });
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-11-01-preview API version. */
  V20251101Preview = "2025-11-01-preview",
  /** The 2025-12-01-preview API version. */
  V20251201Preview = "2025-12-01-preview",
}

export function _arcSettingPropertiesSerializer(item: ArcSetting): any {
  return {
    arcInstanceResourceGroup: item["arcInstanceResourceGroup"],
    arcApplicationClientId: item["arcApplicationClientId"],
    arcApplicationTenantId: item["arcApplicationTenantId"],
    arcServicePrincipalObjectId: item["arcServicePrincipalObjectId"],
    arcApplicationObjectId: item["arcApplicationObjectId"],
    connectivityProperties: !item["connectivityProperties"]
      ? item["connectivityProperties"]
      : arcConnectivityPropertiesSerializer(item["connectivityProperties"]),
  };
}

export function _arcSettingPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    arcInstanceResourceGroup: item["arcInstanceResourceGroup"],
    arcApplicationClientId: item["arcApplicationClientId"],
    arcApplicationTenantId: item["arcApplicationTenantId"],
    arcServicePrincipalObjectId: item["arcServicePrincipalObjectId"],
    arcApplicationObjectId: item["arcApplicationObjectId"],
    aggregateState: item["aggregateState"],
    perNodeDetails: !item["perNodeDetails"]
      ? item["perNodeDetails"]
      : perNodeStateArrayDeserializer(item["perNodeDetails"]),
    connectivityProperties: !item["connectivityProperties"]
      ? item["connectivityProperties"]
      : arcConnectivityPropertiesDeserializer(item["connectivityProperties"]),
    defaultExtensions: !item["defaultExtensions"]
      ? item["defaultExtensions"]
      : defaultExtensionDetailsArrayDeserializer(item["defaultExtensions"]),
  };
}

export function _arcSettingsPatchPropertiesSerializer(item: ArcSettingsPatch): any {
  return {
    connectivityProperties: !item["connectivityProperties"]
      ? item["connectivityProperties"]
      : arcConnectivityPropertiesSerializer(item["connectivityProperties"]),
  };
}

export function _arcIdentityResponsePropertiesDeserializer(item: any) {
  return {
    arcApplicationClientId: item["arcApplicationClientId"],
    arcApplicationTenantId: item["arcApplicationTenantId"],
    arcServicePrincipalObjectId: item["arcServicePrincipalObjectId"],
    arcApplicationObjectId: item["arcApplicationObjectId"],
  };
}

export function _offerPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    publisherId: item["publisherId"],
    content: item["content"],
    contentVersion: item["contentVersion"],
    skuMappings: !item["skuMappings"]
      ? item["skuMappings"]
      : skuMappingsArrayDeserializer(item["skuMappings"]),
  };
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    cloudManagementEndpoint: item["cloudManagementEndpoint"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    aadApplicationObjectId: item["aadApplicationObjectId"],
    aadServicePrincipalObjectId: item["aadServicePrincipalObjectId"],
    softwareAssuranceProperties: !item["softwareAssuranceProperties"]
      ? item["softwareAssuranceProperties"]
      : softwareAssurancePropertiesSerializer(item["softwareAssuranceProperties"]),
    logCollectionProperties: !item["logCollectionProperties"]
      ? item["logCollectionProperties"]
      : logCollectionPropertiesSerializer(item["logCollectionProperties"]),
    remoteSupportProperties: !item["remoteSupportProperties"]
      ? item["remoteSupportProperties"]
      : remoteSupportPropertiesSerializer(item["remoteSupportProperties"]),
    desiredProperties: !item["desiredProperties"]
      ? item["desiredProperties"]
      : clusterDesiredPropertiesSerializer(item["desiredProperties"]),
    secretsLocations: !item["secretsLocations"]
      ? item["secretsLocations"]
      : secretsLocationDetailsArraySerializer(item["secretsLocations"]),
    localAvailabilityZones: !item["localAvailabilityZones"]
      ? item["localAvailabilityZones"]
      : localAvailabilityZonesArraySerializer(item["localAvailabilityZones"]),
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    status: item["status"],
    connectivityStatus: item["connectivityStatus"],
    supportStatus: item["supportStatus"],
    cloudId: item["cloudId"],
    ring: item["ring"],
    cloudManagementEndpoint: item["cloudManagementEndpoint"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    aadApplicationObjectId: item["aadApplicationObjectId"],
    aadServicePrincipalObjectId: item["aadServicePrincipalObjectId"],
    softwareAssuranceProperties: !item["softwareAssuranceProperties"]
      ? item["softwareAssuranceProperties"]
      : softwareAssurancePropertiesDeserializer(item["softwareAssuranceProperties"]),
    isManagementCluster: item["isManagementCluster"],
    logCollectionProperties: !item["logCollectionProperties"]
      ? item["logCollectionProperties"]
      : logCollectionPropertiesDeserializer(item["logCollectionProperties"]),
    remoteSupportProperties: !item["remoteSupportProperties"]
      ? item["remoteSupportProperties"]
      : remoteSupportPropertiesDeserializer(item["remoteSupportProperties"]),
    desiredProperties: !item["desiredProperties"]
      ? item["desiredProperties"]
      : clusterDesiredPropertiesDeserializer(item["desiredProperties"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : clusterReportedPropertiesDeserializer(item["reportedProperties"]),
    isolatedVmAttestationConfiguration: !item["isolatedVmAttestationConfiguration"]
      ? item["isolatedVmAttestationConfiguration"]
      : isolatedVmAttestationConfigurationDeserializer(item["isolatedVmAttestationConfiguration"]),
    trialDaysRemaining: item["trialDaysRemaining"],
    billingModel: item["billingModel"],
    registrationTimestamp: !item["registrationTimestamp"]
      ? item["registrationTimestamp"]
      : new Date(item["registrationTimestamp"]),
    lastSyncTimestamp: !item["lastSyncTimestamp"]
      ? item["lastSyncTimestamp"]
      : new Date(item["lastSyncTimestamp"]),
    lastBillingTimestamp: !item["lastBillingTimestamp"]
      ? item["lastBillingTimestamp"]
      : new Date(item["lastBillingTimestamp"]),
    serviceEndpoint: item["serviceEndpoint"],
    resourceProviderObjectId: item["resourceProviderObjectId"],
    secretsLocations: !item["secretsLocations"]
      ? item["secretsLocations"]
      : secretsLocationDetailsArrayDeserializer(item["secretsLocations"]),
    clusterPattern: item["clusterPattern"],
    confidentialVmProperties: !item["confidentialVmProperties"]
      ? item["confidentialVmProperties"]
      : confidentialVmPropertiesDeserializer(item["confidentialVmProperties"]),
    sdnProperties: !item["sdnProperties"]
      ? item["sdnProperties"]
      : clusterSdnPropertiesDeserializer(item["sdnProperties"]),
    localAvailabilityZones: !item["localAvailabilityZones"]
      ? item["localAvailabilityZones"]
      : localAvailabilityZonesArrayDeserializer(item["localAvailabilityZones"]),
    identityProvider: item["identityProvider"],
  };
}

export function _clusterIdentitySerializer(item: Cluster): any {
  return { type: item["typeIdentityType"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function _clusterIdentityDeserializer(item: any) {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    typeIdentityType: item["type"],
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

export function _clusterPatchIdentitySerializer(item: ClusterPatch): any {
  return { type: item["type"], userAssignedIdentities: item["userAssignedIdentities"] };
}

export function _clusterPatchIdentityDeserializer(item: any) {
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

export function _clusterPatchPropertiesSerializer(item: ClusterPatch): any {
  return {
    cloudManagementEndpoint: item["cloudManagementEndpoint"],
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    desiredProperties: !item["desiredProperties"]
      ? item["desiredProperties"]
      : clusterDesiredPropertiesSerializer(item["desiredProperties"]),
  };
}

export function _clusterIdentityResponsePropertiesDeserializer(item: any) {
  return {
    aadClientId: item["aadClientId"],
    aadTenantId: item["aadTenantId"],
    aadServicePrincipalObjectId: item["aadServicePrincipalObjectId"],
    aadApplicationObjectId: item["aadApplicationObjectId"],
  };
}

export function _deploymentSettingPropertiesSerializer(item: DeploymentSetting): any {
  return {
    arcNodeResourceIds: !item["arcNodeResourceIds"]
      ? item["arcNodeResourceIds"]
      : item["arcNodeResourceIds"].map((p: any) => {
          return p;
        }),
    deploymentMode: item["deploymentMode"],
    operationType: item["operationType"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : deploymentConfigurationSerializer(item["deploymentConfiguration"]),
  };
}

export function _deploymentSettingPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    arcNodeResourceIds: !item["arcNodeResourceIds"]
      ? item["arcNodeResourceIds"]
      : item["arcNodeResourceIds"].map((p: any) => {
          return p;
        }),
    deploymentMode: item["deploymentMode"],
    operationType: item["operationType"],
    deploymentConfiguration: !item["deploymentConfiguration"]
      ? item["deploymentConfiguration"]
      : deploymentConfigurationDeserializer(item["deploymentConfiguration"]),
    reportedProperties: !item["reportedProperties"]
      ? item["reportedProperties"]
      : eceReportedPropertiesDeserializer(item["reportedProperties"]),
  };
}

export function _extensionPropertiesExtensionParametersSerializer(item: ExtensionProperties): any {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

export function _extensionPropertiesExtensionParametersDeserializer(item: any) {
  return {
    forceUpdateTag: item["forceUpdateTag"],
    publisher: item["publisher"],
    type: item["type"],
    typeHandlerVersion: item["typeHandlerVersion"],
    autoUpgradeMinorVersion: item["autoUpgradeMinorVersion"],
    settings: item["settings"],
    protectedSettings: item["protectedSettings"],
    enableAutomaticUpgrade: item["enableAutomaticUpgrade"],
  };
}

export function _extensionPropertiesSerializer(item: Extension): any {
  return {
    extensionParameters: !item["extensionParameters"]
      ? item["extensionParameters"]
      : extensionParametersSerializer(item["extensionParameters"]),
  };
}

export function _extensionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    extensionParameters: !item["extensionParameters"]
      ? item["extensionParameters"]
      : extensionParametersDeserializer(item["extensionParameters"]),
    aggregateState: item["aggregateState"],
    perNodeExtensionDetails: !item["perNodeExtensionDetails"]
      ? item["perNodeExtensionDetails"]
      : perNodeExtensionStateArrayDeserializer(item["perNodeExtensionDetails"]),
    managedBy: item["managedBy"],
  };
}

export function _extensionPatchPropertiesSerializer(item: ExtensionPatch): any {
  return {
    extensionParameters: !item["extensionParameters"]
      ? item["extensionParameters"]
      : extensionPatchParametersSerializer(item["extensionParameters"]),
  };
}

export function _publisherPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _securitySettingPropertiesSerializer(item: SecuritySetting): any {
  return {
    securedCoreComplianceAssignment: item["securedCoreComplianceAssignment"],
    wdacComplianceAssignment: item["wdacComplianceAssignment"],
    smbEncryptionForIntraClusterTrafficComplianceAssignment:
      item["smbEncryptionForIntraClusterTrafficComplianceAssignment"],
  };
}

export function _securitySettingPropertiesDeserializer(item: any) {
  return {
    securedCoreComplianceAssignment: item["securedCoreComplianceAssignment"],
    wdacComplianceAssignment: item["wdacComplianceAssignment"],
    smbEncryptionForIntraClusterTrafficComplianceAssignment:
      item["smbEncryptionForIntraClusterTrafficComplianceAssignment"],
    securityComplianceStatus: !item["securityComplianceStatus"]
      ? item["securityComplianceStatus"]
      : securityComplianceStatusDeserializer(item["securityComplianceStatus"]),
    provisioningState: item["provisioningState"],
  };
}

export function _skuPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    publisherId: item["publisherId"],
    offerId: item["offerId"],
    content: item["content"],
    contentVersion: item["contentVersion"],
    skuMappings: !item["skuMappings"]
      ? item["skuMappings"]
      : skuMappingsArrayDeserializer(item["skuMappings"]),
  };
}

export function _updateRunPropertiesProgressSerializer(item: UpdateRunProperties): any {
  return {
    name: item["name"],
    description: item["description"],
    errorMessage: item["errorMessage"],
    status: item["status"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : item["startTimeUtc"].toISOString(),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : item["endTimeUtc"].toISOString(),
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : item["lastUpdatedTimeUtc"].toISOString(),
    expectedExecutionTime: item["expectedExecutionTime"],
    steps: !item["steps"] ? item["steps"] : stepArraySerializer(item["steps"]),
  };
}

export function _updateRunPropertiesProgressDeserializer(item: any) {
  return {
    name: item["name"],
    description: item["description"],
    errorMessage: item["errorMessage"],
    status: item["status"],
    startTimeUtc: !item["startTimeUtc"] ? item["startTimeUtc"] : new Date(item["startTimeUtc"]),
    endTimeUtc: !item["endTimeUtc"] ? item["endTimeUtc"] : new Date(item["endTimeUtc"]),
    lastUpdatedTimeUtc: !item["lastUpdatedTimeUtc"]
      ? item["lastUpdatedTimeUtc"]
      : new Date(item["lastUpdatedTimeUtc"]),
    expectedExecutionTime: item["expectedExecutionTime"],
    steps: !item["steps"] ? item["steps"] : stepArrayDeserializer(item["steps"]),
  };
}

export function _updateRunPropertiesSerializer(item: UpdateRun): any {
  return {
    timeStarted: !item["timeStarted"] ? item["timeStarted"] : item["timeStarted"].toISOString(),
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : item["lastUpdatedTime"].toISOString(),
    duration: item["duration"],
    state: item["state"],
    progress: !item["progress"] ? item["progress"] : stepSerializer(item["progress"]),
  };
}

export function _updateRunPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    timeStarted: !item["timeStarted"] ? item["timeStarted"] : new Date(item["timeStarted"]),
    lastUpdatedTime: !item["lastUpdatedTime"]
      ? item["lastUpdatedTime"]
      : new Date(item["lastUpdatedTime"]),
    duration: item["duration"],
    state: item["state"],
    progress: !item["progress"] ? item["progress"] : stepDeserializer(item["progress"]),
  };
}

export function _updatePropertiesUpdateStatePropertiesSerializer(item: UpdateProperties): any {
  return { progressPercentage: item["progressPercentage"], notifyMessage: item["notifyMessage"] };
}

export function _updatePropertiesUpdateStatePropertiesDeserializer(item: any) {
  return {
    progressPercentage: item["progressPercentage"],
    notifyMessage: item["notifyMessage"],
  };
}

export function _updatePropertiesSerializer(item: Update): any {
  return {
    installedDate: !item["installedDate"]
      ? item["installedDate"]
      : item["installedDate"].toISOString(),
    description: item["description"],
    minSbeVersionRequired: item["minSbeVersionRequired"],
    state: item["state"],
    prerequisites: !item["prerequisites"]
      ? item["prerequisites"]
      : updatePrerequisiteArraySerializer(item["prerequisites"]),
    componentVersions: !item["componentVersions"]
      ? item["componentVersions"]
      : packageVersionInfoArraySerializer(item["componentVersions"]),
    rebootRequired: item["rebootRequired"],
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArraySerializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : item["healthCheckDate"].toISOString(),
    packagePath: item["packagePath"],
    packageSizeInMb: item["packageSizeInMb"],
    displayName: item["displayName"],
    version: item["version"],
    publisher: item["publisher"],
    releaseLink: item["releaseLink"],
    availabilityType: item["availabilityType"],
    packageType: item["packageType"],
    additionalProperties: item["additionalProperties"],
    updateStateProperties: !item["updateStateProperties"]
      ? item["updateStateProperties"]
      : updateStatePropertiesSerializer(item["updateStateProperties"]),
  };
}

export function _updatePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    installedDate: !item["installedDate"] ? item["installedDate"] : new Date(item["installedDate"]),
    description: item["description"],
    minSbeVersionRequired: item["minSbeVersionRequired"],
    state: item["state"],
    prerequisites: !item["prerequisites"]
      ? item["prerequisites"]
      : updatePrerequisiteArrayDeserializer(item["prerequisites"]),
    componentVersions: !item["componentVersions"]
      ? item["componentVersions"]
      : packageVersionInfoArrayDeserializer(item["componentVersions"]),
    rebootRequired: item["rebootRequired"],
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArrayDeserializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : new Date(item["healthCheckDate"]),
    packagePath: item["packagePath"],
    packageSizeInMb: item["packageSizeInMb"],
    displayName: item["displayName"],
    version: item["version"],
    publisher: item["publisher"],
    releaseLink: item["releaseLink"],
    availabilityType: item["availabilityType"],
    packageType: item["packageType"],
    additionalProperties: item["additionalProperties"],
    updateStateProperties: !item["updateStateProperties"]
      ? item["updateStateProperties"]
      : updateStatePropertiesDeserializer(item["updateStateProperties"]),
  };
}

export function _updateSummariesPropertiesSerializer(item: UpdateSummaries): any {
  return {
    oemFamily: item["oemFamily"],
    currentOemVersion: item["currentOemVersion"],
    hardwareModel: item["hardwareModel"],
    packageVersions: !item["packageVersions"]
      ? item["packageVersions"]
      : packageVersionInfoArraySerializer(item["packageVersions"]),
    currentVersion: item["currentVersion"],
    currentSbeVersion: item["currentSbeVersion"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : item["lastUpdated"].toISOString(),
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : item["lastChecked"].toISOString(),
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArraySerializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : item["healthCheckDate"].toISOString(),
    state: item["state"],
  };
}

export function _updateSummariesPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    oemFamily: item["oemFamily"],
    currentOemVersion: item["currentOemVersion"],
    hardwareModel: item["hardwareModel"],
    packageVersions: !item["packageVersions"]
      ? item["packageVersions"]
      : packageVersionInfoArrayDeserializer(item["packageVersions"]),
    currentVersion: item["currentVersion"],
    currentSbeVersion: item["currentSbeVersion"],
    lastUpdated: !item["lastUpdated"] ? item["lastUpdated"] : new Date(item["lastUpdated"]),
    lastChecked: !item["lastChecked"] ? item["lastChecked"] : new Date(item["lastChecked"]),
    healthState: item["healthState"],
    healthCheckResult: !item["healthCheckResult"]
      ? item["healthCheckResult"]
      : precheckResultArrayDeserializer(item["healthCheckResult"]),
    healthCheckDate: !item["healthCheckDate"]
      ? item["healthCheckDate"]
      : new Date(item["healthCheckDate"]),
    state: item["state"],
  };
}
