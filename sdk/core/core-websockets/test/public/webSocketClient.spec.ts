// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createWebSocketClient } from "../../src/index.js";
import { buildWebSocketClientTests } from "./webSocketClient.js";

buildWebSocketClientTests("Default", createWebSocketClient);
