// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Experiment
 *
 * @summary creates or updates an Experiment
 * x-ms-original-file: 2025-11-01/NetworkExperimentCreateExperiment.json
 */
async function createsAnExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.experiments.createOrUpdate(
    "MyResourceGroup",
    "MyProfile",
    "MyExperiment",
    {
      description: "this is my first experiment!",
      enabledState: "Enabled",
      endpointA: { name: "endpoint A", endpoint: "endpointA.net" },
      endpointB: { name: "endpoint B", endpoint: "endpointB.net" },
    },
  );
  console.log(result);
}

async function main() {
  await createsAnExperiment();
}

main().catch(console.error);
