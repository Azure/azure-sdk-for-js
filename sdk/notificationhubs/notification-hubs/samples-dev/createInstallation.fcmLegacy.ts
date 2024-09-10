// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the createOrUpdateInstallation() method can be used to create or overwrite an
 * installation in place.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about installations.
 *
 *
 * @summary Demonstrates how to create or overwrite an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as dotenv from "dotenv";
import { createClientContext, createOrUpdateInstallation } from "@azure/notification-hubs/api";
import { createFcmLegacyInstallation } from "@azure/notification-hubs/models";
import { randomUUID } from "@azure/core-util";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_REGISTRATION = "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1";
const gcmRegistrationId = process.env.FCM_REGISTRATION_ID || DUMMY_REGISTRATION;

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  const installation = createFcmLegacyInstallation({
    installationId: randomUUID(),
    pushChannel: gcmRegistrationId,
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
