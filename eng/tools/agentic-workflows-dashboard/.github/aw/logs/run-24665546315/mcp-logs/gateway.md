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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3058,\"forks_count\":5716,\"open_issues_count\":3752,\"updated_at\":\"2026-04-20T10:27:53Z\",\"crea...`
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
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Triggered 🚀\n\nSDK generation pipelines have been initiated for all languages for the **Azure NetApp Files** TypeSpec project (`specification/netapp/resource-manager/Microsoft.NetApp/NetApp`, API version `2026-01-01`).\n\n| Language | Pipeline |\n|----------|----------|\n| Python | [Build 6180460](https://dev.azure.com/azure-sdk/internal/_build/results?buildId=6180460) |\n| .NET | [Build 6180461](https://dev.azure.com...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_QAMMcf7b\",\"comment\":\"#aw_QAMMcf7b\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Complete ✅\n\nSDK generation has completed for **Azure NetApp Files** (API version `2026-01-01`).\n\n### SDK Pull Request Links\n\nsdk pr for Python: https://github.com/Azure/azure-sdk-for-python/pull/46408\nsdk pr for JavaScript: https://github.com/Azure/azure-sdk-for-js/pull/38216\nsdk pr for Java: https://github.com/Azure/azure-sdk-for-java/pull/48871\nsdk pr for Go: https://github.com/Azure/azure-sdk-for-go/pull/26...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_jt0ri93U\",\"comment\":\"#aw_jt0ri93U\"}","type":"text"}]}}
  ```
