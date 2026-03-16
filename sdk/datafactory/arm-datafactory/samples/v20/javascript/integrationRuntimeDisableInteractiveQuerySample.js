// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disable interactive authoring of Managed Virtual Network integration runtime.
 *
 * @summary disable interactive authoring of Managed Virtual Network integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_DisableInteractiveQuery.json
 */
async function integrationRuntimeDisableInteractiveQuery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntime.disableInteractiveQuery(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
  console.log(result);
}

async function main() {
  await integrationRuntimeDisableInteractiveQuery();
}

main().catch(console.error);
