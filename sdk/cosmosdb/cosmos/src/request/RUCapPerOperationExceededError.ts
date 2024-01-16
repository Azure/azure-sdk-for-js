// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ErrorResponse } from "./ErrorResponse";
/**
 * @hidden
 */
export const RUCapPerOperationExceededErrorCode = "OPERATION_RU_LIMIT_EXCEEDED";

export class RUCapPerOperationExceededError extends ErrorResponse {
  readonly code: string = RUCapPerOperationExceededErrorCode;
  public fetchedResults: unknown[];
  constructor(
    message: string = "Request Unit limit per Operation call exceeded",
    fetchedResults: unknown[] = []
  ) {
    super(message);
    this.code = RUCapPerOperationExceededErrorCode;
    this.body = {
      code: RUCapPerOperationExceededErrorCode,
      message,
    };
    this.fetchedResults = fetchedResults;
  }
}
