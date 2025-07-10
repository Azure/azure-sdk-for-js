// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of sql virtual machines in a SQL virtual machine group.
 *
 * @summary gets the list of sql virtual machines in a SQL virtual machine group.
 * x-ms-original-file: 2023-10-01/ListBySqlVirtualMachineGroupSqlVirtualMachine.json
 */
async function getsTheListOfSqlVirtualMachinesInASQLVirtualMachineGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachines.listBySqlVmGroup("testrg", "testvm")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfSqlVirtualMachinesInASQLVirtualMachineGroup();
}

main().catch(console.error);
