// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ObservabilityClient } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM.
 *
 * @summary returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM.
 * x-ms-original-file: 2024-04-24/Monitors_GetVMHostPayload_MaximumSet_Gen.json
 */
async function monitorsGetVMHostPayloadMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getVMHostPayload("myResourceGroup", "myMonitor");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM.
 *
 * @summary returns the payload that needs to be passed in the request body for installing Dynatrace agent on a VM.
 * x-ms-original-file: 2024-04-24/Monitors_GetVMHostPayload_MinimumSet_Gen.json
 */
async function monitorsGetVMHostPayloadMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  const result = await client.monitors.getVMHostPayload("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsGetVMHostPayloadMaximumSetGen();
  await monitorsGetVMHostPayloadMinimumSetGen();
}

main().catch(console.error);
