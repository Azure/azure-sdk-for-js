// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualNetworkGatewayConnectionsResetConnectionParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Resets the virtual network gateway connection specified.
 *
 * @summary Resets the virtual network gateway connection specified.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkGatewayConnectionReset.json
 */
async function resetVirtualNetworkGatewayConnection() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkGatewayConnectionName = "conn1";
  const options: VirtualNetworkGatewayConnectionsResetConnectionParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/connections/{virtualNetworkGatewayConnectionName}/resetconnection",
      subscriptionId,
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

resetVirtualNetworkGatewayConnection().catch(console.error);
