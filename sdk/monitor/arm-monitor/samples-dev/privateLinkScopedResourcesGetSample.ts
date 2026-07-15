// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a scoped resource in a private link scope.
 *
 * @summary gets a scoped resource in a private link scope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopedResourceGet.json
 */
async function getsPrivateLinkScopedResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkScopedResources.get(
    "MyResourceGroup",
    "MyPrivateLinkScope",
    "scoped-resource-name",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsPrivateLinkScopedResource();
}

main().catch(console.error);
