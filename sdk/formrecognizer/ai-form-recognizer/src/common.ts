// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, OperationOptions, HttpRequestBody } from "@azure/core-http";
import { FormRecognizerRequestBody } from "./models";
import { ContentType, SourcePath } from "./generated/models";

/**
 * Client options used to configure Form Recognizer API requests.
 */
export interface FormRecognizerClientOptions extends PipelineOptions {}

/**
 * Options common to all form recognizer operations.
 */
export interface FormRecognizerOperationOptions extends OperationOptions {}

/**
 * Translate the content to a format that is understood by Form Recognizer service
 * @internal
 */
export function toRequestBody(body: FormRecognizerRequestBody): HttpRequestBody | SourcePath {
  if (typeof body === "string") {
    return {
      source: body
    };
  } else {
    // conform to HttpRequestBody
    return (body as any)?.read && typeof ((body as any)?.read === "function")
      ? () => body as NodeJS.ReadableStream
      : (body as HttpRequestBody);
  }
}

export async function getContentType(
  data: FormRecognizerRequestBody | string
): Promise<ContentType | undefined> {
  if (typeof data === "string") {
    return undefined;
  }
  let bytes: Uint8Array;
  const dataAny = data as any;
  if (dataAny?.read && typeof (dataAny?.read === "function")) {
    // readable stream
    throw new Error("not yet supported");
  } else if (dataAny?.size && dataAny?.type) {
    // Blob
    const arrayPromise = new Promise<ArrayBuffer>(function(resolve) {
      var reader = new FileReader();

      reader.onloadend = function() {
        resolve(reader.result as ArrayBuffer);
      };

      reader.readAsArrayBuffer(data as Blob);
    });

    const buffer = await arrayPromise;
    bytes = new Uint8Array(buffer, 0, 4);
  } else if (dataAny?.byteLength && dataAny?.slice && typeof dataAny!.slice === "function") {
    // ArrayBuffer
    if ((data as ArrayBuffer).byteLength < 4) {
      throw new RangeError("Invalid input. Expect more than 4 bytes of data");
    }

    bytes = new Uint8Array(data as ArrayBuffer, 0, 4);
  } else if (dataAny?.buffer && dataAny?.byteLength && dataAny?.byteOffset) {
    // ArrayBufferView
    if ((data as ArrayBufferView).byteLength < 4) {
      throw new RangeError("Invalid input. Expect more than 4 bytes of data");
    }

    bytes = new Uint8Array((data as ArrayBufferView).buffer, 0, 4);
  } else {
    throw new Error("unsupported request body type");
  }

  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  } else if (bytes[0] === 0xff && bytes[1] === 0xd8) {
    return "image/jpeg";
  } else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "image/png";
  } else if (
    (bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2a && bytes[3] === 0x0) ||
    (bytes[0] === 0x4d && bytes[1] === 0x4d && bytes[2] === 0x0 && bytes[3] === 0x2a)
  ) {
    return "image/tiff";
  } else {
    throw new RangeError("content type could not be detected");
  }
}
