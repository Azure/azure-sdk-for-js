// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageMoverClient } = require("@azure/arm-storagemover");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Connection resource.
 * Returns 409 if there are active jobs using this connection.
 *
 * @summary deletes a Connection resource.
 * Returns 409 if there are active jobs using this connection.
 * x-ms-original-file: 2025-12-01/Connections_Delete.json
 */
async function connectionsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "60bcfc77-6589-4da2-b7fd-f9ec9322cf95";
  const client = new StorageMoverClient(credential, subscriptionId);
  await client.connections.delete("examples-rg", "examples-storageMoverName", "example-connection");
}

async function main() {
  await connectionsDelete();
}

main().catch(console.error);
