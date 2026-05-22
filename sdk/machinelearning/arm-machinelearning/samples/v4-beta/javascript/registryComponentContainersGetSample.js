// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get container.
 *
 * @summary get container.
 * x-ms-original-file: 2025-12-01/Registry/ComponentContainer/get.json
 */
async function getRegistryComponentContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryComponentContainers.get(
    "test-rg",
    "my-aml-registry",
    "string",
  );
  console.log(result);
}

async function main() {
  await getRegistryComponentContainer();
}

main().catch(console.error);
