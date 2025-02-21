// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { type WebSocketCloseDetails } from "../../src/index.js";
import { createFullRetryOptions } from "./mockRretryOptions.js";
import { assert } from "./vitest.js";
import type {
  ConnectionManager,
  CreateReliableConnectionOptions,
  ReliableConnectionClient,
  ReliableConnectionOptions,
} from "../../src/models/internal.js";
import { createReliableConnectionClient } from "../../src/reliableConnectionClient.js";

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
    close,
    send,
    on,
    reconnectOnClosure,
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
  };
  const clientFactory = createReliableConnectionClient<testSendT, testReceiveT>(connection, {
    isRetryable,
    resolveOnUnsuccessful,
  });
  return {
    client: clientFactory({
      identifier,
      retryOptions,
      highWaterMark,
      on: listeners,
      reconnectOnClosure,
    }),
    closeHandlers,
    errorHandlers,
    messageHandlers,
    openHandlers,
  };
}
