# Azure SDK MCP Server

A Model Context Protocol (MCP) server implementation for the Azure SDK repository. This server is designed to facilitate the development and testing of tools that communicate using the MCP.

> **Note**: This project is in early development stages and may not be fully functional. It is not enabled by default in the Azure SDK for JavaScript repository. As more tools are developed, the server will be enabled for testing.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (version 16 or later is recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Activation

The MCP server can be enabled by adding the following entry under the root ./.vscode/ folder in a file called `mcp.json`:

```json
{
  "servers": {
    "Azure SDK": {
      "type": "stdio",
      "command": "rush",
      "args": ["--only", "@azure-tools/js-mcp-server", "start"],
      "env": {}
    }
  }
}
```

## Key Concepts

- **MCP Server**: The core server implementation that handles communication using the Model Context Protocol.
- **Tools**: Extendable functionalities registered with the server, such as the `hello_world` tool.
- **Schemas**: Validation schemas for tool inputs, defined using [Zod](https://zod.dev/).

## Examples

### Hello World Tool

The `hello_world` tool demonstrates a simple implementation:

```typescript
import { helloWorldSchema, helloWorld } from "./tools/helloWorld.js";

server.tool(
  "hello_world",
  "Prints hello world",
  helloWorldSchema.shape,
  async (args) => await helloWorld(args),
);
```

## Troubleshooting

If you encounter issues:

1. Ensure all dependencies are installed: `npm install`
2. Verify the Node.js version: `node -v`
3. Check for build errors: `npm run build`

## Next Steps

- Explore the [Model Context Protocol SDK](https://github.com/modelcontextprotocol/typescript-sdk) for more tools and features.
- Extend the server by adding custom tools.

## Contributing

This project welcomes contributions and suggestions. For details, see the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md).
