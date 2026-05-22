// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list containers.
 *
 * @summary list containers.
 * x-ms-original-file: 2025-12-01/Registry/CodeContainer/list.json
 */
async function listRegistryCodeContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryCodeContainers.list("testrg123", "testregistry")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRegistryCodeContainer();
}

main().catch(console.error);
