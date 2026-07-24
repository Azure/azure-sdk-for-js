// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the regional application gateway waf manifest.
 *
 * @summary gets the regional application gateway waf manifest.
 * x-ms-original-file: 2025-07-01/GetApplicationGatewayWafDynamicManifests.json
 */
async function getsWAFManifests(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGatewayWafDynamicManifests.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsWAFManifests();
}

main().catch(console.error);
