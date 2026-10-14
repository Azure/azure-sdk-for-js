// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";

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

/** An Azure Sphere catalog */
export interface Catalog extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CatalogProperties;
}

export function catalogSerializer(item: Catalog): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : catalogPropertiesSerializer(item["properties"]),
  };
}

export function catalogDeserializer(item: any): Catalog {
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
      : catalogPropertiesDeserializer(item["properties"]),
  };
}

/** Catalog properties */
export interface CatalogProperties {
  /** The Azure Sphere tenant ID associated with the catalog. */
  readonly tenantId?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function catalogPropertiesSerializer(_item: CatalogProperties): any {
  return {};
}

export function catalogPropertiesDeserializer(item: any): CatalogProperties {
  return {
    tenantId: item["tenantId"],
    provisioningState: item["provisioningState"],
  };
}

/** Provisioning state of resource. */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The resource is being provisioned */
  Provisioning = "Provisioning",
  /** The resource is being updated */
  Updating = "Updating",
  /** The resource is being deleted */
  Deleting = "Deleting",
  /** The resource create request has been accepted */
  Accepted = "Accepted",
}

/**
 * Provisioning state of resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Provisioning**: The resource is being provisioned \
 * **Updating**: The resource is being updated \
 * **Deleting**: The resource is being deleted \
 * **Accepted**: The resource create request has been accepted
 */
export type ProvisioningState = string;

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

/** The type used for update operations of the Catalog. */
export interface CatalogUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function catalogUpdateSerializer(item: CatalogUpdate): any {
  return { tags: item["tags"] };
}

/** The response of a Catalog list operation. */
export interface _CatalogListResult {
  /** The Catalog items on this page */
  value: Catalog[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _catalogListResultDeserializer(item: any): _CatalogListResult {
  return {
    value: catalogArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function catalogArraySerializer(result: Array<Catalog>): any[] {
  return result.map((item) => {
    return catalogSerializer(item);
  });
}

export function catalogArrayDeserializer(result: Array<Catalog>): any[] {
  return result.map((item) => {
    return catalogDeserializer(item);
  });
}

/** Response to the action call for count devices in a catalog. */
export interface CountDevicesResponse extends CountElementsResponse {}

export function countDevicesResponseDeserializer(item: any): CountDevicesResponse {
  return {
    value: item["value"],
  };
}

/** Response of the count for elements. */
export interface CountElementsResponse {
  /** Number of children resources in parent resource. */
  value: number;
}

export function countElementsResponseDeserializer(item: any): CountElementsResponse {
  return {
    value: item["value"],
  };
}

/** The response of a Deployment list operation. */
export interface _DeploymentListResult {
  /** The Deployment items on this page */
  value: Deployment[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deploymentListResultDeserializer(item: any): _DeploymentListResult {
  return {
    value: deploymentArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deploymentArraySerializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentSerializer(item);
  });
}

export function deploymentArrayDeserializer(result: Array<Deployment>): any[] {
  return result.map((item) => {
    return deploymentDeserializer(item);
  });
}

/** A deployment resource belonging to a device group resource. */
export interface Deployment extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeploymentProperties;
}

export function deploymentSerializer(item: Deployment): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesSerializer(item["properties"]),
  };
}

export function deploymentDeserializer(item: any): Deployment {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deploymentPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of deployment */
export interface DeploymentProperties {
  /** Deployment ID */
  deploymentId?: string;
  /** Images deployed */
  deployedImages?: Image[];
  /** Deployment date UTC */
  readonly deploymentDateUtc?: Date;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function deploymentPropertiesSerializer(item: DeploymentProperties): any {
  return {
    deploymentId: item["deploymentId"],
    deployedImages: !item["deployedImages"]
      ? item["deployedImages"]
      : imageArraySerializer(item["deployedImages"]),
  };
}

export function deploymentPropertiesDeserializer(item: any): DeploymentProperties {
  return {
    deploymentId: item["deploymentId"],
    deployedImages: !item["deployedImages"]
      ? item["deployedImages"]
      : imageArrayDeserializer(item["deployedImages"]),
    deploymentDateUtc: !item["deploymentDateUtc"]
      ? item["deploymentDateUtc"]
      : new Date(item["deploymentDateUtc"]),
    provisioningState: item["provisioningState"],
  };
}

export function imageArraySerializer(result: Array<Image>): any[] {
  return result.map((item) => {
    return imageSerializer(item);
  });
}

export function imageArrayDeserializer(result: Array<Image>): any[] {
  return result.map((item) => {
    return imageDeserializer(item);
  });
}

/** An image resource belonging to a catalog resource. */
export interface Image extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ImageProperties;
}

export function imageSerializer(item: Image): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesSerializer(item["properties"]),
  };
}

export function imageDeserializer(item: any): Image {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : imagePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of image */
export interface ImageProperties {
  /** Image as a UTF-8 encoded base 64 string on image create. This field contains the image URI on image reads. */
  image?: string;
  /** Image ID */
  imageId?: string;
  /** Image name */
  readonly imageName?: string;
  /** Regional data boundary for an image */
  regionalDataBoundary?: RegionalDataBoundary;
  /** Location the image */
  readonly uri?: string;
  /** The image description. */
  readonly description?: string;
  /** The image component id. */
  readonly componentId?: string;
  /** The image type. */
  readonly imageType?: ImageType;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function imagePropertiesSerializer(item: ImageProperties): any {
  return {
    image: item["image"],
    imageId: item["imageId"],
    regionalDataBoundary: item["regionalDataBoundary"],
  };
}

export function imagePropertiesDeserializer(item: any): ImageProperties {
  return {
    image: item["image"],
    imageId: item["imageId"],
    imageName: item["imageName"],
    regionalDataBoundary: item["regionalDataBoundary"],
    uri: item["uri"],
    description: item["description"],
    componentId: item["componentId"],
    imageType: item["imageType"],
    provisioningState: item["provisioningState"],
  };
}

/** Regional data boundary values. */
export enum KnownRegionalDataBoundary {
  /** No data boundary */
  None = "None",
  /** EU data boundary */
  EU = "EU",
}

/**
 * Regional data boundary values. \
 * {@link KnownRegionalDataBoundary} can be used interchangeably with RegionalDataBoundary,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No data boundary \
 * **EU**: EU data boundary
 */
export type RegionalDataBoundary = string;

/** Image type values. */
export enum KnownImageType {
  /** Invalid image. */
  InvalidImageType = "InvalidImageType",
  /** One Bl image type */
  OneBl = "OneBl",
  /** Pluton image type */
  PlutonRuntime = "PlutonRuntime",
  /** Wifi firmware image type */
  WifiFirmware = "WifiFirmware",
  /** Security monitor image type */
  SecurityMonitor = "SecurityMonitor",
  /** Normal world loader image type */
  NormalWorldLoader = "NormalWorldLoader",
  /** Normal world dtb image type */
  NormalWorldDtb = "NormalWorldDtb",
  /** Normal world kernel image type */
  NormalWorldKernel = "NormalWorldKernel",
  /** Root FS image type */
  RootFs = "RootFs",
  /** Services image type */
  Services = "Services",
  /** Applications image type */
  Applications = "Applications",
  /** FW config image type */
  FwConfig = "FwConfig",
  /** Boot manifest image type */
  BootManifest = "BootManifest",
  /** Nwfs image type */
  Nwfs = "Nwfs",
  /** Trusted key store image type */
  TrustedKeystore = "TrustedKeystore",
  /** Policy image type */
  Policy = "Policy",
  /** Customer board config image type */
  CustomerBoardConfig = "CustomerBoardConfig",
  /** Update certificate store image type */
  UpdateCertStore = "UpdateCertStore",
  /** Base system update manifest image type */
  BaseSystemUpdateManifest = "BaseSystemUpdateManifest",
  /** Firmware update manifest image type */
  FirmwareUpdateManifest = "FirmwareUpdateManifest",
  /** Customer update manifest image type */
  CustomerUpdateManifest = "CustomerUpdateManifest",
  /** Recovery manifest image type */
  RecoveryManifest = "RecoveryManifest",
  /** Manifest set image type */
  ManifestSet = "ManifestSet",
  /** Other image type */
  Other = "Other",
}

/**
 * Image type values. \
 * {@link KnownImageType} can be used interchangeably with ImageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InvalidImageType**: Invalid image. \
 * **OneBl**: One Bl image type \
 * **PlutonRuntime**: Pluton image type \
 * **WifiFirmware**: Wifi firmware image type \
 * **SecurityMonitor**: Security monitor image type \
 * **NormalWorldLoader**: Normal world loader image type \
 * **NormalWorldDtb**: Normal world dtb image type \
 * **NormalWorldKernel**: Normal world kernel image type \
 * **RootFs**: Root FS image type \
 * **Services**: Services image type \
 * **Applications**: Applications image type \
 * **FwConfig**: FW config image type \
 * **BootManifest**: Boot manifest image type \
 * **Nwfs**: Nwfs image type \
 * **TrustedKeystore**: Trusted key store image type \
 * **Policy**: Policy image type \
 * **CustomerBoardConfig**: Customer board config image type \
 * **UpdateCertStore**: Update certificate store image type \
 * **BaseSystemUpdateManifest**: Base system update manifest image type \
 * **FirmwareUpdateManifest**: Firmware update manifest image type \
 * **CustomerUpdateManifest**: Customer update manifest image type \
 * **RecoveryManifest**: Recovery manifest image type \
 * **ManifestSet**: Manifest set image type \
 * **Other**: Other image type
 */
export type ImageType = string;

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

/** Request of the action to list device groups for a catalog. */
export interface ListDeviceGroupsRequest {
  /** Device Group name. */
  deviceGroupName?: string;
}

export function listDeviceGroupsRequestSerializer(item: ListDeviceGroupsRequest): any {
  return { deviceGroupName: item["deviceGroupName"] };
}

/** The response of a DeviceGroup list operation. */
export interface _DeviceGroupListResult {
  /** The DeviceGroup items on this page */
  value: DeviceGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceGroupListResultDeserializer(item: any): _DeviceGroupListResult {
  return {
    value: deviceGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceGroupArraySerializer(result: Array<DeviceGroup>): any[] {
  return result.map((item) => {
    return deviceGroupSerializer(item);
  });
}

export function deviceGroupArrayDeserializer(result: Array<DeviceGroup>): any[] {
  return result.map((item) => {
    return deviceGroupDeserializer(item);
  });
}

/** A device group resource belonging to a product resource. */
export interface DeviceGroup extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeviceGroupProperties;
}

export function deviceGroupSerializer(item: DeviceGroup): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : deviceGroupPropertiesSerializer(item["properties"]),
  };
}

export function deviceGroupDeserializer(item: any): DeviceGroup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : deviceGroupPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of deviceGroup */
export interface DeviceGroupProperties {
  /** Description of the device group. */
  description?: string;
  /** Operating system feed type of the device group. */
  osFeedType?: OSFeedType;
  /** Update policy of the device group. */
  updatePolicy?: UpdatePolicy;
  /** Flag to define if the user allows for crash dump collection. */
  allowCrashDumpsCollection?: AllowCrashDumpCollection;
  /** Regional data boundary for the device group. */
  regionalDataBoundary?: RegionalDataBoundary;
  /** Deployment status for the device group. */
  readonly hasDeployment?: boolean;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function deviceGroupPropertiesSerializer(item: DeviceGroupProperties): any {
  return {
    description: item["description"],
    osFeedType: item["osFeedType"],
    updatePolicy: item["updatePolicy"],
    allowCrashDumpsCollection: item["allowCrashDumpsCollection"],
    regionalDataBoundary: item["regionalDataBoundary"],
  };
}

export function deviceGroupPropertiesDeserializer(item: any): DeviceGroupProperties {
  return {
    description: item["description"],
    osFeedType: item["osFeedType"],
    updatePolicy: item["updatePolicy"],
    allowCrashDumpsCollection: item["allowCrashDumpsCollection"],
    regionalDataBoundary: item["regionalDataBoundary"],
    hasDeployment: item["hasDeployment"],
    provisioningState: item["provisioningState"],
  };
}

/** OS feed type values. */
export enum KnownOSFeedType {
  /** Retail OS feed type. */
  Retail = "Retail",
  /** Retail evaluation OS feed type. */
  RetailEval = "RetailEval",
}

/**
 * OS feed type values. \
 * {@link KnownOSFeedType} can be used interchangeably with OSFeedType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Retail**: Retail OS feed type. \
 * **RetailEval**: Retail evaluation OS feed type.
 */
export type OSFeedType = string;

/** Update policy values. */
export enum KnownUpdatePolicy {
  /** Update all policy. */
  UpdateAll = "UpdateAll",
  /** No update for 3rd party app policy. */
  No3RdPartyAppUpdates = "No3rdPartyAppUpdates",
}

/**
 * Update policy values. \
 * {@link KnownUpdatePolicy} can be used interchangeably with UpdatePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **UpdateAll**: Update all policy. \
 * **No3rdPartyAppUpdates**: No update for 3rd party app policy.
 */
export type UpdatePolicy = string;

/** Allow crash dumps values. */
export enum KnownAllowCrashDumpCollection {
  /** Crash dump collection enabled */
  Enabled = "Enabled",
  /** Crash dump collection disabled */
  Disabled = "Disabled",
}

/**
 * Allow crash dumps values. \
 * {@link KnownAllowCrashDumpCollection} can be used interchangeably with AllowCrashDumpCollection,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Crash dump collection enabled \
 * **Disabled**: Crash dump collection disabled
 */
export type AllowCrashDumpCollection = string;

/** Paged collection of DeviceInsight items */
export interface _PagedDeviceInsight {
  /** The DeviceInsight items on this page */
  value: DeviceInsight[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _pagedDeviceInsightDeserializer(item: any): _PagedDeviceInsight {
  return {
    value: deviceInsightArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceInsightArrayDeserializer(result: Array<DeviceInsight>): any[] {
  return result.map((item) => {
    return deviceInsightDeserializer(item);
  });
}

/** Device insight report. */
export interface DeviceInsight {
  /** Device ID */
  deviceId: string;
  /** Event description */
  description: string;
  /** Event start timestamp */
  startTimestampUtc: Date;
  /** Event end timestamp */
  endTimestampUtc: Date;
  /** Event category */
  eventCategory: string;
  /** Event class */
  eventClass: string;
  /** Event type */
  eventType: string;
  /** Event count */
  eventCount: number;
}

export function deviceInsightDeserializer(item: any): DeviceInsight {
  return {
    deviceId: item["deviceId"],
    description: item["description"],
    startTimestampUtc: new Date(item["startTimestampUtc"]),
    endTimestampUtc: new Date(item["endTimestampUtc"]),
    eventCategory: item["eventCategory"],
    eventClass: item["eventClass"],
    eventType: item["eventType"],
    eventCount: item["eventCount"],
  };
}

/** The response of a Device list operation. */
export interface _DeviceListResult {
  /** The Device items on this page */
  value: Device[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _deviceListResultDeserializer(item: any): _DeviceListResult {
  return {
    value: deviceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deviceArraySerializer(result: Array<Device>): any[] {
  return result.map((item) => {
    return deviceSerializer(item);
  });
}

export function deviceArrayDeserializer(result: Array<Device>): any[] {
  return result.map((item) => {
    return deviceDeserializer(item);
  });
}

/** A device resource belonging to a device group resource. */
export interface Device extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: DeviceProperties;
}

export function deviceSerializer(item: Device): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : devicePropertiesSerializer(item["properties"]),
  };
}

export function deviceDeserializer(item: any): Device {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : devicePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of device */
export interface DeviceProperties {
  /** Device ID */
  deviceId?: string;
  /** SKU of the chip */
  readonly chipSku?: string;
  /** OS version available for installation when update requested */
  readonly lastAvailableOsVersion?: string;
  /** OS version running on device when update requested */
  readonly lastInstalledOsVersion?: string;
  /** Time when update requested and new OS version available */
  readonly lastOsUpdateUtc?: Date;
  /** Time when update was last requested */
  readonly lastUpdateRequestUtc?: Date;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function devicePropertiesSerializer(item: DeviceProperties): any {
  return { deviceId: item["deviceId"] };
}

export function devicePropertiesDeserializer(item: any): DeviceProperties {
  return {
    deviceId: item["deviceId"],
    chipSku: item["chipSku"],
    lastAvailableOsVersion: item["lastAvailableOsVersion"],
    lastInstalledOsVersion: item["lastInstalledOsVersion"],
    lastOsUpdateUtc: !item["lastOsUpdateUtc"]
      ? item["lastOsUpdateUtc"]
      : new Date(item["lastOsUpdateUtc"]),
    lastUpdateRequestUtc: !item["lastUpdateRequestUtc"]
      ? item["lastUpdateRequestUtc"]
      : new Date(item["lastUpdateRequestUtc"]),
    provisioningState: item["provisioningState"],
  };
}

/** A certificate resource belonging to a catalog resource. */
export interface Certificate extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: CertificateProperties;
}

export function certificateDeserializer(item: any): Certificate {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : certificatePropertiesDeserializer(item["properties"]),
  };
}

/** The properties of certificate */
export interface CertificateProperties {
  /** The certificate as a UTF-8 encoded base 64 string. */
  readonly certificate?: string;
  /** The certificate status. */
  readonly status?: CertificateStatus;
  /** The certificate subject. */
  readonly subject?: string;
  /** The certificate thumbprint. */
  readonly thumbprint?: string;
  /** The certificate expiry date. */
  readonly expiryUtc?: Date;
  /** The certificate not before date. */
  readonly notBeforeUtc?: Date;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function certificatePropertiesDeserializer(item: any): CertificateProperties {
  return {
    certificate: item["certificate"],
    status: item["status"],
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    expiryUtc: !item["expiryUtc"] ? item["expiryUtc"] : new Date(item["expiryUtc"]),
    notBeforeUtc: !item["notBeforeUtc"] ? item["notBeforeUtc"] : new Date(item["notBeforeUtc"]),
    provisioningState: item["provisioningState"],
  };
}

/** Certificate status values. */
export enum KnownCertificateStatus {
  /** Certificate is active */
  Active = "Active",
  /** Certificate is inactive */
  Inactive = "Inactive",
  /** Certificate has expired */
  Expired = "Expired",
  /** Certificate has been revoked */
  Revoked = "Revoked",
}

/**
 * Certificate status values. \
 * {@link KnownCertificateStatus} can be used interchangeably with CertificateStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Active**: Certificate is active \
 * **Inactive**: Certificate is inactive \
 * **Expired**: Certificate has expired \
 * **Revoked**: Certificate has been revoked
 */
export type CertificateStatus = string;

/** The response of a Certificate list operation. */
export interface _CertificateListResult {
  /** The Certificate items on this page */
  value: Certificate[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _certificateListResultDeserializer(item: any): _CertificateListResult {
  return {
    value: certificateArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateArrayDeserializer(result: Array<Certificate>): any[] {
  return result.map((item) => {
    return certificateDeserializer(item);
  });
}

/** The certificate chain response. */
export interface CertificateChainResponse {
  /** The certificate chain. */
  readonly certificateChain?: string;
}

export function certificateChainResponseDeserializer(item: any): CertificateChainResponse {
  return {
    certificateChain: item["certificateChain"],
  };
}

/** Request for the proof of possession nonce */
export interface ProofOfPossessionNonceRequest {
  /** The proof of possession nonce */
  proofOfPossessionNonce: string;
}

export function proofOfPossessionNonceRequestSerializer(item: ProofOfPossessionNonceRequest): any {
  return { proofOfPossessionNonce: item["proofOfPossessionNonce"] };
}

/** Result of the action to generate a proof of possession nonce */
export interface ProofOfPossessionNonceResponse extends CertificateProperties {}

export function proofOfPossessionNonceResponseDeserializer(
  item: any,
): ProofOfPossessionNonceResponse {
  return {
    certificate: item["certificate"],
    status: item["status"],
    subject: item["subject"],
    thumbprint: item["thumbprint"],
    expiryUtc: !item["expiryUtc"] ? item["expiryUtc"] : new Date(item["expiryUtc"]),
    notBeforeUtc: !item["notBeforeUtc"] ? item["notBeforeUtc"] : new Date(item["notBeforeUtc"]),
    provisioningState: item["provisioningState"],
  };
}

/** The response of a Image list operation. */
export interface _ImageListResult {
  /** The Image items on this page */
  value: Image[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _imageListResultDeserializer(item: any): _ImageListResult {
  return {
    value: imageArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A product resource belonging to a catalog resource. */
export interface Product extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: ProductProperties;
}

export function productSerializer(item: Product): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : productPropertiesSerializer(item["properties"]),
  };
}

export function productDeserializer(item: any): Product {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : productPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of product */
export interface ProductProperties {
  /** Description of the product */
  description?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

export function productPropertiesSerializer(item: ProductProperties): any {
  return { description: item["description"] };
}

export function productPropertiesDeserializer(item: any): ProductProperties {
  return {
    description: item["description"],
    provisioningState: item["provisioningState"],
  };
}

/** The type used for update operations of the Product. */
export interface ProductUpdate {
  /** Description of the product */
  description?: string;
}

export function productUpdateSerializer(item: ProductUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["description"])
      ? undefined
      : _productUpdatePropertiesSerializer(item),
  };
}

/** The updatable properties of the Product. */
export interface ProductUpdateProperties {
  /** Description of the product */
  description?: string;
}

export function productUpdatePropertiesSerializer(item: ProductUpdateProperties): any {
  return { description: item["description"] };
}

/** The response of a Product list operation. */
export interface _ProductListResult {
  /** The Product items on this page */
  value: Product[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _productListResultDeserializer(item: any): _ProductListResult {
  return {
    value: productArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function productArraySerializer(result: Array<Product>): any[] {
  return result.map((item) => {
    return productSerializer(item);
  });
}

export function productArrayDeserializer(result: Array<Product>): any[] {
  return result.map((item) => {
    return productDeserializer(item);
  });
}

/** The type used for update operations of the DeviceGroup. */
export interface DeviceGroupUpdate {
  /** Description of the device group. */
  description?: string;
  /** Operating system feed type of the device group. */
  osFeedType?: OSFeedType;
  /** Update policy of the device group. */
  updatePolicy?: UpdatePolicy;
  /** Flag to define if the user allows for crash dump collection. */
  allowCrashDumpsCollection?: AllowCrashDumpCollection;
  /** Regional data boundary for the device group. */
  regionalDataBoundary?: RegionalDataBoundary;
}

export function deviceGroupUpdateSerializer(item: DeviceGroupUpdate): any {
  return {
    properties: areAllPropsUndefined(item, [
      "description",
      "osFeedType",
      "updatePolicy",
      "allowCrashDumpsCollection",
      "regionalDataBoundary",
    ])
      ? undefined
      : _deviceGroupUpdatePropertiesSerializer(item),
  };
}

/** The updatable properties of the DeviceGroup. */
export interface DeviceGroupUpdateProperties {
  /** Description of the device group. */
  description?: string;
  /** Operating system feed type of the device group. */
  osFeedType?: OSFeedType;
  /** Update policy of the device group. */
  updatePolicy?: UpdatePolicy;
  /** Flag to define if the user allows for crash dump collection. */
  allowCrashDumpsCollection?: AllowCrashDumpCollection;
  /** Regional data boundary for the device group. */
  regionalDataBoundary?: RegionalDataBoundary;
}

export function deviceGroupUpdatePropertiesSerializer(item: DeviceGroupUpdateProperties): any {
  return {
    description: item["description"],
    osFeedType: item["osFeedType"],
    updatePolicy: item["updatePolicy"],
    allowCrashDumpsCollection: item["allowCrashDumpsCollection"],
    regionalDataBoundary: item["regionalDataBoundary"],
  };
}

/** Request to the action call to bulk claim devices. */
export interface ClaimDevicesRequest {
  /** Device identifiers of the devices to be claimed. */
  deviceIdentifiers: string[];
}

export function claimDevicesRequestSerializer(item: ClaimDevicesRequest): any {
  return {
    deviceIdentifiers: item["deviceIdentifiers"].map((p: any) => {
      return p;
    }),
  };
}

/** The type used for update operations of the Device. */
export interface DeviceUpdate {
  /** Device group id */
  deviceGroupId?: string;
}

export function deviceUpdateSerializer(item: DeviceUpdate): any {
  return {
    properties: areAllPropsUndefined(item, ["deviceGroupId"])
      ? undefined
      : _deviceUpdatePropertiesSerializer(item),
  };
}

/** The updatable properties of the Device. */
export interface DeviceUpdateProperties {
  /** Device group id */
  deviceGroupId?: string;
}

export function deviceUpdatePropertiesSerializer(item: DeviceUpdateProperties): any {
  return { deviceGroupId: item["deviceGroupId"] };
}

/** Request of the action to create a signed device capability image */
export interface GenerateCapabilityImageRequest {
  /** List of capabilities to create */
  capabilities: CapabilityType[];
}

export function generateCapabilityImageRequestSerializer(
  item: GenerateCapabilityImageRequest,
): any {
  return {
    capabilities: item["capabilities"].map((p: any) => {
      return p;
    }),
  };
}

/** Capability image type */
export enum KnownCapabilityType {
  /** Application development capability */
  ApplicationDevelopment = "ApplicationDevelopment",
  /** Field servicing capability */
  FieldServicing = "FieldServicing",
}

/**
 * Capability image type \
 * {@link KnownCapabilityType} can be used interchangeably with CapabilityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ApplicationDevelopment**: Application development capability \
 * **FieldServicing**: Field servicing capability
 */
export type CapabilityType = string;

/** Signed device capability image response */
export interface SignedCapabilityImageResponse {
  /** The signed device capability image as a UTF-8 encoded base 64 string. */
  readonly image?: string;
}

export function signedCapabilityImageResponseDeserializer(
  item: any,
): SignedCapabilityImageResponse {
  return {
    image: item["image"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2024-04-01 API version. */
  V20240401 = "2024-04-01",
}

export function _productUpdatePropertiesSerializer(item: ProductUpdate): any {
  return { description: item["description"] };
}

export function _deviceGroupUpdatePropertiesSerializer(item: DeviceGroupUpdate): any {
  return {
    description: item["description"],
    osFeedType: item["osFeedType"],
    updatePolicy: item["updatePolicy"],
    allowCrashDumpsCollection: item["allowCrashDumpsCollection"],
    regionalDataBoundary: item["regionalDataBoundary"],
  };
}

export function _deviceUpdatePropertiesSerializer(item: DeviceUpdate): any {
  return { deviceGroupId: item["deviceGroupId"] };
}
