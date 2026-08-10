// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";

interface WebSocketHandlers {
  onMessage(data: string | ArrayBuffer): void;
  onClose(code: number, reason: string, wasClean: boolean): void;
  onError(error: Error): void;
}

interface ConnectOptions {
  url: string;
  protocols: string[];
  connectionTimeoutInMs: number;
  abortSignal?: AbortSignalLike;
}

class LocalVoiceAgentWebSocketTransport {
  private webSocket?: WebSocket;
  private handlers?: WebSocketHandlers;

  public setHandlers(handlers: WebSocketHandlers): void {
    this.handlers = handlers;
  }

  public async connect(options: ConnectOptions): Promise<void> {
    const bridgeUrl = new URL(window.location.origin);
    bridgeUrl.protocol = bridgeUrl.protocol === "https:" ? "wss:" : "ws:";
    bridgeUrl.pathname = "/voice";
    bridgeUrl.searchParams.set("voice-agent-url", options.url);

    await new Promise<void>((resolve, reject) => {
      let settled = false;
      this.webSocket = new WebSocket(bridgeUrl, options.protocols);
      this.webSocket.binaryType = "arraybuffer";
      const timeout = window.setTimeout(() => {
        if (!settled) {
          settled = true;
          this.webSocket?.close();
          reject(
            new Error(`Voice agent bridge timed out after ${options.connectionTimeoutInMs}ms.`),
          );
        }
      }, options.connectionTimeoutInMs);
      const abort = (): void => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timeout);
          this.webSocket?.close();
          reject(new Error("Voice agent bridge connection was cancelled."));
        }
      };
      if (options.abortSignal?.aborted) {
        abort();
        return;
      }
      options.abortSignal?.addEventListener("abort", abort);
      this.webSocket.addEventListener("open", () => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timeout);
          options.abortSignal?.removeEventListener("abort", abort);
          resolve();
        }
      });
      this.webSocket.addEventListener("message", (event) => {
        if (typeof event.data === "string" || event.data instanceof ArrayBuffer) {
          this.handlers?.onMessage(event.data);
        } else if (event.data instanceof Blob) {
          void event.data
            .arrayBuffer()
            .then((data) => this.handlers?.onMessage(data))
            .catch((error: unknown) =>
              this.handlers?.onError(error instanceof Error ? error : new Error(String(error))),
            );
        }
      });
      this.webSocket.addEventListener("close", (event) => {
        window.clearTimeout(timeout);
        options.abortSignal?.removeEventListener("abort", abort);
        this.handlers?.onClose(event.code, event.reason, event.wasClean);
      });
      this.webSocket.addEventListener("error", () => {
        const error = new Error("Voice agent bridge connection failed.");
        this.handlers?.onError(error);
        if (!settled) {
          settled = true;
          window.clearTimeout(timeout);
          options.abortSignal?.removeEventListener("abort", abort);
          reject(error);
        }
      });
    });
  }

  public async send(data: string, abortSignal?: AbortSignalLike): Promise<void> {
    if (!this.webSocket || this.webSocket.readyState !== WebSocket.OPEN) {
      throw new Error("Voice agent bridge is not connected.");
    }
    if (abortSignal?.aborted) {
      throw new Error("Voice agent bridge send was cancelled.");
    }
    this.webSocket.send(data);
  }

  public async close(code: number, reason: string): Promise<void> {
    if (!this.webSocket || this.webSocket.readyState === WebSocket.CLOSED) {
      return;
    }
    await new Promise<void>((resolve) => {
      this.webSocket!.addEventListener("close", () => resolve(), { once: true });
      if (this.webSocket!.readyState !== WebSocket.CLOSING) {
        this.webSocket!.close(code, reason);
      }
    });
  }
}

/** Structurally implements the SDK's internal WebSocket factory contract. */
export const localVoiceAgentWebSocketFactory = {
  create: () => new LocalVoiceAgentWebSocketTransport(),
};
