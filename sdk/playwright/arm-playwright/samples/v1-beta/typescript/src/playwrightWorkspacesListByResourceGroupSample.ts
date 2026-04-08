// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list PlaywrightWorkspace resources by resource group
 *
 * @summary list PlaywrightWorkspace resources by resource group
 * x-ms-original-file: 2026-02-01-preview/PlaywrightWorkspaces_ListByResourceGroup.json
 */
async function playwrightWorkspacesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.playwrightWorkspaces.listByResourceGroup("dummyrg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await playwrightWorkspacesListByResourceGroup();
}

main().catch(console.error);
