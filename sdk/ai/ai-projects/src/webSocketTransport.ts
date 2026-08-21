// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import WebSocket, { type ClientOptions, type RawData } from "ws";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import type { AbortSignalLike } from "@azure/abort-controller";
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
    await new Promise<void>((resolve, reject) => {
      let settled = false;
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

      const timeout = setTimeout(() => {
        if (!settled) {
          settled = true;
          this.webSocket?.terminate();
          reject(
            new Error(`WebSocket connection timed out after ${options.connectionTimeoutInMs}ms.`),
          );
        }
      }, options.connectionTimeoutInMs);

      const abortHandler = (): void => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          this.webSocket?.terminate();
          reject(new Error("WebSocket connection was cancelled."));
        }
      };
      if (options.abortSignal?.aborted) {
        abortHandler();
        return;
      }
      options.abortSignal?.addEventListener("abort", abortHandler);

      this.webSocket = new WebSocket(options.url, options.protocols, clientOptions);
      this.webSocket.on("open", () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          options.abortSignal?.removeEventListener("abort", abortHandler);
          resolve();
        }
      });
      this.webSocket.on("message", (data: RawData) =>
        this.handlers?.onMessage(toMessageData(data)),
      );
      this.webSocket.on("close", (code: number, reason: Buffer) => {
        clearTimeout(timeout);
        options.abortSignal?.removeEventListener("abort", abortHandler);
        this.handlers?.onClose(code, reason.toString(), code === 1000);
      });
      this.webSocket.on("error", (error: Error) => {
        clearTimeout(timeout);
        options.abortSignal?.removeEventListener("abort", abortHandler);
        this.handlers?.onError(error);
        if (!settled) {
          settled = true;
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

    await new Promise<void>((resolve, reject) => {
      const abortHandler = (): void => reject(new Error("WebSocket send was cancelled."));
      abortSignal?.addEventListener("abort", abortHandler, { once: true });
      this.webSocket!.send(data, (error?: Error) => {
        abortSignal?.removeEventListener("abort", abortHandler);
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
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
        webSocket.off("close", finish);
        resolve();
      };
      webSocket.once("close", finish);
      closeState.timeout = setTimeout(() => {
        webSocket.terminate();
        finish();
      }, this.closeTimeoutInMs);
      if (webSocket.readyState === WebSocket.CONNECTING) {
        webSocket.terminate();
      } else if (webSocket.readyState !== WebSocket.CLOSING) {
        webSocket.close(code, reason);
      }
    });
    if (this.webSocket === webSocket) {
      this.webSocket = undefined;
    }
  }
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
  if (noProxy.trim() === "*") {
    return true;
  }
  const host = hostname.toLowerCase();
  return noProxy
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry) => entry.length > 0)
    .some((entry) => host === entry || host.endsWith(entry.startsWith(".") ? entry : `.${entry}`));
}

/** @internal */
export function createDefaultVoiceAgentWebSocketFactory(): VoiceAgentWebSocketFactory {
  return new NodeWebSocketFactory();
}
