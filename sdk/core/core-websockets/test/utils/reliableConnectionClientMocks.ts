// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestContext } from "vitest";
import {
  type CloseInfo,
  type ConnectionManager,
  createReliableConnectionClient,
  type ReliableConnectionClient,
  type RetryOptions,
} from "../../src/index.js";
import { createFullRetryOptions } from "./mockRretryOptions.js";
import { assert } from "./vitest.js";

export type testSendT = string;
export type testReceiveT = string;

export function createMockClient(
  options: {
    retryOptions?: RetryOptions;
    isRetryable?: (error: unknown) => boolean;
    resolveOnUnsuccessful?: boolean;
    identifier?: string;
    open?: () => void;
    onOpen?: (fn: () => void) => void;
    close?: () => void;
    onClose?: (fn: (info: CloseInfo) => void) => void;
    canReconnect?: () => boolean;
    send?: (data: testSendT) => Promise<number>;
    onError?: (fn: (error: unknown) => void) => void;
    onMessage?: (fn: (data: testReceiveT) => void) => void;
  } = {},
): ReliableConnectionClient<testSendT, testReceiveT> {
  const {
    retryOptions: inputRetryOptions,
    isRetryable,
    resolveOnUnsuccessful,
    identifier = "test",
    open,
    onOpen,
    onClose,
    canReconnect,
    close,
    onError,
    onMessage,
    send,
  } = options;
  const retryOptions = createFullRetryOptions(inputRetryOptions);
  let openHandler: (() => void) | undefined;
  let closeHandler: ((info: CloseInfo) => void) | undefined;
  let onMessageHandler: ((data: testReceiveT) => void) | undefined;
  const connection: ConnectionManager<testSendT, testReceiveT> = {
    open:
      open ??
      (() => {
        setTimeout(() => {
          if (!openHandler) {
            assert.fail("open handler not set");
          }
          openHandler();
        }, 0);
      }),
    close:
      close ??
      (() => {
        setTimeout(() => {
          if (!closeHandler) {
            assert.fail("close handler not set");
          }
          closeHandler({ code: "1000", reason: "normal closure" });
        }, 0);
      }),
    send:
      send ??
      (async (item) => {
        onMessageHandler?.(item);
        return 0;
      }),
    onClose:
      onClose ??
      ((fn) => {
        closeHandler = fn;
      }),
    onError: onError ?? (() => {}),
    onMessage:
      onMessage ??
      ((fn) => {
        onMessageHandler = fn;
      }),
    onOpen:
      onOpen ??
      ((fn) => {
        openHandler = fn;
      }),
    canReconnect: canReconnect ?? (() => false),
  };
  const clientFactory = createReliableConnectionClient<testSendT, testReceiveT>(connection, {
    isRetryable,
    resolveOnUnsuccessful,
  });
  return clientFactory({ retryOptions, identifier });
}

export function createIdentifier(test: TestContext): string {
  let name = test.task.name;
  for (let parent = test.task.suite; parent; parent = parent.suite?.suite) {
    name = `${parent.name}/${name}`;
  }
  return name;
}
