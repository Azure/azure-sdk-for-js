// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrade self-hosted integration runtime to latest version if availability.
 *
 * @summary upgrade self-hosted integration runtime to latest version if availability.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Upgrade.json
 */
async function integrationRuntimesUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.upgrade(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
}

async function main() {
  await integrationRuntimesUpgrade();
}

main().catch(console.error);
