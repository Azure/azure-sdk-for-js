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
} from "./models/internal.js";
import type {
  WebSocketOpenOptions,
  WebSocketCloseOptions,
  WebSocketSendOptions,
  WebSocketCloseDetails,
  WebSocketEventListeners,
} from "./models/public.js";
import { DEFAULT_HIGH_WATER_MARK } from "./constants.js";

/**
 * Creates a reliable connection client factory.
 */
export function createReliableConnectionClient<SendDataT, ReceiveDataT>(
  client: ConnectionManager<SendDataT, ReceiveDataT>,
  createOptions: CreateReliableConnectionOptions = {},
): (
  opts?: ReliableConnectionOptions<ReceiveDataT>,
) => ReliableConnectionClient<SendDataT, ReceiveDataT> {
  const { isRetryable, resolveOnUnsuccessful } = createOptions || {};
  type WritableClient = Writable<ReliableConnectionClient<SendDataT, ReceiveDataT>>;
  return ({
    retryOptions: inputRetryOptions,
    identifier,
    highWaterMark = DEFAULT_HIGH_WATER_MARK,
    on: listeners,
    autoReconnect = true,
  }: ReliableConnectionOptions<ReceiveDataT> = {}): ReliableConnectionClient<
    SendDataT,
    ReceiveDataT
  > => {
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

    let handlers: {
      [K in keyof WebSocketEventListeners<ReceiveDataT>]: [
        WebSocketEventListeners<ReceiveDataT>[K],
        WebSocketEventListeners<ReceiveDataT>[K] | undefined,
      ];
    };

    function clearHandlers(
      reliableConnectionClient: ReliableConnectionClient<SendDataT, ReceiveDataT>,
    ): void {
      if (!handlers) {
        return;
      }
      const events = ["open", "close", "error", "message"] as const;
      Object.values(handlers).forEach(([handler1, handler2], index) => {
        const event = events[index] as Parameters<
          ReliableConnectionClient<SendDataT, ReceiveDataT>["off"]
        >[0];
        if (handler1) {
          reliableConnectionClient.off(
            event,
            handler1 as Parameters<ReliableConnectionClient<SendDataT, ReceiveDataT>["off"]>[1],
          );
        }
        if (handler2) {
          reliableConnectionClient.off(
            event,
            handler2 as Parameters<ReliableConnectionClient<SendDataT, ReceiveDataT>["off"]>[1],
          );
        }
      });
    }

    function openHandler(reliableConnectionClient: WritableClient): () => void {
      return () => {
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
      };
    }

    function closeHandler(
      reliableConnectionClient: WritableClient,
    ): (info: WebSocketCloseDetails) => void {
      return (info: WebSocketCloseDetails) => {
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
            if (autoReconnect && canReconnect) {
              reliableConnectionClient.open({ abortSignal: openAbortSignal }).catch(() => {
                /** nothing else to do, give up */
              });
            }
            break;
          }
        }
      };
    }

    function errorHandler(): (err: unknown) => void {
      return (error: unknown) => {
        logger.error(`[${connectionId}] Error received:`, error);
        rejectAndReset(error);
      };
    }

    function messageHandler(): (data: ReceiveDataT) => void {
      return () => {
        logger.info(`[${connectionId}] Message received`);
      };
    }

    const reliableConnectionClient: WritableClient = {
      identifier: connectionId,
      status: "disconnected",
      open: async (openOpts: WebSocketOpenOptions = {}) => {
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

          clearHandlers(reliableConnectionClient);
          handlers = {
            open: [openHandler(reliableConnectionClient), listeners?.open],
            close: [closeHandler(reliableConnectionClient), listeners?.close],
            error: [errorHandler(), listeners?.error],
            message: [messageHandler(), listeners?.message],
          } as const;

          Object.entries(handlers).forEach(([event, [internalHandler, userHandler]]) => {
            if (internalHandler) {
              reliableConnectionClient.on(
                event as Parameters<ReliableConnectionClient<SendDataT, ReceiveDataT>["on"]>[0],
                internalHandler as Parameters<
                  ReliableConnectionClient<SendDataT, ReceiveDataT>["on"]
                >[1],
              );
            }
            if (userHandler) {
              reliableConnectionClient.on(
                event as Parameters<ReliableConnectionClient<SendDataT, ReceiveDataT>["on"]>[0],
                userHandler as Parameters<
                  ReliableConnectionClient<SendDataT, ReceiveDataT>["on"]
                >[1],
              );
            }
          });

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
      close: async (closeOpts: WebSocketCloseOptions = {}) => {
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
      send: async (data: SendDataT, sendOpts: WebSocketSendOptions = {}) => {
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
      on(type, fn) {
        client.on(
          type as Parameters<ConnectionManager<SendDataT, ReceiveDataT>["on"]>[0],
          fn as Parameters<ConnectionManager<SendDataT, ReceiveDataT>["on"]>[1],
        );
      },
      off(type, fn) {
        client.off(
          type as Parameters<ConnectionManager<SendDataT, ReceiveDataT>["off"]>[0],
          fn as Parameters<ConnectionManager<SendDataT, ReceiveDataT>["off"]>[1],
        );
      },
      destroy: () => {
        client.destroy();
        rejectAndReset(createError(`Client destroyed`));
        clearHandlers(reliableConnectionClient);

        const methods = ["open", "close", "send", "on", "off", "destroy"] as const;
        methods.forEach((method) => {
          reliableConnectionClient[method] = async () => {
            throw createError(`Cannot call "${method}" from a destroyed client`);
          };
        });

        reliableConnectionClient.status = "disconnected";
        logger.info(`[${connectionId}] Client destroyed`);
      },
    };
    return reliableConnectionClient;
  };
}
