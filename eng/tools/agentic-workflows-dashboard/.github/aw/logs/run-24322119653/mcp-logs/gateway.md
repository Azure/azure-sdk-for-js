<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 1 comment(s) can be added. Target: 38110.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is th...`
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":38110,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":38110,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":1,\"deletions\":1,\"changes\":2,\"patch\":\"@@ -393,7 +393,7 @@\\n # PRLabel: %Mgmt\\n /sdk/azurestack/arm-azurestack/ @qiaozha @MaryGao @JialinHuang803\\n \\n-# PRLabel: %Mgmt\\n+# PRLabel: %Mgmt %mgmt-review-needed\\n /sdk/azurestackhci/arm-azurestackhci/ @qiaozha @MaryGao @JialinHuang803\\n \\n # PRLabel: %Mgmt\"},{\"filename\":\"sdk/azurestackhci/arm-azurestackh...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":38110,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":131,\"check_runs\":[{\"id\":71010255747,\"name\":\"js - codeowners-linter - ci\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/71010255747\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6142860\",\"started_at\":\"2026-04-13T01:56:12Z\",\"completed_at\":\"2026-04-13T01:57:19Z\"},{\"id\":7101022...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":38110,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45903917068,\"node_id\":\"SC_kwDOBnSy6c8AAAAKsBYwDA\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24305074102\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":2,"perPage":100,"pullNumber":38110,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":131,\"check_runs\":[{\"id\":71010186274,\"name\":\"Handle pull_request_target labeled event with azure login\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24322119816/job/71010186274\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/24322119816/job/71010186274\",\"started_at\":\"2026-04-13T01:56:14Z\",\"completed_at\":\"20...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"38110","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":38110,\"title\":\"[AutoPR @azure-arm-azurestackhci]-generated-from-SDK Generation - JS-6142348\",\"body\":\"Configurations:  \\u0026#39;specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/tspconfig.yaml\\u0026#39;, API Version: 2026-02-01, SDK Release Type: stable, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline ru...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No API design or tooling issues found in this PR. The package `@azure/arm-azurestackhci` bumps from `4.0.0` to `4.0.1` with a newer emitter (0.51.1 → 0.52.1), serializer bug-fixes, and a restructured `warp.config.yml`. Versions are consistent across `package.json`, the context file, and `CHANGELOG.md`. No public API surface changes were made (review files unchanged). No naming, type-safety, or export issues detected.\n\n\u003cdetails\u0...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## Next Steps to Merge\nOnly failed checks and required actions are listed below.\n\n- ⏳ js - pullrequest (Build Build): still running. Review [ADO logs](https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6142861).\n- ⏳ js - pullrequest (Build Analyze): still running. Review [ADO logs](https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6142861).\n- ⏳ c...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_0OcbbwMO\",\"comment\":\"#aw_0OcbbwMO\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `push_repo_memory`
  
  ```json
  {"params":{"arguments":{},"name":"push_repo_memory"}}
  ```
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"message\":\"Memory validation passed: 7 file(s), 5 KB total (limit: 12 KB with 20% overhead).\"}","type":"text"}]}}
  ```
