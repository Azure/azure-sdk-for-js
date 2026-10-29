// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists workspaces in a project.
 *
 * @summary lists workspaces in a project.
 * x-ms-original-file: 2026-09-01/Workspaces_ListByResourceGroup.json
 */
async function workspacesListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup(
    "rganyscale",
    "testcloud",
    "testproject",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListByResourceGroup();
}

main().catch(console.error);
