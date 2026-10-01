// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CloudAccount
 *
 * @summary update a CloudAccount
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_Update_MaximumSet_Gen.json
 */
async function cloudAccountsUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.cloudAccounts.update("rgcommvault", "sample-cloudAccountName", {
    properties: {
      marketplace: {
        subscriptionId: "bojdg",
        offerDetails: {
          publisherId: "loowntsnvoynhzto",
          offerId: "ysmwsuakhwvkosz",
          planId: "iskbkfpr",
          planName: "pmmlirssfdvdmywddvtl",
          termUnit: "wbeqzbtvq",
          termId: "qoebjvpjc",
        },
      },
      user: {
        firstName: "dudsiomjk",
        lastName: "szqupklkgojwozjo",
        emailAddress: "user@example.com",
        upn: "wiwwe",
        phoneNumber: "ebszyfnuyzk",
      },
    },
    identity: { type: "None", userAssignedIdentities: {} },
    tags: {},
  });
  console.log(result);
}

async function main() {
  await cloudAccountsUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
