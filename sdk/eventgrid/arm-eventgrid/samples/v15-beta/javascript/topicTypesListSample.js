// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all registered topic types.
 *
 * @summary list all registered topic types.
 * x-ms-original-file: 2025-07-15-preview/TopicTypes_List.json
 */
async function topicTypesList() {
  const credential = new DefaultAzureCredential();
  const client = new EventGridManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.topicTypes.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topicTypesList();
}

main().catch(console.error);
