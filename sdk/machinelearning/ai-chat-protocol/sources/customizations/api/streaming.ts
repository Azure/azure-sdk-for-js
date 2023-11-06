// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamableMethod } from "@azure-rest/core-client";
import { wrapError } from "./util.js";
import { getStream } from "./stream.js";

function concatBuffers(a: Uint8Array, b: Uint8Array): Uint8Array {
  const res = new Uint8Array(a.length + b.length);
  res.set(a);
  res.set(b, a.length);
  return res;
}

const tokenNewLine = "\n".charCodeAt(0);

async function* toLines(chunks: AsyncIterable<Uint8Array>) {
  let buff: Uint8Array | undefined = undefined;
  for await (const chunk of chunks) {
    if (buff === undefined) {
      buff = chunk;
    } else {
      buff = concatBuffers(buff, chunk);
    }
    let buffLen = buff.length;
    let buffIdx = 0;
    while (buffIdx < buffLen) {
      for (; buffIdx < buffLen; buffIdx++) {
        if (buff[buffIdx] === tokenNewLine) {
          break;
        }
      }
      if (buffIdx === buffLen) {
        /* Didn't find a new line, so we need to read more data */
        break;
      }
      yield buff.subarray(0, buffIdx);
      const newLineStart = buffIdx + 1;
      if (newLineStart === buffLen) {
        buff = undefined;
        break;
      } else {
        buff = buff.subarray(newLineStart);
        buffIdx = 0;
        buffLen = buff.length;
      }
    }
  }
}

export async function* streamJSONLines<TModel>(
  response: StreamableMethod<unknown>,
  deserialize: (obj: any) => TModel
): AsyncIterable<TModel> {
  const stream = await getStream(response);
  const lines = await toLines(stream);
  const decoder = new TextDecoder();
  for await (const line of lines) {
    yield deserialize(
      wrapError(
        () => JSON.parse(decoder.decode(line)),
        "Error parsing an event. See 'cause' for more details"
      )
    );
  }
}
