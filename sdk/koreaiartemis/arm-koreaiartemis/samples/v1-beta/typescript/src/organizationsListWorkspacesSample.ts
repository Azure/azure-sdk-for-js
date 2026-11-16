// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Workspaces in the Kore Organization, including Workspaces not managed through Liftr.
 *
 * This discovery operation uses POST because its response combines ARM-tracked
 * Workspaces with Kore-only Workspaces that have no ARM resource ID and cannot
 * be represented by the standard Workspaces collection GET.
 *
 * @summary lists all Workspaces in the Kore Organization, including Workspaces not managed through Liftr.
 *
 * This discovery operation uses POST because its response combines ARM-tracked
 * Workspaces with Kore-only Workspaces that have no ARM resource ID and cannot
 * be represented by the standard Workspaces collection GET.
 * x-ms-original-file: 2026-07-01-preview/Organizations_ListWorkspaces.json
 */
async function organizationsListWorkspaces(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.listWorkspaces("contoso-rg", "contoso-org");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsListWorkspaces();
}

main().catch(console.error);
