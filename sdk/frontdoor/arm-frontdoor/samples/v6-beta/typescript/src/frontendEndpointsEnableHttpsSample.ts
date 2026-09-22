// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FrontDoorManagementClient } from "@azure/arm-frontdoor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables a frontendEndpoint for HTTPS traffic
 *
 * @summary enables a frontendEndpoint for HTTPS traffic
 * x-ms-original-file: 2025-11-01/FrontdoorEnableHttps.json
 */
async function frontendEndpointsEnableHttps(): Promise<void> {
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

async function main(): Promise<void> {
  await frontendEndpointsEnableHttps();
}

main().catch(console.error);
