// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VpnDeviceScriptParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets a xml format representation for vpn device configuration script.
 *
 * @summary Gets a xml format representation for vpn device configuration script.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkGatewayVpnDeviceConfigurationScript.json
 */
async function getVpnDeviceConfigurationScript(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkGatewayConnectionName = "vpngw";
  const parameters: VpnDeviceScriptParameters = {
    deviceFamily: "ISR",
    firmwareVersion: "IOS 15.1 (Preview)",
    vendor: "Cisco",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.virtualNetworkGateways.vpnDeviceConfigurationScript(
      resourceGroupName,
      virtualNetworkGatewayConnectionName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getVpnDeviceConfigurationScript();
}

main().catch(console.error);
