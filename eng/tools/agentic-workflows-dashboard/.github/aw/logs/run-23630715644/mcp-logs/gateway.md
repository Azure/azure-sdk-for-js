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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37801,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37801,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37801,\"title\":\"[AutoPR @azure-arm-providerhub]-generated-from-SDK Generation - JS-6054102\",\"body\":\"Configurations:  \\u0026#39;specification/providerhub/ProviderHub.Management/tspconfig.yaml\\u0026#39;, API Version: 2024-09-01, SDK Release Type: beta, and CommitSHA: \\u0026#39;[REDACTED]\\u0026#39; in SpecRepo: \\u0026#39;https://github.com/Azure/azure-rest-api-specs\\u0026#39; Pipeline run: https://dev.azure.com/azure-sd...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\".github/CODEOWNERS\",\"status\":\"modified\",\"additions\":3,\"changes\":3,\"patch\":\"@@ -1651,6 +1651,9 @@ sdk/artifactsigning/arm-artifactsigning/ @qiaozha @MaryGao @JialinHuang803\\n sdk/discovery/arm-discovery/ @qiaozha @MaryGao @JialinHuang803\\n sdk/marketplace/arm-marketplace/ @qiaozha @MaryGao @JialinHuang803\\n \\n+# PRLabel: %Mgmt\\n+sdk/providerhub/arm-providerhub/ @qiaozha @MaryGao @JialinHuang803\\n+\\n ######...`
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","per_page":10,"repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":824112,\"workflow_runs\":[{\"id\":22276391602,\"name\":\"GitHub Scheduled Event Processor\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFL8bCsg\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/scheduled-event-processor.yml\",\"run_number\":18271,\"run_attempt\":1,\"event\":\"schedule\",\"display_title\":\"GitHub Scheduled Event Processor\",\"status\":\"completed\",\"conclusion\":\"success\",\"workflo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37801,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/providerhub/arm-providerhub/package.json","ref":"refs/pull/37801/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**→`tools/call` `get_file_contents`
  
  ```json
  {"params":{"arguments":{"owner":"Azure","path":"sdk/providerhub/arm-providerhub/CHANGELOG.md","ref":"refs/pull/37801/head","repo":"azure-sdk-for-js"},"name":"get_file_contents"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"successfully downloaded text file (SHA: [REDACTED])","type":"text"},{"resource":{"mimeType":"text/plain; charset=utf-8","text":"# Release History\n    \n## 1.0.0-beta.1 (2026-03-24)\n\n### Features Added\n\nInitial release of the @azure/arm-providerhub package\n","uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/providerhub/arm-providerhub/CHANGELOG.md"},"type":"resource"}]}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"successfully downloaded text file (SHA: [REDACTED])"},{"type":"resource","resource":{"uri":"repo://Azure/azure-sdk-for-js/sha/[REDACTED]/contents/sdk/providerhub/arm-providerhub/package.json","mimeType":"text/plain; charset=utf-8","text":"{\n  \"name\": \"@azure/arm-providerhub\",\n  \"version\": \"1.0.0-beta.1\",\n  \"description\": \"A generated SDK for ProviderHubClient.\",\n  \"engines\": {\n    \"node\": \"\u003e=20.0.0\"\n  },\n  \"si...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":60,\"check_runs\":[{\"id\":68829297523,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630715644/job/68829297523\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23630715644/job/68829297523\",\"started_at\":\"2026-03-27T04:10:33Z\"},{\"id\":68829254373,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\"...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37801,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"failed to get pull request diff: GET https://api.github.com/repos/Azure/azure-sdk-for-js/pulls/37801: 406 Sorry, the diff exceeded the maximum number of lines (20000) [{Resource:PullRequest Field:diff Code:too_large Message:}]","type":"text"}],"isError":true}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No API design issues found. The `@azure/arm-providerhub` 1.0.0-beta.1 initial release has consistent versions across `package.json`, `src/api/providerHubContext.ts`, and `CHANGELOG.md`; no naming violations, no `unknown` types in public models, no `void` return types on non-delete/action operations, and no `ae-forgotten-export` warnings.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"a...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
