// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to links a new SaaS to the Napster organization of the underlying monitor.
 *
 * @summary links a new SaaS to the Napster organization of the underlying monitor.
 * x-ms-original-file: 2025-12-24-preview/Organizations_LinkSaaS_MaximumSet_Gen.json
 */
async function organizationsLinkSaaSMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const result = await client.organizations.linkSaaS("rgopenapi", "contosoOrg", {
    saaSResourceId:
      "/subscriptions/0F0FBCF9-8374-47FC-B189-B79B84033EA3/resourceGroups/rgopenapi/providers/Microsoft.SaaS/resources/contosoSaaS",
  });
  console.log(result);
}

async function main() {
  await organizationsLinkSaaSMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
