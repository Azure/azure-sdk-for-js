// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a dedicated host.
 *
 * @summary delete a dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Delete_MaximumSet_Gen.json
 */
async function dedicatedHostDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.dedicatedHosts.delete("rgcompute", "aaaaaa", "aaaaaaaaaaaaaaa");
}

/**
 * This sample demonstrates how to delete a dedicated host.
 *
 * @summary delete a dedicated host.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Delete_MinimumSet_Gen.json
 */
async function dedicatedHostDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.dedicatedHosts.delete("rgcompute", "aaaaaaaaaaaaaaa", "aaaaa");
}

async function main() {
  await dedicatedHostDeleteMaximumSetGen();
  await dedicatedHostDeleteMinimumSetGen();
}

main().catch(console.error);
