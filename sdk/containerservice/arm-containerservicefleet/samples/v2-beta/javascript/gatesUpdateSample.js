// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Gate
 *
 * @summary update a Gate
 * x-ms-original-file: 2025-04-01-preview/Gates_Update.json
 */
async function updatesAGateResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.gates.update(
    "rg1",
    "fleet1",
    "12345678-910a-bcde-f000-000000000000",
    { properties: { state: "Completed" } },
  );
  console.log(result);
}

async function main() {
  await updatesAGateResource();
}

main().catch(console.error);
