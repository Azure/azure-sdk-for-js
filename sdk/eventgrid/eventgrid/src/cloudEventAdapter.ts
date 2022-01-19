// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SendCloudEventInput } from "./models";

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

type EncodedCloudEvent = SendCloudEventInput<Uint8Array>;

function isUint8Array(obj: any): obj is Uint8Array {
  return obj.constructor === Uint8Array;
}

/**
 * Parameters to the `createCloudEventAdapter` function that creates a cloud event adapter.
 */
export interface CloudEventAdapterParameters {
  /**
   * Type of event related to the originating occurrence.
   */
  type: string;
  /**
   * Identifies the context in which an event happened. The combination of id and source must be unique for each distinct event.
   */
  source: string;
  /**
   * An identifier for the event. The combination of id and source must be unique for each distinct event. If an ID is not provided,
   * a random UUID will be generated and used.
   */
  id?: string;
  /**
   * The time the event was generated. If not provided, the current time will be used.
   */
  time?: Date;
  /**
   * Identifies the schema that data adheres to.
   */
  dataschema?: string;
  /**
   * This describes the subject of the event in the context of the event producer (identified by source).
   */
  subject?: string;
  /**
   * Additional context attributes for the event. The Cloud Event specification refers to these as "extension attributes".
   */
  extensionAttributes?: Record<string, unknown>;
}

/**
 * A function that constructs a cloud event adapter. That adapter can be used
 * with `@azure/schema-registry-avro` to encode and decode data in cloud events.
 *
 * @param params - parameters to create the cloud event
 * @returns A cloud event adapter that can produce and consume cloud events
 */
export function createCloudEventAdapter(
  params: CloudEventAdapterParameters
): MessageAdapter<EncodedCloudEvent> {
  return {
    produceMessage: ({ body, contentType }: MessageWithMetadata) => {
      return {
        ...params,
        data: body,
        datacontenttype: contentType,
      };
    },
    consumeMessage: (message: EncodedCloudEvent): MessageWithMetadata => {
      const { data: body, datacontenttype: contentType } = message;
      if (!isUint8Array(body)) {
        throw new Error("Expected the data field to defined and have a Uint8Array");
      }
      if (contentType === undefined) {
        throw new Error("Expected the datacontenttype field to be defined");
      }
      return {
        body,
        contentType,
      };
    },
  };
}
