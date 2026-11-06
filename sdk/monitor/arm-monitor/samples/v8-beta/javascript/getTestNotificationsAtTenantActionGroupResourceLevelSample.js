// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the test notifications by the notification id
 *
 * @summary get the test notifications by the notification id
 * x-ms-original-file: 2023-05-01-preview/getTestNotificationsAtTenantActionGroupResourceLevel.json
 */
async function getNotificationDetailsAtTenantActionGroupLevel() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.getTestNotificationsAtTenantActionGroupResourceLevel(
    "11111111-1111-1111-1111-111111111111",
    "testTenantActionGroup",
    "11000222191287",
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
  );
  console.log(result);
}

async function main() {
  await getNotificationDetailsAtTenantActionGroupLevel();
}

main().catch(console.error);
