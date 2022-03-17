// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * A simple messaging client that can send and receive messages
 */
export interface MessagingTestClient<MessageT> {
  initialize: () => Promise<void>;
  send: (message: MessageT) => Promise<void>;
  receive: () => Promise<MessageT>;
  cleanup: () => Promise<void>;
}
