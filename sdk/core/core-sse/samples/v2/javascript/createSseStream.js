// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates streaming events from Wikimedia’s recent change endpoint.
 */
const { createSseStream } = require("@azure/core-sse");
const { createRestError, getClient } = require("@azure-rest/core-client");
const { isNodeRuntime } = require("@azure/core-util");

/**
 * Retrieves a stream of events from the specified endpoint.
 * @param client - The REST client.
 * @param path - API path to the SSE endpoint.
 * @param body - Request payload.
 * @param options - Optional parameters, e.g. lastEventId.
 * @returns A promise that resolves to an EventMessageStream.
 */
function getEvents(client, path, body, options = {}) {
  const { lastEventId } = options;
  return getStream(
    client.pathUnchecked(path).get({
      accept: "text/event-stream",
      contentType: "application/json",
      body,
      ...(lastEventId ? { headers: { "Last-Event-ID": lastEventId } } : {}),
    }),
  );
}

async function main() {
  const client = getClient("https://stream.wikimedia.org");
  const events = await getEvents(
    client,
    /** https://stream.wikimedia.org/?doc#/streams/get_v2_stream_mediawiki_recentchange */
    "v2/stream/recentchange",
    /** an empty request body */
    {},
    {
      /** Start the stream of events from this position */
      lastEventId:
        '[{"topic": "eqiad.mediawiki.recentchange", "partition": 0, "offset": 1234567}, {"topic": "codfw.mediawiki.recentchange", "partition": 0, "timestamp": 1575906290000}]',
    },
  );
  for await (const event of events) {
    const data = JSON.parse(event.data);
    if (data.meta.domain === "canary") {
      continue;
    }
    if (data.server_name === "en.wikipedia.org") {
      console.log(data.title);
    }
  }
}

/**
 * Helper function determines if a response is an error.
 */
function isUnexpected(body) {
  return body.status !== "200";
}

/**
 * Helper function to get a stream from a response and handles error responses.
 */
async function getStream(res) {
  const response = await (isNodeRuntime ? res.asNodeStream() : res.asBrowserStream());
  if (isUnexpected(response)) {
    if (!response.body) {
      throw new Error(`Received a response without a body and status code ${response.status}`);
    }
    const body = await streamToString(response.body);
    let parsedError;
    try {
      parsedError = JSON.parse(body);
    } catch {
      throw new Error(`The response body is not JSON: ${body}`);
    }
    throw createRestError({ ...response, body: parsedError });
  }
  return createSseStream(response.body);
}

/**
 * Helper function to convert either a NodeJS stream or a browser stream to a string.
 */
async function streamToString(stream) {
  let result = "";
  if ("getReader" in stream) {
    const reader = stream.getReader();
    const decoder = new TextDecoder("utf8");
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
    // Flush any remaining bytes
    return result + decoder.decode();
  } else {
    stream.setEncoding("utf8");
    for await (const chunk of stream) {
      result += chunk;
    }
    return result;
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
