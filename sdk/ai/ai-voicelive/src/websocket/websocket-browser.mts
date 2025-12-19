// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import {
  WebSocketState,
  type VoiceLiveWebSocketLike,
  type WebSocketFactoryOptions,
} from "./websocketLike.js";
import { VoiceLiveConnectionError, VoiceLiveErrorCodes } from "../errors/connectionErrors.js";

/**
 * Browser WebSocket implementation using native WebSocket API
 */
export class VoiceLiveWebSocket implements VoiceLiveWebSocketLike {
  private _ws?: WebSocket;
  private _url?: string;
  private _options: WebSocketFactoryOptions;

  private _onOpen?: () => void;
  private _onClose?: (code: number, reason: string) => void;
  private _onMessage?: (data: string | ArrayBuffer) => void;
  private _onError?: (error: Error) => void;

  constructor(options: WebSocketFactoryOptions = {}) {
    this._options = {
      connectionTimeoutInMs: 30000,
      maxMessageSize: 1024 * 1024, // 1MB
      ...options,
    };
  }

  async connect(url: string, protocols?: string[], abortSignal?: AbortSignalLike): Promise<void> {
    if (this._ws && this._ws.readyState !== WebSocket.CLOSED) {
      throw new VoiceLiveConnectionError(
        "WebSocket is already connected or connecting",
        VoiceLiveErrorCodes.AlreadyConnected,
      );
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(
          new VoiceLiveConnectionError(
            `WebSocket connection timeout after ${this._options.connectionTimeoutInMs}ms`,
            VoiceLiveErrorCodes.ConnectionTimeout,
          ),
        );
      }, this._options.connectionTimeoutInMs);
      // Handle abort signal
      const abortHandler = (): void => {
        clearTimeout(timeoutId);
        if (this._ws) {
          this._ws.close();
        }
        reject(
          new VoiceLiveConnectionError(
            "WebSocket connection aborted",
            VoiceLiveErrorCodes.OperationCancelled,
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
        // Browser WebSocket API doesn't support custom headers, so we need to pass
        // authentication and other headers as query parameters
        const urlWithHeaders = this._addHeadersToUrl(url, this._options.headers);

        this._ws = new WebSocket(urlWithHeaders, protocols);
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
                  VoiceLiveErrorCodes.WebSocketError,
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
            VoiceLiveErrorCodes.WebSocketError,
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
            VoiceLiveErrorCodes.ConnectionFailed,
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

  async send(data: string | ArrayBuffer, abortSignal?: AbortSignalLike): Promise<void> {
    if (!this._ws || this._ws.readyState !== WebSocket.OPEN) {
      throw new VoiceLiveConnectionError(
        "WebSocket is not connected",
        VoiceLiveErrorCodes.NotConnected,
      );
    }

    if (abortSignal?.aborted) {
      throw new VoiceLiveConnectionError(
        "Send operation aborted",
        VoiceLiveErrorCodes.OperationCancelled,
      );
    }

    return new Promise((resolve, reject) => {
      const abortHandler = (): void => {
        reject(
          new VoiceLiveConnectionError(
            "Send operation aborted",
            VoiceLiveErrorCodes.OperationCancelled,
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
            VoiceLiveErrorCodes.WebSocketError,
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

  /**
   * Converts headers to query parameters for browser WebSocket connections.
   * Browser WebSocket API doesn't support custom headers, so authentication
   * and other headers need to be passed as query parameters.
   */
  private _addHeadersToUrl(url: string, headers?: Record<string, string>): string {
    if (!headers || Object.keys(headers).length === 0) {
      return url;
    }

    const urlObj = new URL(url);

    // Convert known authentication headers to appropriate query parameters
    for (const [key, value] of Object.entries(headers)) {
      const lowerKey = key.toLowerCase();

      if (lowerKey === "authorization") {
        // Convert Bearer token to authorization query parameter
        urlObj.searchParams.set("authorization", value);
      } else if (lowerKey === "api-key") {
        // API key goes to api-key query parameter
        urlObj.searchParams.set("api-key", value);
      } else if (lowerKey === "x-ms-client-request-id") {
        // Client request ID as query parameter
        urlObj.searchParams.set("client-request-id", value);
      } else if (lowerKey === "user-agent") {
        // User-Agent cannot be set in WebSocket, skip it
        continue;
      } else {
        // For other headers, convert to query parameters with 'h-' prefix
        // to avoid conflicts with existing query parameters
        urlObj.searchParams.set(`h-${lowerKey}`, value);
      }
    }

    return urlObj.toString();
  }
}
