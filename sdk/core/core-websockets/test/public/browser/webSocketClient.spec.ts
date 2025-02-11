// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createWebSocketClient } from "../../../src/index.js";
import { buildWebSocketClientTests } from "../webSocketClient.js";

buildWebSocketClientTests("Web API", (url, options) =>
  createWebSocketClient(url, options).asWebSocket(),
);
