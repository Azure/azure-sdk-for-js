// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the listRegistrations() method can be used to find all registrations for
 * the given Notification Hub with an optional set of query parameters such as OData $top and $filter.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to update an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import { createClientContext } from "@azure/notification-hubs/client";
import { listRegistrations } from "@azure/notification-hubs/client/listRegistrations";

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const devicetoken = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;
const FILTER = `DeviceToken eq '${devicetoken.toLocaleUpperCase()}'`;

const TOP = 100;

async function main() {
  const context = createClientContext(connectionString, hubName);

  // Unlimited
  let allRegistrations = listRegistrations(context);
  let page = 0;
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page++}`);
    for (const item of pages) {
      console.log(JSON.stringify(item, null, 2));
    }
  }

  // Top
  page = 0;
  allRegistrations = listRegistrations(context, { top: TOP });
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page++}`);
    for (const item of pages) {
      console.log(JSON.stringify(item, null, 2));
    }
  }

  // Query and Top
  page = 0;

  allRegistrations = listRegistrations(context, { top: TOP, filter: FILTER });
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page++}`);
    for (const item of pages) {
      console.log(JSON.stringify(item, null, 2));
    }
  }
}

main().catch((err) => {
  console.log("listRegistrations Sample: Error occurred: ", err);
  process.exit(1);
});
