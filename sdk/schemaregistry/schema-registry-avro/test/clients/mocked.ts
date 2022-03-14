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
  let message: MessageT;
  return {
    async initialize(): Promise<void> {
      /** empty body */
    },
    async send(inputMessage: MessageT): Promise<void> {
      message = inputMessage;
      return;
    },
    async receive(): Promise<MessageT> {
      if (message !== undefined) {
        return message;
      } else {
        throw new Error("No message was sent!");
      }
    },
    async cleanup(): Promise<void> {
      /** empty body */
    },
  };
}
