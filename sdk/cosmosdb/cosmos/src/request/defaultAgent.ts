// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Agent as HttpAgent } from "node:http";
import { Agent as HttpsAgent } from "node:https";

/**
 * @hidden
 */
export const defaultHttpsAgent = new HttpsAgent({
  keepAlive: true,
  minVersion: "TLSv1.2",
});

/**
 * @hidden
 */
export const defaultHttpAgent = new HttpAgent({
  keepAlive: true,
});
