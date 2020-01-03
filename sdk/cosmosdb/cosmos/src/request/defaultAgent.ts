// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Agent } from "http";
import { isNode } from "../common";

/**
 * @ignore
 */
export let defaultHttpAgent: Agent;
/**
 * @ignore
 */
export let defaultHttpsAgent: Agent;

if (isNode) {
  // tslint:disable-next-line:no-var-requires
  const https = require("https");
  // tslint:disable-next-line:no-var-requires
  const tls = require("tls");

  // minVersion only available in Node 10+
  if (tls.DEFAULT_MIN_VERSION) {
    defaultHttpsAgent = new https.Agent({
      keepAlive: true,
      minVersion: "TLSv1.2"
    });
  } else {
    // Remove when Node 8 support has been dropped
    defaultHttpsAgent = new https.Agent({
      keepAlive: true,
      secureProtocol: "TLSv1_2_method"
    });
  }
  // tslint:disable-next-line:no-var-requires
  const http = require("http");
  defaultHttpAgent = new http.Agent({
    keepAlive: true
  });
}
