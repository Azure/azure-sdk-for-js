// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import WebSocket, { type ClientOptions, type RawData } from "ws";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import type { AbortSignalLike } from "@azure/abort-controller";
import { logger } from "./logger.js";
import type {
  VoiceAgentWebSocketConnectOptions,
  VoiceAgentWebSocketFactory,
  VoiceAgentWebSocketHandlers,
  VoiceAgentWebSocketTransport,
} from "./realtime/webSocketTransportLike.js";

export class NodeWebSocketTransport implements VoiceAgentWebSocketTransport {
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
    if (options.abortSignal?.aborted) {
      throw new Error("WebSocket connection was cancelled.");
    }

    const webSocket = new WebSocket(options.url, options.protocols, buildClientOptions(options));
    this.webSocket = webSocket;

    // These forward events for the lifetime of the connection, independent of whether connect()
    // itself is still pending.
    webSocket.on("message", (data: RawData) => this.handlers?.onMessage(toMessageData(data)));
    webSocket.on("close", (code: number, reason: Buffer) => {
      this.handlers?.onClose(code, reason.toString(), isCleanCloseCode(code));
    });
    webSocket.on("error", (error: Error) => this.handlers?.onError(error));

    try {
      await waitForOpen(webSocket, options.connectionTimeoutInMs, options.abortSignal);
    } catch (error) {
      webSocket.terminate();
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
    await sendMessage(this.webSocket, data, abortSignal);
  }

  public async close(code: number, reason: string): Promise<void> {
    if (!this.webSocket || this.webSocket.readyState === WebSocket.CLOSED) {
      return;
    }
    const webSocket = this.webSocket;
    try {
      if (webSocket.readyState === WebSocket.CONNECTING) {
        webSocket.terminate();
      } else if (webSocket.readyState !== WebSocket.CLOSING) {
        webSocket.close(code, reason);
      }
      await waitForClose(webSocket, this.closeTimeoutInMs);
    } catch (error) {
      // close() is a best-effort cleanup operation and must never throw (callers, including our
      // own VoiceAgentConnection.close()/dispose(), rely on it always resolving), so a transport
      // error here is logged for diagnosability rather than rejecting.
      webSocket.terminate();
      logger.warning("Error while closing the voice-agent WebSocket transport", { error });
    } finally {
      if (this.webSocket === webSocket) {
        this.webSocket = undefined;
      }
    }
  }
}

function buildClientOptions(options: VoiceAgentWebSocketConnectOptions): ClientOptions {
  const clientOptions: ClientOptions = {
    headers: options.headers,
    perMessageDeflate: true,
  };
  const proxySettings = shouldBypassProxy(new URL(options.url).hostname)
    ? undefined
    : getDefaultProxySettings();
  if (proxySettings) {
    const proxyUrl = new URL(
      proxySettings.host.includes("://") ? proxySettings.host : `http://${proxySettings.host}`,
    );
    if (proxySettings.port) {
      proxyUrl.port = String(proxySettings.port);
    }
    if (proxySettings.username) {
      proxyUrl.username = proxySettings.username;
    }
    if (proxySettings.password) {
      proxyUrl.password = proxySettings.password;
    }
    clientOptions.agent = new HttpsProxyAgent(proxyUrl);
  }
  return clientOptions;
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
    const onError = (error: Error): void => finish(() => reject(error));
    const onAbort = (): void =>
      finish(() => reject(new Error("WebSocket connection was cancelled.")));

    function finish(settle: () => void): void {
      clearTimeout(timeout);
      webSocket.off("open", onOpen);
      webSocket.off("error", onError);
      abortSignal?.removeEventListener("abort", onAbort);
      settle();
    }

    webSocket.once("open", onOpen);
    webSocket.once("error", onError);
    abortSignal?.addEventListener("abort", onAbort);
  });
}

/** Wraps `ws`'s callback-based `send` in a promise. */
function sendMessage(
  webSocket: WebSocket,
  data: string,
  abortSignal?: AbortSignalLike,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const onAbort = (): void => reject(new Error("WebSocket send was cancelled."));
    abortSignal?.addEventListener("abort", onAbort, { once: true });
    webSocket.send(data, (error?: Error) => {
      abortSignal?.removeEventListener("abort", onAbort);
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Waits for `webSocket` to close, terminating it if it doesn't close within `timeoutInMs`.
 * Rejects if the transport reports an error instead of closing; the caller decides how to
 * handle that (see `close()`, which treats it as a best-effort failure, not a thrown error).
 */
function waitForClose(webSocket: WebSocket, timeoutInMs: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => {
      webSocket.terminate();
      finish(resolve);
    }, timeoutInMs);
    const onClose = (): void => finish(resolve);
    const onError = (error: Error): void => finish(() => reject(error));

    function finish(settle: () => void): void {
      clearTimeout(timeout);
      webSocket.off("close", onClose);
      webSocket.off("error", onError);
      settle();
    }

    webSocket.once("close", onClose);
    webSocket.once("error", onError);
  });
}

function toMessageData(data: RawData): string | ArrayBuffer {
  if (typeof data === "string") {
    return data;
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }
  const buffer = Array.isArray(data) ? Buffer.concat(data) : data;
  const bytes = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  return bytes.slice().buffer;
}

class NodeWebSocketFactory implements VoiceAgentWebSocketFactory {
  public create(): VoiceAgentWebSocketTransport {
    return new NodeWebSocketTransport();
  }
}

/**
 * Reports whether `hostname` should bypass the `HTTPS_PROXY`/`HTTP_PROXY` proxy per the standard
 * `NO_PROXY`/`no_proxy` environment variable (comma-separated hostnames/domains; `*` bypasses all).
 */
function shouldBypassProxy(hostname: string): boolean {
  const noProxy = process.env.NO_PROXY ?? process.env.no_proxy;
  if (!noProxy || !noProxy.trim()) {
    return false;
  }
  const host = hostname.toLowerCase();
  return noProxy
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0)
    .some((entry) => {
      if (entry === "*") {
        return true;
      }
      const normalizedEntry = entry.startsWith(".") ? entry.slice(1) : entry;
      return host === normalizedEntry || host.endsWith(`.${normalizedEntry}`);
    });
}

function isCleanCloseCode(code: number): boolean {
  switch (code) {
    case 1002:
    case 1003:
    case 1006:
    case 1007:
    case 1008:
    case 1009:
    case 1010:
    case 1011:
    case 1015:
      return false;
    default:
      return true;
  }
}

/** @internal */
export function createDefaultVoiceAgentWebSocketFactory(): VoiceAgentWebSocketFactory {
  return new NodeWebSocketFactory();
}
