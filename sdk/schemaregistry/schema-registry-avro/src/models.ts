// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A message that contains binary data and a content type.
 */
export interface MessageWithMetadata {
  /**
   * The message's binary data
   */
  data: Uint8Array;
  /**
   * The message's content type
   */
  contentType: string;
}

/**
 * A message that contains readonly data and content type
 */
export interface ReadOnlyMessageWithMetadata {
  /**
   * The message's binary data
   */
  readonly data: Uint8Array;
  /**
   * The message's content type
   */
  readonly contentType: string;
}

/**
 * A message that can be sent to Azure Service Bus.
 */
export interface ServiceBusMessage extends MessageWithMetadata {}

/**
 * A message that can be received from Azure Service Bus.
 */
export interface ServiceBusReceivedMessage extends ReadOnlyMessageWithMetadata {}

/**
 * A message that can be used with Azure Event Hubs
 */
export interface EventData extends MessageWithMetadata {}

/**
 * An encoder interface that suppors encoding and decoding operations on messages
 * with binary data and content type.
 */
export interface AvroSchemaRegistryEncoder {
  /**
   * it encodes the value parameter according to the input schema and creates a message
   * with the encoded data as the body.
   */
  encodeBody: (value: unknown, schema: string) => Promise<MessageWithMetadata>;
  /**
   * it decodes the body of the message based on its content type if no schema was
   * provided
   */
  decodeBody: (message: MessageWithMetadata, schema?: string) => Promise<unknown>;
}
