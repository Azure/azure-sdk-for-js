<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.19
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled (no sink server IDs configured)
- ✓ **startup** OpenTelemetry tracing disabled (no OTLP endpoint configured)
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"Detailed issue description in Markdown. Do NOT repe...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting MCPG in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> where <server> is one of: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":2928944,\"name\":\"azure-sdk-for-net\",\"full_name\":\"Azure/azure-sdk-for-net\",\"description\":\"This repository is for active development of the Azure SDK for .NET. For consumers of the SDK we recommend visiting our public developer docs at https://learn.microsoft.com/dotnet/azure/ or our versioned developer docs at https://azure.github.io/azure-sdk-for-net. \",\"html_url...`
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-net","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment version for ai releases (#58440)\\n\\n* Increment package version after release of Azure.AI.Extensions.OpenAI\\n\\n* Increment package version after release of Azure.AI.Projects.Agents\\n\\n* Increment package version after release of Azure.AI.Projects\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment version for ai releases (#58440)\\n\\n* Increment package version after release of Azure.AI.Extensions.OpenAI\\n\\n* Increment package version after release of Azure.AI.Projects.Agents\\n\\n* Increment package version after release of Azure.AI.Projects\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects/CHANGELOG.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Extensions.OpenAI/CHANGELOG.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/CHANGELOG.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Extensions.OpenAI/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.1.0-beta.2 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 2.1.0-beta.1 (2026-04-21)\n\n### Features Added\n- The sample...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.1.0-beta.2 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 2.1.0-beta.1 (2026-04-21)\n\n### Features Added\n- Added Toolboxes sam...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 2.1.0-beta.2 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 2.1.0-beta.1 (2026-04-21)\n\n### Features Added\n- Added `Agent...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects.Agents/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Extensions.OpenAI/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects.Agents/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure AI Projects Agents client library for .NET\n\nDevelop Agents using the Azure AI Foundry platform, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and othe...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Extensions.OpenAI/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure AI Extensions OpenAI client library for .NET\n\nDevelop Agents using the Azure AI Foundry platform, leveraging an extensive ecosystem of models, tools, and capabilities from OpenAI, Microsoft, and ...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/ai/Azure.AI.Projects/README.md","ref":"main","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/ai/Azure.AI.Projects/README.md","mimeType":"text/plain; charset=utf-8","text":"# Azure AI Projects client library for .NET\nThe AI Projects client library is part of the Azure AI Foundry SDK and provides easy access to resources in your Azure AI Foundry Project. Use it to:\n\n* **Create and r...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"No action needed: Commit 1f9b8a6 (PR #58440) is a post-release version increment for Azure.AI.Extensions.OpenAI, Azure.AI.Projects.Agents, and Azure.AI.Projects. It only bumps package versions and adds empty \"(Unreleased)\" CHANGELOG sections — no new implementation code. The READMEs for all three packages already document the features from the 2.1.0-beta.1 release (AgentToolboxes, Sessions, AgentSessionFiles, ProjectAgentSkills, Ge...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
