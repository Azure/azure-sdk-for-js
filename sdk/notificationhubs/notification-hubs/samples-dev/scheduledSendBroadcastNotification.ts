// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the scheduleNotification() method can be used to schedule a broadcast
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

import * as dotenv from "dotenv";
import { createClientContext, scheduleNotification } from "@azure/notification-hubs/api";
import { createAppleNotification } from "@azure/notification-hubs/models";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

  const notification = createAppleNotification({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  // Schedule 8 hours from nows
  const scheduledTime = new Date(Date.now() + 8 * 60 * 60 * 1000);

  const result = await scheduleNotification(context, scheduledTime, notification);

  console.log(`Scheduled send Tracking ID: ${result.trackingId}`);
  console.log(`Scheduled send Correlation ID: ${result.correlationId}`);
  console.log(`Scheduled send Notification ID: ${result.notificationId}`);
}

main().catch((err) => {
  console.log("sendTagExpression Sample: Error occurred: ", err);
  process.exit(1);
});
