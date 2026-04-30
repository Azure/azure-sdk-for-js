// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Valid values for the contents of a binary file.
 */
export type FileContents =
  | string
  | NodeJS.ReadableStream
  | ReadableStream<Uint8Array>
  | Uint8Array
  | Blob;

export function createFilePartDescriptor(
  partName: string,
  fileInput: FileContents | { contents: FileContents; contentType?: string; filename?: string },
  defaultContentType?: string,
): { name: string; body: FileContents; contentType?: string; filename?: string } {
  if (typeof fileInput === "object" && fileInput !== null && "contents" in fileInput) {
    return {
      name: partName,
      body: fileInput.contents,
      contentType: fileInput.contentType ?? defaultContentType,
      filename: fileInput.filename,
    };
  } else {
    return {
      name: partName,
      body: fileInput,
      contentType: defaultContentType,
    };
  }
}
