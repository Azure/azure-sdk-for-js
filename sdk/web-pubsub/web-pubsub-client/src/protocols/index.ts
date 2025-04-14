// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubMessage } from "../models/messages.js";
import { WebPubSubJsonProtocolImpl } from "./webPubSubJsonProtocol.js";
import { WebPubSubJsonReliableProtocolImpl } from "./webPubSubJsonReliableProtocol.js";

/**
 * The interface to be implemented for a web pubsub subprotocol
 */
export interface WebPubSubClientProtocol {
  /**
   * The name of subprotocol. Name will be used in websocket subprotocol
   */
  readonly name: string;

  /**
   * True if the protocol supports reliable features
   */
  readonly isReliableSubProtocol: boolean;

  /**
   * Creates WebPubSubMessage objects from the specified serialized representation.
   * @param input - The serialized representation
   */
  parseMessages(input: string | ArrayBuffer | Buffer): WebPubSubMessage[] | WebPubSubMessage | null;

  /**
   * Write WebPubSubMessage to string or ArrayBuffer
   * @param message - The message to be written
   */
  writeMessage(message: WebPubSubMessage): string | ArrayBuffer;
}

/**
 * Return the "json.webpubsub.azure.v1" protocol
 */
export const WebPubSubJsonProtocol = (): WebPubSubClientProtocol => {
  return new WebPubSubJsonProtocolImpl();
};

/**
 * Return the "json.reliable.webpubsub.azure.v1" protocol
 */
export const WebPubSubJsonReliableProtocol = (): WebPubSubClientProtocol => {
  return new WebPubSubJsonReliableProtocolImpl();
};
