import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { helloWorldSchema, helloWorld } from "./tools/helloWorld.js";

const server = new McpServer({
  name: "Azure SDK MCP Server",
  version: "0.1.0",
});

// Register a tool
server.tool("hello_world", "Prints hello world", helloWorldSchema.shape, (args) =>
  helloWorld(args),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Server started");
}

main().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
