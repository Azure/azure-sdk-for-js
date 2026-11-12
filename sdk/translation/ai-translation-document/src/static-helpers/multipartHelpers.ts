// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NodeReadableStream } from "#platform/static-helpers/platform-types";

/**
 * Valid values for the contents of a binary file.
 */
export type FileContents =
  string | NodeReadableStream | ReadableStream<Uint8Array> | Uint8Array | Blob;

interface FilePartDescriptor {
  contents: FileContents;
  contentType?: string;
  filename?: string;
}

export function createFilePartDescriptor(
  partName: string,
  fileInput: unknown,
  defaultContentType?: string,
): {
  name: string;
  body: unknown;
  contentType?: string;
  filename?: string;
} {
  if (fileInput != null && typeof fileInput === "object" && "contents" in fileInput) {
    const descriptor = fileInput as FilePartDescriptor;
    return {
      name: partName,
      body: descriptor.contents,
      contentType: descriptor.contentType ?? defaultContentType,
      filename: descriptor.filename,
    };
  } else {
    return {
      name: partName,
      body: fileInput,
      contentType: defaultContentType,
    };
  }
}
