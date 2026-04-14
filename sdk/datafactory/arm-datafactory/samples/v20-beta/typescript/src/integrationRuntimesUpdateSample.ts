// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an integration runtime.
 *
 * @summary updates an integration runtime.
 * x-ms-original-file: 2018-06-01/IntegrationRuntimes_Update.json
 */
async function integrationRuntimesUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.integrationRuntimes.update(
    "exampleResourceGroup",
    "exampleFactoryName",
    "exampleIntegrationRuntime",
    { autoUpdate: "Off", updateDelayOffset: '"PT3H"' },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await integrationRuntimesUpdate();
}

main().catch(console.error);
