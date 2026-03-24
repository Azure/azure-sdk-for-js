// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a UpdateRun
 *
 * @summary delete a UpdateRun
 * x-ms-original-file: 2026-02-01-preview/UpdateRuns_Delete.json
 */
async function deleteAnUpdateRunResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.updateRuns.delete("rg1", "fleet1", "run1");
}

async function main() {
  await deleteAnUpdateRunResource();
}

main().catch(console.error);
