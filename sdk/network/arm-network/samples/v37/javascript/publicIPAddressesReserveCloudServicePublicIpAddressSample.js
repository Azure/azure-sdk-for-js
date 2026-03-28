// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic.
 *
 * @summary reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic.
 * x-ms-original-file: 2025-05-01/PublicIpAddressReserve.json
 */
async function reservePublicIPAddress() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.reserveCloudServicePublicIpAddress(
    "rg1",
    "test-ip",
    { isRollback: "false" },
  );
  console.log(result);
}

async function main() {
  await reservePublicIPAddress();
}

main().catch(console.error);
