// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PipelineRequest, PipelineResponse } from "./interfaces.js";

import type { RestErrorOptions as TspRestErrorOptions } from "@typespec/ts-http-runtime";
import {
  RestError as TspRestError,
  isRestError as tspIsRestError,
} from "@typespec/ts-http-runtime";

/**
 * The options supported by RestError.
 */
export interface RestErrorOptions {
  /**
   * The code of the error itself (use statics on RestError if possible.)
   */
  code?: string;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  statusCode?: number;
  /**
   * The request that was made.
   */
  request?: PipelineRequest;
  /**
   * The response received (if any.)
   */
  response?: PipelineResponse;
}

/**
 * A custom error type for failed pipeline requests.
 */
export class RestError extends Error {
  /**
   * Something went wrong when making the request.
   * This means the actual request failed for some reason,
   * such as a DNS issue or the connection being lost.
   */
  static readonly REQUEST_SEND_ERROR: string = "REQUEST_SEND_ERROR";
  /**
   * This means that parsing the response from the server failed.
   * It may have been malformed.
   */
  static readonly PARSE_ERROR: string = "PARSE_ERROR";

  /**
   * The code of the error itself (use statics on RestError if possible.)
   */
  public code?: string;
  /**
   * The HTTP status code of the request (if applicable.)
   */
  public statusCode?: number;
  /**
   * The request that was made.
   * This property is non-enumerable.
   */
  public request?: PipelineRequest;
  /**
   * The response received (if any.)
   * This property is non-enumerable.
   */
  public response?: PipelineResponse;
  /**
   * Bonus property set by the throw site.
   */
  public details?: unknown;

  constructor(message: string, options: RestErrorOptions = {}) {
    super(message);

    // what is this??
    // it turns out that you can return from a constructor and it causes
    // calling `new` to return the value you return.
    // this lets us wrap the TypeSpec RestError so that calling this constructor will give you the same type of object as calling the TypeSpec one,
    // even though the constructor signatures (through RestErrorOptions) are slightly different.
    return new TspRestError(message, options as TspRestErrorOptions);
  }
}

/**
 * Typeguard for RestError
 * @param e - Something caught by a catch clause.
 */
export function isRestError(e: unknown): e is RestError {
  return tspIsRestError(e);
}
