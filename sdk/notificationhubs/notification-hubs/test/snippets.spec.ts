// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClient, createAppleInstallation } from "@azure/notification-hubs";
import { createClientContext, createOrUpdateInstallation } from "@azure/notification-hubs/api";
import { createAppleInstallation as createAppleInstallationModular } from "@azure/notification-hubs/models";

describe("snippets", () => {
  it("ClassicalImportingClient", async () => {
    const connectionString =
      process.env.NOTIFICATIONHUBS_CONNECTION_STRING ?? "<connection string>";
    const hubName = process.env.NOTIFICATION_HUB_NAME ?? "<hub name>";

    const client = new NotificationHubsClient(connectionString, hubName);

    const installation = createAppleInstallation({
      installationId: "<installation-id>",
      pushChannel: "<push-channel>",
      tags: ["likes_javascript"],
    });

    // @ts-ignore
    const result = await client.createOrUpdateInstallation(installation);
  });

  it("ModularImportingClient", async () => {
    const connectionString =
      process.env.NOTIFICATIONHUBS_CONNECTION_STRING ?? "<connection string>";
    const hubName = process.env.NOTIFICATION_HUB_NAME ?? "<hub name>";

    const context = createClientContext(connectionString, hubName);

    const installation = createAppleInstallationModular({
      installationId: "<installation-id>",
      pushChannel: "<push-channel>",
      tags: ["likes_javascript"],
    });

    // @ts-ignore
    const result = await createOrUpdateInstallation(context, installation);
  });

  it("ClassicalConstructor", async () => {
    const connectionString =
      process.env.NOTIFICATIONHUBS_CONNECTION_STRING ?? "<connection string>";
    const hubName = process.env.NOTIFICATION_HUB_NAME ?? "<hub name>";

    // @ts-ignore
    const client = new NotificationHubsClient(connectionString, hubName);
  });

  it("ModularConstructor", async () => {
    const connectionString =
      process.env.NOTIFICATIONHUBS_CONNECTION_STRING ?? "<connection string>";
    const hubName = process.env.NOTIFICATION_HUB_NAME ?? "<hub name>";

    // @ts-ignore
    const context = createClientContext(connectionString, hubName);
  });
});
