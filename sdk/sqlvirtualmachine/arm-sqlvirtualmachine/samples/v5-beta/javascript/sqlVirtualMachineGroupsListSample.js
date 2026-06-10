// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all SQL virtual machine groups in a subscription.
 *
 * @summary gets all SQL virtual machine groups in a subscription.
 * x-ms-original-file: 2023-10-01/ListSubscriptionSqlVirtualMachineGroup.json
 */
async function getsAllSQLVirtualMachineGroupsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachineGroups.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllSQLVirtualMachineGroupsInASubscription();
}

main().catch(console.error);
