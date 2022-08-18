// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { createRecorder } from "./utils/recordedClient";
import { Context } from "mocha";
import Personalizer, { PersonalizerClient } from "../../src";
import { env } from "process";
import { assert } from "chai";

describe("Event Tests", () => {
  let recorder: Recorder;
  let client: PersonalizerClient;

  beforeEach(async function (this: Context) {
    recorder = await createRecorder(this);
    client = Personalizer(env["PERSONALIZER_ENDPOINT_SINGLE_SLOT"] ?? "", {
      key: env["PERSONALIZER_API_KEY_SINGLE_SLOT"] ?? "",
    });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("activate Test", async function () {
    const eventId: string = "123456789";
    const response = await client.path("/events/{eventId}/activate", eventId).post();
    assert.equal(response.status, "204");
  });

  it("reward Test", async function () {
    const eventId: string = "123456789";
    const response = await client
      .path("/events/{eventId}/reward", eventId)
      .post({ body: { value: 1 } });
    assert.equal(response.status, "204");
  });
});
