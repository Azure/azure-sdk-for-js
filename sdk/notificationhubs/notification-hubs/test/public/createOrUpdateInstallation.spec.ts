// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, beforeEach, afterEach } from "vitest";
import {
  NotificationHubsClientContext,
  createOrUpdateInstallation,
  deleteInstallation,
} from "../../src/api/index.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createAppleInstallation } from "../../src/models/index.js";
import { createRecordedClientContext } from "./utils/recordedClient.js";

describe("createOrUpdateInstallation()", () => {
  let recorder: Recorder;
  let context: NotificationHubsClientContext;
  const installationId = "0e7c5973-714c-4ba9-a233-7c4497d5f43b";
  const pushChannel = "00fc13adff785122b4ad28809a3420982341241421348097878e577c991de8f0";

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    context = await createRecordedClientContext(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should add an installation", async () => {
    const installation = createAppleInstallation({
      installationId,
      pushChannel,
      tags: ["likes_hockey", "likes_football"],
    });

    const result = await createOrUpdateInstallation(context, installation);

    assert.isDefined(result.correlationId);
    assert.isDefined(result.trackingId);

    await deleteInstallation(context, installationId);
  });
});
