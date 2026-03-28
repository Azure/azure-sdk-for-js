// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 *
 * @summary remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_RemoveLinks.json
 */
async function integrationRuntimesUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.removeLinks(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    { linkedFactoryName: "exampleFactoryName-linked" },
  );
}

async function main() {
  await integrationRuntimesUpgrade();
}

main().catch(console.error);
