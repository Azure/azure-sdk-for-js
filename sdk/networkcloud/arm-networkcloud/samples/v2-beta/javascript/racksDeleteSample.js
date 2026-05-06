// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided rack. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @summary delete the provided rack. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 * x-ms-original-file: 2026-05-01-preview/Racks_Delete.json
 */
async function deleteRack() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.racks.delete("resourceGroupName", "rackName");
  console.log(result);
}

async function main() {
  await deleteRack();
}

main().catch(console.error);
