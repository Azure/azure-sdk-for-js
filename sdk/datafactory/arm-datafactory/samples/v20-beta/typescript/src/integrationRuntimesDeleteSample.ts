// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an integration runtime.
 *
 * @summary deletes an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Delete.json
 */
async function integrationRuntimesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.integrationRuntimes.delete(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
  );
}

async function main(): Promise<void> {
  await integrationRuntimesDelete();
}

main().catch(console.error);
