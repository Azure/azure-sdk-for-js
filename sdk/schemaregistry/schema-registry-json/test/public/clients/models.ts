// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * A simple messaging client that can send and receive messages
 */
export interface MessagingTestClient<MessageT> {
  isInitialized: () => boolean;
  initialize: (options?: { skipParsingBodyAsJson?: boolean }) => void;
  send: (message: MessageT) => Promise<void>;
  receive(options?: { eventCount?: number; waitIntervalInMs?: number }): AsyncGenerator<MessageT>;
  cleanup: () => Promise<void>;
}
