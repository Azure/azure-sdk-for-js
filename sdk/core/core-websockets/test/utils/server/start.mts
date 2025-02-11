// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { WebSocketServer } from "ws";
import * as https from "https";
import * as fs from "fs/promises";
import * as path from "path";
import * as net from "net";
import { generateCertificates } from "./certs.mjs";
import { logger } from "./logger.mjs";
import type { IncomingMessage, ServerResponse } from "http";

declare module "vitest" {
  interface ProvidedContext {
    secureServerAddress: string;
    insecureServerAddress: string;
  }
}

function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, () => {
      const port = (server.address() as net.AddressInfo).port;
      server.close(() => resolve(port));
    });
    server.on("error", (err) => reject(err));
  });
}

function createWsServer({
  httpsServer,
  port,
}: {
  httpsServer?: https.Server<typeof IncomingMessage, typeof ServerResponse>;
  port?: number;
}): WebSocketServer {
  const server = new WebSocketServer({ server: httpsServer, port });

  server.on("connection", (ws) => {
    logger.info("Client connected");

    ws.on("message", (message) => {
      logger.info(`Received message: ${message}`);

      const msgStr = message.toString();

      if (msgStr.slice(0, 4) === "emit") {
        const [, event] = msgStr.split(" ");
        if (event === "close") {
          ws.close();
        }
        return;
      }

      // Echo the message back to the client
      ws.send(msgStr);
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
    });

    ws.on("error", (error) => {
      logger.error(`WebSocket error: ${error}`);
    });
  });
  return server;
}

async function createServer(): Promise<{
  secureServer: WebSocketServer;
  insecureServer: WebSocketServer;
  httpsServer: https.Server<typeof IncomingMessage, typeof ServerResponse>;
}> {
  const secureServerPort = await getAvailablePort();
  const insecureServerPort = await getAvailablePort();

  await generateCertificates();

  const httpsServer = https.createServer({
    key: await fs.readFile(path.resolve(__dirname, "key.pem")),
    cert: await fs.readFile(path.resolve(__dirname, "cert.pem")),
  });

  const secureServer = createWsServer({ httpsServer });
  const insecureServer = createWsServer({ port: insecureServerPort });

  httpsServer.listen(secureServerPort, () => {
    logger.info(`WebSocket server is running on wss://localhost:${secureServerPort}`);
  });

  return { secureServer, insecureServer, httpsServer };
}

export default async function ({ provide }: TestProject): Promise<() => void> {
  const { secureServer, insecureServer, httpsServer } = await createServer();

  const insecureServerAddress = new URL(
    `ws://localhost:${(insecureServer.address() as net.AddressInfo).port}`,
  );
  const secureServerAddress = new URL(
    `wss://localhost:${(secureServer.address() as net.AddressInfo).port}`,
  );

  provide("insecureServerAddress", insecureServerAddress.toString());
  provide("secureServerAddress", secureServerAddress.toString());

  function logError(err?: Error): void {
    if (err) {
      logger.error(`Failed to close WebSocket server`, err);
    } else {
      logger.info("WebSocket server closed");
    }
  }

  return function (): void {
    secureServer.close(logError);
    httpsServer.close(logError);
    insecureServer.close(logError);
  };
}
