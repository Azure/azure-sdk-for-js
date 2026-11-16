// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
import type { RetrieveStreamResponse } from "./models/models.js";
import { createSseError } from "./sseError.js";

export async function createSseStreamError(
  response: PathUncheckedResponse & RetrieveStreamResponse,
): Promise<Error> {
  if (!response.blobBody) {
    return createSseError(response);
  }

  return createSseError(response, await (await response.blobBody).text());
}
