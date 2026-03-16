// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an Experiment
 *
 * @summary updates an Experiment
 * x-ms-original-file: 2025-10-01/NetworkExperimentUpdateExperiment.json
 */
async function updatesAnExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.experiments.update("MyResourceGroup", "MyProfile", "MyExperiment", {
    description: "string",
    enabledState: "Enabled",
  });
  console.log(result);
}

async function main() {
  await updatesAnExperiment();
}

main().catch(console.error);
