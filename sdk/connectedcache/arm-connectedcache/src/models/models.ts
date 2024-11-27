// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** Represents the high level Nodes needed to provision cache node resources */
export interface EnterpriseMccCacheNodeResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CacheNodeProperty;
}

export function enterpriseMccCacheNodeResourceSerializer(
  item: EnterpriseMccCacheNodeResource,
): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cacheNodePropertySerializer(item["properties"]),
  };
}

export function enterpriseMccCacheNodeResourceDeserializer(
  item: any,
): EnterpriseMccCacheNodeResource {
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
      : cacheNodePropertyDeserializer(item["properties"]),
  };
}

/** Model representing an Mcc cache node connectedCache resource */
export interface CacheNodeProperty {
  /** The provisioned state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Mcc cache node resource (cache node entity). */
  cacheNode?: CacheNodeEntity;
  /** Mcc cache node resource additional properties. */
  additionalCacheNodeProperties?: AdditionalCacheNodeProperties;
  /** Mcc response status code. */
  statusCode?: string;
  /** Mcc response status text as string for retrieving status details. */
  statusText?: string;
  /** Mcc response status details for retrieving response inner details. */
  statusDetails?: string;
  /** HTTP error status code. */
  readonly status?: string;
  /** Mcc response error details. */
  error?: ErrorDetail;
}

export function cacheNodePropertySerializer(item: CacheNodeProperty): any {
  return {
    cacheNode: !item["cacheNode"]
      ? item["cacheNode"]
      : cacheNodeEntitySerializer(item["cacheNode"]),
    additionalCacheNodeProperties: !item["additionalCacheNodeProperties"]
      ? item["additionalCacheNodeProperties"]
      : additionalCacheNodePropertiesSerializer(item["additionalCacheNodeProperties"]),
    statusCode: item["statusCode"],
    statusText: item["statusText"],
    statusDetails: item["statusDetails"],
    error: !item["error"] ? item["error"] : errorDetailSerializer(item["error"]),
  };
}

export function cacheNodePropertyDeserializer(item: any): CacheNodeProperty {
  return {
    provisioningState: item["provisioningState"],
    cacheNode: !item["cacheNode"]
      ? item["cacheNode"]
      : cacheNodeEntityDeserializer(item["cacheNode"]),
    additionalCacheNodeProperties: !item["additionalCacheNodeProperties"]
      ? item["additionalCacheNodeProperties"]
      : additionalCacheNodePropertiesDeserializer(item["additionalCacheNodeProperties"]),
    statusCode: item["statusCode"],
    statusText: item["statusText"],
    statusDetails: item["statusDetails"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** provisioning state of the resource */
export enum KnownProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** unknown  state of the provisioning state */
  Unknown = "Unknown",
  /** Accepted state of the provisioning state during the Async Operations */
  Accepted = "Accepted",
  /** Upgrading state of the provisioning state */
  Upgrading = "Upgrading",
  /** Deleting state of the provisioning state */
  Deleting = "Deleting",
}

/**
 * provisioning state of the resource \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Unknown**: unknown  state of the provisioning state \
 * **Accepted**: Accepted state of the provisioning state during the Async Operations \
 * **Upgrading**: Upgrading state of the provisioning state \
 * **Deleting**: Deleting state of the provisioning state
 */
export type ProvisioningState = string;

/** Model representing Cache Node for ConnectedCache resource */
export interface CacheNodeEntity {
  /** Cache node resource Azure fully qualified resource Id. */
  fullyQualifiedResourceId?: string;
  /** Cache node resource customer resource GUID Id. */
  readonly customerId?: string;
  /** Cache node resource customer resource name. */
  customerName?: string;
  /** Cache node resource Ip address. */
  ipAddress?: string;
  /** Cache node resource customer index as string. */
  customerIndex?: string;
  /** Cache node resource identifier of the cache node */
  cacheNodeId?: string;
  /** Cache node resource name. */
  cacheNodeName?: string;
  /** Cache node resource customer resource Asn (autonomous system number) */
  customerAsn?: number;
  /** Cache node resource flag for indicating if cache node is enabled. */
  isEnabled?: boolean;
  /** Cache node resource maximum allowed egress in Mbps. */
  maxAllowableEgressInMbps?: number;
  /** Cache node resource maximum allowed probability of egress. */
  readonly maxAllowableProbability?: number;
  /** Cache node resource Azure XCid. */
  readonly xCid?: string;
  /** Cache node resource flag for determining if managed by enterprise as boolean. */
  isEnterpriseManaged?: boolean;
  /** Cache node resource create async operation Id. */
  readonly createAsyncOperationId?: string;
  /** Cache node resource deletion async operation Id. */
  readonly deleteAsyncOperationId?: string;
  /** Cache node resource customer resource client tenant Id of subscription. */
  readonly clientTenantId?: string;
  /** Cache node resource category. */
  readonly category?: string;
  /** Cache node resource release version. */
  readonly releaseVersion?: number;
  /** Cache node resource last sync timestamp. */
  readonly lastSyncWithAzureTimestamp?: Date;
  /** Cache node resource last backend updated timestamp. */
  readonly lastUpdatedTimestamp?: Date;
  /** Cache node resource attempts to sync with Azure. */
  readonly synchWithAzureAttemptsCount?: number;
  /** Cache node resource container configuration details. */
  readonly containerConfigurations?: string;
  /** Cache node resource comma separated values of Cidrs. */
  cidrCsv?: string[];
  /** Cache node resource last Cidr Csv update timestamp */
  readonly cidrCsvLastUpdateTime?: Date;
  /** Cache node resource last Bgp Cidr Csv update timestamp */
  readonly bgpCidrCsvLastUpdateTime?: Date;
  /** Cache node resource last Bgp report timestamp. */
  readonly bgpLastReportedTime?: Date;
  /** Cache node resource Bgp review state string text in detail. */
  readonly bgpReviewStateText?: string;
  /** Cache node resource Bgp review state string text. */
  readonly bgpReviewState?: BgpReviewStateEnum;
  /** Cache node resource Bgp review feedback text. */
  readonly bgpReviewFeedback?: string;
  /** Cache node resource Bgp update count. */
  readonly bgpNumberOfTimesUpdated?: number;
  /** Cache node resource Bgp record count. */
  readonly bgpNumberOfRecords?: number;
  /** Cache node resource Bgp block count. */
  readonly bgpCidrBlocksCount?: number;
  /** Cache node resource total addressable space defined by Bgp and Cidr Csv blocks. */
  readonly bgpAddressSpace?: number;
  /** Cache node resource flag for determining if customer will be migrated. */
  shouldMigrate?: boolean;
  /** Cache node resource bytes truncated from Bgp output file. */
  readonly bgpFileBytesTruncated?: number;
  /** Cache node resource current Cidr range precedence selection type. */
  cidrSelectionType?: number;
  /** Cache node resource flag for indicating the cache node resource is frozen (not selectable, not editable in UI). */
  readonly isFrozen?: boolean;
  /** Cache node resource review process state as integer */
  readonly reviewState?: number;
  /** Cache node resource review state text. */
  readonly reviewStateText?: string;
  /** Cache node resource review feedback text. */
  readonly reviewFeedback?: string;
  /** Cache node resource configuration state. */
  readonly configurationState?: ConfigurationState;
  /** Cache node resource configuration state text. */
  readonly configurationStateText?: string;
  /** Cache node resource total addressable space defined by the Cidr Csv block. */
  readonly addressSpace?: number;
  /** Cache node resource Mcc container deployment worker connection count. */
  readonly workerConnections?: number;
  /** Cache node resource last updated Mcc container deployment worker connection count timestamp. */
  readonly workerConnectionsLastUpdatedDateTime?: Date;
  /** Cache node resource Mcc container configuration details re-sync trigger. */
  readonly containerResyncTrigger?: number;
  /** Cache node resource Mcc Container Id Uri. */
  readonly imageUri?: string;
  /** FQDN(fully qualified domain name) value of the mcc cache node */
  fullyQualifiedDomainName?: string;
  /** Auto Update Ring Type which is slow or fast etc. */
  autoUpdateRingType?: AutoUpdateRingType;
  /** Customer requested week of month for mcc install of auto update cycle */
  autoUpdateRequestedWeek?: number;
  /** Customer requested day of week for mcc install of auto update cycle */
  autoUpdateRequestedDay?: number;
  /** Customer requested time of the day for mcc install of auto update cycle, should be hh:mm */
  autoUpdateRequestedTime?: string;
}

export function cacheNodeEntitySerializer(item: CacheNodeEntity): any {
  return {
    fullyQualifiedResourceId: item["fullyQualifiedResourceId"],
    customerName: item["customerName"],
    ipAddress: item["ipAddress"],
    customerIndex: item["customerIndex"],
    cacheNodeId: item["cacheNodeId"],
    cacheNodeName: item["cacheNodeName"],
    customerAsn: item["customerAsn"],
    isEnabled: item["isEnabled"],
    maxAllowableEgressInMbps: item["maxAllowableEgressInMbps"],
    isEnterpriseManaged: item["isEnterpriseManaged"],
    cidrCsv: !item["cidrCsv"]
      ? item["cidrCsv"]
      : item["cidrCsv"].map((p: any) => {
          return p;
        }),
    shouldMigrate: item["shouldMigrate"],
    cidrSelectionType: item["cidrSelectionType"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    autoUpdateRingType: item["autoUpdateRingType"],
    autoUpdateRequestedWeek: item["autoUpdateRequestedWeek"],
    autoUpdateRequestedDay: item["autoUpdateRequestedDay"],
    autoUpdateRequestedTime: item["autoUpdateRequestedTime"],
  };
}

export function cacheNodeEntityDeserializer(item: any): CacheNodeEntity {
  return {
    fullyQualifiedResourceId: item["fullyQualifiedResourceId"],
    customerId: item["customerId"],
    customerName: item["customerName"],
    ipAddress: item["ipAddress"],
    customerIndex: item["customerIndex"],
    cacheNodeId: item["cacheNodeId"],
    cacheNodeName: item["cacheNodeName"],
    customerAsn: item["customerAsn"],
    isEnabled: item["isEnabled"],
    maxAllowableEgressInMbps: item["maxAllowableEgressInMbps"],
    maxAllowableProbability: item["maxAllowableProbability"],
    xCid: item["xCid"],
    isEnterpriseManaged: item["isEnterpriseManaged"],
    createAsyncOperationId: item["createAsyncOperationId"],
    deleteAsyncOperationId: item["deleteAsyncOperationId"],
    clientTenantId: item["clientTenantId"],
    category: item["category"],
    releaseVersion: item["releaseVersion"],
    lastSyncWithAzureTimestamp: !item["lastSyncWithAzureTimestamp"]
      ? item["lastSyncWithAzureTimestamp"]
      : new Date(item["lastSyncWithAzureTimestamp"]),
    lastUpdatedTimestamp: !item["lastUpdatedTimestamp"]
      ? item["lastUpdatedTimestamp"]
      : new Date(item["lastUpdatedTimestamp"]),
    synchWithAzureAttemptsCount: item["synchWithAzureAttemptsCount"],
    containerConfigurations: item["containerConfigurations"],
    cidrCsv: !item["cidrCsv"]
      ? item["cidrCsv"]
      : item["cidrCsv"].map((p: any) => {
          return p;
        }),
    cidrCsvLastUpdateTime: !item["cidrCsvLastUpdateTime"]
      ? item["cidrCsvLastUpdateTime"]
      : new Date(item["cidrCsvLastUpdateTime"]),
    bgpCidrCsvLastUpdateTime: !item["bgpCidrCsvLastUpdateTime"]
      ? item["bgpCidrCsvLastUpdateTime"]
      : new Date(item["bgpCidrCsvLastUpdateTime"]),
    bgpLastReportedTime: !item["bgpLastReportedTime"]
      ? item["bgpLastReportedTime"]
      : new Date(item["bgpLastReportedTime"]),
    bgpReviewStateText: item["bgpReviewStateText"],
    bgpReviewState: item["bgpReviewState"],
    bgpReviewFeedback: item["bgpReviewFeedback"],
    bgpNumberOfTimesUpdated: item["bgpNumberOfTimesUpdated"],
    bgpNumberOfRecords: item["bgpNumberOfRecords"],
    bgpCidrBlocksCount: item["bgpCidrBlocksCount"],
    bgpAddressSpace: item["bgpAddressSpace"],
    shouldMigrate: item["shouldMigrate"],
    bgpFileBytesTruncated: item["bgpFileBytesTruncated"],
    cidrSelectionType: item["cidrSelectionType"],
    isFrozen: item["isFrozen"],
    reviewState: item["reviewState"],
    reviewStateText: item["reviewStateText"],
    reviewFeedback: item["reviewFeedback"],
    configurationState: item["configurationState"],
    configurationStateText: item["configurationStateText"],
    addressSpace: item["addressSpace"],
    workerConnections: item["workerConnections"],
    workerConnectionsLastUpdatedDateTime: !item["workerConnectionsLastUpdatedDateTime"]
      ? item["workerConnectionsLastUpdatedDateTime"]
      : new Date(item["workerConnectionsLastUpdatedDateTime"]),
    containerResyncTrigger: item["containerResyncTrigger"],
    imageUri: item["imageUri"],
    fullyQualifiedDomainName: item["fullyQualifiedDomainName"],
    autoUpdateRingType: item["autoUpdateRingType"],
    autoUpdateRequestedWeek: item["autoUpdateRequestedWeek"],
    autoUpdateRequestedDay: item["autoUpdateRequestedDay"],
    autoUpdateRequestedTime: item["autoUpdateRequestedTime"],
  };
}

/** Cache node resource Bgp review state as integer */
export enum KnownBgpReviewStateEnum {
  /** bgp not configured */
  NotConfigured = "NotConfigured",
  /** bgp is in review state */
  InReview = "InReview",
  /** bgp is in Approved state */
  Approved = "Approved",
  /** bgp is setup need an attention for more troubleshoot */
  AttentionRequired = "AttentionRequired",
}

/**
 * Cache node resource Bgp review state as integer \
 * {@link KnownBgpReviewStateEnum} can be used interchangeably with BgpReviewStateEnum,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NotConfigured**: bgp not configured \
 * **InReview**: bgp is in review state \
 * **Approved**: bgp is in Approved state \
 * **AttentionRequired**: bgp is setup need an attention for more troubleshoot
 */
export type BgpReviewStateEnum = string;

/** Cache node configuration setup state */
export enum KnownConfigurationState {
  /** connected cache setup configured */
  Configured = "Configured",
  /** connected cache setup not configured */
  NotConfigured_Ip = "NotConfigured_Ip",
}

/**
 * Cache node configuration setup state \
 * {@link KnownConfigurationState} can be used interchangeably with ConfigurationState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Configured**: connected cache setup configured \
 * **NotConfigured_Ip**: connected cache setup not configured
 */
export type ConfigurationState = string;

/** Auto update Ring type */
export enum KnownAutoUpdateRingType {
  /** customer selection of preview update install mcc on their physical vm */
  Preview = "Preview",
  /** customer selection of slow update to install mcc on their physical vm */
  Slow = "Slow",
  /** customer selection of fast / auto update to install mcc on their physical vm */
  Fast = "Fast",
}

/**
 * Auto update Ring type \
 * {@link KnownautoUpdateRingType} can be used interchangeably with autoUpdateRingType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: customer selection of preview update install mcc on their physical vm \
 * **Slow**: customer selection of slow update to install mcc on their physical vm \
 * **Fast**: customer selection of fast \/ auto update to install mcc on their physical vm
 */
export type AutoUpdateRingType = string;

/** Model representing cache node for connected cache resource */
export interface AdditionalCacheNodeProperties {
  /** issues list to return the issues as part of the additional cache node properties */
  cacheNodePropertiesDetailsIssuesList?: string[];
  /** Cache node resource aggregated status details. */
  readonly aggregatedStatusDetails?: string;
  /** Cache node resource aggregated status text. */
  readonly aggregatedStatusText?: string;
  /** Cache node resource aggregated status code. */
  readonly aggregatedStatusCode?: number;
  /** Cache node resource Mcc product version. */
  readonly productVersion?: string;
  /** Cache node resource flag indicating if cache node has been physically installed or provisioned on their physical lab. */
  readonly isProvisioned?: boolean;
  /** Cache node resource detailed state text. */
  readonly cacheNodeStateDetailedText?: string;
  /** Cache node resource short state text. */
  readonly cacheNodeStateShortText?: string;
  /** Cache node resource state as integer. */
  readonly cacheNodeState?: number;
  /** Cache node resource drive configurations. */
  driveConfiguration?: CacheNodeDriveConfiguration[];
  /** Cache node resource Bgp configuration. */
  bgpConfiguration?: BgpConfiguration;
  /** proxyUrl configuration of the cache node */
  proxyUrlConfiguration?: ProxyUrlConfiguration;
  /** Cache node resource Mcc proxy Url */
  proxyUrl?: string;
  /** Cache node resource requires a proxy */
  isProxyRequired?: ProxyRequired;
  /** Operating system of the cache node */
  osType?: OsType;
  /** Update Cycle Type */
  updateCycleType?: CycleType;
  /** Auto update or fast update version */
  autoUpdateVersion?: string;
  /** Update related information details */
  updateInfoDetails?: string;
  /** customer requested date time for mcc install of update cycle */
  updateRequestedDateTime?: Date;
  /** Auto update version that is the Next available version to update on mcc cache node */
  readonly autoUpdateNextAvailableVersion?: string;
  /** Auto update last applied date time of mcc install */
  readonly autoUpdateNextAvailableDateTime?: Date;
  /** Auto update version that is the applied to update on mcc cache node */
  readonly autoUpdateAppliedVersion?: string;
  /** Auto Update status details from the backend after applying the new version details */
  readonly autoUpdateLastAppliedDetails?: string;
  /** Last applied auto update state for mcc install of auto update cycle */
  readonly autoUpdateLastAppliedState?: string;
  /** Auto update last applied date time of mcc install */
  readonly autoUpdateLastAppliedDateTime?: Date;
  /** Auto update last triggered date time of mcc install */
  readonly autoUpdateLastTriggeredDateTime?: Date;
  /** Optional property #1 of Mcc response object */
  optionalProperty1?: string;
  /** Optional property #2 of Mcc response object */
  optionalProperty2?: string;
  /** Optional property #3 of Mcc response object */
  optionalProperty3?: string;
  /** Optional property #4 of Mcc response object */
  optionalProperty4?: string;
  /** Optional property #5 of Mcc response object */
  optionalProperty5?: string;
}

export function additionalCacheNodePropertiesSerializer(item: AdditionalCacheNodeProperties): any {
  return {
    cacheNodePropertiesDetailsIssuesList: !item["cacheNodePropertiesDetailsIssuesList"]
      ? item["cacheNodePropertiesDetailsIssuesList"]
      : item["cacheNodePropertiesDetailsIssuesList"].map((p: any) => {
          return p;
        }),
    driveConfiguration: !item["driveConfiguration"]
      ? item["driveConfiguration"]
      : cacheNodeDriveConfigurationArraySerializer(item["driveConfiguration"]),
    bgpConfiguration: !item["bgpConfiguration"]
      ? item["bgpConfiguration"]
      : bgpConfigurationSerializer(item["bgpConfiguration"]),
    proxyUrlConfiguration: !item["proxyUrlConfiguration"]
      ? item["proxyUrlConfiguration"]
      : proxyUrlConfigurationSerializer(item["proxyUrlConfiguration"]),
    proxyUrl: item["proxyUrl"],
    isProxyRequired: item["isProxyRequired"],
    osType: item["osType"],
    updateCycleType: item["updateCycleType"],
    autoUpdateVersion: item["autoUpdateVersion"],
    updateInfoDetails: item["updateInfoDetails"],
    updateRequestedDateTime: item["updateRequestedDateTime"]?.toISOString(),
    optionalProperty1: item["optionalProperty1"],
    optionalProperty2: item["optionalProperty2"],
    optionalProperty3: item["optionalProperty3"],
    optionalProperty4: item["optionalProperty4"],
    optionalProperty5: item["optionalProperty5"],
  };
}

export function additionalCacheNodePropertiesDeserializer(
  item: any,
): AdditionalCacheNodeProperties {
  return {
    cacheNodePropertiesDetailsIssuesList: !item["cacheNodePropertiesDetailsIssuesList"]
      ? item["cacheNodePropertiesDetailsIssuesList"]
      : item["cacheNodePropertiesDetailsIssuesList"].map((p: any) => {
          return p;
        }),
    aggregatedStatusDetails: item["aggregatedStatusDetails"],
    aggregatedStatusText: item["aggregatedStatusText"],
    aggregatedStatusCode: item["aggregatedStatusCode"],
    productVersion: item["productVersion"],
    isProvisioned: item["isProvisioned"],
    cacheNodeStateDetailedText: item["cacheNodeStateDetailedText"],
    cacheNodeStateShortText: item["cacheNodeStateShortText"],
    cacheNodeState: item["cacheNodeState"],
    driveConfiguration: !item["driveConfiguration"]
      ? item["driveConfiguration"]
      : cacheNodeDriveConfigurationArrayDeserializer(item["driveConfiguration"]),
    bgpConfiguration: !item["bgpConfiguration"]
      ? item["bgpConfiguration"]
      : bgpConfigurationDeserializer(item["bgpConfiguration"]),
    proxyUrlConfiguration: !item["proxyUrlConfiguration"]
      ? item["proxyUrlConfiguration"]
      : proxyUrlConfigurationDeserializer(item["proxyUrlConfiguration"]),
    proxyUrl: item["proxyUrl"],
    isProxyRequired: item["isProxyRequired"],
    osType: item["osType"],
    updateCycleType: item["updateCycleType"],
    autoUpdateVersion: item["autoUpdateVersion"],
    updateInfoDetails: item["updateInfoDetails"],
    updateRequestedDateTime: !item["updateRequestedDateTime"]
      ? item["updateRequestedDateTime"]
      : new Date(item["updateRequestedDateTime"]),
    autoUpdateNextAvailableVersion: item["autoUpdateNextAvailableVersion"],
    autoUpdateNextAvailableDateTime: !item["autoUpdateNextAvailableDateTime"]
      ? item["autoUpdateNextAvailableDateTime"]
      : new Date(item["autoUpdateNextAvailableDateTime"]),
    autoUpdateAppliedVersion: item["autoUpdateAppliedVersion"],
    autoUpdateLastAppliedDetails: item["autoUpdateLastAppliedDetails"],
    autoUpdateLastAppliedState: item["autoUpdateLastAppliedState"],
    autoUpdateLastAppliedDateTime: !item["autoUpdateLastAppliedDateTime"]
      ? item["autoUpdateLastAppliedDateTime"]
      : new Date(item["autoUpdateLastAppliedDateTime"]),
    autoUpdateLastTriggeredDateTime: !item["autoUpdateLastTriggeredDateTime"]
      ? item["autoUpdateLastTriggeredDateTime"]
      : new Date(item["autoUpdateLastTriggeredDateTime"]),
    optionalProperty1: item["optionalProperty1"],
    optionalProperty2: item["optionalProperty2"],
    optionalProperty3: item["optionalProperty3"],
    optionalProperty4: item["optionalProperty4"],
    optionalProperty5: item["optionalProperty5"],
  };
}

export function cacheNodeDriveConfigurationArraySerializer(
  result: Array<CacheNodeDriveConfiguration>,
): any[] {
  return result.map((item) => {
    return cacheNodeDriveConfigurationSerializer(item);
  });
}

export function cacheNodeDriveConfigurationArrayDeserializer(
  result: Array<CacheNodeDriveConfiguration>,
): any[] {
  return result.map((item) => {
    return cacheNodeDriveConfigurationDeserializer(item);
  });
}

/** Drive configuration for cache node */
export interface CacheNodeDriveConfiguration {
  /** physical path location of the folder used for caching content */
  physicalPath?: string;
  /** physical size of the drive used for caching content */
  sizeInGb?: number;
  /** corresponding nginx cache number. Valid cache numbers are 1 - 20 */
  cacheNumber?: number;
  /** full binding for corresponding nginx cache drive */
  nginxMapping?: string;
}

export function cacheNodeDriveConfigurationSerializer(item: CacheNodeDriveConfiguration): any {
  return {
    physicalPath: item["physicalPath"],
    sizeInGb: item["sizeInGb"],
    cacheNumber: item["cacheNumber"],
    nginxMapping: item["nginxMapping"],
  };
}

export function cacheNodeDriveConfigurationDeserializer(item: any): CacheNodeDriveConfiguration {
  return {
    physicalPath: item["physicalPath"],
    sizeInGb: item["sizeInGb"],
    cacheNumber: item["cacheNumber"],
    nginxMapping: item["nginxMapping"],
  };
}

/** Bgp configuration of cache node */
export interface BgpConfiguration {
  /** Asn to ip address mapping */
  asnToIpAddressMapping?: string;
}

export function bgpConfigurationSerializer(item: BgpConfiguration): any {
  return { asnToIpAddressMapping: item["asnToIpAddressMapping"] };
}

export function bgpConfigurationDeserializer(item: any): BgpConfiguration {
  return {
    asnToIpAddressMapping: item["asnToIpAddressMapping"],
  };
}

/** ProxyUrl configuration of cache node */
export interface ProxyUrlConfiguration {
  /** Host Proxy Address configuration along with port number. This can be a proxy or ip address. ex: xx.xx.xx.xxxx:80 or host name http://exampleproxy.com:80 */
  proxyUrl?: string;
}

export function proxyUrlConfigurationSerializer(item: ProxyUrlConfiguration): any {
  return { proxyUrl: item["proxyUrl"] };
}

export function proxyUrlConfigurationDeserializer(item: any): ProxyUrlConfiguration {
  return {
    proxyUrl: item["proxyUrl"],
  };
}

/** Proxy details enum */
export enum KnownProxyRequired {
  /** Proxy is not required in setup */
  None = "None",
  /** proxy is required in setup */
  Required = "Required",
}

/**
 * Proxy details enum \
 * {@link KnownProxyRequired} can be used interchangeably with ProxyRequired,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Proxy is not required in setup \
 * **Required**: proxy is required in setup
 */
export type ProxyRequired = string;

/** Operating System of the cache node */
export enum KnownOsType {
  /** cache node installs on windows operating system */
  Windows = "Windows",
  /** cache node installs on Linux Operating system */
  Linux = "Linux",
  /** cache node installs on Azure Eflow */
  Eflow = "Eflow",
}

/**
 * Operating System of the cache node \
 * {@link KnownOsType} can be used interchangeably with OsType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: cache node installs on windows operating system \
 * **Linux**: cache node installs on Linux Operating system \
 * **Eflow**: cache node installs on Azure Eflow
 */
export type OsType = string;

/** Update Cycle type */
export enum KnownCycleType {
  /** customer selection of preview update install mcc on their physical vm */
  Preview = "Preview",
  /** customer selection of slow update to install mcc on their physical vm */
  Slow = "Slow",
  /** customer selection of fast / auto update to install mcc on their physical vm */
  Fast = "Fast",
}

/**
 * Update Cycle type \
 * {@link KnownCycleType} can be used interchangeably with CycleType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: customer selection of preview update install mcc on their physical vm \
 * **Slow**: customer selection of slow update to install mcc on their physical vm \
 * **Fast**: customer selection of fast \/ auto update to install mcc on their physical vm
 */
export type CycleType = string;

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

export function errorDetailSerializer(item: ErrorDetail): any {
  return item;
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

export function errorDetailArraySerializer(result: Array<ErrorDetail>): any[] {
  return result.map((item) => {
    return errorDetailSerializer(item);
  });
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
  readonly info?: Record<string, any>;
}

export function errorAdditionalInfoDeserializer(item: any): ErrorAdditionalInfo {
  return {
    type: item["type"],
    info: !item["info"] ? item["info"] : _errorAdditionalInfoInfoDeserializer(item["info"]),
  };
}

/** model interface _ErrorAdditionalInfoInfo */
export interface _ErrorAdditionalInfoInfo {}

export function _errorAdditionalInfoInfoDeserializer(item: any): _ErrorAdditionalInfoInfo {
  return item;
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

/** Mcc PATCH operation properties. */
export interface ConnectedCachePatchResource {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function connectedCachePatchResourceSerializer(item: ConnectedCachePatchResource): any {
  return { tags: item["tags"] };
}

/** The response of a EnterpriseMccCacheNodeResource list operation. */
export interface _EnterpriseMccCacheNodeResourceListResult {
  /** The EnterpriseMccCacheNodeResource items on this page */
  value: EnterpriseMccCacheNodeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enterpriseMccCacheNodeResourceListResultDeserializer(
  item: any,
): _EnterpriseMccCacheNodeResourceListResult {
  return {
    value: enterpriseMccCacheNodeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enterpriseMccCacheNodeResourceArraySerializer(
  result: Array<EnterpriseMccCacheNodeResource>,
): any[] {
  return result.map((item) => {
    return enterpriseMccCacheNodeResourceSerializer(item);
  });
}

export function enterpriseMccCacheNodeResourceArrayDeserializer(
  result: Array<EnterpriseMccCacheNodeResource>,
): any[] {
  return result.map((item) => {
    return enterpriseMccCacheNodeResourceDeserializer(item);
  });
}

/** Mcc cache node resource all install details. */
export interface MccCacheNodeInstallDetails extends TrackedResource {
  /** Mcc cache node resource install script details. */
  properties?: CacheNodeInstallProperties;
}

export function mccCacheNodeInstallDetailsDeserializer(item: any): MccCacheNodeInstallDetails {
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
      : cacheNodeInstallPropertiesDeserializer(item["properties"]),
  };
}

/** Mcc cache node resource install script properties. */
export interface CacheNodeInstallProperties {
  /** Mcc customer resource Id. */
  customerId?: string;
  /** Mcc cache node resource Id. */
  cacheNodeId?: string;
  /** Mcc primary account key. Internal to Mcc. */
  readonly primaryAccountKey?: string;
  /** Mcc secondary account key. Internal to Mcc. */
  readonly secondaryAccountKey?: string;
  /** Mcc Iot Central temporary device registration key, used once. */
  readonly registrationKey?: string;
}

export function cacheNodeInstallPropertiesDeserializer(item: any): CacheNodeInstallProperties {
  return {
    customerId: item["customerId"],
    cacheNodeId: item["cacheNodeId"],
    primaryAccountKey: item["primaryAccountKey"],
    secondaryAccountKey: item["secondaryAccountKey"],
    registrationKey: item["registrationKey"],
  };
}

/** Represents the high level Nodes needed to provision customer resources */
export interface EnterpriseMccCustomerResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CustomerProperty;
}

export function enterpriseMccCustomerResourceSerializer(item: EnterpriseMccCustomerResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : customerPropertySerializer(item["properties"]),
  };
}

export function enterpriseMccCustomerResourceDeserializer(
  item: any,
): EnterpriseMccCustomerResource {
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
      : customerPropertyDeserializer(item["properties"]),
  };
}

/** Model representing customer for connectedCache resource */
export interface CustomerProperty {
  /** The provisioned state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** Mcc customer resource (customer entity). */
  customer?: CustomerEntity;
  /** Mcc customer resource additional properties. */
  additionalCustomerProperties?: AdditionalCustomerProperties;
  /** Mcc response status code. */
  readonly statusCode?: string;
  /** Mcc response status text as string for retrieving status details. */
  readonly statusText?: string;
  /** Mcc response status details for retrieving response inner details. */
  readonly statusDetails?: string;
  /** HTTP error status code. */
  readonly status?: string;
  /** Mcc response error details. */
  readonly error?: ErrorDetail;
}

export function customerPropertySerializer(item: CustomerProperty): any {
  return {
    customer: !item["customer"] ? item["customer"] : customerEntitySerializer(item["customer"]),
    additionalCustomerProperties: !item["additionalCustomerProperties"]
      ? item["additionalCustomerProperties"]
      : additionalCustomerPropertiesSerializer(item["additionalCustomerProperties"]),
  };
}

export function customerPropertyDeserializer(item: any): CustomerProperty {
  return {
    provisioningState: item["provisioningState"],
    customer: !item["customer"] ? item["customer"] : customerEntityDeserializer(item["customer"]),
    additionalCustomerProperties: !item["additionalCustomerProperties"]
      ? item["additionalCustomerProperties"]
      : additionalCustomerPropertiesDeserializer(item["additionalCustomerProperties"]),
    statusCode: item["statusCode"],
    statusText: item["statusText"],
    statusDetails: item["statusDetails"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** Model representing Customer resource for ConnectedCache resource */
export interface CustomerEntity {
  /** Customer resource Azure fully qualified resource Id. */
  fullyQualifiedResourceId?: string;
  /** Customer resource Guid Id. */
  readonly customerId?: string;
  /** Customer resource name. */
  customerName?: string;
  /** Customer resource contact email. */
  contactEmail?: string;
  /** Customer resource contact phone. */
  contactPhone?: string;
  /** Customer resource contact full name. */
  contactName?: string;
  /** Customer resource entitlement flag as boolean. */
  isEntitled?: boolean;
  /** Customer resource Mcc release version. */
  releaseVersion?: number;
  /** Customer resource create async operation Id. */
  readonly createAsyncOperationId?: string;
  /** Customer resource deletion async operation Id. */
  readonly deleteAsyncOperationId?: string;
  /** Customer resource client tenant Id of subscription. */
  clientTenantId?: string;
  /** Customer resource sync attempts. */
  readonly synchWithAzureAttemptsCount?: number;
  /** Customer resource last Azure sync timestamp. */
  readonly lastSyncWithAzureTimestamp?: Date;
  /** Customer resource flag for enterprise management as boolean. */
  isEnterpriseManaged?: boolean;
  /** Customer resource flag for migration. */
  shouldMigrate?: boolean;
  /** Customer resource flag for resending signup code as boolean. */
  resendSignupCode?: boolean;
  /** Customer resource flag for requiring verification of signup code as boolean. */
  verifySignupCode?: boolean;
  /** Customer resource phrase for verifying signup. */
  verifySignupPhrase?: string;
}

export function customerEntitySerializer(item: CustomerEntity): any {
  return {
    fullyQualifiedResourceId: item["fullyQualifiedResourceId"],
    customerName: item["customerName"],
    contactEmail: item["contactEmail"],
    contactPhone: item["contactPhone"],
    contactName: item["contactName"],
    isEntitled: item["isEntitled"],
    releaseVersion: item["releaseVersion"],
    clientTenantId: item["clientTenantId"],
    isEnterpriseManaged: item["isEnterpriseManaged"],
    shouldMigrate: item["shouldMigrate"],
    resendSignupCode: item["resendSignupCode"],
    verifySignupCode: item["verifySignupCode"],
    verifySignupPhrase: item["verifySignupPhrase"],
  };
}

export function customerEntityDeserializer(item: any): CustomerEntity {
  return {
    fullyQualifiedResourceId: item["fullyQualifiedResourceId"],
    customerId: item["customerId"],
    customerName: item["customerName"],
    contactEmail: item["contactEmail"],
    contactPhone: item["contactPhone"],
    contactName: item["contactName"],
    isEntitled: item["isEntitled"],
    releaseVersion: item["releaseVersion"],
    createAsyncOperationId: item["createAsyncOperationId"],
    deleteAsyncOperationId: item["deleteAsyncOperationId"],
    clientTenantId: item["clientTenantId"],
    synchWithAzureAttemptsCount: item["synchWithAzureAttemptsCount"],
    lastSyncWithAzureTimestamp: !item["lastSyncWithAzureTimestamp"]
      ? item["lastSyncWithAzureTimestamp"]
      : new Date(item["lastSyncWithAzureTimestamp"]),
    isEnterpriseManaged: item["isEnterpriseManaged"],
    shouldMigrate: item["shouldMigrate"],
    resendSignupCode: item["resendSignupCode"],
    verifySignupCode: item["verifySignupCode"],
    verifySignupPhrase: item["verifySignupPhrase"],
  };
}

/** Model representing customer for connected cache resource */
export interface AdditionalCustomerProperties {
  /** Customer resource last PeeringDB update timestamp. */
  readonly peeringDbLastUpdateTime?: Date;
  /** Customer resource cache efficiency. */
  readonly customerPropertiesOverviewCacheEfficiency?: number;
  /** Customer resource average egress in Mbps. */
  readonly customerPropertiesOverviewAverageEgressMbps?: number;
  /** Customer resource average cache miss throughput in Mbps. */
  readonly customerPropertiesOverviewAverageMissMbps?: number;
  /** Customer resource maximum egress in Mbps. */
  readonly customerPropertiesOverviewEgressMbpsMax?: number;
  /** Customer resource peak egress timestamp. */
  readonly customerPropertiesOverviewEgressMbpsMaxDateTime?: Date;
  /** Customer resource maximum cache miss throughput in Mbps. */
  readonly customerPropertiesOverviewMissMbpsMax?: number;
  /** Customer resource peak cache miss throughput timestamp. */
  readonly customerPropertiesOverviewMissMbpsMaxDateTime?: Date;
  /** Customer resource total healthy cache nodes. */
  readonly customerPropertiesOverviewCacheNodesHealthyCount?: number;
  /** Customer resource total unhealthy cache nodes. */
  readonly customerPropertiesOverviewCacheNodesUnhealthyCount?: number;
  /** Customer resource signup status as boolean. */
  readonly signupStatus?: boolean;
  /** Customer resource signup status as integer code. */
  readonly signupStatusCode?: number;
  /** Customer resource signup status as string text. */
  readonly signupStatusText?: string;
  /** Customer resource signup phase status code as integer. */
  readonly signupPhaseStatusCode?: number;
  /** Customer resource signup phase status as string text. */
  readonly signupPhaseStatusText?: string;
  /** Customer resource last PeeringDB update timestamp. */
  readonly peeringDbLastUpdateDate?: Date;
  /** Customer resource owner organization name. */
  readonly customerOrgName?: string;
  /** Customer resource contact email. */
  customerEmail?: string;
  /** Customer resource transit Asn (autonomous system number). */
  customerTransitAsn?: string;
  /** Customer resource transit state. */
  customerTransitState?: CustomerTransitState;
  /** Customer resource Asn (autonomous system number). */
  customerAsn?: string;
  /** Customer resource estimated Asn peering peak in Gbps. */
  readonly customerAsnEstimatedEgressPeekGbps?: number;
  /** Customer resource entitlement Sku Id. */
  customerEntitlementSkuId?: string;
  /** Customer resource entitlement Sku Guid. */
  customerEntitlementSkuGuid?: string;
  /** Customer resource entitlement Sku name. */
  customerEntitlementSkuName?: string;
  /** Customer resource entitlement expiration date string. */
  customerEntitlementExpiration?: Date;
  /** Optional property #1 of Mcc response object. */
  optionalProperty1?: string;
  /** Optional property #2 of Mcc response object. */
  optionalProperty2?: string;
  /** Optional property #3 of Mcc response object. */
  optionalProperty3?: string;
  /** Optional property #4 of Mcc response object. */
  optionalProperty4?: string;
  /** Optional property #5 of Mcc response object. */
  optionalProperty5?: string;
}

export function additionalCustomerPropertiesSerializer(item: AdditionalCustomerProperties): any {
  return {
    customerEmail: item["customerEmail"],
    customerTransitAsn: item["customerTransitAsn"],
    customerTransitState: item["customerTransitState"],
    customerAsn: item["customerAsn"],
    customerEntitlementSkuId: item["customerEntitlementSkuId"],
    customerEntitlementSkuGuid: item["customerEntitlementSkuGuid"],
    customerEntitlementSkuName: item["customerEntitlementSkuName"],
    customerEntitlementExpiration: item["customerEntitlementExpiration"]?.toISOString(),
    optionalProperty1: item["optionalProperty1"],
    optionalProperty2: item["optionalProperty2"],
    optionalProperty3: item["optionalProperty3"],
    optionalProperty4: item["optionalProperty4"],
    optionalProperty5: item["optionalProperty5"],
  };
}

export function additionalCustomerPropertiesDeserializer(item: any): AdditionalCustomerProperties {
  return {
    peeringDbLastUpdateTime: !item["peeringDbLastUpdateTime"]
      ? item["peeringDbLastUpdateTime"]
      : new Date(item["peeringDbLastUpdateTime"]),
    customerPropertiesOverviewCacheEfficiency: item["customerPropertiesOverviewCacheEfficiency"],
    customerPropertiesOverviewAverageEgressMbps:
      item["customerPropertiesOverviewAverageEgressMbps"],
    customerPropertiesOverviewAverageMissMbps: item["customerPropertiesOverviewAverageMissMbps"],
    customerPropertiesOverviewEgressMbpsMax: item["customerPropertiesOverviewEgressMbpsMax"],
    customerPropertiesOverviewEgressMbpsMaxDateTime: !item[
      "customerPropertiesOverviewEgressMbpsMaxDateTime"
    ]
      ? item["customerPropertiesOverviewEgressMbpsMaxDateTime"]
      : new Date(item["customerPropertiesOverviewEgressMbpsMaxDateTime"]),
    customerPropertiesOverviewMissMbpsMax: item["customerPropertiesOverviewMissMbpsMax"],
    customerPropertiesOverviewMissMbpsMaxDateTime: !item[
      "customerPropertiesOverviewMissMbpsMaxDateTime"
    ]
      ? item["customerPropertiesOverviewMissMbpsMaxDateTime"]
      : new Date(item["customerPropertiesOverviewMissMbpsMaxDateTime"]),
    customerPropertiesOverviewCacheNodesHealthyCount:
      item["customerPropertiesOverviewCacheNodesHealthyCount"],
    customerPropertiesOverviewCacheNodesUnhealthyCount:
      item["customerPropertiesOverviewCacheNodesUnhealthyCount"],
    signupStatus: item["signupStatus"],
    signupStatusCode: item["signupStatusCode"],
    signupStatusText: item["signupStatusText"],
    signupPhaseStatusCode: item["signupPhaseStatusCode"],
    signupPhaseStatusText: item["signupPhaseStatusText"],
    peeringDbLastUpdateDate: !item["peeringDbLastUpdateDate"]
      ? item["peeringDbLastUpdateDate"]
      : new Date(item["peeringDbLastUpdateDate"]),
    customerOrgName: item["customerOrgName"],
    customerEmail: item["customerEmail"],
    customerTransitAsn: item["customerTransitAsn"],
    customerTransitState: item["customerTransitState"],
    customerAsn: item["customerAsn"],
    customerAsnEstimatedEgressPeekGbps: item["customerAsnEstimatedEgressPeekGbps"],
    customerEntitlementSkuId: item["customerEntitlementSkuId"],
    customerEntitlementSkuGuid: item["customerEntitlementSkuGuid"],
    customerEntitlementSkuName: item["customerEntitlementSkuName"],
    customerEntitlementExpiration: !item["customerEntitlementExpiration"]
      ? item["customerEntitlementExpiration"]
      : new Date(item["customerEntitlementExpiration"]),
    optionalProperty1: item["optionalProperty1"],
    optionalProperty2: item["optionalProperty2"],
    optionalProperty3: item["optionalProperty3"],
    optionalProperty4: item["optionalProperty4"],
    optionalProperty5: item["optionalProperty5"],
  };
}

/** Customer resource transit states */
export enum KnownCustomerTransitState {
  /** do not have transit */
  NoTransit = "NoTransit",
  /** transit provider and have own subscribers */
  CombinedTransit = "CombinedTransit",
  /** pure transit provider or network service provider */
  TransitOnly = "TransitOnly",
}

/**
 * Customer resource transit states \
 * {@link KnownCustomerTransitState} can be used interchangeably with CustomerTransitState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NoTransit**: do not have transit \
 * **CombinedTransit**: transit provider and have own subscribers \
 * **TransitOnly**: pure transit provider or network service provider
 */
export type CustomerTransitState = string;

/** The response of a EnterpriseMccCustomerResource list operation. */
export interface _EnterpriseMccCustomerResourceListResult {
  /** The EnterpriseMccCustomerResource items on this page */
  value: EnterpriseMccCustomerResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enterpriseMccCustomerResourceListResultDeserializer(
  item: any,
): _EnterpriseMccCustomerResourceListResult {
  return {
    value: enterpriseMccCustomerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enterpriseMccCustomerResourceArraySerializer(
  result: Array<EnterpriseMccCustomerResource>,
): any[] {
  return result.map((item) => {
    return enterpriseMccCustomerResourceSerializer(item);
  });
}

export function enterpriseMccCustomerResourceArrayDeserializer(
  result: Array<EnterpriseMccCustomerResource>,
): any[] {
  return result.map((item) => {
    return enterpriseMccCustomerResourceDeserializer(item);
  });
}

/** Represents the high level Nodes needed to provision cache node resources */
export interface IspCacheNodeResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CacheNodeProperty;
}

export function ispCacheNodeResourceSerializer(item: IspCacheNodeResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cacheNodePropertySerializer(item["properties"]),
  };
}

export function ispCacheNodeResourceDeserializer(item: any): IspCacheNodeResource {
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
      : cacheNodePropertyDeserializer(item["properties"]),
  };
}

/** The response of a IspCacheNodeResource list operation. */
export interface _IspCacheNodeResourceListResult {
  /** The IspCacheNodeResource items on this page */
  value: IspCacheNodeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ispCacheNodeResourceListResultDeserializer(
  item: any,
): _IspCacheNodeResourceListResult {
  return {
    value: ispCacheNodeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ispCacheNodeResourceArraySerializer(result: Array<IspCacheNodeResource>): any[] {
  return result.map((item) => {
    return ispCacheNodeResourceSerializer(item);
  });
}

export function ispCacheNodeResourceArrayDeserializer(result: Array<IspCacheNodeResource>): any[] {
  return result.map((item) => {
    return ispCacheNodeResourceDeserializer(item);
  });
}

/** Represents all Cidr details of the Bgp request for a specific cache node resource */
export interface MccCacheNodeBgpCidrDetails extends TrackedResource {
  /** Mcc cache node resource Bgp Cidr properties. */
  properties?: BgpCidrsConfiguration;
}

export function mccCacheNodeBgpCidrDetailsDeserializer(item: any): MccCacheNodeBgpCidrDetails {
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
      : bgpCidrsConfigurationDeserializer(item["properties"]),
  };
}

/** Mcc cache node Bgp Cidr details. */
export interface BgpCidrsConfiguration {
  /** Mcc cache node Bgp Cidr details. */
  readonly bgpCidrs?: string[];
}

export function bgpCidrsConfigurationDeserializer(item: any): BgpCidrsConfiguration {
  return {
    bgpCidrs: !item["bgpCidrs"]
      ? item["bgpCidrs"]
      : item["bgpCidrs"].map((p: any) => {
          return p;
        }),
  };
}

/** Represents the high level Nodes needed to provision isp customer resources */
export interface IspCustomerResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CustomerProperty;
}

export function ispCustomerResourceSerializer(item: IspCustomerResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : customerPropertySerializer(item["properties"]),
  };
}

export function ispCustomerResourceDeserializer(item: any): IspCustomerResource {
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
      : customerPropertyDeserializer(item["properties"]),
  };
}

/** The response of a IspCustomerResource list operation. */
export interface _IspCustomerResourceListResult {
  /** The IspCustomerResource items on this page */
  value: IspCustomerResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _ispCustomerResourceListResultDeserializer(
  item: any,
): _IspCustomerResourceListResult {
  return {
    value: ispCustomerResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function ispCustomerResourceArraySerializer(result: Array<IspCustomerResource>): any[] {
  return result.map((item) => {
    return ispCustomerResourceSerializer(item);
  });
}

export function ispCustomerResourceArrayDeserializer(result: Array<IspCustomerResource>): any[] {
  return result.map((item) => {
    return ispCustomerResourceDeserializer(item);
  });
}

/** Concrete tracked resource types can be created by aliasing this type using a specific property type. */
export interface CacheNodePreviewResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CacheNodeOldResponse;
}

export function cacheNodePreviewResourceSerializer(item: CacheNodePreviewResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cacheNodeOldResponseSerializer(item["properties"]),
  };
}

export function cacheNodePreviewResourceDeserializer(item: any): CacheNodePreviewResource {
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
      : cacheNodeOldResponseDeserializer(item["properties"]),
  };
}

/** Model representing Cache Node for ConnectedCache resource */
export interface CacheNodeOldResponse {
  /** The provisioned state of the resource */
  readonly provisioningState?: ProvisioningState;
  /** statusCode used to get code details of Mcc response object */
  statusCode?: string;
  /** statusText used to get status details in string format of Mcc response object */
  statusText?: string;
  /** statusDetails used to get inner details of Mcc response object */
  statusDetails?: string;
  /** status of the HTTP error code */
  readonly status?: string;
  /** The error details */
  error?: ErrorDetail;
}

export function cacheNodeOldResponseSerializer(item: CacheNodeOldResponse): any {
  return {
    statusCode: item["statusCode"],
    statusText: item["statusText"],
    statusDetails: item["statusDetails"],
    error: !item["error"] ? item["error"] : errorDetailSerializer(item["error"]),
  };
}

export function cacheNodeOldResponseDeserializer(item: any): CacheNodeOldResponse {
  return {
    provisioningState: item["provisioningState"],
    statusCode: item["statusCode"],
    statusText: item["statusText"],
    statusDetails: item["statusDetails"],
    status: item["status"],
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
  };
}

/** The response of a CacheNodePreviewResource list operation. */
export interface _CacheNodePreviewResourceListResult {
  /** The CacheNodePreviewResource items on this page */
  value: CacheNodePreviewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _cacheNodePreviewResourceListResultDeserializer(
  item: any,
): _CacheNodePreviewResourceListResult {
  return {
    value: cacheNodePreviewResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function cacheNodePreviewResourceArraySerializer(
  result: Array<CacheNodePreviewResource>,
): any[] {
  return result.map((item) => {
    return cacheNodePreviewResourceSerializer(item);
  });
}

export function cacheNodePreviewResourceArrayDeserializer(
  result: Array<CacheNodePreviewResource>,
): any[] {
  return result.map((item) => {
    return cacheNodePreviewResourceDeserializer(item);
  });
}

/** ConnectedCache Resource. Represents the high level Nodes needed to provision CacheNode and customer resources used in private preview */
export interface EnterprisePreviewResource extends TrackedResource {
  /** The resource-specific properties for this resource. */
  properties?: CacheNodeOldResponse;
}

export function enterprisePreviewResourceSerializer(item: EnterprisePreviewResource): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : cacheNodeOldResponseSerializer(item["properties"]),
  };
}

export function enterprisePreviewResourceDeserializer(item: any): EnterprisePreviewResource {
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
      : cacheNodeOldResponseDeserializer(item["properties"]),
  };
}

/** The response of a EnterprisePreviewResource list operation. */
export interface _EnterprisePreviewResourceListResult {
  /** The EnterprisePreviewResource items on this page */
  value: EnterprisePreviewResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _enterprisePreviewResourceListResultDeserializer(
  item: any,
): _EnterprisePreviewResourceListResult {
  return {
    value: enterprisePreviewResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function enterprisePreviewResourceArraySerializer(
  result: Array<EnterprisePreviewResource>,
): any[] {
  return result.map((item) => {
    return enterprisePreviewResourceSerializer(item);
  });
}

export function enterprisePreviewResourceArrayDeserializer(
  result: Array<EnterprisePreviewResource>,
): any[] {
  return result.map((item) => {
    return enterprisePreviewResourceDeserializer(item);
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

/** The available API versions. */
export enum KnownVersions {
  /** Microsoft Connected Cache Rest Api version 2023-05-01-preview */
  v2023_05_01_preview = "2023-05-01-preview",
}
