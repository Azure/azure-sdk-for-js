// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { createClientContext, sendNotification } from "@azure/notification-hubs/api";
import { assert } from "@azure/test-utils";
import { createAppleNotification } from "@azure/notification-hubs/models";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceHandle = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

describe("sendDirectNotification()", () => {
  it("should send a broadcast Apple Notification", async () => {
    const context = createClientContext(connectionString, hubName);

    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    // Not required but can set test send to true for debugging purposes.
    const result = await sendNotification(context, notification, { enableTestSend: false });

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });

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

  it("should send an Apple Notification with a tag expression", async () => {
    const context = createClientContext(connectionString, hubName);

    const tagExpression = "likes_hockey && likes_football";

    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    const result = await sendNotification(context, notification, { tagExpression });

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });
});
