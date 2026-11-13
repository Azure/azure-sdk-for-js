// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Workspace under an Organization.
 *
 * @summary get a Workspace under an Organization.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_Get.json
 */
async function workspacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.get("contoso-rg", "contoso-org", "contoso-prod");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Workspace under an Organization.
 *
 * @summary get a Workspace under an Organization.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_Get_MaximumSet_Gen.json
 */
async function workspacesGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.get("contoso-rg", "contoso-org", "contoso-prod");
  console.log(result);
}

async function main() {
  await workspacesGet();
  await workspacesGetMaximumSetGen();
}

main().catch(console.error);
