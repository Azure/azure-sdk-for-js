// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvVarKeys, getEnvVars } from "../utils/testUtils.js";
import {
  NotificationHubsClientContext,
  createClientContext,
  createOrUpdateInstallation,
  deleteInstallation,
} from "@azure/notification-hubs/api";
import { assert, isNode } from "@azure/test-utils";
import { createAppleInstallation } from "@azure/notification-hubs/models";
import { v4 as uuid } from "uuid";

if (isNode) {
  const env = getEnvVars();

  // Define connection string and hub name
  const connectionString = env[EnvVarKeys.NOTIFICATIONHUBS_CONNECTION_STRING];
  const hubName = env[EnvVarKeys.NOTIFICATION_HUB_NAME];

  // Define message constants
  const DUMMY_DEVICE = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
  const deviceToken = env[EnvVarKeys.APNS_DEVICE_TOKEN] || DUMMY_DEVICE;

  let installationId: string;
  let context: NotificationHubsClientContext;

  describe("createOrUpdateInstallation()", () => {
    it("should add an installation", async () => {
      context = createClientContext(connectionString, hubName);

      installationId = uuid();

      const installation = createAppleInstallation({
        installationId,
        pushChannel: deviceToken,
        tags: ["likes_hockey", "likes_football"],
      });

      const result = await createOrUpdateInstallation(context, installation);

      assert.isDefined(result.correlationId);
      assert.isDefined(result.trackingId);
    });

    afterEach(async () => {
      await deleteInstallation(context, installationId);
    });
  });
}