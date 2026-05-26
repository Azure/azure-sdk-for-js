// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to disables an intelligence pack for a given workspace.
 *
 * @summary disables an intelligence pack for a given workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesDisableIntelligencePack.json
 */
async function intelligencePacksDisable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.intelligencePacks.disable("rg1", "TestLinkWS", "ChangeTracking");
}

async function main() {
  await intelligencePacksDisable();
}

main().catch(console.error);
