// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all SQL virtual machines in a subscription.
 *
 * @summary gets all SQL virtual machines in a subscription.
 * x-ms-original-file: 2023-10-01/ListSubscriptionSqlVirtualMachine.json
 */
async function getsAllSQLVirtualMachinesInASubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlVirtualMachines.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAllSQLVirtualMachinesInASubscription();
}

main().catch(console.error);
