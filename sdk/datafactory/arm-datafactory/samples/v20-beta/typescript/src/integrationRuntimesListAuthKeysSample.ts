// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the authentication keys for an integration runtime.
 *
 * @summary retrieves the authentication keys for an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_ListAuthKeys.json
 */
async function integrationRuntimesListAuthKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.listAuthKeys(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesListAuthKeys();
}

main().catch(console.error);
