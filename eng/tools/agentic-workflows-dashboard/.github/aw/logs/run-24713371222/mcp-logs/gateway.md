<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.19
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled (no sink server IDs configured)
- ✓ **startup** OpenTelemetry tracing disabled (no OTLP endpoint configured)
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"Detailed issue description in Markdown. Do NOT repe...`
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
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-net"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.ResourceManager.CarbonOptimization (#58429)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-21T08:55:00Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-2...`
- 🔍 rpc **github**→`tools/call` `get_commit`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","repo":"azure-sdk-for-net","sha":"[REDACTED]"},"name":"get_commit"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-net/commit/[REDACTED]\",\"commit\":{\"message\":\"Increment package version after release of Azure.ResourceManager.CarbonOptimization (#58429)\",\"author\":{\"name\":\"Azure SDK Bot\",\"email\":\"53356347+azure-sdk@users.noreply.github.com\",\"date\":\"2026-04-21T08:55:00Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-21...`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/carbon/Azure.ResourceManager.CarbonOptimization","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/carbon/Azure.ResourceManager.CarbonOptimization/CHANGELOG.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/carbon/Azure.ResourceManager.CarbonOptimization/CHANGELOG.md","mimeType":"text/plain; charset=utf-8","text":"# Release History\n\n## 1.1.0-beta.1 (Unreleased)\n\n### Features Added\n\n### Breaking Changes\n\n### Bugs Fixed\n\n### Other Changes\n\n## 1.0.1 (2026-04-20)\n\n### Other Changes\n\n...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":4236,\"name\":\"Azure.ResourceManager.CarbonOptimization.sln\",\"path\":\"sdk/carbon/Azure.ResourceManager.CarbonOptimization/Azure.ResourceManager.CarbonOptimization.sln\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/carbon/Azure.ResourceManager.CarbonOptimization/Azure.ResourceManager.CarbonOptimization.sln?ref=[REDACTED]\",\"git_url\":\"https://api.github....`
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/carbon/Azure.ResourceManager.CarbonOptimization/README.md","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/carbon/Azure.ResourceManager.CarbonOptimization/tests","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/carbon/Azure.ResourceManager.CarbonOptimization/samples","repo":"azure-sdk-for-net"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-net/sha/[REDACTED]/contents/sdk/carbon/Azure.ResourceManager.CarbonOptimization/README.md","mimeType":"text/plain; charset=utf-8","text":"# Microsoft Azure CarbonOptimization management client library for .NET\n\nAzure carbon optimization helps organizations measure and minimize the carbon impact of their Azure footprint. W...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":291,\"name\":\"Azure.ResourceManager.CarbonOptimization.Samples.csproj\",\"path\":\"sdk/carbon/Azure.ResourceManager.CarbonOptimization/samples/Azure.ResourceManager.CarbonOptimization.Samples.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/carbon/Azure.ResourceManager.CarbonOptimization/samples/Azure.ResourceManager.CarbonOptimization.Samples.csproj?re...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"type\":\"file\",\"size\":167,\"name\":\"Azure.ResourceManager.CarbonOptimization.Tests.csproj\",\"path\":\"sdk/carbon/Azure.ResourceManager.CarbonOptimization/tests/Azure.ResourceManager.CarbonOptimization.Tests.csproj\",\"sha\":\"[REDACTED]\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-net/contents/sdk/carbon/Azure.ResourceManager.CarbonOptimization/tests/Azure.ResourceManager.CarbonOptimization.Tests.csproj?ref=[REDACTE...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Documentation Gap\n\n**Package:** `Azure.ResourceManager.CarbonOptimization`\n**Service directory:** `sdk/carbon/Azure.ResourceManager.CarbonOptimization/`\n**Triggered by:** commit [REDACTED] (PR #58429) by @azure-sdk\n\n## What Changed\n\nThe package version was incremented after the `1.0.0` stable release (with a patch release `1.0.1` on 2026-04-20 upgrading `Azure.Core` and `Azure.ResourceManager` dependencies). The package is now ...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `dispatch_triage`
  
  ```json
  {"params":{"arguments":{},"name":"dispatch_triage"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
