// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";

type SseResponse = Omit<PathUncheckedResponse, "body"> & { body?: unknown };

export function createSseError(response: SseResponse, bodyAsText?: string): Error {
  if (bodyAsText === undefined) {
    return createRestError({ ...response, body: response.body });
  }

  try {
    return createRestError({ ...response, body: JSON.parse(bodyAsText) });
  } catch {
    return createRestError(bodyAsText, { ...response, body: bodyAsText });
  }
}
