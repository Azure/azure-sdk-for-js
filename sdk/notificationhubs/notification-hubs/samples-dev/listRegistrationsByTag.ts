// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the listRegistrationsByTag() method can be used to list all registrations with
 * the given tag.
 *
 * See https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to update an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import { clientFromConnectionString } from "@azure/notification-hubs";

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

const TOP = 100;
const TAG = "likes_hockey";

async function main() {
  const client = clientFromConnectionString(connectionString, hubName);

  // Unlimited
  let allRegistrations = client.listRegistrationsByTag(TAG);
  let page = 0;
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page}`);
    for (const item of pages) {
      console.log(JSON.stringify(item, null, 2));
    }
  }

  // Top
  page = 0;
  allRegistrations = client.listRegistrationsByTag(TAG, { top: TOP });
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page}`);
    for (const item of pages) {
      console.log(JSON.stringify(item, null, 2));
    }
  }
}

main().catch((err) => {
  console.log("sendDirectNotification Sample: Error occurred: ", err);
  process.exit(1);
});
