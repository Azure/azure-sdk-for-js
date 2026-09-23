// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a single graph query by its resourceName.
 *
 * @summary get a single graph query by its resourceName.
 * x-ms-original-file: 2024-04-01/GraphQueryGet.json
 */
async function getGraphQuery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "024e2271-06fa-46b6-9079-f1ed3c7b070e";
  const client = new ResourceGraphClient(credential, subscriptionId);
  const result = await client.graphQuery.get("my-resource-group", "MyDockerVMs");
  console.log(result);
}

async function main() {
  await getGraphQuery();
}

main().catch(console.error);
