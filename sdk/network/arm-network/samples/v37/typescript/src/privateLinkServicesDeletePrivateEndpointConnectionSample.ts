// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete private end point connection for a private link service in a subscription.
 *
 * @summary delete private end point connection for a private link service in a subscription.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceDeletePrivateEndpointConnection.json
 */
async function deletePrivateEndPointConnectionForAPrivateLinkService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.privateLinkServices.deletePrivateEndpointConnection(
    "rg1",
    "testPls",
    "testPlePeConnection",
  );
}

async function main(): Promise<void> {
  await deletePrivateEndPointConnectionForAPrivateLinkService();
}

main().catch(console.error);
