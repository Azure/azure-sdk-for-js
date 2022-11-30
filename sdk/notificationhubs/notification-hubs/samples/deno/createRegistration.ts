// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the createRegistration() method can be used to register a device with Azure
 * Notification Hubs using the Registration APIs.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 * @summary Demonstrates how to create a registration description using Azure Notification hubs.
 * @azsdk-weight 100
 */

import * as process from "node/process.ts";
import {
  createClientContext,
  createRegistration,
} from "npm:@azure/notification-hubs@1.0.0-beta.7/api";
import { createAppleRegistrationDescription } from "npm:@azure/notification-hubs@1.0.0-beta.7/models";

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
