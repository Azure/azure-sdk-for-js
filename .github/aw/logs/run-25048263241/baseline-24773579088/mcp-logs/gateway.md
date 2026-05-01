<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Create a new GitHub issue for tracking bugs, feature requests, or tasks. Use this for actionable work items that need assignment, labeling, and status tracking. For reports, announcements, or status updates that don't require task tracking, use create_discussion instead. CONSTRAINTS: Maximum 1 issue(s) can be created. Labels [\"test-reliability\"] will be automatically added.","inputSchema":{"additionalProperties":false,"properties":{"body":{"descri...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get commit details"},"description":"Get details for a commit from a GitHub repository","inputSchema":{"properties":{"include_diff":{"default":true,"description":"Whether to include file diffs and stats in the response. Default is true.","type":"boolean"},"owner":{"description":"Repository owner","type":"string"},"page":{"description":"Page number for pagination (min 1)","minimum":1,"type":"number"},"perPage":{"descriptio...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"fix(loadtesting): Pre fetch storage token to handle OIDC token (#38235)\\n\\n### Packages impacted by this PR\\n\\nazure/playwright\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If\\nther...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38159","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38159,\"title\":\"[ContentUnderstanding] Expose usage property on AnalysisResultPoller\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-content-understanding`\\n\\n### Issues associated with this PR\\n\\n- https://github.com/Azure/azure-sdk-for-python/issues/46249 (original report in Python SDK)\\n\\n### Describe the problem that is addressed by this PR\\n\\nThe REST API returns a `usage` field in the analyze operat...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38159,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":13,\"check_runs\":[{\"id\":72430875451,\"name\":\"Handle pull_request_target closed event with azure login\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24756547543/job/72430875451\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24756547543/job/72430875451\",\"started_at\":\"2026-04-22T02:10:30Z\",\"completed_at\":\"2026...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38159","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38159,\"title\":\"[ContentUnderstanding] Expose usage property on AnalysisResultPoller\",\"body\":\"### Packages impacted by this PR\\n\\n`@azure/ai-content-understanding`\\n\\n### Issues associated with this PR\\n\\n- https://github.com/Azure/azure-sdk-for-python/issues/46249 (original report in Python SDK)\\n\\n### Describe the problem that is addressed by this PR\\n\\nThe REST API returns a `usage` field in the analyze operat...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"No unit test failures detected on main. All failing CI check runs were investigated across the 5 most recent commits. Every failing check run showed 0 failed tests (tests are all passing). The CI pipeline failures are infrastructure-level issues: manifest/publish step failures, Windows runner Cmd.exe exit-255 errors, DNS network failures, PoliCheck compliance scan errors, and broken link check failures — none of which are unit test f...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
