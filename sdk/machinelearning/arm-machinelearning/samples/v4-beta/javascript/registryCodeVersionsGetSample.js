// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get version.
 *
 * @summary get version.
 * x-ms-original-file: 2025-12-01/Registry/CodeVersion/get.json
 */
async function getRegistryCodeVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryCodeVersions.get(
    "test-rg",
    "my-aml-registry",
    "string",
    "string",
  );
  console.log(result);
}

async function main() {
  await getRegistryCodeVersion();
}

main().catch(console.error);
