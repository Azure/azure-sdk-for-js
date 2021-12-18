// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { EventData } from "./eventData";
import { isObjectWithProperties, objectHasProperty } from "./util/typeGuards";

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
 * @internal
 */
export function isMessageWithMetadata(possible: unknown): possible is MessageWithMetadata {
  return (
    isObjectWithProperties(possible, ["data", "contentType"]) &&
    !objectHasProperty(possible, "getRawAmqpMessage")
  );
}

export function convertMessageWithMetadataToEventData(message: MessageWithMetadata): EventData {
  return {
    body: message.data,
    contentType: message.contentType
  };
}

export function toEventData(
  message: EventData | AmqpAnnotatedMessage | MessageWithMetadata
): EventData {
  return isMessageWithMetadata(message) ? convertMessageWithMetadataToEventData(message) : message;
}
