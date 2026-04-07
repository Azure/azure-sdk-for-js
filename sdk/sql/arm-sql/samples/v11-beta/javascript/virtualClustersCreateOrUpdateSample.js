// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates virtual cluster.
 *
 * @summary creates virtual cluster.
 * x-ms-original-file: 2025-02-01-preview/VirtualClusterCreate.json
 */
async function createVirtualCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.virtualClusters.createOrUpdate(
    "testrg",
    "vc-subnet1-f769ed71-b3ad-491a-a9d5-26eeceaa6be2",
    { location: "japaneast", tags: { key: "value" } },
  );
  console.log(result);
}

async function main() {
  await createVirtualCluster();
}

main().catch(console.error);
