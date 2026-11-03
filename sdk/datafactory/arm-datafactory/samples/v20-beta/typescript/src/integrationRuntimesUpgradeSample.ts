// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrade self-hosted integration runtime to latest version if availability.
 *
 * @summary upgrade self-hosted integration runtime to latest version if availability.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Upgrade.json
 */
async function integrationRuntimesUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.upgrade(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
}

async function main(): Promise<void> {
  await integrationRuntimesUpgrade();
}

main().catch(console.error);
