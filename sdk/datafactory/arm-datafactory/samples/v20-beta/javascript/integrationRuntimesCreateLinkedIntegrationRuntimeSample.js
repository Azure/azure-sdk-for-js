// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a linked integration runtime entry in a shared integration runtime.
 *
 * @summary create a linked integration runtime entry in a shared integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_CreateLinkedIntegrationRuntime.json
 */
async function integrationRuntimesCreateLinkedIntegrationRuntime() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.createLinkedIntegrationRuntime(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    {
      name: "bfa92911-9fb6-4fbe-8f23-beae87bc1c83",
      dataFactoryLocation: "West US",
      dataFactoryName: "e9955d6d-56ea-4be3-841c-52a12c1a9981",
      subscriptionId: "061774c7-4b5a-4159-a55b-365581830283",
    },
  );
  console.log(result);
}

async function main() {
  await integrationRuntimesCreateLinkedIntegrationRuntime();
}

main().catch(console.error);
