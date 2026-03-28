// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.
 *
 * @summary the Set VpnclientIpsecParameters operation sets the vpnclient ipsec policy for P2S client of virtual network gateway in the specified resource group through Network resource provider.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewaySetVpnClientIpsecParameters.json
 */
async function setVirtualNetworkGatewayVpnClientIpsecParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.setVpnclientIpsecParameters("rg1", "vpngw", {
    dhGroup: "DHGroup2",
    ikeEncryption: "AES256",
    ikeIntegrity: "SHA384",
    ipsecEncryption: "AES256",
    ipsecIntegrity: "SHA256",
    pfsGroup: "PFS2",
    saDataSizeKilobytes: 429497,
    saLifeTimeSeconds: 86473,
  });
  console.log(result);
}

async function main() {
  await setVirtualNetworkGatewayVpnClientIpsecParameters();
}

main().catch(console.error);
