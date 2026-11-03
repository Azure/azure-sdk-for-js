// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an integration runtime.
 *
 * @summary creates or updates an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Create.json
 */
async function integrationRuntimesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    { properties: { type: "SelfHosted", description: "A selfhosted integration runtime" } },
  );
  console.log(result);
}

async function main() {
  await integrationRuntimesCreate();
}

main().catch(console.error);
