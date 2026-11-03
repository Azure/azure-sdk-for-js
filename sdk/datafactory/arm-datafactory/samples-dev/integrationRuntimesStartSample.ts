// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a ManagedReserved type integration runtime.
 *
 * @summary starts a ManagedReserved type integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Start.json
 */
async function integrationRuntimesStart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.start(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleManagedIntegrationRuntime",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesStart();
}

main().catch(console.error);
