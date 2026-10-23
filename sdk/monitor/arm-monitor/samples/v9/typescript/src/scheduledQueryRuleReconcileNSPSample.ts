// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reconcile network security perimeter configuration for ScheduledQueryRule resource.
 *
 * @summary reconcile network security perimeter configuration for ScheduledQueryRule resource.
 * x-ms-original-file: 2021-10-01/NSPForScheduledQueryRule_Reconcile.json
 */
async function reconcileNSPConfigForScheduledQueryRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.scheduledQueryRule.reconcileNSP(
    "exampleRG",
    "someRule",
    "somePerimeterConfiguration",
  );
}

async function main(): Promise<void> {
  await reconcileNSPConfigForScheduledQueryRule();
}

main().catch(console.error);
