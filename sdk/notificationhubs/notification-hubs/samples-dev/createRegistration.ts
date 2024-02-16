// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how the createRegistration() method can be used to register a device with Azure
 * Notification Hubs using the Registration APIs.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to create a registration description using Azure Notification hubs.
 * @azsdk-weight 100
 */

import * as dotenv from "dotenv";
import { createClientContext, createRegistration } from "@azure/notification-hubs/api";
import { createAppleRegistrationDescription } from "@azure/notification-hubs/models";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceToken = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  const registration = createAppleRegistrationDescription({
    deviceToken,
    tags: ["likes_football", "likes_hockey"],
  });

  const registrationResponse = await createRegistration(context, registration);

  console.log(`Registration ID: ${registrationResponse.registrationId}`);
}

main().catch((err) => {
  console.log("createRegistration Sample: Error occurred: ", err);
  process.exit(1);
});
