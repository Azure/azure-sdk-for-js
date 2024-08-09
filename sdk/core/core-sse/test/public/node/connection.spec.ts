// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSseStream } from "../../../src/index.js";
import { Client, getClient } from "@azure-rest/core-client";
import { assert, beforeAll, beforeEach, afterEach, describe, it } from "vitest";
import { port } from "../../server/config.mts";
import { IncomingMessage } from "http";
import { matrix } from "@azure-tools/test-utils";

const contentType = "text/event-stream";
function getEndpoint(): string {
  return `http://localhost:${port}`;
}

async function sendRequest(client: Client, path: string): Promise<IncomingMessage> {
  const res = await client.pathUnchecked(path).get({ accept: contentType }).asNodeStream();
  if (res.status !== "200") {
    throw new Error(`Unexpected status code: ${res.status}`);
  }
  if (!res.body) {
    throw new Error("Expected a readable stream body");
  }
  const receivedContentType = res.headers["content-type"];
  if (!receivedContentType.includes(contentType)) {
    throw new Error(`Expected a text/event-stream content but received\"${receivedContentType}\"`);
  }
  return res.body as IncomingMessage;
}

describe("[NodeJS] Connections", () => {
  let client: Client;
  let ran: boolean;

  beforeAll(async function () {
    client = getClient(getEndpoint(), { allowInsecureConnection: true });
  });

  beforeEach(async function () {
    ran = false;
  });

  afterEach(async function () {
    assert.isTrue(ran);
    ran = false;
  });

  matrix(
    [
      [
        "/events/no-fin/3",
        "/events/no-fin/1",
        "/events/1",
        "/events/hang",
        "/events/extra-newline/3",
        "/events/extra-newline/hang",
        "/events/extra-event/3",
        "/events/extra-event/hang",
      ],
    ],
    async function (path) {
      describe(`${path}`, function () {
        it("loop until stream ends and then break", async function () {
          let stream: IncomingMessage;
          try {
            stream = await sendRequest(client, path);
          } catch (e) {
            assert.equal(path, "/events/no-fin/1");
            assert.equal(e.code, "ECONNRESET");
            ran = true;
            return;
          }
          const sses = createSseStream(stream);
          try {
            for await (const sse of sses) {
              ran = true;
              if (sse.data === "[DONE]") {
                if (path.includes("no-fin")) {
                  assert.isNull(stream.socket);
                }
                break;
              }
            }
          } catch (e) {
            assert.equal(path, "/events/no-fin/3");
            assert.equal(e.code, "ECONNRESET");
          }
        });

        it("break early from loop", async function () {
          let stream: IncomingMessage;
          try {
            stream = await sendRequest(client, path);
          } catch (e) {
            assert.equal(path, "/events/no-fin/1");
            assert.equal(e.code, "ECONNRESET");
            ran = true;
            return;
          }
          const sses = createSseStream(stream);
          for await (const _ of sses) {
            ran = true;
            break;
          }
        });
      });
    },
  );
});
