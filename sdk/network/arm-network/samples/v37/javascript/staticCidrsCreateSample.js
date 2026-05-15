// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates/Updates the Static CIDR resource.
 *
 * @summary creates/Updates the Static CIDR resource.
 * x-ms-original-file: 2025-05-01/StaticCidrs_Create.json
 */
async function staticCidrsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.staticCidrs.create(
    "rg1",
    "TestNetworkManager",
    "TestPool",
    "TestStaticCidr",
  );
  console.log(result);
}

async function main() {
  await staticCidrsCreate();
}

main().catch(console.error);
