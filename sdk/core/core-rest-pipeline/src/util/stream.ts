// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Duplex, PassThrough, Readable } from "stream";

function isNodeReadableStream(x: any): x is NodeJS.ReadableStream {
  return typeof x.pipe === "function";
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
  const streams = sources.map((x) => {
    if (x instanceof Uint8Array) {
      const stream = new Duplex();
      stream.push(x);
      stream.push(null);
      return stream;
    } else if (Buffer.isBuffer(x)) {
      return Readable.from(x);
    } else if (isNodeReadableStream(x)) {
      return x;
    } else {
      throw new Error("Got a browser readable stream!?");
    }
  });

  const output = new PassThrough();
  (async () => {
    for (const stream of streams) {
      const done = stream === streams.at(-1);
      stream.pipe(output, { end: done });
      stream.on("error", (error) => output.emit("error", error));
      await new Promise((resolve) => stream.once("end", resolve));
    }
  })();

  return output;
}
