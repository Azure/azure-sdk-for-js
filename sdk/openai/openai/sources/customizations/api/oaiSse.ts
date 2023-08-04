// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { getSSEs } from "./getSSEs.js";
import { wrapError } from "./util.js";

export async function* getOaiSSEs<TEvent>(
  response: StreamableMethod<unknown>,
  toEvent: (obj: Record<string, any>) => TEvent
): AsyncIterable<TEvent> {
  const stream = await getSSEs(response);
  for await (const event of stream) {
    if (event.data === "[DONE]") {
      break;
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
