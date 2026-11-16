// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-10-01/ClusterJobs_CreateOrUpdate_AddServer.json
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
 * x-ms-original-file: 2026-10-01/ClusterJobs_CreateOrUpdate_ConfigureSdnIntegration_Enable.json
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
 * x-ms-original-file: 2026-10-01/ClusterJobs_CreateOrUpdate_RepairServer.json
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

async function main(): Promise<void> {
  await clusterJobsCreateOrUpdateAddServerJob();
  await clusterJobsCreateOrUpdateConfigureSdnIntegrationEnable();
  await clusterJobsCreateOrUpdateRepairServerJob();
}

main().catch(console.error);
