// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  P2SVpnProfileParameters} from "@azure/arm-network";
import {
  NetworkManagementClient,
} from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.
 *
 * @summary Generates VPN profile for P2S client of the P2SVpnGateway in the specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/P2SVpnGatewayGenerateVpnProfile.json
 */
async function generateP2SVpnGatewayVpnprofile(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "p2sVpnGateway1";
  const parameters: P2SVpnProfileParameters = {
    authenticationMethod: "EAPTLS",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.beginGenerateVpnProfileAndWait(
    resourceGroupName,
    gatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await generateP2SVpnGatewayVpnprofile();
}

main().catch(console.error);
