// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { InformaticaDataManagement } = require("@azure/arm-informaticadatamanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a InformaticaOrganizationResource
 *
 * @summary update a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.update("rg-example", "myOrganization", {
    tags: { environment: "production", team: "platform" },
    properties: {
      informaticaOrganizationProperties: { tags: { env: "production" } },
      marketplaceDetails: {
        marketplaceSubscriptionId: "mktplace-sub-123",
        offerDetails: {
          publisherId: "informatica",
          offerId: "informatica-cloud",
          planId: "enterprise-plan",
          planName: "Enterprise Plan",
          termUnit: "P1M",
          termId: "term-001",
        },
      },
      userDetails: {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        upn: "john.doe@example.com",
        phoneNumber: "+1-555-0100",
      },
      companyDetails: {
        companyName: "Contoso Ltd",
        officeAddress: "123 Main Street, Seattle, WA 98101",
        country: "USA",
        domain: "contoso.com",
        business: "Technology",
        numberOfEmployees: 500,
      },
      existingResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-example/providers/Informatica.DataManagement/organizations/existingOrg",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a InformaticaOrganizationResource
 *
 * @summary update a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_Update_MinimumSet_Gen.json
 */
async function organizationsUpdateMin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.update("rg-example", "myOrganization", {});
  console.log(result);
}

async function main() {
  await organizationsUpdate();
  await organizationsUpdateMin();
}

main().catch(console.error);
