// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 *
 * @summary Patch properties of the provided rack, or update the tags associated with the rack. Properties and tag updates can be done independently.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/Racks_Patch.json
 */

import {
  RackPatchParameters,
  RacksUpdateOptionalParams,
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function patchRack(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const rackName = "rackName";
  const rackUpdateParameters: RackPatchParameters = {
    rackLocation: "Rack 2B",
    rackSerialNumber: "RACK_SERIAL_NUMBER",
    tags: { key1: "myvalue1", key2: "myvalue2" },
  };
  const options: RacksUpdateOptionalParams = { rackUpdateParameters };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.racks.beginUpdateAndWait(
    resourceGroupName,
    rackName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchRack();
}

main().catch(console.error);
