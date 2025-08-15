// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Profile } from "@azure/arm-frontdoor";
import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an NetworkExperiment Profile
 *
 * @summary Creates an NetworkExperiment Profile
 * x-ms-original-file: specification/frontdoor/resource-manager/Microsoft.Network/stable/2019-11-01/examples/NetworkExperimentCreateProfile.json
 */
async function createsAnNetworkExperimentProfileInAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["FRONTDOOR_SUBSCRIPTION_ID"] || "subid";
  const profileName = "MyProfile";
  const resourceGroupName = process.env["FRONTDOOR_RESOURCE_GROUP"] || "MyResourceGroup";
  const parameters: Profile = { enabledState: "Enabled", location: "WestUs" };
  const credential = new DefaultAzureCredential();
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.beginCreateOrUpdateAndWait(
    profileName,
    resourceGroupName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsAnNetworkExperimentProfileInAResourceGroup();
}

main().catch(console.error);
