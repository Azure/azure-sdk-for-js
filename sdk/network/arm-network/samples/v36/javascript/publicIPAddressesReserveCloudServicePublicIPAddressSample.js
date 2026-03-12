// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic.
 *
 * @summary Reserves the specified Cloud Service Public IP by switching its allocation method to Static. If rollback is requested, reverts the allocation method to Dynamic.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpAddressReserve.json
 */
async function reservePublicIPAddress() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpAddressName = "test-ip";
  const parameters = {
    isRollback: "false",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.beginReserveCloudServicePublicIpAddressAndWait(
    resourceGroupName,
    publicIpAddressName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await reservePublicIPAddress();
}

main().catch(console.error);
