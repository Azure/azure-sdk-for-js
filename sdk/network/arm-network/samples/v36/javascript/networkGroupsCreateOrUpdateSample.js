// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a network group.
 *
 * @summary Creates or updates a network group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerGroupPut.json
 */
async function networkGroupsPut() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const networkGroupName = "testNetworkGroup";
  const parameters = {
    description: "A sample group",
    memberType: "VirtualNetwork",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkGroups.createOrUpdate(
    resourceGroupName,
    networkManagerName,
    networkGroupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await networkGroupsPut();
}

main().catch(console.error);
