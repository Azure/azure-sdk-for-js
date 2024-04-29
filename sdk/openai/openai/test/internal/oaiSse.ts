// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client } from "@azure-rest/core-client";
import { getOaiSSEs } from "../../src/api/oaiSse.js";
import { assertAsyncIterable, createDataEvent, createDataLine, encoder } from "./util.js";
import { assert } from "@azure-tools/test-utils";

const toEvent = <T>(e: T): T => e;

export function buildOaiSseTests<StreamT>(
  rtName: string,
  createClient: (cb: () => StreamT) => Client,
  createStream: (cb: (write: (chunk: Uint8Array) => void) => void) => StreamT,
): Mocha.Suite {
  return describe(`[${rtName}] OpenAI Server-sent Events`, () => {
    const event = {
      id: "chatcmpl-7g167CR355QLDiEujmiNV8qdAG1H2",
      object: "chat.completion.chunk",
      created: 1690248351,
      model: "gpt-3.5-turbo-0613",
      choices: [
        {
          index: 0,
          delta: "foo",
          finish_reason: "length",
        },
      ],
    };
    it("ignores DONE event and anything after", async function () {
      const client = createClient(() =>
        createStream((write) => {
          write(createDataEvent(encoder.encode(JSON.stringify(event))));
          write(createDataLine(encoder.encode("[DONE]")));
          write(createDataLine(encoder.encode("bar")));
        }),
      );
      await assertAsyncIterable(
        getOaiSSEs(client.pathUnchecked("/foo").get(), toEvent),
        1,
        (resEvent) => {
          assert.deepEqual(event, resEvent);
        },
      );
    });

    it("works in the absence of DONE", async function () {
      const client = createClient(() =>
        createStream((write) => {
          write(createDataEvent(encoder.encode(JSON.stringify(event))));
        }),
      );
      await assertAsyncIterable(
        getOaiSSEs(client.pathUnchecked("/foo").get(), toEvent),
        1,
        (resEvent) => {
          assert.deepEqual(event, resEvent);
        },
      );
    });
  });
}
