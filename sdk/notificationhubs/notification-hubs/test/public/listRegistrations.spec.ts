// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AppleRegistrationDescription,
  createAppleRegistrationDescription,
} from "@azure/notification-hubs/models/registration";
import {
  NotificationHubsClientContext,
  createClientContext,
} from "@azure/notification-hubs/client";
import { assert } from "@azure/test-utils";
import { createRegistration } from "@azure/notification-hubs/client/createRegistration";
import { deleteRegistration } from "@azure/notification-hubs/client/deleteRegistration";
import { listRegistrations } from "@azure/notification-hubs/client/listRegistrations";

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

const registrationIds: string[] = [];
let context: NotificationHubsClientContext;

describe("listRegistrations()", () => {
  beforeEach(async () => {
    context = createClientContext(connectionString, hubName);

    for (let i = 0; i < 3; i++) {
      let registration = createAppleRegistrationDescription({
        deviceToken,
        tags: ["likes_football", "likes_hockey"],
      });

      registration = (await createRegistration(
        context,
        registration
      )) as AppleRegistrationDescription;
      registrationIds.push(registration.registrationId!);
    }
  });

  afterEach(async () => {
    for (const registrationId of registrationIds) {
      await deleteRegistration(context, registrationId);
    }
  });

  it("should list all registrations", async () => {
    const registrations = listRegistrations(context);

    let numberOfItems = 0;
    const foundRegistrations: string[] = [];
    for await (const registration of registrations) {
      numberOfItems++;
      foundRegistrations.push(registration.registrationId!);
    }

    assert.isTrue(numberOfItems > 0);
    assert.isTrue(
      registrationIds.some((registrationId) => foundRegistrations.includes(registrationId))
    );
  });
});
