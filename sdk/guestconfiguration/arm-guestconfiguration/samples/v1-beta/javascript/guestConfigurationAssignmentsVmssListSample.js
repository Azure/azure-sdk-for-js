// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all guest configuration assignments for VMSS.
 *
 * @summary list all guest configuration assignments for VMSS.
 * x-ms-original-file: 2024-04-05/listVMSSGuestConfigurationAssignments.json
 */
async function listAllGuestConfigurationAssignmentsForVmss() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.guestConfigurationAssignmentsVmss.list(
    "myResourceGroupName",
    "myVMSSName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllGuestConfigurationAssignmentsForVmss();
}

main().catch(console.error);
