// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all Azure Monitor PrivateLinkScopes within a subscription.
 *
 * @summary gets a list of all Azure Monitor PrivateLinkScopes within a subscription.
 * x-ms-original-file: 2023-06-01-preview/PrivateLinkScopesList.json
 */
async function privateLinkScopesListJson(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "86dc51d3-92ed-4d7e-947a-775ea79b4919";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkScopes.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await privateLinkScopesListJson();
}

main().catch(console.error);
