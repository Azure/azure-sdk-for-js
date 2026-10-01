// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CompanionAPIClient } = require("@azure/arm-napsteromniagentapi");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2025-12-24-preview/SaaSOperationGroup_ActivateResource_MaximumSet_Gen.json
 */
async function saaSOperationGroupActivateResourceMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saasGuid: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    publisherId: "contoso",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource
 * x-ms-original-file: 2025-12-24-preview/SaaSOperationGroup_ActivateResource_MinimumSet_Gen.json
 */
async function saaSOperationGroupActivateResourceMinimumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0F0FBCF9-8374-47FC-B189-B79B84033EA3";
  const client = new CompanionAPIClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saasGuid: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
  });
  console.log(result);
}

async function main() {
  await saaSOperationGroupActivateResourceMaximumSetGeneratedByMaximumSetRule();
  await saaSOperationGroupActivateResourceMinimumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
