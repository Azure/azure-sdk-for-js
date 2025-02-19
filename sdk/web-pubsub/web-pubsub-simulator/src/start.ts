// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as https from "https";
import * as fs from "fs/promises";
import type { Request, Response } from "express";
import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import { generateCertificates } from "./certs.js";
import { logger } from "./logger.js";
import type { Connection, WebPubSubServer, WebPubSubServerOptions } from "./types.js";
import { protocols, reliableProtocols } from "./constants.js";
import {
  closeClientConnection,
  createConnectedMessage,
  getDataType,
  getOrCreate,
  parseUrl,
  requireQueryParam,
  sendError,
  sendServerMessage,
  sendWsMessage,
} from "./utils.js";

function createWsServerForExpress(
  server: https.Server,
  options: { hubs?: string[] } = {},
): {
  server: WebSocketServer;
  hubConnections: Map<string, Set<Connection>>;
  hubGroups: Map<string, Map<string, Set<Connection>>>;
} {
  const wsServer = new WebSocketServer({ server });
  const hubConnections = new Map<string, Set<Connection>>();
  const hubGroups = new Map<string, Map<string, Set<Connection>>>();

  // Preinitialize hubs if provided.
  if (options.hubs?.length) {
    options.hubs.forEach((hub) => hubConnections.set(hub, new Set<Connection>()));
  }
  const dynamicHubs = hubConnections.size === 0;
  const reliableMessageCache = new Map<WebSocket, Map<number, any>>();

  wsServer.on("connection", (ws: Connection, request) => {
    const isReliable = reliableProtocols.includes(ws.protocol);
    if (!protocols.includes(ws.protocol)) {
      closeClientConnection(ws, `Unsupported protocol. Only ${protocols.join(", ")} accepted.`);
      return;
    }
    if (isReliable) {
      ws.sequenceId = 0;
    }

    const { accessToken, hubName } = parseUrl(request.url || "", `https://${request.headers.host}`);

    if (!hubName) {
      closeClientConnection(ws, "Hub name required in URL");
      return;
    }
    if (!accessToken) {
      closeClientConnection(ws, "Access token required in URL");
      return;
    }

    if (!hubConnections.has(hubName)) {
      if (!dynamicHubs) {
        closeClientConnection(ws, `Hub '${hubName}' does not exist.`);
        return;
      }
      hubConnections.set(hubName, new Set<Connection>());
    }
    hubConnections.get(hubName)!.add(ws);

    ws.connectionId = Math.random().toString(36).substring(2, 15);
    logger.info(`Client connected to hub '${hubName}' via WebSocket`);
    const connectedMsg = createConnectedMessage(ws.connectionId, isReliable);
    sendWsMessage(ws, connectedMsg);
    logger.info(`Sent connected message: ${JSON.stringify(connectedMsg)}`);

    ws.on("message", (message) => {
      const msgStr = message.toString();
      logger.info(`Received message: ${msgStr}`);
      let parsed: any;
      try {
        parsed = JSON.parse(msgStr);
      } catch (e) {
        logger.error(`Error parsing message: ${msgStr}`, e);
        return;
      }
      switch (parsed?.type) {
        case "ping":
          sendWsMessage(ws, { type: "pong" });
          break;
        case "sequenceAck": {
          const ackSequence = Number(parsed.sequenceId);
          if (!isNaN(ackSequence)) {
            const cache = reliableMessageCache.get(ws);
            if (cache) {
              for (const key of cache.keys()) {
                if (key < ackSequence) cache.delete(key);
              }
            }
          }
          break;
        }
        case "joinGroup":
          handleJoinGroup(ws, parsed, hubName!, hubGroups);
          break;
        case "leaveGroup":
          handleLeaveGroup(ws, parsed, hubName!, hubGroups);
          break;
        case "sendToGroup":
          handleSendToGroup(ws, parsed, hubName!, hubGroups, reliableMessageCache);
          break;
        case "sendEvent":
          handleSendEvent(ws, parsed);
          break;
        default:
          sendWsMessage(ws, {
            type: "error",
            event: "unrecognized",
            message: `Unrecognized message: ${msgStr}`,
          });
      }
    });

    ws.on("close", () => {
      logger.info("Client disconnected");
      hubConnections.get(hubName!)?.delete(ws);
      const groupsForHub = hubGroups.get(hubName!);
      groupsForHub?.forEach((clientSet) => clientSet.delete(ws));
    });
    ws.on("error", (err) => logger.error(`WebSocket error: ${err}`));
  });

  return {
    server: wsServer,
    hubConnections,
    hubGroups,
  };
}

function handleJoinGroup(
  ws: WebSocket,
  msg: any,
  hubName: string,
  hubGroups: Map<string, Map<string, Set<WebSocket>>>,
): void {
  const groupName: string = msg.group;
  if (!groupName) {
    sendWsMessage(ws, { type: "error", event: "joinGroup", message: "group name required" });
    return;
  }
  const groupsForHub = getOrCreate(hubGroups, hubName, () => new Map<string, Set<WebSocket>>());
  const group = getOrCreate(groupsForHub, groupName, () => new Set<WebSocket>());
  group.add(ws);
  if (msg.ackId !== undefined) {
    sendWsMessage(ws, { type: "ack", ackId: msg.ackId, success: true });
  } else {
    sendWsMessage(ws, {
      type: "notification",
      event: "joinGroup",
      message: `Joined group ${groupName}`,
    });
  }
}

function handleLeaveGroup(
  ws: WebSocket,
  msg: any,
  hubName: string,
  hubGroups: Map<string, Map<string, Set<WebSocket>>>,
): void {
  const groupName: string = msg.group;
  if (!groupName) {
    sendWsMessage(ws, { type: "error", event: "leaveGroup", message: "group name required" });
    return;
  }
  const groupsForHub = hubGroups.get(hubName);
  const group = groupsForHub?.get(groupName);
  if (group) {
    group.delete(ws);
  }
  if (msg.ackId !== undefined) {
    sendWsMessage(ws, { type: "ack", ackId: msg.ackId, success: true });
  } else {
    sendWsMessage(ws, {
      type: "notification",
      event: "leaveGroup",
      message: `Left group ${groupName}`,
    });
  }
}

function handleSendToGroup(
  ws: Connection,
  msg: any,
  hubName: string,
  hubGroups: Map<string, Map<string, Set<WebSocket>>>,
  reliableMessageCache: Map<WebSocket, Map<number, any>>,
): void {
  const groupName: string = msg.group;
  if (!groupName) {
    sendWsMessage(ws, { type: "error", event: "sendToGroup", message: "group name required" });
    return;
  }
  const groupsForHub = hubGroups.get(hubName);
  if (!groupsForHub || !groupsForHub.has(groupName)) {
    sendWsMessage(ws, {
      type: "error",
      event: "sendToGroup",
      message: `group ${groupName} does not exist`,
    });
    return;
  }
  const group = groupsForHub.get(groupName)!;
  const { ackId, data, dataType, noEcho } = msg;
  group.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && (client !== ws || !noEcho)) {
      let payload: any;
      if (reliableProtocols.includes(client.protocol)) {
        const seq = ++ws.sequenceId;
        payload = {
          type: "message",
          from: "group",
          fromUserId: null,
          group: groupName,
          dataType,
          data,
          ackId,
          sequenceId: seq,
        };
        if (!reliableMessageCache.has(client)) {
          reliableMessageCache.set(client, new Map<number, any>());
        }
        reliableMessageCache.get(client)!.set(seq, payload);
      } else {
        payload = {
          type: "message",
          from: "group",
          fromUserId: null,
          group: groupName,
          dataType,
          data,
          ackId,
        };
      }
      sendWsMessage(client, payload);
    }
  });
  if (msg.ackId !== undefined) {
    sendWsMessage(ws, { type: "ack", ackId: msg.ackId, success: true });
  } else {
    sendWsMessage(ws, {
      type: "notification",
      event: "sendToGroup",
      message: `Message sent to group ${groupName}`,
    });
  }
}

function handleSendEvent(ws: WebSocket, msg: any): void {
  const customEvent = msg.customEvent;
  if (!customEvent) {
    sendWsMessage(ws, { type: "error", event: "sendEvent", message: "event name required" });
    return;
  }
  const { data, dataType } = msg;
  logger.info(`Received event '${customEvent}' with dataType: ${dataType}`);
  sendWsMessage(ws, { type: "command", event: "sendEvent", customEvent, dataType, data });
  if (msg.ackId !== undefined) {
    sendWsMessage(ws, { type: "ack", event: "sendEvent", ackId: msg.ackId, success: true });
  } else {
    sendWsMessage(ws, {
      type: "notification",
      event: "sendEvent",
      message: `Event ${customEvent} processed`,
    });
  }
}

async function createServer({ port, hubs }: WebPubSubServerOptions): Promise<WebPubSubServer> {
  const securePort = port ?? 443;
  const { certPath, keyPath } = await generateCertificates();
  const [key, cert] = await Promise.all([fs.readFile(keyPath), fs.readFile(certPath)]);
  const app = express();
  app.use(express.json());

  const httpsServer = https.createServer({ key, cert }, app);
  const wssServer = createWsServerForExpress(httpsServer, { hubs });

  app.post("/api/hubs/:hub/\\:generateToken", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const apiVersion = req.query["api-version"] as string | undefined;
    const userId = req.query["userId"] as string | undefined;
    const role = req.query["role"] as string | undefined;
    const minutesToExpire = req.query["minutesToExpire"] as string | undefined;
    const group = req.query["group"] as string | undefined;
    const clientType = req.query["clientType"] as string | undefined;

    logger.info(
      `Received generate token API for hub "${hub}" with apiVersion=[${apiVersion}], userId=[${userId}], role=[${role}], minutesToExpire=[${minutesToExpire}], group=[${group}], clientType=[${clientType}]`,
    );

    if (!apiVersion) {
      return sendError(res, 400, "api-version query parameter is required");
    }

    let token = `dummy-token-for-${hub}`;
    if (userId) token += `-${userId}`;
    if (role) token += `-${role}`;
    if (minutesToExpire) token += `-${minutesToExpire}`;
    if (group) token += `-${group}`;
    if (clientType) token += `-${clientType}`;
    token += `-${Math.random().toString(36).substring(2, 15)}`;

    res.json({ token });
  });

  app.post("/api/hubs/:hub/\\:send", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const apiVersion = requireQueryParam(req, res, "api-version");
    if (!apiVersion) return;
    const data = req.body.message;
    if (!data) return sendError(res, 400, "The message property is required");

    const connections = wssServer.hubConnections.get(hub);
    if (!connections) return sendError(res, 400, `Hub "${hub}" does not exist`);
    res.sendStatus(202);

    const dataType = getDataType(req.headers["content-type"]);
    const excluded = req.query.excluded;
    const excludedSet = new Set(
      typeof excluded === "string" ? [excluded] : (excluded as string[]) || [],
    );
    connections.forEach((client) => {
      if (excludedSet.has(client.connectionId) || client.readyState !== WebSocket.OPEN) {
        return;
      }
      const sequenceId = sendServerMessage(client, dataType, data);
      logger.info(
        `Sent message to client in hub "${hub}" with protocol ${client.protocol} (sequenceId: ${sequenceId})`,
      );
    });
  });

  app.post("/api/hubs/:hub/connections/:connectionId/\\:send", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const connectionId = req.params.connectionId;
    const apiVersion = requireQueryParam(req, res, "api-version");
    if (!apiVersion) return;
    const data = req.body.message;
    if (!data) return sendError(res, 400, "The message property is required");

    const connections = wssServer.hubConnections.get(hub);
    if (!connections) return sendError(res, 400, `Hub "${hub}" does not exist`);

    for (const client of connections) {
      if (client.connectionId === connectionId) {
        res.sendStatus(202);
        const dataType = getDataType(req.headers["content-type"]);
        const sequenceId = sendServerMessage(client, dataType, data);
        logger.info(
          `Sent message to connection "${connectionId}" in hub "${hub}" with protocol ${client.protocol} (sequenceId: ${sequenceId})`,
        );
        return;
      }
    }
    return sendError(res, 404, `Connection "${connectionId}" not found in hub "${hub}"`);
  });

  app.post("/api/hubs/:hub/groups/:group/\\:send", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const groupName = req.params.group;
    const apiVersion = requireQueryParam(req, res, "api-version");
    if (!apiVersion) return;
    const data = req.body.message;
    if (!data) return sendError(res, 400, "The message property is required");

    const groupsForHub = wssServer.hubGroups.get(hub);
    if (!groupsForHub) return sendError(res, 400, `Hub "${hub}" does not exist or has no groups`);
    const group = groupsForHub.get(groupName);
    if (!group) return sendError(res, 404, `Group "${groupName}" not found in hub "${hub}"`);

    res.sendStatus(202);

    const dataType = getDataType(req.headers["content-type"]);
    group.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) {
        return;
      }
      const sequenceId = sendServerMessage(client, dataType, data);
      logger.info(
        `Sent message to client in group "${groupName}" of hub "${hub}" with protocol ${client.protocol} (sequenceId: ${sequenceId})`,
      );
    });
  });

  app.post("/api/hubs/:hub/groups/:group/\\:closeConnections", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const groupName = req.params.group;
    const apiVersion = requireQueryParam(req, res, "api-version");
    if (!apiVersion) return;
    const reason = requireQueryParam(req, res, "reason");
    if (!reason) return;
    const excluded = req.query.excluded;
    if (excluded !== undefined && !Array.isArray(excluded) && typeof excluded !== "string") {
      return sendError(res, 400, "excluded must be an array of strings");
    }
    const groupsForHub = wssServer.hubGroups.get(hub);
    if (!groupsForHub) return sendError(res, 400, `Hub "${hub}" does not exist or has no groups`);
    const group = groupsForHub.get(groupName);
    if (!group) return sendError(res, 404, `Group "${groupName}" not found in hub "${hub}"`);

    const excludedSet = new Set(
      typeof excluded === "string" ? [excluded] : (excluded as string[]) || [],
    );
    group.forEach((client) => {
      const clientId = client.connectionId;
      if (!excludedSet.has(clientId) && client.readyState === WebSocket.OPEN) {
        closeClientConnection(client, reason);
        logger.info(
          `Closed connection "${clientId}" in group "${groupName}" with reason: ${reason}`,
        );
      }
    });
    res.sendStatus(204);
  });

  app.post("/api/hubs/:hub/\\:closeConnections", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const apiVersion = requireQueryParam(req, res, "api-version");
    if (!apiVersion) return;
    const reason = requireQueryParam(req, res, "reason");
    if (!reason) return;
    const excluded = req.query.excluded;
    if (excluded !== undefined && !Array.isArray(excluded) && typeof excluded !== "string") {
      return sendError(res, 400, "excluded must be an array of strings");
    }
    const connections = wssServer.hubConnections.get(hub);
    if (!connections) return sendError(res, 400, `Hub "${hub}" does not exist`);
    const excludedSet = new Set(
      typeof excluded === "string" ? [excluded] : (excluded as string[]) || [],
    );
    connections.forEach((client) => {
      const clientId = client.connectionId;
      if (!excludedSet.has(clientId) && client.readyState === WebSocket.OPEN) {
        closeClientConnection(client, reason);
        logger.info(`Closed connection "${clientId}" with reason: ${reason}`);
      }
    });
    res.sendStatus(204);
  });

  app.delete("/api/hubs/:hub/connections/:connectionId", (req: Request, res: Response) => {
    const hub = req.params.hub;
    const connectionId = req.params.connectionId;
    const apiVersion = requireQueryParam(req, res, "api-version");
    if (!apiVersion) return;
    const reason = requireQueryParam(req, res, "reason");
    if (!reason) return;
    const connections = wssServer.hubConnections.get(hub);
    if (!connections) return sendError(res, 400, `Hub "${hub}" does not exist`);
    for (const client of connections) {
      if (client.connectionId === connectionId) {
        closeClientConnection(client, reason);
        logger.info(`Closed connection "${connectionId}" in hub "${hub}" with reason: ${reason}`);
        res.sendStatus(204);
        return;
      }
    }
    return sendError(res, 404, `Connection "${connectionId}" not found in hub "${hub}"`);
  });

  app.post("/admin/force-reconnect", (_, res: Response) => {
    logger.info("Admin call: /admin/force-reconnect invoked");
    wssServer.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        const connectedMsg = createConnectedMessage(
          (client as Connection).connectionId,
          reliableProtocols.includes(client.protocol),
        );
        sendWsMessage(client, connectedMsg);
        logger.info(
          `Force reconnect: Sent connected message to client with protocol ${client.protocol}`,
        );
      }
    });
    logger.info("Admin call: /admin/force-reconnect completed");
    res.json({ status: "Force reconnect initiated" });
  });

  httpsServer.listen(securePort, () => {
    logger.info(
      `Azure Web PubSub Simulator secure server is running at wss://localhost:${securePort}`,
    );
    logger.info(`REST API endpoint available at https://localhost:${securePort}`);
  });

  const logError = (err?: Error): void => {
    if (err) logger.error("Failed to close server", err);
  };

  return {
    close: () => {
      wssServer.server.close(logError);
      httpsServer.close(logError);
      logger.info("Server closed");
    },
    webPubSubClientUrl: `wss://localhost:${securePort}`,
    httpsUrl: `https://localhost:${securePort}`,
    ws: wssServer.server,
  };
}

export function startWebPubSubServer(
  options: WebPubSubServerOptions = {},
): Promise<WebPubSubServer> {
  return createServer(options);
}
