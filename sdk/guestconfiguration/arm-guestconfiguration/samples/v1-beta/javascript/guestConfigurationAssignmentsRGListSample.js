// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all guest configuration assignments for a resource group.
 *
 * @summary list all guest configuration assignments for a resource group.
 * x-ms-original-file: 2024-04-05/listRGGuestConfigurationAssignments.json
 */
async function listAllGuestConfigurationAssignmentsForAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationAssignments.rGList("myResourceGroupName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllGuestConfigurationAssignmentsForAResourceGroup();
}

main().catch(console.error);
