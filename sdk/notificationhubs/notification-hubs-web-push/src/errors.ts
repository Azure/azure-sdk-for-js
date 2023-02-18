// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Represents a Notification Hubs Web Push error.
 */
export class WebPushError extends Error {
  /**
   * The HTTP status code from Notification Hubs.
   */
  public readonly status?: number;
  /**
   * The tracking ID from Notification Hubs.
   */
  public readonly trackingId?: string;
  /**
   * The correlation ID from Notification Hubs.
   */
  public readonly correlationId?: string;

  /**
   * Creates a new instance of the WebPushError class.
   * @param message - The error message.
   * @param options - The error options.
   */
  constructor(message: string, options: WebPushErrorOptions = {}) {
    super(message);
    this.name = "WebPushError";
    this.status = options.status;
    this.trackingId = options.trackingId;
    this.correlationId = options.correlationId;
    Object.setPrototypeOf(this, WebPushError.prototype);
  }
}

/**
 * The options for the @link WebPushError class.
 */
export interface WebPushErrorOptions {
  /**
   * The HTTP status code from Notification Hubs.
   */
  status?: number;
  /**
   * The tracking ID from Notification Hubs.
   */
  trackingId?: string;
  /**
   * The correlation ID from Notification Hubs.
   */
  correlationId?: string;
}
