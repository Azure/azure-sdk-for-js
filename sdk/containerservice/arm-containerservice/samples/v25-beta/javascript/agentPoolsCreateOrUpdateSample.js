// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsAssociate_CRG.json
 */
async function associateAgentPoolWithCapacityReservationGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    capacityReservationGroupID:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.Compute/CapacityReservationGroups/crg1",
    count: 3,
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_CustomNodeConfig.json
 */
async function createAgentPoolWithKubeletConfigAndLinuxOSConfig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    kubeletConfig: {
      allowedUnsafeSysctls: ["kernel.msg*", "net.core.somaxconn"],
      cpuCfsQuota: true,
      cpuCfsQuotaPeriod: "200ms",
      cpuManagerPolicy: "static",
      failSwapOn: false,
      imageGcHighThreshold: 90,
      imageGcLowThreshold: 70,
      topologyManagerPolicy: "best-effort",
    },
    linuxOSConfig: {
      swapFileSizeMB: 1500,
      sysctls: {
        kernelThreadsMax: 99999,
        netCoreWmemDefault: 12345,
        netIpv4IpLocalPortRange: "20000 60000",
        netIpv4TcpTwReuse: true,
      },
      transparentHugePageDefrag: "madvise",
      transparentHugePageEnabled: "always",
    },
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_DedicatedHostGroup.json
 */
async function createAgentPoolWithDedicatedHostGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    hostGroupID:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg/providers/Microsoft.Compute/hostGroups/hostgroup1",
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_EnableEncryptionAtHost.json
 */
async function createAgentPoolWithEncryptionAtHostEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    enableEncryptionAtHost: true,
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_EnableFIPS.json
 */
async function createAgentPoolWithFipsEnabledOS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    enableFips: true,
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_EnableUltraSSD.json
 */
async function createAgentPoolWithUltraSSDEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    enableUltraSSD: true,
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_Ephemeral.json
 */
async function createAgentPoolWithEphemeralOSDisk() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    orchestratorVersion: "",
    osDiskSizeGB: 64,
    osDiskType: "Ephemeral",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_GPUMIG.json
 */
async function createAgentPoolWithGpumig() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    gpuInstanceProfile: "MIG2g",
    kubeletConfig: {
      allowedUnsafeSysctls: ["kernel.msg*", "net.core.somaxconn"],
      cpuCfsQuota: true,
      cpuCfsQuotaPeriod: "200ms",
      cpuManagerPolicy: "static",
      failSwapOn: false,
      imageGcHighThreshold: 90,
      imageGcLowThreshold: 70,
      topologyManagerPolicy: "best-effort",
    },
    linuxOSConfig: {
      swapFileSizeMB: 1500,
      sysctls: {
        kernelThreadsMax: 99999,
        netCoreWmemDefault: 12345,
        netIpv4IpLocalPortRange: "20000 60000",
        netIpv4TcpTwReuse: true,
      },
      transparentHugePageDefrag: "madvise",
      transparentHugePageEnabled: "always",
    },
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_ND96asr_v4",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_MessageOfTheDay.json
 */
async function createAgentPoolWithMessageOfTheDay() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    messageOfTheDay: "Zm9vCg==",
    mode: "User",
    orchestratorVersion: "",
    osDiskSizeGB: 64,
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_OSSKU.json
 */
async function createAgentPoolWithOssku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    kubeletConfig: {
      allowedUnsafeSysctls: ["kernel.msg*", "net.core.somaxconn"],
      cpuCfsQuota: true,
      cpuCfsQuotaPeriod: "200ms",
      cpuManagerPolicy: "static",
      failSwapOn: false,
      imageGcHighThreshold: 90,
      imageGcLowThreshold: 70,
      topologyManagerPolicy: "best-effort",
    },
    linuxOSConfig: {
      swapFileSizeMB: 1500,
      sysctls: {
        kernelThreadsMax: 99999,
        netCoreWmemDefault: 12345,
        netIpv4IpLocalPortRange: "20000 60000",
        netIpv4TcpTwReuse: true,
      },
      transparentHugePageDefrag: "madvise",
      transparentHugePageEnabled: "always",
    },
    orchestratorVersion: "",
    osSKU: "AzureLinux",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_PPG.json
 */
async function createAgentPoolWithPPG() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    orchestratorVersion: "",
    osType: "Linux",
    proximityPlacementGroupID:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/rg1/providers/Microsoft.Compute/proximityPlacementGroups/ppg1",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_Snapshot.json
 */
async function createAgentPoolUsingAnAgentPoolSnapshot() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    creationData: {
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ContainerService/snapshots/snapshot1",
    },
    enableFips: true,
    orchestratorVersion: "",
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_Spot.json
 */
async function createSpotAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    nodeLabels: { key1: "val1" },
    nodeTaints: ["Key1=Value1:NoSchedule"],
    orchestratorVersion: "",
    osType: "Linux",
    scaleSetEvictionPolicy: "Delete",
    scaleSetPriority: "Spot",
    tags: { name1: "val1" },
    vmSize: "Standard_DS1_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_TypeVirtualMachines.json
 */
async function createAgentPoolWithVirtualMachinesPoolType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    typePropertiesType: "VirtualMachines",
    nodeLabels: { key1: "val1" },
    nodeTaints: ["Key1=Value1:NoSchedule"],
    orchestratorVersion: "1.9.6",
    osType: "Linux",
    tags: { name1: "val1" },
    virtualMachinesProfile: {
      scale: {
        manual: [
          { count: 3, size: "Standard_D2_v2" },
          { count: 2, size: "Standard_D2_v3" },
        ],
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_TypeVirtualMachines_Autoscale.json
 */
async function createAgentPoolWithVirtualMachinesPoolTypeWithAutoscalingEnabled() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    typePropertiesType: "VirtualMachines",
    nodeLabels: { key1: "val1" },
    nodeTaints: ["Key1=Value1:NoSchedule"],
    orchestratorVersion: "1.29.0",
    osType: "Linux",
    tags: { name1: "val1" },
    virtualMachinesProfile: {
      scale: { autoscale: { maxCount: 5, minCount: 1, size: "Standard_D2_v2" } },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_Update.json
 */
async function createOrUpdateAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    mode: "User",
    nodeLabels: { key1: "val1" },
    nodeTaints: ["Key1=Value1:NoSchedule"],
    orchestratorVersion: "",
    osType: "Linux",
    scaleSetEvictionPolicy: "Delete",
    scaleSetPriority: "Spot",
    tags: { name1: "val1" },
    vmSize: "Standard_DS1_v2",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_WasmWasi.json
 */
async function createAgentPoolWithKrustletAndTheWasiRuntime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    mode: "User",
    orchestratorVersion: "",
    osDiskSizeGB: 64,
    osType: "Linux",
    vmSize: "Standard_DS2_v2",
    workloadRuntime: "WasmWasi",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_WindowsDisableOutboundNAT.json
 */
async function createWindowsAgentPoolWithDisablingOutboundNAT() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "wnp2", {
    count: 3,
    orchestratorVersion: "1.23.8",
    osSKU: "Windows2022",
    osType: "Windows",
    vmSize: "Standard_D4s_v3",
    windowsProfile: { disableOutboundNat: true },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPoolsCreate_WindowsOSSKU.json
 */
async function createAgentPoolWithWindowsOssku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "wnp2", {
    count: 3,
    orchestratorVersion: "1.23.3",
    osSKU: "Windows2022",
    osType: "Windows",
    vmSize: "Standard_D4s_v3",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPools_Start.json
 */
async function startAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    powerState: { code: "Running" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPools_Stop.json
 */
async function stopAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    powerState: { code: "Stopped" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an agent pool in the specified managed cluster.
 *
 * @summary creates or updates an agent pool in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/AgentPools_Update.json
 */
async function updateAgentPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPools.createOrUpdate("rg1", "clustername1", "agentpool1", {
    count: 3,
    enableAutoScaling: true,
    maxCount: 2,
    minCount: 2,
    nodeTaints: ["Key1=Value1:NoSchedule"],
    orchestratorVersion: "",
    osType: "Linux",
    scaleSetEvictionPolicy: "Delete",
    scaleSetPriority: "Spot",
    vmSize: "Standard_DS1_v2",
  });
  console.log(result);
}

async function main() {
  await associateAgentPoolWithCapacityReservationGroup();
  await createAgentPoolWithKubeletConfigAndLinuxOSConfig();
  await createAgentPoolWithDedicatedHostGroup();
  await createAgentPoolWithEncryptionAtHostEnabled();
  await createAgentPoolWithFipsEnabledOS();
  await createAgentPoolWithUltraSSDEnabled();
  await createAgentPoolWithEphemeralOSDisk();
  await createAgentPoolWithGpumig();
  await createAgentPoolWithMessageOfTheDay();
  await createAgentPoolWithOssku();
  await createAgentPoolWithPPG();
  await createAgentPoolUsingAnAgentPoolSnapshot();
  await createSpotAgentPool();
  await createAgentPoolWithVirtualMachinesPoolType();
  await createAgentPoolWithVirtualMachinesPoolTypeWithAutoscalingEnabled();
  await createOrUpdateAgentPool();
  await createAgentPoolWithKrustletAndTheWasiRuntime();
  await createWindowsAgentPoolWithDisablingOutboundNAT();
  await createAgentPoolWithWindowsOssku();
  await startAgentPool();
  await stopAgentPool();
  await updateAgentPool();
}

main().catch(console.error);
