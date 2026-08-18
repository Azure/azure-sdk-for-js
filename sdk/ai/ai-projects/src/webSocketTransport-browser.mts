// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "./realtime/webSocketTransportLike.js";
import { logger } from "./logger.js";

/**
 * Default browser transport for the Voice Agents realtime client.
 *
 * Browsers cannot set an `Authorization` header on a WebSocket upgrade request, so this transport
 * falls back to placing the bearer token (and other custom headers) in the connection URL's query
 * string. Query strings are routinely captured by proxies, server access logs, and browser history,
 * so this leaks the credential to anything that can observe the URL. Prefer routing browser
 * connections through an authenticated relay that adds the header server-side instead of using this
 * transport directly against the service endpoint — see the `webSocketFactory` option on
 * `VoiceAgentRealtimeClientOptions` and the `samples/v2-beta/browser` sample's local relay for an
 * example of that pattern.
 */
export class BrowserWebSocketTransport implements VoiceAgentWebSocketTransport {
  private webSocket?: WebSocket;
  private handlers?: VoiceAgentWebSocketHandlers;
  private readonly closeTimeoutInMs: number;
  private messageChain: Promise<void> = Promise.resolve();

  public constructor(closeTimeoutInMs = 5_000) {
    this.closeTimeoutInMs = closeTimeoutInMs;
  }

  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
  }

  public async connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      logger.warning(
        "BrowserWebSocketTransport places the bearer token in the WebSocket URL because browsers cannot set custom upgrade headers. Use an authenticated relay for production browser connections.",
      );
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
        // Chain handling so an async Blob conversion can never let a later message be
        // delivered to the protocol parser out of arrival order.
        this.messageChain = this.messageChain.then(() => this.handleIncomingMessage(event.data));
      });
      this.webSocket.addEventListener("close", (event) => {
        const closeEvent = event as unknown as {
          code: number;
          reason: string;
          wasClean: boolean;
        };
        clearTimeout(timeout);
        options.abortSignal?.removeEventListener("abort", abortHandler);
        this.handlers?.onClose(closeEvent.code, closeEvent.reason, closeEvent.wasClean);
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

  private async handleIncomingMessage(data: string | ArrayBuffer | Blob): Promise<void> {
    if (typeof data === "string" || data instanceof ArrayBuffer) {
      this.handlers?.onMessage(data);
      return;
    }
    if (data instanceof Blob) {
      try {
        this.handlers?.onMessage(await data.arrayBuffer());
      } catch (error) {
        this.handlers?.onError(error instanceof Error ? error : new Error(String(error)));
      }
    }
  }

  public async close(code: number, reason: string): Promise<void> {
    if (!this.webSocket || this.webSocket.readyState === WebSocket.CLOSED) {
      return;
    }
    const webSocket = this.webSocket;
    await new Promise<void>((resolve) => {
      let settled = false;
      const closeState: { timeout?: ReturnType<typeof setTimeout> } = {};
      const finish = (): void => {
        if (settled) {
          return;
        }
        settled = true;
        if (closeState.timeout) {
          clearTimeout(closeState.timeout);
        }
        webSocket.removeEventListener("close", finish);
        resolve();
      };
      webSocket.addEventListener("close", finish, { once: true });
      closeState.timeout = setTimeout(finish, this.closeTimeoutInMs);
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
