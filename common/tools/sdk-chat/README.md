# SDK Chat

**Generate production-ready SDK samples in seconds using AI.**

![SDK Chat Demo](demo/demo.gif)

```bash
dotnet run --project src/Microsoft.SdkChat -- package samples generate /path/to/sdk
```

## Install

```bash
git clone https://github.com/deyaaeldeen/sdk-chat && cd sdk-chat
```

**Requires:** [.NET SDK 10.0+](https://dot.net) + GitHub token (`GH_TOKEN`) or OpenAI key (`OPENAI_API_KEY`)

## Quick Start

```bash
export GH_TOKEN="ghp_..."
dotnet run --project src/Microsoft.SdkChat -- package samples generate /path/to/openai-dotnet
```

```bash
# Custom prompt + count
dotnet run --project src/Microsoft.SdkChat -- package samples generate /path/to/sdk --count 10 --prompt "streaming examples"

# Preview without writing
dotnet run --project src/Microsoft.SdkChat -- package samples generate /path/to/sdk --dry-run

# Use OpenAI instead
export OPENAI_API_KEY="sk-..."
dotnet run --project src/Microsoft.SdkChat -- package samples generate /path/to/sdk --use-openai
```

## Commands

| Command | Purpose |
|---------|---------|
| `package source detect <path>` | Auto-detect source folder and programming language |
| `package samples detect <path>` | Find existing samples folder (samples/, examples/) |
| `package samples generate <path>` | Generate production-ready code samples using AI |
| `package api graph <path>` | Build public API graph from SDK source |
| `package api coverage <path>` | Find which API operations are missing from samples |
| `doctor` | Validate external dependencies |
| `mcp` | Start MCP server for AI agent integration |
| `acp` | Start ACP agent for interactive sample generation |

### `package source detect`

| Option | Default | Description |
|--------|---------|-------------|
| `--language <lang>` | Auto | Override auto-detection: `dotnet`, `python`, `java`, `typescript`, `javascript`, `go` |
| `--json` | `false` | Output as JSON for scripting/automation |

### `package samples detect`

| Option | Default | Description |
|--------|---------|-------------|
| `--json` | `false` | Output as JSON for scripting/automation |

### `package samples generate`

| Option | Default | Description |
|--------|---------|-------------|
| `--count <n>` | `5` | Number of samples to generate |
| `--prompt <text>` | — | Guide generation: `"streaming examples"`, `"error handling"`, `"authentication"` |
| `--output <dir>` | Auto | Output directory (default: auto-detected samples/ or examples/) |
| `--language <lang>` | Auto | Override language detection: `dotnet`, `python`, `java`, `typescript`, `go` |
| `--model <name>` | — | AI model override (default set by `SDK_CLI_MODEL` env var) |
| `--budget <chars>` | `512K` | Max source context in characters (~128K tokens) |
| `--dry-run` | `false` | Preview what would be generated without writing files |
| `--use-openai` | `false` | Use OpenAI API instead of GitHub Copilot |
| `--load-dotenv` | `false` | Load .env file from current directory |

### `package api graph`

| Option | Default | Description |
|--------|---------|-------------|
| `--language <lang>` | Auto | Override language detection |
| `--json` | `false` | Structured JSON output (default: human-readable code stubs) |
| `--output <file>` | stdout | Write to file instead of stdout |

### `package api coverage`

| Option | Default | Description |
|--------|---------|-------------|
| `--samples <dir>` | Auto | Custom samples folder path (default: auto-detected) |
| `--language <lang>` | Auto | Override language detection |
| `--uncovered-only` | `false` | Only show operations that need samples |
| `--json` | `false` | Output as JSON for CI/automation |
| `--monorepo` | `false` | Analyze all SDK packages in a monorepo (batch coverage) |
| `--parallel` | `false` | Analyze packages in parallel (monorepo only) |
| `--threads <n>` | CPU count | Max concurrent threads when `--parallel` is set (monorepo only) |
| `--report <file>` | stdout | Write a Markdown report to file (monorepo only) |
| `--quiet` | `false` | Suppress progress output |
| `--skip-empty` | `false` | Omit packages with 0 operations from report (monorepo only) |

### `doctor`

| Option | Default | Description |
|--------|---------|-------------|
| `--verbose`, `-v` | `false` | Show detailed path information |

### `mcp`

| Option | Default | Description |
|--------|---------|-------------|
| `--transport <type>` | `stdio` | Transport type (`stdio`, `http`) |
| `--port <n>` | `8080` | Port for Streamable HTTP transport |
| `--bind <addr>` | `127.0.0.1` | Bind address for HTTP transport |
| `--log-level <level>` | `info` | Log level |
| `--use-openai` | `false` | Use OpenAI-compatible API (requires `OPENAI_API_KEY`) |
| `--load-dotenv` | `false` | Load .env file |

### `acp`

| Option | Default | Description |
|--------|---------|-------------|
| `--log-level <level>` | `info` | Log level |
| `--use-openai` | `false` | Use OpenAI-compatible API (requires `OPENAI_API_KEY`) |
| `--load-dotenv` | `false` | Load .env file |

## MCP Server

Expose SDK Chat to AI agents (VS Code Copilot, Claude Desktop).

```bash
dotnet run --project src/Microsoft.SdkChat -- mcp
```

### VS Code Setup

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "sdk-chat": {
      "type": "stdio",
      "command": "dotnet",
      "args": ["run", "--project", "${workspaceFolder}/src/Microsoft.SdkChat", "--", "mcp"]
    }
  }
}
```

### Claude Desktop Setup

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "sdk-chat": {
      "command": "dotnet",
      "args": ["run", "--project", "/path/to/sdk-chat/src/Microsoft.SdkChat", "--", "mcp"]
    }
  }
}
```

### MCP Tools

| Tool | Purpose |
|------|---------|
| `detect_source` | Detect source folder and programming language of an SDK package. Use before any other operation to verify the package is recognized. |
| `detect_samples` | Find existing samples/examples folder. Use before generating samples to check what already exists and avoid duplicates. |
| `build_samples_prompt` | Analyze SDK and build optimized system + user prompts for AI sample generation. Returns prompts, estimated tokens, language, and suggested output path. |
| `validate_samples` | Parse and validate an LLM response containing generated samples. Returns structured samples on success or a correction prompt for retry on failure. |
| `graph_api` | Build the public API graph (types, methods, properties with signatures and docs). Returns code stubs or structured JSON (~70% smaller than raw source). |
| `analyze_coverage` | Compare public API against existing samples to find documentation gaps. Returns coverage percentage, covered operations with file:line references, and uncovered operations. |

#### MCP Workflow

```
detect_source → build_samples_prompt → [call LLM] → validate_samples → write files
                                                          ↓ (on failure)
                                                   [retry LLM with correctionPrompt]
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GH_TOKEN` / `GITHUB_TOKEN` | GitHub token for Copilot authentication (default) |
| `OPENAI_API_KEY` | OpenAI API key (required with `--use-openai`) |
| `OPENAI_ENDPOINT` | Custom OpenAI-compatible endpoint |
| `SDK_CLI_MODEL` | Override default AI model |
| `SDK_CLI_TIMEOUT` | AI request timeout in seconds (default: 300) |
| `SDK_CHAT_ENGINE_TIMEOUT` | Public API Graph Engine timeout in seconds (default: 300) |
| `SDK_CLI_DEBUG` | Set `true` to log prompts/responses |
| `SDK_CLI_DEBUG_DIR` | Directory for debug output files |
| `SDK_CLI_USE_OPENAI` | Set `true` to use OpenAI by default |
| `SDK_CLI_ACP_MAX_SESSIONS` | Maximum concurrent ACP sessions (default: 100) |
| `NO_COLOR` | Disable colored output |

## Supported Languages

.NET/C# • Python • TypeScript • JavaScript • Java • Go

Auto-detected from project files (`.csproj`, `pyproject.toml`, `pom.xml`, `package.json`, `go.mod`).

---

**More:** [Configuration](docs/configuration.md) • [Contributing](CONTRIBUTING.md)

## License

MIT
