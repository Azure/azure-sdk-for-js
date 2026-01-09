// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import WebSocket from "ws";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import {
  WebSocketState,
  type VoiceLiveWebSocketLike,
  type WebSocketFactoryOptions,
} from "./websocketLike.js";
import { VoiceLiveConnectionError, VoiceLiveErrorCodes } from "../errors/connectionErrors.js";

/**
 * Node.js WebSocket implementation using 'ws' library
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
      compression: true,
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
          this._ws.terminate();
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
        const wsOptions: WebSocket.ClientOptions = {
          headers: this._options.headers,
          maxPayload: this._options.maxMessageSize,
          perMessageDeflate: this._options.compression,
        };

        // Detect proxy settings from environment variables (HTTPS_PROXY, HTTP_PROXY)
        const proxySettings = getDefaultProxySettings();
        if (proxySettings) {
          const { host, port, username, password } = proxySettings;

          // Build proxy URL with authentication if provided
          let proxyUrl = host;
          if (!proxyUrl.includes("://")) {
            proxyUrl = `http://${proxyUrl}`;
          }

          // Remove trailing slash if present
          proxyUrl = proxyUrl.replace(/\/$/, "");

          // Add port
          proxyUrl = `${proxyUrl}:${port}`;

          // Add authentication if provided
          if (username && password) {
            const pUrl = new URL(proxyUrl);
            pUrl.username = username;
            pUrl.password = password;
            proxyUrl = pUrl.toString();
          }

          wsOptions.agent = new HttpsProxyAgent(proxyUrl);
        }

        this._ws = new WebSocket(url, protocols, wsOptions);

        this._url = url;

        this._ws.on("open", () => {
          clearTimeout(timeoutId);
          if (abortSignal) {
            abortSignal.removeEventListener("abort", abortHandler);
          }
          this._onOpen?.();
          resolve();
        });

        this._ws.on("close", (code: number, reason: Buffer) => {
          clearTimeout(timeoutId);
          if (abortSignal) {
            abortSignal.removeEventListener("abort", abortHandler);
          }
          this._onClose?.(code, reason.toString());
        });

        this._ws.on("message", (data: WebSocket.Data) => {
          if (typeof data === "string") {
            this._onMessage?.(data);
          } else if (data instanceof Buffer) {
            // Convert Buffer to ArrayBuffer
            const arrayBuffer = new ArrayBuffer(data.length);
            const view = new Uint8Array(arrayBuffer);
            view.set(data);
            this._onMessage?.(arrayBuffer);
          } else if (data instanceof ArrayBuffer) {
            this._onMessage?.(data);
          } else {
            // Handle other data types by converting to ArrayBuffer
            const buffer = Buffer.from(data as any);
            const arrayBuffer = new ArrayBuffer(buffer.length);
            const view = new Uint8Array(arrayBuffer);
            view.set(buffer);
            this._onMessage?.(arrayBuffer);
          }
        });

        this._ws.on("error", (error: Error) => {
          clearTimeout(timeoutId);
          if (abortSignal) {
            abortSignal.removeEventListener("abort", abortHandler);
          }
          this._onError?.(error);
          reject(
            new VoiceLiveConnectionError(
              `WebSocket error: ${error.message}`,
              VoiceLiveErrorCodes.WebSocketError,
              "websocket_connection",
              true, // Potentially recoverable
              error,
            ),
          );
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
        this._ws!.once("close", closeHandler);
      } else {
        this._ws!.once("close", closeHandler);
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
        abortSignal.addEventListener("abort", abortHandler);
      }

      this._ws!.send(data, (error?: Error) => {
        if (abortSignal) {
          abortSignal.removeEventListener("abort", abortHandler);
        }

        if (error) {
          reject(
            new VoiceLiveConnectionError(
              `Failed to send WebSocket message: ${error.message}`,
              VoiceLiveErrorCodes.WebSocketError,
              "message_send",
              true,
              error,
            ),
          );
        } else {
          resolve();
        }
      });
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
