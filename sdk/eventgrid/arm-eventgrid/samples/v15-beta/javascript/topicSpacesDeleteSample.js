// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing topic space.
 *
 * @summary delete an existing topic space.
 * x-ms-original-file: 2025-07-15-preview/TopicSpaces_Delete.json
 */
async function topicSpacesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.topicSpaces.delete("examplerg", "exampleNamespaceName1", "exampleTopicSpaceName1");
}

async function main() {
  await topicSpacesDelete();
}

main().catch(console.error);
