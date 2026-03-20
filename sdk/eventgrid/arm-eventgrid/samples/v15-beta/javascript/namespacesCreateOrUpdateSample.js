// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously creates or updates a new namespace with the specified parameters.
 *
 * @summary asynchronously creates or updates a new namespace with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/Namespaces_CreateOrUpdate.json
 */
async function namespacesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdate("examplerg", "exampleNamespaceName1", {
    location: "westus",
    topicSpacesConfiguration: {
      routeTopicResourceId:
        "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/topics/exampleTopic1",
      state: "Enabled",
    },
    tags: { tag1: "value11", tag2: "value22" },
  });
  console.log(result);
}

async function main() {
  await namespacesCreateOrUpdate();
}

main().catch(console.error);
