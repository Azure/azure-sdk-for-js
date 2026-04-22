// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the two keys used to publish to a namespace topic.
 *
 * @summary list the two keys used to publish to a namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopics_ListSharedAccessKeys.json
 */
async function namespaceTopicsListSharedAccessKeys() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopics.listSharedAccessKeys(
    "examplerg",
    "examplenamespace2",
    "examplenamespacetopic2",
  );
  console.log(result);
}

async function main() {
  await namespaceTopicsListSharedAccessKeys();
}

main().catch(console.error);
