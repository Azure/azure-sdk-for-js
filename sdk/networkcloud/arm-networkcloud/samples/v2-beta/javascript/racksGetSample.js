// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of the provided rack.
 *
 * @summary get properties of the provided rack.
 * x-ms-original-file: 2026-05-01-preview/Racks_Get.json
 */
async function getRack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.racks.get("resourceGroupName", "rackName");
  console.log(result);
}

async function main() {
  await getRack();
}

main().catch(console.error);
