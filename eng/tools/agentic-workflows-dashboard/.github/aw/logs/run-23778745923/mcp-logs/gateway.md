<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.8
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/list`
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request_review_comment","description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. CONSTRAINTS: Maximum 10 review comment(s) can be created. Comments will be on the RIGHT side of the diff.","inputSchema":{"additionalProperties":false,"properties":{...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"annotations":{"readOnlyHint":true,"title":"Get details of GitHub Actions resources (workflows, workflow runs, jobs, and artifacts)"},"description":"Get details about specific GitHub Actions resources.\nUse this tool to get details about individual workflows, workflow runs, jobs, and artifacts by their unique IDs.\n","inputSchema":{"properties":{"method":{"description":"The method to execute","enum":["get_workflow","get_workflow_run","get_workflow_job","download_w...`
- ✓ **startup** Starting in ROUTED mode on 0.0.0.0:80
- ✓ **startup** Routes: /mcp/<server> for servers: [github safeoutputs]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37870,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","pullNumber":37870,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -1654,6 +1654,9 @@ sdk/marketplace/arm-marketplace/ @qiaozha @MaryGao @JialinHuang803\\n # PRLabel: %Mgmt\\n sdk/appnetwork/arm-appnetwork/ @qiaozha @MaryGao @JialinHuang803\\n \\n+# PRLabel: %Mgmt\\n+sdk/alertsmanagement/arm-alertsmanagement/ @qiaozha @MaryGao @JialinHuang803\\n+\\n ###########\\n # Config\\n ###########\"},{\"filenam...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37870,\"title\":\"[AutoPR @azure-arm-alertsmanagement]-generated-from-SDK Generation - JS-6072768\",\"body\":\"Configurations:  \\u0026#39;specification/alertsmanagement/resource-manager/Microsoft.AlertsManagement/AlertsManagement/tspconfig.yaml\\u0026#39;, API Version: 2025-05-25-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":717643,\"workflow_runs\":[{\"id\":23760230238,\"name\":\"After APIView\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFiDhXXg\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/post-apiview.yml\",\"run_number\":1276516,\"run_attempt\":1,\"event\":\"check_run\",\"display_title\":\"After APIView\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"workflow_id\":157881463,\"check_suite_id\":62647106385,...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37870,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37870,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"diff --git a/.github/CODEOWNERS b/.github/CODEOWNERS\nindex a207b7d11cb3..c5823b92b137 100644\n--- a/.github/CODEOWNERS\n+++ b/.github/CODEOWNERS\n@@ -1654,6 +1654,9 @@ sdk/marketplace/arm-marketplace/ @qiaozha @MaryGao @JialinHuang803\n # PRLabel: %Mgmt\n sdk/appnetwork/arm-appnetwork/ @qiaozha @MaryGao @JialinHuang803\n \n+# PRLabel: %Mgmt\n+sdk/alertsmanagement/arm-alertsmanagement/ @qiaozha @MaryGao @JialinHuang803\n+\n ###########\n # ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":132,\"check_runs\":[{\"id\":69286465442,\"name\":\"js - codeowners-linter - ci\",\"status\":\"completed\",\"conclusion\":\"success\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/runs/69286465442\",\"details_url\":\"https://dev.azure.com/azure-sdk/29ec6040-b234-4e31-b139-33dc4287b756/_build/results?buildId=6084311\",\"started_at\":\"2026-03-31T03:16:38Z\",\"completed_at\":\"2026-03-31T03:18:00Z\"},{\"id\":6928642...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"🔴 **Design Concern** — `review/arm-alertsmanagement-node.api.md:618`\n\n```ts\nexport interface ProxyResource_1 {\n    readonly id?: string;\n    readonly name?: string;\n    readonly type?: string;\n}\n```\n\nThe `_N` suffix (`ProxyResource_1`) is a naming collision artifact — it means TypeSpec defines two models with the same base name `ProxyResource`. In this file, `ProxyResource` already extends `Resource` (which includes `syst...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"1 design issue found in the public API surface of `@azure/arm-alertsmanagement` (v1.0.0-beta.1, API `2025-05-25-preview`).\n\n**Tooling checks:** Versions are consistent across `package.json`, `alertsManagementContext.ts`, and `CHANGELOG.md` (all `1.0.0-beta.1`). `apiRefLink` correctly uses `?view=azure-node-preview` for a beta release. No alpha versions detected. CI checks passing.\n\n**API surface:** One naming violation — `ProxyResou...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":4,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
