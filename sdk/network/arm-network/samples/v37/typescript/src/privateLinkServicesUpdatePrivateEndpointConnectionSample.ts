// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to approve or reject private end point connection for a private link service in a subscription.
 *
 * @summary approve or reject private end point connection for a private link service in a subscription.
 * x-ms-original-file: 2025-05-01/PrivateLinkServiceUpdatePrivateEndpointConnection.json
 */
async function approveOrRejectPrivateEndPointConnectionForAPrivateLinkService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.privateLinkServices.updatePrivateEndpointConnection(
    "rg1",
    "testPls",
    "testPlePeConnection",
    {
      privateLinkServiceConnectionState: {
        description: "approved it for some reason.",
        status: "Approved",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await approveOrRejectPrivateEndPointConnectionForAPrivateLinkService();
}

main().catch(console.error);
