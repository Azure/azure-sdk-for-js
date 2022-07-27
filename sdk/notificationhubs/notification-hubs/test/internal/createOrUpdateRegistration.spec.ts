// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AppleRegistrationDescription,
  createAppleRegistrationDescription,
} from "@azure/notification-hubs/models/registration";
import {
  NotificationHubsClient,
  clientFromConnectionString,
} from "@azure/notification-hubs/client";
import { assert } from "@azure/test-utils";
import { createOrUpdateRegistration } from "@azure/notification-hubs/client/createOrUpdateRegistration";
import { createRegistrationId } from "@azure/notification-hubs/client/createRegistrationId";
import { deleteRegistration } from "@azure/notification-hubs/client/deleteRegistration";
import { getRegistration } from "@azure/notification-hubs/client/getRegistration";

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

let registrationId: string;
let client: NotificationHubsClient;

describe("createRegistrationId()", () => {
  beforeEach(async () => {
    client = clientFromConnectionString(connectionString, hubName);

    registrationId = await createRegistrationId(client);

    const registration = createAppleRegistrationDescription({
      registrationId,
      deviceToken,
      tags: ["likes_football", "likes_hockey"],
    });

    (await createOrUpdateRegistration(client, registration)) as AppleRegistrationDescription;
  });

  afterEach(async () => {
    await deleteRegistration(client, registrationId);
  });

  it("should get a registration by the given registration ID", async () => {
    const registration = await getRegistration(client!, registrationId!);

    assert.equal(registration.registrationId, registrationId);
  });
});
