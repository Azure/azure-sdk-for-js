// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the regional application gateway waf manifest.
 *
 * @summary gets the regional application gateway waf manifest.
 * x-ms-original-file: 2025-05-01/GetApplicationGatewayWafDynamicManifestsDefault.json
 */
async function getsWAFDefaultManifest(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGatewayWafDynamicManifestsDefault.get("westus");
  console.log(result);
}

async function main(): Promise<void> {
  await getsWAFDefaultManifest();
}

main().catch(console.error);
