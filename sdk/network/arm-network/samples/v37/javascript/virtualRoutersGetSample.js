// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified Virtual Router.
 *
 * @summary gets the specified Virtual Router.
 * x-ms-original-file: 2025-05-01/VirtualRouterGet.json
 */
async function getVirtualRouter() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouters.get("rg1", "virtualRouter");
  console.log(result);
}

async function main() {
  await getVirtualRouter();
}

main().catch(console.error);
