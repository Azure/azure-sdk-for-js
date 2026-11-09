// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a Azure Monitor PrivateLinkScope.
 *
 * @summary deletes a Azure Monitor PrivateLinkScope.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopesDelete.json
 */
async function privateLinkScopesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new MonitorClient(credential, subscriptionId);
  await client.privateLinkScopes.delete("my-resource-group", "my-privatelinkscope");
}

async function main(): Promise<void> {
  await privateLinkScopesDelete();
}

main().catch(console.error);
