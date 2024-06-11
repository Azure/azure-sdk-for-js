// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how the updateInstallation() method can be used to update an installation using
 * the JSON Patch (https://datatracker.ietf.org/doc/html/rfc6902).  This sends discrete updates using the standard
 * operation type, path and value if necessary.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about installations.
 *
 *
 * @summary Demonstrates how to update an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as dotenv from "dotenv";
import { createClientContext, updateInstallation } from "@azure/notification-hubs/api";
import { JsonPatch } from "@azure/notification-hubs/models";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define an existing Installation ID.
const installationId = process.env.INSTALLATION_ID || "<installation id>";

async function main(): Promise<void> {
  const context = createClientContext(connectionString, hubName);

  const updates: JsonPatch[] = [
    { op: "add", path: "/tags", value: "likes_baseball" },
    { op: "add", path: "/userId", value: "bob@contoso.com" },
  ];

  const result = await updateInstallation(context, installationId, updates);
  console.log(`Tracking ID: ${result.trackingId}`);
  console.log(`Correlation ID: ${result.correlationId}`);
}

main().catch((err) => {
  console.log("updateInstallation Sample: Error occurred: ", err);
  process.exit(1);
});
