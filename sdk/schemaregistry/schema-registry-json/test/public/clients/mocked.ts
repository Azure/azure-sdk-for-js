// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessagingTestClient } from "./models";
import { isLiveMode } from "@azure-tools/test-recorder";

/**
 * Returns a mocked messaging client that can work in both live and playback modes.
 * @param client - a live client
 * @returns a client that can work in both live and playback modes
 */
export function createMockedMessagingClient<MessageT>(
  createLiveClient: () => MessagingTestClient<MessageT>
): MessagingTestClient<MessageT> {
  if (isLiveMode()) {
    return createLiveClient();
  }
  const messageBuffer: MessageT[] = [];
  let initialized = false;
  return {
    isInitialized(): boolean {
      return initialized;
    },
    async initialize(): Promise<void> {
      initialized = true;
    },
    async send(inputMessage: MessageT): Promise<void> {
      messageBuffer.push(inputMessage);
    },
    receive: async function* ({ eventCount = 1 } = {}) {
      let currEventCount = 0;
      while (currEventCount < eventCount) {
        const message = messageBuffer.shift();
        if (message !== undefined) {
          ++currEventCount;
          yield message;
        }
      }
    },
    async cleanup(): Promise<void> {
      initialized = false;
    },
  };
}
