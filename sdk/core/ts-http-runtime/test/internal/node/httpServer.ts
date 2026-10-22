// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import http from "node:http";
import https from "node:https";
import net from "node:net";
import { readFileSync } from "node:fs";
import { resolve as resolvePath } from "node:path";
import type { Socket } from "node:net";

export const testCertificate = readFileSync(
  resolvePath("..", "..", "..", "eng", "common", "testproxy", "dotnet-devcert.crt"),
);
const testPfx = readFileSync(
  resolvePath("..", "..", "..", "eng", "common", "testproxy", "dotnet-devcert.pfx"),
);

export async function listen(server: net.Server): Promise<number> {
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.removeListener("error", reject);
      resolve();
    });
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Expected a loopback TCP address");
  }
  return address.port;
}

export function trackServer(server: net.Server): () => Promise<void> {
  const sockets = new Set<Socket>();
  server.on("connection", (socket: Socket) => {
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
  });
  return async () => {
    for (const socket of sockets) socket.destroy();
    if (server.listening) {
      await new Promise<void>((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      );
    }
  };
}

export async function createServer(secure = false): Promise<{
  server: http.Server;
  url: string;
  agent: http.Agent;
  close: () => Promise<void>;
}> {
  const server = secure
    ? https.createServer({ pfx: testPfx, passphrase: "password" })
    : http.createServer();
  const closeServer = trackServer(server);
  const port = await listen(server);
  const agent = secure
    ? new https.Agent({ keepAlive: true, ca: testCertificate })
    : new http.Agent({ keepAlive: true });
  return {
    server,
    url: `${secure ? "https" : "http"}://localhost:${port}`,
    agent,
    close: async () => {
      agent.destroy();
      await closeServer();
    },
  };
}

export async function createRelay(
  targetPort: number,
  delayInMs: number,
): Promise<{ port: number; close: () => Promise<void> }> {
  const upstreams = new Set<Socket>();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const server = net.createServer((socket) => {
    socket.pause();
    const timer = setTimeout(() => {
      timers.delete(timer);
      if (socket.destroyed) return;
      const upstream = net.connect(targetPort, "127.0.0.1");
      upstreams.add(upstream);
      upstream.on("error", () => socket.destroy());
      socket.on("error", () => upstream.destroy());
      upstream.once("close", () => upstreams.delete(upstream));
      socket.once("close", () => upstream.destroy());
      socket.pipe(upstream).pipe(socket);
    }, delayInMs);
    timers.add(timer);
    socket.once("close", () => {
      clearTimeout(timer);
      timers.delete(timer);
    });
  });
  const closeServer = trackServer(server);
  const port = await listen(server);
  return {
    port,
    close: async () => {
      for (const timer of timers) clearTimeout(timer);
      for (const socket of upstreams) socket.destroy();
      await closeServer();
    },
  };
}

export async function createProxy(
  connectDelayInMs = 0,
): Promise<{ url: string; close: () => Promise<void> }> {
  const upstreams = new Set<Socket>();
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const server = http.createServer();
  const forward = (incoming: http.IncomingMessage, outgoing: http.ServerResponse): void => {
    const target = new URL(incoming.url ?? "");
    const request = http.request(target, { method: incoming.method, headers: incoming.headers });
    request.on("continue", () => outgoing.writeContinue());
    request.on("response", (response) => {
      outgoing.writeHead(response.statusCode ?? 500, response.headers);
      response.pipe(outgoing);
    });
    request.on("error", (error) => outgoing.destroy(error));
    incoming.pipe(request);
  };
  server.on("request", forward);
  server.on("checkContinue", forward);
  server.on("connect", (request, socket, head) => {
    const target = new URL(`http://${request.url}`);
    const timer = setTimeout(() => {
      timers.delete(timer);
      if (socket.destroyed) return;
      const upstream = net.connect(Number(target.port), target.hostname, () => {
        socket.write("HTTP/1.1 200 Connection Established\r\n\r\n");
        if (head.length) upstream.write(head);
        socket.pipe(upstream).pipe(socket);
      });
      upstreams.add(upstream);
      upstream.on("error", () => socket.destroy());
      socket.on("error", () => upstream.destroy());
      socket.once("close", () => upstream.destroy());
      upstream.once("close", () => upstreams.delete(upstream));
    }, connectDelayInMs);
    timers.add(timer);
  });
  const closeServer = trackServer(server);
  const port = await listen(server);
  return {
    url: `http://127.0.0.1:${port}`,
    close: async () => {
      for (const timer of timers) clearTimeout(timer);
      for (const socket of upstreams) socket.destroy();
      await closeServer();
    },
  };
}
