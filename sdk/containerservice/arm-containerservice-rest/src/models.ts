// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface ManagedCluster extends TrackedResource {
  /** The managed cluster SKU. */
  sku?: ManagedClusterSKU;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
  /** The identity of the managed cluster, if configured. */
  identity?: ManagedClusterIdentity;
  /** Properties of a managed cluster. */
  properties?: ManagedClusterProperties;
}

export interface ManagedClusterSKU {
  /** The name of a managed cluster SKU. */
  name?: "Basic";
  /** If not specified, the default is 'Free'. See [uptime SLA](https://docs.microsoft.com/azure/aks/uptime-sla) for more details. */
  tier?: "Paid" | "Free";
}

export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: "EdgeZone";
}

export interface ManagedClusterIdentity {
  /** The principal id of the system assigned identity which is used by master components. */
  principalId?: string;
  /** The tenant id of the system assigned identity which is used by master components. */
  tenantId?: string;
  /** For more information see [use managed identities in AKS](https://docs.microsoft.com/azure/aks/use-managed-identity). */
  type?: "SystemAssigned" | "UserAssigned" | "None";
  /** The keys must be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, ManagedServiceIdentityUserAssignedIdentitiesValue>;
}

export interface ManagedServiceIdentityUserAssignedIdentitiesValue {
  /** The principal id of user assigned identity. */
  principalId?: string;
  /** The client id of user assigned identity. */
  clientId?: string;
}

export interface ManagedClusterProperties {
  /** The current provisioning state. */
  provisioningState?: string;
  /** The Power State of the cluster. */
  powerState?: PowerState;
  /** CreationData to be used to specify the source Snapshot ID if the cluster will be created/upgraded using a snapshot. */
  creationData?: CreationData;
  /** The max number of agent pools for the managed cluster. */
  maxAgentPools?: number;
  /** When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details. */
  kubernetesVersion?: string;
  /** The version of Kubernetes the Managed Cluster is running. */
  currentKubernetesVersion?: string;
  /** This cannot be updated once the Managed Cluster has been created. */
  dnsPrefix?: string;
  /** This cannot be updated once the Managed Cluster has been created. */
  fqdnSubdomain?: string;
  /** The FQDN of the master pool. */
  fqdn?: string;
  /** The FQDN of private cluster. */
  privateFQDN?: string;
  /** The Azure Portal requires certain Cross-Origin Resource Sharing (CORS) headers to be sent in some responses, which Kubernetes APIServer doesn't handle by default. This special FQDN supports CORS, allowing the Azure Portal to function properly. */
  azurePortalFQDN?: string;
  /** The agent pool properties. */
  agentPoolProfiles?: Array<ManagedClusterAgentPoolProfile>;
  /** The profile for Linux VMs in the Managed Cluster. */
  linuxProfile?: ContainerServiceLinuxProfile;
  /** The profile for Windows VMs in the Managed Cluster. */
  windowsProfile?: ManagedClusterWindowsProfile;
  /** Information about a service principal identity for the cluster to use for manipulating Azure APIs. */
  servicePrincipalProfile?: ManagedClusterServicePrincipalProfile;
  /** The profile of managed cluster add-on. */
  addonProfiles?: Record<string, ManagedClusterAddonProfile>;
  /** See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on AAD pod identity integration. */
  podIdentityProfile?: ManagedClusterPodIdentityProfile;
  /** The OIDC issuer profile of the Managed Cluster. */
  oidcIssuerProfile?: ManagedClusterOidcIssuerProfile;
  /** The name of the resource group containing agent pool nodes. */
  nodeResourceGroup?: string;
  /** Whether to enable Kubernetes Role-Based Access Control. */
  enableRBAC?: boolean;
  /** (DEPRECATING) Whether to enable Kubernetes pod security policy (preview). This feature is set for removal on October 15th, 2020. Learn more at aka.ms/aks/azpodpolicy. */
  enablePodSecurityPolicy?: boolean;
  /** The default value is false. It can be enabled/disabled on creation and updation of the managed cluster. See [https://aka.ms/NamespaceARMResource](https://aka.ms/NamespaceARMResource) for more details on Namespace as a ARM Resource. */
  enableNamespaceResources?: boolean;
  /** The network configuration profile. */
  networkProfile?: ContainerServiceNetworkProfile;
  /** The Azure Active Directory configuration. */
  aadProfile?: ManagedClusterAADProfile;
  /** The auto upgrade configuration. */
  autoUpgradeProfile?: ManagedClusterAutoUpgradeProfile;
  /** Parameters to be applied to the cluster-autoscaler when enabled */
  autoScalerProfile?: ManagedClusterPropertiesAutoScalerProfile;
  /** The access profile for managed cluster API server. */
  apiServerAccessProfile?: ManagedClusterAPIServerAccessProfile;
  /** This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{encryptionSetName}' */
  diskEncryptionSetID?: string;
  /** Identities associated with the cluster. */
  identityProfile?: Record<string, UserAssignedIdentity>;
  /** Private link resources associated with the cluster. */
  privateLinkResources?: Array<PrivateLinkResource>;
  /** If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview). */
  disableLocalAccounts?: boolean;
  /** Configurations for provisioning the cluster with HTTP proxy servers. */
  httpProxyConfig?: ManagedClusterHttpProxyConfig;
  /** Security profile for the managed cluster. */
  securityProfile?: ManagedClusterSecurityProfile;
  /** Storage profile for the managed cluster. */
  storageProfile?: ManagedClusterStorageProfile;
  /** Ingress profile for the managed cluster. */
  ingressProfile?: ManagedClusterIngressProfile;
  /** Allow or deny public network access for AKS */
  publicNetworkAccess?: "Enabled" | "Disabled";
  /** Workload Auto-scaler profile for the container service cluster. */
  workloadAutoScalerProfile?: ManagedClusterWorkloadAutoScalerProfile;
}

export interface PowerState {
  /** Tells whether the cluster is Running or Stopped */
  code?: "Running" | "Stopped";
}

export interface CreationData {
  /** This is the ARM ID of the source object to be used to create the target object. */
  sourceResourceId?: string;
}

export interface ManagedClusterAgentPoolProfile extends ManagedClusterAgentPoolProfileProperties {
  /** Windows agent pool names must be 6 characters or less. */
  name: string;
}

export interface ManagedClusterAgentPoolProfileProperties {
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
  currentOrchestratorVersion?: string;
  /** The version of node image */
  nodeImageVersion?: string;
  /** Settings for upgrading the agentpool */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /** The current deployment or provisioning state. */
  provisioningState?: string;
  /** When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded */
  powerState?: PowerState;
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
  kubeletConfig?: KubeletConfig;
  /** The OS configuration of Linux agent nodes. */
  linuxOSConfig?: LinuxOSConfig;
  /** This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption */
  enableEncryptionAtHost?: boolean;
  /** Whether to enable UltraSSD */
  enableUltraSSD?: boolean;
  /** See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details. */
  enableFIPS?: boolean;
  /** GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. */
  gpuInstanceProfile?: "MIG1g" | "MIG2g" | "MIG3g" | "MIG4g" | "MIG7g";
  /** CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot. */
  creationData?: CreationData;
  /** AKS will associate the specified agent pool with the Capacity Reservation Group. */
  capacityReservationGroupID?: string;
  /** This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts). */
  hostGroupID?: string;
}

export interface AgentPoolUpgradeSettings {
  /** This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 1. For more information, including best practices, see: https://docs.microsoft.com/azure/aks/upgrade-cluster#customize-node-surge-upgrade */
  maxSurge?: string;
}

export interface KubeletConfig {
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

export interface LinuxOSConfig {
  /** Sysctl settings for Linux agent nodes. */
  sysctls?: SysctlConfig;
  /** Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). */
  transparentHugePageEnabled?: string;
  /** Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). */
  transparentHugePageDefrag?: string;
  /** The size in MB of a swap file that will be created on each node. */
  swapFileSizeMB?: number;
}

export interface SysctlConfig {
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

export interface ContainerServiceLinuxProfile {
  /** The administrator username to use for Linux VMs. */
  adminUsername: string;
  /** The SSH configuration for Linux-based VMs running on Azure. */
  ssh: ContainerServiceSshConfiguration;
}

export interface ContainerServiceSshConfiguration {
  /** The list of SSH public keys used to authenticate with Linux-based VMs. A maximum of 1 key may be specified. */
  publicKeys: Array<ContainerServiceSshPublicKey>;
}

export interface ContainerServiceSshPublicKey {
  /** Certificate public key used to authenticate with VMs through SSH. The certificate must be in PEM format with or without headers. */
  keyData: string;
}

export interface ManagedClusterWindowsProfile {
  /** Specifies the name of the administrator account. <br><br> **Restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters */
  adminUsername: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length:** 8 characters <br><br> **Max-length:** 123 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" */
  adminPassword?: string;
  /** The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details. */
  licenseType?: "None" | "Windows_Server";
  /** For more details on CSI proxy, see the [CSI proxy GitHub repo](https://github.com/kubernetes-csi/csi-proxy). */
  enableCSIProxy?: boolean;
  /** The Windows gMSA Profile in the Managed Cluster. */
  gmsaProfile?: WindowsGmsaProfile;
}

export interface WindowsGmsaProfile {
  /** Specifies whether to enable Windows gMSA in the managed cluster. */
  enabled?: boolean;
  /** Specifies the DNS server for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. */
  dnsServer?: string;
  /** Specifies the root domain name for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. */
  rootDomainName?: string;
}

export interface ManagedClusterServicePrincipalProfile {
  /** The ID for the service principal. */
  clientId: string;
  /** The secret password associated with the service principal in plain text. */
  secret?: string;
}

export interface ManagedClusterAddonProfile {
  /** Whether the add-on is enabled or not. */
  enabled: boolean;
  /** Key-value pairs for configuring an add-on. */
  config?: Record<string, string>;
  /** Information of user assigned identity used by this add-on. */
  identity?: ManagedClusterAddonProfileIdentity;
}

export interface ManagedClusterAddonProfileIdentity extends UserAssignedIdentity {}

export interface UserAssignedIdentity {
  /** The resource ID of the user assigned identity. */
  resourceId?: string;
  /** The client ID of the user assigned identity. */
  clientId?: string;
  /** The object ID of the user assigned identity. */
  objectId?: string;
}

export interface ManagedClusterPodIdentityProfile {
  /** Whether the pod identity addon is enabled. */
  enabled?: boolean;
  /** Running in Kubenet is disabled by default due to the security related nature of AAD Pod Identity and the risks of IP spoofing. See [using Kubenet network plugin with AAD Pod Identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity#using-kubenet-network-plugin-with-azure-active-directory-pod-managed-identities) for more information. */
  allowNetworkPluginKubenet?: boolean;
  /** The pod identities to use in the cluster. */
  userAssignedIdentities?: Array<ManagedClusterPodIdentity>;
  /** The pod identity exceptions to allow. */
  userAssignedIdentityExceptions?: Array<ManagedClusterPodIdentityException>;
}

export interface ManagedClusterPodIdentity {
  /** The name of the pod identity. */
  name: string;
  /** The namespace of the pod identity. */
  namespace: string;
  /** The binding selector to use for the AzureIdentityBinding resource. */
  bindingSelector?: string;
  /** The user assigned identity details. */
  identity: UserAssignedIdentity;
  /** The current provisioning state of the pod identity. */
  provisioningState?: "Assigned" | "Updating" | "Deleting" | "Failed";
  provisioningInfo?: ManagedClusterPodIdentityProvisioningInfo;
}

export interface ManagedClusterPodIdentityProvisioningInfo {
  /** Pod identity assignment error (if any). */
  error?: ManagedClusterPodIdentityProvisioningError;
}

export interface ManagedClusterPodIdentityProvisioningError {
  /** Details about the error. */
  error?: ManagedClusterPodIdentityProvisioningErrorBody;
}

export interface ManagedClusterPodIdentityProvisioningErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: Array<ManagedClusterPodIdentityProvisioningErrorBody>;
}

export interface ManagedClusterPodIdentityException {
  /** The name of the pod identity exception. */
  name: string;
  /** The namespace of the pod identity exception. */
  namespace: string;
  /** The pod labels to match. */
  podLabels: Record<string, string>;
}

export interface ManagedClusterOidcIssuerProfile {
  /** The OIDC issuer url of the Managed Cluster. */
  issuerURL?: string;
  /** Whether the OIDC issuer is enabled. */
  enabled?: boolean;
}

export interface ContainerServiceNetworkProfile {
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
  loadBalancerProfile?: ManagedClusterLoadBalancerProfile;
  /** Profile of the cluster NAT gateway. */
  natGatewayProfile?: ManagedClusterNATGatewayProfile;
  /** One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. */
  podCidrs?: Array<string>;
  /** One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. They must not overlap with any Subnet IP ranges. */
  serviceCidrs?: Array<string>;
  /** IP families are used to determine single-stack or dual-stack clusters. For single-stack, the expected value is IPv4. For dual-stack, the expected values are IPv4 and IPv6. */
  ipFamilies?: Array<"IPv4" | "IPv6">;
}

export interface ManagedClusterLoadBalancerProfile {
  /** Desired managed outbound IPs for the cluster load balancer. */
  managedOutboundIPs?: ManagedClusterLoadBalancerProfileManagedOutboundIPs;
  /** Desired outbound IP Prefix resources for the cluster load balancer. */
  outboundIPPrefixes?: ManagedClusterLoadBalancerProfileOutboundIPPrefixes;
  /** Desired outbound IP resources for the cluster load balancer. */
  outboundIPs?: ManagedClusterLoadBalancerProfileOutboundIPs;
  /** The effective outbound IP resources of the cluster load balancer. */
  effectiveOutboundIPs?: Array<ResourceReference>;
  /** The desired number of allocated SNAT ports per VM. Allowed values are in the range of 0 to 64000 (inclusive). The default value is 0 which results in Azure dynamically allocating ports. */
  allocatedOutboundPorts?: number;
  /** Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 30 minutes. */
  idleTimeoutInMinutes?: number;
  /** Enable multiple standard load balancers per AKS cluster or not. */
  enableMultipleStandardLoadBalancers?: boolean;
}

export interface ManagedClusterLoadBalancerProfileManagedOutboundIPs {
  /** The desired number of IPv4 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 1. */
  count?: number;
  /** The desired number of IPv6 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 0 for single-stack and 1 for dual-stack. */
  countIPv6?: number;
}

export interface ManagedClusterLoadBalancerProfileOutboundIPPrefixes {
  /** A list of public IP prefix resources. */
  publicIPPrefixes?: Array<ResourceReference>;
}

export interface ResourceReference {
  /** The fully qualified Azure resource id. */
  id?: string;
}

export interface ManagedClusterLoadBalancerProfileOutboundIPs {
  /** A list of public IP resources. */
  publicIPs?: Array<ResourceReference>;
}

export interface ManagedClusterNATGatewayProfile {
  /** Profile of the managed outbound IP resources of the cluster NAT gateway. */
  managedOutboundIPProfile?: ManagedClusterManagedOutboundIPProfile;
  /** The effective outbound IP resources of the cluster NAT gateway. */
  effectiveOutboundIPs?: Array<ResourceReference>;
  /** Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 4 minutes. */
  idleTimeoutInMinutes?: number;
}

export interface ManagedClusterManagedOutboundIPProfile {
  /** The desired number of outbound IPs created/managed by Azure. Allowed values must be in the range of 1 to 16 (inclusive). The default value is 1. */
  count?: number;
}

export interface ManagedClusterAADProfile {
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

export interface ManagedClusterAutoUpgradeProfile {
  /** For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel). */
  upgradeChannel?: "rapid" | "stable" | "patch" | "node-image" | "none";
}

export interface ManagedClusterPropertiesAutoScalerProfile {
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

export interface ManagedClusterAPIServerAccessProfile {
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

export interface PrivateLinkResource {
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
  privateLinkServiceID?: string;
}

export interface ManagedClusterHttpProxyConfig {
  /** The HTTP proxy server endpoint to use. */
  httpProxy?: string;
  /** The HTTPS proxy server endpoint to use. */
  httpsProxy?: string;
  /** The endpoints that should not go through proxy. */
  noProxy?: Array<string>;
  /** A read-only list of all endpoints for which traffic should not be sent to the proxy. This list is a superset of noProxy and values injected by AKS. */
  effectiveNoProxy?: Array<string>;
  /** Alternative CA cert to use for connecting to proxy servers. */
  trustedCa?: string;
}

export interface ManagedClusterSecurityProfile {
  /** Microsoft Defender settings for the security profile. */
  defender?: ManagedClusterSecurityProfileDefender;
  /** Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile. */
  azureKeyVaultKms?: AzureKeyVaultKms;
  /** [Workload Identity](https://azure.github.io/azure-workload-identity/docs/) settings for the security profile. */
  workloadIdentity?: ManagedClusterSecurityProfileWorkloadIdentity;
}

export interface ManagedClusterSecurityProfileDefender {
  /** Resource ID of the Log Analytics workspace to be associated with Microsoft Defender. When Microsoft Defender is enabled, this field is required and must be a valid workspace resource ID. When Microsoft Defender is disabled, leave the field empty. */
  logAnalyticsWorkspaceResourceId?: string;
  /** Microsoft Defender threat detection for Cloud settings for the security profile. */
  securityMonitoring?: ManagedClusterSecurityProfileDefenderSecurityMonitoring;
}

export interface ManagedClusterSecurityProfileDefenderSecurityMonitoring {
  /** Whether to enable Defender threat detection */
  enabled?: boolean;
}

export interface AzureKeyVaultKms {
  /** Whether to enable Azure Key Vault key management service. The default is false. */
  enabled?: boolean;
  /** Identifier of Azure Key Vault key. See [key identifier format](https://docs.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates#vault-name-and-object-name) for more details. When Azure Key Vault key management service is enabled, this field is required and must be a valid key identifier. When Azure Key Vault key management service is disabled, leave the field empty. */
  keyId?: string;
  /** Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. */
  keyVaultNetworkAccess?: "Public" | "Private";
  /** Resource ID of key vault. When keyVaultNetworkAccess is `Private`, this field is required and must be a valid resource ID. When keyVaultNetworkAccess is `Public`, leave the field empty. */
  keyVaultResourceId?: string;
}

export interface ManagedClusterSecurityProfileWorkloadIdentity {
  /** Whether to enable Workload Identity */
  enabled?: boolean;
}

export interface ManagedClusterStorageProfile {
  /** AzureDisk CSI Driver settings for the storage profile. */
  diskCSIDriver?: ManagedClusterStorageProfileDiskCSIDriver;
  /** AzureFile CSI Driver settings for the storage profile. */
  fileCSIDriver?: ManagedClusterStorageProfileFileCSIDriver;
  /** Snapshot Controller settings for the storage profile. */
  snapshotController?: ManagedClusterStorageProfileSnapshotController;
  /** AzureBlob CSI Driver settings for the storage profile. */
  blobCSIDriver?: ManagedClusterStorageProfileBlobCSIDriver;
}

export interface ManagedClusterStorageProfileDiskCSIDriver {
  /** Whether to enable AzureDisk CSI Driver. The default value is true. */
  enabled?: boolean;
  /** The version of AzureDisk CSI Driver. The default value is v1. */
  version?: string;
}

export interface ManagedClusterStorageProfileFileCSIDriver {
  /** Whether to enable AzureFile CSI Driver. The default value is true. */
  enabled?: boolean;
}

export interface ManagedClusterStorageProfileSnapshotController {
  /** Whether to enable Snapshot Controller. The default value is true. */
  enabled?: boolean;
}

export interface ManagedClusterStorageProfileBlobCSIDriver {
  /** Whether to enable AzureBlob CSI Driver. The default value is false. */
  enabled?: boolean;
}

export interface ManagedClusterIngressProfile {
  /** Web App Routing settings for the ingress profile. */
  webAppRouting?: ManagedClusterIngressProfileWebAppRouting;
}

export interface ManagedClusterIngressProfileWebAppRouting {
  /** Whether to enable Web App Routing. */
  enabled?: boolean;
  /** Resource ID of the DNS Zone to be associated with the web app. Used only when Web App Routing is enabled. */
  dnsZoneResourceId?: string;
}

export interface ManagedClusterWorkloadAutoScalerProfile {
  /** KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile. */
  keda?: ManagedClusterWorkloadAutoScalerProfileKeda;
}

export interface ManagedClusterWorkloadAutoScalerProfileKeda {
  /** Whether to enable KEDA. */
  enabled: boolean;
}

export interface TrackedResource extends Resource {
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location: string;
}

export interface Resource {
  /** Fully qualified resource ID for the resource. Ex - /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resourceProviderNamespace}/{resourceType}/{resourceName} */
  id?: string;
  /** The name of the resource */
  name?: string;
  /** The type of the resource. E.g. "Microsoft.Compute/virtualMachines" or "Microsoft.Storage/storageAccounts" */
  type?: string;
  /** Azure Resource Manager metadata containing createdBy and modifiedBy information. */
  systemData?: SystemData;
}

export interface SystemData {
  /** The identity that created the resource. */
  createdBy?: string;
  /** The type of identity that created the resource. */
  createdByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource creation (UTC). */
  createdAt?: Date | string;
  /** The identity that last modified the resource. */
  lastModifiedBy?: string;
  /** The type of identity that last modified the resource. */
  lastModifiedByType?: "User" | "Application" | "ManagedIdentity" | "Key";
  /** The timestamp of resource last modification (UTC) */
  lastModifiedAt?: Date | string;
}

export interface ManagedClusterAccessProfile extends TrackedResource {
  /** AccessProfile of a managed cluster. */
  properties?: AccessProfile;
}

export interface AccessProfile {
  /**
   * Base64-encoded Kubernetes configuration file.
   *
   * Value may contain base64 encoded characters
   */
  kubeConfig?: string;
}

export interface TagsObject {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export interface MaintenanceConfiguration extends SubResource {
  /** The system metadata relating to this resource. */
  systemData?: SystemData;
  /** Properties of a default maintenance configuration. */
  properties?: MaintenanceConfigurationProperties;
}

export interface MaintenanceConfigurationProperties {
  /** If two array entries specify the same day of the week, the applied configuration is the union of times in both entries. */
  timeInWeek?: Array<TimeInWeek>;
  /** Time slots on which upgrade is not allowed. */
  notAllowedTime?: Array<TimeSpan>;
}

export interface TimeInWeek {
  /** The day of the week. */
  day?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
  /** Each integer hour represents a time range beginning at 0m after the hour ending at the next hour (non-inclusive). 0 corresponds to 00:00 UTC, 23 corresponds to 23:00 UTC. Specifying [0, 1] means the 00:00 - 02:00 UTC time range. */
  hourSlots?: Array<number>;
}

export interface TimeSpan {
  /** The start of a time span */
  start?: Date | string;
  /** The end of a time span */
  end?: Date | string;
}

export interface SubResource {
  /** Resource ID. */
  id?: string;
  /** The name of the resource that is unique within a resource group. This name can be used to access the resource. */
  name?: string;
  /** Resource type */
  type?: string;
}

export interface AgentPool extends SubResource {
  /** Properties of an agent pool. */
  properties?: ManagedClusterAgentPoolProfileProperties;
}

export interface PrivateEndpointConnection {
  /** The ID of the private endpoint connection. */
  id?: string;
  /** The name of the private endpoint connection. */
  name?: string;
  /** The resource type. */
  type?: string;
  /** The properties of a private endpoint connection. */
  properties?: PrivateEndpointConnectionProperties;
}

export interface PrivateEndpointConnectionProperties {
  /** The current provisioning state. */
  provisioningState?: "Succeeded" | "Creating" | "Deleting" | "Failed";
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

export interface PrivateEndpoint {
  /** The resource ID of the private endpoint */
  id?: string;
}

export interface PrivateLinkServiceConnectionState {
  /** The private link service connection status. */
  status?: "Pending" | "Approved" | "Rejected" | "Disconnected";
  /** The private link service connection description. */
  description?: string;
}

export interface RunCommandRequest {
  /** The command to run. */
  command: string;
  /** A base64 encoded zip file containing the files required by the command. */
  context?: string;
  /** AuthToken issued for AKS AAD Server App. */
  clusterToken?: string;
}

export interface Snapshot extends TrackedResource {
  /** Properties of a snapshot. */
  properties?: SnapshotProperties;
}

export interface SnapshotProperties {
  /** CreationData to be used to specify the source agent pool resource ID to create this snapshot. */
  creationData?: CreationData;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: "NodePool" | "ManagedCluster";
  /** The version of Kubernetes. */
  kubernetesVersion?: string;
  /** The version of node image. */
  nodeImageVersion?: string;
  /** The operating system type. The default is Linux. */
  osType?: "Linux" | "Windows";
  /** Specifies the OS SKU used by the agent pool. If not specified, the default is Ubuntu if OSType=Linux or Windows2019 if OSType=Windows. And the default Windows OSSKU will be changed to Windows2022 after Windows2019 is deprecated. */
  osSku?: "Ubuntu" | "CBLMariner" | "Windows2019" | "Windows2022";
  /** The size of the VM. */
  vmSize?: string;
  /** Whether to use a FIPS-enabled OS. */
  enableFIPS?: boolean;
}

export interface ManagedClusterSnapshot extends TrackedResource {
  /** Properties of a managed cluster snapshot. */
  properties?: ManagedClusterSnapshotProperties;
}

export interface ManagedClusterSnapshotProperties {
  /** CreationData to be used to specify the source resource ID to create this snapshot. */
  creationData?: CreationData;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: "NodePool" | "ManagedCluster";
  /** What the properties will be showed when getting managed cluster snapshot. Those properties are read-only. */
  managedClusterPropertiesReadOnly?: ManagedClusterPropertiesForSnapshot;
}

export interface ManagedClusterPropertiesForSnapshot {
  /** The current kubernetes version. */
  kubernetesVersion?: string;
  /** The current managed cluster sku. */
  sku?: ManagedClusterSKU;
  /** Whether the cluster has enabled Kubernetes Role-Based Access Control or not. */
  enableRbac?: boolean;
  /** The current network profile. */
  networkProfile?: NetworkProfileForSnapshot;
}

export interface NetworkProfileForSnapshot {
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

export interface TrustedAccessRoleBinding extends Resource {
  /** Properties for trusted access role binding */
  properties: TrustedAccessRoleBindingProperties;
}

export interface TrustedAccessRoleBindingProperties {
  /** The current provisioning state of trusted access role binding. */
  provisioningState?: "Succeeded" | "Failed" | "Updating" | "Deleting";
  /** The ARM resource ID of source resource that trusted access is configured for. */
  sourceResourceId: string;
  /** A list of roles to bind, each item is a resource type qualified role name. For example: 'Microsoft.MachineLearningServices/workspaces/reader'. */
  roles: Array<string>;
}
