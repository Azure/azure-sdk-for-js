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
  fileInput: any,
  defaultContentType?: string,
): any {
  if (fileInput.contents) {
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
