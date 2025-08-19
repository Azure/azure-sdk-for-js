// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { helloWorldSchema, helloWorld } from "./tools/helloWorld.js";

const server = new McpServer({
  name: "Azure SDK MCP Server",
  version: "1.0.0-beta.1",
});

// Register a tool
server.tool("hello_world", "Prints hello world", helloWorldSchema.shape, (args) =>
  helloWorld(args),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Server started");
}

main().catch((error) => {
  console.log("Fatal error running server:", error);
  process.exit(1);
});
