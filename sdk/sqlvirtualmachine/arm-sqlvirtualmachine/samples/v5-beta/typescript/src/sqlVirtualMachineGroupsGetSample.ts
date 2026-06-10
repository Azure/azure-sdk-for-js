// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a SQL virtual machine group.
 *
 * @summary gets a SQL virtual machine group.
 * x-ms-original-file: 2023-10-01/GetSqlVirtualMachineGroup.json
 */
async function getsASQLVirtualMachineGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachineGroups.get("testrg", "testvmgroup");
  console.log(result);
}

async function main(): Promise<void> {
  await getsASQLVirtualMachineGroup();
}

main().catch(console.error);
