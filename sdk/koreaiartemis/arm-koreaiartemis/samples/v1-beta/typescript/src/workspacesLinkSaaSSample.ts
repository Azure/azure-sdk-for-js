// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to links SaaS resources to the workspace. Accepts the full list of SaaS assets to be linked.
 *
 * @summary links SaaS resources to the workspace. Accepts the full list of SaaS assets to be linked.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_LinkSaaS.json
 */
async function workspacesLinkSaaS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  await client.workspaces.linkSaaS("contoso-rg", "contoso-org", "contoso-prod", {
    saaSResourceIds: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-rg/providers/Microsoft.SaaS/resources/kore-ai-saas-1",
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-rg/providers/Microsoft.SaaS/resources/kore-ai-saas-2",
    ],
  });
}

async function main(): Promise<void> {
  await workspacesLinkSaaS();
}

main().catch(console.error);
