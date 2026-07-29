// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { GuestConfigurationClient } = require("@azure/arm-guestconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about a guest configuration assignment for VMSS
 *
 * @summary get information about a guest configuration assignment for VMSS
 * x-ms-original-file: 2024-04-05/getVMSSGuestConfigurationAssignment.json
 */
async function getAVmssGuestConfigurationAssignment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "mySubscriptionId";
  const client = new GuestConfigurationClient(credential, subscriptionId);
  const result = await client.guestConfigurationAssignmentsVmss.get(
    "myResourceGroupName",
    "myVMSSName",
    "SecureProtocol",
  );
  console.log(result);
}

async function main() {
  await getAVmssGuestConfigurationAssignment();
}

main().catch(console.error);
