// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceGraphClient } = require("@azure/arm-resourcegraph");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new graph query.
 *
 * @summary create a new graph query.
 * x-ms-original-file: 2024-04-01/GraphQueryAdd.json
 */
async function createGraphQuery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "024e2271-06fa-46b6-9079-f1ed3c7b070e";
  const client = new ResourceGraphClient(credential, subscriptionId);
  const result = await client.graphQuery.createOrUpdate("my-resource-group", "MyDockerVMs", {
    description: "Docker VMs in PROD",
    query: "where isnotnull(tags['Prod']) and properties.extensions[0].Name == 'docker'",
    tags: {},
  });
  console.log(result);
}

async function main() {
  await createGraphQuery();
}

main().catch(console.error);
