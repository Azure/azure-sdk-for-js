// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an NetworkExperimentProfiles
 *
 * @summary updates an NetworkExperimentProfiles
 * x-ms-original-file: 2025-11-01/NetworkExperimentUpdateProfile.json
 */
async function updatesAnExperiment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.update("MyResourceGroup", "MyProfile", {
    enabledState: "Enabled",
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAnExperiment();
}

main().catch(console.error);
