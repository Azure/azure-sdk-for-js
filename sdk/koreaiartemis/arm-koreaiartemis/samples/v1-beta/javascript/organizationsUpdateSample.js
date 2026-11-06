// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update mutable properties of an Organization (long-running).
 *
 * @summary update mutable properties of an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Organizations_Update.json
 */
async function organizationsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.update("contoso-rg", "contoso-org", {
    properties: {
      partnerProperties: {
        organizationName: "Contoso AI Platform (Updated)",
        billingEmail: "new-billing@contoso.com",
        ownerEmail: "admin@contoso.com",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update mutable properties of an Organization (long-running).
 *
 * @summary update mutable properties of an Organization (long-running).
 * x-ms-original-file: 2026-07-01-preview/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.update("contoso-rg", "contoso-org", {
    properties: {
      partnerProperties: {
        organizationName: "Contoso AI Platform (Updated)",
        billingEmail: "new-billing@contoso.com",
        ownerEmail: "admin@contoso.com",
      },
      user: {
        firstName: "Jane",
        lastName: "Doe",
        emailAddress: "jane.alternate@contoso.com",
        alternateEmail: "jane.alternate@contoso.com",
        upn: "jane.doe@contoso.onmicrosoft.com",
        address: "1 Microsoft Way, Redmond, WA 98052",
        phoneNumber: "+1-425-555-0100",
      },
      companyDetails: {
        companyName: "Contoso Ltd.",
        officeAddress: "1 Microsoft Way, Redmond, WA 98052",
        country: "US",
        domain: "contoso.com",
        businessType: "Technology",
        numberOfEmployees: 28,
      },
    },
  });
  console.log(result);
}

async function main() {
  await organizationsUpdate();
  await organizationsUpdateMaximumSetGen();
}

main().catch(console.error);
