// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Experiments
 *
 * @summary gets a list of Experiments
 * x-ms-original-file: 2025-10-01/NetworkExperimentListExperiments.json
 */
async function getsAListOfExperiments() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.experiments.listByProfile("MyResourceGroup", "MyProfile")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfExperiments();
}

main().catch(console.error);
