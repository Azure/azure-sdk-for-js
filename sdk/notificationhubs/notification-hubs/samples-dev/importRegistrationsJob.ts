// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the createNotificationJob() method can be used to import registrations
 * descriptions from an existing set of exports.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/export-modify-registrations-bulk
 * to learn about Export and Import Registrations in Azure Notification Hubs.
 *
 *
 * @summary Demonstrates how to import registrations into a Notification Hub.
 * @azsdk-weight 100
 */

import { NotificationHubJob } from "@azure/notification-hubs/models/notificationHubJob";
import { createClientContext } from "@azure/notification-hubs/client";
import { delay } from "@azure/core-util";
import { getNotificationHubJob } from "@azure/notification-hubs/client/getNotificationHubJob";
import { submitNotificationHubJob } from "@azure/notification-hubs/client/submitNotificationHubJob";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define export job parameters
const outputContainerUrl = process.env.OUTPUT_CONTAINER_URL || "<output container URL>";
const importFileUrl = process.env.IMPORT_FILE_URL || "<import file URL>";

async function main() {
  const context = createClientContext(connectionString, hubName);

  let importJob: NotificationHubJob = {
    outputContainerUrl,
    importFileUrl,
    type: "ImportCreateRegistrations",
  };

  importJob = await submitNotificationHubJob(context, importJob);

  let count = 0;
  while (importJob.status !== "Completed" && importJob.status !== "Failed" && count++ < 10) {
    importJob = await getNotificationHubJob(context, importJob.jobId!);
    await delay(1000);
  }

  console.log(`Notification Hub Job status: ${importJob.status}`);
}

main().catch((err) => {
  console.log("exportRegistrationJob Sample: Error occurred: ", err);
  process.exit(1);
});
