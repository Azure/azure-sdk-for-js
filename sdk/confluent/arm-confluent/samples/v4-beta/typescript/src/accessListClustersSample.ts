// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cluster details
 *
 * @summary cluster details
 * x-ms-original-file: 2025-08-18-preview/Access_ListClusters_MaximumSet_Gen.json
 */
async function accessListClustersMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listClusters("rgconfluent", "zfs", {
    searchFilters: { key8083: "ft" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to cluster details
 *
 * @summary cluster details
 * x-ms-original-file: 2025-08-18-preview/Access_ListClusters_MinimumSet_Gen.json
 */
async function accessListClustersMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listClusters("rgconfluent", "kfmxlzmfkz", {});
  console.log(result);
}

async function main(): Promise<void> {
  await accessListClustersMaximumSet();
  await accessListClustersMinimumSet();
}

main().catch(console.error);
