// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Workspace resources by subscription ID
 *
 * @summary list Workspace resources by subscription ID
 * x-ms-original-file: 2026-06-01/Workspaces_ListBySubscription_MaximumSet_Gen.json
 */
async function workspacesListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "A54D43BD-2F5F-4BB1-95D4-9A8D23CC7DD4";
  const client = new DiscoveryClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListBySubscriptionMaximumSet();
}

main().catch(console.error);
