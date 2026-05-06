// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update tags associated with the provided trunked network.
 *
 * @summary update tags associated with the provided trunked network.
 * x-ms-original-file: 2026-05-01-preview/TrunkedNetworks_Patch.json
 */
async function patchTrunkedNetwork() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.trunkedNetworks.update("resourceGroupName", "trunkedNetworkName", {
    trunkedNetworkUpdateParameters: { tags: { key1: "myvalue1", key2: "myvalue2" } },
  });
  console.log(result);
}

async function main() {
  await patchTrunkedNetwork();
}

main().catch(console.error);
