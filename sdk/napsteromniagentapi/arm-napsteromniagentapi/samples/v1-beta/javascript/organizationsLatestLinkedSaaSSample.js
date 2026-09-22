// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the latest SaaS linked to the Napster organization of the underlying monitor.
 *
 * @summary returns the latest SaaS linked to the Napster organization of the underlying monitor.
 * x-ms-original-file: 2025-12-24-preview/Organizations_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function organizationsLatestLinkedSaaSMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const result = await client.organizations.latestLinkedSaaS("rgopenapi", "contosoOrg");
  console.log(result);
}

async function main() {
  await organizationsLatestLinkedSaaSMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
