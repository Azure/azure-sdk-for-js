// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a xml format representation for vpn device configuration script.
 *
 * @summary gets a xml format representation for vpn device configuration script.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGatewayVpnDeviceConfigurationScript.json
 */
async function getVPNDeviceConfigurationScript(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkGateways.vpnDeviceConfigurationScript("rg1", "vpngw", {
    deviceFamily: "ISR",
    firmwareVersion: "IOS 15.1 (Preview)",
    vendor: "Cisco",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getVPNDeviceConfigurationScript();
}

main().catch(console.error);
