// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all guest configuration assignments for a subscription.
 *
 * @summary list all guest configuration assignments for a subscription.
 * x-ms-original-file: 2024-04-05/listSubGuestConfigurationAssignments.json
 */
async function listAllGuestConfigurationAssignmentsForASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationAssignments.subscriptionList()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllGuestConfigurationAssignmentsForASubscription();
}

main().catch(console.error);
