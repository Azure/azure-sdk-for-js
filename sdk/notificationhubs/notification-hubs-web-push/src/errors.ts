// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class WebPushError extends Error {
  public readonly status?: number;
  public readonly trackingId?: string;
  public readonly correlationId?: string;

  constructor(message: string, options: WebPushErrorOptions = {}) {
    super(message);
    this.name = "WebPushError";
    this.status = options.status;
    this.trackingId = options.trackingId;
    this.correlationId = options.correlationId;
    Object.setPrototypeOf(this, WebPushError.prototype);
  }
}

export interface WebPushErrorOptions {
  status?: number;
  trackingId?: string;
  correlationId?: string;
}
