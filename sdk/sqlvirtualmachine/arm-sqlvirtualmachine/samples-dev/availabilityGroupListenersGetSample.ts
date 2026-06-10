// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an availability group listener.
 *
 * @summary gets an availability group listener.
 * x-ms-original-file: 2023-10-01/GetAvailabilityGroupListener.json
 */
async function getsAnAvailabilityGroupListener(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.availabilityGroupListeners.get("testrg", "testvmgroup", "agl-test");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnAvailabilityGroupListener();
}

main().catch(console.error);
