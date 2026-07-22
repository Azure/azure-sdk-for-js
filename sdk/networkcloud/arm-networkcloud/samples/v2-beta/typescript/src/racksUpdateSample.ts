// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 *
 * @summary patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 * x-ms-original-file: 2026-05-01-preview/Racks_Patch.json
 */
async function patchRack(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.racks.update("resourceGroupName", "rackName", {
    rackUpdateParameters: {
      rackLocation: "Rack 2B",
      rackSerialNumber: "RACK_SERIAL_NUMBER",
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchRack();
}

main().catch(console.error);
