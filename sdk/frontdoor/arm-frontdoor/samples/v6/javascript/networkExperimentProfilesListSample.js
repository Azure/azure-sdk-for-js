// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Network Experiment Profiles under a subscription
 *
 * @summary gets a list of Network Experiment Profiles under a subscription
 * x-ms-original-file: 2025-10-01/NetworkExperimentListProfiles.json
 */
async function listNetworkExperimentProfilesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkExperimentProfiles.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNetworkExperimentProfilesInAResourceGroup();
}

main().catch(console.error);
