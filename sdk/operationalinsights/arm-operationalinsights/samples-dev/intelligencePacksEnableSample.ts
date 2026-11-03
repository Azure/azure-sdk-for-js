// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enables an intelligence pack for a given workspace.
 *
 * @summary enables an intelligence pack for a given workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesEnableIntelligencePack.json
 */
async function intelligencePacksEnable(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.intelligencePacks.enable("rg1", "TestLinkWS", "ChangeTracking");
}

async function main(): Promise<void> {
  await intelligencePacksEnable();
}

main().catch(console.error);
