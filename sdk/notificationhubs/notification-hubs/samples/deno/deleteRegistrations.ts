// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to clean up a Notification Hub by removing all registrations.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 * @summary Demonstrates how to delete all registrations using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as process from "node/process.ts";
import {
  createClientContext,
  deleteRegistration,
  listRegistrations,
} from "@azure/notification-hubs/api";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true, allowEmptyValues: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

async function main() {
  const context = createClientContext(connectionString, hubName);

  const allRegistrations = listRegistrations(context);
  let page = 0;
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page++}`);
    for (const item of pages) {
      const result = await deleteRegistration(context, item.registrationId!);
      console.log(`Delete Registration Tracking ID: ${result.trackingId}`);
      console.log(
        `Delete Registration Correlation ID: ${result.correlationId}`,
      );
    }
  }
}

main().catch((err) => {
  console.log("deleteRegistration Sample: Error occurred: ", err);
  process.exit(1);
});
