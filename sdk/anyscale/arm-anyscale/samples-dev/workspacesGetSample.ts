// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workspace.
 *
 * @summary gets a workspace.
 * x-ms-original-file: 2026-09-01/Workspaces_Get.json
 */
async function workspacesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.workspaces.get(
    "rganyscale",
    "testcloud",
    "testproject",
    "testworkspace",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGet();
}

main().catch(console.error);
