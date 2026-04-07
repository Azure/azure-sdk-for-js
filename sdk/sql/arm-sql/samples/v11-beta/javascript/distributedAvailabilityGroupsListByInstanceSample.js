// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of a distributed availability groups in instance.
 *
 * @summary gets a list of a distributed availability groups in instance.
 * x-ms-original-file: 2025-02-01-preview/DistributedAvailabilityGroupsListByInstance.json
 */
async function listsAllDistributedAvailabilityGroupsInInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.distributedAvailabilityGroups.listByInstance(
    "testrg",
    "testcl",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllDistributedAvailabilityGroupsInInstance();
}

main().catch(console.error);
