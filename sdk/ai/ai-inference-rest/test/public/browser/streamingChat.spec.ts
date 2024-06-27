// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createRecorder, createModelClient } from "../utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { createSseStream } from "@azure/core-sse";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { ModelClient } from "../../../src/index.js";

describe("chat test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createModelClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });
  it("chat streaming test", async function () {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "user", content: "How many feet are in a mile?" },
        ],
        stream: true
      }
    }).asBrowserStream();

    assert.equal(response.status, "200");
    const stream = response.body;
    assert.isDefined(stream);
    const sses = createSseStream(stream);

    for await (const event of sses) {
      if (event.data === "[DONE]") {
        return;
      }
      for (const choice of (JSON.parse(event.data)).choices) {
        assert.isDefined(choice.delta);
      }
    }

  });

});
