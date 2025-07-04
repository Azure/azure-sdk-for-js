// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a UpdateRun
 *
 * @summary delete a UpdateRun
 * x-ms-original-file: 2025-03-01/UpdateRuns_Delete.json
 */
async function deleteAnUpdateRunResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.updateRuns.delete("rg1", "fleet1", "run1");
}

/**
 * This sample demonstrates how to delete a UpdateRun
 *
 * @summary delete a UpdateRun
 * x-ms-original-file: 2025-03-01/UpdateRuns_Delete_MaximumSet_Gen.json
 */
async function deleteAnUpdateRunResourceGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.updateRuns.delete("rgfleets", "fleet1", "fleet1", {
    ifMatch: "xnbwucfeufeagpa",
  });
}

async function main() {
  await deleteAnUpdateRunResource();
  await deleteAnUpdateRunResourceGeneratedByMaximumSetRule();
}

main().catch(console.error);
