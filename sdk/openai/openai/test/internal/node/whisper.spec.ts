// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { OpenAIClient } from "../../../src/index.js";
import { createClient } from "../../public/utils/recordedClient.js";
import { StreamProducer, createHttpHeaders } from "@azure/core-rest-pipeline";
import { PassThrough } from "node:stream";
import { assert } from "@azure/test-utils";

describe("OpenAI", function () {
  describe("Streaming", () => {
    let client: OpenAIClient;

    beforeEach(async function (this: Context) {
      const maxChunkSize = 4096;
      client = createClient("DummyAPIKey", {
        clientOptions: {
          httpClient: {
            sendRequest: async (request) => {
              const body = (request.body as StreamProducer)() as NodeJS.ReadableStream;
              for await (const { length } of body) {
                if (length > maxChunkSize) {
                  assert.fail(`Chunk size ${length} is larger than ${maxChunkSize}`);
                }
              }
              return {
                headers: createHttpHeaders(),
                status: 200,
                request,
              };
            },
          },
        },
      });
    });
    it("Audio operations", async function () {
      const buildStream = () => {
        const stream = new PassThrough();
        setTimeout(() => {
          const chunk = Uint8Array.from(new Array(4).fill(0));
          for (let i = 0; i < 1024; i++) {
            assert.equal(
              stream.writableHighWaterMark,
              16 * 1024,
              "The high water mark is not 16KB"
            );
            assert.isTrue(stream.write(chunk), "the internal buffer is full");
          }
          stream.end();
        }, 0);
        return stream;
      };
      await client.getAudioTranscription("test", buildStream);
      await client.getAudioTranslation("test", buildStream);
    });
  });
});
