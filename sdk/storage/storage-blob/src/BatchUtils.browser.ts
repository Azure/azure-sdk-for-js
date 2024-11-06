// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceSubmitBatchResponseModel } from "./generatedModels";
import { blobToString } from "./utils/utils.browser";

export async function getBodyAsText(
  batchResponse: ServiceSubmitBatchResponseModel,
): Promise<string> {
  const blob = (await batchResponse.blobBody) as Blob;
  return blobToString(blob);
}

export function utf8ByteLength(str: string): number {
  return new Blob([str]).size;
}
