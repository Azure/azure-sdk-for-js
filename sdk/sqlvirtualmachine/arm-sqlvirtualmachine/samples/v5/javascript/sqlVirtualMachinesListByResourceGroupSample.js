// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all SQL virtual machines in a resource group.
 *
 * @summary gets all SQL virtual machines in a resource group.
 * x-ms-original-file: 2023-10-01/ListByResourceGroupSqlVirtualMachine.json
 */
async function getsAllSQLVirtualMachinesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachines.listByResourceGroup("testrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllSQLVirtualMachinesInAResourceGroup();
}

main().catch(console.error);
