// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Organization (long-running).
 *
 * @summary create or update an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Organizations_Create.json
 */
async function organizationsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.create("contoso-rg", "contoso-org", {
    location: "eastus2euap",
    tags: { environment: "production" },
    properties: {
      partnerProperties: {
        organizationName: "Contoso AI Platform",
        billingEmail: "billing@contoso.com",
        ownerEmail: "admin@contoso.com",
        defaultWorkspace: {
          name: "my first workspace",
          product: "aiforwork",
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
      user: {
        firstName: "Jane",
        lastName: "Doe",
        emailAddress: "jane.doe@contoso.com",
        upn: "jane.doe@contoso.onmicrosoft.com",
        phoneNumber: "+1-425-555-0100",
      },
      companyDetails: {
        companyName: "Contoso Ltd.",
        country: "US",
        domain: "contoso.com",
        businessType: "Technology",
        numberOfEmployees: 500,
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update an Organization (long-running).
 *
 * @summary create or update an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Organizations_Create_MaximumSet_Gen.json
 */
async function organizationsCreateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.create("contoso-rg", "contoso-org", {
    location: "eastus2euap",
    tags: { environment: "production" },
    properties: {
      partnerProperties: {
        organizationName: "Contoso AI Platform",
        billingEmail: "billing@contoso.com",
        ownerEmail: "admin@contoso.com",
        defaultWorkspace: {
          name: "my first workspace",
          product: "aiforwork",
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
      user: {
        firstName: "Jane",
        lastName: "Doe",
        emailAddress: "jane.doe@contoso.com",
        upn: "jane.doe@contoso.onmicrosoft.com",
        phoneNumber: "+1-425-555-0100",
        alternateEmail: "jane.alternate@contoso.com",
        address: "1 Microsoft Way, Redmond, WA 98052",
      },
      companyDetails: {
        companyName: "Contoso Ltd.",
        country: "US",
        domain: "contoso.com",
        businessType: "Technology",
        numberOfEmployees: 500,
        officeAddress: "1 Microsoft Way, Redmond, WA 98052",
      },
    },
  });
  console.log(result);
}

async function main() {
  await organizationsCreate();
  await organizationsCreateMaximumSetGen();
}

main().catch(console.error);
