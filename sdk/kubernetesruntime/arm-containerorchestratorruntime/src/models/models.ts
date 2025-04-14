// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** A Service resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface ServiceResource extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: ServiceProperties;
}

export function serviceResourceSerializer(item: ServiceResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : servicePropertiesSerializer(item["properties"]),
  };
}

export function serviceResourceDeserializer(item: any): ServiceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : servicePropertiesDeserializer(item["properties"]),
  };
}

/** Properties for the service resource */
export interface ServiceProperties {
  /** The object id of the service principal of the RP provisioned in the tenant */
  readonly rpObjectId?: string;
  /** Resource provision state */
  readonly provisioningState?: ProvisioningState;
}

export function servicePropertiesSerializer(item: ServiceProperties): any {
  return item;
}

export function servicePropertiesDeserializer(item: any): ServiceProperties {
  return {
    rpObjectId: item["rpObjectId"],
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
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

export function provisioningStateSerializer(item: ProvisioningState): any {
  return item;
}

export function provisioningStateDeserializer(item: any): ProvisioningState {
  return item;
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
 * {@link KnowncreatedByType} can be used interchangeably with createdByType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **User**: The entity was created by a user. \
 * **Application**: The entity was created by an application. \
 * **ManagedIdentity**: The entity was created by a managed identity. \
 * **Key**: The entity was created by a key.
 */
export type CreatedByType = string;

/** The response of a ServiceResource list operation. */
export interface _ServiceResourceListResult {
  /** The ServiceResource items on this page */
  value: ServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceResourceListResultDeserializer(item: any): _ServiceResourceListResult {
  return {
    value: serviceResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function serviceResourceArraySerializer(result: Array<ServiceResource>): any[] {
  return result.map((item) => {
    return serviceResourceSerializer(item);
  });
}

export function serviceResourceArrayDeserializer(result: Array<ServiceResource>): any[] {
  return result.map((item) => {
    return serviceResourceDeserializer(item);
  });
}

/** A BgpPeer resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface BgpPeer extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: BgpPeerProperties;
}

export function bgpPeerSerializer(item: BgpPeer): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : bgpPeerPropertiesSerializer(item["properties"]),
  };
}

export function bgpPeerDeserializer(item: any): BgpPeer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : bgpPeerPropertiesDeserializer(item["properties"]),
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

export function bgpPeerPropertiesSerializer(item: BgpPeerProperties): any {
  return {
    myAsn: item["myAsn"],
    peerAsn: item["peerAsn"],
    peerAddress: item["peerAddress"],
  };
}

export function bgpPeerPropertiesDeserializer(item: any): BgpPeerProperties {
  return {
    myAsn: item["myAsn"],
    peerAsn: item["peerAsn"],
    peerAddress: item["peerAddress"],
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** The response of a BgpPeer list operation. */
export interface _BgpPeerListResult {
  /** The BgpPeer items on this page */
  value: BgpPeer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _bgpPeerListResultDeserializer(item: any): _BgpPeerListResult {
  return {
    value: bgpPeerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function bgpPeerArraySerializer(result: Array<BgpPeer>): any[] {
  return result.map((item) => {
    return bgpPeerSerializer(item);
  });
}

export function bgpPeerArrayDeserializer(result: Array<BgpPeer>): any[] {
  return result.map((item) => {
    return bgpPeerDeserializer(item);
  });
}

/** A LoadBalancer resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface LoadBalancer extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: LoadBalancerProperties;
}

export function loadBalancerSerializer(item: LoadBalancer): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : loadBalancerPropertiesSerializer(item["properties"]),
  };
}

export function loadBalancerDeserializer(item: any): LoadBalancer {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : loadBalancerPropertiesDeserializer(item["properties"]),
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

export function loadBalancerPropertiesSerializer(item: LoadBalancerProperties): any {
  return {
    addresses: item["addresses"].map((p: any) => {
      return p;
    }),
    serviceSelector: item["serviceSelector"],
    advertiseMode: item["advertiseMode"],
    bgpPeers: !item["bgpPeers"]
      ? item["bgpPeers"]
      : item["bgpPeers"].map((p: any) => {
          return p;
        }),
  };
}

export function loadBalancerPropertiesDeserializer(item: any): LoadBalancerProperties {
  return {
    addresses: item["addresses"].map((p: any) => {
      return p;
    }),
    serviceSelector: item["serviceSelector"],
    advertiseMode: item["advertiseMode"],
    bgpPeers: !item["bgpPeers"]
      ? item["bgpPeers"]
      : item["bgpPeers"].map((p: any) => {
          return p;
        }),
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Enum of advertise mode */
export enum KnownAdvertiseMode {
  /** ARP advertise mode */
  ARP = "ARP",
  /** BGP advertise mode */
  BGP = "BGP",
  /** both ARP and BGP advertise mode */
  Both = "Both",
}

/**
 * Enum of advertise mode \
 * {@link KnownAdvertiseMode} can be used interchangeably with AdvertiseMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ARP**: ARP advertise mode \
 * **BGP**: BGP advertise mode \
 * **Both**: both ARP and BGP advertise mode
 */
export type AdvertiseMode = string;

/** The response of a LoadBalancer list operation. */
export interface _LoadBalancerListResult {
  /** The LoadBalancer items on this page */
  value: LoadBalancer[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _loadBalancerListResultDeserializer(item: any): _LoadBalancerListResult {
  return {
    value: loadBalancerArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function loadBalancerArraySerializer(result: Array<LoadBalancer>): any[] {
  return result.map((item) => {
    return loadBalancerSerializer(item);
  });
}

export function loadBalancerArrayDeserializer(result: Array<LoadBalancer>): any[] {
  return result.map((item) => {
    return loadBalancerDeserializer(item);
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

export function operationArrayDeserializer(result: Array<Operation>): any[] {
  return result.map((item) => {
    return operationDeserializer(item);
  });
}

/** A StorageClass resource for an Arc connected cluster (Microsoft.Kubernetes/connectedClusters) */
export interface StorageClassResource extends ExtensionResource {
  /** The resource-specific properties for this resource. */
  properties?: StorageClassProperties;
}

export function storageClassResourceSerializer(item: StorageClassResource): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storageClassPropertiesSerializer(item["properties"]),
  };
}

export function storageClassResourceDeserializer(item: any): StorageClassResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : storageClassPropertiesDeserializer(item["properties"]),
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

export function storageClassPropertiesSerializer(item: StorageClassProperties): any {
  return {
    allowVolumeExpansion: item["allowVolumeExpansion"],
    mountOptions: !item["mountOptions"]
      ? item["mountOptions"]
      : item["mountOptions"].map((p: any) => {
          return p;
        }),
    provisioner: item["provisioner"],
    volumeBindingMode: item["volumeBindingMode"],
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    dataResilience: item["dataResilience"],
    failoverSpeed: item["failoverSpeed"],
    limitations: !item["limitations"]
      ? item["limitations"]
      : item["limitations"].map((p: any) => {
          return p;
        }),
    performance: item["performance"],
    priority: item["priority"],
    typeProperties: storageClassTypePropertiesUnionSerializer(item["typeProperties"]),
  };
}

export function storageClassPropertiesDeserializer(item: any): StorageClassProperties {
  return {
    allowVolumeExpansion: item["allowVolumeExpansion"],
    mountOptions: !item["mountOptions"]
      ? item["mountOptions"]
      : item["mountOptions"].map((p: any) => {
          return p;
        }),
    provisioner: item["provisioner"],
    volumeBindingMode: item["volumeBindingMode"],
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    dataResilience: item["dataResilience"],
    failoverSpeed: item["failoverSpeed"],
    limitations: !item["limitations"]
      ? item["limitations"]
      : item["limitations"].map((p: any) => {
          return p;
        }),
    performance: item["performance"],
    priority: item["priority"],
    typeProperties: storageClassTypePropertiesUnionDeserializer(item["typeProperties"]),
    provisioningState: !item["provisioningState"]
      ? item["provisioningState"]
      : provisioningStateDeserializer(item["provisioningState"]),
  };
}

/** Ability to expand volumes of a storage class */
export enum KnownVolumeExpansion {
  /** Allow volume expansion */
  Allow = "Allow",
  /** Disallow volume expansion */
  Disallow = "Disallow",
}

/**
 * Ability to expand volumes of a storage class \
 * {@link KnownVolumeExpansion} can be used interchangeably with VolumeExpansion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Allow**: Allow volume expansion \
 * **Disallow**: Disallow volume expansion
 */
export type VolumeExpansion = string;

/** Storage class volume binding mode */
export enum KnownVolumeBindingMode {
  /** Immediate binding mode */
  Immediate = "Immediate",
  /** Wait for first consumer binding mode */
  WaitForFirstConsumer = "WaitForFirstConsumer",
}

/**
 * Storage class volume binding mode \
 * {@link KnownVolumeBindingMode} can be used interchangeably with VolumeBindingMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Immediate**: Immediate binding mode \
 * **WaitForFirstConsumer**: Wait for first consumer binding mode
 */
export type VolumeBindingMode = string;

/** Storage Class Access Mode */
export enum KnownAccessMode {
  /** Read Write Once (RWO) access mode */
  ReadWriteOnce = "ReadWriteOnce",
  /** Read Write Many (RWX) access mode */
  ReadWriteMany = "ReadWriteMany",
}

/**
 * Storage Class Access Mode \
 * {@link KnownAccessMode} can be used interchangeably with AccessMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ReadWriteOnce**: Read Write Once (RWO) access mode \
 * **ReadWriteMany**: Read Write Many (RWX) access mode
 */
export type AccessMode = string;

/** Data resilience tier of a storage class */
export enum KnownDataResilienceTier {
  /** Not data resilient */
  NotDataResilient = "NotDataResilient",
  /** Data resilient */
  DataResilient = "DataResilient",
}

/**
 * Data resilience tier of a storage class \
 * {@link KnownDataResilienceTier} can be used interchangeably with DataResilienceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotDataResilient**: Not data resilient \
 * **DataResilient**: Data resilient
 */
export type DataResilienceTier = string;

/** Failover tier of a storage class */
export enum KnownFailoverTier {
  /** Not available Failover Tier */
  NotAvailable = "NotAvailable",
  /** Slow Failover Tier */
  Slow = "Slow",
  /** Fast Failover Tier */
  Fast = "Fast",
  /** Super Failover Tier */
  Super = "Super",
}

/**
 * Failover tier of a storage class \
 * {@link KnownFailoverTier} can be used interchangeably with FailoverTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotAvailable**: Not available Failover Tier \
 * **Slow**: Slow Failover Tier \
 * **Fast**: Fast Failover Tier \
 * **Super**: Super Failover Tier
 */
export type FailoverTier = string;

/** Performance tier of a storage class */
export enum KnownPerformanceTier {
  /** Undefined Performance Tier */
  Undefined = "Undefined",
  /** Basic Performance Tier */
  Basic = "Basic",
  /** Standard Performance Tier */
  Standard = "Standard",
  /** Premium Performance Tier */
  Premium = "Premium",
  /** Ultra Performance Tier */
  Ultra = "Ultra",
}

/**
 * Performance tier of a storage class \
 * {@link KnownPerformanceTier} can be used interchangeably with PerformanceTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Undefined**: Undefined Performance Tier \
 * **Basic**: Basic Performance Tier \
 * **Standard**: Standard Performance Tier \
 * **Premium**: Premium Performance Tier \
 * **Ultra**: Ultra Performance Tier
 */
export type PerformanceTier = string;

/** The properties of storage class of the StorageClass */
export interface StorageClassTypeProperties {
  /** Type of the storage class. */
  /** The discriminator possible values: Native, RWX, Blob, NFS, SMB */
  type: SCType;
}

export function storageClassTypePropertiesSerializer(item: StorageClassTypeProperties): any {
  return { type: item["type"] };
}

export function storageClassTypePropertiesDeserializer(item: any): StorageClassTypeProperties {
  return {
    type: item["type"],
  };
}

/** Alias for StorageClassTypePropertiesUnion */
export type StorageClassTypePropertiesUnion =
  | NativeStorageClassTypeProperties
  | RwxStorageClassTypeProperties
  | BlobStorageClassTypeProperties
  | NfsStorageClassTypeProperties
  | SmbStorageClassTypeProperties
  | StorageClassTypeProperties;

export function storageClassTypePropertiesUnionSerializer(
  item: StorageClassTypePropertiesUnion,
): any {
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

export function storageClassTypePropertiesUnionDeserializer(
  item: any,
): StorageClassTypePropertiesUnion {
  switch (item.type) {
    case "Native":
      return nativeStorageClassTypePropertiesDeserializer(item as NativeStorageClassTypeProperties);

    case "RWX":
      return rwxStorageClassTypePropertiesDeserializer(item as RwxStorageClassTypeProperties);

    case "Blob":
      return blobStorageClassTypePropertiesDeserializer(item as BlobStorageClassTypeProperties);

    case "NFS":
      return nfsStorageClassTypePropertiesDeserializer(item as NfsStorageClassTypeProperties);

    case "SMB":
      return smbStorageClassTypePropertiesDeserializer(item as SmbStorageClassTypeProperties);

    default:
      return storageClassTypePropertiesDeserializer(item);
  }
}

/** Type of a storage class */
export enum KnownSCType {
  /** Native storage class */
  Native = "Native",
  /** RWX storage class */
  RWX = "RWX",
  /** Blob storage class */
  Blob = "Blob",
  /** NFS storage class */
  NFS = "NFS",
  /** SMB storage class */
  SMB = "SMB",
}

/**
 * Type of a storage class \
 * {@link KnownSCType} can be used interchangeably with SCType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Native**: Native storage class \
 * **RWX**: RWX storage class \
 * **Blob**: Blob storage class \
 * **NFS**: NFS storage class \
 * **SMB**: SMB storage class
 */
export type SCType = string;

/** The properties of Native StorageClass */
export interface NativeStorageClassTypeProperties extends StorageClassTypeProperties {
  /** Native StorageClass */
  type: "Native";
}

export function nativeStorageClassTypePropertiesSerializer(
  item: NativeStorageClassTypeProperties,
): any {
  return { type: item["type"] };
}

export function nativeStorageClassTypePropertiesDeserializer(
  item: any,
): NativeStorageClassTypeProperties {
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

export function rwxStorageClassTypePropertiesSerializer(item: RwxStorageClassTypeProperties): any {
  return {
    type: item["type"],
    backingStorageClassName: item["backingStorageClassName"],
  };
}

export function rwxStorageClassTypePropertiesDeserializer(
  item: any,
): RwxStorageClassTypeProperties {
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
): any {
  return {
    type: item["type"],
    azureStorageAccountName: item["azureStorageAccountName"],
    azureStorageAccountKey: item["azureStorageAccountKey"],
  };
}

export function blobStorageClassTypePropertiesDeserializer(
  item: any,
): BlobStorageClassTypeProperties {
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

export function nfsStorageClassTypePropertiesSerializer(item: NfsStorageClassTypeProperties): any {
  return {
    type: item["type"],
    server: item["server"],
    share: item["share"],
    subDir: item["subDir"],
    mountPermissions: item["mountPermissions"],
    onDelete: item["onDelete"],
  };
}

export function nfsStorageClassTypePropertiesDeserializer(
  item: any,
): NfsStorageClassTypeProperties {
  return {
    type: item["type"],
    server: item["server"],
    share: item["share"],
    subDir: item["subDir"],
    mountPermissions: item["mountPermissions"],
    onDelete: item["onDelete"],
  };
}

/** The action to take when a NFS volume is deleted */
export enum KnownNfsDirectoryActionOnVolumeDeletion {
  /** When the volume is deleted, delete the directory */
  Delete = "Delete",
  /** When the volume is deleted, retain the directory */
  Retain = "Retain",
}

/**
 * The action to take when a NFS volume is deleted \
 * {@link KnownNfsDirectoryActionOnVolumeDeletion} can be used interchangeably with NfsDirectoryActionOnVolumeDeletion,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: When the volume is deleted, delete the directory \
 * **Retain**: When the volume is deleted, retain the directory
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

export function smbStorageClassTypePropertiesSerializer(item: SmbStorageClassTypeProperties): any {
  return {
    type: item["type"],
    source: item["source"],
    subDir: item["subDir"],
    username: item["username"],
    password: item["password"],
    domain: item["domain"],
  };
}

export function smbStorageClassTypePropertiesDeserializer(
  item: any,
): SmbStorageClassTypeProperties {
  return {
    type: item["type"],
    source: item["source"],
    subDir: item["subDir"],
    username: item["username"],
    password: item["password"],
    domain: item["domain"],
  };
}

/** The model for updating a storageClass */
export interface StorageClassResourceUpdate {
  /** The properties of StorageClass */
  properties?: StorageClassPropertiesUpdate;
}

export function storageClassResourceUpdateSerializer(item: StorageClassResourceUpdate): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : storageClassPropertiesUpdateSerializer(item["properties"]),
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

export function storageClassPropertiesUpdateSerializer(item: StorageClassPropertiesUpdate): any {
  return {
    allowVolumeExpansion: item["allowVolumeExpansion"],
    mountOptions: !item["mountOptions"]
      ? item["mountOptions"]
      : item["mountOptions"].map((p: any) => {
          return p;
        }),
    accessModes: !item["accessModes"]
      ? item["accessModes"]
      : item["accessModes"].map((p: any) => {
          return p;
        }),
    dataResilience: item["dataResilience"],
    failoverSpeed: item["failoverSpeed"],
    limitations: !item["limitations"]
      ? item["limitations"]
      : item["limitations"].map((p: any) => {
          return p;
        }),
    performance: item["performance"],
    priority: item["priority"],
    typeProperties: !item["typeProperties"]
      ? item["typeProperties"]
      : storageClassTypePropertiesUpdateSerializer(item["typeProperties"]),
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
): any {
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

export function _storageClassResourceListResultDeserializer(
  item: any,
): _StorageClassResourceListResult {
  return {
    value: storageClassResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function storageClassResourceArraySerializer(result: Array<StorageClassResource>): any[] {
  return result.map((item) => {
    return storageClassResourceSerializer(item);
  });
}

export function storageClassResourceArrayDeserializer(result: Array<StorageClassResource>): any[] {
  return result.map((item) => {
    return storageClassResourceDeserializer(item);
  });
}
