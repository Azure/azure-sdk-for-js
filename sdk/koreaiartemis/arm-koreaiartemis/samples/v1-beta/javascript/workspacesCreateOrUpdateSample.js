// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a Workspace under an Organization (long-running).
 *
 * @summary create or update a Workspace under an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Workspaces_CreateOrUpdate.json
 */
async function workspacesCreateOrUpdate() {
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

async function main() {
  await workspacesCreateOrUpdate();
}

main().catch(console.error);
