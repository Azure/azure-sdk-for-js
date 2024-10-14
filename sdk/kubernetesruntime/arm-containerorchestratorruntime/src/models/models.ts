// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";

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

export function resourceSerializer(item: Resource) {
  return item as any;
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

/** Known values of {@link CreatedByType} that the service accepts. */
export enum KnownCreatedByType {
  /** User */
  User = "User",
  /** Application */
  Application = "Application",
  /** ManagedIdentity */
  ManagedIdentity = "ManagedIdentity",
  /** Key */
  Key = "Key",
}

/**
 * The kind of entity that created the resource. \
 * {@link KnownCreatedByType} can be used interchangeably with CreatedByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User** \
 * **Application** \
 * **ManagedIdentity** \
 * **Key**
 */
export type CreatedByType = string;

/** The base extension resource. */
export interface ExtensionResource extends Resource {}

export function extensionResourceSerializer(item: ExtensionResource) {
  return item as any;
}

/** A Service resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface ServiceResource extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: ServiceProperties;
}

export function serviceResourceSerializer(item: ServiceResource): Record<string, unknown> {
  return {
    properties: !item.properties ? item.properties : servicePropertiesSerializer(item.properties),
  };
}

/** Properties for the service resource */
export interface ServiceProperties {
  /** The object id of the service principal of the RP provisioned in the tenant */
  readonly rpObjectId?: string;
  /** Resource provision state */
  readonly provisioningState?: ProvisioningState;
}

export function servicePropertiesSerializer(item: ServiceProperties) {
  return item as any;
}

/** The response of a ServiceResource list operation. */
export interface _ServiceResourceListResult {
  /** The ServiceResource items on this page */
  value: ServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** A BgpPeer resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface BgpPeer extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: BgpPeerProperties;
}

export function bgpPeerSerializer(item: BgpPeer): Record<string, unknown> {
  return {
    properties: !item.properties ? item.properties : bgpPeerPropertiesSerializer(item.properties),
  };
}

/** Details of the BgpPeer. */
export interface BgpPeerProperties {
  /** My ASN */
  myAsn: number;
  /** Peer ASN */
  peerAsn: number;
  /** Peer Address */
  peerAddress: string;
  /** Resource provision state */
  readonly provisioningState?: ProvisioningState;
}

export function bgpPeerPropertiesSerializer(item: BgpPeerProperties): Record<string, unknown> {
  return {
    myAsn: item["myAsn"],
    peerAsn: item["peerAsn"],
    peerAddress: item["peerAddress"],
  };
}

/** The response of a BgpPeer list operation. */
export interface _BgpPeerListResult {
  /** The BgpPeer items on this page */
  value: BgpPeer[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** A LoadBalancer resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface LoadBalancer extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: LoadBalancerProperties;
}

export function loadBalancerSerializer(item: LoadBalancer): Record<string, unknown> {
  return {
    properties: !item.properties
      ? item.properties
      : loadBalancerPropertiesSerializer(item.properties),
  };
}

/** Details of the LoadBalancer. */
export interface LoadBalancerProperties {
  /** IP Range */
  addresses: string[];
  /** A dynamic label mapping to select related services. For instance, if you want to create a load balancer only for services with label "a=b", then please specify {"a": "b"} in the field. */
  serviceSelector?: Record<string, string>;
  /** Advertise Mode */
  advertiseMode: AdvertiseMode;
  /** The list of BGP peers it should advertise to. Null or empty means to advertise to all peers. */
  bgpPeers?: string[];
  /** Resource provision state */
  readonly provisioningState?: ProvisioningState;
}

export function loadBalancerPropertiesSerializer(
  item: LoadBalancerProperties,
): Record<string, unknown> {
  return {
    addresses: item["addresses"],
    serviceSelector: !item.serviceSelector
      ? item.serviceSelector
      : (serializeRecord(item.serviceSelector as any) as any),
    advertiseMode: item["advertiseMode"],
    bgpPeers: item["bgpPeers"],
  };
}

/** Known values of {@link AdvertiseMode} that the service accepts. */
export enum KnownAdvertiseMode {
  /** ARP */
  ARP = "ARP",
  /** BGP */
  BGP = "BGP",
  /** Both */
  Both = "Both",
}

/**
 * Enum of advertise mode \
 * {@link KnownAdvertiseMode} can be used interchangeably with AdvertiseMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ARP** \
 * **BGP** \
 * **Both**
 */
export type AdvertiseMode = string;

/** The response of a LoadBalancer list operation. */
export interface _LoadBalancerListResult {
  /** The LoadBalancer items on this page */
  value: LoadBalancer[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** A list of REST API operations supported by an Azure Resource Provider. It contains an URL link to get the next set of results. */
export interface _OperationListResult {
  /** The Operation items on this page */
  value: Operation[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Details of a REST API operation, returned from the Resource Provider Operations API */
export interface Operation {
  /** The name of the operation, as per Resource-Based Access Control (RBAC). Examples: "Microsoft.Compute/virtualMachines/write", "Microsoft.Compute/virtualMachines/capture/action" */
  readonly name?: string;
  /** Whether the operation applies to data-plane. This is "true" for data-plane operations and "false" for Azure Resource Manager/control-plane operations. */
  readonly isDataAction?: boolean;
  /** Localized display information for this particular operation. */
  readonly display?: OperationDisplay;
  /** The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" */
  readonly origin?: Origin;
  /** Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. */
  actionType?: ActionType;
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

/** Known values of {@link Origin} that the service accepts. */
export enum KnownOrigin {
  /** user */
  User = "user",
  /** system */
  System = "system",
  /** user,system */
  UserSystem = "user,system",
}

/**
 * The intended executor of the operation; as in Resource Based Access Control (RBAC) and audit logs UX. Default value is "user,system" \
 * {@link KnownOrigin} can be used interchangeably with Origin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **user** \
 * **system** \
 * **user,system**
 */
export type Origin = string;

/** Known values of {@link ActionType} that the service accepts. */
export enum KnownActionType {
  /** Internal */
  Internal = "Internal",
}

/**
 * Extensible enum. Indicates the action type. "Internal" refers to actions that are for internal only APIs. \
 * {@link KnownActionType} can be used interchangeably with ActionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Internal**
 */
export type ActionType = string;

/** A StorageClass resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface StorageClassResource extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageClassProperties;
}

export function storageClassResourceSerializer(
  item: StorageClassResource,
): Record<string, unknown> {
  return {
    properties: !item.properties
      ? item.properties
      : storageClassPropertiesSerializer(item.properties),
  };
}

/** Details of the StorageClass StorageClass. */
export interface StorageClassProperties {
  /** Volume can be expanded or not */
  allowVolumeExpansion?: VolumeExpansion;
  /** Additional mount options */
  mountOptions?: string[];
  /** Provisioner name */
  provisioner?: string;
  /** Binding mode of volumes: Immediate, WaitForFirstConsumer */
  volumeBindingMode?: VolumeBindingMode;
  /** The access mode: [ReadWriteOnce, ReadWriteMany] or [ReadWriteOnce] */
  accessModes?: AccessMode[];
  /** Allow single data node failure */
  dataResilience?: DataResilienceTier;
  /** Failover speed: NA, Slow, Fast */
  failoverSpeed?: FailoverTier;
  /** Limitations of the storage class */
  limitations?: string[];
  /** Performance tier */
  performance?: PerformanceTier;
  /** Selection priority when multiple storage classes meet the criteria. 0: Highest, -1: Never use */
  priority?: number;
  /** Properties of the StorageClass */
  typeProperties: StorageClassTypePropertiesUnion;
  /** Resource provision state */
  readonly provisioningState?: ProvisioningState;
}

export function storageClassPropertiesSerializer(
  item: StorageClassProperties,
): Record<string, unknown> {
  return {
    allowVolumeExpansion: item["allowVolumeExpansion"],
    mountOptions: item["mountOptions"],
    provisioner: item["provisioner"],
    volumeBindingMode: item["volumeBindingMode"],
    accessModes: item["accessModes"],
    dataResilience: item["dataResilience"],
    failoverSpeed: item["failoverSpeed"],
    limitations: item["limitations"],
    performance: item["performance"],
    priority: item["priority"],
    typeProperties: storageClassTypePropertiesUnionSerializer(item.typeProperties),
  };
}

/** Known values of {@link VolumeExpansion} that the service accepts. */
export enum KnownVolumeExpansion {
  /** Allow */
  Allow = "Allow",
  /** Disallow */
  Disallow = "Disallow",
}

/**
 * Ability to expand volumes of a storage class \
 * {@link KnownVolumeExpansion} can be used interchangeably with VolumeExpansion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow** \
 * **Disallow**
 */
export type VolumeExpansion = string;

/** Known values of {@link VolumeBindingMode} that the service accepts. */
export enum KnownVolumeBindingMode {
  /** Immediate */
  Immediate = "Immediate",
  /** WaitForFirstConsumer */
  WaitForFirstConsumer = "WaitForFirstConsumer",
}

/**
 * Storage class volume binding mode \
 * {@link KnownVolumeBindingMode} can be used interchangeably with VolumeBindingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Immediate** \
 * **WaitForFirstConsumer**
 */
export type VolumeBindingMode = string;

/** Known values of {@link AccessMode} that the service accepts. */
export enum KnownAccessMode {
  /** ReadWriteOnce */
  ReadWriteOnce = "ReadWriteOnce",
  /** ReadWriteMany */
  ReadWriteMany = "ReadWriteMany",
}

/**
 * Storage Class Access Mode \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWriteOnce** \
 * **ReadWriteMany**
 */
export type AccessMode = string;

/** Known values of {@link DataResilienceTier} that the service accepts. */
export enum KnownDataResilienceTier {
  /** NotDataResilient */
  NotDataResilient = "NotDataResilient",
  /** DataResilient */
  DataResilient = "DataResilient",
}

/**
 * Data resilience tier of a storage class \
 * {@link KnownDataResilienceTier} can be used interchangeably with DataResilienceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotDataResilient** \
 * **DataResilient**
 */
export type DataResilienceTier = string;

/** Known values of {@link FailoverTier} that the service accepts. */
export enum KnownFailoverTier {
  /** NotAvailable */
  NotAvailable = "NotAvailable",
  /** Slow */
  Slow = "Slow",
  /** Fast */
  Fast = "Fast",
  /** Super */
  Super = "Super",
}

/**
 * Failover tier of a storage class \
 * {@link KnownFailoverTier} can be used interchangeably with FailoverTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotAvailable** \
 * **Slow** \
 * **Fast** \
 * **Super**
 */
export type FailoverTier = string;

/** Known values of {@link PerformanceTier} that the service accepts. */
export enum KnownPerformanceTier {
  /** Undefined */
  Undefined = "Undefined",
  /** Basic */
  Basic = "Basic",
  /** Standard */
  Standard = "Standard",
  /** Premium */
  Premium = "Premium",
  /** Ultra */
  Ultra = "Ultra",
}

/**
 * Performance tier of a storage class \
 * {@link KnownPerformanceTier} can be used interchangeably with PerformanceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Undefined** \
 * **Basic** \
 * **Standard** \
 * **Premium** \
 * **Ultra**
 */
export type PerformanceTier = string;

/** The properties of storage class of the StorageClass */
export interface StorageClassTypeProperties {
  /** the discriminator possible values: Native, RWX, Blob, NFS, SMB */
  type: SCType;
}

export function storageClassTypePropertiesUnionSerializer(item: StorageClassTypePropertiesUnion) {
  switch (item.type) {
    case "Native":
      return nativeStorageClassTypePropertiesSerializer(item as NativeStorageClassTypeProperties);

    case "RWX":
      return rwxStorageClassTypePropertiesSerializer(item as RwxStorageClassTypeProperties);

    case "Blob":
      return blobStorageClassTypePropertiesSerializer(item as BlobStorageClassTypeProperties);

    case "NFS":
      return nfsStorageClassTypePropertiesSerializer(item as NfsStorageClassTypeProperties);

    case "SMB":
      return smbStorageClassTypePropertiesSerializer(item as SmbStorageClassTypeProperties);

    default:
      return storageClassTypePropertiesSerializer(item);
  }
}

export function storageClassTypePropertiesSerializer(
  item: StorageClassTypePropertiesUnion,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** The properties of Native StorageClass */
export interface NativeStorageClassTypeProperties extends StorageClassTypeProperties {
  /** Native StorageClass */
  type: "Native";
}

export function nativeStorageClassTypePropertiesSerializer(
  item: NativeStorageClassTypeProperties,
): Record<string, unknown> {
  return {
    type: item["type"],
  };
}

/** The properties of RWX StorageClass */
export interface RwxStorageClassTypeProperties extends StorageClassTypeProperties {
  /** RWX StorageClass */
  type: "RWX";
  /** The backing storageclass used to create new storageclass */
  backingStorageClassName: string;
}

export function rwxStorageClassTypePropertiesSerializer(
  item: RwxStorageClassTypeProperties,
): Record<string, unknown> {
  return {
    type: item["type"],
    backingStorageClassName: item["backingStorageClassName"],
  };
}

/** The properties of Blob StorageClass */
export interface BlobStorageClassTypeProperties extends StorageClassTypeProperties {
  /** Blob StorageClass */
  type: "Blob";
  /** Azure Storage Account Name */
  azureStorageAccountName: string;
  /** Azure Storage Account Key */
  azureStorageAccountKey: string;
}

export function blobStorageClassTypePropertiesSerializer(
  item: BlobStorageClassTypeProperties,
): Record<string, unknown> {
  return {
    type: item["type"],
    azureStorageAccountName: item["azureStorageAccountName"],
    azureStorageAccountKey: item["azureStorageAccountKey"],
  };
}

/** The properties of NFS StorageClass */
export interface NfsStorageClassTypeProperties extends StorageClassTypeProperties {
  /** NFS StorageClass */
  type: "NFS";
  /** NFS Server */
  server: string;
  /** NFS share */
  share: string;
  /** Sub directory under share. If the sub directory doesn't exist, driver will create it */
  subDir?: string;
  /** Mounted folder permissions. Default is 0. If set as non-zero, driver will perform `chmod` after mount */
  mountPermissions?: string;
  /** The action to take when a NFS volume is deleted. Default is Delete */
  onDelete?: NfsDirectoryActionOnVolumeDeletion;
}

export function nfsStorageClassTypePropertiesSerializer(
  item: NfsStorageClassTypeProperties,
): Record<string, unknown> {
  return {
    type: item["type"],
    server: item["server"],
    share: item["share"],
    subDir: item["subDir"],
    mountPermissions: item["mountPermissions"],
    onDelete: item["onDelete"],
  };
}

/** Known values of {@link NfsDirectoryActionOnVolumeDeletion} that the service accepts. */
export enum KnownNfsDirectoryActionOnVolumeDeletion {
  /** Delete */
  Delete = "Delete",
  /** Retain */
  Retain = "Retain",
}

/**
 * The action to take when a NFS volume is deleted \
 * {@link KnownNfsDirectoryActionOnVolumeDeletion} can be used interchangeably with NfsDirectoryActionOnVolumeDeletion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete** \
 * **Retain**
 */
export type NfsDirectoryActionOnVolumeDeletion = string;

/** The properties of SMB StorageClass */
export interface SmbStorageClassTypeProperties extends StorageClassTypeProperties {
  /** SMB StorageClass */
  type: "SMB";
  /** SMB Source */
  source: string;
  /** Sub directory under share. If the sub directory doesn't exist, driver will create it */
  subDir?: string;
  /** Server username */
  username?: string;
  /** Server password */
  password?: string;
  /** Server domain */
  domain?: string;
}

export function smbStorageClassTypePropertiesSerializer(
  item: SmbStorageClassTypeProperties,
): Record<string, unknown> {
  return {
    type: item["type"],
    source: item["source"],
    subDir: item["subDir"],
    username: item["username"],
    password: item["password"],
    domain: item["domain"],
  };
}

/** Known values of {@link SCType} that the service accepts. */
export enum KnownSCType {
  /** Native */
  Native = "Native",
  /** RWX */
  RWX = "RWX",
  /** Blob */
  Blob = "Blob",
  /** NFS */
  NFS = "NFS",
  /** SMB */
  SMB = "SMB",
}

/**
 * Type of a storage class \
 * {@link KnownSCType} can be used interchangeably with SCType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Native** \
 * **RWX** \
 * **Blob** \
 * **NFS** \
 * **SMB**
 */
export type SCType = string;

/** The model for updating a storageClass */
export interface StorageClassResourceUpdate {
  /** The properties of StorageClass */
  properties?: StorageClassPropertiesUpdate;
}

export function storageClassResourceUpdateSerializer(
  item: StorageClassResourceUpdate,
): Record<string, unknown> {
  return {
    properties: !item.properties
      ? item.properties
      : storageClassPropertiesUpdateSerializer(item.properties),
  };
}

/** The model for updating storageClass properties */
export interface StorageClassPropertiesUpdate {
  /** Volume can be expanded or not */
  allowVolumeExpansion?: VolumeExpansion;
  /** Additional mount options */
  mountOptions?: string[];
  /** The access mode: [ReadWriteOnce, ReadWriteMany] or [ReadWriteOnce] */
  accessModes?: AccessMode[];
  /** Allow single data node failure */
  dataResilience?: DataResilienceTier;
  /** Failover speed: NA, Slow, Fast */
  failoverSpeed?: FailoverTier;
  /** Limitations of the storage class */
  limitations?: string[];
  /** Performance tier */
  performance?: PerformanceTier;
  /** Selection priority when multiple storage classes meet the criteria. 0: Highest, -1: Never use */
  priority?: number;
  /** New storage class type of storageClass */
  typeProperties?: StorageClassTypePropertiesUpdate;
}

export function storageClassPropertiesUpdateSerializer(
  item: StorageClassPropertiesUpdate,
): Record<string, unknown> {
  return {
    allowVolumeExpansion: item["allowVolumeExpansion"],
    mountOptions: item["mountOptions"],
    accessModes: item["accessModes"],
    dataResilience: item["dataResilience"],
    failoverSpeed: item["failoverSpeed"],
    limitations: item["limitations"],
    performance: item["performance"],
    priority: item["priority"],
    typeProperties: !item.typeProperties
      ? item.typeProperties
      : storageClassTypePropertiesUpdateSerializer(item.typeProperties),
  };
}

/** The model for update a storageClass */
export interface StorageClassTypePropertiesUpdate {
  /** The backing storageclass used to create new storageclass */
  backingStorageClassName?: string;
  /** Azure Storage Account Name */
  azureStorageAccountName?: string;
  /** Azure Storage Account Key */
  azureStorageAccountKey?: string;
  /** NFS Server */
  server?: string;
  /** NFS share */
  share?: string;
  /** Sub directory under share. If the sub directory doesn't exist, driver will create it */
  subDir?: string;
  /** Mounted folder permissions. Default is 0. If set as non-zero, driver will perform `chmod` after mount */
  mountPermissions?: string;
  /** The action to take when a NFS volume is deleted. Default is Delete */
  onDelete?: NfsDirectoryActionOnVolumeDeletion;
  /** SMB Source */
  source?: string;
  /** Server username */
  username?: string;
  /** Server password */
  password?: string;
  /** Server domain */
  domain?: string;
}

export function storageClassTypePropertiesUpdateSerializer(
  item: StorageClassTypePropertiesUpdate,
): Record<string, unknown> {
  return {
    backingStorageClassName: item["backingStorageClassName"],
    azureStorageAccountName: item["azureStorageAccountName"],
    azureStorageAccountKey: item["azureStorageAccountKey"],
    server: item["server"],
    share: item["share"],
    subDir: item["subDir"],
    mountPermissions: item["mountPermissions"],
    onDelete: item["onDelete"],
    source: item["source"],
    username: item["username"],
    password: item["password"],
    domain: item["domain"],
  };
}

/** The response of a StorageClassResource list operation. */
export interface _StorageClassResourceListResult {
  /** The StorageClassResource items on this page */
  value: StorageClassResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Known values of {@link ResourceProvisioningState} that the service accepts. */
export enum KnownProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Provisioning */
  Provisioning = "Provisioning",
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Accepted */
  Accepted = "Accepted",
}

/**
 * The provisioning state of a resource type. \
 * {@link KnownProvisioningState} can be used interchangeably with ResourceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Provisioning** \
 * **Updating** \
 * **Deleting** \
 * **Accepted**
 */
export type ProvisioningState = string;

/** Alias for StorageClassTypePropertiesUnion */
export type StorageClassTypePropertiesUnion =
  | NativeStorageClassTypeProperties
  | RwxStorageClassTypeProperties
  | BlobStorageClassTypeProperties
  | NfsStorageClassTypeProperties
  | SmbStorageClassTypeProperties
  | StorageClassTypeProperties;
