// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a Network Connections resource.
 *
 * @summary creates or updates a Network Connections resource.
 * x-ms-original-file: 2026-01-01-preview/NetworkConnections_Put.json
 */
async function networkConnectionsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.networkConnections.createOrUpdate("rg1", "uswest3network", {
    location: "centralus",
    properties: {
      domainJoinType: "HybridAzureADJoin",
      domainName: "mydomaincontroller.local",
      domainPassword: "Password value for user",
      domainUsername: "testuser@mydomaincontroller.local",
      networkingResourceGroupName: "NetworkInterfaces",
      subnetId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/ExampleRG/providers/Microsoft.Network/virtualNetworks/ExampleVNet/subnets/default",
    },
  });
  console.log(result);
}

async function main() {
  await networkConnectionsCreateOrUpdate();
}

main().catch(console.error);
