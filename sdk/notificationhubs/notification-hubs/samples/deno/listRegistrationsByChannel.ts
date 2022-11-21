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

import * as process from "node/process.ts";
import { createClientContext, listRegistrationsByChannel } from "npm:@azure/notification-hubs@1.0.0-beta.7/api";
import { AppleRegistrationChannel } from "npm:@azure/notification-hubs@1.0.0-beta.7/models";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

// Define message constants
const deviceToken = enviromentVariables.APNS_DEVICE_TOKEN;

const TOP = 100;

async function main() {
  const context = createClientContext(connectionString, hubName);

  const device: AppleRegistrationChannel = {
    deviceToken,
    kind: "apple",
  };

  // Unlimited
  let allRegistrations = listRegistrationsByChannel(context, device);
  let page = 0;
  for await (const pages of allRegistrations.byPage()) {
    console.log(`Page number ${page++}`);
    for (const item of pages) {
      console.log(JSON.stringify(item, null, 2));
    }
  }

  // Top
  page = 0;
  allRegistrations = listRegistrationsByChannel(context, device, { top: TOP });
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
