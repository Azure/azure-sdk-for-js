// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the scheduleNotification() method can be used to schedule a tag expression
 * notification using APNs at a given absolute time.  This sends a JSON message to an APNs given device token and returns
 * a Tracking ID which can be used for troubleshooting with the Azure Notification Hubs team.  Note this is only
 * available in the Standard SKU namespaces and above.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-send-push-notifications-scheduled
 * to learn about scheduled send.
 *
 *
 * @summary Demonstrates how to send tag expression notifications using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as process from "node/process.ts";
import { createClientContext, scheduleNotification } from "npm:@azure/notification-hubs@1.0.0-beta.7/api";
import { createAppleNotification } from "npm:@azure/notification-hubs@1.0.0-beta.7/models";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

async function main() {
  const context = createClientContext(connectionString, hubName);

  const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
  const tagExpression = "likes_hockey && likes_football";

  const notification = createAppleNotification({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  // Schedule 8 hours from nows
  const scheduledTime = new Date(Date.now() + 8 * 60 * 60 * 1000);

  const result = await scheduleNotification(context, scheduledTime, notification, {
    tagExpression,
  });

  console.log(`Scheduled send Tracking ID: ${result.trackingId}`);
  console.log(`Scheduled send Correlation ID: ${result.correlationId}`);
  console.log(`Scheduled send Notification ID: ${result.notificationId}`);
}

main().catch((err) => {
  console.log("sendTagExpression Sample: Error occurred: ", err);
  process.exit(1);
});
