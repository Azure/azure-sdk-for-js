<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"sha\":\"[REDACTED]\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]\",\"commit\":{\"message\":\"update pnpm-lock (#38321)\\n\\n### Packages impacted by this PR\\n\\n\\n### Issues associated with this PR\\n\\n\\n### Describe the problem that is addressed by this PR\\n\\n\\n### What are the possible designs available to address the problem? If\\nthere are more than one possible design, why was the one in this P...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38281","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38281,\"title\":\"chore: Update registry for all package.json and adjust check rules\",\"body\":\"I apologize for pinging so many of you, but @xirzec [green-lit the change](https://github.com/Azure/azure-sdk-for-js/issues/38140#issuecomment-4255174696). \\n\\n### Packages impacted by this PR\\n\\n399 packages of the sdk\\n\\n### Issues associated with this PR\\n\\n#38140 and #38142\\n\\n### Describe the problem that is addressed...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38281,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38281,\"title\":\"chore: Update registry for all package.json and adjust check rules\",\"body\":\"I apologize for pinging so many of you, but @xirzec [green-lit the change](https://github.com/Azure/azure-sdk-for-js/issues/38140#issuecomment-4255174696). \\n\\n### Packages impacted by this PR\\n\\n399 packages of the sdk\\n\\n### Issues associated with this PR\\n\\n#38140 and #38142\\n\\n### Describe the problem that is addressed...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38281","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38281,\"title\":\"chore: Update registry for all package.json and adjust check rules\",\"body\":\"I apologize for pinging so many of you, but @xirzec [green-lit the change](https://github.com/Azure/azure-sdk-for-js/issues/38140#issuecomment-4255174696). \\n\\n### Packages impacted by this PR\\n\\n399 packages of the sdk\\n\\n### Issues associated with this PR\\n\\n#38140 and #38142\\n\\n### Describe the problem that is addressed...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":38253,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/computelimit/arm-computelimit/CHANGELOG.md\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -1,6 +1,6 @@\\n # Release History\\n     \\n-## 1.0.0 (2026-04-17)\\n+## 1.0.0 (2026-04-22)\\n \\n ### Features Added\\n \"},{\"filename\":\"sdk/computelimit/arm-computelimit/metadata.json\",\"status\":\"modified\",\"additions\":7,\"deletions\":1,\"changes\":8,\"patch\":\"@@ -1,6 +1,6 @@\\n {...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38281","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38281,\"title\":\"chore: Update registry for all package.json and adjust check rules\",\"body\":\"I apologize for pinging so many of you, but @xirzec [green-lit the change](https://github.com/Azure/azure-sdk-for-js/issues/38140#issuecomment-4255174696). \\n\\n### Packages impacted by this PR\\n\\n399 packages of the sdk\\n\\n### Issues associated with this PR\\n\\n#38140 and #38142\\n\\n### Describe the problem that is addressed...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":38281,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get pull request diff: GET https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/38281: 406 Sorry, the diff exceeded the maximum number of files (300). Consider using 'List pull requests files' API or locally cloning the repository instead. [{Resource:PullRequest Field:diff Code:too_large Message:}]","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"perPage":5,"query":"repo:Azure/azure-sdk-for-js openai Build Build failure is:open"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**→`tools/call` `search_issues`
  
  ```json
  {"params":{"arguments":{"perPage":5,"query":"repo:Azure/azure-sdk-for-js computelimit Build Analyze failure is:open"},"name":"search_issues"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":2,\"incomplete_results\":false,\"items\":[{\"id\":4335130819,\"number\":38297,\"state\":\"open\",\"locked\":false,\"title\":\"CI failures on main: `@azure/arm-computelimit`, `@azure/openai`, `@azure/arm-springappdiscovery`\",\"body\":\"## Summary\\n\\nThree CI pipeline check runs on the `main` branch are failing as of the HEAD commit [`0dbfbadd`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]) (merged 2026-04-2...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":7,\"incomplete_results\":false,\"items\":[{\"id\":4335130819,\"number\":38297,\"state\":\"open\",\"locked\":false,\"title\":\"CI failures on main: `@azure/arm-computelimit`, `@azure/openai`, `@azure/arm-springappdiscovery`\",\"body\":\"## Summary\\n\\nThree CI pipeline check runs on the `main` branch are failing as of the HEAD commit [`0dbfbadd`](https://github.com/Azure/azure-sdk-for-js/commit/[REDACTED]) (merged 2026-04-2...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"message":"No new failures to report. The 2 CI pipeline failures on the current HEAD commit (981f081b) — `js - computelimit - mgmt (Build Analyze)` and `js - openai (Build Build)` — are the same infrastructure-related failures (stale Ubuntu-24.04 1ES image, 48 days old) already tracked in open issue #38297 filed on 2026-04-27. No code regressions or new unit test failures were detected. The known-failures list in #37864 remains empty."},"name...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
