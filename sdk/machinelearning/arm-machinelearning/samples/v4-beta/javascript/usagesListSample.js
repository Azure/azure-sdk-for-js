// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the current usage information as well as limits for AML resources for given subscription and location.
 *
 * @summary gets the current usage information as well as limits for AML resources for given subscription and location.
 * x-ms-original-file: 2025-12-01/Usage/list.json
 */
async function listUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listUsages();
}

main().catch(console.error);
