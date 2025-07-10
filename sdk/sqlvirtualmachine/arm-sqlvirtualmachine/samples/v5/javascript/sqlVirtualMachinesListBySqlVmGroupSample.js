// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the list of sql virtual machines in a SQL virtual machine group.
 *
 * @summary gets the list of sql virtual machines in a SQL virtual machine group.
 * x-ms-original-file: 2023-10-01/ListBySqlVirtualMachineGroupSqlVirtualMachine.json
 */
async function getsTheListOfSqlVirtualMachinesInASQLVirtualMachineGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachines.listBySqlVmGroup("testrg", "testvm")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheListOfSqlVirtualMachinesInASQLVirtualMachineGroup();
}

main().catch(console.error);
