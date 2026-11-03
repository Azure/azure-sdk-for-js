// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the test notifications by the notification id
 *
 * @summary get the test notifications by the notification id
 * x-ms-original-file: 2024-10-01-preview/getTestNotificationsAtActionGroupResourceLevel.json
 */
async function getNotificationDetailsAtResourceGroupLevel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.actionGroups.getTestNotificationsAtActionGroupResourceLevel(
    "TestRgName",
    "TestAgName",
    "11000222191287",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNotificationDetailsAtResourceGroupLevel();
}

main().catch(console.error);
