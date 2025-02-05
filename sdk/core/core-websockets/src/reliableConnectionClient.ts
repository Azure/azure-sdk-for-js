// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createAbortablePromise } from "@azure/core-util";
import { createFullRetryOptions, retry, type AbortableOperationOptions } from "./retry.js";
import { createError, getRandomName, type Writable } from "./utils.js";
import { logger } from "./logger.js";
import type {
  ConnectionManager,
  CreateReliableConnectionOptions,
  ReliableConnectionOptions,
  ReliableConnectionClient,
  OpenOptions,
  CloseOptions,
  SendOptions,
  CloseInfo,
} from "./models/public.js";
import { DEFAULT_HIGH_WATER_MARK } from "./constants.js";

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
    highWaterMark = DEFAULT_HIGH_WATER_MARK,
  }: ReliableConnectionOptions = {}): ReliableConnectionClient<SendDataT, ReceiveDataT> => {
    const connectionId = identifier || getRandomName();
    const retryOptions = createFullRetryOptions(inputRetryOptions);
    /**
     * The client tries to be reliable and reconnects by default.
     */
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
        openAbortSignal = abortSignal;
        async function retryableConnecting(
          opOptions: AbortableOperationOptions = {},
        ): Promise<void> {
          logger.verbose(`[${connectionId}] Opening connection`);
          client.open();
          /**
           * Installs dummy handlers to start listening for events from the server.
           * Resolves the promise when the connection is open, or rejects it when
           * the connection is closed or an error occurs. The client must have
           * handlers for open, close, error, and message events.
           */
          const emptyHandler = (): void => {};
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
          client.close(closeOpts);
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
        if (reliableConnectionClient.status !== "connected") {
          logger.info(`[${connectionId}] Connection is not open, opening now to send data...`);
          await reliableConnectionClient.open({ abortSignal });
        }
        async function retryableSend(opOptions: AbortableOperationOptions = {}): Promise<boolean> {
          logger.verbose(`[${connectionId}] Sending data...`);
          const bufferedAmount = await client.send(data, { ...sendOpts, ...opOptions });
          const isAboveHighWaterMark = bufferedAmount >= highWaterMark;
          if (isAboveHighWaterMark) {
            logger.warning(`[${connectionId}] The send buffer is full`);
          }
          logger.info(`[${connectionId}] Data has been sent`);
          return !isAboveHighWaterMark;
        }
        return retry(retryableSend, `send data on connection (${connectionId})`, retryOptions, {
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
              /** The client is closing the connection */
              resolveAndReset();
              break;
            }
            case "connecting": {
              /** The server is refusing to connect */
              logger.warning(`[${connectionId}] Connection closed after it was ${status}`);
              rejectAndReset(createError(errMsg));
              canReconnect = client.canReconnect(info);
              break;
            }
            case "connected": {
              /** The server closed the connection */
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
