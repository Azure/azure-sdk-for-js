// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an NetworkExperiment Profile by ProfileName
 *
 * @summary gets an NetworkExperiment Profile by ProfileName
 * x-ms-original-file: 2025-10-01/NetworkExperimentGetProfile.json
 */
async function getsAnNetworkExperimentProfileByProfileId(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.get("MyResourceGroup", "MyProfile");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAnNetworkExperimentProfileByProfileId();
}

main().catch(console.error);
