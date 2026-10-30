// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the trace association at the scope.
 *
 * @summary deletes the trace association at the scope.
 * x-ms-original-file: 2026-09-03-preview/TraceAssociationsAtSubscription_Delete_MaximumSet_Gen.json
 */
async function traceAssociationsAtSubscriptionDeleteMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.traceAssociationsAtSubscription.delete();
}

async function main(): Promise<void> {
  await traceAssociationsAtSubscriptionDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
