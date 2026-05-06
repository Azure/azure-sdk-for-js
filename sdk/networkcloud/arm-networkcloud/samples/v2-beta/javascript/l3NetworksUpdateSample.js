// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update tags associated with the provided layer 3 (L3) network.
 *
 * @summary update tags associated with the provided layer 3 (L3) network.
 * x-ms-original-file: 2026-05-01-preview/L3Networks_Patch.json
 */
async function patchL3Network() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.l3Networks.update("resourceGroupName", "l3NetworkName", {
    l3NetworkUpdateParameters: { tags: { key1: "myvalue1", key2: "myvalue2" } },
  });
  console.log(result);
}

async function main() {
  await patchL3Network();
}

main().catch(console.error);
