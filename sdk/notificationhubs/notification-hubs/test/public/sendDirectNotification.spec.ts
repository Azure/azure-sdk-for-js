// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { createAppleNotification } from "@azure/notification-hubs/models/notification";
import { createClientContext } from "@azure/notification-hubs/client";
import { sendNotification } from "@azure/notification-hubs/client/sendNotification";

// Load the .env file if it exists
// eslint-disable-next-line sort-imports
import * as dotenv from "dotenv";

dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceHandle = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

describe("sendDirectNotification()", () => {
  it("should send a direct Apple Notification", async () => {
    const context = createClientContext(connectionString, hubName);

    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    const result = await sendNotification(context, notification, { deviceHandle });

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });
});
