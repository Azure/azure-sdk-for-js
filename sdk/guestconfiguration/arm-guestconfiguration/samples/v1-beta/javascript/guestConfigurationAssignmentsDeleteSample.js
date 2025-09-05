// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a guest configuration assignment
 *
 * @summary delete a guest configuration assignment
 * x-ms-original-file: 2024-04-05/deleteGuestConfigurationAssignment.json
 */
async function deleteAnGuestConfigurationAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  await client.guestConfigurationAssignments.delete(
    "myResourceGroupName",
    "myVMName",
    "SecureProtocol",
  );
}

async function main() {
  await deleteAnGuestConfigurationAssignment();
}

main().catch(console.error);
