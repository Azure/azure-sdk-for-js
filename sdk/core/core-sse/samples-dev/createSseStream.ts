// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary parses server-sent events.
 */
import { createSseStream } from "@azure/core-sse";
import { Client, getClient } from "@azure-rest/core-client";
import type { IncomingMessage } from "http";

async function sendRequest(client: Client, path: string): Promise<IncomingMessage> {
  const res = await client.pathUnchecked(path).get({ accept: "text/event-stream" }).asNodeStream();
  if (res.status !== "200") {
    throw new Error(`Unexpected status code: ${res.status}`);
  }
  if (!res.body) {
    throw new Error("Expected a readable stream body");
  }
  const contentType = "text/event-stream";
  const receivedContentType = res.headers["content-type"];
  if (!receivedContentType.includes(contentType)) {
    throw new Error(`Expected a text/event-stream content but received\"${receivedContentType}\"`);
  }
  return res.body as IncomingMessage;
}

async function main() {
  const client = getClient("https://postman-echo.com");
  let stream: IncomingMessage;
  try {
    stream = await sendRequest(client, "/server-events/5");
  } catch (e) {
    console.error(e);
    return;
  }
  const events = createSseStream(stream);
  try {
    for await (const event of events) {
      console.log(event.data);
    }
  } catch (e) {
    console.error(e);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
