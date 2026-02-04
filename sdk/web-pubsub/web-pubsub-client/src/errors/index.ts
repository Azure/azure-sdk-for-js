// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AckMessageError, InvokeResponseError } from "../models/messages.js";

/**
 * Error when sending message failed
 */
export class SendMessageError extends Error {
  /**
   * Error name
   */
  public name: string;
  /**
   * The ack id of the message
   */
  public ackId?: number;
  /**
   * The error details from the service
   */
  public errorDetail?: AckMessageError;
  /**
   * Initialize a SendMessageError
   * @param message - The error message
   * @param ackMessage - The ack message
   */
  constructor(message: string, options: SendMessageErrorOptions) {
    super(message);
    this.name = "SendMessageError";
    this.ackId = options.ackId;
    this.errorDetail = options.errorDetail;
  }
}

export interface SendMessageErrorOptions {
  /**
   * The ack id of the message
   */
  ackId?: number;
  /**
   * The error details from the service
   */
  errorDetail?: AckMessageError;
}

export interface InvocationErrorOptions {
  /**
   * The invocation id of the request.
   */
  invocationId: string;
  /**
   * Error details from the service if available.
   */
  errorDetail?: InvokeResponseError;
}

/**
 * Error thrown when an invocation fails or is cancelled.
 */
export class InvocationError extends Error {
  /**
   * The invocation id of the request.
   */
  public invocationId: string;
  /**
   * Error details from the service if available.
   */
  public errorDetail?: InvokeResponseError;

  constructor(message: string, options: InvocationErrorOptions) {
    super(message);
    this.name = "InvocationError";
    this.invocationId = options.invocationId;
    this.errorDetail = options.errorDetail;
  }
}
