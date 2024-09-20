// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  P2SVpnGatewaysGenerateVpnProfileParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.
 *
 * @summary Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/P2SVpnGatewayGenerateVpnProfile.json
 */
async function generateP2SVpnGatewayVpnprofile() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const gatewayName = "p2sVpnGateway1";
  const options: P2SVpnGatewaysGenerateVpnProfileParameters = {
    body: { authenticationMethod: "EAPTLS" },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/generatevpnprofile",
      subscriptionId,
      resourceGroupName,
      gatewayName,
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

generateP2SVpnGatewayVpnprofile().catch(console.error);
