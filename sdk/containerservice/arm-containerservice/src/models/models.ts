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
/** Agent Pool. */
export interface AgentPool extends ProxyResource {
  /** Unique read-only string used to implement optimistic concurrency. The eTag value will change when the resource is updated. Specify an if-match or if-none-match header with the eTag value for a subsequent request to enable optimistic concurrency per the normal eTag convention. */
  readonly eTag?: string;
  /** Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1. */
  count?: number;
  /** The size of the agent pool VMs. VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions */
  vmSize?: string;
  /** OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified. */
  osDiskSizeGB?: number;
  /** The OS disk type to be used for machines in the agent pool. The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). */
  osDiskType?: OSDiskType;
  /** Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. */
  kubeletDiskType?: KubeletDiskType;
  /** Determines the type of workload a node can run. */
  workloadRuntime?: WorkloadRuntime;
  /** Message of the day for Linux nodes, base64-encoded. A base64-encoded string which will be written to /etc/motd after decoding. This allows customization of the message of the day for Linux nodes. It must not be specified for Windows nodes. It must be a static string (i.e., will be printed raw and not be executed as a script). */
  messageOfTheDay?: string;
  /** The ID of the subnet which agent pool nodes and optionally pods will join on startup. If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  vnetSubnetID?: string;
  /** The ID of the subnet which pods will join when launched. If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  podSubnetID?: string;
  /** Pod IP Allocation Mode. The IP allocation mode for pods in the agent pool. Must be used with podSubnetId. The default is 'DynamicIndividual'. */
  podIPAllocationMode?: PodIPAllocationMode;
  /** The maximum number of pods that can run on a node. */
  maxPods?: number;
  /** The operating system type. The default is Linux. */
  osType?: OSType;
  /** Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. */
  osSKU?: Ossku;
  /** The maximum number of nodes for auto-scaling */
  maxCount?: number;
  /** The minimum number of nodes for auto-scaling */
  minCount?: number;
  /** Whether to enable auto-scaler */
  enableAutoScaling?: boolean;
  /** The scale down mode to use when scaling the Agent Pool. This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete. */
  scaleDownMode?: ScaleDownMode;
  /** The type of Agent Pool. */
  typePropertiesType?: AgentPoolType;
  /** The mode of an agent pool. A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools */
  mode?: AgentPoolMode;
  /** The version of Kubernetes specified by the user. Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool). */
  orchestratorVersion?: string;
  /** The version of Kubernetes the Agent Pool is running. If orchestratorVersion is a fully specified version <major.minor.patch>, this field will be exactly equal to it. If orchestratorVersion is <major.minor>, this field will contain the full <major.minor.patch> version being used. */
  readonly currentOrchestratorVersion?: string;
  /** The version of node image */
  readonly nodeImageVersion?: string;
  /** Defines the upgrade strategy for the agent pool. The default is Rolling. */
  upgradeStrategy?: UpgradeStrategy;
  /** Settings for upgrading the agentpool */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /** Settings for Blue-Green upgrade on the agentpool. Applies when upgrade strategy is set to BlueGreen. */
  upgradeSettingsBlueGreen?: AgentPoolBlueGreenUpgradeSettings;
  /** The current deployment or provisioning state. */
  readonly provisioningState?: string;
  /** Whether the Agent Pool is running or stopped. When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded */
  powerState?: PowerState;
  /** The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'. */
  availabilityZones?: string[];
  /** Whether each node is allocated its own public IP. Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false. */
  enableNodePublicIP?: boolean;
  /** The public IP prefix ID which VM nodes should use IPs from. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName} */
  nodePublicIPPrefixID?: string;
  /** The Virtual Machine Scale Set priority. */
  scaleSetPriority?: ScaleSetPriority;
  /** The Virtual Machine Scale Set eviction policy. The eviction policy specifies what to do with the VM when it is evicted. The default is Delete. For more information about eviction see [spot VMs](https://docs.microsoft.com/azure/virtual-machines/spot-vms) */
  scaleSetEvictionPolicy?: ScaleSetEvictionPolicy;
  /** The max price (in US Dollars) you are willing to pay for spot instances. Possible values are any decimal value greater than zero or -1 which indicates default price to be up-to on-demand. Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing) */
  spotMaxPrice?: number;
  /** The tags to be persisted on the agent pool virtual machine scale set. */
  tags?: Record<string, string>;
  /** The node labels to be persisted across all nodes in agent pool. */
  nodeLabels?: Record<string, string>;
  /** The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule. */
  nodeTaints?: string[];
  /** Taints added on the nodes during creation that will not be reconciled by AKS. These taints will not be reconciled by AKS and can be removed with a kubectl call. This field can be modified after node pool is created, but nodes will not be recreated with new taints until another operation that requires recreation (e.g. node image upgrade) happens. These taints allow for required configuration to run before the node is ready to accept workloads, for example 'key1=value1:NoSchedule' that then can be removed with `kubectl taint nodes node1 key1=value1:NoSchedule-` */
  nodeInitializationTaints?: string[];
  /** The ID for Proximity Placement Group. */
  proximityPlacementGroupID?: string;
  /** The Kubelet configuration on the agent pool nodes. */
  kubeletConfig?: KubeletConfig;
  /** The OS configuration of Linux agent nodes. */
  linuxOSConfig?: LinuxOSConfig;
  /** Whether to enable host based OS and data drive encryption. This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption */
  enableEncryptionAtHost?: boolean;
  /** Whether to enable UltraSSD */
  enableUltraSSD?: boolean;
  /** Whether to use a FIPS-enabled OS. See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details. */
  enableFips?: boolean;
  /** GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. */
  gpuInstanceProfile?: GPUInstanceProfile;
  /** CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot. */
  creationData?: CreationData;
  /** The fully qualified resource ID of the Capacity Reservation Group to provide virtual machines from a reserved group of Virtual Machines. This is of the form: '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Compute/capacityreservationgroups/{capacityReservationGroupName}' Customers use it to create an agentpool with a specified CRG. For more information see [Capacity Reservation](https://learn.microsoft.com/en-us/azure/virtual-machines/capacity-reservation-overview) */
  capacityReservationGroupID?: string;
  /** The fully qualified resource ID of the Dedicated Host Group to provision virtual machines from, used only in creation scenario and not allowed to changed once set. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts). */
  hostGroupID?: string;
  /** Network-related settings of an agent pool. */
  networkProfile?: AgentPoolNetworkProfile;
  /** The Windows agent pool's specific profile. */
  windowsProfile?: AgentPoolWindowsProfile;
  /** The security settings of an agent pool. */
  securityProfile?: AgentPoolSecurityProfile;
  /** GPU settings for the Agent Pool. */
  gpuProfile?: GPUProfile;
  /** Profile specific to a managed agent pool in Gateway mode. This field cannot be set if agent pool mode is not Gateway. */
  gatewayProfile?: AgentPoolGatewayProfile;
  /** Configuration for using artifact streaming on AKS. */
  artifactStreamingProfile?: AgentPoolArtifactStreamingProfile;
  /** Specifications on VirtualMachines agent pool. */
  virtualMachinesProfile?: VirtualMachinesProfile;
  /** The status of nodes in a VirtualMachines agent pool. */
  virtualMachineNodesStatus?: VirtualMachineNodes[];
  /** Contains read-only information about the Agent Pool. */
  status?: AgentPoolStatus;
  /** Configures the per-node local DNS, with VnetDNS and KubeDNS overrides. LocalDNS helps improve performance and reliability of DNS resolution in an AKS cluster. For more details see aka.ms/aks/localdns. */
  localDNSProfile?: LocalDNSProfile;
  /** Settings to determine the node customization used to provision nodes in a pool. */
  nodeCustomizationProfile?: NodeCustomizationProfile;
}

export function agentPoolSerializer(item: AgentPool): any {
  return {
    properties: areAllPropsUndefined(item, [
      "count",
      "vmSize",
      "osDiskSizeGB",
      "osDiskType",
      "kubeletDiskType",
      "workloadRuntime",
      "messageOfTheDay",
      "vnetSubnetID",
      "podSubnetID",
      "podIPAllocationMode",
      "maxPods",
      "osType",
      "osSKU",
      "maxCount",
      "minCount",
      "enableAutoScaling",
      "scaleDownMode",
      "type",
      "mode",
      "orchestratorVersion",
      "upgradeStrategy",
      "upgradeSettings",
      "upgradeSettingsBlueGreen",
      "powerState",
      "availabilityZones",
      "enableNodePublicIP",
      "nodePublicIPPrefixID",
      "scaleSetPriority",
      "scaleSetEvictionPolicy",
      "spotMaxPrice",
      "tags",
      "nodeLabels",
      "nodeTaints",
      "nodeInitializationTaints",
      "proximityPlacementGroupID",
      "kubeletConfig",
      "linuxOSConfig",
      "enableEncryptionAtHost",
      "enableUltraSSD",
      "enableFIPS",
      "gpuInstanceProfile",
      "creationData",
      "capacityReservationGroupID",
      "hostGroupID",
      "networkProfile",
      "windowsProfile",
      "securityProfile",
      "gpuProfile",
      "gatewayProfile",
      "artifactStreamingProfile",
      "virtualMachinesProfile",
      "virtualMachineNodesStatus",
      "status",
      "localDNSProfile",
      "nodeCustomizationProfile",
    ])
      ? undefined
      : _agentPoolPropertiesSerializer(item),
  };
}

export function agentPoolDeserializer(item: any): AgentPool {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _agentPoolPropertiesDeserializer(item["properties"])),
  };
}

/** Properties for the container service agent pool profile. */
export interface ManagedClusterAgentPoolProfileProperties {
  /** Unique read-only string used to implement optimistic concurrency. The eTag value will change when the resource is updated. Specify an if-match or if-none-match header with the eTag value for a subsequent request to enable optimistic concurrency per the normal eTag convention. */
  readonly eTag?: string;
  /** Number of agents (VMs) to host docker containers. Allowed values must be in the range of 0 to 1000 (inclusive) for user pools and in the range of 1 to 1000 (inclusive) for system pools. The default value is 1. */
  count?: number;
  /** The size of the agent pool VMs. VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions */
  vmSize?: string;
  /** OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified. */
  osDiskSizeGB?: number;
  /** The OS disk type to be used for machines in the agent pool. The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). */
  osDiskType?: OSDiskType;
  /** Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. */
  kubeletDiskType?: KubeletDiskType;
  /** Determines the type of workload a node can run. */
  workloadRuntime?: WorkloadRuntime;
  /** Message of the day for Linux nodes, base64-encoded. A base64-encoded string which will be written to /etc/motd after decoding. This allows customization of the message of the day for Linux nodes. It must not be specified for Windows nodes. It must be a static string (i.e., will be printed raw and not be executed as a script). */
  messageOfTheDay?: string;
  /** The ID of the subnet which agent pool nodes and optionally pods will join on startup. If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  vnetSubnetID?: string;
  /** The ID of the subnet which pods will join when launched. If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  podSubnetID?: string;
  /** Pod IP Allocation Mode. The IP allocation mode for pods in the agent pool. Must be used with podSubnetId. The default is 'DynamicIndividual'. */
  podIPAllocationMode?: PodIPAllocationMode;
  /** The maximum number of pods that can run on a node. */
  maxPods?: number;
  /** The operating system type. The default is Linux. */
  osType?: OSType;
  /** Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. */
  osSKU?: Ossku;
  /** The maximum number of nodes for auto-scaling */
  maxCount?: number;
  /** The minimum number of nodes for auto-scaling */
  minCount?: number;
  /** Whether to enable auto-scaler */
  enableAutoScaling?: boolean;
  /** The scale down mode to use when scaling the Agent Pool. This also effects the cluster autoscaler behavior. If not specified, it defaults to Delete. */
  scaleDownMode?: ScaleDownMode;
  /** The type of Agent Pool. */
  type?: AgentPoolType;
  /** The mode of an agent pool. A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools */
  mode?: AgentPoolMode;
  /** The version of Kubernetes specified by the user. Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. As a best practice, you should upgrade all node pools in an AKS cluster to the same Kubernetes version. The node pool version must have the same major version as the control plane. The node pool minor version must be within two minor versions of the control plane version. The node pool version cannot be greater than the control plane version. For more information see [upgrading a node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#upgrade-a-node-pool). */
  orchestratorVersion?: string;
  /** The version of Kubernetes the Agent Pool is running. If orchestratorVersion is a fully specified version <major.minor.patch>, this field will be exactly equal to it. If orchestratorVersion is <major.minor>, this field will contain the full <major.minor.patch> version being used. */
  readonly currentOrchestratorVersion?: string;
  /** The version of node image */
  readonly nodeImageVersion?: string;
  /** Defines the upgrade strategy for the agent pool. The default is Rolling. */
  upgradeStrategy?: UpgradeStrategy;
  /** Settings for upgrading the agentpool */
  upgradeSettings?: AgentPoolUpgradeSettings;
  /** Settings for Blue-Green upgrade on the agentpool. Applies when upgrade strategy is set to BlueGreen. */
  upgradeSettingsBlueGreen?: AgentPoolBlueGreenUpgradeSettings;
  /** The current deployment or provisioning state. */
  readonly provisioningState?: string;
  /** Whether the Agent Pool is running or stopped. When an Agent Pool is first created it is initially Running. The Agent Pool can be stopped by setting this field to Stopped. A stopped Agent Pool stops all of its VMs and does not accrue billing charges. An Agent Pool can only be stopped if it is Running and provisioning state is Succeeded */
  powerState?: PowerState;
  /** The list of Availability zones to use for nodes. This can only be specified if the AgentPoolType property is 'VirtualMachineScaleSets'. */
  availabilityZones?: string[];
  /** Whether each node is allocated its own public IP. Some scenarios may require nodes in a node pool to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. For more information see [assigning a public IP per node](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#assign-a-public-ip-per-node-for-your-node-pools). The default is false. */
  enableNodePublicIP?: boolean;
  /** The public IP prefix ID which VM nodes should use IPs from. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName} */
  nodePublicIPPrefixID?: string;
  /** The Virtual Machine Scale Set priority. */
  scaleSetPriority?: ScaleSetPriority;
  /** The Virtual Machine Scale Set eviction policy. The eviction policy specifies what to do with the VM when it is evicted. The default is Delete. For more information about eviction see [spot VMs](https://docs.microsoft.com/azure/virtual-machines/spot-vms) */
  scaleSetEvictionPolicy?: ScaleSetEvictionPolicy;
  /** The max price (in US Dollars) you are willing to pay for spot instances. Possible values are any decimal value greater than zero or -1 which indicates default price to be up-to on-demand. Possible values are any decimal value greater than zero or -1 which indicates the willingness to pay any on-demand price. For more details on spot pricing, see [spot VMs pricing](https://docs.microsoft.com/azure/virtual-machines/spot-vms#pricing) */
  spotMaxPrice?: number;
  /** The tags to be persisted on the agent pool virtual machine scale set. */
  tags?: Record<string, string>;
  /** The node labels to be persisted across all nodes in agent pool. */
  nodeLabels?: Record<string, string>;
  /** The taints added to new nodes during node pool create and scale. For example, key=value:NoSchedule. */
  nodeTaints?: string[];
  /** Taints added on the nodes during creation that will not be reconciled by AKS. These taints will not be reconciled by AKS and can be removed with a kubectl call. This field can be modified after node pool is created, but nodes will not be recreated with new taints until another operation that requires recreation (e.g. node image upgrade) happens. These taints allow for required configuration to run before the node is ready to accept workloads, for example 'key1=value1:NoSchedule' that then can be removed with `kubectl taint nodes node1 key1=value1:NoSchedule-` */
  nodeInitializationTaints?: string[];
  /** The ID for Proximity Placement Group. */
  proximityPlacementGroupID?: string;
  /** The Kubelet configuration on the agent pool nodes. */
  kubeletConfig?: KubeletConfig;
  /** The OS configuration of Linux agent nodes. */
  linuxOSConfig?: LinuxOSConfig;
  /** Whether to enable host based OS and data drive encryption. This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption */
  enableEncryptionAtHost?: boolean;
  /** Whether to enable UltraSSD */
  enableUltraSSD?: boolean;
  /** Whether to use a FIPS-enabled OS. See [Add a FIPS-enabled node pool](https://docs.microsoft.com/azure/aks/use-multiple-node-pools#add-a-fips-enabled-node-pool-preview) for more details. */
  enableFips?: boolean;
  /** GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. */
  gpuInstanceProfile?: GPUInstanceProfile;
  /** CreationData to be used to specify the source Snapshot ID if the node pool will be created/upgraded using a snapshot. */
  creationData?: CreationData;
  /** The fully qualified resource ID of the Capacity Reservation Group to provide virtual machines from a reserved group of Virtual Machines. This is of the form: '/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Compute/capacityreservationgroups/{capacityReservationGroupName}' Customers use it to create an agentpool with a specified CRG. For more information see [Capacity Reservation](https://learn.microsoft.com/en-us/azure/virtual-machines/capacity-reservation-overview) */
  capacityReservationGroupID?: string;
  /** The fully qualified resource ID of the Dedicated Host Group to provision virtual machines from, used only in creation scenario and not allowed to changed once set. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}. For more information see [Azure dedicated hosts](https://docs.microsoft.com/azure/virtual-machines/dedicated-hosts). */
  hostGroupID?: string;
  /** Network-related settings of an agent pool. */
  networkProfile?: AgentPoolNetworkProfile;
  /** The Windows agent pool's specific profile. */
  windowsProfile?: AgentPoolWindowsProfile;
  /** The security settings of an agent pool. */
  securityProfile?: AgentPoolSecurityProfile;
  /** GPU settings for the Agent Pool. */
  gpuProfile?: GPUProfile;
  /** Profile specific to a managed agent pool in Gateway mode. This field cannot be set if agent pool mode is not Gateway. */
  gatewayProfile?: AgentPoolGatewayProfile;
  /** Configuration for using artifact streaming on AKS. */
  artifactStreamingProfile?: AgentPoolArtifactStreamingProfile;
  /** Specifications on VirtualMachines agent pool. */
  virtualMachinesProfile?: VirtualMachinesProfile;
  /** The status of nodes in a VirtualMachines agent pool. */
  virtualMachineNodesStatus?: VirtualMachineNodes[];
  /** Contains read-only information about the Agent Pool. */
  status?: AgentPoolStatus;
  /** Configures the per-node local DNS, with VnetDNS and KubeDNS overrides. LocalDNS helps improve performance and reliability of DNS resolution in an AKS cluster. For more details see aka.ms/aks/localdns. */
  localDNSProfile?: LocalDNSProfile;
  /** Settings to determine the node customization used to provision nodes in a pool. */
  nodeCustomizationProfile?: NodeCustomizationProfile;
}

export function managedClusterAgentPoolProfilePropertiesSerializer(
  item: ManagedClusterAgentPoolProfileProperties,
): any {
  return {
    count: item["count"],
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    kubeletDiskType: item["kubeletDiskType"],
    workloadRuntime: item["workloadRuntime"],
    messageOfTheDay: item["messageOfTheDay"],
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    podIPAllocationMode: item["podIPAllocationMode"],
    maxPods: item["maxPods"],
    osType: item["osType"],
    osSKU: item["osSKU"],
    maxCount: item["maxCount"],
    minCount: item["minCount"],
    enableAutoScaling: item["enableAutoScaling"],
    scaleDownMode: item["scaleDownMode"],
    type: item["type"],
    mode: item["mode"],
    orchestratorVersion: item["orchestratorVersion"],
    upgradeStrategy: item["upgradeStrategy"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
    upgradeSettingsBlueGreen: !item["upgradeSettingsBlueGreen"]
      ? item["upgradeSettingsBlueGreen"]
      : agentPoolBlueGreenUpgradeSettingsSerializer(item["upgradeSettingsBlueGreen"]),
    powerState: !item["powerState"] ? item["powerState"] : powerStateSerializer(item["powerState"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    scaleSetPriority: item["scaleSetPriority"],
    scaleSetEvictionPolicy: item["scaleSetEvictionPolicy"],
    spotMaxPrice: item["spotMaxPrice"],
    tags: item["tags"],
    nodeLabels: item["nodeLabels"],
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    proximityPlacementGroupID: item["proximityPlacementGroupID"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigSerializer(item["kubeletConfig"]),
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigSerializer(item["linuxOSConfig"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableUltraSSD: item["enableUltraSSD"],
    enableFIPS: item["enableFips"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    capacityReservationGroupID: item["capacityReservationGroupID"],
    hostGroupID: item["hostGroupID"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : agentPoolNetworkProfileSerializer(item["networkProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileSerializer(item["windowsProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : agentPoolSecurityProfileSerializer(item["securityProfile"]),
    gpuProfile: !item["gpuProfile"] ? item["gpuProfile"] : gpuProfileSerializer(item["gpuProfile"]),
    gatewayProfile: !item["gatewayProfile"]
      ? item["gatewayProfile"]
      : agentPoolGatewayProfileSerializer(item["gatewayProfile"]),
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileSerializer(item["artifactStreamingProfile"]),
    virtualMachinesProfile: !item["virtualMachinesProfile"]
      ? item["virtualMachinesProfile"]
      : virtualMachinesProfileSerializer(item["virtualMachinesProfile"]),
    virtualMachineNodesStatus: !item["virtualMachineNodesStatus"]
      ? item["virtualMachineNodesStatus"]
      : virtualMachineNodesArraySerializer(item["virtualMachineNodesStatus"]),
    status: !item["status"] ? item["status"] : agentPoolStatusSerializer(item["status"]),
    localDNSProfile: !item["localDNSProfile"]
      ? item["localDNSProfile"]
      : localDNSProfileSerializer(item["localDNSProfile"]),
    nodeCustomizationProfile: !item["nodeCustomizationProfile"]
      ? item["nodeCustomizationProfile"]
      : nodeCustomizationProfileSerializer(item["nodeCustomizationProfile"]),
  };
}

export function managedClusterAgentPoolProfilePropertiesDeserializer(
  item: any,
): ManagedClusterAgentPoolProfileProperties {
  return {
    eTag: item["eTag"],
    count: item["count"],
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    kubeletDiskType: item["kubeletDiskType"],
    workloadRuntime: item["workloadRuntime"],
    messageOfTheDay: item["messageOfTheDay"],
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    podIPAllocationMode: item["podIPAllocationMode"],
    maxPods: item["maxPods"],
    osType: item["osType"],
    osSKU: item["osSKU"],
    maxCount: item["maxCount"],
    minCount: item["minCount"],
    enableAutoScaling: item["enableAutoScaling"],
    scaleDownMode: item["scaleDownMode"],
    type: item["type"],
    mode: item["mode"],
    orchestratorVersion: item["orchestratorVersion"],
    currentOrchestratorVersion: item["currentOrchestratorVersion"],
    nodeImageVersion: item["nodeImageVersion"],
    upgradeStrategy: item["upgradeStrategy"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
    upgradeSettingsBlueGreen: !item["upgradeSettingsBlueGreen"]
      ? item["upgradeSettingsBlueGreen"]
      : agentPoolBlueGreenUpgradeSettingsDeserializer(item["upgradeSettingsBlueGreen"]),
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    scaleSetPriority: item["scaleSetPriority"],
    scaleSetEvictionPolicy: item["scaleSetEvictionPolicy"],
    spotMaxPrice: item["spotMaxPrice"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    nodeLabels: !item["nodeLabels"]
      ? item["nodeLabels"]
      : Object.fromEntries(
          Object.entries(item["nodeLabels"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    proximityPlacementGroupID: item["proximityPlacementGroupID"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigDeserializer(item["kubeletConfig"]),
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigDeserializer(item["linuxOSConfig"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableUltraSSD: item["enableUltraSSD"],
    enableFips: item["enableFIPS"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    capacityReservationGroupID: item["capacityReservationGroupID"],
    hostGroupID: item["hostGroupID"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : agentPoolNetworkProfileDeserializer(item["networkProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileDeserializer(item["windowsProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : agentPoolSecurityProfileDeserializer(item["securityProfile"]),
    gpuProfile: !item["gpuProfile"]
      ? item["gpuProfile"]
      : gpuProfileDeserializer(item["gpuProfile"]),
    gatewayProfile: !item["gatewayProfile"]
      ? item["gatewayProfile"]
      : agentPoolGatewayProfileDeserializer(item["gatewayProfile"]),
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileDeserializer(item["artifactStreamingProfile"]),
    virtualMachinesProfile: !item["virtualMachinesProfile"]
      ? item["virtualMachinesProfile"]
      : virtualMachinesProfileDeserializer(item["virtualMachinesProfile"]),
    virtualMachineNodesStatus: !item["virtualMachineNodesStatus"]
      ? item["virtualMachineNodesStatus"]
      : virtualMachineNodesArrayDeserializer(item["virtualMachineNodesStatus"]),
    status: !item["status"] ? item["status"] : agentPoolStatusDeserializer(item["status"]),
    localDNSProfile: !item["localDNSProfile"]
      ? item["localDNSProfile"]
      : localDNSProfileDeserializer(item["localDNSProfile"]),
    nodeCustomizationProfile: !item["nodeCustomizationProfile"]
      ? item["nodeCustomizationProfile"]
      : nodeCustomizationProfileDeserializer(item["nodeCustomizationProfile"]),
  };
}

/** The OS disk type to be used for machines in the agent pool. The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). */
export enum KnownOSDiskType {
  /** Azure replicates the operating system disk for a virtual machine to Azure storage to avoid data loss should the VM need to be relocated to another host. Since containers aren't designed to have local state persisted, this behavior offers limited value while providing some drawbacks, including slower node provisioning and higher read/write latency. */
  Managed = "Managed",
  /** Ephemeral OS disks are stored only on the host machine, just like a temporary disk. This provides lower read/write latency, along with faster node scaling and cluster upgrades. */
  Ephemeral = "Ephemeral",
}

/**
 * The OS disk type to be used for machines in the agent pool. The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). \
 * {@link KnownOSDiskType} can be used interchangeably with OSDiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Managed**: Azure replicates the operating system disk for a virtual machine to Azure storage to avoid data loss should the VM need to be relocated to another host. Since containers aren't designed to have local state persisted, this behavior offers limited value while providing some drawbacks, including slower node provisioning and higher read\/write latency. \
 * **Ephemeral**: Ephemeral OS disks are stored only on the host machine, just like a temporary disk. This provides lower read\/write latency, along with faster node scaling and cluster upgrades.
 */
export type OSDiskType = string;

/** Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. */
export enum KnownKubeletDiskType {
  /** Kubelet will use the OS disk for its data. */
  OS = "OS",
  /** Kubelet will use the temporary disk for its data. */
  Temporary = "Temporary",
}

/**
 * Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. \
 * {@link KnownKubeletDiskType} can be used interchangeably with KubeletDiskType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OS**: Kubelet will use the OS disk for its data. \
 * **Temporary**: Kubelet will use the temporary disk for its data.
 */
export type KubeletDiskType = string;

/** Determines the type of workload a node can run. */
export enum KnownWorkloadRuntime {
  /** Nodes will use Kubelet to run standard OCI container workloads. */
  OCIContainer = "OCIContainer",
  /** Nodes will use Krustlet to run WASM workloads using the WASI provider (Preview). */
  WasmWasi = "WasmWasi",
  /** Nodes can use (Kata + Cloud Hypervisor + Hyper-V) to enable Nested VM-based pods (Preview). Due to the use Hyper-V, AKS node OS itself is a nested VM (the root OS) of Hyper-V. Thus it can only be used with VM series that support Nested Virtualization such as Dv3 series. This naming convention will be deprecated in future releases in favor of KataVmIsolation. */
  KataMshvVmIsolation = "KataMshvVmIsolation",
  /** Nodes can use (Kata + Cloud Hypervisor + Hyper-V) to enable Nested VM-based pods. Due to the use Hyper-V, AKS node OS itself is a nested VM (the root OS) of Hyper-V. Thus it can only be used with VM series that support Nested Virtualization such as Dv3 series. */
  KataVmIsolation = "KataVmIsolation",
}

/**
 * Determines the type of workload a node can run. \
 * {@link KnownWorkloadRuntime} can be used interchangeably with WorkloadRuntime,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **OCIContainer**: Nodes will use Kubelet to run standard OCI container workloads. \
 * **WasmWasi**: Nodes will use Krustlet to run WASM workloads using the WASI provider (Preview). \
 * **KataMshvVmIsolation**: Nodes can use (Kata + Cloud Hypervisor + Hyper-V) to enable Nested VM-based pods (Preview). Due to the use Hyper-V, AKS node OS itself is a nested VM (the root OS) of Hyper-V. Thus it can only be used with VM series that support Nested Virtualization such as Dv3 series. This naming convention will be deprecated in future releases in favor of KataVmIsolation. \
 * **KataVmIsolation**: Nodes can use (Kata + Cloud Hypervisor + Hyper-V) to enable Nested VM-based pods. Due to the use Hyper-V, AKS node OS itself is a nested VM (the root OS) of Hyper-V. Thus it can only be used with VM series that support Nested Virtualization such as Dv3 series.
 */
export type WorkloadRuntime = string;

/** Pod IP Allocation Mode. The IP allocation mode for pods in the agent pool. Must be used with podSubnetId. The default is 'DynamicIndividual'. */
export enum KnownPodIPAllocationMode {
  /** Each node gets allocated with a non-contiguous list of IP addresses assignable to pods. This is better for maximizing a small to medium subnet of size /16 or smaller. The Azure CNI cluster with dynamic IP allocation defaults to this mode if the customer does not explicitly specify a podIPAllocationMode */
  DynamicIndividual = "DynamicIndividual",
  /** Each node is statically allocated CIDR block(s) of size /28 = 16 IPs per block to satisfy the maxPods per node. Number of CIDR blocks >= (maxPods / 16). The block, rather than a single IP, counts against the Azure Vnet Private IP limit of 65K. Therefore block mode is suitable for running larger workloads with more than the current limit of 65K pods in a cluster. This mode is better suited to scale with larger subnets of /15 or bigger */
  StaticBlock = "StaticBlock",
}

/**
 * Pod IP Allocation Mode. The IP allocation mode for pods in the agent pool. Must be used with podSubnetId. The default is 'DynamicIndividual'. \
 * {@link KnownPodIPAllocationMode} can be used interchangeably with PodIPAllocationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DynamicIndividual**: Each node gets allocated with a non-contiguous list of IP addresses assignable to pods. This is better for maximizing a small to medium subnet of size \/16 or smaller. The Azure CNI cluster with dynamic IP allocation defaults to this mode if the customer does not explicitly specify a podIPAllocationMode \
 * **StaticBlock**: Each node is statically allocated CIDR block(s) of size \/28 = 16 IPs per block to satisfy the maxPods per node. Number of CIDR blocks >= (maxPods \/ 16). The block, rather than a single IP, counts against the Azure Vnet Private IP limit of 65K. Therefore block mode is suitable for running larger workloads with more than the current limit of 65K pods in a cluster. This mode is better suited to scale with larger subnets of \/15 or bigger
 */
export type PodIPAllocationMode = string;

/** The operating system type. The default is Linux. */
export enum KnownOSType {
  /** Use Linux. */
  Linux = "Linux",
  /** Use Windows. */
  Windows = "Windows",
}

/**
 * The operating system type. The default is Linux. \
 * {@link KnownOSType} can be used interchangeably with OSType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Linux**: Use Linux. \
 * **Windows**: Use Windows.
 */
export type OSType = string;

/** Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. */
export enum KnownOssku {
  /** Use Ubuntu as the OS for node images. */
  Ubuntu = "Ubuntu",
  /** Use AzureLinux as the OS for node images. Azure Linux is a container-optimized Linux distro built by Microsoft, visit https://aka.ms/azurelinux for more information. */
  AzureLinux = "AzureLinux",
  /** Use AzureLinux3 as the OS for node images. Azure Linux is a container-optimized Linux distro built by Microsoft, visit https://aka.ms/azurelinux for more information. For limitations, visit https://aka.ms/aks/node-images. For OS migration guidance, see https://aka.ms/aks/upgrade-os-version. */
  AzureLinux3 = "AzureLinux3",
  /** Deprecated OSSKU. Microsoft recommends that new deployments choose 'AzureLinux' instead. */
  Mariner = "Mariner",
  /** Use Flatcar Container Linux as the OS for node images. Flatcar is a container-optimized, security-focused Linux OS, with an immutable filesystem and part of the Cloud Native Computing Foundation (CNCF). For more information about Flatcar Container Linux for AKS, see aka.ms/aks/flatcar-container-linux-for-aks */
  Flatcar = "Flatcar",
  /** Deprecated OSSKU. Microsoft recommends that new deployments choose 'AzureLinux' instead. */
  CBLMariner = "CBLMariner",
  /** Use Windows2019 as the OS for node images. Unsupported for system node pools. Windows2019 only supports Windows2019 containers; it cannot run Windows2022 containers and vice versa. */
  Windows2019 = "Windows2019",
  /** Use Windows2022 as the OS for node images. Unsupported for system node pools. Windows2022 only supports Windows2022 containers; it cannot run Windows2019 containers and vice versa. */
  Windows2022 = "Windows2022",
  /** Use Ubuntu2204 as the OS for node images, however, Ubuntu 22.04 may not be supported for all nodepools. For limitations and supported kubernetes versions, see https://aka.ms/aks/supported-ubuntu-versions */
  Ubuntu2204 = "Ubuntu2204",
  /** Use Windows2025 as the OS for node images. Unsupported for system node pools. Windows2025 supports Windows2022 and Windows 2025 containers; it cannot run Windows2019 containers and vice versa. */
  Windows2025 = "Windows2025",
  /** Use Windows Annual Channel version as the OS for node images. Unsupported for system node pools. Details about supported container images and kubernetes versions under different AKS Annual Channel versions could be seen in https://aka.ms/aks/windows-annual-channel-details. */
  WindowsAnnual = "WindowsAnnual",
  /** Use Ubuntu2404 as the OS for node images, however, Ubuntu 24.04 may not be supported for all nodepools. For limitations and supported kubernetes versions, see see https://aka.ms/aks/supported-ubuntu-versions */
  Ubuntu2404 = "Ubuntu2404",
}

/**
 * Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. \
 * {@link KnownOssku} can be used interchangeably with Ossku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Ubuntu**: Use Ubuntu as the OS for node images. \
 * **AzureLinux**: Use AzureLinux as the OS for node images. Azure Linux is a container-optimized Linux distro built by Microsoft, visit https:\//aka.ms\/azurelinux for more information. \
 * **AzureLinux3**: Use AzureLinux3 as the OS for node images. Azure Linux is a container-optimized Linux distro built by Microsoft, visit https:\//aka.ms\/azurelinux for more information. For limitations, visit https:\//aka.ms\/aks\/node-images. For OS migration guidance, see https:\//aka.ms\/aks\/upgrade-os-version. \
 * **Mariner**: Deprecated OSSKU. Microsoft recommends that new deployments choose 'AzureLinux' instead. \
 * **Flatcar**: Use Flatcar Container Linux as the OS for node images. Flatcar is a container-optimized, security-focused Linux OS, with an immutable filesystem and part of the Cloud Native Computing Foundation (CNCF). For more information about Flatcar Container Linux for AKS, see aka.ms\/aks\/flatcar-container-linux-for-aks \
 * **CBLMariner**: Deprecated OSSKU. Microsoft recommends that new deployments choose 'AzureLinux' instead. \
 * **Windows2019**: Use Windows2019 as the OS for node images. Unsupported for system node pools. Windows2019 only supports Windows2019 containers; it cannot run Windows2022 containers and vice versa. \
 * **Windows2022**: Use Windows2022 as the OS for node images. Unsupported for system node pools. Windows2022 only supports Windows2022 containers; it cannot run Windows2019 containers and vice versa. \
 * **Ubuntu2204**: Use Ubuntu2204 as the OS for node images, however, Ubuntu 22.04 may not be supported for all nodepools. For limitations and supported kubernetes versions, see https:\//aka.ms\/aks\/supported-ubuntu-versions \
 * **Windows2025**: Use Windows2025 as the OS for node images. Unsupported for system node pools. Windows2025 supports Windows2022 and Windows 2025 containers; it cannot run Windows2019 containers and vice versa. \
 * **WindowsAnnual**: Use Windows Annual Channel version as the OS for node images. Unsupported for system node pools. Details about supported container images and kubernetes versions under different AKS Annual Channel versions could be seen in https:\//aka.ms\/aks\/windows-annual-channel-details. \
 * **Ubuntu2404**: Use Ubuntu2404 as the OS for node images, however, Ubuntu 24.04 may not be supported for all nodepools. For limitations and supported kubernetes versions, see see https:\//aka.ms\/aks\/supported-ubuntu-versions
 */
export type Ossku = string;

/** Describes how VMs are added to or removed from Agent Pools. See [billing states](https://docs.microsoft.com/azure/virtual-machines/states-billing). */
export enum KnownScaleDownMode {
  /** Create new instances during scale up and remove instances during scale down. */
  Delete = "Delete",
  /** Attempt to start deallocated instances (if they exist) during scale up and deallocate instances during scale down. */
  Deallocate = "Deallocate",
}

/**
 * Describes how VMs are added to or removed from Agent Pools. See [billing states](https://docs.microsoft.com/azure/virtual-machines/states-billing). \
 * {@link KnownScaleDownMode} can be used interchangeably with ScaleDownMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Create new instances during scale up and remove instances during scale down. \
 * **Deallocate**: Attempt to start deallocated instances (if they exist) during scale up and deallocate instances during scale down.
 */
export type ScaleDownMode = string;

/** The type of Agent Pool. */
export enum KnownAgentPoolType {
  /** Create an Agent Pool backed by a Virtual Machine Scale Set. */
  VirtualMachineScaleSets = "VirtualMachineScaleSets",
  /** Use of this is strongly discouraged. */
  AvailabilitySet = "AvailabilitySet",
  /** Create an Agent Pool backed by a Single Instance VM orchestration mode. */
  VirtualMachines = "VirtualMachines",
}

/**
 * The type of Agent Pool. \
 * {@link KnownAgentPoolType} can be used interchangeably with AgentPoolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **VirtualMachineScaleSets**: Create an Agent Pool backed by a Virtual Machine Scale Set. \
 * **AvailabilitySet**: Use of this is strongly discouraged. \
 * **VirtualMachines**: Create an Agent Pool backed by a Single Instance VM orchestration mode.
 */
export type AgentPoolType = string;

/** The mode of an agent pool. A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools */
export enum KnownAgentPoolMode {
  /** System agent pools are primarily for hosting critical system pods such as CoreDNS and metrics-server. System agent pools osType must be Linux. System agent pools VM SKU must have at least 2vCPUs and 4GB of memory. */
  System = "System",
  /** User agent pools are primarily for hosting your application pods. */
  User = "User",
  /** Gateway agent pools are dedicated to providing static egress IPs to pods. For more details, see https://aka.ms/aks/static-egress-gateway. */
  Gateway = "Gateway",
  /** ManagedSystem is a system pool managed by AKS. The pool scales dynamically according to cluster usage, and has additional automated monitoring and healing capabilities. There can only be one ManagedSystem pool, and it is recommended to delete all other system pools for the best experience. */
  ManagedSystem = "ManagedSystem",
  /** Machines agent pools are dedicated to hosting machines. Only limited operations, such as creation and deletion, are allowed at the pool level. Please use the machine APIs to manage the full machine lifecycle. */
  Machines = "Machines",
}

/**
 * The mode of an agent pool. A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools \
 * {@link KnownAgentPoolMode} can be used interchangeably with AgentPoolMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **System**: System agent pools are primarily for hosting critical system pods such as CoreDNS and metrics-server. System agent pools osType must be Linux. System agent pools VM SKU must have at least 2vCPUs and 4GB of memory. \
 * **User**: User agent pools are primarily for hosting your application pods. \
 * **Gateway**: Gateway agent pools are dedicated to providing static egress IPs to pods. For more details, see https:\//aka.ms\/aks\/static-egress-gateway. \
 * **ManagedSystem**: ManagedSystem is a system pool managed by AKS. The pool scales dynamically according to cluster usage, and has additional automated monitoring and healing capabilities. There can only be one ManagedSystem pool, and it is recommended to delete all other system pools for the best experience. \
 * **Machines**: Machines agent pools are dedicated to hosting machines. Only limited operations, such as creation and deletion, are allowed at the pool level. Please use the machine APIs to manage the full machine lifecycle.
 */
export type AgentPoolMode = string;

/** Defines the upgrade strategy for the agent pool. The default is Rolling. */
export enum KnownUpgradeStrategy {
  /** Specifies that the agent pool will conduct rolling upgrade. This is the default upgrade strategy. */
  Rolling = "Rolling",
  /** Specifies that the agent pool will conduct blue-green upgrade. */
  BlueGreen = "BlueGreen",
}

/**
 * Defines the upgrade strategy for the agent pool. The default is Rolling. \
 * {@link KnownUpgradeStrategy} can be used interchangeably with UpgradeStrategy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Rolling**: Specifies that the agent pool will conduct rolling upgrade. This is the default upgrade strategy. \
 * **BlueGreen**: Specifies that the agent pool will conduct blue-green upgrade.
 */
export type UpgradeStrategy = string;

/** Settings for upgrading an agentpool */
export interface AgentPoolUpgradeSettings {
  /** The maximum number or percentage of nodes that are surged during upgrade. This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 10%. For more information, including best practices, see: https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster */
  maxSurge?: string;
  /** The maximum number or percentage of nodes that can be simultaneously unavailable during upgrade. This can either be set to an integer (e.g. '1') or a percentage (e.g. '5%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 0. For more information, including best practices, see: https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster */
  maxUnavailable?: string;
  /** The maximum number or percentage of extra nodes that are allowed to be blocked in the agent pool during an upgrade when undrainable node behavior is Cordon. This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is maxSurge. This must always be greater than or equal to maxSurge. For more information, including best practices, see: https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster */
  maxBlockedNodes?: string;
  /** The drain timeout for a node. The amount of time (in minutes) to wait on eviction of pods and graceful termination per node. This eviction wait time honors waiting on pod disruption budgets. If this time is exceeded, the upgrade fails. If not specified, the default is 30 minutes. */
  drainTimeoutInMinutes?: number;
  /** The soak duration for a node. The amount of time (in minutes) to wait after draining a node and before reimaging it and moving on to next node. If not specified, the default is 0 minutes. */
  nodeSoakDurationInMinutes?: number;
  /** Defines the behavior for undrainable nodes during upgrade. The most common cause of undrainable nodes is Pod Disruption Budgets (PDBs), but other issues, such as pod termination grace period is exceeding the remaining per-node drain timeout or pod is still being in a running state, can also cause undrainable nodes. */
  undrainableNodeBehavior?: UndrainableNodeBehavior;
}

export function agentPoolUpgradeSettingsSerializer(item: AgentPoolUpgradeSettings): any {
  return {
    maxSurge: item["maxSurge"],
    maxUnavailable: item["maxUnavailable"],
    maxBlockedNodes: item["maxBlockedNodes"],
    drainTimeoutInMinutes: item["drainTimeoutInMinutes"],
    nodeSoakDurationInMinutes: item["nodeSoakDurationInMinutes"],
    undrainableNodeBehavior: item["undrainableNodeBehavior"],
  };
}

export function agentPoolUpgradeSettingsDeserializer(item: any): AgentPoolUpgradeSettings {
  return {
    maxSurge: item["maxSurge"],
    maxUnavailable: item["maxUnavailable"],
    maxBlockedNodes: item["maxBlockedNodes"],
    drainTimeoutInMinutes: item["drainTimeoutInMinutes"],
    nodeSoakDurationInMinutes: item["nodeSoakDurationInMinutes"],
    undrainableNodeBehavior: item["undrainableNodeBehavior"],
  };
}

/** Defines the behavior for undrainable nodes during upgrade. The most common cause of undrainable nodes is Pod Disruption Budgets (PDBs), but other issues, such as pod termination grace period is exceeding the remaining per-node drain timeout or pod is still being in a running state, can also cause undrainable nodes. */
export enum KnownUndrainableNodeBehavior {
  /** AKS will cordon the blocked nodes and replace them with surge nodes during upgrade. The blocked nodes will be cordoned and replaced by surge nodes. The blocked nodes will have label 'kubernetes.azure.com/upgrade-status:Quarantined'. A surge node will be retained for each blocked node. A best-effort attempt will be made to delete all other surge nodes. If there are enough surge nodes to replace blocked nodes, then the upgrade operation and the managed cluster will be in failed state. Otherwise, the upgrade operation and the managed cluster will be in canceled state. */
  Cordon = "Cordon",
  /** AKS will mark the blocked nodes schedulable, but the blocked nodes are not upgraded. A best-effort attempt will be made to delete all surge nodes. The upgrade operation and the managed cluster will be in failed state if there are any blocked nodes. */
  Schedule = "Schedule",
}

/**
 * Defines the behavior for undrainable nodes during upgrade. The most common cause of undrainable nodes is Pod Disruption Budgets (PDBs), but other issues, such as pod termination grace period is exceeding the remaining per-node drain timeout or pod is still being in a running state, can also cause undrainable nodes. \
 * {@link KnownUndrainableNodeBehavior} can be used interchangeably with UndrainableNodeBehavior,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cordon**: AKS will cordon the blocked nodes and replace them with surge nodes during upgrade. The blocked nodes will be cordoned and replaced by surge nodes. The blocked nodes will have label 'kubernetes.azure.com\/upgrade-status:Quarantined'. A surge node will be retained for each blocked node. A best-effort attempt will be made to delete all other surge nodes. If there are enough surge nodes to replace blocked nodes, then the upgrade operation and the managed cluster will be in failed state. Otherwise, the upgrade operation and the managed cluster will be in canceled state. \
 * **Schedule**: AKS will mark the blocked nodes schedulable, but the blocked nodes are not upgraded. A best-effort attempt will be made to delete all surge nodes. The upgrade operation and the managed cluster will be in failed state if there are any blocked nodes.
 */
export type UndrainableNodeBehavior = string;

/** Settings for blue-green upgrade on an agentpool */
export interface AgentPoolBlueGreenUpgradeSettings {
  /** The number or percentage of nodes to drain in batch during blue-green upgrade. Must be a non-zero number. This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total number of blue nodes of the initial upgrade operation. For percentages, fractional nodes are rounded up. If not specified, the default is 10%. For more information, including best practices, see: https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster */
  drainBatchSize?: string;
  /** The drain timeout for a node, i.e., the amount of time (in minutes) to wait on eviction of pods and graceful termination per node. This eviction wait time honors waiting on pod disruption budgets. If this time is exceeded, the upgrade fails. If not specified, the default is 30 minutes. */
  drainTimeoutInMinutes?: number;
  /** The soak duration after draining a batch of nodes, i.e., the amount of time (in minutes) to wait after draining a batch of nodes before moving on the next batch. If not specified, the default is 15 minutes. */
  batchSoakDurationInMinutes?: number;
  /** The soak duration for a node pool, i.e., the amount of time (in minutes) to wait after all old nodes are drained before we remove the old nodes. If not specified, the default is 60 minutes. Only applicable for blue-green upgrade strategy. */
  finalSoakDurationInMinutes?: number;
}

export function agentPoolBlueGreenUpgradeSettingsSerializer(
  item: AgentPoolBlueGreenUpgradeSettings,
): any {
  return {
    drainBatchSize: item["drainBatchSize"],
    drainTimeoutInMinutes: item["drainTimeoutInMinutes"],
    batchSoakDurationInMinutes: item["batchSoakDurationInMinutes"],
    finalSoakDurationInMinutes: item["finalSoakDurationInMinutes"],
  };
}

export function agentPoolBlueGreenUpgradeSettingsDeserializer(
  item: any,
): AgentPoolBlueGreenUpgradeSettings {
  return {
    drainBatchSize: item["drainBatchSize"],
    drainTimeoutInMinutes: item["drainTimeoutInMinutes"],
    batchSoakDurationInMinutes: item["batchSoakDurationInMinutes"],
    finalSoakDurationInMinutes: item["finalSoakDurationInMinutes"],
  };
}

/** Describes the Power State of the cluster */
export interface PowerState {
  /** Tells whether the cluster is Running or Stopped */
  code?: Code;
}

export function powerStateSerializer(item: PowerState): any {
  return { code: item["code"] };
}

export function powerStateDeserializer(item: any): PowerState {
  return {
    code: item["code"],
  };
}

/** Tells whether the cluster is Running or Stopped */
export enum KnownCode {
  /** The cluster is running. */
  Running = "Running",
  /** The cluster is stopped. */
  Stopped = "Stopped",
}

/**
 * Tells whether the cluster is Running or Stopped \
 * {@link KnownCode} can be used interchangeably with Code,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The cluster is running. \
 * **Stopped**: The cluster is stopped.
 */
export type Code = string;

/** The Virtual Machine Scale Set priority. */
export enum KnownScaleSetPriority {
  /** Spot priority VMs will be used. There is no SLA for spot nodes. See [spot on AKS](https://docs.microsoft.com/azure/aks/spot-node-pool) for more information. */
  Spot = "Spot",
  /** Regular VMs will be used. */
  Regular = "Regular",
}

/**
 * The Virtual Machine Scale Set priority. \
 * {@link KnownScaleSetPriority} can be used interchangeably with ScaleSetPriority,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Spot**: Spot priority VMs will be used. There is no SLA for spot nodes. See [spot on AKS](https:\//docs.microsoft.com\/azure\/aks\/spot-node-pool) for more information. \
 * **Regular**: Regular VMs will be used.
 */
export type ScaleSetPriority = string;

/** The Virtual Machine Scale Set eviction policy. The eviction policy specifies what to do with the VM when it is evicted. The default is Delete. For more information about eviction see [spot VMs](https://docs.microsoft.com/azure/virtual-machines/spot-vms) */
export enum KnownScaleSetEvictionPolicy {
  /** Nodes in the underlying Scale Set of the node pool are deleted when they're evicted. */
  Delete = "Delete",
  /** Nodes in the underlying Scale Set of the node pool are set to the stopped-deallocated state upon eviction. Nodes in the stopped-deallocated state count against your compute quota and can cause issues with cluster scaling or upgrading. */
  Deallocate = "Deallocate",
}

/**
 * The Virtual Machine Scale Set eviction policy. The eviction policy specifies what to do with the VM when it is evicted. The default is Delete. For more information about eviction see [spot VMs](https://docs.microsoft.com/azure/virtual-machines/spot-vms) \
 * {@link KnownScaleSetEvictionPolicy} can be used interchangeably with ScaleSetEvictionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Delete**: Nodes in the underlying Scale Set of the node pool are deleted when they're evicted. \
 * **Deallocate**: Nodes in the underlying Scale Set of the node pool are set to the stopped-deallocated state upon eviction. Nodes in the stopped-deallocated state count against your compute quota and can cause issues with cluster scaling or upgrading.
 */
export type ScaleSetEvictionPolicy = string;

/** Kubelet configurations of agent nodes. See [AKS custom node configuration](https://docs.microsoft.com/azure/aks/custom-node-configuration) for more details. */
export interface KubeletConfig {
  /** The CPU Manager policy to use. The default is 'none'. See [Kubernetes CPU management policies](https://kubernetes.io/docs/tasks/administer-cluster/cpu-management-policies/#cpu-management-policies) for more information. Allowed values are 'none' and 'static'. */
  cpuManagerPolicy?: string;
  /** If CPU CFS quota enforcement is enabled for containers that specify CPU limits. The default is true. */
  cpuCfsQuota?: boolean;
  /** The CPU CFS quota period value. The default is '100ms.' Valid values are a sequence of decimal numbers with an optional fraction and a unit suffix. For example: '300ms', '2h45m'. Supported units are 'ns', 'us', 'ms', 's', 'm', and 'h'. */
  cpuCfsQuotaPeriod?: string;
  /** The percent of disk usage after which image garbage collection is always run. To disable image garbage collection, set to 100. The default is 85% */
  imageGcHighThreshold?: number;
  /** The percent of disk usage before which image garbage collection is never run. This cannot be set higher than imageGcHighThreshold. The default is 80% */
  imageGcLowThreshold?: number;
  /** The Topology Manager policy to use. For more information see [Kubernetes Topology Manager](https://kubernetes.io/docs/tasks/administer-cluster/topology-manager). The default is 'none'. Allowed values are 'none', 'best-effort', 'restricted', and 'single-numa-node'. */
  topologyManagerPolicy?: string;
  /** Allowed list of unsafe sysctls or unsafe sysctl patterns (ending in `*`). */
  allowedUnsafeSysctls?: string[];
  /** If set to true it will make the Kubelet fail to start if swap is enabled on the node. */
  failSwapOn?: boolean;
  /** The maximum size (e.g. 10Mi) of container log file before it is rotated. */
  containerLogMaxSizeMB?: number;
  /** The maximum number of container log files that can be present for a container. The number must be ≥ 2. */
  containerLogMaxFiles?: number;
  /** The maximum number of processes per pod. */
  podMaxPids?: number;
  /** Specifies the default seccomp profile applied to all workloads. If not specified, 'Unconfined' will be used by default. */
  seccompDefault?: SeccompDefault;
}

export function kubeletConfigSerializer(item: KubeletConfig): any {
  return {
    cpuManagerPolicy: item["cpuManagerPolicy"],
    cpuCfsQuota: item["cpuCfsQuota"],
    cpuCfsQuotaPeriod: item["cpuCfsQuotaPeriod"],
    imageGcHighThreshold: item["imageGcHighThreshold"],
    imageGcLowThreshold: item["imageGcLowThreshold"],
    topologyManagerPolicy: item["topologyManagerPolicy"],
    allowedUnsafeSysctls: !item["allowedUnsafeSysctls"]
      ? item["allowedUnsafeSysctls"]
      : item["allowedUnsafeSysctls"].map((p: any) => {
          return p;
        }),
    failSwapOn: item["failSwapOn"],
    containerLogMaxSizeMB: item["containerLogMaxSizeMB"],
    containerLogMaxFiles: item["containerLogMaxFiles"],
    podMaxPids: item["podMaxPids"],
    seccompDefault: item["seccompDefault"],
  };
}

export function kubeletConfigDeserializer(item: any): KubeletConfig {
  return {
    cpuManagerPolicy: item["cpuManagerPolicy"],
    cpuCfsQuota: item["cpuCfsQuota"],
    cpuCfsQuotaPeriod: item["cpuCfsQuotaPeriod"],
    imageGcHighThreshold: item["imageGcHighThreshold"],
    imageGcLowThreshold: item["imageGcLowThreshold"],
    topologyManagerPolicy: item["topologyManagerPolicy"],
    allowedUnsafeSysctls: !item["allowedUnsafeSysctls"]
      ? item["allowedUnsafeSysctls"]
      : item["allowedUnsafeSysctls"].map((p: any) => {
          return p;
        }),
    failSwapOn: item["failSwapOn"],
    containerLogMaxSizeMB: item["containerLogMaxSizeMB"],
    containerLogMaxFiles: item["containerLogMaxFiles"],
    podMaxPids: item["podMaxPids"],
    seccompDefault: item["seccompDefault"],
  };
}

/** Specifies the default seccomp profile applied to all workloads. If not specified, 'Unconfined' will be used by default. */
export enum KnownSeccompDefault {
  /** No seccomp profile is applied, allowing all system calls. */
  Unconfined = "Unconfined",
  /** The default seccomp profile for container runtime is applied, which restricts certain system calls for enhanced security. */
  RuntimeDefault = "RuntimeDefault",
}

/**
 * Specifies the default seccomp profile applied to all workloads. If not specified, 'Unconfined' will be used by default. \
 * {@link KnownSeccompDefault} can be used interchangeably with SeccompDefault,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unconfined**: No seccomp profile is applied, allowing all system calls. \
 * **RuntimeDefault**: The default seccomp profile for container runtime is applied, which restricts certain system calls for enhanced security.
 */
export type SeccompDefault = string;

/** OS configurations of Linux agent nodes. See [AKS custom node configuration](https://docs.microsoft.com/azure/aks/custom-node-configuration) for more details. */
export interface LinuxOSConfig {
  /** Sysctl settings for Linux agent nodes. */
  sysctls?: SysctlConfig;
  /** Whether transparent hugepages are enabled. Valid values are 'always', 'madvise', and 'never'. The default is 'always'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). */
  transparentHugePageEnabled?: string;
  /** Whether the kernel should make aggressive use of memory compaction to make more hugepages available. Valid values are 'always', 'defer', 'defer+madvise', 'madvise' and 'never'. The default is 'madvise'. For more information see [Transparent Hugepages](https://www.kernel.org/doc/html/latest/admin-guide/mm/transhuge.html#admin-guide-transhuge). */
  transparentHugePageDefrag?: string;
  /** The size in MB of a swap file that will be created on each node. */
  swapFileSizeMB?: number;
}

export function linuxOSConfigSerializer(item: LinuxOSConfig): any {
  return {
    sysctls: !item["sysctls"] ? item["sysctls"] : sysctlConfigSerializer(item["sysctls"]),
    transparentHugePageEnabled: item["transparentHugePageEnabled"],
    transparentHugePageDefrag: item["transparentHugePageDefrag"],
    swapFileSizeMB: item["swapFileSizeMB"],
  };
}

export function linuxOSConfigDeserializer(item: any): LinuxOSConfig {
  return {
    sysctls: !item["sysctls"] ? item["sysctls"] : sysctlConfigDeserializer(item["sysctls"]),
    transparentHugePageEnabled: item["transparentHugePageEnabled"],
    transparentHugePageDefrag: item["transparentHugePageDefrag"],
    swapFileSizeMB: item["swapFileSizeMB"],
  };
}

/** Sysctl settings for Linux agent nodes. */
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

export function sysctlConfigSerializer(item: SysctlConfig): any {
  return {
    netCoreSomaxconn: item["netCoreSomaxconn"],
    netCoreNetdevMaxBacklog: item["netCoreNetdevMaxBacklog"],
    netCoreRmemDefault: item["netCoreRmemDefault"],
    netCoreRmemMax: item["netCoreRmemMax"],
    netCoreWmemDefault: item["netCoreWmemDefault"],
    netCoreWmemMax: item["netCoreWmemMax"],
    netCoreOptmemMax: item["netCoreOptmemMax"],
    netIpv4TcpMaxSynBacklog: item["netIpv4TcpMaxSynBacklog"],
    netIpv4TcpMaxTwBuckets: item["netIpv4TcpMaxTwBuckets"],
    netIpv4TcpFinTimeout: item["netIpv4TcpFinTimeout"],
    netIpv4TcpKeepaliveTime: item["netIpv4TcpKeepaliveTime"],
    netIpv4TcpKeepaliveProbes: item["netIpv4TcpKeepaliveProbes"],
    netIpv4TcpkeepaliveIntvl: item["netIpv4TcpkeepaliveIntvl"],
    netIpv4TcpTwReuse: item["netIpv4TcpTwReuse"],
    netIpv4IpLocalPortRange: item["netIpv4IpLocalPortRange"],
    netIpv4NeighDefaultGcThresh1: item["netIpv4NeighDefaultGcThresh1"],
    netIpv4NeighDefaultGcThresh2: item["netIpv4NeighDefaultGcThresh2"],
    netIpv4NeighDefaultGcThresh3: item["netIpv4NeighDefaultGcThresh3"],
    netNetfilterNfConntrackMax: item["netNetfilterNfConntrackMax"],
    netNetfilterNfConntrackBuckets: item["netNetfilterNfConntrackBuckets"],
    fsInotifyMaxUserWatches: item["fsInotifyMaxUserWatches"],
    fsFileMax: item["fsFileMax"],
    fsAioMaxNr: item["fsAioMaxNr"],
    fsNrOpen: item["fsNrOpen"],
    kernelThreadsMax: item["kernelThreadsMax"],
    vmMaxMapCount: item["vmMaxMapCount"],
    vmSwappiness: item["vmSwappiness"],
    vmVfsCachePressure: item["vmVfsCachePressure"],
  };
}

export function sysctlConfigDeserializer(item: any): SysctlConfig {
  return {
    netCoreSomaxconn: item["netCoreSomaxconn"],
    netCoreNetdevMaxBacklog: item["netCoreNetdevMaxBacklog"],
    netCoreRmemDefault: item["netCoreRmemDefault"],
    netCoreRmemMax: item["netCoreRmemMax"],
    netCoreWmemDefault: item["netCoreWmemDefault"],
    netCoreWmemMax: item["netCoreWmemMax"],
    netCoreOptmemMax: item["netCoreOptmemMax"],
    netIpv4TcpMaxSynBacklog: item["netIpv4TcpMaxSynBacklog"],
    netIpv4TcpMaxTwBuckets: item["netIpv4TcpMaxTwBuckets"],
    netIpv4TcpFinTimeout: item["netIpv4TcpFinTimeout"],
    netIpv4TcpKeepaliveTime: item["netIpv4TcpKeepaliveTime"],
    netIpv4TcpKeepaliveProbes: item["netIpv4TcpKeepaliveProbes"],
    netIpv4TcpkeepaliveIntvl: item["netIpv4TcpkeepaliveIntvl"],
    netIpv4TcpTwReuse: item["netIpv4TcpTwReuse"],
    netIpv4IpLocalPortRange: item["netIpv4IpLocalPortRange"],
    netIpv4NeighDefaultGcThresh1: item["netIpv4NeighDefaultGcThresh1"],
    netIpv4NeighDefaultGcThresh2: item["netIpv4NeighDefaultGcThresh2"],
    netIpv4NeighDefaultGcThresh3: item["netIpv4NeighDefaultGcThresh3"],
    netNetfilterNfConntrackMax: item["netNetfilterNfConntrackMax"],
    netNetfilterNfConntrackBuckets: item["netNetfilterNfConntrackBuckets"],
    fsInotifyMaxUserWatches: item["fsInotifyMaxUserWatches"],
    fsFileMax: item["fsFileMax"],
    fsAioMaxNr: item["fsAioMaxNr"],
    fsNrOpen: item["fsNrOpen"],
    kernelThreadsMax: item["kernelThreadsMax"],
    vmMaxMapCount: item["vmMaxMapCount"],
    vmSwappiness: item["vmSwappiness"],
    vmVfsCachePressure: item["vmVfsCachePressure"],
  };
}

/** GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. */
export enum KnownGPUInstanceProfile {
  /** MIG1g */
  MIG1G = "MIG1g",
  /** MIG2g */
  MIG2G = "MIG2g",
  /** MIG3g */
  MIG3G = "MIG3g",
  /** MIG4g */
  MIG4G = "MIG4g",
  /** MIG7g */
  MIG7G = "MIG7g",
}

/**
 * GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. \
 * {@link KnownGPUInstanceProfile} can be used interchangeably with GPUInstanceProfile,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MIG1g** \
 * **MIG2g** \
 * **MIG3g** \
 * **MIG4g** \
 * **MIG7g**
 */
export type GPUInstanceProfile = string;

/** Data used when creating a target resource from a source resource. */
export interface CreationData {
  /** This is the ARM ID of the source object to be used to create the target object. */
  sourceResourceId?: string;
}

export function creationDataSerializer(item: CreationData): any {
  return { sourceResourceId: item["sourceResourceId"] };
}

export function creationDataDeserializer(item: any): CreationData {
  return {
    sourceResourceId: item["sourceResourceId"],
  };
}

/** Network settings of an agent pool. */
export interface AgentPoolNetworkProfile {
  /** IPTags of instance-level public IPs. */
  nodePublicIPTags?: IPTag[];
  /** The port ranges that are allowed to access. The specified ranges are allowed to overlap. */
  allowedHostPorts?: PortRange[];
  /** The IDs of the application security groups which agent pool will associate when created. */
  applicationSecurityGroups?: string[];
}

export function agentPoolNetworkProfileSerializer(item: AgentPoolNetworkProfile): any {
  return {
    nodePublicIPTags: !item["nodePublicIPTags"]
      ? item["nodePublicIPTags"]
      : ipTagArraySerializer(item["nodePublicIPTags"]),
    allowedHostPorts: !item["allowedHostPorts"]
      ? item["allowedHostPorts"]
      : portRangeArraySerializer(item["allowedHostPorts"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : item["applicationSecurityGroups"].map((p: any) => {
          return p;
        }),
  };
}

export function agentPoolNetworkProfileDeserializer(item: any): AgentPoolNetworkProfile {
  return {
    nodePublicIPTags: !item["nodePublicIPTags"]
      ? item["nodePublicIPTags"]
      : ipTagArrayDeserializer(item["nodePublicIPTags"]),
    allowedHostPorts: !item["allowedHostPorts"]
      ? item["allowedHostPorts"]
      : portRangeArrayDeserializer(item["allowedHostPorts"]),
    applicationSecurityGroups: !item["applicationSecurityGroups"]
      ? item["applicationSecurityGroups"]
      : item["applicationSecurityGroups"].map((p: any) => {
          return p;
        }),
  };
}

export function ipTagArraySerializer(result: Array<IPTag>): any[] {
  return result.map((item) => {
    return ipTagSerializer(item);
  });
}

export function ipTagArrayDeserializer(result: Array<IPTag>): any[] {
  return result.map((item) => {
    return ipTagDeserializer(item);
  });
}

/** Contains the IPTag associated with the object. */
export interface IPTag {
  /** The IP tag type. Example: RoutingPreference. */
  ipTagType?: string;
  /** The value of the IP tag associated with the public IP. Example: Internet. */
  tag?: string;
}

export function ipTagSerializer(item: IPTag): any {
  return { ipTagType: item["ipTagType"], tag: item["tag"] };
}

export function ipTagDeserializer(item: any): IPTag {
  return {
    ipTagType: item["ipTagType"],
    tag: item["tag"],
  };
}

export function portRangeArraySerializer(result: Array<PortRange>): any[] {
  return result.map((item) => {
    return portRangeSerializer(item);
  });
}

export function portRangeArrayDeserializer(result: Array<PortRange>): any[] {
  return result.map((item) => {
    return portRangeDeserializer(item);
  });
}

/** The port range. */
export interface PortRange {
  /** The minimum port that is included in the range. It should be ranged from 1 to 65535, and be less than or equal to portEnd. */
  portStart?: number;
  /** The maximum port that is included in the range. It should be ranged from 1 to 65535, and be greater than or equal to portStart. */
  portEnd?: number;
  /** The network protocol of the port. */
  protocol?: Protocol;
}

export function portRangeSerializer(item: PortRange): any {
  return { portStart: item["portStart"], portEnd: item["portEnd"], protocol: item["protocol"] };
}

export function portRangeDeserializer(item: any): PortRange {
  return {
    portStart: item["portStart"],
    portEnd: item["portEnd"],
    protocol: item["protocol"],
  };
}

/** The network protocol of the port. */
export enum KnownProtocol {
  /** TCP protocol. */
  TCP = "TCP",
  /** UDP protocol. */
  UDP = "UDP",
}

/**
 * The network protocol of the port. \
 * {@link KnownProtocol} can be used interchangeably with Protocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **TCP**: TCP protocol. \
 * **UDP**: UDP protocol.
 */
export type Protocol = string;

/** The Windows agent pool's specific profile. */
export interface AgentPoolWindowsProfile {
  /** Whether to disable OutboundNAT in windows nodes. The default value is false. Outbound NAT can only be disabled if the cluster outboundType is NAT Gateway and the Windows agent pool does not have node public IP enabled. */
  disableOutboundNat?: boolean;
}

export function agentPoolWindowsProfileSerializer(item: AgentPoolWindowsProfile): any {
  return { disableOutboundNat: item["disableOutboundNat"] };
}

export function agentPoolWindowsProfileDeserializer(item: any): AgentPoolWindowsProfile {
  return {
    disableOutboundNat: item["disableOutboundNat"],
  };
}

/** The security settings of an agent pool. */
export interface AgentPoolSecurityProfile {
  /** vTPM is a Trusted Launch feature for configuring a dedicated secure vault for keys and measurements held locally on the node. For more details, see aka.ms/aks/trustedlaunch. If not specified, the default is false. */
  enableVtpm?: boolean;
  /** Secure Boot is a feature of Trusted Launch which ensures that only signed operating systems and drivers can boot. For more details, see aka.ms/aks/trustedlaunch.  If not specified, the default is false. */
  enableSecureBoot?: boolean;
  /** SSH access method of an agent pool. */
  sshAccess?: AgentPoolSSHAccess;
}

export function agentPoolSecurityProfileSerializer(item: AgentPoolSecurityProfile): any {
  return {
    enableVTPM: item["enableVtpm"],
    enableSecureBoot: item["enableSecureBoot"],
    sshAccess: item["sshAccess"],
  };
}

export function agentPoolSecurityProfileDeserializer(item: any): AgentPoolSecurityProfile {
  return {
    enableVtpm: item["enableVTPM"],
    enableSecureBoot: item["enableSecureBoot"],
    sshAccess: item["sshAccess"],
  };
}

/** SSH access method of an agent pool. */
export enum KnownAgentPoolSSHAccess {
  /** Can SSH onto the node as a local user using private key. */
  LocalUser = "LocalUser",
  /** SSH service will be turned off on the node. */
  Disabled = "Disabled",
  /** SSH to node with EntraId integration. More information can be found under https://aka.ms/aks/ssh/aad */
  EntraId = "EntraId",
}

/**
 * SSH access method of an agent pool. \
 * {@link KnownAgentPoolSSHAccess} can be used interchangeably with AgentPoolSSHAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LocalUser**: Can SSH onto the node as a local user using private key. \
 * **Disabled**: SSH service will be turned off on the node. \
 * **EntraId**: SSH to node with EntraId integration. More information can be found under https:\//aka.ms\/aks\/ssh\/aad
 */
export type AgentPoolSSHAccess = string;

/** GPU settings for the Agent Pool. */
export interface GPUProfile {
  /** Whether to install GPU drivers. When it's not specified, default is Install. */
  driver?: GPUDriver;
  /** Specify the type of GPU driver to install when creating Windows agent pools. If not provided, AKS selects the driver based on system compatibility. This cannot be changed once the AgentPool has been created. This cannot be set on Linux AgentPools. For Linux AgentPools, the driver is selected based on system compatibility. */
  driverType?: DriverType;
}

export function gpuProfileSerializer(item: GPUProfile): any {
  return { driver: item["driver"], driverType: item["driverType"] };
}

export function gpuProfileDeserializer(item: any): GPUProfile {
  return {
    driver: item["driver"],
    driverType: item["driverType"],
  };
}

/** Whether to install GPU drivers. When it's not specified, default is Install. */
export enum KnownGPUDriver {
  /** Install driver. */
  Install = "Install",
  /** Skip driver install. */
  None = "None",
}

/**
 * Whether to install GPU drivers. When it's not specified, default is Install. \
 * {@link KnownGPUDriver} can be used interchangeably with GPUDriver,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Install**: Install driver. \
 * **None**: Skip driver install.
 */
export type GPUDriver = string;

/** Specify the type of GPU driver to install when creating Windows agent pools. If not provided, AKS selects the driver based on system compatibility. This cannot be changed once the AgentPool has been created. This cannot be set on Linux AgentPools. For Linux AgentPools, the driver is selected based on system compatibility. */
export enum KnownDriverType {
  /** Install the GRID driver for the GPU, suitable for applications requiring virtualization support. */
  Grid = "GRID",
  /** Install the CUDA driver for the GPU, optimized for computational tasks in scientific computing and data-intensive applications. */
  Cuda = "CUDA",
}

/**
 * Specify the type of GPU driver to install when creating Windows agent pools. If not provided, AKS selects the driver based on system compatibility. This cannot be changed once the AgentPool has been created. This cannot be set on Linux AgentPools. For Linux AgentPools, the driver is selected based on system compatibility. \
 * {@link KnownDriverType} can be used interchangeably with DriverType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **GRID**: Install the GRID driver for the GPU, suitable for applications requiring virtualization support. \
 * **CUDA**: Install the CUDA driver for the GPU, optimized for computational tasks in scientific computing and data-intensive applications.
 */
export type DriverType = string;

/** Profile of the managed cluster gateway agent pool. */
export interface AgentPoolGatewayProfile {
  /** The Gateway agent pool associates one public IPPrefix for each static egress gateway to provide public egress. The size of Public IPPrefix should be selected by the user. Each node in the agent pool is assigned with one IP from the IPPrefix. The IPPrefix size thus serves as a cap on the size of the Gateway agent pool. Due to Azure public IPPrefix size limitation, the valid value range is [28, 31] (/31 = 2 nodes/IPs, /30 = 4 nodes/IPs, /29 = 8 nodes/IPs, /28 = 16 nodes/IPs). The default value is 31. */
  publicIPPrefixSize?: number;
}

export function agentPoolGatewayProfileSerializer(item: AgentPoolGatewayProfile): any {
  return { publicIPPrefixSize: item["publicIPPrefixSize"] };
}

export function agentPoolGatewayProfileDeserializer(item: any): AgentPoolGatewayProfile {
  return {
    publicIPPrefixSize: item["publicIPPrefixSize"],
  };
}

/** model interface AgentPoolArtifactStreamingProfile */
export interface AgentPoolArtifactStreamingProfile {
  /** Artifact streaming speeds up the cold-start of containers on a node through on-demand image loading. To use this feature, container images must also enable artifact streaming on ACR. If not specified, the default is false. */
  enabled?: boolean;
}

export function agentPoolArtifactStreamingProfileSerializer(
  item: AgentPoolArtifactStreamingProfile,
): any {
  return { enabled: item["enabled"] };
}

export function agentPoolArtifactStreamingProfileDeserializer(
  item: any,
): AgentPoolArtifactStreamingProfile {
  return {
    enabled: item["enabled"],
  };
}

/** Specifications on VirtualMachines agent pool. */
export interface VirtualMachinesProfile {
  /** Specifications on how to scale a VirtualMachines agent pool. */
  scale?: ScaleProfile;
}

export function virtualMachinesProfileSerializer(item: VirtualMachinesProfile): any {
  return { scale: !item["scale"] ? item["scale"] : scaleProfileSerializer(item["scale"]) };
}

export function virtualMachinesProfileDeserializer(item: any): VirtualMachinesProfile {
  return {
    scale: !item["scale"] ? item["scale"] : scaleProfileDeserializer(item["scale"]),
  };
}

/** Specifications on how to scale a VirtualMachines agent pool. */
export interface ScaleProfile {
  /** Specifications on how to scale the VirtualMachines agent pool to a fixed size. */
  manual?: ManualScaleProfile[];
  /** Specifications on how to auto-scale the VirtualMachines agent pool within a predefined size range. */
  autoscale?: AutoScaleProfile;
}

export function scaleProfileSerializer(item: ScaleProfile): any {
  return {
    manual: !item["manual"] ? item["manual"] : manualScaleProfileArraySerializer(item["manual"]),
    autoscale: !item["autoscale"]
      ? item["autoscale"]
      : autoScaleProfileSerializer(item["autoscale"]),
  };
}

export function scaleProfileDeserializer(item: any): ScaleProfile {
  return {
    manual: !item["manual"] ? item["manual"] : manualScaleProfileArrayDeserializer(item["manual"]),
    autoscale: !item["autoscale"]
      ? item["autoscale"]
      : autoScaleProfileDeserializer(item["autoscale"]),
  };
}

export function manualScaleProfileArraySerializer(result: Array<ManualScaleProfile>): any[] {
  return result.map((item) => {
    return manualScaleProfileSerializer(item);
  });
}

export function manualScaleProfileArrayDeserializer(result: Array<ManualScaleProfile>): any[] {
  return result.map((item) => {
    return manualScaleProfileDeserializer(item);
  });
}

/** Specifications on number of machines. */
export interface ManualScaleProfile {
  /** VM size that AKS will use when creating and scaling e.g. 'Standard_E4s_v3', 'Standard_E16s_v3' or 'Standard_D16s_v5'. */
  size?: string;
  /** Number of nodes. */
  count?: number;
}

export function manualScaleProfileSerializer(item: ManualScaleProfile): any {
  return { size: item["size"], count: item["count"] };
}

export function manualScaleProfileDeserializer(item: any): ManualScaleProfile {
  return {
    size: item["size"],
    count: item["count"],
  };
}

/** Specifications on auto-scaling. */
export interface AutoScaleProfile {
  /** VM size that AKS will use when creating and scaling e.g. 'Standard_E4s_v3', 'Standard_E16s_v3' or 'Standard_D16s_v5'. */
  size?: string;
  /** The minimum number of nodes of the specified sizes. */
  minCount?: number;
  /** The maximum number of nodes of the specified sizes. */
  maxCount?: number;
}

export function autoScaleProfileSerializer(item: AutoScaleProfile): any {
  return { size: item["size"], minCount: item["minCount"], maxCount: item["maxCount"] };
}

export function autoScaleProfileDeserializer(item: any): AutoScaleProfile {
  return {
    size: item["size"],
    minCount: item["minCount"],
    maxCount: item["maxCount"],
  };
}

export function virtualMachineNodesArraySerializer(result: Array<VirtualMachineNodes>): any[] {
  return result.map((item) => {
    return virtualMachineNodesSerializer(item);
  });
}

export function virtualMachineNodesArrayDeserializer(result: Array<VirtualMachineNodes>): any[] {
  return result.map((item) => {
    return virtualMachineNodesDeserializer(item);
  });
}

/** Current status on a group of nodes of the same vm size. */
export interface VirtualMachineNodes {
  /** The VM size of the agents used to host this group of nodes. */
  size?: string;
  /** Number of nodes. */
  count?: number;
}

export function virtualMachineNodesSerializer(item: VirtualMachineNodes): any {
  return { size: item["size"], count: item["count"] };
}

export function virtualMachineNodesDeserializer(item: any): VirtualMachineNodes {
  return {
    size: item["size"],
    count: item["count"],
  };
}

/** Contains read-only information about the Agent Pool. */
export interface AgentPoolStatus {
  /** The error detail information of the agent pool. Preserves the detailed info of failure. If there was no error, this field is omitted. */
  readonly provisioningError?: ErrorDetail;
}

export function agentPoolStatusSerializer(item: AgentPoolStatus): any {
  return item;
}

export function agentPoolStatusDeserializer(item: any): AgentPoolStatus {
  return {
    provisioningError: !item["provisioningError"]
      ? item["provisioningError"]
      : errorDetailDeserializer(item["provisioningError"]),
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

/** Configures the per-node local DNS, with VnetDNS and KubeDNS overrides. LocalDNS helps improve performance and reliability of DNS resolution in an AKS cluster. For more details see aka.ms/aks/localdns. */
export interface LocalDNSProfile {
  /** Mode of enablement for localDNS. */
  mode?: LocalDNSMode;
  /** System-generated state of localDNS. */
  readonly state?: LocalDNSState;
  /** VnetDNS overrides apply to DNS traffic from pods with dnsPolicy:default or kubelet (referred to as VnetDNS traffic). */
  vnetDNSOverrides?: Record<string, LocalDNSOverride>;
  /** KubeDNS overrides apply to DNS traffic from pods with dnsPolicy:ClusterFirst (referred to as KubeDNS traffic). */
  kubeDNSOverrides?: Record<string, LocalDNSOverride>;
}

export function localDNSProfileSerializer(item: LocalDNSProfile): any {
  return {
    mode: item["mode"],
    vnetDNSOverrides: !item["vnetDNSOverrides"]
      ? item["vnetDNSOverrides"]
      : localDNSOverrideRecordSerializer(item["vnetDNSOverrides"]),
    kubeDNSOverrides: !item["kubeDNSOverrides"]
      ? item["kubeDNSOverrides"]
      : localDNSOverrideRecordSerializer(item["kubeDNSOverrides"]),
  };
}

export function localDNSProfileDeserializer(item: any): LocalDNSProfile {
  return {
    mode: item["mode"],
    state: item["state"],
    vnetDNSOverrides: !item["vnetDNSOverrides"]
      ? item["vnetDNSOverrides"]
      : localDNSOverrideRecordDeserializer(item["vnetDNSOverrides"]),
    kubeDNSOverrides: !item["kubeDNSOverrides"]
      ? item["kubeDNSOverrides"]
      : localDNSOverrideRecordDeserializer(item["kubeDNSOverrides"]),
  };
}

/** Mode of enablement for localDNS. */
export enum KnownLocalDNSMode {
  /** If the current orchestrator version supports this feature, prefer enabling localDNS. */
  Preferred = "Preferred",
  /** Enable localDNS. */
  Required = "Required",
  /** Disable localDNS. */
  Disabled = "Disabled",
}

/**
 * Mode of enablement for localDNS. \
 * {@link KnownLocalDNSMode} can be used interchangeably with LocalDNSMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preferred**: If the current orchestrator version supports this feature, prefer enabling localDNS. \
 * **Required**: Enable localDNS. \
 * **Disabled**: Disable localDNS.
 */
export type LocalDNSMode = string;

/** System-generated state of localDNS. */
export enum KnownLocalDNSState {
  /** localDNS is enabled. */
  Enabled = "Enabled",
  /** localDNS is disabled. */
  Disabled = "Disabled",
}

/**
 * System-generated state of localDNS. \
 * {@link KnownLocalDNSState} can be used interchangeably with LocalDNSState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: localDNS is enabled. \
 * **Disabled**: localDNS is disabled.
 */
export type LocalDNSState = string;

export function localDNSOverrideRecordSerializer(
  item: Record<string, LocalDNSOverride>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : localDNSOverrideSerializer(item[key]);
  });
  return result;
}

export function localDNSOverrideRecordDeserializer(
  item: Record<string, any>,
): Record<string, LocalDNSOverride> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : localDNSOverrideDeserializer(item[key]);
  });
  return result;
}

/** Overrides for localDNS profile. */
export interface LocalDNSOverride {
  /** Log level for DNS queries in localDNS. */
  queryLogging?: LocalDNSQueryLogging;
  /** Enforce TCP or prefer UDP protocol for connections from localDNS to upstream DNS server. */
  protocol?: LocalDNSProtocol;
  /** Destination server for DNS queries to be forwarded from localDNS. */
  forwardDestination?: LocalDNSForwardDestination;
  /** Forward policy for selecting upstream DNS server. See [forward plugin](https://coredns.io/plugins/forward) for more information. */
  forwardPolicy?: LocalDNSForwardPolicy;
  /** Maximum number of concurrent queries. See [forward plugin](https://coredns.io/plugins/forward) for more information. */
  maxConcurrent?: number;
  /** Cache max TTL in seconds. See [cache plugin](https://coredns.io/plugins/cache) for more information. */
  cacheDurationInSeconds?: number;
  /** Serve stale duration in seconds. See [cache plugin](https://coredns.io/plugins/cache) for more information. */
  serveStaleDurationInSeconds?: number;
  /** Policy for serving stale data. See [cache plugin](https://coredns.io/plugins/cache) for more information. */
  serveStale?: LocalDNSServeStale;
}

export function localDNSOverrideSerializer(item: LocalDNSOverride): any {
  return {
    queryLogging: item["queryLogging"],
    protocol: item["protocol"],
    forwardDestination: item["forwardDestination"],
    forwardPolicy: item["forwardPolicy"],
    maxConcurrent: item["maxConcurrent"],
    cacheDurationInSeconds: item["cacheDurationInSeconds"],
    serveStaleDurationInSeconds: item["serveStaleDurationInSeconds"],
    serveStale: item["serveStale"],
  };
}

export function localDNSOverrideDeserializer(item: any): LocalDNSOverride {
  return {
    queryLogging: item["queryLogging"],
    protocol: item["protocol"],
    forwardDestination: item["forwardDestination"],
    forwardPolicy: item["forwardPolicy"],
    maxConcurrent: item["maxConcurrent"],
    cacheDurationInSeconds: item["cacheDurationInSeconds"],
    serveStaleDurationInSeconds: item["serveStaleDurationInSeconds"],
    serveStale: item["serveStale"],
  };
}

/** Log level for DNS queries in localDNS. */
export enum KnownLocalDNSQueryLogging {
  /** Enables error logging in localDNS. See [errors plugin](https://coredns.io/plugins/errors) for more information. */
  Error = "Error",
  /** Enables query logging in localDNS. See [log plugin](https://coredns.io/plugins/log) for more information. */
  Log = "Log",
}

/**
 * Log level for DNS queries in localDNS. \
 * {@link KnownLocalDNSQueryLogging} can be used interchangeably with LocalDNSQueryLogging,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Error**: Enables error logging in localDNS. See [errors plugin](https:\//coredns.io\/plugins\/errors) for more information. \
 * **Log**: Enables query logging in localDNS. See [log plugin](https:\//coredns.io\/plugins\/log) for more information.
 */
export type LocalDNSQueryLogging = string;

/** Enforce TCP or prefer UDP protocol for connections from localDNS to upstream DNS server. */
export enum KnownLocalDNSProtocol {
  /** Prefer UDP protocol for connections from localDNS to upstream DNS server. */
  PreferUDP = "PreferUDP",
  /** Enforce TCP protocol for connections from localDNS to upstream DNS server. */
  ForceTCP = "ForceTCP",
}

/**
 * Enforce TCP or prefer UDP protocol for connections from localDNS to upstream DNS server. \
 * {@link KnownLocalDNSProtocol} can be used interchangeably with LocalDNSProtocol,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **PreferUDP**: Prefer UDP protocol for connections from localDNS to upstream DNS server. \
 * **ForceTCP**: Enforce TCP protocol for connections from localDNS to upstream DNS server.
 */
export type LocalDNSProtocol = string;

/** Destination server for DNS queries to be forwarded from localDNS. */
export enum KnownLocalDNSForwardDestination {
  /** Forward DNS queries from localDNS to cluster CoreDNS. */
  ClusterCoreDNS = "ClusterCoreDNS",
  /** Forward DNS queries from localDNS to DNS server configured in the VNET. A VNET can have multiple DNS servers configured. */
  VnetDNS = "VnetDNS",
}

/**
 * Destination server for DNS queries to be forwarded from localDNS. \
 * {@link KnownLocalDNSForwardDestination} can be used interchangeably with LocalDNSForwardDestination,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ClusterCoreDNS**: Forward DNS queries from localDNS to cluster CoreDNS. \
 * **VnetDNS**: Forward DNS queries from localDNS to DNS server configured in the VNET. A VNET can have multiple DNS servers configured.
 */
export type LocalDNSForwardDestination = string;

/** Forward policy for selecting upstream DNS server. See [forward plugin](https://coredns.io/plugins/forward) for more information. */
export enum KnownLocalDNSForwardPolicy {
  /** Implements sequential upstream DNS server selection. See [forward plugin](https://coredns.io/plugins/forward) for more information. */
  Sequential = "Sequential",
  /** Implements round robin upstream DNS server selection. See [forward plugin](https://coredns.io/plugins/forward) for more information. */
  RoundRobin = "RoundRobin",
  /** Implements random upstream DNS server selection. See [forward plugin](https://coredns.io/plugins/forward) for more information. */
  Random = "Random",
}

/**
 * Forward policy for selecting upstream DNS server. See [forward plugin](https://coredns.io/plugins/forward) for more information. \
 * {@link KnownLocalDNSForwardPolicy} can be used interchangeably with LocalDNSForwardPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sequential**: Implements sequential upstream DNS server selection. See [forward plugin](https:\//coredns.io\/plugins\/forward) for more information. \
 * **RoundRobin**: Implements round robin upstream DNS server selection. See [forward plugin](https:\//coredns.io\/plugins\/forward) for more information. \
 * **Random**: Implements random upstream DNS server selection. See [forward plugin](https:\//coredns.io\/plugins\/forward) for more information.
 */
export type LocalDNSForwardPolicy = string;

/** Policy for serving stale data. See [cache plugin](https://coredns.io/plugins/cache) for more information. */
export enum KnownLocalDNSServeStale {
  /** Serve stale data with verification. First verify that an entry is still unavailable from the source before sending the expired entry to the client. See [cache plugin](https://coredns.io/plugins/cache) for more information. */
  Verify = "Verify",
  /** Serve stale data immediately. Send the expired entry to the client before checking to see if the entry is available from the source. See [cache plugin](https://coredns.io/plugins/cache) for more information. */
  Immediate = "Immediate",
  /** Disable serving stale data. */
  Disable = "Disable",
}

/**
 * Policy for serving stale data. See [cache plugin](https://coredns.io/plugins/cache) for more information. \
 * {@link KnownLocalDNSServeStale} can be used interchangeably with LocalDNSServeStale,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Verify**: Serve stale data with verification. First verify that an entry is still unavailable from the source before sending the expired entry to the client. See [cache plugin](https:\//coredns.io\/plugins\/cache) for more information. \
 * **Immediate**: Serve stale data immediately. Send the expired entry to the client before checking to see if the entry is available from the source. See [cache plugin](https:\//coredns.io\/plugins\/cache) for more information. \
 * **Disable**: Disable serving stale data.
 */
export type LocalDNSServeStale = string;

/** Settings to determine the node customization used to provision nodes in a pool. */
export interface NodeCustomizationProfile {
  /** The resource ID of the node customization resource to use. This can be a version. Omitting the version will use the latest version of the node customization. */
  nodeCustomizationId?: string;
}

export function nodeCustomizationProfileSerializer(item: NodeCustomizationProfile): any {
  return { nodeCustomizationId: item["nodeCustomizationId"] };
}

export function nodeCustomizationProfileDeserializer(item: any): NodeCustomizationProfile {
  return {
    nodeCustomizationId: item["nodeCustomizationId"],
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

/** The response of a AgentPool list operation. */
export interface _AgentPoolListResult {
  /** The AgentPool items on this page */
  value: AgentPool[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _agentPoolListResultDeserializer(item: any): _AgentPoolListResult {
  return {
    value: agentPoolArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function agentPoolArraySerializer(result: Array<AgentPool>): any[] {
  return result.map((item) => {
    return agentPoolSerializer(item);
  });
}

export function agentPoolArrayDeserializer(result: Array<AgentPool>): any[] {
  return result.map((item) => {
    return agentPoolDeserializer(item);
  });
}

/** Specifies a list of machine names from the agent pool to be deleted. */
export interface AgentPoolDeleteMachinesParameter {
  /** The agent pool machine names. */
  machineNames: string[];
}

export function agentPoolDeleteMachinesParameterSerializer(
  item: AgentPoolDeleteMachinesParameter,
): any {
  return {
    machineNames: item["machineNames"].map((p: any) => {
      return p;
    }),
  };
}

/** The list of available versions for an agent pool. */
export interface AgentPoolAvailableVersions {
  /** The ID of the agent pool version list. */
  readonly id?: string;
  /** The name of the agent pool version list. */
  readonly name?: string;
  /** Type of the agent pool version list. */
  readonly type?: string;
  /** List of versions available for agent pool. */
  agentPoolVersions?: AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItem[];
}

export function agentPoolAvailableVersionsDeserializer(item: any): AgentPoolAvailableVersions {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    ..._agentPoolAvailableVersionsPropertiesDeserializer(item["properties"]),
  };
}

/** The list of available agent pool versions. */
export interface AgentPoolAvailableVersionsProperties {
  /** List of versions available for agent pool. */
  agentPoolVersions?: AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItem[];
}

export function agentPoolAvailableVersionsPropertiesDeserializer(
  item: any,
): AgentPoolAvailableVersionsProperties {
  return {
    agentPoolVersions: !item["agentPoolVersions"]
      ? item["agentPoolVersions"]
      : agentPoolAvailableVersionsPropertiesAgentPoolVersionsItemArrayDeserializer(
          item["agentPoolVersions"],
        ),
  };
}

export function agentPoolAvailableVersionsPropertiesAgentPoolVersionsItemArrayDeserializer(
  result: Array<AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItem>,
): any[] {
  return result.map((item) => {
    return agentPoolAvailableVersionsPropertiesAgentPoolVersionsItemDeserializer(item);
  });
}

/** model interface AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItem */
export interface AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItem {
  /** Whether this version is the default agent pool version. */
  default?: boolean;
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether Kubernetes version is currently in preview. */
  isPreview?: boolean;
}

export function agentPoolAvailableVersionsPropertiesAgentPoolVersionsItemDeserializer(
  item: any,
): AgentPoolAvailableVersionsPropertiesAgentPoolVersionsItem {
  return {
    default: item["default"],
    kubernetesVersion: item["kubernetesVersion"],
    isPreview: item["isPreview"],
  };
}

/** The list of available upgrades for an agent pool. */
export interface AgentPoolUpgradeProfile extends ProxyResource {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion: string;
  /** The operating system type. The default is Linux. */
  osType: OSType;
  /** List of orchestrator types and versions available for upgrade. */
  upgrades?: AgentPoolUpgradeProfilePropertiesUpgradesItem[];
  /** List of components grouped by kubernetes major.minor version. */
  componentsByReleases?: ComponentsByRelease[];
  /** List of historical good versions for rollback operations. */
  readonly recentlyUsedVersions?: AgentPoolRecentlyUsedVersion[];
  /** The latest AKS supported node image version. */
  latestNodeImageVersion?: string;
}

export function agentPoolUpgradeProfileDeserializer(item: any): AgentPoolUpgradeProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._agentPoolUpgradeProfilePropertiesDeserializer(item["properties"]),
  };
}

/** The list of available upgrade versions. */
export interface AgentPoolUpgradeProfileProperties {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion: string;
  /** The operating system type. The default is Linux. */
  osType: OSType;
  /** List of orchestrator types and versions available for upgrade. */
  upgrades?: AgentPoolUpgradeProfilePropertiesUpgradesItem[];
  /** List of components grouped by kubernetes major.minor version. */
  componentsByReleases?: ComponentsByRelease[];
  /** List of historical good versions for rollback operations. */
  readonly recentlyUsedVersions?: AgentPoolRecentlyUsedVersion[];
  /** The latest AKS supported node image version. */
  latestNodeImageVersion?: string;
}

export function agentPoolUpgradeProfilePropertiesDeserializer(
  item: any,
): AgentPoolUpgradeProfileProperties {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    osType: item["osType"],
    upgrades: !item["upgrades"]
      ? item["upgrades"]
      : agentPoolUpgradeProfilePropertiesUpgradesItemArrayDeserializer(item["upgrades"]),
    componentsByReleases: !item["componentsByReleases"]
      ? item["componentsByReleases"]
      : componentsByReleaseArrayDeserializer(item["componentsByReleases"]),
    recentlyUsedVersions: !item["recentlyUsedVersions"]
      ? item["recentlyUsedVersions"]
      : agentPoolRecentlyUsedVersionArrayDeserializer(item["recentlyUsedVersions"]),
    latestNodeImageVersion: item["latestNodeImageVersion"],
  };
}

export function agentPoolUpgradeProfilePropertiesUpgradesItemArrayDeserializer(
  result: Array<AgentPoolUpgradeProfilePropertiesUpgradesItem>,
): any[] {
  return result.map((item) => {
    return agentPoolUpgradeProfilePropertiesUpgradesItemDeserializer(item);
  });
}

/** model interface AgentPoolUpgradeProfilePropertiesUpgradesItem */
export interface AgentPoolUpgradeProfilePropertiesUpgradesItem {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether the Kubernetes version is currently in preview. */
  isPreview?: boolean;
  /** Whether the Kubernetes version is out of support. */
  isOutOfSupport?: boolean;
}

export function agentPoolUpgradeProfilePropertiesUpgradesItemDeserializer(
  item: any,
): AgentPoolUpgradeProfilePropertiesUpgradesItem {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    isPreview: item["isPreview"],
    isOutOfSupport: item["isOutOfSupport"],
  };
}

export function componentsByReleaseArrayDeserializer(result: Array<ComponentsByRelease>): any[] {
  return result.map((item) => {
    return componentsByReleaseDeserializer(item);
  });
}

/** components of given Kubernetes version. */
export interface ComponentsByRelease {
  /** The Kubernetes version (major.minor). */
  kubernetesVersion?: string;
  /** components of current or upgraded Kubernetes version in the cluster. */
  components?: Component[];
}

export function componentsByReleaseDeserializer(item: any): ComponentsByRelease {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    components: !item["components"]
      ? item["components"]
      : componentArrayDeserializer(item["components"]),
  };
}

export function componentArrayDeserializer(result: Array<Component>): any[] {
  return result.map((item) => {
    return componentDeserializer(item);
  });
}

/** model interface Component */
export interface Component {
  /** Component name. */
  name?: string;
  /** Component version. */
  version?: string;
  /** If upgraded component version contains breaking changes from the current version. To see a detailed description of what the breaking changes are, visit https://learn.microsoft.com/azure/aks/supported-kubernetes-versions?tabs=azure-cli#aks-components-breaking-changes-by-version. */
  hasBreakingChanges?: boolean;
}

export function componentDeserializer(item: any): Component {
  return {
    name: item["name"],
    version: item["version"],
    hasBreakingChanges: item["hasBreakingChanges"],
  };
}

export function agentPoolRecentlyUsedVersionArrayDeserializer(
  result: Array<AgentPoolRecentlyUsedVersion>,
): any[] {
  return result.map((item) => {
    return agentPoolRecentlyUsedVersionDeserializer(item);
  });
}

/** A historical version that can be used for rollback operations. */
export interface AgentPoolRecentlyUsedVersion {
  /** The Kubernetes version (major.minor.patch) available for rollback. */
  orchestratorVersion?: string;
  /** The node image version available for rollback. */
  nodeImageVersion?: string;
  /** The timestamp when this version was last used. */
  timestamp?: Date;
}

export function agentPoolRecentlyUsedVersionDeserializer(item: any): AgentPoolRecentlyUsedVersion {
  return {
    orchestratorVersion: item["orchestratorVersion"],
    nodeImageVersion: item["nodeImageVersion"],
    timestamp: !item["timestamp"] ? item["timestamp"] : new Date(item["timestamp"]),
  };
}

/** Managed cluster. */
export interface ManagedCluster extends TrackedResource {
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
  /** The managed cluster SKU. */
  sku?: ManagedClusterSKU;
  /** The extended location of the Virtual Machine. */
  extendedLocation?: ExtendedLocation;
  /** The identity of the managed cluster, if configured. */
  identity?: ManagedClusterIdentity;
  /** This is primarily used to expose different UI experiences in the portal for different kinds */
  kind?: string;
  /** The current provisioning state. */
  readonly provisioningState?: string;
  /** The Power State of the cluster. */
  readonly powerState?: PowerState;
  /** CreationData to be used to specify the source Snapshot ID if the cluster will be created/upgraded using a snapshot. */
  creationData?: CreationData;
  /** The max number of agent pools for the managed cluster. */
  readonly maxAgentPools?: number;
  /** The version of Kubernetes specified by the user. Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details. */
  kubernetesVersion?: string;
  /** The version of Kubernetes the Managed Cluster is running. If kubernetesVersion was a fully specified version <major.minor.patch>, this field will be exactly equal to it. If kubernetesVersion was <major.minor>, this field will contain the full <major.minor.patch> version being used. */
  readonly currentKubernetesVersion?: string;
  /** The DNS prefix of the Managed Cluster. This cannot be updated once the Managed Cluster has been created. */
  dnsPrefix?: string;
  /** The FQDN subdomain of the private cluster with custom private dns zone. This cannot be updated once the Managed Cluster has been created. */
  fqdnSubdomain?: string;
  /** The FQDN of the master pool. */
  readonly fqdn?: string;
  /** The FQDN of private cluster. */
  readonly privateFqdn?: string;
  /** The special FQDN used by the Azure Portal to access the Managed Cluster. This FQDN is for use only by the Azure Portal and should not be used by other clients. The Azure Portal requires certain Cross-Origin Resource Sharing (CORS) headers to be sent in some responses, which Kubernetes APIServer doesn't handle by default. This special FQDN supports CORS, allowing the Azure Portal to function properly. */
  readonly azurePortalFqdn?: string;
  /** The agent pool properties. */
  agentPoolProfiles?: ManagedClusterAgentPoolProfile[];
  /** The profile for Linux VMs in the Managed Cluster. */
  linuxProfile?: ContainerServiceLinuxProfile;
  /** The profile for Windows VMs in the Managed Cluster. */
  windowsProfile?: ManagedClusterWindowsProfile;
  /** Information about a service principal identity for the cluster to use for manipulating Azure APIs. */
  servicePrincipalProfile?: ManagedClusterServicePrincipalProfile;
  /** The profile of managed cluster add-on. */
  addonProfiles?: Record<string, ManagedClusterAddonProfile>;
  /** The pod identity profile of the Managed Cluster. See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on AAD pod identity integration. */
  podIdentityProfile?: ManagedClusterPodIdentityProfile;
  /** The OIDC issuer profile of the Managed Cluster. */
  oidcIssuerProfile?: ManagedClusterOidcIssuerProfile;
  /** The name of the resource group containing agent pool nodes. */
  nodeResourceGroup?: string;
  /** Profile of the node resource group configuration. */
  nodeResourceGroupProfile?: ManagedClusterNodeResourceGroupProfile;
  /** Whether to enable Kubernetes Role-Based Access Control. */
  enableRbac?: boolean;
  /** The support plan for the Managed Cluster. If unspecified, the default is 'KubernetesOfficial'. */
  supportPlan?: KubernetesSupportPlan;
  /** Enable namespace as Azure resource. The default value is false. It can be enabled/disabled on creation and updating of the managed cluster. See [https://aka.ms/NamespaceARMResource](https://aka.ms/NamespaceARMResource) for more details on Namespace as a ARM Resource. */
  enableNamespaceResources?: boolean;
  /** The network configuration profile. */
  networkProfile?: ContainerServiceNetworkProfile;
  /** The Azure Active Directory configuration. */
  aadProfile?: ManagedClusterAADProfile;
  /** The auto upgrade configuration. */
  autoUpgradeProfile?: ManagedClusterAutoUpgradeProfile;
  /** Settings for upgrading a cluster. */
  upgradeSettings?: ClusterUpgradeSettings;
  /** Parameters to be applied to the cluster-autoscaler when enabled */
  autoScalerProfile?: ManagedClusterPropertiesAutoScalerProfile;
  /** The access profile for managed cluster API server. */
  apiServerAccessProfile?: ManagedClusterAPIServerAccessProfile;
  /** The Resource ID of the disk encryption set to use for enabling encryption at rest. This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{encryptionSetName}' */
  diskEncryptionSetID?: string;
  /** The user identity associated with the managed cluster. This identity will be used by the kubelet. Only one user assigned identity is allowed. The only accepted key is "kubeletidentity", with value of "resourceId": "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}". */
  identityProfile?: Record<string, UserAssignedIdentity>;
  /** Private link resources associated with the cluster. */
  privateLinkResources?: PrivateLinkResource[];
  /** If local accounts should be disabled on the Managed Cluster. If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview). */
  disableLocalAccounts?: boolean;
  /** Configurations for provisioning the cluster with HTTP proxy servers. */
  httpProxyConfig?: ManagedClusterHttpProxyConfig;
  /** Security profile for the managed cluster. */
  securityProfile?: ManagedClusterSecurityProfile;
  /** Storage profile for the managed cluster. */
  storageProfile?: ManagedClusterStorageProfile;
  /** Ingress profile for the managed cluster. */
  ingressProfile?: ManagedClusterIngressProfile;
  /** PublicNetworkAccess of the managedCluster. Allow or deny public network access for AKS */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Workload Auto-scaler profile for the managed cluster. */
  workloadAutoScalerProfile?: ManagedClusterWorkloadAutoScalerProfile;
  /** Azure Monitor addon profiles for monitoring the managed cluster. */
  azureMonitorProfile?: ManagedClusterAzureMonitorProfile;
  /** Service mesh profile for a managed cluster. */
  serviceMeshProfile?: ServiceMeshProfile;
  /** The resourceUID uniquely identifies ManagedClusters that reuse ARM ResourceIds (i.e: create, delete, create sequence) */
  readonly resourceUID?: string;
  /** Optional cluster metrics configuration. */
  metricsProfile?: ManagedClusterMetricsProfile;
  /** Node provisioning settings that apply to the whole cluster. */
  nodeProvisioningProfile?: ManagedClusterNodeProvisioningProfile;
  /** Profile of the cluster bootstrap configuration. */
  bootstrapProfile?: ManagedClusterBootstrapProfile;
  /** AI toolchain operator settings that apply to the whole cluster. */
  aiToolchainOperatorProfile?: ManagedClusterAIToolchainOperatorProfile;
  /** Profile of the pod scheduler configuration. */
  schedulerProfile?: SchedulerProfile;
  /** Settings for hosted system addons. For more information, see https://aka.ms/aks/automatic/systemcomponents. */
  hostedSystemProfile?: ManagedClusterHostedSystemProfile;
  /** Contains read-only information about the Managed Cluster. */
  status?: ManagedClusterStatus;
}

export function managedClusterSerializer(item: ManagedCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
      "creationData",
      "kubernetesVersion",
      "dnsPrefix",
      "fqdnSubdomain",
      "agentPoolProfiles",
      "linuxProfile",
      "windowsProfile",
      "servicePrincipalProfile",
      "addonProfiles",
      "podIdentityProfile",
      "oidcIssuerProfile",
      "nodeResourceGroup",
      "nodeResourceGroupProfile",
      "enableRBAC",
      "supportPlan",
      "enableNamespaceResources",
      "networkProfile",
      "aadProfile",
      "autoUpgradeProfile",
      "upgradeSettings",
      "autoScalerProfile",
      "apiServerAccessProfile",
      "diskEncryptionSetID",
      "identityProfile",
      "privateLinkResources",
      "disableLocalAccounts",
      "httpProxyConfig",
      "securityProfile",
      "storageProfile",
      "ingressProfile",
      "publicNetworkAccess",
      "workloadAutoScalerProfile",
      "azureMonitorProfile",
      "serviceMeshProfile",
      "metricsProfile",
      "nodeProvisioningProfile",
      "bootstrapProfile",
      "aiToolchainOperatorProfile",
      "schedulerProfile",
      "hostedSystemProfile",
      "status",
    ])
      ? undefined
      : _managedClusterPropertiesSerializer(item),
    sku: !item["sku"] ? item["sku"] : managedClusterSKUSerializer(item["sku"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationSerializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedClusterIdentitySerializer(item["identity"]),
    kind: item["kind"],
  };
}

export function managedClusterDeserializer(item: any): ManagedCluster {
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
      : _managedClusterPropertiesDeserializer(item["properties"])),
    eTag: item["eTag"],
    sku: !item["sku"] ? item["sku"] : managedClusterSKUDeserializer(item["sku"]),
    extendedLocation: !item["extendedLocation"]
      ? item["extendedLocation"]
      : extendedLocationDeserializer(item["extendedLocation"]),
    identity: !item["identity"]
      ? item["identity"]
      : managedClusterIdentityDeserializer(item["identity"]),
    kind: item["kind"],
  };
}

/** Properties of the managed cluster. */
export interface ManagedClusterProperties {
  /** The current provisioning state. */
  readonly provisioningState?: string;
  /** The Power State of the cluster. */
  readonly powerState?: PowerState;
  /** CreationData to be used to specify the source Snapshot ID if the cluster will be created/upgraded using a snapshot. */
  creationData?: CreationData;
  /** The max number of agent pools for the managed cluster. */
  readonly maxAgentPools?: number;
  /** The version of Kubernetes specified by the user. Both patch version <major.minor.patch> (e.g. 1.20.13) and <major.minor> (e.g. 1.20) are supported. When <major.minor> is specified, the latest supported GA patch version is chosen automatically. Updating the cluster with the same <major.minor> once it has been created (e.g. 1.14.x -> 1.14) will not trigger an upgrade, even if a newer patch version is available. When you upgrade a supported AKS cluster, Kubernetes minor versions cannot be skipped. All upgrades must be performed sequentially by major version number. For example, upgrades between 1.14.x -> 1.15.x or 1.15.x -> 1.16.x are allowed, however 1.14.x -> 1.16.x is not allowed. See [upgrading an AKS cluster](https://docs.microsoft.com/azure/aks/upgrade-cluster) for more details. */
  kubernetesVersion?: string;
  /** The version of Kubernetes the Managed Cluster is running. If kubernetesVersion was a fully specified version <major.minor.patch>, this field will be exactly equal to it. If kubernetesVersion was <major.minor>, this field will contain the full <major.minor.patch> version being used. */
  readonly currentKubernetesVersion?: string;
  /** The DNS prefix of the Managed Cluster. This cannot be updated once the Managed Cluster has been created. */
  dnsPrefix?: string;
  /** The FQDN subdomain of the private cluster with custom private dns zone. This cannot be updated once the Managed Cluster has been created. */
  fqdnSubdomain?: string;
  /** The FQDN of the master pool. */
  readonly fqdn?: string;
  /** The FQDN of private cluster. */
  readonly privateFqdn?: string;
  /** The special FQDN used by the Azure Portal to access the Managed Cluster. This FQDN is for use only by the Azure Portal and should not be used by other clients. The Azure Portal requires certain Cross-Origin Resource Sharing (CORS) headers to be sent in some responses, which Kubernetes APIServer doesn't handle by default. This special FQDN supports CORS, allowing the Azure Portal to function properly. */
  readonly azurePortalFqdn?: string;
  /** The agent pool properties. */
  agentPoolProfiles?: ManagedClusterAgentPoolProfile[];
  /** The profile for Linux VMs in the Managed Cluster. */
  linuxProfile?: ContainerServiceLinuxProfile;
  /** The profile for Windows VMs in the Managed Cluster. */
  windowsProfile?: ManagedClusterWindowsProfile;
  /** Information about a service principal identity for the cluster to use for manipulating Azure APIs. */
  servicePrincipalProfile?: ManagedClusterServicePrincipalProfile;
  /** The profile of managed cluster add-on. */
  addonProfiles?: Record<string, ManagedClusterAddonProfile>;
  /** The pod identity profile of the Managed Cluster. See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on AAD pod identity integration. */
  podIdentityProfile?: ManagedClusterPodIdentityProfile;
  /** The OIDC issuer profile of the Managed Cluster. */
  oidcIssuerProfile?: ManagedClusterOidcIssuerProfile;
  /** The name of the resource group containing agent pool nodes. */
  nodeResourceGroup?: string;
  /** Profile of the node resource group configuration. */
  nodeResourceGroupProfile?: ManagedClusterNodeResourceGroupProfile;
  /** Whether to enable Kubernetes Role-Based Access Control. */
  enableRbac?: boolean;
  /** The support plan for the Managed Cluster. If unspecified, the default is 'KubernetesOfficial'. */
  supportPlan?: KubernetesSupportPlan;
  /** Enable namespace as Azure resource. The default value is false. It can be enabled/disabled on creation and updating of the managed cluster. See [https://aka.ms/NamespaceARMResource](https://aka.ms/NamespaceARMResource) for more details on Namespace as a ARM Resource. */
  enableNamespaceResources?: boolean;
  /** The network configuration profile. */
  networkProfile?: ContainerServiceNetworkProfile;
  /** The Azure Active Directory configuration. */
  aadProfile?: ManagedClusterAADProfile;
  /** The auto upgrade configuration. */
  autoUpgradeProfile?: ManagedClusterAutoUpgradeProfile;
  /** Settings for upgrading a cluster. */
  upgradeSettings?: ClusterUpgradeSettings;
  /** Parameters to be applied to the cluster-autoscaler when enabled */
  autoScalerProfile?: ManagedClusterPropertiesAutoScalerProfile;
  /** The access profile for managed cluster API server. */
  apiServerAccessProfile?: ManagedClusterAPIServerAccessProfile;
  /** The Resource ID of the disk encryption set to use for enabling encryption at rest. This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/diskEncryptionSets/{encryptionSetName}' */
  diskEncryptionSetID?: string;
  /** The user identity associated with the managed cluster. This identity will be used by the kubelet. Only one user assigned identity is allowed. The only accepted key is "kubeletidentity", with value of "resourceId": "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}". */
  identityProfile?: Record<string, UserAssignedIdentity>;
  /** Private link resources associated with the cluster. */
  privateLinkResources?: PrivateLinkResource[];
  /** If local accounts should be disabled on the Managed Cluster. If set to true, getting static credentials will be disabled for this cluster. This must only be used on Managed Clusters that are AAD enabled. For more details see [disable local accounts](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview). */
  disableLocalAccounts?: boolean;
  /** Configurations for provisioning the cluster with HTTP proxy servers. */
  httpProxyConfig?: ManagedClusterHttpProxyConfig;
  /** Security profile for the managed cluster. */
  securityProfile?: ManagedClusterSecurityProfile;
  /** Storage profile for the managed cluster. */
  storageProfile?: ManagedClusterStorageProfile;
  /** Ingress profile for the managed cluster. */
  ingressProfile?: ManagedClusterIngressProfile;
  /** PublicNetworkAccess of the managedCluster. Allow or deny public network access for AKS */
  publicNetworkAccess?: PublicNetworkAccess;
  /** Workload Auto-scaler profile for the managed cluster. */
  workloadAutoScalerProfile?: ManagedClusterWorkloadAutoScalerProfile;
  /** Azure Monitor addon profiles for monitoring the managed cluster. */
  azureMonitorProfile?: ManagedClusterAzureMonitorProfile;
  /** Service mesh profile for a managed cluster. */
  serviceMeshProfile?: ServiceMeshProfile;
  /** The resourceUID uniquely identifies ManagedClusters that reuse ARM ResourceIds (i.e: create, delete, create sequence) */
  readonly resourceUID?: string;
  /** Optional cluster metrics configuration. */
  metricsProfile?: ManagedClusterMetricsProfile;
  /** Node provisioning settings that apply to the whole cluster. */
  nodeProvisioningProfile?: ManagedClusterNodeProvisioningProfile;
  /** Profile of the cluster bootstrap configuration. */
  bootstrapProfile?: ManagedClusterBootstrapProfile;
  /** AI toolchain operator settings that apply to the whole cluster. */
  aiToolchainOperatorProfile?: ManagedClusterAIToolchainOperatorProfile;
  /** Profile of the pod scheduler configuration. */
  schedulerProfile?: SchedulerProfile;
  /** Settings for hosted system addons. For more information, see https://aka.ms/aks/automatic/systemcomponents. */
  hostedSystemProfile?: ManagedClusterHostedSystemProfile;
  /** Contains read-only information about the Managed Cluster. */
  status?: ManagedClusterStatus;
}

export function managedClusterPropertiesSerializer(item: ManagedClusterProperties): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    kubernetesVersion: item["kubernetesVersion"],
    dnsPrefix: item["dnsPrefix"],
    fqdnSubdomain: item["fqdnSubdomain"],
    agentPoolProfiles: !item["agentPoolProfiles"]
      ? item["agentPoolProfiles"]
      : managedClusterAgentPoolProfileArraySerializer(item["agentPoolProfiles"]),
    linuxProfile: !item["linuxProfile"]
      ? item["linuxProfile"]
      : containerServiceLinuxProfileSerializer(item["linuxProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : managedClusterWindowsProfileSerializer(item["windowsProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : managedClusterServicePrincipalProfileSerializer(item["servicePrincipalProfile"]),
    addonProfiles: !item["addonProfiles"]
      ? item["addonProfiles"]
      : managedClusterAddonProfileRecordSerializer(item["addonProfiles"]),
    podIdentityProfile: !item["podIdentityProfile"]
      ? item["podIdentityProfile"]
      : managedClusterPodIdentityProfileSerializer(item["podIdentityProfile"]),
    oidcIssuerProfile: !item["oidcIssuerProfile"]
      ? item["oidcIssuerProfile"]
      : managedClusterOidcIssuerProfileSerializer(item["oidcIssuerProfile"]),
    nodeResourceGroup: item["nodeResourceGroup"],
    nodeResourceGroupProfile: !item["nodeResourceGroupProfile"]
      ? item["nodeResourceGroupProfile"]
      : managedClusterNodeResourceGroupProfileSerializer(item["nodeResourceGroupProfile"]),
    enableRBAC: item["enableRbac"],
    supportPlan: item["supportPlan"],
    enableNamespaceResources: item["enableNamespaceResources"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : containerServiceNetworkProfileSerializer(item["networkProfile"]),
    aadProfile: !item["aadProfile"]
      ? item["aadProfile"]
      : managedClusterAADProfileSerializer(item["aadProfile"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : managedClusterAutoUpgradeProfileSerializer(item["autoUpgradeProfile"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : clusterUpgradeSettingsSerializer(item["upgradeSettings"]),
    autoScalerProfile: !item["autoScalerProfile"]
      ? item["autoScalerProfile"]
      : managedClusterPropertiesAutoScalerProfileSerializer(item["autoScalerProfile"]),
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : managedClusterAPIServerAccessProfileSerializer(item["apiServerAccessProfile"]),
    diskEncryptionSetID: item["diskEncryptionSetID"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : userAssignedIdentityRecordSerializer(item["identityProfile"]),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinkResourceArraySerializer(item["privateLinkResources"]),
    disableLocalAccounts: item["disableLocalAccounts"],
    httpProxyConfig: !item["httpProxyConfig"]
      ? item["httpProxyConfig"]
      : managedClusterHttpProxyConfigSerializer(item["httpProxyConfig"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : managedClusterSecurityProfileSerializer(item["securityProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : managedClusterStorageProfileSerializer(item["storageProfile"]),
    ingressProfile: !item["ingressProfile"]
      ? item["ingressProfile"]
      : managedClusterIngressProfileSerializer(item["ingressProfile"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    workloadAutoScalerProfile: !item["workloadAutoScalerProfile"]
      ? item["workloadAutoScalerProfile"]
      : managedClusterWorkloadAutoScalerProfileSerializer(item["workloadAutoScalerProfile"]),
    azureMonitorProfile: !item["azureMonitorProfile"]
      ? item["azureMonitorProfile"]
      : managedClusterAzureMonitorProfileSerializer(item["azureMonitorProfile"]),
    serviceMeshProfile: !item["serviceMeshProfile"]
      ? item["serviceMeshProfile"]
      : serviceMeshProfileSerializer(item["serviceMeshProfile"]),
    metricsProfile: !item["metricsProfile"]
      ? item["metricsProfile"]
      : managedClusterMetricsProfileSerializer(item["metricsProfile"]),
    nodeProvisioningProfile: !item["nodeProvisioningProfile"]
      ? item["nodeProvisioningProfile"]
      : managedClusterNodeProvisioningProfileSerializer(item["nodeProvisioningProfile"]),
    bootstrapProfile: !item["bootstrapProfile"]
      ? item["bootstrapProfile"]
      : managedClusterBootstrapProfileSerializer(item["bootstrapProfile"]),
    aiToolchainOperatorProfile: !item["aiToolchainOperatorProfile"]
      ? item["aiToolchainOperatorProfile"]
      : managedClusterAIToolchainOperatorProfileSerializer(item["aiToolchainOperatorProfile"]),
    schedulerProfile: !item["schedulerProfile"]
      ? item["schedulerProfile"]
      : schedulerProfileSerializer(item["schedulerProfile"]),
    hostedSystemProfile: !item["hostedSystemProfile"]
      ? item["hostedSystemProfile"]
      : managedClusterHostedSystemProfileSerializer(item["hostedSystemProfile"]),
    status: !item["status"] ? item["status"] : managedClusterStatusSerializer(item["status"]),
  };
}

export function managedClusterPropertiesDeserializer(item: any): ManagedClusterProperties {
  return {
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    maxAgentPools: item["maxAgentPools"],
    kubernetesVersion: item["kubernetesVersion"],
    currentKubernetesVersion: item["currentKubernetesVersion"],
    dnsPrefix: item["dnsPrefix"],
    fqdnSubdomain: item["fqdnSubdomain"],
    fqdn: item["fqdn"],
    privateFqdn: item["privateFQDN"],
    azurePortalFqdn: item["azurePortalFQDN"],
    agentPoolProfiles: !item["agentPoolProfiles"]
      ? item["agentPoolProfiles"]
      : managedClusterAgentPoolProfileArrayDeserializer(item["agentPoolProfiles"]),
    linuxProfile: !item["linuxProfile"]
      ? item["linuxProfile"]
      : containerServiceLinuxProfileDeserializer(item["linuxProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : managedClusterWindowsProfileDeserializer(item["windowsProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : managedClusterServicePrincipalProfileDeserializer(item["servicePrincipalProfile"]),
    addonProfiles: !item["addonProfiles"]
      ? item["addonProfiles"]
      : managedClusterAddonProfileRecordDeserializer(item["addonProfiles"]),
    podIdentityProfile: !item["podIdentityProfile"]
      ? item["podIdentityProfile"]
      : managedClusterPodIdentityProfileDeserializer(item["podIdentityProfile"]),
    oidcIssuerProfile: !item["oidcIssuerProfile"]
      ? item["oidcIssuerProfile"]
      : managedClusterOidcIssuerProfileDeserializer(item["oidcIssuerProfile"]),
    nodeResourceGroup: item["nodeResourceGroup"],
    nodeResourceGroupProfile: !item["nodeResourceGroupProfile"]
      ? item["nodeResourceGroupProfile"]
      : managedClusterNodeResourceGroupProfileDeserializer(item["nodeResourceGroupProfile"]),
    enableRbac: item["enableRBAC"],
    supportPlan: item["supportPlan"],
    enableNamespaceResources: item["enableNamespaceResources"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : containerServiceNetworkProfileDeserializer(item["networkProfile"]),
    aadProfile: !item["aadProfile"]
      ? item["aadProfile"]
      : managedClusterAADProfileDeserializer(item["aadProfile"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : managedClusterAutoUpgradeProfileDeserializer(item["autoUpgradeProfile"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : clusterUpgradeSettingsDeserializer(item["upgradeSettings"]),
    autoScalerProfile: !item["autoScalerProfile"]
      ? item["autoScalerProfile"]
      : managedClusterPropertiesAutoScalerProfileDeserializer(item["autoScalerProfile"]),
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : managedClusterAPIServerAccessProfileDeserializer(item["apiServerAccessProfile"]),
    diskEncryptionSetID: item["diskEncryptionSetID"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : userAssignedIdentityRecordDeserializer(item["identityProfile"]),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinkResourceArrayDeserializer(item["privateLinkResources"]),
    disableLocalAccounts: item["disableLocalAccounts"],
    httpProxyConfig: !item["httpProxyConfig"]
      ? item["httpProxyConfig"]
      : managedClusterHttpProxyConfigDeserializer(item["httpProxyConfig"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : managedClusterSecurityProfileDeserializer(item["securityProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : managedClusterStorageProfileDeserializer(item["storageProfile"]),
    ingressProfile: !item["ingressProfile"]
      ? item["ingressProfile"]
      : managedClusterIngressProfileDeserializer(item["ingressProfile"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    workloadAutoScalerProfile: !item["workloadAutoScalerProfile"]
      ? item["workloadAutoScalerProfile"]
      : managedClusterWorkloadAutoScalerProfileDeserializer(item["workloadAutoScalerProfile"]),
    azureMonitorProfile: !item["azureMonitorProfile"]
      ? item["azureMonitorProfile"]
      : managedClusterAzureMonitorProfileDeserializer(item["azureMonitorProfile"]),
    serviceMeshProfile: !item["serviceMeshProfile"]
      ? item["serviceMeshProfile"]
      : serviceMeshProfileDeserializer(item["serviceMeshProfile"]),
    resourceUID: item["resourceUID"],
    metricsProfile: !item["metricsProfile"]
      ? item["metricsProfile"]
      : managedClusterMetricsProfileDeserializer(item["metricsProfile"]),
    nodeProvisioningProfile: !item["nodeProvisioningProfile"]
      ? item["nodeProvisioningProfile"]
      : managedClusterNodeProvisioningProfileDeserializer(item["nodeProvisioningProfile"]),
    bootstrapProfile: !item["bootstrapProfile"]
      ? item["bootstrapProfile"]
      : managedClusterBootstrapProfileDeserializer(item["bootstrapProfile"]),
    aiToolchainOperatorProfile: !item["aiToolchainOperatorProfile"]
      ? item["aiToolchainOperatorProfile"]
      : managedClusterAIToolchainOperatorProfileDeserializer(item["aiToolchainOperatorProfile"]),
    schedulerProfile: !item["schedulerProfile"]
      ? item["schedulerProfile"]
      : schedulerProfileDeserializer(item["schedulerProfile"]),
    hostedSystemProfile: !item["hostedSystemProfile"]
      ? item["hostedSystemProfile"]
      : managedClusterHostedSystemProfileDeserializer(item["hostedSystemProfile"]),
    status: !item["status"] ? item["status"] : managedClusterStatusDeserializer(item["status"]),
  };
}

export function managedClusterAgentPoolProfileArraySerializer(
  result: Array<ManagedClusterAgentPoolProfile>,
): any[] {
  return result.map((item) => {
    return managedClusterAgentPoolProfileSerializer(item);
  });
}

export function managedClusterAgentPoolProfileArrayDeserializer(
  result: Array<ManagedClusterAgentPoolProfile>,
): any[] {
  return result.map((item) => {
    return managedClusterAgentPoolProfileDeserializer(item);
  });
}

/** Profile for the container service agent pool. */
export interface ManagedClusterAgentPoolProfile extends ManagedClusterAgentPoolProfileProperties {
  /** Unique name of the agent pool profile in the context of the subscription and resource group. Windows agent pool names must be 6 characters or less. */
  name: string;
}

export function managedClusterAgentPoolProfileSerializer(
  item: ManagedClusterAgentPoolProfile,
): any {
  return {
    count: item["count"],
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    kubeletDiskType: item["kubeletDiskType"],
    workloadRuntime: item["workloadRuntime"],
    messageOfTheDay: item["messageOfTheDay"],
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    podIPAllocationMode: item["podIPAllocationMode"],
    maxPods: item["maxPods"],
    osType: item["osType"],
    osSKU: item["osSKU"],
    maxCount: item["maxCount"],
    minCount: item["minCount"],
    enableAutoScaling: item["enableAutoScaling"],
    scaleDownMode: item["scaleDownMode"],
    type: item["type"],
    mode: item["mode"],
    orchestratorVersion: item["orchestratorVersion"],
    upgradeStrategy: item["upgradeStrategy"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
    upgradeSettingsBlueGreen: !item["upgradeSettingsBlueGreen"]
      ? item["upgradeSettingsBlueGreen"]
      : agentPoolBlueGreenUpgradeSettingsSerializer(item["upgradeSettingsBlueGreen"]),
    powerState: !item["powerState"] ? item["powerState"] : powerStateSerializer(item["powerState"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    scaleSetPriority: item["scaleSetPriority"],
    scaleSetEvictionPolicy: item["scaleSetEvictionPolicy"],
    spotMaxPrice: item["spotMaxPrice"],
    tags: item["tags"],
    nodeLabels: item["nodeLabels"],
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    proximityPlacementGroupID: item["proximityPlacementGroupID"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigSerializer(item["kubeletConfig"]),
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigSerializer(item["linuxOSConfig"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableUltraSSD: item["enableUltraSSD"],
    enableFIPS: item["enableFips"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    capacityReservationGroupID: item["capacityReservationGroupID"],
    hostGroupID: item["hostGroupID"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : agentPoolNetworkProfileSerializer(item["networkProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileSerializer(item["windowsProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : agentPoolSecurityProfileSerializer(item["securityProfile"]),
    gpuProfile: !item["gpuProfile"] ? item["gpuProfile"] : gpuProfileSerializer(item["gpuProfile"]),
    gatewayProfile: !item["gatewayProfile"]
      ? item["gatewayProfile"]
      : agentPoolGatewayProfileSerializer(item["gatewayProfile"]),
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileSerializer(item["artifactStreamingProfile"]),
    virtualMachinesProfile: !item["virtualMachinesProfile"]
      ? item["virtualMachinesProfile"]
      : virtualMachinesProfileSerializer(item["virtualMachinesProfile"]),
    virtualMachineNodesStatus: !item["virtualMachineNodesStatus"]
      ? item["virtualMachineNodesStatus"]
      : virtualMachineNodesArraySerializer(item["virtualMachineNodesStatus"]),
    status: !item["status"] ? item["status"] : agentPoolStatusSerializer(item["status"]),
    localDNSProfile: !item["localDNSProfile"]
      ? item["localDNSProfile"]
      : localDNSProfileSerializer(item["localDNSProfile"]),
    nodeCustomizationProfile: !item["nodeCustomizationProfile"]
      ? item["nodeCustomizationProfile"]
      : nodeCustomizationProfileSerializer(item["nodeCustomizationProfile"]),
    name: item["name"],
  };
}

export function managedClusterAgentPoolProfileDeserializer(
  item: any,
): ManagedClusterAgentPoolProfile {
  return {
    eTag: item["eTag"],
    count: item["count"],
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    kubeletDiskType: item["kubeletDiskType"],
    workloadRuntime: item["workloadRuntime"],
    messageOfTheDay: item["messageOfTheDay"],
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    podIPAllocationMode: item["podIPAllocationMode"],
    maxPods: item["maxPods"],
    osType: item["osType"],
    osSKU: item["osSKU"],
    maxCount: item["maxCount"],
    minCount: item["minCount"],
    enableAutoScaling: item["enableAutoScaling"],
    scaleDownMode: item["scaleDownMode"],
    type: item["type"],
    mode: item["mode"],
    orchestratorVersion: item["orchestratorVersion"],
    currentOrchestratorVersion: item["currentOrchestratorVersion"],
    nodeImageVersion: item["nodeImageVersion"],
    upgradeStrategy: item["upgradeStrategy"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
    upgradeSettingsBlueGreen: !item["upgradeSettingsBlueGreen"]
      ? item["upgradeSettingsBlueGreen"]
      : agentPoolBlueGreenUpgradeSettingsDeserializer(item["upgradeSettingsBlueGreen"]),
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    scaleSetPriority: item["scaleSetPriority"],
    scaleSetEvictionPolicy: item["scaleSetEvictionPolicy"],
    spotMaxPrice: item["spotMaxPrice"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    nodeLabels: !item["nodeLabels"]
      ? item["nodeLabels"]
      : Object.fromEntries(
          Object.entries(item["nodeLabels"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    proximityPlacementGroupID: item["proximityPlacementGroupID"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigDeserializer(item["kubeletConfig"]),
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigDeserializer(item["linuxOSConfig"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableUltraSSD: item["enableUltraSSD"],
    enableFips: item["enableFIPS"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    capacityReservationGroupID: item["capacityReservationGroupID"],
    hostGroupID: item["hostGroupID"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : agentPoolNetworkProfileDeserializer(item["networkProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileDeserializer(item["windowsProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : agentPoolSecurityProfileDeserializer(item["securityProfile"]),
    gpuProfile: !item["gpuProfile"]
      ? item["gpuProfile"]
      : gpuProfileDeserializer(item["gpuProfile"]),
    gatewayProfile: !item["gatewayProfile"]
      ? item["gatewayProfile"]
      : agentPoolGatewayProfileDeserializer(item["gatewayProfile"]),
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileDeserializer(item["artifactStreamingProfile"]),
    virtualMachinesProfile: !item["virtualMachinesProfile"]
      ? item["virtualMachinesProfile"]
      : virtualMachinesProfileDeserializer(item["virtualMachinesProfile"]),
    virtualMachineNodesStatus: !item["virtualMachineNodesStatus"]
      ? item["virtualMachineNodesStatus"]
      : virtualMachineNodesArrayDeserializer(item["virtualMachineNodesStatus"]),
    status: !item["status"] ? item["status"] : agentPoolStatusDeserializer(item["status"]),
    localDNSProfile: !item["localDNSProfile"]
      ? item["localDNSProfile"]
      : localDNSProfileDeserializer(item["localDNSProfile"]),
    nodeCustomizationProfile: !item["nodeCustomizationProfile"]
      ? item["nodeCustomizationProfile"]
      : nodeCustomizationProfileDeserializer(item["nodeCustomizationProfile"]),
    name: item["name"],
  };
}

/** Profile for Linux VMs in the container service cluster. */
export interface ContainerServiceLinuxProfile {
  /** The administrator username to use for Linux VMs. */
  adminUsername: string;
  /** The SSH configuration for Linux-based VMs running on Azure. */
  ssh: ContainerServiceSshConfiguration;
}

export function containerServiceLinuxProfileSerializer(item: ContainerServiceLinuxProfile): any {
  return {
    adminUsername: item["adminUsername"],
    ssh: containerServiceSshConfigurationSerializer(item["ssh"]),
  };
}

export function containerServiceLinuxProfileDeserializer(item: any): ContainerServiceLinuxProfile {
  return {
    adminUsername: item["adminUsername"],
    ssh: containerServiceSshConfigurationDeserializer(item["ssh"]),
  };
}

/** SSH configuration for Linux-based VMs running on Azure. */
export interface ContainerServiceSshConfiguration {
  /** The list of SSH public keys used to authenticate with Linux-based VMs. A maximum of 1 key may be specified. */
  publicKeys: ContainerServiceSshPublicKey[];
}

export function containerServiceSshConfigurationSerializer(
  item: ContainerServiceSshConfiguration,
): any {
  return { publicKeys: containerServiceSshPublicKeyArraySerializer(item["publicKeys"]) };
}

export function containerServiceSshConfigurationDeserializer(
  item: any,
): ContainerServiceSshConfiguration {
  return {
    publicKeys: containerServiceSshPublicKeyArrayDeserializer(item["publicKeys"]),
  };
}

export function containerServiceSshPublicKeyArraySerializer(
  result: Array<ContainerServiceSshPublicKey>,
): any[] {
  return result.map((item) => {
    return containerServiceSshPublicKeySerializer(item);
  });
}

export function containerServiceSshPublicKeyArrayDeserializer(
  result: Array<ContainerServiceSshPublicKey>,
): any[] {
  return result.map((item) => {
    return containerServiceSshPublicKeyDeserializer(item);
  });
}

/** Contains information about SSH certificate public key data. */
export interface ContainerServiceSshPublicKey {
  /** Certificate public key used to authenticate with VMs through SSH. The certificate must be in PEM format with or without headers. */
  keyData: string;
}

export function containerServiceSshPublicKeySerializer(item: ContainerServiceSshPublicKey): any {
  return { keyData: item["keyData"] };
}

export function containerServiceSshPublicKeyDeserializer(item: any): ContainerServiceSshPublicKey {
  return {
    keyData: item["keyData"],
  };
}

/** Profile for Windows VMs in the managed cluster. */
export interface ManagedClusterWindowsProfile {
  /** Specifies the name of the administrator account. <br><br> **Restriction:** Cannot end in "." <br><br> **Disallowed values:** "administrator", "admin", "user", "user1", "test", "user2", "test1", "user3", "admin1", "1", "123", "a", "actuser", "adm", "admin2", "aspnet", "backup", "console", "david", "guest", "john", "owner", "root", "server", "sql", "support", "support_388945a0", "sys", "test2", "test3", "user4", "user5". <br><br> **Minimum-length:** 1 character <br><br> **Max-length:** 20 characters */
  adminUsername: string;
  /** Specifies the password of the administrator account. <br><br> **Minimum-length:** 8 characters <br><br> **Max-length:** 123 characters <br><br> **Complexity requirements:** 3 out of 4 conditions below need to be fulfilled <br> Has lower characters <br>Has upper characters <br> Has a digit <br> Has a special character (Regex match [\W_]) <br><br> **Disallowed values:** "abc@123", "P@$$w0rd", "P@ssw0rd", "P@ssword123", "Pa$$word", "pass@word1", "Password!", "Password1", "Password22", "iloveyou!" */
  adminPassword?: string;
  /** The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details. */
  licenseType?: LicenseType;
  /** Whether to enable CSI proxy. For more details on CSI proxy, see the [CSI proxy GitHub repo](https://github.com/kubernetes-csi/csi-proxy). */
  enableCSIProxy?: boolean;
  /** The Windows gMSA Profile in the Managed Cluster. */
  gmsaProfile?: WindowsGmsaProfile;
}

export function managedClusterWindowsProfileSerializer(item: ManagedClusterWindowsProfile): any {
  return {
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    licenseType: item["licenseType"],
    enableCSIProxy: item["enableCSIProxy"],
    gmsaProfile: !item["gmsaProfile"]
      ? item["gmsaProfile"]
      : windowsGmsaProfileSerializer(item["gmsaProfile"]),
  };
}

export function managedClusterWindowsProfileDeserializer(item: any): ManagedClusterWindowsProfile {
  return {
    adminUsername: item["adminUsername"],
    adminPassword: item["adminPassword"],
    licenseType: item["licenseType"],
    enableCSIProxy: item["enableCSIProxy"],
    gmsaProfile: !item["gmsaProfile"]
      ? item["gmsaProfile"]
      : windowsGmsaProfileDeserializer(item["gmsaProfile"]),
  };
}

/** The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details. */
export enum KnownLicenseType {
  /** No additional licensing is applied. */
  None = "None",
  /** Enables Azure Hybrid User Benefits for Windows VMs. */
  WindowsServer = "Windows_Server",
}

/**
 * The license type to use for Windows VMs. See [Azure Hybrid User Benefits](https://azure.microsoft.com/pricing/hybrid-benefit/faq/) for more details. \
 * {@link KnownLicenseType} can be used interchangeably with LicenseType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No additional licensing is applied. \
 * **Windows_Server**: Enables Azure Hybrid User Benefits for Windows VMs.
 */
export type LicenseType = string;

/** Windows gMSA Profile in the managed cluster. */
export interface WindowsGmsaProfile {
  /** Whether to enable Windows gMSA. Specifies whether to enable Windows gMSA in the managed cluster. */
  enabled?: boolean;
  /** Specifies the DNS server for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. */
  dnsServer?: string;
  /** Specifies the root domain name for Windows gMSA. <br><br> Set it to empty if you have configured the DNS server in the vnet which is used to create the managed cluster. */
  rootDomainName?: string;
}

export function windowsGmsaProfileSerializer(item: WindowsGmsaProfile): any {
  return {
    enabled: item["enabled"],
    dnsServer: item["dnsServer"],
    rootDomainName: item["rootDomainName"],
  };
}

export function windowsGmsaProfileDeserializer(item: any): WindowsGmsaProfile {
  return {
    enabled: item["enabled"],
    dnsServer: item["dnsServer"],
    rootDomainName: item["rootDomainName"],
  };
}

/** Information about a service principal identity for the cluster to use for manipulating Azure APIs. */
export interface ManagedClusterServicePrincipalProfile {
  /** The ID for the service principal. */
  clientId: string;
  /** The secret password associated with the service principal in plain text. */
  secret?: string;
}

export function managedClusterServicePrincipalProfileSerializer(
  item: ManagedClusterServicePrincipalProfile,
): any {
  return { clientId: item["clientId"], secret: item["secret"] };
}

export function managedClusterServicePrincipalProfileDeserializer(
  item: any,
): ManagedClusterServicePrincipalProfile {
  return {
    clientId: item["clientId"],
    secret: item["secret"],
  };
}

export function managedClusterAddonProfileRecordSerializer(
  item: Record<string, ManagedClusterAddonProfile>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : managedClusterAddonProfileSerializer(item[key]);
  });
  return result;
}

export function managedClusterAddonProfileRecordDeserializer(
  item: Record<string, any>,
): Record<string, ManagedClusterAddonProfile> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : managedClusterAddonProfileDeserializer(item[key]);
  });
  return result;
}

/** A Kubernetes add-on profile for a managed cluster. */
export interface ManagedClusterAddonProfile {
  /** Whether the add-on is enabled or not. */
  enabled: boolean;
  /** Key-value pairs for configuring an add-on. */
  config?: Record<string, string>;
  /** Information of user assigned identity used by this add-on. */
  readonly identity?: ManagedClusterAddonProfileIdentity;
}

export function managedClusterAddonProfileSerializer(item: ManagedClusterAddonProfile): any {
  return { enabled: item["enabled"], config: item["config"] };
}

export function managedClusterAddonProfileDeserializer(item: any): ManagedClusterAddonProfile {
  return {
    enabled: item["enabled"],
    config: !item["config"]
      ? item["config"]
      : Object.fromEntries(Object.entries(item["config"]).map(([k, p]: [string, any]) => [k, p])),
    identity: !item["identity"]
      ? item["identity"]
      : managedClusterAddonProfileIdentityDeserializer(item["identity"]),
  };
}

/** Information of user assigned identity used by this add-on. */
export interface ManagedClusterAddonProfileIdentity extends UserAssignedIdentity {}

export function managedClusterAddonProfileIdentityDeserializer(
  item: any,
): ManagedClusterAddonProfileIdentity {
  return {
    resourceId: item["resourceId"],
    clientId: item["clientId"],
    objectId: item["objectId"],
  };
}

/** The pod identity profile of the Managed Cluster. See [use AAD pod identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity) for more details on pod identity integration. */
export interface ManagedClusterPodIdentityProfile {
  /** Whether the pod identity addon is enabled. */
  enabled?: boolean;
  /** Whether pod identity is allowed to run on clusters with Kubenet networking. Running in Kubenet is disabled by default due to the security related nature of AAD Pod Identity and the risks of IP spoofing. See [using Kubenet network plugin with AAD Pod Identity](https://docs.microsoft.com/azure/aks/use-azure-ad-pod-identity#using-kubenet-network-plugin-with-azure-active-directory-pod-managed-identities) for more information. */
  allowNetworkPluginKubenet?: boolean;
  /** The pod identities to use in the cluster. */
  userAssignedIdentities?: ManagedClusterPodIdentity[];
  /** The pod identity exceptions to allow. */
  userAssignedIdentityExceptions?: ManagedClusterPodIdentityException[];
}

export function managedClusterPodIdentityProfileSerializer(
  item: ManagedClusterPodIdentityProfile,
): any {
  return {
    enabled: item["enabled"],
    allowNetworkPluginKubenet: item["allowNetworkPluginKubenet"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : managedClusterPodIdentityArraySerializer(item["userAssignedIdentities"]),
    userAssignedIdentityExceptions: !item["userAssignedIdentityExceptions"]
      ? item["userAssignedIdentityExceptions"]
      : managedClusterPodIdentityExceptionArraySerializer(item["userAssignedIdentityExceptions"]),
  };
}

export function managedClusterPodIdentityProfileDeserializer(
  item: any,
): ManagedClusterPodIdentityProfile {
  return {
    enabled: item["enabled"],
    allowNetworkPluginKubenet: item["allowNetworkPluginKubenet"],
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : managedClusterPodIdentityArrayDeserializer(item["userAssignedIdentities"]),
    userAssignedIdentityExceptions: !item["userAssignedIdentityExceptions"]
      ? item["userAssignedIdentityExceptions"]
      : managedClusterPodIdentityExceptionArrayDeserializer(item["userAssignedIdentityExceptions"]),
  };
}

export function managedClusterPodIdentityArraySerializer(
  result: Array<ManagedClusterPodIdentity>,
): any[] {
  return result.map((item) => {
    return managedClusterPodIdentitySerializer(item);
  });
}

export function managedClusterPodIdentityArrayDeserializer(
  result: Array<ManagedClusterPodIdentity>,
): any[] {
  return result.map((item) => {
    return managedClusterPodIdentityDeserializer(item);
  });
}

/** Details about the pod identity assigned to the Managed Cluster. */
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
  readonly provisioningState?: ManagedClusterPodIdentityProvisioningState;
  readonly provisioningInfo?: ManagedClusterPodIdentityProvisioningInfo;
}

export function managedClusterPodIdentitySerializer(item: ManagedClusterPodIdentity): any {
  return {
    name: item["name"],
    namespace: item["namespace"],
    bindingSelector: item["bindingSelector"],
    identity: userAssignedIdentitySerializer(item["identity"]),
  };
}

export function managedClusterPodIdentityDeserializer(item: any): ManagedClusterPodIdentity {
  return {
    name: item["name"],
    namespace: item["namespace"],
    bindingSelector: item["bindingSelector"],
    identity: userAssignedIdentityDeserializer(item["identity"]),
    provisioningState: item["provisioningState"],
    provisioningInfo: !item["provisioningInfo"]
      ? item["provisioningInfo"]
      : managedClusterPodIdentityProvisioningInfoDeserializer(item["provisioningInfo"]),
  };
}

/** Details about a user assigned identity. */
export interface UserAssignedIdentity {
  /** The resource ID of the user assigned identity. */
  resourceId?: string;
  /** The client ID of the user assigned identity. */
  clientId?: string;
  /** The object ID of the user assigned identity. */
  objectId?: string;
}

export function userAssignedIdentitySerializer(item: UserAssignedIdentity): any {
  return { resourceId: item["resourceId"], clientId: item["clientId"], objectId: item["objectId"] };
}

export function userAssignedIdentityDeserializer(item: any): UserAssignedIdentity {
  return {
    resourceId: item["resourceId"],
    clientId: item["clientId"],
    objectId: item["objectId"],
  };
}

/** The current provisioning state of the pod identity. */
export enum KnownManagedClusterPodIdentityProvisioningState {
  /** Assigned */
  Assigned = "Assigned",
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
}

/**
 * The current provisioning state of the pod identity. \
 * {@link KnownManagedClusterPodIdentityProvisioningState} can be used interchangeably with ManagedClusterPodIdentityProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assigned** \
 * **Canceled** \
 * **Deleting** \
 * **Failed** \
 * **Succeeded** \
 * **Updating**
 */
export type ManagedClusterPodIdentityProvisioningState = string;

/** model interface ManagedClusterPodIdentityProvisioningInfo */
export interface ManagedClusterPodIdentityProvisioningInfo {
  /** Pod identity assignment error (if any). */
  error?: ManagedClusterPodIdentityProvisioningError;
}

export function managedClusterPodIdentityProvisioningInfoDeserializer(
  item: any,
): ManagedClusterPodIdentityProvisioningInfo {
  return {
    error: !item["error"]
      ? item["error"]
      : managedClusterPodIdentityProvisioningErrorDeserializer(item["error"]),
  };
}

/** An error response from the pod identity provisioning. */
export interface ManagedClusterPodIdentityProvisioningError {
  /** Details about the error. */
  error?: ManagedClusterPodIdentityProvisioningErrorBody;
}

export function managedClusterPodIdentityProvisioningErrorDeserializer(
  item: any,
): ManagedClusterPodIdentityProvisioningError {
  return {
    error: !item["error"]
      ? item["error"]
      : managedClusterPodIdentityProvisioningErrorBodyDeserializer(item["error"]),
  };
}

/** An error response from the pod identity provisioning. */
export interface ManagedClusterPodIdentityProvisioningErrorBody {
  /** An identifier for the error. Codes are invariant and are intended to be consumed programmatically. */
  code?: string;
  /** A message describing the error, intended to be suitable for display in a user interface. */
  message?: string;
  /** The target of the particular error. For example, the name of the property in error. */
  target?: string;
  /** A list of additional details about the error. */
  details?: ManagedClusterPodIdentityProvisioningErrorBody[];
}

export function managedClusterPodIdentityProvisioningErrorBodyDeserializer(
  item: any,
): ManagedClusterPodIdentityProvisioningErrorBody {
  return {
    code: item["code"],
    message: item["message"],
    target: item["target"],
    details: !item["details"]
      ? item["details"]
      : managedClusterPodIdentityProvisioningErrorBodyArrayDeserializer(item["details"]),
  };
}

export function managedClusterPodIdentityProvisioningErrorBodyArrayDeserializer(
  result: Array<ManagedClusterPodIdentityProvisioningErrorBody>,
): any[] {
  return result.map((item) => {
    return managedClusterPodIdentityProvisioningErrorBodyDeserializer(item);
  });
}

export function managedClusterPodIdentityExceptionArraySerializer(
  result: Array<ManagedClusterPodIdentityException>,
): any[] {
  return result.map((item) => {
    return managedClusterPodIdentityExceptionSerializer(item);
  });
}

export function managedClusterPodIdentityExceptionArrayDeserializer(
  result: Array<ManagedClusterPodIdentityException>,
): any[] {
  return result.map((item) => {
    return managedClusterPodIdentityExceptionDeserializer(item);
  });
}

/** A pod identity exception, which allows pods with certain labels to access the Azure Instance Metadata Service (IMDS) endpoint without being intercepted by the node-managed identity (NMI) server. See [disable AAD Pod Identity for a specific Pod/Application](https://azure.github.io/aad-pod-identity/docs/configure/application_exception/) for more details. */
export interface ManagedClusterPodIdentityException {
  /** The name of the pod identity exception. */
  name: string;
  /** The namespace of the pod identity exception. */
  namespace: string;
  /** The pod labels to match. */
  podLabels: Record<string, string>;
}

export function managedClusterPodIdentityExceptionSerializer(
  item: ManagedClusterPodIdentityException,
): any {
  return { name: item["name"], namespace: item["namespace"], podLabels: item["podLabels"] };
}

export function managedClusterPodIdentityExceptionDeserializer(
  item: any,
): ManagedClusterPodIdentityException {
  return {
    name: item["name"],
    namespace: item["namespace"],
    podLabels: Object.fromEntries(
      Object.entries(item["podLabels"]).map(([k, p]: [string, any]) => [k, p]),
    ),
  };
}

/** The OIDC issuer profile of the Managed Cluster. */
export interface ManagedClusterOidcIssuerProfile {
  /** The OIDC issuer url of the Managed Cluster. */
  readonly issuerURL?: string;
  /** Whether the OIDC issuer is enabled. */
  enabled?: boolean;
}

export function managedClusterOidcIssuerProfileSerializer(
  item: ManagedClusterOidcIssuerProfile,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterOidcIssuerProfileDeserializer(
  item: any,
): ManagedClusterOidcIssuerProfile {
  return {
    issuerURL: item["issuerURL"],
    enabled: item["enabled"],
  };
}

/** Node resource group lockdown profile for a managed cluster. */
export interface ManagedClusterNodeResourceGroupProfile {
  /** The restriction level applied to the cluster's node resource group. If not specified, the default is 'Unrestricted' */
  restrictionLevel?: RestrictionLevel;
}

export function managedClusterNodeResourceGroupProfileSerializer(
  item: ManagedClusterNodeResourceGroupProfile,
): any {
  return { restrictionLevel: item["restrictionLevel"] };
}

export function managedClusterNodeResourceGroupProfileDeserializer(
  item: any,
): ManagedClusterNodeResourceGroupProfile {
  return {
    restrictionLevel: item["restrictionLevel"],
  };
}

/** The restriction level applied to the cluster's node resource group. If not specified, the default is 'Unrestricted' */
export enum KnownRestrictionLevel {
  /** All RBAC permissions are allowed on the managed node resource group */
  Unrestricted = "Unrestricted",
  /** Only \*\/read RBAC permissions allowed on the managed node resource group */
  ReadOnly = "ReadOnly",
}

/**
 * The restriction level applied to the cluster's node resource group. If not specified, the default is 'Unrestricted' \
 * {@link KnownRestrictionLevel} can be used interchangeably with RestrictionLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Unrestricted**: All RBAC permissions are allowed on the managed node resource group \
 * **ReadOnly**: Only \*\/read RBAC permissions allowed on the managed node resource group
 */
export type RestrictionLevel = string;

/** Different support tiers for AKS managed clusters */
export enum KnownKubernetesSupportPlan {
  /** Support for the version is the same as for the open source Kubernetes offering. Official Kubernetes open source community support versions for 1 year after release. */
  KubernetesOfficial = "KubernetesOfficial",
  /** Support for the version extended past the KubernetesOfficial support of 1 year. AKS continues to patch CVEs for another 1 year, for a total of 2 years of support. */
  AKSLongTermSupport = "AKSLongTermSupport",
}

/**
 * Different support tiers for AKS managed clusters \
 * {@link KnownKubernetesSupportPlan} can be used interchangeably with KubernetesSupportPlan,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **KubernetesOfficial**: Support for the version is the same as for the open source Kubernetes offering. Official Kubernetes open source community support versions for 1 year after release. \
 * **AKSLongTermSupport**: Support for the version extended past the KubernetesOfficial support of 1 year. AKS continues to patch CVEs for another 1 year, for a total of 2 years of support.
 */
export type KubernetesSupportPlan = string;

/** Profile of network configuration. */
export interface ContainerServiceNetworkProfile {
  /** Network plugin used for building the Kubernetes network. */
  networkPlugin?: NetworkPlugin;
  /** The mode the network plugin should use. */
  networkPluginMode?: NetworkPluginMode;
  /** Network policy used for building the Kubernetes network. */
  networkPolicy?: NetworkPolicy;
  /** The network mode Azure CNI is configured with. This cannot be specified if networkPlugin is anything other than 'azure'. */
  networkMode?: NetworkMode;
  /** Network dataplane used in the Kubernetes cluster. */
  networkDataplane?: NetworkDataplane;
  /** Advanced Networking profile for enabling observability and security feature suite on a cluster. For more information see aka.ms/aksadvancednetworking. */
  advancedNetworking?: AdvancedNetworking;
  /** A CIDR notation IP range from which to assign pod IPs when kubenet is used. */
  podCidr?: string;
  /** A CIDR notation IP range from which to assign service cluster IPs. It must not overlap with any Subnet IP ranges. */
  serviceCidr?: string;
  /** An IP address assigned to the Kubernetes DNS service. It must be within the Kubernetes service address range specified in serviceCidr. */
  dnsServiceIP?: string;
  /** The outbound (egress) routing method. This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype). */
  outboundType?: OutboundType;
  /** The load balancer sku for the managed cluster. The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs. */
  loadBalancerSku?: LoadBalancerSku;
  /** Profile of the cluster load balancer. */
  loadBalancerProfile?: ManagedClusterLoadBalancerProfile;
  /** Profile of the cluster NAT gateway. */
  natGatewayProfile?: ManagedClusterNATGatewayProfile;
  /** The profile for Static Egress Gateway addon. For more details about Static Egress Gateway, see https://aka.ms/aks/static-egress-gateway. */
  staticEgressGatewayProfile?: ManagedClusterStaticEgressGatewayProfile;
  /** The CIDR notation IP ranges from which to assign pod IPs. One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. */
  podCidrs?: string[];
  /** The CIDR notation IP ranges from which to assign service cluster IPs. One IPv4 CIDR is expected for single-stack networking. Two CIDRs, one for each IP family (IPv4/IPv6), is expected for dual-stack networking. They must not overlap with any Subnet IP ranges. */
  serviceCidrs?: string[];
  /** The IP families used to specify IP versions available to the cluster. IP families are used to determine single-stack or dual-stack clusters. For single-stack, the expected value is IPv4. For dual-stack, the expected values are IPv4 and IPv6. */
  ipFamilies?: IpFamily[];
  /** Defines access to special link local addresses (Azure Instance Metadata Service, aka IMDS) for pods with hostNetwork=false. if not specified, the default is 'IMDS'. */
  podLinkLocalAccess?: PodLinkLocalAccess;
  /** Holds configuration customizations for kube-proxy. Any values not defined will use the kube-proxy defaulting behavior. See https://v<version>.docs.kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/ where <version> is represented by a <major version>-<minor version> string. Kubernetes version 1.23 would be '1-23'. */
  kubeProxyConfig?: ContainerServiceNetworkProfileKubeProxyConfig;
}

export function containerServiceNetworkProfileSerializer(
  item: ContainerServiceNetworkProfile,
): any {
  return {
    networkPlugin: item["networkPlugin"],
    networkPluginMode: item["networkPluginMode"],
    networkPolicy: item["networkPolicy"],
    networkMode: item["networkMode"],
    networkDataplane: item["networkDataplane"],
    advancedNetworking: !item["advancedNetworking"]
      ? item["advancedNetworking"]
      : advancedNetworkingSerializer(item["advancedNetworking"]),
    podCidr: item["podCidr"],
    serviceCidr: item["serviceCidr"],
    dnsServiceIP: item["dnsServiceIP"],
    outboundType: item["outboundType"],
    loadBalancerSku: item["loadBalancerSku"],
    loadBalancerProfile: !item["loadBalancerProfile"]
      ? item["loadBalancerProfile"]
      : managedClusterLoadBalancerProfileSerializer(item["loadBalancerProfile"]),
    natGatewayProfile: !item["natGatewayProfile"]
      ? item["natGatewayProfile"]
      : managedClusterNATGatewayProfileSerializer(item["natGatewayProfile"]),
    staticEgressGatewayProfile: !item["staticEgressGatewayProfile"]
      ? item["staticEgressGatewayProfile"]
      : managedClusterStaticEgressGatewayProfileSerializer(item["staticEgressGatewayProfile"]),
    podCidrs: !item["podCidrs"]
      ? item["podCidrs"]
      : item["podCidrs"].map((p: any) => {
          return p;
        }),
    serviceCidrs: !item["serviceCidrs"]
      ? item["serviceCidrs"]
      : item["serviceCidrs"].map((p: any) => {
          return p;
        }),
    ipFamilies: !item["ipFamilies"]
      ? item["ipFamilies"]
      : item["ipFamilies"].map((p: any) => {
          return p;
        }),
    podLinkLocalAccess: item["podLinkLocalAccess"],
    kubeProxyConfig: !item["kubeProxyConfig"]
      ? item["kubeProxyConfig"]
      : containerServiceNetworkProfileKubeProxyConfigSerializer(item["kubeProxyConfig"]),
  };
}

export function containerServiceNetworkProfileDeserializer(
  item: any,
): ContainerServiceNetworkProfile {
  return {
    networkPlugin: item["networkPlugin"],
    networkPluginMode: item["networkPluginMode"],
    networkPolicy: item["networkPolicy"],
    networkMode: item["networkMode"],
    networkDataplane: item["networkDataplane"],
    advancedNetworking: !item["advancedNetworking"]
      ? item["advancedNetworking"]
      : advancedNetworkingDeserializer(item["advancedNetworking"]),
    podCidr: item["podCidr"],
    serviceCidr: item["serviceCidr"],
    dnsServiceIP: item["dnsServiceIP"],
    outboundType: item["outboundType"],
    loadBalancerSku: item["loadBalancerSku"],
    loadBalancerProfile: !item["loadBalancerProfile"]
      ? item["loadBalancerProfile"]
      : managedClusterLoadBalancerProfileDeserializer(item["loadBalancerProfile"]),
    natGatewayProfile: !item["natGatewayProfile"]
      ? item["natGatewayProfile"]
      : managedClusterNATGatewayProfileDeserializer(item["natGatewayProfile"]),
    staticEgressGatewayProfile: !item["staticEgressGatewayProfile"]
      ? item["staticEgressGatewayProfile"]
      : managedClusterStaticEgressGatewayProfileDeserializer(item["staticEgressGatewayProfile"]),
    podCidrs: !item["podCidrs"]
      ? item["podCidrs"]
      : item["podCidrs"].map((p: any) => {
          return p;
        }),
    serviceCidrs: !item["serviceCidrs"]
      ? item["serviceCidrs"]
      : item["serviceCidrs"].map((p: any) => {
          return p;
        }),
    ipFamilies: !item["ipFamilies"]
      ? item["ipFamilies"]
      : item["ipFamilies"].map((p: any) => {
          return p;
        }),
    podLinkLocalAccess: item["podLinkLocalAccess"],
    kubeProxyConfig: !item["kubeProxyConfig"]
      ? item["kubeProxyConfig"]
      : containerServiceNetworkProfileKubeProxyConfigDeserializer(item["kubeProxyConfig"]),
  };
}

/** Network plugin used for building the Kubernetes network. */
export enum KnownNetworkPlugin {
  /** Use the Azure CNI network plugin. See [Azure CNI (advanced) networking](https://docs.microsoft.com/azure/aks/concepts-network#azure-cni-advanced-networking) for more information. */
  Azure = "azure",
  /** Use the Kubenet network plugin. See [Kubenet (basic) networking](https://docs.microsoft.com/azure/aks/concepts-network#kubenet-basic-networking) for more information. */
  Kubenet = "kubenet",
  /** No CNI plugin is pre-installed. See [BYO CNI](https://docs.microsoft.com/en-us/azure/aks/use-byo-cni) for more information. */
  None = "none",
}

/**
 * Network plugin used for building the Kubernetes network. \
 * {@link KnownNetworkPlugin} can be used interchangeably with NetworkPlugin,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azure**: Use the Azure CNI network plugin. See [Azure CNI (advanced) networking](https:\//docs.microsoft.com\/azure\/aks\/concepts-network#azure-cni-advanced-networking) for more information. \
 * **kubenet**: Use the Kubenet network plugin. See [Kubenet (basic) networking](https:\//docs.microsoft.com\/azure\/aks\/concepts-network#kubenet-basic-networking) for more information. \
 * **none**: No CNI plugin is pre-installed. See [BYO CNI](https:\//docs.microsoft.com\/en-us\/azure\/aks\/use-byo-cni) for more information.
 */
export type NetworkPlugin = string;

/** The mode the network plugin should use. */
export enum KnownNetworkPluginMode {
  /** Used with networkPlugin=azure, pods are given IPs from the PodCIDR address space but use Azure Routing Domains rather than Kubenet's method of route tables. For more information visit https://aka.ms/aks/azure-cni-overlay. */
  Overlay = "overlay",
}

/**
 * The mode the network plugin should use. \
 * {@link KnownNetworkPluginMode} can be used interchangeably with NetworkPluginMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **overlay**: Used with networkPlugin=azure, pods are given IPs from the PodCIDR address space but use Azure Routing Domains rather than Kubenet's method of route tables. For more information visit https:\//aka.ms\/aks\/azure-cni-overlay.
 */
export type NetworkPluginMode = string;

/** Network policy used for building the Kubernetes network. */
export enum KnownNetworkPolicy {
  /** Network policies will not be enforced. This is the default value when NetworkPolicy is not specified. */
  None = "none",
  /** Use Calico network policies. See [differences between Azure and Calico policies](https://docs.microsoft.com/azure/aks/use-network-policies#differences-between-azure-and-calico-policies-and-their-capabilities) for more information. */
  Calico = "calico",
  /** Use Azure network policies. See [differences between Azure and Calico policies](https://docs.microsoft.com/azure/aks/use-network-policies#differences-between-azure-and-calico-policies-and-their-capabilities) for more information. */
  Azure = "azure",
  /** Use Cilium to enforce network policies. This requires networkDataplane to be 'cilium'. */
  Cilium = "cilium",
}

/**
 * Network policy used for building the Kubernetes network. \
 * {@link KnownNetworkPolicy} can be used interchangeably with NetworkPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **none**: Network policies will not be enforced. This is the default value when NetworkPolicy is not specified. \
 * **calico**: Use Calico network policies. See [differences between Azure and Calico policies](https:\//docs.microsoft.com\/azure\/aks\/use-network-policies#differences-between-azure-and-calico-policies-and-their-capabilities) for more information. \
 * **azure**: Use Azure network policies. See [differences between Azure and Calico policies](https:\//docs.microsoft.com\/azure\/aks\/use-network-policies#differences-between-azure-and-calico-policies-and-their-capabilities) for more information. \
 * **cilium**: Use Cilium to enforce network policies. This requires networkDataplane to be 'cilium'.
 */
export type NetworkPolicy = string;

/** The network mode Azure CNI is configured with. This cannot be specified if networkPlugin is anything other than 'azure'. */
export enum KnownNetworkMode {
  /** No bridge is created. Intra-VM Pod to Pod communication is through IP routes created by Azure CNI. See [Transparent Mode](https://docs.microsoft.com/azure/aks/faq#transparent-mode) for more information. */
  Transparent = "transparent",
  /** This is no longer supported */
  Bridge = "bridge",
}

/**
 * The network mode Azure CNI is configured with. This cannot be specified if networkPlugin is anything other than 'azure'. \
 * {@link KnownNetworkMode} can be used interchangeably with NetworkMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **transparent**: No bridge is created. Intra-VM Pod to Pod communication is through IP routes created by Azure CNI. See [Transparent Mode](https:\//docs.microsoft.com\/azure\/aks\/faq#transparent-mode) for more information. \
 * **bridge**: This is no longer supported
 */
export type NetworkMode = string;

/** Network dataplane used in the Kubernetes cluster. */
export enum KnownNetworkDataplane {
  /** Use Azure network dataplane. */
  Azure = "azure",
  /** Use Cilium network dataplane. See [Azure CNI Powered by Cilium](https://learn.microsoft.com/azure/aks/azure-cni-powered-by-cilium) for more information. */
  Cilium = "cilium",
}

/**
 * Network dataplane used in the Kubernetes cluster. \
 * {@link KnownNetworkDataplane} can be used interchangeably with NetworkDataplane,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azure**: Use Azure network dataplane. \
 * **cilium**: Use Cilium network dataplane. See [Azure CNI Powered by Cilium](https:\//learn.microsoft.com\/azure\/aks\/azure-cni-powered-by-cilium) for more information.
 */
export type NetworkDataplane = string;

/** Advanced Networking profile for enabling observability and security feature suite on a cluster. For more information see aka.ms/aksadvancednetworking. */
export interface AdvancedNetworking {
  /** Indicates the enablement of Advanced Networking functionalities of observability and security on AKS clusters. When this is set to true, all observability and security features will be set to enabled unless explicitly disabled. If not specified, the default is false. */
  enabled?: boolean;
  /** Observability profile to enable advanced network metrics and flow logs with historical contexts. */
  observability?: AdvancedNetworkingObservability;
  /** Security profile to enable security features on cilium based cluster. */
  security?: AdvancedNetworkingSecurity;
  /** Profile to enable performance-enhancing features on clusters that use Azure CNI powered by Cilium. */
  performance?: AdvancedNetworkingPerformance;
}

export function advancedNetworkingSerializer(item: AdvancedNetworking): any {
  return {
    enabled: item["enabled"],
    observability: !item["observability"]
      ? item["observability"]
      : advancedNetworkingObservabilitySerializer(item["observability"]),
    security: !item["security"]
      ? item["security"]
      : advancedNetworkingSecuritySerializer(item["security"]),
    performance: !item["performance"]
      ? item["performance"]
      : advancedNetworkingPerformanceSerializer(item["performance"]),
  };
}

export function advancedNetworkingDeserializer(item: any): AdvancedNetworking {
  return {
    enabled: item["enabled"],
    observability: !item["observability"]
      ? item["observability"]
      : advancedNetworkingObservabilityDeserializer(item["observability"]),
    security: !item["security"]
      ? item["security"]
      : advancedNetworkingSecurityDeserializer(item["security"]),
    performance: !item["performance"]
      ? item["performance"]
      : advancedNetworkingPerformanceDeserializer(item["performance"]),
  };
}

/** Observability profile to enable advanced network metrics and flow logs with historical contexts. */
export interface AdvancedNetworkingObservability {
  /** Indicates the enablement of Advanced Networking observability functionalities on clusters. */
  enabled?: boolean;
}

export function advancedNetworkingObservabilitySerializer(
  item: AdvancedNetworkingObservability,
): any {
  return { enabled: item["enabled"] };
}

export function advancedNetworkingObservabilityDeserializer(
  item: any,
): AdvancedNetworkingObservability {
  return {
    enabled: item["enabled"],
  };
}

/** Security profile to enable security features on cilium based cluster. */
export interface AdvancedNetworkingSecurity {
  /** This feature allows user to configure network policy based on DNS (FQDN) names. It can be enabled only on cilium based clusters. If not specified, the default is false. */
  enabled?: boolean;
  /** Enable advanced network policies. This allows users to configure Layer 7 network policies (FQDN, HTTP, Kafka). Policies themselves must be configured via the Cilium Network Policy resources, see https://docs.cilium.io/en/latest/security/policy/index.html. This can be enabled only on cilium-based clusters. If not specified, the default value is FQDN if security.enabled is set to true. */
  advancedNetworkPolicies?: AdvancedNetworkPolicies;
  /** Encryption configuration for Cilium-based clusters. Once enabled all traffic between Cilium managed pods will be encrypted when it leaves the node boundary. */
  transitEncryption?: AdvancedNetworkingSecurityTransitEncryption;
}

export function advancedNetworkingSecuritySerializer(item: AdvancedNetworkingSecurity): any {
  return {
    enabled: item["enabled"],
    advancedNetworkPolicies: item["advancedNetworkPolicies"],
    transitEncryption: !item["transitEncryption"]
      ? item["transitEncryption"]
      : advancedNetworkingSecurityTransitEncryptionSerializer(item["transitEncryption"]),
  };
}

export function advancedNetworkingSecurityDeserializer(item: any): AdvancedNetworkingSecurity {
  return {
    enabled: item["enabled"],
    advancedNetworkPolicies: item["advancedNetworkPolicies"],
    transitEncryption: !item["transitEncryption"]
      ? item["transitEncryption"]
      : advancedNetworkingSecurityTransitEncryptionDeserializer(item["transitEncryption"]),
  };
}

/** Enable advanced network policies. This allows users to configure Layer 7 network policies (FQDN, HTTP, Kafka). Policies themselves must be configured via the Cilium Network Policy resources, see https://docs.cilium.io/en/latest/security/policy/index.html. This can be enabled only on cilium-based clusters. If not specified, the default value is FQDN if security.enabled is set to true. */
export enum KnownAdvancedNetworkPolicies {
  /** Enable Layer7 network policies (FQDN, HTTP/S, Kafka). This option is a superset of the FQDN option. */
  L7 = "L7",
  /** Enable FQDN based network policies */
  Fqdn = "FQDN",
  /** Disable Layer 7 network policies (FQDN, HTTP/S, Kafka) */
  None = "None",
}

/**
 * Enable advanced network policies. This allows users to configure Layer 7 network policies (FQDN, HTTP, Kafka). Policies themselves must be configured via the Cilium Network Policy resources, see https://docs.cilium.io/en/latest/security/policy/index.html. This can be enabled only on cilium-based clusters. If not specified, the default value is FQDN if security.enabled is set to true. \
 * {@link KnownAdvancedNetworkPolicies} can be used interchangeably with AdvancedNetworkPolicies,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **L7**: Enable Layer7 network policies (FQDN, HTTP\/S, Kafka). This option is a superset of the FQDN option. \
 * **FQDN**: Enable FQDN based network policies \
 * **None**: Disable Layer 7 network policies (FQDN, HTTP\/S, Kafka)
 */
export type AdvancedNetworkPolicies = string;

/** Encryption configuration for Cilium-based clusters. Once enabled all traffic between Cilium managed pods will be encrypted when it leaves the node boundary. */
export interface AdvancedNetworkingSecurityTransitEncryption {
  /** Configures pod-to-pod encryption. This can be enabled only on Cilium-based clusters. If not specified, the default value is None. */
  type?: TransitEncryptionType;
}

export function advancedNetworkingSecurityTransitEncryptionSerializer(
  item: AdvancedNetworkingSecurityTransitEncryption,
): any {
  return { type: item["type"] };
}

export function advancedNetworkingSecurityTransitEncryptionDeserializer(
  item: any,
): AdvancedNetworkingSecurityTransitEncryption {
  return {
    type: item["type"],
  };
}

/** Configures pod-to-pod encryption. This can be enabled only on Cilium-based clusters. If not specified, the default value is None. */
export enum KnownTransitEncryptionType {
  /** Enable WireGuard encryption. Refer to https://docs.cilium.io/en/latest/security/network/encryption-wireguard/ on use cases and implementation details */
  WireGuard = "WireGuard",
  /** Disable Transit encryption */
  None = "None",
}

/**
 * Configures pod-to-pod encryption. This can be enabled only on Cilium-based clusters. If not specified, the default value is None. \
 * {@link KnownTransitEncryptionType} can be used interchangeably with TransitEncryptionType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **WireGuard**: Enable WireGuard encryption. Refer to https:\//docs.cilium.io\/en\/latest\/security\/network\/encryption-wireguard\/ on use cases and implementation details \
 * **None**: Disable Transit encryption
 */
export type TransitEncryptionType = string;

/** Profile to enable performance-enhancing features on clusters that use Azure CNI powered by Cilium. */
export interface AdvancedNetworkingPerformance {
  /** Enable advanced network acceleration options. This allows users to configure acceleration using BPF host routing. This can be enabled only with Cilium dataplane. If not specified, the default value is None (no acceleration). The acceleration mode can be changed on a pre-existing cluster. See https://aka.ms/acnsperformance for a detailed explanation */
  accelerationMode?: AccelerationMode;
}

export function advancedNetworkingPerformanceSerializer(item: AdvancedNetworkingPerformance): any {
  return { accelerationMode: item["accelerationMode"] };
}

export function advancedNetworkingPerformanceDeserializer(
  item: any,
): AdvancedNetworkingPerformance {
  return {
    accelerationMode: item["accelerationMode"],
  };
}

/** Enable advanced network acceleration options. This allows users to configure acceleration using BPF host routing. This can be enabled only with Cilium dataplane. If not specified, the default value is None (no acceleration). The acceleration mode can be changed on a pre-existing cluster. See https://aka.ms/acnsperformance for a detailed explanation */
export enum KnownAccelerationMode {
  /** Enable eBPF host routing with veth device mode. */
  BpfVeth = "BpfVeth",
  /** Disable acceleration options. */
  None = "None",
}

/**
 * Enable advanced network acceleration options. This allows users to configure acceleration using BPF host routing. This can be enabled only with Cilium dataplane. If not specified, the default value is None (no acceleration). The acceleration mode can be changed on a pre-existing cluster. See https://aka.ms/acnsperformance for a detailed explanation \
 * {@link KnownAccelerationMode} can be used interchangeably with AccelerationMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **BpfVeth**: Enable eBPF host routing with veth device mode. \
 * **None**: Disable acceleration options.
 */
export type AccelerationMode = string;

/** The outbound (egress) routing method. This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype). */
export enum KnownOutboundType {
  /** The load balancer is used for egress through an AKS assigned public IP. This supports Kubernetes services of type 'loadBalancer'. For more information see [outbound type loadbalancer](https://docs.microsoft.com/azure/aks/egress-outboundtype#outbound-type-of-loadbalancer). */
  LoadBalancer = "loadBalancer",
  /** Egress paths must be defined by the user. This is an advanced scenario and requires proper network configuration. For more information see [outbound type userDefinedRouting](https://docs.microsoft.com/azure/aks/egress-outboundtype#outbound-type-of-userdefinedrouting). */
  UserDefinedRouting = "userDefinedRouting",
  /** The AKS-managed NAT gateway is used for egress. */
  ManagedNATGateway = "managedNATGateway",
  /** The user-assigned NAT gateway associated to the cluster subnet is used for egress. This is an advanced scenario and requires proper network configuration. */
  UserAssignedNATGateway = "userAssignedNATGateway",
  /** The AKS cluster is not set with any outbound-type. All AKS nodes follows Azure VM default outbound behavior. Please refer to https://azure.microsoft.com/en-us/updates/default-outbound-access-for-vms-in-azure-will-be-retired-transition-to-a-new-method-of-internet-access/ */
  None = "none",
}

/**
 * The outbound (egress) routing method. This can only be set at cluster creation time and cannot be changed later. For more information see [egress outbound type](https://docs.microsoft.com/azure/aks/egress-outboundtype). \
 * {@link KnownOutboundType} can be used interchangeably with OutboundType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **loadBalancer**: The load balancer is used for egress through an AKS assigned public IP. This supports Kubernetes services of type 'loadBalancer'. For more information see [outbound type loadbalancer](https:\//docs.microsoft.com\/azure\/aks\/egress-outboundtype#outbound-type-of-loadbalancer). \
 * **userDefinedRouting**: Egress paths must be defined by the user. This is an advanced scenario and requires proper network configuration. For more information see [outbound type userDefinedRouting](https:\//docs.microsoft.com\/azure\/aks\/egress-outboundtype#outbound-type-of-userdefinedrouting). \
 * **managedNATGateway**: The AKS-managed NAT gateway is used for egress. \
 * **userAssignedNATGateway**: The user-assigned NAT gateway associated to the cluster subnet is used for egress. This is an advanced scenario and requires proper network configuration. \
 * **none**: The AKS cluster is not set with any outbound-type. All AKS nodes follows Azure VM default outbound behavior. Please refer to https:\//azure.microsoft.com\/en-us\/updates\/default-outbound-access-for-vms-in-azure-will-be-retired-transition-to-a-new-method-of-internet-access\/
 */
export type OutboundType = string;

/** The load balancer sku for the managed cluster. The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs. */
export enum KnownLoadBalancerSku {
  /** Use a a standard Load Balancer. This is the recommended Load Balancer SKU. For more information about on working with the load balancer in the managed cluster, see the [standard Load Balancer](https://docs.microsoft.com/azure/aks/load-balancer-standard) article. */
  Standard = "standard",
  /** Use a basic Load Balancer with limited functionality. */
  Basic = "basic",
}

/**
 * The load balancer sku for the managed cluster. The default is 'standard'. See [Azure Load Balancer SKUs](https://docs.microsoft.com/azure/load-balancer/skus) for more information about the differences between load balancer SKUs. \
 * {@link KnownLoadBalancerSku} can be used interchangeably with LoadBalancerSku,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **standard**: Use a a standard Load Balancer. This is the recommended Load Balancer SKU. For more information about on working with the load balancer in the managed cluster, see the [standard Load Balancer](https:\//docs.microsoft.com\/azure\/aks\/load-balancer-standard) article. \
 * **basic**: Use a basic Load Balancer with limited functionality.
 */
export type LoadBalancerSku = string;

/** Profile of the managed cluster load balancer. */
export interface ManagedClusterLoadBalancerProfile {
  /** Desired managed outbound IPs for the cluster load balancer. */
  managedOutboundIPs?: ManagedClusterLoadBalancerProfileManagedOutboundIPs;
  /** Desired outbound IP Prefix resources for the cluster load balancer. */
  outboundIPPrefixes?: ManagedClusterLoadBalancerProfileOutboundIPPrefixes;
  /** Desired outbound IP resources for the cluster load balancer. */
  outboundIPs?: ManagedClusterLoadBalancerProfileOutboundIPs;
  /** The effective outbound IP resources of the cluster load balancer. */
  readonly effectiveOutboundIPs?: ResourceReference[];
  /** The desired number of allocated SNAT ports per VM. Allowed values are in the range of 0 to 64000 (inclusive). The default value is 0 which results in Azure dynamically allocating ports. */
  allocatedOutboundPorts?: number;
  /** Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 30 minutes. */
  idleTimeoutInMinutes?: number;
  /** Enable multiple standard load balancers per AKS cluster or not. */
  enableMultipleStandardLoadBalancers?: boolean;
  /** The type of the managed inbound Load Balancer BackendPool. */
  backendPoolType?: BackendPoolType;
  /** The health probing behavior for External Traffic Policy Cluster services. */
  clusterServiceLoadBalancerHealthProbeMode?: ClusterServiceLoadBalancerHealthProbeMode;
}

export function managedClusterLoadBalancerProfileSerializer(
  item: ManagedClusterLoadBalancerProfile,
): any {
  return {
    managedOutboundIPs: !item["managedOutboundIPs"]
      ? item["managedOutboundIPs"]
      : managedClusterLoadBalancerProfileManagedOutboundIPsSerializer(item["managedOutboundIPs"]),
    outboundIPPrefixes: !item["outboundIPPrefixes"]
      ? item["outboundIPPrefixes"]
      : managedClusterLoadBalancerProfileOutboundIPPrefixesSerializer(item["outboundIPPrefixes"]),
    outboundIPs: !item["outboundIPs"]
      ? item["outboundIPs"]
      : managedClusterLoadBalancerProfileOutboundIPsSerializer(item["outboundIPs"]),
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableMultipleStandardLoadBalancers: item["enableMultipleStandardLoadBalancers"],
    backendPoolType: item["backendPoolType"],
    clusterServiceLoadBalancerHealthProbeMode: item["clusterServiceLoadBalancerHealthProbeMode"],
  };
}

export function managedClusterLoadBalancerProfileDeserializer(
  item: any,
): ManagedClusterLoadBalancerProfile {
  return {
    managedOutboundIPs: !item["managedOutboundIPs"]
      ? item["managedOutboundIPs"]
      : managedClusterLoadBalancerProfileManagedOutboundIPsDeserializer(item["managedOutboundIPs"]),
    outboundIPPrefixes: !item["outboundIPPrefixes"]
      ? item["outboundIPPrefixes"]
      : managedClusterLoadBalancerProfileOutboundIPPrefixesDeserializer(item["outboundIPPrefixes"]),
    outboundIPs: !item["outboundIPs"]
      ? item["outboundIPs"]
      : managedClusterLoadBalancerProfileOutboundIPsDeserializer(item["outboundIPs"]),
    effectiveOutboundIPs: !item["effectiveOutboundIPs"]
      ? item["effectiveOutboundIPs"]
      : resourceReferenceArrayDeserializer(item["effectiveOutboundIPs"]),
    allocatedOutboundPorts: item["allocatedOutboundPorts"],
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
    enableMultipleStandardLoadBalancers: item["enableMultipleStandardLoadBalancers"],
    backendPoolType: item["backendPoolType"],
    clusterServiceLoadBalancerHealthProbeMode: item["clusterServiceLoadBalancerHealthProbeMode"],
  };
}

/** Desired managed outbound IPs for the cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileManagedOutboundIPs {
  /** The desired number of IPv4 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 1. */
  count?: number;
  /** The desired number of IPv6 outbound IPs created/managed by Azure for the cluster load balancer. Allowed values must be in the range of 1 to 100 (inclusive). The default value is 0 for single-stack and 1 for dual-stack. */
  countIPv6?: number;
}

export function managedClusterLoadBalancerProfileManagedOutboundIPsSerializer(
  item: ManagedClusterLoadBalancerProfileManagedOutboundIPs,
): any {
  return { count: item["count"], countIPv6: item["countIPv6"] };
}

export function managedClusterLoadBalancerProfileManagedOutboundIPsDeserializer(
  item: any,
): ManagedClusterLoadBalancerProfileManagedOutboundIPs {
  return {
    count: item["count"],
    countIPv6: item["countIPv6"],
  };
}

/** Desired outbound IP Prefix resources for the cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileOutboundIPPrefixes {
  /** A list of public IP prefix resources. */
  publicIPPrefixes?: ResourceReference[];
}

export function managedClusterLoadBalancerProfileOutboundIPPrefixesSerializer(
  item: ManagedClusterLoadBalancerProfileOutboundIPPrefixes,
): any {
  return {
    publicIPPrefixes: !item["publicIPPrefixes"]
      ? item["publicIPPrefixes"]
      : resourceReferenceArraySerializer(item["publicIPPrefixes"]),
  };
}

export function managedClusterLoadBalancerProfileOutboundIPPrefixesDeserializer(
  item: any,
): ManagedClusterLoadBalancerProfileOutboundIPPrefixes {
  return {
    publicIPPrefixes: !item["publicIPPrefixes"]
      ? item["publicIPPrefixes"]
      : resourceReferenceArrayDeserializer(item["publicIPPrefixes"]),
  };
}

export function resourceReferenceArraySerializer(result: Array<ResourceReference>): any[] {
  return result.map((item) => {
    return resourceReferenceSerializer(item);
  });
}

export function resourceReferenceArrayDeserializer(result: Array<ResourceReference>): any[] {
  return result.map((item) => {
    return resourceReferenceDeserializer(item);
  });
}

/** A reference to an Azure resource. */
export interface ResourceReference {
  /** The fully qualified Azure resource id. */
  id?: string;
}

export function resourceReferenceSerializer(item: ResourceReference): any {
  return { id: item["id"] };
}

export function resourceReferenceDeserializer(item: any): ResourceReference {
  return {
    id: item["id"],
  };
}

/** Desired outbound IP resources for the cluster load balancer. */
export interface ManagedClusterLoadBalancerProfileOutboundIPs {
  /** A list of public IP resources. */
  publicIPs?: ResourceReference[];
}

export function managedClusterLoadBalancerProfileOutboundIPsSerializer(
  item: ManagedClusterLoadBalancerProfileOutboundIPs,
): any {
  return {
    publicIPs: !item["publicIPs"]
      ? item["publicIPs"]
      : resourceReferenceArraySerializer(item["publicIPs"]),
  };
}

export function managedClusterLoadBalancerProfileOutboundIPsDeserializer(
  item: any,
): ManagedClusterLoadBalancerProfileOutboundIPs {
  return {
    publicIPs: !item["publicIPs"]
      ? item["publicIPs"]
      : resourceReferenceArrayDeserializer(item["publicIPs"]),
  };
}

/** The type of the managed inbound Load Balancer BackendPool. */
export enum KnownBackendPoolType {
  /** The type of the managed inbound Load Balancer BackendPool. https://cloud-provider-azure.sigs.k8s.io/topics/loadbalancer/#configure-load-balancer-backend. */
  NodeIPConfiguration = "NodeIPConfiguration",
  /** The type of the managed inbound Load Balancer BackendPool. https://cloud-provider-azure.sigs.k8s.io/topics/loadbalancer/#configure-load-balancer-backend. */
  NodeIP = "NodeIP",
}

/**
 * The type of the managed inbound Load Balancer BackendPool. \
 * {@link KnownBackendPoolType} can be used interchangeably with BackendPoolType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NodeIPConfiguration**: The type of the managed inbound Load Balancer BackendPool. https:\//cloud-provider-azure.sigs.k8s.io\/topics\/loadbalancer\/#configure-load-balancer-backend. \
 * **NodeIP**: The type of the managed inbound Load Balancer BackendPool. https:\//cloud-provider-azure.sigs.k8s.io\/topics\/loadbalancer\/#configure-load-balancer-backend.
 */
export type BackendPoolType = string;

/** The health probing behavior for External Traffic Policy Cluster services. */
export enum KnownClusterServiceLoadBalancerHealthProbeMode {
  /** Each External Traffic Policy Cluster service will have its own health probe targeting service nodePort. */
  ServiceNodePort = "ServiceNodePort",
  /** All External Traffic Policy Cluster services in a Standard Load Balancer will have a dedicated health probe targeting the backend nodes' kube-proxy health check port 10256. */
  Shared = "Shared",
}

/**
 * The health probing behavior for External Traffic Policy Cluster services. \
 * {@link KnownClusterServiceLoadBalancerHealthProbeMode} can be used interchangeably with ClusterServiceLoadBalancerHealthProbeMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **ServiceNodePort**: Each External Traffic Policy Cluster service will have its own health probe targeting service nodePort. \
 * **Shared**: All External Traffic Policy Cluster services in a Standard Load Balancer will have a dedicated health probe targeting the backend nodes' kube-proxy health check port 10256.
 */
export type ClusterServiceLoadBalancerHealthProbeMode = string;

/** Profile of the managed cluster NAT gateway. */
export interface ManagedClusterNATGatewayProfile {
  /** Profile of the managed outbound IP resources of the cluster NAT gateway. */
  managedOutboundIPProfile?: ManagedClusterManagedOutboundIPProfile;
  /** The effective outbound IP resources of the cluster NAT gateway. */
  readonly effectiveOutboundIPs?: ResourceReference[];
  /** Desired outbound flow idle timeout in minutes. Allowed values are in the range of 4 to 120 (inclusive). The default value is 4 minutes. */
  idleTimeoutInMinutes?: number;
}

export function managedClusterNATGatewayProfileSerializer(
  item: ManagedClusterNATGatewayProfile,
): any {
  return {
    managedOutboundIPProfile: !item["managedOutboundIPProfile"]
      ? item["managedOutboundIPProfile"]
      : managedClusterManagedOutboundIPProfileSerializer(item["managedOutboundIPProfile"]),
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

export function managedClusterNATGatewayProfileDeserializer(
  item: any,
): ManagedClusterNATGatewayProfile {
  return {
    managedOutboundIPProfile: !item["managedOutboundIPProfile"]
      ? item["managedOutboundIPProfile"]
      : managedClusterManagedOutboundIPProfileDeserializer(item["managedOutboundIPProfile"]),
    effectiveOutboundIPs: !item["effectiveOutboundIPs"]
      ? item["effectiveOutboundIPs"]
      : resourceReferenceArrayDeserializer(item["effectiveOutboundIPs"]),
    idleTimeoutInMinutes: item["idleTimeoutInMinutes"],
  };
}

/** Profile of the managed outbound IP resources of the managed cluster. */
export interface ManagedClusterManagedOutboundIPProfile {
  /** The desired number of outbound IPs created/managed by Azure. Allowed values must be in the range of 1 to 16 (inclusive). The default value is 1. */
  count?: number;
}

export function managedClusterManagedOutboundIPProfileSerializer(
  item: ManagedClusterManagedOutboundIPProfile,
): any {
  return { count: item["count"] };
}

export function managedClusterManagedOutboundIPProfileDeserializer(
  item: any,
): ManagedClusterManagedOutboundIPProfile {
  return {
    count: item["count"],
  };
}

/** The Static Egress Gateway addon configuration for the cluster. */
export interface ManagedClusterStaticEgressGatewayProfile {
  /** Enable Static Egress Gateway addon. Indicates if Static Egress Gateway addon is enabled or not. */
  enabled?: boolean;
}

export function managedClusterStaticEgressGatewayProfileSerializer(
  item: ManagedClusterStaticEgressGatewayProfile,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterStaticEgressGatewayProfileDeserializer(
  item: any,
): ManagedClusterStaticEgressGatewayProfile {
  return {
    enabled: item["enabled"],
  };
}

/** To determine if address belongs IPv4 or IPv6 family */
export enum KnownIpFamily {
  /** IPv4 family */
  IPv4 = "IPv4",
  /** IPv6 family */
  IPv6 = "IPv6",
}

/**
 * To determine if address belongs IPv4 or IPv6 family \
 * {@link KnownIpFamily} can be used interchangeably with IpFamily,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPv4**: IPv4 family \
 * **IPv6**: IPv6 family
 */
export type IpFamily = string;

/** Defines access to special link local addresses (Azure Instance Metadata Service, aka IMDS) for pods with hostNetwork=false. If not specified, the default is 'IMDS'. */
export enum KnownPodLinkLocalAccess {
  /** Pods with hostNetwork=false can access Azure Instance Metadata Service (IMDS) without restriction. */
  Imds = "IMDS",
  /** Pods with hostNetwork=false cannot access Azure Instance Metadata Service (IMDS). */
  None = "None",
}

/**
 * Defines access to special link local addresses (Azure Instance Metadata Service, aka IMDS) for pods with hostNetwork=false. If not specified, the default is 'IMDS'. \
 * {@link KnownPodLinkLocalAccess} can be used interchangeably with PodLinkLocalAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IMDS**: Pods with hostNetwork=false can access Azure Instance Metadata Service (IMDS) without restriction. \
 * **None**: Pods with hostNetwork=false cannot access Azure Instance Metadata Service (IMDS).
 */
export type PodLinkLocalAccess = string;

/** Holds configuration customizations for kube-proxy. Any values not defined will use the kube-proxy defaulting behavior. See https://v<version>.docs.kubernetes.io/docs/reference/command-line-tools-reference/kube-proxy/ where <version> is represented by a <major version>-<minor version> string. Kubernetes version 1.23 would be '1-23'. */
export interface ContainerServiceNetworkProfileKubeProxyConfig {
  /** Whether to enable on kube-proxy on the cluster (if no 'kubeProxyConfig' exists, kube-proxy is enabled in AKS by default without these customizations). */
  enabled?: boolean;
  /** Specify which proxy mode to use ('IPTABLES', 'IPVS' or 'NFTABLES') */
  mode?: Mode;
  /** Holds configuration customizations for IPVS. May only be specified if 'mode' is set to 'IPVS'. */
  ipvsConfig?: ContainerServiceNetworkProfileKubeProxyConfigIpvsConfig;
}

export function containerServiceNetworkProfileKubeProxyConfigSerializer(
  item: ContainerServiceNetworkProfileKubeProxyConfig,
): any {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    ipvsConfig: !item["ipvsConfig"]
      ? item["ipvsConfig"]
      : containerServiceNetworkProfileKubeProxyConfigIpvsConfigSerializer(item["ipvsConfig"]),
  };
}

export function containerServiceNetworkProfileKubeProxyConfigDeserializer(
  item: any,
): ContainerServiceNetworkProfileKubeProxyConfig {
  return {
    enabled: item["enabled"],
    mode: item["mode"],
    ipvsConfig: !item["ipvsConfig"]
      ? item["ipvsConfig"]
      : containerServiceNetworkProfileKubeProxyConfigIpvsConfigDeserializer(item["ipvsConfig"]),
  };
}

/** Specify which proxy mode to use ('IPTABLES', 'IPVS' or 'NFTABLES') */
export enum KnownMode {
  /** IPTables proxy mode */
  Iptables = "IPTABLES",
  /** IPVS proxy mode. Must be using Kubernetes version >= 1.22. */
  Ipvs = "IPVS",
  /** NFTables proxy mode. Must be using Kubernetes version >= 1.33. */
  Nftables = "NFTABLES",
}

/**
 * Specify which proxy mode to use ('IPTABLES', 'IPVS' or 'NFTABLES') \
 * {@link KnownMode} can be used interchangeably with Mode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **IPTABLES**: IPTables proxy mode \
 * **IPVS**: IPVS proxy mode. Must be using Kubernetes version >= 1.22. \
 * **NFTABLES**: NFTables proxy mode. Must be using Kubernetes version >= 1.33.
 */
export type Mode = string;

/** Holds configuration customizations for IPVS. May only be specified if 'mode' is set to 'IPVS'. */
export interface ContainerServiceNetworkProfileKubeProxyConfigIpvsConfig {
  /** IPVS scheduler, for more information please see http://www.linuxvirtualserver.org/docs/scheduling.html. */
  scheduler?: IpvsScheduler;
  /** The timeout value used for idle IPVS TCP sessions in seconds. Must be a positive integer value. */
  tcpTimeoutSeconds?: number;
  /** The timeout value used for IPVS TCP sessions after receiving a FIN in seconds. Must be a positive integer value. */
  tcpFinTimeoutSeconds?: number;
  /** The timeout value used for IPVS UDP packets in seconds. Must be a positive integer value. */
  udpTimeoutSeconds?: number;
}

export function containerServiceNetworkProfileKubeProxyConfigIpvsConfigSerializer(
  item: ContainerServiceNetworkProfileKubeProxyConfigIpvsConfig,
): any {
  return {
    scheduler: item["scheduler"],
    tcpTimeoutSeconds: item["tcpTimeoutSeconds"],
    tcpFinTimeoutSeconds: item["tcpFinTimeoutSeconds"],
    udpTimeoutSeconds: item["udpTimeoutSeconds"],
  };
}

export function containerServiceNetworkProfileKubeProxyConfigIpvsConfigDeserializer(
  item: any,
): ContainerServiceNetworkProfileKubeProxyConfigIpvsConfig {
  return {
    scheduler: item["scheduler"],
    tcpTimeoutSeconds: item["tcpTimeoutSeconds"],
    tcpFinTimeoutSeconds: item["tcpFinTimeoutSeconds"],
    udpTimeoutSeconds: item["udpTimeoutSeconds"],
  };
}

/** IPVS scheduler, for more information please see http://www.linuxvirtualserver.org/docs/scheduling.html. */
export enum KnownIpvsScheduler {
  /** Round Robin */
  RoundRobin = "RoundRobin",
  /** Least Connection */
  LeastConnection = "LeastConnection",
}

/**
 * IPVS scheduler, for more information please see http://www.linuxvirtualserver.org/docs/scheduling.html. \
 * {@link KnownIpvsScheduler} can be used interchangeably with IpvsScheduler,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **RoundRobin**: Round Robin \
 * **LeastConnection**: Least Connection
 */
export type IpvsScheduler = string;

/** AADProfile specifies attributes for Azure Active Directory integration. For more details see [managed AAD on AKS](https://docs.microsoft.com/azure/aks/managed-aad). */
export interface ManagedClusterAADProfile {
  /** Whether to enable managed AAD. */
  managed?: boolean;
  /** Whether to enable Azure RBAC for Kubernetes authorization. */
  enableAzureRbac?: boolean;
  /** The list of AAD group object IDs that will have admin role of the cluster. */
  adminGroupObjectIDs?: string[];
  /** (DEPRECATED) The client AAD application ID. Learn more at https://aka.ms/aks/aad-legacy. */
  clientAppID?: string;
  /** (DEPRECATED) The server AAD application ID. Learn more at https://aka.ms/aks/aad-legacy. */
  serverAppID?: string;
  /** (DEPRECATED) The server AAD application secret. Learn more at https://aka.ms/aks/aad-legacy. */
  serverAppSecret?: string;
  /** The AAD tenant ID to use for authentication. If not specified, will use the tenant of the deployment subscription. */
  tenantID?: string;
}

export function managedClusterAADProfileSerializer(item: ManagedClusterAADProfile): any {
  return {
    managed: item["managed"],
    enableAzureRBAC: item["enableAzureRbac"],
    adminGroupObjectIDs: !item["adminGroupObjectIDs"]
      ? item["adminGroupObjectIDs"]
      : item["adminGroupObjectIDs"].map((p: any) => {
          return p;
        }),
    clientAppID: item["clientAppID"],
    serverAppID: item["serverAppID"],
    serverAppSecret: item["serverAppSecret"],
    tenantID: item["tenantID"],
  };
}

export function managedClusterAADProfileDeserializer(item: any): ManagedClusterAADProfile {
  return {
    managed: item["managed"],
    enableAzureRbac: item["enableAzureRBAC"],
    adminGroupObjectIDs: !item["adminGroupObjectIDs"]
      ? item["adminGroupObjectIDs"]
      : item["adminGroupObjectIDs"].map((p: any) => {
          return p;
        }),
    clientAppID: item["clientAppID"],
    serverAppID: item["serverAppID"],
    serverAppSecret: item["serverAppSecret"],
    tenantID: item["tenantID"],
  };
}

/** Auto upgrade profile for a managed cluster. */
export interface ManagedClusterAutoUpgradeProfile {
  /** The upgrade channel for auto upgrade. The default is 'none'. For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel). */
  upgradeChannel?: UpgradeChannel;
  /** Node OS Upgrade Channel. Manner in which the OS on your nodes is updated. The default is NodeImage. */
  nodeOSUpgradeChannel?: NodeOSUpgradeChannel;
}

export function managedClusterAutoUpgradeProfileSerializer(
  item: ManagedClusterAutoUpgradeProfile,
): any {
  return {
    upgradeChannel: item["upgradeChannel"],
    nodeOSUpgradeChannel: item["nodeOSUpgradeChannel"],
  };
}

export function managedClusterAutoUpgradeProfileDeserializer(
  item: any,
): ManagedClusterAutoUpgradeProfile {
  return {
    upgradeChannel: item["upgradeChannel"],
    nodeOSUpgradeChannel: item["nodeOSUpgradeChannel"],
  };
}

/** The upgrade channel for auto upgrade. The default is 'none'. For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel). */
export enum KnownUpgradeChannel {
  /** Automatically upgrade the cluster to the latest supported patch release on the latest supported minor version. In cases where the cluster is at a version of Kubernetes that is at an N-2 minor version where N is the latest supported minor version, the cluster first upgrades to the latest supported patch version on N-1 minor version. For example, if a cluster is running version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, your cluster first is upgraded to 1.18.6, then is upgraded to 1.19.1. */
  Rapid = "rapid",
  /** Automatically upgrade the cluster to the latest supported patch release on minor version N-1, where N is the latest supported minor version. For example, if a cluster is running version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, your cluster is upgraded to 1.18.6. */
  Stable = "stable",
  /** Automatically upgrade the cluster to the latest supported patch version when it becomes available while keeping the minor version the same. For example, if a cluster is running version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, your cluster is upgraded to 1.17.9. */
  Patch = "patch",
  /** Automatically upgrade the node image to the latest version available. Consider using nodeOSUpgradeChannel instead as that allows you to configure node OS patching separate from Kubernetes version patching */
  NodeImage = "node-image",
  /** Disables auto-upgrades and keeps the cluster at its current version of Kubernetes. */
  None = "none",
}

/**
 * The upgrade channel for auto upgrade. The default is 'none'. For more information see [setting the AKS cluster auto-upgrade channel](https://docs.microsoft.com/azure/aks/upgrade-cluster#set-auto-upgrade-channel). \
 * {@link KnownUpgradeChannel} can be used interchangeably with UpgradeChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **rapid**: Automatically upgrade the cluster to the latest supported patch release on the latest supported minor version. In cases where the cluster is at a version of Kubernetes that is at an N-2 minor version where N is the latest supported minor version, the cluster first upgrades to the latest supported patch version on N-1 minor version. For example, if a cluster is running version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, your cluster first is upgraded to 1.18.6, then is upgraded to 1.19.1. \
 * **stable**: Automatically upgrade the cluster to the latest supported patch release on minor version N-1, where N is the latest supported minor version. For example, if a cluster is running version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, your cluster is upgraded to 1.18.6. \
 * **patch**: Automatically upgrade the cluster to the latest supported patch version when it becomes available while keeping the minor version the same. For example, if a cluster is running version 1.17.7 and versions 1.17.9, 1.18.4, 1.18.6, and 1.19.1 are available, your cluster is upgraded to 1.17.9. \
 * **node-image**: Automatically upgrade the node image to the latest version available. Consider using nodeOSUpgradeChannel instead as that allows you to configure node OS patching separate from Kubernetes version patching \
 * **none**: Disables auto-upgrades and keeps the cluster at its current version of Kubernetes.
 */
export type UpgradeChannel = string;

/** Node OS Upgrade Channel. Manner in which the OS on your nodes is updated. The default is NodeImage. */
export enum KnownNodeOSUpgradeChannel {
  /** No attempt to update your machines OS will be made either by OS or by rolling VHDs. This means you are responsible for your security updates */
  None = "None",
  /** OS updates will be applied automatically through the OS built-in patching infrastructure. Newly scaled in machines will be unpatched initially and will be patched at some point by the OS's infrastructure. Behavior of this option depends on the OS in question. Ubuntu and Mariner apply security patches through unattended upgrade roughly once a day around 06:00 UTC. Windows does not apply security patches automatically and so for them this option is equivalent to None till further notice */
  Unmanaged = "Unmanaged",
  /** AKS will update the nodes with a newly patched VHD containing security fixes and bugfixes on a weekly cadence. With the VHD update machines will be rolling reimaged to that VHD following maintenance windows and surge settings. No extra VHD cost is incurred when choosing this option as AKS hosts the images. */
  NodeImage = "NodeImage",
  /** AKS downloads and updates the nodes with tested security updates. These updates honor the maintenance window settings and produce a new VHD that is used on new nodes. On some occasions it's not possible to apply the updates in place, in such cases the existing nodes will also be re-imaged to the newly produced VHD in order to apply the changes. This option incurs an extra cost of hosting the new Security Patch VHDs in your resource group for just in time consumption. */
  SecurityPatch = "SecurityPatch",
}

/**
 * Node OS Upgrade Channel. Manner in which the OS on your nodes is updated. The default is NodeImage. \
 * {@link KnownNodeOSUpgradeChannel} can be used interchangeably with NodeOSUpgradeChannel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No attempt to update your machines OS will be made either by OS or by rolling VHDs. This means you are responsible for your security updates \
 * **Unmanaged**: OS updates will be applied automatically through the OS built-in patching infrastructure. Newly scaled in machines will be unpatched initially and will be patched at some point by the OS's infrastructure. Behavior of this option depends on the OS in question. Ubuntu and Mariner apply security patches through unattended upgrade roughly once a day around 06:00 UTC. Windows does not apply security patches automatically and so for them this option is equivalent to None till further notice \
 * **NodeImage**: AKS will update the nodes with a newly patched VHD containing security fixes and bugfixes on a weekly cadence. With the VHD update machines will be rolling reimaged to that VHD following maintenance windows and surge settings. No extra VHD cost is incurred when choosing this option as AKS hosts the images. \
 * **SecurityPatch**: AKS downloads and updates the nodes with tested security updates. These updates honor the maintenance window settings and produce a new VHD that is used on new nodes. On some occasions it's not possible to apply the updates in place, in such cases the existing nodes will also be re-imaged to the newly produced VHD in order to apply the changes. This option incurs an extra cost of hosting the new Security Patch VHDs in your resource group for just in time consumption.
 */
export type NodeOSUpgradeChannel = string;

/** Settings for upgrading a cluster. */
export interface ClusterUpgradeSettings {
  /** Settings for overrides. */
  overrideSettings?: UpgradeOverrideSettings;
}

export function clusterUpgradeSettingsSerializer(item: ClusterUpgradeSettings): any {
  return {
    overrideSettings: !item["overrideSettings"]
      ? item["overrideSettings"]
      : upgradeOverrideSettingsSerializer(item["overrideSettings"]),
  };
}

export function clusterUpgradeSettingsDeserializer(item: any): ClusterUpgradeSettings {
  return {
    overrideSettings: !item["overrideSettings"]
      ? item["overrideSettings"]
      : upgradeOverrideSettingsDeserializer(item["overrideSettings"]),
  };
}

/** Settings for overrides when upgrading a cluster. */
export interface UpgradeOverrideSettings {
  /** Whether to force upgrade the cluster. Note that this option instructs upgrade operation to bypass upgrade protections such as checking for deprecated API usage. Enable this option only with caution. */
  forceUpgrade?: boolean;
  /** Until when the overrides are effective. Note that this only matches the start time of an upgrade, and the effectiveness won't change once an upgrade starts even if the `until` expires as upgrade proceeds. This field is not set by default. It must be set for the overrides to take effect. */
  until?: Date;
}

export function upgradeOverrideSettingsSerializer(item: UpgradeOverrideSettings): any {
  return {
    forceUpgrade: item["forceUpgrade"],
    until: !item["until"] ? item["until"] : item["until"].toISOString(),
  };
}

export function upgradeOverrideSettingsDeserializer(item: any): UpgradeOverrideSettings {
  return {
    forceUpgrade: item["forceUpgrade"],
    until: !item["until"] ? item["until"] : new Date(item["until"]),
  };
}

/** Parameters to be applied to the cluster-autoscaler when enabled */
export interface ManagedClusterPropertiesAutoScalerProfile {
  /** Detects similar node pools and balances the number of nodes between them. Valid values are 'true' and 'false' */
  balanceSimilarNodeGroups?: string;
  /** DaemonSet pods will be gracefully terminated from empty nodes. If set to true, all daemonset pods on empty nodes will be evicted before deletion of the node. If the daemonset pod cannot be evicted another node will be chosen for scaling. If set to false, the node will be deleted without ensuring that daemonset pods are deleted or evicted. */
  daemonsetEvictionForEmptyNodes?: boolean;
  /** DaemonSet pods will be gracefully terminated from non-empty nodes. If set to true, all daemonset pods on occupied nodes will be evicted before deletion of the node. If the daemonset pod cannot be evicted another node will be chosen for scaling. If set to false, the node will be deleted without ensuring that daemonset pods are deleted or evicted. */
  daemonsetEvictionForOccupiedNodes?: boolean;
  /** Should CA ignore DaemonSet pods when calculating resource utilization for scaling down. If set to true, the resources used by daemonset will be taken into account when making scaling down decisions. */
  ignoreDaemonsetsUtilization?: boolean;
  /** The expander to use when scaling up. If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information. */
  expander?: Expander;
  /** The maximum number of empty nodes that can be deleted at the same time. This must be a positive integer. The default is 10. */
  maxEmptyBulkDelete?: string;
  /** The maximum number of seconds the cluster autoscaler waits for pod termination when trying to scale down a node. The default is 600. */
  maxGracefulTerminationSec?: string;
  /** The maximum time the autoscaler waits for a node to be provisioned. The default is '15m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  maxNodeProvisionTime?: string;
  /** The maximum percentage of unready nodes in the cluster. After this percentage is exceeded, cluster autoscaler halts operations. The default is 45. The maximum is 100 and the minimum is 0. */
  maxTotalUnreadyPercentage?: string;
  /** Ignore unscheduled pods before they're a certain age. For scenarios like burst/batch scale where you don't want CA to act before the kubernetes scheduler could schedule all the pods, you can tell CA to ignore unscheduled pods before they're a certain age. The default is '0s'. Values must be an integer followed by a unit ('s' for seconds, 'm' for minutes, 'h' for hours, etc). */
  newPodScaleUpDelay?: string;
  /** The number of allowed unready nodes, irrespective of max-total-unready-percentage. This must be an integer. The default is 3. */
  okTotalUnreadyCount?: string;
  /** How often cluster is reevaluated for scale up or down. The default is '10'. Values must be an integer number of seconds. */
  scanInterval?: string;
  /** How long after scale up that scale down evaluation resumes. The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  scaleDownDelayAfterAdd?: string;
  /** How long after node deletion that scale down evaluation resumes. The default is the scan-interval. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  scaleDownDelayAfterDelete?: string;
  /** How long after scale down failure that scale down evaluation resumes. The default is '3m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  scaleDownDelayAfterFailure?: string;
  /** How long a node should be unneeded before it is eligible for scale down. The default is '10m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  scaleDownUnneededTime?: string;
  /** How long an unready node should be unneeded before it is eligible for scale down. The default is '20m'. Values must be an integer followed by an 'm'. No unit of time other than minutes (m) is supported. */
  scaleDownUnreadyTime?: string;
  /** Node utilization level, defined as sum of requested resources divided by capacity, below which a node can be considered for scale down. The default is '0.5'. */
  scaleDownUtilizationThreshold?: string;
  /** If cluster autoscaler will skip deleting nodes with pods with local storage, for example, EmptyDir or HostPath. The default is true. */
  skipNodesWithLocalStorage?: string;
  /** If cluster autoscaler will skip deleting nodes with pods from kube-system (except for DaemonSet or mirror pods). The default is true. */
  skipNodesWithSystemPods?: string;
}

export function managedClusterPropertiesAutoScalerProfileSerializer(
  item: ManagedClusterPropertiesAutoScalerProfile,
): any {
  return {
    "balance-similar-node-groups": item["balanceSimilarNodeGroups"],
    "daemonset-eviction-for-empty-nodes": item["daemonsetEvictionForEmptyNodes"],
    "daemonset-eviction-for-occupied-nodes": item["daemonsetEvictionForOccupiedNodes"],
    "ignore-daemonsets-utilization": item["ignoreDaemonsetsUtilization"],
    expander: item["expander"],
    "max-empty-bulk-delete": item["maxEmptyBulkDelete"],
    "max-graceful-termination-sec": item["maxGracefulTerminationSec"],
    "max-node-provision-time": item["maxNodeProvisionTime"],
    "max-total-unready-percentage": item["maxTotalUnreadyPercentage"],
    "new-pod-scale-up-delay": item["newPodScaleUpDelay"],
    "ok-total-unready-count": item["okTotalUnreadyCount"],
    "scan-interval": item["scanInterval"],
    "scale-down-delay-after-add": item["scaleDownDelayAfterAdd"],
    "scale-down-delay-after-delete": item["scaleDownDelayAfterDelete"],
    "scale-down-delay-after-failure": item["scaleDownDelayAfterFailure"],
    "scale-down-unneeded-time": item["scaleDownUnneededTime"],
    "scale-down-unready-time": item["scaleDownUnreadyTime"],
    "scale-down-utilization-threshold": item["scaleDownUtilizationThreshold"],
    "skip-nodes-with-local-storage": item["skipNodesWithLocalStorage"],
    "skip-nodes-with-system-pods": item["skipNodesWithSystemPods"],
  };
}

export function managedClusterPropertiesAutoScalerProfileDeserializer(
  item: any,
): ManagedClusterPropertiesAutoScalerProfile {
  return {
    balanceSimilarNodeGroups: item["balance-similar-node-groups"],
    daemonsetEvictionForEmptyNodes: item["daemonset-eviction-for-empty-nodes"],
    daemonsetEvictionForOccupiedNodes: item["daemonset-eviction-for-occupied-nodes"],
    ignoreDaemonsetsUtilization: item["ignore-daemonsets-utilization"],
    expander: item["expander"],
    maxEmptyBulkDelete: item["max-empty-bulk-delete"],
    maxGracefulTerminationSec: item["max-graceful-termination-sec"],
    maxNodeProvisionTime: item["max-node-provision-time"],
    maxTotalUnreadyPercentage: item["max-total-unready-percentage"],
    newPodScaleUpDelay: item["new-pod-scale-up-delay"],
    okTotalUnreadyCount: item["ok-total-unready-count"],
    scanInterval: item["scan-interval"],
    scaleDownDelayAfterAdd: item["scale-down-delay-after-add"],
    scaleDownDelayAfterDelete: item["scale-down-delay-after-delete"],
    scaleDownDelayAfterFailure: item["scale-down-delay-after-failure"],
    scaleDownUnneededTime: item["scale-down-unneeded-time"],
    scaleDownUnreadyTime: item["scale-down-unready-time"],
    scaleDownUtilizationThreshold: item["scale-down-utilization-threshold"],
    skipNodesWithLocalStorage: item["skip-nodes-with-local-storage"],
    skipNodesWithSystemPods: item["skip-nodes-with-system-pods"],
  };
}

/** The expander to use when scaling up. If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information. */
export enum KnownExpander {
  /** Selects the node group that will have the least idle CPU (if tied, unused memory) after scale-up. This is useful when you have different classes of nodes, for example, high CPU or high memory nodes, and only want to expand those when there are pending pods that need a lot of those resources. */
  LeastWaste = "least-waste",
  /** Selects the node group that would be able to schedule the most pods when scaling up. This is useful when you are using nodeSelector to make sure certain pods land on certain nodes. Note that this won't cause the autoscaler to select bigger nodes vs. smaller, as it can add multiple smaller nodes at once. */
  MostPods = "most-pods",
  /** Selects the node group that has the highest priority assigned by the user. It's configuration is described in more details [here](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/expander/priority/readme.md). */
  Priority = "priority",
  /** Used when you don't have a particular need for the node groups to scale differently. */
  Random = "random",
}

/**
 * The expander to use when scaling up. If not specified, the default is 'random'. See [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-are-expanders) for more information. \
 * {@link KnownExpander} can be used interchangeably with Expander,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **least-waste**: Selects the node group that will have the least idle CPU (if tied, unused memory) after scale-up. This is useful when you have different classes of nodes, for example, high CPU or high memory nodes, and only want to expand those when there are pending pods that need a lot of those resources. \
 * **most-pods**: Selects the node group that would be able to schedule the most pods when scaling up. This is useful when you are using nodeSelector to make sure certain pods land on certain nodes. Note that this won't cause the autoscaler to select bigger nodes vs. smaller, as it can add multiple smaller nodes at once. \
 * **priority**: Selects the node group that has the highest priority assigned by the user. It's configuration is described in more details [here](https:\//github.com\/kubernetes\/autoscaler\/blob\/master\/cluster-autoscaler\/expander\/priority\/readme.md). \
 * **random**: Used when you don't have a particular need for the node groups to scale differently.
 */
export type Expander = string;

/** Access profile for managed cluster API server. */
export interface ManagedClusterAPIServerAccessProfile {
  /** The IP ranges authorized to access the Kubernetes API server. IP ranges are specified in CIDR format, e.g. 137.117.106.88/29. This feature is not compatible with clusters that use Public IP Per Node, or clusters that are using a Basic Load Balancer. For more information see [API server authorized IP ranges](https://docs.microsoft.com/azure/aks/api-server-authorized-ip-ranges). */
  authorizedIPRanges?: string[];
  /** Whether to create the cluster as a private cluster or not. For more details, see [Creating a private AKS cluster](https://docs.microsoft.com/azure/aks/private-clusters). */
  enablePrivateCluster?: boolean;
  /** The private DNS zone mode for the cluster. The default is System. For more details see [configure private DNS zone](https://docs.microsoft.com/azure/aks/private-clusters#configure-private-dns-zone). Allowed values are 'system' and 'none'. */
  privateDNSZone?: string;
  /** Whether to create additional public FQDN for private cluster or not. */
  enablePrivateClusterPublicFqdn?: boolean;
  /** Whether to disable run command for the cluster or not. */
  disableRunCommand?: boolean;
  /** Whether to enable apiserver vnet integration for the cluster or not. See aka.ms/AksVnetIntegration for more details. */
  enableVnetIntegration?: boolean;
  /** The subnet to be used when apiserver vnet integration is enabled. It is required when creating a new cluster with BYO Vnet, or when updating an existing cluster to enable apiserver vnet integration. */
  subnetId?: string;
}

export function managedClusterAPIServerAccessProfileSerializer(
  item: ManagedClusterAPIServerAccessProfile,
): any {
  return {
    authorizedIPRanges: !item["authorizedIPRanges"]
      ? item["authorizedIPRanges"]
      : item["authorizedIPRanges"].map((p: any) => {
          return p;
        }),
    enablePrivateCluster: item["enablePrivateCluster"],
    privateDNSZone: item["privateDNSZone"],
    enablePrivateClusterPublicFQDN: item["enablePrivateClusterPublicFqdn"],
    disableRunCommand: item["disableRunCommand"],
    enableVnetIntegration: item["enableVnetIntegration"],
    subnetId: item["subnetId"],
  };
}

export function managedClusterAPIServerAccessProfileDeserializer(
  item: any,
): ManagedClusterAPIServerAccessProfile {
  return {
    authorizedIPRanges: !item["authorizedIPRanges"]
      ? item["authorizedIPRanges"]
      : item["authorizedIPRanges"].map((p: any) => {
          return p;
        }),
    enablePrivateCluster: item["enablePrivateCluster"],
    privateDNSZone: item["privateDNSZone"],
    enablePrivateClusterPublicFqdn: item["enablePrivateClusterPublicFQDN"],
    disableRunCommand: item["disableRunCommand"],
    enableVnetIntegration: item["enableVnetIntegration"],
    subnetId: item["subnetId"],
  };
}

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

export function privateLinkResourceArraySerializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceSerializer(item);
  });
}

export function privateLinkResourceArrayDeserializer(result: Array<PrivateLinkResource>): any[] {
  return result.map((item) => {
    return privateLinkResourceDeserializer(item);
  });
}

/** A private link resource */
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
  requiredMembers?: string[];
  /** The private link service ID of the resource, this field is exposed only to NRP internally. */
  readonly privateLinkServiceID?: string;
}

export function privateLinkResourceSerializer(item: PrivateLinkResource): any {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
  };
}

export function privateLinkResourceDeserializer(item: any): PrivateLinkResource {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    groupId: item["groupId"],
    requiredMembers: !item["requiredMembers"]
      ? item["requiredMembers"]
      : item["requiredMembers"].map((p: any) => {
          return p;
        }),
    privateLinkServiceID: item["privateLinkServiceID"],
  };
}

/** Cluster HTTP proxy configuration. */
export interface ManagedClusterHttpProxyConfig {
  /** The HTTP proxy server endpoint to use. */
  httpProxy?: string;
  /** The HTTPS proxy server endpoint to use. */
  httpsProxy?: string;
  /** The endpoints that should not go through proxy. */
  noProxy?: string[];
  /** A read-only list of all endpoints for which traffic should not be sent to the proxy. This list is a superset of noProxy and values injected by AKS. */
  readonly effectiveNoProxy?: string[];
  /** Alternative CA cert to use for connecting to proxy servers. */
  trustedCa?: string;
  /** Whether to enable HTTP proxy. When disabled, the specified proxy configuration will be not be set on pods and nodes. */
  enabled?: boolean;
}

export function managedClusterHttpProxyConfigSerializer(item: ManagedClusterHttpProxyConfig): any {
  return {
    httpProxy: item["httpProxy"],
    httpsProxy: item["httpsProxy"],
    noProxy: !item["noProxy"]
      ? item["noProxy"]
      : item["noProxy"].map((p: any) => {
          return p;
        }),
    trustedCa: item["trustedCa"],
    enabled: item["enabled"],
  };
}

export function managedClusterHttpProxyConfigDeserializer(
  item: any,
): ManagedClusterHttpProxyConfig {
  return {
    httpProxy: item["httpProxy"],
    httpsProxy: item["httpsProxy"],
    noProxy: !item["noProxy"]
      ? item["noProxy"]
      : item["noProxy"].map((p: any) => {
          return p;
        }),
    effectiveNoProxy: !item["effectiveNoProxy"]
      ? item["effectiveNoProxy"]
      : item["effectiveNoProxy"].map((p: any) => {
          return p;
        }),
    trustedCa: item["trustedCa"],
    enabled: item["enabled"],
  };
}

/** Security profile for the container service cluster. */
export interface ManagedClusterSecurityProfile {
  /** Microsoft Defender settings for the security profile. */
  defender?: ManagedClusterSecurityProfileDefender;
  /** Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile. */
  azureKeyVaultKms?: AzureKeyVaultKms;
  /** Encryption at rest of Kubernetes resource objects. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption */
  kubernetesResourceObjectEncryptionProfile?: KubernetesResourceObjectEncryptionProfile;
  /** Workload identity settings for the security profile. Workload identity enables Kubernetes applications to access Azure cloud resources securely with Azure AD. See https://aka.ms/aks/wi for more details. */
  workloadIdentity?: ManagedClusterSecurityProfileWorkloadIdentity;
  /** Image Cleaner settings for the security profile. */
  imageCleaner?: ManagedClusterSecurityProfileImageCleaner;
  /** Image integrity is a feature that works with Azure Policy to verify image integrity by signature. This will not have any effect unless Azure Policy is applied to enforce image signatures. See https://aka.ms/aks/image-integrity for how to use this feature via policy. */
  imageIntegrity?: ManagedClusterSecurityProfileImageIntegrity;
  /** [Node Restriction](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#noderestriction) settings for the security profile. */
  nodeRestriction?: ManagedClusterSecurityProfileNodeRestriction;
  /** A list of up to 10 base64 encoded CAs that will be added to the trust store on all nodes in the cluster. For more information see [Custom CA Trust Certificates](https://learn.microsoft.com/en-us/azure/aks/custom-certificate-authority). */
  customCATrustCertificates?: Uint8Array[];
}

export function managedClusterSecurityProfileSerializer(item: ManagedClusterSecurityProfile): any {
  return {
    defender: !item["defender"]
      ? item["defender"]
      : managedClusterSecurityProfileDefenderSerializer(item["defender"]),
    azureKeyVaultKms: !item["azureKeyVaultKms"]
      ? item["azureKeyVaultKms"]
      : azureKeyVaultKmsSerializer(item["azureKeyVaultKms"]),
    kubernetesResourceObjectEncryptionProfile: !item["kubernetesResourceObjectEncryptionProfile"]
      ? item["kubernetesResourceObjectEncryptionProfile"]
      : kubernetesResourceObjectEncryptionProfileSerializer(
          item["kubernetesResourceObjectEncryptionProfile"],
        ),
    workloadIdentity: !item["workloadIdentity"]
      ? item["workloadIdentity"]
      : managedClusterSecurityProfileWorkloadIdentitySerializer(item["workloadIdentity"]),
    imageCleaner: !item["imageCleaner"]
      ? item["imageCleaner"]
      : managedClusterSecurityProfileImageCleanerSerializer(item["imageCleaner"]),
    imageIntegrity: !item["imageIntegrity"]
      ? item["imageIntegrity"]
      : managedClusterSecurityProfileImageIntegritySerializer(item["imageIntegrity"]),
    nodeRestriction: !item["nodeRestriction"]
      ? item["nodeRestriction"]
      : managedClusterSecurityProfileNodeRestrictionSerializer(item["nodeRestriction"]),
    customCATrustCertificates: !item["customCATrustCertificates"]
      ? item["customCATrustCertificates"]
      : item["customCATrustCertificates"].map((p: any) => {
          return uint8ArrayToString(p, "base64");
        }),
  };
}

export function managedClusterSecurityProfileDeserializer(
  item: any,
): ManagedClusterSecurityProfile {
  return {
    defender: !item["defender"]
      ? item["defender"]
      : managedClusterSecurityProfileDefenderDeserializer(item["defender"]),
    azureKeyVaultKms: !item["azureKeyVaultKms"]
      ? item["azureKeyVaultKms"]
      : azureKeyVaultKmsDeserializer(item["azureKeyVaultKms"]),
    kubernetesResourceObjectEncryptionProfile: !item["kubernetesResourceObjectEncryptionProfile"]
      ? item["kubernetesResourceObjectEncryptionProfile"]
      : kubernetesResourceObjectEncryptionProfileDeserializer(
          item["kubernetesResourceObjectEncryptionProfile"],
        ),
    workloadIdentity: !item["workloadIdentity"]
      ? item["workloadIdentity"]
      : managedClusterSecurityProfileWorkloadIdentityDeserializer(item["workloadIdentity"]),
    imageCleaner: !item["imageCleaner"]
      ? item["imageCleaner"]
      : managedClusterSecurityProfileImageCleanerDeserializer(item["imageCleaner"]),
    imageIntegrity: !item["imageIntegrity"]
      ? item["imageIntegrity"]
      : managedClusterSecurityProfileImageIntegrityDeserializer(item["imageIntegrity"]),
    nodeRestriction: !item["nodeRestriction"]
      ? item["nodeRestriction"]
      : managedClusterSecurityProfileNodeRestrictionDeserializer(item["nodeRestriction"]),
    customCATrustCertificates: !item["customCATrustCertificates"]
      ? item["customCATrustCertificates"]
      : item["customCATrustCertificates"].map((p: any) => {
          return typeof p === "string" ? stringToUint8Array(p, "base64") : p;
        }),
  };
}

/** Microsoft Defender settings for the security profile. */
export interface ManagedClusterSecurityProfileDefender {
  /** Resource ID of the Log Analytics workspace to be associated with Microsoft Defender. When Microsoft Defender is enabled, this field is required and must be a valid workspace resource ID. When Microsoft Defender is disabled, leave the field empty. */
  logAnalyticsWorkspaceResourceId?: string;
  /** Microsoft Defender threat detection for Cloud settings for the security profile. */
  securityMonitoring?: ManagedClusterSecurityProfileDefenderSecurityMonitoring;
  /** Microsoft Defender settings for security gating, validates container images eligibility for deployment based on Defender for Containers security findings. Using Admission Controller, it either audits or prevents the deployment of images that do not meet security standards. */
  securityGating?: ManagedClusterSecurityProfileDefenderSecurityGating;
}

export function managedClusterSecurityProfileDefenderSerializer(
  item: ManagedClusterSecurityProfileDefender,
): any {
  return {
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    securityMonitoring: !item["securityMonitoring"]
      ? item["securityMonitoring"]
      : managedClusterSecurityProfileDefenderSecurityMonitoringSerializer(
          item["securityMonitoring"],
        ),
    securityGating: !item["securityGating"]
      ? item["securityGating"]
      : managedClusterSecurityProfileDefenderSecurityGatingSerializer(item["securityGating"]),
  };
}

export function managedClusterSecurityProfileDefenderDeserializer(
  item: any,
): ManagedClusterSecurityProfileDefender {
  return {
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    securityMonitoring: !item["securityMonitoring"]
      ? item["securityMonitoring"]
      : managedClusterSecurityProfileDefenderSecurityMonitoringDeserializer(
          item["securityMonitoring"],
        ),
    securityGating: !item["securityGating"]
      ? item["securityGating"]
      : managedClusterSecurityProfileDefenderSecurityGatingDeserializer(item["securityGating"]),
  };
}

/** Microsoft Defender settings for the security profile threat detection. */
export interface ManagedClusterSecurityProfileDefenderSecurityMonitoring {
  /** Whether to enable Defender threat detection */
  enabled?: boolean;
}

export function managedClusterSecurityProfileDefenderSecurityMonitoringSerializer(
  item: ManagedClusterSecurityProfileDefenderSecurityMonitoring,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterSecurityProfileDefenderSecurityMonitoringDeserializer(
  item: any,
): ManagedClusterSecurityProfileDefenderSecurityMonitoring {
  return {
    enabled: item["enabled"],
  };
}

/** Microsoft Defender settings for security gating, validates container images eligibility for deployment based on Defender for Containers security findings. Using Admission Controller, it either audits or prevents the deployment of images that do not meet security standards. */
export interface ManagedClusterSecurityProfileDefenderSecurityGating {
  /** Whether to enable Defender security gating. When enabled, the gating feature will scan container images and audit or block the deployment of images that do not meet security standards according to the configured security rules. */
  enabled?: boolean;
  /** List of identities that the admission controller will make use of in order to pull security artifacts from the registry. These are the same identities used by the cluster to pull container images. Each identity provided should have federated identity credential attached to it. */
  identities?: ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem[];
  /** In use only while registry access granted by secret rather than managed identity. Set whether to grant the Defender gating agent access to the cluster's secrets for pulling images from registries. If secret access is denied and the registry requires pull secrets, the add-on will not perform any image validation. Default value is false. */
  allowSecretAccess?: boolean;
}

export function managedClusterSecurityProfileDefenderSecurityGatingSerializer(
  item: ManagedClusterSecurityProfileDefenderSecurityGating,
): any {
  return {
    enabled: item["enabled"],
    identities: !item["identities"]
      ? item["identities"]
      : managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemArraySerializer(
          item["identities"],
        ),
    allowSecretAccess: item["allowSecretAccess"],
  };
}

export function managedClusterSecurityProfileDefenderSecurityGatingDeserializer(
  item: any,
): ManagedClusterSecurityProfileDefenderSecurityGating {
  return {
    enabled: item["enabled"],
    identities: !item["identities"]
      ? item["identities"]
      : managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemArrayDeserializer(
          item["identities"],
        ),
    allowSecretAccess: item["allowSecretAccess"],
  };
}

export function managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemArraySerializer(
  result: Array<ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem>,
): any[] {
  return result.map((item) => {
    return managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemSerializer(item);
  });
}

export function managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemArrayDeserializer(
  result: Array<ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem>,
): any[] {
  return result.map((item) => {
    return managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemDeserializer(item);
  });
}

/** model interface ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem */
export interface ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem {
  /** The container registry for which the identity will be used; the identity specified here should have a federated identity credential attached to it. */
  azureContainerRegistry?: string;
  /** The identity object used to access the registry */
  identity?: UserAssignedIdentity;
}

export function managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemSerializer(
  item: ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem,
): any {
  return {
    azureContainerRegistry: item["azureContainerRegistry"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentitySerializer(item["identity"]),
  };
}

export function managedClusterSecurityProfileDefenderSecurityGatingIdentitiesItemDeserializer(
  item: any,
): ManagedClusterSecurityProfileDefenderSecurityGatingIdentitiesItem {
  return {
    azureContainerRegistry: item["azureContainerRegistry"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityDeserializer(item["identity"]),
  };
}

/** Azure Key Vault key management service settings for the security profile. */
export interface AzureKeyVaultKms {
  /** Whether to enable Azure Key Vault key management service. The default is false. */
  enabled?: boolean;
  /** Identifier of Azure Key Vault key. See [key identifier format](https://docs.microsoft.com/en-us/azure/key-vault/general/about-keys-secrets-certificates#vault-name-and-object-name) for more details. When Azure Key Vault key management service is enabled, this field is required and must be a valid key identifier. When Azure Key Vault key management service is disabled, leave the field empty. */
  keyId?: string;
  /** Network access of the key vault. Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. */
  keyVaultNetworkAccess?: KeyVaultNetworkAccessTypes;
  /** Resource ID of key vault. When keyVaultNetworkAccess is `Private`, this field is required and must be a valid resource ID. When keyVaultNetworkAccess is `Public`, leave the field empty. */
  keyVaultResourceId?: string;
}

export function azureKeyVaultKmsSerializer(item: AzureKeyVaultKms): any {
  return {
    enabled: item["enabled"],
    keyId: item["keyId"],
    keyVaultNetworkAccess: item["keyVaultNetworkAccess"],
    keyVaultResourceId: item["keyVaultResourceId"],
  };
}

export function azureKeyVaultKmsDeserializer(item: any): AzureKeyVaultKms {
  return {
    enabled: item["enabled"],
    keyId: item["keyId"],
    keyVaultNetworkAccess: item["keyVaultNetworkAccess"],
    keyVaultResourceId: item["keyVaultResourceId"],
  };
}

/** Network access of the key vault. Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. */
export enum KnownKeyVaultNetworkAccessTypes {
  /** Public */
  Public = "Public",
  /** Private */
  Private = "Private",
}

/**
 * Network access of the key vault. Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. \
 * {@link KnownKeyVaultNetworkAccessTypes} can be used interchangeably with KeyVaultNetworkAccessTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public** \
 * **Private**
 */
export type KeyVaultNetworkAccessTypes = string;

/** Encryption at rest of Kubernetes resource objects using service-managed keys. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption. */
export interface KubernetesResourceObjectEncryptionProfile {
  /** Whether to enable encryption at rest of Kubernetes resource objects using service-managed keys. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption. */
  infrastructureEncryption?: InfrastructureEncryption;
}

export function kubernetesResourceObjectEncryptionProfileSerializer(
  item: KubernetesResourceObjectEncryptionProfile,
): any {
  return { infrastructureEncryption: item["infrastructureEncryption"] };
}

export function kubernetesResourceObjectEncryptionProfileDeserializer(
  item: any,
): KubernetesResourceObjectEncryptionProfile {
  return {
    infrastructureEncryption: item["infrastructureEncryption"],
  };
}

/** Whether to enable encryption at rest of Kubernetes resource objects using service-managed keys. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption. */
export enum KnownInfrastructureEncryption {
  /** Encryption at rest of Kubernetes resource objects using service-managed keys is enabled. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption. */
  Enabled = "Enabled",
  /** Encryption at rest of Kubernetes resource objects using service-managed keys is disabled. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption. */
  Disabled = "Disabled",
}

/**
 * Whether to enable encryption at rest of Kubernetes resource objects using service-managed keys. More information on this can be found under https://aka.ms/aks/kubernetesResourceObjectEncryption. \
 * {@link KnownInfrastructureEncryption} can be used interchangeably with InfrastructureEncryption,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Encryption at rest of Kubernetes resource objects using service-managed keys is enabled. More information on this can be found under https:\//aka.ms\/aks\/kubernetesResourceObjectEncryption. \
 * **Disabled**: Encryption at rest of Kubernetes resource objects using service-managed keys is disabled. More information on this can be found under https:\//aka.ms\/aks\/kubernetesResourceObjectEncryption.
 */
export type InfrastructureEncryption = string;

/** Workload identity settings for the security profile. */
export interface ManagedClusterSecurityProfileWorkloadIdentity {
  /** Whether to enable workload identity. */
  enabled?: boolean;
}

export function managedClusterSecurityProfileWorkloadIdentitySerializer(
  item: ManagedClusterSecurityProfileWorkloadIdentity,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterSecurityProfileWorkloadIdentityDeserializer(
  item: any,
): ManagedClusterSecurityProfileWorkloadIdentity {
  return {
    enabled: item["enabled"],
  };
}

/** Image Cleaner removes unused images from nodes, freeing up disk space and helping to reduce attack surface area. Here are settings for the security profile. */
export interface ManagedClusterSecurityProfileImageCleaner {
  /** Whether to enable Image Cleaner on AKS cluster. */
  enabled?: boolean;
  /** Image Cleaner scanning interval in hours. */
  intervalHours?: number;
}

export function managedClusterSecurityProfileImageCleanerSerializer(
  item: ManagedClusterSecurityProfileImageCleaner,
): any {
  return { enabled: item["enabled"], intervalHours: item["intervalHours"] };
}

export function managedClusterSecurityProfileImageCleanerDeserializer(
  item: any,
): ManagedClusterSecurityProfileImageCleaner {
  return {
    enabled: item["enabled"],
    intervalHours: item["intervalHours"],
  };
}

/** Image integrity related settings for the security profile. */
export interface ManagedClusterSecurityProfileImageIntegrity {
  /** Whether to enable image integrity. The default value is false. */
  enabled?: boolean;
}

export function managedClusterSecurityProfileImageIntegritySerializer(
  item: ManagedClusterSecurityProfileImageIntegrity,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterSecurityProfileImageIntegrityDeserializer(
  item: any,
): ManagedClusterSecurityProfileImageIntegrity {
  return {
    enabled: item["enabled"],
  };
}

/** Node Restriction settings for the security profile. */
export interface ManagedClusterSecurityProfileNodeRestriction {
  /** Whether to enable Node Restriction */
  enabled?: boolean;
}

export function managedClusterSecurityProfileNodeRestrictionSerializer(
  item: ManagedClusterSecurityProfileNodeRestriction,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterSecurityProfileNodeRestrictionDeserializer(
  item: any,
): ManagedClusterSecurityProfileNodeRestriction {
  return {
    enabled: item["enabled"],
  };
}

/** Storage profile for the container service cluster. */
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

export function managedClusterStorageProfileSerializer(item: ManagedClusterStorageProfile): any {
  return {
    diskCSIDriver: !item["diskCSIDriver"]
      ? item["diskCSIDriver"]
      : managedClusterStorageProfileDiskCSIDriverSerializer(item["diskCSIDriver"]),
    fileCSIDriver: !item["fileCSIDriver"]
      ? item["fileCSIDriver"]
      : managedClusterStorageProfileFileCSIDriverSerializer(item["fileCSIDriver"]),
    snapshotController: !item["snapshotController"]
      ? item["snapshotController"]
      : managedClusterStorageProfileSnapshotControllerSerializer(item["snapshotController"]),
    blobCSIDriver: !item["blobCSIDriver"]
      ? item["blobCSIDriver"]
      : managedClusterStorageProfileBlobCSIDriverSerializer(item["blobCSIDriver"]),
  };
}

export function managedClusterStorageProfileDeserializer(item: any): ManagedClusterStorageProfile {
  return {
    diskCSIDriver: !item["diskCSIDriver"]
      ? item["diskCSIDriver"]
      : managedClusterStorageProfileDiskCSIDriverDeserializer(item["diskCSIDriver"]),
    fileCSIDriver: !item["fileCSIDriver"]
      ? item["fileCSIDriver"]
      : managedClusterStorageProfileFileCSIDriverDeserializer(item["fileCSIDriver"]),
    snapshotController: !item["snapshotController"]
      ? item["snapshotController"]
      : managedClusterStorageProfileSnapshotControllerDeserializer(item["snapshotController"]),
    blobCSIDriver: !item["blobCSIDriver"]
      ? item["blobCSIDriver"]
      : managedClusterStorageProfileBlobCSIDriverDeserializer(item["blobCSIDriver"]),
  };
}

/** AzureDisk CSI Driver settings for the storage profile. */
export interface ManagedClusterStorageProfileDiskCSIDriver {
  /** Whether to enable AzureDisk CSI Driver. The default value is true. */
  enabled?: boolean;
  /** The version of AzureDisk CSI Driver. The default value is v1. */
  version?: string;
}

export function managedClusterStorageProfileDiskCSIDriverSerializer(
  item: ManagedClusterStorageProfileDiskCSIDriver,
): any {
  return { enabled: item["enabled"], version: item["version"] };
}

export function managedClusterStorageProfileDiskCSIDriverDeserializer(
  item: any,
): ManagedClusterStorageProfileDiskCSIDriver {
  return {
    enabled: item["enabled"],
    version: item["version"],
  };
}

/** AzureFile CSI Driver settings for the storage profile. */
export interface ManagedClusterStorageProfileFileCSIDriver {
  /** Whether to enable AzureFile CSI Driver. The default value is true. */
  enabled?: boolean;
}

export function managedClusterStorageProfileFileCSIDriverSerializer(
  item: ManagedClusterStorageProfileFileCSIDriver,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterStorageProfileFileCSIDriverDeserializer(
  item: any,
): ManagedClusterStorageProfileFileCSIDriver {
  return {
    enabled: item["enabled"],
  };
}

/** Snapshot Controller settings for the storage profile. */
export interface ManagedClusterStorageProfileSnapshotController {
  /** Whether to enable Snapshot Controller. The default value is true. */
  enabled?: boolean;
}

export function managedClusterStorageProfileSnapshotControllerSerializer(
  item: ManagedClusterStorageProfileSnapshotController,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterStorageProfileSnapshotControllerDeserializer(
  item: any,
): ManagedClusterStorageProfileSnapshotController {
  return {
    enabled: item["enabled"],
  };
}

/** AzureBlob CSI Driver settings for the storage profile. */
export interface ManagedClusterStorageProfileBlobCSIDriver {
  /** Whether to enable AzureBlob CSI Driver. The default value is false. */
  enabled?: boolean;
}

export function managedClusterStorageProfileBlobCSIDriverSerializer(
  item: ManagedClusterStorageProfileBlobCSIDriver,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterStorageProfileBlobCSIDriverDeserializer(
  item: any,
): ManagedClusterStorageProfileBlobCSIDriver {
  return {
    enabled: item["enabled"],
  };
}

/** Ingress profile for the container service cluster. */
export interface ManagedClusterIngressProfile {
  /** App Routing settings for the ingress profile. You can find an overview and onboarding guide for this feature at https://learn.microsoft.com/en-us/azure/aks/app-routing?tabs=default%2Cdeploy-app-default. */
  webAppRouting?: ManagedClusterIngressProfileWebAppRouting;
  /** Settings for the managed Gateway API installation */
  gatewayAPI?: ManagedClusterIngressProfileGatewayConfiguration;
  /** Settings for the managed Application Load Balancer installation */
  applicationLoadBalancer?: ManagedClusterIngressProfileApplicationLoadBalancer;
}

export function managedClusterIngressProfileSerializer(item: ManagedClusterIngressProfile): any {
  return {
    webAppRouting: !item["webAppRouting"]
      ? item["webAppRouting"]
      : managedClusterIngressProfileWebAppRoutingSerializer(item["webAppRouting"]),
    gatewayAPI: !item["gatewayAPI"]
      ? item["gatewayAPI"]
      : managedClusterIngressProfileGatewayConfigurationSerializer(item["gatewayAPI"]),
    applicationLoadBalancer: !item["applicationLoadBalancer"]
      ? item["applicationLoadBalancer"]
      : managedClusterIngressProfileApplicationLoadBalancerSerializer(
          item["applicationLoadBalancer"],
        ),
  };
}

export function managedClusterIngressProfileDeserializer(item: any): ManagedClusterIngressProfile {
  return {
    webAppRouting: !item["webAppRouting"]
      ? item["webAppRouting"]
      : managedClusterIngressProfileWebAppRoutingDeserializer(item["webAppRouting"]),
    gatewayAPI: !item["gatewayAPI"]
      ? item["gatewayAPI"]
      : managedClusterIngressProfileGatewayConfigurationDeserializer(item["gatewayAPI"]),
    applicationLoadBalancer: !item["applicationLoadBalancer"]
      ? item["applicationLoadBalancer"]
      : managedClusterIngressProfileApplicationLoadBalancerDeserializer(
          item["applicationLoadBalancer"],
        ),
  };
}

/** Application Routing add-on settings for the ingress profile. */
export interface ManagedClusterIngressProfileWebAppRouting {
  /** Whether to enable the Application Routing add-on. */
  enabled?: boolean;
  /** Resource IDs of the DNS zones to be associated with the Application Routing add-on. Used only when Application Routing add-on is enabled. Public and private DNS zones can be in different resource groups, but all public DNS zones must be in the same resource group and all private DNS zones must be in the same resource group. */
  dnsZoneResourceIds?: string[];
  /** Configuration for the default NginxIngressController. See more at https://learn.microsoft.com/en-us/azure/aks/app-routing-nginx-configuration#the-default-nginx-ingress-controller. */
  nginx?: ManagedClusterIngressProfileNginx;
  /** Managed identity of the Application Routing add-on. This is the identity that should be granted permissions, for example, to manage the associated Azure DNS resource and get certificates from Azure Key Vault. See [this overview of the add-on](https://learn.microsoft.com/en-us/azure/aks/web-app-routing?tabs=with-osm) for more instructions. */
  readonly identity?: UserAssignedIdentity;
  /** Configuration for the Default Domain. This is a unique, autogenerated domain that comes with a signed TLS Certificate allowing for secure HTTPS. See [the Default Domain documentation](https://aka.ms/aks/defaultdomain) for more instructions. */
  defaultDomain?: ManagedClusterIngressDefaultDomainProfile;
}

export function managedClusterIngressProfileWebAppRoutingSerializer(
  item: ManagedClusterIngressProfileWebAppRouting,
): any {
  return {
    enabled: item["enabled"],
    dnsZoneResourceIds: !item["dnsZoneResourceIds"]
      ? item["dnsZoneResourceIds"]
      : item["dnsZoneResourceIds"].map((p: any) => {
          return p;
        }),
    nginx: !item["nginx"]
      ? item["nginx"]
      : managedClusterIngressProfileNginxSerializer(item["nginx"]),
    defaultDomain: !item["defaultDomain"]
      ? item["defaultDomain"]
      : managedClusterIngressDefaultDomainProfileSerializer(item["defaultDomain"]),
  };
}

export function managedClusterIngressProfileWebAppRoutingDeserializer(
  item: any,
): ManagedClusterIngressProfileWebAppRouting {
  return {
    enabled: item["enabled"],
    dnsZoneResourceIds: !item["dnsZoneResourceIds"]
      ? item["dnsZoneResourceIds"]
      : item["dnsZoneResourceIds"].map((p: any) => {
          return p;
        }),
    nginx: !item["nginx"]
      ? item["nginx"]
      : managedClusterIngressProfileNginxDeserializer(item["nginx"]),
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityDeserializer(item["identity"]),
    defaultDomain: !item["defaultDomain"]
      ? item["defaultDomain"]
      : managedClusterIngressDefaultDomainProfileDeserializer(item["defaultDomain"]),
  };
}

/** model interface ManagedClusterIngressProfileNginx */
export interface ManagedClusterIngressProfileNginx {
  /** Ingress type for the default NginxIngressController custom resource */
  defaultIngressControllerType?: NginxIngressControllerType;
}

export function managedClusterIngressProfileNginxSerializer(
  item: ManagedClusterIngressProfileNginx,
): any {
  return { defaultIngressControllerType: item["defaultIngressControllerType"] };
}

export function managedClusterIngressProfileNginxDeserializer(
  item: any,
): ManagedClusterIngressProfileNginx {
  return {
    defaultIngressControllerType: item["defaultIngressControllerType"],
  };
}

/** Ingress type for the default NginxIngressController custom resource */
export enum KnownNginxIngressControllerType {
  /** The default NginxIngressController will be created. Users can edit the default NginxIngressController Custom Resource to configure load balancer annotations. */
  AnnotationControlled = "AnnotationControlled",
  /** The default NginxIngressController will be created and the operator will provision an external loadbalancer with it. Any annotation to make the default loadbalancer internal will be overwritten. */
  External = "External",
  /** The default NginxIngressController will be created and the operator will provision an internal loadbalancer with it. Any annotation to make the default loadbalancer external will be overwritten. */
  Internal = "Internal",
  /** The default Ingress Controller will not be created. It will not be deleted by the system if it exists. Users should delete the default NginxIngressController Custom Resource manually if desired. */
  None = "None",
}

/**
 * Ingress type for the default NginxIngressController custom resource \
 * {@link KnownNginxIngressControllerType} can be used interchangeably with NginxIngressControllerType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **AnnotationControlled**: The default NginxIngressController will be created. Users can edit the default NginxIngressController Custom Resource to configure load balancer annotations. \
 * **External**: The default NginxIngressController will be created and the operator will provision an external loadbalancer with it. Any annotation to make the default loadbalancer internal will be overwritten. \
 * **Internal**: The default NginxIngressController will be created and the operator will provision an internal loadbalancer with it. Any annotation to make the default loadbalancer external will be overwritten. \
 * **None**: The default Ingress Controller will not be created. It will not be deleted by the system if it exists. Users should delete the default NginxIngressController Custom Resource manually if desired.
 */
export type NginxIngressControllerType = string;

/** model interface ManagedClusterIngressDefaultDomainProfile */
export interface ManagedClusterIngressDefaultDomainProfile {
  /** Whether to enable Default Domain. */
  enabled?: boolean;
  /** The unique fully qualified domain name assigned to the cluster. This will not change even if disabled then reenabled. */
  readonly domainName?: string;
}

export function managedClusterIngressDefaultDomainProfileSerializer(
  item: ManagedClusterIngressDefaultDomainProfile,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterIngressDefaultDomainProfileDeserializer(
  item: any,
): ManagedClusterIngressDefaultDomainProfile {
  return {
    enabled: item["enabled"],
    domainName: item["domainName"],
  };
}

/** model interface ManagedClusterIngressProfileGatewayConfiguration */
export interface ManagedClusterIngressProfileGatewayConfiguration {
  /** Configuration for the managed Gateway API installation. If not specified, the default is 'Disabled'. See https://aka.ms/k8s-gateway-api for more details. */
  installation?: ManagedGatewayType;
}

export function managedClusterIngressProfileGatewayConfigurationSerializer(
  item: ManagedClusterIngressProfileGatewayConfiguration,
): any {
  return { installation: item["installation"] };
}

export function managedClusterIngressProfileGatewayConfigurationDeserializer(
  item: any,
): ManagedClusterIngressProfileGatewayConfiguration {
  return {
    installation: item["installation"],
  };
}

/** Configuration for the managed Gateway API installation. If not specified, the default is 'Disabled'. See https://aka.ms/k8s-gateway-api for more details. */
export enum KnownManagedGatewayType {
  /** Gateway API CRDs will not be reconciled on your cluster. */
  Disabled = "Disabled",
  /** The latest Gateway CRD bundle from the standard channel that is compatible with your Kubernetes version will be reconciled onto your cluster. See https://gateway-api.sigs.k8s.io/concepts/versioning/ for more details. */
  Standard = "Standard",
}

/**
 * Configuration for the managed Gateway API installation. If not specified, the default is 'Disabled'. See https://aka.ms/k8s-gateway-api for more details. \
 * {@link KnownManagedGatewayType} can be used interchangeably with ManagedGatewayType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Disabled**: Gateway API CRDs will not be reconciled on your cluster. \
 * **Standard**: The latest Gateway CRD bundle from the standard channel that is compatible with your Kubernetes version will be reconciled onto your cluster. See https:\//gateway-api.sigs.k8s.io\/concepts\/versioning\/ for more details.
 */
export type ManagedGatewayType = string;

/** Application Load Balancer settings for the ingress profile. */
export interface ManagedClusterIngressProfileApplicationLoadBalancer {
  /** Whether to enable Application Load Balancer. */
  enabled?: boolean;
  /** Managed identity of the Application Load Balancer add-on. This is the identity that should be granted permissions to manage the associated Application Gateway for Containers resource. */
  readonly identity?: UserAssignedIdentity;
}

export function managedClusterIngressProfileApplicationLoadBalancerSerializer(
  item: ManagedClusterIngressProfileApplicationLoadBalancer,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterIngressProfileApplicationLoadBalancerDeserializer(
  item: any,
): ManagedClusterIngressProfileApplicationLoadBalancer {
  return {
    enabled: item["enabled"],
    identity: !item["identity"]
      ? item["identity"]
      : userAssignedIdentityDeserializer(item["identity"]),
  };
}

/** PublicNetworkAccess of the managedCluster. Allow or deny public network access for AKS */
export enum KnownPublicNetworkAccess {
  /** Inbound/Outbound to the managedCluster is allowed. */
  Enabled = "Enabled",
  /** Inbound traffic to managedCluster is disabled, traffic from managedCluster is allowed. */
  Disabled = "Disabled",
  /** Inbound/Outbound traffic is managed by Microsoft.Network/NetworkSecurityPerimeters. */
  SecuredByPerimeter = "SecuredByPerimeter",
}

/**
 * PublicNetworkAccess of the managedCluster. Allow or deny public network access for AKS \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Inbound\/Outbound to the managedCluster is allowed. \
 * **Disabled**: Inbound traffic to managedCluster is disabled, traffic from managedCluster is allowed. \
 * **SecuredByPerimeter**: Inbound\/Outbound traffic is managed by Microsoft.Network\/NetworkSecurityPerimeters.
 */
export type PublicNetworkAccess = string;

/** Workload Auto-scaler profile for the managed cluster. */
export interface ManagedClusterWorkloadAutoScalerProfile {
  /** KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile. */
  keda?: ManagedClusterWorkloadAutoScalerProfileKeda;
  /** VPA (Vertical Pod Autoscaler) settings for the workload auto-scaler profile. */
  verticalPodAutoscaler?: ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler;
}

export function managedClusterWorkloadAutoScalerProfileSerializer(
  item: ManagedClusterWorkloadAutoScalerProfile,
): any {
  return {
    keda: !item["keda"]
      ? item["keda"]
      : managedClusterWorkloadAutoScalerProfileKedaSerializer(item["keda"]),
    verticalPodAutoscaler: !item["verticalPodAutoscaler"]
      ? item["verticalPodAutoscaler"]
      : managedClusterWorkloadAutoScalerProfileVerticalPodAutoscalerSerializer(
          item["verticalPodAutoscaler"],
        ),
  };
}

export function managedClusterWorkloadAutoScalerProfileDeserializer(
  item: any,
): ManagedClusterWorkloadAutoScalerProfile {
  return {
    keda: !item["keda"]
      ? item["keda"]
      : managedClusterWorkloadAutoScalerProfileKedaDeserializer(item["keda"]),
    verticalPodAutoscaler: !item["verticalPodAutoscaler"]
      ? item["verticalPodAutoscaler"]
      : managedClusterWorkloadAutoScalerProfileVerticalPodAutoscalerDeserializer(
          item["verticalPodAutoscaler"],
        ),
  };
}

/** KEDA (Kubernetes Event-driven Autoscaling) settings for the workload auto-scaler profile. */
export interface ManagedClusterWorkloadAutoScalerProfileKeda {
  /** Whether to enable KEDA. */
  enabled: boolean;
}

export function managedClusterWorkloadAutoScalerProfileKedaSerializer(
  item: ManagedClusterWorkloadAutoScalerProfileKeda,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterWorkloadAutoScalerProfileKedaDeserializer(
  item: any,
): ManagedClusterWorkloadAutoScalerProfileKeda {
  return {
    enabled: item["enabled"],
  };
}

/** VPA (Vertical Pod Autoscaler) settings for the workload auto-scaler profile. */
export interface ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler {
  /** Whether to enable VPA. Default value is false. */
  enabled: boolean;
  /** Whether VPA add-on is enabled and configured to scale AKS-managed add-ons. */
  addonAutoscaling?: AddonAutoscaling;
}

export function managedClusterWorkloadAutoScalerProfileVerticalPodAutoscalerSerializer(
  item: ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler,
): any {
  return { enabled: item["enabled"], addonAutoscaling: item["addonAutoscaling"] };
}

export function managedClusterWorkloadAutoScalerProfileVerticalPodAutoscalerDeserializer(
  item: any,
): ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler {
  return {
    enabled: item["enabled"],
    addonAutoscaling: item["addonAutoscaling"],
  };
}

/** Whether VPA add-on is enabled and configured to scale AKS-managed add-ons. */
export enum KnownAddonAutoscaling {
  /** Feature to autoscale AKS-managed add-ons is enabled. The default VPA update mode is Initial mode. */
  Enabled = "Enabled",
  /** Feature to autoscale AKS-managed add-ons is disabled. */
  Disabled = "Disabled",
}

/**
 * Whether VPA add-on is enabled and configured to scale AKS-managed add-ons. \
 * {@link KnownAddonAutoscaling} can be used interchangeably with AddonAutoscaling,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Feature to autoscale AKS-managed add-ons is enabled. The default VPA update mode is Initial mode. \
 * **Disabled**: Feature to autoscale AKS-managed add-ons is disabled.
 */
export type AddonAutoscaling = string;

/** Azure Monitor addon profiles for monitoring the managed cluster. */
export interface ManagedClusterAzureMonitorProfile {
  /** Metrics profile for the Azure Monitor managed service for Prometheus addon. Collect out-of-the-box Kubernetes infrastructure metrics to send to an Azure Monitor Workspace and configure additional scraping for custom targets. See aka.ms/AzureManagedPrometheus for an overview. */
  metrics?: ManagedClusterAzureMonitorProfileMetrics;
  /** Azure Monitor Container Insights Profile for Kubernetes Events, Inventory and Container stdout & stderr logs etc. See aka.ms/AzureMonitorContainerInsights for an overview. */
  containerInsights?: ManagedClusterAzureMonitorProfileContainerInsights;
  /** Application Monitoring Profile for Kubernetes Application Container. Collects application logs, metrics and traces through auto-instrumentation of the application using Azure Monitor OpenTelemetry based SDKs. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
  appMonitoring?: ManagedClusterAzureMonitorProfileAppMonitoring;
}

export function managedClusterAzureMonitorProfileSerializer(
  item: ManagedClusterAzureMonitorProfile,
): any {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : managedClusterAzureMonitorProfileMetricsSerializer(item["metrics"]),
    containerInsights: !item["containerInsights"]
      ? item["containerInsights"]
      : managedClusterAzureMonitorProfileContainerInsightsSerializer(item["containerInsights"]),
    appMonitoring: !item["appMonitoring"]
      ? item["appMonitoring"]
      : managedClusterAzureMonitorProfileAppMonitoringSerializer(item["appMonitoring"]),
  };
}

export function managedClusterAzureMonitorProfileDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfile {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : managedClusterAzureMonitorProfileMetricsDeserializer(item["metrics"]),
    containerInsights: !item["containerInsights"]
      ? item["containerInsights"]
      : managedClusterAzureMonitorProfileContainerInsightsDeserializer(item["containerInsights"]),
    appMonitoring: !item["appMonitoring"]
      ? item["appMonitoring"]
      : managedClusterAzureMonitorProfileAppMonitoringDeserializer(item["appMonitoring"]),
  };
}

/** Metrics profile for the Azure Monitor managed service for Prometheus addon. Collect out-of-the-box Kubernetes infrastructure metrics to send to an Azure Monitor Workspace and configure additional scraping for custom targets. See aka.ms/AzureManagedPrometheus for an overview. */
export interface ManagedClusterAzureMonitorProfileMetrics {
  /** Whether to enable or disable the Azure Managed Prometheus addon for Prometheus monitoring. See aka.ms/AzureManagedPrometheus-aks-enable for details on enabling and disabling. */
  enabled: boolean;
  /** Kube State Metrics profile for the Azure Managed Prometheus addon. These optional settings are for the kube-state-metrics pod that is deployed with the addon. See aka.ms/AzureManagedPrometheus-optional-parameters for details. */
  kubeStateMetrics?: ManagedClusterAzureMonitorProfileKubeStateMetrics;
}

export function managedClusterAzureMonitorProfileMetricsSerializer(
  item: ManagedClusterAzureMonitorProfileMetrics,
): any {
  return {
    enabled: item["enabled"],
    kubeStateMetrics: !item["kubeStateMetrics"]
      ? item["kubeStateMetrics"]
      : managedClusterAzureMonitorProfileKubeStateMetricsSerializer(item["kubeStateMetrics"]),
  };
}

export function managedClusterAzureMonitorProfileMetricsDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileMetrics {
  return {
    enabled: item["enabled"],
    kubeStateMetrics: !item["kubeStateMetrics"]
      ? item["kubeStateMetrics"]
      : managedClusterAzureMonitorProfileKubeStateMetricsDeserializer(item["kubeStateMetrics"]),
  };
}

/** Kube State Metrics profile for the Azure Managed Prometheus addon. These optional settings are for the kube-state-metrics pod that is deployed with the addon. See aka.ms/AzureManagedPrometheus-optional-parameters for details. */
export interface ManagedClusterAzureMonitorProfileKubeStateMetrics {
  /** Comma-separated list of additional Kubernetes label keys that will be used in the resource's labels metric (Example: 'namespaces=[k8s-label-1,k8s-label-n,...],pods=[app],...'). By default the metric contains only resource name and namespace labels. */
  metricLabelsAllowlist?: string;
  /** Comma-separated list of Kubernetes annotation keys that will be used in the resource's labels metric (Example: 'namespaces=[kubernetes.io/team,...],pods=[kubernetes.io/team],...'). By default the metric contains only resource name and namespace labels. */
  metricAnnotationsAllowList?: string;
}

export function managedClusterAzureMonitorProfileKubeStateMetricsSerializer(
  item: ManagedClusterAzureMonitorProfileKubeStateMetrics,
): any {
  return {
    metricLabelsAllowlist: item["metricLabelsAllowlist"],
    metricAnnotationsAllowList: item["metricAnnotationsAllowList"],
  };
}

export function managedClusterAzureMonitorProfileKubeStateMetricsDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileKubeStateMetrics {
  return {
    metricLabelsAllowlist: item["metricLabelsAllowlist"],
    metricAnnotationsAllowList: item["metricAnnotationsAllowList"],
  };
}

/** Azure Monitor Container Insights Profile for Kubernetes Events, Inventory and Container stdout & stderr logs etc. See aka.ms/AzureMonitorContainerInsights for an overview. */
export interface ManagedClusterAzureMonitorProfileContainerInsights {
  /** Indicates if Azure Monitor Container Insights Logs Addon is enabled or not. */
  enabled?: boolean;
  /** Fully Qualified ARM Resource Id of Azure Log Analytics Workspace for storing Azure Monitor Container Insights Logs. */
  logAnalyticsWorkspaceResourceId?: string;
  /** The syslog host port. If not specified, the default port is 28330. */
  syslogPort?: number;
  /** Indicates whether custom metrics collection has to be disabled or not. If not specified the default is false. No custom metrics will be emitted if this field is false but the container insights enabled field is false */
  disableCustomMetrics?: boolean;
  /** Indicates whether prometheus metrics scraping is disabled or not. If not specified the default is false. No prometheus metrics will be emitted if this field is false but the container insights enabled field is false */
  disablePrometheusMetricsScraping?: boolean;
}

export function managedClusterAzureMonitorProfileContainerInsightsSerializer(
  item: ManagedClusterAzureMonitorProfileContainerInsights,
): any {
  return {
    enabled: item["enabled"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    syslogPort: item["syslogPort"],
    disableCustomMetrics: item["disableCustomMetrics"],
    disablePrometheusMetricsScraping: item["disablePrometheusMetricsScraping"],
  };
}

export function managedClusterAzureMonitorProfileContainerInsightsDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileContainerInsights {
  return {
    enabled: item["enabled"],
    logAnalyticsWorkspaceResourceId: item["logAnalyticsWorkspaceResourceId"],
    syslogPort: item["syslogPort"],
    disableCustomMetrics: item["disableCustomMetrics"],
    disablePrometheusMetricsScraping: item["disablePrometheusMetricsScraping"],
  };
}

/** Application Monitoring Profile for Kubernetes Application Container. Collects application logs, metrics and traces through auto-instrumentation of the application using Azure Monitor OpenTelemetry based SDKs. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
export interface ManagedClusterAzureMonitorProfileAppMonitoring {
  /** Application Monitoring Auto Instrumentation for Kubernetes Application Container. Deploys web hook to auto-instrument Azure Monitor OpenTelemetry based SDKs to collect OpenTelemetry metrics, logs and traces of the application. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
  autoInstrumentation?: ManagedClusterAzureMonitorProfileAppMonitoringAutoInstrumentation;
  /** Application Monitoring Open Telemetry Metrics Profile for Kubernetes Application Container Metrics. Collects OpenTelemetry metrics of the application using Azure Monitor OpenTelemetry based SDKs. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
  openTelemetryMetrics?: ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetrics;
  /** Application Monitoring Open Telemetry Metrics Profile for Kubernetes Application Container Logs and Traces. Collects OpenTelemetry logs and traces of the application using Azure Monitor OpenTelemetry based SDKs. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
  openTelemetryLogs?: ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogs;
}

export function managedClusterAzureMonitorProfileAppMonitoringSerializer(
  item: ManagedClusterAzureMonitorProfileAppMonitoring,
): any {
  return {
    autoInstrumentation: !item["autoInstrumentation"]
      ? item["autoInstrumentation"]
      : managedClusterAzureMonitorProfileAppMonitoringAutoInstrumentationSerializer(
          item["autoInstrumentation"],
        ),
    openTelemetryMetrics: !item["openTelemetryMetrics"]
      ? item["openTelemetryMetrics"]
      : managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetricsSerializer(
          item["openTelemetryMetrics"],
        ),
    openTelemetryLogs: !item["openTelemetryLogs"]
      ? item["openTelemetryLogs"]
      : managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogsSerializer(
          item["openTelemetryLogs"],
        ),
  };
}

export function managedClusterAzureMonitorProfileAppMonitoringDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileAppMonitoring {
  return {
    autoInstrumentation: !item["autoInstrumentation"]
      ? item["autoInstrumentation"]
      : managedClusterAzureMonitorProfileAppMonitoringAutoInstrumentationDeserializer(
          item["autoInstrumentation"],
        ),
    openTelemetryMetrics: !item["openTelemetryMetrics"]
      ? item["openTelemetryMetrics"]
      : managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetricsDeserializer(
          item["openTelemetryMetrics"],
        ),
    openTelemetryLogs: !item["openTelemetryLogs"]
      ? item["openTelemetryLogs"]
      : managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogsDeserializer(
          item["openTelemetryLogs"],
        ),
  };
}

/** Application Monitoring Auto Instrumentation for Kubernetes Application Container. Deploys web hook to auto-instrument Azure Monitor OpenTelemetry based SDKs to collect OpenTelemetry metrics, logs and traces of the application. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
export interface ManagedClusterAzureMonitorProfileAppMonitoringAutoInstrumentation {
  /** Indicates if Application Monitoring Auto Instrumentation is enabled or not. */
  enabled?: boolean;
}

export function managedClusterAzureMonitorProfileAppMonitoringAutoInstrumentationSerializer(
  item: ManagedClusterAzureMonitorProfileAppMonitoringAutoInstrumentation,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterAzureMonitorProfileAppMonitoringAutoInstrumentationDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileAppMonitoringAutoInstrumentation {
  return {
    enabled: item["enabled"],
  };
}

/** Application Monitoring Open Telemetry Metrics Profile for Kubernetes Application Container Metrics. Collects OpenTelemetry metrics of the application using Azure Monitor OpenTelemetry based SDKs. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
export interface ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetrics {
  /** Indicates if Application Monitoring Open Telemetry Metrics is enabled or not. */
  enabled?: boolean;
  /** The Open Telemetry host port for Open Telemetry metrics. If not specified, the default port is 28333. */
  port?: number;
}

export function managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetricsSerializer(
  item: ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetrics,
): any {
  return { enabled: item["enabled"], port: item["port"] };
}

export function managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetricsDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryMetrics {
  return {
    enabled: item["enabled"],
    port: item["port"],
  };
}

/** Application Monitoring Open Telemetry Metrics Profile for Kubernetes Application Container Logs and Traces. Collects OpenTelemetry logs and traces of the application using Azure Monitor OpenTelemetry based SDKs. See aka.ms/AzureMonitorApplicationMonitoring for an overview. */
export interface ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogs {
  /** Indicates if Application Monitoring Open Telemetry Logs and traces is enabled or not. */
  enabled?: boolean;
  /** The Open Telemetry host port for Open Telemetry logs and traces. If not specified, the default port is 28331. */
  port?: number;
}

export function managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogsSerializer(
  item: ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogs,
): any {
  return { enabled: item["enabled"], port: item["port"] };
}

export function managedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogsDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfileAppMonitoringOpenTelemetryLogs {
  return {
    enabled: item["enabled"],
    port: item["port"],
  };
}

/** Service mesh profile for a managed cluster. */
export interface ServiceMeshProfile {
  /** Mode of the service mesh. */
  mode: ServiceMeshMode;
  /** Istio service mesh configuration. */
  istio?: IstioServiceMesh;
}

export function serviceMeshProfileSerializer(item: ServiceMeshProfile): any {
  return {
    mode: item["mode"],
    istio: !item["istio"] ? item["istio"] : istioServiceMeshSerializer(item["istio"]),
  };
}

export function serviceMeshProfileDeserializer(item: any): ServiceMeshProfile {
  return {
    mode: item["mode"],
    istio: !item["istio"] ? item["istio"] : istioServiceMeshDeserializer(item["istio"]),
  };
}

/** Mode of the service mesh. */
export enum KnownServiceMeshMode {
  /** Istio deployed as an AKS addon. */
  Istio = "Istio",
  /** Mesh is disabled. */
  Disabled = "Disabled",
}

/**
 * Mode of the service mesh. \
 * {@link KnownServiceMeshMode} can be used interchangeably with ServiceMeshMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Istio**: Istio deployed as an AKS addon. \
 * **Disabled**: Mesh is disabled.
 */
export type ServiceMeshMode = string;

/** Istio service mesh configuration. */
export interface IstioServiceMesh {
  /** Istio components configuration. */
  components?: IstioComponents;
  /** Istio Service Mesh Certificate Authority (CA) configuration. For now, we only support plugin certificates as described here https://aka.ms/asm-plugin-ca */
  certificateAuthority?: IstioCertificateAuthority;
  /** The list of revisions of the Istio control plane. When an upgrade is not in progress, this holds one value. When canary upgrade is in progress, this can only hold two consecutive values. For more information, see: https://learn.microsoft.com/en-us/azure/aks/istio-upgrade */
  revisions?: string[];
}

export function istioServiceMeshSerializer(item: IstioServiceMesh): any {
  return {
    components: !item["components"]
      ? item["components"]
      : istioComponentsSerializer(item["components"]),
    certificateAuthority: !item["certificateAuthority"]
      ? item["certificateAuthority"]
      : istioCertificateAuthoritySerializer(item["certificateAuthority"]),
    revisions: !item["revisions"]
      ? item["revisions"]
      : item["revisions"].map((p: any) => {
          return p;
        }),
  };
}

export function istioServiceMeshDeserializer(item: any): IstioServiceMesh {
  return {
    components: !item["components"]
      ? item["components"]
      : istioComponentsDeserializer(item["components"]),
    certificateAuthority: !item["certificateAuthority"]
      ? item["certificateAuthority"]
      : istioCertificateAuthorityDeserializer(item["certificateAuthority"]),
    revisions: !item["revisions"]
      ? item["revisions"]
      : item["revisions"].map((p: any) => {
          return p;
        }),
  };
}

/** Istio components configuration. */
export interface IstioComponents {
  /** Istio ingress gateways. */
  ingressGateways?: IstioIngressGateway[];
  /** Istio egress gateways. */
  egressGateways?: IstioEgressGateway[];
  /** Mode of traffic redirection. */
  proxyRedirectionMechanism?: ProxyRedirectionMechanism;
}

export function istioComponentsSerializer(item: IstioComponents): any {
  return {
    ingressGateways: !item["ingressGateways"]
      ? item["ingressGateways"]
      : istioIngressGatewayArraySerializer(item["ingressGateways"]),
    egressGateways: !item["egressGateways"]
      ? item["egressGateways"]
      : istioEgressGatewayArraySerializer(item["egressGateways"]),
    proxyRedirectionMechanism: item["proxyRedirectionMechanism"],
  };
}

export function istioComponentsDeserializer(item: any): IstioComponents {
  return {
    ingressGateways: !item["ingressGateways"]
      ? item["ingressGateways"]
      : istioIngressGatewayArrayDeserializer(item["ingressGateways"]),
    egressGateways: !item["egressGateways"]
      ? item["egressGateways"]
      : istioEgressGatewayArrayDeserializer(item["egressGateways"]),
    proxyRedirectionMechanism: item["proxyRedirectionMechanism"],
  };
}

export function istioIngressGatewayArraySerializer(result: Array<IstioIngressGateway>): any[] {
  return result.map((item) => {
    return istioIngressGatewaySerializer(item);
  });
}

export function istioIngressGatewayArrayDeserializer(result: Array<IstioIngressGateway>): any[] {
  return result.map((item) => {
    return istioIngressGatewayDeserializer(item);
  });
}

/** Istio ingress gateway configuration. For now, we support up to one external ingress gateway named `aks-istio-ingressgateway-external` and one internal ingress gateway named `aks-istio-ingressgateway-internal`. */
export interface IstioIngressGateway {
  /** Mode of an ingress gateway. */
  mode: IstioIngressGatewayMode;
  /** Whether to enable the ingress gateway. */
  enabled: boolean;
}

export function istioIngressGatewaySerializer(item: IstioIngressGateway): any {
  return { mode: item["mode"], enabled: item["enabled"] };
}

export function istioIngressGatewayDeserializer(item: any): IstioIngressGateway {
  return {
    mode: item["mode"],
    enabled: item["enabled"],
  };
}

/** Mode of an ingress gateway. */
export enum KnownIstioIngressGatewayMode {
  /** The ingress gateway is assigned a public IP address and is publicly accessible. */
  External = "External",
  /** The ingress gateway is assigned an internal IP address and cannot is accessed publicly. */
  Internal = "Internal",
}

/**
 * Mode of an ingress gateway. \
 * {@link KnownIstioIngressGatewayMode} can be used interchangeably with IstioIngressGatewayMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **External**: The ingress gateway is assigned a public IP address and is publicly accessible. \
 * **Internal**: The ingress gateway is assigned an internal IP address and cannot is accessed publicly.
 */
export type IstioIngressGatewayMode = string;

export function istioEgressGatewayArraySerializer(result: Array<IstioEgressGateway>): any[] {
  return result.map((item) => {
    return istioEgressGatewaySerializer(item);
  });
}

export function istioEgressGatewayArrayDeserializer(result: Array<IstioEgressGateway>): any[] {
  return result.map((item) => {
    return istioEgressGatewayDeserializer(item);
  });
}

/** Istio egress gateway configuration. */
export interface IstioEgressGateway {
  /** Whether to enable the egress gateway. */
  enabled: boolean;
  /** Name of the Istio add-on egress gateway. */
  name: string;
  /** Namespace that the Istio add-on egress gateway should be deployed in. If unspecified, the default is aks-istio-egress. */
  namespace?: string;
  /** Name of the gateway configuration custom resource for the Istio add-on egress gateway. Must be specified when enabling the Istio egress gateway. Must be deployed in the same namespace that the Istio egress gateway will be deployed in. */
  gatewayConfigurationName?: string;
}

export function istioEgressGatewaySerializer(item: IstioEgressGateway): any {
  return {
    enabled: item["enabled"],
    name: item["name"],
    namespace: item["namespace"],
    gatewayConfigurationName: item["gatewayConfigurationName"],
  };
}

export function istioEgressGatewayDeserializer(item: any): IstioEgressGateway {
  return {
    enabled: item["enabled"],
    name: item["name"],
    namespace: item["namespace"],
    gatewayConfigurationName: item["gatewayConfigurationName"],
  };
}

/** Mode of traffic redirection. */
export enum KnownProxyRedirectionMechanism {
  /** Istio will inject an init container into each pod to redirect traffic (requires NET_ADMIN and NET_RAW). */
  InitContainers = "InitContainers",
  /** Istio will install a chained CNI plugin to redirect traffic (recommended). */
  CNIChaining = "CNIChaining",
}

/**
 * Mode of traffic redirection. \
 * {@link KnownProxyRedirectionMechanism} can be used interchangeably with ProxyRedirectionMechanism,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **InitContainers**: Istio will inject an init container into each pod to redirect traffic (requires NET_ADMIN and NET_RAW). \
 * **CNIChaining**: Istio will install a chained CNI plugin to redirect traffic (recommended).
 */
export type ProxyRedirectionMechanism = string;

/** Istio Service Mesh Certificate Authority (CA) configuration. For now, we only support plugin certificates as described here https://aka.ms/asm-plugin-ca */
export interface IstioCertificateAuthority {
  /** Plugin certificates information for Service Mesh. */
  plugin?: IstioPluginCertificateAuthority;
}

export function istioCertificateAuthoritySerializer(item: IstioCertificateAuthority): any {
  return {
    plugin: !item["plugin"]
      ? item["plugin"]
      : istioPluginCertificateAuthoritySerializer(item["plugin"]),
  };
}

export function istioCertificateAuthorityDeserializer(item: any): IstioCertificateAuthority {
  return {
    plugin: !item["plugin"]
      ? item["plugin"]
      : istioPluginCertificateAuthorityDeserializer(item["plugin"]),
  };
}

/** Plugin certificates information for Service Mesh. */
export interface IstioPluginCertificateAuthority {
  /** The resource ID of the Key Vault. */
  keyVaultId?: string;
  /** Intermediate certificate object name in Azure Key Vault. */
  certObjectName?: string;
  /** Intermediate certificate private key object name in Azure Key Vault. */
  keyObjectName?: string;
  /** Root certificate object name in Azure Key Vault. */
  rootCertObjectName?: string;
  /** Certificate chain object name in Azure Key Vault. */
  certChainObjectName?: string;
}

export function istioPluginCertificateAuthoritySerializer(
  item: IstioPluginCertificateAuthority,
): any {
  return {
    keyVaultId: item["keyVaultId"],
    certObjectName: item["certObjectName"],
    keyObjectName: item["keyObjectName"],
    rootCertObjectName: item["rootCertObjectName"],
    certChainObjectName: item["certChainObjectName"],
  };
}

export function istioPluginCertificateAuthorityDeserializer(
  item: any,
): IstioPluginCertificateAuthority {
  return {
    keyVaultId: item["keyVaultId"],
    certObjectName: item["certObjectName"],
    keyObjectName: item["keyObjectName"],
    rootCertObjectName: item["rootCertObjectName"],
    certChainObjectName: item["certChainObjectName"],
  };
}

/** The metrics profile for the ManagedCluster. */
export interface ManagedClusterMetricsProfile {
  /** The configuration for detailed per-Kubernetes resource cost analysis. */
  costAnalysis?: ManagedClusterCostAnalysis;
}

export function managedClusterMetricsProfileSerializer(item: ManagedClusterMetricsProfile): any {
  return {
    costAnalysis: !item["costAnalysis"]
      ? item["costAnalysis"]
      : managedClusterCostAnalysisSerializer(item["costAnalysis"]),
  };
}

export function managedClusterMetricsProfileDeserializer(item: any): ManagedClusterMetricsProfile {
  return {
    costAnalysis: !item["costAnalysis"]
      ? item["costAnalysis"]
      : managedClusterCostAnalysisDeserializer(item["costAnalysis"]),
  };
}

/** The cost analysis configuration for the cluster */
export interface ManagedClusterCostAnalysis {
  /** Whether to enable cost analysis. The Managed Cluster sku.tier must be set to 'Standard' or 'Premium' to enable this feature. Enabling this will add Kubernetes Namespace and Deployment details to the Cost Analysis views in the Azure portal. If not specified, the default is false. For more information see aka.ms/aks/docs/cost-analysis. */
  enabled?: boolean;
}

export function managedClusterCostAnalysisSerializer(item: ManagedClusterCostAnalysis): any {
  return { enabled: item["enabled"] };
}

export function managedClusterCostAnalysisDeserializer(item: any): ManagedClusterCostAnalysis {
  return {
    enabled: item["enabled"],
  };
}

/** model interface ManagedClusterNodeProvisioningProfile */
export interface ManagedClusterNodeProvisioningProfile {
  /** The node provisioning mode. If not specified, the default is Manual. */
  mode?: NodeProvisioningMode;
  /** The set of default Karpenter NodePools (CRDs) configured for node provisioning. This field has no effect unless mode is 'Auto'. Warning: Changing this from Auto to None on an existing cluster will cause the default Karpenter NodePools to be deleted, which will drain and delete the nodes associated with those pools. It is strongly recommended to not do this unless there are idle nodes ready to take the pods evicted by that action. If not specified, the default is Auto. For more information see aka.ms/aks/nap#node-pools. */
  defaultNodePools?: NodeProvisioningDefaultNodePools;
}

export function managedClusterNodeProvisioningProfileSerializer(
  item: ManagedClusterNodeProvisioningProfile,
): any {
  return { mode: item["mode"], defaultNodePools: item["defaultNodePools"] };
}

export function managedClusterNodeProvisioningProfileDeserializer(
  item: any,
): ManagedClusterNodeProvisioningProfile {
  return {
    mode: item["mode"],
    defaultNodePools: item["defaultNodePools"],
  };
}

/** The node provisioning mode. If not specified, the default is Manual. */
export enum KnownNodeProvisioningMode {
  /** Nodes are provisioned manually by the user */
  Manual = "Manual",
  /** Nodes are provisioned automatically by AKS using Karpenter (See aka.ms/aks/nap for more details). Fixed size Node Pools can still be created, but autoscaling Node Pools cannot be. (See aka.ms/aks/nap for more details). */
  Auto = "Auto",
}

/**
 * The node provisioning mode. If not specified, the default is Manual. \
 * {@link KnownNodeProvisioningMode} can be used interchangeably with NodeProvisioningMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Manual**: Nodes are provisioned manually by the user \
 * **Auto**: Nodes are provisioned automatically by AKS using Karpenter (See aka.ms\/aks\/nap for more details). Fixed size Node Pools can still be created, but autoscaling Node Pools cannot be. (See aka.ms\/aks\/nap for more details).
 */
export type NodeProvisioningMode = string;

/** The set of default Karpenter NodePools (CRDs) configured for node provisioning. This field has no effect unless mode is 'Auto'. Warning: Changing this from Auto to None on an existing cluster will cause the default Karpenter NodePools to be deleted, which will drain and delete the nodes associated with those pools. It is strongly recommended to not do this unless there are idle nodes ready to take the pods evicted by that action. If not specified, the default is Auto. For more information see aka.ms/aks/nap#node-pools. */
export enum KnownNodeProvisioningDefaultNodePools {
  /** No Karpenter NodePools are provisioned automatically. Automatic scaling will not happen unless the user creates one or more NodePool CRD instances. */
  None = "None",
  /** A standard set of Karpenter NodePools are provisioned */
  Auto = "Auto",
}

/**
 * The set of default Karpenter NodePools (CRDs) configured for node provisioning. This field has no effect unless mode is 'Auto'. Warning: Changing this from Auto to None on an existing cluster will cause the default Karpenter NodePools to be deleted, which will drain and delete the nodes associated with those pools. It is strongly recommended to not do this unless there are idle nodes ready to take the pods evicted by that action. If not specified, the default is Auto. For more information see aka.ms/aks/nap#node-pools. \
 * {@link KnownNodeProvisioningDefaultNodePools} can be used interchangeably with NodeProvisioningDefaultNodePools,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **None**: No Karpenter NodePools are provisioned automatically. Automatic scaling will not happen unless the user creates one or more NodePool CRD instances. \
 * **Auto**: A standard set of Karpenter NodePools are provisioned
 */
export type NodeProvisioningDefaultNodePools = string;

/** The bootstrap profile. */
export interface ManagedClusterBootstrapProfile {
  /** The artifact source. The source where the artifacts are downloaded from. */
  artifactSource?: ArtifactSource;
  /** The resource Id of Azure Container Registry. The registry must have private network access, premium SKU and zone redundancy. */
  containerRegistryId?: string;
}

export function managedClusterBootstrapProfileSerializer(
  item: ManagedClusterBootstrapProfile,
): any {
  return {
    artifactSource: item["artifactSource"],
    containerRegistryId: item["containerRegistryId"],
  };
}

export function managedClusterBootstrapProfileDeserializer(
  item: any,
): ManagedClusterBootstrapProfile {
  return {
    artifactSource: item["artifactSource"],
    containerRegistryId: item["containerRegistryId"],
  };
}

/** The artifact source. The source where the artifacts are downloaded from. */
export enum KnownArtifactSource {
  /** pull images from Azure Container Registry with cache */
  Cache = "Cache",
  /** pull images from Microsoft Artifact Registry */
  Direct = "Direct",
}

/**
 * The artifact source. The source where the artifacts are downloaded from. \
 * {@link KnownArtifactSource} can be used interchangeably with ArtifactSource,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Cache**: pull images from Azure Container Registry with cache \
 * **Direct**: pull images from Microsoft Artifact Registry
 */
export type ArtifactSource = string;

/** When enabling the operator, a set of AKS managed CRDs and controllers will be installed in the cluster. The operator automates the deployment of OSS models for inference and/or training purposes. It provides a set of preset models and enables distributed inference against them. */
export interface ManagedClusterAIToolchainOperatorProfile {
  /** Whether to enable AI toolchain operator to the cluster. Indicates if AI toolchain operator  enabled or not. */
  enabled?: boolean;
}

export function managedClusterAIToolchainOperatorProfileSerializer(
  item: ManagedClusterAIToolchainOperatorProfile,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterAIToolchainOperatorProfileDeserializer(
  item: any,
): ManagedClusterAIToolchainOperatorProfile {
  return {
    enabled: item["enabled"],
  };
}

/** The pod scheduler profile for the cluster. */
export interface SchedulerProfile {
  /** Mapping of each scheduler instance to its profile. */
  schedulerInstanceProfiles?: SchedulerProfileSchedulerInstanceProfiles;
}

export function schedulerProfileSerializer(item: SchedulerProfile): any {
  return {
    schedulerInstanceProfiles: !item["schedulerInstanceProfiles"]
      ? item["schedulerInstanceProfiles"]
      : schedulerProfileSchedulerInstanceProfilesSerializer(item["schedulerInstanceProfiles"]),
  };
}

export function schedulerProfileDeserializer(item: any): SchedulerProfile {
  return {
    schedulerInstanceProfiles: !item["schedulerInstanceProfiles"]
      ? item["schedulerInstanceProfiles"]
      : schedulerProfileSchedulerInstanceProfilesDeserializer(item["schedulerInstanceProfiles"]),
  };
}

/** Mapping of each scheduler instance to its profile. */
export interface SchedulerProfileSchedulerInstanceProfiles {
  /** The scheduler profile for the upstream scheduler instance. */
  upstream?: SchedulerInstanceProfile;
}

export function schedulerProfileSchedulerInstanceProfilesSerializer(
  item: SchedulerProfileSchedulerInstanceProfiles,
): any {
  return {
    upstream: !item["upstream"]
      ? item["upstream"]
      : schedulerInstanceProfileSerializer(item["upstream"]),
  };
}

export function schedulerProfileSchedulerInstanceProfilesDeserializer(
  item: any,
): SchedulerProfileSchedulerInstanceProfiles {
  return {
    upstream: !item["upstream"]
      ? item["upstream"]
      : schedulerInstanceProfileDeserializer(item["upstream"]),
  };
}

/** The scheduler profile for a single scheduler instance. */
export interface SchedulerInstanceProfile {
  /** The config customization mode for this scheduler instance. */
  schedulerConfigMode?: SchedulerConfigMode;
}

export function schedulerInstanceProfileSerializer(item: SchedulerInstanceProfile): any {
  return { schedulerConfigMode: item["schedulerConfigMode"] };
}

export function schedulerInstanceProfileDeserializer(item: any): SchedulerInstanceProfile {
  return {
    schedulerConfigMode: item["schedulerConfigMode"],
  };
}

/** The config customization mode for this scheduler instance. */
export enum KnownSchedulerConfigMode {
  /** No config customization. Use default configuration. */
  Default = "Default",
  /** Enable config customization. Customer can specify scheduler configuration via a CRD. See aka.ms/aks/scheduler-crd for details. */
  ManagedByCRD = "ManagedByCRD",
}

/**
 * The config customization mode for this scheduler instance. \
 * {@link KnownSchedulerConfigMode} can be used interchangeably with SchedulerConfigMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Default**: No config customization. Use default configuration. \
 * **ManagedByCRD**: Enable config customization. Customer can specify scheduler configuration via a CRD. See aka.ms\/aks\/scheduler-crd for details.
 */
export type SchedulerConfigMode = string;

/** Settings for hosted system addons. */
export interface ManagedClusterHostedSystemProfile {
  /** Whether to enable hosted system addons for the cluster. */
  enabled?: boolean;
}

export function managedClusterHostedSystemProfileSerializer(
  item: ManagedClusterHostedSystemProfile,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterHostedSystemProfileDeserializer(
  item: any,
): ManagedClusterHostedSystemProfile {
  return {
    enabled: item["enabled"],
  };
}

/** Contains read-only information about the Managed Cluster. */
export interface ManagedClusterStatus {
  /** The error details information of the managed cluster. Preserves the detailed info of failure. If there was no error, this field is omitted. */
  readonly provisioningError?: ErrorDetail;
}

export function managedClusterStatusSerializer(item: ManagedClusterStatus): any {
  return item;
}

export function managedClusterStatusDeserializer(item: any): ManagedClusterStatus {
  return {
    provisioningError: !item["provisioningError"]
      ? item["provisioningError"]
      : errorDetailDeserializer(item["provisioningError"]),
  };
}

/** The SKU of a Managed Cluster. */
export interface ManagedClusterSKU {
  /** The name of a managed cluster SKU. */
  name?: ManagedClusterSKUName;
  /** The tier of a managed cluster SKU. If not specified, the default is 'Free'. See [AKS Pricing Tier](https://learn.microsoft.com/azure/aks/free-standard-pricing-tiers) for more details. */
  tier?: ManagedClusterSKUTier;
}

export function managedClusterSKUSerializer(item: ManagedClusterSKU): any {
  return { name: item["name"], tier: item["tier"] };
}

export function managedClusterSKUDeserializer(item: any): ManagedClusterSKU {
  return {
    name: item["name"],
    tier: item["tier"],
  };
}

/** The name of a managed cluster SKU. */
export enum KnownManagedClusterSKUName {
  /** Base option for the AKS control plane. */
  Base = "Base",
  /** Automatic clusters are optimized to run most production workloads with configuration that follows AKS best practices and recommendations for cluster and workload setup, scalability, and security. For more details about Automatic clusters see aka.ms/aks/automatic. */
  Automatic = "Automatic",
}

/**
 * The name of a managed cluster SKU. \
 * {@link KnownManagedClusterSKUName} can be used interchangeably with ManagedClusterSKUName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Base**: Base option for the AKS control plane. \
 * **Automatic**: Automatic clusters are optimized to run most production workloads with configuration that follows AKS best practices and recommendations for cluster and workload setup, scalability, and security. For more details about Automatic clusters see aka.ms\/aks\/automatic.
 */
export type ManagedClusterSKUName = string;

/** The tier of a managed cluster SKU. If not specified, the default is 'Free'. See [AKS Pricing Tier](https://learn.microsoft.com/azure/aks/free-standard-pricing-tiers) for more details. */
export enum KnownManagedClusterSKUTier {
  /** Cluster has premium capabilities in addition to all of the capabilities included in 'Standard'. Premium enables selection of LongTermSupport (aka.ms/aks/lts) for certain Kubernetes versions. */
  Premium = "Premium",
  /** Recommended for mission-critical and production workloads. Includes Kubernetes control plane autoscaling, workload-intensive testing, and up to 5,000 nodes per cluster. Guarantees 99.95% availability of the Kubernetes API server endpoint for clusters that use Availability Zones and 99.9% of availability for clusters that don't use Availability Zones. */
  Standard = "Standard",
  /** The cluster management is free, but charged for VM, storage, and networking usage. Best for experimenting, learning, simple testing, or workloads with fewer than 10 nodes. Not recommended for production use cases. */
  Free = "Free",
}

/**
 * The tier of a managed cluster SKU. If not specified, the default is 'Free'. See [AKS Pricing Tier](https://learn.microsoft.com/azure/aks/free-standard-pricing-tiers) for more details. \
 * {@link KnownManagedClusterSKUTier} can be used interchangeably with ManagedClusterSKUTier,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Premium**: Cluster has premium capabilities in addition to all of the capabilities included in 'Standard'. Premium enables selection of LongTermSupport (aka.ms\/aks\/lts) for certain Kubernetes versions. \
 * **Standard**: Recommended for mission-critical and production workloads. Includes Kubernetes control plane autoscaling, workload-intensive testing, and up to 5,000 nodes per cluster. Guarantees 99.95% availability of the Kubernetes API server endpoint for clusters that use Availability Zones and 99.9% of availability for clusters that don't use Availability Zones. \
 * **Free**: The cluster management is free, but charged for VM, storage, and networking usage. Best for experimenting, learning, simple testing, or workloads with fewer than 10 nodes. Not recommended for production use cases.
 */
export type ManagedClusterSKUTier = string;

/** The complex type of the extended location. */
export interface ExtendedLocation {
  /** The name of the extended location. */
  name?: string;
  /** The type of the extended location. */
  type?: ExtendedLocationTypes;
}

export function extendedLocationSerializer(item: ExtendedLocation): any {
  return { name: item["name"], type: item["type"] };
}

export function extendedLocationDeserializer(item: any): ExtendedLocation {
  return {
    name: item["name"],
    type: item["type"],
  };
}

/** The type of extendedLocation. */
export enum KnownExtendedLocationTypes {
  /** EdgeZone */
  EdgeZone = "EdgeZone",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**
 */
export type ExtendedLocationTypes = string;

/** Identity for the managed cluster. */
export interface ManagedClusterIdentity {
  /** The principal id of the system assigned identity which is used by master components. */
  readonly principalId?: string;
  /** The tenant id of the system assigned identity which is used by master components. */
  readonly tenantId?: string;
  /** The type of identity used for the managed cluster. For more information see [use managed identities in AKS](https://docs.microsoft.com/azure/aks/use-managed-identity). */
  type?: ResourceIdentityType;
  /** The delegated identity resources assigned to this managed cluster. This can only be set by another Azure Resource Provider, and managed cluster only accept one delegated identity resource. Internal use only. */
  delegatedResources?: Record<string, DelegatedResource>;
  /** The user identity associated with the managed cluster. This identity will be used in control plane. Only one user assigned identity is allowed. The keys must be ARM resource IDs in the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{identityName}'. */
  userAssignedIdentities?: Record<string, ManagedServiceIdentityUserAssignedIdentitiesValue>;
}

export function managedClusterIdentitySerializer(item: ManagedClusterIdentity): any {
  return {
    type: item["type"],
    delegatedResources: !item["delegatedResources"]
      ? item["delegatedResources"]
      : delegatedResourceRecordSerializer(item["delegatedResources"]),
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : managedServiceIdentityUserAssignedIdentitiesValueRecordSerializer(
          item["userAssignedIdentities"],
        ),
  };
}

export function managedClusterIdentityDeserializer(item: any): ManagedClusterIdentity {
  return {
    principalId: item["principalId"],
    tenantId: item["tenantId"],
    type: item["type"],
    delegatedResources: !item["delegatedResources"]
      ? item["delegatedResources"]
      : delegatedResourceRecordDeserializer(item["delegatedResources"]),
    userAssignedIdentities: !item["userAssignedIdentities"]
      ? item["userAssignedIdentities"]
      : managedServiceIdentityUserAssignedIdentitiesValueRecordDeserializer(
          item["userAssignedIdentities"],
        ),
  };
}

/** The type of identity used for the managed cluster. For more information see [use managed identities in AKS](https://docs.microsoft.com/azure/aks/use-managed-identity). */
export type ResourceIdentityType = "SystemAssigned" | "UserAssigned" | "None";

export function delegatedResourceRecordSerializer(
  item: Record<string, DelegatedResource>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : delegatedResourceSerializer(item[key]);
  });
  return result;
}

export function delegatedResourceRecordDeserializer(
  item: Record<string, any>,
): Record<string, DelegatedResource> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : delegatedResourceDeserializer(item[key]);
  });
  return result;
}

/** Delegated resource properties - internal use only. */
export interface DelegatedResource {
  /** The ARM resource id of the delegated resource - internal use only. */
  resourceId?: string;
  /** The tenant id of the delegated resource - internal use only. */
  tenantId?: string;
  /** The delegation id of the referral delegation (optional) - internal use only. */
  referralResource?: string;
  /** The source resource location - internal use only. */
  location?: string;
}

export function delegatedResourceSerializer(item: DelegatedResource): any {
  return {
    resourceId: item["resourceId"],
    tenantId: item["tenantId"],
    referralResource: item["referralResource"],
    location: item["location"],
  };
}

export function delegatedResourceDeserializer(item: any): DelegatedResource {
  return {
    resourceId: item["resourceId"],
    tenantId: item["tenantId"],
    referralResource: item["referralResource"],
    location: item["location"],
  };
}

export function managedServiceIdentityUserAssignedIdentitiesValueRecordSerializer(
  item: Record<string, ManagedServiceIdentityUserAssignedIdentitiesValue>,
): Record<string, any> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : managedServiceIdentityUserAssignedIdentitiesValueSerializer(item[key]);
  });
  return result;
}

export function managedServiceIdentityUserAssignedIdentitiesValueRecordDeserializer(
  item: Record<string, any>,
): Record<string, ManagedServiceIdentityUserAssignedIdentitiesValue> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key]
      ? item[key]
      : managedServiceIdentityUserAssignedIdentitiesValueDeserializer(item[key]);
  });
  return result;
}

/** model interface ManagedServiceIdentityUserAssignedIdentitiesValue */
export interface ManagedServiceIdentityUserAssignedIdentitiesValue {
  /** The principal id of user assigned identity. */
  readonly principalId?: string;
  /** The client id of user assigned identity. */
  readonly clientId?: string;
}

export function managedServiceIdentityUserAssignedIdentitiesValueSerializer(
  item: ManagedServiceIdentityUserAssignedIdentitiesValue,
): any {
  return item;
}

export function managedServiceIdentityUserAssignedIdentitiesValueDeserializer(
  item: any,
): ManagedServiceIdentityUserAssignedIdentitiesValue {
  return {
    principalId: item["principalId"],
    clientId: item["clientId"],
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
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
  };
}

/** Tags object for patch operations. */
export interface TagsObject {
  /** Resource tags. */
  tags?: Record<string, string>;
}

export function tagsObjectSerializer(item: TagsObject): any {
  return { tags: item["tags"] };
}

/** The response of a ManagedCluster list operation. */
export interface _ManagedClusterListResult {
  /** The ManagedCluster items on this page */
  value: ManagedCluster[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedClusterListResultDeserializer(item: any): _ManagedClusterListResult {
  return {
    value: managedClusterArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedClusterArraySerializer(result: Array<ManagedCluster>): any[] {
  return result.map((item) => {
    return managedClusterSerializer(item);
  });
}

export function managedClusterArrayDeserializer(result: Array<ManagedCluster>): any[] {
  return result.map((item) => {
    return managedClusterDeserializer(item);
  });
}

/** Managed cluster Access Profile. */
export interface ManagedClusterAccessProfile extends TrackedResource {
  /** Base64-encoded Kubernetes configuration file. */
  kubeConfig?: Uint8Array;
}

export function managedClusterAccessProfileDeserializer(item: any): ManagedClusterAccessProfile {
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
      : _managedClusterAccessProfilePropertiesDeserializer(item["properties"])),
  };
}

/** Profile for enabling a user to access a managed cluster. */
export interface AccessProfile {
  /** Base64-encoded Kubernetes configuration file. */
  kubeConfig?: Uint8Array;
}

export function accessProfileDeserializer(item: any): AccessProfile {
  return {
    kubeConfig: !item["kubeConfig"]
      ? item["kubeConfig"]
      : typeof item["kubeConfig"] === "string"
        ? stringToUint8Array(item["kubeConfig"], "base64")
        : item["kubeConfig"],
  };
}

/** The list credential result response. */
export interface CredentialResults {
  /** Base64-encoded Kubernetes configuration file. */
  readonly kubeconfigs?: CredentialResult[];
}

export function credentialResultsDeserializer(item: any): CredentialResults {
  return {
    kubeconfigs: !item["kubeconfigs"]
      ? item["kubeconfigs"]
      : credentialResultArrayDeserializer(item["kubeconfigs"]),
  };
}

export function credentialResultArrayDeserializer(result: Array<CredentialResult>): any[] {
  return result.map((item) => {
    return credentialResultDeserializer(item);
  });
}

/** The credential result response. */
export interface CredentialResult {
  /** The name of the credential. */
  readonly name?: string;
  /** Base64-encoded Kubernetes configuration file. */
  readonly value?: Uint8Array;
}

export function credentialResultDeserializer(item: any): CredentialResult {
  return {
    name: item["name"],
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64")
        : item["value"],
  };
}

/** A run command request */
export interface RunCommandRequest {
  /** The command to run. */
  command: string;
  /** A base64 encoded zip file containing the files required by the command. */
  context?: string;
  /** AuthToken issued for AKS AAD Server App. */
  clusterToken?: string;
}

export function runCommandRequestSerializer(item: RunCommandRequest): any {
  return { command: item["command"], context: item["context"], clusterToken: item["clusterToken"] };
}

/** run command result. */
export interface RunCommandResult {
  /** The command id. */
  readonly id?: string;
  /** provisioning State */
  readonly provisioningState?: string;
  /** The exit code of the command */
  readonly exitCode?: number;
  /** The time when the command started. */
  readonly startedAt?: Date;
  /** The time when the command finished. */
  readonly finishedAt?: Date;
  /** The command output. */
  readonly logs?: string;
  /** An explanation of why provisioningState is set to failed (if so). */
  readonly reason?: string;
}

export function runCommandResultDeserializer(item: any): RunCommandResult {
  return {
    id: item["id"],
    ...(!item["properties"]
      ? item["properties"]
      : _runCommandResultPropertiesDeserializer(item["properties"])),
  };
}

/** The results of a run command */
export interface CommandResultProperties {
  /** provisioning State */
  readonly provisioningState?: string;
  /** The exit code of the command */
  readonly exitCode?: number;
  /** The time when the command started. */
  readonly startedAt?: Date;
  /** The time when the command finished. */
  readonly finishedAt?: Date;
  /** The command output. */
  readonly logs?: string;
  /** An explanation of why provisioningState is set to failed (if so). */
  readonly reason?: string;
}

export function commandResultPropertiesDeserializer(item: any): CommandResultProperties {
  return {
    provisioningState: item["provisioningState"],
    exitCode: item["exitCode"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    finishedAt: !item["finishedAt"] ? item["finishedAt"] : new Date(item["finishedAt"]),
    logs: item["logs"],
    reason: item["reason"],
  };
}

/** Collection of OutboundEnvironmentEndpoint */
export interface _OutboundEnvironmentEndpointCollection {
  /** The OutboundEnvironmentEndpoint items on this page */
  value: OutboundEnvironmentEndpoint[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _outboundEnvironmentEndpointCollectionDeserializer(
  item: any,
): _OutboundEnvironmentEndpointCollection {
  return {
    value: outboundEnvironmentEndpointArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function outboundEnvironmentEndpointArrayDeserializer(
  result: Array<OutboundEnvironmentEndpoint>,
): any[] {
  return result.map((item) => {
    return outboundEnvironmentEndpointDeserializer(item);
  });
}

/** Egress endpoints which AKS agent nodes connect to for common purpose. */
export interface OutboundEnvironmentEndpoint {
  /** The category of endpoints accessed by the AKS agent node, e.g. azure-resource-management, apiserver, etc. */
  category?: string;
  /** The endpoints that AKS agent nodes connect to */
  endpoints?: EndpointDependency[];
}

export function outboundEnvironmentEndpointDeserializer(item: any): OutboundEnvironmentEndpoint {
  return {
    category: item["category"],
    endpoints: !item["endpoints"]
      ? item["endpoints"]
      : endpointDependencyArrayDeserializer(item["endpoints"]),
  };
}

export function endpointDependencyArrayDeserializer(result: Array<EndpointDependency>): any[] {
  return result.map((item) => {
    return endpointDependencyDeserializer(item);
  });
}

/** A domain name that AKS agent nodes are reaching at. */
export interface EndpointDependency {
  /** The domain name of the dependency. */
  domainName?: string;
  /** The Ports and Protocols used when connecting to domainName. */
  endpointDetails?: EndpointDetail[];
}

export function endpointDependencyDeserializer(item: any): EndpointDependency {
  return {
    domainName: item["domainName"],
    endpointDetails: !item["endpointDetails"]
      ? item["endpointDetails"]
      : endpointDetailArrayDeserializer(item["endpointDetails"]),
  };
}

export function endpointDetailArrayDeserializer(result: Array<EndpointDetail>): any[] {
  return result.map((item) => {
    return endpointDetailDeserializer(item);
  });
}

/** connect information from the AKS agent nodes to a single endpoint. */
export interface EndpointDetail {
  /** An IP Address that Domain Name currently resolves to. */
  ipAddress?: string;
  /** The port an endpoint is connected to. */
  port?: number;
  /** The protocol used for connection */
  protocol?: string;
  /** Description of the detail */
  description?: string;
}

export function endpointDetailDeserializer(item: any): EndpointDetail {
  return {
    ipAddress: item["ipAddress"],
    port: item["port"],
    protocol: item["protocol"],
    description: item["description"],
  };
}

/** The names of the load balancers to rebalance. If set to empty, all load balancers will be rebalanced. */
export interface RebalanceLoadBalancersRequestBody {
  /** The load balancer names list. */
  loadBalancerNames?: string[];
}

export function rebalanceLoadBalancersRequestBodySerializer(
  item: RebalanceLoadBalancersRequestBody,
): any {
  return {
    loadBalancerNames: !item["loadBalancerNames"]
      ? item["loadBalancerNames"]
      : item["loadBalancerNames"].map((p: any) => {
          return p;
        }),
  };
}

/** The list of available upgrades for compute pools. */
export interface ManagedClusterUpgradeProfile extends ProxyResource {
  /** The list of available upgrade versions for the control plane. */
  controlPlaneProfile: ManagedClusterPoolUpgradeProfile;
  /** The list of available upgrade versions for agent pools. */
  agentPoolProfiles: ManagedClusterPoolUpgradeProfile[];
}

export function managedClusterUpgradeProfileDeserializer(item: any): ManagedClusterUpgradeProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._managedClusterUpgradeProfilePropertiesDeserializer(item["properties"]),
  };
}

/** Control plane and agent pool upgrade profiles. */
export interface ManagedClusterUpgradeProfileProperties {
  /** The list of available upgrade versions for the control plane. */
  controlPlaneProfile: ManagedClusterPoolUpgradeProfile;
  /** The list of available upgrade versions for agent pools. */
  agentPoolProfiles: ManagedClusterPoolUpgradeProfile[];
}

export function managedClusterUpgradeProfilePropertiesDeserializer(
  item: any,
): ManagedClusterUpgradeProfileProperties {
  return {
    controlPlaneProfile: managedClusterPoolUpgradeProfileDeserializer(item["controlPlaneProfile"]),
    agentPoolProfiles: managedClusterPoolUpgradeProfileArrayDeserializer(item["agentPoolProfiles"]),
  };
}

/** The list of available upgrade versions. */
export interface ManagedClusterPoolUpgradeProfile {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion: string;
  /** The Agent Pool name. */
  name?: string;
  /** The operating system type. The default is Linux. */
  osType: OSType;
  /** List of orchestrator types and versions available for upgrade. */
  upgrades?: ManagedClusterPoolUpgradeProfileUpgradesItem[];
  /** List of components grouped by kubernetes major.minor version. */
  componentsByReleases?: ComponentsByRelease[];
}

export function managedClusterPoolUpgradeProfileDeserializer(
  item: any,
): ManagedClusterPoolUpgradeProfile {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    name: item["name"],
    osType: item["osType"],
    upgrades: !item["upgrades"]
      ? item["upgrades"]
      : managedClusterPoolUpgradeProfileUpgradesItemArrayDeserializer(item["upgrades"]),
    componentsByReleases: !item["componentsByReleases"]
      ? item["componentsByReleases"]
      : componentsByReleaseArrayDeserializer(item["componentsByReleases"]),
  };
}

export function managedClusterPoolUpgradeProfileUpgradesItemArrayDeserializer(
  result: Array<ManagedClusterPoolUpgradeProfileUpgradesItem>,
): any[] {
  return result.map((item) => {
    return managedClusterPoolUpgradeProfileUpgradesItemDeserializer(item);
  });
}

/** model interface ManagedClusterPoolUpgradeProfileUpgradesItem */
export interface ManagedClusterPoolUpgradeProfileUpgradesItem {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether the Kubernetes version is currently in preview. */
  isPreview?: boolean;
  /** Whether the Kubernetes version is out of support. */
  isOutOfSupport?: boolean;
}

export function managedClusterPoolUpgradeProfileUpgradesItemDeserializer(
  item: any,
): ManagedClusterPoolUpgradeProfileUpgradesItem {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    isPreview: item["isPreview"],
    isOutOfSupport: item["isOutOfSupport"],
  };
}

export function managedClusterPoolUpgradeProfileArrayDeserializer(
  result: Array<ManagedClusterPoolUpgradeProfile>,
): any[] {
  return result.map((item) => {
    return managedClusterPoolUpgradeProfileDeserializer(item);
  });
}

/** Available Guardrails Version */
export interface GuardrailsAvailableVersion extends ProxyResource {
  /** Whether the version is default or not and support info. */
  properties: GuardrailsAvailableVersionsProperties;
}

export function guardrailsAvailableVersionDeserializer(item: any): GuardrailsAvailableVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: guardrailsAvailableVersionsPropertiesDeserializer(item["properties"]),
  };
}

/** Whether the version is default or not and support info. */
export interface GuardrailsAvailableVersionsProperties {
  readonly isDefaultVersion?: boolean;
  /** Whether the version is preview or stable. */
  readonly support?: GuardrailsSupport;
}

export function guardrailsAvailableVersionsPropertiesDeserializer(
  item: any,
): GuardrailsAvailableVersionsProperties {
  return {
    isDefaultVersion: item["isDefaultVersion"],
    support: item["support"],
  };
}

/** Whether the version is preview or stable. */
export enum KnownGuardrailsSupport {
  /** The version is preview. It is not recommended to use preview versions on critical production clusters. The preview version may not support all use-cases. */
  Preview = "Preview",
  /** The version is stable and can be used on critical production clusters. */
  Stable = "Stable",
}

/**
 * Whether the version is preview or stable. \
 * {@link KnownGuardrailsSupport} can be used interchangeably with GuardrailsSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: The version is preview. It is not recommended to use preview versions on critical production clusters. The preview version may not support all use-cases. \
 * **Stable**: The version is stable and can be used on critical production clusters.
 */
export type GuardrailsSupport = string;

/** Hold values properties, which is array of GuardrailsVersions */
export interface _GuardrailsAvailableVersionsList {
  /** The GuardrailsAvailableVersion items on this page */
  value: GuardrailsAvailableVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _guardrailsAvailableVersionsListDeserializer(
  item: any,
): _GuardrailsAvailableVersionsList {
  return {
    value: guardrailsAvailableVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function guardrailsAvailableVersionArrayDeserializer(
  result: Array<GuardrailsAvailableVersion>,
): any[] {
  return result.map((item) => {
    return guardrailsAvailableVersionDeserializer(item);
  });
}

/** Available Safeguards Version */
export interface SafeguardsAvailableVersion extends ProxyResource {
  /** Whether the version is default or not and support info. */
  properties: SafeguardsAvailableVersionsProperties;
}

export function safeguardsAvailableVersionDeserializer(item: any): SafeguardsAvailableVersion {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: safeguardsAvailableVersionsPropertiesDeserializer(item["properties"]),
  };
}

/** Whether the version is default or not and support info. */
export interface SafeguardsAvailableVersionsProperties {
  readonly isDefaultVersion?: boolean;
  /** Whether the version is preview or stable. */
  readonly support?: SafeguardsSupport;
}

export function safeguardsAvailableVersionsPropertiesDeserializer(
  item: any,
): SafeguardsAvailableVersionsProperties {
  return {
    isDefaultVersion: item["isDefaultVersion"],
    support: item["support"],
  };
}

/** Whether the version is preview or stable. */
export enum KnownSafeguardsSupport {
  /** The version is preview. It is not recommended to use preview versions on critical production clusters. The preview version may not support all use-cases. */
  Preview = "Preview",
  /** The version is stable and can be used on critical production clusters. */
  Stable = "Stable",
}

/**
 * Whether the version is preview or stable. \
 * {@link KnownSafeguardsSupport} can be used interchangeably with SafeguardsSupport,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Preview**: The version is preview. It is not recommended to use preview versions on critical production clusters. The preview version may not support all use-cases. \
 * **Stable**: The version is stable and can be used on critical production clusters.
 */
export type SafeguardsSupport = string;

/** Hold values properties, which is array of SafeguardsVersions */
export interface _SafeguardsAvailableVersionsList {
  /** The SafeguardsAvailableVersion items on this page */
  value: SafeguardsAvailableVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _safeguardsAvailableVersionsListDeserializer(
  item: any,
): _SafeguardsAvailableVersionsList {
  return {
    value: safeguardsAvailableVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function safeguardsAvailableVersionArrayDeserializer(
  result: Array<SafeguardsAvailableVersion>,
): any[] {
  return result.map((item) => {
    return safeguardsAvailableVersionDeserializer(item);
  });
}

/** Mesh revision profile for a mesh. */
export interface MeshRevisionProfile extends ProxyResource {
  /** Mesh revision profile properties for a mesh */
  properties?: MeshRevisionProfileProperties;
}

export function meshRevisionProfileDeserializer(item: any): MeshRevisionProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : meshRevisionProfilePropertiesDeserializer(item["properties"]),
  };
}

/** Mesh revision profile properties for a mesh */
export interface MeshRevisionProfileProperties {
  meshRevisions?: MeshRevision[];
}

export function meshRevisionProfilePropertiesDeserializer(
  item: any,
): MeshRevisionProfileProperties {
  return {
    meshRevisions: !item["meshRevisions"]
      ? item["meshRevisions"]
      : meshRevisionArrayDeserializer(item["meshRevisions"]),
  };
}

export function meshRevisionArrayDeserializer(result: Array<MeshRevision>): any[] {
  return result.map((item) => {
    return meshRevisionDeserializer(item);
  });
}

/** Holds information on upgrades and compatibility for given major.minor mesh release. */
export interface MeshRevision {
  /** The revision of the mesh release. */
  revision?: string;
  /** List of revisions available for upgrade of a specific mesh revision */
  upgrades?: string[];
  /** List of items this revision of service mesh is compatible with, and their associated versions. */
  compatibleWith?: CompatibleVersions[];
}

export function meshRevisionDeserializer(item: any): MeshRevision {
  return {
    revision: item["revision"],
    upgrades: !item["upgrades"]
      ? item["upgrades"]
      : item["upgrades"].map((p: any) => {
          return p;
        }),
    compatibleWith: !item["compatibleWith"]
      ? item["compatibleWith"]
      : compatibleVersionsArrayDeserializer(item["compatibleWith"]),
  };
}

export function compatibleVersionsArrayDeserializer(result: Array<CompatibleVersions>): any[] {
  return result.map((item) => {
    return compatibleVersionsDeserializer(item);
  });
}

/** Version information about a product/service that is compatible with a service mesh revision. */
export interface CompatibleVersions {
  /** The product/service name. */
  name?: string;
  /** Product/service versions compatible with a service mesh add-on revision. */
  versions?: string[];
}

export function compatibleVersionsDeserializer(item: any): CompatibleVersions {
  return {
    name: item["name"],
    versions: !item["versions"]
      ? item["versions"]
      : item["versions"].map((p: any) => {
          return p;
        }),
  };
}

/** Holds an array of MeshRevisionsProfiles */
export interface _MeshRevisionProfileList {
  /** The MeshRevisionProfile items on this page */
  value: MeshRevisionProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _meshRevisionProfileListDeserializer(item: any): _MeshRevisionProfileList {
  return {
    value: meshRevisionProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function meshRevisionProfileArrayDeserializer(result: Array<MeshRevisionProfile>): any[] {
  return result.map((item) => {
    return meshRevisionProfileDeserializer(item);
  });
}

/** Upgrade profile for given mesh. */
export interface MeshUpgradeProfile extends ProxyResource {
  /** Mesh upgrade profile properties for a major.minor release. */
  properties?: MeshUpgradeProfileProperties;
}

export function meshUpgradeProfileDeserializer(item: any): MeshUpgradeProfile {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : meshUpgradeProfilePropertiesDeserializer(item["properties"]),
  };
}

/** Mesh upgrade profile properties for a major.minor release. */
export interface MeshUpgradeProfileProperties extends MeshRevision {}

export function meshUpgradeProfilePropertiesDeserializer(item: any): MeshUpgradeProfileProperties {
  return {
    revision: item["revision"],
    upgrades: !item["upgrades"]
      ? item["upgrades"]
      : item["upgrades"].map((p: any) => {
          return p;
        }),
    compatibleWith: !item["compatibleWith"]
      ? item["compatibleWith"]
      : compatibleVersionsArrayDeserializer(item["compatibleWith"]),
  };
}

/** Holds an array of MeshUpgradeProfiles */
export interface _MeshUpgradeProfileList {
  /** The MeshUpgradeProfile items on this page */
  value: MeshUpgradeProfile[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _meshUpgradeProfileListDeserializer(item: any): _MeshUpgradeProfileList {
  return {
    value: meshUpgradeProfileArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function meshUpgradeProfileArrayDeserializer(result: Array<MeshUpgradeProfile>): any[] {
  return result.map((item) => {
    return meshUpgradeProfileDeserializer(item);
  });
}

/** Hold values properties, which is array of KubernetesVersion */
export interface KubernetesVersionListResult {
  /** Array of AKS supported Kubernetes versions. */
  values?: KubernetesVersion[];
}

export function kubernetesVersionListResultDeserializer(item: any): KubernetesVersionListResult {
  return {
    values: !item["values"] ? item["values"] : kubernetesVersionArrayDeserializer(item["values"]),
  };
}

export function kubernetesVersionArrayDeserializer(result: Array<KubernetesVersion>): any[] {
  return result.map((item) => {
    return kubernetesVersionDeserializer(item);
  });
}

/** Kubernetes version profile for given major.minor release. */
export interface KubernetesVersion {
  /** major.minor version of Kubernetes release */
  version?: string;
  /** Capabilities on this Kubernetes version. */
  capabilities?: KubernetesVersionCapabilities;
  /** Whether this version is default. */
  isDefault?: boolean;
  /** Whether this version is in preview mode. */
  isPreview?: boolean;
  /** Patch versions of Kubernetes release */
  patchVersions?: Record<string, KubernetesPatchVersion>;
}

export function kubernetesVersionDeserializer(item: any): KubernetesVersion {
  return {
    version: item["version"],
    capabilities: !item["capabilities"]
      ? item["capabilities"]
      : kubernetesVersionCapabilitiesDeserializer(item["capabilities"]),
    isDefault: item["isDefault"],
    isPreview: item["isPreview"],
    patchVersions: !item["patchVersions"]
      ? item["patchVersions"]
      : kubernetesPatchVersionRecordDeserializer(item["patchVersions"]),
  };
}

/** Capabilities on this Kubernetes version. */
export interface KubernetesVersionCapabilities {
  supportPlan?: KubernetesSupportPlan[];
}

export function kubernetesVersionCapabilitiesDeserializer(
  item: any,
): KubernetesVersionCapabilities {
  return {
    supportPlan: !item["supportPlan"]
      ? item["supportPlan"]
      : item["supportPlan"].map((p: any) => {
          return p;
        }),
  };
}

export function kubernetesPatchVersionRecordDeserializer(
  item: Record<string, any>,
): Record<string, KubernetesPatchVersion> {
  const result: Record<string, any> = {};
  Object.keys(item).map((key) => {
    result[key] = !item[key] ? item[key] : kubernetesPatchVersionDeserializer(item[key]);
  });
  return result;
}

/** Kubernetes patch version profile */
export interface KubernetesPatchVersion {
  /** Possible upgrade path for given patch version */
  upgrades?: string[];
}

export function kubernetesPatchVersionDeserializer(item: any): KubernetesPatchVersion {
  return {
    upgrades: !item["upgrades"]
      ? item["upgrades"]
      : item["upgrades"].map((p: any) => {
          return p;
        }),
  };
}

/** Planned maintenance configuration, used to configure when updates can be deployed to a Managed Cluster. See [planned maintenance](https://docs.microsoft.com/azure/aks/planned-maintenance) for more information about planned maintenance. */
export interface MaintenanceConfiguration extends ProxyResource {
  /** Time slots during the week when planned maintenance is allowed to proceed. If two array entries specify the same day of the week, the applied configuration is the union of times in both entries. */
  timeInWeek?: TimeInWeek[];
  /** Time slots on which upgrade is not allowed. */
  notAllowedTime?: TimeSpan[];
  /** Maintenance window for the maintenance configuration. */
  maintenanceWindow?: MaintenanceWindow;
}

export function maintenanceConfigurationSerializer(item: MaintenanceConfiguration): any {
  return {
    properties: areAllPropsUndefined(item, ["timeInWeek", "notAllowedTime", "maintenanceWindow"])
      ? undefined
      : _maintenanceConfigurationPropertiesSerializer(item),
  };
}

export function maintenanceConfigurationDeserializer(item: any): MaintenanceConfiguration {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _maintenanceConfigurationPropertiesDeserializer(item["properties"])),
  };
}

/** Properties used to configure planned maintenance for a Managed Cluster. */
export interface MaintenanceConfigurationProperties {
  /** Time slots during the week when planned maintenance is allowed to proceed. If two array entries specify the same day of the week, the applied configuration is the union of times in both entries. */
  timeInWeek?: TimeInWeek[];
  /** Time slots on which upgrade is not allowed. */
  notAllowedTime?: TimeSpan[];
  /** Maintenance window for the maintenance configuration. */
  maintenanceWindow?: MaintenanceWindow;
}

export function maintenanceConfigurationPropertiesSerializer(
  item: MaintenanceConfigurationProperties,
): any {
  return {
    timeInWeek: !item["timeInWeek"]
      ? item["timeInWeek"]
      : timeInWeekArraySerializer(item["timeInWeek"]),
    notAllowedTime: !item["notAllowedTime"]
      ? item["notAllowedTime"]
      : timeSpanArraySerializer(item["notAllowedTime"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
  };
}

export function maintenanceConfigurationPropertiesDeserializer(
  item: any,
): MaintenanceConfigurationProperties {
  return {
    timeInWeek: !item["timeInWeek"]
      ? item["timeInWeek"]
      : timeInWeekArrayDeserializer(item["timeInWeek"]),
    notAllowedTime: !item["notAllowedTime"]
      ? item["notAllowedTime"]
      : timeSpanArrayDeserializer(item["notAllowedTime"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
  };
}

export function timeInWeekArraySerializer(result: Array<TimeInWeek>): any[] {
  return result.map((item) => {
    return timeInWeekSerializer(item);
  });
}

export function timeInWeekArrayDeserializer(result: Array<TimeInWeek>): any[] {
  return result.map((item) => {
    return timeInWeekDeserializer(item);
  });
}

/** Time in a week. */
export interface TimeInWeek {
  /** The day of the week. */
  day?: WeekDay;
  /** A list of hours in the day used to identify a time range. Each integer hour represents a time range beginning at 0m after the hour ending at the next hour (non-inclusive). 0 corresponds to 00:00 UTC, 23 corresponds to 23:00 UTC. Specifying [0, 1] means the 00:00 - 02:00 UTC time range. */
  hourSlots?: number[];
}

export function timeInWeekSerializer(item: TimeInWeek): any {
  return {
    day: item["day"],
    hourSlots: !item["hourSlots"]
      ? item["hourSlots"]
      : item["hourSlots"].map((p: any) => {
          return p;
        }),
  };
}

export function timeInWeekDeserializer(item: any): TimeInWeek {
  return {
    day: item["day"],
    hourSlots: !item["hourSlots"]
      ? item["hourSlots"]
      : item["hourSlots"].map((p: any) => {
          return p;
        }),
  };
}

/** The weekday enum. */
export enum KnownWeekDay {
  /** Sunday */
  Sunday = "Sunday",
  /** Monday */
  Monday = "Monday",
  /** Tuesday */
  Tuesday = "Tuesday",
  /** Wednesday */
  Wednesday = "Wednesday",
  /** Thursday */
  Thursday = "Thursday",
  /** Friday */
  Friday = "Friday",
  /** Saturday */
  Saturday = "Saturday",
}

/**
 * The weekday enum. \
 * {@link KnownWeekDay} can be used interchangeably with WeekDay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sunday** \
 * **Monday** \
 * **Tuesday** \
 * **Wednesday** \
 * **Thursday** \
 * **Friday** \
 * **Saturday**
 */
export type WeekDay = string;

export function timeSpanArraySerializer(result: Array<TimeSpan>): any[] {
  return result.map((item) => {
    return timeSpanSerializer(item);
  });
}

export function timeSpanArrayDeserializer(result: Array<TimeSpan>): any[] {
  return result.map((item) => {
    return timeSpanDeserializer(item);
  });
}

/** A time range. For example, between 2021-05-25T13:00:00Z and 2021-05-25T14:00:00Z. */
export interface TimeSpan {
  /** The start of a time span */
  start?: Date;
  /** The end of a time span */
  end?: Date;
}

export function timeSpanSerializer(item: TimeSpan): any {
  return {
    start: !item["start"] ? item["start"] : item["start"].toISOString(),
    end: !item["end"] ? item["end"] : item["end"].toISOString(),
  };
}

export function timeSpanDeserializer(item: any): TimeSpan {
  return {
    start: !item["start"] ? item["start"] : new Date(item["start"]),
    end: !item["end"] ? item["end"] : new Date(item["end"]),
  };
}

/** Maintenance window used to configure scheduled auto-upgrade for a Managed Cluster. */
export interface MaintenanceWindow {
  /** Recurrence schedule for the maintenance window. */
  schedule: Schedule;
  /** Length of maintenance window range from 4 to 24 hours. */
  durationHours: number;
  /** The UTC offset in format +/-HH:mm. For example, '+05:30' for IST and '-07:00' for PST. If not specified, the default is '+00:00'. */
  utcOffset?: string;
  /** The date the maintenance window activates. If the current date is before this date, the maintenance window is inactive and will not be used for upgrades. If not specified, the maintenance window will be active right away. */
  startDate?: Date;
  /** The start time of the maintenance window. Accepted values are from '00:00' to '23:59'. 'utcOffset' applies to this field. For example: '02:00' with 'utcOffset: +02:00' means UTC time '00:00'. */
  startTime: string;
  /** Date ranges on which upgrade is not allowed. 'utcOffset' applies to this field. For example, with 'utcOffset: +02:00' and 'dateSpan' being '2022-12-23' to '2023-01-03', maintenance will be blocked from '2022-12-22 22:00' to '2023-01-03 22:00' in UTC time. */
  notAllowedDates?: DateSpan[];
}

export function maintenanceWindowSerializer(item: MaintenanceWindow): any {
  return {
    schedule: scheduleSerializer(item["schedule"]),
    durationHours: item["durationHours"],
    utcOffset: item["utcOffset"],
    startDate: !item["startDate"]
      ? item["startDate"]
      : item["startDate"].toISOString().split("T")[0],
    startTime: item["startTime"],
    notAllowedDates: !item["notAllowedDates"]
      ? item["notAllowedDates"]
      : dateSpanArraySerializer(item["notAllowedDates"]),
  };
}

export function maintenanceWindowDeserializer(item: any): MaintenanceWindow {
  return {
    schedule: scheduleDeserializer(item["schedule"]),
    durationHours: item["durationHours"],
    utcOffset: item["utcOffset"],
    startDate: !item["startDate"] ? item["startDate"] : new Date(item["startDate"]),
    startTime: item["startTime"],
    notAllowedDates: !item["notAllowedDates"]
      ? item["notAllowedDates"]
      : dateSpanArrayDeserializer(item["notAllowedDates"]),
  };
}

/** One and only one of the schedule types should be specified. Choose either 'daily', 'weekly', 'absoluteMonthly' or 'relativeMonthly' for your maintenance schedule. */
export interface Schedule {
  /** For schedules like: 'recur every day' or 'recur every 3 days'. */
  daily?: DailySchedule;
  /** For schedules like: 'recur every Monday' or 'recur every 3 weeks on Wednesday'. */
  weekly?: WeeklySchedule;
  /** For schedules like: 'recur every month on the 15th' or 'recur every 3 months on the 20th'. */
  absoluteMonthly?: AbsoluteMonthlySchedule;
  /** For schedules like: 'recur every month on the first Monday' or 'recur every 3 months on last Friday'. */
  relativeMonthly?: RelativeMonthlySchedule;
}

export function scheduleSerializer(item: Schedule): any {
  return {
    daily: !item["daily"] ? item["daily"] : dailyScheduleSerializer(item["daily"]),
    weekly: !item["weekly"] ? item["weekly"] : weeklyScheduleSerializer(item["weekly"]),
    absoluteMonthly: !item["absoluteMonthly"]
      ? item["absoluteMonthly"]
      : absoluteMonthlyScheduleSerializer(item["absoluteMonthly"]),
    relativeMonthly: !item["relativeMonthly"]
      ? item["relativeMonthly"]
      : relativeMonthlyScheduleSerializer(item["relativeMonthly"]),
  };
}

export function scheduleDeserializer(item: any): Schedule {
  return {
    daily: !item["daily"] ? item["daily"] : dailyScheduleDeserializer(item["daily"]),
    weekly: !item["weekly"] ? item["weekly"] : weeklyScheduleDeserializer(item["weekly"]),
    absoluteMonthly: !item["absoluteMonthly"]
      ? item["absoluteMonthly"]
      : absoluteMonthlyScheduleDeserializer(item["absoluteMonthly"]),
    relativeMonthly: !item["relativeMonthly"]
      ? item["relativeMonthly"]
      : relativeMonthlyScheduleDeserializer(item["relativeMonthly"]),
  };
}

/** For schedules like: 'recur every day' or 'recur every 3 days'. */
export interface DailySchedule {
  /** Specifies the number of days between each set of occurrences. */
  intervalDays: number;
}

export function dailyScheduleSerializer(item: DailySchedule): any {
  return { intervalDays: item["intervalDays"] };
}

export function dailyScheduleDeserializer(item: any): DailySchedule {
  return {
    intervalDays: item["intervalDays"],
  };
}

/** For schedules like: 'recur every Monday' or 'recur every 3 weeks on Wednesday'. */
export interface WeeklySchedule {
  /** Specifies the number of weeks between each set of occurrences. */
  intervalWeeks: number;
  /** Specifies on which day of the week the maintenance occurs. */
  dayOfWeek: WeekDay;
}

export function weeklyScheduleSerializer(item: WeeklySchedule): any {
  return { intervalWeeks: item["intervalWeeks"], dayOfWeek: item["dayOfWeek"] };
}

export function weeklyScheduleDeserializer(item: any): WeeklySchedule {
  return {
    intervalWeeks: item["intervalWeeks"],
    dayOfWeek: item["dayOfWeek"],
  };
}

/** For schedules like: 'recur every month on the 15th' or 'recur every 3 months on the 20th'. */
export interface AbsoluteMonthlySchedule {
  /** Specifies the number of months between each set of occurrences. */
  intervalMonths: number;
  /** The date of the month. */
  dayOfMonth: number;
}

export function absoluteMonthlyScheduleSerializer(item: AbsoluteMonthlySchedule): any {
  return { intervalMonths: item["intervalMonths"], dayOfMonth: item["dayOfMonth"] };
}

export function absoluteMonthlyScheduleDeserializer(item: any): AbsoluteMonthlySchedule {
  return {
    intervalMonths: item["intervalMonths"],
    dayOfMonth: item["dayOfMonth"],
  };
}

/** For schedules like: 'recur every month on the first Monday' or 'recur every 3 months on last Friday'. */
export interface RelativeMonthlySchedule {
  /** Specifies the number of months between each set of occurrences. */
  intervalMonths: number;
  /** The week index. Specifies on which week of the month the dayOfWeek applies. */
  weekIndex: Type;
  /** Specifies on which day of the week the maintenance occurs. */
  dayOfWeek: WeekDay;
}

export function relativeMonthlyScheduleSerializer(item: RelativeMonthlySchedule): any {
  return {
    intervalMonths: item["intervalMonths"],
    weekIndex: item["weekIndex"],
    dayOfWeek: item["dayOfWeek"],
  };
}

export function relativeMonthlyScheduleDeserializer(item: any): RelativeMonthlySchedule {
  return {
    intervalMonths: item["intervalMonths"],
    weekIndex: item["weekIndex"],
    dayOfWeek: item["dayOfWeek"],
  };
}

/** The week index. Specifies on which week of the month the dayOfWeek applies. */
export enum KnownType {
  /** First week of the month. */
  First = "First",
  /** Second week of the month. */
  Second = "Second",
  /** Third week of the month. */
  Third = "Third",
  /** Fourth week of the month. */
  Fourth = "Fourth",
  /** Last week of the month. */
  Last = "Last",
}

/**
 * The week index. Specifies on which week of the month the dayOfWeek applies. \
 * {@link KnownType} can be used interchangeably with Type,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **First**: First week of the month. \
 * **Second**: Second week of the month. \
 * **Third**: Third week of the month. \
 * **Fourth**: Fourth week of the month. \
 * **Last**: Last week of the month.
 */
export type Type = string;

export function dateSpanArraySerializer(result: Array<DateSpan>): any[] {
  return result.map((item) => {
    return dateSpanSerializer(item);
  });
}

export function dateSpanArrayDeserializer(result: Array<DateSpan>): any[] {
  return result.map((item) => {
    return dateSpanDeserializer(item);
  });
}

/** A date range. For example, between '2022-12-23' and '2023-01-05'. */
export interface DateSpan {
  /** The start date of the date span. */
  start: Date;
  /** The end date of the date span. */
  end: Date;
}

export function dateSpanSerializer(item: DateSpan): any {
  return {
    start: item["start"].toISOString().split("T")[0],
    end: item["end"].toISOString().split("T")[0],
  };
}

export function dateSpanDeserializer(item: any): DateSpan {
  return {
    start: new Date(item["start"]),
    end: new Date(item["end"]),
  };
}

/** The response of a MaintenanceConfiguration list operation. */
export interface _MaintenanceConfigurationListResult {
  /** The MaintenanceConfiguration items on this page */
  value: MaintenanceConfiguration[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _maintenanceConfigurationListResultDeserializer(
  item: any,
): _MaintenanceConfigurationListResult {
  return {
    value: maintenanceConfigurationArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function maintenanceConfigurationArraySerializer(
  result: Array<MaintenanceConfiguration>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationSerializer(item);
  });
}

export function maintenanceConfigurationArrayDeserializer(
  result: Array<MaintenanceConfiguration>,
): any[] {
  return result.map((item) => {
    return maintenanceConfigurationDeserializer(item);
  });
}

/** Namespace managed by ARM. */
export interface ManagedNamespace extends Resource {
  /** Properties of a namespace. */
  properties?: NamespaceProperties;
  /** Resource tags. */
  tags?: Record<string, string>;
  /** The geo-location where the resource lives */
  location?: string;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function managedNamespaceSerializer(item: ManagedNamespace): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : namespacePropertiesSerializer(item["properties"]),
    tags: item["tags"],
    location: item["location"],
  };
}

export function managedNamespaceDeserializer(item: any): ManagedNamespace {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : namespacePropertiesDeserializer(item["properties"]),
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    location: item["location"],
    eTag: item["eTag"],
  };
}

/** Properties of a namespace managed by ARM */
export interface NamespaceProperties {
  /** The current provisioning state of the namespace. */
  readonly provisioningState?: NamespaceProvisioningState;
  /** The labels of managed namespace. */
  labels?: Record<string, string>;
  /** The annotations of managed namespace. */
  annotations?: Record<string, string>;
  /** The special FQDN used by the Azure Portal to access the Managed Cluster. This FQDN is for use only by the Azure Portal and should not be used by other clients. The Azure Portal requires certain Cross-Origin Resource Sharing (CORS) headers to be sent in some responses, which Kubernetes APIServer doesn't handle by default. This special FQDN supports CORS, allowing the Azure Portal to function properly. */
  readonly portalFqdn?: string;
  /** The default resource quota enforced upon the namespace. Customers can have other Kubernetes resource quota objects under the namespace. Resource quotas are additive; if multiple resource quotas are applied to a given namespace, then the effective limit will be one such that all quotas on the namespace can be satisfied. */
  defaultResourceQuota?: ResourceQuota;
  /** The default network policy enforced upon the namespace. Customers can have other Kubernetes network policy objects under the namespace. Network policies are additive; if a policy or policies apply to a given pod for a given direction, the connections allowed in that direction for the pod is the union of what all applicable policies allow. */
  defaultNetworkPolicy?: NetworkPolicies;
  /** Action if Kubernetes namespace with same name already exists. */
  adoptionPolicy?: AdoptionPolicy;
  /** Delete options of a namespace. */
  deletePolicy?: DeletePolicy;
}

export function namespacePropertiesSerializer(item: NamespaceProperties): any {
  return {
    labels: item["labels"],
    annotations: item["annotations"],
    defaultResourceQuota: !item["defaultResourceQuota"]
      ? item["defaultResourceQuota"]
      : resourceQuotaSerializer(item["defaultResourceQuota"]),
    defaultNetworkPolicy: !item["defaultNetworkPolicy"]
      ? item["defaultNetworkPolicy"]
      : networkPoliciesSerializer(item["defaultNetworkPolicy"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
  };
}

export function namespacePropertiesDeserializer(item: any): NamespaceProperties {
  return {
    provisioningState: item["provisioningState"],
    labels: !item["labels"]
      ? item["labels"]
      : Object.fromEntries(Object.entries(item["labels"]).map(([k, p]: [string, any]) => [k, p])),
    annotations: !item["annotations"]
      ? item["annotations"]
      : Object.fromEntries(
          Object.entries(item["annotations"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    portalFqdn: item["portalFqdn"],
    defaultResourceQuota: !item["defaultResourceQuota"]
      ? item["defaultResourceQuota"]
      : resourceQuotaDeserializer(item["defaultResourceQuota"]),
    defaultNetworkPolicy: !item["defaultNetworkPolicy"]
      ? item["defaultNetworkPolicy"]
      : networkPoliciesDeserializer(item["defaultNetworkPolicy"]),
    adoptionPolicy: item["adoptionPolicy"],
    deletePolicy: item["deletePolicy"],
  };
}

/** The current provisioning state of the namespace. */
export enum KnownNamespaceProvisioningState {
  /** Updating */
  Updating = "Updating",
  /** Deleting */
  Deleting = "Deleting",
  /** Creating */
  Creating = "Creating",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Failed */
  Failed = "Failed",
  /** Canceled */
  Canceled = "Canceled",
}

/**
 * The current provisioning state of the namespace. \
 * {@link KnownNamespaceProvisioningState} can be used interchangeably with NamespaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating** \
 * **Deleting** \
 * **Creating** \
 * **Succeeded** \
 * **Failed** \
 * **Canceled**
 */
export type NamespaceProvisioningState = string;

/** Resource quota for the namespace. */
export interface ResourceQuota {
  /** CPU request of the namespace in one-thousandth CPU form. See [CPU resource units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu) for more details. */
  cpuRequest?: string;
  /** CPU limit of the namespace in one-thousandth CPU form. See [CPU resource units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-cpu) for more details. */
  cpuLimit?: string;
  /** Memory request of the namespace in the power-of-two equivalents form: Ei, Pi, Ti, Gi, Mi, Ki. See [Memory resource units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory) for more details. */
  memoryRequest?: string;
  /** Memory limit of the namespace in the power-of-two equivalents form: Ei, Pi, Ti, Gi, Mi, Ki. See [Memory resource units](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#meaning-of-memory) for more details. */
  memoryLimit?: string;
}

export function resourceQuotaSerializer(item: ResourceQuota): any {
  return {
    cpuRequest: item["cpuRequest"],
    cpuLimit: item["cpuLimit"],
    memoryRequest: item["memoryRequest"],
    memoryLimit: item["memoryLimit"],
  };
}

export function resourceQuotaDeserializer(item: any): ResourceQuota {
  return {
    cpuRequest: item["cpuRequest"],
    cpuLimit: item["cpuLimit"],
    memoryRequest: item["memoryRequest"],
    memoryLimit: item["memoryLimit"],
  };
}

/** Default network policy of the namespace, specifying ingress and egress rules. */
export interface NetworkPolicies {
  /** Enum representing different network policy rules. */
  ingress?: PolicyRule;
  /** Enum representing different network policy rules. */
  egress?: PolicyRule;
}

export function networkPoliciesSerializer(item: NetworkPolicies): any {
  return { ingress: item["ingress"], egress: item["egress"] };
}

export function networkPoliciesDeserializer(item: any): NetworkPolicies {
  return {
    ingress: item["ingress"],
    egress: item["egress"],
  };
}

/** Enum representing different network policy rules. */
export enum KnownPolicyRule {
  /** Deny all network traffic. */
  DenyAll = "DenyAll",
  /** Allow all network traffic. */
  AllowAll = "AllowAll",
  /** Allow traffic within the same namespace. */
  AllowSameNamespace = "AllowSameNamespace",
}

/**
 * Enum representing different network policy rules. \
 * {@link KnownPolicyRule} can be used interchangeably with PolicyRule,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **DenyAll**: Deny all network traffic. \
 * **AllowAll**: Allow all network traffic. \
 * **AllowSameNamespace**: Allow traffic within the same namespace.
 */
export type PolicyRule = string;

/** Action if Kubernetes namespace with same name already exists. */
export enum KnownAdoptionPolicy {
  /** If the namespace already exists in Kubernetes, attempts to create that same namespace in ARM will fail. */
  Never = "Never",
  /** Take over the existing namespace to be managed by ARM, if there is no difference. */
  IfIdentical = "IfIdentical",
  /** Always take over the existing namespace to be managed by ARM, some fields might be overwritten. */
  Always = "Always",
}

/**
 * Action if Kubernetes namespace with same name already exists. \
 * {@link KnownAdoptionPolicy} can be used interchangeably with AdoptionPolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Never**: If the namespace already exists in Kubernetes, attempts to create that same namespace in ARM will fail. \
 * **IfIdentical**: Take over the existing namespace to be managed by ARM, if there is no difference. \
 * **Always**: Always take over the existing namespace to be managed by ARM, some fields might be overwritten.
 */
export type AdoptionPolicy = string;

/** Delete options of a namespace. */
export enum KnownDeletePolicy {
  /** Only delete the ARM resource, keep the Kubernetes namespace. Also delete the ManagedByARM label. */
  Keep = "Keep",
  /** Delete both the ARM resource and the Kubernetes namespace together. */
  Delete = "Delete",
}

/**
 * Delete options of a namespace. \
 * {@link KnownDeletePolicy} can be used interchangeably with DeletePolicy,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Keep**: Only delete the ARM resource, keep the Kubernetes namespace. Also delete the ManagedByARM label. \
 * **Delete**: Delete both the ARM resource and the Kubernetes namespace together.
 */
export type DeletePolicy = string;

/** The response of a ManagedNamespace list operation. */
export interface _ManagedNamespaceListResult {
  /** The ManagedNamespace items on this page */
  value: ManagedNamespace[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedNamespaceListResultDeserializer(item: any): _ManagedNamespaceListResult {
  return {
    value: managedNamespaceArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedNamespaceArraySerializer(result: Array<ManagedNamespace>): any[] {
  return result.map((item) => {
    return managedNamespaceSerializer(item);
  });
}

export function managedNamespaceArrayDeserializer(result: Array<ManagedNamespace>): any[] {
  return result.map((item) => {
    return managedNamespaceDeserializer(item);
  });
}

/** A machine. Contains details about the underlying virtual machine. A machine may be visible here but not in kubectl get nodes; if so it may be because the machine has not been registered with the Kubernetes API Server yet. */
export interface Machine extends ProxyResource {
  /** The properties of the machine */
  properties?: MachineProperties;
  /** The Availability zone in which machine is located. */
  readonly zones?: string[];
}

export function machineSerializer(item: Machine): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : machinePropertiesSerializer(item["properties"]),
  };
}

export function machineDeserializer(item: any): Machine {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : machinePropertiesDeserializer(item["properties"]),
    zones: !item["zones"]
      ? item["zones"]
      : item["zones"].map((p: any) => {
          return p;
        }),
  };
}

/** The properties of the machine */
export interface MachineProperties {
  /** network properties of the machine */
  readonly network?: MachineNetworkProperties;
  /** Azure resource id of the machine. It can be used to GET underlying VM Instance */
  readonly resourceId?: string;
  /** The hardware and GPU settings of the machine. */
  hardware?: MachineHardwareProfile;
  /** The operating system and disk used by the machine. */
  operatingSystem?: MachineOSProfile;
  /** The Kubernetes configurations used by the machine. */
  kubernetes?: MachineKubernetesProfile;
  /** Machine only allows 'System' and 'User' mode. */
  mode?: AgentPoolMode;
  /** The security settings of the machine. */
  security?: MachineSecurityProfile;
  /** The priority for the machine. If not specified, the default is 'Regular'. */
  priority?: ScaleSetPriority;
  /** The version of node image. */
  readonly nodeImageVersion?: string;
  /** The current deployment or provisioning state. */
  readonly provisioningState?: string;
  /** The tags to be persisted on the machine. */
  tags?: Record<string, string>;
  /** Unique read-only string used to implement optimistic concurrency. The eTag value will change when the resource is updated. Specify an if-match or if-none-match header with the eTag value for a subsequent request to enable optimistic concurrency per the normal eTag convention. */
  readonly eTag?: string;
  /** Contains read-only information about the machine. */
  readonly status?: MachineStatus;
}

export function machinePropertiesSerializer(item: MachineProperties): any {
  return {
    hardware: !item["hardware"]
      ? item["hardware"]
      : machineHardwareProfileSerializer(item["hardware"]),
    operatingSystem: !item["operatingSystem"]
      ? item["operatingSystem"]
      : machineOSProfileSerializer(item["operatingSystem"]),
    kubernetes: !item["kubernetes"]
      ? item["kubernetes"]
      : machineKubernetesProfileSerializer(item["kubernetes"]),
    mode: item["mode"],
    security: !item["security"]
      ? item["security"]
      : machineSecurityProfileSerializer(item["security"]),
    priority: item["priority"],
    tags: item["tags"],
  };
}

export function machinePropertiesDeserializer(item: any): MachineProperties {
  return {
    network: !item["network"]
      ? item["network"]
      : machineNetworkPropertiesDeserializer(item["network"]),
    resourceId: item["resourceId"],
    hardware: !item["hardware"]
      ? item["hardware"]
      : machineHardwareProfileDeserializer(item["hardware"]),
    operatingSystem: !item["operatingSystem"]
      ? item["operatingSystem"]
      : machineOSProfileDeserializer(item["operatingSystem"]),
    kubernetes: !item["kubernetes"]
      ? item["kubernetes"]
      : machineKubernetesProfileDeserializer(item["kubernetes"]),
    mode: item["mode"],
    security: !item["security"]
      ? item["security"]
      : machineSecurityProfileDeserializer(item["security"]),
    priority: item["priority"],
    nodeImageVersion: item["nodeImageVersion"],
    provisioningState: item["provisioningState"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    eTag: item["eTag"],
    status: !item["status"] ? item["status"] : machineStatusDeserializer(item["status"]),
  };
}

/** network properties of the machine */
export interface MachineNetworkProperties {
  /** IPv4, IPv6 addresses of the machine */
  readonly ipAddresses?: MachineIpAddress[];
  /** The ID of the subnet which node and optionally pods will join on startup. If this is not specified, a VNET and subnet will be generated and used. If no podSubnetID is specified, this applies to nodes and pods, otherwise it applies to just nodes. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  vnetSubnetID?: string;
  /** The ID of the subnet which pods will join when launched. If omitted, pod IPs are statically assigned on the node subnet (see vnetSubnetID for more details). This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/subnets/{subnetName} */
  podSubnetID?: string;
  /** Whether the machine is allocated its own public IP. Some scenarios may require the machine to receive their own dedicated public IP addresses. A common scenario is for gaming workloads, where a console needs to make a direct connection to a cloud virtual machine to minimize hops. The default is false. */
  enableNodePublicIP?: boolean;
  /** The public IP prefix ID which VM node should use IPs from. This is of the form: /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/publicIPPrefixes/{publicIPPrefixName} */
  nodePublicIPPrefixID?: string;
  /** IPTags of instance-level public IPs. */
  nodePublicIPTags?: IPTag[];
}

export function machineNetworkPropertiesDeserializer(item: any): MachineNetworkProperties {
  return {
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : machineIpAddressArrayDeserializer(item["ipAddresses"]),
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    nodePublicIPTags: !item["nodePublicIPTags"]
      ? item["nodePublicIPTags"]
      : ipTagArrayDeserializer(item["nodePublicIPTags"]),
  };
}

export function machineIpAddressArrayDeserializer(result: Array<MachineIpAddress>): any[] {
  return result.map((item) => {
    return machineIpAddressDeserializer(item);
  });
}

/** The machine IP address details. */
export interface MachineIpAddress {
  /** To determine if address belongs IPv4 or IPv6 family */
  readonly family?: IpFamily;
  /** IPv4 or IPv6 address of the machine */
  readonly ip?: string;
}

export function machineIpAddressDeserializer(item: any): MachineIpAddress {
  return {
    family: item["family"],
    ip: item["ip"],
  };
}

/** The hardware and GPU settings of the machine. */
export interface MachineHardwareProfile {
  /** The size of the VM. VM size availability varies by region. If a node contains insufficient compute resources (memory, cpu, etc) pods might fail to run correctly. For more details on restricted VM sizes, see: https://docs.microsoft.com/azure/aks/quotas-skus-regions */
  vmSize?: string;
  /** GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. */
  gpuInstanceProfile?: GPUInstanceProfile;
  /** The GPU settings of the machine. */
  gpuProfile?: GPUProfile;
}

export function machineHardwareProfileSerializer(item: MachineHardwareProfile): any {
  return {
    vmSize: item["vmSize"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    gpuProfile: !item["gpuProfile"] ? item["gpuProfile"] : gpuProfileSerializer(item["gpuProfile"]),
  };
}

export function machineHardwareProfileDeserializer(item: any): MachineHardwareProfile {
  return {
    vmSize: item["vmSize"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    gpuProfile: !item["gpuProfile"]
      ? item["gpuProfile"]
      : gpuProfileDeserializer(item["gpuProfile"]),
  };
}

/** The operating system and disk used by the machine. */
export interface MachineOSProfile {
  /** The operating system type. The default is Linux. */
  osType?: OSType;
  /** Specifies the OS SKU used by the agent pool. If not specified, the default is Ubuntu if OSType=Linux or Windows2019 if OSType=Windows. And the default Windows OSSKU will be changed to Windows2022 after Windows2019 is deprecated. */
  osSKU?: Ossku;
  /** OS Disk Size in GB to be used to specify the disk size for every machine in the master/agent pool. If you specify 0, it will apply the default osDisk size according to the vmSize specified. */
  osDiskSizeGB?: number;
  /** The OS disk type to be used for machines in the agent pool. The default is 'Ephemeral' if the VM supports it and has a cache disk larger than the requested OSDiskSizeGB. Otherwise, defaults to 'Managed'. May not be changed after creation. For more information see [Ephemeral OS](https://docs.microsoft.com/azure/aks/cluster-configuration#ephemeral-os). */
  osDiskType?: OSDiskType;
  /** Whether to use a FIPS-enabled OS. */
  enableFips?: boolean;
  /** The Linux machine's specific profile. */
  linuxProfile?: MachineOSProfileLinuxProfile;
  /** The Windows machine's specific profile. */
  windowsProfile?: AgentPoolWindowsProfile;
}

export function machineOSProfileSerializer(item: MachineOSProfile): any {
  return {
    osType: item["osType"],
    osSKU: item["osSKU"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    enableFIPS: item["enableFips"],
    linuxProfile: !item["linuxProfile"]
      ? item["linuxProfile"]
      : machineOSProfileLinuxProfileSerializer(item["linuxProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileSerializer(item["windowsProfile"]),
  };
}

export function machineOSProfileDeserializer(item: any): MachineOSProfile {
  return {
    osType: item["osType"],
    osSKU: item["osSKU"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    enableFips: item["enableFIPS"],
    linuxProfile: !item["linuxProfile"]
      ? item["linuxProfile"]
      : machineOSProfileLinuxProfileDeserializer(item["linuxProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileDeserializer(item["windowsProfile"]),
  };
}

/** The Linux machine's specific profile. */
export interface MachineOSProfileLinuxProfile {
  /** The OS configuration of Linux machine. */
  linuxOSConfig?: LinuxOSConfig;
  /** Message of the day for Linux nodes, base64-encoded. A base64-encoded string which will be written to /etc/motd after decoding. This allows customization of the message of the day for Linux nodes. It must not be specified for Windows nodes. It must be a static string (i.e., will be printed raw and not be executed as a script). */
  messageOfTheDay?: string;
}

export function machineOSProfileLinuxProfileSerializer(item: MachineOSProfileLinuxProfile): any {
  return {
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigSerializer(item["linuxOSConfig"]),
    messageOfTheDay: item["messageOfTheDay"],
  };
}

export function machineOSProfileLinuxProfileDeserializer(item: any): MachineOSProfileLinuxProfile {
  return {
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigDeserializer(item["linuxOSConfig"]),
    messageOfTheDay: item["messageOfTheDay"],
  };
}

/** The Kubernetes configurations used by the machine. */
export interface MachineKubernetesProfile {
  /** The node labels on the machine. */
  nodeLabels?: Record<string, string>;
  /** The version of Kubernetes specified by the user. Both patch version <major.minor.patch> and <major.minor> are supported. When <major.minor> is specified, the latest supported patch version is chosen automatically. */
  orchestratorVersion?: string;
  /** The version of Kubernetes running on the machine. If orchestratorVersion was a fully specified version <major.minor.patch>, this field will be exactly equal to it. If orchestratorVersion was <major.minor>, this field will contain the full <major.minor.patch> version being used. */
  readonly currentOrchestratorVersion?: string;
  /** Determines the placement of emptyDir volumes, container runtime data root, and Kubelet ephemeral storage. */
  kubeletDiskType?: KubeletDiskType;
  /** The Kubelet configuration on the machine. */
  kubeletConfig?: KubeletConfig;
  /** Taints added on the node during creation that will not be reconciled by AKS. These taints will not be reconciled by AKS and can be removed with a kubectl call. These taints allow for required configuration to run before the node is ready to accept workloads, for example 'key1=value1:NoSchedule' that then can be removed with `kubectl taint nodes node1 key1=value1:NoSchedule-` */
  nodeInitializationTaints?: string[];
  /** The taints added to new node during machine create. For example, key=value:NoSchedule. */
  nodeTaints?: string[];
  /** The maximum number of pods that can run on a node. */
  maxPods?: number;
  /** The node name in the Kubernetes cluster. */
  readonly nodeName?: string;
  /** Determines the type of workload a node can run. */
  workloadRuntime?: WorkloadRuntime;
  /** Configuration for using artifact streaming on AKS. */
  artifactStreamingProfile?: AgentPoolArtifactStreamingProfile;
}

export function machineKubernetesProfileSerializer(item: MachineKubernetesProfile): any {
  return {
    nodeLabels: item["nodeLabels"],
    orchestratorVersion: item["orchestratorVersion"],
    kubeletDiskType: item["kubeletDiskType"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigSerializer(item["kubeletConfig"]),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    maxPods: item["maxPods"],
    workloadRuntime: item["workloadRuntime"],
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileSerializer(item["artifactStreamingProfile"]),
  };
}

export function machineKubernetesProfileDeserializer(item: any): MachineKubernetesProfile {
  return {
    nodeLabels: !item["nodeLabels"]
      ? item["nodeLabels"]
      : Object.fromEntries(
          Object.entries(item["nodeLabels"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    orchestratorVersion: item["orchestratorVersion"],
    currentOrchestratorVersion: item["currentOrchestratorVersion"],
    kubeletDiskType: item["kubeletDiskType"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigDeserializer(item["kubeletConfig"]),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    maxPods: item["maxPods"],
    nodeName: item["nodeName"],
    workloadRuntime: item["workloadRuntime"],
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileDeserializer(item["artifactStreamingProfile"]),
  };
}

/** The security settings of the machine. */
export interface MachineSecurityProfile {
  /** vTPM is a Trusted Launch feature for configuring a dedicated secure vault for keys and measurements held locally on the node. For more details, see aka.ms/aks/trustedlaunch. If not specified, the default is false. */
  enableVtpm?: boolean;
  /** Secure Boot is a feature of Trusted Launch which ensures that only signed operating systems and drivers can boot. For more details, see aka.ms/aks/trustedlaunch.  If not specified, the default is false. */
  enableSecureBoot?: boolean;
  /** SSH access method of an agent pool. */
  sshAccess?: AgentPoolSSHAccess;
  /** Whether to enable host based OS and data drive encryption. This is only supported on certain VM sizes and in certain Azure regions. For more information, see: https://docs.microsoft.com/azure/aks/enable-host-encryption */
  enableEncryptionAtHost?: boolean;
}

export function machineSecurityProfileSerializer(item: MachineSecurityProfile): any {
  return {
    enableVTPM: item["enableVtpm"],
    enableSecureBoot: item["enableSecureBoot"],
    sshAccess: item["sshAccess"],
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
  };
}

export function machineSecurityProfileDeserializer(item: any): MachineSecurityProfile {
  return {
    enableVtpm: item["enableVTPM"],
    enableSecureBoot: item["enableSecureBoot"],
    sshAccess: item["sshAccess"],
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
  };
}

/** Contains read-only information about the machine. */
export interface MachineStatus {
  /** The error details information of the machine. Preserves the detailed info of failure. If there was no error, this field is omitted. */
  readonly provisioningError?: ErrorDetail;
  /** Specifies the time at which the machine was created. */
  readonly creationTimestamp?: Date;
  /** The drift action of the machine. Indicates whether a machine has deviated from its expected state due to changes in managed cluster properties, requiring corrective action. */
  readonly driftAction?: DriftAction;
  /** Reason for machine drift. Provides detailed information on why the machine has drifted. This field is omitted if the machine is up to date. */
  readonly driftReason?: string;
  /** Virtual machine state. Indicates the current state of the underlying virtual machine. */
  readonly vmState?: VmState;
}

export function machineStatusDeserializer(item: any): MachineStatus {
  return {
    provisioningError: !item["provisioningError"]
      ? item["provisioningError"]
      : errorDetailDeserializer(item["provisioningError"]),
    creationTimestamp: !item["creationTimestamp"]
      ? item["creationTimestamp"]
      : new Date(item["creationTimestamp"]),
    driftAction: item["driftAction"],
    driftReason: item["driftReason"],
    vmState: item["vmState"],
  };
}

/** The drift action of the machine. Indicates whether a machine has deviated from its expected state due to changes in managed cluster properties, requiring corrective action. */
export enum KnownDriftAction {
  /** The machine is up to date. */
  Synced = "Synced",
  /** The machine has drifted and needs to be deleted and recreated. */
  Recreate = "Recreate",
}

/**
 * The drift action of the machine. Indicates whether a machine has deviated from its expected state due to changes in managed cluster properties, requiring corrective action. \
 * {@link KnownDriftAction} can be used interchangeably with DriftAction,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Synced**: The machine is up to date. \
 * **Recreate**: The machine has drifted and needs to be deleted and recreated.
 */
export type DriftAction = string;

/** Virtual machine state. Indicates the current state of the underlying virtual machine. */
export enum KnownVmState {
  /** The virtual machine is currently running. */
  Running = "Running",
  /** The virtual machine has been deleted by the user or due to spot eviction. */
  Deleted = "Deleted",
}

/**
 * Virtual machine state. Indicates the current state of the underlying virtual machine. \
 * {@link KnownVmState} can be used interchangeably with VmState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Running**: The virtual machine is currently running. \
 * **Deleted**: The virtual machine has been deleted by the user or due to spot eviction.
 */
export type VmState = string;

/** The response of a Machine list operation. */
export interface _MachineListResult {
  /** The Machine items on this page */
  value: Machine[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _machineListResultDeserializer(item: any): _MachineListResult {
  return {
    value: machineArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function machineArraySerializer(result: Array<Machine>): any[] {
  return result.map((item) => {
    return machineSerializer(item);
  });
}

export function machineArrayDeserializer(result: Array<Machine>): any[] {
  return result.map((item) => {
    return machineDeserializer(item);
  });
}

/** A private endpoint connection */
export interface PrivateEndpointConnection extends ProxyResource {
  /** The current provisioning state. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState?: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionSerializer(item: PrivateEndpointConnection): any {
  return {
    properties: areAllPropsUndefined(item, ["privateEndpoint", "privateLinkServiceConnectionState"])
      ? undefined
      : _privateEndpointConnectionPropertiesSerializer(item),
  };
}

export function privateEndpointConnectionDeserializer(item: any): PrivateEndpointConnection {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ...(!item["properties"]
      ? item["properties"]
      : _privateEndpointConnectionPropertiesDeserializer(item["properties"])),
  };
}

/** Properties of a private endpoint connection. */
export interface PrivateEndpointConnectionProperties {
  /** The current provisioning state. */
  readonly provisioningState?: PrivateEndpointConnectionProvisioningState;
  /** The resource of private endpoint. */
  privateEndpoint?: PrivateEndpoint;
  /** A collection of information about the state of the connection between service consumer and provider. */
  privateLinkServiceConnectionState: PrivateLinkServiceConnectionState;
}

export function privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnectionProperties,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateSerializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

export function privateEndpointConnectionPropertiesDeserializer(
  item: any,
): PrivateEndpointConnectionProperties {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: privateLinkServiceConnectionStateDeserializer(
      item["privateLinkServiceConnectionState"],
    ),
  };
}

/** The current provisioning state. */
export enum KnownPrivateEndpointConnectionProvisioningState {
  /** Canceled */
  Canceled = "Canceled",
  /** Creating */
  Creating = "Creating",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled** \
 * **Creating** \
 * **Deleting** \
 * **Failed** \
 * **Succeeded**
 */
export type PrivateEndpointConnectionProvisioningState = string;

/** Private endpoint which a connection belongs to. */
export interface PrivateEndpoint {
  /** The resource ID of the private endpoint */
  id?: string;
}

export function privateEndpointSerializer(item: PrivateEndpoint): any {
  return { id: item["id"] };
}

export function privateEndpointDeserializer(item: any): PrivateEndpoint {
  return {
    id: item["id"],
  };
}

/** The state of a private link service connection. */
export interface PrivateLinkServiceConnectionState {
  /** The private link service connection status. */
  status?: ConnectionStatus;
  /** The private link service connection description. */
  description?: string;
}

export function privateLinkServiceConnectionStateSerializer(
  item: PrivateLinkServiceConnectionState,
): any {
  return { status: item["status"], description: item["description"] };
}

export function privateLinkServiceConnectionStateDeserializer(
  item: any,
): PrivateLinkServiceConnectionState {
  return {
    status: item["status"],
    description: item["description"],
  };
}

/** The private link service connection status. */
export enum KnownConnectionStatus {
  /** Pending */
  Pending = "Pending",
  /** Approved */
  Approved = "Approved",
  /** Rejected */
  Rejected = "Rejected",
  /** Disconnected */
  Disconnected = "Disconnected",
}

/**
 * The private link service connection status. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending** \
 * **Approved** \
 * **Rejected** \
 * **Disconnected**
 */
export type ConnectionStatus = string;

/** A list of private endpoint connections */
export interface PrivateEndpointConnectionListResult {
  /** The collection value. */
  value?: PrivateEndpointConnection[];
}

export function privateEndpointConnectionListResultDeserializer(
  item: any,
): PrivateEndpointConnectionListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : privateEndpointConnectionArrayDeserializer(item["value"]),
  };
}

export function privateEndpointConnectionArraySerializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionSerializer(item);
  });
}

export function privateEndpointConnectionArrayDeserializer(
  result: Array<PrivateEndpointConnection>,
): any[] {
  return result.map((item) => {
    return privateEndpointConnectionDeserializer(item);
  });
}

/** A node pool snapshot resource. */
export interface Snapshot extends TrackedResource {
  /** CreationData to be used to specify the source agent pool resource ID to create this snapshot. */
  creationData?: CreationData;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: SnapshotType;
  /** The version of Kubernetes. */
  readonly kubernetesVersion?: string;
  /** The version of node image. */
  readonly nodeImageVersion?: string;
  /** The operating system type. The default is Linux. */
  readonly osType?: OSType;
  /** Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. */
  readonly osSku?: Ossku;
  /** The size of the VM. */
  readonly vmSize?: string;
  /** Whether to use a FIPS-enabled OS. */
  readonly enableFips?: boolean;
}

export function snapshotSerializer(item: Snapshot): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["creationData", "snapshotType"])
      ? undefined
      : _snapshotPropertiesSerializer(item),
  };
}

export function snapshotDeserializer(item: any): Snapshot {
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
      : _snapshotPropertiesDeserializer(item["properties"])),
  };
}

/** Properties used to configure a node pool snapshot. */
export interface SnapshotProperties {
  /** CreationData to be used to specify the source agent pool resource ID to create this snapshot. */
  creationData?: CreationData;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: SnapshotType;
  /** The version of Kubernetes. */
  readonly kubernetesVersion?: string;
  /** The version of node image. */
  readonly nodeImageVersion?: string;
  /** The operating system type. The default is Linux. */
  readonly osType?: OSType;
  /** Specifies the OS SKU used by the agent pool. The default is Ubuntu if OSType is Linux. The default is Windows2019 when Kubernetes <= 1.24 or Windows2022 when Kubernetes >= 1.25 if OSType is Windows. */
  readonly osSku?: Ossku;
  /** The size of the VM. */
  readonly vmSize?: string;
  /** Whether to use a FIPS-enabled OS. */
  readonly enableFips?: boolean;
}

export function snapshotPropertiesSerializer(item: SnapshotProperties): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    snapshotType: item["snapshotType"],
  };
}

export function snapshotPropertiesDeserializer(item: any): SnapshotProperties {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    snapshotType: item["snapshotType"],
    kubernetesVersion: item["kubernetesVersion"],
    nodeImageVersion: item["nodeImageVersion"],
    osType: item["osType"],
    osSku: item["osSku"],
    vmSize: item["vmSize"],
    enableFips: item["enableFIPS"],
  };
}

/** The type of a snapshot. The default is NodePool. */
export enum KnownSnapshotType {
  /** The snapshot is a snapshot of a node pool. */
  NodePool = "NodePool",
  /** The snapshot is a snapshot of a managed cluster. */
  ManagedCluster = "ManagedCluster",
}

/**
 * The type of a snapshot. The default is NodePool. \
 * {@link KnownSnapshotType} can be used interchangeably with SnapshotType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NodePool**: The snapshot is a snapshot of a node pool. \
 * **ManagedCluster**: The snapshot is a snapshot of a managed cluster.
 */
export type SnapshotType = string;

/** The response of a Snapshot list operation. */
export interface _SnapshotListResult {
  /** The Snapshot items on this page */
  value: Snapshot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _snapshotListResultDeserializer(item: any): _SnapshotListResult {
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

/** A managed cluster snapshot resource. */
export interface ManagedClusterSnapshot extends TrackedResource {
  /** CreationData to be used to specify the source resource ID to create this snapshot. */
  creationData?: CreationData;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: SnapshotType;
  /** What the properties will be showed when getting managed cluster snapshot. Those properties are read-only. */
  readonly managedClusterPropertiesReadOnly?: ManagedClusterPropertiesForSnapshot;
}

export function managedClusterSnapshotSerializer(item: ManagedClusterSnapshot): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, ["creationData", "snapshotType"])
      ? undefined
      : _managedClusterSnapshotPropertiesSerializer(item),
  };
}

export function managedClusterSnapshotDeserializer(item: any): ManagedClusterSnapshot {
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
      : _managedClusterSnapshotPropertiesDeserializer(item["properties"])),
  };
}

/** Properties for a managed cluster snapshot. */
export interface ManagedClusterSnapshotProperties {
  /** CreationData to be used to specify the source resource ID to create this snapshot. */
  creationData?: CreationData;
  /** The type of a snapshot. The default is NodePool. */
  snapshotType?: SnapshotType;
  /** What the properties will be showed when getting managed cluster snapshot. Those properties are read-only. */
  readonly managedClusterPropertiesReadOnly?: ManagedClusterPropertiesForSnapshot;
}

export function managedClusterSnapshotPropertiesSerializer(
  item: ManagedClusterSnapshotProperties,
): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    snapshotType: item["snapshotType"],
  };
}

export function managedClusterSnapshotPropertiesDeserializer(
  item: any,
): ManagedClusterSnapshotProperties {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    snapshotType: item["snapshotType"],
    managedClusterPropertiesReadOnly: !item["managedClusterPropertiesReadOnly"]
      ? item["managedClusterPropertiesReadOnly"]
      : managedClusterPropertiesForSnapshotDeserializer(item["managedClusterPropertiesReadOnly"]),
  };
}

/** managed cluster properties for snapshot, these properties are read only. */
export interface ManagedClusterPropertiesForSnapshot {
  /** The current kubernetes version. */
  kubernetesVersion?: string;
  /** The current managed cluster sku. */
  sku?: ManagedClusterSKU;
  /** Whether the cluster has enabled Kubernetes Role-Based Access Control or not. */
  enableRbac?: boolean;
  /** The current network profile. */
  readonly networkProfile?: NetworkProfileForSnapshot;
}

export function managedClusterPropertiesForSnapshotDeserializer(
  item: any,
): ManagedClusterPropertiesForSnapshot {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    sku: !item["sku"] ? item["sku"] : managedClusterSKUDeserializer(item["sku"]),
    enableRbac: item["enableRbac"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : networkProfileForSnapshotDeserializer(item["networkProfile"]),
  };
}

/** network profile for managed cluster snapshot, these properties are read only. */
export interface NetworkProfileForSnapshot {
  /** networkPlugin for managed cluster snapshot. */
  networkPlugin?: NetworkPlugin;
  /** NetworkPluginMode for managed cluster snapshot. */
  networkPluginMode?: NetworkPluginMode;
  /** networkPolicy for managed cluster snapshot. */
  networkPolicy?: NetworkPolicy;
  /** networkMode for managed cluster snapshot. */
  networkMode?: NetworkMode;
  /** loadBalancerSku for managed cluster snapshot. */
  loadBalancerSku?: LoadBalancerSku;
}

export function networkProfileForSnapshotDeserializer(item: any): NetworkProfileForSnapshot {
  return {
    networkPlugin: item["networkPlugin"],
    networkPluginMode: item["networkPluginMode"],
    networkPolicy: item["networkPolicy"],
    networkMode: item["networkMode"],
    loadBalancerSku: item["loadBalancerSku"],
  };
}

/** The response of a ManagedClusterSnapshot list operation. */
export interface _ManagedClusterSnapshotListResult {
  /** The ManagedClusterSnapshot items on this page */
  value: ManagedClusterSnapshot[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _managedClusterSnapshotListResultDeserializer(
  item: any,
): _ManagedClusterSnapshotListResult {
  return {
    value: managedClusterSnapshotArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function managedClusterSnapshotArraySerializer(
  result: Array<ManagedClusterSnapshot>,
): any[] {
  return result.map((item) => {
    return managedClusterSnapshotSerializer(item);
  });
}

export function managedClusterSnapshotArrayDeserializer(
  result: Array<ManagedClusterSnapshot>,
): any[] {
  return result.map((item) => {
    return managedClusterSnapshotDeserializer(item);
  });
}

/** Defines binding between a resource and role */
export interface TrustedAccessRoleBinding extends ProxyResource {
  /** The current provisioning state of trusted access role binding. */
  readonly provisioningState?: TrustedAccessRoleBindingProvisioningState;
  /** The ARM resource ID of source resource that trusted access is configured for. */
  sourceResourceId: string;
  /** A list of roles to bind, each item is a resource type qualified role name. For example: 'Microsoft.MachineLearningServices/workspaces/reader'. */
  roles: string[];
}

export function trustedAccessRoleBindingSerializer(item: TrustedAccessRoleBinding): any {
  return { properties: _trustedAccessRoleBindingPropertiesSerializer(item) };
}

export function trustedAccessRoleBindingDeserializer(item: any): TrustedAccessRoleBinding {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    ..._trustedAccessRoleBindingPropertiesDeserializer(item["properties"]),
  };
}

/** Properties for trusted access role binding */
export interface TrustedAccessRoleBindingProperties {
  /** The current provisioning state of trusted access role binding. */
  readonly provisioningState?: TrustedAccessRoleBindingProvisioningState;
  /** The ARM resource ID of source resource that trusted access is configured for. */
  sourceResourceId: string;
  /** A list of roles to bind, each item is a resource type qualified role name. For example: 'Microsoft.MachineLearningServices/workspaces/reader'. */
  roles: string[];
}

export function trustedAccessRoleBindingPropertiesSerializer(
  item: TrustedAccessRoleBindingProperties,
): any {
  return {
    sourceResourceId: item["sourceResourceId"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
  };
}

export function trustedAccessRoleBindingPropertiesDeserializer(
  item: any,
): TrustedAccessRoleBindingProperties {
  return {
    provisioningState: item["provisioningState"],
    sourceResourceId: item["sourceResourceId"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
  };
}

/** The current provisioning state of trusted access role binding. */
export enum KnownTrustedAccessRoleBindingProvisioningState {
  /** Canceled */
  Canceled = "Canceled",
  /** Deleting */
  Deleting = "Deleting",
  /** Failed */
  Failed = "Failed",
  /** Succeeded */
  Succeeded = "Succeeded",
  /** Updating */
  Updating = "Updating",
}

/**
 * The current provisioning state of trusted access role binding. \
 * {@link KnownTrustedAccessRoleBindingProvisioningState} can be used interchangeably with TrustedAccessRoleBindingProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled** \
 * **Deleting** \
 * **Failed** \
 * **Succeeded** \
 * **Updating**
 */
export type TrustedAccessRoleBindingProvisioningState = string;

/** The response of a TrustedAccessRoleBinding list operation. */
export interface _TrustedAccessRoleBindingListResult {
  /** The TrustedAccessRoleBinding items on this page */
  value: TrustedAccessRoleBinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _trustedAccessRoleBindingListResultDeserializer(
  item: any,
): _TrustedAccessRoleBindingListResult {
  return {
    value: trustedAccessRoleBindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function trustedAccessRoleBindingArraySerializer(
  result: Array<TrustedAccessRoleBinding>,
): any[] {
  return result.map((item) => {
    return trustedAccessRoleBindingSerializer(item);
  });
}

export function trustedAccessRoleBindingArrayDeserializer(
  result: Array<TrustedAccessRoleBinding>,
): any[] {
  return result.map((item) => {
    return trustedAccessRoleBindingDeserializer(item);
  });
}

/** The configurations regarding multiple standard load balancers. If not supplied, single load balancer mode will be used. Multiple standard load balancers mode will be used if at lease one configuration is supplied. There has to be a configuration named `kubernetes`. The name field will be the name of the corresponding public load balancer. There will be an internal load balancer created if needed, and the name will be `<name>-internal`. The internal lb shares the same configurations as the external one. The internal lbs are not needed to be included in LoadBalancer list. */
export interface LoadBalancer extends ProxyResource {
  /** Required field. A string value that must specify the ID of an existing agent pool. All nodes in the given pool will always be added to this load balancer. This agent pool must have at least one node and minCount>=1 for autoscaling operations. An agent pool can only be the primary pool for a single load balancer. */
  primaryAgentPoolName?: string;
  /** Whether to automatically place services on the load balancer. If not supplied, the default value is true. If set to false manually, both of the external and the internal load balancer will not be selected for services unless they explicitly target it. */
  allowServicePlacement?: boolean;
  /** Only services that must match this selector can be placed on this load balancer. */
  serviceLabelSelector?: LabelSelector;
  /** Services created in namespaces that match the selector can be placed on this load balancer. */
  serviceNamespaceSelector?: LabelSelector;
  /** Nodes that match this selector will be possible members of this load balancer. */
  nodeSelector?: LabelSelector;
  /** The current provisioning state. */
  readonly provisioningState?: string;
}

export function loadBalancerSerializer(item: LoadBalancer): any {
  return {
    properties: areAllPropsUndefined(item, [
      "primaryAgentPoolName",
      "allowServicePlacement",
      "serviceLabelSelector",
      "serviceNamespaceSelector",
      "nodeSelector",
    ])
      ? undefined
      : _loadBalancerPropertiesSerializer(item),
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
    ...(!item["properties"]
      ? item["properties"]
      : _loadBalancerPropertiesDeserializer(item["properties"])),
  };
}

/** model interface LoadBalancerProperties */
export interface LoadBalancerProperties {
  /** Required field. A string value that must specify the ID of an existing agent pool. All nodes in the given pool will always be added to this load balancer. This agent pool must have at least one node and minCount>=1 for autoscaling operations. An agent pool can only be the primary pool for a single load balancer. */
  primaryAgentPoolName: string;
  /** Whether to automatically place services on the load balancer. If not supplied, the default value is true. If set to false manually, both of the external and the internal load balancer will not be selected for services unless they explicitly target it. */
  allowServicePlacement?: boolean;
  /** Only services that must match this selector can be placed on this load balancer. */
  serviceLabelSelector?: LabelSelector;
  /** Services created in namespaces that match the selector can be placed on this load balancer. */
  serviceNamespaceSelector?: LabelSelector;
  /** Nodes that match this selector will be possible members of this load balancer. */
  nodeSelector?: LabelSelector;
  /** The current provisioning state. */
  readonly provisioningState?: string;
}

export function loadBalancerPropertiesSerializer(item: LoadBalancerProperties): any {
  return {
    primaryAgentPoolName: item["primaryAgentPoolName"],
    allowServicePlacement: item["allowServicePlacement"],
    serviceLabelSelector: !item["serviceLabelSelector"]
      ? item["serviceLabelSelector"]
      : labelSelectorSerializer(item["serviceLabelSelector"]),
    serviceNamespaceSelector: !item["serviceNamespaceSelector"]
      ? item["serviceNamespaceSelector"]
      : labelSelectorSerializer(item["serviceNamespaceSelector"]),
    nodeSelector: !item["nodeSelector"]
      ? item["nodeSelector"]
      : labelSelectorSerializer(item["nodeSelector"]),
  };
}

export function loadBalancerPropertiesDeserializer(item: any): LoadBalancerProperties {
  return {
    primaryAgentPoolName: item["primaryAgentPoolName"],
    allowServicePlacement: item["allowServicePlacement"],
    serviceLabelSelector: !item["serviceLabelSelector"]
      ? item["serviceLabelSelector"]
      : labelSelectorDeserializer(item["serviceLabelSelector"]),
    serviceNamespaceSelector: !item["serviceNamespaceSelector"]
      ? item["serviceNamespaceSelector"]
      : labelSelectorDeserializer(item["serviceNamespaceSelector"]),
    nodeSelector: !item["nodeSelector"]
      ? item["nodeSelector"]
      : labelSelectorDeserializer(item["nodeSelector"]),
    provisioningState: item["provisioningState"],
  };
}

/** A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects. */
export interface LabelSelector {
  /** matchLabels is an array of {key=value} pairs. A single {key=value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is `key`, the operator is `In`, and the values array contains only `value`. The requirements are ANDed. */
  matchLabels?: string[];
  /** matchExpressions is a list of label selector requirements. The requirements are ANDed. */
  matchExpressions?: LabelSelectorRequirement[];
}

export function labelSelectorSerializer(item: LabelSelector): any {
  return {
    matchLabels: !item["matchLabels"]
      ? item["matchLabels"]
      : item["matchLabels"].map((p: any) => {
          return p;
        }),
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : labelSelectorRequirementArraySerializer(item["matchExpressions"]),
  };
}

export function labelSelectorDeserializer(item: any): LabelSelector {
  return {
    matchLabels: !item["matchLabels"]
      ? item["matchLabels"]
      : item["matchLabels"].map((p: any) => {
          return p;
        }),
    matchExpressions: !item["matchExpressions"]
      ? item["matchExpressions"]
      : labelSelectorRequirementArrayDeserializer(item["matchExpressions"]),
  };
}

export function labelSelectorRequirementArraySerializer(
  result: Array<LabelSelectorRequirement>,
): any[] {
  return result.map((item) => {
    return labelSelectorRequirementSerializer(item);
  });
}

export function labelSelectorRequirementArrayDeserializer(
  result: Array<LabelSelectorRequirement>,
): any[] {
  return result.map((item) => {
    return labelSelectorRequirementDeserializer(item);
  });
}

/** A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values. */
export interface LabelSelectorRequirement {
  /** key is the label key that the selector applies to. */
  key?: string;
  /** operator represents a key's relationship to a set of values. Valid operators are In and NotIn */
  operator?: Operator;
  /** values is an array of string values, the values array must be non-empty. */
  values?: string[];
}

export function labelSelectorRequirementSerializer(item: LabelSelectorRequirement): any {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

export function labelSelectorRequirementDeserializer(item: any): LabelSelectorRequirement {
  return {
    key: item["key"],
    operator: item["operator"],
    values: !item["values"]
      ? item["values"]
      : item["values"].map((p: any) => {
          return p;
        }),
  };
}

/** operator represents a key's relationship to a set of values. Valid operators are In and NotIn */
export enum KnownOperator {
  /** The value of the key should be in the given list. */
  In = "In",
  /** The value of the key should not be in the given list. */
  NotIn = "NotIn",
  /** The value of the key should exist. */
  Exists = "Exists",
  /** The value of the key should not exist. */
  DoesNotExist = "DoesNotExist",
}

/**
 * operator represents a key's relationship to a set of values. Valid operators are In and NotIn \
 * {@link KnownOperator} can be used interchangeably with Operator,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **In**: The value of the key should be in the given list. \
 * **NotIn**: The value of the key should not be in the given list. \
 * **Exists**: The value of the key should exist. \
 * **DoesNotExist**: The value of the key should not exist.
 */
export type Operator = string;

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

/** The IdentityBinding resource. */
export interface IdentityBinding extends ProxyResource {
  /** The resource-specific properties for this resource. */
  properties?: IdentityBindingProperties;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function identityBindingSerializer(item: IdentityBinding): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : identityBindingPropertiesSerializer(item["properties"]),
  };
}

export function identityBindingDeserializer(item: any): IdentityBinding {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : identityBindingPropertiesDeserializer(item["properties"]),
    eTag: item["eTag"],
  };
}

/** IdentityBinding properties. */
export interface IdentityBindingProperties {
  /** Managed identity profile for the identity binding. */
  managedIdentity: IdentityBindingManagedIdentityProfile;
  /** The OIDC issuer URL of the IdentityBinding. */
  readonly oidcIssuer?: IdentityBindingOidcIssuerProfile;
  /** The status of the last operation. */
  readonly provisioningState?: IdentityBindingProvisioningState;
}

export function identityBindingPropertiesSerializer(item: IdentityBindingProperties): any {
  return {
    managedIdentity: identityBindingManagedIdentityProfileSerializer(item["managedIdentity"]),
  };
}

export function identityBindingPropertiesDeserializer(item: any): IdentityBindingProperties {
  return {
    managedIdentity: identityBindingManagedIdentityProfileDeserializer(item["managedIdentity"]),
    oidcIssuer: !item["oidcIssuer"]
      ? item["oidcIssuer"]
      : identityBindingOidcIssuerProfileDeserializer(item["oidcIssuer"]),
    provisioningState: item["provisioningState"],
  };
}

/** Managed identity profile for the identity binding. */
export interface IdentityBindingManagedIdentityProfile {
  /** The resource ID of the managed identity. */
  resourceId: string;
  /** The object ID of the managed identity. */
  readonly objectId?: string;
  /** The client ID of the managed identity. */
  readonly clientId?: string;
  /** The tenant ID of the managed identity. */
  readonly tenantId?: string;
}

export function identityBindingManagedIdentityProfileSerializer(
  item: IdentityBindingManagedIdentityProfile,
): any {
  return { resourceId: item["resourceId"] };
}

export function identityBindingManagedIdentityProfileDeserializer(
  item: any,
): IdentityBindingManagedIdentityProfile {
  return {
    resourceId: item["resourceId"],
    objectId: item["objectId"],
    clientId: item["clientId"],
    tenantId: item["tenantId"],
  };
}

/** IdentityBinding OIDC issuer profile. */
export interface IdentityBindingOidcIssuerProfile {
  /** The OIDC issuer URL of the IdentityBinding. */
  readonly oidcIssuerUrl?: string;
}

export function identityBindingOidcIssuerProfileDeserializer(
  item: any,
): IdentityBindingOidcIssuerProfile {
  return {
    oidcIssuerUrl: item["oidcIssuerUrl"],
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownIdentityBindingProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The identity binding is being created. */
  Creating = "Creating",
  /** The identity binding is being updated. */
  Updating = "Updating",
  /** The identity binding is being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownIdentityBindingProvisioningState} can be used interchangeably with IdentityBindingProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The identity binding is being created. \
 * **Updating**: The identity binding is being updated. \
 * **Deleting**: The identity binding is being deleted.
 */
export type IdentityBindingProvisioningState = string;

/** The response of a IdentityBinding list operation. */
export interface _IdentityBindingListResult {
  /** The IdentityBinding items on this page */
  value: IdentityBinding[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _identityBindingListResultDeserializer(item: any): _IdentityBindingListResult {
  return {
    value: identityBindingArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function identityBindingArraySerializer(result: Array<IdentityBinding>): any[] {
  return result.map((item) => {
    return identityBindingSerializer(item);
  });
}

export function identityBindingArrayDeserializer(result: Array<IdentityBinding>): any[] {
  return result.map((item) => {
    return identityBindingDeserializer(item);
  });
}

/** Configuration for JWT authenticator in the managed cluster. */
export interface JWTAuthenticator extends ProxyResource {
  /** The properties of JWTAuthenticator. For details on how to configure the properties of a JWT authenticator, please refer to the Kubernetes documentation: https://kubernetes.io/docs/reference/access-authn-authz/authentication/#using-authentication-configuration. Please note that not all fields available in the Kubernetes documentation are supported by AKS. For troubleshooting, please see https://aka.ms/aks-external-issuers-docs. */
  properties: JWTAuthenticatorProperties;
}

export function jwtAuthenticatorSerializer(item: JWTAuthenticator): any {
  return { properties: jwtAuthenticatorPropertiesSerializer(item["properties"]) };
}

export function jwtAuthenticatorDeserializer(item: any): JWTAuthenticator {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: jwtAuthenticatorPropertiesDeserializer(item["properties"]),
  };
}

/** The properties of JWTAuthenticator. For details on how to configure the properties of a JWT authenticator, please refer to the Kubernetes documentation: https://kubernetes.io/docs/reference/access-authn-authz/authentication/#using-authentication-configuration. Please note that not all fields available in the Kubernetes documentation are supported by AKS. For troubleshooting, please see https://aka.ms/aks-external-issuers-docs. */
export interface JWTAuthenticatorProperties {
  /** The current provisioning state of the JWT authenticator. */
  readonly provisioningState?: JWTAuthenticatorProvisioningState;
  /** The JWT OIDC issuer details. */
  issuer: JWTAuthenticatorIssuer;
  /** The rules that are applied to validate token claims to authenticate users. All the expressions must evaluate to true for validation to succeed. */
  claimValidationRules?: JWTAuthenticatorValidationRule[];
  /** The mappings that define how user attributes are extracted from the token claims. */
  claimMappings: JWTAuthenticatorClaimMappings;
  /** The rules that are applied to the mapped user before completing authentication. All the expressions must evaluate to true for validation to succeed. */
  userValidationRules?: JWTAuthenticatorValidationRule[];
}

export function jwtAuthenticatorPropertiesSerializer(item: JWTAuthenticatorProperties): any {
  return {
    issuer: jwtAuthenticatorIssuerSerializer(item["issuer"]),
    claimValidationRules: !item["claimValidationRules"]
      ? item["claimValidationRules"]
      : jwtAuthenticatorValidationRuleArraySerializer(item["claimValidationRules"]),
    claimMappings: jwtAuthenticatorClaimMappingsSerializer(item["claimMappings"]),
    userValidationRules: !item["userValidationRules"]
      ? item["userValidationRules"]
      : jwtAuthenticatorValidationRuleArraySerializer(item["userValidationRules"]),
  };
}

export function jwtAuthenticatorPropertiesDeserializer(item: any): JWTAuthenticatorProperties {
  return {
    provisioningState: item["provisioningState"],
    issuer: jwtAuthenticatorIssuerDeserializer(item["issuer"]),
    claimValidationRules: !item["claimValidationRules"]
      ? item["claimValidationRules"]
      : jwtAuthenticatorValidationRuleArrayDeserializer(item["claimValidationRules"]),
    claimMappings: jwtAuthenticatorClaimMappingsDeserializer(item["claimMappings"]),
    userValidationRules: !item["userValidationRules"]
      ? item["userValidationRules"]
      : jwtAuthenticatorValidationRuleArrayDeserializer(item["userValidationRules"]),
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownJWTAuthenticatorProvisioningState {
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The JWT authenticator is being created. */
  Creating = "Creating",
  /** The JWT authenticator is being updated. */
  Updating = "Updating",
  /** The JWT authenticator is being deleted. */
  Deleting = "Deleting",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownJWTAuthenticatorProvisioningState} can be used interchangeably with JWTAuthenticatorProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Succeeded**: Resource has been created. \
 * **Failed**: Resource creation failed. \
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The JWT authenticator is being created. \
 * **Updating**: The JWT authenticator is being updated. \
 * **Deleting**: The JWT authenticator is being deleted.
 */
export type JWTAuthenticatorProvisioningState = string;

/** The OIDC issuer details for JWTAuthenticator. */
export interface JWTAuthenticatorIssuer {
  /** The issuer URL. The URL must begin with the scheme https and cannot contain a query string or fragment. This must match the "iss" claim in the presented JWT, and the issuer returned from discovery. */
  url: string;
  /** The set of acceptable audiences the JWT must be issued to. At least one is required. When multiple is set, AudienceMatchPolicy is used in API Server configuration. */
  audiences: string[];
}

export function jwtAuthenticatorIssuerSerializer(item: JWTAuthenticatorIssuer): any {
  return {
    url: item["url"],
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
  };
}

export function jwtAuthenticatorIssuerDeserializer(item: any): JWTAuthenticatorIssuer {
  return {
    url: item["url"],
    audiences: item["audiences"].map((p: any) => {
      return p;
    }),
  };
}

export function jwtAuthenticatorValidationRuleArraySerializer(
  result: Array<JWTAuthenticatorValidationRule>,
): any[] {
  return result.map((item) => {
    return jwtAuthenticatorValidationRuleSerializer(item);
  });
}

export function jwtAuthenticatorValidationRuleArrayDeserializer(
  result: Array<JWTAuthenticatorValidationRule>,
): any[] {
  return result.map((item) => {
    return jwtAuthenticatorValidationRuleDeserializer(item);
  });
}

/** The validation rule for JWTAuthenticator. */
export interface JWTAuthenticatorValidationRule {
  /** The CEL expression used to validate the claim or attribute. */
  expression: string;
  /** The validation error message. */
  message?: string;
}

export function jwtAuthenticatorValidationRuleSerializer(
  item: JWTAuthenticatorValidationRule,
): any {
  return { expression: item["expression"], message: item["message"] };
}

export function jwtAuthenticatorValidationRuleDeserializer(
  item: any,
): JWTAuthenticatorValidationRule {
  return {
    expression: item["expression"],
    message: item["message"],
  };
}

/** The claim mappings for JWTAuthenticator. */
export interface JWTAuthenticatorClaimMappings {
  /** The expression to extract username attribute from the token claims. */
  username: JWTAuthenticatorClaimMappingExpression;
  /** The expression to extract groups attribute from the token claims. When not provided, no groups are extracted from the token claims. */
  groups?: JWTAuthenticatorClaimMappingExpression;
  /** The expression to extract uid attribute from the token claims. When not provided, no uid is extracted from the token claims. */
  uid?: JWTAuthenticatorClaimMappingExpression;
  /** The expression to extract extra attribute from the token claims. When not provided, no extra attributes are extracted from the token claims. */
  extra?: JWTAuthenticatorExtraClaimMappingExpression[];
}

export function jwtAuthenticatorClaimMappingsSerializer(item: JWTAuthenticatorClaimMappings): any {
  return {
    username: jwtAuthenticatorClaimMappingExpressionSerializer(item["username"]),
    groups: !item["groups"]
      ? item["groups"]
      : jwtAuthenticatorClaimMappingExpressionSerializer(item["groups"]),
    uid: !item["uid"] ? item["uid"] : jwtAuthenticatorClaimMappingExpressionSerializer(item["uid"]),
    extra: !item["extra"]
      ? item["extra"]
      : jwtAuthenticatorExtraClaimMappingExpressionArraySerializer(item["extra"]),
  };
}

export function jwtAuthenticatorClaimMappingsDeserializer(
  item: any,
): JWTAuthenticatorClaimMappings {
  return {
    username: jwtAuthenticatorClaimMappingExpressionDeserializer(item["username"]),
    groups: !item["groups"]
      ? item["groups"]
      : jwtAuthenticatorClaimMappingExpressionDeserializer(item["groups"]),
    uid: !item["uid"]
      ? item["uid"]
      : jwtAuthenticatorClaimMappingExpressionDeserializer(item["uid"]),
    extra: !item["extra"]
      ? item["extra"]
      : jwtAuthenticatorExtraClaimMappingExpressionArrayDeserializer(item["extra"]),
  };
}

/** The claim mapping expression for JWTAuthenticator. */
export interface JWTAuthenticatorClaimMappingExpression {
  /** The CEL expression used to access token claims. */
  expression: string;
}

export function jwtAuthenticatorClaimMappingExpressionSerializer(
  item: JWTAuthenticatorClaimMappingExpression,
): any {
  return { expression: item["expression"] };
}

export function jwtAuthenticatorClaimMappingExpressionDeserializer(
  item: any,
): JWTAuthenticatorClaimMappingExpression {
  return {
    expression: item["expression"],
  };
}

export function jwtAuthenticatorExtraClaimMappingExpressionArraySerializer(
  result: Array<JWTAuthenticatorExtraClaimMappingExpression>,
): any[] {
  return result.map((item) => {
    return jwtAuthenticatorExtraClaimMappingExpressionSerializer(item);
  });
}

export function jwtAuthenticatorExtraClaimMappingExpressionArrayDeserializer(
  result: Array<JWTAuthenticatorExtraClaimMappingExpression>,
): any[] {
  return result.map((item) => {
    return jwtAuthenticatorExtraClaimMappingExpressionDeserializer(item);
  });
}

/** The extra claim mapping expression for JWTAuthenticator. */
export interface JWTAuthenticatorExtraClaimMappingExpression {
  /** The key of the extra attribute. */
  key: string;
  /** The CEL expression used to extract the value of the extra attribute. */
  valueExpression: string;
}

export function jwtAuthenticatorExtraClaimMappingExpressionSerializer(
  item: JWTAuthenticatorExtraClaimMappingExpression,
): any {
  return { key: item["key"], valueExpression: item["valueExpression"] };
}

export function jwtAuthenticatorExtraClaimMappingExpressionDeserializer(
  item: any,
): JWTAuthenticatorExtraClaimMappingExpression {
  return {
    key: item["key"],
    valueExpression: item["valueExpression"],
  };
}

/** The response of a JWTAuthenticator list operation. */
export interface _JWTAuthenticatorListResult {
  /** The JWTAuthenticator items on this page */
  value: JWTAuthenticator[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _jwtAuthenticatorListResultDeserializer(item: any): _JWTAuthenticatorListResult {
  return {
    value: jwtAuthenticatorArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function jwtAuthenticatorArraySerializer(result: Array<JWTAuthenticator>): any[] {
  return result.map((item) => {
    return jwtAuthenticatorSerializer(item);
  });
}

export function jwtAuthenticatorArrayDeserializer(result: Array<JWTAuthenticator>): any[] {
  return result.map((item) => {
    return jwtAuthenticatorDeserializer(item);
  });
}

/** Mesh membership of a managed cluster. */
export interface MeshMembership extends ProxyResource {
  /** Mesh membership properties of a managed cluster. */
  properties?: MeshMembershipProperties;
  /** The fully qualified resource ID of the resource that manages this resource. Indicates if this resource is managed by another Azure resource. If this is present, complete mode deployment will not delete the resource if it is removed from the template since it is managed by another resource. */
  managedBy?: string;
  /** If eTag is provided in the response body, it may also be provided as a header per the normal etag convention.  Entity tags are used for comparing two or more entities from the same requested resource. HTTP/1.1 uses entity tags in the etag (section 14.19), If-Match (section 14.24), If-None-Match (section 14.26), and If-Range (section 14.27) header fields. */
  readonly eTag?: string;
}

export function meshMembershipSerializer(item: MeshMembership): any {
  return {
    properties: !item["properties"]
      ? item["properties"]
      : meshMembershipPropertiesSerializer(item["properties"]),
    managedBy: item["managedBy"],
  };
}

export function meshMembershipDeserializer(item: any): MeshMembership {
  return {
    id: item["id"],
    name: item["name"],
    type: item["type"],
    systemData: !item["systemData"]
      ? item["systemData"]
      : systemDataDeserializer(item["systemData"]),
    properties: !item["properties"]
      ? item["properties"]
      : meshMembershipPropertiesDeserializer(item["properties"]),
    managedBy: item["managedBy"],
    eTag: item["eTag"],
  };
}

/** Mesh membership properties of a managed cluster. */
export interface MeshMembershipProperties {
  /** The current provisioning state of the Mesh Membership. */
  readonly provisioningState?: MeshMembershipProvisioningState;
  /** The ARM resource id for the managed mesh member. This is of the form: '/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.AppLink/applinks/{appLinkName}/appLinkMembers/{appLinkMemberName}'. Visit https://aka.ms/applink for more information. */
  managedMeshID: string;
}

export function meshMembershipPropertiesSerializer(item: MeshMembershipProperties): any {
  return { managedMeshID: item["managedMeshID"] };
}

export function meshMembershipPropertiesDeserializer(item: any): MeshMembershipProperties {
  return {
    provisioningState: item["provisioningState"],
    managedMeshID: item["managedMeshID"],
  };
}

/** The provisioning state of the last accepted operation. */
export enum KnownMeshMembershipProvisioningState {
  /** Resource creation was canceled. */
  Canceled = "Canceled",
  /** The Mesh Membership is being created. */
  Creating = "Creating",
  /** The Mesh Membership is being deleted. */
  Deleting = "Deleting",
  /** Resource creation failed. */
  Failed = "Failed",
  /** Resource has been created. */
  Succeeded = "Succeeded",
  /** The Mesh Membership is being updated. */
  Updating = "Updating",
}

/**
 * The provisioning state of the last accepted operation. \
 * {@link KnownMeshMembershipProvisioningState} can be used interchangeably with MeshMembershipProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled**: Resource creation was canceled. \
 * **Creating**: The Mesh Membership is being created. \
 * **Deleting**: The Mesh Membership is being deleted. \
 * **Failed**: Resource creation failed. \
 * **Succeeded**: Resource has been created. \
 * **Updating**: The Mesh Membership is being updated.
 */
export type MeshMembershipProvisioningState = string;

/** The result of a request to list mesh memberships in a managed cluster. */
export interface _MeshMembershipsListResult {
  /** The list of mesh memberships. */
  value: MeshMembership[];
  /** The URL to get the next set of mesh membership results. */
  nextLink?: string;
}

export function _meshMembershipsListResultDeserializer(item: any): _MeshMembershipsListResult {
  return {
    value: meshMembershipArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function meshMembershipArraySerializer(result: Array<MeshMembership>): any[] {
  return result.map((item) => {
    return meshMembershipSerializer(item);
  });
}

export function meshMembershipArrayDeserializer(result: Array<MeshMembership>): any[] {
  return result.map((item) => {
    return meshMembershipDeserializer(item);
  });
}

/** The List Operation response. */
export interface _OperationListResult {
  /** The list of operations */
  value: OperationValue[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationListResultDeserializer(item: any): _OperationListResult {
  return {
    value: operationValueArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function operationValueArrayDeserializer(result: Array<OperationValue>): any[] {
  return result.map((item) => {
    return operationValueDeserializer(item);
  });
}

/** Describes the properties of a Operation value. */
export interface OperationValue {
  /** The origin of the operation. */
  readonly origin?: string;
  /** The name of the operation. */
  readonly name?: string;
  /** The display name of the operation. */
  readonly operation?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
  /** The description of the operation. */
  readonly description?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
}

export function operationValueDeserializer(item: any): OperationValue {
  return {
    origin: item["origin"],
    name: item["name"],
    ...(!item["display"] ? item["display"] : _operationValueDisplayDeserializer(item["display"])),
  };
}

/** Describes the properties of a Operation Value Display. */
export interface OperationValueDisplay {
  /** The display name of the operation. */
  readonly operation?: string;
  /** The display name of the resource the operation applies to. */
  readonly resource?: string;
  /** The description of the operation. */
  readonly description?: string;
  /** The resource provider for the operation. */
  readonly provider?: string;
}

export function operationValueDisplayDeserializer(item: any): OperationValueDisplay {
  return {
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
    provider: item["provider"],
  };
}

/** The current status of an async operation. */
export interface OperationStatusResult {
  /** Fully qualified ID for the async operation. */
  id?: string;
  /** Name of the async operation. */
  name?: string;
  /** Operation status. */
  status: string;
  /** Percent of the operation that is complete. */
  percentComplete?: number;
  /** The start time of the operation. */
  startTime?: Date;
  /** The end time of the operation. */
  endTime?: Date;
  /** The operations list. */
  operations?: OperationStatusResult[];
  /** If present, details of the operation error. */
  error?: ErrorDetail;
  /** Fully qualified ID of the resource against which the original async operation was started. */
  readonly resourceId?: string;
}

export function operationStatusResultDeserializer(item: any): OperationStatusResult {
  return {
    id: item["id"],
    name: item["name"],
    status: item["status"],
    percentComplete: item["percentComplete"],
    startTime: !item["startTime"] ? item["startTime"] : new Date(item["startTime"]),
    endTime: !item["endTime"] ? item["endTime"] : new Date(item["endTime"]),
    operations: !item["operations"]
      ? item["operations"]
      : operationStatusResultArrayDeserializer(item["operations"]),
    error: !item["error"] ? item["error"] : errorDetailDeserializer(item["error"]),
    resourceId: item["resourceId"],
  };
}

export function operationStatusResultArrayDeserializer(
  result: Array<OperationStatusResult>,
): any[] {
  return result.map((item) => {
    return operationStatusResultDeserializer(item);
  });
}

/** The operations list. It contains an URL link to get the next set of results. */
export interface _OperationStatusResultList {
  /** The OperationStatusResult items on this page */
  value: OperationStatusResult[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _operationStatusResultListDeserializer(item: any): _OperationStatusResultList {
  return {
    value: operationStatusResultArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

/** A list of private link resources */
export interface PrivateLinkResourcesListResult {
  /** The collection value. */
  value?: PrivateLinkResource[];
}

export function privateLinkResourcesListResultDeserializer(
  item: any,
): PrivateLinkResourcesListResult {
  return {
    value: !item["value"] ? item["value"] : privateLinkResourceArrayDeserializer(item["value"]),
  };
}

/** List of trusted access roles */
export interface _TrustedAccessRoleListResult {
  /** The TrustedAccessRole items on this page */
  value: TrustedAccessRole[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _trustedAccessRoleListResultDeserializer(item: any): _TrustedAccessRoleListResult {
  return {
    value: trustedAccessRoleArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function trustedAccessRoleArrayDeserializer(result: Array<TrustedAccessRole>): any[] {
  return result.map((item) => {
    return trustedAccessRoleDeserializer(item);
  });
}

/** Trusted access role definition. */
export interface TrustedAccessRole {
  /** Resource type of Azure resource */
  readonly sourceResourceType?: string;
  /** Name of role, name is unique under a source resource type */
  readonly name?: string;
  /** List of rules for the role. This maps to 'rules' property of [Kubernetes Cluster Role](https://kubernetes.io/docs/reference/kubernetes-api/authorization-resources/cluster-role-v1/#ClusterRole). */
  readonly rules?: TrustedAccessRoleRule[];
}

export function trustedAccessRoleDeserializer(item: any): TrustedAccessRole {
  return {
    sourceResourceType: item["sourceResourceType"],
    name: item["name"],
    rules: !item["rules"] ? item["rules"] : trustedAccessRoleRuleArrayDeserializer(item["rules"]),
  };
}

export function trustedAccessRoleRuleArrayDeserializer(
  result: Array<TrustedAccessRoleRule>,
): any[] {
  return result.map((item) => {
    return trustedAccessRoleRuleDeserializer(item);
  });
}

/** Rule for trusted access role */
export interface TrustedAccessRoleRule {
  /** List of allowed verbs */
  readonly verbs?: string[];
  /** List of allowed apiGroups */
  readonly apiGroups?: string[];
  /** List of allowed resources */
  readonly resources?: string[];
  /** List of allowed names */
  readonly resourceNames?: string[];
  /** List of allowed nonResourceURLs */
  readonly nonResourceURLs?: string[];
}

export function trustedAccessRoleRuleDeserializer(item: any): TrustedAccessRoleRule {
  return {
    verbs: !item["verbs"]
      ? item["verbs"]
      : item["verbs"].map((p: any) => {
          return p;
        }),
    apiGroups: !item["apiGroups"]
      ? item["apiGroups"]
      : item["apiGroups"].map((p: any) => {
          return p;
        }),
    resources: !item["resources"]
      ? item["resources"]
      : item["resources"].map((p: any) => {
          return p;
        }),
    resourceNames: !item["resourceNames"]
      ? item["resourceNames"]
      : item["resourceNames"].map((p: any) => {
          return p;
        }),
    nonResourceURLs: !item["nonResourceURLs"]
      ? item["nonResourceURLs"]
      : item["nonResourceURLs"].map((p: any) => {
          return p;
        }),
  };
}

/** Holds an array NodeImageVersions */
export interface _NodeImageVersionsListResult {
  /** The NodeImageVersion items on this page */
  value: NodeImageVersion[];
  /** The link to the next page of items */
  nextLink?: string;
}

export function _nodeImageVersionsListResultDeserializer(item: any): _NodeImageVersionsListResult {
  return {
    value: nodeImageVersionArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function nodeImageVersionArrayDeserializer(result: Array<NodeImageVersion>): any[] {
  return result.map((item) => {
    return nodeImageVersionDeserializer(item);
  });
}

/** node image version profile for given major.minor.patch release. */
export interface NodeImageVersion {
  /** The operating system of the node image. Example: AKSUbuntu */
  os?: string;
  /** The SKU or flavor of the node image. Example: 2004gen2containerd */
  sku?: string;
  /** major.minor.patch version of the node image version release. Example: 2024.02.02 */
  version?: string;
  /** The OS + SKU + version of the node image. Example: AKSUbuntu-1804gen2containerd-2024.02.02 */
  fullName?: string;
}

export function nodeImageVersionDeserializer(item: any): NodeImageVersion {
  return {
    os: item["os"],
    sku: item["sku"],
    version: item["version"],
    fullName: item["fullName"],
  };
}

/** Known values of {@link Format} that the service accepts. */
export enum KnownFormat {
  /** Return azure auth-provider kubeconfig. This format is deprecated in v1.22 and will be fully removed in v1.26. See: https://aka.ms/k8s/changes-1-26. */
  Azure = "azure",
  /** Return exec format kubeconfig. This format requires kubelogin binary in the path. */
  Exec = "exec",
}

/** Type of Format */
export type Format = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01 API version. */
  V20251001 = "2025-10-01",
  /** The 2025-10-02-preview API version. */
  V20251002Preview = "2025-10-02-preview",
}

export function _agentPoolPropertiesSerializer(item: AgentPool): any {
  return {
    count: item["count"],
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    kubeletDiskType: item["kubeletDiskType"],
    workloadRuntime: item["workloadRuntime"],
    messageOfTheDay: item["messageOfTheDay"],
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    podIPAllocationMode: item["podIPAllocationMode"],
    maxPods: item["maxPods"],
    osType: item["osType"],
    osSKU: item["osSKU"],
    maxCount: item["maxCount"],
    minCount: item["minCount"],
    enableAutoScaling: item["enableAutoScaling"],
    scaleDownMode: item["scaleDownMode"],
    type: item["typePropertiesType"],
    mode: item["mode"],
    orchestratorVersion: item["orchestratorVersion"],
    upgradeStrategy: item["upgradeStrategy"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
    upgradeSettingsBlueGreen: !item["upgradeSettingsBlueGreen"]
      ? item["upgradeSettingsBlueGreen"]
      : agentPoolBlueGreenUpgradeSettingsSerializer(item["upgradeSettingsBlueGreen"]),
    powerState: !item["powerState"] ? item["powerState"] : powerStateSerializer(item["powerState"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    scaleSetPriority: item["scaleSetPriority"],
    scaleSetEvictionPolicy: item["scaleSetEvictionPolicy"],
    spotMaxPrice: item["spotMaxPrice"],
    tags: item["tags"],
    nodeLabels: item["nodeLabels"],
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    proximityPlacementGroupID: item["proximityPlacementGroupID"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigSerializer(item["kubeletConfig"]),
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigSerializer(item["linuxOSConfig"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableUltraSSD: item["enableUltraSSD"],
    enableFIPS: item["enableFips"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    capacityReservationGroupID: item["capacityReservationGroupID"],
    hostGroupID: item["hostGroupID"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : agentPoolNetworkProfileSerializer(item["networkProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileSerializer(item["windowsProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : agentPoolSecurityProfileSerializer(item["securityProfile"]),
    gpuProfile: !item["gpuProfile"] ? item["gpuProfile"] : gpuProfileSerializer(item["gpuProfile"]),
    gatewayProfile: !item["gatewayProfile"]
      ? item["gatewayProfile"]
      : agentPoolGatewayProfileSerializer(item["gatewayProfile"]),
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileSerializer(item["artifactStreamingProfile"]),
    virtualMachinesProfile: !item["virtualMachinesProfile"]
      ? item["virtualMachinesProfile"]
      : virtualMachinesProfileSerializer(item["virtualMachinesProfile"]),
    virtualMachineNodesStatus: !item["virtualMachineNodesStatus"]
      ? item["virtualMachineNodesStatus"]
      : virtualMachineNodesArraySerializer(item["virtualMachineNodesStatus"]),
    status: !item["status"] ? item["status"] : agentPoolStatusSerializer(item["status"]),
    localDNSProfile: !item["localDNSProfile"]
      ? item["localDNSProfile"]
      : localDNSProfileSerializer(item["localDNSProfile"]),
    nodeCustomizationProfile: !item["nodeCustomizationProfile"]
      ? item["nodeCustomizationProfile"]
      : nodeCustomizationProfileSerializer(item["nodeCustomizationProfile"]),
  };
}

export function _agentPoolPropertiesDeserializer(item: any) {
  return {
    eTag: item["eTag"],
    count: item["count"],
    vmSize: item["vmSize"],
    osDiskSizeGB: item["osDiskSizeGB"],
    osDiskType: item["osDiskType"],
    kubeletDiskType: item["kubeletDiskType"],
    workloadRuntime: item["workloadRuntime"],
    messageOfTheDay: item["messageOfTheDay"],
    vnetSubnetID: item["vnetSubnetID"],
    podSubnetID: item["podSubnetID"],
    podIPAllocationMode: item["podIPAllocationMode"],
    maxPods: item["maxPods"],
    osType: item["osType"],
    osSKU: item["osSKU"],
    maxCount: item["maxCount"],
    minCount: item["minCount"],
    enableAutoScaling: item["enableAutoScaling"],
    scaleDownMode: item["scaleDownMode"],
    typePropertiesType: item["type"],
    mode: item["mode"],
    orchestratorVersion: item["orchestratorVersion"],
    currentOrchestratorVersion: item["currentOrchestratorVersion"],
    nodeImageVersion: item["nodeImageVersion"],
    upgradeStrategy: item["upgradeStrategy"],
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
    upgradeSettingsBlueGreen: !item["upgradeSettingsBlueGreen"]
      ? item["upgradeSettingsBlueGreen"]
      : agentPoolBlueGreenUpgradeSettingsDeserializer(item["upgradeSettingsBlueGreen"]),
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
    availabilityZones: !item["availabilityZones"]
      ? item["availabilityZones"]
      : item["availabilityZones"].map((p: any) => {
          return p;
        }),
    enableNodePublicIP: item["enableNodePublicIP"],
    nodePublicIPPrefixID: item["nodePublicIPPrefixID"],
    scaleSetPriority: item["scaleSetPriority"],
    scaleSetEvictionPolicy: item["scaleSetEvictionPolicy"],
    spotMaxPrice: item["spotMaxPrice"],
    tags: !item["tags"]
      ? item["tags"]
      : Object.fromEntries(Object.entries(item["tags"]).map(([k, p]: [string, any]) => [k, p])),
    nodeLabels: !item["nodeLabels"]
      ? item["nodeLabels"]
      : Object.fromEntries(
          Object.entries(item["nodeLabels"]).map(([k, p]: [string, any]) => [k, p]),
        ),
    nodeTaints: !item["nodeTaints"]
      ? item["nodeTaints"]
      : item["nodeTaints"].map((p: any) => {
          return p;
        }),
    nodeInitializationTaints: !item["nodeInitializationTaints"]
      ? item["nodeInitializationTaints"]
      : item["nodeInitializationTaints"].map((p: any) => {
          return p;
        }),
    proximityPlacementGroupID: item["proximityPlacementGroupID"],
    kubeletConfig: !item["kubeletConfig"]
      ? item["kubeletConfig"]
      : kubeletConfigDeserializer(item["kubeletConfig"]),
    linuxOSConfig: !item["linuxOSConfig"]
      ? item["linuxOSConfig"]
      : linuxOSConfigDeserializer(item["linuxOSConfig"]),
    enableEncryptionAtHost: item["enableEncryptionAtHost"],
    enableUltraSSD: item["enableUltraSSD"],
    enableFips: item["enableFIPS"],
    gpuInstanceProfile: item["gpuInstanceProfile"],
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    capacityReservationGroupID: item["capacityReservationGroupID"],
    hostGroupID: item["hostGroupID"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : agentPoolNetworkProfileDeserializer(item["networkProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : agentPoolWindowsProfileDeserializer(item["windowsProfile"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : agentPoolSecurityProfileDeserializer(item["securityProfile"]),
    gpuProfile: !item["gpuProfile"]
      ? item["gpuProfile"]
      : gpuProfileDeserializer(item["gpuProfile"]),
    gatewayProfile: !item["gatewayProfile"]
      ? item["gatewayProfile"]
      : agentPoolGatewayProfileDeserializer(item["gatewayProfile"]),
    artifactStreamingProfile: !item["artifactStreamingProfile"]
      ? item["artifactStreamingProfile"]
      : agentPoolArtifactStreamingProfileDeserializer(item["artifactStreamingProfile"]),
    virtualMachinesProfile: !item["virtualMachinesProfile"]
      ? item["virtualMachinesProfile"]
      : virtualMachinesProfileDeserializer(item["virtualMachinesProfile"]),
    virtualMachineNodesStatus: !item["virtualMachineNodesStatus"]
      ? item["virtualMachineNodesStatus"]
      : virtualMachineNodesArrayDeserializer(item["virtualMachineNodesStatus"]),
    status: !item["status"] ? item["status"] : agentPoolStatusDeserializer(item["status"]),
    localDNSProfile: !item["localDNSProfile"]
      ? item["localDNSProfile"]
      : localDNSProfileDeserializer(item["localDNSProfile"]),
    nodeCustomizationProfile: !item["nodeCustomizationProfile"]
      ? item["nodeCustomizationProfile"]
      : nodeCustomizationProfileDeserializer(item["nodeCustomizationProfile"]),
  };
}

export function _agentPoolAvailableVersionsPropertiesDeserializer(item: any) {
  return {
    agentPoolVersions: !item["agentPoolVersions"]
      ? item["agentPoolVersions"]
      : agentPoolAvailableVersionsPropertiesAgentPoolVersionsItemArrayDeserializer(
          item["agentPoolVersions"],
        ),
  };
}

export function _agentPoolUpgradeProfilePropertiesDeserializer(item: any) {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    osType: item["osType"],
    upgrades: !item["upgrades"]
      ? item["upgrades"]
      : agentPoolUpgradeProfilePropertiesUpgradesItemArrayDeserializer(item["upgrades"]),
    componentsByReleases: !item["componentsByReleases"]
      ? item["componentsByReleases"]
      : componentsByReleaseArrayDeserializer(item["componentsByReleases"]),
    recentlyUsedVersions: !item["recentlyUsedVersions"]
      ? item["recentlyUsedVersions"]
      : agentPoolRecentlyUsedVersionArrayDeserializer(item["recentlyUsedVersions"]),
    latestNodeImageVersion: item["latestNodeImageVersion"],
  };
}

export function _managedClusterPropertiesSerializer(item: ManagedCluster): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    kubernetesVersion: item["kubernetesVersion"],
    dnsPrefix: item["dnsPrefix"],
    fqdnSubdomain: item["fqdnSubdomain"],
    agentPoolProfiles: !item["agentPoolProfiles"]
      ? item["agentPoolProfiles"]
      : managedClusterAgentPoolProfileArraySerializer(item["agentPoolProfiles"]),
    linuxProfile: !item["linuxProfile"]
      ? item["linuxProfile"]
      : containerServiceLinuxProfileSerializer(item["linuxProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : managedClusterWindowsProfileSerializer(item["windowsProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : managedClusterServicePrincipalProfileSerializer(item["servicePrincipalProfile"]),
    addonProfiles: !item["addonProfiles"]
      ? item["addonProfiles"]
      : managedClusterAddonProfileRecordSerializer(item["addonProfiles"]),
    podIdentityProfile: !item["podIdentityProfile"]
      ? item["podIdentityProfile"]
      : managedClusterPodIdentityProfileSerializer(item["podIdentityProfile"]),
    oidcIssuerProfile: !item["oidcIssuerProfile"]
      ? item["oidcIssuerProfile"]
      : managedClusterOidcIssuerProfileSerializer(item["oidcIssuerProfile"]),
    nodeResourceGroup: item["nodeResourceGroup"],
    nodeResourceGroupProfile: !item["nodeResourceGroupProfile"]
      ? item["nodeResourceGroupProfile"]
      : managedClusterNodeResourceGroupProfileSerializer(item["nodeResourceGroupProfile"]),
    enableRBAC: item["enableRbac"],
    supportPlan: item["supportPlan"],
    enableNamespaceResources: item["enableNamespaceResources"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : containerServiceNetworkProfileSerializer(item["networkProfile"]),
    aadProfile: !item["aadProfile"]
      ? item["aadProfile"]
      : managedClusterAADProfileSerializer(item["aadProfile"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : managedClusterAutoUpgradeProfileSerializer(item["autoUpgradeProfile"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : clusterUpgradeSettingsSerializer(item["upgradeSettings"]),
    autoScalerProfile: !item["autoScalerProfile"]
      ? item["autoScalerProfile"]
      : managedClusterPropertiesAutoScalerProfileSerializer(item["autoScalerProfile"]),
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : managedClusterAPIServerAccessProfileSerializer(item["apiServerAccessProfile"]),
    diskEncryptionSetID: item["diskEncryptionSetID"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : userAssignedIdentityRecordSerializer(item["identityProfile"]),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinkResourceArraySerializer(item["privateLinkResources"]),
    disableLocalAccounts: item["disableLocalAccounts"],
    httpProxyConfig: !item["httpProxyConfig"]
      ? item["httpProxyConfig"]
      : managedClusterHttpProxyConfigSerializer(item["httpProxyConfig"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : managedClusterSecurityProfileSerializer(item["securityProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : managedClusterStorageProfileSerializer(item["storageProfile"]),
    ingressProfile: !item["ingressProfile"]
      ? item["ingressProfile"]
      : managedClusterIngressProfileSerializer(item["ingressProfile"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    workloadAutoScalerProfile: !item["workloadAutoScalerProfile"]
      ? item["workloadAutoScalerProfile"]
      : managedClusterWorkloadAutoScalerProfileSerializer(item["workloadAutoScalerProfile"]),
    azureMonitorProfile: !item["azureMonitorProfile"]
      ? item["azureMonitorProfile"]
      : managedClusterAzureMonitorProfileSerializer(item["azureMonitorProfile"]),
    serviceMeshProfile: !item["serviceMeshProfile"]
      ? item["serviceMeshProfile"]
      : serviceMeshProfileSerializer(item["serviceMeshProfile"]),
    metricsProfile: !item["metricsProfile"]
      ? item["metricsProfile"]
      : managedClusterMetricsProfileSerializer(item["metricsProfile"]),
    nodeProvisioningProfile: !item["nodeProvisioningProfile"]
      ? item["nodeProvisioningProfile"]
      : managedClusterNodeProvisioningProfileSerializer(item["nodeProvisioningProfile"]),
    bootstrapProfile: !item["bootstrapProfile"]
      ? item["bootstrapProfile"]
      : managedClusterBootstrapProfileSerializer(item["bootstrapProfile"]),
    aiToolchainOperatorProfile: !item["aiToolchainOperatorProfile"]
      ? item["aiToolchainOperatorProfile"]
      : managedClusterAIToolchainOperatorProfileSerializer(item["aiToolchainOperatorProfile"]),
    schedulerProfile: !item["schedulerProfile"]
      ? item["schedulerProfile"]
      : schedulerProfileSerializer(item["schedulerProfile"]),
    hostedSystemProfile: !item["hostedSystemProfile"]
      ? item["hostedSystemProfile"]
      : managedClusterHostedSystemProfileSerializer(item["hostedSystemProfile"]),
    status: !item["status"] ? item["status"] : managedClusterStatusSerializer(item["status"]),
  };
}

export function _managedClusterPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    maxAgentPools: item["maxAgentPools"],
    kubernetesVersion: item["kubernetesVersion"],
    currentKubernetesVersion: item["currentKubernetesVersion"],
    dnsPrefix: item["dnsPrefix"],
    fqdnSubdomain: item["fqdnSubdomain"],
    fqdn: item["fqdn"],
    privateFqdn: item["privateFQDN"],
    azurePortalFqdn: item["azurePortalFQDN"],
    agentPoolProfiles: !item["agentPoolProfiles"]
      ? item["agentPoolProfiles"]
      : managedClusterAgentPoolProfileArrayDeserializer(item["agentPoolProfiles"]),
    linuxProfile: !item["linuxProfile"]
      ? item["linuxProfile"]
      : containerServiceLinuxProfileDeserializer(item["linuxProfile"]),
    windowsProfile: !item["windowsProfile"]
      ? item["windowsProfile"]
      : managedClusterWindowsProfileDeserializer(item["windowsProfile"]),
    servicePrincipalProfile: !item["servicePrincipalProfile"]
      ? item["servicePrincipalProfile"]
      : managedClusterServicePrincipalProfileDeserializer(item["servicePrincipalProfile"]),
    addonProfiles: !item["addonProfiles"]
      ? item["addonProfiles"]
      : managedClusterAddonProfileRecordDeserializer(item["addonProfiles"]),
    podIdentityProfile: !item["podIdentityProfile"]
      ? item["podIdentityProfile"]
      : managedClusterPodIdentityProfileDeserializer(item["podIdentityProfile"]),
    oidcIssuerProfile: !item["oidcIssuerProfile"]
      ? item["oidcIssuerProfile"]
      : managedClusterOidcIssuerProfileDeserializer(item["oidcIssuerProfile"]),
    nodeResourceGroup: item["nodeResourceGroup"],
    nodeResourceGroupProfile: !item["nodeResourceGroupProfile"]
      ? item["nodeResourceGroupProfile"]
      : managedClusterNodeResourceGroupProfileDeserializer(item["nodeResourceGroupProfile"]),
    enableRbac: item["enableRBAC"],
    supportPlan: item["supportPlan"],
    enableNamespaceResources: item["enableNamespaceResources"],
    networkProfile: !item["networkProfile"]
      ? item["networkProfile"]
      : containerServiceNetworkProfileDeserializer(item["networkProfile"]),
    aadProfile: !item["aadProfile"]
      ? item["aadProfile"]
      : managedClusterAADProfileDeserializer(item["aadProfile"]),
    autoUpgradeProfile: !item["autoUpgradeProfile"]
      ? item["autoUpgradeProfile"]
      : managedClusterAutoUpgradeProfileDeserializer(item["autoUpgradeProfile"]),
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : clusterUpgradeSettingsDeserializer(item["upgradeSettings"]),
    autoScalerProfile: !item["autoScalerProfile"]
      ? item["autoScalerProfile"]
      : managedClusterPropertiesAutoScalerProfileDeserializer(item["autoScalerProfile"]),
    apiServerAccessProfile: !item["apiServerAccessProfile"]
      ? item["apiServerAccessProfile"]
      : managedClusterAPIServerAccessProfileDeserializer(item["apiServerAccessProfile"]),
    diskEncryptionSetID: item["diskEncryptionSetID"],
    identityProfile: !item["identityProfile"]
      ? item["identityProfile"]
      : userAssignedIdentityRecordDeserializer(item["identityProfile"]),
    privateLinkResources: !item["privateLinkResources"]
      ? item["privateLinkResources"]
      : privateLinkResourceArrayDeserializer(item["privateLinkResources"]),
    disableLocalAccounts: item["disableLocalAccounts"],
    httpProxyConfig: !item["httpProxyConfig"]
      ? item["httpProxyConfig"]
      : managedClusterHttpProxyConfigDeserializer(item["httpProxyConfig"]),
    securityProfile: !item["securityProfile"]
      ? item["securityProfile"]
      : managedClusterSecurityProfileDeserializer(item["securityProfile"]),
    storageProfile: !item["storageProfile"]
      ? item["storageProfile"]
      : managedClusterStorageProfileDeserializer(item["storageProfile"]),
    ingressProfile: !item["ingressProfile"]
      ? item["ingressProfile"]
      : managedClusterIngressProfileDeserializer(item["ingressProfile"]),
    publicNetworkAccess: item["publicNetworkAccess"],
    workloadAutoScalerProfile: !item["workloadAutoScalerProfile"]
      ? item["workloadAutoScalerProfile"]
      : managedClusterWorkloadAutoScalerProfileDeserializer(item["workloadAutoScalerProfile"]),
    azureMonitorProfile: !item["azureMonitorProfile"]
      ? item["azureMonitorProfile"]
      : managedClusterAzureMonitorProfileDeserializer(item["azureMonitorProfile"]),
    serviceMeshProfile: !item["serviceMeshProfile"]
      ? item["serviceMeshProfile"]
      : serviceMeshProfileDeserializer(item["serviceMeshProfile"]),
    resourceUID: item["resourceUID"],
    metricsProfile: !item["metricsProfile"]
      ? item["metricsProfile"]
      : managedClusterMetricsProfileDeserializer(item["metricsProfile"]),
    nodeProvisioningProfile: !item["nodeProvisioningProfile"]
      ? item["nodeProvisioningProfile"]
      : managedClusterNodeProvisioningProfileDeserializer(item["nodeProvisioningProfile"]),
    bootstrapProfile: !item["bootstrapProfile"]
      ? item["bootstrapProfile"]
      : managedClusterBootstrapProfileDeserializer(item["bootstrapProfile"]),
    aiToolchainOperatorProfile: !item["aiToolchainOperatorProfile"]
      ? item["aiToolchainOperatorProfile"]
      : managedClusterAIToolchainOperatorProfileDeserializer(item["aiToolchainOperatorProfile"]),
    schedulerProfile: !item["schedulerProfile"]
      ? item["schedulerProfile"]
      : schedulerProfileDeserializer(item["schedulerProfile"]),
    hostedSystemProfile: !item["hostedSystemProfile"]
      ? item["hostedSystemProfile"]
      : managedClusterHostedSystemProfileDeserializer(item["hostedSystemProfile"]),
    status: !item["status"] ? item["status"] : managedClusterStatusDeserializer(item["status"]),
  };
}

export function _managedClusterAccessProfilePropertiesDeserializer(item: any) {
  return {
    kubeConfig: !item["kubeConfig"]
      ? item["kubeConfig"]
      : typeof item["kubeConfig"] === "string"
        ? stringToUint8Array(item["kubeConfig"], "base64")
        : item["kubeConfig"],
  };
}

export function _runCommandResultPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    exitCode: item["exitCode"],
    startedAt: !item["startedAt"] ? item["startedAt"] : new Date(item["startedAt"]),
    finishedAt: !item["finishedAt"] ? item["finishedAt"] : new Date(item["finishedAt"]),
    logs: item["logs"],
    reason: item["reason"],
  };
}

export function _managedClusterUpgradeProfilePropertiesDeserializer(item: any) {
  return {
    controlPlaneProfile: managedClusterPoolUpgradeProfileDeserializer(item["controlPlaneProfile"]),
    agentPoolProfiles: managedClusterPoolUpgradeProfileArrayDeserializer(item["agentPoolProfiles"]),
  };
}

export function _maintenanceConfigurationPropertiesSerializer(item: MaintenanceConfiguration): any {
  return {
    timeInWeek: !item["timeInWeek"]
      ? item["timeInWeek"]
      : timeInWeekArraySerializer(item["timeInWeek"]),
    notAllowedTime: !item["notAllowedTime"]
      ? item["notAllowedTime"]
      : timeSpanArraySerializer(item["notAllowedTime"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowSerializer(item["maintenanceWindow"]),
  };
}

export function _maintenanceConfigurationPropertiesDeserializer(item: any) {
  return {
    timeInWeek: !item["timeInWeek"]
      ? item["timeInWeek"]
      : timeInWeekArrayDeserializer(item["timeInWeek"]),
    notAllowedTime: !item["notAllowedTime"]
      ? item["notAllowedTime"]
      : timeSpanArrayDeserializer(item["notAllowedTime"]),
    maintenanceWindow: !item["maintenanceWindow"]
      ? item["maintenanceWindow"]
      : maintenanceWindowDeserializer(item["maintenanceWindow"]),
  };
}

export function _privateEndpointConnectionPropertiesSerializer(
  item: PrivateEndpointConnection,
): any {
  return {
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointSerializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateSerializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _privateEndpointConnectionPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    privateEndpoint: !item["privateEndpoint"]
      ? item["privateEndpoint"]
      : privateEndpointDeserializer(item["privateEndpoint"]),
    privateLinkServiceConnectionState: !item["privateLinkServiceConnectionState"]
      ? item["privateLinkServiceConnectionState"]
      : privateLinkServiceConnectionStateDeserializer(item["privateLinkServiceConnectionState"]),
  };
}

export function _snapshotPropertiesSerializer(item: Snapshot): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    snapshotType: item["snapshotType"],
  };
}

export function _snapshotPropertiesDeserializer(item: any) {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    snapshotType: item["snapshotType"],
    kubernetesVersion: item["kubernetesVersion"],
    nodeImageVersion: item["nodeImageVersion"],
    osType: item["osType"],
    osSku: item["osSku"],
    vmSize: item["vmSize"],
    enableFips: item["enableFIPS"],
  };
}

export function _managedClusterSnapshotPropertiesSerializer(item: ManagedClusterSnapshot): any {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataSerializer(item["creationData"]),
    snapshotType: item["snapshotType"],
  };
}

export function _managedClusterSnapshotPropertiesDeserializer(item: any) {
  return {
    creationData: !item["creationData"]
      ? item["creationData"]
      : creationDataDeserializer(item["creationData"]),
    snapshotType: item["snapshotType"],
    managedClusterPropertiesReadOnly: !item["managedClusterPropertiesReadOnly"]
      ? item["managedClusterPropertiesReadOnly"]
      : managedClusterPropertiesForSnapshotDeserializer(item["managedClusterPropertiesReadOnly"]),
  };
}

export function _trustedAccessRoleBindingPropertiesSerializer(item: TrustedAccessRoleBinding): any {
  return {
    sourceResourceId: item["sourceResourceId"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
  };
}

export function _trustedAccessRoleBindingPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    sourceResourceId: item["sourceResourceId"],
    roles: item["roles"].map((p: any) => {
      return p;
    }),
  };
}

export function _loadBalancerPropertiesSerializer(item: LoadBalancer): any {
  return {
    primaryAgentPoolName: item["primaryAgentPoolName"],
    allowServicePlacement: item["allowServicePlacement"],
    serviceLabelSelector: !item["serviceLabelSelector"]
      ? item["serviceLabelSelector"]
      : labelSelectorSerializer(item["serviceLabelSelector"]),
    serviceNamespaceSelector: !item["serviceNamespaceSelector"]
      ? item["serviceNamespaceSelector"]
      : labelSelectorSerializer(item["serviceNamespaceSelector"]),
    nodeSelector: !item["nodeSelector"]
      ? item["nodeSelector"]
      : labelSelectorSerializer(item["nodeSelector"]),
  };
}

export function _loadBalancerPropertiesDeserializer(item: any) {
  return {
    primaryAgentPoolName: item["primaryAgentPoolName"],
    allowServicePlacement: item["allowServicePlacement"],
    serviceLabelSelector: !item["serviceLabelSelector"]
      ? item["serviceLabelSelector"]
      : labelSelectorDeserializer(item["serviceLabelSelector"]),
    serviceNamespaceSelector: !item["serviceNamespaceSelector"]
      ? item["serviceNamespaceSelector"]
      : labelSelectorDeserializer(item["serviceNamespaceSelector"]),
    nodeSelector: !item["nodeSelector"]
      ? item["nodeSelector"]
      : labelSelectorDeserializer(item["nodeSelector"]),
    provisioningState: item["provisioningState"],
  };
}

export function _operationValueDisplayDeserializer(item: any) {
  return {
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
    provider: item["provider"],
  };
}
