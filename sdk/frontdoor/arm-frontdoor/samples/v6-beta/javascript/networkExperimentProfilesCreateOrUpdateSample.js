// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates an NetworkExperiment Profile
 *
 * @summary creates an NetworkExperiment Profile
 * x-ms-original-file: 2025-11-01/NetworkExperimentCreateProfile.json
 */
async function createsAnNetworkExperimentProfileInAResourceGroup() {
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

async function main() {
  await createsAnNetworkExperimentProfileInAResourceGroup();
}

main().catch(console.error);
