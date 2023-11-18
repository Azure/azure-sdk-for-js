// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { StreamProducer } from "../interfaces";
import { isBlob, isWebReadableStream } from "./typeGuards";

export async function toStream(
  source: StreamProducer | ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob
): Promise<ReadableStream<Uint8Array> | NodeJS.ReadableStream> {
  if (source instanceof Uint8Array) {
    return new Blob([source]).stream();
  } else if (isWebReadableStream(source)) {
    return source;
  } else if (isBlob(source)) {
    return source.stream();
  } else if (typeof source === "function") {
    return toStream(await source());
  } else {
    throw new Error(
      "Unsupported type. Only ReadableStream, Uint8Array and Blob are supported in browser"
    );
  }
}

export function toWebStream(
  stream: ReadableStream<Uint8Array> | NodeJS.ReadableStream
): ReadableStream<Uint8Array> {
  if (isWebReadableStream(stream)) {
    return stream;
  } else {
    throw new Error("Did not expect a Node stream in browser environment");
  }
}

export function concatenateStreams(
  streams: ReadableStream<Uint8Array>[]
): ReadableStream<Uint8Array> {
  const remainingStreams = Array.from(streams);
  let reader = remainingStreams.shift()?.getReader();

  async function doPull(controller: ReadableStreamDefaultController<Uint8Array>): Promise<void> {
    if (!reader) {
      controller.close();
      return;
    }

    let value: Uint8Array | undefined;
    let done: boolean | undefined;

    try {
      ({ value, done } = await reader.read());
    } catch (e) {
      controller.error(e);
      reader.releaseLock();
      return;
    }

    if (done) {
      reader.releaseLock();
      reader = remainingStreams.shift()?.getReader();
      await doPull(controller);
    } else {
      controller.enqueue(value);
    }
  }

  return new ReadableStream<Uint8Array>({
    pull(controller) {
      return doPull(controller);
    },

    cancel(reason) {
      reader?.cancel(reason);
    },
  });
}
