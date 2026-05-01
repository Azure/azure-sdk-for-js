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
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"total_count\":1,\"incomplete_results\":false,\"items\":[{\"id\":39093389,\"name\":\"azure-rest-api-specs\",\"full_name\":\"Azure/azure-rest-api-specs\",\"description\":\"The source for REST API specifications for Microsoft Azure.\",\"html_url\":\"https://github.com/Azure/azure-rest-api-specs\",\"language\":\"TypeSpec\",\"stargazers_count\":3058,\"forks_count\":5723,\"open_issues_count\":3756,\"updated_at\":\"2026-04-21T17:17:35Z\",\"crea...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42476","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42476,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit\",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2173](https://web.powerapps.com/apps/821ab569-ae60-420d-8264-d7b...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42476,"method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42476,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit\",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2173](https://web.powerapps.com/apps/821ab569-ae60-420d-8264-d7b...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42476","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42476,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit\",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2173](https://web.powerapps.com/apps/821ab569-ae60-420d-8264-d7b...`
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":42476,"method":"get_comments","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"42171","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"[{\"id\":4270754364,\"body\":\"## SDK Generation Triggered 🚀\\n\\nSDK generation pipelines have been initiated for all 5 languages for TypeSpec project `specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit` (API version: `2026-04-30`, stable).\\n\\n| Language | Pipeline |\\n|----------|----------|\\n| Python | [6173813](https://dev.azure.com/azure-sdk/internal/_build/results?buildId=6173813) |\\n| .NET | [61738...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42171,\"title\":\"Add new api-version 2026-04-30 for Features_Disable LRO action and Get VmFamilies\",\"body\":\"- Add new stable API version 2026-04-30 to Microsoft.ComputeLimit\\n- Add Features_Disable async POST action (LRO with Location-based polling) mirroring the existing Features_Enable action from 2026-03-20\\n-  Add Get/List VmFamilies action\\n- 2026-03-20 remains unchanged\\n- Add examples and update readme.md with ne...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":42171,"repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**→`tools/call` `issue_read`
  
  ```json
  {"params":{"arguments":{"issue_number":"42476","method":"get","owner":"Azure","repo":"azure-rest-api-specs"},"name":"issue_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42476,\"title\":\"[TypeSpec] Generate SDK for TypeSpec project specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit\",\"body\":\"## SDK generate request for TypeSpec project \\u003ci\\u003e\\u003c/i\\u003e\\n\\nRequest to generate SDK by Copilot. **Do not release SDK**\\nSDK will be released later by service owner.\\n\\n**Release Plan**: [2173](https://web.powerapps.com/apps/821ab569-ae60-420d-8264-d7b...`
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42171,\"title\":\"Add new api-version 2026-04-30 for Features_Disable LRO action and Get VmFamilies\",\"body\":\"- Add new stable API version 2026-04-30 to Microsoft.ComputeLimit\\n- Add Features_Disable async POST action (LRO with Location-based polling) mirroring the existing Features_Enable action from 2026-03-20\\n-  Add Get/List VmFamilies action\\n- 2026-03-20 remains unchanged\\n- Add examples and update readme.md with ne...`
- 🔍 rpc **github**→`tools/call` `pull_request_read`
  
  ```json
  {"params":{"arguments":{"method":"get","owner":"Azure","pullNumber":"42171","repo":"azure-rest-api-specs"},"name":"pull_request_read"}}
  ```
- 🔍 rpc **github**←`resp` `{"jsonrpc":"2.0","id":1,"result":{"content":[{"type":"text","text":"{\"number\":42171,\"title\":\"Add new api-version 2026-04-30 for Features_Disable LRO action and Get VmFamilies\",\"body\":\"- Add new stable API version 2026-04-30 to Microsoft.ComputeLimit\\n- Add Features_Disable async POST action (LRO with Location-based polling) mirroring the existing Features_Enable action from 2026-03-20\\n-  Add Get/List VmFamilies action\\n- 2026-03-20 remains unchanged\\n- Add examples and update readme.md with ne...`
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Triggered 🚀\n\nSDK generation pipelines have been re-initiated for all 5 languages for TypeSpec project `specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit` (API version: `2026-04-30`, stable).\n\n| Language | Pipeline |\n|----------|----------|\n| Python | [6187764](https://dev.azure.com/azure-sdk/internal/_build/results?buildId=6187764) |\n| .NET | [6187765](https://dev.azure.com/azure-s...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_zd8c35J2\",\"comment\":\"#aw_zd8c35J2\"}","type":"text"}]}}
  ```
- 🔍 rpc **safeoutputs**→`tools/call` `{"jsonrpc":"2.0","method":"tools/call","params":{"arguments":{"body":"## SDK Generation Complete ✅\n\nSDK pull requests have been successfully regenerated for all 5 languages for TypeSpec project `specification/computelimit/resource-manager/Microsoft.ComputeLimit/ComputeLimit` (API version: `2026-04-30`, stable).\n\n### SDK Pull Requests\n\nsdk pr for Python: https://github.com/Azure/azure-sdk-for-python/pull/46378\nsdk pr for .NET: https://github.com/Azure/azure-sdk-for-net/pull/58310\nsdk pr for JavaScr...`
- 🔍 rpc **safeoutputs**←`resp`
  
  ```json
  {"id":1,"result":{"content":[{"text":"{\"result\":\"success\",\"temporary_id\":\"aw_XosjNtOi\",\"comment\":\"#aw_XosjNtOi\"}","type":"text"}]}}
  ```
