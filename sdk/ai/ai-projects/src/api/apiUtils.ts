// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import { apiErrorResponseDeserializer } from "../models/models.js";

/**
 * Throws a RestError if the response status is not in expectedStatuses.
 * Attaches parsed error details from the response body when available.
 */
export function throwIfNotExpected(
  result: PathUncheckedResponse,
  expectedStatuses: string[],
): void {
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const errorBody = result["body"]?.["error"];
    error.details =
      typeof errorBody === "object" && errorBody !== null
        ? apiErrorResponseDeserializer(result.body)
        : undefined;
    throw error;
  }
}
