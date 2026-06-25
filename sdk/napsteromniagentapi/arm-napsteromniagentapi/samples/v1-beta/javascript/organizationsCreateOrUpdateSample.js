// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2025-12-24-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rgopenapi", "contosoOrg", {
    properties: {
      marketplace: {
        subscriptionId: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        offerDetails: {
          publisherId: "contoso",
          offerId: "contoso-saas-app",
          planId: "standard-plan",
          planName: "Standard Plan",
          termUnit: "P1M",
          termId: "monthly-term-001",
        },
        saasResourceId:
          "/subscriptions/a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d/resourceGroups/rgopenapi/providers/Microsoft.SaaS/resources/contosoSaaS",
      },
      user: {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@contoso.com",
        upn: "john.doe@contoso.com",
        phoneNumber: "+1-425-555-1234",
      },
      partnerProperties: { application: "Contoso App" },
      singleSignOnProperties: {
        type: "Saml",
        state: "Initial",
        enterpriseAppId: "b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e",
        url: "https://login.contoso.com",
        aadDomains: ["contoso.com"],
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
    location: "eastus",
  });
  console.log(result);
}

async function main() {
  await organizationsCreateOrUpdateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
