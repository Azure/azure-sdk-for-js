// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import https from "https";
import * as fs from "fs/promises";
import { getAvailablePort } from "../utils.js";
import { WebSocket, WebSocketServer } from "ws";
import { logger } from "./logger.js";
import { generateCertificates } from "./certs.js";

export interface WssProxy {
  start(): Promise<void>;
  stop(): Promise<void>;
  wssUrl: string;
  httpsUrl: string;
}

function isReservedCode(code: number): boolean {
  return [1005, 1006, 1015].includes(code);
}

export async function createWssProxy(
  targetUrl: string,
  options?: {
    localPort?: number;
    dropProbability?: number;
  },
): Promise<WssProxy> {
  const localPort = options?.localPort ?? (await getAvailablePort());
  let dropProbability = options?.dropProbability ?? 1.0;

  const { certPath, keyPath } = await generateCertificates();
  const cert = await fs.readFile(certPath);
  const key = await fs.readFile(keyPath);

  const httpsServer = https.createServer({ cert, key });

  // Maintain a collection of active target connections.
  const activeTargetConnections: Set<WebSocket> = new Set();
  let closeCode: number | undefined;

  httpsServer.on("request", (req, res) => {
    if (req.method === "POST" && req.url === "/dropProbability") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        try {
          const { dropProbability: newProbability } = JSON.parse(body);
          dropProbability = newProbability;
          logger.info(
            `Drop probability manually updated via HTTP POST to ${dropProbability * 100}%`,
          );
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ updated: true, dropProbability }));
        } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Invalid JSON payload" }));
        }
      });
    } else if (req.method === "POST" && req.url === "/close") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        let closeReason: string = "closed";
        if (body) {
          try {
            const parsed = JSON.parse(body);
            if (typeof parsed.closeCode === "number") {
              closeCode = parsed.closeCode;
            }
            if (typeof parsed.closeReason === "string") {
              closeReason = parsed.closeReason;
            }
          } catch (e) {
            logger.info("Invalid JSON payload for /close; using default close code 1000");
          }
        }
        closeCode ??= 1000;
        if (isReservedCode(closeCode)) {
          logger.error(`Rejected /close request: Reserved close code ${closeCode} is not allowed.`);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ error: `Close code ${closeCode} is reserved and cannot be used.` }),
          );
          return;
        }

        logger.info(
          `Received /close request: Closing all target connections with code ${closeCode}${closeReason ? ` and reason "${closeReason}"` : ""}`,
        );
        activeTargetConnections.forEach((targetWs) => {
          targetWs.close(closeCode, closeReason);
        });
        logger.info("All target connections closed");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ closed: true, closeCode, closeReason }));
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  });

  // Create the WebSocket server instance. We will let our own "upgrade" handler control the handshake.
  const wss = new WebSocketServer({ noServer: true });

  // Intercept the HTTPS upgrade event to simulate a drop during the handshake.
  httpsServer.on("upgrade", (req, socket, head) => {
    if (Math.random() < dropProbability) {
      logger.info("Dropping connection during handshake");
      socket.destroy();
    } else {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    }
  });

  wss.on("connection", (clientWs, req) => {
    logger.info(`Client connected from ${req.socket.remoteAddress}`);

    if (Math.random() < dropProbability) {
      logger.info("Dropping connection before target connection establishment");
      clientWs.close();
      return;
    }

    const protocolsHeader = req.headers["sec-websocket-protocol"];
    let protocols: string | string[] | undefined;
    if (protocolsHeader) {
      protocols = protocolsHeader
        .toString()
        .split(",")
        .map((s) => s.trim());
      logger.info(`Forwarding protocols: ${protocols}`);
    }

    const targetWs = new WebSocket(targetUrl, protocols, { rejectUnauthorized: false });
    targetWs.binaryType = "arraybuffer";
    activeTargetConnections.add(targetWs);

    targetWs.on("open", () => {
      logger.info(`Connected to target ${targetUrl}`);

      clientWs.on("message", (data) => {
        const message = data.toString();
        if (Math.random() < dropProbability) {
          logger.info(`Dropped message from client: ${message}`);
        } else {
          logger.info(`Forwarding message to target: ${message}`);
          targetWs.send(message);
        }
      });

      targetWs.on("message", (data) => {
        const message = data.toString();
        if (Math.random() < dropProbability) {
          logger.info(`Dropped message from target: ${message}`);
        } else {
          logger.info(`Forwarding message to client: ${message}`);
          clientWs.send(message);
        }
      });

      clientWs.on("close", (code, reason) => {
        logger.info(`Client disconnected with code ${code} and reason "${reason}"`);
        if (isReservedCode(code)) {
          targetWs.close(1000, "closed");
        } else {
          targetWs.close(closeCode ? closeCode : code, reason);
        }
      });
      targetWs.on("close", (code, reason) => {
        logger.info(`Target disconnected with code ${code} and reason "${reason}"`);
        activeTargetConnections.delete(targetWs);
        if (isReservedCode(code)) {
          clientWs.close(1000, "closed");
        } else {
          clientWs.close(closeCode ? closeCode : code, reason);
        }
        closeCode = undefined;
      });

      clientWs.on("error", (err) => logger.error("Client WebSocket error:", err));
      targetWs.on("error", (err) => logger.error("Target WebSocket error:", err));
    });

    targetWs.on("error", (err) => {
      logger.error("Error connecting to target:", err);
      clientWs.close();
    });
  });

  return {
    start: (): Promise<void> => {
      return new Promise((resolve, reject) => {
        httpsServer.listen(localPort, () => {
          logger.info(`WSS proxy is running on port ${localPort}`);
          resolve();
        });
        httpsServer.on("error", reject);
      });
    },
    stop: (): Promise<void> => {
      return new Promise((resolve, reject) => {
        wss.close(() => {
          httpsServer.close((err?: Error) => {
            if (err) {
              reject(err);
            } else {
              logger.info("WSS proxy stopped");
              resolve();
            }
          });
        });
      });
    },
    wssUrl: `wss://localhost:${localPort}`,
    httpsUrl: `https://localhost:${localPort}`,
  };
}
