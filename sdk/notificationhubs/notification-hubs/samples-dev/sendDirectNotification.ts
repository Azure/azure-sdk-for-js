// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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

import * as dotenv from "dotenv";
import { createAppleNotification } from "@azure/notification-hubs/models";
import {
  beginGetNotificationDetails,
  createClientContext,
  sendNotification,
} from "@azure/notification-hubs/api";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceHandle = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  /* Can also send a stringified JSON object
  const messageBody = `{ "aps" : { "alert" : { title: "Hello", body: "Hello there!" } } }`;
  */

  const notification = createAppleNotification({
    body: {
      aps: {
        alert: {
          title: "Hello",
          body: "Hello there!",
        },
      },
    },
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

    const poller = await beginGetNotificationDetails(context, result.notificationId);
    const results = await poller.pollUntilDone();
    if (results) {
      console.log(JSON.stringify(results, null, 2));
    }
  }
}

main().catch((err) => {
  console.log("sendDirectNotification Sample: Error occurred: ", err);
  process.exit(1);
});
