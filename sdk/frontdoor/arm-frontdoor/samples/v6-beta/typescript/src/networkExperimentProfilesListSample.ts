// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Network Experiment Profiles under a subscription
 *
 * @summary gets a list of Network Experiment Profiles under a subscription
 * x-ms-original-file: 2025-11-01/NetworkExperimentListProfiles.json
 */
async function listNetworkExperimentProfilesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkExperimentProfiles.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNetworkExperimentProfilesInAResourceGroup();
}

main().catch(console.error);
