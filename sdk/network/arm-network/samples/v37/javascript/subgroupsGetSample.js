// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified subgroup in an interconnect group.
 *
 * @summary gets the specified subgroup in an interconnect group.
 * x-ms-original-file: 2025-07-01/SubgroupGet.json
 */
async function getSubgroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subgroups.get("rg1", "test-ig", "subgroup0");
  console.log(result);
}

async function main() {
  await getSubgroup();
}

main().catch(console.error);
