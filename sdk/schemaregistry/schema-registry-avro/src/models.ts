// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A message that contains binary data and a content type.
 */
export interface MessageContent {
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
 * MessageAdapter is an interface that converts to/from a concrete message type
 * to a MessageContent
 */
export interface MessageAdapter<MessageT> {
  /**
   * defines how to create a message from a payload and a content type
   */
  produce: (messageContent: MessageContent) => MessageT;
  /**
   * defines how to access the payload and the content type of a message
   */
  consume: (message: MessageT) => MessageContent;
}

/**
 * Options for Schema
 */
export interface AvroSerializerOptions<MessageT> {
  /**
   * When true, register new schemas passed to serialize. Otherwise, and by
   * default, fail if schema has not already been registered.
   *
   * Automatic schema registration is NOT recommended for production scenarios.
   */
  autoRegisterSchemas?: boolean;
  /**
   * The group name to be used when registering/looking up a schema. Must be specified
   * if `serialize` will be called.
   */
  groupName?: string;
  /**
   * Message Adapter enables the serializer to produce and consume custom messages.
   */
  messageAdapter?: MessageAdapter<MessageT>;
}

/**
 * The options to the deserialize method.
 */
export interface DeserializeOptions {
  /**
   * The schema to be used for deserializing.
   */
  schema?: string;
}
