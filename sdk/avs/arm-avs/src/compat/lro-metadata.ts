// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * LRO compatibility mapping for @azure/arm-avs
 *
 * This file contains the complete mapping of all Long Running Operations (LROs)
 * in the Azure VMware Solution API package. Each entry specifies the operation group
 * path and method name for operations that return PollerLike<OperationState<T>, T>.
 */
export const lroCompatMap: { path: string[]; method: string }[] = [
  // Private Clouds Operations
  { path: ["privateClouds"], method: "rotateNsxtPassword" },
  { path: ["privateClouds"], method: "rotateVcenterPassword" },
  { path: ["privateClouds"], method: "delete" },
  { path: ["privateClouds"], method: "update" },
  { path: ["privateClouds"], method: "createOrUpdate" },

  // Clusters Operations
  { path: ["clusters"], method: "delete" },
  { path: ["clusters"], method: "update" },
  { path: ["clusters"], method: "createOrUpdate" },

  // Addons Operations
  { path: ["addons"], method: "delete" },
  { path: ["addons"], method: "createOrUpdate" },

  // Cloud Links Operations
  { path: ["cloudLinks"], method: "delete" },
  { path: ["cloudLinks"], method: "createOrUpdate" },

  // Authorizations Operations
  { path: ["authorizations"], method: "delete" },
  { path: ["authorizations"], method: "createOrUpdate" },

  // Datastores Operations
  { path: ["datastores"], method: "delete" },
  { path: ["datastores"], method: "createOrUpdate" },

  // Global Reach Connections Operations
  { path: ["globalReachConnections"], method: "delete" },
  { path: ["globalReachConnections"], method: "createOrUpdate" },

  // iSCSI Paths Operations
  { path: ["iscsiPaths"], method: "delete" },
  { path: ["iscsiPaths"], method: "createOrUpdate" },

  // Placement Policies Operations
  { path: ["placementPolicies"], method: "delete" },
  { path: ["placementPolicies"], method: "update" },
  { path: ["placementPolicies"], method: "createOrUpdate" },

  // Pure Storage Policies Operations
  { path: ["pureStoragePolicies"], method: "delete" },
  { path: ["pureStoragePolicies"], method: "createOrUpdate" },

  // Script Executions Operations
  { path: ["scriptExecutions"], method: "delete" },
  { path: ["scriptExecutions"], method: "createOrUpdate" },

  // Virtual Machines Operations
  { path: ["virtualMachines"], method: "restrictMovement" },

  // Workload Networks - VM Groups
  { path: ["workloadNetworks"], method: "deleteVMGroup" },
  { path: ["workloadNetworks"], method: "updateVMGroup" },
  { path: ["workloadNetworks"], method: "createVMGroup" },

  // Workload Networks - Segments
  { path: ["workloadNetworks"], method: "deleteSegment" },
  { path: ["workloadNetworks"], method: "updateSegments" },
  { path: ["workloadNetworks"], method: "createSegments" },

  // Workload Networks - Public IPs
  { path: ["workloadNetworks"], method: "deletePublicIP" },
  { path: ["workloadNetworks"], method: "createPublicIP" },

  // Workload Networks - Port Mirroring
  { path: ["workloadNetworks"], method: "deletePortMirroring" },
  { path: ["workloadNetworks"], method: "updatePortMirroring" },
  { path: ["workloadNetworks"], method: "createPortMirroring" },

  // Workload Networks - DNS Zones
  { path: ["workloadNetworks"], method: "deleteDnsZone" },
  { path: ["workloadNetworks"], method: "updateDnsZone" },
  { path: ["workloadNetworks"], method: "createDnsZone" },

  // Workload Networks - DNS Services
  { path: ["workloadNetworks"], method: "deleteDnsService" },
  { path: ["workloadNetworks"], method: "updateDnsService" },
  { path: ["workloadNetworks"], method: "createDnsService" },

  // Workload Networks - DHCP
  { path: ["workloadNetworks"], method: "deleteDhcp" },
  { path: ["workloadNetworks"], method: "updateDhcp" },
  { path: ["workloadNetworks"], method: "createDhcp" },
];
