// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary Gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/P2SVpnGatewayGetConnectionHealthDetailed.json
 */

import type { P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function p2SVpnGatewayGetConnectionHealthDetailed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "p2s-vpn-gateway-test";
  const gatewayName = "p2svpngateway";
  const options: P2SVpnGatewaysGetP2SVpnConnectionHealthDetailedParameters = {
    body: {
      outputBlobSasUrl:
        "https://blobcortextesturl.blob.core.windows.net/folderforconfig/p2sconnectionhealths?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
      vpnUserNamesFilter: ["vpnUser1", "vpnUser2"],
    },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/p2svpnGateways/{gatewayName}/getP2sVpnConnectionHealthDetailed",
      subscriptionId,
      resourceGroupName,
      gatewayName,
    )
    .post(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

p2SVpnGatewayGetConnectionHealthDetailed().catch(console.error);
