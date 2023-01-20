// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  NotificationHubsClientContext,
  createOrUpdateRegistration,
  createRegistrationId,
  deleteRegistration,
  getRegistration,
} from "@azure/notification-hubs/api";
import { assert, isNode } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { createAppleRegistrationDescription } from "@azure/notification-hubs/models";
import { createRecordedClientContext } from "./utils/recordedClient.js";

describe("createRegistrationId()", () => {
  let registrationId: string;
  let recorder: Recorder;
  let context: NotificationHubsClientContext;
  const deviceToken = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";

  beforeEach(async function (this: Mocha.Context) {
    if (!isNode) {
      return;
    }

    recorder = new Recorder(this.currentTest);
    await recorder.setMatcher("BodilessMatcher");
    context = await createRecordedClientContext(recorder);

    registrationId = await createRegistrationId(context);

    const registration = createAppleRegistrationDescription({
      registrationId,
      deviceToken,
      tags: ["likes_football", "likes_hockey"],
    });

    await createOrUpdateRegistration(context, registration);
  });

  afterEach(async () => {
    if (!isNode) {
      return;
    }

    await deleteRegistration(context, registrationId);
    await recorder.stop();
  });

  it("should get a registration by the given registration ID", async function () {
    if (!isNode) {
      this.skip();
    }

    const registration = await getRegistration(context!, registrationId!);

    assert.equal(registration.registrationId, registrationId);
  });
});
