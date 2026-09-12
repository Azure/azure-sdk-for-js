// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import { logger } from "./logger.js";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "./realtime/webSocketTransportLike.js";

/** The `CloseEvent` fields this transport forwards; the DOM lib is not in scope here. */
interface NativeCloseEvent {
  code: number;
  reason: string;
  wasClean: boolean;
}

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
  // Resolves once `onClose` has actually been invoked for the current connection (after
  // `messageChain` drains). `close()` awaits this - not just the raw native "close" event -
  // so it never resolves before the caller observes the authoritative close code/reason/wasClean.
  private closeNotified: Promise<void> = Promise.resolve();

  public constructor(closeTimeoutInMs = 5_000) {
    this.closeTimeoutInMs = closeTimeoutInMs;
  }

  public setHandlers(handlers: VoiceAgentWebSocketHandlers): void {
    this.handlers = handlers;
  }

  public async connect(options: VoiceAgentWebSocketConnectOptions): Promise<void> {
    if (options.abortSignal?.aborted) {
      throw new Error("WebSocket connection was cancelled.");
    }
    const protocols = addCredentialSubprotocol(options.protocols, options.headers);
    const url = addHeadersToUrl(options.url, options.headers);

    let notifyClosed: () => void = () => {};
    this.closeNotified = new Promise<void>((resolve) => {
      notifyClosed = resolve;
    });

    const webSocket = new WebSocket(url, protocols);
    webSocket.binaryType = "arraybuffer";
    this.webSocket = webSocket;

    // These forward events for the lifetime of the connection, independent of whether connect()
    // itself is still pending.
    webSocket.addEventListener("message", (event: MessageEvent) => {
      // Chain handling so an async Blob conversion can never let a later message be delivered to
      // the protocol parser out of arrival order.
      this.messageChain = this.deliverMessage(this.messageChain, event.data);
    });
    webSocket.addEventListener("close", (event) => void this.deliverClose(event, notifyClosed));
    webSocket.addEventListener("error", () => {
      this.handlers?.onError(new Error("WebSocket connection failed."));
    });

    try {
      await waitForOpen(webSocket, options.connectionTimeoutInMs, options.abortSignal);
    } catch (error) {
      webSocket.close();
      throw error;
    }
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

  /** Chains `data` behind `previous` so an async `Blob` conversion cannot reorder events. */
  private async deliverMessage(
    previous: Promise<void>,
    data: string | ArrayBuffer | Blob,
  ): Promise<void> {
    await previous;
    await this.handleIncomingMessage(data);
  }

  /** Reports the close only after every earlier message has reached the parser. */
  private async deliverClose(event: Event, notifyClosed: () => void): Promise<void> {
    const { code, reason, wasClean } = event as unknown as NativeCloseEvent;
    try {
      await this.messageChain;
    } catch {
      // handleIncomingMessage already reported the failure through onError.
    }
    this.handlers?.onClose(code, reason, wasClean);
    notifyClosed();
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
    try {
      if (webSocket.readyState !== WebSocket.CLOSING) {
        webSocket.close(code, reason);
      }
      await waitForClose(webSocket, this.closeNotified, this.closeTimeoutInMs);
    } catch (error) {
      // close() is a best-effort cleanup operation and must never throw (callers, including our
      // own VoiceAgentConnection.close()/dispose(), rely on it always resolving), so a transport
      // error here is logged for diagnosability rather than rejecting.
      logger.warning("Error while closing the voice-agent WebSocket transport", { error });
    } finally {
      if (this.webSocket === webSocket) {
        this.webSocket = undefined;
      }
    }
  }
}

/** Waits for `webSocket` to open, or rejects early on an error, timeout, or abort. */
function waitForOpen(
  webSocket: WebSocket,
  connectionTimeoutInMs: number,
  abortSignal?: AbortSignalLike,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      finish(() =>
        reject(new Error(`WebSocket connection timed out after ${connectionTimeoutInMs}ms.`)),
      );
    }, connectionTimeoutInMs);
    const onOpen = (): void => finish(resolve);
    const onError = (): void => finish(() => reject(new Error("WebSocket connection failed.")));
    const onAbort = (): void =>
      finish(() => reject(new Error("WebSocket connection was cancelled.")));

    function finish(settle: () => void): void {
      clearTimeout(timeout);
      webSocket.removeEventListener("open", onOpen);
      webSocket.removeEventListener("error", onError);
      abortSignal?.removeEventListener("abort", onAbort);
      settle();
    }

    webSocket.addEventListener("open", onOpen, { once: true });
    webSocket.addEventListener("error", onError, { once: true });
    abortSignal?.addEventListener("abort", onAbort);
  });
}

/**
 * Waits until `onClose` has been delivered to the handlers, so `close()` never returns before the
 * caller observes the true close outcome. Resolves on timeout if the socket never closes; rejects
 * if it errors instead.
 */
async function waitForClose(
  webSocket: WebSocket,
  closeNotified: Promise<void>,
  timeoutInMs: number,
): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let onError: (() => void) | undefined;
  const errorOrTimeout = new Promise<void>((resolve, reject) => {
    timeout = setTimeout(resolve, timeoutInMs);
    onError = (): void => reject(new Error("WebSocket connection failed while closing."));
    webSocket.addEventListener("error", onError, { once: true });
  });

  try {
    await Promise.race([closeNotified, errorOrTimeout]);
  } finally {
    clearTimeout(timeout);
    if (onError) {
      webSocket.removeEventListener("error", onError);
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
