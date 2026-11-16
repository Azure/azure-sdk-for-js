// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of SaaS resources linked to the workspace.
 *
 * @summary returns the list of SaaS resources linked to the workspace.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_ListLinkedSaaS.json
 */
async function workspacesListLinkedSaaS() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.workspaces.listLinkedSaaS(
    "contoso-rg",
    "contoso-org",
    "contoso-prod",
  );
  console.log(result);
}

async function main() {
  await workspacesListLinkedSaaS();
}

main().catch(console.error);
