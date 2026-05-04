// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enable interactive authoring of Managed Virtual Network integration runtime.
 *
 * @summary enable interactive authoring of Managed Virtual Network integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_EnableInteractiveQuery.json
 */
async function integrationRuntimeEnableInteractiveQuery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntime.enableInteractiveQuery(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    { autoTerminationMinutes: 10 },
  );
  console.log(result);
}

async function main() {
  await integrationRuntimeEnableInteractiveQuery();
}

main().catch(console.error);
