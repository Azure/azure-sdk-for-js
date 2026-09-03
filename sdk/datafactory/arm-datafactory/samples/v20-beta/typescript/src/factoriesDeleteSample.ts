// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a factory.
 *
 * @summary deletes a factory.
 * x-ms-original-file: 2018-06-01/Factories_Delete.json
 */
async function factoriesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  await client.factories.delete("exampleResourceGroup", "exampleFactoryName");
}

async function main(): Promise<void> {
  await factoriesDelete();
}

main().catch(console.error);
