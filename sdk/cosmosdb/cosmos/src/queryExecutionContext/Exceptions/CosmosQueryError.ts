// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosHeaders } from "../CosmosHeaders.js";
import type { CosmosDiagnostics } from "../../CosmosDiagnostics.js";
import { ErrorResponse } from "../../request/ErrorResponse.js";
import { CosmosErrorCode } from "./CosmosErrorCode.js";

/**
 * Base class for all Cosmos SDK query execution errors.
 * Extends ErrorResponse with structured error codes for programmatic handling.
 */
export class CosmosQueryError extends ErrorResponse {
  /** Machine-readable error code for programmatic handling */
  public readonly errorCode: CosmosErrorCode;

  constructor(
    message: string,
    errorCode: CosmosErrorCode,
    options?: {
      code?: number | string;
      substatus?: number;
      headers?: CosmosHeaders;
      originalError?: Error;
      diagnostics?: CosmosDiagnostics;
    },
  ) {
    super(message);
    this.errorCode = errorCode;
    this.name = "CosmosQueryError";
    if (options) {
      this.code = options.code;
      this.substatus = options.substatus;
      this.headers = options.headers;
      this.diagnostics = options.diagnostics;
      if (options.originalError) {
        this.cause = options.originalError; // ES2022 Error.cause
      }
    }
  }
}
