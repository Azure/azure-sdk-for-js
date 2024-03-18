// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  AppleRegistrationDescription,
  createAppleRegistrationDescription,
} from "../../src/models/index.js";
import {
  NotificationHubsClientContext,
  createRegistration,
  deleteRegistration,
  getRegistration,
} from "../../src/api/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClientContext } from "./utils/recordedClient.js";
import { isNode } from "@azure/core-util";

describe("getRegistration", () => {
  let recorder: Recorder;
  let context: NotificationHubsClientContext;
  let registrationId: string;
  const deviceToken = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";

  beforeEach(async (_ctx) => {
    if (!isNode) {
      return;
    }

    recorder = new Recorder();
    await recorder.setMatcher("BodilessMatcher");
    context = await createRecordedClientContext(recorder);

    let registration = createAppleRegistrationDescription({
      deviceToken,
      tags: ["likes_football", "likes_hockey"],
    });

    registration = (await createRegistration(
      context,
      registration,
    )) as AppleRegistrationDescription;
    registrationId = registration.registrationId!;
  });

  afterEach(async () => {
    if (!isNode) {
      return;
    }

    await deleteRegistration(context, registrationId);
    await recorder.stop();
  });

  it("should get a registration by the given registration ID", async (ctx) => {
    if (!isNode) {
      ctx.skip();
    }

    const registration = await getRegistration(context!, registrationId!);

    assert.equal(registration.registrationId, registrationId);
  });
});
