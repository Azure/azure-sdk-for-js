// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceSubmitBatchResponseModel } from "./generatedModels.js";

declare global {
  // Blob.text() is available at runtime in React Native (Hermes) but not in @types/react-native
  interface Blob {
    text(): Promise<string>;
  }
}

export async function getBodyAsText(
  batchResponse: ServiceSubmitBatchResponseModel,
): Promise<string> {
  const blobBodyResponse = await batchResponse.blobBody;
  if (!blobBodyResponse) {
    return "";
  }
  const blobString = await blobBodyResponse.text();
  return blobString;
}

export function utf8ByteLength(str: string): number {
  return new Blob([str]).size;
}
