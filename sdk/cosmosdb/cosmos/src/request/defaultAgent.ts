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
  defaultHttpsAgent = new https.Agent({
    keepAlive: true
  });
  // tslint:disable-next-line:no-var-requires
  const http = require("http");
  defaultHttpAgent = new http.Agent({
    keepAlive: true
  });
}
