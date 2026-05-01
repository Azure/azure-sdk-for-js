<details>
<summary>MCP Gateway</summary>

- ✓ **startup** MCPG Gateway version: v0.2.17
- ✓ **startup** Starting MCPG with config: stdin, listen: 0.0.0.0:80, log-dir: /tmp/gh-aw/mcp-logs/
- ✓ **startup** Loaded 2 MCP server(s): [github safeoutputs]
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
- ✓ **startup** Routes: /mcp/<server> for servers: [safeoutputs github]
- ✓ **backend**
  ```
  Successfully connected to MCP backend server, command=docker
  ```
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-rest-api-specs"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3058,\"forks_count\":5716,\"open_issues_count\":3750,\"updated_at\":\"2026-04-20T10:27:53Z\",\"crea...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42510","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42510,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project \",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2181](https://web.powerapps.com/apps/821ab569-ae60-420d-8264-d7b5d5ef734c?release-plan-id=40b8b7c1-3d37-f111-88b5-000d3a5c49ca)\\n**TypeSpec pr...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42510,"method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42510,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project \",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2181](https://web.powerapps.com/apps/821ab569-ae60-420d-8264-d7b5d5ef734c?release-plan-id=40b8b7c1-3d37-f111-88b5-000d3a5c49ca)\\n**TypeSpec pr...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"42162","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42162,\"title\":\"[NetAppFiles] Release microsoft.net app 2026 01 01\",\"body\":\"# ARM (Control Plane) API Specification Update Pull Request \\n\\n\\u0026gt; [!TIP]\\n\\u0026gt; Overwhelmed by all this guidance? See the `Getting help` section at the bottom of this PR description.\\n\\n## PR review workflow diagram\\n\\nPlease understand this diagram before proceeding. It explains how to get your PR approved \\u0026amp; merged.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":42162,"repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42162,\"title\":\"[NetAppFiles] Release microsoft.net app 2026 01 01\",\"body\":\"# ARM (Control Plane) API Specification Update Pull Request \\n\\n\\u0026gt; [!TIP]\\n\\u0026gt; Overwhelmed by all this guidance? See the `Getting help` section at the bottom of this PR description.\\n\\n## PR review workflow diagram\\n\\nPlease understand this diagram before proceeding. It explains how to get your PR approved \\u0026amp; merged.\...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"42162","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42162,\"title\":\"[NetAppFiles] Release microsoft.net app 2026 01 01\",\"body\":\"# ARM (Control Plane) API Specification Update Pull Request \\n\\n\\u0026gt; [!TIP]\\n\\u0026gt; Overwhelmed by all this guidance? See the `Getting help` section at the bottom of this PR description.\\n\\n## PR review workflow diagram\\n\\nPlease understand this diagram before proceeding. It explains how to get your PR approved \\u0026amp; merged.\...`
- 🔍 rpc **github**→`tools/call` `search_repositories`
  
  ```json
  {"params":{"arguments":{"perPage":10,"query":"repo:Azure/azure-sdk-for-net"},"name":"search_repositories"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":2928944,\"name\":\"azure-sdk-for-net\",\"full_name\":\"Azure/azure-sdk-for-net\",\"description\":\"This repository is for active development of the Azure SDK for .NET. For consumers of the SDK we recommend visiting our public developer docs at https://learn.microsoft.com/dotnet/azure/ or our versioned developer docs at https://azure.github.io/azure-sdk-for-net. \",\"html_url...`
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"query":"repo:Azure/azure-sdk-for-net NetApp 2026-01-01 is:open"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"perPage":5,"query":"repo:Azure/azure-sdk-for-net NetApp is:open"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":2,\"incomplete_results\":false,\"items\":[{\"id\":3905343214,\"number\":55560,\"state\":\"open\",\"locked\":false,\"title\":\"[NetApp] Migrate to TypeSpec-based code generation (MPG)\",\"body\":\"## Description\\n\\nMigrate Azure.ResourceManager.NetApp from AutoRest-based code generation to TypeSpec-based code generation (MPG).\\n\\n### Changes\\n- Replace \\\\\\u0007utorest.md\\\\ with \\\\\\tsp-location.yaml\\\\ pointing ...`
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"perPage":5,"query":"repo:Azure/azure-sdk-for-net azure-mgmt-netapp 2026-01-01 is:open"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"perPage":5,"query":"repo:Azure/azure-sdk-for-net Azure.ResourceManager.NetApp is:open created:\u003e2026-04-20"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **github**→`tools/call` `search_pull_requests`
  
  ```json
  {"params":{"arguments":{"perPage":5,"query":"repo:Azure/azure-sdk-for-net ResourceManager.NetApp is:draft created:\u003e2026-04-19"},"name":"search_pull_requests"}}
  ```
- 🔍 rpc **github**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"total_count\":0,\"incomplete_results\":false}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Status — Azure NetApp Files (2026-01-01)\n\nSDK generation pipelines have completed for all languages. Below is the summary:\n\n| Language | Status | SDK Pull Request | Pipeline |\n|----------|--------|-----------------|----------|\n| Python | ✅ Completed | [azure-sdk-for-python#46408](https://github.com/Azure/azure-sdk-for-python/pull/46408) | [Build 6180384](https://dev.azure.com/azure-sdk/internal/_build/results?b...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_HJJutj7y\",\"comment\":\"#aw_HJJutj7y\"}","type":"text"}]}}
  ```
