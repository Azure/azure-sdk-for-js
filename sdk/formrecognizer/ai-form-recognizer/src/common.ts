// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineOptions, OperationOptions } from "@azure/core-http";
import { FormRecognizerRequestBody } from "./models";
import { SourcePath } from "./generated/models";
import { getFirstFourBytesFromBlob, streamToBuffer } from "./utils/utils.node";
import { MAX_INPUT_DOCUMENT_SIZE } from "./constants";

/**
 * Content types supported by Form Recognizer service.
 */
export type FormContentType = "application/pdf" | "image/jpeg" | "image/png" | "image/tiff";

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
export async function toRequestBody(
  body: FormRecognizerRequestBody | string
): Promise<Blob | ArrayBuffer | ArrayBufferView | SourcePath> {
  if (typeof body === "string") {
    return {
      source: body
    };
  } else {
    // cache stream to allow retry
    if (isReadableStream(body)) {
      return streamToBuffer(body, MAX_INPUT_DOCUMENT_SIZE);
    }

    return body;
  }
}

function isReadableStream(data: FormRecognizerRequestBody): data is NodeJS.ReadableStream {
  return "read" in data && typeof data.read === "function";
}

function isBlob(data: FormRecognizerRequestBody): data is Blob {
  return "size" in data && "type" in data;
}

function isArrayBuffer(data: FormRecognizerRequestBody): data is ArrayBuffer {
  return "byteLength" in data && "slice" in data && typeof data.slice === "function";
}

function isArrayBufferView(data: FormRecognizerRequestBody): data is ArrayBufferView {
  return "buffer" in data && "byteLength" in data && "byteOffset" in data;
}

function isSourcePath(data: FormRecognizerRequestBody | SourcePath): data is SourcePath {
  return "source" in data && typeof data.source === "string";
}

/**
 * Detects the content type of binary data.
 * See https://en.wikipedia.org/wiki/List_of_file_signatures
 * @internal
 */
export async function getContentType(
  data: Blob | ArrayBuffer | ArrayBufferView | SourcePath
): Promise<FormContentType | undefined> {
  if (isSourcePath(data)) {
    return undefined;
  }
  let bytes: Uint8Array;
  if (isArrayBuffer(data)) {
    // ArrayBuffer
    if (data.byteLength < 4) {
      throw new RangeError("Invalid input. Expect more than 4 bytes of data");
    }

    bytes = new Uint8Array(data, 0, 4);
  } else if (isArrayBufferView(data)) {
    // ArrayBufferView
    if (data.byteLength < 4) {
      throw new RangeError("Invalid input. Expect more than 4 bytes of data");
    }

    bytes = new Uint8Array(data.buffer, 0, 4);
  } else if (isBlob(data)) {
    // Blob
    bytes = await getFirstFourBytesFromBlob(data);
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
