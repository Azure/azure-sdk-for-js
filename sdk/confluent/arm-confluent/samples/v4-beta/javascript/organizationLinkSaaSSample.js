// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to links a new SaaS to the Confluent organization of the underlying resource.
 *
 * @summary links a new SaaS to the Confluent organization of the underlying resource.
 * x-ms-original-file: 2026-06-02-preview/Organization_LinkSaaS_MaximumSet_Gen.json
 */
async function organizationLinkSaaSMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.linkSaaS("myResourceGroup", "myOrganization", {
    saaSResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.SaaS/resources/contosoSaaS",
  });
  console.log(result);
}

async function main() {
  await organizationLinkSaaSMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
