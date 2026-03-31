// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an NetworkExperiment Profile by ProfileName
 *
 * @summary deletes an NetworkExperiment Profile by ProfileName
 * x-ms-original-file: 2025-11-01/NetworkExperimentDeleteProfile.json
 */
async function deletesAnNetworkExperimentProfileByProfileName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.networkExperimentProfiles.delete("MyResourceGroup", "MyProfile");
}

async function main(): Promise<void> {
  await deletesAnNetworkExperimentProfileByProfileName();
}

main().catch(console.error);
