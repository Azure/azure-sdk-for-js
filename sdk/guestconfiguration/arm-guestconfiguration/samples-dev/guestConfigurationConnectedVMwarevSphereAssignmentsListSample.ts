// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all guest configuration assignments for an ARC machine.
 *
 * @summary List all guest configuration assignments for an ARC machine.
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/listGuestConfigurationConnectedVMwarevSphereAssignments.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllGuestConfigurationAssignmentsForAVirtualMachine(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmName = "myVMName";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationConnectedVMwarevSphereAssignments.list(
    resourceGroupName,
    vmName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllGuestConfigurationAssignmentsForAVirtualMachine();
}

main().catch(console.error);
