// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the specified access bridge.
 *
 * @summary delete the specified access bridge.
 * x-ms-original-file: 2026-05-01-preview/AccessBridges_Delete.json
 */
async function deleteAccessBridge() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.accessBridges.delete("resourceGroupName", "Bastion");
  console.log(result);
}

async function main() {
  await deleteAccessBridge();
}

main().catch(console.error);
