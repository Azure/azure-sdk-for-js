// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the updateRegistration() method can be used to update a device registration using
 * Notification Hubs. This sample shows using the getRegistrationById() method to retrieve an existing registration.
 *
 * See https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about registrations.
 *
 *
 * @summary Demonstrates how to update an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import {
  clientFromConnectionString 
} from "@azure/notification-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define an existing Registration ID.
const registrationId = process.env.INSTALLATION_ID || "<registrationId>";

async function main() {
  const client = clientFromConnectionString(connectionString, hubName);

  const registration = await client.getRegistration(registrationId);

  // Add some tags
  if (!registration.tags) {
    registration.tags = [];
  }

  registration.tags.push("likes_sports");

  const registrationResponse = await client.updateRegistration(registration);

  console.log(`Registration ID: ${registrationResponse.registrationId}`);
}

main()
  .catch((err) => {
    console.log("updateRegistration Sample: Error occurred: ", err);
    process.exit(1);
  });
