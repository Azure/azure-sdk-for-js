// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Workspace under an Organization.
 *
 * @summary get a Workspace under an Organization.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_Get.json
 */
async function workspacesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.get("contoso-rg", "contoso-org", "contoso-prod");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Workspace under an Organization.
 *
 * @summary get a Workspace under an Organization.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_Get_MaximumSet_Gen.json
 */
async function workspacesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.get("contoso-rg", "contoso-org", "contoso-prod");
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGet();
  await workspacesGetMaximumSetGen();
}

main().catch(console.error);
