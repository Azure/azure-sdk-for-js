// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  CloseInfo,
  ConnectionManager,
  createReliableConnectionClient,
  ReliableConnectionClient,
  RetryOptions,
} from "../../src/index.js";
import { createFullRetryOptions } from "./mockRretryOptions.js";
import { assert } from "./vitest.js";

type testSendT = string;
type testReceiveT = string;

export function createMockClient(
  options: {
    retryOptions?: RetryOptions;
    identifier?: string;
    open?: () => void;
    onOpen?: (fn: () => void) => void;
    close?: () => void;
    onClose?: (fn: (info: CloseInfo) => void) => void;
    isOpen?: () => Promise<boolean>;
    canReconnect?: () => boolean;
    send?: (data: testSendT) => Promise<void>;
    onError?: (fn: (error: unknown) => void) => void;
    onMessage?: (fn: (data: testReceiveT) => void) => void;
  } = {},
): ReliableConnectionClient<testSendT, testReceiveT> {
  const {
    retryOptions: inputRetryOptions,
    identifier = "test",
    open,
    onOpen,
    onClose,
    canReconnect,
    close,
    isOpen,
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
      (async () => {
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
      }),
    isOpen: isOpen ?? (async () => true),
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
  const clientFactory = createReliableConnectionClient<testSendT, testReceiveT>(connection);
  return clientFactory({ retryOptions, identifier });
}
