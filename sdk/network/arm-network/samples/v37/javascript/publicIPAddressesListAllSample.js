// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the public IP addresses in a subscription.
 *
 * @summary gets all the public IP addresses in a subscription.
 * x-ms-original-file: 2025-05-01/PublicIpAddressListAll.json
 */
async function listAllPublicIPAddresses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.publicIPAddresses.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllPublicIPAddresses();
}

main().catch(console.error);
