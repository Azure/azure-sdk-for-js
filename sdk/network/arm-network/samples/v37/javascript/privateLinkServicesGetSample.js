// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified private link service by resource group.
 *
 * @summary gets the specified private link service by resource group.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceGet.json
 */
async function getPrivateLinkService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.get("rg1", "testPls");
  console.log(result);
}

async function main() {
  await getPrivateLinkService();
}

main().catch(console.error);
