// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
 * MessageAdapter is an interface that converts to/from a concrete message type
 * to a message with metadata
 */
export interface MessageAdapter<MessageT> {
  /**
   * defines how to create a message from a payload and a content type
   */
  produceMessage: (messageWithMetadata: MessageWithMetadata) => MessageT;
  /**
   * defines how to access the payload and the content type of a message
   */
  consumeMessage: (message: MessageT) => MessageWithMetadata;
}

/**
 * Options for Schema
 */
export interface AvroSerializerOptions<MessageT> {
  /**
   * When true, register new schemas passed to serializeMessageData. Otherwise, and by
   * default, fail if schema has not already been registered.
   *
   * Automatic schema registration is NOT recommended for production scenarios.
   */
  autoRegisterSchemas?: boolean;
  /**
   * The group name to be used when registering/looking up a schema. Must be specified
   * if `serializeMessageData` will be called.
   */
  groupName?: string;
  /**
   * Message Adapter enables the serializer to produce and consume custom messages.
   */
  messageAdapter?: MessageAdapter<MessageT>;
}

/**
 * The options to the deserializeMessageData method.
 */
export interface DeserializeMessageDataOptions {
  /**
   * The schema to be used for deserializing.
   */
  schema?: string;
}

/**
 * A custom error type for failed Avro serialization/deserialization.
 */
export class AvroSerializationError extends Error {
  /**
   * The inner exception that was thrown by the Avro implementation.
   */
  public innerError?: unknown;

  constructor(message: string, innerError?: unknown) {
    super(message);
    this.innerError = innerError;
    this.name = "AvroSerializationError";

    Object.setPrototypeOf(this, AvroSerializationError.prototype);
  }
}
