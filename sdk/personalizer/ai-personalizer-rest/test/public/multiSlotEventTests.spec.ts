// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import createPersonalizerClient, { PersonalizerClient } from "../../src";
import { assert } from "chai";
import { enableMultiSlot, isMultiSlotEnabled } from "./helpers";

describe("Multi-Slot Event Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = createPersonalizerClient(
      env["PERSONALIZER_ENDPOINT_MULTI_SLOT"] ?? "",
      {
        key: env["PERSONALIZER_API_KEY_MULTI_SLOT"] ?? "",
      },
      recorder.configureClientOptions({}),
    );
    if (!(await isMultiSlotEnabled(client))) {
      await enableMultiSlot(client);
    }
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("multi-slot activate Test", async function () {
    const eventId: string = "123456789";
    const response = await client.path("/multislot/events/{eventId}/activate", eventId).post();
    assert.equal(response.status, "204");
  });

  it("multi-slot reward Test", async function () {
    const eventId: string = "123456789";
    const response = await client
      .path("/multislot/events/{eventId}/reward", eventId)
      .post({ body: { reward: [{ slotId: "Main Article", value: 1 }] } });
    assert.equal(response.status, "204");
  });
});
