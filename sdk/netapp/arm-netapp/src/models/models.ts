// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

/** Microsoft.NetApp REST API operation definition. */
export interface Operation {
  /** Operation name: {provider}/{resource}/{operation} */
  name?: string;
  /** Display metadata associated with the operation. */
  display?: OperationDisplay;
  /** The origin of operations. */
  origin?: string;
  /** Properties of operation, include metric specifications. */
  properties?: OperationProperties;
}

export function operationDeserializer(item: any): Operation {
  return {
    name: item["name"],
    display: !item["display"] ? item["display"] : operationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    properties: !item["properties"]
      ? item["properties"]
      : operationPropertiesDeserializer(item["properties"]),
  };
}

/** Display metadata associated with the operation. */
export interface OperationDisplay {
  /** Service provider: Microsoft NetApp. */
  provider?: string;
  /** Resource on which the operation is performed etc. */
  resource?: string;
  /** Type of operation: get, read, delete, etc. */
  operation?: string;
  /** Operation description. */
  description?: string;
}

export function operationDisplayDeserializer(item: any): OperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** Properties of operation, include metric specifications. */
export interface OperationProperties {
  /** One property of operation, include metric specifications. */
  serviceSpecification?: ServiceSpecification;
}

export function operationPropertiesDeserializer(item: any): OperationProperties {
  return {
    serviceSpecification: !item["serviceSpecification"]
      ? item["serviceSpecification"]
      : serviceSpecificationDeserializer(item["serviceSpecification"]),
  };
}

/** One property of operation, include metric specifications. */
export interface ServiceSpecification {
  /** Metric specifications of operation. */
  metricSpecifications?: MetricSpecification[];
  /** Log specification of operation. */
  logSpecifications?: LogSpecification[];
}

export function serviceSpecificationDeserializer(item: any): ServiceSpecification {
  return {
    metricSpecifications: !item["metricSpecifications"]
      ? item["metricSpecifications"]
      : metricSpecificationArrayDeserializer(item["metricSpecifications"]),
    logSpecifications: !item["logSpecifications"]
      ? item["logSpecifications"]
      : logSpecificationArrayDeserializer(item["logSpecifications"]),
  };
}

export function metricSpecificationArrayDeserializer(result: Array<MetricSpecification>): any[] {
  return result.map((item) => {
    return metricSpecificationDeserializer(item);
  });
}

/** Metric specification of operation. */
export interface MetricSpecification {
  /** Name of metric specification. */
  name?: string;
  /** Display name of metric specification. */
  displayName?: string;
  /** Display description of metric specification. */
  displayDescription?: string;
  /** Unit could be Bytes or Count. */
  unit?: string;
  /** Support metric aggregation type. */
  supportedAggregationTypes?: MetricAggregationType[];
  /** The supported time grain types for the metrics. */
  supportedTimeGrainTypes?: string[];
  /** The internal metric name. */
  internalMetricName?: string;
  /** Whether or not the service is using regional MDM accounts. */
  enableRegionalMdmAccount?: boolean;
  /** The source MDM account. */
  sourceMdmAccount?: string;
  /** The source MDM namespace. */
  sourceMdmNamespace?: string;
  /** Dimensions of blobs, including blob type and access tier. */
  dimensions?: Dimension[];
  /** Aggregation type could be Average. */
  aggregationType?: string;
  /** The property to decide fill gap with zero or not. */
  fillGapWithZero?: boolean;
  /** The category this metric specification belong to, could be Capacity. */
  category?: string;
  /** Account Resource Id. */
  resourceIdDimensionNameOverride?: string;
  /** Whether the metric is internal. */
  isInternal?: boolean;
}

export function metricSpecificationDeserializer(item: any): MetricSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
    displayDescription: item["displayDescription"],
    unit: item["unit"],
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
    internalMetricName: item["internalMetricName"],
    enableRegionalMdmAccount: item["enableRegionalMdmAccount"],
    sourceMdmAccount: item["sourceMdmAccount"],
    sourceMdmNamespace: item["sourceMdmNamespace"],
    dimensions: !item["dimensions"]
      ? item["dimensions"]
      : dimensionArrayDeserializer(item["dimensions"]),
    aggregationType: item["aggregationType"],
    fillGapWithZero: item["fillGapWithZero"],
    category: item["category"],
    resourceIdDimensionNameOverride: item["resourceIdDimensionNameOverride"],
    isInternal: item["isInternal"],
  };
}

/** Known values of {@link MetricAggregationType} that the service accepts. */
export enum KnownMetricAggregationType {
  /** Average */
  Average = "Average",
}

/** Type of MetricAggregationType */
export type MetricAggregationType = string;

export function dimensionArrayDeserializer(result: Array<Dimension>): any[] {
  return result.map((item) => {
    return dimensionDeserializer(item);
  });
}

/** Dimension of blobs, possibly be blob type or access tier. */
export interface Dimension {
  /** Display name of dimension. */
  name?: string;
  /** Display name of dimension. */
  displayName?: string;
}

export function dimensionDeserializer(item: any): Dimension {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

export function logSpecificationArrayDeserializer(result: Array<LogSpecification>): any[] {
  return result.map((item) => {
    return logSpecificationDeserializer(item);
  });
}

/** Log Definition of a single resource metric. */
export interface LogSpecification {
  /** Name of log specification. */
  name?: string;
  /** Display name of log specification. */
  displayName?: string;
}

export function logSpecificationDeserializer(item: any): LogSpecification {
  return {
    name: item["name"],
    displayName: item["displayName"],
  };
}

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

/** Information regarding Quota Item. */
export interface QuotaItem extends ProxyResource {
  /** QuotaItem properties */
  properties?: QuotaItemProperties;
}

export function quotaItemDeserializer(item: any): QuotaItem {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : quotaItemPropertiesDeserializer(item["properties"]),
  };
}

/** QuotaItem Properties */
export interface QuotaItemProperties {
  /** The current quota value. */
  readonly current?: number;
  /** The default quota value. */
  readonly default?: number;
  /** The usage quota value. */
  readonly usage?: number | null;
}

export function quotaItemPropertiesDeserializer(item: any): QuotaItemProperties {
  return {
    current: item["current"],
    default: item["default"],
    usage: item["usage"],
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

/** List of Quota Items */
export interface _QuotaItemList {
  /** The QuotaItem items on this page */
  value: QuotaItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _quotaItemListDeserializer(item: any): _QuotaItemList {
  return {
    value: quotaItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function quotaItemArrayDeserializer(result: Array<QuotaItem>): any[] {
  return result.map((item) => {
    return quotaItemDeserializer(item);
  });
}

/** Volume group resource for create */
export interface VolumeGroupDetails extends ProxyResource {
  /** Volume group properties */
  properties?: VolumeGroupProperties;
  /** Resource location */
  location?: string;
}

export function volumeGroupDetailsSerializer(item: VolumeGroupDetails): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : volumeGroupPropertiesSerializer(item["properties"]),
    location: item["location"],
  };
}

export function volumeGroupDetailsDeserializer(item: any): VolumeGroupDetails {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumeGroupPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Volume group properties */
export interface VolumeGroupProperties {
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Volume group details */
  groupMetaData?: VolumeGroupMetaData;
  /** List of volumes from group */
  volumes?: VolumeGroupVolumeProperties[];
}

export function volumeGroupPropertiesSerializer(item: VolumeGroupProperties): any {
  return {
    groupMetaData: !item["groupMetaData"]
      ? item["groupMetaData"]
      : volumeGroupMetaDataSerializer(item["groupMetaData"]),
    volumes: !item["volumes"]
      ? item["volumes"]
      : volumeGroupVolumePropertiesArraySerializer(item["volumes"]),
  };
}

export function volumeGroupPropertiesDeserializer(item: any): VolumeGroupProperties {
  return {
    provisioningState: item["provisioningState"],
    groupMetaData: !item["groupMetaData"]
      ? item["groupMetaData"]
      : volumeGroupMetaDataDeserializer(item["groupMetaData"]),
    volumes: !item["volumes"]
      ? item["volumes"]
      : volumeGroupVolumePropertiesArrayDeserializer(item["volumes"]),
  };
}

/** Volume group properties */
export interface VolumeGroupMetaData {
  /** Group Description */
  groupDescription?: string;
  /** Application Type */
  applicationType?: ApplicationType;
  /** Application specific identifier */
  applicationIdentifier?: string;
  /** Application specific placement rules for the volume group */
  globalPlacementRules?: PlacementKeyValuePairs[];
  /** Number of volumes in volume group */
  readonly volumesCount?: number;
}

export function volumeGroupMetaDataSerializer(item: VolumeGroupMetaData): any {
  return {
    groupDescription: item["groupDescription"],
    applicationType: item["applicationType"],
    applicationIdentifier: item["applicationIdentifier"],
    globalPlacementRules: !item["globalPlacementRules"]
      ? item["globalPlacementRules"]
      : placementKeyValuePairsArraySerializer(item["globalPlacementRules"]),
  };
}

export function volumeGroupMetaDataDeserializer(item: any): VolumeGroupMetaData {
  return {
    groupDescription: item["groupDescription"],
    applicationType: item["applicationType"],
    applicationIdentifier: item["applicationIdentifier"],
    globalPlacementRules: !item["globalPlacementRules"]
      ? item["globalPlacementRules"]
      : placementKeyValuePairsArrayDeserializer(item["globalPlacementRules"]),
    volumesCount: item["volumesCount"],
  };
}

/** Application Type */
export enum KnownApplicationType {
  /** SAP-HANA */
  SAPHana = "SAP-HANA",
  /** ORACLE */
  Oracle = "ORACLE",
}

/**
 * Application Type \
 * {@link KnownApplicationType} can be used interchangeably with ApplicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SAP-HANA** \
 * **ORACLE**
 */
export type ApplicationType = string;

export function placementKeyValuePairsArraySerializer(
  result: Array<PlacementKeyValuePairs>,
): any[] {
  return result.map((item) => {
    return placementKeyValuePairsSerializer(item);
  });
}

export function placementKeyValuePairsArrayDeserializer(
  result: Array<PlacementKeyValuePairs>,
): any[] {
  return result.map((item) => {
    return placementKeyValuePairsDeserializer(item);
  });
}

/** Application specific parameters for the placement of volumes in the volume group */
export interface PlacementKeyValuePairs {
  /** Key for an application specific parameter for the placement of volumes in the volume group */
  key: string;
  /** Value for an application specific parameter for the placement of volumes in the volume group */
  value: string;
}

export function placementKeyValuePairsSerializer(item: PlacementKeyValuePairs): any {
  return { key: item["key"], value: item["value"] };
}

export function placementKeyValuePairsDeserializer(item: any): PlacementKeyValuePairs {
  return {
    key: item["key"],
    value: item["value"],
  };
}

export function volumeGroupVolumePropertiesArraySerializer(
  result: Array<VolumeGroupVolumeProperties>,
): any[] {
  return result.map((item) => {
    return volumeGroupVolumePropertiesSerializer(item);
  });
}

export function volumeGroupVolumePropertiesArrayDeserializer(
  result: Array<VolumeGroupVolumeProperties>,
): any[] {
  return result.map((item) => {
    return volumeGroupVolumePropertiesDeserializer(item);
  });
}

/** Volume resource */
export interface VolumeGroupVolumeProperties {
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Availability Zone */
  zones?: string[];
  /** Volume properties */
  properties: VolumeProperties;
}

export function volumeGroupVolumePropertiesSerializer(item: VolumeGroupVolumeProperties): any {
  return {
    name: item["name"],
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    properties: volumePropertiesSerializer(item["properties"]),
  };
}

export function volumeGroupVolumePropertiesDeserializer(item: any): VolumeGroupVolumeProperties {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    tags: item["tags"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
    properties: volumePropertiesDeserializer(item["properties"]),
  };
}

/** Volume properties */
export interface VolumeProperties {
  /** Unique FileSystem Identifier. */
  readonly fileSystemId?: string;
  /** A unique file path for the volume. Used when creating mount targets */
  creationToken: string;
  /** The service level of the file system */
  serviceLevel?: ServiceLevel;
  /** Maximum storage quota allowed for a file system in bytes. This is a soft quota used for alerting only. For regular volumes, valid values are in the range 50GiB to 100TiB. For large volumes, valid values are in the range 100TiB to 500TiB, and on an exceptional basis, from to 2400GiB to 2400TiB. Values expressed in bytes as multiples of 1 GiB. */
  usageThreshold: number;
  /** Set of export policy rules */
  exportPolicy?: VolumePropertiesExportPolicy;
  /** Set of protocol types, default NFSv3, CIFS for SMB protocol */
  protocolTypes?: string[];
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Resource identifier used to identify the Snapshot. */
  snapshotId?: string | null;
  /** If enabled (true) the snapshot the volume was created from will be automatically deleted after the volume create operation has finished.  Defaults to false */
  deleteBaseSnapshot?: boolean;
  /** Resource identifier used to identify the Backup. */
  backupId?: string | null;
  /** Unique Baremetal Tenant Identifier. */
  readonly baremetalTenantId?: string;
  /** The Azure Resource URI for a delegated subnet. Must have the delegation Microsoft.NetApp/volumes */
  subnetId: string;
  /** The original value of the network features type available to the volume at the time it was created. */
  networkFeatures?: NetworkFeatures;
  /** The effective value of the network features type available to the volume, or current effective state of update. */
  readonly effectiveNetworkFeatures?: NetworkFeatures;
  /** Network Sibling Set ID for the the group of volumes sharing networking resources. */
  readonly networkSiblingSetId?: string;
  /** Provides storage to network proximity information for the volume. */
  readonly storageToNetworkProximity?: VolumeStorageToNetworkProximity;
  /** List of mount targets */
  readonly mountTargets?: MountTargetProperties[];
  /** What type of volume is this. For destination volumes in Cross Region Replication, set type to DataProtection. For creating clone volume, set type to ShortTermClone */
  volumeType?: string;
  /** DataProtection type volumes include an object containing details of the replication */
  dataProtection?: VolumePropertiesDataProtection;
  /** While auto splitting the short term clone volume, if the parent pool does not have enough space to accommodate the volume after split, it will be automatically resized, which will lead to increased billing. To accept capacity pool size auto grow and create a short term clone volume, set the property as accepted. */
  acceptGrowCapacityPoolForShortTermCloneSplit?: AcceptGrowCapacityPoolForShortTermCloneSplit;
  /** Restoring */
  readonly isRestoring?: boolean;
  /** If enabled (true) the volume will contain a read-only snapshot directory which provides access to each of the volume's snapshots (defaults to true). */
  snapshotDirectoryVisible?: boolean;
  /** Describe if a volume is KerberosEnabled. To be use with swagger version 2020-05-01 or later */
  kerberosEnabled?: boolean;
  /** The security style of volume, default unix, defaults to ntfs for dual protocol or CIFS protocol */
  securityStyle?: SecurityStyle;
  /** Enables encryption for in-flight smb3 data. Only applicable for SMB/DualProtocol volume. To be used with swagger version 2020-08-01 or later */
  smbEncryption?: boolean;
  /** Enables access-based enumeration share property for SMB Shares. Only applicable for SMB/DualProtocol volume */
  smbAccessBasedEnumeration?: SmbAccessBasedEnumeration | null;
  /** Enables non-browsable property for SMB Shares. Only applicable for SMB/DualProtocol volume */
  smbNonBrowsable?: SmbNonBrowsable;
  /** Enables continuously available share property for smb volume. Only applicable for SMB volume */
  smbContinuouslyAvailable?: boolean;
  /** Maximum throughput in MiB/s that can be achieved by this volume and this will be accepted as input only for manual qosType volume */
  throughputMibps?: number | null;
  /** Actual throughput in MiB/s for auto qosType volumes calculated based on size and serviceLevel */
  readonly actualThroughputMibps?: number;
  /** Source of key used to encrypt data in volume. Applicable if NetApp account has encryption.keySource = 'Microsoft.KeyVault'. Possible values (case-insensitive) are: 'Microsoft.NetApp, Microsoft.KeyVault' */
  encryptionKeySource?: EncryptionKeySource;
  /** The resource ID of private endpoint for KeyVault. It must reside in the same VNET as the volume. Only applicable if encryptionKeySource = 'Microsoft.KeyVault'. */
  keyVaultPrivateEndpointResourceId?: string;
  /** Specifies whether LDAP is enabled or not for a given NFS volume. */
  ldapEnabled?: boolean;
  /** Specifies the type of LDAP server for a given NFS volume. */
  ldapServerType?: LdapServerType;
  /** Specifies whether Cool Access(tiering) is enabled for the volume. */
  coolAccess?: boolean;
  /** Specifies the number of days after which data that is not accessed by clients will be tiered. */
  coolnessPeriod?: number;
  /**
   * coolAccessRetrievalPolicy determines the data retrieval behavior from the cool tier to standard storage based on the read pattern for cool access enabled volumes. The possible values for this field are:
   * Default - Data will be pulled from cool tier to standard storage on random reads. This policy is the default.
   * OnRead - All client-driven data read is pulled from cool tier to standard storage on both sequential and random reads.
   * Never - No client-driven data is pulled from cool tier to standard storage.
   */
  coolAccessRetrievalPolicy?: CoolAccessRetrievalPolicy;
  /** coolAccessTieringPolicy determines which cold data blocks are moved to cool tier. The possible values for this field are: Auto - Moves cold user data blocks in both the Snapshot copies and the active file system to the cool tier tier. This policy is the default. SnapshotOnly - Moves user data blocks of the Volume Snapshot copies that are not associated with the active file system to the cool tier. */
  coolAccessTieringPolicy?: CoolAccessTieringPolicy;
  /** UNIX permissions for NFS volume accepted in octal 4 digit format. First digit selects the set user ID(4), set group ID (2) and sticky (1) attributes. Second digit selects permission for the owner of the file: read (4), write (2) and execute (1). Third selects permissions for other users in the same group. the fourth for other users not in the group. 0755 - gives read/write/execute permissions to owner and read/execute to group and other users. */
  unixPermissions?: string | null;
  /** When a volume is being restored from another volume's snapshot, will show the percentage completion of this cloning process. When this value is empty/null there is no cloning process currently happening on this volume. This value will update every 5 minutes during cloning. */
  readonly cloneProgress?: number | null;
  /** Flag indicating whether file access logs are enabled for the volume, based on active diagnostic settings present on the volume. */
  readonly fileAccessLogs?: FileAccessLogs;
  /** Specifies whether the volume is enabled for Azure VMware Solution (AVS) datastore purpose */
  avsDataStore?: AvsDataStore;
  /** Data store resource unique identifier */
  readonly dataStoreResourceId?: string[];
  /** Specifies if default quota is enabled for the volume. */
  isDefaultQuotaEnabled?: boolean;
  /** Default user quota for volume in KiBs. If isDefaultQuotaEnabled is set, the minimum value of 4 KiBs applies . */
  defaultUserQuotaInKiBs?: number;
  /** Default group quota for volume in KiBs. If isDefaultQuotaEnabled is set, the minimum value of 4 KiBs applies. */
  defaultGroupQuotaInKiBs?: number;
  /** Maximum number of files allowed. Needs a service request in order to be changed. Only allowed to be changed if volume quota is more than 4TiB. */
  readonly maximumNumberOfFiles?: number;
  /** Volume Group Name */
  readonly volumeGroupName?: string;
  /** Pool Resource Id used in case of creating a volume through volume group */
  capacityPoolResourceId?: string;
  /** Proximity placement group associated with the volume */
  proximityPlacementGroup?: string;
  /** T2 network information */
  readonly t2Network?: string;
  /** Volume spec name is the application specific designation or identifier for the particular volume in a volume group for e.g. data, log */
  volumeSpecName?: string;
  /** Specifies if the volume is encrypted or not. Only available on volumes created or updated after 2022-01-01. */
  readonly encrypted?: boolean;
  /** Application specific placement rules for the particular volume */
  placementRules?: PlacementKeyValuePairs[];
  /** Flag indicating whether subvolume operations are enabled on the volume */
  enableSubvolumes?: EnableSubvolumes;
  /** The availability zone where the volume is provisioned. This refers to the logical availability zone where the volume resides. */
  readonly provisionedAvailabilityZone?: string | null;
  /** Specifies whether volume is a Large Volume or Regular Volume. */
  isLargeVolume?: boolean;
  /** Id of the snapshot or backup that the volume is restored from. */
  readonly originatingResourceId?: string | null;
  /** Space shared by short term clone volume with parent volume in bytes. */
  readonly inheritedSizeInBytes?: number | null;
  /** Language supported for volume. */
  language?: VolumeLanguage;
}

export function volumePropertiesSerializer(item: VolumeProperties): any {
  return {
    creationToken: item["creationToken"],
    serviceLevel: item["serviceLevel"],
    usageThreshold: item["usageThreshold"],
    exportPolicy: !item["exportPolicy"]
      ? item["exportPolicy"]
      : volumePropertiesExportPolicySerializer(item["exportPolicy"]),
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    snapshotId: item["snapshotId"],
    deleteBaseSnapshot: item["deleteBaseSnapshot"],
    backupId: item["backupId"],
    subnetId: item["subnetId"],
    networkFeatures: item["networkFeatures"],
    volumeType: item["volumeType"],
    dataProtection: !item["dataProtection"]
      ? item["dataProtection"]
      : volumePropertiesDataProtectionSerializer(item["dataProtection"]),
    acceptGrowCapacityPoolForShortTermCloneSplit:
      item["acceptGrowCapacityPoolForShortTermCloneSplit"],
    snapshotDirectoryVisible: item["snapshotDirectoryVisible"],
    kerberosEnabled: item["kerberosEnabled"],
    securityStyle: item["securityStyle"],
    smbEncryption: item["smbEncryption"],
    smbAccessBasedEnumeration: item["smbAccessBasedEnumeration"],
    smbNonBrowsable: item["smbNonBrowsable"],
    smbContinuouslyAvailable: item["smbContinuouslyAvailable"],
    throughputMibps: item["throughputMibps"],
    encryptionKeySource: item["encryptionKeySource"],
    keyVaultPrivateEndpointResourceId: item["keyVaultPrivateEndpointResourceId"],
    ldapEnabled: item["ldapEnabled"],
    ldapServerType: item["ldapServerType"],
    coolAccess: item["coolAccess"],
    coolnessPeriod: item["coolnessPeriod"],
    coolAccessRetrievalPolicy: item["coolAccessRetrievalPolicy"],
    coolAccessTieringPolicy: item["coolAccessTieringPolicy"],
    unixPermissions: item["unixPermissions"],
    avsDataStore: item["avsDataStore"],
    isDefaultQuotaEnabled: item["isDefaultQuotaEnabled"],
    defaultUserQuotaInKiBs: item["defaultUserQuotaInKiBs"],
    defaultGroupQuotaInKiBs: item["defaultGroupQuotaInKiBs"],
    capacityPoolResourceId: item["capacityPoolResourceId"],
    proximityPlacementGroup: item["proximityPlacementGroup"],
    volumeSpecName: item["volumeSpecName"],
    placementRules: !item["placementRules"]
      ? item["placementRules"]
      : placementKeyValuePairsArraySerializer(item["placementRules"]),
    enableSubvolumes: item["enableSubvolumes"],
    isLargeVolume: item["isLargeVolume"],
    language: item["language"],
  };
}

export function volumePropertiesDeserializer(item: any): VolumeProperties {
  return {
    fileSystemId: item["fileSystemId"],
    creationToken: item["creationToken"],
    serviceLevel: item["serviceLevel"],
    usageThreshold: item["usageThreshold"],
    exportPolicy: !item["exportPolicy"]
      ? item["exportPolicy"]
      : volumePropertiesExportPolicyDeserializer(item["exportPolicy"]),
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    provisioningState: item["provisioningState"],
    snapshotId: item["snapshotId"],
    deleteBaseSnapshot: item["deleteBaseSnapshot"],
    backupId: item["backupId"],
    baremetalTenantId: item["baremetalTenantId"],
    subnetId: item["subnetId"],
    networkFeatures: item["networkFeatures"],
    effectiveNetworkFeatures: item["effectiveNetworkFeatures"],
    networkSiblingSetId: item["networkSiblingSetId"],
    storageToNetworkProximity: item["storageToNetworkProximity"],
    mountTargets: !item["mountTargets"]
      ? item["mountTargets"]
      : mountTargetPropertiesArrayDeserializer(item["mountTargets"]),
    volumeType: item["volumeType"],
    dataProtection: !item["dataProtection"]
      ? item["dataProtection"]
      : volumePropertiesDataProtectionDeserializer(item["dataProtection"]),
    acceptGrowCapacityPoolForShortTermCloneSplit:
      item["acceptGrowCapacityPoolForShortTermCloneSplit"],
    isRestoring: item["isRestoring"],
    snapshotDirectoryVisible: item["snapshotDirectoryVisible"],
    kerberosEnabled: item["kerberosEnabled"],
    securityStyle: item["securityStyle"],
    smbEncryption: item["smbEncryption"],
    smbAccessBasedEnumeration: item["smbAccessBasedEnumeration"],
    smbNonBrowsable: item["smbNonBrowsable"],
    smbContinuouslyAvailable: item["smbContinuouslyAvailable"],
    throughputMibps: item["throughputMibps"],
    actualThroughputMibps: item["actualThroughputMibps"],
    encryptionKeySource: item["encryptionKeySource"],
    keyVaultPrivateEndpointResourceId: item["keyVaultPrivateEndpointResourceId"],
    ldapEnabled: item["ldapEnabled"],
    ldapServerType: item["ldapServerType"],
    coolAccess: item["coolAccess"],
    coolnessPeriod: item["coolnessPeriod"],
    coolAccessRetrievalPolicy: item["coolAccessRetrievalPolicy"],
    coolAccessTieringPolicy: item["coolAccessTieringPolicy"],
    unixPermissions: item["unixPermissions"],
    cloneProgress: item["cloneProgress"],
    fileAccessLogs: item["fileAccessLogs"],
    avsDataStore: item["avsDataStore"],
    dataStoreResourceId: !item["dataStoreResourceId"]
      ? item["dataStoreResourceId"]
      : item["dataStoreResourceId"].map((p: any) => {
          return p;
        }),
    isDefaultQuotaEnabled: item["isDefaultQuotaEnabled"],
    defaultUserQuotaInKiBs: item["defaultUserQuotaInKiBs"],
    defaultGroupQuotaInKiBs: item["defaultGroupQuotaInKiBs"],
    maximumNumberOfFiles: item["maximumNumberOfFiles"],
    volumeGroupName: item["volumeGroupName"],
    capacityPoolResourceId: item["capacityPoolResourceId"],
    proximityPlacementGroup: item["proximityPlacementGroup"],
    t2Network: item["t2Network"],
    volumeSpecName: item["volumeSpecName"],
    encrypted: item["encrypted"],
    placementRules: !item["placementRules"]
      ? item["placementRules"]
      : placementKeyValuePairsArrayDeserializer(item["placementRules"]),
    enableSubvolumes: item["enableSubvolumes"],
    provisionedAvailabilityZone: item["provisionedAvailabilityZone"],
    isLargeVolume: item["isLargeVolume"],
    originatingResourceId: item["originatingResourceId"],
    inheritedSizeInBytes: item["inheritedSizeInBytes"],
    language: item["language"],
  };
}

/** The service level of the file system */
export enum KnownServiceLevel {
  /** Standard service level */
  Standard = "Standard",
  /** Premium service level */
  Premium = "Premium",
  /** Ultra service level */
  Ultra = "Ultra",
  /** Zone redundant storage service level. This will be deprecated soon. */
  StandardZRS = "StandardZRS",
  /** Flexible service level */
  Flexible = "Flexible",
}

/**
 * The service level of the file system \
 * {@link KnownServiceLevel} can be used interchangeably with ServiceLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Standard**: Standard service level \
 * **Premium**: Premium service level \
 * **Ultra**: Ultra service level \
 * **StandardZRS**: Zone redundant storage service level. This will be deprecated soon. \
 * **Flexible**: Flexible service level
 */
export type ServiceLevel = string;

/** Set of export policy rules */
export interface VolumePropertiesExportPolicy {
  /** Export policy rule */
  rules?: ExportPolicyRule[];
}

export function volumePropertiesExportPolicySerializer(item: VolumePropertiesExportPolicy): any {
  return {
    rules: !item["rules"] ? item["rules"] : exportPolicyRuleArraySerializer(item["rules"]),
  };
}

export function volumePropertiesExportPolicyDeserializer(item: any): VolumePropertiesExportPolicy {
  return {
    rules: !item["rules"] ? item["rules"] : exportPolicyRuleArrayDeserializer(item["rules"]),
  };
}

export function exportPolicyRuleArraySerializer(result: Array<ExportPolicyRule>): any[] {
  return result.map((item) => {
    return exportPolicyRuleSerializer(item);
  });
}

export function exportPolicyRuleArrayDeserializer(result: Array<ExportPolicyRule>): any[] {
  return result.map((item) => {
    return exportPolicyRuleDeserializer(item);
  });
}

/** Volume Export Policy Rule */
export interface ExportPolicyRule {
  /** Order index */
  ruleIndex?: number;
  /** Read only access */
  unixReadOnly?: boolean;
  /** Read and write access */
  unixReadWrite?: boolean;
  /** Kerberos5 Read only access. To be use with swagger version 2020-05-01 or later */
  kerberos5ReadOnly?: boolean;
  /** Kerberos5 Read and write access. To be use with swagger version 2020-05-01 or later */
  kerberos5ReadWrite?: boolean;
  /** Kerberos5i Read only access. To be use with swagger version 2020-05-01 or later */
  kerberos5IReadOnly?: boolean;
  /** Kerberos5i Read and write access. To be use with swagger version 2020-05-01 or later */
  kerberos5IReadWrite?: boolean;
  /** Kerberos5p Read only access. To be use with swagger version 2020-05-01 or later */
  kerberos5PReadOnly?: boolean;
  /** Kerberos5p Read and write access. To be use with swagger version 2020-05-01 or later */
  kerberos5PReadWrite?: boolean;
  /** Allows CIFS protocol */
  cifs?: boolean;
  /** Allows NFSv3 protocol. Enable only for NFSv3 type volumes */
  nfsv3?: boolean;
  /** Allows NFSv4.1 protocol. Enable only for NFSv4.1 type volumes */
  nfsv41?: boolean;
  /** Client ingress specification as comma separated string with IPv4 CIDRs, IPv4 host addresses and host names */
  allowedClients?: string;
  /** Has root access to volume */
  hasRootAccess?: boolean;
  /** This parameter specifies who is authorized to change the ownership of a file. restricted - Only root user can change the ownership of the file. unrestricted - Non-root users can change ownership of files that they own. */
  chownMode?: ChownMode;
}

export function exportPolicyRuleSerializer(item: ExportPolicyRule): any {
  return {
    ruleIndex: item["ruleIndex"],
    unixReadOnly: item["unixReadOnly"],
    unixReadWrite: item["unixReadWrite"],
    kerberos5ReadOnly: item["kerberos5ReadOnly"],
    kerberos5ReadWrite: item["kerberos5ReadWrite"],
    kerberos5iReadOnly: item["kerberos5IReadOnly"],
    kerberos5iReadWrite: item["kerberos5IReadWrite"],
    kerberos5pReadOnly: item["kerberos5PReadOnly"],
    kerberos5pReadWrite: item["kerberos5PReadWrite"],
    cifs: item["cifs"],
    nfsv3: item["nfsv3"],
    nfsv41: item["nfsv41"],
    allowedClients: item["allowedClients"],
    hasRootAccess: item["hasRootAccess"],
    chownMode: item["chownMode"],
  };
}

export function exportPolicyRuleDeserializer(item: any): ExportPolicyRule {
  return {
    ruleIndex: item["ruleIndex"],
    unixReadOnly: item["unixReadOnly"],
    unixReadWrite: item["unixReadWrite"],
    kerberos5ReadOnly: item["kerberos5ReadOnly"],
    kerberos5ReadWrite: item["kerberos5ReadWrite"],
    kerberos5IReadOnly: item["kerberos5iReadOnly"],
    kerberos5IReadWrite: item["kerberos5iReadWrite"],
    kerberos5PReadOnly: item["kerberos5pReadOnly"],
    kerberos5PReadWrite: item["kerberos5pReadWrite"],
    cifs: item["cifs"],
    nfsv3: item["nfsv3"],
    nfsv41: item["nfsv41"],
    allowedClients: item["allowedClients"],
    hasRootAccess: item["hasRootAccess"],
    chownMode: item["chownMode"],
  };
}

/** This parameter specifies who is authorized to change the ownership of a file. restricted - Only root user can change the ownership of the file. unrestricted - Non-root users can change ownership of files that they own. */
export enum KnownChownMode {
  /** Restricted */
  Restricted = "Restricted",
  /** Unrestricted */
  Unrestricted = "Unrestricted",
}

/**
 * This parameter specifies who is authorized to change the ownership of a file. restricted - Only root user can change the ownership of the file. unrestricted - Non-root users can change ownership of files that they own. \
 * {@link KnownChownMode} can be used interchangeably with ChownMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Restricted** \
 * **Unrestricted**
 */
export type ChownMode = string;

/** Network features available to the volume, or current state of update. */
export enum KnownNetworkFeatures {
  /** Basic network features. */
  Basic = "Basic",
  /** Standard network features. */
  Standard = "Standard",
  /** Updating from Basic to Standard network features. */
  BasicStandard = "Basic_Standard",
  /** Updating from Standard to Basic network features. */
  StandardBasic = "Standard_Basic",
}

/**
 * Network features available to the volume, or current state of update. \
 * {@link KnownNetworkFeatures} can be used interchangeably with NetworkFeatures,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Basic**: Basic network features. \
 * **Standard**: Standard network features. \
 * **Basic_Standard**: Updating from Basic to Standard network features. \
 * **Standard_Basic**: Updating from Standard to Basic network features.
 */
export type NetworkFeatures = string;

/** Provides storage to network proximity information for the volume. */
export enum KnownVolumeStorageToNetworkProximity {
  /** Basic storage to network connectivity. */
  Default = "Default",
  /** Standard T1 storage to network connectivity. */
  T1 = "T1",
  /** Standard T2 storage to network connectivity. */
  T2 = "T2",
  /** Standard AcrossT2 storage to network connectivity. */
  AcrossT2 = "AcrossT2",
}

/**
 * Provides storage to network proximity information for the volume. \
 * {@link KnownVolumeStorageToNetworkProximity} can be used interchangeably with VolumeStorageToNetworkProximity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Basic storage to network connectivity. \
 * **T1**: Standard T1 storage to network connectivity. \
 * **T2**: Standard T2 storage to network connectivity. \
 * **AcrossT2**: Standard AcrossT2 storage to network connectivity.
 */
export type VolumeStorageToNetworkProximity = string;

export function mountTargetPropertiesArrayDeserializer(
  result: Array<MountTargetProperties>,
): any[] {
  return result.map((item) => {
    return mountTargetPropertiesDeserializer(item);
  });
}

/** Mount target properties */
export interface MountTargetProperties {
  /** UUID v4 used to identify the MountTarget */
  readonly mountTargetId?: string;
  /** UUID v4 used to identify the MountTarget */
  fileSystemId: string;
  /** The mount target's IPv4 address */
  readonly ipAddress?: string;
  /** The SMB server's Fully Qualified Domain Name, FQDN */
  smbServerFqdn?: string;
}

export function mountTargetPropertiesDeserializer(item: any): MountTargetProperties {
  return {
    mountTargetId: item["mountTargetId"],
    fileSystemId: item["fileSystemId"],
    ipAddress: item["ipAddress"],
    smbServerFqdn: item["smbServerFqdn"],
  };
}

/** DataProtection type volumes include an object containing details of the replication */
export interface VolumePropertiesDataProtection {
  /** Backup Properties */
  backup?: VolumeBackupProperties;
  /** Replication properties */
  replication?: ReplicationObject;
  /** Snapshot properties. */
  snapshot?: VolumeSnapshotProperties;
  /** VolumeRelocation properties */
  volumeRelocation?: VolumeRelocationProperties;
}

export function volumePropertiesDataProtectionSerializer(
  item: VolumePropertiesDataProtection,
): any {
  return {
    backup: !item["backup"] ? item["backup"] : volumeBackupPropertiesSerializer(item["backup"]),
    replication: !item["replication"]
      ? item["replication"]
      : replicationObjectSerializer(item["replication"]),
    snapshot: !item["snapshot"]
      ? item["snapshot"]
      : volumeSnapshotPropertiesSerializer(item["snapshot"]),
    volumeRelocation: !item["volumeRelocation"]
      ? item["volumeRelocation"]
      : volumeRelocationPropertiesSerializer(item["volumeRelocation"]),
  };
}

export function volumePropertiesDataProtectionDeserializer(
  item: any,
): VolumePropertiesDataProtection {
  return {
    backup: !item["backup"] ? item["backup"] : volumeBackupPropertiesDeserializer(item["backup"]),
    replication: !item["replication"]
      ? item["replication"]
      : replicationObjectDeserializer(item["replication"]),
    snapshot: !item["snapshot"]
      ? item["snapshot"]
      : volumeSnapshotPropertiesDeserializer(item["snapshot"]),
    volumeRelocation: !item["volumeRelocation"]
      ? item["volumeRelocation"]
      : volumeRelocationPropertiesDeserializer(item["volumeRelocation"]),
  };
}

/** Volume Backup Properties */
export interface VolumeBackupProperties {
  /** Backup Policy Resource ID */
  backupPolicyId?: string;
  /** Policy Enforced */
  policyEnforced?: boolean;
  /** Backup Vault Resource ID */
  backupVaultId?: string;
}

export function volumeBackupPropertiesSerializer(item: VolumeBackupProperties): any {
  return {
    backupPolicyId: item["backupPolicyId"],
    policyEnforced: item["policyEnforced"],
    backupVaultId: item["backupVaultId"],
  };
}

export function volumeBackupPropertiesDeserializer(item: any): VolumeBackupProperties {
  return {
    backupPolicyId: item["backupPolicyId"],
    policyEnforced: item["policyEnforced"],
    backupVaultId: item["backupVaultId"],
  };
}

/** Replication properties */
export interface ReplicationObject {
  /** Id */
  readonly replicationId?: string;
  /** Indicates whether the local volume is the source or destination for the Volume Replication */
  readonly endpointType?: EndpointType;
  /** Schedule */
  replicationSchedule?: ReplicationSchedule;
  /** The resource ID of the remote volume. Required for cross region and cross zone replication */
  remoteVolumeResourceId?: string;
  /** The full path to a volume that is to be migrated into ANF. Required for Migration volumes */
  remotePath?: RemotePath;
  /** The remote region for the other end of the Volume Replication. */
  remoteVolumeRegion?: string;
  /** A list of destination replications */
  readonly destinationReplications?: DestinationReplication[];
  /** Property that only applies to external replications. Provides a machine-readable value for the status of the external replication setup. */
  readonly externalReplicationSetupStatus?: ExternalReplicationSetupStatus;
  /** Contains human-readable instructions on what the next step is to finish the external replication setup. */
  readonly externalReplicationSetupInfo?: string;
  /** The mirror state property describes the current status of data replication for a replication. It provides insight into whether the data is actively being mirrored, if the replication process has been paused, or if it has yet to be initialized. */
  readonly mirrorState?: MirrorState;
  /** The status of the Volume Replication */
  readonly relationshipStatus?: VolumeReplicationRelationshipStatus;
}

export function replicationObjectSerializer(item: ReplicationObject): any {
  return {
    replicationSchedule: item["replicationSchedule"],
    remoteVolumeResourceId: item["remoteVolumeResourceId"],
    remotePath: !item["remotePath"] ? item["remotePath"] : remotePathSerializer(item["remotePath"]),
    remoteVolumeRegion: item["remoteVolumeRegion"],
  };
}

export function replicationObjectDeserializer(item: any): ReplicationObject {
  return {
    replicationId: item["replicationId"],
    endpointType: item["endpointType"],
    replicationSchedule: item["replicationSchedule"],
    remoteVolumeResourceId: item["remoteVolumeResourceId"],
    remotePath: !item["remotePath"]
      ? item["remotePath"]
      : remotePathDeserializer(item["remotePath"]),
    remoteVolumeRegion: item["remoteVolumeRegion"],
    destinationReplications: !item["destinationReplications"]
      ? item["destinationReplications"]
      : destinationReplicationArrayDeserializer(item["destinationReplications"]),
    externalReplicationSetupStatus: item["externalReplicationSetupStatus"],
    externalReplicationSetupInfo: item["externalReplicationSetupInfo"],
    mirrorState: item["mirrorState"],
    relationshipStatus: item["relationshipStatus"],
  };
}

/** Indicates whether the local volume is the source or destination for the Volume Replication */
export enum KnownEndpointType {
  /** src */
  Src = "src",
  /** dst */
  Dst = "dst",
}

/**
 * Indicates whether the local volume is the source or destination for the Volume Replication \
 * {@link KnownEndpointType} can be used interchangeably with EndpointType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **src** \
 * **dst**
 */
export type EndpointType = string;

/** Schedule */
export enum KnownReplicationSchedule {
  /** _10minutely */
  "10Minutely" = "_10minutely",
  /** hourly */
  Hourly = "hourly",
  /** daily */
  Daily = "daily",
}

/**
 * Schedule \
 * {@link KnownReplicationSchedule} can be used interchangeably with ReplicationSchedule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **_10minutely** \
 * **hourly** \
 * **daily**
 */
export type ReplicationSchedule = string;

/** The full path to a volume that is to be migrated into ANF. Required for Migration volumes */
export interface RemotePath {
  /** The Path to a ONTAP Host */
  externalHostName: string;
  /** The name of a server on the ONTAP Host */
  serverName: string;
  /** The name of a volume on the server */
  volumeName: string;
}

export function remotePathSerializer(item: RemotePath): any {
  return {
    externalHostName: item["externalHostName"],
    serverName: item["serverName"],
    volumeName: item["volumeName"],
  };
}

export function remotePathDeserializer(item: any): RemotePath {
  return {
    externalHostName: item["externalHostName"],
    serverName: item["serverName"],
    volumeName: item["volumeName"],
  };
}

export function destinationReplicationArrayDeserializer(
  result: Array<DestinationReplication>,
): any[] {
  return result.map((item) => {
    return destinationReplicationDeserializer(item);
  });
}

/** Destination replication properties */
export interface DestinationReplication {
  /** The resource ID of the remote volume */
  resourceId?: string;
  /** Indicates whether the replication is cross zone or cross region. */
  replicationType?: ReplicationType;
  /** The remote region for the destination volume. */
  region?: string;
  /** The remote zone for the destination volume. */
  zone?: string;
}

export function destinationReplicationDeserializer(item: any): DestinationReplication {
  return {
    resourceId: item["resourceId"],
    replicationType: item["replicationType"],
    region: item["region"],
    zone: item["zone"],
  };
}

/** Indicates whether the replication is cross zone or cross region. */
export enum KnownReplicationType {
  /** Cross region replication */
  CrossRegionReplication = "CrossRegionReplication",
  /** Cross zone replication */
  CrossZoneReplication = "CrossZoneReplication",
}

/**
 * Indicates whether the replication is cross zone or cross region. \
 * {@link KnownReplicationType} can be used interchangeably with ReplicationType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **CrossRegionReplication**: Cross region replication \
 * **CrossZoneReplication**: Cross zone replication
 */
export type ReplicationType = string;

/** Property that only applies to external replications. Provides a machine-readable value for the status of the external replication setup. */
export enum KnownExternalReplicationSetupStatus {
  /** Your cluster needs to be peered by using the 'peerExternalCluster' action */
  ClusterPeerRequired = "ClusterPeerRequired",
  /** The peering needs to be accepted on your cluster before the setup can proceed */
  ClusterPeerPending = "ClusterPeerPending",
  /** Need to call 'authorizeExternalReplication' and accept the returned 'vserver peer accept' command on your cluster to finish setting up the external replication */
  VServerPeerRequired = "VServerPeerRequired",
  /** Need to call 'authorizeExternalReplication' to finish setting up the external replication */
  ReplicationCreateRequired = "ReplicationCreateRequired",
  /** External Replication setup is complete, you can now monitor the 'mirrorState' in the replication status for the health of the replication */
  NoActionRequired = "NoActionRequired",
}

/**
 * Property that only applies to external replications. Provides a machine-readable value for the status of the external replication setup. \
 * {@link KnownExternalReplicationSetupStatus} can be used interchangeably with ExternalReplicationSetupStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClusterPeerRequired**: Your cluster needs to be peered by using the 'peerExternalCluster' action \
 * **ClusterPeerPending**: The peering needs to be accepted on your cluster before the setup can proceed \
 * **VServerPeerRequired**: Need to call 'authorizeExternalReplication' and accept the returned 'vserver peer accept' command on your cluster to finish setting up the external replication \
 * **ReplicationCreateRequired**: Need to call 'authorizeExternalReplication' to finish setting up the external replication \
 * **NoActionRequired**: External Replication setup is complete, you can now monitor the 'mirrorState' in the replication status for the health of the replication
 */
export type ExternalReplicationSetupStatus = string;

/** The status of the replication */
export enum KnownMirrorState {
  /** Uninitialized */
  Uninitialized = "Uninitialized",
  /** Mirrored */
  Mirrored = "Mirrored",
  /** Broken */
  Broken = "Broken",
}

/**
 * The status of the replication \
 * {@link KnownMirrorState} can be used interchangeably with MirrorState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Uninitialized** \
 * **Mirrored** \
 * **Broken**
 */
export type MirrorState = string;

/** Status of the volume replication relationship */
export enum KnownVolumeReplicationRelationshipStatus {
  /** Idle */
  Idle = "Idle",
  /** Transferring */
  Transferring = "Transferring",
}

/**
 * Status of the volume replication relationship \
 * {@link KnownVolumeReplicationRelationshipStatus} can be used interchangeably with VolumeReplicationRelationshipStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Idle** \
 * **Transferring**
 */
export type VolumeReplicationRelationshipStatus = string;

/** Volume Snapshot Properties */
export interface VolumeSnapshotProperties {
  /** Snapshot Policy ResourceId */
  snapshotPolicyId?: string;
}

export function volumeSnapshotPropertiesSerializer(item: VolumeSnapshotProperties): any {
  return { snapshotPolicyId: item["snapshotPolicyId"] };
}

export function volumeSnapshotPropertiesDeserializer(item: any): VolumeSnapshotProperties {
  return {
    snapshotPolicyId: item["snapshotPolicyId"],
  };
}

/** Volume relocation properties */
export interface VolumeRelocationProperties {
  /** Has relocation been requested for this volume */
  relocationRequested?: boolean;
  /** Has relocation finished and is ready to be cleaned up */
  readonly readyToBeFinalized?: boolean;
}

export function volumeRelocationPropertiesSerializer(item: VolumeRelocationProperties): any {
  return { relocationRequested: item["relocationRequested"] };
}

export function volumeRelocationPropertiesDeserializer(item: any): VolumeRelocationProperties {
  return {
    relocationRequested: item["relocationRequested"],
    readyToBeFinalized: item["readyToBeFinalized"],
  };
}

/** While auto splitting the short term clone volume, if the parent pool does not have enough space to accommodate the volume after split, it will be automatically resized, which will lead to increased billing. To accept capacity pool size auto grow and create a short term clone volume, set the property as accepted. */
export enum KnownAcceptGrowCapacityPoolForShortTermCloneSplit {
  /** Auto grow capacity pool for short term clone split is accepted. */
  Accepted = "Accepted",
  /** Auto grow capacity pool for short term clone split is declined. Short term clone volume creation will not be allowed, to create short term clone volume accept auto grow capacity pool. */
  Declined = "Declined",
}

/**
 * While auto splitting the short term clone volume, if the parent pool does not have enough space to accommodate the volume after split, it will be automatically resized, which will lead to increased billing. To accept capacity pool size auto grow and create a short term clone volume, set the property as accepted. \
 * {@link KnownAcceptGrowCapacityPoolForShortTermCloneSplit} can be used interchangeably with AcceptGrowCapacityPoolForShortTermCloneSplit,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Auto grow capacity pool for short term clone split is accepted. \
 * **Declined**: Auto grow capacity pool for short term clone split is declined. Short term clone volume creation will not be allowed, to create short term clone volume accept auto grow capacity pool.
 */
export type AcceptGrowCapacityPoolForShortTermCloneSplit = string;

/** The security style of volume, default unix, defaults to ntfs for dual protocol or CIFS protocol */
export enum KnownSecurityStyle {
  /** ntfs */
  Ntfs = "ntfs",
  /** unix */
  Unix = "unix",
}

/**
 * The security style of volume, default unix, defaults to ntfs for dual protocol or CIFS protocol \
 * {@link KnownSecurityStyle} can be used interchangeably with SecurityStyle,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ntfs** \
 * **unix**
 */
export type SecurityStyle = string;

/** Enables access-based enumeration share property for SMB Shares. Only applicable for SMB/DualProtocol volume */
export enum KnownSmbAccessBasedEnumeration {
  /** smbAccessBasedEnumeration share setting is disabled */
  Disabled = "Disabled",
  /** smbAccessBasedEnumeration share setting is enabled */
  Enabled = "Enabled",
}

/**
 * Enables access-based enumeration share property for SMB Shares. Only applicable for SMB/DualProtocol volume \
 * {@link KnownSmbAccessBasedEnumeration} can be used interchangeably with SmbAccessBasedEnumeration,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: smbAccessBasedEnumeration share setting is disabled \
 * **Enabled**: smbAccessBasedEnumeration share setting is enabled
 */
export type SmbAccessBasedEnumeration = string;

/** Enables non-browsable property for SMB Shares. Only applicable for SMB/DualProtocol volume */
export enum KnownSmbNonBrowsable {
  /** smbNonBrowsable share setting is disabled */
  Disabled = "Disabled",
  /** smbNonBrowsable share setting is enabled */
  Enabled = "Enabled",
}

/**
 * Enables non-browsable property for SMB Shares. Only applicable for SMB/DualProtocol volume \
 * {@link KnownSmbNonBrowsable} can be used interchangeably with SmbNonBrowsable,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: smbNonBrowsable share setting is disabled \
 * **Enabled**: smbNonBrowsable share setting is enabled
 */
export type SmbNonBrowsable = string;

/** Source of key used to encrypt data in volume. Applicable if NetApp account has encryption.keySource = 'Microsoft.KeyVault'. Possible values (case-insensitive) are: 'Microsoft.NetApp, Microsoft.KeyVault' */
export enum KnownEncryptionKeySource {
  /** Microsoft-managed key encryption */
  MicrosoftNetApp = "Microsoft.NetApp",
  /** Customer-managed key encryption */
  MicrosoftKeyVault = "Microsoft.KeyVault",
}

/**
 * Source of key used to encrypt data in volume. Applicable if NetApp account has encryption.keySource = 'Microsoft.KeyVault'. Possible values (case-insensitive) are: 'Microsoft.NetApp, Microsoft.KeyVault' \
 * {@link KnownEncryptionKeySource} can be used interchangeably with EncryptionKeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.NetApp**: Microsoft-managed key encryption \
 * **Microsoft.KeyVault**: Customer-managed key encryption
 */
export type EncryptionKeySource = string;

/** The type of the LDAP server */
export enum KnownLdapServerType {
  /** The volume should use Active Directory for LDAP connections. */
  ActiveDirectory = "ActiveDirectory",
  /** The volume should use OpenLDAP for LDAP connections. */
  OpenLdap = "OpenLDAP",
}

/**
 * The type of the LDAP server \
 * {@link KnownLdapServerType} can be used interchangeably with LdapServerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ActiveDirectory**: The volume should use Active Directory for LDAP connections. \
 * **OpenLDAP**: The volume should use OpenLDAP for LDAP connections.
 */
export type LdapServerType = string;

/**
 * coolAccessRetrievalPolicy determines the data retrieval behavior from the cool tier to standard storage based on the read pattern for cool access enabled volumes. The possible values for this field are:
 * Default - Data will be pulled from cool tier to standard storage on random reads. This policy is the default.
 * OnRead - All client-driven data read is pulled from cool tier to standard storage on both sequential and random reads.
 * Never - No client-driven data is pulled from cool tier to standard storage.
 */
export enum KnownCoolAccessRetrievalPolicy {
  /** Default */
  Default = "Default",
  /** OnRead */
  OnRead = "OnRead",
  /** Never */
  Never = "Never",
}

/**
 * coolAccessRetrievalPolicy determines the data retrieval behavior from the cool tier to standard storage based on the read pattern for cool access enabled volumes. The possible values for this field are:
 * Default - Data will be pulled from cool tier to standard storage on random reads. This policy is the default.
 * OnRead - All client-driven data read is pulled from cool tier to standard storage on both sequential and random reads.
 * Never - No client-driven data is pulled from cool tier to standard storage. \
 * {@link KnownCoolAccessRetrievalPolicy} can be used interchangeably with CoolAccessRetrievalPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default** \
 * **OnRead** \
 * **Never**
 */
export type CoolAccessRetrievalPolicy = string;

/** coolAccessTieringPolicy determines which cold data blocks are moved to cool tier. The possible values for this field are: Auto - Moves cold user data blocks in both the Snapshot copies and the active file system to the cool tier tier. This policy is the default. SnapshotOnly - Moves user data blocks of the Volume Snapshot copies that are not associated with the active file system to the cool tier. */
export enum KnownCoolAccessTieringPolicy {
  /** Auto */
  Auto = "Auto",
  /** SnapshotOnly */
  SnapshotOnly = "SnapshotOnly",
}

/**
 * coolAccessTieringPolicy determines which cold data blocks are moved to cool tier. The possible values for this field are: Auto - Moves cold user data blocks in both the Snapshot copies and the active file system to the cool tier tier. This policy is the default. SnapshotOnly - Moves user data blocks of the Volume Snapshot copies that are not associated with the active file system to the cool tier. \
 * {@link KnownCoolAccessTieringPolicy} can be used interchangeably with CoolAccessTieringPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto** \
 * **SnapshotOnly**
 */
export type CoolAccessTieringPolicy = string;

/** Flag indicating whether file access logs are enabled for the volume, based on active diagnostic settings present on the volume. */
export enum KnownFileAccessLogs {
  /** fileAccessLogs are enabled */
  Enabled = "Enabled",
  /** fileAccessLogs are not enabled */
  Disabled = "Disabled",
}

/**
 * Flag indicating whether file access logs are enabled for the volume, based on active diagnostic settings present on the volume. \
 * {@link KnownFileAccessLogs} can be used interchangeably with FileAccessLogs,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: fileAccessLogs are enabled \
 * **Disabled**: fileAccessLogs are not enabled
 */
export type FileAccessLogs = string;

/** Specifies whether the volume is enabled for Azure VMware Solution (AVS) datastore purpose */
export enum KnownAvsDataStore {
  /** avsDataStore is enabled */
  Enabled = "Enabled",
  /** avsDataStore is disabled */
  Disabled = "Disabled",
}

/**
 * Specifies whether the volume is enabled for Azure VMware Solution (AVS) datastore purpose \
 * {@link KnownAvsDataStore} can be used interchangeably with AvsDataStore,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: avsDataStore is enabled \
 * **Disabled**: avsDataStore is disabled
 */
export type AvsDataStore = string;

/** Flag indicating whether subvolume operations are enabled on the volume */
export enum KnownEnableSubvolumes {
  /** subvolumes are enabled */
  Enabled = "Enabled",
  /** subvolumes are not enabled */
  Disabled = "Disabled",
}

/**
 * Flag indicating whether subvolume operations are enabled on the volume \
 * {@link KnownEnableSubvolumes} can be used interchangeably with EnableSubvolumes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: subvolumes are enabled \
 * **Disabled**: subvolumes are not enabled
 */
export type EnableSubvolumes = string;

/** Language supported for volume. */
export enum KnownVolumeLanguage {
  /** Posix with UTF-8 */
  CUtf8 = "c.utf-8",
  /** UTF-8 with 4 byte character support */
  Utf8Mb4 = "utf8mb4",
  /** Arabic - Deprecated */
  Ar = "ar",
  /** Arabic with UTF-8 */
  ArUtf8 = "ar.utf-8",
  /** Croatian - Deprecated */
  Hr = "hr",
  /** Croatian with UTF-8 */
  HrUtf8 = "hr.utf-8",
  /** Czech - Deprecated */
  Cs = "cs",
  /** Czech with UTF-8 */
  CsUtf8 = "cs.utf-8",
  /** Danish - Deprecated */
  Da = "da",
  /** Danish with UTF-8 */
  DaUtf8 = "da.utf-8",
  /** Dutch - Deprecated */
  Nl = "nl",
  /** Dutch with UTF-8 */
  NlUtf8 = "nl.utf-8",
  /** English - Deprecated */
  En = "en",
  /** English with UTF-8 */
  EnUtf8 = "en.utf-8",
  /** Finnish - Deprecated */
  Fi = "fi",
  /** Finnish with UTF-8 */
  FiUtf8 = "fi.utf-8",
  /** French - Deprecated */
  Fr = "fr",
  /** French with UTF-8 */
  FrUtf8 = "fr.utf-8",
  /** German - Deprecated */
  De = "de",
  /** German with UTF-8 */
  DeUtf8 = "de.utf-8",
  /** Hebrew - Deprecated */
  He = "he",
  /** Hebrew with UTF-8 */
  HeUtf8 = "he.utf-8",
  /** Hungarian - Deprecated */
  Hu = "hu",
  /** Hungarian with UTF-8 */
  HuUtf8 = "hu.utf-8",
  /** Italian - Deprecated */
  It = "it",
  /** Italian with UTF-8 */
  ItUtf8 = "it.utf-8",
  /** Japanese euc-j - Deprecated */
  Ja = "ja",
  /** Japanese euc-j with UTF-8 */
  JaUtf8 = "ja.utf-8",
  /** Japanese euc-j - Deprecated */
  JaV1 = "ja-v1",
  /** Japanese euc-j with UTF-8 */
  JaV1Utf8 = "ja-v1.utf-8",
  /** Japanese pck */
  JaJpPck = "ja-jp.pck",
  /** Japanese pck with UTF-8 - Deprecated */
  JaJpPckUtf8 = "ja-jp.pck.utf-8",
  /** Japanese cp932 */
  JaJp932 = "ja-jp.932",
  /** Japanese cp932 with UTF-8 - Deprecated */
  JaJp932Utf8 = "ja-jp.932.utf-8",
  /** Japanese pck - sjis */
  JaJpPckV2 = "ja-jp.pck-v2",
  /** Japanese pck - sjis with UTF-8 - Deprecated */
  JaJpPckV2Utf8 = "ja-jp.pck-v2.utf-8",
  /** Korean - Deprecated */
  Ko = "ko",
  /** Korean with UTF-8 */
  KoUtf8 = "ko.utf-8",
  /** Norwegian - Deprecated */
  No = "no",
  /** Norwegian with UTF-8 */
  NoUtf8 = "no.utf-8",
  /** Polish - Deprecated */
  Pl = "pl",
  /** Polish with UTF-8 */
  PlUtf8 = "pl.utf-8",
  /** Portuguese - Deprecated */
  Pt = "pt",
  /** Portuguese with UTF-8 */
  PtUtf8 = "pt.utf-8",
  /** Posix - Deprecated */
  C = "c",
  /** Romanian - Deprecated */
  Ro = "ro",
  /** Romanian with UTF-8 */
  RoUtf8 = "ro.utf-8",
  /** Russian - Deprecated */
  Ru = "ru",
  /** Russian with UTF-8 */
  RuUtf8 = "ru.utf-8",
  /** Simplified Chinese - Deprecated */
  Zh = "zh",
  /** Simplified Chinese with UTF-8 */
  ZhUtf8 = "zh.utf-8",
  /** Simplified gbk Chinese */
  ZhGbk = "zh.gbk",
  /** Simplified gbk Chinese with UTF-8 - Deprecated */
  ZhGbkUtf8 = "zh.gbk.utf-8",
  /** Traditional Chinese BIG 5 */
  ZhTwBig5 = "zh-tw.big5",
  /** Traditional Chinese BIG 5 with UTF-8 - Deprecated */
  ZhTwBig5Utf8 = "zh-tw.big5.utf-8",
  /** Traditional Chinese EUC-TW */
  ZhTw = "zh-tw",
  /** Traditional Chinese EUC-TW with UTF-8 - Deprecated */
  ZhTwUtf8 = "zh-tw.utf-8",
  /** Slovak - Deprecated */
  Sk = "sk",
  /** Slovak with UTF-8 */
  SkUtf8 = "sk.utf-8",
  /** Slovenian - Deprecated */
  Sl = "sl",
  /** Slovenian with UTF-8 */
  SlUtf8 = "sl.utf-8",
  /** Spanish - Deprecated */
  Es = "es",
  /** Spanish with UTF-8 */
  EsUtf8 = "es.utf-8",
  /** Swedish - Deprecated */
  Sv = "sv",
  /** Swedish with UTF-8 */
  SvUtf8 = "sv.utf-8",
  /** Turkish - Deprecated */
  Tr = "tr",
  /** Turkish with UTF-8 */
  TrUtf8 = "tr.utf-8",
  /** US English - Deprecated */
  EnUs = "en-us",
  /** US English with UTF-8 */
  EnUsUtf8 = "en-us.utf-8",
}

/**
 * Language supported for volume. \
 * {@link KnownVolumeLanguage} can be used interchangeably with VolumeLanguage,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **c.utf-8**: Posix with UTF-8 \
 * **utf8mb4**: UTF-8 with 4 byte character support \
 * **ar**: Arabic - Deprecated \
 * **ar.utf-8**: Arabic with UTF-8 \
 * **hr**: Croatian - Deprecated \
 * **hr.utf-8**: Croatian with UTF-8 \
 * **cs**: Czech - Deprecated \
 * **cs.utf-8**: Czech with UTF-8 \
 * **da**: Danish - Deprecated \
 * **da.utf-8**: Danish with UTF-8 \
 * **nl**: Dutch - Deprecated \
 * **nl.utf-8**: Dutch with UTF-8 \
 * **en**: English - Deprecated \
 * **en.utf-8**: English with UTF-8 \
 * **fi**: Finnish - Deprecated \
 * **fi.utf-8**: Finnish with UTF-8 \
 * **fr**: French - Deprecated \
 * **fr.utf-8**: French with UTF-8 \
 * **de**: German - Deprecated \
 * **de.utf-8**: German with UTF-8 \
 * **he**: Hebrew - Deprecated \
 * **he.utf-8**: Hebrew with UTF-8 \
 * **hu**: Hungarian - Deprecated \
 * **hu.utf-8**: Hungarian with UTF-8 \
 * **it**: Italian - Deprecated \
 * **it.utf-8**: Italian with UTF-8 \
 * **ja**: Japanese euc-j - Deprecated \
 * **ja.utf-8**: Japanese euc-j with UTF-8 \
 * **ja-v1**: Japanese euc-j - Deprecated \
 * **ja-v1.utf-8**: Japanese euc-j with UTF-8 \
 * **ja-jp.pck**: Japanese pck \
 * **ja-jp.pck.utf-8**: Japanese pck with UTF-8 - Deprecated \
 * **ja-jp.932**: Japanese cp932 \
 * **ja-jp.932.utf-8**: Japanese cp932 with UTF-8 - Deprecated \
 * **ja-jp.pck-v2**: Japanese pck - sjis \
 * **ja-jp.pck-v2.utf-8**: Japanese pck - sjis with UTF-8 - Deprecated \
 * **ko**: Korean - Deprecated \
 * **ko.utf-8**: Korean with UTF-8 \
 * **no**: Norwegian - Deprecated \
 * **no.utf-8**: Norwegian with UTF-8 \
 * **pl**: Polish - Deprecated \
 * **pl.utf-8**: Polish with UTF-8 \
 * **pt**: Portuguese - Deprecated \
 * **pt.utf-8**: Portuguese with UTF-8 \
 * **c**: Posix - Deprecated \
 * **ro**: Romanian - Deprecated \
 * **ro.utf-8**: Romanian with UTF-8 \
 * **ru**: Russian - Deprecated \
 * **ru.utf-8**: Russian with UTF-8 \
 * **zh**: Simplified Chinese - Deprecated \
 * **zh.utf-8**: Simplified Chinese with UTF-8 \
 * **zh.gbk**: Simplified gbk Chinese \
 * **zh.gbk.utf-8**: Simplified gbk Chinese with UTF-8 - Deprecated \
 * **zh-tw.big5**: Traditional Chinese BIG 5 \
 * **zh-tw.big5.utf-8**: Traditional Chinese BIG 5 with UTF-8 - Deprecated \
 * **zh-tw**: Traditional Chinese EUC-TW \
 * **zh-tw.utf-8**: Traditional Chinese EUC-TW with UTF-8 - Deprecated \
 * **sk**: Slovak - Deprecated \
 * **sk.utf-8**: Slovak with UTF-8 \
 * **sl**: Slovenian - Deprecated \
 * **sl.utf-8**: Slovenian with UTF-8 \
 * **es**: Spanish - Deprecated \
 * **es.utf-8**: Spanish with UTF-8 \
 * **sv**: Swedish - Deprecated \
 * **sv.utf-8**: Swedish with UTF-8 \
 * **tr**: Turkish - Deprecated \
 * **tr.utf-8**: Turkish with UTF-8 \
 * **en-us**: US English - Deprecated \
 * **en-us.utf-8**: US English with UTF-8
 */
export type VolumeLanguage = string;

/** List of volume group resources */
export interface _VolumeGroupList {
  /** The VolumeGroup items on this page */
  value: VolumeGroup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _volumeGroupListDeserializer(item: any): _VolumeGroupList {
  return {
    value: volumeGroupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function volumeGroupArrayDeserializer(result: Array<VolumeGroup>): any[] {
  return result.map((item) => {
    return volumeGroupDeserializer(item);
  });
}

/** Volume group resource */
export interface VolumeGroup {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Volume group properties */
  properties?: VolumeGroupListProperties;
}

export function volumeGroupDeserializer(item: any): VolumeGroup {
  return {
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : volumeGroupListPropertiesDeserializer(item["properties"]),
  };
}

/** Volume group properties */
export interface VolumeGroupListProperties {
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Volume group details */
  groupMetaData?: VolumeGroupMetaData;
}

export function volumeGroupListPropertiesDeserializer(item: any): VolumeGroupListProperties {
  return {
    provisioningState: item["provisioningState"],
    groupMetaData: !item["groupMetaData"]
      ? item["groupMetaData"]
      : volumeGroupMetaDataDeserializer(item["groupMetaData"]),
  };
}

/** Backup under a Backup Vault */
export interface Backup extends ProxyResource {
  /** Backup Properties */
  properties: BackupProperties;
}

export function backupSerializer(item: Backup): any {
  return { properties: backupPropertiesSerializer(item["properties"]) };
}

export function backupDeserializer(item: any): Backup {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: backupPropertiesDeserializer(item["properties"]),
  };
}

/** Backup properties */
export interface BackupProperties {
  /** UUID v4 used to identify the Backup */
  readonly backupId?: string;
  /** The creation date of the backup */
  readonly creationDate?: Date;
  /** The snapshot creation date of the backup */
  readonly snapshotCreationDate?: Date | null;
  /** The completion date of the backup */
  readonly completionDate?: Date | null;
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Size of backup in bytes */
  readonly size?: number;
  /** Label for backup */
  label?: string;
  /** Type of backup Manual or Scheduled */
  readonly backupType?: BackupType;
  /** Failure reason */
  readonly failureReason?: string;
  /** ResourceId used to identify the Volume */
  volumeResourceId: string;
  /** Manual backup an already existing snapshot. This will always be false for scheduled backups and true/false for manual backups */
  useExistingSnapshot?: boolean;
  /** The name of the snapshot */
  snapshotName?: string;
  /** ResourceId used to identify the backup policy */
  readonly backupPolicyResourceId?: string;
  /** Specifies if the backup is for a large volume. */
  readonly isLargeVolume?: boolean;
}

export function backupPropertiesSerializer(item: BackupProperties): any {
  return {
    label: item["label"],
    volumeResourceId: item["volumeResourceId"],
    useExistingSnapshot: item["useExistingSnapshot"],
    snapshotName: item["snapshotName"],
  };
}

export function backupPropertiesDeserializer(item: any): BackupProperties {
  return {
    backupId: item["backupId"],
    creationDate: !item["creationDate"] ? item["creationDate"] : new Date(item["creationDate"]),
    snapshotCreationDate: !item["snapshotCreationDate"]
      ? item["snapshotCreationDate"]
      : new Date(item["snapshotCreationDate"]),
    completionDate: !item["completionDate"]
      ? item["completionDate"]
      : new Date(item["completionDate"]),
    provisioningState: item["provisioningState"],
    size: item["size"],
    label: item["label"],
    backupType: item["backupType"],
    failureReason: item["failureReason"],
    volumeResourceId: item["volumeResourceId"],
    useExistingSnapshot: item["useExistingSnapshot"],
    snapshotName: item["snapshotName"],
    backupPolicyResourceId: item["backupPolicyResourceId"],
    isLargeVolume: item["isLargeVolume"],
  };
}

/** Type of backup Manual or Scheduled */
export enum KnownBackupType {
  /** Manual backup */
  Manual = "Manual",
  /** Scheduled backup */
  Scheduled = "Scheduled",
}

/**
 * Type of backup Manual or Scheduled \
 * {@link KnownBackupType} can be used interchangeably with BackupType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Manual backup \
 * **Scheduled**: Scheduled backup
 */
export type BackupType = string;

/** Backup patch */
export interface BackupPatch {
  /** Backup Patch Properties */
  properties?: BackupPatchProperties;
}

export function backupPatchSerializer(item: BackupPatch): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : backupPatchPropertiesSerializer(item["properties"]),
  };
}

/** Backup patch properties */
export interface BackupPatchProperties {
  /** Label for backup */
  label?: string;
}

export function backupPatchPropertiesSerializer(item: BackupPatchProperties): any {
  return { label: item["label"] };
}

/** List of Backups */
export interface _BackupsList {
  /** The Backup items on this page */
  value: Backup[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _backupsListDeserializer(item: any): _BackupsList {
  return {
    value: backupArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupArraySerializer(result: Array<Backup>): any[] {
  return result.map((item) => {
    return backupSerializer(item);
  });
}

export function backupArrayDeserializer(result: Array<Backup>): any[] {
  return result.map((item) => {
    return backupDeserializer(item);
  });
}

/** Backup status */
export interface BackupStatus {
  /** Backup health status */
  readonly healthy?: boolean;
  /** Status of the backup mirror relationship */
  readonly relationshipStatus?: VolumeBackupRelationshipStatus;
  /** The status of the backup */
  readonly mirrorState?: MirrorState;
  /** Reason for the unhealthy backup relationship */
  readonly unhealthyReason?: string;
  /** Displays error message if the backup is in an error state */
  readonly errorMessage?: string;
  /** Displays the last transfer size */
  readonly lastTransferSize?: number;
  /** Displays the last transfer type */
  readonly lastTransferType?: string;
  /** Displays the total bytes transferred */
  readonly totalTransferBytes?: number;
  /** Displays the total number of bytes transferred for the ongoing operation */
  readonly transferProgressBytes?: number;
}

export function backupStatusDeserializer(item: any): BackupStatus {
  return {
    healthy: item["healthy"],
    relationshipStatus: item["relationshipStatus"],
    mirrorState: item["mirrorState"],
    unhealthyReason: item["unhealthyReason"],
    errorMessage: item["errorMessage"],
    lastTransferSize: item["lastTransferSize"],
    lastTransferType: item["lastTransferType"],
    totalTransferBytes: item["totalTransferBytes"],
    transferProgressBytes: item["transferProgressBytes"],
  };
}

/** Status of the volume backup relationship */
export enum KnownVolumeBackupRelationshipStatus {
  /** Idle */
  Idle = "Idle",
  /** Transferring */
  Transferring = "Transferring",
  /** Failed */
  Failed = "Failed",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Status of the volume backup relationship \
 * {@link KnownVolumeBackupRelationshipStatus} can be used interchangeably with VolumeBackupRelationshipStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Idle** \
 * **Transferring** \
 * **Failed** \
 * **Unknown**
 */
export type VolumeBackupRelationshipStatus = string;

/** Restore status */
export interface RestoreStatus {
  /** Restore health status */
  readonly healthy?: boolean;
  /** Status of the restore SnapMirror relationship */
  readonly relationshipStatus?: VolumeRestoreRelationshipStatus;
  /** The status of the restore */
  readonly mirrorState?: MirrorState;
  /** Reason for the unhealthy restore relationship */
  readonly unhealthyReason?: string;
  /** Displays error message if the restore is in an error state */
  readonly errorMessage?: string;
  /** Displays the total bytes transferred */
  readonly totalTransferBytes?: number;
}

export function restoreStatusDeserializer(item: any): RestoreStatus {
  return {
    healthy: item["healthy"],
    relationshipStatus: item["relationshipStatus"],
    mirrorState: item["mirrorState"],
    unhealthyReason: item["unhealthyReason"],
    errorMessage: item["errorMessage"],
    totalTransferBytes: item["totalTransferBytes"],
  };
}

/** Status of the volume restore relationship */
export enum KnownVolumeRestoreRelationshipStatus {
  /** Idle */
  Idle = "Idle",
  /** Transferring */
  Transferring = "Transferring",
  /** Failed */
  Failed = "Failed",
  /** Unknown */
  Unknown = "Unknown",
}

/**
 * Status of the volume restore relationship \
 * {@link KnownVolumeRestoreRelationshipStatus} can be used interchangeably with VolumeRestoreRelationshipStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Idle** \
 * **Transferring** \
 * **Failed** \
 * **Unknown**
 */
export type VolumeRestoreRelationshipStatus = string;

/** Volume resource */
export interface Volume extends TrackedResource {
  /** Volume properties */
  properties: VolumeProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The availability zones. */
  zones?: string[];
}

export function volumeSerializer(item: Volume): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: volumePropertiesSerializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

export function volumeDeserializer(item: any): Volume {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: volumePropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
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
    tags: item["tags"],
    location: item["location"],
  };
}

/** Volume patch resource */
export interface VolumePatch {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Patchable volume properties */
  properties?: VolumePatchProperties;
}

export function volumePatchSerializer(item: VolumePatch): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : volumePatchPropertiesSerializer(item["properties"]),
  };
}

/** Patchable volume properties */
export interface VolumePatchProperties {
  /** The service level of the file system */
  serviceLevel?: ServiceLevel;
  /** Maximum storage quota allowed for a file system in bytes. This is a soft quota used for alerting only. For regular volumes, valid values are in the range 50GiB to 100TiB. For large volumes, valid values are in the range 100TiB to 500TiB, and on an exceptional basis, from to 2400GiB to 2400TiB. Values expressed in bytes as multiples of 1 GiB. */
  usageThreshold?: number;
  /** Set of export policy rules */
  exportPolicy?: VolumePatchPropertiesExportPolicy;
  /** Set of protocol types, default NFSv3, CIFS for SMB protocol */
  protocolTypes?: string[];
  /** Maximum throughput in MiB/s that can be achieved by this volume and this will be accepted as input only for manual qosType volume */
  throughputMibps?: number;
  /** DataProtection type volumes include an object containing details of the replication */
  dataProtection?: VolumePatchPropertiesDataProtection;
  /** Specifies if default quota is enabled for the volume. */
  isDefaultQuotaEnabled?: boolean;
  /** Default user quota for volume in KiBs. If isDefaultQuotaEnabled is set, the minimum value of 4 KiBs applies . */
  defaultUserQuotaInKiBs?: number;
  /** Default group quota for volume in KiBs. If isDefaultQuotaEnabled is set, the minimum value of 4 KiBs applies. */
  defaultGroupQuotaInKiBs?: number;
  /** UNIX permissions for NFS volume accepted in octal 4 digit format. First digit selects the set user ID(4), set group ID (2) and sticky (1) attributes. Second digit selects permission for the owner of the file: read (4), write (2) and execute (1). Third selects permissions for other users in the same group. the fourth for other users not in the group. 0755 - gives read/write/execute permissions to owner and read/execute to group and other users. */
  unixPermissions?: string | null;
  /** Specifies whether Cool Access(tiering) is enabled for the volume. */
  coolAccess?: boolean;
  /** Specifies the number of days after which data that is not accessed by clients will be tiered. */
  coolnessPeriod?: number;
  /**
   * coolAccessRetrievalPolicy determines the data retrieval behavior from the cool tier to standard storage based on the read pattern for cool access enabled volumes. The possible values for this field are:
   * Default - Data will be pulled from cool tier to standard storage on random reads. This policy is the default.
   * OnRead - All client-driven data read is pulled from cool tier to standard storage on both sequential and random reads.
   * Never - No client-driven data is pulled from cool tier to standard storage.
   */
  coolAccessRetrievalPolicy?: CoolAccessRetrievalPolicy;
  /** coolAccessTieringPolicy determines which cold data blocks are moved to cool tier. The possible values for this field are: Auto - Moves cold user data blocks in both the Snapshot copies and the active file system to the cool tier tier. This policy is the default. SnapshotOnly - Moves user data blocks of the Volume Snapshot copies that are not associated with the active file system to the cool tier. */
  coolAccessTieringPolicy?: CoolAccessTieringPolicy;
  /** If enabled (true) the volume will contain a read-only snapshot directory which provides access to each of the volume's snapshots. */
  snapshotDirectoryVisible?: boolean;
  /** Enables access-based enumeration share property for SMB Shares. Only applicable for SMB/DualProtocol volume */
  smbAccessBasedEnumeration?: SmbAccessBasedEnumeration | null;
  /** Enables non-browsable property for SMB Shares. Only applicable for SMB/DualProtocol volume */
  smbNonBrowsable?: SmbNonBrowsable;
}

export function volumePatchPropertiesSerializer(item: VolumePatchProperties): any {
  return {
    serviceLevel: item["serviceLevel"],
    usageThreshold: item["usageThreshold"],
    exportPolicy: !item["exportPolicy"]
      ? item["exportPolicy"]
      : volumePatchPropertiesExportPolicySerializer(item["exportPolicy"]),
    protocolTypes: !item["protocolTypes"]
      ? item["protocolTypes"]
      : item["protocolTypes"].map((p: any) => {
          return p;
        }),
    throughputMibps: item["throughputMibps"],
    dataProtection: !item["dataProtection"]
      ? item["dataProtection"]
      : volumePatchPropertiesDataProtectionSerializer(item["dataProtection"]),
    isDefaultQuotaEnabled: item["isDefaultQuotaEnabled"],
    defaultUserQuotaInKiBs: item["defaultUserQuotaInKiBs"],
    defaultGroupQuotaInKiBs: item["defaultGroupQuotaInKiBs"],
    unixPermissions: item["unixPermissions"],
    coolAccess: item["coolAccess"],
    coolnessPeriod: item["coolnessPeriod"],
    coolAccessRetrievalPolicy: item["coolAccessRetrievalPolicy"],
    coolAccessTieringPolicy: item["coolAccessTieringPolicy"],
    snapshotDirectoryVisible: item["snapshotDirectoryVisible"],
    smbAccessBasedEnumeration: item["smbAccessBasedEnumeration"],
    smbNonBrowsable: item["smbNonBrowsable"],
  };
}

/** Set of export policy rules */
export interface VolumePatchPropertiesExportPolicy {
  /** Export policy rule */
  rules?: ExportPolicyRule[];
}

export function volumePatchPropertiesExportPolicySerializer(
  item: VolumePatchPropertiesExportPolicy,
): any {
  return {
    rules: !item["rules"] ? item["rules"] : exportPolicyRuleArraySerializer(item["rules"]),
  };
}

/** DataProtection type volumes include an object containing details of the replication */
export interface VolumePatchPropertiesDataProtection {
  /** Backup Properties */
  backup?: VolumeBackupProperties;
  /** Snapshot properties. */
  snapshot?: VolumeSnapshotProperties;
}

export function volumePatchPropertiesDataProtectionSerializer(
  item: VolumePatchPropertiesDataProtection,
): any {
  return {
    backup: !item["backup"] ? item["backup"] : volumeBackupPropertiesSerializer(item["backup"]),
    snapshot: !item["snapshot"]
      ? item["snapshot"]
      : volumeSnapshotPropertiesSerializer(item["snapshot"]),
  };
}

/** List of volume resources */
export interface _VolumeList {
  /** The Volume items on this page */
  value: Volume[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _volumeListDeserializer(item: any): _VolumeList {
  return {
    value: volumeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function volumeArraySerializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeSerializer(item);
  });
}

export function volumeArrayDeserializer(result: Array<Volume>): any[] {
  return result.map((item) => {
    return volumeDeserializer(item);
  });
}

/** revert a volume to the snapshot */
export interface VolumeRevert {
  /** Resource id of the snapshot */
  snapshotId?: string;
}

export function volumeRevertSerializer(item: VolumeRevert): any {
  return { snapshotId: item["snapshotId"] };
}

/** Break file locks request */
export interface BreakFileLocksRequest {
  /** To clear file locks on a volume for a particular client */
  clientIp?: string;
  /** Break File locks could be a disruptive operation for application as locks on the volume will be broken, if want to process, set to true. */
  confirmRunningDisruptiveOperation?: boolean;
}

export function breakFileLocksRequestSerializer(item: BreakFileLocksRequest): any {
  return {
    clientIp: item["clientIp"],
    confirmRunningDisruptiveOperation: item["confirmRunningDisruptiveOperation"],
  };
}

/** Get group Id list for LDAP User request */
export interface GetGroupIdListForLdapUserRequest {
  /** username is required to fetch the group to which user is part of */
  username: string;
}

export function getGroupIdListForLdapUserRequestSerializer(
  item: GetGroupIdListForLdapUserRequest,
): any {
  return { username: item["username"] };
}

/** Group Id list for Ldap user */
export interface GetGroupIdListForLdapUserResponse {
  /** Group Id list */
  groupIdsForLdapUser?: string[];
}

export function getGroupIdListForLdapUserResponseDeserializer(
  item: any,
): GetGroupIdListForLdapUserResponse {
  return {
    groupIdsForLdapUser: !item["groupIdsForLdapUser"]
      ? item["groupIdsForLdapUser"]
      : item["groupIdsForLdapUser"].map((p: any) => {
          return p;
        }),
  };
}

/** Break replication request */
export interface BreakReplicationRequest {
  /** If replication is in status transferring and you want to force break the replication, set to true */
  forceBreakReplication?: boolean;
}

export function breakReplicationRequestSerializer(item: BreakReplicationRequest): any {
  return { forceBreakReplication: item["forceBreakReplication"] };
}

/** Re-establish request object supplied in the body of the operation. */
export interface ReestablishReplicationRequest {
  /** Resource id of the source volume for the replication */
  sourceVolumeId?: string;
}

export function reestablishReplicationRequestSerializer(item: ReestablishReplicationRequest): any {
  return { sourceVolumeId: item["sourceVolumeId"] };
}

/** Replication status */
export interface ReplicationStatus {
  /** Replication health check */
  healthy?: boolean;
  /** Status of the mirror relationship */
  relationshipStatus?: VolumeReplicationRelationshipStatus;
  /** The status of the replication */
  mirrorState?: MirrorState;
  /** The progress of the replication */
  totalProgress?: string;
  /** Displays error message if the replication is in an error state */
  errorMessage?: string;
}

export function replicationStatusDeserializer(item: any): ReplicationStatus {
  return {
    healthy: item["healthy"],
    relationshipStatus: item["relationshipStatus"],
    mirrorState: item["mirrorState"],
    totalProgress: item["totalProgress"],
    errorMessage: item["errorMessage"],
  };
}

/** Body for the list replications endpoint. If supplied, the body will be used as a filter for example to exclude deleted replications. If omitted, the endpoint returns all replications */
export interface ListReplicationsRequest {
  /** Exclude Replications filter. 'None' returns all replications, 'Deleted' excludes deleted replications. Default is 'None' */
  exclude?: Exclude;
}

export function listReplicationsRequestSerializer(item: ListReplicationsRequest): any {
  return { exclude: item["exclude"] };
}

/** An option to filter out replications. 'None' returns all replications, 'Deleted' excludes deleted replications. Default is 'None' */
export enum KnownExclude {
  /** 'None' returns all replications */
  None = "None",
  /** 'Deleted' excludes deleted replications */
  Deleted = "Deleted",
}

/**
 * An option to filter out replications. 'None' returns all replications, 'Deleted' excludes deleted replications. Default is 'None' \
 * {@link KnownExclude} can be used interchangeably with Exclude,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: 'None' returns all replications \
 * **Deleted**: 'Deleted' excludes deleted replications
 */
export type Exclude = string;

/** List Replications */
export interface _ListReplications {
  /** The Replication items on this page */
  value: Replication[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _listReplicationsDeserializer(item: any): _ListReplications {
  return {
    value: replicationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function replicationArrayDeserializer(result: Array<Replication>): any[] {
  return result.map((item) => {
    return replicationDeserializer(item);
  });
}

/** Replication properties */
export interface Replication {
  /** UUID v4 used to identify the replication. */
  readonly replicationId?: string;
  /** Indicates whether the local volume is the source or destination for the Volume Replication */
  endpointType?: EndpointType;
  /** Schedule */
  replicationSchedule?: ReplicationSchedule;
  /** The resource ID of the remote volume. */
  remoteVolumeResourceId: string;
  /** The remote region for the other end of the Volume Replication. */
  remoteVolumeRegion?: string;
  /** The status of the replication */
  readonly mirrorState?: ReplicationMirrorState;
  /** Replication creation time */
  readonly replicationCreationTime?: Date;
  /** Replication deletion time */
  readonly replicationDeletionTime?: Date;
}

export function replicationDeserializer(item: any): Replication {
  return {
    replicationId: item["replicationId"],
    endpointType: item["endpointType"],
    replicationSchedule: item["replicationSchedule"],
    remoteVolumeResourceId: item["remoteVolumeResourceId"],
    remoteVolumeRegion: item["remoteVolumeRegion"],
    mirrorState: item["mirrorState"],
    replicationCreationTime: !item["replicationCreationTime"]
      ? item["replicationCreationTime"]
      : new Date(item["replicationCreationTime"]),
    replicationDeletionTime: !item["replicationDeletionTime"]
      ? item["replicationDeletionTime"]
      : new Date(item["replicationDeletionTime"]),
  };
}

/** The status of the replication */
export enum KnownReplicationMirrorState {
  /** Destination volume has not been initialized */
  Uninitialized = "Uninitialized",
  /** Destination volume has been initialized and is ready */
  Mirrored = "Mirrored",
  /** Destination volume is RW, replication relationship has been broken off */
  Broken = "Broken",
}

/**
 * The status of the replication \
 * {@link KnownReplicationMirrorState} can be used interchangeably with ReplicationMirrorState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Uninitialized**: Destination volume has not been initialized \
 * **Mirrored**: Destination volume has been initialized and is ready \
 * **Broken**: Destination volume is RW, replication relationship has been broken off
 */
export type ReplicationMirrorState = string;

/** Authorize request */
export interface AuthorizeRequest {
  /** Resource id of the remote volume */
  remoteVolumeResourceId?: string;
}

export function authorizeRequestSerializer(item: AuthorizeRequest): any {
  return { remoteVolumeResourceId: item["remoteVolumeResourceId"] };
}

/** Source Cluster properties for a cluster peer request */
export interface PeerClusterForVolumeMigrationRequest {
  /** A list of IC-LIF IPs that can be used to connect to the On-prem cluster */
  peerIpAddresses: string[];
}

export function peerClusterForVolumeMigrationRequestSerializer(
  item: PeerClusterForVolumeMigrationRequest,
): any {
  return {
    peerIpAddresses: item["peerIpAddresses"].map((p: any) => {
      return p;
    }),
  };
}

/** Information about cluster peering process */
export interface ClusterPeerCommandResponse {
  /** A command that needs to be run on the external ONTAP to accept cluster peering.  Will only be present if <code>clusterPeeringStatus</code> is <code>pending</code> */
  peerAcceptCommand?: string;
}

export function clusterPeerCommandResponseDeserializer(item: any): ClusterPeerCommandResponse {
  return {
    peerAcceptCommand: item["peerAcceptCommand"],
  };
}

/** Information about svm peering process */
export interface SvmPeerCommandResponse {
  /** A command that needs to be run on the external ONTAP to accept svm peering.  Will only be present if <code>svmPeeringStatus</code> is <code>pending</code> */
  svmPeeringCommand?: string;
}

export function svmPeerCommandResponseDeserializer(item: any): SvmPeerCommandResponse {
  return {
    svmPeeringCommand: item["svmPeeringCommand"],
  };
}

/** Pool change request */
export interface PoolChangeRequest {
  /** Resource id of the pool to move volume to */
  newPoolResourceId: string;
}

export function poolChangeRequestSerializer(item: PoolChangeRequest): any {
  return { newPoolResourceId: item["newPoolResourceId"] };
}

/** Relocate volume request */
export interface RelocateVolumeRequest {
  /** New creation token for the volume that controls the mount point name */
  creationToken?: string;
}

export function relocateVolumeRequestSerializer(item: RelocateVolumeRequest): any {
  return { creationToken: item["creationToken"] };
}

/** Quota Report for volume */
export interface ListQuotaReportResponse {
  /** List of quota reports */
  value?: QuotaReport[];
}

export function listQuotaReportResponseDeserializer(item: any): ListQuotaReportResponse {
  return {
    value: !item["value"] ? item["value"] : quotaReportArrayDeserializer(item["value"]),
  };
}

export function quotaReportArrayDeserializer(result: Array<QuotaReport>): any[] {
  return result.map((item) => {
    return quotaReportDeserializer(item);
  });
}

/** Quota report record properties */
export interface QuotaReport {
  /** Type of quota */
  quotaType?: Type;
  /** UserID/GroupID/SID based on the quota target type. UserID and groupID can be found by running ‘id’ or ‘getent’ command for the user or group and SID can be found by running <wmic useraccount where name='user-name' get sid> */
  quotaTarget?: string;
  /** Specifies the current usage in kibibytes for the user/group quota. */
  quotaLimitUsedInKiBs?: number;
  /** Specifies the total size limit in kibibytes for the user/group quota. */
  quotaLimitTotalInKiBs?: number;
  /** Percentage of used size compared to total size. */
  percentageUsed?: number;
  /** Flag to indicate whether the quota is derived from default quota. */
  isDerivedQuota?: boolean;
}

export function quotaReportDeserializer(item: any): QuotaReport {
  return {
    quotaType: item["quotaType"],
    quotaTarget: item["quotaTarget"],
    quotaLimitUsedInKiBs: item["quotaLimitUsedInKiBs"],
    quotaLimitTotalInKiBs: item["quotaLimitTotalInKiBs"],
    percentageUsed: item["percentageUsed"],
    isDerivedQuota: item["isDerivedQuota"],
  };
}

/** Type of quota */
export enum KnownType {
  /** Default user quota */
  DefaultUserQuota = "DefaultUserQuota",
  /** Default group quota */
  DefaultGroupQuota = "DefaultGroupQuota",
  /** Individual user quota */
  IndividualUserQuota = "IndividualUserQuota",
  /** Individual group quota */
  IndividualGroupQuota = "IndividualGroupQuota",
}

/**
 * Type of quota \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DefaultUserQuota**: Default user quota \
 * **DefaultGroupQuota**: Default group quota \
 * **IndividualUserQuota**: Individual user quota \
 * **IndividualGroupQuota**: Individual group quota
 */
export type Type = string;

/** Snapshot of a Volume */
export interface Snapshot extends ProxyResource {
  /** Snapshot Properties */
  properties?: SnapshotProperties;
  /** Resource location */
  location: string;
}

export function snapshotSerializer(item: Snapshot): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : snapshotPropertiesSerializer(item["properties"]),
    location: item["location"],
  };
}

export function snapshotDeserializer(item: any): Snapshot {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : snapshotPropertiesDeserializer(item["properties"]),
    location: item["location"],
  };
}

/** Snapshot properties */
export interface SnapshotProperties {
  /** UUID v4 used to identify the Snapshot */
  readonly snapshotId?: string;
  /** The creation date of the snapshot */
  readonly created?: Date;
  /** Azure lifecycle management */
  readonly provisioningState?: string;
}

export function snapshotPropertiesSerializer(item: SnapshotProperties): any {
  return item;
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    snapshotId: item["snapshotId"],
    created: !item["created"] ? item["created"] : new Date(item["created"]),
    provisioningState: item["provisioningState"],
  };
}

/** Snapshot of a Volume */
export interface SnapshotPatch {}

export function snapshotPatchSerializer(item: SnapshotPatch): any {
  return item;
}

/** List of Snapshots */
export interface _SnapshotsList {
  /** The Snapshot items on this page */
  value: Snapshot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _snapshotsListDeserializer(item: any): _SnapshotsList {
  return {
    value: snapshotArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function snapshotArraySerializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotSerializer(item);
  });
}

export function snapshotArrayDeserializer(result: Array<Snapshot>): any[] {
  return result.map((item) => {
    return snapshotDeserializer(item);
  });
}

/** Restore payload for Single File Snapshot Restore */
export interface SnapshotRestoreFiles {
  /** List of files to be restored */
  filePaths: string[];
  /** Destination folder where the files will be restored */
  destinationPath?: string;
}

export function snapshotRestoreFilesSerializer(item: SnapshotRestoreFiles): any {
  return {
    filePaths: item["filePaths"].map((p: any) => {
      return p;
    }),
    destinationPath: item["destinationPath"],
  };
}

/** Snapshot policy information */
export interface SnapshotPolicy extends TrackedResource {
  /** Snapshot policy Properties */
  properties: SnapshotPolicyProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function snapshotPolicySerializer(item: SnapshotPolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: snapshotPolicyPropertiesSerializer(item["properties"]),
  };
}

export function snapshotPolicyDeserializer(item: any): SnapshotPolicy {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: snapshotPolicyPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Snapshot policy properties */
export interface SnapshotPolicyProperties {
  /** Schedule for hourly snapshots */
  hourlySchedule?: HourlySchedule;
  /** Schedule for daily snapshots */
  dailySchedule?: DailySchedule;
  /** Schedule for weekly snapshots */
  weeklySchedule?: WeeklySchedule;
  /** Schedule for monthly snapshots */
  monthlySchedule?: MonthlySchedule;
  /** The property to decide policy is enabled or not */
  enabled?: boolean;
  /** Azure lifecycle management */
  readonly provisioningState?: string;
}

export function snapshotPolicyPropertiesSerializer(item: SnapshotPolicyProperties): any {
  return {
    hourlySchedule: !item["hourlySchedule"]
      ? item["hourlySchedule"]
      : hourlyScheduleSerializer(item["hourlySchedule"]),
    dailySchedule: !item["dailySchedule"]
      ? item["dailySchedule"]
      : dailyScheduleSerializer(item["dailySchedule"]),
    weeklySchedule: !item["weeklySchedule"]
      ? item["weeklySchedule"]
      : weeklyScheduleSerializer(item["weeklySchedule"]),
    monthlySchedule: !item["monthlySchedule"]
      ? item["monthlySchedule"]
      : monthlyScheduleSerializer(item["monthlySchedule"]),
    enabled: item["enabled"],
  };
}

export function snapshotPolicyPropertiesDeserializer(item: any): SnapshotPolicyProperties {
  return {
    hourlySchedule: !item["hourlySchedule"]
      ? item["hourlySchedule"]
      : hourlyScheduleDeserializer(item["hourlySchedule"]),
    dailySchedule: !item["dailySchedule"]
      ? item["dailySchedule"]
      : dailyScheduleDeserializer(item["dailySchedule"]),
    weeklySchedule: !item["weeklySchedule"]
      ? item["weeklySchedule"]
      : weeklyScheduleDeserializer(item["weeklySchedule"]),
    monthlySchedule: !item["monthlySchedule"]
      ? item["monthlySchedule"]
      : monthlyScheduleDeserializer(item["monthlySchedule"]),
    enabled: item["enabled"],
    provisioningState: item["provisioningState"],
  };
}

/** Hourly Schedule properties */
export interface HourlySchedule {
  /** Hourly snapshot count to keep */
  snapshotsToKeep?: number;
  /** Indicates which minute snapshot should be taken */
  minute?: number;
  /** Resource size in bytes, current storage usage for the volume in bytes */
  usedBytes?: number;
}

export function hourlyScheduleSerializer(item: HourlySchedule): any {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

export function hourlyScheduleDeserializer(item: any): HourlySchedule {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

/** Daily Schedule properties */
export interface DailySchedule {
  /** Daily snapshot count to keep */
  snapshotsToKeep?: number;
  /** Indicates which hour in UTC timezone a snapshot should be taken */
  hour?: number;
  /** Indicates which minute snapshot should be taken */
  minute?: number;
  /** Resource size in bytes, current storage usage for the volume in bytes */
  usedBytes?: number;
}

export function dailyScheduleSerializer(item: DailySchedule): any {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    hour: item["hour"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

export function dailyScheduleDeserializer(item: any): DailySchedule {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    hour: item["hour"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

/** Weekly Schedule properties, make a snapshot every week at a specific day or days */
export interface WeeklySchedule {
  /** Weekly snapshot count to keep */
  snapshotsToKeep?: number;
  /** Indicates which weekdays snapshot should be taken, accepts a comma separated list of week day names in english */
  day?: string;
  /** Indicates which hour in UTC timezone a snapshot should be taken */
  hour?: number;
  /** Indicates which minute snapshot should be taken */
  minute?: number;
  /** Resource size in bytes, current storage usage for the volume in bytes */
  usedBytes?: number;
}

export function weeklyScheduleSerializer(item: WeeklySchedule): any {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    day: item["day"],
    hour: item["hour"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

export function weeklyScheduleDeserializer(item: any): WeeklySchedule {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    day: item["day"],
    hour: item["hour"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

/** Monthly Schedule properties */
export interface MonthlySchedule {
  /** Monthly snapshot count to keep */
  snapshotsToKeep?: number;
  /** Indicates which days of the month snapshot should be taken. A comma delimited string. */
  daysOfMonth?: string;
  /** Indicates which hour in UTC timezone a snapshot should be taken */
  hour?: number;
  /** Indicates which minute snapshot should be taken */
  minute?: number;
  /** Resource size in bytes, current storage usage for the volume in bytes */
  usedBytes?: number;
}

export function monthlyScheduleSerializer(item: MonthlySchedule): any {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    daysOfMonth: item["daysOfMonth"],
    hour: item["hour"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

export function monthlyScheduleDeserializer(item: any): MonthlySchedule {
  return {
    snapshotsToKeep: item["snapshotsToKeep"],
    daysOfMonth: item["daysOfMonth"],
    hour: item["hour"],
    minute: item["minute"],
    usedBytes: item["usedBytes"],
  };
}

/** Snapshot policy Details for create and update */
export interface SnapshotPolicyPatch {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Snapshot Policy properties */
  properties?: SnapshotPolicyProperties;
}

export function snapshotPolicyPatchSerializer(item: SnapshotPolicyPatch): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : snapshotPolicyPropertiesSerializer(item["properties"]),
  };
}

/** List of Snapshot Policies */
export interface _SnapshotPoliciesList {
  /** The SnapshotPolicy items on this page */
  value: SnapshotPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _snapshotPoliciesListDeserializer(item: any): _SnapshotPoliciesList {
  return {
    value: snapshotPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function snapshotPolicyArraySerializer(result: Array<SnapshotPolicy>): any[] {
  return result.map((item) => {
    return snapshotPolicySerializer(item);
  });
}

export function snapshotPolicyArrayDeserializer(result: Array<SnapshotPolicy>): any[] {
  return result.map((item) => {
    return snapshotPolicyDeserializer(item);
  });
}

/** Volumes associated with snapshot policy */
export interface SnapshotPolicyVolumeList {
  /** The Volume items on this page */
  value: Volume[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function snapshotPolicyVolumeListDeserializer(item: any): SnapshotPolicyVolumeList {
  return {
    value: volumeArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** Backup policy information */
export interface BackupPolicy extends TrackedResource {
  /** Backup policy Properties */
  properties: BackupPolicyProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function backupPolicySerializer(item: BackupPolicy): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: backupPolicyPropertiesSerializer(item["properties"]),
  };
}

export function backupPolicyDeserializer(item: any): BackupPolicy {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: backupPolicyPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Backup policy properties */
export interface BackupPolicyProperties {
  /** Backup Policy GUID ID */
  readonly backupPolicyId?: string;
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Daily backups count to keep */
  dailyBackupsToKeep?: number;
  /** Weekly backups count to keep */
  weeklyBackupsToKeep?: number;
  /** Monthly backups count to keep */
  monthlyBackupsToKeep?: number;
  /** Volumes using current backup policy */
  readonly volumesAssigned?: number;
  /** The property to decide policy is enabled or not */
  enabled?: boolean;
  /** A list of volumes assigned to this policy */
  readonly volumeBackups?: VolumeBackups[];
}

export function backupPolicyPropertiesSerializer(item: BackupPolicyProperties): any {
  return {
    dailyBackupsToKeep: item["dailyBackupsToKeep"],
    weeklyBackupsToKeep: item["weeklyBackupsToKeep"],
    monthlyBackupsToKeep: item["monthlyBackupsToKeep"],
    enabled: item["enabled"],
  };
}

export function backupPolicyPropertiesDeserializer(item: any): BackupPolicyProperties {
  return {
    backupPolicyId: item["backupPolicyId"],
    provisioningState: item["provisioningState"],
    dailyBackupsToKeep: item["dailyBackupsToKeep"],
    weeklyBackupsToKeep: item["weeklyBackupsToKeep"],
    monthlyBackupsToKeep: item["monthlyBackupsToKeep"],
    volumesAssigned: item["volumesAssigned"],
    enabled: item["enabled"],
    volumeBackups: !item["volumeBackups"]
      ? item["volumeBackups"]
      : volumeBackupsArrayDeserializer(item["volumeBackups"]),
  };
}

export function volumeBackupsArrayDeserializer(result: Array<VolumeBackups>): any[] {
  return result.map((item) => {
    return volumeBackupsDeserializer(item);
  });
}

/** Volume details using the backup policy */
export interface VolumeBackups {
  /** Volume name */
  volumeName?: string;
  /** ResourceId used to identify the Volume */
  volumeResourceId?: string;
  /** Total count of backups for volume */
  backupsCount?: number;
  /** Policy enabled */
  policyEnabled?: boolean;
}

export function volumeBackupsDeserializer(item: any): VolumeBackups {
  return {
    volumeName: item["volumeName"],
    volumeResourceId: item["volumeResourceId"],
    backupsCount: item["backupsCount"],
    policyEnabled: item["policyEnabled"],
  };
}

/** Backup policy Details for create and update */
export interface BackupPolicyPatch {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Backup policy Properties */
  properties?: BackupPolicyProperties;
}

export function backupPolicyPatchSerializer(item: BackupPolicyPatch): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : backupPolicyPropertiesSerializer(item["properties"]),
  };
}

/** List of Backup Policies */
export interface _BackupPoliciesList {
  /** The BackupPolicy items on this page */
  value: BackupPolicy[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _backupPoliciesListDeserializer(item: any): _BackupPoliciesList {
  return {
    value: backupPolicyArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupPolicyArraySerializer(result: Array<BackupPolicy>): any[] {
  return result.map((item) => {
    return backupPolicySerializer(item);
  });
}

export function backupPolicyArrayDeserializer(result: Array<BackupPolicy>): any[] {
  return result.map((item) => {
    return backupPolicyDeserializer(item);
  });
}

/** Quota Rule of a Volume */
export interface VolumeQuotaRule extends TrackedResource {
  /** Volume Quota Rule Properties */
  properties?: VolumeQuotaRulesProperties;
}

export function volumeQuotaRuleSerializer(item: VolumeQuotaRule): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : volumeQuotaRulesPropertiesSerializer(item["properties"]),
  };
}

export function volumeQuotaRuleDeserializer(item: any): VolumeQuotaRule {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : volumeQuotaRulesPropertiesDeserializer(item["properties"]),
  };
}

/** Volume Quota Rule properties */
export interface VolumeQuotaRulesProperties {
  /** Gets the status of the VolumeQuotaRule at the time the operation was called. */
  readonly provisioningState?: NetAppProvisioningState;
  /** Size of quota */
  quotaSizeInKiBs?: number;
  /** Type of quota */
  quotaType?: Type;
  /** UserID/GroupID/SID based on the quota target type. UserID and groupID can be found by running ‘id’ or ‘getent’ command for the user or group and SID can be found by running <wmic useraccount where name='user-name' get sid> */
  quotaTarget?: string;
}

export function volumeQuotaRulesPropertiesSerializer(item: VolumeQuotaRulesProperties): any {
  return {
    quotaSizeInKiBs: item["quotaSizeInKiBs"],
    quotaType: item["quotaType"],
    quotaTarget: item["quotaTarget"],
  };
}

export function volumeQuotaRulesPropertiesDeserializer(item: any): VolumeQuotaRulesProperties {
  return {
    provisioningState: item["provisioningState"],
    quotaSizeInKiBs: item["quotaSizeInKiBs"],
    quotaType: item["quotaType"],
    quotaTarget: item["quotaTarget"],
  };
}

/** Gets the status of the VolumeQuotaRule at the time the operation was called. */
export enum KnownNetAppProvisioningState {
  /** Resource has been Accepted */
  Accepted = "Accepted",
  /** Resource is being Created */
  Creating = "Creating",
  /** Resource is being Patched */
  Patching = "Patching",
  /** Resource is updating */
  Updating = "Updating",
  /** Resource is being Deleted */
  Deleting = "Deleting",
  /** Resource is being Moved */
  Moving = "Moving",
  /** Resource has Failed */
  Failed = "Failed",
  /** Resource has Succeeded */
  Succeeded = "Succeeded",
}

/**
 * Gets the status of the VolumeQuotaRule at the time the operation was called. \
 * {@link KnownNetAppProvisioningState} can be used interchangeably with NetAppProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Accepted**: Resource has been Accepted \
 * **Creating**: Resource is being Created \
 * **Patching**: Resource is being Patched \
 * **Updating**: Resource is updating \
 * **Deleting**: Resource is being Deleted \
 * **Moving**: Resource is being Moved \
 * **Failed**: Resource has Failed \
 * **Succeeded**: Resource has Succeeded
 */
export type NetAppProvisioningState = string;

/** Patchable Quota Rule of a Volume */
export interface VolumeQuotaRulePatch {
  /** Resource tags */
  tags?: Record<string, string>;
  /** Volume Quota Rule Properties */
  properties?: VolumeQuotaRulesProperties;
}

export function volumeQuotaRulePatchSerializer(item: VolumeQuotaRulePatch): any {
  return {
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : volumeQuotaRulesPropertiesSerializer(item["properties"]),
  };
}

/** List of Volume Quota Rules */
export interface _VolumeQuotaRulesList {
  /** The VolumeQuotaRule items on this page */
  value: VolumeQuotaRule[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _volumeQuotaRulesListDeserializer(item: any): _VolumeQuotaRulesList {
  return {
    value: volumeQuotaRuleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function volumeQuotaRuleArraySerializer(result: Array<VolumeQuotaRule>): any[] {
  return result.map((item) => {
    return volumeQuotaRuleSerializer(item);
  });
}

export function volumeQuotaRuleArrayDeserializer(result: Array<VolumeQuotaRule>): any[] {
  return result.map((item) => {
    return volumeQuotaRuleDeserializer(item);
  });
}

/** Backup Vault information */
export interface BackupVault extends TrackedResource {
  /** Backup Vault Properties */
  properties?: BackupVaultProperties;
}

export function backupVaultSerializer(item: BackupVault): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : backupVaultPropertiesSerializer(item["properties"]),
  };
}

export function backupVaultDeserializer(item: any): BackupVault {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : backupVaultPropertiesDeserializer(item["properties"]),
  };
}

/** Backup Vault properties */
export interface BackupVaultProperties {
  /** Azure lifecycle management */
  readonly provisioningState?: string;
}

export function backupVaultPropertiesSerializer(item: BackupVaultProperties): any {
  return item;
}

export function backupVaultPropertiesDeserializer(item: any): BackupVaultProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** Backup Vault information */
export interface BackupVaultPatch {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function backupVaultPatchSerializer(item: BackupVaultPatch): any {
  return { tags: item["tags"] };
}

/** List of Backup Vaults */
export interface _BackupVaultsList {
  /** The BackupVault items on this page */
  value: BackupVault[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _backupVaultsListDeserializer(item: any): _BackupVaultsList {
  return {
    value: backupVaultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function backupVaultArraySerializer(result: Array<BackupVault>): any[] {
  return result.map((item) => {
    return backupVaultSerializer(item);
  });
}

export function backupVaultArrayDeserializer(result: Array<BackupVault>): any[] {
  return result.map((item) => {
    return backupVaultDeserializer(item);
  });
}

/** Information regarding regionInfo Item. */
export interface RegionInfoResource extends ProxyResource {
  /** regionInfo properties */
  properties?: RegionInfo;
}

export function regionInfoResourceDeserializer(item: any): RegionInfoResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : regionInfoDeserializer(item["properties"]),
  };
}

/** Provides region specific information. */
export interface RegionInfo {
  /** Provides storage to network proximity information in the region. */
  storageToNetworkProximity?: RegionStorageToNetworkProximity;
  /** Provides logical availability zone mappings for the subscription for a region. */
  availabilityZoneMappings?: RegionInfoAvailabilityZoneMappingsItem[];
}

export function regionInfoDeserializer(item: any): RegionInfo {
  return {
    storageToNetworkProximity: item["storageToNetworkProximity"],
    availabilityZoneMappings: !item["availabilityZoneMappings"]
      ? item["availabilityZoneMappings"]
      : regionInfoAvailabilityZoneMappingsItemArrayDeserializer(item["availabilityZoneMappings"]),
  };
}

/** Provides storage to network proximity information in the region. */
export enum KnownRegionStorageToNetworkProximity {
  /** Basic network connectivity. */
  Default = "Default",
  /** Standard T1 network connectivity. */
  T1 = "T1",
  /** Standard T2 network connectivity. */
  T2 = "T2",
  /** Standard AcrossT2 network connectivity. */
  AcrossT2 = "AcrossT2",
  /** Standard T1 and T2 network connectivity. */
  T1AndT2 = "T1AndT2",
  /** Standard T1 and AcrossT2 network connectivity. */
  T1AndAcrossT2 = "T1AndAcrossT2",
  /** Standard T2 and AcrossT2 network connectivity. */
  T2AndAcrossT2 = "T2AndAcrossT2",
  /** Standard T1, T2 and AcrossT2 network connectivity. */
  T1AndT2AndAcrossT2 = "T1AndT2AndAcrossT2",
}

/**
 * Provides storage to network proximity information in the region. \
 * {@link KnownRegionStorageToNetworkProximity} can be used interchangeably with RegionStorageToNetworkProximity,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: Basic network connectivity. \
 * **T1**: Standard T1 network connectivity. \
 * **T2**: Standard T2 network connectivity. \
 * **AcrossT2**: Standard AcrossT2 network connectivity. \
 * **T1AndT2**: Standard T1 and T2 network connectivity. \
 * **T1AndAcrossT2**: Standard T1 and AcrossT2 network connectivity. \
 * **T2AndAcrossT2**: Standard T2 and AcrossT2 network connectivity. \
 * **T1AndT2AndAcrossT2**: Standard T1, T2 and AcrossT2 network connectivity.
 */
export type RegionStorageToNetworkProximity = string;

export function regionInfoAvailabilityZoneMappingsItemArrayDeserializer(
  result: Array<RegionInfoAvailabilityZoneMappingsItem>,
): any[] {
  return result.map((item) => {
    return regionInfoAvailabilityZoneMappingsItemDeserializer(item);
  });
}

/** model interface RegionInfoAvailabilityZoneMappingsItem */
export interface RegionInfoAvailabilityZoneMappingsItem {
  /** Logical availability zone. */
  availabilityZone?: string;
  /** Available availability zone */
  isAvailable?: boolean;
}

export function regionInfoAvailabilityZoneMappingsItemDeserializer(
  item: any,
): RegionInfoAvailabilityZoneMappingsItem {
  return {
    availabilityZone: item["availabilityZone"],
    isAvailable: item["isAvailable"],
  };
}

/** List of regionInfo resources */
export interface _RegionInfosList {
  /** The RegionInfoResource items on this page */
  value: RegionInfoResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _regionInfosListDeserializer(item: any): _RegionInfosList {
  return {
    value: regionInfoResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function regionInfoResourceArrayDeserializer(result: Array<RegionInfoResource>): any[] {
  return result.map((item) => {
    return regionInfoResourceDeserializer(item);
  });
}

/** NetApp account resource */
export interface NetAppAccount extends TrackedResource {
  /** NetApp Account properties */
  properties?: AccountProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
  /** The managed service identities assigned to this resource. */
  identity?: ManagedServiceIdentity;
}

export function netAppAccountSerializer(item: NetAppAccount): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

export function netAppAccountDeserializer(item: any): NetAppAccount {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentityDeserializer(item["identity"]),
  };
}

/** NetApp account properties */
export interface AccountProperties {
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Active Directories */
  activeDirectories?: ActiveDirectory[];
  /** Encryption settings */
  encryption?: AccountEncryption;
  /** Shows the status of disableShowmount for all volumes under the subscription, null equals false */
  readonly disableShowmount?: boolean | null;
  /** Domain for NFSv4 user ID mapping. This property will be set for all NetApp accounts in the subscription and region and only affect non ldap NFSv4 volumes. */
  nfsV4IDDomain?: string | null;
  /** MultiAD Status for the account */
  readonly multiAdStatus?: MultiAdStatus;
  /** LDAP Configuration for the account. */
  ldapConfiguration?: LdapConfiguration;
}

export function accountPropertiesSerializer(item: AccountProperties): any {
  return {
    activeDirectories: !item["activeDirectories"]
      ? item["activeDirectories"]
      : activeDirectoryArraySerializer(item["activeDirectories"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : accountEncryptionSerializer(item["encryption"]),
    nfsV4IDDomain: item["nfsV4IDDomain"],
    ldapConfiguration: !item["ldapConfiguration"]
      ? item["ldapConfiguration"]
      : ldapConfigurationSerializer(item["ldapConfiguration"]),
  };
}

export function accountPropertiesDeserializer(item: any): AccountProperties {
  return {
    provisioningState: item["provisioningState"],
    activeDirectories: !item["activeDirectories"]
      ? item["activeDirectories"]
      : activeDirectoryArrayDeserializer(item["activeDirectories"]),
    encryption: !item["encryption"]
      ? item["encryption"]
      : accountEncryptionDeserializer(item["encryption"]),
    disableShowmount: item["disableShowmount"],
    nfsV4IDDomain: item["nfsV4IDDomain"],
    multiAdStatus: item["multiAdStatus"],
    ldapConfiguration: !item["ldapConfiguration"]
      ? item["ldapConfiguration"]
      : ldapConfigurationDeserializer(item["ldapConfiguration"]),
  };
}

export function activeDirectoryArraySerializer(result: Array<ActiveDirectory>): any[] {
  return result.map((item) => {
    return activeDirectorySerializer(item);
  });
}

export function activeDirectoryArrayDeserializer(result: Array<ActiveDirectory>): any[] {
  return result.map((item) => {
    return activeDirectoryDeserializer(item);
  });
}

/** Active Directory */
export interface ActiveDirectory {
  /** Id of the Active Directory */
  activeDirectoryId?: string | null;
  /** A domain user account with permission to create machine accounts */
  username?: string;
  /** Plain text password of Active Directory domain administrator, value is masked in the response */
  password?: string;
  /** Name of the Active Directory domain */
  domain?: string;
  /** Comma separated list of DNS server IP addresses (IPv4 only) for the Active Directory domain */
  dns?: string;
  /** Status of the Active Directory */
  readonly status?: ActiveDirectoryStatus;
  /** Any details in regards to the Status of the Active Directory */
  readonly statusDetails?: string;
  /** NetBIOS name of the SMB server. This name will be registered as a computer account in the AD and used to mount volumes */
  smbServerName?: string;
  /** The Organizational Unit (OU) within the Windows Active Directory */
  organizationalUnit?: string;
  /** The Active Directory site the service will limit Domain Controller discovery to */
  site?: string;
  /** Users to be added to the Built-in Backup Operator active directory group. A list of unique usernames without domain specifier */
  backupOperators?: string[];
  /** Users to be added to the Built-in Administrators active directory group. A list of unique usernames without domain specifier */
  administrators?: string[];
  /** kdc server IP address for the active directory machine. This optional parameter is used only while creating kerberos volume. */
  kdcIP?: string;
  /** Name of the active directory machine. This optional parameter is used only while creating kerberos volume */
  adName?: string;
  /** When LDAP over SSL/TLS is enabled, the LDAP client is required to have base64 encoded Active Directory Certificate Service's self-signed root CA certificate, this optional parameter is used only for dual protocol with LDAP user-mapping volumes. */
  serverRootCACertificate?: string;
  /** If enabled, AES encryption will be enabled for SMB communication. */
  aesEncryption?: boolean;
  /** Specifies whether or not the LDAP traffic needs to be signed. */
  ldapSigning?: boolean;
  /** Domain Users in the Active directory to be given SeSecurityPrivilege privilege (Needed for SMB Continuously available shares for SQL). A list of unique usernames without domain specifier */
  securityOperators?: string[];
  /** Specifies whether or not the LDAP traffic needs to be secured via TLS. */
  ldapOverTLS?: boolean;
  /** If enabled, NFS client local users can also (in addition to LDAP users) access the NFS volumes. */
  allowLocalNfsUsersWithLdap?: boolean;
  /** If enabled, Traffic between the SMB server to Domain Controller (DC) will be encrypted. */
  encryptDCConnections?: boolean;
  /** LDAP Search scope options */
  ldapSearchScope?: LdapSearchScopeOpt;
  /** Comma separated list of IPv4 addresses of preferred servers for LDAP client. At most two comma separated IPv4 addresses can be passed. */
  preferredServersForLdapClient?: string;
}

export function activeDirectorySerializer(item: ActiveDirectory): any {
  return {
    activeDirectoryId: item["activeDirectoryId"],
    username: item["username"],
    password: item["password"],
    domain: item["domain"],
    dns: item["dns"],
    smbServerName: item["smbServerName"],
    organizationalUnit: item["organizationalUnit"],
    site: item["site"],
    backupOperators: !item["backupOperators"]
      ? item["backupOperators"]
      : item["backupOperators"].map((p: any) => {
          return p;
        }),
    administrators: !item["administrators"]
      ? item["administrators"]
      : item["administrators"].map((p: any) => {
          return p;
        }),
    kdcIP: item["kdcIP"],
    adName: item["adName"],
    serverRootCACertificate: item["serverRootCACertificate"],
    aesEncryption: item["aesEncryption"],
    ldapSigning: item["ldapSigning"],
    securityOperators: !item["securityOperators"]
      ? item["securityOperators"]
      : item["securityOperators"].map((p: any) => {
          return p;
        }),
    ldapOverTLS: item["ldapOverTLS"],
    allowLocalNfsUsersWithLdap: item["allowLocalNfsUsersWithLdap"],
    encryptDCConnections: item["encryptDCConnections"],
    ldapSearchScope: !item["ldapSearchScope"]
      ? item["ldapSearchScope"]
      : ldapSearchScopeOptSerializer(item["ldapSearchScope"]),
    preferredServersForLdapClient: item["preferredServersForLdapClient"],
  };
}

export function activeDirectoryDeserializer(item: any): ActiveDirectory {
  return {
    activeDirectoryId: item["activeDirectoryId"],
    username: item["username"],
    password: item["password"],
    domain: item["domain"],
    dns: item["dns"],
    status: item["status"],
    statusDetails: item["statusDetails"],
    smbServerName: item["smbServerName"],
    organizationalUnit: item["organizationalUnit"],
    site: item["site"],
    backupOperators: !item["backupOperators"]
      ? item["backupOperators"]
      : item["backupOperators"].map((p: any) => {
          return p;
        }),
    administrators: !item["administrators"]
      ? item["administrators"]
      : item["administrators"].map((p: any) => {
          return p;
        }),
    kdcIP: item["kdcIP"],
    adName: item["adName"],
    serverRootCACertificate: item["serverRootCACertificate"],
    aesEncryption: item["aesEncryption"],
    ldapSigning: item["ldapSigning"],
    securityOperators: !item["securityOperators"]
      ? item["securityOperators"]
      : item["securityOperators"].map((p: any) => {
          return p;
        }),
    ldapOverTLS: item["ldapOverTLS"],
    allowLocalNfsUsersWithLdap: item["allowLocalNfsUsersWithLdap"],
    encryptDCConnections: item["encryptDCConnections"],
    ldapSearchScope: !item["ldapSearchScope"]
      ? item["ldapSearchScope"]
      : ldapSearchScopeOptDeserializer(item["ldapSearchScope"]),
    preferredServersForLdapClient: item["preferredServersForLdapClient"],
  };
}

/** Status of the Active Directory */
export enum KnownActiveDirectoryStatus {
  /** Active Directory created but not in use */
  Created = "Created",
  /** Active Directory in use by SMB Volume */
  InUse = "InUse",
  /** Active Directory Deleted */
  Deleted = "Deleted",
  /** Error with the Active Directory */
  Error = "Error",
  /** Active Directory Updating */
  Updating = "Updating",
}

/**
 * Status of the Active Directory \
 * {@link KnownActiveDirectoryStatus} can be used interchangeably with ActiveDirectoryStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: Active Directory created but not in use \
 * **InUse**: Active Directory in use by SMB Volume \
 * **Deleted**: Active Directory Deleted \
 * **Error**: Error with the Active Directory \
 * **Updating**: Active Directory Updating
 */
export type ActiveDirectoryStatus = string;

/** LDAP search scope */
export interface LdapSearchScopeOpt {
  /** This specifies the user DN, which overrides the base DN for user lookups. */
  userDN?: string;
  /** This specifies the group DN, which overrides the base DN for group lookups. */
  groupDN?: string;
  /** This specifies the custom LDAP search filter to be used when looking up group membership from LDAP server. */
  groupMembershipFilter?: string;
}

export function ldapSearchScopeOptSerializer(item: LdapSearchScopeOpt): any {
  return {
    userDN: item["userDN"],
    groupDN: item["groupDN"],
    groupMembershipFilter: item["groupMembershipFilter"],
  };
}

export function ldapSearchScopeOptDeserializer(item: any): LdapSearchScopeOpt {
  return {
    userDN: item["userDN"],
    groupDN: item["groupDN"],
    groupMembershipFilter: item["groupMembershipFilter"],
  };
}

/** Encryption settings */
export interface AccountEncryption {
  /** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.NetApp, Microsoft.KeyVault */
  keySource?: KeySource;
  /** Properties provided by KeVault. Applicable if keySource is 'Microsoft.KeyVault'. */
  keyVaultProperties?: KeyVaultProperties;
  /** Identity used to authenticate to KeyVault. Applicable if keySource is 'Microsoft.KeyVault'. */
  identity?: EncryptionIdentity;
}

export function accountEncryptionSerializer(item: AccountEncryption): any {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesSerializer(item["keyVaultProperties"]),
    identity: !item["identity"] ? item["identity"] : encryptionIdentitySerializer(item["identity"]),
  };
}

export function accountEncryptionDeserializer(item: any): AccountEncryption {
  return {
    keySource: item["keySource"],
    keyVaultProperties: !item["keyVaultProperties"]
      ? item["keyVaultProperties"]
      : keyVaultPropertiesDeserializer(item["keyVaultProperties"]),
    identity: !item["identity"]
      ? item["identity"]
      : encryptionIdentityDeserializer(item["identity"]),
  };
}

/** The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.NetApp, Microsoft.KeyVault */
export enum KnownKeySource {
  /** Microsoft-managed key encryption */
  MicrosoftNetApp = "Microsoft.NetApp",
  /** Customer-managed key encryption */
  MicrosoftKeyVault = "Microsoft.KeyVault",
}

/**
 * The encryption keySource (provider). Possible values (case-insensitive):  Microsoft.NetApp, Microsoft.KeyVault \
 * {@link KnownKeySource} can be used interchangeably with KeySource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.NetApp**: Microsoft-managed key encryption \
 * **Microsoft.KeyVault**: Customer-managed key encryption
 */
export type KeySource = string;

/** Properties of key vault. */
export interface KeyVaultProperties {
  /** UUID v4 used to identify the Azure Key Vault configuration */
  readonly keyVaultId?: string;
  /** The Uri of KeyVault. */
  keyVaultUri: string;
  /** The name of KeyVault key. */
  keyName: string;
  /** The resource ID of KeyVault. */
  keyVaultResourceId?: string;
  /** Status of the KeyVault connection. */
  readonly status?: KeyVaultStatus;
}

export function keyVaultPropertiesSerializer(item: KeyVaultProperties): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVaultResourceId: item["keyVaultResourceId"],
  };
}

export function keyVaultPropertiesDeserializer(item: any): KeyVaultProperties {
  return {
    keyVaultId: item["keyVaultId"],
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVaultResourceId: item["keyVaultResourceId"],
    status: item["status"],
  };
}

/** Status of the KeyVault connection. */
export enum KnownKeyVaultStatus {
  /** KeyVault connection created but not in use */
  Created = "Created",
  /** KeyVault connection in use by SMB Volume */
  InUse = "InUse",
  /** KeyVault connection Deleted */
  Deleted = "Deleted",
  /** Error with the KeyVault connection */
  Error = "Error",
  /** KeyVault connection Updating */
  Updating = "Updating",
}

/**
 * Status of the KeyVault connection. \
 * {@link KnownKeyVaultStatus} can be used interchangeably with KeyVaultStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Created**: KeyVault connection created but not in use \
 * **InUse**: KeyVault connection in use by SMB Volume \
 * **Deleted**: KeyVault connection Deleted \
 * **Error**: Error with the KeyVault connection \
 * **Updating**: KeyVault connection Updating
 */
export type KeyVaultStatus = string;

/** Identity used to authenticate with key vault. */
export interface EncryptionIdentity {
  /** The principal ID (object ID) of the identity used to authenticate with key vault. Read-only. */
  readonly principalId?: string;
  /** The ARM resource identifier of the user assigned identity used to authenticate with key vault. Applicable if identity.type has 'UserAssigned'. It should match key of identity.userAssignedIdentities. */
  userAssignedIdentity?: string;
  /** ClientId of the multi-tenant AAD Application. Used to access cross-tenant keyvaults. */
  federatedClientId?: string;
}

export function encryptionIdentitySerializer(item: EncryptionIdentity): any {
  return {
    userAssignedIdentity: item["userAssignedIdentity"],
    federatedClientId: item["federatedClientId"],
  };
}

export function encryptionIdentityDeserializer(item: any): EncryptionIdentity {
  return {
    principalId: item["principalId"],
    userAssignedIdentity: item["userAssignedIdentity"],
    federatedClientId: item["federatedClientId"],
  };
}

/** MultiAD Status for the account */
export enum KnownMultiAdStatus {
  /** Account is MultiAD disabled, Means its a SharedAD or SingleAD account. */
  Disabled = "Disabled",
  /** Account is MultiAD enabled */
  Enabled = "Enabled",
}

/**
 * MultiAD Status for the account \
 * {@link KnownMultiAdStatus} can be used interchangeably with MultiAdStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Account is MultiAD disabled, Means its a SharedAD or SingleAD account. \
 * **Enabled**: Account is MultiAD enabled
 */
export type MultiAdStatus = string;

/** LDAP configuration */
export interface LdapConfiguration {
  /** Name of the LDAP configuration domain */
  domain?: string;
  /** List of LDAP server IP addresses (IPv4 only) for the LDAP domain. */
  ldapServers?: string[];
  /** Specifies whether or not the LDAP traffic needs to be secured via TLS. */
  ldapOverTLS?: boolean;
  /** When LDAP over SSL/TLS is enabled, the LDAP client is required to have base64 encoded ldap servers CA certificate. */
  serverCACertificate?: string;
  /** The CN host name used while generating the certificate, LDAP Over TLS requires the CN host name to create DNS host entry. */
  certificateCNHost?: string | null;
}

export function ldapConfigurationSerializer(item: LdapConfiguration): any {
  return {
    domain: item["domain"],
    ldapServers: !item["ldapServers"]
      ? item["ldapServers"]
      : item["ldapServers"].map((p: any) => {
          return p;
        }),
    ldapOverTLS: item["ldapOverTLS"],
    serverCACertificate: item["serverCACertificate"],
    certificateCNHost: item["certificateCNHost"],
  };
}

export function ldapConfigurationDeserializer(item: any): LdapConfiguration {
  return {
    domain: item["domain"],
    ldapServers: !item["ldapServers"]
      ? item["ldapServers"]
      : item["ldapServers"].map((p: any) => {
          return p;
        }),
    ldapOverTLS: item["ldapOverTLS"],
    serverCACertificate: item["serverCACertificate"],
    certificateCNHost: item["certificateCNHost"],
  };
}

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
  return {
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
  };
}

export function managedServiceIdentityDeserializer(item: any): ManagedServiceIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: item["userAssignedIdentities"],
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

/** NetApp account patch resource */
export interface NetAppAccountPatch {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** NetApp Account properties */
  properties?: AccountProperties;
  /** The identity used for the resource. */
  identity?: ManagedServiceIdentity;
}

export function netAppAccountPatchSerializer(item: NetAppAccountPatch): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : accountPropertiesSerializer(item["properties"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedServiceIdentitySerializer(item["identity"]),
  };
}

/** List of NetApp account resources */
export interface _NetAppAccountList {
  /** The NetAppAccount items on this page */
  value: NetAppAccount[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _netAppAccountListDeserializer(item: any): _NetAppAccountList {
  return {
    value: netAppAccountArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function netAppAccountArraySerializer(result: Array<NetAppAccount>): any[] {
  return result.map((item) => {
    return netAppAccountSerializer(item);
  });
}

export function netAppAccountArrayDeserializer(result: Array<NetAppAccount>): any[] {
  return result.map((item) => {
    return netAppAccountDeserializer(item);
  });
}

/** Encryption transition request */
export interface EncryptionTransitionRequest {
  /** Identifier for the virtual network */
  virtualNetworkId: string;
  /** Identifier of the private endpoint to reach the Azure Key Vault */
  privateEndpointId: string;
}

export function encryptionTransitionRequestSerializer(item: EncryptionTransitionRequest): any {
  return {
    virtualNetworkId: item["virtualNetworkId"],
    privateEndpointId: item["privateEndpointId"],
  };
}

/** Result of getKeyVaultStatus with information about how volumes under NetApp account are encrypted. */
export interface GetKeyVaultStatusResponse {
  /** Represents the properties of the getKeyVaultStatus. */
  properties?: GetKeyVaultStatusResponseProperties;
}

export function getKeyVaultStatusResponseDeserializer(item: any): GetKeyVaultStatusResponse {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : getKeyVaultStatusResponsePropertiesDeserializer(item["properties"]),
  };
}

/** Properties which represents Change key vault status. */
export interface GetKeyVaultStatusResponseProperties {
  /** The URI of the key vault/managed HSM that should be used for encryption. */
  keyVaultUri?: string;
  /** The name of the key that should be used for encryption. */
  keyName?: string;
  /** Azure resource ID of the key vault/managed HSM that should be used for encryption. */
  keyVaultResourceId?: string;
  /** Pairs of virtual network ID and private endpoint ID. Every virtual network that has volumes encrypted with customer-managed keys needs its own key vault private endpoint. */
  keyVaultPrivateEndpoints?: KeyVaultPrivateEndpoint[];
}

export function getKeyVaultStatusResponsePropertiesDeserializer(
  item: any,
): GetKeyVaultStatusResponseProperties {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVaultResourceId: item["keyVaultResourceId"],
    keyVaultPrivateEndpoints: !item["keyVaultPrivateEndpoints"]
      ? item["keyVaultPrivateEndpoints"]
      : keyVaultPrivateEndpointArrayDeserializer(item["keyVaultPrivateEndpoints"]),
  };
}

export function keyVaultPrivateEndpointArraySerializer(
  result: Array<KeyVaultPrivateEndpoint>,
): any[] {
  return result.map((item) => {
    return keyVaultPrivateEndpointSerializer(item);
  });
}

export function keyVaultPrivateEndpointArrayDeserializer(
  result: Array<KeyVaultPrivateEndpoint>,
): any[] {
  return result.map((item) => {
    return keyVaultPrivateEndpointDeserializer(item);
  });
}

/** Pairs of virtual network ID and private endpoint ID. Every virtual network that has volumes encrypted with customer-managed keys needs its own key vault private endpoint. */
export interface KeyVaultPrivateEndpoint {
  /** Identifier for the virtual network id */
  virtualNetworkId?: string;
  /** Identifier of the private endpoint to reach the Azure Key Vault */
  privateEndpointId?: string;
}

export function keyVaultPrivateEndpointSerializer(item: KeyVaultPrivateEndpoint): any {
  return {
    virtualNetworkId: item["virtualNetworkId"],
    privateEndpointId: item["privateEndpointId"],
  };
}

export function keyVaultPrivateEndpointDeserializer(item: any): KeyVaultPrivateEndpoint {
  return {
    virtualNetworkId: item["virtualNetworkId"],
    privateEndpointId: item["privateEndpointId"],
  };
}

/** Change key vault request */
export interface ChangeKeyVault {
  /** The URI of the key vault/managed HSM that should be used for encryption. */
  keyVaultUri: string;
  /** The name of the key that should be used for encryption. */
  keyName: string;
  /** Azure resource ID of the key vault/managed HSM that should be used for encryption. */
  keyVaultResourceId?: string;
  /** Pairs of virtual network ID and private endpoint ID. Every virtual network that has volumes encrypted with customer-managed keys needs its own key vault private endpoint. */
  keyVaultPrivateEndpoints: KeyVaultPrivateEndpoint[];
}

export function changeKeyVaultSerializer(item: ChangeKeyVault): any {
  return {
    keyVaultUri: item["keyVaultUri"],
    keyName: item["keyName"],
    keyVaultResourceId: item["keyVaultResourceId"],
    keyVaultPrivateEndpoints: keyVaultPrivateEndpointArraySerializer(
      item["keyVaultPrivateEndpoints"],
    ),
  };
}

/** Migrate Backups Request */
export interface BackupsMigrationRequest {
  /** The ResourceId of the Backup Vault */
  backupVaultId: string;
}

export function backupsMigrationRequestSerializer(item: BackupsMigrationRequest): any {
  return { backupVaultId: item["backupVaultId"] };
}

/** Capacity pool resource */
export interface CapacityPool extends TrackedResource {
  /** Capacity pool properties */
  properties: PoolProperties;
  /** "If etag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields.") */
  readonly etag?: string;
}

export function capacityPoolSerializer(item: CapacityPool): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: poolPropertiesSerializer(item["properties"]),
  };
}

export function capacityPoolDeserializer(item: any): CapacityPool {
  return {
    tags: item["tags"],
    location: item["location"],
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: poolPropertiesDeserializer(item["properties"]),
    etag: item["etag"],
  };
}

/** Pool properties */
export interface PoolProperties {
  /** UUID v4 used to identify the Pool */
  readonly poolId?: string;
  /** Provisioned size of the pool (in bytes). Allowed values are in 1TiB chunks (value must be multiple of 1099511627776). */
  size: number;
  /** The service level of the file system */
  serviceLevel: ServiceLevel;
  /** Azure lifecycle management */
  readonly provisioningState?: string;
  /** Total throughput of pool in MiB/s */
  readonly totalThroughputMibps?: number;
  /** Utilized throughput of pool in MiB/s */
  readonly utilizedThroughputMibps?: number;
  /** Maximum throughput in MiB/s that can be achieved by this pool and this will be accepted as input only for manual qosType pool with Flexible service level */
  customThroughputMibps?: number | null;
  /** The qos type of the pool */
  qosType?: QosType;
  /** If enabled (true) the pool can contain cool Access enabled volumes. */
  coolAccess?: boolean;
  /** Encryption type of the capacity pool, set encryption type for data at rest for this pool and all volumes in it. This value can only be set when creating new pool. */
  encryptionType?: EncryptionType | null;
}

export function poolPropertiesSerializer(item: PoolProperties): any {
  return {
    size: item["size"],
    serviceLevel: item["serviceLevel"],
    customThroughputMibps: item["customThroughputMibps"],
    qosType: item["qosType"],
    coolAccess: item["coolAccess"],
    encryptionType: item["encryptionType"],
  };
}

export function poolPropertiesDeserializer(item: any): PoolProperties {
  return {
    poolId: item["poolId"],
    size: item["size"],
    serviceLevel: item["serviceLevel"],
    provisioningState: item["provisioningState"],
    totalThroughputMibps: item["totalThroughputMibps"],
    utilizedThroughputMibps: item["utilizedThroughputMibps"],
    customThroughputMibps: item["customThroughputMibps"],
    qosType: item["qosType"],
    coolAccess: item["coolAccess"],
    encryptionType: item["encryptionType"],
  };
}

/** The qos type of the pool */
export enum KnownQosType {
  /** qos type Auto */
  Auto = "Auto",
  /** qos type Manual */
  Manual = "Manual",
}

/**
 * The qos type of the pool \
 * {@link KnownQosType} can be used interchangeably with QosType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Auto**: qos type Auto \
 * **Manual**: qos type Manual
 */
export type QosType = string;

/** Encryption type of the capacity pool, set encryption type for data at rest for this pool and all volumes in it. This value can only be set when creating new pool. */
export enum KnownEncryptionType {
  /** EncryptionType Single, volumes will use single encryption at rest */
  Single = "Single",
  /** EncryptionType Double, volumes will use double encryption at rest */
  Double = "Double",
}

/**
 * Encryption type of the capacity pool, set encryption type for data at rest for this pool and all volumes in it. This value can only be set when creating new pool. \
 * {@link KnownEncryptionType} can be used interchangeably with EncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Single**: EncryptionType Single, volumes will use single encryption at rest \
 * **Double**: EncryptionType Double, volumes will use double encryption at rest
 */
export type EncryptionType = string;

/** Capacity pool patch resource */
export interface CapacityPoolPatch {
  /** Resource location */
  location?: string;
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** Resource tags */
  tags?: Record<string, string>;
  /** Capacity pool properties */
  properties?: PoolPatchProperties;
}

export function capacityPoolPatchSerializer(item: CapacityPoolPatch): any {
  return {
    location: item["location"],
    tags: item["tags"],
    properties: !item["properties"]
      ? item["properties"]
      : poolPatchPropertiesSerializer(item["properties"]),
  };
}

/** Patchable pool properties */
export interface PoolPatchProperties {
  /** Provisioned size of the pool (in bytes). Allowed values are in 1TiB chunks (value must be multiple of 1099511627776). */
  size?: number;
  /** The qos type of the pool */
  qosType?: QosType;
  /** If enabled (true) the pool can contain cool Access enabled volumes. */
  coolAccess?: boolean;
  /** Maximum throughput in MiB/s that can be achieved by this pool and this will be accepted as input only for manual qosType pool with Flexible service level */
  customThroughputMibps?: number | null;
}

export function poolPatchPropertiesSerializer(item: PoolPatchProperties): any {
  return {
    size: item["size"],
    qosType: item["qosType"],
    coolAccess: item["coolAccess"],
    customThroughputMibps: item["customThroughputMibps"],
  };
}

/** List of capacity pool resources */
export interface _CapacityPoolList {
  /** The CapacityPool items on this page */
  value: CapacityPool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _capacityPoolListDeserializer(item: any): _CapacityPoolList {
  return {
    value: capacityPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function capacityPoolArraySerializer(result: Array<CapacityPool>): any[] {
  return result.map((item) => {
    return capacityPoolSerializer(item);
  });
}

export function capacityPoolArrayDeserializer(result: Array<CapacityPool>): any[] {
  return result.map((item) => {
    return capacityPoolDeserializer(item);
  });
}

/** Restore payload for Single File Backup Restore */
export interface BackupRestoreFiles {
  /** List of files to be restored */
  fileList: string[];
  /** Destination folder where the files will be restored. The path name should start with a forward slash. If it is omitted from request then restore is done at the root folder of the destination volume by default */
  restoreFilePath?: string;
  /** Resource Id of the destination volume on which the files need to be restored */
  destinationVolumeId: string;
}

export function backupRestoreFilesSerializer(item: BackupRestoreFiles): any {
  return {
    fileList: item["fileList"].map((p: any) => {
      return p;
    }),
    restoreFilePath: item["restoreFilePath"],
    destinationVolumeId: item["destinationVolumeId"],
  };
}

/** Subvolume Information properties */
export interface SubvolumeInfo extends ProxyResource {
  /** Subvolume Properties */
  properties?: SubvolumeProperties;
}

export function subvolumeInfoSerializer(item: SubvolumeInfo): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subvolumePropertiesSerializer(item["properties"]),
  };
}

export function subvolumeInfoDeserializer(item: any): SubvolumeInfo {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : subvolumePropertiesDeserializer(item["properties"]),
  };
}

/** This represents path associated with the subvolume */
export interface SubvolumeProperties {
  /** Path to the subvolume */
  path?: string;
  /** Truncate subvolume to the provided size in bytes */
  size?: number | null;
  /** parent path to the subvolume */
  parentPath?: string | null;
  /** Azure lifecycle management */
  readonly provisioningState?: string;
}

export function subvolumePropertiesSerializer(item: SubvolumeProperties): any {
  return {
    path: item["path"],
    size: item["size"],
    parentPath: item["parentPath"],
  };
}

export function subvolumePropertiesDeserializer(item: any): SubvolumeProperties {
  return {
    path: item["path"],
    size: item["size"],
    parentPath: item["parentPath"],
    provisioningState: item["provisioningState"],
  };
}

/** Subvolume Patch Request properties */
export interface SubvolumePatchRequest {
  /** Subvolume Properties */
  properties?: SubvolumePatchParams;
}

export function subvolumePatchRequestSerializer(item: SubvolumePatchRequest): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : subvolumePatchParamsSerializer(item["properties"]),
  };
}

/** Parameters with which a subvolume can be updated */
export interface SubvolumePatchParams {
  /** Truncate subvolume to the provided size in bytes */
  size?: number | null;
  /** path to the subvolume */
  path?: string;
}

export function subvolumePatchParamsSerializer(item: SubvolumePatchParams): any {
  return { size: item["size"], path: item["path"] };
}

/** List of Subvolumes */
export interface _SubvolumesList {
  /** The SubvolumeInfo items on this page */
  value: SubvolumeInfo[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _subvolumesListDeserializer(item: any): _SubvolumesList {
  return {
    value: subvolumeInfoArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function subvolumeInfoArraySerializer(result: Array<SubvolumeInfo>): any[] {
  return result.map((item) => {
    return subvolumeInfoSerializer(item);
  });
}

export function subvolumeInfoArrayDeserializer(result: Array<SubvolumeInfo>): any[] {
  return result.map((item) => {
    return subvolumeInfoDeserializer(item);
  });
}

/** Result of the post subvolume and action is to get metadata of the subvolume. */
export interface SubvolumeModel {
  /** Resource Id */
  readonly id?: string;
  /** Resource name */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
  /** It represents the minimal properties of the subvolume. */
  properties?: SubvolumeModelProperties;
}

export function subvolumeModelDeserializer(item: any): SubvolumeModel {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    properties: !item["properties"]
      ? item["properties"]
      : subvolumeModelPropertiesDeserializer(item["properties"]),
  };
}

/** Properties which represents actual subvolume model which is stored as a file in the system. */
export interface SubvolumeModelProperties {
  /** Path to the subvolume */
  path?: string;
  /** Path to the parent subvolume */
  parentPath?: string;
  /** Size of subvolume */
  size?: number;
  /** Bytes used */
  bytesUsed?: number;
  /** Permissions of the subvolume */
  permissions?: string;
  /** Creation time and date */
  creationTimeStamp?: Date;
  /** Most recent access time and date */
  accessedTimeStamp?: Date;
  /** Most recent modification time and date */
  modifiedTimeStamp?: Date;
  /** Most recent change time and date */
  changedTimeStamp?: Date;
  /** Azure lifecycle management */
  provisioningState?: string;
}

export function subvolumeModelPropertiesDeserializer(item: any): SubvolumeModelProperties {
  return {
    path: item["path"],
    parentPath: item["parentPath"],
    size: item["size"],
    bytesUsed: item["bytesUsed"],
    permissions: item["permissions"],
    creationTimeStamp: !item["creationTimeStamp"]
      ? item["creationTimeStamp"]
      : new Date(item["creationTimeStamp"]),
    accessedTimeStamp: !item["accessedTimeStamp"]
      ? item["accessedTimeStamp"]
      : new Date(item["accessedTimeStamp"]),
    modifiedTimeStamp: !item["modifiedTimeStamp"]
      ? item["modifiedTimeStamp"]
      : new Date(item["modifiedTimeStamp"]),
    changedTimeStamp: !item["changedTimeStamp"]
      ? item["changedTimeStamp"]
      : new Date(item["changedTimeStamp"]),
    provisioningState: item["provisioningState"],
  };
}

/** Resource name availability request content. */
export interface ResourceNameAvailabilityRequest {
  /** Resource name to verify. */
  name: string;
  /** Resource type used for verification. */
  type: CheckNameResourceTypes;
  /** Resource group name. */
  resourceGroup: string;
}

export function resourceNameAvailabilityRequestSerializer(
  item: ResourceNameAvailabilityRequest,
): any {
  return {
    name: item["name"],
    type: item["type"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Resource type used for verification. */
export enum KnownCheckNameResourceTypes {
  /** Microsoft.NetApp/netAppAccounts */
  MicrosoftNetAppNetAppAccounts = "Microsoft.NetApp/netAppAccounts",
  /** Microsoft.NetApp/netAppAccounts/capacityPools */
  MicrosoftNetAppNetAppAccountsCapacityPools = "Microsoft.NetApp/netAppAccounts/capacityPools",
  /** Microsoft.NetApp/netAppAccounts/capacityPools/volumes */
  MicrosoftNetAppNetAppAccountsCapacityPoolsVolumes = "Microsoft.NetApp/netAppAccounts/capacityPools/volumes",
  /** Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots */
  MicrosoftNetAppNetAppAccountsCapacityPoolsVolumesSnapshots = "Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots",
  /** ANF Backup under a volume , deprecated, use `Microsoft.NetApp/netAppAccounts/backupVaults/backups` instead. */
  MicrosoftNetAppNetAppAccountsBackupVaultsBackups = "Microsoft.NetApp/netAppAccounts/backupVaults/backups",
  /** ANF Backup under a Backup Vault */
  MicrosoftNetAppNetAppAccountsCapacityPoolsVolumesBackups = "Microsoft.NetApp/netAppAccounts/capacityPools/volumes/backups",
}

/**
 * Resource type used for verification. \
 * {@link KnownCheckNameResourceTypes} can be used interchangeably with CheckNameResourceTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.NetApp\/netAppAccounts** \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools** \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools\/volumes** \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools\/volumes\/snapshots** \
 * **Microsoft.NetApp\/netAppAccounts\/backupVaults\/backups**: ANF Backup under a volume , deprecated, use `Microsoft.NetApp\/netAppAccounts\/backupVaults\/backups` instead. \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools\/volumes\/backups**: ANF Backup under a Backup Vault
 */
export type CheckNameResourceTypes = string;

/** Information regarding availability of a resource. */
export interface CheckAvailabilityResponse {
  /** <code>true</code> indicates name is valid and available. <code>false</code> indicates the name is invalid, unavailable, or both. */
  isAvailable?: boolean;
  /** <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. */
  reason?: InAvailabilityReasonType;
  /** If reason == invalid, provide the user with the reason why the given name is invalid, and provide the resource naming requirements so that the user can select a valid name. If reason == AlreadyExists, explain that resource name is already in use, and direct them to select a different name. */
  message?: string;
}

export function checkAvailabilityResponseDeserializer(item: any): CheckAvailabilityResponse {
  return {
    isAvailable: item["isAvailable"],
    reason: item["reason"],
    message: item["message"],
  };
}

/** <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. */
export enum KnownInAvailabilityReasonType {
  /** Invalid */
  Invalid = "Invalid",
  /** AlreadyExists */
  AlreadyExists = "AlreadyExists",
}

/**
 * <code>Invalid</code> indicates the name provided does not match Azure App Service naming requirements. <code>AlreadyExists</code> indicates that the name is already in use and is therefore unavailable. \
 * {@link KnownInAvailabilityReasonType} can be used interchangeably with InAvailabilityReasonType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid** \
 * **AlreadyExists**
 */
export type InAvailabilityReasonType = string;

/** File path availability request content - availability is based on the name and the subnetId. */
export interface FilePathAvailabilityRequest {
  /** File path to verify. */
  name: string;
  /** The Azure Resource URI for a delegated subnet. Must have the delegation Microsoft.NetApp/volumes */
  subnetId: string;
  /** The Azure Resource logical availability zone which is used within zone mapping lookup for the subscription and region. The lookup will retrieve the physical zone where volume is placed. */
  availabilityZone?: string | null;
}

export function filePathAvailabilityRequestSerializer(item: FilePathAvailabilityRequest): any {
  return {
    name: item["name"],
    subnetId: item["subnetId"],
    availabilityZone: item["availabilityZone"],
  };
}

/** Quota availability request content. */
export interface QuotaAvailabilityRequest {
  /** Name of the resource to verify. */
  name: string;
  /** Resource type used for verification. */
  type: CheckQuotaNameResourceTypes;
  /** Resource group name. */
  resourceGroup: string;
}

export function quotaAvailabilityRequestSerializer(item: QuotaAvailabilityRequest): any {
  return {
    name: item["name"],
    type: item["type"],
    resourceGroup: item["resourceGroup"],
  };
}

/** Resource type used for verification. */
export enum KnownCheckQuotaNameResourceTypes {
  /** Microsoft.NetApp/netAppAccounts */
  MicrosoftNetAppNetAppAccounts = "Microsoft.NetApp/netAppAccounts",
  /** Microsoft.NetApp/netAppAccounts/capacityPools */
  MicrosoftNetAppNetAppAccountsCapacityPools = "Microsoft.NetApp/netAppAccounts/capacityPools",
  /** Microsoft.NetApp/netAppAccounts/capacityPools/volumes */
  MicrosoftNetAppNetAppAccountsCapacityPoolsVolumes = "Microsoft.NetApp/netAppAccounts/capacityPools/volumes",
  /** Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots */
  MicrosoftNetAppNetAppAccountsCapacityPoolsVolumesSnapshots = "Microsoft.NetApp/netAppAccounts/capacityPools/volumes/snapshots",
  /** ANF Backup under a volume , deprecated, use `Microsoft.NetApp/netAppAccounts/backupVaults/backups` instead. */
  MicrosoftNetAppNetAppAccountsBackupVaultsBackups = "Microsoft.NetApp/netAppAccounts/backupVaults/backups",
  /** ANF Backup under a Backup Vault */
  MicrosoftNetAppNetAppAccountsCapacityPoolsVolumesBackups = "Microsoft.NetApp/netAppAccounts/capacityPools/volumes/backups",
}

/**
 * Resource type used for verification. \
 * {@link KnownCheckQuotaNameResourceTypes} can be used interchangeably with CheckQuotaNameResourceTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Microsoft.NetApp\/netAppAccounts** \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools** \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools\/volumes** \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools\/volumes\/snapshots** \
 * **Microsoft.NetApp\/netAppAccounts\/backupVaults\/backups**: ANF Backup under a volume , deprecated, use `Microsoft.NetApp\/netAppAccounts\/backupVaults\/backups` instead. \
 * **Microsoft.NetApp\/netAppAccounts\/capacityPools\/volumes\/backups**: ANF Backup under a Backup Vault
 */
export type CheckQuotaNameResourceTypes = string;

/** Network sibling set query. */
export interface QueryNetworkSiblingSetRequest {
  /** Network Sibling Set ID for a group of volumes sharing networking resources in a subnet. */
  networkSiblingSetId: string;
  /** The Azure Resource URI for a delegated subnet. Must have the delegation Microsoft.NetApp/volumes. Example /subscriptions/subscriptionId/resourceGroups/resourceGroup/providers/Microsoft.Network/virtualNetworks/testVnet/subnets/{mySubnet} */
  subnetId: string;
}

export function queryNetworkSiblingSetRequestSerializer(item: QueryNetworkSiblingSetRequest): any {
  return {
    networkSiblingSetId: item["networkSiblingSetId"],
    subnetId: item["subnetId"],
  };
}

/** Describes the contents of a network sibling set. */
export interface NetworkSiblingSet {
  /** Network Sibling Set ID for a group of volumes sharing networking resources in a subnet. */
  networkSiblingSetId?: string;
  /** The Azure Resource URI for a delegated subnet. Must have the delegation Microsoft.NetApp/volumes. Example /subscriptions/subscriptionId/resourceGroups/resourceGroup/providers/Microsoft.Network/virtualNetworks/testVnet/subnets/{mySubnet} */
  subnetId?: string;
  /** Network sibling set state Id identifying the current state of the sibling set. */
  networkSiblingSetStateId?: string;
  /** Network features available to the volume, or current state of update. */
  networkFeatures?: NetworkFeatures;
  /** Gets the status of the NetworkSiblingSet at the time the operation was called. */
  readonly provisioningState?: NetworkSiblingSetProvisioningState;
  /** List of NIC information */
  nicInfoList?: NicInfo[];
}

export function networkSiblingSetDeserializer(item: any): NetworkSiblingSet {
  return {
    networkSiblingSetId: item["networkSiblingSetId"],
    subnetId: item["subnetId"],
    networkSiblingSetStateId: item["networkSiblingSetStateId"],
    networkFeatures: item["networkFeatures"],
    provisioningState: item["provisioningState"],
    nicInfoList: !item["nicInfoList"]
      ? item["nicInfoList"]
      : nicInfoArrayDeserializer(item["nicInfoList"]),
  };
}

/** Gets the status of the NetworkSiblingSet at the time the operation was called. */
export enum KnownNetworkSiblingSetProvisioningState {
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
  /** Updating */
  Updating = "Updating",
}

/**
 * Gets the status of the NetworkSiblingSet at the time the operation was called. \
 * {@link KnownNetworkSiblingSetProvisioningState} can be used interchangeably with NetworkSiblingSetProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded** \
 * **Failed** \
 * **Canceled** \
 * **Updating**
 */
export type NetworkSiblingSetProvisioningState = string;

export function nicInfoArrayDeserializer(result: Array<NicInfo>): any[] {
  return result.map((item) => {
    return nicInfoDeserializer(item);
  });
}

/** NIC information and list of volumes for which the NIC has the primary mount ip address. */
export interface NicInfo {
  /** ipAddress */
  readonly ipAddress?: string;
  /** Volume resource Ids */
  volumeResourceIds?: string[];
}

export function nicInfoDeserializer(item: any): NicInfo {
  return {
    ipAddress: item["ipAddress"],
    volumeResourceIds: !item["volumeResourceIds"]
      ? item["volumeResourceIds"]
      : item["volumeResourceIds"].map((p: any) => {
          return p;
        }),
  };
}

/** Network sibling set update. */
export interface UpdateNetworkSiblingSetRequest {
  /** Network Sibling Set ID for a group of volumes sharing networking resources in a subnet. */
  networkSiblingSetId: string;
  /** The Azure Resource URI for a delegated subnet. Must have the delegation Microsoft.NetApp/volumes. Example /subscriptions/subscriptionId/resourceGroups/resourceGroup/providers/Microsoft.Network/virtualNetworks/testVnet/subnets/{mySubnet} */
  subnetId: string;
  /** Network sibling set state Id identifying the current state of the sibling set. */
  networkSiblingSetStateId: string;
  /** Network features available to the volume. */
  networkFeatures: NetworkFeatures;
}

export function updateNetworkSiblingSetRequestSerializer(
  item: UpdateNetworkSiblingSetRequest,
): any {
  return {
    networkSiblingSetId: item["networkSiblingSetId"],
    subnetId: item["subnetId"],
    networkSiblingSetStateId: item["networkSiblingSetStateId"],
    networkFeatures: item["networkFeatures"],
  };
}

/** Usages result */
export interface _UsagesListResult {
  /** The UsageResult items on this page */
  value: UsageResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _usagesListResultDeserializer(item: any): _UsagesListResult {
  return {
    value: usageResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function usageResultArrayDeserializer(result: Array<UsageResult>): any[] {
  return result.map((item) => {
    return usageResultDeserializer(item);
  });
}

/** Usages entity model */
export interface UsageResult {
  /** The id of the usage. */
  readonly id?: string;
  /** The name of the usage. */
  readonly name?: UsageName;
  /** Usage properties */
  properties?: UsageProperties;
}

export function usageResultDeserializer(item: any): UsageResult {
  return {
    id: item["id"],
    name: !item["name"] ? item["name"] : usageNameDeserializer(item["name"]),
    properties: !item["properties"]
      ? item["properties"]
      : usagePropertiesDeserializer(item["properties"]),
  };
}

/** The name of the usage. */
export interface UsageName {
  /** The name of the usage. */
  value?: string;
  /** The localized name of the usage. */
  localizedValue?: string;
}

export function usageNameDeserializer(item: any): UsageName {
  return {
    value: item["value"],
    localizedValue: item["localizedValue"],
  };
}

/** Usage properties */
export interface UsageProperties {
  /** The current usage value for the subscription. */
  readonly currentValue?: number;
  /** The limit of the usage. */
  readonly limit?: number;
  /** The unit of the usage. */
  readonly unit?: string;
}

export function usagePropertiesDeserializer(item: any): UsageProperties {
  return {
    currentValue: item["currentValue"],
    limit: item["limit"],
    unit: item["unit"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-06-01 API version. */
  V20250601 = "2025-06-01",
  /** The 2025-08-01 API version. */
  V20250801 = "2025-08-01",
  /** The 2025-09-01 API version. */
  V20250901 = "2025-09-01",
}
