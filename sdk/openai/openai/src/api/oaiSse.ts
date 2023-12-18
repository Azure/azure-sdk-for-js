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
import { getSSEs } from "./getSSEs.js";
import { wrapError } from "./util.js";

export async function* getOaiSSEs<TEvent, O extends Record<string, any>>(
  response: StreamableMethod<unknown>,
  toEvent: (obj: O) => TEvent
): AsyncIterable<TEvent> {
  const stream = await getSSEs(response);
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
