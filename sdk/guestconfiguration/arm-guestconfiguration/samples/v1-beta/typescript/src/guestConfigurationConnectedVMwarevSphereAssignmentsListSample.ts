// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all guest configuration assignments for an ARC machine.
 *
 * @summary list all guest configuration assignments for an ARC machine.
 * x-ms-original-file: 2024-04-05/listGuestConfigurationConnectedVMwarevSphereAssignments.json
 */
async function listAllGuestConfigurationAssignmentsForAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationConnectedVMwarevSphereAssignments.list(
    "myResourceGroupName",
    "myVMName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllGuestConfigurationAssignmentsForAVirtualMachine();
}

main().catch(console.error);
