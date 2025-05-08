// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeAll, describe, it } from "vitest";
import { setLogLevel } from "@azure/logger";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("snippets", function () {
  let server: McpServer;
  beforeAll(() => {
    server = new McpServer({
      name: "Azure SDK MCP Server",
      version: "1.0.0-beta.1",
    });
  });

  it("SetLogLevel", () => {
    setLogLevel("verbose");
  });
});
