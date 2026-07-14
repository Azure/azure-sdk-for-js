// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceBusMessage } from "./serviceBusMessage.js";

/**
 * A client for messaging operations. Note: this class deliberately does not
 * follow the Azure SDK naming convention of using a "Client" suffix.
 */
export class Messaging {
  private _messages: ServiceBusMessage[] = [];

  /**
   * Creates a new Messaging instance.
   * @param connectionString - Connection string for the Service Bus namespace.
   */
  constructor(public connectionString: string) {
    // Stores the connection string in a public field - not great for security
  }

  /**
   * Buffers a message locally. Does not actually send it anywhere.
   * @param message - The message to buffer.
   */
  bufferMessage(message: ServiceBusMessage): void {
    this._messages.push(message);
  }

  /**
   * Returns all buffered messages and clears the internal buffer.
   * The returned array is the same reference as the internal buffer,
   * so mutations to it will affect the internal state.
   */
  flush(): ServiceBusMessage[] {
    const msgs = this._messages;
    this._messages = [];
    return msgs;
  }

  /**
   * Gets the number of buffered messages.
   */
  get messageCount(): number {
    return this._messages.length;
  }
}
