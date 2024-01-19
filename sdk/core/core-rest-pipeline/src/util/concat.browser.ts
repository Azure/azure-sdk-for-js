// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isWebReadableStream } from "./typeGuards";

/**
 * Drain the content of the given ReadableStream into a Blob.
 * The blob's content may end up in memory or on disk dependent on size.
 */
function drain(stream: ReadableStream<Uint8Array>): Promise<Blob> {
  return new Response(stream).blob();
}

async function toBlobPart(
  source: ReadableStream<Uint8Array> | Blob | Uint8Array,
): Promise<BlobPart> {
  // check for fake files made using createFileFromStream and deal with them
  if (!(source instanceof Blob) && typeof (source as any).stream === "function") {
    return drain((source as any).stream());
  } else if (isWebReadableStream(source)) {
    return drain(source);
  } else {
    return source;
  }
}

type ConcatSource = ReadableStream<Uint8Array> | Blob | Uint8Array;

export async function concat(sources: (ConcatSource | (() => ConcatSource))[]): Promise<Blob> {
  const parts = [];
  for (const source of sources) {
    parts.push(await toBlobPart(typeof source === "function" ? source() : source));
  }

  return new Blob(parts);
}
