// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createAbortablePromise } from "@azure/core-util";
import {
  createFullRetryOptions,
  retry,
  type AbortableOperationOptions,
  type RetryOptions,
} from "./retry.js";
import { createError, getRandomName, type Writable } from "./utils.js";
import { logger } from "./logger.js";

/**
 * Client requirements:
 * - Isomorphic
 * - Retrying
 * - Logging
 * - Abortable
 * - Auto reconnect
 * - Tracing?
 * - Keep alive background task?
 * - Backpressure?
 */

/**
 * The close information.
 */
export interface CloseInfo {
  /**
   * The close code.
   */
  code?: string;
  /**
   * The close reason.
   */
  reason?: string;
}

/**
 * Options to close the connection.
 */
export interface CloseOptions {
  /**
   * The close info.
   */
  info?: CloseInfo;
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to open the connection.
 */
export interface OpenOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to send data.
 */
export interface SendOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * Options to check if the connection is open.
 */
export interface IsOpenOptions {
  /**
   * The abort signal.
   */
  abortSignal?: AbortSignal;
}

/**
 * The group of methods needed to implement a client over a reliable connection.
 */
export interface ConnectionManager<SendDataT, ReceiveDataT> {
  /**
   * Opens the connection. The client must be able to listen to events.
   * after this method is called.
   */
  open(opts?: OpenOptions): void;
  /**
   * Checks if the connection is open.
   */
  isOpen(opts?: IsOpenOptions): Promise<boolean>;
  /**
   * Closes the connection.
   */
  close(opts?: CloseOptions): void;
  /**
   * Sends data over the connection.
   */
  send(data: SendDataT, opts?: SendOptions): Promise<void>;
  /**
   * Checks if the connection can reconnect when is disconnected.
   */
  canReconnect(info: CloseInfo): boolean;
  /**
   * Sets the callback function to be called when a message is received.
   */
  onMessage: (fn: (data: ReceiveDataT) => void) => void;
  /**
   * Sets the callback function to be called when the connection is opened.
   */
  onOpen: (fn: () => void) => void;
  /**
   * Sets the callback function to be called when the connection is closed.
   */
  onClose: (fn: (info: CloseInfo) => void) => void;
  /**
   * Sets the callback function to be called when an error is received.
   */
  onError: (fn: (error: unknown) => void) => void;
}

/**
 * The status of the connection.
 */
export type Status = "connecting" | "connected" | "disconnecting" | "disconnected";

/**
 * The reliable connection client.
 */
export interface ReliableConnectionClient<SendDataT, ReceiveDataT> {
  /**
   * The status of the connection.
   */
  readonly status: Status;
  /**
   * Opens the connection.
   */
  open(opts?: OpenOptions): Promise<void>;
  /**
   * Checks if the connection is open.
   */
  isOpen(opts?: IsOpenOptions): Promise<boolean>;
  /**
   * Closes the connection.
   */
  close(opts?: CloseOptions): Promise<void>;
  /**
   * Sends data over the connection.
   */
  send(data: SendDataT, opts?: SendOptions): Promise<void>;
  /**
   * Sets the callback function to be called when a message is received.
   */
  onMessage: (fn: (data: ReceiveDataT) => void) => void;
  /**
   * Sets the callback function to be called when the connection is opened.
   */
  onOpen: (fn: () => void) => void;
  /**
   * Sets the callback function to be called when the connection is closed.
   */
  onClose: (fn: (info: CloseInfo) => void) => void;
  /**
   * Sets the callback function to be called when an error is received.
   */
  onError: (fn: (error: unknown) => void) => void;
}

/**
 * Options to create a reliable connection client factory.
 */
export interface CreateReliableConnectionOptions {
  /**
   * A function to check if an error is retryable.
   */
  isRetryable?: (err: unknown) => boolean;
  /**
   * Whether to swallow errors or not.
   */
  resolveOnUnsuccessful?: boolean;
}

/**
 * Options to create a reliable connection client.
 */
export interface ReliableConnectionOptions {
  /**
   * The options to retry an operation.
   */
  retryOptions?: RetryOptions;
  /**
   * The identifier of the connection.
   */
  identifier?: string;
}

/**
 * Creates a reliable connection client factory.
 */
export function createReliableConnectionClient<SendDataT, ReceiveDataT>(
  client: ConnectionManager<SendDataT, ReceiveDataT>,
  createOptions: CreateReliableConnectionOptions = {},
): (opts?: ReliableConnectionOptions) => ReliableConnectionClient<SendDataT, ReceiveDataT> {
  const { isRetryable, resolveOnUnsuccessful } = createOptions || {};
  type WritableClient = Writable<ReliableConnectionClient<SendDataT, ReceiveDataT>>;
  return ({
    retryOptions: inputRetryOptions,
    identifier,
  }: ReliableConnectionOptions = {}): ReliableConnectionClient<SendDataT, ReceiveDataT> => {
    const connectionId = identifier || getRandomName();
    const retryOptions = createFullRetryOptions(inputRetryOptions);
    let canReconnect: boolean = true;
    function isOpenRetryable(err: unknown): boolean {
      const res = canReconnect && (isRetryable?.(err) ?? true);
      canReconnect = true;
      return res;
    }
    let openAbortSignal: AbortSignal | undefined;
    let openOrClosePromiseResolve: (() => void) | undefined;
    let openOrClosePromiseReject: ((reason?: any) => void) | undefined;
    function clearResolvers(): void {
      openOrClosePromiseResolve = undefined;
      openOrClosePromiseReject = undefined;
    }
    function rejectAndReset(reason?: any): void {
      openOrClosePromiseReject?.(reason);
      clearResolvers();
    }
    function resolveAndReset(): void {
      openOrClosePromiseResolve?.();
      clearResolvers();
    }
    const reliableConnectionClient: WritableClient = {
      status: "disconnected",
      open: async (openOpts: OpenOptions = {}) => {
        switch (reliableConnectionClient.status) {
          case "connecting":
          case "connected": {
            logger.info(`[${connectionId}] Client is already ${reliableConnectionClient.status}`);
            return;
          }
          case "disconnecting": {
            const errMsg = `[${connectionId}] Client is already ${reliableConnectionClient.status}`;
            if (resolveOnUnsuccessful) {
              logger.warning(errMsg);
              return;
            } else {
              throw createError(errMsg);
            }
          }
          case "disconnected": {
            break;
          }
        }
        const { abortSignal } = openOpts;
        openAbortSignal = abortSignal ?? openAbortSignal;
        async function retryableConnecting(
          opOptions: AbortableOperationOptions = {},
        ): Promise<void> {
          logger.verbose(`[${connectionId}] Opening connection`);
          client.open({ ...openOpts, ...opOptions });
          /** installs dummy handlers to activate the logic in the wrappers */
          const emptyHandler = () => {};
          reliableConnectionClient.onOpen(emptyHandler);
          reliableConnectionClient.onClose(emptyHandler);
          reliableConnectionClient.onError(emptyHandler);
          reliableConnectionClient.onMessage(emptyHandler);
          reliableConnectionClient.status = "connecting";
          logger.verbose(`[${connectionId}] Connecting...`);
          await createAbortablePromise<void>((resolve, reject) => {
            openOrClosePromiseResolve = resolve;
            openOrClosePromiseReject = reject;
          }, opOptions);
        }
        try {
          await retry(retryableConnecting, `open connection (${connectionId})`, retryOptions, {
            isRetryable: isOpenRetryable,
            abortSignal,
          });
        } catch (error) {
          logger.error(`[${connectionId}] Error opening connection:`, error);
          rejectAndReset(error);
          try {
            await reliableConnectionClient.close({ abortSignal });
          } catch (closeError) {
            rejectAndReset(closeError);
          }
          reliableConnectionClient.status = "disconnected";
          if (!resolveOnUnsuccessful) {
            throw error;
          }
        }
      },
      isOpen: async (isOpenOpts?: IsOpenOptions) => {
        const res =
          reliableConnectionClient.status === "connected" && (await client.isOpen(isOpenOpts));
        logger.verbose(`[${connectionId}] isOpen: ${res}`);
        return res;
      },
      close: async (closeOpts: CloseOptions = {}) => {
        switch (reliableConnectionClient.status) {
          case "disconnecting":
          case "disconnected": {
            logger.info(`[${connectionId}] Client is already ${reliableConnectionClient.status}`);
            return;
          }
          case "connected":
          case "connecting": {
            break;
          }
        }
        const { abortSignal } = closeOpts;
        async function retryableDisconnecting(
          opOptions: AbortableOperationOptions = {},
        ): Promise<void> {
          logger.verbose(`[${connectionId}] Closing connection`);
          client.close({ ...closeOpts, ...opOptions });
          reliableConnectionClient.status = "disconnecting";
          logger.verbose(`[${connectionId}] Disconnecting...`);
          await createAbortablePromise<void>((resolve, reject) => {
            openOrClosePromiseResolve = resolve;
            openOrClosePromiseReject = reject;
          }, opOptions);
        }
        try {
          await retry(retryableDisconnecting, `close connection (${connectionId})`, retryOptions, {
            isRetryable,
            abortSignal,
          });
        } catch (error) {
          logger.error(`[${connectionId}] Error closing connection:`, error);
          rejectAndReset(error);
          if (!resolveOnUnsuccessful) {
            throw error;
          }
        } finally {
          reliableConnectionClient.status = "disconnected";
        }
      },
      send: async (data: SendDataT, sendOpts: SendOptions = {}) => {
        const { abortSignal } = sendOpts;
        if (!(await reliableConnectionClient.isOpen({ abortSignal }))) {
          logger.info(`[${connectionId}] Connection is not open, opening now to send data...`);
          await reliableConnectionClient.open({ abortSignal });
        }
        async function retryableSend(opOptions: AbortableOperationOptions = {}): Promise<void> {
          logger.verbose(`[${connectionId}] Sending data...`);
          await client.send(data, { ...sendOpts, ...opOptions });
          logger.info(`[${connectionId}] Data has been sent`);
        }
        await retry(retryableSend, `send data on connection (${connectionId})`, retryOptions, {
          isRetryable,
          abortSignal,
        });
      },
      onOpen: (fn: () => void) => {
        function wrapper(): void {
          switch (reliableConnectionClient.status) {
            case "connecting": {
              resolveAndReset();
              reliableConnectionClient.status = "connected";
              logger.info(`[${connectionId}] Connected`);
              break;
            }
            case "connected":
            case "disconnected":
            case "disconnecting": {
              const errMsg = `[${connectionId}] Unexpected open event when the client is ${reliableConnectionClient.status}`;
              logger.warning(errMsg);
              rejectAndReset(createError(errMsg));
              break;
            }
          }
          fn();
        }
        client.onOpen(wrapper);
      },
      onClose: (fn: (info: CloseInfo) => void) => {
        function wrapper(info: CloseInfo): void {
          const { code, reason } = info;
          const errMsg = `Disconnected${reason ? `: ${reason} with code: ${code}` : ""}`;
          logger.info(`[${connectionId}] ${errMsg}`);
          const status = reliableConnectionClient.status;
          reliableConnectionClient.status = "disconnected";
          switch (status) {
            case "disconnected":
            case "disconnecting": {
              resolveAndReset();
              break;
            }
            case "connecting": {
              rejectAndReset(createError(errMsg));
              logger.verbose(`[${connectionId}] Connection closed after it was ${status}`);
              canReconnect = client.canReconnect(info);
              break;
            }
            case "connected": {
              rejectAndReset(createError(errMsg));
              logger.warning(`[${connectionId}] Connection closed after it was ${status}`);
              canReconnect = client.canReconnect(info);
              if (canReconnect) {
                reliableConnectionClient.open({ abortSignal: openAbortSignal }).catch(() => {
                  /** nothing else to do, give up */
                });
              }
              break;
            }
          }
          fn(info);
        }
        client.onClose(wrapper);
      },
      onError: (fn: (error: unknown) => void) => {
        function wrapper(error: unknown): void {
          logger.error(`[${connectionId}] Error received:`, error);
          rejectAndReset(error);
          fn(error);
        }
        client.onError(wrapper);
      },
      onMessage: (fn: (data: ReceiveDataT) => void) => {
        function wrapper(data: ReceiveDataT): void {
          logger.info(`[${connectionId}] Message received`);
          fn(data);
        }
        client.onMessage(wrapper);
      },
    };
    return reliableConnectionClient;
  };
}
