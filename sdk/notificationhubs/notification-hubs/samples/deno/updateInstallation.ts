// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the updateInstallation() method can be used to update an installation using
 * the JSON Patch (https://datatracker.ietf.org/doc/html/rfc6902).  This sends discrete updates using the standard
 * operation type, path and value if necessary.
 *
 * See https://docs.microsoft.com/azure/notification-hubs/notification-hubs-push-notification-registration-management
 * to learn about installations.
 *
 * @summary Demonstrates how to update an installation using Azure Notification Hubs
 * @azsdk-weight 100
 */

import * as process from "node/process.ts";
import {
  createClientContext,
  updateInstallation,
} from "npm:@azure/notification-hubs@1.0.0-beta.7/api";
import { JsonPatch } from "npm:@azure/notification-hubs@1.0.0-beta.7/models";

// Load the .env file if it exists
import { config } from "dotenv/mod.ts";

// Define connection string and hub name
const enviromentVariables = config({ safe: true });
const connectionString = enviromentVariables.NOTIFICATIONHUBS_CONNECTION_STRING;
const hubName = enviromentVariables.NOTIFICATION_HUB_NAME;

// Define an existing Installation ID.
const installationId = process.env.INSTALLATION_ID || "<installation id>";

async function main() {
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
