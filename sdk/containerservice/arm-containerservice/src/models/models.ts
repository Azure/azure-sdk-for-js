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
  /** Settings for upgrading the agentpool */
  upgradeSettings?: AgentPoolUpgradeSettings;
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
  /** Specifications on VirtualMachines agent pool. */
  virtualMachinesProfile?: VirtualMachinesProfile;
  /** The status of nodes in a VirtualMachines agent pool. */
  virtualMachineNodesStatus?: VirtualMachineNodes[];
  /** Contains read-only information about the Agent Pool. */
  status?: AgentPoolStatus;
  /** Configures the per-node local DNS, with VnetDNS and KubeDNS overrides. LocalDNS helps improve performance and reliability of DNS resolution in an AKS cluster. For more details see aka.ms/aks/localdns. */
  localDNSProfile?: LocalDNSProfile;
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
      "upgradeSettings",
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
      "virtualMachinesProfile",
      "virtualMachineNodesStatus",
      "status",
      "localDNSProfile",
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
  /** Settings for upgrading the agentpool */
  upgradeSettings?: AgentPoolUpgradeSettings;
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
  /** Specifications on VirtualMachines agent pool. */
  virtualMachinesProfile?: VirtualMachinesProfile;
  /** The status of nodes in a VirtualMachines agent pool. */
  virtualMachineNodesStatus?: VirtualMachineNodes[];
  /** Contains read-only information about the Agent Pool. */
  status?: AgentPoolStatus;
  /** Configures the per-node local DNS, with VnetDNS and KubeDNS overrides. LocalDNS helps improve performance and reliability of DNS resolution in an AKS cluster. For more details see aka.ms/aks/localdns. */
  localDNSProfile?: LocalDNSProfile;
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
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
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
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
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
  CBLMariner = "CBLMariner",
  /** Use Windows2019 as the OS for node images. Unsupported for system node pools. Windows2019 only supports Windows2019 containers; it cannot run Windows2022 containers and vice versa. */
  Windows2019 = "Windows2019",
  /** Use Windows2022 as the OS for node images. Unsupported for system node pools. Windows2022 only supports Windows2022 containers; it cannot run Windows2019 containers and vice versa. */
  Windows2022 = "Windows2022",
  /** Use Ubuntu2204 as the OS for node images, however, Ubuntu 22.04 may not be supported for all nodepools. For limitations and supported kubernetes versions, see https://aka.ms/aks/supported-ubuntu-versions */
  Ubuntu2204 = "Ubuntu2204",
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
 * **CBLMariner**: Deprecated OSSKU. Microsoft recommends that new deployments choose 'AzureLinux' instead. \
 * **Windows2019**: Use Windows2019 as the OS for node images. Unsupported for system node pools. Windows2019 only supports Windows2019 containers; it cannot run Windows2022 containers and vice versa. \
 * **Windows2022**: Use Windows2022 as the OS for node images. Unsupported for system node pools. Windows2022 only supports Windows2022 containers; it cannot run Windows2019 containers and vice versa. \
 * **Ubuntu2204**: Use Ubuntu2204 as the OS for node images, however, Ubuntu 22.04 may not be supported for all nodepools. For limitations and supported kubernetes versions, see https:\//aka.ms\/aks\/supported-ubuntu-versions \
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
}

/**
 * The mode of an agent pool. A cluster must have at least one 'System' Agent Pool at all times. For additional information on agent pool restrictions and best practices, see: https://docs.microsoft.com/azure/aks/use-system-pools \
 * {@link KnownAgentPoolMode} can be used interchangeably with AgentPoolMode,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **System**: System agent pools are primarily for hosting critical system pods such as CoreDNS and metrics-server. System agent pools osType must be Linux. System agent pools VM SKU must have at least 2vCPUs and 4GB of memory. \
 * **User**: User agent pools are primarily for hosting your application pods. \
 * **Gateway**: Gateway agent pools are dedicated to providing static egress IPs to pods. For more details, see https:\//aka.ms\/aks\/static-egress-gateway.
 */
export type AgentPoolMode = string;

/** Settings for upgrading an agentpool */
export interface AgentPoolUpgradeSettings {
  /** The maximum number or percentage of nodes that are surged during upgrade. This can either be set to an integer (e.g. '5') or a percentage (e.g. '50%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 10%. For more information, including best practices, see: https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster */
  maxSurge?: string;
  /** The maximum number or percentage of nodes that can be simultaneously unavailable during upgrade. This can either be set to an integer (e.g. '1') or a percentage (e.g. '5%'). If a percentage is specified, it is the percentage of the total agent pool size at the time of the upgrade. For percentages, fractional nodes are rounded up. If not specified, the default is 0. For more information, including best practices, see: https://learn.microsoft.com/en-us/azure/aks/upgrade-cluster */
  maxUnavailable?: string;
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
    drainTimeoutInMinutes: item["drainTimeoutInMinutes"],
    nodeSoakDurationInMinutes: item["nodeSoakDurationInMinutes"],
    undrainableNodeBehavior: item["undrainableNodeBehavior"],
  };
}

export function agentPoolUpgradeSettingsDeserializer(item: any): AgentPoolUpgradeSettings {
  return {
    maxSurge: item["maxSurge"],
    maxUnavailable: item["maxUnavailable"],
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
  };
}

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
  /** MIG 1g GPU instance profile. */
  MIG1G = "MIG1g",
  /** MIG 2g GPU instance profile. */
  MIG2G = "MIG2g",
  /** MIG 3g GPU instance profile. */
  MIG3G = "MIG3g",
  /** MIG 4g GPU instance profile. */
  MIG4G = "MIG4g",
  /** MIG 7g GPU instance profile. */
  MIG7G = "MIG7g",
}

/**
 * GPUInstanceProfile to be used to specify GPU MIG instance profile for supported GPU VM SKU. \
 * {@link KnownGPUInstanceProfile} can be used interchangeably with GPUInstanceProfile,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **MIG1g**: MIG 1g GPU instance profile. \
 * **MIG2g**: MIG 2g GPU instance profile. \
 * **MIG3g**: MIG 3g GPU instance profile. \
 * **MIG4g**: MIG 4g GPU instance profile. \
 * **MIG7g**: MIG 7g GPU instance profile.
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
}

/**
 * SSH access method of an agent pool. \
 * {@link KnownAgentPoolSSHAccess} can be used interchangeably with AgentPoolSSHAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **LocalUser**: Can SSH onto the node as a local user using private key. \
 * **Disabled**: SSH service will be turned off on the node.
 */
export type AgentPoolSSHAccess = string;

/** GPU settings for the Agent Pool. */
export interface GPUProfile {
  /** Whether to install GPU drivers. When it's not specified, default is Install. */
  driver?: GPUDriver;
}

export function gpuProfileSerializer(item: GPUProfile): any {
  return { driver: item["driver"] };
}

export function gpuProfileDeserializer(item: any): GPUProfile {
  return {
    driver: item["driver"],
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
}

export function scaleProfileSerializer(item: ScaleProfile): any {
  return {
    manual: !item["manual"] ? item["manual"] : manualScaleProfileArraySerializer(item["manual"]),
  };
}

export function scaleProfileDeserializer(item: any): ScaleProfile {
  return {
    manual: !item["manual"] ? item["manual"] : manualScaleProfileArrayDeserializer(item["manual"]),
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

/** Available version information for an agent pool. */
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

/** Available upgrades for an AgentPool. */
export interface AgentPoolUpgradeProfilePropertiesUpgradesItem {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether the Kubernetes version is currently in preview. */
  isPreview?: boolean;
}

export function agentPoolUpgradeProfilePropertiesUpgradesItemDeserializer(
  item: any,
): AgentPoolUpgradeProfilePropertiesUpgradesItem {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    isPreview: item["isPreview"],
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
  /** Contains read-only information about the Managed Cluster. */
  status?: ManagedClusterStatus;
}

export function managedClusterSerializer(item: ManagedCluster): any {
  return {
    tags: item["tags"],
    location: item["location"],
    properties: areAllPropsUndefined(item, [
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
  /** Contains read-only information about the Managed Cluster. */
  status?: ManagedClusterStatus;
}

export function managedClusterPropertiesSerializer(item: ManagedClusterProperties): any {
  return {
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
    status: !item["status"] ? item["status"] : managedClusterStatusSerializer(item["status"]),
  };
}

export function managedClusterPropertiesDeserializer(item: any): ManagedClusterProperties {
  return {
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
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
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
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
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
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
  /** The provisioning information for the pod identity. */
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
  /** Pod identity is assigned. */
  Assigned = "Assigned",
  /** Pod identity assignment was canceled. */
  Canceled = "Canceled",
  /** Pod identity is being deleted. */
  Deleting = "Deleting",
  /** Pod identity assignment failed. */
  Failed = "Failed",
  /** Pod identity assignment succeeded. */
  Succeeded = "Succeeded",
  /** Pod identity is being updated. */
  Updating = "Updating",
}

/**
 * The current provisioning state of the pod identity. \
 * {@link KnownManagedClusterPodIdentityProvisioningState} can be used interchangeably with ManagedClusterPodIdentityProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Assigned**: Pod identity is assigned. \
 * **Canceled**: Pod identity assignment was canceled. \
 * **Deleting**: Pod identity is being deleted. \
 * **Failed**: Pod identity assignment failed. \
 * **Succeeded**: Pod identity assignment succeeded. \
 * **Updating**: Pod identity is being updated.
 */
export type ManagedClusterPodIdentityProvisioningState = string;

/** Pod identity provisioning information. */
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
}

export function advancedNetworkingSecuritySerializer(item: AdvancedNetworkingSecurity): any {
  return { enabled: item["enabled"], advancedNetworkPolicies: item["advancedNetworkPolicies"] };
}

export function advancedNetworkingSecurityDeserializer(item: any): AdvancedNetworkingSecurity {
  return {
    enabled: item["enabled"],
    advancedNetworkPolicies: item["advancedNetworkPolicies"],
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
  /** The name of the private link resource. See [naming rules](https://aka.ms/search-naming-rules) for more details. */
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
  /** Alternative CA cert to use for connecting to proxy servers. */
  trustedCa?: string;
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
    trustedCa: item["trustedCa"],
  };
}

/** Security profile for the container service cluster. */
export interface ManagedClusterSecurityProfile {
  /** Microsoft Defender settings for the security profile. */
  defender?: ManagedClusterSecurityProfileDefender;
  /** Azure Key Vault [key management service](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) settings for the security profile. */
  azureKeyVaultKms?: AzureKeyVaultKms;
  /** Workload identity settings for the security profile. Workload identity enables Kubernetes applications to access Azure cloud resources securely with Azure AD. See https://aka.ms/aks/wi for more details. */
  workloadIdentity?: ManagedClusterSecurityProfileWorkloadIdentity;
  /** Image Cleaner settings for the security profile. */
  imageCleaner?: ManagedClusterSecurityProfileImageCleaner;
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
    workloadIdentity: !item["workloadIdentity"]
      ? item["workloadIdentity"]
      : managedClusterSecurityProfileWorkloadIdentitySerializer(item["workloadIdentity"]),
    imageCleaner: !item["imageCleaner"]
      ? item["imageCleaner"]
      : managedClusterSecurityProfileImageCleanerSerializer(item["imageCleaner"]),
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
    workloadIdentity: !item["workloadIdentity"]
      ? item["workloadIdentity"]
      : managedClusterSecurityProfileWorkloadIdentityDeserializer(item["workloadIdentity"]),
    imageCleaner: !item["imageCleaner"]
      ? item["imageCleaner"]
      : managedClusterSecurityProfileImageCleanerDeserializer(item["imageCleaner"]),
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
  /** Key vault allows public access from all networks. */
  Public = "Public",
  /** Key vault disables public access and enables private link. */
  Private = "Private",
}

/**
 * Network access of the key vault. Network access of key vault. The possible values are `Public` and `Private`. `Public` means the key vault allows public access from all networks. `Private` means the key vault disables public access and enables private link. The default value is `Public`. \
 * {@link KnownKeyVaultNetworkAccessTypes} can be used interchangeably with KeyVaultNetworkAccessTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Public**: Key vault allows public access from all networks. \
 * **Private**: Key vault disables public access and enables private link.
 */
export type KeyVaultNetworkAccessTypes = string;

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
}

export function managedClusterStorageProfileDiskCSIDriverSerializer(
  item: ManagedClusterStorageProfileDiskCSIDriver,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterStorageProfileDiskCSIDriverDeserializer(
  item: any,
): ManagedClusterStorageProfileDiskCSIDriver {
  return {
    enabled: item["enabled"],
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
}

export function managedClusterIngressProfileSerializer(item: ManagedClusterIngressProfile): any {
  return {
    webAppRouting: !item["webAppRouting"]
      ? item["webAppRouting"]
      : managedClusterIngressProfileWebAppRoutingSerializer(item["webAppRouting"]),
  };
}

export function managedClusterIngressProfileDeserializer(item: any): ManagedClusterIngressProfile {
  return {
    webAppRouting: !item["webAppRouting"]
      ? item["webAppRouting"]
      : managedClusterIngressProfileWebAppRoutingDeserializer(item["webAppRouting"]),
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
  };
}

/** Nginx ingress controller configuration for the managed cluster ingress profile. */
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

/** PublicNetworkAccess of the managedCluster. Allow or deny public network access for AKS */
export enum KnownPublicNetworkAccess {
  /** Inbound/Outbound to the managedCluster is allowed. */
  Enabled = "Enabled",
  /** Inbound traffic to managedCluster is disabled, traffic from managedCluster is allowed. */
  Disabled = "Disabled",
}

/**
 * PublicNetworkAccess of the managedCluster. Allow or deny public network access for AKS \
 * {@link KnownPublicNetworkAccess} can be used interchangeably with PublicNetworkAccess,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Enabled**: Inbound\/Outbound to the managedCluster is allowed. \
 * **Disabled**: Inbound traffic to managedCluster is disabled, traffic from managedCluster is allowed.
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
}

export function managedClusterWorkloadAutoScalerProfileVerticalPodAutoscalerSerializer(
  item: ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler,
): any {
  return { enabled: item["enabled"] };
}

export function managedClusterWorkloadAutoScalerProfileVerticalPodAutoscalerDeserializer(
  item: any,
): ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler {
  return {
    enabled: item["enabled"],
  };
}

/** Azure Monitor addon profiles for monitoring the managed cluster. */
export interface ManagedClusterAzureMonitorProfile {
  /** Metrics profile for the Azure Monitor managed service for Prometheus addon. Collect out-of-the-box Kubernetes infrastructure metrics to send to an Azure Monitor Workspace and configure additional scraping for custom targets. See aka.ms/AzureManagedPrometheus for an overview. */
  metrics?: ManagedClusterAzureMonitorProfileMetrics;
}

export function managedClusterAzureMonitorProfileSerializer(
  item: ManagedClusterAzureMonitorProfile,
): any {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : managedClusterAzureMonitorProfileMetricsSerializer(item["metrics"]),
  };
}

export function managedClusterAzureMonitorProfileDeserializer(
  item: any,
): ManagedClusterAzureMonitorProfile {
  return {
    metrics: !item["metrics"]
      ? item["metrics"]
      : managedClusterAzureMonitorProfileMetricsDeserializer(item["metrics"]),
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
}

export function istioComponentsSerializer(item: IstioComponents): any {
  return {
    ingressGateways: !item["ingressGateways"]
      ? item["ingressGateways"]
      : istioIngressGatewayArraySerializer(item["ingressGateways"]),
    egressGateways: !item["egressGateways"]
      ? item["egressGateways"]
      : istioEgressGatewayArraySerializer(item["egressGateways"]),
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

/** Node provisioning profile for the managed cluster. */
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
  /** Azure Edge Zone extended location type. */
  EdgeZone = "EdgeZone",
}

/**
 * The type of extendedLocation. \
 * {@link KnownExtendedLocationTypes} can be used interchangeably with ExtendedLocationTypes,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EdgeZone**: Azure Edge Zone extended location type.
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
export enum KnownResourceIdentityType {
  /** Use an implicitly created system assigned managed identity to manage cluster resources. Master components in the control plane such as kube-controller-manager will use the system assigned managed identity to manipulate Azure resources. */
  SystemAssigned = "SystemAssigned",
  /** Use a user-specified identity to manage cluster resources. Master components in the control plane such as kube-controller-manager will use the specified user assigned managed identity to manipulate Azure resources. */
  UserAssigned = "UserAssigned",
  /** Do not use a managed identity for the Managed Cluster, service principal will be used instead. */
  None = "None",
}

/**
 * The type of identity used for the managed cluster. For more information see [use managed identities in AKS](https://docs.microsoft.com/azure/aks/use-managed-identity). \
 * {@link KnownResourceIdentityType} can be used interchangeably with ResourceIdentityType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **SystemAssigned**: Use an implicitly created system assigned managed identity to manage cluster resources. Master components in the control plane such as kube-controller-manager will use the system assigned managed identity to manipulate Azure resources. \
 * **UserAssigned**: Use a user-specified identity to manage cluster resources. Master components in the control plane such as kube-controller-manager will use the specified user assigned managed identity to manipulate Azure resources. \
 * **None**: Do not use a managed identity for the Managed Cluster, service principal will be used instead.
 */
export type ResourceIdentityType = string;

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

/** User assigned identity properties. */
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
  };
}

export function managedClusterPoolUpgradeProfileUpgradesItemArrayDeserializer(
  result: Array<ManagedClusterPoolUpgradeProfileUpgradesItem>,
): any[] {
  return result.map((item) => {
    return managedClusterPoolUpgradeProfileUpgradesItemDeserializer(item);
  });
}

/** Available upgrades for an AgentPool. */
export interface ManagedClusterPoolUpgradeProfileUpgradesItem {
  /** The Kubernetes version (major.minor.patch). */
  kubernetesVersion?: string;
  /** Whether the Kubernetes version is currently in preview. */
  isPreview?: boolean;
}

export function managedClusterPoolUpgradeProfileUpgradesItemDeserializer(
  item: any,
): ManagedClusterPoolUpgradeProfileUpgradesItem {
  return {
    kubernetesVersion: item["kubernetesVersion"],
    isPreview: item["isPreview"],
  };
}

export function managedClusterPoolUpgradeProfileArrayDeserializer(
  result: Array<ManagedClusterPoolUpgradeProfile>,
): any[] {
  return result.map((item) => {
    return managedClusterPoolUpgradeProfileDeserializer(item);
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
  /** Available mesh revisions. */
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
  /** Kubernetes support plans available for this version. */
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
  /** Represents Sunday. */
  Sunday = "Sunday",
  /** Represents Monday. */
  Monday = "Monday",
  /** Represents Tuesday. */
  Tuesday = "Tuesday",
  /** Represents Wednesday. */
  Wednesday = "Wednesday",
  /** Represents Thursday. */
  Thursday = "Thursday",
  /** Represents Friday. */
  Friday = "Friday",
  /** Represents Saturday. */
  Saturday = "Saturday",
}

/**
 * The weekday enum. \
 * {@link KnownWeekDay} can be used interchangeably with WeekDay,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Sunday**: Represents Sunday. \
 * **Monday**: Represents Monday. \
 * **Tuesday**: Represents Tuesday. \
 * **Wednesday**: Represents Wednesday. \
 * **Thursday**: Represents Thursday. \
 * **Friday**: Represents Friday. \
 * **Saturday**: Represents Saturday.
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
  /** The namespace is being updated. */
  Updating = "Updating",
  /** The namespace is being deleted. */
  Deleting = "Deleting",
  /** The namespace is being created. */
  Creating = "Creating",
  /** The namespace provisioning succeeded. */
  Succeeded = "Succeeded",
  /** The namespace provisioning failed. */
  Failed = "Failed",
  /** The namespace provisioning was canceled. */
  Canceled = "Canceled",
}

/**
 * The current provisioning state of the namespace. \
 * {@link KnownNamespaceProvisioningState} can be used interchangeably with NamespaceProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Updating**: The namespace is being updated. \
 * **Deleting**: The namespace is being deleted. \
 * **Creating**: The namespace is being created. \
 * **Succeeded**: The namespace provisioning succeeded. \
 * **Failed**: The namespace provisioning failed. \
 * **Canceled**: The namespace provisioning was canceled.
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
}

export function machinePropertiesDeserializer(item: any): MachineProperties {
  return {
    network: !item["network"]
      ? item["network"]
      : machineNetworkPropertiesDeserializer(item["network"]),
    resourceId: item["resourceId"],
  };
}

/** network properties of the machine */
export interface MachineNetworkProperties {
  /** IPv4, IPv6 addresses of the machine */
  readonly ipAddresses?: MachineIpAddress[];
}

export function machineNetworkPropertiesDeserializer(item: any): MachineNetworkProperties {
  return {
    ipAddresses: !item["ipAddresses"]
      ? item["ipAddresses"]
      : machineIpAddressArrayDeserializer(item["ipAddresses"]),
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
  /** Private endpoint connection provisioning was canceled. */
  Canceled = "Canceled",
  /** Private endpoint connection is being created. */
  Creating = "Creating",
  /** Private endpoint connection is being deleted. */
  Deleting = "Deleting",
  /** Private endpoint connection provisioning failed. */
  Failed = "Failed",
  /** Private endpoint connection provisioning succeeded. */
  Succeeded = "Succeeded",
}

/**
 * The current provisioning state. \
 * {@link KnownPrivateEndpointConnectionProvisioningState} can be used interchangeably with PrivateEndpointConnectionProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled**: Private endpoint connection provisioning was canceled. \
 * **Creating**: Private endpoint connection is being created. \
 * **Deleting**: Private endpoint connection is being deleted. \
 * **Failed**: Private endpoint connection provisioning failed. \
 * **Succeeded**: Private endpoint connection provisioning succeeded.
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
  /** Connection is pending approval. */
  Pending = "Pending",
  /** Connection is approved. */
  Approved = "Approved",
  /** Connection is rejected. */
  Rejected = "Rejected",
  /** Connection is disconnected. */
  Disconnected = "Disconnected",
}

/**
 * The private link service connection status. \
 * {@link KnownConnectionStatus} can be used interchangeably with ConnectionStatus,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Pending**: Connection is pending approval. \
 * **Approved**: Connection is approved. \
 * **Rejected**: Connection is rejected. \
 * **Disconnected**: Connection is disconnected.
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
}

/**
 * The type of a snapshot. The default is NodePool. \
 * {@link KnownSnapshotType} can be used interchangeably with SnapshotType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **NodePool**: The snapshot is a snapshot of a node pool.
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
  /** Trusted access role binding provisioning was canceled. */
  Canceled = "Canceled",
  /** Trusted access role binding is being deleted. */
  Deleting = "Deleting",
  /** Trusted access role binding provisioning failed. */
  Failed = "Failed",
  /** Trusted access role binding provisioning succeeded. */
  Succeeded = "Succeeded",
  /** Trusted access role binding is being updated. */
  Updating = "Updating",
}

/**
 * The current provisioning state of trusted access role binding. \
 * {@link KnownTrustedAccessRoleBindingProvisioningState} can be used interchangeably with TrustedAccessRoleBindingProvisioningState,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Canceled**: Trusted access role binding provisioning was canceled. \
 * **Deleting**: Trusted access role binding is being deleted. \
 * **Failed**: Trusted access role binding provisioning failed. \
 * **Succeeded**: Trusted access role binding provisioning succeeded. \
 * **Updating**: Trusted access role binding is being updated.
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

/** The format of the kubeconfig credential. */
export enum KnownFormat {
  /** Return azure auth-provider kubeconfig. This format is deprecated in v1.22 and will be fully removed in v1.26. See: https://aka.ms/k8s/changes-1-26. */
  Azure = "azure",
  /** Return exec format kubeconfig. This format requires kubelogin binary in the path. */
  Exec = "exec",
}

/**
 * The format of the kubeconfig credential. \
 * {@link KnownFormat} can be used interchangeably with Format,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **azure**: Return azure auth-provider kubeconfig. This format is deprecated in v1.22 and will be fully removed in v1.26. See: https:\//aka.ms\/k8s\/changes-1-26. \
 * **exec**: Return exec format kubeconfig. This format requires kubelogin binary in the path.
 */
export type Format = string;

/** The available API versions. */
export enum KnownVersions {
  /** The 2025-10-01 API version. */
  V20251001 = "2025-10-01",
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
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsSerializer(item["upgradeSettings"]),
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
    upgradeSettings: !item["upgradeSettings"]
      ? item["upgradeSettings"]
      : agentPoolUpgradeSettingsDeserializer(item["upgradeSettings"]),
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
    latestNodeImageVersion: item["latestNodeImageVersion"],
  };
}

export function _managedClusterPropertiesSerializer(item: ManagedCluster): any {
  return {
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
    status: !item["status"] ? item["status"] : managedClusterStatusSerializer(item["status"]),
  };
}

export function _managedClusterPropertiesDeserializer(item: any) {
  return {
    provisioningState: item["provisioningState"],
    powerState: !item["powerState"]
      ? item["powerState"]
      : powerStateDeserializer(item["powerState"]),
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

export function _operationValueDisplayDeserializer(item: any) {
  return {
    operation: item["operation"],
    resource: item["resource"],
    description: item["description"],
    provider: item["provider"],
  };
}
