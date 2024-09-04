// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRecorder, createModelClient } from "../utils/recordedClient.js";
import { Recorder } from "@azure-tools/test-recorder";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { ModelClient } from "../../../src/index.js";

describe("chat test suite", () => {
  let recorder: Recorder;
  let client: ModelClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    client = await createModelClient("completions", recorder);
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

    const getBuffersLength = (buffers: Uint8Array[]): number => {
      return buffers.reduce((acc, curr) => acc + curr.length, 0);
    };

    const concatBuffers = (buffers: Uint8Array[], len?: number): Uint8Array => {
      const length = len ?? getBuffersLength(buffers);
      const res = new Uint8Array(length);
      for (let i = 0, pos = 0; i < buffers.length; i++) {
        const buffer = buffers[i];
        res.set(buffer, pos);
        pos += buffer.length;
      }

      return res;
    };

    const streamToString = async (stream: ReadableStream<Uint8Array>): Promise<string> => {
      let length = 0;
      const reader = (stream as any).getReader();
      const buffers: Uint8Array[] = [];
      try {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            return new TextDecoder().decode(concatBuffers(buffers, length));
          }
          length += value.length;
          buffers.push(value);
        }
      } finally {
        reader.releaseLock();
      }
    };

    const text = await streamToString(stream);
    assert.isNotEmpty(text);

  });

});
