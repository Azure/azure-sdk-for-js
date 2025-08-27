// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generates an update run for a given auto upgrade profile.
 *
 * @summary generates an update run for a given auto upgrade profile.
 * x-ms-original-file: 2025-04-01-preview/AutoUpgradeProfileOperations_GenerateUpdateRun_MaximumSet_Gen.json
 */

const { ContainerServiceFleetClient } = require("@azure/arm-containerservicefleet");
const { DefaultAzureCredential } = require("@azure/identity");

async function autoUpgradeProfileOperationsGenerateUpdateRunMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.autoUpgradeProfileOperations.generateUpdateRun(
    "rgfleets",
    "fleet1",
    "aup1",
  );
  console.log(result);
}

async function main() {
  await autoUpgradeProfileOperationsGenerateUpdateRunMaximumSet();
}

main().catch(console.error);
