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
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38253.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
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
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38253,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38253,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":243,\"check_runs\":[{\"id\":72710683980,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24839899736/job/72710683980\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24839899736/job/72710683980\",\"started_at\":\"2026-04-23T14:07:29Z\"},{\"id\":72710610297,\"name\":\"license/cla\",\"status\":\"completed\",\"conclusion\":\"success\",...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":38253,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"success\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":46411777695,\"node_id\":\"SC_kwDOBnSy6c8AAAAKzluGnw\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"success\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24812769342\",\"description\":\"All checks passed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avatar_url\":\"https:...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_reviews","owner":"Azure","pullNumber":38253,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4159045278,\"state\":\"COMMENTED\",\"body\":\"## Pull request overview\\n\\nAutogenerated update for `@azure/arm-computelimit` from the `azure-rest-api-specs` TypeSpec config, bumping the default service API version to **2026-04-30** and adding newly described operations/resources to the generated client surface.\\n\\n**Changes:**\\n- Add **VM Families** operation group (`vmFamilies`) with `get` + `listBySubscriptionLocationResourc...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38253","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38253,\"title\":\"[AutoPR @azure-arm-computelimit]-generated-from-SDK Generation - JS-6195121\",\"body\":\"Configurations:  \\u0026#39;specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit/tspconfig.yaml\\u0026#39;, API Version: 2026-04-30, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline r...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\n\nOnly failed checks and required actions are listed below.\n\n- ⏳ **Required approvals**: Awaiting approval from required reviewers (@MaryGao, @qiaozha, @JialinHuang803). All CI checks have passed (checkenforcer ✅). The PR is ready once approvals are granted.\n\n\u003c!-- gh-aw-agentic-workflow: Management Release Assistant, engine: copilot, model: auto, id: 24839899736, workflow_id: mgmt-review, run: https://...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_IN2mTYLF\",\"comment\":\"#aw_IN2mTYLF\"}","type":"text"}]}}
  ```
