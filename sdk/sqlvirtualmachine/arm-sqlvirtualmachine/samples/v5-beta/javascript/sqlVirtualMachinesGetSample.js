// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a SQL virtual machine.
 *
 * @summary gets a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/GetSqlVirtualMachine.json
 */
async function getsASQLVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachines.get("testrg", "testvm");
  console.log(result);
}

async function main() {
  await getsASQLVirtualMachine();
}

main().catch(console.error);
