// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebPubSubClientProtocol } from "./index.js";
import type { WebPubSubMessage } from "../models/messages.js";
import * as base from "./jsonProtocolBase.js";

/**
 * The "json.webpubsub.azure.v1" protocol
 */
export class WebPubSubJsonProtocolImpl implements WebPubSubClientProtocol {
  /**
   * True if the protocol supports reliable features
   */
  public readonly isReliableSubProtocol = false;

  /**
   * The name of subprotocol. Name will be used in websocket subprotocol
   */
  public readonly name = "json.webpubsub.azure.v1";

  /**
   * Creates WebPubSubMessage objects from the specified serialized representation.
   * @param input - The serialized representation
   */
  public parseMessages(input: string): WebPubSubMessage | null {
    return base.parseMessages(input);
  }

  /**
   * Write WebPubSubMessage to string
   * @param message - The message to be written
   */
  public writeMessage(message: WebPubSubMessage): string {
    return base.writeMessage(message);
  }
}
