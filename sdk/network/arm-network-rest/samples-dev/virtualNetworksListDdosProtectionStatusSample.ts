// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 *
 * @summary Gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGetDdosProtectionStatus.json
 */

import type { VirtualNetworksListDdosProtectionStatusParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, {
  // getLongRunningPoller,
  paginate,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDdosProtectionStatusOfAVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksListDdosProtectionStatusParameters = {
    queryParameters: { top: 75, "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}/ddosProtectionStatus",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .post(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

getDdosProtectionStatusOfAVirtualNetwork().catch(console.error);
