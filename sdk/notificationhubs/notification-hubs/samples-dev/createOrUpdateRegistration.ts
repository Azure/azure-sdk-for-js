// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the createOrUpdateRegistration() method can be used to register a device with Azure
 * Notification Hubs using the Registration APIs.  This also uses the createRegistrationId() method to create a
 * registration ID for us before saving it to the backend.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to create or update a registration using Azure Notification Hubs.
 * @azsdk-weight 100
 */

import * as dotenv from "dotenv";
import {
  createClientContext,
  createRegistrationId,
  createOrUpdateRegistration,
} from "@azure/notification-hubs/api";
import { createAppleRegistrationDescription } from "@azure/notification-hubs/models";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceToken = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

async function main() {
  const context = createClientContext(connectionString, hubName);

  const registrationId = await createRegistrationId(context);
  console.log(`New Registration ID ${registrationId}`);

  const registration = createAppleRegistrationDescription({
    registrationId,
    deviceToken,
    tags: ["likes_football", "likes_hockey"],
  });

  const registrationResponse = await createOrUpdateRegistration(context, registration);

  console.log(`Registration ID: ${registrationResponse.registrationId}`);
}

main().catch((err) => {
  console.log("createRegistration Sample: Error occurred: ", err);
  process.exit(1);
});
