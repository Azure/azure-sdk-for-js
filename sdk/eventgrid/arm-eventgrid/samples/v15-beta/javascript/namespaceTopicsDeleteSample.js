// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete existing namespace topic.
 *
 * @summary delete existing namespace topic.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopics_Delete.json
 */
async function namespaceTopicsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.namespaceTopics.delete("examplerg", "examplenamespace2", "examplenamespacetopic2");
}

async function main() {
  await namespaceTopicsDelete();
}

main().catch(console.error);
