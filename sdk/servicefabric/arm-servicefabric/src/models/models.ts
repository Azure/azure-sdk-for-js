// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { areAllPropsUndefined } from "../static-helpers/serialization/check-prop-undefined.js";
import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/**
 * This file contains only generated model types and their (de)serializers.
 * Disable the following rules for internal models with '_' prefix and deserializers which require 'any' for raw JSON input.
 */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/** Describes the result of the request to list Service Fabric resource provider operations. */
export interface _OperationListResult {
  /** List of operations supported by the Service Fabric resource provider. */
  value?: OperationResult[];
  /** URL to get the next set of operation list results if there are any. */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: !item["value"] ? item["value"] : operationResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationResultArrayDeserializer(result: Array<OperationResult>): any[] {
  return result.map((item) => {
    return operationResultDeserializer(item);
  });
}

/** Available operation list result */
export interface OperationResult {
  /** The name of the operation. */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The object that represents the operation. */
  display?: AvailableOperationDisplay;
  /** Origin result */
  origin?: string;
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

export function operationResultDeserializer(item: any): OperationResult {
  return {
    name: item["name"],
    isDataAction: item["isDataAction"],
    display: !item["display"]
      ? item["display"]
      : availableOperationDisplayDeserializer(item["display"]),
    origin: item["origin"],
    nextLink: item["nextLink"],
  };
}

/** Operation supported by the Service Fabric resource provider */
export interface AvailableOperationDisplay {
  /** The name of the provider. */
  provider?: string;
  /** The resource on which the operation is performed */
  resource?: string;
  /** The operation that can be performed. */
  operation?: string;
  /** Operation description */
  description?: string;
}

export function availableOperationDisplayDeserializer(item: any): AvailableOperationDisplay {
  return {
    provider: item["provider"],
    resource: item["resource"],
    operation: item["operation"],
    description: item["description"],
  };
}

/** The structure of the error. */
export interface ErrorModel {
  /** The error details. */
  error?: ErrorModelError;
}

export function errorModelDeserializer(item: any): ErrorModel {
  return {
    error: !item["error"] ? item["error"] : errorModelErrorDeserializer(item["error"]),
  };
}

/** The error details. */
export interface ErrorModelError {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

export function errorModelErrorDeserializer(item: any): ErrorModelError {
  return {
    code: item["code"],
    message: item["message"],
  };
}

/** The cluster resource */
export interface Cluster extends TrackedResource {
  /** Azure resource etag. */
  readonly etag?: string;
  /** The list of add-on features to enable in the cluster. */
  addOnFeatures?: AddOnFeatures[];
  /** The Service Fabric runtime versions available for this cluster. */
  readonly availableClusterVersions?: ClusterVersionDetails[];
  /** The AAD authentication settings of the cluster. */
  azureActiveDirectory?: AzureActiveDirectory;
  /** The certificate to use for securing the cluster. The certificate provided will be used for node to node security within the cluster, SSL certificate for cluster management endpoint and default admin client. */
  certificate?: CertificateDescription;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  certificateCommonNames?: ServerCertificateCommonNames;
  /** The list of client certificates referenced by common name that are allowed to manage the cluster. */
  clientCertificateCommonNames?: ClientCertificateCommonName[];
  /** The list of client certificates referenced by thumbprint that are allowed to manage the cluster. */
  clientCertificateThumbprints?: ClientCertificateThumbprint[];
  /** The Service Fabric runtime version of the cluster. This property can only by set the user when **upgradeMode** is set to 'Manual'. To get list of available Service Fabric versions for new clusters use [ClusterVersion API](https://learn.microsoft.com/rest/api/servicefabric/cluster-versions/list). To get the list of available version for existing clusters use **availableClusterVersions**. */
  clusterCodeVersion?: string;
  /** The Azure Resource Provider endpoint. A system service in the cluster connects to this  endpoint. */
  readonly clusterEndpoint?: string;
  /** A service generated unique identifier for the cluster resource. */
  readonly clusterId?: string;
  /**
   * The current state of the cluster.
   *
   * - WaitingForNodes - Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it.
   * - Deploying - Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up.
   * - BaselineUpgrade - Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time.
   * - UpdatingUserConfiguration - Indicates that the cluster is being upgraded with the user provided configuration.
   * - UpdatingUserCertificate - Indicates that the cluster is being upgraded with the user provided certificate.
   * - UpdatingInfrastructure - Indicates that the cluster is being upgraded with the latest Service Fabric runtime version. This happens only when the **upgradeMode** is set to 'Automatic'.
   * - EnforcingClusterVersion - Indicates that cluster is on a different version than expected and the cluster is being upgraded to the expected version.
   * - UpgradeServiceUnreachable - Indicates that the system service in the cluster is no longer polling the Resource Provider. Clusters in this state cannot be managed by the Resource Provider.
   * - AutoScale - Indicates that the ReliabilityLevel of the cluster is being adjusted.
   * - Ready - Indicates that the cluster is in a stable state.
   */
  readonly clusterState?: ClusterState;
  /** The storage account information for storing Service Fabric diagnostic logs. */
  diagnosticsStorageAccountConfig?: DiagnosticsStorageAccountConfig;
  /** Indicates if the event store service is enabled. */
  eventStoreServiceEnabled?: boolean;
  /** The list of custom fabric settings to configure the cluster. */
  fabricSettings?: SettingsSectionDescription[];
  /** The http management endpoint of the cluster. */
  managementEndpoint?: string;
  /** The list of node types in the cluster. */
  nodeTypes?: NodeTypeDescription[];
  /** The provisioning state of the cluster resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity).
   *
   * - None - Run the System services with a target replica set count of 1. This should only be used for test clusters.
   * - Bronze - Run the System services with a target replica set count of 3. This should only be used for test clusters.
   * - Silver - Run the System services with a target replica set count of 5.
   * - Gold - Run the System services with a target replica set count of 7.
   * - Platinum - Run the System services with a target replica set count of 9.
   */
  reliabilityLevel?: ReliabilityLevel;
  /** The server certificate used by reverse proxy. */
  reverseProxyCertificate?: CertificateDescription;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  reverseProxyCertificateCommonNames?: ServerCertificateCommonNames;
  /** The policy to use when upgrading the cluster. */
  upgradeDescription?: ClusterUpgradePolicy;
  /** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
  upgradeMode?: UpgradeMode;
  /** The policy used to clean up unused versions. */
  applicationTypeVersionsCleanupPolicy?: ApplicationTypeVersionsCleanupPolicy;
  /** The VM image VMSS has been configured with. Generic names such as Windows or Linux can be used. */
  vmImage?: string;
  /** This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. */
  sfZonalUpgradeMode?: SfZonalUpgradeMode;
  /** This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. */
  vmssZonalUpgradeMode?: VmssZonalUpgradeMode;
  /** Indicates if infrastructure service manager is enabled. */
  infrastructureServiceManager?: boolean;
  /** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. Only applies when **upgradeMode** is set to 'Automatic'. */
  upgradeWave?: ClusterUpgradeCadence;
  /** Indicates the start date and time to pause automatic runtime version upgrades on the cluster for an specific period of time on the cluster (UTC). */
  upgradePauseStartTimestampUtc?: Date;
  /** Indicates the end date and time to pause automatic runtime version upgrades on the cluster for an specific period of time on the cluster (UTC). */
  upgradePauseEndTimestampUtc?: Date;
  /** Boolean to pause automatic runtime version upgrades to the cluster. */
  waveUpgradePaused?: boolean;
  /** Indicates a list of notification channels for cluster events. */
  notifications?: Notification[];
  /** If true, token-based authentication is not allowed on the HttpGatewayEndpoint. This is required to support TLS versions 1.3 and above. If token-based authentication is used, HttpGatewayTokenAuthEndpointPort must be defined. */
  enableHttpGatewayExclusiveAuthMode?: boolean;
}

export function clusterSerializer(item: Cluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "addOnFeatures",
      "azureActiveDirectory",
      "certificate",
      "certificateCommonNames",
      "clientCertificateCommonNames",
      "clientCertificateThumbprints",
      "clusterCodeVersion",
      "diagnosticsStorageAccountConfig",
      "eventStoreServiceEnabled",
      "fabricSettings",
      "managementEndpoint",
      "nodeTypes",
      "reliabilityLevel",
      "reverseProxyCertificate",
      "reverseProxyCertificateCommonNames",
      "upgradeDescription",
      "upgradeMode",
      "applicationTypeVersionsCleanupPolicy",
      "vmImage",
      "sfZonalUpgradeMode",
      "vmssZonalUpgradeMode",
      "infrastructureServiceManager",
      "upgradeWave",
      "upgradePauseStartTimestampUtc",
      "upgradePauseEndTimestampUtc",
      "waveUpgradePaused",
      "notifications",
      "enableHttpGatewayExclusiveAuthMode",
    ])
      ? undefined
      : _clusterPropertiesSerializer(item),
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
    etag: item["etag"],
  };
}

/** Describes the cluster resource properties. */
export interface ClusterProperties {
  /** The list of add-on features to enable in the cluster. */
  addOnFeatures?: AddOnFeatures[];
  /** The Service Fabric runtime versions available for this cluster. */
  readonly availableClusterVersions?: ClusterVersionDetails[];
  /** The AAD authentication settings of the cluster. */
  azureActiveDirectory?: AzureActiveDirectory;
  /** The certificate to use for securing the cluster. The certificate provided will be used for node to node security within the cluster, SSL certificate for cluster management endpoint and default admin client. */
  certificate?: CertificateDescription;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  certificateCommonNames?: ServerCertificateCommonNames;
  /** The list of client certificates referenced by common name that are allowed to manage the cluster. */
  clientCertificateCommonNames?: ClientCertificateCommonName[];
  /** The list of client certificates referenced by thumbprint that are allowed to manage the cluster. */
  clientCertificateThumbprints?: ClientCertificateThumbprint[];
  /** The Service Fabric runtime version of the cluster. This property can only by set the user when **upgradeMode** is set to 'Manual'. To get list of available Service Fabric versions for new clusters use [ClusterVersion API](https://learn.microsoft.com/rest/api/servicefabric/cluster-versions/list). To get the list of available version for existing clusters use **availableClusterVersions**. */
  clusterCodeVersion?: string;
  /** The Azure Resource Provider endpoint. A system service in the cluster connects to this  endpoint. */
  readonly clusterEndpoint?: string;
  /** A service generated unique identifier for the cluster resource. */
  readonly clusterId?: string;
  /**
   * The current state of the cluster.
   *
   * - WaitingForNodes - Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it.
   * - Deploying - Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up.
   * - BaselineUpgrade - Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time.
   * - UpdatingUserConfiguration - Indicates that the cluster is being upgraded with the user provided configuration.
   * - UpdatingUserCertificate - Indicates that the cluster is being upgraded with the user provided certificate.
   * - UpdatingInfrastructure - Indicates that the cluster is being upgraded with the latest Service Fabric runtime version. This happens only when the **upgradeMode** is set to 'Automatic'.
   * - EnforcingClusterVersion - Indicates that cluster is on a different version than expected and the cluster is being upgraded to the expected version.
   * - UpgradeServiceUnreachable - Indicates that the system service in the cluster is no longer polling the Resource Provider. Clusters in this state cannot be managed by the Resource Provider.
   * - AutoScale - Indicates that the ReliabilityLevel of the cluster is being adjusted.
   * - Ready - Indicates that the cluster is in a stable state.
   */
  readonly clusterState?: ClusterState;
  /** The storage account information for storing Service Fabric diagnostic logs. */
  diagnosticsStorageAccountConfig?: DiagnosticsStorageAccountConfig;
  /** Indicates if the event store service is enabled. */
  eventStoreServiceEnabled?: boolean;
  /** The list of custom fabric settings to configure the cluster. */
  fabricSettings?: SettingsSectionDescription[];
  /** The http management endpoint of the cluster. */
  managementEndpoint: string;
  /** The list of node types in the cluster. */
  nodeTypes: NodeTypeDescription[];
  /** The provisioning state of the cluster resource. */
  readonly provisioningState?: ProvisioningState;
  /**
   * The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity).
   *
   * - None - Run the System services with a target replica set count of 1. This should only be used for test clusters.
   * - Bronze - Run the System services with a target replica set count of 3. This should only be used for test clusters.
   * - Silver - Run the System services with a target replica set count of 5.
   * - Gold - Run the System services with a target replica set count of 7.
   * - Platinum - Run the System services with a target replica set count of 9.
   */
  reliabilityLevel?: ReliabilityLevel;
  /** The server certificate used by reverse proxy. */
  reverseProxyCertificate?: CertificateDescription;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  reverseProxyCertificateCommonNames?: ServerCertificateCommonNames;
  /** The policy to use when upgrading the cluster. */
  upgradeDescription?: ClusterUpgradePolicy;
  /** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
  upgradeMode?: UpgradeMode;
  /** The policy used to clean up unused versions. */
  applicationTypeVersionsCleanupPolicy?: ApplicationTypeVersionsCleanupPolicy;
  /** The VM image VMSS has been configured with. Generic names such as Windows or Linux can be used. */
  vmImage?: string;
  /** This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. */
  sfZonalUpgradeMode?: SfZonalUpgradeMode;
  /** This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. */
  vmssZonalUpgradeMode?: VmssZonalUpgradeMode;
  /** Indicates if infrastructure service manager is enabled. */
  infrastructureServiceManager?: boolean;
  /** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. Only applies when **upgradeMode** is set to 'Automatic'. */
  upgradeWave?: ClusterUpgradeCadence;
  /** Indicates the start date and time to pause automatic runtime version upgrades on the cluster for an specific period of time on the cluster (UTC). */
  upgradePauseStartTimestampUtc?: Date;
  /** Indicates the end date and time to pause automatic runtime version upgrades on the cluster for an specific period of time on the cluster (UTC). */
  upgradePauseEndTimestampUtc?: Date;
  /** Boolean to pause automatic runtime version upgrades to the cluster. */
  waveUpgradePaused?: boolean;
  /** Indicates a list of notification channels for cluster events. */
  notifications?: Notification[];
  /** If true, token-based authentication is not allowed on the HttpGatewayEndpoint. This is required to support TLS versions 1.3 and above. If token-based authentication is used, HttpGatewayTokenAuthEndpointPort must be defined. */
  enableHttpGatewayExclusiveAuthMode?: boolean;
}

export function clusterPropertiesSerializer(item: ClusterProperties): any {
  return {
    addOnFeatures: !item["addOnFeatures"]
      ? item["addOnFeatures"]
      : item["addOnFeatures"].map((p: any) => {
          return p;
        }),
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectorySerializer(item["azureActiveDirectory"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateDescriptionSerializer(item["certificate"]),
    certificateCommonNames: !item["certificateCommonNames"]
      ? item["certificateCommonNames"]
      : serverCertificateCommonNamesSerializer(item["certificateCommonNames"]),
    clientCertificateCommonNames: !item["clientCertificateCommonNames"]
      ? item["clientCertificateCommonNames"]
      : clientCertificateCommonNameArraySerializer(item["clientCertificateCommonNames"]),
    clientCertificateThumbprints: !item["clientCertificateThumbprints"]
      ? item["clientCertificateThumbprints"]
      : clientCertificateThumbprintArraySerializer(item["clientCertificateThumbprints"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    diagnosticsStorageAccountConfig: !item["diagnosticsStorageAccountConfig"]
      ? item["diagnosticsStorageAccountConfig"]
      : diagnosticsStorageAccountConfigSerializer(item["diagnosticsStorageAccountConfig"]),
    eventStoreServiceEnabled: item["eventStoreServiceEnabled"],
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArraySerializer(item["fabricSettings"]),
    managementEndpoint: item["managementEndpoint"],
    nodeTypes: nodeTypeDescriptionArraySerializer(item["nodeTypes"]),
    reliabilityLevel: item["reliabilityLevel"],
    reverseProxyCertificate: !item["reverseProxyCertificate"]
      ? item["reverseProxyCertificate"]
      : certificateDescriptionSerializer(item["reverseProxyCertificate"]),
    reverseProxyCertificateCommonNames: !item["reverseProxyCertificateCommonNames"]
      ? item["reverseProxyCertificateCommonNames"]
      : serverCertificateCommonNamesSerializer(item["reverseProxyCertificateCommonNames"]),
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicySerializer(item["upgradeDescription"]),
    upgradeMode: item["upgradeMode"],
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicySerializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    vmImage: item["vmImage"],
    sfZonalUpgradeMode: item["sfZonalUpgradeMode"],
    vmssZonalUpgradeMode: item["vmssZonalUpgradeMode"],
    infrastructureServiceManager: item["infrastructureServiceManager"],
    upgradeWave: item["upgradeWave"],
    upgradePauseStartTimestampUtc: !item["upgradePauseStartTimestampUtc"]
      ? item["upgradePauseStartTimestampUtc"]
      : item["upgradePauseStartTimestampUtc"].toISOString(),
    upgradePauseEndTimestampUtc: !item["upgradePauseEndTimestampUtc"]
      ? item["upgradePauseEndTimestampUtc"]
      : item["upgradePauseEndTimestampUtc"].toISOString(),
    waveUpgradePaused: item["waveUpgradePaused"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
  };
}

export function clusterPropertiesDeserializer(item: any): ClusterProperties {
  return {
    addOnFeatures: !item["addOnFeatures"]
      ? item["addOnFeatures"]
      : item["addOnFeatures"].map((p: any) => {
          return p;
        }),
    availableClusterVersions: !item["availableClusterVersions"]
      ? item["availableClusterVersions"]
      : clusterVersionDetailsArrayDeserializer(item["availableClusterVersions"]),
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectoryDeserializer(item["azureActiveDirectory"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateDescriptionDeserializer(item["certificate"]),
    certificateCommonNames: !item["certificateCommonNames"]
      ? item["certificateCommonNames"]
      : serverCertificateCommonNamesDeserializer(item["certificateCommonNames"]),
    clientCertificateCommonNames: !item["clientCertificateCommonNames"]
      ? item["clientCertificateCommonNames"]
      : clientCertificateCommonNameArrayDeserializer(item["clientCertificateCommonNames"]),
    clientCertificateThumbprints: !item["clientCertificateThumbprints"]
      ? item["clientCertificateThumbprints"]
      : clientCertificateThumbprintArrayDeserializer(item["clientCertificateThumbprints"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    clusterEndpoint: item["clusterEndpoint"],
    clusterId: item["clusterId"],
    clusterState: item["clusterState"],
    diagnosticsStorageAccountConfig: !item["diagnosticsStorageAccountConfig"]
      ? item["diagnosticsStorageAccountConfig"]
      : diagnosticsStorageAccountConfigDeserializer(item["diagnosticsStorageAccountConfig"]),
    eventStoreServiceEnabled: item["eventStoreServiceEnabled"],
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArrayDeserializer(item["fabricSettings"]),
    managementEndpoint: item["managementEndpoint"],
    nodeTypes: nodeTypeDescriptionArrayDeserializer(item["nodeTypes"]),
    provisioningState: item["provisioningState"],
    reliabilityLevel: item["reliabilityLevel"],
    reverseProxyCertificate: !item["reverseProxyCertificate"]
      ? item["reverseProxyCertificate"]
      : certificateDescriptionDeserializer(item["reverseProxyCertificate"]),
    reverseProxyCertificateCommonNames: !item["reverseProxyCertificateCommonNames"]
      ? item["reverseProxyCertificateCommonNames"]
      : serverCertificateCommonNamesDeserializer(item["reverseProxyCertificateCommonNames"]),
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicyDeserializer(item["upgradeDescription"]),
    upgradeMode: item["upgradeMode"],
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicyDeserializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    vmImage: item["vmImage"],
    sfZonalUpgradeMode: item["sfZonalUpgradeMode"],
    vmssZonalUpgradeMode: item["vmssZonalUpgradeMode"],
    infrastructureServiceManager: item["infrastructureServiceManager"],
    upgradeWave: item["upgradeWave"],
    upgradePauseStartTimestampUtc: !item["upgradePauseStartTimestampUtc"]
      ? item["upgradePauseStartTimestampUtc"]
      : new Date(item["upgradePauseStartTimestampUtc"]),
    upgradePauseEndTimestampUtc: !item["upgradePauseEndTimestampUtc"]
      ? item["upgradePauseEndTimestampUtc"]
      : new Date(item["upgradePauseEndTimestampUtc"]),
    waveUpgradePaused: item["waveUpgradePaused"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
  };
}

/** Available cluster add-on features */
export enum KnownAddOnFeatures {
  /** Add on RepairManager */
  RepairManager = "RepairManager",
  /** Add on DnsService */
  DnsService = "DnsService",
  /** Add on BackupRestoreService */
  BackupRestoreService = "BackupRestoreService",
  /** Add on ResourceMonitorService */
  ResourceMonitorService = "ResourceMonitorService",
}

/**
 * Available cluster add-on features \
 * {@link KnownAddOnFeatures} can be used interchangeably with AddOnFeatures,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RepairManager**: Add on RepairManager \
 * **DnsService**: Add on DnsService \
 * **BackupRestoreService**: Add on BackupRestoreService \
 * **ResourceMonitorService**: Add on ResourceMonitorService
 */
export type AddOnFeatures = string;

export function clusterVersionDetailsArrayDeserializer(
  result: Array<ClusterVersionDetails>,
): any[] {
  return result.map((item) => {
    return clusterVersionDetailsDeserializer(item);
  });
}

/** The detail of the Service Fabric runtime version result */
export interface ClusterVersionDetails {
  /** The Service Fabric runtime version of the cluster. */
  codeVersion?: string;
  /** The date of expiry of support of the version. */
  supportExpiryUtc?: string;
  /** Indicates if this version is for Windows or Linux operating system. */
  environment?: ClusterEnvironment;
}

export function clusterVersionDetailsDeserializer(item: any): ClusterVersionDetails {
  return {
    codeVersion: item["codeVersion"],
    supportExpiryUtc: item["supportExpiryUtc"],
    environment: item["environment"],
  };
}

/** Cluster operating system, the default will be Windows */
export enum KnownClusterEnvironment {
  /** Windows operating system */
  Windows = "Windows",
  /** Linux operating system */
  Linux = "Linux",
}

/**
 * Cluster operating system, the default will be Windows \
 * {@link KnownClusterEnvironment} can be used interchangeably with ClusterEnvironment,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows operating system \
 * **Linux**: Linux operating system
 */
export type ClusterEnvironment = string;

/** The settings to enable AAD authentication on the cluster. */
export interface AzureActiveDirectory {
  /** Azure active directory tenant id. */
  tenantId?: string;
  /** Azure active directory cluster application id. */
  clusterApplication?: string;
  /** Azure active directory client application id. */
  clientApplication?: string;
}

export function azureActiveDirectorySerializer(item: AzureActiveDirectory): any {
  return {
    tenantId: item["tenantId"],
    clusterApplication: item["clusterApplication"],
    clientApplication: item["clientApplication"],
  };
}

export function azureActiveDirectoryDeserializer(item: any): AzureActiveDirectory {
  return {
    tenantId: item["tenantId"],
    clusterApplication: item["clusterApplication"],
    clientApplication: item["clientApplication"],
  };
}

/** Describes the certificate details. */
export interface CertificateDescription {
  /** Thumbprint of the primary certificate. */
  thumbprint: string;
  /** Thumbprint of the secondary certificate. */
  thumbprintSecondary?: string;
  /** The local certificate store location. */
  x509StoreName?: StoreName;
}

export function certificateDescriptionSerializer(item: CertificateDescription): any {
  return {
    thumbprint: item["thumbprint"],
    thumbprintSecondary: item["thumbprintSecondary"],
    x509StoreName: item["x509StoreName"],
  };
}

export function certificateDescriptionDeserializer(item: any): CertificateDescription {
  return {
    thumbprint: item["thumbprint"],
    thumbprintSecondary: item["thumbprintSecondary"],
    x509StoreName: item["x509StoreName"],
  };
}

/** The local certificate store location. */
export enum KnownStoreName {
  /** Static value for AddressBook */
  AddressBook = "AddressBook",
  /** Static value for AuthRoot */
  AuthRoot = "AuthRoot",
  /** Static value for CertificateAuthority */
  CertificateAuthority = "CertificateAuthority",
  /** Static value for Disallowed */
  Disallowed = "Disallowed",
  /** Static value for My */
  My = "My",
  /** Static value for Root */
  Root = "Root",
  /** Static value for TrustedPeople */
  TrustedPeople = "TrustedPeople",
  /** Static value for TrustedPublisher */
  TrustedPublisher = "TrustedPublisher",
}

/**
 * The local certificate store location. \
 * {@link KnownStoreName} can be used interchangeably with StoreName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AddressBook**: Static value for AddressBook \
 * **AuthRoot**: Static value for AuthRoot \
 * **CertificateAuthority**: Static value for CertificateAuthority \
 * **Disallowed**: Static value for Disallowed \
 * **My**: Static value for My \
 * **Root**: Static value for Root \
 * **TrustedPeople**: Static value for TrustedPeople \
 * **TrustedPublisher**: Static value for TrustedPublisher
 */
export type StoreName = string;

/** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
export interface ServerCertificateCommonNames {
  /** The list of server certificates referenced by common name that are used to secure the cluster. */
  commonNames?: ServerCertificateCommonName[];
  /** The local certificate store location. */
  x509StoreName?: StoreName;
}

export function serverCertificateCommonNamesSerializer(item: ServerCertificateCommonNames): any {
  return {
    commonNames: !item["commonNames"]
      ? item["commonNames"]
      : serverCertificateCommonNameArraySerializer(item["commonNames"]),
    x509StoreName: item["x509StoreName"],
  };
}

export function serverCertificateCommonNamesDeserializer(item: any): ServerCertificateCommonNames {
  return {
    commonNames: !item["commonNames"]
      ? item["commonNames"]
      : serverCertificateCommonNameArrayDeserializer(item["commonNames"]),
    x509StoreName: item["x509StoreName"],
  };
}

export function serverCertificateCommonNameArraySerializer(
  result: Array<ServerCertificateCommonName>,
): any[] {
  return result.map((item) => {
    return serverCertificateCommonNameSerializer(item);
  });
}

export function serverCertificateCommonNameArrayDeserializer(
  result: Array<ServerCertificateCommonName>,
): any[] {
  return result.map((item) => {
    return serverCertificateCommonNameDeserializer(item);
  });
}

/** Describes the server certificate details using common name. */
export interface ServerCertificateCommonName {
  /** The common name of the server certificate. */
  certificateCommonName: string;
  /** The issuer thumbprint of the server certificate. */
  certificateIssuerThumbprint: string;
}

export function serverCertificateCommonNameSerializer(item: ServerCertificateCommonName): any {
  return {
    certificateCommonName: item["certificateCommonName"],
    certificateIssuerThumbprint: item["certificateIssuerThumbprint"],
  };
}

export function serverCertificateCommonNameDeserializer(item: any): ServerCertificateCommonName {
  return {
    certificateCommonName: item["certificateCommonName"],
    certificateIssuerThumbprint: item["certificateIssuerThumbprint"],
  };
}

export function clientCertificateCommonNameArraySerializer(
  result: Array<ClientCertificateCommonName>,
): any[] {
  return result.map((item) => {
    return clientCertificateCommonNameSerializer(item);
  });
}

export function clientCertificateCommonNameArrayDeserializer(
  result: Array<ClientCertificateCommonName>,
): any[] {
  return result.map((item) => {
    return clientCertificateCommonNameDeserializer(item);
  });
}

/** Describes the client certificate details using common name. */
export interface ClientCertificateCommonName {
  /** Indicates if the client certificate has admin access to the cluster. Non admin clients can perform only read only operations on the cluster. */
  isAdmin: boolean;
  /** The common name of the client certificate. */
  certificateCommonName: string;
  /** The issuer thumbprint of the client certificate. */
  certificateIssuerThumbprint: string;
}

export function clientCertificateCommonNameSerializer(item: ClientCertificateCommonName): any {
  return {
    isAdmin: item["isAdmin"],
    certificateCommonName: item["certificateCommonName"],
    certificateIssuerThumbprint: item["certificateIssuerThumbprint"],
  };
}

export function clientCertificateCommonNameDeserializer(item: any): ClientCertificateCommonName {
  return {
    isAdmin: item["isAdmin"],
    certificateCommonName: item["certificateCommonName"],
    certificateIssuerThumbprint: item["certificateIssuerThumbprint"],
  };
}

export function clientCertificateThumbprintArraySerializer(
  result: Array<ClientCertificateThumbprint>,
): any[] {
  return result.map((item) => {
    return clientCertificateThumbprintSerializer(item);
  });
}

export function clientCertificateThumbprintArrayDeserializer(
  result: Array<ClientCertificateThumbprint>,
): any[] {
  return result.map((item) => {
    return clientCertificateThumbprintDeserializer(item);
  });
}

/** Describes the client certificate details using thumbprint. */
export interface ClientCertificateThumbprint {
  /** Indicates if the client certificate has admin access to the cluster. Non admin clients can perform only read only operations on the cluster. */
  isAdmin: boolean;
  /** The thumbprint of the client certificate. */
  certificateThumbprint: string;
}

export function clientCertificateThumbprintSerializer(item: ClientCertificateThumbprint): any {
  return { isAdmin: item["isAdmin"], certificateThumbprint: item["certificateThumbprint"] };
}

export function clientCertificateThumbprintDeserializer(item: any): ClientCertificateThumbprint {
  return {
    isAdmin: item["isAdmin"],
    certificateThumbprint: item["certificateThumbprint"],
  };
}

/** The current state of the cluster. */
export enum KnownClusterState {
  /** Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it. */
  WaitingForNodes = "WaitingForNodes",
  /** Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up. */
  Deploying = "Deploying",
  /** Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time. */
  BaselineUpgrade = "BaselineUpgrade",
  /** Indicates that the cluster is being upgraded with the user provided configuration. */
  UpdatingUserConfiguration = "UpdatingUserConfiguration",
  /** Indicates that the cluster is being upgraded with the user provided certificate. */
  UpdatingUserCertificate = "UpdatingUserCertificate",
  /** Indicates that the cluster is being upgraded with the latest Service Fabric runtime version. This happens only when the **upgradeMode** is set to 'Automatic'. */
  UpdatingInfrastructure = "UpdatingInfrastructure",
  /** Indicates that cluster is on a different version than expected and the cluster is being upgraded to the expected version. */
  EnforcingClusterVersion = "EnforcingClusterVersion",
  /** Indicates that the system service in the cluster is no longer polling the Resource Provider. Clusters in this state cannot be managed by the Resource Provider. */
  UpgradeServiceUnreachable = "UpgradeServiceUnreachable",
  /** Indicates that the ReliabilityLevel of the cluster is being adjusted. */
  AutoScale = "AutoScale",
  /** Indicates that the cluster is in a stable state. */
  Ready = "Ready",
}

/**
 * The current state of the cluster. \
 * {@link KnownClusterState} can be used interchangeably with ClusterState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WaitingForNodes**: Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it. \
 * **Deploying**: Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up. \
 * **BaselineUpgrade**: Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time. \
 * **UpdatingUserConfiguration**: Indicates that the cluster is being upgraded with the user provided configuration. \
 * **UpdatingUserCertificate**: Indicates that the cluster is being upgraded with the user provided certificate. \
 * **UpdatingInfrastructure**: Indicates that the cluster is being upgraded with the latest Service Fabric runtime version. This happens only when the **upgradeMode** is set to 'Automatic'. \
 * **EnforcingClusterVersion**: Indicates that cluster is on a different version than expected and the cluster is being upgraded to the expected version. \
 * **UpgradeServiceUnreachable**: Indicates that the system service in the cluster is no longer polling the Resource Provider. Clusters in this state cannot be managed by the Resource Provider. \
 * **AutoScale**: Indicates that the ReliabilityLevel of the cluster is being adjusted. \
 * **Ready**: Indicates that the cluster is in a stable state.
 */
export type ClusterState = string;

/** The storage account information for storing Service Fabric diagnostic logs. */
export interface DiagnosticsStorageAccountConfig {
  /** The Azure storage account name. */
  storageAccountName: string;
  /** The protected diagnostics storage key name. */
  protectedAccountKeyName: string;
  /** The secondary protected diagnostics storage key name. If one of the storage account keys is rotated the cluster will fallback to using the other. */
  protectedAccountKeyName2?: string;
  /** The blob endpoint of the azure storage account. */
  blobEndpoint: string;
  /** The queue endpoint of the azure storage account. */
  queueEndpoint: string;
  /** The table endpoint of the azure storage account. */
  tableEndpoint: string;
}

export function diagnosticsStorageAccountConfigSerializer(
  item: DiagnosticsStorageAccountConfig,
): any {
  return {
    storageAccountName: item["storageAccountName"],
    protectedAccountKeyName: item["protectedAccountKeyName"],
    protectedAccountKeyName2: item["protectedAccountKeyName2"],
    blobEndpoint: item["blobEndpoint"],
    queueEndpoint: item["queueEndpoint"],
    tableEndpoint: item["tableEndpoint"],
  };
}

export function diagnosticsStorageAccountConfigDeserializer(
  item: any,
): DiagnosticsStorageAccountConfig {
  return {
    storageAccountName: item["storageAccountName"],
    protectedAccountKeyName: item["protectedAccountKeyName"],
    protectedAccountKeyName2: item["protectedAccountKeyName2"],
    blobEndpoint: item["blobEndpoint"],
    queueEndpoint: item["queueEndpoint"],
    tableEndpoint: item["tableEndpoint"],
  };
}

export function settingsSectionDescriptionArraySerializer(
  result: Array<SettingsSectionDescription>,
): any[] {
  return result.map((item) => {
    return settingsSectionDescriptionSerializer(item);
  });
}

export function settingsSectionDescriptionArrayDeserializer(
  result: Array<SettingsSectionDescription>,
): any[] {
  return result.map((item) => {
    return settingsSectionDescriptionDeserializer(item);
  });
}

/** Describes a section in the fabric settings of the cluster. */
export interface SettingsSectionDescription {
  /** The section name of the fabric settings. */
  name: string;
  /** The collection of parameters in the section. */
  parameters: SettingsParameterDescription[];
}

export function settingsSectionDescriptionSerializer(item: SettingsSectionDescription): any {
  return {
    name: item["name"],
    parameters: settingsParameterDescriptionArraySerializer(item["parameters"]),
  };
}

export function settingsSectionDescriptionDeserializer(item: any): SettingsSectionDescription {
  return {
    name: item["name"],
    parameters: settingsParameterDescriptionArrayDeserializer(item["parameters"]),
  };
}

export function settingsParameterDescriptionArraySerializer(
  result: Array<SettingsParameterDescription>,
): any[] {
  return result.map((item) => {
    return settingsParameterDescriptionSerializer(item);
  });
}

export function settingsParameterDescriptionArrayDeserializer(
  result: Array<SettingsParameterDescription>,
): any[] {
  return result.map((item) => {
    return settingsParameterDescriptionDeserializer(item);
  });
}

/** Describes a parameter in fabric settings of the cluster. */
export interface SettingsParameterDescription {
  /** The parameter name of fabric setting. */
  name: string;
  /** The parameter value of fabric setting. */
  value: string;
}

export function settingsParameterDescriptionSerializer(item: SettingsParameterDescription): any {
  return { name: item["name"], value: item["value"] };
}

export function settingsParameterDescriptionDeserializer(item: any): SettingsParameterDescription {
  return {
    name: item["name"],
    value: item["value"],
  };
}

export function nodeTypeDescriptionArraySerializer(result: Array<NodeTypeDescription>): any[] {
  return result.map((item) => {
    return nodeTypeDescriptionSerializer(item);
  });
}

export function nodeTypeDescriptionArrayDeserializer(result: Array<NodeTypeDescription>): any[] {
  return result.map((item) => {
    return nodeTypeDescriptionDeserializer(item);
  });
}

/** Describes a node type in the cluster, each node type represents sub set of nodes in the cluster. */
export interface NodeTypeDescription {
  /** The name of the node type. */
  name: string;
  /** The placement tags applied to nodes in the node type, which can be used to indicate where certain services (workload) should run. */
  placementProperties?: Record<string, string>;
  /** The capacity tags applied to the nodes in the node type, the cluster resource manager uses these tags to understand how much resource a node has. */
  capacities?: Record<string, string>;
  /** The TCP cluster management endpoint port. */
  clientConnectionEndpointPort: number;
  /** The HTTP cluster management endpoint port. */
  httpGatewayEndpointPort: number;
  /**
   * The durability level of the node type. Learn about [DurabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity).
   *
   * - Bronze - No privileges. This is the default.
   * - Silver - The infrastructure jobs can be paused for a duration of 10 minutes per UD.
   * - Gold - The infrastructure jobs can be paused for a duration of 2 hours per UD. Gold durability can be enabled only on full node VM skus like D15_V2, G5 etc.
   */
  durabilityLevel?: DurabilityLevel;
  /** The range of ports from which cluster assigned port to Service Fabric applications. */
  applicationPorts?: EndpointRangeDescription;
  /** The range of ephemeral ports that nodes in this node type should be configured with. */
  ephemeralPorts?: EndpointRangeDescription;
  /** The node type on which system services will run. Only one node type should be marked as primary. Primary node type cannot be deleted or changed for existing clusters. */
  isPrimary: boolean;
  /** VMInstanceCount should be 1 to n, where n indicates the number of VM instances corresponding to this nodeType. VMInstanceCount = 0 can be done only in these scenarios: NodeType is a secondary nodeType. Durability = Bronze or Durability >= Bronze and InfrastructureServiceManager = true. If VMInstanceCount = 0, implies the VMs for this nodeType will not be used for the initial cluster size computation. */
  vmInstanceCount: number;
  /** The endpoint used by reverse proxy. */
  reverseProxyEndpointPort?: number;
  /** Indicates if the node type can only host Stateless workloads. */
  isStateless?: boolean;
  /** Indicates if the node type is enabled to support multiple zones. */
  multipleAvailabilityZones?: boolean;
  /** The port used for token-auth based HTTPS connections to the cluster. Cannot be set to the same port as HttpGatewayEndpoint. */
  httpGatewayTokenAuthEndpointPort?: number;
}

export function nodeTypeDescriptionSerializer(item: NodeTypeDescription): any {
  return {
    name: item["name"],
    placementProperties: item["placementProperties"],
    capacities: item["capacities"],
    clientConnectionEndpointPort: item["clientConnectionEndpointPort"],
    httpGatewayEndpointPort: item["httpGatewayEndpointPort"],
    durabilityLevel: item["durabilityLevel"],
    applicationPorts: !item["applicationPorts"]
      ? item["applicationPorts"]
      : endpointRangeDescriptionSerializer(item["applicationPorts"]),
    ephemeralPorts: !item["ephemeralPorts"]
      ? item["ephemeralPorts"]
      : endpointRangeDescriptionSerializer(item["ephemeralPorts"]),
    isPrimary: item["isPrimary"],
    vmInstanceCount: item["vmInstanceCount"],
    reverseProxyEndpointPort: item["reverseProxyEndpointPort"],
    isStateless: item["isStateless"],
    multipleAvailabilityZones: item["multipleAvailabilityZones"],
    httpGatewayTokenAuthEndpointPort: item["httpGatewayTokenAuthEndpointPort"],
  };
}

export function nodeTypeDescriptionDeserializer(item: any): NodeTypeDescription {
  return {
    name: item["name"],
    placementProperties: !item["placementProperties"]
      ? item["placementProperties"]
      : Object.fromEntries(
          Object.entries(item["placementProperties"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    capacities: !item["capacities"]
      ? item["capacities"]
      : Object.fromEntries(
          Object.entries(item["capacities"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    clientConnectionEndpointPort: item["clientConnectionEndpointPort"],
    httpGatewayEndpointPort: item["httpGatewayEndpointPort"],
    durabilityLevel: item["durabilityLevel"],
    applicationPorts: !item["applicationPorts"]
      ? item["applicationPorts"]
      : endpointRangeDescriptionDeserializer(item["applicationPorts"]),
    ephemeralPorts: !item["ephemeralPorts"]
      ? item["ephemeralPorts"]
      : endpointRangeDescriptionDeserializer(item["ephemeralPorts"]),
    isPrimary: item["isPrimary"],
    vmInstanceCount: item["vmInstanceCount"],
    reverseProxyEndpointPort: item["reverseProxyEndpointPort"],
    isStateless: item["isStateless"],
    multipleAvailabilityZones: item["multipleAvailabilityZones"],
    httpGatewayTokenAuthEndpointPort: item["httpGatewayTokenAuthEndpointPort"],
  };
}

/** The durability level of the node type. Learn about [DurabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity). */
export enum KnownDurabilityLevel {
  /** No privileges. This is the default. */
  Bronze = "Bronze",
  /** The infrastructure jobs can be paused for a duration of 10 minutes per UD. */
  Silver = "Silver",
  /** The infrastructure jobs can be paused for a duration of 2 hours per UD. Gold durability can be enabled only on full node VM skus like D15_V2, G5 etc. */
  Gold = "Gold",
}

/**
 * The durability level of the node type. Learn about [DurabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity). \
 * {@link KnownDurabilityLevel} can be used interchangeably with DurabilityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Bronze**: No privileges. This is the default. \
 * **Silver**: The infrastructure jobs can be paused for a duration of 10 minutes per UD. \
 * **Gold**: The infrastructure jobs can be paused for a duration of 2 hours per UD. Gold durability can be enabled only on full node VM skus like D15_V2, G5 etc.
 */
export type DurabilityLevel = string;

/** Port range details */
export interface EndpointRangeDescription {
  /** Starting port of a range of ports */
  startPort: number;
  /** End port of a range of ports */
  endPort: number;
}

export function endpointRangeDescriptionSerializer(item: EndpointRangeDescription): any {
  return { startPort: item["startPort"], endPort: item["endPort"] };
}

export function endpointRangeDescriptionDeserializer(item: any): EndpointRangeDescription {
  return {
    startPort: item["startPort"],
    endPort: item["endPort"],
  };
}

/** The provisioning state of the cluster resource. */
export enum KnownProvisioningState {
  /** Cluster is updating. */
  Updating = "Updating",
  /** Cluster provisioning succeeded. */
  Succeeded = "Succeeded",
  /** Cluster provisioning failed. */
  Failed = "Failed",
  /** Cluster provisioning was canceled. */
  Canceled = "Canceled",
}

/**
 * The provisioning state of the cluster resource. \
 * {@link KnownProvisioningState} can be used interchangeably with ProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: Cluster is updating. \
 * **Succeeded**: Cluster provisioning succeeded. \
 * **Failed**: Cluster provisioning failed. \
 * **Canceled**: Cluster provisioning was canceled.
 */
export type ProvisioningState = string;

/** The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity). */
export enum KnownReliabilityLevel {
  /** Run the System services with a target replica set count of 1. This should only be used for test clusters. */
  None = "None",
  /** Run the System services with a target replica set count of 3. This should only be used for test clusters. */
  Bronze = "Bronze",
  /** Run the System services with a target replica set count of 5. */
  Silver = "Silver",
  /** Run the System services with a target replica set count of 7. */
  Gold = "Gold",
  /** Run the System services with a target replica set count of 9. */
  Platinum = "Platinum",
}

/**
 * The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity). \
 * {@link KnownReliabilityLevel} can be used interchangeably with ReliabilityLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: Run the System services with a target replica set count of 1. This should only be used for test clusters. \
 * **Bronze**: Run the System services with a target replica set count of 3. This should only be used for test clusters. \
 * **Silver**: Run the System services with a target replica set count of 5. \
 * **Gold**: Run the System services with a target replica set count of 7. \
 * **Platinum**: Run the System services with a target replica set count of 9.
 */
export type ReliabilityLevel = string;

/** Describes the policy used when upgrading the cluster. */
export interface ClusterUpgradePolicy {
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  forceRestart?: boolean;
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  upgradeReplicaSetCheckTimeout: string;
  /** The length of time to wait after completing an upgrade domain before performing health checks. The duration can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  healthCheckWaitDuration: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. The duration can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  healthCheckStableDuration: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before the upgrade rolls back. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  healthCheckRetryTimeout: string;
  /** The amount of time the overall upgrade has to complete before the upgrade rolls back. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  upgradeTimeout: string;
  /** The amount of time each upgrade domain has to complete before the upgrade rolls back. The timeout can be in either hh:mm:ss or in d.hh:mm:ss.ms format. */
  upgradeDomainTimeout: string;
  /** The cluster health policy used when upgrading the cluster. */
  healthPolicy: ClusterHealthPolicy;
  /** The cluster delta health policy used when upgrading the cluster. */
  deltaHealthPolicy?: ClusterUpgradeDeltaHealthPolicy;
}

export function clusterUpgradePolicySerializer(item: ClusterUpgradePolicy): any {
  return {
    forceRestart: item["forceRestart"],
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
    healthPolicy: clusterHealthPolicySerializer(item["healthPolicy"]),
    deltaHealthPolicy: !item["deltaHealthPolicy"]
      ? item["deltaHealthPolicy"]
      : clusterUpgradeDeltaHealthPolicySerializer(item["deltaHealthPolicy"]),
  };
}

export function clusterUpgradePolicyDeserializer(item: any): ClusterUpgradePolicy {
  return {
    forceRestart: item["forceRestart"],
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
    healthPolicy: clusterHealthPolicyDeserializer(item["healthPolicy"]),
    deltaHealthPolicy: !item["deltaHealthPolicy"]
      ? item["deltaHealthPolicy"]
      : clusterUpgradeDeltaHealthPolicyDeserializer(item["deltaHealthPolicy"]),
  };
}

/** Defines a health policy used to evaluate the health of the cluster or of a cluster node. */
export interface ClusterHealthPolicy {
  /**
   * The maximum allowed percentage of unhealthy nodes before reporting an error. For example, to allow 10% of nodes to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of nodes that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy node, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy nodes over the total number of nodes in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   *
   * In large clusters, some nodes will always be down or out for repairs, so this percentage should be configured to tolerate that.
   */
  maxPercentUnhealthyNodes?: number;
  /**
   * The maximum allowed percentage of unhealthy applications before reporting an error. For example, to allow 10% of applications to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of applications that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy application, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy applications over the total number of application instances in the cluster, excluding applications of application types that are included in the ApplicationTypeHealthPolicyMap.
   * The computation rounds up to tolerate one failure on small numbers of applications. Default percentage is zero.
   */
  maxPercentUnhealthyApplications?: number;
  /** Defines the application health policy map used to evaluate the health of an application or one of its children entities. */
  applicationHealthPolicies?: Record<string, ApplicationHealthPolicy>;
}

export function clusterHealthPolicySerializer(item: ClusterHealthPolicy): any {
  return {
    maxPercentUnhealthyNodes: item["maxPercentUnhealthyNodes"],
    maxPercentUnhealthyApplications: item["maxPercentUnhealthyApplications"],
    applicationHealthPolicies: !item["applicationHealthPolicies"]
      ? item["applicationHealthPolicies"]
      : applicationHealthPolicyRecordSerializer(item["applicationHealthPolicies"]),
  };
}

export function clusterHealthPolicyDeserializer(item: any): ClusterHealthPolicy {
  return {
    maxPercentUnhealthyNodes: item["maxPercentUnhealthyNodes"],
    maxPercentUnhealthyApplications: item["maxPercentUnhealthyApplications"],
    applicationHealthPolicies: !item["applicationHealthPolicies"]
      ? item["applicationHealthPolicies"]
      : applicationHealthPolicyRecordDeserializer(item["applicationHealthPolicies"]),
  };
}

export function applicationHealthPolicyRecordSerializer(
  item: Record<string, ApplicationHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : applicationHealthPolicySerializer(item[key]);
  });
  return result;
}

export function applicationHealthPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, ApplicationHealthPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : applicationHealthPolicyDeserializer(item[key]);
  });
  return result;
}

/** Defines a health policy used to evaluate the health of an application or one of its children entities. */
export interface ApplicationHealthPolicy {
  /** The health policy used by default to evaluate the health of a service type. */
  defaultServiceTypeHealthPolicy?: ServiceTypeHealthPolicy;
  /** The map with service type health policy per service type name. The map is empty by default. */
  serviceTypeHealthPolicies?: Record<string, ServiceTypeHealthPolicy>;
}

export function applicationHealthPolicySerializer(item: ApplicationHealthPolicy): any {
  return {
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : serviceTypeHealthPolicySerializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicies: !item["serviceTypeHealthPolicies"]
      ? item["serviceTypeHealthPolicies"]
      : serviceTypeHealthPolicyRecordSerializer(item["serviceTypeHealthPolicies"]),
  };
}

export function applicationHealthPolicyDeserializer(item: any): ApplicationHealthPolicy {
  return {
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : serviceTypeHealthPolicyDeserializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicies: !item["serviceTypeHealthPolicies"]
      ? item["serviceTypeHealthPolicies"]
      : serviceTypeHealthPolicyRecordDeserializer(item["serviceTypeHealthPolicies"]),
  };
}

/** Represents the health policy used to evaluate the health of services belonging to a service type. */
export interface ServiceTypeHealthPolicy {
  /** The maximum percentage of services allowed to be unhealthy before your application is considered in error. */
  maxPercentUnhealthyServices?: number;
}

export function serviceTypeHealthPolicySerializer(item: ServiceTypeHealthPolicy): any {
  return { maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"] };
}

export function serviceTypeHealthPolicyDeserializer(item: any): ServiceTypeHealthPolicy {
  return {
    maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"],
  };
}

export function serviceTypeHealthPolicyRecordSerializer(
  item: Record<string, ServiceTypeHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : serviceTypeHealthPolicySerializer(item[key]);
  });
  return result;
}

export function serviceTypeHealthPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, ServiceTypeHealthPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : serviceTypeHealthPolicyDeserializer(item[key]);
  });
  return result;
}

/** Describes the delta health policies for the cluster upgrade. */
export interface ClusterUpgradeDeltaHealthPolicy {
  /**
   * The maximum allowed percentage of nodes health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the nodes at the beginning of upgrade and the state of the nodes at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits.
   */
  maxPercentDeltaUnhealthyNodes: number;
  /**
   * The maximum allowed percentage of upgrade domain nodes health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the upgrade domain nodes at the beginning of upgrade and the state of the upgrade domain nodes at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion for all completed upgrade domains to make sure the state of the upgrade domains is within tolerated limits.
   */
  maxPercentUpgradeDomainDeltaUnhealthyNodes: number;
  /**
   * The maximum allowed percentage of applications health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the applications at the beginning of upgrade and the state of the applications at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits. System services are not included in this.
   */
  maxPercentDeltaUnhealthyApplications: number;
  /** Defines the application delta health policy map used to evaluate the health of an application or one of its child entities when upgrading the cluster. */
  applicationDeltaHealthPolicies?: Record<string, ApplicationDeltaHealthPolicy>;
}

export function clusterUpgradeDeltaHealthPolicySerializer(
  item: ClusterUpgradeDeltaHealthPolicy,
): any {
  return {
    maxPercentDeltaUnhealthyNodes: item["maxPercentDeltaUnhealthyNodes"],
    maxPercentUpgradeDomainDeltaUnhealthyNodes: item["maxPercentUpgradeDomainDeltaUnhealthyNodes"],
    maxPercentDeltaUnhealthyApplications: item["maxPercentDeltaUnhealthyApplications"],
    applicationDeltaHealthPolicies: !item["applicationDeltaHealthPolicies"]
      ? item["applicationDeltaHealthPolicies"]
      : applicationDeltaHealthPolicyRecordSerializer(item["applicationDeltaHealthPolicies"]),
  };
}

export function clusterUpgradeDeltaHealthPolicyDeserializer(
  item: any,
): ClusterUpgradeDeltaHealthPolicy {
  return {
    maxPercentDeltaUnhealthyNodes: item["maxPercentDeltaUnhealthyNodes"],
    maxPercentUpgradeDomainDeltaUnhealthyNodes: item["maxPercentUpgradeDomainDeltaUnhealthyNodes"],
    maxPercentDeltaUnhealthyApplications: item["maxPercentDeltaUnhealthyApplications"],
    applicationDeltaHealthPolicies: !item["applicationDeltaHealthPolicies"]
      ? item["applicationDeltaHealthPolicies"]
      : applicationDeltaHealthPolicyRecordDeserializer(item["applicationDeltaHealthPolicies"]),
  };
}

export function applicationDeltaHealthPolicyRecordSerializer(
  item: Record<string, ApplicationDeltaHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : applicationDeltaHealthPolicySerializer(item[key]);
  });
  return result;
}

export function applicationDeltaHealthPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, ApplicationDeltaHealthPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : applicationDeltaHealthPolicyDeserializer(item[key]);
  });
  return result;
}

/** Defines a delta health policy used to evaluate the health of an application or one of its child entities when upgrading the cluster. */
export interface ApplicationDeltaHealthPolicy {
  /** The delta health policy used by default to evaluate the health of a service type when upgrading the cluster. */
  defaultServiceTypeDeltaHealthPolicy?: ServiceTypeDeltaHealthPolicy;
  /** The map with service type delta health policy per service type name. The map is empty by default. */
  serviceTypeDeltaHealthPolicies?: Record<string, ServiceTypeDeltaHealthPolicy>;
}

export function applicationDeltaHealthPolicySerializer(item: ApplicationDeltaHealthPolicy): any {
  return {
    defaultServiceTypeDeltaHealthPolicy: !item["defaultServiceTypeDeltaHealthPolicy"]
      ? item["defaultServiceTypeDeltaHealthPolicy"]
      : serviceTypeDeltaHealthPolicySerializer(item["defaultServiceTypeDeltaHealthPolicy"]),
    serviceTypeDeltaHealthPolicies: !item["serviceTypeDeltaHealthPolicies"]
      ? item["serviceTypeDeltaHealthPolicies"]
      : serviceTypeDeltaHealthPolicyRecordSerializer(item["serviceTypeDeltaHealthPolicies"]),
  };
}

export function applicationDeltaHealthPolicyDeserializer(item: any): ApplicationDeltaHealthPolicy {
  return {
    defaultServiceTypeDeltaHealthPolicy: !item["defaultServiceTypeDeltaHealthPolicy"]
      ? item["defaultServiceTypeDeltaHealthPolicy"]
      : serviceTypeDeltaHealthPolicyDeserializer(item["defaultServiceTypeDeltaHealthPolicy"]),
    serviceTypeDeltaHealthPolicies: !item["serviceTypeDeltaHealthPolicies"]
      ? item["serviceTypeDeltaHealthPolicies"]
      : serviceTypeDeltaHealthPolicyRecordDeserializer(item["serviceTypeDeltaHealthPolicies"]),
  };
}

/** Represents the delta health policy used to evaluate the health of services belonging to a service type when upgrading the cluster. */
export interface ServiceTypeDeltaHealthPolicy {
  /**
   * The maximum allowed percentage of services health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the services at the beginning of upgrade and the state of the services at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits.
   */
  maxPercentDeltaUnhealthyServices?: number;
}

export function serviceTypeDeltaHealthPolicySerializer(item: ServiceTypeDeltaHealthPolicy): any {
  return { maxPercentDeltaUnhealthyServices: item["maxPercentDeltaUnhealthyServices"] };
}

export function serviceTypeDeltaHealthPolicyDeserializer(item: any): ServiceTypeDeltaHealthPolicy {
  return {
    maxPercentDeltaUnhealthyServices: item["maxPercentDeltaUnhealthyServices"],
  };
}

export function serviceTypeDeltaHealthPolicyRecordSerializer(
  item: Record<string, ServiceTypeDeltaHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : serviceTypeDeltaHealthPolicySerializer(item[key]);
  });
  return result;
}

export function serviceTypeDeltaHealthPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, ServiceTypeDeltaHealthPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : serviceTypeDeltaHealthPolicyDeserializer(item[key]);
  });
  return result;
}

/** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
export enum KnownUpgradeMode {
  /** The cluster will be automatically upgraded to the latest Service Fabric runtime version, **upgradeWave** will determine when the upgrade starts after the new version becomes available. */
  Automatic = "Automatic",
  /** The cluster will not be automatically upgraded to the latest Service Fabric runtime version. The cluster is upgraded by setting the **clusterCodeVersion** property in the cluster resource. */
  Manual = "Manual",
}

/**
 * The upgrade mode of the cluster when new Service Fabric runtime version is available. \
 * {@link KnownUpgradeMode} can be used interchangeably with UpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Automatic**: The cluster will be automatically upgraded to the latest Service Fabric runtime version, **upgradeWave** will determine when the upgrade starts after the new version becomes available. \
 * **Manual**: The cluster will not be automatically upgraded to the latest Service Fabric runtime version. The cluster is upgraded by setting the **clusterCodeVersion** property in the cluster resource.
 */
export type UpgradeMode = string;

/** The policy used to clean up unused versions. */
export interface ApplicationTypeVersionsCleanupPolicy {
  /** Number of unused versions per application type to keep. */
  maxUnusedVersionsToKeep: number;
}

export function applicationTypeVersionsCleanupPolicySerializer(
  item: ApplicationTypeVersionsCleanupPolicy,
): any {
  return { maxUnusedVersionsToKeep: item["maxUnusedVersionsToKeep"] };
}

export function applicationTypeVersionsCleanupPolicyDeserializer(
  item: any,
): ApplicationTypeVersionsCleanupPolicy {
  return {
    maxUnusedVersionsToKeep: item["maxUnusedVersionsToKeep"],
  };
}

/** This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. */
export enum KnownSfZonalUpgradeMode {
  /** VMs under the node type are grouped into UDs and ignore the zone info in five UDs. This setting causes UDs across all zones to be upgraded at the same time. This deployment mode is faster for upgrades, we don't recommend it because it goes against the SDP guidelines, which state that the updates should be applied to one zone at a time. */
  Parallel = "Parallel",
  /** If this value is omitted or set to Hierarchical, VMs are grouped to reflect the zonal distribution in up to 15 UDs. Each of the three zones has five UDs. This ensures that the zones are updated one at a time, moving to next zone only after completing five UDs within the first zone. This update process is safer for the cluster and the user application. */
  Hierarchical = "Hierarchical",
}

/**
 * This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. \
 * {@link KnownSfZonalUpgradeMode} can be used interchangeably with SfZonalUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Parallel**: VMs under the node type are grouped into UDs and ignore the zone info in five UDs. This setting causes UDs across all zones to be upgraded at the same time. This deployment mode is faster for upgrades, we don't recommend it because it goes against the SDP guidelines, which state that the updates should be applied to one zone at a time. \
 * **Hierarchical**: If this value is omitted or set to Hierarchical, VMs are grouped to reflect the zonal distribution in up to 15 UDs. Each of the three zones has five UDs. This ensures that the zones are updated one at a time, moving to next zone only after completing five UDs within the first zone. This update process is safer for the cluster and the user application.
 */
export type SfZonalUpgradeMode = string;

/** This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. */
export enum KnownVmssZonalUpgradeMode {
  /** Updates will happen in all Availability Zones at once for the virtual machine scale sets. */
  Parallel = "Parallel",
  /** VMs are grouped to reflect the zonal distribution in up to 15 UDs. Each of the three zones has five UDs. This ensures that the zones are updated one at a time, moving to next zone only after completing five UDs within the first zone. */
  Hierarchical = "Hierarchical",
}

/**
 * This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. \
 * {@link KnownVmssZonalUpgradeMode} can be used interchangeably with VmssZonalUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Parallel**: Updates will happen in all Availability Zones at once for the virtual machine scale sets. \
 * **Hierarchical**: VMs are grouped to reflect the zonal distribution in up to 15 UDs. Each of the three zones has five UDs. This ensures that the zones are updated one at a time, moving to next zone only after completing five UDs within the first zone.
 */
export type VmssZonalUpgradeMode = string;

/** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. */
export enum KnownClusterUpgradeCadence {
  /** Cluster upgrade starts immediately after a new version is rolled out. Recommended for Test/Dev clusters. */
  Wave0 = "Wave0",
  /** Cluster upgrade starts 7 days after a new version is rolled out. Recommended for Pre-prod clusters. */
  Wave1 = "Wave1",
  /** Cluster upgrade starts 14 days after a new version is rolled out. Recommended for Production clusters. */
  Wave2 = "Wave2",
}

/**
 * Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. \
 * {@link KnownClusterUpgradeCadence} can be used interchangeably with ClusterUpgradeCadence,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Wave0**: Cluster upgrade starts immediately after a new version is rolled out. Recommended for Test\/Dev clusters. \
 * **Wave1**: Cluster upgrade starts 7 days after a new version is rolled out. Recommended for Pre-prod clusters. \
 * **Wave2**: Cluster upgrade starts 14 days after a new version is rolled out. Recommended for Production clusters.
 */
export type ClusterUpgradeCadence = string;

export function notificationArraySerializer(result: Array<Notification>): any[] {
  return result.map((item) => {
    return notificationSerializer(item);
  });
}

export function notificationArrayDeserializer(result: Array<Notification>): any[] {
  return result.map((item) => {
    return notificationDeserializer(item);
  });
}

/** Describes the notification channel for cluster events. */
export interface Notification {
  /** Indicates if the notification is enabled. */
  isEnabled: boolean;
  /** The category of notification. */
  notificationCategory: NotificationCategory;
  /** The level of notification. */
  notificationLevel: NotificationLevel;
  /** List of targets that subscribe to the notification. */
  notificationTargets: NotificationTarget[];
}

export function notificationSerializer(item: Notification): any {
  return {
    isEnabled: item["isEnabled"],
    notificationCategory: item["notificationCategory"],
    notificationLevel: item["notificationLevel"],
    notificationTargets: notificationTargetArraySerializer(item["notificationTargets"]),
  };
}

export function notificationDeserializer(item: any): Notification {
  return {
    isEnabled: item["isEnabled"],
    notificationCategory: item["notificationCategory"],
    notificationLevel: item["notificationLevel"],
    notificationTargets: notificationTargetArrayDeserializer(item["notificationTargets"]),
  };
}

/** The category of notification. */
export enum KnownNotificationCategory {
  /** Notification will be regarding wave progress. */
  WaveProgress = "WaveProgress",
}

/**
 * The category of notification. \
 * {@link KnownNotificationCategory} can be used interchangeably with NotificationCategory,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WaveProgress**: Notification will be regarding wave progress.
 */
export type NotificationCategory = string;

/** The level of notification. */
export enum KnownNotificationLevel {
  /** Receive only critical notifications. */
  Critical = "Critical",
  /** Receive all notifications. */
  All = "All",
}

/**
 * The level of notification. \
 * {@link KnownNotificationLevel} can be used interchangeably with NotificationLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Critical**: Receive only critical notifications. \
 * **All**: Receive all notifications.
 */
export type NotificationLevel = string;

export function notificationTargetArraySerializer(result: Array<NotificationTarget>): any[] {
  return result.map((item) => {
    return notificationTargetSerializer(item);
  });
}

export function notificationTargetArrayDeserializer(result: Array<NotificationTarget>): any[] {
  return result.map((item) => {
    return notificationTargetDeserializer(item);
  });
}

/** Describes the notification target properties. */
export interface NotificationTarget {
  /** The notification channel indicates the type of receivers subscribed to the notification, either user or subscription. */
  notificationChannel: NotificationChannel;
  /** List of targets that subscribe to the notification. */
  receivers: string[];
}

export function notificationTargetSerializer(item: NotificationTarget): any {
  return {
    notificationChannel: item["notificationChannel"],
    receivers: item["receivers"].map((p: any) => {
      return p;
    }),
  };
}

export function notificationTargetDeserializer(item: any): NotificationTarget {
  return {
    notificationChannel: item["notificationChannel"],
    receivers: item["receivers"].map((p: any) => {
      return p;
    }),
  };
}

/** The notification channel indicates the type of receivers subscribed to the notification, either user or subscription. */
export enum KnownNotificationChannel {
  /** For email user receivers. In this case, the parameter receivers should be a list of email addresses that will receive the notifications. */
  EmailUser = "EmailUser",
  /** For subscription receivers. In this case, the parameter receivers should be a list of roles of the subscription for the cluster (eg. Owner, AccountAdmin, etc) that will receive the notifications. */
  EmailSubscription = "EmailSubscription",
}

/**
 * The notification channel indicates the type of receivers subscribed to the notification, either user or subscription. \
 * {@link KnownNotificationChannel} can be used interchangeably with NotificationChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EmailUser**: For email user receivers. In this case, the parameter receivers should be a list of email addresses that will receive the notifications. \
 * **EmailSubscription**: For subscription receivers. In this case, the parameter receivers should be a list of roles of the subscription for the cluster (eg. Owner, AccountAdmin, etc) that will receive the notifications.
 */
export type NotificationChannel = string;

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

export function systemDataSerializer(item: SystemData): any {
  return {
    createdBy: item["createdBy"],
    createdByType: item["createdByType"],
    createdAt: !item["createdAt"] ? item["createdAt"] : item["createdAt"].toISOString(),
    lastModifiedBy: item["lastModifiedBy"],
    lastModifiedByType: item["lastModifiedByType"],
    lastModifiedAt: !item["lastModifiedAt"]
      ? item["lastModifiedAt"]
      : item["lastModifiedAt"].toISOString(),
  };
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

/** Cluster update request */
export interface ClusterUpdateParameters {
  /** Cluster update parameters */
  tags?: Record<string, string>;
  /** The list of add-on features to enable in the cluster. */
  addOnFeatures?: AddOnFeatures[];
  /** The certificate to use for securing the cluster. The certificate provided will be used for  node to node security within the cluster, SSL certificate for cluster management endpoint and default  admin client. */
  certificate?: CertificateDescription;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  certificateCommonNames?: ServerCertificateCommonNames;
  /** The list of client certificates referenced by common name that are allowed to manage the cluster. This will overwrite the existing list. */
  clientCertificateCommonNames?: ClientCertificateCommonName[];
  /** The list of client certificates referenced by thumbprint that are allowed to manage the cluster. This will overwrite the existing list. */
  clientCertificateThumbprints?: ClientCertificateThumbprint[];
  /** The Service Fabric runtime version of the cluster. This property can only by set the user when **upgradeMode** is set to 'Manual'. To get list of available Service Fabric versions for new clusters use [ClusterVersion API](https://learn.microsoft.com/rest/api/servicefabric/cluster-versions/list). To get the list of available version for existing clusters use **availableClusterVersions**. */
  clusterCodeVersion?: string;
  /** Indicates if the event store service is enabled. */
  eventStoreServiceEnabled?: boolean;
  /** The list of custom fabric settings to configure the cluster. This will overwrite the existing list. */
  fabricSettings?: SettingsSectionDescription[];
  /** The list of node types in the cluster. This will overwrite the existing list. */
  nodeTypes?: NodeTypeDescription[];
  /**
   * The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity).
   *
   * - None - Run the System services with a target replica set count of 1. This should only be used for test clusters.
   * - Bronze - Run the System services with a target replica set count of 3. This should only be used for test clusters.
   * - Silver - Run the System services with a target replica set count of 5.
   * - Gold - Run the System services with a target replica set count of 7.
   * - Platinum - Run the System services with a target replica set count of 9.
   */
  reliabilityLevel?: ReliabilityLevel;
  /** The server certificate used by reverse proxy. */
  reverseProxyCertificate?: CertificateDescription;
  /** The policy to use when upgrading the cluster. */
  upgradeDescription?: ClusterUpgradePolicy;
  /** The policy used to clean up unused versions. */
  applicationTypeVersionsCleanupPolicy?: ApplicationTypeVersionsCleanupPolicy;
  /** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
  upgradeMode?: UpgradeMode;
  /** This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. */
  sfZonalUpgradeMode?: SfZonalUpgradeMode;
  /** This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. */
  vmssZonalUpgradeMode?: VmssZonalUpgradeMode;
  /** Indicates if infrastructure service manager is enabled. */
  infrastructureServiceManager?: boolean;
  /** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. Only applies when **upgradeMode** is set to 'Automatic'. */
  upgradeWave?: ClusterUpgradeCadence;
  /** The start timestamp to pause runtime version upgrades on the cluster (UTC). */
  upgradePauseStartTimestampUtc?: Date;
  /** The end timestamp of pause runtime version upgrades on the cluster (UTC). */
  upgradePauseEndTimestampUtc?: Date;
  /** Boolean to pause automatic runtime version upgrades to the cluster. */
  waveUpgradePaused?: boolean;
  /** Indicates a list of notification channels for cluster events. */
  notifications?: Notification[];
  /** If true, token-based authentication is not allowed on the HttpGatewayEndpoint. This is required to support TLS versions 1.3 and above. If token-based authentication is used, HttpGatewayTokenAuthEndpointPort must be defined. */
  enableHttpGatewayExclusiveAuthMode?: boolean;
}

export function clusterUpdateParametersSerializer(item: ClusterUpdateParameters): any {
  return {
    properties: areAllPropsUndefined(item, [
      "addOnFeatures",
      "certificate",
      "certificateCommonNames",
      "clientCertificateCommonNames",
      "clientCertificateThumbprints",
      "clusterCodeVersion",
      "eventStoreServiceEnabled",
      "fabricSettings",
      "nodeTypes",
      "reliabilityLevel",
      "reverseProxyCertificate",
      "upgradeDescription",
      "applicationTypeVersionsCleanupPolicy",
      "upgradeMode",
      "sfZonalUpgradeMode",
      "vmssZonalUpgradeMode",
      "infrastructureServiceManager",
      "upgradeWave",
      "upgradePauseStartTimestampUtc",
      "upgradePauseEndTimestampUtc",
      "waveUpgradePaused",
      "notifications",
      "enableHttpGatewayExclusiveAuthMode",
    ])
      ? undefined
      : _clusterUpdateParametersPropertiesSerializer(item),
    tags: item["tags"],
  };
}

/** Describes the cluster resource properties that can be updated during PATCH operation. */
export interface ClusterPropertiesUpdateParameters {
  /** The list of add-on features to enable in the cluster. */
  addOnFeatures?: AddOnFeatures[];
  /** The certificate to use for securing the cluster. The certificate provided will be used for  node to node security within the cluster, SSL certificate for cluster management endpoint and default  admin client. */
  certificate?: CertificateDescription;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  certificateCommonNames?: ServerCertificateCommonNames;
  /** The list of client certificates referenced by common name that are allowed to manage the cluster. This will overwrite the existing list. */
  clientCertificateCommonNames?: ClientCertificateCommonName[];
  /** The list of client certificates referenced by thumbprint that are allowed to manage the cluster. This will overwrite the existing list. */
  clientCertificateThumbprints?: ClientCertificateThumbprint[];
  /** The Service Fabric runtime version of the cluster. This property can only by set the user when **upgradeMode** is set to 'Manual'. To get list of available Service Fabric versions for new clusters use [ClusterVersion API](https://learn.microsoft.com/rest/api/servicefabric/cluster-versions/list). To get the list of available version for existing clusters use **availableClusterVersions**. */
  clusterCodeVersion?: string;
  /** Indicates if the event store service is enabled. */
  eventStoreServiceEnabled?: boolean;
  /** The list of custom fabric settings to configure the cluster. This will overwrite the existing list. */
  fabricSettings?: SettingsSectionDescription[];
  /** The list of node types in the cluster. This will overwrite the existing list. */
  nodeTypes?: NodeTypeDescription[];
  /**
   * The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity).
   *
   * - None - Run the System services with a target replica set count of 1. This should only be used for test clusters.
   * - Bronze - Run the System services with a target replica set count of 3. This should only be used for test clusters.
   * - Silver - Run the System services with a target replica set count of 5.
   * - Gold - Run the System services with a target replica set count of 7.
   * - Platinum - Run the System services with a target replica set count of 9.
   */
  reliabilityLevel?: ReliabilityLevel;
  /** The server certificate used by reverse proxy. */
  reverseProxyCertificate?: CertificateDescription;
  /** The policy to use when upgrading the cluster. */
  upgradeDescription?: ClusterUpgradePolicy;
  /** The policy used to clean up unused versions. */
  applicationTypeVersionsCleanupPolicy?: ApplicationTypeVersionsCleanupPolicy;
  /** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
  upgradeMode?: UpgradeMode;
  /** This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. */
  sfZonalUpgradeMode?: SfZonalUpgradeMode;
  /** This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. */
  vmssZonalUpgradeMode?: VmssZonalUpgradeMode;
  /** Indicates if infrastructure service manager is enabled. */
  infrastructureServiceManager?: boolean;
  /** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. Only applies when **upgradeMode** is set to 'Automatic'. */
  upgradeWave?: ClusterUpgradeCadence;
  /** The start timestamp to pause runtime version upgrades on the cluster (UTC). */
  upgradePauseStartTimestampUtc?: Date;
  /** The end timestamp of pause runtime version upgrades on the cluster (UTC). */
  upgradePauseEndTimestampUtc?: Date;
  /** Boolean to pause automatic runtime version upgrades to the cluster. */
  waveUpgradePaused?: boolean;
  /** Indicates a list of notification channels for cluster events. */
  notifications?: Notification[];
  /** If true, token-based authentication is not allowed on the HttpGatewayEndpoint. This is required to support TLS versions 1.3 and above. If token-based authentication is used, HttpGatewayTokenAuthEndpointPort must be defined. */
  enableHttpGatewayExclusiveAuthMode?: boolean;
}

export function clusterPropertiesUpdateParametersSerializer(
  item: ClusterPropertiesUpdateParameters,
): any {
  return {
    addOnFeatures: !item["addOnFeatures"]
      ? item["addOnFeatures"]
      : item["addOnFeatures"].map((p: any) => {
          return p;
        }),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateDescriptionSerializer(item["certificate"]),
    certificateCommonNames: !item["certificateCommonNames"]
      ? item["certificateCommonNames"]
      : serverCertificateCommonNamesSerializer(item["certificateCommonNames"]),
    clientCertificateCommonNames: !item["clientCertificateCommonNames"]
      ? item["clientCertificateCommonNames"]
      : clientCertificateCommonNameArraySerializer(item["clientCertificateCommonNames"]),
    clientCertificateThumbprints: !item["clientCertificateThumbprints"]
      ? item["clientCertificateThumbprints"]
      : clientCertificateThumbprintArraySerializer(item["clientCertificateThumbprints"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    eventStoreServiceEnabled: item["eventStoreServiceEnabled"],
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArraySerializer(item["fabricSettings"]),
    nodeTypes: !item["nodeTypes"]
      ? item["nodeTypes"]
      : nodeTypeDescriptionArraySerializer(item["nodeTypes"]),
    reliabilityLevel: item["reliabilityLevel"],
    reverseProxyCertificate: !item["reverseProxyCertificate"]
      ? item["reverseProxyCertificate"]
      : certificateDescriptionSerializer(item["reverseProxyCertificate"]),
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicySerializer(item["upgradeDescription"]),
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicySerializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    upgradeMode: item["upgradeMode"],
    sfZonalUpgradeMode: item["sfZonalUpgradeMode"],
    vmssZonalUpgradeMode: item["vmssZonalUpgradeMode"],
    infrastructureServiceManager: item["infrastructureServiceManager"],
    upgradeWave: item["upgradeWave"],
    upgradePauseStartTimestampUtc: !item["upgradePauseStartTimestampUtc"]
      ? item["upgradePauseStartTimestampUtc"]
      : item["upgradePauseStartTimestampUtc"].toISOString(),
    upgradePauseEndTimestampUtc: !item["upgradePauseEndTimestampUtc"]
      ? item["upgradePauseEndTimestampUtc"]
      : item["upgradePauseEndTimestampUtc"].toISOString(),
    waveUpgradePaused: item["waveUpgradePaused"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
  };
}

/** The response of a Cluster list operation. */
export interface _ClusterListResult {
  /** The Cluster items on this page */
  value: Cluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _clusterListResultDeserializer(item: any): _ClusterListResult {
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

/** The upgrade path description with target version. */
export interface UpgradableVersionsDescription {
  /** The target code version. */
  targetVersion: string;
}

export function upgradableVersionsDescriptionSerializer(item: UpgradableVersionsDescription): any {
  return { targetVersion: item["targetVersion"] };
}

/** The list of intermediate cluster code versions for an upgrade or downgrade, or minimum and maximum upgradable version if no target was given. */
export interface UpgradableVersionPathResult {
  /** The list of intermediate cluster code versions for an upgrade or downgrade. */
  supportedPath?: string[];
}

export function upgradableVersionPathResultDeserializer(item: any): UpgradableVersionPathResult {
  return {
    supportedPath: !item["supportedPath"]
      ? item["supportedPath"]
      : item["supportedPath"].map((p: any) => {
          return p;
        }),
  };
}

/** Describes a VM Sizes. */
export interface VMSizeResource extends ArmProxyResource {
  /** VM Size properties. */
  readonly properties?: VMSize;
}

export function vmSizeResourceDeserializer(item: any): VMSizeResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"] ? item["properties"] : vmSizeDeserializer(item["properties"]),
  };
}

/** VM Sizes properties. */
export interface VMSize {
  /** VM Size name. */
  readonly size?: string;
}

export function vmSizeDeserializer(item: any): VMSize {
  return {
    size: item["size"],
  };
}

/** The resource model definition for a Azure Resource Manager proxy resource. It will not have tags and a location */
export interface ArmProxyResource extends Resource {}

export function armProxyResourceDeserializer(item: any): ArmProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** Describes the result of the request to list VM Sizes for Service Fabric Clusters. */
export interface _VMSizesResult {
  /** The VMSizeResource items on this page */
  value: VMSizeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _vmSizesResultDeserializer(item: any): _VMSizesResult {
  return {
    value: vmSizeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function vmSizeResourceArrayDeserializer(result: Array<VMSizeResource>): any[] {
  return result.map((item) => {
    return vmSizeResourceDeserializer(item);
  });
}

/** The application type name resource */
export interface ApplicationTypeResource extends ProxyResource {
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
}

export function applicationTypeResourceSerializer(item: ApplicationTypeResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
    properties: areAllPropsUndefined(item, [])
      ? undefined
      : _applicationTypeResourcePropertiesSerializer(item),
  };
}

export function applicationTypeResourceDeserializer(item: any): ApplicationTypeResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationTypeResourcePropertiesDeserializer(item["properties"])),
  };
}

/** The application type name properties */
export interface ApplicationTypeResourceProperties {
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
}

export function applicationTypeResourcePropertiesSerializer(
  item: ApplicationTypeResourceProperties,
): any {
  return item;
}

export function applicationTypeResourcePropertiesDeserializer(
  item: any,
): ApplicationTypeResourceProperties {
  return {
    provisioningState: item["provisioningState"],
  };
}

/** The resource model definition for proxy-only resource. */
export interface ProxyResource {
  /** Azure resource identifier. */
  readonly id?: string;
  /** Azure resource name. */
  readonly name?: string;
  /** Azure resource type. */
  readonly type?: string;
  /** It will be deprecated in New API, resource location depends on the parent resource. */
  location?: string;
  /** Azure resource tags. */
  tags?: Record<string, string>;
  /** Azure resource etag. */
  readonly etag?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  systemData?: SystemData;
}

export function proxyResourceSerializer(item: ProxyResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
  };
}

export function proxyResourceDeserializer(item: any): ProxyResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
  };
}

/** The list of application type names. */
export interface _ApplicationTypeResourceList {
  /** The ApplicationTypeResource items on this page */
  value: ApplicationTypeResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationTypeResourceListDeserializer(item: any): _ApplicationTypeResourceList {
  return {
    value: applicationTypeResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationTypeResourceArraySerializer(
  result: Array<ApplicationTypeResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeResourceSerializer(item);
  });
}

export function applicationTypeResourceArrayDeserializer(
  result: Array<ApplicationTypeResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeResourceDeserializer(item);
  });
}

/** An application type version resource for the specified application type name resource. */
export interface ApplicationTypeVersionResource extends ProxyResource {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The URL to the application package */
  appPackageUrl?: string;
  /** List of application type parameters that can be overridden when creating or updating the application. */
  readonly defaultParameterList?: Record<string, string>;
}

export function applicationTypeVersionResourceSerializer(
  item: ApplicationTypeVersionResource,
): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
    properties: areAllPropsUndefined(item, ["appPackageUrl"])
      ? undefined
      : _applicationTypeVersionResourcePropertiesSerializer(item),
  };
}

export function applicationTypeVersionResourceDeserializer(
  item: any,
): ApplicationTypeVersionResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationTypeVersionResourcePropertiesDeserializer(item["properties"])),
  };
}

/** The properties of the application type version resource. */
export interface ApplicationTypeVersionResourceProperties {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The URL to the application package */
  appPackageUrl: string;
  /** List of application type parameters that can be overridden when creating or updating the application. */
  readonly defaultParameterList?: Record<string, string>;
}

export function applicationTypeVersionResourcePropertiesSerializer(
  item: ApplicationTypeVersionResourceProperties,
): any {
  return { appPackageUrl: item["appPackageUrl"] };
}

export function applicationTypeVersionResourcePropertiesDeserializer(
  item: any,
): ApplicationTypeVersionResourceProperties {
  return {
    provisioningState: item["provisioningState"],
    appPackageUrl: item["appPackageUrl"],
    defaultParameterList: !item["defaultParameterList"]
      ? item["defaultParameterList"]
      : Object.fromEntries(
          Object.entries(item["defaultParameterList"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

/** The list of application type version resources for the specified application type name resource. */
export interface _ApplicationTypeVersionResourceList {
  /** The ApplicationTypeVersionResource items on this page */
  value: ApplicationTypeVersionResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationTypeVersionResourceListDeserializer(
  item: any,
): _ApplicationTypeVersionResourceList {
  return {
    value: applicationTypeVersionResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationTypeVersionResourceArraySerializer(
  result: Array<ApplicationTypeVersionResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeVersionResourceSerializer(item);
  });
}

export function applicationTypeVersionResourceArrayDeserializer(
  result: Array<ApplicationTypeVersionResource>,
): any[] {
  return result.map((item) => {
    return applicationTypeVersionResourceDeserializer(item);
  });
}

/** The application resource. */
export interface ApplicationResource extends ProxyResource {
  /** The managed service identities assigned to this resource. */
  identity?: ManagedIdentity;
  /** The version of the application type as defined in the application manifest. */
  typeVersion?: string;
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  parameters?: Record<string, string>;
  /** Describes the policy for a monitored application upgrade. */
  upgradePolicy?: ApplicationUpgradePolicy;
  /** The minimum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. If this property is set to zero, no capacity will be reserved. The value of this property cannot be more than the value of the MaximumNodes property. */
  minimumNodes?: number;
  /** The maximum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. By default, the value of this property is zero and it means that the services can be placed on any node. */
  maximumNodes?: number;
  /** Remove the current application capacity settings. */
  removeApplicationCapacity?: boolean;
  /** List of application capacity metric description. */
  metrics?: ApplicationMetricDescription[];
  /** List of user assigned identities for the application, each mapped to a friendly name. */
  managedIdentities?: ApplicationUserAssignedIdentity[];
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The application type name as defined in the application manifest. */
  typeName?: string;
}

export function applicationResourceSerializer(item: ApplicationResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
    properties: areAllPropsUndefined(item, [
      "typeVersion",
      "parameters",
      "upgradePolicy",
      "minimumNodes",
      "maximumNodes",
      "removeApplicationCapacity",
      "metrics",
      "managedIdentities",
      "typeName",
    ])
      ? undefined
      : _applicationResourcePropertiesSerializer(item),
    identity: !item["identity"] ? item["identity"] : managedIdentitySerializer(item["identity"]),
  };
}

export function applicationResourceDeserializer(item: any): ApplicationResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _applicationResourcePropertiesDeserializer(item["properties"])),
    identity: !item["identity"] ? item["identity"] : managedIdentityDeserializer(item["identity"]),
  };
}

/** The application resource properties. */
export interface ApplicationResourceProperties extends ApplicationResourceUpdateProperties {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The application type name as defined in the application manifest. */
  typeName?: string;
}

export function applicationResourcePropertiesSerializer(item: ApplicationResourceProperties): any {
  return {
    typeVersion: item["typeVersion"],
    parameters: item["parameters"],
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicySerializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArraySerializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArraySerializer(item["managedIdentities"]),
    typeName: item["typeName"],
  };
}

export function applicationResourcePropertiesDeserializer(
  item: any,
): ApplicationResourceProperties {
  return {
    typeVersion: item["typeVersion"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicyDeserializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArrayDeserializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArrayDeserializer(item["managedIdentities"]),
    provisioningState: item["provisioningState"],
    typeName: item["typeName"],
  };
}

/** Describes the managed identities for an Azure resource. */
export interface ManagedIdentity {
  /** The principal id of the managed identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id of the managed identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity for the resource. */
  type?: ManagedIdentityType;
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentity>;
}

export function managedIdentitySerializer(item: ManagedIdentity): any {
  return {
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordSerializer(item["userAssignedIdentities"]),
  };
}

export function managedIdentityDeserializer(item: any): ManagedIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : userAssignedIdentityRecordDeserializer(item["userAssignedIdentities"]),
  };
}

/** The type of managed identity for the resource. */
export type ManagedIdentityType =
  | "SystemAssigned"
  | "UserAssigned"
  | "SystemAssigned, UserAssigned"
  | "None";

export function userAssignedIdentityRecordSerializer(
  item: Record<string, UserAssignedIdentity>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentitySerializer(item[key]);
  });
  return result;
}

export function userAssignedIdentityRecordDeserializer(
  item: Record<string, any>,
): Record<string, UserAssignedIdentity> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : userAssignedIdentityDeserializer(item[key]);
  });
  return result;
}

/** Describes a user assigned identity. */
export interface UserAssignedIdentity {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
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

/** The application resource properties for patch operations. */
export interface ApplicationResourceUpdateProperties {
  /** The version of the application type as defined in the application manifest. */
  typeVersion?: string;
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  parameters?: Record<string, string>;
  /** Describes the policy for a monitored application upgrade. */
  upgradePolicy?: ApplicationUpgradePolicy;
  /** The minimum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. If this property is set to zero, no capacity will be reserved. The value of this property cannot be more than the value of the MaximumNodes property. */
  minimumNodes?: number;
  /** The maximum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. By default, the value of this property is zero and it means that the services can be placed on any node. */
  maximumNodes?: number;
  /** Remove the current application capacity settings. */
  removeApplicationCapacity?: boolean;
  /** List of application capacity metric description. */
  metrics?: ApplicationMetricDescription[];
  /** List of user assigned identities for the application, each mapped to a friendly name. */
  managedIdentities?: ApplicationUserAssignedIdentity[];
}

export function applicationResourceUpdatePropertiesSerializer(
  item: ApplicationResourceUpdateProperties,
): any {
  return {
    typeVersion: item["typeVersion"],
    parameters: item["parameters"],
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicySerializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArraySerializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArraySerializer(item["managedIdentities"]),
  };
}

export function applicationResourceUpdatePropertiesDeserializer(
  item: any,
): ApplicationResourceUpdateProperties {
  return {
    typeVersion: item["typeVersion"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicyDeserializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArrayDeserializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArrayDeserializer(item["managedIdentities"]),
  };
}

/** Describes the policy for a monitored application upgrade. */
export interface ApplicationUpgradePolicy {
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  upgradeReplicaSetCheckTimeout?: string;
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  forceRestart?: boolean;
  /** The policy used for monitoring the application upgrade */
  rollingUpgradeMonitoringPolicy?: ArmRollingUpgradeMonitoringPolicy;
  /** Defines a health policy used to evaluate the health of an application or one of its children entities. */
  applicationHealthPolicy?: ArmApplicationHealthPolicy;
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  upgradeMode?: RollingUpgradeMode;
  /** Determines whether the application should be recreated on update. If value=true, the rest of the upgrade policy parameters are not allowed and it will result in availability loss. */
  recreateApplication?: boolean;
}

export function applicationUpgradePolicySerializer(item: ApplicationUpgradePolicy): any {
  return {
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
    forceRestart: item["forceRestart"],
    rollingUpgradeMonitoringPolicy: !item["rollingUpgradeMonitoringPolicy"]
      ? item["rollingUpgradeMonitoringPolicy"]
      : armRollingUpgradeMonitoringPolicySerializer(item["rollingUpgradeMonitoringPolicy"]),
    applicationHealthPolicy: !item["applicationHealthPolicy"]
      ? item["applicationHealthPolicy"]
      : armApplicationHealthPolicySerializer(item["applicationHealthPolicy"]),
    upgradeMode: item["upgradeMode"],
    recreateApplication: item["recreateApplication"],
  };
}

export function applicationUpgradePolicyDeserializer(item: any): ApplicationUpgradePolicy {
  return {
    upgradeReplicaSetCheckTimeout: item["upgradeReplicaSetCheckTimeout"],
    forceRestart: item["forceRestart"],
    rollingUpgradeMonitoringPolicy: !item["rollingUpgradeMonitoringPolicy"]
      ? item["rollingUpgradeMonitoringPolicy"]
      : armRollingUpgradeMonitoringPolicyDeserializer(item["rollingUpgradeMonitoringPolicy"]),
    applicationHealthPolicy: !item["applicationHealthPolicy"]
      ? item["applicationHealthPolicy"]
      : armApplicationHealthPolicyDeserializer(item["applicationHealthPolicy"]),
    upgradeMode: item["upgradeMode"],
    recreateApplication: item["recreateApplication"],
  };
}

/** The policy used for monitoring the application upgrade */
export interface ArmRollingUpgradeMonitoringPolicy {
  /** The activation Mode of the service package */
  failureAction?: ArmUpgradeFailureAction;
  /** The amount of time to wait after completing an upgrade domain before applying health policies. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  healthCheckWaitDuration?: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  healthCheckStableDuration?: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before FailureAction is executed. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  healthCheckRetryTimeout?: string;
  /** The amount of time the overall upgrade has to complete before FailureAction is executed. Cannot be larger than 12 hours. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  upgradeTimeout?: string;
  /** The amount of time each upgrade domain has to complete before FailureAction is executed. Cannot be larger than 12 hours. It is interpreted as a string representing an ISO 8601 duration with following format "hh:mm:ss.fff". */
  upgradeDomainTimeout?: string;
}

export function armRollingUpgradeMonitoringPolicySerializer(
  item: ArmRollingUpgradeMonitoringPolicy,
): any {
  return {
    failureAction: item["failureAction"],
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
  };
}

export function armRollingUpgradeMonitoringPolicyDeserializer(
  item: any,
): ArmRollingUpgradeMonitoringPolicy {
  return {
    failureAction: item["failureAction"],
    healthCheckWaitDuration: item["healthCheckWaitDuration"],
    healthCheckStableDuration: item["healthCheckStableDuration"],
    healthCheckRetryTimeout: item["healthCheckRetryTimeout"],
    upgradeTimeout: item["upgradeTimeout"],
    upgradeDomainTimeout: item["upgradeDomainTimeout"],
  };
}

/** The activation Mode of the service package */
export enum KnownArmUpgradeFailureAction {
  /** Indicates that a rollback of the upgrade will be performed by Service Fabric if the upgrade fails. */
  Rollback = "Rollback",
  /** Indicates that a manual repair will need to be performed by the administrator if the upgrade fails. Service Fabric will not proceed to the next upgrade domain automatically. */
  Manual = "Manual",
}

/**
 * The activation Mode of the service package \
 * {@link KnownArmUpgradeFailureAction} can be used interchangeably with ArmUpgradeFailureAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rollback**: Indicates that a rollback of the upgrade will be performed by Service Fabric if the upgrade fails. \
 * **Manual**: Indicates that a manual repair will need to be performed by the administrator if the upgrade fails. Service Fabric will not proceed to the next upgrade domain automatically.
 */
export type ArmUpgradeFailureAction = string;

/** Defines a health policy used to evaluate the health of an application or one of its children entities. */
export interface ArmApplicationHealthPolicy {
  /** Indicates whether warnings are treated with the same severity as errors. */
  considerWarningAsError?: boolean;
  /**
   * The maximum allowed percentage of unhealthy deployed applications. Allowed values are Byte values from zero to 100.
   * The percentage represents the maximum tolerated percentage of deployed applications that can be unhealthy before the application is considered in error.
   * This is calculated by dividing the number of unhealthy deployed applications over the number of nodes where the application is currently deployed on in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   */
  maxPercentUnhealthyDeployedApplications?: number;
  /** The health policy used by default to evaluate the health of a service type. */
  defaultServiceTypeHealthPolicy?: ArmServiceTypeHealthPolicy;
  /** The map with service type health policy per service type name. The map is empty by default. */
  serviceTypeHealthPolicyMap?: Record<string, ArmServiceTypeHealthPolicy>;
}

export function armApplicationHealthPolicySerializer(item: ArmApplicationHealthPolicy): any {
  return {
    considerWarningAsError: item["considerWarningAsError"],
    maxPercentUnhealthyDeployedApplications: item["maxPercentUnhealthyDeployedApplications"],
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : armServiceTypeHealthPolicySerializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicyMap: !item["serviceTypeHealthPolicyMap"]
      ? item["serviceTypeHealthPolicyMap"]
      : armServiceTypeHealthPolicyRecordSerializer(item["serviceTypeHealthPolicyMap"]),
  };
}

export function armApplicationHealthPolicyDeserializer(item: any): ArmApplicationHealthPolicy {
  return {
    considerWarningAsError: item["considerWarningAsError"],
    maxPercentUnhealthyDeployedApplications: item["maxPercentUnhealthyDeployedApplications"],
    defaultServiceTypeHealthPolicy: !item["defaultServiceTypeHealthPolicy"]
      ? item["defaultServiceTypeHealthPolicy"]
      : armServiceTypeHealthPolicyDeserializer(item["defaultServiceTypeHealthPolicy"]),
    serviceTypeHealthPolicyMap: !item["serviceTypeHealthPolicyMap"]
      ? item["serviceTypeHealthPolicyMap"]
      : armServiceTypeHealthPolicyRecordDeserializer(item["serviceTypeHealthPolicyMap"]),
  };
}

/** Represents the health policy used to evaluate the health of services belonging to a service type. */
export interface ArmServiceTypeHealthPolicy {
  /** The maximum percentage of services allowed to be unhealthy before your application is considered in error. */
  maxPercentUnhealthyServices?: number;
  /** The maximum percentage of partitions per service allowed to be unhealthy before your application is considered in error. */
  maxPercentUnhealthyPartitionsPerService?: number;
  /** The maximum percentage of replicas per partition allowed to be unhealthy before your application is considered in error. */
  maxPercentUnhealthyReplicasPerPartition?: number;
}

export function armServiceTypeHealthPolicySerializer(item: ArmServiceTypeHealthPolicy): any {
  return {
    maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"],
    maxPercentUnhealthyPartitionsPerService: item["maxPercentUnhealthyPartitionsPerService"],
    maxPercentUnhealthyReplicasPerPartition: item["maxPercentUnhealthyReplicasPerPartition"],
  };
}

export function armServiceTypeHealthPolicyDeserializer(item: any): ArmServiceTypeHealthPolicy {
  return {
    maxPercentUnhealthyServices: item["maxPercentUnhealthyServices"],
    maxPercentUnhealthyPartitionsPerService: item["maxPercentUnhealthyPartitionsPerService"],
    maxPercentUnhealthyReplicasPerPartition: item["maxPercentUnhealthyReplicasPerPartition"],
  };
}

export function armServiceTypeHealthPolicyRecordSerializer(
  item: Record<string, ArmServiceTypeHealthPolicy>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : armServiceTypeHealthPolicySerializer(item[key]);
  });
  return result;
}

export function armServiceTypeHealthPolicyRecordDeserializer(
  item: Record<string, any>,
): Record<string, ArmServiceTypeHealthPolicy> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : armServiceTypeHealthPolicyDeserializer(item[key]);
  });
  return result;
}

/** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
export enum KnownRollingUpgradeMode {
  /** Indicates the upgrade mode is invalid. All Service Fabric enumerations have the invalid type. The value is zero. */
  Invalid = "Invalid",
  /** The upgrade will proceed automatically without performing any health monitoring. The value is 1 */
  UnmonitoredAuto = "UnmonitoredAuto",
  /** The upgrade will stop after completing each upgrade domain, giving the opportunity to manually monitor health before proceeding. The value is 2 */
  UnmonitoredManual = "UnmonitoredManual",
  /** The upgrade will stop after completing each upgrade domain and automatically monitor health before proceeding. The value is 3 */
  Monitored = "Monitored",
}

/**
 * The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. \
 * {@link KnownRollingUpgradeMode} can be used interchangeably with RollingUpgradeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Indicates the upgrade mode is invalid. All Service Fabric enumerations have the invalid type. The value is zero. \
 * **UnmonitoredAuto**: The upgrade will proceed automatically without performing any health monitoring. The value is 1 \
 * **UnmonitoredManual**: The upgrade will stop after completing each upgrade domain, giving the opportunity to manually monitor health before proceeding. The value is 2 \
 * **Monitored**: The upgrade will stop after completing each upgrade domain and automatically monitor health before proceeding. The value is 3
 */
export type RollingUpgradeMode = string;

export function applicationMetricDescriptionArraySerializer(
  result: Array<ApplicationMetricDescription>,
): any[] {
  return result.map((item) => {
    return applicationMetricDescriptionSerializer(item);
  });
}

export function applicationMetricDescriptionArrayDeserializer(
  result: Array<ApplicationMetricDescription>,
): any[] {
  return result.map((item) => {
    return applicationMetricDescriptionDeserializer(item);
  });
}

/** Describes capacity information for a custom resource balancing metric. This can be used to limit the total consumption of this metric by the services of this application. */
export interface ApplicationMetricDescription {
  /** The name of the metric. */
  name?: string;
  /**
   * The maximum node capacity for Service Fabric application.
   * This is the maximum Load for an instance of this application on a single node. Even if the capacity of node is greater than this value, Service Fabric will limit the total load of services within the application on each node to this value.
   * If set to zero, capacity for this metric is unlimited on each node.
   * When creating a new application with application capacity defined, the product of MaximumNodes and this value must always be smaller than or equal to TotalApplicationCapacity.
   * When updating existing application with application capacity, the product of MaximumNodes and this value must always be smaller than or equal to TotalApplicationCapacity.
   */
  maximumCapacity?: number;
  /**
   * The node reservation capacity for Service Fabric application.
   * This is the amount of load which is reserved on nodes which have instances of this application.
   * If MinimumNodes is specified, then the product of these values will be the capacity reserved in the cluster for the application.
   * If set to zero, no capacity is reserved for this metric.
   * When setting application capacity or when updating application capacity; this value must be smaller than or equal to MaximumCapacity for each metric.
   */
  reservationCapacity?: number;
  /**
   * The total metric capacity for Service Fabric application.
   * This is the total metric capacity for this application in the cluster. Service Fabric will try to limit the sum of loads of services within the application to this value.
   * When creating a new application with application capacity defined, the product of MaximumNodes and MaximumCapacity must always be smaller than or equal to this value.
   */
  totalApplicationCapacity?: number;
}

export function applicationMetricDescriptionSerializer(item: ApplicationMetricDescription): any {
  return {
    name: item["name"],
    maximumCapacity: item["maximumCapacity"],
    reservationCapacity: item["reservationCapacity"],
    totalApplicationCapacity: item["totalApplicationCapacity"],
  };
}

export function applicationMetricDescriptionDeserializer(item: any): ApplicationMetricDescription {
  return {
    name: item["name"],
    maximumCapacity: item["maximumCapacity"],
    reservationCapacity: item["reservationCapacity"],
    totalApplicationCapacity: item["totalApplicationCapacity"],
  };
}

export function applicationUserAssignedIdentityArraySerializer(
  result: Array<ApplicationUserAssignedIdentity>,
): any[] {
  return result.map((item) => {
    return applicationUserAssignedIdentitySerializer(item);
  });
}

export function applicationUserAssignedIdentityArrayDeserializer(
  result: Array<ApplicationUserAssignedIdentity>,
): any[] {
  return result.map((item) => {
    return applicationUserAssignedIdentityDeserializer(item);
  });
}

/** Describes a user assigned identity for the application. */
export interface ApplicationUserAssignedIdentity {
  /** The friendly name of user assigned identity. */
  name: string;
  /** The principal id of user assigned identity. */
  principalId: string;
}

export function applicationUserAssignedIdentitySerializer(
  item: ApplicationUserAssignedIdentity,
): any {
  return { name: item["name"], principalId: item["principalId"] };
}

export function applicationUserAssignedIdentityDeserializer(
  item: any,
): ApplicationUserAssignedIdentity {
  return {
    name: item["name"],
    principalId: item["principalId"],
  };
}

/** The application resource for patch operations. */
export interface ApplicationResourceUpdate extends ProxyResource {
  /** The version of the application type as defined in the application manifest. */
  typeVersion?: string;
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  parameters?: Record<string, string>;
  /** Describes the policy for a monitored application upgrade. */
  upgradePolicy?: ApplicationUpgradePolicy;
  /** The minimum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. If this property is set to zero, no capacity will be reserved. The value of this property cannot be more than the value of the MaximumNodes property. */
  minimumNodes?: number;
  /** The maximum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. By default, the value of this property is zero and it means that the services can be placed on any node. */
  maximumNodes?: number;
  /** Remove the current application capacity settings. */
  removeApplicationCapacity?: boolean;
  /** List of application capacity metric description. */
  metrics?: ApplicationMetricDescription[];
  /** List of user assigned identities for the application, each mapped to a friendly name. */
  managedIdentities?: ApplicationUserAssignedIdentity[];
}

export function applicationResourceUpdateSerializer(item: ApplicationResourceUpdate): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
    properties: areAllPropsUndefined(item, [
      "typeVersion",
      "parameters",
      "upgradePolicy",
      "minimumNodes",
      "maximumNodes",
      "removeApplicationCapacity",
      "metrics",
      "managedIdentities",
    ])
      ? undefined
      : _applicationResourceUpdatePropertiesSerializer(item),
  };
}

/** The list of application resources. */
export interface _ApplicationResourceList {
  /** The ApplicationResource items on this page */
  value: ApplicationResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _applicationResourceListDeserializer(item: any): _ApplicationResourceList {
  return {
    value: applicationResourceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function applicationResourceArraySerializer(result: Array<ApplicationResource>): any[] {
  return result.map((item) => {
    return applicationResourceSerializer(item);
  });
}

export function applicationResourceArrayDeserializer(result: Array<ApplicationResource>): any[] {
  return result.map((item) => {
    return applicationResourceDeserializer(item);
  });
}

/** The service resource. */
export interface ServiceResource extends ProxyResource {
  /** The service resource properties. */
  properties?: ServiceResourcePropertiesUnion;
}

export function serviceResourceSerializer(item: ServiceResource): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourcePropertiesUnionSerializer(item["properties"]),
  };
}

export function serviceResourceDeserializer(item: any): ServiceResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    location: item["location"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    etag: item["etag"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourcePropertiesUnionDeserializer(item["properties"]),
  };
}

/** The service resource properties. */
export interface ServiceResourceProperties extends ServiceResourcePropertiesBase {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The kind of service (Stateless or Stateful). */
  /** The discriminator possible values: Stateful, Stateless */
  serviceKind: ServiceKind;
  /** The name of the service type */
  serviceTypeName?: string;
  /** Describes how the service is partitioned. */
  partitionDescription?: PartitionSchemeDescriptionUnion;
  /** The activation Mode of the service package */
  servicePackageActivationMode?: ArmServicePackageActivationMode;
  /**
   * Dns name used for the service. If this is specified, then the DNS name can be used to return the IP addresses of service endpoints for application layer protocols (e.g., HTTP).
   * When updating serviceDnsName, old name may be temporarily resolvable. However, rely on new name.
   * When removing serviceDnsName, removed name may temporarily be resolvable. Do not rely on the name being unresolvable.
   */
  serviceDnsName?: string;
}

export function serviceResourcePropertiesSerializer(item: ServiceResourceProperties): any {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: !item["partitionDescription"]
      ? item["partitionDescription"]
      : partitionSchemeDescriptionUnionSerializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
  };
}

export function serviceResourcePropertiesDeserializer(item: any): ServiceResourceProperties {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    provisioningState: item["provisioningState"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: !item["partitionDescription"]
      ? item["partitionDescription"]
      : partitionSchemeDescriptionUnionDeserializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
  };
}

/** Alias for ServiceResourcePropertiesUnion */
export type ServiceResourcePropertiesUnion =
  | StatefulServiceProperties
  | StatelessServiceProperties
  | ServiceResourceProperties;

export function serviceResourcePropertiesUnionSerializer(
  item: ServiceResourcePropertiesUnion,
): any {
  switch (item.serviceKind) {
    case "Stateful":
      return statefulServicePropertiesSerializer(item as StatefulServiceProperties);

    case "Stateless":
      return statelessServicePropertiesSerializer(item as StatelessServiceProperties);

    default:
      return serviceResourcePropertiesSerializer(item);
  }
}

export function serviceResourcePropertiesUnionDeserializer(
  item: any,
): ServiceResourcePropertiesUnion {
  switch (item["serviceKind"]) {
    case "Stateful":
      return statefulServicePropertiesDeserializer(item as StatefulServiceProperties);

    case "Stateless":
      return statelessServicePropertiesDeserializer(item as StatelessServiceProperties);

    default:
      return serviceResourcePropertiesDeserializer(item);
  }
}

/** The kind of service (Stateless or Stateful). */
export enum KnownServiceKind {
  /** Indicates the service kind is invalid. All Service Fabric enumerations have the invalid type. The value is zero. */
  Invalid = "Invalid",
  /** Does not use Service Fabric to make its state highly available or reliable. The value is 1. */
  Stateless = "Stateless",
  /** Uses Service Fabric to make its state or part of its state highly available and reliable. The value is 2. */
  Stateful = "Stateful",
}

/**
 * The kind of service (Stateless or Stateful). \
 * {@link KnownServiceKind} can be used interchangeably with ServiceKind,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Indicates the service kind is invalid. All Service Fabric enumerations have the invalid type. The value is zero. \
 * **Stateless**: Does not use Service Fabric to make its state highly available or reliable. The value is 1. \
 * **Stateful**: Uses Service Fabric to make its state or part of its state highly available and reliable. The value is 2.
 */
export type ServiceKind = string;

/** Describes how the service is partitioned. */
export interface PartitionSchemeDescription {
  /** Specifies how the service is partitioned. */
  /** The discriminator possible values: Named, Singleton, UniformInt64Range */
  partitionScheme: PartitionScheme;
}

export function partitionSchemeDescriptionSerializer(item: PartitionSchemeDescription): any {
  return { partitionScheme: item["partitionScheme"] };
}

export function partitionSchemeDescriptionDeserializer(item: any): PartitionSchemeDescription {
  return {
    partitionScheme: item["partitionScheme"],
  };
}

/** Alias for PartitionSchemeDescriptionUnion */
export type PartitionSchemeDescriptionUnion =
  | NamedPartitionSchemeDescription
  | SingletonPartitionSchemeDescription
  | UniformInt64RangePartitionSchemeDescription
  | PartitionSchemeDescription;

export function partitionSchemeDescriptionUnionSerializer(
  item: PartitionSchemeDescriptionUnion,
): any {
  switch (item.partitionScheme) {
    case "Named":
      return namedPartitionSchemeDescriptionSerializer(item as NamedPartitionSchemeDescription);

    case "Singleton":
      return singletonPartitionSchemeDescriptionSerializer(
        item as SingletonPartitionSchemeDescription,
      );

    case "UniformInt64Range":
      return uniformInt64RangePartitionSchemeDescriptionSerializer(
        item as UniformInt64RangePartitionSchemeDescription,
      );

    default:
      return partitionSchemeDescriptionSerializer(item);
  }
}

export function partitionSchemeDescriptionUnionDeserializer(
  item: any,
): PartitionSchemeDescriptionUnion {
  switch (item["partitionScheme"]) {
    case "Named":
      return namedPartitionSchemeDescriptionDeserializer(item as NamedPartitionSchemeDescription);

    case "Singleton":
      return singletonPartitionSchemeDescriptionDeserializer(
        item as SingletonPartitionSchemeDescription,
      );

    case "UniformInt64Range":
      return uniformInt64RangePartitionSchemeDescriptionDeserializer(
        item as UniformInt64RangePartitionSchemeDescription,
      );

    default:
      return partitionSchemeDescriptionDeserializer(item);
  }
}

/** Enumerates the ways that a service can be partitioned. */
export enum KnownPartitionScheme {
  /** Indicates the partition kind is invalid. All Service Fabric enumerations have the invalid type. The value is zero. */
  Invalid = "Invalid",
  /** Indicates that the partition is based on string names, and is a SingletonPartitionSchemeDescription object, The value is 1. */
  Singleton = "Singleton",
  /** Indicates that the partition is based on Int64 key ranges, and is a UniformInt64RangePartitionSchemeDescription object. The value is 2. */
  UniformInt64Range = "UniformInt64Range",
  /** Indicates that the partition is based on string names, and is a NamedPartitionSchemeDescription object. The value is 3 */
  Named = "Named",
}

/**
 * Enumerates the ways that a service can be partitioned. \
 * {@link KnownPartitionScheme} can be used interchangeably with PartitionScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Indicates the partition kind is invalid. All Service Fabric enumerations have the invalid type. The value is zero. \
 * **Singleton**: Indicates that the partition is based on string names, and is a SingletonPartitionSchemeDescription object, The value is 1. \
 * **UniformInt64Range**: Indicates that the partition is based on Int64 key ranges, and is a UniformInt64RangePartitionSchemeDescription object. The value is 2. \
 * **Named**: Indicates that the partition is based on string names, and is a NamedPartitionSchemeDescription object. The value is 3
 */
export type PartitionScheme = string;

/** Describes the named partition scheme of the service. */
export interface NamedPartitionSchemeDescription extends PartitionSchemeDescription {
  /** The number of partitions. */
  count: number;
  /** Array of size specified by the ‘count’ parameter, for the names of the partitions. */
  names: string[];
  /** Specifies how the service is partitioned. */
  partitionScheme: "Named";
}

export function namedPartitionSchemeDescriptionSerializer(
  item: NamedPartitionSchemeDescription,
): any {
  return {
    partitionScheme: item["partitionScheme"],
    count: item["count"],
    names: item["names"].map((p: any) => {
      return p;
    }),
  };
}

export function namedPartitionSchemeDescriptionDeserializer(
  item: any,
): NamedPartitionSchemeDescription {
  return {
    partitionScheme: item["partitionScheme"],
    count: item["count"],
    names: item["names"].map((p: any) => {
      return p;
    }),
  };
}

/** Describes the partition scheme of a singleton-partitioned, or non-partitioned service. */
export interface SingletonPartitionSchemeDescription extends PartitionSchemeDescription {
  /** Specifies how the service is partitioned. */
  partitionScheme: "Singleton";
}

export function singletonPartitionSchemeDescriptionSerializer(
  item: SingletonPartitionSchemeDescription,
): any {
  return { partitionScheme: item["partitionScheme"] };
}

export function singletonPartitionSchemeDescriptionDeserializer(
  item: any,
): SingletonPartitionSchemeDescription {
  return {
    partitionScheme: item["partitionScheme"],
  };
}

/** Describes a partitioning scheme where an integer range is allocated evenly across a number of partitions. */
export interface UniformInt64RangePartitionSchemeDescription extends PartitionSchemeDescription {
  /** The number of partitions. */
  count: number;
  /**
   * String indicating the lower bound of the partition key range that
   * should be split between the partition ‘count’
   */
  lowKey: string;
  /**
   * String indicating the upper bound of the partition key range that
   * should be split between the partition ‘count’
   */
  highKey: string;
  /** Specifies how the service is partitioned. */
  partitionScheme: "UniformInt64Range";
}

export function uniformInt64RangePartitionSchemeDescriptionSerializer(
  item: UniformInt64RangePartitionSchemeDescription,
): any {
  return {
    partitionScheme: item["partitionScheme"],
    count: item["count"],
    lowKey: item["lowKey"],
    highKey: item["highKey"],
  };
}

export function uniformInt64RangePartitionSchemeDescriptionDeserializer(
  item: any,
): UniformInt64RangePartitionSchemeDescription {
  return {
    partitionScheme: item["partitionScheme"],
    count: item["count"],
    lowKey: item["lowKey"],
    highKey: item["highKey"],
  };
}

/** The activation Mode of the service package */
export enum KnownArmServicePackageActivationMode {
  /** Indicates the application package activation mode will use shared process. */
  SharedProcess = "SharedProcess",
  /** Indicates the application package activation mode will use exclusive process. */
  ExclusiveProcess = "ExclusiveProcess",
}

/**
 * The activation Mode of the service package \
 * {@link KnownArmServicePackageActivationMode} can be used interchangeably with ArmServicePackageActivationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SharedProcess**: Indicates the application package activation mode will use shared process. \
 * **ExclusiveProcess**: Indicates the application package activation mode will use exclusive process.
 */
export type ArmServicePackageActivationMode = string;

/** The properties of a stateful service resource. */
export interface StatefulServiceProperties extends ServiceResourceProperties {
  /** A flag indicating whether this is a persistent service which stores states on the local disk. If it is then the value of this property is true, if not it is false. */
  hasPersistedState?: boolean;
  /** The target replica set size as a number. */
  targetReplicaSetSize?: number;
  /** The minimum replica set size as a number. */
  minReplicaSetSize?: number;
  /** The duration between when a replica goes down and when a new replica is created, represented in ISO 8601 format (hh:mm:ss.s). */
  replicaRestartWaitDuration?: Date;
  /** The maximum duration for which a partition is allowed to be in a state of quorum loss, represented in ISO 8601 format (hh:mm:ss.s). */
  quorumLossWaitDuration?: Date;
  /** The definition on how long StandBy replicas should be maintained before being removed, represented in ISO 8601 format (hh:mm:ss.s). */
  standByReplicaKeepDuration?: Date;
  /** The kind of service (Stateless or Stateful). */
  serviceKind: "Stateful";
}

export function statefulServicePropertiesSerializer(item: StatefulServiceProperties): any {
  return {
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: !item["partitionDescription"]
      ? item["partitionDescription"]
      : partitionSchemeDescriptionUnionSerializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    hasPersistedState: item["hasPersistedState"],
    targetReplicaSetSize: item["targetReplicaSetSize"],
    minReplicaSetSize: item["minReplicaSetSize"],
    replicaRestartWaitDuration: !item["replicaRestartWaitDuration"]
      ? item["replicaRestartWaitDuration"]
      : item["replicaRestartWaitDuration"].toISOString(),
    quorumLossWaitDuration: !item["quorumLossWaitDuration"]
      ? item["quorumLossWaitDuration"]
      : item["quorumLossWaitDuration"].toISOString(),
    standByReplicaKeepDuration: !item["standByReplicaKeepDuration"]
      ? item["standByReplicaKeepDuration"]
      : item["standByReplicaKeepDuration"].toISOString(),
  };
}

export function statefulServicePropertiesDeserializer(item: any): StatefulServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: !item["partitionDescription"]
      ? item["partitionDescription"]
      : partitionSchemeDescriptionUnionDeserializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    hasPersistedState: item["hasPersistedState"],
    targetReplicaSetSize: item["targetReplicaSetSize"],
    minReplicaSetSize: item["minReplicaSetSize"],
    replicaRestartWaitDuration: !item["replicaRestartWaitDuration"]
      ? item["replicaRestartWaitDuration"]
      : new Date(item["replicaRestartWaitDuration"]),
    quorumLossWaitDuration: !item["quorumLossWaitDuration"]
      ? item["quorumLossWaitDuration"]
      : new Date(item["quorumLossWaitDuration"]),
    standByReplicaKeepDuration: !item["standByReplicaKeepDuration"]
      ? item["standByReplicaKeepDuration"]
      : new Date(item["standByReplicaKeepDuration"]),
  };
}

/** The properties of a stateless service resource. */
export interface StatelessServiceProperties extends ServiceResourceProperties {
  /** The instance count. */
  instanceCount?: number;
  /** Delay duration for RequestDrain feature to ensures that the endpoint advertised by the stateless instance is removed before the delay starts prior to closing the instance. This delay enables existing requests to drain gracefully before the instance actually goes down (https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-upgrade-advanced#avoid-connection-drops-during-stateless-service-planned-downtime-preview). It is represented in ISO 8601 format (hh:mm:ss.s). */
  instanceCloseDelayDuration?: string;
  /** MinInstanceCount is the minimum number of instances that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node. The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ). Note, if InstanceCount is set to -1, during MinInstanceCount computation -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service. */
  minInstanceCount?: number;
  /** MinInstancePercentage is the minimum percentage of InstanceCount that must be up to meet the EnsureAvailability safety check during operations like upgrade or deactivate node. The actual number that is used is max( MinInstanceCount, ceil( MinInstancePercentage/100.0 * InstanceCount) ). Note, if InstanceCount is set to -1, during MinInstancePercentage computation, -1 is first converted into the number of nodes on which the instances are allowed to be placed according to the placement constraints on the service. */
  minInstancePercentage?: Uint8Array;
  /** The kind of service (Stateless or Stateful). */
  serviceKind: "Stateless";
}

export function statelessServicePropertiesSerializer(item: StatelessServiceProperties): any {
  return {
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: !item["partitionDescription"]
      ? item["partitionDescription"]
      : partitionSchemeDescriptionUnionSerializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    instanceCount: item["instanceCount"],
    instanceCloseDelayDuration: item["instanceCloseDelayDuration"],
    minInstanceCount: item["minInstanceCount"],
    minInstancePercentage: !item["minInstancePercentage"]
      ? item["minInstancePercentage"]
      : uint8ArrayToString(item["minInstancePercentage"], "base64"),
  };
}

export function statelessServicePropertiesDeserializer(item: any): StatelessServiceProperties {
  return {
    provisioningState: item["provisioningState"],
    serviceKind: item["serviceKind"],
    serviceTypeName: item["serviceTypeName"],
    partitionDescription: !item["partitionDescription"]
      ? item["partitionDescription"]
      : partitionSchemeDescriptionUnionDeserializer(item["partitionDescription"]),
    servicePackageActivationMode: item["servicePackageActivationMode"],
    serviceDnsName: item["serviceDnsName"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    instanceCount: item["instanceCount"],
    instanceCloseDelayDuration: item["instanceCloseDelayDuration"],
    minInstanceCount: item["minInstanceCount"],
    minInstancePercentage: !item["minInstancePercentage"]
      ? item["minInstancePercentage"]
      : typeof item["minInstancePercentage"] === "string"
        ? stringToUint8Array(item["minInstancePercentage"], "base64")
        : item["minInstancePercentage"],
  };
}

/** The common service resource properties. */
export interface ServiceResourcePropertiesBase {
  /** The placement constraints as a string. Placement constraints are boolean expressions on node properties and allow for restricting a service to particular nodes based on the service requirements. For example, to place a service on nodes where NodeType is blue specify the following: "NodeColor == blue)". */
  placementConstraints?: string;
  /** A list that describes the correlation of the service with other services. */
  correlationScheme?: ServiceCorrelationDescription[];
  /** The service load metrics is given as an array of ServiceLoadMetricDescription objects. */
  serviceLoadMetrics?: ServiceLoadMetricDescription[];
  /** A list that describes the correlation of the service with other services. */
  servicePlacementPolicies?: ServicePlacementPolicyDescription[];
  /** Specifies the move cost for the service. */
  defaultMoveCost?: MoveCost;
}

export function serviceResourcePropertiesBaseSerializer(item: ServiceResourcePropertiesBase): any {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
  };
}

export function serviceResourcePropertiesBaseDeserializer(
  item: any,
): ServiceResourcePropertiesBase {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArrayDeserializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArrayDeserializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArrayDeserializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
  };
}

export function serviceCorrelationDescriptionArraySerializer(
  result: Array<ServiceCorrelationDescription>,
): any[] {
  return result.map((item) => {
    return serviceCorrelationDescriptionSerializer(item);
  });
}

export function serviceCorrelationDescriptionArrayDeserializer(
  result: Array<ServiceCorrelationDescription>,
): any[] {
  return result.map((item) => {
    return serviceCorrelationDescriptionDeserializer(item);
  });
}

/** Creates a particular correlation between services. */
export interface ServiceCorrelationDescription {
  /** The ServiceCorrelationScheme which describes the relationship between this service and the service specified via ServiceName. */
  scheme: ServiceCorrelationScheme;
  /** The full name of the service with 'fabric:' URI scheme. */
  serviceName: string;
}

export function serviceCorrelationDescriptionSerializer(item: ServiceCorrelationDescription): any {
  return { scheme: item["scheme"], serviceName: item["serviceName"] };
}

export function serviceCorrelationDescriptionDeserializer(
  item: any,
): ServiceCorrelationDescription {
  return {
    scheme: item["scheme"],
    serviceName: item["serviceName"],
  };
}

/** The service correlation scheme. */
export enum KnownServiceCorrelationScheme {
  /** An invalid correlation scheme. Cannot be used. The value is zero. */
  Invalid = "Invalid",
  /** Indicates that this service has an affinity relationship with another service. Provided for backwards compatibility, consider preferring the Aligned or NonAlignedAffinity options. The value is 1. */
  Affinity = "Affinity",
  /** Aligned affinity ensures that the primaries of the partitions of the affinitized services are collocated on the same nodes. This is the default and is the same as selecting the Affinity scheme. The value is 2. */
  AlignedAffinity = "AlignedAffinity",
  /** Non-Aligned affinity guarantees that all replicas of each service will be placed on the same nodes. Unlike Aligned Affinity, this does not guarantee that replicas of particular role will be collocated. The value is 3. */
  NonAlignedAffinity = "NonAlignedAffinity",
}

/**
 * The service correlation scheme. \
 * {@link KnownServiceCorrelationScheme} can be used interchangeably with ServiceCorrelationScheme,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: An invalid correlation scheme. Cannot be used. The value is zero. \
 * **Affinity**: Indicates that this service has an affinity relationship with another service. Provided for backwards compatibility, consider preferring the Aligned or NonAlignedAffinity options. The value is 1. \
 * **AlignedAffinity**: Aligned affinity ensures that the primaries of the partitions of the affinitized services are collocated on the same nodes. This is the default and is the same as selecting the Affinity scheme. The value is 2. \
 * **NonAlignedAffinity**: Non-Aligned affinity guarantees that all replicas of each service will be placed on the same nodes. Unlike Aligned Affinity, this does not guarantee that replicas of particular role will be collocated. The value is 3.
 */
export type ServiceCorrelationScheme = string;

export function serviceLoadMetricDescriptionArraySerializer(
  result: Array<ServiceLoadMetricDescription>,
): any[] {
  return result.map((item) => {
    return serviceLoadMetricDescriptionSerializer(item);
  });
}

export function serviceLoadMetricDescriptionArrayDeserializer(
  result: Array<ServiceLoadMetricDescription>,
): any[] {
  return result.map((item) => {
    return serviceLoadMetricDescriptionDeserializer(item);
  });
}

/** Specifies a metric to load balance a service during runtime. */
export interface ServiceLoadMetricDescription {
  /** The name of the metric. If the service chooses to report load during runtime, the load metric name should match the name that is specified in Name exactly. Note that metric names are case sensitive. */
  name: string;
  /** The service load metric relative weight, compared to other metrics configured for this service, as a number. */
  weight?: ServiceLoadMetricWeight;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Primary replica. */
  primaryDefaultLoad?: number;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Secondary replica. */
  secondaryDefaultLoad?: number;
  /** Used only for Stateless services. The default amount of load, as a number, that this service creates for this metric. */
  defaultLoad?: number;
}

export function serviceLoadMetricDescriptionSerializer(item: ServiceLoadMetricDescription): any {
  return {
    name: item["name"],
    weight: item["weight"],
    primaryDefaultLoad: item["primaryDefaultLoad"],
    secondaryDefaultLoad: item["secondaryDefaultLoad"],
    defaultLoad: item["defaultLoad"],
  };
}

export function serviceLoadMetricDescriptionDeserializer(item: any): ServiceLoadMetricDescription {
  return {
    name: item["name"],
    weight: item["weight"],
    primaryDefaultLoad: item["primaryDefaultLoad"],
    secondaryDefaultLoad: item["secondaryDefaultLoad"],
    defaultLoad: item["defaultLoad"],
  };
}

/** Determines the metric weight relative to the other metrics that are configured for this service. During runtime, if two metrics end up in conflict, the Cluster Resource Manager prefers the metric with the higher weight. */
export enum KnownServiceLoadMetricWeight {
  /** Disables resource balancing for this metric. This value is zero. */
  Zero = "Zero",
  /** Specifies the metric weight of the service load as Low. The value is 1. */
  Low = "Low",
  /** Specifies the metric weight of the service load as Medium. The value is 2. */
  Medium = "Medium",
  /** Specifies the metric weight of the service load as High. The value is 3. */
  High = "High",
}

/**
 * Determines the metric weight relative to the other metrics that are configured for this service. During runtime, if two metrics end up in conflict, the Cluster Resource Manager prefers the metric with the higher weight. \
 * {@link KnownServiceLoadMetricWeight} can be used interchangeably with ServiceLoadMetricWeight,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zero**: Disables resource balancing for this metric. This value is zero. \
 * **Low**: Specifies the metric weight of the service load as Low. The value is 1. \
 * **Medium**: Specifies the metric weight of the service load as Medium. The value is 2. \
 * **High**: Specifies the metric weight of the service load as High. The value is 3.
 */
export type ServiceLoadMetricWeight = string;

export function servicePlacementPolicyDescriptionArraySerializer(
  result: Array<ServicePlacementPolicyDescription>,
): any[] {
  return result.map((item) => {
    return servicePlacementPolicyDescriptionSerializer(item);
  });
}

export function servicePlacementPolicyDescriptionArrayDeserializer(
  result: Array<ServicePlacementPolicyDescription>,
): any[] {
  return result.map((item) => {
    return servicePlacementPolicyDescriptionDeserializer(item);
  });
}

/** Describes the policy to be used for placement of a Service Fabric service. */
export interface ServicePlacementPolicyDescription {
  /** The type of placement policy for a service fabric service. Following are the possible values. */
  /** The discriminator possible values: */
  type: ServicePlacementPolicyType;
}

export function servicePlacementPolicyDescriptionSerializer(
  item: ServicePlacementPolicyDescription,
): any {
  return { type: item["type"] };
}

export function servicePlacementPolicyDescriptionDeserializer(
  item: any,
): ServicePlacementPolicyDescription {
  return {
    type: item["type"],
  };
}

/** The type of placement policy for a service fabric service. Following are the possible values. */
export enum KnownServicePlacementPolicyType {
  /** Indicates the type of the placement policy is invalid. All Service Fabric enumerations have the invalid type. The value is zero. */
  Invalid = "Invalid",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementInvalidDomainPolicyDescription, which indicates that a particular fault or upgrade domain cannot be used for placement of this service. The value is 1. */
  InvalidDomain = "InvalidDomain",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription indicating that the replicas of the service must be placed in a specific domain. The value is 2. */
  RequiredDomain = "RequiredDomain",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementPreferPrimaryDomainPolicyDescription, which indicates that if possible the Primary replica for the partitions of the service should be located in a particular domain as an optimization. The value is 3. */
  PreferredPrimaryDomain = "PreferredPrimaryDomain",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription, indicating that the system will disallow placement of any two replicas from the same partition in the same domain at any time. The value is 4. */
  RequiredDomainDistribution = "RequiredDomainDistribution",
  /** Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementNonPartiallyPlaceServicePolicyDescription, which indicates that if possible all replicas of a particular partition of the service should be placed atomically. The value is 5. */
  NonPartiallyPlaceService = "NonPartiallyPlaceService",
}

/**
 * The type of placement policy for a service fabric service. Following are the possible values. \
 * {@link KnownServicePlacementPolicyType} can be used interchangeably with ServicePlacementPolicyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Invalid**: Indicates the type of the placement policy is invalid. All Service Fabric enumerations have the invalid type. The value is zero. \
 * **InvalidDomain**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementInvalidDomainPolicyDescription, which indicates that a particular fault or upgrade domain cannot be used for placement of this service. The value is 1. \
 * **RequiredDomain**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription indicating that the replicas of the service must be placed in a specific domain. The value is 2. \
 * **PreferredPrimaryDomain**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementPreferPrimaryDomainPolicyDescription, which indicates that if possible the Primary replica for the partitions of the service should be located in a particular domain as an optimization. The value is 3. \
 * **RequiredDomainDistribution**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementRequireDomainDistributionPolicyDescription, indicating that the system will disallow placement of any two replicas from the same partition in the same domain at any time. The value is 4. \
 * **NonPartiallyPlaceService**: Indicates that the ServicePlacementPolicyDescription is of type ServicePlacementNonPartiallyPlaceServicePolicyDescription, which indicates that if possible all replicas of a particular partition of the service should be placed atomically. The value is 5.
 */
export type ServicePlacementPolicyType = string;

/** Specifies the move cost for the service. */
export enum KnownMoveCost {
  /** Zero move cost. This value is zero. */
  Zero = "Zero",
  /** Specifies the move cost of the service as Low. The value is 1. */
  Low = "Low",
  /** Specifies the move cost of the service as Medium. The value is 2. */
  Medium = "Medium",
  /** Specifies the move cost of the service as High. The value is 3. */
  High = "High",
}

/**
 * Specifies the move cost for the service. \
 * {@link KnownMoveCost} can be used interchangeably with MoveCost,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Zero**: Zero move cost. This value is zero. \
 * **Low**: Specifies the move cost of the service as Low. The value is 1. \
 * **Medium**: Specifies the move cost of the service as Medium. The value is 2. \
 * **High**: Specifies the move cost of the service as High. The value is 3.
 */
export type MoveCost = string;

/** The service resource for patch operations. */
export interface ServiceResourceUpdate extends ProxyResource {
  /** The RP-specific properties for this resource. */
  properties?: ServiceResourceUpdatePropertiesUnion;
}

export function serviceResourceUpdateSerializer(item: ServiceResourceUpdate): any {
  return {
    location: item["location"],
    tags: item["tags"],
    systemData: !item["systemData"] ? item["systemData"] : systemDataSerializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : serviceResourceUpdatePropertiesUnionSerializer(item["properties"]),
  };
}

/** The service resource properties for patch operations. */
export interface ServiceResourceUpdateProperties extends ServiceResourcePropertiesBase {
  /** The kind of service (Stateless or Stateful). */
  /** The discriminator possible values: Stateful, Stateless */
  serviceKind: ServiceKind;
}

export function serviceResourceUpdatePropertiesSerializer(
  item: ServiceResourceUpdateProperties,
): any {
  return {
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    serviceKind: item["serviceKind"],
  };
}

/** Alias for ServiceResourceUpdatePropertiesUnion */
export type ServiceResourceUpdatePropertiesUnion =
  | StatefulServiceUpdateProperties
  | StatelessServiceUpdateProperties
  | ServiceResourceUpdateProperties;

export function serviceResourceUpdatePropertiesUnionSerializer(
  item: ServiceResourceUpdatePropertiesUnion,
): any {
  switch (item.serviceKind) {
    case "Stateful":
      return statefulServiceUpdatePropertiesSerializer(item as StatefulServiceUpdateProperties);

    case "Stateless":
      return statelessServiceUpdatePropertiesSerializer(item as StatelessServiceUpdateProperties);

    default:
      return serviceResourceUpdatePropertiesSerializer(item);
  }
}

/** The properties of a stateful service resource for patch operations. */
export interface StatefulServiceUpdateProperties extends ServiceResourceUpdateProperties {
  /** The target replica set size as a number. */
  targetReplicaSetSize?: number;
  /** The minimum replica set size as a number. */
  minReplicaSetSize?: number;
  /** The duration between when a replica goes down and when a new replica is created, represented in ISO 8601 format (hh:mm:ss.s). */
  replicaRestartWaitDuration?: Date;
  /** The maximum duration for which a partition is allowed to be in a state of quorum loss, represented in ISO 8601 format (hh:mm:ss.s). */
  quorumLossWaitDuration?: Date;
  /** The definition on how long StandBy replicas should be maintained before being removed, represented in ISO 8601 format (hh:mm:ss.s). */
  standByReplicaKeepDuration?: Date;
  /** The kind of service (Stateless or Stateful). */
  serviceKind: "Stateful";
}

export function statefulServiceUpdatePropertiesSerializer(
  item: StatefulServiceUpdateProperties,
): any {
  return {
    serviceKind: item["serviceKind"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    targetReplicaSetSize: item["targetReplicaSetSize"],
    minReplicaSetSize: item["minReplicaSetSize"],
    replicaRestartWaitDuration: !item["replicaRestartWaitDuration"]
      ? item["replicaRestartWaitDuration"]
      : item["replicaRestartWaitDuration"].toISOString(),
    quorumLossWaitDuration: !item["quorumLossWaitDuration"]
      ? item["quorumLossWaitDuration"]
      : item["quorumLossWaitDuration"].toISOString(),
    standByReplicaKeepDuration: !item["standByReplicaKeepDuration"]
      ? item["standByReplicaKeepDuration"]
      : item["standByReplicaKeepDuration"].toISOString(),
  };
}

/** The properties of a stateless service resource for patch operations. */
export interface StatelessServiceUpdateProperties extends ServiceResourceUpdateProperties {
  /** The instance count. */
  instanceCount?: number;
  /** Delay duration for RequestDrain feature to ensures that the endpoint advertised by the stateless instance is removed before the delay starts prior to closing the instance. This delay enables existing requests to drain gracefully before the instance actually goes down (https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-upgrade-advanced#avoid-connection-drops-during-stateless-service-planned-downtime-preview). It is represented in ISO 8601 format (hh:mm:ss.s). */
  instanceCloseDelayDuration?: string;
  /** The kind of service (Stateless or Stateful). */
  serviceKind: "Stateless";
}

export function statelessServiceUpdatePropertiesSerializer(
  item: StatelessServiceUpdateProperties,
): any {
  return {
    serviceKind: item["serviceKind"],
    placementConstraints: item["placementConstraints"],
    correlationScheme: !item["correlationScheme"]
      ? item["correlationScheme"]
      : serviceCorrelationDescriptionArraySerializer(item["correlationScheme"]),
    serviceLoadMetrics: !item["serviceLoadMetrics"]
      ? item["serviceLoadMetrics"]
      : serviceLoadMetricDescriptionArraySerializer(item["serviceLoadMetrics"]),
    servicePlacementPolicies: !item["servicePlacementPolicies"]
      ? item["servicePlacementPolicies"]
      : servicePlacementPolicyDescriptionArraySerializer(item["servicePlacementPolicies"]),
    defaultMoveCost: item["defaultMoveCost"],
    instanceCount: item["instanceCount"],
    instanceCloseDelayDuration: item["instanceCloseDelayDuration"],
  };
}

/** The list of service resources. */
export interface _ServiceResourceList {
  /** The ServiceResource items on this page */
  value: ServiceResource[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _serviceResourceListDeserializer(item: any): _ServiceResourceList {
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

/** The response of a ClusterCodeVersions list operation. */
export interface ClusterCodeVersionsListResult {
  /** The ClusterCodeVersions items on this page */
  value: ClusterCodeVersionsResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function clusterCodeVersionsListResultDeserializer(
  item: any,
): ClusterCodeVersionsListResult {
  return {
    value: clusterCodeVersionsResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function clusterCodeVersionsResultArrayDeserializer(
  result: Array<ClusterCodeVersionsResult>,
): any[] {
  return result.map((item) => {
    return clusterCodeVersionsResultDeserializer(item);
  });
}

/** The result of the Service Fabric runtime versions */
export interface ClusterCodeVersionsResult {
  /** The identification of the result */
  id?: string;
  /** The name of the result */
  name?: string;
  /** The result resource type */
  type?: string;
  /** The Service Fabric runtime version of the cluster. */
  codeVersion?: string;
  /** The date of expiry of support of the version. */
  supportExpiryUtc?: string;
  /** Indicates if this version is for Windows or Linux operating system. */
  environment?: ClusterEnvironment;
}

export function clusterCodeVersionsResultDeserializer(item: any): ClusterCodeVersionsResult {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ...(!item["properties"]
      ? item["properties"]
      : _clusterCodeVersionsResultPropertiesDeserializer(item["properties"])),
  };
}

/** The operating system or environment of the cluster version. */
export enum KnownClusterVersionsEnvironment {
  /** Windows operating system */
  Windows = "Windows",
  /** Linux operating system */
  Linux = "Linux",
}

/**
 * The operating system or environment of the cluster version. \
 * {@link KnownClusterVersionsEnvironment} can be used interchangeably with ClusterVersionsEnvironment,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Windows**: Windows operating system \
 * **Linux**: Linux operating system
 */
export type ClusterVersionsEnvironment = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2023-11-01-preview API version. */
  V20231101Preview = "2023-11-01-preview",
  /** The 2026-03-01-preview API version. */
  V20260301Preview = "2026-03-01-preview",
}

export function _clusterPropertiesSerializer(item: Cluster): any {
  return {
    addOnFeatures: !item["addOnFeatures"]
      ? item["addOnFeatures"]
      : item["addOnFeatures"].map((p: any) => {
          return p;
        }),
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectorySerializer(item["azureActiveDirectory"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateDescriptionSerializer(item["certificate"]),
    certificateCommonNames: !item["certificateCommonNames"]
      ? item["certificateCommonNames"]
      : serverCertificateCommonNamesSerializer(item["certificateCommonNames"]),
    clientCertificateCommonNames: !item["clientCertificateCommonNames"]
      ? item["clientCertificateCommonNames"]
      : clientCertificateCommonNameArraySerializer(item["clientCertificateCommonNames"]),
    clientCertificateThumbprints: !item["clientCertificateThumbprints"]
      ? item["clientCertificateThumbprints"]
      : clientCertificateThumbprintArraySerializer(item["clientCertificateThumbprints"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    diagnosticsStorageAccountConfig: !item["diagnosticsStorageAccountConfig"]
      ? item["diagnosticsStorageAccountConfig"]
      : diagnosticsStorageAccountConfigSerializer(item["diagnosticsStorageAccountConfig"]),
    eventStoreServiceEnabled: item["eventStoreServiceEnabled"],
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArraySerializer(item["fabricSettings"]),
    managementEndpoint: item["managementEndpoint"],
    nodeTypes: !item["nodeTypes"]
      ? item["nodeTypes"]
      : nodeTypeDescriptionArraySerializer(item["nodeTypes"]),
    reliabilityLevel: item["reliabilityLevel"],
    reverseProxyCertificate: !item["reverseProxyCertificate"]
      ? item["reverseProxyCertificate"]
      : certificateDescriptionSerializer(item["reverseProxyCertificate"]),
    reverseProxyCertificateCommonNames: !item["reverseProxyCertificateCommonNames"]
      ? item["reverseProxyCertificateCommonNames"]
      : serverCertificateCommonNamesSerializer(item["reverseProxyCertificateCommonNames"]),
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicySerializer(item["upgradeDescription"]),
    upgradeMode: item["upgradeMode"],
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicySerializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    vmImage: item["vmImage"],
    sfZonalUpgradeMode: item["sfZonalUpgradeMode"],
    vmssZonalUpgradeMode: item["vmssZonalUpgradeMode"],
    infrastructureServiceManager: item["infrastructureServiceManager"],
    upgradeWave: item["upgradeWave"],
    upgradePauseStartTimestampUtc: !item["upgradePauseStartTimestampUtc"]
      ? item["upgradePauseStartTimestampUtc"]
      : item["upgradePauseStartTimestampUtc"].toISOString(),
    upgradePauseEndTimestampUtc: !item["upgradePauseEndTimestampUtc"]
      ? item["upgradePauseEndTimestampUtc"]
      : item["upgradePauseEndTimestampUtc"].toISOString(),
    waveUpgradePaused: item["waveUpgradePaused"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
  };
}

export function _clusterPropertiesDeserializer(item: any) {
  return {
    addOnFeatures: !item["addOnFeatures"]
      ? item["addOnFeatures"]
      : item["addOnFeatures"].map((p: any) => {
          return p;
        }),
    availableClusterVersions: !item["availableClusterVersions"]
      ? item["availableClusterVersions"]
      : clusterVersionDetailsArrayDeserializer(item["availableClusterVersions"]),
    azureActiveDirectory: !item["azureActiveDirectory"]
      ? item["azureActiveDirectory"]
      : azureActiveDirectoryDeserializer(item["azureActiveDirectory"]),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateDescriptionDeserializer(item["certificate"]),
    certificateCommonNames: !item["certificateCommonNames"]
      ? item["certificateCommonNames"]
      : serverCertificateCommonNamesDeserializer(item["certificateCommonNames"]),
    clientCertificateCommonNames: !item["clientCertificateCommonNames"]
      ? item["clientCertificateCommonNames"]
      : clientCertificateCommonNameArrayDeserializer(item["clientCertificateCommonNames"]),
    clientCertificateThumbprints: !item["clientCertificateThumbprints"]
      ? item["clientCertificateThumbprints"]
      : clientCertificateThumbprintArrayDeserializer(item["clientCertificateThumbprints"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    clusterEndpoint: item["clusterEndpoint"],
    clusterId: item["clusterId"],
    clusterState: item["clusterState"],
    diagnosticsStorageAccountConfig: !item["diagnosticsStorageAccountConfig"]
      ? item["diagnosticsStorageAccountConfig"]
      : diagnosticsStorageAccountConfigDeserializer(item["diagnosticsStorageAccountConfig"]),
    eventStoreServiceEnabled: item["eventStoreServiceEnabled"],
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArrayDeserializer(item["fabricSettings"]),
    managementEndpoint: item["managementEndpoint"],
    nodeTypes: !item["nodeTypes"]
      ? item["nodeTypes"]
      : nodeTypeDescriptionArrayDeserializer(item["nodeTypes"]),
    provisioningState: item["provisioningState"],
    reliabilityLevel: item["reliabilityLevel"],
    reverseProxyCertificate: !item["reverseProxyCertificate"]
      ? item["reverseProxyCertificate"]
      : certificateDescriptionDeserializer(item["reverseProxyCertificate"]),
    reverseProxyCertificateCommonNames: !item["reverseProxyCertificateCommonNames"]
      ? item["reverseProxyCertificateCommonNames"]
      : serverCertificateCommonNamesDeserializer(item["reverseProxyCertificateCommonNames"]),
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicyDeserializer(item["upgradeDescription"]),
    upgradeMode: item["upgradeMode"],
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicyDeserializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    vmImage: item["vmImage"],
    sfZonalUpgradeMode: item["sfZonalUpgradeMode"],
    vmssZonalUpgradeMode: item["vmssZonalUpgradeMode"],
    infrastructureServiceManager: item["infrastructureServiceManager"],
    upgradeWave: item["upgradeWave"],
    upgradePauseStartTimestampUtc: !item["upgradePauseStartTimestampUtc"]
      ? item["upgradePauseStartTimestampUtc"]
      : new Date(item["upgradePauseStartTimestampUtc"]),
    upgradePauseEndTimestampUtc: !item["upgradePauseEndTimestampUtc"]
      ? item["upgradePauseEndTimestampUtc"]
      : new Date(item["upgradePauseEndTimestampUtc"]),
    waveUpgradePaused: item["waveUpgradePaused"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArrayDeserializer(item["notifications"]),
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
  };
}

export function _clusterUpdateParametersPropertiesSerializer(item: ClusterUpdateParameters): any {
  return {
    addOnFeatures: !item["addOnFeatures"]
      ? item["addOnFeatures"]
      : item["addOnFeatures"].map((p: any) => {
          return p;
        }),
    certificate: !item["certificate"]
      ? item["certificate"]
      : certificateDescriptionSerializer(item["certificate"]),
    certificateCommonNames: !item["certificateCommonNames"]
      ? item["certificateCommonNames"]
      : serverCertificateCommonNamesSerializer(item["certificateCommonNames"]),
    clientCertificateCommonNames: !item["clientCertificateCommonNames"]
      ? item["clientCertificateCommonNames"]
      : clientCertificateCommonNameArraySerializer(item["clientCertificateCommonNames"]),
    clientCertificateThumbprints: !item["clientCertificateThumbprints"]
      ? item["clientCertificateThumbprints"]
      : clientCertificateThumbprintArraySerializer(item["clientCertificateThumbprints"]),
    clusterCodeVersion: item["clusterCodeVersion"],
    eventStoreServiceEnabled: item["eventStoreServiceEnabled"],
    fabricSettings: !item["fabricSettings"]
      ? item["fabricSettings"]
      : settingsSectionDescriptionArraySerializer(item["fabricSettings"]),
    nodeTypes: !item["nodeTypes"]
      ? item["nodeTypes"]
      : nodeTypeDescriptionArraySerializer(item["nodeTypes"]),
    reliabilityLevel: item["reliabilityLevel"],
    reverseProxyCertificate: !item["reverseProxyCertificate"]
      ? item["reverseProxyCertificate"]
      : certificateDescriptionSerializer(item["reverseProxyCertificate"]),
    upgradeDescription: !item["upgradeDescription"]
      ? item["upgradeDescription"]
      : clusterUpgradePolicySerializer(item["upgradeDescription"]),
    applicationTypeVersionsCleanupPolicy: !item["applicationTypeVersionsCleanupPolicy"]
      ? item["applicationTypeVersionsCleanupPolicy"]
      : applicationTypeVersionsCleanupPolicySerializer(
          item["applicationTypeVersionsCleanupPolicy"],
        ),
    upgradeMode: item["upgradeMode"],
    sfZonalUpgradeMode: item["sfZonalUpgradeMode"],
    vmssZonalUpgradeMode: item["vmssZonalUpgradeMode"],
    infrastructureServiceManager: item["infrastructureServiceManager"],
    upgradeWave: item["upgradeWave"],
    upgradePauseStartTimestampUtc: !item["upgradePauseStartTimestampUtc"]
      ? item["upgradePauseStartTimestampUtc"]
      : item["upgradePauseStartTimestampUtc"].toISOString(),
    upgradePauseEndTimestampUtc: !item["upgradePauseEndTimestampUtc"]
      ? item["upgradePauseEndTimestampUtc"]
      : item["upgradePauseEndTimestampUtc"].toISOString(),
    waveUpgradePaused: item["waveUpgradePaused"],
    notifications: !item["notifications"]
      ? item["notifications"]
      : notificationArraySerializer(item["notifications"]),
    enableHttpGatewayExclusiveAuthMode: item["enableHttpGatewayExclusiveAuthMode"],
  };
}

export function _applicationTypeResourcePropertiesSerializer(_item: ApplicationTypeResource): any {
  return {};
}

export function _applicationTypeResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
  };
}

export function _applicationTypeVersionResourcePropertiesSerializer(
  item: ApplicationTypeVersionResource,
): any {
  return { appPackageUrl: item["appPackageUrl"] };
}

export function _applicationTypeVersionResourcePropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    appPackageUrl: item["appPackageUrl"],
    defaultParameterList: !item["defaultParameterList"]
      ? item["defaultParameterList"]
      : Object.fromEntries(
          Object.entries(item["defaultParameterList"]).map(([k, p]: [string, any]) => [k, p]),
        ),
  };
}

export function _applicationResourcePropertiesSerializer(item: ApplicationResource): any {
  return {
    typeVersion: item["typeVersion"],
    parameters: item["parameters"],
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicySerializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArraySerializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArraySerializer(item["managedIdentities"]),
    typeName: item["typeName"],
  };
}

export function _applicationResourcePropertiesDeserializer(item: any) {
  return {
    typeVersion: item["typeVersion"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicyDeserializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArrayDeserializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArrayDeserializer(item["managedIdentities"]),
    provisioningState: item["provisioningState"],
    typeName: item["typeName"],
  };
}

export function _applicationResourceUpdatePropertiesSerializer(
  item: ApplicationResourceUpdate,
): any {
  return {
    typeVersion: item["typeVersion"],
    parameters: item["parameters"],
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicySerializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArraySerializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArraySerializer(item["managedIdentities"]),
  };
}

export function _applicationResourceUpdatePropertiesDeserializer(item: any) {
  return {
    typeVersion: item["typeVersion"],
    parameters: !item["parameters"]
      ? item["parameters"]
      : Object.fromEntries(
          Object.entries(item["parameters"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    upgradePolicy: !item["upgradePolicy"]
      ? item["upgradePolicy"]
      : applicationUpgradePolicyDeserializer(item["upgradePolicy"]),
    minimumNodes: item["minimumNodes"],
    maximumNodes: item["maximumNodes"],
    removeApplicationCapacity: item["removeApplicationCapacity"],
    metrics: !item["metrics"]
      ? item["metrics"]
      : applicationMetricDescriptionArrayDeserializer(item["metrics"]),
    managedIdentities: !item["managedIdentities"]
      ? item["managedIdentities"]
      : applicationUserAssignedIdentityArrayDeserializer(item["managedIdentities"]),
  };
}

export function _clusterCodeVersionsResultPropertiesDeserializer(item: any) {
  return {
    codeVersion: item["codeVersion"],
    supportExpiryUtc: item["supportExpiryUtc"],
    environment: item["environment"],
  };
}
