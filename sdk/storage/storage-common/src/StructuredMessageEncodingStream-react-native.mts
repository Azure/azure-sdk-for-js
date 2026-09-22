// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// React Native implementation using buffered encoding.
// This avoids streaming API type conflicts while providing full functionality.
//
// Note: For very large uploads, the streaming implementations in Node.js and
// browsers are more memory efficient. This buffered approach is suitable for
// typical mobile upload sizes.

import type { RequestBodyType as HttpRequestBody } from "@azure/core-rest-pipeline";
import { StructuredMessageEncoding } from "./StructuredMessageEncoding.js";

/**
 * Encodes the request body with structured message format for CRC64 validation.
 * Uses a buffered approach suitable for React Native environments.
 */
export async function structuredMessageEncoding(
  source: HttpRequestBody,
  contentLength: number,
): Promise<{ body: HttpRequestBody; encodedContentLength: number }> {
  if (source === null) {
    return {
      body: source,
      encodedContentLength: contentLength,
    };
  }

  // Convert source to Uint8Array
  const data = await toUint8Array(source);

  // Use the existing encoder, collecting outputs into a buffer
  const chunks: Uint8Array[] = [];
  const encoder = new StructuredMessageEncoding((chunk) => chunks.push(chunk), data.length);
  encoder.sourceDataHandler(data);

  // Concatenate all chunks into final result
  const encoded = concatenateUint8Arrays(chunks, encoder.messageLength);

  return {
    body: encoded,
    encodedContentLength: encoded.length,
  };
}

function concatenateUint8Arrays(arrays: Uint8Array[], totalLength: number): Uint8Array {
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

async function toUint8Array(source: HttpRequestBody): Promise<Uint8Array> {
  if (source instanceof Uint8Array) {
    return source;
  }

  if (source instanceof ArrayBuffer) {
    return new Uint8Array(source);
  }

  if (ArrayBuffer.isView(source)) {
    return new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
  }

  if (typeof source === "string") {
    return new TextEncoder().encode(source);
  }

  if (source instanceof Blob) {
    const arrayBuffer = await source.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

  throw new Error("The specified request body type is not supported for CRC64 checksum");
}
