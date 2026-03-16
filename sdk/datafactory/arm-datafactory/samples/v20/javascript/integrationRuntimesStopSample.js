// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a ManagedReserved type integration runtime.
 *
 * @summary stops a ManagedReserved type integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Stop.json
 */
async function integrationRuntimesStop() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.stop(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedIntegrationRuntime",
  );
}

async function main() {
  await integrationRuntimesStop();
}

main().catch(console.error);
