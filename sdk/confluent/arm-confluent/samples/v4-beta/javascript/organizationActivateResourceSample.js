// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2026-06-02-preview/Organization_ActivateResource_MaximumSet_Gen.json
 */
async function organizationActivateResourceMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.activateResource({
    saasGuid: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    publisherId: "confluent",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2026-06-02-preview/Organization_ActivateResource_MinimumSet_Gen.json
 */
async function organizationActivateResourceMinimumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.activateResource({
    saasGuid: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
  });
  console.log(result);
}

async function main() {
  await organizationActivateResourceMaximumSetGeneratedByMaximumSetRule();
  await organizationActivateResourceMinimumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
