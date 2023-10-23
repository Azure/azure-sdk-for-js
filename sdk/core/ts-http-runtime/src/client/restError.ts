// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse } from "../interfaces";
import { RestError } from "../restError";
import { createHttpHeaders } from "../httpHeaders";
import { PathUncheckedResponse } from "./common";

/**
 * Creates a rest error from a PathUnchecked response
 */
export function createRestError(message: string, response: PathUncheckedResponse): RestError {
  return new RestError(message, {
    statusCode: statusCodeToNumber(response.status),
    request: response.request,
    response: toPipelineResponse(response),
  });
}

function toPipelineResponse(response: PathUncheckedResponse): PipelineResponse {
  return {
    headers: createHttpHeaders(response.headers),
    request: response.request,
    status: statusCodeToNumber(response.status) ?? -1,
  };
}

function statusCodeToNumber(statusCode: string): number | undefined {
  const status = Number.parseInt(statusCode);

  return Number.isNaN(status) ? undefined : status;
}
