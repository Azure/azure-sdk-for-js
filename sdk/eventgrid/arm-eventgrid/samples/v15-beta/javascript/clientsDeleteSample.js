// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing client.
 *
 * @summary delete an existing client.
 * x-ms-original-file: 2025-07-15-preview/Clients_Delete.json
 */
async function clientsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.clients.delete("examplerg", "exampleNamespaceName1", "exampleClientName1");
}

async function main() {
  await clientsDelete();
}

main().catch(console.error);
