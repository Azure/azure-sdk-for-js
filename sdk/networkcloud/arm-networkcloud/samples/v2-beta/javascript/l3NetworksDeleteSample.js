// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided layer 3 (L3) network.
 *
 * @summary delete the provided layer 3 (L3) network.
 * x-ms-original-file: 2026-05-01-preview/L3Networks_Delete.json
 */
async function deleteL3Network() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.l3Networks.delete("resourceGroupName", "l3NetworkName");
  console.log(result);
}

async function main() {
  await deleteL3Network();
}

main().catch(console.error);
