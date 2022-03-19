// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessagingTestClient } from "./models";
import { env } from "../utils/env";

/**
 * Returns a mocked messaging client that can work in both live and playback modes.
 * @param client - a live client
 * @returns a client that can work in both live and playback modes
 */
export function createMockedMessagingClient<MessageT>(
  createLiveClient: () => MessagingTestClient<MessageT>
): MessagingTestClient<MessageT> {
  if (env.TEST_MODE === "live") {
    return createLiveClient();
  }
  const messageBuffer: MessageT[] = [];
  return {
    async initialize(): Promise<void> {
      /** empty body */
    },
    async send(inputMessage: MessageT): Promise<void> {
      messageBuffer.push(inputMessage);
    },
    receive: async function* ({ eventCount = 1 } = {}) {
      const currEventCount = 0;
      while (currEventCount < eventCount) {
        const message = messageBuffer.shift();
        if (message !== undefined) {
          yield message;
        }
      }
    },
    async cleanup(): Promise<void> {
      /** empty body */
    },
  };
}
