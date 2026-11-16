// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the trace association at the scope.
 *
 * @summary deletes the trace association at the scope.
 * x-ms-original-file: 2026-09-03-preview/TraceAssociationsAtSubscription_Delete_MaximumSet_Gen.json
 */
async function traceAssociationsAtSubscriptionDeleteMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.traceAssociationsAtSubscription.delete();
}

async function main() {
  await traceAssociationsAtSubscriptionDeleteMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
