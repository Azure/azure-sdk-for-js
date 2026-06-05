// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DiscoveryClient } from "@azure/arm-discovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Workspace resources by subscription ID
 *
 * @summary list Workspace resources by subscription ID
 * x-ms-original-file: 2026-02-01-preview/Workspaces_ListBySubscription_MaximumSet_Gen.json
 */
async function workspacesListBySubscriptionMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "C058B75F-64D2-4E9D-8B66-65339DCB22C7";
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
