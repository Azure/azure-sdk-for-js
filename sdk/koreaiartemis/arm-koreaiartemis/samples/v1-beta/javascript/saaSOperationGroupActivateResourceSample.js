// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resolve the token to get the SaaS resource ID and activate the SaaS resource.
 *
 * @summary resolve the token to get the SaaS resource ID and activate the SaaS resource.
 * x-ms-original-file: 2026-07-01-preview/SaaSOperationGroup_ActivateResource.json
 */
async function saaSOperationGroupActivateResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.saaSOperationGroup.activateResource({
    saasGuid: "12345678-1234-1234-1234-123456789012",
    publisherId: "kore-ai",
  });
  console.log(result);
}

async function main() {
  await saaSOperationGroupActivateResource();
}

main().catch(console.error);
