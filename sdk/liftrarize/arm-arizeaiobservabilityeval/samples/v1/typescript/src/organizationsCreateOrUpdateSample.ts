// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityEvalClient } from "@azure/arm-arizeaiobservabilityeval";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2024-10-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4DEBE8B4-8BA4-42F8-AE50-FBEF318751D1";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rgopenapi", "test-organization-1", {
    properties: {
      marketplace: {
        subscriptionId: "meaowktoejxwfqomc",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "flrya",
          offerId: "hwhtxmtmmlwsu",
          planId: "jozklohkdpng",
          planName: "clnynwt",
          termUnit: "cbfktammjyqewljjjaokakilog",
          termId: "iugvvvoggusxuz",
        },
      },
      user: {
        firstName: "aorfffgdmglvzdvfvdyjohtnblzsfw",
        lastName: "tojbqzk",
        emailAddress: "btables@arize.com",
        upn: "xzvwwbjpqakqqyfudyp",
        phoneNumber: "akbqdbs",
      },
      partnerProperties: { description: "this is a great description" },
      singleSignOnProperties: {
        type: "Saml",
        state: "Initial",
        enterpriseAppId: "kqykskeuqffsslmpjryzggphhpeh",
        url: "ihidsswbeahnsjjxxqntz",
        aadDomains: ["tyjdvljasl"],
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
    location: "gigxuxdonjfmqnljxcgctfwqapllu",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
