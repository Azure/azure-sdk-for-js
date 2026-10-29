// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkClient } from "@azure/arm-serviceconnectioncontroller";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure Service Connection Controllers within a resource group.
 *
 * @summary lists all Azure Service Connection Controllers within a resource group.
 * x-ms-original-file: 2026-02-09-preview/AzureServiceConnectionControllers_ListByResourceGroup.json
 */
async function azureServiceConnectionControllersListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureServiceConnectionControllers.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await azureServiceConnectionControllersListByResourceGroup();
}

main().catch(console.error);
