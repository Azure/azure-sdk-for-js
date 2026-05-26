// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets detailed status information for an integration runtime.
 *
 * @summary gets detailed status information for an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_GetStatus.json
 */
async function integrationRuntimesGetStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.getStatus(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
  console.log(result);
}

async function main() {
  await integrationRuntimesGetStatus();
}

main().catch(console.error);
