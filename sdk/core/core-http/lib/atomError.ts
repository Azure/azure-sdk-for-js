// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Represents custom `Error` information returned by ATOM based services.
 */
export class AtomError extends Error {
  code?: string;
  statusCode?: number;
  additionalProperties?: any;
  requestId?: string;

  constructor(message: string) {
    super(message);
    this.additionalProperties = {};
    Object.setPrototypeOf(this, AtomError.prototype);
  }
}
