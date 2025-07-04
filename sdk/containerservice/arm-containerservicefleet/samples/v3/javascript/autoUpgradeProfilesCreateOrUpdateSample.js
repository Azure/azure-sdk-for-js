// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a AutoUpgradeProfile
 *
 * @summary create a AutoUpgradeProfile
 * x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_CreateOrUpdate.json
 */
async function createAnAutoUpgradeProfile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.autoUpgradeProfiles.createOrUpdate(
    "rg1",
    "fleet1",
    "autoupgradeprofile1",
    { properties: { channel: "Stable" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a AutoUpgradeProfile
 *
 * @summary create a AutoUpgradeProfile
 * x-ms-original-file: 2025-03-01/AutoUpgradeProfiles_CreateOrUpdate_MaximumSet_Gen.json
 */
async function createAnAutoUpgradeProfileGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.autoUpgradeProfiles.createOrUpdate(
    "rgfleets",
    "fleet1",
    "autoupgradeprofile1",
    {
      properties: {
        channel: "Stable",
        updateStrategyId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgfleets/providers/Microsoft.ContainerService/fleets/fleet1/updateStrategies/strategy1",
        nodeImageSelection: { type: "Latest" },
        disabled: true,
        autoUpgradeProfileStatus: { lastTriggerError: {} },
      },
    },
    { ifMatch: "teikqmg", ifNoneMatch: "ghfmmyrekxincsxklbldnvhqd" },
  );
  console.log(result);
}

async function main() {
  await createAnAutoUpgradeProfile();
  await createAnAutoUpgradeProfileGeneratedByMaximumSetRule();
}

main().catch(console.error);
