// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a workspace.
 *
 * @summary deletes a workspace.
 * x-ms-original-file: 2026-09-01/Workspaces_Delete.json
 */
async function workspacesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.workspaces.delete("rganyscale", "testcloud", "testproject", "testworkspace");
}

async function main(): Promise<void> {
  await workspacesDelete();
}

main().catch(console.error);
