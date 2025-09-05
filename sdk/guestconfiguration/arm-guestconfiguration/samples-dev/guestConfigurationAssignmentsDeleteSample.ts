// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a guest configuration assignment
 *
 * @summary delete a guest configuration assignment
 * x-ms-original-file: 2024-04-05/deleteGuestConfigurationAssignment.json
 */
async function deleteAnGuestConfigurationAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  await client.guestConfigurationAssignments.delete(
    "myResourceGroupName",
    "myVMName",
    "SecureProtocol",
  );
}

async function main(): Promise<void> {
  await deleteAnGuestConfigurationAssignment();
}

main().catch(console.error);
