// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all subgroups in an interconnect group.
 *
 * @summary gets all subgroups in an interconnect group.
 * x-ms-original-file: 2025-07-01/SubgroupList.json
 */
async function listSubgroups() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subgroups.list("rg1", "test-ig")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSubgroups();
}

main().catch(console.error);
