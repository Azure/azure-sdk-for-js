// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a UpdateRun
 *
 * @summary get a UpdateRun
 * x-ms-original-file: 2025-03-01/UpdateRuns_Get.json
 */
async function getsAnUpdateRunResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.get("rg1", "fleet1", "run1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a UpdateRun
 *
 * @summary get a UpdateRun
 * x-ms-original-file: 2025-03-01/UpdateRuns_Get_MaximumSet_Gen.json
 */
async function getsAnUpdateRunResourceGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.updateRuns.get("rgfleets", "fleet1", "fleet1");
  console.log(result);
}

async function main() {
  await getsAnUpdateRunResource();
  await getsAnUpdateRunResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
