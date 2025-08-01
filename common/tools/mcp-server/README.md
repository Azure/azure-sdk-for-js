# Azure SDK for JS MCP Server

A Model Context Protocol (MCP) server implementation for the Azure SDK repository. This server is designed to facilitate the development and testing of tools that communicate using the MCP.

> **Note**: This project is in early development stages and may not be fully functional. It is not enabled by default in the Azure SDK for JavaScript repository. As more tools are developed, the server will be enabled for testing.

## Getting Started

### Prerequisites

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Activation

The MCP server can be enabled by adding the following entry under the root ./.vscode/ folder in a file called `mcp.json`:

```json
{
  "servers": {
    "Azure SDK": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "${workspaceFolder}/common/tools/mcp-server/src/index.ts"],
    }
  }
}
```

### Using the MCP Inspector

The [MCP inspector](https://github.com/modelcontextprotocol/inspector) is a developer tool for testing and debugging MCP servers. It can be used to test the MCP server functionality without the non-determinism of an LLM.

To use the MCP inspector, simply run `npm run start:inspect` from this directory and navigate to `http://localhost:<port>` in your web browser. The port number will be displayed in the console output.

## Key Concepts

- **MCP Server**: The core server implementation that handles communication using the Model Context Protocol.
- **Tools**: Extendable functionalities registered with the server, such as the `hello_world` tool.
- **Schemas**: Validation schemas for tool inputs, defined using [Zod](https://zod.dev/).

## Examples

### Hello World Tool

The `hello_world` tool demonstrates a simple implementation:

```ts snippet:ReadmeSampleHelloWorld
import { helloWorldSchema, helloWorld } from "../src/tools/helloWorld.js";

server.tool(
  "hello_world",
  "Prints hello world",
  helloWorldSchema.shape,
  async (args) => await helloWorld(args),
);
```

## Next Steps

- Explore the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) for more tools and features.
- Extend the server by adding custom tools.

## Contributing

This project welcomes contributions and suggestions. For details, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
