// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get information about a guest configuration assignment
 *
 * @summary get information about a guest configuration assignment
 * x-ms-original-file: 2024-04-05/getGuestConfigurationConnectedVMwarevSphereAssignment.json
 */
async function getAGuestConfigurationAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationConnectedVMwarevSphereAssignments.get(
    "myResourceGroupName",
    "myVMName",
    "SecureProtocol",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAGuestConfigurationAssignment();
}

main().catch(console.error);
