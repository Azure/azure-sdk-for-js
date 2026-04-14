// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementClient } from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a factory.
 *
 * @summary gets a factory.
 * x-ms-original-file: 2018-06-01/Factories_Get.json
 */
async function factoriesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.factories.get("exampleResourceGroup", "exampleFactoryName");
  console.log(result);
}

async function main(): Promise<void> {
  await factoriesGet();
}

main().catch(console.error);
