// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an availability group listener.
 *
 * @summary deletes an availability group listener.
 * x-ms-original-file: 2023-10-01/DeleteAvailabilityGroupListener.json
 */
async function deletesAnAvailabilityGroupListener() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  await client.availabilityGroupListeners.delete("testrg", "testvmgroup", "agl-test");
}

async function main() {
  await deletesAnAvailabilityGroupListener();
}

main().catch(console.error);
