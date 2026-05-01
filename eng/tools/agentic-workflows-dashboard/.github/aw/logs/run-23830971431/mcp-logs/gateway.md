<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.1.8
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"add_comment","description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. IMPORTANT: Comments are subject to validation constraints enforced by the MCP server - maximum 65536 characters for the complete comment (including footer which is added a...`
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
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37879,\"title\":\"[AutoPR @azure-arm-servicegroups]-generated-from-SDK Generation - JS-6074613\",\"body\":\"Configurations:  \\u0026#39;specification/management/resource-manager/Microsoft.Management/ServiceGroups/tspconfig.yaml\\u0026#39;, API Version: 2024-02-01-preview, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeli...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -1654,6 +1654,9 @@ sdk/marketplace/arm-marketplace/ @qiaozha @MaryGao @JialinHuang803\\n # PRLabel: %Mgmt\\n sdk/appnetwork/arm-appnetwork/ @qiaozha @MaryGao @JialinHuang803\\n \\n+# PRLabel: %Mgmt\\n+sdk/servicegroups/arm-servicegroups/ @qiaozha @MaryGao @JialinHuang803\\n+\\n ###########\\n # Config\\n ###########\"},{\"filename\":\"...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":123,\"check_runs\":[{\"id\":69464375574,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23830971431/job/69464375574\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23830971431/job/69464375574\",\"started_at\":\"2026-04-01T03:50:18Z\"},{\"id\":69464314502,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_status","owner":"Azure","pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"state\":\"pending\",\"sha\":\"[REDACTED]\",\"total_count\":1,\"statuses\":[{\"id\":45440425426,\"node_id\":\"SC_kwDOBnSy6c8AAAAKlHXd0g\",\"url\":\"https://api.github.com/repos/Azure/azure-sdk-for-js/statuses/[REDACTED]\",\"state\":\"pending\",\"target_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23829451729\",\"description\":\"Waiting for all checks to succeed\",\"context\":\"https://aka.ms/azsdk/checkenforcer\",\"avata...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":2,"perPage":100,"pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":123,\"check_runs\":[{\"id\":69459867668,\"name\":\"agent\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23829560125/job/69459867668\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23829560125/job/69459867668\",\"started_at\":\"2026-04-01T02:50:24Z\",\"completed_at\":\"2026-04-01T02:50:24Z\"},{\"id\":69459867601,\"name\":\...`
- 🔍 rpc **github**→`tools/call` `get_job_logs`
  
  ```json
  {"params":{"arguments":{"job_id":69459135515,"owner":"Azure","repo":"azure-sdk-for-js","return_content":true,"tail_lines":100},"name":"get_job_logs"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_job_logs`
  
  ```json
  {"params":{"arguments":{"job_id":69459220982,"owner":"Azure","repo":"azure-sdk-for-js","return_content":true,"tail_lines":80},"name":"get_job_logs"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get job logs: failed to get job logs for job 69459220982: unexpected status code: 404 Not Found","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get job logs: failed to get job logs for job 69459135515: unexpected status code: 404 Not Found","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","repo":"azure-sdk-for-js","workflow_runs_filter":{"branch":"sdkauto/@azure-arm-servicegroups-6074613","status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":44,\"workflow_runs\":[{\"id\":23830971430,\"name\":\"Performance Review\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFjG_EJg\",\"head_branch\":\"sdkauto/@azure-arm-servicegroups-6074613\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/dash.lock.yml\",\"run_number\":125,\"run_attempt\":1,\"event\":\"pull_request_target\",\"display_title\":\"Performance Review\",\"status\":\"completed\",\"conclusion\":\"skipped\",\"workflow_i...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","page":3,"perPage":100,"pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":123,\"check_runs\":[]}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_comments","owner":"Azure","pullNumber":37879,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4144804158,\"body\":\"## API Change Check\\r\\n\\r\\nAPIView identified API level changes in this PR and created the following API reviews\\r\\n\\r\\n[@azure/arm-servicegroups](https://spa.apiview.dev/review/[REDACTED]?activeApiRevisionId=[REDACTED])\\r\\n\\u003c!-- Fetch URI: https://apiview.dev/api/pullrequests?pullRequestNumber=37879\\u0026repoName=Azure/azure-sdk-for-js\\u0026commitSHA=[REDACTED] --\\u003e\",\"html_url\":\"http...`
