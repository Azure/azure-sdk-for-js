// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 *
 * @summary remove all linked integration runtimes under specific data factory in a self-hosted integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_RemoveLinks.json
 */
async function integrationRuntimesUpgrade(): Promise<void> {
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

async function main(): Promise<void> {
  await integrationRuntimesUpgrade();
}

main().catch(console.error);
