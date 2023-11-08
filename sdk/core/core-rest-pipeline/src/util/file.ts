// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { toWebStream } from "./stream";

/**
 * Options passed into createFile specifying metadata about the file.
 */
export interface CreateFileOptions {
  /**
   * The MIME type of the file.
   */
  type?: string;

  /**
   * Last modified time of the file as a UNIX timestamp.
   * This will default to the current date.
   */
  lastModified?: number;

  /**
   * relative path of this file when uploading a directory.
   */
  webkitRelativePath?: string;
}

/**
 * Extra options for createFile when a stream is being passed in.
 */
export interface CreateFileFromStreamOptions extends CreateFileOptions {
  /**
   * Size of the file represented by the stream in bytes.
   *
   * This will be used by the pipeline when calculating the Content-Length header
   * for the overall request.
   */
  size?: number;
}

const unimplementedMethods = {
  arrayBuffer: () => {
    throw new Error("Not implemented");
  },
  slice: () => {
    throw new Error("Not implemented");
  },
  text: () => {
    throw new Error("Not implemented");
  },
};

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
 * @param stream - the content of the file as a callback returning a stream. When a File object made using createFile is
 *                  passed in a request's form data map, the stream will not be read into memory
 *                  and instead will be streamed when the request is made. In the event of a retry, the
 *                  stream needs to be read again, so this callback SHOULD return a fresh stream if possible.
 * @param name - the name of the file.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */
export function createFileFromStream(
  stream: () => ReadableStream<Uint8Array> | NodeJS.ReadableStream,
  name: string,
  options: CreateFileFromStreamOptions = {}
): File {
  return {
    ...unimplementedMethods,
    type: options.type ?? "",
    lastModified: options.lastModified ?? new Date().getTime(),
    webkitRelativePath: options.webkitRelativePath ?? "",
    size: options.size ?? -1,
    name,
    stream: () => toWebStream(stream()),
  };
}

/**
 * Create an object that implements the File interface. This object is intended to be
 * passed into RequestBodyType.formData, and is not guaranteed to work as expected in
 * other situations.
 *
 * Use this function create a File object for use in RequestBodyType.formData in environments where the
 *
 * @param content - the content of the file as a Uint8Array in memory.
 * @param name - the name of the file.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */
export function createFile(
  content: Uint8Array,
  name: string,
  options: CreateFileOptions = {}
): File {
  return {
    ...unimplementedMethods,
    type: options.type ?? "",
    lastModified: options.lastModified ?? new Date().getTime(),
    webkitRelativePath: options.webkitRelativePath ?? "",
    size: content.byteLength,
    name,
    arrayBuffer: async () => content.buffer,
    stream: () => new Blob([content]).stream(),
  };
}
