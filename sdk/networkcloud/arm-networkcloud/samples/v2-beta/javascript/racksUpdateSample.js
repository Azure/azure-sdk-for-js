// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 *
 * @summary patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Racks_Patch.json
 */
async function patchRack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.racks.update("resourceGroupName", "rackName", {
    rackUpdateParameters: {
      rackLocation: "Rack 2B",
      rackSerialNumber: "RACK_SERIAL_NUMBER",
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

async function main() {
  await patchRack();
}

main().catch(console.error);
