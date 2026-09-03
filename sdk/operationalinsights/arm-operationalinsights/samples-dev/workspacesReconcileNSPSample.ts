// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile network security perimeter configuration for Workspace resource.
 *
 * @summary reconcile network security perimeter configuration for Workspace resource.
 * x-ms-original-file: 2025-07-01/NSPForWorkspaces_Reconcile.json
 */
async function reconcileNSPConfigForScheduledQueryRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.workspaces.reconcileNSP("exampleRG", "someWorkspace", "somePerimeterConfiguration");
}

async function main(): Promise<void> {
  await reconcileNSPConfigForScheduledQueryRule();
}

main().catch(console.error);
