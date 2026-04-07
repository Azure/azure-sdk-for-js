// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a distributed availability group info.
 *
 * @summary gets a distributed availability group info.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsGet.json
 */
async function getsTheDistributedAvailabilityGroupInfo() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.distributedAvailabilityGroups.get("testrg", "testcl", "dag");
  console.log(result);
}

async function main() {
  await getsTheDistributedAvailabilityGroupInfo();
}

main().catch(console.error);
