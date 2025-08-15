// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfileUpdateModel } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates an NetworkExperimentProfiles
 *
 * @summary Updates an NetworkExperimentProfiles
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentUpdateProfile.json
 */
async function updatesAnExperiment(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const profileName = "MyProfile";
  const parameters: ProfileUpdateModel = {
    enabledState: "Enabled",
    tags: { key1: "value1", key2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.beginUpdateAndWait(
    resourceGroupName,
    profileName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAnExperiment();
}

main().catch(console.error);
