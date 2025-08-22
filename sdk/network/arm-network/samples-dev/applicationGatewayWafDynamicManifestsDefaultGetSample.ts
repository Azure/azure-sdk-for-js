// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the regional application gateway waf manifest.
 *
 * @summary Gets the regional application gateway waf manifest.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/GetApplicationGatewayWafDynamicManifestsDefault.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getsWafDefaultManifest(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.applicationGatewayWafDynamicManifestsDefault.get(location);
  console.log(result);
}

async function main(): Promise<void> {
  await getsWafDefaultManifest();
}

main().catch(console.error);
