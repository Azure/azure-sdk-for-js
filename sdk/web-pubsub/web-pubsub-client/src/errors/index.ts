// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AckMessageError } from "../models/messages";

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
