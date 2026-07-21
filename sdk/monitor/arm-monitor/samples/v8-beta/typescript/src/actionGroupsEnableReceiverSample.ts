// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enable a receiver in an action group. This changes the receiver's status from Disabled to Enabled. This operation is only supported for Email or SMS receivers.
 *
 * @summary enable a receiver in an action group. This changes the receiver's status from Disabled to Enabled. This operation is only supported for Email or SMS receivers.
 * x-ms-original-file: 2024-10-01-preview/enableReceiver.json
 */
async function enableTheReceiver(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "187f412d-1758-44d9-b052-169e2564721d";
  const client = new MonitorClient(credential, subscriptionId);
  await client.actionGroups.enableReceiver("Default-NotificationRules", "SampleActionGroup", {
    receiverName: "John Doe's mobile",
  });
}

async function main(): Promise<void> {
  await enableTheReceiver();
}

main().catch(console.error);
