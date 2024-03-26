// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The response of a Product list operation. */
export interface ProductListResult {
  /** The Product items on this page */
  value: Product[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** Base class used for type definitions */
export interface ArmResourceBase {}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResource extends ArmResourceBase {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemData;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /** The type of identity that created the resource. */
  readonly createdByType?: createdByType;
  /** The type of identity that created the resource. */
  readonly createdAt?: Date;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  readonly lastModifiedByType?: createdByType;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: Date;
}

/** The kind of entity that created the resource. */
/** "User", "Application", "ManagedIdentity", "Key" */
export type createdByType = string;

/** The base proxy resource. */
export interface ProxyResourceBase extends ArmResource {}

/** An product resource belonging to a catalog resource. */
export interface Product extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: ProductProperties;
}

/** The properties of product */
export interface ProductProperties {
  /** Description of the product */
  description?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

/** Provisioning state of resource. */
/** "Succeeded", "Failed", "Canceled", "Provisioning", "Updating", "Deleting", "Accepted" */
export type ProvisioningState = string;

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

/** The resource management error additional info. */
export interface ErrorAdditionalInfo {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** The provisioning state of a resource type. */
/** "Succeeded", "Failed", "Canceled" */
export type ResourceProvisioningState = string;

/** The type used for update operations of the Product. */
export interface ProductUpdate {
  properties?: ProductUpdateProperties;
}

/** The updatable properties of the Product. */
export interface ProductUpdateProperties {
  /** Description of the product */
  description?: string;
}

/** The response of a DeviceGroup list operation. */
export interface DeviceGroupListResult {
  /** The DeviceGroup items on this page */
  value: DeviceGroup[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** An device group resource belonging to a product resource. */
export interface DeviceGroup extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DeviceGroupProperties;
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

/** OS feed type values. */
/** "Retail", "RetailEval" */
export type OSFeedType = string;
/** Update policy values. */
/** "UpdateAll", "No3rdPartyAppUpdates" */
export type UpdatePolicy = string;
/** Allow crash dumps values. */
/** "Enabled", "Disabled" */
export type AllowCrashDumpCollection = string;
/** Regional data boundary values. */
/** "None", "EU" */
export type RegionalDataBoundary = string;

/** Response of the count for elements. */
export interface CountElementsResponse {
  /** Number of children resources in parent resource. */
  value: number;
}

/** Response to the action call for count devices in a catalog (preview API). */
export interface CountDeviceResponse extends CountElementsResponse {}

/** Response to the action call for count devices in a catalog. */
export interface CountDevicesResponse extends CountElementsResponse {}

/** An device resource belonging to a device group resource. */
export interface Device extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DeviceProperties;
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

/** The response of a Device list operation. */
export interface DeviceListResult {
  /** The Device items on this page */
  value: Device[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** The type used for update operations of the Device. */
export interface DeviceUpdate {
  properties?: DeviceUpdateProperties;
}

/** The updatable properties of the Device. */
export interface DeviceUpdateProperties {
  /** Device group id */
  deviceGroupId?: string;
}

/** Request of the action to create a signed device capability image */
export interface GenerateCapabilityImageRequest {
  /** List of capabilities to create */
  capabilities: CapabilityType[];
}

/** Capability image type */
/** "ApplicationDevelopment", "FieldServicing" */
export type CapabilityType = string;

/** Signed device capability image response */
export interface SignedCapabilityImageResponse {
  /** The signed device capability image as a UTF-8 encoded base 64 string. */
  readonly image?: string;
}

/** An deployment resource belonging to a device group resource. */
export interface Deployment extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DeploymentProperties;
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

/** An image resource belonging to a catalog resource. */
export interface Image extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: ImageProperties;
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

/** Image type values. */
/** "InvalidImageType", "OneBl", "PlutonRuntime", "WifiFirmware", "SecurityMonitor", "NormalWorldLoader", "NormalWorldDtb", "NormalWorldKernel", "RootFs", "Services", "Applications", "FwConfig", "BootManifest", "Nwfs", "TrustedKeystore", "Policy", "CustomerBoardConfig", "UpdateCertStore", "BaseSystemUpdateManifest", "FirmwareUpdateManifest", "CustomerUpdateManifest", "RecoveryManifest", "ManifestSet", "Other" */
export type ImageType = string;

/** The response of a Deployment list operation. */
export interface DeploymentListResult {
  /** The Deployment items on this page */
  value: Deployment[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** An certificate resource belonging to a catalog resource. */
export interface Certificate extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: CertificateProperties;
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

/** Certificate status values. */
/** "Active", "Inactive", "Expired", "Revoked" */
export type CertificateStatus = string;

/** The response of a Certificate list operation. */
export interface CertificateListResult {
  /** The Certificate items on this page */
  value: Certificate[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** The certificate chain response. */
export interface CertificateChainResponse {
  /** The certificate chain. */
  readonly certificateChain?: string;
}

/** Request for the proof of possession nonce */
export interface ProofOfPossessionNonceRequest {
  /** The proof of possession nonce */
  proofOfPossessionNonce: string;
}

/** Result of the action to generate a proof of possession nonce */
export interface ProofOfPossessionNonceResponse extends CertificateProperties {}

/** The type used for update operations of the DeviceGroup. */
export interface DeviceGroupUpdate {
  properties?: DeviceGroupUpdateProperties;
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

/** Request to the action call to bulk claim devices. */
export interface ClaimDevicesRequest {
  /** Device identifiers of the devices to be claimed. */
  deviceIdentifiers: string[];
}

/** The response of a Image list operation. */
export interface ImageListResult {
  /** The Image items on this page */
  value: Image[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBase extends ArmResource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** An Azure Sphere catalog */
export interface Catalog extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: CatalogProperties;
}

/** Catalog properties */
export interface CatalogProperties {
  /** The Azure Sphere tenant ID associated with the catalog. */
  readonly tenantId?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningState;
}

/** The type used for update operations of the Catalog. */
export interface CatalogUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** The response of a Catalog list operation. */
export interface CatalogListResult {
  /** The Catalog items on this page */
  value: Catalog[];
  /** The link to the next page of items */
  readonly nextLink?: string;
}

/** Request of the action to list device groups for a catalog. */
export interface ListDeviceGroupsRequest {
  /** Device Group name. */
  deviceGroupName?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface PagedOperation {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  readonly nextLink?: string;
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
  /** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
}

/** Localized display information for and operation. */
export interface OperationDisplay {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
/** "user", "system", "user,system" */
export type Origin = string;
/** Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
/** "Internal" */
export type ActionType = string;

/** Paged collection of DeviceInsight items */
export interface PagedDeviceInsight {
  /** The DeviceInsight items on this page */
  value: DeviceInsight[];
  /** The link to the next page of items */
  readonly nextLink?: string;
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
