// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the latest SaaS linked to the Confluent organization of the underlying resource.
 *
 * @summary returns the latest SaaS linked to the Confluent organization of the underlying resource.
 * x-ms-original-file: 2026-06-02-preview/Organization_LatestLinkedSaaS_MaximumSet_Gen.json
 */
async function organizationLatestLinkedSaaSMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.latestLinkedSaaS("myResourceGroup", "myOrganization");
  console.log(result);
}

async function main() {
  await organizationLatestLinkedSaaSMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
