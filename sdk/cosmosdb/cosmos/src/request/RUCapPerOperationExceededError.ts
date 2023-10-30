// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @hidden
 */

import { ErrorResponse } from "./ErrorResponse";

export const RUCapPerOperationExceededErrorCode = "OPERATION_RU_LIMIT_EXCEEDED";

export class RUCapPerOperationExceededError extends ErrorResponse {
  readonly code: string = RUCapPerOperationExceededErrorCode;
  constructor(
    message: string = "Request Unit limit per Operation call exceeded",
    fetchedSoFarResults?: any[]
  ) {
    super(message);
    this.code = RUCapPerOperationExceededErrorCode;
    this.body = {
      code: RUCapPerOperationExceededErrorCode,
      message,
      fetchedSoFarResults: fetchedSoFarResults,
    };
  }
}
