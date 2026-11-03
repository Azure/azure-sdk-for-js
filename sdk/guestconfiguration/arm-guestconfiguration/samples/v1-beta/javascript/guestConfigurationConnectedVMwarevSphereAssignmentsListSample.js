// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all guest configuration assignments for an ARC machine.
 *
 * @summary list all guest configuration assignments for an ARC machine.
 * x-ms-original-file: 2024-04-05/listGuestConfigurationConnectedVMwarevSphereAssignments.json
 */
async function listAllGuestConfigurationAssignmentsForAVirtualMachine() {
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

async function main() {
  await listAllGuestConfigurationAssignmentsForAVirtualMachine();
}

main().catch(console.error);
