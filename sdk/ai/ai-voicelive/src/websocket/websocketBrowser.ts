// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebSocketState,
  type VoiceLiveWebSocketLike,
  type WebSocketFactoryOptions,
} from "./websocketLike.js";
import { VoiceLiveConnectionError, VoiceLiveErrorCodes } from "../errors/connectionErrors.js";

/**
 * Browser WebSocket implementation using native WebSocket API
 */
export class VoiceLiveWebSocketBrowser implements VoiceLiveWebSocketLike {
  private _ws?: WebSocket;
  private _url?: string;
  private _options: WebSocketFactoryOptions;

  private _onOpen?: () => void;
  private _onClose?: (code: number, reason: string) => void;
  private _onMessage?: (data: string | ArrayBuffer) => void;
  private _onError?: (error: Error) => void;

  constructor(options: WebSocketFactoryOptions = {}) {
    this._options = {
      connectionTimeoutMs: 30000,
      maxMessageSize: 1024 * 1024, // 1MB
      ...options,
    };
  }

  async connect(url: string, protocols?: string[], abortSignal?: AbortSignal): Promise<void> {
    if (this._ws && this._ws.readyState !== WebSocket.CLOSED) {
      throw new VoiceLiveConnectionError(
        "WebSocket is already connected or connecting",
        VoiceLiveErrorCodes.ALREADY_CONNECTED,
      );
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(
          new VoiceLiveConnectionError(
            `WebSocket connection timeout after ${this._options.connectionTimeoutMs}ms`,
            VoiceLiveErrorCodes.CONNECTION_TIMEOUT,
          ),
        );
      }, this._options.connectionTimeoutMs);

      // Handle abort signal
      const abortHandler = (): void => {
        clearTimeout(timeoutId);
        if (this._ws) {
          this._ws.close();
        }
        reject(
          new VoiceLiveConnectionError(
            "WebSocket connection aborted",
            VoiceLiveErrorCodes.OPERATION_CANCELLED,
          ),
        );
      };

      if (abortSignal) {
        if (abortSignal.aborted) {
          abortHandler();
          return;
        }
        abortSignal.addEventListener("abort", abortHandler);
      }

      try {
        this._ws = new WebSocket(url, protocols);
        this._ws.binaryType = "arraybuffer";
        this._url = url;

        this._ws.addEventListener("open", () => {
          clearTimeout(timeoutId);
          if (abortSignal) {
            abortSignal.removeEventListener("abort", abortHandler);
          }
          this._onOpen?.();
          resolve();
        });

        this._ws.addEventListener("close", (event: CloseEvent) => {
          clearTimeout(timeoutId);
          if (abortSignal) {
            abortSignal.removeEventListener("abort", abortHandler);
          }
          this._onClose?.(event.code, event.reason);
        });

        this._ws.addEventListener("message", (event: MessageEvent) => {
          if (typeof event.data === "string") {
            this._onMessage?.(event.data);
          } else if (event.data instanceof ArrayBuffer) {
            this._onMessage?.(event.data);
          } else if (event.data instanceof Blob) {
            // Convert Blob to ArrayBuffer
            const reader = new FileReader();
            reader.onload = () => {
              if (reader.result instanceof ArrayBuffer) {
                this._onMessage?.(reader.result);
              }
            };
            reader.onerror = () => {
              this._onError?.(
                new VoiceLiveConnectionError(
                  "Failed to read blob data",
                  VoiceLiveErrorCodes.WEBSOCKET_ERROR,
                  "blob_read",
                ),
              );
            };
            reader.readAsArrayBuffer(event.data);
          }
        });

        this._ws.addEventListener("error", () => {
          clearTimeout(timeoutId);
          if (abortSignal) {
            abortSignal.removeEventListener("abort", abortHandler);
          }
          const error = new VoiceLiveConnectionError(
            "WebSocket connection failed",
            VoiceLiveErrorCodes.WEBSOCKET_ERROR,
            "websocket_connection",
            true,
          );
          this._onError?.(error);
          reject(error);
        });
      } catch (error) {
        clearTimeout(timeoutId);
        if (abortSignal) {
          abortSignal.removeEventListener("abort", abortHandler);
        }
        reject(
          new VoiceLiveConnectionError(
            `Failed to create WebSocket: ${error instanceof Error ? error.message : "Unknown error"}`,
            VoiceLiveErrorCodes.CONNECTION_FAILED,
            "websocket_creation",
            false,
            error instanceof Error ? error : new Error(String(error)),
          ),
        );
      }
    });
  }

  async disconnect(code: number = 1000, reason?: string): Promise<void> {
    if (!this._ws || this._ws.readyState === WebSocket.CLOSED) {
      return;
    }

    return new Promise((resolve) => {
      const closeHandler = (): void => {
        resolve();
      };

      if (this._ws!.readyState === WebSocket.CLOSING) {
        this._ws!.addEventListener("close", closeHandler, { once: true });
      } else {
        this._ws!.addEventListener("close", closeHandler, { once: true });
        this._ws!.close(code, reason);
      }
    });
  }

  async send(data: string | ArrayBuffer, abortSignal?: AbortSignal): Promise<void> {
    if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
      throw new VoiceLiveConnectionError(
        "WebSocket is not connected",
        VoiceLiveErrorCodes.NOT_CONNECTED,
      );
    }

    if (abortSignal?.aborted) {
      throw new VoiceLiveConnectionError(
        "Send operation aborted",
        VoiceLiveErrorCodes.OPERATION_CANCELLED,
      );
    }

    return new Promise((resolve, reject) => {
      const abortHandler = (): void => {
        reject(
          new VoiceLiveConnectionError(
            "Send operation aborted",
            VoiceLiveErrorCodes.OPERATION_CANCELLED,
          ),
        );
      };

      if (abortSignal) {
        abortSignal.addEventListener("abort", abortHandler, { once: true });
      }

      try {
        this._ws!.send(data);
        if (abortSignal) {
          abortSignal.removeEventListener("abort", abortHandler);
        }
        resolve();
      } catch (error) {
        if (abortSignal) {
          abortSignal.removeEventListener("abort", abortHandler);
        }
        reject(
          new VoiceLiveConnectionError(
            `Failed to send WebSocket message: ${error instanceof Error ? error.message : "Unknown error"}`,
            VoiceLiveErrorCodes.WEBSOCKET_ERROR,
            "message_send",
            true,
            error instanceof Error ? error : new Error(String(error)),
          ),
        );
      }
    });
  }

  onOpen(handler: () => void): void {
    this._onOpen = handler;
  }

  onClose(handler: (code: number, reason: string) => void): void {
    this._onClose = handler;
  }

  onMessage(handler: (data: string | ArrayBuffer) => void): void {
    this._onMessage = handler;
  }

  onError(handler: (error: Error) => void): void {
    this._onError = handler;
  }

  get isConnected(): boolean {
    return this._ws?.readyState === WebSocket.OPEN;
  }

  get readyState(): WebSocketState {
    if (!this._ws) return WebSocketState.Closed;
    return this._ws.readyState as WebSocketState;
  }

  get url(): string | undefined {
    return this._url;
  }
}
