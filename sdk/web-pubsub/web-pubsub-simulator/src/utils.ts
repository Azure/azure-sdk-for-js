// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Response, Request } from "express";
import type { WebSocket } from "ws";
import type { ConnectedMessage, DisconnectedMessage } from "./types.js";

export function getDataType(contentTypeHeader: string | undefined): string {
  switch (contentTypeHeader) {
    case "text/plain":
      return "text";
    case "application/json":
      return "json";
    case "application/octet-stream":
      return "binary";
    default:
      return "json";
  }
}

/**
 * Sends a JSON error response.
 */
export function sendError(res: Response, code: number, message: string): void {
  res.status(code).json({ error: { code: "InvalidRequest", message } });
}

/**
 * Validates that a query parameter is present; if not sends an error response.
 */
export function requireQueryParam(
  req: Request,
  res: Response,
  paramName: string,
): string | undefined {
  const value = req.query[paramName] as string | undefined;
  if (!value) {
    sendError(res, 400, `${paramName} query parameter is required`);
  }
  return value;
}

/**
 * Sends a JSON payload to a WebSocket client.
 */
export function sendWsMessage(ws: WebSocket, payload: Record<string, any>): void {
  ws.send(JSON.stringify(payload));
}

/**
 * Closes a WebSocket connection with a disconnect message.
 */
export function closeClientConnection(ws: WebSocket, reason: string | undefined): void {
  const disconnectMsg = createDisconnectedMessage(reason);
  sendWsMessage(ws, disconnectMsg);
  ws.close();
}

export function createConnectedMessage(
  connectionId: string,
  isReliable: boolean,
): ConnectedMessage {
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

export function createDisconnectedMessage(reason: string | undefined): DisconnectedMessage {
  return {
    type: "system",
    event: "disconnected",
    message: reason ?? "Connection closed",
  };
}
