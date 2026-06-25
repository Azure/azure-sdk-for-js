// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_AddServer.json
 */
async function clusterJobsCreateOrUpdateAddServerJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate("test-rg", "myCluster", "addserver", {
    properties: {
      jobType: "AddServer",
      deploymentMode: "Deploy",
      addServerJobServerDetails: [
        {
          serverName: "Node-2",
          hostIpv4Address: "192.168.10.10",
          serverResourceId:
            "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-2",
        },
      ],
      secrets: [
        {
          secretName: "cluster1-LocalAdminCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
          eceSecretName: "LocalAdminCredential",
          secretLocation:
            "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-LocalAdminCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4b",
        },
        {
          secretName: "cluster2-AzureStackLCMUserCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
          eceSecretName: "AzureStackLCMUserCredential",
          secretLocation:
            "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-AzureStackLCMUserCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4c",
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_ConfigureCVM.json
 */
async function clusterJobsCreateOrUpdateConfigureCVMJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate("test-rg", "myCluster", "ConfigureCVM", {
    properties: {
      jobType: "ConfigureCVM",
      deploymentMode: "Deploy",
      confidentialVmIntent: "Enable",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_ConfigureSdnIntegration_Enable.json
 */
async function clusterJobsCreateOrUpdateConfigureSdnIntegrationEnable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate(
    "test-rg",
    "myCluster",
    "configureSdnIntegration",
    {
      properties: {
        jobType: "ConfigureSdnIntegration",
        deploymentMode: "Deploy",
        sdnIntegrationIntent: "Enable",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_GpuCreatePartition.json
 */
async function clusterJobsCreateOrUpdateGpuCreatePartitionJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate(
    "test-rg",
    "myCluster",
    "gpuCreatePartition",
    { properties: { jobType: "GpuCreatePartition", deploymentMode: "Deploy", partitionCount: 4 } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_GpuSwitchMode.json
 */
async function clusterJobsCreateOrUpdateGpuSwitchModeJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate("test-rg", "myCluster", "gpuSwitchMode", {
    properties: { jobType: "GpuSwitchMode", deploymentMode: "Deploy", mode: "GPUP" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_RepairServer.json
 */
async function clusterJobsCreateOrUpdateRepairServerJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate("test-rg", "myCluster", "repairserver", {
    properties: {
      jobType: "RepairServer",
      deploymentMode: "Deploy",
      repairServerJobServerDetails: [
        {
          serverName: "Node-2",
          serverResourceId:
            "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-2",
        },
      ],
      secrets: [
        {
          secretName: "cluster1-LocalAdminCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
          eceSecretName: "LocalAdminCredential",
          secretLocation:
            "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-LocalAdminCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4b",
        },
        {
          secretName: "cluster2-AzureStackLCMUserCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63",
          eceSecretName: "AzureStackLCMUserCredential",
          secretLocation:
            "https://sclusterkvnirhci35.vault.azure.net/secrets/cluster-34232342-AzureStackLCMUserCredential-f5bcc1d9-23af-4ae9-aca1-041d0f593a63/9276354aabfc492fa9b2cdbefb54ae4c",
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_VmConnectProvision.json
 */
async function clusterJobsCreateOrUpdateVmConnectProvisionJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate(
    "test-rg",
    "myCluster",
    "vmConnectProvision",
    {
      properties: {
        jobType: "VmConnectProvision",
        deploymentMode: "Deploy",
        vmConnectProvisionJobDetails: [{ vmName: "myVM", nodeName: "Node-1" }],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-05-01-preview/ClusterJobs_CreateOrUpdate_VmConnectRemove.json
 */
async function clusterJobsCreateOrUpdateVmConnectRemoveJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.createOrUpdate(
    "test-rg",
    "myCluster",
    "vmConnectRemove",
    {
      properties: {
        jobType: "VmConnectRemove",
        deploymentMode: "Deploy",
        vmConnectRemoveJobDetails: [{ vmName: "myVM", nodeName: "Node-1" }],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await clusterJobsCreateOrUpdateAddServerJob();
  await clusterJobsCreateOrUpdateConfigureCVMJob();
  await clusterJobsCreateOrUpdateConfigureSdnIntegrationEnable();
  await clusterJobsCreateOrUpdateGpuCreatePartitionJob();
  await clusterJobsCreateOrUpdateGpuSwitchModeJob();
  await clusterJobsCreateOrUpdateRepairServerJob();
  await clusterJobsCreateOrUpdateVmConnectProvisionJob();
  await clusterJobsCreateOrUpdateVmConnectRemoveJob();
}

main().catch(console.error);
