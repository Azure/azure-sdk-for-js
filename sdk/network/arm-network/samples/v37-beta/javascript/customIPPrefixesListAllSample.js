// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the custom IP prefixes in a subscription.
 *
 * @summary gets all the custom IP prefixes in a subscription.
 * x-ms-original-file: 2025-05-01/CustomIpPrefixListAll.json
 */
async function listAllCustomIPPrefixes() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.customIPPrefixes.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllCustomIPPrefixes();
}

main().catch(console.error);
