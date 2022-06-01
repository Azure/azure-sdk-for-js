// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData } from "./eventData";

/**
 * A message with payload and content type fields
 *
 * This interface is hidden because it is already exported by `@azure/schema-registry-avro`
 *
 * @hidden
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
 * A message adapter interface that specifies methods for producing and consuming
 * messages with payloads and content type fields.
 *
 * This interface is hidden because it is already exported by `@azure/schema-registry-avro`
 *
 * @hidden
 */
export interface MessageAdapter<MessageT> {
  /**
   * defines how to create a message from a payload and a content type
   */
  produce: (MessageContent: MessageContent) => MessageT;
  /**
   * defines how to access the payload and the content type of a message
   */
  consume: (message: MessageT) => MessageContent;
}

// This type should always be equivalent to Omit<Omit<EventData, "body">, "contentType">
/**
 * Parameters to the `createEventDataAdapter` function that creates an event data adapter.
 */
export interface EventDataAdapterParameters {
  /**
   * The correlation identifier that allows an
   * application to specify a context for the message for the purposes of correlation, for example
   * reflecting the MessageId of a message that is being replied to.
   */
  correlationId?: string | number | Buffer;

  /**
   * The message identifier is an
   * application-defined value that uniquely identifies the message and its payload.
   *
   * Note: Numbers that are not whole integers are not allowed.
   */
  messageId?: string | number | Buffer;

  /**
   * Set of key value pairs that can be used to set properties specific to user application.
   */
  properties?: {
    [key: string]: any;
  };
}

/**
 * A function that constructs an event data adapter. That adapter can be used
 * with `@azure/schema-registry-avro` to encode and decode body in event data.
 *
 * @param params - parameters to create the event data
 * @returns An event data adapter that can produce and consume event data
 */
export function createEventDataAdapter(
  params: EventDataAdapterParameters = {}
): MessageAdapter<EventData> {
  return {
    produce: ({ data: body, contentType }: MessageContent) => {
      return {
        ...params,
        body,
        contentType,
      };
    },
    consume: (message: EventData): MessageContent => {
      const { body, contentType } = message;
      if (body === undefined) {
        throw new Error("Expected the body field to be defined");
      }
      if (contentType === undefined) {
        throw new Error("Expected the contentType field to be defined");
      }
      return {
        /**
         * If the raw response was parsed as JSON, we need to convert it to a Uint8Array,
         * otherwise, leave the payload as is.
         */
        data: typeof body === "object" ? Uint8Array.from(Object.values(body)) : body,
        contentType,
      };
    },
  };
}
