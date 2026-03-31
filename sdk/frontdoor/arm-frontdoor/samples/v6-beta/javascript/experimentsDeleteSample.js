// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an Experiment
 *
 * @summary deletes an Experiment
 * x-ms-original-file: 2025-11-01/NetworkExperimentDeleteExperiment.json
 */
async function deletesAnExperiment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.experiments.delete("MyResourceGroup", "MyProfile", "MyExperiment");
}

async function main() {
  await deletesAnExperiment();
}

main().catch(console.error);
