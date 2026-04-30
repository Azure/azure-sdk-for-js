// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates NSP link resource.
 *
 * @summary Creates or updates NSP link resource.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NspLinkPut.json
 */
async function nspLinksPut() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkSecurityPerimeterName = "nsp1";
  const linkName = "link1";
  const parameters = {
    autoApprovedRemotePerimeterResourceId:
      "/subscriptions/subId/resourceGroups/rg1/providers/Microsoft.Network/networkSecurityPerimeters/nsp2",
    localInboundProfiles: ["*"],
    remoteInboundProfiles: ["*"],
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterLinks.createOrUpdate(
    resourceGroupName,
    networkSecurityPerimeterName,
    linkName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await nspLinksPut();
}

main().catch(console.error);
