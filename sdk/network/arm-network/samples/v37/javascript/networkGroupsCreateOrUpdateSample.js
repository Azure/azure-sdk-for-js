// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a network group.
 *
 * @summary creates or updates a network group.
 * x-ms-original-file: 2025-05-01/NetworkManagerGroupPut.json
 */
async function networkGroupsPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkGroups.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "testNetworkGroup",
    { description: "A sample group", memberType: "VirtualNetwork" },
  );
  console.log(result);
}

async function main() {
  await networkGroupsPut();
}

main().catch(console.error);
