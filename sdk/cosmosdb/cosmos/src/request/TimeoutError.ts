// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @hidden
 */
export const TimeoutErrorCode = "TimeoutError";

export class TimeoutError extends Error {
  public readonly code: string = TimeoutErrorCode;
  constructor(message: string = "Timeout Error") {
    super(message);
    this.name = TimeoutErrorCode;
  }
}
