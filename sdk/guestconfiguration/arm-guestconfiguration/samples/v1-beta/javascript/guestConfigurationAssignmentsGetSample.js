// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about a guest configuration assignment
 *
 * @summary get information about a guest configuration assignment
 * x-ms-original-file: 2024-04-05/getGuestConfigurationAssignment.json
 */
async function getAGuestConfigurationAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignments.get(
    "myResourceGroupName",
    "myVMName",
    "SecureProtocol",
  );
  console.log(result);
}

async function main() {
  await getAGuestConfigurationAssignment();
}

main().catch(console.error);
