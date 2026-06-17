// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 *
 * @summary returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 * x-ms-original-file: 2025-05-01-preview/Monitors_VmHostPayload_MaximumSet_Gen.json
 */
async function monitorsVmHostPayloadMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.vmHostPayload("rgopenapi", "ipxmlcbonyxtolzejcjshkmlron");
  console.log(result);
}

/**
 * This sample demonstrates how to returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 *
 * @summary returns the payload that needs to be passed in the request body for installing the New Relic agent on a VM, providing the necessary configuration details
 * x-ms-original-file: 2025-05-01-preview/Monitors_VmHostPayload_MinimumSet_Gen.json
 */
async function monitorsVmHostPayloadMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const result = await client.monitors.vmHostPayload("rgopenapi", "ipxmlcbonyxtolzejcjshkmlron");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsVmHostPayloadMaximumSetGen();
  await monitorsVmHostPayloadMinimumSetGen();
}

main().catch(console.error);
