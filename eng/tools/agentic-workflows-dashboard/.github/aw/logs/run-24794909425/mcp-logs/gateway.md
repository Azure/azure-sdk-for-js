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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3059,\"forks_count\":5726,\"open_issues_count\":3761,\"updated_at\":\"2026-04-22T17:57:40Z\",\"crea...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42333","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42333,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project \",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [1561](https://web.powerapps.com/apps/8ca4408d-6af3-475f-90fe-51b2e43624bb?release-plan-id=aac0fd9f-5637-f111-88b3-000d3a4d5155)\\n**TypeSpec pr...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42333,"method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42333,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project \",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [1561](https://web.powerapps.com/apps/8ca4408d-6af3-475f-90fe-51b2e43624bb?release-plan-id=aac0fd9f-5637-f111-88b3-000d3a4d5155)\\n**TypeSpec pr...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42333","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42333,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project \",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [1561](https://web.powerapps.com/apps/8ca4408d-6af3-475f-90fe-51b2e43624bb?release-plan-id=aac0fd9f-5637-f111-88b3-000d3a4d5155)\\n**TypeSpec pr...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42333,"method":"get_comments","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4239355512,\"body\":\"## SDK Generation Status\\n\\nSDK generation pipelines have completed for the TypeSpec project `specification/contosowidgetmanager/Contoso.Management` (API version: `2021-10-01-preview`, release type: `beta`).\\n\\n### SDK Pull Requests\\n\\n| Language | Status | SDK Pull Request |\\n|---|---|---|\\n| Python | ✅ Completed | [azure-sdk-for-python#46285](https://github.com/Azure/azure-sdk-for-python/pull/46285...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42333","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42333,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project \",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [1561](https://web.powerapps.com/apps/8ca4408d-6af3-475f-90fe-51b2e43624bb?release-plan-id=aac0fd9f-5637-f111-88b3-000d3a4d5155)\\n**TypeSpec pr...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Status\n\nSDK generation has been triggered and completed for all languages. See below for results.\n\n---\n\n### ✅ Successful SDK Pull Requests\n\n| Language | SDK Pull Request |\n|----------|-----------------|\n| Python | https://github.com/Azure/azure-sdk-for-python/pull/46285 |\n| .NET | https://github.com/Azure/azure-sdk-for-net/pull/58122 |\n| Java | https://github.com/Azure/azure-sdk-for-java/pull/48796 |\n| Go ...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_V5f2L5a6\",\"comment\":\"#aw_V5f2L5a6\"}","type":"text"}]}}
  ```
