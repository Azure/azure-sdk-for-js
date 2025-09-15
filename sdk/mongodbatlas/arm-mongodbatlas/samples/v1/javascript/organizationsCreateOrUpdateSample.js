// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AtlasClient } = require("@azure/arm-mongodbatlas");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2025-06-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "AD4FE133-6EF1-4ED8-82DB-5C1CBA58597E";
  const client = new AtlasClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rgopenapi", "U.1-:7", {
    properties: {
      marketplace: {
        subscriptionId: "o",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "rxglearenxsgpwzlsxmiicynks",
          offerId: "ohnquleylybvjrtnpjupvwlk",
          planId: "obhxnhvrtbcnoovgofbs",
          planName: "lkwdzpfhvjezjusrqzyftcikxdt",
          termUnit: "omkxrnburbnruglwqgjlahvjmbfcse",
          termId: "bqmmltwmtpdcdeszbka",
        },
      },
      user: {
        firstName: "aslybvdwwddqxwazxvxhjrs",
        lastName: "cnuitqoqpcyvmuqowgnxpwxjcveyr",
        emailAddress: ".K_@e7N-g1.xjqnbPs",
        upn: "howdzmfy",
        phoneNumber: "ilypntsrbmbbbexbasuu",
        companyName: "oxdcwwl",
      },
      partnerProperties: {
        organizationId: "lyombjlhvwxithkiy",
        redirectUrl: "cbxwtehraetlluocdihfgchvjzockn",
        organizationName: "U.1-:7",
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
    location: "wobqn",
  });
  console.log(result);
}

async function main() {
  await organizationsCreateOrUpdateMaximumSet();
}

main().catch(console.error);
