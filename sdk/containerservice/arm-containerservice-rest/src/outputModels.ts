// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/** The List Operation response. */
export interface OperationListResultOutput {
  /** The list of operations */
  readonly value?: Array<OperationValueOutput>;
}

/** Describes the properties of a Operation value. */
export interface OperationValueOutput {
  /** The origin of the operation. */
  readonly origin?: string;
  /** The name of the operation. */
  readonly name?: string;
  /** Describes the properties of a Operation Value Display. */
  display?: OperationValueDisplayOutput;
}

/** Describes the properties of a Operation Value Display. */
export interface OperationValueDisplayOutput {
  /** The display name of the operation. */
  readonly operation?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
  /** The description of the operation. */
  readonly description?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
}

/** An error response from the Container service. */
export interface CloudErrorOutput {
  /** Details about the error. */
  error?: CloudErrorBodyOutput;
}

/** An error response from the Container service. */
export interface CloudErrorBodyOutput {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: Array<CloudErrorBodyOutput>;
}

/** The OS option profile. */
export interface OSOptionProfileOutput {
  /** The ID of the OS option resource. */
  readonly id?: string;
  /** The name of the OS option resource. */
  readonly name?: string;
  /** The type of the OS option resource. */
  readonly type?: string;
  /** The list of OS options. */
  properties: OSOptionPropertyListOutput;
}

/** The list of OS option properties. */
export interface OSOptionPropertyListOutput {
  /** The list of OS options. */
  osOptionPropertyList: Array<OSOptionPropertyOutput>;
}

/** OS option property. */
export interface OSOptionPropertyOutput {
  /** The OS type. */
  "os-type": string;
  /** Whether the image is FIPS-enabled. */
  "enable-fips-image": boolean;
}

/** The response from the List Managed Clusters operation. */
export interface ManagedClusterListResultOutput {
  /** The list of managed clusters. */
  value?: Array<ManagedClusterOutput>;
  /** The URL to get the next set of managed cluster results. */
  readonly nextLink?: string;
}

/** Managed cluster. */
export interface ManagedClusterOutput extends TrackedResourceOutput {
  /** The managed cluster SKU. */
  sku?: ManagedClusterSKUOutput;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocationOutput;
  /** The identity of the managed cluster, if configured. */
  identity?: ManagedClusterIdentityOutput;
  /** Properties of a managed cluster. */
  properties?: ManagedClusterPropertiesOutput;
}

/** The SKU of a Managed Cluster. */
export interface ManagedClusterSKUOutput {
  /** The name of a managed cluster SKU. */
  name?: "Basic";
  /** If not specified, the default is 'Free'. See [uptime SLA](https://docs.microsoft.com/azure/aks/uptime-sla) for more details. */
  tier?: "Paid" | "Free";
}

/** The complex type of the extended location. */
export interface ExtendedLocationOutput {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: "EdgeZone";
}

/** Identity for the managed cluster. */
export interface ManagedClusterIdentityOutput {
  /** The principal id of the system assigned identity which is used by master components. */
  readonly principalId?: string;
  /** The tenant id of the system assigned identity which is used by master components. */
  readonly tenantId?: string;
  /** For more information see [use managed identities in AKS](https://docs.microsoft.com/azure/aks/use-managed-identity). */
  type?: "SystemAssigned" | "UserAssigned" | "None";
  /** The keys must be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, ManagedServiceIdentityUserAssignedIdentitiesValueOutput>;
}

export interface ManagedServiceIdentityUserAssignedIdentitiesValueOutput {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

/** Properties of the managed cluster. */
export interface ManagedClusterPropertiesOutput {
  /** The current provisioning state. */
  readonly provisioningState?: string;
  /** The Power State of the cluster. */
  readonly powerState?: PowerStateOutput;
  /** CreationData to be used to specify the source Snapshot ID if the cluster will be created/upgraded using a snapshot. */
  creationData?: CreationDataOutput;
  /** The max number of agent pools for the managed cluster. */
  readonly maxAgentPools?: number;
  /** When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details. */
  kubernetesVersion?: string;
  /** The version of Kubernetes the Managed Cluster is running. */
  readonly currentKubernetesVersion?: string;
  /** This cannot be updated once the Managed Cluster has been created. */
  dnsPrefix?: string;
  /** This cannot be updated once the Managed Cluster has been created. */
  fqdnSubdomain?: string;
  /** The FQDN of the master pool. */
  readonly fqdn?: string;
  /** The FQDN of private cluster. */
  readonly privateFQDN?: string;
  /** The Azure Portal requires certain Cross-Origin Resource Sharing (CORS) headers to be sent in some responses, which Kubernetes APIServer doesn't handle by default. This special FQDN supports CORS, allowing the Azure Portal to function properly. */
  readonly azurePortalFQDN?: string;
  /** The agent pool properties. */
  agentPoolProfiles?: Array<ManagedClusterAgentPoolProfileOutput>;
  /** The profile for Linux VMs in the Managed Cluster. */
  linuxProfile?: ContainerServiceLinuxProfileOutput;
  /** The profile for Windows VMs in the Managed Cluster. */
  windowsProfile?: ManagedClusterWindowsProfileOutput;
  /** Information about a service principal identity for the cluster to use for manipulating Azure APIs. */
  servicePrincipalProfile?: ManagedClusterServicePrincipalProfileOutput;
  /** The profile of managed cluster add-on. */
  addonProfiles?: Record<string, ManagedClusterAddonProfileOutput>;
  /** See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on AAD pod identity integration. */
  podIdentityProfile?: ManagedClusterPodIdentityProfileOutput;
  /** The OIDC issuer profile of the Managed Cluster. */
  oidcIssuerProfile?: ManagedClusterOidcIssuerProfileOutput;
  /** The name of the resource group containing agent pool nodes. */
  nodeResourceGroup?: string;
  /** Whether to enable Kubernetes Role-Based Access Control. */
  enableRBAC?: boolean;
  /** (DEPRECATING) Whether to enable Kubernetes pod security policy (preview). This feature is set for removal on October 15th, 2020. Learn more at aka.ms/aks/azpodpolicy. */
  enablePodSecurityPolicy?: boolean;
  /** The default value is false. It can be enabled/disabled on creation and updation of the managed cluster. See [https://aka.ms/NamespaceARMResource](https://aka.ms/NamespaceARMResource) for more details on Namespace as a ARM Resource. */
  enableNamespaceResources?: boolean;
  /** The network configuration profile. */
  networkProfile?: ContainerServiceNetworkProfileOutput;
  /** The Azure Active Directory configuration. */
  aadProfile?: ManagedClusterAADProfileOutput;
  /** The auto upgrade configuration. */
  autoUpgradeProfile?: ManagedClusterAutoUpgradeProfileOutput;
  /** Parameters to be applied to the cluster-autoscaler when enabled */
  autoScalerProfile?: ManagedClusterPropertiesAutoScalerProfileOutput;
  /** The access profile for managed cluster API server. */
  apiServerAccessProfile?: ManagedClusterAPIServerAccessProfileOutput;
  /** This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{encryptionSetName}' */
  diskEncryptionSetID?: string;
  /** Identities associated with the cluster. */
  identityProfile?: Record<string, UserAssignedIdentityOutput>;
  /** Private link resources associated with the cluster. */
  privateLinkResources?: Array<PrivateLinkResourceOutput>;
  /** If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview). */
  disableLocalAccounts?: boolean;
  /** Configurations for provisioning the cluster with HTTP proxy servers. */
  httpProxyConfig?: ManagedClusterHttpProxyConfigOutput;
  /** Security profile for the managed cluster. */
  securityProfile?: ManagedClusterSecurityProfileOutput;
  /** Storage profile for the managed cluster. */
  storageProfile?: ManagedClusterStorageProfileOutput;
  /** Ingress profile for the managed cluster. */
  ingressProfile?: ManagedClusterIngressProfileOutput;
  /** Allow or deny public network access for AKS */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Workload Auto-scaler profile for the container service cluster. */
  workloadAutoScalerProfile?: ManagedClusterWorkloadAutoScalerProfileOutput;
}

/** Describes the Power State of the cluster */
export interface PowerStateOutput {
  /** Tells whether the cluster is Running or Stopped */
  code?: "Running" | "Stopped";
}

/** Data used when creating a target resource from a source resource. */
export interface CreationDataOutput {
  /** This is the ARM ID of the source object to be used to create the target object. */
  sourceResourceId?: string;
}

/** Profile for the container service agent pool. */
export interface ManagedClusterAgentPoolProfileOutput extends ManagedClusterAgentPoolProfilePropertiesOutput {
  /** Windows agent pool names must be 6 characters or less. */
  name: string;
}

/** Properties for the container service agent pool profile. */
export interface ManagedClusterAgentPoolProfilePropertiesOutput {
  /** Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1. */
  count?: number;
  /** VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions */
  vmSize?: string;
  /** OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified. */
  osDiskSizeGB?: number;
  /** The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). */
  osDiskType?: "Managed" | "Ephemeral";
  /** Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. */
  kubeletDiskType?: "OS" | "Temporary";
  /** Determines the type of workload a node can run. */
  workloadRuntime?: "OCIContainer" | "WasmWasi";
  /** A base64-encoded string which will be written to /etc/motd after decoding. This allows customization of the message of the day for Linux nodes. It must not be specified for Windows nodes. It must be a static string (i.e., will be printed raw and not be executed as a script). */
  messageOfTheDay?: string;
  /** If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  vnetSubnetID?: string;
  /** If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  podSubnetID?: string;
  /** The maximum number of pods that can run on a node. */
  maxPods?: number;
  /** The operating system type. The default is Linux. */
  osType?: "Linux" | "Windows";
  /** Specifies the OS SKU used by the agent pool. If not specified, the default is Ubuntu if OSType=Linux or Windows2019 if OSType=Windows. And the default Windows OSSKU will be changed to Windows2022 after Windows2019 is deprecated. */
  osSKU?: "Ubuntu" | "CBLMariner" | "Windows2019" | "Windows2022";
  /** The maximum number of nodes for auto-scaling */
  maxCount?: number;
  /** The minimum number of nodes for auto-scaling */
  minCount?: number;
  /** Whether to enable auto-scaler */
  enableAutoScaling?: boolean;
  /** This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete. */
  scaleDownMode?: "Delete" | "Deallocate";
  /** The type of Agent Pool. */
  type?: "VirtualMachineScaleSets" | "AvailabilitySet";
  /** A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools */
  mode?: "System" | "User";
  /** Both patch version <major.minor.patch> and <major.minor> are supported. When <major.minor> is specified, the latest supported patch version is chosen automatically. Updating the agent pool with the same <major.minor> once it has been created will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool). */
  orchestratorVersion?: string;
  /** If orchestratorVersion was a fully specified version <major.minor.patch>, this field will be exactly equal to it. If orchestratorVersion was <major.minor>, this field will contain the full <major.minor.patch> version being used. */
  readonly currentOrchestratorVersion?: string;
  /** The version of node image */
  readonly nodeImageVersion?: string;
  /** Settings for upgrading the agentpool */
  upgradeSettings?: AgentPoolUpgradeSettingsOutput;
  /** The current deployment or provisioning state. */
  readonly provisioningState?: string;
  /** When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded */
  powerState?: PowerStateOutput;
  /** The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'. */
  availabilityZones?: Array<string>;
  /** Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false. */
  enableNodePublicIP?: boolean;
  /** When set to true, AKS deploys a daemonset and host services to sync custom certificate authorities from a user-provided config map into node trust stores. Defaults to false. */
  enableCustomCATrust?: boolean;
  /** This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName} */
  nodePublicIPPrefixID?: string;
  /** The Virtual Machine Scale Set priority. If not specified, the default is 'Regular'. */
  scaleSetPriority?: "Spot" | "Regular";
  /** This cannot be specified unless the scaleSetPriority is 'Spot'. If not specified, the default is 'Delete'. */
  scaleSetEvictionPolicy?: "Delete" | "Deallocate";
  /** Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing) */
  spotMaxPrice?: number;
  /** The tags to be persisted on the agent pool virtual machine scale set. */
  tags?: Record<string, string>;
  /** The node labels to be persisted across all nodes in agent pool. */
  nodeLabels?: Record<string, string>;
  /** The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule. */
  nodeTaints?: Array<string>;
  /** The ID for Proximity Placement Group. */
  proximityPlacementGroupID?: string;
  /** The Kubelet configuration on the agent pool nodes. */
  kubeletConfig?: KubeletConfigOutput;
  /** The OS configuration of Linux agent nodes. */
  linuxOSConfig?: LinuxOSConfigOutput;
  /** This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption */
  enableEncryptionAtHost?: boolean;
  /** Whether to enable UltraSSD */
  enableUltraSSD?: boolean;
  /** See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details. */
  enableFIPS?: boolean;
  /** GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. */
  gpuInstanceProfile?: "MIG1g" | "MIG2g" | "MIG3g" | "MIG4g" | "MIG7g";
  /** CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot. */
  creationData?: CreationDataOutput;
  /** AKS will associate the specified agent pool with the Capacity Reservation Group. */
  capacityReservationGroupID?: string;
  /** This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts). */
  hostGroupID?: string;
}

/** Settings for upgrading an agentpool */
export interface AgentPoolUpgradeSettingsOutput {
  /** This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 1. For more information, including best practices, see: https://docs.microsoft.com/azure/aks/upgrade-cluster#customize-node-surge-upgrade */
  maxSurge?: string;
}

/** See [AKS custom node configuration](https://docs.microsoft.com/azure/aks/custom-node-configuration) for more details. */
export interface KubeletConfigOutput {
  /** The default is 'none'. See [Kubernetes CPU management policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#cpu-management-policies) for more information. Allowed values are 'none' and 'static'. */
  cpuManagerPolicy?: string;
  /** The default is true. */
  cpuCfsQuota?: boolean;
  /** The default is '100ms.' Valid values are a sequence of decimal numbers with an optional fraction and a unit suffix. For example: '300ms', '2h45m'. Supported units are 'ns', 'us', 'ms', 's', 'm', and 'h'. */
  cpuCfsQuotaPeriod?: string;
  /** To disable image garbage collection, set to 100. The default is 85% */
  imageGcHighThreshold?: number;
  /** This cannot be set higher than imageGcHighThreshold. The default is 80% */
  imageGcLowThreshold?: number;
  /** For more information see [Kubernetes Topology Manager](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager). The default is 'none'. Allowed values are 'none', 'best-effort', 'restricted', and 'single-numa-node'. */
  topologyManagerPolicy?: string;
  /** Allowed list of unsafe sysctls or unsafe sysctl patterns (ending in `*`). */
  allowedUnsafeSysctls?: Array<string>;
  /** If set to true it will make the Kubelet fail to start if swap is enabled on the node. */
  failSwapOn?: boolean;
  /** The maximum size (e.g. 10Mi) of container log file before it is rotated. */
  containerLogMaxSizeMB?: number;
  /** The maximum number of container log files that can be present for a container. The number must be ≥ 2. */
  containerLogMaxFiles?: number;
  /** The maximum number of processes per pod. */
  podMaxPids?: number;
}

/** See [AKS custom node configuration](https://docs.microsoft.com/azure/aks/custom-node-configuration) for more details. */
export interface LinuxOSConfigOutput {
  /** Sysctl settings for Linux agent nodes. */
  sysctls?: SysctlConfigOutput;
  /** Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). */
  transparentHugePageEnabled?: string;
  /** Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). */
  transparentHugePageDefrag?: string;
  /** The size in MB of a swap file that will be created on each node. */
  swapFileSizeMB?: number;
}

/** Sysctl settings for Linux agent nodes. */
export interface SysctlConfigOutput {
  /** Sysctl setting net.core.somaxconn. */
  netCoreSomaxconn?: number;
  /** Sysctl setting net.core.netdev_max_backlog. */
  netCoreNetdevMaxBacklog?: number;
  /** Sysctl setting net.core.rmem_default. */
  netCoreRmemDefault?: number;
  /** Sysctl setting net.core.rmem_max. */
  netCoreRmemMax?: number;
  /** Sysctl setting net.core.wmem_default. */
  netCoreWmemDefault?: number;
  /** Sysctl setting net.core.wmem_max. */
  netCoreWmemMax?: number;
  /** Sysctl setting net.core.optmem_max. */
  netCoreOptmemMax?: number;
  /** Sysctl setting net.ipv4.tcp_max_syn_backlog. */
  netIpv4TcpMaxSynBacklog?: number;
  /** Sysctl setting net.ipv4.tcp_max_tw_buckets. */
  netIpv4TcpMaxTwBuckets?: number;
  /** Sysctl setting net.ipv4.tcp_fin_timeout. */
  netIpv4TcpFinTimeout?: number;
  /** Sysctl setting net.ipv4.tcp_keepalive_time. */
  netIpv4TcpKeepaliveTime?: number;
  /** Sysctl setting net.ipv4.tcp_keepalive_probes. */
  netIpv4TcpKeepaliveProbes?: number;
  /** Sysctl setting net.ipv4.tcp_keepalive_intvl. */
  netIpv4TcpkeepaliveIntvl?: number;
  /** Sysctl setting net.ipv4.tcp_tw_reuse. */
  netIpv4TcpTwReuse?: boolean;
  /** Sysctl setting net.ipv4.ip_local_port_range. */
  netIpv4IpLocalPortRange?: string;
  /** Sysctl setting net.ipv4.neigh.default.gc_thresh1. */
  netIpv4NeighDefaultGcThresh1?: number;
  /** Sysctl setting net.ipv4.neigh.default.gc_thresh2. */
  netIpv4NeighDefaultGcThresh2?: number;
  /** Sysctl setting net.ipv4.neigh.default.gc_thresh3. */
  netIpv4NeighDefaultGcThresh3?: number;
  /** Sysctl setting net.netfilter.nf_conntrack_max. */
  netNetfilterNfConntrackMax?: number;
  /** Sysctl setting net.netfilter.nf_conntrack_buckets. */
  netNetfilterNfConntrackBuckets?: number;
  /** Sysctl setting fs.inotify.max_user_watches. */
  fsInotifyMaxUserWatches?: number;
  /** Sysctl setting fs.file-max. */
  fsFileMax?: number;
  /** Sysctl setting fs.aio-max-nr. */
  fsAioMaxNr?: number;
  /** Sysctl setting fs.nr_open. */
  fsNrOpen?: number;
  /** Sysctl setting kernel.threads-max. */
  kernelThreadsMax?: number;
  /** Sysctl setting vm.max_map_count. */
  vmMaxMapCount?: number;
  /** Sysctl setting vm.swappiness. */
  vmSwappiness?: number;
  /** Sysctl setting vm.vfs_cache_pressure. */
  vmVfsCachePressure?: number;
}

/** Profile for Linux VMs in the container service cluster. */
export interface ContainerServiceLinuxProfileOutput {
  /** The administrator username to use for Linux VMs. */
  adminUsername: string;
  /** The SSH configuration for Linux-based VMs running on Azure. */
  ssh: ContainerServiceSshConfigurationOutput;
}

/** SSH configuration for Linux-based VMs running on Azure. */
export interface ContainerServiceSshConfigurationOutput {
  /** The list of SSH public keys used to authenticate with Linux-based VMs. A maximum of 1 key may be specified. */
  publicKeys: Array<ContainerServiceSshPublicKeyOutput>;
}

/** Contains information about SSH certificate public key data. */
export interface ContainerServiceSshPublicKeyOutput {
  /** Certificate public key used to authenticate with VMs through SSH. The certificate must be in PEM format with or without headers. */
  keyData: string;
}

/** Profile for Windows VMs in the managed cluster. */
export interface ManagedClusterWindowsProfileOutput {
  /** Specifies the name of the administrator account. <br><br> **Restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters */
  adminUsername: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length:** 8 characters <br><br> **Max-length:** 123 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" */
  adminPassword?: string;
  /** The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details. */
  licenseType?: "None" | "Windows_Server";
  /** For more details on CSI proxy, see the [CSI proxy GitHub repo](https://github.com/kubernetes-csi/csi-proxy). */
  enableCSIProxy?: boolean;
  /** The Windows gMSA Profile in the Managed Cluster. */
  gmsaProfile?: WindowsGmsaProfileOutput;
}

/** Windows gMSA Profile in the managed cluster. */
export interface WindowsGmsaProfileOutput {
  /** Specifies whether to enable Windows gMSA in the managed cluster. */
  enabled?: boolean;
  /** Specifies the DNS server for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. */
  dnsServer?: string;
  /** Specifies the root domain name for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. */
  rootDomainName?: string;
}

/** Information about a service principal identity for the cluster to use for manipulating Azure APIs. */
export interface ManagedClusterServicePrincipalProfileOutput {
  /** The ID for the service principal. */
  clientId: string;
  /** The secret password associated with the service principal in plain text. */
  secret?: string;
}

/** A Kubernetes add-on profile for a managed cluster. */
export interface ManagedClusterAddonProfileOutput {
  /** Whether the add-on is enabled or not. */
  enabled: boolean;
  /** Key-value pairs for configuring an add-on. */
  config?: Record<string, string>;
  /** Information of user assigned identity used by this add-on. */
  readonly identity?: ManagedClusterAddonProfileIdentityOutput;
}

/** Information of user assigned identity used by this add-on. */
export interface ManagedClusterAddonProfileIdentityOutput extends UserAssignedIdentityOutput {}

/** Details about a user assigned identity. */
export interface UserAssignedIdentityOutput {
  /** The resource ID of the user assigned identity. */
  resourceId?: string;
  /** The client ID of the user assigned identity. */
  clientId?: string;
  /** The object ID of the user assigned identity. */
  objectId?: string;
}

/** See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on pod identity integration. */
export interface ManagedClusterPodIdentityProfileOutput {
  /** Whether the pod identity addon is enabled. */
  enabled?: boolean;
  /** Running in Kubenet is disabled by default due to the security related nature of AAD Pod Identity and the risks of IP spoofing. See [using Kubenet network plugin with AAD Pod Identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity#using-kubenet-network-plugin-with-azure-active-directory-pod-managed-identities) for more information. */
  allowNetworkPluginKubenet?: boolean;
  /** The pod identities to use in the cluster. */
  userAssignedIdentities?: Array<ManagedClusterPodIdentityOutput>;
  /** The pod identity exceptions to allow. */
  userAssignedIdentityExceptions?: Array<ManagedClusterPodIdentityExceptionOutput>;
}

/** Details about the pod identity assigned to the Managed Cluster. */
export interface ManagedClusterPodIdentityOutput {
  /** The name of the pod identity. */
  name: string;
  /** The namespace of the pod identity. */
  namespace: string;
  /** The binding selector to use for the AzureIdentityBinding resource. */
  bindingSelector?: string;
  /** The user assigned identity details. */
  identity: UserAssignedIdentityOutput;
  /** The current provisioning state of the pod identity. */
  readonly provisioningState?: "Assigned" | "Updating" | "Deleting" | "Failed";
  readonly provisioningInfo?: ManagedClusterPodIdentityProvisioningInfoOutput;
}

export interface ManagedClusterPodIdentityProvisioningInfoOutput {
  /** Pod identity assignment error (if any). */
  error?: ManagedClusterPodIdentityProvisioningErrorOutput;
}

/** An error response from the pod identity provisioning. */
export interface ManagedClusterPodIdentityProvisioningErrorOutput {
  /** Details about the error. */
  error?: ManagedClusterPodIdentityProvisioningErrorBodyOutput;
}

/** An error response from the pod identity provisioning. */
export interface ManagedClusterPodIdentityProvisioningErrorBodyOutput {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: Array<ManagedClusterPodIdentityProvisioningErrorBodyOutput>;
}

/** See [disable AAD Pod Identity for a specific Pod/Application](https://azure.github.io/aad-pod-identity/docs/configure/application_exception/) for more details. */
export interface ManagedClusterPodIdentityExceptionOutput {
  /** The name of the pod identity exception. */
  name: string;
  /** The namespace of the pod identity exception. */
  namespace: string;
  /** The pod labels to match. */
  podLabels: Record<string, string>;
}

/** The OIDC issuer profile of the Managed Cluster. */
export interface ManagedClusterOidcIssuerProfileOutput {
  /** The OIDC issuer url of the Managed Cluster. */
  readonly issuerURL?: string;
  /** Whether the OIDC issuer is enabled. */
  enabled?: boolean;
}

/** Profile of network configuration. */
export interface ContainerServiceNetworkProfileOutput {
  /** Network plugin used for building the Kubernetes network. */
  networkPlugin?: "azure" | "kubenet" | "none";
  /** Network plugin mode used for building the Kubernetes network. */
  networkPluginMode?: "Overlay";
  /** Network policy used for building the Kubernetes network. */
  networkPolicy?: "calico" | "azure";
  /** This cannot be specified if networkPlugin is anything other than 'azure'. */
  networkMode?: "transparent" | "bridge";
  /** A CIDR notation IP range from which to assign pod IPs when kubenet is used. */
  podCidr?: string;
  /** A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges. */
  serviceCidr?: string;
  /** An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr. */
  dnsServiceIP?: string;
  /** A CIDR notation IP range assigned to the Docker bridge network. It must not overlap with any Subnet IP ranges or the Kubernetes service address range. */
  dockerBridgeCidr?: string;
  /** This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype). */
  outboundType?:
    | "loadBalancer"
    | "userDefinedRouting"
    | "managedNATGateway"
    | "userAssignedNATGateway";
  /** The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs. */
  loadBalancerSku?: "standard" | "basic";
  /** Profile of the cluster load balancer. */
  loadBalancerProfile?: ManagedClusterLoadBalancerProfileOutput;
  /** Profile of the cluster NAT gateway. */
  natGatewayProfile?: ManagedClusterNATGatewayProfileOutput;
  /** One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. */
  podCidrs?: Array<string>;
  /** One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. They must not overlap with any Subnet IP ranges. */
  serviceCidrs?: Array<string>;
  /** IP families are used to determine single-stack or dual-stack clusters. For single-stack, the expected value is IPv4. For dual-stack, the expected values are IPv4 and IPv6. */
  ipFamilies?: Array<"IPv4" | "IPv6">;
}

/** Profile of the managed cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileOutput {
  /** Desired managed outbound IPs for the cluster load balancer. */
  managedOutboundIPs?: ManagedClusterLoadBalancerProfileManagedOutboundIPsOutput;
  /** Desired outbound IP Prefix resources for the cluster load balancer. */
  outboundIPPrefixes?: ManagedClusterLoadBalancerProfileOutboundIPPrefixesOutput;
  /** Desired outbound IP resources for the cluster load balancer. */
  outboundIPs?: ManagedClusterLoadBalancerProfileOutboundIPsOutput;
  /** The effective outbound IP resources of the cluster load balancer. */
  effectiveOutboundIPs?: Array<ResourceReferenceOutput>;
  /** The desired number of allocated SNAT ports per VM. Allowed values are in the range of 0 to 64000 (inclusive). The default value is 0 which results in Azure dynamically allocating ports. */
  allocatedOutboundPorts?: number;
  /** Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 30 minutes. */
  idleTimeoutInMinutes?: number;
  /** Enable multiple standard load balancers per AKS cluster or not. */
  enableMultipleStandardLoadBalancers?: boolean;
}

/** Desired managed outbound IPs for the cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileManagedOutboundIPsOutput {
  /** The desired number of IPv4 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 1. */
  count?: number;
  /** The desired number of IPv6 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 0 for single-stack and 1 for dual-stack. */
  countIPv6?: number;
}

/** Desired outbound IP Prefix resources for the cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileOutboundIPPrefixesOutput {
  /** A list of public IP prefix resources. */
  publicIPPrefixes?: Array<ResourceReferenceOutput>;
}

/** A reference to an Azure resource. */
export interface ResourceReferenceOutput {
  /** The fully qualified Azure resource id. */
  id?: string;
}

/** Desired outbound IP resources for the cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileOutboundIPsOutput {
  /** A list of public IP resources. */
  publicIPs?: Array<ResourceReferenceOutput>;
}

/** Profile of the managed cluster NAT gateway. */
export interface ManagedClusterNATGatewayProfileOutput {
  /** Profile of the managed outbound IP resources of the cluster NAT gateway. */
  managedOutboundIPProfile?: ManagedClusterManagedOutboundIPProfileOutput;
  /** The effective outbound IP resources of the cluster NAT gateway. */
  effectiveOutboundIPs?: Array<ResourceReferenceOutput>;
  /** Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 4 minutes. */
  idleTimeoutInMinutes?: number;
}

/** Profile of the managed outbound IP resources of the managed cluster. */
export interface ManagedClusterManagedOutboundIPProfileOutput {
  /** The desired number of outbound IPs created/managed by Azure. Allowed values must be in the range of 1 to 16 (inclusive). The default value is 1. */
  count?: number;
}

/** For more details see [managed AAD on AKS](https://docs.microsoft.com/azure/aks/managed-aad). */
export interface ManagedClusterAADProfileOutput {
  /** Whether to enable managed AAD. */
  managed?: boolean;
  /** Whether to enable Azure RBAC for Kubernetes authorization. */
  enableAzureRBAC?: boolean;
  /** The list of AAD group object IDs that will have admin role of the cluster. */
  adminGroupObjectIDs?: Array<string>;
  /** The client AAD application ID. */
  clientAppID?: string;
  /** The server AAD application ID. */
  serverAppID?: string;
  /** The server AAD application secret. */
  serverAppSecret?: string;
  /** The AAD tenant ID to use for authentication. If not specified, will use the tenant of the deployment subscription. */
  tenantID?: string;
}

/** Auto upgrade profile for a managed cluster. */
export interface ManagedClusterAutoUpgradeProfileOutput {
  /** For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel). */
  upgradeChannel?: "rapid" | "stable" | "patch" | "node-image" | "none";
}

/** Parameters to be applied to the cluster-autoscaler when enabled */
export interface ManagedClusterPropertiesAutoScalerProfileOutput {
  /** Valid values are 'true' and 'false' */
  "balance-similar-node-groups"?: string;
  /** If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information. */
  expander?: "least-waste" | "most-pods" | "priority" | "random";
  /** The default is 10. */
  "max-empty-bulk-delete"?: string;
  /** The default is 600. */
  "max-graceful-termination-sec"?: string;
  /** The default is '15m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  "max-node-provision-time"?: string;
  /** The default is 45. The maximum is 100 and the minimum is 0. */
  "max-total-unready-percentage"?: string;
  /** For scenarios like burst/batch scale where you don't want CA to act before the kubernetes scheduler could schedule all the pods, you can tell CA to ignore unscheduled pods before they're a certain age. The default is '0s'. Values must be an integer followed by a unit ('s' for seconds, 'm' for minutes, 'h' for hours, etc). */
  "new-pod-scale-up-delay"?: string;
  /** This must be an integer. The default is 3. */
  "ok-total-unready-count"?: string;
  /** The default is '10'. Values must be an integer number of seconds. */
  "scan-interval"?: string;
  /** The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  "scale-down-delay-after-add"?: string;
  /** The default is the scan-interval. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  "scale-down-delay-after-delete"?: string;
  /** The default is '3m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  "scale-down-delay-after-failure"?: string;
  /** The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  "scale-down-unneeded-time"?: string;
  /** The default is '20m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  "scale-down-unready-time"?: string;
  /** The default is '0.5'. */
  "scale-down-utilization-threshold"?: string;
  /** The default is true. */
  "skip-nodes-with-local-storage"?: string;
  /** The default is true. */
  "skip-nodes-with-system-pods"?: string;
}

/** Access profile for managed cluster API server. */
export interface ManagedClusterAPIServerAccessProfileOutput {
  /** IP ranges are specified in CIDR format, e.g. 137.117.106.88/29. This feature is not compatible with clusters that use Public IP Per Node, or clusters that are using a Basic Load Balancer. For more information see [API server authorized IP ranges](https://docs.microsoft.com/azure/aks/api-server-authorized-ip-ranges). */
  authorizedIPRanges?: Array<string>;
  /** For more details, see [Creating a private AKS cluster](https://docs.microsoft.com/azure/aks/private-clusters). */
  enablePrivateCluster?: boolean;
  /** The default is System. For more details see [configure private DNS zone](https://docs.microsoft.com/azure/aks/private-clusters#configure-private-dns-zone). Allowed values are 'system' and 'none'. */
  privateDNSZone?: string;
  /** Whether to create additional public FQDN for private cluster or not. */
  enablePrivateClusterPublicFQDN?: boolean;
  /** Whether to disable run command for the cluster or not. */
  disableRunCommand?: boolean;
  /** Whether to enable apiserver vnet integration for the cluster or not. */
  enableVnetIntegration?: boolean;
  /** It is required when: 1. creating a new cluster with BYO Vnet; 2. updating an existing cluster to enable apiserver vnet integration. */
  subnetId?: string;
}

/** A private link resource */
export interface PrivateLinkResourceOutput {
  /** The ID of the private link resource. */
  id?: string;
  /** The name of the private link resource. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** The group ID of the resource. */
  groupId?: string;
  /** The RequiredMembers of the resource */
  requiredMembers?: Array<string>;
  /** The private link service ID of the resource, this field is exposed only to NRP internally. */
  readonly privateLinkServiceID?: string;
}

/** Cluster HTTP proxy configuration. */
export interface ManagedClusterHttpProxyConfigOutput {
  /** The HTTP proxy server endpoint to use. */
  httpProxy?: string;
  /** The HTTPS proxy server endpoint to use. */
  httpsProxy?: string;
  /** The endpoints that should not go through proxy. */
  noProxy?: Array<string>;
  /** A read-only list of all endpoints for which traffic should not be sent to the proxy. This list is a superset of noProxy and values injected by AKS. */
  readonly effectiveNoProxy?: Array<string>;
  /** Alternative CA cert to use for connecting to proxy servers. */
  trustedCa?: string;
}

/** Security profile for the container service cluster. */
export interface ManagedClusterSecurityProfileOutput {
  /** Microsoft Defender settings for the security profile. */
  defender?: ManagedClusterSecurityProfileDefenderOutput;
  /** Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile. */
  azureKeyVaultKms?: AzureKeyVaultKmsOutput;
  /** [Workload Identity](https://azure.github.io/azure-workload-identity/docs/) settings for the security profile. */
  workloadIdentity?: ManagedClusterSecurityProfileWorkloadIdentityOutput;
}

/** Microsoft Defender settings for the security profile. */
export interface ManagedClusterSecurityProfileDefenderOutput {
  /** Resource ID of the Log Analytics workspace to be associated with Microsoft Defender. When Microsoft Defender is enabled, this field is required and must be a valid workspace resource ID. When Microsoft Defender is disabled, leave the field empty. */
  logAnalyticsWorkspaceResourceId?: string;
  /** Microsoft Defender threat detection for Cloud settings for the security profile. */
  securityMonitoring?: ManagedClusterSecurityProfileDefenderSecurityMonitoringOutput;
}

/** Microsoft Defender settings for the security profile threat detection. */
export interface ManagedClusterSecurityProfileDefenderSecurityMonitoringOutput {
  /** Whether to enable Defender threat detection */
  enabled?: boolean;
}

/** Azure Key Vault key management service settings for the security profile. */
export interface AzureKeyVaultKmsOutput {
  /** Whether to enable Azure Key Vault key management service. The default is false. */
  enabled?: boolean;
  /** Identifier of Azure Key Vault key. See [key identifier format](https://docs.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates#vault-name-and-object-name) for more details. When Azure Key Vault key management service is enabled, this field is required and must be a valid key identifier. When Azure Key Vault key management service is disabled, leave the field empty. */
  keyId?: string;
  /** Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. */
  keyVaultNetworkAccess?: "Public" | "Private";
  /** Resource ID of key vault. When keyVaultNetworkAccess is `Private`, this field is required and must be a valid resource ID. When keyVaultNetworkAccess is `Public`, leave the field empty. */
  keyVaultResourceId?: string;
}

/** Workload Identity settings for the security profile. */
export interface ManagedClusterSecurityProfileWorkloadIdentityOutput {
  /** Whether to enable Workload Identity */
  enabled?: boolean;
}

/** Storage profile for the container service cluster. */
export interface ManagedClusterStorageProfileOutput {
  /** AzureDisk CSI Driver settings for the storage profile. */
  diskCSIDriver?: ManagedClusterStorageProfileDiskCSIDriverOutput;
  /** AzureFile CSI Driver settings for the storage profile. */
  fileCSIDriver?: ManagedClusterStorageProfileFileCSIDriverOutput;
  /** Snapshot Controller settings for the storage profile. */
  snapshotController?: ManagedClusterStorageProfileSnapshotControllerOutput;
  /** AzureBlob CSI Driver settings for the storage profile. */
  blobCSIDriver?: ManagedClusterStorageProfileBlobCSIDriverOutput;
}

/** AzureDisk CSI Driver settings for the storage profile. */
export interface ManagedClusterStorageProfileDiskCSIDriverOutput {
  /** Whether to enable AzureDisk CSI Driver. The default value is true. */
  enabled?: boolean;
  /** The version of AzureDisk CSI Driver. The default value is v1. */
  version?: string;
}

/** AzureFile CSI Driver settings for the storage profile. */
export interface ManagedClusterStorageProfileFileCSIDriverOutput {
  /** Whether to enable AzureFile CSI Driver. The default value is true. */
  enabled?: boolean;
}

/** Snapshot Controller settings for the storage profile. */
export interface ManagedClusterStorageProfileSnapshotControllerOutput {
  /** Whether to enable Snapshot Controller. The default value is true. */
  enabled?: boolean;
}

/** AzureBlob CSI Driver settings for the storage profile. */
export interface ManagedClusterStorageProfileBlobCSIDriverOutput {
  /** Whether to enable AzureBlob CSI Driver. The default value is false. */
  enabled?: boolean;
}

/** Ingress profile for the container service cluster. */
export interface ManagedClusterIngressProfileOutput {
  /** Web App Routing settings for the ingress profile. */
  webAppRouting?: ManagedClusterIngressProfileWebAppRoutingOutput;
}

/** Web App Routing settings for the ingress profile. */
export interface ManagedClusterIngressProfileWebAppRoutingOutput {
  /** Whether to enable Web App Routing. */
  enabled?: boolean;
  /** Resource ID of the DNS Zone to be associated with the web app. Used only when Web App Routing is enabled. */
  dnsZoneResourceId?: string;
}

/** Workload Auto-scaler profile for the container service cluster. */
export interface ManagedClusterWorkloadAutoScalerProfileOutput {
  /** KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile. */
  keda?: ManagedClusterWorkloadAutoScalerProfileKedaOutput;
}

/** KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile. */
export interface ManagedClusterWorkloadAutoScalerProfileKedaOutput {
  /** Whether to enable KEDA. */
  enabled: boolean;
}

/** The resource model definition for an Azure Resource Manager tracked top level resource which has 'tags' and a 'location' */
export interface TrackedResourceOutput extends ResourceOutput {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

/** Common fields that are returned in the response for all Azure Resource Manager resources */
export interface ResourceOutput {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  readonly id?: string;
  /** The name of the resource */
  readonly name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  readonly type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  readonly systemData?: SystemDataOutput;
}

/** Metadata pertaining to creation and last modification of the resource. */
export interface SystemDataOutput {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource creation (UTC). */
  createdAt?: string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: string;
}

/** The list of available upgrades for compute pools. */
export interface ManagedClusterUpgradeProfileOutput {
  /** The ID of the upgrade profile. */
  readonly id?: string;
  /** The name of the upgrade profile. */
  readonly name?: string;
  /** The type of the upgrade profile. */
  readonly type?: string;
  /** The properties of the upgrade profile. */
  properties: ManagedClusterUpgradeProfilePropertiesOutput;
}

/** Control plane and agent pool upgrade profiles. */
export interface ManagedClusterUpgradeProfilePropertiesOutput {
  /** The list of available upgrade versions for the control plane. */
  controlPlaneProfile: ManagedClusterPoolUpgradeProfileOutput;
  /** The list of available upgrade versions for agent pools. */
  agentPoolProfiles: Array<ManagedClusterPoolUpgradeProfileOutput>;
}

/** The list of available upgrade versions. */
export interface ManagedClusterPoolUpgradeProfileOutput {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion: string;
  /** The Agent Pool name. */
  name?: string;
  /** The operating system type. The default is Linux. */
  osType: "Linux" | "Windows";
  /** List of orchestrator types and versions available for upgrade. */
  upgrades?: Array<ManagedClusterPoolUpgradeProfileUpgradesItemOutput>;
}

export interface ManagedClusterPoolUpgradeProfileUpgradesItemOutput {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether the Kubernetes version is currently in preview. */
  isPreview?: boolean;
}

/** Managed cluster Access Profile. */
export interface ManagedClusterAccessProfileOutput extends TrackedResourceOutput {
  /** AccessProfile of a managed cluster. */
  properties?: AccessProfileOutput;
}

/** Profile for enabling a user to access a managed cluster. */
export interface AccessProfileOutput {
  /**
   * Base64-encoded Kubernetes configuration file.
   *
   * Value may contain base64 encoded characters
   */
  kubeConfig?: string;
}

/** The list credential result response. */
export interface CredentialResultsOutput {
  /** Base64-encoded Kubernetes configuration file. */
  readonly kubeconfigs?: Array<CredentialResultOutput>;
}

/** The credential result response. */
export interface CredentialResultOutput {
  /** The name of the credential. */
  readonly name?: string;
  /**
   * Base64-encoded Kubernetes configuration file.
   *
   * Value may contain base64 encoded characters
   */
  readonly value?: string;
}

/** The response from the List maintenance configurations operation. */
export interface MaintenanceConfigurationListResultOutput {
  /** The list of maintenance configurations. */
  value?: Array<MaintenanceConfigurationOutput>;
  /** The URL to get the next set of maintenance configuration results. */
  readonly nextLink?: string;
}

/** See [planned maintenance](https://docs.microsoft.com/azure/aks/planned-maintenance) for more information about planned maintenance. */
export interface MaintenanceConfigurationOutput extends SubResourceOutput {
  /** The system metadata relating to this resource. */
  readonly systemData?: SystemDataOutput;
  /** Properties of a default maintenance configuration. */
  properties?: MaintenanceConfigurationPropertiesOutput;
}

/** Properties used to configure planned maintenance for a Managed Cluster. */
export interface MaintenanceConfigurationPropertiesOutput {
  /** If two array entries specify the same day of the week, the applied configuration is the union of times in both entries. */
  timeInWeek?: Array<TimeInWeekOutput>;
  /** Time slots on which upgrade is not allowed. */
  notAllowedTime?: Array<TimeSpanOutput>;
}

/** Time in a week. */
export interface TimeInWeekOutput {
  /** The day of the week. */
  day?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  /** Each integer hour represents a time range beginning at 0m after the hour ending at the next hour (non-inclusive). 0 corresponds to 00:00 UTC, 23 corresponds to 23:00 UTC. Specifying [0, 1] means the 00:00 - 02:00 UTC time range. */
  hourSlots?: Array<number>;
}

/** For example, between 2021-05-25T13:00:00Z and 2021-05-25T14:00:00Z. */
export interface TimeSpanOutput {
  /** The start of a time span */
  start?: string;
  /** The end of a time span */
  end?: string;
}

/** Reference to another subresource. */
export interface SubResourceOutput {
  /** Resource ID. */
  readonly id?: string;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  readonly name?: string;
  /** Resource type */
  readonly type?: string;
}

/** The response from the List Agent Pools operation. */
export interface AgentPoolListResultOutput {
  /** The list of agent pools. */
  value?: Array<AgentPoolOutput>;
  /** The URL to get the next set of agent pool results. */
  readonly nextLink?: string;
}

/** Agent Pool. */
export interface AgentPoolOutput extends SubResourceOutput {
  /** Properties of an agent pool. */
  properties?: ManagedClusterAgentPoolProfilePropertiesOutput;
}

/** The list of available upgrades for an agent pool. */
export interface AgentPoolUpgradeProfileOutput {
  /** The ID of the agent pool upgrade profile. */
  readonly id?: string;
  /** The name of the agent pool upgrade profile. */
  readonly name?: string;
  /** The type of the agent pool upgrade profile. */
  readonly type?: string;
  /** The properties of the agent pool upgrade profile. */
  properties: AgentPoolUpgradeProfilePropertiesOutput;
}

/** The list of available upgrade versions. */
export interface AgentPoolUpgradeProfilePropertiesOutput {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion: string;
  /** The operating system type. The default is Linux. */
  osType: "Linux" | "Windows";
  /** List of orchestrator types and versions available for upgrade. */
  upgrades?: Array<AgentPoolUpgradeProfilePropertiesUpgradesItemOutput>;
  /** The latest AKS supported node image version. */
  latestNodeImageVersion?: string;
}

export interface AgentPoolUpgradeProfilePropertiesUpgradesItemOutput {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether the Kubernetes version is currently in preview. */
  isPreview?: boolean;
}

/** The list of available versions for an agent pool. */
export interface AgentPoolAvailableVersionsOutput {
  /** The ID of the agent pool version list. */
  readonly id?: string;
  /** The name of the agent pool version list. */
  readonly name?: string;
  /** Type of the agent pool version list. */
  readonly type?: string;
  /** Properties of agent pool available versions. */
  properties: AgentPoolAvailableVersionsPropertiesOutput;
}

/** The list of available agent pool versions. */
export interface AgentPoolAvailableVersionsPropertiesOutput {
  /** List of versions available for agent pool. */
  agentPoolVersions?: Array<AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItemOutput>;
}

export interface AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItemOutput {
  /** Whether this version is the default agent pool version. */
  default?: boolean;
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether Kubernetes version is currently in preview. */
  isPreview?: boolean;
}

/** A list of private endpoint connections */
export interface PrivateEndpointConnectionListResultOutput {
  /** The collection value. */
  value?: Array<PrivateEndpointConnectionOutput>;
}

/** A private endpoint connection */
export interface PrivateEndpointConnectionOutput {
  /** The ID of the private endpoint connection. */
  readonly id?: string;
  /** The name of the private endpoint connection. */
  readonly name?: string;
  /** The resource type. */
  readonly type?: string;
  /** The properties of a private endpoint connection. */
  properties?: PrivateEndpointConnectionPropertiesOutput;
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionPropertiesOutput {
  /** The current provisioning state. */
  readonly provisioningState?: "Succeeded" | "Creating" | "Deleting" | "Failed";
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpointOutput;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionStateOutput;
}

/** Private endpoint which a connection belongs to. */
export interface PrivateEndpointOutput {
  /** The resource ID of the private endpoint */
  id?: string;
}

/** The state of a private link service connection. */
export interface PrivateLinkServiceConnectionStateOutput {
  /** The private link service connection status. */
  status?: "Pending" | "Approved" | "Rejected" | "Disconnected";
  /** The private link service connection description. */
  description?: string;
}

/** A list of private link resources */
export interface PrivateLinkResourcesListResultOutput {
  /** The collection value. */
  value?: Array<PrivateLinkResourceOutput>;
}

/** run command result. */
export interface RunCommandResultOutput {
  /** The command id. */
  readonly id?: string;
  /** Properties of command result. */
  properties?: CommandResultPropertiesOutput;
}

/** The results of a run command */
export interface CommandResultPropertiesOutput {
  /** provisioning State */
  readonly provisioningState?: string;
  /** The exit code of the command */
  readonly exitCode?: number;
  /** The time when the command started. */
  readonly startedAt?: string;
  /** The time when the command finished. */
  readonly finishedAt?: string;
  /** The command output. */
  readonly logs?: string;
  /** An explanation of why provisioningState is set to failed (if so). */
  readonly reason?: string;
}

/** Collection of OutboundEnvironmentEndpoint */
export interface OutboundEnvironmentEndpointCollectionOutput {
  /** Collection of resources. */
  value: Array<OutboundEnvironmentEndpointOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Egress endpoints which AKS agent nodes connect to for common purpose. */
export interface OutboundEnvironmentEndpointOutput {
  /** The category of endpoints accessed by the AKS agent node, e.g. azure-resource-management, apiserver, etc. */
  category?: string;
  /** The endpoints that AKS agent nodes connect to */
  endpoints?: Array<EndpointDependencyOutput>;
}

/** A domain name that AKS agent nodes are reaching at. */
export interface EndpointDependencyOutput {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The Ports and Protocols used when connecting to domainName. */
  endpointDetails?: Array<EndpointDetailOutput>;
}

/** connect information from the AKS agent nodes to a single endpoint. */
export interface EndpointDetailOutput {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The protocol used for connection */
  protocol?: string;
  /** Description of the detail */
  description?: string;
}

/** The response from the List Snapshots operation. */
export interface SnapshotListResultOutput {
  /** The list of snapshots. */
  value?: Array<SnapshotOutput>;
  /** The URL to get the next set of snapshot results. */
  readonly nextLink?: string;
}

/** A node pool snapshot resource. */
export interface SnapshotOutput extends TrackedResourceOutput {
  /** Properties of a snapshot. */
  properties?: SnapshotPropertiesOutput;
}

/** Properties used to configure a node pool snapshot. */
export interface SnapshotPropertiesOutput {
  /** CreationData to be used to specify the source agent pool resource ID to create this snapshot. */
  creationData?: CreationDataOutput;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: "NodePool" | "ManagedCluster";
  /** The version of Kubernetes. */
  readonly kubernetesVersion?: string;
  /** The version of node image. */
  readonly nodeImageVersion?: string;
  /** The operating system type. The default is Linux. */
  readonly osType?: "Linux" | "Windows";
  /** Specifies the OS SKU used by the agent pool. If not specified, the default is Ubuntu if OSType=Linux or Windows2019 if OSType=Windows. And the default Windows OSSKU will be changed to Windows2022 after Windows2019 is deprecated. */
  readonly osSku?: "Ubuntu" | "CBLMariner" | "Windows2019" | "Windows2022";
  /** The size of the VM. */
  readonly vmSize?: string;
  /** Whether to use a FIPS-enabled OS. */
  readonly enableFIPS?: boolean;
}

/** The response from the List Managed Cluster Snapshots operation. */
export interface ManagedClusterSnapshotListResultOutput {
  /** The list of managed cluster snapshots. */
  value?: Array<ManagedClusterSnapshotOutput>;
  /** The URL to get the next set of managed cluster snapshot results. */
  readonly nextLink?: string;
}

/** A managed cluster snapshot resource. */
export interface ManagedClusterSnapshotOutput extends TrackedResourceOutput {
  /** Properties of a managed cluster snapshot. */
  properties?: ManagedClusterSnapshotPropertiesOutput;
}

/** Properties for a managed cluster snapshot. */
export interface ManagedClusterSnapshotPropertiesOutput {
  /** CreationData to be used to specify the source resource ID to create this snapshot. */
  creationData?: CreationDataOutput;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: "NodePool" | "ManagedCluster";
  /** What the properties will be showed when getting managed cluster snapshot. Those properties are read-only. */
  readonly managedClusterPropertiesReadOnly?: ManagedClusterPropertiesForSnapshotOutput;
}

/** managed cluster properties for snapshot, these properties are read only. */
export interface ManagedClusterPropertiesForSnapshotOutput {
  /** The current kubernetes version. */
  kubernetesVersion?: string;
  /** The current managed cluster sku. */
  sku?: ManagedClusterSKUOutput;
  /** Whether the cluster has enabled Kubernetes Role-Based Access Control or not. */
  enableRbac?: boolean;
  /** The current network profile. */
  readonly networkProfile?: NetworkProfileForSnapshotOutput;
}

/** network profile for managed cluster snapshot, these properties are read only. */
export interface NetworkProfileForSnapshotOutput {
  /** networkPlugin for managed cluster snapshot. */
  networkPlugin?: "azure" | "kubenet" | "none";
  /** NetworkPluginMode for managed cluster snapshot. */
  networkPluginMode?: "Overlay";
  /** networkPolicy for managed cluster snapshot. */
  networkPolicy?: "calico" | "azure";
  /** networkMode for managed cluster snapshot. */
  networkMode?: "transparent" | "bridge";
  /** loadBalancerSku for managed cluster snapshot. */
  loadBalancerSku?: "standard" | "basic";
}

/** List of trusted access roles */
export interface TrustedAccessRoleListResultOutput {
  /** Role list */
  readonly value?: Array<TrustedAccessRoleOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Trusted access role definition. */
export interface TrustedAccessRoleOutput {
  /** Resource type of Azure resource */
  readonly sourceResourceType?: string;
  /** Name of role, name is unique under a source resource type */
  readonly name?: string;
  /** List of rules for the role. This maps to 'rules' property of [Kubernetes Cluster Role](https://kubernetes.io/docs/reference/kubernetes-api/authorization-resources/cluster-role-v1/#ClusterRole). */
  readonly rules?: Array<TrustedAccessRoleRuleOutput>;
}

/** Rule for trusted access role */
export interface TrustedAccessRoleRuleOutput {
  /** List of allowed verbs */
  readonly verbs?: Array<string>;
  /** List of allowed apiGroups */
  readonly apiGroups?: Array<string>;
  /** List of allowed resources */
  readonly resources?: Array<string>;
  /** List of allowed names */
  readonly resourceNames?: Array<string>;
  /** List of allowed nonResourceURLs */
  readonly nonResourceURLs?: Array<string>;
}

/** List of trusted access role bindings */
export interface TrustedAccessRoleBindingListResultOutput {
  /** Role binding list */
  value?: Array<TrustedAccessRoleBindingOutput>;
  /** Link to next page of resources. */
  readonly nextLink?: string;
}

/** Defines binding between a resource and role */
export interface TrustedAccessRoleBindingOutput extends ResourceOutput {
  /** Properties for trusted access role binding */
  properties: TrustedAccessRoleBindingPropertiesOutput;
}

/** Properties for trusted access role binding */
export interface TrustedAccessRoleBindingPropertiesOutput {
  /** The current provisioning state of trusted access role binding. */
  readonly provisioningState?: "Succeeded" | "Failed" | "Updating" | "Deleting";
  /** The ARM resource ID of source resource that trusted access is configured for. */
  sourceResourceId: string;
  /** A list of roles to bind, each item is a resource type qualified role name. For example: 'Microsoft.MachineLearningServices/workspaces/reader'. */
  roles: Array<string>;
}
