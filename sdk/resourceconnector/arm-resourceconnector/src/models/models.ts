// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Appliances definition. */
export interface Appliance extends TrackedResource {
  /** The set of properties specific to an Appliance */
  properties?: ApplianceProperties;
  /** Identity for the resource. */
  identity?: Identity;
}

export function applianceSerializer(item: Appliance): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: !item["properties"]
      ? item["properties"]
      : appliancePropertiesSerializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identitySerializer(item["identity"]),
  };
}

export function applianceDeserializer(item: any): Appliance {
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
      : appliancePropertiesDeserializer(item["properties"]),
    identity: !item["identity"] ? item["identity"] : identityDeserializer(item["identity"]),
  };
}

/** Properties for an appliance. */
export interface ApplianceProperties {
  /** Represents a supported Fabric/Infra. (AKSEdge etc...). */
  distro?: Distro;
  /** Contains infrastructure information about the Appliance */
  infrastructureConfig?: AppliancePropertiesInfrastructureConfig;
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
  /** Certificates pair used to download MSI certificate from HIS. Can only be set once. */
  publicKey?: string;
  /** Appliance’s health and state of connection to on-prem. This list of values is not exhaustive. */
  readonly status?: Status;
  /** Version of the Appliance */
  version?: string;
  /** A list of events that occurred on the Appliance to relay information to the user. */
  readonly events?: Event[];
  /** Contains network information about the Appliance */
  networkProfile?: NetworkProfile;
}

export function appliancePropertiesSerializer(item: ApplianceProperties): any {
  return {
    distro: item["distro"],
    infrastructureConfig: !item["infrastructureConfig"]
      ? item["infrastructureConfig"]
      : appliancePropertiesInfrastructureConfigSerializer(item["infrastructureConfig"]),
    publicKey: item["publicKey"],
    version: item["version"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileSerializer(item["networkProfile"]),
  };
}

export function appliancePropertiesDeserializer(item: any): ApplianceProperties {
  return {
    distro: item["distro"],
    infrastructureConfig: !item["infrastructureConfig"]
      ? item["infrastructureConfig"]
      : appliancePropertiesInfrastructureConfigDeserializer(item["infrastructureConfig"]),
    provisioningState: item["provisioningState"],
    publicKey: item["publicKey"],
    status: item["status"],
    version: item["version"],
    events: !item["events"] ? item["events"] : eventArrayDeserializer(item["events"]),
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileDeserializer(item["networkProfile"]),
  };
}

/** Represents a supported Fabric/Infra. (AKSEdge etc...). */
export enum KnownDistro {
  /** AKSEdge */
  AKSEdge = "AKSEdge",
}

/**
 * Represents a supported Fabric/Infra. (AKSEdge etc...). \
 * {@link KnownDistro} can be used interchangeably with Distro,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AKSEdge**
 */
export type Distro = string;

/** Contains infrastructure information about the Appliance */
export interface AppliancePropertiesInfrastructureConfig {
  /** Information about the connected appliance. */
  provider?: Provider;
}

export function appliancePropertiesInfrastructureConfigSerializer(
  item: AppliancePropertiesInfrastructureConfig,
): any {
  return { provider: item["provider"] };
}

export function appliancePropertiesInfrastructureConfigDeserializer(
  item: any,
): AppliancePropertiesInfrastructureConfig {
  return {
    provider: item["provider"],
  };
}

/** Information about the connected appliance. */
export enum KnownProvider {
  /** VMWare */
  VMWare = "VMWare",
  /** HCI */
  HCI = "HCI",
  /** SCVMM */
  Scvmm = "SCVMM",
}

/**
 * Information about the connected appliance. \
 * {@link KnownProvider} can be used interchangeably with Provider,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VMWare** \
 * **HCI** \
 * **SCVMM**
 */
export type Provider = string;

/** Appliance’s health and state of connection to on-prem. This list of values is not exhaustive. */
export enum KnownStatus {
  /** WaitingForHeartbeat */
  WaitingForHeartbeat = "WaitingForHeartbeat",
  /** Validating */
  Validating = "Validating",
  /** Connecting */
  Connecting = "Connecting",
  /** Connected */
  Connected = "Connected",
  /** Running */
  Running = "Running",
  /** PreparingForUpgrade */
  PreparingForUpgrade = "PreparingForUpgrade",
  /** ETCDSnapshotFailed */
  EtcdSnapshotFailed = "ETCDSnapshotFailed",
  /** UpgradePrerequisitesCompleted */
  UpgradePrerequisitesCompleted = "UpgradePrerequisitesCompleted",
  /** ValidatingSFSConnectivity */
  ValidatingSFSConnectivity = "ValidatingSFSConnectivity",
  /** ValidatingImageDownload */
  ValidatingImageDownload = "ValidatingImageDownload",
  /** ValidatingImageUpload */
  ValidatingImageUpload = "ValidatingImageUpload",
  /** ValidatingETCDHealth */
  ValidatingEtcdHealth = "ValidatingETCDHealth",
  /** PreUpgrade */
  PreUpgrade = "PreUpgrade",
  /** UpgradingKVAIO */
  UpgradingKvaio = "UpgradingKVAIO",
  /** WaitingForKVAIO */
  WaitingForKvaio = "WaitingForKVAIO",
  /** ImagePending */
  ImagePending = "ImagePending",
  /** ImageProvisioning */
  ImageProvisioning = "ImageProvisioning",
  /** ImageProvisioned */
  ImageProvisioned = "ImageProvisioned",
  /** ImageDownloading */
  ImageDownloading = "ImageDownloading",
  /** ImageDownloaded */
  ImageDownloaded = "ImageDownloaded",
  /** ImageDeprovisioning */
  ImageDeprovisioning = "ImageDeprovisioning",
  /** ImageUnknown */
  ImageUnknown = "ImageUnknown",
  /** UpdatingCloudOperator */
  UpdatingCloudOperator = "UpdatingCloudOperator",
  /** WaitingForCloudOperator */
  WaitingForCloudOperator = "WaitingForCloudOperator",
  /** UpdatingCAPI */
  UpdatingCapi = "UpdatingCAPI",
  /** UpdatingCluster */
  UpdatingCluster = "UpdatingCluster",
  /** PostUpgrade */
  PostUpgrade = "PostUpgrade",
  /** UpgradeComplete */
  UpgradeComplete = "UpgradeComplete",
  /** UpgradeClusterExtensionFailedToDelete */
  UpgradeClusterExtensionFailedToDelete = "UpgradeClusterExtensionFailedToDelete",
  /** UpgradeFailed */
  UpgradeFailed = "UpgradeFailed",
  /** Offline */
  Offline = "Offline",
  /** None */
  None = "None",
  /** NetworkProxyUpdatePreparing */
  NetworkProxyUpdatePreparing = "NetworkProxyUpdatePreparing",
  /** NetworkProxyUpdating */
  NetworkProxyUpdating = "NetworkProxyUpdating",
  /** NetworkProxyUpdateComplete */
  NetworkProxyUpdateComplete = "NetworkProxyUpdateComplete",
  /** NetworkProxyUpdateFailed */
  NetworkProxyUpdateFailed = "NetworkProxyUpdateFailed",
  /** NetworkDNSUpdatePreparing */
  NetworkDNSUpdatePreparing = "NetworkDNSUpdatePreparing",
  /** NetworkDNSUpdating */
  NetworkDNSUpdating = "NetworkDNSUpdating",
  /** NetworkDNSUpdateComplete */
  NetworkDNSUpdateComplete = "NetworkDNSUpdateComplete",
  /** NetworkDNSUpdateFailed */
  NetworkDNSUpdateFailed = "NetworkDNSUpdateFailed",
  /** ArcGatewayUpdatePreparing */
  ArcGatewayUpdatePreparing = "ArcGatewayUpdatePreparing",
  /** ArcGatewayUpdating */
  ArcGatewayUpdating = "ArcGatewayUpdating",
  /** ArcGatewayUpdateComplete */
  ArcGatewayUpdateComplete = "ArcGatewayUpdateComplete",
  /** ArcGatewayUpdateFailed */
  ArcGatewayUpdateFailed = "ArcGatewayUpdateFailed",
}

/**
 * Appliance’s health and state of connection to on-prem. This list of values is not exhaustive. \
 * {@link KnownStatus} can be used interchangeably with Status,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WaitingForHeartbeat** \
 * **Validating** \
 * **Connecting** \
 * **Connected** \
 * **Running** \
 * **PreparingForUpgrade** \
 * **ETCDSnapshotFailed** \
 * **UpgradePrerequisitesCompleted** \
 * **ValidatingSFSConnectivity** \
 * **ValidatingImageDownload** \
 * **ValidatingImageUpload** \
 * **ValidatingETCDHealth** \
 * **PreUpgrade** \
 * **UpgradingKVAIO** \
 * **WaitingForKVAIO** \
 * **ImagePending** \
 * **ImageProvisioning** \
 * **ImageProvisioned** \
 * **ImageDownloading** \
 * **ImageDownloaded** \
 * **ImageDeprovisioning** \
 * **ImageUnknown** \
 * **UpdatingCloudOperator** \
 * **WaitingForCloudOperator** \
 * **UpdatingCAPI** \
 * **UpdatingCluster** \
 * **PostUpgrade** \
 * **UpgradeComplete** \
 * **UpgradeClusterExtensionFailedToDelete** \
 * **UpgradeFailed** \
 * **Offline** \
 * **None** \
 * **NetworkProxyUpdatePreparing** \
 * **NetworkProxyUpdating** \
 * **NetworkProxyUpdateComplete** \
 * **NetworkProxyUpdateFailed** \
 * **NetworkDNSUpdatePreparing** \
 * **NetworkDNSUpdating** \
 * **NetworkDNSUpdateComplete** \
 * **NetworkDNSUpdateFailed** \
 * **ArcGatewayUpdatePreparing** \
 * **ArcGatewayUpdating** \
 * **ArcGatewayUpdateComplete** \
 * **ArcGatewayUpdateFailed**
 */
export type Status = string;

export function eventArrayDeserializer(result: Array<Event>): any[] {
  return result.map((item) => {
    return eventDeserializer(item);
  });
}

/** Event contains information about customer driven, platform driven, or unplanned events that occurred on the Appliance */
export interface Event {
  /** The type of event is used to classify how the event was initiated. */
  type?: string;
  /** Code is used to break down the event further to identify why it occurred. */
  code?: string;
  /** Status is used to represent the outcome of the event. */
  status?: string;
  /** Message is intended to be actionable and should be used to inform the user of the event. */
  message?: string;
  /** Severity is the classification of the event to relay the importance of the event. */
  severity?: string;
  /** Timestamp is the time the event occurred. */
  timestamp?: Date;
}

export function eventDeserializer(item: any): Event {
  return {
    type: item["type"],
    code: item["code"],
    status: item["status"],
    message: item["message"],
    severity: item["severity"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** Contains network information about the Appliance */
export interface NetworkProfile {
  /** Contains proxy information about the Appliance */
  proxyConfiguration?: ProxyConfiguration;
  /** Contains DNS information about the Appliance */
  dnsConfiguration?: DnsConfiguration;
  /** Contains Arc Gateway information about the Appliance */
  gatewayConfiguration?: GatewayConfiguration;
}

export function networkProfileSerializer(item: NetworkProfile): any {
  return {
    proxyConfiguration: !item["proxyConfiguration"]
      ? item["proxyConfiguration"]
      : proxyConfigurationSerializer(item["proxyConfiguration"]),
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : dnsConfigurationSerializer(item["dnsConfiguration"]),
    gatewayConfiguration: !item["gatewayConfiguration"]
      ? item["gatewayConfiguration"]
      : gatewayConfigurationSerializer(item["gatewayConfiguration"]),
  };
}

export function networkProfileDeserializer(item: any): NetworkProfile {
  return {
    proxyConfiguration: !item["proxyConfiguration"]
      ? item["proxyConfiguration"]
      : proxyConfigurationDeserializer(item["proxyConfiguration"]),
    dnsConfiguration: !item["dnsConfiguration"]
      ? item["dnsConfiguration"]
      : dnsConfigurationDeserializer(item["dnsConfiguration"]),
    gatewayConfiguration: !item["gatewayConfiguration"]
      ? item["gatewayConfiguration"]
      : gatewayConfigurationDeserializer(item["gatewayConfiguration"]),
  };
}

/** Contains proxy information about the Appliance */
export interface ProxyConfiguration {
  /** Version of the proxy configuration. */
  version?: string;
}

export function proxyConfigurationSerializer(item: ProxyConfiguration): any {
  return { version: item["version"] };
}

export function proxyConfigurationDeserializer(item: any): ProxyConfiguration {
  return {
    version: item["version"],
  };
}

/** Contains DNS information about the Appliance */
export interface DnsConfiguration {
  /** Version of the DNS configuration. */
  version?: string;
}

export function dnsConfigurationSerializer(item: DnsConfiguration): any {
  return { version: item["version"] };
}

export function dnsConfigurationDeserializer(item: any): DnsConfiguration {
  return {
    version: item["version"],
  };
}

/** Contains Arc Gateway information about the Appliance */
export interface GatewayConfiguration {
  /** Version of the Arc Gateway configuration. */
  version?: string;
}

export function gatewayConfigurationSerializer(item: GatewayConfiguration): any {
  return { version: item["version"] };
}

export function gatewayConfigurationDeserializer(item: any): GatewayConfiguration {
  return {
    version: item["version"],
  };
}

/** Identity for the resource. */
export interface Identity {
  /** The principal ID of resource identity. */
  readonly principalId?: string;
  /** The tenant ID of resource. */
  readonly tenantId?: string;
  /** The identity type. */
  type?: ResourceIdentityType;
}

export function identitySerializer(item: Identity): any {
  return { type: item["type"] };
}

export function identityDeserializer(item: any): Identity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
  };
}

/** The identity type. */
export enum KnownResourceIdentityType {
  /** SystemAssigned */
  SystemAssigned = "SystemAssigned",
  /** None */
  None = "None",
}

/**
 * The identity type. \
 * {@link KnownResourceIdentityType} can be used interchangeably with ResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned** \
 * **None**
 */
export type ResourceIdentityType = string;

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

/** The Appliances patchable resource definition. */
export interface PatchableAppliance {
  /** Resource tags */
  tags?: Record<string, string>;
}

export function patchableApplianceSerializer(item: PatchableAppliance): any {
  return { tags: item["tags"] };
}

/** Paged collection of Appliance items */
export interface _ApplianceListResult {
  /** The Appliance items on this page */
  readonly value: Appliance[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applianceListResultDeserializer(item: any): _ApplianceListResult {
  return {
    value: applianceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applianceArraySerializer(result: Array<Appliance>): any[] {
  return result.map((item) => {
    return applianceSerializer(item);
  });
}

export function applianceArrayDeserializer(result: Array<Appliance>): any[] {
  return result.map((item) => {
    return applianceDeserializer(item);
  });
}

/** The List Cluster User Credential appliance. */
export interface ApplianceListCredentialResults {
  /** Contains the REP (rendezvous endpoint) and “Listener” access token from notification service (NS). */
  readonly hybridConnectionConfig?: HybridConnectionConfig;
  /** The list of appliance kubeconfigs. */
  readonly kubeconfigs?: ApplianceCredentialKubeconfig[];
}

export function applianceListCredentialResultsDeserializer(
  item: any,
): ApplianceListCredentialResults {
  return {
    hybridConnectionConfig: !item["hybridConnectionConfig"]
      ? item["hybridConnectionConfig"]
      : hybridConnectionConfigDeserializer(item["hybridConnectionConfig"]),
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : applianceCredentialKubeconfigArrayDeserializer(item["kubeconfigs"]),
  };
}

/** Contains the REP (rendezvous endpoint) and “Listener” access token from notification service (NS). */
export interface HybridConnectionConfig {
  /** Timestamp when this token will be expired. */
  readonly expirationTime?: number;
  /** Name of the connection */
  readonly hybridConnectionName?: string;
  /** Name of the notification service. */
  readonly relay?: string;
  /** Listener access token */
  readonly token?: string;
}

export function hybridConnectionConfigDeserializer(item: any): HybridConnectionConfig {
  return {
    expirationTime: item["expirationTime"],
    hybridConnectionName: item["hybridConnectionName"],
    relay: item["relay"],
    token: item["token"],
  };
}

export function applianceCredentialKubeconfigArrayDeserializer(
  result: Array<ApplianceCredentialKubeconfig>,
): any[] {
  return result.map((item) => {
    return applianceCredentialKubeconfigDeserializer(item);
  });
}

/** Cluster User Credential appliance. */
export interface ApplianceCredentialKubeconfig {
  /** Name which contains the role of the kubeconfig. */
  readonly name?: AccessProfileType;
  /** Contains the kubeconfig value. */
  readonly value?: string;
}

export function applianceCredentialKubeconfigDeserializer(
  item: any,
): ApplianceCredentialKubeconfig {
  return {
    name: item["name"],
    value: item["value"],
  };
}

/** Name which contains the role of the kubeconfig. */
export enum KnownAccessProfileType {
  /** clusterUser */
  ClusterUser = "clusterUser",
  /** clusterCustomerUser */
  ClusterCustomerUser = "clusterCustomerUser",
}

/**
 * Name which contains the role of the kubeconfig. \
 * {@link KnownAccessProfileType} can be used interchangeably with AccessProfileType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **clusterUser** \
 * **clusterCustomerUser**
 */
export type AccessProfileType = string;

/** The List Cluster Keys Results appliance. */
export interface ApplianceListKeysResults {
  /** Map of artifacts that contains a list of ArtifactProfile used to upload artifacts such as logs. */
  readonly artifactProfiles?: Record<string, ArtifactProfile>;
  /** The list of appliance kubeconfigs. */
  readonly kubeconfigs?: ApplianceCredentialKubeconfig[];
  /** Map of Customer User Public, Private SSH Keys and Certificate when available. */
  readonly sshKeys?: Record<string, SSHKey>;
}

export function applianceListKeysResultsDeserializer(item: any): ApplianceListKeysResults {
  return {
    artifactProfiles: !item["artifactProfiles"]
      ? item["artifactProfiles"]
      : artifactProfileRecordDeserializer(item["artifactProfiles"]),
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : applianceCredentialKubeconfigArrayDeserializer(item["kubeconfigs"]),
    sshKeys: !item["sshKeys"] ? item["sshKeys"] : sshKeyRecordDeserializer(item["sshKeys"]),
  };
}

export function artifactProfileRecordDeserializer(
  item: Record<string, any>,
): Record<string, ArtifactProfile> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : artifactProfileDeserializer(item[key]);
  });
  return result;
}

/** Appliance ArtifactProfile definition. */
export interface ArtifactProfile {
  /** Endpoint is the URL to upload artifacts to. */
  readonly endpoint?: string;
}

export function artifactProfileDeserializer(item: any): ArtifactProfile {
  return {
    endpoint: item["endpoint"],
  };
}

export function sshKeyRecordDeserializer(item: Record<string, any>): Record<string, SSHKey> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : sshKeyDeserializer(item[key]);
  });
  return result;
}

/** Appliance SSHKey definition. */
export interface SSHKey {
  /** Certificate associated with the public key if the key is signed. */
  readonly certificate?: string;
  /** Certificate creation timestamp (Unix). */
  readonly creationTimeStamp?: number;
  /** Certificate expiration timestamp (Unix). */
  readonly expirationTimeStamp?: number;
  /** Private Key. */
  readonly privateKey?: string;
  /** Public Key. */
  readonly publicKey?: string;
}

export function sshKeyDeserializer(item: any): SSHKey {
  return {
    certificate: item["certificate"],
    creationTimeStamp: item["creationTimeStamp"],
    expirationTimeStamp: item["expirationTimeStamp"],
    privateKey: item["privateKey"],
    publicKey: item["publicKey"],
  };
}

/** The Upgrade Graph for appliance. */
export interface UpgradeGraph {
  /** The appliance resource path */
  readonly id?: string;
  /** The release train name. */
  readonly name?: string;
  /** The properties of supported version */
  properties?: UpgradeGraphProperties;
}

export function upgradeGraphDeserializer(item: any): UpgradeGraph {
  return {
    id: item["id"],
    name: item["name"],
    properties: !item["properties"]
      ? item["properties"]
      : upgradeGraphPropertiesDeserializer(item["properties"]),
  };
}

/** The Upgrade Graph Properties for appliance. */
export interface UpgradeGraphProperties {
  /** The current appliance version */
  readonly applianceVersion?: string;
  /** This contains the current version and supported upgrade versions. */
  readonly supportedVersions?: SupportedVersion[];
}

export function upgradeGraphPropertiesDeserializer(item: any): UpgradeGraphProperties {
  return {
    applianceVersion: item["applianceVersion"],
    supportedVersions: !item["supportedVersions"]
      ? item["supportedVersions"]
      : supportedVersionArrayDeserializer(item["supportedVersions"]),
  };
}

export function supportedVersionArrayDeserializer(result: Array<SupportedVersion>): any[] {
  return result.map((item) => {
    return supportedVersionDeserializer(item);
  });
}

/** The SupportedVersion object for appliance. */
export interface SupportedVersion {
  /** This is the metadata of the supported newer version. */
  readonly metadata?: SupportedVersionMetadata;
  /** The newer version available for upgrade. */
  readonly version?: string;
}

export function supportedVersionDeserializer(item: any): SupportedVersion {
  return {
    metadata: !item["metadata"]
      ? item["metadata"]
      : supportedVersionMetadataDeserializer(item["metadata"]),
    version: item["version"],
  };
}

/** The SupportedVersionMetadata object for appliance. */
export interface SupportedVersionMetadata {
  /** The newer supported version catalog version. */
  readonly catalogVersion?: SupportedVersionCatalogVersion;
}

export function supportedVersionMetadataDeserializer(item: any): SupportedVersionMetadata {
  return {
    catalogVersion: !item["catalogVersion"]
      ? item["catalogVersion"]
      : supportedVersionCatalogVersionDeserializer(item["catalogVersion"]),
  };
}

/** The SupportedVersionCatalogVersion object for appliance. */
export interface SupportedVersionCatalogVersion {
  /** The newer supported version catalog version data. */
  readonly data?: SupportedVersionCatalogVersionData;
  /** The catalog version name for the version available for upgrade. */
  readonly name?: string;
  /** The catalog version namespace for the version available for upgrade. */
  readonly namespace?: string;
}

export function supportedVersionCatalogVersionDeserializer(
  item: any,
): SupportedVersionCatalogVersion {
  return {
    data: !item["data"]
      ? item["data"]
      : supportedVersionCatalogVersionDataDeserializer(item["data"]),
    name: item["name"],
    namespace: item["namespace"],
  };
}

/** The SupportedVersionCatalogVersionData object for appliance. */
export interface SupportedVersionCatalogVersionData {
  /** The image audience name for the version available for upgrade. */
  readonly audience?: string;
  /** The image catalog name for the version available for upgrade. */
  readonly catalog?: string;
  /** The image offer name for the version available for upgrade. */
  readonly offer?: string;
  /** The image version for the version available for upgrade. */
  readonly version?: string;
}

export function supportedVersionCatalogVersionDataDeserializer(
  item: any,
): SupportedVersionCatalogVersionData {
  return {
    audience: item["audience"],
    catalog: item["catalog"],
    offer: item["offer"],
    version: item["version"],
  };
}

/** Paged collection of ApplianceOperation items */
export interface _ApplianceOperationsList {
  /** The ApplianceOperation items on this page */
  value: ApplianceOperation[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applianceOperationsListDeserializer(item: any): _ApplianceOperationsList {
  return {
    value: applianceOperationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applianceOperationArrayDeserializer(result: Array<ApplianceOperation>): any[] {
  return result.map((item) => {
    return applianceOperationDeserializer(item);
  });
}

/** Appliances operation. */
export interface ApplianceOperation {
  /** Describes the properties of an Appliances Operation Value Display. */
  display?: ApplianceOperationValueDisplay;
  /** Is this Operation a data plane operation */
  readonly isDataAction?: boolean;
  /** The name of the compute operation. */
  readonly name?: string;
  /** The origin of the compute operation. */
  readonly origin?: string;
}

export function applianceOperationDeserializer(item: any): ApplianceOperation {
  return {
    display: !item["display"]
      ? item["display"]
      : applianceOperationValueDisplayDeserializer(item["display"]),
    isDataAction: item["isDataAction"],
    name: item["name"],
    origin: item["origin"],
  };
}

/** Describes the properties of an Appliances Operation Value Display. */
export interface ApplianceOperationValueDisplay {
  /** The description of the operation. */
  readonly description?: string;
  /** The display name of the compute operation. */
  readonly operation?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
}

export function applianceOperationValueDisplayDeserializer(
  item: any,
): ApplianceOperationValueDisplay {
  return {
    description: item["description"],
    operation: item["operation"],
    provider: item["provider"],
    resource: item["resource"],
  };
}

/** The Get Telemetry Config Result appliance. */
export interface ApplianceGetTelemetryConfigResult {
  /** Telemetry instrumentation key. */
  readonly telemetryInstrumentationKey?: string;
}

export function applianceGetTelemetryConfigResultDeserializer(
  item: any,
): ApplianceGetTelemetryConfigResult {
  return {
    telemetryInstrumentationKey: item["telemetryInstrumentationKey"],
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 2022-10-27 API version. */
  V20221027 = "2022-10-27",
  /** The 2025-03-01-preview API version. */
  V20250301Preview = "2025-03-01-preview",
}

/** Appliance ArtifactType definition. */
export enum KnownArtifactType {
  /** LogsArtifactType */
  LogsArtifactType = "LogsArtifactType",
}

/**
 * Appliance ArtifactType definition. \
 * {@link KnownArtifactType} can be used interchangeably with ArtifactType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LogsArtifactType**
 */
export type ArtifactType = string;

/** Appliance SSHKeyType definition. */
export enum KnownSSHKeyType {
  /** SSHCustomerUser */
  SSHCustomerUser = "SSHCustomerUser",
  /** ManagementCAKey */
  ManagementCAKey = "ManagementCAKey",
  /** LogsKey */
  LogsKey = "LogsKey",
  /** ScopedAccessKey */
  ScopedAccessKey = "ScopedAccessKey",
  /** UserManagementKey */
  UserManagementKey = "UserManagementKey",
}

/**
 * Appliance SSHKeyType definition. \
 * {@link KnownSSHKeyType} can be used interchangeably with SSHKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SSHCustomerUser** \
 * **ManagementCAKey** \
 * **LogsKey** \
 * **ScopedAccessKey** \
 * **UserManagementKey**
 */
export type SSHKeyType = string;
