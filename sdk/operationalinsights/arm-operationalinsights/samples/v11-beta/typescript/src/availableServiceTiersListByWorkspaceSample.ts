// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the available service tiers for the workspace.
 *
 * @summary gets the available service tiers for the workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesAvailableServiceTiers.json
 */
async function availableServiceTiers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.availableServiceTiers.listByWorkspace("rg1", "workspace1");
  console.log(result);
}

async function main(): Promise<void> {
  await availableServiceTiers();
}

main().catch(console.error);
