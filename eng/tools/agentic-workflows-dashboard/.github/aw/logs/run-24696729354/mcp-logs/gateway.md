<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [safeoutputs github]
- ✓ **startup** Guards sink server ID logging enrichment disabled
- 🔍 rpc **safeoutputs**→`tools/list`
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 15 comment(s) can be added.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is the 'body' field...`
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
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-rest-api-specs"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3058,\"forks_count\":5719,\"open_issues_count\":3747,\"updated_at\":\"2026-04-20T22:21:35Z\",\"crea...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42524","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42524,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/compute/resource-manager/Microsoft.Compute/Compute\",\"body\":\"## SDK generate request for TypeSpec projectspecification/compute/resource-manager/Microsoft.Compute/Compute \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2194](https://w...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42524,"method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42524,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/compute/resource-manager/Microsoft.Compute/Compute\",\"body\":\"## SDK generate request for TypeSpec projectspecification/compute/resource-manager/Microsoft.Compute/Compute \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2194](https://w...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42524","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42524,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/compute/resource-manager/Microsoft.Compute/Compute\",\"body\":\"## SDK generate request for TypeSpec projectspecification/compute/resource-manager/Microsoft.Compute/Compute \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2194](https://w...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42524,"method":"get_comments","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"39476","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4283748600,\"body\":\"## SDK Generation Triggered 🚀\\n\\nSDK generation pipelines have been initiated for all requested languages for TypeSpec project `specification/compute/resource-manager/Microsoft.Compute/Compute/Compute` (API version `2025-11-01`, stable).\\n\\n| Language | Pipeline |\\n|----------|----------|\\n| Python | [Build 6182186](https://dev.azure.com/azure-sdk/internal/_build/results?buildId=6182186) |\\n| .NET | ...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":39476,\"title\":\"[Compute] 2025-11-01 release\",\"body\":\"# ARM (Control Plane) API Specification Update Pull Request \\nAll of the following PRs have been ARM Signed Off:\\n- [#39109 - Add BestEffortAligned and PerDiskAlignment](https://github.com/Azure/azure-rest-api-specs/pull/39109)\\n- [#37861 - Add new property enableFullCaching to diffDiskSettings for a VM](https://github.com/Azure/azure-rest-api-specs/pull/37861)\\n- [...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":39476,"repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42524","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42524,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/compute/resource-manager/Microsoft.Compute/Compute\",\"body\":\"## SDK generate request for TypeSpec projectspecification/compute/resource-manager/Microsoft.Compute/Compute \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2194](https://w...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":39476,\"title\":\"[Compute] 2025-11-01 release\",\"body\":\"# ARM (Control Plane) API Specification Update Pull Request \\nAll of the following PRs have been ARM Signed Off:\\n- [#39109 - Add BestEffortAligned and PerDiskAlignment](https://github.com/Azure/azure-rest-api-specs/pull/39109)\\n- [#37861 - Add new property enableFullCaching to diffDiskSettings for a VM](https://github.com/Azure/azure-rest-api-specs/pull/37861)\\n- [...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"39476","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":39476,\"title\":\"[Compute] 2025-11-01 release\",\"body\":\"# ARM (Control Plane) API Specification Update Pull Request \\nAll of the following PRs have been ARM Signed Off:\\n- [#39109 - Add BestEffortAligned and PerDiskAlignment](https://github.com/Azure/azure-rest-api-specs/pull/39109)\\n- [#37861 - Add new property enableFullCaching to diffDiskSettings for a VM](https://github.com/Azure/azure-rest-api-specs/pull/37861)\\n- [...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Triggered 🚀\n\nSDK generation pipelines have been re-initiated for all languages for TypeSpec project `specification/compute/resource-manager/Microsoft.Compute/Compute` (API version `2025-11-01`, stable).\n\n| Language | Pipeline |\n|----------|----------|\n| Python | [Build 6183411](https://dev.azure.com/azure-sdk/internal/_build/results?buildId=6183411) |\n| .NET | [Build 6183417](https://dev.azure.com/azure-sdk/int...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_trigger1\",\"comment\":\"#aw_trigger1\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Status ✅\n\nAll SDK generation pipelines have completed for TypeSpec project `specification/compute/resource-manager/Microsoft.Compute/Compute` (API version `2025-11-01`, stable).\n\n| Language | Package | Pipeline | SDK Pull Request |\n|----------|---------|----------|-----------------|\n| Python | `azure-mgmt-compute` | [Build 6183411](https://dev.azure.com/azure-sdk/internal/_build/results?buildId=6183411) | [azure-...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_status1\",\"comment\":\"#aw_status1\"}","type":"text"}]}}
  ```
