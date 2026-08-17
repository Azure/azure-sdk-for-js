// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

<<<<<<< /tmp/azsdk-dev-toolnFGKkd/result/src/static-helpers/multipartHelpers.ts
import { NodeReadableStream } from "@azure/core-rest-pipeline";
||||||| /tmp/azsdk-dev-toolnFGKkd/base/sdk/ai/ai-projects/generated/static-helpers/multipartHelpers.ts
import { NodeReadableStream } from "#platform/static-helpers/platform-types";
=======
import type { NodeReadableStream } from "#platform/static-helpers/platform-types";
>>>>>>> /tmp/azsdk-dev-toolnFGKkd/custom/sdk/ai/ai-projects/src/static-helpers/multipartHelpers.ts

/**
 * Valid values for the contents of a binary file.
 */
export type FileContents =
  string | NodeReadableStream | ReadableStream<Uint8Array> | Uint8Array | Blob;

type FilePartInput =
  | FileContents
  | {
      contents: FileContents;
      contentType?: string;
      filename?: string;
    }
  | null
  | undefined;

export function createFilePartDescriptor(
  partName: string,
  fileInput: FilePartInput,
  defaultContentType?: string,
): {
  name: string;
  body: FileContents | null | undefined;
  contentType?: string;
  filename?: string;
} {
  if (fileInput != null && typeof fileInput === "object" && "contents" in fileInput) {
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
