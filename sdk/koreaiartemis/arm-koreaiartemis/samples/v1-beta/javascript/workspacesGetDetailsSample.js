// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the complete Workspace details reported by Kore, including its projects.
 *
 * @summary returns the complete Workspace details reported by Kore, including its projects.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_GetDetails.json
 */
async function workspacesGetDetails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.getDetails("contoso-rg", "contoso-org", "contoso-prod");
  console.log(result);
}

async function main() {
  await workspacesGetDetails();
}

main().catch(console.error);
