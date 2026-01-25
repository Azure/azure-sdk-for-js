// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a EdgeDeviceJob
 *
 * @summary create a EdgeDeviceJob
 * x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_CreateOrUpdate_CollectLog.json
 */
async function edgeDeviceJobsCreateOrUpdateCollectLog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const result = await client.edgeDeviceJobs.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "default",
    "collectLog",
    {
      kind: "HCI",
      properties: {
        fromDate: new Date("2024-01-29T10:43:27.9471574Z"),
        jobType: "CollectLog",
        toDate: new Date("2024-01-29T10:43:27.9471574Z"),
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a EdgeDeviceJob
 *
 * @summary create a EdgeDeviceJob
 * x-ms-original-file: 2025-12-01-preview/EdgeDeviceJobs_CreateOrUpdate_RemoteSupport.json
 */
async function edgeDeviceJobsCreateOrUpdateRemoteSupport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const result = await client.edgeDeviceJobs.createOrUpdate(
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1",
    "default",
    "collectLog",
    {
      kind: "HCI",
      properties: {
        type: "Enable",
        accessLevel: "Diagnostics",
        expirationTimestamp: new Date("2024-01-29T10:43:27.9471574Z"),
        jobType: "RemoteSupport",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeDeviceJobsCreateOrUpdateCollectLog();
  await edgeDeviceJobsCreateOrUpdateRemoteSupport();
}

main().catch(console.error);
