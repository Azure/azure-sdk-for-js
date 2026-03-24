// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Code container.
 *
 * @summary get Code container.
 * x-ms-original-file: 2025-12-01/Registry/CodeContainer/get.json
 */
async function getRegistryCodeContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeContainers.get(
    "testrg123",
    "testregistry",
    "testContainer",
  );
  console.log(result);
}

async function main() {
  await getRegistryCodeContainer();
}

main().catch(console.error);
