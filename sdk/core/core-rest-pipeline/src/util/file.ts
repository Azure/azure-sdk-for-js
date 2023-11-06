// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isReadableStream } from "./typeGuards";
import { toWebStream } from "./stream";

export interface CreateFileFromStreamOptions {
  name?: string;
  type?: string;
  size?: number;
  lastModified?: number;
  webkitRelativePath?: string;
}

export interface CreateFileFromUint8ArrayOptions {
  name?: string;
  type?: string;
  lastModified?: number;
  webkitRelativePath?: string;
}

/**
 * Create an object that implements the File interface. This object is intended to be
 * passed into RequestBodyType.formData, and is not guaranteed to work as expected in
 * other situations.
 *
 * Use this function to:
 * - Create a File object for use in RequestBodyType.formData in environments where the
 *   global File object is unavailable.
 * - Create a File-like object from a readable stream without reading the stream into memory.
 *
 * @param content - the content of the file as a stream. When a File object made using createFile is
 *                  passed in a request's form data map, the stream will not be read into memory
 *                  and instead will be streamed when the request is made.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */
export function createFile(
  content: ReadableStream<Uint8Array> | NodeJS.ReadableStream,
  options?: CreateFileFromStreamOptions
): File;

/**
 * Create an object that implements the File interface. This object is intended to be
 * passed into RequestBodyType.formData, and is not guaranteed to work as expected in
 * other situations.
 *
 * Use this function create a File object for use in RequestBodyType.formData in environments where the
 *
 * @param content - the content of the file as a Uint8Array in memory.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */
export function createFile(content: Uint8Array, options?: CreateFileFromUint8ArrayOptions): File;

export function createFile(
  content: NodeJS.ReadableStream | ReadableStream<Uint8Array> | Uint8Array,
  options: CreateFileFromStreamOptions | CreateFileFromUint8ArrayOptions = {}
): File {
  const commonFields = {
    type: options.type ?? "application/octet-stream",
    name: options.name ?? "",
    lastModified: options.lastModified ?? new Date().getTime(),
    webkitRelativePath: options.webkitRelativePath ?? "",
    size: (options as CreateFileFromStreamOptions).size ?? -1, // don't actually know the size
    arrayBuffer: async () => {
      throw new Error("Not implemented");
    },
    slice: () => {
      throw new Error("Not implemented");
    },
    text: async (): Promise<string> => {
      throw new Error("Not implemented");
    },
  };

  if (isReadableStream(content)) {
    return {
      ...commonFields,
      stream: () => toWebStream(content),
    };
  } else {
    return {
      ...commonFields,
      size: content.byteLength,
      arrayBuffer: async () => content.buffer,
      stream: () => new Blob([content]).stream(),
    };
  }
}
