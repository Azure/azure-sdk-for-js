// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CreateFileOptions } from "./file.js";
import { createRawFile } from "./file.js";

/**
 * Create an object that implements the File interface. This object is intended to be
 * passed into RequestBodyType.formData, and is not guaranteed to work as expected in
 * other situations.
 *
 * Use this function to create a File object for use in RequestBodyType.formData in environments
 * where the global File object is unavailable.
 *
 * @param content - the content of the file as a Uint8Array in memory.
 * @param name - the name of the file.
 * @param options - optional metadata about the file, e.g. file name, file size, MIME type.
 */
export function createFile(
  content: Uint8Array,
  name: string,
  options: CreateFileOptions = {},
): File {
  return createRawFile(content, name, options);
}
