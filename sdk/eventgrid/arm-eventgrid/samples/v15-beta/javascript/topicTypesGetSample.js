// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get information about a topic type.
 *
 * @summary get information about a topic type.
 * x-ms-original-file: 2025-07-15-preview/TopicTypes_Get.json
 */
async function topicTypesGet() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const result = await client.topicTypes.get("Microsoft.Storage.StorageAccounts");
  console.log(result);
}

async function main() {
  await topicTypesGet();
}

main().catch(console.error);
