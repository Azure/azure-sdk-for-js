// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitorworkspaces";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the trace associations that apply to the scope.
 *
 * @summary lists the trace associations that apply to the scope.
 * x-ms-original-file: 2026-09-03-preview/TraceAssociationsAtSubscription_List_MaximumSet_Gen.json
 */
async function traceAssociationsAtSubscriptionListMaximumSetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.traceAssociationsAtSubscription.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await traceAssociationsAtSubscriptionListMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
