// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Fleet
 *
 * @summary delete a Fleet
 * x-ms-original-file: 2026-02-01-preview/Fleets_Delete.json
 */
async function deletesAFleetResourceAsynchronouslyWithALongRunningOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.fleets.delete("rg1", "fleet1");
}

async function main() {
  await deletesAFleetResourceAsynchronouslyWithALongRunningOperation();
}

main().catch(console.error);
