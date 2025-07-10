// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all availability group listeners in a SQL virtual machine group.
 *
 * @summary lists all availability group listeners in a SQL virtual machine group.
 * x-ms-original-file: 2023-10-01/ListByGroupAvailabilityGroupListener.json
 */
async function listsAllAvailabilityGroupListenersInASQLVirtualMachineGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.availabilityGroupListeners.listByGroup("testrg", "testvmgroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllAvailabilityGroupListenersInASQLVirtualMachineGroup();
}

main().catch(console.error);
