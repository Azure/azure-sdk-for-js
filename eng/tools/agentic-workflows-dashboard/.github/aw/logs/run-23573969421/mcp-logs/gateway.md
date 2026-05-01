<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.4
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":2,"result":{"tools":[{"name":"create_pull_request_review_comment","description":"Create a review comment on a specific line of code in a pull request. Use this for inline code review feedback, suggestions, or questions about specific code changes. For general PR comments not tied to specific lines, use add_comment instead. When the workflow is configured with `target: \"*\"`, you must specify `pull_request_number` to indicate which PR to target. CONSTRAINTS: Maximum 10 review comment(s...`
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
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_files","owner":"Azure","perPage":100,"pullNumber":37835,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"filename\":\"sdk/monitor/monitor-opentelemetry/CHANGELOG.md\",\"status\":\"modified\",\"additions\":2,\"deletions\":1,\"changes\":3,\"patch\":\"@@ -1,6 +1,6 @@\\n # Release History\\n \\n-## 1.17.0 (Unreleaseed)\\n+## 1.17.0 (Unreleased)\\n \\n ### Other Changes\\n \\n@@ -14,6 +14,7 @@\\n \\n ### Bugs Fixed\\n \\n+- Fixed Available Memory performance counter on Linux to report `MemAvailable` from `/proc/meminfo` instead of `MemFree` (vi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":37835,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `actions_list`
  
  ```json
  {"params":{"arguments":{"method":"list_workflow_runs","owner":"Azure","per_page":5,"repo":"azure-sdk-for-js","workflow_runs_filter":{"status":"completed"}},"name":"actions_list"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":659837,\"workflow_runs\":[{\"id\":22276391602,\"name\":\"GitHub Scheduled Event Processor\",\"node_id\":\"WFR_kwLOBnSy6c8AAAAFL8bCsg\",\"head_branch\":\"main\",\"head_sha\":\"[REDACTED]\",\"path\":\".github/workflows/scheduled-event-processor.yml\",\"run_number\":18271,\"run_attempt\":1,\"event\":\"schedule\",\"display_title\":\"GitHub Scheduled Event Processor\",\"status\":\"completed\",\"conclusion\":\"success\",\"workflo...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_diff","owner":"Azure","pullNumber":37835,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"diff --git a/sdk/monitor/monitor-opentelemetry/CHANGELOG.md b/sdk/monitor/monitor-opentelemetry/CHANGELOG.md\nindex b9bd7de04e8a..cae54ac07b20 100644\n--- a/sdk/monitor/monitor-opentelemetry/CHANGELOG.md\n+++ b/sdk/monitor/monitor-opentelemetry/CHANGELOG.md\n@@ -1,6 +1,6 @@\n # Release History\n \n-## 1.17.0 (Unreleaseed)\n+## 1.17.0 (Unreleased)\n \n ### Other Changes\n \n@@ -14,6 +14,7 @@\n \n ### Bugs Fixed\n \n+- Fixed Available Memory ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get_check_runs","owner":"Azure","pullNumber":37835,"repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":109,\"check_runs\":[{\"id\":68642509243,\"name\":\"agent\",\"status\":\"in_progress\",\"html_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23573969421/job/68642509243\",\"details_url\":\"https://github.com/Azure/azure-sdk-for-js/actions/runs/23573969421/job/68642509243\",\"started_at\":\"2026-03-26T02:09:53Z\"},{\"id\":68642460467,\"name\":\"activation\",\"status\":\"completed\",\"conclusion\":\"success\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"37835","repo":"azure-sdk-for-js"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":37835,\"title\":\"[Monitor OpenTelemetry] Linux Perf Counter Update\",\"body\":\"### Packages impacted by this PR\\n@azure/monitor-opentelemetry\\n\\n### Issues associated with this PR\\nhttps://github.com/microsoft/ApplicationInsights-node.js/issues/673\\n\\n### Describe the problem that is addressed by this PR\\nThis pull request improves the accuracy of available memory reporting in the Azure Monitor OpenTelemetry SDK, especi...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"No performance regressions detected in this PR. The only new runtime cost introduced is a `readFileSync(\"/proc/meminfo\")` call inside an `ObservableGauge` callback — this runs at the metric export interval (default 60 s), reads from a kernel virtual file in ~10–50 µs, and has no measurable impact on throughput, latency, or memory.\n\n\u003cdetails\u003e\n\u003csummary\u003e📊 Structured Report\u003c/summary\u003e\n\n```json\n{\"a...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":3,"result":{"content":[{"text":"{\"result\":\"success\"}","type":"text"}],"isError":false}}
  ```
