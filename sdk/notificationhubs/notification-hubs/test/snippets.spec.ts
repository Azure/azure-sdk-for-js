// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import type { JsonPatch } from "@azure/notification-hubs";
import {
  createAppleInstallation,
  createAppleNotification,
  createAppleNotificationBody,
  createAppleRegistrationDescription,
  createTagExpression,
  NotificationHubsClient,
} from "@azure/notification-hubs";
import {
  createClientContext,
  createOrUpdateInstallation,
  createRegistration,
  getInstallation,
  getRegistration,
  listRegistrationsByTag,
  scheduleNotification,
  sendBroadcastNotification,
  sendNotification,
  updateInstallation,
  updateRegistration,
} from "@azure/notification-hubs/api";
import { describe, it } from "vitest";

describe("snippets", function () {
  it("importing_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const installation = createAppleInstallation({
      installationId: "<installation-id>",
      pushChannel: "<push-channel>",
      tags: ["likes_javascript"],
    });
    // @ts-preserve-whitespace
    const result = await client.createOrUpdateInstallation(installation);
  });

  it("importing_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const installation = createAppleInstallation({
      installationId: "<installation-id>",
      pushChannel: "<push-channel>",
      tags: ["likes_javascript"],
    });
    // @ts-preserve-whitespace
    const result = await createOrUpdateInstallation(context, installation);
  });

  it("authenticating_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
  });

  it("authenticating_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
  });

  it("createOrUpdateInstallation_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    // Create an installation for APNs
    const installation = createAppleInstallation({
      installationId: "0d8ab095-c449-493f-9195-17e4917806c4", // Must be unique
      pushChannel: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0", // PNS specific handle
      tags: ["likes_hockey", "likes_football"],
    });
    // @ts-preserve-whitespace
    const response = await client.createOrUpdateInstallation(installation);
  });

  it("createOrUpdateInstallation_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    // Create an installation for APNs
    const installation = createAppleInstallation({
      installationId: "0d8ab095-c449-493f-9195-17e4917806c4", // Must be unique
      pushChannel: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0", // PNS specific handle
      tags: ["likes_hockey", "likes_football"],
    });
    // @ts-preserve-whitespace
    const response = await createOrUpdateInstallation(context, installation);
  });

  it("updateInstallation_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const installationId = "<unique installation ID>";

    const updates: JsonPatch[] = [
      { op: "add", path: "/tags", value: "likes_baseball" },
      { op: "add", path: "/userId", value: "bob@contoso.com" },
    ];
    // @ts-preserve-whitespace
    const installation = await client.updateInstallation(installationId, updates);
  });

  it("updateInstallation_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const installationId = "<unique installation ID>";
    // @ts-preserve-whitespace
    const updates: JsonPatch[] = [
      { op: "add", path: "/tags", value: "likes_baseball" },
      { op: "add", path: "/userId", value: "bob@contoso.com" },
    ];
    // @ts-preserve-whitespace
    const installation = await updateInstallation(context, installationId, updates);
  });

  it("getInstallation_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const installationId = "<unique installation ID>";
    // @ts-preserve-whitespace
    const installation = client.getInstallation(installationId);
  });

  it("getInstallation_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const installationId = "<unique installation ID>";
    // @ts-preserve-whitespace
    const installation = getInstallation(context, installationId);
  });

  it("createRegistration_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const registration = createAppleRegistrationDescription({
      deviceToken: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0",
      tags: ["likes_hockey", "likes_football"],
    });

    const updatedRegistration = await client.createRegistration(registration);
  });

  it("createRegistration_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const registration = createAppleRegistrationDescription({
      deviceToken: "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0",
      tags: ["likes_hockey", "likes_football"],
    });
    // @ts-preserve-whitespace
    const updatedRegistration = await createRegistration(context, registration);
  });

  it("updateRegistration_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const registrationId = "<unique Registration ID>";
    // @ts-preserve-whitespace
    const registration = await client.getRegistration(registrationId);
    // @ts-preserve-whitespace
    if (registration.tags) {
      registration.tags.push("likes_sports");
    } else {
      registration.tags = ["likes_sports"];
    }
    // @ts-preserve-whitespace
    const updatedRegistration = await client.updateRegistration(registration);
  });

  it("updateRegistration_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const registrationId = "<unique Registration ID>";
    // @ts-preserve-whitespace
    const registration = await getRegistration(context, registrationId);
    // @ts-preserve-whitespace
    if (registration.tags) {
      registration.tags.push("likes_sports");
    } else {
      registration.tags = ["likes_sports"];
    }
    // @ts-preserve-whitespace
    const updatedRegistration = await updateRegistration(context, registration);
  });

  it("listRegistrationsByTag_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const registrations = client.listRegistrationsByTag("likes_hockey");
    // @ts-preserve-whitespace
    let page = 0;
    for await (const pages of registrations.byPage()) {
      console.log(`Page number ${page++}`);
      for (const item of pages) {
        console.log(JSON.stringify(item, null, 2));
      }
    }
  });

  it("listRegistrationsByTag_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const registrations = await listRegistrationsByTag(context, "likes_hockey");
    // @ts-preserve-whitespace
    let page = 0;
    for await (const pages of registrations.byPage()) {
      console.log(`Page number ${page++}`);
      for (const item of pages) {
        console.log(JSON.stringify(item, null, 2));
      }
    }
  });

  it("createAppleNotificationBody", async function () {
    const apnsBody = createAppleNotificationBody({
      alert: {
        title: "Notification Title",
        subtitle: "Notification Subtitle",
        body: "Notification body goes here",
      },
      sound: "default",
      interruptionLevel: "time-sensitive",
    });
    // @ts-preserve-whitespace
    // Send the message using the modular approach
    const notification = createAppleNotification({
      body: apnsBody,
    });
  });

  it("sendBroadcastNotification_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const message = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await client.sendBroadcastNotification(message);
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Only available in Standard SKU and above
    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  });

  it("sendBroadcastNotification_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const message = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await sendBroadcastNotification(context, message);
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Only available in Standard SKU and above
    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  });

  it("directSend_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const deviceHandle = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const message = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await client.sendNotification(message, { deviceHandle });
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Only available in Standard SKU and above
    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  });

  it("directSend_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const deviceHandle = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const message = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await sendNotification(context, message, { deviceHandle });
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Only available in Standard SKU and above
    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  });

  it("createTagExpression", async function () {
    const tags = ["likes_football", "likes_hockey"];
    const tagExpression = createTagExpression(tags);
    // @ts-preserve-whitespace
    console.log(tagExpression);
    // likes_football||likes_hockey
  });

  it("sendNotification_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const tagExpression = "likes_hockey && likes_football";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await client.sendNotification(notification, { tagExpression });
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Only available in Standard SKU and above
    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  });

  it("sendNotification_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const tagExpression = "likes_hockey && likes_football";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await sendNotification(context, notification, { tagExpression });
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Only available in Standard SKU and above
    if (result.notificationId) {
      console.log(`Notification ID: ${result.notificationId}`);
    }
  });

  it("scheduledSendNotification_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const tagExpression = "likes_hockey && likes_football";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    // Schedule 8 hours from now
    const scheduledTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
    // @ts-preserve-whitespace
    const message = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await client.scheduleNotification(scheduledTime, message, { tagExpression });
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Can be used to cancel via the cancelScheduledSend method
    console.log(`Notification ID: ${result.notificationId}`);
  });

  it("scheduledSendNotification_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const tagExpression = "likes_hockey && likes_football";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    // Schedule 8 hours from now
    const scheduledTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
    // @ts-preserve-whitespace
    const message = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await scheduleNotification(context, scheduledTime, message, { tagExpression });
    // @ts-preserve-whitespace
    console.log(`Tracking ID: ${result.trackingId}`);
    console.log(`Correlation ID: ${result.correlationId}`);
    // @ts-preserve-whitespace
    // Can be used to cancel via the cancelScheduledSend method
    console.log(`Notification ID: ${result.notificationId}`);
  });

  it("testSend_classical", async function () {
    const client = new NotificationHubsClient("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const tagExpression = "likes_hockey && likes_football";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await client.sendNotification(notification, {
      tagExpression,
      enableTestSend: true,
    });
  });

  it("testSend_modular", async function () {
    const context = createClientContext("<connection string>", "<hub name>");
    // @ts-preserve-whitespace
    const tagExpression = "likes_hockey && likes_football";
    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;
    // @ts-preserve-whitespace
    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });
    // @ts-preserve-whitespace
    const result = await sendNotification(context, notification, {
      tagExpression,
      enableTestSend: true,
    });
  });

  it("logging", async function () {
    setLogLevel("info");
  });
});
