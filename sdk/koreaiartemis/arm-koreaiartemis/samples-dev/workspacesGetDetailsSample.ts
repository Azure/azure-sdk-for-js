// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the complete Workspace details reported by Kore, including its projects.
 *
 * @summary returns the complete Workspace details reported by Kore, including its projects.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_GetDetails.json
 */
async function workspacesGetDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.getDetails("contoso-rg", "contoso-org", "contoso-prod");
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesGetDetails();
}

main().catch(console.error);
