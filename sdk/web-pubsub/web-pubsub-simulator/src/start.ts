// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as https from "https";
import * as fs from "fs/promises";
import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { generateCertificates } from "./certs.js";
import { logger } from "./logger.js";
import type { ConnectedMessage, WebPubSubServer, WebPubSubServerOptions } from "./types.js";
import { protocols, reliableProtocols } from "./constants.js";
import { getDataType } from "./utils.js";

// A global mapping of group names to connected WebSocket clients.
const groups: Map<string, Set<WebSocket>> = new Map();

function createConnectedMessage(isReliable: boolean): ConnectedMessage {
  const connectionId = Math.random().toString(36).substring(2, 15);
  const userId = "dummy-user";
  const reconnectionToken = Math.random().toString(36).substring(2, 15);
  return {
    type: "system",
    event: "connected",
    connectionId,
    userId,
    ...(isReliable ? { reconnectionToken } : {}),
  };
}

// Create a WebSocket server that integrates with HTTPS/Express and simulates Azure Web PubSub commands.
function createWsServerForExpress(server: https.Server): WebSocketServer {
  const wss = new WebSocketServer({ server });
  const reliableMessageCache = new Map<WebSocket, Map<number, any>>();

  wss.on("connection", (ws: WebSocket & { sequenceId: number }, request) => {
    let isReliable = false;

    if (!protocols.includes(ws.protocol)) {
      const disconnectedMessage = {
        type: "system",
        event: "disconnected",
        message:
          "Unsupported protocol. Only json.reliable.webpubsub.azure.v1 or json.webpubsub.azure.v1 accepted.",
      };
      ws.send(JSON.stringify(disconnectedMessage), () => {
        ws.close();
      });
      return;
    }

    if (reliableProtocols.includes(ws.protocol)) {
      isReliable = true;
      ws.sequenceId = 0;
    }

    // Parse the hub name from the URL.
    // Expected URL format: /client/hubs/<hub_name>?access_token=<token>
    let hubName = "default";
    try {
      const reqUrl = new URL(request.url || "", `https://${request.headers.host}`);
      const parts = reqUrl.pathname.split("/");
      if (parts.length >= 4 && parts[1] === "client" && parts[2] === "hubs") {
        hubName = parts[3];
      }
    } catch (e) {
      logger.error("Error parsing connection URL", e);
    }
    logger.info(`Client connected to hub '${hubName}' via WebSocket`);

    // Send connected message
    const connectedMessage = createConnectedMessage(isReliable);
    ws.send(JSON.stringify(connectedMessage));
    logger.info(`Sent connected message to client: ${JSON.stringify(connectedMessage)}`);

    ws.on("message", (message) => {
      const msgStr = message.toString();
      logger.info(`Received message: ${msgStr}`);

      // Attempt to parse as JSON for structured messages.
      let parsed: any = null;
      try {
        parsed = JSON.parse(msgStr);
      } catch (e) {
        logger.error(`Error parsing message: ${msgStr}`, e);
      }

      if (parsed?.type === "ping") {
        // Respond with pong for ping messages.
        ws.send(JSON.stringify({ type: "pong" }));
        return;
      } else if (parsed?.type === "sequenceAck") {
        const ackSequence = Number(parsed.sequenceId);
        if (!isNaN(ackSequence)) {
          const cache = reliableMessageCache.get(ws);
          if (cache) {
            for (const key of cache.keys()) {
              if (key < ackSequence) {
                cache.delete(key);
              }
            }
          }
        }
        return;
      } else if (parsed?.type === "joinGroup") {
        const groupName: string = parsed.group;
        if (!groupName) {
          ws.send(
            JSON.stringify({ type: "error", event: "joinGroup", message: "group name required" }),
          );
          return;
        }
        let group = groups.get(groupName);
        if (!group) {
          group = new Set();
          groups.set(groupName, group);
        }
        group.add(ws);
        if (parsed.ackId !== undefined) {
          const ackMessage = {
            type: "ack",
            ackId: parsed.ackId,
            success: true,
          };
          ws.send(JSON.stringify(ackMessage));
        } else {
          ws.send(
            JSON.stringify({
              type: "notification",
              event: "joinGroup",
              message: `Joined group ${groupName}`,
            }),
          );
        }
      } else if (parsed?.type === "leaveGroup") {
        const groupName: string = parsed.group;
        if (!groupName) {
          ws.send(
            JSON.stringify({ type: "error", event: "leaveGroup", message: "group name required" }),
          );
          return;
        }
        const group = groups.get(groupName);
        if (group) {
          group.delete(ws);
        }
        if (parsed.ackId !== undefined) {
          const ackMessage = {
            type: "ack",
            ackId: parsed.ackId,
            success: true,
          };
          ws.send(JSON.stringify(ackMessage));
        } else {
          ws.send(
            JSON.stringify({
              type: "notification",
              event: "leaveGroup",
              message: `Left group ${groupName}`,
            }),
          );
        }
      } else if (parsed?.type === "sendToGroup") {
        const groupName: string = parsed.group;
        if (!groupName) {
          ws.send(
            JSON.stringify({ type: "error", event: "sendToGroup", message: "group name required" }),
          );
          return;
        }
        const group = groups.get(groupName);
        if (!group) {
          ws.send(
            JSON.stringify({
              type: "error",
              event: "sendToGroup",
              message: `group ${groupName} does not exist`,
            }),
          );
          return;
        }
        const ackId = parsed.ackId;
        const data = parsed.data;
        const dataType = parsed.dataType;
        const noEcho = parsed.noEcho;
        group.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && (client !== ws || !noEcho)) {
            let messageToSend: any;
            if (isReliable) {
              const seq = ++ws.sequenceId;
              messageToSend = {
                type: "message",
                from: "group",
                fromUserId: null,
                group: groupName,
                dataType,
                data,
                ackId,
                sequenceId: seq,
              };
              // Store the message in the reliable cache for this client.
              if (!reliableMessageCache.has(client)) {
                reliableMessageCache.set(client, new Map<number, any>());
              }
              const clientCache = reliableMessageCache.get(client)!;
              clientCache.set(seq, messageToSend);
              // If the cache exceeds 1000 messages, close the connection.
              if (clientCache.size > 1000) {
                logger.error(
                  `Closing connection: message cache exceeded 1000 messages for client with protocol ${client.protocol}`,
                );
                client.close();
                return;
              }
            } else {
              messageToSend = {
                type: "message",
                from: "group",
                fromUserId: null,
                group: groupName,
                dataType,
                data,
                ackId,
              };
            }
            client.send(JSON.stringify(messageToSend));
          }
        });

        if (parsed.ackId !== undefined) {
          const ackMessage = {
            type: "ack",
            ackId: parsed.ackId,
            success: true,
          };
          ws.send(JSON.stringify(ackMessage));
        } else {
          ws.send(
            JSON.stringify({
              type: "notification",
              event: "sendToGroup",
              message: `Message sent to group ${groupName}`,
            }),
          );
        }
      } else if (parsed && parsed.event === "sendEvent") {
        // Handle SendEventMessage
        // For custom events, use a separate property (customEvent) for the event name.
        const customEvent = parsed.customEvent;
        if (!customEvent) {
          ws.send(
            JSON.stringify({ type: "error", event: "sendEvent", message: "event name required" }),
          );
          return;
        }
        const data = parsed.data;
        const dataType = parsed.dataType;
        logger.info(`Received event '${customEvent}' with dataType: ${dataType}`);

        // In this simulator, we simply echo back the event message.
        const eventMessage = {
          type: "command",
          event: "sendEvent",
          customEvent,
          dataType,
          data,
        };
        ws.send(JSON.stringify(eventMessage));

        if (parsed.ackId !== undefined) {
          const ackMessage = {
            type: "ack",
            event: "sendEvent",
            ackId: parsed.ackId,
            success: true,
          };
          ws.send(JSON.stringify(ackMessage));
        } else {
          ws.send(
            JSON.stringify({
              type: "notification",
              event: "sendEvent",
              message: `Event ${customEvent} processed`,
            }),
          );
        }
      } else {
        // Unrecognized message type; echo back to client.
        ws.send(
          JSON.stringify({
            type: "error",
            event: "unrecognized",
            message: `Unrecognized message: ${msgStr}`,
          }),
        );
      }
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
      groups.forEach((clients) => {
        if (clients.has(ws)) {
          clients.delete(ws);
        }
      });
    });

    ws.on("error", (error) => {
      logger.error(`WebSocket error: ${error}`);
    });
  });

  return wss;
}

async function createServer({ port }: { port?: number }): Promise<WebPubSubServer> {
  const securePort = port ?? 443;

  const { certPath, keyPath } = await generateCertificates();
  const key = await fs.readFile(keyPath);
  const cert = await fs.readFile(certPath);

  const app = express();
  app.use(express.json());

  app.get("/negotiate", (req, res) => {
    const token = "dummy-token";
    const hubName = (req.query.hub as string) || "default";
    const serviceName = (req.query.service as string) || "testservice";
    const url = `wss://${serviceName}.webpubsub.azure.com/client/hubs/${hubName}?access_token=${token}`;
    res.json({ url, accessToken: token });
  });

  app.post("/eventhandler", (req, res) => {
    logger.info(`Event received: ${JSON.stringify(req.body)}`);
    res.status(200).send("ok");
  });

  const httpsServer = https.createServer({ key, cert }, app);
  const secureWsServer = createWsServerForExpress(httpsServer);

  app.post("/admin/force-reconnect", (_, res) => {
    logger.info("Admin call: /admin/force-reconnect invoked");
    secureWsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const connectedMessage = createConnectedMessage(
          reliableProtocols.includes(client.protocol),
        );
        client.send(JSON.stringify(connectedMessage));
        logger.info(
          `Force reconnect: Sent connected message to client with protocol ${client.protocol}`,
        );
      }
    });
    logger.info("Admin call: /admin/force-reconnect completed");
    res.json({ status: "Force reconnect initiated" });
  });

  app.post("/admin/send-message", (req, res) => {
    logger.info(`Admin call: /admin/send-message invoked with payload ${JSON.stringify(req.body)}`);
    secureWsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        let seq: number | undefined;
        if (reliableProtocols.includes(client.protocol)) {
          seq = ((client as any).sequenceId ?? 0) + 1;
          (client as any).sequenceId = seq;
        }
        const messageObj = {
          type: "message",
          from: "server",
          dataType: getDataType(req.headers["content-type"]),
          data: req.body,
          sequenceId: seq,
        };
        client.send(JSON.stringify(messageObj));
        logger.info(
          `Admin send-message: Sent message to client with protocol ${client.protocol} (sequenceId: ${seq})`,
        );
      }
    });
    logger.info("Admin call: /admin/send-message completed");
    res.json({ status: "succeeded" });
  });

  httpsServer.listen(securePort, () => {
    logger.info(
      `Azure Web PubSub Simulator secure server is running at wss://localhost:${securePort}`,
    );
    logger.info(`Negotiation endpoint available at https://localhost:${securePort}/negotiate`);
    logger.info(`Event handler available at https://localhost:${securePort}/eventhandler`);
    logger.info(`Admin endpoint available at https://localhost:${securePort}/admin`);
  });

  const logError = (err?: Error): void => {
    if (err) {
      logger.error("Failed to close server", err);
    }
  };

  return {
    close: () => {
      secureWsServer.close(logError);
      httpsServer.close(logError);
      logger.info("Server closed");
    },
    webPubSubClientUrl: `wss://localhost:${securePort}`,
    httpsUrl: `https://localhost:${securePort}`,
    ws: secureWsServer,
  };
}

export function startWebPubSubServer(
  options: WebPubSubServerOptions = {},
): Promise<WebPubSubServer> {
  return createServer(options);
}
