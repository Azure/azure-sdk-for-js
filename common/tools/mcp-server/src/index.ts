// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { listPackages, listPackagesArgsSchema } from "./tools/listPackages.js";
import { prettierSchema, prettierTool } from "./tools/prettier.js";

const server = new McpServer({
  name: "Azure SDK MCP Server",
  version: "1.0.0-beta.1",
});

server.tool(
  "list_packages",
  "List packages in the monorepo",
  listPackagesArgsSchema.shape,
  async (args) => listPackages(args),
);

server.tool("is_formatted", "Check if code is formatted", prettierSchema.shape, (args) =>
  prettierTool(args),
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
