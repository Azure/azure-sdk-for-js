// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the intelligence packs possible and whether they are enabled or disabled for a given workspace.
 *
 * @summary lists all the intelligence packs possible and whether they are enabled or disabled for a given workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesListIntelligencePacks.json
 */
async function intelligencePacksList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.intelligencePacks.list("rg1", "TestLinkWS");
  console.log(result);
}

async function main() {
  await intelligencePacksList();
}

main().catch(console.error);
