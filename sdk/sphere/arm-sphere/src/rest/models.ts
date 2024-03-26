// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** An Azure Sphere catalog */
export interface Catalog extends TrackedResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: CatalogProperties;
}

/** Catalog properties */
export interface CatalogProperties {}

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBase extends ArmResource {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResource extends ArmResourceBase {}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemData {}

/** Base class used for type definitions */
export interface ArmResourceBase {}

/** The base proxy resource. */
export interface ProxyResourceBase extends ArmResource {}

/** The private endpoint connection resource */
export interface PrivateEndpointConnection extends ProxyResourceBase {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionProperties;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionProperties {
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
  /**
   * The provisioning state of the private endpoint connection resource.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Deleting"
   */
  provisioningState?: string;
}

/** The private endpoint resource */
export interface PrivateEndpoint {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionState {
  /**
   * Indicates whether the connection has been Approved/Rejected/Removed by the owner of the service.
   *
   * Possible values: "Pending", "Approved", "Rejected"
   */
  status?: string;
  /** The reason for approval/rejection of the connection. */
  description?: string;
  /** A message indicating if changes on the service provider require any updates on the consumer. */
  actionsRequired?: string;
}

export interface PrivateLinkResource extends ProxyResourceBase {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourceProperties;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourceProperties {
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** An product resource belonging to a catalog resource. */
export interface Product extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: ProductProperties;
}

/** The properties of product */
export interface ProductProperties {
  /** Description of the product */
  description?: string;
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
}

/** An device resource belonging to a device group resource. */
export interface Device extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: DeviceProperties;
}

/** The properties of device */
export interface DeviceProperties {
  /** Device ID */
  deviceId?: string;
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
  /** Regional data boundary for an image */
  regionalDataBoundary?: RegionalDataBoundary;
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
  deployedImages?: Array<Image>;
}

/** An certificate resource belonging to a catalog resource. */
export interface Certificate extends ProxyResourceBase {
  /** The resource-specific properties for this resource. */
  properties?: CertificateProperties;
}

/** The properties of certificate */
export interface CertificateProperties {}

/** Result of the action to generate a proof of possession nonce */
export interface ProofOfPossessionNonceResponse extends CertificateProperties {}

/** The base extension resource. */
export interface ExtensionResourceBase extends ArmResource {}

/** The type used for update operations of the Catalog. */
export interface CatalogUpdate {
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Request of the action to list device groups for a catalog. */
export interface ListDeviceGroupsRequest {
  /** Device Group name. */
  deviceGroupName?: string;
}

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

/** Request for the proof of possession nonce */
export interface ProofOfPossessionNonceRequest {
  /** The proof of possession nonce */
  proofOfPossessionNonce: string;
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

/** The type used for update operations of the Product. */
export interface ProductUpdate {
  properties?: ProductUpdateProperties;
}

/** The updatable properties of the Product. */
export interface ProductUpdateProperties {
  /** Description of the product */
  description?: string;
}

/** Alias for ProvisioningState */
export type ProvisioningState =
  | string
  | string
  | "Provisioning"
  | "Updating"
  | "Deleting"
  | "Accepted";
/** Alias for OSFeedType */
export type OSFeedType = string | "Retail" | "RetailEval";
/** Alias for UpdatePolicy */
export type UpdatePolicy = string | "UpdateAll" | "No3rdPartyAppUpdates";
/** Alias for AllowCrashDumpCollection */
export type AllowCrashDumpCollection = string | "Enabled" | "Disabled";
/** Alias for RegionalDataBoundary */
export type RegionalDataBoundary = string | "None" | "EU";
/** Alias for ImageType */
export type ImageType =
  | string
  | "InvalidImageType"
  | "OneBl"
  | "PlutonRuntime"
  | "WifiFirmware"
  | "SecurityMonitor"
  | "NormalWorldLoader"
  | "NormalWorldDtb"
  | "NormalWorldKernel"
  | "RootFs"
  | "Services"
  | "Applications"
  | "FwConfig"
  | "BootManifest"
  | "Nwfs"
  | "TrustedKeystore"
  | "Policy"
  | "CustomerBoardConfig"
  | "UpdateCertStore"
  | "BaseSystemUpdateManifest"
  | "FirmwareUpdateManifest"
  | "CustomerUpdateManifest"
  | "RecoveryManifest"
  | "ManifestSet"
  | "Other";
/** Alias for CertificateStatus */
export type CertificateStatus =
  | string
  | "Active"
  | "Inactive"
  | "Expired"
  | "Revoked";
/** Alias for CapabilityType */
export type CapabilityType =
  | string
  | "ApplicationDevelopment"
  | "FieldServicing";
