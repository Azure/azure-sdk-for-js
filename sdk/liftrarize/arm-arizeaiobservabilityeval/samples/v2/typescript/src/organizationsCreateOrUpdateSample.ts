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
  const subscriptionId = "61641157-140c-4b97-b365-30ff76d9f82e";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("yashika-rg-arize", "test-org-1", {
    properties: {
      marketplace: {
        subscriptionId: "61641157-140c-4b97-b365-30ff76d9f82e",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "arizeai1657829589668",
          offerId: "arize-liftr-0",
          planId: "liftr-test-0",
          planName: "Liftr Test 0",
          termUnit: "P1M",
          termId: "gmz7xq9ge3py",
        },
      },
      user: {
        firstName: "",
        lastName: "",
        emailAddress: "yashikajain@microsoft.com",
        upn: "yashikajain@microsoft.com",
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
    location: "East US",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsCreateOrUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
