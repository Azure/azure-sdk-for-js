// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessageConsumer, MessageFactory } from "./message";

/**
 * A message that contains binary data and a content type.
 */
export interface MessageWithMetadata {
  /**
   * The message's binary data
   */
  body: Uint8Array;
  /**
   * The message's content type
   */
  contentType: string;
}

/**
 * The options to the decodeMessageData method.
 */
export interface DecodeMessageDataOptions<MessageT> {
  /**
   * The schema to be used for decoding.
   */
  schema?: string;
  /**
   * An object that defines how to access the payload and the content type of a message
   */
  messageConsumer?: MessageConsumer<MessageT>;
}

/**
 * The options to the encodeMessageData method.
 */
export interface EncodeMessageDataOptions<MessageT> {
  /**
   * An object that defines how to create a message from a payload and a content type
   */
  messageFactory?: MessageFactory<MessageT>;
}
