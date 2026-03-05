# Microsoft.SdkChat

Main CLI tool for SDK sample generation.

## Overview

This is the primary entry point providing:
- **CLI commands** — `package samples generate`, `mcp`, `acp`, `doctor`
- **MCP server** — Model Context Protocol integration for VS Code and Claude Desktop
- **ACP agent** — Agent Client Protocol for interactive generation
- **AI service** — Unified interface to GitHub Copilot and OpenAI

## Key Components

| Path | Description |
|------|-------------|
| `Program.cs` | CLI entry point and command definitions |
| `Services/AiService.cs` | Unified AI streaming (Copilot + OpenAI) |
| `Tools/Package/Samples/` | Sample generation orchestration |
| `Mcp/McpServer.cs` | MCP protocol server |
| `Acp/SampleGeneratorAgent.cs` | ACP agent implementation |
| `Services/Languages/Samples/` | Language-specific context builders |
| `Prompts/SampleGeneration/` | Per-language system prompts |

## Architecture

```
CLI Commands
     ↓
SampleGeneratorTool
     ↓
SdkInfo (language detection)
     ↓
SampleLanguageContext (language-specific)
     ↓
PublicApiGraphEngine (Roslyn/ast/ts-morph/etc)
     ↓
AiService (Copilot or OpenAI)
     ↓
Generated Samples
```

## Configuration

The tool respects environment variables and CLI options documented in the root README.

## Development

```bash
# Run directly
dotnet run --project src/Microsoft.SdkChat -- package samples generate /path/to/sdk

# Run tests
dotnet test tests/Microsoft.SdkChat.Tests
```
