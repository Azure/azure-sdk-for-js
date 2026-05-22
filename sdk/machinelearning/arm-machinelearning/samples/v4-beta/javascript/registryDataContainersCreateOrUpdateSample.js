// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update container.
 *
 * @summary create or update container.
 * x-ms-original-file: 2025-12-01/Registry/DataContainer/createOrUpdate.json
 */
async function createOrUpdateRegistryDataContainer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryDataContainers.createOrUpdate(
    "test-rg",
    "registryName",
    "string",
    {
      properties: {
        description: "string",
        dataType: "uri_folder",
        isArchived: false,
        properties: { string: "string" },
        tags: { string: "string" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateRegistryDataContainer();
}

main().catch(console.error);
