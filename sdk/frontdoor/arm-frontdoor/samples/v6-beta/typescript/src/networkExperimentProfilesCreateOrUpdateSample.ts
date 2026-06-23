// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an NetworkExperiment Profile
 *
 * @summary creates an NetworkExperiment Profile
 * x-ms-original-file: 2025-11-01/NetworkExperimentCreateProfile.json
 */
async function createsAnNetworkExperimentProfileInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.createOrUpdate(
    "MyProfile",
    "MyResourceGroup",
    { location: "WestUs", enabledState: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAnNetworkExperimentProfileInAResourceGroup();
}

main().catch(console.error);
