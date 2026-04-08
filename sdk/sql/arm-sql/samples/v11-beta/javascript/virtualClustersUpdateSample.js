// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing virtual cluster.
 *
 * @summary updates an existing virtual cluster.
 * x-ms-original-file: 2025-02-01-preview/VirtualClusterUpdate.json
 */
async function updateVirtualClusterWithTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.virtualClusters.update(
    "testrg",
    "vc-subnet1-f769ed71-b3ad-491a-a9d5-26eeceaa6be2",
    { tags: { tkey: "tvalue1" } },
  );
  console.log(result);
}

async function main() {
  await updateVirtualClusterWithTags();
}

main().catch(console.error);
