// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { WebSocketServer } from "ws";

export interface ConnectedMessage {
  type: "system";
  event: "connected";
  connectionId: string;
  userId: string;
  reconnectionToken?: string;
}

export interface WebPubSubServer {
  close: () => void;
  webPubSubClientUrl: string;
  httpsUrl: string;
  ws: WebSocketServer;
}

export interface WebPubSubServerOptions {
  port?: number;
}
