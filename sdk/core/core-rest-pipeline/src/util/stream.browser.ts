function uint8ArrayToStream(data: Uint8Array): ReadableStream {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(data);
    },
  });
}

export function toStream(source: ReadableStream | NodeJS.ReadableStream | Uint8Array | Blob) {
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
  sources: (ReadableStream | NodeJS.ReadableStream | Uint8Array)[]
): ReadableStream | NodeJS.ReadableStream {
  const streams = sources.map((x) => {
    if (x instanceof Uint8Array) {
      return uint8ArrayToStream(x);
    } else if (x instanceof ReadableStream) {
      return x;
    } else {
      throw new Error("Can only concatenate ReadableStream or Uint8Array in browser");
    }
  });

  const output = new TransformStream();
  // TODO potential for unhandled rejection?
  (async () => {
    for (const stream of streams) {
      await stream.pipeTo(output.writable, { preventClose: true });
    }
    output.writable.close();
  })();

  return output.readable;
}
