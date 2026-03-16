// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an Experiment by ExperimentName
 *
 * @summary gets an Experiment by ExperimentName
 * x-ms-original-file: 2025-10-01/NetworkExperimentGetExperiment.json
 */
async function getsAnExperimentByExperimentName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const result = await client.experiments.get("MyResourceGroup", "MyProfile", "MyExperiment");
  console.log(result);
}

async function main() {
  await getsAnExperimentByExperimentName();
}

main().catch(console.error);
