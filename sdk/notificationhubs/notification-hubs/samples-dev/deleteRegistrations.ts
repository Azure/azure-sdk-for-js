// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to clean up a Notification Hub by removing all registrations.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to delete all registrations using Azure Notification Hubs
 * @azsdk-weight 100
 */

import { createClientContext } from "@azure/notification-hubs/client";
import { deleteRegistration } from "@azure/notification-hubs/client/deleteRegistration";
import { listRegistrations } from "@azure/notification-hubs/client/listRegistrations";

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

async function main() {
  const context = createClientContext(connectionString, hubName);

  // Unlimited
  let allRegistrations = listRegistrations(context);
  let page = 0;
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page}`);
    for (const item of pages) {
      const result = await deleteRegistration(context, item.registrationId!);
      console.log(`Delete Registration Tracking ID: ${result.trackingId}`);
      console.log(`Delete Registration Correlation ID: ${result.correlationId}`);
    }
  }
}

main().catch((err) => {
  console.log("deleteRegistration Sample: Error occurred: ", err);
  process.exit(1);
});
