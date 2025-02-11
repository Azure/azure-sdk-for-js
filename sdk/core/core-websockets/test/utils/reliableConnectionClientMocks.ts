// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestContext } from "vitest";
import {
  type WebSocketCloseDetails,
  type ConnectionManager,
  createReliableConnectionClient,
  type CreateReliableConnectionOptions,
  type ReliableConnectionClient,
  type ReliableConnectionOptions,
} from "../../src/index.js";
import { createFullRetryOptions } from "./mockRretryOptions.js";
import { assert } from "./vitest.js";

export type testSendT = string;
export type testReceiveT = string;

interface CreateMockClientOptions
  extends Omit<Partial<ConnectionManager<testReceiveT, testSendT>>, "off">,
    CreateReliableConnectionOptions,
    Omit<ReliableConnectionOptions<testReceiveT>, "on"> {
  listeners?: ReliableConnectionOptions<testReceiveT>["on"];
}

export interface ClientWithHandlers {
  client: ReliableConnectionClient<testSendT, testReceiveT>;
  messageHandlers: ((data: testReceiveT) => void)[];
  closeHandlers: ((info: WebSocketCloseDetails) => void)[];
  openHandlers: (() => void)[];
  errorHandlers: ((error: Error) => void)[];
}

export function createMockClient(options: CreateMockClientOptions = {}): ClientWithHandlers {
  const {
    isRetryable,
    resolveOnUnsuccessful,
    open,
    canReconnect,
    close,
    send,
    on,
    highWaterMark,
    identifier,
    retryOptions: inputRetryOptions,
    listeners,
    destroy,
  } = options;
  const retryOptions = createFullRetryOptions(inputRetryOptions);
  const openHandlers: (() => void)[] = [];
  const closeHandlers: ((info: WebSocketCloseDetails) => void)[] = [];
  const messageHandlers: ((data: testReceiveT) => void)[] = [];
  const errorHandlers: ((error: Error) => void)[] = [];

  const connection: ConnectionManager<testSendT, testReceiveT> = {
    open:
      open ??
      (() => {
        setTimeout(() => {
          if (openHandlers.length === 0) {
            assert.fail("open handler not set");
          }
          for (const handler of openHandlers) {
            handler();
          }
        }, 0);
      }),
    close:
      close ??
      (() => {
        setTimeout(() => {
          if (closeHandlers.length === 0) {
            assert.fail("close handler not set");
          }
          for (const handler of closeHandlers) {
            handler({ code: "1000", reason: "normal closure" });
          }
        }, 0);
      }),
    send:
      send ??
      (async (item) => {
        for (const handler of messageHandlers) {
          handler(item);
        }
        return 0;
      }),
    on:
      on ??
      ((event, fn) => {
        switch (event) {
          case "message":
            messageHandlers.push(fn as (data: testReceiveT) => void);
            break;
          case "close":
            closeHandlers.push(fn as (info: WebSocketCloseDetails) => void);
            break;
          case "open":
            openHandlers.push(fn as () => void);
            break;
          case "error":
            errorHandlers.push(fn as (error: Error) => void);
            break;
          default:
            throw new Error(`Unknown event: ${event}`);
        }
      }),
    off: () => {},
    destroy: destroy ?? (() => {}),
    canReconnect: canReconnect ?? (() => false),
  };
  const clientFactory = createReliableConnectionClient<testSendT, testReceiveT>(connection, {
    isRetryable,
    resolveOnUnsuccessful,
  });
  return {
    client: clientFactory({ identifier, retryOptions, highWaterMark, on: listeners }),
    closeHandlers,
    errorHandlers,
    messageHandlers,
    openHandlers,
  };
}

export function createIdentifier(test: TestContext): string {
  let name = test.task.name;
  for (let parent = test.task.suite; parent; parent = parent.suite?.suite) {
    name = `${parent.name}/${name}`;
  }
  return name;
}
