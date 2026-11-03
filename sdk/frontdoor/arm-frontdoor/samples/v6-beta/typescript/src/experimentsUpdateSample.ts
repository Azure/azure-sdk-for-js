// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an Experiment
 *
 * @summary updates an Experiment
 * x-ms-original-file: 2025-11-01/NetworkExperimentUpdateExperiment.json
 */
async function updatesAnExperiment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.experiments.update("MyResourceGroup", "MyProfile", "MyExperiment", {
    description: "string",
    enabledState: "Enabled",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updatesAnExperiment();
}

main().catch(console.error);
