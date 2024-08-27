// Copyright (c) Microsoft Corporation.
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

import * as dotenv from "dotenv";
import { createClientContext, listRegistrations } from "@azure/notification-hubs/api";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

const TOP = 100;

async function main(): Promise<void> {
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
}

main().catch((err) => {
  console.log("listRegistrations Sample: Error occurred: ", err);
  process.exit(1);
});
