// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List event types for a topic type.
 *
 * @summary List event types for a topic type.
 * x-ms-original-file: specification/eventgrid/resource-manager/Microsoft.EventGrid/preview/2025-04-01-preview/examples/TopicTypes_ListEventTypes.json
 */

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function topicTypesListEventTypes(): Promise<void> {
  const topicTypeName = "Microsoft.Storage.StorageAccounts";
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.topicTypes.listEventTypes(topicTypeName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await topicTypesListEventTypes();
}

main().catch(console.error);
