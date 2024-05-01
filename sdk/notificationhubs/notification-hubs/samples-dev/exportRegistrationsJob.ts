// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the createNotificationJob() method can be used to export registrations
 * descriptions so that they can be imported into another Azure Notification Hub.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/export-modify-registrations-bulk
 * to learn about Export and Import Registrations in Azure Notification Hubs.
 *
 *
 * @summary Demonstrates how to export registrations from a Notification Hub.
 * @azsdk-weight 100
 */

import * as dotenv from "dotenv";
import {
  createClientContext,
  getNotificationHubJob,
  submitNotificationHubJob,
} from "@azure/notification-hubs/api";
import { NotificationHubJob } from "@azure/notification-hubs/models";
import { delay } from "@azure/core-util";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define export job parameters
const outputContainerUrl = process.env.OUTPUT_CONTAINER_URL || "<output container URL>";

async function main() {
  const context = createClientContext(connectionString, hubName);

  let exportJob: NotificationHubJob = {
    outputContainerUrl,
    type: "ExportRegistrations",
  };

  exportJob = await submitNotificationHubJob(context, exportJob);

  let count = 0;
  while (exportJob.status !== "Completed" && exportJob.status !== "Failed" && count++ < 10) {
    exportJob = await getNotificationHubJob(context, exportJob.jobId!);
    await delay(1000);
  }

  console.log(`Notification Hub Job status: ${exportJob.status}`);
}

main().catch((err) => {
  console.log("exportRegistrationJob Sample: Error occurred: ", err);
  process.exit(1);
});
