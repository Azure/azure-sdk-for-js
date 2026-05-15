// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specific private end point connection by specific private link service in the resource group.
 *
 * @summary get the specific private end point connection by specific private link service in the resource group.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceGetPrivateEndpointConnection.json
 */
async function getPrivateEndPointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.getPrivateEndpointConnection(
    "rg1",
    "testPls",
    "testPlePeConnection",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateEndPointConnection();
}

main().catch(console.error);
