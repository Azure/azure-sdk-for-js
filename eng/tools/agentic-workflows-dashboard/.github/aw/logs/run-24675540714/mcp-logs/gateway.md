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
- 🔍 rpc **safeoutputs**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"tools":[{"description":"Add a comment to an existing GitHub issue, pull request, or discussion. Use this to provide feedback, answer questions, or add information to an existing conversation. For creating new items, use create_issue, create_discussion, or create_pull_request instead. CONSTRAINTS: Maximum 15 comment(s) can be added.","inputSchema":{"additionalProperties":false,"properties":{"body":{"description":"The comment text in Markdown format. This is the 'body' field...`
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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3058,\"forks_count\":5717,\"open_issues_count\":3753,\"updated_at\":\"2026-04-20T10:27:53Z\",\"crea...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42514","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42514,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/contosowidgetmanager/Contoso.WidgetManager\",\"body\":\"## SDK generate request for TypeSpec projectspecification/contosowidgetmanager/Contoso.WidgetManager \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [517](https://web.powerapps.com/...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42514,"method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42514,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/contosowidgetmanager/Contoso.WidgetManager\",\"body\":\"## SDK generate request for TypeSpec projectspecification/contosowidgetmanager/Contoso.WidgetManager \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [517](https://web.powerapps.com/...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"35573","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":35573,\"title\":\"Update copilot instructions for SDK workflow\",\"body\":\"Update pinned MCP server version to latest and also update copilot instructions.\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs/pull/35573\",\"user\":{\"login\":\"praveenkuttappan\",\"id\":55455725,\"profile_url\":\"https://github.com/praveenkuttappan\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":35573,"repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":35573,\"title\":\"Update copilot instructions for SDK workflow\",\"body\":\"Update pinned MCP server version to latest and also update copilot instructions.\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs/pull/35573\",\"user\":{\"login\":\"praveenkuttappan\",\"id\":55455725,\"profile_url\":\"https://github.com/praveenkuttappan\",\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"35573","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":35573,\"title\":\"Update copilot instructions for SDK workflow\",\"body\":\"Update pinned MCP server version to latest and also update copilot instructions.\",\"state\":\"closed\",\"draft\":false,\"merged\":true,\"mergeable_state\":\"unknown\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs/pull/35573\",\"user\":{\"login\":\"praveenkuttappan\",\"id\":55455725,\"profile_url\":\"https://github.com/praveenkuttappan\",\...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Status Update\n\n### Release Plan Update\n\nThe release plan was retrieved successfully (Work Item ID: 33497, Release Plan ID: 517). However, the **release plan update step failed** due to a system-level error in the DevOps work item template:\n\n```\nTF51535: Cannot find field Custom.RustPackageName.\n```\n\nThe `tspconfig.yaml` for the `contosowidgetmanager/Contoso.WidgetManager` TypeSpec project includes a Rust emitte...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_7pVramu6\",\"comment\":\"#aw_7pVramu6\"}","type":"text"}]}}
  ```
