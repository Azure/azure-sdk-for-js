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
import { wrapError } from "./util.js";
import { toSSE } from "./sse.js";
import { isUnexpected } from "../rest/isUnexpected.js";

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
