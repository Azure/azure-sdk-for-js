// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { createReconnectingSseStream } from "../src/index.js";
import type { AbortSignalLike } from "@azure/abort-controller";

interface StreamResponse {
  status: string;
  headers: Record<string, string>;
  body?: ReadableStream<Uint8Array>;
}

interface Client {
  path(path: string): {
    get(options: {
      accept: string;
      abortSignal?: AbortSignalLike;
      headers?: Record<string, string>;
    }): {
      asBrowserStream(): Promise<StreamResponse>;
    };
  };
}

declare const client: Client;
declare const abortSignal: AbortSignalLike;

describe("snippets", () => {
  it("ReadmeReconnectingSseSample", async () => {
    const events = await createReconnectingSseStream(
      async ({ abortSignal, lastEventId }) => {
        return client
          .path("/events")
          .get({
            accept: "text/event-stream",
            abortSignal,
            headers: lastEventId === undefined ? undefined : { "Last-Event-ID": lastEventId },
          })
          .asBrowserStream();
      },
      {
        abortSignal,
        validateResponse: async (response) => {
          // HTTP 204 tells an EventSource client to stop reconnecting.
          if (response.status === "204") {
            return "stop";
          }
          if (response.status !== "200") {
            throw new Error(`Unexpected status code: ${response.status}`);
          }
          const contentType = response.headers["content-type"];
          if (contentType?.split(";", 1)[0].trim().toLowerCase() !== "text/event-stream") {
            throw new Error(`Unexpected content type: ${contentType}`);
          }
          return "accept";
        },
        // Reconnection is unlimited by default. Set maxRetries to bound the total
        // number of reconnection requests over the lifetime of this stream.
        maxRetries: 5,
      },
    );

    for await (const event of events) {
      if (event.data === "[DONE]") {
        // Returning or breaking cancels the active response and prevents reconnecting.
        break;
      }
      console.log(event);
    }
  });
});
