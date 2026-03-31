// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a AutoUpgradeProfile
 *
 * @summary delete a AutoUpgradeProfile
 * x-ms-original-file: 2026-02-01-preview/AutoUpgradeProfiles_Delete.json
 */
async function deleteAnAutoUpgradeProfileResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  await client.autoUpgradeProfiles.delete("rg1", "fleet1", "autoupgradeprofile1");
}

async function main(): Promise<void> {
  await deleteAnAutoUpgradeProfileResource();
}

main().catch(console.error);
