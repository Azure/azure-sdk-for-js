// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceSubmitBatchResponseModel } from "./generatedModels.js";

export async function getBodyAsText(
  batchResponse: ServiceSubmitBatchResponseModel,
): Promise<string> {
  const blobBodyResponse = await batchResponse.blobBody;
  if (!blobBodyResponse) {
    return "";
  }
  return blobBodyResponse.text();
}
