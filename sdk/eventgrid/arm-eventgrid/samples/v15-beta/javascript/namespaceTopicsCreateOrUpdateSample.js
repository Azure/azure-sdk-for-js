// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to asynchronously creates a new namespace topic with the specified parameters.
 *
 * @summary asynchronously creates a new namespace topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopics_CreateOrUpdate.json
 */
async function namespaceTopicsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.namespaceTopics.createOrUpdate(
    "examplerg",
    "examplenamespace2",
    "examplenamespacetopic2",
    { eventRetentionInDays: 1, inputSchema: "CloudEventSchemaV1_0", publisherType: "Custom" },
  );
  console.log(result);
}

async function main() {
  await namespaceTopicsCreateOrUpdate();
}

main().catch(console.error);
