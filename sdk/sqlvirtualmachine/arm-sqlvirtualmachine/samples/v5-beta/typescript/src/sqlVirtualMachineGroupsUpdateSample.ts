// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates SQL virtual machine group tags.
 *
 * @summary updates SQL virtual machine group tags.
 * x-ms-original-file: 2023-10-01/UpdateSqlVirtualMachineGroup.json
 */
async function updatesASQLVirtualMachineGroupTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.sqlVirtualMachineGroups.update("testrg", "testvmgroup", {
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesASQLVirtualMachineGroupTags();
}

main().catch(console.error);
