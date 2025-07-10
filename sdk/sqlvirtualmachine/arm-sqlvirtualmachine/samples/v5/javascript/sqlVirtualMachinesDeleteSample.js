// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a SQL virtual machine.
 *
 * @summary deletes a SQL virtual machine.
 * x-ms-original-file: 2023-10-01/DeleteSqlVirtualMachine.json
 */
async function deletesASQLVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.sqlVirtualMachines.delete("testrg", "testvm1");
}

async function main() {
  await deletesASQLVirtualMachine();
}

main().catch(console.error);
