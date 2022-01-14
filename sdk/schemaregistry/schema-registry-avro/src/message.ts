// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Message factory to be used to create a custom message.
 */
export interface MessageFactory<MessageT> {
  /**
   * Creates a message from the avro-encoded payload and content type
   */
  createMessage: (binaryData: Uint8Array, contentType: string) => MessageT;
}

/**
 * Message consumer to be used to extract the payload and content type from a
 * custom message.
 */
export interface MessageConsumer<MessageT> {
  /**
   * Extracts the payload from a message.
   */
  getPayload: (message: MessageT) => any;
  /**
   * Extracts the content type from a message.
   */
  getContentType: (message: MessageT) => string;
}
