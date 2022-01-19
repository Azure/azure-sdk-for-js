// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventData } from "./eventData";

interface MessageWithMetadata {
  /**
   * The message's binary data
   */
  body: Uint8Array;
  /**
   * The message's content type
   */
  contentType: string;
}

interface MessageAdapter<MessageT> {
  /**
   * defines how to create a message from a payload and a content type
   */
  produceMessage: (messageWithMetadata: MessageWithMetadata) => MessageT;
  /**
   * defines how to access the payload and the content type of a message
   */
  consumeMessage: (message: MessageT) => MessageWithMetadata;
}

function isUint8Array(obj: any): obj is Uint8Array {
  return obj.constructor === Uint8Array;
}

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
    produceMessage: ({ body, contentType }: MessageWithMetadata) => {
      return {
        ...params,
        body,
        contentType,
      };
    },
    consumeMessage: (message: EventData): MessageWithMetadata => {
      const { body, contentType } = message;
      if (!isUint8Array(body)) {
        throw new Error("Expected the body field to defined and have a Uint8Array");
      }
      if (contentType === undefined) {
        throw new Error("Expected the contentType field to be defined");
      }
      return {
        body,
        contentType,
      };
    },
  };
}
