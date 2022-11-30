// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the createOrUpdateInstallation() method can be used to create or overwrite an
 * installation in place.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about installations.
 *
 * @summary Demonstrates how to create or overwrite an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as process from "process";
import {
  createClientContext,
  createOrUpdateInstallation,
} from "@azure/notification-hubs/api";
import { createAppleInstallation } from "@azure/notification-hubs/models";
import { v4 as uuid } from "uuid";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true, allowEmptyValues: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

// Define message constants
const deviceToken = enviromentVariables.APNS_DEVICE_TOKEN;

async function main() {
  const context = createClientContext(connectionString, hubName);

  const installation = createAppleInstallation({
    installationId: uuid(),
    pushChannel: deviceToken,
    tags: ["likes_hockey", "likes_football"],
  });

  const result = await createOrUpdateInstallation(context, installation);
  console.log(`Tracking ID: ${result.trackingId}`);
  console.log(`Correlation ID: ${result.correlationId}`);
}

main().catch((err) => {
  console.log("createInstallation Sample: Error occurred: ", err);
  process.exit(1);
});
