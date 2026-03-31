// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all packet capture sessions within the specified resource group.
 *
 * @summary lists all packet capture sessions within the specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkWatcherPacketCapturesList.json
 */
async function listPacketCaptures() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.packetCaptures.list("rg1", "nw1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPacketCaptures();
}

main().catch(console.error);
