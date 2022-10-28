// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import {
  NotificationHubsClientContext,
  createClientContext,
  createOrUpdateRegistration,
  createRegistrationId,
  deleteRegistration,
  getRegistration,
} from "@azure/notification-hubs/api";
import { assert } from "@azure/test-utils";
import { createAppleRegistrationDescription } from "@azure/notification-hubs/models";

// Load the .env file if it exists
dotenv.config();

// Define connection string and hub name
const connectionString = process.env.NOTIFICATIONHUBS_CONNECTION_STRING || "<connection string>";
const hubName = process.env.NOTIFICATION_HUB_NAME || "<hub name>";

// Define message constants
const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
const deviceToken = process.env.APNS_DEVICE_TOKEN || DUMMY_DEVICE;

let registrationId: string;
let context: NotificationHubsClientContext;

describe("createRegistrationId()", () => {
  beforeEach(async () => {
    context = createClientContext(connectionString, hubName);

    registrationId = await createRegistrationId(context);

    const registration = createAppleRegistrationDescription({
      registrationId,
      deviceToken,
      tags: ["likes_football", "likes_hockey"],
    });

    await createOrUpdateRegistration(context, registration);
  });

  afterEach(async () => {
    await deleteRegistration(context, registrationId);
  });

  it("should get a registration by the given registration ID", async () => {
    const registration = await getRegistration(context!, registrationId!);

    assert.equal(registration.registrationId, registrationId);
  });
});
