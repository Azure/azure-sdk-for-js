// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get container.
 *
 * @summary get container.
 * x-ms-original-file: 2025-12-01/Registry/EnvironmentContainer/get.json
 */
async function getRegistryEnvironmentContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryEnvironmentContainers.get(
    "testrg123",
    "testregistry",
    "testEnvironment",
  );
  console.log(result);
}

async function main() {
  await getRegistryEnvironmentContainer();
}

main().catch(console.error);
