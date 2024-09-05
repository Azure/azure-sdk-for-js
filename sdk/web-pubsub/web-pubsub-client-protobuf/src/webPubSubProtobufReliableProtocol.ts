// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubMessage, WebPubSubClientProtocol } from "@azure/web-pubsub-client";

import { WebPubSubProtobufProtocolBase } from "./webPubSubProtobufProtocolBase";

/**
 * The "protobuf.reliable.webpubsub.azure.v1" protocol
 */
export class WebPubSubProtobufReliableProtocolImpl implements WebPubSubClientProtocol {
  /**
   * True if the protocol supports reliable features
   */
  public readonly isReliableSubProtocol = true;

  /**
   * The name of subprotocol. Name will be used in websocket subprotocol
   */
  public readonly name = "protobuf.reliable.webpubsub.azure.v1";

  /**
   * Creates WebPubSubMessage objects from the specified serialized representation.
   * @param input - The serialized representation
   */
  public parseMessages(input: ArrayBuffer): WebPubSubMessage | null {
    return WebPubSubProtobufProtocolBase.parseMessages(input);
  }

  /**
   * Write WebPubSubMessage to string
   * @param message - The message to be written
   */
  public writeMessage(message: WebPubSubMessage): ArrayBuffer {
    return WebPubSubProtobufProtocolBase.writeMessage(message);
  }
}
