// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a static member.
 *
 * @summary creates or updates a static member.
 * x-ms-original-file: 2025-05-01/NetworkManagerStaticMemberPut.json
 */
async function staticMemberPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.staticMembers.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "testNetworkGroup",
    "testStaticMember",
    {
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/virtualnetworks/vnet1",
    },
  );
  console.log(result);
}

async function main() {
  await staticMemberPut();
}

main().catch(console.error);
