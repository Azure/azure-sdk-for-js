// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an integration runtime.
 *
 * @summary creates or updates an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Create.json
 */
async function integrationRuntimesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.createOrUpdate(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    { properties: { type: "SelfHosted", description: "A selfhosted integration runtime" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesCreate();
}

main().catch(console.error);
