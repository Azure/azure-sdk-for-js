// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 *
 * @summary gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopePrivateLinkResourceListGet.json
 */
async function getsPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByPrivateLinkScope(
    "MyResourceGroup",
    "MyPrivateLinkScope",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateEndpointConnection();
}

main().catch(console.error);
