// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureCliCredential } from "@azure/identity";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Duplex } from "node:stream";
import type { Plugin } from "vite";
import WebSocket, { WebSocketServer, type RawData } from "ws";

const credentialScope = "https://ai.azure.com/.default";
const proxyPath = "/voice";
const targetUrlParameter = "voice-agent-url";
const maxMessageSize = 16 * 1024 * 1024;

function isLoopbackHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function validateLocalRequest(request: IncomingMessage): void {
  const remoteAddress = request.socket.remoteAddress;
  if (
    remoteAddress &&
    remoteAddress !== "127.0.0.1" &&
    remoteAddress !== "::1" &&
    remoteAddress !== "::ffff:127.0.0.1"
  ) {
    throw new Error("Local Azure development routes accept loopback requests only.");
  }

  const origin = request.headers.origin;
  if (!origin) {
    return;
  }
  const originUrl = new URL(origin);
  if (!isLoopbackHost(originUrl.hostname) || originUrl.host !== request.headers.host) {
    throw new Error("Local Azure development requests must use this Vite server's origin.");
  }
}

function parseTargetUrl(rawUrl: string): URL {
  const url = new URL(rawUrl);
  if (url.protocol !== "wss:") {
    throw new Error("The voice agent WebSocket URL must use wss://.");
  }
  if (url.username || url.password) {
    throw new Error("Credentials are not allowed in the voice agent URL.");
  }
  if (!/^[a-z0-9-]+\.services\.ai\.azure\.com$/i.test(url.hostname)) {
    throw new Error("The voice agent URL must target an Azure AI Foundry resource endpoint.");
  }
  if (!/^\/api\/projects\/[^/]+\/agents\/[^/]+\/endpoint\/protocols\/voice$/.test(url.pathname)) {
    throw new Error("The URL is not a Foundry voice agent WebSocket endpoint.");
  }
  url.hash = "";
  return url;
}

function rejectUpgrade(socket: Duplex, statusCode: number, message: string): void {
  if (socket.destroyed) {
    return;
  }
  const body = `${message}\n`;
  socket.write(
    [
      `HTTP/1.1 ${statusCode} Bad Gateway`,
      "Connection: close",
      "Content-Type: text/plain; charset=utf-8",
      `Content-Length: ${Buffer.byteLength(body)}`,
      "",
      body,
    ].join("\r\n"),
  );
  socket.destroy();
}

function closePeer(socket: WebSocket, code: number, reason: Buffer): void {
  if (socket.readyState !== WebSocket.OPEN && socket.readyState !== WebSocket.CONNECTING) {
    return;
  }
  if (code === 1005 || code === 1006) {
    socket.terminate();
  } else {
    socket.close(code, reason.toString());
  }
}

function bridgeSockets(
  browserSocket: WebSocket,
  upstreamSocket: WebSocket,
  bufferedMessages: Array<{ data: RawData; isBinary: boolean }>,
  stopBuffering: () => void,
): void {
  browserSocket.on("message", (data, isBinary) => {
    if (upstreamSocket.readyState === WebSocket.OPEN) {
      upstreamSocket.send(data, { binary: isBinary });
    }
  });
  upstreamSocket.on("message", (data, isBinary) => {
    if (browserSocket.readyState === WebSocket.OPEN) {
      browserSocket.send(data, { binary: isBinary });
    }
  });

  stopBuffering();
  for (const message of bufferedMessages) {
    browserSocket.send(message.data, { binary: message.isBinary });
  }

  browserSocket.on("close", (code, reason) => closePeer(upstreamSocket, code, reason));
  upstreamSocket.on("close", (code, reason) => closePeer(browserSocket, code, reason));
  browserSocket.on("error", () => upstreamSocket.terminate());
  upstreamSocket.on("error", () => browserSocket.terminate());
}

async function openUpstreamSocket(targetUrl: URL, accessToken: string) {
  const socket = new WebSocket(targetUrl, ["realtime"], {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Foundry-Features": "VoiceAgents=V1Preview",
    },
    handshakeTimeout: 60_000,
    maxPayload: maxMessageSize,
    perMessageDeflate: false,
  });
  const bufferedMessages: Array<{ data: RawData; isBinary: boolean }> = [];
  const bufferMessage = (data: RawData, isBinary: boolean): void => {
    bufferedMessages.push({ data, isBinary });
  };
  socket.on("message", bufferMessage);

  await new Promise<void>((resolve, reject) => {
    socket.once("open", resolve);
    socket.once("unexpected-response", (_request, response) => {
      reject(new Error(`Voice agent handshake failed with HTTP ${response.statusCode}.`));
      response.resume();
    });
    socket.once("error", reject);
  });

  return {
    socket,
    bufferedMessages,
    stopBuffering: () => socket.off("message", bufferMessage),
  };
}

/** Local-only Azure CLI authentication and Voice Agent WebSocket bridge. */
export function localAzureDevelopmentPlugin(): Plugin {
  const credential = new AzureCliCredential();
  const webSocketServer = new WebSocketServer({
    noServer: true,
    maxPayload: maxMessageSize,
    perMessageDeflate: false,
  });
  const upstreamSockets = new Set<WebSocket>();

  const tokenEndpoint = (request: IncomingMessage, response: ServerResponse, next: () => void) => {
    if (request.url?.split("?")[0] !== "/api/azure-token") {
      next();
      return;
    }

    void (async () => {
      response.setHeader("Cache-Control", "no-store");
      response.setHeader("Content-Type", "application/json");
      response.setHeader("X-Content-Type-Options", "nosniff");
      try {
        validateLocalRequest(request);
        if (request.method !== "GET") {
          response.statusCode = 405;
          response.setHeader("Allow", "GET");
          response.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        const token = await credential.getToken(credentialScope);
        if (!token) {
          throw new Error("AzureCliCredential returned no access token.");
        }
        response.end(
          JSON.stringify({
            token: token.token,
            expiresOnTimestamp: token.expiresOnTimestamp,
          }),
        );
      } catch (error) {
        console.error("Failed to acquire a local Azure token:", error);
        response.statusCode = 500;
        response.end(
          JSON.stringify({
            error: 'Unable to acquire an Azure CLI access token. Run "az login" and restart Vite.',
          }),
        );
      }
    })();
  };

  const upgradeHandler = (request: IncomingMessage, socket: Duplex, head: Buffer): void => {
    let requestUrl: URL;
    try {
      requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    } catch {
      return;
    }
    const rawTargetUrl = requestUrl.searchParams.get(targetUrlParameter);
    if (requestUrl.pathname !== proxyPath || !rawTargetUrl) {
      return;
    }

    void (async () => {
      let upstreamSocket: WebSocket | undefined;
      try {
        validateLocalRequest(request);
        const targetUrl = parseTargetUrl(rawTargetUrl);
        const token = await credential.getToken(credentialScope);
        if (!token) {
          throw new Error("AzureCliCredential returned no access token.");
        }
        const upstream = await openUpstreamSocket(targetUrl, token.token);
        upstreamSocket = upstream.socket;
        upstreamSockets.add(upstreamSocket);
        upstreamSocket.once("close", () => upstreamSockets.delete(upstreamSocket!));
        webSocketServer.handleUpgrade(request, socket, head, (browserSocket) => {
          bridgeSockets(
            browserSocket,
            upstreamSocket!,
            upstream.bufferedMessages,
            upstream.stopBuffering,
          );
        });
      } catch (error) {
        upstreamSocket?.terminate();
        const message = error instanceof Error ? error.message : String(error);
        console.error("Voice agent proxy connection failed:", message);
        rejectUpgrade(socket, 502, message);
      }
    })();
  };

  const closeProxy = (): void => {
    for (const socket of upstreamSockets) {
      socket.terminate();
    }
    for (const socket of webSocketServer.clients) {
      socket.terminate();
    }
  };

  return {
    name: "local-azure-development",
    configureServer(server) {
      server.middlewares.use(tokenEndpoint);
      server.httpServer?.on("upgrade", upgradeHandler);
      server.httpServer?.once("close", () => {
        server.httpServer?.off("upgrade", upgradeHandler);
        closeProxy();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(tokenEndpoint);
      server.httpServer.on("upgrade", upgradeHandler);
      server.httpServer.once("close", () => {
        server.httpServer.off("upgrade", upgradeHandler);
        closeProxy();
      });
    },
  };
}
