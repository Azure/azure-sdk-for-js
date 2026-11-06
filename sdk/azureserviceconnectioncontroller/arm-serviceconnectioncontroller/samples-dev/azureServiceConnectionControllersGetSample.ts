// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-serviceconnectioncontroller";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Azure Service Connection Controller.
 *
 * @summary gets an Azure Service Connection Controller.
 * x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_Get.json
 */
async function azureServiceConnectionControllersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkClient(credential, subscriptionId);
  const result = await client.azureServiceConnectionControllers.get("rg1", "pg1");
  console.log(result);
}

async function main(): Promise<void> {
  await azureServiceConnectionControllersGet();
}

main().catch(console.error);
