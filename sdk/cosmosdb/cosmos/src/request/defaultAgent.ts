// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Agent } from "node:http";
import https from "node:https";
import http from "node:http";

/**
 * @internal
 */
export const defaultHttpsAgent: Agent = new https.Agent({
  keepAlive: true,
  minVersion: "TLSv1.2",
});

/**
 * @internal
 */
export const defaultHttpAgent: Agent = new http.Agent({
  keepAlive: true,
});
