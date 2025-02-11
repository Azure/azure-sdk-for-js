// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { createClientLogger } from "@azure/logger";
import { WebSocketServer } from "ws";
import * as net from "net";

const logger = createClientLogger("websocket-server");

declare module "vitest" {
  interface ProvidedContext {
    port: number;
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

async function createServer(): Promise<{ server: WebSocketServer; port: number }> {
  const port = await getAvailablePort();

  const server = new WebSocketServer({ port });

  server.on("connection", (ws) => {
    logger.info("Client connected");

    ws.on("message", (message) => {
      logger.info(`Received message: ${message}`);

      // Example: Send an error event after receiving a specific message
      if (message.toString() === "trigger error") {
        const error = new Error("This is a test error");
        ws.emit("error", error);
      }

      // Echo the message back to the client
      ws.send(message);
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
    });

    ws.on("error", (error) => {
      logger.error(`WebSocket error: ${error}`);
    });
  });

  logger.info(`WebSocket server is running on ws://localhost:${port}`);

  return {server, port};
}

export default async function ({ provide }: TestProject): Promise<() => void> {
  const {server, port} = await createServer();
  provide("port", port);
  return function (): void {
    server.close();
  };
}
