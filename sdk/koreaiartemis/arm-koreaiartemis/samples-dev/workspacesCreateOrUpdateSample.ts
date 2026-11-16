// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a Workspace under an Organization (long-running).
 *
 * @summary create or update a Workspace under an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Workspaces_CreateOrUpdate.json
 */
async function workspacesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate(
    "contoso-rg",
    "contoso-org",
    "contoso-prod",
    {
      properties: {
        product: "aiforwork",
        partnerProperties: { name: "Contoso Production", ownerEmail: "owner@contoso.com" },
        marketplaceDetails: [
          {
            offerDetails: {
              offerId: "kore-ai-platform",
              planId: "business-monthly",
              publisherId: "kore-ai",
              planName: "Business Monthly",
              termId: "1m",
              termUnit: "P1M",
            },
            subscriptionId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-rg/providers/Microsoft.SaaS/resources/kore-ai-saas",
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacesCreateOrUpdate();
}

main().catch(console.error);
