// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the latest SaaS linked to the cloud account.
 *
 * @summary returns the latest SaaS linked to the cloud account.
 * x-ms-original-file: 2026-07-03-preview/CloudAccounts_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function returnsTheLatestSaaSLinkedToTheCloudAccountGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.cloudAccounts.latestLinkedSaaS(
    "rg-commvault",
    "contoso-cloud-account",
  );
  console.log(result);
}

async function main() {
  await returnsTheLatestSaaSLinkedToTheCloudAccountGeneratedByMaximumSetRule();
}

main().catch(console.error);
