// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  NotificationHubsClient,
  createClientContext,
} from "@azure/notification-hubs/client";
import { assert } from "@azure/test-utils";
import { createAppleInstallation } from "@azure/notification-hubs/models/installation";
import { createOrUpdateInstallation } from "@azure/notification-hubs/client/createOrUpdateInstallation";
import { deleteInstallation } from "@azure/notification-hubs/client/deleteInstallation";
import { v4 } from "uuid";

// Load the .env file if it exists
// eslint-disable-next-line sort-imports
import * as dotenv from "dotenv";

dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceToken = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

let installationId: string;
let client: NotificationHubsClient;

describe("createOrUpdateInstallation()", () => {
  it("should add an installation", async () => {
    client = createClientContext(connectionString, hubName);

    installationId = v4();

    const installation = createAppleInstallation({
      installationId,
      pushChannel: deviceToken,
      tags: ["likes_hockey", "likes_football"],
    });

    const result = await createOrUpdateInstallation(client, installation);

    assert.isDefined(result.correlationId);
    assert.isDefined(result.trackingId);
  });

  afterEach(async () => {
    await deleteInstallation(client, installationId);
  });
});
