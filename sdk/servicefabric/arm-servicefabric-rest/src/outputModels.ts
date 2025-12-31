// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * The cluster resource
 *
 */
export interface ClusterOutput extends ResourceOutput {
  /** The cluster resource properties */
  properties?: ClusterPropertiesOutput;
}

/** Describes the cluster resource properties. */
export interface ClusterPropertiesOutput {
  /** The list of add-on features to enable in the cluster. */
  addOnFeatures?: Array<
    "RepairManager" | "DnsService" | "BackupRestoreService" | "ResourceMonitorService"
  >;
  /** The Service Fabric runtime versions available for this cluster. */
  readonly availableClusterVersions?: Array<ClusterVersionDetailsOutput>;
  /** The AAD authentication settings of the cluster. */
  azureActiveDirectory?: AzureActiveDirectoryOutput;
  /** The certificate to use for securing the cluster. The certificate provided will be used for node to node security within the cluster, SSL certificate for cluster management endpoint and default admin client. */
  certificate?: CertificateDescriptionOutput;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  certificateCommonNames?: ServerCertificateCommonNamesOutput;
  /** The list of client certificates referenced by common name that are allowed to manage the cluster. */
  clientCertificateCommonNames?: Array<ClientCertificateCommonNameOutput>;
  /** The list of client certificates referenced by thumbprint that are allowed to manage the cluster. */
  clientCertificateThumbprints?: Array<ClientCertificateThumbprintOutput>;
  /** The Service Fabric runtime version of the cluster. This property can only by set the user when **upgradeMode** is set to 'Manual'. To get list of available Service Fabric versions for new clusters use [ClusterVersion API](./ClusterVersion.md). To get the list of available version for existing clusters use **availableClusterVersions**. */
  clusterCodeVersion?: string;
  /** The Azure Resource Provider endpoint. A system service in the cluster connects to this  endpoint. */
  readonly clusterEndpoint?: string;
  /** A service generated unique identifier for the cluster resource. */
  readonly clusterId?: string;
  /**
   * The current state of the cluster.
   *
   *   - WaitingForNodes - Indicates that the cluster resource is created and the resource provider is waiting for Service Fabric VM extension to boot up and report to it.
   *   - Deploying - Indicates that the Service Fabric runtime is being installed on the VMs. Cluster resource will be in this state until the cluster boots up and system services are up.
   *   - BaselineUpgrade - Indicates that the cluster is upgrading to establishes the cluster version. This upgrade is automatically initiated when the cluster boots up for the first time.
   *   - UpdatingUserConfiguration - Indicates that the cluster is being upgraded with the user provided configuration.
   *   - UpdatingUserCertificate - Indicates that the cluster is being upgraded with the user provided certificate.
   *   - UpdatingInfrastructure - Indicates that the cluster is being upgraded with the latest Service Fabric runtime version. This happens only when the **upgradeMode** is set to 'Automatic'.
   *   - EnforcingClusterVersion - Indicates that cluster is on a different version than expected and the cluster is being upgraded to the expected version.
   *   - UpgradeServiceUnreachable - Indicates that the system service in the cluster is no longer polling the Resource Provider. Clusters in this state cannot be managed by the Resource Provider.
   *   - AutoScale - Indicates that the ReliabilityLevel of the cluster is being adjusted.
   *   - Ready - Indicates that the cluster is in a stable state.
   *
   */
  readonly clusterState?:
    | "WaitingForNodes"
    | "Deploying"
    | "BaselineUpgrade"
    | "UpdatingUserConfiguration"
    | "UpdatingUserCertificate"
    | "UpdatingInfrastructure"
    | "EnforcingClusterVersion"
    | "UpgradeServiceUnreachable"
    | "AutoScale"
    | "Ready";
  /** The storage account information for storing Service Fabric diagnostic logs. */
  diagnosticsStorageAccountConfig?: DiagnosticsStorageAccountConfigOutput;
  /** Indicates if the event store service is enabled. */
  eventStoreServiceEnabled?: boolean;
  /** The list of custom fabric settings to configure the cluster. */
  fabricSettings?: Array<SettingsSectionDescriptionOutput>;
  /** The http management endpoint of the cluster. */
  managementEndpoint: string;
  /** The list of node types in the cluster. */
  nodeTypes: Array<NodeTypeDescriptionOutput>;
  /** The provisioning state of the cluster resource. */
  readonly provisioningState?: "Updating" | "Succeeded" | "Failed" | "Canceled";
  /**
   * The reliability level sets the replica set size of system services. Learn about [ReliabilityLevel](https://docs.microsoft.com/azure/service-fabric/service-fabric-cluster-capacity).
   *
   *   - None - Run the System services with a target replica set count of 1. This should only be used for test clusters.
   *   - Bronze - Run the System services with a target replica set count of 3. This should only be used for test clusters.
   *   - Silver - Run the System services with a target replica set count of 5.
   *   - Gold - Run the System services with a target replica set count of 7.
   *   - Platinum - Run the System services with a target replica set count of 9.
   *
   */
  reliabilityLevel?: "None" | "Bronze" | "Silver" | "Gold" | "Platinum";
  /** The server certificate used by reverse proxy. */
  reverseProxyCertificate?: CertificateDescriptionOutput;
  /** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
  reverseProxyCertificateCommonNames?: ServerCertificateCommonNamesOutput;
  /** The policy to use when upgrading the cluster. */
  upgradeDescription?: ClusterUpgradePolicyOutput;
  /** The upgrade mode of the cluster when new Service Fabric runtime version is available. */
  upgradeMode?: "Automatic" | "Manual";
  /** The policy used to clean up unused versions. */
  applicationTypeVersionsCleanupPolicy?: ApplicationTypeVersionsCleanupPolicyOutput;
  /** The VM image VMSS has been configured with. Generic names such as Windows or Linux can be used. */
  vmImage?: string;
  /** This property controls the logical grouping of VMs in upgrade domains (UDs). This property can't be modified if a node type with multiple Availability Zones is already present in the cluster. */
  sfZonalUpgradeMode?: "Parallel" | "Hierarchical";
  /** This property defines the upgrade mode for the virtual machine scale set, it is mandatory if a node type with multiple Availability Zones is added. */
  vmssZonalUpgradeMode?: "Parallel" | "Hierarchical";
  /** Indicates if infrastructure service manager is enabled. */
  infrastructureServiceManager?: boolean;
  /** Indicates when new cluster runtime version upgrades will be applied after they are released. By default is Wave0. Only applies when **upgradeMode** is set to 'Automatic'. */
  upgradeWave?: "Wave0" | "Wave1" | "Wave2";
  /** Indicates the start date and time to pause automatic runtime version upgrades on the cluster for an specific period of time on the cluster (UTC). */
  upgradePauseStartTimestampUtc?: string;
  /** Indicates the end date and time to pause automatic runtime version upgrades on the cluster for an specific period of time on the cluster (UTC). */
  upgradePauseEndTimestampUtc?: string;
  /** Boolean to pause automatic runtime version upgrades to the cluster. */
  waveUpgradePaused?: boolean;
  /** Indicates a list of notification channels for cluster events. */
  notifications?: Array<NotificationOutput>;
}

/** The detail of the Service Fabric runtime version result */
export interface ClusterVersionDetailsOutput {
  /** The Service Fabric runtime version of the cluster. */
  codeVersion?: string;
  /** The date of expiry of support of the version. */
  supportExpiryUtc?: string;
  /** Indicates if this version is for Windows or Linux operating system. */
  environment?: "Windows" | "Linux";
}

/** The settings to enable AAD authentication on the cluster. */
export interface AzureActiveDirectoryOutput {
  /** Azure active directory tenant id. */
  tenantId?: string;
  /** Azure active directory cluster application id. */
  clusterApplication?: string;
  /** Azure active directory client application id. */
  clientApplication?: string;
}

/** Describes the certificate details. */
export interface CertificateDescriptionOutput {
  /** Thumbprint of the primary certificate. */
  thumbprint: string;
  /** Thumbprint of the secondary certificate. */
  thumbprintSecondary?: string;
  /** The local certificate store location. */
  x509StoreName?:
    | "AddressBook"
    | "AuthRoot"
    | "CertificateAuthority"
    | "Disallowed"
    | "My"
    | "Root"
    | "TrustedPeople"
    | "TrustedPublisher";
}

/** Describes a list of server certificates referenced by common name that are used to secure the cluster. */
export interface ServerCertificateCommonNamesOutput {
  /** The list of server certificates referenced by common name that are used to secure the cluster. */
  commonNames?: Array<ServerCertificateCommonNameOutput>;
  /** The local certificate store location. */
  x509StoreName?:
    | "AddressBook"
    | "AuthRoot"
    | "CertificateAuthority"
    | "Disallowed"
    | "My"
    | "Root"
    | "TrustedPeople"
    | "TrustedPublisher";
}

/** Describes the server certificate details using common name. */
export interface ServerCertificateCommonNameOutput {
  /** The common name of the server certificate. */
  certificateCommonName: string;
  /** The issuer thumbprint of the server certificate. */
  certificateIssuerThumbprint: string;
}

/** Describes the client certificate details using common name. */
export interface ClientCertificateCommonNameOutput {
  /** Indicates if the client certificate has admin access to the cluster. Non admin clients can perform only read only operations on the cluster. */
  isAdmin: boolean;
  /** The common name of the client certificate. */
  certificateCommonName: string;
  /** The issuer thumbprint of the client certificate. */
  certificateIssuerThumbprint: string;
}

/** Describes the client certificate details using thumbprint. */
export interface ClientCertificateThumbprintOutput {
  /** Indicates if the client certificate has admin access to the cluster. Non admin clients can perform only read only operations on the cluster. */
  isAdmin: boolean;
  /** The thumbprint of the client certificate. */
  certificateThumbprint: string;
}

/** The storage account information for storing Service Fabric diagnostic logs. */
export interface DiagnosticsStorageAccountConfigOutput {
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

/** Describes a section in the fabric settings of the cluster. */
export interface SettingsSectionDescriptionOutput {
  /** The section name of the fabric settings. */
  name: string;
  /** The collection of parameters in the section. */
  parameters: Array<SettingsParameterDescriptionOutput>;
}

/** Describes a parameter in fabric settings of the cluster. */
export interface SettingsParameterDescriptionOutput {
  /** The parameter name of fabric setting. */
  name: string;
  /** The parameter value of fabric setting. */
  value: string;
}

/** Describes a node type in the cluster, each node type represents sub set of nodes in the cluster. */
export interface NodeTypeDescriptionOutput {
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
   *   - Bronze - No privileges. This is the default.
   *   - Silver - The infrastructure jobs can be paused for a duration of 10 minutes per UD.
   *   - Gold - The infrastructure jobs can be paused for a duration of 2 hours per UD. Gold durability can be enabled only on full node VM skus like D15_V2, G5 etc.
   *
   */
  durabilityLevel?: "Bronze" | "Silver" | "Gold";
  /** The range of ports from which cluster assigned port to Service Fabric applications. */
  applicationPorts?: EndpointRangeDescriptionOutput;
  /** The range of ephemeral ports that nodes in this node type should be configured with. */
  ephemeralPorts?: EndpointRangeDescriptionOutput;
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
}

/** Port range details */
export interface EndpointRangeDescriptionOutput {
  /** Starting port of a range of ports */
  startPort: number;
  /** End port of a range of ports */
  endPort: number;
}

/** Describes the policy used when upgrading the cluster. */
export interface ClusterUpgradePolicyOutput {
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
  healthPolicy: ClusterHealthPolicyOutput;
  /** The cluster delta health policy used when upgrading the cluster. */
  deltaHealthPolicy?: ClusterUpgradeDeltaHealthPolicyOutput;
}

/**
 * Defines a health policy used to evaluate the health of the cluster or of a cluster node.
 *
 */
export interface ClusterHealthPolicyOutput {
  /**
   * The maximum allowed percentage of unhealthy nodes before reporting an error. For example, to allow 10% of nodes to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of nodes that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy node, the health is evaluated as Warning.
   * The percentage is calculated by dividing the number of unhealthy nodes over the total number of nodes in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   *
   * In large clusters, some nodes will always be down or out for repairs, so this percentage should be configured to tolerate that.
   *
   */
  maxPercentUnhealthyNodes?: number;
  /**
   * The maximum allowed percentage of unhealthy applications before reporting an error. For example, to allow 10% of applications to be unhealthy, this value would be 10.
   *
   * The percentage represents the maximum tolerated percentage of applications that can be unhealthy before the cluster is considered in error.
   * If the percentage is respected but there is at least one unhealthy application, the health is evaluated as Warning.
   * This is calculated by dividing the number of unhealthy applications over the total number of application instances in the cluster, excluding applications of application types that are included in the ApplicationTypeHealthPolicyMap.
   * The computation rounds up to tolerate one failure on small numbers of applications. Default percentage is zero.
   *
   */
  maxPercentUnhealthyApplications?: number;
  /** Defines the application health policy map used to evaluate the health of an application or one of its children entities. */
  applicationHealthPolicies?: Record<string, ApplicationHealthPolicyOutput>;
}

/**
 * Defines a health policy used to evaluate the health of an application or one of its children entities.
 *
 */
export interface ApplicationHealthPolicyOutput {
  /** The health policy used by default to evaluate the health of a service type. */
  defaultServiceTypeHealthPolicy?: ServiceTypeHealthPolicyOutput;
  /** The map with service type health policy per service type name. The map is empty by default. */
  serviceTypeHealthPolicies?: Record<string, ServiceTypeHealthPolicyOutput>;
}

/**
 * Represents the health policy used to evaluate the health of services belonging to a service type.
 *
 */
export interface ServiceTypeHealthPolicyOutput {
  /**
   * The maximum percentage of services allowed to be unhealthy before your application is considered in error.
   *
   */
  maxPercentUnhealthyServices?: number;
}

/** Describes the delta health policies for the cluster upgrade. */
export interface ClusterUpgradeDeltaHealthPolicyOutput {
  /**
   * The maximum allowed percentage of nodes health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the nodes at the beginning of upgrade and the state of the nodes at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits.
   *
   */
  maxPercentDeltaUnhealthyNodes: number;
  /**
   * The maximum allowed percentage of upgrade domain nodes health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the upgrade domain nodes at the beginning of upgrade and the state of the upgrade domain nodes at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion for all completed upgrade domains to make sure the state of the upgrade domains is within tolerated limits.
   *
   */
  maxPercentUpgradeDomainDeltaUnhealthyNodes: number;
  /**
   * The maximum allowed percentage of applications health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the applications at the beginning of upgrade and the state of the applications at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits. System services are not included in this.
   *
   */
  maxPercentDeltaUnhealthyApplications: number;
  /** Defines the application delta health policy map used to evaluate the health of an application or one of its child entities when upgrading the cluster. */
  applicationDeltaHealthPolicies?: Record<string, ApplicationDeltaHealthPolicyOutput>;
}

/**
 * Defines a delta health policy used to evaluate the health of an application or one of its child entities when upgrading the cluster.
 *
 */
export interface ApplicationDeltaHealthPolicyOutput {
  /** The delta health policy used by default to evaluate the health of a service type when upgrading the cluster. */
  defaultServiceTypeDeltaHealthPolicy?: ServiceTypeDeltaHealthPolicyOutput;
  /** The map with service type delta health policy per service type name. The map is empty by default. */
  serviceTypeDeltaHealthPolicies?: Record<string, ServiceTypeDeltaHealthPolicyOutput>;
}

/**
 * Represents the delta health policy used to evaluate the health of services belonging to a service type when upgrading the cluster.
 *
 */
export interface ServiceTypeDeltaHealthPolicyOutput {
  /**
   * The maximum allowed percentage of services health degradation allowed during cluster upgrades.
   * The delta is measured between the state of the services at the beginning of upgrade and the state of the services at the time of the health evaluation.
   * The check is performed after every upgrade domain upgrade completion to make sure the global state of the cluster is within tolerated limits.
   *
   */
  maxPercentDeltaUnhealthyServices?: number;
}

export interface ApplicationTypeVersionsCleanupPolicyOutput {
  /** Number of unused versions per application type to keep. */
  maxUnusedVersionsToKeep: number;
}

/** Describes the notification channel for cluster events. */
export interface NotificationOutput {
  /** Indicates if the notification is enabled. */
  isEnabled: boolean;
  /** The category of notification. */
  notificationCategory: "WaveProgress";
  /** The level of notification. */
  notificationLevel: "Critical" | "All";
  /** List of targets that subscribe to the notification. */
  notificationTargets: Array<NotificationTargetOutput>;
}

/** Describes the notification target properties. */
export interface NotificationTargetOutput {
  /** The notification channel indicates the type of receivers subscribed to the notification, either user or subscription. */
  notificationChannel: "EmailUser" | "EmailSubscription";
  /** List of targets that subscribe to the notification. */
  receivers: Array<string>;
}

/** The resource model definition. */
export interface ResourceOutput {
  /** Azure resource identifier. */
  readonly id?: string;
  /** Azure resource name. */
  readonly name?: string;
  /** Azure resource type. */
  readonly type?: string;
  /** Azure resource location. */
  location: string;
  /** Azure resource tags. */
  tags?: Record<string, string>;
  /** Azure resource etag. */
  readonly etag?: string;
  /** Metadata pertaining to creation and last modification of the resource. */
  readonly systemData?: SystemDataOutput;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: string;
  /** The timestamp of resource creation (UTC). */
  createdAt?: string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: string;
  /** The timestamp of resource last modification (UTC). */
  lastModifiedAt?: string;
}

/** The structure of the error. */
export interface ErrorModelOutput {
  /** The error details. */
  error?: ErrorModelErrorOutput;
}

/** The error details. */
export interface ErrorModelErrorOutput {
  /** The error code. */
  code?: string;
  /** The error message. */
  message?: string;
}

/** Cluster list results */
export interface ClusterListResultOutput {
  value?: Array<ClusterOutput>;
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

/** The list results of the Service Fabric runtime versions. */
export interface ClusterCodeVersionsListResultOutput {
  value?: Array<ClusterCodeVersionsResultOutput>;
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

/** The result of the Service Fabric runtime versions */
export interface ClusterCodeVersionsResultOutput {
  /** The identification of the result */
  id?: string;
  /** The name of the result */
  name?: string;
  /** The result resource type */
  type?: string;
  /** The detail of the Service Fabric runtime version result */
  properties?: ClusterVersionDetailsOutput;
}

/** The list of intermediate cluster code versions for an upgrade or downgrade. Or minimum and maximum upgradable version if no target was given */
export interface UpgradableVersionPathResultOutput {
  supportedPath?: Array<string>;
}

/** Describes the result of the request to list Service Fabric resource provider operations. */
export interface OperationListResultOutput {
  /** List of operations supported by the Service Fabric resource provider. */
  value?: Array<OperationResultOutput>;
  /** URL to get the next set of operation list results if there are any. */
  readonly nextLink?: string;
}

/** Available operation list result */
export interface OperationResultOutput {
  /** The name of the operation. */
  name?: string;
  /** Indicates whether the operation is a data action */
  isDataAction?: boolean;
  /** The object that represents the operation. */
  display?: AvailableOperationDisplayOutput;
  /** Origin result */
  origin?: string;
  /** The URL to use for getting the next set of results. */
  nextLink?: string;
}

/** Operation supported by the Service Fabric resource provider */
export interface AvailableOperationDisplayOutput {
  /** The name of the provider. */
  provider?: string;
  /** The resource on which the operation is performed */
  resource?: string;
  /** The operation that can be performed. */
  operation?: string;
  /** Operation description */
  description?: string;
}

/** The application type name resource */
export interface ApplicationTypeResourceOutput extends ProxyResourceOutput {
  /** The application type name properties */
  properties?: ApplicationTypeResourcePropertiesOutput;
}

/** The application type name properties */
export interface ApplicationTypeResourcePropertiesOutput {
  /** The current deployment or provisioning state, which only appears in the response. */
  readonly provisioningState?: string;
}

/** The resource model definition for proxy-only resource. */
export interface ProxyResourceOutput {
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
  readonly systemData?: SystemDataOutput;
}

/** The list of application type names. */
export interface ApplicationTypeResourceListOutput {
  value?: Array<ApplicationTypeResourceOutput>;
  /** URL to get the next set of application type list results if there are any. */
  readonly nextLink?: string;
}

/** An application type version resource for the specified application type name resource. */
export interface ApplicationTypeVersionResourceOutput extends ProxyResourceOutput {
  /** The properties of the application type version resource. */
  properties?: ApplicationTypeVersionResourcePropertiesOutput;
}

/** The properties of the application type version resource. */
export interface ApplicationTypeVersionResourcePropertiesOutput {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The URL to the application package */
  appPackageUrl: string;
  /** List of application type parameters that can be overridden when creating or updating the application. */
  readonly defaultParameterList?: Record<string, string>;
}

/** The list of application type version resources for the specified application type name resource. */
export interface ApplicationTypeVersionResourceListOutput {
  value?: Array<ApplicationTypeVersionResourceOutput>;
  /** URL to get the next set of application type version list results if there are any. */
  readonly nextLink?: string;
}

/** The application resource. */
export interface ApplicationResourceOutput extends ProxyResourceOutput {
  /** Describes the managed identities for an Azure resource. */
  identity?: ManagedIdentityOutput;
  /** The application resource properties. */
  properties?: ApplicationResourcePropertiesOutput;
}

/** Describes the managed identities for an Azure resource. */
export interface ManagedIdentityOutput {
  /** The principal id of the managed identity. This property will only be provided for a system assigned identity. */
  readonly principalId?: string;
  /** The tenant id of the managed identity. This property will only be provided for a system assigned identity. */
  readonly tenantId?: string;
  /** The type of managed identity for the resource. */
  type?: "SystemAssigned" | "UserAssigned" | "SystemAssigned, UserAssigned" | "None";
  /**
   * The list of user identities associated with the resource. The user identity dictionary key references will be ARM resource ids in the form:
   * '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'.
   *
   */
  userAssignedIdentities?: Record<string, UserAssignedIdentityOutput>;
}

export interface UserAssignedIdentityOutput {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

/** The application resource properties. */
export interface ApplicationResourcePropertiesOutput extends ApplicationResourceUpdatePropertiesOutput {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The application type name as defined in the application manifest. */
  typeName?: string;
}

/** The application resource properties for patch operations. */
export interface ApplicationResourceUpdatePropertiesOutput {
  /** The version of the application type as defined in the application manifest. */
  typeVersion?: string;
  /** List of application parameters with overridden values from their default values specified in the application manifest. */
  parameters?: Record<string, string>;
  /** Describes the policy for a monitored application upgrade. */
  upgradePolicy?: ApplicationUpgradePolicyOutput;
  /** The minimum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. If this property is set to zero, no capacity will be reserved. The value of this property cannot be more than the value of the MaximumNodes property. */
  minimumNodes?: number;
  /** The maximum number of nodes where Service Fabric will reserve capacity for this application. Note that this does not mean that the services of this application will be placed on all of those nodes. By default, the value of this property is zero and it means that the services can be placed on any node. */
  maximumNodes?: number;
  /** Remove the current application capacity settings. */
  removeApplicationCapacity?: boolean;
  /** List of application capacity metric description. */
  metrics?: Array<ApplicationMetricDescriptionOutput>;
  /** List of user assigned identities for the application, each mapped to a friendly name. */
  managedIdentities?: Array<ApplicationUserAssignedIdentityOutput>;
}

/** Describes the policy for a monitored application upgrade. */
export interface ApplicationUpgradePolicyOutput {
  /** The maximum amount of time to block processing of an upgrade domain and prevent loss of availability when there are unexpected issues. When this timeout expires, processing of the upgrade domain will proceed regardless of availability loss issues. The timeout is reset at the start of each upgrade domain. Valid values are between 0 and 42949672925 inclusive. (unsigned 32-bit integer). */
  upgradeReplicaSetCheckTimeout?: string;
  /** If true, then processes are forcefully restarted during upgrade even when the code version has not changed (the upgrade only changes configuration or data). */
  forceRestart?: boolean;
  /** The policy used for monitoring the application upgrade */
  rollingUpgradeMonitoringPolicy?: ArmRollingUpgradeMonitoringPolicyOutput;
  /**
   * Defines a health policy used to evaluate the health of an application or one of its children entities.
   *
   */
  applicationHealthPolicy?: ArmApplicationHealthPolicyOutput;
  /** The mode used to monitor health during a rolling upgrade. The values are UnmonitoredAuto, UnmonitoredManual, and Monitored. */
  upgradeMode?: "Invalid" | "UnmonitoredAuto" | "UnmonitoredManual" | "Monitored";
  /** Determines whether the application should be recreated on update. If value=true, the rest of the upgrade policy parameters are not allowed and it will result in availability loss. */
  recreateApplication?: boolean;
}

/** The policy used for monitoring the application upgrade */
export interface ArmRollingUpgradeMonitoringPolicyOutput {
  /** The activation Mode of the service package */
  failureAction?: "Rollback" | "Manual";
  /** The amount of time to wait after completing an upgrade domain before applying health policies. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  healthCheckWaitDuration?: string;
  /** The amount of time that the application or cluster must remain healthy before the upgrade proceeds to the next upgrade domain. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  healthCheckStableDuration?: string;
  /** The amount of time to retry health evaluation when the application or cluster is unhealthy before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  healthCheckRetryTimeout?: string;
  /** The amount of time the overall upgrade has to complete before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  upgradeTimeout?: string;
  /** The amount of time each upgrade domain has to complete before FailureAction is executed. It is first interpreted as a string representing an ISO 8601 duration. If that fails, then it is interpreted as a number representing the total number of milliseconds. */
  upgradeDomainTimeout?: string;
}

/**
 * Defines a health policy used to evaluate the health of an application or one of its children entities.
 *
 */
export interface ArmApplicationHealthPolicyOutput {
  /** Indicates whether warnings are treated with the same severity as errors. */
  considerWarningAsError?: boolean;
  /**
   * The maximum allowed percentage of unhealthy deployed applications. Allowed values are Byte values from zero to 100.
   * The percentage represents the maximum tolerated percentage of deployed applications that can be unhealthy before the application is considered in error.
   * This is calculated by dividing the number of unhealthy deployed applications over the number of nodes where the application is currently deployed on in the cluster.
   * The computation rounds up to tolerate one failure on small numbers of nodes. Default percentage is zero.
   *
   */
  maxPercentUnhealthyDeployedApplications?: number;
  /** The health policy used by default to evaluate the health of a service type. */
  defaultServiceTypeHealthPolicy?: ArmServiceTypeHealthPolicyOutput;
  /** The map with service type health policy per service type name. The map is empty by default. */
  serviceTypeHealthPolicyMap?: Record<string, ArmServiceTypeHealthPolicyOutput>;
}

/**
 * Represents the health policy used to evaluate the health of services belonging to a service type.
 *
 */
export interface ArmServiceTypeHealthPolicyOutput {
  /**
   * The maximum percentage of services allowed to be unhealthy before your application is considered in error.
   *
   */
  maxPercentUnhealthyServices?: number;
  /**
   * The maximum percentage of partitions per service allowed to be unhealthy before your application is considered in error.
   *
   */
  maxPercentUnhealthyPartitionsPerService?: number;
  /**
   * The maximum percentage of replicas per partition allowed to be unhealthy before your application is considered in error.
   *
   */
  maxPercentUnhealthyReplicasPerPartition?: number;
}

/**
 * Describes capacity information for a custom resource balancing metric. This can be used to limit the total consumption of this metric by the services of this application.
 *
 */
export interface ApplicationMetricDescriptionOutput {
  /** The name of the metric. */
  name?: string;
  /**
   * The maximum node capacity for Service Fabric application.
   * This is the maximum Load for an instance of this application on a single node. Even if the capacity of node is greater than this value, Service Fabric will limit the total load of services within the application on each node to this value.
   * If set to zero, capacity for this metric is unlimited on each node.
   * When creating a new application with application capacity defined, the product of MaximumNodes and this value must always be smaller than or equal to TotalApplicationCapacity.
   * When updating existing application with application capacity, the product of MaximumNodes and this value must always be smaller than or equal to TotalApplicationCapacity.
   *
   */
  maximumCapacity?: number;
  /**
   * The node reservation capacity for Service Fabric application.
   * This is the amount of load which is reserved on nodes which have instances of this application.
   * If MinimumNodes is specified, then the product of these values will be the capacity reserved in the cluster for the application.
   * If set to zero, no capacity is reserved for this metric.
   * When setting application capacity or when updating application capacity; this value must be smaller than or equal to MaximumCapacity for each metric.
   *
   */
  reservationCapacity?: number;
  /**
   * The total metric capacity for Service Fabric application.
   * This is the total metric capacity for this application in the cluster. Service Fabric will try to limit the sum of loads of services within the application to this value.
   * When creating a new application with application capacity defined, the product of MaximumNodes and MaximumCapacity must always be smaller than or equal to this value.
   *
   */
  totalApplicationCapacity?: number;
}

export interface ApplicationUserAssignedIdentityOutput {
  /** The friendly name of user assigned identity. */
  name: string;
  /** The principal id of user assigned identity. */
  principalId: string;
}

/** The application resource for patch operations. */
export interface ApplicationResourceUpdateOutput extends ProxyResourceOutput {
  /** The application resource properties for patch operations. */
  properties?: ApplicationResourceUpdatePropertiesOutput;
}

/** The list of application resources. */
export interface ApplicationResourceListOutput {
  value?: Array<ApplicationResourceOutput>;
  /** URL to get the next set of application list results if there are any. */
  readonly nextLink?: string;
}

/** The service resource. */
export interface ServiceResourceOutput extends ProxyResourceOutput {
  /** The service resource properties. */
  properties?: ServiceResourcePropertiesOutput;
}

/** The service resource properties. */
export interface ServiceResourcePropertiesOutputParent extends ServiceResourcePropertiesBaseOutput {
  /** The current deployment or provisioning state, which only appears in the response */
  readonly provisioningState?: string;
  /** The name of the service type */
  serviceTypeName?: string;
  /** Describes how the service is partitioned. */
  partitionDescription?: PartitionSchemeDescriptionOutput;
  /** The activation Mode of the service package */
  servicePackageActivationMode?: "SharedProcess" | "ExclusiveProcess";
  /** Dns name used for the service. If this is specified, then the service can be accessed via its DNS name instead of service name. */
  serviceDnsName?: string;
  serviceKind: "ServiceResourceProperties" | "Stateful" | "Stateless";
}

/** Describes how the service is partitioned. */
export interface PartitionSchemeDescriptionOutputParent {
  partitionScheme: "PartitionSchemeDescription" | "Named" | "Singleton" | "UniformInt64Range";
}

/** The common service resource properties. */
export interface ServiceResourcePropertiesBaseOutput {
  /** The placement constraints as a string. Placement constraints are boolean expressions on node properties and allow for restricting a service to particular nodes based on the service requirements. For example, to place a service on nodes where NodeType is blue specify the following: "NodeColor == blue)". */
  placementConstraints?: string;
  /** A list that describes the correlation of the service with other services. */
  correlationScheme?: Array<ServiceCorrelationDescriptionOutput>;
  /** The service load metrics is given as an array of ServiceLoadMetricDescription objects. */
  serviceLoadMetrics?: Array<ServiceLoadMetricDescriptionOutput>;
  /** A list that describes the correlation of the service with other services. */
  servicePlacementPolicies?: Array<ServicePlacementPolicyDescriptionOutput>;
  /** Specifies the move cost for the service. */
  defaultMoveCost?: "Zero" | "Low" | "Medium" | "High";
}

/** Creates a particular correlation between services. */
export interface ServiceCorrelationDescriptionOutput {
  /** The ServiceCorrelationScheme which describes the relationship between this service and the service specified via ServiceName. */
  scheme: "Invalid" | "Affinity" | "AlignedAffinity" | "NonAlignedAffinity";
  /** The name of the service that the correlation relationship is established with. */
  serviceName: string;
}

/** Specifies a metric to load balance a service during runtime. */
export interface ServiceLoadMetricDescriptionOutput {
  /** The name of the metric. If the service chooses to report load during runtime, the load metric name should match the name that is specified in Name exactly. Note that metric names are case sensitive. */
  name: string;
  /** The service load metric relative weight, compared to other metrics configured for this service, as a number. */
  weight?: "Zero" | "Low" | "Medium" | "High";
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Primary replica. */
  primaryDefaultLoad?: number;
  /** Used only for Stateful services. The default amount of load, as a number, that this service creates for this metric when it is a Secondary replica. */
  secondaryDefaultLoad?: number;
  /** Used only for Stateless services. The default amount of load, as a number, that this service creates for this metric. */
  defaultLoad?: number;
}

/** Describes the policy to be used for placement of a Service Fabric service. */
export interface ServicePlacementPolicyDescriptionOutput {
  type: "ServicePlacementPolicyDescription";
}

/** The service resource for patch operations. */
export interface ServiceResourceUpdateOutput extends ProxyResourceOutput {
  /** The service resource properties for patch operations. */
  properties?: ServiceResourceUpdatePropertiesOutput;
}

/** The service resource properties for patch operations. */
export interface ServiceResourceUpdatePropertiesOutputParent extends ServiceResourcePropertiesBaseOutput {
  serviceKind: "ServiceResourceUpdateProperties" | "Stateful" | "Stateless";
}

/** The list of service resources. */
export interface ServiceResourceListOutput {
  value?: Array<ServiceResourceOutput>;
  /** URL to get the next set of service list results if there are any. */
  readonly nextLink?: string;
}

/** Describes the named partition scheme of the service. */
export interface NamedPartitionSchemeDescriptionOutput extends PartitionSchemeDescriptionOutputParent {
  /** The number of partitions. */
  count: number;
  /** Array of size specified by the ‘count’ parameter, for the names of the partitions. */
  names: Array<string>;
  partitionScheme: "Named";
}

/** SingletonPartitionSchemeDescription */
export interface SingletonPartitionSchemeDescriptionOutput extends PartitionSchemeDescriptionOutputParent {
  partitionScheme: "Singleton";
}

/** The properties of a stateful service resource. */
export interface StatefulServicePropertiesOutput extends ServiceResourcePropertiesOutputParent {
  /** A flag indicating whether this is a persistent service which stores states on the local disk. If it is then the value of this property is true, if not it is false. */
  hasPersistedState?: boolean;
  /** The target replica set size as a number. */
  targetReplicaSetSize?: number;
  /** The minimum replica set size as a number. */
  minReplicaSetSize?: number;
  /** The duration between when a replica goes down and when a new replica is created, represented in ISO 8601 format (hh:mm:ss.s). */
  replicaRestartWaitDuration?: string;
  /** The maximum duration for which a partition is allowed to be in a state of quorum loss, represented in ISO 8601 format (hh:mm:ss.s). */
  quorumLossWaitDuration?: string;
  /** The definition on how long StandBy replicas should be maintained before being removed, represented in ISO 8601 format (hh:mm:ss.s). */
  standByReplicaKeepDuration?: string;
  serviceKind: "Stateful";
}

/** The properties of a stateful service resource for patch operations. */
export interface StatefulServiceUpdatePropertiesOutput extends ServiceResourceUpdatePropertiesOutputParent {
  /** The target replica set size as a number. */
  targetReplicaSetSize?: number;
  /** The minimum replica set size as a number. */
  minReplicaSetSize?: number;
  /** The duration between when a replica goes down and when a new replica is created, represented in ISO 8601 format (hh:mm:ss.s). */
  replicaRestartWaitDuration?: string;
  /** The maximum duration for which a partition is allowed to be in a state of quorum loss, represented in ISO 8601 format (hh:mm:ss.s). */
  quorumLossWaitDuration?: string;
  /** The definition on how long StandBy replicas should be maintained before being removed, represented in ISO 8601 format (hh:mm:ss.s). */
  standByReplicaKeepDuration?: string;
  serviceKind: "Stateful";
}

/** The properties of a stateless service resource. */
export interface StatelessServicePropertiesOutput extends ServiceResourcePropertiesOutputParent {
  /** The instance count. */
  instanceCount?: number;
  /** Delay duration for RequestDrain feature to ensures that the endpoint advertised by the stateless instance is removed before the delay starts prior to closing the instance. This delay enables existing requests to drain gracefully before the instance actually goes down (https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-upgrade-advanced#avoid-connection-drops-during-stateless-service-planned-downtime-preview). It is represented in ISO 8601 format (hh:mm:ss.s). */
  instanceCloseDelayDuration?: string;
  serviceKind: "Stateless";
}

/** The properties of a stateless service resource for patch operations. */
export interface StatelessServiceUpdatePropertiesOutput extends ServiceResourceUpdatePropertiesOutputParent {
  /** The instance count. */
  instanceCount?: number;
  /** Delay duration for RequestDrain feature to ensures that the endpoint advertised by the stateless instance is removed before the delay starts prior to closing the instance. This delay enables existing requests to drain gracefully before the instance actually goes down (https://docs.microsoft.com/en-us/azure/service-fabric/service-fabric-application-upgrade-advanced#avoid-connection-drops-during-stateless-service-planned-downtime-preview). It is first interpreted as a string representing an ISO 8601 duration. It is represented in ISO 8601 format (hh:mm:ss.s). */
  instanceCloseDelayDuration?: string;
  serviceKind: "Stateless";
}

/** Describes a partitioning scheme where an integer range is allocated evenly across a number of partitions. */
export interface UniformInt64RangePartitionSchemeDescriptionOutput extends PartitionSchemeDescriptionOutputParent {
  /** The number of partitions. */
  count: number;
  /**
   * String indicating the lower bound of the partition key range that
   * should be split between the partition ‘count’
   *
   */
  lowKey: string;
  /**
   * String indicating the upper bound of the partition key range that
   * should be split between the partition ‘count’
   *
   */
  highKey: string;
  partitionScheme: "UniformInt64Range";
}

/** The service resource properties. */
export type ServiceResourcePropertiesOutput =
  | StatefulServicePropertiesOutput
  | StatelessServicePropertiesOutput;
/** Describes how the service is partitioned. */
export type PartitionSchemeDescriptionOutput =
  | NamedPartitionSchemeDescriptionOutput
  | SingletonPartitionSchemeDescriptionOutput
  | UniformInt64RangePartitionSchemeDescriptionOutput;
/** The service resource properties for patch operations. */
export type ServiceResourceUpdatePropertiesOutput =
  | StatefulServiceUpdatePropertiesOutput
  | StatelessServiceUpdatePropertiesOutput;
