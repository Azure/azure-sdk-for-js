// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of an extension topic.
 *
 * @summary get the properties of an extension topic.
 * x-ms-original-file: 2025-07-15-preview/ExtensionTopics_Get.json
 */
async function extensionTopicsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.extensionTopics.get(
    "subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/microsoft.storage/storageaccounts/exampleResourceName/providers/Microsoft.eventgrid/extensionTopics/default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await extensionTopicsGet();
}

main().catch(console.error);
