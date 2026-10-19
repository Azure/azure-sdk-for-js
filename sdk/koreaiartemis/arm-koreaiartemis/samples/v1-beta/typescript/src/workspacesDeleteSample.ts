// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Workspace under an Organization (long-running).
 *
 * @summary delete a Workspace under an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Workspaces_Delete.json
 */
async function workspacesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  await client.workspaces.delete("contoso-rg", "contoso-org", "contoso-prod");
}

async function main(): Promise<void> {
  await workspacesDelete();
}

main().catch(console.error);
