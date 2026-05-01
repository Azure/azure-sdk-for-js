<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.7
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_issue","description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created. Labels [test-reliability] will be automatically added.","inputSchema":{"additionalProperties":false,"properties...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"Sync eng/common directory with azure-sdk-tools for PR 14361 (#37486)\\n\\nSync eng/common directory with azure-sdk-tools for PR\\nhttps://github.com/Azure/azure-sdk-tools/pull/14361 See [eng/common\\nworkflow](https://github.com/Azure/azure-sdk-tools/blob/main/eng/common/README.md#workflow)\\n\\n---------\\n\\nCo-a...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"\n## Summary\n\nAs of the HEAD commit on `main` ([a16db635](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]), 2026-03-06), CI is reporting **239 failing tests across 3 packages** plus numerous build/infrastructure failures. All test failures are in **live test runs** and are caused by external service instability (HTTP 500, AAD outage, and rate limiting) rather than code defects. Additionally, `maps-timezone-rest` has a CI var...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
