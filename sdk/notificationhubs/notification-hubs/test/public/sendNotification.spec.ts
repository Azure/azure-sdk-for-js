// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NotificationHubsClientContext, sendNotification } from "@azure/notification-hubs/api";
import { assert, isNode } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { createAppleNotification } from "@azure/notification-hubs/models";
import { createRecordedClientContext } from "./utils/recordedClient.js";

describe("sendDirectNotification()", () => {
  let recorder: Recorder;
  let context: NotificationHubsClientContext;
  const deviceHandle = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";

  beforeEach(async function (this: Mocha.Context) {
    if (!isNode) {
      return;
    }

    recorder = new Recorder(this.currentTest);
    context = await createRecordedClientContext(recorder);
  });

  afterEach(async function () {
    if (!isNode) {
      return;
    }

    await recorder.stop();
  });

  it("should send a broadcast Apple Notification", async function () {
    if (!isNode) {
      this.skip();
    }

    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    // Not required but can set test send to true for debugging purposes.
    const result = await sendNotification(context, notification, { enableTestSend: false });

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });

  it("should send a direct Apple Notification", async function () {
    if (!isNode) {
      this.skip();
    }

    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    const result = await sendNotification(context, notification, { deviceHandle });

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });

  it("should send an Apple Notification with a tag expression", async function () {
    if (!isNode) {
      this.skip();
    }

    const tagExpression = "likes_hockey && likes_football";

    const messageBody = `{ "aps" : { "alert" : "Hello" } }`;

    const notification = createAppleNotification({
      body: messageBody,
      headers: {
        "apns-priority": "10",
        "apns-push-type": "alert",
      },
    });

    const result = await sendNotification(context, notification, { tagExpression });

    assert.isDefined(result.trackingId);
    assert.isDefined(result.correlationId);
  });
});
