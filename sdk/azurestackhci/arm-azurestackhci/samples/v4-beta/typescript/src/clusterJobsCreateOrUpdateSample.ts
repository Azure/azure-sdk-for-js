// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ClusterJob
 *
 * @summary create a ClusterJob
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_CreateOrUpdate_ConfigureCVM.json
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
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_CreateOrUpdate_ConfigureSdnIntegration_Enable.json
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

async function main(): Promise<void> {
  await clusterJobsCreateOrUpdateConfigureCVMJob();
  await clusterJobsCreateOrUpdateConfigureSdnIntegrationEnable();
}

main().catch(console.error);
