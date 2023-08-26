// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { wrapError } from "./util.js";

export async function* getOaiSSEs<TEvent>(
  response: StreamableMethod<unknown>,
  toEvent: (obj: Record<string, any>) => TEvent
): AsyncIterable<TEvent> {
  const stream = await response.asEvents();
  let isDone = false;
  for await (const event of stream) {
    if (isDone) {
      // handle a case where the service sends excess stream
      // data after the [DONE] event
      continue;
    } else if (event.data === "[DONE]") {
      isDone = true;
    } else {
      yield toEvent(
        wrapError(
          () => JSON.parse(event.data),
          "Error parsing an event. See 'cause' for more details"
        )
      );
    }
  }
}
