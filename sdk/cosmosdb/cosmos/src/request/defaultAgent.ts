// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Agent } from "http";

/**
 * @hidden
 */
export let defaultHttpsAgent: Agent;

const https = require("https"); // eslint-disable-line @typescript-eslint/no-require-imports
const tls = require("tls"); // eslint-disable-line @typescript-eslint/no-require-imports

// minVersion only available in Node 10+
if (tls.DEFAULT_MIN_VERSION) {
  defaultHttpsAgent = new https.Agent({
    keepAlive: true,
    minVersion: "TLSv1.2",
  });
} else {
  // Remove when Node 8 support has been dropped
  defaultHttpsAgent = new https.Agent({
    keepAlive: true,
    secureProtocol: "TLSv1_2_method",
  });
}
const http = require("http"); // eslint-disable-line @typescript-eslint/no-require-imports
/**
 * @internal
 */
export const defaultHttpAgent: Agent = new http.Agent({
  keepAlive: true,
});
