// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { 
  createAppleRegistrationDescription,
  clientFromConnectionString 
} from "@azure/notification-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceToken = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

async function main() {
  const client = clientFromConnectionString(connectionString, hubName);

  const registration = createAppleRegistrationDescription({
    deviceToken,
    tags: [ "likes_football", "likes_hockey" ],
  });

  const registrationResponse = await client.createRegistration(registration);

  console.log(`Registration ID: ${registrationResponse.registrationId}`);
}

main()
  .catch((err) => {
    console.log("createRegistration Sample: Error occurred: ", err);
    process.exit(1);
  });
