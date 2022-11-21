// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the sendDirectNotification() method can be used to send a direct
 * notification using APNs.  This sends a JSON message to an APNs given device token and returns
 * a Tracking ID which can be used for troubleshooting with the Azure Notification Hubs team.
 *
 * See https://docs.microsoft.com/rest/api/notificationhubs/direct-send
 * to learn about Direct Send.
 *
 *
 * @summary Demonstrates how to send direct notifications using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as process from "node/process.ts";
import {
  NotificationDetails,
  NotificationOutcomeState,
  createAppleNotification,
} from "npm:@azure/notification-hubs@1.0.0-beta.7/models";
import {
  NotificationHubsClientContext,
  createClientContext,
  getNotificationOutcomeDetails,
  sendNotification,
} from "npm:@azure/notification-hubs@1.0.0-beta.7/api";
import { isRestError } from "npm:@azure/core-rest-pipeline@1.10.0";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

// Define message constants
const deviceHandle = enviromentVariables.APNS_DEVICE_TOKEN 

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  const messageBody = `{ "aps" : { "alert" : { title: "Hello", body: "Hello there sample!" } } }`;

  const notification = createAppleNotification({
    body: messageBody,
    headers: {
      "apns-priority": "10",
      "apns-push-type": "alert",
    },
  });

  const result = await sendNotification(context, notification, { deviceHandle });

  console.log(`Direct send Tracking ID: ${result.trackingId}`);
  console.log(`Direct send Correlation ID: ${result.correlationId}`);

  // Only available in Standard SKU and above
  if (result.notificationId) {
    console.log(`Direct send Notification ID: ${result.notificationId}`);

    const results = await getNotificationDetails(context, result.notificationId);
    if (results) {
      console.log(JSON.stringify(results, null, 2));
    }
  }
}

async function getNotificationDetails(
  context: NotificationHubsClientContext,
  notificationId: string
): Promise<NotificationDetails | undefined> {
  let state: NotificationOutcomeState = "Enqueued";
  let count = 0;
  let result: NotificationDetails | undefined;
  while ((state === "Enqueued" || state === "Processing") && count++ < 10) {
    try {
      result = await getNotificationOutcomeDetails(context, notificationId);
      state = result.state!;
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
  console.log("sendDirectNotification Sample: Error occurred: ", err);
  process.exit(1);
});

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
