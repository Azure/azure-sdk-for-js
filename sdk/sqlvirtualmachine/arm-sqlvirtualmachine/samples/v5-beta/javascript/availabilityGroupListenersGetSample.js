// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlVirtualMachineClient } = require("@azure/arm-sqlvirtualmachine");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an availability group listener.
 *
 * @summary gets an availability group listener.
 * x-ms-original-file: 2023-10-01/GetAvailabilityGroupListener.json
 */
async function getsAnAvailabilityGroupListener() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlVirtualMachineClient(credential, subscriptionId);
  const result = await client.availabilityGroupListeners.get("testrg", "testvmgroup", "agl-test");
  console.log(result);
}

async function main() {
  await getsAnAvailabilityGroupListener();
}

main().catch(console.error);
