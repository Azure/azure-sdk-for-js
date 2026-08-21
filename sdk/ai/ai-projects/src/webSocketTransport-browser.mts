// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "./realtime/webSocketTransportLike.js";

/**
 * Default browser transport for the Voice Agents realtime client.
 *
 * Browsers cannot set an `Authorization` header on a WebSocket upgrade request. This transport sends
 * the Microsoft Entra bearer token as the `authorization.bearer.<token>` WebSocket subprotocol,
 * which the service converts back into an `Authorization` header before forwarding the request.
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
    const protocols = addCredentialSubprotocol(options.protocols, options.headers);
    await new Promise<void>((resolve, reject) => {
      let settled = false;
      const url = addHeadersToUrl(options.url, options.headers);
      this.webSocket = new WebSocket(url, protocols);
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
  let foundryFeatures: string | undefined;
  for (const [name, value] of Object.entries(headers)) {
    switch (name.toLowerCase()) {
      case "authorization":
        break;
      case "foundry-features":
        foundryFeatures = value;
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
  const targetUrl = target.toString();
  if (foundryFeatures === undefined) {
    return targetUrl;
  }
  const separator = target.search ? "&" : "?";
  const encodedFeatures = encodeURIComponent(foundryFeatures).replace(/%3D/gi, "=");
  return `${targetUrl}${separator}foundry_features=${encodedFeatures}`;
}

function addCredentialSubprotocol(protocols: string[], headers: Record<string, string>): string[] {
  const authorization = Object.entries(headers).find(
    ([name]) => name.toLowerCase() === "authorization",
  )?.[1];
  if (authorization === undefined) {
    return protocols;
  }
  const bearerPrefix = "Bearer ";
  if (!authorization.startsWith(bearerPrefix) || authorization.length === bearerPrefix.length) {
    throw new Error("Browser WebSocket authentication requires a Microsoft Entra bearer token.");
  }
  return [...protocols, `authorization.bearer.${authorization.slice(bearerPrefix.length)}`];
}

class BrowserWebSocketFactory implements VoiceAgentWebSocketFactory {
  public create(): VoiceAgentWebSocketTransport {
    return new BrowserWebSocketTransport();
  }
}

/** @internal */
export function createDefaultVoiceAgentWebSocketFactory(): VoiceAgentWebSocketFactory {
  return new BrowserWebSocketFactory();
}
