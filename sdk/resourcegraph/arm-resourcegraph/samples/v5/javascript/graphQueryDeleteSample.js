// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a graph query.
 *
 * @summary delete a graph query.
 * x-ms-original-file: 2024-04-01/GraphQueryDelete.json
 */
async function deleteGraphQuery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "024e2271-06fa-46b6-9079-f1ed3c7b070e";
  const client = new ResourceGraphClient(credential, subscriptionId);
  await client.graphQuery.delete("my-resource-group", "MyDockerVM");
}

async function main() {
  await deleteGraphQuery();
}

main().catch(console.error);
