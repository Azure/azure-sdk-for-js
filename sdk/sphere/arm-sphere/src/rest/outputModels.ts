// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface OperationOutput {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  display?: OperationDisplayOutput;
  /**
   * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system"
   *
   * Possible values: "user", "system", "user,system"
   */
  readonly origin?: string;
  /**
   * Enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs.
   *
   * Possible values: "Internal"
   */
  actionType?: string;
}

/** Localized display information for and operation. */
export interface OperationDisplayOutput {
  /** The localized friendly form of the resource provider name, e.g. "Microsoft Monitoring Insights" or "Microsoft Compute". */
  provider?: string;
  /** The localized friendly name of the resource type related to this operation. E.g. "Virtual Machines" or "Job Schedule Collections". */
  resource?: string;
  /** The concise, localized friendly name for the operation; suitable for dropdowns. E.g. "Create or Update Virtual Machine", "Restart Virtual Machine". */
  operation?: string;
  /** The short, localized friendly description of the operation; suitable for tool tips and detailed views. */
  description?: string;
}

/** Common error response for all Azure Resource Manager APIs to return error details for failed operations. */
export interface ErrorResponseOutput {
  /** The error object. */
  error?: ErrorDetailOutput;
}

/** The error detail. */
export interface ErrorDetailOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The error target. */
  readonly target?: string;
  /** The error details. */
  readonly details?: Array<ErrorDetailOutput>;
  /** The error additional info. */
  readonly additionalInfo?: Array<ErrorAdditionalInfoOutput>;
}

/** The resource management error additional info. */
export interface ErrorAdditionalInfoOutput {
  /** The additional info type. */
  readonly type?: string;
  /** The additional info. */
  readonly info?: Record<string, any>;
}

/** An Azure Sphere catalog */
export interface CatalogOutput extends TrackedResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: CatalogPropertiesOutput;
}

/** Catalog properties */
export interface CatalogPropertiesOutput {
  /** The Azure Sphere tenant ID associated with the catalog. */
  readonly tenantId?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource */
export interface TrackedResourceBaseOutput extends ArmResourceOutput {
  /** The geo-location where the resource lives */
  location: string;
  /** Resource tags. */
  tags?: Record<string, string>;
}

/** Common properties for all Azure Resource Manager resources. */
export interface ArmResourceOutput extends ArmResourceBaseOutput {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  readonly createdBy?: string;
  /**
   * The type of identity that created the resource.
   *
   * Possible values: "User", "Application", "ManagedIdentity", "Key"
   */
  readonly createdByType?: string;
  /** The type of identity that created the resource. */
  readonly createdAt?: string;
  /** The identity that last modified the resource. */
  readonly lastModifiedBy?: string;
  /**
   * The type of identity that last modified the resource.
   *
   * Possible values: "User", "Application", "ManagedIdentity", "Key"
   */
  readonly lastModifiedByType?: string;
  /** The timestamp of resource last modification (UTC) */
  readonly lastModifiedAt?: string;
}

/** Base class used for type definitions */
export interface ArmResourceBaseOutput {}

/** The base proxy resource. */
export interface ProxyResourceBaseOutput extends ArmResourceOutput {}

/** The private endpoint connection resource */
export interface PrivateEndpointConnectionOutput
  extends ProxyResourceBaseOutput {
  /** The private endpoint connection properties */
  properties?: PrivateEndpointConnectionPropertiesOutput;
}

/** Properties of he private endpoint connection resource */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The group identifiers for the private endpoint resource */
  readonly groupIds?: string[];
  /** The private endpoint resource */
  privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateOutput;
  /**
   * The provisioning state of the private endpoint connection resource.
   *
   * Possible values: "Succeeded", "Failed", "Canceled", "Creating", "Deleting"
   */
  provisioningState?: string;
}

/** The private endpoint resource */
export interface PrivateEndpointOutput {
  /** The resource identifier for private endpoint */
  id?: string;
}

/** A collection of information about the state of the connection between service consumer and provider. */
export interface PrivateLinkServiceConnectionStateOutput {
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

export interface PrivateLinkResourceOutput extends ProxyResourceBaseOutput {
  /** Properties of the private link resource. */
  properties?: PrivateLinkResourcePropertiesOutput;
}

/** Properties of a private link resource. */
export interface PrivateLinkResourcePropertiesOutput {
  /** The private link resource group id. */
  readonly groupId?: string;
  /** The private link resource required member names. */
  readonly requiredMembers?: string[];
  /** The private link resource private link DNS zone name. */
  requiredZoneNames?: string[];
}

/** An product resource belonging to a catalog resource. */
export interface ProductOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: ProductPropertiesOutput;
}

/** The properties of product */
export interface ProductPropertiesOutput {
  /** Description of the product */
  description?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** An device group resource belonging to a product resource. */
export interface DeviceGroupOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: DeviceGroupPropertiesOutput;
}

/** The properties of deviceGroup */
export interface DeviceGroupPropertiesOutput {
  /** Description of the device group. */
  description?: string;
  /** Operating system feed type of the device group. */
  osFeedType?: OSFeedTypeOutput;
  /** Update policy of the device group. */
  updatePolicy?: UpdatePolicyOutput;
  /** Flag to define if the user allows for crash dump collection. */
  allowCrashDumpsCollection?: AllowCrashDumpCollectionOutput;
  /** Regional data boundary for the device group. */
  regionalDataBoundary?: RegionalDataBoundaryOutput;
  /** Deployment status for the device group. */
  readonly hasDeployment?: boolean;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** An device resource belonging to a device group resource. */
export interface DeviceOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: DevicePropertiesOutput;
}

/** The properties of device */
export interface DevicePropertiesOutput {
  /** Device ID */
  deviceId?: string;
  /** SKU of the chip */
  readonly chipSku?: string;
  /** OS version available for installation when update requested */
  readonly lastAvailableOsVersion?: string;
  /** OS version running on device when update requested */
  readonly lastInstalledOsVersion?: string;
  /** Time when update requested and new OS version available */
  readonly lastOsUpdateUtc?: string;
  /** Time when update was last requested */
  readonly lastUpdateRequestUtc?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** An image resource belonging to a catalog resource. */
export interface ImageOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: ImagePropertiesOutput;
}

/** The properties of image */
export interface ImagePropertiesOutput {
  /** Image as a UTF-8 encoded base 64 string on image create. This field contains the image URI on image reads. */
  image?: string;
  /** Image ID */
  imageId?: string;
  /** Image name */
  readonly imageName?: string;
  /** Regional data boundary for an image */
  regionalDataBoundary?: RegionalDataBoundaryOutput;
  /** Location the image */
  readonly uri?: string;
  /** The image description. */
  readonly description?: string;
  /** The image component id. */
  readonly componentId?: string;
  /** The image type. */
  readonly imageType?: ImageTypeOutput;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** An deployment resource belonging to a device group resource. */
export interface DeploymentOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: DeploymentPropertiesOutput;
}

/** The properties of deployment */
export interface DeploymentPropertiesOutput {
  /** Deployment ID */
  deploymentId?: string;
  /** Images deployed */
  deployedImages?: Array<ImageOutput>;
  /** Deployment date UTC */
  readonly deploymentDateUtc?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** An certificate resource belonging to a catalog resource. */
export interface CertificateOutput extends ProxyResourceBaseOutput {
  /** The resource-specific properties for this resource. */
  properties?: CertificatePropertiesOutput;
}

/** The properties of certificate */
export interface CertificatePropertiesOutput {
  /** The certificate as a UTF-8 encoded base 64 string. */
  readonly certificate?: string;
  /** The certificate status. */
  readonly status?: CertificateStatusOutput;
  /** The certificate subject. */
  readonly subject?: string;
  /** The certificate thumbprint. */
  readonly thumbprint?: string;
  /** The certificate expiry date. */
  readonly expiryUtc?: string;
  /** The certificate not before date. */
  readonly notBeforeUtc?: string;
  /** The status of the last operation. */
  readonly provisioningState?: ProvisioningStateOutput;
}

/** Result of the action to generate a proof of possession nonce */
export interface ProofOfPossessionNonceResponseOutput
  extends CertificatePropertiesOutput {}

/** The base extension resource. */
export interface ExtensionResourceBaseOutput extends ArmResourceOutput {}

/** Response to the action call for count devices in a catalog (preview API). */
export interface CountDeviceResponseOutput
  extends CountElementsResponseOutput {}

/** Response of the count for elements. */
export interface CountElementsResponseOutput {
  /** Number of children resources in parent resource. */
  value: number;
}

/** Response to the action call for count devices in a catalog. */
export interface CountDevicesResponseOutput
  extends CountElementsResponseOutput {}

/** Device insight report. */
export interface DeviceInsightOutput {
  /** Device ID */
  deviceId: string;
  /** Event description */
  description: string;
  /** Event start timestamp */
  startTimestampUtc: string;
  /** Event end timestamp */
  endTimestampUtc: string;
  /** Event category */
  eventCategory: string;
  /** Event class */
  eventClass: string;
  /** Event type */
  eventType: string;
  /** Event count */
  eventCount: number;
}

/** The certificate chain response. */
export interface CertificateChainResponseOutput {
  /** The certificate chain. */
  readonly certificateChain?: string;
}

/** Signed device capability image response */
export interface SignedCapabilityImageResponseOutput {
  /** The signed device capability image as a UTF-8 encoded base 64 string. */
  readonly image?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export type PagedOperationOutput = Paged<OperationOutput>;
/** Alias for ProvisioningStateOutput */
export type ProvisioningStateOutput =
  | string
  | string
  | "Provisioning"
  | "Updating"
  | "Deleting"
  | "Accepted";
/** Alias for OSFeedTypeOutput */
export type OSFeedTypeOutput = string | "Retail" | "RetailEval";
/** Alias for UpdatePolicyOutput */
export type UpdatePolicyOutput = string | "UpdateAll" | "No3rdPartyAppUpdates";
/** Alias for AllowCrashDumpCollectionOutput */
export type AllowCrashDumpCollectionOutput = string | "Enabled" | "Disabled";
/** Alias for RegionalDataBoundaryOutput */
export type RegionalDataBoundaryOutput = string | "None" | "EU";
/** Alias for ImageTypeOutput */
export type ImageTypeOutput =
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
/** Alias for CertificateStatusOutput */
export type CertificateStatusOutput =
  | string
  | "Active"
  | "Inactive"
  | "Expired"
  | "Revoked";
/** The response of a Catalog list operation. */
export type CatalogListResultOutput = Paged<CatalogOutput>;
/** Paged collection of DeviceInsight items */
export type PagedDeviceInsightOutput = Paged<DeviceInsightOutput>;
/** The response of a Device list operation. */
export type DeviceListResultOutput = Paged<DeviceOutput>;
/** The response of a Deployment list operation. */
export type DeploymentListResultOutput = Paged<DeploymentOutput>;
/** The response of a DeviceGroup list operation. */
export type DeviceGroupListResultOutput = Paged<DeviceGroupOutput>;
/** The response of a Image list operation. */
export type ImageListResultOutput = Paged<ImageOutput>;
/** The response of a Certificate list operation. */
export type CertificateListResultOutput = Paged<CertificateOutput>;
/** The response of a Product list operation. */
export type ProductListResultOutput = Paged<ProductOutput>;
