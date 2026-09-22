// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a guest configuration assignment for VMSS
 *
 * @summary delete a guest configuration assignment for VMSS
 * x-ms-original-file: 2024-04-05/deleteGuestConfigurationVMSSAssignment.json
 */
async function deleteAnGuestConfigurationAssignmentForVmss() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentsVmss.delete(
    "myResourceGroupName",
    "myVMSSName",
    "SecureProtocol",
  );
  console.log(result);
}

async function main() {
  await deleteAnGuestConfigurationAssignmentForVmss();
}

main().catch(console.error);
