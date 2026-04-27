// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetClient } from "@azure/arm-containerservicefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a AutoUpgradeProfile
 *
 * @summary get a AutoUpgradeProfile
 * x-ms-original-file: 2026-02-01-preview/AutoUpgradeProfiles_Get.json
 */
async function getsAnAutoUpgradeProfileResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceFleetClient(credential, subscriptionId);
  const result = await client.autoUpgradeProfiles.get("rgfleets", "fleet1", "autoupgradeprofile1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnAutoUpgradeProfileResource();
}

main().catch(console.error);
