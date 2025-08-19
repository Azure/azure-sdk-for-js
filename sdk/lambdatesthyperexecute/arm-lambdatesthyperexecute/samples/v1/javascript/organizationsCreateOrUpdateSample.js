// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HyperExecuteClient } = require("@azure/arm-lambdatesthyperexecute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a OrganizationResource
 *
 * @summary create a OrganizationResource
 * x-ms-original-file: 2024-02-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json
 */
async function organizationsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "171E7A75-341B-4472-BC4C-7603C5AB9F32";
  const client = new HyperExecuteClient(credential, subscriptionId);
  const result = await client.organizations.createOrUpdate("rgopenapi", "testorg", {
    properties: {
      marketplace: {
        subscriptionId: "zetdxwryjgcsnosezfpovkpvgvim",
        subscriptionStatus: "PendingFulfillmentStart",
        offerDetails: {
          publisherId: "ufwwpzit",
          offerId: "fmljkvoivqmfdiwsu",
          planId: "ssjlabxexw",
          planName: "mrguqu",
          termUnit: "acvhavsffebfivyaxhxxsaqzt",
          termId: "hxkszxfscsyefeuunyyfskhibr",
        },
      },
      user: {
        firstName: "ssnzyujsrszbptndzeoqzrmbufrhgp",
        lastName: "nsfylyvdyrtfzfeehmji",
        emailAddress: "joe@example.com",
        upn: "tfqolz",
        phoneNumber: "jkevskjaaylbwjzofkzmxdysejsoir",
      },
      partnerProperties: { licensesSubscribed: 7 },
      singleSignOnProperties: {
        type: "Saml",
        state: "Initial",
        enterpriseAppId: "sonpowym",
        url: "qlshnxrfcdpjcpkxxisrn",
        aadDomains: ["hrgguokssgyrfdzliyjmovtelfu"],
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
    location: "cvymsrlt",
  });
  console.log(result);
}

async function main() {
  await organizationsCreateOrUpdateMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
