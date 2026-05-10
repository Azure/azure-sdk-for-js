// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual cluster.
 *
 * @summary gets a virtual cluster.
 * x-ms-original-file: 2025-02-01-preview/VirtualClusterGet.json
 */
async function getsAVirtualCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.virtualClusters.get(
    "testrg",
    "vc-f769ed71-b3ad-491a-a9d5-26eeceaa6be2",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAVirtualCluster();
}

main().catch(console.error);
