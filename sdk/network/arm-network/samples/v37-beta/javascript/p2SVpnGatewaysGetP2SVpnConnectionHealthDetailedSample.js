// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 *
 * @summary gets the sas url to get the connection health detail of P2S clients of the virtual wan P2SVpnGateway in the specified resource group.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayGetConnectionHealthDetailed.json
 */
async function p2SVpnGatewayGetConnectionHealthDetailed() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.getP2SVpnConnectionHealthDetailed(
    "p2s-vpn-gateway-test",
    "p2svpngateway",
    {
      outputBlobSasUrl:
        "https://blobcortextesturl.blob.core.windows.net/folderforconfig/p2sconnectionhealths?sp=rw&se=2018-01-10T03%3A42%3A04Z&sv=2017-04-17&sig=WvXrT5bDmDFfgHs%2Brz%2BjAu123eRCNE9BO0eQYcPDT7pY%3D&sr=b",
      vpnUserNamesFilter: ["vpnUser1", "vpnUser2"],
    },
  );
  console.log(result);
}

async function main() {
  await p2SVpnGatewayGetConnectionHealthDetailed();
}

main().catch(console.error);
