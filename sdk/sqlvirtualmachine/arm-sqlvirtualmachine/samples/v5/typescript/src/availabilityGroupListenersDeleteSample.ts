// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlVirtualMachineClient } from "@azure/arm-sqlvirtualmachine";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an availability group listener.
 *
 * @summary deletes an availability group listener.
 * x-ms-original-file: 2023-10-01/DeleteAvailabilityGroupListener.json
 */
async function deletesAnAvailabilityGroupListener(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.availabilityGroupListeners.delete("testrg", "testvmgroup", "agl-test");
}

async function main(): Promise<void> {
  await deletesAnAvailabilityGroupListener();
}

main().catch(console.error);
