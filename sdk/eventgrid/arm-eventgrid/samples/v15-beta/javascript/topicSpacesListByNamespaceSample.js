// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get all the topic spaces under a namespace.
 *
 * @summary get all the topic spaces under a namespace.
 * x-ms-original-file: 2025-07-15-preview/TopicSpaces_ListByNamespace.json
 */
async function topicSpacesListByNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topicSpaces.listByNamespace("examplerg", "namespace123")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topicSpacesListByNamespace();
}

main().catch(console.error);
