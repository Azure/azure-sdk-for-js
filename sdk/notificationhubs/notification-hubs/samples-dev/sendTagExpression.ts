// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the sendNotification() method can be used to send a tag expression
 * notification using APNs.  This sends a JSON message to an APNs given device token and returns
 * a Tracking ID which can be used for troubleshooting with the Azure Notification Hubs team.
 *
 * See https://docs.microsoft.com/en-us/azure/notification-hubs/notification-hubs-tags-segment-push-message
 * to learn about Routing and Tag Expressions.
 *
 *
 * @summary Demonstrates how to send tag expression notifications using Azure Notification Hubs
 * @azsdk-weight 100
 */

import { delay } from "@azure/core-amqp";
import {
  createAppleMessage,
  clientFromConnectionString,
  SendOperationOptions,
  NotificationDetails,
  NotificationHubsClient,
  NotificationOutcomeState,
} from "@azure/notification-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

async function main() {
  const client = clientFromConnectionString(connectionString, hubName);

  const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
  const tagExpression = "likes_hockey && likes_football";

  const message = createAppleMessage({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  // Not required but can set test send to true for debugging purposes.
  const sendOptions: SendOperationOptions = { enableTestSend: false };
  const result = await client.sendNotification(tagExpression, message, sendOptions);

  console.log(`Tag Expression send Tracking ID: ${result.trackingId}`);
  console.log(`Tag Expression Correlation ID: ${result.correlationId}`);

  // Only available in Standard SKU and above
  if (result.notificationId) {
    console.log(`Direct send Notification ID: ${result.notificationId}`);

    const results = await getNotificationDetails(client, result.notificationId);
    if (results) {
      console.log(JSON.stringify(results, null, 2));
    }
  }
}

async function getNotificationDetails(
  client: NotificationHubsClient,
  notificationId: string
): Promise<NotificationDetails | undefined> {
  let state: NotificationOutcomeState = "Enqueued";
  let count = 0;
  let result: NotificationDetails | undefined;
  while ((state === "Enqueued" || state === "Processing") && count++ < 10) {
    try {
      result = await client.getNotificationOutcomeDetails(notificationId);
      state = result.state!;
    } catch (e) {
      // Possible to get 404 for when it doesn't exist yet.
    }

    await delay(1000);
  }

  return result;
}

main().catch((err) => {
  console.log("sendTagExpression Sample: Error occurred: ", err);
  process.exit(1);
});
