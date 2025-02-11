// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createWebSocketClient } from "../../../src/index.js";
import { buildWebSocketClientTests } from "../webSocketClient.js";

buildWebSocketClientTests("ws", (url, options) => createWebSocketClient(url, options).asWs());

const nodeVersion = Number(process.versions.node.split(".")[0]);
if (nodeVersion >= 23) {
  buildWebSocketClientTests("NodeJS Native", (url, options) =>
    createWebSocketClient(url, options).asWebSocket(),
  );
}
