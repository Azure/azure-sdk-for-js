// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the sendNotification() method can be used to send a tags list
 * notification using APNs.  This sends a JSON message to an APNs given device token and returns
 * a Tracking ID which can be used for troubleshooting with the Azure Notification Hubs team.
 *
 * See https://learn.microsoft.com/azure/notification-hubs/notification-hubs-tags-segment-push-message
 * to learn about Routing and Tag Expressions.
 *
 *
 * @summary Demonstrates how to send tag expression notifications using Azure Notification Hubs
 */

require("dotenv/config");
const { createAppleNotification, createTagExpression } = require("@azure/notification-hubs/models");
const {
  createClientContext,
  getNotificationOutcomeDetails,
  sendNotification,
} = require("@azure/notification-hubs/api");
const { delay } = require("@azure/core-util");
const { isRestError } = require("@azure/core-rest-pipeline");

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

async function main() {
  const context = createClientContext(connectionString, hubName);

  const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
  const tagExpression = createTagExpression(["likes_hockey", "likes_football"]);

  const notification = createAppleNotification({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  const result = await sendNotification(context, notification, {
    enableTestSend: false,
    tagExpression,
  });

  console.log(`Tag List send Tracking ID: ${result.trackingId}`);
  console.log(`Tag List Correlation ID: ${result.correlationId}`);

  // Only available in Standard SKU and above
  if (result.notificationId) {
    console.log(`Tag List send Notification ID: ${result.notificationId}`);

    const results = await getNotificationDetails(context, result.notificationId);
    if (results) {
      console.log(JSON.stringify(results, null, 2));
    }
  }
}

async function getNotificationDetails(context, notificationId) {
  let state = "Enqueued";
  let count = 0;
  let result;
  while ((state === "Enqueued" || state === "Processing") && count++ < 10) {
    try {
      result = await getNotificationOutcomeDetails(context, notificationId);
      state = result.state;
    } catch (e) {
      // Possible to get 404 for when it doesn't exist yet.
      if (isRestError(e) && e.statusCode === 404) {
        continue;
      } else {
        throw e;
      }
    }

    await delay(1000);
  }

  return result;
}

main().catch((err) => {
  console.log("sendTagsList Sample: Error occurred: ", err);
  process.exit(1);
});
