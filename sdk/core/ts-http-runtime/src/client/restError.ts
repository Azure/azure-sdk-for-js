// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineResponse } from "../interfaces.js";
import { RestError } from "../restError.js";
import { createHttpHeaders } from "../httpHeaders.js";
import type { PathUncheckedResponse } from "./common.js";

/**
 * Creates a rest error from a PathUnchecked response
 */
export function createRestError(response: PathUncheckedResponse): RestError;
/**
 * Creates a rest error from an error message and a PathUnchecked response
 */
export function createRestError(message: string, response: PathUncheckedResponse): RestError;
export function createRestError(
  messageOrResponse: string | PathUncheckedResponse,
  response?: PathUncheckedResponse,
): RestError {
  const resp = typeof messageOrResponse === "string" ? response! : messageOrResponse;
  const internalError = resp.body?.error ?? resp.body;
  const message =
    typeof messageOrResponse === "string"
      ? messageOrResponse
      : (internalError?.message ?? `Unexpected status code: ${resp.status}`);
  return new RestError(message, {
    statusCode: statusCodeToNumber(resp.status),
    code: internalError?.code,
    request: resp.request,
    response: toPipelineResponse(resp),
  });
}

function toPipelineResponse(errorResponse: PathUncheckedResponse): PipelineResponse {
  return {
    headers: createHttpHeaders(errorResponse.headers),
    request: errorResponse.request,
    status: statusCodeToNumber(errorResponse.status) ?? -1,
    ...(typeof errorResponse.body === "string" ? { bodyAsText: errorResponse.body } : {}),
  };
}

function statusCodeToNumber(statusCode: string): number | undefined {
  const status = Number.parseInt(statusCode);

  return Number.isNaN(status) ? undefined : status;
}
