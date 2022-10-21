// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SendNotificationOptions } from "../../src/models/options.js";
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

describe("sendDirectNotification()", () => {
  it("should send a direct Apple Notification with a tag list", async () => {
    const context = createClientContext(connectionString, hubName);

    const tags = ["likes_hockey", "likes_football"];
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    // Not required but can set test send to true for debugging purposes.
    const sendOptions: SendNotificationOptions = { enableTestSend: false, tags };
    const result = await sendNotification(context, notification, sendOptions);

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });

  it("should send a direct Apple Notification with a tag expression", async () => {
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

    // Not required but can set test send to true for debugging purposes.
    const sendOptions: SendNotificationOptions = { enableTestSend: false, tags: tagExpression };
    const result = await sendNotification(context, notification, sendOptions);

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });
});
