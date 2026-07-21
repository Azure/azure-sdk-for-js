// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided layer 2 (L2) network.
 *
 * @summary delete the provided layer 2 (L2) network.
 * x-ms-original-file: 2026-05-01-preview/L2Networks_Delete.json
 */
async function deleteL2Network() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.l2Networks.delete("resourceGroupName", "l2NetworkName");
  console.log(result);
}

async function main() {
  await deleteL2Network();
}

main().catch(console.error);
