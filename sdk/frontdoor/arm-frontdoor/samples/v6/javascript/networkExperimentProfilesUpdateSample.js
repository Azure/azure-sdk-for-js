// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an NetworkExperimentProfiles
 *
 * @summary updates an NetworkExperimentProfiles
 * x-ms-original-file: 2025-10-01/NetworkExperimentUpdateProfile.json
 */
async function updatesAnExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.update("MyResourceGroup", "MyProfile", {
    enabledState: "Enabled",
    tags: { key1: "value1", key2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updatesAnExperiment();
}

main().catch(console.error);
