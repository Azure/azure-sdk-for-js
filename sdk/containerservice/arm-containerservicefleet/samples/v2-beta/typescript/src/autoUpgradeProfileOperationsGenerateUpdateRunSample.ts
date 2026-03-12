// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates an update run for a given auto upgrade profile.
 *
 * @summary generates an update run for a given auto upgrade profile.
 * x-ms-original-file: 2025-08-01-preview/AutoUpgradeProfileOperations_GenerateUpdateRun_MaximumSet_Gen.json
 */
async function autoUpgradeProfileOperationsGenerateUpdateRunMaximumSet(): Promise<void> {
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

async function main(): Promise<void> {
  await autoUpgradeProfileOperationsGenerateUpdateRunMaximumSet();
}

main().catch(console.error);
