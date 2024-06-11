// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

import * as dotenv from "dotenv";
import {
  createClientContext,
  deleteRegistration,
  listRegistrations,
} from "@azure/notification-hubs/api";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  // Unlimited
  const allRegistrations = listRegistrations(context);
  const page = 0;
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
