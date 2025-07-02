// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubsClient } from "@azure/arm-notificationhubs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the available namespaces within a resource group.
 *
 * @summary lists the available namespaces within a resource group.
 * x-ms-original-file: 2023-10-01-preview/Namespaces/ListByResourceGroup.json
 */
async function namespacesList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "29cfa613-cbbc-4512-b1d6-1b3a92c7fa40";
  const client = new NotificationHubsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.list("5ktrial")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await namespacesList();
}

main().catch(console.error);
