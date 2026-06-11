// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a ProtectionGroup
 *
 * @summary create a ProtectionGroup
 * x-ms-original-file: 2026-07-03-preview/ProtectionGroups_CreateOrupdate_MaximumSet_Gen.json
 */
async function protectionGroupsCreateOrupdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.protectionGroups.createOrupdate(
    "rgcommvault",
    "sample-cloudAccountName",
    "sample-protectionGroupName",
    {
      properties: {
        dataSourceType: "AzureVM",
        plan: "ibcuuodwnnvgyhy",
        resources: {
          manual: ["uljwtwhm"],
          matchRules: {
            rules: [
              { property: "resourceGroup", operator: "contains", value: "dgkmghsgmrbaatklarukbx" },
            ],
            matchType: "all",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await protectionGroupsCreateOrupdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
