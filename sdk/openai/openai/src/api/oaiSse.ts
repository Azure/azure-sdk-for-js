// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { getSpeechStream, getStream } from "./getSSEs.js";
import { wrapError } from "./util.js";
import { StreamOf } from "../models/models.js";
import { EventMessage, createSseStream } from "@azure/core-sse";
import { polyfillDisposableStream, polyfillStream } from "./readableStreamUtils.js";

export async function getOaiSSEs<TEvent, O extends Record<string, any>>(
  response: StreamableMethod<unknown>,
  toEvent: (obj: O) => TEvent,
): Promise<StreamOf<TEvent>> {
  const stringStream = await getStream(response);
  const eventStream = createSseStream(stringStream);
  const jsonParser = new TransformStream<EventMessage, TEvent>({
    transform: async (chunk, controller) => {
      if (chunk.data === "[DONE]") {
        return;
      }
      controller.enqueue(
        toEvent(
          wrapError(
            () => JSON.parse(chunk.data),
            "Error parsing an event. See 'cause' for more details",
          ),
        ),
      );
    },
  });
  /** TODO: remove these polyfills once all supported runtimes support them */
  return polyfillStream(eventStream.pipeThrough(jsonParser));
}

export async function getOAISpeechStream(
  response: StreamableMethod<unknown>,
): Promise<StreamOf<Uint8Array>> {
  const stringStream = await getSpeechStream(response);
  /** TODO: remove these polyfills once all supported runtimes support them */
  return polyfillDisposableStream(stringStream);
}
