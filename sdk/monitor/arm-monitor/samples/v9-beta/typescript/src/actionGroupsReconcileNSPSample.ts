// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconciles a specified NSP configuration for specified action group.
 *
 * @summary reconciles a specified NSP configuration for specified action group.
 * x-ms-original-file: 2021-10-01/NSPForActionGroups_Reconcile.json
 */
async function reconcileNSPConfigByNameForAnActionGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.actionGroups.reconcileNSP(
    "exampleRG",
    "someActionGroup",
    "somePerimeterConfiguration",
  );
}

async function main(): Promise<void> {
  await reconcileNSPConfigByNameForAnActionGroup();
}

main().catch(console.error);
