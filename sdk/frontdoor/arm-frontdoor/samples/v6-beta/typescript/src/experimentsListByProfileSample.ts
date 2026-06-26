// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of Experiments
 *
 * @summary gets a list of Experiments
 * x-ms-original-file: 2025-11-01/NetworkExperimentListExperiments.json
 */
async function getsAListOfExperiments(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.experiments.listByProfile("MyResourceGroup", "MyProfile")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAListOfExperiments();
}

main().catch(console.error);
