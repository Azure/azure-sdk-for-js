// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to links a new SaaS to the cloud account.
 *
 * @summary links a new SaaS to the cloud account.
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_LinkSaaS_MaximumSet_Gen.json
 */
async function linksANewSaaSToTheOrganizationOfTheUnderlyingMonitorGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.cloudAccounts.linkSaaS("rg-commvault", "contoso-cloud-account", {
    saaSResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-commvault/providers/Microsoft.SaaS/resources/commvault-saas",
  });
  console.log(result);
}

async function main() {
  await linksANewSaaSToTheOrganizationOfTheUnderlyingMonitorGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
