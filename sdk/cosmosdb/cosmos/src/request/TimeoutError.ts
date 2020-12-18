// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * @hidden
 */
export const TimeoutErrorCode = "TimeoutError";

export class TimeoutError extends Error {
  public readonly code: string = TimeoutErrorCode;
  constructor(message?: string) {
    super(message);
    this.name = TimeoutErrorCode;
  }
}
