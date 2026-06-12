// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceGraphClient } from "@azure/arm-resourcegraph";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a graph query that has already been added.
 *
 * @summary updates a graph query that has already been added.
 * x-ms-original-file: 2024-04-01/GraphQueryUpdate.json
 */
async function updateGraphQuery(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "024e2271-06fa-46b6-9079-f1ed3c7b070e";
  const client = new ResourceGraphClient(credential, subscriptionId);
  const result = await client.graphQuery.update("my-resource-group", "MyDockerVMs", {
    etag: "b0809832-ca62-4133-8f13-0c46580f9db1",
    description: "Modified description",
    query: "where isnotnull(tags['Prod']) and properties.extensions[0].Name == 'docker'",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateGraphQuery();
}

main().catch(console.error);
