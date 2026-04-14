// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list event types for a topic type.
 *
 * @summary list event types for a topic type.
 * x-ms-original-file: 2025-07-15-preview/TopicTypes_ListEventTypes.json
 */
async function topicTypesListEventTypes() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.topicTypes.listEventTypes("Microsoft.Storage.StorageAccounts")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topicTypesListEventTypes();
}

main().catch(console.error);
