// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { StreamableMethod } from "@azure-rest/core-client";
import { getStream } from "./getSSEs.js";
import { wrapError } from "./util.js";
import { EventStream } from "../models/models.js";
import { EventMessage, createSseStream } from "@azure/core-sse";
import { polyfillStream } from "./readableStreamUtils.js";

export async function getOaiSSEs<TEvent, O extends Record<string, any>>(
  response: StreamableMethod<unknown>,
  toEvent: (obj: O) => TEvent
): Promise<EventStream<TEvent>> {
  const stringStream = await getStream(response);
  const eventStream = createSseStream(stringStream);
  const jsonParser = new TransformStream<EventMessage, TEvent>({
    transform: async (chunk, controller) => {
      if (chunk.data === "[DONE]") {
        controller.terminate();
        return eventStream[Symbol.asyncDispose]();
      }
      controller.enqueue(
        toEvent(
          wrapError(
            () => JSON.parse(chunk.data),
            "Error parsing an event. See 'cause' for more details"
          )
        )
      );
    },
  });
  /** TODO: remove these polyfills once all supported runtimes support them */
  return polyfillStream(eventStream.pipeThrough(jsonParser), () => eventStream.cancel());
}
