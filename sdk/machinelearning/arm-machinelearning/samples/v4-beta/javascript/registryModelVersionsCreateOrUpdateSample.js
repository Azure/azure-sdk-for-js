// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update version.
 *
 * @summary create or update version.
 * x-ms-original-file: 2025-12-01/Registry/ModelVersion/createOrUpdate.json
 */
async function createOrUpdateRegistryModelVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryModelVersions.createOrUpdate(
    "test-rg",
    "my-aml-registry",
    "string",
    "string",
    {
      properties: {
        description: "string",
        flavors: { string: { data: { string: "string" } } },
        isAnonymous: false,
        modelType: "CustomModel",
        modelUri: "string",
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateRegistryModelVersion();
}

main().catch(console.error);
