// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get information about a topic type.
 *
 * @summary get information about a topic type.
 * x-ms-original-file: 2025-07-15-preview/TopicTypes_Get.json
 */
async function topicTypesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.topicTypes.get("Microsoft.Storage.StorageAccounts");
  console.log(result);
}

async function main(): Promise<void> {
  await topicTypesGet();
}

main().catch(console.error);
