// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { InformaticaDataManagement } from "@azure/arm-informaticadatamanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a InformaticaOrganizationResource
 *
 * @summary create a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rg-example", "myOrganization", {
    properties: {
      informaticaProperties: {
        organizationId: "org123",
        organizationName: "MyInformaticaOrg",
        informaticaRegion: "westus",
        singleSignOnUrl: "https://sso.informatica.com/myorg",
      },
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
      linkOrganization: { token: "link-token-abc123" },
    },
    tags: { environment: "production" },
    location: "westus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create a InformaticaOrganizationResource
 *
 * @summary create a InformaticaOrganizationResource
 * x-ms-original-file: 2025-11-27/Organizations_CreateOrUpdate_MinimumSet_Gen.json
 */
async function organizationsCreateOrUpdateMin(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new InformaticaDataManagement(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rg-example", "myOrganization", {
    location: "westus",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsCreateOrUpdate();
  await organizationsCreateOrUpdateMin();
}

main().catch(console.error);
