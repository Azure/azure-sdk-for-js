// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

function uint8ArrayToStream(data: Uint8Array): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(data);
      controller.close();
    },
  });
}

export function toStream(
  source: ReadableStream<Uint8Array> | NodeJS.ReadableStream | Uint8Array | Blob
): ReadableStream<Uint8Array> {
  if (source instanceof Uint8Array) {
    return uint8ArrayToStream(source);
  } else if (source instanceof Blob) {
    return source.stream();
  } else if (source instanceof ReadableStream) {
    return source;
  } else {
    throw new Error(
      "Unsupported type. Only ReadableStream, Uint8Array and Blob are supported in browser"
    );
  }
}

export function concatenateStreams(
  streams: ReadableStream<Uint8Array>[]
): ReadableStream<Uint8Array> {
  let reader = streams.shift()?.getReader();

  async function doPull(controller: ReadableStreamDefaultController): Promise<void> {
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
    }

    if (done) {
      reader = streams.shift()?.getReader();
      return await doPull(controller);
    } else {
      controller.enqueue(value);
    }
  }

  return new ReadableStream({
    async pull(controller) {
      await doPull(controller);
    }
  })
}
