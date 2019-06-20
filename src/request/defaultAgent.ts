import { Agent } from "http";
import { isNode } from "../common";

export let defaultHttpAgent: Agent;
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
