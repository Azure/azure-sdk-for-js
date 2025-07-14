// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Fleet
 *
 * @summary update a Fleet
 * x-ms-original-file: 2025-03-01/Fleets_PatchTags.json
 */
async function updateAFleet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.updateAsync(
    "rg1",
    "fleet1",
    { tags: { tier: "secure", env: "prod" } },
    { ifMatch: "dfjkwelr7384" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update a Fleet
 *
 * @summary update a Fleet
 * x-ms-original-file: 2025-03-01/Fleets_Update_MaximumSet_Gen.json
 */
async function updateAFleetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.fleets.updateAsync(
    "rgfleets",
    "fleet1",
    {
      tags: {},
      identity: { type: "None", userAssignedIdentities: { key126: {} } },
    },
    { ifMatch: "lgoeir" },
  );
  console.log(result);
}

async function main() {
  await updateAFleet();
  await updateAFleetGeneratedByMaximumSetRule();
}

main().catch(console.error);
