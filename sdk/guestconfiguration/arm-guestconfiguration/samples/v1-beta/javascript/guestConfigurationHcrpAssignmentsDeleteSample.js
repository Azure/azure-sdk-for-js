// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a guest configuration assignment
 *
 * @summary delete a guest configuration assignment
 * x-ms-original-file: 2024-04-05/deleteGuestConfigurationHCRPAssignment.json
 */
async function deleteAnGuestConfigurationAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  await client.guestConfigurationHcrpAssignments.delete(
    "myResourceGroupName",
    "myMachineName",
    "SecureProtocol",
  );
}

async function main() {
  await deleteAnGuestConfigurationAssignment();
}

main().catch(console.error);
