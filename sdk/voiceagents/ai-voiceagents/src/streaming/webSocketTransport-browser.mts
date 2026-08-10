// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "./webSocketTransportLike.js";

export class BrowserWebSocketTransport implements VoiceAgentWebSocketTransport {
  private webSocket?: WebSocket;
  private handlers?: VoiceAgentWebSocketHandlers;
  private readonly closeTimeoutInMs: number;

  public constructor(closeTimeoutInMs = 5_000) {
    this.closeTimeoutInMs = closeTimeoutInMs;
  }

  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
  }

  public async connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const url = addHeadersToUrl(options.url, options.headers);
      this.webSocket = new WebSocket(url, options.protocols);
      this.webSocket.binaryType = "arraybuffer";

      const timeout = setTimeout(() => {
        if (!settled) {
          settled = true;
          this.webSocket?.close();
          reject(
            new Error(`WebSocket connection timed out after ${options.connectionTimeoutInMs}ms.`),
          );
        }
      }, options.connectionTimeoutInMs);
      const abortHandler = (): void => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          this.webSocket?.close();
          reject(new Error("WebSocket connection was cancelled."));
        }
      };
      if (options.abortSignal?.aborted) {
        abortHandler();
        return;
      }
      options.abortSignal?.addEventListener("abort", abortHandler);

      this.webSocket.addEventListener("open", () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          options.abortSignal?.removeEventListener("abort", abortHandler);
          resolve();
        }
      });
      this.webSocket.addEventListener("message", (event: MessageEvent) => {
        if (typeof event.data === "string" || event.data instanceof ArrayBuffer) {
          this.handlers?.onMessage(event.data);
        } else if (event.data instanceof Blob) {
          event.data
            .arrayBuffer()
            .then((data) => this.handlers?.onMessage(data))
            .catch((error: unknown) =>
              this.handlers?.onError(error instanceof Error ? error : new Error(String(error))),
            );
        }
      });
      this.webSocket.addEventListener("close", (event: CloseEvent) => {
        clearTimeout(timeout);
        options.abortSignal?.removeEventListener("abort", abortHandler);
        this.handlers?.onClose(event.code, event.reason, event.wasClean);
      });
      this.webSocket.addEventListener("error", () => {
        const error = new Error("WebSocket connection failed.");
        this.handlers?.onError(error);
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          options.abortSignal?.removeEventListener("abort", abortHandler);
          reject(error);
        }
      });
    });
  }

  public async send(data: string, abortSignal?: AbortSignalLike): Promise<void> {
    if (!this.webSocket || this.webSocket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected.");
    }
    if (abortSignal?.aborted) {
      throw new Error("WebSocket send was cancelled.");
    }
    this.webSocket.send(data);
  }

  public async close(code: number, reason: string): Promise<void> {
    if (!this.webSocket || this.webSocket.readyState === WebSocket.CLOSED) {
      return;
    }
    const webSocket = this.webSocket;
    await new Promise<void>((resolve) => {
      let settled = false;
      let timeout: ReturnType<typeof setTimeout>;
      const finish = (): void => {
        if (settled) {
          return;
        }
        settled = true;
        clearTimeout(timeout);
        webSocket.removeEventListener("close", finish);
        resolve();
      };
      webSocket.addEventListener("close", finish, { once: true });
      timeout = setTimeout(finish, this.closeTimeoutInMs);
      if (webSocket.readyState !== WebSocket.CLOSING) {
        webSocket.close(code, reason);
      }
    });
    if (this.webSocket === webSocket) {
      this.webSocket = undefined;
    }
  }
}

/** @internal */
export function addHeadersToUrl(url: string, headers: Record<string, string>): string {
  const target = new URL(url);
  for (const [name, value] of Object.entries(headers)) {
    switch (name.toLowerCase()) {
      case "authorization":
        target.searchParams.set("authorization", value);
        break;
      case "x-ms-client-request-id":
        target.searchParams.set("client-request-id", value);
        break;
      case "user-agent":
        break;
      default:
        target.searchParams.set(`h-${name.toLowerCase()}`, value);
        break;
    }
  }
  return target.toString();
}

class BrowserWebSocketFactory implements VoiceAgentWebSocketFactory {
  public create(): VoiceAgentWebSocketTransport {
    return new BrowserWebSocketTransport();
  }
}

/** @internal */
export const defaultVoiceAgentWebSocketFactory: VoiceAgentWebSocketFactory =
  new BrowserWebSocketFactory();
