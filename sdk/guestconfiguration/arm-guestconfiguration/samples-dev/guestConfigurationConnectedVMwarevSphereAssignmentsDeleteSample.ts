// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a guest configuration assignment
 *
 * @summary Delete a guest configuration assignment
 * x-ms-original-file: specification/guestconfiguration/resource-manager/Microsoft.GuestConfiguration/stable/2022-01-25/examples/deleteGuestConfigurationConnectedVMwarevSphereAssignment.json
 */

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnGuestConfigurationAssignment(): Promise<void> {
  const subscriptionId = process.env["GUESTCONFIGURATION_SUBSCRIPTION_ID"] || "mySubscriptionId";
  const resourceGroupName =
    process.env["GUESTCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroupName";
  const vmName = "myVMName";
  const guestConfigurationAssignmentName = "SecureProtocol";
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationConnectedVMwarevSphereAssignments.delete(
    resourceGroupName,
    vmName,
    guestConfigurationAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnGuestConfigurationAssignment();
}

main().catch(console.error);
