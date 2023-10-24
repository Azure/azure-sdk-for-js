// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Duplex, PassThrough } from "stream";

export function isNodeReadableStream(x: unknown): x is NodeJS.ReadableStream {
  return Boolean(x && typeof (x as NodeJS.ReadableStream).pipe === "function");
}

export function isWebReadableStream(x: unknown): x is ReadableStream {
  return Boolean(
    x &&
      typeof (x as ReadableStream).getReader === "function" &&
      typeof (x as ReadableStream).tee === "function"
  );
}

export function isReadableStream(x: unknown): x is ReadableStream | NodeJS.ReadableStream {
  return isNodeReadableStream(x) || isWebReadableStream(x);
}

export function toStream(
  source: ReadableStream | NodeJS.ReadableStream | Uint8Array | Blob
): NodeJS.ReadableStream | ReadableStream {
  if (source instanceof Uint8Array) {
    const stream = new Duplex();
    stream.push(source);
    stream.push(null);
    return stream;
  } else if (isNodeReadableStream(source)) {
    return source;
  } else {
    // FIXME: can update to support browser ReadableStream with Node >18 (for Readable.fromWeb)
    throw new Error("Blob and browser ReadableStream not currently supported in Node environment");
  }
}

export function concatenateStreams(
  sources: (ReadableStream | NodeJS.ReadableStream)[]
): ReadableStream | NodeJS.ReadableStream {
  if (sources.some(isWebReadableStream)) {
    throw new Error("Browser ReadableStream not currently supported in Node environment");
  }

  const output = new PassThrough();
  (async () => {
    for (const stream of sources as NodeJS.ReadableStream[]) {
      const done = stream === sources.at(-1);
      stream.pipe(output, { end: done });
      stream.on("error", (error) => output.emit("error", error));
      await new Promise((resolve) => stream.once("end", resolve));
    }
  })();

  return output;
}
