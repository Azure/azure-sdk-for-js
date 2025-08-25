// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
 *
 * @summary Creates a VirtualWAN resource if it doesn't exist else updates the existing VirtualWAN.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualWANPut.json
 */

import type { VirtualWansCreateOrUpdateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualWanCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const VirtualWANName = "wan1";
  const options: VirtualWansCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: { type: "Basic", disableVpnEncryption: false },
      tags: { key1: "value1" },
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{VirtualWANName}",
      subscriptionId,
      resourceGroupName,
      VirtualWANName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualWanCreate().catch(console.error);
