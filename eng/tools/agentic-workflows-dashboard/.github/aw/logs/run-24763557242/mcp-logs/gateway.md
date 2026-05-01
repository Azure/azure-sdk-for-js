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
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"58478","method":"get","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58478,\"title\":\"Update spec repo commit for ApiCompat compatibility fix\",\"body\":\"## Description\\n\\nUpdates `tsp-location.yaml` spec repo commit to [4850dea](https://github.com/Azure/azure-rest-api-specs/commit/[REDACTED]) (`Add @@usage(Model, Usage.input, \\u0026#34;csharp\\u0026#34;) for C# ApiCompat compatibility`) for the following 5 RPs that had ApiCompat breaking changes after the mgmt generator bump in #58438:\\n\\...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":58478,"method":"get","owner":"Azure","repo":"azure-sdk-for-net"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":58478,\"title\":\"Update spec repo commit for ApiCompat compatibility fix\",\"body\":\"## Description\\n\\nUpdates `tsp-location.yaml` spec repo commit to [4850dea](https://github.com/Azure/azure-rest-api-specs/commit/[REDACTED]) (`Add @@usage(Model, Usage.input, \\u0026#34;csharp\\u0026#34;) for C# ApiCompat compatibility`) for the following 5 RPs that had ApiCompat breaking changes after the mgmt generator bump in #58438:\\n\\...`
- 🔍 rpc **safeoutputs**→`tools/call` `noop`
  
  ```json
  {"params":{"arguments":{"message":"No documentation action needed: PR #58478 by @ArcturusZhang only updates tsp-location.yaml spec repo commit hashes for 5 ARM packages (AppComplianceAutomation, DataProtectionBackup, Resources.DeploymentStacks, Search, Storage) to fix ApiCompat compatibility. No code was regenerated, no new APIs or types were introduced, and no documentation-relevant behavior changed."},"name":"noop"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
