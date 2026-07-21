// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an NetworkExperiment Profile by ProfileName
 *
 * @summary gets an NetworkExperiment Profile by ProfileName
 * x-ms-original-file: 2025-11-01/NetworkExperimentGetProfile.json
 */
async function getsAnNetworkExperimentProfileByProfileId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.networkExperimentProfiles.get("MyResourceGroup", "MyProfile");
  console.log(result);
}

async function main() {
  await getsAnNetworkExperimentProfileByProfileId();
}

main().catch(console.error);
