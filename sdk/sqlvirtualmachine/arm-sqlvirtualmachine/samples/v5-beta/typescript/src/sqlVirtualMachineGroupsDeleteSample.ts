// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a SQL virtual machine group.
 *
 * @summary deletes a SQL virtual machine group.
 * x-ms-original-file: 2023-10-01/DeleteSqlVirtualMachineGroup.json
 */
async function deletesASQLVirtualMachineGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.sqlVirtualMachineGroups.delete("testrg", "testvmgroup");
}

async function main(): Promise<void> {
  await deletesASQLVirtualMachineGroup();
}

main().catch(console.error);
