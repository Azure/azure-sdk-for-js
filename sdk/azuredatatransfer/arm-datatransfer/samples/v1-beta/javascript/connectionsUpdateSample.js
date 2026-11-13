// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDataTransferClient } = require("@azure/arm-datatransfer");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the connection resource.
 *
 * @summary updates the connection resource.
 * x-ms-original-file: 2026-02-06-preview/patchConnection.json
 */
async function updatesTheConnectionResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  await client.connections.update("testRG", "testConnection", {});
}

async function main() {
  await updatesTheConnectionResource();
}

main().catch(console.error);
