<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.11
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created. Labels [\"test-reliability\"] will be automatically added.","inputSchema":{"additionalProperties":false,"properties":{"body":{"descri...`
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
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-js"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":108311273,\"name\":\"azure-sdk-for-js\",\"full_name\":\"Azure/azure-sdk-for-js\",\"description\":\"This repository is for active development of the Azure SDK for JavaScript (NodeJS \\u0026 Browser). For consumers of the SDK we recommend visiting our public developer docs at https://docs.microsoft.com/javascript/azure/ or our versioned developer docs at https://azure.github.i...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"37864","method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37864,\"title\":\"Tracking: Known pre-existing CI test failures\",\"body\":\"## Purpose\\n\\nThis issue tracks **known, pre-existing CI test failures** that are caused by infrastructure, service-side, or external dependency issues — not by code bugs in this repository. The automated [Analyze CI Test Failures](.github/workflows/fix-test-failures.md) workflow uses this issue to skip known failures and avoid filing duplicate issu...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":37864,"method":"get","owner":"Azure","repo":"azure-sdk-for-js"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `list_commits`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","perPage":5,"repo":"azure-sdk-for-js","sha":"main"},"name":"list_commits"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37864,\"title\":\"Tracking: Known pre-existing CI test failures\",\"body\":\"## Purpose\\n\\nThis issue tracks **known, pre-existing CI test failures** that are caused by infrastructure, service-side, or external dependency issues — not by code bugs in this repository. The automated [Analyze CI Test Failures](.github/workflows/fix-test-failures.md) workflow uses this issue to skip known failures and avoid filing duplicate issu...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"Fix pnpm lock autofix (#38025)\\n\\nFix pnpm lock autofix\",\"author\":{\"name\":\"Jiao Di (MSFT)\",\"email\":\"80496810+v-jiaodi@users.noreply.github.com\",\"date\":\"2026-04-07T10:02:42Z\"},\"committer\":{\"name\":\"GitHub\",\"email\":\"noreply@github.com\",\"date\":\"2026-04-07T10:02:42Z\"}},\"author\":{\"login\...`
- 🔍 rpc **safeoutputs**→`tools/call` `noop`
  
  ```json
  {"params":{"arguments":{"message":"No action needed: Analyzed CI check runs across the 25 most recent commits on main. The HEAD commit (4d8cb2f) has 84 check runs with 0 failures. While some older commits show CI pipeline failures (in build/packaging scripts), every failing pipeline reports 0 unit test failures — tests all pass. No `(Build UnitTest ...)` jobs have failed. CI is green from a unit-test perspective; no GitHub issue is warranted."},"name":"noop"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
