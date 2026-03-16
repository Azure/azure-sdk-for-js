// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to enables a frontendEndpoint for HTTPS traffic
 *
 * @summary enables a frontendEndpoint for HTTPS traffic
 * x-ms-original-file: 2025-10-01/FrontdoorEnableHttps.json
 */
async function frontendEndpointsEnableHttps() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  await client.frontendEndpoints.enableHttps("rg1", "frontDoor1", "frontendEndpoint1", {
    certificateSource: "AzureKeyVault",
    secretName: "secret1",
    secretVersion: "00000000-0000-0000-0000-000000000000",
    vault: {
      id: "/subscriptions/subid/resourceGroups/rg1/providers/Microsoft.KeyVault/vaults/vault1",
    },
    minimumTlsVersion: "1.0",
    protocolType: "ServerNameIndication",
  });
}

async function main() {
  await frontendEndpointsEnableHttps();
}

main().catch(console.error);
