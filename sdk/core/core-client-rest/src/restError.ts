// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RestError } from "@azure/core-rest-pipeline";
import type { PathUncheckedResponse } from "./common.js";

import {
  createRestError as tspCreateRestError,
  type PathUncheckedResponse as TspPathUncheckedResponse,
} from "@typespec/ts-http-runtime";

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
  if (typeof messageOrResponse === "string") {
    return tspCreateRestError(messageOrResponse, response! as TspPathUncheckedResponse);
  } else {
    return tspCreateRestError(messageOrResponse as TspPathUncheckedResponse);
  }
}
