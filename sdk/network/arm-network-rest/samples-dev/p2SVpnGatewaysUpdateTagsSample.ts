// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates virtual wan p2s vpn gateway tags.
 *
 * @summary Updates virtual wan p2s vpn gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/P2SVpnGatewayUpdateTags.json
 */

import type { P2SVpnGatewaysUpdateTagsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function p2SVpnGatewayUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "p2sVpnGateway1";
  const options: P2SVpnGatewaysUpdateTagsParameters = {
    body: { tags: { tag1: "value1", tag2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}",
      subscriptionId,
      resourceGroupName,
      gatewayName,
    )
    .patch(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

p2SVpnGatewayUpdate().catch(console.error);
