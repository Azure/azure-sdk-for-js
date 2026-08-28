// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the test notifications by the notification id
 *
 * @summary get the test notifications by the notification id
 * x-ms-original-file: 2024-10-01-preview/getTestNotificationsAtActionGroupResourceLevel.json
 */
async function getNotificationDetailsAtResourceGroupLevel() {
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

async function main() {
  await getNotificationDetailsAtResourceGroupLevel();
}

main().catch(console.error);
