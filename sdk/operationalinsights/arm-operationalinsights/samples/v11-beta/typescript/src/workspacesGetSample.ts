// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a workspace instance.
 *
 * @summary gets a workspace instance.
 * x-ms-original-file: 2025-07-01/WorkspacesGet.json
 */
async function workspaceGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspaces.get("oiautorest6685", "oiautorest6685");
  console.log(result);
}

async function main(): Promise<void> {
  await workspaceGet();
}

main().catch(console.error);
