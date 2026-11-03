// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reconcile network security perimeter configuration for ScheduledQueryRule resource.
 *
 * @summary reconcile network security perimeter configuration for ScheduledQueryRule resource.
 * x-ms-original-file: 2021-10-01/NSPForScheduledQueryRule_Reconcile.json
 */
async function reconcileNSPConfigForScheduledQueryRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  await client.scheduledQueryRule.reconcileNSP(
    "exampleRG",
    "someRule",
    "somePerimeterConfiguration",
  );
}

async function main() {
  await reconcileNSPConfigForScheduledQueryRule();
}

main().catch(console.error);
