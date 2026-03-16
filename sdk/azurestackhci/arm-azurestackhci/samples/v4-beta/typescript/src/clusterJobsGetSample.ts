// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ClusterJob
 *
 * @summary get a ClusterJob
 * x-ms-original-file: 2026-03-01-preview/ClusterJobs_Get_ConfigureSdnIntegrationJob.json
 */
async function clusterJobsGetConfigureSdnIntegrationJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6D37FF61-4C93-4377-B06B-FC6D6D561A7D";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.clusterJobs.get("rghci", "Y-k0MG", "configureSdnIntegration");
  console.log(result);
}

async function main(): Promise<void> {
  await clusterJobsGetConfigureSdnIntegrationJob();
}

main().catch(console.error);
