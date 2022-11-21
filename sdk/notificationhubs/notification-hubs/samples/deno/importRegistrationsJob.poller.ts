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

import * as process from "node/process.ts";
import { beginSubmitNotificationHubJob, createClientContext } from "npm:@azure/notification-hubs@1.0.0-beta.7/api";
import { NotificationHubJob } from "npm:@azure/notification-hubs@1.0.0-beta.7/models";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

// Define export job parameters
const outputContainerUrl = enviromentVariables.OUTPUT_CONTAINER_URL;
const importFileUrl = enviromentVariables.IMPORT_FILE_URL;

async function main() {
  const context = createClientContext(connectionString, hubName);

  let importJob: NotificationHubJob = {
    outputContainerUrl,
    importFileUrl,
    type: "ImportCreateRegistrations",
  };

  const poller = await beginSubmitNotificationHubJob(context, importJob);
  importJob = await poller.pollUntilDone();

  console.log(`Notification Hub Job status: ${importJob.status}`);
}

main().catch((err) => {
  console.log("exportRegistrationJob Sample: Error occurred: ", err);
  process.exit(1);
});
