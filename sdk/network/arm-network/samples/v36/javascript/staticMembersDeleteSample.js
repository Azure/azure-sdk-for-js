// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a static member.
 *
 * @summary Deletes a static member.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerStaticMemberDelete.json
 */
async function staticMembersDelete() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "SampleRG";
  const networkManagerName = "TestNM";
  const networkGroupName = "testNetworkGroup";
  const staticMemberName = "testStaticMember";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.staticMembers.delete(
    resourceGroupName,
    networkManagerName,
    networkGroupName,
    staticMemberName,
  );
  console.log(result);
}

async function main() {
  await staticMembersDelete();
}

main().catch(console.error);
