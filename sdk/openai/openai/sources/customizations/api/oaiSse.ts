// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { wrapError } from "./util.js";
import { toSSE } from "./sse.js";
import { isUnexpected } from "../../generated/src/rest/isUnexpected.js";

export async function* getOaiSSEs<TEvent>(
  responseObj: StreamableMethod,
  toEvent: (obj: Record<string, any>) => TEvent
): AsyncIterable<TEvent> {
  let isDone = false;
  const response = await responseObj;
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  for await (const event of toSSE(response.body)) {
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
