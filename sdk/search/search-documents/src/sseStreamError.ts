// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
import { Buffer } from "node:buffer";
import type { RetrieveStreamResponse } from "./models/models.js";
import { createSseError } from "./sseError.js";

export async function createSseStreamError(
  response: PathUncheckedResponse & RetrieveStreamResponse,
): Promise<Error> {
  if (!response.readableStreamBody) {
    return createSseError(response);
  }

  const chunks: Buffer[] = [];
  for await (const chunk of response.readableStreamBody) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return createSseError(response, Buffer.concat(chunks).toString("utf8"));
}
