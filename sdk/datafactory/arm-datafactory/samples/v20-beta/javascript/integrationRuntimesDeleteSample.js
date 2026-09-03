// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an integration runtime.
 *
 * @summary deletes an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Delete.json
 */
async function integrationRuntimesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
}

async function main() {
  await integrationRuntimesDelete();
}

main().catch(console.error);
