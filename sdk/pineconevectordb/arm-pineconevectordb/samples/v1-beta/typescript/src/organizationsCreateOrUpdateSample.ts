// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorDbClient } from "@azure/arm-pineconevectordb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2024-10-22-preview/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate(
    "rgopenapi",
    "example-organization-name",
    {
      properties: {
        marketplace: {
          subscriptionId: "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077",
          subscriptionStatus: "PendingFulfillmentStart",
          offerDetails: {
            publisherId: "4d194daf-fa20-46a8-bfb4-5b7d96cae009",
            offerId: "013124d0-bf05-4eab-a6bb-01fa83870642",
            planId: "62dda065-5acd-4ac5-b418-8610beed92a2",
            planName: "Freemium",
            termUnit: "der",
            termId: "a2b7ce01-f06d-4874-9f77-6ea4a4875c16",
          },
        },
        user: {
          firstName: "Jimmy",
          lastName: "McExample",
          emailAddress: "example.user@example.com",
          upn: "example.user@example.com",
          phoneNumber: "555-555-5555",
        },
        partnerProperties: { displayName: "My Example Organization" },
        singleSignOnProperties: {
          type: "Saml",
          state: "Initial",
          enterpriseAppId: "44d3fb26-d8d5-41ff-9b9a-769737f22f13",
          url: "https://login.pinecone.io/?sso=true&connection=dfwgsqzkbrjqrglcsa",
          aadDomains: ["exampledomain"],
        },
      },
      identity: {
        type: "None",
        userAssignedIdentities: { ident904655400: {} },
      },
      tags: { "my-tag": "tag.value" },
      location: "us-east",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  organizationsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
