// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates streaming events from Wikimedia’s recent change endpoint.
 */
import { createSseStream, type EventMessage } from "@azure/core-sse";
import {
  createRestError,
  getClient,
  type PathUncheckedResponse,
  type StreamableMethod,
  type HttpResponse,
  type Client,
} from "@azure-rest/core-client";
import { isNodeRuntime } from "@azure/core-util";

/**
 * Options to configure the getEnglishWikiRecentChanges function.
 */
interface GetEnglishWikiRecentChangesOptions {
  lastEventId?: string;
}

/**
 * The payload of an event.
 */
interface EventPayload {
  title: string;
}

/**
 * Retrieves a stream of events from the Wikimedia recent change endpoint.
 * To learn more about the Wikimedia recent change endpoint, see https://wikitech.wikimedia.org/wiki/EventStreams.
 * @param client - The REST client.
 * @param options - Optional parameters, e.g. lastEventId.
 * @returns A promise that resolves to an ReadableStream of parsed events.
 */
async function getEnglishWikiRecentChanges(
  client: Client,
  options?: GetEnglishWikiRecentChangesOptions,
): Promise<ReadableStream<EventPayload>> {
  const { lastEventId } = options || {};
  const events = await getStream(
    client.pathUnchecked("v2/stream/recentchange").get({
      accept: "text/event-stream",
      ...(lastEventId ? { headers: { "Last-Event-ID": lastEventId } } : {}),
    }),
  );
  /**
   * This stream doesn't have terminal markers in its data,
   * but we check for one anyway to demonstrate how to filter them out.
   */
  return events.pipeThrough(createTerminalStream("[DONE]")).pipeThrough(createParsedStream());
}

async function main(): Promise<void> {
  const client = getClient("https://stream.wikimedia.org");
  /**
   * The user calls the getEvents function to retrieve a stream of parsed events.
   */
  const events = await getEnglishWikiRecentChanges(client, {
    /** Start the stream of events from this position */
    lastEventId:
      '[{"topic": "eqiad.mediawiki.recentchange", "partition": 0, "offset": 1234567}, {"topic": "codfw.mediawiki.recentchange", "partition": 0, "timestamp": 1575906290000}]',
  });

  /**
   * The user can now consume the stream of parsed events.
   */
  const reader = events.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    console.log(value.title);
  }
}

/**
 * Helper function determines if a response is an error.
 */
function isUnexpected(body: HttpResponse): boolean {
  return body.status !== "200";
}

/**
 * Helper function to get a stream from a response and handles error responses.
 */
async function getStream(
  res: StreamableMethod<PathUncheckedResponse>,
): Promise<ReadableStream<EventMessage>> {
  const response = await (isNodeRuntime ? res.asNodeStream() : res.asBrowserStream());
  if (isUnexpected(response)) {
    if (!response.body) {
      throw new Error(`Received a response with status code ${response.status} and without a body`);
    }
    const body = await streamToString(response.body);
    let parsedError: Record<string, unknown>;
    try {
      parsedError = JSON.parse(body);
    } catch {
      throw new Error(
        `Received a response with status code ${response.status} but body is not JSON: ${body}`,
      );
    }
    throw createRestError({ ...response, body: parsedError });
  }
  return createSseStream(response.body as ReadableStream<Uint8Array>);
}

/**
 * Helper function to convert either a NodeJS stream or a browser stream to a string.
 */
async function streamToString(
  stream: NodeJS.ReadableStream | ReadableStream<Uint8Array>,
): Promise<string> {
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

/**
 * Helper function to create a stream that filters out terminal marks.
 */
function createTerminalStream(terminalMark: string): TransformStream<EventMessage, EventMessage> {
  return new TransformStream({
    transform(event, controller) {
      if (event.data === terminalMark) {
        return;
      } else {
        controller.enqueue(event);
      }
    },
  });
}

/**
 * Helper function to create a stream that parses event data.
 * This function filters out events where meta.domain is "canary" and only enqueues events from en.wikipedia.org.
 * The function should be modified to fit the specific requirements of the user. In the general case,
 * the function should parse the event data and enqueue the parsed data.
 */
function createParsedStream(): TransformStream<EventMessage, EventPayload> {
  return new TransformStream({
    transform(event, controller) {
      try {
        const data = JSON.parse(event.data);
        // Skip events where meta.domain is "canary"
        if (data.meta.domain === "canary") return;
        // Only enqueue events from en.wikipedia.org
        if (data.server_name === "en.wikipedia.org") {
          controller.enqueue(data);
        }
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
    },
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
