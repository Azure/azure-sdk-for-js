import { AzureCliCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Duplex } from "node:stream";
import type { Plugin } from "vite";
import WebSocket, { WebSocketServer, type RawData } from "ws";

const voiceLiveScope = "https://ai.azure.com/.default";
const voiceAgentProxyPath = "/voice";
const voiceAgentUrlParameter = "voice-agent-url";
const voiceAgentFeatureHeader = "VoiceAgents=V1Preview";
const maxMessageSize = 16 * 1024 * 1024;

function isLoopbackHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function isFoundryHost(hostname: string): boolean {
  return /^[a-z0-9-]+\.services\.ai\.azure\.com$/i.test(hostname);
}

function parseVoiceAgentUrl(rawUrl: string): URL {
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error("The voice agent WebSocket URL is invalid.");
  }

  if (url.protocol !== "wss:") {
    throw new Error("The voice agent URL must use wss://.");
  }
  if (url.username || url.password) {
    throw new Error("Credentials are not allowed in the voice agent URL.");
  }

  if (!isFoundryHost(url.hostname)) {
    throw new Error("The voice agent URL must target an Azure AI Foundry resource endpoint.");
  }
  const isFoundryVoicePath =
    /^\/api\/projects\/[^/]+\/agents\/[^/]+\/endpoint\/protocols\/voice$/.test(url.pathname);
  if (!isFoundryVoicePath) {
    throw new Error("The URL is not an Agents protocols/voice WebSocket endpoint.");
  }

  url.hash = "";
  if (!url.searchParams.has("api-version")) {
    url.searchParams.set("api-version", "v1");
  }
  if (!url.searchParams.has("agent_session_id")) {
    url.searchParams.set(
      "agent_session_id",
      `voice-live-sdk-${randomUUID().replace(/-/g, "").slice(0, 12)}`,
    );
  }
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

function validateBrowserOrigin(request: IncomingMessage): void {
  const origin = request.headers.origin;
  if (!origin) {
    return;
  }

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    throw new Error("The WebSocket request origin is invalid.");
  }

  if (!isLoopbackHost(originUrl.hostname) || originUrl.host !== request.headers.host) {
    throw new Error("Voice agent proxy requests must originate from this loopback Vite server.");
  }
}

function closePeer(socket: WebSocket, code: number, reason: Buffer): void {
  if (socket.readyState !== WebSocket.OPEN && socket.readyState !== WebSocket.CONNECTING) {
    return;
  }

  if (code === 1005 || code === 1006) {
    socket.terminate();
    return;
  }

  socket.close(code, reason.toString());
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
  const forwardUpstreamMessage = (data: RawData, isBinary: boolean): void => {
    if (browserSocket.readyState === WebSocket.OPEN) {
      browserSocket.send(data, { binary: isBinary });
    }
  };
  upstreamSocket.on("message", forwardUpstreamMessage);

  // Register the forwarding listener before removing the temporary buffer.
  // Both operations are synchronous, so no upstream event can be lost between them.
  stopBuffering();
  for (const message of bufferedMessages) {
    browserSocket.send(message.data, { binary: message.isBinary });
  }

  browserSocket.on("close", (code, reason) => closePeer(upstreamSocket, code, reason));
  upstreamSocket.on("close", (code, reason) => closePeer(browserSocket, code, reason));
  browserSocket.on("error", () => upstreamSocket.terminate());
  upstreamSocket.on("error", () => browserSocket.terminate());
}

async function openVoiceAgentSocket(
  targetUrl: URL,
  accessToken: string,
): Promise<{
  socket: WebSocket;
  bufferedMessages: Array<{ data: RawData; isBinary: boolean }>;
  stopBuffering: () => void;
}> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Foundry-Features": voiceAgentFeatureHeader,
  };

  const socket = new WebSocket(targetUrl, {
    headers,
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
      let body = "";
      response.setEncoding("utf8");
      response.on("data", (chunk) => {
        if (body.length < 4_000) {
          body += chunk;
        }
      });
      response.on("end", () => {
        reject(
          new Error(
            `Voice agent handshake failed with HTTP ${response.statusCode}${
              body ? `: ${body}` : ""
            }`,
          ),
        );
      });
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

/**
 * Local-only development support for browser authentication and Voice Agent WebSockets.
 *
 * Browser WebSockets cannot set Authorization or Foundry-Features headers.
 * The proxy accepts the Voice Live SDK connection on loopback, opens the supplied voice-agent
 * URL with those headers, and relays the Voice Live protocol frames unchanged.
 */
export function localAzureDevelopmentPlugin(): Plugin {
  const credential = new AzureCliCredential();
  const webSocketServer = new WebSocketServer({
    noServer: true,
    maxPayload: maxMessageSize,
    perMessageDeflate: false,
  });
  const upstreamSockets = new Set<WebSocket>();

  const tokenEndpoint = async (
    request: IncomingMessage,
    response: ServerResponse,
    next: () => void,
  ): Promise<void> => {
    if (request.url?.split("?")[0] !== "/api/azure-token") {
      next();
      return;
    }

    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Content-Type-Options", "nosniff");

    if (request.method !== "GET") {
      response.statusCode = 405;
      response.setHeader("Allow", "GET");
      response.end(JSON.stringify({ error: "Method not allowed" }));
      return;
    }

    try {
      const token = await credential.getToken(voiceLiveScope);
      if (!token) {
        throw new Error("AzureCliCredential returned no access token");
      }

      response.statusCode = 200;
      response.end(
        JSON.stringify({
          token: token.token,
          expiresOnTimestamp: token.expiresOnTimestamp,
        }),
      );
    } catch (error) {
      console.error("Failed to acquire a Voice Live access token:", error);
      response.statusCode = 500;
      response.end(
        JSON.stringify({
          error: 'Unable to acquire an Azure CLI access token. Run "az login" and restart Vite.',
        }),
      );
    }
  };

  const upgradeHandler = (request: IncomingMessage, socket: Duplex, head: Buffer): void => {
    let requestUrl: URL;
    try {
      requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);
    } catch {
      return;
    }

    const rawTargetUrl = requestUrl.searchParams.get(voiceAgentUrlParameter);
    if (requestUrl.pathname !== voiceAgentProxyPath || !rawTargetUrl) {
      return;
    }

    void (async () => {
      let upstreamSocket: WebSocket | undefined;
      try {
        validateBrowserOrigin(request);
        const targetUrl = parseVoiceAgentUrl(rawTargetUrl);
        const token = await credential.getToken(voiceLiveScope);
        if (!token) {
          throw new Error("AzureCliCredential returned no access token");
        }

        const upstream = await openVoiceAgentSocket(targetUrl, token.token);
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
    upstreamSockets.clear();
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
      server.httpServer?.on("upgrade", upgradeHandler);
      server.httpServer?.once("close", () => {
        server.httpServer?.off("upgrade", upgradeHandler);
        closeProxy();
      });
    },
  };
}
